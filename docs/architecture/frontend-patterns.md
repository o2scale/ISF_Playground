# Frontend Patterns & Architecture

## Current State: No Formal Architecture

### Component Structure (Ad-hoc)
```
src/components/
  └── [feature]/
      └── ComponentName.js + ComponentName.css
```

**No separation of:** Container/Presentational, Smart/Dumb components

## State Management: None

### Current Pattern: useState Everywhere
```javascript
// admin.js - 37 state variables!
const [selectedBalagruha, setSelectedBalagruha] = useState();
const [selectedCoach, setSelectedCoach] = useState();
const [balagruhas, setBalagruhas] = useState([]);
const [coaches, setCoaches] = useState([]);
const [students, setStudents] = useState([]);
const [attendance, setAttendance] = useState([]);
const [tasks, setTasks] = useState([]);
const [machines, setMachines] = useState([]);
// ... 29 more state variables
```

**Issues:**
- Prop drilling (passing state 3-4 levels deep)
- Duplicate state across components
- No shared state management
- Re-renders on every state change

## API Call Pattern: Direct in Components

### Current Pattern (BAD)
```javascript
// In component
const getUsersList = async () => {
  try {
    const response = await fetchUsers();
    setUsers(response || []);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

useEffect(() => {
  getUsersList();
}, [selectedBalagruha]);
```

**Issues:**
- API logic in components
- No caching
- No loading/error states
- console.error instead of proper error handling
- Duplicate API calls across components

### API Client (src/api.js)
```javascript
// 100+ exported functions
export const fetchUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5001/api/users", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await response.json();
};
```

**Issues:**
- No axios interceptors
- Manual token handling every call
- No error interceptor
- Hardcoded base URL

## Routing Pattern

### App.js (React Router v7)
```javascript
<Routes>
  <Route path="/login" element={<LoginCard />} />
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
</Routes>
```

**Good:** Protected routes implemented
**Bad:** No route-based code splitting

## Authentication Pattern

### Current: localStorage Only
```javascript
// Login
localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(user));

// Protected Route
const token = localStorage.getItem("token");
if (!token) return <Navigate to="/login" />;
```

**Issues:**
- No React Context for auth
- No centralized logout
- Token not validated on app load
- User object duplicated as string

## Form Handling

### Current: Manual useState
```javascript
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

<input value={name} onChange={(e) => setName(e.target.value)} />
```

**No:** React Hook Form, Formik, or any form library

## Styling Approach

### Mix of Patterns
```javascript
// 1. Inline styles
<div style={{ backgroundColor: "#8a7bff", padding: "20px" }}>

// 2. CSS modules (but not using .module.css)
import "./AdminDashboard.css"
<div className="admin-dashboard">

// 3. Conditional classes
<div className={`menu-item ${selected ? 'selected' : ''}`}>
```

**Libraries Available but Underused:**
- Radix UI (good)
- Tailwind Merge (installed but no Tailwind)
- class-variance-authority (not used)

## Component Anti-Patterns

### Issue 1: Massive Component Files
```javascript
// admin.js: 1440 lines
function AdminDashboard() {
  // 37 useState declarations
  // 15 useEffect hooks
  // 20 handler functions
  // Inline JSX with nested ternaries
  // Hardcoded data arrays
}
```

### Issue 2: Logic in JSX
```javascript
{tasks?.map(task => (
  <div onClick={async () => {
    await updateTask(task._id, { status: "completed" });
    getTasksList(); // Re-fetch
  }}>
))}
```

### Issue 3: No Prop Types
```javascript
// No TypeScript, no PropTypes
function TaskCard({ task }) {
  // What shape is task? Unknown!
}
```

### Issue 4: Duplicate Code
Same code patterns repeated across:
- admin.js, coach.js, student.js dashboards
- Login components
- User management components

## Recommended Patterns for Sprint 5

### 1. State Management (Zustand - Lightweight)
```javascript
// src/store/shopStore.js
import create from 'zustand';

const useShopStore = create((set, get) => ({
  cart: [],
  products: [],
  loading: false,

  addToCart: (product) => set(state => ({
    cart: [...state.cart, product]
  })),

  fetchProducts: async () => {
    set({ loading: true });
    const products = await api.getProducts();
    set({ products, loading: false });
  }
}));

// In component
const { cart, addToCart } = useShopStore();
```

**Why Zustand:**
- Minimal boilerplate
- No Context Provider wrapper needed
- DevTools support
- TypeScript-friendly

### 2. Custom Hooks for Data Fetching
```javascript
// src/hooks/useShopProducts.js
export function useShopProducts(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const data = await api.getProducts({ category });
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [category]);

  return { products, loading, error };
}

// In component
const { products, loading, error } = useShopProducts("books");
```

### 3. API Client with Axios
```javascript
// src/api/client.js
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 10000
});

// Request interceptor
client.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
client.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;

// src/api/shop.js
import client from './client';

export const shopAPI = {
  getProducts: (params) => client.get('/v2/shop/products', { params }),
  createOrder: (data) => client.post('/v2/shop/orders', data),
  getOrders: () => client.get('/v2/shop/orders')
};
```

### 4. Component Structure
```
components/shop/
  ├── ShopDashboard.js        # Container component
  ├── ProductGrid/
  │   ├── ProductGrid.js      # Grid container
  │   ├── ProductCard.js      # Presentational
  │   └── ProductCard.css
  ├── Cart/
  │   ├── Cart.js
  │   ├── CartItem.js
  │   └── Cart.css
  ├── Checkout/
  │   ├── Checkout.js
  │   ├── CheckoutForm.js
  │   └── Checkout.css
  └── shared/
      ├── CoinBalance.js      # Reusable
      ├── LoadingSpinner.js
      └── ErrorMessage.js
```

### 5. Error Handling Pattern
```javascript
// src/components/shop/ShopDashboard.js
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function ShopDashboard() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ProductGrid />
    </ErrorBoundary>
  );
}
```

### 6. Form Validation (Radix + Native)
```javascript
// Use Radix UI primitives for basic forms
import * as Form from '@radix-ui/react-form';

function CheckoutForm() {
  const [notes, setNotes] = useState('');

  return (
    <Form.Root onSubmit={handleSubmit}>
      <Form.Field name="notes">
        <Form.Label>Order Notes</Form.Label>
        <Form.Control asChild>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={500}
          />
        </Form.Control>
      </Form.Field>

      <Form.Submit>Place Order</Form.Submit>
    </Form.Root>
  );
}
```

### 7. Real-time Updates (WebSocket Hook)
```javascript
// src/hooks/useNotifications.js
import { useEffect, useState } from 'react';

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const ws = new WebSocket(`ws://localhost:5001?token=${token}`);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "subscribe",
        data: { room: "notifications" }
      }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "notification") {
        setNotifications(prev => [message.data.notification, ...prev]);
      }
    };

    return () => ws.close();
  }, []);

  return notifications;
}

// In component
const notifications = useNotifications();
```

## DO NOT Do in Sprint 5

### ❌ Don't Refactor Existing Components
```javascript
// DON'T touch admin.js, coach.js, student.js
// They work, even if messy
```

### ❌ Don't Introduce Complex State Management
```javascript
// DON'T use Redux - overkill for shop module
// DO use Zustand or Context API
```

### ❌ Don't Rewrite API Client
```javascript
// DON'T break existing api.js
// DO create new shopAPI.js
```

## DO in Sprint 5

### ✅ Isolate Shop Code
```javascript
// Create self-contained shop/ directory
// Use better patterns for new code
```

### ✅ Use Custom Hooks
```javascript
// Extract data fetching to hooks
// Reuse across shop components
```

### ✅ Implement Loading States
```javascript
function ProductGrid() {
  const { products, loading, error } = useShopProducts();

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;

  return <div>{products.map(...)}</div>;
}
```

### ✅ Proper Error Handling
```javascript
// Use try-catch, show user-friendly messages
// No more console.error only
```

## Summary

**Current Frontend State:**
- ❌ No state management
- ❌ useState overuse (37 in one component!)
- ❌ API calls in components
- ❌ No loading/error states
- ❌ Massive component files (1440 lines)
- ❌ No prop types or TypeScript
- ✅ Radix UI available
- ✅ Protected routes working
- ✅ React Router v7

**Sprint 5 Strategy:**
1. **Isolate:** Build shop in separate directory
2. **Zustand:** For cart/shop state
3. **Custom Hooks:** For data fetching
4. **Axios Interceptors:** For API client
5. **Error Boundaries:** For error handling
6. **Small Components:** Max 200 lines each
7. **DO NOT:** Touch existing Sprint 1 components

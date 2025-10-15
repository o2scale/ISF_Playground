# Technical Debt & Recommendations

## Critical Issues (Fix in Sprint 5)

### Backend

#### 1. No Input Validation (CRITICAL)
**Location:** Throughout controllers, especially `userController.js`

**Issue:**
```javascript
// userController.js:createUser - No validation!
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = new User({ name, email, password, role });
  await newUser.save();  // Fails if invalid data
};
```

**Impact:**
- SQL injection equivalent for NoSQL
- Invalid data in database
- App crashes on malformed input

**Fix:**
```javascript
const { body, validationResult } = require('express-validator');

router.post('/users', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).isStrongPassword(),
  body('name').trim().notEmpty().escape(),
  body('role').isIn(['admin', 'coach', 'student', ...])
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
}, userController.createUser);
```

#### 2. Plain Text Passwords in createUser (CRITICAL)
**Location:** `backend/controllers/userController.js:71-86`

**Issue:**
```javascript
const newUser = new User({
  password,  // Relies solely on pre-save hook
});
await newUser.save();
res.status(201).json(newUser);  // Returns hashed password!
```

**Impact:**
- If pre-save hook fails, plain text password saved
- Returns password hash in response
- No explicit validation

**Fix:**
```javascript
if (!password || password.length < 8) {
  return res.status(400).json({
    success: false,
    message: 'Password must be at least 8 characters'
  });
}

// Explicit hashing (don't rely on hook alone)
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const newUser = new User({ ...data, password: hashedPassword });
await newUser.save();

// Never return password
const userResponse = newUser.toObject();
delete userResponse.password;
res.status(201).json({ success: true, data: userResponse });
```

#### 3. console.log Usage Everywhere (MEDIUM)
**Location:** Throughout backend and frontend

**Issue:**
```javascript
console.log("balagruha details", response?.data?.balagruhas);
console.error("Error fetching users:", error);
```

**Impact:**
- No structured logging
- Can't search logs
- Sensitive data exposed
- No log levels

**Fix:**
```javascript
const { logger, errorLogger } = require('../config/pino-config');

logger.info({
  balagruhaCount: response?.data?.balagruhas?.length,
  userId: req.user._id
}, 'Fetched balagruha details');

errorLogger.error({
  error: error.message,
  stack: error.stack,
  userId: req.user._id
}, 'Failed to fetch users');
```

#### 4. No Transaction Safety (CRITICAL for Sprint 5)
**Location:** Coin spending operations

**Issue:**
```javascript
// If coin deduction succeeds but order creation fails, coins lost!
await coinRecord.spendCoins(totalCost, ...);
await Order.create({ ... });  // If this fails, coins already spent
```

**Impact:**
- Money lost if second operation fails
- No rollback mechanism
- Data inconsistency

**Fix:**
```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  await coinRecord.spendCoins(totalCost, ..., { session });
  const order = await Order.create([orderData], { session });
  await session.commitTransaction();
  return { success: true, order };
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

#### 5. No Rate Limiting (SECURITY)
**Location:** Authentication endpoints

**Issue:**
- No protection against brute force attacks
- No rate limiting on expensive operations

**Fix:**
```javascript
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: "Too many login attempts, please try again later"
});

router.post("/login", authLimiter, authController.login);

const shopLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests
});

router.use("/api/v2/shop", shopLimiter);
```

### Frontend

#### 1. Excessive useState (CRITICAL)
**Location:** `frontend/src/components/dashboard/admin.js` (37 state variables!)

**Issue:**
```javascript
const [selectedBalagruha, setSelectedBalagruha] = useState();
const [selectedCoach, setSelectedCoach] = useState();
const [balagruhas, setBalagruhas] = useState([]);
// ... 34 more useState calls
```

**Impact:**
- Component re-renders on every state change
- Prop drilling nightmare
- Impossible to maintain
- Performance issues

**Fix for Sprint 5 Shop:**
```javascript
// Use Zustand
import create from 'zustand';

const useShopStore = create((set) => ({
  products: [],
  cart: [],
  selectedCategory: null,
  loading: false,

  setProducts: (products) => set({ products }),
  addToCart: (product) => set(state => ({
    cart: [...state.cart, product]
  })),
  setSelectedCategory: (category) => set({ selectedCategory: category })
}));

// In component
function ShopDashboard() {
  const { products, cart, addToCart } = useShopStore();
  // Only 1 hook call!
}
```

#### 2. API Calls in Components (CRITICAL)
**Location:** Throughout components

**Issue:**
```javascript
// In component
const getUsersList = async () => {
  const response = await fetchUsers();
  setUsers(response || []);
};

useEffect(() => {
  getUsersList();
}, [selectedBalagruha]);
```

**Impact:**
- Business logic in presentation layer
- No caching
- Duplicate calls
- Hard to test

**Fix:**
```javascript
// hooks/useUsers.js
export function useUsers(filters) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await api.getUsers(filters);
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [JSON.stringify(filters)]);

  return { users, loading, error, refetch: fetchData };
}

// In component
const { users, loading, error } = useUsers({ role: 'student' });
```

#### 3. No State Management (CRITICAL for Sprint 5)
**Location:** Entire frontend

**Issue:**
- Every component manages its own state
- No shared state for cart
- localStorage used for everything

**Fix:**
```javascript
// Install: npm install zustand

// store/shopStore.js
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useShopStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find(item => item._id === product._id);

        if (existing) {
          set({
            cart: cart.map(item =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item._id !== productId) });
      },

      clearCart: () => set({ cart: [] }),

      getTotalCost: () => {
        return get().cart.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        );
      }
    }),
    {
      name: 'shop-cart', // localStorage key
      getStorage: () => localStorage
    }
  )
);
```

#### 4. No Loading/Error States (MEDIUM)
**Location:** Throughout components

**Issue:**
```javascript
// No loading indicator
const [users, setUsers] = useState([]);
fetchUsers().then(setUsers);

return (
  <div>
    {users.map(...)}  {/* Shows nothing while loading */}
  </div>
);
```

**Fix:**
```javascript
function UserList() {
  const { users, loading, error } = useUsers();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (users.length === 0) return <EmptyState message="No users found" />;

  return <div>{users.map(...)}</div>;
}
```

## Medium Priority Issues

### Backend

#### 1. Machine Validation Disabled
**Location:** `backend/middleware/auth.js`, `backend/routes/auth.js`

**Issue:**
```javascript
// Commented out MAC address validation
if (false) {  // Should be: if (!machine)
  return res.status(403).json({
    success: false,
    message: "Access denied: Invalid or inactive machine"
  });
}
```

**Recommendation:** Enable for production, keep disabled for development.

#### 2. JWT Secret Not Validated
**Location:** `backend/server.js:41-44`

**Issue:**
```javascript
// Commented out
// if (!process.env.JWT_SECRET) {
//     console.error('JWT_SECRET is not defined');
//     process.exit(1);
// }
```

**Fix:** Uncomment for production builds.

#### 3. No Request ID Tracking
**Issue:** Can't correlate logs across services

**Fix:**
```javascript
const { v4: uuidv4 } = require('uuid');

app.use((req, res, next) => {
  req.id = uuidv4();
  logger.info({ requestId: req.id, method: req.method, url: req.url });
  next();
});
```

### Frontend

#### 1. No Centralized API Client
**Location:** `frontend/src/api.js`

**Issue:**
- 100+ exported functions
- No axios interceptors
- Manual token handling
- Hardcoded base URL

**Fix:**
```javascript
// api/client.js
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  timeout: 10000
});

client.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
```

#### 2. No Error Boundaries
**Issue:** App crashes on component errors

**Fix:** Already provided in `frontend-patterns.md`

#### 3. No TypeScript
**Issue:** No type safety, prone to runtime errors

**Recommendation:** Consider TypeScript for Sprint 6+, not Sprint 5.

## Low Priority (Future Sprints)

### Backend

1. **No API Versioning Strategy:** Mix of `/api/v1/` and `/api/`
2. **No Caching Layer:** Redis for frequently accessed data
3. **No Background Jobs:** Bull/BullMQ for async processing
4. **No Health Check Endpoint:** `/health` for monitoring
5. **No Metrics:** Prometheus metrics for monitoring
6. **No Database Backups:** Automated backup strategy

### Frontend

1. **Create React App:** Outdated, should migrate to Vite
2. **Multiple Date Libraries:** Both date-fns AND dayjs
3. **No Code Splitting:** All code loaded upfront
4. **No Progressive Web App:** Could benefit from PWA features
5. **No Internationalization:** i18n for multiple languages
6. **No Automated Testing:** Jest configured but no tests

## Isolation Strategy for Sprint 5

### DO NOT Touch Sprint 1 Code
```
❌ DON'T refactor admin.js (1440 lines of mess)
❌ DON'T refactor userController.js
❌ DON'T change existing API endpoints
❌ DON'T modify Sprint 1 components
```

### Create Isolated Sprint 5 Code
```
✅ DO create backend/routes/v2/shop.js
✅ DO create frontend/src/components/shop/
✅ DO create frontend/src/store/shopStore.js
✅ DO create frontend/src/hooks/useShop*.js
✅ DO add validation ONLY to new endpoints
✅ DO use proper patterns in new code
```

## Sprint 5 Technical Debt to Address

### MUST Fix (Blocking)
1. ✅ Input validation on all shop endpoints
2. ✅ Transaction safety for purchases
3. ✅ Rate limiting on shop routes
4. ✅ Proper error handling in shop service
5. ✅ Loading/error states in shop UI

### SHOULD Fix (High Priority)
1. ✅ Zustand for cart state management
2. ✅ Custom hooks for data fetching
3. ✅ Axios interceptors for API client
4. ✅ PropTypes for shop components
5. ✅ Error boundaries for shop module

### NICE to Have (Medium Priority)
1. ⚠️ Unit tests for shop service
2. ⚠️ Integration tests for shop API
3. ⚠️ Accessibility audit
4. ⚠️ Performance optimization
5. ⚠️ SEO meta tags

## Migration Path (Future)

### Phase 1: Sprint 5 (Current)
- Isolate shop module with best practices
- Demonstrate better patterns

### Phase 2: Sprint 6 (Future)
- Refactor one Sprint 1 module using shop patterns
- Add TypeScript to new code

### Phase 3: Sprint 7+ (Future)
- Migrate to Vite
- Add comprehensive testing
- Implement caching layer
- Add monitoring/metrics

## Monitoring Recommendations

### Add to Production
```javascript
// backend/middleware/monitoring.js
const prometheus = require('prom-client');

const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration.labels(
      req.method,
      req.route?.path || req.path,
      res.statusCode
    ).observe(duration);
  });
  next();
});
```

## Summary

### Critical (Fix in Sprint 5)
1. ❗ Input validation (MUST)
2. ❗ Transaction safety (MUST)
3. ❗ State management for shop (MUST)
4. ❗ API client with interceptors (SHOULD)
5. ❗ Rate limiting (SHOULD)

### Medium (Fix in Sprint 6)
1. ⚠️ console.log → Pino (all code)
2. ⚠️ Enable machine validation
3. ⚠️ JWT secret validation
4. ⚠️ Error boundaries everywhere
5. ⚠️ Unit tests

### Low (Fix in Sprint 7+)
1. 📝 Migrate to Vite
2. 📝 Add TypeScript
3. 📝 Redis caching
4. 📝 Background jobs
5. 📝 Monitoring/metrics

**Sprint 5 Approach:** Build shop module as showcase of best practices, isolate from Sprint 1 technical debt.

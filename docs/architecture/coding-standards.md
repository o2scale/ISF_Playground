# Coding Standards & Best Practices

## What to FOLLOW from Sprint 1

### ✅ File Structure
```
backend/
  ├── models/      # Good: Mongoose models
  ├── controllers/ # Good: Request handlers
  ├── services/    # Good: Business logic
  ├── routes/      # Good: Route definitions
  └── middleware/  # Good: Reusable middleware
```

### ✅ Naming Conventions
```javascript
// Files: camelCase or PascalCase
userController.js, User.js, auth.js

// Models: PascalCase
const User = mongoose.model("User", userSchema);

// Variables/Functions: camelCase
const getUserById = async (userId) => { ... }

// Constants: UPPER_SNAKE_CASE
const HTTP_STATUS_CODE = { ... }
```

### ✅ Service Layer Pattern
```javascript
// Good: Business logic in services
// backend/services/coin.js
async getUserBalance(userId) {
  const coinRecord = await Coin.findOrCreateForUser(userId);
  return {
    success: true,
    data: { balance: coinRecord.balance }
  };
}

// Controller just calls service
exports.getUserBalance = async (req, res) => {
  const result = await CoinService.getUserBalance(req.user.id);
  res.status(200).json(result);
};
```

### ✅ Middleware Usage
```javascript
// Good: Reusable authentication/authorization
const { authenticate, authorize } = require('../middleware/auth');

router.post('/admin-route',
  authenticate,
  authorize('module', 'action'),
  controller.method
);
```

### ✅ Response Format
```javascript
// Good: Consistent success/error responses
{
  success: true/false,
  data: { ... },
  message: "Description"
}
```

## What to AVOID from Sprint 1

### ❌ No Input Validation
```javascript
// BAD: No validation in userController.createUser
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  // Directly creates user without validation!
  const newUser = new User({ name, email, password, role });
  await newUser.save();
};

// GOOD: Add validation
const { body, validationResult } = require('express-validator');

router.post('/users', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Continue...
});
```

### ❌ console.log Usage
```javascript
// BAD: Throughout codebase
console.log("balagruha details", response?.data?.balagruhas);
console.error("Error fetching users:", error);

// GOOD: Use proper logger
const { logger, errorLogger } = require('../config/pino-config');

logger.info({ userId, action: 'fetch' }, 'Fetching user details');
errorLogger.error({ error: error.message }, 'Failed to fetch users');
```

### ❌ Plain Text Passwords in createUser
```javascript
// BAD: Relies on pre-save hook only
const newUser = new User({
  name,
  email,
  password,  // No explicit hashing
  role
});

// GOOD: Explicit validation
if (!password || password.length < 6) {
  return res.status(400).json({
    success: false,
    message: "Password must be at least 6 characters"
  });
}
// Then let pre-save hook hash it, or hash explicitly
```

### ❌ Excessive useState in Components
```javascript
// BAD: 37 state variables in admin.js
const [state1, setState1] = useState();
const [state2, setState2] = useState();
// ... 35 more

// GOOD: Use state management or reducer
const [state, dispatch] = useReducer(reducer, initialState);
// OR
const { state1, state2, ... } = useGlobalStore();
```

### ❌ API Calls in Components
```javascript
// BAD: Direct API calls
const fetchData = async () => {
  const response = await fetch('/api/users');
  setUsers(await response.json());
};

// GOOD: Custom hook
const { users, loading, error } = useUsers();
```

### ❌ No Error Handling
```javascript
// BAD: Silent failures
try {
  await someOperation();
} catch (error) {
  // Do nothing or just console.log
}

// GOOD: Proper error handling
try {
  await someOperation();
} catch (error) {
  logger.error({ error }, 'Operation failed');
  return res.status(500).json({
    success: false,
    message: 'Operation failed',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
}
```

### ❌ Hardcoded Values
```javascript
// BAD: Magic numbers and strings
if (distance < 0.6) { ... }
if (role === "admin") { ... }

// GOOD: Named constants
const FACE_MATCH_THRESHOLD = 0.6;
const UserRoles = { ADMIN: 'admin', STUDENT: 'student' };

if (distance < FACE_MATCH_THRESHOLD) { ... }
if (role === UserRoles.ADMIN) { ... }
```

## Sprint 5 Best Practices

### Backend Standards

#### 1. Input Validation (MANDATORY)
```javascript
// backend/routes/v2/shop.js
const { body, param, query, validationResult } = require('express-validator');

const validateCreateOrder = [
  body('items').isArray().notEmpty(),
  body('items.*.shopItemId').isMongoId(),
  body('items.*.quantity').isInt({ min: 1 }),
  body('deliveryMethod').isIn(['pickup', 'balagruha_delivery']),
  body('customerNotes').optional().isString().isLength({ max: 500 })
];

router.post('/orders',
  authenticate,
  validateCreateOrder,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  },
  shopController.createOrder
);
```

#### 2. Error Handling Pattern
```javascript
// backend/services/shop.js
class ShopService {
  async createOrder(userId, orderData) {
    try {
      // Validate coin balance
      const coinRecord = await Coin.findOrCreateForUser(userId);
      if (coinRecord.balance < orderData.totalCost) {
        throw new Error('INSUFFICIENT_BALANCE');
      }

      // Create order
      const order = await Order.create({ ... });

      logger.info({ userId, orderId: order._id }, 'Order created successfully');

      return {
        success: true,
        data: { order }
      };

    } catch (error) {
      errorLogger.error({ userId, error: error.message }, 'Order creation failed');

      if (error.message === 'INSUFFICIENT_BALANCE') {
        return {
          success: false,
          message: 'Insufficient coin balance',
          code: 'INSUFFICIENT_BALANCE'
        };
      }

      return {
        success: false,
        message: 'Order creation failed',
        code: 'ORDER_CREATION_FAILED'
      };
    }
  }
}
```

#### 3. Transaction Safety
```javascript
// Use MongoDB transactions for atomic operations
const mongoose = require('mongoose');

async function completePurchase(userId, orderData) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Deduct coins
    await coinRecord.spendCoins(..., { session });

    // Create order
    const order = await Order.create([orderData], { session });

    // Update inventory
    await ShopItem.updateMany(..., { session });

    await session.commitTransaction();
    return { success: true, order };

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
```

#### 4. Logging Best Practices
```javascript
// GOOD: Structured logging
logger.info({
  userId: req.user._id,
  action: 'purchase',
  orderId: order._id,
  totalCost: order.totalCost,
  clientIP: req.socket.remoteAddress
}, 'Purchase completed successfully');

// BAD: String-only logging
console.log('User purchased items');
```

#### 5. Environment Configuration
```javascript
// backend/config/shop.js
module.exports = {
  maxCartItems: process.env.MAX_CART_ITEMS || 20,
  orderCancellationWindow: process.env.ORDER_CANCELLATION_WINDOW || 3600000, // 1 hour
  minCoinBalance: process.env.MIN_COIN_BALANCE || 0,
  maxOrderValue: process.env.MAX_ORDER_VALUE || 1000
};

// DON'T hardcode in code
```

### Frontend Standards

#### 1. Component Structure
```javascript
// GOOD: Small, focused components
// components/shop/ProductCard.js
import PropTypes from 'prop-types';  // Add prop types!

function ProductCard({ product, onAddToCart }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await onAddToCart(product);
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="product-card">
      <img src={product.thumbnailUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} coins</p>
      <button onClick={handleAddToCart} disabled={isAdding}>
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnailUrl: PropTypes.string
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default ProductCard;
```

#### 2. Custom Hooks
```javascript
// hooks/useShopCart.js
import { useCallback } from 'react';
import { useShopStore } from '../store/shopStore';
import toast from 'react-hot-toast';

export function useShopCart() {
  const { cart, addToCart: addToCartAction, removeFromCart, clearCart } = useShopStore();

  const addToCart = useCallback(async (product) => {
    try {
      await addToCartAction(product);
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error('Failed to add to cart');
      throw error;
    }
  }, [addToCartAction]);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return { cart, addToCart, removeFromCart, clearCart, total };
}
```

#### 3. Error Boundaries
```javascript
// components/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

#### 4. Loading States
```javascript
// GOOD: Show loading states
function ProductGrid() {
  const { products, loading, error } = useShopProducts();

  if (loading) {
    return (
      <div className="grid">
        {[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (products.length === 0) {
    return <EmptyState message="No products available" />;
  }

  return (
    <div className="grid">
      {products.map(product => <ProductCard key={product._id} product={product} />)}
    </div>
  );
}
```

#### 5. Accessibility
```javascript
// GOOD: Semantic HTML + ARIA
<button
  onClick={handleAddToCart}
  disabled={isAdding}
  aria-label={`Add ${product.name} to cart`}
  aria-busy={isAdding}
>
  {isAdding ? 'Adding...' : 'Add to Cart'}
</button>

// Use Radix UI for built-in accessibility
<Dialog.Root>
  <Dialog.Trigger asChild>
    <button>View Details</button>
  </Dialog.Trigger>
  <Dialog.Content aria-describedby="product-description">
    {/* Content */}
  </Dialog.Content>
</Dialog.Root>
```

## Code Review Checklist

### Backend
- [ ] Input validation present (express-validator)
- [ ] Error handling with try-catch
- [ ] Proper logging (Pino, not console.log)
- [ ] Transaction safety for multi-step operations
- [ ] Authentication/authorization middleware
- [ ] No hardcoded values
- [ ] Environment variables for config
- [ ] Async/await used correctly

### Frontend
- [ ] Component < 200 lines
- [ ] PropTypes or TypeScript
- [ ] Loading/error states
- [ ] No API calls in component (use hooks)
- [ ] Proper error handling
- [ ] Accessibility attributes
- [ ] No excessive useState (use Zustand/Context)
- [ ] Semantic HTML

## File Naming

### Backend
```
models/shopItem.js        # camelCase
controllers/shopController.js
services/shop.js
routes/v2/shop.js
middleware/shopValidation.js
```

### Frontend
```
components/shop/ShopDashboard.js  # PascalCase for components
components/shop/ProductCard.js
hooks/useShopCart.js              # camelCase for hooks
store/shopStore.js                # camelCase for stores
api/shopAPI.js                    # camelCase for API clients
```

## Git Commit Messages

### Follow Conventional Commits
```bash
feat(shop): add product listing page
fix(shop): correct coin deduction logic
refactor(shop): extract cart logic to hook
docs(shop): add API documentation
test(shop): add product service tests
chore(shop): update dependencies
```

## Testing Standards (Future)

### Unit Tests
```javascript
describe('ShopService', () => {
  describe('createOrder', () => {
    it('should create order with valid data', async () => {
      const result = await shopService.createOrder(userId, orderData);
      expect(result.success).toBe(true);
      expect(result.data.order).toBeDefined();
    });

    it('should fail with insufficient balance', async () => {
      const result = await shopService.createOrder(userId, { totalCost: 9999 });
      expect(result.success).toBe(false);
      expect(result.code).toBe('INSUFFICIENT_BALANCE');
    });
  });
});
```

## Summary

**FOLLOW:**
- ✅ Service layer pattern
- ✅ Middleware for auth/validation
- ✅ Consistent response format
- ✅ camelCase/PascalCase naming
- ✅ File structure (models/controllers/services)

**AVOID:**
- ❌ No input validation
- ❌ console.log debugging
- ❌ Excessive useState
- ❌ API calls in components
- ❌ Hardcoded values
- ❌ Silent error handling

**Sprint 5 MUST:**
1. Add input validation (express-validator)
2. Use Pino logger, not console
3. Implement transaction safety
4. Create custom hooks
5. Add loading/error states
6. Use Zustand for state
7. PropTypes or TypeScript
8. Write tests (at least for critical paths)

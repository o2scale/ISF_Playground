# Sprint 5 Brownfield Architecture - ISF Shop

**Project:** ISF Playground - Sprint 5 Implementation
**Date Created:** October 7, 2025 - 5:56 PM
**Sprint Duration:** 15-22 days
**Architecture Type:** Brownfield (extending existing system)
**Strategy:** Module Isolation with Safe Extension

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Strategic Context](#strategic-context)
3. [System Architecture](#system-architecture)
4. [Database Architecture](#database-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Frontend Architecture](#frontend-architecture)
7. [Integration Strategy](#integration-strategy)
8. [Security & Validation](#security--validation)
9. [Performance Optimization](#performance-optimization)
10. [Testing Strategy](#testing-strategy)
11. [Implementation Plan](#implementation-plan)
12. [Risk Management](#risk-management)

---

## Executive Summary

### Project Overview

Sprint 5 implements the **ISF Shop** - a virtual economy system allowing students to spend earned coins on physical/digital products. This is a brownfield implementation extending an existing Electron desktop application with Sprint 1 (authentication, coin wallet, user management) and WTF module already completed.

### Core Objectives

1. **Student-Facing Shop:** Product catalog, cart, checkout, order history
2. **Admin Product Management:** CRUD operations, inventory tracking, stock management
3. **Coin Economy Integration:** Seamless spending integration with existing earning system
4. **Reporting & Analytics:** Transaction reports, top products, student leaderboards

### Key Architectural Principles

✅ **Isolation:** Sprint 5 as self-contained module, zero modifications to Sprint 1 code
✅ **Extension:** Extend existing systems (coin wallet, notifications) via safe extension points
✅ **Best Practices:** Validation, transactions, state management (avoid Sprint 1 anti-patterns)
✅ **Backward Compatibility:** All changes are additive, no breaking changes

### Timeline & Scope

- **Duration:** 15-22 days (3-4 weeks)
- **Team Size:** 2-3 developers
- **Complexity:** Medium-High (brownfield, coin transaction atomicity, inventory concurrency)
- **Risk Level:** Low-Medium (well-defined integration points, isolated module)

---

## Strategic Context

### Current System State

#### ✅ Completed (Sprint 1)
- **Authentication:** Email/password, student ID, facial recognition (Face-API.js)
- **User Management:** Admin, Coach, Student, Amma roles with RBAC
- **Coin Wallet:** Earning system operational (`earnCoins()` method)
- **Notification System:** WebSocket real-time notifications with ISF_SHOP_UPDATE category
- **Machine Tracking:** Offline capability with local SQLite + MongoDB sync
- **Task Management:** Basic task CRUD and assignments

#### ✅ Completed (WTF Module)
- **Wall for Thrust towards Fame:** Pin submission, coach suggestions, 7-day lifecycle
- **File Upload:** AWS S3 integration with Multer
- **Real-time Updates:** WebSocket implementation patterns established
- **Analytics:** Reporting infrastructure operational

#### ⚠️ Known Technical Debt (Isolated, DO NOT TOUCH)

**Backend Issues:**
- No input validation (accept raw body params)
- Plain text password handling in `createUser`
- No transaction safety (non-atomic operations)
- console.log instead of structured logging
- No rate limiting on auth endpoints

**Frontend Issues:**
- Excessive useState (37 in `admin.js` - 1440 lines)
- API calls directly in components
- No state management library
- No loading/error state handling
- No centralized API client

**Strategy:** Build Sprint 5 as showcase of best practices, completely isolated from Sprint 1 code.

### Integration Readiness

| System | Status | Integration Approach |
|--------|--------|----------------------|
| **Coin Wallet** | ✅ Ready | Extend `source` enum with "shop" |
| **Notifications** | ✅ Ready | Use existing `ISF_SHOP_UPDATE` category |
| **Authentication** | ✅ Ready | Reuse existing `authenticate` middleware |
| **AWS S3** | ✅ Ready | Reuse existing Multer + S3 config |
| **WebSocket** | ⚠️ Optional | Only if real-time stock needed |
| **User Model** | ✅ Ready | Add optional `shopProfile` field |

---

## System Architecture

### High-Level Architecture

```
┌───────────────────────────────────────────────────────────┐
│              Electron Desktop Application                 │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Sprint 1  │  │ WTF Module  │  │  Sprint 5   │     │
│  │   (Core)    │  │ (Complete)  │  │ (ISF Shop)  │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │             │
│  ┌──────┴────────────────┴────────────────┴──────┐      │
│  │         Shared Infrastructure                  │      │
│  │  - Coin Wallet (EXTEND)                       │      │
│  │  - Notifications (REUSE)                      │      │
│  │  - Authentication (REUSE)                     │      │
│  │  - AWS S3 (REUSE)                             │      │
│  └──────┬─────────────────────────────────────────┘      │
│         │                                                │
└─────────┼────────────────────────────────────────────────┘
          │
    ┌─────▼─────────────────────────┐
    │   Node.js Backend API         │
    │   Express + WebSocket Server  │
    ├───────────────────────────────┤
    │  Existing (Sprint 1):         │
    │   - /api/v1/users             │
    │   - /api/v1/coins             │
    │   - /api/v1/wtf               │
    │                               │
    │  NEW (Sprint 5):              │
    │   - /api/v2/shop/*  ◄─────────┼── Isolated v2 namespace
    └─────┬─────────────────────────┘
          │
    ┌─────▼──────┬──────────────┐
    │  MongoDB   │   AWS S3     │
    │  Database  │   Storage    │
    ├────────────┴──────────────┤
    │ Existing Collections:     │
    │  - users                  │
    │  - coins                  │
    │  - notifications          │
    │                           │
    │ NEW Collections:          │
    │  - shopItems              │
    │  - orders                 │
    │  - carts                  │
    └───────────────────────────┘
```

### Data Flow: Complete Purchase Journey

```
┌─────────────┐
│   Student   │
│ Browses Shop│
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Product List   │ ◄────┐
│  (Filter/Sort)  │      │ GET /api/v2/shop/products
└──────┬──────────┘      │ (JWT authenticated)
       │                 │
       ▼                 │
┌─────────────────┐      │
│ Add to Cart     │ ◄────┤ POST /api/v2/shop/cart
│ (Zustand Store) │      │ (Save to DB + Local Storage)
└──────┬──────────┘      │
       │                 │
       ▼                 │
┌─────────────────┐      │
│ View Cart       │ ◄────┤ GET /api/v2/shop/cart
│ (Modify Items)  │      │
└──────┬──────────┘      │
       │                 │
       ▼                 │
┌─────────────────┐      │
│ Checkout Button │      │
│ Click           │      │
└──────┬──────────┘      │
       │                 │
       ▼                 │
┌─────────────────────────────────────┐
│ POST /api/v2/shop/orders (Checkout) │
└──────┬──────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────┐
│         MongoDB Transaction (ATOMIC)             │
├──────────────────────────────────────────────────┤
│  1. Validate Stock (for each item)               │
│     ├─ Insufficient? → Rollback + Error          │
│     └─ Sufficient? → Continue                    │
│                                                  │
│  2. Calculate Total Cost                         │
│     └─ Apply pricing rules                       │
│                                                  │
│  3. Check Coin Balance                           │
│     ├─ Insufficient? → Rollback + Error          │
│     └─ Sufficient? → Continue                    │
│                                                  │
│  4. Deduct Coins                                 │
│     └─ coinRecord.spendCoins(total, "shop")      │
│                                                  │
│  5. Decrement Stock (with version locking)       │
│     └─ ShopItem.findOneAndUpdate({__v})          │
│                                                  │
│  6. Create Order Document                        │
│     └─ Order.create(orderData, {session})        │
│                                                  │
│  7. Clear Cart                                   │
│     └─ Cart.deleteOne({userId}, {session})       │
│                                                  │
│  8. Send Notification                            │
│     └─ Notification.createPersonal(...)          │
│                                                  │
│  ✅ Commit Transaction                           │
│  ❌ Error? → Rollback ALL                        │
└──────┬───────────────────────────────────────────┘
       │
       ▼
┌─────────────────┐
│ Order Success   │
│ UI + Receipt    │
└─────────────────┘
```

### Module Isolation Strategy

**Principle:** Sprint 5 is a completely isolated module. No modifications to Sprint 1 code.

```
┌─────────────────────────────────────────────────────────┐
│                    ISF Shop Module                      │
│                     (Sprint 5)                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Backend:                                               │
│   ├─ routes/v2/shop.js          ◄── NEW v2 namespace   │
│   ├─ controllers/shopController.js                      │
│   ├─ services/shopService.js                            │
│   ├─ models/shopItem.js                                 │
│   ├─ models/order.js                                    │
│   └─ models/cart.js                                     │
│                                                         │
│  Frontend:                                              │
│   ├─ components/shop/*          ◄── NEW isolated dir   │
│   ├─ store/shopStore.js         ◄── Zustand            │
│   ├─ hooks/useShop*.js          ◄── Custom hooks       │
│   └─ api/shopAPI.js             ◄── Axios client       │
│                                                         │
└────────────┬────────────────────────────────────────────┘
             │
             │ Integration via Extension Points Only
             │
┌────────────▼────────────────────────────────────────────┐
│              Sprint 1 Systems (NO MODIFICATIONS)        │
├─────────────────────────────────────────────────────────┤
│  Coin Model:                                            │
│   └─ source: [...existing, "shop"]  ◄── ADD enum value │
│                                                         │
│  User Model:                                            │
│   └─ shopProfile: { Optional }      ◄── ADD field      │
│                                                         │
│  Notification:                                          │
│   └─ ISF_SHOP_UPDATE                ◄── ALREADY EXISTS │
│                                                         │
│  Auth Middleware:                                       │
│   └─ authenticate, roleCheck        ◄── REUSE AS-IS    │
└─────────────────────────────────────────────────────────┘
```

---

## Database Architecture

### New Collections

#### ShopItem Collection

```javascript
const ShopItemSchema = new mongoose.Schema({
  // Identity
  _id: ObjectId,
  sku: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },

  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  description: {
    type: String,
    maxLength: 500
  },

  // Categorization
  category: {
    type: String,
    enum: ['stationery', 'sports', 'books', 'uniforms', 'digital', 'other'],
    required: true,
    index: true
  },

  // Pricing
  price: {
    type: Number,
    required: true,
    min: 1
  },
  discountPrice: {
    type: Number,
    min: 0,
    validate: {
      validator: function(v) {
        return !v || v < this.price;
      },
      message: 'Discount price must be less than regular price'
    }
  },

  // Inventory
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  lowStockThreshold: {
    type: Number,
    default: 5
  },

  // Media
  imageUrl: {
    type: String
  },

  // Status
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },

  // Metadata
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Versioning for optimistic locking
  __v: {
    type: Number
  }
}, {
  timestamps: true
});

// Indexes
ShopItemSchema.index({ category: 1, isActive: 1, stock: 1 });
ShopItemSchema.index({ name: 'text', description: 'text' });

// Virtual: Current Price (with discount logic)
ShopItemSchema.virtual('currentPrice').get(function() {
  return this.discountPrice || this.price;
});

// Virtual: In Stock
ShopItemSchema.virtual('inStock').get(function() {
  return this.stock > 0;
});

// Virtual: Low Stock Warning
ShopItemSchema.virtual('lowStock').get(function() {
  return this.stock > 0 && this.stock <= this.lowStockThreshold;
});

module.exports = mongoose.model('ShopItem', ShopItemSchema);
```

#### Order Collection

```javascript
const OrderSchema = new mongoose.Schema({
  // Identity
  _id: ObjectId,
  orderNumber: {
    type: String,
    unique: true,
    required: true
    // Format: ORD-20251007-00001
  },

  // User Reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  // Order Items (snapshot at time of purchase)
  items: [{
    shopItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShopItem',
      required: true
    },
    name: {
      type: String,
      required: true  // Snapshot for order history
    },
    sku: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true  // Price at time of purchase
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    subtotal: {
      type: Number,
      required: true
    }
  }],

  // Pricing
  subtotal: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },

  // Status
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled', 'refunded'],
    default: 'completed',  // Most orders complete immediately
    index: true
  },

  // Timestamps
  placedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  completedAt: Date,
  cancelledAt: Date,

  // Cancellation
  cancellationReason: String,
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // References
  coinTransactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coin'
  }
}, {
  timestamps: true
});

// Indexes
OrderSchema.index({ userId: 1, placedAt: -1 });
OrderSchema.index({ status: 1, placedAt: -1 });
OrderSchema.index({ orderNumber: 1 }, { unique: true });

// Pre-save: Calculate totals
OrderSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('items')) {
    this.subtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
    this.totalAmount = this.subtotal - this.discount;
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
```

#### Cart Collection

```javascript
const CartSchema = new mongoose.Schema({
  // User Reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },

  // Cart Items
  items: [{
    shopItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShopItem',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      max: 99
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // Metadata
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save: Update lastUpdated
CartSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Methods
CartSchema.methods.addItem = function(shopItemId, quantity = 1) {
  const existingItem = this.items.find(item =>
    item.shopItemId.toString() === shopItemId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({ shopItemId, quantity });
  }

  return this.save();
};

CartSchema.methods.removeItem = function(shopItemId) {
  this.items = this.items.filter(item =>
    item.shopItemId.toString() !== shopItemId.toString()
  );
  return this.save();
};

CartSchema.methods.updateQuantity = function(shopItemId, quantity) {
  const item = this.items.find(item =>
    item.shopItemId.toString() === shopItemId.toString()
  );

  if (item) {
    item.quantity = quantity;
  }

  return this.save();
};

CartSchema.methods.clear = function() {
  this.items = [];
  return this.save();
};

module.exports = mongoose.model('Cart', CartSchema);
```

### Schema Extensions (Sprint 1 Models)

#### Coin Model Extension

**File:** `backend/models/coin.js`

**Current `source` enum:**
```javascript
source: {
  type: String,
  enum: [
    "earned",
    "spent",
    "bonus",
    "penalty",
    "wtf_submission",
    "wtf_accepted",
    "wtf_expired"
  ]
}
```

**ADD ONE VALUE:**
```javascript
source: {
  type: String,
  enum: [
    "earned",
    "spent",
    "bonus",
    "penalty",
    "wtf_submission",
    "wtf_accepted",
    "wtf_expired",
    "shop"  // ◄── ADD THIS ONLY
  ]
}
```

**Existing `spendCoins()` method (already implemented):**
```javascript
CoinSchema.methods.spendCoins = async function(
  amount,
  transactionType,
  description,
  source,
  metadata = {}
) {
  if (this.balance < amount) {
    throw new Error('Insufficient coin balance');
  }

  this.balance -= amount;
  this.totalSpent += amount;
  this.lastTransaction = new Date();

  this.transactionHistory.push({
    transactionType,
    amount: -amount,
    balanceAfter: this.balance,
    description,
    source,
    metadata,
    timestamp: new Date()
  });

  await this.save();
  return this;
};
```

**Usage in Shop:**
```javascript
await coinRecord.spendCoins(
  totalAmount,
  "spent",
  `Shop purchase - Order ${orderNumber}`,
  "shop",  // ◄── Use new source value
  {
    orderId: order._id,
    itemCount: order.items.length
  }
);
```

#### User Model Extension

**File:** `backend/models/user.js`

**ADD optional field to existing schema:**
```javascript
const UserSchema = new mongoose.Schema({
  // ... existing fields (DO NOT TOUCH) ...

  // NEW Sprint 5 field (OPTIONAL - backward compatible)
  shopProfile: {
    wishlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShopItem'
    }],
    favoriteCategories: [String],
    lastPurchaseDate: Date,
    totalPurchases: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    }
  }

  // ... rest of schema ...
});
```

**This is safe because:**
1. Field is optional (not required)
2. Has default behavior (empty/undefined)
3. Backward compatible (old user documents still work)
4. No modifications to existing fields

### Database Indexes

```javascript
// ShopItem indexes
ShopItemSchema.index({ sku: 1 }, { unique: true });
ShopItemSchema.index({ category: 1, isActive: 1 });
ShopItemSchema.index({ name: 'text', description: 'text' });

// Order indexes
OrderSchema.index({ userId: 1, placedAt: -1 });
OrderSchema.index({ status: 1, placedAt: -1 });
OrderSchema.index({ orderNumber: 1 }, { unique: true });

// Cart indexes
CartSchema.index({ userId: 1 }, { unique: true });
```

---

## Backend Architecture

### Directory Structure

```
backend/
├── routes/
│   ├── v1/                      # Existing Sprint 1 routes
│   │   ├── users.js
│   │   ├── coin.js
│   │   └── wtf.js
│   │
│   └── v2/                      # ◄── NEW Sprint 5 namespace
│       └── shop.js              # All shop routes
│
├── controllers/
│   ├── userController.js        # Sprint 1 (DO NOT TOUCH)
│   ├── coinController.js        # Sprint 1 (DO NOT TOUCH)
│   │
│   └── shopController.js        # ◄── NEW Sprint 5
│
├── services/
│   ├── coinService.js           # Sprint 1 (REUSE)
│   ├── notificationService.js   # Sprint 1 (REUSE)
│   │
│   ├── shopService.js           # ◄── NEW Sprint 5
│   └── orderService.js          # ◄── NEW Sprint 5
│
├── models/
│   ├── user.js                  # Sprint 1 (EXTEND - add shopProfile)
│   ├── coin.js                  # Sprint 1 (EXTEND - add "shop" to enum)
│   ├── notification.js          # Sprint 1 (REUSE AS-IS)
│   │
│   ├── shopItem.js              # ◄── NEW Sprint 5
│   ├── order.js                 # ◄── NEW Sprint 5
│   └── cart.js                  # ◄── NEW Sprint 5
│
├── middleware/
│   ├── auth.js                  # Sprint 1 (REUSE)
│   │
│   ├── shopValidation.js        # ◄── NEW Sprint 5
│   └── rateLimiter.js           # ◄── NEW Sprint 5
│
└── utils/
    ├── s3Upload.js              # Sprint 1 (REUSE)
    │
    └── orderNumberGenerator.js  # ◄── NEW Sprint 5
```

### API Routes (v2 Namespace)

**File:** `backend/routes/v2/shop.js`

```javascript
const express = require('express');
const router = express.Router();
const shopController = require('../../controllers/shopController');
const { authenticate, roleCheck } = require('../../middleware/auth');
const {
  validateAddToCart,
  validateCheckout,
  validateProductCreate,
  validateProductUpdate
} = require('../../middleware/shopValidation');
const rateLimiter = require('../../middleware/rateLimiter');

// ─────────────────────────────────────────────────────────
// PUBLIC / STUDENT ROUTES
// ─────────────────────────────────────────────────────────

// Browse Products
router.get('/products',
  authenticate,
  shopController.getProducts
);
// Query params: ?category=books&search=math&page=1&limit=20&sort=price

// Get Product Detail
router.get('/products/:productId',
  authenticate,
  shopController.getProductById
);

// ─────────────────────────────────────────────────────────
// CART ROUTES (Student Only)
// ─────────────────────────────────────────────────────────

// Get Cart
router.get('/cart',
  authenticate,
  roleCheck(['student']),
  shopController.getCart
);

// Add to Cart
router.post('/cart',
  authenticate,
  roleCheck(['student']),
  rateLimiter.cart,  // Prevent rapid adds
  validateAddToCart,
  shopController.addToCart
);

// Update Cart Item Quantity
router.put('/cart/:shopItemId',
  authenticate,
  roleCheck(['student']),
  validateAddToCart,
  shopController.updateCartItem
);

// Remove from Cart
router.delete('/cart/:shopItemId',
  authenticate,
  roleCheck(['student']),
  shopController.removeFromCart
);

// Clear Cart
router.delete('/cart',
  authenticate,
  roleCheck(['student']),
  shopController.clearCart
);

// ─────────────────────────────────────────────────────────
// ORDER ROUTES (Student)
// ─────────────────────────────────────────────────────────

// Checkout (Create Order)
router.post('/orders',
  authenticate,
  roleCheck(['student']),
  rateLimiter.checkout,  // Rate limit to prevent spam
  validateCheckout,
  shopController.createOrder
);

// Get Order History
router.get('/orders',
  authenticate,
  roleCheck(['student']),
  shopController.getOrders
);

// Get Order Detail
router.get('/orders/:orderId',
  authenticate,
  roleCheck(['student']),
  shopController.getOrderById
);

// Cancel Order (within 5 minutes)
router.delete('/orders/:orderId',
  authenticate,
  roleCheck(['student']),
  shopController.cancelOrder
);

// ─────────────────────────────────────────────────────────
// ADMIN ROUTES
// ─────────────────────────────────────────────────────────

// Create Product
router.post('/admin/products',
  authenticate,
  roleCheck(['admin']),
  validateProductCreate,
  shopController.createProduct
);

// Update Product
router.put('/admin/products/:productId',
  authenticate,
  roleCheck(['admin']),
  validateProductUpdate,
  shopController.updateProduct
);

// Delete Product (soft delete)
router.delete('/admin/products/:productId',
  authenticate,
  roleCheck(['admin']),
  shopController.deleteProduct
);

// Update Stock
router.patch('/admin/products/:productId/stock',
  authenticate,
  roleCheck(['admin']),
  shopController.updateStock
);

// Get All Orders (Admin view)
router.get('/admin/orders',
  authenticate,
  roleCheck(['admin']),
  shopController.getAllOrders
);

// Analytics Dashboard
router.get('/admin/analytics',
  authenticate,
  roleCheck(['admin']),
  shopController.getAnalytics
);

// Low Stock Report
router.get('/admin/inventory/low-stock',
  authenticate,
  roleCheck(['admin']),
  shopController.getLowStockItems
);

module.exports = router;
```

**Mount in `server.js`:**
```javascript
// Sprint 1 routes (existing)
app.use('/api/v1/users', require('./routes/v1/users'));
app.use('/api/v1/coins', require('./routes/v1/coin'));
app.use('/api/v1/wtf', require('./routes/v1/wtf'));

// Sprint 5 routes (NEW)
app.use('/api/v2/shop', require('./routes/v2/shop'));
```

### Service Layer (Business Logic)

**File:** `backend/services/shopService.js`

```javascript
const mongoose = require('mongoose');
const ShopItem = require('../models/shopItem');
const Order = require('../models/order');
const Cart = require('../models/cart');
const Coin = require('../models/coin');
const Notification = require('../models/notification');
const { generateOrderNumber } = require('../utils/orderNumberGenerator');

class ShopService {
  /**
   * Create Order (Atomic Transaction)
   * CRITICAL: All steps must succeed or all rollback
   */
  static async createOrder(userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Get User's Cart
      const cart = await Cart.findOne({ userId }).populate('items.shopItemId');
      if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
      }

      // 2. Validate Stock for ALL Items
      const stockValidation = await Promise.all(
        cart.items.map(async (item) => {
          const product = await ShopItem.findById(item.shopItemId);
          if (!product) {
            throw new Error(`Product ${item.shopItemId} not found`);
          }
          if (!product.isActive) {
            throw new Error(`Product ${product.name} is no longer available`);
          }
          if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for ${product.name}`);
          }
          return { product, quantity: item.quantity };
        })
      );

      // 3. Calculate Total Amount
      let totalAmount = 0;
      const orderItems = [];

      for (const { product, quantity } of stockValidation) {
        const price = product.currentPrice;  // Uses virtual for discount logic
        const subtotal = price * quantity;
        totalAmount += subtotal;

        orderItems.push({
          shopItemId: product._id,
          name: product.name,
          sku: product.sku,
          price,
          quantity,
          subtotal
        });
      }

      // 4. Check Coin Balance
      const coinRecord = await Coin.findOne({ userId });
      if (!coinRecord || coinRecord.balance < totalAmount) {
        throw new Error('Insufficient coin balance');
      }

      // 5. Deduct Coins (using existing spendCoins method)
      const orderNumber = generateOrderNumber();
      await coinRecord.spendCoins(
        totalAmount,
        "spent",
        `Shop purchase - Order ${orderNumber}`,
        "shop",
        {
          orderId: orderNumber,
          itemCount: orderItems.length
        }
      );

      // 6. Decrement Stock (with optimistic locking)
      for (const { product, quantity } of stockValidation) {
        const result = await ShopItem.findOneAndUpdate(
          {
            _id: product._id,
            stock: { $gte: quantity },
            __v: product.__v  // Optimistic locking
          },
          {
            $inc: { stock: -quantity, __v: 1 }
          },
          { new: true, session }
        );

        if (!result) {
          throw new Error(`Concurrent stock update for ${product.name}`);
        }
      }

      // 7. Create Order
      const order = await Order.create([{
        orderNumber,
        userId,
        items: orderItems,
        subtotal: totalAmount,
        discount: 0,
        totalAmount,
        status: 'completed',
        placedAt: new Date(),
        completedAt: new Date(),
        coinTransactionId: coinRecord._id
      }], { session });

      // 8. Clear Cart
      await Cart.deleteOne({ userId }, { session });

      // 9. Send Notification (using existing system)
      await Notification.createPersonal(
        userId,
        'Order Confirmed',
        `Your order ${orderNumber} has been placed successfully! ${orderItems.length} item(s) for ${totalAmount} coins.`,
        'ISF_SHOP_UPDATE',
        {
          orderId: order[0]._id,
          orderNumber,
          totalAmount,
          actionUrl: `/shop/orders/${order[0]._id}`
        }
      );

      // ✅ Commit Transaction
      await session.commitTransaction();

      return {
        success: true,
        order: order[0],
        remainingBalance: coinRecord.balance
      };

    } catch (error) {
      // ❌ Rollback Transaction
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Cancel Order (within 5 minutes, refund coins)
   */
  static async cancelOrder(orderId, userId, reason) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Find Order
      const order = await Order.findOne({ _id: orderId, userId });
      if (!order) {
        throw new Error('Order not found');
      }

      // 2. Check if cancellable
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      if (order.placedAt < fiveMinutesAgo) {
        throw new Error('Order can only be cancelled within 5 minutes');
      }

      if (order.status !== 'completed') {
        throw new Error('Order cannot be cancelled');
      }

      // 3. Refund Coins
      const coinRecord = await Coin.findOne({ userId });
      await coinRecord.earnCoins(
        order.totalAmount,
        "earned",
        `Refund for cancelled order ${order.orderNumber}`,
        "shop",
        { orderId: order._id }
      );

      // 4. Restore Stock
      for (const item of order.items) {
        await ShopItem.findByIdAndUpdate(
          item.shopItemId,
          { $inc: { stock: item.quantity } },
          { session }
        );
      }

      // 5. Update Order Status
      order.status = 'cancelled';
      order.cancelledAt = new Date();
      order.cancelledBy = userId;
      order.cancellationReason = reason;
      await order.save({ session });

      // 6. Notify User
      await Notification.createPersonal(
        userId,
        'Order Cancelled',
        `Order ${order.orderNumber} has been cancelled. ${order.totalAmount} coins refunded.`,
        'ISF_SHOP_UPDATE',
        { orderId: order._id }
      );

      await session.commitTransaction();

      return {
        success: true,
        refundedAmount: order.totalAmount,
        newBalance: coinRecord.balance
      };

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Get Products (with filtering, pagination)
   */
  static async getProducts(filters = {}) {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      inStock = true,
      page = 1,
      limit = 20,
      sort = '-createdAt'
    } = filters;

    const query = { isActive: true };

    // Category filter
    if (category) {
      query.category = category;
    }

    // Search filter (text index)
    if (search) {
      query.$text = { $search: search };
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    // Stock filter
    if (inStock) {
      query.stock = { $gt: 0 };
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      ShopItem.find(query)
        .select('-__v')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      ShopItem.countDocuments(query)
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get Analytics (Admin Dashboard)
   */
  static async getAnalytics(startDate, endDate) {
    const dateFilter = {
      placedAt: {
        $gte: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        $lte: endDate || new Date()
      }
    };

    const [
      totalOrders,
      totalRevenue,
      topProducts,
      recentOrders
    ] = await Promise.all([
      // Total Orders
      Order.countDocuments({ ...dateFilter, status: 'completed' }),

      // Total Revenue
      Order.aggregate([
        { $match: { ...dateFilter, status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),

      // Top Products
      Order.aggregate([
        { $match: { ...dateFilter, status: 'completed' } },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.shopItemId',
            name: { $first: '$items.name' },
            totalQuantity: { $sum: '$items.quantity' },
            totalRevenue: { $sum: '$items.subtotal' }
          }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 10 }
      ]),

      // Recent Orders
      Order.find(dateFilter)
        .populate('userId', 'name email')
        .sort('-placedAt')
        .limit(10)
        .lean()
    ]);

    return {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      topProducts,
      recentOrders
    };
  }
}

module.exports = ShopService;
```

**File:** `backend/utils/orderNumberGenerator.js`

```javascript
/**
 * Generate Order Number: ORD-YYYYMMDD-XXXXX
 * Example: ORD-20251007-00042
 */
function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Generate random 5-digit number
  const random = Math.floor(Math.random() * 99999).toString().padStart(5, '0');

  return `ORD-${year}${month}${day}-${random}`;
}

module.exports = { generateOrderNumber };
```

---

## Frontend Architecture

### Directory Structure

```
frontend/src/
├── components/
│   ├── dashboard/
│   │   └── admin.js              # Sprint 1 (DO NOT TOUCH - 1440 lines)
│   │
│   ├── shop/                     # ◄── NEW Sprint 5 Module
│   │   ├── ShopHome.jsx          # Landing page
│   │   ├── ProductList.jsx       # Grid view
│   │   ├── ProductCard.jsx       # Individual product card
│   │   ├── ProductDetail.jsx     # Full product page
│   │   ├── Cart.jsx              # Cart drawer
│   │   ├── Checkout.jsx          # Checkout flow
│   │   ├── OrderHistory.jsx      # Past orders
│   │   ├── OrderDetail.jsx       # Order detail page
│   │   │
│   │   └── components/           # Shop sub-components
│   │       ├── FilterPanel.jsx
│   │       ├── SortDropdown.jsx
│   │       ├── CartIcon.jsx
│   │       ├── CoinBalance.jsx
│   │       └── EmptyState.jsx
│   │
│   └── admin/
│       └── shop/                 # ◄── NEW Admin Shop Module
│           ├── ProductManagement.jsx
│           ├── ProductForm.jsx
│           ├── ProductTable.jsx
│           ├── OrderManagement.jsx
│           └── ShopAnalytics.jsx
│
├── store/
│   └── shopStore.js              # ◄── NEW Zustand store
│
├── hooks/
│   ├── useShopProducts.js        # ◄── NEW
│   ├── useCart.js                # ◄── NEW
│   ├── useOrders.js              # ◄── NEW
│   └── useCoinBalance.js         # ◄── NEW
│
├── api/
│   ├── apiService.js             # Sprint 1 (AVOID - 100+ exports)
│   │
│   └── shopAPI.js                # ◄── NEW Axios client
│
└── utils/
    ├── coinFormatter.js          # ◄── NEW
    └── orderHelpers.js           # ◄── NEW
```

### State Management (Zustand)

**File:** `frontend/src/store/shopStore.js`

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useShopStore = create(
  persist(
    (set, get) => ({
      // Cart State
      cart: [],
      cartLoading: false,
      cartError: null,

      // Product List State
      products: [],
      productsLoading: false,
      productsError: null,
      filters: {
        category: null,
        search: '',
        minPrice: null,
        maxPrice: null,
        inStock: true
      },
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        pages: 0
      },

      // Actions: Cart
      setCart: (cart) => set({ cart }),

      addToCart: (product, quantity = 1) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find(item => item._id === product._id);

        if (existingItem) {
          set({
            cart: currentCart.map(item =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ cart: [...currentCart, { ...product, quantity }] });
        }
      },

      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(item => item._id !== productId)
        });
      },

      updateQuantity: (productId, quantity) => {
        set({
          cart: get().cart.map(item =>
            item._id === productId ? { ...item, quantity } : item
          )
        });
      },

      clearCart: () => set({ cart: [] }),

      // Actions: Products
      setProducts: (products) => set({ products }),
      setProductsLoading: (loading) => set({ productsLoading: loading }),
      setProductsError: (error) => set({ productsError: error }),

      setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),
      resetFilters: () => set({
        filters: {
          category: null,
          search: '',
          minPrice: null,
          maxPrice: null,
          inStock: true
        }
      }),

      setPagination: (pagination) => set({ pagination }),

      // Computed Values
      cartTotal: () => {
        return get().cart.reduce((total, item) => {
          const price = item.currentPrice || item.price;
          return total + (price * item.quantity);
        }, 0);
      },

      cartItemCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'shop-storage',
      partialize: (state) => ({ cart: state.cart })  // Only persist cart
    }
  )
);

export default useShopStore;
```

### Custom Hooks

**File:** `frontend/src/hooks/useShopProducts.js`

```javascript
import { useState, useEffect } from 'react';
import useShopStore from '../store/shopStore';
import shopAPI from '../api/shopAPI';

export const useShopProducts = () => {
  const {
    products,
    productsLoading,
    productsError,
    filters,
    pagination,
    setProducts,
    setProductsLoading,
    setProductsError,
    setPagination
  } = useShopStore();

  const fetchProducts = async () => {
    setProductsLoading(true);
    setProductsError(null);

    try {
      const response = await shopAPI.getProducts({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      });

      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      setProductsError(error.message);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, pagination.page]);

  return {
    products,
    loading: productsLoading,
    error: productsError,
    pagination,
    refetch: fetchProducts
  };
};
```

**File:** `frontend/src/hooks/useCart.js`

```javascript
import { useState } from 'react';
import useShopStore from '../store/shopStore';
import shopAPI from '../api/shopAPI';
import { toast } from 'react-toastify';

export const useCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    cart,
    setCart,
    addToCart: addToCartStore,
    removeFromCart: removeFromCartStore,
    updateQuantity: updateQuantityStore,
    clearCart: clearCartStore,
    cartTotal,
    cartItemCount
  } = useShopStore();

  const syncCart = async () => {
    try {
      const response = await shopAPI.getCart();
      setCart(response.data.items);
    } catch (err) {
      setError(err.message);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    setLoading(true);
    setError(null);

    try {
      // Optimistic update
      addToCartStore(product, quantity);

      // API call
      await shopAPI.addToCart(product._id, quantity);

      toast.success(`${product.name} added to cart`);
    } catch (err) {
      // Revert on error
      removeFromCartStore(product._id);
      setError(err.message);
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);

    try {
      // Optimistic update
      const itemToRemove = cart.find(item => item._id === productId);
      removeFromCartStore(productId);

      // API call
      await shopAPI.removeFromCart(productId);

      toast.success('Item removed from cart');
    } catch (err) {
      // Could revert, but usually not necessary
      setError(err.message);
      toast.error('Failed to remove item');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      return removeFromCart(productId);
    }

    setLoading(true);

    try {
      updateQuantityStore(productId, quantity);
      await shopAPI.updateCartItem(productId, quantity);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to update quantity');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      clearCartStore();
      await shopAPI.clearCart();
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    cart,
    loading,
    error,
    totalCost: cartTotal(),
    itemCount: cartItemCount(),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    syncCart
  };
};
```

### API Client (Axios)

**File:** `frontend/src/api/shopAPI.js`

```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const shopAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/v2/shop`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor (add JWT token)
shopAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle errors)
shopAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);

// API methods
export default {
  // Products
  getProducts: (params) => shopAPI.get('/products', { params }),
  getProductById: (id) => shopAPI.get(`/products/${id}`),

  // Cart
  getCart: () => shopAPI.get('/cart'),
  addToCart: (productId, quantity) =>
    shopAPI.post('/cart', { productId, quantity }),
  updateCartItem: (productId, quantity) =>
    shopAPI.put(`/cart/${productId}`, { quantity }),
  removeFromCart: (productId) => shopAPI.delete(`/cart/${productId}`),
  clearCart: () => shopAPI.delete('/cart'),

  // Orders
  createOrder: () => shopAPI.post('/orders'),
  getOrders: (params) => shopAPI.get('/orders', { params }),
  getOrderById: (orderId) => shopAPI.get(`/orders/${orderId}`),
  cancelOrder: (orderId, reason) =>
    shopAPI.delete(`/orders/${orderId}`, { data: { reason } }),

  // Admin
  createProduct: (data) => shopAPI.post('/admin/products', data),
  updateProduct: (id, data) => shopAPI.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => shopAPI.delete(`/admin/products/${id}`),
  updateStock: (id, stock) =>
    shopAPI.patch(`/admin/products/${id}/stock`, { stock }),
  getAllOrders: (params) => shopAPI.get('/admin/orders', { params }),
  getAnalytics: (params) => shopAPI.get('/admin/analytics', { params }),
  getLowStockItems: () => shopAPI.get('/admin/inventory/low-stock')
};
```

### Key Component Example

**File:** `frontend/src/components/shop/Checkout.jsx`

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useCoinBalance } from '../../hooks/useCoinBalance';
import shopAPI from '../../api/shopAPI';
import { toast } from 'react-toastify';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalCost, clearCart } = useCart();
  const { balance, loading: balanceLoading } = useCoinBalance();
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async () => {
    // Validation
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    if (balance < totalCost) {
      toast.error('Insufficient coin balance');
      return;
    }

    setProcessing(true);

    try {
      const response = await shopAPI.createOrder();
      const { order, remainingBalance } = response.data;

      // Clear local cart
      clearCart();

      // Success
      toast.success(`Order ${order.orderNumber} placed successfully!`);

      // Navigate to order detail
      navigate(`/shop/orders/${order._id}`);

    } catch (error) {
      toast.error(error.message || 'Checkout failed');
    } finally {
      setProcessing(false);
    }
  };

  if (balanceLoading) {
    return <div>Loading...</div>;
  }

  const hasSufficientBalance = balance >= totalCost;

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h3>Order Summary</h3>
        {cart.map((item) => (
          <div key={item._id} className="checkout-item">
            <span>{item.name}</span>
            <span>{item.quantity} × {item.currentPrice}</span>
            <span>{item.quantity * item.currentPrice} coins</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="checkout-total">
        <span>Total:</span>
        <span className="total-amount">{totalCost} coins</span>
      </div>

      {/* Balance Check */}
      <div className={`balance-check ${hasSufficientBalance ? 'sufficient' : 'insufficient'}`}>
        <span>Your Balance:</span>
        <span>{balance} coins</span>
      </div>

      {!hasSufficientBalance && (
        <div className="error-message">
          You need {totalCost - balance} more coins to complete this purchase.
        </div>
      )}

      {/* Checkout Button */}
      <button
        className="btn-primary"
        onClick={handleCheckout}
        disabled={!hasSufficientBalance || processing}
      >
        {processing ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
}
```

---

## Integration Strategy

### Integration Points with Sprint 1

#### 1. Coin Wallet Integration

**System:** Existing coin earning system
**Location:** `backend/models/coin.js`
**Integration Type:** Extension

**What Already Exists:**
```javascript
// Coin model with balance tracking
balance: Number
totalEarned: Number
totalSpent: Number

// Methods
earnCoins(amount, type, description, source, metadata)
spendCoins(amount, type, description, source, metadata)
```

**What Sprint 5 Adds:**
```javascript
// ADD to source enum
source: [...existing, "shop"]

// Usage in shop
await coinRecord.spendCoins(
  totalAmount,
  "spent",
  `Shop purchase - Order ${orderNumber}`,
  "shop",  // ◄── New source value
  { orderId: order._id }
);
```

**Why This Works:**
- ✅ Backward compatible (only adds enum value)
- ✅ Reuses existing `spendCoins()` method
- ✅ No modifications to existing coin earning logic
- ✅ Transaction history preserved

#### 2. Notification System Integration

**System:** Existing notification center
**Location:** `backend/models/notification.js`
**Integration Type:** Reuse (no changes)

**What Already Exists:**
```javascript
// Notification categories
category: [
  "TASK_UPDATE",
  "WTF_UPDATE",
  "ISF_SHOP_UPDATE",  // ◄── ALREADY EXISTS!
  ...
]

// Methods
Notification.createPersonal(userId, title, message, category, metadata)
```

**What Sprint 5 Uses:**
```javascript
// Order confirmation
await Notification.createPersonal(
  userId,
  "Order Confirmed",
  `Your order ${orderNumber} has been placed successfully!`,
  "ISF_SHOP_UPDATE",  // ◄── Use existing category
  {
    orderId: order._id,
    orderNumber,
    totalAmount,
    actionUrl: `/shop/orders/${order._id}`
  }
);

// Low balance warning
await Notification.createPersonal(
  userId,
  "Low Coin Balance",
  "You need more coins to complete this purchase. Complete tasks to earn more!",
  "ISF_SHOP_UPDATE",
  { actionUrl: "/tasks" }
);
```

**Why This Works:**
- ✅ ISF_SHOP_UPDATE category already defined
- ✅ WebSocket delivery functional
- ✅ Notification center UI already renders shop notifications
- ✅ Zero code changes needed

#### 3. Authentication Integration

**System:** Existing JWT + RBAC middleware
**Location:** `backend/middleware/auth.js`
**Integration Type:** Reuse (no changes)

**What Already Exists:**
```javascript
// Middleware
authenticate(req, res, next)  // Validates JWT
roleCheck(allowedRoles)       // Checks user role

// Usage pattern
router.post('/endpoint',
  authenticate,
  roleCheck(['admin']),
  controller.method
);
```

**What Sprint 5 Uses:**
```javascript
// Reuse authentication middleware
const { authenticate, roleCheck } = require('../middleware/auth');

// Apply to shop routes
router.post('/orders',
  authenticate,              // ◄── Reuse
  roleCheck(['student']),   // ◄── Reuse
  shopController.createOrder
);

router.post('/admin/products',
  authenticate,              // ◄── Reuse
  roleCheck(['admin']),     // ◄── Reuse
  shopController.createProduct
);
```

**Why This Works:**
- ✅ JWT validation already functional
- ✅ RBAC roles defined (student, admin, coach, amma)
- ✅ Token refresh logic operational
- ✅ Zero modifications needed

#### 4. AWS S3 Integration

**System:** Existing file upload to S3
**Location:** `backend/middleware/uploadFile.js`
**Integration Type:** Reuse (optional for product images)

**What Already Exists:**
```javascript
// Multer + S3 config
const upload = multer({ /* config */ });
const uploadToS3 = async (file) => { /* implementation */ };
```

**What Sprint 5 Can Use:**
```javascript
// Product image upload (admin)
router.post('/admin/products',
  authenticate,
  roleCheck(['admin']),
  upload.single('image'),  // ◄── Reuse Multer
  async (req, res) => {
    const imageUrl = await uploadToS3(req.file);  // ◄── Reuse S3 upload
    req.body.imageUrl = imageUrl;
    // ... create product
  }
);
```

**Why This Works:**
- ✅ S3 bucket configured
- ✅ Multer middleware operational
- ✅ Upload helper function available
- ✅ Same pattern as WTF module

### Integration Testing Checklist

**Before Sprint 5 Development:**
- [ ] Verify `spendCoins()` method works (unit test)
- [ ] Verify ISF_SHOP_UPDATE notifications render in notification center
- [ ] Verify JWT authentication works on new v2 routes
- [ ] Verify student role can access shop routes
- [ ] Verify admin role can access admin shop routes

**During Sprint 5 Development:**
- [ ] Test coin deduction + order creation atomically
- [ ] Test insufficient balance handling
- [ ] Test stock concurrency (two students buy last item)
- [ ] Test order cancellation + refund
- [ ] Test notification delivery (WebSocket)

**After Sprint 5 Completion:**
- [ ] End-to-end purchase flow (student browses → buys → views order)
- [ ] Admin creates product → student buys → check inventory
- [ ] Test offline cart persistence (local storage)
- [ ] Performance test (checkout with 10 items)
- [ ] Load test (50 concurrent checkouts)

---

## Security & Validation

### Input Validation (express-validator)

**File:** `backend/middleware/shopValidation.js`

```javascript
const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Add to Cart Validation
const validateAddToCart = [
  body('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('quantity')
    .isInt({ min: 1, max: 99 })
    .withMessage('Quantity must be between 1 and 99'),
  validate
];

// Checkout Validation
const validateCheckout = [
  // No body needed - uses cart from database
  // But could add optional delivery notes, etc.
  body('deliveryNotes')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 200 }),
  validate
];

// Create Product Validation
const validateProductCreate = [
  body('sku')
    .notEmpty()
    .isString()
    .trim()
    .toUpperCase()
    .isLength({ min: 3, max: 20 })
    .matches(/^[A-Z0-9-]+$/)
    .withMessage('SKU must be alphanumeric with hyphens'),

  body('name')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Product name required (3-100 chars)'),

  body('category')
    .isIn(['stationery', 'sports', 'books', 'uniforms', 'digital', 'other'])
    .withMessage('Invalid category'),

  body('price')
    .isInt({ min: 1 })
    .withMessage('Price must be at least 1 coin'),

  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be non-negative'),

  body('description')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 }),

  validate
];

// Update Product Validation
const validateProductUpdate = [
  param('productId')
    .isMongoId()
    .withMessage('Invalid product ID'),

  body('name')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 100 }),

  body('price')
    .optional()
    .isInt({ min: 1 }),

  body('stock')
    .optional()
    .isInt({ min: 0 }),

  validate
];

module.exports = {
  validateAddToCart,
  validateCheckout,
  validateProductCreate,
  validateProductUpdate
};
```

### Rate Limiting

**File:** `backend/middleware/rateLimiter.js`

```javascript
const rateLimit = require('express-rate-limit');

// Cart operations (prevent rapid adds)
const cartLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 30,  // 30 requests per minute
  message: 'Too many cart operations, please try again later',
  standardHeaders: true,
  legacyHeaders: false
});

// Checkout (prevent order spam)
const checkoutLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 5,  // 5 checkouts per minute
  message: 'Too many checkout attempts, please try again later',
  skip: (req) => req.user?.role === 'admin'  // Skip for admins
});

// Admin operations
const adminLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: 'Too many requests',
  skip: (req) => process.env.NODE_ENV === 'development'
});

module.exports = {
  cart: cartLimiter,
  checkout: checkoutLimiter,
  admin: adminLimiter
};
```

### Authorization Checks

**In Service Layer:**
```javascript
// In shopController.getOrderById
static async getOrderById(req, res) {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;

    const order = await Order.findById(orderId).populate('items.shopItemId');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Authorization: Students can only see own orders
    if (userRole === 'student' && order.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### Security Checklist

✅ **Input Validation:**
- All user inputs validated with express-validator
- MongoDB ObjectId validation
- Quantity limits (1-99)
- Price range validation

✅ **Authorization:**
- Students can only access own cart/orders
- Admins can manage products and view all orders
- Role-based access control on all routes

✅ **Transaction Integrity:**
- MongoDB transactions for atomic operations
- Optimistic locking for stock updates
- Balance validation server-side (never trust client)

✅ **Rate Limiting:**
- Cart operations: 30/min
- Checkout: 5/min
- Admin operations: 100/min

✅ **Data Sanitization:**
- Trim strings
- Uppercase SKUs
- Escape HTML in descriptions

✅ **Error Handling:**
- Never expose stack traces to client
- Generic error messages for security failures
- Detailed logging server-side

---

## Performance Optimization

### Database Optimization

#### Indexes
```javascript
// ShopItem indexes
ShopItemSchema.index({ sku: 1 }, { unique: true });
ShopItemSchema.index({ category: 1, isActive: 1 });
ShopItemSchema.index({ name: 'text', description: 'text' });
ShopItemSchema.index({ stock: 1 });

// Order indexes
OrderSchema.index({ userId: 1, placedAt: -1 });
OrderSchema.index({ status: 1, placedAt: -1 });
OrderSchema.index({ orderNumber: 1 }, { unique: true });

// Cart indexes
CartSchema.index({ userId: 1 }, { unique: true });
```

#### Query Optimization
```javascript
// Use .lean() for read-only
const products = await ShopItem.find(query)
  .select('-__v')
  .lean();  // ◄── 5-10x faster

// Selective population
const order = await Order.findById(orderId)
  .populate('items.shopItemId', 'name sku imageUrl')  // ◄── Only needed fields
  .lean();

// Pagination
const skip = (page - 1) * limit;
const products = await ShopItem.find(query)
  .skip(skip)
  .limit(limit);
```

### Frontend Optimization

#### Code Splitting
```javascript
// Lazy load shop module
const ShopModule = React.lazy(() => import('./components/shop/ShopHome'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ShopModule />
    </Suspense>
  );
}
```

#### Image Optimization
```javascript
// Use compressed images
// Product images: 300x300px, JPEG, 80% quality
// Serve via S3 with CloudFront (if available)

<img
  src={product.imageUrl}
  alt={product.name}
  loading="lazy"  // ◄── Lazy load images
  width="300"
  height="300"
/>
```

#### Debounced Search
```javascript
import { debounce } from 'lodash';

const debouncedSearch = debounce((searchTerm) => {
  setFilters({ search: searchTerm });
}, 300);  // ◄── 300ms delay
```

#### Local Storage Caching
```javascript
// Cache product list for 5 minutes
const CACHE_KEY = 'shop_products_cache';
const CACHE_DURATION = 5 * 60 * 1000;

const cachedData = localStorage.getItem(CACHE_KEY);
if (cachedData) {
  const { timestamp, products } = JSON.parse(cachedData);
  if (Date.now() - timestamp < CACHE_DURATION) {
    return products;  // Use cache
  }
}

// Fetch from API and cache
const products = await shopAPI.getProducts();
localStorage.setItem(CACHE_KEY, JSON.stringify({
  timestamp: Date.now(),
  products
}));
```

### Performance Benchmarks

**Target Metrics:**
- API Response Time: < 200ms (avg)
- Checkout Transaction: < 500ms (with DB transaction)
- Product List Load: < 1s (20 items)
- Image Load: < 300ms per image
- Cart Operations: < 100ms (optimistic updates)

---

## Testing Strategy

### Unit Tests (Jest)

**Test:** `backend/tests/services/shopService.test.js`

```javascript
describe('ShopService', () => {
  describe('createOrder', () => {
    it('should create order and deduct coins atomically', async () => {
      // Arrange
      const userId = new ObjectId();
      const productId = new ObjectId();
      await seedCart(userId, [{ productId, quantity: 2 }]);
      await seedCoins(userId, 100);
      await seedProduct(productId, { price: 20, stock: 10 });

      // Act
      const result = await ShopService.createOrder(userId);

      // Assert
      expect(result.order.totalAmount).toBe(40);
      expect(result.remainingBalance).toBe(60);

      const updatedProduct = await ShopItem.findById(productId);
      expect(updatedProduct.stock).toBe(8);
    });

    it('should rollback if insufficient coins', async () => {
      // Arrange
      const userId = new ObjectId();
      await seedCart(userId, [{ productId, quantity: 2 }]);
      await seedCoins(userId, 10);  // Not enough

      // Act & Assert
      await expect(ShopService.createOrder(userId))
        .rejects.toThrow('Insufficient coin balance');

      // Verify no changes
      const product = await ShopItem.findById(productId);
      expect(product.stock).toBe(10);  // Unchanged
    });
  });
});
```

### Integration Tests (Supertest)

**Test:** `backend/tests/routes/shop.test.js`

```javascript
const request = require('supertest');
const app = require('../../server');

describe('POST /api/v2/shop/orders', () => {
  let studentToken;
  let productId;

  beforeEach(async () => {
    // Setup
    const student = await createTestUser('student');
    studentToken = generateToken(student);
    productId = await createTestProduct({ price: 50, stock: 5 });
    await addToTestCart(student._id, productId, 2);
    await setTestCoinBalance(student._id, 150);
  });

  it('should create order successfully', async () => {
    const response = await request(app)
      .post('/api/v2/shop/orders')
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);

    expect(response.body.order).toBeDefined();
    expect(response.body.order.totalAmount).toBe(100);
    expect(response.body.remainingBalance).toBe(50);
  });

  it('should return 400 if cart is empty', async () => {
    await clearTestCart(student._id);

    await request(app)
      .post('/api/v2/shop/orders')
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(400);
  });
});
```

### End-to-End Tests (Playwright)

**Test:** `e2e/tests/shop-purchase-flow.spec.js`

```javascript
import { test, expect } from '@playwright/test';

test.describe('Complete Purchase Flow', () => {
  test('student can browse, add to cart, and checkout', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[data-testid="student-id"]', 'STU001');
    await page.click('[data-testid="facial-scan"]');
    await page.waitForURL('/dashboard');

    // Navigate to shop
    await page.click('[data-testid="shop-link"]');
    await expect(page).toHaveURL('/shop');

    // Browse products
    await page.selectOption('[data-testid="category-filter"]', 'books');
    await expect(page.locator('.product-card')).toHaveCount(5);

    // Add to cart
    await page.click('.product-card:first-child [data-testid="add-to-cart"]');
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');

    // View cart
    await page.click('[data-testid="cart-icon"]');
    await expect(page.locator('.cart-drawer')).toBeVisible();

    // Checkout
    await page.click('[data-testid="checkout-btn"]');
    await page.waitForURL('/shop/checkout');

    // Confirm order
    await page.click('[data-testid="place-order-btn"]');
    await expect(page.locator('.success-message')).toContainText('Order confirmed');

    // Verify order history
    await page.click('[data-testid="order-history-link"]');
    await expect(page.locator('.order-item')).toHaveCount(1);
  });

  test('should prevent checkout with insufficient balance', async ({ page }) => {
    // ... login and add expensive item to cart ...

    await page.goto('/shop/checkout');
    await expect(page.locator('.error-message')).toContainText('Insufficient coin balance');
    await expect(page.locator('[data-testid="place-order-btn"]')).toBeDisabled();
  });
});
```

### Test Coverage Goals

**Backend:**
- Unit Tests: > 80% coverage
- Integration Tests: All API endpoints
- Critical Paths: 100% (checkout, coin deduction, stock update)

**Frontend:**
- Component Tests: > 70% coverage
- Custom Hooks: > 90% coverage
- E2E Tests: All user journeys

---

## Implementation Plan

### Week 1: Backend Foundation (Days 1-5)

**Day 1: Models & Database Setup**
- ✅ Create ShopItem, Order, Cart models
- ✅ Extend Coin model (add "shop" to source enum)
- ✅ Extend User model (add shopProfile field)
- ✅ Create database indexes
- ✅ Write model unit tests

**Day 2: Service Layer**
- ✅ Implement shopService.js (createOrder, getProducts)
- ✅ Implement orderService.js (cancelOrder)
- ✅ Implement order number generator
- ✅ Write service unit tests
- ✅ Test MongoDB transactions

**Day 3: API Routes & Controllers**
- ✅ Create shop routes (v2 namespace)
- ✅ Implement shopController
- ✅ Add validation middleware
- ✅ Add rate limiting
- ✅ Write integration tests

**Day 4: Admin Endpoints**
- ✅ Product CRUD endpoints
- ✅ Stock management
- ✅ Order management (admin view)
- ✅ Analytics endpoint
- ✅ Write admin tests

**Day 5: Backend Integration Testing**
- ✅ End-to-end API tests
- ✅ Transaction rollback tests
- ✅ Coin integration tests
- ✅ Notification integration tests
- ✅ Performance benchmarking

### Week 2: Frontend Implementation (Days 6-10)

**Day 6: State Management & API Client**
- ✅ Create Zustand shop store
- ✅ Implement shopAPI (Axios client)
- ✅ Create custom hooks (useShopProducts, useCart, useOrders)
- ✅ Write hook tests

**Day 7: Product Browsing**
- ✅ ProductList component (grid view)
- ✅ ProductCard component
- ✅ FilterPanel component
- ✅ SortDropdown component
- ✅ Pagination component

**Day 8: Cart & Checkout**
- ✅ Cart drawer component
- ✅ Cart item management
- ✅ Checkout component
- ✅ Coin balance display
- ✅ Order confirmation

**Day 9: Order Management**
- ✅ OrderHistory component
- ✅ OrderDetail component
- ✅ Order cancellation
- ✅ Receipt view

**Day 10: Admin Interface**
- ✅ ProductManagement component
- ✅ ProductForm (create/edit)
- ✅ OrderManagement component
- ✅ ShopAnalytics dashboard

### Week 3: Integration & Testing (Days 11-15)

**Day 11: Frontend-Backend Integration**
- ✅ Connect all components to API
- ✅ Test cart persistence
- ✅ Test checkout flow
- ✅ Fix integration issues

**Day 12: E2E Testing**
- ✅ Write Playwright tests (complete purchase flow)
- ✅ Write admin workflow tests
- ✅ Test error scenarios
- ✅ Test offline behavior

**Day 13: Performance Optimization**
- ✅ Optimize database queries
- ✅ Implement caching
- ✅ Code splitting
- ✅ Image optimization
- ✅ Run performance benchmarks

**Day 14: Bug Fixes & Polish**
- ✅ Fix bugs from testing
- ✅ Improve error messages
- ✅ Add loading states
- ✅ Improve accessibility
- ✅ UI polish

**Day 15: Documentation & Handoff**
- ✅ API documentation
- ✅ Component documentation
- ✅ User guide (admin)
- ✅ Deployment guide
- ✅ Sprint retrospective

### Buffer Days (16-22)

**Contingency for:**
- Complex bug fixes
- Performance issues
- Integration challenges
- Additional testing
- Client feedback incorporation

---

## Risk Management

### High-Risk Areas

#### 1. Double-Spending Risk

**Risk:** User spends coins but order fails, coins lost permanently.

**Mitigation:**
- ✅ Use MongoDB transactions (all-or-nothing)
- ✅ Implement retry logic for failed transactions
- ✅ Add transaction logging for auditing
- ✅ Manual refund process for edge cases

**Code:**
```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  // All operations in transaction
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();  // ◄── Rollback
  throw error;
}
```

#### 2. Stock Overselling Risk

**Risk:** Two students buy the last item simultaneously.

**Mitigation:**
- ✅ Optimistic locking with `__v` (version field)
- ✅ Atomic `findOneAndUpdate` with stock check
- ✅ Retry logic for concurrent updates
- ✅ Low stock warnings to admins

**Code:**
```javascript
const result = await ShopItem.findOneAndUpdate(
  {
    _id: productId,
    stock: { $gte: quantity },
    __v: currentVersion  // ◄── Optimistic lock
  },
  {
    $inc: { stock: -quantity, __v: 1 }
  },
  { new: true, session }
);

if (!result) {
  throw new Error("Stock update conflict");  // Retry
}
```

#### 3. Price Change Mid-Cart Risk

**Risk:** Admin changes price while student has item in cart.

**Mitigation:**
- ✅ Snapshot price at time of cart addition
- ✅ Re-validate price at checkout
- ✅ Show price change notification if detected
- ✅ Allow user to confirm new price

**Code:**
```javascript
// In Order schema - snapshot prices
items: [{
  shopItemId: ObjectId,
  name: String,      // ◄── Snapshot
  price: Number,     // ◄── Price at purchase
  quantity: Number
}]
```

#### 4. Sprint 1 Regression Risk

**Risk:** Modifying Sprint 1 code breaks existing features.

**Mitigation:**
- ✅ **ZERO modifications to Sprint 1 code**
- ✅ Only extend via safe extension points
- ✅ Comprehensive integration tests
- ✅ Regression test suite for Sprint 1 features

**Strategy:**
```
❌ DON'T: Refactor userController.js
❌ DON'T: Modify existing Coin methods
✅ DO: Add new enum value to Coin source
✅ DO: Add optional field to User model
✅ DO: Create isolated v2 API namespace
```

### Medium-Risk Areas

#### 5. Cart Abandonment

**Risk:** User adds items but never checks out, inventory locked.

**Mitigation:**
- ✅ Cart items don't reserve stock (only check at checkout)
- ✅ Auto-clear abandoned carts after 7 days
- ✅ Cart analytics for admins

#### 6. Notification Delivery Failures

**Risk:** Order succeeds but notification fails to send.

**Mitigation:**
- ✅ Notification failures don't rollback order
- ✅ Retry mechanism for failed notifications
- ✅ Order history shows all orders (with/without notification)

#### 7. Image Upload Failures

**Risk:** Product image upload to S3 fails.

**Mitigation:**
- ✅ Product can be created without image (optional field)
- ✅ Retry mechanism for S3 uploads
- ✅ Fallback placeholder image
- ✅ Admin can re-upload later

### Low-Risk Areas

#### 8. Analytics Performance

**Risk:** Analytics queries slow down with large datasets.

**Mitigation:**
- ✅ Add date range filters (default: last 30 days)
- ✅ Implement aggregation pipelines
- ✅ Cache analytics results (5 min)

#### 9. Search Performance

**Risk:** Text search on products slow.

**Mitigation:**
- ✅ Create text index on name/description
- ✅ Limit search to 100 results
- ✅ Encourage category filtering

### Testing Priorities by Risk

**P0 (Critical - Must Test):**
- ✅ Complete checkout flow (end-to-end)
- ✅ Transaction atomicity (coin deduction + stock update + order)
- ✅ Stock concurrency (multiple simultaneous purchases)
- ✅ Insufficient balance handling
- ✅ Coin balance validation

**P1 (High - Should Test):**
- ✅ Order cancellation + refund
- ✅ Cart persistence (local storage + DB)
- ✅ Price validation at checkout
- ✅ Admin product CRUD
- ✅ Low stock warnings

**P2 (Medium - Nice to Test):**
- ✅ Search and filter combinations
- ✅ Pagination edge cases
- ✅ Image upload handling
- ✅ Analytics accuracy
- ✅ Notification delivery

---

## Conclusion

### Success Criteria

Sprint 5 is considered **successfully complete** when:

✅ **Functional Requirements:**
- Students can browse products (filter, search, sort)
- Students can add items to cart and checkout
- Coin deduction is atomic and accurate
- Students can view order history
- Admins can create/edit/delete products
- Admins can manage inventory
- Admins can view shop analytics

✅ **Non-Functional Requirements:**
- No breaking changes to Sprint 1
- All API responses < 200ms (avg)
- All tests passing (unit, integration, E2E)
- Code coverage > 80%
- Zero critical security vulnerabilities
- Offline cart persistence works
- Accessible (WCAG 2.1 AA)

✅ **Quality Gates:**
- QA review passed
- Security audit passed
- Performance benchmarks met
- Documentation complete
- Client sign-off received

### Key Success Factors

1. **Strict Module Isolation:** Zero modifications to Sprint 1 code prevents regressions
2. **MongoDB Transactions:** Atomic operations ensure data integrity
3. **Optimistic Locking:** Prevents stock overselling
4. **Proper State Management:** Zustand provides clean cart management
5. **Comprehensive Testing:** Catches issues early
6. **Clear Extension Points:** Makes future modifications safe

### Next Steps After Sprint 5

**Immediate (Week 4):**
- Deploy to staging environment
- User acceptance testing
- Bug fixes and polish

**Short-term (Weeks 5-8):**
- Sprint 3: Mobile app integration
- Sprint 4: SOS emergency system
- Gather shop usage analytics

**Long-term (Months 3-6):**
- Advanced features (product reviews, ratings)
- Wishlist enhancements
- Recommendation engine
- **Sprint 1 Refactoring** (now safe with comprehensive test coverage)

---

**Document Status:** ✅ Complete
**Created:** October 7, 2025 - 5:56 PM
**Last Updated:** October 7, 2025 - 5:56 PM
**Author:** Architect Agent (BMAD Framework)
**Reviewed By:** Pending PO validation
**Version:** 1.0

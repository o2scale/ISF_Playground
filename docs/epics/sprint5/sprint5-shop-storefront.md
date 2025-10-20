# Epic: Shop Storefront (Student-Facing)

**Epic ID:** Sprint5-Epic-01
**Sprint:** Sprint 5 - ISF Shop
**Date Created:** October 7, 2025
**Status:** Ready for Development
**Priority:** High

---

## Epic Overview

### Description
Build a complete student-facing e-commerce storefront allowing students to browse products, manage shopping carts, checkout using ISF Coins, and view order history. The storefront provides an Amazon-like shopping experience tailored for students to spend their earned coins on physical and digital rewards.

### Business Value
- Completes the ISF Coin economy loop (earn → spend)
- Motivates students through tangible reward redemption
- Provides engaging shopping experience to increase student satisfaction
- Enables students to exercise choice and decision-making

### Success Criteria
- Students can browse all active products with filtering and search
- Shopping cart persists across sessions (local storage + DB sync)
- Checkout process is atomic (coins deducted, stock updated, order created)
- Order history displays all past purchases with full details
- 100% of transactions complete successfully or rollback completely
- < 3 second page load time for shop homepage

---

## User Stories

### Story 1: Product Catalog & Browsing
**Story ID:** Sprint5-Story-01
**File:** `docs/stories/sprint5-story-01-product-catalog.md`
**Priority:** P0
**Estimate:** 2 days
**Dependencies:** None

**User Story:**
As a student, I want to browse available products with filtering and search capabilities so that I can find items I want to purchase.

**Key Features:**
- Grid layout product display (3 columns on 1366x768)
- Category filters (stationery, sports, books, uniforms, digital, other)
- Price range filter with slider (0-500 coins)
- Text search with real-time results
- Sort options (price low/high, newest, most popular)
- Out of stock indicator
- Product quick preview on hover

---

### Story 2: Shopping Cart Management
**Story ID:** Sprint5-Story-02
**File:** `docs/stories/sprint5-story-02-shopping-cart.md`
**Priority:** P0
**Estimate:** 2 days
**Dependencies:** Sprint5-Story-01

**User Story:**
As a student, I want to add items to a persistent shopping cart with quantity management so that I can collect items before checkout.

**Key Features:**
- Add to cart with quantity selector
- Cart drawer (slide from right)
- Cart icon with item count badge
- Update quantity (+/- buttons)
- Remove item with confirmation
- Cart persistence (Zustand + local storage)
- Real-time stock validation
- Estimated total display

---

### Story 3: Checkout & Order Placement
**Story ID:** Sprint5-Story-03
**File:** `docs/stories/sprint5-story-03-checkout.md`
**Priority:** P0
**Estimate:** 3 days
**Dependencies:** Sprint5-Story-02

**User Story:**
As a student, I want to complete checkout with coin balance validation and receive order confirmation so that I can receive my purchased items.

**Key Features:**
- 3-step checkout flow (review, confirm, success)
- Coin balance display with sufficiency check
- Real-time balance validation
- Atomic transaction (coins + stock + order)
- Order number generation (ORD-YYYYMMDD-XXXXX)
- Order confirmation receipt
- Insufficient funds handling with earn more prompt
- Notification sent on order completion

---

### Story 4: Order History & Details
**Story ID:** Sprint5-Story-04
**File:** `docs/stories/sprint5-story-04-order-history.md`
**Priority:** P1
**Estimate:** 2 days
**Dependencies:** Sprint5-Story-03

**User Story:**
As a student, I want to view my past orders with full details and cancellation option so that I can track my purchases and manage recent orders.

**Key Features:**
- Order history list (sorted by date)
- Order detail view with all items
- Order status badges (completed, cancelled)
- Digital receipt view
- Order cancellation (within 5 minutes)
- Automatic coin refund on cancellation
- Stock restoration on cancellation

---

## Technical Overview

### Architecture Components

**Frontend:**
- `components/shop/` - All student-facing shop components
- `store/shopStore.js` - Zustand state management
- `hooks/useShopProducts.js`, `useCart.js`, `useOrders.js` - Custom hooks
- `api/shopAPI.js` - Axios API client

**Backend:**
- `routes/v2/shop.js` - All shop routes (v2 namespace)
- `controllers/shopController.js` - Request handlers
- `services/shopService.js` - Business logic with transactions
- `models/shopItem.js`, `order.js`, `cart.js` - MongoDB models

### Database Schema

**ShopItem Collection:**
```javascript
{
  _id: ObjectId,
  sku: String,
  name: String,
  description: String,
  category: Enum,
  price: Number,
  discountPrice: Number,
  stock: Number,
  lowStockThreshold: Number,
  imageUrl: String,
  isActive: Boolean,
  createdBy: ObjectId,
  timestamps: true
}
```

**Order Collection:**
```javascript
{
  _id: ObjectId,
  orderNumber: String,
  userId: ObjectId,
  items: [{
    shopItemId: ObjectId,
    name: String,
    sku: String,
    price: Number,
    quantity: Number,
    subtotal: Number
  }],
  subtotal: Number,
  discount: Number,
  totalAmount: Number,
  status: Enum,
  placedAt: Date,
  completedAt: Date,
  cancelledAt: Date,
  coinTransactionId: ObjectId
}
```

**Cart Collection:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [{
    shopItemId: ObjectId,
    quantity: Number,
    addedAt: Date
  }],
  lastUpdated: Date
}
```

### API Endpoints

**Student Routes:**
- `GET /api/v2/shop/products` - Browse products (with filters)
- `GET /api/v2/shop/products/:productId` - Product detail
- `GET /api/v2/shop/cart` - Get cart
- `POST /api/v2/shop/cart` - Add to cart
- `PUT /api/v2/shop/cart/:shopItemId` - Update quantity
- `DELETE /api/v2/shop/cart/:shopItemId` - Remove item
- `DELETE /api/v2/shop/cart` - Clear cart
- `POST /api/v2/shop/orders` - Checkout
- `GET /api/v2/shop/orders` - Order history
- `GET /api/v2/shop/orders/:orderId` - Order detail
- `DELETE /api/v2/shop/orders/:orderId` - Cancel order

---

## Dependencies

### Internal Dependencies
- **Sprint 1 Coin Wallet:** Extend `source` enum with "shop", use `spendCoins()` method
- **Sprint 1 Notifications:** Use existing `ISF_SHOP_UPDATE` category for order confirmations
- **Sprint 1 Auth:** Reuse `authenticate` and `roleCheck(['student'])` middleware
- **Sprint 1 AWS S3:** Reuse for product images

### External Dependencies
None

---

## Risks & Mitigations

**Risk 1: Double-Spending (coins deducted but order fails)**
**Mitigation:** MongoDB transactions ensure atomic operations (all-or-nothing). If any step fails, entire transaction rolls back.

**Risk 2: Stock Overselling (two students buy last item)**
**Mitigation:** Optimistic locking using `__v` field. `findOneAndUpdate` with version check prevents concurrent updates.

**Risk 3: Cart Abandonment (items in cart but never bought)**
**Mitigation:** Cart items don't reserve stock. Only validate stock at checkout. Auto-clear abandoned carts after 7 days.

**Risk 4: Price Changes Mid-Cart**
**Mitigation:** Snapshot price at time of cart addition. Re-validate at checkout and show notification if price changed.

---

## Testing Requirements

**Unit Tests:**
- ShopService.createOrder() - atomic transaction logic
- ShopService.cancelOrder() - refund and stock restoration
- Cart model methods (addItem, removeItem, updateQuantity)
- Order number generation

**Integration Tests:**
- Complete checkout flow (cart → checkout → order)
- Insufficient balance handling
- Stock validation at checkout
- Order cancellation within 5 minutes
- Cart persistence across sessions

**E2E Tests:**
- Browse → Filter → Add to Cart → Checkout → Order History
- Insufficient funds error handling
- Out of stock product handling
- Order cancellation flow

**Performance Tests:**
- Product list load < 1s (20 items)
- Checkout transaction < 500ms
- Cart operations < 100ms (optimistic updates)

---

## Definition of Done

- [ ] All 4 stories in epic completed
- [ ] All acceptance criteria met
- [ ] Unit tests passing (>80% coverage)
- [ ] Integration tests passing
- [ ] E2E test passing (complete purchase flow)
- [ ] Code reviewed (no critical issues)
- [ ] QA gate passed
- [ ] Performance benchmarks met
- [ ] No regressions in Sprint 1 coin earning
- [ ] Documentation updated (API docs)

---

**Created:** October 7, 2025 - 6:20 PM
**Last Updated:** October 7, 2025 - 6:20 PM

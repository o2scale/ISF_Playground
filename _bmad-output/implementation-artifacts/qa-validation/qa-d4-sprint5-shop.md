# QA-D4: Shop Storefront + Cart + Orders
Date: 2026-03-17 | Sprint: 5 | Scope: FR1-FR13

## Summary
13 FRs validated: 10 PASS, 2 PARTIAL, 1 FAIL, 0 NOT BUILT

## Compliance Matrix

| FR | Description | Status | Evidence | Notes |
|----|-------------|--------|----------|-------|
| FR1 | Student can access ISF Shop from main navigation | **PASS** | `Layout.js:113-114` — "Shop" nav item at `/shop` for student, admin, coach, medical-incharge, balagruha-incharge, sports-coach, music-coach, amma roles. Also present in admin/coach/pm secondary navs (lines 382, 394, 406, 414). Frontend route `/shop` in `App.js:317` renders `ShopHome`. | Navigation accessible to all required roles. |
| FR2 | Student can browse product catalog in grid layout with images, names, ISF Coin prices | **PASS** | `ProductGrid.jsx` renders `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (responsive 4-col grid). Each `ProductCard.jsx` shows image (`primaryImageUrl`), name, category badge, description, and price in coins. Pagination via backend (`ShopService.getProducts` with 20-item default). | Grid layout confirmed. Backend `GET /api/v2/shop/products` with pagination. |
| FR3 | Student can filter products by category and sort by price | **PASS** | `FilterPanel.jsx` provides: category radio buttons (6 categories: ISF Shop, Medicines, Consumables, Repairs, Infra, Others), price range slider (0-500 coins), in-stock toggle, text search. `ProductGrid.jsx` provides sort dropdown (Newest, Oldest, Price Low-High, Price High-Low, Name A-Z, Name Z-A). `ShopHome.jsx` debounces search by 300ms. Backend `ShopService.getProducts` handles all filter params. | Category filtering is single-select (radio), not multi-select as originally spec'd in Story-01 AC2 (which called for multiple categories + removable pills). This is a minor deviation from the story but functionally meets FR3's stated requirement. |
| FR4 | Student can view detailed product page with description, images, stock availability | **PARTIAL** | Backend API exists: `GET /api/v2/shop/products/:id` (`shopController.getProductById` -> `ShopService.getProductById`). Route defined in `backend/routes/v2/shop.js:27`. **However, no frontend product detail page exists.** No `/shop/products/:id` route in `App.js`, no `ProductDetail` component found. Product info is shown inline on `ProductCard.jsx` (name, description truncated to 2 lines, price, stock badge) but there is no dedicated detail view. | Backend complete; frontend product detail page missing. Student cannot view full description or multiple images for a product. |
| FR5 | Student can add products to shopping cart with quantity selection | **PARTIAL** | `ProductCard.jsx` calls `useShopStore().addToCart(product, 1)` -- always adds quantity 1. No quantity selector on the product card. Quantity can be adjusted after adding via `CartItem.jsx` (increment/decrement buttons, 1-99 range, capped at stock level). Backend `addToCart` in `cart.js` service validates stock correctly. | Add-to-cart works but initial quantity is hardcoded to 1. User must adjust quantity in cart drawer post-add. Story-02 AC1 says "added with quantity 1" so this matches the story, but FR5 says "with quantity selection" suggesting a quantity picker on the product view. |
| FR6 | System validates stock availability before adding to cart | **PASS** | `backend/services/cart.js::addToCart` (lines 56-116): checks product exists, is active, stock > 0, and `currentQuantity + requestedQuantity <= product.stock`. Throws specific errors: "Product not found", "Product is not available", "Product is out of stock", "Only N items available in stock". Frontend shows error toasts via Zustand store. Cart also validates on open (`validateStock` called in `Cart.jsx` useEffect). | Comprehensive stock validation at add, update, and cart-open time. |
| FR7 | Student can view cart with item list, quantities, unit prices, total in ISF Coins | **PASS** | `Cart.jsx` renders slide-in drawer (Dialog.Root) with: cart items via `CartItem.jsx` (image, name, price, quantity, subtotal per item, stock warnings), total via `CartSummary` component. Zustand `cartTotalCost()` computes total. `cartItemCount()` computes item count. "Continue Shopping" and "Checkout" buttons present. | Full cart view with all required elements. |
| FR8 | Student can modify cart (change quantity, remove items) | **PASS** | `CartItem.jsx`: increment/decrement buttons (1-99, capped at stock), remove button with confirmation modal. `shopStore.js`: `updateQuantity()` calls `PUT /api/v2/shop/cart/:shopItemId`, `removeFromCart()` calls `DELETE /api/v2/shop/cart/:shopItemId`, `clearCart()` calls `DELETE /api/v2/shop/cart`. All with toast notifications. Backend service validates quantity range and stock on update. | Full cart modification capability. |
| FR9 | Student can checkout -- system atomically deducts coins and creates order (MongoDB session) | **PASS** | `backend/services/order.js::createOrder` (lines 25-205): Uses `mongoose.startSession()` + `session.startTransaction()`. Within single transaction: (1) validates cart, (2) validates stock per item, (3) checks coin balance, (4) deducts stock with optimistic locking (`__v` version check), (5) generates unique order number, (6) creates Order document, (7) deducts coins, (8) clears cart, (9) commits. On error: `session.abortTransaction()`. Frontend `Checkout.jsx` calls `createOrder()` from shopStore which validates stock first, then `POST /api/v2/shop/orders`. Shows processing state, then `OrderConfirmation`. | Atomic checkout with MongoDB session confirmed. Optimistic locking prevents concurrent stock issues. Full rollback on any failure. |
| FR10 | System blocks checkout if coin balance is insufficient | **PASS** | Backend: `order.js` service lines 89-100 check `coinRecord.balance < totalAmount`, throws "Insufficient coin balance. Required: X, Available: Y". Frontend: `Checkout.jsx` disables "Place Order" button when `!balanceInfo.hasSufficientBalance`. `PaymentDetails` component loads balance and passes `hasSufficientBalance` to parent. "Earn More Coins" button shown when insufficient. | Server-side and client-side validation present. |
| FR11 | Student can view order history with order details, timeline, and digital receipt | **PASS** | `OrderHistory.jsx` page at `/shop/orders`: fetches orders via `GET /api/v2/shop/orders`, supports pagination, sorting (newest/oldest/amount), filtering by balagruha + student (admin view). `OrderDetail.jsx` at `/shop/orders/:orderNumber`: shows order info, items, cancel button (if within window), receipt link. `OrderReceipt.jsx` at `/shop/orders/:orderNumber/receipt`. `OrderTimeline.jsx` component exists. `OrderCard.jsx` shows order summary in list. | Complete order history, detail, and receipt pages. |
| FR12 | Student can cancel order within 5-minute window with automatic coin refund | **PASS** | Backend: `Order` model virtual `isCancelable` (lines 172-181): checks `status === 'completed'`, `deliveryStatus === 'pending_confirmation'`, and `minutesSincePlaced < 5`. `order.js` service `cancelOrder` (lines 279-361): validates window, uses MongoDB session, sets `status='cancelled'`, refunds coins, restores stock, all atomically. Frontend: `OrderDetail.jsx::canCancelOrder` mirrors the 5-minute check. `CancelOrderModal.jsx` component for confirmation with optional reason. | 5-minute window enforced both client-side and server-side. Atomic refund+stock restore. |
| FR13 | System automatically refunds coins on cancellation within window | **PASS** | `backend/services/order.js::cancelOrder`: Within MongoDB session transaction: (1) sets order status to cancelled, (2) creates refund transaction `{type:'earned', amount:totalAmount, source:'shop'}`, (3) adds to `coinRecord.balance`, (4) restores stock for all items via `$inc: {stock: item.quantity}`. On failure: `session.abortTransaction()`. Returns `refundedAmount` and `newBalance`. | Automatic, atomic coin refund confirmed. Stock restoration also atomic. |

## Test Results

```
PASS tests/controllers/cartController.test.js
  CartController (Story 5.2)
    getCart
      ✓ should get cart successfully (36 ms)
      ✓ should return 500 on error (8 ms)
    addToCart
      ✓ should add item to cart successfully (7 ms)
      ✓ should return 404 when product not found (8 ms)
      ✓ should return 400 when item not available (6 ms)
      ✓ should return 400 when item out of stock (5 ms)
      ✓ should return 400 when exceeds available in stock (5 ms)
      ✓ should return 500 on unexpected error (5 ms)
    updateQuantity
      ✓ should update quantity successfully (5 ms)
      ✓ should return 404 when item not found in cart (4 ms)
      ✓ should return 400 on invalid quantity (4 ms)
      ✓ should return 500 on unexpected error (5 ms)
    removeFromCart
      ✓ should remove item from cart successfully (5 ms)
      ✓ should return 404 when item not found (4 ms)
      ✓ should return 500 on unexpected error (5 ms)
    clearCart
      ✓ should clear cart successfully (5 ms)
      ✓ should return 404 when cart not found (4 ms)
      ✓ should return 500 on unexpected error (4 ms)
    validateStock
      ✓ should validate stock successfully (5 ms)
      ✓ should return 500 on error (6 ms)

PASS tests/controllers/orderController.test.js
  OrderController (Story 5.2)
    createOrder
      ✓ should create an order successfully (36 ms)
      ✓ should return 400 when cart is empty (7 ms)
      ✓ should return 400 when insufficient stock (7 ms)
      ✓ should return 400 when insufficient coin balance (5 ms)
      ✓ should return 400 when item no longer available (6 ms)
      ✓ should return 409 on concurrent modification (5 ms)
      ✓ should return 500 on unexpected error (5 ms)
    getOrder
      ✓ should get order by order number successfully (6 ms)
      ✓ should return 404 when order not found (5 ms)
      ✓ should return 403 when unauthorized (5 ms)
      ✓ should return 500 on unexpected error (4 ms)
    getUserOrders
      ✓ should get user orders with default pagination (4 ms)
      ✓ should get user orders with query params (3 ms)
      ✓ should return 500 on error (3 ms)
    getOrderById
      ✓ should get order by ID successfully (4 ms)
      ✓ should return 404 when order not found (5 ms)
      ✓ should return 403 when unauthorized (2 ms)
      ✓ should return 500 on unexpected error (2 ms)
    cancelOrder
      ✓ should cancel an order successfully (5 ms)
      ✓ should return 404 when order not found for cancellation (5 ms)
      ✓ should return 400 when order cannot be cancelled (3 ms)
      ✓ should return 403 when unauthorized to cancel (3 ms)
      ✓ should return 500 on unexpected cancel error (3 ms)
    getAllOrders
      ✓ should get all orders for admin (4 ms)
      ✓ should return 403 for non-admin users (3 ms)
      ✓ should pass filter query params to service (4 ms)
      ✓ should return 500 on service error (5 ms)

PASS tests/controllers/shopController.test.js
  ShopController (Story 5.2)
    getProducts
      ✓ should get products with default pagination (49 ms)
      ✓ should pass filter and pagination params (11 ms)
      ✓ should handle balagruhaIds as comma-separated string (5 ms)
      ✓ should handle balagruhaIds as array (5 ms)
      ✓ should return 500 when service returns failure (11 ms)
      ✓ should call next on exception (6 ms)
    getProductById
      ✓ should get product by ID successfully (6 ms)
      ✓ should return 404 when product not found (7 ms)
      ✓ should call next on exception (5 ms)
    getFeaturedProducts
      ✓ should get featured products with default limit (5 ms)
      ✓ should use custom limit (7 ms)
      ✓ should return 500 on service failure (4 ms)
      ✓ should call next on exception (4 ms)
    getCategories
      ✓ should get categories successfully (3 ms)
      ✓ should return 500 on service failure (3 ms)
      ✓ should call next on exception (3 ms)
    getStockLevels
      ✓ should get stock levels successfully (3 ms)
      ✓ should return 500 on service failure (3 ms)
      ✓ should call next on exception (4 ms)
    getMostConsumed
      ✓ should get most consumed products with defaults (4 ms)
      ✓ should pass custom period and limit (4 ms)
      ✓ should return 500 on service failure (4 ms)
      ✓ should call next on exception (2 ms)

Test Suites: 3 passed, 3 total
Tests:       70 passed, 70 total
Snapshots:   0 total
Time:        4.024 s
```

## Findings

### Critical

None.

### Major

**M1: No frontend product detail page (FR4 PARTIAL)**
- Backend API `GET /api/v2/shop/products/:id` exists and is tested, but no frontend page renders a dedicated product detail view.
- Students can only see truncated descriptions (2-line clamp) and a single image on the `ProductCard`. There is no way to view full product description, multiple images, or detailed stock information.
- **Impact:** Students cannot make informed purchasing decisions for products with longer descriptions or multiple images.
- **Files:** Missing `frontend/src/pages/ProductDetail.jsx`; route absent from `frontend/src/App.js`.

**M2: Dead placeholder code in ShopHome.jsx**
- `ShopHome.jsx:114` contains `handleAddToCart` that shows an `alert("...will be added to cart in Story-02")`. This function is passed to `ProductGrid` as `onAddToCart` but `ProductGrid` never actually calls it -- the real add-to-cart is handled directly by `ProductCard` via `useShopStore().addToCart()`.
- **Impact:** No functional bug, but dead code that could confuse maintainers.
- **File:** `frontend/src/components/shop/ShopHome.jsx:114`

### Minor

**m1: Route comment says "24 hours" but implementation is 5 minutes**
- `backend/routes/v2/orders.js:91` comment says `Cancel order (within 24 hours of placement)` but the actual `Order.isCancelable` virtual enforces a 5-minute window. The `shopStore.js:407` also comments "Cancel order (within 24 hours)". Both are documentation-only inaccuracies.
- **Files:** `backend/routes/v2/orders.js:91`, `frontend/src/store/shopStore.js:407`

**m2: Category filter is single-select, not multi-select**
- Story-01 AC2 spec'd multiple category selection with removable pills. `FilterPanel.jsx` uses radio buttons (single-select). FR3 only requires "filter by category" which is met, but the story acceptance criteria are partially unmet.
- **File:** `frontend/src/components/shop/FilterPanel.jsx:23` (radio instead of checkbox)

**m3: `shopController.getVendorsWithProductCount` has double response**
- `shopController.js:193-194` calls `res.status(200).json(result.data)` twice in sequence. The second call will fail silently (headers already sent) but the first response is correct. No runtime error in practice since Express ignores the second write, but it is a code quality issue.
- **File:** `backend/controllers/shopController.js:193-194`

**m4: `console.error` statements remain in cart and order controllers**
- Sprint 6 Story 8.4 cleaned frontend console.log calls, but `cartController.js` still has 6 `console.error` calls and `orderController.js` has 5 `console.error` calls. These should use the project's pino logger (`errorLogger`) as done in `shopController.js`.
- **Files:** `backend/controllers/cartController.js`, `backend/controllers/orderController.js`

## Recommended Fix Stories

1. **[P1] Build Product Detail Page (FR4)** -- Create `ProductDetail.jsx` page at route `/shop/products/:id` rendering full description, image gallery, stock info, and add-to-cart with quantity selector. Backend API already exists.

2. **[P2] Fix double response in shopController** -- Remove duplicate `res.status(200).json(result.data)` at line 193-194 of `shopController.js`.

3. **[P3] Correct cancel window comments** -- Update route comment in `orders.js:91` and Zustand store comment in `shopStore.js:407` from "24 hours" to "5 minutes" to match implementation.

4. **[P3] Remove dead handleAddToCart placeholder** -- Remove unused `handleAddToCart` in `ShopHome.jsx:114` and the `onAddToCart` prop threading through `ProductGrid`.

5. **[P3] Migrate console.error to pino logger** -- Replace `console.error` in `cartController.js` and `orderController.js` with `errorLogger.error()` per project convention.

6. **[P4] Multi-category filter enhancement** -- Optional: upgrade `FilterPanel` to support multi-select categories with removable pills per original Story-01 AC2 spec.

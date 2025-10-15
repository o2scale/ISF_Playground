# API Documentation

## Base URL
```
Local: http://localhost:5001/api
Swagger: http://localhost:5001/api-docs
```

## Authentication
```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/student/login
POST /api/auth/student/facial/login
GET  /api/auth/profile (authenticated)
PUT  /api/auth/change-password (authenticated)
```

## User Management
```http
# V1 API
GET    /api/v1/users/:role?balagruhaId=<id>
GET    /api/v1/users/:userId
POST   /api/v1/users (multipart/form-data)
PUT    /api/v1/users/:userId (multipart/form-data)
DELETE /api/v1/users/:userId
PUT    /api/v1/users/password
POST   /api/v1/users/assign-balagruha
GET    /api/v1/users/balagruha/:balagruhaId
```

## Coin Wallet API
```http
GET /api/v1/coin/balance (authenticated)
GET /api/v1/coin/stats (authenticated)
GET /api/v1/coin/transactions?page=1&limit=50 (authenticated)
GET /api/v1/coin/wtf-transactions?limit=50 (authenticated)
GET /api/v1/coin/top-earners?limit=10&period=weekly (admin)
GET /api/v1/coin/all-transactions?filters... (admin)
```

## Notifications
```http
GET /api/notifications/user?page=1&limit=50 (authenticated)
GET /api/notifications/unread-count (authenticated)
PUT /api/notifications/:id/read (authenticated)
PUT /api/notifications/mark-all-read (authenticated)
POST /api/notifications (admin)
```

## WTF (Wall of Fame)
```http
# Pins
GET    /api/v1/wtf/pins?status=approved&page=1&limit=20
GET    /api/v1/wtf/pins/:id
POST   /api/v1/wtf/pins (multipart/form-data, admin/coach)
PUT    /api/v1/wtf/pins/:id (multipart/form-data, admin/coach)
DELETE /api/v1/wtf/pins/:id (admin/coach)

# Submissions
POST /api/v1/wtf/submissions (multipart/form-data, student)
GET  /api/v1/wtf/submissions?studentId=<id>&status=pending

# Interactions
POST /api/v1/wtf/interactions/like
POST /api/v1/wtf/interactions/view
GET  /api/v1/wtf/interactions/:pinId/stats
```

## Sprint 5: Shop API (TO CREATE)

### Recommended Structure: `/api/v2/shop/`

```http
# Products
GET    /api/v2/shop/products?category=<cat>&page=1&limit=20
GET    /api/v2/shop/products/:id
GET    /api/v2/shop/products/featured
GET    /api/v2/shop/products/new-arrivals
POST   /api/v2/shop/products (admin, multipart/form-data)
PUT    /api/v2/shop/products/:id (admin, multipart/form-data)
DELETE /api/v2/shop/products/:id (admin)

# Cart (Optional - can use localStorage)
GET    /api/v2/shop/cart (authenticated)
POST   /api/v2/shop/cart/add (authenticated)
PUT    /api/v2/shop/cart/update (authenticated)
DELETE /api/v2/shop/cart/remove/:itemId (authenticated)
DELETE /api/v2/shop/cart/clear (authenticated)

# Orders
POST   /api/v2/shop/orders (authenticated)
GET    /api/v2/shop/orders (authenticated, paginated)
GET    /api/v2/shop/orders/:id (authenticated)
PUT    /api/v2/shop/orders/:id/status (admin)
DELETE /api/v2/shop/orders/:id/cancel (authenticated)

# Admin
GET    /api/v2/shop/admin/orders?status=<>&page=1 (admin)
GET    /api/v2/shop/admin/stats (admin)
PUT    /api/v2/shop/admin/inventory/:productId (admin)
```

## Middleware Patterns

### Authentication
```javascript
const { authenticate } = require('../middleware/auth');

router.get('/protected', authenticate, controller.method);
// req.user available in controller
```

### Authorization (RBAC)
```javascript
const { authenticate, authorize } = require('../middleware/auth');

router.post('/admin-only',
  authenticate,
  authorize('users', 'create'),
  controller.method
);
```

### File Upload
```javascript
const { upload } = require('../middleware/upload');

// Single file
router.post('/avatar', upload.single('avatar'), ...);

// Multiple files
router.post('/gallery', upload.array('images', 5), ...);

// Multiple fields
router.post('/user',
  upload.fields([
    { name: 'facialData', maxCount: 5 },
    { name: 'documents', maxCount: 3 }
  ]),
  ...
);
```

## Error Response Format

### Standard Error
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (dev mode only)"
}
```

### Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

## Success Response Format

### Standard Success
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10
    }
  }
}
```

## Sprint 5 Shop API Examples

### Get Products
```http
GET /api/v2/shop/products?category=books&page=1&limit=20
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "products": [
      {
        "_id": "...",
        "name": "Programming Book",
        "description": "Learn coding",
        "price": 50,
        "category": "books",
        "stockQuantity": 10,
        "images": ["https://s3..."],
        "isAvailable": true
      }
    ],
    "pagination": { ... }
  }
}
```

### Create Order (Purchase)
```http
POST /api/v2/shop/orders
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "items": [
    { "shopItemId": "...", "quantity": 1 },
    { "shopItemId": "...", "quantity": 2 }
  ],
  "deliveryMethod": "pickup",
  "customerNotes": "Please gift wrap"
}

Response:
{
  "success": true,
  "data": {
    "order": {
      "_id": "...",
      "orderNumber": "ORD-2024-001",
      "totalCost": 150,
      "status": "confirmed",
      "items": [...]
    },
    "newCoinBalance": 850
  },
  "message": "Order placed successfully"
}

Side Effects:
- Coin balance deducted
- Notification sent
- Order created
- Stock updated
```

### Get User Orders
```http
GET /api/v2/shop/orders?page=1&limit=10
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "orders": [
      {
        "orderNumber": "ORD-2024-001",
        "totalCost": 150,
        "status": "confirmed",
        "items": [...],
        "createdAt": "2024-12-07T10:00:00Z"
      }
    ],
    "pagination": { ... }
  }
}
```

## Rate Limiting (Current)

### Auth Endpoints
```javascript
// Currently NOT implemented, but should be for Sprint 5
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: "Too many login attempts"
});

router.post("/login", authLimiter, ...);
```

### Shop Endpoints (Recommended for Sprint 5)
```javascript
const shopLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  message: "Too many shop requests"
});

const purchaseLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3, // Max 3 purchases per minute
  message: "Too many purchase attempts"
});

router.get("/products", shopLimiter, ...);
router.post("/orders", purchaseLimiter, ...);
```

## WebSocket API

### Connection
```javascript
ws://localhost:5001?token=<jwt>
```

### Messages

#### Subscribe
```json
{ "type": "subscribe", "data": { "room": "notifications" } }
```

#### Notification Event
```json
{
  "type": "notification",
  "data": {
    "notification": { ... },
    "timestamp": "2024-12-07T10:00:00Z"
  }
}
```

#### Shop Events (Sprint 5)
```json
{
  "type": "order_status_changed",
  "data": {
    "orderId": "...",
    "oldStatus": "confirmed",
    "newStatus": "ready",
    "message": "Your order is ready for pickup!"
  }
}
```

## Technical Debt

### Current Issues
1. **No Input Validation:** Many endpoints lack express-validator
2. **Inconsistent Response Format:** Some return raw data, some wrap in { data }
3. **No API Versioning Strategy:** Mix of /api/v1 and /api/ routes
4. **No Request ID Tracking:** Can't trace requests across logs
5. **Error Handling:** Inconsistent error responses

### Recommendations for Sprint 5
1. **Add Validation Middleware:** Use express-validator for all shop endpoints
2. **Standardize Responses:** Use consistent wrapper format
3. **Add Request Logging:** Log request ID, user ID, endpoint, duration
4. **Implement Circuit Breaker:** For external services (S3, payment gateways)
5. **Add API Documentation:** Auto-generate from Swagger annotations

## Summary

**Current State:**
- ✅ RESTful API structure
- ✅ JWT authentication
- ✅ RBAC authorization
- ✅ File upload (Multer + S3)
- ✅ WebSocket support
- ⚠️ Inconsistent validation
- ⚠️ No rate limiting
- ⚠️ Mixed API versions

**Sprint 5 Strategy:**
- Create `/api/v2/shop/` namespace
- Implement proper validation
- Add rate limiting
- Use existing auth middleware
- Follow REST conventions

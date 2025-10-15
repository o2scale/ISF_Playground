# Epic: Shop Management (Admin-Facing)

**Epic ID:** Sprint5-Epic-02
**Sprint:** Sprint 5 - ISF Shop
**Date Created:** October 7, 2025
**Status:** Ready for Development
**Priority:** High

---

## Epic Overview

### Description
Build a comprehensive product and inventory management system for administrators to control the ISF Shop. Admins can create/edit/delete products, manage inventory levels, track stock, and receive low-stock alerts. This provides the admin-side tooling required to maintain a functional e-commerce system.

### Business Value
- Empowers admins to manage shop catalog independently
- Enables real-time inventory tracking to prevent stockouts
- Provides visibility into product performance
- Automates low-stock alerts to ensure continuous availability
- Reduces manual overhead through bulk operations

### Success Criteria
- Admins can perform full CRUD operations on products
- Real-time inventory tracking reflects all purchases accurately
- Low stock alerts trigger when threshold breached
- Admins can view all orders and student purchases
- Bulk product operations (import/export) functional
- Inventory audit trail captures all stock changes

---

## User Stories

### Story 5: Product CRUD Operations
**Story ID:** Sprint5-Story-05
**File:** `docs/stories/sprint5-story-05-product-crud.md`
**Priority:** P0
**Estimate:** 2 days
**Dependencies:** None

**User Story:**
As an admin, I need to create, edit, and delete products with all necessary details so that I can manage the shop catalog.

**Key Features:**
- Product creation form (name, SKU, category, price, description)
- Image upload (AWS S3 integration)
- Product editing (update any field)
- Soft delete (mark as inactive, not hard delete)
- Product duplication for quick creation
- SKU uniqueness validation
- Price and stock validation

---

### Story 6: Inventory Management
**Story ID:** Sprint5-Story-06
**File:** `docs/stories/sprint5-story-06-inventory-management.md`
**Priority:** P1
**Estimate:** 2 days
**Dependencies:** Sprint5-Story-05

**User Story:**
As an admin, I need to manage product inventory levels with bulk updates and audit trails so that I can maintain accurate stock levels.

**Key Features:**
- Manual stock adjustment (add/subtract)
- Bulk stock updates (CSV import)
- Stock adjustment reason (purchase, manual, return)
- Inventory audit trail (all changes logged)
- Current stock display with color coding
- Stock history per product
- Automatic stock decrement on purchase

---

### Story 7: Stock Tracking & Alerts
**Story ID:** Sprint5-Story-07
**File:** `docs/stories/sprint5-story-07-stock-alerts.md`
**Priority:** P1
**Estimate:** 1 day
**Dependencies:** Sprint5-Story-06

**User Story:**
As an admin, I want to receive low-stock alerts and view stock reports so that I can proactively restock popular items.

**Key Features:**
- Low stock threshold per product (configurable)
- Dashboard notification when threshold breached
- Low stock report (all products below threshold)
- Out of stock report
- Stock turnover rate calculation
- Email alerts to designated admins (optional)

---

## Technical Overview

### Architecture Components

**Frontend:**
- `components/admin/shop/ProductManagement.jsx` - Product list view
- `components/admin/shop/ProductForm.jsx` - Create/edit form
- `components/admin/shop/ProductTable.jsx` - Sortable product table
- `components/admin/shop/OrderManagement.jsx` - View all orders
- `components/admin/shop/InventoryDashboard.jsx` - Stock tracking

**Backend:**
- `routes/v2/shop.js` - Admin routes under `/admin/*` prefix
- `controllers/shopController.js` - Admin-specific methods
- `services/shopService.js` - Product CRUD logic
- `models/shopItem.js` - Product schema with versioning
- `models/inventoryTransaction.js` - Stock change audit

### Database Schema

**ShopItem (Admin Fields):**
```javascript
{
  // ... base fields ...
  lowStockThreshold: Number,  // Default: 5
  isActive: Boolean,          // Soft delete flag
  createdBy: ObjectId,        // Admin who created
  __v: Number,                // Optimistic locking
  timestamps: true
}
```

**InventoryTransaction Collection:**
```javascript
{
  _id: ObjectId,
  productId: ObjectId,
  transactionType: Enum,  // 'purchase', 'adjustment', 'return'
  quantity: Number,       // Positive or negative
  previousStock: Number,
  newStock: Number,
  reference: {
    type: String,         // 'order', 'manual'
    id: ObjectId
  },
  notes: String,
  performedBy: ObjectId,
  timestamp: Date
}
```

### API Endpoints

**Admin Routes:**
- `POST /api/v2/shop/admin/products` - Create product
- `PUT /api/v2/shop/admin/products/:productId` - Update product
- `DELETE /api/v2/shop/admin/products/:productId` - Delete (soft)
- `PATCH /api/v2/shop/admin/products/:productId/stock` - Update stock
- `GET /api/v2/shop/admin/orders` - View all orders
- `GET /api/v2/shop/admin/inventory/low-stock` - Low stock report
- `GET /api/v2/shop/admin/inventory/audit/:productId` - Audit trail

---

## Dependencies

### Internal Dependencies
- **Sprint 1 Auth:** Reuse `authenticate` and `roleCheck(['admin'])` middleware
- **Sprint 1 AWS S3:** Reuse Multer + S3 upload for product images
- **Sprint 5 ShopItem Model:** Must exist for CRUD operations

### Story Dependencies
- **Story 6 blocks Story 7:** Inventory management must exist before alerts
- **Story 5 blocks Story 6:** Products must exist before managing stock

---

## Risks & Mitigations

**Risk 1: Concurrent Stock Updates (admin adjusts while student buys)**
**Mitigation:** Optimistic locking with `__v` field. All stock updates check version number to detect conflicts.

**Risk 2: Bulk Import Data Corruption**
**Mitigation:** Validate CSV data before import. Dry-run preview. Rollback mechanism for failed bulk operations.

**Risk 3: Image Upload Failures**
**Mitigation:** Product can exist without image (optional field). Admin can retry upload. Fallback placeholder image.

**Risk 4: Low Stock Alert Spam**
**Mitigation:** Alerts sent once when threshold crossed. Re-alert only after stock replenished above threshold.

---

## Testing Requirements

**Unit Tests:**
- Product CRUD service methods
- Stock adjustment calculations
- Low stock threshold detection
- SKU uniqueness validation

**Integration Tests:**
- Product creation with image upload
- Stock update concurrent with purchase
- Bulk product import (CSV)
- Low stock alert triggering

**E2E Tests:**
- Admin creates product → Student buys → Stock decrements → Low stock alert
- Admin edits product details
- Admin soft deletes product → Product hidden from students

---

## Definition of Done

- [ ] All 3 stories in epic completed
- [ ] All acceptance criteria met
- [ ] Tests passing (>80% coverage)
- [ ] Code reviewed (no critical issues)
- [ ] QA gate passed
- [ ] Admin can create product end-to-end
- [ ] Stock tracking accurate across purchases
- [ ] Low stock alerts functional
- [ ] Documentation updated

---

**Created:** October 7, 2025 - 6:20 PM
**Last Updated:** October 7, 2025 - 6:20 PM

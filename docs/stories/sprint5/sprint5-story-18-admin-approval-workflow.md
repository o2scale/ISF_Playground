# Story 18: Admin Approval Workflow for Multi-Product Purchase Requests

**Story ID:** Sprint5-Story-18
**Epic:** [Sprint5-Epic-05 (Purchase Manager Workflow)](../../epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md)
**Priority:** High
**Status:** In Progress
**Estimate:** 1.5 days
**Created:** 2025-10-30 00:50:45
**Last Updated:** 2025-10-30 00:50:45

---

## User Story

**As an** Admin
**I want to** review and approve/reject **MULTI-PRODUCT** purchase requests from Purchase Managers with file attachments
**So that** I can control inventory purchasing, ensure budget compliance, and maintain proper oversight across multiple items per request

---

## Context

This story **REPLACES** the obsolete single-product approval workflow (sprint5-story-18-admin-approval-workflow-OBSOLETE.md) with an enhanced version supporting:

1. **Multi-Product Review**: Admins review requests containing multiple products (1-N items per request)
2. **File Attachment Access**: View and download supporting documents attached by Purchase Managers
3. **Enhanced Request Summaries**: View totals across all products (total items, total quantity, total estimated cost)
4. **Same Approval Logic**: Approval/rejection workflow remains the same, but displays multi-product data

This approach significantly improves admin efficiency by:
- Reviewing bundled product requests in one workflow
- Accessing vendor quotations and specifications upfront
- Making informed decisions with full supporting documentation
- Reducing approval overhead for related purchases

### Dependencies

**Requires Story 17 (Multi-Product Purchase Request Creation) to be COMPLETE:**
- Story 17 introduces the `items[]` array and `attachments[]` array in PurchaseRequest model
- Story 17 implements file upload functionality
- Story 18 reuses the same backend model and displays multi-product data in approval workflow

---

## Acceptance Criteria

### AC1: View All Purchase Requests (Admin View - Adapted for Multi-Product)

**CHANGED FROM OBSOLETE VERSION:** Single product display → Multi-product summary

- ✅ Admin can access Shop Inventory view in `/purchase` page
- ✅ Admin sees ALL purchase requests (across all balagruhas, all purchase managers)
- ✅ No frontend filtering applied (unlike Purchase Manager view)
- ✅ Table shows:
  - Request ID (e.g., "PR-001")
  - **Total Items** (e.g., "3 products") - **NEW**
  - **Total Quantity** (sum across all products, e.g., "225 units") - **NEW**
  - **Total Estimated Cost** (₹ formatted, sum across all items) - **NEW**
  - Attachments count (e.g., "📎 2 files") - **NEW**
  - Requested By (Purchase Manager name)
  - Balagruha
  - Status badge (🟡 Pending, ✅ Approved, ❌ Rejected, ✅ Completed)
  - Request Age (e.g., "2 hours ago")
  - Actions (Approve/Reject buttons for pending requests)
- ✅ Can filter by:
  - Date range
  - Balagruha (dropdown shows ALL balagruhas)
  - Status
  - Search (product names, SKU, requester name, reason)

### AC2: Approve Multi-Product Request (Adapted)

**CHANGED FROM OBSOLETE VERSION:** Single product summary → Items table with totals

- ✅ Admin can click [✅ Approve] button on pending requests
- ✅ Approval modal opens with:
  - **Request summary:**
    - Request ID
    - Requested By (name, email, balagruha)
    - Request timestamp and age
    - Reason and justification
  - **Items table showing all products:** - **NEW**
    - Product Name
    - SKU
    - Current Stock / Low Stock Threshold
    - Requested Quantity
    - Estimated Unit Cost (₹)
    - Estimated Total Cost (₹)
  - **Footer row: Total Estimated Cost** (₹ sum across all items) - **NEW**
  - **Attachments section with download links:** - **NEW**
    - List of attached files with filenames
    - Click to download/preview each file
  - Admin Notes field (optional, max 500 chars)
- ✅ Confirmation message: "Approve this purchase request?"
- ✅ On approve:
  - POST /api/v2/shop/admin/purchase-requests/:id/approve
  - Backend updates:
    - status → 'approved'
    - reviewedBy → admin user ID
    - reviewedAt → current timestamp
    - reviewNotes → admin notes
  - Success toast: "Purchase request approved"
  - Table updates in real-time
- ✅ Purchase Manager sees status change to "✅ Approved"
- ✅ [Update Stock] button becomes available for Purchase Manager

### AC3: Reject Multi-Product Request (Adapted)

**CHANGED FROM OBSOLETE VERSION:** Single product summary → Items table with totals

- ✅ Admin can click [❌ Reject] button on pending requests
- ✅ Rejection modal opens with:
  - **Request summary** (same as approval modal)
  - **Items table** showing all products with totals - **NEW**
  - **Attachments section** with download links - **NEW**
  - Rejection Reason field (required, max 500 chars)
- ✅ Confirmation message: "Reject this purchase request?"
- ✅ On reject:
  - POST /api/v2/shop/admin/purchase-requests/:id/reject
  - Backend updates:
    - status → 'rejected'
    - reviewedBy → admin user ID
    - reviewedAt → current timestamp
    - reviewNotes → rejection reason
  - Success toast: "Purchase request rejected"
  - Table updates in real-time
- ✅ Purchase Manager sees status change to "❌ Rejected"
- ✅ Cannot edit or update rejected requests

### AC4: View Multi-Product Request Details (Admin)

**CHANGED FROM OBSOLETE VERSION:** Single product view → Items table + attachments

- ✅ Admin can click on any request row to view full details
- ✅ Details modal shows:
  - **Request header:**
    - Request ID
    - Status badge
    - Requested By (name, email, balagruha)
    - Request timestamp and age
  - **Items table:** - **NEW**
    - All products in request with columns:
      - Product Name (with image thumbnail if available)
      - SKU
      - Current Stock / Threshold
      - Requested Quantity
      - Estimated Unit Cost
      - Estimated Total Cost
    - Footer row with Total Estimated Cost
  - **Attachments section:** - **NEW**
    - Grid/list of attached files
    - File previews (thumbnails for images, icons for PDFs/docs)
    - Download links for each file
  - **Request details:**
    - Reason & justification from Purchase Manager
    - If approved: Approval date, admin name, admin notes
    - If rejected: Rejection date, admin name, rejection reason
    - If completed: Supplier, invoice, purchase date, actual costs, stock updated
- ✅ Modal adapts based on status (shows approve/reject buttons for pending)

### AC5: Self-Approval Prevention (UNCHANGED)

**NO CHANGES FROM OBSOLETE VERSION** - Validation logic remains the same

- ✅ Admin cannot approve own requests (if admin created a request, another admin must approve)
- ✅ Backend validation: `reviewedBy !== requestedBy`
- ✅ Error message if attempted: "Cannot approve your own request. Another admin must approve."
- ✅ Once approved, request cannot be re-approved or modified
- ✅ Once rejected, request cannot be re-rejected or approved

### AC6: Pending Requests Dashboard (Adapted for Multi-Product)

**CHANGED FROM OBSOLETE VERSION:** Badge shows request count, not product count

- ✅ Admin dashboard shows count of **pending requests** (not product count)
  - Example: "3 pending requests" (even if those requests contain 15 total products)
- ✅ Pending requests badge in navigation (e.g., "Shop Inventory (3)" if 3 pending requests)
- ✅ Can sort by request age (oldest first - prioritize old requests)
- ✅ Visual indicator for urgent requests (e.g., requests containing out-of-stock items highlighted)

### AC7: Audit Trail Visibility (Adapted for Multi-Product)

**CHANGED FROM OBSOLETE VERSION:** Audit trail shows multi-product data

- ✅ Admin can view full approval/rejection history
- ✅ Each request shows:
  - Created by: [User] on [Date]
  - **Items count:** "3 products, 225 units, ₹1,025.00" - **NEW**
  - **Attachments count:** "📎 2 files" - **NEW**
  - Reviewed by: [Admin] on [Date]
  - Status transitions logged
- ✅ Timeline view showing workflow progression

---

## Technical Requirements

### Backend Implementation

#### IMPORTANT: Backend Controllers Already Support Multi-Product!

**NO BACKEND CHANGES REQUIRED** for Story 18 approval functionality.

Story 17 already implemented:
- ✅ PurchaseRequest model with `items[]` array
- ✅ PurchaseRequest model with `attachments[]` array
- ✅ Controller methods (`approvePurchaseRequest`, `rejectPurchaseRequest`) work with multi-product data
- ✅ Validation middleware for items array

**Backend is ready for Story 18 - focus on frontend updates only.**

---

### Frontend Implementation

#### 1. Update ApproveRequestModal.jsx (Multi-Product Support)

**File:** `frontend/src/components/purchaseManagement/modals/ApproveRequestModal.jsx`

**Changes Required:**

```jsx
// Add items table to modal body (replace single product display)
<div className="modal-body">
  {/* Request Summary */}
  <div className="request-summary">
    <div className="summary-row">
      <label>Request ID:</label>
      <strong>{request.requestId}</strong>
    </div>
    <div className="summary-row">
      <label>Requested By:</label>
      <span>
        {request.requestedBy?.name} (Purchase Manager)
        <br />
        <small>📍 {request.balagruhaId?.name}</small>
      </span>
    </div>
    <div className="summary-row">
      <label>Requested:</label>
      <span>{dayjs(request.createdAt).format('DD-MM-YYYY HH:mm')} ({dayjs(request.createdAt).fromNow()})</span>
    </div>
    <div className="summary-row">
      <label>Reason:</label>
      <p>{request.reason}</p>
    </div>
    {request.justification && (
      <div className="summary-row">
        <label>Justification:</label>
        <p>{request.justification}</p>
      </div>
    )}
  </div>

  <hr />

  {/* ⭐ NEW: Items Table */}
  <div className="items-section">
    <h4>Items Requested ({request.items?.length || 0} products)</h4>
    <div className="table-responsive">
      <table className="items-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Current Stock</th>
            <th>Quantity</th>
            <th>Unit Cost (₹)</th>
            <th>Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {request.items?.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td className="sku-cell">{item.productSKU}</td>
              <td>
                <span className={item.currentStock === 0 ? 'text-danger' : 'text-warning'}>
                  {item.currentStock} / {item.lowStockThreshold}
                  {item.currentStock === 0 && ' 🔴'}
                  {item.currentStock > 0 && item.currentStock <= item.lowStockThreshold && ' ⚠️'}
                </span>
              </td>
              <td>{item.requestedQuantity}</td>
              <td>₹{item.estimatedUnitCost.toFixed(2)}</td>
              <td>₹{item.estimatedTotalCost.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td colSpan="5" className="total-label">
              <strong>Total Estimated Cost:</strong>
            </td>
            <td className="total-amount">
              <strong>₹{request.totalEstimatedCost?.toFixed(2) || '0.00'}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>

  {/* ⭐ NEW: Attachments Section */}
  {request.attachments?.length > 0 && (
    <div className="attachments-section">
      <h4>Attachments ({request.attachments.length})</h4>
      <div className="attachments-list">
        {request.attachments.map((file, index) => (
          <div key={index} className="attachment-item">
            <i className="fas fa-paperclip"></i>
            <a
              href={`${API_URL}${file.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              {file.filename}
            </a>
            <small>({dayjs(file.uploadedAt).format('DD-MM-YYYY')})</small>
          </div>
        ))}
      </div>
    </div>
  )}

  <hr />

  {/* Admin Notes */}
  <div className="form-group">
    <label>Admin Notes (Optional)</label>
    <textarea
      rows="3"
      maxLength="500"
      value={reviewNotes}
      onChange={(e) => setReviewNotes(e.target.value)}
      placeholder="Add any notes about this approval (e.g., supplier to use, special instructions)"
    />
    <small className="char-count">{reviewNotes.length}/500</small>
  </div>

  {/* Confirmation */}
  <div className="confirmation-box">
    <p>⚠️ Are you sure you want to <strong>approve</strong> this purchase request?</p>
    <p>The Purchase Manager will be able to update stock for all {request.items?.length || 0} products after making the purchase.</p>
  </div>
</div>
```

---

#### 2. Update RejectRequestModal.jsx (Multi-Product Support)

**File:** `frontend/src/components/purchaseManagement/modals/RejectRequestModal.jsx`

**Changes Required:**

```jsx
<div className="modal-body">
  {/* Request Summary */}
  <div className="request-summary">
    <div className="summary-row">
      <label>Request ID:</label>
      <strong>{request.requestId}</strong>
    </div>
    <div className="summary-row">
      <label>Requested By:</label>
      <span>{request.requestedBy?.name} (📍 {request.balagruhaId?.name})</span>
    </div>
    <div className="summary-row">
      <label>Total Items:</label>
      <strong>{request.items?.length || 0} products, {request.totalQuantity || 0} units</strong>
    </div>
    <div className="summary-row">
      <label>Total Estimated Cost:</label>
      <strong>₹{request.totalEstimatedCost?.toFixed(2) || '0.00'}</strong>
    </div>
    <div className="summary-row">
      <label>Reason:</label>
      <p>{request.reason}</p>
    </div>
  </div>

  <hr />

  {/* ⭐ NEW: Items Table (same as approval modal) */}
  <div className="items-section">
    <h4>Items in Request</h4>
    <div className="table-responsive">
      <table className="items-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Unit Cost (₹)</th>
            <th>Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {request.items?.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.productSKU}</td>
              <td>{item.requestedQuantity}</td>
              <td>₹{item.estimatedUnitCost.toFixed(2)}</td>
              <td>₹{item.estimatedTotalCost.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td colSpan="4" className="total-label">
              <strong>Total:</strong>
            </td>
            <td className="total-amount">
              <strong>₹{request.totalEstimatedCost?.toFixed(2)}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>

  {/* ⭐ NEW: Attachments Section */}
  {request.attachments?.length > 0 && (
    <div className="attachments-section">
      <h4>Attachments ({request.attachments.length})</h4>
      <div className="attachments-list">
        {request.attachments.map((file, index) => (
          <div key={index} className="attachment-item">
            <i className="fas fa-paperclip"></i>
            <a
              href={`${API_URL}${file.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.filename}
            </a>
          </div>
        ))}
      </div>
    </div>
  )}

  <hr />

  {/* Rejection Reason (Required) */}
  <div className="form-group">
    <label>Rejection Reason *</label>
    <textarea
      rows="4"
      maxLength="500"
      value={reviewNotes}
      onChange={(e) => setReviewNotes(e.target.value)}
      placeholder="Why is this request being rejected? (This will be visible to the Purchase Manager)"
      required
    />
    <small className="char-count">{reviewNotes.length}/500</small>
    {!reviewNotes.trim() && (
      <small className="text-danger">Rejection reason is required</small>
    )}
  </div>

  {/* Confirmation */}
  <div className="confirmation-box warning">
    <p>⚠️ Are you sure you want to <strong>reject</strong> this purchase request?</p>
    <p>The Purchase Manager will be notified of the rejection and the reason.</p>
  </div>
</div>
```

---

#### 3. Update ShopInventoryView.jsx (Multi-Product Table Display)

**File:** `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx`

**Changes Required:**

```jsx
// Update table columns to show multi-product summary
<thead>
  <tr>
    <th>Request ID</th>
    <th>Total Items</th> {/* NEW - replaces single "Product" column */}
    <th>Total Quantity</th> {/* NEW */}
    <th>Total Cost (₹)</th> {/* NEW - replaces single cost */}
    <th>Attachments</th> {/* NEW */}
    <th>Requested By</th>
    <th>Balagruha</th>
    <th>Reason</th>
    <th>Status</th>
    <th>Date</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {requests.map(request => (
    <tr key={request._id}>
      <td className="request-id">{request.requestId}</td>

      {/* ⭐ NEW: Total Items */}
      <td className="items-count">
        {request.items?.length || 0} product{request.items?.length !== 1 ? 's' : ''}
      </td>

      {/* ⭐ NEW: Total Quantity */}
      <td className="total-quantity">
        {request.items?.reduce((sum, item) => sum + item.requestedQuantity, 0) || 0} units
      </td>

      {/* ⭐ NEW: Total Cost */}
      <td className="total-cost">
        ₹{request.totalEstimatedCost?.toFixed(2) || '0.00'}
      </td>

      {/* ⭐ NEW: Attachments */}
      <td className="attachments-count">
        {request.attachments?.length > 0 ? (
          <span title={`${request.attachments.length} file(s)`}>
            📎 {request.attachments.length}
          </span>
        ) : (
          <span className="text-muted">—</span>
        )}
      </td>

      <td className="requester">
        {request.requestedBy?.name}
        <br />
        <small className="text-muted">{request.requestedBy?.email}</small>
      </td>

      <td className="balagruha">
        {request.balagruhaId?.name || 'N/A'}
      </td>

      <td className="reason" title={request.reason}>
        {request.reason.length > 50 ? `${request.reason.substring(0, 50)}...` : request.reason}
      </td>

      <td className="status">
        <span className={`status-badge status-${request.status}`}>
          {getStatusDisplay(request.status)}
        </span>
      </td>

      <td className="date">
        {dayjs(request.createdAt).format('DD-MM-YYYY')}
        <br />
        <small className="text-muted">{dayjs(request.createdAt).fromNow()}</small>
      </td>

      <td className="actions">
        {/* Admin actions for pending requests */}
        {userRole === 'admin' && request.status === 'pending_approval' && (
          <>
            <button
              className="icon-button approve"
              onClick={() => handleApprove(request)}
              title="Approve Request"
            >
              ✅
            </button>
            <button
              className="icon-button reject"
              onClick={() => handleReject(request)}
              title="Reject Request"
            >
              ❌
            </button>
          </>
        )}

        {/* View details button */}
        <button
          className="icon-button view"
          onClick={() => {
            setSelectedRequest(request);
            setShowViewModal(true);
          }}
          title="View Details"
        >
          👁️
        </button>
      </td>
    </tr>
  ))}
</tbody>
```

---

## UI Changes Summary

### Request List View Changes

| Field | Obsolete Version | New Version (Story 18) |
|-------|------------------|------------------------|
| **Product** | Single product name + SKU | **"3 products"** (count) |
| **Quantity** | Single number (e.g., "50") | **"225 units"** (sum across all items) |
| **Cost** | Single cost or N/A | **"₹1,025.00"** (total estimated cost) |
| **Attachments** | ❌ Not shown | **"📎 2 files"** (count) |

### Approval Modal Changes

| Section | Obsolete Version | New Version (Story 18) |
|---------|------------------|------------------------|
| **Product Info** | Single product summary | **Items table** (all products with totals) |
| **Stock Display** | Single stock level | **Per-product stock** in table rows |
| **Cost Display** | Single cost or text | **Per-product costs + total** |
| **Attachments** | ❌ Not shown | **Attachments section** with download links |

### Rejection Modal Changes

| Section | Obsolete Version | New Version (Story 18) |
|---------|------------------|------------------------|
| **Request Summary** | Single product | **Items count + total cost** |
| **Details** | Simple text | **Items table** (same as approval modal) |
| **Attachments** | ❌ Not shown | **Attachments section** with download links |

---

## Implementation Notes

### Code Reuse Strategy

**GOOD NEWS:** Backend already complete from Story 17!

**No backend changes needed:**
- ✅ PurchaseRequest model with items array (Story 17)
- ✅ PurchaseRequest model with attachments array (Story 17)
- ✅ Approval/rejection controller methods already handle multi-product data
- ✅ Validation middleware already validates items array

**Frontend changes only:**
- Update ApproveRequestModal to show items table + attachments
- Update RejectRequestModal to show items table + attachments
- Update ShopInventoryView table columns for multi-product summary
- Add CSS styling for items table and attachments section

### Data Flow

**Backend → Frontend:**
```javascript
// Backend returns (already implemented in Story 17):
{
  _id: "...",
  requestId: "PR-001",
  items: [
    {
      productId: "...",
      productName: "Notebook",
      productSKU: "NB-001",
      requestedQuantity: 50,
      currentStock: 5,
      lowStockThreshold: 10,
      estimatedUnitCost: 10.00,
      estimatedTotalCost: 500.00
    },
    // ... more items
  ],
  attachments: [
    {
      filename: "quotation.pdf",
      fileUrl: "/uploads/quotation-123.pdf",
      uploadedAt: "2025-10-30T00:00:00Z"
    }
  ],
  totalEstimatedCost: 1025.00,
  requestedBy: { ... },
  status: "pending_approval"
}
```

**Frontend Display:**
- Table: Show `items.length` products, sum of quantities, `totalEstimatedCost`
- Modal: Loop through `items[]` to build table rows
- Modal: Loop through `attachments[]` to show download links

---

## Testing Strategy

### Unit Tests (Frontend)

```javascript
describe('ApproveRequestModal - Multi-Product', () => {
  it('should display items table with all products', () => {
    const request = {
      items: [
        { productName: 'Notebook', requestedQuantity: 50, estimatedTotalCost: 500 },
        { productName: 'Pencil', requestedQuantity: 100, estimatedTotalCost: 500 }
      ],
      totalEstimatedCost: 1000
    };

    render(<ApproveRequestModal request={request} />);

    expect(screen.getByText('Notebook')).toBeInTheDocument();
    expect(screen.getByText('Pencil')).toBeInTheDocument();
    expect(screen.getByText('₹1,000.00')).toBeInTheDocument();
  });

  it('should display attachments section if files exist', () => {
    const request = {
      items: [...],
      attachments: [
        { filename: 'quotation.pdf', fileUrl: '/uploads/file.pdf' }
      ]
    };

    render(<ApproveRequestModal request={request} />);

    expect(screen.getByText('Attachments (1)')).toBeInTheDocument();
    expect(screen.getByText('quotation.pdf')).toBeInTheDocument();
  });

  it('should calculate total quantity across all items', () => {
    const request = {
      items: [
        { requestedQuantity: 50 },
        { requestedQuantity: 100 },
        { requestedQuantity: 75 }
      ]
    };

    const totalQty = request.items.reduce((sum, item) => sum + item.requestedQuantity, 0);
    expect(totalQty).toBe(225);
  });
});
```

### E2E Tests (Playwright)

```javascript
test('TC-18.1: Admin approves multi-product purchase request', async ({ page }) => {
  // Login as Admin
  await loginAsAdmin(page);
  await page.goto('/purchase');
  await page.selectOption('.purchase-type-dropdown', 'shop-inventory');

  // Find pending multi-product request
  const pendingRow = page.locator('table tbody tr').filter({ hasText: '3 products' }).first();
  await expect(pendingRow).toBeVisible();
  await expect(pendingRow).toContainText('225 units');
  await expect(pendingRow).toContainText('₹1,025.00');
  await expect(pendingRow).toContainText('📎 2');

  // Click Approve button
  await pendingRow.locator('button.approve').click();

  // Approval modal opens
  await expect(page.locator('.approval-modal')).toBeVisible();

  // Verify items table shows all products
  await expect(page.locator('.items-table tbody tr')).toHaveCount(3);
  await expect(page.locator('.items-table')).toContainText('Notebook');
  await expect(page.locator('.items-table')).toContainText('Pencil');
  await expect(page.locator('.items-table')).toContainText('Eraser');
  await expect(page.locator('.total-amount')).toContainText('₹1,025.00');

  // Verify attachments section
  await expect(page.locator('.attachments-section')).toContainText('Attachments (2)');
  await expect(page.locator('.attachment-item').first()).toContainText('quotation.pdf');

  // Add admin notes
  await page.fill('textarea[placeholder*="notes"]', 'Approved - Order from StatCo supplier');

  // Confirm approval
  await page.click('button:has-text("Approve Request")');

  // Verify success
  await expect(page.locator('.toast-success')).toContainText('approved successfully');

  // Verify status updated in table
  await expect(pendingRow).toContainText('Approved');
});

test('TC-18.2: Admin rejects multi-product request with reason', async ({ page }) => {
  await loginAsAdmin(page);
  await page.goto('/purchase');
  await page.selectOption('.purchase-type-dropdown', 'shop-inventory');

  const pendingRow = page.locator('table tbody tr').filter({ hasText: '3 products' }).first();
  await pendingRow.locator('button.reject').click();

  // Rejection modal opens
  await expect(page.locator('.rejection-modal')).toBeVisible();

  // Verify multi-product summary
  await expect(page.locator('.summary-row')).toContainText('3 products, 225 units');
  await expect(page.locator('.summary-row')).toContainText('₹1,025.00');

  // Verify items table
  await expect(page.locator('.items-table tbody tr')).toHaveCount(3);

  // Verify attachments section
  await expect(page.locator('.attachments-section')).toBeVisible();

  // Add rejection reason
  await page.fill('textarea', 'Budget exceeded for this month. Please resubmit next month.');

  // Submit rejection
  await page.click('button:has-text("Reject Request")');

  // Verify success
  await expect(page.locator('.toast-success')).toContainText('rejected');
  await expect(pendingRow).toContainText('Rejected');
});

test('TC-18.3: Admin downloads attachment from approval modal', async ({ page }) => {
  await loginAsAdmin(page);
  await page.goto('/purchase');
  await page.selectOption('.purchase-type-dropdown', 'shop-inventory');

  const pendingRow = page.locator('table tbody tr').first();
  await pendingRow.locator('button.approve').click();

  // Wait for attachments section
  await expect(page.locator('.attachments-section')).toBeVisible();

  // Click download link
  const downloadPromise = page.waitForEvent('download');
  await page.click('.attachment-item a[download]');
  const download = await downloadPromise;

  // Verify file downloaded
  expect(download.suggestedFilename()).toBe('quotation.pdf');
});
```

---

## Dependencies

### Story Dependencies

**CRITICAL DEPENDENCY: Story 17 must be COMPLETE before starting Story 18.**

**Story 17 (Multi-Product Purchase Request Creation) provides:**
- ✅ PurchaseRequest model with `items[]` array
- ✅ PurchaseRequest model with `attachments[]` array
- ✅ File upload middleware integration
- ✅ Backend controller methods (approve/reject already support multi-product)
- ✅ Validation middleware for items array

**Story 18 builds on Story 17 by:**
- Displaying multi-product data in approval/rejection modals
- Showing attachments with download links
- Updating table columns for multi-product summaries

### Technical Dependencies

✅ **Already Complete:**
- PurchaseRequest model (Story 17)
- File upload infrastructure (Story 17)
- Approval/rejection backend controllers (Story 17)
- OLD RBAC permissions system

⚠️ **Requires:**
- Story 19: Stock Update & Audit Trail (dependent - completes workflow)

### Story Relationship

**Story 17 (Complete):**
- Purchase Manager creates multi-product requests with files
- Status: `pending_approval`

**Story 18 (This Story):**
- Admin approves/rejects multi-product requests
- Admin views items table and attachments
- Status changes: `pending_approval` → `approved` / `rejected`

**Story 19 (Dependent):**
- Purchase Manager updates stock after approval (multi-product support)
- Status changes: `approved` → `completed`
- Creates InventoryTransaction records for each product

**All 3 stories use the same PurchaseRequest model.**

---

## Key Differences from Obsolete Version

| Aspect | Obsolete Version | New Version (Story 18) |
|--------|-----------------|------------------------|
| **Product Display (Table)** | Single product name + SKU | "3 products" (count) |
| **Quantity Display (Table)** | Single number | "225 units" (sum) |
| **Cost Display (Table)** | Single cost | "₹1,025.00" (total) |
| **Attachments (Table)** | ❌ Not shown | "📎 2 files" (count) |
| **Approval Modal - Product Info** | Single product summary | Items table (all products) |
| **Approval Modal - Attachments** | ❌ Not shown | Attachments section with download links |
| **Rejection Modal - Product Info** | Single product summary | Items table + total summary |
| **Backend Changes** | Required controller updates | ✅ No changes needed (Story 17 complete) |

---

## Dev Agent Record

**Developer:** (To be filled by Dev Agent)
**Development Start:** (Timestamp)
**Development Complete:** (Timestamp)
**Agent Model Used:** (Model name)

### Commits
- (Git commit hashes and messages)

### Files Created/Modified
- (List of files)

### Change Log
- (Summary of changes)

### Completion Notes
- (Implementation status, testing notes, known issues)

---

## QA Results

**QA Agent:** (To be filled by QA Agent)
**Testing Start:** (Timestamp)
**Testing Complete:** (Timestamp)

### Test Execution Summary
- (Test results)

### Acceptance Criteria Validation
- (AC pass/fail status)

### Quality Gate Decision
- (PASS/FAIL with score)

### Bugs Found
- (Bug reports)

---

**Last Updated:** 2025-10-30 00:50:45 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Created By:** Documentation Agent (Task: Create comprehensive Story 18 document for multi-product approval workflow)

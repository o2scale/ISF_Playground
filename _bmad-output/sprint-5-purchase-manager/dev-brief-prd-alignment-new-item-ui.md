# Dev Brief: PRD Alignment — Strict Admin-only “New Item” (Remove non-admin “Add New Product”)

## Why

The PRD requires **strict master data control**: **ONLY Admins** can introduce new items and vendors.
Currently, the Purchase Request creation modal exposes an **“+ Add New Product”** flow that is visible to non-admin roles and fails only after submission.

This creates a UX mismatch with the PRD (FR20 / Strict Mode).

## PRD references

- “Strict Master Data Control… **ONLY Admins** can introduce new items.”
- **FR20:** Restrict “New Item” and “New Vendor” actions to Admin users only.
- **FR4:** Restrict pending product creation to Admin role only.
- RBAC Matrix: **Coach ❌ New Item**, **PM ❌ New Item**, **Admin ✅ New Item**.

## Current UX (problem)

- In `CreatePurchaseRequestModal` (Purchase Management → Shop Inventory → “+ New Purchase Request”), users can click **“+ Add New Product”**.
- Non-admins hit a permission error after attempting submit (alert/popup).

## Desired UX (PRD-aligned)

### For non-admin roles (Coach / Purchase Manager / Medical / etc.)

- **Do not show** the **“+ Add New Product”** button.
- **Do not show** the inline “Add New Product” form.
- Show a small helper message near the product selector:
  - “Need a new item? Contact an Admin to add it to the Master Catalog.”

### For Admin

Choose one of these implementations:

**Option A (Minimal change):**
- Show “+ Add New Product” only for Admin.

**Option B (Best PRD match):**
- Replace “+ Add New Product” with “Add New Master Item” that navigates to the dedicated Admin item creation form (`NewItemForm`).
- Keep inline creation disabled/removed entirely.

## Implementation notes

### Files

- `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`
  - Gate rendering of the “+ Add New Product” button + inline form by role.
  - Replace `alert(...)` usage with existing `showToast(...)` pattern (optional but recommended for consistency).

### Where to get role

- Prefer passing `userRole` down as a prop from `ShopInventoryView` (already has `userRole`).
- Alternatively, use `useAuth()` or `localStorage.getItem('role')` (less ideal).

## Acceptance Criteria

- **AC1:** As Coach/PM/Medical, I cannot see any UI control that lets me create a new product from within Purchase Request creation.
- **AC2:** As Coach/PM/Medical, I only can select from the existing catalog/products when creating a Purchase Request.
- **AC3:** As Admin, I have a clear UI path to add a new Master Item (either gated inline creation or navigation to `NewItemForm`).

## QA (manual)

1. Login as Coach → `/purchase` → Shop Inventory → “+ New Purchase Request”
   - “+ Add New Product” is not visible.
2. Login as Purchase Manager → repeat
   - “+ Add New Product” is not visible.
3. Login as Admin → repeat
   - Admin sees the approved creation path (Option A or B).

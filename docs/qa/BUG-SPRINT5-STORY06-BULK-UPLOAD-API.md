# Bug Report: Story 06 - Bulk Upload API Failure

**Bug ID:** BUG-SPRINT5-STORY06-005
**Story:** Sprint5-Story-06 (Inventory Management)
**Acceptance Criteria:** AC2 - Bulk Stock Update
**Severity:** P0 - CRITICAL (Blocks AC2 entirely)
**Status:** 🔴 **OPEN**
**Found By:** Quinn (QA Agent)
**Date Found:** 2025-10-08T23:30:00Z

---

## Summary

Bulk stock upload via CSV fails with 400 Bad Request due to frontend-backend API contract mismatch. Frontend sends `updates` array, but backend validation expects `csvData` array.

---

## Steps to Reproduce

1. Navigate to `/shop/admin/inventory` as admin user
2. Click "Bulk Upload" button
3. Download CSV template (works ✅)
4. Create valid CSV file:
   ```csv
   SKU,Stock
   STAT-001,150
   STAT-002,200
   SPORT-001,50
   ```
5. Upload the CSV file
6. Click "Upload & Process" button

---

## Expected Behavior

- ✅ CSV file should be parsed by frontend
- ✅ Parsed data sent to backend as array
- ✅ Backend validates and processes bulk update
- ✅ Stock levels updated in database
- ✅ Success toast: "3 product(s) updated successfully"
- ✅ Results modal shows 3 successful updates
- ✅ Inventory table refreshes with new stock levels

---

## Actual Behavior

- ❌ Frontend sends request with `{ updates: [...] }`
- ❌ Backend validation expects `{ csvData: [...] }`
- ❌ Validation fails with 400 Bad Request
- ❌ Error toast: "Request failed with status code 400"
- ❌ Modal remains open with uploaded file
- ❌ No stock updates occur
- ❌ No results displayed

---

## Technical Details

### API Endpoint
```
POST /api/v2/shop/admin/inventory/bulk-update
```

### Frontend Request (Line 105-107)
**File:** `frontend/src/components/shop/BulkStockUploadModal.jsx`

```javascript
const response = await api.post('/api/v2/shop/admin/inventory/bulk-update', {
  updates  // ❌ WRONG FIELD NAME
});
```

**Actual Request Body:**
```json
{
  "updates": [
    {"sku": "STAT-001", "stock": 150},
    {"sku": "STAT-002", "stock": 200},
    {"sku": "SPORT-001", "stock": 50}
  ]
}
```

### Backend Validation (Line 56-64)
**File:** `backend/middleware/validation/inventoryValidation.js`

```javascript
const validateBulkUpdate = [
  body('csvData')  // ❌ EXPECTS 'csvData' NOT 'updates'
    .notEmpty().withMessage('CSV data is required')
    .isArray().withMessage('CSV data must be an array')
    .custom((value) => {
      if (value.length === 0) {
        throw new Error('CSV data cannot be empty');
      }
      return true;
    }),
  // ...
];
```

**Expected Request Body:**
```json
{
  "csvData": [
    {"sku": "STAT-001", "stock": 150},
    {"sku": "STAT-002", "stock": 200},
    {"sku": "SPORT-001", "stock": 50}
  ]
}
```

### Console Errors
```
[ERROR] Failed to load resource: the server responded with a status of 400 (Bad Request)
        @ http://localhost:5001/api/v2/shop/admin/inventory/bulk-update
[ERROR] Error uploading CSV: AxiosError
        @ http://localhost:3000/static/js/bundle.js:193592
```

---

## Root Cause

Frontend-backend API contract mismatch. The field name inconsistency causes validation to fail before reaching the controller logic.

**Mismatch:**
- Frontend sends: `{ updates: [...] }`
- Backend expects: `{ csvData: [...] }`

---

## Impact Assessment

**Severity:** P0 - CRITICAL
**Impact:** Blocks AC2 (Bulk Stock Update) entirely

**Affected Features:**
- ❌ AC2: Bulk Stock Update via CSV (100% blocked)
- ❌ Cannot test TC 2.2, TC 2.3, TC 2.4, TC 2.5, TC 2.6
- ❌ Cannot verify bulk update audit trail
- ❌ Cannot test error handling for invalid SKUs

**User Impact:**
- Admins cannot perform bulk stock updates
- Must manually adjust stock one product at a time (slow, inefficient)
- Large inventory restocks become impractical

---

## Recommended Fix

**Option 1: Fix Frontend (Recommended)**

**File:** `frontend/src/components/shop/BulkStockUploadModal.jsx:105-107`

```javascript
// BEFORE:
const response = await api.post('/api/v2/shop/admin/inventory/bulk-update', {
  updates
});

// AFTER:
const response = await api.post('/api/v2/shop/admin/inventory/bulk-update', {
  csvData: updates  // ✅ Match backend validation field name
});
```

**Rationale:**
- One-line change
- Backend validation logic is correct and comprehensive
- Maintains consistent API contract

---

**Option 2: Fix Backend (Alternative)**

**File:** `backend/middleware/validation/inventoryValidation.js:56`

```javascript
// BEFORE:
body('csvData')

// AFTER:
body('updates')
```

**Also update:** Controller file if it references `csvData`

**Rationale:**
- Changes backend validation field name to match frontend
- May require controller logic changes as well

---

## Verification Steps (After Fix)

1. ✅ Apply frontend fix (Option 1)
2. ✅ Restart frontend dev server
3. ✅ Navigate to `/shop/admin/inventory`
4. ✅ Click "Bulk Upload"
5. ✅ Upload test CSV with valid SKUs
6. ✅ Verify NO 400 error occurs
7. ✅ Verify success toast appears
8. ✅ Verify results modal shows successful updates
9. ✅ Verify stock levels updated in inventory table
10. ✅ Verify audit trail created for each update
11. ✅ Re-run TC 2.2 - TC 2.6 E2E tests

---

## Test Evidence

**Test File:** `.playwright-mcp/bulk-test-valid.csv`
```csv
SKU,Stock
STAT-001,150
STAT-002,200
SPORT-001,50
```

**Current Stock Levels (Before Upload):**
- STAT-001 (Blue Ballpoint Pen): 100
- STAT-002 (HB Pencils): 50
- SPORT-001 (Football Size 5): 8

**Expected Stock Levels (After Fix):**
- STAT-001: 150 (+50)
- STAT-002: 200 (+150)
- SPORT-001: 50 (+42)

---

## Related Files

**Frontend:**
- `frontend/src/components/shop/BulkStockUploadModal.jsx` (line 105-107)

**Backend:**
- `backend/middleware/validation/inventoryValidation.js` (line 56-64)
- `backend/routes/v2/inventory.js` (line 34-40)
- `backend/controllers/inventoryController.js` (bulk update controller)

---

## QA Status

**Test Case:** TC 2.2 - Bulk upload with valid CSV
**Result:** ❌ **FAIL** (API returns 400 Bad Request)
**Blocker:** YES (Cannot proceed with AC2 testing)

**Quality Gate:** 🔴 **FAIL**
**AC2 Status:** NOT_TESTED → BLOCKED

---

## Next Steps

1. **Dev Team:** Apply frontend fix (Option 1 recommended)
2. **Dev Team:** Test manually with valid CSV file
3. **Dev Team:** Verify backend controller handles `csvData` field correctly
4. **Dev Team:** Resubmit to QA for re-test
5. **QA:** Re-test TC 2.2 - TC 2.6 after fix
6. **QA:** Update quality gate with AC2 results

---

**Priority:** P0 - IMMEDIATE FIX REQUIRED
**Blocking:** AC2 - Bulk Stock Update (100% blocked)
**Assigned To:** Dev Agent (James)
**Target Fix Date:** 2025-10-08 (same day)

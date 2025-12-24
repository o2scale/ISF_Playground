---
story_id: "1.2"
story_key: "1-2-shopitem-refactor"
status: "done"
sprint: "Sprint 5"
epic: "Epic 1"
author: "Dev Agent"
date_created: "2025-12-23"
---

# Story 1.2: ShopItem Schema Refactor & Governance

## Story
As an Admin,
I want to define Master Items with price caps and approved vendors,
So that the organization adheres to budget and quality standards.

## Acceptance Criteria
- [x] **AC1:** **Given** I am creating a new Shop Item **When** I submit the form **Then** I must provide `maxPrice` (Rupees) and at least one `approvedVendor`.
- [x] **AC2:** **Given** I am an Admin **When** I view an item **Then** I can see the list of approved vendors and their rank.
- [x] **AC3:** **Given** I am a non-Admin (e.g., Coach, PM) **When** I try to call `createPendingProduct` **Then** I receive a 403 Forbidden error (Breaking Change).
- [x] **AC4:** **Given** Existing items **When** I view them **Then** they should still load correctly without the new fields (Backward Compatibility).

## Tasks/Subtasks
- [x] **Task 1: Update ShopItem Model**
    - [x] Modify `backend/models/shopItem.js`
    - [x] Add `approvedVendors`: `[{ vendorId: { type: ObjectId, ref: 'Vendor' }, rank: Number }]`
    - [x] Add `maxPrice`: `{ type: Number, required: false }` (Rupees) - Required for NEW items, optional for old.
    - [x] Add `sellingPrice`: `{ type: Number }` (Coins) - Review if this aliases existing `price`.
    - [x] Update unit tests in `backend/tests/shopItem.test.js` (Created `backend/tests/shopItem_story1_2.test.js`)

- [x] **Task 2: Update Admin Product Controller**
    - [x] Modify `backend/controllers/adminProductController.js`
    - [x] Update `createProduct` validation: Require `maxPrice` and `approvedVendors` (length > 0).
    - [x] Update `updateProduct` validation: Allow updates but enforce rules if fields are present.

- [x] **Task 3: Restrict Pending Product Creation**
    - [x] Modify `createPendingProduct` in `backend/controllers/adminProductController.js`
    - [x] Remove `checkPurchaseRequestAccess` or override it to enforce `req.user.role === 'admin'`.
    - [x] Update/Add tests to verify non-admins are rejected.

- [x] **Review Follow-ups (AI)**
    - [x] [AI-Review][Medium] Add `updateProduct` validation logic
    - [x] [AI-Review][Medium] Add `updateProduct` tests
    - [x] [AI-Review][High] Add vendor existence check to prevent orphaned references
    - [x] [AI-Review][Medium] Standardize error responses in `createPendingProduct`

## Dev Notes
*   **Handoff Instructions:**
    *   `approvedVendors` must reference the `Vendor` model from Story 1.1.
    *   `maxPrice` is the procurement cap in Rupees.
    *   `createPendingProduct` restriction is a strategic shift to stop unvetted items.
*   **Migration:** New fields should be optional at schema level to avoid breaking legacy data, but enforced at the Controller level for NEW items.

## Dev Agent Record
### Implementation Plan
- Implemented schema updates in `ShopItem` (added `approvedVendors`, `maxPrice`, `sellingPrice`).
- Enforced validation logic in `adminProductController.createProduct`.
- Hardened security in `createPendingProduct` to allow only Admins.
- Verified all changes with new test suites `backend/tests/shopItem_story1_2.test.js` and `backend/tests/controllers/adminProductController_story1_2.test.js`.
- Addressed code review findings: added specific validation to `updateProduct` and corresponding tests.
- Addressed Adversarial Review Findings:
    - Added data integrity check: `createProduct` and `updateProduct` now verify that `vendorId`s exist in the database.
    - Standardized error response in `createPendingProduct` to include `message` and `error` fields.
    - Fixed test suite data to comply with Story 1.1 phone validation rules.
- **Backend Hardening (2025-12-23):**
    - Implemented duplicate vendor ID validation in `adminProductController.js`.
    - Added explicit type conversion for numeric fields (`maxPrice`, `sellingPrice`, `stock`) to ensure consistent data types regardless of request format.
    - Standardized SKU normalization (always uppercase) in `createProduct`.

### Completion Notes
- All ACs met.
- Backward compatibility maintained (schema fields are optional, validation is in controller).
- Strict governance applied.
- Code review issues resolved.
- Data integrity ensured for vendor references.

## File List
- backend/models/shopItem.js
- backend/controllers/adminProductController.js
- backend/tests/shopItem_story1_2.test.js
- backend/tests/controllers/adminProductController_story1_2.test.js

## Change Log
- 2025-12-23: Formatted story file.
- 2025-12-23: Implemented schema changes and controller validation. Completed Story 1.2.
- 2025-12-23: Fixed code review issues (Update validation).
- 2025-12-23: Fixed adversarial review issues (Vendor ID validation, Error Standardization).

## Status
done
---
story_id: "1.1"
story_key: "1-1-vendor-data-model"
status: "done"
sprint: "Sprint 5"
epic: "Epic 1"
author: "Dev Agent"
date_created: "2025-12-23"
---

# Story 1.1: Vendor Data Model & Management API

## Story
As an Admin,
I want to create and manage a centralized list of Vendors,
So that purchase managers have a reliable, vetted list of suppliers to contact.

## Acceptance Criteria
- [x] **AC1:** **Given** I am an authenticated Admin **When** I access the Vendor Management API **Then** I can Create, Read, and Update vendor records (Name, Phone, Address, Active Status)
- [x] **AC2:** **Given** I am a non-admin user **When** I attempt to access Vendor Management API endpoints **Then** I receive a 403 Forbidden error
- [x] **AC3:** **Given** I am creating a vendor **When** I submit the data **Then** Name, Phone, and Address are required fields
- [x] **AC4:** **Given** I am listing vendors **Then** I can filter by "Active" status

## Tasks/Subtasks
- [x] **Task 1: Create Vendor Model**
    - [x] Create `backend/models/vendor.js` schema (name, phone, address, active, createdAt)
    - [x] Add strict validation for required fields
    - [x] Write unit test for model validation

- [x] **Task 2: Implement Vendor Controller (CRUD)**
    - [x] Create `backend/controllers/vendorController.js`
    - [x] Implement `createVendor`
    - [x] Implement `getAllVendors` (with filter)
    - [x] Implement `updateVendor`
    - [x] Implement `getVendorById`
    - [x] Write integration tests for controller methods

- [x] **Task 3: Define Routes and RBAC**
    - [x] Create `backend/routes/v2/vendor.js`
    - [x] Register routes in `backend/server.js` (or main app entry)
    - [x] Apply authentication and Admin-only middleware to all routes
    - [x] Write API tests to verify 403 for non-admins and 200/201 for admins

- [x] **Review Follow-ups (AI)**
    - [x] [AI-Review][Medium] Fix missing pagination in `getAllVendors`
    - [x] [AI-Review][Medium] Add integration test for non-admin update denial
- [x] [AI-Review][Medium] Add strict regex validation for phone numbers
- [x] [AI-Review][Medium] Cap pagination limit to prevent DoS
- [x] [AI-Review][Low] Standardize RBAC role check constants

## Dev Notes
*   **From Handoff:**
    *   **No Free Text:** Vendors must be relational entities.
    *   **Strict RBAC:** Use `req.user.role === 'admin'` checks.
    *   **Atomic Transactions:** Use MongoDB sessions if modifying sensitive data (less critical here but good practice).
*   **Architecture:**
    *   Follow existing pattern in `backend/models` and `backend/controllers`.
    *   Use `v2` routes for new features if applicable, or stick to project convention (check `main.js` or `backend/routes`).

## Dev Agent Record
### Implementation Plan
- Implemented `Vendor` Mongoose model with validation for required fields (name, phone, address).
- Created `vendorController` with standard CRUD operations: `createVendor`, `getAllVendors`, `getVendorById`, `updateVendor`.
- Implemented filtering in `getAllVendors` to filter by active status.
- Created `v2/vendor.js` routes and secured them with `authenticate` and `isAdmin` middleware.
- Registered new routes in `server.js` under `/api/v2/vendors`.
- Validated implementation with comprehensive unit and integration tests.
- Addressed code review findings:
    - added pagination to `getAllVendors`.
    - added missing RBAC test.
    - Added strict phone number validation (regex).
    - Capped pagination limit to 100 for DoS protection.
    - Standardized RBAC middleware role check.
- 19/19 tests passed across model, controller, and route suites.

### Completion Notes
- All acceptance criteria met.
- Vendor model successfully enforces data integrity.
- RBAC correctly restricts access to admin users only (verified with integration tests).
- API endpoints are functional and tested.
- 16/16 tests passed across model, controller, and route suites.
- Pagination implemented for scalability.

## File List
- backend/models/vendor.js
- backend/controllers/vendorController.js
- backend/routes/v2/vendor.js
- backend/tests/vendor.test.js
- backend/tests/controllers/vendorController.test.js
- backend/tests/routes/vendorRoutes.test.js
- backend/server.js (modified)

## Change Log
- 2025-12-23: Story file created from Epics and Handoff.
- 2025-12-23: Implemented Vendor model, controller, routes, and tests. Completed Story 1.1.
- 2025-12-23: Fixed code review issues (pagination, RBAC tests).

## Status
done

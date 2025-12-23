---
story_id: "1.1"
story_key: "1-1-vendor-data-model"
status: "in-progress"
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
- [ ] **AC1:** **Given** I am an authenticated Admin **When** I access the Vendor Management API **Then** I can Create, Read, and Update vendor records (Name, Phone, Address, Active Status)
- [ ] **AC2:** **Given** I am a non-admin user **When** I attempt to access Vendor Management API endpoints **Then** I receive a 403 Forbidden error
- [ ] **AC3:** **Given** I am creating a vendor **When** I submit the data **Then** Name, Phone, and Address are required fields
- [ ] **AC4:** **Given** I am listing vendors **Then** I can filter by "Active" status

## Tasks/Subtasks
- [ ] **Task 1: Create Vendor Model**
    - [ ] Create `backend/models/vendor.js` schema (name, phone, address, active, createdAt)
    - [ ] Add strict validation for required fields
    - [ ] Write unit test for model validation

- [ ] **Task 2: Implement Vendor Controller (CRUD)**
    - [ ] Create `backend/controllers/vendorController.js`
    - [ ] Implement `createVendor`
    - [ ] Implement `getAllVendors` (with filter)
    - [ ] Implement `updateVendor`
    - [ ] Implement `getVendorById`
    - [ ] Write integration tests for controller methods

- [ ] **Task 3: Define Routes and RBAC**
    - [ ] Create `backend/routes/v2/vendor.js`
    - [ ] Register routes in `backend/server.js` (or main app entry)
    - [ ] Apply authentication and Admin-only middleware to all routes
    - [ ] Write API tests to verify 403 for non-admins and 200/201 for admins

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
- TBD

### Completion Notes
- TBD

## File List
- TBD

## Change Log
- 2025-12-23: Story file created from Epics and Handoff.

## Status
ready-for-dev

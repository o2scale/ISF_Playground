# Story 2.4: Purchase Request Deadline (Per Request)

**Epic:** Epic 2: Purchase Request Workflow Engine  
**Story:** 2.4  
**Role:** Staff (Coach/Medical/Admin/PM) + Purchase Manager  
**Goal:** Capture a deadline for each purchase request and surface it in PM and Coach views.

## User Story

As a Staff member creating a purchase request,  
I want to set a deadline for the request,  
so that the Purchase Manager can prioritize and fulfill on time.

## Acceptance Criteria

**Given** I am creating a purchase request  
**When** I fill the form  
**Then** I must provide a **Deadline** (date) for the request.

**Given** a purchase request exists  
**When** a Purchase Manager views the requests table  
**Then** the request’s **Deadline** is visible and can be filtered/sorted (optional).

**Given** I am the requester (Coach/Staff)  
**When** I view my requests dashboard  
**Then** I can see the request deadline.

## Tasks/Subtasks

- [x] **Task 1: Backend schema**
  - [x] Add `deadline: Date` to `backend/models/purchaseRequest.js`

- [x] **Task 2: Backend create validation**
  - [x] Accept `deadline` in `createPurchaseRequest` and validate date format

- [x] **Task 3: Frontend request creation UI**
  - [x] Add required Deadline field to `CreatePurchaseRequestModal`
  - [x] Submit `deadline` in the create request payload

- [ ] **Task 4: Surface deadline in list views**
  - [ ] Add Deadline column to `ShopInventoryView` requests table
  - [ ] Add Deadline column to `CoachRequestsDashboard` purchase requests table

## References

- Client C3 form: “Deadline per request”
- Frontend: `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`
- Backend: `backend/controllers/purchaseRequestController.js#createPurchaseRequest`

## Dev Agent Record

### Agent Model Used

OpenAI GPT-5.2

### Completion Notes

- Backend and request creation UI updated to store `deadline` per request.
- Remaining: display deadline columns in PM/Coach tables (if desired).

## File List

- `backend/models/purchaseRequest.js`
- `backend/controllers/purchaseRequestController.js`
- `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`

## Status

review

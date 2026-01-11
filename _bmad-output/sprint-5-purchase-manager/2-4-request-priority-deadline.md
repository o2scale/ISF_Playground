# Story 2.4: Purchase Request Priority & Deadline

**Epic:** Epic 2: Purchase Request Workflow Engine  
**Story:** 2.4  
**Role:** Staff (Coach/Medical/Admin/PM) + Purchase Manager  
**Goal:** Capture priority level and deadline for each purchase request and surface it in PM and Coach views.

## User Story

As a Staff member creating a purchase request,  
I want to set a priority level (High/Medium/Low) and deadline for the request,  
so that the Purchase Manager can prioritize and fulfill on time.

## Client Requirements (from C3)

> "Each item also has a priority as in high medium or low."
> "On purM page, he should be able to see at a glance his pending work. First wrt priority."
> "On his task bar, a badge should tell him quickly the number of tasks pending."

## Acceptance Criteria

### AC1: Priority Selection on Request Creation
**Given** I am creating a purchase request  
**When** I fill the form  
**Then** I must select a **Priority Level** (High, Medium, Low - default: Medium)  
**And** I must provide a **Deadline** (date) for the request.

### AC2: Priority Display in PM Dashboard
**Given** a purchase request exists  
**When** a Purchase Manager views the requests table  
**Then** the request's **Priority Level** is visible as a colored badge:
  - 🔴 High = Red badge
  - 🟡 Medium = Yellow badge  
  - 🟢 Low = Green badge
**And** requests are **sorted by priority first** (High → Medium → Low)  
**And** the deadline is visible and can be filtered/sorted.

### AC3: Priority Display in Coach Dashboard
**Given** I am the requester (Coach/Staff)  
**When** I view my requests dashboard  
**Then** I can see the request priority and deadline.

### AC4: PM Badge Count
**Given** I am a Purchase Manager  
**When** I view my task bar/navigation  
**Then** I see a badge showing the number of **High Priority** pending tasks.

## Tasks/Subtasks

- [x] **Task 1: Backend schema**
  - [x] Add `deadline: Date` to `backend/models/purchaseRequest.js`
  - [x] Add `priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }`

- [x] **Task 2: Backend create validation**
  - [x] Accept `deadline` and `priority` in `createPurchaseRequest` and validate

- [x] **Task 3: Frontend request creation UI**
  - [x] Add required Deadline field to `CreatePurchaseRequestModal`
  - [x] Add Priority dropdown (High/Medium/Low) to `CreatePurchaseRequestModal`
  - [x] Submit `deadline` and `priority` in the create request payload

- [ ] **Task 4: Surface priority/deadline in PM views**
  - [ ] Add Priority column with colored badges to `ShopInventoryView` requests table
  - [ ] Add Deadline column to `ShopInventoryView` requests table
  - [ ] Sort by priority by default (high first)
  - [ ] Add badge count for high priority items in PM navigation

- [ ] **Task 5: Surface priority/deadline in Coach views**
  - [ ] Add Priority and Deadline columns to `CoachRequestsDashboard` purchase requests table

## References

- Client C3 form: "Deadline per request", "Priority as high/medium/low"
- Frontend: `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`
- Backend: `backend/controllers/purchaseRequestController.js#createPurchaseRequest`

## Dev Agent Record

### Agent Model Used

Claude (BMad Master)

### Completion Notes

- Backend and request creation UI updated to store `deadline` and `priority` per request.
- Remaining: display priority badges and deadline columns in PM/Coach tables.
- Remaining: PM navigation badge count for high priority items.

## File List

- `backend/models/purchaseRequest.js`
- `backend/controllers/purchaseRequestController.js`
- `frontend/src/components/purchaseManagement/modals/CreatePurchaseRequestModal.jsx`

## Status

in_progress

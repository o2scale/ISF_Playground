# Story 3.2: Machine Registration & Balagruha Assignment

Status: ready-for-dev

## Story

As an Admin,
I want to register a new machine by entering its MAC address, serial number, and description, and assign it to a specific Balagruha,
so that new hardware is tracked in the system and linked to the correct facility.

## Acceptance Criteria

1. **Given** the admin is on the Machine Management page
   **When** the admin clicks "Register Machine" and fills in MAC address, serial number, description, and selects a Balagruha from a dropdown
   **Then** the machine is created via the existing `/api/v1/machines` API
   **And** the machine appears in the machine list with its assigned Balagruha
   **And** validation prevents duplicate MAC addresses or serial numbers
   **And** the Balagruha dropdown is populated from the existing Balagruha API
   **And** all form inputs have appropriate ARIA labels and are keyboard-accessible (NFR8)
   **And** the form follows existing admin page patterns (VendorManagement, InventoryManagement as reference)
   **And** success/error feedback uses existing toast notification patterns

## Tasks / Subtasks

- [ ] Task 1: Create registration form/modal (AC: #1)
  - [ ] Add "Register Machine" button to Machine Management page
  - [ ] Create registration form (modal or inline) with fields: MAC address, serial number, description, Balagruha dropdown
  - [ ] Populate Balagruha dropdown from existing Balagruha API
  - [ ] Follow existing form patterns (reference: NewItemForm.jsx, VendorManagement)
- [ ] Task 2: Add form validation (AC: #1)
  - [ ] MAC address format validation
  - [ ] Serial number required
  - [ ] Balagruha selection required
  - [ ] Client-side duplicate check if API supports it
- [ ] Task 3: API integration for creation (AC: #1)
  - [ ] Add `createMachine()` to `frontend/src/api/machines.js`
  - [ ] POST to existing `/api/v1/machines` endpoint
  - [ ] Handle success (toast + refresh list) and error (toast with message)
- [ ] Task 4: Accessibility (AC: #1)
  - [ ] ARIA labels on all form inputs
  - [ ] Keyboard-accessible form submission
  - [ ] Focus management: focus first input on form open, return focus on close

## Dev Notes

### Machine Model Fields (from `backend/models/machine.js`)

Inspect the actual model to confirm fields — expected: macAddress, serialNumber, description, balagruhaId, status (active/inactive), createdAt, updatedAt

### Critical Constraints

- **Use existing API** — do NOT create new endpoints
- **Follow existing form patterns** — reference NewItemForm.jsx, VendorManagement
- **Toast notifications** for success/error feedback
- **ARIA labels on all inputs** (NFR8)

### References

- [Source: _bmad-output/project-planning-artifacts/prd.md#FR14, FR15, NFR8]
- [Source: _bmad-output/implementation-artifacts/3-1-machine-list-view-filtering.md — prerequisite]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List

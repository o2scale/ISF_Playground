# Story 3.3: Machine Reassignment & Deactivation

Status: ready-for-dev

## Story

As an Admin,
I want to reassign a machine from one Balagruha to another and deactivate retired machines,
so that machine assignments stay current as hardware moves between facilities or is retired.

## Acceptance Criteria

1. **Given** the admin views an existing machine in the machine list
   **When** the admin selects "Edit" on a machine and changes the Balagruha assignment
   **Then** the machine's Balagruha assignment is updated via the API
   **And** the machine list reflects the new assignment immediately
2. **When** the admin selects "Deactivate" on a machine
   **Then** the machine status changes to inactive
   **And** inactive machines remain visible in the list but are clearly marked as inactive
   **And** deactivation requires confirmation to prevent accidental deactivation
   **And** all actions are keyboard-accessible (NFR8)

## Tasks / Subtasks

- [ ] Task 1: Add edit functionality (AC: #1)
  - [ ] Add "Edit" action button/icon to each machine row
  - [ ] Open edit form (modal or inline) pre-populated with current machine data
  - [ ] Allow changing Balagruha assignment via dropdown
  - [ ] PUT/PATCH to existing machine API endpoint
  - [ ] Refresh list after successful update
- [ ] Task 2: Add deactivation functionality (AC: #2)
  - [ ] Add "Deactivate" action button/icon to active machines
  - [ ] Show confirmation modal/dialog before deactivation
  - [ ] Update machine status via API
  - [ ] Style inactive machines distinctly (muted colors, "Inactive" badge)
- [ ] Task 3: Add `updateMachine()` and `deactivateMachine()` to API module (AC: #1, #2)
  - [ ] Add to `frontend/src/api/machines.js`
  - [ ] Handle success/error with toast notifications
- [ ] Task 4: Accessibility (AC: #1, #2)
  - [ ] Keyboard-accessible edit and deactivate actions
  - [ ] Confirmation dialog keyboard-accessible (focus trap, Escape to cancel)

## Dev Notes

### Critical Constraints

- **Confirmation required for deactivation** — prevent accidental clicks
- **Inactive machines stay visible** — filtered via status filter from Story 3.1
- **Use existing API endpoints** — do NOT create new backend routes
- **Optimistic UI or refresh after mutation** — ensure list reflects changes immediately

### References

- [Source: _bmad-output/project-planning-artifacts/prd.md#FR16, FR17, NFR8]
- [Source: _bmad-output/implementation-artifacts/3-1-machine-list-view-filtering.md — prerequisite]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List

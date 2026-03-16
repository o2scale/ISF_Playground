# Story 3.1: Machine List View with Filtering

Status: ready-for-dev

## Story

As an Admin,
I want to view a list of all registered machines with their status, Balagruha assignment, and MAC address, and filter/search the list,
so that I can see the current state of all machines across Balagruhas at a glance.

## Acceptance Criteria

1. **Given** the admin is authenticated and has admin role permissions
   **When** the admin navigates to the Machine Management page
   **Then** a table displays all registered machines with columns: MAC address, serial number, description, assigned Balagruha, status (active/inactive)
   **And** the page uses the `Layout` wrapper with sidebar navigation
   **And** the page is added to the admin sidebar navigation
   **And** the admin can filter machines by Balagruha (dropdown), status (active/inactive), or search by MAC address/serial number/description
   **And** the page enforces admin-only access via `authenticate` + `checkPermission` middleware (NFR4)
   **And** page load time does not exceed 3 seconds (NFR6)
   **And** the table is keyboard-navigable with appropriate ARIA labels (NFR8)
   **And** the frontend consumes existing `/api/v1/machines` endpoints

## Tasks / Subtasks

- [ ] Task 1: Explore existing Machine API (AC: #1)
  - [ ] Read `backend/routes/v1/machines.js` to understand available endpoints
  - [ ] Read `backend/models/machine.js` and `backend/models/machineAssignment.js` for data structure
  - [ ] Read `backend/models/machineactivelog.js` for usage log structure
  - [ ] Document available endpoints and their response shapes
- [ ] Task 2: Create Machine Management page component (AC: #1)
  - [ ] Create `frontend/src/pages/MachineManagement.jsx`
  - [ ] Use `Layout` wrapper (not `StudentLayout`)
  - [ ] Add data table with columns: MAC address, serial number, description, Balagruha, status
  - [ ] Follow existing admin page patterns (reference: `VendorManagement.jsx`, `InventoryManagement.jsx`)
  - [ ] Use Radix UI + Tailwind for styling
- [ ] Task 3: Add API integration (AC: #1)
  - [ ] Create `frontend/src/api/machines.js` API module (following split API pattern)
  - [ ] Implement `getMachines()`, `getMachineById()` API calls
  - [ ] Consume `/api/v1/machines` endpoints
  - [ ] Handle loading states and errors with toast notifications
- [ ] Task 4: Add filtering and search (AC: #1)
  - [ ] Add Balagruha dropdown filter (populated from Balagruha API)
  - [ ] Add status filter (active/inactive toggle)
  - [ ] Add search input for MAC address/serial number/description
  - [ ] Client-side or API-side filtering depending on endpoint support
- [ ] Task 5: Add to admin navigation (AC: #1)
  - [ ] Add "Machine Management" item to sidebar in `Layout` component
  - [ ] Add route to `App.js` with admin role guard
  - [ ] Ensure `checkPermission` middleware on the route
- [ ] Task 6: Accessibility (AC: #1)
  - [ ] Ensure table has `<th>` headers with scope attributes
  - [ ] Add ARIA labels to filter controls and search input
  - [ ] Verify keyboard tab order through all interactive elements
  - [ ] Test with keyboard-only navigation

## Dev Notes

### Existing Machine Backend

- **Models:** `machine.js`, `machineAssignment.js`, `machineactivelog.js`
- **Routes:** `backend/routes/v1/machines.js` → mounted at `/api/v1/machines`
- **Note:** These are v1 routes, not v2 — the Machine Management backend was built in Sprint 1

### Frontend Patterns to Follow

- **API module:** Create `frontend/src/api/machines.js` following pattern in `frontend/src/api/` (17 feature modules)
- **Page component:** Default export in `frontend/src/pages/MachineManagement.jsx`
- **State:** Consider Zustand store if complex state needed, or local useState for simple list
- **UI components:** Radix UI primitives + Tailwind CSS
- **Reference pages:** `VendorManagement.jsx`, `InventoryManagement.jsx` — similar admin CRUD patterns

### Color System for Status

- Active: `--success` (#4cc9f0) or `green-500`
- Inactive: `--gray` (#6c757d) or `slate-400`
- Use existing Tailwind color utilities

### Critical Constraints

- **Admin-only access** (NFR4) — route guard + checkPermission
- **< 3s page load** (NFR6) — use pagination if machine list is large
- **Keyboard navigable + ARIA labels** (NFR8) — all interactive elements
- **Do NOT create new backend endpoints** — use existing v1 Machine API

### References

- [Source: _bmad-output/architecture.md#Project Structure — machine.js, machineAssignment.js, machineactivelog.js]
- [Source: _bmad-output/ux-design-specification.md#Section 2 — Design Philosophy, Layout wrapper]
- [Source: _bmad-output/project-planning-artifacts/prd.md#FR13, FR19, NFR4, NFR6, NFR8]
- [Source: project-context.md#Section 2 — React Patterns, API Client Pattern]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List

# Story 3.4: Machine Usage Logs

Status: ready-for-dev

## Story

As an Admin,
I want to view machine usage logs (active log history) for any registered machine,
so that I can monitor which machines are being used, when, and by whom.

## Acceptance Criteria

1. **Given** the admin is on the Machine Management page and selects a specific machine
   **When** the admin clicks "View Logs" or expands the machine row
   **Then** a usage log view displays the machine's active log history from the `machineactivelog` model
   **And** logs show timestamp, user (if available), and session duration
   **And** logs are sorted by most recent first
   **And** the log view supports pagination for machines with extensive history
   **And** the log view is keyboard-navigable with appropriate ARIA labels (NFR8)

## Tasks / Subtasks

- [ ] Task 1: Explore machineactivelog API (AC: #1)
  - [ ] Read `backend/models/machineactivelog.js` for data structure
  - [ ] Check if API endpoint exists for fetching logs by machine ID
  - [ ] If no endpoint exists, check if one can be added to existing v1 routes
- [ ] Task 2: Create log view component (AC: #1)
  - [ ] Add "View Logs" action to each machine row
  - [ ] Create expandable panel or modal showing log entries
  - [ ] Display: timestamp, user name (if available), session duration
  - [ ] Sort by most recent first
  - [ ] Add pagination (20 items default, following project convention)
- [ ] Task 3: API integration (AC: #1)
  - [ ] Add `getMachineLogs(machineId)` to `frontend/src/api/machines.js`
  - [ ] Handle empty state (machine with no logs)
- [ ] Task 4: Accessibility (AC: #1)
  - [ ] Keyboard-navigable log view
  - [ ] ARIA labels for log table/list
  - [ ] Pagination controls keyboard-accessible

## Dev Notes

### Machine Active Log Model

- Model: `backend/models/machineactivelog.js`
- Expected fields: machineId, userId, startTime, endTime, duration
- Note: MAC address validation is currently DISABLED — logs may be sparse

### Critical Constraints

- **Pagination required** — 20 items default (project convention)
- **Handle empty state gracefully** — machines may have zero logs if MAC validation is disabled
- **Read-only view** — no editing/deleting logs from the UI

### References

- [Source: _bmad-output/architecture.md#Project Structure — machineactivelog.js]
- [Source: _bmad-output/project-planning-artifacts/prd.md#FR18, NFR8]
- [Source: _bmad-output/implementation-artifacts/3-1-machine-list-view-filtering.md — prerequisite]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List

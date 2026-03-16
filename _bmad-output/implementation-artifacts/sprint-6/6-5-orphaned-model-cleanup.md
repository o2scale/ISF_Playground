# Story 6.5: Orphaned Model Cleanup

Status: ready-for-dev

## Story

As a Dev,
I want to remove or archive orphaned models and ghost references,
so that the codebase contains only models that are actively used and all ObjectId refs point to existing models.

## Acceptance Criteria

1. **Given** ActivityLog model is completely orphaned (imported nowhere)
   **When** Dev verifies it has zero imports and removes/archives it
   **Then** the model file is moved to an archive directory or deleted with documented justification
   **And** database-architecture.md is updated to reflect the removal

2. **Given** MachineAssignment model is orphaned with a broken `ref: "Admin"` (Admin model doesn't exist)
   **When** Dev verifies it has zero imports and removes/archives it
   **Then** the model file is handled consistently with ActivityLog
   **And** database-architecture.md is updated

3. **Given** User.performanceReports and Student.performanceReports reference a ghost "Report" model that doesn't exist, and 19 data-access projection objects defensively exclude it
   **When** Dev removes the `performanceReports` field from both User and Student schemas
   **Then** the field no longer exists in either model
   **And** the 19 DA projection exclusions are cleaned up (no longer needed)
   **And** all tests pass after removal

## Tasks / Subtasks

- [ ] Task 1: Verify ActivityLog is truly orphaned (AC: #1)
  - [ ] `grep -rn "activitylog\|ActivityLog\|activity_log" backend/ --include="*.js"` (excluding models/ itself)
  - [ ] If zero imports confirmed, move to `backend/models/_archived/` or delete
  - [ ] Document decision

- [ ] Task 2: Verify MachineAssignment is truly orphaned (AC: #2)
  - [ ] `grep -rn "machineAssignment\|MachineAssignment" backend/ --include="*.js"` (excluding models/)
  - [ ] Note the broken `ref: "Admin"` — this would throw on populate
  - [ ] If zero imports confirmed, handle same as ActivityLog

- [ ] Task 3: Remove ghost Report reference (AC: #3)
  - [ ] Remove `performanceReports` field from User schema (`backend/models/user.js`)
  - [ ] Remove `performanceReports` field from Student schema (`backend/models/student.js`)
  - [ ] Find and clean up the 19 DA projection exclusions: `grep -rn "performanceReports" backend/`
  - [ ] Run tests: `cd backend && npx jest --verbose`

- [ ] Task 4: Update documentation (AC: #1, #2, #3)
  - [ ] Update `_bmad-output/database-architecture.md` — mark removed/archived models
  - [ ] Update model count if models are removed (45 → 43 or similar)

## Dev Notes

### Orphaned Models (from Story 4.3 findings)

- **ActivityLog** (`backend/models/activitylog.js`) — defined with schema but zero imports anywhere in controllers, services, or data-access layers
- **MachineAssignment** (`backend/models/machineAssignment.js`) — zero imports AND has broken `ref: "Admin"` pointing to non-existent model
- **MachineActiveLog** (`backend/models/machineactivelog.js`) — NOTE: this was listed as orphaned BUT the Machine Management UI (Story 3.4) may now use it. Verify before touching.

### Critical Constraints

- **Verify before deleting** — grep the entire codebase, not just controllers
- **MachineActiveLog may no longer be orphaned** — Sprint 6 Story 3.4 added machine usage logs UI
- **Run tests after each removal** — ensure no hidden dependencies
- **Archive is safer than delete** — use `backend/models/_archived/` directory

### References

- [Source: sprint-6-evaluation-summary.md#H5, H6, H7]
- [Source: _bmad-output/database-architecture.md#Orphaned Models section]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List

# Story 6.7: Missing Database Indexes

Status: ready-for-dev

## Story

As a Dev,
I want to add indexes to the 15+ frequently queried reference fields that currently lack them,
so that database queries perform efficiently without collection scans.

## Acceptance Criteria

1. **Given** 15+ fields across models like Attendance.studentId, Coin.userId, Task.assignedUser, Schedules.balagruhaId lack indexes
   **When** Dev adds appropriate indexes (single and compound) to these fields
   **Then** all identified fields have indexes defined in their Mongoose schemas
   **And** indexes cover the most common query patterns (filter by balagruhaId, userId, studentId, status)

2. **Given** indexes are added
   **When** Dev runs the test suite
   **Then** all tests pass (indexes don't affect test behavior, only performance)
   **And** database-architecture.md is updated to reflect new indexes

## Tasks / Subtasks

- [ ] Task 1: Identify all missing indexes (AC: #1)
  - [ ] Review Story 4.3 findings (Schema Quality Finding #4)
  - [ ] Cross-reference with controller query patterns from dependency map
  - [ ] Prioritize by query frequency (balagruhaId and userId are highest priority)

- [ ] Task 2: Add indexes to models (AC: #1)
  - [ ] For each identified field, add `index: true` or `schema.index()` compound indexes
  - [ ] Follow existing index patterns from project-context.md:
    ```javascript
    schema.index({ category: 1, isActive: 1 });  // Compound
    schema.index({ name: 'text', description: 'text' });  // Text search
    schema.index({ createdAt: -1 });  // Sorting
    ```
  - [ ] Focus on: balagruhaId, userId, studentId, status fields across all models

- [ ] Task 3: Verify and document (AC: #2)
  - [ ] Run `cd backend && npx jest --verbose`
  - [ ] Update `_bmad-output/database-architecture.md` with new indexes

## Dev Notes

### Priority Index Additions (from Finding #4)

| Model | Field | Index Type | Rationale |
|-------|-------|-----------|-----------|
| Attendance | studentId | single | Frequent student lookup |
| Attendance | balagruhaId | single | Scope filtering |
| Coin | userId | single | Wallet queries |
| Coin | studentId | single | Transaction history |
| Task | assignedUser | single | Task list filtering |
| Task | balagruhaId | single | Scope filtering |
| Schedules | balagruhaId | single | Schedule queries |
| SportsTasks | balagruhaId | single | Scope filtering |
| MedicalCheckIns | studentId | single | Health record lookup |
| MedicalCheckIns | balagruhaId | single | Scope filtering |
| Notification | userId | single | Notification queries |
| StudentProgress | studentId | single | Progress tracking |
| Submission | studentId | single | Submission lookup |
| CourseAssignment | studentId | single | Assignment queries |
| CourseAssignment | balagruhaId | single | Scope filtering |

### Critical Constraints

- **Indexes are additive** — they don't change behavior, only improve performance
- **Don't add indexes to orphaned models** — ActivityLog, MachineAssignment may be removed in Story 6.5
- **Follow existing patterns** — use `schema.index()` for compound, `index: true` for single field

### References

- [Source: sprint-6-evaluation-summary.md#M4]
- [Source: _bmad-output/database-architecture.md#Schema Quality Finding 4]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List

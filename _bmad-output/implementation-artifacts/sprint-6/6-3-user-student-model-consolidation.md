# Story 6.3: User/Student Model Consolidation

Status: ready-for-dev

## Story

As a Dev,
I want to consolidate the redundant User and Student models by migrating frController to use User model and deprecating Student for direct queries,
so that there is a single source of truth for student data without enum casing mismatches.

## Acceptance Criteria

1. **Given** User and Student models store overlapping fields (age, gender, balagruha, parentalStatus) with inconsistent enum casing ("male" vs "Male")
   **When** Dev analyzes the actual usage of Student model across the codebase
   **Then** a migration plan is documented identifying: which controllers use Student, what data needs to move, and what the consolidated pattern looks like

2. **Given** frController.js is the only controller importing Student model directly
   **When** Dev migrates frController to use User model for student lookups
   **Then** frController no longer imports or queries Student model
   **And** FR registration and recognition still work correctly using User model data

3. **Given** enum casing is inconsistent between User ("male"/"female") and Student ("Male"/"Female")
   **When** Dev standardizes enum casing
   **Then** a single consistent casing is used across the codebase (lowercase preferred per project conventions)
   **And** a data migration script handles existing records

4. **Given** changes are made to core authentication flow
   **When** Dev runs full test suite
   **Then** all existing tests pass AND FR functionality works correctly

## Tasks / Subtasks

- [ ] Task 1: Analyze Student model usage (AC: #1)
  - [ ] Grep for all imports of Student model: `grep -rn "require.*student\|require.*Student" backend/`
  - [ ] Document each usage: which controller, what operation, can it use User instead?
  - [ ] Check if Student has unique fields not in User
  - [ ] Document migration plan

- [ ] Task 2: Migrate frController (AC: #2)
  - [ ] Read `backend/controllers/frController.js` — understand how it uses Student
  - [ ] Replace Student queries with User queries (filtering by role='student')
  - [ ] Update FaceEmbedding references if they point to Student._id vs User._id
  - [ ] Test FR registration and recognition after migration

- [ ] Task 3: Standardize enum casing (AC: #3)
  - [ ] Identify all enum fields with casing mismatches (gender, parentalStatus, etc.)
  - [ ] Create migration script to lowercase existing data
  - [ ] Update model schemas to use lowercase enums
  - [ ] Run migration on development database

- [ ] Task 4: Verify (AC: #4)
  - [ ] Run `cd backend && npx jest --verbose`
  - [ ] Test FR login flow manually or via existing tests
  - [ ] Verify no regressions

## Dev Notes

### Current State (from database-architecture.md)

- **User model:** Has age, gender (enum: ["male","female","other"]), balagruhaIds[] (array)
- **Student model:** Has age, gender (enum: ["Male","Female","Other"]), balagruhaId (single ref)
- **Student is only directly imported by:** frController.js
- **Most controllers use User model** for student data access

### Critical Constraints

- **DO NOT delete Student model yet** — deprecate by removing direct imports, but keep the model file
- **FR is the primary student login** — this MUST NOT break
- **Run FR tests after migration** — verify register and recognize work
- **Data migration script must be idempotent** — safe to run multiple times

### References

- [Source: sprint-6-evaluation-summary.md#H1]
- [Source: architect-evaluation-report.md — User vs Student redundancy]
- [Source: _bmad-output/database-architecture.md — User and Student schema sections]

## Dev Agent Record

### Agent Model Used
### Debug Log References
### Completion Notes List
### Change Log
### File List

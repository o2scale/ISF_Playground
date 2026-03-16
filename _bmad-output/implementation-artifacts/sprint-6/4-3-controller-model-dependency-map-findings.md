# Story 4.3: Controller-to-Model Dependency Map & Findings

Status: complete

## Story

As a Dev,
I want to produce a controller-to-model dependency map and identify schema inconsistencies,
so that the blast radius of any code change is known and schema issues are surfaced.

## Acceptance Criteria

1. **Given** the schema map and relationship documentation from Stories 4.1 and 4.2
   **When** Dev traces `require()` / model imports from each controller to the models it uses
   **Then** a dependency map is produced showing every controller and the models it reads/writes (NFR12)
   **And** the map covers all controllers in `backend/controllers/` including nested LMS controllers
   **And** each entry shows: controller name → models used → operations (read/write/both)
2. **When** Dev analyzes the schema map for quality issues
   **Then** findings are documented including: missing indexes on frequently queried fields, redundant fields across models, inconsistent naming patterns, fields without validation, and orphaned models

## Tasks / Subtasks

- [x] Task 1: Trace controller-to-model imports (AC: #1)
  - [x] For each controller in `backend/controllers/` (including `lms/` subdirectories):
    - [x] Read the file and find all `require()` statements that import models
    - [x] Identify which model methods are called (find, findOne, create, updateOne, etc.)
    - [x] Classify as read, write, or both
  - [x] Also check `backend/services/` for service-layer model usage
- [x] Task 2: Build dependency map table (AC: #1)
  - [x] Format: | Controller | Models Used | Operations |
  - [x] Cover ALL controllers (NFR12)
  - [x] Include service layer dependencies where controllers delegate to services
- [x] Task 3: Identify schema inconsistencies (AC: #2)
  - [x] Missing indexes: fields used in frequent queries without indexes
  - [x] Redundant fields: same data stored in multiple models
  - [x] Naming inconsistencies: camelCase vs snake_case, singular vs plural
  - [x] Missing validation: required fields without validators, refs without index
  - [x] Orphaned models: models defined but never imported by any controller
- [x] Task 4: Append findings to database-architecture.md (AC: #1, #2)
  - [x] Add "Controller-Model Dependencies" section
  - [x] Add "Schema Quality Findings" section with prioritized issues

## Dev Notes

### Controller Locations (complete list from architecture.md)

```
backend/controllers/
├── 20+ top-level controllers
└── lms/
    ├── admin/ (3 controllers)
    ├── coach/ (4 controllers)
    └── student/ (5 controllers)
```

### Critical Constraints

- **Every controller must be mapped** (NFR12) — including nested LMS controllers
- **Check services too** — some controllers delegate to services which import models
- **Findings are informational** — document but do NOT fix in this story (fixes may be future work)

### References

- [Source: _bmad-output/architecture.md#Project Structure — controller listing]
- [Source: _bmad-output/project-planning-artifacts/prd.md#FR23, FR24, NFR12]
- [Source: _bmad-output/implementation-artifacts/4-1-complete-model-schema-mapping.md — prerequisite]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6 (1M context)

### Debug Log References
N/A — documentation-only story, no code changes.

### Completion Notes List
- Traced all 51 controllers (39 top-level + 12 LMS) through the full Controller -> Service -> Data-Access -> Model chain
- Identified 3 orphaned models: ActivityLog, MachineActiveLog, MachineAssignment
- Documented 9 quality findings with severity ratings (2 HIGH, 4 MEDIUM, 3 LOW)
- All 42 of 45 models are actively used; 3 are orphaned
- User model is the most heavily referenced model (25+ consumers)

### Change Log
- 2026-03-16: Appended "Controller-Model Dependencies" section to database-architecture.md
- 2026-03-16: Appended "Schema Quality Findings" section to database-architecture.md (9 findings)
- 2026-03-16: Marked story status as complete

### File List
- `_bmad-output/database-architecture.md` — Modified (appended two new sections)
- `_bmad-output/implementation-artifacts/4-3-controller-model-dependency-map-findings.md` — Modified (status + tasks + agent record)

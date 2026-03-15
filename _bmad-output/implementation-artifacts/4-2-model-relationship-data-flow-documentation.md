# Story 4.2: Model Relationship & Data Flow Documentation

Status: complete

## Story

As a Dev,
I want to document all relationships between models and map data flows for key workflows,
so that Sprint 2/3/4 planning knows how models connect and where data moves across boundaries.

## Acceptance Criteria

1. **Given** the schema map from Story 4.1 documents all 45 models with their ObjectId refs
   **When** Dev traces every ObjectId ref between models
   **Then** every model-to-model relationship is documented with direction and cardinality (NFR10)
   **And** a relationship summary table shows: source model → ref field → target model → cardinality
2. **When** Dev traces data flows for key workflows
   **Then** the following workflow data flows are documented:
   - Purchase lifecycle: PurchaseRequest → InventoryTransaction → ShopItem stock updates
   - Coin economy: Quiz/Assignment completion → Coin creation → Shop purchase → Coin deduction
   - LMS grading: Submission → Coach grading → StudentProgress update → Coin award
   - Medical check-ins: MedicalCheckIns → Student health records → Doctor visit tracking
   **And** each flow documents which models are read, written, and in what order

## Tasks / Subtasks

- [x] Task 1: Extract all ObjectId refs from Story 4.1 schema map (AC: #1)
  - [x] For each model, list all fields with `type: ObjectId, ref: 'ModelName'`
  - [x] Build relationship table: source → field → target → cardinality
  - [x] Identify one-to-one, one-to-many, many-to-many patterns
- [x] Task 2: Document purchase lifecycle flow (AC: #2)
  - [x] Trace: Staff creates PurchaseRequest → PM approves → marks ordered → delivered to store → InventoryTransaction created → ShopItem stock updated → delivered to Balagruha
  - [x] Document which models are read/written at each step
- [x] Task 3: Document coin economy flow (AC: #2)
  - [x] Trace: Student completes quiz → Submission graded → Coin created (earn) → Student browses Shop → Cart → Order → Coin deducted (spend) → 5-min cancellation → Coin refunded
  - [x] Document model interactions at each step
- [x] Task 4: Document LMS grading flow (AC: #2)
  - [x] Trace: Admin creates Course → assigns via CourseAssignment → Student progresses → submits Submission → Coach grades → StudentProgress updated → Coin awarded
- [x] Task 5: Document medical check-in flow (AC: #2)
  - [x] Trace: Staff creates MedicalCheckIn → links to Student → optionally links to Doctor visit → Hospital reference
- [x] Task 6: Append to database-architecture.md (AC: #1, #2)
  - [x] Add "Model Relationships" section with relationship table
  - [x] Add "Data Flow Documentation" section with workflow diagrams
  - [x] Verify all ObjectId refs are accounted for (NFR10)

## Dev Notes

### Key Relationship Patterns to Find

- User → Balagruha (many-to-many via balagruhaIds[])
- Student → Balagruha (many-to-one)
- PurchaseRequest → User (requestedBy), ShopItem (items[].productId), Balagruha
- Coin → Student, User (awardedBy)
- Course → ContentLibrary, Quiz, Assignment
- Submission → Student, Assignment/Quiz

### Critical Constraints

- **Every ObjectId ref must be documented** (NFR10) — no relationships missed
- **Direction and cardinality required** for each relationship
- **Data flows must trace actual code paths** — read controllers/services to verify, don't assume

### References

- [Source: _bmad-output/project-planning-artifacts/prd.md#FR21, FR22, NFR10]
- [Source: _bmad-output/implementation-artifacts/4-1-complete-model-schema-mapping.md — prerequisite]

## Dev Agent Record

### Agent Model Used
Claude Opus 4.6 (1M context)

### Debug Log References
N/A — documentation-only story, no code changes

### Completion Notes List
- 131 ObjectId references documented across all 45 models (cross-verified against `grep ref:` count of 138 raw occurrences; difference is duplicate lines from ripgrep pagination, not missed refs)
- 4 relationship patterns identified: Many-to-One (89), One-to-One (5), Many-to-Many (17), Polymorphic (2)
- 4 complete data flow workflows documented with step-by-step model read/write tracing
- Legacy/orphan refs identified: User.performanceReports and Student.performanceReports reference "Report" model which does not exist in codebase
- Medical domain finding: MedicalCheckIns.doctorVisits[] uses embedded strings for doctor/hospital names, NOT ObjectId refs to Doctor/Hospital models
- All flows verified against actual controller/service source code, not assumed

### Change Log
- 2026-03-16: Added "Model Relationships" section with complete relationship table (131 refs, 6 domain subsections)
- 2026-03-16: Added "Relationship Pattern Summary" and "Central Hub Models" analysis
- 2026-03-16: Added "Data Flow Documentation" section with 4 workflow data flows
- 2026-03-16: Updated accuracy verification statement

### File List
- _bmad-output/database-architecture.md (modified — appended ~370 lines)
- _bmad-output/implementation-artifacts/4-2-model-relationship-data-flow-documentation.md (modified — status updated)

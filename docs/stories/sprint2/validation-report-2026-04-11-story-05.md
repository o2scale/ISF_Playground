# Validation Report

**Document:** `docs/stories/sprint2/epic-03-story-05-coach-course-content-browser.md`
**Checklist:** `_bmad/bmm/workflows/4-implementation/create-story/checklist.md`
**Date:** 2026-04-11
**Validator:** Fresh-context review
**Validation framework:** `_bmad/core/tasks/validate-workflow.xml`

---

## Summary

- **Overall:** 24 of 28 checks passed (86%)
- **Critical Issues:** 0
- **Partial Items:** 4
- **Failed Items:** 0
- **Verdict:** Story is implementation-ready for a coding agent; 4 minor gaps to address before PM hand-off

---

## Section Results

### Section 1: Reinvention Prevention

Pass Rate: 4/4 (100%)

**[✓ PASS] 1.1 — Code reuse opportunities identified**
Evidence: Key Features section line "Admin Component Reuse: Reuses `CourseListView`, `CourseStructureBuilder`, `ModuleCard`, `ChapterCard`, `ContentItemCard` with a new `readOnly` prop" + Technical Notes 6.1 "`ContentItemCard.jsx:270-320` already has a built-in media preview modal for video/audio/image/PDF. This is the biggest win — no new media player component is needed."

**[✓ PASS] 1.2 — No duplicate functionality being created**
Evidence: Task 3.1 + 3.2 specify wrapper pages only (~50 lines each) that pass `readOnly={true}` to existing components. No new card/modal/tree components proposed.

**[✓ PASS] 1.3 — Existing solutions extended instead of replaced**
Evidence: Phase 2 (40 min of the 95-min total) is entirely prop-drilling `readOnly` through 5 existing components, not creating new ones. File Paths section distinguishes "Modified" vs "New" — new files are only 2 thin wrappers.

**[✓ PASS] 1.4 — Cross-story reuse with related stories documented**
Evidence: Section 6.2 "Why Not Extend Story 04" explicitly contrasts this story's content-preview purpose with Story 04's stats/reports purpose, using a comparison table. Dependencies section cites Epic 02 Story 01 (Course Creation) and Story 02 (Content Management) as providing the components reused.

---

### Section 2: Technical Specification Completeness

Pass Rate: 5/7 (71%)

**[✓ PASS] 2.1 — Library/framework versions specified where relevant**
Evidence: `@dnd-kit/core`, `@dnd-kit/sortable`, `useAutoSave` hook, `mongoose` all referenced as existing deps, no new additions required. Story explicitly says Phase 1 "No schema changes, no new data model, no new content components."

**[✓ PASS] 2.2 — API contracts fully specified**
Evidence: Section 4.1 provides exact endpoint, method, path, query params, auth header, response JSON shape with example, and error responses (403/404/500).

**[✓ PASS] 2.3 — Database schema accounted for**
Evidence: Story uses existing `Course`, `CourseAssignment`, `User` collections. Section 6.1 correctly notes that `CourseAssignment` has both singular `assignedTo.balagruhaId` and plural `assignedTo.balagruhaIds` depending on assignment type, and the new endpoint must `$or` query both.

**[✓ PASS] 2.4 — Security / RBAC requirements explicit**
Evidence: Section 2.4 RBAC acceptance criteria (RBAC-01 through RBAC-06). Section 4.2 specifies auth changes on 2 admin endpoints. Task 1.3 specifies controller-level scope check for coaches on `getCourseById`.

**[✓ PASS] 2.5 — Performance requirements specified**
Evidence: Section 2.6 PERF-01 (1.5s list load for 20 courses), PERF-02 (2s detail load for 50 content items), PERF-03 (3s video start).

**[⚠ PARTIAL] 2.6 — Error-shape contracts for frontend consumers**
Evidence: Section 4.1 defines 403/404/500 error types but doesn't show error response JSON bodies for the new endpoint. Frontend needs to know what shape to render for the user-facing error toast.
Impact: Dev agent may invent an ad-hoc error shape that doesn't match project convention.
Gap: Add example error responses matching `{success: false, message: "..."}` convention from other admin controllers.

**[⚠ PARTIAL] 2.7 — Edge case: populated quiz references to inactive/deleted quizzes**
Evidence: The admin `getCourseById` endpoint populates `modules.chapters.contentItems.quizRef` (from `courseController.js:111-115`). Story doesn't specify behavior when a referenced quiz has been deleted or archived.
Impact: Coach may see a content item with `null` quizRef and the card may crash on `contentItem.quizRef._id` access.
Gap: Add AC item to `ContentItemCard` read-only section: handle `quizRef === null` gracefully (show "Quiz no longer available" badge).

---

### Section 3: File Structure & Conventions

Pass Rate: 4/4 (100%)

**[✓ PASS] 3.1 — New file paths follow project convention**
Evidence: `frontend/src/pages/coach/CoachCoursesPage.jsx` mirrors existing `frontend/src/pages/coach/GradingDashboard.jsx` and `CoachAssignmentsPage.jsx`. Backend controller addition in existing `coachAssignmentController.js` follows the same-file-for-related-endpoints pattern.

**[✓ PASS] 3.2 — Modified file locations specified with exact line numbers where possible**
Evidence: Section 6.1 cites `ContentItemCard.jsx:270-320`, `Layout.js:141`, `CourseStructureBuilder.jsx:56-64`. File Paths section lists every modified file.

**[✓ PASS] 3.3 — Naming consistency with existing code**
Evidence: New endpoint name `getBalagruhaCourses` matches existing `getPublishedCourses`, `getCoachStudents` in the same controller. Component names `CoachCoursesPage`, `CoachCourseDetailPage` match existing `CoachAssignmentsPage`, `GradingDashboard`.

**[✓ PASS] 3.4 — Data-fix script location matches prior conventions**
Evidence: Technical Notes section says the one-shot script is "NOT committed" and uses the `markModified('permissions')` pattern, explicitly referencing the "prior B4 coach scope fix" pattern from Round 1.

---

### Section 4: Regression Safety

Pass Rate: 4/4 (100%)

**[✓ PASS] 4.1 — Backward compatibility of modified components**
Evidence: Section 6.4 Risks table row 1: "`readOnly` gating breaks admin flow — Mitigation: All gates default to `readOnly=false`; live-tested admin flow in Phase 5 Task 5.2". Every modified component acceptance criterion (RO-01 through RO-09) specifies the default is `false`.

**[✓ PASS] 4.2 — Admin flow regression testing covered**
Evidence: Phase 5 Task 5.2 "Live admin regression test (3 min)" specifies: login as admin → `/admin/courses` → verify Create/Duplicate/Publish/Archive/Edit/Delete → open structure builder → verify Add Module/drag reorder/Edit/Delete still work.

**[✓ PASS] 4.3 — Backend write endpoints protected**
Evidence: Section 4.2 "All other routes in `backend/routes/v2/lms/admin/courses.js` remain unchanged (still `Manage`-gated)." Section 6.4 Risks row 6: "All 23 write endpoints unchanged; only 2 read endpoints relaxed."

**[✓ PASS] 4.4 — Backend regression testing covered**
Evidence: Phase 5 Task 5.3 specifies curl tests: "admin GET/POST/PUT/DELETE all work; coach GET works with scope filter; coach POST/PUT/DELETE return 403".

---

### Section 5: Implementation Clarity (Disaster Prevention)

Pass Rate: 5/6 (83%)

**[✓ PASS] 5.1 — Task breakdown is granular and time-boxed**
Evidence: Phase 1-5 breakdown with individual task time estimates (5 min, 10 min, 15 min, 20 min). Total ~95 min. Every task specifies the exact file to touch and what to do.

**[✓ PASS] 5.2 — React hooks rules compliance noted**
Evidence: Section 6.1 explicitly calls out `useSortable` must be called unconditionally: "`useSortable` hook must be called unconditionally (React hooks rule). The `readOnly` gating skips the drag *handle* UI and `attributes`/`listeners` application, not the hook itself." AC RO-09 restates the same rule.

**[✓ PASS] 5.3 — Auto-save side-effect gated**
Evidence: Section 6.1 "`useAutoSave` auto-save hook must be gated via `enabled: !!course && !readOnly`." AC RO-07 restates this. Task 2.2 instructs: "Gate `useAutoSave` hook: `enabled: !!course && !readOnly`."

**[✓ PASS] 5.4 — Out-of-scope explicitly listed**
Evidence: Section 6.3 "Out of Scope (v1)" lists 5 excluded items: quiz content preview, per-content-item progress, course edit, assign flow, content-only search. Each has a reason.

**[✓ PASS] 5.5 — Definition of done has testable items**
Evidence: Section 7 lists 18 DoD items, each independently verifiable. Every item maps back to an AC in Section 2.

**[⚠ PARTIAL] 5.6 — Test requirements and coverage target**
Evidence: DoD mentions "Live verification as coach" and "Live verification as admin" and "Backend regression test via curl" but does NOT specify unit test coverage target or E2E test file location. Story 04 specifies "Unit tests: 80%+ coverage for report aggregation logic" and "E2E tests: Full dashboard navigation tested".
Impact: Dev agent may skip automated tests entirely and rely only on the manual browser verification in Phase 5, missing regression protection for future refactors.
Gap: Add DoD items for (a) unit test coverage target for the new `getBalagruhaCourses` controller, (b) E2E test file at `frontend/tests/e2e/coach-course-browser.spec.js` covering the golden path.

---

### Section 6: LLM Dev-Agent Optimization

Pass Rate: 2/3 (67%)

**[✓ PASS] 6.1 — Scannable structure with IDs**
Evidence: Acceptance criteria use prefix codes (NAV-01 through NAV-05, LIST-01 through LIST-13, DETAIL-01 through DETAIL-15, RBAC-01 through RBAC-06, RO-01 through RO-09, PERF/ACC groups). Task breakdown uses phase + task numbering.

**[✓ PASS] 6.2 — Actionable instructions not just descriptions**
Evidence: Phase 2 tasks each specify the exact component, the exact line(s) to change, and the exact code change (e.g., "Gate `useAutoSave` hook: `enabled: !!course && !readOnly`"). Phase 3 task specifies the exact component props to pass.

**[⚠ PARTIAL] 6.3 — Verbosity balance**
Evidence: Story is 440+ lines vs Story 04 at 1051 lines — acceptable size. However, Section 1.2 "Story Context" is long-form narrative that could be compressed into 3 bullet points for a coding agent. The ASCII diagrams in Section 1.5 are helpful for humans but add tokens the dev agent doesn't need for the read-only implementation (since it's reusing existing rendered UI, not designing new visuals).
Impact: Minor. Could shave 15-20% of tokens without losing implementation guidance.
Gap: Not blocking. Consider tightening for dev-agent hand-off if hitting token limits.

---

### Section 7: Cross-Story Context

Pass Rate: 2/2 (100%)

**[✓ PASS] 7.1 — Dependencies on other stories documented**
Evidence: Dependencies section lists Sprint 1.1 RBAC, Epic 02 Story 01 (Course Creation), Epic 02 Story 02 (Content Management), Epic 03 Story 01 (Course Assignment). Section 6.2 explains why Story 05 is separate from Story 04.

**[✓ PASS] 7.2 — Previous-story learnings applied**
Evidence: Technical Notes reference "prior B4 coach scope fix" from Round 1 triage, using the same MongoDB data-fix pattern (`markModified('permissions')` + `save()`). Risks table row on "coach scope check" mirrors the same defense used for the B5 PM scope fix.

---

### Section 8: Status & Approval Gating

Pass Rate: 2/2 (100%)

**[✓ PASS] 8.1 — Status correctly marks net-new scope as needing approval**
Evidence: Line 17 "Status: Proposed — needs PM approval". Dev Agent Record at bottom: "Status: Proposed — needs PM approval before moving to `Draft - Ready for Development`".

**[✓ PASS] 8.2 — Origin traceable**
Evidence: "Origin: QA bug report — 'Coach / Empty Course Folders...' (Round 2 triage, 2026-04-11)". Dev Agent Record cites the exact bug quote and the triage session transcript path.

---

## Failed Items

None.

---

## Partial Items

### 2.6 — Error-shape contracts for frontend consumers

**What's missing:** Example error response JSON bodies for the new `getBalagruhaCourses` endpoint.

**Why it matters:** Without a documented error shape, the dev agent may invent `{error: "..."}` when the rest of the project uses `{success: false, message: "..."}`. The frontend toast code depends on a consistent shape.

**Recommendation:**
```markdown
**Error Responses (examples):**
- 403: `{ "success": false, "message": "Unauthorized: coach can only query their own ID" }`
- 404: `{ "success": false, "message": "Coach not found" }`
- 500: `{ "success": false, "message": "Failed to fetch balagruha courses" }`
```

### 2.7 — Edge case: populated quiz references to inactive/deleted quizzes

**What's missing:** Behavior when `contentItem.quizRef` populate returns `null` (quiz was deleted or never existed).

**Why it matters:** `ContentItemCard` at line 131 currently does `navigate('/admin/quizzes/' + contentItem.quizRef._id + '/edit')` which would crash on `null.quizRef._id`. In read-only mode the coach's Preview button is already disabled for quizzes (per DETAIL-12), but the card still renders the title/icon from `contentItem` fields. Need to verify the card doesn't touch `contentItem.quizRef` in render paths that execute for both admin and coach.

**Recommendation:** Add acceptance criterion:
```
- [ ] **RO-10:** When `contentItem.quizRef` is null (deleted quiz), the card renders with title "Quiz (unavailable)" and no navigation target, both in admin and coach view
```

### 5.6 — Test requirements and coverage target

**What's missing:** Unit test coverage target for `getBalagruhaCourses` and E2E test file location.

**Why it matters:** Without explicit test requirements, the dev agent may ship only manual verification. Story 04 sets the precedent with "Unit tests: 80%+ coverage" + "E2E tests: Full dashboard navigation tested".

**Recommendation:** Add to DoD section:
```
- [ ] Unit tests: 80%+ coverage for `getBalagruhaCourses` controller (balagruha scope filter, dedup, empty state, assignment info aggregation)
- [ ] E2E test: `frontend/tests/e2e/coach-course-browser.spec.js` covering login → navigate → list → drilldown → media preview → quiz disabled state → back navigation
```

### 6.3 — Verbosity balance

**What's missing:** Not blocking — story length is within Story 04's precedent. Optional tightening possible in Section 1.2 and Section 1.5 for token efficiency on dev-agent hand-off.

**Recommendation:** No action required unless hitting dev-agent token limits. The ASCII diagrams are especially valuable for PM/design review; they can stay.

---

## Recommendations

### 1. Must Fix (Critical Failures)

None. No critical issues found.

### 2. Should Improve (Important Gaps)

1. **Add error response examples** to Section 4.1 API spec (5 minutes of writing)
2. **Add RO-10 acceptance criterion** for null `quizRef` edge case (2 minutes)
3. **Add test requirement DoD items** — unit coverage target + E2E test file (3 minutes)

Total remediation: ~10 minutes. Recommended before PM review but not blocking.

### 3. Consider (Minor Improvements)

1. Tighten Section 1.2 Story Context from prose to bullets if token efficiency matters at dev-agent hand-off time
2. Add a one-sentence note in Section 6.1 about how the `useSortable` hook outputs (not the hook call itself) are conditionally applied — already implied but explicit is safer

---

## Verdict

**Story is approval-ready with 10 minutes of minor additions.**

The story passes all critical and regression-safety gates. The 4 partial items are documentation gaps, not implementation blockers. A dev agent picking up this story would successfully implement it — the partial items are "belt and suspenders" for long-term quality and edge-case robustness.

**Recommended next step:** Apply the three "Should Improve" fixes, then hand to PM for approval to move from `Proposed` to `Draft - Ready for Development`.

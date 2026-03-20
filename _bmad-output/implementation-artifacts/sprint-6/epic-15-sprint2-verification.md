# Epic 15: Sprint 2 Verification — LMS E1/E2/E3 Test & Validate

**Status:** backlog
**Sprint:** Sprint 2 Completion
**Stories:** 8 (5 verification + 3 partial completion)
**Estimated Effort:** ~40h
**Source:** Sprint reconciliation report + Epic 14 reassessment (2026-03-20)
**Depends On:** Stable branch created from dev-s2 (done)

## Summary

Sprint 2 (LMS & Communication) is reported 64% complete, but "done" status was assigned via code review and QA discovery — not end-to-end runtime verification against a live environment. This epic validates that Epic 1 (Student Experience), Epic 2 (Admin Course Mgmt), and Epic 3 (Coach Functionality) genuinely work by running dedicated E2E and backend test suites, fixing what breaks, and then completing the partial stories.

**Phase A — Verify what's marked done (Stories 15.1–15.5)**
**Phase B — Complete the partials (Stories 15.6–15.8)**

## Current Test Landscape

### Backend (Solid — 260+ tests, 0 skipped)

| Area | File | Tests | Status |
|------|------|-------|--------|
| Course CRUD | `lms/courseController.test.js` | 40 | Active |
| Quiz engine | `lms/quizController.test.js` | 23 | Active |
| Coin controller | `lms/coinController.test.js` | 23 | Active |
| Student dashboard | `lms/studentDashboardController.test.js` | 18 | Active |
| Content library | `lms/contentController.test.js` | 17 | Active |
| Art course | `lms/artCourseController.test.js` | 17 | Active |
| Computer Apps | `lms/computerAppsController.test.js` | 12 | Active |
| Life Skills | `lms/lifeSkillsController.test.js` | 12 | Active |
| Spoken English | `lms/spokenEnglishController.test.js` | 13 | Active |
| Coach grading | `coachGradingController.test.js` | 13 | Active |
| Coach reports | `coachReportsController.test.js` | 16 | Active |
| Coin service | `services/coin.test.js` | 46 | Active |
| Coin health | `services/coinEconomyHealth.test.js` | 8 | Active |

### E2E (Needs Work — ~65 tests, 46% fixme'd)

| Spec File | Total | Active | Fixme | Risk |
|-----------|-------|--------|-------|------|
| `admin/course-management.spec.js` | 7 | 1 | 6 | HIGH |
| `admin/content-quiz.spec.js` | 13 | 5 | 8 | HIGH |
| `coach/courses-assignments.spec.js` | 7 | 6 | 1 | LOW |
| `coach/grading.spec.js` | 10 | 8 | 2 | LOW |
| `student/courses-quiz.spec.js` | 17 | 8 | 9 | HIGH |
| `student/coin-economy.spec.js` | 9 | 8 | 1 | LOW |
| `student/art-course.spec.js` | 15 | 4 | 11 | HIGH |

## Stories

### Phase A: Verify "Done" Features

| Story | Title | Scope | Effort | Status |
|-------|-------|-------|--------|--------|
| 15.1 | Backend LMS test suite — run all, fix failures | Run 260+ backend tests, fix any failures, verify against live MongoDB Atlas | 4h | backlog |
| 15.2 | E2E Student Experience verification | Un-fixme + fix `student/courses-quiz.spec.js`, `student/coin-economy.spec.js`, `student/art-course.spec.js` — 41 tests across 3 files | 8h | backlog |
| 15.3 | E2E Admin Course Mgmt verification | Un-fixme + fix `admin/course-management.spec.js`, `admin/content-quiz.spec.js` — 20 tests across 2 files | 8h | backlog |
| 15.4 | E2E Coach Functionality verification | Un-fixme + fix `coach/courses-assignments.spec.js`, `coach/grading.spec.js` — 17 tests across 2 files | 4h | backlog |
| 15.5 | Integration smoke test — full LMS journey | Admin creates course → publishes → Coach assigns → Student takes quiz → Coins awarded → Coach grades submission → Coach sees report. Single end-to-end journey test. | 6h | backlog |

### Phase B: Complete Partial Stories

| Story | Title | Sprint 2 Ref | Effort | Status |
|-------|-------|-------------|--------|--------|
| 15.6 | Manual coin award explicit API for coaches | E3 Story 3 (FR23) | 3h | backlog |
| 15.7 | PM error handling — generic → role-specific | E5 Story 5 | 3h | backlog |
| 15.8 | Course reporting — basic → comprehensive analytics | E5 Story 6 (FR21 expansion) | 4h | backlog |

## Execution Strategy

### Dedicated E2E Agent Pattern

Each E2E story (15.2–15.4) should be executed by a **dedicated agent** that:

1. Runs the target spec file(s) against the live environment (backend :5001, frontend :3000)
2. Captures failures — screenshots, error logs, DOM snapshots
3. Categorizes failures: selector drift vs actual bug vs missing data
4. Fixes selector drift in-place
5. Files bugs for actual functional failures
6. Re-runs until green or all failures are documented
7. Reports: tests passed, tests still failing (with root cause), new bugs found

### Backend Test Agent Pattern

Story 15.1 agent:

1. Runs full backend test suite (`npm test` or jest with LMS filter)
2. Captures any failures against live MongoDB Atlas
3. Fixes test environment issues (mocking, connection, seed data)
4. Reports pass/fail summary with any code fixes needed

### Definition of Done

- All 260+ backend LMS tests passing
- All ~65 E2E LMS tests un-fixme'd and either passing or documented as blocked (with ticket)
- Integration smoke test (15.5) passing end-to-end
- Phase B partials implemented with tests
- Sprint status updated to reflect verified state

## Dependencies

- Backend running on :5001 against MongoDB Atlas
- Frontend running on :3000
- Playwright installed and auth storageState files current for all 5 roles
- Seed data present (courses, students, coaches, balagruhas)

## Notes

- Epic 12 (LMS & Coin Economy Fixes) addressed many issues found in QA — those fixes are already merged. This epic verifies the fixes actually work at runtime.
- The 4 deferred items (Artweaver IPC, S3 offline queue, live voice calling, WebSocket coin push) remain in Epic 14 for future work.
- Art course E2E (73% fixme'd) is highest risk — Artweaver IPC is stubbed, so some tests may be legitimately unpassable.

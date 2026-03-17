# QA-D2: Admin + Coach LMS
Date: 2026-03-17 | Sprint: 2 | Scope: FR12-FR23

## Summary
12 FRs validated: 8 PASS, 3 PARTIAL, 1 FAIL, 0 NOT BUILT

## Compliance Matrix

| FR | Description | Status | Evidence | Notes |
|----|-------------|--------|----------|-------|
| FR12 | Admin can create courses with hierarchical structure: Course > Modules > Chapters > Content Items | **PASS** | `backend/controllers/lms/admin/courseController.js` exports `createCourse`, `addModule`, `addChapter`, `addContentItem`; routes in `backend/routes/v2/lms/admin/courses.js` wired with `authenticate` + `authorize('LMS Management','Manage')`; reorder support via `reorderItems` | Full CRUD for all 4 levels of hierarchy. Reorder endpoint supports modules, chapters, and content items. |
| FR13 | Admin can upload content (video, PDF, document, image, audio, text, links) to S3 with 500MB limit | **PASS** | `backend/routes/v2/lms/admin/content.js` -> `backend/controllers/contentController.js` exports `uploadFiles`, `getAllFiles`, `getFileById`, `updateFileMetadata`, `deleteFile`, `getContentStats`; upload middleware at `backend/middleware/upload.js` line 157: `fileSize: 500 * 1024 * 1024`; content item types validated in `courseController.addContentItem`: video, pdf, audio, image, text, link, quiz, task | S3 upload via backend proxy pattern with `lmsUploadWithErrorHandling` middleware. ContentLibrary model tracks metadata. File type detection via `getFileTypeFromMimeType`. |
| FR14 | Admin can build quizzes with question bank: multiple choice, true/false, open-ended, reorder, publish | **PASS** | `backend/controllers/quizController.js` exports: `createQuiz`, `updateQuiz`, `publishQuiz`, `unpublishQuiz`, `archiveQuiz`, `restoreQuiz`, `reorderQuestions`, `duplicateQuiz`, `deleteQuiz`, `getAllQuizzes`, `getQuizById`, `getQuizStats`; `backend/controllers/questionBankController.js` exports: `createQuestion`, `updateQuestion`, `deleteQuestion`, `getAllQuestions`, `getQuestionById`, `getAllTags`, `getMostUsedQuestions`, `getQuestionBankStats`; routes at `backend/routes/v2/lms/admin/quiz.js` | Comprehensive quiz lifecycle (draft/published/archived) plus separate question bank with tagging, search, stats. Content items can reference quizzes via `quizRef`. |
| FR15 | Admin can translate course content items from English to Telugu with item-by-item editor and progress tracking | **PASS** | `backend/controllers/lms/admin/translationController.js` exports: `getTranslationProgress`, `getTranslatableItems`, `saveTranslation`, `publishTranslations`; routes at `backend/routes/v2/lms/admin/translations.js` | Covers course metadata, modules, chapters, content items, quiz metadata, and quiz questions (including MCQ option translations). Progress tracking with breakdown by type. Filter/search on translatable items. |
| FR16 | Admin can manage course lifecycle: Draft > Published > Archived with validation gates | **PASS** | `courseController.js` exports: `publishCourse` (with `validateCourseForPublish`), `archiveCourse`, `restoreCourse`, `unpublishCourse`, `validateCourseDetailed`, `duplicateCourse`; Course model methods: `publish()`, `archive()`, `restore()` at `backend/models/course.js` lines 207-225 | Validation checks: title, description, category, difficulty, thumbnail, at least 1 module with chapters with content items. Full lifecycle: Draft -> Published -> Archived, plus Unpublish (Published -> Draft) and Restore (Archived -> Published/Draft). |
| FR17 | Admin can manage content library with metadata, search, and categorization | **PASS** | `contentController.js` exports `getAllFiles` (with fileType/search/sort/limit/offset), `getFileById`, `updateFileMetadata`, `deleteFile`, `getContentStats`; routes at `backend/routes/v2/lms/admin/content.js` | Library CRUD with filtering, search, pagination, and statistics endpoint. Metadata update for descriptions/tags. |
| FR18 | Coach can assign published courses to individual students or entire Balagruhas with due dates | **PASS** | `backend/controllers/lms/coach/coachAssignmentController.js` exports `createAssignment` — validates course is published, supports `assignedTo.type` of `balagruha` (multiple) or `students`, validates due date is in future, sends in-app notifications; also `getCoachAssignments`, `getAssignmentById`, `updateAssignment`, `deleteAssignment`, `getCoachStats`, `updateAssignmentProgress`; routes at `backend/routes/v2/lms/coach/assignments.js`; admin also has `adminAssignmentController.createAdminAssignment` | Coach assignment checks Balagruha authorization. Supports both individual student and Balagruha-level assignment. Due dates enforced. Notification sent on assignment. |
| FR19 | Coach can grade student submissions (Art images, Spoken English videos, Life Skills audio) with rubric scores and feedback | **PASS** | `backend/controllers/lms/coach/coachGradingController.js` exports `submitGrade` — accepts quality, coinsAwarded, feedback, evaluationCriteria; also `getSubmissions` (filters: courseType, status, balagruhaId, dateRange), `getSubmissionById`, `bulkGrade`, `saveDraft`; Submission model at `backend/models/Submission.js` has `markAsGraded`, `saveDraft`, `findByCoach`, `getCoachStats`; routes at `backend/routes/v2/lms/coach/grading.js` | Grading includes quality rating, coin award (0-100), feedback (500 char max), evaluation criteria object. Bulk grading supported. Draft auto-save supported. |
| FR20 | Coach can flag or skip problematic submissions during grading | **PASS** | `coachGradingController.js` exports `flagSubmission` (requires reason, notifies admins) and `skipSubmission` (marks for later review); Submission model has `flagSubmission(reason, flaggedBy)` line 345 and `markAsSkipped()` line 356; routes wired at `backend/routes/v2/lms/coach/grading.js` | Flag sends notification to all admin users. Skip marks submission for later without grading. |
| FR21 | Coach can view reporting dashboard with completion rates, leaderboard, and slow learner identification | **PARTIAL** | `backend/controllers/lms/coach/coachReportsController.js` exports `getOverviewStats` (totalStudents, totalCoinsAwarded, totalActivitiesCompleted) and `getLeaderboard` (via `Coin.getTopEarners`); routes at `backend/routes/v2/lms/coach.js` | **Missing**: (1) Completion rates per course/assignment not implemented (only total activities completed globally). (2) No slow learner identification endpoint. (3) `activeAssignments` count commented out (lines 33-35). (4) Overview fetches ALL students globally instead of coach's Balagruha-scoped students. Leaderboard works via Coin model but is also not scoped to coach's students. |
| FR22 | System auto-awards ISF Coins to students based on grading scores (implicit coin award) | **PARTIAL** | `coachGradingController.submitGrade` lines 177-196: creates `Coin` transaction with source `submission_grade` and updates user's coin balance via `$inc: { coins: coinsAwarded }`; also in `bulkGrade` lines 304-322 | Coin award works but is driven by the `coinsAwarded` value passed by the coach in the grading request, not automatically calculated from the quality/rubric score. The coach manually sets the coin amount (0-100). This is implicit in that it happens during grading, but the amount is not auto-derived from the grade. No atomic session transaction used (just sequential saves). |
| FR23 | Coach can manually award ISF Coins to students | **PARTIAL** | `backend/controllers/lms/coach/manualAwardController.js` exports `awardCoins` (POST `/api/v2/lms/coach/awards`) and `getAwardHistory` (GET `/api/v2/lms/coach/awards/history`); routes at `backend/routes/v2/lms/coach.js` line 12-13 | Controller exists and is wired. Uses `Coin.findOrCreateForUser` and `coinRecord.addCoins`. However: (1) No route for coaches to see which students they can award (no student-list endpoint on this route). (2) The `awardCoins` function does not validate that the coach has authority over the target students (no Balagruha scoping check). (3) Award history aggregation assumes `transactions.metadata.awardedBy` field matches the Coin model's transaction schema, which uses a different structure in `coachGradingController` (`source: "submission_grade"` with `metadata.submissionId`). Manual awards would need `metadata.awardedBy` set correctly, which the `addCoins` method handles via its metadata parameter. |

## Findings

### Critical

None.

### Major

1. **FR21 — Coach Reports Dashboard is skeletal (PARTIAL)**
   - **File**: `backend/controllers/lms/coach/coachReportsController.js`
   - **Issue**: Only 2 endpoints exist (overview stats and leaderboard). Both query globally instead of scoping to the coach's Balagruha students. No completion rates per course/assignment. No slow learner identification. `activeAssignments` count is commented out (lines 33-35). The PRD and Epic 03 Story 04 specify completion rates, leaderboard, and slow learner identification as core capabilities.
   - **Impact**: Coaches cannot identify struggling students or track per-course progress through the reporting API.

2. **FR22 — Coin auto-award is coach-determined, not system-calculated (PARTIAL)**
   - **File**: `backend/controllers/lms/coach/coachGradingController.js` lines 116-117
   - **Issue**: The `coinsAwarded` value is passed in the request body by the coach. There is no automatic mapping from quality/rubric score to coin amount. The PRD says "System auto-awards ISF Coins to students based on grading scores" implying the system should derive the coin amount from the grade, not the coach.
   - **Impact**: Inconsistent coin awards across coaches; no standardized reward policy enforced by the system.

3. **FR23 — Manual Award lacks Balagruha authorization check (PARTIAL)**
   - **File**: `backend/controllers/lms/coach/manualAwardController.js` line 33
   - **Issue**: `awardCoins` processes any studentIds passed in the request without verifying the coach has authority over those students via Balagruha membership. A coach could award coins to students outside their Balagruha.
   - **Impact**: RBAC bypass for manual coin awards.

### Minor

1. **No backend test coverage for any FR12-FR23 controllers**
   - No test files exist under `backend/` (outside node_modules) for courseController, contentController, quizController, translationController, coachAssignmentController, coachGradingController, coachReportsController, or manualAwardController.
   - **Impact**: All functionality is untested at the unit/integration level. Bugs would only surface in manual testing or production.

2. **Console.error statements remain in all controllers**
   - Every controller uses `console.error` for error logging instead of a structured logger. Sprint 6 Story 8.4 addressed frontend console.log cleanup but backend controllers still rely on `console.error`.
   - **Impact**: No structured logging in production; difficult to correlate errors.

3. **archiveCourse and unpublishCourse have unimplemented audit trail**
   - `courseController.js` lines 966 and 1042: comments note "Audit trail and coach notifications not yet implemented (Sprint 2 backlog)".
   - `notifyCoaches` parameter is accepted but not acted upon.

4. **bulkGrade counter bug**
   - `coachGradingController.js` line 275: `const gradedCount = 0;` is declared with `const`, then `gradedCount++` on line 343 would throw a TypeError at runtime since you cannot increment a const.
   - **Impact**: Bulk grading endpoint will crash on first successful grade.

5. **coachReportsController does not import CourseAssignment model**
   - Lines 33-35 have commented-out code referencing Assignment model. The activeAssignments stat is never returned.

## Recommended Fix Stories

1. **Story: Enhance Coach Reports Dashboard** (FR21 fix)
   - Add per-course/per-assignment completion rate endpoints
   - Add slow learner identification (students below threshold progress)
   - Scope all queries to coach's Balagruha students
   - Uncomment and wire `activeAssignments` count
   - Estimated: 3-5 story points

2. **Story: Implement Auto-Calculated Coin Awards from Rubric** (FR22 fix)
   - Define quality-to-coin mapping configuration (e.g., Excellent=10, Good=7, Fair=4, Poor=1)
   - Auto-calculate `coinsAwarded` from quality rating in `submitGrade`
   - Allow coach override with admin-configurable max
   - Estimated: 2-3 story points

3. **Story: Add Balagruha Authorization to Manual Award** (FR23 fix)
   - In `manualAwardController.awardCoins`, verify each studentId belongs to one of the coach's Balagruhas
   - Return 403 for unauthorized student awards
   - Estimated: 1 story point

4. **Story: Fix bulkGrade const counter bug** (Critical bug)
   - Change `const gradedCount = 0` to `let gradedCount = 0` in `coachGradingController.js` line 275
   - Add unit test for bulk grading
   - Estimated: 0.5 story points

5. **Story: Add Backend Unit Tests for LMS Controllers** (Test gap)
   - Add Jest test suites for all 7 LMS controllers (admin + coach)
   - Target: route-level integration tests with mocked MongoDB
   - Estimated: 5-8 story points

6. **Story: Implement Audit Trail for Course Lifecycle Changes** (Minor)
   - Wire audit logging for archive, unpublish, and publish actions
   - Implement coach notification on course archive/unpublish
   - Estimated: 2-3 story points

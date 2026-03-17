# QA-D1: Student LMS + Coin Economy
Date: 2026-03-17 | Sprint: 2 | Scope: FR1-FR11, FR32-FR35

## Summary
15 FRs validated: 8 PASS, 4 PARTIAL, 0 FAIL, 3 NOT BUILT

## Compliance Matrix

| FR | Description | Status | Evidence | Notes |
|----|-------------|--------|----------|-------|
| FR1 | Student can view course categories on homepage after login | **PASS** | `frontend/src/pages/student/StudentDashboardPage.jsx` renders 4 course category cards (Computer Apps, Art, Spoken English, Life Skills) via `CourseCategoryCard` component. Backend `studentDashboardController.getDashboard` returns published courses aggregated by category. Route wired at `GET /api/v2/lms/student/:studentId/dashboard`. | Dashboard fetches real data from DB. Offline caching via localStorage implemented. 30s polling interval. |
| FR2 | Student can navigate Computer Apps courses with three-pane layout | **PASS** | `frontend/src/pages/student/ComputerAppsPage.jsx` implements sidebar (modules/chapters) + main grid (content cards). Backend `computerAppsController.getComputerApps` returns apps list; `getCourseHierarchy` returns full Module > Chapter > ContentItem hierarchy with progress tracking. | Layout is sidebar+grid rather than the original MPSD three-column (apps>levels>tasks), but functionally equivalent. Content types supported: video, quiz, text/PDF, audio, image. |
| FR3 | Student can see task progress with color-coded indicators | **PASS** | `computerAppsController.getCourseHierarchy` returns `isCompleted` per content item. Frontend renders green CheckCircle icons on completed items. `AppCard` component shows progress percentage. | Color-coded status indicators are green checkmarks (completed) vs. default (not started). Half-green/in-progress state is represented by progress percentage bar rather than color coding on individual tasks. |
| FR4 | Student can launch external tools/activities from task items | **PARTIAL** | `ComputerAppsPage.jsx` `handleLaunchContent()` opens video modal, PDF viewer, quiz navigation, audio player, and image viewer for in-app content. No Electron IPC for external tool launch (Tux Typing, GCompris). | External tool launch requires Electron desktop wrapper which is not present in the current web SPA deployment. In-app content launch works fully. This is an expected limitation documented in the MPSD. |
| FR5 | Student can record and submit spoken English videos via webcam | **PASS** | `frontend/src/pages/student/SpokenEnglishPage.jsx` implements full WebRTC workflow: `requestWebcamAccess()` via `getUserMedia`, `startRecording()` with MediaRecorder API (vp9/webm), stop, preview via `WebcamPreview` component, re-record via `RedoModal`, and submit via `handleSubmit()`. Backend `spokenEnglishController.submitVideoRecording` creates Submission record. | S3 upload is mocked (`mockS3Url`); actual file stored locally/in-memory. The upload-to-S3 integration point is stubbed but the full record/preview/re-record/submit workflow is complete. |
| FR6 | Student can record and submit Life Skills voice responses via press-and-hold (60s limit) | **PASS** | `frontend/src/pages/student/LifeSkillsVoiceTaskPage.jsx` implements WhatsApp-style press-and-hold recording: `onMouseDown={startRecording}` / `onMouseUp={stopRecording}` with touch support. Max duration enforced at `task.maxRecordingDuration` (default 60s). `WaveformVisualizer` component renders during recording. Playback preview, re-record, and submit all implemented. Backend `lifeSkillsController.submitVoiceRecording` saves Submission. | S3 upload is mocked. Min 3-second recording enforced on frontend. Audio format: webm/ogg. |
| FR7 | Student can take quizzes with multiple question types and see pass/fail results | **PASS** | `frontend/src/pages/student/StudentQuizPage.jsx` is a generic quiz page supporting both Life Skills and Computer Apps contexts. Supports MCQ with radio buttons, true/false (auto-generates options if missing), progress indicator, audio enforcement for audio questions. `StudentQuizResults.jsx` shows results. Backend: `computerAppsController.submitQuiz` and `lifeSkillsController.submitQuiz` both grade answers, calculate score, determine pass/fail against `quiz.minScore` (default 60%), and return breakdown. | Max attempts enforced (default 3). Results show per-question breakdown with correct answers and explanations. Delayed feedback (results only after full completion) is implemented -- no instant per-question feedback. |
| FR8 | Student can view ISF Coin balance in persistent Title Bar, updated in real-time on earning | **PASS** | `frontend/src/components/student/TitleBar.jsx` displays coin balance with 2-second polling interval (`setInterval(fetchCoinBalance, 2000)`). Clickable to open `TransactionHistoryModal`. Offline fallback from localStorage cache. Backend `studentDashboardController.getCoinBalance` queries `Coin.findOne({ userId: studentId })`. | Polling-based, not WebSocket push. 2-second interval matches Story 06 acceptance criteria. Milestone celebrations at 100/500/1000/5000 via `useMilestones` hook and `MilestoneCelebrationModal`. |
| FR9 | Student can view transaction history showing coins earned per activity | **PASS** | `TitleBar.jsx` opens `TransactionHistoryModal` on coin balance click. `CoinBalanceContext.js` provides balance state. `coinController.getUserTransactionHistory` returns paginated, filterable transactions with type/source/date filters and summary (totalEarned, totalSpent, currentBalance). CSV export also available via `exportTransactionHistory`. | Transaction history is comprehensive: filtering by type, source, date range; pagination; summary stats. Each transaction records type, amount, description, source, and metadata. |
| FR10 | System resumes incomplete tasks from previous sessions (offline caching) | **PARTIAL** | `StudentDashboardPage.jsx` caches dashboard data to `localStorage` on fetch (`localStorage.setItem('cachedDashboardData', ...)`). `TitleBar.jsx` caches coin balance. Dashboard shows `ResumeActivityCard` with last activity data (courseType, taskTitle, progress). Art course mode saved to localStorage. | Offline caching is browser-based (localStorage), NOT SQLite as specified in MPSD. Resume card shows last activity but `taskId` is null in backend response (placeholder comment: "Could find actual last item if needed"). No offline submission queue implemented (specified in Stories 03-05). |
| FR11 | Art course provides canvas/drawing submission interface (Artweaver IPC stubbed for Electron) | **PARTIAL** | `frontend/src/pages/student/ArtCoursePage.jsx` renders 4 modes (Workshops, Free Sketch, Art Stories, Competition) with mode pill navigation. Backend `artCourseController.getArtCourseData` fetches Art category courses. `submitArtwork` and `saveToGallery` endpoints exist but return mock responses (mock S3 URLs, no actual file storage). Frontend shows Artweaver info banner: "Full Artweaver integration with real-time canvas mirroring requires Electron environment." | Art is a MOCK implementation. No actual canvas/drawing interface exists in any mode. `submitArtwork` returns hardcoded mock URLs. `saveToGallery` returns hardcoded mock URLs. Competition model and gallery model are noted as "not yet implemented" in code comments. Workshops and Art Stories pull from Course DB but Free Sketch and Competition are empty shells. |
| FR32 | Students earn coins automatically on quiz pass and coach grading | **PASS** | Quiz pass: `computerAppsController.submitQuiz` lines 401-413 call `Coin.findOrCreateForUser(studentId)` then `coinRecord.addCoins(baseCoins, 'earned', ...)` with source 'task'. Also updates `User.coins` field. `lifeSkillsController.submitQuiz` has identical coin award logic (lines 538-564). Coach grading: `backend/controllers/lms/coach/coachGradingController.js` exists. Duplicate-pass prevention: both controllers check `alreadyPassed` before awarding coins. | Coins awarded only on first pass (prevents farming). Both quiz controllers award coins atomically via Coin model `addCoins()` method. Coin model validates balance >= 0 and logs transaction with source/metadata. Note: `addCoins` uses `this.save()` (not `mongoose.startSession()`), so no true atomic transactions per NFR14. |
| FR33 | Coin balance displayed in real-time on student Title Bar | **PASS** | See FR8 evidence. TitleBar polls every 2 seconds. `coinController.getUserBalance` sets `Cache-Control: no-store, no-cache` headers to prevent stale data. | Duplicates FR8 scope. Both the dashboard-specific coin endpoint (`/api/v2/lms/student/:studentId/coins`) and the auth-scoped coin endpoint (`/api/v1/coin/balance` via coinController) exist. TitleBar uses the v2 student-scoped endpoint. |
| FR34 | Transaction history tracks all earn events with source (quiz, grading, manual) | **PARTIAL** | Coin model `transactions` array tracks type (earned/spent/bonus/etc.), amount, description, source (wtf/task/attendance/etc.), and metadata. Quiz submissions log with source='task' and metadata containing quizId/courseId. However, source enum does NOT include 'grading' or 'manual' -- coach grading coins would be logged as 'task' source. No dedicated 'grading' or 'manual' source type exists. | Sources tracked: wtf, attendance, task, medical, sports, music, general, shop. LMS quiz and grading both use 'task'. The transaction description distinguishes ("Quiz Completed: X") but source-level filtering cannot differentiate quiz-pass from coach-grading awards. Manual award source would be 'general' if used. |
| FR35 | Coin earning velocity trackable as engagement metric | **PARTIAL** | `Coin` model tracks `weeklyStats.coinsEarned` and `monthlyStats.coinsEarned` with auto-reset logic. `coinController.getTopEarners` provides leaderboard by period (weekly/monthly). `coinController.getUserCoinStats` returns weekly/monthly stats. However, there is no dedicated "velocity" metric (coins/day, coins/week trend over time). The weekly/monthly stats reset rather than accumulate history. | Weekly/monthly earning totals exist but reset on period boundary -- no historical velocity tracking. Top earners endpoint works for leaderboard but does not expose per-student velocity trends. An admin could approximate velocity from transaction timestamps, but no API endpoint computes it directly. |

## Findings

### Critical

1. **No backend tests for any Sprint 2 student LMS controllers.** Zero test files exist for `studentDashboardController`, `computerAppsController`, `artCourseController`, `spokenEnglishController`, `lifeSkillsController`, or `coinController` (backend-level). The `backend/` directory contains no project-authored test files at all (only `node_modules` test files). This is a critical quality gap for a production LMS.

2. **Quiz submitQuiz writes debug logs to filesystem.** `computerAppsController.submitQuiz` writes to `quiz_debug.log` and `quiz_crash.log` via `fs.appendFileSync` in the controller itself (lines 243-248, 455-458). This is a production hazard: unbounded file growth, potential disk fill, and information leak (logs contain student IDs, quiz IDs, scores).

3. **Coin award is NOT atomic (NFR14 violation).** The `addCoins()` method on the Coin model uses `this.save()` without `mongoose.startSession()` / transactions. The quiz submit controllers also call `User.findByIdAndUpdate` to increment `User.coins` separately. If either operation fails, the Coin record and User record can become inconsistent. PRD NFR14 requires "atomic transactions for earn/spend operations."

### Major

4. **Art course is a MOCK implementation (FR11).** The `artCourseController.submitArtwork` and `saveToGallery` methods return hardcoded mock S3 URLs. No actual file upload or storage occurs. The frontend has no canvas/drawing interface -- only mode selection pills and course listings. Competition and Gallery models are explicitly marked "not yet implemented." The "Artweaver integration" info banner confirms this is known.

5. **S3 upload is mocked across ALL student submission endpoints.** `spokenEnglishController.submitVideoRecording` (line 252), `lifeSkillsController.submitVoiceRecording` (line 241), and `artCourseController.submitArtwork` (line 148) all generate mock S3 URLs rather than performing actual uploads. The `SpokenEnglishPage.jsx` frontend even adds an artificial 2-second delay (`await new Promise(resolve => setTimeout(resolve, 2000))`) to simulate upload time.

6. **Homework count is hardcoded.** `studentDashboardController.getPendingHomeworkCount` returns a hardcoded `count: 3` (line 222) with comment "Placeholder homework count (Epic 05 not yet implemented)."

7. **`lastActivity.taskId` is always null.** In `studentDashboardController.getDashboard`, the `lastActivity` object sets `taskId: null` with comment "Could find actual last item if needed" (line 90). This means the "Resume Activity" card in the dashboard cannot deep-link to the actual last incomplete task.

### Minor

8. **Debug data leaking in API responses.** `computerAppsController.getComputerApps` returns `debug: progressRecords` in the response (line 61). `computerAppsController.submitQuiz` returns `debug: debugInfo` (line 452). These should be removed for production.

9. **Duplicate `passed` property in lifeSkillsController.submitQuiz response** (line 584): `passed, passed,` -- harmless but indicates copy-paste oversight.

10. **CoinBalanceContext fetches balance once on mount without polling.** The `CoinBalanceContext.js` (Sprint 5 addition) fetches only once on mount and relies on manual `refreshBalance()` calls. Meanwhile, `TitleBar.jsx` has its own separate 2-second polling loop. These two coin balance sources could show different values depending on timing.

11. **No RBAC enforcement on student-scoped endpoints.** The dashboard routes use `authenticate` middleware but do not verify that the authenticated user's ID matches the `:studentId` parameter. A student could theoretically query another student's dashboard, coin balance, or progress.

## Recommended Fix Stories

### S2-FIX-01: Art Course Real Implementation (FR11)
**Priority:** Major | **Effort:** 8-10h
- Implement actual canvas/drawing interface (HTML5 Canvas or fabric.js) for Free Sketch mode
- Wire artwork upload to S3 (replace mock URLs)
- Implement Competition and Gallery data models
- Decide: defer Artweaver IPC to Electron milestone or build web-based alternative

### S2-FIX-02: Wire S3 Upload for Submissions (FR5, FR6, FR11)
**Priority:** Major | **Effort:** 4-6h
- Replace mock S3 URLs in `spokenEnglishController.submitVideoRecording`, `lifeSkillsController.submitVoiceRecording`, and `artCourseController.submitArtwork`
- Use existing S3 upload infrastructure (already used by admin content management)
- Remove artificial upload delay from `SpokenEnglishPage.jsx`

### S2-FIX-03: Atomic Coin Transactions (NFR14)
**Priority:** Critical | **Effort:** 3-4h
- Wrap `addCoins()` + `User.findByIdAndUpdate` in `mongoose.startSession()` with transaction
- Add rollback on failure
- Apply to both `computerAppsController.submitQuiz` and `lifeSkillsController.submitQuiz`

### S2-FIX-04: Remove Debug/Production Hazards
**Priority:** Critical | **Effort:** 1-2h
- Remove `fs.appendFileSync` debug logging from `computerAppsController.submitQuiz`
- Remove `debug: progressRecords` from `getComputerApps` response
- Remove `debug: debugInfo` from `submitQuiz` response
- Fix duplicate `passed` property in lifeSkillsController

### S2-FIX-05: Backend Test Coverage for Student LMS
**Priority:** Critical | **Effort:** 12-16h
- Create unit tests for all 5 student controllers
- Create unit tests for Coin model methods (`addCoins`, `spendCoins`, `findOrCreateForUser`)
- Create integration tests for quiz submission + coin award flow
- Target: 80% coverage per Quality Gate 7.3

### S2-FIX-06: RBAC Enforcement on Student Endpoints
**Priority:** Major | **Effort:** 2-3h
- Add middleware to verify `req.user.id === req.params.studentId` on all student-scoped routes
- Or refactor to use `req.user.id` directly instead of URL param (removes the vulnerability entirely)

### S2-FIX-07: Fix Resume Activity Deep-Link (FR10)
**Priority:** Minor | **Effort:** 1-2h
- In `studentDashboardController.getDashboard`, resolve `lastActivity.taskId` from the most recent `completedItems` entry
- Enables the `ResumeActivityCard` to navigate directly to the last incomplete task

### S2-FIX-08: Add Coin Earning Velocity API (FR35)
**Priority:** Minor | **Effort:** 3-4h
- Add endpoint to compute coins earned per day/week over a configurable time window
- Store historical weekly totals before resetting (or derive from transaction timestamps)
- Expose as engagement metric for admin reporting

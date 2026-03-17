# QA-D3: Communication + Gap Documentation
Date: 2026-03-17 | Sprint: 2 | Scope: FR24-FR35

## Summary
12 FRs validated: 4 PASS, 2 PARTIAL, 1 FAIL, 5 NOT BUILT

## Compliance Matrix

| FR | Description | Status | Evidence | Notes |
|----|-------------|--------|----------|-------|
| FR24 | In-app notifications (personal, common, system) with badge counts and read tracking | **PASS** | `backend/controllers/notificationController.js` — getUserNotifications, getUnreadCount, markAsRead, markAllAsRead, deleteNotification, createSystemAnnouncement. `backend/services/notification.js` — NotificationService with createPersonalNotification, createCommonNotification, createSystemWideNotification, getUserNotificationsSmart, getSmartUnreadCount. `frontend/src/components/student/TitleBar.jsx` — fetchNotificationCount fetches unread count and renders bell icon. | Full CRUD notification system implemented. Supports personal, common, system-wide, and shop update notification types. Smart filtering based on last-viewed time. Admin endpoints for system announcements and personal notifications. Coach can send message notifications. |
| FR25 | Admin can send broadcast messages ("Mann ki Baat") as WTF pin category | **PASS** | `backend/models/wtfPin.js` — `isOfficial: Boolean`, `officialCategory: { enum: ["mann-ki-baat", "op-ed", "isf-updates", null] }`. `frontend/src/components/wtf/CreateNewPinModal.js` — `isAdminMannKiBaat` flag controls recording (bypasses 59s limit for admin). `backend/controllers/wtfWebSocketController.js` — `broadcastMessage` endpoint. `backend/routes/v1/websocket.js` — `/broadcast` admin-only route. `backend/scripts/test-official-content.js` — test script creates Mann Ki Baat pins. | Mann ki Baat implemented as WTF pin with `isOfficial=true` and `officialCategory="mann-ki-baat"`. Admin can create audio/text pins. WebSocket broadcast route exists for admin-only real-time push. |
| FR26 | Voice recording upload infrastructure (no live calling) | **PARTIAL** | `backend/controllers/wtfController.js:956` — `submitVoiceNote` endpoint. `backend/services/wtf.js:1313` — `submitVoiceNote` service with S3 upload via `uploadWtfVoiceNote`. `backend/services/aws/s3.js:174` — `uploadWtfVoiceNote` stores to `wtf/voice-notes/` S3 path. `frontend/src/components/wtf/CreateNewPinModal.js` — WhatsApp-style press-and-hold recording with mouse handlers. `frontend/src/pages/student/LifeSkillsVoiceTaskPage.jsx` — WhatsApp-style press-and-hold voice recording with waveform. `frontend/src/api/wtf.js:268` — `submitVoiceNote` API call. | Voice recording/upload works for WTF submissions and Life Skills tasks. S3 storage infrastructure in place. However, no standalone `VoiceRecorder.jsx` reusable component as spec'd — recording logic is embedded in WTF CreateNewPinModal and LifeSkillsVoiceTaskPage. No dedicated voice note API (`/api/v2/voice-notes/*`). No live calling infrastructure at all. |
| FR27 | WhatsApp notifications when Admin publishes daily schedule | **NOT BUILT** | Searched entire codebase for "whatsapp" — only found: (1) a commented-out line in `backend/models/medicalCheckIns.js:154` (`// whatsappNotificationSent`), (2) UI comments referencing "WhatsApp-style" recording UX in `CreateNewPinModal.js` and `LifeSkillsVoiceTaskPage.jsx`. No WhatsApp API integration, no Twilio/360dialog SDK, no WhatsApp group number storage, no schedule auto-send, no retry queue. | Zero implementation. The "WhatsApp" references in code are purely about mimicking the WhatsApp-style press-and-hold UX pattern for voice recording — not actual WhatsApp integration. |
| FR28 | Amma can self-register with Admin approval | **NOT BUILT** | Searched `backend/controllers/` for "amma" — 0 results. No `ammaQueryController.js`, no `ammaPerformanceController.js`, no `ammaWellBeingController.js`, no `ammaDashboardController.js`. No `/api/v2/amma/*` routes. No `RegistrationRequests` model. No `frontend/src/components/amma/` directory. The `amma` role exists in the RBAC system (Sprint 1.1) but has zero dedicated features. | Role exists in RBAC but no self-registration flow, no approval workflow, no Amma-specific UI or API endpoints. |
| FR29 | Amma query management with categorization and tracking | **NOT BUILT** | No `Query` model (as spec'd in Epic 04). No `ammaQueryController.js`. No reclassify, reassign, multi-tag, or escalation endpoints. No query history log. No `/api/v2/amma/queries/*` routes. | Complete absence of query management system. |
| FR30 | Auto-reassignment of unresolved queries based on SLA timers | **NOT BUILT** | No `slaMonitorJob.js` cron job. No `slaReassignmentService.js`. No SLA fields in any model. No `backend/jobs/` directory with SLA-related files. No round-robin reassignment logic. No SLA breach notifications. | Complete absence of SLA infrastructure. |
| FR31 | Amma dedicated dashboard matching client UI mockups | **NOT BUILT** | No `AmmaDashboard.jsx`. No `frontend/src/components/amma/` directory. No Amma-specific pages. No well-being insights endpoint. No SLA timer component. No priority query list. | Complete absence of Amma dashboard UI. |
| FR32 | Students earn coins automatically on quiz pass and coach grading | **PASS** | `backend/controllers/lms/student/computerAppsController.js:407` — `await coinRecord.addCoins(baseCoins, 'earned', 'Quiz Completed: ${quiz.title}', 'task', meta)`. `backend/controllers/lms/coach/coachGradingController.js:116` — `coinsAwarded` field in grading request body. `backend/services/coin.js` — CoinService with `awardPinCreationCoins`, `awardSubmissionApprovalCoins`, `awardInteractionCoins`. `backend/services/wtf.js:2707` — `awardCoinsForPinnedContent`, `awardMilestoneCoins`. | Auto-award on quiz completion confirmed in computerAppsController. Coach grading passes `coinsAwarded` amount. CoinService handles multiple award types (pin creation, submission approval, interaction). |
| FR33 | Coin balance displayed in real-time on student Title Bar | **PASS** | `frontend/src/components/student/TitleBar.jsx:44` — `fetchCoinBalance` calls `/api/v2/lms/student/${studentId}/coins` and renders balance. Offline caching via `cachedCoinBalance` in localStorage. `TitleBar.handleOnline` re-fetches on reconnect. | Balance displayed in TitleBar with offline fallback. No WebSocket real-time push — relies on fetch-on-mount and online/offline events. |
| FR34 | Transaction history tracks all earn events with source | **PARTIAL** | `backend/controllers/coinController.js` — `getUserTransactionHistory` (line 142), `getWtfTransactionHistory` (line 294), `getAllTransactions` (line 559), `exportTransactionHistory` (line 217). `backend/controllers/profileController.js:104` — `fetchCoinData` aggregates transactions by type (`earned`, `bonus`, `wtf_pin_creation`, `wtf_submission_approval`, `wtf_interaction`, `spent`). `backend/routes/v1/coin.js` — routes for user and admin coin endpoints. | Transaction history API exists with type-based filtering. However, sources tracked are primarily WTF-related (`wtf_pin_creation`, `wtf_submission_approval`, `wtf_interaction`) plus generic `earned`/`bonus`. The PRD specifies tracking "quiz, grading, manual" sources — quiz awards use generic `earned` type rather than a distinct `quiz_pass` or `grading` source type. Manual coach awards have a separate controller (`manualAwardController.js`) but its integration is partial (as noted in PRD FR23). |
| FR35 | Coin earning velocity trackable as engagement metric | **FAIL** | `backend/controllers/coinController.js` — `getUserCoinStats` (line 77) and `getTopEarners` (line 365) exist. `backend/controllers/profileController.js` — `fetchCoinData` calculates `weeklyStats` and `monthlyStats`. However, no dedicated earning velocity metric (coins/day, coins/week trend, acceleration). No admin analytics dashboard for coin earning velocity across students/Balagruhas. `backend/controllers/analyticsController.js` exists but has 0 symbols (empty/stub). | Basic stats exist (weekly/monthly aggregates, top earners) but no earning velocity metric as an engagement KPI. The analyticsController is a stub with no implementation. No admin reporting view for coin engagement trends. |

## Findings

### Critical

1. **Epic 04 (Amma Role Enhancement) — 100% NOT BUILT (FR28-FR31)**
   - Zero Amma-specific code exists in the entire codebase. No controllers, no routes, no models, no frontend components.
   - The `amma` role exists in RBAC from Sprint 1.1, but has no dedicated functionality.
   - Affected stories: SPRINT2-EPIC04-STORY01 through STORY04 (4 stories, estimated 20-25 hours).
   - Files that should exist but do not:
     - `backend/controllers/ammaQueryController.js`
     - `backend/controllers/ammaPerformanceController.js`
     - `backend/controllers/ammaDashboardController.js`
     - `backend/controllers/ammaWellBeingController.js`
     - `backend/services/slaReassignmentService.js`
     - `backend/jobs/slaMonitorJob.js`
     - `frontend/src/components/amma/` (entire directory)

2. **WhatsApp Integration — 100% NOT BUILT (FR27)**
   - No WhatsApp Business API integration (no Twilio, no 360dialog).
   - No WhatsApp group number storage per Balagruha.
   - No schedule auto-send (Monday 8:00 AM).
   - No retry queue. No success/failure logging.
   - Affected story: SPRINT2-EPIC05-STORY04 (estimated 6-8 hours).

### Major

3. **Voice Communication Infrastructure — PARTIAL, no reusable component (FR26)**
   - Voice recording works but only within WTF (CreateNewPinModal) and Life Skills (LifeSkillsVoiceTaskPage).
   - No standalone reusable `VoiceRecorder.jsx` component as spec'd in Epic 05 Story 02.
   - No dedicated `/api/v2/voice-notes/*` endpoints (get-upload-url, create record).
   - No `VoiceNote` MongoDB model.
   - No cross-role voice communication (Amma voice responses, Coach feedback voice notes).
   - No live calling infrastructure.

4. **Coin Earning Velocity Not Trackable (FR35)**
   - `analyticsController.js` is an empty stub (0 symbols).
   - No velocity metric computation (coins/time-period trend).
   - Basic weekly/monthly stats exist in profile data, but no admin-facing engagement dashboard.

### Minor

5. **Transaction Source Granularity (FR34)**
   - Quiz pass coins recorded as generic `earned` type rather than `quiz_pass`.
   - Grading coins passed via `coinsAwarded` field but source type not specifically `grading`.
   - Makes it harder to filter/analyze earn sources as PRD intended.

6. **Notification System Missing Toast UI (FR24)**
   - Backend notification system is comprehensive (personal, common, system).
   - Frontend has TitleBar bell icon with unread count.
   - However, no `Toast.jsx` / `ToastContainer.jsx` components for temporary auto-dismiss notifications as specified in Epic 05 Story 01.
   - No `ToastContext` / `useToast` hook.

## Cross-Reference: FR32-FR35 (ISF Coin Economy)

No QA-D1 report was found in `_bmad-output/implementation-artifacts/qa-validation/`. The coin-related FRs are validated above for the first time in this QA-D3 report.

- **FR32 (auto-awards): PASS** — Quiz completion and grading both trigger coin awards.
- **FR33 (balance display): PASS** — TitleBar shows balance, fetches from `/api/v2/lms/student/:id/coins`.
- **FR34 (transaction history): PARTIAL** — APIs exist but source types lack granularity.
- **FR35 (earning velocity): FAIL** — No velocity metric; analyticsController is empty stub.

## Recommended Fix Stories

| Priority | Story | Effort Estimate | Dependencies |
|----------|-------|-----------------|-------------|
| P1 | Build Amma self-registration + admin approval (FR28) | 5-6 hours | RBAC (exists) |
| P1 | Build Amma query management system — model, CRUD APIs, categorization (FR29) | 6-8 hours | FR28 |
| P1 | Build SLA timer + auto-reassignment cron job (FR30) | 6-8 hours | FR29 |
| P1 | Build Amma dashboard UI with query list + well-being insights (FR31) | 4-6 hours | FR29, FR30 |
| P2 | WhatsApp Business API integration for schedule notifications (FR27) | 6-8 hours | External API key |
| P2 | Extract reusable VoiceRecorder component + dedicated voice note API (FR26) | 4-5 hours | Existing S3 infra |
| P3 | Add coin earning velocity analytics to analyticsController (FR35) | 3-4 hours | Coin data (exists) |
| P3 | Add distinct coin source types for quiz/grading (FR34) | 2-3 hours | CoinService (exists) |
| P3 | Build Toast notification UI (ToastContainer, ToastContext) (FR24 gap) | 2-3 hours | Notification service (exists) |

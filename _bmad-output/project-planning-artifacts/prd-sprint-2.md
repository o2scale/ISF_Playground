---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation-skipped
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
status: complete
completedAt: '2026-03-16'
inputDocuments:
  - docs/Sprint 2 MPSD.md
  - docs/epics/sprint2/sprint-2-epic-01-lms-student-experience.md
  - docs/epics/sprint2/sprint-2-epic-02-lms-admin-course-management.md
  - docs/epics/sprint2/sprint-2-epic-03-lms-coach-functionality.md
  - docs/epics/sprint2/sprint-2-epic-04-amma-role-enhancement.md
  - docs/epics/sprint2/sprint-2-epic-05-system-wide-features.md
  - _bmad-output/project-planning-artifacts/product-brief-ISF_Playground-2026-03-15.md
  - _bmad-output/sprint-reconciliation-report.md
  - _bmad-output/database-architecture.md
  - project-context.md
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 9
classification:
  projectType: web_app
  domain: edtech
  complexity: medium
  projectContext: brownfield
workflowType: 'prd'
sprintScope: 'Sprint 2 — LMS & Communication'
retroactive: true
implementationStatus: '64% complete (16/25 implemented, 6 partial, 3 not built)'
---

# Product Requirements Document - ISF_Playground

**Author:** Dev
**Date:** 2026-03-16
**Sprint:** 2 — LMS & Communication (Retroactive)
**MPSD Reference:** `docs/Sprint 2 MPSD.md` (1,066 lines, Version 2.0 Final, August 19, 2025)

## Executive Summary

Sprint 2 introduced the Learning Management System (LMS), ISF Coin reward integration, and communication features to ISF Playground. Built on the Sprint 1/1.1 foundation (auth, RBAC, Balagruha management), Sprint 2 delivered the core educational capability: course creation, content management, quiz engine, translation module, student dashboards, coach grading, and the Wall of Fame gamification system.

**Implementation status (verified March 2026):** 64% fully implemented (16/25 stories), 24% partial (6/25), 12% not built (3/25). The MPSD defined 5 epics with 25 stories. All LMS admin course management (Epic 2) and most student experience (Epic 1) and coach functionality (Epic 3) were built. **Amma role features (Epic 4) were NOT built** — the role exists in the system but has zero dedicated features. **WhatsApp integration was NOT built.**

**What's complete:** Student homepage with offline caching, Computer Apps course interaction, Spoken English video recording, Life Skills voice responses, ISF Coin wallet with auto-awards, admin course builder (Modules → Chapters → Content Items), content management with S3 upload, quiz/assessment engine, translation module (EN→Telugu), course publishing lifecycle, coach assignments, coach grading (Art/Audio/Video), coach reporting, notification center, Mann ki Baat broadcasts.

**What's remaining (for Sprint 2 completion):** Amma query management, Amma SLA task management with auto-reassignment, Amma dashboard, WhatsApp API integration, explicit manual coin award API for coaches, live voice calling, comprehensive course reporting/analytics.

## What Makes This Special

Sprint 2 transformed ISF Playground from a management platform into an **education delivery platform**. The LMS supports 4 distinct course types — each with unique interaction patterns:

1. **Computer Apps** — External tool integration, task tracking, progress visualization
2. **Art** — Canvas/drawing submission with Artweaver IPC integration (stubbed for Electron)
3. **Spoken English** — Webcam video recording with WebcamPreview component
4. **Life Skills** — WhatsApp-style press-and-hold voice recording (60s limit), MCQ quizzes

The ISF Coin integration creates a **closed-loop engagement system**: students earn coins through course completion and quiz passing → coins are visible in their wallet → coins are spendable in the ISF Shop (Sprint 5). This feedback loop is what makes ISF Playground's approach to children's education unique.

## Project Classification

| Dimension | Value |
|-----------|-------|
| **Project Type** | Web Application (MERN stack SPA) |
| **Domain** | EdTech — LMS with gamification for children's welfare |
| **Complexity** | Medium-High (4 course types, quiz engine, translation, coin economy) |
| **Project Context** | Brownfield — retroactive documentation, 64% implemented |
| **Sprint Scope** | LMS + Communication (5 epics, 25 stories) |
| **Sprint Status** | 64% complete — Amma and WhatsApp not built |

## Success Criteria

### User Success

- **Student (Ravi)** can navigate course categories, complete quizzes, record spoken English videos, record life skills voice responses, and see ISF Coins accumulate in his wallet.
- **Coach (Priya)** can assign courses to students/Balagruhas, grade Art/Audio/Video submissions with rubrics, view student progress dashboards, and see leaderboard rankings.
- **Admin (Amit)** can create courses with module/chapter/content hierarchy, upload content to S3, build quizzes with question banks, translate content EN→Telugu, and publish/archive courses.
- **Amma (Kamala)** — ROLE EXISTS but has NO dedicated features. Query management, SLA tasks, and Amma dashboard were NOT built. *(Remaining for Sprint 2 completion)*

### Business Success

- **Education delivery operational** — ISF can assign and track structured learning across Balagruhas
- **Engagement measurable** — Coin earning velocity, quiz pass rates, course completion rates available as metrics
- **Bilingual content** — Translation module enables EN→Telugu content delivery
- **Coach productivity** — Grading interface handles Art/Audio/Video submissions efficiently

### Technical Success

| Metric | Target | Actual Status |
|--------|--------|---------------|
| Course types supported | 4 (Computer Apps, Art, Spoken English, Life Skills) | 4 implemented (Art Artweaver IPC stubbed) |
| Course builder | Full hierarchy (Module→Chapter→Content) | Complete |
| Quiz engine | Multiple question types, passing criteria | Complete |
| Translation module | EN→Telugu item-by-item | Complete with progress tracking |
| Coin auto-awards | On quiz pass / grading | Complete |
| Student dashboard | Offline caching, course navigation | Complete |
| Coach grading | Art/Audio/Video with rubrics | Complete |
| Notification center | Personal/common/system, read tracking | Complete |
| Amma features | Query mgmt, SLA, dashboard | NOT BUILT |
| WhatsApp integration | API notifications | NOT BUILT |

## User Journeys

### Journey 1: Ravi — The Student Learning Computer Apps

**Opening Scene:** Ravi logs in via facial recognition. His dashboard shows 4 course categories: Computer Apps, Art, Spoken English, Life Skills. He has courses assigned by his coach.

**Rising Action:** Ravi clicks Computer Apps, sees a three-pane layout: application list → levels → tasks. He selects "Dance Mat Typing", picks Level 1, and sees tasks with color-coded progress lines (green=done, half-green=in-progress, red=not started). He clicks an ongoing task and launches the external tool.

**Climax:** Ravi completes the typing exercise. The system records his performance (time, accuracy), awards ISF Coins automatically, and updates his rank among students. His coin balance increases in the persistent Title Bar.

**Resolution:** Ravi can see his progress across all levels, compare his rank with peers, and his earned coins are spendable in the ISF Shop.

---

### Journey 2: Amit — The Admin Building a Course

**Opening Scene:** Amit needs to create a new Computer Apps course for all Balagruhas. He navigates to the LMS admin panel.

**Rising Action:** Amit creates a new course, adds 3 modules, each with 2 chapters. For each chapter, he uploads content (videos from S3, PDFs, documents). He builds quizzes with questions from the question bank — multiple choice, true/false, open-ended. He sets passing criteria (70% score). He then opens the translation module and translates content items from English to Telugu one by one.

**Climax:** Amit publishes the course (Draft → Published). The course is now visible to coaches for assignment. He uses Mann ki Baat to broadcast a voice announcement to all students about the new course.

**Resolution:** Coaches can assign the published course to their Balagruhas. Students see it in their dashboard. All content is bilingual.

---

### Journey 3: Priya — The Coach Grading Student Work

**Opening Scene:** Priya has 15 student submissions waiting — Art drawings, Spoken English videos, Life Skills voice recordings. She opens the Syllabus Tracker grading interface.

**Rising Action:** For each submission, Priya reviews the student's work (image/video/audio player), applies a rubric score, adds feedback notes, and can flag or skip problematic submissions. ISF Coins are auto-awarded based on the grade.

**Climax:** All 15 submissions graded in one session. Students receive their scores and coins. Priya checks the coach reporting dashboard — sees completion rates, leaderboard, and identifies slow learners.

**Resolution:** The grading workflow is efficient. Priya can track which students need extra help and which are progressing well.

---

### Journey Requirements Summary

| Journey | Primary Capability | Status |
|---------|-------------------|--------|
| Student Learning | Course navigation, quizzes, coin earning | Implemented |
| Admin Course Building | Course CRUD, content, quizzes, translation, publishing | Implemented |
| Coach Grading | Submission review, rubrics, coin awards, reporting | Implemented |

## Domain-Specific Requirements

### Compliance & Regulatory

- **Student data privacy:** Student progress, quiz scores, and submissions are scoped by Balagruha via RBAC. Coaches see only their assigned students.
- **Content moderation:** Admin controls course publishing lifecycle (Draft → Published → Archived). Coaches cannot create courses, only assign them.
- **Age-appropriate UX:** Error messages are child-friendly ("Oops! The magic internet wires seem to be tangled"). Emoji-based mood tracking on student toolbar.

### Technical Constraints

- **Offline capability planned but partially implemented:** MPSD specified offline access to core student learning via SQLite Memory Layer. Actual implementation uses browser caching (StudentDashboardPage with offline caching), not SQLite.
- **Content storage:** S3 for file uploads (500MB limit per file), metadata tracked in ContentLibrary model.
- **Real-time:** WebSocket for WTF (Wall of Fame) updates. No real-time for LMS (request-response pattern).

## Web Application Specific Requirements

### Technical Architecture (Sprint 2 Additions)

| Component | Implementation |
|-----------|---------------|
| **LMS Routes** | `/api/v2/lms/admin/*` (courses, content, modules, quiz, translations), `/api/v2/lms/student/*` (dashboard, per-course routes), `/api/v2/lms/coach/*` (assignments, grading, reports) |
| **Media Upload** | S3 via AWS SDK 3.772, 500MB limit, multipart form data |
| **Voice Recording** | Browser MediaRecorder API, press-and-hold pattern, 60s limit |
| **Video Capture** | Browser getUserMedia, WebcamPreview component |
| **Translation** | Item-by-item EN→Telugu editor with progress tracking |
| **Coin System** | Auto-award on quiz pass / grading, transaction history, real-time balance |

## Project Scoping & Phased Development

### Implemented (16/25 stories — 64%)

**Epic 1: Student Experience (5/6)**
- Student homepage with offline caching ✓
- Computer Apps course interaction ✓
- Spoken English video recording ✓
- Life Skills voice responses ✓
- ISF Coin wallet ✓
- Art course — PARTIAL (routes exist, Artweaver Electron IPC stubbed)

**Epic 2: Admin Course Management (5/5)**
- Course creation & structure builder ✓
- Content management with S3 upload ✓
- Quiz & assessment builder ✓
- Translation module EN→Telugu ✓
- Course publishing & archiving ✓

**Epic 3: Coach Functionality (3/4)**
- Course assignment interface ✓
- Grading interface (Art/Audio/Video) ✓
- Coach reporting dashboard ✓
- Manual coin award — PARTIAL (auto-awards on grading, no explicit API)

**Epic 4: Amma Role Enhancement (0/4)** — NOT BUILT
- Individual Amma accounts — PARTIAL (role exists, no self-registration)
- Query management — NOT BUILT
- SLA task management & auto-reassignment — NOT BUILT
- Amma dashboard — NOT BUILT

**Epic 5: System-Wide Features (2/6)**
- Notification center ✓
- Mann ki Baat broadcasts ✓
- Voice communication — PARTIAL (upload/recording, no live calling)
- WhatsApp integration — NOT BUILT
- PM error handling — PARTIAL (generic handlers)
- Course reporting — PARTIAL (basic metrics)

### Remaining for Sprint 2 Completion

1. Amma query management system
2. Amma SLA task management with auto-reassignment
3. Amma dashboard UI
4. WhatsApp API integration for notifications
5. Explicit manual coin award API for coaches
6. Live voice communication infrastructure
7. Comprehensive course reporting/analytics

## Functional Requirements

### LMS Student Experience

- **FR1:** Student can view course categories on homepage after facial recognition login
- **FR2:** Student can navigate Computer Apps courses with three-pane layout (apps → levels → tasks)
- **FR3:** Student can see task progress with color-coded indicators (green/half-green/red)
- **FR4:** Student can launch external tools/activities from task items
- **FR5:** Student can record and submit spoken English videos via webcam
- **FR6:** Student can record and submit Life Skills voice responses via press-and-hold (60s limit)
- **FR7:** Student can take quizzes with multiple question types and see pass/fail results
- **FR8:** Student can view ISF Coin balance in persistent Title Bar, updated in real-time on earning
- **FR9:** Student can view transaction history showing coins earned per activity
- **FR10:** System resumes incomplete tasks from previous sessions (offline caching)
- **FR11:** Art course provides canvas/drawing submission interface (Artweaver IPC stubbed for Electron)

### LMS Admin Course Management

- **FR12:** Admin can create courses with hierarchical structure: Course → Modules → Chapters → Content Items
- **FR13:** Admin can upload content (video, PDF, document, image, audio, text, links) to S3 with 500MB limit
- **FR14:** Admin can build quizzes with question bank: multiple choice, true/false, open-ended, reorder, publish
- **FR15:** Admin can translate course content items from English to Telugu with item-by-item editor and progress tracking
- **FR16:** Admin can manage course lifecycle: Draft → Published → Archived with validation gates
- **FR17:** Admin can manage content library with metadata, search, and categorization

### LMS Coach Functionality

- **FR18:** Coach can assign published courses to individual students or entire Balagruhas with due dates
- **FR19:** Coach can grade student submissions (Art images, Spoken English videos, Life Skills audio) with rubric scores and feedback
- **FR20:** Coach can flag or skip problematic submissions during grading
- **FR21:** Coach can view reporting dashboard with completion rates, leaderboard, and slow learner identification
- **FR22:** System auto-awards ISF Coins to students based on grading scores (implicit coin award)
- **FR23:** Coach can manually award ISF Coins to students — PARTIAL (auto-awards work, no explicit manual API)

### Communication & Notifications

- **FR24:** System delivers in-app notifications (personal, common, system) with badge counts and read tracking
- **FR25:** Admin can send broadcast messages ("Mann ki Baat") to all students as WTF pin category
- **FR26:** Users can upload and send voice recordings (upload infrastructure works, no live calling)
- **FR27:** System sends WhatsApp notifications when Admin publishes daily schedule — NOT BUILT

### Amma Role — NOT BUILT

- **FR28:** Amma can self-register with Admin approval — NOT BUILT (role exists, no self-registration flow)
- **FR29:** Amma can manage student queries with categorization and tracking — NOT BUILT
- **FR30:** System auto-reassigns unresolved queries based on SLA timers — NOT BUILT
- **FR31:** Amma can view dedicated dashboard matching client UI mockups — NOT BUILT

### ISF Coin Economy (Sprint 2 Portion)

- **FR32:** Students earn coins automatically on quiz pass and coach grading
- **FR33:** Coin balance displayed in real-time on student Title Bar
- **FR34:** Transaction history tracks all earn events with source (quiz, grading, manual)
- **FR35:** Coin earning velocity trackable as engagement metric

## Non-Functional Requirements

### Performance

- **NFR1:** Course content loads within 3 seconds including S3 media retrieval
- **NFR2:** Quiz submission and grading result display within 2 seconds
- **NFR3:** Voice/video recording starts within 1 second of user action
- **NFR4:** Translation module handles item-by-item editing without page reloads

### Security

- **NFR5:** Course content access scoped by RBAC — students see only assigned courses
- **NFR6:** Admin-only access enforced for course creation, content management, quiz building, translation, and publishing
- **NFR7:** Coach-only access enforced for grading and assignment management
- **NFR8:** S3 upload URLs are signed and time-limited

### Content Quality

- **NFR9:** S3 upload limit: 500MB per file with type validation (video, PDF, document, image, audio)
- **NFR10:** Voice recording limit: 60 seconds maximum
- **NFR11:** Course publishing requires validation (content exists, quiz has questions, etc.)

### Architecture

- **NFR12:** LMS routes follow v2 pattern: `/api/v2/lms/{role}/{resource}`
- **NFR13:** Course data uses hierarchical Mongoose models: Course → ContentLibrary → Quiz → QuestionBank → Assignment → CourseAssignment → StudentProgress → Submission
- **NFR14:** Coin economy uses atomic transactions for earn/spend operations (mongoose.startSession())

## Sprint 2 Models Created

| Model | File | Purpose |
|-------|------|---------|
| Course | `course.js` | Course definitions with module/chapter hierarchy |
| ContentLibrary | `ContentLibrary.js` | LMS content items (video, PDF, etc.) |
| Quiz | `Quiz.js` | Quiz definitions with passing criteria |
| QuestionBank | `QuestionBank.js` | Question pool for quizzes |
| Assignment | `Assignment.js` | Student assignments |
| CourseAssignment | `CourseAssignment.js` | Course-to-student mapping |
| StudentProgress | `StudentProgress.js` | Student progress tracking |
| Submission | `Submission.js` | Assignment/quiz submissions |
| Coin | `coin.js` | Virtual currency transactions |
| WtfPin | `wtfPin.js` | Wall of Fame content posts |
| WtfSettings | `wtfSettings.js` | WTF system configuration |
| WtfStudentInteraction | `wtfStudentInteraction.js` | Like/love/comment interactions |
| WtfSubmission | `wtfSubmission.js` | Student content submissions |
| StudentMoodTracker | `studentMoodTracker.js` | Emotion tracking |
| EmotionTracking | `EmotionTracking.js` | Emotion detection results |
| Medical | `medical.js` | Medical records |
| MedicalCheckIns | `medicalCheckIns.js` | Daily health check-ins |
| Doctor | `doctor.js` | Doctor registry |
| Hospital | `hospital.js` | Hospital registry |
| OfflineReqQueue | `offlineReqQueue.js` | Offline request queue |
| Schedules | `schedules.js` | Schedule management |
| SportsTasks | `sportsTasks.js` | Sports-specific tasks |
| TrainingSession | `trainingSession.js` | Training sessions |

**Full schema details:** See `_bmad-output/database-architecture.md` — LMS, WTF/Gamification, and Medical/Health sections.

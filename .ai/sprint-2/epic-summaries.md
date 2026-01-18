# Sprint 2 Epic Summaries - Quick Reference

**Last Updated:** 2025-10-24 17:45:28
**Purpose:** Quick overview of all 5 Sprint 2 epics for rapid context loading

---

## Epic 01: LMS Student Experience (6 stories)

### Purpose
Student-facing LMS features enabling interactive learning, course navigation, and ISF Coin accumulation.

### Stories Overview
1. **Student Homepage & Course Navigation** - Dashboard with course cards, progress tracking
2. **Computer Apps Course Interaction** - MS Office tutorials with interactive content
3. **Art Course + Artweaver Integration** - Launch external Artweaver app via Electron IPC
4. **Spoken English Video Recording** - Record and submit video responses
5. **Life Skills Voice Responses** - Record voice answers to reflection questions
6. **ISF Coin Wallet** - Display wallet, transaction history, coin animations

### Key Components
- StudentCourseDashboard, CourseCard, CourseViewer
- ComputerAppsPlayer, ArtCourseViewer, SpokenEnglishRecorder
- LifeSkillsVoiceRecorder, ISFCoinWallet, TransactionList

### Database Models
- Course, Module, Chapter, ContentItem, Progress, Quiz, QuizSubmission, Transaction

### Technical Highlights
- MediaRecorder API for video/audio recording
- Canvas API for waveform visualization
- Electron IPC for Artweaver integration
- Patrick Hand font for child-friendly UI

---

## Epic 02: LMS Admin Course Management (5 stories)

### Purpose
Admin tools for creating, managing, translating, and publishing courses with quizzes and assessments.

### Stories Overview
1. **Course Creation & Structure Builder** - Build 3-tier hierarchy (Course → Module → Chapter)
2. **Content Management Module** - Add text, images, videos, quizzes to chapters
3. **Quiz System & Assessment Builder** - Create quizzes with multiple question types
4. **Translation Module** - Translate content to Hindi, Telugu, other regional languages
5. **Course Publishing & Archiving** - Publish/archive workflow with validation

### Key Components
- CourseBuilder, ModuleEditor, ChapterManager
- ContentItemEditor, RichTextEditor, ImageUploader, VideoUploader
- QuizBuilder, QuestionEditor, AnswerOptionsManager
- TranslationInterface, LanguageSelector
- PublishingWorkflow, CourseStatusManager

### Database Models
- Course (with translations), Module, Chapter
- ContentItem (polymorphic), Quiz, Question, Answer
- Translation, Language

### Technical Highlights
- Rich text editing with formatting
- S3 + CDN for media storage and delivery
- Multilingual content support (JSON structure)
- Drag-and-drop course structure builder

---

## Epic 03: LMS Coach Functionality (4 stories)

### Purpose
Coach interfaces for assigning courses, tracking progress, grading work, and generating reports.

### Stories Overview
1. **Course Assignment Interface** - Assign courses to students, set deadlines
2. **Syllabus Tracker & Grading** - Track syllabus progress, grade quizzes/assignments
3. **Manual ISF Coin Award System** - Award coins for participation, behavior
4. **Coach Reporting Dashboard** - View course progress, completion rates, student engagement

### Key Components
- CourseAssignmentManager, StudentCourseAssignment
- SyllabusTracker, GradingInterface, QuizGrader
- ManualCoinAward, CoinAwardHistory, AwardReasonSelector
- CoachReportDashboard, StudentProgressChart, EngagementMetrics

### Database Models
- CourseAssignment, Grade, GradingRubric
- Transaction (manual awards), CoachReport

### Technical Highlights
- Bulk assignment workflows
- Auto-grading for multiple choice quizzes
- Manual grading interface for subjective questions
- Real-time progress charts with Recharts

---

## Epic 04: Amma Role Enhancement (4 stories)

### Purpose
Enhanced Amma portal with individual accounts, query management, SLA-based task system, and WhatsApp updates.

### Stories Overview
1. **Individual Amma Accounts & Self-Registration** - Amma self-registration, profile management
2. **Enhanced Query Management** - Submit queries with attachments, track status
3. **SLA-Based Task Management** - Auto-assign queries with SLA timers, escalation
4. **Amma Dashboard (Client UI)** - Client-friendly view of students, queries, tasks

### Key Components
- AmmaSelfRegistration, AmmaProfileManager, AmmaVerification
- QuerySubmissionForm, QueryDashboard, QueryDetails, AttachmentUploader
- SLATaskManager, TaskAssignmentEngine, SLATimer
- AmmaDashboard, StudentCardGrid, TaskList, QueryHistory

### Database Models
- Amma (individual accounts), Query, QueryAttachment
- Task, SLA, TaskAssignment, AmmaActivity

### Technical Highlights
- Phone number encryption (AES-256-CBC)
- SLA priority system (P0: 1hr, P1: 4hr, P2: 24hr, P3: 72hr)
- Auto-reassignment if SLA breached
- Voice message attachments

---

## Epic 05: System-Wide Features (6 stories)

### Purpose
Cross-cutting features for notifications, communication, broadcasts, error handling, and analytics.

### Stories Overview
1. **In-App Notification Center** - Unified notification system with WebSocket real-time updates
2. **Voice Communication Infrastructure** - Reusable voice recording/playback components
3. **Admin Broadcast System** - "Mann ki Baat" broadcasts to all students
4. **WhatsApp Integration** - Automated weekly schedule delivery to Balagruha groups
5. **Playground Manager Role & Error Handling** - PM role, global error handler, friendly error UX
6. **Course Reporting System** - System-wide analytics, completion rates, coin distribution

### Key Components
- NotificationCenter, NotificationCard, NotificationBadge
- VoiceRecorder, VoicePlayer, WaveformVisualizer
- BroadcastDashboard, CreateBroadcastModal, BroadcastCard
- WhatsAppConfigManager, ScheduleGenerator
- GlobalErrorHandler, ErrorBoundary, PMDashboard, ErrorDetailsModal
- CourseReportDashboard, CourseDetailModal, FilterPanel

### Database Models
- Notification, VoiceMessage
- Broadcast, BroadcastRecipient
- WhatsAppConfig, ErrorLog, PlaygroundManager

### Technical Highlights
- WebSocket for real-time notifications
- Twilio WhatsApp API integration
- Global error capture (window.onerror, unhandledrejection)
- MongoDB aggregation pipelines for analytics
- Export to CSV/PDF/Excel
- Child-friendly error messages vs technical error details

---

## Epic Dependencies

### Linear Dependencies (Must Complete in Order)
- Epic 02 Story 01 (Course Creation) → Epic 01 Story 01 (Student views courses)
- Epic 02 Story 03 (Quiz Builder) → Epic 01 Story 02 (Student takes quizzes)
- Epic 05 Story 02 (Voice Infrastructure) → Epic 01 Story 05 (Life Skills voice)
- Epic 05 Story 01 (Notification Center) → Epic 04 Story 02 (Query notifications)

### Parallel Work Opportunities
- All Epic 01 stories (different courses, independent)
- Epic 03 stories (Coach features, independent)
- Epic 04 stories (Amma features, separate from LMS)
- Epic 05 Stories 03-06 (System features, mostly independent)

---

## Common Patterns Across Epics

### 1. Media Upload Pattern (Epic 01, 02, 04, 05)
All epics use S3 + CDN for media uploads:
1. Frontend requests signed URL from backend
2. Frontend uploads directly to S3
3. Backend stores S3 key + CDN URL
4. Frontend displays via CDN URL

### 2. WebSocket Notifications (Epic 01, 03, 04, 05)
All user actions trigger real-time notifications:
- Quiz graded → notify student
- Course assigned → notify student and coach
- Query resolved → notify Amma
- Broadcast sent → notify all students

### 3. Role-Based UI (All Epics)
Every epic has role-specific UI patterns:
- Students: Patrick Hand font, large buttons, emojis, bright colors
- Admins/Coaches: Professional UI, tables, charts, minimal emojis
- Ammas: Simplified UI, large text, clear CTAs

### 4. MongoDB Aggregation (Epic 03, 05)
Complex analytics use aggregation pipelines:
- Coach reports: progress by student, course, Balagruha
- System reports: completion rates, coin distribution, time spent

### 5. Error Handling (All Epics)
Consistent error handling across all features:
- Global error handler captures all errors
- Error boundary catches React errors
- Role-based error display (friendly vs technical)
- Errors logged to ErrorLog collection

---

## Quick Story Lookup

### Epic 01 Stories
- `epic-01-story-01-student-homepage-course-navigation.md`
- `epic-01-story-02-computer-apps-course-interaction.md`
- `epic-01-story-03-art-course-artweaver-integration.md`
- `epic-01-story-04-spoken-english-video-recording.md`
- `epic-01-story-05-life-skills-voice-responses.md`
- `epic-01-story-06-isf-coin-wallet.md`

### Epic 02 Stories
- `epic-02-story-01-course-creation-structure-builder.md`
- `epic-02-story-02-content-management-module.md`
- `epic-02-story-03-quiz-assessment-builder.md`
- `epic-02-story-04-translation-module.md`
- `epic-02-story-05-course-publishing-archiving.md`

### Epic 03 Stories
- `epic-03-story-01-course-assignment-interface.md`
- `epic-03-story-02-syllabus-tracker-grading.md`
- `epic-03-story-03-manual-coin-award-system.md`
- `epic-03-story-04-coach-reporting-dashboard.md`

### Epic 04 Stories
- `epic-04-story-01-individual-amma-accounts-self-registration.md`
- `epic-04-story-02-enhanced-query-management.md`
- `epic-04-story-03-sla-task-management-auto-reassignment.md`
- `epic-04-story-04-amma-dashboard-client-ui.md`

### Epic 05 Stories
- `epic-05-story-01-in-app-notification-center.md`
- `epic-05-story-02-voice-communication-infrastructure.md`
- `epic-05-story-03-admin-broadcast-system.md`
- `epic-05-story-04-whatsapp-integration.md`
- `epic-05-story-05-pm-error-handling.md`
- `epic-05-story-06-course-reporting-system.md`

---

**For Detailed Information:**
- Full epic documentation: `docs/epics/sprint2/epic-*.md`
- Individual stories: `docs/stories/sprint2/epic-*-story-*.md`
- Design system: `docs/epics/sprint2/design-system-sprint2.md`
- Technical patterns: `.ai/sprint-2/technical-patterns.md`

**End of Epic Summaries**

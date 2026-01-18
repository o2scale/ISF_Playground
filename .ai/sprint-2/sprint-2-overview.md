# Sprint 2: LMS & Enhanced User Roles - Overview

**Last Updated:** 2025-10-24 17:45:28
**Sprint:** Sprint 2
**Status:** Story Documentation Complete
**Duration:** 8-10 weeks (estimated)

---

## Executive Summary

Sprint 2 represents a major evolution of the ISF Playground platform, transforming it from a basic administration system into a full-featured **Learning Management System (LMS)** with enhanced role-specific functionality for all user types.

**Core Objective:** Build a comprehensive LMS that enables students to learn through interactive courses, coaches to teach and track progress, admins to create and manage content, and ammas to support students with enhanced communication tools.

---

## Sprint 2 Goals

### Primary Goals
1. **Launch Complete LMS:** Enable students to access courses, complete modules, earn ISF Coins, and track progress
2. **Empower Content Creators:** Provide admins with tools to create, translate, and publish courses
3. **Enable Coach Teaching:** Give coaches interfaces to assign courses, track syllabus, grade work, and award coins
4. **Enhance Amma Support:** Upgrade Amma role with individual accounts, query management, and SLA-based task system
5. **System-Wide Infrastructure:** Implement notifications, voice communication, broadcasts, error handling, and reporting

### Success Metrics
- **Student Engagement:** 80%+ of students complete at least one course module
- **Content Creation:** Admins can create a course in <2 hours
- **Coach Efficiency:** Coaches can grade 50 students in <30 minutes
- **Amma Response Time:** 90%+ of queries resolved within SLA timeframes
- **System Reliability:** <1% error rate, 99.5% uptime

---

## Architecture Overview

### Three-Tier Course Hierarchy
```
Course (e.g., "Computer Apps")
├── Module 1 (e.g., "Introduction to MS Word")
│   ├── Chapter 1.1 ("Getting Started")
│   │   ├── Content Item 1.1.1 (Text/Image)
│   │   ├── Content Item 1.1.2 (Video)
│   │   └── Content Item 1.1.3 (Quiz)
│   └── Chapter 1.2 ("Basic Formatting")
│       └── ...
├── Module 2 (e.g., "MS Excel Basics")
│   └── ...
└── Module 3 (e.g., "MS PowerPoint")
    └── ...
```

### Role-Based Workflows

**Students:**
1. Login with facial recognition
2. Navigate to assigned courses
3. Complete modules and chapters sequentially
4. Interact with content (videos, quizzes, voice responses)
5. Earn ISF Coins for completion
6. Track progress on dashboard

**Admins:**
1. Create course structure (course → modules → chapters)
2. Add content items (text, images, videos, quizzes)
3. Translate content to regional languages
4. Publish/archive courses
5. Broadcast announcements to students
6. Generate system-wide reports

**Coaches:**
1. Assign courses to students at Balagruha
2. Track syllabus progress
3. Grade assignments and quizzes
4. Manually award ISF Coins for participation/behavior
5. Generate coach-specific reports
6. Monitor student engagement

**Ammas:**
1. Self-register and manage own account
2. Submit queries about students
3. Receive task assignments with SLA timers
4. Track query status and history
5. Communicate via voice messages
6. Receive WhatsApp schedule updates

**Playground Managers (New Role):**
1. Monitor system errors and health
2. Receive error notifications with priority
3. Investigate and resolve technical issues
4. Track error trends and patterns
5. Escalate critical issues

---

## Technology Stack

### Frontend
- **React 19.0.0** - UI framework with functional components and hooks
- **Electron.js** - Desktop application wrapper
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Charting library for analytics
- **React Hot Toast** - Toast notifications
- **React DatePicker** - Date selection components

### Backend
- **Node.js 18 LTS** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB 6.x** - Primary database
- **Mongoose** - ODM for MongoDB
- **WebSocket** - Real-time bidirectional communication
- **Bull** - Job queue for background tasks
- **Cron Jobs** - Scheduled tasks (WhatsApp, error cleanup)

### External Integrations
- **AWS S3 + CloudFront CDN** - Media file storage and delivery
- **Twilio WhatsApp API** - Automated schedule messaging
- **@vladmandic/human** - Facial recognition (from Sprint 1.1)
- **Artweaver (Electron IPC)** - Art course integration

### Security & Encryption
- **AES-256-CBC** - WhatsApp phone number encryption
- **bcrypt** - Password hashing
- **JWT** - Authentication tokens
- **RBAC** - Role-based access control (from Sprint 1.1)

---

## Epic Breakdown

### Epic 01: LMS Student Experience (6 stories, ~60 hours)

**Purpose:** Student-facing LMS features for learning and progress tracking

**Stories:**
1. Student Homepage & Course Navigation
2. Computer Apps Course Interaction (MS Office tutorials)
3. Art Course + Artweaver Integration (launch external app)
4. Spoken English Video Recording (record and submit videos)
5. Life Skills Voice Responses (record voice answers)
6. ISF Coin Wallet Display & Accumulation

**Key Components:**
- StudentCourseDashboard, CourseCard, ModuleViewer
- ComputerAppsPlayer, ArtCourseViewer, SpokenEnglishRecorder
- LifeSkillsVoiceRecorder, ISFCoinWallet
- Video/Audio recording with MediaRecorder API
- Waveform visualization with Canvas API

**Database Models:**
- Course, Module, Chapter, ContentItem
- Progress, Quiz, QuizSubmission
- Transaction (for coin tracking)

### Epic 02: LMS Admin Course Management (5 stories, ~70 hours)

**Purpose:** Admin tools for creating, managing, and publishing courses

**Stories:**
1. Course Creation & Structure Builder
2. Content Management Module
3. Quiz System & Assessment Builder
4. Translation Module
5. Course Publishing & Archiving Workflow

**Key Components:**
- CourseBuilder, ModuleEditor, ChapterManager
- ContentItemEditor (RichTextEditor, ImageUploader, VideoUploader)
- QuizBuilder, QuestionEditor, AnswerOptionsManager
- TranslationInterface, LanguageSelector
- PublishingWorkflow, CourseStatusManager

**Database Models:**
- Course (with multilingual content)
- ContentItem (polymorphic: text/image/video/quiz)
- Quiz, Question, Answer
- Translation, Language

### Epic 03: LMS Coach Functionality (4 stories, ~50 hours)

**Purpose:** Coach interfaces for teaching, grading, and reporting

**Stories:**
1. Course Assignment Interface
2. Syllabus Tracker & Grading Interface
3. Manual ISF Coin Award System
4. Coach Reporting Dashboard

**Key Components:**
- CourseAssignmentManager, StudentCourseAssignment
- SyllabusTracker, GradingInterface, QuizGrader
- ManualCoinAward, CoinAwardHistory
- CoachReportDashboard, StudentProgressChart

**Database Models:**
- CourseAssignment
- Grade, GradingRubric
- Transaction (manual coin awards)
- CoachReport

### Epic 04: Amma Role Enhancement (4 stories, ~50 hours)

**Purpose:** Enhanced Amma portal with individual accounts and query management

**Stories:**
1. Individual Amma Accounts & Self-Registration
2. Enhanced Query Management
3. SLA-Based Task Management & Auto-Reassignment
4. Amma Dashboard (Client UI)

**Key Components:**
- AmmaSelfRegistration, AmmaProfileManager
- QuerySubmissionForm, QueryDashboard, QueryDetails
- SLATaskManager, TaskAssignmentEngine
- AmmaDashboard, TaskList, QueryHistory

**Database Models:**
- Amma (individual accounts)
- Query, QueryAttachment
- Task, SLA, TaskAssignment
- AmmaActivity

### Epic 05: System-Wide Features (6 stories, ~80 hours)

**Purpose:** Cross-cutting features for communication, monitoring, and analytics

**Stories:**
1. In-App Notification Center
2. Voice Communication Infrastructure
3. Admin Broadcast System (Mann ki Baat)
4. WhatsApp Integration (Automated Schedule Delivery)
5. Playground Manager Role & Error Handling
6. Course Reporting System

**Key Components:**
- NotificationCenter, NotificationCard
- VoiceRecorder, VoicePlayer, WaveformVisualizer
- BroadcastDashboard, CreateBroadcastModal
- WhatsAppConfigManager, ScheduleGenerator
- GlobalErrorHandler, ErrorBoundary, PMDashboard
- CourseReportDashboard, CourseDetailModal

**Database Models:**
- Notification
- VoiceMessage
- Broadcast, BroadcastRecipient
- WhatsAppConfig
- ErrorLog, PlaygroundManager
- (Uses existing Course, Progress, Transaction models)

---

## Data Flow Examples

### Example 1: Student Completes Quiz

```
1. Student opens quiz in course viewer
2. Frontend: QuizViewer loads questions from /api/v2/courses/:id/modules/:mid/quizzes/:qid
3. Student answers all questions
4. Frontend: Submit answers to POST /api/v2/quizzes/:id/submit
5. Backend: Grade quiz automatically (multiple choice)
6. Backend: Create Transaction record (award coins)
7. Backend: Update Progress record (mark quiz complete)
8. Backend: Send WebSocket notification (quiz graded)
9. Frontend: Display results modal
10. Frontend: Update ISF Coin wallet display
11. Frontend: Update course progress bar
```

### Example 2: Admin Creates and Publishes Course

```
1. Admin opens Course Builder
2. Frontend: Create course structure (POST /api/v2/courses)
3. Admin adds modules and chapters
4. Admin uploads content items (text, images, videos)
5. Frontend: Upload media to S3 via signed URL (POST /api/v2/media/upload-url)
6. Admin creates quizzes with questions
7. Admin translates content to Hindi/Telugu
8. Admin clicks "Publish"
9. Backend: Validate course completeness
10. Backend: Update course status to "active"
11. Backend: Trigger notification to all coaches
12. Coaches see new course in assignment interface
```

### Example 3: Amma Submits Query, PM Resolves

```
1. Amma submits query via form (POST /api/v2/queries)
2. Backend: Create Query record
3. Backend: Determine priority (P0/P1/P2/P3)
4. Backend: Calculate SLA deadline
5. Backend: Auto-assign to available PM
6. Backend: Create Task record
7. Backend: Send notification to PM
8. PM receives notification in dashboard
9. PM investigates query
10. PM updates task status to "investigating"
11. PM resolves issue
12. PM closes task (POST /api/v2/tasks/:id/close)
13. Backend: Send notification to Amma (resolved)
14. Amma sees resolved status in dashboard
```

---

## Key Technical Patterns

### 1. MongoDB Aggregation Pipelines
Used extensively for analytics and reporting:
```javascript
Course.aggregate([
  { $match: { status: 'active' } },
  { $lookup: { from: 'progresses', localField: '_id', foreignField: 'courseId', as: 'progresses' } },
  { $unwind: '$progresses' },
  { $group: { _id: '$_id', avgCompletion: { $avg: '$progresses.progress' } } }
])
```

### 2. Real-Time Updates with WebSocket
All user actions trigger WebSocket events:
```javascript
// Server
io.to(`user_${userId}`).emit('notification', { type: 'quiz_graded', data: {...} });

// Client
socket.on('notification', (data) => {
  addNotification(data);
  showToast(data.message);
});
```

### 3. Media Upload Flow (S3 + CDN)
1. Frontend requests signed URL from backend
2. Frontend uploads directly to S3
3. Backend stores S3 key + CDN URL in database
4. Frontend displays via CDN URL (fast delivery)

### 4. Role-Based Component Rendering
```jsx
const DashboardRouter = () => {
  const { user } = useAuth();

  if (user.role === 'student') return <StudentDashboard />;
  if (user.role === 'coach') return <CoachDashboard />;
  if (user.role === 'admin') return <AdminDashboard />;
  if (user.role === 'amma') return <AmmaDashboard />;
  if (user.role === 'playground_manager') return <PMDashboard />;
};
```

### 5. Error Handling with Boundaries
```jsx
<ErrorBoundary role={user.role}>
  <StudentCourseDashboard />
</ErrorBoundary>

// Error Boundary shows role-specific error messages
// Students: Friendly, emoji-based messages
// Admins: Detailed stack traces
```

---

## Dependencies Between Stories

### Linear Dependencies (Must be completed in order)
- Epic 02 Story 01 (Course Creation) → Epic 01 Story 01 (Student can view courses)
- Epic 02 Story 03 (Quiz Builder) → Epic 01 Story 02 (Student can take quizzes)
- Epic 05 Story 02 (Voice Infrastructure) → Epic 01 Story 05 (Life Skills voice responses)
- Epic 05 Story 01 (Notification Center) → Epic 04 Story 02 (Query notifications)

### Parallel Work (Can be developed simultaneously)
- All Epic 01 stories (different courses, independent)
- Epic 03 stories (Coach features, independent of student UX)
- Epic 04 stories (Amma features, separate from LMS)
- Epic 05 Stories 03-06 (System features, independent)

### Cross-Epic Dependencies
- Epic 01 & 02: Course models must be consistent
- Epic 01 & 03: Progress tracking shared between student and coach views
- Epic 04 & 05: Query notifications use notification center
- Epic 03 & 05: Coach reports use reporting infrastructure

---

## Quality Gates

Every story must pass these quality gates before merging:

### Functional
- [ ] All acceptance criteria pass manual testing
- [ ] Edge cases handled (empty states, errors, etc.)
- [ ] Role-based access control enforced

### Technical
- [ ] Code follows project standards (ES6+, functional components)
- [ ] No console errors or warnings
- [ ] API returns correct HTTP status codes
- [ ] Database queries optimized (<2 seconds)

### Testing
- [ ] Unit tests for all service layer functions
- [ ] Integration tests for all API endpoints
- [ ] E2E tests covering all acceptance criteria
- [ ] Test coverage >80%

### UI/UX
- [ ] Matches design system specifications
- [ ] Responsive design works on all screen sizes
- [ ] Loading states shown during async operations
- [ ] Accessible (ARIA labels, keyboard navigation)

### Documentation
- [ ] API documentation complete
- [ ] Component documentation includes props and usage
- [ ] E2E test documentation includes test scenarios

---

## Testing Strategy

### Unit Tests
- Test all service layer functions (reportService, courseService, etc.)
- Test utility functions (encryption, date formatting, etc.)
- Mock database calls

### Integration Tests
- Test API endpoints with real database (test DB)
- Test authentication and authorization
- Test error handling

### E2E Tests
- Test complete user workflows (student completes course, admin creates course)
- Test across roles
- Test real-time features (notifications, WebSocket)

### Performance Tests
- Test with large datasets (1000+ courses, 10,000+ students)
- Test aggregation query performance
- Test media upload/download speed

---

## Deployment Strategy

### Phase 1: Infrastructure (Week 1)
- Set up S3 buckets and CloudFront CDN
- Configure Twilio WhatsApp API
- Set up WebSocket server
- Create database indexes

### Phase 2: Admin Tools (Week 2-3)
- Deploy Epic 02 (Course Management)
- Train admins on course creation
- Create initial course content

### Phase 3: Student LMS (Week 4-5)
- Deploy Epic 01 (Student Experience)
- Roll out to pilot Balagruha
- Gather feedback and iterate

### Phase 4: Coach Tools (Week 6-7)
- Deploy Epic 03 (Coach Functionality)
- Train coaches on grading and reporting
- Monitor coach adoption

### Phase 5: Amma & System Features (Week 8-9)
- Deploy Epic 04 (Amma Enhancement)
- Deploy Epic 05 (System Features)
- Full system integration testing

### Phase 6: Production Launch (Week 10)
- Deploy to all Balagruhas
- Monitor system health
- Address production issues

---

## Monitoring and Analytics

### System Health Metrics
- API response times (p50, p95, p99)
- Database query performance
- WebSocket connection stability
- S3/CDN upload/download success rates
- Error rates by endpoint

### User Engagement Metrics
- Daily/weekly active users by role
- Course completion rates
- Average time spent per course
- Quiz pass rates
- ISF Coin distribution

### Business Metrics
- Number of courses created
- Student enrollment rates
- Coach grading throughput
- Amma query response times
- System uptime

---

## Risk Mitigation

### Technical Risks
**Risk:** S3/CDN upload failures
**Mitigation:** Retry mechanism with exponential backoff, local caching

**Risk:** WebSocket connection drops
**Mitigation:** Auto-reconnect with notification queue, polling fallback

**Risk:** MongoDB performance degradation with large datasets
**Mitigation:** Proper indexing, aggregation pipeline optimization, caching

### User Adoption Risks
**Risk:** Coaches don't adopt new grading tools
**Mitigation:** Comprehensive training, gradual rollout, coach feedback sessions

**Risk:** Students struggle with LMS navigation
**Mitigation:** Child-friendly UI, onboarding tutorial, coach support

### Operational Risks
**Risk:** Insufficient admin resources to create content
**Mitigation:** Template courses, content reuse, translation automation

**Risk:** Amma query volume exceeds PM capacity
**Mitigation:** Auto-escalation, priority-based routing, self-service FAQ

---

## Success Criteria

Sprint 2 is considered successful when:

1. **Functional Completeness**
   - All 32 stories implemented and tested
   - All acceptance criteria met
   - Zero P0/P1 bugs in production

2. **User Adoption**
   - 80%+ students complete at least one course
   - 90%+ coaches use grading interface weekly
   - 95%+ queries resolved within SLA

3. **Performance**
   - <2 second page load times
   - <1% error rate
   - 99.5% uptime

4. **Quality**
   - >80% test coverage
   - All quality gates passed
   - Code review approval from senior dev

---

**End of Sprint 2 Overview**

# Sprint 2 - Epic 01: LMS Student Experience

**Epic ID:** SPRINT2-EPIC-01
**Epic Name:** LMS Student Experience
**Sprint:** Sprint 2
**Version:** 1.0
**Date:** October 24, 2025
**Last Updated:** 2025-10-24 13:47:17
**Status:** Draft - Ready for Story Breakdown
**Estimated Effort:** 40-50 hours (5-7 development days)
**Priority:** Critical (P0)
**Dependencies:** Sprint 1.1 (RBAC + Facial Recognition)

---

## 1. Epic Overview

### 1.1. Epic Purpose

This epic delivers the complete student-facing Learning Management System (LMS) experience for ISF Playground. Students will access 4 distinct course types (Computer Apps, Art, Spoken English, Life Skills) through a unified, child-friendly interface. The system enables students to:

- Navigate through course categories and tasks
- Complete interactive learning activities
- Earn digital ISF Coins for achievements
- Track progress in real-time
- Learn offline with automatic sync when online

### 1.2. User Personas

**Primary:** Student (ages 8-15)
- Uses facial recognition for login
- Minimal text, maximum visual interaction
- Learns through voice, video, and hands-on activities
- Earns ISF Coins as motivation

**Secondary:** Coach
- Monitors student progress
- Grades subjective submissions (Art, Spoken English)
- Awards ISF Coins based on quality

### 1.3. Epic Goals

1. **Enable Multi-Modal Learning:** Support 4 distinct course types with unique interaction patterns
2. **Gamify Learning:** ISF Coin earning system tied to task completion and quality
3. **Offline-First:** Students can learn without internet for up to 7 days
4. **Child-Friendly UX:** Minimal text, large buttons, colorful visuals, encouraging language
5. **Performance:** Smooth experience on target hardware (Core i3, 8GB RAM)

---

## 2. Story Breakdown

### **Story 01: Student Homepage & Course Navigation**
**Estimated Effort:** 6-8 hours

**Description:**
Student homepage with persistent Title Bar (coin balance, notifications, session timer), Toolbar (emotion emojis, voice chat, homework), and 4 course category buttons. Auto-resume incomplete tasks from previous sessions.

**Key Features:**
- Title Bar: ISF Coin balance (real-time), notification bell with count, session timer
- Toolbar: Emotion tracking (😊 😢 😡), Voice Chat button, Homework view, Help
- Course category cards: Computer Apps (orange), Art (pink), Spoken English (blue), Life Skills (green)
- Resume last activity card
- SPA-style navigation (no page reloads)

**Acceptance Criteria:**
- [ ] Title Bar displays real-time coin balance
- [ ] Notification bell shows unread count
- [ ] Session timer updates every second
- [ ] Course category buttons navigate to respective pages
- [ ] Resume card shows last incomplete task
- [ ] Emotion tracking saves to database
- [ ] Voice chat button opens Amma communication modal

---

### **Story 02: Computer Apps Course Interaction**
**Estimated Effort:** 8-10 hours

**Description:**
Three-pane layout for Computer Apps: Apps list (MS Word, Excel, PowerPoint, Tux Typing, etc.), Levels list, Task details. Students can launch external tools or complete in-app tasks. Performance metrics (time taken, coins earned) and leaderboard rankings displayed.

**Key Features:**
- Three-column layout: Apps → Levels → Tasks
- Status indicators: ✓ (completed), progress counts (e.g., "5/20 tasks completed")
- Launch external tools via Electron IPC
- In-app tasks for typing, quizzes, drag-and-drop
- Performance metrics: time taken, ISF coins earned, ranking position
- Leaderboard comparison with Balagruha peers

**Acceptance Criteria:**
- [ ] Three-pane layout renders correctly
- [ ] Clicking app shows levels
- [ ] Clicking level shows tasks
- [ ] External tool launch works (Tux Typing, GCompris)
- [ ] In-app tasks track time and award coins
- [ ] Leaderboard displays top 10 students
- [ ] Offline mode caches task data locally

---

### **Story 03: Art Course + Artweaver Integration**
**Estimated Effort:** 10-12 hours

**Description:**
Four art modes: Workshops (guided lessons), Free Sketch (open canvas), Art Stories (drawing based on story), Competition (themed contests). Launch Artweaver with USB graphics pad support. Real-time canvas mirroring in ISF Playground. Submit artwork for coach grading.

**Key Features:**
- Mode selection pills: Workshops, Free Sketch, Art Stories, Competition
- Launch Artweaver via Electron IPC
- USB graphics pad detection and integration
- Real-time canvas mirroring (screenshot polling or IPC)
- Submit button captures final artwork and sends to coach
- Art submission queue (offline → online sync)

**Acceptance Criteria:**
- [ ] Mode pills switch between art activities
- [ ] Artweaver launches successfully
- [ ] USB graphics pad input works
- [ ] Canvas preview updates in real-time
- [ ] Submit button uploads artwork to S3
- [ ] Offline submissions queue for sync
- [ ] Coach receives submission notification

---

### **Story 04: Spoken English Video Recording**
**Estimated Effort:** 8-10 hours

**Description:**
Webcam-based video recording interface for poetry recitation and speech activities. Record, preview, re-record, and submit workflow. Audio playback of task instructions. Videos stored in S3 and sent to coach for grading.

**Key Features:**
- Audio playback for task instructions
- Webcam-based video recording (WebRTC)
- Record, Stop, Preview, Re-Record workflow
- Video player with playback controls
- Submit button uploads video to S3
- Offline video queue (stores locally until online)

**Acceptance Criteria:**
- [ ] Audio instructions play correctly
- [ ] Webcam preview shows student face
- [ ] Record button captures video
- [ ] Preview button plays recorded video
- [ ] Re-Record button clears and restarts
- [ ] Submit button uploads to S3
- [ ] Offline videos queue for sync
- [ ] Coach receives submission notification

---

### **Story 05: Life Skills Voice Responses**
**Estimated Effort:** 6-8 hours

**Description:**
Voice note responses (WhatsApp-style press-and-hold) and MCQ quizzes. Mandatory audio playback before submission. Quiz results shown ONLY after full quiz completion (delayed feedback).

**Key Features:**
- Audio playback with mandatory listening enforcement
- WhatsApp-style press-and-hold voice recording (max 60 seconds)
- Waveform visualization during recording
- Playback preview before submission
- MCQ with radio buttons and progress indicator
- Quiz results shown after completion (no instant feedback per question)

**Acceptance Criteria:**
- [ ] Audio question playback required before submission
- [ ] Press-and-hold voice recording works
- [ ] Waveform visualization displays during recording
- [ ] Playback preview button plays voice note
- [ ] MCQ progress indicator updates
- [ ] Quiz results shown only after all questions answered
- [ ] Offline submissions queue for sync

---

### **Story 06: ISF Coin Wallet Display & Accumulation** ✅ **COMPLETE - QA PASSED**
**Estimated Effort:** 4-6 hours | **Actual Effort:** ~6 hours (including bug fix & QA)
**Status:** ✅ COMPLETE - QA PASSED (95/100 Grade A) - Ready for Staging Deployment
**QA Sign-Off:** 2025-10-28 22:55:59 | **Deployment Approval:** STAGING APPROVED

**Description:**
Real-time ISF Coin balance display in Title Bar. Transaction history logging. Coins earned through task completion, quiz passing, and coach grading. Visual coin animation on earning.

**Key Features:**
- ✅ Real-time coin balance in Title Bar (2-second polling)
- ✅ Coin animation framework (structure ready, event integration deferred)
- ✅ Transaction history modal (filters, sorting, pagination)
- ✅ Milestone celebrations at 100/500/1000/5000 coins with confetti
- ⏸️ Offline coin tracking with SQLite (deferred - requires Electron/Tauri desktop app)

**Acceptance Criteria:**
- [x] Title Bar displays real-time coin balance (2-second polling verified)
- [x] Coin animation framework implemented (event integration deferred)
- [x] Transaction history modal shows all transactions with filters
- [x] Milestone celebrations trigger automatically at thresholds
- [x] Coin balance updates within 2 seconds after task completion
- [x] Transaction log includes timestamp, activity, amount, color-coded types
- [ ] Offline coins sync with SQLite (deferred - requires desktop app infrastructure)

**Implementation:** Commits `9614349`, `de29677`, `39a3721` | **QA Report:** docs/qa/reports/sprint-2-epic-01-story-06-RETEST-summary.md

---

## 3. Epic-Wide UI Guidelines

### 3.1. Design System References

All student screens follow the **Sprint 2 LMS Design System** (`docs/design-systems/sprint-2-lms-design-system.md`).

**Key Design Patterns:**
- **Title Bar (Section 5.1):** Persistent across all screens, displays coin balance, notifications, session timer
- **Toolbar (Section 5.2):** Emotion emojis, voice chat, homework, help buttons
- **Student Course Cards (Section 8.1):** Color-coded by course type (Computer Apps: orange, Art: pink, Spoken English: blue, Life Skills: green)
- **Three-Pane Layout (Section 8.2):** Computer Apps course structure
- **Art Canvas Integration (Section 8.3):** Real-time mirroring of Artweaver canvas
- **Video Recording Interface (Section 8.4):** Webcam preview with record/stop/preview controls
- **Voice Recording Interface (Section 8.5):** WhatsApp-style press-and-hold with waveform
- **Quiz Question Card (Section 8.6):** MCQ with progress indicator

### 3.2. Color Palette (Student-Specific)

```css
/* Primary Student Colors */
--student-blue: #3B82F6;       /* Primary buttons, active states */
--student-orange: #EA580C;     /* Computer Apps category */
--student-pink: #EC4899;       /* Art category */
--student-green: #16A34A;      /* Life Skills category */
--student-purple: #9333EA;     /* Spoken English category */

/* Coin System */
--coin-gold: #FCD34D;          /* ISF Coin icon */
--coin-gold-light: #FEF3C7;    /* Coin balance background */

/* Neutral Scale */
--gray-900: #111827;           /* Primary text */
--gray-600: #4B5563;           /* Secondary text */
--gray-200: #E5E7EB;           /* Borders */
--gray-50: #F9FAFB;            /* Backgrounds */
```

### 3.3. Typography

```css
--font-primary: "Patrick Hand", cursive;  /* Child-friendly handwritten font */
--text-3xl: 1.875rem;  /* Page titles */
--text-xl: 1.25rem;    /* Card titles */
--text-lg: 1.125rem;   /* Section headers */
--text-base: 1rem;     /* Body text */
--text-sm: 0.875rem;   /* Captions */
```

### 3.4. Button Components

**Primary Button (Task start, Submit):**
```jsx
<button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md text-lg">
  Start Task
</button>
```

**Category Card (Course selection):**
```jsx
<div className="bg-orange-100 border-2 border-orange-300 rounded-xl p-6 cursor-pointer hover:bg-orange-200 transition-colors">
  <Monitor className="w-16 h-16 text-orange-600 mb-3 mx-auto" />
  <h3 className="text-center font-bold text-xl text-gray-800">Computer Apps</h3>
</div>
```

**Coin Balance Display:**
```jsx
<div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
  <CoinIcon className="w-6 h-6 text-yellow-600" />
  <span className="font-bold text-xl text-gray-900">{coinBalance}</span>
</div>
```

### 3.5. Responsive Behavior

**Primary Target:** 1366x768 (14-inch laptop)

**Breakpoints:**
- Course cards: 2 columns on mobile (sm), 4 columns on desktop (xl)
- Three-pane layout: Stacked on tablets (md), side-by-side on desktop (lg+)
- Title Bar: Compact icons on mobile, full labels on desktop

---

## 4. Technical Architecture

### 4.1. Frontend Stack

**Technology:**
- Electron.js (desktop application wrapper)
- React v19.0.0 (UI framework)
- Vite (build tool)
- WebRTC (video/audio recording)
- TailwindCSS (styling)

**State Management:**
- React Context API for global state (user session, coin balance)
- Local state for component-specific data (form inputs, UI toggles)

**Routing:**
- React Router v6 (SPA navigation)
- Routes: `/student/dashboard`, `/student/course/:courseType/:taskId`

### 4.2. Backend Stack

**Technology:**
- Node.js v18.20.5 LTS
- Express (API framework)
- MongoDB with Mongoose (primary database)
- SQLite (local Memory Layer for offline)

**API Endpoints:**
See Section 5 for detailed API specifications.

### 4.3. Database Schemas (Epic-Specific)

**StudentProgress Collection:**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,            // Reference to User
  courseId: ObjectId,             // Reference to Courses
  moduleId: ObjectId,             // Current module
  chapterId: ObjectId,            // Current chapter
  contentItemId: ObjectId,        // Current task
  status: String,                 // "not_started", "in_progress", "completed"
  score: Number,                  // Percentage or points
  timeSpent: Number,              // Minutes
  coinsEarned: Number,            // ISF Coins from this task
  completedAt: Date,
  lastAccessedAt: Date,
  offlineProgress: Boolean,       // True if completed offline, pending sync
  syncedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**CoinTransactions Collection:**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,            // Reference to User
  transactionType: String,        // "task_completion", "quiz_pass", "coach_award"
  amount: Number,                 // Positive (earning)
  reason: String,                 // Description (e.g., "Completed Typing Game")
  relatedTaskId: ObjectId,        // Reference to task or quiz
  awardedBy: ObjectId,            // Reference to Coach (if manual award)
  timestamp: Date,
  offlineTransaction: Boolean,    // True if earned offline
  syncedAt: Date
}
```

**Submissions Collection:**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,            // Reference to User
  courseId: ObjectId,             // Reference to Courses
  taskId: ObjectId,               // Reference to ContentItem
  submissionType: String,         // "art", "video", "voice", "quiz"
  fileUrl: String,                // S3 URL for media files
  metadata: {
    duration: Number,             // For video/voice (seconds)
    fileSize: Number,             // Bytes
    dimensions: {                 // For art
      width: Number,
      height: Number
    }
  },
  status: String,                 // "pending", "graded", "rejected"
  grade: {
    score: Number,                // 0-100
    coinsAwarded: Number,
    feedback: String,
    gradedBy: ObjectId,           // Reference to Coach
    gradedAt: Date
  },
  submittedAt: Date,
  offlineSubmission: Boolean,     // True if submitted offline
  syncedAt: Date
}
```

**SQLite Offline Schema (Student Memory Layer):**
```sql
CREATE TABLE offline_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  studentId TEXT NOT NULL,
  courseId TEXT NOT NULL,
  taskId TEXT NOT NULL,
  status TEXT NOT NULL,
  score INTEGER,
  timeSpent INTEGER,
  coinsEarned INTEGER,
  completedAt TEXT,
  synced INTEGER DEFAULT 0,      -- 0: not synced, 1: synced
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE offline_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  studentId TEXT NOT NULL,
  courseId TEXT NOT NULL,
  taskId TEXT NOT NULL,
  submissionType TEXT NOT NULL,
  localFilePath TEXT,            -- Path to local file (before S3 upload)
  metadata TEXT,                 -- JSON string
  submittedAt TEXT,
  synced INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE offline_coins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  studentId TEXT NOT NULL,
  transactionType TEXT NOT NULL,
  amount INTEGER NOT NULL,
  reason TEXT,
  relatedTaskId TEXT,
  timestamp TEXT,
  synced INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### 4.4. External Integrations

**Artweaver (Art Course):**
- Launch via Electron IPC: `ipcRenderer.send('launch-artweaver', { canvasSize: { width: 1280, height: 720 } })`
- Canvas mirroring: Screenshot polling every 2 seconds or IPC event on save
- USB graphics pad: Detected automatically by Artweaver

**Educational Tools (Computer Apps):**
- Tux Typing: Launch via Electron `child_process.spawn()`
- GCompris: Launch via Electron `child_process.spawn()`
- Track launch time and exit time for session duration

**WebRTC (Video/Audio Recording):**
- Webcam access: `navigator.mediaDevices.getUserMedia({ video: true, audio: true })`
- MediaRecorder API for video capture
- Audio-only recording for voice notes
- File storage: Local blob → S3 upload

---

## 5. API Endpoints (Epic-Specific)

**Base URL:** `/api/v2/lms/student`

### 5.1. Student Progress APIs

**GET `/api/v2/lms/student/:studentId/dashboard`**
- **Purpose:** Fetch student dashboard data (coin balance, notifications, last activity)
- **Response:**
```json
{
  "student": {
    "id": "student123",
    "name": "Ravi Kumar",
    "faceId": "face_embed_hash",
    "coinBalance": 1250,
    "sessionStartTime": "2025-10-24T08:00:00Z"
  },
  "notifications": [
    {
      "id": "notif1",
      "message": "Coach Priya graded your artwork!",
      "timestamp": "2025-10-24T10:30:00Z",
      "read": false
    }
  ],
  "lastActivity": {
    "courseType": "Computer Apps",
    "taskTitle": "Typing Game - Level 3",
    "progress": 80,
    "taskId": "task456"
  },
  "courses": [
    {
      "type": "Computer Apps",
      "icon": "💻",
      "color": "orange",
      "totalTasks": 120,
      "completedTasks": 45,
      "progress": 37.5
    }
  ]
}
```

**GET `/api/v2/lms/student/:studentId/courses/:courseType`**
- **Purpose:** Fetch course structure (apps, levels, tasks for Computer Apps; modes for Art, etc.)
- **Response:**
```json
{
  "courseType": "Computer Apps",
  "apps": [
    {
      "id": "app1",
      "name": "MS Word",
      "icon": "word_icon.png",
      "levels": [
        {
          "id": "level1",
          "name": "Level 1 - Basics",
          "tasks": [
            {
              "id": "task1",
              "title": "Create a Letter",
              "status": "completed",
              "score": 95,
              "coinsEarned": 50,
              "timeSpent": 12
            }
          ]
        }
      ]
    }
  ]
}
```

**POST `/api/v2/lms/student/:studentId/progress`**
- **Purpose:** Update student progress (task completion, time spent, coins earned)
- **Request Body:**
```json
{
  "courseId": "course123",
  "taskId": "task456",
  "status": "completed",
  "score": 85,
  "timeSpent": 15,
  "coinsEarned": 40,
  "offlineProgress": false
}
```
- **Response:**
```json
{
  "success": true,
  "updatedCoinBalance": 1290,
  "message": "Progress saved successfully!"
}
```

### 5.2. Submission APIs

**POST `/api/v2/lms/student/:studentId/submissions`**
- **Purpose:** Submit artwork, video, or voice note
- **Request:** Multipart form-data
  - `file`: Media file (image, video, audio)
  - `courseId`: string
  - `taskId`: string
  - `submissionType`: "art" | "video" | "voice"
  - `metadata`: JSON string { duration, fileSize, dimensions }
- **Response:**
```json
{
  "success": true,
  "submissionId": "sub789",
  "fileUrl": "https://s3.amazonaws.com/isf-playground/submissions/sub789.mp4",
  "message": "Submission received! Coach will grade soon."
}
```

**GET `/api/v2/lms/student/:studentId/submissions/:submissionId/status`**
- **Purpose:** Check grading status of submission
- **Response:**
```json
{
  "submissionId": "sub789",
  "status": "graded",
  "grade": {
    "score": 90,
    "coinsAwarded": 80,
    "feedback": "Excellent work, Ravi! Keep it up!",
    "gradedBy": "Coach Priya",
    "gradedAt": "2025-10-24T11:00:00Z"
  }
}
```

### 5.3. Coin APIs

**GET `/api/v2/lms/student/:studentId/coins/balance`**
- **Purpose:** Fetch current coin balance
- **Response:**
```json
{
  "studentId": "student123",
  "coinBalance": 1250,
  "lastTransaction": {
    "amount": 50,
    "reason": "Completed Typing Game",
    "timestamp": "2025-10-24T10:00:00Z"
  }
}
```

**GET `/api/v2/lms/student/:studentId/coins/transactions`**
- **Purpose:** Fetch transaction history
- **Response:**
```json
{
  "transactions": [
    {
      "id": "txn1",
      "type": "task_completion",
      "amount": 50,
      "reason": "Completed Typing Game",
      "taskTitle": "Typing Game - Level 3",
      "timestamp": "2025-10-24T10:00:00Z"
    },
    {
      "id": "txn2",
      "type": "coach_award",
      "amount": 80,
      "reason": "Excellent artwork submission",
      "awardedBy": "Coach Priya",
      "timestamp": "2025-10-24T09:00:00Z"
    }
  ],
  "totalCoins": 1250
}
```

---

## 6. Dependencies

### 6.1. Internal Dependencies (ISF Playground Modules)

**Prerequisite (Must be Complete):**
- **Sprint 1.1 RBAC:** Student authentication via facial recognition
- **Sprint 1.1 FR:** FaceEmbedding model and frService for student login

**Parallel (Can develop simultaneously):**
- **Epic 02 (Admin Course Management):** Provides courses for students to access
- **Epic 03 (Coach Functionality):** Receives submissions for grading

### 6.2. External Dependencies

**Software:**
- **Artweaver:** Must be installed on student PCs (Art Course)
- **Tux Typing:** Must be installed on student PCs (Computer Apps)
- **GCompris:** Must be installed on student PCs (Computer Apps)

**Hardware:**
- **USB Graphics Pad:** Optional but recommended for Art Course
- **Webcam:** Required for Spoken English video recording

**Services:**
- **AWS S3:** For storing media files (artwork, videos, voice notes)
- **MongoDB Atlas:** Primary database for progress tracking
- **WebRTC:** Browser API for video/audio recording

---

## 7. Success Criteria

### 7.1. Functional Success Metrics

- [ ] **100% Course Type Coverage:** All 4 course types (Computer Apps, Art, Spoken English, Life Skills) functional
- [ ] **Task Completion Workflow:** Student can start task → complete task → earn coins → view updated balance
- [ ] **Offline Mode:** Student can complete tasks offline, sync automatically when online
- [ ] **Submission Workflow:** Student can submit artwork/video/voice → Coach receives submission → Coach grades → Student sees result + coins
- [ ] **Real-Time Coin Balance:** Title Bar displays real-time coin balance (updates within 2 seconds of earning)
- [ ] **Leaderboard:** Computer Apps leaderboard displays top 10 students in Balagruha

### 7.2. Technical Success Metrics

- [ ] **Performance:** Course content loads in < 3 seconds
- [ ] **Offline Sync:** Offline data syncs successfully within 5 seconds of coming online
- [ ] **Media Upload:** Video/audio/artwork uploads to S3 within 10 seconds
- [ ] **External Tool Launch:** Artweaver/Tux Typing/GCompris launches within 3 seconds
- [ ] **Canvas Mirroring:** Artweaver canvas updates in ISF Playground within 2 seconds

### 7.3. Quality Gates

Each story must pass:
1. **Development Complete:** All tasks checked off, code committed
2. **Unit Tests:** 80%+ coverage for business logic
3. **E2E Tests:** Critical paths tested (login → task completion → coin earning)
4. **Code Review:** Peer-reviewed, no critical issues
5. **Performance Check:** Meets NFR targets on test hardware
6. **RBAC Check:** Student can only access own data, cannot access Admin/Coach routes
7. **Offline Check:** Works without internet, syncs correctly when online
8. **QA Approval:** Quality gate YAML status: PASS

### 7.4. User Acceptance Criteria

- [ ] Student can complete a full task workflow without assistance
- [ ] Coin earning animation is visually appealing and clear
- [ ] Error messages are child-friendly and encouraging
- [ ] UI is colorful, engaging, and free of complex text
- [ ] External tools (Artweaver, Tux Typing) integrate seamlessly

---

## 8. Risks & Mitigation

### 8.1. Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Artweaver integration complexity | High | High | Early POC in Week 1; fallback to web-based drawing tool (Canvas API) if needed |
| USB graphics pad compatibility | Medium | Medium | Test with multiple pad models; mouse fallback if pad unavailable |
| WebRTC browser compatibility | Low | Medium | Use polyfills; test on Chromium-based Electron |
| Offline sync conflicts | Medium | Medium | Implement conflict resolution UI; admin override capability |
| S3 upload failures | Medium | High | Retry queue with exponential backoff; local storage until successful |

### 8.2. User Experience Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Students confused by complex UI | Medium | High | User testing with target age group (8-15); simplify based on feedback |
| Coin earning not motivating | Low | Medium | A/B test coin amounts and animations; adjust based on engagement |
| External tool launches fail | Medium | High | Clear error messages; automatic retry; fallback to in-app alternatives |

---

## 9. Open Questions & Decisions Needed

### 9.1. Client Clarifications Required

1. **Artweaver Installation:** Will Artweaver be pre-installed on all student PCs? Which version?
2. **Graphics Pad Models:** Which specific graphics pad models will be used? (For driver compatibility testing)
3. **Canvas Size:** What should be the default canvas size for art tasks? (Resolution: 1280x720? 1920x1080?)
4. **External Tool Versions:** Which versions of Tux Typing and GCompris should we support?

### 9.2. Technical Decisions

1. **Canvas Mirroring Approach:** Screenshot polling (every 2 seconds) or IPC events on save? (Polling is simpler but higher overhead)
2. **Offline Media Storage:** How much disk space can we assume for offline video/artwork storage? (Recommend 5GB minimum)
3. **Coin Animation Library:** Use Lottie animations or CSS transitions? (Lottie is richer but larger bundle size)

---

## 10. Related Documents

- **Sprint 2 MPSD:** `docs/epics/sprint-2-master-plan.md`
- **Sprint 2 Design System:** `docs/design-systems/sprint-2-lms-design-system.md`
- **Sprint 1.1 RBAC Context:** `.ai/sprint-1.1/rbac-refactor-context.md`
- **Sprint 1.1 FR Context:** `.ai/sprint-1.1/fr-rebuild-context.md`

---

## 11. Approval & Sign-Off

**Epic Owner:** Dev Team Lead
**Reviewed By:** Product Owner, QA Lead
**Status:** Draft - Awaiting Story Breakdown

---

**Next Steps:**
1. Create 6 story files from this epic (one per story)
2. Generate E2E test templates for each story
3. Create quality gate YAML files for each story
4. Assign stories to developers for implementation

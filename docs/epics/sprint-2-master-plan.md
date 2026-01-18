# Sprint 2 - Master Plan Specification Document (MPSD)

**Project:** ISF Playground - Sprint 2
**Version:** 1.0 (Standalone)
**Date:** October 24, 2025
**Last Updated:** 2025-10-24 13:36:50
**Sprint Duration:** 30 Days
**Branch:** feature/sprint-2
**Parent Branch:** feature/sprint-1.1-fr-rebuild (RBAC + FR foundation)

---

## Document Control

**Status:** Draft - Awaiting Review
**Created By:** BMad Orchestrator
**Review Required By:** Product Owner, Technical Lead, QA Lead

---

## 1. Sprint 2 Overview

### 1.1. Purpose of This Master Plan

This Master Plan Specification Document (MPSD) serves as the comprehensive blueprint for ISF Playground Sprint 2. It defines the complete Learning Management System (LMS), enhanced Amma role capabilities, and system-wide communication features. This document is the **single source of truth** for all development, design, testing, and deployment activities in Sprint 2.

### 1.2. Sprint 2 Focus: LMS & Communication Platform

Sprint 2 builds upon the authentication foundation established in Sprint 1.1 (RBAC + Facial Recognition). This sprint delivers a full-featured Learning Management System enabling:

- **Students** to learn through 4 distinct course types and earn digital ISF Coins
- **Admins** to create, manage, and translate comprehensive course content
- **Coaches** to assign courses, grade submissions, and track student progress
- **Ammas** to manage student queries with SLA enforcement and voice communication
- **All roles** to communicate via voice notes and receive real-time notifications

### 1.3. Sprint 2 Goals & Objectives

**Primary Goals:**

1. **Deliver Functional LMS Core** - Course management (creation, assignment, content population), student enrollment, and assessment functionalities
2. **Enable Rich Student Learning** - Interactive platform for 4 course types (Computer Apps, Art, Spoken English, Life Skills) with voice/UI interaction and offline capability
3. **Integrate ISF Coin Rewards** - Digital coin earning system through LMS completion and coach grading
4. **Enhance Amma Role** - Individual accounts, improved query handling with SLA management, voice communication
5. **Provide Tracking & Reporting** - Dashboards for coaches/admins to monitor student performance and system health
6. **Strengthen System Foundation** - RBAC enforcement, offline-first architecture, error management with PM role

**Success Metrics:**
- 100% of planned course types functional
- Course creation to student access < 5 minutes
- All grading workflows operational
- Voice note feature working across all roles
- 95% offline functionality for student activities
- Zero critical security vulnerabilities

---

## 2. Target Users & Personas

### **Student**
- **Primary LMS consumer** - Accesses courses via facial recognition
- Interacts with 4 course types via voice and minimal UI
- Completes tasks, takes quizzes, records performances
- Earns digital ISF Coins for achievements
- Views progress and coin balance in real-time

### **Coach**
- **Learning facilitator** - Assigns Admin-created courses to Balagruhas or specific students
- Grades subjective work (Art, Spoken English) via "Syllabus Tracker"
- Manually awards ISF Coins based on effort and quality
- Monitors student progress through LMS reports
- Communicates via chat and voice notes

### **Administrator (Admin)**
- **System orchestrator** - Exclusive rights to create, edit, populate, publish, and archive courses
- Manages all user accounts including Amma registration approval
- Sets system-wide ISF Coin reward rules
- Views comprehensive system-wide reports
- Sends broadcast messages to all students
- Manages WhatsApp integration for schedule notifications

### **Amma**
- **Student support specialist** - Individual account with enhanced dashboard
- Manages student queries with reclassification and multi-tagging
- Resolves tasks under SLA-based management with auto-reassignment
- Communicates via voice notes
- Views child well-being insights

### **Playground Manager (PM)**
- **System health monitor** - NEW ROLE in Sprint 2
- Receives all application errors as assigned tasks
- Investigates and resolves system issues
- Manages stakeholder feedback and suggestions
- Ensures platform stability

---

## 3. High-Level Sprint 2 Scope

### 3.1. What's IN SCOPE for Sprint 2

#### **A. LMS - Student Experience**

**Student Homepage & Navigation:**
- Homepage with persistent Title Bar (coin balance, notifications, session timer)
- Toolbar with emotion emojis, voice chat, homework buttons
- Four main course category buttons (Computer Apps, Art, Spoken English, Life Skills)
- Auto-resume incomplete tasks from previous sessions
- SPA-style navigation without page reloads

**Computer Apps Courses:**
- Three-pane layout (apps list, levels, tasks)
- Task status indicators (completed, in-progress, not started)
- Performance metrics: time taken, ISF coins earned, ranking
- Integration with external web-based educational tools
- Ranking system comparing student performance

**Art Courses:**
- Artweaver integration for digital drawing
- USB graphics pad support
- Real-time canvas mirroring in ISF Playground
- Four modes: Workshops, Free Sketch, Art Stories, Competition
- Submit artwork for coach grading

**Spoken English Courses:**
- Webcam-based video recording interface
- Record, preview, re-record, and submit performances
- Poetry recitation and speech activities
- Video storage and coach review workflow

**Life Skills Courses:**
- Voice note responses (WhatsApp-style press-and-hold)
- Multiple choice questions with audio playback
- Quiz system with delayed feedback (full quiz results only)
- Mandatory playback before submission

**ISF Coin Wallet:**
- Digital accumulation in student wallet
- Real-time balance display in Title Bar
- Transaction history logging
- Earn through: course completion, quiz passing, coach grading

#### **B. LMS - Admin & Coach Functionalities**

**Course Management (Admin Only):**
- Create courses with hierarchical structure (Modules → Chapters → Content Items)
- Drag-and-drop reordering
- Course metadata: title, description, category, thumbnail, difficulty
- Save as Draft or Publish
- Archive courses while retaining data
- Multi-language support (English, Hindi, Marathi)

**Content Management (Admin Only):**
- Upload diverse content types: Video, PDF, Documents, Images, Audio, Text, Links
- Rich text editor for text content
- External link integration (YouTube, educational sites)
- Quiz embedding within chapters
- ISF Coin reward configuration per content item

**Quiz System (Admin Only):**
- Multiple question types: Multiple Choice, True/False, Fill-in-the-Blanks, Short Answer
- Audio buttons for question options (voice playback)
- Passing score configuration (default 100%)
- Maximum attempts configuration (default unlimited)
- Auto-grading for objective questions

**Course Assignment (Admin & Coach):**
- Assign to entire Balagruhas
- Assign to individual students (personalized learning paths)
- Optional start and due dates
- Bulk assignment capabilities

**Coach Grading (Coach Only):**
- "Syllabus Tracker" interface for pending submissions
- Grade subjective tasks: Art, Spoken English, Short Answer
- Manual ISF Coin award (discretionary amounts)
- Optional text or voice note feedback
- Keyboard shortcuts for efficiency
- Badge notifications for pending submissions

**Course Reporting (Admin & Coach):**
- Performance dashboards with filters
- Student-level progress tracking
- Module & chapter completion breakdown
- Quiz performance analytics
- ISF Coin distribution tracking
- PDF and CSV export capabilities
- Admin: system-wide view; Coach: Balagruha-scoped view

**Translation Module (Admin Only):**
- Multi-language support for course content
- Admin provides translations for: titles, descriptions, quiz questions, content
- Supported languages: English, Hindi, Marathi
- Graceful fallback to primary language if translation missing
- Student language preference selector in profile

#### **C. Amma & Communication Features**

**Individual Amma Accounts:**
- Self-registration workflow with form submission
- Admin approval process with review interface
- Pending/Approved/Rejected status management
- Individual login credentials per Amma
- Amma-specific dashboard (per client UI mockups)

**Enhanced Query Handling:**
- Reclassify queries (change primary category)
- Reassign queries to other Balagruhas' Ammas
- Multi-tagging system for better categorization
- Query history and status tracking
- Searchable query database

**SLA-Based Task Management:**
- Admin-configurable SLA times per task type
- Automatic tracking of time since assignment
- Auto-reassignment if SLA breached
- Notifications to new assignee and original Amma
- Admin emergency override for manual reassignment
- Visual SLA timer in task interface

**Voice Communication:**
- WhatsApp-style press-and-hold recording
- Maximum 1 minute duration per note
- Available for all roles: Student, Coach, Admin, Amma
- Notification on receipt
- Voice note history and playback

**Admin Broadcast ("Mann ki Baat"):**
- Admin-exclusive feature to send messages to all students
- Support for text or voice note broadcasts
- Special featured display for students
- Broadcast history tracking

#### **D. System-Wide Features**

**In-App Notification Center:**
- Dual-display system:
  - Global bell icon in header with total unread count
  - Contextual badges on feature buttons (Chat, Syllabus Tracker, etc.)
- Dropdown panel with recent notifications
- Unread/Read visual distinction
- Mark all as read functionality
- Actionable notifications (click to navigate to relevant page)
- Auto-mark as read on click
- Notification types: Course assigned, Grade received, Voice note, Order confirmed, etc.

**Automated WhatsApp Notifications:**
- Integration with WhatsApp Business API (Twilio or 360dialog)
- Trigger: Admin publishes daily schedule
- Auto-send schedule to Balagruha WhatsApp groups
- Secure storage of WhatsApp group numbers per Balagruha
- Success/failure logging for troubleshooting
- Retry queue for failed sends

**Playground Manager (PM) Role:**
- NEW role for system health monitoring
- Global error handler captures all errors (frontend & backend)
- Auto-create task for PM on any error
- Task includes: error message, stack trace, user context, timestamp
- PM dashboard to view all assigned error tasks
- Task status tracking: New, In Progress, Resolved
- Child-friendly error messages for students (positive language)

**Child-Friendly Error Messages:**
- Abstracted from technical error codes
- Positive, encouraging language
- Examples:
  - Network error: "Oops! The magic internet wires seem to be tangled. Please try again in a moment!"
  - Content loading error: "Hmm, this activity seems to be sleeping. We'll wake it up! Please tell your Coach."
  - Submission error: "Whoa! The submission machine hiccupped. Let's try sending that again!"

### 3.2. What's OUT OF SCOPE for Sprint 2

**Explicitly Excluded:**
1. **Continuous "Always-On" Facial Recognition** - Only at assessment start, not during
2. **System-Wide Archiving Framework** - Limited to course archiving only
3. **Full UI Internationalization** - Limited to translating course content only (not UI elements)
4. **Life Skills "Learn then Test" Expanded Model** - Minimum viewing time requirements
5. **Task "Revision Mode" for Half Coins** - New state for revisiting completed tasks
6. **AI-Powered Transcription & Translation** - Auto-transcribe voice notes with AI

**Sprint 5 Features (Already Complete in Production):**
- ISF Shop module (product catalog, shopping cart, checkout)
- Inventory management system
- Coin spending functionality
- Coin distribution reports
- Order history and fulfillment tracking

---

## 4. Sprint 2 UI Overview

**Last Updated:** 2025-10-24 13:36:50

This section provides a high-level overview of all user interfaces in Sprint 2. For detailed design patterns, component specifications, and implementation guidelines, refer to the **Sprint 2 LMS Design System** (`docs/design-systems/sprint-2-lms-design-system.md`).

### 4.1. Design Philosophy

Sprint 2 follows the child-friendly, colorful design patterns established in the WTF module and Sprint 5 Shop. Key principles:

- **Patrick Hand Font** for handwritten, approachable feel
- **Vibrant Color Palette** with role-specific colors (Student: blue/orange/green, Admin: purple, Coach: blue, Amma: pink)
- **Pill-Shaped Buttons** with rounded corners (rounded-full, rounded-lg)
- **Minimal Text** with large, clear icons
- **Persistent Context** via Title Bars showing coins, notifications, session timers
- **Responsive Layouts** supporting 1366x768 (primary) and higher resolutions
- **Offline-First** with clear online/offline status indicators

### 4.2. Student Screens

#### **Student Homepage** (`/student/dashboard`)

**Purpose:** Primary navigation hub for all learning activities

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo]              [Coins: 1250] [🔔 3] [⏱ 00:45:32]      │ ← Title Bar
├─────────────────────────────────────────────────────────────┤
│ [😊] [😢] [🎤 Voice Chat] [📚 Homework] [❓ Help]         │ ← Toolbar
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│    │ 💻      │  │ 🎨      │  │ 🗣️      │  │ 🌟      │   │
│    │Computer │  │  Art    │  │ Spoken  │  │  Life   │   │
│    │  Apps   │  │         │  │ English │  │ Skills  │   │
│    └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
│                                                             │
│    Resume Last Activity:                                   │
│    [▶ Computer Apps - Typing Game (80% complete)]         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Four course category buttons with distinct colors (Computer Apps: orange, Art: pink, Spoken English: blue, Life Skills: green)
- Persistent Title Bar with real-time coin balance, notification count, session timer
- Emotion Toolbar for quick student mood tracking
- Auto-resume card for incomplete tasks
- Voice chat button for immediate Amma communication

**References:** Design System sections 5.1 (Title Bar), 5.2 (Toolbar), 8.1 (Student Course Cards)

---

#### **Computer Apps Course Page** (`/student/course/computer-apps/:appId`)

**Purpose:** Three-pane task navigation for Computer Apps

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Title Bar (persistent)                                      │
├─────────┬───────────┬───────────────────────────────────────┤
│ Apps    │ Levels    │ Task Details                          │
│ List    │ List      │                                       │
├─────────┼───────────┼───────────────────────────────────────┤
│ MS Word │ Level 1   │ Task: Create a Letter                 │
│ ✓ (20)  │ ✓ (5)     │ Time: 12 mins | Coins: 50           │
│         │           │                                       │
│ Excel   │ Level 2   │ [Start Task] or [Open External Tool] │
│ (15)    │ (5)       │                                       │
│         │           │ Ranking: #3 in your Balagruha        │
│ PowerPt │ Level 3   │ Leaderboard: [View All Rankings]     │
│ (18)    │ (5)       │                                       │
└─────────┴───────────┴───────────────────────────────────────┘
```

**Key Features:**
- Three-column layout (Apps → Levels → Tasks)
- Status indicators: ✓ (completed), progress counts (e.g., "5/20")
- Launch external tools (Tux Typing, GCompris) or in-app tasks
- Performance metrics: time taken, coins earned, ranking position
- Leaderboard comparison with peers

**References:** Design System section 8.2 (Three-Pane Layout)

---

#### **Art Course Page** (`/student/course/art/:mode`)

**Purpose:** Four modes of art learning (Workshops, Free Sketch, Art Stories, Competition)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Title Bar (persistent)                                      │
├─────────────────────────────────────────────────────────────┤
│  [Workshops] [Free Sketch] [Art Stories] [Competition]     │ ← Mode Pills
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Workshop: "Drawing Faces"                                 │
│  Instructor: Coach Priya                                   │
│                                                             │
│  [Launch Artweaver] ← Opens external drawing app           │
│                                                             │
│  Canvas Preview (Real-time mirroring):                     │
│  ┌───────────────────────────────────────────┐             │
│  │                                           │             │
│  │   [Real-time canvas from Artweaver]       │             │
│  │                                           │             │
│  └───────────────────────────────────────────┘             │
│                                                             │
│  [Submit Artwork for Grading]                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Mode selection pills (Workshop, Free Sketch, Art Stories, Competition)
- Launch Artweaver with USB graphics pad support
- Real-time canvas mirroring in ISF Playground window
- Submit artwork button triggers coach grading workflow
- Video preview of workshop instructions

**References:** Design System section 8.3 (Art Canvas Integration)

---

#### **Spoken English Course Page** (`/student/course/spoken-english/:taskId`)

**Purpose:** Video recording interface for poetry and speech

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Title Bar (persistent)                                      │
├─────────────────────────────────────────────────────────────┤
│  Task: Recite "Twinkle Twinkle Little Star"               │
│  Instructions: [▶ Play Audio Instructions]                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────┐             │
│  │                                           │             │
│  │   [Webcam Preview / Recorded Video]       │             │
│  │                                           │             │
│  └───────────────────────────────────────────┘             │
│                                                             │
│  [● Record] [■ Stop] [▶ Preview] [↻ Re-Record]            │
│  [✓ Submit to Coach]                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Audio playback for task instructions
- Webcam-based video recording with preview
- Record, stop, preview, re-record workflow
- Submit button sends video to coach for grading
- Video player with playback controls

**References:** Design System section 8.4 (Video Recording Interface)

---

#### **Life Skills Course Page** (`/student/course/life-skills/:taskId`)

**Purpose:** Voice note responses and MCQ quizzes

**Layout (Voice Task):**
```
┌─────────────────────────────────────────────────────────────┐
│ Title Bar (persistent)                                      │
├─────────────────────────────────────────────────────────────┤
│  Question: "What did you learn from the story?"            │
│  [▶ Play Question Audio] [Played: Yes ✓]                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Your Response (Voice Note):                               │
│  ┌───────────────────────────────────────────┐             │
│  │   [Press & Hold to Record] 🎤              │             │
│  │                                           │             │
│  │   Recording: ●●●●●●●● (8 sec / 60 sec)   │             │
│  └───────────────────────────────────────────┘             │
│                                                             │
│  Recorded Notes:                                           │
│  [▶ 0:08] [🗑️ Delete]                                     │
│                                                             │
│  [Submit Response]                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Layout (Quiz Task):**
```
┌─────────────────────────────────────────────────────────────┐
│ Title Bar (persistent)                                      │
├─────────────────────────────────────────────────────────────┤
│  Quiz: "Understanding Emotions"                            │
│  Question 3 of 10                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  What is empathy?                                          │
│                                                             │
│  ○ Understanding others' feelings                          │
│  ○ Feeling happy all the time                              │
│  ○ Being angry at someone                                  │
│  ○ Ignoring people                                         │
│                                                             │
│  [Next Question]                                           │
│                                                             │
│  Progress: ████████░░ (80%)                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Audio playback with mandatory listening enforcement (disabled Submit until played)
- WhatsApp-style press-and-hold voice recording (max 60 seconds)
- Waveform visualization during recording
- Playback preview before submission
- MCQ with radio buttons and progress indicator
- Quiz results shown ONLY after full quiz completion (delayed feedback)

**References:** Design System sections 8.5 (Voice Recording Interface), 8.6 (Quiz Question Card)

---

### 4.3. Admin Screens

#### **Admin Course Management Dashboard** (`/admin/courses`)

**Purpose:** Overview of all courses with CRUD operations

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Admin Panel Header [Purple]                                │
├─────────────────────────────────────────────────────────────┤
│  [+ Create New Course]  [Filters ▼] [Search: ___________] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Course Cards (Grid):                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │ 💻 Comp  │  │ 🎨 Art   │  │ 🗣️ Eng  │                │
│  │ Apps     │  │ Workshop │  │ Poetry   │                │
│  │ Advanced │  │ Basics   │  │ Level 1  │                │
│  │ [Edit]   │  │ [Edit]   │  │ [Edit]   │                │
│  │ [Delete] │  │ [Delete] │  │ [Delete] │                │
│  └──────────┘  └──────────┘  └──────────┘                │
│                                                             │
│  Status Filters: [All] [Published] [Draft] [Archived]     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Purple admin panel styling (distinct from student blue)
- Create, Edit, Delete, Archive operations
- Filter by status (Published, Draft, Archived)
- Search by course title, category, or keywords
- Grid layout with thumbnail, title, category badge

**References:** Design System section 9.1 (Admin Purple Theme)

---

#### **Admin Course Builder** (`/admin/courses/create` or `/admin/courses/:courseId/edit`)

**Purpose:** Hierarchical course content creation (Module → Chapter → Content Item)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Admin Panel Header [Purple]                                │
│ Course: "Advanced Computer Apps" [Save Draft] [Publish]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Course Metadata:                                          │
│  Title: [_____________________]                            │
│  Category: [Computer Apps ▼]                               │
│  Difficulty: [○ Beginner ● Intermediate ○ Advanced]        │
│  Thumbnail: [Upload Image]                                 │
│                                                             │
│  Course Structure (Drag-to-Reorder):                       │
│  ┌─ Module 1: Introduction to MS Word                      │
│  │  ├─ Chapter 1: Opening and Saving Files                │
│  │  │  ├─ Video: "How to Open MS Word"                    │
│  │  │  ├─ Task: "Open and Save a Document"                │
│  │  │  └─ Quiz: "File Management Basics"                  │
│  │  └─ Chapter 2: Formatting Text                         │
│  │     ├─ Video: "Bold, Italic, Underline"                │
│  │     └─ Task: "Format a Paragraph"                      │
│  └─ [+ Add Module]                                         │
│                                                             │
│  [+ Add Chapter] [+ Add Content Item]                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Hierarchical tree view with expand/collapse
- Drag-and-drop reordering at all levels (Module, Chapter, Content Item)
- Add, Edit, Delete at any level
- Save as Draft vs. Publish workflow
- Content item types: Video, Document, Task, Quiz, Voice Note
- Metadata fields: title, description, category, difficulty, thumbnail

**References:** Design System section 9.2 (Course Builder Tree)

---

#### **Admin Content Upload Interface** (`/admin/courses/:courseId/content/upload`)

**Purpose:** Bulk upload videos, images, PDFs, audio files

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Admin Panel Header [Purple]                                │
│ Upload Content for: "Advanced Computer Apps"              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Content Type: [Video ▼] [Image] [PDF] [Audio]            │
│                                                             │
│  ┌───────────────────────────────────────────┐             │
│  │   Drag & Drop Files Here                  │             │
│  │   or [Browse Files]                       │             │
│  └───────────────────────────────────────────┘             │
│                                                             │
│  Upload Queue:                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ✓ video1.mp4 (12 MB) - Uploaded                    │   │
│  │ ⏳ video2.mp4 (45 MB) - Uploading... 67%            │   │
│  │ ⏸️ document1.pdf (2 MB) - Paused                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Pause All] [Resume All] [Clear Completed]               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Drag-and-drop or file browser upload
- Multi-file upload queue with progress indicators
- File type filters (Video, Image, PDF, Audio)
- Upload status: Completed (✓), In Progress (⏳), Paused (⏸️), Failed (❌)
- Pause, Resume, Cancel individual or all uploads
- Automatic AWS S3 integration with CDN URL generation

**References:** Design System section 9.3 (Drag-and-Drop Upload)

---

#### **Admin Translation Module** (`/admin/courses/:courseId/translate`)

**Purpose:** Add Telugu translations for course content

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Admin Panel Header [Purple]                                │
│ Translate Course: "Advanced Computer Apps"                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Content Items Requiring Translation:                      │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Video Title: "How to Open MS Word"                 │   │
│  │ English: [How to Open MS Word]                     │   │
│  │ Telugu:  [___________________________]             │   │
│  │                                                     │   │
│  │ Description:                                        │   │
│  │ English: [This video teaches you...]               │   │
│  │ Telugu:  [___________________________]             │   │
│  │                                                     │   │
│  │ [✓ Mark as Translated] [Skip]                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Translation Progress: ████████░░ (80%)                    │
│  [Save Progress] [Publish Translations]                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Side-by-side English and Telugu fields
- Mark as Translated or Skip workflow
- Translation progress indicator
- Save Progress vs. Publish Translations
- Support for text, video titles, descriptions, quiz questions

**References:** Design System section 9.4 (Translation Interface)

---

#### **Admin Reports Dashboard** (`/admin/reports`)

**Purpose:** System-wide analytics (student progress, coin distribution, course completion)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Admin Panel Header [Purple]                                │
│ Reports Dashboard                                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Student Progress] [Coin Distribution] [Course Analytics] │
│  [Coach Performance] [Amma SLA Tracking] [System Health]   │
│                                                             │
│  Student Progress Report:                                  │
│  Filters: [Balagruha ▼] [Date Range: ___] [Course ▼]     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Chart: Student Completion Rates (Bar Chart)        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Student Table:                                            │
│  ┌──────────────┬──────────┬───────────┬─────────────┐    │
│  │ Student Name │ Course   │ Progress  │ Coins Earned│    │
│  ├──────────────┼──────────┼───────────┼─────────────┤    │
│  │ Ravi Kumar   │ Comp App │ 85%       │ 1250        │    │
│  │ Priya Singh  │ Art      │ 65%       │ 800         │    │
│  └──────────────┴──────────┴───────────┴─────────────┘    │
│                                                             │
│  [Export CSV] [Export PDF] [Print]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Tab navigation for different report types
- Filter panels (Balagruha, date range, course, student)
- Data visualization (bar charts, pie charts, line graphs)
- Tabular data with sortable columns
- Export options (CSV, PDF, Print)
- Real-time data refresh

**References:** Design System section 9.5 (Admin Reports)

---

### 4.4. Coach Screens

#### **Coach Dashboard** (`/coach/dashboard`)

**Purpose:** Overview of assigned students, courses, and grading queue

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Coach Panel Header [Blue]                                  │
│ Welcome, Coach Priya!                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Quick Stats:                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │ 24       │  │ 8        │  │ 12       │                │
│  │ Students │  │ Pending  │  │ Courses  │                │
│  │ Assigned │  │ Grading  │  │ Active   │                │
│  └──────────┘  └──────────┘  └──────────┘                │
│                                                             │
│  Pending Grading (Priority):                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🎨 Art - "Draw a Tree" - Ravi Kumar (2 days ago)   │   │
│  │ [View Submission] [Grade Now]                      │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 🗣️ Spoken English - "Poem Recitation" - Priya     │   │
│  │ [View Video] [Grade Now]                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Assign New Course] [View Syllabus Tracker] [Reports]    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Quick stats cards (students assigned, pending grading, active courses)
- Grading queue sorted by submission date (oldest first)
- One-click access to submissions (view artwork, play video, listen audio)
- Grade Now button opens grading modal
- Navigation to Syllabus Tracker (main grading interface)

**References:** Design System section 10.1 (Coach Dashboard)

---

#### **Coach Course Assignment Interface** (`/coach/assign-course`)

**Purpose:** Assign Admin-created courses to Balagruhas or specific students

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Coach Panel Header [Blue]                                  │
│ Assign Course to Students                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Select Course:                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │ 💻 Comp  │  │ 🎨 Art   │  │ 🗣️ Eng  │                │
│  │ Apps     │  │ Workshop │  │ Poetry   │                │
│  │ Advanced │  │ Basics   │  │ Level 1  │                │
│  │ [Select] │  │ [Select] │  │ [Select] │                │
│  └──────────┘  └──────────┘  └──────────┘                │
│                                                             │
│  Selected: "Advanced Computer Apps"                        │
│                                                             │
│  Assign To:                                                │
│  ○ Entire Balagruha: [Balagruha 1 ▼]                      │
│  ● Specific Students:                                      │
│     ☑ Ravi Kumar (123)                                     │
│     ☑ Priya Singh (124)                                    │
│     ☐ Amit Patel (125)                                     │
│     ☐ Neha Gupta (126)                                     │
│                                                             │
│  Due Date: [__________] (Optional)                         │
│                                                             │
│  [Assign Course]                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Course selection from Admin-published courses
- Assignment target: Entire Balagruha or Specific Students
- Multi-select checkboxes for student selection
- Optional due date for course completion
- Confirmation message after assignment

**References:** Design System section 10.2 (Course Assignment)

---

#### **Coach Syllabus Tracker (Grading Interface)** (`/coach/syllabus-tracker`)

**Purpose:** Grade Art and Spoken English submissions, award ISF Coins

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Coach Panel Header [Blue]                                  │
│ Syllabus Tracker - Grading Interface                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Filter: [Art ▼] [Balagruha 1 ▼] [Pending ▼]             │
│                                                             │
│  Submission: "Draw a Tree" by Ravi Kumar                   │
│  Course: Art Workshop Basics | Submitted: 2025-10-20      │
│                                                             │
│  ┌───────────────────────────────────────────┐             │
│  │                                           │             │
│  │   [Student's Artwork Preview]             │             │
│  │   (Image from Artweaver submission)       │             │
│  │                                           │             │
│  └───────────────────────────────────────────┘             │
│                                                             │
│  Grading:                                                  │
│  Quality: ○ Excellent ● Good ○ Needs Improvement          │
│  ISF Coins to Award: [50] (Range: 0-100)                  │
│  Feedback (Optional): [_____________________________]     │
│                                                             │
│  [Save Grade & Award Coins] [Skip] [Flag for Review]      │
│                                                             │
│  Navigation: [← Previous] [Next →]                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Filter by course type, Balagruha, grading status
- Preview submissions: images (Art), videos (Spoken English), audio (Life Skills)
- Quality rating system (Excellent, Good, Needs Improvement)
- Manual ISF Coin award (0-100 range, coach discretion)
- Optional text feedback for student
- Navigation between submissions (Previous, Next)
- Save Grade triggers coin award and notification to student

**References:** Design System section 10.3 (Syllabus Tracker Grading)

---

### 4.5. Amma Screens

#### **Amma Dashboard** (`/amma/dashboard`)

**Purpose:** Manage student queries, track SLA tasks, view well-being insights

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Amma Panel Header [Pink]                                   │
│ Welcome, Amma Lakshmi!                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Quick Stats:                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │ 15       │  │ 3        │  │ 8        │                │
│  │ Open     │  │ Overdue  │  │ Resolved │                │
│  │ Queries  │  │ SLA      │  │ Today    │                │
│  └──────────┘  └──────────┘  └──────────┘                │
│                                                             │
│  Priority Tasks (SLA-Based):                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ⚠️ URGENT: Query from Ravi Kumar (Due in 30 mins)  │   │
│  │ Category: Emotional Support | Tags: Anxiety, Home  │   │
│  │ [View Details] [Respond with Voice Note]           │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 🟡 Query from Priya Singh (Due in 2 hours)         │   │
│  │ Category: Academic Help | Tags: Math, Homework     │   │
│  │ [View Details] [Respond with Voice Note]           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [View All Queries] [Student Well-Being Report]           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Pink Amma panel styling (distinct from blue Coach and purple Admin)
- Quick stats: Open Queries, Overdue SLA, Resolved Today
- Priority task list sorted by SLA urgency (red: urgent, yellow: due soon)
- Query categorization (Emotional Support, Academic Help, Technical Issue, Other)
- Multi-tagging for granular tracking
- Voice note response option
- Student well-being insights dashboard

**References:** Design System section 11.1 (Amma Dashboard)

---

#### **Amma Query Management Interface** (`/amma/queries/:queryId`)

**Purpose:** Respond to student queries with voice notes, reclassify, reassign

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ Amma Panel Header [Pink]                                   │
│ Query #1234 from Ravi Kumar                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Student Message (Voice Note):                             │
│  [▶ 0:45] "I'm feeling sad because..."                    │
│                                                             │
│  Query Details:                                            │
│  Category: [Emotional Support ▼]                           │
│  Tags: [Anxiety] [Home] [+ Add Tag]                       │
│  Priority: ● High ○ Medium ○ Low                           │
│  SLA Due: 2025-10-24 14:30 (⚠️ 30 minutes remaining)      │
│                                                             │
│  Your Response:                                            │
│  ┌───────────────────────────────────────────┐             │
│  │   [Press & Hold to Record Voice Note] 🎤  │             │
│  │   Recording: ●●●●●●●● (8 sec / 120 sec)  │             │
│  └───────────────────────────────────────────┘             │
│                                                             │
│  Recorded Responses:                                       │
│  [▶ 0:32] "Don't worry, Ravi..." [🗑️ Delete]             │
│                                                             │
│  Actions:                                                  │
│  [Send Response & Close Query]                             │
│  [Send Response & Keep Open]                               │
│  [Reassign to Another Amma]                                │
│  [Escalate to Coach]                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Audio playback of student's voice note query
- Reclassify query category and add/remove tags
- Priority level adjustment
- SLA timer with visual urgency indicator (red when < 1 hour)
- Voice note response recording (max 120 seconds)
- Multiple response options: Close Query, Keep Open, Reassign, Escalate
- Auto-reassignment if SLA breached

**References:** Design System section 11.2 (Query Management)

---

### 4.6. Playground Manager (PM) Screens

#### **PM Error Dashboard** (`/pm/dashboard`)

**Purpose:** Monitor all application errors, resolve system issues

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ PM Panel Header [Red]                                      │
│ System Health Dashboard                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Error Summary:                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │ 5        │  │ 12       │  │ 3        │                │
│  │ Critical │  │ Warnings │  │ Resolved │                │
│  │ Errors   │  │          │  │ Today    │                │
│  └──────────┘  └──────────┘  └──────────┘                │
│                                                             │
│  Error Tasks (Priority):                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🔴 CRITICAL: Course content not loading            │   │
│  │ User: Ravi Kumar (Student) | Time: 10:45 AM       │   │
│  │ Error: "MongoDB connection timeout"                │   │
│  │ [View Stack Trace] [Mark as In Progress]          │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 🟡 WARNING: Slow S3 upload speed                   │   │
│  │ User: Coach Priya | Time: 11:20 AM                │   │
│  │ [View Details] [Mark as In Progress]              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [View All Errors] [System Logs] [Performance Metrics]    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Red PM panel styling (distinct from other roles)
- Error summary cards: Critical Errors, Warnings, Resolved Today
- Priority error list sorted by severity (red: critical, yellow: warning, gray: info)
- Error details: user context, timestamp, error message, stack trace
- Task status: New, In Progress, Resolved
- Navigation to system logs and performance metrics
- Auto-create task for every caught error (frontend & backend)

**References:** Design System section 12.1 (PM Error Dashboard)

---

### 4.7. Common UI Components

#### **Title Bar (Student View)**

**Always visible across all student screens:**

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo: ISF]    [Coin: 💰 1,250]  [🔔 3]  [⏱️ 00:45:32]     │
└─────────────────────────────────────────────────────────────┘
```

- **Logo**: ISF Playground branding
- **Coin Balance**: Real-time ISF Coin count with gold coin icon
- **Notifications**: Bell icon with unread count badge
- **Session Timer**: Active session duration (resets daily)

#### **Toolbar (Student View)**

**Below Title Bar, consistent across all screens:**

```
┌─────────────────────────────────────────────────────────────┐
│ [😊] [😢] [😡] [🎤 Voice Chat] [📚 Homework] [❓ Help]    │
└─────────────────────────────────────────────────────────────┘
```

- **Emotion Emojis**: Quick mood tracking (Happy, Sad, Angry)
- **Voice Chat**: Immediate communication with Amma
- **Homework**: View assigned tasks and deadlines
- **Help**: Contextual help and tutorials

#### **Navigation Pills (Admin/Coach/Amma)**

**Horizontal pill navigation for secondary pages:**

```
[Overview] [Students] [Reports] [Settings]
```

- Active pill: filled background (blue-600, purple-600, pink-600)
- Inactive pills: outline style with hover effect

---

### 4.8. Responsive Behavior

**Primary Target:** 1366x768 (14-inch laptop, common in Indian schools)

**Breakpoints:**
- `sm`: 640px (mobile, rare for this app)
- `md`: 768px (tablets, vertical mode)
- `lg`: 1024px (small laptops)
- `xl`: 1280px (standard laptops)
- `2xl`: 1536px (large monitors)

**Key Responsive Strategies:**
- Student course cards: 2 columns on mobile, 4 columns on desktop
- Admin course builder: collapsible sidebar on smaller screens
- Coach grading interface: stacked layout on tablets, side-by-side on desktop
- Amma query list: full-width cards on mobile, grid on desktop

---

### 4.9. Accessibility Considerations

- **Keyboard Navigation**: Tab through all interactive elements
- **Screen Reader Support**: ARIA labels on all buttons, inputs, images
- **Color Contrast**: WCAG AA compliance (4.5:1 for text, 3:1 for large text)
- **Focus Indicators**: Visible focus ring on all interactive elements
- **Alt Text**: Descriptive alt text for all images and icons
- **Voice Alternatives**: Text transcripts for all audio/video content

---

### 4.10. References to Design System

This UI Overview provides high-level screen descriptions. For detailed implementation specifications, refer to:

**Design System Document:** `docs/design-systems/sprint-2-lms-design-system.md`

**Key Sections:**
- Section 4: Color Palette (role-specific colors)
- Section 5: Typography (Patrick Hand font usage)
- Section 6: Button Components (pill buttons, primary/secondary)
- Section 7: Form Components (inputs, dropdowns, checkboxes)
- Section 8: LMS-Specific Patterns (course cards, quiz interface, voice recording)
- Section 9: Admin Patterns (purple theme, drag-and-drop, translation UI)
- Section 10: Coach Patterns (grading interface, assignment UI)
- Section 11: Amma Patterns (pink theme, query management)
- Section 12: PM Patterns (red theme, error dashboard)

---

## 5. Technical Architecture

### 5.1. Technology Stack

**Frontend:**
- Electron.js (desktop application)
- React v19.0.0 (UI framework)
- Vite (build tool)
- WebRTC (video/audio recording)

**Backend:**
- Node.js v18.20.5 LTS
- Express (API framework)
- MongoDB with Mongoose (primary database)
- SQLite (local Memory Layer for offline)

**Facial Recognition:**
- @vladmandic/human v3.3.6
- TensorFlow.js backend

**Media Storage:**
- AWS S3 (videos, images, audio, documents)

**Authentication & Authorization:**
- JWT tokens (24-hour expiry)
- Role-Based Access Control (RBAC)
- Session timeout after 30 minutes inactivity

**Third-Party Integrations:**
- WhatsApp Business API (Twilio or 360dialog)
- Artweaver (external drawing application)
- USB Graphics Pad drivers

### 5.2. Architecture Principles

**Offline-First for Students:**
- Core learning interactions function without internet
- Progress saved to local SQLite database
- Queue submissions for sync when online
- 7-day offline operation capability

**Data Synchronization:**
- Automatic sync when connection available
- Conflict resolution for offline changes
- Transaction logging for audit trail
- Atomic operations for data integrity

**Performance Targets:**
- Target hardware: Core i3 4th Gen, 8GB DDR3 RAM, 256GB SSD, 1366x768
- App load time < 10 seconds
- UI interaction response < 200ms
- Course content load < 3 seconds
- Video start < 5 seconds
- Cart operations < 500ms

**Security Requirements:**
- RBAC enforcement at API and UI levels
- Facial recognition at assessment start
- Password hashing with bcrypt
- HTTPS for all API communications
- Input sanitization for XSS prevention
- Prepared statements for SQL injection prevention

**Scalability:**
- Stateless backend for horizontal scaling
- Support 500+ concurrent students
- Handle 10,000+ course content items
- Store 1 million+ coin transactions
- Manage 100GB+ media storage

### 5.3. Database Architecture

**MongoDB Collections (New/Updated for Sprint 2):**

**Courses:**
```javascript
{
  _id: ObjectId,
  title: { en: String, hi: String, mr: String },
  description: { en: String, hi: String, mr: String },
  category: String, // 'computer-apps', 'art', 'spoken-english', 'life-skills'
  thumbnail: String, // S3 URL
  status: String, // 'draft', 'published', 'archived'

  modules: [{
    moduleId: String,
    title: { en: String, hi: String, mr: String },
    order: Number,
    chapters: [{
      chapterId: String,
      title: { en: String, hi: String, mr: String },
      order: Number,
      contentItems: [{
        itemId: String,
        type: String, // 'video', 'document', 'quiz', 'audio', 'image', 'text', 'link'
        title: String,
        url: String,
        duration: Number,
        coinReward: {
          enabled: Boolean,
          amount: Number,
          condition: String // 'completion', 'passing-grade'
        }
      }]
    }]
  }],

  assignments: [{
    balagruhaId: ObjectId,
    studentIds: [ObjectId],
    startDate: Date,
    dueDate: Date
  }],

  metrics: {
    totalEnrolled: Number,
    avgCompletion: Number,
    avgScore: Number,
    totalCoinsAwarded: Number
  },

  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

**Quizzes:**
```javascript
{
  _id: ObjectId,
  courseId: ObjectId,
  chapterId: String,
  title: { en: String, hi: String, mr: String },

  questions: [{
    questionId: String,
    type: String, // 'multiple-choice', 'true-false', 'fill-blank', 'short-answer'
    question: { en: String, hi: String, mr: String },
    options: [{ en: String, hi: String, mr: String }], // For MC/TF
    correctAnswer: String,
    audioUrl: String, // Optional audio playback
    order: Number
  }],

  passingScore: Number, // Default 100
  maxAttempts: Number, // Default unlimited (-1)
  coinReward: Number,

  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

**Student Progress:**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  courseId: ObjectId,

  enrolledDate: Date,
  lastAccessedDate: Date,
  completionPercentage: Number,

  moduleProgress: [{
    moduleId: String,
    completed: Boolean,
    chapterProgress: [{
      chapterId: String,
      completed: Boolean,
      contentItemProgress: [{
        itemId: String,
        status: String, // 'not-started', 'in-progress', 'completed'
        startedAt: Date,
        completedAt: Date,
        timeSpent: Number, // seconds
        coinsEarned: Number
      }]
    }]
  }],

  quizAttempts: [{
    quizId: ObjectId,
    attemptNumber: Number,
    score: Number,
    passed: Boolean,
    answers: [Mixed],
    completedAt: Date
  }],

  submissions: [{
    submissionId: ObjectId,
    taskType: String, // 'art', 'spoken-english', 'short-answer'
    fileUrl: String, // S3
    submittedAt: Date,
    status: String, // 'pending', 'graded'
    grade: String,
    coinsAwarded: Number,
    feedback: String,
    gradedBy: ObjectId,
    gradedAt: Date
  }]
}
```

**Amma Accounts:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to Users collection
  registrationStatus: String, // 'pending', 'approved', 'rejected'
  assignedBalagruhas: [ObjectId],

  queries: [{
    queryId: ObjectId,
    studentId: ObjectId,
    category: String,
    tags: [String],
    description: String,
    status: String, // 'open', 'in-progress', 'resolved'
    slaDeadline: Date,
    reassignments: [{
      fromAmmaId: ObjectId,
      toAmmaId: ObjectId,
      reason: String,
      timestamp: Date
    }],
    createdAt: Date,
    updatedAt: Date
  }],

  approvedBy: ObjectId,
  approvedAt: Date
}
```

**Coin Transactions:**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  type: String, // 'earn', 'spend', 'adjust', 'refund'
  category: String, // 'course-completion', 'quiz-passed', 'assignment-graded', etc.
  amount: Number,
  balanceBefore: Number,
  balanceAfter: Number,

  reference: {
    model: String, // 'Course', 'Quiz', 'Submission', 'Order'
    id: ObjectId
  },

  metadata: {
    description: String,
    performedBy: ObjectId,
    notes: String
  },

  status: String, // 'pending', 'completed', 'failed', 'reversed'
  timestamp: Date
}
```

**Notifications:**
```javascript
{
  _id: ObjectId,
  recipientId: ObjectId,
  type: String, // 'course-assigned', 'grade-received', 'voice-note', 'broadcast'
  title: String,
  body: String,
  icon: String,
  actionUrl: String, // Navigation target

  isRead: Boolean,
  readAt: Date,
  createdAt: Date,

  metadata: {
    sourceId: ObjectId,
    sourceType: String
  }
}
```

**PM Tasks (Error Tracking):**
```javascript
{
  _id: ObjectId,
  type: String, // 'system-error', 'feedback', 'suggestion'
  priority: String, // 'low', 'medium', 'high', 'critical'
  status: String, // 'new', 'in-progress', 'resolved', 'closed'

  errorDetails: {
    message: String,
    stack: String,
    userId: ObjectId,
    route: String,
    timestamp: Date,
    environment: String // 'frontend', 'backend'
  },

  assignedTo: ObjectId, // PM user ID
  assignedAt: Date,
  resolvedBy: ObjectId,
  resolvedAt: Date,
  resolution: String
}
```

**SQLite Schema (Local Memory Layer - Offline Storage):**

```sql
-- Student Session
CREATE TABLE StudentSession (
  id INTEGER PRIMARY KEY,
  studentId TEXT,
  sessionStart DATETIME,
  lastActivity DATETIME,
  activeTaskId TEXT
);

-- Course Progress (Offline Cache)
CREATE TABLE CourseProgress (
  id INTEGER PRIMARY KEY,
  studentId TEXT,
  courseId TEXT,
  moduleId TEXT,
  chapterId TEXT,
  contentItemId TEXT,
  status TEXT, -- 'not-started', 'in-progress', 'completed'
  timeSpent INTEGER,
  coinsEarned INTEGER,
  startedAt DATETIME,
  completedAt DATETIME,
  syncedToMongo BOOLEAN DEFAULT 0
);

-- Offline Submission Queue
CREATE TABLE SubmissionQueue (
  id INTEGER PRIMARY KEY,
  studentId TEXT,
  taskType TEXT,
  filePath TEXT, -- Local file path before S3 upload
  submittedAt DATETIME,
  syncedToMongo BOOLEAN DEFAULT 0,
  retryCount INTEGER DEFAULT 0
);

-- Coin Balance (Offline Cache)
CREATE TABLE CoinWallet (
  studentId TEXT PRIMARY KEY,
  totalBalance INTEGER,
  lastSyncedAt DATETIME
);
```

---

## 6. Epic Breakdown

Sprint 2 is organized into **5 primary epics**, each containing multiple stories:

### **Epic 01: LMS Student Experience**
**Focus:** Student-facing learning interfaces for all 4 course types

**Stories:**
1. Student Homepage & Course Navigation
2. Computer Apps Course Interaction
3. Art Course + Artweaver Integration
4. Spoken English Video Recording
5. Life Skills Voice Responses
6. ISF Coin Wallet Display & Accumulation

**Estimated Effort:** 40-50 hours

---

### **Epic 02: LMS Admin Course Management**
**Focus:** Admin-exclusive course creation and content management tools

**Stories:**
1. Course Creation & Structure Builder (Modules/Chapters)
2. Content Management Module (Upload Video/PDF/Audio/Images/Text/Links)
3. Quiz System & Assessment Builder
4. Translation Module (Multi-language Support)
5. Course Publishing & Archiving Workflow

**Estimated Effort:** 35-45 hours

---

### **Epic 03: LMS Coach Functionality**
**Focus:** Coach tools for assignment, grading, and progress tracking

**Stories:**
1. Course Assignment Interface (Balagruhas + Individual Students)
2. Syllabus Tracker & Grading Interface
3. Manual ISF Coin Award System
4. Coach Reporting Dashboard (Balagruha-scoped)

**Estimated Effort:** 25-30 hours

---

### **Epic 04: Amma Role Enhancement**
**Focus:** Enhanced Amma capabilities with SLA management

**Stories:**
1. Individual Amma Accounts & Self-Registration Workflow
2. Enhanced Query Management (Reclassify, Reassign, Multi-tag)
3. SLA-Based Task Management with Auto-Reassignment
4. Amma Dashboard (Client UI Implementation)

**Estimated Effort:** 20-25 hours

---

### **Epic 05: System-Wide Features**
**Focus:** Cross-cutting features for communication, notifications, and error handling

**Stories:**
1. In-App Notification Center (Dual-Display System)
2. Voice Communication Infrastructure (All Roles)
3. Admin Broadcast System ("Mann ki Baat")
4. WhatsApp Integration for Schedule Notifications
5. Playground Manager Role & Error Handling System
6. Course Reporting System (Admin System-Wide View)

**Estimated Effort:** 30-40 hours

---

**Total Estimated Effort:** 150-190 hours (19-24 development days for a single developer)

---

## 7. Non-Functional Requirements

### 7.1. Performance Requirements

**Application Performance:**
- Initial app launch: < 10 seconds
- Course content load: < 3 seconds
- Shop page load: < 2 seconds (existing Sprint 5)
- Cart operations: < 500ms (existing Sprint 5)
- Video start: < 5 seconds
- UI interactions: < 200ms response time

**Target Hardware:**
- CPU: Core i3, 4th Generation
- RAM: 8GB DDR3
- Storage: 256GB SSD
- Display: 1366x768 resolution, 17/18.5 inch monitor

**Memory Management:**
- No memory leaks during extended use
- Reasonable memory footprint
- Profiling and optimization for target hardware

### 7.2. Security Requirements

**Authentication:**
- Facial recognition for students at login and assessment start
- JWT tokens with 24-hour expiry
- Session timeout after 30 minutes inactivity
- Password hashing with bcrypt

**Authorization:**
- Role-Based Access Control (RBAC) enforced at API and UI levels
- No user can access endpoints/features without proper role
- Admin emergency override logged and auditable

**Data Protection:**
- Encryption at rest for sensitive data
- HTTPS for all API communications
- Input sanitization for XSS prevention
- SQL injection prevention with prepared statements

**Assessment Security:**
- Facial recognition check at quiz/test start (NOT continuous)
- Attempt tracking and validation
- Time-based quiz expiry

### 7.3. Accessibility Standards

**Target:** WCAG 2.1 Level AA compliance

**Key Requirements:**
- Keyboard navigation support for all interactive elements
- Screen reader compatibility (ARIA labels)
- Sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
- Clear focus indicators
- Alternative text for meaningful images
- Form labels properly associated with inputs

### 7.4. Offline Capabilities

**Student Offline Mode:**
- Course content cached locally in SQLite
- Progress tracked offline
- Submissions queued for sync
- 7-day offline operation target

**Synchronization:**
- Automatic sync when internet available
- Conflict resolution for offline changes
- Transaction logging for audit
- User notification of sync status

### 7.5. Scalability Requirements

**Concurrent Users:** Support 500+ simultaneous students across all Balagruhas

**Data Growth:**
- 10,000+ course content items
- 1,000+ shop products (existing Sprint 5)
- 1 million+ coin transactions
- 100GB+ media storage in S3

**Database Optimization:**
- Efficient queries with proper indexing
- Aggregation pipeline optimization
- Transactional integrity for coin operations

### 7.6. Branding & UI/UX Standards

**Branding:**
- ISF Playground logo consistent across all modules
- Color palette: Primary - Green, Secondary - Blue, Accent - Gray
- Typography: Consistent font families as per ISF Brand Document

**Responsive Design:**
- Primary target: 1366x768 (desktop Electron app)
- Graceful content reflow if window resized
- No horizontal scrolling

**UI Mockups:**
- **CRITICAL:** All dashboards and interfaces MUST strictly match client-provided UI mockups
- Client mockups are the definitive source of truth for UI implementation
- No deviations without client approval

**Standardized Components:**
- Buttons: Minimum 100x100px, states (default, hover, active, disabled, loading)
- Forms: Placeholder text, focus states, inline validation
- Modals: Header, body, footer structure
- Toast notifications: Success (green), Error (red), Warning (yellow), Info (blue)
- Loading states: Spinners for async operations
- Empty states: User-friendly messages with CTAs

---

## 8. Development Timeline & Milestones

### Week 1 (Days 1-7): Foundation & Student Core

**Student Experience Team:**
- Days 1-2: Student homepage & navigation structure
- Days 3-4: Computer Apps course framework
- Days 5-7: Art course + Artweaver integration POC

**Admin/Coach Team:**
- Days 1-3: Course creation interface & data models
- Days 4-7: Content management module (file uploads, S3 integration)

**Shared:**
- Day 1: ISF Coin wallet system architecture
- Days 6-7: First integration checkpoint

---

### Week 2 (Days 8-14): Course Types & Grading

**Student Experience Team:**
- Days 8-9: Spoken English video recording
- Days 10-11: Life Skills with voice notes
- Days 12-14: Quiz system (student attempt interface)

**Admin/Coach Team:**
- Days 8-10: Quiz builder (admin interface)
- Days 11-12: Course assignment interface
- Days 13-14: Syllabus Tracker & grading interface

**Shared:**
- Days 8-10: Notification center infrastructure
- Day 14: Second integration checkpoint

---

### Week 3 (Days 15-21): Amma & System Features

**Student Experience Team:**
- Days 15-16: Coin balance updates & transaction history
- Days 17-18: Offline mode implementation & testing

**Admin/Coach Team:**
- Days 15-17: Translation module
- Days 18-19: Course reporting dashboard
- Days 20-21: Manual coin award workflow

**Amma/System Team:**
- Days 15-16: Amma self-registration & approval workflow
- Days 17-18: Query management & SLA system
- Days 19-20: Voice communication infrastructure
- Day 21: WhatsApp integration setup

---

### Week 4 (Days 22-30): Integration, Testing & Refinement

**All Teams:**
- Days 22-23: PM role implementation & error handling
- Days 24-25: End-to-end integration testing
- Days 26-27: Performance optimization for target hardware
- Days 28-29: Bug fixes and UAT preparation
- Day 30: Documentation finalization & deployment preparation

---

### Critical Path Dependencies

1. **RBAC & FR Foundation** (Sprint 1.1) - COMPLETE - Prerequisite for all features
2. **Coin Wallet System** (Day 1-5) - Blocks LMS rewards and reporting
3. **Course Data Model** (Day 1-3) - Blocks all course-related features
4. **Notification System** (Day 8-12) - Required for voice notes, grading alerts
5. **Course Creation** must precede **Course Assignment**
6. **Course Assignment** must precede **Coach Grading**
7. **Content Upload** must precede **Student Content Access**

---

## 9. Testing Strategy

### 9.1. Test Coverage Requirements

- **Unit Testing:** Minimum 80% code coverage
- **Integration Testing:** All API endpoints tested
- **E2E Testing:** Critical user journeys covered
- **Performance Testing:** Load testing with 100 concurrent users
- **Security Testing:** RBAC enforcement, input validation
- **Accessibility Testing:** WCAG 2.1 Level AA compliance checks

### 9.2. Critical Test Scenarios

**LMS Critical Paths:**
1. Student login → Course selection → Task completion → Coin earning
2. Admin course creation → Assignment → Student access → Coach grading
3. Student art submission → Coach grading → Coin award → Balance update
4. Quiz creation → Student attempt → Auto-grading → Coin reward
5. Voice note recording → Sending → Notification → Receiving → Playback

**Amma Critical Paths:**
1. Amma self-registration → Admin approval → Login → Dashboard access
2. Query creation → Amma assignment → SLA tracking → Resolution
3. Query reclassification → Reassignment → Notification → New Amma access
4. SLA breach → Auto-reassignment → Notifications to both Ammas

**System Critical Paths:**
1. Error occurs → PM task created → PM notification → Resolution → Close
2. Admin publishes schedule → WhatsApp API call → Message sent to groups
3. Student earns coins → Balance updates → Notification sent → UI updates

**Offline/Sync Critical Paths:**
1. Student offline → Complete task → Save to SQLite → Come online → Sync to MongoDB
2. Student offline → Submit art → Queue locally → Come online → Upload to S3 → Update status

### 9.3. Quality Gates

Each story must pass the following quality gates before Story DONE:

1. **Development Complete** - All tasks checked off, code committed
2. **Unit Tests Pass** - 80%+ coverage, all tests green
3. **Code Review Approved** - Peer review, no blocking comments
4. **E2E Tests Pass** - All test cases executed and passed
5. **Accessibility Check** - WCAG 2.1 AA validation
6. **Performance Check** - Meets NFR targets on test hardware
7. **Security Check** - No critical vulnerabilities, RBAC enforced
8. **QA Approval** - Quality gate YAML status: PASS

---

## 10. Risk Assessment & Mitigation

### 10.1. Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Artweaver integration complexity | High | High | Early POC in Week 1; fallback to web-based drawing tool if needed |
| WhatsApp API approval delays | Medium | Medium | Implement email notifications as backup; start approval process immediately |
| Offline sync conflicts | Medium | Medium | Implement conflict resolution UI; admin override capability |
| Performance on target hardware | Medium | High | Continuous profiling; optimization sprint in Week 4; lazy loading |
| USB graphics pad compatibility | Medium | Medium | Test with multiple pad models; mouse fallback if pad unavailable |

### 10.2. Resource Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Sprint 1.1 testing delays blocking Sprint 2 | Low | High | Sprint 2 can proceed in parallel; merge Sprint 1.1 fixes as needed |
| Course content creation bottleneck | Medium | Medium | Admin training on course builder; provide templates and examples |
| Translation resource availability | High | Low | Graceful fallback to English; translation can be added post-launch |

### 10.3. Dependency Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Third-party API changes (WhatsApp) | Low | Medium | Abstract API calls behind service layer; easy provider switch |
| Artweaver software updates | Low | Low | Lock specific version in documentation; test before updates |
| MongoDB performance degradation | Low | High | Implement proper indexing; monitor query performance; consider sharding |

---

## 11. Sprint 2 Success Criteria

### 11.1. Functional Success Metrics

**LMS Core:**
- ✅ 100% of planned course types (Computer Apps, Art, Spoken English, Life Skills) functional
- ✅ Course creation to student access workflow < 5 minutes
- ✅ All grading workflows operational (auto-graded quizzes + manual coach grading)
- ✅ Translation system working with 3 languages

**Student Experience:**
- ✅ Student can complete full learning cycle: login → course → task → earn coins
- ✅ 95% offline functionality for student learning activities
- ✅ Coin balance updates in real-time after earning events
- ✅ Auto-resume incomplete tasks on login

**Coach/Admin:**
- ✅ Admin can create, publish, and archive courses
- ✅ Coach can assign courses to Balagruhas or individual students
- ✅ Coach can grade submissions and manually award coins
- ✅ Reports generate accurately with PDF export

**Amma:**
- ✅ Amma self-registration and approval workflow operational
- ✅ Query management with SLA tracking functional
- ✅ Auto-reassignment triggers on SLA breach
- ✅ Voice note communication working

**System-Wide:**
- ✅ Notification center displays all notification types correctly
- ✅ Voice notes can be recorded, sent, and received across all roles
- ✅ PM receives error tasks automatically
- ✅ WhatsApp integration sends schedule notifications

### 11.2. Technical Success Metrics

**Performance:**
- ✅ App runs smoothly on target hardware (Core i3, 8GB RAM)
- ✅ All NFR targets met (load times, response times)
- ✅ No memory leaks during extended testing

**Security:**
- ✅ Zero critical security vulnerabilities
- ✅ RBAC enforcement validated for all roles
- ✅ Facial recognition at assessment start functional

**Quality:**
- ✅ 80%+ unit test coverage
- ✅ All critical E2E tests passing
- ✅ WCAG 2.1 Level AA compliance achieved
- ✅ All quality gates passed for all stories

**Documentation:**
- ✅ Complete API documentation (endpoints, request/response)
- ✅ Database schema documentation
- ✅ Admin user guide for course creation
- ✅ Coach user guide for grading
- ✅ Deployment guide

### 11.3. Sprint Completion Checklist

**Code:**
- [ ] All story code merged to `feature/sprint-2` branch
- [ ] No merge conflicts with `develop` branch
- [ ] Code review completed for all PRs
- [ ] All unit tests passing
- [ ] All integration tests passing

**Testing:**
- [ ] All E2E test cases executed
- [ ] All quality gates status: PASS
- [ ] UAT completed with stakeholders
- [ ] Performance testing on target hardware completed
- [ ] Security audit completed

**Documentation:**
- [ ] All story files updated with Dev Agent Record
- [ ] All E2E test documents completed
- [ ] All quality gate YAMLs finalized
- [ ] API documentation complete
- [ ] User guides created

**Deployment:**
- [ ] Database migration scripts prepared
- [ ] Environment variables documented
- [ ] S3 buckets configured
- [ ] WhatsApp API credentials configured
- [ ] Rollback plan documented

**Approval:**
- [ ] Product Owner sign-off
- [ ] Technical Lead sign-off
- [ ] QA Lead sign-off
- [ ] Stakeholder demo completed

---

## 12. Open Questions & Decisions Needed

### 12.1. Client Clarifications Required

**LMS:**
1. **Life Skills "Learn then Test":** Should we implement a basic version requiring minimum viewing time before quiz access?
2. **Translation Resources:** Do you have in-house translators, or should we integrate with a translation service API?
3. **Course Content:** What is the expected initial course catalog size at Sprint 2 launch?

**Amma:**
1. **SLA Configuration:** What should be default SLA times for different query types?
2. **SLA Breach Escalation:** Should breached tasks escalate to Admin/Coach, or only reassign to another Amma?

**WhatsApp:**
1. **API Provider:** Preference for Twilio vs 360dialog?
2. **Group Numbers:** Who will provide and maintain the WhatsApp group numbers for each Balagruha?
3. **Message Format:** Should schedule messages include images, or text only?

**Artweaver:**
1. **Installation:** Will Artweaver be pre-installed on all student PCs?
2. **Graphics Pads:** Which specific graphics pad models will be used?
3. **Canvas Size:** What should be the default canvas size for art tasks?

### 12.2. Technical Decisions

**Offline Sync:**
- What happens if student completes a task offline, but task is deleted by admin before sync?
- Conflict resolution strategy: Server wins, Client wins, or Manual review?

**Coin Economy:**
- Should there be daily/weekly coin earning limits?
- Can admins manually adjust student coin balances? If yes, should it be auditable?

**Course Archiving:**
- Should archived courses be hidden from students, or shown as "No longer available"?
- Can archived courses be restored, or is it permanent?

---

## 13. Appendix

### Appendix A: API Endpoint Summary

**LMS APIs (`/api/v2/lms`):**
```
Courses:
GET    /courses                      - List all courses (role-filtered)
POST   /courses                      - Create new course (Admin only)
GET    /courses/:id                  - Get course details
PUT    /courses/:id                  - Update course (Admin only)
DELETE /courses/:id                  - Archive course (Admin only)
POST   /courses/:id/assign           - Assign course to students
POST   /courses/:id/content          - Add content item (Admin only)
PUT    /courses/:id/content/:itemId  - Update content item (Admin only)

Quizzes:
POST   /courses/:id/quizzes          - Create quiz (Admin only)
GET    /quizzes/:id                  - Get quiz details
POST   /quizzes/:id/attempt          - Submit quiz attempt (Student)

Progress:
GET    /student/progress             - Get student's course progress
POST   /student/progress             - Update progress (automatic)

Grading:
GET    /grading/pending              - Get pending submissions (Coach)
POST   /grading/:submissionId        - Submit grade and coins (Coach)

Voice Notes:
POST   /voice-notes                  - Upload voice note
GET    /voice-notes                  - Get voice notes for user

Reporting:
GET    /reports/course-summary       - Get course analytics (Admin/Coach)
GET    /reports/export               - Export report (PDF/CSV)
```

**Amma APIs (`/api/v2/amma`):**
```
Registration:
POST   /register                     - Submit Amma registration
GET    /pending-approvals            - List pending Ammas (Admin)
POST   /approve/:id                  - Approve Amma account (Admin)
POST   /reject/:id                   - Reject Amma application (Admin)

Queries:
GET    /queries                      - List queries for Amma
POST   /queries/:id/reclassify       - Reclassify query
POST   /queries/:id/reassign         - Reassign query to another Amma
POST   /queries/:id/tags             - Add/remove tags
POST   /queries/:id/resolve          - Mark query as resolved

SLA:
GET    /tasks/sla-status             - Get SLA status for all tasks
POST   /tasks/:id/emergency-reassign - Admin emergency reassign
```

**System APIs (`/api/v2/system`):**
```
Notifications:
GET    /notifications                - Get user notifications
POST   /notifications/:id/read       - Mark notification as read
POST   /notifications/read-all       - Mark all as read

PM Tasks:
GET    /pm/tasks                     - Get PM tasks (PM only)
POST   /pm/tasks/:id/status          - Update task status
POST   /errors                       - Log error (auto-called)

WhatsApp:
POST   /whatsapp/send-schedule       - Trigger schedule notification (Admin)
```

### Appendix B: Database Indexes

**Critical Indexes for Performance:**

```javascript
// Courses
db.courses.createIndex({ status: 1, category: 1 });
db.courses.createIndex({ 'assignments.balagruhaId': 1 });
db.courses.createIndex({ 'assignments.studentIds': 1 });

// Student Progress
db.studentProgress.createIndex({ studentId: 1, courseId: 1 }, { unique: true });
db.studentProgress.createIndex({ courseId: 1, completionPercentage: 1 });

// Quizzes
db.quizzes.createIndex({ courseId: 1, chapterId: 1 });

// Coin Transactions
db.coinTransactions.createIndex({ studentId: 1, timestamp: -1 });
db.coinTransactions.createIndex({ type: 1, category: 1, timestamp: -1 });

// Notifications
db.notifications.createIndex({ recipientId: 1, isRead: 1, createdAt: -1 });

// Amma Queries
db.ammaQueries.createIndex({ status: 1, slaDeadline: 1 });
db.ammaQueries.createIndex({ assignedAmmaId: 1, status: 1 });

// PM Tasks
db.pmTasks.createIndex({ status: 1, priority: 1, createdAt: -1 });
```

### Appendix C: Environment Variables

**Required Configuration:**

```bash
# Node Environment
NODE_ENV=production
PORT=5001

# Database
MONGODB_URI=mongodb://localhost:27017/isfplayground
SQLITE_DB_PATH=./local-data/memory-layer.db

# JWT
JWT_SECRET=<secure-random-string>
JWT_EXPIRY=24h

# AWS S3
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_S3_BUCKET=isf-playground-media
AWS_REGION=ap-south-1

# Facial Recognition
FR_MODEL_PATH=./models/human
FR_CONFIDENCE_THRESHOLD=0.85

# WhatsApp Business API
WHATSAPP_PROVIDER=twilio # or '360dialog'
WHATSAPP_API_KEY=<key>
WHATSAPP_API_SECRET=<secret>
WHATSAPP_FROM_NUMBER=<number>

# Performance
MAX_FILE_SIZE_MB=500 # Video upload limit
SESSION_TIMEOUT_MINUTES=30
OFFLINE_SYNC_INTERVAL_SECONDS=300

# Feature Flags
ENABLE_OFFLINE_MODE=true
ENABLE_VOICE_NOTES=true
ENABLE_WHATSAPP_INTEGRATION=true
ENABLE_ARTWEAVER_INTEGRATION=true
```

---

## 14. Sign-Off Section

### 14.1. Stakeholder Agreement

This Master Plan Specification Document (MPSD Version 1.0) for Sprint 2 represents the complete, agreed-upon scope of work for the 30-day development effort. All stakeholders acknowledge that:

1. This document is the single source of truth for all Sprint 2 development activities
2. The 30-day timeline assumes parallel workstreams with defined integration points
3. Any scope changes must go through formal change request process
4. Success criteria are clearly defined and measurable
5. Sprint 1.1 (RBAC + FR) foundation is prerequisite and complete
6. Sprint 5 (Shop) is already in production and excluded from Sprint 2 scope

### 14.2. Approval Signatures

**Product Owner:**
* Name: _______________________________
* Signature: ___________________________
* Date: ________________________________

**Technical Lead:**
* Name: _______________________________
* Signature: ___________________________
* Date: ________________________________

**QA Lead:**
* Name: _______________________________
* Signature: ___________________________
* Date: ________________________________

**Scrum Master:**
* Name: _______________________________
* Signature: ___________________________
* Date: ________________________________

### 14.3. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-24 | BMad Orchestrator | Initial Sprint 2 MPSD creation from Combined MPSD |

### 14.4. Distribution List

* Product Owner
* Technical Lead (Dev)
* QA Lead
* Scrum Master
* Development Team
* ISF Stakeholders

---

**END OF SPRINT 2 MASTER PLAN SPECIFICATION DOCUMENT**

**Total Pages:** 35
**Word Count:** ~9,500
**Last Updated:** 2025-10-24 12:55:36
**Next Document:** Epic 01 - LMS Student Experience

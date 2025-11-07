# **Master Project Specification Document (MPSD)**

**Project:** ISF Playground - Combined Sprint 2 & Sprint 5
**Version:** 3.0 (Unified)
**Date:** September 16, 2025
**Last Updated:** 2025-11-04 17:48:38 (via `date '+%Y-%m-%d %H:%M:%S'`) - Added complete Shop Module technical specification
**Sprint Duration:** 30 Days (Parallel Execution)

---

## **1. MPSD Introduction & Combined Sprint Overview**

### **1.1. Purpose of This Master Project Specification Document**

This Master Project Specification Document (MPSD) serves as the exhaustive, unambiguous, and universally agreed-upon blueprint for the parallel execution of ISF Playground Sprint 2 and Sprint 5. It is the single source of truth, meticulously detailing every facet of the features planned for this combined 30-day development effort. Its primary purpose is to ensure complete alignment among all stakeholders—including the Client, Project Manager, Design Team, and Development Team—before the parallel sprint development work commences. This MPSD will be the definitive reference for scope management, enabling the Project Manager to clearly delineate agreed-upon features from out-of-scope requests, thereby ensuring focused and efficient development across both sprint deliverables simultaneously.

### **1.2. Project Overview: ISF Playground - Combined Sprint 2 & 5**

This combined sprint represents a strategic acceleration of the ISF Playground development roadmap, executing Sprint 2 and Sprint 5 features in parallel over a 30-day period. Sprint 2 focuses on the comprehensive Learning Management System (LMS) and enhanced Amma role capabilities, while Sprint 5 completes the platform's virtual economy loop with the ISF Shop module. This parallel execution approach leverages the modular architecture established in Sprint 1 and the completed WTF module, allowing independent development streams while maintaining system cohesion. The entire system continues to be built as an Electron.js desktop application with a Node.js backend and MongoDB database, prioritizing offline capabilities for core student interactions.

### **1.3. Combined Sprint Goals & Objectives**

The primary goals for this unified 30-day sprint are:

**Sprint 2 Core Objectives:**
1. **Deliver a Functional LMS Core:** Implement robust course management (creation, assignment, content population), student enrollment, and assessment functionalities, including flexible course assignment for individual weaker students to create personalized learning paths.
2. **Enable Rich Student Learning Experiences:** Provide students with an interactive and engaging platform to access diverse course types (Computer Apps, Art, Spoken English, Life Skills) primarily through voice and intuitive UI, including offline access to core learning activities.
3. **Integrate ISF Coin Rewards:** Implement the system for students to earn digital ISF Coins through LMS activity completion and coach grading.
4. **Enhance Amma Role Capabilities:** Introduce individual Amma accounts, improve query handling with better categorization and SLA management, and integrate voice note communication.

**Sprint 5 Core Objectives:**
1. **Launch a Functional Virtual Economy:** Implement the end-to-end ISF Shop module, allowing students to spend their earned ISF Coins on physical or digital rewards.
2. **Empower Admins with E-Commerce Tools:** Provide Administrators with robust interfaces to manage shop products, control inventory levels, and track the flow of the virtual currency.
3. **Provide Insightful Economic Reports:** Develop a "Coin Distribution Reports" module to give Admins a clear view of student engagement, coin circulation, and reward redemption patterns.
4. **Complete System Integration:** Finalize all system-wide features including enhanced reporting, security audits, and performance optimization for production release.

### **1.4. Parallel Development Strategy**

To achieve the ambitious 30-day timeline, the development will be organized into two parallel workstreams:

**Workstream A - LMS & Learning Features (Sprint 2):**
- Week 1-2: Core LMS infrastructure, course management, content management
- Week 2-3: Student learning interfaces for all four course types
- Week 3-4: Grading system, reporting, Amma enhancements
- Week 4: Integration testing and refinement

**Workstream B - Commerce & Economy Features (Sprint 5):**
- Week 1-2: ISF Shop frontend, product catalog, shopping cart
- Week 2-3: Admin product management, inventory system
- Week 3-4: Coin economy reports, transaction management
- Week 4: Integration with LMS coin earning, end-to-end testing

**Cross-Stream Dependencies:**
- Shared ISF Coin wallet system
- Unified notification center
- Common user authentication and session management
- Integrated reporting dashboard

---

## **2. Target Users/Personas for Combined Sprint Features**

### **Primary Personas:**

* **Student:** The primary beneficiary of both sprints. Interacts with LMS courses to learn and earn ISF Coins (Sprint 2), then uses the ISF Shop to redeem earned coins for rewards (Sprint 5). Experiences a complete learning-to-reward cycle within the 30-day implementation.

* **Administrator (Admin):** The system orchestrator with expanded responsibilities across both sprints. Manages all course creation and content (Sprint 2), oversees the ISF Shop inventory and products (Sprint 5), and has access to comprehensive reporting across both learning and commerce domains.

* **Coach:** Focused primarily on Sprint 2 features. Assigns courses to Balagruhas or specific students, grades subjective student work via the "Syllabus Tracker," monitors student progress, and manually awards ISF Coins. Has visibility into student shop purchases for counseling purposes.

### **Secondary Personas:**

* **Amma:** Enhanced through Sprint 2 with individual accounts, improved query handling, SLA-based task management, and voice note communication. Can view student coin spending patterns to understand welfare needs.

* **Playground Manager (PM):** System health monitor introduced in Sprint 2. All application errors, stakeholder feedback, and suggestions from both LMS and Shop modules are automatically logged and assigned as tasks for resolution.

---

## **3. High-Level Combined Sprint Scope**

### **3.1. What's In Scope for the 30-Day Combined Sprint**

#### **Sprint 2 - LMS & Communication Features:**

**LMS - Student Experience:**
* Student Homepage & Main Course Category Navigation (built to client UI specifications)
* Full interaction with "Computer Apps," "Art," "Spoken English," and "Life Skills" courses
* Voice-enabled multiple-choice questions with audio buttons
* Digital ISF Coin accumulation in student wallet
* Offline-first architecture for core learning activities

**LMS - Admin & Coach Functionalities:**
* **Course Management (Admin Only):** Full CRUD operations for courses with module/chapter structure
* **Course Assignment (Admin & Coach):** Flexible assignment to Balagruhas and individual students
* **Content Management Module (Admin Only):** Upload/manage Video, PDF, Document, Image, Audio, Text, Links
* **Quiz System (Admin Only):** Create assessments with various question types and passing criteria
* **Coach Grading (Coach Only):** Grade subjective submissions via "Syllabus Tracker" with manual coin awards
* **Course Reporting System (Admin & Coach):** Performance dashboards with PDF/CSV export

**Amma & Communication Features:**
* Individual Amma Accounts with self-registration and Admin approval workflow
* Enhanced Query Handling with reclassification and multi-tagging capabilities
* SLA-based Task Management with automatic reassignment
* Voice Communication for all roles (press-and-hold recording)
* Admin Broadcast ("Mann ki Baat") for system-wide announcements
* Automated WhatsApp notifications for daily schedules

**System-Wide (Sprint 2):**
* In-App Notification Center with dual-display system
* Translation Module for course content (Hindi, English, Marathi)
* Playground Manager role for error tracking
* Child-friendly error messages

#### **Sprint 5 - E-Commerce & Economy Features:**

**ISF Shop Module (Student Experience):**
* Shop access via main menu with product catalog grid view
* Advanced filtering and sorting (by category, price)
* Multi-item shopping cart with quantity management
* Secure checkout using ISF Coins with balance validation
* "My Purchases" section with order history and digital receipts
* Wishlist functionality for saving desired items

**ISF Shop & Inventory Management (Admin Experience):**
* Complete product CRUD operations with image management
* Real-time inventory tracking with stock level monitoring
* Automatic stock decrementation on purchase
* Out-of-stock handling and display
* Bulk product import/export capabilities
* Product categorization and tagging system

**Coin Distribution Reports:**
* Comprehensive coin economy dashboard
* Total earned vs. spent metrics with circulation tracking
* Student leaderboards for earners and spenders
* Top redeemed products analytics
* Individual student transaction history with detailed logs
* Exportable reports in PDF and CSV formats

**Final System Refinements (Sprint 5):**
* Security audit across all new features
* Performance optimization for target hardware
* Complete technical documentation
* API documentation with Swagger/OpenAPI
* User training materials preparation

### **3.2. What's Out of Scope for the Combined Sprint**

**Sprint 2 Exclusions:**
* Continuous "Always-On" Facial Recognition during assessments
* System-Wide Archiving Framework (limited to course archiving only)
* Full UI Internationalization (limited to content translation)
* Life Skills "Learn then Test" expanded model
* Task "Revision Mode" for half coins
* AI-Powered Transcription of voice notes

**Sprint 5 Exclusions:**
* Physical Item Fulfillment & Logistics
* Real-money Payment Gateway Integration
* Supplier/Vendor Management System
* Drop-shipping or Third-party Marketplace Integration
* Product Reviews and Ratings System
* Promotional Codes or Discount System

---

## **4. Target Audience for this MPSD**

* **Primary:** Project Manager (for sprint coordination, resource allocation, client communication, and integrated scope management across both workstreams)

* **Secondary:**
  * **Development Team (Frontend & Backend):** For precise implementation details across both feature sets
  * **QA Team:** For comprehensive test planning covering LMS-to-Shop integration scenarios
  * **Design Team:** For ensuring UI/UX consistency across learning and commerce experiences
  * **Client (ISF):** For final approval and understanding of the accelerated delivery timeline

---

## **5. Document Conventions**

* **UI Elements:** Referred to by their visible label text in "quotation marks" or by descriptive name with suggested IDs (e.g., btn-create-course, btn-add-to-cart)
* **User Roles:** Capitalized consistently (Student, Coach, Admin, Amma, Playground Manager)
* **Placeholders:** Dynamic data shown in [square_brackets] (e.g., [CourseName], [ProductName], [CoinBalance])
* **API Endpoints:** Represented as METHOD /path/to/endpoint with versioning where applicable
* **Sprint Attribution:** Features are tagged with [S2] for Sprint 2 or [S5] for Sprint 5 to maintain clarity
* **Cross-Sprint Dependencies:** Marked with [SHARED] when a feature impacts both sprints

---

## **6. References to Source Documents**

This combined MPSD synthesizes and integrates information from:

* Sprint 2 MPSD v2.0 (August 19, 2025)
* Sprint 5 MPSD v1.0 (August 19, 2025)
* Client-provided UI mockups (definitive source for all UI implementation)
* 'Playground Platform - 5 Sprint Plan - 16 February'
* 'WTF (Wall for Thrust towards Fame) with client comments'
* 'ISF Sprint 2 - Overview and Scope'
* All LMS feature breakdown documents
* Completed Sprint 1 implementation and codebase

---

## **7. Global Elements & Standards (Combined Sprint Context)**

### **7.1. Branding Guidelines**

* **Consistency Requirement:** Both LMS and Shop modules must maintain identical branding
* **Color Palette:** Primary - Green, Secondary - Blue, Accent - Gray (applied uniformly)
* **Typography:** Consistent font families across learning and commerce interfaces
* **Logo Placement:** ISF Playground logo consistent in all module headers

### **7.2. Responsive Design & Performance**

* **Target Resolution:** 1366x768 (primary target for all new features)
* **Hardware Benchmark:** Core i3 4th Gen, 8GB DDR3 RAM, 256GB SSD
* **Performance Requirements:**
  * Page load times < 3 seconds for both LMS and Shop
  * Cart operations < 500ms response time
  * Course content loading with progressive enhancement

### **7.3. Accessibility Standards**

* **WCAG 2.1 Level AA:** Applied consistently across both sprint deliverables
* **Keyboard Navigation:** Full support in course navigation and shop browsing
* **Screen Reader Compatibility:** All interactive elements properly labeled
* **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text

### **7.4. Unified Navigation Structure**

* **Student Homepage Enhancement:**
  * [S2] Persistent header with emotion emojis, voice chat, homework buttons
  * [S5] New "ISF Shop" button integrated into main navigation
  * [SHARED] ISF Coin balance display updated real-time across both modules
  * [SHARED] Notification bell showing alerts from both LMS and Shop

* **Admin Dashboard Unification:**
  * [S2] Course Management, Content Management, Broadcast Message
  * [S5] Shop Management, Inventory Control, Product Analytics
  * [SHARED] Unified Reports section combining learning and commerce metrics

---

## **Detailed Feature & Module Breakdown**

## **Section A: Sprint 2 - LMS & Communication Features**

### **8. LMS - Student Homepage & Course Navigation [S2]**

* **Feature ID:** S2-LMS-STU-001
* **Feature Name:** Student Homepage & Main Course Category Selection
* **Development Timeline:** Week 1 (Days 1-5)

#### **User Story 1:**
"As a Student, after logging in via facial recognition, I want to see a clear and simple homepage that shows my learning options and my current coin balance, so I can understand my status and available activities."

**Acceptance Criteria:**
* **AC1.1:** Upon successful facial recognition, the student is directed to the enhanced LMS homepage within 2 seconds
* **AC1.2:** The homepage UI strictly matches the client-provided design mockups
* **AC1.3:** The persistent Title Bar displays:
  * Student Name and Profile Picture
  * Active session timer (counting up)
  * ISF Coin Balance (dynamically updated)
  * Notification bell icon with count badge
  * Window controls (minimize, maximize, close)
* **AC1.4:** The Toolbar (below Title Bar) contains:
  * Five emotion emoji buttons (100x100px each, 10px gap)
  * "Voice Chat" button with pending message badge
  * "Homework" button
  * [S5] "ISF Shop" button (added for Sprint 5 integration)
* **AC1.5:** System checks for incomplete tasks and auto-resumes if found

#### **User Story 2:**
"As a Student, I want to click on course categories to view activities, with the system preventing accidental navigation away from active tasks."

**Acceptance Criteria:**
* **AC2.1:** Four main course category buttons are displayed:
  * Computer Apps (with computer icon)
  * Art (with palette icon)
  * Spoken English (with microphone icon)
  * Life Skills (with heart icon)
* **AC2.2:** Each button shows a visual indicator if it contains active/new content
* **AC2.3:** Clicking a category triggers SPA-style content replacement (no page reload)
* **AC2.4:** If student is mid-task and clicks another category, confirmation modal appears:
  * Message: "Are you sure you want to switch? Your current progress will be saved."
  * Buttons: "Yes, switch" | "No, stay"

#### **Technical Implementation Details:**

**Frontend Components:**
```javascript
// Component Structure
- StudentHomepage/
  - TitleBar/
    - StudentProfile
    - SessionTimer
    - CoinBalance (shared with S5)
    - NotificationBell
  - Toolbar/
    - EmotionSelector
    - VoiceChat
    - Homework
    - ShopButton (S5)
  - CourseGrid/
    - CategoryCard
```

**API Endpoints:**
* `GET /api/lms/student/dashboard` - Fetch homepage data
* `GET /api/lms/student/course-categories` - Get available categories
* `GET /api/lms/student/incomplete-tasks` - Check for resumable tasks
* `POST /api/lms/student/session/switch` - Save state when switching

**Data Model Updates:**
```javascript
{
  studentDashboard: {
    studentId: ObjectId,
    currentSession: {
      startTime: Date,
      lastActivity: Date,
      activeTask: ObjectId
    },
    coinBalance: Number, // Shared with S5
    courseProgress: {
      computerApps: { completed: Number, total: Number },
      art: { completed: Number, total: Number },
      spokenEnglish: { completed: Number, total: Number },
      lifeSkills: { completed: Number, total: Number }
    }
  }
}
```

### **9. LMS - Computer Apps Courses (Student Interaction) [S2]**

* **Feature ID:** S2-LMS-STU-002
* **Feature Name:** Computer Apps Course Interaction (Student View)
* **Development Timeline:** Week 1-2 (Days 3-8)

#### **User Story 1:**
"As a Student, I want to navigate through Computer Apps with a three-pane layout showing apps, levels, and tasks, with clear progress indicators."

**Acceptance Criteria:**
* **AC1.1:** Three-pane layout implementation:
  * Left Column (200px): Application list
  * Top Row (80px): Level selection buttons
  * Main Palette: Task grid with progress indicators
* **AC1.2:** Initial state shows blinking prompt: "Please select an app"
* **AC1.3:** Visual feedback on selection:
  * Selected app highlights with primary color
  * In-progress level shows subtle pulse animation (CSS keyframes)
  * Completed tasks show green checkmark overlay

#### **User Story 2:**
"As a Student, I want to see my performance metrics including ranking compared to other students."

**Acceptance Criteria:**
* **AC2.1:** Each completed task displays performance bar showing:
  * Time Taken (format: "MM:SS")
  * ISF Coins Earned (with coin icon)
  * Rank (format: "Your Rank: X out of Y students")
* **AC2.2:** Progress lines under each task:
  * Completed: Full green line (100% width)
  * In-Progress: Half green, half gray (50% green gradient)
  * Not Started: Red line (100% width)

#### **Technical Implementation:**

**Frontend State Management:**
```javascript
const ComputerAppsState = {
  selectedApp: null,
  selectedLevel: null,
  tasks: [],
  studentProgress: {
    taskId: {
      status: 'completed|in-progress|not-started',
      timeSpent: seconds,
      coinsEarned: number,
      rank: { position: number, total: number },
      lastAttempt: Date
    }
  }
};
```

**Real-time Rank Calculation:**
```javascript
// Backend aggregation for ranking
db.taskProgress.aggregate([
  { $match: { taskId: taskId } },
  { $sort: { timeSpent: 1 } },
  { $group: {
    _id: "$taskId",
    rankings: { $push: { studentId: "$studentId", time: "$timeSpent" } }
  }}
]);
```

### **10. LMS - Art Courses with Artweaver Integration [S2]**

* **Feature ID:** S2-LMS-STU-003
* **Feature Name:** Art Course Interaction & Artweaver Integration
* **Development Timeline:** Week 1-2 (Days 5-10)

#### **User Story 1:**
"As a Student, I want to use a graphics pad with Artweaver to create digital art that syncs with the ISF Playground in real-time."

**Acceptance Criteria:**
* **AC1.1:** Four art modes available:
  * Workshops (structured lessons)
  * Free Sketch (creative time)
  * Art Stories (narrative art)
  * Competition (timed challenges)
* **AC1.2:** Split-view layout:
  * Left (40%): Instruction palette with reference image/prompt
  * Right (60%): Real-time canvas mirror from Artweaver
* **AC1.3:** Graphics pad detection and configuration:
  * Auto-detect USB graphics pad on task launch
  * Fallback mouse input if pad unavailable
  * Pressure sensitivity support (if hardware capable)

#### **Technical Integration Architecture:**

**Artweaver Bridge Implementation:**
```javascript
// Electron main process
const ArtWeaverBridge = {
  launchArtweaver: async () => {
    const artWeaverPath = process.platform === 'win32'
      ? 'C:\\Program Files\\Artweaver\\Artweaver.exe'
      : null;

    // Launch with specific canvas size
    spawn(artWeaverPath, ['--canvas-size=800x600']);
  },

  captureCanvas: async () => {
    // Screenshot Artweaver window
    const screenshot = await captureWindow('Artweaver');
    return screenshot.toPNG();
  },

  syncInterval: setInterval(() => {
    // Sync every 500ms for near real-time
    this.captureCanvas().then(data => {
      mainWindow.webContents.send('canvas-update', data);
    });
  }, 500)
};
```

### **11. LMS - Spoken English with Video Recording [S2]**

* **Feature ID:** S2-LMS-STU-004
* **Feature Name:** Spoken English Course Video Performance
* **Development Timeline:** Week 2 (Days 8-12)

#### **User Story 1:**
"As a Student, I want to record video performances with preview and re-record options before submission."

**Acceptance Criteria:**
* **AC1.1:** Video recording interface includes:
  * Live camera preview (640x480 minimum)
  * Recording indicator (red dot + timer)
  * Audio level meter
* **AC1.2:** Recording workflow:
  * "Start Recording" begins capture
  * Auto-stop at 3 minutes maximum
  * "Stop Recording" ends capture
* **AC1.3:** Review options post-recording:
  * "Play My Video" for preview
  * "Re-record" discards and restarts
  * "Submit Video" saves and grades

#### **WebRTC Implementation:**
```javascript
const VideoRecorder = {
  constraints: {
    video: { width: 640, height: 480, facingMode: "user" },
    audio: { echoCancellation: true, noiseSuppression: true }
  },

  startRecording: async function() {
    const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp8,opus'
    });

    this.mediaRecorder.ondataavailable = (event) => {
      this.chunks.push(event.data);
    };

    this.mediaRecorder.start();
    this.startTimer();
  }
};
```

### **12. LMS - Life Skills Interactive Learning [S2]**

* **Feature ID:** S2-LMS-STU-005
* **Feature Name:** Life Skills Course with Voice Responses
* **Development Timeline:** Week 2 (Days 10-14)

#### **User Story 1:**
"As a Student, I want to answer Life Skills questions using voice notes like WhatsApp."

**Acceptance Criteria:**
* **AC1.1:** Voice recording using press-and-hold:
  * Mouse down: Start recording
  * Mouse up: Stop recording
  * Visual feedback during recording (pulsing mic icon)
* **AC1.2:** Recording constraints:
  * Maximum 1 minute duration
  * Auto-stop at limit with notification
  * Minimum 3 seconds for valid response
* **AC1.3:** Mandatory playback before submission:
  * "Submit" button disabled until played
  * Option to re-record unlimited times

### **13. Course Management System (Admin) [S2]**

* **Feature ID:** S2-LMS-AC-001
* **Feature Name:** Complete Course Builder and Management
* **Development Timeline:** Week 1-2 (Days 1-10)

#### **User Story 1 (Admin):**
"As an Admin, I need a comprehensive course builder with drag-and-drop module/chapter organization."

**Acceptance Criteria:**
* **AC1.1:** Course Builder Interface includes:
  * Course metadata form (title, description, category, thumbnail)
  * Hierarchical structure: Course > Modules > Chapters > Content Items
  * Drag-and-drop reordering at all levels
  * Real-time preview of course structure
* **AC1.2:** Content type support per chapter:
  * Video (MP4, MOV, max 500MB)
  * Documents (PDF, DOC, PPT, max 50MB)
  * Audio (MP3, WAV, max 100MB)
  * Images (JPG, PNG, max 10MB)
  * External links (YouTube, educational sites)
  * Quizzes (integrated with quiz builder)
* **AC1.3:** Publishing workflow:
  * Save as Draft (auto-save every 30 seconds)
  * Preview mode for testing
  * Publish with scheduling option
  * Archive with data retention

#### **Course Data Model:**
```javascript
const CourseSchema = {
  _id: ObjectId,
  title: { en: String, hi: String, mr: String }, // Multilingual
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
        type: String, // 'video', 'document', 'quiz', etc.
        title: String,
        url: String, // S3 or external
        duration: Number, // estimated minutes
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
    studentIds: [ObjectId], // specific students or empty for all
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
};
```

### **14. Coach Grading System via Syllabus Tracker [S2]**

* **Feature ID:** S2-LMS-COACH-002
* **Feature Name:** Subjective Task Grading Interface
* **Development Timeline:** Week 2-3 (Days 12-18)

#### **User Story 1 (Coach):**
"As a Coach, I need the Syllabus Tracker to show pending submissions with smart prioritization and bulk grading capabilities."

**Acceptance Criteria:**
* **AC1.1:** Syllabus Tracker dashboard shows:
  * Pending submissions count per Balagruha (badge on button)
  * Priority sorting (oldest first, SLA warnings)
  * Filter by: Subject, Student, Submission type
  * Bulk actions: Grade multiple with same score
* **AC1.2:** Individual grading interface:
  * Full-screen view of submitted work
  * Side panel for grading controls
  * Grade scale: A+ to F (mapped to percentages)
  * Manual ISF Coin award (0-100 coins)
  * Optional feedback text (max 500 chars)
  * Voice note feedback option (max 1 minute)
* **AC1.3:** Grading workflow optimization:
  * Keyboard shortcuts (1-5 for grades, Enter to submit)
  * Auto-advance to next submission
  * Save draft grades for later

### **15. Translation Module [S2]**

* **Feature ID:** S2-LMS-SYS-002
* **Feature Name:** Multi-language Content Support
* **Development Timeline:** Week 3 (Days 15-18)

#### **Implementation Strategy:**
```javascript
const TranslationManager = {
  supportedLanguages: ['en', 'hi', 'mr'],

  translateContent: async (content, targetLang) => {
    // Check cache first
    if (cache[content.id]?.[targetLang]) {
      return cache[content.id][targetLang];
    }

    // Manual translation by Admin
    return content[targetLang] || content['en']; // Fallback to English
  },

  studentPreference: async (studentId) => {
    const student = await db.students.findById(studentId);
    return student.preferredLanguage || 'en';
  }
};
```

---

## **Section B: Sprint 5 - ISF Shop & Economy Features**

### **16. ISF Shop Storefront (Student) [S5]**

* **Feature ID:** S5-SHOP-STU-001
* **Feature Name:** Student Shopping Experience
* **Development Timeline:** Week 1-2 (Days 1-10)

#### **User Story 1:**
"As a Student, I want an Amazon-like shopping experience where I can browse, filter, and purchase items with my ISF Coins."

**Acceptance Criteria:**
* **AC1.1:** Shop landing page features:
  * Grid layout (3 columns on 1366x768)
  * Product cards with image, name, price
  * "Out of Stock" overlay when quantity = 0
  * Hover effects showing quick details
* **AC1.2:** Advanced filtering and sorting:
  * Category filters (Toys, Books, Stationery, Sports, Digital)
  * Price range slider (0-500 coins)
  * Sort options: Price (Low/High), Newest, Most Popular
  * Active filter pills with remove option
* **AC1.3:** Product detail page:
  * Image gallery with zoom capability
  * Detailed description with specifications
  * Stock availability indicator
  * Related products section
  * Add to Cart with quantity selector
  * Add to Wishlist toggle

#### **User Story 2:**
"As a Student, I want a persistent shopping cart that saves my selections even if I leave the shop."

**Acceptance Criteria:**
* **AC2.1:** Shopping cart features:
  * Persistent storage in local Memory Layer
  * Cart icon with item count badge
  * Sliding cart drawer (right side)
  * Quick cart preview on hover
* **AC2.2:** Cart management:
  * Quantity adjustment (+/- buttons)
  * Remove item with confirmation
  * Save for later option
  * Estimated coins display
  * Stock validation on cart open

#### **User Story 3:**
"As a Student, I want a secure checkout process that clearly shows my coin balance and purchase confirmation."

**Acceptance Criteria:**
* **AC3.1:** Checkout flow (3 steps):
  * Step 1: Review cart items
  * Step 2: Confirm coin payment
  * Step 3: Success confirmation
* **AC3.2:** Payment validation:
  * Current balance: [X] coins (green if sufficient, red if not)
  * Order total: [Y] coins
  * Remaining after purchase: [Z] coins
  * Insufficient funds handling with suggestion to earn more
* **AC3.3:** Order confirmation:
  * Order ID generation (format: ORD-YYYYMMDD-XXXXX)
  * Email-style receipt display
  * Print receipt option (PDF generation)
  * Continue shopping / View orders buttons

#### **Shopping Cart State Management:**
```javascript
const ShoppingCartState = {
  cartId: String,
  studentId: ObjectId,
  items: [{
    productId: ObjectId,
    productName: String,
    quantity: Number,
    pricePerUnit: Number,
    thumbnail: String,
    stockAvailable: Number
  }],
  totalItems: Number,
  totalCost: Number,
  lastModified: Date,
  savedForLater: [],

  // Methods
  addItem: function(product, quantity) {
    // Check stock
    // Add or update quantity
    // Recalculate totals
    // Sync to backend
  },

  validateStock: async function() {
    // Real-time stock check
    // Remove/adjust unavailable items
    // Notify user of changes
  }
};
```

### **17. ISF Shop Product Management (Admin) [S5]**

* **Feature ID:** S5-SHOP-ADM-001
* **Feature Name:** E-Commerce Administration
* **Development Timeline:** Week 1-2 (Days 3-12)

#### **User Story 1 (Admin):**
"As an Admin, I need a comprehensive product management system similar to standard e-commerce platforms."

**Acceptance Criteria:**
* **AC1.1:** Product creation form:
  * Basic Info: Name, SKU, Category, Brand
  * Pricing: Cost in ISF Coins
  * Images: Multiple upload (primary + gallery)
  * Description: Rich text editor with formatting
  * Specifications: Key-value pairs
  * SEO: Meta title, description (for internal search)
* **AC1.2:** Product variations support:
  * Size options (S, M, L, XL)
  * Color variants with separate images
  * Individual stock tracking per variant
* **AC1.3:** Bulk operations:
  * CSV import/export for products
  * Bulk price updates
  * Bulk stock adjustments
  * Bulk category changes

#### **Product Data Model:**
```javascript
const ProductSchema = {
  _id: ObjectId,
  sku: String, // Unique identifier
  name: String,
  category: String,
  subcategory: String,
  brand: String,

  pricing: {
    basePrice: Number, // in ISF Coins
    discountedPrice: Number,
    discountPercentage: Number
  },

  media: {
    primaryImage: String, // S3 URL
    gallery: [String], // Additional images
    videos: [String] // Product demos
  },

  description: {
    short: String, // For cards
    long: String, // Rich text for detail page
    highlights: [String], // Bullet points
    specifications: Map // Key-value pairs
  },

  inventory: {
    trackInventory: Boolean,
    stockQuantity: Number,
    lowStockThreshold: Number,
    allowBackorder: Boolean,
    variants: [{
      variantId: String,
      type: String, // 'size', 'color'
      value: String,
      stock: Number,
      additionalPrice: Number
    }]
  },

  metadata: {
    isActive: Boolean,
    isFeatured: Boolean,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
    createdBy: ObjectId
  },

  analytics: {
    views: Number,
    purchases: Number,
    wishlistAdds: Number,
    rating: Number,
    lastPurchased: Date
  }
};
```

### **18. Inventory Management System [S5]**

* **Feature ID:** S5-INV-ADM-001
* **Feature Name:** Real-time Inventory Control
* **Development Timeline:** Week 2 (Days 10-14)

#### **User Story 1 (System):**
"As a System, I must maintain accurate inventory levels with automatic updates and low-stock alerts."

**Acceptance Criteria:**
* **AC1.1:** Automatic stock management:
  * Decrement on successful purchase
  * Restore on order cancellation (if implemented)
  * Reserve stock during checkout (5-minute hold)
  * Release reserved stock on timeout
* **AC1.2:** Low stock alerts:
  * Threshold configuration per product
  * Dashboard notification when breached
  * Email alert to designated admin
  * Auto-generate purchase recommendation
* **AC1.3:** Stock audit trail:
  * Log all stock changes with timestamp
  * Track reason (purchase, manual adjustment, return)
  * User who made change
  * Previous and new values

#### **Inventory Transaction Model:**
```javascript
const InventoryTransaction = {
  _id: ObjectId,
  productId: ObjectId,
  variantId: String,
  transactionType: String, // 'purchase', 'adjustment', 'return', 'reserved'
  quantity: Number, // positive for additions, negative for deductions
  previousStock: Number,
  newStock: Number,
  reference: {
    type: String, // 'order', 'manual', 'system'
    id: ObjectId // orderId or userId
  },
  notes: String,
  performedBy: ObjectId,
  timestamp: Date
};
```

---

### **18.5. Shop Module - Complete Technical Specification**

* **Section Type:** Technical Implementation Details
* **Status:** COMPLETED IN SPRINT 5
* **Last Updated:** 2025-11-04 (Sprint 5 completion)

> **📋 PURPOSE OF THIS SECTION**
>
> This section provides comprehensive technical specifications for the ISF Shop Module, including all database schemas, API endpoints, atomic transaction implementations, and Purchase Manager procurement workflows. This documentation serves as the definitive technical reference for the completed Shop Module implementation.

---

#### **18.5.1. Complete Database Schemas**

**ShopOrder Schema:**
```javascript
const ShopOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  }, // AUTO-GEN: ORD-YYYYMMDD-XXXX

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: String, // Snapshot at purchase time
    quantity: { type: Number, required: true, min: 1 },
    coinPriceAtPurchase: Number, // Price snapshot
    subtotal: Number
  }],

  totalCoins: { type: Number, required: true },

  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected', 'ready_for_delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },

  deliveryDetails: {
    assignedCoachId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    balagruhaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Balagruha' },
    deliveryInstructions: String,
    deliveredAt: Date,
    deliveredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deliveryNotes: String
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes for performance
ShopOrderSchema.index({ studentId: 1, status: 1 });
ShopOrderSchema.index({ 'deliveryDetails.assignedCoachId': 1, status: 1 });
ShopOrderSchema.index({ orderId: 1 });
ShopOrderSchema.index({ createdAt: -1 });
```

**PurchaseRequest Schema (Purchase Manager Workflow):**
```javascript
const PurchaseRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true
  }, // AUTO-GEN: PR-YYYYMMDD-XXXX

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Purchase Manager

  balagruhaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Balagruha'
  }, // Frontend filter only (MVP)

  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: String,
    currentStock: Number, // Snapshot at request time
    requestedQuantity: { type: Number, required: true, min: 1 },
    estimatedUnitCost: { type: Number, required: true }, // In currency (₹)
    estimatedSubtotal: Number
  }],

  totalEstimatedCost: { type: Number, required: true },

  justification: {
    type: String,
    required: true,
    maxlength: 500
  }, // Why this purchase is needed

  additionalNotes: String,

  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },

  approvalDetails: {
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedAt: Date,
    approvalNotes: String,
    rejectionReason: String
  },

  completionDetails: {
    supplierName: String,
    supplierContact: String,
    invoiceNumber: String,
    purchaseDate: Date,
    actualTotalCost: Number,
    completedAt: Date,
    completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiptNotes: String,
    // Actual quantities/costs per item (for variance tracking)
    actualItems: [{
      productId: mongoose.Schema.Types.ObjectId,
      receivedQuantity: Number,
      actualUnitCost: Number
    }]
  },

  attachments: [{
    filename: String,
    originalName: String,
    s3Url: String,
    s3Key: String,
    mimeType: String,
    fileSize: Number, // in bytes
    uploadedAt: Date
  }], // Max 5 files, 10MB each

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes
PurchaseRequestSchema.index({ createdBy: 1, status: 1 });
PurchaseRequestSchema.index({ status: 1, createdAt: -1 });
PurchaseRequestSchema.index({ requestId: 1 });
```

---

#### **18.5.2. API Endpoints with Full Specifications**

**Student Shopping Endpoints:**

**1. Browse Products**
```http
GET /api/v1/shop/products?category=stationery&inStock=true&sort=price_asc&page=1&limit=20
Authorization: Bearer <student_jwt_token>

Response 200 OK:
{
  "success": true,
  "products": [
    {
      "_id": "prod_123abc",
      "name": "Spiral Notebook - 200 pages",
      "sku": "NB-200-BLU",
      "coinPrice": 50,
      "stockQuantity": 45,
      "lowStockThreshold": 10,
      "imageUrl": "https://s3.amazonaws.com/isf-cdn/products/nb-200-blu.jpg",
      "category": "stationery",
      "description": "High-quality spiral notebook perfect for students",
      "isActive": true
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalProducts": 54,
    "limit": 20
  },
  "studentCoinBalance": 250
}
```

**2. Checkout (Atomic Transaction)**
```http
POST /api/v1/shop/orders/checkout
Authorization: Bearer <student_jwt_token>
Content-Type: application/json

Request Body:
{
  "items": [
    { "productId": "prod_123abc", "quantity": 2 },
    { "productId": "prod_456def", "quantity": 1 }
  ],
  "deliveryInstructions": "Please deliver after lunch"
}

Response 200 OK (Success):
{
  "success": true,
  "order": {
    "orderId": "ORD-20251104-0042",
    "studentId": "stu_789ghi",
    "items": [
      {
        "productId": "prod_123abc",
        "productName": "Spiral Notebook - 200 pages",
        "quantity": 2,
        "coinPriceAtPurchase": 50,
        "subtotal": 100
      },
      {
        "productId": "prod_456def",
        "productName": "Pen Set - 10 pieces",
        "quantity": 1,
        "coinPriceAtPurchase": 30,
        "subtotal": 30
      }
    ],
    "totalCoins": 130,
    "status": "pending",
    "deliveryDetails": {
      "assignedCoachId": "coach_111",
      "balagruhaId": "bal_222",
      "deliveryInstructions": "Please deliver after lunch"
    },
    "createdAt": "2025-11-04T10:30:00Z"
  },
  "newCoinBalance": 120, // Was 250, now 120
  "message": "Order placed successfully! Your coach will deliver soon."
}

Response 400 Bad Request (Insufficient Coins):
{
  "success": false,
  "error": "INSUFFICIENT_COINS",
  "message": "You need 150 coins but only have 120",
  "required": 150,
  "available": 120,
  "shortfall": 30
}

Response 400 Bad Request (Out of Stock):
{
  "success": false,
  "error": "PRODUCT_OUT_OF_STOCK",
  "message": "Product 'Spiral Notebook' is out of stock",
  "productId": "prod_123abc",
  "productName": "Spiral Notebook - 200 pages",
  "requestedQuantity": 2,
  "availableQuantity": 0
}
```

**Checkout Implementation (Atomic Transaction):**
```javascript
/**
 * Process shop checkout with atomic MongoDB transaction
 * Ensures: coin deduction + stock decrement + order creation + task creation
 * happen atomically or not at all (complete rollback on any failure)
 */
async function processShopCheckout(studentId, items, deliveryInstructions) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Validate stock availability for all items
    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      if (product.stockQuantity < item.quantity) {
        throw new Error(
          `Insufficient stock for ${product.name}. ` +
          `Requested: ${item.quantity}, Available: ${product.stockQuantity}`
        );
      }
    }

    // 2. Calculate total cost
    const totalCoins = items.reduce((sum, item) => {
      return sum + (item.coinPriceAtPurchase * item.quantity);
    }, 0);

    // 3. Validate student coin balance
    const student = await User.findById(studentId).session(session);

    if (!student) {
      throw new Error('Student not found');
    }

    if (student.coinBalance < totalCoins) {
      throw new Error(
        `Insufficient coins. Required: ${totalCoins}, Available: ${student.coinBalance}`
      );
    }

    // 4. Deduct coins from student balance (atomic)
    await User.findByIdAndUpdate(
      studentId,
      { $inc: { coinBalance: -totalCoins } },
      { session, new: true }
    );

    // 5. Decrement stock quantities for all products (atomic)
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stockQuantity: -item.quantity } },
        { session }
      );
    }

    // 6. Generate unique order ID
    const orderId = `ORD-${moment().format('YYYYMMDD')}-${generateRandomId(4)}`;

    // 7. Create order record
    const order = await ShopOrder.create([{
      orderId,
      studentId,
      items,
      totalCoins,
      status: 'pending',
      deliveryDetails: {
        assignedCoachId: student.assignedCoachId,
        balagruhaId: student.balagruhaId,
        deliveryInstructions
      }
    }], { session });

    // 8. Create delivery task for assigned coach
    await Task.create([{
      title: `Deliver shop order ${orderId} to ${student.name}`,
      description: `Order contains ${items.length} items. Total: ${totalCoins} coins.`,
      assignedTo: student.assignedCoachId,
      assignedToRole: 'COACH',
      deadline: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours
      priority: 'MEDIUM',
      linkedResource: {
        resourceType: 'ShopOrder',
        resourceId: order[0]._id
      },
      metadata: {
        orderDetails: {
          items: items.map(i => ({ name: i.productName, quantity: i.quantity })),
          totalCoins,
          deliveryInstructions
        }
      }
    }], { session });

    // 9. Send notifications
    await sendNotification({
      category: 'shop_order_placed',
      recipientId: studentId,
      priority: 'MEDIUM',
      message: `Your order ${orderId} has been placed successfully!`,
      metadata: { orderId, totalCoins }
    });

    await sendNotification({
      category: 'new_order_pending_delivery',
      recipientId: student.assignedCoachId,
      priority: 'HIGH',
      message: `New shop order ready for delivery - ${student.name}`,
      metadata: { orderId, studentName: student.name }
    });

    // 10. Commit transaction (all or nothing)
    await session.commitTransaction();

    return {
      success: true,
      order: order[0],
      newCoinBalance: student.coinBalance - totalCoins
    };

  } catch (error) {
    // Rollback entire transaction on any error
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
```

---

**Coach Delivery Endpoints (Mobile App):**

**1. Get Pending Deliveries**
```http
GET /api/v1/shop/orders/pending-deliveries
Authorization: Bearer <coach_jwt_token>

Response 200 OK:
{
  "success": true,
  "pendingOrders": [
    {
      "orderId": "ORD-20251104-0042",
      "studentId": "stu_789ghi",
      "studentName": "Ravi Kumar",
      "studentPhoto": "https://s3.amazonaws.com/isf-cdn/photos/ravi.jpg",
      "balagruha": "Balagruha A",
      "items": [
        { "productName": "Spiral Notebook - 200 pages", "quantity": 2 },
        { "productName": "Pen Set - 10 pieces", "quantity": 1 }
      ],
      "totalCoins": 130,
      "orderDate": "2025-11-04T10:30:00Z",
      "deliveryInstructions": "Please deliver after lunch",
      "status": "pending"
    }
  ],
  "count": 1
}
```

**2. Mark Order as Delivered**
```http
POST /api/v1/shop/orders/:orderId/mark-delivered
Authorization: Bearer <coach_jwt_token>
Content-Type: application/json

Request Body:
{
  "deliveryNotes": "Delivered in good condition. Student confirmed receipt verbally."
}

Response 200 OK:
{
  "success": true,
  "message": "Order marked as delivered successfully",
  "order": {
    "orderId": "ORD-20251104-0042",
    "status": "delivered",
    "deliveryDetails": {
      "deliveredAt": "2025-11-04T14:20:00Z",
      "deliveredBy": "coach_111",
      "deliveryNotes": "Delivered in good condition. Student confirmed receipt verbally."
    }
  }
}
```

---

**Purchase Manager Procurement Endpoints (Desktop/Web):**

**1. Create Multi-Product Purchase Request**
```http
POST /api/v2/shop/admin/purchase-requests
Authorization: Bearer <purchase_manager_jwt_token>
Content-Type: multipart/form-data

Request Body (FormData):
{
  "balagruhaId": "bal_222",
  "items": [
    {
      "productId": "prod_123abc",
      "requestedQuantity": 50,
      "estimatedUnitCost": 25
    },
    {
      "productId": "prod_456def",
      "requestedQuantity": 100,
      "estimatedUnitCost": 5
    }
  ],
  "justification": "Both items below 10 units. Need restock for increased student demand this month.",
  "additionalNotes": "Prefer ABC Suppliers. Delivery needed by end of week.",
  "attachments": [File, File] // Max 5 files, 10MB each
}

Response 201 Created:
{
  "success": true,
  "purchaseRequest": {
    "requestId": "PR-20251104-015",
    "createdBy": "pm_333",
    "balagruhaId": "bal_222",
    "items": [
      {
        "productId": "prod_123abc",
        "productName": "Spiral Notebook - 200 pages",
        "currentStock": 5,
        "requestedQuantity": 50,
        "estimatedUnitCost": 25,
        "estimatedSubtotal": 1250
      },
      {
        "productId": "prod_456def",
        "productName": "Pen Set - 10 pieces",
        "currentStock": 2,
        "requestedQuantity": 100,
        "estimatedUnitCost": 5,
        "estimatedSubtotal": 500
      }
    ],
    "totalEstimatedCost": 1750,
    "justification": "Both items below 10 units. Need restock for increased student demand this month.",
    "additionalNotes": "Prefer ABC Suppliers. Delivery needed by end of week.",
    "attachments": [
      {
        "filename": "supplier-quote-2025.pdf",
        "s3Url": "https://s3.amazonaws.com/isf-docs/pr-015-attach-1.pdf",
        "fileSize": 245678
      }
    ],
    "status": "pending",
    "createdAt": "2025-11-04T09:15:00Z"
  },
  "message": "Purchase request created successfully. Admin has been notified for approval."
}
```

**2. Admin Approval/Rejection**
```http
POST /api/v2/shop/admin/purchase-requests/:requestId/approve
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

Request Body:
{
  "approvalNotes": "Approved. Reasonable quantities and pricing."
}

Response 200 OK:
{
  "success": true,
  "purchaseRequest": {
    "requestId": "PR-20251104-015",
    "status": "approved",
    "approvalDetails": {
      "approvedBy": "admin_444",
      "approvedAt": "2025-11-04T14:00:00Z",
      "approvalNotes": "Approved. Reasonable quantities and pricing."
    }
  },
  "message": "Purchase request approved. Purchase Manager has been notified."
}
```

**3. Update Stock After Supplier Delivery**
```http
POST /api/v2/shop/admin/purchase-requests/:requestId/update-stock
Authorization: Bearer <purchase_manager_jwt_token>
Content-Type: application/json

Request Body:
{
  "supplierName": "ABC Suppliers Pvt Ltd",
  "supplierContact": "+91-9876543210",
  "invoiceNumber": "INV-2025-234",
  "purchaseDate": "2025-11-06",
  "items": [
    {
      "productId": "prod_123abc",
      "receivedQuantity": 50,  // Full delivery
      "actualUnitCost": 25     // Matches estimate
    },
    {
      "productId": "prod_456def",
      "receivedQuantity": 100, // Full delivery
      "actualUnitCost": 5      // Matches estimate
    }
  ],
  "receiptNotes": "Items received in good condition. No damages. Delivery on schedule."
}

Response 200 OK:
{
  "success": true,
  "message": "Stock updated successfully for 2 products. Purchase request marked as completed.",
  "purchaseRequest": {
    "requestId": "PR-20251104-015",
    "status": "completed",
    "completionDetails": {
      "supplierName": "ABC Suppliers Pvt Ltd",
      "invoiceNumber": "INV-2025-234",
      "actualTotalCost": 1750, // Matches estimate
      "completedAt": "2025-11-06T15:20:00Z",
      "completedBy": "pm_333"
    }
  },
  "stockUpdates": [
    {
      "productId": "prod_123abc",
      "productName": "Spiral Notebook - 200 pages",
      "oldStock": 5,
      "addedQuantity": 50,
      "newStock": 55
    },
    {
      "productId": "prod_456def",
      "productName": "Pen Set - 10 pieces",
      "oldStock": 2,
      "addedQuantity": 100,
      "newStock": 102
    }
  ],
  "inventoryTransactions": [
    "trans_001_pr015",
    "trans_002_pr015"
  ]
}
```

**Stock Update Implementation (Atomic Transaction):**
```javascript
/**
 * Update stock after supplier delivery with atomic MongoDB transaction
 * Creates inventory transactions for audit trail
 */
async function updateStockFromPurchaseRequest(requestId, updateData) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Find and validate purchase request
    const purchaseRequest = await PurchaseRequest.findOne({ requestId }).session(session);

    if (!purchaseRequest) {
      throw new Error(`Purchase request ${requestId} not found`);
    }

    if (purchaseRequest.status !== 'approved') {
      throw new Error(`Purchase request must be approved before updating stock. Current status: ${purchaseRequest.status}`);
    }

    // 2. Update stock for each product (atomic)
    const stockUpdates = [];
    const transactionIds = [];

    for (const item of updateData.items) {
      const product = await Product.findById(item.productId).session(session);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      const oldStock = product.stockQuantity;
      const newStock = oldStock + item.receivedQuantity;

      // Increment stock
      await Product.findByIdAndUpdate(
        item.productId,
        {
          $inc: { stockQuantity: item.receivedQuantity },
          $set: { updatedAt: new Date() }
        },
        { session }
      );

      // Create inventory transaction for audit
      const transaction = await InventoryTransaction.create([{
        productId: item.productId,
        type: 'purchase_request',
        quantity: item.receivedQuantity,
        quantityBefore: oldStock,
        quantityAfter: newStock,
        unitCost: item.actualUnitCost,
        totalCost: item.receivedQuantity * item.actualUnitCost,
        reference: {
          type: 'purchase_request',
          id: purchaseRequest._id,
          requestId: purchaseRequest.requestId
        },
        notes: `Stock replenishment from PR-${requestId}`,
        performedBy: updateData.performedBy,
        timestamp: new Date()
      }], { session });

      stockUpdates.push({
        productId: item.productId,
        productName: product.name,
        oldStock,
        addedQuantity: item.receivedQuantity,
        newStock
      });

      transactionIds.push(transaction[0]._id);
    }

    // 3. Calculate actual total cost
    const actualTotalCost = updateData.items.reduce((sum, item) => {
      return sum + (item.receivedQuantity * item.actualUnitCost);
    }, 0);

    // 4. Update purchase request to completed
    await PurchaseRequest.findOneAndUpdate(
      { requestId },
      {
        status: 'completed',
        completionDetails: {
          supplierName: updateData.supplierName,
          supplierContact: updateData.supplierContact,
          invoiceNumber: updateData.invoiceNumber,
          purchaseDate: updateData.purchaseDate,
          actualTotalCost,
          completedAt: new Date(),
          completedBy: updateData.performedBy,
          receiptNotes: updateData.receiptNotes,
          actualItems: updateData.items,
          inventoryTransactions: transactionIds
        },
        updatedAt: new Date()
      },
      { session }
    );

    // 5. Send notification to Admin
    await sendNotification({
      category: 'stock_replenished',
      recipientRole: 'ADMIN',
      priority: 'MEDIUM',
      message: `Stock updated for ${updateData.items.length} products from ${requestId}`,
      metadata: { requestId, stockUpdates }
    });

    // 6. Commit transaction
    await session.commitTransaction();

    return {
      success: true,
      stockUpdates,
      transactionIds,
      actualTotalCost
    };

  } catch (error) {
    // Rollback on error
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
```

---

####18.5.3. Purchase Manager Workflows (Stories 17-24)**

**Story 17: Multi-Product Purchase Request Creation**

**Workflow Overview:**
1. Purchase Manager identifies low stock items from dashboard
2. Clicks "+ Create New Request"
3. Selects Balagruha (frontend filtered to assigned Balagruhas)
4. Multi-selects products using searchable dropdown
5. Enters quantities and estimated costs for each item
6. Adds justification (required, max 500 characters)
7. Optionally adds notes and attaches supplier quotations (max 5 files, 10MB each)
8. Reviews grand total
9. Submits request
10. System creates request with status "pending"
11. Admin receives notification for approval

**UI Features:**
- Multi-select product dropdown with search and stock level indicators
- Editable table showing: Product Name, SKU, Current Stock, Requested Qty, Est. Unit Cost, Subtotal
- Real-time grand total calculation
- Drag-drop file upload zone for quotations
- Form validation (quantities > 0, costs entered, justification not empty)

**Success Metrics:**
- Request creation time < 5 minutes
- Multi-product selection saves 60% time vs single-product requests
- File attachments successfully uploaded 100% of the time

---

**Story 18: Purchase Request Management Dashboard**

**Dashboard Features:**

**Statistics Cards (Top):**
- Total Requests: 24
- Pending Approval: 3 (yellow badge)
- Approved: 18 (green)
- Rejected: 2 (red)
- Completed: 15 (blue)
- Cancelled: 1 (gray)

**Request List Table:**
| Request ID | Date | Products | Total Cost | Status | Actions |
|------------|------|----------|------------|--------|---------|
| PR-003 | Jan 15 | 3 products | ₹3,500 | Pending | View \| Cancel |
| PR-002 | Jan 10 | 2 products | ₹1,750 | Approved | Update Stock |
| PR-001 | Jan 5 | 5 products | ₹8,200 | Completed | View |

**Filter Options:**
- Status dropdown: All, Pending, Approved, Rejected, Completed, Cancelled
- Date range: Start/End date pickers
- Balagruha: Dropdown (filtered to assigned)
- Search: By product name, request ID, or justification

**View Request Details Modal:**
- Complete request information
- Products table with quantities, costs, subtotals
- Justification and notes
- Downloadable attachments
- Approval/rejection details (if processed)
- Completion details with actual costs (if completed)
- Complete audit trail with timestamps

---

**Story 19: Stock Update After Supplier Delivery**

**Workflow Overview:**
1. Purchase Manager receives supplier delivery physically
2. Verifies received quantities against order
3. Obtains supplier invoice/receipt
4. Logs into system, finds approved request in dashboard
5. Clicks "Update Stock" button
6. Modal opens: "Update Stock - PR-XXX"
7. Enters supplier information:
   - Supplier name
   - Invoice number
   - Purchase date
8. Confirms or adjusts received quantities and actual costs:
   - Table shows: Product, Requested Qty, Received Qty (editable), Est. Cost, Actual Cost (editable), Subtotal
   - Allows for partial deliveries (received < requested)
   - Allows for price variances (actual ≠ estimated)
9. Reviews stock projection preview:
   - Shows: Product, Current Stock, Received Qty, New Stock Level
10. Adds optional receipt notes
11. Clicks "Update Stock & Complete"
12. Confirmation dialog: "This will update inventory for X products and mark request as completed. Cannot be undone. Continue?"
13. System processes atomic transaction:
    - Increments stock for each product
    - Creates InventoryTransaction records
    - Updates request status to "completed"
    - Records completion timestamp and details
14. Success: "Stock updated successfully for X products!"
15. Request moves to "Completed" status
16. "Update Stock" button disappears (idempotency - can only update once)
17. Inventory levels reflected immediately across entire system

**Partial Delivery Handling:**
- PM enters actual received quantity (e.g., 45 instead of 50)
- System calculates new subtotal based on actual quantities
- Stock updates with actual quantities only
- PM can create new request later for remaining items

**Price Variance Tracking:**
- PM enters actual unit cost if different from estimate
- System tracks variance for budget analysis
- Admin can view cost variance reports

**Security Features:**
- Can only update stock for "approved" requests
- Once updated, request cannot be modified again (idempotency protection)
- Complete audit trail with timestamps
- All changes logged in InventoryTransaction collection

---

**Story 20: Purchase Request Category Classification**

**Feature Overview:**
Purchase requests can now be categorized into three predefined types to improve organization and budget tracking.

**Categories:**
1. **New Equipment** - Capital purchases, machinery, furniture, long-term assets
2. **Consumables (Including medicines)** - Medical supplies, food, toiletries, cleaning supplies, medicines
3. **Others** - Miscellaneous purchases not fitting above categories

**UI Implementation:**
- Category dropdown (required field) in Create Purchase Request modal
- Placement: Between "Balagruha" field and "Products" section
- Category column in purchase request list (sortable)
- Category filter dropdown in filter bar

**Backend Schema:**
```javascript
category: {
  type: String,
  required: true,
  enum: ['New Equipment', 'Consumables (Including medicines)', 'Others']
}
```

**Success Metrics:**
- 100% of new requests have category assigned
- Category-based reporting available for budget analysis
- Filter response time < 200ms

---

**Story 21: STOCK Balagruha-Independent Purchase Requests**

**Feature Overview:**
Introduces "STOCK" as a special Balagruha option for purchases not tied to specific locations (e.g., "Pee proof pants"). STOCK inventory can be allocated to Balagruhas later.

**Key Behaviors:**
- **STOCK Visibility**: ALL users can see STOCK requests regardless of their Balagruha assignments
- **Regular Requests**: Users only see requests for their assigned Balagruhas
- **Mixed Type Field**: `balagruhaId` accepts either String ('STOCK') or ObjectId (Balagruha reference)

**UI Features:**
- STOCK appears as first option in Balagruha dropdown (before divider)
- STOCK badge displayed with icon (📦) and distinct color (blue/purple)
- STOCK filter option available in request list
- Tooltip explains: "General inventory - not specific to Balagruha"

**Backend Implementation:**
```javascript
balagruhaId: {
  type: mongoose.Schema.Types.Mixed,  // String or ObjectId
  required: true,
  validate: {
    validator: function(v) {
      return v === 'STOCK' || mongoose.Types.ObjectId.isValid(v);
    }
  }
}

// Future allocation tracking
allocatedToBalagruhas: [{
  balagruhaId: { type: ObjectId, ref: 'Balagruha' },
  quantity: Number,
  allocatedAt: Date,
  allocatedBy: { type: ObjectId, ref: 'User' }
}]
```

**Example Use Case:**
- Purchase Manager creates request for 500 "Pee proof pants" (STOCK)
- Request visible to ALL Purchase Managers and Admins
- After fulfillment, Admin can allocate: 200 to Mathrudhama, 300 to Sadashraya (future feature)

**Success Metrics:**
- STOCK requests visible across all Balagruha-assigned users
- No permission errors when creating/viewing STOCK requests
- Allocation field ready for future enhancement

---

**Story 22: Purchase Request Date Filter Bug Fix**

**Bug Description:**
Date filters (Today, This Week, This Month, This Year) were not working - only "ALL" filter displayed results. Users couldn't filter by time periods.

**Root Causes Identified:**
1. **Backend**: `endDate` not set to end of day (23:59:59.999), excluding requests created later in the day
2. **Frontend**: Date range calculation mutated `now` variable and had off-by-one errors in week/month boundaries

**Fix Implementation:**

**Backend (dateHelpers.js):**
```javascript
exports.getEndOfDay = (dateString) => {
  const date = new Date(dateString);
  date.setHours(23, 59, 59, 999);  // Critical fix
  return date;
};

// Controller usage
if (endDate) {
  filter.createdAt.$lte = getEndOfDay(endDate);  // Now includes full day
}
```

**Frontend (PurchaseManagerView.jsx):**
```javascript
const getDateRangeFromFilter = (filterValue) => {
  const now = new Date();
  let startDate, endDate;

  switch (filterValue) {
    case 'today':
      startDate = new Date(now);  // No mutation
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(now);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'thisWeek':
      startDate = new Date(now);
      const dayOfWeek = startDate.getDay();
      const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      startDate.setDate(startDate.getDate() + daysToMonday);  // Monday
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);  // Sunday
      endDate.setHours(23, 59, 59, 999);
      break;
    // ... other cases
  }

  return {
    startDate: startDate.toISOString().split('T')[0],  // YYYY-MM-DD
    endDate: endDate.toISOString().split('T')[0]
  };
};
```

**Verified Fix:**
- Today filter: Shows requests from 00:00:00 to 23:59:59 (current date)
- This Week: Monday 00:00 to Sunday 23:59 (ISO week standard)
- This Month: 1st 00:00 to last day 23:59 (handles 28/29/30/31 day months)
- Custom Range: Start date 00:00 to End date 23:59 (inclusive)

**Edge Cases Handled:**
- Requests created at exactly 00:00:01 (included)
- Requests created at exactly 23:59:59 (included)
- Leap year February 29th
- Month boundaries with varying lengths
- Week boundaries (Sunday/Monday transition)

**Success Metrics:**
- All date filters now functional (tested with real data)
- Zero false positives/negatives in date filtering
- Filter response time < 300ms

---

**Story 23: Purchase Request Date Column Addition**

**Feature Overview:**
Adds "Created Date" column to purchase request list for quick visibility of submission dates without opening details.

**Date Format:** dd/mm/yy (e.g., "06/11/25" for November 6, 2025)

**Implementation:**

**Date Formatter Utility (dateFormatter.js):**
```javascript
export const formatDate = (date, format = 'dd/mm/yy') => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const shortYear = String(year).slice(-2);

  switch (format) {
    case 'dd/mm/yy':
      return `${day}/${month}/${shortYear}`;
    case 'dd/mm/yyyy':
      return `${day}/${month}/${year}`;
    // ... other formats
  }
};

export const formatDateTime = (date) => {
  // For details view: "06/11/2025 at 14:03"
  const dateStr = formatDate(date, 'dd/mm/yyyy');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  return `${dateStr} at ${hours}:${minutes}`;
};
```

**UI Features:**
- Column placement: After "Category", before "Total Cost"
- Column width: 120px (fixed, center-aligned)
- Sortable: Click header toggles desc → asc → remove sort
- Tooltip: Hover shows full datetime ("Created on: 06/11/2025 at 14:03:01")
- Responsive: Hidden on mobile (< 768px), shown in expanded row

**Accessibility:**
- ARIA label: "Created Date"
- Screen reader announces: "Created on November 6, 2025"

**Table Example:**
| Request ID | Balagruha | Status | Category | **Created Date** | Total Cost | Actions |
|------------|-----------|--------|----------|------------------|------------|---------|
| PR-005 | Mathrudhama | Pending | Consumables | **06/11/25** | ₹5,000 | View |
| PR-004 | STOCK | Approved | New Equipment | **05/11/25** | ₹50,000 | Update Stock |

**Success Metrics:**
- Date column visible on desktop (≥ 768px)
- Sorting works correctly (newest first by default)
- Date format consistent across all views

---

**Story 24: Multi-Role Purchase Request Creation with Approval Thresholds**

**Feature Overview:**
Extends purchase request creation to Coach, Medical Incharge, and Admin roles. Implements intelligent approval workflow based on cost thresholds.

**Roles with Create Access:**
- Coach
- Medical Incharge
- Admin
- Purchase Manager (existing)

**Approval Thresholds:**

**Small Purchase (Auto-Approved):**
- Criteria: Max item cost ≤ Rs 1,000 **AND** Total cost ≤ Rs 25,000
- Initial Status: `pending_fulfillment` (yellow badge)
- Workflow: Create → PM Fulfillment (skip admin approval)
- Badge Color: Yellow/Info
- Example: 50 notebooks at Rs 50 each (Rs 2,500 total)

**Large Purchase (Requires Admin Approval):**
- Criteria: Max item cost > Rs 1,000 **OR** Total cost > Rs 25,000
- Initial Status: `pending_approval` (red/orange badge)
- Workflow: Create → Admin Approval → PM Fulfillment
- Badge Color: Red/Orange/Warning
- Example: 5 laptops at Rs 50,000 each (Rs 250,000 total)

**Backend Threshold Calculation:**
```javascript
const maxItemCost = Math.max(...items.map(item => item.estimatedUnitCost));
const totalOrderCost = items.reduce((sum, item) => sum + item.estimatedTotalCost, 0);

const ITEM_THRESHOLD = 1000;   // Rs 1,000 per item
const ORDER_THRESHOLD = 25000;  // Rs 25,000 total

const isSmallPurchase = (maxItemCost <= ITEM_THRESHOLD) && (totalOrderCost <= ORDER_THRESHOLD);
const initialStatus = isSmallPurchase ? 'pending_fulfillment' : 'pending_approval';

// Store in database
thresholdAnalysis: {
  maxItemCost,
  totalOrderCost,
  itemThreshold: ITEM_THRESHOLD,
  orderThreshold: ORDER_THRESHOLD,
  requiresApproval: !isSmallPurchase
}
```

**Role-Based Visibility:**

**Coach/Medical Incharge:**
- See: Requests for assigned Balagruhas + STOCK + own created requests
- Cannot see: Requests for unassigned Balagruhas
- Create: Only for assigned Balagruhas + STOCK

**Admin:**
- See: All `pending_approval` requests (for review) + requests for assigned Balagruhas + STOCK
- Approve/Reject: Large purchases requiring approval
- Create: For any Balagruha or STOCK

**Purchase Manager:**
- See: `pending_fulfillment` and `approved` requests for assigned Balagruhas + STOCK
- Fulfill: Small purchases and admin-approved large purchases
- Create: For assigned Balagruhas + STOCK (existing functionality)

**Security Enforcement:**
```javascript
// Backend validation
if (req.user.role !== 'admin') {
  const userBalagruhas = req.user.assignedBalagruhas.map(b => b.toString());

  if (balagruhaId !== 'STOCK' && !userBalagruhas.includes(balagruhaId)) {
    return res.status(403).json({
      error: 'You can only create requests for Balagruhas you are assigned to'
    });
  }
}
```

**UI Implementation:**

**Create Purchase Request Button Location:**
- Coach: Coach Dashboard → "Create Purchase Request" button
- Medical Incharge: Medical Dashboard → "Create Purchase Request" button
- Admin: Admin Purchase Requests Panel → "Create Purchase Request" button
- Purchase Manager: Purchase Manager View → "New Purchase Request" button (existing)

**Balagruha Dropdown Filtering:**
- Fetches user's assigned Balagruhas: `GET /api/users/me/balagruhas`
- Response: `[{ _id: 'STOCK', name: 'STOCK', isStock: true }, ...assignedBalagruhas]`
- STOCK always included regardless of assignments

**Threshold Analysis Display (Request Details):**
```
Approval Threshold Analysis
─────────────────────────────
✅ Max Item Cost:       Rs 500  (Threshold: Rs 1,000)
✅ Total Order Cost:    Rs 15,000  (Threshold: Rs 25,000)

Result: No admin approval required (within threshold)
```

**Status Badge Colors:**
| Status | Display Text | Badge Color | MUI Color |
|--------|--------------|-------------|-----------|
| pending_approval | Pending Approval | Red/Orange | warning |
| pending_fulfillment | Pending Fulfillment | Yellow/Blue | info |
| approved | Approved | Blue | primary |
| fulfilled | Fulfilled | Green | success |
| rejected | Rejected | Red | error |

**Example Scenarios:**

**Scenario 1: Small Purchase (Coach)**
1. Coach (Priya) creates request: 20 pens at Rs 50 each (Rs 1,000 total)
2. Backend calculates: Max Rs 50 ≤ Rs 1,000 ✅, Total Rs 1,000 ≤ Rs 25,000 ✅
3. Status set to: `pending_fulfillment`
4. Purchase Manager (Ravi) sees request immediately in fulfillment queue
5. PM updates stock after supplier delivery → Status: `fulfilled`

**Scenario 2: Large Purchase (Medical Incharge)**
1. Medical (Dr. Sharma) creates request: 10 laptops at Rs 50,000 each (Rs 500,000 total)
2. Backend calculates: Max Rs 50,000 > Rs 1,000 ❌, Total Rs 500,000 > Rs 25,000 ❌
3. Status set to: `pending_approval`
4. Admin sees request in approval queue
5. Admin reviews and approves → Status: `approved`
6. Purchase Manager sees request in fulfillment queue
7. PM updates stock → Status: `fulfilled`

**Success Metrics:**
- All four roles can create requests successfully
- Threshold calculation 100% accurate
- Security: Zero requests created for unassigned Balagruhas
- Small purchases bypass approval (60% faster procurement)
- Admin approval queue only contains large purchases (reduced workload)

---

**Story 25: Inline Product Addition for Purchase Requests**

**Feature Overview:**
Addresses a critical workflow gap where users cannot create purchase requests for products that don't exist in the catalog yet. Enables users to add new products inline while creating requests, eliminating workflow interruption and multi-step processes.

**Problem Solved:**
- **Before:** User needs to buy "Pee proof Pants" (not in catalog) → Must contact Admin → Admin logs in and adds product → User returns later to create request
- **After:** User clicks "+ Add New Product" → Fills inline form → Product available immediately → Request created in one workflow

**Roles with Access:**
- Coach
- Medical Incharge
- Admin
- Purchase Manager

**Pending Product Lifecycle:**

**Stage 1: Creation (Inline Form)**
- User clicks "+ Add New Product" button in Create Purchase Request modal
- Inline form appears with fields:
  - Product Name (required, max 100 chars)
  - Category (required): Consumables, Stationery, Hygiene, Equipment, Others
  - Unit (required): pieces, packets, boxes, kg, liters, meters, units
  - SKU (optional): Auto-generated format `NEW-{TIMESTAMP}` or manual override
  - Description (optional, max 200 chars)
- Form validation: Required fields, SKU uniqueness, character limits
- Click "Add to Request" → Product created with pending flags

**Stage 2: Pending State (Before Fulfillment)**
- Backend creates ShopItem with special flags:
```javascript
{
  name: "Pee proof Pants",
  sku: "NEW-1699264824",  // Auto-generated or manual
  category: "Consumables",
  unit: "pieces",
  description: "Water-resistant undergarment for children",
  isPendingProduct: true,   // ⭐ Pending flag
  isActive: false,           // Not visible in shop/inventory yet
  stock: 0,
  lowStockThreshold: 0,
  balagruhaId: null,         // Assigned later on activation
  createdBy: ObjectId(userId),
  createdInRequest: ObjectId(purchaseRequestId)
}
```
- Product appears in selected products table with "New Product" badge (orange/yellow)
- Other users can select this pending product for their requests (visible in dropdown with "Pending" badge)
- Admin can view pending products in Inventory Management with "Show Pending Products" filter

**Stage 3: Activation (On Fulfillment)**
- When Purchase Manager fulfills request, backend checks for pending products:
```javascript
for (const item of request.items) {
  if (item.isPendingProduct) {
    // Activate pending product
    await ShopItem.findByIdAndUpdate(item.productId, {
      isPendingProduct: false,
      isActive: true,
      stock: item.receivedQuantity,  // Set stock (not increment)
      lowStockThreshold: getDefaultThreshold(product.category),
      balagruhaId: request.balagruhaId === 'STOCK' ? null : request.balagruhaId
    });
  } else {
    // Existing product: increment stock
    await ShopItem.findByIdAndUpdate(item.productId, {
      $inc: { stock: item.receivedQuantity }
    });
  }
}
```
- Activated product now visible in Shop Inventory and available for purchase
- Product available for selection in future purchase requests (without "Pending" badge)

**Category-Based Low Stock Thresholds:**
| Category | Default Threshold |
|----------|-------------------|
| Consumables | 20 |
| Stationery | 15 |
| Hygiene | 25 |
| Equipment | 5 |
| Others | 10 |

**UI Features:**

**Create Purchase Request Modal:**
- "+ Add New Product" button placement: Above product checkbox list, next to "Show all products" toggle
- Button styling: Outlined button with "+" icon
- Inline form (not modal) appears on click with dashed border background
- "New Product" badge displayed on form header (warning color)
- Cancel button clears form and closes inline section
- "Add to Request" validates and adds product

**Selected Products Table:**
- Pending products show "New Product" chip/badge (orange/warning color)
- Badge persists through request creation and submission
- Pending products can be removed from selection (product not deleted, remains pending)

**Inventory Management (Admin View):**
- "Show Pending Products" toggle/filter
- Pending products table columns:
  - Product Name with "Pending" badge
  - SKU
  - Category
  - Unit
  - Stock (0)
  - Created By (user name)
  - Created in Request (link to purchase request)
- Admin can manually activate or delete pending products

**Product Selection Dropdown (All Views):**
- Pending products visible in product selection with "Pending Product" badge
- Tooltip: "This product is pending approval. It will be activated when the first purchase is fulfilled."
- Filter option: "Include Pending Products" (default: ON)

**Edge Cases Handled:**

**1. Rejected Request:**
- Pending product remains in pending state (not deleted)
- Available for future requests
- Admin can manually delete if truly not needed

**2. Duplicate Product Names:**
- Two users can create "Pee proof Pants" with different SKUs
- Both allowed (differentiated by SKU)
- SKU uniqueness enforced

**3. Multiple Pending Products in Same Request:**
- Request can contain mix of existing and pending products
- Example: 2 existing + 3 new = 5 products total
- All pending products activated on fulfillment

**4. Concurrent SKU Creation:**
- Backend validates SKU uniqueness before insertion
- Second user with duplicate SKU receives error: "SKU already exists"

**5. Partial Fulfillment:**
- Only received quantities activate pending products
- Example: Requested 100, received 80 → Stock set to 80

**Example Workflow:**

**Scenario: Coach Creates Request for New Product**

1. **Coach (Priya) - Tuesday 10:00 AM**
   - Opens Create Purchase Request modal
   - Selects Balagruha: "Mathrudhama"
   - Searches for "Pee proof Pants" → Not found
   - Clicks "+ Add New Product"
   - Fills form:
     - Name: "Pee proof Pants"
     - Category: Consumables
     - Unit: pieces
     - SKU: (empty - auto-generated)
     - Description: "Water-resistant undergarment"
   - Clicks "Add to Request"
   - Product appears in selection with "New Product" badge
   - SKU auto-generated: "NEW-1699267200"
   - Adds 2 existing products (Paracetamol, Bandages)
   - Enters quantities, costs, justification
   - Submits request

2. **Backend Processing**
   - Creates ShopItem: `{ isPendingProduct: true, isActive: false, stock: 0 }`
   - Calculates threshold: Total Rs 8,000 (small purchase)
   - Creates PurchaseRequest: `{ status: 'pending_fulfillment', items: [existing, existing, pending] }`
   - Links pending product: `createdInRequest: PR-025`

3. **Medical Incharge (Dr. Sharma) - Tuesday 2:00 PM**
   - Opens Create Purchase Request modal for "Sadashraya"
   - Searches products → Sees "Pee proof Pants" with "Pending Product" badge
   - Hovers over badge → Tooltip: "Pending approval, will activate on first purchase"
   - Selects it for own request
   - Submits request PR-026

4. **Purchase Manager (Ravi) - Wednesday 10:00 AM**
   - Receives supplier delivery for PR-025 (Coach's request)
   - Clicks "Update Stock" for PR-025
   - Enters supplier details, confirms received quantities
   - Clicks "Update Stock & Complete"
   - Backend activates "Pee proof Pants":
     - `isPendingProduct: false`
     - `isActive: true`
     - `stock: 100` (received quantity)
     - `lowStockThreshold: 20` (Consumables default)
     - `balagruhaId: Mathrudhama ObjectId`

5. **Wednesday 10:05 AM - Now Active**
   - "Pee proof Pants" now visible in Shop Inventory
   - Available for purchase by students
   - Dr. Sharma's pending request PR-026 still valid (will increment stock when fulfilled)
   - Future requests can select "Pee proof Pants" without "Pending" badge

**Backend Implementation:**

**New ShopItem Fields:**
```javascript
const shopItemSchema = new mongoose.Schema({
  // ... existing fields ...

  isPendingProduct: {
    type: Boolean,
    default: false,
    index: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  createdInRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PurchaseRequest',
    default: null
  }
}, { timestamps: true });
```

**New API Endpoints:**
- `POST /api/products/pending` - Create pending product (returns product ID)
- `GET /api/products?includePending=true` - Fetch all products including pending
- `GET /api/products?status=pending` - Fetch only pending products

**Security Considerations:**
- Only authenticated users with purchase request creation permission can add pending products
- SKU uniqueness enforced to prevent conflicts
- Pending products not visible in Shop (student-facing) until activated
- Audit trail: `createdBy` field tracks who added product
- Backend validates Balagruha assignment on request creation

**Integration with Story 21 (STOCK):**
- STOCK requests can include pending products
- On activation, pending products in STOCK requests get `balagruhaId: null`
- STOCK products remain unassigned to specific Balagruha
- Future allocation tracked via `allocatedToBalagruhas` field

**Success Metrics:**
- Inline product addition reduces workflow time by 80% (2 minutes vs 10+ minutes)
- 100% of pending products activated on first fulfillment
- Zero duplicate SKU errors after validation
- Users can add new products without Admin intervention
- Pending products visible and selectable by all authorized users

---

### **19. Coin Distribution Reports [S5]**

* **Feature ID:** S5-REP-ADM-001
* **Feature Name:** Virtual Economy Analytics
* **Development Timeline:** Week 3 (Days 15-20)

#### **User Story 1 (Admin):**
"As an Admin, I need comprehensive insights into the coin economy to ensure balanced reward distribution."

**Acceptance Criteria:**
* **AC1.1:** Economy Dashboard displays:
  * Total Coins in Circulation (real-time)
  * Daily/Weekly/Monthly earning trends
  * Daily/Weekly/Monthly spending trends
  * Coins-to-Activity ratio (health metric)
  * Average student wallet balance
* **AC1.2:** Student Analytics:
  * Top 10 Earners leaderboard with earning sources
  * Top 10 Spenders with purchase categories
  * Inactive wallets (no activity > 30 days)
  * Student journey map (earn → save → spend cycle)
* **AC1.3:** Product Performance:
  * Best selling products (by units and revenue)
  * Product conversion rates (views to purchases)
  * Category performance comparison
  * Stock turnover rate
* **AC1.4:** Detailed Transaction Logs:
  * Searchable by student, date range, type
  * Export capabilities (PDF, CSV)
  * Transaction details drill-down
  * Audit trail for coin adjustments

#### **Analytics Aggregation Queries:**
```javascript
// Daily coin flow aggregation
db.coinTransactions.aggregate([
  { $match: {
    timestamp: {
      $gte: startOfDay,
      $lt: endOfDay
    }
  }},
  { $group: {
    _id: {
      type: "$transactionType",
      hour: { $hour: "$timestamp" }
    },
    total: { $sum: "$amount" },
    count: { $sum: 1 }
  }},
  { $project: {
    hour: "$_id.hour",
    earned: { $cond: [{ $eq: ["$_id.type", "earned"] }, "$total", 0] },
    spent: { $cond: [{ $eq: ["$_id.type", "spent"] }, "$total", 0] }
  }}
]);
```

---

## **Section C: Shared & System-Wide Features**

### **20. Unified ISF Coin Wallet System [SHARED]**

* **Feature ID:** S2-S5-WALLET-001
* **Feature Name:** Integrated Coin Management
* **Development Timeline:** Week 1 (Days 1-5) - Critical path

#### **Implementation Requirements:**
* Real-time balance synchronization between LMS earning and Shop spending
* Transaction atomicity to prevent double-spending
* Offline transaction queuing with reconciliation
* Audit log for all coin movements

#### **Wallet State Management:**
```javascript
const WalletService = {
  // Atomic transaction for coin operations
  transferCoins: async (studentId, amount, type, reference) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Get current balance with lock
      const wallet = await Wallet.findOne({ studentId }).session(session);

      // Validate sufficient funds for spending
      if (type === 'spend' && wallet.balance < amount) {
        throw new Error('Insufficient funds');
      }

      // Update balance
      wallet.balance += (type === 'earn' ? amount : -amount);
      await wallet.save({ session });

      // Log transaction
      await TransactionLog.create([{
        studentId,
        type,
        amount,
        reference,
        balanceAfter: wallet.balance,
        timestamp: new Date()
      }], { session });

      await session.commitTransaction();

      // Emit real-time update
      io.to(`student-${studentId}`).emit('wallet-update', wallet.balance);

      return wallet.balance;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
};
```

### **21. Enhanced Notification Center [SHARED]**

* **Feature ID:** S2-S5-NOTIF-001
* **Feature Name:** Unified Notification System
* **Development Timeline:** Week 2 (Days 8-12)

#### **Notification Types & Templates:**

**Sprint 2 Notifications:**
```javascript
const LMSNotifications = {
  courseAssigned: {
    title: "New Course Available!",
    body: "You've been assigned '[CourseName]'",
    icon: "book",
    action: "/lms/courses/[courseId]"
  },

  gradeReceived: {
    title: "Work Graded!",
    body: "Your [TaskType] received [Grade] and [Coins] coins!",
    icon: "star",
    action: "/lms/grades"
  },

  voiceNoteReceived: {
    title: "New Voice Message",
    body: "You have a voice note from [SenderName]",
    icon: "mic",
    action: "/communication/voice/[noteId]"
  }
};
```

**Sprint 5 Notifications:**
```javascript
const ShopNotifications = {
  orderConfirmed: {
    title: "Order Successful!",
    body: "Order #[OrderId] confirmed. [Items] items purchased.",
    icon: "shopping-bag",
    action: "/shop/orders/[orderId]"
  },

  lowBalance: {
    title: "Low Coin Balance",
    body: "You need [Amount] more coins for your cart items",
    icon: "alert",
    action: "/lms/earn-more"
  },

  backInStock: {
    title: "Item Available!",
    body: "[ProductName] from your wishlist is back in stock",
    icon: "heart",
    action: "/shop/product/[productId]"
  }
};
```

### **22. Voice Communication System [S2]**

* **Feature ID:** S2-SYS-VC-001
* **Feature Name:** WhatsApp-Style Voice Notes
* **Development Timeline:** Week 2-3 (Days 10-16)

#### **Technical Implementation:**
```javascript
const VoiceNoteService = {
  recordingConstraints: {
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
      channelCount: 1
    }
  },

  startRecording: function() {
    navigator.mediaDevices.getUserMedia(this.recordingConstraints)
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm;codecs=opus'
        });

        this.mediaRecorder.start();
        this.visualizeAudio(stream); // Waveform visualization
      });
  },

  processRecording: async function(audioBlob) {
    // Compress audio
    const compressed = await this.compressAudio(audioBlob);

    // Upload to S3
    const url = await this.uploadToS3(compressed);

    // Send notification
    await NotificationService.send({
      type: 'voice-note',
      recipientId: this.recipientId,
      audioUrl: url,
      duration: this.duration
    });
  }
};
```

### **23. Automated WhatsApp Integration [S2]**

* **Feature ID:** S2-SYS-WAPP-001
* **Feature Name:** Schedule Distribution via WhatsApp
* **Development Timeline:** Week 3 (Days 18-21)

#### **Integration Architecture:**
```javascript
const WhatsAppService = {
  provider: 'twilio', // or '360dialog'

  sendScheduleNotification: async (balagruhaId, schedule) => {
    const balagruha = await Balagruha.findById(balagruhaId);

    if (!balagruha.whatsappGroupId) {
      logger.warn(`No WhatsApp group for Balagruha ${balagruhaId}`);
      return;
    }

    const message = formatScheduleMessage(schedule);

    try {
      await twilioClient.messages.create({
        from: 'whatsapp:+14155238886', // Twilio sandbox number
        to: `whatsapp:${balagruha.whatsappGroupId}`,
        body: message,
        mediaUrl: schedule.imageUrl // Optional schedule image
      });

      logger.info(`Schedule sent to Balagruha ${balagruhaId}`);
    } catch (error) {
      logger.error(`WhatsApp send failed: ${error.message}`);
      // Queue for retry
      await RetryQueue.add({ type: 'whatsapp', payload: { balagruhaId, schedule } });
    }
  }
};
```

### **24. Error Handling & PM Task System [S2]**

* **Feature ID:** S2-SYS-PM-001
* **Feature Name:** Centralized Error Management
* **Development Timeline:** Week 1 (Days 3-5)

#### **Global Error Handler Implementation:**
```javascript
// Frontend Error Boundary
class GlobalErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to backend
    API.post('/api/system/errors', {
      type: 'frontend',
      error: error.toString(),
      stack: errorInfo.componentStack,
      userId: getCurrentUser().id,
      timestamp: new Date()
    });

    // Show child-friendly message
    this.setState({
      hasError: true,
      message: getChildFriendlyMessage(error)
    });
  }

  render() {
    if (this.state.hasError) {
      return <FriendlyErrorScreen message={this.state.message} />;
    }
    return this.props.children;
  }
}

// Backend Error Middleware
app.use((error, req, res, next) => {
  // Create PM task
  TaskService.create({
    type: 'system-error',
    priority: error.severity || 'medium',
    assignedTo: 'playground-manager',
    title: `Error in ${req.path}`,
    details: {
      error: error.message,
      stack: error.stack,
      user: req.user?.id,
      timestamp: new Date()
    }
  });

  // Send friendly response
  res.status(500).json({
    message: "Oops! Something went magical. We're fixing it!",
    errorId: error.id
  });
});
```

---

## **25. Non-Functional Requirements (Combined Sprint)**

### **25.1. Performance Requirements**

* **Target Hardware:** Core i3 4th Gen, 8GB DDR3 RAM, 256GB SSD, 1366x768 display
* **Load Time Targets:**
  * Initial app launch: < 10 seconds
  * Course content load: < 3 seconds
  * Shop page load: < 2 seconds
  * Cart operations: < 500ms
  * Video start: < 5 seconds

### **25.2. Scalability Requirements**

* **Concurrent Users:** Support 500+ simultaneous students across all Balagruhas
* **Data Growth:**
  * 10,000+ course content items
  * 1,000+ shop products
  * 1 million+ coin transactions
  * 100GB+ media storage

### **25.3. Security Requirements**

* **Authentication:**
  * Facial recognition for students (Sprint 2)
  * JWT tokens with 24-hour expiry
  * Role-based access control (RBAC)
  * Session timeout after 30 minutes inactivity

* **Data Protection:**
  * Encryption at rest for sensitive data
  * HTTPS for all API communications
  * Input sanitization for XSS prevention
  * SQL injection prevention

### **25.4. Offline Capabilities**

* **Sprint 2 - LMS Offline:**
  * Course content cached locally
  * Progress tracked in SQLite
  * Queue submissions for sync
  * 7-day offline operation

* **Sprint 5 - Shop Offline:**
  * Product catalog cached
  * Cart persisted locally
  * Orders queued for processing
  * Balance validation on reconnect

### **25.5. Accessibility Requirements**

* WCAG 2.1 Level AA compliance
* Keyboard navigation support
* Screen reader compatibility
* High contrast mode option
* Font size adjustment

---

## **26. Development Timeline & Milestones**

### **30-Day Parallel Sprint Schedule**

#### **Week 1 (Days 1-7)**
**Sprint 2 Team:**
- Days 1-2: Student homepage, navigation structure
- Days 3-4: Computer Apps course framework
- Days 5-7: Art course with Artweaver integration

**Sprint 5 Team:**
- Days 1-2: Shop frontend structure
- Days 3-4: Product catalog and filtering
- Days 5-7: Shopping cart implementation

**Shared/Integration:**
- Day 1: Coin wallet system architecture
- Days 6-7: First integration checkpoint

#### **Week 2 (Days 8-14)**
**Sprint 2 Team:**
- Days 8-9: Spoken English video recording
- Days 10-11: Life Skills with voice notes
- Days 12-14: Course management (Admin)

**Sprint 5 Team:**
- Days 8-9: Checkout flow
- Days 10-11: Admin product management
- Days 12-14: Inventory system

**Shared/Integration:**
- Days 8-10: Notification center enhancement
- Day 14: Second integration checkpoint

#### **Week 3 (Days 15-21)**
**Sprint 2 Team:**
- Days 15-16: Coach grading system
- Days 17-18: Translation module
- Days 19-21: Amma enhancements

**Sprint 5 Team:**
- Days 15-17: Coin distribution reports
- Days 18-19: Wishlist feature
- Days 20-21: Order history

**Shared/Integration:**
- Days 15-17: Voice communication system
- Days 18-21: WhatsApp integration

#### **Week 4 (Days 22-30)**
**Both Teams:**
- Days 22-24: Integration testing
- Days 25-26: Performance optimization
- Days 27-28: Security audit
- Days 29-30: UAT and final fixes

### **Critical Path Dependencies**

1. **Coin Wallet System** (Day 1-5) - Blocks both Shop checkout and LMS rewards
2. **User Authentication** - Prerequisite for all features
3. **Notification System** (Day 8-12) - Required for both modules
4. **Course Creation** must precede Coach Grading
5. **Product Management** must precede Inventory System

---

## **27. Testing Strategy**

### **27.1. Test Coverage Requirements**

* **Unit Testing:** Minimum 80% code coverage
* **Integration Testing:** All API endpoints
* **E2E Testing:** Critical user journeys
* **Performance Testing:** Load testing with 100 concurrent users
* **Security Testing:** Penetration testing for Shop module

### **27.2. Test Scenarios**

**LMS Critical Paths:**
1. Student login → Course selection → Task completion → Coin earning
2. Admin course creation → Assignment → Student access
3. Student submission → Coach grading → Coin award
4. Voice note recording → Sending → Receiving → Playback

**Shop Critical Paths:**
1. Browse products → Add to cart → Checkout → Order confirmation
2. Filter products → View details → Add to wishlist
3. Admin product creation → Inventory update → Stock depletion
4. Insufficient funds → Earn more coins prompt → Return to shop

**Integration Scenarios:**
1. Complete LMS task → Earn coins → Spend in shop
2. Low coin balance → Shop notification → LMS suggestion
3. Course completion → Bonus coins → Immediate shop availability

---

## **28. Resource Requirements**

### **28.1. Development Team Structure**

**Sprint 2 Team (6 developers):**
- 2 Frontend developers (React, Electron)
- 2 Backend developers (Node.js, MongoDB)
- 1 Integration specialist (Artweaver, Graphics pad)
- 1 QA engineer

**Sprint 5 Team (5 developers):**
- 2 Frontend developers (React, E-commerce)
- 2 Backend developers (Node.js, Inventory)
- 1 QA engineer

**Shared Resources (3 members):**
- 1 DevOps engineer
- 1 UI/UX designer
- 1 Project coordinator

### **28.2. Infrastructure Requirements**

* **Development Environment:**
  - 3 development servers
  - MongoDB replica set
  - S3 bucket for media (10TB)
  - CI/CD pipeline

* **Testing Environment:**
  - 2 test servers matching production specs
  - Test data set with 1000+ students
  - Automated testing tools

---

## **29. Risk Assessment & Mitigation**

### **29.1. Technical Risks**

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Artweaver integration complexity | High | High | Early POC, fallback to web-based drawing |
| WhatsApp API approval delays | Medium | Medium | Implement email notifications as backup |
| Performance on target hardware | Medium | High | Continuous performance testing, optimization sprint |
| Offline sync conflicts | Medium | Medium | Conflict resolution UI, admin override |

### **29.2. Resource Risks**

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Parallel sprint coordination | Medium | High | Daily standups, shared Slack channel |
| Integration delays | Medium | Medium | Weekly integration checkpoints |
| Testing bottleneck | Low | High | Automated testing, parallel QA tracks |

---

## **30. Questions for Client Clarification**

### **30.1. Sprint 2 Clarifications Needed:**

1. **Life Skills "Learn then Test" Model:**
   - Should we implement a simplified version where students must view content before attempting quiz?
   - What should be the minimum viewing time to qualify as "learned"?

2. **Amma SLA Configuration:**
   - What should be the default SLA times for different query types?
   - Should SLA breaches trigger escalation to Admin or Coach?

3. **Translation Support:**
   - Should system UI elements also be translated, or only course content?
   - Do you have translation resources, or should we integrate with a service?

### **30.2. Sprint 5 Clarifications Needed:**

1. **Product Catalog:**
   - What is the expected product catalog size at launch?
   - Will products be physical items only, or include digital rewards?
   - How frequently will the catalog be updated?

2. **Wishlist Feature:**
   - Should wishlist items trigger notifications when in stock?
   - Should students be able to share wishlists with coaches/admins?

3. **Order Fulfillment:**
   - Who will handle physical product distribution?
   - Should we track delivery status in the system?
   - How should we handle "lost" orders?

### **30.3. Integration Clarifications:**

1. **Coin Economy Balance:**
   - What should be the initial coin allocation for new students?
   - Should there be daily/weekly coin earning limits?
   - Can admins manually adjust student coin balances?

2. **Open Source Tools:**
   - Which specific open-source educational tools should we integrate?
   - Should these launch within the Electron app or externally?

---

## **31. Success Criteria & Acceptance**

### **31.1. Sprint 2 Success Metrics:**

* 100% of planned course types functional
* Course creation to student access < 5 minutes
* All grading workflows operational
* Voice note feature working across all roles
* 95% offline functionality for student activities

### **31.2. Sprint 5 Success Metrics:**

* Complete shop purchase flow functional
* Real-time inventory tracking accurate
* Coin transactions atomic and auditable
* All reports generating accurately
* < 3 second shop page load times

### **31.3. Combined Sprint Success Criteria:**

* Seamless coin flow from earning to spending
* Unified notification system operational
* All features accessible on target hardware
* Zero critical security vulnerabilities
* Complete API documentation
* User training materials prepared

---

## **32. Appendix A: Technical Architecture Diagrams**

### **32.1. System Architecture Overview**

```
┌─────────────────────────────────────────────┐
│           Electron Desktop App              │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────┐     ┌──────────────┐    │
│  │   LMS        │     │   ISF Shop   │    │
│  │   Module     │     │   Module     │    │
│  │   (Sprint 2) │     │   (Sprint 5) │    │
│  └──────┬───────┘     └──────┬───────┘    │
│         │                     │             │
│  ┌──────┴─────────────────────┴───────┐    │
│  │     Shared Components              │    │
│  │  - Coin Wallet                     │    │
│  │  - Notifications                   │    │
│  │  - Authentication                  │    │
│  └──────┬─────────────────────────────┘    │
│         │                                   │
└─────────┼───────────────────────────────────┘
          │
    ┌─────▼─────────────────────┐
    │   Node.js Backend API     │
    ├───────────────────────────┤
    │  - Express Routes         │
    │  - WebSocket Server       │
    │  - Job Queues             │
    └─────┬─────────────────────┘
          │
    ┌─────▼──────┬──────────────┐
    │  MongoDB   │   AWS S3     │
    │  Database  │   Storage    │
    └────────────┴──────────────┘
```

### **32.2. Data Flow Diagram - Coin Economy**

```
Student Completes Task (LMS)
         │
         ▼
    Task Graded by Coach
         │
         ▼
    Coins Awarded → Wallet Balance Updated
         │                    │
         ▼                    ▼
   Notification Sent    Real-time UI Update
         │                    │
         ▼                    ▼
   Student Views        Can Spend in Shop
   Balance                    │
                             ▼
                     Product Selection
                             │
                             ▼
                     Add to Cart
                             │
                             ▼
                   Checkout Validation
                     ├─── Sufficient ───→ Order Confirmed
                     │                    │
                     │                    ▼
                     │              Coins Deducted
                     │              Stock Updated
                     │
                     └─ Insufficient ──→ Prompt to Earn More
                                         Link to LMS
```

---

## **33. Appendix B: Database Schemas**

### **33.1. Combined User Schema (Enhanced)**

```javascript
const UserSchema = new mongoose.Schema({
  // Core fields from Sprint 1
  _id: ObjectId,
  username: String,
  email: String,
  password: String, // bcrypt hashed
  role: {
    type: String,
    enum: ['student', 'coach', 'admin', 'amma', 'playground-manager']
  },

  // Sprint 2 additions
  preferences: {
    language: { type: String, default: 'en' },
    notifications: {
      courseAssignments: { type: Boolean, default: true },
      gradeReceived: { type: Boolean, default: true },
      voiceNotes: { type: Boolean, default: true }
    }
  },

  // Student-specific fields
  studentProfile: {
    balagruhaId: ObjectId,
    faceDescriptor: Buffer, // For facial recognition

    // Sprint 2 - LMS
    enrolledCourses: [{
      courseId: ObjectId,
      enrolledDate: Date,
      progress: Number, // Percentage
      lastAccessed: Date
    }],

    // Shared - Coin Wallet
    coinWallet: {
      balance: { type: Number, default: 0 },
      totalEarned: Number,
      totalSpent: Number,
      lastTransaction: Date
    },

    // Sprint 5 - Shopping
    shopProfile: {
      wishlist: [ObjectId], // Product IDs
      addresses: [{
        type: String,
        line1: String,
        line2: String,
        notes: String
      }],
      orderHistory: [ObjectId] // Order IDs
    }
  },

  // Coach-specific fields
  coachProfile: {
    assignedBalagruhas: [ObjectId],
    gradingQueue: [{
      submissionId: ObjectId,
      priority: Number,
      addedDate: Date
    }]
  },

  // Amma-specific fields (Sprint 2)
  ammaProfile: {
    approvalStatus: String, // 'pending', 'approved', 'rejected'
    assignedBalagruhas: [ObjectId],
    activeTasks: [{
      taskId: ObjectId,
      slaDeadline: Date,
      priority: String
    }]
  },

  timestamps: true
});
```

### **33.2. Transaction Schema (Unified)**

```javascript
const TransactionSchema = new mongoose.Schema({
  _id: ObjectId,
  studentId: { type: ObjectId, required: true, index: true },

  type: {
    type: String,
    enum: ['earn', 'spend', 'adjust', 'refund'],
    required: true
  },

  category: {
    type: String,
    enum: [
      // Earning categories (Sprint 2)
      'course-completion',
      'quiz-passed',
      'assignment-graded',
      'perfect-attendance',
      'special-achievement',

      // Spending categories (Sprint 5)
      'shop-purchase',
      'event-ticket',
      'digital-content'
    ]
  },

  amount: { type: Number, required: true },

  balanceBefore: Number,
  balanceAfter: Number,

  reference: {
    model: String, // 'Course', 'Task', 'Order', etc.
    id: ObjectId
  },

  metadata: {
    description: String,
    performedBy: ObjectId, // Who triggered this transaction
    notes: String
  },

  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'reversed'],
    default: 'completed'
  },

  timestamp: { type: Date, default: Date.now, index: true }
});

// Compound indexes for reporting
TransactionSchema.index({ studentId: 1, timestamp: -1 });
TransactionSchema.index({ type: 1, category: 1, timestamp: -1 });
```

---

## **34. Appendix C: API Documentation Structure**

### **34.1. Sprint 2 - LMS APIs**

```yaml
/api/v2/lms:
  /courses:
    GET: List all courses (filtered by role)
    POST: Create new course (Admin only)

  /courses/{courseId}:
    GET: Get course details
    PUT: Update course (Admin only)
    DELETE: Archive course (Admin only)

  /courses/{courseId}/assign:
    POST: Assign course to students

  /courses/{courseId}/content:
    POST: Add content item (Admin only)
    PUT: Update content item (Admin only)

  /student/progress:
    GET: Get student's course progress
    POST: Update progress (automatic)

  /grading:
    GET: Get pending submissions (Coach)
    POST: Submit grade and coins

  /voice-notes:
    POST: Upload voice note
    GET: Get voice notes for user
```

### **34.2. Sprint 5 - Shop APIs**

```yaml
/api/v2/shop:
  /products:
    GET: List products (with filters)
    POST: Create product (Admin only)

  /products/{productId}:
    GET: Get product details
    PUT: Update product (Admin only)
    DELETE: Deactivate product (Admin only)

  /cart:
    GET: Get current cart
    POST: Add item to cart
    PUT: Update item quantity
    DELETE: Remove item from cart

  /checkout:
    POST: Process order
    GET: Validate cart for checkout

  /orders:
    GET: Get user's orders

  /orders/{orderId}:
    GET: Get order details

  /wishlist:
    GET: Get wishlist
    POST: Add to wishlist
    DELETE: Remove from wishlist

  /inventory:
    GET: Get inventory levels (Admin)
    PUT: Update stock (Admin)

  /reports/coin-economy:
    GET: Get economy metrics (Admin)
```

---

## **35. Sign-off Section**

### **35.1. Stakeholder Agreement**

This Master Project Specification Document (MPSD) for the combined Sprint 2 and Sprint 5 represents the complete, agreed-upon scope of work for the 30-day parallel development effort. All stakeholders acknowledge that:

1. This document is the single source of truth for all development activities
2. The 30-day timeline requires parallel execution with defined integration points
3. Any scope changes must go through formal change request process
4. Success criteria are clearly defined and measurable
5. Resource allocation has been agreed upon

### **35.2. Approval Signatures**

**Client (ISF Representative):**
* Name: _______________________________
* Title: _______________________________
* Signature: ___________________________
* Date: ________________________________

**Project Manager:**
* Name: _______________________________
* Signature: ___________________________
* Date: ________________________________

**Technical Lead (Sprint 2):**
* Name: _______________________________
* Signature: ___________________________
* Date: ________________________________

**Technical Lead (Sprint 5):**
* Name: _______________________________
* Signature: ___________________________
* Date: ________________________________

**QA Lead:**
* Name: _______________________________
* Signature: ___________________________
* Date: ________________________________

**Product Owner:**
* Name: _______________________________
* Signature: ___________________________
* Date: ________________________________

### **35.3. Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Aug 19, 2025 | Team | Initial Sprint 2 MPSD |
| 1.0 | Aug 19, 2025 | Team | Initial Sprint 5 MPSD |
| 3.0 | Sep 16, 2025 | Team | Combined Sprint 2-5 MPSD |

### **35.4. Distribution List**

* ISF Project Sponsor
* ISF Program Director
* Development Team (14 members)
* QA Team (2 members)
* DevOps Team
* External Stakeholders (as required)

---

## **36. Post-Implementation Considerations**

### **36.1. Sprint 3 & 4 Dependencies**

Features developed in this combined sprint will enable:
* **Sprint 3:** Mobile app can leverage the LMS APIs and coin wallet
* **Sprint 4:** SOS system can use the notification infrastructure
* **Future:** Analytics platform can use the transaction data

### **36.2. Maintenance & Support Plan**

* **Week 31-35:** Stabilization and bug fixes
* **Week 36-40:** Performance optimization
* **Week 41+:** Feature enhancements based on user feedback

### **36.3. Training Requirements**

* **Admin Training:** 2-day workshop on course creation and shop management
* **Coach Training:** 1-day session on grading and student monitoring
* **Student Orientation:** 30-minute guided tour of new features
* **Documentation:** Video tutorials for all major workflows

---

**END OF DOCUMENT**

**Total Pages: 96**
**Word Count: ~24,000**
**Last Updated: November 6, 2025 - 19:28:44 (Added Story 25: Inline Product Addition to Section 18.5.3)**
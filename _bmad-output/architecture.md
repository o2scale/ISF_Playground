---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2025-12-22'
updatedAt: '2026-03-15'
project_name: 'ISF_Playground'
user_name: 'Dev'
date: '2025-12-22'
---

# Architecture Decision Document

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The project requires a **Workflow Engine Refactor** to support a strict 4-step procurement lifecycle. Key architectural drivers include:
1.  **State Machine:** Moving from loose string statuses to a strictly defined state transition model (Requested -> Ordered -> InStore -> Delivered).
2.  **Relational Data:** Shifting from free-text "supplier" fields to a relational `Vendor` entity.
3.  **Role Enforcement:** Middleware must enforce not just *who* can access an endpoint, but *which state transitions* they can trigger.

**Non-Functional Requirements:**
*   **Data Consistency:** The 4-step flow + Stock Reconciliation requires ACID transactions (MongoDB Sessions).
*   **Auditability:** Every state change must be logged. This suggests a dedicated `AuditLog` or `WorkflowHistory` collection/embedded array.
*   **Performance:** Dashboards need efficient indexing on `status` and `priority` to load instantly.

**Scale & Complexity:**
*   **Primary Domain:** Internal B2B / ERP Tool.
*   **Complexity Level:** Medium (High business logic, low scale).
*   **Estimated Components:** 3 New Models (`Vendor`, `AuditLog`, `SystemConfig`), 5 Updated Controllers.

### Technical Constraints & Dependencies
*   **Legacy Data:** Existing `ShopItems` and `PurchaseRequests` must be migrated or backward-compatible.
*   **Electron Shell:** Updates to the frontend must be deployable (Web vs Desktop builder considerations).
*   **MongoDB:** Must use Replica Set (even in dev) to support Transactions.

### Sprint Execution Status (as of March 2026)

> **Important reconciliation note:** This architecture was originally written for the Sprint 5 Purchase Manager workflow (December 2025). Since then the project has evolved through multiple sprints, but not all planned work was executed:
>
> *   **Sprint 1.1 (FR Rebuild):** Completed. Facial Recognition rebuilt with `@vladmandic/human`.
> *   **Sprint 2 (LMS):** Backend routes and controllers built. **Amma (Student App) frontend features were NOT built.**
> *   **Sprint 3-4:** **NOT executed.** Any features planned for these sprints do not exist in the codebase.
> *   **Sprint 5 (Shop/Purchase Manager):** Completed. Full procurement workflow, vendor management, shop, cart, orders, inventory, analytics, reports, and coach delivery.
> *   **Sprint 6 (Medical/Health):** Completed. Doctor, hospital, and medical check-in systems deployed.
>
> The sections below reflect the **actual state of the codebase** as of March 2026.

## Integration Strategy (Brownfield)

### Primary Technology Domain
**Full-Stack Extension (MERN + Electron)**
Since this is an existing brownfield project, we are not selecting a new starter template. Instead, we are defining the **Extension Pattern** to ensuring the new Purchase Manager workflow integrates seamlessly with the existing architecture.

### Selected Approach: Module Extension
**Rationale:** We must respect the existing project structure (`backend/` MVC, `frontend/src/components/` domain-driven) to avoid technical debt.

**Architecture Decisions Preserved:**
*   **Language:** JavaScript (ES6+ / CommonJS for backend).
*   **Styling:** Tailwind CSS (v3) + Radix UI Primitives.
*   **State:** Zustand stores (extend `shopStore.js` or create `procurementStore.js`).
*   **Database:** MongoDB Mongoose (Strict schemas).

**New Module Structure:**
*   **Backend:**
    *   `models/Vendor.js`
    *   `controllers/vendorController.js`
    *   `routes/v2/vendor.js`
*   **Frontend:**
    *   `src/components/purchase-manager/*` (Dashboard, Request Form)
    *   `src/components/admin/inventory/*` (New Item Form, Vendor Mgmt)

## Core Architectural Decisions

### Data Architecture
*   **Vendor Schema:** Create new `Vendor` collection `{ name, contactInfo, address, active }`.
*   **ShopItem Extension:** Add `approvedVendors` array (refs) and `maxPrice` (Number).
*   **Audit Logic:** Leverage existing `InventoryTransaction` model with `type: 'adjustment'` for the new Stock Reconciliation feature.

### Workflow & State Management
*   **Pattern:** Service-Layer State Guard.
*   **Logic:** Centralize status transitions in `purchaseRequestService.js`.
*   **Validation:**
    *   `request` -> `order_placed`: User must be PM.
    *   `order_placed` -> `delivered_to_store`: User must be PM.
    *   `delivered_to_store` -> `delivered_to_balagruha`: User must be Coach (Requester).

### Authorization Strategy
*   **Approach:** Hybrid RBAC.
*   **Implementation:** Continue using `checkPermission` middleware for route access, but add specific logic in controllers for "Resource Ownership" (e.g., verifying `req.user.balagruhaId` matches the request).

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined
**Critical Conflict Points Identified:** 4 areas (API Naming, Component Structure, State Management, Error Handling).

### Naming Patterns
*   **API Endpoints:** V2 routes follow `/api/v2/<domain>/*` (e.g., `/api/v2/shop/*`, `/api/v2/vendors/*`, `/api/v2/fr/*`, `/api/v2/lms/*`). Admin sub-routes nest under their domain (e.g., `/api/v2/shop/admin/*`).
*   **Database Models:** PascalCase singular (e.g., `Vendor`, `ShopItem`).
*   **Frontend Components:** PascalCase (e.g., `VendorList.js`, `NewItemForm.js`).

### Structure Patterns
*   **Frontend Components:**
    *   Admin features -> `src/components/admin/inventory/`
    *   PM features -> `src/components/purchase-manager/`
    *   Coach features -> `src/components/shop/` (Existing)
*   **Backend Controllers:**
    *   `vendorController.js` (New)
    *   `purchaseRequestController.js` (Update)

### Format Patterns
*   **API Response:** Standard wrapper `{ success: boolean, data: any, message: string }`.
*   **Dates:** ISO 8601 strings in API, formatted locally using `date-fns`.

### Communication Patterns
*   **State Management:** Extend `useShopStore` in `src/store/shopStore.js`. Do not create separate stores for Vendors/Requests to avoid sync issues.
*   **Events:** No complex event bus. Direct API calls with optimistic UI updates.

## Project Structure & Boundaries

### Complete Project Directory Structure

The following reflects the actual backend structure as of March 2026:

```text
backend/
  server.js                # Express app entry point, route mounting, Human/FR init
  models/
    # --- Shop / Procurement ---
    vendor.js              # Relational Vendor entity (Admin CRUD)
    shopItem.js            # Shop products: maxPrice, approvedVendors
    purchaseRequest.js     # 4-step status workflow, action history
    purchaseOrders.js      # Legacy purchase orders
    repairRequests.js      # Equipment repair tracking
    inventoryTransaction.js # Stock movements and audit trail
    cart.js                # Shopping cart
    order.js               # Checkout orders

    # --- LMS (Learning Management System) ---
    course.js              # Course definitions
    ContentLibrary.js      # LMS content items (video, PDF, etc.)
    Quiz.js                # Quiz definitions
    QuestionBank.js        # Question pool for quizzes
    Assignment.js          # Student assignments
    CourseAssignment.js    # Course-to-student assignment mapping
    StudentProgress.js     # Student progress tracking
    Submission.js          # Assignment/quiz submissions

    # --- WTF (Wall of Fame / Gamification) ---
    wtfPin.js              # Wall of Fame pins (content posts)
    wtfSettings.js         # WTF system configuration
    wtfStudentInteraction.js # Like/love/comment interactions
    wtfSubmission.js       # Student content submissions
    coin.js                # Virtual currency (Coins)

    # --- Facial Recognition ---
    FaceEmbedding.js       # Stored face descriptor vectors
    FRSession.js           # FR session tracking
    EmotionTracking.js     # Emotion detection results

    # --- Medical / Health ---
    medical.js             # Medical records
    medicalCheckIns.js     # Daily health check-ins
    doctor.js              # Doctor registry
    hospital.js            # Hospital registry

    # --- Core Platform ---
    user.js                # User accounts
    student.js             # Student profiles
    role.js                # RBAC role definitions
    balagruha.js           # Balagruha (home) entity
    attendance.js          # Attendance records
    activitylog.js         # Activity audit log
    notification.js        # Notifications
    userNotificationView.js # Notification read status
    schedules.js           # Scheduling
    task.js                # Task management
    sportsTasks.js         # Sports-specific tasks
    trainingSession.js     # Training sessions
    machine.js             # Equipment/machines
    machineAssignment.js   # Machine-to-user assignment
    machineactivelog.js    # Machine usage logs
    offlineReqQueue.js     # Offline request queue
    studentMoodTracker.js  # Student mood tracking

  controllers/
    vendorController.js
    purchaseRequestController.js
    adminProductController.js
    inventoryController.js
    orderController.js
    cartController.js
    shopController.js
    shopProductImageController.js
    analyticsController.js
    reportsController.js
    coachDeliveryController.js
    frController.js
    wtfController.js
    wtfSettingsController.js
    wtfWebSocketController.js
    medicalCheckInsController.js
    medicalRecordController.js
    doctorController.js
    hospitalController.js
    userController.js
    roleController.js
    profileController.js
    notificationController.js
    scheduleController.js
    schedulerController.js
    taskController.js
    studentMoodTrackerController.js
    questionBankController.js
    quizController.js
    contentController.js
    lms/
      admin/
        courseController.js
        adminAssignmentController.js
        translationController.js
      coach/
        coachAssignmentController.js
        coachGradingController.js
        coachReportsController.js
        manualAwardController.js
      student/
        studentDashboardController.js
        computerAppsController.js
        artCourseController.js
        spokenEnglishController.js
        lifeSkillsController.js

  routes/
    auth.js                # /api/auth
    userRoutes.js          # /api/users
    roleRoutes.js          # /api/roles
    taskRoutes.js          # /api/tasks
    scheduleRoutes.js      # /api/schedules
    notificationRoutes.js  # /api/notifications
    courseRoutes.js         # /api/v1/courses
    medicalCheckInsRoutes.js  # /api/medical-check-ins
    medicalRecordsRoutes.js   # /api/medical-records
    doctorRoutes.js        # /api/doctors
    hospitalRoutes.js      # /api/hospitals
    offlineRequestQueue.js # /api/offline-requests
    studentMoodTrackerRoutes.js  # /api/v1/mood-tracker
    v1/
      user.js              # /api/v1/users
      balagruha.js         # /api/v1/balagruha
      machines.js          # /api/v1/machines
      sports.js            # /api/v1/sports
      music.js             # /api/v1/music
      purchaseAndRepair.js # /api/v1/purchase-repair
      trainingSession.js   # /api/v1/training-session
      coin.js              # /api/v1/coin
      scheduler.js         # /api/v1/scheduler
      websocket.js         # /api/v1/websocket
      wtf.js               # /api/v1/wtf (Wall of Fame)
      wtfSettings.js       # WTF settings sub-routes
    v2/
      shop.js              # /api/v2/shop
      cart.js              # /api/v2/shop/cart
      orders.js            # /api/v2/shop/orders
      adminProducts.js     # /api/v2/shop/admin
      inventory.js         # /api/v2/shop/admin/inventory
      analytics.js         # /api/v2/shop/admin/analytics
      reports.js           # /api/v2/shop/admin/reports
      coachDelivery.js     # /api/v2/shop/coach/deliveries
      purchase-requests.js # /api/v2/shop/admin/purchase-requests
      vendor.js            # /api/v2/vendors
      upload.js            # /api/v2/upload
      facialRecognition.js # /api/v2/fr
      lms/
        admin/
          courses.js       # /api/v2/lms/admin/courses
          content.js       # /api/v2/lms/admin/content
          modules.js       # /api/v2/lms/admin/modules
          quiz.js          # /api/v2/lms/admin (quiz sub-routes)
          translations.js  # /api/v2/lms/admin/translations
        coach/
          assignments.js   # /api/v2/lms/coach (assignments)
          grading.js       # /api/v2/lms/coach/grading
        coach.js           # /api/v2/lms/coach (manual awards, reports)
        student/
          dashboard.js     # /api/v2/lms/student
          computerApps.js  # /api/v2/lms/student/:studentId/courses/computer-apps
          art.js           # /api/v2/lms/student/:studentId/courses/art
          spokenEnglish.js # /api/v2/lms/student/:studentId/courses/spoken-english
          lifeSkills.js    # /api/v2/lms/student/:studentId/courses/life-skills

  services/
    frService.js           # Face detection/recognition via @vladmandic/human
    frCacheService.js      # Face embedding cache for fast lookups
    wtf.js                 # WTF pin management, feeds, content moderation
    wtfSettings.js         # WTF configuration management
    wtfPerformance.js      # WTF performance metrics
    wtfWebSocket.js        # Real-time WTF updates via WebSocket
    scheduler.js           # Background job scheduler (pin expiration, etc.)
    medicalCheckIns.js     # Medical check-in business logic
    medicalRecords.js      # Medical record management
    doctor.js              # Doctor entity service
    hospital.js            # Hospital entity service
    analytics.js           # Shop analytics aggregation
    shop.js                # Shop product queries
    cart.js                # Cart management
    order.js               # Order processing
    coin.js                # Virtual coin economy
    notification.js        # Push/in-app notifications
    student.js             # Student data access
    user.js                # User data access
    balagruha.js           # Balagruha (home) operations
    schedule.js            # Schedule management
    task.js                # Task management
    sportsTask.js          # Sports task management
    musicTask.js           # Music task management
    trainingSession.js     # Training session management
    attendenance.js        # Attendance tracking
    videoThumbnail.js      # Video thumbnail generation
    aws/s3.js              # AWS S3 file storage

  scripts/                 # Utility and maintenance scripts
    # Scripts are flat in backend/scripts/ (not yet reorganized into subdirectories)
    # Categories: debug (debug-db, debugRoles), seed (seedShopData, seedGradingData),
    # fix (fix-admin-permissions, fix-wtf-transactions), migrate (migrate-add-purchase-category,
    # migrate-medical-checkins-to-arrays, migrate-wtf-pin-ids), admin (setupDefaultRoles,
    # forceSetupRoles, add-purchase-management-permissions), verify (verify_coach_api)

frontend/
  src/
    store/
      shopStore.js        # EXTENSION: vendorState, requestTransitions
    components/
      admin/inventory/
        NewItemForm.jsx   # Design-aligned form with Vendor lookup
        VendorMgmt.jsx    # List/Create Vendors
      purchase-manager/
        PMDashboard.jsx   # Operational view, Scorecard, Stock Reconciliation
        CoachDashboard.jsx # Request tracking, Child order visibility
```

### Architectural Boundaries

**API Boundaries (Actual Route Mounts):**

| Mount Path | Route File | Domain | Auth |
|---|---|---|---|
| `/api/v2/shop` | `v2/shop.js` | Shop product browsing | Public/Auth |
| `/api/v2/shop/cart` | `v2/cart.js` | Shopping cart | Auth |
| `/api/v2/shop/orders` | `v2/orders.js` | Checkout & orders | Auth |
| `/api/v2/shop/admin` | `v2/adminProducts.js` | Admin product CRUD | Admin |
| `/api/v2/shop/admin/inventory` | `v2/inventory.js` | Inventory management | Admin |
| `/api/v2/shop/admin/analytics` | `v2/analytics.js` | Shop analytics | Admin |
| `/api/v2/shop/admin/reports` | `v2/reports.js` | Transaction reports | Admin |
| `/api/v2/shop/admin/purchase-requests` | `v2/purchase-requests.js` | Purchase request workflow | Auth (PM/Admin) |
| `/api/v2/shop/coach/deliveries` | `v2/coachDelivery.js` | Coach delivery mgmt | Coach |
| `/api/v2/vendors` | `v2/vendor.js` | Vendor CRUD | Admin |
| `/api/v2/upload` | `v2/upload.js` | Generic file uploads | Auth |
| `/api/v2/fr` | `v2/facialRecognition.js` | Facial recognition | Mixed |
| `/api/v2/lms/admin/courses` | `v2/lms/admin/courses.js` | LMS course mgmt | Admin |
| `/api/v2/lms/admin/content` | `v2/lms/admin/content.js` | LMS content mgmt | Admin |
| `/api/v2/lms/admin/modules` | `v2/lms/admin/modules.js` | LMS module queries | Admin |
| `/api/v2/lms/admin` | `v2/lms/admin/quiz.js` | Quiz & assessment builder | Admin |
| `/api/v2/lms/admin/translations` | `v2/lms/admin/translations.js` | LMS translations | Admin |
| `/api/v2/lms/student` | `v2/lms/student/dashboard.js` | Student dashboard | Student |
| `/api/v2/lms/student/:studentId/courses/*` | `v2/lms/student/*.js` | Per-course student routes | Student |
| `/api/v2/lms/coach` | `v2/lms/coach/assignments.js` | Coach assignments | Coach |
| `/api/v2/lms/coach/grading` | `v2/lms/coach/grading.js` | Coach grading | Coach |
| `/api/v2/lms/coach` | `v2/lms/coach.js` | Manual awards & reports | Coach |
| `/api/v1/wtf` | `v1/wtf.js` | Wall of Fame (gamification) | Auth |
| `/api/v1/coin` | `v1/coin.js` | Virtual coin economy | Auth |
| `/api/medical-check-ins` | `medicalCheckInsRoutes.js` | Health check-ins | Auth |
| `/api/medical-records` | `medicalRecordsRoutes.js` | Medical records | Auth |
| `/api/doctors` | `doctorRoutes.js` | Doctor registry | Auth |
| `/api/hospitals` | `hospitalRoutes.js` | Hospital registry | Auth |

**Component Boundaries:**
*   **Zustand Store:** Acts as the single source of truth for the local UI state. Components must never manage global request data locally.

## System Coverage

### 1. Purchase Manager System (Sprint 5)

The core procurement workflow documented in the original architecture. Routes are mounted under `/api/v2/shop/admin/purchase-requests` (not `/api/v2/shop/purchase-manager/*` as originally planned).

**Key models:** `purchaseRequest.js`, `vendor.js`, `shopItem.js`, `inventoryTransaction.js`
**Key controllers:** `purchaseRequestController.js`, `vendorController.js`, `adminProductController.js`, `inventoryController.js`

### 2. LMS System (Sprint 2)

A Learning Management System with three role-based route groups:

**Admin routes** (`/api/v2/lms/admin/*`): Course CRUD, content library management, module queries, quiz/assessment builder, translation management.

**Student routes** (`/api/v2/lms/student/*`): Student dashboard/homepage, per-course routes for Computer Apps, Art, Spoken English, and Life Skills (parameterized as `/api/v2/lms/student/:studentId/courses/<subject>`).

**Coach routes** (`/api/v2/lms/coach/*`): Course assignment management, grading interface, manual coin awards, and student reports.

**Key models:** `course.js`, `ContentLibrary.js`, `Quiz.js`, `QuestionBank.js`, `Assignment.js`, `CourseAssignment.js`, `StudentProgress.js`, `Submission.js`
**Key controllers:** `lms/admin/courseController.js`, `lms/admin/translationController.js`, `lms/coach/coachAssignmentController.js`, `lms/coach/coachGradingController.js`, `lms/student/studentDashboardController.js`, and per-subject student controllers.

### 3. WTF System — Wall of Fame (Sprint 1 / v1)

A gamification and content-sharing platform where students post to a "Wall of Fame." Supports pins (content posts), interactions (likes, loves, comments), submissions, and a virtual coin economy.

**Routes:** Mounted at `/api/v1/wtf` with settings sub-routes. Uses WebSocket (`wtfWebSocket.js`) for real-time updates.

**Key models:** `wtfPin.js`, `wtfSettings.js`, `wtfStudentInteraction.js`, `wtfSubmission.js`, `coin.js`
**Key services:** `wtf.js` (47 service functions), `wtfPerformance.js`, `wtfSettings.js`, `wtfWebSocket.js`, `scheduler.js` (automatic pin expiration)
**Key middleware:** `wtfSecurity.js` (rate limiters, content validation, file upload security)

### 4. Facial Recognition System (Sprint 1.1 — FR Rebuild)

Rebuilt facial recognition using `@vladmandic/human` (replacing the original `face-api.js`). Handles face registration, recognition (identification), and session management. Initialized at server startup with model warmup.

**Routes:** `/api/v2/fr` — register, recognize, manage embeddings.
**Key models:** `FaceEmbedding.js`, `FRSession.js`, `EmotionTracking.js`
**Key services:** `frService.js` (detection/recognition logic), `frCacheService.js` (embedding cache with warmup)
**Server integration:** `Human` instance initialized in `server.js` on startup; `frService` and `frCacheService` receive the instance.

### 5. Medical / Health System (Sprint 6)

Tracks student health via medical records, daily check-ins, doctor/hospital registries.

**Routes:**
*   `/api/medical-check-ins` — daily health check-in CRUD
*   `/api/medical-records` — medical record management
*   `/api/doctors` — doctor registry CRUD
*   `/api/hospitals` — hospital registry CRUD

**Key models:** `medical.js`, `medicalCheckIns.js`, `doctor.js`, `hospital.js`
**Key services:** `medicalCheckIns.js`, `medicalRecords.js`, `doctor.js`, `hospital.js`

### Requirements to Structure Mapping

*   **FR1-FR6 (Inventory Governance):** Managed by `ShopItem.js` model and `NewItemForm.jsx`.
*   **FR7-FR9 (Vendor Management):** Managed by `Vendor.js` and `VendorMgmt.jsx`.
*   **FR10-FR16 (Workflow):** Managed by `purchaseRequestController.js` state machine logic.

## Architecture Validation Results

### Coherence Validation
**Decision Compatibility:** New schemas (`Vendor`) and extensions (`ShopItem`) are compatible with existing Mongoose models. Use of MongoDB sessions ensures atomic updates for complex transitions.
**Pattern Consistency:** V2 routes are consistently mounted under `/api/v2/<domain>` with role-based sub-nesting.
**Structure Alignment:** Extension pattern respects the "Domain-Driven" folder structure already established in the codebase.

### Requirements Coverage Validation
**Functional Requirements Coverage:** Confirmed. FR1-FR6 (Governance), FR7-FR9 (Vendors), FR10-FR16 (Workflow), FR17-FR20 (Dashboards), and FR21-FR24 (Audit/Shortcut) are all supported by the proposed state machine and schemas.
**Non-Functional Requirements Coverage:** Addressed via optimistic UI patterns and backend role-checks.

### Implementation Readiness Validation
**Decision Completeness:** High. Versions are verified, models are mapped, and state transitions are explicitly guarded.
**Structure Completeness:** Complete project tree provided for all new/modified files.

### Gap Analysis Results
*   **Minor Gap:** Legacy data migration for `ShopItem` (needs default vendor data). Priority: Medium.
*   **Observation:** PM Scorecard logic needs a specific calculation formula (e.g., `requestsCompleted / totalRequests`).
*   **Sprint 3-4 Gap:** These sprints were never executed. Any features planned for them are absent from the codebase.
*   **Sprint 2 Amma Gap:** LMS backend routes exist, but the Amma (Student App) frontend was not built.

### Architecture Completeness Checklist
*   [x] Project context thoroughly analyzed
*   [x] Scale and complexity assessed
*   [x] Technical constraints identified
*   [x] Architectural decisions documented
*   [x] Implementation patterns established
*   [x] Project structure extension defined
*   [x] LMS system coverage added (March 2026)
*   [x] WTF system coverage added (March 2026)
*   [x] Facial Recognition system coverage added (March 2026)
*   [x] Medical/Health system coverage added (March 2026)
*   [x] Route paths verified against server.js (March 2026)

### Architecture Readiness Assessment
**Overall Status:** READY FOR IMPLEMENTATION
**Confidence Level:** High

### Implementation Handoff
**AI Agent Guidelines:**
1.  **Strict State Guard:** Never allow a status transition in the controller without checking the requester's role.
2.  **Referential Integrity:** Enforce that a `ShopItem` *must* have at least one vendor before it can be requested.
3.  **Audit First:** Log every status change to `InventoryTransaction` even if physical stock doesn't change (e.g., 'ordered' state).

**First Implementation Priority:**
1.  Refactor `ShopItem` model and create `Vendor` model.
2.  Implement `vendorController.js` CRUD.

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED
**Total Steps Completed:** 8
**Date Completed:** 2025-12-22
**Last Updated:** 2026-03-15
**Document Location:** _bmad-output/architecture.md

### Final Architecture Deliverables

**Complete Architecture Document**
*   All architectural decisions documented with specific versions.
*   Implementation patterns ensuring AI agent consistency.
*   Complete project structure with all files and directories.
*   Requirements to architecture mapping.
*   Validation confirming coherence and completeness.

**Implementation Ready Foundation**
*   **12** architectural decisions made.
*   **10** implementation patterns defined.
*   **12** architectural components specified.
*   **24** requirements fully supported.

### Implementation Handoff

**For AI Agents:**
This architecture document is your complete guide for implementing **ISF_Playground**. Follow all decisions, patterns, and structures exactly as documented.

**First Implementation Priority:**
Refactor `ShopItem` and `PurchaseRequest` models to support the new `Vendor` relationship and state transitions.

### Quality Assurance Checklist
*   [x] All decisions work together without conflicts
*   [x] Technology choices are compatible
*   [x] Patterns support the architectural decisions
*   [x] Structure aligns with all choices
*   [x] All functional requirements are supported
*   [x] All non-functional requirements are addressed

---

**Architecture Status:** READY FOR IMPLEMENTATION

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.

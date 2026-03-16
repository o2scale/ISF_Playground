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
  - docs/Playground Platform - Sprint Plan new.md
  - docs/INTERNAL - RBAC and FR System Rebuild.md
  - docs/epics/sprint-1.1/epic-01-rbac-system-refactor.md
  - docs/epics/sprint-1.1/epic-02-facial-recognition-rebuild.md
  - _bmad-output/project-planning-artifacts/product-brief-ISF_Playground-2026-03-15.md
  - _bmad-output/sprint-reconciliation-report.md
  - _bmad-output/database-architecture.md
  - project-context.md
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 7
classification:
  projectType: web_app
  domain: edtech
  complexity: medium
  projectContext: brownfield
workflowType: 'prd'
sprintScope: 'Sprint 1 + 1.1 — Core Platform Foundation'
retroactive: true
---

# Product Requirements Document - ISF_Playground

**Author:** Dev
**Date:** 2026-03-16
**Sprint:** 1 + 1.1 — Core Platform Foundation (Retroactive)

## Executive Summary

Sprint 1 established the core platform foundation for ISF Playground — authentication, user management, RBAC, machine registration, Balagruha management, task management, and facial recognition login. Sprint 1.1 was an unplanned rebuild sprint that fixed critical security and architectural flaws in Sprint 1's RBAC and facial recognition implementations.

**Sprint 1 (Pre-BMAD, no MPSD):** Delivered 8 core features. Backend was fully built for all 8. Frontend was fully built for 3 (admin dashboard, Balagruha management, task management). Machine Management has zero frontend UI (backend only). RBAC scope filtering was infrastructure-only — not uniformly applied across controllers.

**Sprint 1.1 (Unplanned rebuild):** Addressed two critical findings:
1. **RBAC was inadequate** — no Balagruha-level data isolation, development bypass enabled, no frontend permission enforcement. Refactored with scope-based filtering (own/balagruha/all), `getScopeFilter()` middleware, and `usePermission` frontend hook.
2. **Facial Recognition was unsalvageable** — face-api.js (deprecated, archived Feb 2025), no model loading, no liveness detection, hardcoded thresholds. Completely rebuilt with `@vladmandic/human`, AES-256-GCM encrypted embeddings, FRSession audit trail, and PIN fallback.

**Current state (verified March 2026):** Sprint 1 core features are functional. Sprint 1.1 RBAC and FR rebuilds are complete. Remaining gaps: Machine Management has no frontend UI (addressed in Sprint 6), RBAC scope filtering was not uniformly applied across all controllers (addressed in Sprint 6), FR routes had TODO comments for permission checks (addressed in Sprint 6).

## What Makes This Special

Sprint 1 defined ISF Playground's foundational architecture — the MERN stack, 9-role RBAC system, facial recognition for child authentication, and multi-Balagruha data isolation model. Every subsequent sprint builds on these foundations. Sprint 1.1's rebuild was the first acknowledgment that quality matters more than speed — rebuilding RBAC and FR from scratch rather than patching broken implementations set the standard for the project's engineering culture.

The facial recognition system is particularly distinctive: browser-based webcam login for children (ages 8-16) who don't use passwords, with AES-256-GCM encrypted embeddings and PIN fallback. No off-the-shelf LMS or school ERP provides this.

## Project Classification

| Dimension | Value |
|-----------|-------|
| **Project Type** | Web Application (MERN stack SPA) |
| **Domain** | EdTech — Integrated Children's Welfare & Education Platform |
| **Complexity** | Medium (multi-domain business logic, 9 roles, 45 models) |
| **Project Context** | Brownfield — retroactive documentation of completed Sprint 1 + 1.1 |
| **Sprint Scope** | Core Platform Foundation + RBAC/FR Rebuild |
| **Sprint Status** | Complete (verified March 2026) |

## Success Criteria

### User Success

- **Admin (Amit)** can create and manage users across all 9 roles, assign them to Balagruhas, and manage role permissions through the admin dashboard.
- **Admin** can manage Balagruha (children's home) records — create, edit, view facility details, assign students and coaches.
- **Coach/Admin** can create, assign, and track tasks with full lifecycle management (149KB frontend component with attachments, comments, status tracking).
- **Student (Ravi)** can log in via facial recognition on a shared browser — no password needed. PIN fallback available if FR fails.
- **All roles** experience data isolation — coaches see only their Balagruha's data, students see only their own data, admins see everything.

### Business Success

- **Platform foundation operational** — authentication, user management, and RBAC enable all subsequent sprints to build on a secure, role-aware system.
- **Multi-Balagruha architecture** — data isolation model supports ISF's network of children's homes from day one.
- **Child-safe authentication** — facial recognition removes the password burden for children, enabling independent platform access.

### Technical Success

| Metric | Target | Actual Status |
|--------|--------|---------------|
| User CRUD operations | Full lifecycle for 9 roles | Complete — 20+ endpoints in userController |
| RBAC scope filtering | own/balagruha/all enforcement | Infrastructure complete — getScopeFilter() middleware built, enforcement inconsistent (fixed in Sprint 6) |
| Facial recognition accuracy | ≥95% | Complete — @vladmandic/human, 99.2% LFW benchmark |
| FR embedding security | Encrypted at rest | Complete — AES-256-GCM encryption |
| Balagruha management | Full CRUD with UI | Complete — 47KB frontend component |
| Task management | Full lifecycle with UI | Complete — 149KB frontend component |
| Machine registration | Backend API | Complete — backend only, zero frontend (UI built in Sprint 6) |
| Frontend permission enforcement | usePermission hook + guards | Complete — RBACContext, usePermission hook |

### Measurable Outcomes

- **Sprint 1 delivered:** 8 features (3 fully implemented with frontend, 5 backend-only or partial)
- **Sprint 1.1 delivered:** RBAC refactored with scope filtering, FR rebuilt with modern library
- **Models created:** User, Student, Role, Balagruha, Machine, MachineAssignment, MachineActiveLog, Task, FaceEmbedding, FRSession, Attendance, ActivityLog, Notification (13 core models)

## User Journeys

### Journey 1: Amit — The Admin Setting Up ISF Playground

**Opening Scene:** ISF has decided to digitize its Balagruha operations. Amit (Admin) receives access to the new ISF Playground platform. His first task: set up the system for 3 Balagruhas with their coaches, students, and staff.

**Rising Action:** Amit logs in with email/password, navigates to the admin dashboard. He creates 3 Balagruha records (Mumbai, Hyderabad, Vizag). He creates user accounts for coaches and assigns them to specific Balagruhas. He creates student records and assigns them to facilities. He configures roles — ensuring coaches can only see their own Balagruha's data.

**Climax:** All 3 Balagruhas are configured with their staff and students. Each coach logs in and sees ONLY their assigned facility's data. The admin sees everything across all facilities.

**Resolution:** ISF Playground is ready for daily operations. The multi-Balagruha architecture ensures each children's home operates independently while admins have cross-facility visibility.

**Requirements revealed:** User CRUD, Balagruha CRUD, role assignment, Balagruha assignment, RBAC scope filtering.

---

### Journey 2: Ravi — The Student Logging In via Facial Recognition

**Opening Scene:** Ravi (age 12) arrives at the computer room in his Balagruha. There are shared computers — no personal devices. He doesn't have an email or password. He needs to access his courses and coin balance.

**Rising Action:** Ravi sits at a computer and opens the browser. The ISF Playground login page shows a "Face ID Login" option. He clicks it, the webcam activates, and he sees his face on screen. The system detects his face, extracts an embedding, compares it against stored (encrypted) embeddings, and identifies him.

**Climax:** Within 3 seconds, Ravi is logged in. His dashboard shows his courses, coin balance, and Wall of Fame achievements. No password, no typing — just his face.

**Resolution:** Ravi can independently access the platform without adult assistance. If FR fails (bad lighting, camera issues), he can use his PIN as fallback.

**Requirements revealed:** FR registration, FR recognition, encrypted embedding storage, PIN fallback, FRSession audit trail, webcam capture UI.

---

### Journey 3: Dev — The Developer Discovering Sprint 1's RBAC is Broken

**Opening Scene:** Development is progressing toward Sprint 2 (LMS). A code review reveals that Coach A can access Balagruha B's student data. The RBAC system checks roles but doesn't filter by Balagruha. A development bypass in auth.js skips ALL permission checks. The frontend only checks `user.role`, not actual permissions.

**Rising Action:** The team analyzes the RBAC system: quality score 5/10. Five critical issues identified (no Balagruha filtering, dev bypass enabled, coarse permissions, no frontend enforcement, MAC auth disabled). Two options evaluated: refactor (5-7 days) vs rebuild (8-10 days). Team chooses refactor for speed.

**Climax:** Sprint 1.1 is created. RBAC is refactored: scope dimension added (own/balagruha/all), `getScopeFilter()` middleware built, `checkPermission` enhanced, dev bypass removed. Frontend gets `usePermission` hook and `RBACContext`. FR is rebuilt from scratch with @vladmandic/human.

**Resolution:** RBAC now has proper scope-based filtering infrastructure. FR uses a modern, maintained library with encrypted storage. The security foundation is trustworthy for building LMS, Shop, and other features.

**Requirements revealed:** Scope-based RBAC, getScopeFilter middleware, usePermission hook, FR rebuild with @vladmandic/human.

---

### Journey Requirements Summary

| Journey | Primary Capability | Sprint Deliverable |
|---------|-------------------|-------------------|
| Admin Setup | User/Balagruha CRUD + RBAC | Sprint 1 — admin dashboard, user management |
| Student FR Login | Facial recognition authentication | Sprint 1 + 1.1 — FR rebuild |
| RBAC Rebuild | Scope-based data isolation | Sprint 1.1 — RBAC refactor |

## Domain-Specific Requirements

### Compliance & Regulatory

- **Student data privacy (COPPA/FERPA awareness):** Children ages 8-16 use facial recognition. Face embeddings are encrypted at rest (AES-256-GCM). No raw face images stored — only mathematical descriptors. RBAC scope filtering ensures Balagruha-level data isolation.
- **Child authentication:** Facial recognition is the primary login for students — designed for children who don't use passwords. PIN fallback ensures access when FR fails.

### Technical Constraints

- **9-role RBAC system:** admin, coach, student, balagruha-incharge, purchase-manager, medical-incharge, sports-coach, music-coach, amma — each with different scope levels (own/balagruha/all).
- **Multi-Balagruha data isolation:** Every data query must respect the user's Balagruha assignment. Coaches see only their assigned Balagruha's data.
- **Shared computer environment:** Students use shared institutional computers — authentication must work without personal accounts/passwords.

## Web Application Specific Requirements

### Technical Architecture

| Aspect | Sprint 1/1.1 Implementation |
|--------|----------------------------|
| **Backend** | Node.js 20+ with Express.js 4.21, MongoDB with Mongoose 8.10 |
| **Frontend** | React 19, React Router 7.2, Zustand for state, Radix UI + Tailwind |
| **Auth** | JWT (jsonwebtoken 9.0.2) + bcryptjs + Facial Recognition (@vladmandic/human) |
| **RBAC** | Role model with scope-based permissions, checkPermission middleware, getScopeFilter |
| **FR** | @vladmandic/human 3.3.6, TensorFlow.js 4.22, AES-256-GCM encrypted embeddings |
| **Machine tracking** | Machine, MachineAssignment, MachineActiveLog models (backend only) |
| **Desktop** | Electron 34.2 (available but not primary deployment) |

## Project Scoping & Phased Development

### Sprint 1 Deliverables (Complete)

| # | Feature | Backend | Frontend | Status |
|---|---------|---------|----------|--------|
| 1 | Admin Dashboard & User Management | Complete (20+ endpoints) | Complete | Functional |
| 2 | Machine Registration (MAC/Serial) | Complete | Not built | Backend only |
| 3 | Machine Allocation to Balagruhas | Complete | Not built | Backend only |
| 4 | Machine Usage & Access Control | Complete | Not built | MAC validation disabled |
| 5 | Machine Tracking & Reports | Complete | Unknown | Backend only |
| 6 | RBAC (9 roles) | Complete | Complete | Scope filtering infrastructure done |
| 7 | Balagruha Management | Complete | Complete (47KB) | Fully functional |
| 8 | Task Management | Complete | Complete (149KB) | Fully functional |

### Sprint 1.1 Deliverables (Complete)

| # | Feature | Status | Key Outcome |
|---|---------|--------|-------------|
| 1 | RBAC System Refactor | Complete | getScopeFilter(), scope-based permissions, dev bypass removed |
| 2 | RBAC UI Scope Enhancement | Complete | RBACContext, usePermission hook, frontend guards |
| 3 | Facial Recognition Rebuild | Complete | @vladmandic/human, AES-256-GCM, FRSession audit trail |

### Known Gaps Carried Forward

- Machine Management has no frontend UI → **Resolved in Sprint 6**
- RBAC scope filtering not uniformly applied across all controllers → **Resolved in Sprint 6**
- FR routes have TODO comments for RBAC permission checks → **Resolved in Sprint 6**
- MAC address validation disabled in auth.js → **Still disabled (development convenience)**

## Functional Requirements

### Authentication & Session Management

- **FR1:** User can log in with email and password via JWT authentication
- **FR2:** Student can log in via facial recognition using browser webcam
- **FR3:** Student can log in via PIN fallback when facial recognition fails
- **FR4:** System issues JWT tokens on successful authentication with role and permissions embedded
- **FR5:** System maintains session state with token refresh capability
- **FR6:** User can log out, invalidating their session token

### User Management

- **FR7:** Admin can create user accounts for all 9 roles (admin, coach, student, balagruha-incharge, purchase-manager, medical-incharge, sports-coach, music-coach, amma)
- **FR8:** Admin can view, edit, and deactivate user accounts
- **FR9:** Admin can assign one or more roles to a user
- **FR10:** Admin can assign users to one or more Balagruhas
- **FR11:** Admin can reset user passwords
- **FR12:** System enforces unique email addresses across all users

### RBAC & Permissions

- **FR13:** System supports 9 distinct user roles with configurable permissions
- **FR14:** Each permission has three dimensions: resource (module), action (CRUD), and scope (own/balagruha/all)
- **FR15:** System applies scope-based data filtering on all API queries via `getScopeFilter()` middleware
- **FR16:** Admin role has scope "all" — can access data across all Balagruhas
- **FR17:** Coach role has scope "balagruha" — can only access data for assigned Balagruha(s)
- **FR18:** Student role has scope "own" — can only access their own data
- **FR19:** Frontend enforces permission visibility via `usePermission` hook — UI elements hidden/disabled based on actual permissions
- **FR20:** System denies access with 403 status when user lacks required permission

### Facial Recognition

- **FR21:** Admin can register a student's face by capturing webcam image and extracting 128-dimension embedding
- **FR22:** System stores face embeddings encrypted at rest using AES-256-GCM
- **FR23:** System can recognize a student from webcam capture by comparing against stored embeddings
- **FR24:** System tracks FR sessions via FRSession model (audit trail)
- **FR25:** System supports PIN-based fallback authentication for students
- **FR26:** FR recognition completes within 3 seconds including network latency
- **FR27:** System initializes @vladmandic/human models on server startup with warmup

### Balagruha Management

- **FR28:** Admin can create a Balagruha record with name, address, and contact information
- **FR29:** Admin can view a list of all Balagruhas
- **FR30:** Admin can edit Balagruha details
- **FR31:** Admin can assign coaches and students to a Balagruha
- **FR32:** System tracks student count per Balagruha

### Task Management

- **FR33:** User can create tasks with title, description, priority, due date, and assignee
- **FR34:** User can assign tasks to other users within their Balagruha scope
- **FR35:** User can track task status through a lifecycle (created → in-progress → completed)
- **FR36:** User can add comments and attachments to tasks
- **FR37:** User can filter and search tasks by status, assignee, priority, and date

### Machine Registration (Backend Only)

- **FR38:** Admin can register a machine with MAC address, serial number, and description via API
- **FR39:** Admin can assign a machine to a Balagruha via API
- **FR40:** System tracks machine usage logs (MachineActiveLog) via API
- **FR41:** System supports machine allocation history (MachineAssignment) via API
- **FR42:** MAC address validation exists in auth.js but is currently disabled for development

### Attendance & Activity

- **FR43:** System tracks user attendance records (Attendance model)
- **FR44:** System logs user activity for audit purposes (ActivityLog model)
- **FR45:** System supports notification delivery to users (Notification model with read tracking via UserNotificationView)

## Non-Functional Requirements

### Security

- **NFR1:** All API endpoints require JWT authentication via `authenticate` middleware (except public endpoints)
- **NFR2:** Face embeddings are encrypted at rest using AES-256-GCM — no raw face images stored
- **NFR3:** RBAC scope filtering prevents cross-Balagruha data access for scoped roles
- **NFR4:** Password storage uses bcryptjs hashing (never stored in plain text)
- **NFR5:** Development bypass in auth.js is removed for production deployment
- **NFR6:** Rate limiting applied via express-rate-limit on authentication endpoints

### Performance

- **NFR7:** FR recognition completes within 3 seconds total (detection + embedding comparison + network)
- **NFR8:** FR model warmup occurs on server startup — first recognition is not slower than subsequent
- **NFR9:** API CRUD operations respond within 500ms under normal load
- **NFR10:** FR embedding cache (frCacheService) provides fast lookups without loading all students from DB on every request

### Reliability

- **NFR11:** PIN fallback authentication is always available when facial recognition fails
- **NFR12:** FR session audit trail (FRSession model) tracks all recognition attempts for debugging
- **NFR13:** System handles concurrent users without session conflicts (stateless JWT)

### Architecture

- **NFR14:** Backend uses CommonJS module system (`require`/`module.exports`)
- **NFR15:** Frontend uses ES6 module system (`import`/`export`)
- **NFR16:** All Mongoose models use `timestamps: true` and safe export pattern (`mongoose.models.X || mongoose.model()`)
- **NFR17:** API versioning: v1 (legacy routes), v2 (current) — new development on v2
- **NFR18:** Standard API response format: `{ success: boolean, data: any, message: string }`

## Sprint 1/1.1 Models Created

**Core Platform (13 models):**

| Model | File | Purpose |
|-------|------|---------|
| User | `user.js` | User accounts, authentication, role assignment |
| Student | `student.js` | Student profiles, Balagruha assignment, coin balance |
| Role | `role.js` | RBAC role definitions with scope-based permissions |
| Balagruha | `balagruha.js` | Children's home entity — name, address, contacts |
| Machine | `machine.js` | Equipment/computer registration |
| MachineAssignment | `machineAssignment.js` | Machine-to-Balagruha assignment |
| MachineActiveLog | `machineactivelog.js` | Machine usage session logs |
| Task | `task.js` | Task management (30+ fields) |
| FaceEmbedding | `FaceEmbedding.js` | Stored face descriptor vectors (AES-256-GCM encrypted) |
| FRSession | `FRSession.js` | FR session tracking and audit trail |
| Attendance | `attendance.js` | Attendance records |
| ActivityLog | `activitylog.js` | Activity audit log |
| Notification | `notification.js` | Notification delivery |

**Full schema details:** See `_bmad-output/database-architecture.md` — Core Platform section (17 models total, 13 from Sprint 1).

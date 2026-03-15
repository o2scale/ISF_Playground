---
stepsCompleted: [1, 2, 3, 4, 5, 6]
status: complete
inputDocuments:
  - project-context.md
  - docs/Playground Platform - Sprint Plan new.md
  - docs/Sprint 2-5 Combined MPSD.md
  - docs/ISF-PLAYGROUND-CURRENT-STATE.md
  - _bmad-output/sprint-reconciliation-report.md
date: 2026-03-15
author: Dev
partyModeRefinements: true
---

# Product Brief: ISF Playground

**Platform Category:** Integrated Children's Welfare & Education Platform
**Deployment:** Web application (MERN stack) accessible via browser URL
**Electron desktop packaging:** Available but not the primary deployment — lowest priority

## Executive Summary

ISF Playground is a comprehensive web platform built for the Initiative Sewa Foundation (ISF) to digitize and streamline the management of Balagruhas (children's homes/orphanages) across India. The platform replaces manual, paper-based processes with an integrated system covering education (LMS), gamification (ISF Coins + Wall of Fame), e-commerce (ISF Shop), health tracking, procurement, and facility operations — all accessible through a web browser.

The platform serves 9 distinct user roles. Of 5 planned development sprints, 3 have been executed (Sprint 1, 2, 5) plus 3 additional unplanned efforts (Sprint 1.1 RBAC/FR rebuild, Sprint 6 bug fixes, S2-CQ code quality). Sprints 3 (Mobile App) and 4 (Emergency/SOS) have not been started. From executed sprints: 62 features fully implemented, 21 partial, 7 not built. Implementation status was verified against code existence (March 15, 2026 reconciliation) — not all features have passing tests confirming correct behavior.

---

## Core Vision

### Problem Statement

The Initiative Sewa Foundation operates multiple Balagruhas (children's homes) where orphaned and underprivileged children receive education, care, and life-skills training. Before ISF Playground, these operations relied on fragmented, manual processes:

- **Education delivery** was unstructured — no standardized course content, no progress tracking, no assessment tools across Balagruhas
- **Student engagement** had no measurable incentive system — coaches couldn't reward learning achievements systematically
- **Procurement** was ad-hoc — supplies (medicines, stationery, repairs, consumables) were requested informally with no tracking, approval workflow, or inventory visibility
- **Health monitoring** lacked systematic check-in records, doctor visit tracking, or mood/wellness data
- **Administrative oversight** across multiple Balagruhas was fragmented — no centralized view of attendance, task completion, or operational metrics
- **Donor reporting** had no data-driven evidence of program effectiveness or student outcomes

### Problem Impact

Without a unified platform, ISF faced:
- Inconsistent educational quality across Balagruhas
- No visibility into student progress, engagement, or wellbeing
- Procurement delays and budget waste from untracked inventory
- Inability to measure program effectiveness or demonstrate outcomes to donors
- Operational overhead from manual coordination between coaches, admins, and facility staff

### Why Existing Solutions Fall Short

ISF Playground defines a new platform category — **Integrated Children's Welfare & Education Platform** — because no existing solution covers this ground:

- **Generic LMS platforms** (Moodle, Google Classroom) are LMS-only — no gamification, no procurement, no health tracking, no multi-role facility management
- **School ERP systems** (SAP, Odoo) are enterprise-grade, cost-prohibitive for NGOs, and lack gamification or child-friendly interfaces
- **No integrated solution** combines education + gamification + health + procurement + facility management in one platform
- **Authentication** for children requires facial recognition via browser webcam, not passwords — standard platforms don't support this
- **Multi-language support** (English + Telugu) with integrated translation workflows isn't available in educational platforms designed for English-speaking markets
- **Donor reporting** capabilities are absent from tools designed for schools, not NGO-operated children's homes

### Proposed Solution

ISF Playground is a MERN stack web application (React frontend + Express API + MongoDB) providing:

1. **Learning Management System** — 4 course types (Computer Apps, Art, Spoken English, Life Skills) with admin course builder, quiz engine, translation module (EN→Telugu), and coach grading interface
2. **Virtual Economy (Coin System)** — ISF Coins earned through learning activities, spendable in the ISF Shop, with transaction tracking, leaderboards, and economy health analytics
3. **ISF Shop** — Student storefront with cart, checkout, order history, and 5-minute cancellation with automatic coin refund
4. **Purchase Management** — 4-step procurement lifecycle (Request → Order → Deliver to Store → Deliver to Balagruha) with 6 categories, priority levels, vendor management, and stock reconciliation
5. **Wall of Fame (WTF)** — Gamification system with pins, submissions, leaderboards, Mann ki Baat broadcasts, and WebSocket real-time updates
6. **Health & Medical** — Check-in forms, doctor visit tracking, hospital management, mood tracking
7. **Facial Recognition** — Secure student login via browser webcam with encrypted embeddings (AES-256-GCM); PIN fallback
8. **RBAC** — 9 roles with scope-based data isolation (own/balagruha/all) ensuring each Balagruha sees only its own data
9. **Facility Operations** — Attendance tracking, task management, scheduling, Balagruha management

### Key Differentiators

1. **Integrated Welfare Platform** — Not just an LMS or ERP — education, gamification, health, procurement, and operations in ONE system
2. **Child-Safe Authentication** — Facial recognition login via browser webcam; PIN fallback for reliability
3. **Closed-Loop Virtual Economy** — Coins earned through education → spent in shop → tracked in analytics. This IS the engagement engine
4. **Multi-Balagruha Data Isolation** — RBAC scope filtering ensures each children's home operates independently while admins see across all facilities
5. **End-to-End Procurement** — From coach requesting supplies to PM approving to delivery tracking with stock reconciliation
6. **Bilingual by Design** — English → Telugu translation module with progress tracking per course
7. **Single Platform, 9 Roles** — Students, coaches, admins, purchase managers, medical staff, sports/music coaches, balagruha in-charges, and amma all served by one application
8. **Donor-Ready Analytics** — Cross-Balagruha reporting, engagement metrics, and learning outcome data for demonstrating program impact

### Current Architecture

- **Frontend:** React 19 served via Nginx, Tailwind CSS + Radix UI components, API layer split into 17 feature modules (`src/api/`)
- **Backend:** Express.js 4.21 with 28 route mounts, layered architecture (models → data-access → services → controllers → routes)
- **Database:** MongoDB (Atlas or local) with Mongoose 8.10, 45 models
- **Storage:** AWS S3 for file uploads (medical records, product images, task attachments)
- **Caching:** Redis (ioredis)
- **Auth:** JWT + Facial Recognition (@vladmandic/human) + RBAC middleware
- **API Versioning:** v1 (legacy), v2 (current) — all new development on v2
- **Reference:** See `_bmad-output/architecture.md` for complete route mappings and system coverage

---

## The Coin Economy — Engagement Engine

The ISF Coin system is the heart of student engagement, creating a closed feedback loop:

```
EARN                          SPEND                         RECOGNIZE
Course completion      →      ISF Shop purchases     →     Wall of Fame pins
Quiz passing           →      Physical rewards       →     Leaderboards
Art/Voice submissions  →      5-min cancel + refund  →     Mann ki Baat features
Coach manual awards    →      Transaction history    →     Milestone celebrations
WTF participation      →      CSV export             →     Coach reporting
```

**Economy Health Indicators:**
- Earn-to-spend ratio (healthy range: 3:1 to 5:1)
- Coin velocity (coins earned per student per week)
- Shop conversion rate (% of students making purchases)
- Unspent coin pool (inflation risk indicator)
- Category spending distribution

**This economy is what makes ISF Playground unique** — it transforms education from obligation into opportunity. Students see direct, tangible rewards for learning.

---

## Target Users

### Primary Users

**1. Ravi — The Student (Age 8-16)**
A child living in a Balagruha who uses the platform daily for learning and engagement. Ravi logs in via facial recognition on a shared computer's browser, navigates his courses, completes quizzes, earns ISF Coins, and spends them in the shop.

- **Goals:** Learn new skills, earn coins, buy rewards, see his name on the Wall of Fame
- **Pain before:** No structured learning, no incentive system, no way to track progress
- **Success moment:** Earning enough coins to buy something from the shop
- **Daily usage:** Login (FaceID) → Dashboard → Course → Quiz → Check coin balance → Browse shop

**2. Priya — The Coach (Teacher/Mentor)**
A coach assigned to one or more Balagruhas. Priya assigns courses, grades submissions, tracks student progress, requests supplies, and manages deliveries. May access from desktop or mobile browser.

- **Goals:** Track each student's progress, grade work efficiently, ensure her Balagruha has supplies
- **Pain before:** Paper-based grading, no visibility into completion, informal supply requests lost
- **Success moment:** Seeing all students' quiz scores in one dashboard, purchase request approved same-day
- **Daily usage:** Login → Dashboard → Grading queue → Assignments → Purchase requests → Deliveries

**3. Amit — The Administrator**
Manages the entire platform across all Balagruhas. Creates courses, manages users/roles, oversees shop inventory, runs reports, handles RBAC permissions, and generates donor-facing analytics.

- **Goals:** Maintain operations, ensure content quality, manage inventory, generate impact reports for ISF leadership and donors
- **Pain before:** Manual user management, no centralized reporting, no inventory visibility
- **Success moment:** Running a cross-Balagruha report showing measurable learning improvement for donor presentation
- **Daily usage:** Login → Dashboard → User/course management → Shop admin → Reports → RBAC

### Secondary Users

**4. Suresh — The Purchase Manager**
Manages procurement lifecycle: reviews requests, places orders, tracks deliveries, reconciles stock.

**5. Dr. Meena — The Medical In-Charge**
Handles health check-ins, doctor visit records, student wellness tracking.

**6. Vikram — The Sports/Music Coach**
Manages training sessions, sport/music tasks, equipment requests.

**7. Lakshmi — The Balagruha In-Charge**
Facility manager for a specific children's home: attendance, operations, purchase requests.

**8. Kamala — The Amma (Caretaker)**
Day-to-day student support. Role exists in system but **dedicated features NOT YET BUILT** (query management, SLA tasks, dashboard).

### User Journeys

**Student Journey:**
Onboarding (FaceID enrollment) → Dashboard → Course → Quiz → Earn coins → Shop → Wall of Fame

**Coach Journey:**
Login → Assign courses → Grade submissions → Award coins → Request supplies → Track deliveries → Reports

**Admin Journey:**
Setup (roles, Balagruhas) → Create courses → Upload content → Build quizzes → Translate → Manage inventory → Analytics → Donor reports

---

## Success Metrics

### User Success Metrics

| User | Metric | Target |
|------|--------|--------|
| **Student** | Weekly course module completion | ≥2 modules/week |
| **Student** | Coin earning velocity | ≥50 coins/week |
| **Student** | Shop engagement | >60% make ≥1 purchase/month |
| **Student** | Daily login rate | >80% of enrolled |
| **Coach** | Grading turnaround | <48 hours from submission |
| **Coach** | Assignment coverage | 100% students with active assignments |
| **Coach** | Purchase request cycle | <7 days request to delivery (non-urgent) |
| **Admin** | Course content freshness | 100% courses updated in last 90 days |
| **Admin** | Translation completeness | >80% content translated EN→TE |
| **PM** | Request processing time | <24 hours to approval/rejection |
| **PM** | Order fulfillment rate | >90% delivered within deadline |

### Coin Economy Health Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Earn-to-spend ratio | 3:1 to 5:1 | Coin transaction logs |
| Coin velocity | ≥50 coins/student/week | Weekly aggregation |
| Shop conversion | >60% students/month | Order records |
| Unspent pool growth | <10% month-over-month | Balance aggregation |
| Category spend distribution | No single category >50% | Transaction breakdown |

### Business & Donor Objectives

**3-Month Targets:**
- Student daily login rate >80% across deployed Balagruhas
- All 4 course types actively assigned with student submissions
- Purchase request workflow adopted by all coaches
- Baseline learning metrics established (quiz pass rates, completion rates per Balagruha)

**12-Month Targets:**
- Measurable improvement in quiz scores (vs established baseline)
- Coin economy balanced and sustainable
- Procurement costs reduced through inventory visibility
- Cross-Balagruha comparison data available for ISF leadership

**Donor-Facing Impact Metrics:**
- Children reached per Balagruha
- Learning hours delivered per month
- Cost per child per module delivered
- Engagement improvement trending (quarterly)
- Balagruha performance comparison (identifying where to invest more)

### Key Performance Indicators

| KPI | Metric | Target | Source |
|-----|--------|--------|--------|
| Daily Active Users | Students logging in | >80% enrolled | Auth logs |
| Course Completion | Modules completed/student/month | ≥8/month | StudentProgress |
| Coin Economy Health | Earn:Spend ratio | 3:1 to 5:1 | Coin transactions |
| Procurement Cycle | Request to delivery | <7 days | PurchaseRequest history |
| Inventory Accuracy | System vs physical variance | <5% | Monthly reconciliation |
| Translation Progress | Content translated EN→TE | >80% | Translation API |
| Cross-Balagruha Spread | Performance variance between facilities | Tracked quarterly | Analytics dashboard |
| App Reliability | Successful page loads | >99% | Frontend error tracking |
| Reconciliation Cadence | Monthly reconciliation completed | 100% of Balagruhas | Stock reconciliation logs |

### Quality Status (as of March 15, 2026)

- **Backend tests:** 90 new controller tests (purchaseRequest 46, user 25, inventory 19) + pre-existing WTF/RBAC/vendor suites
- **Frontend tests:** 10 component tests + 9 Playwright E2E tests (login + purchase lifecycle)
- **Known issues:** 14 legacy test suites with pre-existing failures (not caused by recent changes)
- **Test maintenance:** Enforced via mandatory rules in project-context.md — all agents must update tests when modifying code
- **Note:** Implementation status verified against code existence, not passing tests. Some "implemented" features may have undiscovered regressions.

---

## Document Relationships

```
Product Brief (THIS DOCUMENT)
  │
  ├──→ PRD (next: detailed requirements per sprint)
  │     ├──→ Architecture (technical decisions)
  │     ├──→ Epics & Stories (implementation breakdown)
  │     ├──→ Implementation Readiness Check (validation gate)
  │     └──→ Sprint Planning → Create Story → Dev Story → Code Review
  │
  ├── informed by ──→
  │     ├── Sprint Reconciliation Report (_bmad-output/sprint-reconciliation-report.md)
  │     ├── UX Design Specification (_bmad-output/ux-design-specification.md)
  │     ├── Architecture Document (_bmad-output/architecture.md)
  │     ├── Original MPSDs (docs/Sprint 2 MPSD.md, Sprint 3-4 MPSD, Sprint 5 MPSD)
  │     ├── Sprint Plan (docs/Playground Platform - Sprint Plan new.md)
  │     └── Project Context (project-context.md)
  │
  └── related artifacts ──→
        ├── QA Gates & Reports (docs/qa/)
        ├── Epic Documents (docs/epics/)
        ├── Story Documents (docs/stories/)
        └── Design System (docs/isf-playground-complete-design-system.md)
```

---

## What Each Sprint Delivered

### Sprint 1: Core Platform (COMPLETE — No MPSD, Pre-BMAD)

Sprint 1 established the foundation. No formal MPSD or BMAD documentation was created — this is the first time Sprint 1 deliverables are formally documented.

**Delivered (verified against codebase March 15, 2026):**

| Feature | Backend | Frontend | Status |
|---------|---------|----------|--------|
| Admin Dashboard & User Management | COMPLETE (userController, 20+ endpoints) | COMPLETE (admin dashboard) | Functional |
| RBAC System | COMPLETE (role model, checkPermission middleware, 9 roles) | COMPLETE (RBACContext, usePermission) | Functional — enforcement inconsistent |
| Machine Registration (MAC/Serial) | COMPLETE (machine model, controller, routes) | NOT BUILT | Backend only |
| Machine Allocation to Balagruhas | COMPLETE (machineAssignment model) | NOT BUILT | Backend only |
| Machine Usage & Access Control | COMPLETE (machineactivelog model) | NOT BUILT | MAC validation DISABLED |
| Balagruha Management | COMPLETE (model, controller, routes) | COMPLETE (47KB component) | Fully functional |
| Task Management | COMPLETE (model with 30+ fields, controller) | COMPLETE (149KB component) | Fully functional |
| Facial Recognition Login | COMPLETE (FaceEmbedding, FRSession, AES-256-GCM) | COMPLETE (FaceIdLogin component) | Functional — FR RBAC TODOs pending |

**Key models created:** User, Role, Student, Balagruha, Machine, MachineAssignment, MachineActiveLog, Task, FaceEmbedding, FRSession, Attendance, ActivityLog, Notification

**Sprint 1 gaps carried forward:**
- Machine Management has zero frontend UI (backend fully built)
- MAC address validation disabled in auth.js
- RBAC scope filtering not uniformly applied
- FR routes have TODO comments for permission checks

### Sprint 1.1: RBAC & FR Rebuild (COMPLETE)

Unplanned rebuild sprint to fix security foundation:
- RBAC refactored with scope-based filtering (own/balagruha/all)
- Facial Recognition rebuilt with encrypted storage and audit trail
- Frontend RBACContext + usePermission hook added

### Sprint 2: LMS & Communication (64% COMPLETE)

Per Sprint 2 MPSD (1,066 lines). 5 epics, 25 stories. 16 implemented, 6 partial, 3 not built.

**Implemented:** Student dashboard, Computer Apps, Spoken English, Life Skills, ISF Coin wallet, course builder, content management, quiz engine, translation module, course publishing, coach assignments, grading interface, coach reporting, notification center, Mann ki Baat broadcasts

**Partial:** Art course (Artweaver IPC stubbed), manual coin award (implicit only), voice infrastructure (upload only), course reporting (basic), PM error handling (generic)

**Not built:** Amma query management, Amma SLA/auto-reassignment, Amma dashboard, WhatsApp integration

**Key models created:** Course, Quiz, QuestionBank, Assignment, CourseAssignment, ContentLibrary, StudentProgress, Submission, Coin, WtfPin, WtfSubmission, WtfStudentInteraction, WtfSettings, StudentMoodTracker, EmotionTracking, Medical, MedicalCheckIns, MedicalRecords, Doctor, Hospital, OfflineReqQueue, UserNotificationView, Schedules, SportsTasks, TrainingSession

### Sprint 5: E-Commerce & Shop (92% COMPLETE)

Per Sprint 5 MPSD (308 lines). 26 stories, 24 fully implemented. Quality score: 97.25/100.

**Implemented:** Product catalog, shopping cart (Zustand), checkout with atomic coin transactions, order history with 5-min cancellation, product CRUD, inventory management, stock alerts, coin spending loop, transaction management, order cancellation with refunds, analytics dashboard, transaction reports with CSV export, coach delivery management, product image upload (S3), shop navigation, student profile, purchase request creation, admin approval workflow, stock audit trail, 6 purchase categories, balagruha-independent purchases, date filters, multi-role access (8 non-student roles), inline product addition

### Sprint 5-PM: Purchase Manager Workflow (COMPLETE — BMAD-Driven)

20 stories across 4 epics, all implemented (reconciled March 15, 2026).

**Implemented:** Vendor data model + CRUD, ShopItem schema refactor (approvedVendors, purchaseCategory), admin new item UI, purchase request state machine (4-step lifecycle), staff request UI, PM fulfillment actions, priority/deadline, 6 categories, repair technician tracking, PM dashboard with tabs/filters/bunched view, coach dashboard, admin inventory report, stock reconciliation, navigation badge, shortened request IDs

**Key models created:** Vendor, ShopItem (extended), PurchaseRequest, InventoryTransaction, Order, Cart, PurchaseOrders, RepairRequests

### Sprint 6: Bug Fixes & Medical (COMPLETE)

5 stories: Coach view corrections, medical history alignment, medical check-in fixes, hospital dropdown, post-production bug fixes. All delivered.

### S2-CQ: Code Quality & Security (MOSTLY COMPLETE — BMAD-Driven)

Security cleanup 100%, ORM standardization 100% (45 models), controller optimization 60%.

---

## Scope — Current State & Priorities

### What's Built & Live (Current Production Scope)

**Fully Operational:**
- LMS with 4 course types (Computer Apps, Art, Spoken English, Life Skills)
- Admin course builder, quiz engine, content management, translation module
- Coach grading interface (Art/Audio/Video), assignment management
- ISF Coin economy (earn → spend → refund loop)
- ISF Shop (catalog, cart, checkout, order history, 5-min cancellation)
- Purchase Management (4-step lifecycle, 6 categories, vendor management, stock reconciliation)
- Wall of Fame (pins, submissions, leaderboards, Mann ki Baat)
- Medical check-ins, doctor visits, hospital management
- Facial Recognition login (browser webcam + encrypted embeddings)
- RBAC (9 roles, scope-based data isolation)
- Notification system, attendance tracking, task management, Balagruha management
- Analytics dashboards (shop, coin economy, transaction reports)

**Partially Operational (needs completion):**
- RBAC scope filtering — infrastructure done, not uniformly applied across all controllers
- Art course Artweaver integration — routes exist, IPC stubbed
- Manual coin award for coaches — implicit via grading, no explicit API
- Voice infrastructure — upload/recording works, no live calling
- Course reporting — basic metrics, not comprehensive analytics
- Machine Management — backend complete, zero frontend UI

### Sprint Roadmap

**Sprint 2: LMS & Communication — COMPLETE REMAINING**
Pending items from the original Sprint 2 MPSD that must be finished:
- Amma role: query management, SLA task management, auto-reassignment, dashboard
- WhatsApp API integration for notifications
- Live voice communication infrastructure
- Comprehensive course reporting/analytics
- Artweaver Electron IPC integration (if still relevant)
- Explicit manual coin award API for coaches

**Sprint 6: Stabilize & Document (NEW — Next Sprint to Execute)**
Quality, infrastructure, and architecture work:

*Quality & Code:*
- Fix 14 legacy failing test suites (triage: delete stale or fix regressions)
- Complete RBAC scope filter enforcement across all controllers
- Remove FR route RBAC TODOs (add proper permission checks)
- Machine Management frontend UI (backend fully built, zero frontend)
- ORM quality audit — verify the S2-CQ standardization is correct and complete
- Continue test coverage expansion

*Database & Architecture Documentation (CRITICAL):*
- Full database schema mapping of ALL 45 Mongoose models — collections, fields, types, refs/relationships, indexes, virtuals, validation rules
- Document how data flows between models (e.g., PurchaseRequest → InventoryTransaction → ShopItem stock updates)
- Map which controllers touch which models (controller-to-model dependency graph)
- Identify missing indexes, redundant fields, or schema inconsistencies
- Produce architecture diagrams: system overview, data flow, component relationships
- Output: If too large for architecture.md, create separate `database-architecture.md`
- This schema map is a PREREQUISITE for safely building Sprint 2 (Amma), Sprint 3 (Mobile), and Sprint 4 (Emergency) — new features need to know what data structures exist before adding new ones

**Sprint 3: Mobile App & Attendance — AS PER ORIGINAL PLAN + ENHANCEMENTS**
Per original MPSD, enhanced with current priorities:
- Progressive Web App (PWA) or mobile app for Coaches/Admins/BICs
- FR-based attendance via photo upload
- Mobile media management
- Push notifications (FCM) for purchase requests, grading alerts
- Offline-first improvements for intermittent connectivity

**Sprint 4: Emergency Features & Communication — AS PER ORIGINAL PLAN + ENHANCEMENTS**
Per original MPSD, enhanced with current priorities:
- SOS emergency alert system
- Internal messaging between staff roles
- WhatsApp-based notifications (builds on Sprint 2 WhatsApp integration)
- Student health tracking with SOS correlation
- Multi-Balagruha donor reporting dashboard
- Advanced learning analytics
- Additional language support beyond Telugu

### Execution Order

1. **Sprint 6** (Stabilize & Document) — execute FIRST to establish solid foundation
2. **Sprint 2** (Complete remaining) — finish what was started
3. **Sprint 3** (Mobile & Attendance) — extend platform reach
4. **Sprint 4** (Emergency & Communication) — add safety and engagement layers

### Scope Decision Criteria

Before adding any feature to a sprint, it must pass:
1. **User demand** — Is ISF actively requesting this? Which Balagruhas need it?
2. **Impact** — How many users does it affect? Does it improve a KPI?
3. **Effort** — Can it be delivered in one sprint (4 weeks)?
4. **Dependencies** — Does it require infrastructure not yet built?
5. **Maintenance** — Will it increase test/maintenance burden proportionally to its value?

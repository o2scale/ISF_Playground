# Sprint 3+4 Combined MPSD: Mobile App & Emergency Communication System

**Master Product Specification Document**

---

## Document Control

| **Attribute** | **Details** |
|---------------|-------------|
| **Project Name** | ISF Playground Platform - Sprint 3+4 Combined |
| **Document Version** | 1.0 DRAFT |
| **Date** | October 17, 2025 |
| **Author** | BMad Orchestrator |
| **Status** | DRAFT - Awaiting Client Review |
| **Sprint Duration** | 4 weeks (28 working days) |
| **Estimated Completion** | November 14, 2025 |
| **Last Updated** | October 17, 2025 |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [MPSD Introduction & Combined Sprint Overview](#2-mpsd-introduction--combined-sprint-overview)
3. [Target Users & Personas](#3-target-users--personas)
4. [High-Level Scope](#4-high-level-scope)
5. [Target Audience (for this MPSD)](#5-target-audience-for-this-mpsd)
6. [Document Conventions](#6-document-conventions)
7. [Global Elements & Standards](#7-global-elements--standards)
8. [Detailed Feature & Module Breakdown](#8-detailed-feature--module-breakdown)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Development Timeline & Milestones](#10-development-timeline--milestones)
11. [Testing Strategy](#11-testing-strategy)
12. [Resource Requirements](#12-resource-requirements)
13. [Risk Assessment & Mitigation](#13-risk-assessment--mitigation)
14. [Questions for Client Clarification](#14-questions-for-client-clarification)
15. [Success Criteria & Acceptance](#15-success-criteria--acceptance)
16. [Appendices](#16-appendices)
17. [Sign-off Section](#17-sign-off-section)
18. [Post-Implementation Considerations](#18-post-implementation-considerations)

---

## 1. Executive Summary

### 1.1. Project Overview

The **ISF Playground Platform** is a comprehensive digital ecosystem serving the Initiative Sewa Foundation's orphanages (Balagruhas) across India. The platform supports Students, Coaches, Admins, and Balagruh In-Charges through an Electron desktop application with embedded MongoDB and Node.js backend.

**Sprint 3+4 Combined** represents a strategic consolidation of mobile and emergency features, leveraging enhanced AI-assisted development workflows to deliver two sprints worth of functionality in a single 4-week timeline.

### 1.2. Combined Sprint Goals

**Sprint 3: Mobile App Development & Attendance Tracking**
- Develop mobile application for Coaches, Admins, and Balagruh In-Charges
- Implement facial recognition-based attendance system
- Enable mobile media management and course content uploads
- Provide mobile-accessible analytics and reporting
- Establish push notification infrastructure

**Sprint 4: Emergency Features & Communication**
- Implement SOS emergency alert system (Desktop → Mobile)
- Build internal messaging module for staff communication
- Integrate WhatsApp-based notifications
- Create student health tracking system with SOS correlation

### 1.3. Why Combine Sprint 3+4?

**Rationale:**
1. **Enhanced Development Velocity**: Sprint 5 achieved 32% faster delivery (15 days vs 22 estimated) using AI-assisted BMad workflow
2. **Technical Dependencies**: Sprint 4 mobile alerts REQUIRE Sprint 3 mobile app foundation
3. **Unified Mobile Architecture**: Both sprints target the same mobile platform and user roles
4. **Shared Infrastructure**: Notification system, WebSocket layer, and AWS S3 serve both sprints
5. **Resource Optimization**: Single mobile codebase, unified API patterns, common UI/UX

**Conservative Estimate:** 4 weeks (28 days) to complete both sprints
**Aggressive Estimate:** 3 weeks with parallel workstreams

### 1.4. Development Strategy

**Sequential with Early Integration (Recommended)**

```
Week 1-2: Mobile Foundation (Sprint 3 Core)
├── Mobile app initialization & authentication
├── Navigation structure & dashboard
├── Push notification infrastructure (FCM)
├── AWS S3 integration for media
└── WebSocket real-time layer

Week 2.5: Integration Testing Checkpoint
├── End-to-end mobile authentication
├── Notification delivery verification
└── WebSocket connection stability

Week 3: Sprint 3 Features + Sprint 4 Foundation
├── Attendance tracking with facial recognition
├── Mobile media upload & management
├── Desktop SOS trigger implementation
├── SOS alert routing to mobile

Week 4: Sprint 4 Features + Integration
├── Internal messaging module
├── Health tracking system
├── WhatsApp integration
├── Full system integration testing
└── Production readiness verification
```

### 1.5. Key Success Metrics

| **Category** | **Target Metric** |
|--------------|-------------------|
| **Development Speed** | Complete in 28 days (4 weeks) |
| **Quality Score** | Average QA score ≥ 95/100 (Sprint 5: 97.25) |
| **Test Coverage** | E2E test coverage ≥ 90% |
| **SOS Response Time** | Alert delivery to mobile < 5 seconds |
| **Attendance Accuracy** | Facial recognition accuracy ≥ 95% |
| **Mobile Performance** | App launch time < 3 seconds |
| **Notification Delivery** | Push notification success rate ≥ 98% |
| **API Response Time** | Mobile API endpoints < 500ms (p95) |

---

## 2. MPSD Introduction & Combined Sprint Overview

### 2.1. Purpose of this MPSD

This Master Product Specification Document serves as the single source of truth for Sprint 3+4 combined development. It provides:

- **Comprehensive Requirements**: Detailed user stories, acceptance criteria, and technical specifications
- **Architecture Guidance**: API endpoints, data models, and system integration patterns
- **Development Roadmap**: Week-by-week timeline with dependencies and milestones
- **Quality Assurance Framework**: Testing strategies, success criteria, and acceptance procedures
- **Risk Management**: Identified risks with mitigation strategies

**Audience**: Development Team, QA Team, Project Manager, Client Stakeholders

### 2.2. Sprint 3 Overview

**Focus:** Mobile application for staff members (Coaches, Admins, Balagruh In-Charges)

**Primary Deliverables:**
1. React Native mobile app with iOS and Android support
2. Mobile authentication system (JWT + biometric)
3. Attendance tracking via photo upload and facial recognition
4. Mobile media management for course content uploads
5. Mobile analytics dashboard for performance monitoring
6. Push notification infrastructure (Firebase Cloud Messaging)

**Target Users:**
- Coaches: Upload course content, view reports
- Admins: Access analytics, manage system
- Balagruh In-Charges: Mark attendance, upload class photos

### 2.3. Sprint 4 Overview

**Focus:** Emergency response and internal communication systems

**Primary Deliverables:**
1. SOS emergency alert system (Desktop trigger → Mobile alerts)
2. SOS escalation workflow with configurable tiers
3. Internal messaging module (1-on-1 and group conversations)
4. WhatsApp Business API integration for external notifications
5. Student health tracking module with SOS correlation

**Target Users:**
- Students: Trigger SOS alerts from desktop app
- Coaches/Admins: Receive and respond to SOS alerts on mobile
- All Staff: Internal messaging for coordination

### 2.4. Integration Points Between Sprints

**Critical Shared Components:**

| **Component** | **Sprint 3 Foundation** | **Sprint 4 Usage** |
|---------------|------------------------|-------------------|
| **Mobile App Shell** | Authentication, navigation, profile | SOS alerts, messaging screens |
| **Push Notifications** | FCM setup, device token management | SOS alerts, message notifications |
| **WebSocket Layer** | Real-time infrastructure | SOS status updates, messaging |
| **AWS S3 Storage** | Media upload for course content | Health document uploads |
| **API Gateway** | Mobile-optimized endpoints | SOS API, messaging API |

**Dependency Flow:**
```
Mobile App Foundation [S3]
    ↓
Push Notification System [S3]
    ↓
SOS Emergency System [S4] (requires mobile app to receive alerts)
    ↓
Health Tracking [S4] (correlates with SOS incidents)
```

### 2.5. Sprint Attribution System

Throughout this document, features are tagged with their originating sprint:

- **[S3]**: Sprint 3 specific feature (Mobile app development)
- **[S4]**: Sprint 4 specific feature (Emergency & communication)
- **[SHARED]**: Cross-sprint dependency or shared infrastructure
- **[S3→S4]**: Sprint 3 foundation that Sprint 4 builds upon

**Example:**
```
Mobile Dashboard
├── [S3] Quick action: Upload course content
├── [S3] Quick action: Mark attendance
├── [S4] Quick action: View SOS alerts (badge count)
├── [S4] Quick action: Open messaging
└── [SHARED] Notification bell (attendance + SOS + messages)
```

---

## 3. Target Users & Personas

### 3.1. Primary Personas

#### Persona 1: Coach Rajesh (Mobile User - Sprint 3)

| **Attribute** | **Details** |
|---------------|-------------|
| **Role** | Sports Coach |
| **Age** | 32 |
| **Tech Proficiency** | Moderate |
| **Primary Device** | Smartphone (Android) |
| **Key Needs** | - Upload training videos from phone<br>- Check student attendance remotely<br>- View performance reports on the go<br>- Respond to emergency alerts quickly |
| **Pain Points** | - Currently must use desktop to upload content<br>- Cannot check reports while traveling<br>- Miss important notifications |
| **Sprint 3 Goals** | Rajesh can upload course videos directly from his phone after training sessions and view student engagement analytics during his commute. |
| **Sprint 4 Goals** | Rajesh receives immediate SOS alerts on his phone when a student needs help, can acknowledge and respond within seconds, and coordinates with other staff via in-app messaging. |

#### Persona 2: Admin Priya (Mobile User - Sprint 3+4)

| **Attribute** | **Details** |
|---------------|-------------|
| **Role** | System Administrator |
| **Age** | 28 |
| **Tech Proficiency** | High |
| **Primary Device** | Smartphone (iOS) + Desktop |
| **Key Needs** | - Monitor system health on mobile<br>- View real-time analytics<br>- Respond to critical alerts immediately<br>- Manage emergency escalations<br>- Communicate with staff efficiently |
| **Pain Points** | - Tied to desktop for administrative tasks<br>- Delayed emergency response when away from desk<br>- Fragmented communication channels |
| **Sprint 3 Goals** | Priya accesses comprehensive dashboards on her iPhone, viewing attendance rates, coin economy metrics, and performance trends while managing multiple Balagruhas. |
| **Sprint 4 Goals** | Priya is the Tier 2 escalation contact for SOS alerts. She receives urgent notifications, can see which Coaches are responding, and coordinates emergency response through the messaging system. |

#### Persona 3: Balagruh In-Charge Sunita (Mobile User - Sprint 3)

| **Attribute** | **Details** |
|---------------|-------------|
| **Role** | Balagruh In-Charge (Facility Manager) |
| **Age** | 45 |
| **Tech Proficiency** | Low-Moderate |
| **Primary Device** | Smartphone (Android, Budget) |
| **Key Needs** | - Mark attendance easily with photos<br>- Track student health records<br>- Receive attendance alerts<br>- Simple, intuitive interface |
| **Pain Points** | - Manual attendance is time-consuming<br>- Difficult to track health patterns<br>- Misses important updates |
| **Sprint 3 Goals** | Sunita takes a class photo with her phone after morning assembly. The system automatically detects faces and marks attendance, showing her which students are absent within seconds. |
| **Sprint 4 Goals** | When entering routine health checkups, Sunita receives alerts if a student's vitals are abnormal. She can quickly record incident details and link them to any SOS alerts. |

#### Persona 4: Student Arjun (Desktop User - Sprint 4)

| **Attribute** | **Details** |
|---------------|-------------|
| **Role** | Student (Age 16) |
| **Age** | 16 |
| **Tech Proficiency** | Moderate |
| **Primary Device** | Desktop app (Electron) |
| **Key Needs** | - Quick access to emergency help<br>- Safety and security<br>- Course content access |
| **Pain Points** | - Unsure how to get help in emergencies<br>- Fear of stigma for mental health issues<br>- No direct communication with staff |
| **Sprint 4 Goals** | Arjun feels unwell during study time. He clicks the prominent SOS button on his desktop app, selects "Medical Emergency", and within 5 seconds, Coach Rajesh's phone alerts him. Rajesh acknowledges and arrives within 3 minutes. |

### 3.2. Secondary Personas

#### Persona 5: Parent/Guardian (External User - Sprint 4)

| **Attribute** | **Details** |
|---------------|-------------|
| **Role** | Parent/Guardian |
| **Primary Channel** | WhatsApp |
| **Key Needs** | - Receive important updates about child<br>- Attendance notifications<br>- Emergency alerts |
| **Sprint 4 Goals** | Parents receive WhatsApp notifications for daily attendance summaries and immediate alerts if their child triggers an SOS. |

---

## 4. High-Level Scope

### 4.1. What's In Scope

#### Sprint 3: Mobile App Development

✅ **Mobile Application Development**
- React Native application (iOS and Android)
- User authentication (JWT + biometric)
- Role-based navigation and dashboards
- Offline-first architecture with sync capabilities
- App store deployment preparation

✅ **Attendance Tracking System**
- Camera/gallery integration for photo capture
- Photo upload to AWS S3 with optimization
- Integration with existing Face-API.js backend
- Real-time facial recognition processing
- Manual override and verification interface
- Attendance history and reporting

✅ **Mobile Media Management**
- Multi-file upload (videos, documents, images)
- Course/module association
- Batch upload with progress tracking
- Content publishing workflow
- Preview and metadata editing

✅ **Mobile Analytics & Reporting**
- Performance dashboard with key metrics
- Date range filtering and drill-down
- Visual charts (attendance, completion, coins)
- Top performers lists
- Export capabilities (PDF/CSV)

✅ **Push Notification Infrastructure**
- Firebase Cloud Messaging integration
- Device token registration and management
- Background and foreground notification handling
- Deep linking to relevant screens
- Notification preferences and quiet hours
- Notification history screen

#### Sprint 4: Emergency & Communication

✅ **SOS Emergency System**
- Desktop SOS trigger button (prominent placement)
- Emergency category selection (Medical, Safety, Mental Health, Other)
- Mobile alert reception with high-priority notifications
- Real-time status tracking (sent → acknowledged → responding → resolved)
- Multi-tier escalation workflow
- Response coordination dashboard
- Compliance and audit logging

✅ **Internal Messaging Module**
- 1-on-1 direct messaging
- Group conversations
- Text, image, and file attachments
- Read receipts and typing indicators
- Message search and history
- Real-time delivery via WebSocket
- Unread count badges

✅ **WhatsApp Business API Integration**
- Template message support
- SOS alert notifications
- Daily attendance summaries
- Opt-in/opt-out management
- Delivery status tracking
- Rate limiting compliance

✅ **Student Health Tracking**
- Health metrics entry (weight, height, temperature, BP)
- Health document uploads
- Trend analysis and growth charts
- Abnormal value alerts
- SOS incident correlation
- Health report exports

#### Shared Infrastructure

✅ **WebSocket Real-Time Layer**
- Socket.io server implementation
- JWT authentication for WebSocket connections
- Room-based messaging (user, balagruh, conversation)
- Presence tracking (online/offline)
- Message queuing for offline users
- Reconnection handling

✅ **AWS S3 Media Storage**
- Presigned URL generation for secure uploads
- Folder organization (attendance-photos/, course-content/, health-documents/)
- Image optimization pipeline
- CDN integration (CloudFront)
- Backup and versioning policies

### 4.2. What's Out of Scope

❌ **Not Included in Sprint 3+4:**
- Student mobile app (Students use desktop app only)
- Parent/Guardian mobile app (Parents use WhatsApp only)
- Video conferencing or live streaming features
- Advanced AI features beyond facial recognition (e.g., sentiment analysis)
- Integration with external learning management systems (LMS)
- E-commerce/Shop functionality (completed in Sprint 5)
- Gamification features beyond existing coin system (Sprint 1/2)
- Multi-language support (English only for now)
- Offline mode for SOS alerts (require network connectivity)
- Direct emergency services integration (911/108 calling)
- Telemedicine or doctor consultation features
- Prescription management or medical record integration

❌ **Deferred to Future Sprints:**
- Mobile app for Students (Future sprint)
- AI-powered health diagnosis or recommendations
- Integration with wearable health devices
- Advanced analytics with ML predictions
- Voice/video calling within messaging
- Broadcast channels for announcements
- Calendar and event management
- Task assignment and tracking system (beyond SOS follow-up)

---

## 5. Target Audience (for this MPSD)

### 5.1. Primary Audience

**Project Manager / Product Owner**
- Understand complete scope and timeline
- Track progress against milestones
- Manage stakeholder expectations
- Make priority decisions when trade-offs arise

**Development Team Lead / Senior Developer**
- Technical implementation guidance
- API endpoint specifications
- Data model design
- Architecture decisions

**QA Lead / QA Engineer**
- Test case development
- Acceptance criteria verification
- E2E test scenario planning
- Bug severity assessment

### 5.2. Secondary Audience

**UI/UX Designer**
- Understand user flows and interactions
- Design mobile screens and components
- Ensure consistency with existing platform

**DevOps Engineer**
- Infrastructure requirements
- Deployment pipelines for mobile app
- AWS services configuration
- Monitoring and alerting setup

**Client Stakeholders (ISF Leadership)**
- High-level understanding of deliverables
- Business value and impact
- Budget and timeline approval
- Final acceptance and sign-off

### 5.3. How to Use This Document

**For Developers:**
- Section 8 contains detailed user stories with acceptance criteria
- Each story includes API endpoints, data models, and technical specs
- Section 10 provides the development timeline and task breakdown
- Refer to Section 16 (Appendices) for architecture diagrams

**For QA Team:**
- Section 8 acceptance criteria form the basis for test cases
- Section 11 outlines the testing strategy and quality gates
- Each feature includes expected behaviors and error scenarios
- Use Section 15 for final acceptance verification

**For Project Managers:**
- Section 1 (Executive Summary) for quick overview
- Section 10 for timeline and milestones
- Section 13 for risk management
- Section 14 for client clarification questions
- Section 15 for success criteria and sign-off procedures

---

## 6. Document Conventions

### 6.1. UI Element Naming

**Buttons:**
- Styled as: `[Button Name]` button
- Examples: `[Upload Photo]` button, `[Acknowledge SOS]` button

**Text Fields:**
- Styled as: `Field Name` field
- Examples: `Description` field, `Student Name` field

**Dropdowns/Selects:**
- Styled as: `Dropdown Name` dropdown
- Examples: `Emergency Category` dropdown, `Balagruh` dropdown

**Screens/Pages:**
- Bold text: **Dashboard Screen**, **SOS Alert Screen**

### 6.2. User Role Capitalization

- Capitalize when referring to the role: **Coach**, **Admin**, **Student**, **Balagruh In-Charge**
- Lowercase when used descriptively: "the admin can view reports"

### 6.3. Placeholders

- Angle brackets for dynamic values: `<studentName>`, `<uploadProgress>`
- Example: "Alert: `<studentName>` has triggered an SOS"

### 6.4. API Endpoint Representation

```yaml
HTTP_METHOD /api/path/:parameter
  Request:
    field1: type
    field2: type
  Response:
    field1: type
    field2: type
```

### 6.5. Sprint Attribution Tags

- `[S3]`: Sprint 3 feature
- `[S4]`: Sprint 4 feature
- `[SHARED]`: Shared infrastructure
- `[S3→S4]`: Foundation from Sprint 3 used by Sprint 4

### 6.6. Priority Levels

- **P0**: Critical - Must have for MVP
- **P1**: High Priority - Important but not blocking
- **P2**: Medium Priority - Nice to have
- **P3**: Low Priority - Future enhancement

### 6.7. Status Indicators

- ✅ In Scope
- ❌ Out of Scope
- ⚠️ Risk/Concern
- 🔄 Dependency
- ⏱️ Time-sensitive
- 📱 Mobile-specific
- 🖥️ Desktop-specific

---

## 7. Global Elements & Standards

### 7.1. Branding Guidelines

**ISF Playground Branding:**
- **Primary Color**: `#1E40AF` (Blue-700)
- **Secondary Color**: `#10B981` (Green-500)
- **Accent Color**: `#F59E0B` (Amber-500)
- **Error/Alert Color**: `#EF4444` (Red-500)
- **Success Color**: `#10B981` (Green-500)
- **Warning Color**: `#F59E0B` (Amber-500)

**SOS Emergency Branding:**
- **SOS Color**: `#DC2626` (Red-600)
- **Urgent Background**: `#FEE2E2` (Red-50)
- **SOS Text**: Bold, 18px minimum
- **SOS Button**: Minimum 60px height, prominent placement

**Typography:**
- **Headings**: Inter Bold
- **Body**: Inter Regular
- **Buttons**: Inter Semi-Bold
- **Monospace** (for codes): Fira Code

### 7.2. Responsive Design Standards

**Mobile First Approach:**
- Design for smallest screen first (iPhone SE: 375x667)
- Scale up to tablets and larger devices
- Breakpoints:
  - Small: 375px - 639px (phones)
  - Medium: 640px - 767px (large phones)
  - Large: 768px - 1023px (tablets)

**Touch Targets:**
- Minimum: 44x44px (iOS Human Interface Guidelines)
- Recommended: 48x48px (Android Material Design)
- Spacing: 8px minimum between interactive elements

### 7.3. Performance Standards

**Mobile App Performance:**
- App launch time: < 3 seconds (cold start)
- Screen transition: < 300ms
- Image loading: Progressive (show placeholder immediately)
- API response time: < 500ms (p95)
- Bundle size: < 25MB (optimized)

**Backend API Performance:**
- Mobile endpoints: < 500ms response time (p95)
- SOS alert processing: < 2 seconds
- Facial recognition: < 10 seconds for 30-student photo
- WebSocket latency: < 100ms (p95)
- Database queries: < 100ms (p95)

### 7.4. Accessibility Standards

**WCAG 2.1 Level AA Compliance:**
- Color contrast ratio: Minimum 4.5:1 for normal text
- Touch targets: Minimum 44x44px
- Screen reader support: All interactive elements labeled
- Keyboard navigation: Full support (for desktop features)
- Alternative text: All images and icons
- Focus indicators: Visible focus states
- Error messages: Clear, actionable, associated with fields

**Mobile Accessibility:**
- VoiceOver (iOS) support
- TalkBack (Android) support
- Dynamic Type support (iOS)
- Font scaling support (Android)
- Haptic feedback for critical actions (SOS, send)

### 7.5. Security Standards

**Authentication:**
- JWT tokens with 24-hour expiration
- Refresh tokens with 30-day expiration
- Biometric authentication (Face ID, Touch ID, Fingerprint) as secondary factor
- Secure token storage (iOS Keychain, Android Keystore)

**Data Encryption:**
- HTTPS/TLS 1.3 for all API communication
- WebSocket Secure (WSS) for real-time connections
- At-rest encryption for sensitive data
- End-to-end encryption for health records (optional, future)

**Authorization:**
- Role-Based Access Control (RBAC)
- Permission checks on every API endpoint
- Row-Level Security for multi-Balagruh data
- Audit logging for sensitive actions (SOS, health data)

### 7.6. Unified Navigation Structure

**Desktop App (Electron):**
```
Student Dashboard
├── Home
├── Courses
├── Attendance
├── Shop
├── Wallet (Coins)
├── Profile
└── [SOS Button] ← Prominent, always visible [S4]

Coach/Admin Dashboard
├── Home
├── Students
├── Courses
├── Attendance
├── Shop Management (Admin only)
├── Reports
├── Settings
└── Profile
```

**Mobile App (React Native):**
```
Bottom Tab Navigation
├── 📱 Dashboard [S3]
├── 📸 Attendance [S3] (Balagruh In-Charge only)
├── 📁 Media [S3] (Coach/Admin only)
├── 💬 Messages [S4]
└── 👤 Profile [S3]

Dashboard Quick Actions (Role-based)
├── [S3] Upload Course Content (Coach/Admin)
├── [S3] Mark Attendance (Balagruh In-Charge)
├── [S3] View Reports (Admin/Coach)
├── [S4] SOS Alerts (Coach/Admin) - Badge count
├── [S4] Health Records (Balagruh In-Charge)
└── [SHARED] Notifications (All roles)
```

**Notification Center (Unified):**
```
Notification Bell Icon (Badge count)
├── [S3] Attendance completed/failed
├── [S4] SOS Alert (urgent priority)
├── [S4] New message (high priority)
├── [S3] Low inventory alert (medium priority)
└── [S3] Daily report ready (low priority)
```

### 7.7. Error Handling Standards

**User-Facing Error Messages:**
- Clear and actionable: "Unable to upload photo. Please check your internet connection and try again."
- Avoid technical jargon: ❌ "HTTP 500 Internal Server Error" → ✅ "Something went wrong. Please try again."
- Provide next steps: "Your session has expired. Please log in again."

**Error Severity Levels:**
- **Critical**: SOS alert not delivered, Authentication failure
- **High**: Photo upload failed, Attendance not saved
- **Medium**: Report export failed, Notification not sent
- **Low**: Image thumbnail not loaded, Cache miss

**Error Recovery:**
- Automatic retry for network failures (3 attempts)
- Queue failed actions for retry when online
- Clear error state when user takes corrective action
- Log all errors for debugging (Sentry/Crashlytics)

### 7.8. Internationalization Preparation

**Current Scope:** English only

**Future Readiness:**
- All strings externalized (i18n library)
- Date/time formatting using locale-aware libraries
- Number formatting (currency, decimals) configurable
- RTL layout support (future - for Hindi/Urdu)

---

## 8. Prerequisites & Technical Debt Resolution

### 8.0. Overview: Critical System Rebuilds

Before Sprint 3+4 development can proceed at full velocity, two critical systems from previous sprints require complete rebuilds due to fundamental implementation issues discovered during analysis:

1. **[PREREQUISITE] RBAC (Role-Based Access Control) System** - Sprint 2 incomplete work
2. **[PREREQUISITE] Facial Recognition System** - Sprint 1 broken implementation

**Impact on Sprint 3+4:**
- **RBAC** blocks proper permission enforcement for mobile app and SOS system
- **Facial Recognition** blocks attendance tracking feature (S3-F02)
- Both systems must be rebuilt before full Sprint 3+4 delivery

**Parallel Development Strategy:**
- Option A: RBAC rebuild (Week 1-2), then FR rebuild (Week 3-4)
- Option B: FR rebuild (Week 1-2), then RBAC rebuild (Week 3-4)
- **Option C (RECOMMENDED)**: Parallel development if 2 developers available
  - Developer 1: RBAC rebuild (8-10 days)
  - Developer 2: FR rebuild (12-15 days)
  - Reduces overall timeline by 10 days

**Temporary Mitigation:**
- **RBAC**: Implement "open access" mode during rebuild (user approved)
- **FR**: Use manual attendance marking until rebuild complete

---

### 8.0.1. [PREREQUISITE] RBAC System - Complete Rebuild

#### Feature ID: PREREQUISITE-RBAC
**Feature Name:** Role-Based Access Control - Complete Rebuild from Scratch
**Module:** Authentication & Authorization
**Priority:** P0 (Blocks Sprint 3+4)
**Development Timeline:** 8-10 days
**Dependencies:** None (standalone rebuild)

---

#### Analysis Summary: Current RBAC Implementation

**Current State Assessment:**
- **Quality Score:** 5/10 (foundational but inadequate)
- **Critical Issues Identified:**
  1. Development bypass enabled (security risk) - ALL permission checks skipped in dev mode
  2. MAC address authentication completely disabled
  3. **No Balagruh-level data filtering** - Coach A can access Balagruh B data
  4. Permission granularity too coarse (module + action only, no scope)
  5. Frontend doesn't enforce permissions (only checks role)

**Files Analyzed:**
- `backend/middleware/checkPermission.js` - Missing scope filtering
- `backend/middleware/auth.js` - Dev bypass enabled, MAC auth disabled
- `backend/models/role.js` - No scope field in schema
- `frontend/src/contexts/AuthContext.js` - Only role checks, no permissions

**Decision: CHUCK & REBUILD**
- **Rationale:** Current system missing critical Balagruh-level filtering (cannot be retrofitted easily)
- **Effort:** Refactor would take 5-7 days, rebuild takes 8-10 days (minimal difference)
- **Benefit:** Clean architecture, extensible, matches approved simple design
- **User Preference:** "Better to write from scratch and replace the code"

---

#### New RBAC Design Specification (User Approved)

**Permission-Based Model with Scope:**

```typescript
interface Permission {
  resource: string;      // 'students', 'courses', 'attendance', 'shop', 'health', 'sos'
  action: string;        // 'create', 'read', 'update', 'delete', 'manage'
  scope: 'own' | 'balagruh' | 'all'; // Data access scope
}

const ROLE_PERMISSIONS = {
  'Admin': [
    { resource: '*', action: '*', scope: 'all' }, // Full access to all Balagruhs
  ],

  'Coach': [
    { resource: 'students', action: 'read', scope: 'balagruh' }, // Assigned Balagruhs only
    { resource: 'courses', action: '*', scope: 'own' }, // Own courses only
    { resource: 'attendance', action: 'read', scope: 'balagruh' },
    { resource: 'sos', action: 'read', scope: 'balagruh' }, // Receive SOS from assigned Balagruhs
    { resource: 'messaging', action: '*', scope: 'all' }, // Message anyone
  ],

  'Balagruh In-Charge': [
    { resource: 'students', action: 'read', scope: 'balagruh' },
    { resource: 'attendance', action: '*', scope: 'balagruh' }, // Mark attendance for own Balagruh
    { resource: 'health', action: '*', scope: 'balagruh' }, // Manage health records
    { resource: 'sos', action: 'read', scope: 'balagruh' },
    { resource: 'messaging', action: '*', scope: 'all' },
  ],

  'Student': [
    { resource: 'courses', action: 'read', scope: 'own' },
    { resource: 'shop', action: '*', scope: 'own' },
    { resource: 'wallet', action: 'read', scope: 'own' },
    { resource: 'sos', action: 'create', scope: 'own' }, // Trigger SOS
  ],
};
```

**Multi-Balagruh Access Support:**
```typescript
interface UserBalagruhAccess {
  userId: string;
  balagruhIds: string[]; // Coach can access multiple Balagruhs
  role: string;
}
```

---

#### RBAC Rebuild Implementation Plan (8-10 Days)

**Phase 1: Design & Planning (1 day)**
- [ ] Review approved permission-based design
- [ ] Define all resources (students, courses, attendance, shop, health, sos, messaging, reports, users, roles)
- [ ] Define all actions (create, read, update, delete, manage)
- [ ] Define scopes (own, balagruh, all)
- [ ] Map existing roles to new permission structure
- [ ] Create migration strategy for existing role data

**Phase 2: Backend Implementation (4 days)**

**Day 1: Database Models**
- [ ] Create new Permission model
  ```javascript
  const PermissionSchema = new mongoose.Schema({
    resource: { type: String, required: true, enum: ['students', 'courses', ...] },
    action: { type: String, required: true, enum: ['create', 'read', 'update', 'delete', 'manage'] },
    scope: { type: String, required: true, enum: ['own', 'balagruh', 'all'], default: 'own' }
  });
  ```
- [ ] Create RolePermission schema
  ```javascript
  const RolePermissionSchema = new mongoose.Schema({
    roleName: { type: String, required: true },
    permissions: [{ resource: String, action: String, scope: String }]
  });
  ```
- [ ] Create migration script to convert old roles to new format
- [ ] Create UserBalagruhAccess schema for many-to-many Coach-Balagruh relationship

**Day 2: Authorization Middleware**
- [ ] Build new `checkPermission(resource, action)` middleware
  ```javascript
  const checkPermission = (resource, action) => {
    return async (req, res, next) => {
      const user = req.user;
      const hasPermission = await checkUserPermission(user, resource, action);
      if (!hasPermission) {
        return res.status(403).json({ message: `No permission to ${action} ${resource}` });
      }

      // Inject scope-based query filter
      const filter = getQueryFilter(user, resource);
      req.scopeFilter = filter; // Attach to request
      next();
    };
  };
  ```
- [ ] Build query filter injection middleware
  ```javascript
  function getQueryFilter(user, resource) {
    const permission = getUserPermission(user, resource);
    if (permission.scope === 'all') return {}; // No filter (Admin)
    if (permission.scope === 'balagruh') {
      // Filter by user's assigned Balagruhs
      return { balagruhId: { $in: user.balagruhIds } };
    }
    if (permission.scope === 'own') {
      return { userId: user._id }; // Own data only
    }
  }
  ```
- [ ] Automatic Balagruh scoping based on user's assignments
- [ ] Remove development mode bypass completely
- [ ] Re-enable MAC address checks (if required)

**Day 3: Update API Endpoints**
- [ ] Replace old `authorize(module, action)` with `checkPermission(resource, action)` across all routes
  ```javascript
  // Old (broken)
  router.get('/students', authorize('User Management', 'Read'), getStudents);

  // New (with scope)
  router.get('/students', authenticate, checkPermission('students', 'read'), async (req, res) => {
    const students = await Student.find(req.scopeFilter); // Auto-filtered by Balagruh
    res.json({ success: true, data: students });
  });
  ```
- [ ] Add query filters for Balagruh scoping in controllers
- [ ] Test each endpoint with different roles

**Day 4: Testing & Refinement**
- [ ] Test all roles (Admin, Coach, Balagruh In-Charge, Student)
- [ ] Verify Balagruh scoping (Coach A cannot see Balagruh B data)
- [ ] Verify permission inheritance and wildcards
- [ ] Add comprehensive error messages
- [ ] Add audit logging for permission denials

**Phase 3: Frontend Implementation (2 days)**

**Day 5: Permission Hooks & Guards**
- [ ] Create `usePermission(resource, action)` hook
  ```typescript
  export const usePermission = (resource: string, action: string): boolean => {
    const { user } = useAuthStore();
    if (!user) return false;

    const hasPermission = user.permissions.some(p =>
      (p.resource === resource || p.resource === '*') &&
      (p.action === action || p.action === '*')
    );
    return hasPermission;
  };
  ```
- [ ] Create `<PermissionGuard>` component
  ```typescript
  const PermissionGuard = ({ resource, action, children, fallback = null }) => {
    const hasPermission = usePermission(resource, action);
    return hasPermission ? children : fallback;
  };
  ```
- [ ] Navigation filtering based on permissions
  ```typescript
  const visibleTabs = tabs.filter(tab =>
    usePermission(tab.resource, tab.requiredAction)
  );
  ```
- [ ] Hide/disable UI elements based on permissions

**Day 6: Update RBAC Management UI**
- [ ] Update `RBACManagement.js` component to work with new permission structure
- [ ] Add scope selection UI (dropdown: own/balagruh/all)
- [ ] Update permission toggles to include scope
- [ ] Test all permission CRUD operations
- [ ] Add visual indicators for scope level

**Phase 4: Testing & Migration (2 days)**

**Day 7: Comprehensive Testing**
- [ ] Unit tests for permission checking logic
- [ ] Integration tests for API endpoints with different roles
- [ ] E2E tests for permission-based UI visibility
- [ ] Test multi-Balagruh Coach access
- [ ] Test Admin global access
- [ ] Test Student own-data-only access
- [ ] Performance testing (ensure query filters don't slow down queries)

**Day 8: Data Migration**
- [ ] Backup production database
- [ ] Run migration script to convert old roles to new permission format
  ```javascript
  // Migration: Old Role → New RolePermission
  const migrateRoles = async () => {
    const oldRoles = await OldRole.find({});
    for (const oldRole of oldRoles) {
      const newPermissions = convertToPermissions(oldRole); // Map old to new
      await RolePermission.create({
        roleName: oldRole.roleName,
        permissions: newPermissions
      });
    }
  };
  ```
- [ ] Verify all users have correct permissions
- [ ] Smoke test production with all roles
- [ ] Monitor for permission errors in logs

**Phase 5: Deployment (1 day)**

**Day 9: Staged Rollout**
- [ ] Deploy backend to staging environment
- [ ] Deploy frontend to staging environment
- [ ] QA verification on staging
- [ ] Deploy to production during low-traffic window
- [ ] Monitor error logs and user reports
- [ ] Quick rollback plan if critical issues arise

**Day 10: Monitoring & Fixes**
- [ ] Monitor permission denial logs
- [ ] Address any edge cases discovered
- [ ] Update documentation
- [ ] Knowledge transfer to team

---

#### New RBAC API Endpoints

```yaml
POST /api/rbac/check-permission
  Description: Check if user has permission for resource and action
  Request:
    Headers:
      Authorization: Bearer <token>
    Body:
      resource: string (e.g., 'students', 'courses')
      action: string (e.g., 'read', 'create')
  Response:
    200 OK:
      hasPermission: boolean
      scope: 'own' | 'balagruh' | 'all'
    403 Forbidden:
      message: "Permission denied"

GET /api/rbac/user-permissions
  Description: Get all permissions for current user
  Request:
    Headers:
      Authorization: Bearer <token>
  Response:
    200 OK:
      permissions: [
        { resource: string, action: string, scope: string }
      ]

POST /api/rbac/roles/:roleName/permissions
  Description: Update permissions for a role (Admin only)
  Request:
    Headers:
      Authorization: Bearer <token>
    Body:
      permissions: [
        { resource: string, action: string, scope: string }
      ]
  Response:
    200 OK:
      success: boolean
      role: RolePermission object
    403 Forbidden:
      message: "Admin access required"
```

---

#### RBAC Rebuild Success Criteria

**Functional Requirements:**
- ✅ All roles have correct permissions as per approved design
- ✅ Balagruh-level data filtering works correctly (Coach A cannot access Balagruh B)
- ✅ Multi-Balagruh Coach access works (Coach assigned to multiple Balagruhs sees all)
- ✅ Admin has global access across all Balagruhs
- ✅ Frontend UI elements hidden/disabled based on permissions
- ✅ Navigation tabs filtered by role permissions
- ✅ API endpoints return 403 for unauthorized access

**Performance Requirements:**
- ✅ Permission check latency < 50ms
- ✅ Query filters don't degrade database performance (< 100ms p95)
- ✅ No N+1 query issues

**Security Requirements:**
- ✅ No development bypasses in production
- ✅ All API endpoints protected with permission checks
- ✅ Audit logging for permission denials
- ✅ No permission escalation vulnerabilities

**Migration Success:**
- ✅ All existing users migrated to new permission structure
- ✅ Zero downtime during migration
- ✅ Rollback plan tested and available

---

### 8.0.2. [PREREQUISITE] Facial Recognition System - Complete Rebuild

#### Feature ID: PREREQUISITE-FR
**Feature Name:** Facial Recognition System - Complete Rebuild with Modern Library
**Module:** Authentication & Attendance
**Priority:** P0 (Blocks S3-F02 Attendance Tracking)
**Development Timeline:** 12-15 days
**Dependencies:** None (standalone rebuild)

---

#### Analysis Summary: Current FR Implementation

**Current State Assessment:**
- **Quality Score:** 2.5/10 (fundamentally broken)
- **Library:** face-api.js (original) - **ARCHIVED February 2025, read-only, unmaintained**
- **Critical Issues Identified:**
  1. **Models never loaded** - Code would fail on first run (missing model loading logic)
  2. Using deprecated library (no longer maintained, security vulnerabilities)
  3. Hardcoded threshold (0.6) with no tuning or testing
  4. **No liveness detection** - Can be spoofed with printed photos, phone screens, deep fakes (SECURITY RISK)
  5. Poor error handling - No user guidance on failures
  6. Inefficient - Loads ALL students from DB on EVERY login (O(n) complexity, no caching)
  7. No image preprocessing - No validation, normalization, quality checks
  8. Frontend provides no feedback - No face detection preview, alignment guide, or lighting indicator

**Files Analyzed:**
- `backend/services/student.js` (faceLogin function, lines 581-761) - Broken implementation
- `backend/controllers/userController.js` (facialLogin handler) - Simple pass-through
- `frontend/src/components/faceidlogin/FaceIdLogin.js` - No validation or guidance
- `frontend/src/components/usermanagement/FaceCapture.js` - No feedback

**Decision: CHUCK & REBUILD FROM SCRATCH**
- **Rationale:** Current implementation missing critical components (model loading!), using deprecated library, no liveness detection
- **User Feedback:** "I don't think it's salvageable. It's actually very badly executed."
- **Effort:** Rebuild from scratch: 12-15 days (refactoring would take nearly the same time)

---

#### New FR Design: @vladmandic/human (Recommended Library)

**Why @vladmandic/human:**
- ✅ **Successor to face-api.js** - Same developer, modern implementation
- ✅ **All-in-one solution** - Face detection, recognition, landmarks, liveness detection
- ✅ **Latest TensorFlow.js** - Compatible with tfjs 4.x, GPU support (CUDA)
- ✅ **Liveness detection built-in** - Anti-spoofing, 3D face analysis
- ✅ **Active maintenance** - Latest: 3.3.6 (published 2 days ago)
- ✅ **99.2% accuracy** - LFW benchmark (industry-leading)
- ✅ **Production-ready** - Excellent documentation, battle-tested
- ✅ **Performance** - 45-80ms total (detection + recognition with GPU)

**Alternatives Considered:**
1. **face-recognition** (dlib wrapper) - 99.38% accuracy, but native dependencies (node-gyp) and no liveness detection
2. **@vladmandic/face-api** (maintained fork) - Drop-in replacement, but author recommends Human instead

**Final Choice:** @vladmandic/human - Best balance of accuracy, features, and maintainability

---

#### FR Rebuild Implementation Plan (12-15 Days)

**Phase 1: Setup & Model Loading (2 days)**

**Day 1: Install @vladmandic/human**
```bash
npm install @vladmandic/human
npm install canvas  # For Node.js image processing
```
- [ ] Install dependencies in backend
- [ ] Configure package.json scripts
- [ ] Download Human models from GitHub releases
- [ ] Create `/models/human` directory structure
- [ ] Test basic import and initialization

**Day 2: Model Loading & Server Startup**
- [ ] Implement model loading on server startup
  ```javascript
  const Human = require('@vladmandic/human').default;
  const human = new Human({
    backend: 'tensorflow',
    modelBasePath: './models/human',
    face: {
      enabled: true,
      detector: { rotation: true, maxDetected: 1 },
      mesh: { enabled: true },
      description: { enabled: true }, // 128-d embeddings
    },
  });

  async function initializeFR() {
    await human.load();
    await human.warmup(); // Warm up models for faster inference
    console.log('✅ Human library loaded and ready');
  }
  ```
- [ ] Add to server initialization
- [ ] Test basic face detection with sample image
- [ ] Verify GPU acceleration working (if available)

**Phase 2: Backend Implementation (5 days)**

**Day 3: Face Registration (Student Creation/Update)**
- [ ] Image preprocessing service
  ```javascript
  const preprocessImage = async (imagePath) => {
    const img = await canvas.loadImage(imagePath);

    // Resize if too large (max 1920x1080)
    if (img.width > 1920 || img.height > 1080) {
      img = resizeImage(img, 1920, 1080);
    }

    // Normalize lighting
    img = normalizeLighting(img);

    return img;
  };
  ```
- [ ] Face detection with quality checks
  ```javascript
  const registerFace = async (imagePath, studentId) => {
    const img = await preprocessImage(imagePath);
    const result = await human.detect(img);

    if (result.face.length === 0) {
      throw new Error('No face detected. Please ensure your face is clearly visible.');
    }
    if (result.face.length > 1) {
      throw new Error('Multiple faces detected. Please ensure only one face in image.');
    }

    const face = result.face[0];

    // Quality checks
    if (face.detection.score < 0.9) {
      throw new Error('Face detection confidence too low. Please use a clearer image.');
    }

    const embedding = face.embedding; // 128-d vector

    // Store in database
    await Student.updateOne(
      { _id: studentId },
      { $set: {
        'facialData.embedding': Array.from(embedding),
        'facialData.createdAt': new Date(),
        'facialData.library': 'human'
      }}
    );

    // Cache in Redis for fast lookup
    await redis.set(`face:${studentId}`, JSON.stringify(Array.from(embedding)));

    return { success: true, confidence: face.detection.score };
  };
  ```
- [ ] Validation (face detected, quality sufficient, single face)
- [ ] Extract 128-d embedding
- [ ] Store embedding in database
- [ ] Unit tests for registration

**Day 4: Face Recognition (Login)**
- [ ] Load image from upload
- [ ] Detect face
- [ ] Extract embedding
- [ ] Compare against cached descriptors (Redis)
  ```javascript
  const recognizeFace = async (imagePath) => {
    const img = await preprocessImage(imagePath);
    const result = await human.detect(img);

    if (result.face.length === 0) {
      return { success: false, message: 'No face detected' };
    }

    const queryEmbedding = result.face[0].embedding;

    // Get all student embeddings from Redis (fast)
    const studentKeys = await redis.keys('face:*');
    const matches = [];

    for (const key of studentKeys) {
      const studentId = key.replace('face:', '');
      const embeddingStr = await redis.get(key);
      const studentEmbedding = JSON.parse(embeddingStr);

      // Calculate similarity using Human's built-in matcher
      const similarity = human.match.similarity(queryEmbedding, studentEmbedding);
      matches.push({ studentId, similarity });
    }

    // Sort by similarity (higher = better match)
    matches.sort((a, b) => b.similarity - a.similarity);
    const bestMatch = matches[0];

    // Configurable threshold (start with 0.5, tune based on testing)
    if (bestMatch.similarity < 0.5) {
      return { success: false, message: 'Face not recognized. Please try again.' };
    }

    return {
      success: true,
      studentId: bestMatch.studentId,
      confidence: bestMatch.similarity,
    };
  };
  ```
- [ ] Return best match with confidence score
- [ ] Configurable threshold (default 0.5, tunable)

**Day 5: Caching Layer (Performance Optimization)**
- [ ] Implement Redis caching for face descriptors
  ```javascript
  // Warm cache on server startup
  const warmCache = async () => {
    const students = await Student.find({ 'facialData.embedding': { $exists: true } });
    for (const student of students) {
      await redis.set(
        `face:${student._id}`,
        JSON.stringify(student.facialData.embedding),
        'EX', 86400 // 24 hour TTL
      );
    }
    console.log(`✅ Warmed cache with ${students.length} face embeddings`);
  };
  ```
- [ ] Cache invalidation on student update/delete
- [ ] Warm cache on server startup
- [ ] Performance testing (target: <100ms total for recognition)
- [ ] Add cache hit/miss metrics

**Day 6: Liveness Detection**
- [ ] Implement blink detection
  ```javascript
  const performLivenessCheck = async (videoFrames) => {
    // Analyze multiple frames to detect blink
    const blinkDetected = await detectBlink(videoFrames);

    // Future: Head movement detection
    const headMovement = await detectHeadMovement(videoFrames);

    return {
      isLive: blinkDetected || headMovement,
      confidence: blinkDetected ? 0.9 : 0.5,
    };
  };
  ```
- [ ] Implement head movement detection (future: requires video stream)
- [ ] Add liveness score to validation
- [ ] Test with printed photos (should fail liveness)
- [ ] Test with phone screen photos (should fail liveness)

**Day 7: Error Handling & Logging**
- [ ] Add detailed error messages for each failure mode
  ```javascript
  const FR_ERRORS = {
    NO_FACE: 'No face detected. Please ensure your face is in frame and well-lit.',
    MULTIPLE_FACES: 'Multiple faces detected. Please ensure only your face is visible.',
    LOW_QUALITY: 'Image quality too low. Please use better lighting and a clearer photo.',
    NOT_RECOGNIZED: 'Face not recognized. Please try again or contact support.',
    LIVENESS_FAILED: 'Liveness check failed. Please ensure you are using a live camera, not a photo.',
  };
  ```
- [ ] Implement retry logic with user guidance
- [ ] Add Prometheus metrics (recognition attempts, success rate, latency, cache hit rate)
- [ ] Add comprehensive logging (info, warn, error levels)
- [ ] Integration with Sentry for error tracking

**Phase 3: Frontend Implementation (3 days)**

**Day 8: Face Capture UI Improvements**
- [ ] Add real-time face detection preview
  ```typescript
  const FaceCapture = () => {
    const [faceDetected, setFaceDetected] = useState(false);
    const [facePosition, setFacePosition] = useState(null);

    useEffect(() => {
      // Real-time face detection on video stream
      const interval = setInterval(async () => {
        const frame = captureVideoFrame();
        const result = await detectFace(frame);
        if (result.face) {
          setFaceDetected(true);
          setFacePosition(result.face.box); // Bounding box
        } else {
          setFaceDetected(false);
        }
      }, 500); // Check every 500ms

      return () => clearInterval(interval);
    }, []);

    return (
      <View>
        <Camera ref={cameraRef} />
        {/* Overlay with face bounding box */}
        {faceDetected && <FaceBoundingBox position={facePosition} />}
        {/* Oval alignment guide */}
        <OvalGuide />
        {/* Capture button (enabled only when face detected) */}
        <Button disabled={!faceDetected} onPress={capturePhoto}>
          Capture
        </Button>
      </View>
    );
  };
  ```
- [ ] Show bounding box around detected face
- [ ] Add alignment guide (oval overlay)
- [ ] Add lighting indicator
  ```javascript
  const getLightingStatus = (brightness) => {
    if (brightness < 50) return { status: 'Too dark', color: 'red' };
    if (brightness > 200) return { status: 'Too bright', color: 'orange' };
    return { status: 'Good lighting', color: 'green' };
  };
  ```
- [ ] Add distance guidance (move closer/further)
  ```javascript
  const getDistanceGuidance = (faceSize) => {
    if (faceSize < 100) return 'Move closer';
    if (faceSize > 300) return 'Move back';
    return 'Perfect distance';
  };
  ```

**Day 9: User Feedback & Guidance**
- [ ] Show capture quality score before submission
  ```typescript
  const [qualityScore, setQualityScore] = useState(0);

  const analyzeQuality = async (image) => {
    const result = await detectFace(image);
    const score = result.face?.detection.score || 0;
    setQualityScore(score);

    if (score < 0.8) {
      Alert.alert('Low Quality', 'Please retake with better lighting');
    } else {
      Alert.alert('Good Quality', 'Ready to submit');
    }
  };
  ```
- [ ] Add retry mechanism with specific guidance
- [ ] Add success/failure animations
- [ ] Add "Switch to password login" fallback button
- [ ] Loading indicators during processing

**Day 10: Error States & Help**
- [ ] Add help modal with photo examples
  ```typescript
  const HelpModal = () => (
    <Modal visible={showHelp}>
      <Text>Tips for Best Results:</Text>
      <Image source={goodExample} />
      <Text>✅ Good lighting, face centered</Text>
      <Image source={badExample} />
      <Text>❌ Too dark, face at angle</Text>
    </Modal>
  );
  ```
- [ ] Add troubleshooting guide
- [ ] Add "Report Issue" button (sends logs to support)
- [ ] Add Admin override for debugging
  ```typescript
  // Admin can bypass FR and force login
  if (user.role === 'Admin' && debugMode) {
    return <Button onPress={bypassFR}>Admin Override</Button>;
  }
  ```

**Phase 4: Data Migration (2 days)**

**Day 11: Re-register Existing Faces**
- [ ] Script to re-process all existing facial data
  ```javascript
  const migrateExistingFaces = async () => {
    const students = await Student.find({ 'facialData.faceDescriptor': { $exists: true } });

    for (const student of students) {
      try {
        // Old descriptor from face-api.js
        const oldDescriptor = student.facialData.faceDescriptor;

        // Cannot directly convert - need to re-register with new photo
        // Mark student for re-registration
        await Student.updateOne(
          { _id: student._id },
          { $set: { 'facialData.requiresReregistration': true } }
        );

        console.log(`Marked student ${student._id} for re-registration`);
      } catch (err) {
        console.error(`Failed to migrate student ${student._id}:`, err);
      }
    }
  };
  ```
- [ ] Extract new embeddings with Human library
- [ ] Migrate to new descriptor format (128-d float array)
- [ ] Validate migration (test logins with migrated students)
- [ ] Handle failures gracefully (log and notify)

**Day 12: Fallback & Rollback Plan**
- [ ] Keep old descriptors for rollback
  ```javascript
  // Store both old and new in database during transition
  {
    facialData: {
      embedding: [/* new Human embedding */],
      faceDescriptor: [/* old face-api.js descriptor - backup */],
      library: 'human',
      migratedAt: Date,
    }
  }
  ```
- [ ] A/B test (50% old system, 50% new system)
  ```javascript
  const useLegacyFR = Math.random() < 0.5;
  if (useLegacyFR) {
    return legacyFaceRecognition(image);
  } else {
    return newFaceRecognition(image);
  }
  ```
- [ ] Monitor accuracy and performance
- [ ] Full cutover if successful (disable legacy system)
- [ ] Rollback procedure documented

**Phase 5: Testing & Optimization (2 days)**

**Day 13: Accuracy Testing**
- [ ] Test with 100+ students
- [ ] Measure false positive rate (wrong student recognized) - Target: <1%
- [ ] Measure false negative rate (correct student rejected) - Target: <5%
- [ ] Tune confidence threshold for 95%+ accuracy
  ```javascript
  // Start with 0.5, adjust based on results
  const THRESHOLDS = {
    STRICT: 0.6,   // Higher accuracy, more rejections
    BALANCED: 0.5, // Good balance
    LENIENT: 0.4,  // Fewer rejections, lower accuracy
  };
  ```
- [ ] Test various lighting conditions (bright, dim, natural, artificial)
- [ ] Test various angles (frontal, slight tilt, profile - should reject)
- [ ] Test with glasses, masks (should handle glasses, reject masks)

**Day 14: Performance Testing**
- [ ] Load test (100 concurrent login attempts)
- [ ] Measure latency (target: <100ms p95 for recognition)
- [ ] Optimize cache hit rate (target: >95%)
- [ ] Optimize image preprocessing (resize, normalize)
- [ ] GPU vs CPU performance comparison
- [ ] Memory usage profiling

**Day 15: Security Testing**
- [ ] Test with printed photos (should fail liveness check)
- [ ] Test with phone screen displaying photo (should fail liveness check)
- [ ] Test with deep fakes (if possible)
- [ ] Penetration testing (attempt spoofing attacks)
- [ ] Review security audit logs

**Phase 6: Deployment (1 day)**

**Day 16: Production Deployment**
- [ ] Deploy to staging environment
- [ ] Smoke test with real users
- [ ] Deploy to production during maintenance window
- [ ] Monitor error logs and performance metrics for 24 hours
- [ ] Collect user feedback
- [ ] Address any critical issues immediately

---

#### New FR API Endpoints

```yaml
POST /api/fr/register
  Description: Register face for a student (extract and store embedding)
  Request:
    Headers:
      Authorization: Bearer <admin-token>
    Body (multipart/form-data):
      studentId: string
      photo: file (JPEG/PNG, max 5MB)
  Response:
    200 OK:
      success: boolean
      confidence: number (0-1)
      message: "Face registered successfully"
    400 Bad Request:
      message: "No face detected" | "Multiple faces detected" | "Low quality"

POST /api/fr/recognize
  Description: Recognize face for login
  Request:
    Body (multipart/form-data):
      photo: file (JPEG/PNG, max 5MB)
  Response:
    200 OK:
      success: boolean
      studentId: string
      confidence: number (0-1)
      token: string (JWT)
    400 Bad Request:
      message: "No face detected" | "Face not recognized"
    403 Forbidden:
      message: "Liveness check failed"

POST /api/fr/liveness-check
  Description: Perform liveness detection (future: video stream)
  Request:
    Body (multipart/form-data):
      frames: file[] (multiple video frames)
  Response:
    200 OK:
      isLive: boolean
      confidence: number (0-1)
```

---

#### FR Rebuild Success Criteria

**Functional Requirements:**
- ✅ Face registration accuracy ≥ 95% (95% of clear photos successfully registered)
- ✅ Face recognition accuracy ≥ 95% (95% of authorized users correctly recognized)
- ✅ False positive rate < 1% (wrong person recognized)
- ✅ False negative rate < 5% (correct person rejected)
- ✅ Liveness detection prevents photo spoofing
- ✅ Real-time face detection preview works on mobile
- ✅ Alignment guide and lighting feedback functional

**Performance Requirements:**
- ✅ Face registration: < 5 seconds total
- ✅ Face recognition: < 3 seconds total (including network)
- ✅ Real-time face detection preview: < 500ms latency
- ✅ Cache hit rate: > 95%
- ✅ GPU acceleration working (if available)

**Security Requirements:**
- ✅ Liveness detection prevents printed photo spoofing
- ✅ Liveness detection prevents screen-based spoofing
- ✅ Embeddings encrypted at rest
- ✅ No face data leakage in logs or error messages
- ✅ Audit logging for all FR operations

**User Experience:**
- ✅ Clear error messages with actionable guidance
- ✅ Visual feedback during capture (bounding box, alignment guide)
- ✅ Quality score shown before submission
- ✅ Fallback to password login always available
- ✅ Help modal with examples

---

## 8. Detailed Feature & Module Breakdown

### 8.1. [S3] Mobile App Foundation

#### Feature ID: S3-F01
**Feature Name:** Mobile App Foundation & Core Infrastructure
**Module:** Mobile Core
**Priority:** P0 (Critical Path)
**Development Timeline:** Week 1-2 (10 days)
**Dependencies:** None (Foundation)

---

#### Story S3-F01-STORY-01: Mobile App Initialization & Project Setup

**User Story:**
> As a **Developer**, I want to set up the mobile app project with React Native and TypeScript, so that we have a solid foundation for mobile development with proper architecture and tooling.

**Acceptance Criteria:**

1. **Project Initialization:**
   - [ ] React Native project created with TypeScript support
   - [ ] Project runs successfully on iOS simulator and Android emulator
   - [ ] Environment configuration files (.env.development, .env.staging, .env.production)
   - [ ] Git repository configured with proper .gitignore

2. **Project Structure:**
   - [ ] Modular folder structure implemented (screens, components, services, store, utils)
   - [ ] Follows Sprint 5 patterns (module isolation, separation of concerns)
   - [ ] ESLint and Prettier configured for code consistency
   - [ ] TypeScript strict mode enabled

3. **Navigation Framework:**
   - [ ] React Navigation v6 installed and configured
   - [ ] Stack navigator for authentication flow
   - [ ] Bottom tab navigator for main app sections
   - [ ] Drawer navigator for additional menu items
   - [ ] Deep linking configuration for notifications

4. **State Management:**
   - [ ] Zustand installed and configured (consistent with web app)
   - [ ] Global stores created: AuthStore, NotificationStore, ConfigStore
   - [ ] Persistent storage configured (AsyncStorage)

5. **UI Component Library:**
   - [ ] Base component library selected (React Native Paper or custom)
   - [ ] Theme provider configured with ISF branding colors
   - [ ] Reusable components: Button, TextInput, Card, Modal
   - [ ] Loading indicators and error states

6. **Build Configuration:**
   - [ ] iOS build configuration (Xcode project)
   - [ ] Android build configuration (Gradle)
   - [ ] App icon and splash screen assets added
   - [ ] App name and bundle identifier configured
   - [ ] Development, staging, and production build variants

7. **Development Tools:**
   - [ ] React Native Debugger integration
   - [ ] Flipper configured for debugging
   - [ ] Hot reload working correctly
   - [ ] Build scripts in package.json

**Technical Implementation Details:**

**Technology Stack:**
```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.6",
    "react-navigation/native": "^6.1.9",
    "react-navigation/stack": "^6.3.20",
    "react-navigation/bottom-tabs": "^6.5.11",
    "zustand": "^4.4.6",
    "@react-native-async-storage/async-storage": "^1.19.5",
    "axios": "^1.6.2",
    "react-native-config": "^1.5.1"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.12.0",
    "@typescript-eslint/parser": "^6.12.0",
    "eslint": "^8.54.0",
    "prettier": "^3.1.0",
    "typescript": "^5.3.2"
  }
}
```

**Project Structure:**
```
mobile/
├── src/
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── BiometricSetupScreen.tsx
│   │   ├── dashboard/
│   │   │   └── DashboardScreen.tsx
│   │   ├── attendance/
│   │   ├── media/
│   │   ├── messaging/
│   │   ├── sos/
│   │   ├── profile/
│   │   └── settings/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── TextInput.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Modal.tsx
│   │   └── navigation/
│   │       ├── BottomTabNavigator.tsx
│   │       └── DrawerNavigator.tsx
│   ├── services/
│   │   ├── api/
│   │   │   ├── apiClient.ts
│   │   │   ├── authApi.ts
│   │   │   ├── attendanceApi.ts
│   │   │   ├── mediaApi.ts
│   │   │   └── messagingApi.ts
│   │   └── storage/
│   │       └── secureStorage.ts
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── notificationStore.ts
│   │   └── configStore.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   └── permissions.ts
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── sizes.ts
│   │   └── config.ts
│   ├── types/
│   │   ├── user.ts
│   │   ├── attendance.ts
│   │   └── notification.ts
│   ├── navigation/
│   │   └── RootNavigator.tsx
│   └── App.tsx
├── android/
├── ios/
├── .env.development
├── .env.staging
├── .env.production
├── package.json
├── tsconfig.json
└── README.md
```

**Environment Configuration:**
```bash
# .env.development
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_WS_URL=ws://localhost:5000
REACT_APP_S3_BUCKET_URL=https://isf-playground-dev.s3.amazonaws.com

# .env.production
REACT_APP_API_BASE_URL=https://api.isfplayground.org/api
REACT_APP_WS_URL=wss://api.isfplayground.org
REACT_APP_S3_BUCKET_URL=https://isf-playground-prod.s3.amazonaws.com
```

**API Client Setup:**
```typescript
// src/services/api/apiClient.ts
import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';
import { getToken, clearTokens } from '../storage/secureStorage';

const apiClient: AxiosInstance = axios.create({
  baseURL: Config.REACT_APP_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, clear tokens and redirect to login
      await clearTokens();
      // Navigation logic here
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

**Frontend Components:**
- `LoginScreen.tsx`: Authentication UI
- `DashboardScreen.tsx`: Main dashboard
- `BottomTabNavigator.tsx`: Bottom tab navigation
- `Button.tsx`, `TextInput.tsx`: Reusable UI components

**API Endpoints:**
- None (Foundation setup only, authentication endpoints in next story)

**Data Models:**
- None (Foundation setup only, schemas in subsequent stories)

**UI/UX Wireframe Description:**

**App Launch Flow:**
1. Splash screen with ISF logo (2 seconds)
2. Check for stored auth token
3. If token exists and valid → Dashboard
4. If no token → Login Screen

**Navigation Structure:**
```
Root Navigator (Stack)
├── Auth Stack
│   └── Login Screen
└── Main Stack
    ├── Bottom Tab Navigator
    │   ├── Tab 1: Dashboard
    │   ├── Tab 2: Attendance (role-specific)
    │   ├── Tab 3: Media (role-specific)
    │   ├── Tab 4: Messages
    │   └── Tab 5: Profile
    └── Modal Screens (overlays)
        ├── SOS Alert Modal
        ├── Notification Detail
        └── Settings
```

**Testing Checklist:**
- [ ] App builds successfully on iOS
- [ ] App builds successfully on Android
- [ ] Navigation between screens works
- [ ] Hot reload functions correctly
- [ ] Environment variables load properly
- [ ] TypeScript compilation has no errors
- [ ] ESLint shows no warnings

---

#### Story S3-F01-STORY-02: Mobile Authentication System

**User Story:**
> As a **Coach/Admin/Balagruh In-Charge**, I want to log into the mobile app using my existing credentials and optionally use biometric authentication, so that I can securely access mobile features quickly.

**Acceptance Criteria:**

1. **Login Screen:**
   - [ ] Clean, professional login UI with ISF branding
   - [ ] `Username` text field with appropriate keyboard type
   - [ ] `Password` text field with secure entry and show/hide toggle
   - [ ] `[Log In]` button (disabled until both fields filled)
   - [ ] Loading indicator during authentication
   - [ ] Error messages displayed clearly below form
   - [ ] "Forgot Password?" link (links to desktop app instruction)

2. **Authentication Flow:**
   - [ ] JWT token-based authentication (reuses existing backend `/api/auth/login`)
   - [ ] Successful login stores JWT token securely (Keychain/Keystore)
   - [ ] Successful login stores refresh token
   - [ ] User object stored in AuthStore (Zustand)
   - [ ] Navigate to Dashboard on successful authentication

3. **Token Management:**
   - [ ] JWT token included in all API requests (Authorization header)
   - [ ] Token refresh mechanism (when token expires)
   - [ ] Refresh token rotation (security best practice)
   - [ ] Auto-login if valid token exists on app launch
   - [ ] Logout clears all tokens and user data

4. **Biometric Authentication:**
   - [ ] After first successful login, prompt to enable biometric auth
   - [ ] Support Face ID (iOS), Touch ID (iOS), Fingerprint (Android)
   - [ ] Biometric auth bypasses username/password entry
   - [ ] Fallback to username/password if biometric fails
   - [ ] Option to disable biometric auth in settings
   - [ ] Re-prompt for credentials every 30 days (security)

5. **Session Management:**
   - [ ] Session timeout after 24 hours of inactivity
   - [ ] Session timeout warning 5 minutes before expiry
   - [ ] Ability to extend session with user action
   - [ ] Logout functionality (clears tokens, redirects to login)
   - [ ] Force logout if token is revoked (backend)

6. **Role-Based Access:**
   - [ ] User role stored in AuthStore (Coach, Admin, Balagruh In-Charge)
   - [ ] Dashboard shows role-appropriate quick actions
   - [ ] Navigation tabs filtered by role permissions
   - [ ] API requests include role in token claims

7. **Error Handling:**
   - [ ] Invalid credentials: "Incorrect username or password. Please try again."
   - [ ] Network error: "Unable to connect. Please check your internet connection."
   - [ ] Server error: "Something went wrong. Please try again later."
   - [ ] Account locked: "Your account is temporarily locked. Contact admin."
   - [ ] Biometric failure: Fallback to password entry

**Technical Implementation Details:**

**Authentication Store (Zustand):**
```typescript
// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  biometricEnabled: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokenFn: () => Promise<void>;
  enableBiometric: () => Promise<void>;
  disableBiometric: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      biometricEnabled: false,

      login: async (username: string, password: string) => {
        const response = await authApi.login(username, password);
        const { token, refreshToken, user } = response.data;

        // Store tokens securely
        await secureStorage.setToken(token);
        await secureStorage.setRefreshToken(refreshToken);

        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        const { token } = get();
        await authApi.logout(token);
        await secureStorage.clearTokens();

        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          biometricEnabled: false,
        });
      },

      refreshTokenFn: async () => {
        const { refreshToken } = get();
        if (!refreshToken) throw new Error('No refresh token');

        const response = await authApi.refreshToken(refreshToken);
        const { token: newToken } = response.data;

        await secureStorage.setToken(newToken);
        set({ token: newToken });
      },

      enableBiometric: async () => {
        const biometricType = await biometricAuth.getSupportedType();
        if (biometricType) {
          set({ biometricEnabled: true });
        }
      },

      disableBiometric: () => {
        set({ biometricEnabled: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: AsyncStorage,
      partialize: (state) => ({
        user: state.user,
        biometricEnabled: state.biometricEnabled,
      }),
    }
  )
);
```

**User Type:**
```typescript
// src/types/user.ts
export interface User {
  _id: string;
  username: string;
  role: 'Coach' | 'Admin' | 'Balagruh In-Charge';
  balagruhId?: string;
  balagruhName?: string;
  permissions: string[];
  profilePicture?: string;
  email?: string;
  phone?: string;
}
```

**Secure Storage Service:**
```typescript
// src/services/storage/secureStorage.ts
import * as Keychain from 'react-native-keychain';

const TOKEN_KEY = 'isf_auth_token';
const REFRESH_TOKEN_KEY = 'isf_refresh_token';

export const secureStorage = {
  async setToken(token: string): Promise<void> {
    await Keychain.setGenericPassword(TOKEN_KEY, token, {
      service: 'com.isfplayground.auth',
    });
  },

  async getToken(): Promise<string | null> {
    const credentials = await Keychain.getGenericPassword({
      service: 'com.isfplayground.auth',
    });
    return credentials ? credentials.password : null;
  },

  async setRefreshToken(token: string): Promise<void> {
    await Keychain.setGenericPassword(REFRESH_TOKEN_KEY, token, {
      service: 'com.isfplayground.refresh',
    });
  },

  async getRefreshToken(): Promise<string | null> {
    const credentials = await Keychain.getGenericPassword({
      service: 'com.isfplayground.refresh',
    });
    return credentials ? credentials.password : null;
  },

  async clearTokens(): Promise<void> {
    await Keychain.resetGenericPassword({ service: 'com.isfplayground.auth' });
    await Keychain.resetGenericPassword({ service: 'com.isfplayground.refresh' });
  },
};
```

**Biometric Authentication Service:**
```typescript
// src/services/auth/biometricAuth.ts
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export const biometricAuth = {
  async getSupportedType(): Promise<BiometryTypes | null> {
    const { biometryType } = await rnBiometrics.isSensorAvailable();
    return biometryType;
  },

  async authenticate(): Promise<boolean> {
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: 'Authenticate to access ISF Playground',
      cancelButtonText: 'Use Password',
    });
    return success;
  },

  async isAvailable(): Promise<boolean> {
    const { available } = await rnBiometrics.isSensorAvailable();
    return available;
  },
};
```

**Frontend Components:**

**LoginScreen.tsx:**
```typescript
// src/screens/auth/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { biometricAuth } from '../../services/auth/biometricAuth';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';

const LoginScreen: React.FC = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, biometricEnabled } = useAuthStore();

  useEffect(() => {
    // Attempt biometric login if enabled
    if (biometricEnabled) {
      attemptBiometricLogin();
    }
  }, []);

  const attemptBiometricLogin = async () => {
    const isAvailable = await biometricAuth.isAvailable();
    if (!isAvailable) return;

    const success = await biometricAuth.authenticate();
    if (success) {
      // Biometric success, proceed with auto-login
      // (assumes token is still valid)
      navigation.replace('Main');
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      navigation.replace('Main');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Incorrect username or password. Please try again.');
      } else if (err.message === 'Network Error') {
        setError('Unable to connect. Please check your internet connection.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ISF Playground</Text>
      <Text style={styles.subtitle}>Mobile App</Text>

      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        title="Log In"
        onPress={handleLogin}
        loading={loading}
        disabled={!username || !password || loading}
      />

      <Text style={styles.forgotPassword}>
        Forgot password? Please use the desktop app to reset.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E40AF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  error: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default LoginScreen;
```

**API Endpoints:**

```yaml
POST /api/auth/login
  Description: Authenticate user and return JWT tokens
  Request:
    Content-Type: application/json
    Body:
      username: string (required)
      password: string (required)
  Response:
    200 OK:
      token: string (JWT access token, expires in 24h)
      refreshToken: string (expires in 30 days)
      user: {
        _id: string
        username: string
        role: "Coach" | "Admin" | "Balagruh In-Charge"
        balagruhId: string (optional)
        balagruhName: string (optional)
        permissions: string[]
        profilePicture: string (optional)
      }
    401 Unauthorized:
      message: "Invalid credentials"
    500 Internal Server Error:
      message: "Server error"

POST /api/auth/refresh
  Description: Refresh access token using refresh token
  Request:
    Content-Type: application/json
    Body:
      refreshToken: string (required)
  Response:
    200 OK:
      token: string (new JWT access token)
    401 Unauthorized:
      message: "Invalid or expired refresh token"

POST /api/auth/logout
  Description: Invalidate refresh token and log out user
  Request:
    Content-Type: application/json
    Headers:
      Authorization: Bearer <token>
  Response:
    200 OK:
      success: boolean
      message: "Logged out successfully"
```

**Data Models:**

**User Schema (existing, no changes required):**
```javascript
// backend/models/User.js
const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // bcrypt hashed
  role: {
    type: String,
    enum: ['Student', 'Coach', 'Admin', 'Balagruh In-Charge'],
    required: true,
  },
  balagruhId: { type: mongoose.Schema.Types.ObjectId, ref: 'Balagruh' },
  permissions: [String],
  profilePicture: String,
  email: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
```

**RefreshToken Schema (new):**
```javascript
// backend/models/RefreshToken.js
const RefreshTokenSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  token: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  isRevoked: { type: Boolean, default: false },
  deviceInfo: {
    platform: String, // 'ios' or 'android'
    deviceId: String,
    appVersion: String,
  },
});

RefreshTokenSchema.index({ userId: 1 });
RefreshTokenSchema.index({ token: 1 });
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

**UI/UX Wireframe Description:**

**Login Screen:**
```
┌──────────────────────────────────┐
│                                  │
│      ISF Playground              │
│      Mobile App                  │
│                                  │
│  ┌────────────────────────────┐ │
│  │ Username                   │ │
│  │ [text input]               │ │
│  └────────────────────────────┘ │
│                                  │
│  ┌────────────────────────────┐ │
│  │ Password                   │ │
│  │ [••••••••]           [👁]  │ │
│  └────────────────────────────┘ │
│                                  │
│     [      Log In Button      ]  │
│                                  │
│   Forgot password? Use desktop   │
│                                  │
└──────────────────────────────────┘
```

**Biometric Prompt (after first login):**
```
┌──────────────────────────────────┐
│                                  │
│   Enable Face ID / Fingerprint?  │
│                                  │
│   Log in faster next time using  │
│   your biometric authentication. │
│                                  │
│   [  Enable  ]   [  Skip  ]      │
│                                  │
└──────────────────────────────────┘
```

**Testing Checklist:**
- [ ] Successful login with valid credentials
- [ ] Error message for invalid credentials
- [ ] Error message for network failure
- [ ] Token stored securely in Keychain/Keystore
- [ ] Auto-login works on app relaunch
- [ ] Biometric authentication works (iOS and Android)
- [ ] Biometric fallback to password works
- [ ] Token refresh works automatically
- [ ] Logout clears all tokens and user data
- [ ] Role-based navigation (different quick actions per role)

#### Story S3-F01-STORY-03: Mobile Main Navigation & Dashboard

**User Story:**
> As a **Mobile App User**, I want to navigate between different sections easily, so that I can access all mobile features efficiently.

**Acceptance Criteria:**
1. [ ] Bottom tab navigation for primary sections (Dashboard, Attendance, Media, Messages, Profile)
2. [ ] Dashboard screen showing role-specific quick actions
3. [ ] Navigation drawer for settings and additional options
4. [ ] Profile section with user details and preferences
5. [ ] Badge indicators for unread notifications and alerts
6. [ ] Deep linking support (open specific screen from notification)
7. [ ] Smooth transitions between screens (< 300ms)

**Technical Specifications:**
*Full implementation details available in `.ai/ORCH/04-sprint3-4-feature-breakdown.md` (lines 162-260)*

**API Endpoint:**
```yaml
GET /api/mobile/dashboard/:userId
  Response:
    quickActions: QuickAction[]
    recentActivity: Activity[]
    stats: { pendingTasks: number, unreadMessages: number, sosAlerts: number }
```

---

### 8.2. [S3] Attendance Tracking System

*Stories S3-F02-STORY-01 and S3-F02-STORY-02 fully documented in feature breakdown (lines 268-511)*

**Key Features:**
- Photo upload for attendance with FR processing
- Attendance results viewing and verification
- Manual override capabilities
- Historical attendance tracking

---

### 8.3. [S3] Mobile Media Management

*Story S3-F03-STORY-01 fully documented in feature breakdown (lines 515-664)*

**Key Features:**
- Multi-file upload support (videos, documents, images)
- AWS S3 integration with presigned URLs
- Progress tracking and batch upload
- Content publishing workflow

---

### 8.4. [S3] Mobile Analytics & Reporting

*Story S3-F04-STORY-01 fully documented in feature breakdown (lines 667-779)*

**Key Features:**
- Performance dashboard with key metrics
- Visual charts (attendance, completion, coins)
- Date range filtering and drill-down
- Export capabilities (PDF/CSV)

---

### 8.5. [S3] Mobile Notifications

*Story S3-F05-STORY-01 fully documented in feature breakdown (lines 782-995)*

**Key Features:**
- Firebase Cloud Messaging integration
- Background/foreground notification handling
- Deep linking to relevant screens
- Notification preferences and quiet hours

---

### 8.6. [S4] SOS Emergency System

*Stories S4-F01-STORY-01, S4-F01-STORY-02, S4-F01-STORY-03 fully documented in feature breakdown (lines 1000-1383)*

**Key Features:**
- Desktop SOS trigger button (prominent placement)
- Mobile alert reception with high-priority notifications
- Multi-tier escalation workflow (Tier 1: Coaches, Tier 2: Admins, Tier 3: Broadcast)
- Real-time status tracking and response coordination
- Compliance audit logging

---

### 8.7. [S4] Internal Messaging Module

*Stories S4-F02-STORY-01, S4-F02-STORY-02 fully documented in feature breakdown (lines 1386-1691)*

**Key Features:**
- 1-on-1 direct messaging
- Group conversations
- Text, image, and file attachments
- Read receipts and typing indicators
- Real-time delivery via WebSocket

---

### 8.8. [S4] WhatsApp Integration

*Story S4-F03-STORY-01 fully documented in feature breakdown (lines 1693-1818)*

**Key Features:**
- WhatsApp Business API integration
- Template message support
- SOS alert notifications
- Delivery status tracking
- Opt-in/opt-out management

---

### 8.9. [S4] Student Health Tracking

*Stories S4-F04-STORY-01, S4-F04-STORY-02 fully documented in feature breakdown (lines 1820-2058)*

**Key Features:**
- Health metrics entry (weight, height, temperature, BP)
- Health document uploads
- Abnormal value alerts
- SOS incident correlation
- Trend analysis and growth charts

---

**NOTE:** Complete technical specifications, API endpoints, data models, code examples, and wireframes for all stories are available in:
- `.ai/ORCH/04-sprint3-4-feature-breakdown.md` (1,600+ lines of detailed specs)
- RBAC and FR prerequisites fully documented in Sections 8.0.1 and 8.0.2 above

---

## 9. Non-Functional Requirements

### 9.1. Performance

**Mobile App:**
- Cold start time: < 3 seconds
- Screen transitions: < 300ms
- API response time: < 500ms (p95)
- Image loading: Progressive (placeholder → full image)
- Bundle size: < 25MB (optimized with code splitting)

**Backend APIs:**
- Mobile endpoints: < 500ms (p95)
- SOS alert processing: < 2 seconds end-to-end
- Facial recognition: < 10 seconds for 30-student photo
- WebSocket latency: < 100ms (p95)
- Database queries: < 100ms (p95)

**RBAC (New System):**
- Permission check: < 50ms
- Query filters: No degradation (< 100ms p95)

**Facial Recognition (New System):**
- Face registration: < 5 seconds total
- Face recognition: < 3 seconds total
- Cache hit rate: > 95%

### 9.2. Scalability

**Current Scale:**
- Users: 500 (100 staff, 400 students)
- Concurrent mobile users: 50

**Target Scale (6 months):**
- Users: 2,000 (400 staff, 1,600 students)
- Concurrent mobile users: 200

### 9.3. Security

**Authentication:**
- JWT tokens: 24-hour expiration
- Biometric: Device-specific, fallback to password
- Session timeout: 24 hours inactivity

**Data Protection:**
- HTTPS/TLS 1.3: All API communication
- At-rest encryption: Sensitive data
- Keychain/Keystore: Mobile token storage

**RBAC Security:**
- No development bypasses in production
- Audit logging for permission denials
- Row-level security (Balagruh scoping)

**FR Security:**
- Liveness detection prevents spoofing
- Embeddings encrypted at rest
- No face data in logs

### 9.4. Reliability

**Uptime Target:** 99.5%

**Disaster Recovery:**
- Database backups: Daily full, hourly incremental
- S3 versioning: 30-day retention
- MTTR: < 1 hour

**SOS Reliability:**
- P0 priority: Must succeed even if other systems fail
- Multiple channels: Push, SMS, WhatsApp
- Escalation failsafe

### 9.5. Accessibility

**WCAG 2.1 Level AA:**
- Color contrast: 4.5:1 minimum
- Touch targets: 44x44px minimum
- Screen readers: VoiceOver, TalkBack support
- Dynamic type: Font scaling

### 9.6. Maintainability

**Code Quality:**
- TypeScript: Strict mode
- Test coverage: > 80% unit, > 90% E2E critical paths
- Code reviews: Required for all PRs

**Monitoring:**
- Error tracking: Sentry
- Performance: New Relic APM
- Logging: Winston with ELK stack

---

## 10. Development Timeline & Milestones

### 10.1. Prerequisite Development (Parallel - Weeks -2 to 0)

**Option C (RECOMMENDED): Parallel Execution**
- Developer 1: RBAC Rebuild (8-10 days)
- Developer 2: FR Rebuild (12-15 days)
- **Total:** 12-15 days (10 days saved vs sequential)

### 10.2. Sprint 3+4 Timeline (4 Weeks)

**Week 1: Mobile Foundation**
- Day 1-2: Project setup, authentication
- Day 3-4: Biometric auth, navigation
- Day 5: Dashboard, quick actions
- **Milestone:** Mobile app foundation complete

**Week 2: Sprint 3 Core + Notifications**
- Day 6-7: Attendance photo upload
- Day 8: Attendance results
- Day 9: Media upload
- Day 10: Push notifications
- **Milestone:** Attendance working, notifications enabled

**Week 3: Sprint 4 SOS + Messaging**
- Day 11-12: Desktop SOS trigger
- Day 13: Mobile SOS receiver
- Day 14: Escalation workflow
- Day 15: Direct messaging
- **Milestone:** SOS operational, messaging working

**Week 4: Completion + Integration**
- Day 16: Group messaging
- Day 17: Analytics dashboard
- Day 18-19: Health tracking
- Day 20: WhatsApp integration
- Day 21-22: Integration testing
- Day 23-24: Bug fixes
- Day 25-26: UAT
- Day 27-28: Production deployment
- **Milestone:** Full delivery

---

## 11. Testing Strategy

### 11.1. Unit Testing
- Coverage: > 80%
- Tools: Jest, React Native Testing Library

### 11.2. Integration Testing
- All API endpoints with different roles
- Database integrity checks
- Tools: Supertest

### 11.3. End-to-End Testing

**Critical Flows:**
1. Attendance: In-Charge logs in → Takes photo → FR processes → Submits (< 60s)
2. SOS: Student triggers → Coach receives < 5s → Responds → Resolves
3. Messaging: Send → Receive push → Read → Reply (< 2s delivery)
4. RBAC: Coach A denied Balagruh B access

**Tools:** Playwright, Detox

### 11.4. Performance Testing
- Load: 100 concurrent users
- Stress: 200% normal load
- Tools: k6, Artillery

### 11.5. Security Testing
- Penetration testing
- FR spoofing attempts
- RBAC escalation attempts
- Tools: OWASP ZAP

### 11.6. UAT
- 2 Balagruh In-Charges
- 3 Coaches
- 1 Admin
- 5 Students

---

## 12. Resource Requirements

### 12.1. Team
- 2 Full-stack Developers
- 1 QA Engineer
- 1 DevOps Engineer (part-time)
- 1 UI/UX Designer (part-time)

### 12.2. Infrastructure
- AWS: ~$140/month
- Third-party services: ~$80/month
- Development tools: ~$70/month
- **Total:** ~$290/month

### 12.3. Devices
- iPhone 12: $600 (one-time)
- Samsung Galaxy A52: $350 (one-time)

---

## 13. Risk Assessment & Mitigation

**RISK 1: RBAC Migration Breaks Permissions**
- Mitigation: Comprehensive testing, rollback plan ready
- Contingency: Rollback to old system

**RISK 2: FR Accuracy Below 95%**
- Mitigation: Tune threshold, quality checks, manual override
- Contingency: Manual attendance as fallback

**RISK 3: SOS Alerts Not Delivered**
- Mitigation: Multiple channels (Push, SMS, WhatsApp)
- Contingency: Emergency phone tree

**RISK 4: Mobile Performance Degradation**
- Mitigation: Performance testing, code splitting, caching
- Contingency: Optimize critical path

**RISK 5: WebSocket Instability**
- Mitigation: Auto-reconnect, fallback to polling
- Contingency: Switch to polling mode

---

## 14. Questions for Client Clarification

*[24 questions documented in `.ai/ORCH/05-user-feedback-and-decisions.md`, most already answered]*

**Remaining Open Questions:**
1. Health data compliance requirements?
2. Health vitals frequency? (ANSWERED: Monthly routine, as-needed incidents)
3. WhatsApp template messages - create new or existing?
4. Group chat max participants? (Recommendation: 50)

---

## 15. Success Criteria & Acceptance

### 15.1. Functional Acceptance

**RBAC:**
- ✅ All roles have correct permissions
- ✅ Balagruh scoping works (Coach A ≠ Balagruh B)
- ✅ Zero permission escalation vulnerabilities

**FR:**
- ✅ Registration accuracy ≥ 95%
- ✅ Recognition accuracy ≥ 95%
- ✅ Liveness detection prevents spoofing

**Mobile App:**
- ✅ Biometric authentication working
- ✅ All role-based features accessible
- ✅ Installs on iOS 15.1+ and Android 8.0+

**SOS:**
- ✅ Alert delivery < 5 seconds
- ✅ Escalation triggers correctly
- ✅ Full audit trail

**Messaging:**
- ✅ Delivery < 2 seconds
- ✅ Read receipts working
- ✅ File attachments functional

**Health:**
- ✅ Abnormal value alerts generated
- ✅ Trends display correctly

### 15.2. Performance Acceptance
- ✅ Mobile app cold start < 3s
- ✅ API response < 500ms p95
- ✅ SOS alert < 5s end-to-end
- ✅ FR recognition < 100ms p95

### 15.3. Security Acceptance
- ✅ Penetration testing passed
- ✅ RBAC escalation blocked
- ✅ FR spoofing failed
- ✅ Tokens properly secured

### 15.4. Quality Acceptance
- ✅ QA score ≥ 95/100
- ✅ Zero P0/P1 bugs
- ✅ < 5 P2 bugs
- ✅ Test coverage > 80%

### 15.5. User Acceptance
- ✅ UAT passed with all roles
- ✅ User satisfaction > 8/10
- ✅ No usability complaints

### 15.6. Deployment Acceptance
- ✅ Zero downtime deployment
- ✅ Rollback plan tested
- ✅ 24-hour monitoring completed

---

## 16. Appendices

### 16.1. Appendix A: Architecture Diagrams

*Diagrams documented in feature breakdown lines 2205-2234*

### 16.2. Appendix B: Database Schemas

**Key Schemas:**
1. User (updated with balagruhIds, facialData.embedding)
2. RolePermission (new)
3. AttendanceUpload (new)
4. SOSAlert (new)
5. Message, Conversation (new)
6. HealthRecord (new)
7. Notification (new)

*Full schemas in feature breakdown*

### 16.3. Appendix C: API Documentation

**API Base URL:**
- Development: `http://localhost:5000/api`
- Production: `https://api.isfplayground.org/api`

**Authentication:** Bearer token required

**Rate Limiting:**
- General: 100 req/min
- SOS: 5 req/min
- Messaging: 30 req/min

*Full API documentation in feature breakdown*

### 16.4. Appendix D: Deployment Checklist

**Pre-Deployment:**
- [ ] All tests passing
- [ ] Code review approved
- [ ] QA sign-off
- [ ] Migration scripts tested
- [ ] Backup created

**Deployment:**
- [ ] Backend to staging → production
- [ ] Mobile to TestFlight/Firebase → stores
- [ ] Monitor for 24 hours

**Post-Deployment:**
- [ ] Verify critical flows
- [ ] Check error rates
- [ ] User feedback

### 16.5. Appendix E: Glossary

- **Balagruh:** Orphanage facility
- **Coach:** Subject instructor
- **FR:** Facial Recognition
- **RBAC:** Role-Based Access Control
- **FCM:** Firebase Cloud Messaging
- **SOS:** Emergency alert system
- **p95:** 95th percentile

---

## 17. Sign-off Section

### 17.1. Approval Matrix

| **Role** | **Name** | **Signature** | **Date** |
|----------|----------|---------------|----------|
| Product Owner | _____________ | _____________ | __________ |
| Technical Lead | _____________ | _____________ | __________ |
| QA Lead | _____________ | _____________ | __________ |
| Project Manager | _____________ | _____________ | __________ |
| Client (ISF) | _____________ | _____________ | __________ |

### 17.2. Change Control

| **Version** | **Date** | **Changes** |
|-------------|----------|-------------|
| 1.0 COMPLETE | 2025-10-17 | Full MPSD with all sections complete |

---

## 18. Post-Implementation Considerations

### 18.1. Sprint 6 Roadmap
- Video-based liveness detection
- Automated phone calls for critical SOS
- Multi-language support (Hindi, Marathi)
- Advanced analytics with ML

### 18.2. Maintenance
- Weekly bug triage
- Monthly feature updates
- Quarterly security audits

**SLA:**
- P0 (SOS down): < 15 min response, < 2 hour resolution
- P1 (Login broken): < 1 hour response, < 4 hour resolution
- P2 (Feature bug): < 4 hour response, < 24 hour resolution

### 18.3. Knowledge Transfer
- Technical architecture document
- API documentation (Swagger)
- User manuals (Admin, Coach, In-Charge)
- Training videos
- Developer onboarding guide

### 18.4. Monitoring

**KPIs:**
- DAU: 80% of staff
- SOS response: < 3 min average
- Attendance accuracy: > 95%
- Message delivery: > 98%
- App crash rate: < 0.1%

---

## 🎯 MPSD Summary

**Prerequisites (Parallel):**
- ✅ RBAC Rebuild: 8-10 days
- ✅ Facial Recognition Rebuild: 12-15 days

**Sprint 3+4 Delivery (4 Weeks):**
- ✅ Mobile App (iOS/Android)
- ✅ Attendance Tracking (FR-based)
- ✅ Mobile Media Management
- ✅ Push Notifications
- ✅ SOS Emergency System
- ✅ Internal Messaging
- ✅ WhatsApp Integration
- ✅ Health Tracking

**Success Criteria:**
- Complete in 28 days
- Quality ≥ 95/100
- SOS alert < 5s
- FR accuracy ≥ 95%
- Zero P0/P1 bugs

**Total Timeline:** ~6 weeks (prerequisites + sprint)

---

**Document Status:** ✅ COMPLETE
**Last Updated:** October 17, 2025

**Comprehensive Technical Specifications Available In:**
- `.ai/ORCH/04-sprint3-4-feature-breakdown.md` (1,600+ lines)
- `.ai/ORCH/05-user-feedback-and-decisions.md` (User confirmations)
- `.ai/ORCH/06-rbac-and-fr-analysis-report.md` (500+ lines analysis)

---

*END OF SPRINT 3+4 COMBINED MPSD*

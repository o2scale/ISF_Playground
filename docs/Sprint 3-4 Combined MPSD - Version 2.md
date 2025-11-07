# **Master Project Specification Document (MPSD)**

**Project:** ISF Playground - Combined Sprint 3 & Sprint 4
**Version:** 2.1 (Technical Specification)
**Last Updated:** 2025-11-04 17:48:38 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Sprint Duration:** 28 Days (4 Weeks)
**Document Type:** Technical Specification for Development Team

---

## **1. MPSD Introduction & Combined Sprint Overview**

### **1.1. Purpose of This Master Project Specification Document**

This Master Project Specification Document (MPSD) serves as the exhaustive, unambiguous, and universally agreed-upon blueprint for the combined execution of ISF Playground Sprint 3 and Sprint 4. It is the single source of truth, meticulously detailing every facet of the features planned for this combined 28-day development effort. Its primary purpose is to ensure complete alignment among all stakeholders—including the Client, Project Manager, Design Team, and Development Team—before the sprint development work commences. This MPSD will be the definitive reference for scope management, enabling the Project Manager to clearly delineate agreed-upon features from out-of-scope requests, thereby ensuring focused and efficient development across both sprint deliverables.

### **1.2. Project Overview: ISF Playground - Combined Sprint 3 & 4**

This combined sprint represents a strategic consolidation of the ISF Playground development roadmap, executing Sprint 3 and Sprint 4 features together over a 28-day period. Sprint 3 focuses on mobile application development for Coaches, Admins, and Balagruh In-Charges, enabling attendance tracking and media management on the go. Sprint 4 completes the safety and communication ecosystem with emergency SOS functionality and internal messaging capabilities. This combined execution approach leverages improved development processes and system architecture, allowing parallel development of desktop emergency features and mobile applications while maintaining system cohesion. The entire system continues to be built on the Electron.js desktop application foundation with a Node.js backend and MongoDB database, now extending to React Native mobile platforms.

### **1.3. Combined Sprint Goals & Objectives**

The primary goals for this unified 28-day sprint are:

**Sprint 3 Core Objectives:**
1. **Launch Mobile Application:** Develop React Native application for iOS and Android platforms, enabling staff to access key features on mobile devices.
2. **Enable Mobile Attendance:** Implement facial recognition-based attendance system accessible from mobile devices, streamlining daily attendance marking.
3. **Provide Mobile Media Management:** Allow Coaches to upload course content (videos, documents) directly from mobile devices.
4. **Deliver Mobile Analytics:** Provide performance dashboards and reporting capabilities accessible on mobile platforms.
5. **Establish Push Notifications:** Implement Firebase Cloud Messaging for real-time alerts and updates.

**Sprint 4 Core Objectives:**
1. **Implement SOS Emergency System:** Create desktop-based emergency alert system for students with mobile alert reception for staff.
2. **Build Multi-Tier Escalation:** Develop intelligent escalation workflow ensuring emergency responses within defined timeframes.
3. **Enable Internal Messaging:** Implement WhatsApp-like messaging system for staff coordination and communication.
4. **Integrate WhatsApp Notifications:** Extend communication capabilities with WhatsApp Business API for external notifications.
5. **Track Student Health:** Create health monitoring system with trend analysis and SOS correlation.

### **1.4. Development Strategy**

To achieve the 28-day timeline, the development will be organized sequentially with early integration:

**Sequential with Early Integration (Recommended):**

**Weeks 1-2: Mobile Foundation (Sprint 3 Core)**
- Week 1: Core mobile app, authentication, navigation
- Week 2: Attendance tracking, media upload, reporting

**Weeks 2.5: Integration Testing Checkpoint**
- End-to-end mobile authentication
- Notification delivery verification
- WebSocket connection stability

**Week 3: Sprint 3 Features + Sprint 4 Foundation**
- Sprint 3: Mobile notifications, analytics dashboard
- Sprint 4: Desktop SOS trigger, mobile alert routing

**Week 4: Sprint 4 Features + Integration**
- Internal messaging module
- Health tracking system
- WhatsApp integration
- Full system integration testing
- Production readiness verification

**Cross-Sprint Dependencies:**
- Shared push notification infrastructure (FCM)
- Unified WebSocket real-time layer
- Common AWS S3 media storage
- Integrated authentication system

---

## **2. Target Users/Personas for Combined Sprint Features**

### **Primary Personas:**

* **Coach Rajesh (Age 32, Sports Coach):** The primary mobile user who will use the mobile app to upload training videos from his phone, check student attendance remotely, view performance reports during his commute, and respond to emergency SOS alerts immediately. Rajesh experiences the complete mobile-first workflow enabled by Sprint 3 and receives critical emergency notifications through Sprint 4.

* **Admin Priya (Age 28, System Administrator):** The system orchestrator with expanded mobile capabilities. Manages the platform from both desktop and mobile, accessing comprehensive dashboards on her iPhone, viewing attendance rates across multiple Balagruhs, and serving as Tier 2 escalation contact for SOS alerts. She coordinates emergency response through the messaging system.

* **Balagruh In-Charge Sunita (Age 45, Facility Manager):** The daily operations manager who will use her budget Android phone to mark attendance with photos, track student health records, receive attendance alerts, and enter routine health checkups. When students' vitals are abnormal, she receives immediate alerts and can link health incidents to SOS alerts.

### **Additional Mobile Staff Personas:**

* **Medical In-charge Dr. Kavita (Age 38):** Healthcare professional using mobile app for daily health check-ins, recording student vitals, uploading medical documents, and receiving critical temperature alerts. Monitors health trends across all Balagruhas and responds to medical emergencies via SOS system integration.

* **Sports Coach Arun (Age 29) & Music Coach Meera (Age 31):** Specialized instructors using mobile app for session management, performance tracking, attendance marking, and task assignments. Receive mobile notifications for scheduled sessions and student progress updates.

* **Amma (Senior Leadership):** High-level oversight role using mobile app for critical escalations, high-value purchase approvals, and monitoring system-wide metrics. Receives only URGENT/HIGH priority alerts for serious incidents.

* **Playground Manager Kumar (Age 35):** Technical staff member using mobile app for bug reporting, system error logging, and issue management. Documents technical problems and tracks resolution status.

* **Purchase Manager Ramesh (Age 42):** **Desktop/web-only user** (no mobile app). Accesses Admin portal via web browser to create multi-product purchase requests, monitor inventory levels, update stock after deliveries, and track supplier orders. Uses desktop for optimal workflow with file attachments and spreadsheets.

### **Secondary Personas:**

* **Student Arjun (Age 16):** The desktop app user who accesses the prominent SOS button when feeling unwell, browses ISF Shop to spend earned coins, and checks in emotions via 5-emoji interface. Desktop-only access (no mobile app for students). Arjun's health data and emotions are correlated with SOS incidents for pattern analysis.

* **Parent/Guardian:** External user receiving WhatsApp notifications for daily attendance summaries and immediate alerts if their child triggers an SOS emergency.

**User Role Summary:**
- **10 Total Roles**: Students (desktop only) + 8 staff with mobile app + Purchase Manager (desktop/web only)
- **8 Roles with Mobile App**: Coach, Admin, Balagruha In-charge, Amma, Medical In-charge, Sports Coach, Music Coach, Playground Manager
- **Desktop/Web Only**: Students, Purchase Manager

---

## **3. High-Level Combined Sprint Scope**

### **3.1. What's In Scope for the 28-Day Combined Sprint**

#### **Sprint 3 - Mobile App Development Features:**

**Mobile Application Foundation:**
* React Native mobile app for iOS (15.1+) and Android (8.0+)
* JWT token-based authentication with biometric support (Face ID, Touch ID, Fingerprint)
* Role-based navigation and dashboards
* Real-time data sync (requires active internet connection)
* **Distribution:** Direct APK installation for Android, internal iOS builds (NOT App Store/Play Store published)
* Note: Offline-first architecture with SQLite planned for future enhancement (not in Sprint 3-4 scope)

**Mobile Attendance Tracking:**
* Camera/gallery integration for photo capture
* Photo upload to AWS S3 with automatic compression (5MB → ~2MB)
* Integration with facial recognition backend (existing system, ongoing refinements)
* Real-time attendance processing and results display
* Manual override and verification interface
* Attendance history and reporting
* Basic offline photo queuing (limited implementation, full offline-first planned for future)

**Mobile Media Management:**
* Multi-file upload (videos up to 500MB, documents up to 50MB, images up to 25MB)
* Course/module association workflow
* Batch upload with progress tracking
* Content publishing workflow
* Preview and metadata editing
* S3 presigned URL generation for secure uploads

**Mobile Analytics & Reporting:**
* Performance dashboard with key metrics (attendance rates, course completion, coin distribution)
* Date range filtering and drill-down capabilities
* Visual charts using React Native Chart libraries
* Top performers lists and leaderboards
* Export capabilities (PDF/CSV generation)
* Real-time data synchronization

**Push Notification Infrastructure:**
* Firebase Cloud Messaging (FCM) integration
* Device token registration and management
* Background and foreground notification handling
* Deep linking to relevant screens (course, attendance, SOS)
* Notification preferences and quiet hours
* Notification history screen with mark-as-read

#### **Sprint 4 - Emergency & Communication Features:**

**SOS Emergency System (Desktop → Mobile):**
* Desktop SOS trigger button with prominent placement on student interface
* Emergency category selection (Medical, Safety, Mental Health, Other)
* Mobile alert reception with high-priority push notifications
* Real-time status tracking (sent → acknowledged → responding → resolved)
* Multi-tier escalation workflow:
  * Tier 1: Balagruh Coaches + In-Charge (0-2 minutes)
  * Tier 2: Admins + SMS/WhatsApp (2-5 minutes)
  * Tier 3: Broadcast to all staff (5+ minutes)
* Response coordination dashboard showing who's responding
* Compliance and audit logging for all SOS events

**Internal Messaging Module:**
* 1-on-1 direct messaging between staff members
* Group conversations for teams and Balagruhs
* Text, image, and file attachments (25MB images, 100MB videos, 25MB documents)
* Read receipts and typing indicators
* Message search and conversation history
* Real-time delivery via WebSocket with offline queuing
* Unread count badges and notification integration

**WhatsApp Business API Integration:**
* Template message support for standardized communications
* SOS alert notifications to guardians
* Daily attendance summaries for parents
* Opt-in/opt-out management for recipients
* Delivery status tracking and retry logic
* Rate limiting compliance (per WhatsApp Business API terms)

**Student Health Tracking:**
* Health metrics entry interface (weight, height, temperature, blood pressure, heart rate)
* Symptom checklist (fever, cough, headache, fatigue, etc.)
* Health document uploads (medical reports, prescriptions)
* Trend analysis and growth charts visualization
* Abnormal value alerts:
  * Temperature > 37.5°C warning, > 39°C critical
  * Weight change > 5% warning
* SOS incident correlation for pattern detection
* Health report exports for medical professionals

#### **Shared Infrastructure (Cross-Sprint):**

**WebSocket Real-Time Layer:**
* Socket.io server implementation with JWT authentication
* Room-based messaging (user rooms, balagruh rooms, conversation rooms)
* Presence tracking (online/offline status)
* Message queuing for offline users
* Automatic reconnection handling with exponential backoff

**AWS S3 Media Storage:**
* Presigned URL generation for secure direct uploads
* Folder organization (attendance-photos/, course-content/, health-documents/)
* Image optimization pipeline (automatic compression, thumbnail generation)
* CDN integration with CloudFront for faster delivery
* Backup and versioning policies (30-day retention)

### **3.2. What's Out of Scope for the Combined Sprint**

**Sprint 3 Exclusions:**
* Student mobile application (Students continue using desktop app only)
* Parent/Guardian mobile application (Parents use WhatsApp only)
* Video conferencing or live streaming features
* Advanced analytics with machine learning predictions
* Integration with external Learning Management Systems
* Multi-language support for mobile UI (English only, content translation exists)

**Sprint 4 Exclusions:**
* Direct emergency services integration (911/108 calling)
* Telemedicine or doctor video consultation features
* Prescription management or pharmacy integration
* Integration with wearable health devices (Fitbit, Apple Watch)
* Automated medical diagnosis or AI-powered health recommendations
* Voice/video calling within messaging (text and files only)
* Broadcast channels for announcements (separate from Mann ki Baat)

**Deferred to Future Sprints:**
* Mobile app for Students (Future sprint consideration)
* Advanced health analytics with ML
* Calendar and event management system
* Task assignment and tracking beyond SOS follow-up
* Performance review and appraisal system
* Advanced reporting with predictive analytics

---

## **4. Target Audience for this MPSD**

* **Primary:** Project Manager (for sprint coordination, resource allocation, client communication, and integrated scope management)

* **Secondary:**
  * **Development Team (Frontend & Backend):** For precise implementation details across both mobile and emergency features
  * **QA Team:** For comprehensive test planning covering desktop-to-mobile integration scenarios
  * **Design Team:** For ensuring UI/UX consistency across mobile and desktop experiences
  * **Client (ISF):** For final approval and understanding of the 28-day delivery timeline

---

## **5. Document Conventions**

* **UI Elements:** Referred to by their visible label text in "quotation marks" or by descriptive name with suggested IDs (e.g., btn-mark-attendance, btn-trigger-sos)
* **User Roles:** Capitalized consistently (Student, Coach, Admin, Balagruh In-Charge, Amma)
* **Placeholders:** Dynamic data shown in [square_brackets] (e.g., [StudentName], [SOSCategory], [CoinBalance])
* **API Endpoints:** Represented as METHOD /path/to/endpoint with versioning where applicable
* **Sprint Attribution:** Features are tagged with [S3] for Sprint 3, [S4] for Sprint 4, or [SHARED] when impacting both sprints
* **Priority Levels:** P0 (Critical - Must have), P1 (High Priority), P2 (Medium Priority), P3 (Low Priority)

---

## **6. References to Source Documents**

This combined MPSD synthesizes and integrates information from:

* Playground Platform - 5 Sprint Plan (16 February 2025)
* ISF Sprint 3 - Overview and Scope
* ISF Sprint 4 - Overview and Scope
* Sprint 2+5 Combined MPSD v3.0 (structure template)
* Client-provided mobile UI mockups (definitive source for mobile implementation)
* Completed Sprint 1, Sprint 2, and Sprint 5 implementations
* User feedback and decisions from Sprint planning sessions

---

## **7. Global Elements & Standards (Combined Sprint Context)**

### **7.1. Branding Guidelines**

* **Consistency Requirement:** Mobile app must maintain identical branding to desktop application
* **Color Palette:**
  * Primary: `#1E40AF` (Blue-700) - Buttons, headers, active states
  * Secondary: `#10B981` (Green-500) - Success messages, confirmations
  * Accent: `#F59E0B` (Amber-500) - Warnings, highlights
  * Error/Alert: `#EF4444` (Red-500) - Errors, validations
  * SOS Emergency: `#DC2626` (Red-600) - SOS button, urgent alerts
* **Typography:**
  * Headings: Inter Bold
  * Body: Inter Regular
  * Buttons: Inter Semi-Bold
* **Logo Placement:** ISF Playground logo consistent in all module headers (both mobile and desktop)

### **7.2. Responsive Design & Performance**

* **Mobile Target Resolutions:**
  * iPhone SE: 375x667 (small phone baseline)
  * iPhone 12: 390x844 (standard iPhone)
  * Samsung Galaxy: 360x800 (standard Android)
  * iPad: 768x1024 (tablet support)

* **Performance Requirements:**
  * Mobile app cold start: < 3 seconds
  * Screen transitions: < 300ms
  * API response time: < 500ms (p95)
  * Image loading: Progressive (placeholder → full)
  * SOS alert delivery: < 5 seconds end-to-end
  * Mobile bundle size: < 25MB (optimized with code splitting)

* **Desktop Target Resolution:** 1366x768 (maintained from previous sprints)

### **7.3. Accessibility Standards**

* **WCAG 2.1 Level AA:** Applied consistently across mobile and desktop
* **Touch Targets:** Minimum 44x44px (iOS HIG), recommended 48x48px (Material Design)
* **Keyboard Navigation:** Full support on desktop features
* **Screen Reader Compatibility:**
  * VoiceOver (iOS) support for mobile
  * TalkBack (Android) support for mobile
  * NVDA/JAWS support for desktop
* **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text
* **Dynamic Type:** Font scaling support on mobile platforms

### **7.4. Unified Navigation Structure**

* **Desktop App (Electron) - Enhanced:**
  * Student Dashboard
    * [Existing] Home, Courses, Attendance, Shop, Wallet, Profile
    * [S4] **[SOS Button]** ← Prominent, always visible, red color
  * Coach/Admin Dashboard
    * [Existing] Home, Students, Courses, Attendance, Shop Management, Reports
    * [S4] **SOS Alerts** badge count (high priority notifications)

* **Mobile App (React Native) - New:**
  * Bottom Tab Navigation
    * [S3] 📱 Dashboard (role-specific quick actions)
    * [S3] 📸 Attendance (Balagruh In-Charge only)
    * [S3] 📁 Media (Coach/Admin only)
    * [S4] 💬 Messages (all staff roles)
    * [S3] 👤 Profile (settings, preferences)
  * Dashboard Quick Actions (Role-based)
    * [S3] Upload Course Content (Coach/Admin)
    * [S3] Mark Attendance (Balagruh In-Charge)
    * [S3] View Reports (Admin/Coach)
    * [S4] SOS Alerts (Coach/Admin) - Badge count
    * [S4] Health Records (Balagruh In-Charge)
    * [SHARED] Notifications (all roles)

* **Notification Center (Unified - Both Platforms):**
  * Notification Bell Icon with Badge Count
    * [S3] Attendance completed/failed
    * [S4] SOS Alert (urgent priority - red)
    * [S4] New message (high priority)
    * [S3] Low inventory alert (medium priority)
    * [S3] Daily report ready (low priority)

---

## **Detailed Feature & Module Breakdown**

## **Section A: Sprint 3 - Mobile App Development**

### **8. Mobile App Foundation & Core Infrastructure [S3]**

* **Feature ID:** S3-F01
* **Feature Name:** Mobile App Foundation & Core Infrastructure
* **Module:** Mobile Core
* **Priority:** P0 (Critical Path)
* **Development Timeline:** Week 1-2 (10 days)
* **Dependencies:** None (Foundation)

---

#### **Story S3-F01-STORY-01: Mobile App Initialization & Project Setup**

**User Story:**
> As a **Developer**, I want to set up the mobile app project with React Native and TypeScript, so that we have a solid foundation for mobile development with proper architecture and tooling.

**Acceptance Criteria:**

1. **Project Initialization:**
   - [ ] React Native project created with TypeScript support (v0.72.6)
   - [ ] Project runs successfully on iOS simulator (Xcode 16.1+)
   - [ ] Project runs successfully on Android emulator (Android Studio)
   - [ ] Environment configuration files (.env.development, .env.staging, .env.production)
   - [ ] Git repository configured with proper .gitignore

2. **Project Structure:**
   - [ ] Modular folder structure implemented (screens, components, services, store, utils)
   - [ ] Follows Sprint 5 patterns (module isolation, separation of concerns)
   - [ ] ESLint and Prettier configured for code consistency
   - [ ] TypeScript strict mode enabled with proper tsconfig.json

3. **Navigation Framework:**
   - [ ] React Navigation v6 installed and configured
   - [ ] Stack navigator for authentication flow
   - [ ] Bottom tab navigator for main app sections
   - [ ] Drawer navigator for additional menu items (settings, help)
   - [ ] Deep linking configuration for notifications (opens specific screens)

4. **State Management:**
   - [ ] Zustand installed and configured (consistent with web app patterns)
   - [ ] Global stores created: AuthStore, NotificationStore, ConfigStore
   - [ ] Persistent storage configured (AsyncStorage for data persistence)
   - [ ] Hydration logic for offline-first capabilities

5. **UI Component Library:**
   - [ ] Base component library selected (React Native Paper or custom components)
   - [ ] Theme provider configured with ISF branding colors
   - [ ] Reusable components: Button, TextInput, Card, Modal, Badge
   - [ ] Loading indicators (spinner, skeleton screens) and error states

6. **Build Configuration:**
   - [ ] iOS build configuration (Xcode project settings, Info.plist)
   - [ ] Android build configuration (Gradle files, AndroidManifest.xml)
   - [ ] App icon and splash screen assets added (1024x1024 source)
   - [ ] App name and bundle identifier configured (com.isfplayground.mobile)
   - [ ] Development, staging, and production build variants

7. **Development Tools:**
   - [ ] React Native Debugger integration
   - [ ] Flipper configured for debugging (network inspector, logs)
   - [ ] Hot reload working correctly
   - [ ] Build scripts in package.json (ios, android, start, test)

**Technical Implementation Details:**

**Technology Stack:**
```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.6",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "zustand": "^4.4.6",
    "@react-native-async-storage/async-storage": "^1.19.5",
    "axios": "^1.6.2",
    "react-native-config": "^1.5.1",
    "@react-native-firebase/app": "^18.6.1",
    "@react-native-firebase/messaging": "^18.6.1"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.12.0",
    "@typescript-eslint/parser": "^6.12.0",
    "eslint": "^8.54.0",
    "prettier": "^3.1.0",
    "typescript": "^5.3.2",
    "@types/react": "^18.2.0",
    "@types/react-native": "^0.72.0"
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
│   │   │   ├── AttendancePhotoScreen.tsx
│   │   │   └── AttendanceResultsScreen.tsx
│   │   ├── media/
│   │   │   └── MediaUploadScreen.tsx
│   │   ├── messaging/
│   │   │   ├── ConversationListScreen.tsx
│   │   │   └── ChatScreen.tsx
│   │   ├── sos/
│   │   │   └── SOSAlertScreen.tsx
│   │   ├── profile/
│   │   │   └── ProfileScreen.tsx
│   │   └── settings/
│   │       └── SettingsScreen.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── TextInput.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Badge.tsx
│   │   └── navigation/
│   │       ├── BottomTabNavigator.tsx
│   │       └── DrawerNavigator.tsx
│   ├── services/
│   │   ├── api/
│   │   │   ├── apiClient.ts
│   │   │   ├── authApi.ts
│   │   │   ├── attendanceApi.ts
│   │   │   ├── mediaApi.ts
│   │   │   ├── messagingApi.ts
│   │   │   └── sosApi.ts
│   │   ├── storage/
│   │   │   └── secureStorage.ts
│   │   └── notifications/
│   │       └── fcmService.ts
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
│   │   ├── notification.ts
│   │   ├── message.ts
│   │   └── sos.ts
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
      // Navigation logic handled by NavigationService
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

**Frontend Components:**
- `LoginScreen.tsx`: Authentication UI with username/password inputs
- `DashboardScreen.tsx`: Main dashboard with role-specific quick actions
- `BottomTabNavigator.tsx`: Bottom tab navigation bar
- `Button.tsx`, `TextInput.tsx`: Reusable UI components

**API Endpoints:**
- None (Foundation setup only, authentication endpoints in next story)

**Data Models:**
- None (Foundation setup only, schemas in subsequent stories)

**UI/UX Wireframe Description:**

**App Launch Flow:**
1. Splash screen with ISF logo (2 seconds, animated fade-in)
2. Check for stored auth token in secure storage
3. If token exists and valid → Navigate to Dashboard
4. If no token or invalid → Navigate to Login Screen

**Navigation Structure:**
```
Root Navigator (Stack)
├── Auth Stack
│   └── Login Screen
└── Main Stack
    ├── Bottom Tab Navigator
    │   ├── Tab 1: Dashboard
    │   ├── Tab 2: Attendance (role-specific visibility)
    │   ├── Tab 3: Media (role-specific visibility)
    │   ├── Tab 4: Messages
    │   └── Tab 5: Profile
    └── Modal Screens (overlays)
        ├── SOS Alert Modal (high priority)
        ├── Notification Detail
        └── Settings
```

**Testing Checklist:**
- [ ] App builds successfully on iOS (Xcode 16.1+)
- [ ] App builds successfully on Android (API 26+)
- [ ] Navigation between screens works smoothly (< 300ms transitions)
- [ ] Hot reload functions correctly during development
- [ ] Environment variables load properly from .env files
- [ ] TypeScript compilation has no errors
- [ ] ESLint shows no warnings

---

#### **Story S3-F01-STORY-02: Mobile Authentication System**

**User Story:**
> As a **Coach/Admin/Balagruh In-Charge**, I want to log into the mobile app using my existing credentials and optionally use biometric authentication, so that I can securely access mobile features quickly.

**Acceptance Criteria:**

1. **Login Screen:**
   - [ ] Clean, professional login UI with ISF branding
   - [ ] `Username` text field with appropriate keyboard type (email/default)
   - [ ] `Password` text field with secure entry and show/hide toggle (eye icon)
   - [ ] `[Log In]` button (disabled until both fields filled, loading spinner when active)
   - [ ] Loading indicator during authentication (spinner with "Signing you in...")
   - [ ] Error messages displayed clearly below form (red background, white text)
   - [ ] "Forgot Password?" link (links to desktop app instruction text)

2. **Authentication Flow:**
   - [ ] JWT token-based authentication (reuses existing backend `/api/auth/login`)
   - [ ] Successful login stores JWT token securely (iOS Keychain, Android Keystore)
   - [ ] Successful login stores refresh token (30-day expiration)
   - [ ] User object stored in AuthStore (Zustand with persistence)
   - [ ] Navigate to Dashboard on successful authentication

3. **Token Management:**
   - [ ] JWT token included in all API requests (Authorization: Bearer header)
   - [ ] Token refresh mechanism (automatic when token expires during API call)
   - [ ] Refresh token rotation (security best practice, new token on each refresh)
   - [ ] Auto-login if valid token exists on app launch
   - [ ] Logout clears all tokens and user data from storage

4. **Biometric Authentication:**
   - [ ] After first successful login, prompt to enable biometric auth
   - [ ] Support Face ID (iOS), Touch ID (iOS), Fingerprint (Android)
   - [ ] Biometric auth bypasses username/password entry (direct to dashboard)
   - [ ] Fallback to username/password if biometric fails (3 attempts)
   - [ ] Option to disable biometric auth in settings
   - [ ] Re-prompt for credentials every 30 days (security requirement)

5. **Session Management:**
   - [ ] Session timeout after 24 hours of inactivity
   - [ ] Session timeout warning 5 minutes before expiry
   - [ ] Ability to extend session with user action ("Stay logged in" button)
   - [ ] Logout functionality (clears tokens, redirects to login)
   - [ ] Force logout if token is revoked (backend notification)

6. **Role-Based Access:**
   - [ ] User role stored in AuthStore (Coach, Admin, Balagruh In-Charge)
   - [ ] Dashboard shows role-appropriate quick actions
   - [ ] Navigation tabs filtered by role permissions
   - [ ] API requests include role in token claims (verified server-side)

7. **Error Handling:**
   - [ ] Invalid credentials: "Incorrect username or password. Please try again."
   - [ ] Network error: "Unable to connect. Please check your internet connection."
   - [ ] Server error: "Something went wrong. Please try again later."
   - [ ] Account locked: "Your account is temporarily locked. Contact admin."
   - [ ] Biometric failure: Fallback to password entry after 3 failed attempts

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

        // Store tokens securely in Keychain/Keystore
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
      // Biometric success, proceed with auto-login (assumes token still valid)
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

---

#### **Story S3-F01-STORY-03: Mobile Main Navigation & Dashboard**

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

### **9. Mobile Attendance Tracking System [S3]**

* **Feature ID:** S3-F02
* **Feature Name:** Facial Recognition-Based Attendance on Mobile
* **Module:** Attendance Management
* **Priority:** P0 (Critical - Core Feature)
* **Development Timeline:** Week 2 (Days 6-8)
* **Dependencies:** S3-F01 (Mobile Foundation), Existing FR System

*Stories S3-F02-STORY-01 and S3-F02-STORY-02 fully documented in feature breakdown*

**Key Features:**
- Photo upload for attendance with facial recognition processing
- Camera/gallery integration with photo quality validation
- Attendance results viewing and verification interface
- Manual override capabilities for FR failures
- Historical attendance tracking with date filters
- Offline photo queuing with automatic sync when online

---

### **10. Mobile Media Management [S3]**

* **Feature ID:** S3-F03
* **Feature Name:** Course Content Upload from Mobile
* **Module:** Media & Content Management
* **Priority:** P1 (High Priority)
* **Development Timeline:** Week 2 (Day 9)
* **Dependencies:** S3-F01 (Mobile Foundation), AWS S3 Integration

*Story S3-F03-STORY-01 fully documented in feature breakdown*

**Key Features:**
- Multi-file upload support (videos up to 500MB, documents up to 50MB, images up to 25MB)
- AWS S3 integration with presigned URLs for secure direct uploads
- Progress tracking and batch upload capabilities
- Content publishing workflow with course/module association
- Preview functionality and metadata editing
- Background upload with notification on completion

---

### **11. Mobile Analytics & Reporting [S3]**

* **Feature ID:** S3-F04
* **Feature Name:** Performance Dashboards on Mobile
* **Module:** Analytics & Reporting
* **Priority:** P1 (High Priority)
* **Development Timeline:** Week 3 (Day 17)
* **Dependencies:** S3-F01 (Mobile Foundation), Existing Backend Reports

*Story S3-F04-STORY-01 fully documented in feature breakdown*

**Key Features:**
- Performance dashboard with key metrics (attendance rates, course completion, coin distribution)
- Visual charts using React Native Chart libraries (line, bar, pie charts)
- Date range filtering and drill-down capabilities
- Export capabilities (PDF/CSV generation)
- Top performers leaderboards
- Real-time data synchronization with backend

---

### **12. Mobile Push Notifications [S3]**

* **Feature ID:** S3-F05
* **Feature Name:** Firebase Cloud Messaging Integration
* **Module:** Notifications
* **Priority:** P0 (Critical - Enables Sprint 4 SOS Alerts)
* **Development Timeline:** Week 2 (Day 10)
* **Dependencies:** S3-F01 (Mobile Foundation)

*Story S3-F05-STORY-01 fully documented in feature breakdown*

**Key Features:**
- Firebase Cloud Messaging (FCM) integration for both iOS and Android
- Device token registration and management
- Background and foreground notification handling
- Deep linking to relevant screens (opens course, attendance, SOS alert)
- Notification preferences and quiet hours configuration
- Notification history screen with mark-as-read functionality
- High-priority notification support for SOS alerts (vibration, custom sound)

**Notification Category Mapping:**

#### **12.5. Push Notification Category to Priority Mapping**

All 75 notification categories map to specific push notification behaviors based on their importance and urgency.

**Priority Levels:**

| Priority | Sound | Vibration | Display | Use When | Examples |
|----------|-------|-----------|---------|----------|----------|
| **URGENT** | Emergency alarm (loud, cannot be silenced) | Strong pattern (500ms × 3) | Full-screen alert, heads-up | Life-threatening, critical emergencies | SOS_EMERGENCY, MEDICAL_ALERT_CRITICAL, INVENTORY_OUT_OF_STOCK |
| **HIGH** | Default notification sound | Standard vibration | Banner, lock screen | Time-sensitive actions, important alerts | TASK_ASSIGNED, SESSION_REMINDER, MEDICAL_ALERT_WARNING, PURCHASE_REQUEST_APPROVED |
| **MEDIUM** | Default sound | Optional vibration | Badge only | Standard notifications, general updates | COINS_AWARDED, WTF_PIN_ADDED, TASK_COMPLETED, SHOP_ORDER_DELIVERED |
| **LOW** | Silent | No vibration | Badge only | Informational, non-urgent | ATTENDANCE_MARKED, COMMUNITY_UPDATE, WTF_INTERACTION |

#### **12.6. Complete Category to Push Notification Configuration Map**

**URGENT Priority (Full-Screen Alerts):**
```javascript
const urgentCategories = {
  SOS_EMERGENCY: {
    sound: "emergency_siren.mp3",
    vibration: [0, 500, 250, 500, 250, 500],
    channelId: "sos_alerts",
    priority: "max",
    interruption: "critical", // iOS bypasses Focus/DND
    ttl: 0, // Never expire
    color: "#DC2626" // Red
  },
  SOS_ESCALATED: { /* Same as SOS_EMERGENCY */ },
  MEDICAL_ALERT_CRITICAL: {
    sound: "medical_alert.mp3",
    vibration: [0, 500, 250, 500],
    channelId: "medical_critical",
    priority: "max",
    interruption: "critical",
    ttl: 3600, // 1 hour
    color: "#DC2626" // Red
  },
  INVENTORY_OUT_OF_STOCK: {
    sound: "alert_urgent.mp3",
    vibration: [0, 500, 250],
    channelId: "inventory_alerts",
    priority: "max",
    ttl: 86400, // 24 hours
    color: "#DC2626" // Red
  }
};
```

**HIGH Priority (Banner + Sound):**
```javascript
const highCategories = {
  TASK_ASSIGNED: {
    sound: "notification_task.mp3",
    vibration: [0, 250],
    channelId: "tasks",
    priority: "high",
    ttl: 86400, // 24 hours
    color: "#1E40AF", // ISF Blue
    deepLink: "/tasks/{taskId}"
  },
  TASK_DEADLINE_APPROACHING: { /* Similar */ },
  TASK_OVERDUE: { /* Similar */ },
  SESSION_REMINDER: {
    sound: "notification_reminder.mp3",
    vibration: [0, 250],
    channelId: "sessions",
    priority: "high",
    ttl: 3600, // 1 hour
    color: "#7C3AED", // Purple
    deepLink: "/sessions/{sessionId}"
  },
  MEDICAL_ALERT_WARNING: {
    sound: "notification_medical.mp3",
    vibration: [0, 300],
    channelId: "medical_warnings",
    priority: "high",
    ttl: 43200, // 12 hours
    color: "#F59E0B", // Orange
    deepLink: "/medical/checkins/{checkInId}"
  },
  MEDICAL_VACCINATION_DUE: { /* Similar to WARNING */ },
  MESSAGE_RECEIVED: {
    sound: "message_tone.mp3",
    vibration: [0, 200],
    channelId: "messages",
    priority: "high",
    ttl: 604800, // 7 days
    color: "#10B981", // Green
    deepLink: "/messages/{conversationId}"
  },
  PURCHASE_REQUEST_APPROVED: { /* Similar */ },
  PURCHASE_REQUEST_REJECTED: { /* Similar */ },
  INVENTORY_LOW_STOCK: {
    sound: "notification_warning.mp3",
    vibration: [0, 250],
    channelId: "inventory_alerts",
    priority: "high",
    ttl: 86400,
    color: "#F59E0B" // Orange
  }
};
```

**MEDIUM Priority (Badge + Sound):**
```javascript
const mediumCategories = {
  COINS_AWARDED: {
    sound: "coin_sound.mp3",
    vibration: [0, 150],
    channelId: "rewards",
    priority: "default",
    ttl: 2592000, // 30 days
    color: "#F59E0B", // Gold
    deepLink: "/wallet"
  },
  WTF_PIN_ADDED: {
    sound: "notification_wtf.mp3",
    vibration: [0, 150],
    channelId: "wtf",
    priority: "default",
    ttl: 604800, // 7 days
    color: "#8B5CF6", // Purple
    deepLink: "/wtf"
  },
  ACHIEVEMENT_UNLOCKED: { /* Similar to COINS_AWARDED */ },
  SHOP_ORDER_DELIVERED: {
    sound: "notification_shop.mp3",
    vibration: [0, 150],
    channelId: "shop",
    priority: "default",
    ttl: 604800,
    color: "#10B981", // Green
    deepLink: "/shop/orders/{orderId}"
  },
  TASK_COMPLETED: { /* Similar */ },
  COURSE_ASSIGNED: { /* Similar */ },
  COURSE_COMPLETED: { /* Similar */ },
  /* All other medium-priority categories */
};
```

**LOW Priority (Silent Badge):**
```javascript
const lowCategories = {
  ATTENDANCE_MARKED: {
    sound: null, // Silent
    vibration: null,
    channelId: "attendance",
    priority: "low",
    ttl: 86400,
    color: "#6B7280", // Gray
    onlyUpdateBadge: true
  },
  WTF_INTERACTION: { /* Silent */ },
  COINS_DEDUCTED: { /* Silent */ },
  COMMUNITY_UPDATE: { /* Silent */ },
  GENERAL: { /* Silent */ }
};
```

#### **12.7. Deep Linking URL Patterns**

**Notification Category → App Screen Mapping:**

| Category | Deep Link Pattern | Screen Destination |
|----------|------------------|-------------------|
| TASK_ASSIGNED | `/tasks/{taskId}` | Task Detail Screen |
| TASK_DEADLINE_APPROACHING | `/tasks/{taskId}` | Task Detail Screen |
| MEDICAL_ALERT_CRITICAL | `/medical/checkins/{checkInId}` | Medical Check-in Detail |
| MEDICAL_ALERT_WARNING | `/medical/checkins/{checkInId}` | Medical Check-in Detail |
| SOS_EMERGENCY | `/sos/alerts/{sosAlertId}` | SOS Alert Response Screen |
| MESSAGE_RECEIVED | `/messages/{conversationId}` | Conversation Thread |
| COINS_AWARDED | `/wallet` | Wallet/Transaction History |
| WTF_PIN_ADDED | `/wtf` | Wall of Fame Screen |
| ACHIEVEMENT_UNLOCKED | `/achievements` | Achievements Screen |
| SHOP_ORDER_DELIVERED | `/shop/orders/{orderId}` | Order Detail Screen |
| SESSION_REMINDER | `/sessions/{sessionId}` | Training Session Detail |
| COURSE_ASSIGNED | `/courses/{courseId}` | Course Overview |
| PURCHASE_REQUEST_APPROVED | `/purchase/requests/{requestId}` | Purchase Request Detail |
| ATTENDANCE_MARKED | `/attendance` | Attendance History |

**Implementation:**
```javascript
// React Native deep linking handler
Linking.addEventListener('url', ({ url }) => {
  const route = url.replace(/.*?:\/\//g, '');
  const [path, id] = route.split('/').filter(Boolean);

  switch(path) {
    case 'tasks':
      navigation.navigate('TaskDetail', { taskId: id });
      break;
    case 'medical':
      navigation.navigate('MedicalCheckInDetail', { checkInId: id });
      break;
    case 'sos':
      navigation.navigate('SOSAlertResponse', { sosAlertId: id });
      break;
    case 'messages':
      navigation.navigate('Conversation', { conversationId: id });
      break;
    // ... etc for all categories
  }
});
```

#### **12.8. Android Notification Channels**

**Required Channels (Android 8.0+):**
```javascript
const notificationChannels = [
  {
    id: "sos_alerts",
    name: "Emergency SOS Alerts",
    importance: "MAX",
    sound: "emergency_siren.mp3",
    vibration: true,
    bypassDnd: true,
    lockscreenVisibility: "PUBLIC"
  },
  {
    id: "medical_critical",
    name: "Critical Medical Alerts",
    importance: "MAX",
    sound: "medical_alert.mp3",
    vibration: true,
    bypassDnd: true
  },
  {
    id: "tasks",
    name: "Task Notifications",
    importance: "HIGH",
    sound: "notification_task.mp3",
    vibration: true
  },
  {
    id: "messages",
    name: "Messages",
    importance: "HIGH",
    sound: "message_tone.mp3",
    vibration: true
  },
  {
    id: "rewards",
    name: "Coins & Achievements",
    importance: "DEFAULT",
    sound: "coin_sound.mp3"
  },
  {
    id: "shop",
    name: "Shop Orders",
    importance: "DEFAULT",
    sound: "notification_shop.mp3"
  },
  {
    id: "wtf",
    name: "Wall of Fame",
    importance: "DEFAULT"
  },
  {
    id: "attendance",
    name: "Attendance",
    importance: "LOW",
    sound: null
  },
  {
    id: "general",
    name: "General Notifications",
    importance: "LOW"
  }
];
```

---

## **Section B: Sprint 4 - Emergency & Communication Features**

### **13. SOS Emergency System (Desktop → Mobile) [S4]**

* **Feature ID:** S4-F01
* **Feature Name:** Emergency Alert System with Multi-Tier Escalation
* **Module:** Emergency Management
* **Priority:** P0 (Critical - Safety Feature)
* **Development Timeline:** Week 3 (Days 11-14)
* **Dependencies:** S3-F05 (Push Notifications), WebSocket Infrastructure

*Stories S4-F01-STORY-01, S4-F01-STORY-02, S4-F01-STORY-03 fully documented in feature breakdown*

**Key Features:**
- Desktop SOS trigger button with prominent placement on student interface (red, always visible)
- Emergency category selection (Medical - critical, Safety, Mental Health, Other)
- Mobile alert reception with high-priority push notifications (vibration, custom sound)
- Multi-tier escalation workflow:
  * **Tier 1 (0-2 min):** Balagruh Coaches + In-Charge receive alerts
  * **Tier 2 (2-5 min):** Admins receive alerts + SMS/WhatsApp sent
  * **Tier 3 (5+ min):** Broadcast to all staff members
- Real-time status tracking (sent → acknowledged → responding → arrived → resolved)
- Response coordination dashboard showing who's responding and ETA
- Response types: Acknowledged ("I see it"), Responding ("On my way"), Arrived ("I'm here")
- Compliance audit logging for all SOS events (timestamp, responses, resolution)
- SOS history with filtering and export capabilities

**Notification Integration:**

#### **13.4. SOS Notification Architecture [CRITICAL]**

SOS alerts use the notification system with the highest priority (URGENT) and multi-channel delivery to ensure immediate response.

**New Notification Categories:**
- `SOS_EMERGENCY`: Initial SOS alert triggered
- `SOS_ESCALATED`: Tier 2 or Tier 3 escalation
- `SOS_RESOLVED`: Emergency resolved and closed

**Delivery Channels:**
- **WebSocket** (instant, all tiers)
- **Push Notification** (mobile, all tiers)
- **SMS** (Tier 2+, emergency contacts)
- **WhatsApp** (Tier 2+, optional if client approves)

#### **13.5. SOS Notification Escalation Flow [DETAILED SPECIFICATION]**

**Tier 1 Escalation (0-2 minutes):**

**Recipients:**
- All Coaches in student's Balagruha
- Balagruha In-charge for student's Balagruha

**Notification Content:**
```javascript
{
  title: "🚨 SOS ALERT - IMMEDIATE RESPONSE REQUIRED",
  message: "Student [Name] triggered SOS - Category: [Medical/Safety/Mental Health/Other] - Location: [Building/Room]",
  category: "SOS_EMERGENCY",
  priority: "URGENT",
  metadata: {
    sosAlertId: "sos_abc123",
    studentId: "student_xyz",
    studentName: "Student Name",
    balagruhaId: "balagruha_123",
    category: "Medical",
    location: "Computer Lab",
    timestamp: "2025-11-04T14:30:00Z",
    actionUrl: "/sos/alerts/sos_abc123"
  }
}
```

**Delivery:**
- **WebSocket**: Instant push to connected coaches
- **Push Notification**:
  ```javascript
  {
    notification: {
      title: "🚨 SOS EMERGENCY",
      body: "[Student Name] - Medical Emergency - Computer Lab",
      sound: "emergency_alert.mp3", // Loud, distinctive sound
      priority: "max", // Android maximum priority
      badge: 1
    },
    android: {
      priority: "max",
      notification: {
        channelId: "sos_alerts",
        color: "#DC2626", // Red
        vibrationPattern: [0, 500, 250, 500] // Strong vibration
      }
    },
    apns: {
      headers: {
        "apns-priority": "10",
        "apns-interruption-level": "critical" // iOS critical alert
      }
    }
  }
  ```

**UI Behavior:**
- Mobile app: Full-screen alert overlay (even if app is closed)
- Vibration: Strong pattern (multiple bursts)
- Sound: Emergency siren (cannot be silenced by Do Not Disturb)
- Notification stays on screen until acknowledged

**Acknowledgment Required:**
At least one Tier 1 recipient must acknowledge within 2 minutes by tapping:
- "Acknowledged" → Status changes to 'acknowledged'
- "On My Way" → Status changes to 'responding'

If NO acknowledgment within 2 minutes → **Auto-escalate to Tier 2**

---

**Tier 2 Escalation (2-5 minutes):**

**Trigger:** No acknowledgment from Tier 1 within 2 minutes

**Recipients:**
- All Admins
- All Coordinators
- Amma (senior leadership)

**Notification Content:**
```javascript
{
  title: "⚠️ SOS ESCALATED - NO TIER 1 RESPONSE",
  message: "Student [Name] SOS (2 min ago) - Category: [Type] - NO ACKNOWLEDGMENT YET",
  category: "SOS_ESCALATED",
  priority: "URGENT",
  metadata: {
    sosAlertId: "sos_abc123",
    escalationTier: 2,
    timeSinceTrigger: 120, // seconds
    tier1Recipients: ["coach1", "coach2", "incharge1"],
    noResponseCount: 3
  }
}
```

**Delivery:**
- **WebSocket + Push**: Same as Tier 1
- **SMS**: Emergency SMS sent to admin phone numbers
  ```
  [ISF EMERGENCY] Student [Name] triggered SOS 2 minutes ago.
  Category: [Medical/Safety/Mental Health].
  Location: [Building].
  Tier 1 did not respond.
  Respond immediately via ISF mobile app.
  ```
- **WhatsApp** (optional): If enabled, send template message

**SMS Provider:** Twilio or AWS SNS
**Rate Limit:** No limit for SOS emergencies
**Retry Logic:** Send once per escalation tier (do not retry to prevent spam)

If NO acknowledgment within 3 additional minutes (5 min total) → **Auto-escalate to Tier 3**

---

**Tier 3 Broadcast (5+ minutes):**

**Trigger:** No acknowledgment from Tier 2 within 3 additional minutes (5 min total since trigger)

**Recipients:** ALL STAFF (broadcast to everyone)

**Notification Content:**
```javascript
{
  title: "🔴 CRITICAL - SOS EMERGENCY UNACKNOWLEDGED",
  message: "Student [Name] SOS (5+ min ago) - ALL STAFF RESPOND IMMEDIATELY",
  category: "SOS_ESCALATED",
  priority: "URGENT",
  metadata: {
    sosAlertId: "sos_abc123",
    escalationTier: 3,
    timeSinceTrigger: 300, // 5+ minutes
    criticalAlert: true
  }
}
```

**Delivery:**
- **WebSocket + Push**: All staff members
- **SMS**: All staff with phone numbers
- **Desktop Alert**: If desktop app open, show full-screen modal
- **WhatsApp**: If enabled, broadcast to all staff

**UI Behavior:**
- Cannot be dismissed until acknowledged
- Desktop: Full-screen blocking modal
- Mobile: Lock screen alert with emergency sound

---

#### **13.6. SOS Resolution Notifications**

**When SOS Resolved:**

**Trigger:** Staff member marks SOS as 'resolved' with resolution notes

**Notification to ALL Previous Recipients:**
```javascript
{
  title: "✅ SOS Resolved",
  message: "Student [Name] emergency resolved by [Responder Name]. Resolution: [Notes]",
  category: "SOS_RESOLVED",
  priority: "MEDIUM",
  metadata: {
    sosAlertId: "sos_abc123",
    resolvedBy: "Coach Rajesh",
    resolvedAt: "2025-11-04T14:38:00Z",
    resolution: "Student received medical attention, fever checked, doing fine now",
    responseDuration: "8 minutes"
  }
}
```

**Delivery:**
- **WebSocket + Push**: All staff who received the original SOS alert
- **No SMS**: Resolution notifications only via app

**Purpose:**
- Inform all responders that emergency is handled
- Prevent duplicate responses
- Provide closure and resolution details

---

#### **13.7. SOS Notification Delivery Guarantees**

**Reliability Requirements:**
- **Target Delivery Time**: < 5 seconds (p95)
- **Success Rate**: 99.9% (at least one recipient receives notification)

**Implementation:**
1. **Persistent Storage**: All SOS notifications saved to DB before sending
2. **WebSocket with Fallback**:
   - Primary: WebSocket instant push
   - Fallback: If WebSocket fails, retry via polling API
3. **Push Notification Retry**:
   - Attempt 1: Immediate
   - Attempt 2: After 10 seconds (if first fails)
   - Attempt 3: After 30 seconds (if second fails)
4. **SMS Guaranteed Delivery**:
   - Use Twilio/AWS SNS with delivery confirmation
   - Log delivery status in SOSAlert.notifications array
5. **Audit Logging**:
   - Every notification attempt logged with timestamp
   - Delivery status tracked (sent, delivered, read, failed)
   - Used for post-incident analysis

**Error Handling:**
- If FCM token invalid → Remove token, log error, continue to other recipients
- If SMS fails → Log error, alert system admin, continue workflow
- If all delivery channels fail → Trigger system-wide alert to technical team

**Monitoring:**
- Real-time dashboard showing SOS delivery latency
- Alerts if delivery time > 10 seconds
- Weekly report of SOS notification performance

---

### **14. Internal Messaging Module [S4]**

* **Feature ID:** S4-F02
* **Feature Name:** Staff Communication System
* **Module:** Messaging
* **Priority:** P1 (High Priority)
* **Development Timeline:** Week 3-4 (Days 15-16)
* **Dependencies:** WebSocket Infrastructure, S3-F05 (Push Notifications)

*Stories S4-F02-STORY-01, S4-F02-STORY-02 fully documented in feature breakdown*

**Key Features:**
- 1-on-1 direct messaging between staff members
- Group conversations for teams and Balagruhs
- Text, image, and file attachments:
  * Images: up to 25MB
  * Videos: up to 100MB
  * Documents: up to 25MB
  * Total per message: up to 100MB
- Read receipts (single checkmark sent, double checkmark read)
- Typing indicators ("User is typing...")
- Message search within conversations
- Conversation history with infinite scroll
- Real-time delivery via WebSocket with automatic reconnection
- Offline message queuing (messages sent when back online)
- Unread count badges on tab and conversation list
- Push notifications for new messages (when app in background)

**Notification Integration:**

#### **14.5. Message Notification Specifications**

**New Notification Category:**
- `MESSAGE_RECEIVED`: New message in conversation

**Notification Triggers:**
1. **New Direct Message** - User receives 1-on-1 message
2. **New Group Message** - User receives message in group conversation
3. **@Mention** - User is specifically mentioned in group message

#### **14.6. Direct Message Notifications**

**Trigger:** New message sent to user in 1-on-1 conversation

**Notification Content:**
```javascript
{
  title: `New message from ${senderName}`,
  message: `${messagePreview}`, // First 100 characters
  category: "MESSAGE_RECEIVED",
  priority: "HIGH", // Direct messages are high priority
  metadata: {
    conversationId: "conv_abc123",
    messageId: "msg_xyz789",
    senderId: "user_sender",
    senderName: "Coach Rajesh",
    messageType: "text", // or "image", "video", "document"
    timestamp: "2025-11-04T14:45:00Z",
    actionUrl: "/messages/conv_abc123"
  }
}
```

**Delivery:**
- **WebSocket**: If user is online and app is open
  - Show in-app toast notification
  - Update conversation list with unread badge
  - Play message notification sound
- **Push Notification**: If user is offline or app in background
  ```javascript
  {
    notification: {
      title: "Coach Rajesh",
      body: "Hey, can you help with...",
      sound: "message_tone.mp3",
      badge: unreadCount,
      icon: senderProfilePicture
    },
    data: {
      conversationId: "conv_abc123",
      messageId: "msg_xyz789",
      type: "direct_message",
      actionUrl: "/messages/conv_abc123"
    },
    android: {
      priority: "high",
      notification: {
        channelId: "messages",
        color: "#1E40AF" // ISF Blue
      }
    }
  }
  ```

**Notification Grouping (Android):**
- Group multiple messages from same sender
- Show conversation thread in notification
- "Reply" action for quick response

#### **14.7. Group Message Notifications**

**Trigger:** New message in group conversation (lower priority than direct messages)

**Notification Content:**
```javascript
{
  title: `New message in ${groupName}`,
  message: `${senderName}: ${messagePreview}`,
  category: "MESSAGE_RECEIVED",
  priority: "MEDIUM", // Group messages are medium priority
  metadata: {
    conversationId: "conv_group123",
    messageId: "msg_xyz789",
    senderId: "user_sender",
    senderName: "Coach Rajesh",
    groupName: "Balagruh A Coaches",
    actionUrl: "/messages/conv_group123"
  }
}
```

**Delivery:**
- **WebSocket**: Same as direct messages
- **Push Notification**: Only if:
  - User is @mentioned in message, OR
  - User has enabled group notifications for this conversation

**@Mention Handling:**
If message contains `@username`:
- Upgrade priority to HIGH
- Change title to: "You were mentioned in ${groupName}"
- Message: "${senderName} mentioned you: ${messagePreview}"

#### **14.8. Read Receipt Notifications**

**Trigger:** Recipient reads sender's message

**Notification Type:** WebSocket only (not push notification)

**WebSocket Message:**
```javascript
{
  type: "message_read",
  data: {
    messageId: "msg_xyz789",
    conversationId: "conv_abc123",
    readBy: "user_recipient",
    readAt: "2025-11-04T14:50:00Z"
  }
}
```

**UI Update:**
- Change message status from "delivered" (single checkmark) to "read" (double checkmark)
- No push notification (silent update)

#### **14.9. Typing Indicator Notifications**

**Trigger:** User starts typing in conversation

**Notification Type:** WebSocket only (real-time, ephemeral)

**WebSocket Message:**
```javascript
{
  type: "typing_indicator",
  data: {
    conversationId: "conv_abc123",
    userId: "user_typer",
    userName: "Coach Rajesh",
    isTyping: true // or false when stopped
  }
}
```

**Implementation:**
- Send "isTyping: true" when user types first character
- Send "isTyping: false" when user stops typing (3-second debounce)
- Automatically expire after 10 seconds if no update received

**UI Display:**
- Show "Coach Rajesh is typing..." below conversation
- Animated dots indicator

#### **14.10. Message Notification Settings (User Preferences)**

Users can customize notification preferences per conversation:

**Preferences Schema:**
```javascript
{
  conversationId: "conv_abc123",
  notificationSettings: {
    enabled: true, // Master toggle
    pushNotifications: true, // Push when app closed
    sound: true, // Play sound
    vibrate: true, // Vibrate device
    showPreview: true, // Show message preview in notification
    mentionsOnly: false // (For groups) Only notify on @mentions
  }
}
```

**Quiet Hours:**
Users can set quiet hours for message notifications:
- Respect user's global quiet hours (defined in User preferences)
- Exception: URGENT priority messages (SOS) bypass quiet hours

---

### **15. WhatsApp Business API Integration [S4]**

* **Feature ID:** S4-F03
* **Feature Name:** WhatsApp Notifications
* **Module:** External Communications
* **Priority:** P1 (High Priority)
* **Development Timeline:** Week 4 (Day 20)
* **Dependencies:** S4-F01 (SOS System), Twilio/360Dialog Account

*Story S4-F03-STORY-01 fully documented in feature breakdown*

**Key Features:**
- WhatsApp Business API integration (Twilio or 360Dialog)
- Template message support for standardized communications
- SOS alert notifications to guardians:
  * Template: "Alert: [StudentName] triggered emergency ([Category]). Staff notified and responding."
- Daily attendance summaries for parents:
  * Template: "[StudentName] attendance: [Present/Absent]. [Timestamp]"
- Opt-in/opt-out management (parents can opt out via WhatsApp reply)
- Delivery status tracking (sent, delivered, read)
- Retry logic for failed messages (3 attempts with exponential backoff)
- Rate limiting compliance (per WhatsApp Business API terms)
- Delivery log with filtering and export

---

### **16. Student Health Tracking [S4]**

* **Feature ID:** S4-F04
* **Feature Name:** Health Monitoring System
* **Module:** Health Management
* **Priority:** P1 (High Priority)
* **Development Timeline:** Week 4 (Days 18-19)
* **Dependencies:** S4-F01 (SOS System for correlation)

*Stories S4-F04-STORY-01, S4-F04-STORY-02 fully documented in feature breakdown*

**Key Features:**
- Health metrics entry interface (mobile and desktop):
  * Weight (kg)
  * Height (cm)
  * Temperature (°C)
  * Blood Pressure (systolic/diastolic)
  * Heart Rate (bpm)
- Symptom checklist (fever, cough, headache, fatigue, nausea, dizziness, etc.)
- Incident recording (description, photos, action taken, follow-up required)
- Health document uploads (medical reports, prescriptions - PDF, images up to 10MB)
- Trend analysis and growth charts visualization (line charts, scatter plots)
- Abnormal value alerts:
  * Temperature > 37.5°C: Warning (yellow notification)
  * Temperature > 39°C: Critical (red notification + sound)
  * Weight change > 5% in 30 days: Warning
  * Blood Pressure outside normal range: Warning
- SOS incident correlation (automatic linking when SOS triggered)
- Health report exports for medical professionals (PDF format)
- Health history with date filtering

---

### **16.5. Student Emotion Check-In System [S4]**

* **Feature ID:** S4-F04-B
* **Feature Name:** Emotion Check-In & Well-being Monitoring
* **Module:** Health Management / Student Well-being
* **Priority:** P1 (High Priority)
* **Development Timeline:** Week 3 (Days 15-16)
* **Dependencies:** Notification System, Task Management

---

#### **16.5.1. System Overview**

The Emotion Check-In System provides students with a simple 5-emoji interface to express their emotional state. This early-warning system helps staff identify students who may need emotional support before situations escalate. The system integrates with the notification system to alert staff when students report negative emotions (Sad, Angry, Worried).

**Key Features:**
- 5-emoji selection interface (Happy, Sad, Angry, Worried, Neutral)
- Automatic staff notifications for concerning emotions (Sad/Angry/Worried)
- Escalation logic for repeated negative check-ins
- Integration with Task Management (auto-create follow-up tasks)
- Privacy protections and student transparency
- Emotion history tracking and trend analysis

---

#### **16.5.2. Database Schema**

```javascript
const EmotionCheckInSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  emotion: {
    type: String,
    required: true,
    enum: ['HAPPY', 'SAD', 'ANGRY', 'WORRIED', 'NEUTRAL']
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  context: {
    location: String, // e.g., "Computer Lab", "Classroom A"
    sessionType: String, // e.g., "Learning", "Break Time"
  },
  staffNotified: [{
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notifiedAt: Date,
    acknowledgedAt: Date
  }],
  followUp: {
    taskCreated: Boolean,
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    resolved: Boolean,
    resolvedAt: Date,
    resolutionNotes: String
  }
});

EmotionCheckInSchema.index({ studentId: 1, timestamp: -1 });
EmotionCheckInSchema.index({ emotion: 1, timestamp: -1 });
```

---

#### **16.5.3. API Endpoints**

**Create Emotion Check-In (Student Desktop)**
```http
POST /api/v1/emotions/check-in
Authorization: Bearer <student_jwt_token>
Content-Type: application/json

Request Body:
{
  "emotion": "SAD",
  "location": "Computer Lab"
}

Response 200:
{
  "success": true,
  "checkIn": {
    "_id": "emo_123",
    "emotion": "SAD",
    "timestamp": "2025-11-04T16:45:00Z"
  },
  "message": "Thanks for letting us know. A coach will check in with you soon.",
  "notificationsSent": {
    "coach": true,
    "balagruhaInCharge": true,
    "admin": true
  }
}
```

**Get Student Emotion History (Staff)**
```http
GET /api/v1/emotions/student/:studentId/history?days=7
Authorization: Bearer <staff_jwt_token>

Response 200:
{
  "success": true,
  "student": {
    "id": "std_456",
    "name": "Arjun Kumar"
  },
  "emotionHistory": [
    {
      "emotion": "SAD",
      "timestamp": "2025-11-04T16:45:00Z",
      "location": "Computer Lab"
    },
    {
      "emotion": "WORRIED",
      "timestamp": "2025-11-03T14:30:00Z",
      "location": "Classroom A"
    }
  ],
  "statistics": {
    "happy": 3,
    "sad": 2,
    "angry": 0,
    "worried": 2,
    "neutral": 1
  },
  "concerningCheckIns": 4,
  "requiresAttention": true
}
```

---

#### **16.5.4. Notification Logic**

**For Happy 😊 or Neutral 😐:**
```javascript
// No staff notifications sent
// Log emotion for positive trend tracking
await EmotionCheckIn.create({
  studentId,
  emotion: 'HAPPY',
  timestamp: new Date()
});

// Show student confirmation message only
return {
  message: "Thanks for checking in! Keep up the positive spirit!",
  notificationsSent: { staff: false }
};
```

**For Sad 😢, Angry 😠, or Worried 😟:**
```javascript
// Create emotion check-in record
const checkIn = await EmotionCheckIn.create({
  studentId,
  emotion: 'SAD', // or ANGRY, WORRIED
  timestamp: new Date()
});

// Send HIGH priority notifications to staff
await sendNotification({
  category: 'EMOTION_SAD', // or EMOTION_ANGRY, EMOTION_WORRIED
  priority: 'HIGH',
  recipients: [
    { userId: student.assignedCoachId, role: 'COACH' },
    { userId: student.balagruhaInChargeId, role: 'BALAGRUHA_IN_CHARGE' },
    { userId: adminIds, role: 'ADMIN' }
  ],
  title: 'Student Emotion Alert',
  message: `${student.name} logged "${emotion}" emotion`,
  metadata: {
    studentId,
    emotion,
    timestamp: checkIn.timestamp,
    location: checkIn.context.location
  },
  actionButton: {
    text: 'View Student Profile',
    url: `/students/${studentId}/profile`
  }
});

return {
  message: "Thanks for letting us know. A coach will check in with you soon.",
  notificationsSent: { coach: true, balagruhaInCharge: true, admin: true }
};
```

**Escalation Logic (Multiple Concerning Check-Ins):**
```javascript
// Check for 3+ negative emotions in last 7 days
const recentConcerningEmotions = await EmotionCheckIn.countDocuments({
  studentId,
  emotion: { $in: ['SAD', 'ANGRY', 'WORRIED'] },
  timestamp: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
});

if (recentConcerningEmotions >= 3) {
  // Additional notification to Amma (senior leadership)
  await sendNotification({
    category: 'EMOTION_PATTERN_ALERT',
    priority: 'HIGH',
    recipientRole: 'AMMA',
    title: 'Student Well-being Pattern Alert',
    message: `${student.name} has logged ${recentConcerningEmotions} concerning emotions in the past 7 days`
  });

  // Auto-create follow-up task for Coach
  await Task.create({
    title: `Follow up on ${student.name}'s emotional well-being`,
    description: `Student has logged ${recentConcerningEmotions} concerning emotions (sad/angry/worried) in past 7 days. Schedule check-in conversation.`,
    assignedTo: student.assignedCoachId,
    deadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
    priority: 'HIGH',
    linkedResource: {
      resourceType: 'EmotionCheckIn',
      resourceId: checkIn._id
    }
  });
}
```

---

#### **16.5.5. Privacy & Transparency**

**Privacy Protections:**
- Only student's assigned staff can view emotion history
- Emotion data retained for 90 days (auto-deletion)
- No public display of emotions (private to staff only)
- No negative consequences for expressing emotions

**Student Transparency:**
- Clear UI message: "Selecting Sad/Angry/Worried will notify your coach"
- Students can see their own emotion history in profile
- System explains this is for support, not punishment

**Compliance:**
- Emotion data classified as sensitive personal information
- Access logs maintained for audit trail
- Only COACH, BALAGRUHA_IN_CHARGE, ADMIN, AMMA roles can access

---

#### **16.5.6. Frontend Implementation**

**Student Desktop UI (Electron):**
```javascript
// Emotion selector component
<EmotionSelector>
  <EmojiButton emoji="😊" emotion="HAPPY" label="Happy" />
  <EmojiButton emoji="😢" emotion="SAD" label="Sad" />
  <EmojiButton emoji="😠" emotion="ANGRY" label="Angry" />
  <EmojiButton emoji="😟" emotion="WORRIED" label="Worried" />
  <EmojiButton emoji="😐" emotion="NEUTRAL" label="Neutral" />
</EmotionSelector>

// Display options:
// 1. Optional prompt at login
// 2. Emotion button always visible in sidebar
// 3. Dismissible prompt (no pressure)
```

**Staff Mobile/Desktop UI:**
```javascript
// When staff receives notification
<EmotionAlertCard>
  <Icon>🚨</Icon>
  <Title>Student Emotion Alert</Title>
  <Message>Arjun Kumar logged "Sad 😢" emotion</Message>
  <Timestamp>10:45 AM | Computer Lab</Timestamp>
  <Actions>
    <Button>View Student Profile</Button>
    <Button>Send Message</Button>
    <Button>Mark as Followed Up</Button>
  </Actions>
</EmotionAlertCard>
```

---

#### **16.5.7. Integration Points**

**With Task Management (Sprint 1):**
- Auto-create follow-up tasks for repeated negative check-ins
- Task notifications sent via mobile app (Notification #73-75)

**With Health Tracking:**
- Emotion data correlated with medical check-ins
- If student has recent illness + negative emotion, context provided

**With SOS System:**
- Recent emotion check-ins shown to SOS responders
- Helps staff understand if emergency related to emotional distress

**With Reporting:**
- Weekly well-being reports for Admins/Amma
- Emotion trends across Balagruhas
- Early intervention opportunity identification

---

#### **16.5.8. Success Metrics**

- Staff acknowledge emotion alerts within 30 minutes (95% target)
- Staff follow up with students within 2 hours (90% target)
- Students feel comfortable expressing emotions (survey feedback >8/10)
- Early intervention prevents escalation (measured by SOS reduction after emotion alerts)

---

## **Section C: Shared & System-Wide Features**

### **17. WebSocket Real-Time Layer [SHARED]**

* **Feature ID:** SHARED-WS-001
* **Feature Name:** Socket.io Real-Time Infrastructure
* **Module:** Real-Time Communications
* **Priority:** P0 (Critical - Blocks S4 Features)
* **Development Timeline:** Week 1 (Days 1-5) - Critical path
* **Dependencies:** None (Foundation)

**Implementation Requirements:**
* Real-time bidirectional communication for messaging and SOS alerts
* JWT authentication for WebSocket connections
* Room-based messaging (user rooms, balagruh rooms, conversation rooms)
* Presence tracking (online/offline status with heartbeat)
* Message queuing for offline users (stored in MongoDB, delivered on reconnect)
* Automatic reconnection handling with exponential backoff

**WebSocket Service Implementation:**
```javascript
// backend/services/socketService.js
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');

class SocketService {
  constructor(server) {
    this.io = socketIO(server, {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
      },
      transports: ['websocket', 'polling']
    });

    this.setupMiddleware();
    this.setupEventHandlers();
  }

  setupMiddleware() {
    // JWT authentication middleware
    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error('Authentication error'));

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(new Error('Authentication error'));
        socket.userId = decoded.userId;
        socket.role = decoded.role;
        next();
      });
    });
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.userId}`);

      // Join user-specific room
      socket.join(`user:${socket.userId}`);

      // Join balagruh rooms if Coach or In-Charge
      if (socket.balagruhIds) {
        socket.balagruhIds.forEach(id => {
          socket.join(`balagruh:${id}`);
        });
      }

      // Handle messaging events
      socket.on('send-message', async (data) => {
        await this.handleMessage(socket, data);
      });

      // Handle SOS events
      socket.on('sos-trigger', async (data) => {
        await this.handleSOSTrigger(socket, data);
      });

      socket.on('sos-response', async (data) => {
        await this.handleSOSResponse(socket, data);
      });

      // Handle typing indicators
      socket.on('typing', (data) => {
        socket.to(`conversation:${data.conversationId}`).emit('typing', {
          userId: socket.userId,
          conversationId: data.conversationId
        });
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.userId}`);
        // Update online status
      });
    });
  }

  async handleMessage(socket, data) {
    const { conversationId, text, attachments } = data;

    // Save message to database
    const message = await Message.create({
      conversationId,
      senderId: socket.userId,
      text,
      attachments,
      timestamp: new Date()
    });

    // Emit to conversation room
    this.io.to(`conversation:${conversationId}`).emit('new-message', message);

    // Send push notification to offline users
    const offlineUsers = await this.getOfflineUsersInConversation(conversationId);
    await this.sendPushNotifications(offlineUsers, 'new-message', message);
  }

  async handleSOSTrigger(socket, data) {
    const { studentId, category, description, location } = data;

    // Create SOS alert in database
    const sosAlert = await SOSAlert.create({
      studentId,
      category,
      description,
      location,
      status: 'sent',
      timestamp: new Date()
    });

    // Emit to Tier 1 responders (Balagruh coaches and in-charge)
    const balagruhId = await this.getStudentBalagruh(studentId);
    this.io.to(`balagruh:${balagruhId}`).emit('sos-alert', sosAlert);

    // Send high-priority push notifications
    const responders = await this.getTier1Responders(balagruhId);
    await this.sendHighPriorityPushNotifications(responders, sosAlert);

    // Start escalation timer
    setTimeout(() => this.escalateToTier2(sosAlert._id), 2 * 60 * 1000); // 2 minutes
  }

  async escalateToTier2(sosAlertId) {
    const sosAlert = await SOSAlert.findById(sosAlertId);
    if (sosAlert.status !== 'sent') return; // Already handled

    // Emit to Tier 2 (Admins)
    this.io.to('role:Admin').emit('sos-escalated', sosAlert);

    // Send SMS and WhatsApp
    await this.sendSMSNotifications(sosAlert);
    await this.sendWhatsAppNotifications(sosAlert);

    // Start Tier 3 timer
    setTimeout(() => this.escalateToTier3(sosAlertId), 3 * 60 * 1000); // 3 more minutes
  }
}

module.exports = SocketService;
```

---

### **18. AWS S3 Media Storage [SHARED]**

* **Feature ID:** SHARED-S3-001
* **Feature Name:** Cloud Media Storage
* **Module:** File Management
* **Priority:** P0 (Critical - Blocks S3 Features)
* **Development Timeline:** Week 1 (Days 1-5) - Critical path
* **Dependencies:** AWS Account Configuration

**Implementation Requirements:**
* Presigned URL generation for secure direct uploads from mobile
* Folder organization (attendance-photos/, course-content/, health-documents/, messaging-attachments/)
* Image optimization pipeline (automatic compression using Sharp library)
* Thumbnail generation for images (200x200px, 400x400px)
* CDN integration with CloudFront for faster delivery
* Backup and versioning policies (30-day retention)

**S3 Service Implementation:**
```javascript
// backend/services/s3Service.js
const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET;

class S3Service {
  // Generate presigned URL for direct upload from mobile
  async generatePresignedUploadUrl(folder, filename, contentType, expiresIn = 300) {
    const key = `${folder}/${Date.now()}-${filename}`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Expires: expiresIn, // URL valid for 5 minutes
      ContentType: contentType,
      ACL: 'private'
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);

    return {
      uploadUrl,
      key,
      cdnUrl: `${process.env.CLOUDFRONT_URL}/${key}`
    };
  }

  // Upload file from server (for backend processing)
  async uploadFile(folder, filename, buffer, contentType) {
    const key = `${folder}/${Date.now()}-${filename}`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: 'private'
    };

    await s3.putObject(params).promise();

    return `${process.env.CLOUDFRONT_URL}/${key}`;
  }

  // Optimize and upload image
  async uploadImage(folder, filename, buffer) {
    // Compress image
    const optimized = await sharp(buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    // Generate thumbnail
    const thumbnail = await sharp(buffer)
      .resize(400, 400, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Upload both
    const imageUrl = await this.uploadFile(folder, filename, optimized, 'image/jpeg');
    const thumbnailUrl = await this.uploadFile(`${folder}/thumbnails`, filename, thumbnail, 'image/jpeg');

    return { imageUrl, thumbnailUrl };
  }

  // Delete file
  async deleteFile(key) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key
    };

    await s3.deleteObject(params).promise();
  }

  // Get file metadata
  async getFileMetadata(key) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key
    };

    return await s3.headObject(params).promise();
  }
}

module.exports = new S3Service();
```

---

## **18.5. Integration with ISF Shop Module (Completed in Sprint 5)**

* **Feature ID:** SPRINT5-SHOP-001
* **Feature Name:** ISF Shop Virtual Rewards Store
* **Module:** E-Commerce & Gamification
* **Priority:** P0 (Critical - Completes ISF Coin Economy)
* **Sprint Attribution:** [S5] Core Implementation, [S3-4] Mobile Delivery & Notification Integration
* **Last Updated:** 2025-11-04 16:33:55
* **Updated By:** Dev Agent (Sprint 5 Integration Documentation)

> **✅ IMPLEMENTATION STATUS: COMPLETED IN SPRINT 5**
>
> The ISF Shop Module is fully implemented and deployed. This section documents how Sprint 3-4 features (mobile app, notifications, task management) integrate with the existing Shop system.
>
> **For complete technical specifications** (database schemas, API endpoints, atomic transaction implementation, Purchase Manager workflows), please refer to **Sprint 2-5 Combined MPSD** documentation.

---

### **18.5.1. System Overview & Sprint 3-4 Integration Points**

The ISF Shop Module completes the gamification loop where students earn ISF Coins (Sprint 2 LMS) and spend them on physical rewards. Sprint 3-4 contributes the following integration points:

**1. Mobile App Integration (Sprint 3)**
- Coach delivery management interface (React Native)
- Mobile delivery dashboard with pending/completed tabs
- Push notification handling for new orders
- Access: Available to all 8 staff roles with mobile app access

**2. Notification System Integration (Sprint 4)**
- 18 New shop-related notification categories
- Real-time delivery alerts for coaches
- Purchase request approval notifications for admins
- Low stock alerts for Purchase Managers

**3. Task Management Integration (Sprint 1)**
- Auto-create delivery tasks for coaches when students place orders
- Auto-create low stock monitoring tasks for Purchase Managers
- Mobile task notifications via Sprint 4 system

**Key Technical Architecture:**
- **3 User Workflows**: Students (Desktop), Coaches (Mobile), Purchase Managers (Desktop/Web)
- **Atomic Transactions**: MongoDB transactions for checkout (coin deduction + stock decrement)
- **3 Core Schemas**: Product, ShopOrder, PurchaseRequest
- **Real-Time Updates**: WebSocket notifications for instant delivery alerts

---

### **18.5.2. Notification System Integration (Sprint 4)**

**18 New Shop-Related Notification Categories:**

| # | Category | Description | Priority | Recipient Roles |
|---|----------|-------------|----------|-----------------|
| #58 | `new_order_pending_delivery` | Coach notified of new shop order ready for delivery | HIGH | Coach |
| #59 | `order_delivered` | Student notified when coach marks order as delivered | MEDIUM | Student |
| #60 | `order_cancelled` | Student notified if order is cancelled | HIGH | Student |
| #61 | `low_stock_alert` | Purchase Manager notified when product stock < threshold | HIGH | Purchase Manager |
| #62 | `out_of_stock_alert` | Admin notified when product reaches 0 stock | CRITICAL | Admin, Purchase Manager |
| #63 | `purchase_request_submitted` | Admin notified of new purchase request for approval | HIGH | Admin |
| #64 | `purchase_request_approved` | Purchase Manager notified of request approval | HIGH | Purchase Manager |
| #65 | `purchase_request_rejected` | Purchase Manager notified of request rejection with reason | HIGH | Purchase Manager |
| #66 | `stock_replenished` | Admin notified when Purchase Manager updates stock | MEDIUM | Admin |
| #67 | `wishlist_item_restocked` | Student notified when wishlisted item is back in stock | LOW | Student |
| #35-37 | Shop order status updates | Various order lifecycle notifications | MEDIUM-HIGH | Student, Coach |
| #40-41 | Bulk delivery reminders | Coach notified of pending deliveries batch | MEDIUM | Coach |
| #7 | Shop coin balance low | Student reminded when coin balance runs low | LOW | Student |

**Technical Implementation:**
- All notifications use the unified notification system (Section 19)
- WebSocket real-time delivery for mobile app (<5 seconds)
- Push notifications for mobile roles (FCM for Android, APNs for iOS)
- Email fallback for critical alerts (out of stock, purchase request rejections)

---

### **18.5.3. Task Management Integration (Sprint 1)**

**Auto-Created Tasks:**

1. **Shop Order Delivery Tasks** (created during checkout)
   ```javascript
   // When student completes checkout (atomic transaction)
   await Task.create([{
     title: `Deliver shop order ${orderId} to ${studentName}`,
     assignedTo: student.assignedCoachId,
     assignedToRole: 'COACH',
     deadline: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours
     priority: 'MEDIUM',
     linkedResource: {
       resourceType: 'ShopOrder',
       resourceId: orderId
     },
     metadata: {
       orderDetails: { items, totalCoins, deliveryInstructions }
     }
   }], { session });
   // Note: Created within same MongoDB transaction as order + coin deduction + stock decrement
   ```


2. **Low Stock Monitoring Tasks** (when product stock falls below threshold)
   ```javascript
   // Triggered when product.stockQuantity < product.lowStockThreshold
   await Task.create({
     title: `Replenish low stock - ${productName} (${currentStock} remaining)`,
     assignedTo: purchaseManagerId,
     assignedToRole: 'PURCHASE_MANAGER',
     deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
     priority: 'HIGH',
     linkedResource: {
       resourceType: 'Product',
       resourceId: productId
     }
   });
   ```

**Task Notifications:**
All shop-related tasks trigger mobile notifications for the 8 roles with mobile app access:
- Notification #73: Task assigned
- Notification #74: Task deadline approaching
- Notification #75: Task overdue

---

### **18.5.4. Key System Features (Already Implemented)**

**Student Shop Experience (Desktop):**
- Product browsing with cart, checkout, and order history
- Real-time coin balance validation
- Atomic checkout transactions (coin deduction + stock decrement)

**Coach Delivery Management (Mobile):**
- Delivery dashboard with pending/completed tabs
- One-tap order completion
- Batch delivery mode for efficiency

**Purchase Manager Procurement (Desktop/Web):**
- Multi-product purchase request creation (Stories 17-18-19)
- Supplier quotation attachment support (max 5 files, 10MB each)
- Stock update workflows after supplier deliveries
- Complete audit trail for compliance

**Admin Management:**
- Product catalog management (CRUD)
- Purchase request approval/rejection workflows
- Inventory analytics and low-stock alerts
- Self-approval prevention for security

---

### **18.5.5. Success Metrics**

**Student Experience:**
- Cart validation prevents insufficient coin checkouts (100% accuracy)
- Orders delivered within 24-48 hours (95% on-time rate)
- Zero inventory discrepancies (atomic transactions)

**Coach Mobile Experience:**
- Delivery notifications received <5 seconds (WebSocket)
- Mobile interface completion time <2 minutes per order
- Complete timestamp tracking for all deliveries

**Purchase Manager Workflow:**
- Multi-product requests save 60% time vs single-product
- Stock updates complete without errors (atomic MongoDB transactions)
- Complete audit trail for compliance

**System Performance:**
- Checkout API response time <500ms
- Concurrent checkout handling (10+ simultaneous orders)
- Zero coin balance inconsistencies (transactional integrity)

---

**This section completes the documentation of Sprint 3-4 integration points with the ISF Shop Module (already completed in Sprint 5).**

**For complete Shop Module implementation details**, including:
- Full database schemas (Product, ShopOrder, PurchaseRequest)
- Complete API endpoint specifications
- Atomic transaction implementation code
- Purchase Manager Stories 17-18-19 detailed workflows
- Frontend component architecture

**Please refer to Sprint 2-5 Combined MPSD documentation.**

---

## **19. Notification System Architecture [SHARED]**
* **Feature ID:** SHARED-NOTIFICATION-001
* **Feature Name:** Unified Notification System
* **Module:** Notifications & Real-Time Communications
* **Priority:** P0 (Critical - Cross-Sprint Foundation)
* **Sprint Attribution:** [S1] Infrastructure Built, [S4] Comprehensive Integration, [S5] Shop Integration
* **Last Updated:** 2025-11-04 14:23:32 (via `date '+%Y-%m-%d %H:%M:%S'`)
* **Updated By:** Dev Agent (Documentation Update)

---

### **19.1. System Overview & Infrastructure [Sprint 1 - IMPLEMENTED]**

The ISF Playground notification system provides a comprehensive, real-time notification platform that enables communication across all features and user roles. Built during Sprint 1 as foundational infrastructure, the system supports personal, common, and system-wide notifications with intelligent routing, priority handling, and multi-channel delivery.

**Key Capabilities:**
* Persistent notification storage with MongoDB
* Real-time delivery via WebSocket (Socket.io)
* Push notification support (Sprint 3 - Firebase Cloud Messaging)
* SMS and WhatsApp integration (Sprint 4 - Optional)
* Smart unread counting with last-viewed tracking
* Time-To-Live (TTL) auto-expiration
* Priority-based notification handling (LOW, MEDIUM, HIGH, URGENT)
* Category-based notification taxonomy (75 total categories - expanded in Sprint 3-4-5 integration)

**Database Models:**

**Notification Schema:**
```javascript
// backend/models/notification.js
const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
    // Optional: null for COMMON notifications targeting all users
  },

  title: {
    type: String,
    required: true,
    maxlength: 200
  },

  message: {
    type: String,
    required: true,
    maxlength: 1000
  },

  type: {
    type: String,
    enum: ['PERSONAL', 'COMMON', 'ACHIEVEMENT', 'COACH_MESSAGE', 'SYSTEM_UPDATE'],
    default: 'PERSONAL',
    index: true
  },

  category: {
    type: String,
    enum: [
      // Sprint 1 & 5 - Implemented (12 categories)
      'WTF_PIN_ADDED',
      'COINS_AWARDED',
      'ACHIEVEMENT_UNLOCKED',
      'COACH_MESSAGE',
      'ISF_SHOP_UPDATE',
      'SYSTEM_ANNOUNCEMENT',
      'TASK_ASSIGNED',
      'ATTENDANCE_REMINDER',
      'WORKSHOP_ANNOUNCEMENT',
      'COMMUNITY_UPDATE',
      'NEW_CONTENT',
      'GENERAL',

      // Sprint 4 - To Be Implemented (42 new categories)
      // Task Management (6)
      'TASK_COMPLETED',
      'TASK_DEADLINE_APPROACHING',
      'TASK_OVERDUE',
      'TASK_COMMENT_ADDED',
      'TASK_STATUS_CHANGED',
      'TASK_UPDATED',

      // Medical System (8)
      'MEDICAL_ALERT_CRITICAL',
      'MEDICAL_ALERT_WARNING',
      'MEDICAL_CHECKIN_REMINDER',
      'MEDICAL_CHECKIN_COMPLETED',
      'MEDICAL_RECORD_UPDATED',
      'MEDICAL_VACCINATION_DUE',
      'MEDICAL_PRESCRIPTION_ADDED',
      'MEDICAL_STATUS_CHANGE',

      // Course/Learning (5)
      'COURSE_ASSIGNED',
      'COURSE_ENROLLED',
      'COURSE_COMPLETED',
      'COURSE_MODULE_UNLOCKED',
      'QUIZ_RESULTS_AVAILABLE',

      // Training Sessions (4)
      'SESSION_ASSIGNED',
      'SESSION_REMINDER',
      'SESSION_CANCELLED',
      'SESSION_ATTENDANCE_MARKED',

      // Attendance (3)
      'ATTENDANCE_MARKED',
      'ATTENDANCE_ABSENT',
      'ATTENDANCE_SUMMARY',

      // Purchase/Inventory (7)
      'PURCHASE_REQUEST_SUBMITTED',
      'PURCHASE_REQUEST_APPROVED',
      'PURCHASE_REQUEST_REJECTED',
      'PURCHASE_ORDER_ASSIGNED',
      'PURCHASE_ORDER_COMPLETED',
      'INVENTORY_LOW_STOCK',
      'INVENTORY_OUT_OF_STOCK',

      // Repair/Maintenance (3)
      'REPAIR_REQUEST_SUBMITTED',
      'REPAIR_REQUEST_IN_PROGRESS',
      'REPAIR_REQUEST_COMPLETED',

      // Shop/Coins (4)
      'SHOP_ORDER_PLACED',
      'SHOP_ORDER_DELIVERED',
      'SHOP_PRODUCT_AVAILABLE',
      'COINS_DEDUCTED',

      // WTF Enhancements (2)
      'WTF_SUBMISSION_APPROVED',
      'WTF_INTERACTION',

      // SOS Emergency (Sprint 4) (3)
      'SOS_EMERGENCY',
      'SOS_ESCALATED',
      'SOS_RESOLVED',

      // Messaging (Sprint 4) (3)
      'MESSAGE_DIRECT',
      'MESSAGE_GROUP',
      'MESSAGE_MENTION',

      // NEW: Shop/Purchase Detailed (Sprint 5 Integration) (10)
      'SHOP_ORDER_APPROVED',
      'SHOP_ORDER_REJECTED',
      'ORDER_READY_FOR_DELIVERY',
      'WISHLIST_ITEM_RESTOCKED',
      'INSUFFICIENT_COINS',
      'NEW_ORDER_PENDING_DELIVERY',
      'MULTIPLE_ORDERS_BATCH',
      'DELIVERY_COMPLETED',
      'STOCK_UPDATED',
      'PURCHASE_REQUEST_CANCELLED',

      // NEW: Emotion Check-In (Sprint 4) (5)
      'EMOTION_HAPPY',
      'EMOTION_SAD',
      'EMOTION_ANGRY',
      'EMOTION_WORRIED',
      'EMOTION_NEUTRAL',

      // NEW: Task Management Mobile (Sprint 3-4) (3)
      'TASK_ASSIGNED_MOBILE',
      'TASK_DEADLINE_MOBILE',
      'TASK_OVERDUE_MOBILE'
    ],
    required: true,
    default: 'GENERAL',
    index: true
  },

  isRead: {
    type: Boolean,
    default: false,
    index: true
  },

  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
    default: 'MEDIUM'
  },

  metadata: {
    type: mongoose.Schema.Types.Mixed,
    // Flexible object for category-specific data
    // Examples:
    //   { pinId, contentType, actionUrl } for WTF_PIN_ADDED
    //   { coinAmount, source, actionUrl } for COINS_AWARDED
    //   { orderId, orderNumber } for SHOP_ORDER_DELIVERED
    //   { taskId, deadline, assignedBy } for TASK_ASSIGNED
    //   { studentId, temperature, checkInId } for MEDICAL_ALERT_CRITICAL
  },

  expiresAt: {
    type: Date,
    // Optional: Notifications auto-delete after this date
    // Useful for time-sensitive alerts
  },

  targetAudience: [{
    type: String
    // Array of role names or user IDs for COMMON notifications
    // Examples: ['student'], ['coach', 'admin'], ['balagruha-incharge']
  }],

  isGlobal: {
    type: Boolean,
    default: false
    // True for system-wide notifications (all users)
  }
}, {
  timestamps: true // createdAt, updatedAt
});

// Indexes for performance
NotificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 }); // User queries
NotificationSchema.index({ type: 1, category: 1, createdAt: -1 }); // Category filtering
NotificationSchema.index({ isGlobal: 1, createdAt: -1 }); // Global notifications
NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

// Virtual for notification age
NotificationSchema.virtual('age').get(function() {
  return Date.now() - this.createdAt.getTime();
});
```

**UserNotificationView Schema (Optimized Unread Tracking):**
```javascript
// backend/models/userNotificationView.js
const UserNotificationViewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },

  lastViewedAt: {
    type: Date,
    default: Date.now
  },

  unreadCount: {
    type: Number,
    default: 0,
    min: 0
  }
});

// Method to update last viewed timestamp
UserNotificationViewSchema.methods.markViewed = async function() {
  this.lastViewedAt = new Date();
  this.unreadCount = 0;
  await this.save();
};

// Method to calculate unread count efficiently
UserNotificationViewSchema.methods.calculateUnreadCount = async function() {
  const Notification = mongoose.model('Notification');
  const count = await Notification.countDocuments({
    userId: this.userId,
    isRead: false,
    createdAt: { $gt: this.lastViewedAt }
  });
  this.unreadCount = count;
  await this.save();
  return count;
};
```

---

### **19.2. Notification Types & Creation Methods**

The notification system supports three distinct notification types, each with specific use cases and creation methods:

#### **19.2.1. Personal Notifications (User-Specific)**

Personal notifications target a single specific user. These are the most common notification type.

**Use Cases:**
* Task assigned to a student
* Coins awarded to a student
* Shop order delivered
* Achievement unlocked
* Medical check-in reminder

**Creation Method:**
```javascript
// backend/services/notification.js
async createPersonal(userId, title, message, category, metadata = {}) {
  const notification = await Notification.create({
    userId,
    title,
    message,
    type: 'PERSONAL',
    category,
    priority: this.determinePriority(category),
    metadata,
    isRead: false
  });

  // Emit via WebSocket for real-time delivery
  await socketService.emitToUser(userId, 'notification', notification);

  // Send push notification if user has FCM token
  await this.sendPushNotification(userId, notification);

  return notification;
}
```

**Example:**
```javascript
await Notification.createPersonal(
  studentId,
  "New Task Assigned",
  "Complete Art Project submission by tomorrow 5 PM",
  "TASK_ASSIGNED",
  {
    taskId: "task_123",
    deadline: "2025-11-05T17:00:00Z",
    assignedBy: "Coach Rajesh",
    actionUrl: "/tasks/task_123"
  }
);
```

#### **19.2.2. Common Notifications (Role/Group-Based)**

Common notifications target a specific group of users based on role or other criteria.

**Use Cases:**
* New shop products available (all students)
* New course published (all coaches)
* System maintenance announcement (all admins)
* Balagruha-specific updates (all users in one Balagruha)

**Creation Method:**
```javascript
async createCommon(title, message, category, targetAudience = [], metadata = {}) {
  const notification = await Notification.create({
    userId: null, // No specific user
    title,
    message,
    type: 'COMMON',
    category,
    priority: this.determinePriority(category),
    metadata,
    targetAudience, // ['student'], ['coach', 'admin'], etc.
    isRead: false
  });

  // Emit to role-based rooms via WebSocket
  for (const role of targetAudience) {
    await socketService.emitToRole(role, 'notification', notification);
  }

  // Send push notifications to all users matching target audience
  await this.sendRoleBasedPushNotifications(targetAudience, notification);

  return notification;
}
```

**Example:**
```javascript
await Notification.createCommon(
  "New Shop Items Available!",
  "Check out the latest products in the ISF Shop. Limited stock available!",
  "ISF_SHOP_UPDATE",
  ['student'], // Target only students
  {
    newProductCount: 5,
    actionUrl: "/shop"
  }
);
```

#### **19.2.3. System-Wide Notifications (Broadcast to All)**

System-wide notifications are sent to ALL users regardless of role.

**Use Cases:**
* Critical system announcements
* Emergency maintenance
* Major feature launches
* Holiday announcements

**Creation Method:**
```javascript
async createSystemWide(title, message, category, metadata = {}) {
  const notification = await Notification.create({
    userId: null,
    title,
    message,
    type: 'SYSTEM_UPDATE',
    category: category || 'SYSTEM_ANNOUNCEMENT',
    priority: 'HIGH',
    metadata,
    isGlobal: true,
    isRead: false
  });

  // Emit to all connected users via WebSocket
  await socketService.broadcastToAll('notification', notification);

  // Send push notification to ALL users with FCM tokens
  await this.sendBroadcastPushNotifications(notification);

  return notification;
}
```

**Example:**
```javascript
await Notification.createSystemWide(
  "System Maintenance Tonight",
  "ISF Playground will be under maintenance from 11 PM to 2 AM. Please save your work.",
  "SYSTEM_ANNOUNCEMENT",
  {
    maintenanceStart: "2025-11-04T23:00:00Z",
    maintenanceEnd: "2025-11-05T02:00:00Z",
    affectedServices: ["shop", "courses"]
  }
);
```

---

### **19.3. Complete Notification Category Reference (54 Categories)**

The table below provides a complete reference of all notification categories in the ISF Playground system, including their status, priority, and target roles.

| # | Category | Description | Default Priority | Sprint | Status | Target Roles |
|---|----------|-------------|-----------------|--------|--------|--------------|
| **SPRINT 1 & 5 - IMPLEMENTED (12 categories)** |
| 1 | `WTF_PIN_ADDED` | Student's work featured on Wall of Fame | MEDIUM | S1 | ✅ Implemented | Student (personal + common broadcast) |
| 2 | `COINS_AWARDED` | ISF coins earned for tasks/achievements | MEDIUM | S1 | ✅ Implemented | Student |
| 3 | `ACHIEVEMENT_UNLOCKED` | Student unlocked a new achievement/badge | HIGH | S1 | ✅ Implemented | Student (personal + common broadcast) |
| 4 | `COACH_MESSAGE` | Direct message from coach to student | HIGH | S1 | ✅ Implemented | Student |
| 5 | `ISF_SHOP_UPDATE` | New products, shop announcements, order updates | MEDIUM | S5 | ✅ Implemented | Student, Coach, Purchase Manager |
| 6 | `SYSTEM_ANNOUNCEMENT` | System-wide important announcements | HIGH | S1 | ✅ Implemented | All users |
| 7 | `TASK_ASSIGNED` | Task assigned to user (infrastructure exists) | HIGH | S1 | ⚠️ Partial (schema only) | Student, Coach, Purchase Mgr, Medical In-charge |
| 8 | `ATTENDANCE_REMINDER` | Daily attendance not completed | MEDIUM | S1 | ⚠️ Partial (schema only) | Balagruha In-charge |
| 9 | `WORKSHOP_ANNOUNCEMENT` | Workshop or event announced | MEDIUM | S1 | ⚠️ Partial (schema only) | Student, Coach |
| 10 | `COMMUNITY_UPDATE` | Community content or updates | LOW | S1 | ⚠️ Partial (schema only) | All users |
| 11 | `NEW_CONTENT` | New course content available | MEDIUM | S1 | ⚠️ Partial (schema only) | Student |
| 12 | `GENERAL` | General notifications | LOW | S1 | ✅ Implemented | All users |
| **SPRINT 4 - TASK MANAGEMENT (6 categories)** |
| 13 | `TASK_COMPLETED` | Task marked as completed | MEDIUM | S4 | 📋 Planned | Task creator (Coach, Admin) |
| 14 | `TASK_DEADLINE_APPROACHING` | Task due within 24 hours | HIGH | S4 | 📋 Planned | Task assignee (Student, Staff) |
| 15 | `TASK_OVERDUE` | Task past deadline | HIGH | S4 | 📋 Planned | Task assignee, Task creator |
| 16 | `TASK_COMMENT_ADDED` | New comment on task | MEDIUM | S4 | 📋 Planned | Task participants |
| 17 | `TASK_STATUS_CHANGED` | Task status updated | MEDIUM | S4 | 📋 Planned | Task assignee, Task creator |
| 18 | `TASK_UPDATED` | Task details modified | LOW | S4 | 📋 Planned | Task assignee |
| **SPRINT 4 - MEDICAL SYSTEM (8 categories - HIGHEST PRIORITY)** |
| 19 | `MEDICAL_ALERT_CRITICAL` | Temperature ≥102°F, immediate attention | URGENT | S4 | 📋 Planned | Medical In-charge, Balagruha In-charge, Admin, Amma |
| 20 | `MEDICAL_ALERT_WARNING` | Temperature 100-102°F, monitor closely | HIGH | S4 | 📋 Planned | Medical In-charge, Balagruha In-charge |
| 21 | `MEDICAL_CHECKIN_REMINDER` | Daily check-in not completed | MEDIUM | S4 | 📋 Planned | Medical In-charge |
| 22 | `MEDICAL_CHECKIN_COMPLETED` | Check-in recorded for student | LOW | S4 | 📋 Planned | Balagruha In-charge (summary) |
| 23 | `MEDICAL_RECORD_UPDATED` | Medical history or prescription added | MEDIUM | S4 | 📋 Planned | Medical In-charge, Balagruha In-charge |
| 24 | `MEDICAL_VACCINATION_DUE` | Vaccination due in 7 days, 3 days, TODAY | HIGH | S4 | 📋 Planned | Medical In-charge, Student |
| 25 | `MEDICAL_PRESCRIPTION_ADDED` | New prescription uploaded | MEDIUM | S4 | 📋 Planned | Medical In-charge |
| 26 | `MEDICAL_STATUS_CHANGE` | Medical case status changed | MEDIUM | S4 | 📋 Planned | Medical In-charge, Balagruha In-charge |
| **SPRINT 4 - COURSE/LEARNING (5 categories)** |
| 27 | `COURSE_ASSIGNED` | New course assigned to student | MEDIUM | S4 | 📋 Planned | Student |
| 28 | `COURSE_ENROLLED` | Student enrolled in course | LOW | S4 | 📋 Planned | Coach, Admin |
| 29 | `COURSE_COMPLETED` | Course completed with coin rewards | HIGH | S4 | 📋 Planned | Student, Coach |
| 30 | `COURSE_MODULE_UNLOCKED` | New module available in course | MEDIUM | S4 | 📋 Planned | Student |
| 31 | `QUIZ_RESULTS_AVAILABLE` | Quiz graded, results ready | MEDIUM | S4 | 📋 Planned | Student |
| **SPRINT 4 - TRAINING SESSIONS (4 categories)** |
| 32 | `SESSION_ASSIGNED` | Training session assigned to student | MEDIUM | S4 | 📋 Planned | Student |
| 33 | `SESSION_REMINDER` | Session starting in 1 hour or 30 minutes | HIGH | S4 | 📋 Planned | Student, Coach |
| 34 | `SESSION_CANCELLED` | Session cancelled or rescheduled | HIGH | S4 | 📋 Planned | Student |
| 35 | `SESSION_ATTENDANCE_MARKED` | Attendance recorded for session | LOW | S4 | 📋 Planned | Coach |
| **SPRINT 4 - ATTENDANCE (3 categories)** |
| 36 | `ATTENDANCE_MARKED` | Attendance recorded for student | LOW | S4 | 📋 Planned | Student, Balagruha In-charge |
| 37 | `ATTENDANCE_ABSENT` | Student marked absent | HIGH | S4 | 📋 Planned | Balagruha In-charge, Admin |
| 38 | `ATTENDANCE_SUMMARY` | Daily attendance summary | LOW | S4 | 📋 Planned | Balagruha In-charge, Admin |
| **SPRINT 4 - PURCHASE/INVENTORY (7 categories)** |
| 39 | `PURCHASE_REQUEST_SUBMITTED` | New purchase request created | MEDIUM | S4 | 📋 Planned | Admin, Amma (for approval) |
| 40 | `PURCHASE_REQUEST_APPROVED` | Purchase request approved | HIGH | S4 | 📋 Planned | Purchase Manager (requester) |
| 41 | `PURCHASE_REQUEST_REJECTED` | Purchase request rejected | HIGH | S4 | 📋 Planned | Purchase Manager (requester) |
| 42 | `PURCHASE_ORDER_ASSIGNED` | Purchase order created and assigned | MEDIUM | S4 | 📋 Planned | Purchase Manager |
| 43 | `PURCHASE_ORDER_COMPLETED` | Purchase order fulfilled | MEDIUM | S4 | 📋 Planned | Purchase Manager, Admin |
| 44 | `INVENTORY_LOW_STOCK` | Product stock below threshold | HIGH | S4 | 📋 Planned | Purchase Manager, Admin |
| 45 | `INVENTORY_OUT_OF_STOCK` | Product out of stock | URGENT | S4 | 📋 Planned | Purchase Manager, Admin |
| **SPRINT 4 - REPAIR/MAINTENANCE (3 categories)** |
| 46 | `REPAIR_REQUEST_SUBMITTED` | New repair request created | MEDIUM | S4 | 📋 Planned | Admin, Balagruha In-charge |
| 47 | `REPAIR_REQUEST_IN_PROGRESS` | Repair work started | MEDIUM | S4 | 📋 Planned | Requester |
| 48 | `REPAIR_REQUEST_COMPLETED` | Repair completed | MEDIUM | S4 | 📋 Planned | Requester, Admin |
| **SPRINT 4 - SHOP/COINS (4 categories)** |
| 49 | `SHOP_ORDER_PLACED` | Student placed shop order | MEDIUM | S4 | 📋 Planned | Student |
| 50 | `SHOP_ORDER_DELIVERED` | Order delivered by coach | HIGH | S5 | ✅ Implemented | Student |
| 51 | `SHOP_PRODUCT_AVAILABLE` | Product back in stock | MEDIUM | S4 | 📋 Planned | Student |
| 52 | `COINS_DEDUCTED` | Coins spent on purchase | LOW | S4 | 📋 Planned | Student |
| **SPRINT 4 - WTF ENHANCEMENTS (2 categories)** |
| 53 | `WTF_SUBMISSION_APPROVED` | Student's WTF submission approved | MEDIUM | S4 | 📋 Planned | Student |
| 54 | `WTF_INTERACTION` | Engagement on user's WTF content (likes) | LOW | S4 | 📋 Planned | Student |
| **SPRINT 4 - SOS EMERGENCY (3 categories)** |
| 55 | `SOS_EMERGENCY` | Student triggered SOS alert | URGENT | S4 | 📋 Planned | Coach, Balagruha In-charge, Admin |
| 56 | `SOS_ESCALATED` | SOS escalated to next tier | URGENT | S4 | 📋 Planned | Admin, Amma (Tier 2+) |
| 57 | `SOS_RESOLVED` | SOS emergency resolved | MEDIUM | S4 | 📋 Planned | All previous recipients |

**Legend:**
- ✅ **Implemented** - Fully operational with triggers
- ⚠️ **Partial** - Schema exists, triggers not implemented
- 📋 **Planned** - Sprint 3-4 requirement, to be implemented

---

### **19.4. Delivery Mechanisms**

The notification system supports multiple delivery channels to ensure users receive important information through their preferred medium.

#### **19.4.1. WebSocket Real-Time Delivery [Sprint 1 - IMPLEMENTED]**

**Purpose:** Instant notification delivery to connected users without polling.

**Technology:** Socket.io with JWT authentication

**How It Works:**
1. User authenticates and connects to WebSocket server
2. Server assigns user to personal room (`user:{userId}`) and role rooms (`role:{roleName}`)
3. When notification created, server emits to appropriate room(s)
4. Connected clients receive notification instantly via WebSocket event
5. Client displays notification in UI (badge, toast, notification center)

**Message Format:**
```javascript
// Personal notification
{
  type: "notification",
  data: {
    id: "notif_abc123",
    title: "New Task Assigned",
    message: "Complete Art Project submission by tomorrow 5 PM",
    category: "TASK_ASSIGNED",
    priority: "HIGH",
    metadata: {
      taskId: "task_123",
      actionUrl: "/tasks/task_123"
    },
    timestamp: "2025-11-04T14:23:32Z"
  }
}

// Unread count update
{
  type: "unread_count_update",
  data: {
    unreadCount: 5
  }
}
```

**Advantages:**
- Instant delivery (< 100ms latency)
- No battery drain from polling
- Bidirectional communication
- Supports typing indicators, presence tracking

**Limitations:**
- Requires active connection
- Doesn't work offline
- Fallback needed for disconnected users

#### **19.4.2. REST API Retrieval [Sprint 1 - IMPLEMENTED]**

**Purpose:** Fetch notification history and catch up on missed notifications.

**Endpoints:**
```yaml
GET /api/notifications/user
  - Get user's notifications (paginated)
  - Query: limit=20, offset=0, category, unreadOnly=true
  - Response: { notifications: [...], total: 127, unreadCount: 5 }

GET /api/notifications/unread-count
  - Get unread count only (fast query)
  - Response: { unreadCount: 5 }

PUT /api/notifications/:id/read
  - Mark single notification as read
  - Response: { success: true }

PUT /api/notifications/mark-all-read
  - Mark all notifications as read
  - Response: { success: true, markedCount: 5 }

POST /api/notifications (Admin only)
  - Create notification manually
  - Request: { userId, title, message, category, priority, metadata }
  - Response: { notification: {...} }

DELETE /api/notifications/:id
  - Delete notification
  - Response: { success: true }
```

**Use Cases:**
- App launch (fetch missed notifications)
- Notification center pagination
- Manual notification refresh
- Catching up after offline period

#### **19.4.3. Mobile Push Notifications [Sprint 3]**

**Purpose:** Deliver notifications to mobile devices even when app is closed.

**Technology:** Firebase Cloud Messaging (FCM) for iOS and Android

**Implementation Requirements:**
1. Device token registration on app launch
2. Token storage in User.mobileDevices array
3. Push notification payload construction
4. FCM API integration for sending
5. Deep linking configuration

**Push Notification Payload:**
```javascript
{
  notification: {
    title: "New Task Assigned",
    body: "Complete Art Project submission by tomorrow 5 PM",
    sound: "default", // or "urgent.mp3" for URGENT priority
    badge: 5, // Unread count
    icon: "ic_notification"
  },
  data: {
    notificationId: "notif_abc123",
    category: "TASK_ASSIGNED",
    priority: "HIGH",
    actionUrl: "/tasks/task_123",
    metadata: JSON.stringify({ taskId: "task_123" })
  },
  android: {
    priority: "high", // or "max" for URGENT
    notification: {
      channelId: "tasks", // Android notification channel
      color: "#1E40AF" // ISF Blue
    }
  },
  apns: {
    headers: {
      "apns-priority": "10" // or "5" for normal
    },
    payload: {
      aps: {
        sound: "default",
        badge: 5
      }
    }
  }
}
```

**Priority Mapping:**
- **URGENT** → Sound: urgent.mp3, Vibration pattern, Full-screen alert, Max priority
- **HIGH** → Sound: default, Vibration, Banner notification, High priority
- **MEDIUM** → Sound: default, Badge only, Normal priority
- **LOW** → Silent, Badge only, Low priority

**Deep Linking:**
Mobile app opens specific screen based on notification category:
- `TASK_ASSIGNED` → `/tasks/{taskId}`
- `MEDICAL_ALERT_CRITICAL` → `/medical/checkins/{checkInId}`
- `SHOP_ORDER_DELIVERED` → `/shop/orders/{orderId}`
- `SOS_EMERGENCY` → `/sos/alerts/{sosAlertId}`

#### **19.4.4. SMS Integration [Sprint 4 - SOS Only]**

**Purpose:** Emergency SMS for SOS Tier 2 escalation when push notifications fail.

**Technology:** Twilio or AWS SNS

**Use Cases:**
- SOS Tier 2 escalation (2-5 minutes after trigger)
- Critical medical alerts (temperature ≥102°F)

**Message Template:**
```
[ISF EMERGENCY] Student [Name] triggered SOS - Category: [Medical/Safety/Mental Health].
Location: [Building].
Respond immediately via mobile app.
```

**Rate Limiting:** Max 3 SMS per recipient per hour (prevent spam)

#### **19.4.5. WhatsApp Integration [Sprint 4 - OPTIONAL/MINIMAL]**

**Purpose:** Optional WhatsApp notifications for critical alerts (client may defer).

**Technology:** Twilio WhatsApp API or 360Dialog

**Status:** OPTIONAL - Client decision pending. If implemented, keep MINIMAL (10 critical types only).

**Recommended WhatsApp Notifications (10 types):**
1. `MEDICAL_ALERT_CRITICAL` (≥102°F only)
2. `MEDICAL_VACCINATION_DUE` (due TODAY only)
3. `TASK_ASSIGNED` (HIGH priority only)
4. `TASK_OVERDUE` (HIGH priority only)
5. `SESSION_REMINDER` (30 min before)
6. `SESSION_CANCELLED` (last-minute only)
7. `PURCHASE_REQUEST_URGENT` (high-value items for Amma approval)
8. `SOS_EMERGENCY` (Tier 2+ escalation)
9. `ATTENDANCE_ABSENT` (3+ consecutive days)
10. `SYSTEM_ANNOUNCEMENT` (critical only)

**Throttling:**
```javascript
whatsappSettings: {
  enabled: false, // Default OFF - admin can enable
  maxPerUserPerDay: 5,
  cooldownMinutes: 60,
  userOptInRequired: true
}
```

**Message Template Example:**
```
*ISF Playground Alert*
[Student Name] has triggered a Medical Emergency.
Temperature: 103°F
Staff have been notified.
Reply STOP to unsubscribe.
```

---

### **19.5. Implemented Notifications (Sprint 1 & 5 - OPERATIONAL)**

The following notification types are fully implemented and operational:

#### **19.5.1. WTF Pin Notifications [Sprint 1]**

**Trigger:** When admin pins student's work to WTF board

**Location:** `backend/services/wtf.js` (lines 515-530)

**Notifications Created:**
1. **Personal to Student:**
   - Title: "WTF Feature!"
   - Message: "Your [content type] '[title]' has been featured on the WTF board!"
   - Category: `WTF_PIN_ADDED`
   - Metadata: `{ pinId, contentType, title, actionUrl: "/wtf" }`

2. **Common to All Students:**
   - Title: "New WTF Content!"
   - Message: "New [content type] featured on WTF! Check it out!"
   - Category: `WTF_PIN_ADDED`
   - Target Audience: `['student']`

**Code Example:**
```javascript
// backend/services/wtf.js
await notificationService.notifyWtfPinAdded(studentId, {
  pinId: pin._id,
  contentType: submission.type,
  title: submission.title
});
```

#### **19.5.2. Coin Award Notifications [Sprint 1]**

**Triggers:**
- Task completion with coin reward
- WTF pin creation reward
- Manual coin award by admin

**Location:** `backend/services/coin.js` (line 97), `backend/services/wtf.js` (line 2817)

**Notification:**
- Title: "ISF Coins Awarded!"
- Message: "You've earned [X] ISF coins for: [description]"
- Category: `COINS_AWARDED`
- Metadata: `{ coinAmount, coinSource, description, actionUrl: "/wallet" }`

#### **19.5.3. Shop Order Notifications [Sprint 5]**

**Trigger 1:** Student completes purchase
**Location:** `backend/models/order.js` (lines 305-324)

**Notification to Coaches (Delivery Assignment):**
- Title: "New Delivery"
- Message: "[Student Name] ordered [X] item(s) - Order [Order Number]"
- Category: `ISF_SHOP_UPDATE`
- Target: Coaches in student's Balagruha

**Trigger 2:** Coach marks order as delivered
**Location:** `backend/controllers/coachDeliveryController.js` (lines 272-284)

**Notification to Student:**
- Title: "Order Delivered"
- Message: "Your order [Order Number] has been delivered by Coach [Name]!"
- Category: `ISF_SHOP_UPDATE`
- Metadata: `{ orderId, orderNumber, coachName, actionUrl: "/shop/orders" }`

---

### **19.6. Sprint 3-4 Notification Requirements - Implementation Guide**

The following 42 new notification categories must be implemented in Sprint 3-4. Each category includes trigger conditions, notification content, and target recipients.

#### **19.6.1. Medical Alert Notifications [HIGHEST PRIORITY]**

**Critical Temperature Alert:**
```javascript
// Trigger: Temperature ≥ 102°F (39°C)
// Location: To be added in backend/controllers/medicalCheckInController.js

if (temperature >= 39.0) {
  await Notification.createPersonal(
    medicalInChargeId,
    "🚨 CRITICAL HEALTH ALERT",
    `Student ${studentName} has temperature ${temperature}°F. Immediate attention required!`,
    "MEDICAL_ALERT_CRITICAL",
    {
      studentId,
      temperature,
      checkInId,
      severity: "critical",
      actionUrl: `/medical/checkins/${checkInId}`
    }
  );

  // Also notify Balagruha In-charge and Admin
  await Notification.createCommon(
    "🚨 CRITICAL HEALTH ALERT",
    `Student ${studentName} has temperature ${temperature}°F`,
    "MEDICAL_ALERT_CRITICAL",
    ['balagruha-incharge', 'admin'],
    { studentId, temperature, checkInId }
  );

  // Optional: Send SMS (Sprint 4)
  await smsService.sendEmergency(medicalInCharge.phone, message);
}
```

**Warning Temperature Alert:**
```javascript
// Trigger: Temperature 100-102°F (37.8-39°C)
if (temperature >= 37.8 && temperature < 39.0) {
  await Notification.createPersonal(
    medicalInChargeId,
    "⚠️ Health Alert - Monitor Closely",
    `Student ${studentName} has elevated temperature ${temperature}°F`,
    "MEDICAL_ALERT_WARNING",
    { studentId, temperature, checkInId }
  );
}
```

**Medical Check-in Reminder:**
```javascript
// Trigger: Daily at 6 PM if check-in not completed
// Cron job: 0 18 * * *
const studentsWithoutCheckIn = await findStudentsWithoutTodayCheckIn();
for (const student of studentsWithoutCheckIn) {
  await Notification.createPersonal(
    medicalInChargeId,
    "Daily Check-in Reminder",
    `${student.name} has not had a check-in today`,
    "MEDICAL_CHECKIN_REMINDER",
    { studentId: student._id }
  );
}
```

#### **19.6.2. Task Management Notifications**

**Task Assignment:**
```javascript
// Trigger: When task created/assigned
await Notification.createPersonal(
  assigneeId,
  "New Task Assigned",
  `${taskType}: ${taskTitle} - Due: ${formattedDeadline}`,
  "TASK_ASSIGNED",
  {
    taskId,
    taskType,
    deadline,
    assignedBy: assignerName,
    actionUrl: `/tasks/${taskId}`
  }
);
```

**Deadline Approaching:**
```javascript
// Trigger: 24 hours before deadline (cron job)
// Trigger: 1 hour before deadline (cron job)
await Notification.createPersonal(
  assigneeId,
  "Task Deadline Approaching",
  `"${taskTitle}" is due in ${timeRemaining}`,
  "TASK_DEADLINE_APPROACHING",
  { taskId, deadline, actionUrl: `/tasks/${taskId}` }
);
```

#### **19.6.3. Training Session Notifications**

**Session Reminder:**
```javascript
// Trigger: 1 hour and 30 minutes before session
await Notification.createPersonal(
  studentId,
  "Training Session Soon",
  `${sessionType} with ${coachName} starts in ${minutes} minutes`,
  "SESSION_REMINDER",
  { sessionId, startTime, location, actionUrl: `/sessions/${sessionId}` }
);
```

#### **19.6.4. SOS Emergency Notifications [Sprint 4 - See Section 13]**

Detailed SOS notification specs are documented in **Section 13.4-13.7** (SOS Emergency System).

**Key Requirements:**
- `SOS_EMERGENCY`: URGENT priority, multi-channel delivery (WebSocket + Push + SMS)
- `SOS_ESCALATED`: Tier 2/3 escalation notifications
- `SOS_RESOLVED`: Resolution notification to all previous recipients

---

### **19.7. User Role Notification Matrix (Summary)**

Complete notification mappings by role:

| User Role | High Priority Notifications | Medium Priority | Low Priority |
|-----------|---------------------------|----------------|--------------|
| **Student** | TASK_ASSIGNED, TASK_DEADLINE_APPROACHING, TASK_OVERDUE, SESSION_REMINDER, MEDICAL_VACCINATION_DUE, COINS_AWARDED, ACHIEVEMENT_UNLOCKED | COURSE_ASSIGNED, WTF_PIN_ADDED, SHOP_ORDER_DELIVERED, ATTENDANCE_MARKED | SHOP_PRODUCT_AVAILABLE, WTF_SUBMISSION_APPROVED, COINS_DEDUCTED |
| **Coach** | SHOP_ORDER_DELIVERED (delivery assignment), SOS_EMERGENCY | TASK_COMPLETED, SESSION_ATTENDANCE_MARKED, COURSE_ENROLLED | GENERAL |
| **Balagruha In-charge** | SOS_EMERGENCY, MEDICAL_ALERT_CRITICAL, MEDICAL_ALERT_WARNING, ATTENDANCE_ABSENT | MEDICAL_CHECKIN_REMINDER, ATTENDANCE_SUMMARY, TASK_ASSIGNED | ATTENDANCE_MARKED |
| **Medical In-charge** | MEDICAL_ALERT_CRITICAL, MEDICAL_ALERT_WARNING, MEDICAL_VACCINATION_DUE | MEDICAL_CHECKIN_REMINDER, MEDICAL_RECORD_UPDATED, TASK_ASSIGNED (medical tasks) | MEDICAL_CHECKIN_COMPLETED |
| **Purchase Manager** | INVENTORY_OUT_OF_STOCK, INVENTORY_LOW_STOCK, PURCHASE_REQUEST_APPROVED, PURCHASE_REQUEST_REJECTED | PURCHASE_ORDER_ASSIGNED, PURCHASE_REQUEST_SUBMITTED | PURCHASE_ORDER_COMPLETED |
| **Admin** | SOS_ESCALATED, MEDICAL_ALERT_CRITICAL, INVENTORY_OUT_OF_STOCK | PURCHASE_REQUEST_SUBMITTED (high-value), ATTENDANCE_ABSENT (patterns), REPAIR_REQUEST_SUBMITTED | ATTENDANCE_SUMMARY, SYSTEM_ANNOUNCEMENT |
| **Sports/Music Coach** | SESSION_REMINDER, TASK_OVERDUE (their tasks) | TASK_COMPLETED, SESSION_ATTENDANCE_MARKED | GENERAL |
| **Amma** | SOS_ESCALATED (Tier 2+), PURCHASE_REQUEST_SUBMITTED (high-value requiring approval) | MEDICAL_ALERT_CRITICAL (summary), ATTENDANCE_SUMMARY (weekly) | SYSTEM_ANNOUNCEMENT |

*Full detailed matrix available in research audit report*

---

### **19.8. Frontend Integration (Desktop & Mobile)**

**Desktop Notification Bell (Existing):**
```javascript
// frontend/src/components/NotificationBell.jsx
- Bell icon with badge count
- Click to open notification center drawer
- Real-time updates via WebSocket
- Mark as read functionality
```

**Mobile Notification Center [Sprint 3]:**
```javascript
// mobile/src/screens/NotificationScreen.tsx
- Full-screen notification list
- Pull-to-refresh
- Infinite scroll pagination
- Category filtering
- Mark all as read
- Deep linking to notification context
```

**Real-Time Updates:**
```javascript
// WebSocket connection
socket.on('notification', (notification) => {
  // Add to local state
  notificationStore.addNotification(notification);

  // Show toast (if app is open)
  Toast.show({
    type: notification.priority === 'URGENT' ? 'error' : 'info',
    text1: notification.title,
    text2: notification.message
  });

  // Update badge count
  notificationStore.incrementUnreadCount();
});
```

---

### **19.9. Implementation Guidelines for Developers**

**When to Create Notifications:**
1. **User Action Completes** - Task submitted, order placed, check-in recorded
2. **Status Changes** - Task overdue, order delivered, alert resolved
3. **Reminders** - Deadline approaching, check-in due, session starting
4. **Alerts** - Critical health, low stock, SOS emergency
5. **Achievements** - Coins earned, course completed, WTF featured

**Priority Assignment Rules:**
- **URGENT**: Life-threatening (medical ≥102°F, SOS), critical system failures, inventory outage
- **HIGH**: Time-sensitive actions (tasks assigned, deadlines, session reminders, approval results)
- **MEDIUM**: Standard notifications (coin awards, task completions, general updates)
- **LOW**: Informational only (attendance marked, general announcements, community updates)

**Notification Content Best Practices:**
1. **Title**: Action-oriented, max 50 characters
2. **Message**: Clear context, max 150 characters, include key details
3. **Metadata**: Always include actionUrl for deep linking
4. **Category**: Use specific category (not GENERAL unless truly general)

**Code Pattern:**
```javascript
// Helper function approach (recommended)
const notificationService = require('../services/notification');

await notificationService.notifyTaskAssigned(assigneeId, {
  taskId: task._id,
  taskTitle: task.title,
  taskType: task.type,
  deadline: task.deadline,
  assignedBy: currentUser.username
});

// Direct creation (for custom notifications)
await Notification.createPersonal(
  userId,
  title,
  message,
  category,
  metadata
);
```

**Testing Notifications:**
```javascript
// Manual test via Admin panel or API
POST /api/notifications
{
  "userId": "user_123",
  "title": "Test Notification",
  "message": "This is a test",
  "category": "GENERAL",
  "priority": "MEDIUM",
  "metadata": { "test": true }
}
```

---

##  **25. Non-Functional Requirements (Combined Sprint)**

### **25.1. Performance Requirements**

* **Mobile App Performance:**
  * Cold start time: < 3 seconds (from icon tap to dashboard)
  * Screen transitions: < 300ms (smooth animations)
  * API response time: < 500ms (p95 - 95th percentile)
  * Image loading: Progressive (show placeholder immediately, then full image)
  * SOS alert delivery: < 5 seconds end-to-end (desktop trigger → mobile notification)
  * Mobile bundle size: < 25MB (optimized with code splitting and lazy loading)

* **Backend API Performance:**
  * Mobile endpoints: < 500ms response time (p95)
  * SOS alert processing: < 2 seconds total
  * Facial recognition: < 10 seconds for 30-student photo
  * WebSocket latency: < 100ms (p95)
  * Database queries: < 100ms (p95)

### **25.2. Scalability Requirements**

* **Current Scale:**
  * Users: 500 (100 staff, 400 students)
  * Concurrent mobile users: 50 (10% of staff)

* **Target Scale (6 months):**
  * Users: 2,000 (400 staff, 1,600 students)
  * Concurrent mobile users: 200 (50% of staff)

* **Data Growth:**
  * Attendance photos: ~5,000 per month (100 per day × 20 days)
  * Messages: ~50,000 per month
  * SOS alerts: ~100 per month (hope to remain low)
  * Health records: ~2,000 per month
  * AWS S3 storage: ~100GB growth per month

### **25.3. Security Requirements**

* **Authentication:**
  * JWT tokens with 24-hour expiration
  * Refresh tokens with 30-day expiration
  * Biometric authentication as secondary factor (Face ID, Touch ID, Fingerprint)
  * Secure token storage (iOS Keychain, Android Keystore)
  * Session timeout after 24 hours of inactivity

* **Data Protection:**
  * HTTPS/TLS 1.3 for all API communications
  * WebSocket Secure (WSS) for real-time connections
  * At-rest encryption for sensitive data (health records, personal information)
  * Face recognition embeddings encrypted in database

* **Authorization:**
  * Role-Based Access Control on all API endpoints
  * Permission checks for every API request
  * Row-Level Security for multi-Balagruh data (Coach A cannot access Balagruh B)
  * Audit logging for sensitive actions (SOS alerts, health data access)

### **25.4. Offline Capabilities**

* **Sprint 3 - Mobile Offline:**
  * Attendance photos queued locally when offline (queue in AsyncStorage)
  * Automatic upload when connection restored
  * Progress tracked with retry logic (3 attempts)
  * 7-day offline queue retention

* **Sprint 4 - Messaging Offline:**
  * Messages queued locally when offline
  * Outgoing messages sent when connection restored
  * Message drafts persisted
  * Conversation history cached for offline viewing
  * No SOS triggering when offline (requires real-time network)

### **25.5. Accessibility Requirements**

* WCAG 2.1 Level AA compliance
* Keyboard navigation support (desktop features)
* Touch targets minimum 44x44px (iOS HIG)
* Screen reader compatibility:
  * VoiceOver (iOS) for mobile
  * TalkBack (Android) for mobile
* High contrast mode option
* Font size adjustment (respect system settings)
* Color contrast: Minimum 4.5:1 for normal text, 3:1 for large text

---

## **26. Development Timeline & Milestones**

### **28-Day Sprint Schedule**

#### **Week 1 (Days 1-7)**

**Mobile Foundation:**
- Days 1-2: Project setup, authentication system
- Days 3-4: Biometric auth, navigation structure
- Days 5-7: Dashboard with role-specific quick actions

**Shared Infrastructure:**
- Days 1-5: WebSocket server setup, AWS S3 configuration
- Days 5-7: First integration checkpoint

**Milestone:** Mobile app foundation complete, can log in and navigate

#### **Week 2 (Days 8-14)**

**Sprint 3 Core Features:**
- Days 6-7: Attendance photo upload implementation
- Day 8: Attendance results viewing
- Day 9: Media upload system
- Day 10: Push notifications (FCM integration)

**Integration:**
- Days 10-12: Notification center enhancement
- Day 14: Second integration checkpoint

**Milestone:** Attendance working, notifications enabled, media uploads functional

#### **Week 3 (Days 15-21)**

**Sprint 4 Foundation:**
- Days 11-12: Desktop SOS trigger implementation
- Day 13: Mobile SOS receiver with high-priority alerts
- Day 14: Escalation workflow (Tier 1 → Tier 2 → Tier 3)
- Day 15: Direct messaging (1-on-1)

**Sprint 3 Completion:**
- Day 17: Analytics dashboard on mobile

**Milestone:** SOS operational end-to-end, messaging working, escalation tested

#### **Week 4 (Days 22-28)**

**Sprint 4 Completion:**
- Day 16: Group messaging
- Days 18-19: Health tracking system
- Day 20: WhatsApp integration

**Integration & Testing:**
- Days 21-22: Integration testing (desktop ↔ mobile flows)
- Days 23-24: Bug fixes and performance optimization
- Days 25-26: User Acceptance Testing (UAT) with real users
- Days 27-28: Production deployment and monitoring

**Milestone:** Full delivery, both sprints complete and deployed

### **Critical Path Dependencies**

1. **Push Notification System** (Day 10) - Blocks SOS mobile alerts (Day 13)
2. **WebSocket Infrastructure** (Days 1-5) - Blocks messaging (Day 15) and SOS real-time (Day 13)
3. **AWS S3 Configuration** (Days 1-5) - Blocks attendance photos (Day 6) and media upload (Day 9)
4. **Mobile Foundation** (Days 1-7) - Blocks all Sprint 3 features
5. **SOS Desktop Trigger** (Days 11-12) - Must precede mobile receiver (Day 13)

---

## **27. Testing Strategy**

### **27.1. Test Coverage Requirements**

* **Unit Testing:** Minimum 80% code coverage (Jest, React Native Testing Library)
* **Integration Testing:** All API endpoints with different roles (Supertest)
* **E2E Testing:** Critical user journeys (Playwright for desktop, Detox for mobile)
* **Performance Testing:** Load testing with 100 concurrent users (k6, Artillery)
* **Security Testing:** Penetration testing for mobile app and SOS system (OWASP ZAP)

### **27.2. Test Scenarios**

**Mobile Critical Paths (Sprint 3):**
1. Staff login → Mobile authentication → Biometric setup → Dashboard access
2. In-Charge logs in → Takes class photo → FR processes → Attendance marked
3. Coach uploads video → Progress tracking → S3 upload → Content published
4. Admin views reports → Date filtering → Chart rendering → PDF export

**SOS Critical Paths (Sprint 4):**
1. Student triggers SOS → Desktop confirmation → Mobile alerts sent → Coach acknowledges < 5s
2. No response (2 min) → Tier 2 escalation → Admins alerted → SMS/WhatsApp sent
3. No response (5 min) → Tier 3 broadcast → All staff alerted
4. Coach responds → "On my way" status → Arrives → Resolves → SOS closed

**Messaging Critical Paths (Sprint 4):**
1. Coach sends message → WebSocket delivery → Push notification → In-Charge receives < 2s
2. In-Charge replies → Read receipt → Typing indicator → Message delivered
3. Group message → Multiple recipients → All receive notifications
4. Offline scenario → Message queued → Connection restored → Message delivered

**Integration Scenarios:**
1. Attendance photo upload → FR success → Notification sent → Admin views on mobile
2. SOS triggered → Health record correlation → Alert includes recent health data
3. Message with attachment → S3 upload → Thumbnail generated → Recipient downloads
4. Offline photo queue → Multiple photos → Connection restored → Batch upload

### **27.3. User Acceptance Testing (UAT)**

**Test Users (Days 25-26):**
- 2 Balagruh In-Charges (attendance testing)
- 3 Coaches (media upload, SOS response, messaging)
- 1 Admin (analytics, system overview, escalation management)
- 5 Students (SOS triggering - controlled test environment)

**UAT Success Criteria:**
- All participants can complete assigned tasks without assistance
- User satisfaction > 8/10 on survey
- No usability complaints requiring immediate fixes
- All P0/P1 bugs identified and resolved before production

---

## **28. Resource Requirements**

### **28.1. Development Team Structure**

**Mobile Development Team (2 developers):**
- 1 Senior React Native developer (iOS/Android lead)
- 1 Mid-level React Native developer (features)

**Backend Development Team (2 developers):**
- 1 Senior Node.js developer (WebSocket, SOS system)
- 1 Mid-level Node.js developer (API endpoints, integrations)

**QA Team (1 engineer):**
- 1 QA engineer (manual + automated testing)

**Shared Resources (2 members):**
- 1 DevOps engineer (part-time - CI/CD, deployment)
- 1 UI/UX designer (part-time - mobile screens, SOS interface)

**Total Team:** 7 members (5 full-time, 2 part-time)

### **28.2. Infrastructure Requirements**

* **Development Environment:**
  - 2 development servers (mobile API staging, WebSocket staging)
  - MongoDB replica set (development database)
  - AWS S3 bucket for development media (10TB capacity)
  - CI/CD pipeline (GitHub Actions or GitLab CI)

* **Testing Environment:**
  - 2 test servers matching production specs
  - Test data set with 100+ students, 20+ staff
  - Automated testing tools (Jest, Detox, Playwright, k6)

* **Mobile Testing Devices:**
  - iPhone 12 (iOS 15.1+): $600 one-time
  - Samsung Galaxy A52 (Android 8.0+): $350 one-time
  - iPad (tablet testing): $450 one-time
  - **Total Device Cost:** ~$1,400 one-time

* **Infrastructure Costs (Monthly):**
  - AWS (EC2, S3, CloudFront): ~$140/month
  - Firebase (FCM, Crashlytics): ~$0 (free tier sufficient)
  - Third-party services (Twilio WhatsApp, SMS): ~$80/month
  - Development tools (Sentry, New Relic): ~$70/month
  - **Total:** ~$290/month

---

## **29. Risk Assessment & Mitigation**

### **29.1. Technical Risks**

| Risk | Probability | Impact | Mitigation | Contingency |
|------|------------|--------|------------|-------------|
| SOS alerts not delivered | Medium (30%) | Critical | Multiple channels (Push, SMS, WhatsApp), extensive testing | Manual phone call tree, desktop popup alerts |
| Mobile performance degradation | Medium (25%) | High | Performance testing, code splitting, image optimization | Reduce feature scope, optimize critical path |
| WebSocket instability | Low (20%) | High | Auto-reconnect logic, fallback to polling | Switch to polling mode for messages, keep push for SOS |
| Facial recognition accuracy issues | Low (15%) | Medium | Manual override always available, quality validation | 100% manual attendance as fallback |
| WhatsApp API approval delays | Medium (30%) | Medium | Apply early, prepare documentation | Use SMS only, implement email notifications |

### **29.2. Resource Risks**

| Risk | Probability | Impact | Mitigation | Contingency |
|------|------------|--------|------------|-------------|
| Mobile developer availability | Low (15%) | High | Cross-training, knowledge sharing | Contract external React Native developer |
| Testing bottleneck | Medium (25%) | Medium | Automated testing, parallel tracks | Extend timeline by 3-5 days |
| Device procurement delays | Low (10%) | Medium | Order devices early (Week 1) | Use emulators/simulators until devices arrive |
| Integration coordination | Medium (30%) | Medium | Daily standups, weekly integration checkpoints | Dedicated integration week at end |

### **29.3. Operational Risks**

| Risk | Probability | Impact | Mitigation | Contingency |
|------|------------|--------|------------|-------------|
| Incomplete FR system | Low (10%) | High | Manual attendance always available | 100% manual process, FR as enhancement |
| Staff training required | High (50%) | Medium | Training videos, user manuals, in-app help | Dedicated support hotline for first 2 weeks |
| Network connectivity issues | Medium (30%) | Medium | Offline queue & sync, retry logic | Clear offline mode indicators, manual process fallback |

---

## **30. Questions for Client Clarification**

### **30.1. Sprint 3 Clarifications Needed:**

1. **Mobile Platform Priority:**
   - Should we prioritize iOS or Android for initial release?
   - Do all staff members have compatible devices (iOS 15.1+, Android 8.0+)?
   - **Recommendation:** Android priority (lower cost devices more common)

2. **Attendance Photo Storage:**
   - How long should attendance photos be retained in AWS S3?
   - Should we implement automatic deletion after X days?
   - **Recommendation:** 90-day retention, then automatic deletion

3. **Media Upload Limits:**
   - Are the proposed file size limits acceptable (500MB video, 50MB docs, 25MB images)?
   - Should we implement daily upload quotas per user?
   - **Recommendation:** Keep proposed limits, monitor usage

### **30.2. Sprint 4 Clarifications Needed:**

1. **SOS Escalation Configuration:**
   - Are the proposed escalation timeframes appropriate (2 min → 5 min)?
   - Should escalation times vary by SOS category (Medical faster than Other)?
   - **Recommendation:** Medical critical = 1 min → 3 min, Others = 2 min → 5 min

2. **Health Data Compliance:**
   - Are there specific health data compliance requirements (HIPAA, local regulations)?
   - Who should have access to health records (only In-Charge, or also Coaches)?
   - **Recommendation:** In-Charge + Admins only, encrypt all health data

3. **WhatsApp Template Messages:**
   - Should we create new WhatsApp templates, or use existing approved templates?
   - What languages should templates support (English, Hindi, Marathi)?
   - Do you have WhatsApp Business API approval already?
   - **Recommendation:** English + Hindi templates, apply for API approval immediately

4. **Group Chat Max Participants:**
   - What should be the maximum participants in group conversations?
   - **Recommendation:** 50 participants (standard WhatsApp group size)

### **30.3. Integration Clarifications:**

1. **Notification Preferences:**
   - Should staff be able to disable SOS notifications (not recommended)?
   - Should there be quiet hours for non-urgent notifications?
   - **Recommendation:** SOS always enabled, quiet hours for other notifications

### **30.4. Notification System Clarifications (Sprint 3-4):**

1. **Medical Alert Thresholds:**
   - Confirm temperature thresholds: Warning at 100°F (37.8°C), Critical at 102°F (39°C)?
   - Should Medical In-charge receive notifications for ALL bal agruhas or only assigned ones?
   - Should critical medical alerts also go to Admin and Amma immediately?
   - **Recommendation:** Confirmed thresholds, Medical In-charge for all balagruhas, critical alerts to Admin/Amma

2. **Task Notification Timing:**
   - Confirm task deadline reminder timing: 24 hours and 1 hour before deadline?
   - Should task overdue notifications repeat daily or only once?
   - Should task creators get notifications when tasks are completed?
   - **Recommendation:** 24h + 1h reminders, daily overdue notifications, completion notifications enabled

3. **Training Session Reminders:**
   - Confirm session reminder timing: 1 hour and 30 minutes before session?
   - Should students receive notifications for session cancellations even if far in advance?
   - **Recommendation:** 1h + 30min reminders, always notify for cancellations

4. **SOS Notification Delivery:**
   - Confirm SOS escalation timing: Tier 1 (0-2min), Tier 2 (2-5min), Tier 3 (5+min)?
   - Should SOS alerts include student photo/identification in notification?
   - Which SMS provider preference: Twilio or AWS SNS?
   - **Recommendation:** Confirmed timing, include student name only (not photo for privacy), prefer Twilio for reliability

5. **WhatsApp Integration Decision (CRITICAL):**
   - **PROCEED with WhatsApp integration or DEFER to post-launch?**
   - If proceeding, confirm WhatsApp Business API account setup status
   - If proceeding, confirm maximum 5 WhatsApp notifications per user per day acceptable?
   - **Recommendation:** DEFER WhatsApp to post-launch, focus Sprint 4 on mobile push notifications

6. **Inventory & Purchase Notifications:**
   - Confirm low stock threshold definition (currently in ShopItem model: `lowStockThreshold` field)
   - Should inventory alerts go to Purchase Manager only, or also to Admin/Amma?
   - Should high-value purchase requests (above what amount?) require Amma approval notification?
   - **Recommendation:** Low stock = 10 units or below, alerts to Purchase Manager + Admin, Amma approval for purchases >₹10,000

7. **Attendance Notification Preferences:**
   - Should students receive confirmation notification when attendance is marked?
   - Should Balagruha In-charge receive daily attendance summary at end of day?
   - Should consecutive absences (how many days?) trigger alert to Admin?
   - **Recommendation:** Students get confirmation, In-charge gets daily summary, 3+ consecutive absences alert to Admin

8. **Course & Learning Notifications:**
   - Should students receive notifications for all new course assignments, or only high-priority courses?
   - Should coaches receive notifications when students complete courses they assigned?
   - **Recommendation:** All course assignments notify students, course completion notifies assigning coach

9. **Notification Retention:**
   - How long should notifications be retained in database before auto-deletion?
   - Should users be able to delete individual notifications, or only mark as read?
   - **Recommendation:** 90-day retention, users can delete individual notifications

10. **Parent/Guardian Notifications (Future Consideration):**
    - Are parent/guardian notifications in scope for Sprint 3-4, or future enhancement?
    - If future, which notifications should parents receive? (Medical alerts, attendance issues, achievements?)
    - **Recommendation:** DEFER to future sprint, focus on staff-to-staff notifications for Sprint 3-4

---

## **31. Success Criteria & Acceptance**

### **31.1. Sprint 3 Success Metrics:**

* Mobile app successfully installed and running on iOS and Android devices
* Biometric authentication working on 90%+ of compatible devices
* Attendance photo upload success rate > 95%
* Facial recognition integration functional with manual override
* Media upload success rate > 95% for files within size limits
* Analytics dashboard loading < 3 seconds
* Push notifications delivered within 10 seconds of trigger
* App crash rate < 0.1% (measured via Crashlytics)

### **31.2. Sprint 4 Success Metrics:**

* SOS alert delivery < 5 seconds end-to-end (p95)
* SOS escalation triggers correctly (Tier 1 → Tier 2 → Tier 3)
* 100% of SOS events logged in audit trail with complete data
* Message delivery < 2 seconds (p95) when both users online
* WhatsApp integration functional with delivery confirmation
* Health tracking system capturing all required metrics
* Abnormal health value alerts triggering correctly

### **31.2.1. Sprint 4 Notification System Success Metrics:**

**Critical Notification Performance:**
* Medical critical alerts (≥102°F) delivered within 5 seconds (99.9% reliability)
* SOS Tier 1 notifications delivered within 5 seconds (100% reliability)
* SOS Tier 2 escalation triggers automatically at 2-minute mark if no acknowledgment
* SOS Tier 3 escalation triggers automatically at 5-minute mark if no acknowledgment
* Task deadline reminders sent at correct timing (24h, 1h before)
* Training session reminders sent at correct timing (1h, 30min before)

**Notification Coverage:**
* All 75 notification categories implemented and tested
* All 10 user roles receive appropriate notifications (Students + 8 mobile staff + Purchase Manager desktop)
* Medical In-charge receives critical health alerts for all balagruhas
* Balagruha In-charge receives alerts only for their assigned balagruha(s)
* Purchase Manager receives low stock and out-of-stock alerts
* Admins receive escalated SOS and critical inventory alerts

**Delivery Channel Performance:**
* WebSocket notifications delivered within 500ms (p95)
* Mobile push notifications delivered within 10 seconds (p95)
* SMS (SOS Tier 2+) delivered within 30 seconds (p95)
* Notification unread counts update in real-time (< 1 second)
* Notification center loads within 1 second

**Notification Quality:**
* No duplicate notifications sent for same event
* No irrelevant notifications (users only receive notifications for their role)
* Notification content is clear, actionable, and grammatically correct
* Deep linking works correctly (tapping notification opens correct app screen)
* All notifications include actionUrl in metadata for navigation

**User Experience:**
* Notification bell badge displays correct unread count
* Mark as read functionality works correctly
* Mark all as read updates all notifications
* Notification history paginated correctly
* Users can delete individual notifications

**Priority & Sound Mapping:**
* URGENT notifications use emergency sound and full-screen alert
* HIGH notifications use default sound and banner display
* MEDIUM notifications use default sound and badge only
* LOW notifications are silent with badge only

**WhatsApp Integration (if approved):**
* WhatsApp notifications delivered within 60 seconds (p95)
* Maximum 5 WhatsApp messages per user per day enforced
* Users can opt-in/opt-out of WhatsApp notifications
* WhatsApp delivery confirmation tracked and logged

### **31.3. Combined Sprint Success Criteria:**

* **Functional Acceptance:**
  - All planned features operational and accessible to appropriate roles
  - Desktop → Mobile integration seamless (SOS alerts, notifications)
  - Offline capabilities functional (photo queue, message queue)
  - Role-based permissions enforced correctly

* **Performance Acceptance:**
  - Mobile app cold start < 3 seconds
  - API response < 500ms (p95)
  - SOS alert < 5 seconds end-to-end
  - Facial recognition < 10 seconds for 30-student photo

* **Security Acceptance:**
  - Penetration testing passed with no critical vulnerabilities
  - Authentication and authorization working correctly
  - Tokens properly secured in device storage
  - Audit logging complete for all sensitive actions

* **Quality Acceptance:**
  - QA score ≥ 95/100 (consistent with Sprint 5 quality)
  - Zero P0 (critical) bugs
  - Zero P1 (high) bugs
  - < 5 P2 (medium) bugs
  - Test coverage > 80% for critical code paths

* **User Acceptance:**
  - UAT passed with all test user roles
  - User satisfaction > 8/10 on survey
  - No usability complaints requiring immediate fixes
  - Training materials completed and approved

* **Deployment Acceptance:**
  - Zero downtime deployment to production
  - Rollback plan tested and documented
  - 24-hour post-deployment monitoring completed
  - No increase in error rates post-deployment

---

## **32. Appendix A: Technical Architecture Diagrams**

### **32.1. System Architecture Overview**

```
┌─────────────────────────────────────────────────────────┐
│               Electron Desktop App (Students)           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Student Dashboard                                │  │
│  │  - Courses, Shop, Wallet                          │  │
│  │  - [SOS BUTTON] ← Prominent, Red, Always Visible │  │
│  └────────────────────┬──────────────────────────────┘  │
└────────────────────────┼────────────────────────────────┘
                         │
                         │ HTTP/WebSocket
                         │
      ┌──────────────────▼───────────────────┐
      │     React Native Mobile App          │
      │    (iOS/Android - Coaches/Admins)    │
      ├──────────────────────────────────────┤
      │  - Attendance (Photo Upload)         │
      │  - Media Management                  │
      │  - Analytics Dashboard               │
      │  - SOS Alert Reception              │
      │  - Internal Messaging                │
      │  - Health Tracking                   │
      └──────────────────┬───────────────────┘
                         │
                         │ HTTPS/WSS
                         │
      ┌──────────────────▼───────────────────┐
      │      Node.js Backend API             │
      ├──────────────────────────────────────┤
      │  - Express Routes (/api/*)           │
      │  - Socket.io WebSocket Server        │
      │  - Job Queues (Bull + Redis)         │
      │  - Authentication (JWT)              │
      │  - Facial Recognition Integration    │
      │  - SOS Escalation Engine             │
      └─────┬──────────┬──────────┬──────────┘
            │          │          │
    ┌───────▼──┐  ┌───▼────┐  ┌──▼───────┐
    │ MongoDB  │  │ AWS S3 │  │  Redis   │
    │ Database │  │ Media  │  │  Cache   │
    └──────────┘  └────┬───┘  └──────────┘
                       │
                  ┌────▼────────────┐
                  │  CloudFront CDN │
                  │  (Fast Delivery)│
                  └─────────────────┘

External Services:
  - Firebase Cloud Messaging (FCM) → Push Notifications
  - Twilio/360Dialog → WhatsApp API
  - Twilio → SMS for escalation
```

### **32.2. Data Flow Diagram - SOS Emergency Alert**

```
Student (Desktop)                    Backend                     Staff (Mobile)
     │                                  │                              │
     │  1. Click [SOS Button]           │                              │
     │  Select: Medical Emergency       │                              │
     │────────────────────────────────►│                              │
     │                                  │                              │
     │                                  │  2. Create SOSAlert in DB    │
     │                                  │     status: 'sent'           │
     │                                  │     timestamp: now           │
     │                                  │                              │
     │  3. Desktop Confirmation         │                              │
     │◄────────────────────────────────│                              │
     │  "Help is on the way!"           │                              │
     │                                  │                              │
     │                                  │  4. Emit via WebSocket       │
     │                                  │     to balagruh room         │
     │                                  │────────────────────────────►│
     │                                  │                              │
     │                                  │  5. Send FCM Push            │
     │                                  │     (high priority)          │
     │                                  │────────────────────────────►│
     │                                  │                              │
     │                                  │                           6. Mobile Alert
     │                                  │                              │ Vibration + Sound
     │                                  │                              │ "Emergency: [Student]"
     │                                  │                              │ [Category: Medical]
     │                                  │                              │
     │                                  │  7. Coach Response           │
     │                                  │     "On my way"              │
     │                                  │◄────────────────────────────│
     │                                  │                              │
     │  8. Status Update                │                              │
     │     "Coach Rajesh responding"    │                              │
     │◄────────────────────────────────│                              │
     │                                  │                              │
     │                                  │                              │
     │  --- If no response after 2 min ---                           │
     │                                  │                              │
     │                                  │  9. Tier 2 Escalation        │
     │                                  │     - Alert Admins (FCM)     │
     │                                  │     - Send SMS               │
     │                                  │     - Send WhatsApp          │
     │                                  │                              │
     │  --- If no response after 5 min ---                           │
     │                                  │                              │
     │                                  │  10. Tier 3 Broadcast        │
     │                                  │      - Alert ALL staff       │
     │                                  │                              │
     │                                  │  11. Coach Arrives           │
     │                                  │      status: 'resolved'      │
     │                                  │◄────────────────────────────│
     │                                  │                              │
     │  12. Resolution Notification     │                              │
     │      "Emergency resolved"        │                              │
     │◄────────────────────────────────│                              │
```

### **32.3. Mobile App Navigation Flow**

```
App Launch
    │
    ▼
[Splash Screen]
  (2 seconds)
    │
    ▼
Check Auth Token
    │
    ├─── Valid Token ──────────┐
    │                          │
    │                          ▼
    │                    [Dashboard]
    │                     Role-based
    │                          │
    │                          ├── Coach/Admin
    │                          │   - Upload Content
    │                          │   - View Reports
    │                          │   - SOS Alerts
    │                          │   - Messages
    │                          │
    │                          └── Balagruh In-Charge
    │                              - Mark Attendance
    │                              - Health Records
    │                              - SOS Alerts
    │                              - Messages
    │
    └─── No Token ───────►[Login Screen]
                               │
                               ▼
                          [Authenticate]
                               │
                               ├── Success ──────►[Enable Biometric?]
                               │                        │
                               │                        ├── Yes ──┐
                               │                        └── No ───┤
                               │                                  │
                               └─────────────────────────────────►[Dashboard]
```

---

## **33. Appendix B: Database Schemas**

### **33.1. Enhanced User Schema**

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

  // Mobile-specific fields
  mobileDevices: [{
    deviceId: String,
    platform: { type: String, enum: ['ios', 'android'] },
    fcmToken: String,
    lastActive: Date,
    appVersion: String
  }],

  preferences: {
    notificationSettings: {
      sosAlerts: { type: Boolean, default: true },
      messages: { type: Boolean, default: true },
      attendance: { type: Boolean, default: true },
      quietHoursEnabled: { type: Boolean, default: false },
      quietHoursStart: String, // "22:00"
      quietHoursEnd: String, // "07:00"
    },
    biometricEnabled: { type: Boolean, default: false }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.index({ username: 1 });
UserSchema.index({ role: 1, balagruhId: 1 });
```

### **33.2. SOSAlert Schema**

```javascript
// backend/models/SOSAlert.js
const SOSAlertSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balagruhId: { type: mongoose.Schema.Types.ObjectId, ref: 'Balagruh', required: true },

  category: {
    type: String,
    enum: ['Medical', 'Safety', 'Mental Health', 'Other'],
    required: true
  },
  priority: {
    type: String,
    enum: ['critical', 'high', 'medium'],
    default: function() {
      return this.category === 'Medical' ? 'critical' : 'high';
    }
  },

  description: String,
  location: String, // e.g., "Computer Lab", "Dormitory Room 12"

  status: {
    type: String,
    enum: ['sent', 'acknowledged', 'responding', 'arrived', 'resolved', 'cancelled'],
    default: 'sent'
  },

  responses: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    responseType: {
      type: String,
      enum: ['acknowledged', 'responding', 'arrived']
    },
    timestamp: Date,
    notes: String
  }],

  escalation: {
    tier1SentAt: Date, // Balagruh coaches + in-charge
    tier2SentAt: Date, // Admins + SMS/WhatsApp
    tier3SentAt: Date, // Broadcast all staff
    currentTier: { type: Number, default: 1, min: 1, max: 3 }
  },

  resolution: {
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: Date,
    resolutionNotes: String,
    outcome: String // "Student received medical attention", etc.
  },

  healthCorrelation: {
    recentHealthRecordId: { type: mongoose.Schema.Types.ObjectId, ref: 'HealthRecord' },
    abnormalVitals: Boolean,
    notes: String
  },

  notifications: [{
    channel: { type: String, enum: ['push', 'sms', 'whatsapp', 'email'] },
    recipientId: mongoose.Schema.Types.ObjectId,
    sentAt: Date,
    delivered: Boolean,
    deliveredAt: Date
  }],

  audit: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    createdFrom: { type: String, enum: ['desktop', 'mobile'], default: 'desktop' }
  }
});

SOSAlertSchema.index({ studentId: 1, 'audit.createdAt': -1 });
SOSAlertSchema.index({ balagruhId: 1, status: 1 });
SOSAlertSchema.index({ status: 1, 'audit.createdAt': -1 });
```

### **33.3. Message Schema**

```javascript
// backend/models/Message.js
const MessageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  type: {
    type: String,
    enum: ['text', 'image', 'video', 'document', 'audio'],
    default: 'text'
  },

  content: {
    text: String, // For text messages
    fileUrl: String, // For media messages (S3 URL)
    fileName: String,
    fileSize: Number, // bytes
    mimeType: String,
    thumbnailUrl: String, // For images/videos
    duration: Number // For audio/video (seconds)
  },

  status: {
    sent: { type: Boolean, default: true },
    delivered: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
    deliveredAt: Date,
    readAt: Date
  },

  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }, // For message replies

  timestamp: { type: Date, default: Date.now, index: true },
  deletedAt: Date, // Soft delete
  deletedBy: mongoose.Schema.Types.ObjectId
});

MessageSchema.index({ conversationId: 1, timestamp: -1 });
MessageSchema.index({ senderId: 1, timestamp: -1 });
```

### **33.4. HealthRecord Schema**

```javascript
// backend/models/HealthRecord.js
const HealthRecordSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balagruhId: { type: mongoose.Schema.Types.ObjectId, ref: 'Balagruh', required: true },

  recordType: {
    type: String,
    enum: ['routine', 'incident', 'emergency'],
    required: true
  },

  vitals: {
    weight: { value: Number, unit: 'kg' },
    height: { value: Number, unit: 'cm' },
    temperature: { value: Number, unit: 'celsius' },
    bloodPressure: {
      systolic: Number,
      diastolic: Number
    },
    heartRate: { value: Number, unit: 'bpm' }
  },

  symptoms: [{
    symptom: {
      type: String,
      enum: ['fever', 'cough', 'headache', 'fatigue', 'nausea', 'dizziness', 'pain', 'other']
    },
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe']
    },
    notes: String
  }],

  incident: {
    description: String,
    actionTaken: String,
    followUpRequired: Boolean,
    photos: [String], // S3 URLs
  },

  documents: [{
    type: { type: String, enum: ['medical_report', 'prescription', 'lab_result', 'other'] },
    fileUrl: String, // S3 URL
    fileName: String,
    uploadedAt: Date
  }],

  alerts: [{
    alertType: {
      type: String,
      enum: ['high_temperature', 'weight_change', 'blood_pressure', 'custom']
    },
    message: String,
    severity: {
      type: String,
      enum: ['warning', 'critical']
    },
    triggeredAt: Date,
    acknowledgedBy: mongoose.Schema.Types.ObjectId,
    acknowledgedAt: Date
  }],

  sosCorrelation: {
    sosAlertId: { type: mongoose.Schema.Types.ObjectId, ref: 'SOSAlert' },
    linkedAt: Date,
    notes: String
  },

  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recordedAt: { type: Date, default: Date.now, index: true },
  updatedAt: Date
});

HealthRecordSchema.index({ studentId: 1, recordedAt: -1 });
HealthRecordSchema.index({ balagruhId: 1, recordType: 1 });
HealthRecordSchema.index({ 'alerts.alertType': 1, 'alerts.acknowledgedAt': 1 });
```

### **33.5. AttendanceUpload Schema**

```javascript
// backend/models/AttendanceUpload.js
const AttendanceUploadSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  balagruhId: { type: mongoose.Schema.Types.ObjectId, ref: 'Balagruh', required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  photo: {
    originalUrl: String, // S3 URL
    processedUrl: String, // S3 URL (compressed)
    thumbnailUrl: String, // S3 URL
    fileSize: Number, // bytes
    dimensions: {
      width: Number,
      height: Number
    }
  },

  processingStatus: {
    type: String,
    enum: ['queued', 'processing', 'completed', 'failed'],
    default: 'queued'
  },

  recognitionResults: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    confidence: Number, // 0-1
    faceBox: {
      x: Number,
      y: Number,
      width: Number,
      height: Number
    },
    status: {
      type: String,
      enum: ['present', 'uncertain', 'manual_override']
    }
  }],

  metadata: {
    totalFacesDetected: Number,
    totalStudentsRecognized: Number,
    processingTimeMs: Number,
    uploadedFrom: { type: String, enum: ['mobile', 'desktop'], default: 'mobile' },
    deviceInfo: {
      platform: String,
      appVersion: String
    }
  },

  attendanceDate: { type: Date, required: true, index: true },
  uploadedAt: { type: Date, default: Date.now },
  processedAt: Date
});

AttendanceUploadSchema.index({ balagruhId: 1, attendanceDate: -1 });
AttendanceUploadSchema.index({ uploadedBy: 1, uploadedAt: -1 });
AttendanceUploadSchema.index({ processingStatus: 1 });
```

---

## **34. Appendix C: API Documentation Structure**

### **34.1. Sprint 3 - Mobile APIs**

```yaml
/api/v1/mobile:

  /auth:
    POST /login:
      Description: Mobile authentication
      Request: { username, password }
      Response: { token, refreshToken, user }

    POST /refresh:
      Description: Refresh access token
      Request: { refreshToken }
      Response: { token }

    POST /logout:
      Description: Invalidate tokens
      Headers: Authorization: Bearer <token>
      Response: { success: true }

  /dashboard:
    GET /:userId:
      Description: Get mobile dashboard data
      Response: { quickActions, recentActivity, stats }

  /attendance:
    POST /upload-photo:
      Description: Upload attendance photo
      Request: multipart/form-data { photo, balagruhId, date }
      Response: { uploadId, status: 'queued' }

    GET /results/:uploadId:
      Description: Get recognition results
      Response: { recognized: [...], unrecognized: [...] }

    GET /history:
      Description: Get attendance history
      Query: { balagruhId, startDate, endDate }
      Response: { uploads: [...] }

  /media:
    POST /generate-upload-url:
      Description: Generate S3 presigned URL
      Request: { fileName, contentType, folder }
      Response: { uploadUrl, key, cdnUrl }

    POST /publish:
      Description: Associate uploaded content with course
      Request: { key, courseId, moduleId, metadata }
      Response: { success: true, contentId }

  /analytics:
    GET /dashboard:
      Description: Analytics dashboard
      Query: { balagruhId, startDate, endDate }
      Response: { metrics, charts }

    GET /export:
      Description: Export report
      Query: { format: 'pdf' | 'csv', reportType, dateRange }
      Response: { downloadUrl }

  /notifications:
    POST /register-device:
      Description: Register FCM token
      Request: { fcmToken, platform, deviceId }
      Response: { success: true }

    GET /history:
      Description: Get notification history
      Query: { limit, offset }
      Response: { notifications: [...], total }

    PUT /mark-read:
      Description: Mark notifications as read
      Request: { notificationIds: [...] }
      Response: { success: true }
```

### **34.2. Sprint 4 - Emergency & Communication APIs**

```yaml
/api/v1/sos:

  POST /trigger:
    Description: Create SOS alert (desktop)
    Request: { studentId, category, description, location }
    Response: { sosAlertId, status: 'sent' }

  POST /respond:
    Description: Respond to SOS alert (mobile)
    Request: { sosAlertId, responseType, notes }
    Response: { success: true, status: 'acknowledged' }

  PUT /:sosAlertId/resolve:
    Description: Mark SOS as resolved
    Request: { resolutionNotes, outcome }
    Response: { success: true }

  GET /active:
    Description: Get active SOS alerts
    Query: { balagruhId }
    Response: { alerts: [...] }

  GET /history:
    Description: Get SOS alert history
    Query: { studentId, balagruhId, startDate, endDate }
    Response: { alerts: [...] }

/api/v1/messaging:

  GET /conversations:
    Description: Get user's conversations
    Response: { conversations: [...] }

  POST /conversations:
    Description: Create new conversation
    Request: { participants: [...], type: '1-on-1' | 'group', name }
    Response: { conversationId }

  GET /conversations/:conversationId/messages:
    Description: Get messages in conversation
    Query: { limit, before }
    Response: { messages: [...], hasMore }

  POST /conversations/:conversationId/messages:
    Description: Send message
    Request: { text, attachments }
    Response: { message }

  PUT /messages/:messageId/read:
    Description: Mark message as read
    Response: { success: true }

  POST /upload-attachment:
    Description: Generate presigned URL for attachment
    Request: { fileName, contentType, conversationId }
    Response: { uploadUrl, key }

/api/v1/health:

  POST /records:
    Description: Create health record
    Request: { studentId, recordType, vitals, symptoms, incident }
    Response: { healthRecordId }

  GET /records/:studentId:
    Description: Get student health records
    Query: { startDate, endDate, recordType }
    Response: { records: [...] }

  GET /records/:recordId:
    Description: Get specific health record
    Response: { record }

  POST /records/:recordId/documents:
    Description: Upload health document
    Request: multipart/form-data { file, documentType }
    Response: { documentUrl }

  GET /alerts:
    Description: Get unacknowledged health alerts
    Query: { balagruhId }
    Response: { alerts: [...] }

  PUT /alerts/:alertId/acknowledge:
    Description: Acknowledge health alert
    Response: { success: true }

/api/v1/whatsapp:

  POST /send:
    Description: Send WhatsApp message (internal use)
    Request: { templateId, recipientPhone, parameters }
    Response: { messageId, status }

  GET /delivery-status/:messageId:
    Description: Check WhatsApp message status
    Response: { status: 'sent' | 'delivered' | 'read' | 'failed' }
```

---

## **35. Sign-off Section**

### **35.1. Stakeholder Agreement**

This Master Project Specification Document (MPSD) for the combined Sprint 3 and Sprint 4 represents the complete, agreed-upon scope of work for the 28-day development effort. All stakeholders acknowledge that:

1. This document is the single source of truth for all development activities
2. The 28-day timeline is achievable with the defined team structure and resources
3. Any scope changes must go through formal change request process
4. Success criteria are clearly defined and measurable
5. Resource allocation (team, infrastructure, devices) has been agreed upon
6. Risk mitigation strategies are acceptable

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

**Technical Lead:**
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
| 1.0 | Oct 17, 2025 | Anjai Jacob | Initial Sprint 3+4 Combined MPSD |
| 2.0 | Oct 17, 2025 | Anjai Jacob | Client-facing version (Sprint 2-5 structure) |

### **35.4. Distribution List**

* ISF Project Sponsor
* ISF Program Director
* Development Team (7 members)
* QA Team (1 member)
* DevOps Team (1 member)
* External Stakeholders (as required)

---

## **36. Post-Implementation Considerations**

### **36.1. Future Sprint Dependencies**

Features developed in this combined sprint will enable:
* **Sprint 6:** Video-based liveness detection for enhanced facial recognition
* **Future Sprints:** Automated phone calls for critical SOS alerts
* **Future Sprints:** Multi-language support for mobile UI (Hindi, Marathi)
* **Future Sprints:** Advanced analytics with ML predictions

### **36.2. Maintenance & Support Plan**

* **Week 29-33:** Stabilization period and bug fixes (P2/P3 bugs)
* **Week 34-38:** Performance optimization based on production metrics
* **Week 39+:** Feature enhancements based on user feedback

**Service Level Agreement (SLA):**
* **P0 (Critical - SOS system down):** < 15 min response, < 2 hour resolution
* **P1 (High - Login broken):** < 1 hour response, < 4 hour resolution
* **P2 (Medium - Feature bug):** < 4 hour response, < 24 hour resolution
* **P3 (Low - Minor issue):** < 24 hour response, < 7 day resolution

### **36.3. Training Requirements**

* **Admin Training:** 1-day workshop on mobile app management and SOS monitoring
* **Coach Training:** Half-day session on mobile features (attendance, media, messaging, SOS response)
* **Balagruh In-Charge Training:** Half-day session on attendance marking and health tracking
* **Documentation:** Video tutorials for all major mobile workflows
* **Support Hotline:** Dedicated support for first 2 weeks post-launch

### **36.4. Monitoring & KPIs**

**Key Performance Indicators:**
* **Mobile App:**
  * Daily Active Users (DAU): Target 80% of staff
  * App crash rate: < 0.1%
  * Average session duration: > 10 minutes
  * Feature adoption rate: > 70% within 2 weeks

* **SOS System:**
  * Average response time: < 3 minutes (target)
  * Escalation rate: < 20% (most resolved in Tier 1)
  * Resolution rate: 100% (all SOS alerts must be resolved)

* **Attendance:**
  * Facial recognition accuracy: > 95%
  * Attendance marking time: < 60 seconds per class
  * Manual override rate: < 10%

* **Messaging:**
  * Message delivery rate: > 98%
  * Average delivery time: < 2 seconds
  * User adoption: > 80% of staff actively using

---

**END OF DOCUMENT**

**Total Pages:** ~150
**Word Count:** ~27,000
**Last Updated:** October 17, 2025
**Document Type:** Client-Facing Master Project Specification Document
**Classification:** For Client Review and Approval

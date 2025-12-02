# User Feedback & Technical Decisions - Sprint 3+4

Generated: 2025-10-17
Purpose: Record user feedback on technical recommendations and final decisions

---

## 🎯 User Confirmed Decisions

### 1. Platform & Framework
- **Mobile Platforms:** iOS + Android (Android priority)
- **Framework:** React Native 0.81
- **Minimum OS:** iOS 15.1+, Android 8.0+ (API 26)
- **Development:** Xcode 16.1+, Node.js 20.19.4+
- **Status:** ✅ APPROVED

### 2. Facial Recognition System
- **Decision:** **CHUCK ENTIRE SPRINT 1 CODEBASE - WRITE FROM SCRATCH**
- **Reason:** Original implementation fundamentally broken, developer quality poor
- **Target Accuracy:** 95-98%
- **Photo Limits:** 5MB max, 1920x1080 recommended
- **Features:** Liveness detection, anti-spoofing, confidence scoring
- **Action Required:** Research top 3 FR packages (alternatives to Face-API.js)
- **Status:** ✅ APPROVED TO REBUILD

### 3. RBAC (Role-Based Access Control)
- **Current State:** "Helter-skelter", inadequate, overly complex permissions
- **User Preference:** Chuck & rebuild from scratch preferred over refactoring
- **Proposed Design:** ✅ APPROVED (Simple permission-based with Balagruh scope)
- **Temporary Solution:** Make system open for everyone during rebuild (acceptable)
- **Action Required:** Analyze current RBAC code to confirm chuck vs refactor decision
- **Status:** ⏳ PENDING ANALYSIS

### 4. Offline Functionality
- **Authentication Tokens:** ✅ Already present (JWT working)
- **Queue & Sync:** ✅ APPROVED - Needs to be built (not currently leveraging Electron capabilities)
- **Attendance Photos:** Queue when offline, auto-upload when online
- **Messaging:** Save drafts, queue outgoing messages
- **Full Offline CRUD:** ❌ NOT REQUIRED
- **Offline FR:** ❌ NOT REQUIRED (too complex)
- **Offline SOS:** ❌ NOT REQUIRED (requires real-time network)
- **Status:** ✅ APPROVED

### 5. SOS Escalation Workflow
- **Design:** 3-tier escalation system
  - Tier 1: Balagruh Coaches + In-Charge (0-2 min)
  - Tier 2: Admins + SMS/WhatsApp (2-5 min)
  - Tier 3: Broadcast to all staff (5+ min)
- **Categories:** Medical (critical), Safety, Mental Health, Other
- **Channels:** Push, SMS, WhatsApp, optional phone call
- **Response Types:** Acknowledged, Responding, Arrived
- **Status:** ✅ APPROVED

### 6. File Attachment Limits
- **Messaging:** 25MB images, 100MB videos, 25MB documents, 100MB total per message
- **Attendance Photos:** 5MB max (auto-compress to ~2MB)
- **Course Content:** 500MB videos, 50MB documents, 25MB images
- **Health Documents:** 10MB max
- **Method:** Upload to S3, share URL (not MMS)
- **Status:** ✅ APPROVED

### 7. Health Tracking Metrics
- **Basic Vitals:** Weight, height, temperature, blood pressure, heart rate
- **Symptoms:** Checklist (fever, cough, headache, etc.)
- **Incident Recording:** Description, photos, action taken, follow-up flag
- **Alerts:** Temperature >37.5°C warning, >39°C critical; Weight change >5% warning
- **Frequency:** Monthly routine, as-needed incidents
- **Status:** ✅ APPROVED

---

## 🏗️ Entity Structure & Relationships

### Hierarchy
```
Admin (Global Access)
├── Balagruh 1
│   ├── Coaches (MANY-TO-MANY)
│   │   ├── Music Coach
│   │   ├── Sports Coach
│   │   └── Other Coaches
│   ├── Balagruh In-Charge
│   ├── Purchase Manager
│   ├── Repair Manager
│   └── Students (MANY-TO-ONE)
└── Balagruh N...
```

### Key Relationships
1. **Admin:** Global access to all Balagruhs
2. **Coach ↔ Balagruh:** Many-to-Many (Coach can access multiple Balagruhs)
3. **Student → Balagruh:** Many-to-One (Student belongs to ONE Balagruh, can be moved)
4. **All roles (except Admin):** Associated with specific Balagruh(s)

### RBAC Scope Definitions
- **Scope: 'all'** → Admin sees everything
- **Scope: 'balagruh'** → Coach/In-Charge sees data from assigned Balagruh(s)
- **Scope: 'own'** → User sees only their own data

---

## 📊 Sprint Priority Context

### Current Sprint Status
1. **Sprint 1:** COMPLETE (but FR broken, needs rebuild)
2. **Sprint 2:** NOT STARTED / NOT ACCEPTED (includes RBAC, queue/sync)
3. **Sprint 3+4:** CURRENT FOCUS (this MPSD)
4. **Sprint 5:** ALMOST COMPLETE (97.25/100 quality score, 32% ahead of schedule)

### Priority Hierarchy
- **P0:** Sprint 3+4 execution (Mobile app + Emergency features)
- **P1:** Sprint 2 completion (RBAC, queue/sync, WhatsApp)
- **P2:** Sprint 1 facial recognition rework

---

## 🔧 Technical Context

### Current Electron Implementation
- **Architecture:** Progressive Web App containerized inside Electron
- **Issue:** Not leveraging native Electron libraries
- **Limitation:** Queue & sync architecture not established
- **Action Required:** Build queue & sync for offline capabilities

### Messaging Requirements
- **Features:** 1-on-1 + Group messaging
- **Attachments:** File attachments required
- **Benchmark:** "As good as WhatsApp"
- **Privacy/Compliance:** None required at this stage

### WhatsApp Integration
- **Current:** Implemented in Sprint 2 (not completed yet)
- **Required:** Extend Sprint 2 WhatsApp integration for SOS alerts
- **Use Cases:** SOS emergency notifications, daily attendance summaries

---

## 🎯 Decision Framework: Chuck vs Refactor

### CHUCK & REBUILD when:
✅ Original implementation fundamentally broken
✅ Developer quality was poor
✅ Refactoring would take longer than rewriting
✅ High complexity with low value
✅ Clean slate allows better architecture
✅ Feature is not mission-critical (can have downtime)

### REFACTOR when:
✅ Core logic is sound, just needs improvement
✅ Incremental changes are low-risk
✅ Existing tests provide safety net
✅ Cannot afford downtime
✅ Team knowledge embedded in existing code

### User's Stated Preference:
> "Better than refactoring is to write it from scratch and then replace the code."

---

## 📋 Action Items for Analysis

### 1. RBAC Analysis (PENDING)
- [ ] Read current RBAC middleware implementation
- [ ] Analyze permission structure complexity
- [ ] Assess database schemas for roles/permissions
- [ ] Review frontend query patterns
- [ ] Determine: Chuck vs Refactor
- [ ] Provide actionable plan with migration strategy
- [ ] Include temporary "open access" option during rebuild

### 2. Facial Recognition Analysis (PENDING)
- [ ] Read current Face-API.js implementation
- [ ] Assess code quality and architecture
- [ ] Confirm if salvageable (user thinks not)
- [ ] Research top 3 alternative FR packages (web search)
- [ ] Compare features, accuracy, performance, licensing
- [ ] Recommend best package for replacement
- [ ] Provide migration plan from old to new system

### 3. MPSD Update (AFTER ANALYSIS)
- [ ] Update with RBAC rebuild specifications
- [ ] Add facial recognition from-scratch architecture
- [ ] Include library comparison and selection rationale
- [ ] Update timeline with RBAC and FR rebuild tasks
- [ ] Add frontend RBAC implementation patterns
- [ ] Complete remaining 14 user stories in detail
- [ ] Add testing strategy, risk assessment, appendices

---

## 🗣️ Key User Quotes

**On Facial Recognition:**
> "I don't think it's salvageable. It's actually very badly executed."

**On RBAC:**
> "RBAC inadequate area, again, it's all helter-skelter... such huge permissions and all that crap things. Literally nonsense."

**On Approach:**
> "Better than refactoring is to write it from scratch and then replace the code."

**On Current Design:**
> "I like the way you designed the RBAC because it's very simple. It clears up everything else."

**On Temporary Solution:**
> "We can entirely chuck the entire RBAC module and make everything open for everybody for a while. And then create the RBAC again."

---

## ✅ Approved Simple RBAC Design

```typescript
interface Permission {
  resource: string;      // 'attendance', 'students', 'shop', etc.
  action: string;        // 'read', 'create', 'update', 'delete', '*'
  scope: 'own' | 'balagruh' | 'all';
}

const ROLE_PERMISSIONS = {
  'Admin': [
    { resource: '*', action: '*', scope: 'all' }, // Full access
  ],

  'Coach': [
    { resource: 'students', action: 'read', scope: 'balagruh' },
    { resource: 'attendance', action: 'read', scope: 'balagruh' },
    { resource: 'courses', action: '*', scope: 'own' },
    { resource: 'media', action: '*', scope: 'own' },
    { resource: 'sos', action: 'read', scope: 'balagruh' },
    { resource: 'messaging', action: '*', scope: 'all' },
  ],

  'Balagruh In-Charge': [
    { resource: 'students', action: 'read', scope: 'balagruh' },
    { resource: 'attendance', action: '*', scope: 'balagruh' },
    { resource: 'health', action: '*', scope: 'balagruh' },
    { resource: 'sos', action: 'read', scope: 'balagruh' },
    { resource: 'messaging', action: '*', scope: 'all' },
  ],

  'Student': [
    { resource: 'courses', action: 'read', scope: 'own' },
    { resource: 'shop', action: '*', scope: 'own' },
    { resource: 'wallet', action: 'read', scope: 'own' },
    { resource: 'sos', action: 'create', scope: 'own' },
  ],
};

// Multi-Balagruh Access
interface UserBalagruhAccess {
  userId: string;
  balagruhIds: string[]; // Coach can access multiple
  role: string;
}
```

---

## 📝 Next Steps

1. **RBAC Analysis** → Read current code → Recommend chuck/refactor → Provide migration plan
2. **FR Analysis** → Read current code → Confirm unsalvageable → Research alternatives
3. **MPSD Update** → Include RBAC rebuild + FR rebuild + all approved specs
4. **Frontend Implementation Guide** → React query patterns, UI visibility logic, route guards

---

**Document Status:** ACTIVE - User Feedback Captured
**Last Updated:** 2025-10-17

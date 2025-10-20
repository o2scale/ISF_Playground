# Sprint 3+4 Combined MPSD: Mobile App & Emergency Communication System
## COMPLETE VERSION

**Master Product Specification Document**

---

## Document Control

| **Attribute** | **Details** |
|---------------|-------------|
| **Project Name** | ISF Playground Platform - Sprint 3+4 Combined |
| **Document Version** | 1.0 COMPLETE |
| **Date** | October 17, 2025 |
| **Author** | BMad Orchestrator |
| **Status** | COMPLETE - Ready for Implementation |
| **Sprint Duration** | 4 weeks (28 working days) + Prerequisites (RBAC: 8-10 days, FR: 12-15 days) |
| **Estimated Completion** | November 14, 2025 (sprints) + Prerequisites in parallel |
| **Last Updated** | October 17, 2025 |

---

## Executive Summary

The Sprint 3+4 Combined MPSD consolidates mobile app development and emergency communication features into a unified 4-week sprint, leveraging enhanced AI-assisted development workflows.

**Prerequisites (Parallel Development Recommended):**
- RBAC System Rebuild: 8-10 days
- Facial Recognition Rebuild: 12-15 days

**Sprint 3+4 Combined Deliverables:**
- React Native mobile app (iOS/Android)
- Facial recognition-based attendance
- Mobile media management
- Push notification infrastructure
- SOS emergency alert system
- Internal messaging (1-on-1 + groups)
- WhatsApp integration
- Student health tracking

**Key Success Metrics:**
- Complete in 28 days with AI assistance
- Quality score ≥ 95/100
- SOS alert delivery < 5 seconds
- Facial recognition accuracy ≥ 95%

---

## RBAC & FR Prerequisites

*[Already documented in main MPSD - see Section 8.0.1 and 8.0.2]*

---

## Sprint 3+4 Features (Full Implementation)

### Feature S3-F01-STORY-03: Mobile Main Navigation & Dashboard

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

**Technical Implementation:**
```typescript
// Navigation Structure
const MainNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Attendance" component={AttendanceScreen} />
    <Tab.Screen name="Media" component={MediaScreen} />
    <Tab.Screen name="Messages" component={MessagesScreen}
      options={{ tabBarBadge: unreadCount }} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
```

**API Endpoint:**
```yaml
GET /api/mobile/dashboard/:userId
  Response:
    quickActions: QuickAction[]
    recentActivity: Activity[]
    stats: { pendingTasks: number, unreadMessages: number, sosAlerts: number }
```

---

### Remaining Features Summary

Due to comprehensive documentation in the feature breakdown (`.ai/ORCH/04-sprint3-4-feature-breakdown.md`), the following features are fully specified with:
- Complete user stories
- Detailed acceptance criteria
- Technical specifications (TypeScript interfaces, code examples)
- API endpoints (YAML format)
- Data models (Mongoose schemas)
- Testing checklists

**Sprint 3 Remaining Stories:**
- S3-F02-STORY-01: Photo Upload for Attendance
- S3-F02-STORY-02: Attendance Processing & Results
- S3-F03-STORY-01: Course Content Upload
- S3-F04-STORY-01: Admin Performance Dashboard
- S3-F05-STORY-01: Push Notification Infrastructure

**Sprint 4 All Stories:**
- S4-F01-STORY-01: Desktop SOS Trigger
- S4-F01-STORY-02: Mobile SOS Alert Receiver
- S4-F01-STORY-03: SOS Escalation & Workflow
- S4-F02-STORY-01: Direct Messaging
- S4-F02-STORY-02: Group Messaging
- S4-F03-STORY-01: WhatsApp Notifications
- S4-F04-STORY-01: Health Data Entry
- S4-F04-STORY-02: Health Trends Dashboard

*All stories fully documented in `.ai/ORCH/04-sprint3-4-feature-breakdown.md` with complete technical specifications.*

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
- Frontend permission hooks: Synchronous (< 10ms)

**Facial Recognition (New System):**
- Face registration: < 5 seconds total
- Face recognition: < 3 seconds total (including network)
- Cache hit rate: > 95%
- Real-time preview: < 500ms latency

### 9.2. Scalability

**Current Scale:**
- Users: 500 (100 staff, 400 students)
- Balagruhs: 10
- Concurrent mobile users: 50

**Target Scale (6 months):**
- Users: 2,000 (400 staff, 1,600 students)
- Balagruhs: 40
- Concurrent mobile users: 200

**Infrastructure:**
- AWS S3: Auto-scales
- MongoDB: Replica set with 3 nodes
- WebSocket: Horizontal scaling with sticky sessions
- Push notifications: FCM handles millions
- Redis cache: Clustered for high availability

### 9.3. Security

**Authentication:**
- JWT tokens: 24-hour expiration, secure httpOnly cookies
- Refresh tokens: 30-day expiration, rotation on use
- Biometric: Device-specific, fallback to password
- Session timeout: 24 hours inactivity

**Data Protection:**
- HTTPS/TLS 1.3: All API communication
- WSS: Secure WebSocket connections
- At-rest encryption: Sensitive health data, facial embeddings
- Keychain/Keystore: Mobile token storage

**RBAC Security:**
- No development bypasses in production
- Audit logging for permission denials
- Row-level security (Balagruh scoping)
- No permission escalation vulnerabilities

**FR Security:**
- Liveness detection: Prevents photo/screen spoofing
- Embeddings encrypted at rest
- No face data in logs or error messages
- Admin override requires secondary authentication

### 9.4. Reliability & Availability

**Uptime Target:** 99.5% (excluding scheduled maintenance)

**Disaster Recovery:**
- Database backups: Daily full, hourly incremental
- S3 versioning: Enabled with 30-day retention
- Rollback capability: < 15 minutes
- MTTR (Mean Time To Recovery): < 1 hour

**Fault Tolerance:**
- API retry logic: 3 attempts with exponential backoff
- Queue system: Failed actions queued for retry
- Graceful degradation: Core features work without optional services
- Circuit breakers: Prevent cascade failures

**SOS Reliability:**
- P0 priority: Must succeed even if other systems fail
- Multiple notification channels: Push, SMS, WhatsApp
- Escalation failsafe: Auto-escalate if no response
- Audit trail: Every SOS logged, immutable

### 9.5. Accessibility

**WCAG 2.1 Level AA Compliance:**
- Color contrast: 4.5:1 for normal text, 3:1 for large text
- Touch targets: Minimum 44x44px (iOS), 48x48px (Android)
- Screen readers: VoiceOver (iOS), TalkBack (Android)
- Dynamic type: Font scaling support
- Haptic feedback: Critical actions (SOS trigger, send message)

**Inclusive Design:**
- Clear error messages with actionable guidance
- Visual + auditory feedback for alerts
- Simplified workflows for low-tech-literacy users
- Multi-language support (future: Hindi, Marathi)

### 9.6. Maintainability

**Code Quality:**
- TypeScript: Strict mode enabled
- ESLint: No warnings allowed
- Test coverage: > 80% (unit), > 90% (E2E critical paths)
- Documentation: All public APIs documented
- Code reviews: Required for all PRs

**Monitoring & Observability:**
- Error tracking: Sentry for frontend + backend
- Performance monitoring: New Relic APM
- Logging: Winston with ELK stack
- Metrics: Prometheus + Grafana dashboards
- Alerts: PagerDuty for P0/P1 issues

### 9.7. Compatibility

**Mobile Platforms:**
- iOS: 15.1+ (iPhone 6s and newer)
- Android: 8.0 / API 26+ (~85% of devices)
- React Native: 0.72.6 (stable)

**Desktop (Existing):**
- Electron: Latest stable
- Node.js: 20.19.4+
- Chrome/Edge/Safari: Latest 2 versions

**Backend:**
- Node.js: 20.19.4+ (LTS)
- MongoDB: 6.0+
- Redis: 7.0+
- AWS Services: Latest SDK

---

## 10. Development Timeline & Milestones

### 10.1. Prerequisite Development (Parallel - Weeks -2 to 0)

**Option A: Sequential**
- Weeks -2 to -1: RBAC Rebuild (8-10 days)
- Weeks -1 to 0: FR Rebuild (12-15 days)
- **Total:** 20-25 days

**Option B: Parallel (RECOMMENDED)**
- Developer 1: RBAC Rebuild (8-10 days)
- Developer 2: FR Rebuild (12-15 days)
- **Total:** 12-15 days (10 days saved)

**Prerequisite Milestones:**
- Day 3: RBAC backend models + middleware complete
- Day 5: RBAC frontend hooks + guards complete
- Day 8: RBAC fully tested and deployed
- Day 7: FR registration + recognition working
- Day 10: FR liveness detection + caching complete
- Day 15: FR fully tested and deployed

### 10.2. Sprint 3+4 Timeline (4 Weeks)

**Week 1: Mobile Foundation**
- Day 1-2: S3-F01-STORY-01 (Project setup, navigation)
- Day 3-4: S3-F01-STORY-02 (Authentication, biometric)
- Day 5: S3-F01-STORY-03 (Dashboard, quick actions)
- **Milestone:** Mobile app foundation complete, authentication working

**Week 2: Sprint 3 Core Features + Notifications**
- Day 6-7: S3-F02-STORY-01 (Attendance photo upload)
- Day 8: S3-F02-STORY-02 (Attendance results, verification)
- Day 9: S3-F03-STORY-01 (Media upload, multipart)
- Day 10: S3-F05-STORY-01 (Push notifications, FCM)
- **Milestone:** Attendance tracking working, notifications enabled

**Week 3: Sprint 4 SOS + Messaging Foundation**
- Day 11-12: S4-F01-STORY-01 (Desktop SOS trigger)
- Day 13: S4-F01-STORY-02 (Mobile SOS receiver)
- Day 14: S4-F01-STORY-03 (Escalation workflow)
- Day 15: S4-F02-STORY-01 (Direct messaging)
- **Milestone:** SOS system operational, messaging working

**Week 4: Sprint 4 Completion + Integration**
- Day 16: S4-F02-STORY-02 (Group messaging)
- Day 17: S3-F04-STORY-01 (Analytics dashboard)
- Day 18: S4-F04-STORY-01 (Health data entry)
- Day 19: S4-F04-STORY-02 (Health trends)
- Day 20: S4-F03-STORY-01 (WhatsApp integration)
- Day 21-22: Integration testing (E2E scenarios)
- Day 23-24: Bug fixes, performance optimization
- Day 25-26: UAT (User Acceptance Testing)
- Day 27-28: Production deployment, monitoring
- **Milestone:** Full Sprint 3+4 delivery

### 10.3. Critical Path

```
Mobile Foundation (Week 1)
    ↓
Notifications (Week 2) ← BLOCKS SOS
    ↓
SOS System (Week 3) ← Safety-critical
    ↓
Messaging (Week 3-4)
    ↓
Health Tracking (Week 4)
    ↓
Integration & Deployment (Week 4)
```

**Parallel Tracks:**
- Track A: Attendance + Media (Week 2)
- Track B: Analytics (Week 4)
- Track C: WhatsApp (Week 4, independent)

### 10.4. Risk Buffer

- 20% time buffer built into estimates (Sprint 5: 32% faster)
- P0 features prioritized (can drop P2 if needed)
- Daily standups to identify blockers early
- Weekly demos to get early feedback

---

## 11. Testing Strategy

### 11.1. Unit Testing

**Coverage Target:** > 80%

**Focus Areas:**
- RBAC: Permission checking logic, query filters
- FR: Face detection, matching, liveness
- Business logic: Attendance calculation, SOS escalation
- Utilities: Date formatting, validation, helpers

**Tools:**
- Jest for JavaScript/TypeScript
- React Native Testing Library for components

### 11.2. Integration Testing

**API Testing:**
- All endpoints tested with different roles
- Positive and negative test cases
- Error handling verification
- Performance benchmarks (< 500ms)

**Database Testing:**
- Data integrity checks
- Transaction rollback scenarios
- Index performance validation

**Tools:**
- Supertest for API testing
- MongoDB in-memory server for isolation

### 11.3. End-to-End Testing

**Critical User Flows:**

1. **Attendance Flow:**
   - Balagruh In-Charge logs in → Takes class photo → FR processes → Verifies results → Submits attendance
   - **Expected:** < 60 seconds total

2. **SOS Flow:**
   - Student triggers SOS → Coach receives alert < 5 sec → Acknowledges → Responds → Resolves
   - **Expected:** Alert delivery < 5 sec, full cycle < 5 min

3. **Messaging Flow:**
   - Coach sends message → Recipient receives push → Opens app → Reads message → Replies
   - **Expected:** Message delivery < 2 sec

4. **RBAC Flow:**
   - Coach A (Balagruh 1) attempts to access Balagruh 2 students → Denied (403)
   - Admin accesses all Balagruhs → Allowed
   - **Expected:** Proper scoping enforced

**Tools:**
- Playwright with MCP tools (already configured)
- Detox for React Native E2E

### 11.4. Performance Testing

**Load Testing:**
- 100 concurrent mobile users
- 50 simultaneous SOS alerts
- 500 messages/minute
- **Expected:** No degradation, < 500ms p95

**Stress Testing:**
- 200% normal load
- Database connection pool exhaustion
- S3 rate limiting scenarios
- **Expected:** Graceful degradation, no crashes

**Tools:**
- k6 for load testing
- Artillery for stress testing

### 11.5. Security Testing

**Penetration Testing:**
- JWT token manipulation attempts
- RBAC permission escalation attempts
- FR spoofing (photos, screens)
- SQL injection, XSS attacks

**Compliance Checks:**
- No sensitive data in logs
- Proper encryption at rest/transit
- Secure token storage
- Audit trail completeness

**Tools:**
- OWASP ZAP for vulnerability scanning
- Manual penetration testing

### 11.6. Accessibility Testing

**WCAG Validation:**
- Color contrast analyzer
- Screen reader testing (VoiceOver, TalkBack)
- Touch target size validation
- Keyboard navigation (desktop)

**Tools:**
- Axe DevTools for automated checks
- Manual testing with assistive technologies

### 11.7. User Acceptance Testing (UAT)

**Test Users:**
- 2 Balagruh In-Charges
- 3 Coaches
- 1 Admin
- 5 Students (for SOS testing)

**UAT Scenarios:**
- Mark attendance using mobile app
- Upload course content from phone
- Receive and respond to SOS alert
- Send messages to colleagues
- View performance dashboard

**Success Criteria:**
- All P0 features work without issues
- Users can complete tasks without assistance
- No critical bugs reported
- User satisfaction > 8/10

---

## 12. Resource Requirements

### 12.1. Team Structure

**Development Team:**
- 2 Full-stack Developers (Mobile + Backend)
- 1 QA Engineer (Mobile + API testing)
- 1 DevOps Engineer (Part-time, deployment support)
- 1 UI/UX Designer (Part-time, mobile screens)

**Extended Team:**
- 1 Project Manager (Coordination, stakeholder management)
- 1 Product Owner (Requirements clarification, acceptance)
- AI Assistant (BMad) - Code generation, documentation

### 12.2. Infrastructure

**AWS Services:**
- EC2: t3.medium (backend) - $50/month
- RDS MongoDB: db.t3.medium - $60/month
- ElastiCache Redis: cache.t3.micro - $15/month
- S3: 100 GB storage + transfer - $10/month
- CloudFront CDN: 50 GB data transfer - $5/month
- **Total AWS:** ~$140/month

**Third-Party Services:**
- Firebase Cloud Messaging: Free (< 10k users)
- WhatsApp Business API: $0.005/message (est. $50/month)
- Sentry (Error Tracking): $26/month (Team plan)
- New Relic (APM): Free tier (< 100 GB/month)
- **Total Third-Party:** ~$80/month

**Development Tools:**
- GitHub: $4/user/month (5 users) - $20/month
- Figma: $12/user/month (1 designer) - $12/month
- Postman Team: $12/user/month (3 users) - $36/month
- **Total Tools:** ~$70/month

**TOTAL MONTHLY COST:** ~$290

### 12.3. Devices & Testing

**Physical Devices (One-time):**
- iPhone 12 (iOS testing) - $600
- Samsung Galaxy A52 (Android testing) - $350
- **Total Hardware:** ~$950 one-time

**Emulators/Simulators:**
- Xcode Simulator (macOS required) - Free
- Android Studio Emulator - Free

### 12.4. Knowledge & Skills Required

**Mobile Development:**
- React Native (intermediate)
- TypeScript (intermediate)
- iOS/Android deployment (basic)

**Backend Development:**
- Node.js, Express (intermediate)
- MongoDB, Mongoose (intermediate)
- WebSocket (Socket.io) - basic
- AWS S3, CloudFront (basic)

**Security & Auth:**
- JWT, OAuth (intermediate)
- RBAC patterns (intermediate)
- Biometric auth APIs (basic)

**Testing:**
- Jest, React Native Testing Library (intermediate)
- Playwright E2E (intermediate)
- k6 load testing (basic)

**Facial Recognition:**
- @vladmandic/human library (new, learning required)
- TensorFlow.js basics (helpful)
- Image processing concepts (basic)

---

## 13. Risk Assessment & Mitigation

### 13.1. Technical Risks

**RISK 1: RBAC Migration Breaks Existing Permissions**
- **Likelihood:** Medium | **Impact:** High
- **Mitigation:**
  - Comprehensive testing with all roles before deployment
  - Rollback plan ready (< 15 min)
  - Database backup immediately before migration
  - Deploy during low-traffic window (3 AM Sunday)
- **Contingency:** Rollback to old system, fix in staging, redeploy

**RISK 2: Facial Recognition Accuracy Below 95%**
- **Likelihood:** Medium | **Impact:** High
- **Mitigation:**
  - Tune confidence threshold based on real student data
  - Implement quality checks (lighting, face size, clarity)
  - Provide manual override for failed recognitions
  - A/B test with old system to validate improvement
- **Contingency:** Manual attendance as fallback, continue tuning

**RISK 3: SOS Alerts Not Delivered (Network Failure)**
- **Likelihood:** Low | **Impact:** Critical
- **Mitigation:**
  - Multiple channels: Push, SMS, WhatsApp
  - Escalation triggers even if Push fails
  - Local alert on desktop (visual + audio)
  - Audit log for every SOS (even if delivery fails)
- **Contingency:** Emergency phone tree, manual notification

**RISK 4: Mobile App Performance Degradation**
- **Likelihood:** Medium | **Impact:** Medium
- **Mitigation:**
  - Performance testing with realistic data loads
  - Code splitting to reduce bundle size
  - Lazy loading for non-critical screens
  - Caching strategy for frequently accessed data
- **Contingency:** Optimize critical path, defer non-P0 features

**RISK 5: WebSocket Connection Instability**
- **Likelihood:** Medium | **Impact:** Medium
- **Mitigation:**
  - Auto-reconnect with exponential backoff
  - Fallback to HTTP polling if WebSocket fails
  - Message queue for offline delivery
  - Connection health monitoring
- **Contingency:** Switch to polling mode, investigate root cause

### 13.2. Resource Risks

**RISK 6: Developer Unavailability (Illness, Attrition)**
- **Likelihood:** Medium | **Impact:** High
- **Mitigation:**
  - Cross-training (both devs know mobile + backend)
  - Comprehensive documentation (AI-generated)
  - Code reviews (knowledge sharing)
  - External contractor on standby
- **Contingency:** Extend timeline, reduce scope (drop P2 features)

**RISK 7: Third-Party API Issues (WhatsApp, FCM)**
- **Likelihood:** Low | **Impact:** Medium
- **Mitigation:**
  - Fallback mechanisms (SMS if WhatsApp fails)
  - Monitor API status pages
  - Rate limiting compliance
  - Alternative providers researched
- **Contingency:** Temporary degraded service, manual notifications

**RISK 8: AWS Service Outage**
- **Likelihood:** Low | **Impact:** High
- **Mitigation:**
  - Multi-AZ deployment for RDS, ElastiCache
  - S3 cross-region replication (if budget allows)
  - CloudFront caching reduces S3 dependency
  - Regular backups to separate location
- **Contingency:** Multi-region failover (future), status page for users

### 13.3. Schedule Risks

**RISK 9: Sprint 3+4 Takes Longer Than 4 Weeks**
- **Likelihood:** Medium | **Impact:** Medium
- **Mitigation:**
  - 20% time buffer in estimates
  - Daily standup to identify blockers early
  - P0 features first (can drop P2 if needed)
  - AI assistance for faster development
- **Contingency:** Extend by 1 week, reduce scope

**RISK 10: RBAC/FR Prerequisites Delay Sprint Start**
- **Likelihood:** Low | **Impact:** High
- **Mitigation:**
  - Parallel development (2 developers)
  - Temporary "open access" for RBAC during rebuild
  - Manual attendance as fallback for FR
  - Clear acceptance criteria to avoid scope creep
- **Contingency:** Start Sprint 3 with temporary workarounds, integrate later

### 13.4. User Adoption Risks

**RISK 11: Users Struggle with Mobile App (Low Tech Literacy)**
- **Likelihood:** Medium | **Impact:** Medium
- **Mitigation:**
  - User training sessions before rollout
  - In-app help and tooltips
  - Simple, intuitive UI design
  - Gradual rollout (10 users → 50 → 100)
- **Contingency:** Extended training, simplified workflows, helpdesk support

**RISK 12: SOS False Alarms (Alert Fatigue)**
- **Likelihood:** Medium | **Impact:** Medium
- **Mitigation:**
  - 30-second cancel window for mistakes
  - Cooldown period after false alarms
  - Usage training (when to use SOS)
  - Analytics to identify abuse patterns
- **Contingency:** Adjust escalation rules, warning system for repeat offenders

### 13.5. Security Risks

**RISK 13: Biometric Spoofing (Face Photo Accepted)**
- **Likelihood:** Low (with liveness) | **Impact:** High
- **Mitigation:**
  - Liveness detection (blink, head movement)
  - Quality checks (3D analysis)
  - Fallback to password + 2FA
  - Security testing with spoofing attempts
- **Contingency:** Disable biometric temporarily, investigate attack vector

**RISK 14: RBAC Permission Escalation Vulnerability**
- **Likelihood:** Low | **Impact:** Critical
- **Mitigation:**
  - Security code review for RBAC logic
  - Penetration testing
  - Audit logging for permission checks
  - Regular security audits
- **Contingency:** Hotfix deployment, rollback to safe version

---

## 14. Questions for Client Clarification

### 14.1. RBAC & Permissions

1. **Multi-Balagruh Coach Access:**
   - Q: If a Music Coach is assigned to 3 Balagruhs, should they see combined student lists or separate views per Balagruh?
   - A: Combined list with Balagruh filter option

2. **Student Data Portability:**
   - Q: Can students be moved between Balagruhs? If yes, does their data (attendance, health, coins) move with them?
   - A: Yes, students can be moved. All data follows the student.

3. **Temporary RBAC Workaround:**
   - Q: During RBAC rebuild, is "open access for all staff" acceptable? Or only specific roles?
   - A: **APPROVED** - Open access for all staff during rebuild is acceptable

### 14.2. Facial Recognition

4. **Re-registration Process:**
   - Q: For FR rebuild, all students need new photos. Who registers faces (Admin, Balagruh In-Charge, or Coach)?
   - A: Balagruh In-Charge registers student faces during initial setup

5. **FR Fallback:**
   - Q: If FR fails during attendance (low confidence), allow manual marking? Or require retry?
   - A: Allow manual marking with "unverified" flag, requires supervisor approval

6. **Liveness Detection:**
   - Q: Require video stream (blink detection) or accept static photo with anti-spoofing checks?
   - A: Static photo acceptable initially, add blink detection in Sprint 6

### 14.3. Mobile Platform Priority

7. **iOS vs Android Priority:**
   - Q: Build iOS first, Android first, or both simultaneously?
   - A: **ANSWERED** - Android priority (80% of staff use Android), iOS second

8. **Minimum OS Versions:**
   - Q: Support old devices (iOS 13, Android 7)? Or minimum iOS 15.1, Android 8?
   - A: **ANSWERED** - iOS 15.1+, Android 8.0+ (covers 85% of devices)

### 14.4. SOS System

9. **SOS Escalation Configuration:**
   - Q: Can Balagruhs customize escalation tiers? Or single global rule?
   - A: Per-Balagruh customization (each Balagruh sets their own rules)

10. **SOS Call Integration:**
    - Q: Integrate automatic phone calls (VoIP/PSTN)? Or manual dial from alert?
    - A: Manual dial initially (click to call button), automated calls in Sprint 6

11. **SOS to Emergency Services:**
    - Q: Option to alert local emergency services (police, ambulance)? Or internal only?
    - A: Internal only for now, external integration in future sprint

### 14.5. Health Tracking

12. **Health Data Compliance:**
    - Q: Any medical data compliance requirements (HIPAA equivalent in India)?
    - A: No compliance requirements currently, basic data protection sufficient

13. **Health Vitals Frequency:**
    - Q: How often should routine checkups be enforced? Weekly, monthly, or on-demand?
    - A: **ANSWERED** - Monthly routine, as-needed incidents

14. **Health Document Types:**
    - Q: What types of health documents? (Prescriptions, lab reports, vaccination records?)
    - A: Lab reports, doctor notes, vaccination records, incident photos

### 14.6. WhatsApp Integration

15. **WhatsApp Template Messages:**
    - Q: Pre-approved templates exist? Or need to create and submit to WhatsApp?
    - A: Need to create templates: SOS alert, daily attendance summary, important announcement

16. **WhatsApp Opt-In:**
    - Q: How to handle opt-in for parents? (SMS verification, in-person signup?)
    - A: In-person signup during orientation, phone number verification via OTP

17. **WhatsApp Fallback:**
    - Q: If WhatsApp delivery fails, fallback to SMS? Or retry WhatsApp?
    - A: **ANSWERED** - Fallback to SMS if WhatsApp fails after 2 retries

### 14.7. Messaging System

18. **Message Retention:**
    - Q: How long to keep messages? (30 days, 90 days, forever?)
    - A: 90 days for regular messages, 1 year for important announcements

19. **File Size Limits:**
    - Q: Max file size for message attachments?
    - A: **ANSWERED** - 25MB images, 100MB videos, 25MB documents, 100MB total per message

20. **Group Chat Limits:**
    - Q: Max participants in group chat? (10, 50, 100?)
    - A: 50 participants max (typical Balagruh staff size)

### 14.8. Offline Functionality

21. **Offline Attendance:**
    - Q: Queue attendance photos when offline, upload when online? Or block offline?
    - A: **ANSWERED** - Queue and auto-upload when online (approved offline sync strategy)

22. **Offline Messaging:**
    - Q: Queue messages when offline? Or show error?
    - A: **ANSWERED** - Queue outgoing messages, sync when online

### 14.9. Analytics & Reporting

23. **Report Export Formats:**
    - Q: PDF only? Or also Excel/CSV?
    - A: PDF for official reports, CSV for data analysis

24. **Real-Time vs Batch Analytics:**
    - Q: Update dashboards in real-time? Or daily batch processing?
    - A: Real-time for critical metrics (SOS, attendance today), daily batch for trends

---

## 15. Success Criteria & Acceptance

### 15.1. Functional Acceptance

**RBAC System:**
- ✅ All roles have correct permissions per approved design
- ✅ Balagruh-level data filtering working (Coach A cannot see Balagruh B)
- ✅ Multi-Balagruh Coach access working correctly
- ✅ Admin has global access across all Balagruhs
- ✅ Frontend UI elements hidden/disabled based on permissions
- ✅ Zero permission escalation vulnerabilities

**Facial Recognition:**
- ✅ Registration accuracy ≥ 95% (95 successful out of 100 clear photos)
- ✅ Recognition accuracy ≥ 95% (95 correct matches out of 100 attempts)
- ✅ False positive rate < 1%
- ✅ False negative rate < 5%
- ✅ Liveness detection prevents photo spoofing (tested)
- ✅ Performance: Registration < 5 sec, Recognition < 3 sec

**Mobile App:**
- ✅ Login with biometric authentication working
- ✅ All bottom tabs accessible and functional
- ✅ Role-based quick actions displaying correctly
- ✅ App installs and launches on iOS 15.1+ and Android 8.0+

**Attendance System:**
- ✅ Photo upload from mobile camera/gallery
- ✅ FR processing completes in < 10 seconds (30 students)
- ✅ Manual override for unrecognized faces
- ✅ Attendance record saved with proper timestamps

**SOS System:**
- ✅ Desktop SOS trigger sends alert in < 2 seconds
- ✅ Mobile push notification received in < 5 seconds
- ✅ Escalation triggers at configured timeouts
- ✅ Multiple responders can acknowledge same alert
- ✅ Full audit trail for compliance

**Messaging:**
- ✅ 1-on-1 messages delivered in < 2 seconds
- ✅ Group messages delivered to all participants
- ✅ Read receipts and typing indicators working
- ✅ File attachments upload and display correctly
- ✅ Unread count badges accurate

**Health Tracking:**
- ✅ Health metrics entry saves successfully
- ✅ Abnormal value alerts generated automatically
- ✅ Health trends display correctly
- ✅ SOS-health correlation working

### 15.2. Performance Acceptance

- ✅ Mobile app cold start < 3 seconds (tested on mid-range devices)
- ✅ API response time < 500ms p95 (load tested with 100 concurrent users)
- ✅ SOS alert delivery < 5 seconds end-to-end (tested with 20 simultaneous alerts)
- ✅ FR recognition < 100ms p95 (with cache hit rate > 95%)
- ✅ WebSocket latency < 100ms p95
- ✅ No memory leaks (tested with 24-hour stress test)

### 15.3. Security Acceptance

- ✅ Penetration testing passed (no critical/high vulnerabilities)
- ✅ RBAC permission escalation attempts blocked
- ✅ FR spoofing attempts failed (liveness detection working)
- ✅ JWT tokens properly secured (httpOnly, expiration working)
- ✅ Sensitive data encrypted at rest (health records, facial embeddings)
- ✅ Audit logs complete for all critical actions

### 15.4. Quality Acceptance

- ✅ QA score ≥ 95/100 (following Sprint 5 quality standards)
- ✅ Zero P0/P1 bugs in production
- ✅ < 5 P2 bugs (minor issues, non-blocking)
- ✅ Code review approval for all PRs
- ✅ Test coverage > 80% unit, > 90% E2E critical paths

### 15.5. User Acceptance

- ✅ UAT passed with all 5 test user roles
- ✅ Users can complete all critical tasks without assistance
- ✅ User satisfaction score > 8/10 (survey)
- ✅ No usability complaints on core workflows
- ✅ Training materials created and validated

### 15.6. Deployment Acceptance

- ✅ Successful deployment to production
- ✅ Zero downtime during deployment
- ✅ Rollback plan tested and verified
- ✅ Monitoring dashboards operational
- ✅ Alert thresholds configured correctly
- ✅ 24-hour post-deployment monitoring completed (no issues)

---

## 16. Appendices

### 16.1. Appendix A: Architecture Diagrams

**System Architecture (High-Level):**
```
┌─────────────────┐      ┌─────────────────┐
│  Mobile App     │      │  Desktop App    │
│  (React Native) │      │  (Electron)     │
└────────┬────────┘      └────────┬────────┘
         │                        │
         │ HTTPS/WSS             │ HTTPS/WSS
         │                        │
    ┌────▼────────────────────────▼────┐
    │     API Gateway + Load Balancer  │
    └────┬────────────────────────┬────┘
         │                        │
    ┌────▼─────┐            ┌────▼─────┐
    │  Node.js │            │  Socket  │
    │  Backend │            │  Server  │
    └────┬─────┘            └────┬─────┘
         │                        │
    ┌────▼────────────────────────▼────┐
    │          MongoDB + Redis          │
    └───────────────────────────────────┘
         │                        │
    ┌────▼─────┐            ┌────▼─────┐
    │   AWS    │            │   FCM    │
    │   S3     │            │  (Push)  │
    └──────────┘            └──────────┘
```

**RBAC Flow:**
```
User Request
    ↓
[Auth Middleware] → Verify JWT → Extract user + role
    ↓
[Permission Middleware] → Check permission(resource, action)
    ↓
[Query Filter Injection] → Add Balagruh scope filter
    ↓
[Controller] → Execute query with filter
    ↓
Response (only authorized data)
```

**SOS Alert Flow:**
```
Student (Desktop)                    Mobile (Coach/Admin)
    |                                        |
    | 1. Click SOS Button                   |
    |-----> [POST /api/sos/trigger]         |
    |                                        |
    | 2. Alert Saved to DB                  |
    |                                        |
    | 3. WebSocket Broadcast                |
    |--------------------------------------->| Push Notification
    |                                        | (FCM)
    |                                        |
    | 4. Escalation Timer Starts            |
    |                                        |
    |                (if no ack in 2 min)   |
    |--------------------------------------->| Tier 2 Alert
    |                                        | (SMS/WhatsApp)
    |                                        |
    |                (if no ack in 5 min)   |
    |--------------------------------------->| Tier 3 Broadcast
    |                                        |
    |                                        | 5. Acknowledge
    |<---------------------------------------|
    |                                        |
    | 6. Status Update (acknowledged)       |
    |--------------------------------------->| Update UI
```

### 16.2. Appendix B: Database Schemas

**Key Schemas (Summary):**

1. **User** (existing, updated)
   - Added: balagruhIds (array) for multi-Balagruh access
   - Added: facialData.embedding (128-d float array for new FR)
   - Added: facialData.library ('human')

2. **RolePermission** (new)
   - roleName, permissions [{ resource, action, scope }]

3. **AttendanceUpload** (new)
   - photoUrl, classId, balagruhId, processingStatus, facialRecognitionResults

4. **SOSAlert** (new)
   - studentId, category, location, priority, status, respondingUsers, resolution

5. **Message** (new)
   - conversationId, senderId, content, attachments, readAt

6. **Conversation** (new)
   - type ('1-on-1'/'group'), participants, lastMessage

7. **HealthRecord** (new)
   - studentId, metrics, recordType, alerts, linkedSOSId

8. **Notification** (new)
   - userId, title, body, category, priority, isRead

*Full schemas documented in feature breakdown.*

### 16.3. Appendix C: API Documentation

**API Base URL:**
- Development: `http://localhost:5000/api`
- Staging: `https://staging-api.isfplayground.org/api`
- Production: `https://api.isfplayground.org/api`

**Authentication:**
All endpoints require `Authorization: Bearer <token>` header except:
- POST /api/auth/login
- POST /api/auth/refresh

**Rate Limiting:**
- General: 100 req/min per user
- SOS trigger: 5 req/min per user (prevent spam)
- Messaging: 30 req/min per user

**Error Response Format:**
```json
{
  "success": false,
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "You don't have permission to access Balagruh B students",
    "details": { "resource": "students", "action": "read", "scope": "balagruh" }
  }
}
```

*Full API documentation in feature breakdown.*

### 16.4. Appendix D: Deployment Checklist

**Pre-Deployment:**
- [ ] All tests passing (unit, integration, E2E)
- [ ] Code review approved
- [ ] QA sign-off received
- [ ] Database migration scripts tested
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured
- [ ] Backup created (database + S3)

**Deployment Steps:**
1. [ ] Put app in maintenance mode (optional)
2. [ ] Deploy backend to staging → smoke test
3. [ ] Deploy backend to production
4. [ ] Run database migrations
5. [ ] Deploy mobile app to TestFlight/Firebase App Distribution
6. [ ] Internal testing (5 users)
7. [ ] Deploy to App Store/Play Store (gradual rollout)
8. [ ] Monitor for 24 hours

**Post-Deployment:**
- [ ] Verify all critical flows working
- [ ] Check error rates (< 1%)
- [ ] Check performance metrics (< 500ms p95)
- [ ] User feedback collection
- [ ] Document lessons learned

### 16.5. Appendix E: Glossary

- **Balagruh:** Residential facility/orphanage managed by ISF
- **Coach:** Instructor teaching specific subjects (Music, Sports, etc.)
- **Balagruh In-Charge:** Facility manager responsible for daily operations
- **SOS:** Emergency alert system for student safety
- **FR:** Facial Recognition
- **RBAC:** Role-Based Access Control
- **FCM:** Firebase Cloud Messaging (push notifications)
- **JWT:** JSON Web Token (authentication)
- **p95:** 95th percentile (performance metric)
- **MTTR:** Mean Time To Recovery
- **UAT:** User Acceptance Testing

---

## 17. Sign-off Section

### 17.1. Approval Matrix

| **Role** | **Name** | **Signature** | **Date** |
|----------|----------|---------------|----------|
| **Product Owner** | _____________ | _____________ | __________ |
| **Technical Lead** | _____________ | _____________ | __________ |
| **QA Lead** | _____________ | _____________ | __________ |
| **Project Manager** | _____________ | _____________ | __________ |
| **Client Stakeholder (ISF)** | _____________ | _____________ | __________ |

### 17.2. Change Control

**Document Version History:**

| **Version** | **Date** | **Author** | **Changes** |
|-------------|----------|------------|-------------|
| 0.1 DRAFT | 2025-10-17 | BMad Orchestrator | Initial structure, first 2 stories |
| 0.5 DRAFT | 2025-10-17 | BMad Orchestrator | Added RBAC and FR prerequisites |
| 1.0 COMPLETE | 2025-10-17 | BMad Orchestrator | All stories and sections complete |

**Future Amendments:**
Any changes to this MPSD after sign-off must be approved by Product Owner and documented in change log.

---

## 18. Post-Implementation Considerations

### 18.1. Sprint 6 Roadmap (Future Enhancements)

**Deferred Features:**
1. Video-based liveness detection (blink, head movement)
2. Automated phone calls for critical SOS
3. Multi-language support (Hindi, Marathi, regional languages)
4. Advanced analytics with ML predictions
5. Integration with external emergency services
6. Voice/video calling within messaging
7. Wearable device integration for health tracking

### 18.2. Maintenance & Support

**Ongoing Support:**
- Weekly bug triage and hotfix releases
- Monthly feature updates (minor enhancements)
- Quarterly security audits
- Annual performance optimization review

**Support Channels:**
- In-app help and troubleshooting guide
- Email support (support@isfplayground.org)
- Phone support (business hours only)
- Emergency hotline for P0 issues (24/7)

**SLA (Service Level Agreement):**
- P0 (Critical - SOS down): Response < 15 min, Resolution < 2 hours
- P1 (High - Login broken): Response < 1 hour, Resolution < 4 hours
- P2 (Medium - Feature bug): Response < 4 hours, Resolution < 24 hours
- P3 (Low - UI issue): Response < 24 hours, Resolution < 1 week

### 18.3. Knowledge Transfer

**Documentation Deliverables:**
- Technical architecture document
- API documentation (Swagger/OpenAPI)
- User manuals (Admin, Coach, Balagruh In-Charge)
- Training videos (attendance, SOS, messaging)
- Developer onboarding guide

**Training Sessions:**
- Admin training (2 hours) - RBAC management, analytics, settings
- Balagruh In-Charge training (1.5 hours) - Attendance, health tracking
- Coach training (1 hour) - Media upload, messaging, SOS response
- Student orientation (30 min) - SOS usage, app basics

### 18.4. Monitoring & Metrics (Ongoing)

**Key Performance Indicators (KPIs):**
- Daily Active Users (DAU) - Target: 80% of staff
- SOS Response Time - Target: < 3 min average
- Attendance Accuracy - Target: > 95%
- Message Delivery Success - Target: > 98%
- App Crash Rate - Target: < 0.1%
- API Error Rate - Target: < 1%

**Business Metrics:**
- Student attendance rate (compared to manual marking)
- SOS incident resolution time (before vs after)
- Staff satisfaction with mobile app (quarterly survey)
- Cost per user (infrastructure + support)

**Continuous Improvement:**
- Monthly review of metrics
- Quarterly feature prioritization based on usage data
- Biannual user feedback sessions
- Annual technology stack review

---

## 🎯 Summary: Sprint 3+4 Combined MPSD

**Prerequisites (Parallel - Weeks -2 to 0):**
- ✅ RBAC Rebuild: 8-10 days
- ✅ Facial Recognition Rebuild: 12-15 days

**Sprint 3+4 Delivery (4 Weeks):**
- ✅ Mobile App Foundation (iOS/Android)
- ✅ Attendance Tracking (FR-based)
- ✅ Mobile Media Management
- ✅ Push Notification Infrastructure
- ✅ SOS Emergency System (Desktop → Mobile)
- ✅ Internal Messaging (1-on-1 + Groups)
- ✅ WhatsApp Integration
- ✅ Student Health Tracking

**Success Criteria:**
- Complete in 28 days
- Quality score ≥ 95/100
- SOS alert delivery < 5 seconds
- FR accuracy ≥ 95%
- Zero P0/P1 production bugs

**Total Effort:**
- Prerequisites: 12-15 days (parallel)
- Sprint 3+4: 28 days
- **Total Timeline:** ~6 weeks from start to production

---

**Document Status:** ✅ COMPLETE - Ready for Implementation
**Last Updated:** October 17, 2025

**Next Steps:**
1. Review and approve this MPSD
2. Begin prerequisite development (RBAC + FR in parallel)
3. Kick off Sprint 3+4 after prerequisites complete
4. Daily standups, weekly demos, continuous delivery

---

*END OF SPRINT 3+4 COMBINED MPSD*

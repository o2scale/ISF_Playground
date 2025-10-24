# Sprint 2 - Epic 05: System-Wide Features

**Epic ID:** SPRINT2-EPIC-05
**Epic Name:** System-Wide Features
**Sprint:** Sprint 2
**Version:** 1.0
**Date:** October 24, 2025
**Last Updated:** 2025-10-24 13:52:33
**Status:** Draft - Ready for Story Breakdown
**Estimated Effort:** 30-40 hours (4-5 development days)
**Priority:** High (P1)
**Dependencies:** Sprint 1.1 (RBAC), All other epics

---

## 1. Epic Overview

### 1.1. Epic Purpose

This epic delivers cross-cutting features for communication, notifications, error handling, and reporting. Features benefit all roles:

- In-app notification center (dual-display system)
- Voice communication infrastructure
- Admin broadcast system ("Mann ki Baat")
- WhatsApp integration for schedule notifications
- Playground Manager role for error handling
- Course reporting system (admin system-wide view)

### 1.2. Epic Goals

1. **Real-Time Communication:** Voice notes across all roles
2. **Notification System:** Dual-display system (in-app + persistent notification center)
3. **Error Handling:** PM role receives all errors as tasks
4. **Admin Broadcast:** System-wide announcements to all students
5. **WhatsApp Integration:** Schedule notifications to Balagruha groups
6. **Reporting:** System-wide course analytics for admins

---

## 2. Story Breakdown

### **Story 01: In-App Notification Center (Dual-Display System)**
**Estimated Effort:** 6-8 hours

**Description:**
Dual-display notification system: Temporary toast notifications (auto-dismiss) + Persistent notification center (bell icon). Notifications for grading results, course assignments, coin awards, etc.

**Key Features:**
- Toast notifications (top-right corner, auto-dismiss after 5 seconds)
- Notification center (bell icon with unread count)
- Notification types: Success, Info, Warning, Error
- Notification list (sorted by timestamp, most recent first)
- Mark as read/unread
- Clear all notifications

**Acceptance Criteria:**
- [ ] Toast notifications display correctly
- [ ] Toast auto-dismisses after 5 seconds
- [ ] Bell icon shows unread count
- [ ] Notification center opens on click
- [ ] Notification list displays all notifications
- [ ] Mark as read updates unread count
- [ ] Clear all clears notification center

---

### **Story 02: Voice Communication Infrastructure (All Roles)**
**Estimated Effort:** 8-10 hours

**Description:**
WhatsApp-style voice note recording and playback for all roles. Max duration 120 seconds (2 minutes). Waveform visualization. S3 storage.

**Key Features:**
- Press-and-hold to record (release to stop)
- Waveform visualization during recording
- Playback preview before sending
- Max duration: 120 seconds
- File upload to S3
- Voice note playback with progress bar

**Acceptance Criteria:**
- [ ] Press-and-hold recording works
- [ ] Waveform visualization displays during recording
- [ ] Release stops recording
- [ ] Playback preview plays voice note
- [ ] Max duration enforced (120 seconds)
- [ ] Voice note uploads to S3
- [ ] Playback with progress bar works

---

### **Story 03: Admin Broadcast System ("Mann ki Baat")**
**Estimated Effort:** 5-6 hours

**Description:**
Admin can send broadcast messages (text or voice) to all students or specific Balagruhas. Message appears as notification for students.

**Key Features:**
- Broadcast message composer (text or voice)
- Target selector: All students or Specific Balagruhas (multi-select)
- Schedule broadcast (optional, send later)
- Broadcast history log

**Acceptance Criteria:**
- [ ] Admin composes text message
- [ ] Admin records voice message
- [ ] Target selector filters students correctly
- [ ] Schedule broadcast sends at specified time
- [ ] Broadcast appears in student notification center
- [ ] Broadcast history log displays all past broadcasts

---

### **Story 04: WhatsApp Integration for Schedule Notifications**
**Estimated Effort:** 6-8 hours

**Description:**
Auto-send weekly schedules to Balagruha WhatsApp groups. Secure storage of WhatsApp group numbers. Success/failure logging. Retry queue.

**Key Features:**
- WhatsApp group number per Balagruha (stored securely)
- Auto-send schedule every Monday 8:00 AM
- Manual send schedule button
- Message template: "Weekly Schedule for {BalagruhaName}: {ScheduleDetails}"
- Success/failure logging
- Retry queue (3 retries with exponential backoff)

**Acceptance Criteria:**
- [ ] WhatsApp group number saves securely
- [ ] Auto-send triggers every Monday 8:00 AM
- [ ] Manual send button works
- [ ] Message template renders correctly
- [ ] Success logged
- [ ] Failure logged and retry queued
- [ ] Retry queue processes failed sends

---

### **Story 05: Playground Manager Role & Error Handling System**
**Estimated Effort:** 8-10 hours

**Description:**
PM role receives all application errors as assigned tasks. Global error handler captures frontend + backend errors. Child-friendly error messages for students.

**Key Features:**
- Global error handler (frontend: window.onerror, backend: Express error middleware)
- Auto-create PM task on error (stack trace, user context, timestamp)
- PM dashboard: Error tasks sorted by severity (Critical, Warning, Info)
- Task status tracking (New, In Progress, Resolved)
- Child-friendly error messages for students ("Oops! Something went wrong. Please try again!")
- Error aggregation (group similar errors)

**Acceptance Criteria:**
- [ ] Global error handler captures all errors
- [ ] PM task auto-created on error
- [ ] PM dashboard displays error tasks
- [ ] Task status tracking works
- [ ] Child-friendly error messages display to students
- [ ] Error aggregation groups similar errors
- [ ] Admin can view error trends

---

### **Story 06: Course Reporting System (Admin System-Wide View)**
**Estimated Effort:** 6-8 hours

**Description:**
System-wide course analytics for admins. Completion rates, coin distribution, time spent, popular courses. Export options (CSV, PDF).

**Key Features:**
- Course completion rates (bar chart)
- Coin distribution by course (pie chart)
- Time spent by course (bar chart)
- Popular courses leaderboard (table)
- Filter panel: Date range, Course category, Balagruha
- Export options: CSV, PDF, Print

**Acceptance Criteria:**
- [ ] Course completion rates chart renders
- [ ] Coin distribution chart renders
- [ ] Time spent chart renders
- [ ] Popular courses leaderboard displays
- [ ] Filter panel filters data correctly
- [ ] CSV export downloads correct data
- [ ] PDF export generates correct report
- [ ] Print opens print dialog

---

## 3. Epic-Wide UI Guidelines

### 3.1. Design System References

**Key Design Patterns:**
- **PM Error Dashboard (Section 12.1):** Red theme, error severity badges, task status tracking
- **Voice Recording Interface (Section 8.5):** WhatsApp-style press-and-hold
- **Notification Center (Section 13.2):** Bell icon with unread count, notification list

### 3.2. Color Palette (PM-Specific)

```css
/* PM Red Theme */
--pm-red: #DC2626;             /* Primary PM color */
--pm-red-light: #FEE2E2;       /* PM panel backgrounds */
--pm-red-dark: #B91C1C;        /* Hover states */

/* Error Severity Colors */
--critical-red: #DC2626;       /* Critical errors */
--warning-yellow: #F59E0B;     /* Warnings */
--info-blue: #3B82F6;          /* Info */
```

---

## 4. Technical Architecture

### 4.1. Database Schemas (Epic-Specific)

**Notifications Collection:**
```javascript
{
  _id: ObjectId,
  recipientId: ObjectId,          // User ID
  recipientRole: String,          // "student", "coach", "admin", "amma"
  type: String,                   // "grade", "coin_award", "course_assignment", "broadcast", "error"
  title: String,                  // "Your artwork was graded!"
  message: String,                // "Coach Priya gave you 80 coins for your drawing."
  link: String,                   // Optional deep link (e.g., "/student/coins/transactions")
  read: Boolean,                  // Default: false
  createdAt: Date,
  readAt: Date
}
```

**Broadcasts Collection:**
```javascript
{
  _id: ObjectId,
  sentBy: ObjectId,               // Admin ID
  messageType: String,            // "text" or "voice"
  content: String,                // Text or S3 URL for voice
  targetType: String,             // "all" or "balagruhas"
  targetIds: [ObjectId],          // Balagruha IDs (if targetType is "balagruhas")
  scheduledAt: Date,              // If scheduled, otherwise immediate
  sentAt: Date,
  recipientCount: Number,         // How many students received
  createdAt: Date
}
```

**ErrorTasks Collection:**
```javascript
{
  _id: ObjectId,
  assignedTo: ObjectId,           // PM user ID
  severity: String,               // "critical", "warning", "info"
  errorMessage: String,           // "MongoDB connection timeout"
  stackTrace: String,             // Full stack trace
  userContext: {
    userId: ObjectId,
    userRole: String,
    route: String,                // e.g., "/student/course/computer-apps"
    userAgent: String
  },
  status: String,                 // "new", "in_progress", "resolved"
  resolvedAt: Date,
  resolvedBy: ObjectId,           // PM user ID
  resolution: String,             // Description of how it was fixed
  createdAt: Date,
  updatedAt: Date
}
```

**WhatsAppIntegration Collection:**
```javascript
{
  _id: ObjectId,
  balagruhaId: ObjectId,
  groupNumber: String,            // Encrypted phone number
  messagesSent: Number,           // Total messages sent
  lastSentAt: Date,
  failures: Number,               // Failed send count
  createdAt: Date,
  updatedAt: Date
}
```

---

## 5. API Endpoints (Epic-Specific)

**Base URL:** `/api/v2/system`

### 5.1. Notification APIs

**GET `/api/v2/system/notifications/:userId`**
- **Purpose:** Fetch notifications for user
- **Query Params:** `?read=false&limit=20`
- **Response:**
```json
{
  "notifications": [
    {
      "id": "notif123",
      "type": "grade",
      "title": "Your artwork was graded!",
      "message": "Coach Priya gave you 80 coins.",
      "link": "/student/coins/transactions",
      "read": false,
      "createdAt": "2025-10-24T14:00:00Z"
    }
  ],
  "unreadCount": 5
}
```

**PUT `/api/v2/system/notifications/:notificationId/read`**
- **Purpose:** Mark notification as read
- **Response:** `{ "success": true }`

### 5.2. Broadcast APIs

**POST `/api/v2/system/broadcasts`**
- **Purpose:** Send broadcast message
- **Request Body:**
```json
{
  "messageType": "text",
  "content": "Reminder: Tomorrow is a holiday!",
  "targetType": "all"
}
```
- **Response:** `{ "success": true, "broadcastId": "broadcast123", "recipientCount": 250 }`

### 5.3. Error Task APIs

**POST `/api/v2/system/errors`**
- **Purpose:** Create error task (called by global error handler)
- **Request Body:**
```json
{
  "severity": "critical",
  "errorMessage": "MongoDB connection timeout",
  "stackTrace": "...",
  "userContext": { ... }
}
```
- **Response:** `{ "success": true, "errorTaskId": "err123" }`

**GET `/api/v2/system/errors`**
- **Purpose:** Fetch error tasks for PM dashboard
- **Query Params:** `?status=new&severity=critical`
- **Response:**
```json
{
  "errorTasks": [
    {
      "id": "err123",
      "severity": "critical",
      "errorMessage": "MongoDB connection timeout",
      "userContext": { ... },
      "status": "new",
      "createdAt": "2025-10-24T14:00:00Z"
    }
  ]
}
```

---

## 6. Dependencies

### 6.1. External Dependencies
- **AWS S3:** Voice note storage
- **WhatsApp Business API (Twilio or 360dialog):** Schedule notifications

---

## 7. Success Criteria

### 7.1. Functional Success Metrics
- [ ] Toast notifications display for all relevant events
- [ ] Notification center displays all notifications
- [ ] Voice notes can be recorded and played across all roles
- [ ] Admin can broadcast message to all students
- [ ] WhatsApp schedule notifications send successfully
- [ ] PM receives error tasks automatically
- [ ] Admin can view system-wide course reports

---

## 8. Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| WhatsApp API rate limits | Medium | Medium | Implement queue with rate limiting; fallback to in-app notifications |
| Error task flooding PM | High | High | Error aggregation to group similar errors; severity filtering |
| Voice note S3 storage costs | Low | Low | Implement retention policy (delete voice notes after 90 days) |

---

## 9. Related Documents

- **Sprint 2 MPSD:** `docs/epics/sprint-2-master-plan.md`
- **Sprint 2 Design System:** `docs/design-systems/sprint-2-lms-design-system.md`

---

## 10. Approval & Sign-Off

**Epic Owner:** Dev Team Lead
**Reviewed By:** Product Owner, QA Lead
**Status:** Draft - Awaiting Story Breakdown

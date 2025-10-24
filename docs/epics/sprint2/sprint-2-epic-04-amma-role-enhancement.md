# Sprint 2 - Epic 04: Amma Role Enhancement

**Epic ID:** SPRINT2-EPIC-04
**Epic Name:** Amma Role Enhancement
**Sprint:** Sprint 2
**Version:** 1.0
**Date:** October 24, 2025
**Last Updated:** 2025-10-24 13:52:33
**Status:** Draft - Ready for Story Breakdown
**Estimated Effort:** 20-25 hours (3 development days)
**Priority:** High (P1)
**Dependencies:** Sprint 1.1 (RBAC)

---

## 1. Epic Overview

### 1.1. Epic Purpose

This epic transforms the Amma role from a shared account to individual accounts with enhanced capabilities. Ammas manage student queries with SLA enforcement, multi-tagging, and voice communication. Key improvements:

- Individual Amma accounts with self-registration workflow
- Enhanced query management (reclassify, reassign, multi-tag)
- SLA-based task management with auto-reassignment
- Amma dashboard with well-being insights

### 1.2. User Personas

**Primary:** Amma
- Manages student queries with empathy
- Responds via voice notes
- Tracks SLA deadlines
- Views student well-being insights

### 1.3. Epic Goals

1. **Individual Accounts:** Each Amma has own account with secure authentication
2. **Query Management:** Reclassify, reassign, multi-tag for granular tracking
3. **SLA Enforcement:** Auto-reassignment if SLA breached
4. **Voice Communication:** WhatsApp-style voice note responses

---

## 2. Story Breakdown

### **Story 01: Individual Amma Accounts & Self-Registration Workflow**
**Estimated Effort:** 5-6 hours

**Description:**
Self-registration workflow for Ammas. Admin approval required. Individual credentials with RBAC enforcement.

**Key Features:**
- Self-registration form (name, email, phone, Balagruha assignment)
- Admin approval workflow (Pending, Approved, Rejected)
- Individual login credentials
- RBAC enforcement (Amma can only access assigned Balagruha queries)

**Acceptance Criteria:**
- [ ] Amma completes self-registration form
- [ ] Admin receives approval request notification
- [ ] Admin can approve or reject registration
- [ ] Approved Amma can log in with credentials
- [ ] RBAC restricts access to assigned Balagruha only

---

### **Story 02: Enhanced Query Management (Reclassify, Reassign, Multi-tag)**
**Estimated Effort:** 6-8 hours

**Description:**
Reclassify query categories, reassign to another Amma, add multiple tags for granular tracking.

**Key Features:**
- Reclassify category dropdown (Emotional Support, Academic Help, Technical Issue, Other)
- Multi-tag input (Anxiety, Home, Math, Homework, etc.)
- Reassign to another Amma (dropdown of available Ammas)
- Escalate to Coach button
- Query history log (all actions timestamped)

**Acceptance Criteria:**
- [ ] Reclassify updates query category
- [ ] Multi-tag saves all tags
- [ ] Reassign transfers query to selected Amma
- [ ] Escalate creates Coach task
- [ ] Query history log displays all actions

---

### **Story 03: SLA-Based Task Management with Auto-Reassignment**
**Estimated Effort:** 6-8 hours

**Description:**
SLA timers for each query. Visual urgency indicators. Auto-reassignment if SLA breached. Amma performance reports.

**Key Features:**
- SLA timer: Emotional Support (1 hour), Academic Help (4 hours), Technical Issue (2 hours), Other (24 hours)
- Visual urgency indicators: Red (< 1 hour), Yellow (< 50% remaining), Green (> 50% remaining)
- Auto-reassignment if SLA breached (round-robin to available Ammas)
- SLA breach notification to Admin
- Amma performance report (SLA compliance %, average response time)

**Acceptance Criteria:**
- [ ] SLA timer starts when query created
- [ ] Visual urgency indicator updates correctly
- [ ] Auto-reassignment triggers when SLA breached
- [ ] New Amma receives reassigned query notification
- [ ] Admin receives SLA breach notification
- [ ] Performance report displays correct metrics

---

### **Story 04: Amma Dashboard (Client UI Implementation)**
**Estimated Effort:** 4-6 hours

**Description:**
Dashboard with quick stats (Open Queries, Overdue SLA, Resolved Today), priority task list sorted by SLA urgency, student well-being insights.

**Key Features:**
- Quick stats cards
- Priority task list (sorted by SLA urgency)
- Student well-being insights chart (emotion tracking aggregated)
- Voice note interface for responses

**Acceptance Criteria:**
- [ ] Quick stats cards display correct counts
- [ ] Priority task list sorted by SLA urgency
- [ ] Student well-being insights chart renders
- [ ] Voice note recording works

---

## 3. Epic-Wide UI Guidelines

### 3.1. Design System References

**Key Design Patterns:**
- **Amma Dashboard (Section 11.1):** Pink theme, quick stats, priority task list
- **Query Management (Section 11.2):** Voice note responses, reclassify, reassign

### 3.2. Color Palette (Amma-Specific)

```css
/* Amma Pink Theme */
--amma-pink: #EC4899;          /* Primary amma color */
--amma-pink-light: #FCE7F3;    /* Amma panel backgrounds */
--amma-pink-dark: #DB2777;     /* Hover states */

/* SLA Urgency Colors */
--sla-red: #DC2626;            /* < 1 hour remaining */
--sla-yellow: #F59E0B;         /* < 50% remaining */
--sla-green: #16A34A;          /* > 50% remaining */
```

---

## 4. Technical Architecture

### 4.1. Database Schemas (Epic-Specific)

**Queries Collection (Enhanced):**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  assignedTo: ObjectId,           // Amma ID
  category: String,               // "Emotional Support", "Academic Help", "Technical Issue", "Other"
  tags: [String],                 // ["Anxiety", "Home", "Math"]
  priority: String,               // "high", "medium", "low"
  status: String,                 // "open", "in_progress", "resolved", "escalated"
  sla: {
    deadline: Date,               // Calculated based on category
    breached: Boolean,
    breachedAt: Date,
    reassignedCount: Number       // How many times auto-reassigned
  },
  studentMessage: {
    type: String,                 // "voice" or "text"
    content: String,              // Text or S3 URL for voice
    timestamp: Date
  },
  ammaResponses: [
    {
      responseId: ObjectId,
      ammaId: ObjectId,
      type: String,               // "voice" or "text"
      content: String,            // Text or S3 URL for voice
      timestamp: Date
    }
  ],
  history: [                      // Query action log
    {
      action: String,             // "created", "reclassified", "reassigned", "responded", "resolved", "escalated"
      performedBy: ObjectId,
      details: String,            // e.g., "Reclassified from 'Academic Help' to 'Emotional Support'"
      timestamp: Date
    }
  ],
  createdAt: Date,
  resolvedAt: Date,
  escalatedTo: ObjectId           // Coach or Admin ID (if escalated)
}
```

---

## 5. API Endpoints (Epic-Specific)

**Base URL:** `/api/v2/amma`

### 5.1. Query Management APIs

**GET `/api/v2/amma/:ammaId/queries`**
- **Purpose:** Fetch queries assigned to Amma
- **Query Params:** `?status=open&priority=high`
- **Response:**
```json
{
  "queries": [
    {
      "id": "query123",
      "studentName": "Ravi Kumar",
      "category": "Emotional Support",
      "tags": ["Anxiety", "Home"],
      "priority": "high",
      "sla": {
        "deadline": "2025-10-24T14:30:00Z",
        "minutesRemaining": 30,
        "urgencyLevel": "red"
      },
      "studentMessage": {
        "type": "voice",
        "content": "https://s3.amazonaws.com/voice123.mp3",
        "timestamp": "2025-10-24T13:30:00Z"
      }
    }
  ]
}
```

**PUT `/api/v2/amma/queries/:queryId/reclassify`**
- **Purpose:** Reclassify query category
- **Request Body:** `{ "category": "Academic Help", "tags": ["Math", "Homework"] }`
- **Response:** `{ "success": true, "newDeadline": "2025-10-24T17:30:00Z" }`

**PUT `/api/v2/amma/queries/:queryId/reassign`**
- **Purpose:** Reassign query to another Amma
- **Request Body:** `{ "newAmmaId": "amma456", "reason": "Better expertise" }`
- **Response:** `{ "success": true }`

---

## 6. Dependencies

### 6.1. Internal Dependencies
- **Sprint 1.1 RBAC:** Amma authentication and authorization

---

## 7. Success Criteria

### 7.1. Functional Success Metrics
- [ ] Amma can self-register and await admin approval
- [ ] Amma can reclassify queries
- [ ] Amma can add multiple tags to queries
- [ ] Amma can reassign queries to another Amma
- [ ] SLA timer displays urgency correctly
- [ ] Auto-reassignment triggers when SLA breached
- [ ] Voice note responses work

---

## 8. Related Documents

- **Sprint 2 MPSD:** `docs/epics/sprint-2-master-plan.md`
- **Sprint 2 Design System:** `docs/design-systems/sprint-2-lms-design-system.md`

---

## 9. Approval & Sign-Off

**Epic Owner:** Dev Team Lead
**Reviewed By:** Product Owner, QA Lead
**Status:** Draft - Awaiting Story Breakdown

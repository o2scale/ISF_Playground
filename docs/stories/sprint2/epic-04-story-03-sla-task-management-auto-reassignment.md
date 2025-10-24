# Epic 04 - Story 03: SLA-Based Task Management with Auto-Reassignment

**Story ID:** SPRINT2-EPIC04-STORY03
**Epic:** Epic 04 - Amma Role Enhancement
**Sprint:** Sprint 2
**Story Name:** SLA-Based Task Management with Auto-Reassignment
**Estimated Effort:** 6-8 hours (1 development day)
**Priority:** High (P1)
**Dependencies:**
- Epic 04 Story 01 (Individual Amma accounts)
- Epic 04 Story 02 (Enhanced query management, reclassification)
- Backend: MongoDB Queries collection (SLA fields)
- Backend: Cron job or scheduled task for SLA monitoring

**Last Updated:** 2025-10-24 15:44:13
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As an** Admin
**I want** SLA timers for Amma queries with auto-reassignment if breached
**So that** students receive timely responses and no query falls through the cracks

### 1.2. Story Context

Service Level Agreement (SLA) ensures Ammas respond to queries within defined timeframes:

**SLA Durations by Category:**
- **Emotional Support:** 1 hour (urgent, mental health)
- **Academic Help:** 4 hours (homework, study help)
- **Technical Issue:** 2 hours (app bugs, login problems)
- **Other:** 24 hours (general questions, feedback)

**SLA Visual Urgency Indicators:**
- **Red:** < 1 hour remaining (critical)
- **Yellow:** < 50% time remaining (warning)
- **Green:** > 50% time remaining (healthy)

**Auto-Reassignment Logic:**
- If SLA deadline passes without response, query auto-reassigns to next available Amma
- Round-robin distribution among Ammas in same Balagruha
- Admin receives SLA breach notification
- Reassignment count tracked per query

**Amma Performance Tracking:**
- SLA compliance % (queries resolved within SLA / total queries)
- Average response time
- Queries auto-reassigned away (performance metric)

### 1.3. Key Features

- **SLA Timer:** Real-time countdown displayed on query cards
- **Visual Urgency Indicators:** Color-coded borders/badges (Red/Yellow/Green)
- **Auto-Reassignment:** Automated reassignment if SLA breached
- **SLA Breach Notifications:** Email + in-app to Admin, original Amma
- **Performance Dashboard:** Amma-specific SLA metrics (compliance %, avg response time)

---

## 1.5. Visual Layout Diagrams

### Query Card - SLA Timer & Urgency Indicators

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Amma Dashboard - Open Queries (3 pending)                                   │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ [All ▼] [Sort by: SLA Urgency ▼]                                           │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ 🔴 Ravi Kumar (STU001, Class: 5th)                     [View Details]  │ │ ← Query 1 (RED urgency)
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │   border-l-4 red-600
│ │                                                                        │ │   bg-red-50
│ │ Category: Emotional Support • Tags: Anxiety, Home                      │ │
│ │ Query: Voice Note (0:45) • Received: Oct 24, 2:30 PM                  │ │
│ │                                                                        │ │
│ │ SLA: ⏱️ 12 minutes remaining                                           │ │ ← SLA timer (red text)
│ │ Deadline: 3:30 PM (80% elapsed)                                        │ │   font-bold text-red-600
│ │                                                                        │ │
│ │ Priority: High • Status: Open • Assigned: 2:30 PM                      │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ 🟡 Priya Sharma (STU003, Class: 6th)                   [View Details]  │ │ ← Query 2 (YELLOW urgency)
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │   border-l-4 yellow-500
│ │                                                                        │ │   bg-yellow-50
│ │ Category: Academic Help • Tags: Math, Homework                         │ │
│ │ Query: Text message about algebra problem                             │ │
│ │                                                                        │ │
│ │ SLA: ⏱️ 1 hour 45 minutes remaining                                    │ │ ← SLA timer (yellow text)
│ │ Deadline: 5:15 PM (45% elapsed)                                        │ │   font-semibold text-yellow-600
│ │                                                                        │ │
│ │ Priority: Medium • Status: Open • Assigned: 1:15 PM                    │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ 🟢 Anil Reddy (STU009, Class: 6th)                     [View Details]  │ │ ← Query 3 (GREEN urgency)
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │   border-l-4 green-600
│ │                                                                        │ │   bg-green-50
│ │ Category: Other • Tags: Feedback                                       │ │
│ │ Query: Suggestion for app improvement                                 │ │
│ │                                                                        │ │
│ │ SLA: ⏱️ 22 hours 30 minutes remaining                                  │ │ ← SLA timer (green text)
│ │ Deadline: Tomorrow 1:00 PM (6% elapsed)                                │ │   text-green-600
│ │                                                                        │ │
│ │ Priority: Low • Status: Open • Assigned: 2:30 PM                       │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### SLA Urgency States - Visual Examples

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SLA Urgency Indicators                                                      │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ 🔴 RED (Critical) - Less than 1 hour remaining OR > 75% time elapsed       │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ SLA: ⏱️ 12 minutes remaining • Deadline: 3:30 PM (80% elapsed)         │ │
│ │ [border-l-4 red-600, bg-red-50, text-red-600, font-bold]              │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ 🟡 YELLOW (Warning) - Less than 50% time remaining (but > 1 hour left)     │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ SLA: ⏱️ 1 hour 45 minutes remaining • Deadline: 5:15 PM (45% elapsed) │ │
│ │ [border-l-4 yellow-500, bg-yellow-50, text-yellow-600, font-semibold] │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ 🟢 GREEN (Healthy) - More than 50% time remaining                          │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ SLA: ⏱️ 22 hours 30 minutes remaining • Deadline: Tomorrow 1:00 PM    │ │
│ │ [border-l-4 green-600, bg-green-50, text-green-600]                   │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Auto-Reassignment Flow - Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Auto-Reassignment Flow (SLA Breach)                                         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Step 1: SLA Timer Expires (Deadline Passed)                                │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Query Q-2025-0054 • Emotional Support • Assigned to: Amma Priya       │ │
│ │ SLA Deadline: Oct 24, 3:30 PM                                          │ │
│ │ Current Time: Oct 24, 3:31 PM                                          │ │
│ │ Status: ⏰ SLA BREACHED                                                 │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                    ↓                                        │
│                                                                             │
│ Step 2: Backend Cron Job Detects Breach (runs every 5 minutes)            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ query.sla.deadline < Date.now() && query.status === 'open'            │ │
│ │ Mark as breached: query.sla.breached = true                            │ │
│ │ Increment: query.sla.reassignedCount++                                 │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                    ↓                                        │
│                                                                             │
│ Step 3: Select Next Available Amma (Round-Robin)                          │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Filter: Ammas in same Balagruha (Ramakrishna Ashram)                  │ │
│ │ Sort by: Lowest current open query count                               │ │
│ │ Exclude: Current Amma (Priya)                                          │ │
│ │ Selected: Amma Lakshmi (8 open queries)                                │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                    ↓                                        │
│                                                                             │
│ Step 4: Reassign Query to New Amma                                        │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Update: query.assignedTo = Amma Lakshmi ID                             │ │
│ │ Add history entry: "Auto-reassigned from Priya to Lakshmi (SLA breach)"│ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                    ↓                                        │
│                                                                             │
│ Step 5: Send Notifications                                                 │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ To Amma Lakshmi: "Query Q-2025-0054 auto-assigned due to SLA breach"  │ │
│ │ To Amma Priya: "Query Q-2025-0054 was auto-reassigned (SLA breach)"   │ │
│ │ To Admin: "SLA breach: Query Q-2025-0054 reassigned to Amma Lakshmi"  │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### SLA Breach Notification - Email

```
Subject: SLA Breach Alert - Query Q-2025-0054

Dear Admin,

A query SLA has been breached and auto-reassigned:

Query Details:
- Query ID: Q-2025-0054
- Student: Ravi Kumar (STU001, Class: 5th)
- Category: Emotional Support
- Tags: Anxiety, Home
- SLA Deadline: October 24, 2025 at 3:30 PM
- Breach Time: October 24, 2025 at 3:31 PM (1 minute overdue)

Reassignment:
- Original Amma: Amma Priya
- New Amma: Amma Lakshmi
- Reason: SLA breach (auto-reassignment)
- Reassignment Count: 1 (first reassignment)

Action Taken:
✓ Query reassigned to Amma Lakshmi
✓ Amma Lakshmi notified
✓ Amma Priya notified

Performance Impact:
This breach will affect Amma Priya's SLA compliance score for this month.

View Query: [Link to Query Dashboard]

ISF Playground
```

### Amma Performance Dashboard - SLA Metrics

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Amma Performance Report - Amma Priya                                        │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ [Last 7 Days ▼] [Last 30 Days ▼] [Last 3 Months ▼] [Export Report ▼]     │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ SLA Performance Overview (Last 30 Days)                                │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │ │
│ │ │ SLA Compliance│ │ Avg Response │ │ Total Queries│ │ Auto-        │  │ │
│ │ │              │ │ Time         │ │ Resolved     │ │ Reassigned   │  │ │
│ │ │     92%      │ │   2.3 hours  │ │      48      │ │      4       │  │ │
│ │ │   ↑ 3% from  │ │   ↓ 0.5 hrs  │ │   ↑ 12 from  │ │   ↓ 2 from   │  │ │
│ │ │   last month │ │   last month │ │   last month │ │   last month │  │ │
│ │ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘  │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ SLA Compliance by Category                                             │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ Emotional Support (SLA: 1 hour)                                        │ │
│ │ ████████████████████████████████████████████ 88% (22/25)             │ │ ← Bar chart
│ │                                                                        │ │
│ │ Academic Help (SLA: 4 hours)                                           │ │
│ │ ████████████████████████████████████████████████ 95% (19/20)         │ │
│ │                                                                        │ │
│ │ Technical Issue (SLA: 2 hours)                                         │ │
│ │ ████████████████████████████████████████████████████ 100% (2/2)      │ │
│ │                                                                        │ │
│ │ Other (SLA: 24 hours)                                                  │ │
│ │ ████████████████████████████████████████████████████ 100% (1/1)      │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Response Time Distribution                                             │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ < 30 minutes:   ████████████████ 15 queries (31%)                     │ │
│ │ 30 min - 1 hr:  ██████████████████████ 20 queries (42%)               │ │
│ │ 1 hr - 2 hrs:   ██████████ 10 queries (21%)                           │ │
│ │ 2 hrs - 4 hrs:  ████ 2 queries (4%)                                   │ │
│ │ > 4 hrs:        ██ 1 query (2%)                                       │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ SLA Breaches (4 total)                                                 │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ Date       | Query ID   | Category           | Overdue By | Reassigned│ │
│ │ ─────────────────────────────────────────────────────────────────────│ │
│ │ Oct 24     | Q-2025-0054| Emotional Support  | 1 minute   | Yes       │ │
│ │ Oct 20     | Q-2025-0048| Academic Help      | 15 minutes | Yes       │ │
│ │ Oct 18     | Q-2025-0042| Emotional Support  | 5 minutes  | Yes       │ │
│ │ Oct 15     | Q-2025-0038| Technical Issue    | 8 minutes  | Yes       │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Measurements Summary

| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| **Query Card (RED urgency)** | 100% | auto (min 140px) | p-6 | mb-4 | border-l-4 red-600 bg-red-50 | - |
| **Query Card (YELLOW urgency)** | 100% | auto (min 140px) | p-6 | mb-4 | border-l-4 yellow-500 bg-yellow-50 | - |
| **Query Card (GREEN urgency)** | 100% | auto (min 140px) | p-6 | mb-4 | border-l-4 green-600 bg-green-50 | - |
| **SLA Timer (RED)** | auto | auto | - | mt-3 | - | font-bold text-red-600 |
| **SLA Timer (YELLOW)** | auto | auto | - | mt-3 | - | font-semibold text-yellow-600 |
| **SLA Timer (GREEN)** | auto | auto | - | mt-3 | - | text-green-600 |
| **Performance Stats Card** | 25% (min 200px) | 140px | p-6 | mx-2 | border gray-200 rounded-lg | - |
| **Compliance Bar** | 100% | 32px | - | my-2 | rounded-full bg-gray-200 | - |
| **SLA Breach Table** | 100% | auto | p-6 | my-6 | border gray-200 rounded-lg | - |

---

## 2. Acceptance Criteria

### 2.1. SLA Timer & Visual Indicators

- [ ] **SLA-01:** SLA timer starts when query created (timestamp: `query.createdAt`)
- [ ] **SLA-02:** SLA deadline calculated based on category: Emotional (1hr), Academic (4hr), Technical (2hr), Other (24hr)
- [ ] **SLA-03:** SLA timer displays remaining time: "12 minutes remaining"
- [ ] **SLA-04:** SLA timer updates in real-time (every minute)
- [ ] **SLA-05:** RED urgency if < 1 hour remaining OR > 75% time elapsed: border-l-4 red-600, bg-red-50, text-red-600, font-bold
- [ ] **SLA-06:** YELLOW urgency if < 50% time remaining (but > 1 hour left): border-l-4 yellow-500, bg-yellow-50, text-yellow-600, font-semibold
- [ ] **SLA-07:** GREEN urgency if > 50% time remaining: border-l-4 green-600, bg-green-50, text-green-600
- [ ] **SLA-08:** SLA timer shows "OVERDUE by {time}" if deadline passed (red background, blink animation)
- [ ] **SLA-09:** Query cards sortable by SLA urgency (RED first, then YELLOW, then GREEN)

### 2.2. Auto-Reassignment Logic

- [ ] **AUTO-01:** Backend cron job runs every 5 minutes to detect SLA breaches
- [ ] **AUTO-02:** Cron job queries: `query.sla.deadline < Date.now() && query.status === 'open' && !query.sla.breached`
- [ ] **AUTO-03:** If breach detected, mark `query.sla.breached = true`, `query.sla.breachedAt = Date.now()`
- [ ] **AUTO-04:** Increment `query.sla.reassignedCount++`
- [ ] **AUTO-05:** Select next available Amma: filter by same Balagruha, sort by lowest open query count, exclude current Amma
- [ ] **AUTO-06:** Update `query.assignedTo` to new Amma ID
- [ ] **AUTO-07:** Add query history entry: "Auto-reassigned from {oldAmma} to {newAmma} (SLA breach)"
- [ ] **AUTO-08:** If no available Amma in same Balagruha, expand to all Balagruhas
- [ ] **AUTO-09:** If still no available Amma, notify Admin: "No Ammas available for reassignment"
- [ ] **AUTO-10:** Maximum 3 auto-reassignments per query (after 3, escalate to Admin)

### 2.3. Notifications

- [ ] **NOTIF-01:** New Amma receives in-app notification: "Query Q-2025-0054 auto-assigned due to SLA breach"
- [ ] **NOTIF-02:** New Amma receives email: "You have been assigned query Q-2025-0054 due to SLA breach. Please respond urgently."
- [ ] **NOTIF-03:** Original Amma receives in-app notification: "Query Q-2025-0054 was auto-reassigned (SLA breach)"
- [ ] **NOTIF-04:** Original Amma receives email with breach details (query ID, category, overdue time)
- [ ] **NOTIF-05:** Admin receives email: "SLA breach: Query Q-2025-0054 reassigned to Amma Lakshmi"
- [ ] **NOTIF-06:** Admin email includes: query details, original Amma, new Amma, reassignment count, overdue time

### 2.4. Amma Performance Dashboard

- [ ] **PERF-01:** Amma performance dashboard accessible at `/amma/:ammaId/performance`
- [ ] **PERF-02:** Four stats cards: SLA Compliance %, Avg Response Time, Total Queries Resolved, Auto-Reassigned Count
- [ ] **PERF-03:** SLA Compliance % = (queries resolved within SLA / total queries resolved) × 100
- [ ] **PERF-04:** Avg Response Time = average of (responseTime - createdAt) for all resolved queries
- [ ] **PERF-05:** Date range filter: Last 7 Days, Last 30 Days, Last 3 Months
- [ ] **PERF-06:** Trend indicators: ↑ 3% from last month, ↓ 2 from last month
- [ ] **PERF-07:** SLA Compliance by Category bar chart: shows compliance % for each category
- [ ] **PERF-08:** Response Time Distribution chart: shows query count by time bucket (< 30min, 30min-1hr, 1hr-2hrs, 2hrs-4hrs, > 4hrs)
- [ ] **PERF-09:** SLA Breaches table: lists all breached queries (date, query ID, category, overdue time, reassigned?)
- [ ] **PERF-10:** Export report button: generates PDF with all metrics

### 2.5. Admin Reporting

- [ ] **ADMIN-01:** Admin dashboard shows aggregate SLA metrics: overall compliance %, breaches this month, avg response time
- [ ] **ADMIN-02:** Admin can view SLA metrics by Amma (sortable table)
- [ ] **ADMIN-03:** Admin can view SLA breach log (all breaches across all Ammas)
- [ ] **ADMIN-04:** Admin receives daily digest email: SLA breaches today, top performing Ammas, underperforming Ammas

### 2.6. Edge Cases & Error Handling

- [ ] **EDGE-01:** If query resolved before SLA deadline, SLA timer stops showing
- [ ] **EDGE-02:** If query escalated before SLA deadline, SLA timer pauses (escalation doesn't count as breach)
- [ ] **EDGE-03:** If Amma responds but query still open (waiting for student follow-up), SLA timer resets to new deadline
- [ ] **EDGE-04:** If no Ammas available for reassignment, Admin receives alert: "No Ammas available for Q-2025-0054"
- [ ] **EDGE-05:** If reassignment count exceeds 3, escalate to Admin with alert: "Query Q-2025-0054 reassigned 3+ times, requires intervention"

### 2.7. Performance & Accessibility

- [ ] **PERF-01:** SLA timer updates without full page refresh (WebSocket or polling every 60 seconds)
- [ ] **PERF-02:** Cron job completes within 30 seconds (processes up to 100 breached queries)
- [ ] **PERF-03:** Performance dashboard loads within 2 seconds (up to 500 queries)
- [ ] **ACC-01:** Screen reader announces SLA urgency level: "Query card, RED urgency, 12 minutes remaining"
- [ ] **ACC-02:** Color-blind friendly: Use icons + colors (🔴🟡🟢 + border colors)

---

## 3. Task Breakdown

### Phase 1: SLA Timer & Visual Indicators (1.5 hours)

**Task 1.1: Calculate SLA deadline on query creation (30 min)**
- Backend: When query created, calculate `query.sla.deadline` based on category
  ```javascript
  const slaMinutes = {
    'Emotional Support': 60,
    'Academic Help': 240,
    'Technical Issue': 120,
    'Other': 1440
  };
  query.sla.deadline = new Date(query.createdAt.getTime() + slaMinutes[query.category] * 60000);
  ```
- Store in `query.sla.deadline` field
- File: `backend/controllers/ammaQueryController.js`

**Task 1.2: Create SLA timer component (45 min)**
- Component: `SLATimer.jsx`
- Calculate remaining time: `deadline - Date.now()`
- Format output: "12 minutes remaining" or "1 hour 45 minutes remaining" or "OVERDUE by 5 minutes"
- Update every 60 seconds (setInterval)
- Calculate urgency level: RED (< 1hr or > 75% elapsed), YELLOW (< 50%), GREEN (> 50%)
- Return urgency level for parent component to apply border color
- File: `frontend/src/components/amma/SLATimer.jsx`

**Task 1.3: Apply visual urgency indicators to query cards (15 min)**
- Component: `QueryCard.jsx`
- Conditionally apply border/background classes based on urgency level:
  - RED: `border-l-4 border-red-600 bg-red-50`
  - YELLOW: `border-l-4 border-yellow-500 bg-yellow-50`
  - GREEN: `border-l-4 border-green-600 bg-green-50`
- SLA timer text color:
  - RED: `font-bold text-red-600`
  - YELLOW: `font-semibold text-yellow-600`
  - GREEN: `text-green-600`
- File: `frontend/src/components/amma/QueryCard.jsx`

### Phase 2: Auto-Reassignment Cron Job (2 hours)

**Task 2.1: Implement SLA breach detection cron job (1 hour)**
- Cron job: Runs every 5 minutes
- Query MongoDB for breached queries:
  ```javascript
  const breachedQueries = await Query.find({
    'sla.deadline': { $lt: new Date() },
    'status': 'open',
    'sla.breached': false
  });
  ```
- For each breached query:
  - Mark `sla.breached = true`, `sla.breachedAt = Date.now()`
  - Increment `sla.reassignedCount++`
  - Call `reassignQuery(queryId)` function
- File: `backend/jobs/slaMonitorJob.js`

**Task 2.2: Implement round-robin reassignment logic (1 hour)**
- Function: `reassignQuery(queryId)`
- Step 1: Get current query
- Step 2: Find available Ammas in same Balagruha:
  ```javascript
  const ammas = await User.find({
    role: 'amma',
    assignedBalagruha: query.studentBalagruha,
    _id: { $ne: query.assignedTo } // Exclude current Amma
  });
  ```
- Step 3: Count open queries for each Amma:
  ```javascript
  const ammasWithCounts = await Promise.all(ammas.map(async amma => {
    const openCount = await Query.countDocuments({ assignedTo: amma._id, status: 'open' });
    return { amma, openCount };
  }));
  ```
- Step 4: Sort by lowest openCount, select first
- Step 5: Update `query.assignedTo = newAmma._id`
- Step 6: Add history entry: "Auto-reassigned from {oldAmma} to {newAmma} (SLA breach)"
- Step 7: Send notifications (new Amma, original Amma, Admin)
- File: `backend/services/slaReassignmentService.js`

### Phase 3: Notifications (45 min)

**Task 3.1: Send reassignment notifications (30 min)**
- New Amma:
  - In-app: Create notification document
  - Email: Send via emailService
- Original Amma:
  - In-app: Create notification document
  - Email: Send via emailService
- Admin:
  - Email: Send SLA breach alert with query details
- File: `backend/services/notificationService.js`

**Task 3.2: Create email templates (15 min)**
- Template 1: New Amma assigned (urgent)
- Template 2: Original Amma breach notification
- Template 3: Admin SLA breach alert
- File: `backend/templates/emails/sla/*.html`

### Phase 4: Amma Performance Dashboard (1.5 hours)

**Task 4.1: Create performance dashboard UI (45 min)**
- Component: `AmmaPerformanceDashboard.jsx`
- Four stats cards: SLA Compliance %, Avg Response Time, Total Queries, Auto-Reassigned
- Date range filter dropdown
- SLA Compliance by Category bar chart
- Response Time Distribution chart
- SLA Breaches table
- Fetch data from GET `/api/v2/amma/:ammaId/performance?dateRange=30d`
- File: `frontend/src/components/amma/AmmaPerformanceDashboard.jsx`

**Task 4.2: Implement performance API endpoint (45 min)**
- GET `/api/v2/amma/:ammaId/performance?dateRange=30d`
- Aggregate data:
  - Total queries resolved: Count where `status=resolved` and `assignedTo=ammaId`
  - Queries within SLA: Count where `resolvedAt <= sla.deadline`
  - SLA Compliance % = (within SLA / total) × 100
  - Avg Response Time = avg(resolvedAt - createdAt)
  - Auto-Reassigned count: Count where `sla.reassignedCount > 0` and original assignee was this Amma
  - Compliance by category: Group by category, calculate compliance % for each
  - Response time distribution: Bucket by time ranges
  - Breach list: Find all breached queries for this Amma
- Return: `{ slaCompliance, avgResponseTime, totalQueries, autoReassigned, complianceByCategory, responseDistribution, breaches }`
- File: `backend/controllers/ammaPerformanceController.js`

### Phase 5: Admin Reporting (45 min)

**Task 5.1: Admin SLA metrics dashboard (30 min)**
- Component: `AdminSLADashboard.jsx`
- Aggregate metrics: Overall SLA compliance %, breaches this month, avg response time across all Ammas
- Amma performance table: sortable by SLA compliance %, avg response time
- SLA breach log: all breaches with filters (date, Amma, category)
- File: `frontend/src/components/admin/AdminSLADashboard.jsx`

**Task 5.2: Daily digest email (15 min)**
- Cron job: Runs daily at 9 AM
- Aggregate yesterday's SLA metrics
- Send email to Admin with summary: breaches, top performers, underperformers
- File: `backend/jobs/slaDailyDigestJob.js`

### Phase 6: Testing & Polish (45 min)

**Task 6.1: Unit tests for SLA logic (30 min)**
- Test SLA deadline calculation for each category
- Test urgency level calculation (RED/YELLOW/GREEN)
- Test auto-reassignment round-robin logic
- Test SLA breach detection
- Test performance metrics calculation
- File: `backend/tests/services/slaReassignmentService.test.js`

**Task 6.2: E2E test for SLA workflow (15 min)**
- Test: Create query, wait for SLA to breach (use mocked time)
- Test: Verify auto-reassignment triggered
- Test: Verify notifications sent
- Test: Verify performance metrics updated
- File: `frontend/tests/e2e/sla-auto-reassignment.spec.js`

---

## 4. API Endpoints

### 4.1. Amma Performance Metrics

**Endpoint:** `GET /api/v2/amma/:ammaId/performance`

**Query Parameters:**
- `dateRange`: "7d", "30d", "3m" (default "30d")

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "slaCompliance": 92,
    "avgResponseTime": 2.3,
    "totalQueriesResolved": 48,
    "autoReassigned": 4,
    "complianceByCategory": [
      { "category": "Emotional Support", "compliance": 88, "total": 25 },
      { "category": "Academic Help", "compliance": 95, "total": 20 },
      { "category": "Technical Issue", "compliance": 100, "total": 2 },
      { "category": "Other", "compliance": 100, "total": 1 }
    ],
    "responseDistribution": [
      { "bucket": "< 30 min", "count": 15 },
      { "bucket": "30 min - 1 hr", "count": 20 },
      { "bucket": "1 hr - 2 hrs", "count": 10 },
      { "bucket": "2 hrs - 4 hrs", "count": 2 },
      { "bucket": "> 4 hrs", "count": 1 }
    ],
    "breaches": [
      {
        "queryId": "Q-2025-0054",
        "date": "2025-10-24T15:31:00Z",
        "category": "Emotional Support",
        "overdueBy": "1 minute",
        "reassigned": true
      }
    ]
  }
}
```

---

## 5. MongoDB Schema Updates

### 5.1. Query Schema - SLA Fields

```javascript
const QuerySchema = new mongoose.Schema({
  // ... existing fields

  sla: {
    deadline: {
      type: Date,
      required: true,
      index: true
    },
    breached: {
      type: Boolean,
      default: false,
      index: true
    },
    breachedAt: {
      type: Date
    },
    reassignedCount: {
      type: Number,
      default: 0
    }
  }
});
```

---

## 6. Cron Jobs

### 6.1. SLA Monitor Job

```javascript
// backend/jobs/slaMonitorJob.js
const cron = require('node-cron');

// Run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('Running SLA monitor job...');

  const breachedQueries = await Query.find({
    'sla.deadline': { $lt: new Date() },
    'status': 'open',
    'sla.breached': false
  });

  for (const query of breachedQueries) {
    await reassignQuery(query._id);
  }
});
```

---

## 7. File Paths

```
frontend/src/components/amma/
├── SLATimer.jsx                     # Real-time SLA timer
├── QueryCard.jsx                    # Query card (updated with SLA visuals)
└── AmmaPerformanceDashboard.jsx     # Amma performance metrics

frontend/src/components/admin/
└── AdminSLADashboard.jsx            # Admin SLA aggregate metrics

backend/controllers/
├── ammaQueryController.js           # Query API (updated with SLA)
└── ammaPerformanceController.js     # Performance metrics API

backend/services/
└── slaReassignmentService.js        # Auto-reassignment logic

backend/jobs/
├── slaMonitorJob.js                 # SLA breach detection cron
└── slaDailyDigestJob.js             # Daily admin digest email

backend/templates/emails/sla/
├── newAmmaAssigned.html             # New Amma notification
├── originalAmmaBreachAlert.html     # Original Amma breach alert
└── adminSLABreachAlert.html         # Admin SLA breach email

backend/tests/services/
└── slaReassignmentService.test.js   # Unit tests

frontend/tests/e2e/
└── sla-auto-reassignment.spec.js    # E2E tests
```

---

## 8. Definition of Done

- [ ] SLA deadline calculated and stored when query created
- [ ] SLA timer displays remaining time on query cards (updates every minute)
- [ ] Visual urgency indicators applied: RED/YELLOW/GREEN borders and backgrounds
- [ ] Cron job detects SLA breaches every 5 minutes
- [ ] Auto-reassignment triggered on breach (round-robin to lowest-load Amma)
- [ ] Reassignment limited to 3 times per query (after 3, escalate to Admin)
- [ ] Notifications sent to new Amma, original Amma, Admin on breach
- [ ] Amma performance dashboard shows SLA compliance %, avg response time, breaches
- [ ] Performance metrics filterable by date range (7d, 30d, 3m)
- [ ] Admin SLA dashboard shows aggregate metrics across all Ammas
- [ ] Daily digest email sent to Admin with SLA summary
- [ ] Unit tests: 80%+ coverage for SLA logic and auto-reassignment
- [ ] E2E tests: Full SLA breach and reassignment workflow tested
- [ ] Code peer-reviewed
- [ ] Merged to `develop`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:44:13
- **Status:** Draft - Ready for Development

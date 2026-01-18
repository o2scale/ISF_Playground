# Epic 04 - Story 04: Amma Dashboard (Client UI Implementation)

**Story ID:** SPRINT2-EPIC04-STORY04
**Epic:** Epic 04 - Amma Role Enhancement
**Sprint:** Sprint 2
**Story Name:** Amma Dashboard (Client UI Implementation)
**Estimated Effort:** 4-6 hours (0.5-0.75 development day)
**Priority:** High (P1)
**Dependencies:**
- Epic 04 Story 01 (Individual Amma accounts)
- Epic 04 Story 02 (Enhanced query management)
- Epic 04 Story 03 (SLA timers, visual urgency indicators)
- Sprint 1.1 Chat with Amma (existing query system)
- Sprint 1.1 Facial Recognition (emotion tracking data)

**Last Updated:** 2025-10-24 15:47:14
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As an** Amma
**I want** a dashboard showing my open queries, SLA urgency, and student well-being insights
**So that** I can prioritize my work and respond to students efficiently

### 1.2. Story Context

Ammas need a centralized dashboard to:
- **View Open Queries:** See all assigned queries with SLA urgency indicators
- **Prioritize Work:** Sort by SLA urgency (RED first, then YELLOW, then GREEN)
- **Track Student Well-being:** View aggregated emotion data from facial recognition check-ins
- **Respond Quickly:** Voice note interface for fast responses

Dashboard features:
- **Quick Stats Cards:** Open Queries, Overdue SLA, Resolved Today, Avg Response Time
- **Priority Task List:** Queries sorted by SLA urgency with visual indicators
- **Student Well-Being Insights:** Chart showing emotion distribution (Happy, Sad, Angry, Stressed)
- **Voice Note Interface:** WhatsApp-style recording for responses

### 1.3. Key Features

- **Quick Stats Cards:** 4 cards showing key metrics
- **Priority Query List:** Sortable, filterable list of open queries
- **SLA Urgency Visual:** RED/YELLOW/GREEN color-coding
- **Student Well-Being Chart:** Bar/pie chart of emotion distribution
- **Voice Note Recording:** Press-and-hold to record, release to send
- **Real-Time Updates:** WebSocket or polling for new queries, SLA timer updates

---

## 1.5. Visual Layout Diagrams

### Amma Dashboard - Main Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Amma Dashboard - Welcome, Amma Priya                          [Profile ▼]  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Quick Stats                                                            │ │ ← Stats section
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │ │
│ │ │ Open Queries │ │ Overdue SLA  │ │ Resolved     │ │ Avg Response │  │ │
│ │ │              │ │              │ │ Today        │ │ Time         │  │ │
│ │ │      12      │ │      2       │ │      8       │ │  1.8 hours   │  │ │
│ │ │   ↑ 3 from   │ │   ↓ 1 from   │ │   ↑ 2 from   │ │   ↓ 0.5 hrs  │  │ │
│ │ │  yesterday   │ │  yesterday   │ │  yesterday   │ │  this week   │  │ │
│ │ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘  │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────┐ ┌──────────────────────────────┐   │
│ │ Priority Queries (12 open)         │ │ Student Well-Being Insights  │   │ ← 2-column layout
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │   (65% - 35%)
│ │ [Sort by: SLA Urgency ▼]          │ │ Ramakrishna Ashram (Today)   │   │
│ │ [Filter: All ▼]                    │ │                              │   │
│ │                                    │ │ Emotion Distribution:        │   │
│ │ ┌────────────────────────────────┐ │ │                              │   │
│ │ │ 🔴 Ravi Kumar (STU001)         │ │ │ Happy    ████████████ 45%    │   │ ← Bar chart
│ │ │ Emotional Support • Anxiety    │ │ │ Sad      ████ 15%            │   │
│ │ │ SLA: 12 min remaining          │ │ │ Stressed ██████ 25%          │   │
│ │ │ [Voice: 0:45] [View Details]   │ │ │ Angry    ████ 15%            │   │
│ │ └────────────────────────────────┘ │ │                              │   │
│ │                                    │ │ Total Check-ins Today: 18    │   │
│ │ ┌────────────────────────────────┐ │ │                              │   │
│ │ │ 🔴 Meera Das (STU007)          │ │ │ Students Needing Support:    │   │
│ │ │ Emotional Support • Family     │ │ │ ┌────────────────────────┐   │   │
│ │ │ SLA: 8 min remaining           │ │ │ │ Ravi K. (Stressed)     │   │   │ ← Alert list
│ │ │ [Voice: 1:10] [View Details]   │ │ │ │ Meera D. (Sad)         │   │   │
│ │ └────────────────────────────────┘ │ │ │ Anil R. (Angry)        │   │   │
│ │                                    │ │ └────────────────────────┘   │   │
│ │ ┌────────────────────────────────┐ │ │                              │   │
│ │ │ 🟡 Priya Sharma (STU003)       │ │ │ [View Full Report]           │   │
│ │ │ Academic Help • Math           │ │ └──────────────────────────────┘   │
│ │ │ SLA: 1h 45min remaining        │ │                                    │
│ │ │ [Text message] [View Details]  │ │                                    │
│ │ └────────────────────────────────┘ │                                    │
│ │                                    │                                    │
│ │ ... (9 more queries, scrollable)  │                                    │
│ │                                    │                                    │
│ │ [Load More (20 per page)]          │                                    │
│ └────────────────────────────────────┘                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Quick Stats Cards - Detailed View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Quick Stats                                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ┌───────────────────────────┐ ┌───────────────────────────┐               │
│ │ Open Queries              │ │ Overdue SLA               │               │
│ │ ───────────────────────── │ │ ───────────────────────── │               │
│ │                           │ │                           │               │
│ │          12               │ │          2                │               │ ← Large numbers
│ │                           │ │                           │               │   text-4xl font-bold
│ │  ↑ 3 from yesterday       │ │  ↓ 1 from yesterday       │               │ ← Trend
│ │  (33% increase)           │ │  (50% decrease)           │               │   text-sm
│ │                           │ │                           │               │
│ │  Breakdown:               │ │  Categories:              │               │
│ │  🔴 RED: 2                │ │  🔴 Emotional: 2          │               │
│ │  🟡 YELLOW: 4             │ │                           │               │
│ │  🟢 GREEN: 6              │ │                           │               │
│ │                           │ │  [View Details]           │               │
│ │  [View All]               │ │                           │               │
│ └───────────────────────────┘ └───────────────────────────┘               │
│                                                                             │
│ ┌───────────────────────────┐ ┌───────────────────────────┐               │
│ │ Resolved Today            │ │ Avg Response Time         │               │
│ │ ───────────────────────── │ │ ───────────────────────── │               │
│ │                           │ │                           │               │
│ │          8                │ │     1.8 hours             │               │
│ │                           │ │                           │               │
│ │  ↑ 2 from yesterday       │ │  ↓ 0.5 hrs this week      │               │
│ │  (25% increase)           │ │  (22% faster)             │               │
│ │                           │ │                           │               │
│ │  SLA Compliance: 75%      │ │  Target: < 2 hours        │               │
│ │  (6/8 within SLA)         │ │  ✅ Meeting target         │               │
│ │                           │ │                           │               │
│ │  [View Details]           │ │  [View Performance]       │               │
│ └───────────────────────────┘ └───────────────────────────┘               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Priority Query Card - Voice Note Interface

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🔴 Ravi Kumar (STU001, Class: 5th)                         [View Details]   │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ ← Query card (RED)
│                                                                             │   border-l-4 red-600
│ Category: Emotional Support • Tags: Anxiety, Home, Family                  │   bg-red-50
│                                                                             │
│ Student Message (Voice):                                                    │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ [▶] Voice Note (0:45)                                          [⋮]     │ │ ← Audio player
│ │ ──────●─────────────────────────────────────────────────────────────   │ │   with playback
│ │ 0:12 / 0:45                                                             │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Transcript (Auto-generated):                                                │
│ "I'm feeling very anxious about the situation at home. My parents are      │
│ fighting a lot and I can't focus on my studies."                           │
│                                                                             │
│ SLA: ⏱️ 12 minutes remaining • Deadline: 3:30 PM (80% elapsed)             │ ← SLA timer (RED)
│ Received: Oct 24, 2:30 PM • Priority: High • Status: Open                  │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Your Response                                                          │ │ ← Response section
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ [🎤 Press & Hold to Record Voice Note]                                 │ │ ← Voice recording
│ │                                                                        │ │   button (large)
│ │ or                                                                     │ │
│ │                                                                        │ │
│ │ ┌──────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [Type text response...]                                          │ │ │ ← Text input
│ │ └──────────────────────────────────────────────────────────────────┘ │ │   (alternative)
│ │                                                                        │ │
│ │ [Send Response] [Save Draft]                                           │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ [Mark as Resolved] [Escalate to Coach]                                     │ ← Action buttons
└─────────────────────────────────────────────────────────────────────────────┘
```

### Voice Note Recording - States

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Voice Note Recording States                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ State 1: IDLE (Ready to record)                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │                                                                        │ │
│ │                     [🎤 Press & Hold to Record]                        │ │ ← Large button
│ │                                                                        │ │   (gray background)
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ State 2: RECORDING (Mic active)                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │                                                                        │ │
│ │                     [🔴 Recording... 0:08]                             │ │ ← Red recording
│ │                     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                │ │   indicator + waveform
│ │                     Release to send • Swipe ← to cancel                │ │   bg-red-100
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ State 3: RECORDED (Preview)                                                │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ [▶] Your Voice Note (0:08)                               [🗑️ Delete]  │ │ ← Audio player
│ │ ──────●─────────────────────────────────────────────────────────────   │ │   with preview
│ │ 0:00 / 0:08                                                             │ │
│ │                                                                        │ │
│ │ [Re-record] [Send Voice Note]                                          │ │ ← Action buttons
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ State 4: SENDING (Upload progress)                                         │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Sending voice note...                                                  │ │
│ │ ████████████████████████──────────── 75%                              │ │ ← Progress bar
│ │                                                                        │ │
│ │ Uploading to server (12 KB / 16 KB)                                    │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ State 5: SUCCESS (Sent confirmation)                                       │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ✅ Voice note sent successfully!                                       │ │ ← Success message
│ │                                                                        │ │   green background
│ │ Student will receive notification.                                     │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Student Well-Being Insights - Chart

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Student Well-Being Insights                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Ramakrishna Ashram Balagruha • Today (Oct 24, 2025)                        │
│                                                                             │
│ Emotion Distribution (from facial recognition check-ins):                  │
│                                                                             │
│ 100% ├────────────────────────────────────────────────────────────────     │
│      │                                                                      │
│  75% ├────────────────────────────────────────────────────────────────     │
│      │ ████████████                                                         │
│  50% ├─████████████────────────────────────────────────────────────────    │
│      │ ████████████                                                         │
│  25% ├─████████████──────────────────────────────────────────────────     │
│      │ ████████████  ████  ██████  ████                                    │
│   0% └─────────────────────────────────────────────────────────────────    │
│        Happy (45%)  Sad   Stressed Angry                                   │
│                    (15%)  (25%)   (15%)                                     │
│                                                                             │
│ Total Check-ins Today: 18 of 24 students (75%)                             │
│                                                                             │
│ Students Needing Support (based on negative emotions):                     │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Ravi Kumar (STU001) - Stressed (3 consecutive days)                    │ │ ← Alert (yellow bg)
│ │ Meera Das (STU007) - Sad (last check-in)                               │ │
│ │ Anil Reddy (STU009) - Angry (last check-in)                            │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Trend (Last 7 Days):                                                        │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Happy: ────────────────────────────●───────────────────────────────    │ │ ← Line chart
│ │        40%  42%  43%  44%  45%  46%  45%                                │ │   (7-day trend)
│ │                                                                        │ │
│ │ Stressed: ────────────────────●────────────────────────────────────    │ │
│ │           20%  22%  23%  24%  25%  26%  25%                            │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ [View Full Report] [Export Data]                                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Measurements Summary

| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| **Dashboard Container** | 100% (max 1400px) | auto | px-8 py-6 | mx-auto | - | - |
| **Stats Card** | 25% (min 200px) | 160px | p-6 | mx-2 | border gray-200 rounded-lg | - |
| **Stats Value** | 100% | auto | - | mb-2 | - | text-4xl font-bold |
| **Stats Trend** | 100% | auto | - | mt-2 | - | text-sm text-gray-600 |
| **Priority Query List** | 65% | auto | p-6 | mr-4 | border gray-200 rounded-lg | - |
| **Query Card (RED)** | 100% | auto (min 180px) | p-5 | mb-4 | border-l-4 red-600 bg-red-50 | - |
| **Query Card (YELLOW)** | 100% | auto (min 180px) | p-5 | mb-4 | border-l-4 yellow-500 bg-yellow-50 | - |
| **Query Card (GREEN)** | 100% | auto (min 180px) | p-5 | mb-4 | border-l-4 green-600 bg-green-50 | - |
| **Voice Recording Button** | 100% | 64px | px-6 py-4 | mb-3 | rounded-lg bg-gray-200 | text-lg font-semibold |
| **Voice Recording (Active)** | 100% | 64px | px-6 py-4 | mb-3 | rounded-lg bg-red-100 | text-lg font-semibold |
| **Well-Being Chart Panel** | 35% | auto | p-6 | - | border gray-200 rounded-lg | - |
| **Emotion Bar** | 100% | 32px | - | my-2 | rounded-full bg-gray-200 | - |
| **Alert Card** | 100% | auto | px-4 py-3 | mb-2 | border-l-4 yellow-500 bg-yellow-50 | text-sm |

---

## 2. Acceptance Criteria

### 2.1. Dashboard Layout & Quick Stats

- [ ] **DASH-01:** Dashboard accessible at `/amma/dashboard` after login
- [ ] **DASH-02:** Four stats cards display: Open Queries, Overdue SLA, Resolved Today, Avg Response Time
- [ ] **DASH-03:** "Open Queries" shows count of queries with `status=open` and `assignedTo=currentAmma`
- [ ] **DASH-04:** "Open Queries" breakdown shows RED/YELLOW/GREEN count
- [ ] **DASH-05:** "Overdue SLA" shows count of queries with `sla.breached=true`
- [ ] **DASH-06:** "Resolved Today" shows count of queries resolved today (timestamp >= today 12:00 AM)
- [ ] **DASH-07:** "Avg Response Time" shows average time from `createdAt` to first response
- [ ] **DASH-08:** Trend indicators show comparison to yesterday: ↑ 3 from yesterday (33% increase)
- [ ] **DASH-09:** Stats update in real-time (WebSocket or polling every 30 seconds)

### 2.2. Priority Query List

- [ ] **QUERY-01:** Priority query list displays all open queries assigned to current Amma
- [ ] **QUERY-02:** Default sort: SLA urgency (RED first, then YELLOW, then GREEN, then by deadline)
- [ ] **QUERY-03:** Filter dropdown: All, Emotional Support, Academic Help, Technical Issue, Other
- [ ] **QUERY-04:** Sort dropdown: SLA Urgency, Newest First, Oldest First
- [ ] **QUERY-05:** Each query card displays: student name/ID/class, category, tags, message type (voice/text), SLA timer, received timestamp
- [ ] **QUERY-06:** Query cards color-coded by SLA urgency: RED (border-l-4 red-600, bg-red-50), YELLOW (border-l-4 yellow-500, bg-yellow-50), GREEN (border-l-4 green-600, bg-green-50)
- [ ] **QUERY-07:** Voice note queries show [▶ Play] button with duration
- [ ] **QUERY-08:** Text queries show message preview (first 100 chars)
- [ ] **QUERY-09:** "View Details" button opens query detail view in modal or new page
- [ ] **QUERY-10:** Pagination: 20 queries per page, "Load More" button

### 2.3. Voice Note Interface

- [ ] **VOICE-01:** Voice recording button displays: "🎤 Press & Hold to Record"
- [ ] **VOICE-02:** Press & hold initiates recording (uses MediaRecorder API)
- [ ] **VOICE-03:** While recording: Button shows "🔴 Recording... 0:08" with waveform animation, bg-red-100
- [ ] **VOICE-04:** Release button stops recording, shows preview player
- [ ] **VOICE-05:** Preview player shows duration, play button, delete button, re-record button
- [ ] **VOICE-06:** "Send Voice Note" button uploads audio to S3, creates response document
- [ ] **VOICE-07:** Upload progress bar displays during upload
- [ ] **VOICE-08:** Success message: "✅ Voice note sent successfully! Student will receive notification."
- [ ] **VOICE-09:** Swipe left while recording cancels recording
- [ ] **VOICE-10:** Maximum recording duration: 3 minutes (auto-stop at 3:00)

### 2.4. Student Well-Being Insights

- [ ] **WELL-01:** Well-Being Insights panel displays emotion distribution chart (bar chart)
- [ ] **WELL-02:** Emotion categories: Happy, Sad, Stressed, Angry (from facial recognition check-ins)
- [ ] **WELL-03:** Chart shows percentage of each emotion for current day
- [ ] **WELL-04:** Total check-ins today displays: "18 of 24 students (75%)"
- [ ] **WELL-05:** "Students Needing Support" section lists students with negative emotions (Sad, Stressed, Angry)
- [ ] **WELL-06:** Alert cards show: student name, emotion, note (e.g., "3 consecutive days")
- [ ] **WELL-07:** 7-day trend line chart shows emotion percentages over last week
- [ ] **WELL-08:** "View Full Report" button navigates to detailed well-being report
- [ ] **WELL-09:** "Export Data" button downloads CSV with emotion data

### 2.5. Real-Time Updates

- [ ] **REALTIME-01:** New queries appear in dashboard without page refresh (WebSocket push or polling every 30s)
- [ ] **REALTIME-02:** SLA timers update every minute without refresh
- [ ] **REALTIME-03:** Stats cards update in real-time when queries resolved or created
- [ ] **REALTIME-04:** Notification badge shows count of new queries since last view
- [ ] **REALTIME-05:** Audio notification (optional) plays when new urgent query (RED) arrives

### 2.6. Responsive Design

- [ ] **RESP-01:** Desktop (>1024px): 2-column layout (65% query list, 35% well-being)
- [ ] **RESP-02:** Tablet (768-1023px): Stacked layout (query list full width, well-being below)
- [ ] **RESP-03:** Mobile (<768px): Single column, well-being chart collapses to summary
- [ ] **RESP-04:** Stats cards: 4 columns on desktop, 2 columns on tablet, 1 column on mobile

### 2.7. Performance & Accessibility

- [ ] **PERF-01:** Dashboard loads within 1.5 seconds (up to 50 open queries)
- [ ] **PERF-02:** Real-time updates (WebSocket) have < 500ms latency
- [ ] **PERF-03:** Voice recording starts within 300ms of press-and-hold
- [ ] **ACC-01:** Keyboard navigation: Tab through query cards, Enter to open details, Space to play voice
- [ ] **ACC-02:** Screen reader announces: query urgency, stats values, emotion percentages
- [ ] **ACC-03:** Voice recording accessible via Enter key (press Enter to start, press again to stop)

---

## 3. Task Breakdown

### Phase 1: Dashboard Layout & Quick Stats (1 hour)

**Task 1.1: Create `AmmaDashboard.jsx` component (30 min)**
- Component structure: header, stats section, 2-column layout (query list + well-being)
- Stats cards grid: 4 columns
- Fetch data from GET `/api/v2/amma/:ammaId/dashboard`
- State management: `stats`, `openQueries`, `wellBeingData`
- File: `frontend/src/components/amma/AmmaDashboard.jsx`

**Task 1.2: Build stats cards (30 min)**
- Component: `StatsCard.jsx` (reusable)
- Props: `title`, `value`, `trend`, `breakdown?`
- Calculate trends: Compare today vs yesterday
- File: `frontend/src/components/amma/StatsCard.jsx`

### Phase 2: Priority Query List (1 hour)

**Task 2.1: Create query list component (30 min)**
- Component: `PriorityQueryList.jsx`
- Filter dropdown: All, Emotional Support, Academic Help, Technical Issue, Other
- Sort dropdown: SLA Urgency, Newest First, Oldest First
- Map through `openQueries` array, render `QueryCard` components
- Pagination: 20 per page, "Load More" button
- File: `frontend/src/components/amma/PriorityQueryList.jsx`

**Task 2.2: Build query card component (30 min)**
- Component: `QueryCard.jsx`
- Display: student info, category, tags, message type, SLA timer
- Color-coding by SLA urgency (RED/YELLOW/GREEN)
- Voice note: [▶ Play] button with duration
- Text message: Preview (first 100 chars)
- "View Details" button opens modal
- File: `frontend/src/components/amma/QueryCard.jsx`

### Phase 3: Voice Note Interface (1.5 hours)

**Task 3.1: Create voice recording component (45 min)**
- Component: `VoiceRecorder.jsx`
- Press-and-hold logic: `onMouseDown`, `onMouseUp`, `onTouchStart`, `onTouchEnd`
- MediaRecorder API for audio capture:
  ```javascript
  const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };
  ```
- Recording states: IDLE, RECORDING, RECORDED, SENDING, SUCCESS
- Waveform visualization during recording (canvas or library)
- File: `frontend/src/components/amma/VoiceRecorder.jsx`

**Task 3.2: Implement voice note upload (30 min)**
- Get S3 signed URL: POST `/api/v2/amma/voice-notes/get-upload-url`
- Upload audio blob to S3 using signed URL
- Create response document: POST `/api/v2/amma/queries/:queryId/respond`
- Request body: `{ type: 'voice', content: s3Url, ammaId }`
- Display upload progress bar
- File: `frontend/src/components/amma/VoiceRecorder.jsx`

**Task 3.3: Build voice preview player (15 min)**
- Component: `AudioPlayer.jsx`
- HTML5 audio element with custom controls
- Play/pause, seek bar, duration display
- "Re-record" and "Send Voice Note" buttons
- File: `frontend/src/components/amma/AudioPlayer.jsx`

### Phase 4: Student Well-Being Insights (45 min)

**Task 4.1: Create well-being insights panel (30 min)**
- Component: `WellBeingInsights.jsx`
- Emotion distribution bar chart (using Recharts or Chart.js)
- Data: Happy, Sad, Stressed, Angry percentages
- Total check-ins count
- "Students Needing Support" alert list
- 7-day trend line chart
- Fetch data from GET `/api/v2/amma/:ammaId/wellbeing?date=today`
- File: `frontend/src/components/amma/WellBeingInsights.jsx`

**Task 4.2: Implement well-being API endpoint (15 min)**
- GET `/api/v2/amma/:ammaId/wellbeing?date=today`
- Aggregate facial recognition check-ins for Balagruha students
- Group by emotion, calculate percentages
- Identify students with negative emotions (last 3 check-ins)
- Return: `{ emotionDistribution: {...}, totalCheckIns, studentsNeedingSupport: [...], trend: [...] }`
- File: `backend/controllers/ammaWellBeingController.js`

### Phase 5: Real-Time Updates (45 min)

**Task 5.1: Implement WebSocket connection (30 min)**
- Connect to WebSocket server on dashboard mount
- Listen for events: `newQuery`, `slaTimerUpdate`, `queryResolved`
- Update dashboard state on events:
  - `newQuery`: Add to `openQueries`, increment stats
  - `slaTimerUpdate`: Update SLA timer for affected query
  - `queryResolved`: Remove from `openQueries`, decrement stats
- File: `frontend/src/hooks/useWebSocket.js`

**Task 5.2: Implement fallback polling (15 min)**
- If WebSocket unavailable, use polling every 30 seconds
- Fetch latest dashboard data: GET `/api/v2/amma/:ammaId/dashboard`
- Compare with current state, update if changes detected
- File: `frontend/src/hooks/useDashboardPolling.js`

### Phase 6: Testing & Polish (30 min)

**Task 6.1: Unit tests for dashboard components (15 min)**
- Test stats calculation (open queries, overdue SLA, resolved today)
- Test query list filtering and sorting
- Test voice recording state transitions
- File: `frontend/tests/components/amma/AmmaDashboard.test.js`

**Task 6.2: E2E test for dashboard workflow (15 min)**
- Test: Amma logs in, dashboard displays stats and queries
- Test: Amma records voice note, sends response
- Test: Dashboard updates in real-time when new query arrives
- File: `frontend/tests/e2e/amma-dashboard.spec.js`

---

## 4. API Endpoints

### 4.1. Dashboard Data

**Endpoint:** `GET /api/v2/amma/:ammaId/dashboard`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "openQueries": {
        "count": 12,
        "trend": "+3",
        "breakdown": { "red": 2, "yellow": 4, "green": 6 }
      },
      "overdueSLA": {
        "count": 2,
        "trend": "-1"
      },
      "resolvedToday": {
        "count": 8,
        "trend": "+2"
      },
      "avgResponseTime": {
        "value": 1.8,
        "trend": "-0.5"
      }
    },
    "openQueries": [
      {
        "queryId": "Q-2025-0054",
        "student": { "id": "STU001", "name": "Ravi Kumar", "class": "5th" },
        "category": "Emotional Support",
        "tags": ["Anxiety", "Home"],
        "messageType": "voice",
        "messageContent": "https://s3.amazonaws.com/voice123.mp3",
        "sla": {
          "deadline": "2025-10-24T15:30:00Z",
          "minutesRemaining": 12,
          "urgencyLevel": "red"
        },
        "receivedAt": "2025-10-24T14:30:00Z"
      }
    ]
  }
}
```

---

### 4.2. Well-Being Insights

**Endpoint:** `GET /api/v2/amma/:ammaId/wellbeing?date=today`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "emotionDistribution": {
      "happy": 45,
      "sad": 15,
      "stressed": 25,
      "angry": 15
    },
    "totalCheckIns": 18,
    "totalStudents": 24,
    "studentsNeedingSupport": [
      { "studentId": "STU001", "name": "Ravi Kumar", "emotion": "stressed", "note": "3 consecutive days" },
      { "studentId": "STU007", "name": "Meera Das", "emotion": "sad", "note": "last check-in" },
      { "studentId": "STU009", "name": "Anil Reddy", "emotion": "angry", "note": "last check-in" }
    ],
    "trend": [
      { "date": "2025-10-18", "happy": 40, "stressed": 20 },
      { "date": "2025-10-19", "happy": 42, "stressed": 22 },
      { "date": "2025-10-20", "happy": 43, "stressed": 23 },
      { "date": "2025-10-21", "happy": 44, "stressed": 24 },
      { "date": "2025-10-22", "happy": 45, "stressed": 25 },
      { "date": "2025-10-23", "happy": 46, "stressed": 26 },
      { "date": "2025-10-24", "happy": 45, "stressed": 25 }
    ]
  }
}
```

---

## 5. File Paths

```
frontend/src/components/amma/
├── AmmaDashboard.jsx                # Main dashboard layout
├── StatsCard.jsx                    # Reusable stats card
├── PriorityQueryList.jsx            # Query list with filters
├── QueryCard.jsx                    # Individual query card
├── VoiceRecorder.jsx                # Voice recording interface
├── AudioPlayer.jsx                  # Audio preview player
└── WellBeingInsights.jsx            # Well-being chart panel

frontend/src/hooks/
├── useWebSocket.js                  # WebSocket connection for real-time
└── useDashboardPolling.js           # Fallback polling for dashboard data

backend/controllers/
├── ammaDashboardController.js       # Dashboard data API
└── ammaWellBeingController.js       # Well-being insights API

backend/routes/v2/
└── amma.js                          # Amma routes (updated)

frontend/tests/components/amma/
└── AmmaDashboard.test.js            # Unit tests

frontend/tests/e2e/
└── amma-dashboard.spec.js           # E2E tests
```

---

## 6. Definition of Done

- [ ] Amma dashboard accessible at `/amma/dashboard` after login
- [ ] Four stats cards display with real-time updates
- [ ] Priority query list displays all open queries sorted by SLA urgency
- [ ] Query cards color-coded by SLA urgency (RED/YELLOW/GREEN)
- [ ] Voice note recording works (press-and-hold interface)
- [ ] Voice note preview player functional
- [ ] Voice note upload to S3 with progress bar
- [ ] Student well-being insights chart displays emotion distribution
- [ ] "Students Needing Support" alert list functional
- [ ] 7-day emotion trend chart displays
- [ ] Real-time updates via WebSocket or polling
- [ ] Responsive design: desktop/tablet/mobile layouts
- [ ] Unit tests: 80%+ coverage for dashboard components
- [ ] E2E tests: Full dashboard workflow tested
- [ ] Code peer-reviewed
- [ ] Merged to `develop`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:47:14
- **Status:** Draft - Ready for Development

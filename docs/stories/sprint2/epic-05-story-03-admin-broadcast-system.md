# Epic 05 Story 03: Admin Broadcast System ("Mann ki Baat")

**Last Updated:** 2025-10-24 16:10:15 (via `date '+%Y-%m-%d %H:%M:%S'`)

---

## Story Overview

**As an** Admin
**I want to** send broadcast messages (text or voice) to all students or specific Balagruhas
**So that** I can communicate important announcements, motivational messages, and updates efficiently across the ISF Playground community

---

## Business Context

The "Mann ki Baat" feature (inspired by PM Modi's radio broadcast series) enables Admins to send system-wide or targeted broadcast communications to students. This feature serves multiple purposes:

1. **Motivational Communication**: Share inspiring messages, quotes, and encouragement to keep students engaged
2. **Announcements**: Communicate schedule changes, upcoming events, new course launches, and important updates
3. **Cultural Content**: Share stories, values, and ISF's mission to reinforce organizational culture
4. **Emergency Alerts**: Quickly notify students of urgent information (weather, facility closures, etc.)
5. **Engagement Boost**: Regular communication from leadership increases student connection and participation

Unlike query responses or notifications, broadcasts are one-to-many communications that create a sense of community and shared purpose.

---

## Dependencies

### Sprint 1.1 Dependencies:
- **RBAC System**: Admin role permissions for broadcast management
- **Facial Recognition**: (Optional) Could display student emotion trends to inform broadcast timing

### Sprint 2 Dependencies:
- **Epic 05 Story 01**: In-App Notification Center - Broadcasts appear as notifications
- **Epic 05 Story 02**: Voice Communication Infrastructure - Voice broadcasts use VoiceRecorder component
- **Epic 01 Story 01**: Student Homepage - Broadcasts appear in notification bell

---

## User Roles Involved

- **Admin**: Creates, schedules, sends, and manages broadcast messages
- **Student**: Receives and views/listens to broadcast messages
- **System**: Processes scheduled broadcasts, manages delivery queue, tracks delivery status

---

## 1. Feature Requirements

### 1.1 Core Functionality

**Broadcast Message Composition:**
- Admin can compose text messages (max 500 characters)
- Admin can record voice messages (max 180 seconds / 3 minutes)
- Rich text formatting: Bold, italic, bullet points, emoji picker
- Preview before sending
- Save as draft functionality
- Template library for common messages

**Target Audience Selection:**
- All Students: Broadcast to entire ISF community
- Specific Balagruhas: Multi-select Balagruha groups
- Individual Students: Search and select specific students (for special messages)
- Filter by active/inactive status
- Show recipient count preview

**Scheduling:**
- Send Immediately
- Schedule for future date/time
- Recurring broadcasts (weekly motivational messages)
- Timezone-aware scheduling (IST default)

**Delivery Management:**
- Queue system for large broadcasts
- Batch processing (500 students per batch)
- Delivery status tracking (Pending, Sent, Delivered, Read)
- Failed delivery retry mechanism
- Real-time progress indicator during sending

**Broadcast History:**
- View all past broadcasts with filters (date range, type, audience)
- View delivery statistics (sent count, read count, read percentage)
- View individual student read receipts
- Re-send or duplicate past broadcasts
- Archive old broadcasts

### 1.2 UI/UX Requirements

**Admin Broadcast Dashboard:**
- Clean, spacious layout optimized for 1366x768 resolution
- Quick action button: "Create New Broadcast"
- Recent broadcasts list with status indicators
- Search and filter controls
- Statistics summary cards (total sent, avg read rate, last broadcast)

**Message Composer:**
- Modal overlay (800px width) with clear visual hierarchy
- Toggle between Text and Voice modes
- Character/time counter
- Audience selector with visual chips
- Schedule picker with calendar widget
- Preview pane showing how message will appear to students

**Broadcast History:**
- Tabbed interface: All, Scheduled, Sent, Drafts
- Card-based layout with key info (date, subject, audience, status)
- Expandable details with full message content and statistics
- Action menu: View Details, Duplicate, Re-send, Archive

**Student Notification Display:**
- Broadcast messages appear in Notification Center (from Epic 05 Story 01)
- Special "Broadcast" badge/icon to distinguish from regular notifications
- Full-screen modal when student clicks to read/listen
- "Mark as Read" tracked automatically after 3 seconds of viewing

### 1.3 Technical Requirements

**Frontend:**
- React v19.0.0 functional components with hooks
- TailwindCSS utility classes for styling
- Reuse VoiceRecorder component from Epic 05 Story 02
- React-DatePicker for scheduling
- React-Select for multi-select Balagruha picker
- Draft.js or Slate.js for rich text editing
- Emoji-picker-react for emoji selection

**Backend:**
- MongoDB collections: Broadcasts, BroadcastRecipients, BroadcastDeliveries
- Node.js queue system (Bull.js or Agenda.js) for scheduled and batch processing
- WebSocket or Server-Sent Events for real-time delivery progress
- S3 storage for voice broadcast files with CDN delivery
- Cron job to check scheduled broadcasts every minute

**Performance:**
- Batch processing: Send to 500 students per batch with 2-second delay between batches
- Lazy loading for broadcast history (paginate 20 broadcasts per page)
- Optimize database queries with indexes on createdAt, scheduledFor, status
- Cache recipient counts for large Balagruhas

**Data Integrity:**
- Validate recipient list exists before sending
- Prevent duplicate broadcasts to same audience within 1 hour
- Track delivery failures and provide retry mechanism
- Soft delete for archived broadcasts (retain for 1 year)

---

## 1.5 Visual Layout Diagrams

### Diagram 1: Admin Broadcast Dashboard - Main View (1366x768)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ISF Playground Admin - Broadcasts                                    [🔔 3] [Admin] [Logout]   │ 72px Title Bar
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│  [Dashboard] [Courses] [Students] [Reports] [BROADCASTS] [Settings]                             │ 64px Toolbar
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  Mann ki Baat - Broadcast Management                                                     │   │
│  │                                                          [+ Create New Broadcast] Button │   │ 80px Header
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│  │ 📢 Total Sent    │  │ 👁️ Avg Read Rate │  │ 📅 Scheduled     │  │ 🕐 Last Broadcast│       │
│  │                  │  │                  │  │                  │  │                  │       │
│  │      247         │  │      78.5%       │  │        3         │  │   2 hours ago    │       │ 120px Stats
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘       │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  [All] [Scheduled] [Sent] [Drafts]                          🔍 Search...  [Filter ▼]    │   │ 60px Tabs
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  📢 Weekly Motivation - Monday Inspiration            🟢 Sent    Oct 21, 2025 8:00 AM   │   │
│  │  To: All Students (1,247 students)                                                       │   │
│  │  Read: 978 / 1,247 (78.4%)                                                               │   │ 100px
│  │  [View Details] [Duplicate] [•••]                                                        │   │ Broadcast Card
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  🎤 Voice: New Course Launch Announcement         🔵 Scheduled  Oct 25, 2025 10:00 AM   │   │
│  │  To: All Students (1,247 students)                                                       │   │
│  │  Duration: 2:15                                                                           │   │ 100px
│  │  [Edit] [Send Now] [Cancel] [•••]                                                        │   │ Broadcast Card
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  💬 Emergency: Facility Closure Notice            🟢 Sent    Oct 20, 2025 3:45 PM       │   │
│  │  To: Balagruha Vijayawada, Balagruha Guntur (487 students)                              │   │
│  │  Read: 423 / 487 (86.9%)                                                                 │   │ 100px
│  │  [View Details] [Duplicate] [•••]                                                        │   │ Broadcast Card
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  [Load More...]                                                                                  │
│                                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                                                         Total: 768px
```

**Component Measurements:**
| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| Title Bar | 100% | 72px | px-6 py-4 | - | border-b gray-200 | text-xl font-bold |
| Toolbar | 100% | 64px | px-6 py-3 | - | border-b gray-200 | text-base |
| Page Header | 100% | 80px | p-6 | mx-6 mt-6 | rounded-lg bg-white | text-2xl font-bold |
| Stats Card | 25% (min 280px) | 120px | p-6 | mx-2 my-4 | border gray-200 rounded-lg | text-3xl font-bold |
| Create Button | auto | 44px | px-6 py-2 | - | rounded-md bg-blue-600 text-white | text-base font-semibold |
| Tab Bar | 100% | 60px | px-6 py-3 | mx-6 my-4 | border gray-200 rounded-lg bg-white | text-base |
| Broadcast Card | calc(100%-48px) | 100px | p-6 | mx-6 my-2 | border gray-200 rounded-lg shadow-sm | text-base |
| Card Title | 100% | 24px | - | mb-2 | - | text-lg font-semibold |
| Card Meta | 100% | 20px | - | mb-1 | - | text-sm text-gray-600 |

---

### Diagram 2: Message Composer Modal - Text Mode (800x600 overlay)

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  Create New Broadcast                                               [✕ Close] │ 60px Header
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Message Type: [ Text ⚫ ]  [ Voice ⚪ ]                                       │ 50px Type Toggle
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐│
│  │ Subject (Optional)                                                         ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │ Weekly Motivation - Keep Growing!                                   │   ││ 40px Input
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  │                                                                             ││
│  │ Message Content                                              350 / 500     ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │ [B] [I] [•] [😊]                                                     │   ││ 40px Toolbar
│  │ ├─────────────────────────────────────────────────────────────────────┤   ││
│  │ │ Dear Students,                                                       │   ││
│  │ │                                                                       │   ││
│  │ │ This week's focus: Never stop learning! 🌟                          │   ││
│  │ │                                                                       │   ││
│  │ │ • Practice daily                                                     │   ││ 180px
│  │ │ • Help your friends                                                  │   ││ Text Area
│  │ │ • Ask questions                                                      │   ││
│  │ │                                                                       │   ││
│  │ │ You are doing amazing work! Keep it up! 💪                          │   ││
│  │ │                                                                       │   ││
│  │ │ - ISF Admin Team                                                     │   ││
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  │                                                                             ││
│  │ Send To                                                                     ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │ [All Students ⚫]  [Select Balagruhas ⚪]  [Individual Students ⚪]  │   ││ 40px Radio
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  │                                                                             ││
│  │ Recipients: 1,247 active students                                          ││ 24px Info
│  │                                                                             ││
│  │ Schedule                                                                    ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │ [Send Immediately ⚫]  [Schedule for later ⚪]                       │   ││ 40px Radio
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  └───────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐│
│  │ Preview: How students will see this message                                ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │ 📢 Broadcast from ISF Admin                                          │   ││
│  │ │ Weekly Motivation - Keep Growing!                                    │   ││
│  │ │                                                                       │   ││ 100px Preview
│  │ │ Dear Students,                                                       │   ││
│  │ │ This week's focus: Never stop learning! 🌟                          │   ││
│  │ │ [View Full Message]                                                  │   ││
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  └───────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  [Save as Draft]                        [Cancel]  [Send Broadcast →]           │ 60px Footer
└───────────────────────────────────────────────────────────────────────────────┘
                                                                     Total: 600px
```

**Component Measurements:**
| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| Modal Container | 800px | auto (max 600px) | - | - | rounded-xl shadow-2xl bg-white | - |
| Modal Header | 100% | 60px | px-6 py-4 | - | border-b gray-200 | text-xl font-bold |
| Type Toggle | 100% | 50px | px-6 py-3 | - | - | text-base |
| Subject Input | 100% | 40px | px-4 py-2 | mb-4 | border gray-300 rounded-lg | text-base |
| Text Area | 100% | 180px | p-4 | mb-4 | border gray-300 rounded-lg | text-base Patrick Hand |
| Toolbar | 100% | 40px | px-4 py-2 | - | border-b gray-200 | text-sm |
| Radio Group | 100% | 40px | px-4 py-2 | mb-3 | border gray-300 rounded-lg | text-base |
| Preview Box | 100% | 100px | p-4 | my-4 | border gray-300 rounded-lg bg-gray-50 | text-sm |
| Footer Buttons | auto | 44px | px-6 py-2 | mx-2 | rounded-md | text-base font-semibold |
| Send Button | auto | 44px | px-8 py-2 | ml-2 | rounded-md bg-blue-600 text-white | text-base font-semibold |

---

### Diagram 3: Message Composer Modal - Voice Mode (800x500 overlay)

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  Create New Broadcast                                               [✕ Close] │ 60px Header
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Message Type: [ Text ⚪ ]  [ Voice ⚫ ]                                       │ 50px Type Toggle
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐│
│  │ Subject (Optional)                                                         ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │ Motivational Message for the Week                                   │   ││ 40px Input
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  │                                                                             ││
│  │ Voice Recording                                                 0:00 / 3:00││
│  │                                                                             ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │                                                                       │   ││
│  │ │                         [  🎤  ]                                      │   ││
│  │ │                                                                       │   ││ 150px
│  │ │              Press and hold to record                                │   ││ Record Area
│  │ │                                                                       │   ││
│  │ │              (Max duration: 3 minutes)                               │   ││
│  │ │                                                                       │   ││
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  │                                                                             ││
│  │ Send To                                                                     ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │ [All Students ⚫]  [Select Balagruhas ⚪]  [Individual Students ⚪]  │   ││ 40px Radio
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  │                                                                             ││
│  │ Recipients: 1,247 active students                                          ││ 24px Info
│  │                                                                             ││
│  │ Schedule                                                                    ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │ [Send Immediately ⚫]  [Schedule for later ⚪]                       │   ││ 40px Radio
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  └───────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  [Save as Draft]                        [Cancel]  [Send Broadcast →]           │ 60px Footer
└───────────────────────────────────────────────────────────────────────────────┘
                                                                     Total: 500px
```

**State: After Recording (Voice Recorded Successfully)**

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  Create New Broadcast                                               [✕ Close] │ 60px Header
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Message Type: [ Text ⚪ ]  [ Voice ⚫ ]                                       │ 50px Type Toggle
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐│
│  │ Subject (Optional)                                                         ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │ Motivational Message for the Week                                   │   ││ 40px Input
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  │                                                                             ││
│  │ Voice Recording                                                       2:15  ││
│  │                                                                             ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │  [▶ Play] [🔄 Re-record] [🗑️ Delete]                                │   ││ 40px Controls
│  │ ├─────────────────────────────────────────────────────────────────────┤   ││
│  │ │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●─────────────  1:22 / 2:15      │   ││ 60px
│  │ │                                                                       │   ││ Player
│  │ │  [1x] [1.5x] [2x]                                                    │   ││
│  │ ├─────────────────────────────────────────────────────────────────────┤   ││
│  │ │  Waveform: ▂▃▅▇▆▄▃▅▇▆▄▂▃▅▇▆▄▃▅▇▆▄▂▃▅▇▆▄▃▅▇▆▄▂▃▅▇▆▄▃▅▇▆▄▂▃▅▇  │   ││ 50px Wave
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  │                                                                             ││
│  │ Send To                                                                     ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │ [All Students ⚫]  [Select Balagruhas ⚪]  [Individual Students ⚪]  │   ││ 40px Radio
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  │                                                                             ││
│  │ Recipients: 1,247 active students                                          ││ 24px Info
│  │                                                                             ││
│  │ Schedule                                                                    ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐   ││
│  │ │ [Schedule for later ⚫]    📅 Oct 25, 2025  🕐 8:00 AM              │   ││ 40px Schedule
│  │ └─────────────────────────────────────────────────────────────────────┘   ││
│  └───────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  [Save as Draft]                        [Cancel]  [Schedule Broadcast →]       │ 60px Footer
└───────────────────────────────────────────────────────────────────────────────┘
                                                                     Total: 550px
```

---

### Diagram 4: Balagruha Selector Modal (600x400 overlay)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Select Balagruhas                                      [✕ Close]    │ 60px Header
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  🔍 Search Balagruhas...                                             │ 50px Search
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ balagruha vijayawada                                         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ☑️ Select All (15 Balagruhas, 1,247 students)                      │ 40px Select All
│                                                                       │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ ☑️ Balagruha Vijayawada                    124 students       │ │ 40px Item
│  │ ☑️ Balagruha Guntur                        98 students        │ │ 40px Item
│  │ ☐ Balagruha Hyderabad                     156 students       │ │ 40px Item
│  │ ☐ Balagruha Tirupati                      87 students        │ │ 40px Item
│  │ ☐ Balagruha Visakhapatnam                 142 students       │ │ 40px Item
│  │ ☐ Balagruha Kakinada                      76 students        │ │ 40px Item
│  │ ☐ Balagruha Nellore                       91 students        │ │ 40px Item
│  │ ...                                                            │ │
│  └───────────────────────────────────────────────────────────────┘ │ 240px
│                                                                       │ Scrollable
│  Selected: 2 Balagruhas, 222 students                                │ 30px Footer
│                                                                       │
│                                      [Cancel]  [Apply Selection]     │ 60px Actions
└─────────────────────────────────────────────────────────────────────┘
                                                           Total: 400px
```

**Component Measurements:**
| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| Modal Container | 600px | 400px | - | - | rounded-xl shadow-2xl bg-white | - |
| Header | 100% | 60px | px-6 py-4 | - | border-b gray-200 | text-xl font-bold |
| Search Input | calc(100%-48px) | 40px | px-4 py-2 | mx-6 my-3 | border gray-300 rounded-lg | text-base |
| Select All Checkbox | calc(100%-48px) | 40px | px-4 py-2 | mx-6 my-2 | border-b gray-200 | text-base font-semibold |
| List Container | calc(100%-48px) | 240px | - | mx-6 | border gray-200 rounded-lg | - |
| Balagruha Item | 100% | 40px | px-4 py-2 | - | border-b gray-100 | text-base |
| Footer Count | calc(100%-48px) | 30px | px-6 py-2 | mx-6 | - | text-sm text-gray-600 |
| Action Buttons | auto | 44px | px-6 py-2 | mx-2 my-3 | rounded-md | text-base font-semibold |

---

### Diagram 5: Broadcast Details View (Full Page)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ISF Playground Admin - Broadcasts                                    [🔔 3] [Admin] [Logout]   │ 72px Title Bar
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│  [Dashboard] [Courses] [Students] [Reports] [BROADCASTS] [Settings]                             │ 64px Toolbar
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                   │
│  [← Back to Broadcasts]                                                                          │ 50px Back Nav
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  📢 Weekly Motivation - Monday Inspiration                                               │   │
│  │  Status: 🟢 Sent                                                                         │   │
│  │  Sent on: October 21, 2025 at 8:00 AM IST                                               │   │ 120px
│  │  Created by: Admin (Ravi Kumar)                                                          │   │ Header Info
│  │                                                                                           │   │
│  │  [Duplicate] [Re-send] [Archive] [Export Report]                                        │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  Delivery Statistics                                                                     │   │
│  │                                                                                           │   │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐│   │
│  │  │ 👥 Total Sent    │  │ ✅ Delivered     │  │ 👁️ Read         │  │ 📊 Read Rate     ││   │
│  │  │                  │  │                  │  │                  │  │                  ││   │
│  │  │     1,247        │  │     1,247        │  │      978         │  │     78.4%        ││   │ 140px Stats
│  │  └──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘│   │
│  │                                                                                           │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  Message Content                                                                         │   │
│  │                                                                                           │   │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────┐   │   │
│  │  │  Dear Students,                                                                  │   │   │
│  │  │                                                                                   │   │   │
│  │  │  Welcome to a brand new week! This week's theme is: "Consistency is Key" 🔑     │   │   │
│  │  │                                                                                   │   │   │
│  │  │  Remember:                                                                        │   │   │
│  │  │  • Small daily efforts lead to big results                                       │   │   │ 180px
│  │  │  • Never give up, even when it's difficult                                       │   │   │ Message
│  │  │  • Help your friends succeed too                                                 │   │   │ Display
│  │  │                                                                                   │   │   │
│  │  │  You are all doing incredible work at ISF Playground. Keep learning, keep       │   │   │
│  │  │  growing, and keep earning those ISF Coins! 💰🌟                                │   │   │
│  │  │                                                                                   │   │   │
│  │  │  With pride,                                                                      │   │   │
│  │  │  ISF Admin Team                                                                   │   │   │
│  │  └─────────────────────────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  Recipients                                                                              │   │
│  │                                                                                           │   │
│  │  Audience: All Students                                                                  │   │
│  │  Total: 1,247 active students across 15 Balagruhas                                      │   │ 60px
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │ Recipients
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  Read Receipts by Balagruha                          🔍 Search...   [Export CSV]        │   │
│  │                                                                                           │   │
│  │  Balagruha Vijayawada:        ████████████████░░  97/124  (78.2%)                      │   │ 40px Bar
│  │  Balagruha Guntur:            ██████████████████  98/98   (100%)                       │   │ 40px Bar
│  │  Balagruha Hyderabad:         ██████████████░░░░  120/156 (76.9%)                      │   │ 40px Bar
│  │  Balagruha Tirupati:          ███████████████░░░  68/87   (78.2%)                      │   │ 40px Bar
│  │  Balagruha Visakhapatnam:     █████████████░░░░░  110/142 (77.5%)                      │   │ 40px Bar
│  │  ...                                                                                     │   │
│  │                                                                                           │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Diagram 6: Student View - Broadcast Notification in Notification Center

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ISF Playground                                                       [🔔 5] [Priya] [Logout]    │ 72px Title Bar
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│  [My Courses] [Leaderboard] [Shop] [Wallet] [Profile]                                           │ 64px Toolbar
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                   │
│                                                                 ┌──────────────────────────────┐│
│                                                                 │ Notifications            [✕] ││ 60px Header
│                                                                 ├──────────────────────────────┤│
│                                                                 │                              ││
│                                                                 │ [All] [Unread (3)]           ││ 40px Tabs
│                                                                 │                              ││
│                                                                 │ ┌──────────────────────────┐││
│                                                                 │ │ 📢 Broadcast             │││
│                                                                 │ │ Weekly Motivation        │││
│                                                                 │ │                          │││
│                                                                 │ │ Welcome to a brand new   │││ 120px
│                                                                 │ │ week! This week's...     │││ Notification
│                                                                 │ │                          │││ Card
│                                                                 │ │ [Read More]              │││
│                                                                 │ │                          │││
│                                                                 │ │ 2 hours ago         [●] │││
│                                                                 │ └──────────────────────────┘││
│                                                                 │                              ││
│                                                                 │ ┌──────────────────────────┐││
│                                                                 │ │ ✅ System                │││
│                                                                 │ │ Course Completed!        │││
│                                                                 │ │                          │││
│                                                                 │ │ You earned 50 ISF Coins  │││ 100px
│                                                                 │ │ for completing Computer  │││ Notification
│                                                                 │ │ Apps Module 2            │││ Card
│                                                                 │ │                          │││
│                                                                 │ │ 5 hours ago              │││
│                                                                 │ └──────────────────────────┘││
│                                                                 │                              ││
│                                                                 │ [Mark All as Read]           ││ 40px Footer
│                                                                 └──────────────────────────────┘│
│                                                                                            400px │
│                                                                                            Height│
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Diagram 7: Student View - Full Broadcast Message Modal (Text)

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  Broadcast Message                                              [✕ Close]      │ 60px Header
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  📢 From: ISF Admin Team                                                       │ 40px Sender
│  Sent: October 21, 2025 at 8:00 AM                                            │ 30px Date
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐│
│  │  Weekly Motivation - Monday Inspiration                                    ││ 40px Title
│  └───────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐│
│  │                                                                             ││
│  │  Dear Students,                                                             ││
│  │                                                                             ││
│  │  Welcome to a brand new week! This week's theme is: "Consistency is Key" 🔑││
│  │                                                                             ││
│  │  Remember:                                                                  ││
│  │  • Small daily efforts lead to big results                                 ││ 300px
│  │  • Never give up, even when it's difficult                                 ││ Message
│  │  • Help your friends succeed too                                           ││ Content
│  │                                                                             ││
│  │  You are all doing incredible work at ISF Playground. Keep learning, keep  ││
│  │  growing, and keep earning those ISF Coins! 💰🌟                           ││
│  │                                                                             ││
│  │  With pride,                                                                ││
│  │  ISF Admin Team                                                             ││
│  │                                                                             ││
│  └───────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│                                                       [Close]                   │ 60px Footer
└───────────────────────────────────────────────────────────────────────────────┘
                                                                     Total: 530px
```

---

### Diagram 8: Student View - Full Broadcast Message Modal (Voice)

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  Broadcast Message                                              [✕ Close]      │ 60px Header
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  🎤 From: ISF Admin Team                                                       │ 40px Sender
│  Sent: October 25, 2025 at 10:00 AM                                           │ 30px Date
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐│
│  │  Motivational Message for the Week                                         ││ 40px Title
│  └───────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐│
│  │                                                                             ││
│  │  [▶ Play]                                                          2:15    ││ 50px Controls
│  │                                                                             ││
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●────────────  0:00 / 2:15      ││ 60px Player
│  │                                                                             ││
│  │  [1x] [1.5x] [2x]                                                          ││ 40px Speed
│  │                                                                             ││
│  │  Waveform:                                                                  ││ 80px
│  │  ▂▃▅▇▆▄▃▅▇▆▄▂▃▅▇▆▄▃▅▇▆▄▂▃▅▇▆▄▃▅▇▆▄▂▃▅▇▆▄▃▅▇▆▄▂▃▅▇▆▄▃▅▇▆▄▂▃▅▇▆▄▃▅▇▆▄▂    ││ Waveform
│  │                                                                             ││
│  └───────────────────────────────────────────────────────────────────────────┘│
│                                                                                 │
│                                                       [Close]                   │ 60px Footer
└───────────────────────────────────────────────────────────────────────────────┘
                                                                     Total: 460px
```

**Component Measurements:**
| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| Modal Container | 700px | auto | - | - | rounded-xl shadow-2xl bg-white | - |
| Header | 100% | 60px | px-6 py-4 | - | border-b gray-200 | text-xl font-bold |
| Sender Info | 100% | 40px | px-6 py-2 | - | - | text-base font-semibold |
| Date Info | 100% | 30px | px-6 py-1 | - | - | text-sm text-gray-600 |
| Title Box | calc(100%-48px) | 40px | px-4 py-2 | mx-6 my-4 | border-l-4 border-blue-500 bg-blue-50 | text-lg font-bold |
| Message Content | calc(100%-48px) | auto (max 300px) | p-6 | mx-6 my-4 | border gray-200 rounded-lg bg-gray-50 | text-base Patrick Hand |
| Audio Player | calc(100%-48px) | 230px | p-4 | mx-6 my-4 | border gray-200 rounded-lg bg-gray-50 | - |
| Footer Button | auto | 44px | px-8 py-2 | mx-6 my-4 | rounded-md bg-blue-600 text-white | text-base font-semibold |

---

### Diagram 9: Scheduled Broadcast Calendar View (Optional Enhancement)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  Scheduled Broadcasts Calendar                                          [← Back] [+ New]        │ 80px Header
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                   │
│  October 2025                                           [◄ Prev Month]  [Today]  [Next Month ►] │ 60px Controls
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  Sun      Mon       Tue       Wed       Thu       Fri       Sat                         │   │ 40px
│  ├─────────────────────────────────────────────────────────────────────────────────────────┤   │ Header
│  │         │         │         │   1      │   2      │   3      │   4                     │   │
│  │         │         │         │          │          │          │                         │   │ 80px Row
│  ├─────────┼─────────┼─────────┼──────────┼──────────┼──────────┼─────────────────────────┤   │
│  │   5     │   6     │   7     │   8      │   9      │  10      │  11                     │   │
│  │         │         │         │          │          │          │                         │   │ 80px Row
│  ├─────────┼─────────┼─────────┼──────────┼──────────┼──────────┼─────────────────────────┤   │
│  │  12     │  13     │  14     │  15      │  16      │  17      │  18                     │   │
│  │         │         │         │          │          │          │                         │   │ 80px Row
│  ├─────────┼─────────┼─────────┼──────────┼──────────┼──────────┼─────────────────────────┤   │
│  │  19     │  20     │  21     │  22      │  23      │  24      │  25                     │   │
│  │         │ 📢 8AM  │         │          │          │          │ 🎤 10AM                 │   │ 80px Row
│  │         │ Weekly  │         │          │          │          │ New Course              │   │
│  ├─────────┼─────────┼─────────┼──────────┼──────────┼──────────┼─────────────────────────┤   │
│  │  26     │  27     │  28     │  29      │  30      │  31      │                         │   │
│  │         │         │         │          │          │          │                         │   │ 80px Row
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                            480px  │
│  Upcoming Scheduled Broadcasts:                                                                  │
│  • Oct 21, 8:00 AM - Weekly Motivation (Text)                                                   │
│  • Oct 25, 10:00 AM - New Course Launch (Voice, 2:15)                                           │
│                                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Acceptance Criteria

### AC 2.1: Message Composition - Text Mode

**AC-001:** Admin can create a text broadcast with optional subject (max 50 chars) and message body (max 500 chars)
**AC-002:** Rich text toolbar provides Bold, Italic, Bullet List formatting options
**AC-003:** Emoji picker button opens emoji selection modal with categories (Smileys, Symbols, Flags)
**AC-004:** Character counter displays "X / 500" and turns red when approaching limit (>480 chars)
**AC-005:** Text area supports Patrick Hand font for child-friendly appearance
**AC-006:** Preview pane updates in real-time as admin types, showing exact student view
**AC-007:** "Save as Draft" button saves current state to Drafts tab with timestamp
**AC-008:** Drafts auto-save every 30 seconds if changes detected
**AC-009:** Admin can load existing draft, edit, and continue
**AC-010:** Subject line is optional; if blank, message uses first 30 chars as title

### AC 2.2: Message Composition - Voice Mode

**AC-011:** Admin can switch to Voice mode using toggle button (Text ⚪ / Voice ⚫)
**AC-012:** Voice recording uses VoiceRecorder component from Epic 05 Story 02
**AC-013:** Max recording duration is 180 seconds (3 minutes)
**AC-014:** Press-and-hold microphone button initiates recording
**AC-015:** Real-time waveform visualization displays during recording
**AC-016:** Timer displays current duration "MM:SS / 3:00"
**AC-017:** Auto-stop at 3-minute mark with visual/audio indicator
**AC-018:** Admin can release button to stop recording early
**AC-019:** After recording, display audio player with Play, Re-record, Delete controls
**AC-020:** Playback supports seek bar, play/pause, and speed controls (1x, 1.5x, 2x)
**AC-021:** Re-record button discards current recording and starts fresh
**AC-022:** Delete button clears recording and returns to idle recording state
**AC-023:** Audio file uploads to S3 with signed URL, returns CDN URL
**AC-024:** Upload progress indicator shows percentage during S3 upload
**AC-025:** Voice broadcasts can also have optional subject line

### AC 2.3: Audience Selection

**AC-026:** Admin can select "All Students" radio button to broadcast to entire community
**AC-027:** Recipient count displays total active students (e.g., "1,247 active students")
**AC-028:** Admin can select "Select Balagruhas" to open multi-select modal
**AC-029:** Balagruha selector modal shows all Balagruhas with student counts
**AC-030:** Search box filters Balagruha list by name in real-time
**AC-031:** "Select All" checkbox toggles all Balagruhas at once
**AC-032:** Individual checkboxes allow selecting specific Balagruhas
**AC-033:** Selected Balagruhas display as visual chips below selector
**AC-034:** Recipient count updates dynamically based on selections
**AC-035:** Admin can select "Individual Students" for targeted messages (rare use case)
**AC-036:** Individual student selector provides searchable dropdown with fuzzy matching
**AC-037:** Selected students display as removable chips
**AC-038:** System validates at least one recipient selected before allowing send
**AC-039:** Inactive students excluded from "All Students" count
**AC-040:** Admin sees warning if selected Balagruha has zero active students

### AC 2.4: Scheduling

**AC-041:** "Send Immediately" radio button is default selection
**AC-042:** "Schedule for later" radio button reveals date/time picker
**AC-043:** Date picker opens calendar widget showing current month
**AC-044:** Admin can select future date (cannot select past dates)
**AC-045:** Time picker shows hours (12-hour format) and minutes (15-min increments)
**AC-046:** AM/PM selector for time selection
**AC-047:** Timezone displays as "IST" (Indian Standard Time) by default
**AC-048:** Selected datetime displays in human-readable format: "Oct 25, 2025 at 10:00 AM IST"
**AC-049:** System validates scheduled time is at least 5 minutes in future
**AC-050:** Error message displays if past datetime selected: "Please select a future date and time"
**AC-051:** Admin can clear schedule and revert to "Send Immediately"
**AC-052:** Scheduled broadcasts save to database with status "Scheduled"
**AC-053:** Scheduled broadcasts appear in "Scheduled" tab with countdown timer

### AC 2.5: Sending and Delivery

**AC-054:** "Send Broadcast" button validates all required fields before proceeding
**AC-055:** Validation errors display in-line with red text (e.g., "Please record a voice message")
**AC-056:** Confirmation modal appears: "Send broadcast to X students?"
**AC-057:** Confirmation modal shows final summary (audience, type, schedule)
**AC-058:** Admin can cancel from confirmation modal to return to editor
**AC-059:** On confirm, modal shows progress indicator with batch processing status
**AC-060:** Progress displays: "Sending... 500 / 1,247 students (40%)"
**AC-061:** Broadcasts sent in batches of 500 students with 2-second delay between batches
**AC-062:** Each broadcast creates BroadcastRecipient record with status "Pending"
**AC-063:** System creates Notification record for each recipient
**AC-064:** Notification type is "broadcast" with special badge icon (📢)
**AC-065:** WebSocket or polling pushes notification to active student sessions in real-time
**AC-066:** After completion, success message displays: "Broadcast sent successfully to X students"
**AC-067:** Broadcast status changes from "Pending" to "Sent"
**AC-068:** Scheduled broadcasts processed by cron job every minute
**AC-069:** Cron job checks for broadcasts with scheduledFor <= current time and status "Scheduled"
**AC-070:** Cron job updates status to "Sending" then processes batch delivery

### AC 2.6: Broadcast History and Details

**AC-071:** Broadcast Dashboard displays all broadcasts in reverse chronological order
**AC-072:** Tabs filter by status: All, Scheduled, Sent, Drafts
**AC-073:** Each broadcast card shows: Title, Type (Text/Voice), Audience, Status, Date, Read Stats
**AC-074:** Status indicators use color coding: 🟢 Sent, 🔵 Scheduled, 🟡 Draft, 🔴 Failed
**AC-075:** Search box filters broadcasts by subject or content keywords
**AC-076:** Date range filter allows filtering by sent date
**AC-077:** Broadcast cards show read percentage with visual progress bar
**AC-078:** Click "View Details" opens full broadcast details page
**AC-079:** Details page shows complete message content, delivery stats, and recipient breakdown
**AC-080:** Statistics cards display: Total Sent, Delivered, Read, Read Rate %
**AC-081:** Read Receipts section shows breakdown by Balagruha with progress bars
**AC-082:** Each Balagruha row shows: Name, Read Count, Total Count, Percentage, Visual Bar
**AC-083:** "Export CSV" button downloads read receipts with student names and timestamps
**AC-084:** Duplicate button pre-fills composer with same content for quick re-send
**AC-085:** Re-send button allows sending same broadcast to new audience
**AC-086:** Archive button soft-deletes broadcast (retains in database with isArchived flag)

### AC 2.7: Student Notification Display

**AC-087:** Broadcast notifications appear in student's Notification Center dropdown
**AC-088:** Broadcast notifications have special "📢 Broadcast" badge
**AC-089:** Notification card shows sender "From: ISF Admin", subject, and first 50 chars of content
**AC-090:** "Read More" button opens full broadcast modal
**AC-091:** Clicking notification card opens full broadcast modal
**AC-092:** Full broadcast modal displays sender, date, subject, and complete message
**AC-093:** Text broadcasts display in Patrick Hand font with formatting preserved
**AC-094:** Voice broadcasts display audio player with waveform, playback controls
**AC-095:** System tracks read receipt when student opens full broadcast modal
**AC-096:** Read receipt recorded after 3 seconds of viewing (prevents accidental opens)
**AC-097:** Read broadcasts marked with visual indicator (gray dot vs blue dot for unread)
**AC-098:** Student can close modal with "Close" button or X icon
**AC-099:** Broadcast notifications persist in Notification Center for 30 days
**AC-100:** After 30 days, broadcasts auto-archive from student's notification list

### AC 2.8: Error Handling and Edge Cases

**AC-101:** If S3 upload fails, error message displays: "Upload failed. Please try recording again."
**AC-102:** Failed uploads allow retry without losing other form data
**AC-103:** If no students found in selected audience, error displays: "No active students in selection"
**AC-104:** Network errors during send display: "Connection lost. Broadcast saved as draft."
**AC-105:** Duplicate broadcast protection checks for same content to same audience within 1 hour
**AC-106:** Warning displays: "Similar broadcast sent recently. Continue anyway?"
**AC-107:** If cron job fails to process scheduled broadcast, system retries 3 times
**AC-108:** After 3 failed attempts, status changes to "Failed" and admin receives error notification
**AC-109:** Admin can manually retry failed broadcasts from details page
**AC-110:** Voice recording errors (no microphone permission) display actionable error message
**AC-111:** Browser compatibility check warns if MediaRecorder not supported
**AC-112:** iOS Safari uses MediaRecorder polyfill for consistent experience

### AC 2.9: Performance and Optimization

**AC-113:** Broadcast dashboard lazy loads with pagination (20 broadcasts per page)
**AC-114:** "Load More" button fetches next page of broadcasts
**AC-115:** Database queries use indexes on createdAt, scheduledFor, status for fast retrieval
**AC-116:** Recipient counts cached in Redis for large Balagruhas (>100 students)
**AC-117:** Cache invalidates when student count changes (new enrollment, status change)
**AC-118:** WebSocket connections reuse existing connection from Notification Center
**AC-119:** S3 uploads use signed URLs for direct browser-to-S3 upload (no server proxy)
**AC-120:** CDN delivers voice files with edge caching for fast playback
**AC-121:** Waveform rendering uses requestAnimationFrame for 60 FPS smooth animation
**AC-122:** Audio player buffers 30 seconds ahead for uninterrupted playback

### AC 2.10: Accessibility and Usability

**AC-123:** All interactive elements keyboard accessible (Tab navigation)
**AC-124:** Modal dialogs trap focus within modal until closed
**AC-125:** Escape key closes modals
**AC-126:** Screen readers announce modal opening and closing
**AC-127:** Form labels properly associated with inputs for assistive tech
**AC-128:** Error messages announced by screen readers
**AC-129:** Color indicators supplemented with text labels (not color-only)
**AC-130:** Focus indicators visible on all interactive elements
**AC-131:** Minimum touch target size 44x44px for mobile devices
**AC-132:** Patrick Hand font size minimum 16px for readability

---

## 3. Technical Implementation Details

### 3.1 Frontend Components

#### BroadcastDashboard.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { PlusIcon, SearchIcon, FilterIcon } from '@heroicons/react/outline';
import BroadcastCard from './BroadcastCard';
import CreateBroadcastModal from './CreateBroadcastModal';
import { fetchBroadcasts } from '../../services/broadcastService';

const BroadcastDashboard = () => {
  const [broadcasts, setBroadcasts] = useState([]);
  const [filter, setFilter] = useState('all'); // all, scheduled, sent, drafts
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalSent: 0,
    avgReadRate: 0,
    scheduled: 0,
    lastBroadcast: null
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadBroadcasts();
    loadStats();
  }, [filter, searchQuery, page]);

  const loadBroadcasts = async () => {
    const data = await fetchBroadcasts({ filter, search: searchQuery, page, limit: 20 });
    if (page === 1) {
      setBroadcasts(data.broadcasts);
    } else {
      setBroadcasts(prev => [...prev, ...data.broadcasts]);
    }
    setHasMore(data.hasMore);
  };

  const loadStats = async () => {
    // Fetch stats from API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Title Bar */}
      <div className="h-[72px] bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">ISF Playground Admin - Broadcasts</h1>
        {/* User menu */}
      </div>

      {/* Toolbar */}
      <div className="h-[64px] bg-white border-b border-gray-200 px-6 py-3">
        {/* Navigation tabs */}
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Mann ki Baat - Broadcast Management</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold flex items-center gap-2 hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5" />
            Create New Broadcast
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">📢 Total Sent</div>
            <div className="text-3xl font-bold">{stats.totalSent}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">👁️ Avg Read Rate</div>
            <div className="text-3xl font-bold">{stats.avgReadRate}%</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">📅 Scheduled</div>
            <div className="text-3xl font-bold">{stats.scheduled}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">🕐 Last Broadcast</div>
            <div className="text-lg font-bold">{stats.lastBroadcast}</div>
          </div>
        </div>

        {/* Tabs and Search */}
        <div className="bg-white border border-gray-200 rounded-lg px-6 py-3 mb-4 flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('scheduled')}
              className={`px-4 py-2 rounded ${filter === 'scheduled' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600'}`}
            >
              Scheduled
            </button>
            <button
              onClick={() => setFilter('sent')}
              className={`px-4 py-2 rounded ${filter === 'sent' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600'}`}
            >
              Sent
            </button>
            <button
              onClick={() => setFilter('drafts')}
              className={`px-4 py-2 rounded ${filter === 'drafts' ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600'}`}
            >
              Drafts
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2">
              <FilterIcon className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Broadcast List */}
        <div className="space-y-2">
          {broadcasts.map(broadcast => (
            <BroadcastCard key={broadcast._id} broadcast={broadcast} onUpdate={loadBroadcasts} />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-4">
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Load More...
            </button>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <CreateBroadcastModal
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false);
            loadBroadcasts();
          }}
        />
      )}
    </div>
  );
};

export default BroadcastDashboard;
```

**File Path:** `frontend/src/components/admin/broadcasts/BroadcastDashboard.jsx`

---

#### CreateBroadcastModal.jsx
```jsx
import React, { useState, useRef, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import VoiceRecorder from '../../shared/VoiceRecorder';
import BalagruhaSelector from './BalagruhaSelector';
import DateTimePicker from './DateTimePicker';
import EmojiPicker from './EmojiPicker';
import { createBroadcast, saveDraft } from '../../../services/broadcastService';

const CreateBroadcastModal = ({ onClose, onSuccess, existingDraft = null }) => {
  const [messageType, setMessageType] = useState('text'); // 'text' | 'voice'
  const [subject, setSubject] = useState(existingDraft?.subject || '');
  const [textContent, setTextContent] = useState(existingDraft?.content || '');
  const [voiceUrl, setVoiceUrl] = useState(existingDraft?.voiceUrl || null);
  const [voiceDuration, setVoiceDuration] = useState(existingDraft?.voiceDuration || 0);
  const [audienceType, setAudienceType] = useState('all'); // 'all' | 'balagruhas' | 'individual'
  const [selectedBalagruhas, setSelectedBalagruhas] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [recipientCount, setRecipientCount] = useState(0);
  const [scheduleType, setScheduleType] = useState('immediate'); // 'immediate' | 'scheduled'
  const [scheduledDateTime, setScheduledDateTime] = useState(null);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const textAreaRef = useRef(null);
  const autoSaveTimer = useRef(null);

  useEffect(() => {
    // Auto-save draft every 30 seconds
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      if (subject || textContent || voiceUrl) {
        handleSaveDraft();
      }
    }, 30000);

    return () => clearTimeout(autoSaveTimer.current);
  }, [subject, textContent, voiceUrl]);

  useEffect(() => {
    // Calculate recipient count
    if (audienceType === 'all') {
      // Fetch total active student count
      setRecipientCount(1247); // Placeholder
    } else if (audienceType === 'balagruhas') {
      const count = selectedBalagruhas.reduce((sum, bg) => sum + bg.studentCount, 0);
      setRecipientCount(count);
    } else {
      setRecipientCount(selectedStudents.length);
    }
  }, [audienceType, selectedBalagruhas, selectedStudents]);

  const handleSaveDraft = async () => {
    const draftData = {
      subject,
      content: textContent,
      voiceUrl,
      voiceDuration,
      messageType,
      audienceType,
      selectedBalagruhas: selectedBalagruhas.map(bg => bg._id),
      selectedStudents: selectedStudents.map(s => s._id),
      scheduleType,
      scheduledDateTime
    };
    await saveDraft(draftData);
  };

  const handleVoiceRecorded = (url, duration) => {
    setVoiceUrl(url);
    setVoiceDuration(duration);
  };

  const handleSendBroadcast = async () => {
    // Validation
    if (messageType === 'text' && !textContent.trim()) {
      setError('Please enter a message');
      return;
    }
    if (messageType === 'voice' && !voiceUrl) {
      setError('Please record a voice message');
      return;
    }
    if (recipientCount === 0) {
      setError('Please select at least one recipient');
      return;
    }
    if (scheduleType === 'scheduled' && !scheduledDateTime) {
      setError('Please select a date and time');
      return;
    }
    if (scheduleType === 'scheduled' && new Date(scheduledDateTime) <= new Date()) {
      setError('Scheduled time must be in the future');
      return;
    }

    setError('');
    setIsSending(true);

    try {
      const broadcastData = {
        subject: subject || (textContent.substring(0, 30) + '...'),
        content: textContent,
        voiceUrl,
        voiceDuration,
        messageType,
        audienceType,
        selectedBalagruhas: selectedBalagruhas.map(bg => bg._id),
        selectedStudents: selectedStudents.map(s => s._id),
        scheduleType,
        scheduledDateTime,
        recipientCount
      };

      await createBroadcast(broadcastData);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to send broadcast');
    } finally {
      setIsSending(false);
    }
  };

  const insertEmoji = (emoji) => {
    const cursorPos = textAreaRef.current.selectionStart;
    const textBefore = textContent.substring(0, cursorPos);
    const textAfter = textContent.substring(cursorPos);
    setTextContent(textBefore + emoji + textAfter);
    setIsEmojiPickerOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[800px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="h-[60px] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Create New Broadcast</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Type Toggle */}
          <div className="mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setMessageType('text')}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  messageType === 'text'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Text
              </button>
              <button
                onClick={() => setMessageType('voice')}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  messageType === 'voice'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Voice
              </button>
            </div>
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject (Optional)
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value.substring(0, 50))}
              placeholder="Weekly Motivation - Keep Growing!"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              maxLength={50}
            />
          </div>

          {/* Text Mode */}
          {messageType === 'text' && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Message Content
                </label>
                <span className={`text-sm ${textContent.length > 480 ? 'text-red-600' : 'text-gray-500'}`}>
                  {textContent.length} / 500
                </span>
              </div>

              {/* Toolbar */}
              <div className="border border-gray-300 rounded-t-lg px-4 py-2 bg-gray-50 flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded font-bold">B</button>
                <button className="px-3 py-1 border border-gray-300 rounded italic">I</button>
                <button className="px-3 py-1 border border-gray-300 rounded">•</button>
                <button
                  onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                  className="px-3 py-1 border border-gray-300 rounded"
                >
                  😊
                </button>
              </div>

              {/* Text Area */}
              <textarea
                ref={textAreaRef}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value.substring(0, 500))}
                placeholder="Type your message here..."
                className="w-full h-[180px] px-4 py-2 border border-gray-300 border-t-0 rounded-b-lg font-['Patrick_Hand'] text-base resize-none"
                maxLength={500}
              />

              {/* Emoji Picker */}
              {isEmojiPickerOpen && (
                <EmojiPicker onSelect={insertEmoji} onClose={() => setIsEmojiPickerOpen(false)} />
              )}

              {/* Preview */}
              <div className="mt-4 border border-gray-300 rounded-lg bg-gray-50 p-4">
                <div className="text-sm text-gray-600 mb-2">Preview: How students will see this message</div>
                <div className="border border-gray-200 rounded-lg bg-white p-4">
                  <div className="text-sm font-semibold mb-1">📢 Broadcast from ISF Admin</div>
                  <div className="text-base font-bold mb-2">{subject || 'Untitled Broadcast'}</div>
                  <div className="text-sm text-gray-700 font-['Patrick_Hand']">
                    {textContent.substring(0, 100)}
                    {textContent.length > 100 && '...'}
                  </div>
                  {textContent.length > 100 && (
                    <button className="mt-2 text-blue-600 text-sm font-semibold">View Full Message</button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Voice Mode */}
          {messageType === 'voice' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice Recording
              </label>
              <VoiceRecorder
                maxDuration={180}
                onRecorded={handleVoiceRecorded}
                contextType="broadcast"
              />
            </div>
          )}

          {/* Audience Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Send To</label>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={audienceType === 'all'}
                  onChange={() => setAudienceType('all')}
                  className="w-4 h-4"
                />
                <span>All Students</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={audienceType === 'balagruhas'}
                  onChange={() => setAudienceType('balagruhas')}
                  className="w-4 h-4"
                />
                <span>Select Balagruhas</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={audienceType === 'individual'}
                  onChange={() => setAudienceType('individual')}
                  className="w-4 h-4"
                />
                <span>Individual Students</span>
              </label>
            </div>

            {audienceType === 'balagruhas' && (
              <button
                onClick={() => setIsSelectorOpen(true)}
                className="px-4 py-2 border border-gray-300 rounded-lg mb-2"
              >
                {selectedBalagruhas.length === 0
                  ? 'Select Balagruhas...'
                  : `${selectedBalagruhas.length} Balagruhas Selected`}
              </button>
            )}

            <div className="text-sm text-gray-600">
              Recipients: {recipientCount} active students
            </div>
          </div>

          {/* Schedule */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={scheduleType === 'immediate'}
                  onChange={() => setScheduleType('immediate')}
                  className="w-4 h-4"
                />
                <span>Send Immediately</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={scheduleType === 'scheduled'}
                  onChange={() => setScheduleType('scheduled')}
                  className="w-4 h-4"
                />
                <span>Schedule for later</span>
              </label>
            </div>

            {scheduleType === 'scheduled' && (
              <DateTimePicker
                value={scheduledDateTime}
                onChange={setScheduledDateTime}
                minDate={new Date()}
              />
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={handleSaveDraft}
            className="px-6 py-2 border border-gray-300 rounded-md font-semibold hover:bg-gray-50"
          >
            Save as Draft
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSendBroadcast}
              disabled={isSending}
              className="px-8 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSending
                ? 'Sending...'
                : scheduleType === 'scheduled'
                ? 'Schedule Broadcast →'
                : 'Send Broadcast →'}
            </button>
          </div>
        </div>
      </div>

      {/* Balagruha Selector Modal */}
      {isSelectorOpen && (
        <BalagruhaSelector
          selected={selectedBalagruhas}
          onSelect={setSelectedBalagruhas}
          onClose={() => setIsSelectorOpen(false)}
        />
      )}
    </div>
  );
};

export default CreateBroadcastModal;
```

**File Path:** `frontend/src/components/admin/broadcasts/CreateBroadcastModal.jsx`

---

#### BroadcastCard.jsx
```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DotsVerticalIcon } from '@heroicons/react/outline';

const BroadcastCard = ({ broadcast, onUpdate }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    const badges = {
      sent: { emoji: '🟢', text: 'Sent', color: 'text-green-600' },
      scheduled: { emoji: '🔵', text: 'Scheduled', color: 'text-blue-600' },
      draft: { emoji: '🟡', text: 'Draft', color: 'text-yellow-600' },
      failed: { emoji: '🔴', text: 'Failed', color: 'text-red-600' }
    };
    return badges[status] || badges.draft;
  };

  const getMessageTypeIcon = () => {
    return broadcast.messageType === 'voice' ? '🎤' : '📢';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAudienceText = () => {
    if (broadcast.audienceType === 'all') {
      return `All Students (${broadcast.recipientCount} students)`;
    } else if (broadcast.audienceType === 'balagruhas') {
      const bgCount = broadcast.selectedBalagruhas.length;
      return `${bgCount} Balagruha${bgCount > 1 ? 's' : ''} (${broadcast.recipientCount} students)`;
    } else {
      return `${broadcast.recipientCount} individual students`;
    }
  };

  const badge = getStatusBadge(broadcast.status);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{getMessageTypeIcon()}</span>
            <h3 className="text-lg font-semibold">
              {broadcast.subject || 'Untitled Broadcast'}
            </h3>
            <span className={`text-sm font-semibold ${badge.color}`}>
              {badge.emoji} {badge.text}
            </span>
          </div>

          <div className="text-sm text-gray-600 mb-1">
            To: {getAudienceText()}
          </div>

          {broadcast.status === 'sent' && broadcast.deliveryStats && (
            <div className="text-sm text-gray-600">
              Read: {broadcast.deliveryStats.readCount} / {broadcast.deliveryStats.totalCount} (
              {Math.round((broadcast.deliveryStats.readCount / broadcast.deliveryStats.totalCount) * 100)}%)
            </div>
          )}

          {broadcast.messageType === 'voice' && (
            <div className="text-sm text-gray-600">
              Duration: {Math.floor(broadcast.voiceDuration / 60)}:{String(broadcast.voiceDuration % 60).padStart(2, '0')}
            </div>
          )}

          <div className="text-sm text-gray-500 mt-1">
            {formatDate(broadcast.status === 'scheduled' ? broadcast.scheduledFor : broadcast.createdAt)}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/admin/broadcasts/${broadcast._id}`)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-50"
          >
            View Details
          </button>
          <button className="p-2 hover:bg-gray-50 rounded">
            <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BroadcastCard;
```

**File Path:** `frontend/src/components/admin/broadcasts/BroadcastCard.jsx`

---

#### BalagruhaSelector.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { XIcon, SearchIcon } from '@heroicons/react/outline';
import { fetchBalagruhas } from '../../../services/balagruhaService';

const BalagruhaSelector = ({ selected, onSelect, onClose }) => {
  const [balagruhas, setBalagruhas] = useState([]);
  const [filteredBalagruhas, setFilteredBalagruhas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    loadBalagruhas();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = balagruhas.filter(bg =>
        bg.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBalagruhas(filtered);
    } else {
      setFilteredBalagruhas(balagruhas);
    }
  }, [searchQuery, balagruhas]);

  const loadBalagruhas = async () => {
    const data = await fetchBalagruhas();
    setBalagruhas(data);
    setFilteredBalagruhas(data);
  };

  const handleToggle = (balagruha) => {
    const isSelected = selected.some(bg => bg._id === balagruha._id);
    if (isSelected) {
      onSelect(selected.filter(bg => bg._id !== balagruha._id));
    } else {
      onSelect([...selected, balagruha]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      onSelect([]);
    } else {
      onSelect(balagruhas);
    }
    setSelectAll(!selectAll);
  };

  const getTotalStudents = () => {
    return selected.reduce((sum, bg) => sum + bg.studentCount, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[600px] h-[400px] flex flex-col">
        {/* Header */}
        <div className="h-[60px] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Select Balagruhas</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3">
          <div className="relative">
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Balagruhas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Select All */}
        <div className="px-6 py-2 border-b border-gray-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-4 h-4"
            />
            <span className="font-semibold">
              Select All ({balagruhas.length} Balagruhas, {balagruhas.reduce((sum, bg) => sum + bg.studentCount, 0)} students)
            </span>
          </label>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6">
          {filteredBalagruhas.map(balagruha => (
            <label
              key={balagruha._id}
              className="flex items-center justify-between py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.some(bg => bg._id === balagruha._id)}
                  onChange={() => handleToggle(balagruha)}
                  className="w-4 h-4"
                />
                <span>{balagruha.name}</span>
              </div>
              <span className="text-sm text-gray-600">{balagruha.studentCount} students</span>
            </label>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-3">
            Selected: {selected.length} Balagruhas, {getTotalStudents()} students
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onClose()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
            >
              Apply Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalagruhaSelector;
```

**File Path:** `frontend/src/components/admin/broadcasts/BalagruhaSelector.jsx`

---

#### BroadcastDetailsPage.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, DownloadIcon } from '@heroicons/react/outline';
import { fetchBroadcastDetails, exportReadReceipts } from '../../../services/broadcastService';

const BroadcastDetailsPage = () => {
  const { broadcastId } = useParams();
  const navigate = useNavigate();
  const [broadcast, setBroadcast] = useState(null);
  const [readReceiptsByBalagruha, setReadReceiptsByBalagruha] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBroadcastDetails();
  }, [broadcastId]);

  const loadBroadcastDetails = async () => {
    setLoading(true);
    const data = await fetchBroadcastDetails(broadcastId);
    setBroadcast(data.broadcast);
    setReadReceiptsByBalagruha(data.readReceiptsByBalagruha);
    setLoading(false);
  };

  const handleExportCSV = async () => {
    await exportReadReceipts(broadcastId);
  };

  if (loading) return <div>Loading...</div>;
  if (!broadcast) return <div>Broadcast not found</div>;

  const stats = broadcast.deliveryStats || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Title Bar */}
      <div className="h-[72px] bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">ISF Playground Admin - Broadcasts</h1>
      </div>

      {/* Toolbar */}
      <div className="h-[64px] bg-white border-b border-gray-200 px-6 py-3">
        {/* Navigation */}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin/broadcasts')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Broadcasts
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {broadcast.messageType === 'voice' ? '🎤' : '📢'} {broadcast.subject}
              </h2>
              <div className="text-gray-600 mb-1">
                Status: <span className="font-semibold">{broadcast.status}</span>
              </div>
              <div className="text-gray-600 mb-1">
                Sent on: {new Date(broadcast.createdAt).toLocaleString('en-IN')}
              </div>
              <div className="text-gray-600">
                Created by: Admin ({broadcast.createdBy?.name || 'Unknown'})
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Duplicate
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Re-send
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Archive
              </button>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <DownloadIcon className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Delivery Statistics</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-sm text-gray-600 mb-2">👥 Total Sent</div>
              <div className="text-3xl font-bold">{stats.totalCount || 0}</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-sm text-gray-600 mb-2">✅ Delivered</div>
              <div className="text-3xl font-bold">{stats.deliveredCount || 0}</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-sm text-gray-600 mb-2">👁️ Read</div>
              <div className="text-3xl font-bold">{stats.readCount || 0}</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="text-sm text-gray-600 mb-2">📊 Read Rate</div>
              <div className="text-3xl font-bold">
                {stats.totalCount ? Math.round((stats.readCount / stats.totalCount) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Message Content</h3>
          {broadcast.messageType === 'text' ? (
            <div className="border border-gray-200 rounded-lg bg-gray-50 p-6 font-['Patrick_Hand'] text-base whitespace-pre-wrap">
              {broadcast.content}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
              <audio controls src={broadcast.voiceUrl} className="w-full" />
              <div className="text-sm text-gray-600 mt-2">
                Duration: {Math.floor(broadcast.voiceDuration / 60)}:{String(broadcast.voiceDuration % 60).padStart(2, '0')}
              </div>
            </div>
          )}
        </div>

        {/* Recipients */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Recipients</h3>
          <div className="text-gray-700">
            <div className="mb-2">
              <span className="font-semibold">Audience:</span>{' '}
              {broadcast.audienceType === 'all' ? 'All Students' : `${broadcast.selectedBalagruhas.length} Balagruhas`}
            </div>
            <div>
              <span className="font-semibold">Total:</span> {broadcast.recipientCount} active students
              {broadcast.audienceType !== 'all' && ` across ${broadcast.selectedBalagruhas.length} Balagruhas`}
            </div>
          </div>
        </div>

        {/* Read Receipts by Balagruha */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Read Receipts by Balagruha</h3>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
            >
              <DownloadIcon className="w-4 h-4" />
              Export CSV
            </button>
          </div>
          <div className="space-y-2">
            {readReceiptsByBalagruha.map(bg => {
              const percentage = Math.round((bg.readCount / bg.totalCount) * 100);
              return (
                <div key={bg.balagruhaId} className="py-3 border-b border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{bg.balagruhaName}:</span>
                    <span className="text-sm text-gray-600">
                      {bg.readCount}/{bg.totalCount} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadcastDetailsPage;
```

**File Path:** `frontend/src/components/admin/broadcasts/BroadcastDetailsPage.jsx`

---

#### StudentBroadcastModal.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { markBroadcastAsRead } from '../../../services/notificationService';

const StudentBroadcastModal = ({ broadcast, onClose }) => {
  const [hasRecordedRead, setHasRecordedRead] = useState(false);

  useEffect(() => {
    // Track read after 3 seconds
    const timer = setTimeout(() => {
      if (!hasRecordedRead) {
        markBroadcastAsRead(broadcast._id);
        setHasRecordedRead(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [broadcast._id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[700px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="h-[60px] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Broadcast Message</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Sender Info */}
          <div className="mb-2">
            <div className="text-base font-semibold">
              {broadcast.messageType === 'voice' ? '🎤' : '📢'} From: ISF Admin Team
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Sent: {formatDate(broadcast.createdAt)}
          </div>

          {/* Subject */}
          {broadcast.subject && (
            <div className="border-l-4 border-blue-500 bg-blue-50 px-4 py-2 mb-4">
              <div className="text-lg font-bold">{broadcast.subject}</div>
            </div>
          )}

          {/* Message Content */}
          {broadcast.messageType === 'text' ? (
            <div className="border border-gray-200 rounded-lg bg-gray-50 p-6 font-['Patrick_Hand'] text-base whitespace-pre-wrap">
              {broadcast.content}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
              <audio controls src={broadcast.voiceUrl} className="w-full mb-2" />
              <div className="text-sm text-gray-600">
                Duration: {Math.floor(broadcast.voiceDuration / 60)}:{String(broadcast.voiceDuration % 60).padStart(2, '0')}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentBroadcastModal;
```

**File Path:** `frontend/src/components/student/StudentBroadcastModal.jsx`

---

### 3.2 Backend Implementation

#### broadcastController.js
```javascript
const Broadcast = require('../models/Broadcast');
const BroadcastRecipient = require('../models/BroadcastRecipient');
const Notification = require('../models/Notification');
const Student = require('../models/Student');
const Balagruha = require('../models/Balagruha');
const { uploadToS3, getSignedUrl } = require('../services/s3Service');
const { sendWebSocketNotification } = require('../services/websocketService');

// Create new broadcast
exports.createBroadcast = async (req, res) => {
  try {
    const {
      subject,
      content,
      voiceUrl,
      voiceDuration,
      messageType,
      audienceType,
      selectedBalagruhas,
      selectedStudents,
      scheduleType,
      scheduledDateTime,
      recipientCount
    } = req.body;

    const adminId = req.user._id;

    // Create broadcast record
    const broadcast = new Broadcast({
      subject: subject || (content ? content.substring(0, 30) + '...' : 'Voice Broadcast'),
      content,
      voiceUrl,
      voiceDuration,
      messageType,
      audienceType,
      selectedBalagruhas,
      selectedStudents,
      scheduleType,
      scheduledFor: scheduleType === 'scheduled' ? new Date(scheduledDateTime) : null,
      status: scheduleType === 'scheduled' ? 'scheduled' : 'pending',
      recipientCount,
      createdBy: adminId,
      deliveryStats: {
        totalCount: recipientCount,
        deliveredCount: 0,
        readCount: 0
      }
    });

    await broadcast.save();

    // If immediate, trigger delivery
    if (scheduleType === 'immediate') {
      await processBroadcastDelivery(broadcast._id);
    }

    res.status(201).json({
      success: true,
      message: scheduleType === 'scheduled' ? 'Broadcast scheduled successfully' : 'Broadcast sent successfully',
      broadcast
    });
  } catch (error) {
    console.error('Create broadcast error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Process broadcast delivery (batched)
const processBroadcastDelivery = async (broadcastId) => {
  try {
    const broadcast = await Broadcast.findById(broadcastId);
    if (!broadcast) throw new Error('Broadcast not found');

    // Update status to sending
    broadcast.status = 'sending';
    await broadcast.save();

    // Get recipient list
    let recipients = [];
    if (broadcast.audienceType === 'all') {
      recipients = await Student.find({ status: 'active' }).select('_id balagruha');
    } else if (broadcast.audienceType === 'balagruhas') {
      recipients = await Student.find({
        status: 'active',
        balagruha: { $in: broadcast.selectedBalagruhas }
      }).select('_id balagruha');
    } else {
      recipients = await Student.find({
        _id: { $in: broadcast.selectedStudents },
        status: 'active'
      }).select('_id balagruha');
    }

    // Batch processing: 500 students per batch
    const batchSize = 500;
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);

      // Create BroadcastRecipient records
      const recipientRecords = batch.map(student => ({
        broadcastId: broadcast._id,
        studentId: student._id,
        balagruhaId: student.balagruha,
        status: 'sent',
        sentAt: new Date()
      }));
      await BroadcastRecipient.insertMany(recipientRecords);

      // Create Notification records
      const notificationRecords = batch.map(student => ({
        userId: student._id,
        type: 'broadcast',
        title: broadcast.subject,
        message: broadcast.messageType === 'text'
          ? broadcast.content.substring(0, 100) + (broadcast.content.length > 100 ? '...' : '')
          : 'Voice broadcast message',
        metadata: {
          broadcastId: broadcast._id,
          messageType: broadcast.messageType,
          voiceUrl: broadcast.voiceUrl,
          voiceDuration: broadcast.voiceDuration
        },
        isRead: false
      }));
      await Notification.insertMany(notificationRecords);

      // Send WebSocket notifications
      batch.forEach(student => {
        sendWebSocketNotification(student._id, {
          type: 'broadcast',
          broadcast: {
            _id: broadcast._id,
            subject: broadcast.subject,
            content: broadcast.content,
            messageType: broadcast.messageType,
            voiceUrl: broadcast.voiceUrl,
            voiceDuration: broadcast.voiceDuration,
            createdAt: broadcast.createdAt
          }
        });
      });

      // Delay between batches (2 seconds)
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Update broadcast status
    broadcast.status = 'sent';
    broadcast.deliveryStats.deliveredCount = recipients.length;
    await broadcast.save();

  } catch (error) {
    console.error('Broadcast delivery error:', error);
    await Broadcast.findByIdAndUpdate(broadcastId, { status: 'failed' });
  }
};

// Fetch all broadcasts
exports.fetchBroadcasts = async (req, res) => {
  try {
    const { filter, search, page = 1, limit = 20 } = req.query;

    let query = { isArchived: false };

    // Filter by status
    if (filter && filter !== 'all') {
      if (filter === 'drafts') {
        query.status = 'draft';
      } else if (filter === 'scheduled') {
        query.status = 'scheduled';
      } else if (filter === 'sent') {
        query.status = { $in: ['sent', 'sending'] };
      }
    }

    // Search
    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const broadcasts = await Broadcast.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit) + 1)
      .populate('createdBy', 'name email');

    const hasMore = broadcasts.length > limit;
    const results = broadcasts.slice(0, limit);

    res.json({
      success: true,
      broadcasts: results,
      hasMore
    });
  } catch (error) {
    console.error('Fetch broadcasts error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch broadcast details
exports.fetchBroadcastDetails = async (req, res) => {
  try {
    const { broadcastId } = req.params;

    const broadcast = await Broadcast.findById(broadcastId)
      .populate('createdBy', 'name email')
      .populate('selectedBalagruhas', 'name');

    if (!broadcast) {
      return res.status(404).json({ success: false, message: 'Broadcast not found' });
    }

    // Fetch read receipts by Balagruha
    const readReceiptsByBalagruha = await BroadcastRecipient.aggregate([
      { $match: { broadcastId: broadcast._id } },
      {
        $lookup: {
          from: 'balagruhas',
          localField: 'balagruhaId',
          foreignField: '_id',
          as: 'balagruha'
        }
      },
      { $unwind: '$balagruha' },
      {
        $group: {
          _id: '$balagruhaId',
          balagruhaName: { $first: '$balagruha.name' },
          totalCount: { $sum: 1 },
          readCount: {
            $sum: { $cond: [{ $ne: ['$readAt', null] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          balagruhaId: '$_id',
          balagruhaName: 1,
          totalCount: 1,
          readCount: 1,
          _id: 0
        }
      },
      { $sort: { balagruhaName: 1 } }
    ]);

    res.json({
      success: true,
      broadcast,
      readReceiptsByBalagruha
    });
  } catch (error) {
    console.error('Fetch broadcast details error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark broadcast as read (student action)
exports.markBroadcastAsRead = async (req, res) => {
  try {
    const { broadcastId } = req.params;
    const studentId = req.user._id;

    // Update BroadcastRecipient
    const recipient = await BroadcastRecipient.findOneAndUpdate(
      { broadcastId, studentId, readAt: null },
      { readAt: new Date() },
      { new: true }
    );

    if (recipient) {
      // Update broadcast read count
      await Broadcast.findByIdAndUpdate(broadcastId, {
        $inc: { 'deliveryStats.readCount': 1 }
      });
    }

    // Mark notification as read
    await Notification.updateOne(
      { userId: studentId, 'metadata.broadcastId': broadcastId },
      { isRead: true, readAt: new Date() }
    );

    res.json({ success: true, message: 'Broadcast marked as read' });
  } catch (error) {
    console.error('Mark broadcast as read error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export read receipts as CSV
exports.exportReadReceipts = async (req, res) => {
  try {
    const { broadcastId } = req.params;

    const recipients = await BroadcastRecipient.find({ broadcastId })
      .populate('studentId', 'name email')
      .populate('balagruhaId', 'name')
      .sort({ 'balagruhaId.name': 1, 'studentId.name': 1 });

    // Generate CSV
    let csv = 'Student Name,Email,Balagruha,Status,Sent At,Read At\n';
    recipients.forEach(r => {
      csv += `${r.studentId.name},${r.studentId.email},${r.balagruhaId.name},${r.readAt ? 'Read' : 'Unread'},${r.sentAt},${r.readAt || 'N/A'}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=broadcast-receipts-${broadcastId}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Export read receipts error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Save draft
exports.saveDraft = async (req, res) => {
  try {
    const draftData = { ...req.body, status: 'draft', createdBy: req.user._id };

    if (req.body.draftId) {
      const broadcast = await Broadcast.findByIdAndUpdate(req.body.draftId, draftData, { new: true });
      res.json({ success: true, message: 'Draft updated', broadcast });
    } else {
      const broadcast = new Broadcast(draftData);
      await broadcast.save();
      res.status(201).json({ success: true, message: 'Draft saved', broadcast });
    }
  } catch (error) {
    console.error('Save draft error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.processBroadcastDelivery = processBroadcastDelivery;
```

**File Path:** `backend/controllers/broadcastController.js`

---

#### Cron Job for Scheduled Broadcasts

```javascript
// scheduledBroadcastCron.js
const cron = require('node-cron');
const Broadcast = require('../models/Broadcast');
const { processBroadcastDelivery } = require('../controllers/broadcastController');

// Run every minute
const scheduledBroadcastJob = cron.schedule('* * * * *', async () => {
  try {
    console.log('Checking for scheduled broadcasts...');

    const now = new Date();
    const scheduledBroadcasts = await Broadcast.find({
      status: 'scheduled',
      scheduledFor: { $lte: now }
    });

    for (const broadcast of scheduledBroadcasts) {
      console.log(`Processing scheduled broadcast: ${broadcast._id}`);
      await processBroadcastDelivery(broadcast._id);
    }
  } catch (error) {
    console.error('Scheduled broadcast cron error:', error);
  }
});

module.exports = scheduledBroadcastJob;
```

**File Path:** `backend/cron/scheduledBroadcastCron.js`

---

### 3.3 API Endpoints

#### POST /api/v2/broadcasts
Create a new broadcast message.

**Request:**
```json
{
  "subject": "Weekly Motivation - Keep Growing!",
  "content": "Dear Students,\n\nThis week's focus: Never stop learning! 🌟\n\n• Practice daily\n• Help your friends\n• Ask questions\n\nYou are doing amazing work! Keep it up! 💪\n\n- ISF Admin Team",
  "messageType": "text",
  "audienceType": "all",
  "scheduleType": "immediate",
  "recipientCount": 1247
}
```

**Response:**
```json
{
  "success": true,
  "message": "Broadcast sent successfully",
  "broadcast": {
    "_id": "673abc123def456",
    "subject": "Weekly Motivation - Keep Growing!",
    "content": "Dear Students,...",
    "messageType": "text",
    "audienceType": "all",
    "status": "sending",
    "recipientCount": 1247,
    "createdBy": "671xyz789",
    "createdAt": "2025-10-24T16:00:00.000Z"
  }
}
```

---

#### POST /api/v2/broadcasts/schedule
Schedule a broadcast for future delivery.

**Request:**
```json
{
  "subject": "New Course Launch Announcement",
  "voiceUrl": "https://cdn.isfplayground.com/broadcasts/voice-message-673abc.webm",
  "voiceDuration": 135,
  "messageType": "voice",
  "audienceType": "all",
  "scheduleType": "scheduled",
  "scheduledDateTime": "2025-10-25T10:00:00.000Z",
  "recipientCount": 1247
}
```

**Response:**
```json
{
  "success": true,
  "message": "Broadcast scheduled successfully",
  "broadcast": {
    "_id": "673def456ghi789",
    "subject": "New Course Launch Announcement",
    "voiceUrl": "https://cdn.isfplayground.com/broadcasts/voice-message-673abc.webm",
    "voiceDuration": 135,
    "messageType": "voice",
    "status": "scheduled",
    "scheduledFor": "2025-10-25T10:00:00.000Z",
    "recipientCount": 1247
  }
}
```

---

#### GET /api/v2/broadcasts
Fetch all broadcasts with filters.

**Query Parameters:**
- `filter`: all | scheduled | sent | drafts
- `search`: keyword search
- `page`: page number (default: 1)
- `limit`: items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "broadcasts": [
    {
      "_id": "673abc123def456",
      "subject": "Weekly Motivation - Keep Growing!",
      "messageType": "text",
      "audienceType": "all",
      "status": "sent",
      "recipientCount": 1247,
      "deliveryStats": {
        "totalCount": 1247,
        "deliveredCount": 1247,
        "readCount": 978
      },
      "createdAt": "2025-10-21T08:00:00.000Z"
    }
  ],
  "hasMore": true
}
```

---

#### GET /api/v2/broadcasts/:broadcastId
Fetch detailed broadcast information.

**Response:**
```json
{
  "success": true,
  "broadcast": {
    "_id": "673abc123def456",
    "subject": "Weekly Motivation - Keep Growing!",
    "content": "Dear Students,...",
    "messageType": "text",
    "status": "sent",
    "recipientCount": 1247,
    "deliveryStats": {
      "totalCount": 1247,
      "deliveredCount": 1247,
      "readCount": 978
    },
    "createdBy": {
      "_id": "671xyz789",
      "name": "Ravi Kumar",
      "email": "ravi@isfplayground.com"
    },
    "createdAt": "2025-10-21T08:00:00.000Z"
  },
  "readReceiptsByBalagruha": [
    {
      "balagruhaId": "670bg001",
      "balagruhaName": "Balagruha Vijayawada",
      "totalCount": 124,
      "readCount": 97
    },
    {
      "balagruhaId": "670bg002",
      "balagruhaName": "Balagruha Guntur",
      "totalCount": 98,
      "readCount": 98
    }
  ]
}
```

---

#### POST /api/v2/broadcasts/:broadcastId/mark-read
Mark broadcast as read (student endpoint).

**Response:**
```json
{
  "success": true,
  "message": "Broadcast marked as read"
}
```

---

#### GET /api/v2/broadcasts/:broadcastId/export-receipts
Export read receipts as CSV file.

**Response:** CSV file download

---

#### POST /api/v2/broadcasts/drafts
Save broadcast as draft.

**Request:**
```json
{
  "subject": "Draft Message",
  "content": "This is a work in progress...",
  "messageType": "text",
  "audienceType": "all"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Draft saved",
  "broadcast": {
    "_id": "673draft123",
    "subject": "Draft Message",
    "status": "draft",
    "createdAt": "2025-10-24T16:10:00.000Z"
  }
}
```

---

### 3.4 MongoDB Schemas

#### Broadcast Schema
```javascript
const mongoose = require('mongoose');

const BroadcastSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    maxlength: 50
  },
  content: {
    type: String,
    maxlength: 500
  },
  voiceUrl: {
    type: String
  },
  voiceDuration: {
    type: Number // in seconds
  },
  messageType: {
    type: String,
    enum: ['text', 'voice'],
    required: true
  },
  audienceType: {
    type: String,
    enum: ['all', 'balagruhas', 'individual'],
    required: true
  },
  selectedBalagruhas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Balagruha'
  }],
  selectedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  scheduleType: {
    type: String,
    enum: ['immediate', 'scheduled'],
    default: 'immediate'
  },
  scheduledFor: {
    type: Date
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'pending', 'sending', 'sent', 'failed'],
    default: 'draft'
  },
  recipientCount: {
    type: Number,
    required: true
  },
  deliveryStats: {
    totalCount: { type: Number, default: 0 },
    deliveredCount: { type: Number, default: 0 },
    readCount: { type: Number, default: 0 }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
BroadcastSchema.index({ createdAt: -1 });
BroadcastSchema.index({ status: 1, scheduledFor: 1 });
BroadcastSchema.index({ createdBy: 1, createdAt: -1 });
BroadcastSchema.index({ isArchived: 1, status: 1 });

module.exports = mongoose.model('Broadcast', BroadcastSchema);
```

**File Path:** `backend/models/Broadcast.js`

---

#### BroadcastRecipient Schema
```javascript
const mongoose = require('mongoose');

const BroadcastRecipientSchema = new mongoose.Schema({
  broadcastId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Broadcast',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  balagruhaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Balagruha',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  },
  sentAt: {
    type: Date
  },
  readAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
BroadcastRecipientSchema.index({ broadcastId: 1, studentId: 1 });
BroadcastRecipientSchema.index({ broadcastId: 1, balagruhaId: 1 });
BroadcastRecipientSchema.index({ studentId: 1, readAt: 1 });

module.exports = mongoose.model('BroadcastRecipient', BroadcastRecipientSchema);
```

**File Path:** `backend/models/BroadcastRecipient.js`

---

### 3.5 Routes

```javascript
// routes/v2/broadcast.js
const express = require('express');
const router = express.Router();
const broadcastController = require('../../controllers/broadcastController');
const { protect, restrictTo } = require('../../middleware/auth');

// Admin-only routes
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', broadcastController.createBroadcast);
router.post('/schedule', broadcastController.createBroadcast);
router.get('/', broadcastController.fetchBroadcasts);
router.get('/:broadcastId', broadcastController.fetchBroadcastDetails);
router.get('/:broadcastId/export-receipts', broadcastController.exportReadReceipts);
router.post('/drafts', broadcastController.saveDraft);

// Student routes
router.post('/:broadcastId/mark-read', protect, broadcastController.markBroadcastAsRead);

module.exports = router;
```

**File Path:** `backend/routes/v2/broadcast.js`

---

## 4. Task Breakdown

### Phase 1: Backend Foundation (4-5 hours)

**Task 4.1.1:** Create Broadcast and BroadcastRecipient MongoDB schemas
- Define Broadcast schema with all fields (subject, content, voiceUrl, messageType, audienceType, status, deliveryStats)
- Define BroadcastRecipient schema for tracking individual deliveries
- Add indexes for performance (createdAt, status, scheduledFor, broadcastId+studentId)
- Write schema validation
- **Estimated Time:** 45 minutes

**Task 4.1.2:** Implement broadcast controller with create/send logic
- Create `broadcastController.js` with createBroadcast endpoint
- Implement processBroadcastDelivery function with batch processing (500 per batch)
- Add 2-second delay between batches
- Create BroadcastRecipient records for each student
- Create Notification records for each recipient
- Integrate WebSocket notification push
- **Estimated Time:** 2 hours

**Task 4.1.3:** Implement scheduled broadcast cron job
- Create `scheduledBroadcastCron.js` with node-cron
- Run every minute to check for broadcasts with scheduledFor <= now
- Call processBroadcastDelivery for each scheduled broadcast
- Add error handling and retry logic (3 attempts)
- Update status to 'failed' after max retries
- **Estimated Time:** 1 hour

**Task 4.1.4:** Implement broadcast fetch and details endpoints
- Create fetchBroadcasts endpoint with filters (all, scheduled, sent, drafts)
- Implement search functionality (subject, content)
- Add pagination (20 broadcasts per page)
- Create fetchBroadcastDetails endpoint
- Implement read receipts aggregation by Balagruha
- **Estimated Time:** 1.5 hours

**Task 4.1.5:** Create routes and integrate with server
- Create `routes/v2/broadcast.js` with all endpoints
- Add RBAC middleware (admin-only for creation, student for mark-read)
- Register routes in server.js
- Start cron job on server startup
- Test all endpoints with Postman
- **Estimated Time:** 30 minutes

---

### Phase 2: Admin Dashboard UI (3-4 hours)

**Task 4.2.1:** Create BroadcastDashboard component
- Build main layout with title bar, toolbar, page header
- Implement stats cards (Total Sent, Avg Read Rate, Scheduled, Last Broadcast)
- Create tab filters (All, Scheduled, Sent, Drafts)
- Add search input with real-time filtering
- Implement pagination with "Load More" button
- **Estimated Time:** 1.5 hours

**Task 4.2.2:** Create BroadcastCard component
- Display broadcast title, type icon (📢 text, 🎤 voice), status badge
- Show audience info (All Students, X Balagruhas, etc.)
- Display read statistics with percentage
- Add action buttons (View Details, Duplicate, menu)
- Implement status color coding (🟢 Sent, 🔵 Scheduled, 🟡 Draft, 🔴 Failed)
- **Estimated Time:** 1 hour

**Task 4.2.3:** Create BroadcastDetailsPage component
- Build full-page layout with back navigation
- Display broadcast header with all metadata
- Show delivery statistics cards (Total Sent, Delivered, Read, Read Rate)
- Render message content (text with Patrick Hand font or audio player)
- Display recipients info
- Create read receipts by Balagruha section with progress bars
- Add export CSV functionality
- **Estimated Time:** 1.5 hours

---

### Phase 3: Message Composer Modal (4-5 hours)

**Task 4.3.1:** Create CreateBroadcastModal component structure
- Build modal overlay with proper z-index
- Create header with close button and title
- Implement message type toggle (Text / Voice)
- Add subject input field (optional, max 50 chars)
- Set up state management for all form fields
- Add error handling state
- **Estimated Time:** 1 hour

**Task 4.3.2:** Implement Text Mode editor
- Create textarea with Patrick Hand font (max 500 chars)
- Build formatting toolbar (Bold, Italic, Bullet, Emoji)
- Add character counter with red warning at >480 chars
- Integrate emoji picker component
- Implement preview pane with real-time updates
- **Estimated Time:** 1.5 hours

**Task 4.3.3:** Implement Voice Mode recording
- Integrate VoiceRecorder component from Epic 05 Story 02
- Set max duration to 180 seconds (3 minutes)
- Display timer during recording
- Show audio player after recording complete
- Add Re-record and Delete controls
- Handle S3 upload with progress indicator
- **Estimated Time:** 1 hour

**Task 4.3.4:** Create audience selector
- Implement radio group (All Students, Select Balagruhas, Individual Students)
- Build BalagruhaSelector modal with search
- Add multi-select checkboxes for Balagruhas
- Display selected items as chips
- Calculate and display recipient count dynamically
- Validate at least one recipient selected
- **Estimated Time:** 1.5 hours

**Task 4.3.5:** Implement scheduling controls
- Add radio group (Send Immediately, Schedule for later)
- Integrate DateTimePicker component
- Validate scheduled time is in future (min 5 minutes)
- Display selected datetime in human-readable format
- Add auto-save draft every 30 seconds
- Implement "Save as Draft" button
- **Estimated Time:** 1 hour

---

### Phase 4: Supporting Components (2-3 hours)

**Task 4.4.1:** Create BalagruhaSelector modal
- Build 600x400 modal with search input
- Fetch all Balagruhas with student counts
- Implement real-time search filtering
- Add "Select All" checkbox functionality
- Display selected count in footer
- Handle Apply/Cancel actions
- **Estimated Time:** 1 hour

**Task 4.4.2:** Create DateTimePicker component
- Build calendar widget showing current month
- Implement date selection (disable past dates)
- Add time picker with hour/minute dropdowns (15-min increments)
- Include AM/PM selector
- Display timezone (IST)
- Format output as ISO string
- **Estimated Time:** 1 hour

**Task 4.4.3:** Create EmojiPicker component
- Build emoji grid with categories (Smileys, Symbols, Flags)
- Implement category tabs
- Add click handler to insert emoji at cursor position
- Style with proper spacing and hover effects
- Make accessible with keyboard navigation
- **Estimated Time:** 45 minutes

---

### Phase 5: Student Broadcast View (2-3 hours)

**Task 4.5.1:** Create StudentBroadcastModal component
- Build 700px modal for full broadcast display
- Display sender info (ISF Admin Team) and sent date
- Render subject with special styling (blue left border)
- Show text content with Patrick Hand font
- For voice broadcasts, display audio player with controls
- Implement 3-second timer for read receipt tracking
- **Estimated Time:** 1.5 hours

**Task 4.5.2:** Integrate with Notification Center
- Add special "Broadcast" badge to notification cards
- Display first 50 chars with "Read More" button
- Handle click to open StudentBroadcastModal
- Call markBroadcastAsRead API after 3 seconds
- Update notification as read in UI
- Test WebSocket real-time delivery
- **Estimated Time:** 1 hour

---

### Phase 6: Testing, Polish, and Documentation (2-3 hours)

**Task 4.6.1:** End-to-end testing
- Test creating text broadcast to all students
- Test creating voice broadcast to specific Balagruhas
- Test scheduling broadcast for future datetime
- Verify cron job processes scheduled broadcasts correctly
- Test batch delivery with large recipient counts
- Verify WebSocket notifications arrive in real-time
- Test read receipt tracking accuracy
- **Estimated Time:** 1.5 hours

**Task 4.6.2:** Error handling and edge cases
- Test network failures during S3 upload
- Verify retry logic for failed deliveries
- Test duplicate broadcast protection
- Handle empty recipient selections gracefully
- Test scheduling in past datetime (should error)
- Verify voice recording errors display helpful messages
- **Estimated Time:** 1 hour

**Task 4.6.3:** Performance optimization and documentation
- Verify database indexes created correctly
- Test pagination performance with 100+ broadcasts
- Optimize read receipt aggregation query
- Measure and optimize batch processing speed
- Add code comments to complex logic
- Update API documentation with all endpoints
- **Estimated Time:** 45 minutes

---

## 5. Definition of Done

### 5.1 Functional Completeness
- [ ] Admin can create text broadcast with rich formatting (bold, italic, bullets, emojis)
- [ ] Admin can record voice broadcast up to 3 minutes with waveform visualization
- [ ] Admin can select audience: All Students, specific Balagruhas, or individual students
- [ ] Admin can send immediately or schedule for future date/time
- [ ] Broadcast Dashboard displays all broadcasts with filters (All, Scheduled, Sent, Drafts)
- [ ] Broadcast Details page shows complete delivery statistics and read receipts by Balagruha
- [ ] Students receive broadcast notifications in Notification Center with special badge
- [ ] Students can view full broadcast message in modal (text or audio player)
- [ ] Read receipts tracked after 3 seconds of viewing
- [ ] Scheduled broadcasts processed by cron job every minute
- [ ] Batch processing sends to 500 students per batch with 2-second delays
- [ ] Drafts auto-save every 30 seconds
- [ ] Admin can export read receipts as CSV

### 5.2 Technical Requirements
- [ ] MongoDB schemas created: Broadcast, BroadcastRecipient
- [ ] All API endpoints implemented and tested (8 endpoints)
- [ ] Cron job runs reliably with error handling and retries
- [ ] WebSocket notifications pushed in real-time
- [ ] S3 upload for voice broadcasts with signed URLs
- [ ] Database indexes optimize query performance
- [ ] Pagination implemented for broadcast list (20 per page)
- [ ] React components follow functional component patterns with hooks
- [ ] TailwindCSS classes used exclusively for styling
- [ ] VoiceRecorder component reused from Epic 05 Story 02

### 5.3 UI/UX Requirements
- [ ] Broadcast Dashboard matches visual design with exact measurements
- [ ] Message composer modal 800px width with all sections
- [ ] Status badges color-coded correctly (🟢 Sent, 🔵 Scheduled, 🟡 Draft, 🔴 Failed)
- [ ] Character counter turns red when >480 characters
- [ ] Preview pane updates in real-time as admin types
- [ ] Balagruha selector modal 600x400 with search and multi-select
- [ ] Student broadcast modal displays content in Patrick Hand font
- [ ] Audio player has full controls (play/pause, seek, speed: 1x/1.5x/2x)
- [ ] Progress indicators show during sending/uploading
- [ ] All interactive elements have hover states
- [ ] Keyboard navigation works for all modals (Tab, Escape)

### 5.4 Performance
- [ ] Broadcast list loads in <1 second for 100+ broadcasts
- [ ] Batch processing completes 1,247 recipients in <2 minutes
- [ ] Database queries execute in <200ms with proper indexes
- [ ] WebSocket notifications arrive within 1 second
- [ ] S3 upload progress updates smoothly
- [ ] Pagination lazy-loads efficiently
- [ ] Read receipt aggregation completes in <500ms
- [ ] Cron job checks run without blocking server

### 5.5 Error Handling
- [ ] S3 upload failures display retry option
- [ ] Network errors save broadcast as draft automatically
- [ ] Empty recipient selection shows validation error
- [ ] Past scheduling datetime displays error message
- [ ] Voice recording failures show actionable error (check microphone permission)
- [ ] Duplicate broadcast protection warns admin
- [ ] Failed deliveries retry 3 times before marking as failed
- [ ] Cron job errors logged but don't crash server

### 5.6 Accessibility
- [ ] All interactive elements keyboard accessible (Tab order logical)
- [ ] Modal dialogs trap focus correctly
- [ ] Escape key closes modals
- [ ] Screen readers announce modal state changes
- [ ] Form labels properly associated with inputs
- [ ] Error messages announced by screen readers
- [ ] Color indicators supplemented with text (not color-only)
- [ ] Minimum touch target size 44x44px
- [ ] Patrick Hand font size minimum 16px for readability

### 5.7 Code Quality
- [ ] All components have clear, descriptive names
- [ ] Code follows project conventions (file structure, naming)
- [ ] Complex logic documented with comments
- [ ] No console errors or warnings in browser
- [ ] API endpoints follow RESTful conventions
- [ ] MongoDB queries optimized with indexes
- [ ] Error handling consistent across all endpoints
- [ ] Code reviewed and approved by team

### 5.8 Testing
- [ ] All API endpoints tested with Postman
- [ ] Frontend components tested in browser
- [ ] Batch processing tested with large recipient counts
- [ ] Scheduled broadcast cron tested with real datetime
- [ ] WebSocket notifications tested across multiple browsers
- [ ] Read receipt tracking accuracy verified
- [ ] S3 upload tested with various audio file sizes
- [ ] Error scenarios tested (network failures, validation errors)

### 5.9 Documentation
- [ ] API documentation updated with all endpoints
- [ ] MongoDB schemas documented with field descriptions
- [ ] Component file paths listed in story document
- [ ] Code comments explain complex logic
- [ ] README updated with new routes and cron job
- [ ] Deployment notes include cron job setup instructions

---

## 6. File Paths Summary

### Frontend Files:
- `frontend/src/components/admin/broadcasts/BroadcastDashboard.jsx`
- `frontend/src/components/admin/broadcasts/CreateBroadcastModal.jsx`
- `frontend/src/components/admin/broadcasts/BroadcastCard.jsx`
- `frontend/src/components/admin/broadcasts/BalagruhaSelector.jsx`
- `frontend/src/components/admin/broadcasts/BroadcastDetailsPage.jsx`
- `frontend/src/components/admin/broadcasts/DateTimePicker.jsx`
- `frontend/src/components/admin/broadcasts/EmojiPicker.jsx`
- `frontend/src/components/student/StudentBroadcastModal.jsx`
- `frontend/src/services/broadcastService.js`

### Backend Files:
- `backend/models/Broadcast.js`
- `backend/models/BroadcastRecipient.js`
- `backend/controllers/broadcastController.js`
- `backend/routes/v2/broadcast.js`
- `backend/cron/scheduledBroadcastCron.js`

### Shared/Reused:
- `frontend/src/components/shared/VoiceRecorder.jsx` (from Epic 05 Story 02)
- `backend/services/websocketService.js` (from Epic 05 Story 01)
- `backend/services/s3Service.js` (existing)

---

## 7. Notes for Developers

### Integration Points:
1. **Notification Center**: Broadcasts appear as special notification type with "📢 Broadcast" badge
2. **Voice Recording**: Reuse VoiceRecorder component from Epic 05 Story 02 with maxDuration={180}
3. **WebSocket**: Use existing WebSocket infrastructure from Epic 05 Story 01 for real-time delivery
4. **S3 Storage**: Voice broadcasts stored in `/broadcasts/` folder with CDN delivery

### Performance Considerations:
1. **Batch Processing**: Mandatory 2-second delay between 500-student batches prevents server overload
2. **Database Indexes**: Critical for fast broadcast list queries and read receipt aggregation
3. **Caching**: Consider Redis cache for recipient counts of large Balagruhas (>100 students)
4. **WebSocket Optimization**: Reuse existing connections, don't create new connection per broadcast

### Security Considerations:
1. **RBAC**: Only Admins can create/send broadcasts, verified via middleware
2. **Input Validation**: Sanitize text content to prevent XSS attacks
3. **S3 Signed URLs**: Use 5-minute expiry for voice upload URLs
4. **Rate Limiting**: Consider rate limit on broadcast creation (e.g., max 10 per hour per admin)

### Testing Tips:
1. **Scheduled Broadcasts**: Set cron to run every 10 seconds during development for faster testing
2. **Batch Processing**: Test with small batches (10 students) first before scaling to 500
3. **WebSocket**: Use browser DevTools Network tab to monitor WebSocket messages
4. **Read Receipts**: Use setTimeout to simulate 3-second read tracking delay

### Future Enhancements (Out of Scope for Sprint 2):
1. Recurring broadcasts (e.g., every Monday at 8 AM)
2. Broadcast templates library
3. A/B testing for broadcast content
4. Analytics dashboard showing engagement trends over time
5. Push notifications for mobile app (when mobile app developed)
6. Broadcast approval workflow for multi-admin environments

---

**Story Complete. Ready for Development.**


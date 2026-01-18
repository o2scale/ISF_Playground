# Epic 05 Story 05: Playground Manager Role & Error Handling System

**Last Updated:** 2025-10-24 17:00:08 (via `date '+%Y-%m-%d %H:%M:%S'`)

---

## Story Overview

**As a** Playground Manager (PM)
**I want to** receive all application errors as assigned tasks and provide child-friendly error messages to users
**So that** technical issues are quickly identified and resolved, while users experience a smooth, non-technical error experience

---

## Business Context

The Playground Manager (PM) role is a critical technical operations role responsible for:

1. **System Health Monitoring**: Receive all application errors in real-time
2. **Issue Triage**: Prioritize and categorize errors by severity
3. **User Experience**: Ensure students see friendly, age-appropriate error messages instead of technical jargon
4. **Quick Resolution**: Track error resolution with SLA timers
5. **Pattern Detection**: Identify recurring issues for permanent fixes

**Why This Matters:**
- **For Students**: Errors like "Cannot read property 'map' of undefined" are confusing and scary. Instead, they see "Oops! Something went wrong. We're on it! 🛠️"
- **For PMs**: Centralized error tracking means faster identification and resolution
- **For Admins**: System health dashboard shows application stability at a glance
- **For Developers**: Error aggregation and logging helps identify bugs to fix

**User Experience Flow:**
```
Student encounters error
    ↓
System logs error with full technical details
    ↓
PM receives task notification
    ↓
Student sees friendly message: "Oops! We're fixing this. Try again in a moment!"
    ↓
PM investigates and resolves
    ↓
Student continues learning seamlessly
```

---

## Dependencies

### Sprint 1.1 Dependencies:
- **RBAC System**: PM role with full system access permissions

### Sprint 2 Dependencies:
- **Epic 05 Story 01**: In-App Notification Center - PM receives error notifications
- **Epic 04 Story 03**: SLA Task Management - Error tasks follow SLA timers

---

## User Roles Involved

- **Playground Manager (PM)**: Receives errors, investigates, resolves issues
- **Student**: Sees child-friendly error messages
- **Coach**: Sees simplified error messages
- **Amma**: Sees simplified error messages
- **Admin**: Sees detailed error messages (can handle technical info)
- **System**: Captures errors, creates PM tasks, displays appropriate messages

---

## 1. Feature Requirements

### 1.1 Core Functionality

**Global Error Handler:**
- Capture all unhandled JavaScript errors (frontend)
- Capture all uncaught promise rejections
- Capture all 500-series server errors (backend)
- Capture React error boundary errors
- Log full error details: stack trace, user context, timestamp, affected route
- De-duplicate similar errors within 5-minute window

**Error Categorization:**
- **Critical (P0)**: System-wide failures, database connection lost, authentication broken
- **High (P1)**: Feature completely broken, payment failures, data loss
- **Medium (P2)**: Feature partially broken, UI glitches, slow performance
- **Low (P3)**: Minor UI issues, cosmetic bugs, non-critical warnings

**PM Task Creation:**
- Automatically create PM task for each unique error
- Task includes: Error message, stack trace, affected user, timestamp, reproduction steps
- Assign to on-duty PM (round-robin if multiple PMs)
- SLA timer starts immediately (P0: 1 hour, P1: 4 hours, P2: 24 hours, P3: 72 hours)
- Notification sent to PM via Notification Center

**Child-Friendly Error Messages:**
- Students/Coaches/Ammas see age-appropriate messages
- Messages avoid technical jargon
- Include friendly emojis and reassurance
- Provide actionable next steps when possible
- Examples:
  - "Oops! Something went wrong. We're fixing it! Try again in a moment. 🛠️"
  - "Hmm, that didn't work. Our team is on it! Please try refreshing. 🔄"
  - "We hit a small bump! Don't worry, we're making it better. Come back soon! 🌟"

**Admin Error Messages:**
- Admins see detailed technical messages (they can handle it)
- Include error code, affected component, suggested fix
- Link to error details page
- Example: "Error 500: Database query timeout in CourseService.fetchAssignments(). Check DB connection."

**Error Aggregation:**
- Group similar errors together (same stack trace = same error)
- Show occurrence count per error
- Display first occurrence and most recent occurrence
- Track affected users count
- Calculate error rate per hour/day

**PM Dashboard:**
- See all open error tasks
- Filter by priority, status, date
- Quick actions: Investigate, Resolve, Escalate
- Error trends graph (errors per hour/day)
- Top 10 most frequent errors
- Resolution time analytics

### 1.2 UI/UX Requirements

**Student Error Display:**
- Full-screen friendly error message (replaces error boundary fallback)
- Large emoji (😊, 🛠️, 🌟)
- Simple message in Patrick Hand font
- "Try Again" button prominently displayed
- "Go Home" button as alternative action
- Optional: Report button (sends additional context to PM)

**PM Task Card:**
- Red border for Critical errors
- Orange border for High priority
- Yellow border for Medium priority
- Gray border for Low priority
- Shows: Error type, affected user, timestamp, occurrence count
- Expandable to show full stack trace
- Quick action buttons: Mark Resolved, Investigate, Escalate

**PM Dashboard:**
- Real-time error count badges
- Color-coded priority indicators
- Timeline view of recent errors
- Filterable error list
- Search by error message or user
- Export error log as CSV

**Error Details Modal:**
- Full error message and stack trace
- User context: User ID, role, route, browser, OS
- Reproduction steps (auto-captured from user flow)
- Related errors (similar stack traces)
- Resolution notes field
- Assign to developer dropdown
- Close error button

### 1.3 Technical Requirements

**Frontend Error Capture:**
- Global error handler: `window.addEventListener('error')`
- Promise rejection handler: `window.addEventListener('unhandledrejection')`
- React Error Boundary wrapper around app root
- Axios interceptor for API errors
- Console.error override to capture manual logs

**Backend Error Capture:**
- Express error middleware (catch all routes)
- Uncaught exception handler
- Unhandled rejection handler
- MongoDB connection error handler
- Structured error logging with Winston

**Error Storage:**
- MongoDB collection: ErrorLogs
- Fields: errorMessage, stackTrace, errorCode, priority, userId, userRole, route, timestamp, occurrenceCount, status, assignedTo, resolvedAt, resolutionNotes
- TTL index: Auto-delete errors older than 90 days

**Error Notification:**
- Create PM task immediately upon error
- Send push notification to PM
- Update PM dashboard in real-time via WebSocket
- Email alert for Critical (P0) errors

**Performance:**
- Error capture should not impact application performance
- Batch error logs every 5 seconds (don't send individually)
- Client-side error queue with retry logic
- Maximum 100 errors per user per hour (prevent spam from broken sessions)

---

## 1.5 Visual Layout Diagrams

### Diagram 1: Student Error Display (Full Screen - 1366x768)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                   │
│                                                                                                   │
│                                                                                                   │
│                                                                                                   │
│                                              😊                                                  │ 150px Emoji
│                                                                                                   │
│                                                                                                   │
│                                                                                                   │
│                                    Oops! Something went wrong                                    │ 60px Title
│                                                                                                   │
│                                                                                                   │
│                                We're working on fixing this right now.                           │
│                                     Don't worry, we'll have it                                   │ 80px
│                                    sorted out in just a moment! 🛠️                              │ Message
│                                                                                                   │
│                                                                                                   │
│                                                                                                   │
│                                                                                                   │
│                                  ┌─────────────────────────────┐                                │
│                                  │       Try Again  🔄         │                                │ 60px
│                                  └─────────────────────────────┘                                │ Button
│                                                                                                   │
│                                  ┌─────────────────────────────┐                                │
│                                  │         Go Home  🏠         │                                │ 60px
│                                  └─────────────────────────────┘                                │ Button
│                                                                                                   │
│                                                                                                   │
│                                                                                                   │
│                              Need help? Contact your coach!                                      │ 30px
│                                                                                                   │
│                                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                                                         Total: 768px
```

**Component Measurements:**
| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| Container | 100vw | 100vh | p-12 | - | - | - |
| Emoji | auto | 150px | - | mb-8 | - | text-9xl |
| Title | auto | 60px | - | mb-6 | - | text-4xl font-bold Patrick Hand |
| Message | 600px (max) | 80px | - | mb-12 mx-auto | - | text-xl Patrick Hand text-center |
| Try Again Button | 300px | 60px | px-8 py-4 | mb-4 mx-auto | rounded-xl bg-blue-600 text-white | text-xl font-bold |
| Go Home Button | 300px | 60px | px-8 py-4 | mb-8 mx-auto | rounded-xl border-2 border-gray-300 | text-xl font-bold |
| Help Text | auto | 30px | - | mt-auto | - | text-base text-gray-500 |

---

### Diagram 2: PM Dashboard - Error Task List (1366x768)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ISF Playground PM - Error Management                                 [🔔 12] [PM] [Logout]     │ 72px Title Bar
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│  [Dashboard] [Error Tasks] [System Health] [Reports] [Settings]                                 │ 64px Toolbar
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  Error Management Dashboard                                             [Export Errors]  │   │ 80px Header
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│  │ 🔴 Critical (P0) │  │ 🟠 High (P1)     │  │ 🟡 Medium (P2)   │  │ ⚪ Low (P3)      │       │
│  │                  │  │                  │  │                  │  │                  │       │
│  │        2         │  │        8         │  │       15         │  │       23         │       │ 120px Stats
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘       │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  [All] [Critical] [High] [Medium] [Low] [Resolved]        📅 Today   🔍 Search...       │   │ 60px Filters
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │ 🔴 CRITICAL │ Database Connection Failed                          ⏰ 45 min ago  [3x]   │   │
│  │ Route: /api/v2/courses/fetch                                                             │   │
│  │ User: Priya Kumar (Student) │ Browser: Chrome 118 │ OS: Windows 11                      │   │ 120px
│  │ Error: MongoNetworkError: connect ETIMEDOUT 192.168.1.100:27017                         │   │ Task Card
│  │ [View Details] [Mark Resolved] [Escalate]                           ⏱️ SLA: 15 min left │   │ (Collapsed)
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │ 🟠 HIGH     │ API Endpoint Timeout                                ⏰ 2 hours ago [12x]  │   │
│  │ Route: /api/v2/students/attendance                                                       │   │
│  │ User: Multiple users (8 students) │ Browser: Various │ OS: Various                      │   │ 120px
│  │ Error: AxiosError: timeout of 30000ms exceeded                                           │   │ Task Card
│  │ [View Details] [Mark Resolved] [Escalate]                         ⏱️ SLA: 2 hours left  │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │ 🟡 MEDIUM   │ Image Upload Failed                                 ⏰ 5 hours ago  [1x]   │   │
│  │ Route: /api/v2/courses/content/upload                                                    │   │
│  │ User: Ravi Singh (Admin) │ Browser: Firefox 119 │ OS: macOS 14                          │   │ 120px
│  │ Error: MulterError: File too large (max 5MB)                                             │   │ Task Card
│  │ [View Details] [Mark Resolved] [Escalate]                        ⏱️ SLA: 19 hours left  │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  [Load More...]                                                                                  │
│                                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Component Measurements:**
| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| Title Bar | 100% | 72px | px-6 py-4 | - | border-b gray-200 | text-xl font-bold |
| Toolbar | 100% | 64px | px-6 py-3 | - | border-b gray-200 | text-base |
| Stats Card | 25% (min 280px) | 120px | p-6 | mx-2 my-4 | border gray-200 rounded-lg | text-3xl font-bold |
| Filter Bar | calc(100%-48px) | 60px | px-6 py-3 | mx-6 my-4 | border gray-200 rounded-lg bg-white | text-base |
| Task Card | calc(100%-48px) | 120px | p-6 | mx-6 my-2 | border-l-4 rounded-lg shadow-sm | text-base |
| Critical Card | - | - | - | - | border-l-red-500 bg-red-50 | - |
| High Card | - | - | - | - | border-l-orange-500 bg-orange-50 | - |
| Medium Card | - | - | - | - | border-l-yellow-500 bg-yellow-50 | - |
| Action Button | auto | 36px | px-4 py-2 | mx-1 | rounded border gray-300 | text-sm font-semibold |

---

### Diagram 3: Error Details Modal (900x700 overlay)

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│  Error Details                                                        [✕ Close]    │ 60px Header
├───────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  🔴 CRITICAL - Database Connection Failed                                          │ 50px Title
│  First Occurred: Oct 24, 2025 2:30 PM │ Occurrences: 3 times                      │ 40px Meta
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │ Error Information                                                            │ │ 40px
│  ├─────────────────────────────────────────────────────────────────────────────┤ │ Section
│  │ Error Code: MONGO_NETWORK_ERROR                                             │ │ Header
│  │ Route: /api/v2/courses/fetch                                                │ │
│  │ Method: GET                                                                  │ │ 120px
│  │ Status Code: 500                                                             │ │ Info
│  │ Priority: P0 (Critical)                                                      │ │ Section
│  │ SLA Timer: 15 minutes remaining                                             │ │
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │ Affected User                                                                │ │ 40px
│  ├─────────────────────────────────────────────────────────────────────────────┤ │ Section
│  │ Name: Priya Kumar                                                            │ │ Header
│  │ Role: Student                                                                │ │
│  │ User ID: 671student123                                                       │ │ 100px
│  │ Browser: Chrome 118.0.0 │ OS: Windows 11                                    │ │ User
│  │ IP Address: 192.168.1.55                                                     │ │ Section
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │ Stack Trace                                                    [Copy] [▼]    │ │ 40px
│  ├─────────────────────────────────────────────────────────────────────────────┤ │ Section
│  │ MongoNetworkError: connect ETIMEDOUT 192.168.1.100:27017                   │ │ Header
│  │   at Connection.connect (/app/node_modules/mongodb/lib/core/connection.js) │ │
│  │   at /app/node_modules/mongodb/lib/core/connection_pool.js:350:35          │ │
│  │   at /app/backend/services/courseService.js:45:12                          │ │ 180px
│  │   at CourseController.fetchCourses (/app/backend/controllers/course.js:87) │ │ Stack
│  │   at Layer.handle [as handle_request] (/app/node_modules/express/lib...)  │ │ Trace
│  │   ...                                                                        │ │ (Scrollable)
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐ │
│  │ Resolution Notes                                                             │ │ 40px
│  ├─────────────────────────────────────────────────────────────────────────────┤ │ Section
│  │ ┌─────────────────────────────────────────────────────────────────────────┐│ │ Header
│  │ │ Database server was restarted. Connection pool restored.                ││ │
│  │ │ Root cause: Memory leak in MongoDB 5.0.3. Upgraded to 5.0.4.           ││ │ 100px
│  │ │ Verified: All connections stable for 2 hours post-fix.                 ││ │ Notes
│  │ └─────────────────────────────────────────────────────────────────────────┘│ │ Textarea
│  └─────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│  [Assign to Developer ▼]                       [Close]  [Mark as Resolved]         │ 60px Footer
└───────────────────────────────────────────────────────────────────────────────────┘
                                                                         Total: 700px
```

---

### Diagram 4: Error Aggregation View (Expanded Task Card)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 🟠 HIGH     │ API Endpoint Timeout                                    ⏰ 2 hours ago  [▲]       │ 50px
├─────────────────────────────────────────────────────────────────────────────────────────────────┤ Header
│                                                                                                   │
│  Error Pattern: AxiosError: timeout of 30000ms exceeded                                          │ 30px
│  Route: /api/v2/students/attendance                                                              │ 30px
│                                                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Occurrence Timeline                                                                       │  │ 40px
│  ├──────────────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                                                                           │  │
│  │  14:00  ●●●                                                                              │  │
│  │  15:00  ●●●●●●●                                                                          │  │ 100px
│  │  16:00  ●●                                                                                │  │ Timeline
│  │                                                                                           │  │ Graph
│  │  12 occurrences in last 2 hours │ Peak: 15:30 (7 errors in 10 minutes)                 │  │
│  └──────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Affected Users (8 total)                                                   [View All]    │  │ 40px
│  ├──────────────────────────────────────────────────────────────────────────────────────────┤  │
│  │ • Priya Kumar (Student) - 3 times                                                        │  │
│  │ • Rajesh Patel (Student) - 2 times                                                       │  │ 120px
│  │ • Anita Sharma (Student) - 2 times                                                       │  │ User
│  │ • +5 more users                                                                           │  │ List
│  └──────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Suggested Actions                                                                         │  │ 40px
│  ├──────────────────────────────────────────────────────────────────────────────────────────┤  │
│  │ ⚠️ High error rate detected. Possible causes:                                           │  │
│  │ • Database performance degradation (slow queries)                                        │  │
│  │ • Network latency to database server                                                     │  │ 100px
│  │ • Insufficient database connection pool size                                             │  │ Suggestions
│  │                                                                                           │  │
│  │ Recommended: Check MongoDB slow query log and connection pool metrics                    │  │
│  └──────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                   │
│  [View Full Details] [Mark Resolved] [Escalate to Developer]        ⏱️ SLA: 2 hours left        │ 60px Footer
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                                                      Total: 480px
```

---

### Diagram 5: System Health Dashboard (1366x768)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ISF Playground PM - System Health                                    [🔔 12] [PM] [Logout]     │ 72px
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│  [Dashboard] [Error Tasks] [SYSTEM HEALTH] [Reports] [Settings]                                 │ 64px
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│  │ 🟢 System Status │  │ ⚡ Uptime        │  │ 📊 Error Rate    │  │ 👥 Active Users  │       │
│  │                  │  │                  │  │                  │  │                  │       │
│  │     Healthy      │  │    99.8%         │  │  0.3% (Low)      │  │     1,247        │       │ 120px
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘       │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  Error Rate Trend (Last 24 Hours)                                                        │   │
│  │                                                                                           │   │
│  │   15 │                                                                              ╱╲   │   │
│  │      │                                                                          ╱╲ ╱  ╲  │   │
│  │   10 │                                      ╱╲                              ╱╲ ╱  ╲╱    │   │
│  │      │                                  ╱╲ ╱  ╲                          ╱╲ ╱  ╲╱       │   │ 200px
│  │    5 │                              ╱╲ ╱  ╲╱    ╲                    ╱╲ ╱  ╲╱           │   │ Graph
│  │      │                          ╱╲ ╱  ╲╱        ╲                ╱╲ ╱  ╲╱               │   │
│  │    0 │╲                     ╱╲ ╱  ╲╱            ╲╱╲            ╱╲ ╱  ╲╱                 │   │
│  │      └─────────────────────────────────────────────────────────────────────────────────│   │
│  │       00:00   04:00   08:00   12:00   16:00   20:00   00:00                            │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌──────────────────────────────────────────────────┐  ┌──────────────────────────────────┐   │
│  │  Top 5 Most Frequent Errors (Last 7 Days)        │  │  Recent Resolutions              │   │
│  │                                                    │  │                                  │   │
│  │  1. API Timeout (attendance endpoint)     47x    │  │  ✅ Database Connection Fixed   │   │
│  │  2. Image Upload Failed (size limit)      23x    │  │     Resolved: 2 hours ago        │   │
│  │  3. Course Assignment Error               18x    │  │                                  │   │
│  │  4. Login Session Expired                 12x    │  │  ✅ S3 Upload Permission Fixed  │   │ 250px
│  │  5. Network Request Failed                 9x    │  │     Resolved: 5 hours ago        │   │ Cards
│  │                                                    │  │                                  │   │
│  │  [View All Errors →]                              │  │  ✅ Quiz Submission Bug Fixed   │   │
│  │                                                    │  │     Resolved: 1 day ago          │   │
│  └──────────────────────────────────────────────────┘  │                                  │   │
│                                                          │  [View All Resolutions →]        │   │
│                                                          └──────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Diagram 6: Error Notification (PM Notification Center)

```
┌──────────────────────────────────┐
│ Notifications               [✕]  │ 60px Header
├──────────────────────────────────┤
│                                  │
│ [All] [Errors (12)] [System]     │ 40px Tabs
│                                  │
│ ┌──────────────────────────────┐│
│ │ 🔴 CRITICAL ERROR            ││
│ │ Database Connection Failed   ││
│ │                              ││ 120px
│ │ Assigned to you              ││ Error
│ │ SLA: 15 minutes left         ││ Notification
│ │                              ││
│ │ [View] [Resolve]             ││
│ │ Just now                  [●]││
│ └──────────────────────────────┘│
│                                  │
│ ┌──────────────────────────────┐│
│ │ 🟠 HIGH PRIORITY ERROR       ││
│ │ API Timeout (12 occurrences) ││
│ │                              ││ 120px
│ │ Assigned to you              ││ Error
│ │ SLA: 2 hours left            ││ Notification
│ │                              ││
│ │ [View] [Resolve]             ││
│ │ 2 hours ago               [●]││
│ └──────────────────────────────┘│
│                                  │
│ [Mark All as Read]               │ 40px
└──────────────────────────────────┘
                         Total: 400px
```

---

## 2. Acceptance Criteria

### AC 2.1: Error Capture - Frontend

**AC-001:** Global error handler captures all unhandled JavaScript errors
**AC-002:** Promise rejection handler captures all uncaught promise rejections
**AC-003:** React Error Boundary wraps entire app and catches component errors
**AC-004:** Axios interceptor captures all HTTP 5xx errors
**AC-005:** Each error logs: message, stack trace, timestamp, route, user ID, user role
**AC-006:** Browser info captured: User agent, OS, viewport size
**AC-007:** User flow captured: Last 5 routes visited before error
**AC-008:** Console.error calls captured and logged
**AC-009:** Similar errors within 5-minute window de-duplicated (increment occurrence count)
**AC-010:** Maximum 100 errors per user per hour (prevent spam from broken sessions)

### AC 2.2: Error Capture - Backend

**AC-011:** Express error middleware catches all route errors
**AC-012:** Uncaught exception handler logs and gracefully shuts down
**AC-013:** Unhandled rejection handler logs and continues
**AC-014:** MongoDB connection errors captured
**AC-015:** Database query errors captured with query details
**AC-016:** External API errors captured (Twilio, S3, etc.)
**AC-017:** Each backend error logs: message, stack trace, timestamp, route, method, status code
**AC-018:** Request context logged: Headers, body (sanitized), query params
**AC-019:** Winston structured logging with error level
**AC-020:** Error logs written to both console and file (errors.log)

### AC 2.3: Error Prioritization

**AC-021:** Critical (P0): System-wide failures (database down, authentication broken, payment system down)
**AC-022:** High (P1): Feature completely broken (specific endpoint failing consistently, data loss)
**AC-023:** Medium (P2): Feature partially broken (UI glitch, slow performance, non-critical feature)
**AC-024:** Low (P3): Minor issues (cosmetic bugs, warnings, deprecated API usage)
**AC-025:** Priority auto-assigned based on error type and impact
**AC-026:** PM can manually override priority
**AC-027:** SLA timers based on priority: P0: 1 hour, P1: 4 hours, P2: 24 hours, P3: 72 hours
**AC-028:** SLA timer pauses when task marked "Under Investigation"
**AC-029:** SLA breach triggers escalation notification to Admin
**AC-030:** Critical (P0) errors send email alert to PM immediately

### AC 2.4: PM Task Creation

**AC-031:** PM task auto-created for each unique error
**AC-032:** Task title: "[Priority] Error Type - Affected Route"
**AC-033:** Task description includes: Error message, stack trace, affected users count
**AC-034:** Task assigned to on-duty PM (round-robin if multiple PMs)
**AC-035:** Notification sent to PM via Notification Center
**AC-036:** Task appears in PM Dashboard immediately
**AC-037:** Task has status: Open, Under Investigation, Resolved, Escalated
**AC-038:** PM can assign task to specific developer
**AC-039:** PM can add resolution notes
**AC-040:** Task auto-closes when error marked resolved

### AC 2.5: Child-Friendly Error Messages - Students/Coaches/Ammas

**AC-041:** Students see full-screen friendly error display (not technical error boundary)
**AC-042:** Message in Patrick Hand font for child-friendly appearance
**AC-043:** Large emoji displayed: 😊, 🛠️, 🌟, 🔄
**AC-044:** Message avoids technical jargon: "Something went wrong" not "Uncaught TypeError"
**AC-045:** Reassuring tone: "We're fixing it!", "Don't worry", "We're on it"
**AC-046:** Actionable buttons: "Try Again" and "Go Home"
**AC-047:** Try Again button reloads current page/component
**AC-048:** Go Home button navigates to user's homepage
**AC-049:** Optional "Need help?" text directs to coach
**AC-050:** Same friendly messages for Coaches and Ammas (non-technical roles)

### AC 2.6: Detailed Error Messages - Admins

**AC-051:** Admins see technical error messages (they can handle complexity)
**AC-052:** Error display includes: Error code, stack trace, affected component
**AC-053:** Link to full error details in PM Dashboard
**AC-054:** Suggested fix displayed if available
**AC-055:** Ability to report error with additional context
**AC-056:** Error message format: "Error [code]: [message] in [component]. [suggested fix]"
**AC-057:** Example: "Error 500: Database timeout in CourseService.fetchCourses(). Check DB connection pool."

### AC 2.7: Error Aggregation

**AC-058:** Errors grouped by identical stack trace signature
**AC-059:** Occurrence count tracked per error group
**AC-060:** First occurrence timestamp recorded
**AC-061:** Most recent occurrence timestamp recorded
**AC-062:** Affected users list tracked (unique user IDs)
**AC-063:** Error rate calculated (occurrences per hour)
**AC-064:** Timeline graph shows error frequency over 24 hours
**AC-065:** Peak error time identified (hour with most occurrences)
**AC-066:** Related errors suggested (similar stack traces >80% match)

### AC 2.8: PM Dashboard

**AC-067:** Dashboard displays all open error tasks
**AC-068:** Filter tabs: All, Critical, High, Medium, Low, Resolved
**AC-069:** Date filter: Today, Last 7 days, Last 30 days, Custom range
**AC-070:** Search box filters by error message, route, or user name
**AC-071:** Sort options: Priority (default), Most Recent, Most Occurrences, SLA Time Remaining
**AC-072:** Stats cards show count by priority
**AC-073:** Real-time updates via WebSocket (new errors appear immediately)
**AC-074:** Pagination: 20 tasks per page
**AC-075:** Export button downloads error log as CSV
**AC-076:** CSV includes: Priority, Error, Route, Occurrences, First/Last Seen, Status, Assigned To

### AC 2.9: Error Details Modal

**AC-077:** Modal opens when PM clicks "View Details"
**AC-078:** Full error message and complete stack trace displayed
**AC-079:** Stack trace syntax-highlighted for readability
**AC-080:** Copy button copies stack trace to clipboard
**AC-081:** Affected user section shows: Name, Role, User ID, Browser, OS, IP
**AC-082:** Route information shows: Path, HTTP method, status code
**AC-083:** Timeline shows all occurrences with timestamps
**AC-084:** Resolution notes textarea for PM to document fix
**AC-085:** "Assign to Developer" dropdown lists all developers
**AC-086:** "Mark as Resolved" button closes task and stops SLA timer
**AC-087:** Resolution creates audit log entry with PM name and timestamp

### AC 2.10: System Health Dashboard

**AC-088:** Overall system status indicator: Healthy (green), Degraded (yellow), Down (red)
**AC-089:** Uptime percentage (calculated from last 30 days)
**AC-090:** Current error rate percentage and trend (increasing/decreasing/stable)
**AC-091:** Active users count
**AC-092:** Error rate trend graph for last 24 hours (line chart)
**AC-093:** Top 5 most frequent errors list with occurrence counts
**AC-094:** Recent resolutions timeline (last 10 resolved errors)
**AC-095:** Average resolution time metric
**AC-096:** Error distribution pie chart (Critical, High, Medium, Low)
**AC-097:** All metrics update in real-time

### AC 2.11: Performance and Optimization

**AC-098:** Error capture adds <50ms latency to error occurrence
**AC-099:** Errors batched every 5 seconds before sending to server
**AC-100:** Client-side error queue with exponential backoff retry
**AC-101:** Error logs indexed on: timestamp, priority, status, userId
**AC-102:** Old errors (>90 days) auto-deleted via TTL index
**AC-103:** Dashboard loads in <1 second with 100+ errors
**AC-104:** Error aggregation query executes in <200ms
**AC-105:** WebSocket notifications arrive within 1 second

### AC 2.12: Accessibility and Usability

**AC-106:** Student error screen readable by screen readers
**AC-107:** All interactive buttons keyboard accessible (Tab, Enter)
**AC-108:** PM Dashboard keyboard navigable
**AC-109:** Error priorities color-coded with text labels (not color-only)
**AC-110:** High contrast mode supported
**AC-111:** Font sizes meet WCAG AA standards (minimum 16px)
**AC-112:** Focus indicators visible on all interactive elements

---

## 3. Technical Implementation Details

### 3.1 Frontend Error Capture

#### GlobalErrorHandler.js
```javascript
// utils/GlobalErrorHandler.js

class GlobalErrorHandler {
  constructor() {
    this.errorQueue = [];
    this.flushInterval = null;
    this.init();
  }

  init() {
    // Capture unhandled errors
    window.addEventListener('error', (event) => {
      this.captureError({
        message: event.message,
        stack: event.error?.stack,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        type: 'unhandled_error'
      });
    });

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        type: 'unhandled_rejection'
      });
    });

    // Override console.error
    const originalError = console.error;
    console.error = (...args) => {
      this.captureError({
        message: args.join(' '),
        type: 'console_error'
      });
      originalError.apply(console, args);
    };

    // Start batch flush
    this.startFlushInterval();
  }

  captureError(errorData) {
    const error = {
      ...errorData,
      timestamp: new Date().toISOString(),
      route: window.location.pathname,
      userId: localStorage.getItem('userId'),
      userRole: localStorage.getItem('userRole'),
      browser: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      recentRoutes: this.getRecentRoutes()
    };

    this.errorQueue.push(error);

    // If queue size > 10, flush immediately
    if (this.errorQueue.length > 10) {
      this.flushErrors();
    }
  }

  getRecentRoutes() {
    // Get last 5 routes from sessionStorage
    const routes = JSON.parse(sessionStorage.getItem('routeHistory') || '[]');
    return routes.slice(-5);
  }

  startFlushInterval() {
    // Flush errors every 5 seconds
    this.flushInterval = setInterval(() => {
      this.flushErrors();
    }, 5000);
  }

  async flushErrors() {
    if (this.errorQueue.length === 0) return;

    const errors = [...this.errorQueue];
    this.errorQueue = [];

    try {
      await fetch('/api/v2/errors/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ errors })
      });
    } catch (err) {
      // Failed to send errors - add back to queue
      this.errorQueue.push(...errors);
      console.warn('Failed to send error logs:', err);
    }
  }
}

export default new GlobalErrorHandler();
```

**File Path:** `frontend/src/utils/GlobalErrorHandler.js`

---

#### ErrorBoundary.jsx
```jsx
import React from 'react';
import StudentErrorDisplay from '../components/errors/StudentErrorDisplay';
import AdminErrorDisplay from '../components/errors/AdminErrorDisplay';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });

    // Log to error tracking
    this.logErrorToService(error, errorInfo);
  }

  async logErrorToService(error, errorInfo) {
    try {
      await fetch('/api/v2/errors/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          errors: [{
            message: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            type: 'react_error_boundary',
            timestamp: new Date().toISOString(),
            route: window.location.pathname,
            userId: localStorage.getItem('userId'),
            userRole: localStorage.getItem('userRole')
          }]
        })
      });
    } catch (err) {
      console.error('Failed to log error:', err);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const userRole = localStorage.getItem('userRole');

      // Admins see detailed error
      if (userRole === 'admin') {
        return (
          <AdminErrorDisplay
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            onReset={this.handleReset}
          />
        );
      }

      // Students, Coaches, Ammas see friendly error
      return (
        <StudentErrorDisplay onReset={this.handleReset} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

**File Path:** `frontend/src/components/ErrorBoundary.jsx`

---

#### StudentErrorDisplay.jsx
```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentErrorDisplay = ({ onReset }) => {
  const navigate = useNavigate();

  const errorMessages = [
    {
      emoji: '😊',
      title: 'Oops! Something went wrong',
      message: "We're working on fixing this right now.\nDon't worry, we'll have it sorted out in just a moment! 🛠️"
    },
    {
      emoji: '🌟',
      title: 'Hmm, that didn't work',
      message: "Our team is on it! Please try refreshing the page.\nEverything will be back to normal soon! 🔄"
    },
    {
      emoji: '🛠️',
      title: 'We hit a small bump!',
      message: "Don't worry, we're making it better right now.\nCome back in a moment and everything will work! ✨"
    }
  ];

  const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-12">
      <div className="text-9xl mb-8 animate-bounce">
        {randomMessage.emoji}
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-6 font-['Patrick_Hand'] text-center">
        {randomMessage.title}
      </h1>

      <p className="text-xl text-gray-600 mb-12 max-w-2xl text-center font-['Patrick_Hand'] whitespace-pre-line leading-relaxed">
        {randomMessage.message}
      </p>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={onReset}
          className="w-full px-8 py-4 bg-blue-600 text-white rounded-xl text-xl font-bold hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          Try Again 🔄
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl text-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          Go Home 🏠
        </button>
      </div>

      <p className="text-base text-gray-500 mt-auto">
        Need help? Contact your coach!
      </p>
    </div>
  );
};

export default StudentErrorDisplay;
```

**File Path:** `frontend/src/components/errors/StudentErrorDisplay.jsx`

---

### 3.2 Backend Error Capture

#### errorMiddleware.js
```javascript
const ErrorLog = require('../models/ErrorLog');
const { createPMTask } = require('../services/pmTaskService');
const { sendErrorNotification } = require('../services/notificationService');

// Error priorities
const ERROR_PRIORITIES = {
  CRITICAL: { level: 'P0', sla: 60 }, // 1 hour
  HIGH: { level: 'P1', sla: 240 }, // 4 hours
  MEDIUM: { level: 'P2', sla: 1440 }, // 24 hours
  LOW: { level: 'P3', sla: 4320 } // 72 hours
};

// Determine error priority based on error type and impact
const determinePriority = (error, req) => {
  const errorMessage = error.message.toLowerCase();
  const statusCode = error.statusCode || 500;

  // Critical: System-wide failures
  if (
    errorMessage.includes('database') && errorMessage.includes('connection') ||
    errorMessage.includes('econnrefused') ||
    errorMessage.includes('authentication') && errorMessage.includes('failed') ||
    errorMessage.includes('payment') ||
    statusCode === 503
  ) {
    return ERROR_PRIORITIES.CRITICAL;
  }

  // High: Feature completely broken
  if (
    statusCode >= 500 ||
    errorMessage.includes('cannot read') ||
    errorMessage.includes('undefined is not') ||
    errorMessage.includes('data loss')
  ) {
    return ERROR_PRIORITIES.HIGH;
  }

  // Medium: Feature partially broken
  if (
    statusCode >= 400 && statusCode < 500 ||
    errorMessage.includes('timeout') ||
    errorMessage.includes('slow')
  ) {
    return ERROR_PRIORITIES.MEDIUM;
  }

  // Low: Minor issues
  return ERROR_PRIORITIES.LOW;
};

// Check for duplicate error (same stack trace in last 5 minutes)
const findDuplicateError = async (error, route) => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const stackSignature = error.stack ? error.stack.substring(0, 200) : error.message;

  return await ErrorLog.findOne({
    stackSignature,
    route,
    createdAt: { $gte: fiveMinutesAgo }
  });
};

// Express error handling middleware
exports.errorHandler = async (err, req, res, next) => {
  console.error('Error caught by middleware:', err);

  try {
    const priority = determinePriority(err, req);
    const route = req.originalUrl;
    const stackSignature = err.stack ? err.stack.substring(0, 200) : err.message;

    // Check for duplicate
    const duplicateError = await findDuplicateError(err, route);

    if (duplicateError) {
      // Increment occurrence count
      duplicateError.occurrenceCount += 1;
      duplicateError.lastOccurrence = new Date();
      duplicateError.affectedUsers.addToSet(req.user?._id);
      await duplicateError.save();
    } else {
      // Create new error log
      const errorLog = await ErrorLog.create({
        errorMessage: err.message,
        stackTrace: err.stack,
        stackSignature,
        errorCode: err.code || 'UNKNOWN',
        priority: priority.level,
        slaMinutes: priority.sla,
        route,
        method: req.method,
        statusCode: err.statusCode || 500,
        userId: req.user?._id,
        userRole: req.user?.role,
        requestHeaders: JSON.stringify(req.headers),
        requestBody: JSON.stringify(req.body),
        requestQuery: JSON.stringify(req.query),
        occurrenceCount: 1,
        affectedUsers: req.user?._id ? [req.user._id] : [],
        status: 'open'
      });

      // Create PM task
      await createPMTask(errorLog);

      // Send notification to PM
      await sendErrorNotification(errorLog);
    }

    // Send response based on user role
    const userRole = req.user?.role || 'student';

    if (userRole === 'admin') {
      // Admins get detailed error
      return res.status(err.statusCode || 500).json({
        success: false,
        error: err.message,
        stack: err.stack,
        errorCode: err.code,
        suggestion: err.suggestion || 'Check error logs for details'
      });
    }

    // Students/Coaches/Ammas get friendly error
    return res.status(err.statusCode || 500).json({
      success: false,
      message: 'Oops! Something went wrong. Our team is on it!',
      friendlyMessage: true
    });

  } catch (logError) {
    console.error('Error logging failed:', logError);
    return res.status(500).json({
      success: false,
      message: 'An error occurred'
    });
  }
};

// Log frontend errors
exports.logFrontendErrors = async (req, res) => {
  try {
    const { errors } = req.body;

    for (const error of errors) {
      const priority = determinePriority({ message: error.message }, { originalUrl: error.route });
      const stackSignature = error.stack ? error.stack.substring(0, 200) : error.message;

      // Check for duplicate
      const duplicateError = await findDuplicateError(error, error.route);

      if (duplicateError) {
        duplicateError.occurrenceCount += 1;
        duplicateError.lastOccurrence = new Date();
        if (error.userId) {
          duplicateError.affectedUsers.addToSet(error.userId);
        }
        await duplicateError.save();
      } else {
        // Create new error log
        const errorLog = await ErrorLog.create({
          errorMessage: error.message,
          stackTrace: error.stack,
          stackSignature,
          errorCode: error.type || 'FRONTEND_ERROR',
          priority: priority.level,
          slaMinutes: priority.sla,
          route: error.route,
          method: 'GET', // Frontend errors typically from page loads
          statusCode: 0,
          userId: error.userId,
          userRole: error.userRole,
          browser: error.browser,
          viewport: error.viewport,
          recentRoutes: error.recentRoutes,
          occurrenceCount: 1,
          affectedUsers: error.userId ? [error.userId] : [],
          status: 'open'
        });

        // Create PM task
        await createPMTask(errorLog);

        // Send notification to PM
        await sendErrorNotification(errorLog);
      }
    }

    res.json({ success: true, message: 'Errors logged' });
  } catch (error) {
    console.error('Frontend error logging failed:', error);
    res.status(500).json({ success: false, message: 'Failed to log errors' });
  }
};
```

**File Path:** `backend/middleware/errorMiddleware.js`

---

### 3.3 MongoDB Schema

#### ErrorLog Schema
```javascript
const mongoose = require('mongoose');

const ErrorLogSchema = new mongoose.Schema({
  errorMessage: {
    type: String,
    required: true
  },
  stackTrace: {
    type: String
  },
  stackSignature: {
    type: String,
    required: true
  },
  errorCode: {
    type: String,
    default: 'UNKNOWN'
  },
  priority: {
    type: String,
    enum: ['P0', 'P1', 'P2', 'P3'],
    required: true
  },
  slaMinutes: {
    type: Number,
    required: true
  },
  slaBreached: {
    type: Boolean,
    default: false
  },
  route: {
    type: String,
    required: true
  },
  method: {
    type: String
  },
  statusCode: {
    type: Number
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userRole: {
    type: String
  },
  browser: {
    type: String
  },
  viewport: {
    type: String
  },
  recentRoutes: [{
    type: String
  }],
  requestHeaders: {
    type: String // JSON stringified
  },
  requestBody: {
    type: String // JSON stringified
  },
  requestQuery: {
    type: String // JSON stringified
  },
  occurrenceCount: {
    type: Number,
    default: 1
  },
  affectedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['open', 'investigating', 'resolved', 'escalated'],
    default: 'open'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // PM or Developer
  },
  resolutionNotes: {
    type: String
  },
  resolvedAt: {
    type: Date
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastOccurrence: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
ErrorLogSchema.index({ createdAt: -1 });
ErrorLogSchema.index({ priority: 1, status: 1 });
ErrorLogSchema.index({ status: 1 });
ErrorLogSchema.index({ assignedTo: 1 });
ErrorLogSchema.index({ stackSignature: 1, route: 1, createdAt: -1 });

// TTL index - auto-delete errors older than 90 days
ErrorLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

// Check SLA breach
ErrorLogSchema.methods.checkSLABreach = function() {
  if (this.status === 'resolved') return false;

  const elapsed = (Date.now() - this.createdAt.getTime()) / (60 * 1000); // minutes
  if (elapsed > this.slaMinutes) {
    this.slaBreached = true;
    return true;
  }
  return false;
};

module.exports = mongoose.model('ErrorLog', ErrorLogSchema);
```

**File Path:** `backend/models/ErrorLog.js`

---

## 4. Task Breakdown

### Phase 1: Frontend Error Capture (3-4 hours)

**Task 4.1.1:** Create GlobalErrorHandler utility
- Implement window error event listener
- Implement unhandled rejection listener
- Override console.error to capture manual logs
- Create error queue with batch flushing (every 5 seconds)
- Add user context and route history tracking
- **Estimated Time:** 1.5 hours

**Task 4.1.2:** Create React Error Boundary
- Implement Error Boundary component
- Create StudentErrorDisplay component with friendly messages
- Create AdminErrorDisplay component with technical details
- Add error logging to backend
- Handle component reset and reload
- **Estimated Time:** 1.5 hours

**Task 4.1.3:** Set up Axios interceptor
- Intercept all HTTP 5xx errors
- Log error with request context
- Show appropriate error message based on user role
- **Estimated Time:** 30 minutes

---

### Phase 2: Backend Error Capture (3-4 hours)

**Task 4.2.1:** Create Express error middleware
- Implement error handler middleware
- Determine error priority based on type and impact
- Check for duplicate errors (5-minute window)
- Create or update ErrorLog records
- Send response based on user role (detailed vs friendly)
- **Estimated Time:** 2 hours

**Task 4.2.2:** Implement frontend error logging endpoint
- Create POST /api/v2/errors/log endpoint
- Process batch error logs from frontend
- De-duplicate similar errors
- Create PM tasks for new errors
- **Estimated Time:** 1 hour

**Task 4.2.3:** Add uncaught exception handlers
- Handle process uncaughtException
- Handle process unhandledRejection
- Log and gracefully shut down on critical errors
- **Estimated Time:** 30 minutes

---

### Phase 3: PM Task Creation and Notification (2-3 hours)

**Task 4.3.1:** Create PM task service
- Implement createPMTask function
- Auto-assign to on-duty PM (round-robin)
- Start SLA timer based on priority
- Create task record in database
- **Estimated Time:** 1 hour

**Task 4.3.2:** Implement error notifications
- Send notification to PM via Notification Center
- Send email alert for Critical (P0) errors
- Update PM Dashboard via WebSocket
- **Estimated Time:** 1 hour

**Task 4.3.3:** Add SLA breach detection
- Create cron job to check SLA breaches every 5 minutes
- Flag breached errors
- Send escalation notification to Admin
- **Estimated Time:** 45 minutes

---

### Phase 4: PM Dashboard and Error Management (4-5 hours)

**Task 4.4.1:** Create PM Dashboard page
- Build main layout with stats cards
- Implement priority filter tabs
- Add date range filter
- Create search functionality
- Display error task cards with expandable details
- **Estimated Time:** 2 hours

**Task 4.4.2:** Create Error Details Modal
- Display full error information
- Show stack trace with syntax highlighting
- Add copy-to-clipboard for stack trace
- Show affected users list
- Add resolution notes textarea
- Implement "Assign to Developer" dropdown
- **Estimated Time:** 1.5 hours

**Task 4.4.3:** Implement error aggregation view
- Group errors by stack signature
- Display occurrence timeline graph
- Show affected users count
- Add suggested actions section
- **Estimated Time:** 1 hour

---

### Phase 5: System Health Dashboard (2-3 hours)

**Task 4.5.1:** Create System Health page
- Display overall status indicator (Healthy/Degraded/Down)
- Show uptime percentage
- Display current error rate
- Show active users count
- **Estimated Time:** 1 hour

**Task 4.5.2:** Create error rate trend graph
- Implement 24-hour line chart using Recharts
- Show error frequency over time
- Highlight peak error periods
- **Estimated Time:** 1 hour

**Task 4.5.3:** Add Top Errors and Recent Resolutions
- Display top 5 most frequent errors
- Show recent resolutions timeline
- Calculate average resolution time
- **Estimated Time:** 45 minutes

---

### Phase 6: Testing and Polish (2-3 hours)

**Task 4.6.1:** End-to-end testing
- Test frontend error capture (throw test errors)
- Test backend error capture (trigger 500 errors)
- Verify PM task creation
- Test SLA timers and breach detection
- Verify notifications sent correctly
- **Estimated Time:** 1.5 hours

**Task 4.6.2:** Test error de-duplication
- Create multiple identical errors quickly
- Verify only one task created
- Verify occurrence count increments
- Test affected users tracking
- **Estimated Time:** 45 minutes

**Task 4.6.3:** Performance and documentation
- Verify error capture adds <50ms latency
- Test with 100+ errors in dashboard
- Verify TTL index deletes old errors
- Document error codes and priorities
- **Estimated Time:** 45 minutes

---

## 5. Definition of Done

### 5.1 Functional Completeness
- [ ] Global error handler captures all frontend errors
- [ ] React Error Boundary catches component errors
- [ ] Backend middleware catches all route errors
- [ ] Errors categorized by priority (P0, P1, P2, P3)
- [ ] PM task auto-created for each unique error
- [ ] SLA timers start based on priority
- [ ] Students see child-friendly error messages
- [ ] Admins see detailed technical error messages
- [ ] Errors de-duplicated within 5-minute window
- [ ] PM Dashboard displays all error tasks
- [ ] Error Details Modal shows complete information
- [ ] System Health Dashboard shows error trends
- [ ] PM can mark errors as resolved
- [ ] PM can assign errors to developers
- [ ] SLA breach triggers escalation notification
- [ ] Critical (P0) errors send email alerts

### 5.2 Technical Requirements
- [ ] MongoDB ErrorLog schema created with TTL index
- [ ] Express error middleware implemented
- [ ] Winston structured logging configured
- [ ] Frontend error batching (5-second intervals)
- [ ] Maximum 100 errors per user per hour enforced
- [ ] Database indexes optimize queries
- [ ] WebSocket notifications for real-time updates
- [ ] All API endpoints implemented
- [ ] Cron job for SLA breach checking

### 5.3 UI/UX Requirements
- [ ] Student error display uses Patrick Hand font
- [ ] Friendly emojis and reassuring messages
- [ ] "Try Again" and "Go Home" buttons functional
- [ ] PM Dashboard matches design (1366x768)
- [ ] Priority color-coding (Red, Orange, Yellow, Gray)
- [ ] Task cards expandable for full details
- [ ] Error Details Modal 900x700 with scrollable stack trace
- [ ] System Health graphs display correctly
- [ ] All interactive elements have hover states

### 5.4 Performance
- [ ] Error capture adds <50ms latency
- [ ] Dashboard loads in <1 second with 100+ errors
- [ ] Error aggregation query <200ms
- [ ] WebSocket notifications arrive within 1 second
- [ ] Old errors (>90 days) auto-deleted
- [ ] Client-side error queue prevents spam

### 5.5 Security
- [ ] Sensitive data sanitized before logging
- [ ] PM Dashboard requires PM role permission
- [ ] Request bodies logged without passwords/tokens
- [ ] Error endpoints protected with authentication
- [ ] Stack traces not exposed to non-admins

### 5.6 Testing
- [ ] Frontend error capture tested with thrown errors
- [ ] Backend error middleware tested with 500 errors
- [ ] PM task creation verified
- [ ] SLA timers tested
- [ ] Notification delivery verified
- [ ] De-duplication logic tested
- [ ] User role-based messages tested
- [ ] Performance tested with high error volume

### 5.7 Documentation
- [ ] Error codes documented
- [ ] Priority levels documented
- [ ] SLA timers documented
- [ ] API endpoints documented
- [ ] MongoDB schema documented
- [ ] PM Dashboard user guide created

---

## 6. File Paths Summary

### Frontend Files:
- `frontend/src/utils/GlobalErrorHandler.js`
- `frontend/src/components/ErrorBoundary.jsx`
- `frontend/src/components/errors/StudentErrorDisplay.jsx`
- `frontend/src/components/errors/AdminErrorDisplay.jsx`
- `frontend/src/components/pm/PMDashboard.jsx`
- `frontend/src/components/pm/ErrorDetailsModal.jsx`
- `frontend/src/components/pm/SystemHealthDashboard.jsx`

### Backend Files:
- `backend/models/ErrorLog.js`
- `backend/middleware/errorMiddleware.js`
- `backend/services/pmTaskService.js`
- `backend/controllers/pmController.js`
- `backend/routes/v2/pm.js`
- `backend/cron/slaBreachChecker.js`

---

## 7. Notes for Developers

### Error Priority Guidelines:
- **P0 (Critical)**: Database down, auth broken, payment system down → 1 hour SLA
- **P1 (High)**: Feature completely broken, data loss → 4 hours SLA
- **P2 (Medium)**: Feature partially broken, slow performance → 24 hours SLA
- **P3 (Low)**: Minor UI issues, warnings → 72 hours SLA

### Child-Friendly Message Guidelines:
- Use simple words: "went wrong" not "encountered an exception"
- Be reassuring: "We're fixing it!" not "System error"
- Include friendly emojis: 😊, 🛠️, 🌟, 🔄
- Provide action: "Try Again" not just "Error occurred"

### Error De-duplication Logic:
- Errors with same stack signature (first 200 chars) and route within 5 minutes = duplicate
- Increment occurrence count for duplicates
- Track all affected users (unique user IDs)

### Performance Considerations:
- Batch frontend errors every 5 seconds (don't send individually)
- Use TTL index to auto-delete old errors
- Index stackSignature + route + createdAt for fast duplicate checks
- Limit 100 errors per user per hour to prevent spam from broken sessions

---

**Story Complete. Ready for Development.**

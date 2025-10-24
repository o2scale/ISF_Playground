# Epic 05 - Story 01: In-App Notification Center (Dual-Display System)

**Story ID:** SPRINT2-EPIC05-STORY01
**Epic:** Epic 05 - System-Wide Features
**Sprint:** Sprint 2
**Story Name:** In-App Notification Center (Dual-Display System)
**Estimated Effort:** 6-8 hours (1 development day)
**Priority:** High (P1)
**Dependencies:**
- Sprint 1.1 RBAC (user authentication, role management)
- Backend: MongoDB Notifications collection
- Frontend: Real-time updates (WebSocket or polling)

**Last Updated:** 2025-10-24 15:50:59
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As a** User (Student, Coach, Admin, Amma)
**I want** a dual-display notification system with toasts and a persistent notification center
**So that** I receive timely updates and can review past notifications

### 1.2. Story Context

Dual-display notification system:
- **Toast Notifications:** Temporary, auto-dismissing notifications that appear top-right for 5 seconds
- **Notification Center:** Persistent bell icon with unread count, opens dropdown list of all notifications

Notification types:
- **Success:** Green - Course completed, coins awarded, assignment graded
- **Info:** Blue - Course assigned, new message, schedule update
- **Warning:** Yellow - SLA warning, low coin balance, deadline approaching
- **Error:** Red - Submission failed, server error, payment issue

### 1.3. Key Features

- **Toast Notifications:** Top-right corner, 4 types (Success, Info, Warning, Error), auto-dismiss after 5s
- **Bell Icon:** Title bar, shows unread count badge
- **Notification Center:** Dropdown panel, lists all notifications sorted by timestamp
- **Mark as Read/Unread:** Click notification to mark as read
- **Clear All:** Button to clear all notifications
- **Deep Links:** Click notification navigates to relevant page (e.g., coin transaction, graded assignment)

---

## 1.5. Visual Layout Diagrams

### Toast Notifications - All Types

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ISF Playground - Student Dashboard                           [Profile ▼]   │ ← Title Bar
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│                                      ┌──────────────────────────────────┐  │
│                                      │ ✅ Assignment Graded!            │  │ ← SUCCESS Toast
│                                      │ Coach Priya gave you 80 coins.   │  │   (green background)
│                                      │ [View Details]            [×]    │  │   auto-dismiss: 5s
│                                      └──────────────────────────────────┘  │   position: top-right
│                                                                             │
│                                      ┌──────────────────────────────────┐  │
│                                      │ ℹ️ New Course Assigned           │  │ ← INFO Toast
│                                      │ Computer Apps course is ready!   │  │   (blue background)
│                                      │ [Start Learning]          [×]    │  │   auto-dismiss: 5s
│                                      └──────────────────────────────────┘  │
│                                                                             │
│                                      ┌──────────────────────────────────┐  │
│                                      │ ⚠️ SLA Deadline Approaching      │  │ ← WARNING Toast
│                                      │ Respond to query in 15 minutes.  │  │   (yellow background)
│                                      │ [View Query]              [×]    │  │   auto-dismiss: 5s
│                                      └──────────────────────────────────┘  │
│                                                                             │
│                                      ┌──────────────────────────────────┐  │
│                                      │ ❌ Submission Failed              │  │ ← ERROR Toast
│                                      │ Network error. Please try again. │  │   (red background)
│                                      │ [Retry]                   [×]    │  │   auto-dismiss: 5s
│                                      └──────────────────────────────────┘  │
│                                                                             │
│ [Dashboard Content Below...]                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Bell Icon - Unread Count Badge

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [ISF Logo] ISF Playground              [💰 1,250] [🔔 5] [Profile ▼]       │ ← Title Bar
│                                                      ▲                       │
│                                                      │                       │
│                                                      └─ Bell icon with       │
│                                                         unread count (5)     │
│                                                         Red badge            │
│                                                         bg-red-600           │
│                                                         text-white           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Notification Center - Dropdown Panel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [ISF Logo] ISF Playground              [💰 1,250] [🔔 5] [Profile ▼]       │
│                                                      ▼                       │
│                          ┌────────────────────────────────────────────────┐ │
│                          │ Notifications (5 unread)          [Clear All]  │ │ ← Dropdown header
│                          │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │   bg-white shadow-xl
│                          │                                                │ │   width: 400px
│                          │ ┌────────────────────────────────────────────┐ │ │   max-height: 500px
│                          │ │ ✅ Assignment Graded!                      │ │ │ ← Notification 1
│                          │ │ Coach Priya gave you 80 coins.             │ │ │   (unread, bg-blue-50)
│                          │ │ Just now                           [View]   │ │ │
│                          │ └────────────────────────────────────────────┘ │ │
│                          │                                                │ │
│                          │ ┌────────────────────────────────────────────┐ │ │
│                          │ │ ℹ️ New Course Assigned                     │ │ │ ← Notification 2
│                          │ │ Computer Apps course is ready to start!    │ │ │   (unread, bg-blue-50)
│                          │ │ 5 minutes ago                      [View]   │ │ │
│                          │ └────────────────────────────────────────────┘ │ │
│                          │                                                │ │
│                          │ ┌────────────────────────────────────────────┐ │ │
│                          │ │ ⚠️ SLA Deadline Approaching                │ │ │ ← Notification 3
│                          │ │ Respond to query in 15 minutes.            │ │ │   (unread, bg-blue-50)
│                          │ │ 10 minutes ago                     [View]   │ │ │
│                          │ └────────────────────────────────────────────┘ │ │
│                          │                                                │ │
│                          │ ┌────────────────────────────────────────────┐ │ │
│                          │ │ ✅ Course Completed!                       │ │ │ ← Notification 4 (READ)
│                          │ │ You finished Beginner Art Course.          │ │ │   (read, bg-white)
│                          │ │ 2 hours ago                        [View]   │ │ │   text-gray-600
│                          │ └────────────────────────────────────────────┘ │ │
│                          │                                                │ │
│                          │ ┌────────────────────────────────────────────┐ │ │
│                          │ │ 💰 Coins Awarded!                          │ │ │ ← Notification 5 (READ)
│                          │ │ Coach manually awarded you 100 coins.      │ │ │   (read, bg-white)
│                          │ │ Yesterday at 3:30 PM               [View]   │ │ │   text-gray-600
│                          │ └────────────────────────────────────────────┘ │ │
│                          │                                                │ │
│                          │ [View All Notifications]                       │ │ ← Footer link
│                          └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Notification List - Full Page View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ All Notifications                                          [← Back]         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ [All ▼] [Unread Only ▼] [🔍 Search...]                      [Clear All]   │
│                                                                             │
│ Today                                                                       │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ✅ Assignment Graded!                                          [View]   │ │
│ │ Coach Priya gave you 80 coins for your artwork. Great job!             │ │
│ │ Just now • Success                                                      │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ℹ️ New Course Assigned                                         [View]   │ │
│ │ Computer Apps course is ready to start learning!                       │ │
│ │ 5 minutes ago • Info                                                    │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ⚠️ SLA Deadline Approaching                                    [View]   │ │
│ │ Respond to query in 15 minutes.                                        │ │
│ │ 10 minutes ago • Warning                                                │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Yesterday                                                                   │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ✅ Course Completed!                                           [View]   │ │
│ │ You finished Beginner Art Course with 95% score!                       │ │
│ │ Yesterday at 2:30 PM • Success                                          │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ... (20 more notifications, paginated)                                     │
│                                                                             │
│ [Load More (20 per page)]                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Empty State - No Notifications

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [ISF Logo] ISF Playground              [💰 1,250] [🔔 0] [Profile ▼]       │
│                                                      ▼                       │
│                          ┌────────────────────────────────────────────────┐ │
│                          │ Notifications                     [Clear All]  │ │
│                          │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│                          │                                                │ │
│                          │                  🔔                            │ │ ← Empty state icon
│                          │                                                │ │
│                          │         No notifications yet!                  │ │
│                          │                                                │ │
│                          │  You'll see updates here when there's         │ │
│                          │  something new for you.                        │ │
│                          │                                                │ │
│                          └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Measurements Summary

| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| **Toast Notification** | 350px | auto (min 80px) | p-4 | mb-3 | rounded-lg shadow-lg | text-sm |
| **Toast (Success)** | 350px | auto | p-4 | mb-3 | bg-green-100 border-l-4 green-500 | - |
| **Toast (Info)** | 350px | auto | p-4 | mb-3 | bg-blue-100 border-l-4 blue-500 | - |
| **Toast (Warning)** | 350px | auto | p-4 | mb-3 | bg-yellow-100 border-l-4 yellow-500 | - |
| **Toast (Error)** | 350px | auto | p-4 | mb-3 | bg-red-100 border-l-4 red-500 | - |
| **Bell Icon** | 24px | 24px | p-2 | mx-2 | - | - |
| **Unread Badge** | auto (min 20px) | 20px | px-1.5 | - | rounded-full bg-red-600 | text-xs text-white |
| **Notification Dropdown** | 400px | auto (max 500px) | - | - | rounded-lg shadow-xl bg-white | - |
| **Dropdown Header** | 100% | 60px | px-4 py-3 | - | border-b gray-200 | text-lg font-semibold |
| **Notification Item (Unread)** | 100% | auto (min 70px) | p-4 | mb-2 | bg-blue-50 rounded-lg | text-sm |
| **Notification Item (Read)** | 100% | auto (min 70px) | p-4 | mb-2 | bg-white rounded-lg | text-sm text-gray-600 |
| **View Button** | auto | 32px | px-3 py-1 | - | rounded text-blue-600 hover:bg-blue-50 | text-sm |
| **Clear All Button** | auto | 36px | px-4 py-2 | - | rounded bg-gray-100 hover:bg-gray-200 | text-sm |

---

## 2. Acceptance Criteria

### 2.1. Toast Notifications

- [ ] **TOAST-01:** Toast notification appears top-right corner when triggered
- [ ] **TOAST-02:** Toast has 4 types: Success (green), Info (blue), Warning (yellow), Error (red)
- [ ] **TOAST-03:** Each toast shows: icon, title, message, action button (optional), close button [×]
- [ ] **TOAST-04:** Toast auto-dismisses after 5 seconds (configurable)
- [ ] **TOAST-05:** Multiple toasts stack vertically (newest on top)
- [ ] **TOAST-06:** Hovering toast pauses auto-dismiss timer
- [ ] **TOAST-07:** Clicking [×] immediately dismisses toast
- [ ] **TOAST-08:** Clicking action button executes action (e.g., "View Details" navigates to page)
- [ ] **TOAST-09:** Toast fade-in animation (300ms) on appear
- [ ] **TOAST-10:** Toast fade-out animation (300ms) on dismiss

### 2.2. Bell Icon & Unread Count

- [ ] **BELL-01:** Bell icon 🔔 displays in Title Bar (right side, before Profile dropdown)
- [ ] **BELL-02:** Unread count badge shows number of unread notifications (red circle, white text)
- [ ] **BELL-03:** If 0 unread, badge shows "0" or hides (configurable)
- [ ] **BELL-04:** Unread count updates in real-time (WebSocket or polling every 30s)
- [ ] **BELL-05:** Clicking bell icon opens notification center dropdown
- [ ] **BELL-06:** Clicking bell icon when dropdown open closes dropdown

### 2.3. Notification Center Dropdown

- [ ] **DROPDOWN-01:** Dropdown opens below bell icon, aligned right
- [ ] **DROPDOWN-02:** Dropdown width 400px, max height 500px (scrollable)
- [ ] **DROPDOWN-03:** Dropdown header shows "Notifications ({unreadCount} unread)" and "Clear All" button
- [ ] **DROPDOWN-04:** Notification items sorted by timestamp descending (most recent first)
- [ ] **DROPDOWN-05:** Unread notifications have blue background (bg-blue-50)
- [ ] **DROPDOWN-06:** Read notifications have white background (bg-white, text-gray-600)
- [ ] **DROPDOWN-07:** Each item shows: icon (based on type), title, message, timestamp, "View" button
- [ ] **DROPDOWN-08:** Timestamp relative: "Just now", "5 minutes ago", "Yesterday at 3:30 PM"
- [ ] **DROPDOWN-09:** Clicking notification item marks as read (unless already read)
- [ ] **DROPDOWN-10:** "View All Notifications" link navigates to full-page notification list
- [ ] **DROPDOWN-11:** "Clear All" button clears all notifications (confirm modal first)
- [ ] **DROPDOWN-12:** Dropdown closes when clicking outside

### 2.4. Full-Page Notification List

- [ ] **LIST-01:** Full-page list accessible at `/notifications` or via "View All" link
- [ ] **LIST-02:** Filter dropdown: All, Unread Only
- [ ] **LIST-03:** Search input filters by title or message (case-insensitive, real-time)
- [ ] **LIST-04:** Notifications grouped by date: Today, Yesterday, This Week, Earlier
- [ ] **LIST-05:** Each notification card shows: icon, title, message, timestamp, type badge, "View" button
- [ ] **LIST-06:** Clicking "View" button navigates to deep link (if available)
- [ ] **LIST-07:** Pagination: 20 notifications per page, "Load More" button
- [ ] **LIST-08:** "Clear All" button clears all notifications (confirm modal)
- [ ] **LIST-09:** Empty state: "No notifications yet! You'll see updates here when there's something new."

### 2.5. Mark as Read/Unread

- [ ] **READ-01:** Clicking notification in dropdown marks as read (background changes from blue to white)
- [ ] **READ-02:** Clicking notification in full-page list marks as read
- [ ] **READ-03:** Unread count decrements when notification marked as read
- [ ] **READ-04:** Read notification displays with gray text (text-gray-600)
- [ ] **READ-05:** "Mark all as read" button available (marks all unread as read)

### 2.6. Deep Links

- [ ] **LINK-01:** Notifications with deep links open relevant page on click
- [ ] **LINK-02:** Grading notification links to `/student/submissions/:submissionId`
- [ ] **LINK-03:** Coin award notification links to `/student/coins/transactions`
- [ ] **LINK-04:** Course assignment notification links to `/student/courses/:courseId`
- [ ] **LINK-05:** SLA warning notification links to `/amma/queries/:queryId`

### 2.7. Real-Time Updates

- [ ] **REALTIME-01:** New notifications appear in real-time (WebSocket push or polling every 30s)
- [ ] **REALTIME-02:** Toast notification displays for new notification
- [ ] **REALTIME-03:** Unread count updates in real-time
- [ ] **REALTIME-04:** Notification dropdown updates without page refresh

### 2.8. Performance & Accessibility

- [ ] **PERF-01:** Toast appears within 100ms of trigger
- [ ] **PERF-02:** Notification dropdown opens within 300ms
- [ ] **PERF-03:** Full-page list loads within 1 second (up to 100 notifications)
- [ ] **ACC-01:** Keyboard navigation: Tab to bell icon, Enter to open dropdown, Arrow keys to navigate notifications
- [ ] **ACC-02:** Screen reader announces: new notification count, notification title and message
- [ ] **ACC-03:** Focus visible on all interactive elements

---

## 3. Task Breakdown

### Phase 1: Toast Notification System (1.5 hours)

**Task 1.1: Create toast component (45 min)**
- Component: `Toast.jsx`
- Props: `type` (success, info, warning, error), `title`, `message`, `actionButton?`, `onClose`, `autoDismiss?` (default true), `duration?` (default 5000ms)
- Types with colors:
  - Success: bg-green-100, border-l-4 green-500, ✅ icon
  - Info: bg-blue-100, border-l-4 blue-500, ℹ️ icon
  - Warning: bg-yellow-100, border-l-4 yellow-500, ⚠️ icon
  - Error: bg-red-100, border-l-4 red-500, ❌ icon
- Auto-dismiss timer: `setTimeout(onClose, duration)`, pauses on hover
- Animations: fade-in (300ms), fade-out (300ms)
- File: `frontend/src/components/common/Toast.jsx`

**Task 1.2: Build toast container (30 min)**
- Component: `ToastContainer.jsx`
- Position: fixed top-right (top-20 right-8)
- Stack toasts vertically (newest on top)
- State management: `toasts` array
- Methods: `addToast(toast)`, `removeToast(toastId)`
- File: `frontend/src/components/common/ToastContainer.jsx`

**Task 1.3: Create toast context/hook (15 min)**
- Context: `ToastContext` provides `addToast` function
- Hook: `useToast()` returns `addToast` function
- Usage: `const { addToast } = useToast(); addToast({ type: 'success', title: 'Graded!', message: '80 coins awarded' });`
- File: `frontend/src/contexts/ToastContext.jsx`, `frontend/src/hooks/useToast.js`

### Phase 2: Bell Icon & Unread Count (45 min)

**Task 2.1: Add bell icon to Title Bar (20 min)**
- Update `TitleBar.jsx` component
- Add bell icon 🔔 (from react-icons or custom SVG)
- Fetch unread count: GET `/api/v2/notifications/:userId?read=false&count=true`
- Display unread badge: red circle with count (if count > 0)
- Click handler: toggle notification dropdown
- File: `frontend/src/components/layout/TitleBar.jsx`

**Task 2.2: Implement real-time unread count update (25 min)**
- WebSocket connection: listen for `newNotification` event
- On event: increment unread count, show toast
- Fallback: polling every 30 seconds
- File: `frontend/src/hooks/useNotifications.js`

### Phase 3: Notification Center Dropdown (1.5 hours)

**Task 3.1: Create notification dropdown component (45 min)**
- Component: `NotificationDropdown.jsx`
- Dropdown header: "Notifications ({unreadCount} unread)", "Clear All" button
- Fetch notifications: GET `/api/v2/notifications/:userId?limit=10`
- Notification items: icon, title, message, timestamp, "View" button
- Unread styling: bg-blue-50
- Read styling: bg-white, text-gray-600
- Timestamp formatting: "Just now", "5 minutes ago", "Yesterday at 3:30 PM" (using `date-fns` or `dayjs`)
- "View All Notifications" link to `/notifications`
- File: `frontend/src/components/notifications/NotificationDropdown.jsx`

**Task 3.2: Implement mark as read logic (30 min)**
- Clicking notification calls PUT `/api/v2/notifications/:notificationId/read`
- Update local state: change `read: false` to `read: true`
- Decrement unread count
- File: `frontend/src/components/notifications/NotificationDropdown.jsx`

**Task 3.3: Implement clear all logic (15 min)**
- "Clear All" button shows confirm modal: "Are you sure you want to clear all notifications?"
- On confirm: DELETE `/api/v2/notifications/:userId` (clears all for user)
- Update local state: empty notifications array, set unread count to 0
- File: `frontend/src/components/notifications/NotificationDropdown.jsx`

### Phase 4: Full-Page Notification List (1 hour)

**Task 4.1: Create full-page notification list component (40 min)**
- Component: `NotificationList.jsx`
- Filter dropdown: All, Unread Only
- Search input with real-time filtering
- Group notifications by date: Today, Yesterday, This Week, Earlier
- Pagination: 20 per page, "Load More" button
- "Clear All" button
- Empty state: icon + message
- File: `frontend/src/components/notifications/NotificationList.jsx`

**Task 4.2: Implement notification routing (20 min)**
- Add route `/notifications` in React Router
- Deep links: construct URL based on notification type
  - `type=grade` → `/student/submissions/${submissionId}`
  - `type=coin_award` → `/student/coins/transactions`
  - `type=course_assignment` → `/student/courses/${courseId}`
- Clicking "View" button navigates to deep link
- File: `frontend/src/App.jsx`, `frontend/src/components/notifications/NotificationList.jsx`

### Phase 5: Backend API Endpoints (1 hour)

**Task 5.1: Create notifications API controller (30 min)**
- GET `/api/v2/notifications/:userId` - Fetch notifications with filters
  - Query params: `read?` (true/false), `limit?`, `offset?`
  - Return: `{ notifications: [...], unreadCount }`
- PUT `/api/v2/notifications/:notificationId/read` - Mark as read
  - Update `notification.read = true`, `notification.readAt = Date.now()`
- DELETE `/api/v2/notifications/:userId` - Clear all notifications
  - Delete all notifications for user
- File: `backend/controllers/notificationController.js`

**Task 5.2: Create notification service (30 min)**
- Function: `createNotification({ recipientId, type, title, message, link? })`
- Inserts notification document in MongoDB
- Triggers WebSocket push to recipient: `newNotification` event
- Function: `getUnreadCount(userId)` - Returns count of unread notifications
- File: `backend/services/notificationService.js`

### Phase 6: Testing & Integration (45 min)

**Task 6.1: Integrate toast notifications across app (30 min)**
- Grading: After grading submission, call `addToast({ type: 'success', title: 'Assignment Graded!', message: 'You received 80 coins.' })`
- Coin award: After awarding coins, call `addToast({ type: 'success', title: 'Coins Awarded!', message: 'Coach awarded you 100 coins.' })`
- Course assignment: After assigning course, call `addToast({ type: 'info', title: 'Course Assigned!', message: 'New course is ready!' })`
- Error handling: On API error, call `addToast({ type: 'error', title: 'Error', message: 'Failed to save. Please try again.' })`
- File: Update relevant components across app

**Task 6.2: E2E tests (15 min)**
- Test: Trigger notification, verify toast appears
- Test: Click bell icon, verify dropdown opens
- Test: Click notification, verify marked as read
- Test: Click "Clear All", verify all cleared
- File: `frontend/tests/e2e/notifications.spec.js`

---

## 4. API Endpoints

### 4.1. Get Notifications

**Endpoint:** `GET /api/v2/notifications/:userId`

**Query Parameters:**
- `read` (optional): `true`, `false`, or omit for all
- `limit` (optional, default 20): Number of notifications
- `offset` (optional, default 0): Pagination offset

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif123",
        "type": "grade",
        "title": "Assignment Graded!",
        "message": "Coach Priya gave you 80 coins for your artwork.",
        "link": "/student/submissions/sub456",
        "read": false,
        "createdAt": "2025-10-24T15:50:00Z"
      }
    ],
    "unreadCount": 5,
    "total": 48
  }
}
```

---

### 4.2. Mark Notification as Read

**Endpoint:** `PUT /api/v2/notifications/:notificationId/read`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "notification": {
      "id": "notif123",
      "read": true,
      "readAt": "2025-10-24T15:51:00Z"
    }
  }
}
```

---

### 4.3. Clear All Notifications

**Endpoint:** `DELETE /api/v2/notifications/:userId`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "All notifications cleared"
}
```

---

## 5. MongoDB Schema

### 5.1. Notifications Collection

```javascript
const NotificationSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  recipientRole: {
    type: String,
    enum: ['student', 'coach', 'admin', 'amma', 'pm'],
    required: true
  },
  type: {
    type: String,
    enum: ['grade', 'coin_award', 'course_assignment', 'broadcast', 'error', 'sla_warning', 'query_assigned'],
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    maxlength: 500
  },
  link: {
    type: String,
    // Deep link URL (e.g., "/student/submissions/sub456")
  },
  read: {
    type: Boolean,
    default: false,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  readAt: {
    type: Date
  }
});

// Compound index for efficient queries
NotificationSchema.index({ recipientId: 1, read: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', NotificationSchema);
```

---

## 6. File Paths

```
frontend/src/components/common/
├── Toast.jsx                        # Individual toast notification
└── ToastContainer.jsx               # Container for stacking toasts

frontend/src/components/notifications/
├── NotificationDropdown.jsx         # Dropdown panel
├── NotificationList.jsx             # Full-page notification list
└── NotificationItem.jsx             # Individual notification card

frontend/src/contexts/
└── ToastContext.jsx                 # Toast context provider

frontend/src/hooks/
├── useToast.js                      # Hook to trigger toasts
└── useNotifications.js              # Hook for notifications (WebSocket/polling)

backend/controllers/
└── notificationController.js        # Notification API endpoints

backend/services/
└── notificationService.js           # Notification creation & management

backend/models/
└── Notification.js                  # Notification schema

frontend/tests/e2e/
└── notifications.spec.js            # E2E tests
```

---

## 7. Definition of Done

- [ ] Toast notifications display for all 4 types (Success, Info, Warning, Error)
- [ ] Toast auto-dismisses after 5 seconds
- [ ] Bell icon shows unread count in Title Bar
- [ ] Clicking bell icon opens notification dropdown
- [ ] Notification dropdown displays recent notifications (up to 10)
- [ ] Unread notifications have blue background
- [ ] Clicking notification marks as read
- [ ] "Clear All" button clears all notifications
- [ ] Full-page notification list displays all notifications
- [ ] Filter and search work correctly
- [ ] Deep links navigate to relevant pages
- [ ] Real-time updates via WebSocket or polling
- [ ] Unit tests: 80%+ coverage for notification logic
- [ ] E2E tests: Full notification workflow tested
- [ ] Code peer-reviewed
- [ ] Merged to `develop`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:50:59
- **Status:** Draft - Ready for Development

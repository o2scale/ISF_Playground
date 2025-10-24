# Epic 01 - Story 01: Student Homepage & Course Navigation

**Story ID:** SPRINT2-E01-S01
**Epic:** Epic 01 - LMS Student Experience
**Story:** Student Homepage & Course Navigation
**Priority:** Critical (P0)
**Estimated Effort:** 6-8 hours
**Assigned To:** [Dev Team]
**Status:** Ready for Development
**Created:** 2025-10-24 13:58:09
**Last Updated:** 2025-10-24 14:07:46 (Added visual layout diagrams)

---

## 1. Story Description

Create the student homepage as the primary navigation hub for all learning activities. The page includes:
- **Title Bar:** Persistent header with ISF Coin balance (real-time), notification bell with unread count, session timer
- **Toolbar:** Emotion tracking buttons (😊 😢 😡), Voice Chat button (opens Amma communication), Homework view, Help button
- **Course Category Cards:** 4 main course buttons (Computer Apps, Art, Spoken English, Life Skills) with distinct colors
- **Resume Last Activity Card:** Shows the last incomplete task with progress percentage
- **SPA-Style Navigation:** No page reloads, smooth transitions

### User Story
**As a** Student
**I want** to see all available courses and my coin balance on the homepage
**So that** I can easily navigate to courses and track my progress

---

## 1.5. Visual Layout Diagrams

### 1.5.1. Full Page Layout (Desktop 1366x768)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [ISF Logo] ISF Playground        [💰 1,250] [🔔 3] [⏱️ 00:45:32]              │ │ ← Title Bar (72px height)
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │    [😊] [😢] [😡]  [🎤 Chat with Amma]  [📚 Homework 2]  [❓ Help]          │ │ ← Toolbar (64px height)
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────────┐    │
│  │ Continue where you left off                                                 │    │
│  │ Computer Apps - Typing Game Level 3                [▶️ Continue]            │    │ ← Resume Card
│  │ Progress: ████████████████░░░░░░░░ 80%                                      │    │   (if exists)
│  └─────────────────────────────────────────────────────────────────────────────┘    │
│                                                                                       │
│     ┌─────────────────────────────┐  ┌─────────────────────────────┐               │
│     │         💻                  │  │         🎨                  │               │
│     │    Computer Apps            │  │         Art                 │               │
│     │                             │  │                             │               │
│     │ ████████░░░░░░░░ 37%        │  │ ████░░░░░░░░░░░ 24%         │               │
│     │ 45 of 120 tasks             │  │ 12 of 50 tasks              │               │
│     └─────────────────────────────┘  └─────────────────────────────┘               │
│                                                                                       │ ← Course Grid
│     ┌─────────────────────────────┐  ┌─────────────────────────────┐               │   (2x2 layout)
│     │         🗣️                  │  │         🌟                  │               │
│     │    Spoken English           │  │      Life Skills            │               │
│     │                             │  │                             │               │
│     │ █████░░░░░░░░░░ 25%         │  │ ██████████░░░░ 50%          │               │
│     │ 20 of 80 tasks              │  │ 30 of 60 tasks              │               │
│     └─────────────────────────────┘  └─────────────────────────────┘               │
│                                                                                       │
│                                                                                       │
└───────────────────────────────────────────────────────────────────────────────────────┘
                    Desktop View (1366x768) - Max Width 1024px Container
```

---

### 1.5.2. Title Bar Detailed Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  LEFT SECTION (Logo + Title)              RIGHT SECTION (Coin, Bell, Timer)         │
│  ┌──────────────────────────┐             ┌──────────────────────────────────────┐  │
│  │                          │             │                                      │  │
│  │  [Logo]                  │             │  ┌──────────────┐  ┌────┐  ┌─────┐  │  │
│  │  (32px × 32px)           │             │  │ 💰 1,250     │  │🔔 3│  │⏱️...│  │  │
│  │                          │             │  │ Gold BG      │  │Red │  │Gray │  │  │
│  │  ISF Playground          │             │  │ Rounded-full │  │Dot │  │Text │  │  │
│  │  (hidden on mobile)      │             │  └──────────────┘  └────┘  └─────┘  │  │
│  │                          │             │   Coin Balance     Bell     Timer    │  │
│  └──────────────────────────┘             └──────────────────────────────────────┘  │
│                                                                                       │
│  Spacing: px-6 (24px left/right padding)                                            │
│  Height: py-3 (12px top/bottom) = Total 72px                                        │
│  Background: White, Border-bottom: Gray-200                                         │
│  Position: Sticky top-0, z-50                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

**Title Bar Measurements:**
- **Total Height:** 72px (py-3 = 12px top + 48px content + 12px bottom)
- **Logo Size:** 32px × 32px (h-8)
- **Coin Balance:** Yellow-100 background, yellow-300 border, rounded-full, px-4 py-2
- **Bell Badge:** Red-500 background, white text, 20px × 20px circle, positioned absolute
- **Timer:** Gray-700 text, medium font weight

---

### 1.5.3. Toolbar Detailed Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                          CENTERED TOOLBAR CONTENT                                    │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                              │   │
│  │  ┌────────────────┐  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │ 😊  😢  😡    │  │ 🎤 Chat     │  │ 📚 Homework │  │ ❓ Help      │  │   │
│  │  │ Emotion Pills  │  │ with Amma   │  │    [2]      │  │              │  │   │
│  │  │ (White BG)     │  │ (Blue BG)   │  │ (White BG)  │  │ (White BG)   │  │   │
│  │  └────────────────┘  └─────────────┘  └──────────────┘  └──────────────┘  │   │
│  │                                                                              │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  Background: Gray-50, Border-bottom: Gray-200                                       │
│  Height: 64px (py-3 = 12px top + 40px content + 12px bottom)                       │
│  Content: Centered with gap-4 between elements                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

**Toolbar Measurements:**
- **Total Height:** 64px
- **Emotion Pills Container:** White BG, px-4 py-2, rounded-lg, border gray-200
- **Each Emoji Button:** 48px × 48px (p-2 = 8px padding + 32px emoji)
- **Voice Chat Button:** Blue-600 BG, white text, px-4 py-2, rounded-lg
- **Homework/Help Buttons:** White BG, gray-300 border, px-4 py-2, rounded-lg
- **Badge (Homework):** Red-500, 20px × 20px, absolute positioning top-right

---

### 1.5.4. Course Category Card Detailed Layout

```
┌───────────────────────────────────────────┐
│                                           │
│              💻                           │  ← Icon (64px × 64px)
│         (64px emoji)                      │     text-6xl, centered
│                                           │
│        Computer Apps                      │  ← Title (text-xl, bold)
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │████████████░░░░░░░░░░░░░░░░░░░░░░░░│ │  ← Progress Bar
│  └─────────────────────────────────────┘ │     (12px height, rounded-full)
│                                           │
│        45 of 120 tasks completed          │  ← Stats (text-sm)
│              37% complete                 │     (text-xs, gray-600)
│                                           │
└───────────────────────────────────────────┘
    Width: 100% (min 280px, max 400px)
    Height: 200px minimum
    Padding: p-6 (24px all sides)
    Border: 2px border-orange-300
    Background: orange-100
    Hover: orange-200
    Rounded: rounded-xl (12px)
    Cursor: pointer
```

**Card Color Variations:**
- **Computer Apps:** orange-100 BG, orange-300 border, orange-600 progress bar
- **Art:** pink-100 BG, pink-300 border, pink-600 progress bar
- **Spoken English:** blue-100 BG, blue-300 border, blue-600 progress bar
- **Life Skills:** green-100 BG, green-300 border, green-600 progress bar

**Card Measurements:**
- **Icon:** 64px × 64px (text-6xl emoji)
- **Title:** text-xl (20px), font-bold, mb-3 (12px margin bottom)
- **Progress Bar Container:** white BG, 12px height, rounded-full, border gray-300
- **Progress Fill:** colored BG, full height, rounded-full, dynamic width
- **Stats Text:** text-sm (14px) for task count, text-xs (12px) for percentage

---

### 1.5.5. Resume Last Activity Card Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  Continue where you left off                                     [▶️ Continue]       │
│                                                                   Blue-600 Button    │
│  Computer Apps - Typing Game Level 3                             px-6 py-3          │
│  (text-lg, font-bold, gray-900)                                  rounded-lg         │
│                                                                                       │
│  Progress: ████████████████████████░░░░░░░░░░░░ 80%                                 │
│            Blue-600 fill, white container, 12px height                               │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
    Width: 100% (max 896px container)
    Height: Auto (min 96px)
    Padding: p-6 (24px all sides)
    Border: 2px border-blue-300
    Background: blue-50
    Rounded: rounded-lg
```

**Resume Card Measurements:**
- **Height:** Auto-adjusting, minimum 96px
- **Label Text:** text-sm (14px), font-medium, blue-600
- **Task Title:** text-lg (18px), font-bold, gray-900
- **Progress Bar:** 12px height, blue-600 fill, white container
- **Continue Button:** Blue-600 BG, white text, px-6 py-3, rounded-lg, font-bold
- **Button Position:** Absolute right side, vertically centered

---

### 1.5.6. Responsive Layout Variations

#### **Desktop (1366x768 - Primary Target):**
```
┌────────────────────────────────────────────┐
│ Title Bar (Full width)                     │
│ Toolbar (Full width, all labels visible)  │
├────────────────────────────────────────────┤
│ Resume Card (if exists)                    │
├─────────────────┬──────────────────────────┤
│  Computer Apps  │    Art                   │
│  (Orange)       │    (Pink)                │
├─────────────────┼──────────────────────────┤  ← 2x2 Grid
│  Spoken English │    Life Skills           │
│  (Blue)         │    (Green)               │
└─────────────────┴──────────────────────────┘
        Grid: grid-cols-2, gap-6
        Container: max-w-4xl (896px)
```

#### **Tablet (768px - 1023px):**
```
┌─────────────────────────────────────────────┐
│ Title Bar (Compact, some text hidden)      │
│ Toolbar (Icons only, labels hidden)        │
├─────────────────────────────────────────────┤
│ Resume Card (full width)                    │
├─────────────────────────────────────────────┤
│  Computer Apps                              │
│  (Orange, full width)                       │
├─────────────────────────────────────────────┤  ← 1x4 Grid
│  Art                                        │
│  (Pink, full width)                         │
├─────────────────────────────────────────────┤
│  Spoken English                             │
├─────────────────────────────────────────────┤
│  Life Skills                                │
└─────────────────────────────────────────────┘
        Grid: grid-cols-1, gap-4
        Container: max-w-2xl (672px)
```

#### **Mobile (< 768px):**
```
┌──────────────────────────┐
│ Title Bar (Minimal)      │
│ [Logo] [💰][🔔][⏱️]     │
├──────────────────────────┤
│ Toolbar (Icons only)     │
│ [😊][😢][😡][🎤][📚]   │
├──────────────────────────┤
│ Resume Card (compact)    │
├──────────────────────────┤
│  Computer Apps           │
│  (Full width)            │
├──────────────────────────┤  ← Stacked 1x4
│  Art                     │
├──────────────────────────┤
│  Spoken English          │
├──────────────────────────┤
│  Life Skills             │
└──────────────────────────┘
    Grid: grid-cols-1, gap-4
    Padding: px-4 (reduced)
    Cards: Smaller height (160px)
```

**Responsive Breakpoints:**
- **xl (1280px+):** 2x2 grid, max-w-4xl container, all labels visible
- **md (768px - 1279px):** 1x4 grid stacked, max-w-2xl container, some labels hidden
- **sm (< 768px):** 1x4 grid stacked, full width, icons only

---

### 1.5.7. Component Spacing & Measurements Summary

| Element | Width | Height | Padding | Margin | Border |
|---------|-------|--------|---------|--------|--------|
| Title Bar | 100% | 72px | px-6 py-3 | - | border-b gray-200 |
| Toolbar | 100% | 64px | px-6 py-3 | - | border-b gray-200 |
| Resume Card | Max 896px | Auto (min 96px) | p-6 | mb-6 | 2px blue-300 |
| Course Card | 100% (min 280px) | 200px | p-6 | gap-6 | 2px (color-300) |
| Coin Balance | Auto | 40px | px-4 py-2 | gap-2 | 2px yellow-300 |
| Notification Bell | 40px | 40px | p-2 | - | - |
| Emotion Button | 48px | 48px | p-2 | - | - |
| Voice Chat Button | Auto | 40px | px-4 py-2 | - | - |

---

## 2. Acceptance Criteria

### 2.1. Title Bar
- [ ] **AC-01:** Title Bar displays ISF Playground logo on the left
- [ ] **AC-02:** Coin balance displays with gold coin icon and real-time count (e.g., "💰 1,250")
- [ ] **AC-03:** Coin balance updates within 2 seconds of earning coins (WebSocket or polling)
- [ ] **AC-04:** Notification bell icon displays unread count badge (e.g., "🔔 3")
- [ ] **AC-05:** Clicking notification bell opens notification center dropdown
- [ ] **AC-06:** Session timer displays in HH:MM:SS format (e.g., "⏱️ 00:45:32")
- [ ] **AC-07:** Session timer updates every second
- [ ] **AC-08:** Session timer resets daily at midnight

### 2.2. Toolbar
- [ ] **AC-09:** Emotion tracking buttons display 3 emojis: Happy (😊), Sad (😢), Angry (😡)
- [ ] **AC-10:** Clicking emotion button saves emotion to database with timestamp
- [ ] **AC-11:** Selected emotion button highlights with blue background
- [ ] **AC-12:** Voice Chat button opens Amma communication modal
- [ ] **AC-13:** Homework button displays count badge if pending homework exists
- [ ] **AC-14:** Help button opens contextual help modal

### 2.3. Course Category Cards
- [ ] **AC-15:** 4 course category cards display: Computer Apps (orange), Art (pink), Spoken English (blue), Life Skills (green)
- [ ] **AC-16:** Each card displays icon, title, total tasks, completed tasks, progress percentage
- [ ] **AC-17:** Clicking card navigates to respective course page
- [ ] **AC-18:** Card hover effect: background darkens, cursor changes to pointer
- [ ] **AC-19:** Cards display in 2x2 grid on desktop (1366x768), 2x1 grid on tablets, 1x1 grid on mobile

### 2.4. Resume Last Activity Card
- [ ] **AC-20:** Card displays if student has incomplete task (status = "in_progress")
- [ ] **AC-21:** Card shows course type, task title, progress percentage, "Continue" button
- [ ] **AC-22:** Clicking "Continue" button navigates to task page
- [ ] **AC-23:** Card does not display if no incomplete tasks exist

### 2.5. Offline Mode
- [ ] **AC-24:** Offline indicator displays when no internet connection
- [ ] **AC-25:** Coin balance displays last known value with "(Offline)" label
- [ ] **AC-26:** Course cards remain interactive offline (if content cached)
- [ ] **AC-27:** Emotion tracking works offline, syncs when online

### 2.6. Performance
- [ ] **AC-28:** Homepage loads within 2 seconds
- [ ] **AC-29:** Navigation to course page completes within 500ms
- [ ] **AC-30:** Session timer updates do not cause visible lag

---

## 3. Task Breakdown (18 tasks)

### Phase 1: Title Bar Implementation (Tasks 1-6)

**Task 1: Create TitleBar Component Structure**
- File: `frontend/src/components/student/TitleBar.js`
- Create functional component with flexbox layout
- Add ISF Playground logo (left)
- Add coin balance, notification bell, session timer (right)
- **Estimated Time:** 30 minutes

**Task 2: Implement Real-Time Coin Balance Display**
- Fetch initial coin balance from API on component mount
- Set up WebSocket connection or polling (every 10 seconds)
- Update coin balance state when new coins earned
- Display coin icon (💰) and count with gold background
- **Estimated Time:** 45 minutes

**Task 3: Implement Notification Bell with Unread Count**
- Fetch unread notification count from API
- Display bell icon (🔔) with badge showing count
- Update count when new notifications arrive
- Clicking bell opens notification center dropdown (link to Story 06 - Epic 05)
- **Estimated Time:** 30 minutes

**Task 4: Implement Session Timer**
- Calculate session start time from student login timestamp
- Use setInterval to update timer every second
- Display in HH:MM:SS format (e.g., "00:45:32")
- Reset timer at midnight (check localStorage for last reset date)
- **Estimated Time:** 30 minutes

**Task 5: Style Title Bar with Tailwind CSS**
- Apply sticky positioning (top-0, z-50)
- White background with gray bottom border
- Responsive padding and spacing
- Ensure Title Bar persists across all student pages
- **Estimated Time:** 20 minutes

**Task 6: Add Title Bar to Student Layout Component**
- Create StudentLayout component wrapper
- Include TitleBar as persistent header
- Include Toolbar below Title Bar
- Test navigation: Title Bar should remain visible across all pages
- **Estimated Time:** 20 minutes

---

### Phase 2: Toolbar Implementation (Tasks 7-9)

**Task 7: Create Toolbar Component with Emotion Tracking**
- File: `frontend/src/components/student/Toolbar.js`
- Create 3 emotion buttons: Happy (😊), Sad (😢), Angry (😡)
- Clicking button saves emotion to API: `POST /api/v2/lms/student/:studentId/emotion`
- Highlight selected emotion with blue background
- **Estimated Time:** 30 minutes

**Task 8: Add Voice Chat Button to Toolbar**
- Create Voice Chat button with microphone icon (🎤)
- Clicking button opens Amma communication modal (link to Epic 05 Story 02)
- Display "Chat with Amma" tooltip on hover
- **Estimated Time:** 20 minutes

**Task 9: Add Homework and Help Buttons to Toolbar**
- Create Homework button with book icon (📚)
- Display count badge if pending homework exists
- Clicking Homework button navigates to `/student/homework`
- Create Help button with question icon (❓)
- Clicking Help button opens contextual help modal
- **Estimated Time:** 30 minutes

---

### Phase 3: Course Category Cards (Tasks 10-13)

**Task 10: Create CourseCategoryCard Component**
- File: `frontend/src/components/student/CourseCategoryCard.js`
- Accept props: `courseType`, `icon`, `color`, `totalTasks`, `completedTasks`
- Display icon (top), title (center), progress bar (bottom)
- Calculate progress percentage: `(completedTasks / totalTasks) * 100`
- **Estimated Time:** 30 minutes

**Task 11: Fetch Course Progress Data from API**
- API endpoint: `GET /api/v2/lms/student/:studentId/dashboard`
- Response includes array of courses with progress data
- Store in React state
- Handle loading state (skeleton cards)
- Handle error state (error message with retry button)
- **Estimated Time:** 30 minutes

**Task 12: Render 4 Course Category Cards**
- Create grid layout: 2x2 on desktop, 2x1 on tablets, 1x1 on mobile
- Map through course data and render CourseCategoryCard for each
- Apply distinct colors: Computer Apps (orange-100/300), Art (pink-100/300), Spoken English (blue-100/300), Life Skills (green-100/300)
- **Estimated Time:** 20 minutes

**Task 13: Add Click Navigation to Course Pages**
- Use React Router's `useNavigate` hook
- Clicking Computer Apps card → `/student/course/computer-apps`
- Clicking Art card → `/student/course/art`
- Clicking Spoken English card → `/student/course/spoken-english`
- Clicking Life Skills card → `/student/course/life-skills`
- **Estimated Time:** 15 minutes

---

### Phase 4: Resume Last Activity Card (Tasks 14-15)

**Task 14: Create ResumeActivityCard Component**
- File: `frontend/src/components/student/ResumeActivityCard.js`
- Accept props: `courseType`, `taskTitle`, `progress`, `taskId`
- Display course icon, task title, progress bar, "Continue" button
- Only render if `lastActivity` exists in API response
- **Estimated Time:** 30 minutes

**Task 15: Add Click Handler to Navigate to Task**
- Clicking "Continue" button navigates to task page
- Route: `/student/course/:courseType/task/:taskId`
- Pass task context via state (avoid refetching)
- **Estimated Time:** 15 minutes

---

### Phase 5: Offline Mode Support (Tasks 16-17)

**Task 16: Implement Offline Indicator**
- Listen to `window.online` and `window.offline` events
- Display offline banner at top of page (yellow background, warning icon)
- Update coin balance label to show "(Offline)" when offline
- Cache course data in localStorage for offline access
- **Estimated Time:** 30 minutes

**Task 17: Sync Offline Emotion Data When Online**
- Store emotion tracking data in localStorage if offline
- When online event fires, check localStorage for pending syncs
- Send all offline emotions to API: `POST /api/v2/lms/student/:studentId/emotions/batch`
- Clear localStorage after successful sync
- **Estimated Time:** 30 minutes

---

### Phase 6: Testing & Polish (Task 18)

**Task 18: End-to-End Testing and Responsive Design Testing**
- Test on 1366x768 resolution (primary target)
- Test on 1920x1080 (desktop)
- Test on 768x1024 (tablet)
- Test responsive grid layout for course cards
- Test offline mode: disconnect internet, verify offline indicator, test emotion sync
- Test real-time coin balance updates (mock API or WebSocket)
- Fix any visual bugs or layout issues
- **Estimated Time:** 1 hour

---

## 4. Detailed Frontend Specification

### 4.1. Component Hierarchy

```
StudentDashboardPage
├── StudentLayout
│   ├── TitleBar
│   │   ├── Logo
│   │   ├── CoinBalance
│   │   ├── NotificationBell
│   │   └── SessionTimer
│   ├── Toolbar
│   │   ├── EmotionButtons (Happy, Sad, Angry)
│   │   ├── VoiceChatButton
│   │   ├── HomeworkButton
│   │   └── HelpButton
│   └── {children}
└── StudentHomepageContent
    ├── ResumeActivityCard (conditional)
    └── CourseGrid
        ├── CourseCategoryCard (Computer Apps)
        ├── CourseCategoryCard (Art)
        ├── CourseCategoryCard (Spoken English)
        └── CourseCategoryCard (Life Skills)
```

---

### 4.2. Component Specifications

#### **TitleBar Component**

**File:** `frontend/src/components/student/TitleBar.js`

**Props:** None (fetches data internally)

**State:**
```javascript
const [coinBalance, setCoinBalance] = useState(0);
const [unreadCount, setUnreadCount] = useState(0);
const [sessionTime, setSessionTime] = useState(0); // seconds
const [isOffline, setIsOffline] = useState(!navigator.onLine);
```

**JSX:**
```jsx
<header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3">
  <div className="flex items-center justify-between max-w-7xl mx-auto">
    {/* Left: Logo */}
    <div className="flex items-center gap-3">
      <img
        src="/logo.png"
        alt="ISF Playground"
        className="h-8 w-auto"
      />
      <h1 className="text-xl font-bold text-gray-900 hidden md:block">
        ISF Playground
      </h1>
    </div>

    {/* Right: Coin Balance, Notifications, Session Timer */}
    <div className="flex items-center gap-4 md:gap-6">
      {/* Coin Balance */}
      <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
        <span className="text-2xl">💰</span>
        <span className="font-bold text-xl text-gray-900">
          {coinBalance.toLocaleString()}
        </span>
        {isOffline && (
          <span className="text-xs text-gray-600 ml-1">(Offline)</span>
        )}
      </div>

      {/* Notification Bell */}
      <button
        onClick={handleNotificationClick}
        className="relative hover:bg-gray-100 p-2 rounded-full transition-colors"
        aria-label="Notifications"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Session Timer */}
      <div className="flex items-center gap-2 text-gray-700">
        <span className="text-xl">⏱️</span>
        <span className="font-medium text-base hidden sm:block">
          {formatTime(sessionTime)}
        </span>
      </div>
    </div>
  </div>

  {/* Offline Banner */}
  {isOffline && (
    <div className="bg-yellow-200 border-t border-yellow-300 px-6 py-2 text-center">
      <span className="text-sm font-medium text-gray-800">
        ⚠️ You are offline. Some features may not work.
      </span>
    </div>
  )}
</header>
```

**Helper Functions:**
```javascript
// Format session time as HH:MM:SS
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};
```

**Effects:**
```javascript
useEffect(() => {
  // Fetch initial coin balance
  fetchCoinBalance();

  // Set up coin balance polling (every 10 seconds)
  const coinInterval = setInterval(fetchCoinBalance, 10000);

  // Set up session timer (every 1 second)
  const timerInterval = setInterval(() => {
    setSessionTime(prev => prev + 1);
  }, 1000);

  // Offline/Online listeners
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    clearInterval(coinInterval);
    clearInterval(timerInterval);
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}, []);
```

**Accessibility:**
- ARIA label for notification button
- Focus visible styles on interactive elements
- Keyboard navigation support

---

#### **Toolbar Component**

**File:** `frontend/src/components/student/Toolbar.js`

**Props:** None

**State:**
```javascript
const [selectedEmotion, setSelectedEmotion] = useState(null);
const [homeworkCount, setHomeworkCount] = useState(0);
```

**JSX:**
```jsx
<div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
  <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto">
    {/* Emotion Tracking Buttons */}
    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
      <button
        onClick={() => handleEmotionClick('happy')}
        className={`text-3xl p-2 rounded-lg transition-colors ${
          selectedEmotion === 'happy'
            ? 'bg-blue-100 ring-2 ring-blue-500'
            : 'hover:bg-gray-100'
        }`}
        aria-label="I'm feeling happy"
      >
        😊
      </button>
      <button
        onClick={() => handleEmotionClick('sad')}
        className={`text-3xl p-2 rounded-lg transition-colors ${
          selectedEmotion === 'sad'
            ? 'bg-blue-100 ring-2 ring-blue-500'
            : 'hover:bg-gray-100'
        }`}
        aria-label="I'm feeling sad"
      >
        😢
      </button>
      <button
        onClick={() => handleEmotionClick('angry')}
        className={`text-3xl p-2 rounded-lg transition-colors ${
          selectedEmotion === 'angry'
            ? 'bg-blue-100 ring-2 ring-blue-500'
            : 'hover:bg-gray-100'
        }`}
        aria-label="I'm feeling angry"
      >
        😡
      </button>
    </div>

    {/* Voice Chat Button */}
    <button
      onClick={handleVoiceChatClick}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
    >
      <span className="text-xl">🎤</span>
      <span className="hidden sm:inline">Chat with Amma</span>
    </button>

    {/* Homework Button */}
    <button
      onClick={() => navigate('/student/homework')}
      className="relative flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
    >
      <span className="text-xl">📚</span>
      <span className="hidden sm:inline">Homework</span>
      {homeworkCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {homeworkCount}
        </span>
      )}
    </button>

    {/* Help Button */}
    <button
      onClick={handleHelpClick}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
    >
      <span className="text-xl">❓</span>
      <span className="hidden sm:inline">Help</span>
    </button>
  </div>
</div>
```

**Event Handlers:**
```javascript
const handleEmotionClick = async (emotion) => {
  setSelectedEmotion(emotion);

  // Save emotion to API
  try {
    await axios.post(`/api/v2/lms/student/${studentId}/emotion`, {
      emotion,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to save emotion:', error);
    // If offline, save to localStorage for later sync
    if (!navigator.onLine) {
      const offlineEmotions = JSON.parse(localStorage.getItem('offlineEmotions') || '[]');
      offlineEmotions.push({ emotion, timestamp: new Date().toISOString() });
      localStorage.setItem('offlineEmotions', JSON.stringify(offlineEmotions));
    }
  }
};
```

---

#### **CourseCategoryCard Component**

**File:** `frontend/src/components/student/CourseCategoryCard.js`

**Props:**
```typescript
interface CourseCategoryCardProps {
  courseType: 'Computer Apps' | 'Art' | 'Spoken English' | 'Life Skills';
  icon: string;
  color: 'orange' | 'pink' | 'blue' | 'green';
  totalTasks: number;
  completedTasks: number;
  onClick: () => void;
}
```

**JSX:**
```jsx
<div
  onClick={onClick}
  className={`
    bg-${color}-100 border-2 border-${color}-300 rounded-xl p-6
    cursor-pointer hover:bg-${color}-200 transition-colors shadow-sm
    flex flex-col items-center justify-center min-h-[200px]
  `}
>
  {/* Icon */}
  <div className={`text-6xl mb-4 text-${color}-600`}>
    {icon}
  </div>

  {/* Title */}
  <h3 className="text-center font-bold text-xl text-gray-900 mb-3">
    {courseType}
  </h3>

  {/* Progress Bar */}
  <div className="w-full bg-white rounded-full h-3 mb-2 border border-gray-300">
    <div
      className={`bg-${color}-600 h-full rounded-full transition-all duration-300`}
      style={{ width: `${progress}%` }}
    />
  </div>

  {/* Progress Text */}
  <p className="text-sm text-gray-700">
    {completedTasks} of {totalTasks} tasks completed
  </p>
  <p className="text-xs text-gray-600 mt-1">
    {progress}% complete
  </p>
</div>
```

**Note:** Since Tailwind doesn't support dynamic color classes, we'll need to use inline styles or predefined classes:

```jsx
const colorClasses = {
  orange: {
    bg: 'bg-orange-100',
    bgHover: 'hover:bg-orange-200',
    border: 'border-orange-300',
    text: 'text-orange-600',
    progressBg: 'bg-orange-600'
  },
  pink: {
    bg: 'bg-pink-100',
    bgHover: 'hover:bg-pink-200',
    border: 'border-pink-300',
    text: 'text-pink-600',
    progressBg: 'bg-pink-600'
  },
  // ... etc
};

const colors = colorClasses[color];

<div className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 cursor-pointer ${colors.bgHover} transition-colors shadow-sm flex flex-col items-center justify-center min-h-[200px]`}>
  {/* ... */}
</div>
```

---

#### **ResumeActivityCard Component**

**File:** `frontend/src/components/student/ResumeActivityCard.js`

**Props:**
```typescript
interface ResumeActivityCardProps {
  courseType: string;
  taskTitle: string;
  progress: number;
  taskId: string;
  onContinue: () => void;
}
```

**JSX:**
```jsx
<div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-6 shadow-sm">
  <div className="flex items-center justify-between">
    <div className="flex-1">
      <p className="text-sm font-medium text-blue-600 mb-1">
        Continue where you left off
      </p>
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {courseType} - {taskTitle}
      </h3>

      {/* Progress Bar */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 bg-white rounded-full h-3 border border-gray-300">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700">
          {progress}%
        </span>
      </div>
    </div>

    {/* Continue Button */}
    <button
      onClick={onContinue}
      className="ml-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md flex items-center gap-2"
    >
      <span>Continue</span>
      <span className="text-xl">▶️</span>
    </button>
  </div>
</div>
```

---

### 4.3. Responsive Behavior

**Breakpoints:**
- **Desktop (xl: 1280px+):** 2x2 grid for course cards, all toolbar text visible
- **Tablet (md: 768px - 1279px):** 2x1 grid for course cards, some toolbar text hidden
- **Mobile (sm: 640px - 767px):** 1x1 grid for course cards, icons only on toolbar

**Grid Layout:**
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 max-w-4xl mx-auto">
  {courses.map(course => (
    <CourseCategoryCard key={course.type} {...course} />
  ))}
</div>
```

---

### 4.4. Loading & Error States

**Loading State (Skeleton):**
```jsx
{isLoading && (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 max-w-4xl mx-auto">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="bg-gray-200 rounded-xl animate-pulse h-[200px]" />
    ))}
  </div>
)}
```

**Error State:**
```jsx
{error && (
  <div className="text-center py-12">
    <p className="text-red-600 font-semibold mb-4">
      Oops! Something went wrong loading your courses.
    </p>
    <button
      onClick={retry}
      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
    >
      Try Again
    </button>
  </div>
)}
```

**Empty State (No courses assigned):**
```jsx
{courses.length === 0 && !isLoading && (
  <div className="text-center py-12">
    <span className="text-6xl mb-4 block">📚</span>
    <p className="text-gray-600 font-medium">
      No courses assigned yet. Check back soon!
    </p>
  </div>
)}
```

---

## 5. API Endpoints

### 5.1. Student Dashboard Data

**Endpoint:** `GET /api/v2/lms/student/:studentId/dashboard`

**Response:**
```json
{
  "student": {
    "id": "student123",
    "name": "Ravi Kumar",
    "coinBalance": 1250,
    "sessionStartTime": "2025-10-24T08:00:00Z"
  },
  "notifications": {
    "unreadCount": 3,
    "recent": [
      {
        "id": "notif1",
        "message": "Coach Priya graded your artwork!",
        "timestamp": "2025-10-24T10:30:00Z",
        "read": false
      }
    ]
  },
  "lastActivity": {
    "courseType": "Computer Apps",
    "taskTitle": "Typing Game - Level 3",
    "progress": 80,
    "taskId": "task456"
  },
  "courses": [
    {
      "type": "Computer Apps",
      "icon": "💻",
      "color": "orange",
      "totalTasks": 120,
      "completedTasks": 45,
      "progress": 37.5
    },
    {
      "type": "Art",
      "icon": "🎨",
      "color": "pink",
      "totalTasks": 50,
      "completedTasks": 12,
      "progress": 24.0
    },
    {
      "type": "Spoken English",
      "icon": "🗣️",
      "color": "blue",
      "totalTasks": 80,
      "completedTasks": 20,
      "progress": 25.0
    },
    {
      "type": "Life Skills",
      "icon": "🌟",
      "color": "green",
      "totalTasks": 60,
      "completedTasks": 30,
      "progress": 50.0
    }
  ]
}
```

### 5.2. Save Emotion Tracking

**Endpoint:** `POST /api/v2/lms/student/:studentId/emotion`

**Request Body:**
```json
{
  "emotion": "happy",
  "timestamp": "2025-10-24T14:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Emotion saved successfully"
}
```

### 5.3. Batch Sync Offline Emotions

**Endpoint:** `POST /api/v2/lms/student/:studentId/emotions/batch`

**Request Body:**
```json
{
  "emotions": [
    {
      "emotion": "happy",
      "timestamp": "2025-10-24T14:30:00Z"
    },
    {
      "emotion": "sad",
      "timestamp": "2025-10-24T15:00:00Z"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "synced": 2,
  "message": "2 emotions synced successfully"
}
```

---

## 6. Database Considerations

**EmotionTracking Collection (New):**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  emotion: String,              // "happy", "sad", "angry"
  timestamp: Date,
  syncedFromOffline: Boolean,   // true if synced from offline storage
  createdAt: Date
}
```

**Create index for efficient queries:**
```javascript
db.emotionTracking.createIndex({ studentId: 1, timestamp: -1 });
```

---

## 7. File Paths

**Frontend Files to Create/Modify:**
- `frontend/src/pages/student/StudentDashboardPage.js` (Main page)
- `frontend/src/components/student/StudentLayout.js` (Layout wrapper)
- `frontend/src/components/student/TitleBar.js` (Title bar component)
- `frontend/src/components/student/Toolbar.js` (Toolbar component)
- `frontend/src/components/student/CourseCategoryCard.js` (Course card component)
- `frontend/src/components/student/ResumeActivityCard.js` (Resume card component)

**Backend Files to Create/Modify:**
- `backend/routes/v2/lms/student.js` (Student routes)
- `backend/controllers/studentDashboardController.js` (Dashboard controller)
- `backend/models/EmotionTracking.js` (Emotion tracking model)

**Styles:**
- All styling done with Tailwind CSS inline classes

---

## 8. Testing Checklist

### Unit Tests
- [ ] TitleBar component renders correctly
- [ ] Coin balance updates when props change
- [ ] Session timer increments every second
- [ ] Emotion button click calls API
- [ ] CourseCategoryCard calculates progress correctly

### Integration Tests
- [ ] Dashboard API returns correct data structure
- [ ] Emotion tracking API saves to database
- [ ] Offline emotions sync when online

### E2E Tests
- [ ] Student logs in → Dashboard loads within 2 seconds
- [ ] Click Computer Apps card → Navigates to Computer Apps page
- [ ] Click emotion button → Emotion saved to database
- [ ] Disconnect internet → Offline indicator appears
- [ ] Click Continue button → Navigates to task page

---

## 9. Definition of Done

- [ ] All 18 tasks completed
- [ ] All 30 acceptance criteria met
- [ ] Unit tests written and passing (80%+ coverage)
- [ ] E2E test written and passing
- [ ] Code reviewed by peer
- [ ] Tested on 1366x768 resolution
- [ ] Responsive design tested on tablet and mobile
- [ ] Offline mode tested
- [ ] Performance target met (homepage loads < 2 seconds)
- [ ] Accessibility checklist completed
- [ ] Documentation updated
- [ ] Merged to `feature/sprint-2` branch

---

## 10. Dependencies

- **Sprint 1.1 RBAC:** Student authentication must be complete
- **Sprint 1.1 FR:** Facial recognition login must be working
- **Epic 05 Story 02:** Voice Chat button links to Voice Communication Infrastructure (can be implemented as placeholder initially)

---

## 11. Notes & Assumptions

- Session timer resets daily at midnight (not on logout)
- Coin balance polling every 10 seconds (can upgrade to WebSocket for true real-time updates)
- Offline emotion tracking stored in localStorage (max 100 emotions, then FIFO queue)
- Course data cached in localStorage for 24 hours for offline access

---

**Status:** Ready for Development
**Last Updated:** 2025-10-24 13:58:09

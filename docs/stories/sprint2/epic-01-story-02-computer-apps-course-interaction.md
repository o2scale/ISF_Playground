# Epic 01 - Story 02: Computer Apps Course Interaction

**Story ID:** SPRINT2-E01-S02
**Epic:** Epic 01 - LMS Student Experience
**Story:** Computer Apps Course Interaction
**Priority:** Critical (P0)
**Estimated Effort:** 8-10 hours
**Assigned To:** [Dev Team]
**Status:** Ready for Development
**Created:** 2025-10-24 14:08:21
**Last Updated:** 2025-10-24 14:08:21

---

## 1. Story Description

Create the three-pane Computer Apps course interface where students can:
- **Pane 1 (Apps List):** Select from applications like MS Word, Excel, PowerPoint, Tux Typing, GCompris
- **Pane 2 (Levels List):** View levels within selected app with progress indicators
- **Pane 3 (Task Details):** View task information, launch external tools, track performance metrics, view leaderboard

This interface enables students to navigate through structured learning paths, launch educational tools, and compete with peers.

### User Story
**As a** Student
**I want** to navigate through Computer Apps tasks in a structured way
**So that** I can complete tasks, launch educational tools, and see how I rank against my peers

---

## 1.5. Visual Layout Diagrams

### 1.5.1. Full Three-Pane Layout (Desktop 1366x768)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ Title Bar (persistent from Story 01)                                                        │
│ Toolbar (persistent from Story 01)                                                          │
├──────────────┬───────────────────┬────────────────────────────────────────────────────────────┤
│   PANE 1     │     PANE 2        │                    PANE 3                                  │
│  Apps List   │   Levels List     │                 Task Details                               │
│  (240px)     │   (240px)         │                 (Flexible)                                 │
├──────────────┼───────────────────┼────────────────────────────────────────────────────────────┤
│              │                   │                                                            │
│ ┌──────────┐ │ ┌───────────────┐ │  Task: Create a Letter                                     │
│ │ MS Word  │◀├─│ Level 1       │◀├─                                                           │
│ │ ✓ (20)   │ │ │ ✓ (5/5 done)  │ │  ┌──────────────────────────────────────────────────────┐ │
│ └──────────┘ │ └───────────────┘ │  │ Performance:                                         │ │
│              │                   │  │ Time: 12 mins | Coins: 50 | Rank: #3                 │ │
│ ┌──────────┐ │ ┌───────────────┐ │  └──────────────────────────────────────────────────────┘ │
│ │ Excel    │ │ │ Level 2       │ │                                                            │
│ │ (15)     │ │ │ ⏳ (2/5 done) │ │  [Start Task] or [Open MS Word]                            │
│ └──────────┘ │ └───────────────┘ │                                                            │
│              │                   │  Leaderboard - Your Balagruha:                             │
│ ┌──────────┐ │ ┌───────────────┐ │  ┌──────────────────────────────────────────────────────┐ │
│ │PowerPoint│ │ │ Level 3       │ │  │ 1. Priya Singh - 1,500 coins                         │ │
│ │ (18)     │ │ │ 🔒 (locked)   │ │  │ 2. Amit Patel - 1,250 coins                          │ │
│ └──────────┘ │ └───────────────┘ │  │ 3. Ravi Kumar (You) - 1,100 coins                    │ │
│              │                   │  │ 4. Neha Gupta - 980 coins                            │ │
│ ┌──────────┐ │                   │  └──────────────────────────────────────────────────────┘ │
│ │TuxTyping │ │                   │                                                            │
│ │ (12)     │ │                   │  [View Full Leaderboard]                                   │
│ └──────────┘ │                   │                                                            │
│              │                   │                                                            │
│ ┌──────────┐ │                   │                                                            │
│ │ GCompris │ │                   │                                                            │
│ │ (10)     │ │                   │                                                            │
│ └──────────┘ │                   │                                                            │
│              │                   │                                                            │
└──────────────┴───────────────────┴────────────────────────────────────────────────────────────┘
          Pane widths: 240px | 240px | Flexible (min 500px)
          Borders: 1px gray-200 between panes
          Scrollable: Each pane independently scrollable
```

---

### 1.5.2. Pane 1 - Apps List Detailed Layout

```
┌────────────────────────────────┐
│   COMPUTER APPS                 │  ← Header (bg-orange-100)
│   (Orange header bar)           │     text-lg font-bold
├────────────────────────────────┤
│                                 │
│  ┌──────────────────────────┐  │  ← App Card (Active)
│  │ 📝 MS Word              │  │     bg-orange-50
│  │ Completed: 20 tasks     │  │     border-l-4 orange-600
│  │ ✓ All done!             │  │     Green checkmark
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │  ← App Card (In Progress)
│  │ 📊 Excel                │  │     bg-white
│  │ 8 of 15 tasks           │  │     border gray-200
│  │ ⏳ Keep going!           │  │     Progress icon
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │  ← App Card (Not Started)
│  │ 📽️ PowerPoint           │  │     bg-gray-50
│  │ 0 of 18 tasks           │  │     border gray-200
│  │ 🔒 Start learning!       │  │     Lock icon
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │ ⌨️ Tux Typing            │  │
│  │ 6 of 12 tasks           │  │
│  │ ⏳ Keep going!           │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │ 🎮 GCompris              │  │
│  │ 3 of 10 tasks           │  │
│  │ ⏳ Keep going!           │  │
│  └──────────────────────────┘  │
│                                 │
└────────────────────────────────┘
    Width: 240px
    Height: 100vh (scrollable)
    Padding: p-4
    Border-right: 1px gray-200
```

**App Card States:**
1. **Completed:** Green checkmark (✓), orange-50 background, orange-600 left border
2. **In Progress:** Hour glass (⏳), white background, gray-200 border
3. **Not Started:** Lock icon (🔒), gray-50 background, gray-200 border

---

### 1.5.3. Pane 2 - Levels List Detailed Layout

```
┌────────────────────────────────┐
│   MS WORD LEVELS                │  ← Header (bg-blue-100)
│   (Blue header bar)             │     text-lg font-bold
├────────────────────────────────┤
│                                 │
│  ┌──────────────────────────┐  │  ← Level Card (Completed)
│  │ Level 1: Basics         │  │     bg-green-50
│  │ 5 of 5 tasks            │  │     border-l-4 green-600
│  │ ✓ Completed!            │  │     Green checkmark
│  │ 250 coins earned        │  │     Coin count
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │  ← Level Card (In Progress)
│  │ Level 2: Formatting     │  │     bg-blue-50
│  │ 2 of 5 tasks            │  │     border-l-4 blue-600
│  │ ⏳ In Progress          │  │     Progress icon
│  │ Progress: ████░░ 40%    │  │     Progress bar
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │  ← Level Card (Locked)
│  │ Level 3: Advanced       │  │     bg-gray-100
│  │ 0 of 5 tasks            │  │     border gray-300
│  │ 🔒 Complete Level 2     │  │     Lock icon + message
│  │ to unlock               │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │ Level 4: Tables         │  │
│  │ 0 of 6 tasks            │  │
│  │ 🔒 Complete Level 3     │  │
│  │ to unlock               │  │
│  └──────────────────────────┘  │
│                                 │
└────────────────────────────────┘
    Width: 240px
    Height: 100vh (scrollable)
    Padding: p-4
    Border-right: 1px gray-200
```

**Level Card States:**
1. **Completed:** Green-50 background, green-600 left border, checkmark, coin count
2. **In Progress:** Blue-50 background, blue-600 left border, progress bar
3. **Locked:** Gray-100 background, gray-300 border, lock icon, unlock message

---

### 1.5.4. Pane 3 - Task Details Detailed Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TASK: CREATE A LETTER                                                      │  ← Task Title
│  (text-2xl font-bold gray-900)                                              │     text-2xl
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │ Performance Metrics:                                               │    │  ← Metrics Card
│  │ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │    │     bg-blue-50
│  │ │ ⏱️ 12 mins   │  │ 💰 50 coins  │  │ 🏆 Rank #3   │             │    │     border blue-200
│  │ │ Time Taken   │  │ Earned       │  │ in Balagruha │             │    │     rounded-lg
│  │ └──────────────┘  └──────────────┘  └──────────────┘             │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Instructions:                                                               │  ← Instructions
│  Open MS Word and create a formal letter. Use proper formatting:            │     text-base
│  - Heading with your name                                                    │     gray-700
│  - Date on the right                                                         │
│  - Greeting (Dear...)                                                        │
│  - Body (3 paragraphs)                                                       │
│  - Closing (Sincerely...)                                                    │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │ [Start Task in Browser]          [Open MS Word]                    │    │  ← Action Buttons
│  │ (Blue button)                    (Purple button)                   │    │     px-6 py-3
│  └────────────────────────────────────────────────────────────────────┘    │     rounded-lg
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │ LEADERBOARD - YOUR BALAGRUHA                                       │    │  ← Leaderboard
│  │                                                                    │    │     bg-yellow-50
│  │  Rank | Name          | Coins Earned | Time Taken                │    │     border yellow-200
│  │  ───────────────────────────────────────────────────────────────  │    │
│  │  🥇 1  | Priya Singh   | 1,500 coins  | 10 mins                  │    │
│  │  🥈 2  | Amit Patel    | 1,250 coins  | 11 mins                  │    │
│  │  🥉 3  | Ravi Kumar    | 1,100 coins  | 12 mins  ← YOU           │    │
│  │     4  | Neha Gupta    |   980 coins  | 13 mins                  │    │
│  │     5  | Suresh Kumar  |   850 coins  | 14 mins                  │    │
│  │                                                                    │    │
│  │  [View Full Leaderboard (Top 50)]                                 │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
    Width: Flexible (min 500px)
    Height: 100vh (scrollable)
    Padding: p-6
```

**Task Details Components:**
1. **Task Title:** text-2xl, font-bold, gray-900, mb-4
2. **Performance Metrics Card:** 3 stat boxes side-by-side, blue-50 background
3. **Instructions:** text-base, gray-700, line-height 1.6, mb-6
4. **Action Buttons:** Blue (Start Task) or Purple (Open External Tool)
5. **Leaderboard:** Yellow-50 background, table layout, highlight current user row

---

### 1.5.5. Responsive Layout Variations

#### **Desktop (1366x768):**
- Three panes visible: 240px | 240px | Flexible
- All content visible side-by-side

#### **Tablet (768px - 1023px):**
```
┌───────────────────────────────┐
│ [← Back] MS Word - Level 2    │  ← Breadcrumb Navigation
├───────────────────────────────┤
│                               │
│  Task: Create a Letter        │  ← Single Pane View
│                               │     (Task Details Only)
│  Performance Metrics          │
│  ┌──────────────────────────┐ │
│  │ Time | Coins | Rank      │ │
│  └──────────────────────────┘ │
│                               │
│  Instructions...              │
│                               │
│  [Start Task] [Open MS Word]  │
│                               │
│  Leaderboard...               │
│                               │
└───────────────────────────────┘
```
- **Collapsed Navigation:** Breadcrumb with back button
- **Single Pane:** Show task details only
- **Tap "Back":** Return to Levels List → Apps List

#### **Mobile (< 768px):**
- Full stack navigation
- Apps List → Levels List → Task Details (separate pages)
- Use React Router for navigation between views

---

### 1.5.6. Component Spacing & Measurements Summary

| Element | Width | Height | Padding | Margin | Border |
|---------|-------|--------|---------|--------|--------|
| Pane 1 (Apps List) | 240px | 100vh | p-4 | - | border-r gray-200 |
| Pane 2 (Levels List) | 240px | 100vh | p-4 | - | border-r gray-200 |
| Pane 3 (Task Details) | Flexible | 100vh | p-6 | - | - |
| App Card | 100% | Auto | p-3 | mb-2 | 1px gray-200 |
| Level Card | 100% | Auto | p-3 | mb-2 | 1px gray-200 |
| Performance Metrics | 100% | Auto | p-4 | mb-4 | 1px blue-200 |
| Leaderboard | 100% | Auto | p-4 | mt-6 | 1px yellow-200 |
| Action Button | Auto | 48px | px-6 py-3 | mr-2 | - |

---

## 2. Acceptance Criteria

### 2.1. Pane 1 - Apps List
- [ ] **AC-01:** Apps List displays all Computer Apps applications (MS Word, Excel, PowerPoint, Tux Typing, GCompris)
- [ ] **AC-02:** Each app card shows app name, icon, total tasks, completed tasks
- [ ] **AC-03:** Clicking app card loads levels in Pane 2
- [ ] **AC-04:** Completed apps display green checkmark (✓)
- [ ] **AC-05:** In-progress apps display hour glass (⏳)
- [ ] **AC-06:** Not-started apps display lock icon (🔒)
- [ ] **AC-07:** Pane 1 is independently scrollable

### 2.2. Pane 2 - Levels List
- [ ] **AC-08:** Levels List displays all levels for selected app
- [ ] **AC-09:** Each level card shows level name, total tasks, completed tasks, progress percentage
- [ ] **AC-10:** Clicking level card loads task details in Pane 3
- [ ] **AC-11:** Completed levels display green checkmark and coins earned
- [ ] **AC-12:** In-progress levels display progress bar
- [ ] **AC-13:** Locked levels display lock icon and unlock message ("Complete Level X to unlock")
- [ ] **AC-14:** Sequential unlocking: Level N unlocks only when Level N-1 is completed
- [ ] **AC-15:** Pane 2 is independently scrollable

### 2.3. Pane 3 - Task Details
- [ ] **AC-16:** Task details display task title, instructions, performance metrics
- [ ] **AC-17:** Performance metrics show time taken, coins earned, ranking position
- [ ] **AC-18:** "Start Task" button launches task in browser (if applicable)
- [ ] **AC-19:** "Open [Tool]" button launches external tool (MS Word, Tux Typing, etc.)
- [ ] **AC-20:** Leaderboard displays top 5 students in Balagruha
- [ ] **AC-21:** Current user's row is highlighted in leaderboard
- [ ] **AC-22:** "View Full Leaderboard" button expands to show top 50
- [ ] **AC-23:** Pane 3 is independently scrollable

### 2.4. External Tool Launch
- [ ] **AC-24:** Clicking "Open MS Word" launches MS Word via Electron IPC
- [ ] **AC-25:** Clicking "Open Tux Typing" launches Tux Typing via Electron IPC
- [ ] **AC-26:** Clicking "Open GCompris" launches GCompris via Electron IPC
- [ ] **AC-27:** Tool launch failure shows error message with retry button
- [ ] **AC-28:** Session duration tracked from tool launch to tool close

### 2.5. Progress Tracking
- [ ] **AC-29:** Completing task updates progress in all 3 panes
- [ ] **AC-30:** Completing all tasks in a level marks level as complete
- [ ] **AC-31:** Completing all levels in an app marks app as complete
- [ ] **AC-32:** Progress syncs with server (or queues offline)

### 2.6. Responsive Behavior
- [ ] **AC-33:** Desktop (1366x768): 3 panes visible side-by-side
- [ ] **AC-34:** Tablet (768px - 1023px): Single pane view with breadcrumb navigation
- [ ] **AC-35:** Mobile (< 768px): Full stack navigation between views

---

## 3. Task Breakdown (20 tasks)

### Phase 1: Three-Pane Layout Structure (Tasks 1-3)

**Task 1: Create ThreePaneLayout Component**
- File: `frontend/src/components/student/ThreePaneLayout.js`
- Create flex container with 3 sections: Apps, Levels, Tasks
- Set fixed widths for Pane 1 (240px) and Pane 2 (240px), flexible for Pane 3
- Add vertical borders between panes
- **Estimated Time:** 30 minutes

**Task 2: Make Each Pane Independently Scrollable**
- Apply `overflow-y: auto` to each pane
- Set height to `calc(100vh - [TitleBar+Toolbar height])`
- Test scroll behavior: scrolling one pane doesn't affect others
- **Estimated Time:** 20 minutes

**Task 3: Add Responsive Breakpoints**
- Desktop (>1280px): Show all 3 panes
- Tablet (768px - 1279px): Show single pane with breadcrumb navigation
- Mobile (<768px): Full stack navigation (separate pages)
- Use React state to track current view on tablet/mobile
- **Estimated Time:** 45 minutes

---

### Phase 2: Pane 1 - Apps List (Tasks 4-6)

**Task 4: Create AppCard Component**
- File: `frontend/src/components/student/computer-apps/AppCard.js`
- Accept props: `appName`, `icon`, `totalTasks`, `completedTasks`, `status`
- Display app icon, name, task progress, status indicator
- Calculate completion status: "completed", "in_progress", "not_started"
- **Estimated Time:** 30 minutes

**Task 5: Fetch Apps List from API**
- API endpoint: `GET /api/v2/lms/student/:studentId/courses/computer-apps`
- Response includes array of apps with progress data
- Store in React state
- Handle loading/error states
- **Estimated Time:** 30 minutes

**Task 6: Render Apps List in Pane 1**
- Map through apps array and render AppCard for each
- Add click handler to load levels in Pane 2
- Highlight selected app card (orange-100 background)
- **Estimated Time:** 20 minutes

---

### Phase 3: Pane 2 - Levels List (Tasks 7-10)

**Task 7: Create LevelCard Component**
- File: `frontend/src/components/student/computer-apps/LevelCard.js`
- Accept props: `levelName`, `totalTasks`, `completedTasks`, `locked`, `coinsEarned`
- Display level name, task progress, status indicator, progress bar (if in progress)
- Show lock icon and unlock message if locked
- **Estimated Time:** 30 minutes

**Task 8: Implement Sequential Level Unlocking Logic**
- Level N is locked if Level N-1 is not completed
- First level (Level 1) is always unlocked
- Display "Complete Level X to unlock" message for locked levels
- **Estimated Time:** 30 minutes

**Task 9: Fetch Levels List from API**
- API endpoint: `GET /api/v2/lms/student/:studentId/courses/computer-apps/:appId/levels`
- Response includes array of levels with progress and lock status
- Store in React state
- Handle loading/error states
- **Estimated Time:** 30 minutes

**Task 10: Render Levels List in Pane 2**
- Map through levels array and render LevelCard for each
- Add click handler to load task details in Pane 3
- Disable click on locked levels
- Highlight selected level card (blue-100 background)
- **Estimated Time:** 20 minutes

---

### Phase 4: Pane 3 - Task Details (Tasks 11-14)

**Task 11: Create TaskDetails Component**
- File: `frontend/src/components/student/computer-apps/TaskDetails.js`
- Accept props: `taskTitle`, `instructions`, `performanceMetrics`, `actionButtons`, `leaderboard`
- Display task title, instructions, metrics card, action buttons, leaderboard
- **Estimated Time:** 30 minutes

**Task 12: Create PerformanceMetrics Component**
- Display 3 stat boxes: Time Taken, Coins Earned, Ranking
- Blue-50 background, rounded-lg, flex layout
- **Estimated Time:** 20 minutes

**Task 13: Create Leaderboard Component**
- Display top 5 students in Balagruha
- Highlight current user's row
- "View Full Leaderboard" button expands to top 50
- Yellow-50 background, table layout
- **Estimated Time:** 30 minutes

**Task 14: Add Action Buttons (Start Task / Open External Tool)**
- "Start Task" button: Blue button, launches task in browser
- "Open [Tool]" button: Purple button, launches external tool via Electron IPC
- Conditional rendering based on task type (in-browser vs external tool)
- **Estimated Time:** 30 minutes

---

### Phase 5: External Tool Launch via Electron IPC (Tasks 15-17)

**Task 15: Set Up Electron IPC for Tool Launch**
- File: `electron/main.js` (or equivalent)
- Add IPC listener: `ipcMain.on('launch-tool', (event, { toolName }) => { ... })`
- Use `child_process.spawn()` to launch external tool
- Return success/failure to renderer process
- **Estimated Time:** 45 minutes

**Task 16: Implement Tool Launch Handler in Frontend**
- Use `ipcRenderer.send('launch-tool', { toolName: 'MS Word' })`
- Listen for success/failure response
- Display loading state during launch
- Display error message with retry button if launch fails
- **Estimated Time:** 30 minutes

**Task 17: Track Session Duration for External Tools**
- Start timer when tool launches
- Stop timer when tool closes (detect process exit)
- Save session duration to API: `POST /api/v2/lms/student/:studentId/tool-session`
- **Estimated Time:** 45 minutes

---

### Phase 6: Progress Tracking & State Management (Tasks 18-19)

**Task 18: Implement Progress Update Logic**
- When task completed, update progress in all 3 panes
- Update App Card completion count
- Update Level Card completion count
- Mark level as complete if all tasks completed
- Mark app as complete if all levels completed
- **Estimated Time:** 1 hour

**Task 19: Sync Progress with Server**
- API endpoint: `POST /api/v2/lms/student/:studentId/progress`
- Request body: `{ appId, levelId, taskId, status: "completed", score, timeSpent, coinsEarned }`
- Handle offline mode: queue progress updates in localStorage
- Sync when online
- **Estimated Time:** 45 minutes

---

### Phase 7: Testing & Polish (Task 20)

**Task 20: End-to-End Testing and Responsive Design Testing**
- Test three-pane layout on 1366x768 (desktop)
- Test single-pane view on tablet (768px - 1023px)
- Test stack navigation on mobile (< 768px)
- Test external tool launch (MS Word, Tux Typing, GCompris)
- Test progress tracking across all 3 panes
- Test sequential level unlocking
- Test leaderboard display
- Fix any visual bugs or layout issues
- **Estimated Time:** 1.5 hours

---

## 4. API Endpoints

### 4.1. Computer Apps Course Data

**GET `/api/v2/lms/student/:studentId/courses/computer-apps`**
- **Purpose:** Fetch all apps with progress
- **Response:**
```json
{
  "apps": [
    {
      "id": "app1",
      "name": "MS Word",
      "icon": "📝",
      "totalTasks": 20,
      "completedTasks": 20,
      "status": "completed"
    },
    {
      "id": "app2",
      "name": "Excel",
      "icon": "📊",
      "totalTasks": 15,
      "completedTasks": 8,
      "status": "in_progress"
    }
  ]
}
```

**GET `/api/v2/lms/student/:studentId/courses/computer-apps/:appId/levels`**
- **Purpose:** Fetch all levels for selected app
- **Response:**
```json
{
  "levels": [
    {
      "id": "level1",
      "name": "Level 1: Basics",
      "totalTasks": 5,
      "completedTasks": 5,
      "status": "completed",
      "coinsEarned": 250,
      "locked": false
    },
    {
      "id": "level2",
      "name": "Level 2: Formatting",
      "totalTasks": 5,
      "completedTasks": 2,
      "status": "in_progress",
      "locked": false
    },
    {
      "id": "level3",
      "name": "Level 3: Advanced",
      "totalTasks": 5,
      "completedTasks": 0,
      "status": "locked",
      "locked": true,
      "unlockMessage": "Complete Level 2 to unlock"
    }
  ]
}
```

**GET `/api/v2/lms/student/:studentId/courses/computer-apps/:appId/levels/:levelId/task/:taskId`**
- **Purpose:** Fetch task details
- **Response:**
```json
{
  "task": {
    "id": "task1",
    "title": "Create a Letter",
    "instructions": "Open MS Word and create a formal letter...",
    "taskType": "external_tool",
    "toolName": "MS Word",
    "performanceMetrics": {
      "timeTaken": 12,
      "coinsEarned": 50,
      "ranking": 3
    },
    "leaderboard": [
      { "rank": 1, "name": "Priya Singh", "coins": 1500, "time": 10 },
      { "rank": 2, "name": "Amit Patel", "coins": 1250, "time": 11 },
      { "rank": 3, "name": "Ravi Kumar", "coins": 1100, "time": 12, "isCurrentUser": true },
      { "rank": 4, "name": "Neha Gupta", "coins": 980, "time": 13 }
    ]
  }
}
```

---

## 5. File Paths

**Frontend Files to Create/Modify:**
- `frontend/src/pages/student/ComputerAppsPage.js` (Main page)
- `frontend/src/components/student/computer-apps/ThreePaneLayout.js` (Layout)
- `frontend/src/components/student/computer-apps/AppCard.js` (App card)
- `frontend/src/components/student/computer-apps/LevelCard.js` (Level card)
- `frontend/src/components/student/computer-apps/TaskDetails.js` (Task details)
- `frontend/src/components/student/computer-apps/PerformanceMetrics.js` (Metrics)
- `frontend/src/components/student/computer-apps/Leaderboard.js` (Leaderboard)

**Backend Files to Create/Modify:**
- `backend/routes/v2/lms/student.js` (Add Computer Apps routes)
- `backend/controllers/computerAppsController.js` (Controller)

**Electron Files to Create/Modify:**
- `electron/main.js` (Add IPC handler for tool launch)

---

## 6. Definition of Done

- [ ] All 20 tasks completed
- [ ] All 35 acceptance criteria met
- [ ] Unit tests written and passing (80%+ coverage)
- [ ] E2E test written and passing
- [ ] Code reviewed by peer
- [ ] Tested on 1366x768 resolution
- [ ] Responsive design tested on tablet and mobile
- [ ] External tool launch tested (MS Word, Tux Typing, GCompris)
- [ ] Performance target met (page loads < 3 seconds)
- [ ] Accessibility checklist completed
- [ ] Documentation updated
- [ ] Merged to `feature/sprint-2` branch

---

**Status:** Ready for Development
**Last Updated:** 2025-10-24 14:08:21

# E2E Test Scenarios: Epic 01 Story 02 - Computer Apps Course Interaction

**Story ID:** SPRINT2-EPIC01-STORY02
**Test Document Version:** 1.0
**Last Updated:** 2025-10-27 19:04:58
**Test Environment:** Staging
**Browser Support:** Chrome 120+, Firefox 115+, Edge 120+
**Screen Resolutions:** 1366x768 (primary), 1920x1080 (desktop), 768x1024 (tablet), 375x667 (mobile)

---

## Test Coverage Summary

| Category | Test Cases | Priority |
|----------|-----------|----------|
| Three-Pane Layout Structure | 5 | P0 |
| Pane 1 - Apps List | 7 | P0 |
| Pane 2 - Levels List | 8 | P0 |
| Pane 3 - Task Details | 6 | P0 |
| Performance Metrics Display | 3 | P0 |
| Leaderboard Functionality | 4 | P0 |
| Sequential Level Unlocking | 4 | P0 |
| Auto-Selection Behavior | 3 | P0 |
| External Tool Launch | 3 | P1 |
| Responsive Design | 3 | P1 |
| Performance | 3 | P2 |
| **TOTAL** | **49** | - |

---

## Prerequisites

**Test Data Setup:**
- Student user account with valid authentication
- MongoDB instance running
- Backend server running on port 5001
- Frontend running on port 3000
- Computer Apps course data with progress (apps, levels, tasks)
- Leaderboard data for at least 5 students

**Test Account:**
- **Username:** student@test.com
- **Password:** StudentTest123
- **Role:** Student
- **Permissions:** Student access
- **Student ID:** student123 (or from localStorage)

**Mock Data Verification:**
Backend returns:
- 5 apps (MS Word, Excel, PowerPoint, Tux Typing, GCompris)
- Each app has multiple levels
- Each level has tasks, progress, lock status
- Leaderboard has sample data with current user highlighted

---

## Test Scenarios

### 1. Three-Pane Layout Structure (5 Test Cases)

#### TC 1.1: Three-Pane Layout Displays Correctly
**Priority:** P0
**Preconditions:**
- User logged in as Student
- Navigate to `/student/computer-apps`

**Steps:**
1. Navigate to `/student/computer-apps`
2. Observe page layout

**Expected Results:**
- Three distinct panes visible side-by-side:
  - **Pane 1 (Apps List):** 240px width, left side, white background
  - **Pane 2 (Levels List):** 240px width, middle, white background
  - **Pane 3 (Task Details):** Flexible width, right side, gray-50 background
- Vertical borders between panes (1px gray-200)
- Height fills available space: `calc(100vh - 128px)`
- StudentLayout components (TitleBar, Toolbar) visible above panes

**Screenshots:** `TC-1.1-three-pane-layout.png`

---

#### TC 1.2: Each Pane Independently Scrollable
**Priority:** P0
**Steps:**
1. Scroll content in Pane 1 (Apps List)
2. Scroll content in Pane 2 (Levels List)
3. Scroll content in Pane 3 (Task Details)

**Expected Results:**
- Each pane has `overflow-y: auto` applied
- Scrolling Pane 1 does NOT scroll Pane 2 or Pane 3
- Scrolling Pane 2 does NOT scroll Pane 1 or Pane 3
- Scrolling Pane 3 does NOT scroll Pane 1 or Pane 2
- Scrollbars appear only when content exceeds pane height
- Smooth scrolling with no lag

**Verification:**
- Inspect each pane's CSS: `overflow-y: auto`
- Manually scroll each pane to confirm independence

---

#### TC 1.3: Pane Headers Display Correctly
**Priority:** P0
**Steps:**
1. Observe header in Pane 1
2. Observe header in Pane 2 (after selecting app)

**Expected Results:**
- **Pane 1 Header:**
  - Background: orange-100 (bg-orange-100)
  - Text: "COMPUTER APPS" (text-lg, font-bold, gray-900)
  - Padding: p-3
  - Margin-bottom: mb-4
  - Rounded: rounded-lg
- **Pane 2 Header (when app selected):**
  - Background: blue-100 (bg-blue-100)
  - Text: "[APP NAME] LEVELS" (e.g., "MS WORD LEVELS")
  - Dynamic text based on selected app
  - Same styling as Pane 1 header

**Screenshots:** `TC-1.3-pane-headers.png`

---

#### TC 1.4: Loading State Displays on Initial Load
**Priority:** P0
**Steps:**
1. Clear cache (localStorage, session storage)
2. Navigate to `/student/computer-apps`
3. Observe loading state

**Expected Results:**
- Loading spinner displays centered in viewport
- Spinner: 12x12 rounded circle, orange-600 border, animated spin
- Text displays: "Loading Computer Apps..." (gray-600)
- StudentLayout (TitleBar, Toolbar) still visible above loading state
- Loading state disappears after API response received

**Verification:**
- Network tab shows API call: `GET /api/v2/lms/student/student123/courses/computer-apps`
- Loading state removed from DOM after response

---

#### TC 1.5: Empty State Handling - No Apps Available
**Priority:** P1
**Preconditions:** Backend returns empty apps array

**Steps:**
1. Modify API response to return `{ success: true, apps: [] }`
2. Navigate to `/student/computer-apps`

**Expected Results:**
- Pane 1 displays: "No apps available" (gray-500, center-aligned)
- Pane 2 displays: "Select an app to view levels" (gray-500, center-aligned)
- Pane 3 displays: "📝 Select a level to see task details" (gray-500, center-aligned)
- No console errors
- No infinite loading state

---

### 2. Pane 1 - Apps List (7 Test Cases)

#### TC 2.1: Apps List Displays All 5 Apps
**Priority:** P0
**Steps:**
1. Navigate to `/student/computer-apps`
2. Observe Pane 1 (Apps List)
3. Count app cards

**Expected Results:**
- Exactly 5 app cards display:
  1. MS Word (📝 icon)
  2. Excel (📊 icon)
  3. PowerPoint (📽️ icon)
  4. Tux Typing (⌨️ icon)
  5. GCompris (🎮 icon)
- Each card displays:
  - App icon (text-3xl, mb-2)
  - App name (text-lg, font-semibold)
  - Task progress: "X of Y tasks" (text-sm)
  - Progress bar (width matches percentage)
  - Status indicator (✓, ⏳, or 🔒)
- Cards stacked vertically with mb-2 spacing

**Screenshots:** `TC-2.1-apps-list.png`

---

#### TC 2.2: App Card Status Indicators Display Correctly
**Priority:** P0
**Steps:**
1. For each app card, verify status indicator

**Expected Results:**
- **Completed App (MS Word - 20/20 tasks):**
  - Checkmark: ✓ (green-600)
  - Text: "All done!" (green-600)
  - Background: green-50
  - Left border: 4px green-600
- **In-Progress App (Excel - 8/15 tasks):**
  - Icon: ⏳ (blue-600)
  - Text: "Keep going!" (blue-600)
  - Background: white
  - Left border: 1px gray-200
  - Progress bar visible
- **Not-Started App (PowerPoint - 0/18 tasks):**
  - Icon: 🔒 (gray-500)
  - Text: "Start learning!" (gray-500)
  - Background: gray-50
  - Left border: 1px gray-200

**Verification:**
- Inspect each card's CSS classes
- Verify dynamic styling based on status

---

#### TC 2.3: App Card Progress Bar Width Matches Percentage
**Priority:** P0
**Steps:**
1. For Excel app (8/15 tasks = 53.3%), verify progress bar width
2. Measure progress bar width visually or via DevTools

**Expected Results:**
- Progress bar container: full width, gray-200 background, h-2, rounded-full
- Progress bar fill: 53% width, blue-600 background, h-2, rounded-full
- Progress percentage displayed: "53% complete" (text-xs, gray-600)
- Visual width matches calculated percentage

---

#### TC 2.4: Clicking App Card Loads Levels in Pane 2
**Priority:** P0
**Steps:**
1. Note Pane 2 displays "Select an app to view levels"
2. Click Excel app card
3. Observe Pane 2

**Expected Results:**
- API call made: `GET /api/v2/lms/student/student123/courses/computer-apps/app-excel/levels`
- Response: 200 OK with levels array
- Pane 2 header updates to "EXCEL LEVELS"
- Level cards display in Pane 2
- Excel card in Pane 1 highlighted (orange-50 background, orange-600 left border)

**Verification:**
- Network tab shows API call
- selectedApp state updated to Excel
- Pane 2 populated with level cards

---

#### TC 2.5: Auto-Selection - First App Selected on Load
**Priority:** P0
**Steps:**
1. Navigate to `/student/computer-apps` (fresh load)
2. Observe Pane 1 and Pane 2

**Expected Results:**
- First app (MS Word) automatically selected
- MS Word card highlighted (orange-50 background, orange-600 left border)
- Pane 2 automatically populated with MS Word levels
- No manual click required for initial selection
- Smooth auto-selection without visual flicker

**Verification:**
- Check `useEffect(() => { fetchApps(); }, [])` in ComputerAppsPage.jsx:26
- Verify `handleAppSelect(response.data.apps[0])` called at line 38

---

#### TC 2.6: App Card Hover Effects
**Priority:** P1
**Steps:**
1. Hover mouse over Excel app card
2. Observe styling changes

**Expected Results:**
- Background lightens to gray-50 (hover:bg-gray-50)
- Cursor changes to pointer (cursor-pointer)
- Transition smooth (transition-colors)
- Hover effect applies to all app cards

---

#### TC 2.7: App Card Keyboard Navigation
**Priority:** P2
**Steps:**
1. Press Tab key to focus first app card
2. Press Enter key

**Expected Results:**
- App card receives focus (visible outline or ring)
- Enter key triggers app selection (same as click)
- Levels load in Pane 2
- All app cards keyboard accessible (role="button", tabIndex={0})

**Verification:**
- Check AppCard.jsx:73 for `role="button"` and `tabIndex={0}`

---

### 3. Pane 2 - Levels List (8 Test Cases)

#### TC 3.1: Levels List Displays for Selected App
**Priority:** P0
**Preconditions:** MS Word app selected (auto-selected on load)

**Steps:**
1. Observe Pane 2 (Levels List)
2. Count level cards

**Expected Results:**
- Pane 2 header displays: "MS WORD LEVELS"
- 4 level cards display:
  1. Level 1: Basics (Completed)
  2. Level 2: Formatting (Completed)
  3. Level 3: Advanced (In Progress)
  4. Level 4: Tables (Locked)
- Each level card displays:
  - Level name (text-base, font-semibold)
  - Task progress: "X of Y tasks" (text-sm)
  - Status indicator (✓, ⏳, or 🔒)
  - Coins earned (if completed)
  - Progress bar (if in progress)
  - Unlock message (if locked)

**Screenshots:** `TC-3.1-levels-list.png`

---

#### TC 3.2: Level Card Status Indicators Display Correctly
**Priority:** P0
**Steps:**
1. For each level card, verify status and styling

**Expected Results:**
- **Completed Level (Level 1 - 5/5 tasks):**
  - Checkmark: ✓ (green-600)
  - Text: "Completed!" (green-600)
  - Coins: "💰 250 coins" (yellow-600)
  - Background: green-50
  - Left border: 4px green-600
- **In-Progress Level (Level 3 - 2/5 tasks):**
  - Icon: ⏳ (blue-600)
  - Text: "In Progress" (blue-600)
  - Progress bar: 40% width
  - Background: blue-50
  - Left border: 4px blue-600
- **Locked Level (Level 4):**
  - Icon: 🔒 (gray-500)
  - Text: "Complete Level 3 to unlock" (gray-600)
  - Background: gray-100
  - Left border: 1px gray-300
  - Cursor: not-allowed

---

#### TC 3.3: Sequential Level Unlocking Logic - Level 4 Locked
**Priority:** P0
**Preconditions:** Level 3 is in-progress (not completed)

**Steps:**
1. Verify Level 4 displays lock icon and unlock message
2. Attempt to click Level 4 card

**Expected Results:**
- Level 4 card displays: "🔒 Complete Level 3 to unlock"
- Click on Level 4 does NOT load task details
- Toast notification displays: "Complete Level 3 to unlock" (error toast)
- Pane 3 remains unchanged (previous task details still visible)
- No API call made for locked level

**Verification:**
- Check LevelCard.jsx:51 for `locked` prop check
- Verify `handleClick` returns early if locked
- Confirm toast.error() called at ComputerAppsPage.jsx:75

---

#### TC 3.4: Clicking Unlocked Level Loads Task Details in Pane 3
**Priority:** P0
**Steps:**
1. Click Level 1 (unlocked, completed)
2. Observe Pane 3

**Expected Results:**
- API call made: `GET /api/v2/lms/student/student123/courses/computer-apps/app-ms-word/levels/level-1/task/task-level-1-1`
- Response: 200 OK with task details
- Pane 3 displays:
  - Task title: "TASK: CREATE A LETTER"
  - Performance metrics (if completed)
  - Instructions
  - Action buttons
  - Leaderboard
- Level 1 card in Pane 2 highlighted (blue-100 background, blue-600 left border)

**Verification:**
- Network tab shows API call
- selectedLevel state updated to Level 1
- taskDetails state populated

---

#### TC 3.5: Auto-Selection - First Unlocked Level Selected on App Change
**Priority:** P0
**Steps:**
1. MS Word app auto-selected on load (with Level 1 selected)
2. Click Excel app card
3. Observe Pane 2 and Pane 3

**Expected Results:**
- Pane 2 updates to "EXCEL LEVELS"
- First unlocked level in Excel automatically selected (Level 1)
- Pane 3 automatically populated with Level 1 task details
- No manual level click required
- Smooth auto-selection

**Verification:**
- Check ComputerAppsPage.jsx:62-64 for auto-selection logic
- Verify `const firstUnlockedLevel = response.data.levels.find(level => !level.locked)`

---

#### TC 3.6: Level Card Progress Bar Width Matches Percentage
**Priority:** P0
**Preconditions:** Level 3 in-progress (2/5 tasks = 40%)

**Steps:**
1. Observe Level 3 card progress bar
2. Verify visual width matches percentage

**Expected Results:**
- Progress bar container: full width, blue-200 background, h-2, rounded-full
- Progress bar fill: 40% width, blue-600 background, h-2, rounded-full
- Progress text displays: "2 of 5 tasks" (text-sm)
- Visual width matches 40%

---

#### TC 3.7: Switching Apps Clears Selected Level
**Priority:** P0
**Steps:**
1. MS Word selected, Level 3 selected
2. Click Excel app
3. Observe Pane 2 and Pane 3

**Expected Results:**
- MS Word Level 3 card unhighlighted
- Excel app selected, Excel levels loaded
- First unlocked Excel level auto-selected
- Pane 3 updates to show Excel Level 1 task details
- State properly reset: `setSelectedLevel(null)` then auto-select new level

**Verification:**
- Check ComputerAppsPage.jsx:51 for `setSelectedLevel(null)`

---

#### TC 3.8: Empty State - No Levels Available
**Priority:** P1
**Preconditions:** API returns empty levels array for selected app

**Steps:**
1. Modify API response to return `{ success: true, levels: [] }`
2. Select app

**Expected Results:**
- Pane 2 displays: "No levels available" (gray-500, center-aligned)
- Pane 3 remains in empty state
- No console errors

---

### 4. Pane 3 - Task Details (6 Test Cases)

#### TC 4.1: Task Details Display All Required Elements
**Priority:** P0
**Preconditions:** Level 1 selected (completed task)

**Steps:**
1. Observe Pane 3 (Task Details)

**Expected Results:**
- **Task Title:**
  - Text: "TASK: CREATE A LETTER" (uppercase, text-2xl, font-bold, gray-900)
  - Margin-bottom: mb-6
- **Performance Metrics Card** (if completed):
  - 3 stat boxes side-by-side (grid-cols-3 on desktop)
  - Time Taken: ⏱️ 12 mins
  - Coins Earned: 💰 50 coins (yellow-600)
  - Ranking: 🏆 Rank #3 in Balagruha (purple-600)
- **Instructions Section:**
  - Heading: "Instructions:" (text-lg, font-semibold)
  - Text: Formatted instructions (whitespace-pre-line)
  - Background: gray-50, border gray-200, rounded-lg, p-4
- **Action Buttons:**
  - "Open MS Word" button (purple-600 bg, px-6 py-3, rounded-lg)
- **Leaderboard:**
  - Yellow-50 background, border yellow-200
  - Top 5 students displayed
  - Current user highlighted

**Screenshots:** `TC-4.1-task-details.png`

---

#### TC 4.2: Action Buttons Render Based on Task Type
**Priority:** P0
**Steps:**
1. Check task with `taskType: 'external_tool'`
2. Check task with `taskType: 'in_browser'` (if available)

**Expected Results:**
- **External Tool Task:**
  - Button displays: "Open [Tool Name]" (e.g., "Open MS Word")
  - Background: purple-600
  - Click shows toast: "Opening MS Word... 🚀"
- **In-Browser Task:**
  - Button displays: "Start Task in Browser"
  - Background: blue-600
  - Click shows toast: "Starting task in browser..."
- **Mark as Complete Button (if not completed):**
  - Displays if `performanceMetrics.completed === false`
  - Background: green-600
  - Text: "✓ Mark as Complete"

**Verification:**
- Check TaskDetails.jsx:69-85 for conditional rendering
- Verify `taskType` determines which button displays

---

#### TC 4.3: Instructions Display with Proper Formatting
**Priority:** P0
**Steps:**
1. Observe instructions section
2. Verify line breaks and formatting preserved

**Expected Results:**
- Multi-line instructions display correctly
- Line breaks preserved (whitespace-pre-line)
- Indentation visible (if present in instructions text)
- Text color: gray-700
- Background: gray-50 with border
- Padding: p-4
- Font size: text-base

**Verification:**
- Check TaskDetails.jsx:60-65 for instructions rendering
- Verify `whitespace-pre-line` CSS class applied

---

#### TC 4.4: Empty State - No Task Selected
**Priority:** P0
**Steps:**
1. Navigate to `/student/computer-apps`
2. Before any level is auto-selected, observe Pane 3
   (OR manually prevent auto-selection for testing)

**Expected Results:**
- Pane 3 displays centered empty state:
  - Icon: 📝 (text-6xl)
  - Text: "Select a level to see task details" (text-lg, gray-500)
  - Flexbox centered (items-center, justify-center, h-full)

**Verification:**
- Check TaskDetails.jsx:12-20 for empty state rendering

---

#### TC 4.5: External Tool Launch Button Click
**Priority:** P1
**Steps:**
1. Click "Open MS Word" button
2. Observe console and toast

**Expected Results:**
- Toast displays: "Opening MS Word... 🚀"
- Console logs: "Open tool: MS Word"
- No errors thrown
- Placeholder implementation (actual Electron IPC deferred)

**Note:** Full Electron IPC implementation pending (requires Electron environment)

**Verification:**
- Check TaskDetails.jsx:39-47 for handleOpenTool function

---

#### TC 4.6: Mark as Complete Button Click
**Priority:** P1
**Preconditions:** Task not completed (completed: false)

**Steps:**
1. Click "✓ Mark as Complete" button
2. Observe response

**Expected Results:**
- Toast displays: "Task marked as complete!"
- Console logs: "TODO: Implement progress update API call"
- No state update (API call pending implementation)

**Note:** Full progress update API pending

**Verification:**
- Check TaskDetails.jsx:88-98 for button and onClick handler

---

### 5. Performance Metrics Display (3 Test Cases)

#### TC 5.1: Performance Metrics Display for Completed Tasks
**Priority:** P0
**Preconditions:** Task completed (completed: true)

**Steps:**
1. Select completed task (e.g., MS Word Level 1)
2. Observe Performance Metrics card

**Expected Results:**
- Card visible with blue-50 background, border blue-200
- Heading: "Performance Metrics:" (text-base, font-semibold)
- Grid layout: 3 stat boxes (grid-cols-1 mobile, grid-cols-3 desktop)
- **Stat Box 1 (Time):**
  - Icon: ⏱️ (text-3xl)
  - Value: "12 mins" (text-2xl, font-bold, gray-900)
  - Label: "Time Taken" (text-sm, gray-600)
- **Stat Box 2 (Coins):**
  - Icon: 💰 (text-3xl)
  - Value: "50 coins" (text-2xl, font-bold, yellow-600)
  - Label: "Earned" (text-sm, gray-600)
- **Stat Box 3 (Ranking):**
  - Icon: 🏆 (text-3xl)
  - Value: "Rank #3" (text-2xl, font-bold, purple-600)
  - Label: "in Balagruha" (text-sm, gray-600)

**Screenshots:** `TC-5.1-performance-metrics.png`

---

#### TC 5.2: Performance Metrics Hidden for Incomplete Tasks
**Priority:** P0
**Preconditions:** Task not completed (completed: false)

**Steps:**
1. Select incomplete task
2. Observe Pane 3

**Expected Results:**
- Performance Metrics card NOT displayed
- Instead, placeholder message displays:
  - Icon: 🎯 (text-2xl)
  - Text: "Complete this task to see your performance!" (gray-500)
  - Background: gray-50, border gray-200, rounded-lg, p-4

**Verification:**
- Check PerformanceMetrics.jsx:11-19 for empty state

---

#### TC 5.3: Performance Metrics Responsive Grid Layout
**Priority:** P1
**Steps:**
1. Resize browser to mobile width (< 768px)
2. Observe Performance Metrics card layout

**Expected Results:**
- **Desktop (>= 768px):** 3 columns (grid-cols-3), horizontal layout
- **Mobile (< 768px):** 1 column (grid-cols-1), vertical stack
- Stat boxes maintain styling and readability
- Gap between boxes: gap-4

**Verification:**
- Check PerformanceMetrics.jsx:26 for `grid-cols-1 md:grid-cols-3`

---

### 6. Leaderboard Functionality (4 Test Cases)

#### TC 6.1: Leaderboard Displays Top 5 Students
**Priority:** P0
**Steps:**
1. Select any task with leaderboard data
2. Observe Leaderboard section at bottom of Pane 3

**Expected Results:**
- Leaderboard card visible (yellow-50 bg, border yellow-200, rounded-lg, p-4)
- Heading: "Leaderboard - Your Balagruha" (text-lg, font-semibold)
- Table displays 5 students by default:
  - Column 1: Rank (with medal emoji 🥇🥈🥉 for top 3)
  - Column 2: Name
  - Column 3: Coins Earned (yellow-600, right-aligned)
  - Column 4: Time Taken (gray-600, right-aligned, hidden on mobile)
- Current user row highlighted (yellow-200 bg, font-semibold)
- "YOU" badge displays next to current user's name (blue-600 bg, white text, rounded-full)

**Screenshots:** `TC-6.1-leaderboard.png`

---

#### TC 6.2: Leaderboard Medal Emojis for Top 3
**Priority:** P0
**Steps:**
1. Observe ranks in leaderboard

**Expected Results:**
- **Rank 1:** 🥇 gold medal emoji before rank number
- **Rank 2:** 🥈 silver medal emoji before rank number
- **Rank 3:** 🥉 bronze medal emoji before rank number
- **Rank 4+:** No medal emoji

**Verification:**
- Check Leaderboard.jsx:24-35 for getMedal function

---

#### TC 6.3: Current User Row Highlighted in Leaderboard
**Priority:** P0
**Steps:**
1. Identify current user in leaderboard
2. Verify highlighting

**Expected Results:**
- Current user row has yellow-200 background (bg-yellow-200)
- Font weight: font-semibold
- "YOU" badge displays next to name:
  - Background: blue-600
  - Text color: white
  - Padding: px-2 py-0.5
  - Border radius: rounded-full
  - Font size: text-xs

**Verification:**
- Check Leaderboard.jsx:58-78 for conditional row styling

---

#### TC 6.4: Leaderboard Expand/Collapse Functionality
**Priority:** P0
**Preconditions:** Leaderboard has more than 5 students

**Steps:**
1. Verify leaderboard displays top 5 students
2. Verify "View Full Leaderboard (Top X)" button displays
3. Click button to expand
4. Click button again to collapse

**Expected Results:**
- **Initial State:** Top 5 students displayed
- **Expand Button:**
  - Text: "View Full Leaderboard (Top [total count])"
  - Background: yellow-600
  - Width: full (w-full)
  - Margin-top: mt-4
- **After Click (Expanded):**
  - All students displayed (e.g., top 10 or all available)
  - Button text changes to: "Show Less"
  - Smooth transition
- **After Click Again (Collapsed):**
  - Returns to top 5 students
  - Button text changes back to: "View Full Leaderboard..."

**Verification:**
- Check Leaderboard.jsx:9 for `expanded` state
- Verify `displayedLeaderboard = expanded ? leaderboard : leaderboard.slice(0, 5)` at line 21
- Check button onClick handler at line 99

---

### 7. Sequential Level Unlocking (4 Test Cases)

#### TC 7.1: Level 1 Always Unlocked
**Priority:** P0
**Steps:**
1. Select any app
2. Verify Level 1 status

**Expected Results:**
- Level 1 is NEVER locked (locked: false)
- Level 1 can always be clicked
- Level 1 displays status (completed, in-progress, or not-started)
- No lock icon or unlock message

**Verification:**
- Check backend mock data in computerAppsController.js
- Verify all apps have Level 1 with `locked: false`

---

#### TC 7.2: Level 2 Locked Until Level 1 Completed
**Priority:** P0
**Preconditions:** Level 1 NOT completed (e.g., in a test app)

**Steps:**
1. Create test app with Level 1 in-progress
2. Verify Level 2 lock status

**Expected Results:**
- Level 2 displays lock icon 🔒
- Unlock message: "Complete Level 1 to unlock"
- Background: gray-100
- Border: gray-300
- Cursor: not-allowed
- Click shows toast error: "Complete Level 1 to unlock"

---

#### TC 7.3: Level 2 Unlocks After Level 1 Completed
**Priority:** P0
**Steps:**
1. Select MS Word (Level 1 completed)
2. Verify Level 2 status

**Expected Results:**
- Level 2 is unlocked (locked: false)
- Level 2 displays status (completed or in-progress)
- No lock icon
- Can click Level 2 to view task details

---

#### TC 7.4: Multiple Locked Levels Display Correct Messages
**Priority:** P0
**Steps:**
1. Select PowerPoint (assuming Levels 3, 4, 5 locked)
2. Verify each locked level's unlock message

**Expected Results:**
- Level 3 locked: "Complete Level 2 to unlock"
- Level 4 locked: "Complete Level 3 to unlock"
- Level 5 locked: "Complete Level 4 to unlock"
- Each message references the PREVIOUS level

**Verification:**
- Check backend mock data for unlock messages
- Verify sequential pattern in unlockMessage strings

---

### 8. Auto-Selection Behavior (3 Test Cases)

#### TC 8.1: First App Auto-Selected on Page Load
**Priority:** P0
**(Covered in TC 2.5 - duplicate for auto-selection category)**

**Steps:**
1. Navigate to `/student/computer-apps`
2. Observe Pane 1 and Pane 2

**Expected Results:**
- MS Word (first app) automatically selected
- MS Word highlighted in Pane 1
- MS Word levels loaded in Pane 2
- No manual click required

---

#### TC 8.2: First Unlocked Level Auto-Selected After App Change
**Priority:** P0
**(Covered in TC 3.5 - duplicate for auto-selection category)**

**Steps:**
1. MS Word selected with Level 3 selected
2. Click Excel app
3. Observe Pane 2 and Pane 3

**Expected Results:**
- Excel first unlocked level (Level 1) automatically selected
- Task details loaded in Pane 3
- No manual level click required

---

#### TC 8.3: Auto-Selection Skips Locked Levels
**Priority:** P0
**Preconditions:** Test app where Level 1 is locked (create custom test data)

**Steps:**
1. Modify backend to return app with Level 1 locked, Level 2 unlocked
2. Select that app

**Expected Results:**
- Auto-selection skips Level 1 (locked)
- Level 2 (first unlocked) automatically selected
- Task details for Level 2 loaded in Pane 3

**Verification:**
- Check ComputerAppsPage.jsx:62 for `const firstUnlockedLevel = response.data.levels.find(level => !level.locked)`

---

### 9. External Tool Launch (3 Test Cases)

#### TC 9.1: External Tool Button Displays Correct Tool Name
**Priority:** P1
**Steps:**
1. Select MS Word task → verify button text: "Open MS Word"
2. Select Tux Typing task → verify button text: "Open Tux Typing"
3. Select GCompris task → verify button text: "Open GCompris"

**Expected Results:**
- Button text dynamically includes tool name: "Open [toolName]"
- Background: purple-600
- Padding: px-6 py-3
- Rounded: rounded-lg

---

#### TC 9.2: External Tool Launch Shows Placeholder Toast
**Priority:** P1
**Steps:**
1. Click "Open MS Word" button
2. Observe toast notification

**Expected Results:**
- Toast displays: "Opening MS Word... 🚀"
- Console logs: "Open tool: MS Word"
- No actual tool launch (Electron IPC pending)

**Note:** Full implementation requires Electron environment

---

#### TC 9.3: In-Browser Task Button (If Available)
**Priority:** P1
**Preconditions:** Task with `taskType: 'in_browser'`

**Steps:**
1. Select in-browser task
2. Click "Start Task in Browser" button

**Expected Results:**
- Toast displays: "Starting task in browser..."
- Console logs: "Start task: [task.id]"
- No actual task launch (implementation pending)

---

### 10. Responsive Design (3 Test Cases)

#### TC 10.1: Desktop Layout (1366x768)
**Priority:** P0
**Steps:**
1. Resize browser to 1366x768
2. Verify three-pane layout

**Expected Results:**
- All 3 panes visible side-by-side
- Pane 1: 240px width
- Pane 2: 240px width
- Pane 3: Flexible width (fills remaining space)
- Performance Metrics: 3 columns (grid-cols-3)
- Leaderboard Time column visible
- No horizontal scroll
- All content readable

**Screenshots:** `TC-10.1-desktop-1366.png`

---

#### TC 10.2: Tablet Layout (768px)
**Priority:** P1
**Steps:**
1. Resize browser to 768px width
2. Verify layout

**Expected Results:**
- **Current Implementation (Desktop Layout Maintained):**
  - All 3 panes still visible
  - Slightly compressed width
  - Usable but tight layout
- **Future Implementation (Pending AC-34):**
  - Single pane view with breadcrumb navigation
  - Task Details pane only
  - "← Back" button to return to Levels/Apps

**Note:** Tablet responsive breakpoints deferred (AC-34)

---

#### TC 10.3: Mobile Layout (375px - iPhone)
**Priority:** P1
**Steps:**
1. Resize browser to 375px width
2. Verify layout

**Expected Results:**
- **Current Implementation:**
  - Three-pane layout too narrow for mobile
  - Horizontal scroll may appear
  - Usability issues expected
- **Future Implementation (Pending AC-35):**
  - Full stack navigation
  - Apps List → Levels List → Task Details (separate pages)
  - React Router for navigation

**Note:** Mobile responsive breakpoints deferred (AC-35)

---

### 11. Performance (3 Test Cases)

#### TC 11.1: Page Loads Within 3 Seconds
**Priority:** P2
**Steps:**
1. Open Chrome DevTools → Performance tab
2. Click Record
3. Navigate to `/student/computer-apps`
4. Wait for page to fully load
5. Stop recording

**Expected Results:**
- Total load time < 3 seconds
- API responses:
  - GET /courses/computer-apps < 500ms
  - GET /levels < 500ms
  - GET /task < 500ms
- No blocking JavaScript
- React components render efficiently

**Evidence:** Performance report screenshot

---

#### TC 11.2: App/Level Selection Immediate Response
**Priority:** P2
**Steps:**
1. Click different app cards (MS Word → Excel → PowerPoint)
2. Measure time from click to Pane 2 update
3. Click different level cards
4. Measure time from click to Pane 3 update

**Expected Results:**
- App selection response time < 300ms
- Level selection response time < 300ms
- Smooth state transitions
- No visual lag or jank

---

#### TC 11.3: Scrolling Smooth in All 3 Panes
**Priority:** P2
**Steps:**
1. Enable CPU throttling 6x slowdown (DevTools)
2. Scroll Pane 1 up and down
3. Scroll Pane 2 up and down
4. Scroll Pane 3 up and down

**Expected Results:**
- All panes scroll smoothly at 60fps
- No stuttering or lag
- Independent scrolling maintained
- No long tasks (> 50ms) during scroll

---

## Test Execution Notes

### Browser Compatibility
Execute ALL test cases on:
- Chrome 120+ ✅
- Firefox 115+ ✅
- Edge 120+ ✅

### Screenshot Capture
Save all screenshots to:
```
.playwright-mcp/sprint-2/epic-01-story-02/
├── TC-1.1-three-pane-layout.png
├── TC-1.3-pane-headers.png
├── TC-2.1-apps-list.png
├── TC-3.1-levels-list.png
├── TC-4.1-task-details.png
├── TC-5.1-performance-metrics.png
├── TC-6.1-leaderboard.png
├── TC-10.1-desktop-1366.png
└── ...
```

### Console Error Checking
For EVERY test case:
```javascript
browser_console_messages(onlyErrors=true)
```
Expected: No errors ✅

### Network Request Verification
For API-dependent test cases (TC 2.4, 3.4, etc.):
```javascript
browser_network_requests()
```
Verify:
- Correct endpoint called
- 200 OK response
- Request/response body correct
- Mock data returned as expected

---

## Pass/Fail Criteria

### PASS Criteria
- ✅ All P0 (Critical) test cases pass
- ✅ At least 90% of P1 (High) test cases pass
- ✅ No console errors
- ✅ API responses correct (200 OK)
- ✅ Three-pane navigation works correctly
- ✅ Sequential unlocking logic functions
- ✅ Auto-selection works as expected
- ✅ Leaderboard displays and expands correctly

### FAIL Criteria
- ❌ ANY P0 test case fails
- ❌ Critical console errors
- ❌ API errors (4xx, 5xx)
- ❌ Three-pane layout broken
- ❌ Navigation broken (cannot select apps/levels)
- ❌ Auto-selection not working
- ❌ Sequential unlocking not enforced

### CONCERNS Criteria
- ⚠️ P1 test case fails (non-critical)
- ⚠️ Performance issues (load time > 3s)
- ⚠️ Minor UI inconsistencies
- ⚠️ Non-blocking console warnings
- ⚠️ Responsive design issues (AC-34, AC-35 deferred)

---

## Known Limitations (Pending Implementation)

The following features are **NOT** expected to work in this test cycle:

1. **External Tool Launch (AC-24 to AC-28):**
   - Electron IPC implementation pending
   - Placeholder toast messages acceptable
   - AC-24, AC-25, AC-26, AC-27, AC-28 marked as 🟡 (deferred)

2. **Progress Tracking (AC-29 to AC-32):**
   - "Mark as Complete" button shows toast only
   - No actual progress update to backend
   - AC-29, AC-30, AC-31, AC-32 marked as 🟡 (deferred)

3. **Responsive Design (AC-34, AC-35):**
   - Tablet and mobile breakpoints pending
   - Desktop layout works correctly
   - AC-34, AC-35 marked as 🟡 (deferred)

**Test Focus:** Desktop three-pane layout, navigation flow, sequential unlocking, leaderboard, auto-selection, and mock data display.

---

## Test Execution Summary Template

```markdown
## Test Execution Results

**Execution Date:** YYYY-MM-DD HH:MM:SS
**Executed By:** Quinn (QA Agent)
**Browser:** Chrome 120
**Test Environment:** http://localhost:3000/student/computer-apps

**Summary:**
- Total Test Cases: 49
- Passed: ✅ X
- Failed: ❌ Y
- Deferred: 🟡 Z (AC-24 to AC-35)
- Blocked: ⛔ W
- Duration: MM minutes SS seconds

**Critical Issues:** None / List issues

**Recommendation:** PASS / CONCERNS / FAIL
```

---

**End of E2E Test Scenarios Document**

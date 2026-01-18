# E2E Test Scenarios: Epic 01 Story 01 - Student Homepage & Course Navigation

**Story ID:** SPRINT2-EPIC01-STORY01
**Test Document Version:** 1.0
**Last Updated:** 2025-10-27 17:53:47
**Test Environment:** Staging
**Browser Support:** Chrome 120+, Firefox 115+, Edge 120+
**Screen Resolutions:** 1366x768 (primary), 1920x1080 (desktop), 768x1024 (tablet), 375x667 (mobile)

---

## Test Coverage Summary

| Category | Test Cases | Priority |
|----------|-----------|----------|
| Title Bar Functionality | 8 | P0 |
| Toolbar & Emotion Tracking | 7 | P0 |
| Course Category Cards | 6 | P0 |
| Resume Activity Card | 4 | P0 |
| Offline Mode | 5 | P1 |
| Responsive Design | 4 | P1 |
| Performance | 3 | P2 |
| **TOTAL** | **37** | - |

---

## Prerequisites

**Test Data Setup:**
- Student user account with valid authentication
- MongoDB instance running
- Backend server running on port 5001
- Frontend running on port 3000
- Test courses with progress data
- Test notifications and homework tasks

**Test Account:**
- **Username:** student@test.com
- **Password:** StudentTest123
- **Role:** Student
- **Permissions:** Student access

---

## Test Scenarios

### 1.1. Title Bar Functionality (8 Test Cases)

#### TC 1.1: Title Bar Displays All Required Elements
**Priority:** P0
**Preconditions:**
- User logged in as Student
- On Student Dashboard (`/student/dashboard`)

**Steps:**
1. Navigate to `/student/dashboard`
2. Observe Title Bar at top of page

**Expected Results:**
- Title Bar is sticky (remains at top when scrolling)
- ISF Playground logo visible on left
  - Purple 'I' icon displays
  - "ISF Playground" text displays (hidden on mobile <768px)
- Coin balance displays with 💰 icon (e.g., "💰 1,250")
- Notification bell 🔔 displays with unread count badge (e.g., red "3")
- Session timer ⏱️ displays in HH:MM:SS format (e.g., "00:45:32")
- All elements properly aligned and styled

**Screenshots:** `TC-1.1-title-bar.png`

---

#### TC 1.2: Coin Balance Updates in Real-Time
**Priority:** P0
**Steps:**
1. Note initial coin balance (e.g., "💰 1,250")
2. Manually award 100 coins to student via backend API or admin panel
3. Wait up to 10 seconds (polling interval)

**Expected Results:**
- Coin balance automatically updates to new value (e.g., "💰 1,350")
- No page refresh required
- Update occurs within 10 seconds
- localStorage caches new balance

**Verification:**
- Check localStorage key: `cachedCoinBalance`
- Verify value matches displayed balance

---

#### TC 1.3: Session Timer Updates Every Second
**Priority:** P0
**Steps:**
1. Observe session timer for 10 seconds
2. Record timer values at 0s, 5s, 10s

**Expected Results:**
- Timer increments by 1 every second
- Format remains HH:MM:SS
- No visual lag or stuttering
- Timer persists across page navigation

**Verification:**
- Check localStorage keys: `sessionTime`, `sessionResetDate`
- Verify timer value stored correctly

---

#### TC 1.4: Session Timer Resets Daily at Midnight
**Priority:** P1
**Steps:**
1. Check localStorage `sessionResetDate` key
2. Manually change `sessionResetDate` to yesterday's date
3. Refresh page

**Expected Results:**
- Timer resets to 00:00:00
- `sessionResetDate` updates to today's date
- Timer starts counting from 0

---

#### TC 1.5: Notification Bell Displays Unread Count
**Priority:** P0
**Preconditions:** Student has unread notifications (count > 0)

**Steps:**
1. Verify notification bell displays unread count badge
2. Check badge styling and position

**Expected Results:**
- Red badge displays on top-right of bell icon
- Count shows correct number (e.g., "3")
- Count shows "9+" if count > 9
- Badge clearly visible and styled correctly

---

#### TC 1.6: Notification Bell Click Interaction
**Priority:** P1
**Steps:**
1. Click notification bell icon
2. Observe response

**Expected Results:**
- Console logs "Open notification center"
- Placeholder message acceptable (full implementation in Epic 05 Story 01)

**Note:** Full notification center deferred to Epic 05 Story 01

---

#### TC 1.7: Offline Indicator Displays When Offline
**Priority:** P0
**Steps:**
1. Open DevTools → Network → Set throttling to "Offline"
2. Observe Title Bar

**Expected Results:**
- Yellow offline banner displays below Title Bar
- Banner shows: "⚠️ You are offline. Some features may not work."
- Coin balance shows "(Offline)" label
- Banner is sticky and visible when scrolling

---

#### TC 1.8: Offline Indicator Disappears When Online
**Priority:** P0
**Steps:**
1. With offline mode active (from TC 1.7)
2. Change network throttling to "Online"

**Expected Results:**
- Yellow offline banner disappears
- "(Offline)" label removed from coin balance
- No page refresh required

---

### 1.2. Toolbar & Emotion Tracking (7 Test Cases)

#### TC 2.1: Toolbar Displays All Required Elements
**Priority:** P0
**Steps:**
1. Observe Toolbar below Title Bar
2. Verify all elements present

**Expected Results:**
- 3 emotion buttons display: 😊 😢 😡
- Voice Chat button displays: 🎤 "Chat with Amma"
- Homework button displays: 📚 "Homework" (with count badge if homework > 0)
- Help button displays: ❓ "Help"
- All buttons properly styled and aligned
- Labels visible on desktop, hidden on mobile (<640px)

**Screenshots:** `TC-2.1-toolbar.png`

---

#### TC 2.2: Emotion Tracking - Happy Button Saves Correctly
**Priority:** P0
**Preconditions:** Backend server running, network online

**Steps:**
1. Click Happy emotion button (😊)
2. Observe response
3. Open DevTools → Network tab, verify API call
4. Check MongoDB emotion_tracking collection

**Expected Results:**
- Button highlights with blue background (bg-blue-100) and ring (ring-2 ring-blue-500)
- Toast notification displays: "Recorded: 😊"
- API call made: `POST /api/v2/lms/student/:studentId/emotion`
- Request body contains: `{ emotion: 'happy', timestamp: 'ISO-8601 string' }`
- Response: 200 OK with `{ success: true }`
- Database entry created with emotion='happy', studentId, timestamp, synced=true

---

#### TC 2.3: Emotion Tracking - Only One Emotion Highlighted at a Time
**Priority:** P0
**Steps:**
1. Click Happy button (😊) → verify highlighted
2. Click Sad button (😢) → verify Sad highlighted, Happy unhighlighted
3. Click Angry button (😡) → verify Angry highlighted, Sad unhighlighted

**Expected Results:**
- Only the most recently clicked button is highlighted
- Previous button returns to default state
- Each click saves new emotion to database

---

#### TC 2.4: Emotion Tracking Works Offline and Syncs When Online
**Priority:** P0
**Steps:**
1. Set network to "Offline" (DevTools → Network → Throttling)
2. Click Happy button (😊)
3. Click Sad button (😢)
4. Check localStorage key: `offlineEmotions`
5. Set network to "Online"
6. Wait for automatic sync

**Expected Results:**
**While Offline:**
- Button highlights normally
- Toast shows: "Saved offline - will sync when online 📴"
- Emotion saved to localStorage `offlineEmotions` array
- Each offline emotion added to array

**When Online:**
- Automatic batch sync triggered
- Toast shows: "Synced 2 emotions"
- API call made: `POST /api/v2/lms/student/:studentId/emotions/batch`
- localStorage `offlineEmotions` cleared
- Database contains 2 entries with synced=false flag

---

#### TC 2.5: Homework Button Displays Count Badge
**Priority:** P0
**Preconditions:** Student has pending homework (count > 0)

**Steps:**
1. Verify homework button displays count badge
2. Click Homework button

**Expected Results:**
- Red badge displays on top-right of button with count (e.g., "3")
- Badge shows "9+" if count > 9
- Click navigates to `/student/homework`
- Placeholder page displays: "Homework - Coming Soon"

---

#### TC 2.6: Voice Chat Button Click
**Priority:** P1
**Steps:**
1. Click "Chat with Amma" button (🎤)

**Expected Results:**
- Toast notification displays: "Voice chat coming soon! 🎤"
- Console logs "Open voice chat modal"

**Note:** Full voice chat implementation deferred to Epic 05 Story 02

---

#### TC 2.7: Help Button Click
**Priority:** P1
**Steps:**
1. Click Help button (❓)

**Expected Results:**
- Toast notification displays: "Help is on the way! ❓"
- Console logs "Open help modal"

**Note:** Full help modal is future enhancement

---

### 1.3. Course Category Cards (6 Test Cases)

#### TC 3.1: 4 Course Category Cards Display with Correct Colors
**Priority:** P0
**Steps:**
1. Scroll to "Your Courses" section
2. Count course cards
3. Verify colors and styling for each card

**Expected Results:**
- Exactly 4 course cards display
- **Computer Apps Card:**
  - Background: orange-100
  - Border: 2px border-orange-300
  - Icon: 💻 (text-6xl)
  - Progress bar: orange-600 fill
- **Art Card:**
  - Background: pink-100
  - Border: 2px border-pink-300
  - Icon: 🎨 (text-6xl)
  - Progress bar: pink-600 fill
- **Spoken English Card:**
  - Background: blue-100
  - Border: 2px border-blue-300
  - Icon: 🗣️ (text-6xl)
  - Progress bar: blue-600 fill
- **Life Skills Card:**
  - Background: green-100
  - Border: 2px border-green-300
  - Icon: 🌟 (text-6xl)
  - Progress bar: green-600 fill

**Screenshots:** `TC-3.1-course-cards.png`

---

#### TC 3.2: Course Cards Display Progress Data Correctly
**Priority:** P0
**Steps:**
1. For each course card, verify data displayed
2. Calculate expected progress percentage

**Expected Results:**
- Each card displays:
  - Course title (text-xl, font-bold)
  - Icon (64px × 64px)
  - Progress bar (white container, colored fill)
  - Task stats: "X of Y tasks completed" (text-sm)
  - Progress percentage: "Z% complete" (text-xs)
- Progress bar width = progress percentage
  - Example: 30% complete → 30% width of container

---

#### TC 3.3: Course Card Hover Effects
**Priority:** P1
**Steps:**
1. Hover mouse over Computer Apps card
2. Observe styling changes
3. Repeat for other 3 cards

**Expected Results:**
- Background darkens to next shade (e.g., orange-100 → orange-200)
- Cursor changes to pointer
- Transition smooth (transition-colors)
- Hover effect applies to all 4 cards

---

#### TC 3.4: Course Card Click Navigation - Computer Apps
**Priority:** P0
**Steps:**
1. Click Computer Apps card
2. Verify navigation

**Expected Results:**
- Browser navigates to `/student/computer-apps`
- Placeholder page displays: "Computer Apps - Coming Soon"
- No console errors

---

#### TC 3.5: Course Card Click Navigation - All 4 Courses
**Priority:** P0
**Steps:**
1. From dashboard, click Art card → verify navigation to `/student/art`
2. Return to dashboard
3. Click Spoken English card → verify navigation to `/student/spoken-english`
4. Return to dashboard
5. Click Life Skills card → verify navigation to `/student/life-skills`

**Expected Results:**
- All 4 navigation routes work correctly
- Each placeholder page displays appropriate message
- Back button returns to dashboard
- No console errors during navigation

---

#### TC 3.6: Course Card Keyboard Navigation
**Priority:** P2
**Steps:**
1. Press Tab key to focus Computer Apps card
2. Press Enter key

**Expected Results:**
- Card receives focus (visible outline or ring)
- Enter key triggers navigation
- All 4 cards keyboard accessible

---

### 1.4. Resume Activity Card (4 Test Cases)

#### TC 4.1: Resume Card Displays When Incomplete Task Exists
**Priority:** P0
**Preconditions:** Student has incomplete task (lastActivity exists in API response)

**Steps:**
1. Verify Resume Activity Card displays above course cards
2. Check card styling and content

**Expected Results:**
- Card displays with blue-50 background, blue-300 border
- Label displays: "Continue where you left off" (text-sm, blue-600)
- Task title displays: "[Course Type] - [Task Title]" (text-lg, font-bold)
- Progress bar displays with correct percentage
- Continue button displays on right side (blue-600 bg, px-6 py-3)
- Button includes "▶️" icon

**Screenshots:** `TC-4.1-resume-card.png`

---

#### TC 4.2: Resume Card Progress Bar Width Matches Percentage
**Priority:** P1
**Steps:**
1. Note progress percentage displayed (e.g., "45%")
2. Inspect progress bar width (DevTools or visual estimation)

**Expected Results:**
- Progress bar width = displayed percentage
- Example: 45% complete → progress bar fills 45% of container width
- Progress bar blue-600 color

---

#### TC 4.3: Resume Card Continue Button Navigation
**Priority:** P0
**Steps:**
1. Click Continue button (▶️)
2. Verify navigation

**Expected Results:**
- Browser navigates to task page
- Route format: `/student/{course-type}/task/{taskId}`
- Example: `/student/computer-apps/task/507f1f77bcf86cd799439011`
- Placeholder page displays or actual task page loads

---

#### TC 4.4: Resume Card Does Not Display When No Incomplete Tasks
**Priority:** P0
**Preconditions:** Student has no incomplete tasks (lastActivity = null in API response)

**Steps:**
1. Modify dashboard API response to return `lastActivity: null`
2. Navigate to dashboard

**Expected Results:**
- Resume Activity Card does NOT display
- Only "Your Courses" section visible
- No empty space or layout issues
- Course cards display normally in 2x2 grid

---

### 1.5. Offline Mode (5 Test Cases)

#### TC 5.1: Dashboard Loads from Cache When Offline
**Priority:** P0
**Preconditions:**
- Student visited dashboard while online (data cached)
- localStorage contains `cachedDashboardData`

**Steps:**
1. Visit dashboard while online
2. Verify localStorage contains `cachedDashboardData` and `cachedCoinBalance`
3. Set network to "Offline"
4. Refresh page (F5)

**Expected Results:**
- Dashboard loads from localStorage cache
- Yellow offline banner displays
- Coin balance shows cached value with "(Offline)" label
- Course cards display cached progress data
- Resume Card displays if cached data includes lastActivity
- Toast shows: "Using offline data 📴"

---

#### TC 5.2: Course Cards Remain Interactive Offline
**Priority:** P1
**Steps:**
1. With offline mode active
2. Click Computer Apps card

**Expected Results:**
- Navigation works (if route cached)
- OR toast shows: "This page is not available offline"
- No JavaScript errors

---

#### TC 5.3: Emotion Tracking Queues Offline, Syncs When Online
**Priority:** P0
**(Covered in TC 2.4 - duplicate test for offline category)**

**Steps:**
1. Set network to "Offline"
2. Click Happy, Sad, Angry buttons (3 emotions)
3. Verify localStorage `offlineEmotions` contains 3 entries
4. Set network to "Online"
5. Wait for automatic sync

**Expected Results:**
- 3 emotions queued in localStorage while offline
- Automatic batch sync occurs when online
- localStorage cleared after successful sync
- Database contains 3 entries with synced=false

---

#### TC 5.4: Offline Indicator Persists During Navigation
**Priority:** P1
**Steps:**
1. Set network to "Offline"
2. Verify offline banner displays
3. Click Computer Apps card (navigate to another page)
4. Observe offline indicator

**Expected Results:**
- Offline banner persists on new page (if using StudentLayout)
- Indicator remains visible during navigation
- Consistent offline experience across pages

---

#### TC 5.5: API Fetch Errors Handled Gracefully When Offline
**Priority:** P1
**Steps:**
1. Clear localStorage (remove `cachedDashboardData`)
2. Set network to "Offline"
3. Navigate to dashboard

**Expected Results:**
- Loading state shows briefly
- Error message displays: "No data available" or "No offline data available"
- "Retry" button displays
- No infinite loading state
- No unhandled exceptions in console

---

### 1.6. Responsive Design (4 Test Cases)

#### TC 6.1: Desktop Layout (1366x768)
**Priority:** P0
**Steps:**
1. Resize browser window to 1366x768
2. Verify layout

**Expected Results:**
- Title Bar: Logo + full text visible, all elements visible
- Toolbar: All button labels visible ("Chat with Amma", "Homework", "Help")
- Course Cards: 2x2 grid layout, 2 cards per row, gap-6 spacing
- Resume Card: Full width, Continue button on right side
- No horizontal scroll
- All elements properly sized and spaced

**Screenshots:** `TC-6.1-desktop-1366.png`

---

#### TC 6.2: Large Desktop Layout (1920x1080)
**Priority:** P1
**Steps:**
1. Resize browser window to 1920x1080
2. Verify layout

**Expected Results:**
- Still 2x2 grid (xl:grid-cols-2)
- Content centered with max-w-7xl container
- No excessive white space
- Layout scales properly
- All elements readable and accessible

**Screenshots:** `TC-6.2-desktop-1920.png`

---

#### TC 6.3: Tablet Layout (768px)
**Priority:** P1
**Steps:**
1. Resize browser window to 768px width
2. Verify layout

**Expected Results:**
- Title Bar: "ISF Playground" text hidden (md:block), logo and icons visible
- Toolbar: Button labels hidden (sm:inline), only icons visible
- Course Cards: 2x1 grid layout (md:grid-cols-2), 2 cards per row stacked
- Resume Card: Full width, Continue button may adjust
- No horizontal scroll

**Screenshots:** `TC-6.3-tablet-768.png`

---

#### TC 6.4: Mobile Layout (375px - iPhone)
**Priority:** P1
**Steps:**
1. Resize browser window to 375px width (iPhone)
2. Verify layout

**Expected Results:**
- Title Bar: Only logo icon visible, text hidden, coins/notifications/timer compact
- Toolbar: All labels hidden, only icons visible
- Course Cards: 1x4 grid layout (grid-cols-1), each card full width, stacked vertically
- Resume Card: Full width, Continue button below text or adjusted
- Touch targets minimum 44x44px
- No horizontal scroll
- Text readable without zooming

**Screenshots:** `TC-6.4-mobile-375.png`

---

### 1.7. Performance (3 Test Cases)

#### TC 7.1: Dashboard Loads Within 2 Seconds
**Priority:** P2
**Steps:**
1. Open Chrome DevTools → Performance tab
2. Click Record
3. Navigate to `/student/dashboard`
4. Wait for page to fully load
5. Stop recording

**Expected Results:**
- Total load time < 2 seconds (from navigation start to DOMContentLoaded)
- Dashboard API response time < 500ms
- No blocking JavaScript
- Performance timeline shows efficient rendering

**Evidence:** Performance report screenshot

---

#### TC 7.2: Navigation to Course Pages Completes Within 500ms
**Priority:** P2
**Steps:**
1. Open Performance tab
2. Start recording
3. Click Computer Apps card
4. Stop recording when new page loads
5. Measure time from click to page render

**Expected Results:**
- Navigation time < 500ms
- React Router navigation fast
- No unnecessary re-renders
- Smooth transition

---

#### TC 7.3: Session Timer Updates Do Not Cause Lag
**Priority:** P2
**Steps:**
1. Open Performance tab
2. Enable "CPU throttling 6x slowdown"
3. Observe session timer updates for 30 seconds
4. Scroll page while timer updates
5. Interact with buttons while timer updates

**Expected Results:**
- Timer updates every second without UI lag or jank
- Scrolling remains smooth (no stuttering)
- Buttons remain responsive
- No long tasks (> 50ms) caused by timer updates
- Smooth 60fps maintained

**Verification:**
- Check Performance tab for long tasks
- Verify timer update functions < 1ms per update

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
.playwright-mcp/sprint-2/epic-01-story-01/
├── TC-1.1-title-bar.png
├── TC-2.1-toolbar.png
├── TC-3.1-course-cards.png
├── TC-4.1-resume-card.png
├── TC-6.1-desktop-1366.png
├── TC-6.2-desktop-1920.png
├── TC-6.3-tablet-768.png
├── TC-6.4-mobile-375.png
└── ...
```

### Console Error Checking
For EVERY test case:
```javascript
browser_console_messages(onlyErrors=true)
```
Expected: No errors ✅

### Network Request Verification
For API-dependent test cases (TC 1.2, 2.2, 2.4, etc.):
```javascript
browser_network_requests()
```
Verify:
- Correct endpoint called
- 200 OK response
- Request/response body correct

---

## Pass/Fail Criteria

### PASS Criteria
- ✅ All P0 (Critical) test cases pass
- ✅ At least 90% of P1 (High) test cases pass
- ✅ No console errors
- ✅ API responses correct (200 OK)
- ✅ All responsive layouts work
- ✅ Offline mode functions correctly

### FAIL Criteria
- ❌ ANY P0 test case fails
- ❌ Critical console errors
- ❌ API errors (4xx, 5xx)
- ❌ Broken core functionality
- ❌ Data loss or corruption

### CONCERNS Criteria
- ⚠️ P1 test case fails (non-critical)
- ⚠️ Performance issues (load time > 2s)
- ⚠️ Minor UI inconsistencies
- ⚠️ Non-blocking console warnings

---

## Test Execution Summary Template

```markdown
## Test Execution Results

**Execution Date:** YYYY-MM-DD HH:MM:SS
**Executed By:** Quinn (QA Agent)
**Browser:** Chrome 120
**Test Environment:** http://localhost:3000

**Summary:**
- Total Test Cases: 37
- Passed: ✅ X
- Failed: ❌ Y
- Blocked: ⛔ Z
- Duration: MM minutes SS seconds

**Critical Issues:** None / List issues

**Recommendation:** PASS / CONCERNS / FAIL
```

---

**End of E2E Test Scenarios Document**

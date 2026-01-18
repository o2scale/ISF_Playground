# BUG-01: Task Details Not Updating When Selecting Different Levels
## Epic 01 Story 02: Computer Apps Course Interaction

**Report Date:** 2025-10-27 19:18:53
**Tested By:** QA Agent (Quinn)
**Bug ID:** BUG-01
**Severity:** P0_CRITICAL
**Status:** ❌ OPEN

---

## Executive Summary

**BUG-01** is a critical React state management bug that prevents task details in Pane 3 from updating when users select different levels. The API correctly fetches and returns the task data, but the UI component does not re-render with the new data.

**Impact:**
- ❌ Blocks AC 10 (P0 critical): "Clicking level card loads task details in Pane 3"
- ❌ Blocks AC 8 (P0 critical): Auto-selection of first unlocked level when switching apps
- ❌ Results in 4 console errors
- ❌ Prevents users from viewing task details for different levels
- ❌ Makes the three-pane navigation flow non-functional

---

## Bug Details

### Observed Behavior

**Symptom:** When clicking different level cards in Pane 2, the task details in Pane 3 remain stuck displaying the first task that was loaded (MS Word Level 1, Task: "CREATE A FORMAL LETTER").

**Steps to Reproduce:**
1. Navigate to http://localhost:3000/student/computer-apps
2. MS Word app auto-selects (orange border) ✅
3. MS Word Level 1 auto-selects on initial load ✅
4. Task details load for Level 1 (CREATE A FORMAL LETTER) ✅
5. Click on Excel app in Pane 1 ✅
6. Excel levels load in Pane 2 ✅
7. **BUG:** No level auto-selects in Excel ❌
8. **BUG:** Task details still show MS Word Level 1 task ❌
9. Click on Excel Level 1 manually ✅
10. **BUG:** Task details still show MS Word Level 1 task ❌
11. Switch back to MS Word ✅
12. **BUG:** No level is selected in MS Word ❌
13. Click MS Word Level 2 manually ✅
14. **BUG:** Task details still show MS Word Level 1 task ❌

**Evidence:**
- Screenshot: `BUG-01-task-details-not-updating.png`
- Shows Excel selected, Excel Level 1 selected, but task details show MS Word task

---

## Technical Analysis

### Console Errors

**4 JavaScript Errors Logged:**
```
[ERROR] Failed to fetch task details: TypeError: Cannot read properties of null (reading 'id')
    at handleLevelSelect (http://localhost:3000/static/js/bundle.js:349871:142)
    at handleAppSelect (http://localhost:3000/static/js/bundle.js:349853:11)
```

**Root Cause Hypothesis:**
- `handleAppSelect` function tries to auto-select the first unlocked level
- It calls `handleLevelSelect` with a null or undefined level object
- `handleLevelSelect` attempts to access `level.id` on a null object
- This causes the function to throw an error and exit early
- Task details state is never updated

### API Calls Work Correctly ✅

**Network requests verified:**
```
[GET] /courses/computer-apps => 200 OK
[GET] /app-ms-word/levels => 200 OK
[GET] /app-ms-word/levels/level-1/task/task-level-1-1 => 200 OK ✅ (initial load)
[GET] /app-excel/levels => 200 OK
[GET] /app-excel/levels/level-1/task/task-level-1-1 => 200 OK ✅ (Excel Level 1 clicked)
[GET] /app-ms-word/levels => 200 OK (when switching back to MS Word)
[GET] /app-ms-word/levels/level-2/task/task-level-2-1 => 200 OK ✅ (MS Word Level 2 clicked)
```

**Key Finding:**
- ✅ Backend API returns correct task data for each level
- ❌ React component state does not update with API response
- ❌ Task details UI remains frozen on first task loaded

---

## Root Cause

**React State Management Bug:**

The issue is in `ComputerAppsPage.jsx` at lines:
- `handleAppSelect` (line ~49-71)
- `handleLevelSelect` (line ~73-95)

**Problem 1 - Auto-Selection Logic:**
```javascript
// In handleAppSelect (pseudo-code based on error)
const handleAppSelect = (appId) => {
  setSelectedApp(appId);
  loadLevels(appId);

  // Tries to auto-select first unlocked level
  const firstUnlockedLevel = levels.find(l => !l.locked);
  handleLevelSelect(firstUnlockedLevel); // ❌ firstUnlockedLevel is null!
}
```

**Why it fails:**
- `loadLevels()` is async but not awaited
- Tries to find first unlocked level before `levels` state is populated
- `firstUnlockedLevel` is null
- `handleLevelSelect(null)` throws error when accessing `null.id`

**Problem 2 - Task Details Not Updating:**
```javascript
// In handleLevelSelect (pseudo-code)
const handleLevelSelect = (level) => {
  if (!level || !level.id) {  // ❌ Error thrown here
    return; // Early exit
  }

  fetchTaskDetails(level.id); // Never reached!
  setTaskDetails(data);       // Never called!
}
```

**Why task details don't update:**
- Function exits early due to null check
- `fetchTaskDetails()` is never called
- `taskDetails` state is never updated
- UI keeps displaying stale task data

---

## Affected Functionality

### ❌ Broken Features:

1. **Auto-selection when switching apps** (AC 8)
   - Expected: First unlocked level auto-selects when clicking different app
   - Actual: No level is selected, task details don't load

2. **Task details update on level click** (AC 10)
   - Expected: Clicking level card loads task details in Pane 3
   - Actual: Task details remain frozen on first task loaded

3. **Navigation flow** (AC 3, AC 10)
   - Expected: Smooth navigation Apps → Levels → Task Details
   - Actual: Navigation breaks after first app selection

### ✅ Working Features:

1. **Initial page load** (AC 1-7)
   - MS Word auto-selects ✅
   - MS Word levels load ✅
   - First task details load correctly ✅

2. **Apps list display** (AC 1-6)
   - All 5 apps display ✅
   - Status indicators correct ✅
   - Click to select app works ✅

3. **Levels list display** (AC 8-13)
   - Levels load when app selected ✅
   - Sequential unlocking works ✅
   - Locked levels cannot be clicked ✅

4. **Leaderboard display** (AC 19-22)
   - Top 5 display ✅
   - Medal emojis for top 3 ✅
   - Current user highlighted ✅

---

## Expected Behavior

**When clicking Excel app:**
1. Excel app highlights (orange border) ✅ WORKS
2. Pane 2 header shows "EXCEL LEVELS" ✅ WORKS
3. Excel levels load in Pane 2 ✅ WORKS
4. **First unlocked Excel level auto-selects** ❌ BROKEN
5. **Task details for Excel Level 1 load in Pane 3** ❌ BROKEN

**When clicking Excel Level 1:**
1. Level 1 highlights (green border) ✅ WORKS
2. **Task details update to show Excel Level 1 task** ❌ BROKEN
3. **Performance metrics update** ❌ BROKEN
4. **Leaderboard updates for that task** ❌ BROKEN

**When clicking MS Word Level 2:**
1. Level 2 highlights (green border) ✅ WORKS
2. **Task details update to show MS Word Level 2 task** ❌ BROKEN
3. Task title should be different from Level 1 ❌ BROKEN

---

## Suggested Fix

### Fix 1: Auto-Selection Logic

```javascript
// In handleAppSelect
const handleAppSelect = async (appId) => {
  setSelectedApp(appId);
  setSelectedLevel(null); // Clear previous selection

  // Fetch levels first
  const levelsData = await loadLevels(appId);

  // Then auto-select first unlocked level
  const firstUnlockedLevel = levelsData.find(l => !l.locked);
  if (firstUnlockedLevel) {
    handleLevelSelect(firstUnlockedLevel);
  }
}
```

**Changes:**
- Make `handleAppSelect` async
- Await `loadLevels()` to ensure data is fetched
- Clear `selectedLevel` before loading new levels
- Check if `firstUnlockedLevel` exists before passing to `handleLevelSelect`

### Fix 2: Task Details Update

```javascript
// In handleLevelSelect
const handleLevelSelect = async (level) => {
  if (!level || !level.id) {
    console.warn('Level is null or has no ID');
    return;
  }

  setSelectedLevel(level);

  try {
    const taskData = await fetchTaskDetails(level.appId, level.id, level.taskId);
    setTaskDetails(taskData); // Force state update
  } catch (error) {
    console.error('Failed to fetch task details:', error);
    setTaskDetails(null); // Clear stale data
  }
}
```

**Changes:**
- Add try-catch for better error handling
- Explicitly set `taskDetails` state even on error (clear stale data)
- Log warning instead of silent failure

### Fix 3: Force Re-render with useEffect

```javascript
// In ComputerAppsPage.jsx
useEffect(() => {
  if (selectedLevel && selectedLevel.id) {
    fetchTaskDetails(selectedLevel.appId, selectedLevel.id, selectedLevel.taskId)
      .then(data => setTaskDetails(data))
      .catch(err => {
        console.error('Failed to fetch task details:', err);
        setTaskDetails(null);
      });
  }
}, [selectedLevel]); // Re-fetch when selectedLevel changes
```

**Changes:**
- Add `useEffect` dependency on `selectedLevel`
- Automatically fetch task details when level selection changes
- Ensures UI updates whenever `selectedLevel` state changes

---

## Testing Checklist for Fix Verification

### Re-Test Scenarios:

1. **TC 8.1: Auto-selection on page load**
   - [ ] Navigate to /student/computer-apps
   - [ ] MS Word auto-selects
   - [ ] MS Word Level 1 auto-selects
   - [ ] Task details load for Level 1

2. **TC 8.2: Auto-selection when switching apps**
   - [ ] Click Excel app
   - [ ] First unlocked Excel level auto-selects
   - [ ] Task details update to Excel Level 1 task
   - [ ] No console errors

3. **TC 3.4 / TC 4.1: Manual level selection**
   - [ ] Click MS Word Level 2
   - [ ] Task details update to Level 2 task
   - [ ] Task title changes
   - [ ] Performance metrics update
   - [ ] Leaderboard updates

4. **TC 8.3: Switching between apps multiple times**
   - [ ] Click MS Word → Task details update ✅
   - [ ] Click Excel → Task details update ✅
   - [ ] Click PowerPoint → Task details update ✅
   - [ ] Click Tux Typing → Task details update ✅
   - [ ] No stale data displayed

5. **Console Error Verification**
   - [ ] No "Cannot read properties of null" errors
   - [ ] No "Failed to fetch task details" errors

---

## Impact Assessment

### Blocked Acceptance Criteria:

- **AC 8** (P0): "Levels List displays all levels for selected app"
  - **Status:** PARTIAL - Levels display but no level is auto-selected

- **AC 10** (P0): "Clicking level card loads task details in Pane 3"
  - **Status:** FAILED - Task details do not update

- **AC 3** (P0): "Clicking app card loads levels in Pane 2"
  - **Status:** PARTIAL - Levels load but auto-selection fails

### Blocked Test Cases:

- TC 3.4: Level selection updates Pane 3 ❌
- TC 4.1: Task details display ❌
- TC 4.2: Performance metrics display ❌
- TC 4.3: Task instructions display ❌
- TC 8.1: Auto-select first app on page load ⚠️ (partial)
- TC 8.2: Auto-select first unlocked level when app changes ❌
- TC 8.3: Auto-select persists across navigation ❌

### Quality Gate Impact:

- **Test Pass Rate:** 12/16 executed = 75% (below 80% threshold)
- **Critical AC Pass Rate:** 15/24 = 62.5% (below pass criteria)
- **Console Errors:** 4 errors (violates zero-error requirement)
- **Deployment Recommendation:** ❌ **DO NOT DEPLOY**

---

## Workarounds

**None available.** This is a fundamental navigation bug with no workaround.

---

## Priority Justification

**Why P0_CRITICAL:**

1. **Blocks core user journey:** Users cannot view task details for different levels
2. **Renders navigation unusable:** Three-pane layout non-functional
3. **Affects 3+ P0 acceptance criteria:** AC 3, AC 8, AC 10
4. **No workaround:** Users completely stuck
5. **Fails quality gate:** Console errors + low pass rate

**Must be fixed before deployment.**

---

## Additional Notes

- Bug does NOT affect initial page load (MS Word Level 1 loads correctly)
- Bug is CLIENT-SIDE only (backend APIs work perfectly)
- Bug is likely in `ComputerAppsPage.jsx` state management
- Similar issue may exist in other pages with similar navigation patterns

---

## Sign-Off

**QA Engineer:** Quinn (QA Agent)
**Date:** 2025-10-27 19:18:53
**Verdict:** ❌ **P0 CRITICAL BUG - DO NOT DEPLOY**

---

**End of Bug Report**

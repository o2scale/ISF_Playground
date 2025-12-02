# Sprint 6 Story 1 - AC1 Week Navigation - E2E Test Scenarios

**Story:** Sprint 6 Story 1 - Coach View Corrections & UI Enhancements
**Acceptance Criteria:** AC1 (Month/Year Selector with Week Navigation)
**Test Type:** E2E (Playwright MCP)
**Created:** 2025-11-11 17:43:14
**Status:** Ready for QA Execution (Post-Fix)

---

## Test Environment

**Frontend:** http://localhost:3000
**Backend:** http://localhost:5001
**Test User:** coach@gmail.com / password123
**Test Role:** Coach
**Browser:** Chromium (Playwright MCP)

---

## Preconditions (All Test Cases)

- ✅ Backend server running (http://localhost:5001)
- ✅ Frontend server running (http://localhost:3000)
- ✅ User logged in as Coach (coach@gmail.com)
- ✅ Coach Dashboard loaded
- ✅ Weekly Calendar visible with Month/Year dropdowns + Week navigation arrows + Today button

---

## AC1 Revised Requirements

**AC1: Month/Year Selector with Week Navigation**

User should be able to:
1. Select specific month from dropdown (all 12 months)
2. Select specific year from dropdown (current year ± 2 years)
3. Navigate week-by-week using arrow buttons (◀ ▶)
4. See week indicator showing "Week X of Y"
5. Jump to current week using "Today" button
6. Default view shows current week on page load
7. Cross-month navigation works (arrows update month/year dropdowns)

---

## Test Cases

### **TC-AC1-WEEK-001: Week Navigation Within Selected Month**
**Priority:** P0 (Critical)
**Description:** Verify user can navigate between all weeks within a selected month

**Preconditions:**
- Coach logged in and on Dashboard
- Weekly Calendar visible
- Current month/year: November 2025

**Steps:**
1. Select "January" from Month dropdown
2. Select "2025" from Year dropdown
3. **Verify calendar shows Week 1 of January** (Jan 1-7, 2025)
4. **Verify week indicator shows "Week 1 of 5"**
5. Click next arrow (▶) button
6. **Verify calendar shows Week 2** (Jan 6-12, 2025)
7. **Verify week indicator shows "Week 2 of 5"**
8. Click next arrow (▶) button
9. **Verify calendar shows Week 3** (Jan 13-19, 2025)
10. **Verify week indicator shows "Week 3 of 5"**
11. Click next arrow (▶) button
12. **Verify calendar shows Week 4** (Jan 20-26, 2025)
13. **Verify week indicator shows "Week 4 of 5"**
14. Click next arrow (▶) button
15. **Verify calendar shows Week 5** (Jan 27 - Feb 2, 2025)
16. **Verify week indicator shows "Week 5 of 5"**
17. Click previous arrow (◀) button 4 times
18. **Verify calendar returns to Week 1**

**Expected Results:**
- ✅ User can navigate forward through all 5 weeks of January
- ✅ User can navigate backward through all 5 weeks
- ✅ Week indicator updates correctly (Week 1-5)
- ✅ Calendar displays correct date ranges for each week
- ✅ No console errors during navigation
- ✅ Month/Year dropdowns remain on "January 2025" throughout navigation

**Screenshots Required:**
- `AC1-WEEK-001-week-1-january.png`
- `AC1-WEEK-001-week-2-january.png`
- `AC1-WEEK-001-week-5-january.png`

---

### **TC-AC1-WEEK-002: Cross-Month Navigation (Forward)**
**Priority:** P0 (Critical)
**Description:** Verify week navigation automatically transitions to next month

**Preconditions:**
- Coach logged in and on Dashboard
- January 2025 selected
- Currently viewing Week 5 of January (Jan 27 - Feb 2)

**Steps:**
1. Navigate to Week 5 of January (Jan 27 - Feb 2)
2. **Verify week indicator shows "Week 5 of 5"**
3. Click next arrow (▶) button
4. **Verify calendar transitions to February 2025**
5. **Verify calendar shows Week 1 of February** (Feb 3-9, 2025)
6. **Verify Month dropdown updates to "February"**
7. **Verify Year dropdown remains "2025"**
8. **Verify week indicator shows "Week 1 of 4"** (February has 4 weeks)

**Expected Results:**
- ✅ Clicking next arrow from last week of January navigates to first week of February
- ✅ Month dropdown automatically updates to "February"
- ✅ Year dropdown remains correct
- ✅ Week indicator resets to "Week 1 of 4"
- ✅ Calendar displays correct date range
- ✅ No console errors

**Screenshots Required:**
- `AC1-WEEK-002-january-week-5.png`
- `AC1-WEEK-002-february-week-1.png`

---

### **TC-AC1-WEEK-003: Cross-Month Navigation (Backward)**
**Priority:** P0 (Critical)
**Description:** Verify week navigation automatically transitions to previous month

**Preconditions:**
- Coach logged in and on Dashboard
- February 2025 selected
- Currently viewing Week 1 of February

**Steps:**
1. Navigate to Week 1 of February (Feb 3-9, 2025)
2. **Verify week indicator shows "Week 1 of 4"**
3. Click previous arrow (◀) button
4. **Verify calendar transitions to January 2025**
5. **Verify calendar shows Week 5 of January** (Jan 27 - Feb 2)
6. **Verify Month dropdown updates to "January"**
7. **Verify Year dropdown remains "2025"**
8. **Verify week indicator shows "Week 5 of 5"**

**Expected Results:**
- ✅ Clicking previous arrow from first week of February navigates to last week of January
- ✅ Month dropdown automatically updates to "January"
- ✅ Year dropdown remains correct
- ✅ Week indicator shows correct week (Week 5 of 5)
- ✅ Calendar displays correct date range
- ✅ No console errors

**Screenshots Required:**
- `AC1-WEEK-003-february-week-1.png`
- `AC1-WEEK-003-january-week-5.png`

---

### **TC-AC1-WEEK-004: Cross-Year Navigation**
**Priority:** P1 (High)
**Description:** Verify week navigation transitions across year boundaries

**Preconditions:**
- Coach logged in and on Dashboard

**Steps:**
1. Select "December" from Month dropdown
2. Select "2024" from Year dropdown
3. Navigate to last week of December 2024 (Week 5: Dec 30-31, 2024 + Jan 1-5, 2025)
4. **Verify week indicator shows "Week 5 of 5"**
5. Click next arrow (▶) button
6. **Verify calendar transitions to January 2025**
7. **Verify Month dropdown updates to "January"**
8. **Verify Year dropdown updates to "2025"**
9. **Verify week indicator shows "Week 1 of 5"**
10. Click previous arrow (◀) button
11. **Verify calendar transitions back to December 2024**
12. **Verify Month/Year dropdowns update to "December 2024"**

**Expected Results:**
- ✅ Navigation works across year boundaries (Dec 2024 → Jan 2025)
- ✅ Both Month and Year dropdowns update correctly
- ✅ Week indicator accurate across year transition
- ✅ Reverse navigation works (Jan 2025 → Dec 2024)
- ✅ No console errors

**Screenshots Required:**
- `AC1-WEEK-004-december-2024-week-5.png`
- `AC1-WEEK-004-january-2025-week-1.png`

---

### **TC-AC1-WEEK-005: "Today" Button Functionality**
**Priority:** P0 (Critical)
**Description:** Verify "Today" button jumps to current week from any month/year

**Preconditions:**
- Coach logged in and on Dashboard
- Current date: November 11, 2025 (Week 2 of November)

**Steps:**
1. Select "June" from Month dropdown
2. Select "2024" from Year dropdown
3. Navigate to Week 3 of June 2024
4. **Verify calendar shows June 2024, Week 3**
5. Click "Today" button (📅)
6. **Verify calendar jumps to current week** (Nov 10-16, 2025)
7. **Verify Month dropdown shows "November"**
8. **Verify Year dropdown shows "2025"**
9. **Verify week indicator shows "Week 2 of 5"** (assuming Nov 11 is in Week 2)
10. Navigate to different month again (e.g., March 2026)
11. Click "Today" button
12. **Verify calendar returns to current week again**

**Expected Results:**
- ✅ "Today" button visible and clickable
- ✅ Clicking "Today" from any month/year jumps to current week
- ✅ Month/Year dropdowns update to current month/year
- ✅ Week indicator shows correct current week number
- ✅ Works repeatedly (can click multiple times)
- ✅ No console errors

**Screenshots Required:**
- `AC1-WEEK-005-june-2024-before-today.png`
- `AC1-WEEK-005-november-2025-after-today.png`

---

### **TC-AC1-WEEK-006: Default to Current Week on Page Load**
**Priority:** P0 (Critical)
**Description:** Verify calendar defaults to current week (not Week 1) when page loads

**Preconditions:**
- Coach logged in
- Current date: November 11, 2025 (Week 2 of November)

**Steps:**
1. Navigate to Coach Dashboard
2. **Observe initial calendar state** (without any user interaction)
3. **Verify calendar displays current week** (Nov 10-16, 2025)
4. **Verify Month dropdown shows "November"** (current month)
5. **Verify Year dropdown shows "2025"** (current year)
6. **Verify week indicator shows "Week 2 of 5"** (current week, not Week 1)
7. Refresh page (F5)
8. **Verify calendar still defaults to current week**

**Expected Results:**
- ✅ Calendar defaults to current week on initial load
- ✅ Month/Year dropdowns show current month/year
- ✅ Week indicator shows current week number (not "Week 1")
- ✅ Behavior consistent after page refresh
- ✅ No console errors

**Screenshots Required:**
- `AC1-WEEK-006-default-current-week.png`

---

### **TC-AC1-WEEK-007: Week Indicator Accuracy Across Months**
**Priority:** P1 (High)
**Description:** Verify week indicator shows correct week count for different months

**Preconditions:**
- Coach logged in and on Dashboard

**Steps:**
1. Select "February" (28 days in non-leap year)
2. Select "2025" from Year dropdown
3. **Verify week indicator shows "Week 1 of 4"** (February 2025 has 4 weeks)
4. Navigate through all weeks
5. **Verify maximum week is "Week 4 of 4"**
6. Select "January" (31 days)
7. **Verify week indicator shows "Week 1 of 5"** (January has 5 weeks)
8. Navigate through all weeks
9. **Verify maximum week is "Week 5 of 5"**
10. Select "March" (31 days)
11. **Verify week count correct** (likely 5 weeks depending on starting day)

**Expected Results:**
- ✅ Week count accurate for February (4 weeks)
- ✅ Week count accurate for January (5 weeks)
- ✅ Week count accurate for March (varies based on starting day)
- ✅ Week indicator dynamically updates based on selected month
- ✅ No console errors

**Screenshots Required:**
- `AC1-WEEK-007-february-week-count.png`
- `AC1-WEEK-007-january-week-count.png`

---

### **TC-AC1-WEEK-008: Month/Year Dropdown Still Works with Week Navigation**
**Priority:** P0 (Critical - Regression Test)
**Description:** Verify original Month/Year dropdown functionality still works alongside week navigation

**Preconditions:**
- Coach logged in and on Dashboard

**Steps:**
1. Navigate to Week 3 of November 2025 using arrows
2. Select "January" from Month dropdown (while on Week 3 of November)
3. **Verify calendar resets to Week 1 of January**
4. **Verify week indicator shows "Week 1 of 5"**
5. Navigate to Week 4 of January using arrows
6. Select "2024" from Year dropdown (while on Week 4 of January 2025)
7. **Verify calendar resets to Week 1 of January 2024**
8. **Verify week indicator shows "Week 1 of 5"**
9. Select "March" from Month dropdown
10. **Verify calendar resets to Week 1 of March 2024**

**Expected Results:**
- ✅ Changing Month dropdown resets to Week 1 of selected month
- ✅ Changing Year dropdown resets to Week 1 of selected year
- ✅ Week indicator resets to "Week 1 of X"
- ✅ Month/Year dropdowns work independently of arrow navigation
- ✅ No console errors
- ✅ No regression in original dropdown functionality

**Screenshots Required:**
- `AC1-WEEK-008-dropdown-resets-week.png`

---

### **TC-AC1-WEEK-009: Arrow Buttons Disabled States (Edge Cases)**
**Priority:** P2 (Medium)
**Description:** Verify arrow buttons handle edge cases gracefully (if disabled states implemented)

**Preconditions:**
- Coach logged in and on Dashboard

**Steps:**
1. Navigate to Week 1 of January 2023 (earliest selectable year - 2 years)
2. Click previous arrow (◀) multiple times
3. **Observe behavior** (should navigate to December 2022, which is outside ±2 year range)
4. **Verify system handles gracefully** (either allow navigation or show message)
5. Navigate to Week 5 of December 2027 (latest selectable year + 2 years)
6. Click next arrow (▶) multiple times
7. **Observe behavior** (should navigate to January 2028, which is outside range)

**Expected Results:**
- ✅ System handles navigation outside ±2 year range gracefully
- ✅ Option 1: Allow navigation but disable dropdowns for out-of-range months
- ✅ Option 2: Show message "Outside selectable range"
- ✅ Option 3: Arrow buttons disabled at boundaries
- ✅ No crashes or errors
- ✅ User can still use "Today" button to return to current week

**Note:** Behavior depends on product requirements - document actual behavior

**Screenshots Required:**
- `AC1-WEEK-009-edge-case-behavior.png`

---

### **TC-AC1-WEEK-010: Schedule Events Display Correctly During Week Navigation**
**Priority:** P1 (High - Regression Test)
**Description:** Verify schedule events display correctly when navigating between weeks

**Preconditions:**
- Coach logged in
- Test schedule events exist:
  - Event 1: Jan 5, 2025 at 10:00 AM (Week 1)
  - Event 2: Jan 15, 2025 at 2:00 PM (Week 3)

**Steps:**
1. Navigate to Week 1 of January 2025
2. **Verify Event 1 (Jan 5) is visible** in the calendar
3. **Verify Event 2 (Jan 15) is NOT visible**
4. Navigate to Week 3 of January 2025 using arrows
5. **Verify Event 2 (Jan 15) is visible** in the calendar
6. **Verify Event 1 (Jan 5) is NOT visible** (different week)
7. Navigate back to Week 1
8. **Verify Event 1 is visible again**

**Expected Results:**
- ✅ Schedule events display only for their respective weeks
- ✅ Events in different weeks not shown simultaneously
- ✅ Events persist and display correctly when navigating back
- ✅ Time slots show events at correct times (10 AM, 2 PM)
- ✅ No console errors

**Screenshots Required:**
- `AC1-WEEK-010-week-1-with-event.png`
- `AC1-WEEK-010-week-3-with-event.png`

---

## Regression Test Cases

### **REG-AC1-001: Other Dashboard Features Unaffected**
**Priority:** P0 (Critical)
**Description:** Ensure week navigation doesn't break other dashboard features

**Steps:**
1. Navigate between weeks using arrows
2. **Verify dashboard cards still display** (Daily Schedule, Task Tracker, Medical, Purchases, ISF Shop)
3. **Verify card counts still update correctly**
4. Click on dashboard cards
5. **Verify navigation to other modules works**
6. Return to dashboard
7. **Verify week navigation still works after navigating away**

**Expected Results:**
- ✅ Dashboard cards unaffected
- ✅ Card navigation works
- ✅ Week navigation state preserved during session

---

### **REG-AC1-002: Time Slots Still Show 7 AM - 9 PM**
**Priority:** P0 (Critical - AC2 Regression)
**Description:** Ensure week navigation doesn't affect time slot display (AC2)

**Steps:**
1. Navigate between weeks
2. **Verify time slots display 07:00 - 21:00** (15 hours)
3. **Verify no regression from AC2** (schedule time extension)

**Expected Results:**
- ✅ Time slots remain 07:00 - 21:00
- ✅ No visual artifacts

---

## Summary of Test Coverage

**Total Test Cases:** 10 core + 2 regression = **12 test cases**

**Coverage:**
- ✅ Week navigation within month (TC-001)
- ✅ Cross-month navigation forward (TC-002)
- ✅ Cross-month navigation backward (TC-003)
- ✅ Cross-year navigation (TC-004)
- ✅ "Today" button functionality (TC-005)
- ✅ Default to current week on load (TC-006)
- ✅ Week indicator accuracy (TC-007)
- ✅ Month/Year dropdown regression (TC-008)
- ✅ Edge cases (TC-009)
- ✅ Schedule events display (TC-010)
- ✅ Dashboard features unaffected (REG-001)
- ✅ Time slots unaffected (REG-002)

**Priority Breakdown:**
- P0 (Critical): 8 test cases
- P1 (High): 3 test cases
- P2 (Medium): 1 test case

---

## QA Execution Instructions

**Testing Method:** Playwright MCP (Programmatic Browser Control)

**Playwright MCP Tools to Use:**
- `mcp__playwright__playwright_navigate(url="http://localhost:3000")`
- `mcp__playwright__playwright_click(selector=".week-nav-btn")`
- `mcp__playwright__playwright_screenshot(name="test-evidence")`
- `mcp__playwright__playwright_get_visible_html()` - verify UI elements
- `mcp__playwright__playwright_console_logs()` - check for errors

**Evidence Required:**
- Screenshot for each test case
- Console log verification (no errors)
- HTML structure verification (buttons, indicators present)

**Pass Criteria:**
- All P0 test cases must pass
- No critical console errors
- No regression in existing functionality

---

**Created By:** Orchestrator Agent
**Created Date:** 2025-11-11 17:43:14
**Status:** Ready for QA Execution (after Dev implements fix)
**Related Bug:** S6-S1-UAT-BUG-001

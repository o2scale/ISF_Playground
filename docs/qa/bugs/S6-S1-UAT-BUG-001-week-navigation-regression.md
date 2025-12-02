# Bug Report: S6-S1-UAT-BUG-001 - Week Navigation Regression

**Bug ID:** S6-S1-UAT-BUG-001
**Story:** Sprint 6 Story 1 - Coach View Corrections & UI Enhancements
**Acceptance Criteria:** AC1 (Month/Year Selector)
**Severity:** 🔴 HIGH (Blocks Core Workflow)
**Priority:** 🔴 URGENT
**Status:** 🔴 OPEN
**Identified By:** Client UAT Testing
**Identified Date:** 2025-11-11 17:43:14
**Environment:** Production-ready build (post-QA)

---

## Summary

Month/Year dropdown implementation successfully replaced arrow navigation for month/year selection, but **completely removed week-by-week navigation capability**, preventing users from viewing weeks 2-5 of any selected month.

---

## Steps to Reproduce

1. Login as Coach (coach@gmail.com)
2. Navigate to Dashboard
3. Locate Weekly Calendar with Month/Year dropdowns
4. Select "January 2025" from dropdowns
5. Observe calendar displays Week 1 of January (Jan 1-7)
6. **Try to navigate to Week 2, 3, 4, or 5 of January**

---

## Expected Behavior

- User should be able to navigate between weeks within the selected month
- Week navigation arrows (◀ ▶) should allow moving between weeks
- Default view should show **current week**, not Week 1
- "Today" button should jump to current week
- Cross-month navigation should work (Jan Week 5 → Feb Week 1)

**Expected UI:**
```
[Month: January ▼] [Year: 2025 ▼]  ◀ Week 2 of 5 ▶  [📅 Today]

Weekly Calendar (Jan 6-12, 2025)
```

---

## Actual Behavior

- Only Week 1 of selected month is visible
- No arrows or buttons to navigate between weeks
- User is stuck viewing only the first week of any month
- Cannot access weeks 2-5 of any month

**Actual UI:**
```
[Month: January ▼] [Year: 2025 ▼]

Weekly Calendar (Jan 1-7, 2025) ← STUCK HERE, cannot navigate
```

---

## Impact Assessment

### **User Impact: CRITICAL**
- Coaches cannot view full month schedules
- Can only see Week 1 of any selected month
- Severely limits scheduling and planning capabilities
- Blocks daily coach operations
- Users may think application is broken or incomplete

### **Business Impact: HIGH**
- Core dashboard functionality compromised
- User frustration likely
- May require immediate hotfix deployment
- Affects all coaches using the system

### **Workaround:**
**NONE** - No way to access weeks 2-5 of any month

---

## Root Cause

The original arrow buttons served **TWO purposes**:
1. ✅ Navigate between months (replaced by dropdowns - GOOD)
2. ❌ Navigate between weeks within a month (LOST - BAD)

**Code Location:** `frontend/src/components/coach/WeeklyCalendar.js`
- Lines 544-556: Original arrow buttons completely removed
- No alternative week navigation implemented
- Month/Year dropdowns only navigate to Week 1 of selected month

**Why QA Didn't Catch This:**
- Automated E2E tests verified dropdowns work
- Tests verified month/year selection updates calendar
- Tests didn't verify **week-by-week navigation within a month**
- Manual UAT uncovered the workflow regression

---

## Proposed Fix

### **Solution: Restore Week Navigation with Enhanced UX**

**Implementation:** Add week navigation arrows + "Today" button + week indicator

**UI Layout:**
```
[Month: January ▼] [Year: 2025 ▼]  ◀ Week 2 of 5 ▶  [📅 Today]

Weekly Calendar (Jan 6-12, 2025)
```

**Components:**
1. **Month/Year Dropdowns** - Keep as-is (fast long-range navigation)
2. **Week Arrows** - Restore week-by-week navigation (short-range navigation)
3. **Week Indicator** - Show "Week X of Y"
4. **Today Button** - Jump to current week
5. **Default Behavior** - Show current week on page load (not Week 1)

---

## Technical Details

### **Files Affected:**
- `frontend/src/components/coach/WeeklyCalendar.js` (PRIMARY)

### **Required Changes:**

1. **Add State Management:**
```jsx
const [weekOffset, setWeekOffset] = useState(0); // Track week within month
```

2. **Add Week Calculation Function:**
```jsx
const getWeeksInMonth = (month, year) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  return Math.ceil((lastDay.getDate() + firstDay.getDay()) / 7);
};
```

3. **Add Navigation Handlers:**
- `handlePreviousWeek()`
- `handleNextWeek()`
- `handleToday()`

4. **Update UI:**
- Add arrow buttons (◀ ▶)
- Add week indicator (`Week {weekOffset + 1} of {getWeeksInMonth()}`)
- Add "Today" button
- Wire handlers to buttons

5. **Initialize to Current Week:**
```jsx
useEffect(() => {
  // Calculate current week offset
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const currentWeekOffset = Math.floor((today.getDate() + firstDayOfMonth.getDay() - 1) / 7);
  setWeekOffset(currentWeekOffset);
}, []);
```

**Detailed implementation guide available in:** `docs/stories/sprint6/sprint6-story-01-coach-view-corrections.md` (Post-QA UAT Findings section)

---

## Testing Requirements

**New E2E Test Cases (QA Re-Test):**

1. **TC-AC1-WEEK-001:** Week navigation within selected month (5 test cases)
2. **TC-AC1-WEEK-002:** Cross-month navigation (Feb → Mar, etc.)
3. **TC-AC1-WEEK-003:** "Today" button functionality
4. **TC-AC1-WEEK-004:** Default to current week on page load
5. **TC-AC1-WEEK-005:** Week indicator accuracy across different months

**Regression Tests:**
- Verify Month/Year dropdowns still work
- Verify schedule events display correctly
- Verify time slots (7 AM - 9 PM) still functional
- Verify other dashboard features unaffected

**Test Scenarios File:** `docs/qa/e2e/sprint6-story-01-ac1-week-navigation.md`

---

## Estimate

**Development Time:** 1-2 hours
**QA Testing Time:** 30 minutes
**Total Turnaround:** 2-3 hours

---

## Resolution History

| Date | Time | Action | By |
|------|------|--------|-----|
| 2025-11-11 | 17:43:14 | Bug identified during client UAT | Orchestrator |
| 2025-11-11 | 17:43:14 | Bug report created | Orchestrator |
| 2025-11-11 | 17:43:14 | Story updated with fix requirements | Orchestrator |

---

## Acceptance Criteria for Resolution

**Bug will be considered FIXED when:**
- ✅ Week navigation arrows functional (previous/next week)
- ✅ Week indicator displays "Week X of Y"
- ✅ "Today" button jumps to current week
- ✅ Default shows current week on page load (not Week 1)
- ✅ Cross-month navigation works (Jan Week 5 → Feb Week 1)
- ✅ Month/Year dropdowns update when crossing month boundaries via arrows
- ✅ All existing functionality preserved (dropdowns, time slots, schedule events)
- ✅ All 5 new E2E test cases pass
- ✅ Regression tests pass (no new issues introduced)

---

## Related Documentation

- **Story:** `docs/stories/sprint6/sprint6-story-01-coach-view-corrections.md`
- **QA Gate:** `docs/qa/gates/sprint-6-story-01-coach-view-corrections.yml`
- **E2E Tests (Original):** `docs/qa/e2e/sprint6-story-01-coach-view-corrections.md`
- **E2E Tests (Week Nav):** `docs/qa/e2e/sprint6-story-01-ac1-week-navigation.md` (to be created)
- **Sprint 6 Overview:** `docs/stories/sprint6/sprint6-overview.md`

---

**Reported By:** Orchestrator Agent (BMad Orchestrator)
**Report Date:** 2025-11-11 17:43:14
**Last Updated:** 2025-11-11 17:43:14
**Assigned To:** Dev Agent (James)
**Status:** 🔴 OPEN - Awaiting Fix

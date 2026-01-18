# Epic 03 - Story 03: Manual ISF Coin Award System

**Story ID:** SPRINT2-EPIC03-STORY03
**Epic:** Epic 03 - LMS Coach Functionality
**Sprint:** Sprint 2
**Story Name:** Manual ISF Coin Award System
**Estimated Effort:** 4-6 hours (0.5-1 development day)
**Priority:** High (P1)
**Dependencies:**
- Sprint 1.1 RBAC (coach authentication, Balagruha scope)
- Epic 01 Story 06 (ISF Coin Wallet display)
- Backend: MongoDB Transactions collection
- Backend: ISF Coin balance service

**Last Updated:** 2025-10-24 15:28:40
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As a** Coach
**I want to** manually award ISF Coins to students outside the grading workflow
**So that** I can recognize extra effort, good behavior, helping peers, or special achievements

### 1.2. Story Context

Coaches can award coins for:
- **Extra Effort:** Student goes beyond assignment requirements
- **Helping Peers:** Student assists other students with learning
- **Good Behavior:** Positive conduct, leadership, responsibility
- **Special Achievements:** Contest wins, creative work, problem-solving

Awards include:
- Student selection (single or multiple students)
- Coin amount (1-1000 coins, configurable max)
- Required reason/comment (minimum 10 characters)
- Automatic transaction logging
- Instant balance updates
- Student notifications

### 1.3. Key Features

- **Award Coins Modal:** Student search/multi-select, coin amount slider, reason field
- **Bulk Award:** Award same amount to multiple students at once
- **Transaction Logging:** All awards logged with timestamp, coach, student, amount, reason
- **Balance Updates:** Real-time coin balance updates via WebSocket/polling
- **Student Notifications:** In-app notification: "Coach Priya awarded you 50 coins for helping peers!"
- **Award History:** Coach can view their award history with filters
- **Configurable Limits:** Admin-set max coins per award, daily award limit

---

## 1.5. Visual Layout Diagrams

### Award Coins Modal - Single Student Award

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Award ISF Coins                                             [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Select Student(s) *                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ [🔍 Search by name or ID...]                                        │   │ ← Search input
│ └─────────────────────────────────────────────────────────────────────┘   │   (real-time filter)
│                                                                             │
│ [Select All] [Deselect All]                        3 of 24 selected        │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☑ Ravi Kumar                                                        │   │ ← Student checkbox
│ │   Class: 5th • ID: STU001 • Current Balance: 1,250 coins           │   │   selected (bg-blue-50)
│ │                                                                     │   │
│ │ ☑ Priya Sharma                                                      │   │ ← Student checkbox
│ │   Class: 6th • ID: STU003 • Current Balance: 980 coins             │   │   selected (bg-blue-50)
│ │                                                                     │   │
│ │ ☐ Suresh Patel                                                      │   │ ← Student checkbox
│ │   Class: 5th • ID: STU005 • Current Balance: 1,420 coins           │   │   unselected
│ │                                                                     │   │
│ │ ☐ Meera Das                                                         │   │
│ │   Class: 7th • ID: STU007 • Current Balance: 750 coins             │   │
│ │                                                                     │   │
│ │ ☑ Anil Reddy                                                        │   │ ← Student checkbox
│ │   Class: 6th • ID: STU009 • Current Balance: 1,105 coins           │   │   selected (bg-blue-50)
│ │                                                                     │   │
│ │ ... (19 more students, scrollable)                                 │   │ ← Scrollable list
│ └─────────────────────────────────────────────────────────────────────┘   │   (300px max height)
│                                                                             │
│ Coin Amount *                                                               │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │  1 ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1000     │   │ ← Slider (range 1-1000)
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌──────────────┐                                                           │
│ │    100       │  coins per student                                        │ ← Number input (manual)
│ └──────────────┘                                                           │   (synced with slider)
│                                                                             │
│ Total: 300 coins (3 students × 100 coins)                                  │ ← Auto-calculated total
│                                                                             │
│ Reason for Award *                                                          │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Great teamwork helping classmates with the art project!             │   │ ← Textarea (required)
│ │                                                                     │   │   min 10 chars, max 500
│ │                                                                     │   │
│ │                                                                     │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│ 59 / 500 characters                                                        │ ← Character count
│                                                                             │
│ Award Category                                                              │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Helping Peers                                                   ▼  │   │ ← Dropdown (optional)
│ └─────────────────────────────────────────────────────────────────────┘   │   (Extra Effort, Good
│                                                                             │    Behavior, Helping
│ ☑ Send notification to students                                            │    Peers, Achievement)
│                                                                             │
│ [Cancel]                                              [Award Coins]         │ ← Disabled until valid
└─────────────────────────────────────────────────────────────────────────────┘   (student + amount + reason)
```

### Award Success Confirmation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Coins Awarded Successfully!                                 [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│                              ✅ 💰                                          │
│                                                                             │
│ You have successfully awarded 300 ISF Coins!                               │
│                                                                             │
│ Award Summary:                                                              │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Students Awarded: 3                                                 │   │
│ │   • Ravi Kumar (STU001): 100 coins                                  │   │
│ │   • Priya Sharma (STU003): 100 coins                                │   │
│ │   • Anil Reddy (STU009): 100 coins                                  │   │
│ │                                                                     │   │
│ │ Total Coins Awarded: 300                                            │   │
│ │ Reason: Great teamwork helping classmates with the art project!     │   │
│ │ Category: Helping Peers                                             │   │
│ │                                                                     │   │
│ │ Awarded By: Coach Priya                                             │   │
│ │ Awarded At: October 24, 2025 at 3:28 PM                            │   │
│ │ Transaction IDs: TXN-2025-0054, TXN-2025-0055, TXN-2025-0056        │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Students have been notified and coins added to their wallets.              │
│                                                                             │
│ [View Award History]                                   [Close]              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Award History View - Coach Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ My Coin Awards History                           [+ Award New Coins]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ┌────────────────────┐ ┌─────────────────────┐ [🔍 Search...]             │
│ │ All Categories ▼   │ │ Last 30 Days    ▼   │                            │
│ └────────────────────┘ └─────────────────────┘                            │
│                                                                             │
│ Showing 48 awards • Total: 4,850 coins awarded this month                  │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Oct 24, 2025 • 3:28 PM                                      [⋮]     │   │ ← Award card (most recent)
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│ │ 💰 300 coins awarded to 3 students                                  │   │
│ │                                                                     │   │
│ │ Students: Ravi Kumar, Priya Sharma, Anil Reddy                      │   │
│ │ Reason: Great teamwork helping classmates with the art project!     │   │
│ │ Category: Helping Peers                                             │   │
│ │ Transaction IDs: TXN-2025-0054, 0055, 0056                          │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Oct 24, 2025 • 11:15 AM                                     [⋮]     │   │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│ │ 💰 150 coins awarded to 1 student                                   │   │
│ │                                                                     │   │
│ │ Student: Lakshmi Rao (STU011)                                       │   │
│ │ Reason: Excellent presentation on environmental conservation        │   │
│ │ Category: Extra Effort                                              │   │
│ │ Transaction ID: TXN-2025-0051                                       │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Oct 23, 2025 • 4:45 PM                                      [⋮]     │   │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│ │ 💰 800 coins awarded to 8 students                                  │   │
│ │                                                                     │   │
│ │ Students: Entire Balagruha (Ramakrishna Ashram)                     │   │
│ │ Reason: Outstanding team effort cleaning the campus                 │   │
│ │ Category: Good Behavior                                             │   │
│ │ Transaction IDs: TXN-2025-0043 to 0050                              │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ... (45 more awards, paginated)                                            │
│                                                                             │
│ [Load More Awards]                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Award Coins - Quick Action from Student List

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ My Students - Ramakrishna Ashram Balagruha                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Ravi Kumar                                              [⋮ Actions] │   │ ← Context menu
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │   dropdown
│ │ Class: 5th • ID: STU001                                             │   │
│ │ Current Balance: 1,250 coins                                        │   │
│ │ Avg. Performance: 85% • Attendance: 94%                             │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                        ┌────────────────────────────┐                      │
│                        │ View Progress              │                      │ ← Context menu opened
│                        │ Assign Course              │                      │
│                        │ 💰 Award Coins             │                      │ ← Quick award action
│                        │ Send Message               │                      │
│                        │ View Full Profile          │                      │
│                        └────────────────────────────┘                      │
│                                                                             │
│ ... (23 more students)                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Coin Award Validation - Error States

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Award ISF Coins                                             [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Select Student(s) *                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ [🔍 Search by name or ID...]                                        │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ⚠️ Error: Please select at least one student                               │ ← Validation error
│                                                                             │   (red text, bg-red-50)
│ ☐ Ravi Kumar (Class: 5th • ID: STU001 • Balance: 1,250)                    │
│ ☐ Priya Sharma (Class: 6th • ID: STU003 • Balance: 980)                    │
│ ... (22 more students)                                                      │
│                                                                             │
│ Coin Amount *                                                               │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │  1 ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1000     │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌──────────────┐                                                           │
│ │   1500       │  coins per student                                        │
│ └──────────────┘                                                           │
│                                                                             │
│ ⚠️ Error: Maximum 1000 coins per award. Please reduce amount.              │ ← Validation error
│                                                                             │   (red text, bg-red-50)
│ Reason for Award *                                                          │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Good job                                                            │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│ 8 / 500 characters                                                         │
│                                                                             │
│ ⚠️ Error: Reason must be at least 10 characters                            │ ← Validation error
│                                                                             │   (red text, bg-red-50)
│ [Cancel]                                              [Award Coins]         │ ← Button disabled
└─────────────────────────────────────────────────────────────────────────────┘   (gray, cursor-not-allowed)
```

### Component Measurements Summary

| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| **Award Modal** | 700px | auto (max 90vh) | - | - | rounded-lg shadow-xl | - |
| **Modal Header** | 100% | 64px | px-6 py-4 | - | border-b gray-200 | text-xl font-semibold |
| **Student Search Input** | 100% | 48px | px-4 py-3 | mb-4 | border gray-300 rounded-lg | text-base |
| **Student Checkbox Item** | 100% | 72px | px-4 py-3 | mb-2 | border gray-200 rounded-lg | - |
| **Student List Container** | 100% | 300px (max) | - | - | overflow-y-scroll | - |
| **Coin Slider** | 100% | 48px | px-4 | my-4 | - | - |
| **Coin Amount Input** | 160px | 48px | px-4 py-3 | - | border gray-300 rounded-lg | text-lg font-semibold |
| **Reason Textarea** | 100% | 120px | px-4 py-3 | mt-4 | border gray-300 rounded-lg | text-base |
| **Character Count** | auto | auto | - | mt-1 | - | text-sm text-gray-500 |
| **Award Button** | 180px | 48px | px-6 py-3 | - | rounded-lg | text-base font-semibold |
| **Success Modal** | 600px | auto | px-8 py-6 | - | rounded-lg shadow-xl | - |
| **Award Card (History)** | 100% | auto (min 120px) | p-6 | mb-4 | border gray-200 rounded-lg | - |
| **Error Message** | 100% | auto | px-3 py-2 | mt-2 | bg-red-50 rounded | text-sm text-red-600 |

---

## 2. Acceptance Criteria

### 2.1. Award Modal UI

- [ ] **UI-01:** Award Coins modal opens from "Award Coins" button in coach dashboard
- [ ] **UI-02:** Award Coins modal opens from student list context menu (⋮ Actions)
- [ ] **UI-03:** Student search input filters students in real-time (case-insensitive, by name or ID)
- [ ] **UI-04:** Student checkboxes allow multi-select (up to all students in Balagruha)
- [ ] **UI-05:** "Select All" button checks all visible students (filtered list)
- [ ] **UI-06:** "Deselect All" button unchecks all students
- [ ] **UI-07:** Selected count displays: "3 of 24 selected"
- [ ] **UI-08:** Each student item shows: name, class, ID, current coin balance
- [ ] **UI-09:** Selected students highlight with bg-blue-50 background
- [ ] **UI-10:** Student list scrollable if more than 4 students (300px max height)

### 2.2. Coin Amount Input

- [ ] **COIN-01:** Coin slider ranges from 1 to 1000 (configurable max)
- [ ] **COIN-02:** Coin number input syncs with slider (two-way binding)
- [ ] **COIN-03:** Manual input validates: must be integer, min 1, max 1000
- [ ] **COIN-04:** Total calculation displays: "Total: 300 coins (3 students × 100 coins)"
- [ ] **COIN-05:** Total updates in real-time when students selected/deselected or amount changed
- [ ] **COIN-06:** Exceeding max coins shows error: "Maximum 1000 coins per award. Please reduce amount."

### 2.3. Reason & Category

- [ ] **REASON-01:** Reason textarea required (minimum 10 characters, maximum 500)
- [ ] **REASON-02:** Character count displays: "59 / 500 characters"
- [ ] **REASON-03:** Reason less than 10 chars shows error: "Reason must be at least 10 characters"
- [ ] **REASON-04:** Reason textarea auto-expands to fit text (max 5 lines before scroll)
- [ ] **REASON-05:** Award category dropdown optional (Extra Effort, Good Behavior, Helping Peers, Special Achievement)
- [ ] **REASON-06:** Category defaults to "Other" if not selected

### 2.4. Award Execution

- [ ] **EXEC-01:** "Award Coins" button disabled until all required fields valid (students selected, amount 1-1000, reason ≥10 chars)
- [ ] **EXEC-02:** Clicking "Award Coins" shows loading spinner on button
- [ ] **EXEC-03:** API creates one Transaction document per student in MongoDB
- [ ] **EXEC-04:** Transaction document includes: studentId, amount, type="manual_award", reason, category, awardedBy (coachId), timestamp
- [ ] **EXEC-05:** Student coin balances update atomically (balance += amount)
- [ ] **EXEC-06:** Success modal displays award summary (students, amounts, total, reason, transaction IDs)
- [ ] **EXEC-07:** Students receive in-app notification: "Coach Priya awarded you 100 coins for great teamwork!"
- [ ] **EXEC-08:** If notification enabled: optional email sent to students
- [ ] **EXEC-09:** Award modal closes after success confirmation
- [ ] **EXEC-10:** Student wallets update in real-time (via WebSocket or polling)

### 2.5. Validation & Error Handling

- [ ] **VAL-01:** No students selected: "Please select at least one student"
- [ ] **VAL-02:** Coin amount < 1: "Minimum 1 coin required"
- [ ] **VAL-03:** Coin amount > 1000: "Maximum 1000 coins per award. Please reduce amount."
- [ ] **VAL-04:** Reason < 10 chars: "Reason must be at least 10 characters"
- [ ] **VAL-05:** Reason > 500 chars: "Reason cannot exceed 500 characters"
- [ ] **VAL-06:** Network error: "Failed to award coins. Please try again."
- [ ] **VAL-07:** Partial failure (some students updated, some failed): Show success for updated students, error list for failed
- [ ] **VAL-08:** Daily award limit exceeded (if configured): "You have reached the daily coin award limit. Please try again tomorrow."

### 2.6. Award History View

- [ ] **HIST-01:** "My Coin Awards History" view lists all awards by coach (most recent first)
- [ ] **HIST-02:** Award cards show: date/time, total coins awarded, number of students, student names (truncated if >3), reason, category, transaction IDs
- [ ] **HIST-03:** Filter dropdown: All Categories, Extra Effort, Good Behavior, Helping Peers, Special Achievement
- [ ] **HIST-04:** Date range filter: Last 7 Days, Last 30 Days, Last 3 Months, Custom Range
- [ ] **HIST-05:** Search filter filters by student name, reason text (case-insensitive)
- [ ] **HIST-06:** Summary stats display: "Showing 48 awards • Total: 4,850 coins awarded this month"
- [ ] **HIST-07:** Award cards have context menu (⋮): View Details, View Students, Copy Transaction IDs
- [ ] **HIST-08:** Pagination: Load 20 awards at a time, "Load More Awards" button
- [ ] **HIST-09:** Empty state: "No coin awards found. Click 'Award Coins' to get started."

### 2.7. Quick Award Action

- [ ] **QUICK-01:** Student list context menu includes "💰 Award Coins" action
- [ ] **QUICK-02:** Clicking "Award Coins" opens modal with student pre-selected
- [ ] **QUICK-03:** Pre-selected student cannot be deselected (checkbox disabled)
- [ ] **QUICK-04:** Coach can add more students to the award

### 2.8. Performance & Accessibility

- [ ] **PERF-01:** Award modal opens within 500ms
- [ ] **PERF-02:** Student list loads within 1 second (up to 100 students)
- [ ] **PERF-03:** Award execution completes within 2 seconds (up to 10 students)
- [ ] **PERF-04:** Bulk award (entire Balagruha, 50+ students) completes within 5 seconds
- [ ] **ACC-01:** Keyboard navigation: Tab to fields, Space to toggle checkboxes, Enter to submit
- [ ] **ACC-02:** Screen reader announces: selected count, validation errors, success messages
- [ ] **ACC-03:** Slider accessible via keyboard (arrow keys to adjust value)
- [ ] **ACC-04:** Focus visible on all interactive elements

---

## 3. Task Breakdown

### Phase 1: Award Modal UI (1.5 hours)

**Task 1.1: Create `AwardCoinsModal.jsx` component (45 min)**
- Component structure: modal wrapper, header, close button
- Student search input with real-time filter logic
- Student checkbox list (map over filtered students)
- "Select All" / "Deselect All" buttons
- Selected count display: "3 of 24 selected"
- State management: `selectedStudents` array, `searchQuery` string
- File: `frontend/src/components/coach/AwardCoinsModal.jsx`

**Task 1.2: Build coin amount input with slider (30 min)**
- Range slider (1-1000) using `<input type="range">`
- Number input with two-way sync to slider
- Validation: min 1, max 1000, integer only
- Total calculation display: `selectedStudents.length × coinAmount`
- Real-time total updates on student/amount changes
- Error message display for invalid amounts

**Task 1.3: Build reason textarea and category dropdown (15 min)**
- Textarea with character count (0/500)
- Min 10 chars, max 500 chars validation
- Auto-expand textarea (max 5 lines before scroll)
- Category dropdown (optional): Extra Effort, Good Behavior, Helping Peers, Special Achievement, Other
- Validation error messages for reason field

### Phase 2: Award Execution Logic (1.5 hours)

**Task 2.1: Implement award API endpoint (45 min)**
- POST `/api/v2/lms/coach/coin-awards` endpoint
- Request body validation: `studentIds[]`, `amount`, `reason`, `category?`, `coachId`
- Check coach permissions (RBAC): coach can only award to students in their Balagruha
- Validate amount: 1-1000 range
- Validate reason: min 10 chars
- Optional: Check daily award limit (configurable)
- File: `backend/controllers/coachCoinAwardController.js`

**Task 2.2: Create Transaction documents and update balances (45 min)**
- Loop through `studentIds`, create Transaction document for each:
  ```javascript
  {
    studentId: student._id,
    amount: coinAmount,
    type: "manual_award",
    reason: reasonText,
    category: selectedCategory || "Other",
    awardedBy: coachId,
    timestamp: new Date(),
    transactionId: generateTransactionId() // "TXN-2025-0054"
  }
  ```
- Atomic update to student coin balance: `Student.findByIdAndUpdate(studentId, { $inc: { coinBalance: amount } })`
- Use MongoDB transaction to ensure atomicity (all students updated or none)
- Return array of transaction IDs to frontend
- File: `backend/services/coinAwardService.js`

### Phase 3: Notifications & Real-Time Updates (1 hour)

**Task 3.1: Trigger student notifications (30 min)**
- Create in-app notification for each student:
  ```javascript
  {
    userId: student._id,
    type: "coin_award",
    title: "Coins Awarded!",
    message: `Coach ${coachName} awarded you ${amount} coins for ${reason}`,
    metadata: { transactionId, amount, reason },
    read: false,
    createdAt: new Date()
  }
  ```
- Optional: Send email notification if student has email and email notifications enabled
- Files: `backend/services/notificationService.js`, `backend/services/emailService.js`

**Task 3.2: Implement real-time balance updates (30 min)**
- WebSocket broadcast to affected students: `coin_balance_updated` event
- Payload: `{ studentId, newBalance, transaction: { amount, reason } }`
- Frontend listener: Update coin balance in Title Bar, trigger coin animation
- Fallback: Polling every 30 seconds if WebSocket unavailable
- File: `backend/services/websocketService.js`, `frontend/src/hooks/useCoinBalance.js`

### Phase 4: Award History View (1 hour)

**Task 4.1: Create `CoachAwardHistory.jsx` component (30 min)**
- Fetch awards from GET `/api/v2/lms/coach/:coachId/coin-awards`
- Award card layout: date, total coins, student count, student names (truncated), reason, category
- Filter dropdowns: category, date range
- Search input: filter by student name or reason text
- Summary stats: total awards shown, total coins awarded this month
- Pagination: Load 20 awards, "Load More" button
- File: `frontend/src/components/coach/CoachAwardHistory.jsx`

**Task 4.2: Implement award history API endpoint (30 min)**
- GET `/api/v2/lms/coach/:coachId/coin-awards` endpoint
- Query params: `category?`, `dateRange?`, `search?`, `page?`, `limit?`
- Aggregate transactions by `awardedBy` (coachId) and `timestamp`
- Group transactions by award session (same timestamp within 1 second)
- Return: award date, total coins, student names, reason, category, transaction IDs
- File: `backend/controllers/coachCoinAwardController.js`

### Phase 5: Success Modal & Validation (45 min)

**Task 5.1: Create `AwardSuccessModal.jsx` component (30 min)**
- Success icon and message: "Coins Awarded Successfully!"
- Award summary display:
  - Students awarded (list with student IDs and amounts)
  - Total coins awarded
  - Reason and category
  - Awarded by (coach name)
  - Timestamp
  - Transaction IDs
- "View Award History" button (navigates to award history view)
- "Close" button (closes modal, resets form)
- File: `frontend/src/components/coach/AwardSuccessModal.jsx`

**Task 5.2: Implement frontend validation and error states (15 min)**
- Validation rules:
  - At least one student selected
  - Coin amount 1-1000
  - Reason min 10 chars, max 500 chars
- Error messages display below each field (red text, bg-red-50)
- "Award Coins" button disabled until all valid
- Network error handling: display error toast, keep form data for retry
- File: `frontend/src/components/coach/AwardCoinsModal.jsx`

### Phase 6: Quick Award Action (30 min)

**Task 6.1: Add "Award Coins" to student list context menu (15 min)**
- Add context menu (⋮) to student list items
- Menu options: View Progress, Assign Course, **Award Coins**, Send Message, View Full Profile
- Click "Award Coins" opens `AwardCoinsModal` with student pre-selected
- File: `frontend/src/components/coach/StudentListItem.jsx`

**Task 6.2: Pre-populate modal with selected student (15 min)**
- Accept `preSelectedStudentId` prop in `AwardCoinsModal`
- If prop provided, add student to `selectedStudents` array on mount
- Disable checkbox for pre-selected student (cannot deselect)
- Display hint: "Awarding to Ravi Kumar (pre-selected). You can add more students below."
- File: `frontend/src/components/coach/AwardCoinsModal.jsx`

### Phase 7: Testing & Polish (30 min)

**Task 7.1: Unit tests for award service (15 min)**
- Test transaction creation logic
- Test balance update atomicity (MongoDB transaction)
- Test validation: amount range, reason length, coach permissions
- Mock student and coach data
- File: `backend/tests/services/coinAwardService.test.js`

**Task 7.2: E2E test for award workflow (15 min)**
- Test: Coach opens award modal from dashboard
- Test: Coach selects 3 students, enters 100 coins, enters reason
- Test: Submit award, verify success modal
- Test: Verify transactions created in database
- Test: Verify student balances updated
- Test: Verify notifications sent
- File: `frontend/tests/e2e/coach-award-coins.spec.js`

---

## 4. API Endpoints

### 4.1. Create Coin Award

**Endpoint:** `POST /api/v2/lms/coach/coin-awards`

**Description:** Creates manual coin award transactions for one or more students.

**Request Headers:**
```json
{
  "Authorization": "Bearer <coach_jwt_token>",
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "studentIds": ["student123", "student456", "student789"],
  "amount": 100,
  "reason": "Great teamwork helping classmates with the art project!",
  "category": "Helping Peers",
  "sendNotification": true
}
```

**Validation:**
- `studentIds`: Required, array of valid student ObjectIds, students must be in coach's Balagruha
- `amount`: Required, integer, min 1, max 1000 (configurable)
- `reason`: Required, string, min 10 chars, max 500 chars
- `category`: Optional, string, one of ["Extra Effort", "Good Behavior", "Helping Peers", "Special Achievement", "Other"]
- `sendNotification`: Optional, boolean, default true

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Coins awarded successfully",
  "data": {
    "totalCoinsAwarded": 300,
    "studentsAwarded": 3,
    "transactions": [
      {
        "transactionId": "TXN-2025-0054",
        "studentId": "student123",
        "studentName": "Ravi Kumar",
        "amount": 100,
        "newBalance": 1350,
        "timestamp": "2025-10-24T15:28:40.123Z"
      },
      {
        "transactionId": "TXN-2025-0055",
        "studentId": "student456",
        "studentName": "Priya Sharma",
        "amount": 100,
        "newBalance": 1080,
        "timestamp": "2025-10-24T15:28:40.125Z"
      },
      {
        "transactionId": "TXN-2025-0056",
        "studentId": "student789",
        "studentName": "Anil Reddy",
        "amount": 100,
        "newBalance": 1205,
        "timestamp": "2025-10-24T15:28:40.127Z"
      }
    ],
    "awardedBy": "coach123",
    "awardedByName": "Coach Priya",
    "reason": "Great teamwork helping classmates with the art project!",
    "category": "Helping Peers"
  }
}
```

**Error Responses:**

```json
// 400 Bad Request - Validation Error
{
  "success": false,
  "error": "Validation failed",
  "details": [
    { "field": "studentIds", "message": "At least one student must be selected" },
    { "field": "amount", "message": "Amount must be between 1 and 1000" },
    { "field": "reason", "message": "Reason must be at least 10 characters" }
  ]
}

// 403 Forbidden - Coach doesn't have permission to award to these students
{
  "success": false,
  "error": "Permission denied",
  "message": "You can only award coins to students in your assigned Balagruha"
}

// 429 Too Many Requests - Daily limit exceeded
{
  "success": false,
  "error": "Rate limit exceeded",
  "message": "You have reached the daily coin award limit (5000 coins). Please try again tomorrow.",
  "retryAfter": "2025-10-25T00:00:00.000Z"
}

// 500 Internal Server Error - Partial failure
{
  "success": false,
  "error": "Partial failure",
  "message": "Some students were awarded coins, but errors occurred for others",
  "data": {
    "successful": [
      { "transactionId": "TXN-2025-0054", "studentId": "student123", "amount": 100 }
    ],
    "failed": [
      { "studentId": "student456", "error": "Student not found" },
      { "studentId": "student789", "error": "Database update failed" }
    ]
  }
}
```

---

### 4.2. Get Award History

**Endpoint:** `GET /api/v2/lms/coach/:coachId/coin-awards`

**Description:** Fetches all coin awards made by the coach, with filtering and pagination.

**Request Headers:**
```json
{
  "Authorization": "Bearer <coach_jwt_token>"
}
```

**Query Parameters:**
- `category` (optional): Filter by award category ("Extra Effort", "Good Behavior", etc.)
- `dateRange` (optional): "7d", "30d", "3m", or "custom"
- `startDate` (optional, ISO 8601): Start date for custom range
- `endDate` (optional, ISO 8601): End date for custom range
- `search` (optional): Search by student name or reason text
- `page` (optional, default 1): Page number for pagination
- `limit` (optional, default 20): Number of awards per page

**Example Request:**
```
GET /api/v2/lms/coach/coach123/coin-awards?category=Helping%20Peers&dateRange=30d&page=1&limit=20
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "awards": [
      {
        "awardId": "award001",
        "timestamp": "2025-10-24T15:28:40.123Z",
        "totalCoinsAwarded": 300,
        "studentsAwarded": 3,
        "studentNames": ["Ravi Kumar", "Priya Sharma", "Anil Reddy"],
        "reason": "Great teamwork helping classmates with the art project!",
        "category": "Helping Peers",
        "transactionIds": ["TXN-2025-0054", "TXN-2025-0055", "TXN-2025-0056"]
      },
      {
        "awardId": "award002",
        "timestamp": "2025-10-24T11:15:30.456Z",
        "totalCoinsAwarded": 150,
        "studentsAwarded": 1,
        "studentNames": ["Lakshmi Rao"],
        "reason": "Excellent presentation on environmental conservation",
        "category": "Extra Effort",
        "transactionIds": ["TXN-2025-0051"]
      }
      // ... 18 more awards
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalAwards": 48,
      "limit": 20,
      "hasNextPage": true
    },
    "summary": {
      "totalCoinsAwarded": 4850,
      "totalAwardsThisMonth": 48,
      "mostAwardedCategory": "Helping Peers"
    }
  }
}
```

**Error Responses:**
```json
// 403 Forbidden - Unauthorized access
{
  "success": false,
  "error": "Permission denied",
  "message": "You can only view your own award history"
}

// 404 Not Found - No awards found
{
  "success": true,
  "data": {
    "awards": [],
    "pagination": { "currentPage": 1, "totalPages": 0, "totalAwards": 0 },
    "summary": { "totalCoinsAwarded": 0, "totalAwardsThisMonth": 0 }
  }
}
```

---

### 4.3. Get Coach's Students (for Award Modal)

**Endpoint:** `GET /api/v2/lms/coach/:coachId/students`

**Description:** Fetches all students in the coach's assigned Balagruha with current coin balances.

**Request Headers:**
```json
{
  "Authorization": "Bearer <coach_jwt_token>"
}
```

**Query Parameters:**
- `includeBalance` (optional, default true): Include current coin balance for each student
- `sortBy` (optional): "name", "class", "balance" (default "name")
- `order` (optional): "asc", "desc" (default "asc")

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "balagruha": {
      "id": "balagruha456",
      "name": "Ramakrishna Ashram"
    },
    "students": [
      {
        "studentId": "student123",
        "name": "Ravi Kumar",
        "class": "5th",
        "studentCode": "STU001",
        "coinBalance": 1250
      },
      {
        "studentId": "student456",
        "name": "Priya Sharma",
        "class": "6th",
        "studentCode": "STU003",
        "coinBalance": 980
      }
      // ... 22 more students
    ],
    "totalStudents": 24
  }
}
```

---

## 5. MongoDB Schema

### 5.1. Transaction Collection (Extended)

```javascript
const TransactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
    // Format: "TXN-YYYY-NNNN" (e.g., "TXN-2025-0054")
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
    max: 1000
  },
  type: {
    type: String,
    required: true,
    enum: [
      'task_completion',      // From task grading (existing)
      'quiz_completion',      // From quiz grading (existing)
      'manual_award',         // NEW: Manual coach award
      'admin_adjustment',     // Admin manual adjustment
      'purchase_deduction'    // Shop purchase (existing)
    ]
  },
  reason: {
    type: String,
    required: function() {
      return this.type === 'manual_award';
    },
    minlength: 10,
    maxlength: 500
  },
  category: {
    type: String,
    enum: [
      'Extra Effort',
      'Good Behavior',
      'Helping Peers',
      'Special Achievement',
      'Other'
    ],
    default: 'Other'
  },
  awardedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Coach or Admin
    required: function() {
      return this.type === 'manual_award' || this.type === 'admin_adjustment';
    }
  },
  metadata: {
    // Existing fields for task/quiz completions
    taskId: mongoose.Schema.Types.ObjectId,
    quizId: mongoose.Schema.Types.ObjectId,
    submissionId: mongoose.Schema.Types.ObjectId,

    // New field for manual awards
    awardSessionId: String // Group transactions from same award action
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for efficient queries
TransactionSchema.index({ studentId: 1, timestamp: -1 });
TransactionSchema.index({ awardedBy: 1, timestamp: -1 });
TransactionSchema.index({ type: 1, timestamp: -1 });

module.exports = mongoose.model('Transaction', TransactionSchema);
```

### 5.2. Student Schema (Coin Balance Field)

```javascript
const StudentSchema = new mongoose.Schema({
  // ... existing fields (name, class, balagruhaId, etc.)

  coinBalance: {
    type: Number,
    default: 0,
    min: 0,
    index: true
  },

  // Coin statistics (optional)
  coinStats: {
    totalEarned: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    totalAwards: { type: Number, default: 0 }, // Count of manual awards received
    lastUpdated: { type: Date, default: Date.now }
  }
});
```

---

## 6. File Paths

```
frontend/src/components/coach/
├── AwardCoinsModal.jsx              # Main award modal component
├── AwardSuccessModal.jsx            # Success confirmation modal
├── CoachAwardHistory.jsx            # Award history view
├── StudentListItem.jsx              # Student list with context menu (updated)
└── CoachDashboard.jsx               # Main coach dashboard (updated)

frontend/src/hooks/
├── useCoinBalance.js                # Real-time balance updates
└── useAwardHistory.js               # Fetch and filter award history

backend/controllers/
└── coachCoinAwardController.js      # Award API endpoints

backend/services/
├── coinAwardService.js              # Award transaction creation logic
├── notificationService.js           # Student notifications (updated)
└── websocketService.js              # Real-time balance updates (updated)

backend/models/
├── Transaction.js                   # Transaction schema (extended)
└── Student.js                       # Student schema (coin balance field)

backend/routes/v2/
└── coach.js                         # Coach routes (updated)

backend/tests/services/
└── coinAwardService.test.js         # Unit tests for award service

frontend/tests/e2e/
└── coach-award-coins.spec.js        # E2E test for award workflow
```

---

## 7. Definition of Done

- [ ] Award Coins modal opens and displays all Balagruha students
- [ ] Student search filter works (real-time, case-insensitive)
- [ ] Multi-select checkboxes work, "Select All" / "Deselect All" functional
- [ ] Coin slider (1-1000) syncs with number input
- [ ] Total calculation displays and updates in real-time
- [ ] Reason textarea validates (min 10 chars, max 500 chars)
- [ ] Award category dropdown optional
- [ ] "Award Coins" button disabled until all required fields valid
- [ ] Clicking "Award Coins" creates Transaction documents for each student
- [ ] Student coin balances update atomically
- [ ] Success modal displays award summary with transaction IDs
- [ ] Students receive in-app notifications
- [ ] Student wallets update in real-time (WebSocket/polling)
- [ ] Award history view lists all coach awards with filters (category, date range, search)
- [ ] Award history pagination works ("Load More Awards")
- [ ] Quick award action from student list context menu works
- [ ] Pre-selected student modal works (checkbox disabled)
- [ ] All validation errors display correctly
- [ ] Network errors handled gracefully (toast, retry)
- [ ] Unit tests: 80%+ coverage for award service
- [ ] E2E tests: Full award workflow tested (open modal, select students, award coins, verify success)
- [ ] Code peer-reviewed
- [ ] Merged to `develop`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:28:40
- **Status:** Draft - Ready for Development

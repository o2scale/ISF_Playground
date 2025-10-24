# Epic 03 - Story 01: Course Assignment Interface

**Story ID:** SPRINT2-EPIC03-STORY01
**Epic:** Epic 03 - LMS Coach Functionality
**Sprint:** Sprint 2
**Story Name:** Course Assignment Interface
**Estimated Effort:** 6-8 hours (1 development day)
**Priority:** High (P1)
**Dependencies:**
- Sprint 1.1 RBAC (coach authentication, Balagruha scope)
- Epic 02 Story 01 (published courses available)
- Backend: MongoDB CourseAssignments collection

**Last Updated:** 2025-10-24 15:15:25
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As a** Coach
**I want to** assign Admin-published courses to my Balagruha or specific students with optional due dates
**So that** students receive course notifications and can start learning

### 1.2. Story Context

Coaches can assign courses to:
- **Entire Balagruha:** All students in assigned Balagruha receive course
- **Specific Students:** Multi-select individual students for targeted assignments

Assignments include:
- Optional due date
- Automatic student notifications
- Immediate course visibility in student dashboard

### 1.3. Key Features

- **Published Courses Only:** Dropdown shows Admin-published courses
- **Assignment Target Selection:** Radio buttons (Entire Balagruha / Specific Students)
- **Student Multi-Select:** Checkboxes for individual student selection
- **Due Date Picker:** Optional calendar date selector
- **Confirmation:** Success message with student count
- **Student Notifications:** In-app + optional email

---

## 1.5. Visual Layout Diagrams

### Course Assignment Modal - Full Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Assign Course                                               [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Select Course *                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Advanced Computer Apps                                          ▼  │   │ ← Course dropdown
│ └─────────────────────────────────────────────────────────────────────┘   │   (published only)
│ Category: Computer Apps • Difficulty: Intermediate • 45 Content Items      │
│                                                                             │
│ Assign To *                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ 🔵 Entire Balagruha (Ramakrishna Ashram - 24 students)             │   │ ← Radio option 1
│ │    All students in your assigned Balagruha will receive this course│   │   (selected)
│ └─────────────────────────────────────────────────────────────────────┘   │   bg-blue-50
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ Specific Students (Select below)                                 │   │ ← Radio option 2
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Due Date (Optional)                                                         │
│ ┌───────────────────────────────┐                                          │
│ │ November 15, 2025         📅  │   ← Date picker                          │
│ └───────────────────────────────┘                                          │
│ Students will see this as the target completion date                       │
│                                                                             │
│ Notifications                                                               │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☑ Send in-app notification to students                              │   │ ← Checkboxes
│ │ ☑ Send email notification to students (if email available)          │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ [Cancel]                                              [Assign Course]       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Course Assignment Modal - Specific Students Selection

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Assign Course                                               [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Select Course *                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Beginner Art Course                                             ▼  │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Assign To *                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ Entire Balagruha (Ramakrishna Ashram - 24 students)             │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ 🔵 Specific Students (Select below)                                 │   │ ← Selected
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Select Students (3 of 24 selected) [Select All] [Deselect All]            │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ [🔍 Search students...]                                             │   │ ← Search filter
│ │                                                                     │   │
│ │ ☑ Ravi Kumar (Class: 5th • ID: STU001)                              │   │ ← Checkbox selected
│ │ ☑ Priya Sharma (Class: 6th • ID: STU003)                            │   │   bg-blue-50
│ │ ☐ Suresh Patel (Class: 5th • ID: STU005)                            │   │
│ │ ☐ Meera Das (Class: 7th • ID: STU007)                               │   │
│ │ ☑ Anil Reddy (Class: 6th • ID: STU009)                              │   │ ← Checkbox selected
│ │ ☐ Lakshmi Rao (Class: 5th • ID: STU011)                             │   │   bg-blue-50
│ │ ☐ Kiran Singh (Class: 7th • ID: STU013)                             │   │
│ │ ... (17 more students, scrollable)                                  │   │ ← Scrollable list
│ └─────────────────────────────────────────────────────────────────────┘   │   (300px height)
│                                                                             │
│ Due Date (Optional)  [November 30, 2025 📅]                                 │
│                                                                             │
│ [Cancel]                                              [Assign Course]       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Assignment Success Confirmation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Assignment Successful!                                      [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│                              ✅                                              │
│                                                                             │
│ Course "Advanced Computer Apps" has been successfully assigned!            │
│                                                                             │
│ Assignment Summary:                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Students Assigned: 24 (Entire Balagruha)                            │   │
│ │ Due Date: November 15, 2025                                         │   │
│ │ Notifications Sent: 24 in-app, 18 email                             │   │
│ │ Assigned By: Coach Priya                                            │   │
│ │ Assigned At: October 24, 2025 at 3:15 PM                            │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Students will see this course in their dashboard immediately.              │
│                                                                             │
│ [View Assignment Details]                              [Close]              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Coach Dashboard - Assignments View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ My Course Assignments                        [+ Assign New Course]         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ [All Courses ▼] [All Students ▼] [🔍 Search...]                           │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Advanced Computer Apps                                      [⋮]     │   │ ← Assignment card
│ │ Assigned to: Entire Balagruha (24 students)                        │   │
│ │ Due: Nov 15, 2025 • Progress: 12/24 started (50%)                  │   │
│ │ Avg Completion: 15% • Assigned: Oct 24, 2025                       │   │
│ │ [View Progress Report]                                              │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Beginner Art Course                                         [⋮]     │   │
│ │ Assigned to: 3 specific students                                   │   │
│ │ Due: Nov 30, 2025 • Progress: 3/3 started (100%)                   │   │
│ │ Avg Completion: 65% • Assigned: Oct 23, 2025                       │   │
│ │ [View Progress Report]                                              │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ... (more assignments)                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Acceptance Criteria

### 2.1. Course Selection

- [ ] **COURSE-01:** Dropdown shows only published courses (status="published")
- [ ] **COURSE-02:** Course metadata displays: category, difficulty, content item count
- [ ] **COURSE-03:** Courses filtered by Balagruha scope (coach sees courses relevant to their students)

### 2.2. Assignment Target

- [ ] **TARGET-01:** Radio buttons: "Entire Balagruha" OR "Specific Students"
- [ ] **TARGET-02:** "Entire Balagruha" shows student count (e.g., "24 students")
- [ ] **TARGET-03:** "Specific Students" enables student selection list below
- [ ] **TARGET-04:** Student list shows all students in coach's Balagruha
- [ ] **TARGET-05:** Student checkboxes allow multi-select (up to all students)
- [ ] **TARGET-06:** "Select All" / "Deselect All" buttons toggle all checkboxes
- [ ] **TARGET-07:** Search filter filters students by name or ID (real-time, case-insensitive)
- [ ] **TARGET-08:** Selected count displays: "3 of 24 selected"

### 2.3. Due Date & Notifications

- [ ] **DUE-01:** Due date picker opens calendar modal
- [ ] **DUE-02:** Due date validates: must be future date
- [ ] **DUE-03:** Due date optional (can be left blank)
- [ ] **DUE-04:** "Send in-app notification" checkbox default: checked
- [ ] **DUE-05:** "Send email notification" checkbox default: checked (if students have emails)

### 2.4. Assignment Execution

- [ ] **EXEC-01:** "Assign Course" button disabled until required fields filled (course, target)
- [ ] **EXEC-02:** Clicking "Assign Course" creates CourseAssignment document in MongoDB
- [ ] **EXEC-03:** Assignment document includes: courseId, assignedBy (coachId), assignedTo (type + IDs), dueDate, assignedAt timestamp
- [ ] **EXEC-04:** Students receive in-app notification: "Coach Priya assigned you 'Advanced Computer Apps'"
- [ ] **EXEC-05:** If email enabled: students receive email with course link
- [ ] **EXEC-06:** Success modal displays assignment summary (student count, due date, notification count)
- [ ] **EXEC-07:** Assigned course appears in student dashboard immediately

### 2.5. Assignment Management

- [ ] **MGT-01:** "My Course Assignments" view lists all assignments by coach
- [ ] **MGT-02:** Assignment cards show: course title, assigned to (Balagruha/students), due date, progress
- [ ] **MGT-03:** Progress displays: "12/24 started (50%)", "Avg Completion: 15%"
- [ ] **MGT-04:** Filter dropdowns: All Courses, All Students, Search
- [ ] **MGT-05:** Context menu (⋮) options: View Progress, Edit Assignment, Unassign Course

### 2.6. Performance & Accessibility

- [ ] **PERF-01:** Course dropdown loads within 1 second (up to 100 published courses)
- [ ] **PERF-02:** Student list loads within 1 second (up to 100 students per Balagruha)
- [ ] **PERF-03:** Assignment creation completes within 2 seconds (including notifications)
- [ ] **ACC-01:** Keyboard navigation: Tab to fields, Space to toggle checkboxes, Enter to submit
- [ ] **ACC-02:** Screen reader announces selection counts and success messages

---

## 3. Task Breakdown (Abbreviated)

### Phase 1: Assignment Modal UI (2 hours)
**Task 1:** Create `CourseAssignmentModal.jsx` - Course dropdown, target selection
**Task 2:** Build student multi-select list with search filter

### Phase 2: Assignment Logic & API (2 hours)
**Task 3:** Implement POST `/api/v2/lms/coach/assignments` endpoint
**Task 4:** Create CourseAssignment MongoDB document
**Task 5:** Trigger student notifications (in-app + email)

### Phase 3: Assignments Dashboard (2 hours)
**Task 6:** Build `CoachAssignmentsView.jsx` - List assignments with progress
**Task 7:** Implement progress calculation (started count, avg completion %)

### Phase 4: Testing (1 hour)
**Task 8:** Test Balagruha assignment (all students receive course)
**Task 9:** Test specific student assignment (only selected students receive course)
**Task 10:** Verify notifications sent correctly

---

## 4. API Endpoints (Abbreviated)

**GET `/api/v2/lms/coach/courses/published`** - Fetch published courses
**GET `/api/v2/lms/coach/:coachId/students`** - Fetch Balagruha students
**POST `/api/v2/lms/coach/assignments`** - Create assignment
**GET `/api/v2/lms/coach/:coachId/assignments`** - Fetch coach assignments
**PUT `/api/v2/lms/coach/assignments/:assignmentId`** - Edit assignment
**DELETE `/api/v2/lms/coach/assignments/:assignmentId`** - Unassign course

---

## 5. File Paths (Abbreviated)

```
frontend/src/components/coach/
├── CourseAssignmentModal.jsx
├── StudentMultiSelect.jsx
└── CoachAssignmentsView.jsx

backend/models/
└── CourseAssignments.js

backend/controllers/
└── coachAssignmentController.js
```

---

## 6. Definition of Done

- [ ] Course assignment to Balagruha works
- [ ] Course assignment to specific students works
- [ ] Due date saves and displays correctly
- [ ] Student notifications sent (in-app + email)
- [ ] Assignments dashboard shows progress
- [ ] Unit tests: 80%+ coverage
- [ ] E2E tests: Full assignment workflow tested
- [ ] Code peer-reviewed
- [ ] Merged to `develop`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:15:25
- **Status:** Draft - Ready for Development

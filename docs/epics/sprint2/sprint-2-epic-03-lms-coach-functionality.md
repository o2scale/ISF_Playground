# Sprint 2 - Epic 03: LMS Coach Functionality

**Epic ID:** SPRINT2-EPIC-03
**Epic Name:** LMS Coach Functionality
**Sprint:** Sprint 2
**Version:** 1.0
**Date:** October 24, 2025
**Last Updated:** 2025-10-24 13:51:25
**Status:** Draft - Ready for Story Breakdown
**Estimated Effort:** 25-30 hours (3-4 development days)
**Priority:** High (P1)
**Dependencies:** Epic 01 (Student Experience), Epic 02 (Admin Course Management)

---

## 1. Epic Overview

### 1.1. Epic Purpose

This epic delivers Coach tools for assigning Admin-created courses, grading student submissions, awarding ISF Coins, and tracking progress. Coaches facilitate learning by:

- Assigning courses to Balagruhas or individual students
- Grading Art and Spoken English subjective submissions
- Manually awarding ISF Coins based on effort and quality
- Monitoring student progress through Balagruha-scoped reports

### 1.2. User Personas

**Primary:** Coach
- Assigns courses created by Admin
- Grades subjective work (Art, Spoken English)
- Awards ISF Coins (0-100 range, discretion-based)
- Tracks student progress within assigned Balagruha

### 1.3. Epic Goals

1. **Enable Course Assignment:** Assign courses to entire Balagruhas or specific students
2. **Facilitate Grading:** Intuitive interface for viewing and grading submissions (artwork, videos)
3. **Gamify Learning:** Manual ISF Coin award system tied to quality
4. **Track Progress:** Balagruha-scoped reports on student performance

---

## 2. Story Breakdown

### **Story 01: Course Assignment Interface**
**Estimated Effort:** 6-8 hours

**Description:**
Coach can assign Admin-published courses to entire Balagruhas or specific students. Assignment includes optional due date. Students receive notification upon assignment.

**Key Features:**
- Select from published courses
- Assignment target: Entire Balagruha or Specific Students (multi-select checkboxes)
- Optional due date picker
- Confirmation message after assignment
- Student notification system integration

**Acceptance Criteria:**
- [ ] Coach sees only published courses
- [ ] Select Balagruha assigns to all students in that Balagruha
- [ ] Select specific students assigns to selected students only
- [ ] Due date saves correctly
- [ ] Students receive notification
- [ ] Assigned courses appear in student dashboard

---

### **Story 02: Syllabus Tracker & Grading Interface**
**Estimated Effort:** 10-12 hours

**Description:**
Main grading interface for Art and Spoken English submissions. Filter by course type, Balagruha, status. Preview submissions (images, videos, audio). Quality rating system. Navigate between submissions.

**Key Features:**
- Filter panel: Course type, Balagruha, Grading status (Pending, Graded, Flagged)
- Submission preview: Images (Art), Videos (Spoken English), Audio (Life Skills)
- Quality rating: Excellent, Good, Needs Improvement
- Manual ISF Coin award (0-100 range, slider input)
- Optional text feedback for student
- Navigation: Previous, Next buttons
- Bulk actions: Grade multiple submissions at once

**Acceptance Criteria:**
- [ ] Filter panel filters submissions correctly
- [ ] Image preview displays artwork
- [ ] Video player plays submission videos
- [ ] Audio player plays voice notes
- [ ] Quality rating saves correctly
- [ ] ISF Coin award updates student balance
- [ ] Text feedback displays to student
- [ ] Navigation buttons work correctly
- [ ] Bulk grading assigns same grade to selected submissions

---

### **Story 03: Manual ISF Coin Award System**
**Estimated Effort:** 4-6 hours

**Description:**
Coach can manually award ISF Coins to students outside of grading workflow. Use cases: Extra effort, helping peers, behavior rewards. Coin award with reason field.

**Key Features:**
- Award Coins modal: Student selector, Coin amount (0-1000), Reason (required)
- Coin transaction logged
- Student receives notification
- Transaction appears in student coin history

**Acceptance Criteria:**
- [ ] Award Coins modal opens correctly
- [ ] Student selector shows assigned students
- [ ] Coin amount validates (0-1000)
- [ ] Reason field required
- [ ] Coin transaction logged in CoinTransactions collection
- [ ] Student coin balance updates immediately
- [ ] Student receives notification
- [ ] Transaction appears in student coin history

---

### **Story 04: Coach Reporting Dashboard**
**Estimated Effort:** 6-8 hours

**Description:**
Balagruha-scoped reports on student performance. Charts and tables showing completion rates, coin earnings, time spent, leaderboard. Export options (CSV, PDF).

**Key Features:**
- Quick stats cards: Students Assigned, Pending Grading, Active Courses
- Completion rate chart (bar chart by course)
- Coin earnings chart (pie chart by course)
- Time spent chart (line chart over time)
- Leaderboard table (top 10 students by coins)
- Filter panel: Balagruha, Date range, Course
- Export options: CSV, PDF, Print

**Acceptance Criteria:**
- [ ] Quick stats cards display correct counts
- [ ] Completion rate chart renders correctly
- [ ] Coin earnings chart renders correctly
- [ ] Time spent chart renders correctly
- [ ] Leaderboard table shows top 10 students
- [ ] Filter panel filters data correctly
- [ ] CSV export downloads correct data
- [ ] PDF export generates correct report
- [ ] Print opens print dialog

---

## 3. Epic-Wide UI Guidelines

### 3.1. Design System References

**Key Design Patterns:**
- **Coach Dashboard (Section 10.1):** Quick stats cards, priority grading queue
- **Course Assignment (Section 10.2):** Multi-select student checkboxes
- **Syllabus Tracker Grading (Section 10.3):** Preview submissions, quality rating, coin award slider

### 3.2. Color Palette (Coach-Specific)

```css
/* Coach Blue Theme */
--coach-blue: #3B82F6;          /* Primary coach color */
--coach-blue-light: #DBEAFE;    /* Coach panel backgrounds */
--coach-blue-dark: #2563EB;     /* Hover states */
```

### 3.3. Coach Panel Header

```jsx
<header className="bg-blue-600 text-white px-6 py-4 border-b border-blue-700">
  <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold">Coach Dashboard</h1>
    <div className="flex items-center gap-4">
      <span>Balagruha: {balagruhaName}</span>
      <span>Coach: {coachName}</span>
    </div>
  </div>
</header>
```

---

## 4. Technical Architecture

### 4.1. Database Schemas (Epic-Specific)

**CourseAssignments Collection:**
```javascript
{
  _id: ObjectId,
  courseId: ObjectId,             // Reference to Courses
  assignedBy: ObjectId,           // Reference to Coach
  assignedTo: {
    type: String,                 // "balagruha" or "students"
    balagruhaId: ObjectId,        // If type is "balagruha"
    studentIds: [ObjectId]        // If type is "students"
  },
  dueDate: Date,                  // Optional
  assignedAt: Date,
  createdAt: Date
}
```

**Submissions Collection (Extended for Grading):**
```javascript
{
  // ... (from Epic 01)
  grade: {
    score: Number,                // 0-100
    quality: String,              // "excellent", "good", "needs_improvement"
    coinsAwarded: Number,         // 0-100
    feedback: String,             // Optional text feedback
    gradedBy: ObjectId,           // Reference to Coach
    gradedAt: Date
  }
}
```

---

## 5. API Endpoints (Epic-Specific)

**Base URL:** `/api/v2/lms/coach`

### 5.1. Course Assignment APIs

**POST `/api/v2/lms/coach/assignments`**
- **Purpose:** Assign course to Balagruha or students
- **Request Body:**
```json
{
  "courseId": "course123",
  "assignedTo": {
    "type": "balagruha",
    "balagruhaId": "balagruha456"
  },
  "dueDate": "2025-11-01T00:00:00Z"
}
```
- **Response:** `{ "success": true, "assignmentId": "assign789", "studentsAssigned": 24 }`

### 5.2. Grading APIs

**GET `/api/v2/lms/coach/:coachId/submissions`**
- **Purpose:** Fetch submissions for grading
- **Query Params:** `?courseType=Art&status=pending`
- **Response:**
```json
{
  "submissions": [
    {
      "id": "sub123",
      "studentName": "Ravi Kumar",
      "courseTitle": "Art Workshop Basics",
      "taskTitle": "Draw a Tree",
      "submissionType": "art",
      "fileUrl": "https://s3.amazonaws.com/...",
      "submittedAt": "2025-10-24T10:00:00Z",
      "status": "pending"
    }
  ]
}
```

**POST `/api/v2/lms/coach/submissions/:submissionId/grade`**
- **Purpose:** Grade submission and award coins
- **Request Body:**
```json
{
  "quality": "excellent",
  "coinsAwarded": 80,
  "feedback": "Excellent work, Ravi!"
}
```
- **Response:** `{ "success": true, "studentCoinBalance": 1330 }`

### 5.3. Coin Award APIs

**POST `/api/v2/lms/coach/coins/award`**
- **Purpose:** Manually award coins to student
- **Request Body:**
```json
{
  "studentId": "student123",
  "amount": 50,
  "reason": "Helping a peer with homework"
}
```
- **Response:** `{ "success": true, "studentCoinBalance": 1380 }`

---

## 6. Dependencies

### 6.1. Internal Dependencies
- **Epic 01 (Student Experience):** Provides submissions for grading
- **Epic 02 (Admin Course Management):** Provides courses for assignment

---

## 7. Success Criteria

### 7.1. Functional Success Metrics
- [ ] Coach can assign course to Balagruha (all students)
- [ ] Coach can assign course to specific students
- [ ] Coach can grade Art submissions (image preview, quality rating, coin award)
- [ ] Coach can grade Spoken English submissions (video playback, quality rating, coin award)
- [ ] Coach can manually award coins with reason
- [ ] Student receives notification on grade and coin award
- [ ] Balagruha-scoped reports display correct data

---

## 8. Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Large video files slow grading workflow | Medium | Medium | Video player with preloading; compress videos on upload |
| Coach bias in coin awards | Low | Medium | Admin reports flag outliers; guidelines for fair grading |

---

## 9. Related Documents

- **Sprint 2 MPSD:** `docs/epics/sprint-2-master-plan.md`
- **Sprint 2 Design System:** `docs/design-systems/sprint-2-lms-design-system.md`

---

## 10. Approval & Sign-Off

**Epic Owner:** Dev Team Lead
**Reviewed By:** Product Owner, QA Lead
**Status:** Draft - Awaiting Story Breakdown

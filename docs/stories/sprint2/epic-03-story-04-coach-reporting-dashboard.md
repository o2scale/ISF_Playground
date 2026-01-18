# Epic 03 - Story 04: Coach Reporting Dashboard

**Story ID:** SPRINT2-EPIC03-STORY04
**Epic:** Epic 03 - LMS Coach Functionality
**Sprint:** Sprint 2
**Story Name:** Coach Reporting Dashboard
**Estimated Effort:** 6-8 hours (1 development day)
**Priority:** High (P1)
**Dependencies:**
- Sprint 1.1 RBAC (coach authentication, Balagruha scope)
- Epic 01 Story 06 (ISF Coin Wallet, transaction data)
- Epic 03 Story 01 (Course assignments)
- Epic 03 Story 02 (Grading data, submissions)
- Backend: MongoDB StudentProgress, CourseAssignments, Transactions collections

**Last Updated:** 2025-10-24 15:32:30
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As a** Coach
**I want to** view comprehensive reports on my Balagruha's student performance
**So that** I can track progress, identify struggling students, and make data-driven teaching decisions

### 1.2. Story Context

Coaches need visibility into:
- **Overall Balagruha Performance:** Average completion rates, coin earnings, active students
- **Course-Specific Reports:** Completion by course, average grades, time spent
- **Student Leaderboard:** Top performers by coins earned, courses completed, engagement
- **Individual Student Reports:** Detailed view of one student's progress across all courses
- **Trend Analysis:** Performance over time (daily, weekly, monthly)

Reports are:
- **Balagruha-Scoped:** Coach sees only students in assigned Balagruha (RBAC enforced)
- **Real-Time:** Data updates reflect latest submissions, grading, coin awards
- **Exportable:** CSV, PDF, Print options for all reports
- **Filterable:** Date ranges, courses, student groups

### 1.3. Key Features

- **Dashboard Overview:** Quick stats cards (total students, active today, avg completion %, total coins awarded)
- **Performance Charts:**
  - Course completion rate (bar chart)
  - Coin earnings trend (line chart, last 30 days)
  - Time spent on platform (area chart)
- **Leaderboard Table:** Top 10 students by coins, completion %, engagement score
- **Course Reports:** Drill-down by course (completion rate, avg grade, struggling students)
- **Individual Student Report:** Detailed view of one student's progress
- **Export Options:** CSV (raw data), PDF (formatted report), Print (print-friendly layout)
- **Date Range Filters:** Last 7 days, 30 days, 3 months, custom range

---

## 1.5. Visual Layout Diagrams

### Coach Reporting Dashboard - Main View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Coach Reports - Ramakrishna Ashram Balagruha                               │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ┌──────────────────┐ ┌──────────────────┐ [Last 30 Days ▼] [Export ▼]    │
│ │ All Courses  ▼   │ │ All Students ▼   │                                 │
│ └──────────────────┘ └──────────────────┘                                 │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Overview - Last 30 Days                                                │ │ ← Stats Cards Section
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌──────────┐ │ │
│ │ │ Total Students │ │ Active Today   │ │ Avg Completion │ │ Coins    │ │ │
│ │ │      24        │ │       18       │ │      67%       │ │ Awarded  │ │ │
│ │ │                │ │   ↑ 3 from     │ │   ↑ 5% from    │ │  4,850   │ │ │
│ │ │                │ │   yesterday    │ │   last week    │ │  this    │ │ │
│ │ │                │ │                │ │                │ │  month   │ │ │
│ │ └────────────────┘ └────────────────┘ └────────────────┘ └──────────┘ │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Course Completion Rate                                                 │ │ ← Chart 1: Bar Chart
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │   (450px height)
│ │                                                                        │ │
│ │ 100% ├─────────────────────────────────────────────────────────────   │ │
│ │      │                                                                │ │
│ │  75% ├─────────────────────────────────────────────────────────────   │ │
│ │      │          ████████████████                                     │ │
│ │  50% ├──────────████████████████─────────────────────────────────   │ │
│ │      │  ████████████████████████                     ████████████   │ │
│ │  25% ├──████████████████████████─────────────────────████████████   │ │
│ │      │  ████████████████████████  ████████  ████████████████████   │ │
│ │   0% └──────────────────────────────────────────────────────────────   │ │
│ │      Computer Apps  Art Course  Spoken English  Life Skills         │ │
│ │         (85%)         (42%)        (58%)          (73%)              │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────┐ ┌──────────────────────────────────┐  │
│ │ Coin Earnings Trend (Last 30d) │ │ Time Spent on Platform (Hours)   │  │ ← Charts 2 & 3
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │   (300px height)
│ │                                 │ │                                  │  │
│ │ 600 ├──────────────────────     │ │  60 ├─────────────────────────   │  │
│ │     │              ●            │ │     │          ▓▓▓▓▓▓▓▓          │  │
│ │ 400 ├─────────────●──●──────    │ │  40 ├────────▓▓▓▓▓▓▓▓▓▓▓▓─────   │  │
│ │     │      ●────●─────●─●──    │ │     │   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │  │
│ │ 200 ├───●──────────────────●   │ │  20 ├──▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓──   │  │
│ │     │●───────────────────────   │ │     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │  │
│ │   0 └─────────────────────────   │ │   0 └─────────────────────────   │  │
│ │     Oct 1  Oct 8  Oct 15 Oct 22 │ │     Week 1  Week 2  Week 3 Week 4│  │
│ └─────────────────────────────────┘ └──────────────────────────────────┘  │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Student Leaderboard - Top 10 Performers                                │ │ ← Leaderboard Table
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ Rank | Student Name   | Class | Courses  | Avg     | Coins  | Hours  │ │
│ │      |                |       | Complete | Grade   | Earned | Spent  │ │
│ │ ──────────────────────────────────────────────────────────────────────│ │
│ │  🥇  | Ravi Kumar     | 5th   |   4/4    |  92%    | 1,850  |  48    │ │
│ │  🥈  | Lakshmi Rao    | 5th   |   4/4    |  88%    | 1,720  |  45    │ │
│ │  🥉  | Priya Sharma   | 6th   |   3/4    |  85%    | 1,580  |  38    │ │
│ │   4  | Anil Reddy     | 6th   |   3/4    |  82%    | 1,450  |  42    │ │
│ │   5  | Meera Das      | 7th   |   3/4    |  80%    | 1,380  |  40    │ │
│ │   6  | Suresh Patel   | 5th   |   3/4    |  78%    | 1,320  |  36    │ │
│ │   7  | Kiran Singh    | 7th   |   2/4    |  75%    | 1,150  |  32    │ │
│ │   8  | Deepa Nair     | 6th   |   2/4    |  73%    | 1,080  |  30    │ │
│ │   9  | Vijay Gupta    | 5th   |   2/4    |  70%    | 980    |  28    │ │
│ │  10  | Sangeeta Roy   | 7th   |   2/4    |  68%    | 920    |  25    │ │
│ │                                                                        │ │
│ │ [View Full Leaderboard (24 students)]                                  │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Course-Specific Report View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Course Report: Advanced Computer Apps                          [← Back]    │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ [Last 30 Days ▼]                                            [Export ▼]    │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Course Overview                                                        │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────────┐   │ │
│ │ │ Assigned to │ │  Started    │ │  Completed  │ │  Avg Grade     │   │ │
│ │ │     24      │ │     22      │ │     18      │ │      85%       │   │ │
│ │ │  students   │ │  (92%)      │ │  (75%)      │ │  ↑ 3% from     │   │ │
│ │ │             │ │             │ │             │ │  last month    │   │ │
│ │ └─────────────┘ └─────────────┘ └─────────────┘ └────────────────┘   │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Module Completion Breakdown                                            │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ Module 1: Introduction to MS Word                                     │ │
│ │ ████████████████████████████████████████████ 22/24 (92%)             │ │ ← Progress bars
│ │ Avg Grade: 88% • Avg Time: 3.2 hours                                  │ │
│ │                                                                        │ │
│ │ Module 2: MS Excel Basics                                             │ │
│ │ ████████████████████████████████████ 20/24 (83%)                     │ │
│ │ Avg Grade: 85% • Avg Time: 4.1 hours                                  │ │
│ │                                                                        │ │
│ │ Module 3: MS PowerPoint Presentations                                 │ │
│ │ ████████████████████████████ 18/24 (75%)                             │ │
│ │ Avg Grade: 82% • Avg Time: 3.8 hours                                  │ │
│ │                                                                        │ │
│ │ Module 4: Advanced MS Word Features                                   │ │
│ │ ████████████████████ 12/24 (50%)                                     │ │
│ │ Avg Grade: 78% • Avg Time: 5.2 hours                                  │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Students Needing Attention (4 students)                                │ │ ← Struggling students
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │   alert section
│ │                                                                        │ │
│ │ ⚠️ Suresh Patel (STU005) - Stuck on Module 2, Chapter 3 (5 days)      │ │
│ │    Last activity: Oct 19, 2025 • Progress: 48% • Avg Grade: 62%      │ │
│ │    [Send Message] [View Details]                                      │ │
│ │                                                                        │ │
│ │ ⚠️ Vijay Gupta (STU010) - Low quiz scores in Module 3 (avg 55%)       │ │
│ │    Last activity: Oct 22, 2025 • Progress: 65% • Needs review        │ │
│ │    [Send Message] [View Details]                                      │ │
│ │                                                                        │ │
│ │ ⚠️ Deepa Nair (STU012) - Inactive for 7 days                          │ │
│ │    Last activity: Oct 17, 2025 • Progress: 42%                        │ │
│ │    [Send Message] [View Details]                                      │ │
│ │                                                                        │ │
│ │ ⚠️ Kiran Singh (STU013) - Hasn't started Module 3                     │ │
│ │    Last activity: Oct 20, 2025 • Progress: 50%                        │ │
│ │    [Send Message] [View Details]                                      │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Student Progress Table                                    [View All]   │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ Student Name   | Progress | Grade | Last Active  | Time Spent | [⋮] │ │
│ │ ────────────────────────────────────────────────────────────────────  │ │
│ │ Ravi Kumar     |   100%   | 92%   | Oct 24, 2025 |  12.5 hrs  | [⋮] │ │
│ │ Lakshmi Rao    |   100%   | 88%   | Oct 24, 2025 |  11.8 hrs  | [⋮] │ │
│ │ Priya Sharma   |    95%   | 85%   | Oct 23, 2025 |  10.2 hrs  | [⋮] │ │
│ │ ... (21 more students)                                                │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Individual Student Report

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Student Report: Ravi Kumar (STU001)                         [← Back]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ [Last 30 Days ▼]                                            [Export ▼]    │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Student Profile                                                        │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ Name: Ravi Kumar                    Class: 5th                        │ │
│ │ Student ID: STU001                  Balagruha: Ramakrishna Ashram     │ │
│ │ Coin Balance: 1,850                 Rank: 🥇 #1 of 24                  │ │
│ │                                                                        │ │
│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────────┐   │ │
│ │ │  Courses    │ │  Avg Grade  │ │ Total Hours │ │  Last Active   │   │ │
│ │ │   4/4       │ │     92%     │ │     48      │ │  Today, 2:15pm │   │ │
│ │ │  Complete   │ │  ↑ 2% from  │ │  ↑ 12 hrs   │ │                │   │ │
│ │ │             │ │  last month │ │  this month │ │                │   │ │
│ │ └─────────────┘ └─────────────┘ └─────────────┘ └────────────────┘   │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Course Progress                                                        │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐   │ │
│ │ │ Advanced Computer Apps                                  ✅      │   │ │
│ │ │ ████████████████████████████████████████████████ 100%          │   │ │
│ │ │ Grade: 92% • Time: 12.5 hrs • Completed: Oct 20, 2025          │   │ │
│ │ │ [View Details]                                                  │   │ │
│ │ └─────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                        │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐   │ │
│ │ │ Beginner Art Course                                     ✅      │   │ │
│ │ │ ████████████████████████████████████████████████ 100%          │   │ │
│ │ │ Grade: 95% • Time: 14.2 hrs • Completed: Oct 18, 2025          │   │ │
│ │ │ [View Details]                                                  │   │ │
│ │ └─────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                        │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐   │ │
│ │ │ Spoken English Basics                                   ✅      │   │ │
│ │ │ ████████████████████████████████████████████████ 100%          │   │ │
│ │ │ Grade: 88% • Time: 10.8 hrs • Completed: Oct 15, 2025          │   │ │
│ │ │ [View Details]                                                  │   │ │
│ │ └─────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                        │ │
│ │ ┌─────────────────────────────────────────────────────────────────┐   │ │
│ │ │ Life Skills Essentials                                  ✅      │   │ │
│ │ │ ████████████████████████████████████████████████ 100%          │   │ │
│ │ │ Grade: 90% • Time: 10.5 hrs • Completed: Oct 12, 2025          │   │ │
│ │ │ [View Details]                                                  │   │ │
│ │ └─────────────────────────────────────────────────────────────────┘   │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Coin Transaction History (Last 10)                        [View All]   │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ Oct 24 • +100 coins • Manual Award: Great teamwork (Coach Priya)      │ │
│ │ Oct 20 • +85 coins • Grading: Computer Apps Module 4 (Excellent)      │ │
│ │ Oct 18 • +95 coins • Grading: Art Course Final Project (Excellent)    │ │
│ │ Oct 15 • +80 coins • Grading: Spoken English Video Task (Good)        │ │
│ │ ... (6 more transactions)                                              │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Activity Trend (Last 30 Days)                                          │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │   4 hrs ├──────────────────────────────────────────────────────────   │ │
│ │         │                    ▓▓▓▓                                     │ │
│ │   3 hrs ├────────────────────▓▓▓▓─────────────────────────────────   │ │
│ │         │      ▓▓▓▓  ▓▓▓▓  ▓▓▓▓▓▓▓▓                      ▓▓▓▓        │ │
│ │   2 hrs ├──────▓▓▓▓──▓▓▓▓──▓▓▓▓▓▓▓▓──────────────────────▓▓▓▓─────   │ │
│ │         │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓  ▓▓▓▓  ▓▓▓▓  ▓▓▓▓▓▓▓▓     │ │
│ │   1 hr  ├──▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓─   │ │
│ │         │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │ │
│ │   0 hrs └──────────────────────────────────────────────────────────   │ │
│ │         Oct 1    Oct 8    Oct 15   Oct 22   Oct 29                   │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Export Modal - CSV/PDF/Print Options

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Export Report                                               [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Report Type: Balagruha Overview Report                                     │
│ Date Range: October 1 - October 24, 2025                                   │
│                                                                             │
│ Export Format *                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ 🔵 CSV (Comma-Separated Values)                                     │   │ ← Radio option 1
│ │    Spreadsheet format for data analysis in Excel/Google Sheets     │   │   (selected)
│ │    Includes: Raw data, all columns, no charts                      │   │   bg-blue-50
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ PDF (Portable Document Format)                                   │   │ ← Radio option 2
│ │    Formatted report with charts, tables, and summary stats         │   │
│ │    Includes: All visualizations, formatted for printing             │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ Print (Print-Friendly HTML)                                      │   │ ← Radio option 3
│ │    Opens print dialog with optimized layout                        │   │
│ │    Includes: Simplified charts, tables, no interactive elements    │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Include in Export                                                           │
│ ☑ Summary Statistics                                                        │
│ ☑ Course Completion Chart                                                   │
│ ☑ Leaderboard Table (Top 10)                                                │
│ ☑ Individual Student Progress (All students)                                │
│ ☐ Coin Transaction History (Optional - increases file size)                 │
│                                                                             │
│ [Cancel]                                              [Export Report]       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Measurements Summary

| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| **Dashboard Container** | 100% (max 1400px) | auto | px-8 py-6 | - | - | - |
| **Stats Card** | 25% (min 200px) | 140px | p-6 | mx-2 | border gray-200 rounded-lg | - |
| **Stats Card Title** | 100% | auto | - | mb-2 | - | text-sm text-gray-600 |
| **Stats Card Value** | 100% | auto | - | mb-1 | - | text-3xl font-bold |
| **Stats Card Trend** | 100% | auto | - | - | - | text-xs text-green-600 |
| **Chart Container** | 100% | 450px | p-6 | my-6 | border gray-200 rounded-lg | - |
| **Side-by-Side Charts** | 48% | 300px | p-6 | my-6 | border gray-200 rounded-lg | - |
| **Leaderboard Table** | 100% | auto | p-6 | my-6 | border gray-200 rounded-lg | - |
| **Table Header** | 100% | 48px | px-4 py-3 | - | border-b-2 gray-300 | text-sm font-semibold |
| **Table Row** | 100% | 56px | px-4 py-3 | - | border-b gray-200 | text-base |
| **Module Progress Bar** | 100% | 8px | - | my-2 | rounded-full bg-gray-200 | - |
| **Alert Card (Struggling)** | 100% | auto | p-4 | mb-3 | border-l-4 orange-500 bg-orange-50 | - |
| **Export Modal** | 600px | auto | px-6 py-4 | - | rounded-lg shadow-xl | - |
| **Export Format Option** | 100% | auto (min 80px) | p-4 | mb-3 | border gray-300 rounded-lg | - |

---

## 2. Acceptance Criteria

### 2.1. Dashboard Overview

- [ ] **DASH-01:** Dashboard displays four stats cards: Total Students, Active Today, Avg Completion %, Coins Awarded
- [ ] **DASH-02:** "Total Students" shows count of students in coach's Balagruha
- [ ] **DASH-03:** "Active Today" shows students with activity today, with trend indicator (↑3 from yesterday)
- [ ] **DASH-04:** "Avg Completion %" shows average course completion across all students, with trend (↑5% from last week)
- [ ] **DASH-05:** "Coins Awarded" shows total coins awarded this month
- [ ] **DASH-06:** Date range filter: Last 7 Days, Last 30 Days, Last 3 Months, Custom Range
- [ ] **DASH-07:** Custom date range opens calendar picker (start date, end date)
- [ ] **DASH-08:** All data updates when date range changes

### 2.2. Performance Charts

- [ ] **CHART-01:** Course Completion Rate bar chart displays all courses with completion %
- [ ] **CHART-02:** Bars color-coded: green (>75%), yellow (50-75%), red (<50%)
- [ ] **CHART-03:** Hovering bar shows tooltip: "Computer Apps: 20/24 students (85%)"
- [ ] **CHART-04:** Clicking bar navigates to Course-Specific Report
- [ ] **CHART-05:** Coin Earnings Trend line chart displays daily coin awards (last 30 days)
- [ ] **CHART-06:** Line chart shows data points with hover tooltip: "Oct 24: 350 coins awarded"
- [ ] **CHART-07:** Time Spent area chart displays total hours spent on platform per week
- [ ] **CHART-08:** All charts responsive: adjust to container width, maintain aspect ratio
- [ ] **CHART-09:** Charts use Recharts library (or equivalent React charting library)

### 2.3. Leaderboard Table

- [ ] **LEAD-01:** Leaderboard displays top 10 students sorted by coins earned (default)
- [ ] **LEAD-02:** Top 3 students have medal icons: 🥇 (gold), 🥈 (silver), 🥉 (bronze)
- [ ] **LEAD-03:** Columns: Rank, Student Name, Class, Courses Complete, Avg Grade, Coins Earned, Hours Spent
- [ ] **LEAD-04:** Sortable by any column (click column header to toggle asc/desc)
- [ ] **LEAD-05:** Clicking student name navigates to Individual Student Report
- [ ] **LEAD-06:** "View Full Leaderboard" expands to show all students (pagination: 20 per page)
- [ ] **LEAD-07:** Empty state: "No student data available for this period"

### 2.4. Course-Specific Reports

- [ ] **COURSE-01:** Course report displays four stats: Assigned to, Started, Completed, Avg Grade
- [ ] **COURSE-02:** Module Completion Breakdown shows progress bars for each module
- [ ] **COURSE-03:** Progress bars show: module title, completion count (18/24), percentage (75%), avg grade, avg time
- [ ] **COURSE-04:** Progress bar color-coded: green (>75%), yellow (50-75%), red (<50%)
- [ ] **COURSE-05:** "Students Needing Attention" section displays struggling students (alert cards)
- [ ] **COURSE-06:** Alert criteria: Stuck (no progress >3 days), Low quiz scores (<60%), Inactive (>7 days), Not started
- [ ] **COURSE-07:** Alert cards show: student name, ID, issue description, last activity, progress %, action buttons
- [ ] **COURSE-08:** "Send Message" button opens message modal to student
- [ ] **COURSE-09:** "View Details" navigates to Individual Student Report
- [ ] **COURSE-10:** Student Progress Table lists all students with progress, grade, last active, time spent
- [ ] **COURSE-11:** Table sortable by any column
- [ ] **COURSE-12:** Context menu (⋮) options: View Details, Send Message, Award Coins

### 2.5. Individual Student Report

- [ ] **STUDENT-01:** Student profile displays: name, ID, class, Balagruha, coin balance, rank (e.g., 🥇 #1 of 24)
- [ ] **STUDENT-02:** Four stats cards: Courses Complete, Avg Grade, Total Hours, Last Active
- [ ] **STUDENT-03:** Course Progress section lists all assigned courses with progress bars
- [ ] **STUDENT-04:** Each course shows: title, progress %, grade, time spent, completion date (if complete), status icon (✅ or 🔄)
- [ ] **STUDENT-05:** "View Details" button navigates to detailed course progress (module/chapter breakdown)
- [ ] **STUDENT-06:** Coin Transaction History shows last 10 transactions (date, amount, type, reason)
- [ ] **STUDENT-07:** "View All" expands transaction history (pagination: 20 per page)
- [ ] **STUDENT-08:** Activity Trend area chart displays daily hours spent on platform (last 30 days)
- [ ] **STUDENT-09:** Chart shows engagement pattern, highlights inactive periods (0 hours days)

### 2.6. Export Functionality

- [ ] **EXPORT-01:** "Export" dropdown in dashboard header with options: CSV, PDF, Print
- [ ] **EXPORT-02:** Clicking export opens Export Modal with format selection
- [ ] **EXPORT-03:** CSV export generates downloadable .csv file with raw data (all students, courses, stats)
- [ ] **EXPORT-04:** CSV includes headers: Student Name, ID, Class, Course, Progress %, Grade, Coins, Hours, Last Active
- [ ] **EXPORT-05:** PDF export generates formatted report with charts (using jsPDF or server-side PDF generation)
- [ ] **EXPORT-06:** PDF includes: Cover page (Balagruha name, date range), summary stats, charts (as images), leaderboard table, student progress table
- [ ] **EXPORT-07:** Print option opens browser print dialog with print-friendly CSS (@media print)
- [ ] **EXPORT-08:** Print layout removes interactive elements, simplifies charts, optimizes for A4 paper
- [ ] **EXPORT-09:** Export modal includes checkboxes to include/exclude sections (Summary, Charts, Leaderboard, Student Details, Transactions)
- [ ] **EXPORT-10:** Export filename format: "Balagruha_Report_YYYY-MM-DD.csv" or ".pdf"

### 2.7. Filters & Search

- [ ] **FILTER-01:** Course filter dropdown shows all courses + "All Courses" option
- [ ] **FILTER-02:** Selecting course filters all data to that course only
- [ ] **FILTER-03:** Student group filter: All Students, Top Performers (>80%), Struggling (<60%)
- [ ] **FILTER-04:** Date range filter applies to all sections (stats, charts, leaderboard, tables)
- [ ] **FILTER-05:** Filters persist when navigating between dashboard views (overview, course, student)
- [ ] **FILTER-06:** "Reset Filters" button clears all filters to default (All Courses, All Students, Last 30 Days)

### 2.8. Performance & Accessibility

- [ ] **PERF-01:** Dashboard loads within 2 seconds (up to 50 students, 10 courses)
- [ ] **PERF-02:** Charts render within 1 second after data fetch
- [ ] **PERF-03:** Course-specific report loads within 1.5 seconds
- [ ] **PERF-04:** Individual student report loads within 1 second
- [ ] **PERF-05:** CSV export generates within 3 seconds (up to 50 students, 10 courses)
- [ ] **PERF-06:** PDF export generates within 5 seconds (includes charts as images)
- [ ] **ACC-01:** Keyboard navigation: Tab through filters, Enter to select, Arrow keys for chart data points
- [ ] **ACC-02:** Screen reader announces: stats values, chart data (accessible alt text), table headers
- [ ] **ACC-03:** Charts have accessible data tables (hidden visually, available to screen readers)
- [ ] **ACC-04:** Color-blind friendly: Use patterns + colors for charts (e.g., stripes for different bars)

---

## 3. Task Breakdown

### Phase 1: Dashboard Overview UI (2 hours)

**Task 1.1: Create `CoachReportsDashboard.jsx` component (45 min)**
- Component structure: header with filters, stats cards section, charts section, leaderboard section
- Date range filter dropdown (Last 7 Days, 30 Days, 3 Months, Custom)
- Custom date range picker (start date, end date inputs)
- Course filter dropdown (All Courses + list of assigned courses)
- Student group filter dropdown (All Students, Top Performers, Struggling)
- Export dropdown (CSV, PDF, Print)
- File: `frontend/src/components/coach/CoachReportsDashboard.jsx`

**Task 1.2: Build stats cards section (30 min)**
- Four stats cards: Total Students, Active Today, Avg Completion %, Coins Awarded
- Fetch data from GET `/api/v2/lms/coach/:coachId/reports/overview`
- Trend indicators: Calculate change from previous period (↑3 from yesterday)
- Responsive grid layout: 4 columns on desktop, 2 columns on tablet, 1 column on mobile
- Component: `StatsCard.jsx` (reusable)
- File: `frontend/src/components/coach/StatsCard.jsx`

**Task 1.3: Integrate Recharts library for charts (45 min)**
- Install: `npm install recharts`
- Create `CourseCompletionChart.jsx` (bar chart)
  - X-axis: Course names
  - Y-axis: Completion percentage (0-100%)
  - Bars color-coded by completion: green (>75%), yellow (50-75%), red (<50%)
  - Tooltip: "Computer Apps: 20/24 students (85%)"
  - Click handler: Navigate to course-specific report
- Create `CoinEarningsChart.jsx` (line chart)
  - X-axis: Dates (last 30 days)
  - Y-axis: Coins awarded
  - Line with data points, smooth curve
  - Tooltip: "Oct 24: 350 coins awarded"
- Create `TimeSpentChart.jsx` (area chart)
  - X-axis: Weeks
  - Y-axis: Total hours
  - Gradient fill area
- Files: `frontend/src/components/coach/charts/*.jsx`

### Phase 2: Leaderboard Table (1 hour)

**Task 2.1: Create `LeaderboardTable.jsx` component (30 min)**
- Table headers: Rank, Student Name, Class, Courses Complete, Avg Grade, Coins Earned, Hours Spent
- Medal icons for top 3: 🥇 🥈 🥉
- Fetch data from GET `/api/v2/lms/coach/:coachId/reports/leaderboard`
- Sort functionality: Click column header to toggle asc/desc
- State management: `sortColumn`, `sortDirection`
- Pagination: Show top 10, "View Full Leaderboard" expands to 20 per page
- File: `frontend/src/components/coach/LeaderboardTable.jsx`

**Task 2.2: Implement click navigation to student report (15 min)**
- Clicking student name navigates to `/coach/reports/student/:studentId`
- Pass student ID as route param
- Preserve date range filter in navigation (query param)

**Task 2.3: Add empty state (15 min)**
- If no data: Display "No student data available for this period"
- Show placeholder illustration or icon
- "Reset Filters" button to clear date range

### Phase 3: Course-Specific Report (1.5 hours)

**Task 3.1: Create `CourseReport.jsx` component (45 min)**
- Header: Course title, back button, date range filter, export button
- Four stats cards: Assigned to, Started, Completed, Avg Grade
- Module Completion Breakdown section:
  - List all modules with progress bars
  - Progress bar: module title, completion count (18/24), percentage, avg grade, avg time
  - Color-coded bars: green/yellow/red
- Fetch data from GET `/api/v2/lms/coach/:coachId/reports/course/:courseId`
- File: `frontend/src/components/coach/CourseReport.jsx`

**Task 3.2: Build "Students Needing Attention" section (30 min)**
- Alert logic (backend aggregation):
  - **Stuck:** No progress for >3 days
  - **Low quiz scores:** Avg quiz score <60%
  - **Inactive:** No activity for >7 days
  - **Not started:** Module 0% complete
- Alert card layout: ⚠️ icon, student name (ID), issue description, last activity, progress %, action buttons
- Action buttons: "Send Message" (opens modal), "View Details" (navigate to student report)
- File: `frontend/src/components/coach/CourseReport.jsx` (section within component)

**Task 3.3: Build student progress table (15 min)**
- Table columns: Student Name, Progress %, Grade, Last Active, Time Spent, Context Menu (⋮)
- Sortable columns
- Context menu options: View Details, Send Message, Award Coins
- Pagination: 20 students per page
- File: `frontend/src/components/coach/StudentProgressTable.jsx`

### Phase 4: Individual Student Report (1.5 hours)

**Task 4.1: Create `StudentReport.jsx` component (45 min)**
- Header: Student name (ID), back button, date range filter, export button
- Student profile section: name, ID, class, Balagruha, coin balance, rank
- Four stats cards: Courses Complete, Avg Grade, Total Hours, Last Active
- Course Progress section:
  - List all assigned courses with progress bars
  - Course card: title, progress %, grade, time spent, completion date, status icon (✅/🔄)
  - "View Details" button navigates to detailed course progress
- Fetch data from GET `/api/v2/lms/coach/:coachId/reports/student/:studentId`
- File: `frontend/src/components/coach/StudentReport.jsx`

**Task 4.2: Build coin transaction history section (30 min)**
- List last 10 transactions: date, amount, type, reason
- Transaction types: Manual Award, Grading (with task/quiz name), Purchase
- "View All" button expands to pagination (20 per page)
- Fetch from GET `/api/v2/lms/transactions/:studentId?limit=10`
- File: `frontend/src/components/coach/CoinTransactionHistory.jsx`

**Task 4.3: Add activity trend chart (15 min)**
- Area chart: X-axis (dates, last 30 days), Y-axis (hours spent)
- Highlight inactive periods (0 hours days) with gray background
- Data from GET `/api/v2/lms/coach/:coachId/reports/student/:studentId/activity`
- File: `frontend/src/components/coach/charts/ActivityTrendChart.jsx`

### Phase 5: Backend API Endpoints (1.5 hours)

**Task 5.1: Implement dashboard overview API (30 min)**
- GET `/api/v2/lms/coach/:coachId/reports/overview`
- Query params: `dateRange`, `courseId?`
- Aggregate data:
  - Total students: Count of students in coach's Balagruha
  - Active today: Students with `lastActivity` >= today
  - Avg completion %: Average of all students' `courseProgress.completionPercentage`
  - Coins awarded: Sum of `Transactions` where `type=manual_award` and `timestamp` in date range
  - Trend calculations: Compare to previous period (same duration)
- Return: `{ totalStudents, activeToday, activeTrend, avgCompletion, completionTrend, coinsAwarded }`
- File: `backend/controllers/coachReportsController.js`

**Task 5.2: Implement leaderboard API (30 min)**
- GET `/api/v2/lms/coach/:coachId/reports/leaderboard`
- Query params: `dateRange`, `courseId?`, `sortBy?` (coins, completion, hours), `order?` (asc/desc), `page?`, `limit?`
- Aggregate data:
  - Join `Students`, `StudentProgress`, `Transactions` collections
  - Calculate: courses complete, avg grade, total coins earned, total hours spent
  - Sort by `sortBy` column, default: `totalCoinsEarned DESC`
  - Pagination: default limit 10
- Return: `{ students: [...], pagination: { currentPage, totalPages, totalStudents } }`
- File: `backend/controllers/coachReportsController.js`

**Task 5.3: Implement course-specific report API (30 min)**
- GET `/api/v2/lms/coach/:coachId/reports/course/:courseId`
- Query params: `dateRange`
- Aggregate data:
  - Assigned to: Count of students with `CourseAssignment` for this course
  - Started: Students with `StudentProgress.courseProgress.completionPercentage > 0`
  - Completed: Students with `completionPercentage = 100`
  - Avg grade: Average of all students' final grades for this course
  - Module breakdown: For each module, calculate completion count, avg grade, avg time spent
  - Students needing attention: Filter by stuck/low scores/inactive/not started criteria
- Return: `{ overview: {...}, modules: [...], strugglingStudents: [...], studentProgress: [...] }`
- File: `backend/controllers/coachReportsController.js`

### Phase 6: Export Functionality (1 hour)

**Task 6.1: Create `ExportModal.jsx` component (20 min)**
- Radio buttons: CSV, PDF, Print
- Checkboxes: Include Summary, Charts, Leaderboard, Student Details, Transactions
- "Export Report" button triggers export based on selected format
- File: `frontend/src/components/coach/ExportModal.jsx`

**Task 6.2: Implement CSV export (20 min)**
- Client-side CSV generation using `papaparse` library: `npm install papaparse`
- Fetch all data (overview, leaderboard, student progress)
- Convert to CSV format with headers
- Trigger download: `downloadCSV(data, 'Balagruha_Report_2025-10-24.csv')`
- File: `frontend/src/utils/exportHelpers.js`

**Task 6.3: Implement PDF export (20 min)**
- Use `jsPDF` library: `npm install jspdf jspdf-autotable`
- Server-side option: POST `/api/v2/lms/coach/:coachId/reports/export/pdf` with report data
- Backend generates PDF using `pdfkit` or similar library
- Response: Binary PDF file for download
- Frontend triggers download
- File: `backend/services/pdfExportService.js`, `frontend/src/utils/exportHelpers.js`

### Phase 7: Testing & Polish (30 min)

**Task 7.1: Unit tests for report aggregation logic (15 min)**
- Test dashboard overview aggregation (total students, active today, avg completion)
- Test leaderboard sorting and pagination
- Test course-specific report module breakdown
- Mock student, progress, transaction data
- File: `backend/tests/controllers/coachReportsController.test.js`

**Task 7.2: E2E test for dashboard navigation (15 min)**
- Test: Coach navigates to reports dashboard, sees stats cards and charts
- Test: Coach clicks course bar chart, navigates to course report
- Test: Coach clicks student name in leaderboard, navigates to student report
- Test: Coach exports CSV, verifies download triggered
- File: `frontend/tests/e2e/coach-reports.spec.js`

---

## 4. API Endpoints

### 4.1. Dashboard Overview

**Endpoint:** `GET /api/v2/lms/coach/:coachId/reports/overview`

**Description:** Fetches aggregated overview stats for coach's Balagruha.

**Request Headers:**
```json
{
  "Authorization": "Bearer <coach_jwt_token>"
}
```

**Query Parameters:**
- `dateRange` (optional): "7d", "30d", "3m", "custom" (default "30d")
- `startDate` (optional, ISO 8601): Start date for custom range
- `endDate` (optional, ISO 8601): End date for custom range
- `courseId` (optional): Filter by specific course

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalStudents": 24,
    "activeToday": {
      "count": 18,
      "trend": "+3",
      "trendPercentage": "+20%"
    },
    "avgCompletion": {
      "percentage": 67,
      "trend": "+5%",
      "trendDirection": "up"
    },
    "coinsAwarded": {
      "total": 4850,
      "thisMonth": 4850,
      "trend": "+850",
      "trendPercentage": "+21%"
    },
    "dateRange": {
      "start": "2025-09-25T00:00:00.000Z",
      "end": "2025-10-24T23:59:59.999Z"
    }
  }
}
```

---

### 4.2. Leaderboard

**Endpoint:** `GET /api/v2/lms/coach/:coachId/reports/leaderboard`

**Description:** Fetches leaderboard of students in coach's Balagruha.

**Request Headers:**
```json
{
  "Authorization": "Bearer <coach_jwt_token>"
}
```

**Query Parameters:**
- `dateRange` (optional): "7d", "30d", "3m", "custom"
- `startDate`, `endDate` (optional): Custom date range
- `courseId` (optional): Filter by course
- `sortBy` (optional): "coins", "completion", "hours", "grade" (default "coins")
- `order` (optional): "asc", "desc" (default "desc")
- `page` (optional, default 1): Page number
- `limit` (optional, default 10): Students per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "students": [
      {
        "rank": 1,
        "studentId": "student123",
        "name": "Ravi Kumar",
        "class": "5th",
        "coursesComplete": 4,
        "totalCourses": 4,
        "avgGrade": 92,
        "coinsEarned": 1850,
        "hoursSpent": 48
      },
      {
        "rank": 2,
        "studentId": "student456",
        "name": "Lakshmi Rao",
        "class": "5th",
        "coursesComplete": 4,
        "totalCourses": 4,
        "avgGrade": 88,
        "coinsEarned": 1720,
        "hoursSpent": 45
      }
      // ... 8 more students
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalStudents": 24,
      "limit": 10,
      "hasNextPage": true
    }
  }
}
```

---

### 4.3. Course-Specific Report

**Endpoint:** `GET /api/v2/lms/coach/:coachId/reports/course/:courseId`

**Description:** Fetches detailed report for a specific course.

**Request Headers:**
```json
{
  "Authorization": "Bearer <coach_jwt_token>"
}
```

**Query Parameters:**
- `dateRange` (optional): "7d", "30d", "3m", "custom"
- `startDate`, `endDate` (optional): Custom date range

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "course": {
      "courseId": "course123",
      "title": "Advanced Computer Apps"
    },
    "overview": {
      "assignedTo": 24,
      "started": 22,
      "startedPercentage": 92,
      "completed": 18,
      "completedPercentage": 75,
      "avgGrade": 85,
      "avgGradeTrend": "+3%"
    },
    "modules": [
      {
        "moduleId": "module1",
        "title": "Introduction to MS Word",
        "completed": 22,
        "total": 24,
        "completionPercentage": 92,
        "avgGrade": 88,
        "avgTimeSpent": 3.2
      },
      {
        "moduleId": "module2",
        "title": "MS Excel Basics",
        "completed": 20,
        "total": 24,
        "completionPercentage": 83,
        "avgGrade": 85,
        "avgTimeSpent": 4.1
      }
      // ... 2 more modules
    ],
    "strugglingStudents": [
      {
        "studentId": "student789",
        "name": "Suresh Patel",
        "studentCode": "STU005",
        "issue": "stuck",
        "description": "Stuck on Module 2, Chapter 3 (5 days)",
        "lastActivity": "2025-10-19T14:30:00.000Z",
        "progress": 48,
        "avgGrade": 62
      }
      // ... 3 more students
    ],
    "studentProgress": [
      {
        "studentId": "student123",
        "name": "Ravi Kumar",
        "progress": 100,
        "grade": 92,
        "lastActive": "2025-10-24T14:15:00.000Z",
        "timeSpent": 12.5
      }
      // ... 23 more students
    ]
  }
}
```

---

### 4.4. Individual Student Report

**Endpoint:** `GET /api/v2/lms/coach/:coachId/reports/student/:studentId`

**Description:** Fetches detailed report for an individual student.

**Request Headers:**
```json
{
  "Authorization": "Bearer <coach_jwt_token>"
}
```

**Query Parameters:**
- `dateRange` (optional): "7d", "30d", "3m", "custom"
- `startDate`, `endDate` (optional): Custom date range

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "student": {
      "studentId": "student123",
      "name": "Ravi Kumar",
      "studentCode": "STU001",
      "class": "5th",
      "balagruha": "Ramakrishna Ashram",
      "coinBalance": 1850,
      "rank": 1,
      "totalStudents": 24
    },
    "overview": {
      "coursesComplete": 4,
      "totalCourses": 4,
      "avgGrade": 92,
      "avgGradeTrend": "+2%",
      "totalHours": 48,
      "totalHoursTrend": "+12",
      "lastActive": "2025-10-24T14:15:00.000Z"
    },
    "courseProgress": [
      {
        "courseId": "course123",
        "title": "Advanced Computer Apps",
        "progress": 100,
        "grade": 92,
        "timeSpent": 12.5,
        "completedAt": "2025-10-20T16:30:00.000Z",
        "status": "completed"
      }
      // ... 3 more courses
    ],
    "coinTransactions": [
      {
        "transactionId": "TXN-2025-0054",
        "date": "2025-10-24T15:28:40.123Z",
        "amount": 100,
        "type": "manual_award",
        "reason": "Great teamwork helping classmates with the art project!",
        "awardedBy": "Coach Priya"
      }
      // ... 9 more transactions
    ],
    "activityTrend": [
      {
        "date": "2025-10-01",
        "hours": 2.5
      },
      {
        "date": "2025-10-02",
        "hours": 3.2
      }
      // ... 28 more days
    ]
  }
}
```

---

### 4.5. Export PDF (Server-Side)

**Endpoint:** `POST /api/v2/lms/coach/:coachId/reports/export/pdf`

**Description:** Generates PDF report for download.

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
  "reportType": "overview",
  "dateRange": "30d",
  "includeSections": {
    "summary": true,
    "charts": true,
    "leaderboard": true,
    "studentDetails": true,
    "transactions": false
  }
}
```

**Response (200 OK):**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="Balagruha_Report_2025-10-24.pdf"

[Binary PDF data]
```

---

## 5. File Paths

```
frontend/src/components/coach/
├── CoachReportsDashboard.jsx        # Main reports dashboard
├── StatsCard.jsx                    # Reusable stats card component
├── LeaderboardTable.jsx             # Top 10 students leaderboard
├── CourseReport.jsx                 # Course-specific detailed report
├── StudentReport.jsx                # Individual student detailed report
├── CoinTransactionHistory.jsx       # Student coin transaction list
├── StudentProgressTable.jsx         # Course student progress table
├── ExportModal.jsx                  # Export format selection modal
└── charts/
    ├── CourseCompletionChart.jsx    # Bar chart (course completion rates)
    ├── CoinEarningsChart.jsx        # Line chart (coin earnings trend)
    ├── TimeSpentChart.jsx           # Area chart (time spent on platform)
    └── ActivityTrendChart.jsx       # Area chart (student activity trend)

frontend/src/utils/
└── exportHelpers.js                 # CSV/PDF export utility functions

backend/controllers/
└── coachReportsController.js        # Reports API endpoints

backend/services/
├── reportAggregationService.js      # Data aggregation logic
└── pdfExportService.js              # PDF generation service

backend/routes/v2/
└── coach.js                         # Coach routes (updated with reports endpoints)

backend/tests/controllers/
└── coachReportsController.test.js   # Unit tests for reports

frontend/tests/e2e/
└── coach-reports.spec.js            # E2E tests for reports dashboard
```

---

## 6. Definition of Done

- [ ] Dashboard displays four stats cards with trend indicators
- [ ] Date range filter updates all data (7d, 30d, 3m, custom)
- [ ] Course completion bar chart displays all courses, color-coded by completion %
- [ ] Clicking bar navigates to course-specific report
- [ ] Coin earnings line chart displays daily coin awards (last 30 days)
- [ ] Time spent area chart displays weekly hours on platform
- [ ] Leaderboard table displays top 10 students with medals (🥇🥈🥉)
- [ ] Leaderboard sortable by any column (coins, completion, hours, grade)
- [ ] Clicking student name navigates to individual student report
- [ ] "View Full Leaderboard" expands to pagination (20 per page)
- [ ] Course-specific report displays overview stats, module breakdown, struggling students, student progress table
- [ ] "Students Needing Attention" section identifies stuck/low scores/inactive students with action buttons
- [ ] Individual student report displays profile, stats, course progress, coin transactions, activity trend chart
- [ ] Export modal allows CSV, PDF, Print selection with section checkboxes
- [ ] CSV export generates downloadable .csv file with all data
- [ ] PDF export generates formatted report with charts as images
- [ ] Print option opens browser print dialog with print-friendly layout
- [ ] All API endpoints return correct aggregated data with RBAC enforcement (Balagruha scope)
- [ ] Unit tests: 80%+ coverage for report aggregation logic
- [ ] E2E tests: Full dashboard navigation tested (overview → course → student → export)
- [ ] Code peer-reviewed
- [ ] Merged to `develop`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:32:30
- **Status:** Draft - Ready for Development

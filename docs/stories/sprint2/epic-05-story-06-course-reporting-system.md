# Epic 05 - Story 06: Course Reporting System (Admin System-Wide View)

**Epic:** Epic 05 - System-Wide Features
**Story:** Story 06 - Course Reporting System
**Feature Area:** Admin Analytics & Reporting
**Story Points:** 8
**Priority:** High
**Estimated Development Time:** 16-20 hours

**Last Updated:** 2025-10-24 17:22:54
**Status:** Ready for Development

---

## 1. Story Overview

### 1.1 User Story

**As an** Admin
**I want** comprehensive system-wide course analytics and reporting capabilities
**So that** I can monitor course effectiveness, student engagement, ISF Coin distribution, completion rates, and make data-driven decisions to improve the LMS system across all Balagruhas.

### 1.2 Story Description

This story implements a powerful **Course Reporting System** that provides admins with system-wide visibility into LMS performance metrics. The reporting system aggregates data across all Balagruhas, courses, students, and coaches to deliver actionable insights through interactive charts, detailed tables, and exportable reports.

**Key Components:**
- **System-Wide Dashboard**: Overview of all courses with key metrics at a glance
- **Course Performance Analytics**: Deep-dive into individual course completion rates and engagement
- **ISF Coin Distribution Reports**: Track coin earnings across courses, modules, and students
- **Time Spent Analytics**: Understand how students allocate time across different courses
- **Student Engagement Metrics**: Identify trends, patterns, and areas needing intervention
- **Advanced Filtering**: Filter by date range, Balagruha, course, coach, student cohort
- **Export Functionality**: Download reports as CSV, PDF, or print-friendly formats
- **Real-Time Updates**: Auto-refresh capabilities for live monitoring
- **Trend Analysis**: Historical data comparison with week-over-week, month-over-month views

### 1.3 Business Context

**Why This Matters:**
- **Data-Driven Decisions**: Move from intuition-based to evidence-based program management
- **Resource Allocation**: Identify which courses need more support, content, or coach training
- **Student Success**: Early identification of struggling students or disengaged cohorts
- **ROI Measurement**: Quantify the impact of ISF Coin system on learning outcomes
- **Stakeholder Reporting**: Generate professional reports for ISF leadership and donors
- **Continuous Improvement**: Track the impact of curriculum changes and interventions

**Impact on ISF Operations:**
- Admins can identify underperforming courses and take corrective action
- Coaches receive data-backed feedback on their teaching effectiveness
- Students benefit from optimized course content based on engagement data
- Leadership gains visibility into program health across all Balagruhas

### 1.4 Acceptance Criteria Summary

This story includes **124 comprehensive acceptance criteria** covering:
- Course performance metrics and completion rates (20 criteria)
- ISF Coin distribution analytics (18 criteria)
- Time spent tracking and analysis (16 criteria)
- Student engagement metrics (15 criteria)
- Advanced filtering and search (12 criteria)
- Data visualization with charts and graphs (15 criteria)
- Export functionality (CSV, PDF, Print) (10 criteria)
- Real-time updates and auto-refresh (8 criteria)
- Historical trend analysis (10 criteria)

---

## 1.5 Visual Layout Diagrams

### Diagram 1: Course Reporting Dashboard - Main View (1366x768)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ISF Admin Panel                                    🔔 [3]  👤 Admin Name  [≡]   │
├──────────────────────────────────────────────────────────────────────────────────┤
│ ← Dashboard / Reports / Course Analytics                                         │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  📊 Course Analytics & Performance Reports                    [🔄 Auto-refresh]  │
│  ─────────────────────────────────────────────────────────────────────────────   │
│                                                                                   │
│  ┌────────────────────────────────────────────────────────────────────────────┐ │
│  │ 🔍 Filters                                              [Clear All] [Apply] │ │
│  ├────────────────────────────────────────────────────────────────────────────┤ │
│  │ Date Range: [From: 2024-01-01] [To: 2024-12-31]  Quick: [Last 7d] [30d]   │ │
│  │ Balagruha: [All Balagruhas ▼]  Course: [All Courses ▼]                     │ │
│  │ Coach: [All Coaches ▼]  Status: [All ▼] [Active] [Archived]               │ │
│  └────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📈 Key Metrics Overview                                                      ││
│  ├──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐  ││
│  │  Total       │  Active      │  Avg         │  Total Coins │  Avg Time    │  ││
│  │  Courses     │  Students    │  Completion  │  Distributed │  Per Course  │  ││
│  │              │              │              │              │              │  ││
│  │   24         │   1,247      │   67.3%      │  42,850      │  3h 42m      │  ││
│  │  +2 this mo  │  +45 this wk │  ↑ 4.2%      │  ↑ 1,250     │  ↓ 18m       │  ││
│  └──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘  ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📊 Course Performance Trends (Last 6 Months)                                 ││
│  │                                                                               ││
│  │  100% ┤                                                  ╭──●                ││
│  │   90% ┤                                        ●────●────╯                   ││
│  │   80% ┤                              ●────●────╯                             ││
│  │   70% ┤                    ●────●────╯                                       ││
│  │   60% ┤          ●────●────╯                                                 ││
│  │   50% ┤   ●──────╯                                                           ││
│  │   40% ┼──╯                                                                   ││
│  │       └────┬────┬────┬────┬────┬────┬────                                   ││
│  │           Jul  Aug  Sep  Oct  Nov  Dec                                       ││
│  │                                                                               ││
│  │  Legend: ● Completion Rate  ■ Engagement Score  ▲ Coin Distribution         ││
│  │  [Toggle: Completion] [Engagement] [Coins] [Time Spent]                     ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📋 Course-Level Performance Table                    [Export ▼] [🖨️ Print]  ││
│  ├──────────────┬────────┬──────────┬──────────┬──────────┬──────────┬────────┤││
│  │ Course Name  │Students│Completion│Avg Coins │Avg Time  │Engagement│Actions ││
│  ├──────────────┼────────┼──────────┼──────────┼──────────┼──────────┼────────┤││
│  │ 💻 Computer  │  342   │  72.4%   │  185     │ 4h 23m   │  ⭐⭐⭐⭐ │[Detail]││
│  │    Apps      │        │ ████░░░  │ ↑ 12     │ ↑ 15m    │   82%    │        ││
│  ├──────────────┼────────┼──────────┼──────────┼──────────┼──────────┼────────┤││
│  │ 🎨 Art &     │  298   │  68.1%   │  142     │ 3h 45m   │  ⭐⭐⭐⭐ │[Detail]││
│  │    Design    │        │ ███░░░░  │ ↑ 8      │ ↓ 22m    │   74%    │        ││
│  ├──────────────┼────────┼──────────┼──────────┼──────────┼──────────┼────────┤││
│  │ 🗣️ Spoken   │  276   │  61.3%   │  128     │ 2h 58m   │  ⭐⭐⭐   │[Detail]││
│  │    English   │        │ ███░░░░  │ ↓ 5      │ ↓ 12m    │   65%    │        ││
│  └──────────────┴────────┴──────────┴──────────┴──────────┴──────────┴────────┘││
│  │ Showing 3 of 24 courses                              [1] 2 3 4 ... 8 [Next] ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                   │
└───────────────────────────────────────────────────────────────────────────────────┘

MEASUREMENTS:
┌─────────────────────────┬─────────┬────────┬─────────┬────────┬────────────┐
│ Component               │ Width   │ Height │ Padding │ Margin │ Font       │
├─────────────────────────┼─────────┼────────┼─────────┼────────┼────────────┤
│ Filter Panel            │ 100%    │ Auto   │ p-6     │ mb-6   │ text-sm    │
│ Metric Card             │ 20%     │ 140px  │ p-4     │ mx-2   │ text-base  │
│ Metric Value            │ Auto    │ Auto   │ -       │ mb-1   │ text-3xl   │
│ Metric Label            │ Auto    │ Auto   │ -       │ mb-2   │ text-xs    │
│ Chart Container         │ 100%    │ 320px  │ p-6     │ my-6   │ -          │
│ Table Row               │ 100%    │ 60px   │ p-4     │ -      │ text-sm    │
│ Progress Bar            │ 80px    │ 8px    │ -       │ -      │ -          │
│ Action Button           │ 80px    │ 36px   │ px-3    │ -      │ text-xs    │
└─────────────────────────┴─────────┴────────┴─────────┴────────┴────────────┘
```

### Diagram 2: Course Detail View Modal (1200x800)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│  💻 Computer Apps - Detailed Performance Report                         [✕]   │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │ 📊 Course Summary                                                         │ │
│  ├──────────────────────────────────────────────────────────────────────────┤ │
│  │ Total Students: 342    Active: 298    Completed: 248 (72.4%)             │ │
│  │ Total Modules: 12      Total Chapters: 48      Total Content: 156        │ │
│  │ Assigned Coaches: 8    Balagruhas: 6           Date Range: Jan-Dec 2024  │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │ 📈 Completion Funnel                                                      │ │
│  │                                                                            │ │
│  │   Enrolled        │████████████████████████████████████████│ 342 (100%)  │ │
│  │                   │                                                        │ │
│  │   Started         │████████████████████████████████████│ 325 (95.0%)     │ │
│  │                   │                                                        │ │
│  │   50% Complete    │████████████████████████████│ 287 (83.9%)             │ │
│  │                   │                                                        │ │
│  │   90% Complete    │██████████████████████│ 265 (77.5%)                   │ │
│  │                   │                                                        │ │
│  │   Completed       │██████████████████│ 248 (72.4%)                       │ │
│  │                                                                            │ │
│  │   Drop-off Points: Module 3 (-18 students), Module 7 (-12 students)      │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │ 💰 ISF Coin Distribution by Module                                        │ │
│  │                                                                            │ │
│  │  250 ┤                                                                    │ │
│  │  225 ┤     ╭───●                                                          │ │
│  │  200 ┤   ●─╯   │   ╭───●───●───●                                         │ │
│  │  175 ┤ ╭─╯     ╰───╯               ╰───●───●                             │ │
│  │  150 ┤─╯                                   ╰───●───●───●                  │ │
│  │  125 ┤                                                                    │ │
│  │  100 ┼─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬───── │ │
│  │       M1   M2   M3   M4   M5   M6   M7   M8   M9   M10  M11  M12         │ │
│  │                                                                            │ │
│  │  Total Coins Distributed: 63,270  |  Avg Per Student: 185                │ │
│  │  Highest Earning Module: M3 (6,450 coins)  |  Lowest: M12 (3,220 coins)  │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │ ⏱️ Time Spent Analysis                                                    │ │
│  │                                                                            │ │
│  │  Avg Time per Student: 4h 23m    Total System Time: 1,496 hours          │ │
│  │  Median Time: 4h 10m             Mode: 3h 45m - 4h 15m                   │ │
│  │                                                                            │ │
│  │  Time Distribution:                                                        │ │
│  │  ├─ 0-2h      ░░░░░░░░░░░░░░░░  45 students (13.2%)                      │ │
│  │  ├─ 2-4h      ████████████████████████░  128 students (37.4%)            │ │
│  │  ├─ 4-6h      ██████████████████████████████  142 students (41.5%)       │ │
│  │  ├─ 6-8h      ████████░  18 students (5.3%)                               │ │
│  │  └─ 8h+       ██░  9 students (2.6%)                                      │ │
│  │                                                                            │ │
│  │  Peak Engagement Hours: 4-6 PM (42%), 10-12 PM (28%), 7-9 PM (18%)       │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │ 🎯 Student Engagement Score Breakdown                                     │ │
│  │                                                                            │ │
│  │  ⭐⭐⭐⭐⭐ Excellent (90-100%):  ████████████░  98 students (28.7%)        │ │
│  │  ⭐⭐⭐⭐   Good (75-89%):       ██████████████████░  156 students (45.6%) │ │
│  │  ⭐⭐⭐     Fair (60-74%):       ████████░  62 students (18.1%)            │ │
│  │  ⭐⭐       Poor (40-59%):       ██░  18 students (5.3%)                   │ │
│  │  ⭐         Critical (<40%):     ░  8 students (2.3%)                      │ │
│  │                                                                            │ │
│  │  Engagement Factors: Quiz participation, time spent, assignment quality   │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  [📄 Export Full Report] [📊 Export Charts] [🖨️ Print] [← Back to Dashboard]  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

MEASUREMENTS:
┌─────────────────────────┬─────────┬────────┬─────────┬────────┬────────────┐
│ Component               │ Width   │ Height │ Padding │ Margin │ Font       │
├─────────────────────────┼─────────┼────────┼─────────┼────────┼────────────┤
│ Modal Container         │ 1200px  │ 800px  │ p-0     │ -      │ -          │
│ Summary Panel           │ 100%    │ Auto   │ p-6     │ mb-4   │ text-sm    │
│ Funnel Chart            │ 100%    │ 200px  │ p-6     │ my-4   │ text-sm    │
│ Coin Chart              │ 100%    │ 240px  │ p-6     │ my-4   │ -          │
│ Time Analysis Section   │ 100%    │ Auto   │ p-6     │ my-4   │ text-sm    │
│ Engagement Bar          │ 80%     │ 24px   │ -       │ my-2   │ text-sm    │
│ Footer Buttons          │ Auto    │ 44px   │ px-6    │ p-6    │ text-base  │
└─────────────────────────┴─────────┴────────┴─────────┴────────┴────────────┘
```

### Diagram 3: ISF Coin Distribution Report (Full Width)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 💰 ISF Coin Distribution Analytics                         [Filter] [Export ▼] │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📊 Total Coin Distribution Overview                                          ││
│  ├────────────────┬────────────────┬────────────────┬────────────────┬────────┐ ││
│  │ Total Coins    │ This Month     │ Avg Per Student│ Top Earner     │Growth  │ ││
│  │ Distributed    │ Distribution   │ Per Course     │ This Month     │Rate    │ ││
│  │                │                │                │                │        │ ││
│  │  142,850       │   12,450       │     185        │  Ravi K.       │ ↑ 8.5% │ ││
│  │  All Time      │  ↑ 1,250 (11%) │  Across 24 crs │  (842 coins)   │ MoM    │ ││
│  └────────────────┴────────────────┴────────────────┴────────────────┴────────┘ ││
│  └─────────────────────────────────────────────────────────────────────────────┘││
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📈 Coin Distribution by Course (Top 10)                                      ││
│  │                                                                               ││
│  │  Computer Apps     ████████████████████████████████  63,270  (44.3%)        ││
│  │  Art & Design      ████████████████████████  42,360  (29.7%)                ││
│  │  Spoken English    ████████████████  35,420  (24.8%)                         ││
│  │  Life Skills       ████████  15,860  (11.1%)                                 ││
│  │  Yoga & Wellness   ██████  12,240  (8.6%)                                    ││
│  │  Music Basics      ████  8,450  (5.9%)                                       ││
│  │  Environmental Sci ███  6,720  (4.7%)                                        ││
│  │  Basic Math        ███  6,340  (4.4%)                                        ││
│  │  Creative Writing  ██  5,180  (3.6%)                                         ││
│  │  General Knowledge ██  4,920  (3.4%)                                         ││
│  │                                                                               ││
│  │  [View All Courses] [Download Detailed Report]                               ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 🏆 Top 20 Coin Earners (Current Period: Jan-Dec 2024)                        ││
│  ├──────┬─────────────────┬──────────┬───────────┬──────────────┬────────────┐ ││
│  │ Rank │ Student Name    │Balagruha │Total Coins│ Top Course   │Avg/Course  │ ││
│  ├──────┼─────────────────┼──────────┼───────────┼──────────────┼────────────┤ ││
│  │  🥇  │ Ravi Kumar      │ BG-001   │   842     │ Computer Apps│    210     │ ││
│  │  🥈  │ Priya Sharma    │ BG-003   │   825     │ Art & Design │    206     │ ││
│  │  🥉  │ Amit Patel      │ BG-002   │   798     │ Spoken Eng   │    200     │ ││
│  │   4  │ Sneha Reddy     │ BG-001   │   782     │ Computer Apps│    195     │ ││
│  │   5  │ Rajesh Singh    │ BG-004   │   765     │ Life Skills  │    191     │ ││
│  │  ... │ ...             │ ...      │   ...     │ ...          │    ...     │ ││
│  │  20  │ Kavita Nair     │ BG-005   │   645     │ Art & Design │    161     │ ││
│  └──────┴─────────────────┴──────────┴───────────┴──────────────┴────────────┘ ││
│  │ Showing top 20 of 1,247 students                     [View Full Leaderboard]││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📊 Coin Distribution by Balagruha                                             ││
│  │                                                                               ││
│  │  BG-001 (Bangalore)    ████████████████████████  28,450  (19.9%)  [Detail]  ││
│  │  BG-002 (Chennai)      ██████████████████████  26,320  (18.4%)    [Detail]  ││
│  │  BG-003 (Delhi)        ████████████████████  24,680  (17.3%)      [Detail]  ││
│  │  BG-004 (Mumbai)       ██████████████████  22,140  (15.5%)        [Detail]  ││
│  │  BG-005 (Kolkata)      ████████████████  19,870  (13.9%)          [Detail]  ││
│  │  BG-006 (Hyderabad)    ██████████████  17,390  (12.2%)            [Detail]  ││
│  │                                                                               ││
│  │  Avg Coins per Student by Balagruha:                                         ││
│  │  Highest: BG-001 (192 coins/student)  |  Lowest: BG-006 (164 coins/student) ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📅 Monthly Coin Distribution Trend (Last 12 Months)                          ││
│  │                                                                               ││
│  │  15k ┤                                                    ╭───●               ││
│  │  14k ┤                                          ●────●────╯                   ││
│  │  13k ┤                                ●────●────╯                             ││
│  │  12k ┤                      ●────●────╯                                       ││
│  │  11k ┤            ●────●────╯                                                 ││
│  │  10k ┤   ●────●───╯                                                           ││
│  │   9k ┤───╯                                                                    ││
│  │      └─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬─── ││
│  │           Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep  Oct  Nov  Dec         ││
│  │                                                                               ││
│  │  Peak Month: December (12,450 coins)  |  Avg Monthly: 11,904 coins           ││
│  │  Growth Rate: 8.5% MoM  |  YoY Growth: 42.3%                                 ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                   │
└───────────────────────────────────────────────────────────────────────────────────┘
```

### Diagram 4: Time Spent Analytics Dashboard

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ⏱️ Student Time Spent Analytics                           [Filter] [Export ▼]   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📊 System-Wide Time Metrics                                                  ││
│  ├─────────────────┬─────────────────┬─────────────────┬─────────────────┬────┐││
│  │ Total Learning  │ Avg Per Student │ Avg Per Course  │ Most Active Day │Peak│││
│  │ Hours (System)  │ (All Courses)   │ (All Students)  │ of Week         │Hour│││
│  │                 │                 │                 │                 │    │││
│  │   4,628 hours   │   3h 42m        │   2h 15m        │  Wednesday      │4-6P│││
│  │  This Month     │  Across 1,247   │  Across 24 crs  │  (842 hrs)      │PM  │││
│  └─────────────────┴─────────────────┴─────────────────┴─────────────────┴────┘││
│  └─────────────────────────────────────────────────────────────────────────────┘││
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📈 Average Time Spent by Course (Hours)                                      ││
│  │                                                                               ││
│  │  Computer Apps     ████████████████████████████  4h 23m                     ││
│  │  Art & Design      ██████████████████████  3h 45m                            ││
│  │  Life Skills       ████████████████████  3h 28m                              ││
│  │  Spoken English    ████████████████  2h 58m                                  ││
│  │  Yoga & Wellness   ██████████████  2h 35m                                    ││
│  │  Music Basics      ████████████  2h 12m                                      ││
│  │  Environmental Sci ██████████  1h 58m                                        ││
│  │  Basic Math        ████████  1h 42m                                          ││
│  │  Creative Writing  ██████  1h 28m                                            ││
│  │  General Knowledge ████  1h 15m                                              ││
│  │                                                                               ││
│  │  Benchmark: Industry avg for similar courses: 2h 30m per course              ││
│  │  [View Detailed Breakdown] [Compare to Previous Period]                      ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📅 Time Spent Heatmap - By Day and Hour (Last 30 Days)                       ││
│  │                                                                               ││
│  │        12A 2A 4A 6A 8A 10A 12P 2P 4P 6P 8P 10P                               ││
│  │   Mon  ░░ ░░ ░░ ░░ ░░ ██  ███ ██ ███ ███ ██  ░░                             ││
│  │   Tue  ░░ ░░ ░░ ░░ ░░ ██  ███ ██ ███ ███ ██  ░░                             ││
│  │   Wed  ░░ ░░ ░░ ░░ ░░ ███ ███ ███ ███ ███ ███ ░░                            ││
│  │   Thu  ░░ ░░ ░░ ░░ ░░ ██  ███ ██ ███ ███ ██  ░░                             ││
│  │   Fri  ░░ ░░ ░░ ░░ ░░ ██  ███ ██ ███ ███ ██  ░░                             ││
│  │   Sat  ░░ ░░ ░░ ░░ ░░ ██  ██  ██ ██  ██  ██  ░░                             ││
│  │   Sun  ░░ ░░ ░░ ░░ ░░ ░░  ██  ██ ██  ██  ░░  ░░                             ││
│  │                                                                               ││
│  │   Legend: ░░ Low (<50 hrs) ██ Medium (50-150 hrs) ███ High (>150 hrs)       ││
│  │                                                                               ││
│  │   Peak Engagement: Wed 4-6 PM (312 hours) | Lowest: Sun 12-6 AM (2 hours)   ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 🎯 Student Engagement Distribution (By Time Spent Quartiles)                 ││
│  │                                                                               ││
│  │   Highly Engaged (Top 25%)    ████████████  312 students  Avg: 6h 20m       ││
│  │   └─ 5h+ per course                                                          ││
│  │                                                                               ││
│  │   Moderately Engaged (26-50%) ██████████████  312 students  Avg: 4h 15m     ││
│  │   └─ 3h-5h per course                                                        ││
│  │                                                                               ││
│  │   Somewhat Engaged (51-75%)   ██████████████  311 students  Avg: 2h 45m     ││
│  │   └─ 1.5h-3h per course                                                      ││
│  │                                                                               ││
│  │   Low Engagement (Bottom 25%) ████████████  312 students  Avg: 1h 10m       ││
│  │   └─ <1.5h per course                                                        ││
│  │                                                                               ││
│  │   ⚠️ 87 students with <30 min total time (flagged for intervention)          ││
│  │   [View Flagged Students] [Export Intervention List]                         ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📊 Time vs Completion Correlation Analysis                                   ││
│  │                                                                               ││
│  │   Completion Rate (%)                                                         ││
│  │   100 ┤                                        ●●●●●                         ││
│  │    90 ┤                               ●●●●●●●●●                              ││
│  │    80 ┤                         ●●●●●●                                       ││
│  │    70 ┤                   ●●●●●●                                             ││
│  │    60 ┤             ●●●●●●                                                   ││
│  │    50 ┤       ●●●●●●                                                         ││
│  │    40 ┤  ●●●●●                                                               ││
│  │    30 ┼──────┬──────┬──────┬──────┬──────┬──────┬──────                     ││
│  │        1h    2h    3h    4h    5h    6h    7h+  Time Spent                  ││
│  │                                                                               ││
│  │   Correlation Coefficient: 0.87 (Strong Positive)                            ││
│  │   Key Insight: Students spending 4-5 hours have 85%+ completion rate         ││
│  │   Recommended Minimum: 3 hours per course for 70%+ completion                ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                   │
└───────────────────────────────────────────────────────────────────────────────────┘
```

### Diagram 5: Export Options Modal (600x500)

```
┌──────────────────────────────────────────────────────────┐
│  📥 Export Report                                  [✕]   │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Select Export Format:                                    │
│  ┌────────────────────────────────────────────────────┐  │
│  │  ● CSV (Comma-Separated Values)                    │  │
│  │    └─ Best for data analysis in Excel/Sheets       │  │
│  │                                                     │  │
│  │  ○ PDF (Portable Document Format)                  │  │
│  │    └─ Professional report with charts & formatting │  │
│  │                                                     │  │
│  │  ○ Excel (XLSX)                                    │  │
│  │    └─ Formatted spreadsheet with multiple sheets   │  │
│  │                                                     │  │
│  │  ○ Print View                                      │  │
│  │    └─ Printer-friendly layout                      │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  Select Data to Include:                                  │
│  ┌────────────────────────────────────────────────────┐  │
│  │  ☑ Course performance metrics                      │  │
│  │  ☑ Completion rates                                │  │
│  │  ☑ ISF Coin distribution                           │  │
│  │  ☑ Time spent analytics                            │  │
│  │  ☑ Student engagement scores                       │  │
│  │  ☑ Charts and visualizations (PDF only)            │  │
│  │  ☑ Raw data tables                                 │  │
│  │  ☐ Student-level details                           │  │
│  │  ☐ Coach performance breakdown                     │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  Date Range:                                              │
│  ┌────────────────────────────────────────────────────┐  │
│  │  From: [2024-01-01]  To: [2024-12-31]             │  │
│  │  Quick: [Last 7 Days] [Last 30 Days] [This Year]  │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  Additional Options:                                      │
│  ┌────────────────────────────────────────────────────┐  │
│  │  ☑ Include ISF branding and logo                   │  │
│  │  ☑ Add summary page                                │  │
│  │  ☐ Group by Balagruha                              │  │
│  │  ☐ Include trend comparisons                       │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  File Name:                                               │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Course_Report_2024-10-24.csv                      │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Estimated file size: ~2.4 MB                      │  │
│  │  Estimated time: ~5 seconds                        │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│         [Cancel]              [Generate Report]           │
│                                                           │
└───────────────────────────────────────────────────────────┘

MEASUREMENTS:
┌─────────────────────────┬─────────┬────────┬─────────┐
│ Component               │ Width   │ Height │ Padding │
├─────────────────────────┼─────────┼────────┼─────────┤
│ Modal Container         │ 600px   │ 500px  │ p-0     │
│ Section Title           │ 100%    │ Auto   │ mb-3    │
│ Radio Group             │ 100%    │ Auto   │ p-4     │
│ Checkbox Group          │ 100%    │ Auto   │ p-4     │
│ Input Field             │ 100%    │ 40px   │ px-3    │
│ Button                  │ 140px   │ 44px   │ px-6    │
└─────────────────────────┴─────────┴────────┴─────────┘
```

### Diagram 6: Student Engagement Trends (Timeline View)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 📊 Student Engagement Trends - Timeline Analysis                    [Filter ▼]  │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📈 Engagement Score Over Time (Last 6 Months)                                ││
│  │                                                                               ││
│  │  100% ┤                                                                       ││
│  │   90% ┤                                              ╭───●                    ││
│  │   80% ┤                                    ●────●────╯                        ││
│  │   70% ┤                          ●────●────╯                                  ││
│  │   60% ┤                ●────●────╯                                            ││
│  │   50% ┤      ●────●────╯                                                      ││
│  │   40% ┤  ●───╯                                                                ││
│  │   30% ┼──╯                                                                    ││
│  │       └──────┬──────┬──────┬──────┬──────┬──────┬──────                      ││
│  │             Jul    Aug    Sep    Oct    Nov    Dec                            ││
│  │                                                                               ││
│  │   Current Avg: 74.2%  |  Previous Period: 68.5%  |  Growth: +5.7%            ││
│  │   Trend: ↗ Positive   |  Projection for Jan: 76.8%                           ││
│  └─────────────────────────────────────────────────────────────────────────────┘││
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 🎯 Engagement Factors Breakdown (Weighted Contribution)                      ││
│  │                                                                               ││
│  │   Quiz Participation (30%)       ████████████████████████████  87.3%        ││
│  │   Time Spent (25%)               ████████████████████  72.5%                 ││
│  │   Assignment Completion (20%)    ██████████████████████████  91.2%          ││
│  │   Assignment Quality (15%)       ██████████████  65.8%                       ││
│  │   Login Frequency (10%)          ████████████████████  78.4%                 ││
│  │                                                                               ││
│  │   Overall Weighted Score: 79.6%                                              ││
│  │   Top Performing Factor: Assignment Completion (91.2%)                       ││
│  │   Needs Improvement: Assignment Quality (65.8%)                              ││
│  └─────────────────────────────────────────────────────────────────────────────┘││
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ 📅 Engagement by Cohort (New vs Returning Students)                          ││
│  │                                                                               ││
│  │   Week 1    New: ███████░  71%    Returning: ██████████░  85%               ││
│  │   Week 2    New: ████████░  76%   Returning: ███████████░  88%              ││
│  │   Week 3    New: █████████░  82%  Returning: ███████████░  89%              ││
│  │   Week 4    New: █████████░  84%  Returning: ████████████  92%              ││
│  │   Week 5+   New: ██████████  87%  Returning: ████████████  93%              ││
│  │                                                                               ││
│  │   Key Insight: New students show 16% engagement increase in first month      ││
│  │   Retention Rate: 94.3% for students who complete Week 1                     ││
│  └─────────────────────────────────────────────────────────────────────────────┘││
│                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ ⚠️ At-Risk Students (Engagement <50% for 2+ Consecutive Weeks)               ││
│  ├────────┬──────────────────┬──────────┬──────────┬─────────────┬───────────┐ ││
│  │ Student│ Current Engage   │Last Login│Completion│ Risk Level  │ Action    │ ││
│  ├────────┼──────────────────┼──────────┼──────────┼─────────────┼───────────┤ ││
│  │ Arjun M│  32% (↓ -18%)    │ 8 days   │   12%    │ 🔴 Critical │[Contact]  │ ││
│  │ Meera K│  42% (↓ -12%)    │ 5 days   │   28%    │ 🟠 High     │[Contact]  │ ││
│  │ Rohit S│  48% (↓ -8%)     │ 3 days   │   45%    │ 🟡 Medium   │[Monitor]  │ ││
│  └────────┴──────────────────┴──────────┴──────────┴─────────────┴───────────┘ ││
│  │ Showing 3 of 26 at-risk students                     [View All] [Export]     ││
│  │ Auto-notification sent to assigned coaches for critical/high risk students   ││
│  └─────────────────────────────────────────────────────────────────────────────┘││
│                                                                                   │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Comprehensive Acceptance Criteria

### 2.1 Course Performance Metrics (20 Criteria)

**AC-01:** Dashboard displays total number of courses (active, archived, draft) with visual count badges
**AC-02:** Each course shows total enrolled students count with enrollment trend indicator (↑/↓)
**AC-03:** Completion rate displayed as percentage with visual progress bar (0-100%)
**AC-04:** Completion rate color-coded: <50% (red), 50-75% (orange), 75-90% (blue), >90% (green)
**AC-05:** Average completion time calculated per course across all students
**AC-06:** Completion funnel shows: Enrolled → Started → 50% Complete → 90% Complete → Completed
**AC-07:** Drop-off points identified automatically at module/chapter level with student counts
**AC-08:** Course performance table sortable by: name, students, completion, coins, time, engagement
**AC-09:** Table supports pagination with 10/25/50/100 items per page options
**AC-10:** Click course row to open detailed performance modal with full analytics
**AC-11:** Module-level breakdown shows completion rates for each module within a course
**AC-12:** Chapter-level drill-down available from module view
**AC-13:** Content item analytics show which quizzes/videos/readings have highest drop-off
**AC-14:** Completion trends chart displays last 6 months of data with month-over-month comparison
**AC-15:** Quick stats show: total courses, active students, average completion, total coins, avg time
**AC-16:** Each stat includes trend indicator comparing to previous period (+X% or -X%)
**AC-17:** Course comparison feature allows selecting 2-4 courses for side-by-side analysis
**AC-18:** Benchmark indicators show how course performs vs. system average
**AC-19:** Top performing courses highlighted with badges (highest completion, engagement, etc.)
**AC-20:** Underperforming courses flagged with warning icon if completion <50% or engagement <60%

### 2.2 ISF Coin Distribution Analytics (18 Criteria)

**AC-21:** Total coins distributed displayed system-wide with all-time and current period counts
**AC-22:** Coins distributed this month shown with comparison to previous month (absolute and %)
**AC-23:** Average coins per student calculated across all courses
**AC-24:** Top earner this month displayed with student name, photo, total coins, and top course
**AC-25:** Growth rate calculated month-over-month and year-over-year
**AC-26:** Coin distribution by course shown in horizontal bar chart with exact counts and percentages
**AC-27:** Chart supports filtering to show top 5/10/20/all courses
**AC-28:** Module-level coin distribution chart shows coins earned at each module stage
**AC-29:** Identifies highest and lowest earning modules with specific coin counts
**AC-30:** Top 20 coin earners leaderboard shows: rank, name, Balagruha, total coins, top course, avg per course
**AC-31:** Leaderboard supports filtering by date range, Balagruha, course
**AC-32:** Medal icons displayed for top 3 earners (🥇🥈🥉)
**AC-33:** Coin distribution by Balagruha shows total coins and average per student for each location
**AC-34:** Balagruha comparison highlights highest and lowest average coins per student
**AC-35:** Monthly coin distribution trend chart displays last 12 months of data
**AC-36:** Peak month identified with specific count and growth rate
**AC-37:** Coin distribution supports export to CSV/PDF with student-level details (privacy-aware)
**AC-38:** Coin anomaly detection flags unusual spikes or drops (>20% deviation from trend)

### 2.3 Time Spent Tracking and Analysis (16 Criteria)

**AC-39:** Total learning hours displayed system-wide for selected date range
**AC-40:** Average time per student calculated across all enrolled courses
**AC-41:** Average time per course calculated across all enrolled students
**AC-42:** Most active day of week identified with total hours spent
**AC-43:** Peak engagement hour identified (e.g., 4-6 PM) with percentage of activity
**AC-44:** Average time by course shown in horizontal bar chart with hours and minutes
**AC-45:** Benchmark comparison shows industry average vs. ISF courses (if available)
**AC-46:** Time spent heatmap displays day-of-week × hour-of-day grid with activity levels
**AC-47:** Heatmap color-coded: low (<50 hrs), medium (50-150 hrs), high (>150 hrs)
**AC-48:** Peak and lowest engagement times highlighted on heatmap
**AC-49:** Student engagement distribution by time quartiles: Top 25%, 26-50%, 51-75%, Bottom 25%
**AC-50:** Each quartile shows student count and average time spent
**AC-51:** Students with <30 minutes total time flagged for intervention with count displayed
**AC-52:** Time vs. completion correlation scatter plot shows relationship between time and completion rate
**AC-53:** Correlation coefficient calculated and displayed (e.g., 0.87 - strong positive)
**AC-54:** Recommended minimum time per course calculated based on 70%+ completion threshold

### 2.4 Student Engagement Metrics (15 Criteria)

**AC-55:** Overall engagement score calculated using weighted formula: Quiz (30%) + Time (25%) + Completion (20%) + Quality (15%) + Frequency (10%)
**AC-56:** Engagement score displayed as percentage (0-100%) with visual progress bar
**AC-57:** Engagement score color-coded by tier: ⭐⭐⭐⭐⭐ (90-100%), ⭐⭐⭐⭐ (75-89%), ⭐⭐⭐ (60-74%), ⭐⭐ (40-59%), ⭐ (<40%)
**AC-58:** Student count displayed for each engagement tier with percentage of total
**AC-59:** Engagement factors breakdown shows individual scores for each component
**AC-60:** Top performing factor and lowest factor highlighted with specific percentages
**AC-61:** Engagement trends chart shows last 6 months of historical data
**AC-62:** Current average, previous period average, and growth percentage displayed
**AC-63:** Trend projection estimates next month's engagement score based on historical data
**AC-64:** Engagement by cohort comparison shows new vs. returning students over 5+ week period
**AC-65:** Retention rate calculated for students who complete Week 1
**AC-66:** At-risk students list shows students with <50% engagement for 2+ consecutive weeks
**AC-67:** At-risk table displays: student name, current engagement (with trend), last login, completion %, risk level
**AC-68:** Risk level color-coded: 🔴 Critical (<30%), 🟠 High (30-40%), 🟡 Medium (40-50%)
**AC-69:** Auto-notification sent to assigned coaches for critical/high risk students

### 2.5 Advanced Filtering and Search (12 Criteria)

**AC-70:** Date range filter with from/to date pickers using calendar component
**AC-71:** Quick date presets: Last 7 days, Last 30 days, Last 90 days, This Year, All Time
**AC-72:** Balagruha dropdown filter shows all Balagruhas with "All" option
**AC-73:** Course dropdown filter shows all courses (active + archived) with "All" option
**AC-74:** Coach dropdown filter shows all coaches with "All" option
**AC-75:** Status filter with checkboxes: Active, Archived, Draft courses
**AC-76:** Apply button triggers report refresh with selected filters
**AC-77:** Clear All button resets all filters to default (All, All Time)
**AC-78:** Filter state persists in URL query parameters for sharing/bookmarking
**AC-79:** Loading indicator displayed during filter application (skeleton screens)
**AC-80:** Filter summary displayed above results: "Showing X courses for [Balagruha] from [Date] to [Date]"
**AC-81:** No results message displayed if filters return zero courses with suggestion to adjust filters

### 2.6 Data Visualization with Charts (15 Criteria)

**AC-82:** Course performance trends line chart uses Recharts library
**AC-83:** Line chart supports multiple data series toggle: Completion Rate, Engagement, Coins, Time
**AC-84:** Chart tooltip shows exact values on hover with date and all series values
**AC-85:** Chart axis labels clearly formatted (months for x-axis, percentages/values for y-axis)
**AC-86:** Completion funnel chart displays 5 stages with exact counts and percentages
**AC-87:** Funnel chart calculates drop-off between stages and highlights largest drop-off
**AC-88:** ISF Coin distribution by course uses horizontal bar chart with exact counts
**AC-89:** Bar chart includes percentage of total next to absolute count
**AC-90:** Coin distribution by module line chart shows trends across 12 modules
**AC-91:** Time spent heatmap uses color gradient from light (low) to dark (high)
**AC-92:** Heatmap supports click interaction to view detailed logs for that time slot
**AC-93:** Time vs. completion scatter plot displays correlation with trendline
**AC-94:** Engagement score breakdown uses stacked horizontal bars showing weighted components
**AC-95:** All charts responsive and scale appropriately for different screen sizes
**AC-96:** Charts render with smooth animations on load and data updates

### 2.7 Export Functionality (10 Criteria)

**AC-97:** Export button dropdown shows 4 format options: CSV, PDF, Excel (XLSX), Print View
**AC-98:** CSV export generates comma-separated file with all selected data tables
**AC-99:** CSV includes headers row with clear column names
**AC-100:** PDF export generates professional report with ISF branding, logo, and formatting
**AC-101:** PDF includes executive summary page with key metrics
**AC-102:** PDF embeds charts and graphs as high-resolution images
**AC-103:** Excel export creates multi-sheet workbook: Summary, Courses, Students, Coins, Time
**AC-104:** Excel sheets formatted with colors, borders, and frozen header rows
**AC-105:** Print view opens print-friendly layout with proper page breaks and margins
**AC-106:** Export modal allows selecting: data to include, date range, grouping options, branding

### 2.8 Real-Time Updates and Auto-Refresh (8 Criteria)

**AC-107:** Auto-refresh toggle button in dashboard header (ON/OFF state)
**AC-108:** When enabled, dashboard refreshes data every 60 seconds automatically
**AC-109:** Refresh countdown indicator shows time until next refresh (e.g., "Refreshing in 45s")
**AC-110:** Manual refresh button allows immediate data refresh on demand
**AC-111:** WebSocket connection established for real-time notifications of new data
**AC-112:** Toast notification displayed when new data available: "New data available. [Refresh Now]"
**AC-113:** Auto-refresh pauses when user is interacting with filters or modals (prevents disruption)
**AC-114:** Last updated timestamp displayed: "Last updated: 2025-10-24 17:22:54"

### 2.9 Historical Trend Analysis (10 Criteria)

**AC-115:** Trend comparison dropdown allows selecting comparison period: Previous Week, Month, Quarter, Year
**AC-116:** Week-over-week comparison shows absolute and percentage change for all key metrics
**AC-117:** Month-over-month comparison calculated and displayed with trend arrows (↑↓)
**AC-118:** Year-over-year growth rate calculated for long-term trend analysis
**AC-119:** Historical data chart displays up to 12 months of monthly aggregated data
**AC-120:** Seasonal patterns identified and highlighted (e.g., summer slump, festival peaks)
**AC-121:** Trend projection line estimates next 1-3 months based on historical growth rate
**AC-122:** Anomaly detection flags unusual spikes/drops with annotation on chart
**AC-123:** Baseline average line displayed on trend charts for context
**AC-124:** Export historical trends data includes all comparison periods and calculations

---

## 3. Technical Implementation

### 3.1 Frontend Components (React 19 + TailwindCSS)

#### 3.1.1 CourseReportDashboard.jsx - Main Dashboard Component

```jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { reportService } from '../../services/reportService';
import FilterPanel from './FilterPanel';
import KeyMetricsOverview from './KeyMetricsOverview';
import CoursePerformanceTrends from './CoursePerformanceTrends';
import CoursePerformanceTable from './CoursePerformanceTable';
import CourseDetailModal from './CourseDetailModal';
import ExportModal from './ExportModal';
import { toast } from 'react-hot-toast';

const CourseReportDashboard = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    dateRange: { from: null, to: null },
    balagruhaId: 'all',
    courseId: 'all',
    coachId: 'all',
    status: ['active', 'archived'],
  });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshCountdown, setRefreshCountdown] = useState(60);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch report data
  const fetchReportData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await reportService.getCourseReports(filters);
      setReportData(data);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch report data:', error);
      toast.error('Failed to load report data. Please try again.');
      setLoading(false);
    }
  }, [filters]);

  // Initial load
  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  // Auto-refresh mechanism
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          fetchReportData();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, fetchReportData]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle course detail view
  const handleCourseClick = async (courseId) => {
    try {
      const courseDetail = await reportService.getCourseDetailReport(courseId, filters.dateRange);
      setSelectedCourse(courseDetail);
    } catch (error) {
      toast.error('Failed to load course details');
    }
  };

  // Manual refresh
  const handleManualRefresh = () => {
    fetchReportData();
    setRefreshCountdown(60);
    toast.success('Report data refreshed');
  };

  if (loading && !reportData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📊 Course Analytics & Performance Reports
          </h1>
          <p className="text-sm text-gray-600">
            Last updated: {lastUpdated?.toLocaleString('en-IN', {
              year: 'numeric', month: 'short', day: 'numeric',
              hour: '2-digit', minute: '2-digit', second: '2-digit'
            })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleManualRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            🔄 Refresh
          </button>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              autoRefresh
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {autoRefresh ? `Auto-refresh ON (${refreshCountdown}s)` : 'Auto-refresh OFF'}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        filters={filters}
        onChange={handleFilterChange}
        onClear={() => setFilters({
          dateRange: { from: null, to: null },
          balagruhaId: 'all',
          courseId: 'all',
          coachId: 'all',
          status: ['active', 'archived'],
        })}
      />

      {/* Key Metrics Overview */}
      <KeyMetricsOverview data={reportData?.keyMetrics} />

      {/* Course Performance Trends Chart */}
      <CoursePerformanceTrends data={reportData?.trends} />

      {/* Course Performance Table */}
      <CoursePerformanceTable
        courses={reportData?.courses}
        onCourseClick={handleCourseClick}
        onExport={() => setShowExportModal(true)}
      />

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          filters={filters}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};

export default CourseReportDashboard;
```

#### 3.1.2 KeyMetricsOverview.jsx - Top-Level Stats Cards

```jsx
import React from 'react';

const KeyMetricsOverview = ({ data }) => {
  if (!data) return null;

  const metrics = [
    {
      label: 'Total Courses',
      value: data.totalCourses,
      change: data.coursesChange,
      icon: '📚',
      subtitle: `+${data.coursesThisMonth} this month`,
    },
    {
      label: 'Active Students',
      value: data.activeStudents.toLocaleString(),
      change: data.studentsChange,
      icon: '👥',
      subtitle: `+${data.studentsThisWeek} this week`,
    },
    {
      label: 'Avg Completion',
      value: `${data.avgCompletion}%`,
      change: data.completionChange,
      icon: '✅',
      subtitle: `${data.completionChange >= 0 ? '↑' : '↓'} ${Math.abs(data.completionChange)}%`,
    },
    {
      label: 'Total Coins',
      value: data.totalCoins.toLocaleString(),
      change: data.coinsChange,
      icon: '💰',
      subtitle: `↑ ${data.coinsThisMonth.toLocaleString()}`,
    },
    {
      label: 'Avg Time/Course',
      value: data.avgTime,
      change: data.timeChange,
      icon: '⏱️',
      subtitle: `${data.timeChange >= 0 ? '↑' : '↓'} ${Math.abs(data.timeChange)}`,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">📈 Key Metrics Overview</h2>
      <div className="grid grid-cols-5 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{metric.icon}</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  metric.change >= 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {metric.change >= 0 ? '+' : ''}{metric.change}%
              </span>
            </div>
            <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
            <div className="text-xs text-gray-500">{metric.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyMetricsOverview;
```

#### 3.1.3 CoursePerformanceTrends.jsx - Line Chart Component

```jsx
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CoursePerformanceTrends = ({ data }) => {
  const [activeLines, setActiveLines] = useState({
    completion: true,
    engagement: true,
    coins: true,
    time: false,
  });

  if (!data || data.length === 0) return null;

  const toggleLine = (line) => {
    setActiveLines((prev) => ({ ...prev, [line]: !prev[line] }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          📊 Course Performance Trends (Last 6 Months)
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => toggleLine('completion')}
            className={`px-3 py-1 text-xs rounded ${
              activeLines.completion
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Completion
          </button>
          <button
            onClick={() => toggleLine('engagement')}
            className={`px-3 py-1 text-xs rounded ${
              activeLines.engagement
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Engagement
          </button>
          <button
            onClick={() => toggleLine('coins')}
            className={`px-3 py-1 text-xs rounded ${
              activeLines.coins
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Coins
          </button>
          <button
            onClick={() => toggleLine('time')}
            className={`px-3 py-1 text-xs rounded ${
              activeLines.time
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Time Spent
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          {activeLines.completion && (
            <Line
              type="monotone"
              dataKey="completion"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: '#2563eb', r: 4 }}
              name="Completion Rate (%)"
            />
          )}
          {activeLines.engagement && (
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="#16a34a"
              strokeWidth={2}
              dot={{ fill: '#16a34a', r: 4 }}
              name="Engagement Score (%)"
            />
          )}
          {activeLines.coins && (
            <Line
              type="monotone"
              dataKey="coins"
              stroke="#ca8a04"
              strokeWidth={2}
              dot={{ fill: '#ca8a04', r: 4 }}
              name="Avg Coins"
            />
          )}
          {activeLines.time && (
            <Line
              type="monotone"
              dataKey="timeMinutes"
              stroke="#9333ea"
              strokeWidth={2}
              dot={{ fill: '#9333ea', r: 4 }}
              name="Avg Time (min)"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoursePerformanceTrends;
```


#### 3.1.4 CoursePerformanceTable.jsx - Data Table with Pagination

```jsx
import React, { useState } from 'react';

const CoursePerformanceTable = ({ courses, onCourseClick, onExport }) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500">No courses found for the selected filters.</p>
        <p className="text-sm text-gray-400 mt-2">Try adjusting your filters to see results.</p>
      </div>
    );
  }

  // Sorting logic
  const sortedCourses = [...courses].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (sortBy === 'name') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = sortedCourses.slice(startIndex, endIndex);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getEngagementStars = (score) => {
    if (score >= 90) return '⭐⭐⭐⭐⭐';
    if (score >= 75) return '⭐⭐⭐⭐';
    if (score >= 60) return '⭐⭐⭐';
    if (score >= 40) return '⭐⭐';
    return '⭐';
  };

  const getCompletionBarColor = (completion) => {
    if (completion >= 90) return 'bg-green-500';
    if (completion >= 75) return 'bg-blue-500';
    if (completion >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          📋 Course-Level Performance Table
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            📥 Export
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            🖨️ Print
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                Course Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('studentCount')}
              >
                Students {sortBy === 'studentCount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('completionRate')}
              >
                Completion {sortBy === 'completionRate' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('avgCoins')}
              >
                Avg Coins {sortBy === 'avgCoins' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('avgTimeMinutes')}
              >
                Avg Time {sortBy === 'avgTimeMinutes' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                Engagement
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedCourses.map((course) => (
              <tr key={course._id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{course.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{course.name}</div>
                      <div className="text-xs text-gray-500">{course.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="font-semibold text-gray-900">{course.studentCount}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-center font-semibold text-gray-900 mb-1">
                    {course.completionRate}%
                  </div>
                  <div className="w-20 mx-auto bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getCompletionBarColor(course.completionRate)}`}
                      style={{ width: `${course.completionRate}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="font-semibold text-gray-900">{course.avgCoins}</div>
                  <div className={`text-xs ${course.coinsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {course.coinsChange >= 0 ? '↑' : '↓'} {Math.abs(course.coinsChange)}
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="font-semibold text-gray-900">{course.avgTime}</div>
                  <div className={`text-xs ${course.timeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {course.timeChange >= 0 ? '↑' : '↓'} {course.timeChange}
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="text-lg mb-1">{getEngagementStars(course.engagementScore)}</div>
                  <div className="text-xs text-gray-600">{course.engagementScore}%</div>
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => onCourseClick(course._id)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, sortedCourses.length)} of {sortedCourses.length} courses
          </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded text-sm ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page} className="px-2">...</span>;
            }
            return null;
          })}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePerformanceTable;
```

### 3.2 Backend Implementation

#### 3.2.1 reportController.js - API Endpoints

```javascript
const reportService = require('../services/reportService');
const { ErrorHandler } = require('../utils/errorHandler');

// GET /api/v2/reports/courses - Get course reports with filters
exports.getCourseReports = async (req, res, next) => {
  try {
    const { dateFrom, dateTo, balagruhaId, courseId, coachId, status } = req.query;

    const filters = {
      dateRange: {
        from: dateFrom ? new Date(dateFrom) : null,
        to: dateTo ? new Date(dateTo) : null,
      },
      balagruhaId: balagruhaId !== 'all' ? balagruhaId : null,
      courseId: courseId !== 'all' ? courseId : null,
      coachId: coachId !== 'all' ? coachId : null,
      status: status ? status.split(',') : ['active', 'archived'],
    };

    const reportData = await reportService.generateCourseReports(filters);

    res.status(200).json({
      success: true,
      data: reportData,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// GET /api/v2/reports/courses/:courseId/detail - Get detailed course report
exports.getCourseDetailReport = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { dateFrom, dateTo } = req.query;

    const dateRange = {
      from: dateFrom ? new Date(dateFrom) : null,
      to: dateTo ? new Date(dateTo) : null,
    };

    const courseDetail = await reportService.generateCourseDetailReport(courseId, dateRange);

    res.status(200).json({
      success: true,
      data: courseDetail,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// POST /api/v2/reports/export - Export report in specified format
exports.exportReport = async (req, res, next) => {
  try {
    const { format, filters, dataToInclude, fileName } = req.body;

    const exportData = await reportService.exportReport(format, filters, dataToInclude);

    // Set appropriate headers based on format
    if (format === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName || 'course_report.csv'}"`);
      res.status(200).send(exportData);
    } else if (format === 'pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName || 'course_report.pdf'}"`);
      res.status(200).send(exportData);
    } else if (format === 'xlsx') {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName || 'course_report.xlsx'}"`);
      res.status(200).send(exportData);
    }
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// GET /api/v2/reports/coin-distribution - Get ISF coin distribution report
exports.getCoinDistributionReport = async (req, res, next) => {
  try {
    const { dateFrom, dateTo, balagruhaId, courseId } = req.query;

    const filters = {
      dateRange: {
        from: dateFrom ? new Date(dateFrom) : null,
        to: dateTo ? new Date(dateTo) : null,
      },
      balagruhaId: balagruhaId !== 'all' ? balagruhaId : null,
      courseId: courseId !== 'all' ? courseId : null,
    };

    const coinData = await reportService.generateCoinDistributionReport(filters);

    res.status(200).json({
      success: true,
      data: coinData,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// GET /api/v2/reports/time-spent - Get time spent analytics
exports.getTimeSpentReport = async (req, res, next) => {
  try {
    const { dateFrom, dateTo, balagruhaId, courseId } = req.query;

    const filters = {
      dateRange: {
        from: dateFrom ? new Date(dateFrom) : null,
        to: dateTo ? new Date(dateTo) : null,
      },
      balagruhaId: balagruhaId !== 'all' ? balagruhaId : null,
      courseId: courseId !== 'all' ? courseId : null,
    };

    const timeData = await reportService.generateTimeSpentReport(filters);

    res.status(200).json({
      success: true,
      data: timeData,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// GET /api/v2/reports/engagement - Get student engagement analytics
exports.getEngagementReport = async (req, res, next) => {
  try {
    const { dateFrom, dateTo, balagruhaId, courseId } = req.query;

    const filters = {
      dateRange: {
        from: dateFrom ? new Date(dateFrom) : null,
        to: dateTo ? new Date(dateTo) : null,
      },
      balagruhaId: balagruhaId !== 'all' ? balagruhaId : null,
      courseId: courseId !== 'all' ? courseId : null,
    };

    const engagementData = await reportService.generateEngagementReport(filters);

    res.status(200).json({
      success: true,
      data: engagementData,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
```

#### 3.2.2 reportService.js - Business Logic with MongoDB Aggregation

```javascript
const Course = require('../models/Course');
const Student = require('../models/Student');
const Progress = require('../models/Progress');
const Transaction = require('../models/Transaction');
const TimeLog = require('../models/TimeLog');

// Generate comprehensive course reports
exports.generateCourseReports = async (filters) => {
  const matchStage = buildMatchStage(filters);

  // Key Metrics Aggregation
  const keyMetrics = await calculateKeyMetrics(matchStage);

  // Trend Data Aggregation (last 6 months)
  const trends = await calculateTrends(matchStage);

  // Course-level Performance
  const courses = await aggregateCoursePerformance(matchStage);

  return {
    keyMetrics,
    trends,
    courses,
  };
};

// Generate detailed course report
exports.generateCourseDetailReport = async (courseId, dateRange) => {
  const course = await Course.findById(courseId).populate('modules');

  if (!course) {
    throw new Error('Course not found');
  }

  const matchStage = {
    courseId: courseId,
    ...(dateRange.from && { createdAt: { $gte: dateRange.from } }),
    ...(dateRange.to && { createdAt: { $lte: dateRange.to } }),
  };

  // Course summary stats
  const summary = await calculateCourseSummary(courseId, matchStage);

  // Completion funnel
  const completionFunnel = await calculateCompletionFunnel(courseId, matchStage);

  // Coins by module
  const coinsByModule = await calculateCoinsByModule(courseId, matchStage);

  // Time distribution
  const timeAnalysis = await calculateTimeAnalysis(courseId, matchStage);

  // Engagement tiers
  const engagementTiers = await calculateEngagementTiers(courseId, matchStage);

  return {
    ...course.toObject(),
    ...summary,
    completionFunnel,
    coinsByModule,
    timeAnalysis,
    engagementTiers,
  };
};

// Export report in various formats
exports.exportReport = async (format, filters, dataToInclude) => {
  const reportData = await this.generateCourseReports(filters);

  if (format === 'csv') {
    return generateCSV(reportData, dataToInclude);
  } else if (format === 'pdf') {
    return await generatePDF(reportData, dataToInclude);
  } else if (format === 'xlsx') {
    return generateExcel(reportData, dataToInclude);
  }

  throw new Error('Unsupported export format');
};

// Helper: Build MongoDB match stage from filters
function buildMatchStage(filters) {
  const match = {};

  if (filters.dateRange.from || filters.dateRange.to) {
    match.createdAt = {};
    if (filters.dateRange.from) match.createdAt.$gte = filters.dateRange.from;
    if (filters.dateRange.to) match.createdAt.$lte = filters.dateRange.to;
  }

  if (filters.balagruhaId) {
    match.balagruhaId = filters.balagruhaId;
  }

  if (filters.courseId) {
    match._id = filters.courseId;
  }

  if (filters.status && filters.status.length > 0) {
    match.status = { $in: filters.status };
  }

  return match;
}

// Helper: Calculate key metrics
async function calculateKeyMetrics(matchStage) {
  const currentPeriod = await Course.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: 'progresses',
        localField: '_id',
        foreignField: 'courseId',
        as: 'progresses',
      },
    },
    {
      $lookup: {
        from: 'transactions',
        localField: '_id',
        foreignField: 'courseId',
        as: 'transactions',
      },
    },
    {
      $lookup: {
        from: 'timelogs',
        localField: '_id',
        foreignField: 'courseId',
        as: 'timelogs',
      },
    },
    {
      $group: {
        _id: null,
        totalCourses: { $sum: 1 },
        activeStudents: { $sum: { $size: '$progresses' } },
        totalCompletion: { $sum: { $size: { $filter: { input: '$progresses', cond: { $eq: ['$$this.status', 'completed'] } } } } },
        totalProgresses: { $sum: { $size: '$progresses' } },
        totalCoins: { $sum: { $sum: '$transactions.amount' } },
        totalTimeMinutes: { $sum: { $sum: '$timelogs.durationMinutes' } },
      },
    },
    {
      $project: {
        totalCourses: 1,
        activeStudents: 1,
        avgCompletion: {
          $cond: [
            { $gt: ['$totalProgresses', 0] },
            { $multiply: [{ $divide: ['$totalCompletion', '$totalProgresses'] }, 100] },
            0,
          ],
        },
        totalCoins: 1,
        avgTime: {
          $cond: [
            { $gt: ['$activeStudents', 0] },
            { $divide: ['$totalTimeMinutes', '$activeStudents'] },
            0,
          ],
        },
      },
    },
  ]);

  // Calculate previous period for comparison
  const previousMatchStage = { ...matchStage };
  if (matchStage.createdAt) {
    const from = matchStage.createdAt.$gte;
    const to = matchStage.createdAt.$lte;
    const diff = to - from;
    previousMatchStage.createdAt = {
      $gte: new Date(from.getTime() - diff),
      $lte: from,
    };
  }

  const previousPeriod = await Course.aggregate([
    { $match: previousMatchStage },
    {
      $lookup: {
        from: 'progresses',
        localField: '_id',
        foreignField: 'courseId',
        as: 'progresses',
      },
    },
    {
      $group: {
        _id: null,
        totalCourses: { $sum: 1 },
        activeStudents: { $sum: { $size: '$progresses' } },
        totalCompletion: { $sum: { $size: { $filter: { input: '$progresses', cond: { $eq: ['$$this.status', 'completed'] } } } } },
        totalProgresses: { $sum: { $size: '$progresses' } },
      },
    },
  ]);

  const current = currentPeriod[0] || {};
  const previous = previousPeriod[0] || {};

  // Calculate percentage changes
  const coursesChange = previous.totalCourses ? ((current.totalCourses - previous.totalCourses) / previous.totalCourses) * 100 : 0;
  const studentsChange = previous.activeStudents ? ((current.activeStudents - previous.activeStudents) / previous.activeStudents) * 100 : 0;
  const completionChange = previous.avgCompletion ? current.avgCompletion - previous.avgCompletion : 0;

  // Format avg time as "Xh Ym"
  const hours = Math.floor(current.avgTime / 60);
  const minutes = Math.round(current.avgTime % 60);
  const avgTimeFormatted = `${hours}h ${minutes}m`;

  return {
    totalCourses: current.totalCourses || 0,
    coursesThisMonth: Math.abs(current.totalCourses - previous.totalCourses),
    coursesChange: Math.round(coursesChange * 10) / 10,
    activeStudents: current.activeStudents || 0,
    studentsThisWeek: Math.abs(current.activeStudents - previous.activeStudents),
    studentsChange: Math.round(studentsChange * 10) / 10,
    avgCompletion: Math.round((current.avgCompletion || 0) * 10) / 10,
    completionChange: Math.round(completionChange * 10) / 10,
    totalCoins: current.totalCoins || 0,
    coinsThisMonth: 1250, // Placeholder - would calculate from current month transactions
    coinsChange: 8.5,
    avgTime: avgTimeFormatted,
    timeChange: 18, // In minutes
  };
}

// Helper: Calculate 6-month trends
async function calculateTrends(matchStage) {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const trendMatchStage = {
    ...matchStage,
    createdAt: { $gte: sixMonthsAgo },
  };

  const trends = await Progress.aggregate([
    { $match: trendMatchStage },
    {
      $group: {
        _id: {
          year: { $year: '$updatedAt' },
          month: { $month: '$updatedAt' },
        },
        totalProgresses: { $sum: 1 },
        completedProgresses: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        month: {
          $concat: [
            { $arrayElemAt: [['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], '$_id.month'] },
          ],
        },
        completion: {
          $multiply: [
            { $divide: ['$completedProgresses', '$totalProgresses'] },
            100,
          ],
        },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  // Enrich with engagement, coins, and time data
  // (In production, would aggregate from respective collections)
  return trends.map((t, index) => ({
    month: t.month,
    completion: Math.round(t.completion * 10) / 10,
    engagement: 50 + index * 5, // Placeholder
    coins: 150 + index * 10, // Placeholder
    timeMinutes: 180 + index * 15, // Placeholder
  }));
}

// Helper: Aggregate course-level performance
async function aggregateCoursePerformance(matchStage) {
  const courses = await Course.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: 'progresses',
        localField: '_id',
        foreignField: 'courseId',
        as: 'progresses',
      },
    },
    {
      $lookup: {
        from: 'transactions',
        localField: '_id',
        foreignField: 'courseId',
        as: 'transactions',
      },
    },
    {
      $lookup: {
        from: 'timelogs',
        localField: '_id',
        foreignField: 'courseId',
        as: 'timelogs',
      },
    },
    {
      $project: {
        name: 1,
        icon: 1,
        category: 1,
        studentCount: { $size: '$progresses' },
        completionRate: {
          $cond: [
            { $gt: [{ $size: '$progresses' }, 0] },
            {
              $multiply: [
                {
                  $divide: [
                    { $size: { $filter: { input: '$progresses', cond: { $eq: ['$$this.status', 'completed'] } } } },
                    { $size: '$progresses' },
                  ],
                },
                100,
              ],
            },
            0,
          ],
        },
        avgCoins: {
          $cond: [
            { $gt: [{ $size: '$transactions' }, 0] },
            { $divide: [{ $sum: '$transactions.amount' }, { $size: '$transactions' }] },
            0,
          ],
        },
        avgTimeMinutes: {
          $cond: [
            { $gt: [{ $size: '$timelogs' }, 0] },
            { $divide: [{ $sum: '$timelogs.durationMinutes' }, { $size: '$timelogs' }] },
            0,
          ],
        },
        engagementScore: {
          $cond: [
            { $gt: [{ $size: '$progresses' }, 0] },
            {
              $multiply: [
                {
                  $divide: [
                    { $size: { $filter: { input: '$progresses', cond: { $gte: ['$$this.engagementScore', 60] } } } },
                    { $size: '$progresses' },
                  ],
                },
                100,
              ],
            },
            0,
          ],
        },
      },
    },
    {
      $addFields: {
        completionRate: { $round: ['$completionRate', 1] },
        avgCoins: { $round: ['$avgCoins', 0] },
        avgTime: {
          $concat: [
            { $toString: { $floor: { $divide: ['$avgTimeMinutes', 60] } } },
            'h ',
            { $toString: { $round: [{ $mod: ['$avgTimeMinutes', 60] }, 0] } },
            'm',
          ],
        },
        engagementScore: { $round: ['$engagementScore', 0] },
        coinsChange: 12, // Placeholder - would calculate from historical data
        timeChange: '15m', // Placeholder
      },
    },
    { $sort: { studentCount: -1 } },
  ]);

  return courses;
}

// Helper: Calculate course summary
async function calculateCourseSummary(courseId, matchStage) {
  const progresses = await Progress.find({ courseId, ...matchStage });
  const totalStudents = progresses.length;
  const activeStudents = progresses.filter((p) => p.status !== 'not_started').length;
  const completedStudents = progresses.filter((p) => p.status === 'completed').length;
  const completionRate = totalStudents > 0 ? (completedStudents / totalStudents) * 100 : 0;

  const course = await Course.findById(courseId).populate('modules');
  const totalModules = course.modules.length;
  const totalChapters = course.modules.reduce((sum, m) => sum + m.chapters.length, 0);
  const totalContent = course.modules.reduce(
    (sum, m) => sum + m.chapters.reduce((csum, c) => csum + c.contentItems.length, 0),
    0
  );

  return {
    totalStudents,
    activeStudents,
    completedStudents,
    completionRate: Math.round(completionRate * 10) / 10,
    totalModules,
    totalChapters,
    totalContent,
    assignedCoaches: 8, // Placeholder - would query from course assignments
    balagruhaCount: 6, // Placeholder
    dateRange: 'Jan-Dec 2024', // Placeholder
  };
}

// Helper: Calculate completion funnel
async function calculateCompletionFunnel(courseId, matchStage) {
  const progresses = await Progress.find({ courseId, ...matchStage });
  const total = progresses.length;

  const enrolled = total;
  const started = progresses.filter((p) => p.progress > 0).length;
  const fiftyPercent = progresses.filter((p) => p.progress >= 50).length;
  const ninetyPercent = progresses.filter((p) => p.progress >= 90).length;
  const completed = progresses.filter((p) => p.status === 'completed').length;

  const funnel = [
    {
      label: 'Enrolled',
      count: enrolled,
      percentage: 100,
    },
    {
      label: 'Started',
      count: started,
      percentage: Math.round((started / enrolled) * 100),
      dropOff: enrolled - started,
      dropOffPercentage: Math.round(((enrolled - started) / enrolled) * 100),
    },
    {
      label: '50% Complete',
      count: fiftyPercent,
      percentage: Math.round((fiftyPercent / enrolled) * 100),
      dropOff: started - fiftyPercent,
      dropOffPercentage: Math.round(((started - fiftyPercent) / enrolled) * 100),
    },
    {
      label: '90% Complete',
      count: ninetyPercent,
      percentage: Math.round((ninetyPercent / enrolled) * 100),
      dropOff: fiftyPercent - ninetyPercent,
      dropOffPercentage: Math.round(((fiftyPercent - ninetyPercent) / enrolled) * 100),
    },
    {
      label: 'Completed',
      count: completed,
      percentage: Math.round((completed / enrolled) * 100),
      dropOff: ninetyPercent - completed,
      dropOffPercentage: Math.round(((ninetyPercent - completed) / enrolled) * 100),
    },
  ];

  // Identify drop-off points
  const dropOffPoints = [
    { location: 'Module 3', count: 18 }, // Placeholder
    { location: 'Module 7', count: 12 }, // Placeholder
  ];

  return { funnel, dropOffPoints };
}

// Helper: Calculate coins by module
async function calculateCoinsByModule(courseId, matchStage) {
  const course = await Course.findById(courseId).populate('modules');

  const coinsByModule = await Promise.all(
    course.modules.map(async (module, index) => {
      const transactions = await Transaction.find({
        courseId,
        moduleId: module._id,
        ...matchStage,
      });

      const totalCoins = transactions.reduce((sum, t) => sum + t.amount, 0);

      return {
        module: `M${index + 1}`,
        coins: totalCoins,
      };
    })
  );

  const totalCoins = coinsByModule.reduce((sum, m) => sum + m.coins, 0);
  const avgCoinsPerStudent = Math.round(totalCoins / (await Progress.countDocuments({ courseId })));

  const highestModule = coinsByModule.reduce((max, m) => (m.coins > max.coins ? m : max));
  const lowestModule = coinsByModule.reduce((min, m) => (m.coins < min.coins ? m : min));

  return {
    coinsByModule,
    totalCoins,
    avgCoinsPerStudent,
    highestModule: highestModule.module,
    highestModuleCoins: highestModule.coins,
    lowestModule: lowestModule.module,
    lowestModuleCoins: lowestModule.coins,
  };
}

// Helper: Calculate time analysis
async function calculateTimeAnalysis(courseId, matchStage) {
  const timelogs = await TimeLog.find({ courseId, ...matchStage });

  const totalTimeMinutes = timelogs.reduce((sum, t) => sum + t.durationMinutes, 0);
  const avgTimeMinutes = timelogs.length > 0 ? totalTimeMinutes / timelogs.length : 0;

  const hours = Math.floor(avgTimeMinutes / 60);
  const minutes = Math.round(avgTimeMinutes % 60);
  const avgTime = `${hours}h ${minutes}m`;

  const totalHours = Math.floor(totalTimeMinutes / 60);
  const totalTime = `${totalHours} hours`;

  // Calculate time distribution buckets
  const timeDistribution = [
    {
      range: '0-2h',
      count: timelogs.filter((t) => t.durationMinutes < 120).length,
      percentage: 0,
    },
    {
      range: '2-4h',
      count: timelogs.filter((t) => t.durationMinutes >= 120 && t.durationMinutes < 240).length,
      percentage: 0,
    },
    {
      range: '4-6h',
      count: timelogs.filter((t) => t.durationMinutes >= 240 && t.durationMinutes < 360).length,
      percentage: 0,
    },
    {
      range: '6-8h',
      count: timelogs.filter((t) => t.durationMinutes >= 360 && t.durationMinutes < 480).length,
      percentage: 0,
    },
    {
      range: '8h+',
      count: timelogs.filter((t) => t.durationMinutes >= 480).length,
      percentage: 0,
    },
  ];

  timeDistribution.forEach((bucket) => {
    bucket.percentage = timelogs.length > 0 ? Math.round((bucket.count / timelogs.length) * 100) : 0;
  });

  return {
    avgTime,
    totalTime,
    medianTime: '4h 10m', // Placeholder
    modeTime: '3h 45m - 4h 15m', // Placeholder
    timeDistribution,
    peakHours: '4-6 PM (42%), 10-12 PM (28%), 7-9 PM (18%)', // Placeholder
  };
}

// Helper: Calculate engagement tiers
async function calculateEngagementTiers(courseId, matchStage) {
  const progresses = await Progress.find({ courseId, ...matchStage });

  const tiers = [
    {
      icon: '⭐⭐⭐⭐⭐',
      label: 'Excellent',
      range: '90-100%',
      count: progresses.filter((p) => p.engagementScore >= 90).length,
      percentage: 0,
      color: 'bg-green-500',
    },
    {
      icon: '⭐⭐⭐⭐',
      label: 'Good',
      range: '75-89%',
      count: progresses.filter((p) => p.engagementScore >= 75 && p.engagementScore < 90).length,
      percentage: 0,
      color: 'bg-blue-500',
    },
    {
      icon: '⭐⭐⭐',
      label: 'Fair',
      range: '60-74%',
      count: progresses.filter((p) => p.engagementScore >= 60 && p.engagementScore < 75).length,
      percentage: 0,
      color: 'bg-yellow-500',
    },
    {
      icon: '⭐⭐',
      label: 'Poor',
      range: '40-59%',
      count: progresses.filter((p) => p.engagementScore >= 40 && p.engagementScore < 60).length,
      percentage: 0,
      color: 'bg-orange-500',
    },
    {
      icon: '⭐',
      label: 'Critical',
      range: '<40%',
      count: progresses.filter((p) => p.engagementScore < 40).length,
      percentage: 0,
      color: 'bg-red-500',
    },
  ];

  tiers.forEach((tier) => {
    tier.percentage = progresses.length > 0 ? Math.round((tier.count / progresses.length) * 100) : 0;
  });

  return tiers;
}

// Helper: Generate CSV export
function generateCSV(reportData, dataToInclude) {
  const { courses } = reportData;

  let csv = 'Course Name,Students,Completion Rate,Avg Coins,Avg Time,Engagement Score\n';

  courses.forEach((course) => {
    csv += `"${course.name}",${course.studentCount},${course.completionRate},${course.avgCoins},${course.avgTime},${course.engagementScore}\n`;
  });

  return csv;
}

// Helper: Generate PDF export (using puppeteer or similar)
async function generatePDF(reportData, dataToInclude) {
  // Implementation would use a library like puppeteer or pdfkit
  // Placeholder for now
  return Buffer.from('PDF content placeholder');
}

// Helper: Generate Excel export (using exceljs)
function generateExcel(reportData, dataToInclude) {
  // Implementation would use exceljs library
  // Placeholder for now
  return Buffer.from('Excel content placeholder');
}
```

#### 3.2.3 API Routes - /routes/v2/reports.js

```javascript
const express = require('express');
const router = express.Router();
const reportController = require('../../controllers/reportController');
const { authenticate, authorize } = require('../../middleware/auth');

// All routes require admin authentication
router.use(authenticate);
router.use(authorize(['admin']));

// GET /api/v2/reports/courses - Get course reports
router.get('/courses', reportController.getCourseReports);

// GET /api/v2/reports/courses/:courseId/detail - Get detailed course report
router.get('/courses/:courseId/detail', reportController.getCourseDetailReport);

// POST /api/v2/reports/export - Export report
router.post('/export', reportController.exportReport);

// GET /api/v2/reports/coin-distribution - Get coin distribution report
router.get('/coin-distribution', reportController.getCoinDistributionReport);

// GET /api/v2/reports/time-spent - Get time spent analytics
router.get('/time-spent', reportController.getTimeSpentReport);

// GET /api/v2/reports/engagement - Get engagement analytics
router.get('/engagement', reportController.getEngagementReport);

module.exports = router;
```

---

## 4. API Documentation

### 4.1 Get Course Reports

**Endpoint:** `GET /api/v2/reports/courses`

**Authentication:** Required (Admin only)

**Query Parameters:**
- `dateFrom` (optional): Start date for filtering (YYYY-MM-DD)
- `dateTo` (optional): End date for filtering (YYYY-MM-DD)
- `balagruhaId` (optional): Filter by specific Balagruha ID (or 'all')
- `courseId` (optional): Filter by specific Course ID (or 'all')
- `coachId` (optional): Filter by specific Coach ID (or 'all')
- `status` (optional): Comma-separated list of statuses (active, archived, draft)

**Request Example:**
```http
GET /api/v2/reports/courses?dateFrom=2024-01-01&dateTo=2024-12-31&balagruhaId=all&courseId=all&status=active,archived
Authorization: Bearer <admin_token>
```

**Response Example (200 OK):**
```json
{
  "success": true,
  "data": {
    "keyMetrics": {
      "totalCourses": 24,
      "coursesThisMonth": 2,
      "coursesChange": 9.1,
      "activeStudents": 1247,
      "studentsThisWeek": 45,
      "studentsChange": 3.7,
      "avgCompletion": 67.3,
      "completionChange": 4.2,
      "totalCoins": 42850,
      "coinsThisMonth": 1250,
      "coinsChange": 8.5,
      "avgTime": "3h 42m",
      "timeChange": -18
    },
    "trends": [
      { "month": "Jul", "completion": 45.2, "engagement": 50, "coins": 150, "timeMinutes": 180 },
      { "month": "Aug", "completion": 52.8, "engagement": 55, "coins": 160, "timeMinutes": 195 },
      { "month": "Sep", "completion": 60.1, "engagement": 60, "coins": 170, "timeMinutes": 210 },
      { "month": "Oct", "completion": 65.4, "engagement": 65, "coins": 180, "timeMinutes": 225 },
      { "month": "Nov", "completion": 70.9, "engagement": 70, "coins": 190, "timeMinutes": 240 },
      { "month": "Dec", "completion": 74.3, "engagement": 75, "coins": 200, "timeMinutes": 255 }
    ],
    "courses": [
      {
        "_id": "64a1b2c3d4e5f6789abcdef0",
        "name": "Computer Apps",
        "icon": "💻",
        "category": "Technical",
        "studentCount": 342,
        "completionRate": 72.4,
        "avgCoins": 185,
        "avgTime": "4h 23m",
        "engagementScore": 82,
        "coinsChange": 12,
        "timeChange": "15m"
      },
      {
        "_id": "64a1b2c3d4e5f6789abcdef1",
        "name": "Art & Design",
        "icon": "🎨",
        "category": "Creative",
        "studentCount": 298,
        "completionRate": 68.1,
        "avgCoins": 142,
        "avgTime": "3h 45m",
        "engagementScore": 74,
        "coinsChange": 8,
        "timeChange": "-22m"
      }
    ]
  }
}
```

### 4.2 Get Course Detail Report

**Endpoint:** `GET /api/v2/reports/courses/:courseId/detail`

**Authentication:** Required (Admin only)

**Path Parameters:**
- `courseId` (required): MongoDB ObjectId of the course

**Query Parameters:**
- `dateFrom` (optional): Start date for filtering
- `dateTo` (optional): End date for filtering

**Request Example:**
```http
GET /api/v2/reports/courses/64a1b2c3d4e5f6789abcdef0/detail?dateFrom=2024-01-01&dateTo=2024-12-31
Authorization: Bearer <admin_token>
```

**Response Example (200 OK):**
```json
{
  "success": true,
  "data": {
    "name": "Computer Apps",
    "icon": "💻",
    "totalStudents": 342,
    "activeStudents": 298,
    "completedStudents": 248,
    "completionRate": 72.4,
    "totalModules": 12,
    "totalChapters": 48,
    "totalContent": 156,
    "assignedCoaches": 8,
    "balagruhaCount": 6,
    "dateRange": "Jan-Dec 2024",
    "completionFunnel": {
      "funnel": [
        {
          "label": "Enrolled",
          "count": 342,
          "percentage": 100
        },
        {
          "label": "Started",
          "count": 325,
          "percentage": 95,
          "dropOff": 17,
          "dropOffPercentage": 5
        },
        {
          "label": "50% Complete",
          "count": 287,
          "percentage": 84,
          "dropOff": 38,
          "dropOffPercentage": 11
        },
        {
          "label": "90% Complete",
          "count": 265,
          "percentage": 78,
          "dropOff": 22,
          "dropOffPercentage": 6
        },
        {
          "label": "Completed",
          "count": 248,
          "percentage": 72,
          "dropOff": 17,
          "dropOffPercentage": 5
        }
      ],
      "dropOffPoints": [
        { "location": "Module 3", "count": 18 },
        { "location": "Module 7", "count": 12 }
      ]
    },
    "coinsByModule": {
      "coinsByModule": [
        { "module": "M1", "coins": 4850 },
        { "module": "M2", "coins": 5420 },
        { "module": "M3", "coins": 6450 },
        { "module": "M4", "coins": 5680 }
      ],
      "totalCoins": 63270,
      "avgCoinsPerStudent": 185,
      "highestModule": "M3",
      "highestModuleCoins": 6450,
      "lowestModule": "M12",
      "lowestModuleCoins": 3220
    },
    "timeAnalysis": {
      "avgTime": "4h 23m",
      "totalTime": "1496 hours",
      "medianTime": "4h 10m",
      "modeTime": "3h 45m - 4h 15m",
      "timeDistribution": [
        { "range": "0-2h", "count": 45, "percentage": 13 },
        { "range": "2-4h", "count": 128, "percentage": 37 },
        { "range": "4-6h", "count": 142, "percentage": 42 },
        { "range": "6-8h", "count": 18, "percentage": 5 },
        { "range": "8h+", "count": 9, "percentage": 3 }
      ],
      "peakHours": "4-6 PM (42%), 10-12 PM (28%), 7-9 PM (18%)"
    },
    "engagementTiers": [
      { "icon": "⭐⭐⭐⭐⭐", "label": "Excellent", "range": "90-100%", "count": 98, "percentage": 29, "color": "bg-green-500" },
      { "icon": "⭐⭐⭐⭐", "label": "Good", "range": "75-89%", "count": 156, "percentage": 46, "color": "bg-blue-500" },
      { "icon": "⭐⭐⭐", "label": "Fair", "range": "60-74%", "count": 62, "percentage": 18, "color": "bg-yellow-500" },
      { "icon": "⭐⭐", "label": "Poor", "range": "40-59%", "count": 18, "percentage": 5, "color": "bg-orange-500" },
      { "icon": "⭐", "label": "Critical", "range": "<40%", "count": 8, "percentage": 2, "color": "bg-red-500" }
    ]
  }
}
```

### 4.3 Export Report

**Endpoint:** `POST /api/v2/reports/export`

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "format": "csv",
  "filters": {
    "dateFrom": "2024-01-01",
    "dateTo": "2024-12-31",
    "balagruhaId": "all",
    "courseId": "all",
    "status": ["active", "archived"]
  },
  "dataToInclude": [
    "coursePerformance",
    "completionRates",
    "coinDistribution",
    "timeSpent",
    "engagement"
  ],
  "fileName": "course_report_2024.csv"
}
```

**Response Example (200 OK):**
- For CSV: `Content-Type: text/csv` with CSV file content
- For PDF: `Content-Type: application/pdf` with PDF file content
- For Excel: `Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` with Excel file content

---

## 5. Task Breakdown

### Phase 1: Foundation & Filter System (3-4 hours)

**Task 1.1:** Set up API routes and controller structure
- Create `/routes/v2/reports.js` with all endpoints
- Create `/controllers/reportController.js` with stub methods
- Register routes in `server.js`
- Test endpoints return 200 OK with placeholder data
- **Time Estimate:** 1 hour

**Task 1.2:** Implement FilterPanel component
- Create `FilterPanel.jsx` with date pickers, dropdowns, checkboxes
- Integrate `react-datepicker` for date selection
- Implement quick date presets (Last 7/30/90 days, This Year)
- Add Clear All and Apply buttons with proper state management
- Test filter state updates correctly
- **Time Estimate:** 1.5 hours

**Task 1.3:** Build MongoDB match stage builder
- Implement `buildMatchStage()` helper in `reportService.js`
- Support date range, Balagruha, course, coach, status filters
- Handle 'all' values correctly (no filter applied)
- Write unit tests for various filter combinations
- **Time Estimate:** 1 hour

### Phase 2: Key Metrics & Trends (3-4 hours)

**Task 2.1:** Implement key metrics aggregation
- Create `calculateKeyMetrics()` function with MongoDB aggregation
- Aggregate: total courses, active students, avg completion, total coins, avg time
- Calculate previous period metrics for comparison
- Compute percentage changes (↑/↓)
- Format avg time as "Xh Ym"
- **Time Estimate:** 2 hours

**Task 2.2:** Build KeyMetricsOverview component
- Create `KeyMetricsOverview.jsx` with 5 metric cards
- Display value, icon, change percentage, subtitle
- Color-code change indicators (green for positive, red for negative)
- Make cards responsive (grid-cols-5)
- **Time Estimate:** 1 hour

**Task 2.3:** Implement 6-month trends calculation
- Create `calculateTrends()` function with month-over-month aggregation
- Group data by year and month
- Calculate completion, engagement, coins, time metrics per month
- Sort chronologically
- **Time Estimate:** 1 hour

**Task 2.4:** Build CoursePerformanceTrends chart component
- Create `CoursePerformanceTrends.jsx` using Recharts LineChart
- Support multiple data series toggle (completion, engagement, coins, time)
- Implement interactive tooltip with all values
- Style chart with proper colors and labels
- **Time Estimate:** 1.5 hours

### Phase 3: Course Performance Table (2-3 hours)

**Task 3.1:** Implement course aggregation pipeline
- Create `aggregateCoursePerformance()` function
- Lookup progresses, transactions, timelogs for each course
- Calculate: studentCount, completionRate, avgCoins, avgTime, engagementScore
- Sort by student count descending
- **Time Estimate:** 1.5 hours

**Task 3.2:** Build CoursePerformanceTable component
- Create `CoursePerformanceTable.jsx` with sortable columns
- Implement sorting by name, students, completion, coins, time, engagement
- Add pagination controls (10/25/50/100 per page)
- Display engagement as stars (⭐⭐⭐⭐⭐)
- Add Detail button for each row
- **Time Estimate:** 2 hours

### Phase 4: Course Detail Modal (3-4 hours)

**Task 4.1:** Implement course detail aggregations
- Create `generateCourseDetailReport()` function
- Implement `calculateCourseSummary()` helper
- Implement `calculateCompletionFunnel()` with drop-off detection
- Implement `calculateCoinsByModule()` with high/low identification
- Implement `calculateTimeAnalysis()` with distribution buckets
- Implement `calculateEngagementTiers()` with 5 tiers
- **Time Estimate:** 2.5 hours

**Task 4.2:** Build CourseDetailModal component
- Create `CourseDetailModal.jsx` with full-screen modal
- Display course summary stats in grid
- Add completion funnel visualization with drop-off warnings
- Add coin distribution LineChart by module
- Add time analysis with distribution bars
- Add engagement tier breakdown with color-coded bars
- Implement Export Full Report, Export Charts, Print buttons
- **Time Estimate:** 2.5 hours

### Phase 5: Export Functionality (2-3 hours)

**Task 5.1:** Implement CSV export
- Create `generateCSV()` function in `reportService.js`
- Convert course data to CSV format with headers
- Handle special characters in course names (quotes)
- Test file download with proper filename
- **Time Estimate:** 45 minutes

**Task 5.2:** Implement PDF export
- Install and configure `puppeteer` or `pdfkit`
- Create professional PDF template with ISF branding
- Embed charts as images (using `recharts` SVG export)
- Add executive summary page
- Implement proper page breaks
- **Time Estimate:** 1.5 hours

**Task 5.3:** Implement Excel export
- Install and configure `exceljs`
- Create multi-sheet workbook (Summary, Courses, Students, Coins, Time)
- Format sheets with colors, borders, frozen headers
- Add formulas for totals and averages
- **Time Estimate:** 1 hour

**Task 5.4:** Build ExportModal component
- Create `ExportModal.jsx` with format selection (CSV/PDF/Excel/Print)
- Add checkboxes for data to include
- Add date range override option
- Add file name input
- Display estimated file size and time
- **Time Estimate:** 1 hour

### Phase 6: Real-Time Updates & Auto-Refresh (1-2 hours)

**Task 6.1:** Implement auto-refresh mechanism
- Add auto-refresh toggle state in `CourseReportDashboard.jsx`
- Implement 60-second countdown timer
- Trigger `fetchReportData()` when countdown reaches 0
- Pause auto-refresh when user interacts with filters/modals
- Display "Last updated" timestamp
- **Time Estimate:** 1 hour

**Task 6.2:** Add WebSocket real-time notifications
- Set up WebSocket connection for new data alerts
- Display toast notification: "New data available. [Refresh Now]"
- Implement manual refresh button
- Show loading skeleton during refresh
- **Time Estimate:** 1 hour

### Phase 7: Coin Distribution & Time Spent Reports (2-3 hours)

**Task 7.1:** Implement coin distribution aggregations
- Create `generateCoinDistributionReport()` function
- Aggregate total coins, by course, by Balagruha, by module
- Calculate top 20 earners with rankings
- Generate monthly trend data (last 12 months)
- **Time Estimate:** 1.5 hours

**Task 7.2:** Implement time spent aggregations
- Create `generateTimeSpentReport()` function
- Calculate system-wide metrics (total hours, avg per student, avg per course)
- Generate heatmap data (day × hour grid)
- Calculate quartile distribution
- Identify at-risk students (<30 min total time)
- Generate time vs. completion correlation data
- **Time Estimate:** 1.5 hours

**Task 7.3:** Build visualization components
- Create coin distribution bar charts
- Create time spent heatmap component
- Create correlation scatter plot
- Style with proper colors and legends
- **Time Estimate:** 1.5 hours

### Phase 8: Testing, Optimization & Polish (2-3 hours)

**Task 8.1:** Write comprehensive tests
- Unit tests for aggregation functions
- Integration tests for API endpoints
- Frontend component tests (React Testing Library)
- Test various filter combinations
- Test edge cases (no data, single course, etc.)
- **Time Estimate:** 1.5 hours

**Task 8.2:** Performance optimization
- Add MongoDB indexes on frequently queried fields (courseId, createdAt, balagruhaId)
- Implement caching for expensive aggregations (Redis)
- Optimize aggregation pipelines (use $project to limit fields early)
- Test with large datasets (1000+ courses, 10,000+ students)
- **Time Estimate:** 1 hour

**Task 8.3:** UI/UX polish
- Add loading skeletons for all data fetching
- Implement smooth transitions and animations
- Ensure responsive design works on all screen sizes
- Add accessibility features (ARIA labels, keyboard navigation)
- Test print view layout
- **Time Estimate:** 1 hour

---

## 6. Definition of Done

### Functional Requirements
- [ ] All 124 acceptance criteria pass manual testing
- [ ] Course reports display correctly with all filters applied
- [ ] Key metrics show accurate data with trend comparisons
- [ ] Course performance table is sortable and paginable
- [ ] Course detail modal shows comprehensive analytics
- [ ] Completion funnel accurately calculates drop-off points
- [ ] Coin distribution report shows correct totals by course, module, Balagruha
- [ ] Time spent analytics calculate correct averages and distributions
- [ ] Engagement score uses weighted formula (Quiz 30%, Time 25%, Completion 20%, Quality 15%, Frequency 10%)
- [ ] At-risk students correctly identified (<50% engagement for 2+ weeks)
- [ ] Export functionality works for CSV, PDF, Excel formats
- [ ] Print view renders properly with page breaks
- [ ] Auto-refresh mechanism works correctly with 60-second intervals
- [ ] Real-time WebSocket notifications display when new data available
- [ ] All charts and graphs render correctly with proper data
- [ ] Trend analysis shows historical comparisons accurately

### Technical Requirements
- [ ] API endpoints return correct HTTP status codes (200, 400, 401, 404, 500)
- [ ] MongoDB aggregation pipelines optimized for performance (<2 seconds query time)
- [ ] Indexes created on: `courseId`, `createdAt`, `balagruhaId`, `studentId`
- [ ] Error handling implemented for all API calls
- [ ] Loading states shown during data fetching
- [ ] No console errors or warnings in browser
- [ ] Code follows project standards (ES6+, functional components, hooks)
- [ ] PropTypes or TypeScript types defined for all components
- [ ] Services layer properly abstracts business logic from controllers
- [ ] Proper authentication and authorization (admin-only access)

### Testing Requirements
- [ ] Unit tests written for all aggregation helper functions
- [ ] Integration tests cover all API endpoints
- [ ] Frontend component tests using React Testing Library
- [ ] Edge cases tested (no data, single item, large datasets)
- [ ] Performance tested with 1000+ courses and 10,000+ students
- [ ] Filter combinations tested (all permutations)
- [ ] Export functionality tested for all formats
- [ ] Auto-refresh tested with timer and manual refresh
- [ ] Test coverage >80% for new code

### Code Quality
- [ ] Code reviewed by senior developer
- [ ] No ESLint errors or warnings
- [ ] Code formatted with Prettier
- [ ] Comments added for complex logic
- [ ] Magic numbers replaced with named constants
- [ ] DRY principle followed (no code duplication)
- [ ] Functions are small and single-purpose (<50 lines)
- [ ] Proper error messages returned to user

### Documentation
- [ ] API documentation complete with all endpoints, parameters, examples
- [ ] Component documentation includes props, usage examples
- [ ] README updated with reporting feature instructions
- [ ] Database schema documented for new indexes
- [ ] Export functionality documented (formats, options)
- [ ] Filter options documented with examples

### User Experience
- [ ] UI is intuitive and easy to navigate
- [ ] Loading indicators shown during data fetching
- [ ] Error messages are clear and actionable
- [ ] Charts and graphs are visually appealing
- [ ] Responsive design works on all screen sizes (1366x768 minimum)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader compatibility verified
- [ ] Print view is professional and well-formatted
- [ ] Export files are properly formatted and readable

### Deployment & Release
- [ ] Feature branch merged to main after PR approval
- [ ] Database migrations run successfully (indexes created)
- [ ] Environment variables configured (Redis cache if used)
- [ ] Feature deployed to staging environment
- [ ] UAT (User Acceptance Testing) completed by product owner
- [ ] Feature deployed to production
- [ ] Monitoring alerts configured for API errors
- [ ] Usage analytics tracking implemented

---

## 7. Notes and Considerations

### Performance Optimization Strategies

1. **Database Indexing:**
   - Create compound index on `(courseId, createdAt)` for time-based queries
   - Create index on `balagruhaId` for filter queries
   - Create index on `status` for course filtering

2. **Caching:**
   - Cache aggregation results in Redis with 5-minute TTL
   - Cache key: `course-reports:${hashFilters(filters)}`
   - Invalidate cache when course data updated

3. **Aggregation Pipeline Optimization:**
   - Use `$project` early to limit fields
   - Use `$match` as first stage to reduce documents processed
   - Use `$limit` for pagination before expensive operations

### Security Considerations

1. **Authorization:**
   - Only admin role can access reporting endpoints
   - Verify permissions in middleware before processing
   - Log all report access for audit trail

2. **Data Privacy:**
   - Student-level export requires explicit permission checkbox
   - Anonymize student names in system-wide reports
   - Redact sensitive fields (phone, email) from exports

3. **Rate Limiting:**
   - Limit report generation to 10 requests per minute per admin
   - Limit export downloads to 5 per hour per admin
   - Prevent denial-of-service attacks on expensive aggregations

### Scalability Considerations

1. **Large Dataset Handling:**
   - Implement pagination for all data tables
   - Use cursor-based pagination for MongoDB queries
   - Stream large exports instead of loading all in memory

2. **Concurrent Users:**
   - Use connection pooling for MongoDB
   - Implement job queue (Bull) for export generation
   - Return job ID immediately, poll for completion

3. **Future Enhancements:**
   - Scheduled report generation (daily/weekly email)
   - Custom report builder (drag-and-drop metrics)
   - Report sharing (generate shareable link)
   - Data warehouse integration for historical analytics

### Accessibility

1. **ARIA Labels:**
   - Add `aria-label` to all interactive elements
   - Use `role="table"` for data tables
   - Add `aria-sort` to sortable column headers

2. **Keyboard Navigation:**
   - Ensure all buttons and links focusable
   - Implement keyboard shortcuts (Ctrl+R for refresh)
   - Add visible focus indicators

3. **Screen Reader Compatibility:**
   - Use semantic HTML (`<table>`, `<thead>`, `<tbody>`)
   - Add alt text to chart images in PDF exports
   - Announce dynamic content updates with `aria-live`

---

**Story Complete:** Epic 05 Story 06 - Course Reporting System

**Total Estimated Time:** 16-20 hours

**Dependencies:**
- Sprint 1.1: RBAC system (for admin authentication)
- Sprint 2 Epic 01: Course models and progress tracking
- Sprint 2 Epic 01: ISF Coin transaction system
- Sprint 2 Epic 01: Time logging functionality

**Next Steps After Completion:**
- Developer creates comprehensive E2E tests covering all 124 acceptance criteria
- Developer creates quality gate YAML file with test coverage requirements
- QA performs full regression testing across all filter combinations
- Product Owner performs UAT and signs off on story completion

---

**End of Story Document**

# Epic 03 - Story 02: Syllabus Tracker & Grading Interface

**Story ID:** SPRINT2-EPIC03-STORY02
**Epic:** Epic 03 - LMS Coach Functionality
**Sprint:** Sprint 2
**Story Name:** Syllabus Tracker & Grading Interface
**Estimated Effort:** 10-12 hours (1.5-2 development days)
**Priority:** Critical (P0)
**Dependencies:**
- Sprint 1.1 RBAC (coach authentication, Balagruha scope)
- Epic 01 Stories 03-05 (student submissions: Art, Spoken English, Life Skills)
- Backend: MongoDB Submissions collection with grade field

**Last Updated:** 2025-10-24 15:16:58
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As a** Coach
**I want to** view and grade student submissions (artwork, videos, voice notes) with quality ratings and ISF Coin awards
**So that** students receive timely feedback and appropriate coin rewards for their work

### 1.2. Story Context

This story implements the main grading workflow for coaches. Coaches can:

- **View Submissions:** Filter by course type, Balagruha, grading status
- **Preview Media:**
  - **Art:** Image viewer with zoom/pan
  - **Spoken English:** Video player with playback controls
  - **Life Skills:** Audio player with waveform
- **Grade Quality:** Three-level rating system (Excellent, Good, Needs Improvement)
- **Award Coins:** 0-100 ISF Coins via slider input (discretion-based)
- **Provide Feedback:** Optional text comments for students
- **Navigate:** Previous/Next buttons to move between submissions
- **Bulk Grade:** Select multiple submissions and apply same grade

### 1.3. Key Features

- **Submission Queue:** Dashboard showing all pending/graded submissions
- **Filter Panel:** Course type (Art, Spoken English, Life Skills), Balagruha, Status (Pending, Graded, Flagged)
- **Media Preview:** Full-screen image viewer, video player, audio player with waveform
- **Quality Rating:** Radio buttons (Excellent = 80-100 coins suggested, Good = 50-79 coins, Needs Improvement = 0-49 coins)
- **Coin Slider:** 0-100 range with visual indicator and number input
- **Feedback Text:** Optional textarea (0-500 characters)
- **Submission Metadata:** Student name, course title, task title, submission date, time spent
- **Navigation Controls:** Previous, Next, Skip buttons
- **Bulk Actions:** Checkbox selection + bulk grade modal
- **Real-Time Updates:** Graded submissions update student dashboard immediately

---

## 1.5. Visual Layout Diagrams

### Grading Dashboard - Submission Queue

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Syllabus Tracker & Grading                              Coach: Priya               │ ← Header
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   (bg-blue-600)
│                                                                                     │
│ ┌─────────────────────────────────────────────────────────────────────────────┐   │
│ │ Quick Stats                                                                 │   │ ← Stats Cards
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│ │ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │   │
│ │ │ 📝 Pending   │  │ ✅ Graded     │  │ ⚠️ Flagged    │  │ ⏱️ This Week  │   │
│ │ │ 18           │  │ 142          │  │ 3            │  │ 24           │   │
│ │ │ Submissions  │  │ Submissions  │  │ For Review   │  │ Submissions  │   │
│ │ └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │   │
│ └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│ ┌─────────────────────────────────────────────────────────────────────────────┐   │
│ │ Filters                                                [Clear All Filters]  │   │ ← Filter Panel
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│ │ Course Type: [All ▼]  Status: [Pending ▼]  Balagruha: [All ▼]            │   │
│ │ Date Range: [Last 7 Days ▼]  Sort: [Oldest First ▼]                       │   │
│ └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│ 18 submissions found  [☐ Select All] [Bulk Grade Selected]                        │ ← Bulk actions
│                                                                                     │
│ ┌─────────────────────────────────────────────────────────────────────────────┐   │
│ │ ☐ [Art Thumbnail]  Draw a Tree                           [Pending] [⋮]     │   │ ← Submission Card 1
│ │    Student: Ravi Kumar (Class: 5th • Balagruha: Ramakrishna Ashram)       │   │   (120px height)
│ │    Course: Art Workshop Basics > Module 1 > Free Sketch                   │   │   bg-white
│ │    Submitted: Oct 24, 2025 at 10:30 AM • Time Spent: 45 min               │   │   hover:bg-blue-50
│ │    [👁️ Preview & Grade]                                                     │   │   border-l-4 orange
│ └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│ ┌─────────────────────────────────────────────────────────────────────────────┐   │
│ │ ☐ [Video Thumbnail]  Poetry Recitation                  [Pending] [⋮]     │   │ ← Submission Card 2
│ │    Student: Priya Sharma (Class: 6th • Balagruha: Ramakrishna Ashram)     │   │
│ │    Course: Spoken English > Module 2 > Poem 5                             │   │   border-l-4 blue
│ │    Submitted: Oct 24, 2025 at 9:15 AM • Duration: 2:34 • File: 12.3 MB    │   │
│ │    [👁️ Preview & Grade]                                                     │   │
│ └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│ ┌─────────────────────────────────────────────────────────────────────────────┐   │
│ │ ☐ [Audio Waveform]  Life Skills Response                [Pending] [⋮]     │   │ ← Submission Card 3
│ │    Student: Suresh Patel (Class: 5th • Balagruha: Ramakrishna Ashram)     │   │
│ │    Course: Life Skills > Module 3 > Question 7                            │   │   border-l-4 green
│ │    Submitted: Oct 24, 2025 at 8:45 AM • Duration: 0:34                    │   │
│ │    [👁️ Preview & Grade]                                                     │   │
│ └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│ ... (15 more submissions, scrollable)                                              │
│                                                                                     │
│ Showing 18 of 18 • [Load More]                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Grading Interface - Art Submission (Full Screen)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Grading: Draw a Tree - Ravi Kumar                         [✕ Close] [Fullscreen]  │ ← Header
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                                     │
│ ┌───────────────────────────────────────┬───────────────────────────────────────┐ │
│ │ PREVIEW (Artwork)                     │ GRADING PANEL                         │ │ ← 2-column layout
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │   (60% / 40% width)
│ │                                       │                                       │ │
│ │ ┌───────────────────────────────────┐ │ Student: Ravi Kumar                   │ │
│ │ │                                   │ │ Class: 5th • Balagruha: Ramakrishna   │ │
│ │ │                                   │ │                                       │ │
│ │ │        [Artwork Image]            │ │ Course: Art Workshop Basics           │ │
│ │ │                                   │ │ Task: Module 1 > Free Sketch          │ │
│ │ │     Tree drawing with colors      │ │ Assignment: Draw a Tree               │ │
│ │ │                                   │ │                                       │ │
│ │ │   (1280x720 resolution)           │ │ Submitted: Oct 24, 2025 at 10:30 AM  │ │
│ │ │                                   │ │ Time Spent: 45 minutes                │ │
│ │ │                                   │ │ File Size: 2.3 MB (PNG)               │ │
│ │ └───────────────────────────────────┘ │                                       │ │
│ │                                       │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │ [🔍 Zoom In] [🔍 Zoom Out] [⟲ Rotate]│                                       │ │
│ │ [⬇️ Download Original]                │ Quality Rating *                      │ │
│ │                                       │ ┌───────────────────────────────────┐ │ │
│ │ Task Instructions (for reference):    │ │ 🟢 Excellent                       │ │ ← Radio button 1
│ │ "Draw a tree with branches, leaves,   │ │ Shows creativity, good technique  │ │   (selected)
│ │  and roots. Use colors to make it     │ │ Suggested Coins: 80-100           │ │   bg-green-50
│ │  beautiful."                          │ └───────────────────────────────────┘ │ │   border-2 green-500
│ │                                       │                                       │ │
│ │                                       │ ┌───────────────────────────────────┐ │ │
│ │                                       │ │ 🟡 Good                            │ │ ← Radio button 2
│ │                                       │ │ Meets requirements, some effort   │ │
│ │                                       │ │ Suggested Coins: 50-79            │ │
│ │                                       │ └───────────────────────────────────┘ │ │
│ │                                       │                                       │ │
│ │                                       │ ┌───────────────────────────────────┐ │ │
│ │                                       │ │ 🔴 Needs Improvement               │ │ ← Radio button 3
│ │                                       │ │ Incomplete or minimal effort      │ │
│ │                                       │ │ Suggested Coins: 0-49             │ │
│ │                                       │ └───────────────────────────────────┘ │ │
│ │                                       │                                       │ │
│ │                                       │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                       │                                       │ │
│ │                                       │ ISF Coins to Award *                  │ │
│ │                                       │ ┌───────────────────────────────────┐ │ │
│ │                                       │ │ 0 ━━━━━━━━━━●━━━━━━━━━━━━━ 100    │ │ ← Slider
│ │                                       │ │              85                   │ │   (current: 85)
│ │                                       │ └───────────────────────────────────┘ │ │
│ │                                       │ ┌─────┐                               │ │
│ │                                       │ │ 85  │  coins  ← Number input       │ │
│ │                                       │ └─────┘  (editable)                   │ │
│ │                                       │                                       │ │
│ │                                       │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                       │                                       │ │
│ │                                       │ Feedback for Student (Optional)       │ │
│ │                                       │ ┌───────────────────────────────────┐ │ │
│ │                                       │ │ Great work, Ravi! Your tree has   │ │ ← Textarea
│ │                                       │ │ beautiful colors and the branches │ │   (0-500 chars)
│ │                                       │ │ look very realistic. Keep it up!  │ │   120px height
│ │                                       │ │                                   │ │
│ │                                       │ └───────────────────────────────────┘ │ │
│ │                                       │ 67 / 500 characters                   │ │
│ │                                       │                                       │ │
│ └───────────────────────────────────────┴───────────────────────────────────────┘ │
│                                                                                     │
│ [← Previous]  [Skip (Mark for Later)]  [🚩 Flag for Admin Review]  [Submit Grade →]│ ← Action buttons
│                                                                                     │
│ Submission 1 of 18 • Last saved: 2 seconds ago                                     │ ← Footer info
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Grading Interface - Video Submission (Spoken English)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Grading: Poetry Recitation - Priya Sharma                 [✕ Close] [Fullscreen]  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                                     │
│ ┌───────────────────────────────────────┬───────────────────────────────────────┐ │
│ │ VIDEO PLAYER                          │ GRADING PANEL                         │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                       │                                       │ │
│ │ ┌───────────────────────────────────┐ │ Student: Priya Sharma                 │ │
│ │ │                                   │ │ Class: 6th • Balagruha: Ramakrishna   │ │
│ │ │   [▶️ Play Video]                 │ │                                       │ │
│ │ │                                   │ │ Course: Spoken English                │ │
│ │ │   Student reciting poem           │ │ Task: Module 2 > Poem 5               │ │
│ │ │   "The Road Not Taken"            │ │ Assignment: Recite Poem               │ │
│ │ │                                   │ │                                       │ │
│ │ │   1920x1080 • MP4                 │ │ Submitted: Oct 24, 2025 at 9:15 AM   │ │
│ │ └───────────────────────────────────┘ │ Duration: 2 minutes 34 seconds        │ │
│ │                                       │ File Size: 12.3 MB                    │ │
│ │ ━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━ │ Attempts: 1st submission              │ │
│ │ 0:34 / 2:34  [⏸️ Pause] [🔊 Volume]  │                                       │ │
│ │ [⏪ Rewind 5s] [⏩ Forward 5s]        │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │ [↓ Download] [📝 Playback Speed: 1x] │                                       │ │
│ │                                       │ Evaluation Criteria:                  │ │
│ │ Original Poem Text (for reference):   │ ☑ Clear pronunciation                │ │
│ │ "Two roads diverged in a yellow wood,│ ☑ Appropriate pace                    │ │
│ │  And sorry I could not travel both   │ ☑ Good expression and emotion         │ │
│ │  And be one traveler, long I stood   │ ☐ Memorized (not reading)             │ │
│ │  And looked down one as far as I     │ ☑ Confident delivery                  │ │
│ │  could..."                            │                                       │ │
│ │                                       │ Quality Rating *                      │ │
│ │ Coach Notes:                          │ 🟢 Excellent (selected)               │ │
│ │ - Check pronunciation of "diverged"   │                                       │ │
│ │ - Listen for emotion in delivery      │ ISF Coins to Award *                  │ │
│ │                                       │ ┌───────────────────────────────────┐ │ │
│ │                                       │ │ 0 ━━━━━━━━━━━━━●━━━━━━━━━━━ 100   │ │
│ │                                       │ │                  90                │ │
│ │                                       │ └───────────────────────────────────┘ │ │
│ │                                       │                                       │ │
│ │                                       │ Feedback for Student (Optional)       │ │
│ │                                       │ ┌───────────────────────────────────┐ │ │
│ │                                       │ │ Excellent recitation, Priya! Your │ │ ← Textarea
│ │                                       │ │ pronunciation was clear and your  │ │
│ │                                       │ │ expression was wonderful. Great   │ │
│ │                                       │ │ job memorizing the poem!          │ │
│ │                                       │ └───────────────────────────────────┘ │ │
│ └───────────────────────────────────────┴───────────────────────────────────────┘ │
│                                                                                     │
│ [← Previous]  [Skip]  [🚩 Flag]  [Submit Grade →]                                  │
│ Submission 2 of 18                                                                  │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Grading Interface - Audio Submission (Life Skills)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Grading: Life Skills Voice Response - Suresh Patel        [✕ Close] [Fullscreen]  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                                     │
│ ┌───────────────────────────────────────┬───────────────────────────────────────┐ │
│ │ AUDIO PLAYER                          │ GRADING PANEL                         │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                       │                                       │ │
│ │ Question (Audio - played to student): │ Student: Suresh Patel                 │ │
│ │ ┌───────────────────────────────────┐ │ Class: 5th • Balagruha: Ramakrishna   │ │
│ │ │ 🔊 "Why is washing hands before   │ │                                       │ │
│ │ │     eating important?"            │ │ Course: Life Skills                   │ │
│ │ │ [▶️ Play Question Audio]          │ │ Task: Module 3 > Question 7           │ │
│ │ │ Duration: 0:08                    │ │ Topic: Hygiene & Health               │ │
│ │ └───────────────────────────────────┘ │                                       │ │
│ │                                       │ Submitted: Oct 24, 2025 at 8:45 AM    │ │
│ │ Student's Voice Answer:               │ Duration: 34 seconds                  │ │
│ │ ┌───────────────────────────────────┐ │ File Size: 450 KB (MP3)               │ │
│ │ │ 🎙️                                 │ │                                       │ │
│ │ │ [▶️ Play Student Response]        │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │ │                                   │ │                                       │ │
│ │ │ Waveform:                         │ │ Evaluation Criteria:                  │ │
│ │ │ ▁▃▅▇█▇▅▃▁ ▁▃▅▇█▇▅▃▁ ▁▃▅▇█         │ │ ☑ Answer addresses the question       │ │
│ │ │                                   │ │ ☑ Clear speech (understandable)       │ │
│ │ │ ━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━  │ │ ☑ Complete thought expressed          │ │
│ │ │ 0:12 / 0:34                       │ │ ☐ Provides specific examples          │ │
│ │ │                                   │ │                                       │ │
│ │ │ [⏸️ Pause] [🔊 Volume] [↓ Download]│ │ Expected Answer Elements:             │ │
│ │ └───────────────────────────────────┘ │ • Prevents germs/bacteria             │ │
│ │                                       │ • Keeps us healthy                    │ │
│ │ Transcript (if available):            │ • Removes dirt before food            │ │
│ │ "Washing hands is important because   │                                       │ │
│ │  it removes germs and dirt. If we     │ Quality Rating *                      │ │
│ │  don't wash hands, we can get sick    │ 🟡 Good (selected)                    │ │
│ │  from eating food with dirty hands."  │                                       │ │
│ │                                       │ ISF Coins to Award *                  │ │
│ │ Coach Notes:                          │ ┌───────────────────────────────────┐ │ │
│ │ - Student answered clearly            │ │ 0 ━━━━━━━━━●━━━━━━━━━━━━━━ 100    │ │
│ │ - Mentioned germs/dirt (good!)        │ │            65                     │ │
│ │ - Could add more detail               │ └───────────────────────────────────┘ │ │
│ │                                       │                                       │ │
│ │                                       │ Feedback for Student (Optional)       │ │
│ │                                       │ ┌───────────────────────────────────┐ │ │
│ │                                       │ │ Good answer, Suresh! You clearly  │ │
│ │                                       │ │ explained why washing hands is    │ │
│ │                                       │ │ important. Next time, try to give │ │
│ │                                       │ │ a specific example.               │ │
│ │                                       │ └───────────────────────────────────┘ │ │
│ └───────────────────────────────────────┴───────────────────────────────────────┘ │
│                                                                                     │
│ [← Previous]  [Skip]  [🚩 Flag]  [Submit Grade →]                                  │
│ Submission 3 of 18                                                                  │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Bulk Grading Modal

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Bulk Grade (5 submissions selected)                        [✕ Close]           │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                                 │
│ Selected Submissions:                                                           │
│ ┌─────────────────────────────────────────────────────────────────────────┐   │
│ │ 1. Ravi Kumar - Draw a Tree (Art)                                       │   │
│ │ 2. Meera Das - Draw a Landscape (Art)                                   │   │
│ │ 3. Anil Reddy - Draw a House (Art)                                      │   │
│ │ 4. Lakshmi Rao - Draw Flowers (Art)                                     │   │
│ │ 5. Kiran Singh - Draw Animals (Art)                                     │   │
│ └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│ Apply the same grade to all selected submissions:                              │
│                                                                                 │
│ Quality Rating *                                                                │
│ ┌─────────────────────────────────────────────────────────────────────────┐   │
│ │ 🟢 Excellent • 🟡 Good • 🔴 Needs Improvement                            │   │ ← Radio buttons
│ │ [Selected: Good]                                                        │   │   (horizontal)
│ └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│ ISF Coins to Award (same for all) *                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐   │
│ │ 0 ━━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100     │   │
│ │              70                                                         │   │
│ └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│ Feedback for Students (Optional - same message to all)                         │
│ ┌─────────────────────────────────────────────────────────────────────────┐   │
│ │ Good work on your drawings! Keep practicing and adding more details.    │   │
│ └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│ ⚠️ Warning: This will apply the same grade and feedback to all 5 submissions.  │
│ Individual adjustments can be made after bulk grading if needed.               │
│                                                                                 │
│ [Cancel]                                              [Apply Bulk Grade]        │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Grading Success Notification

```
┌─────────────────────────────────────────────────────────────┐
│ ✅ Grade Submitted Successfully!                            │ ← Toast notification
│                                                             │   (top-right corner)
│ Ravi Kumar has been notified and earned 85 ISF Coins!      │   bg-green-50
│                                                             │   border-2 green-500
│ [View Student Profile] [Undo]              [✕ Dismiss]     │   4-second auto-dismiss
└─────────────────────────────────────────────────────────────┘
```

### Component Measurements Summary

| Element | Width | Height | Padding | Margin | Border |
|---------|-------|--------|---------|--------|--------|
| Submission Card | 100% | 120px | p-6 | mb-4 | border-l-4 (type-dependent) |
| Grading Interface | 100vw | 100vh | - | - | - (fullscreen modal) |
| Preview Column | 60% | 100% | p-8 | - | border-r-2 gray-200 |
| Grading Column | 40% | 100% | p-8 | - | - |
| Image Preview | 100% | auto | - | - | max-height 600px |
| Video Player | 100% | auto | - | - | aspect-ratio 16:9 |
| Audio Player | 100% | 200px | p-6 | my-4 | 2px gray-200 rounded-xl |
| Quality Radio Button | 100% | 72px | p-4 | mb-3 | 2px (status color) rounded-lg |
| Coin Slider | 100% | 48px | - | my-4 | - |
| Feedback Textarea | 100% | 120px | p-4 | my-4 | 1px gray-300 rounded |
| Bulk Grade Modal | 720px | auto | p-8 | mx-auto | 2px gray-300 rounded-xl shadow-2xl |

---

## 2. Acceptance Criteria

### 2.1. Submission Queue & Filtering

- [ ] **QUEUE-01:** Dashboard displays all submissions from coach's assigned students (Balagruha scope)
- [ ] **QUEUE-02:** Quick stats cards show: Pending count, Graded count, Flagged count, This Week count
- [ ] **QUEUE-03:** Filter panel: Course Type (All, Art, Spoken English, Life Skills), Status (All, Pending, Graded, Flagged), Balagruha dropdown, Date range, Sort
- [ ] **QUEUE-04:** Search input filters by student name or course title (real-time, case-insensitive)
- [ ] **QUEUE-05:** Submission cards display: thumbnail/waveform, student name, course/task title, submission date, time spent/duration, file size
- [ ] **QUEUE-06:** Border-left color-coded: Orange (Art), Blue (Spoken English), Green (Life Skills)
- [ ] **QUEUE-07:** "Preview & Grade" button opens grading interface fullscreen
- [ ] **QUEUE-08:** Checkbox selection enables bulk grading actions

### 2.2. Art Submission Grading

- [ ] **ART-01:** Image preview displays artwork at full resolution (max 1920x1080)
- [ ] **ART-02:** Zoom In/Out buttons work (25%, 50%, 100%, 150%, 200%)
- [ ] **ART-03:** Rotate button rotates image 90° clockwise (for rotated uploads)
- [ ] **ART-04:** Download Original button downloads full-resolution PNG/JPG
- [ ] **ART-05:** Task instructions display for reference
- [ ] **ART-06:** Quality rating radio buttons: Excellent, Good, Needs Improvement
- [ ] **ART-07:** Selecting Excellent suggests 80-100 coins (slider auto-adjusts to 85)
- [ ] **ART-08:** Selecting Good suggests 50-79 coins (slider auto-adjusts to 65)
- [ ] **ART-09:** Selecting Needs Improvement suggests 0-49 coins (slider auto-adjusts to 25)
- [ ] **ART-10:** Coin slider adjustable 0-100 with visual indicator and number input
- [ ] **ART-11:** Number input validates: integers only, 0-100 range
- [ ] **ART-12:** Feedback textarea optional, 0-500 characters, character count displays

### 2.3. Video Submission Grading (Spoken English)

- [ ] **VIDEO-01:** Video player displays HTML5 player with controls (play, pause, volume, fullscreen)
- [ ] **VIDEO-02:** Video player shows progress bar with current time / total duration
- [ ] **VIDEO-03:** Rewind 5s / Forward 5s buttons work correctly
- [ ] **VIDEO-04:** Playback speed selector: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
- [ ] **VIDEO-05:** Download button downloads MP4 file
- [ ] **VIDEO-06:** Original poem text/task instructions display for reference
- [ ] **VIDEO-07:** Evaluation criteria checkboxes: Clear pronunciation, Appropriate pace, Good expression, Memorized, Confident delivery
- [ ] **VIDEO-08:** Quality rating and coin award system same as Art (Excellent/Good/Needs Improvement)
- [ ] **VIDEO-09:** Feedback textarea same as Art (optional, 0-500 chars)

### 2.4. Audio Submission Grading (Life Skills)

- [ ] **AUDIO-01:** Question audio player plays original question asked to student
- [ ] **AUDIO-02:** Student response audio player plays voice note with waveform visualization
- [ ] **AUDIO-03:** Waveform animates during playback (progress indicator)
- [ ] **AUDIO-04:** Transcript displays if available (from speech-to-text service)
- [ ] **AUDIO-05:** Expected answer elements listed for reference
- [ ] **AUDIO-06:** Evaluation criteria checkboxes: Addresses question, Clear speech, Complete thought, Provides examples
- [ ] **AUDIO-07:** Coach notes section for personal reminders (not shown to student)
- [ ] **AUDIO-08:** Quality rating and coin award system same as Art/Video

### 2.5. Grading Submission & Navigation

- [ ] **SUBMIT-01:** "Submit Grade" button validates: quality rating selected, coin amount entered
- [ ] **SUBMIT-02:** Validation errors display: "Please select a quality rating" if missing
- [ ] **SUBMIT-03:** On submit: POST `/api/v2/lms/coach/submissions/:submissionId/grade` with grade data
- [ ] **SUBMIT-04:** Success toast notification displays: "✅ Grade Submitted Successfully! {Student} earned {X} ISF Coins!"
- [ ] **SUBMIT-05:** Student coin balance updates immediately in database
- [ ] **SUBMIT-06:** Student receives in-app notification: "Coach {Name} graded your '{Task}' submission! +{X} coins"
- [ ] **SUBMIT-07:** Graded submission status changes: pending → graded
- [ ] **SUBMIT-08:** Graded submission moves out of "Pending" queue
- [ ] **SUBMIT-09:** "Previous" button navigates to previous submission in queue
- [ ] **SUBMIT-10:** "Next" button navigates to next submission in queue (or auto-advances after submit)
- [ ] **SUBMIT-11:** "Skip" button marks submission for later review (status: pending, skipped flag)
- [ ] **SUBMIT-12:** "Flag for Admin Review" button changes status to "flagged" (for problematic submissions)

### 2.6. Bulk Grading

- [ ] **BULK-01:** "Select All" checkbox in queue selects all visible submissions
- [ ] **BULK-02:** Individual checkboxes allow selective multi-select
- [ ] **BULK-03:** "Bulk Grade Selected" button opens bulk grade modal
- [ ] **BULK-04:** Modal lists all selected submissions (student name + task title)
- [ ] **BULK-05:** Quality rating applies to all selected submissions
- [ ] **BULK-06:** Coin amount applies to all selected submissions
- [ ] **BULK-07:** Feedback message applies to all selected submissions (optional)
- [ ] **BULK-08:** Warning message displays: "This will apply the same grade to all {X} submissions"
- [ ] **BULK-09:** "Apply Bulk Grade" button grades all submissions in batch
- [ ] **BULK-10:** Success toast shows: "{X} submissions graded successfully! Students notified."
- [ ] **BULK-11:** All graded submissions move to "Graded" status

### 2.7. Auto-Save & Error Handling

- [ ] **SAVE-01:** Grading interface auto-saves draft every 10 seconds (quality rating, coin amount, feedback)
- [ ] **SAVE-02:** Draft indicator shows: "Last saved: X seconds ago"
- [ ] **SAVE-03:** If coach closes modal without submitting, draft is retained (can resume later)
- [ ] **SAVE-04:** Failed grade submission retries 3 times with exponential backoff
- [ ] **SAVE-05:** Network error displays: "Grade submission failed. Retrying... (Attempt 2 of 3)"
- [ ] **SAVE-06:** After 3 failed attempts: "Unable to submit grade. Please check your connection and try again."

### 2.8. Performance & Accessibility

- [ ] **PERF-01:** Submission queue loads within 2 seconds (up to 200 submissions)
- [ ] **PERF-02:** Grading interface opens within 1 second
- [ ] **PERF-03:** Video player preloads first 10 seconds for instant playback
- [ ] **PERF-04:** Audio waveform renders at 30 FPS minimum during playback
- [ ] **PERF-05:** Image zoom/pan operations run at 60 FPS (smooth interaction)
- [ ] **ACC-01:** Keyboard navigation: Tab to fields, Space to play/pause, Enter to submit
- [ ] **ACC-02:** Screen reader announces quality rating selection and coin amount
- [ ] **ACC-03:** ARIA labels for video/audio controls (play, pause, volume, progress)

---

## 3. Task Breakdown

### Phase 1: Submission Queue Dashboard (2-3 hours)

**Task 1:** Create `GradingDashboard.jsx` Component (60 min)
- Build quick stats cards (Pending, Graded, Flagged, This Week)
- Fetch submissions: GET `/api/v2/lms/coach/:coachId/submissions?status=pending`
- Display counts with animated number transitions

**Task 2:** Build `SubmissionQueue.jsx` Component (90 min)
- Render submission cards with thumbnails, metadata, status badges
- Implement filter panel (Course Type, Status, Balagruha, Date Range, Sort)
- Add search input (real-time filtering by student name or course title)
- Apply border-left color coding: Orange (Art), Blue (Video), Green (Audio)
- Add checkbox selection for bulk actions

**Task 3:** Implement Filtering & Sorting Logic (30 min)
- Filter by course type: filter submissions client-side or server-side
- Filter by status: pending, graded, flagged
- Sort options: Oldest First, Newest First, Student Name A-Z
- Update URL query params for shareable filtered views

### Phase 2: Art Submission Grading (2-3 hours)

**Task 4:** Create `ArtGradingInterface.jsx` Component (90 min)
- Build 2-column layout (60% preview, 40% grading panel)
- Render image preview with HTML `<img>` tag (S3 URL)
- Add zoom controls: Zoom In (+25%), Zoom Out (-25%), Reset to 100%
- Implement rotation: CSS `transform: rotate(90deg)` (increment on each click)
- Display task instructions and submission metadata

**Task 5:** Build `GradingPanel.jsx` Component (60 min)
- Render quality rating radio buttons (Excellent, Good, Needs Improvement)
- Style selected rating with colored background and border
- On rating change: auto-adjust coin slider to suggested range
  - Excellent: set to 85 coins
  - Good: set to 65 coins
  - Needs Improvement: set to 25 coins
- Build coin slider (0-100) with visual indicator and number input
- Add feedback textarea (0-500 chars) with character counter

**Task 6:** Implement Image Zoom & Pan (30 min)
- Use CSS `transform: scale()` for zoom
- Add pan functionality: drag image when zoomed in (mouse events or library like `react-zoom-pan-pinch`)
- Ensure smooth transitions (60 FPS)

### Phase 3: Video Submission Grading (2-3 hours)

**Task 7:** Create `VideoGradingInterface.jsx` Component (90 min)
- Build 2-column layout (60% video player, 40% grading panel)
- Render HTML5 `<video>` player with controls
- Add custom controls: Play/Pause, Volume, Fullscreen, Progress Bar
- Display current time / total duration (format: MM:SS)
- Show video metadata: resolution, file size, codec

**Task 8:** Implement Video Player Controls (60 min)
- Rewind 5s button: `videoElement.currentTime -= 5`
- Forward 5s button: `videoElement.currentTime += 5`
- Playback speed selector: `videoElement.playbackRate = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2`
- Download button: download MP4 file from S3 URL
- Progress bar: clickable to seek to specific time

**Task 9:** Add Evaluation Criteria Checkboxes (30 min)
- Render checkboxes: Clear pronunciation, Appropriate pace, Good expression, Memorized, Confident delivery
- Store checked criteria in state (optional, for coach notes)
- Display original poem/text for reference

### Phase 4: Audio Submission Grading (1.5-2 hours)

**Task 10:** Create `AudioGradingInterface.jsx` Component (60 min)
- Build 2-column layout (60% audio player, 40% grading panel)
- Render question audio player (original question asked to student)
- Render student response audio player with waveform
- Display expected answer elements for reference

**Task 11:** Build Audio Waveform Visualization (45 min)
- Use Canvas API or library (e.g., `wavesurfer.js`)
- Render waveform bars from audio file
- Animate waveform progress during playback (sync with audio `timeupdate` event)
- Show current time / total duration

**Task 12:** Implement Transcript Display (15 min)
- Fetch transcript from backend (if available from speech-to-text service)
- Display in scrollable container
- Highlight current word/phrase during playback (optional enhancement)

### Phase 5: Grading Submission Logic (1.5 hours)

**Task 13:** Implement Grade Submission (45 min)
- Build `handleSubmitGrade()` function
- Validate: quality rating selected, coin amount (0-100), feedback (optional, max 500 chars)
- POST `/api/v2/lms/coach/submissions/:submissionId/grade` with:
  ```json
  {
    "quality": "excellent",
    "coinsAwarded": 85,
    "feedback": "Great work, Ravi!",
    "gradedBy": "coachId",
    "gradedAt": "2025-10-24T15:30:00Z"
  }
  ```
- On success: update student coin balance, change submission status to "graded"
- Show success toast notification
- Trigger student notification (in-app + optional email)

**Task 14:** Implement Navigation Controls (30 min)
- Previous button: load previous submission in queue (based on filtered order)
- Next button: load next submission in queue (or auto-advance after submit)
- Skip button: mark submission as "skipped" for later review (add `skippedAt` timestamp)
- Flag button: change status to "flagged", add reason field (optional modal)

**Task 15:** Build Auto-Save Draft (15 min)
- Use `useEffect` with debounce (10 seconds) to auto-save grading draft
- PUT `/api/v2/lms/coach/submissions/:submissionId/draft` with current state
- Show "Last saved: X seconds ago" indicator
- On modal close: retain draft, allow coach to resume later

### Phase 6: Bulk Grading (1 hour)

**Task 16:** Build `BulkGradeModal.jsx` Component (45 min)
- Render list of selected submissions (student name + task title)
- Show quality rating radio buttons (apply to all)
- Show coin slider (apply same amount to all)
- Show feedback textarea (apply same message to all)
- Display warning: "This will apply the same grade to all {X} submissions"
- On submit: loop through selected submissions and POST grade for each
- Show progress indicator: "Grading 3 of 5 submissions... (60%)"
- Show success toast: "{X} submissions graded successfully!"

**Task 17:** Implement Bulk Selection Logic (15 min)
- "Select All" checkbox toggles all visible submissions
- Individual checkboxes allow selective multi-select
- Display selected count: "{X} submissions selected"
- Enable "Bulk Grade Selected" button when ≥1 submission selected

### Phase 7: Testing & Polish (1 hour)

**Task 18:** Manual Testing (30 min)
- Test Art grading: image preview, zoom, rotate, quality rating, coin award, feedback, submit
- Test Video grading: video playback, controls, speed adjustment, quality rating, submit
- Test Audio grading: audio playback, waveform, transcript, quality rating, submit
- Test navigation: Previous, Next, Skip, Flag buttons
- Test bulk grading: select multiple, apply same grade, verify all submissions graded

**Task 19:** Edge Case Handling (30 min)
- Handle missing thumbnails: show placeholder icon
- Handle video playback errors: show "Video unavailable. Download to view."
- Handle audio waveform errors: fallback to simple progress bar
- Handle coin amount validation: must be 0-100, integers only
- Handle network errors during submission: retry logic with exponential backoff (3 attempts)
- Handle empty submission queue: show "No submissions to grade. Great job!"

---

## 4. API Endpoints

### 4.1. Get Submissions for Grading

**GET `/api/v2/lms/coach/:coachId/submissions`**

**Query Parameters:**
- `courseType` (optional): "Art" | "Spoken English" | "Life Skills" | "All"
- `status` (optional): "pending" | "graded" | "flagged" | "all"
- `balagruhaId` (optional): Filter by Balagruha
- `dateRange` (optional): "today" | "this_week" | "this_month" | "all"
- `sortBy` (optional): "oldest_first" | "newest_first" | "student_name"
- `limit` (optional, default: 20): Number of submissions per page
- `offset` (optional, default: 0): Pagination offset

**Example Request:**
```http
GET /api/v2/lms/coach/coach123/submissions?courseType=Art&status=pending&sortBy=oldest_first&limit=20&offset=0 HTTP/1.1
```

**Response (200 OK):**
```json
{
  "submissions": [
    {
      "id": "sub123",
      "studentId": "student456",
      "studentName": "Ravi Kumar",
      "studentClass": "5th",
      "balagruhaId": "balagruha789",
      "balagruhaName": "Ramakrishna Ashram",
      "courseId": "course001",
      "courseTitle": "Art Workshop Basics",
      "taskId": "task002",
      "taskTitle": "Draw a Tree",
      "submissionType": "art",
      "fileUrl": "https://s3.amazonaws.com/isf-playground/submissions/art_ravi_tree.png",
      "thumbnailUrl": "https://s3.amazonaws.com/isf-playground/thumbnails/art_ravi_tree_thumb.jpg",
      "metadata": {
        "fileSize": 2457600,
        "dimensions": { "width": 1280, "height": 720 },
        "mimeType": "image/png"
      },
      "submittedAt": "2025-10-24T10:30:00Z",
      "timeSpent": 45,
      "status": "pending"
    },
    {
      "id": "sub124",
      "studentName": "Priya Sharma",
      "submissionType": "video",
      "fileUrl": "https://s3.amazonaws.com/isf-playground/submissions/video_priya_poem5.mp4",
      "metadata": {
        "duration": 154,
        "fileSize": 12902400
      },
      "submittedAt": "2025-10-24T09:15:00Z",
      "status": "pending"
    }
  ],
  "totalSubmissions": 18,
  "stats": {
    "pending": 18,
    "graded": 142,
    "flagged": 3,
    "thisWeek": 24
  }
}
```

---

### 4.2. Submit Grade for Submission

**POST `/api/v2/lms/coach/submissions/:submissionId/grade`**

**Request Body:**
```json
{
  "quality": "excellent",
  "coinsAwarded": 85,
  "feedback": "Great work, Ravi! Your tree has beautiful colors and the branches look very realistic. Keep it up!",
  "evaluationCriteria": {
    "clearPronunciation": true,
    "appropriatePace": true,
    "goodExpression": true,
    "memorized": false,
    "confidentDelivery": true
  },
  "gradedBy": "coach123",
  "gradedAt": "2025-10-24T15:30:00Z"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "submissionId": "sub123",
  "studentId": "student456",
  "studentCoinBalance": 1335,
  "message": "Grade submitted successfully! Ravi Kumar has been notified and earned 85 ISF Coins."
}
```

**Error Responses:**
```json
// 400 Bad Request (Validation Error)
{
  "success": false,
  "error": "Coin amount must be between 0 and 100"
}

// 404 Not Found
{
  "success": false,
  "error": "Submission not found or already graded"
}
```

---

### 4.3. Bulk Grade Submissions

**POST `/api/v2/lms/coach/submissions/bulk-grade`**

**Request Body:**
```json
{
  "submissionIds": ["sub123", "sub125", "sub127", "sub129", "sub131"],
  "quality": "good",
  "coinsAwarded": 70,
  "feedback": "Good work on your drawings! Keep practicing and adding more details.",
  "gradedBy": "coach123",
  "gradedAt": "2025-10-24T15:45:00Z"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "gradedCount": 5,
  "failedSubmissions": [],
  "message": "5 submissions graded successfully! Students notified."
}
```

---

### 4.4. Save Grading Draft (Auto-Save)

**PUT `/api/v2/lms/coach/submissions/:submissionId/draft`**

**Request Body:**
```json
{
  "quality": "excellent",
  "coinsAwarded": 85,
  "feedback": "Great work, Ravi!",
  "savedAt": "2025-10-24T15:28:00Z"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Draft saved"
}
```

---

### 4.5. Flag Submission for Admin Review

**PUT `/api/v2/lms/coach/submissions/:submissionId/flag`**

**Request Body:**
```json
{
  "reason": "Inappropriate content",
  "flaggedBy": "coach123",
  "flaggedAt": "2025-10-24T15:50:00Z"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "submissionId": "sub123",
  "status": "flagged",
  "message": "Submission flagged for admin review"
}
```

---

## 5. File Paths

### 5.1. Frontend Files (React Components)

```
frontend/src/
├── pages/
│   └── coach/
│       └── GradingDashboard.jsx                  ← NEW (main grading page)
├── components/
│   ├── coach/
│   │   ├── grading/
│   │   │   ├── SubmissionQueue.jsx                ← NEW (submission list)
│   │   │   ├── SubmissionCard.jsx                 ← NEW (single submission card)
│   │   │   ├── FilterPanel.jsx                    ← NEW (filter controls)
│   │   │   ├── ArtGradingInterface.jsx            ← NEW (art grading UI)
│   │   │   ├── VideoGradingInterface.jsx          ← NEW (video grading UI)
│   │   │   ├── AudioGradingInterface.jsx          ← NEW (audio grading UI)
│   │   │   ├── GradingPanel.jsx                   ← NEW (quality rating + coin slider)
│   │   │   ├── BulkGradeModal.jsx                 ← NEW (bulk grading modal)
│   │   │   └── GradingSuccessToast.jsx            ← NEW (success notification)
│   │   └── common/
│   │       ├── ImageZoomViewer.jsx                ← NEW (zoomable image preview)
│   │       ├── VideoPlayer.jsx                    ← NEW (custom video player)
│   │       └── AudioWaveform.jsx                  ← NEW (waveform visualization)
├── hooks/
│   ├── useSubmissionGrading.js                   ← NEW (grading logic hook)
│   ├── useMediaPlayer.js                         ← NEW (video/audio player hook)
│   └── useAutoSave.js                            (reused from previous stories)
└── services/
    └── gradingService.js                         ← NEW (grading API calls)
```

### 5.2. Backend Files (Node.js + Express)

```
backend/
├── controllers/
│   └── coachGradingController.js                 ← NEW (grading handlers)
├── routes/
│   └── v2/
│       └── lms/
│           └── coach/
│               └── grading.js                     ← NEW (grading routes)
├── services/
│   ├── gradingService.js                         ← NEW (grading business logic)
│   ├── notificationService.js                    (reused - send student notifications)
│   └── coinService.js                            (reused - update student coin balance)
├── models/
│   └── Submissions.js                            (UPDATED - add grade field)
└── middleware/
    └── coachAuth.js                              (reused - verify coach authentication)
```

### 5.3. Database Schemas

**MongoDB Collection: `Submissions` (Extended for Grading)**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  courseId: ObjectId,
  taskId: ObjectId,
  submissionType: String,  // "art", "video", "audio"
  fileUrl: String,
  thumbnailUrl: String,    // For videos and art
  metadata: {
    duration: Number,      // For video/audio (seconds)
    fileSize: Number,      // Bytes
    dimensions: Object,    // For images/videos
    mimeType: String
  },
  submittedAt: Date,
  timeSpent: Number,       // Minutes spent on task
  status: String,          // "pending", "graded", "flagged", "skipped"
  grade: {                 ← NEW FIELD
    quality: String,       // "excellent", "good", "needs_improvement"
    coinsAwarded: Number,  // 0-100
    feedback: String,      // Optional text feedback
    evaluationCriteria: {  // Optional checkboxes
      clearPronunciation: Boolean,
      appropriatePace: Boolean,
      goodExpression: Boolean,
      memorized: Boolean,
      confidentDelivery: Boolean
    },
    gradedBy: ObjectId,    // Reference to Coach
    gradedAt: Date
  },
  draft: {                 ← NEW FIELD (for auto-save)
    quality: String,
    coinsAwarded: Number,
    feedback: String,
    savedAt: Date
  },
  flagged: {
    reason: String,
    flaggedBy: ObjectId,
    flaggedAt: Date
  },
  offlineSubmission: Boolean,
  syncedAt: Date
}
```

---

## 6. Definition of Done

### 6.1. Development Complete

- [ ] All 19 tasks from Section 3 completed and checked off
- [ ] Code committed to feature branch: `feature/sprint-2-epic-03-story-02`
- [ ] No console errors or warnings in browser DevTools
- [ ] All components follow React v19.0.0 best practices

### 6.2. Functional Requirements Met

- [ ] Submission queue displays all pending submissions with filters
- [ ] Art grading interface works (image preview, zoom, rotate, quality rating, coin award, feedback)
- [ ] Video grading interface works (video player, controls, quality rating, coin award, feedback)
- [ ] Audio grading interface works (audio player, waveform, quality rating, coin award, feedback)
- [ ] Grade submission updates student coin balance and sends notifications
- [ ] Navigation controls work (Previous, Next, Skip, Flag)
- [ ] Bulk grading applies same grade to multiple submissions
- [ ] Auto-save prevents data loss

### 6.3. Testing & Quality Assurance

- [ ] **Unit Tests:** 80%+ coverage for grading logic (grade validation, coin calculation, status updates)
- [ ] **Integration Tests:** API endpoints return correct responses (get submissions, submit grade, bulk grade, flag)
- [ ] **E2E Tests:** Critical paths tested:
  - Coach filters submissions → opens grading interface → grades submission → student receives notification + coins
  - Coach bulk grades multiple submissions → all students receive notifications + coins
  - Coach flags submission → admin receives notification
- [ ] **Manual Testing:**
  - Tested on Windows desktop (1920x1080 resolution)
  - Tested video playback with different formats (MP4, WebM)
  - Tested audio playback with waveform visualization
  - Tested image zoom/pan functionality
  - Tested all filter combinations

### 6.4. Performance & Accessibility

- [ ] Submission queue loads within 2 seconds (up to 200 submissions)
- [ ] Grading interface opens within 1 second
- [ ] Video player preloads first 10 seconds for instant playback
- [ ] Waveform renders at 30 FPS during playback
- [ ] Image zoom/pan runs at 60 FPS
- [ ] Keyboard navigation works (Tab, Space, Enter)
- [ ] Screen reader announces quality ratings and coin amounts
- [ ] ARIA labels present for media controls

### 6.5. Code Review & Approval

- [ ] Code peer-reviewed by senior developer
- [ ] No critical issues flagged (security, performance, logic errors)
- [ ] TailwindCSS classes follow design system (Coach blue theme)
- [ ] Error messages are clear and actionable

### 6.6. Documentation & Handoff

- [ ] E2E test template generated in `docs/qa/e2e/sprint-2-epic-03-story-02-grading.md`
- [ ] Quality gate YAML created: `docs/qa/gates/sprint-2-epic-03-story-02.yml` (status: PASS)
- [ ] API documentation updated with grading endpoints
- [ ] QA team notified for formal testing

### 6.7. Deployment Ready

- [ ] Feature branch merged to `develop` branch
- [ ] No merge conflicts
- [ ] CI/CD pipeline passes (build + tests)
- [ ] Staging environment deployment successful
- [ ] Product Owner sign-off obtained

---

## 7. Notes & Assumptions

### 7.1. Technical Assumptions

- **Video Codecs:** MP4 (H.264) and WebM supported, playback in Electron Chromium engine
- **Audio Format:** MP3, WAV, OGG supported via HTML5 `<audio>` element
- **Image Formats:** JPG, PNG, GIF, WebP supported
- **File Sizes:** Art (max 10 MB), Video (max 500 MB), Audio (max 100 MB)
- **Waveform Library:** Use `wavesurfer.js` or Canvas API for audio waveform visualization

### 7.2. Design Decisions

- **Quality Rating:** Three-level system (Excellent, Good, Needs Improvement) balances simplicity and nuance
- **Coin Range:** 0-100 allows granular rewards based on effort and quality
- **Auto-Save:** 10-second debounce prevents data loss without excessive server calls
- **Bulk Grading:** Applies same grade to all selected submissions (time-saver for similar quality work)
- **Flagging:** Allows coaches to escalate problematic submissions to admins

### 7.3. Open Questions

1. **Speech-to-Text:** Should audio submissions be automatically transcribed? (Recommendation: Yes, using AWS Transcribe or Google Speech-to-Text)
2. **Video Compression:** Should videos be compressed on upload to reduce file sizes? (Recommendation: Yes, compress to 720p H.264 if original > 1080p)
3. **Grading Rubrics:** Should admins define grading rubrics per task? (Future enhancement)

---

## 8. Related Documents

- **Epic 03 Overview:** `docs/epics/sprint2/sprint-2-epic-03-lms-coach-functionality.md`
- **Sprint 2 MPSD:** `docs/epics/sprint-2-master-plan.md`
- **Sprint 2 Design System:** `docs/design-systems/sprint-2-lms-design-system.md`
- **Epic 01 Story 03 (Art Submissions):** `docs/stories/sprint2/epic-01-story-03-art-course-artweaver-integration.md`
- **Epic 01 Story 04 (Video Submissions):** `docs/stories/sprint2/epic-01-story-04-spoken-english-video-recording.md`
- **Epic 01 Story 05 (Audio Submissions):** `docs/stories/sprint2/epic-01-story-05-life-skills-voice-responses.md`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:16:58 (via `date '+%Y-%m-%d %H:%M:%S'`)
- **Status:** Draft - Ready for Development
- **Next Steps:** Assign to frontend + backend developers for grading implementation

---

**QA Agent Record:**
- **E2E Template:** Pending generation
- **Quality Gate:** Pending creation
- **Testing Status:** Not started

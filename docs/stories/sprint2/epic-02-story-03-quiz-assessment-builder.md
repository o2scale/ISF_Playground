# Epic 02 - Story 03: Quiz System & Assessment Builder

**Story ID:** SPRINT2-EPIC02-STORY03
**Epic:** Epic 02 - LMS Admin Course Management
**Sprint:** Sprint 2
**Story Name:** Quiz System & Assessment Builder
**Estimated Effort:** 8-10 hours (1-1.5 development days)
**Priority:** High (P1)
**Dependencies:**
- Sprint 1.1 RBAC (admin authentication)
- Story 01 (Course structure for attaching quizzes)
- Backend: MongoDB Quizzes collection

**Last Updated:** 2025-10-24 15:04:45
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As an** Administrator
**I want to** create quizzes with multiple question types (MCQ, True/False, Fill-in-the-blank)
**So that I can** assess student understanding and provide automated grading

### 1.2. Story Context

This story implements the quiz authoring and management system. Administrators can:

- **Create/Edit Quizzes:** Build quizzes with metadata (title, description, time limit, passing score)
- **Multiple Question Types:**
  - MCQ Single Answer (one correct option)
  - MCQ Multiple Answers (multiple correct options)
  - True/False
  - Fill-in-the-Blank (text matching)
- **Question Bank:** Reusable question library for quick quiz assembly
- **Quiz Settings:** Configure time limits, passing scores, randomization, feedback timing
- **Preview Mode:** Test quiz as students will see it before publishing
- **Course Association:** Link quizzes to specific chapters in course structure

### 1.3. Key Features

- **Quiz CRUD:** Create, edit, duplicate, delete quizzes
- **Question Builder:** Visual editor for each question type with validation
- **Drag-and-Drop Reordering:** Reorder questions within quiz
- **Question Bank:** Save questions for reuse across quizzes
- **Rich Text Support:** Formatting for question text (bold, italic, code, lists)
- **Correct Answer Marking:** Clear UI for marking correct answers
- **Points Assignment:** Configure points per question
- **Quiz Settings Panel:** Time limit, passing score, randomization options
- **Preview Mode:** See quiz exactly as students will

---

## 1.5. Visual Layout Diagrams

### Quiz Dashboard - List View

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Quiz Management                              [+ Create New Quiz]  Admin: A      │ ← Header
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   (bg-purple-600)
│                                                                                 │
│ [All Quizzes ▼] [🔍 Search quizzes...] [Sort: Newest ▼]                       │ ← Filter Bar
│                                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────┐   │
│ │ [Quiz Icon] File Management Basics                         [Draft]  [⋮] │   │ ← Quiz Card
│ │             10 Questions • 15 min time limit • 70% passing score        │   │   (100px height)
│ │             Course: Advanced Computer Apps > Module 1 > Chapter 2       │   │
│ │             Created: Oct 20, 2025 • Last Edited: Oct 24, 2025          │   │
│ └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────┐   │
│ │ [Quiz Icon] MS Word Mastery Test                    [Published]  [⋮]   │   │
│ │             25 Questions • 30 min time limit • 80% passing score        │   │
│ │             Course: Advanced Computer Apps > Module 1 > Chapter 5       │   │
│ │             Created: Oct 15, 2025 • Last Edited: Oct 22, 2025          │   │
│ └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│ ... (more quiz cards)                                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Quiz Creation/Edit - Main Interface

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Quiz Builder: File Management Basics                 [💾 Save] [👁️ Preview]   │ ← Header
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                                 │
│ ┌───────────────────────────────────┬───────────────────────────────────────┐ │
│ │ QUIZ METADATA                     │ QUIZ SETTINGS                         │ │ ← Top Section
│ │ ┌───────────────────────────────┐ │ ┌───────────────────────────────────┐ │ │   (2 columns)
│ │ │ Quiz Title *                  │ │ │ ⏱️ Time Limit: [15] minutes       │ │ │
│ │ │ File Management Basics        │ │ │ ✓ No limit                        │ │ │
│ │ └───────────────────────────────┘ │ │                                   │ │ │
│ │                                   │ │ 📊 Passing Score: [70] %          │ │ │
│ │ ┌───────────────────────────────┐ │ │                                   │ │ │
│ │ │ Description                   │ │ │ 🔀 Randomization:                 │ │ │
│ │ │ Test your knowledge of file   │ │ │ ☑ Randomize question order        │ │ │
│ │ │ management concepts           │ │ │ ☑ Randomize option order (MCQ)    │ │ │
│ │ └───────────────────────────────┘ │ │                                   │ │ │
│ │                                   │ │ 📝 Show Results:                   │ │ │
│ │ 📚 Associated Course:             │ │ ⚪ Immediately after submission    │ │ │
│ │ Advanced Computer Apps >          │ │ 🔵 After all students complete     │ │ │
│ │ Module 1 > Chapter 2              │ │ ⚪ Never (manual release)          │ │ │
│ └───────────────────────────────────┘ └───────────────────────────────────┘ │ │
│                                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────┐   │
│ │ QUESTIONS (10)                                    [+ Add Question ▼]    │   │ ← Questions Section
│ │                                                   MCQ / True-False /    │   │
│ │                                                   Fill-in-Blank         │   │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│ │                                                                         │   │
│ │ ┌───────────────────────────────────────────────────────────────┐ [⋮] │   │ ← Question 1
│ │ │ Q1. What is the keyboard shortcut for Copy in Windows?   [5 pts]│     │   │   (MCQ Single)
│ │ │ MCQ - Single Answer                                           │     │   │   (Expanded)
│ │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │     │   │
│ │ │ ⚪ A) Ctrl + X                                                │     │   │
│ │ │ 🔵 B) Ctrl + C  ← Marked as Correct                          │     │   │
│ │ │ ⚪ C) Ctrl + V                                                │     │   │
│ │ │ ⚪ D) Ctrl + Z                                                │     │   │
│ │ │ [✏️ Edit] [🗑️ Delete] [💾 Save to Question Bank]            │     │   │
│ │ └───────────────────────────────────────────────────────────────┘     │   │
│ │                                                                         │   │
│ │ ┌───────────────────────────────────────────────────────────────┐ [⋮] │   │ ← Question 2
│ │ │ Q2. The Recycle Bin permanently deletes files.           [3 pts]│     │   │   (True/False)
│ │ │ True / False                                                  │     │   │   (Collapsed preview)
│ │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │     │   │
│ │ │ Answer: False ✓                                              │     │   │
│ │ │ [✏️ Edit] [🗑️ Delete] [💾 Save to Question Bank]            │     │   │
│ │ └───────────────────────────────────────────────────────────────┘     │   │
│ │                                                                         │   │
│ │ ┌───────────────────────────────────────────────────────────────┐ [⋮] │   │ ← Question 3
│ │ │ Q3. Fill in the blank: _____ + S saves a file.          [4 pts]│     │   │   (Fill-in-Blank)
│ │ │ Fill in the Blank                                             │     │   │
│ │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │     │   │
│ │ │ Accepted Answers: Ctrl, CTRL, ctrl                           │     │   │
│ │ │ [✏️ Edit] [🗑️ Delete] [💾 Save to Question Bank]            │     │   │
│ │ └───────────────────────────────────────────────────────────────┘     │   │
│ │                                                                         │   │
│ │ ... (7 more questions, collapsed)                                      │   │
│ └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│ [Cancel]                                    [Save as Draft] [Publish Quiz]     │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Question Editor Modal - MCQ Single Answer

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Edit Question - MCQ (Single Answer)                          [✕ Close]     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Question Text *                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ What is the keyboard shortcut for Copy in Windows?                 │   │ ← Rich text editor
│ │ [B] [I] [U] [Code] [• List] [1. List] [Link]                       │   │   (formatting toolbar)
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Options *                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ A) Ctrl + X                                         [🗑️ Remove]  │   │ ← Option 1
│ └─────────────────────────────────────────────────────────────────────┘   │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ 🔵 B) Ctrl + C  ✓ Correct Answer                     [🗑️ Remove]  │   │ ← Option 2 (Correct)
│ └─────────────────────────────────────────────────────────────────────┘   │   bg-green-50
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ C) Ctrl + V                                         [🗑️ Remove]  │   │ ← Option 3
│ └─────────────────────────────────────────────────────────────────────┘   │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ D) Ctrl + Z                                         [🗑️ Remove]  │   │ ← Option 4
│ └─────────────────────────────────────────────────────────────────────┘   │
│ [+ Add Option] (Max 6 options)                                             │
│                                                                             │
│ ┌───────────────────────────────┬───────────────────────────────────────┐ │
│ │ Points: [5]                   │ Tags: [keyboard] [shortcuts]          │ │
│ └───────────────────────────────┴───────────────────────────────────────┘ │
│                                                                             │
│ Explanation (Optional - shown after submission)                            │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Ctrl + C copies selected text to clipboard. Ctrl + X cuts it.      │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ [Cancel]                       [💾 Save to Question Bank] [Save Question]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Question Editor Modal - MCQ Multiple Answers

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Edit Question - MCQ (Multiple Answers)                       [✕ Close]     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Question Text *                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Which of the following are valid image file formats? (Select all)  │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Options * (Multiple correct answers allowed)                               │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☑ A) JPG  ✓ Correct Answer                           [🗑️ Remove]  │   │ ← Checkboxes for
│ └─────────────────────────────────────────────────────────────────────┘   │   multiple selection
│ ┌─────────────────────────────────────────────────────────────────────┐   │   bg-green-50
│ │ ☑ B) PNG  ✓ Correct Answer                           [🗑️ Remove]  │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☐ C) DOC                                              [🗑️ Remove]  │   │ ← Incorrect option
│ └─────────────────────────────────────────────────────────────────────┘   │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☑ D) GIF  ✓ Correct Answer                           [🗑️ Remove]  │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│ [+ Add Option]                                                              │
│                                                                             │
│ ⚠️ Note: Students must select ALL correct answers to get full points       │
│                                                                             │
│ Points: [8]   Partial Credit: ☑ Award partial points for some correct     │
│                                                                             │
│ [Cancel]                       [💾 Save to Question Bank] [Save Question]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Question Editor Modal - True/False

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Edit Question - True / False                              [✕ Close]        │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Statement *                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ The Recycle Bin permanently deletes files immediately.             │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Correct Answer *                                                            │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ True                                                              │   │
│ │ 🔵 False  ← Selected as correct                                     │   │ ← Radio buttons
│ └─────────────────────────────────────────────────────────────────────┘   │   bg-green-50
│                                                                             │
│ Points: [3]                                                                 │
│                                                                             │
│ Explanation (Optional)                                                      │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ The Recycle Bin temporarily stores deleted files. They can be      │   │
│ │ restored until the bin is emptied manually.                         │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ [Cancel]                       [💾 Save to Question Bank] [Save Question]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Question Editor Modal - Fill-in-the-Blank

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Edit Question - Fill in the Blank                        [✕ Close]         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Question Text * (Use _____ for blank)                                      │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ The keyboard shortcut _____ + S saves a file in Windows.           │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Accepted Answers * (Case-insensitive matching)                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ✓ Ctrl                                                [🗑️ Remove]  │   │ ← Answer 1
│ └─────────────────────────────────────────────────────────────────────┘   │   bg-green-50
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ✓ CTRL                                                [🗑️ Remove]  │   │ ← Answer 2 (variant)
│ └─────────────────────────────────────────────────────────────────────┘   │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ✓ ctrl                                                [🗑️ Remove]  │   │ ← Answer 3 (variant)
│ └─────────────────────────────────────────────────────────────────────┘   │
│ [+ Add Accepted Answer] (Max 5 variants)                                   │
│                                                                             │
│ Matching: ☑ Case-insensitive  ☑ Ignore extra spaces                       │
│                                                                             │
│ Points: [4]                                                                 │
│                                                                             │
│ [Cancel]                       [💾 Save to Question Bank] [Save Question]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Question Bank - Reusable Questions Library

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Question Bank                                   [+ Add to Current Quiz]    │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ [All Types ▼] [All Tags ▼] [🔍 Search questions...]                       │ ← Filters
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☐ What is RAM used for in a computer?                    [MCQ] [5pts]│   │ ← Question 1
│ │    Tags: hardware, memory • Used in 3 quizzes                       │   │   (Checkbox to add)
│ │    [👁️ Preview] [✏️ Edit] [🗑️ Delete]                              │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☐ A CPU processes data faster than RAM. [True/False] [T/F] [3pts]  │   │ ← Question 2
│ │    Tags: hardware, cpu • Used in 2 quizzes                          │   │
│ │    [👁️ Preview] [✏️ Edit] [🗑️ Delete]                              │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☑ The keyboard shortcut _____ + S saves a file. [Fill] [4pts]      │   │ ← Question 3 (Selected)
│ │    Tags: keyboard, shortcuts • Used in 5 quizzes                    │   │   bg-blue-50
│ │    [👁️ Preview] [✏️ Edit] [🗑️ Delete]                              │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ... (more questions, scrollable)                                           │
│                                                                             │
│ 1 question selected                                                         │
│ [Add Selected to Quiz]                                        [Close]      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Quiz Preview Mode - Student View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Quiz Preview: File Management Basics                      [✕ Exit Preview] │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ⏱️ Time Remaining: 14:35                     Question 1 of 10             │ ← Timer & Progress
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Question 1 (5 points)                                                       │
│                                                                             │
│ What is the keyboard shortcut for Copy in Windows?                         │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ A) Ctrl + X                                                       │   │ ← Options
│ └─────────────────────────────────────────────────────────────────────┘   │   (Student selects)
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ B) Ctrl + C                                                       │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ C) Ctrl + V                                                       │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚪ D) Ctrl + Z                                                       │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ [← Previous]                                                   [Next →]    │ ← Navigation
│                                                                             │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ⚠️ PREVIEW MODE: This is how students will see the quiz                    │
│ [Submit Quiz] (Preview only - won't save results)                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Drag-and-Drop Question Reordering

```
State 1: NORMAL (Idle)
┌───────────────────────────────────────────────────────────────┐
│ Q1. What is the keyboard shortcut for Copy?             [⋮]  │ ← Drag handle
│ MCQ - Single Answer                                      5 pts │   on right
└───────────────────────────────────────────────────────────────┘

State 2: DRAGGING (Question Picked Up)
┌───────────────────────────────────────────────────────────────┐
│ Q1. What is the keyboard shortcut for Copy?             [⋮]  │ ← bg-purple-100
│ MCQ - Single Answer                                      5 pts │   border-2 purple-500
└───────────────────────────────────────────────────────────────┘   shadow-2xl
                                                                     opacity-90

State 3: DROP ZONE (Valid Drop Target)
┌───────────────────────────────────────────────────────────────┐
│ Q2. The Recycle Bin permanently deletes files.          [⋮]  │
└───────────────────────────────────────────────────────────────┘

┌ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┐
│ Drop here to reorder                                          │ ← border-dashed-2
└ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┄ ┘   border-purple-400
                                                                  bg-purple-50
┌───────────────────────────────────────────────────────────────┐
│ Q3. Fill in the blank: _____ + S saves a file.          [⋮]  │
└───────────────────────────────────────────────────────────────┘

State 4: DROPPED (After Release)
Questions reordered:
Q2 → Q1 (moved up)
Q1 → Q2 (moved down)
Toast: "Question reordered successfully!"
Auto-save triggered
```

### Quiz Settings Panel - Detailed View

```
┌───────────────────────────────────────────────────────────────┐
│ QUIZ SETTINGS                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                               │
│ ⏱️ Time Limit                                                 │
│ ┌─────────────────────┐                                      │
│ │ [15] minutes        │  ← Number input                      │
│ └─────────────────────┘                                      │
│ ☑ Enable time limit    ☐ No time limit                       │
│                                                               │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                               │
│ 📊 Passing Score                                              │
│ ┌─────────────────────┐                                      │
│ │ [70] %              │  ← Number input (0-100)              │
│ └─────────────────────┘                                      │
│ Students must score 70% or higher to pass                    │
│                                                               │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                               │
│ 🔀 Randomization                                              │
│ ☑ Randomize question order                                   │
│ ☑ Randomize option order (for MCQ questions)                 │
│ ☐ Show questions one at a time (no back navigation)          │
│                                                               │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                               │
│ 📝 Results & Feedback                                         │
│ When to show results:                                         │
│ ⚪ Immediately after submission                               │
│ 🔵 After all students complete (delayed feedback)            │
│ ⚪ Never (manual release by admin/coach)                      │
│                                                               │
│ What to show in results:                                      │
│ ☑ Total score (e.g., "85%")                                  │
│ ☑ Per-question correctness (✓/✗)                             │
│ ☑ Correct answers                                             │
│ ☑ Explanations (if provided)                                  │
│                                                               │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                               │
│ 🔄 Attempts                                                    │
│ ┌─────────────────────┐                                      │
│ │ [3] attempts        │  ← Number input                      │
│ └─────────────────────┘                                      │
│ ☐ Unlimited attempts                                          │
│                                                               │
│ Between attempts: Wait [30] minutes                           │
└───────────────────────────────────────────────────────────────┘
```

### Component Measurements

| Element | Width | Height | Padding | Margin | Border |
|---------|-------|--------|---------|--------|--------|
| Quiz Card | 100% | 100px | p-6 | mb-4 | 2px gray-300 rounded-xl |
| Question Card (Collapsed) | 100% | 80px | p-4 | mb-3 | 1px gray-200 rounded-lg |
| Question Card (Expanded) | 100% | auto | p-6 | mb-4 | 2px purple-200 rounded-lg bg-purple-50 |
| Question Editor Modal | 720px | auto | p-8 | mx-auto | 2px gray-300 rounded-xl shadow-2xl |
| MCQ Option Row | 100% | 56px | p-4 | mb-2 | 1px gray-200 rounded hover:bg-gray-50 |
| Settings Panel | 360px | auto | p-6 | - | 2px gray-200 rounded-xl bg-gray-50 |
| Preview Modal | 960px | auto | p-8 | mx-auto | 2px gray-300 rounded-xl |

---

## 2. Acceptance Criteria

### 2.1. Quiz CRUD Operations

- [ ] **CRUD-01:** Admin can create new quiz via "+ Create New Quiz" button
- [ ] **CRUD-02:** Quiz creation form validates required fields (title, at least 1 question)
- [ ] **CRUD-03:** Quiz saves to MongoDB with status="draft"
- [ ] **CRUD-04:** Admin can edit quiz metadata (title, description, settings)
- [ ] **CRUD-05:** Admin can duplicate quiz (creates copy with " - Copy" suffix)
- [ ] **CRUD-06:** Admin can delete quiz (shows confirmation: "Delete this quiz? Cannot be undone.")
- [ ] **CRUD-07:** Quiz associates with specific course chapter via dropdown

### 2.2. Question Builder - MCQ Single Answer

- [ ] **MCQ-01:** MCQ question editor opens with 4 default options (A, B, C, D)
- [ ] **MCQ-02:** Admin can add up to 6 options total via "+ Add Option"
- [ ] **MCQ-03:** Admin can remove options (minimum 2 options required)
- [ ] **MCQ-04:** Exactly one option must be marked as correct (radio buttons)
- [ ] **MCQ-05:** Correct option highlights with green background (bg-green-50)
- [ ] **MCQ-06:** Rich text editor supports bold, italic, underline, code, lists, links
- [ ] **MCQ-07:** Points field accepts numbers 1-100
- [ ] **MCQ-08:** Explanation field optional (shown to students after submission)

### 2.3. Question Builder - MCQ Multiple Answers

- [ ] **MCQM-01:** Multiple answer editor uses checkboxes instead of radio buttons
- [ ] **MCQM-02:** At least 2 options must be marked as correct
- [ ] **MCQM-03:** "Partial Credit" checkbox enables fractional scoring
- [ ] **MCQM-04:** With partial credit: students get points for each correct selection
- [ ] **MCQM-05:** Without partial credit: students must select ALL correct options to get any points
- [ ] **MCQM-06:** Warning displays: "Students must select ALL correct answers to get full points"

### 2.4. Question Builder - True/False

- [ ] **TF-01:** True/False editor shows statement input field
- [ ] **TF-02:** Radio buttons for True/False selection (one must be selected as correct)
- [ ] **TF-03:** Correct answer highlights with green background
- [ ] **TF-04:** Points field defaults to 3 points
- [ ] **TF-05:** Explanation field optional

### 2.5. Question Builder - Fill-in-the-Blank

- [ ] **FILL-01:** Question text must contain at least one blank (_____)
- [ ] **FILL-02:** Admin can add multiple accepted answers (variations like "Ctrl", "CTRL", "ctrl")
- [ ] **FILL-03:** Maximum 5 accepted answer variants per question
- [ ] **FILL-04:** Case-insensitive matching checkbox (default: enabled)
- [ ] **FILL-05:** "Ignore extra spaces" checkbox trims whitespace before matching
- [ ] **FILL-06:** Validation error if no accepted answers provided

### 2.6. Question Bank

- [ ] **BANK-01:** "Save to Question Bank" button saves question to reusable library
- [ ] **BANK-02:** Question Bank modal displays all saved questions with filters (type, tags, search)
- [ ] **BANK-03:** Checkbox selection enables adding multiple questions at once
- [ ] **BANK-04:** "Add Selected to Quiz" button inserts questions into current quiz
- [ ] **BANK-05:** Question usage count displays (e.g., "Used in 3 quizzes")
- [ ] **BANK-06:** Editing banked question shows warning: "This question is used in X quizzes. Changes will affect all."
- [ ] **BANK-07:** Deleting banked question requires confirmation if used in active quizzes

### 2.7. Drag-and-Drop Question Reordering

- [ ] **DND-01:** Questions can be dragged via drag handle (⋮)
- [ ] **DND-02:** Dragging question highlights with purple border and shadow
- [ ] **DND-03:** Drop zone shows dashed purple border between questions
- [ ] **DND-04:** Dropping reorders questions and auto-saves
- [ ] **DND-05:** Toast notification: "Question reordered successfully!"
- [ ] **DND-06:** Question numbers update automatically after reordering

### 2.8. Quiz Settings

- [ ] **SET-01:** Time limit input validates numbers 1-180 minutes
- [ ] **SET-02:** "No time limit" checkbox disables time limit input
- [ ] **SET-03:** Passing score validates percentage 0-100
- [ ] **SET-04:** Randomization checkboxes toggle independently
- [ ] **SET-05:** "Show questions one at a time" disables back navigation in student view
- [ ] **SET-06:** Results timing radio buttons: Immediate, After all complete, Manual release
- [ ] **SET-07:** Results display checkboxes toggle what students see (score, correctness, answers, explanations)
- [ ] **SET-08:** Attempts field validates numbers 1-10 or unlimited
- [ ] **SET-09:** "Wait between attempts" field validates minutes 0-1440

### 2.9. Quiz Preview

- [ ] **PREV-01:** "Preview" button opens quiz in student view mode
- [ ] **PREV-02:** Preview shows timer if time limit enabled
- [ ] **PREV-03:** Questions display in configured order (sequential or randomized)
- [ ] **PREV-04:** Options display in configured order (original or randomized)
- [ ] **PREV-05:** Navigation buttons (Previous, Next) work correctly
- [ ] **PREV-06:** "Submit Quiz" button in preview does NOT save results (preview only)
- [ ] **PREV-07:** Banner shows: "⚠️ PREVIEW MODE: This is how students will see the quiz"
- [ ] **PREV-08:** Exit preview returns to quiz editor

### 2.10. Quiz Publishing

- [ ] **PUB-01:** "Publish Quiz" button validates required fields (title, ≥1 question, associated chapter)
- [ ] **PUB-02:** Validation errors display in modal: "Cannot publish: Missing required fields"
- [ ] **PUB-03:** Published quizzes appear in student course content
- [ ] **PUB-04:** Published quizzes can still be edited (changes apply immediately)
- [ ] **PUB-05:** "Unpublish" option changes status back to draft (hides from students)

### 2.11. Performance & Accessibility

- [ ] **PERF-01:** Quiz list loads within 2 seconds (up to 100 quizzes)
- [ ] **PERF-02:** Question editor opens within 1 second
- [ ] **PERF-03:** Auto-save triggers 1 second after last change (debounced)
- [ ] **ACC-01:** Keyboard navigation: Tab between fields, Enter to submit, Esc to cancel
- [ ] **ACC-02:** Screen reader announces question types and correct answers
- [ ] **ACC-03:** Color contrast meets WCAG AA (green correct answer bg has sufficient contrast)

---

## 3. Task Breakdown (Abbreviated for Length)

### Phase 1: Quiz Dashboard & CRUD (2 hours)
**Task 1:** Create `QuizDashboard.jsx` - List view, filters, CRUD operations
**Task 2:** Create `QuizCreationModal.jsx` - Metadata form, course association

### Phase 2: Question Builders (4-5 hours)
**Task 3:** Build `MCQEditor.jsx` - Single/multiple answer support
**Task 4:** Build `TrueFalseEditor.jsx` - Statement and answer selection
**Task 5:** Build `FillBlankEditor.jsx` - Blank detection, accepted answers
**Task 6:** Implement rich text editor (Quill or TipTap library)

### Phase 3: Question Bank (1.5 hours)
**Task 7:** Create `QuestionBank.jsx` - Library view, filters, selection
**Task 8:** Implement save/load from question bank

### Phase 4: Drag-and-Drop & Settings (1.5 hours)
**Task 9:** Implement question reordering (react-beautiful-dnd)
**Task 10:** Build `QuizSettingsPanel.jsx` - All configuration options

### Phase 5: Preview & Publishing (1 hour)
**Task 11:** Create `QuizPreview.jsx` - Student view simulation
**Task 12:** Implement publish validation and workflow

---

## 4. API Endpoints (Abbreviated)

**POST `/api/v2/lms/admin/quizzes`** - Create quiz
**PUT `/api/v2/lms/admin/quizzes/:quizId`** - Update quiz
**DELETE `/api/v2/lms/admin/quizzes/:quizId`** - Delete quiz
**GET `/api/v2/lms/admin/question-bank`** - Fetch question library
**POST `/api/v2/lms/admin/question-bank`** - Save question to bank
**PUT `/api/v2/lms/admin/quizzes/:quizId/publish`** - Publish quiz

---

## 5. File Paths (Abbreviated)

```
frontend/src/components/admin/
├── QuizDashboard.jsx
├── QuizBuilder.jsx
├── MCQEditor.jsx
├── TrueFalseEditor.jsx
├── FillBlankEditor.jsx
├── QuestionBank.jsx
├── QuizSettingsPanel.jsx
└── QuizPreview.jsx

backend/models/
└── Quizzes.js

backend/controllers/
└── quizController.js
```

---

## 6. Definition of Done

- [ ] All quiz question types functional (MCQ single/multiple, T/F, fill-in-blank)
- [ ] Question bank save/load works
- [ ] Drag-and-drop reordering works
- [ ] Quiz preview shows student view accurately
- [ ] Publish validation prevents incomplete quizzes
- [ ] Unit tests: 80%+ coverage
- [ ] E2E tests: Quiz creation → question adding → preview → publish flow
- [ ] Code peer-reviewed
- [ ] Merged to `develop`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:04:45
- **Status:** Draft - Ready for Development

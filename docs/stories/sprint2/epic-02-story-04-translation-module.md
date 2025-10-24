# Epic 02 - Story 04: Translation Module

**Story ID:** SPRINT2-EPIC02-STORY04
**Epic:** Epic 02 - LMS Admin Course Management
**Sprint:** Sprint 2
**Story Name:** Translation Module (English → Telugu)
**Estimated Effort:** 6-8 hours (1 development day)
**Priority:** Medium (P2)
**Dependencies:**
- Sprint 1.1 RBAC (admin authentication)
- Story 01 (Course structure with content items)
- Backend: MongoDB Courses collection with translations field

**Last Updated:** 2025-10-24 15:09:59
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As an** Administrator
**I want to** add Telugu translations for course content side-by-side with English
**So that** Telugu-speaking students can learn in their native language

### 1.2. Story Context

This story implements the translation management interface for localizing English course content to Telugu. Administrators can:

- **Select Course for Translation:** Choose published course from dropdown
- **Side-by-Side Editor:** View English (read-only) and Telugu (editable) fields simultaneously
- **Translation Progress Tracking:** Visual progress indicator (% translated)
- **Mark as Translated/Skip:** Mark items complete or skip for later
- **Batch Operations:** Translate multiple items efficiently
- **Publish Translations:** Make Telugu content live for students
- **Supported Content Types:**
  - Course titles and descriptions
  - Module, chapter, content item titles
  - Video/audio transcripts and descriptions
  - Quiz questions and options
  - PDF summaries
  - Text content

### 1.3. Key Features

- **Course Selection:** Dropdown of all published courses
- **Translation Queue:** List of untranslated/partially translated items
- **Side-by-Side Editor:** English (left, read-only) + Telugu (right, editable)
- **Progress Indicator:** Shows % complete per course (e.g., "45 of 120 items translated - 37%")
- **Navigation:** Previous/Next buttons to move through content items
- **Auto-Save:** Translations save automatically (debounced 1 second)
- **Mark Complete:** "Mark as Translated" checkbox updates progress
- **Skip Button:** Skip current item, move to next untranslated
- **Publish Workflow:** "Publish Translations" button makes Telugu content live
- **Validation:** Required field check before marking complete

---

## 1.5. Visual Layout Diagrams

### Translation Dashboard - Course Selection

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Translation Management                                        Admin: A      │ ← Header
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   (bg-purple-600)
│                                                                             │
│ Select Course to Translate:                                                 │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Advanced Computer Apps                                          ▼  │   │ ← Course dropdown
│ └─────────────────────────────────────────────────────────────────────┘   │   (shows published
│                                                                             │    courses only)
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Translation Progress                                                │   │ ← Progress Card
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │   (bg-blue-50)
│ │                                                                     │   │
│ │ ████████████████░░░░░░░░░░░░░░░░░░░░ 45 / 120 items (37%)         │   │ ← Progress bar
│ │                                                                     │   │
│ │ ✓ Course Title: Translated                                         │   │ ← Checklist
│ │ ✓ Course Description: Translated                                   │   │
│ │ ⏳ Module Titles: 2 / 3 translated                                  │   │
│ │ ⏳ Chapter Titles: 8 / 12 translated                                │   │
│ │ ⏳ Content Items: 35 / 105 translated                               │   │
│ │   - Video Titles: 15 / 40                                          │   │
│ │   - Video Descriptions: 10 / 40                                    │   │
│ │   - Quiz Questions: 10 / 25                                        │   │
│ │                                                                     │   │
│ │ [Start Translating]                                                │   │ ← Button
│ └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Translation Editor - Side-by-Side Interface

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Translation Editor: Advanced Computer Apps                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                                     │
│ Progress: 45 / 120 items (37%) ████████████░░░░░░░░░░░░░░░░░ [💾 Saved]           │ ← Progress bar
│                                                                                     │   + save indicator
│ ┌─────────────────────────────────────────────────────────────────────────────┐   │
│ │ Translating: Module 1 > Chapter 2 > Video: Document Basics              1/120│   │ ← Current item
│ └─────────────────────────────────────────────────────────────────────────────┘   │   breadcrumb
│                                                                                     │
│ ┌───────────────────────────────────┬───────────────────────────────────────────┐ │
│ │ ENGLISH (Original) 🔒              │ TELUGU (Translation) ✏️                   │ │ ← 2-column layout
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                   │                                           │ │
│ │ Title:                            │ Title:                                    │ │
│ │ ┌───────────────────────────────┐ │ ┌───────────────────────────────────────┐ │ │
│ │ │ Document Basics               │ │ │ పత్రం ప్రాథమికాలు                        │ │ │ ← Text inputs
│ │ └───────────────────────────────┘ │ └───────────────────────────────────────┘ │ │   (English: read-only)
│ │ (Read-only, gray background)      │ (Editable, white background)              │ │   (Telugu: editable)
│ │                                   │                                           │ │
│ │ Description:                      │ Description:                              │ │
│ │ ┌───────────────────────────────┐ │ ┌───────────────────────────────────────┐ │ │
│ │ │ Learn how to create and      ││ │ │ మీ కంప్యూటర్‌లో డాక్యుమెంట్లను        ││ │ │ ← Textareas
│ │ │ manage documents in Windows. ││ │ │ ఎలా సృష్టించాలి మరియు నిర్వహించాలో    ││ │ │   (120px height)
│ │ │ This video covers file       ││ │ │ నేర్చుకోండి. ఈ వీడియో ఫైల్ సృష్టి,      ││ │ │
│ │ │ creation, saving, and        ││ │ │ సేవ్ చేయడం మరియు డిలీట్ చేయడం          ││ │ │
│ │ │ deletion.                    ││ │ │ గురించి వివరిస్తుంది.                   ││ │ │
│ │ └───────────────────────────────┘ │ └───────────────────────────────────────┘ │ │
│ │                                   │                                           │ │
│ │ Duration: 5:32                    │ Duration: 5:32 (Not translatable)         │ │
│ │ File Type: Video (MP4)            │                                           │ │
│ └───────────────────────────────────┴───────────────────────────────────────────┘ │
│                                                                                     │
│ ┌─────────────────────────────────────────────────────────────────────────────┐   │
│ │ ☑ Mark as Translated (saves and moves to next untranslated item)           │   │ ← Checkbox
│ └─────────────────────────────────────────────────────────────────────────────┘   │   (auto-advances)
│                                                                                     │
│ [← Previous]  [Skip (move to next)]  [Save & Next →]  [Publish All Translations]  │ ← Action buttons
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Translation Editor - Quiz Question Translation

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Translation Editor: Advanced Computer Apps                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                                     │
│ Progress: 55 / 120 items (46%) ████████████████░░░░░░░░░░░░ [💾 Saved]             │
│                                                                                     │
│ ┌─────────────────────────────────────────────────────────────────────────────┐   │
│ │ Translating: Module 1 > Chapter 2 > Quiz: Document Basics > Q1         55/120│   │
│ └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│ ┌───────────────────────────────────┬───────────────────────────────────────────┐ │
│ │ ENGLISH (Original) 🔒              │ TELUGU (Translation) ✏️                   │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                   │                                           │ │
│ │ Question Text:                    │ Question Text:                            │ │
│ │ ┌───────────────────────────────┐ │ ┌───────────────────────────────────────┐ │ │
│ │ │ What is the keyboard shortcut││ │ │ విండోస్‌లో కాపీ కోసం కీబోర్డ్          ││ │ │
│ │ │ for Copy in Windows?         ││ │ │ షార్ట్‌కట్ ఏమిటి?                     ││ │ │
│ │ └───────────────────────────────┘ │ └───────────────────────────────────────┘ │ │
│ │                                   │                                           │ │
│ │ Options:                          │ Options:                                  │ │
│ │ ┌───────────────────────────────┐ │ ┌───────────────────────────────────────┐ │ │
│ │ │ A) Ctrl + X                  ││ │ │ A) Ctrl + X                          ││ │ │ ← Option A
│ │ └───────────────────────────────┘ │ └───────────────────────────────────────┘ │ │   (shortcut not
│ │ ┌───────────────────────────────┐ │ ┌───────────────────────────────────────┐ │ │    translated)
│ │ │ B) Ctrl + C  ✓ Correct       ││ │ │ B) Ctrl + C  ✓ సరైనది               ││ │ │ ← Option B
│ │ └───────────────────────────────┘ │ └───────────────────────────────────────┘ │ │   (Correct badge)
│ │ ┌───────────────────────────────┐ │ ┌───────────────────────────────────────┐ │ │
│ │ │ C) Ctrl + V                  ││ │ │ C) Ctrl + V                          ││ │ │ ← Option C
│ │ └───────────────────────────────┘ │ └───────────────────────────────────────┘ │ │
│ │ ┌───────────────────────────────┐ │ ┌───────────────────────────────────────┐ │ │
│ │ │ D) Ctrl + Z                  ││ │ │ D) Ctrl + Z                          ││ │ │ ← Option D
│ │ └───────────────────────────────┘ │ └───────────────────────────────────────┘ │ │
│ │                                   │                                           │ │
│ │ Explanation:                      │ Explanation:                              │ │
│ │ ┌───────────────────────────────┐ │ ┌───────────────────────────────────────┐ │ │
│ │ │ Ctrl + C copies selected text││ │ │ Ctrl + C ఎంచుకున్న టెక్స్ట్‌ను        ││ │ │
│ │ │ to clipboard.                ││ │ │ క్లిప్‌బోర్డ్‌కు కాపీ చేస్తుంది.       ││ │ │
│ │ └───────────────────────────────┘ │ └───────────────────────────────────────┘ │ │
│ └───────────────────────────────────┴───────────────────────────────────────────┘ │
│                                                                                     │
│ ☑ Mark as Translated                                                               │
│                                                                                     │
│ [← Previous]  [Skip]  [Save & Next →]  [Publish All Translations]                  │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Translation Queue - Filtering & Navigation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Translation Queue                                                           │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ [All Items ▼] [All Types ▼] [🔍 Search...]                                │ ← Filters
│   Options:      Options:                                                   │
│   - All Items   - All Types                                                │
│   - Untranslated- Modules                                                  │
│   - Translated  - Chapters                                                 │
│   - In Progress - Videos                                                   │
│               - Quizzes                                                     │
│               - Text Content                                                │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⏳ Module 1: Introduction to MS Word                     [Translate] │   │ ← Untranslated
│ │    Status: Not Started                                               │   │   (yellow icon)
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ⚠️ Chapter 1: Document Basics                            [Continue]  │   │ ← In Progress
│ │    Status: 3 / 8 items translated (37%)                             │   │   (orange icon)
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ✓ Chapter 2: File Management                             [Review]   │   │ ← Translated
│ │    Status: Completed • Translated: Oct 24, 2025                     │   │   (green icon)
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ... (more items)                                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Publish Translations - Confirmation Modal

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Publish Translations                                        [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Course: Advanced Computer Apps                                             │
│                                                                             │
│ Translation Summary:                                                        │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ✓ Course Title: Translated                                          │   │ ← Summary checklist
│ │ ✓ Course Description: Translated                                    │   │
│ │ ✓ Module Titles: 3 / 3 translated (100%)                            │   │
│ │ ⚠️ Chapter Titles: 10 / 12 translated (83%)                          │   │
│ │ ⚠️ Content Items: 80 / 105 translated (76%)                          │   │
│ │   - Video Titles: 35 / 40 (87%)                                     │   │
│ │   - Video Descriptions: 30 / 40 (75%)                               │   │
│ │   - Quiz Questions: 15 / 25 (60%)                                   │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ⚠️ Warning: 25 items are not yet translated. These will remain in English  │ ← Warning banner
│    for Telugu-speaking students until translation is complete.             │   (bg-yellow-50)
│                                                                             │
│ Publishing will:                                                            │
│ • Make all translated content immediately visible to Telugu students       │
│ • Update course language dropdown to include "తెలుగు" (Telugu) option      │
│ • Allow students to switch between English and Telugu dynamically          │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☑ I have reviewed all translations for accuracy                     │   │ ← Confirmation checkbox
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ [Cancel]                                          [Publish Translations]    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Auto-Save Indicator & States

```
State 1: IDLE (No changes)
┌─────────────────────────────────────────────┐
│ Progress: 45 / 120 (37%) [💾 Saved]        │ ← Green checkmark
└─────────────────────────────────────────────┘   Text: "Saved"
                                                   Color: text-green-600

State 2: EDITING (Changes detected)
┌─────────────────────────────────────────────┐
│ Progress: 45 / 120 (37%) [✏️ Editing...]   │ ← Pencil icon
└─────────────────────────────────────────────┘   Text: "Editing..."
                                                   Color: text-blue-600

State 3: SAVING (1 second after last keystroke)
┌─────────────────────────────────────────────┐
│ Progress: 45 / 120 (37%) [⏳ Saving...]    │ ← Loading spinner
└─────────────────────────────────────────────┘   Text: "Saving..."
                                                   Color: text-orange-600

State 4: SAVED (After successful save)
┌─────────────────────────────────────────────┐
│ Progress: 45 / 120 (37%) [✓ Saved]         │ ← Returns to Saved state
└─────────────────────────────────────────────┘

State 5: ERROR (Save failed)
┌─────────────────────────────────────────────┐
│ Progress: 45 / 120 (37%) [❌ Save failed]  │ ← Red X icon
└─────────────────────────────────────────────┘   Text: "Save failed. Retry?"
                                                   Color: text-red-600
                                                   Shows [Retry] button
```

### Component Measurements

| Element | Width | Height | Padding | Margin | Border |
|---------|-------|--------|---------|--------|--------|
| Course Dropdown | 100% | 56px | px-4 py-3 | mb-6 | 2px gray-300 rounded-lg |
| Progress Card | 100% | auto | p-6 | mb-6 | 2px blue-200 rounded-xl bg-blue-50 |
| English Column | 50% | auto | p-6 | - | border-r-2 gray-200 |
| Telugu Column | 50% | auto | p-6 | - | - |
| Text Input (Title) | 100% | 48px | px-4 py-2 | mb-4 | 1px gray-300 rounded |
| Textarea (Description) | 100% | 120px | p-4 | mb-4 | 1px gray-300 rounded |
| Publish Modal | 720px | auto | p-8 | mx-auto | 2px gray-300 rounded-xl shadow-2xl |

---

## 2. Acceptance Criteria

### 2.1. Course Selection & Progress

- [ ] **SEL-01:** Course dropdown shows only published courses
- [ ] **SEL-02:** Selecting course loads translation progress card
- [ ] **SEL-03:** Progress bar shows % translated (e.g., "45 / 120 items - 37%")
- [ ] **SEL-04:** Progress breakdown shows counts for: course metadata, modules, chapters, content items, quizzes
- [ ] **SEL-05:** "Start Translating" button opens translation editor

### 2.2. Side-by-Side Translation Editor

- [ ] **EDIT-01:** English column displays content in read-only mode (gray background)
- [ ] **EDIT-02:** Telugu column displays editable inputs (white background)
- [ ] **EDIT-03:** Title fields limited to 100 characters (English length + 20%)
- [ ] **EDIT-04:** Description textareas support up to 1000 characters
- [ ] **EDIT-05:** Rich text formatting supported in Telugu (bold, italic, lists)
- [ ] **EDIT-06:** Special characters (Telugu Unicode) render correctly

### 2.3. Auto-Save & Validation

- [ ] **SAVE-01:** Auto-save triggers 1 second after last keystroke (debounced)
- [ ] **SAVE-02:** Save indicator shows: Editing → Saving → Saved (with icons)
- [ ] **SAVE-03:** Failed saves show error: "Save failed. Retry?" with [Retry] button
- [ ] **SAVE-04:** Retry button attempts save again (max 3 attempts)
- [ ] **SAVE-05:** Validation prevents empty Telugu fields if marked as translated

### 2.4. Navigation & Workflow

- [ ] **NAV-01:** "Previous" button navigates to previous item
- [ ] **NAV-02:** "Skip" button saves current progress and moves to next untranslated item
- [ ] **NAV-03:** "Save & Next" button saves and advances to next item (translated or untranslated)
- [ ] **NAV-04:** "Mark as Translated" checkbox updates progress, saves, and advances
- [ ] **NAV-05:** Progress bar updates immediately after marking complete
- [ ] **NAV-06:** Navigation wraps (last item → first item on Next)

### 2.5. Quiz Translation

- [ ] **QUIZ-01:** Quiz question text translates independently from options
- [ ] **QUIZ-02:** All MCQ options translate (A, B, C, D)
- [ ] **QUIZ-03:** Explanation field translates separately
- [ ] **QUIZ-04:** Correct answer indicator ("✓ Correct") shows in Telugu ("✓ సరైనది")
- [ ] **QUIZ-05:** Keyboard shortcuts (Ctrl + C) not translated (left as-is)

### 2.6. Translation Queue

- [ ] **QUEUE-01:** Queue displays all translatable items with status icons (⏳ untranslated, ⚠️ in progress, ✓ translated)
- [ ] **QUEUE-02:** Filter dropdown: All Items, Untranslated, Translated, In Progress
- [ ] **QUEUE-03:** Type filter: All Types, Modules, Chapters, Videos, Quizzes, Text Content
- [ ] **QUEUE-04:** Search input filters by English or Telugu content (real-time)
- [ ] **QUEUE-05:** Clicking item opens translation editor at that item

### 2.7. Publish Workflow

- [ ] **PUB-01:** "Publish All Translations" button opens confirmation modal
- [ ] **PUB-02:** Modal shows translation summary (% complete per content type)
- [ ] **PUB-03:** Warning displays if < 100% translated
- [ ] **PUB-04:** "I have reviewed all translations" checkbox required before publish
- [ ] **PUB-05:** Publish button updates course language field: `languages: ["en", "te"]`
- [ ] **PUB-06:** Published translations immediately visible to students
- [ ] **PUB-07:** Students see language toggle: "English | తెలుగు" (Telugu)

### 2.8. Performance & Accessibility

- [ ] **PERF-01:** Translation editor loads within 2 seconds
- [ ] **PERF-02:** Auto-save completes within 500ms
- [ ] **PERF-03:** Navigation between items < 1 second
- [ ] **ACC-01:** Keyboard navigation: Tab between fields, Ctrl+S to save manually
- [ ] **ACC-02:** Telugu Unicode font renders correctly (Noto Sans Telugu or similar)
- [ ] **ACC-03:** Screen reader announces translation status and progress

---

## 3. Task Breakdown (Abbreviated)

### Phase 1: Course Selection & Progress (1.5 hours)
**Task 1:** Create `TranslationDashboard.jsx` - Course dropdown, progress card

### Phase 2: Side-by-Side Editor (3 hours)
**Task 2:** Build `TranslationEditor.jsx` - 2-column layout, text inputs
**Task 3:** Implement auto-save with debounce (1 second delay)
**Task 4:** Build quiz question translation interface

### Phase 3: Navigation & Queue (1.5 hours)
**Task 5:** Implement Previous/Next/Skip navigation
**Task 6:** Build `TranslationQueue.jsx` - List view with filters

### Phase 4: Publish Workflow (1 hour)
**Task 7:** Create publish confirmation modal
**Task 8:** Update course language field on publish

### Phase 5: Testing (1 hour)
**Task 9:** Test Telugu Unicode rendering
**Task 10:** Test full translation workflow (select → translate → publish)

---

## 4. API Endpoints (Abbreviated)

**GET `/api/v2/lms/admin/courses/:courseId/translation-progress`** - Get translation status
**PUT `/api/v2/lms/admin/courses/:courseId/translate/:itemId`** - Save translation
**PUT `/api/v2/lms/admin/courses/:courseId/publish-translations`** - Publish all translations

---

## 5. File Paths (Abbreviated)

```
frontend/src/components/admin/
├── TranslationDashboard.jsx
├── TranslationEditor.jsx
├── TranslationQueue.jsx
└── PublishTranslationsModal.jsx

backend/controllers/
└── translationController.js
```

---

## 6. Definition of Done

- [ ] Course selection and progress tracking work
- [ ] Side-by-side translation editor functional
- [ ] Auto-save prevents data loss
- [ ] Quiz translation supports all question types
- [ ] Publish workflow makes Telugu content live
- [ ] Telugu Unicode renders correctly
- [ ] Unit tests: 80%+ coverage
- [ ] E2E tests: Translation workflow tested
- [ ] Code peer-reviewed
- [ ] Merged to `develop`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:09:59
- **Status:** Draft - Ready for Development

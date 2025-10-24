# Epic 02 - Story 05: Course Publishing & Archiving Workflow

**Story ID:** SPRINT2-EPIC02-STORY05
**Epic:** Epic 02 - LMS Admin Course Management
**Sprint:** Sprint 2
**Story Name:** Course Publishing & Archiving Workflow
**Estimated Effort:** 4-6 hours (0.5-1 development day)
**Priority:** High (P1)
**Dependencies:**
- Sprint 1.1 RBAC (admin authentication)
- Story 01 (Course structure and status management)
- Backend: MongoDB Courses collection

**Last Updated:** 2025-10-24 15:12:42
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As an** Administrator
**I want to** publish courses with validation checks and archive outdated courses
**So that** only complete, approved content is visible to students and old content can be hidden without data loss

### 1.2. Story Context

This story implements the course lifecycle management system. Administrators can:

- **Publish Validation:** Run pre-publish checks to ensure course completeness
- **Publishing:** Change status from Draft → Published (makes visible to coaches/students)
- **Unpublishing:** Revert Published → Draft (hides from students, admin-only visibility)
- **Archiving:** Change status to Archived (soft delete, data retained, hidden from all except admin)
- **Restoration:** Restore Archived → Published or Draft
- **Audit Trail:** Track status changes with timestamps and admin who performed action

### 1.3. Key Features

- **Validation Checks:** Pre-publish validation ensures:
  - Title and description filled
  - At least 1 module, 1 chapter, 1 content item
  - Thumbnail uploaded
  - All required fields complete
- **Status Badges:** Visual indicators (Draft: gray, Published: green, Archived: red)
- **Bulk Operations:** Publish/archive multiple courses at once
- **Confirmation Modals:** Warnings before destructive actions
- **Version Control:** Track publication history (published dates, unpublished dates)
- **Impact Analysis:** Show which students/coaches are affected by archiving
- **Scheduled Publishing:** (Future enhancement) Set publish date/time

---

## 1.5. Visual Layout Diagrams

### Publish Validation Modal

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Publish Course: Advanced Computer Apps                     [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Running validation checks...                                               │
│                                                                             │
│ ✓ Course Title: Advanced Computer Apps                                     │
│ ✓ Course Description: Present (320 characters)                             │
│ ✓ Category: Computer Apps                                                  │
│ ✓ Difficulty: Intermediate                                                 │
│ ✓ Thumbnail: Uploaded (1280x720, 450 KB)                                   │
│ ✓ Structure: 3 Modules, 12 Chapters, 45 Content Items                      │
│ ✓ Content: All items have titles and descriptions                          │
│ ⚠️ Translations: Telugu translations 76% complete (optional)                │
│ ✓ Quizzes: 5 quizzes with 50 questions total                               │
│                                                                             │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ✅ All required checks passed! Course is ready to publish.                  │
│                                                                             │
│ Publishing will:                                                            │
│ • Make course visible to coaches in assignment interface                   │
│ • Allow students to access course content                                  │
│ • Enable progress tracking and quiz taking                                 │
│ • Lock course structure (content can still be edited)                      │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☐ Send notification to all coaches about new course availability   │   │ ← Optional checkbox
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ [Cancel]                                              [Publish Course]      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Publish Validation Modal - With Errors

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Publish Course: Beginner Art Course                        [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ Running validation checks...                                               │
│                                                                             │
│ ✓ Course Title: Beginner Art Course                                        │
│ ✓ Course Description: Present (180 characters)                             │
│ ✓ Category: Art                                                            │
│ ✓ Difficulty: Beginner                                                     │
│ ❌ Thumbnail: Missing (required for publish)                                │ ← Error
│ ❌ Structure: Module 2 has no chapters                                      │ ← Error
│ ⚠️ Content: 3 videos missing descriptions                                   │ ← Warning
│ ❌ Quizzes: Quiz "Color Theory" has only 2 questions (minimum 5 required)   │ ← Error
│                                                                             │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ❌ Cannot publish: 3 errors must be fixed                                   │ ← Error summary
│                                                                             │   (bg-red-50)
│ Required Actions:                                                           │
│ 1. Upload a course thumbnail (1280x720 recommended)                        │
│ 2. Add at least 1 chapter to Module 2 or remove the module                 │
│ 3. Add at least 3 more questions to "Color Theory" quiz                    │
│                                                                             │
│ Optional Improvements:                                                      │
│ • Add descriptions to 3 videos for better student experience               │
│                                                                             │
│ [Cancel]                                              [Fix Issues]          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Archive Confirmation Modal - With Impact Analysis

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Archive Course: Old MS Office 2010 Course                  [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ⚠️ Warning: This action will hide the course from students and coaches     │
│                                                                             │
│ Impact Analysis:                                                            │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Students Currently Enrolled: 45 students                            │   │ ← Impact stats
│ │ • 12 students have completed the course (100%)                      │   │
│ │ • 18 students have in-progress work (40-99% complete)               │   │
│ │ • 15 students have just started (<40% complete)                     │   │
│ │                                                                     │   │
│ │ Coaches Using This Course: 3 coaches                                │   │
│ │ • Coach Priya (15 students assigned)                                │   │
│ │ • Coach Ravi (20 students assigned)                                 │   │
│ │ • Coach Meera (10 students assigned)                                │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ What happens when you archive:                                             │
│ ✓ Course hidden from new student enrollments                               │
│ ✓ Coaches cannot assign this course to new students                        │
│ ✓ Existing student progress and data retained (not deleted)                │
│ ✓ Students with in-progress work can still complete their work             │
│ ✓ Course visible only to admins in "Archived Courses" tab                  │
│ ✓ Can be restored later if needed                                          │
│                                                                             │
│ Reason for Archiving (Optional):                                           │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Outdated content - replaced by "MS Office 2019 Course"             │   │ ← Textarea
│ └─────────────────────────────────────────────────────────────────────┘   │   (notes field)
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☑ Notify coaches that this course has been archived                │   │ ← Checkbox
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ [Cancel]                                              [Archive Course]      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Restore Course Modal

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Restore Course: Old MS Office 2010 Course                  [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ This course was archived on Oct 15, 2025 by Admin Sai                      │
│ Reason: "Outdated content - replaced by MS Office 2019 Course"             │
│                                                                             │
│ Restore to:                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ 🔵 Published (visible to coaches and students immediately)          │   │ ← Radio buttons
│ │                                                                     │   │
│ │ ⚪ Draft (visible only to admins, requires re-publishing)           │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ If restored to Published:                                                   │
│ • Course immediately appears in coach assignment interface                 │
│ • Students can enroll and access content                                   │
│ • Previous enrollments remain intact (45 students still enrolled)          │
│                                                                             │
│ If restored to Draft:                                                       │
│ • Course visible only to admins for editing                                │
│ • Must pass validation checks before re-publishing                         │
│ • Previous enrollments retained but course inaccessible to students        │
│                                                                             │
│ [Cancel]                                              [Restore Course]      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Course List - Status Filter & Bulk Actions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Course Management                           [+ Create New Course]  Admin: A │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ [All Courses ▼] [Published ▼] [🔍 Search...]                              │ ← Status filter
│   Statuses:       Options:                                                 │
│   - All Courses   - All Status                                             │
│   - Draft (12)    - Draft                                                  │
│   - Published (35)- Published                                              │
│   - Archived (8)  - Archived                                               │
│                                                                             │
│ 3 courses selected                                           [Bulk Actions ▼]│ ← Bulk actions
│                                                              - Publish Selected│   (when items
│                                                              - Archive Selected│    are checked)
│                                                              - Delete Selected │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☑ [Thumbnail]  Advanced Computer Apps                  [Draft]  [⋮] │   │ ← Checkbox selection
│ │                Learn MS Office suite                                │   │
│ │                3 Modules • 12 Chapters • 45 Content Items           │   │
│ │                Created: Oct 20, 2025 • Last Updated: Oct 24, 2025  │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☑ [Thumbnail]  Beginner Art Course                     [Draft]  [⋮] │   │
│ │                Master drawing basics                                │   │
│ │                5 Modules • 18 Chapters • 60 Content Items           │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ ☑ [Thumbnail]  Spoken English Basics                   [Draft]  [⋮] │   │
│ │                Learn conversational English                         │   │
│ │                4 Modules • 15 Chapters • 50 Content Items           │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Course Audit Trail - Version History

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Course History: Advanced Computer Apps                     [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ 📅 Oct 24, 2025 at 3:15 PM                                          │   │ ← Timeline entry
│ │ 🟢 Status Changed: Draft → Published                                │   │   (most recent)
│ │ By: Admin Sai                                                       │   │
│ │ Note: "Content complete, ready for student access"                 │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ 📅 Oct 22, 2025 at 10:30 AM                                         │   │
│ │ ✏️ Content Updated: Added 5 new quiz questions                      │   │
│ │ By: Admin Priya                                                     │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ 📅 Oct 20, 2025 at 2:00 PM                                          │   │
│ │ 🟡 Status Changed: Published → Draft (Unpublished for editing)      │   │
│ │ By: Admin Sai                                                       │   │
│ │ Note: "Need to update quiz questions based on coach feedback"      │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ 📅 Oct 15, 2025 at 9:00 AM                                          │   │
│ │ 🟢 Status Changed: Draft → Published                                │   │
│ │ By: Admin Ravi                                                      │   │
│ │ Note: "Initial launch"                                              │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ 📅 Oct 10, 2025 at 11:30 AM                                         │   │
│ │ ✨ Course Created                                                    │   │
│ │ By: Admin Sai                                                       │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ [Export History]                                          [Close]          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Measurements

| Element | Width | Height | Padding | Margin | Border |
|---------|-------|--------|---------|--------|--------|
| Validation Modal | 720px | auto | p-8 | mx-auto | 2px gray-300 rounded-xl shadow-2xl |
| Archive Modal | 720px | auto | p-8 | mx-auto | 2px gray-300 rounded-xl shadow-2xl |
| Validation Check Row | 100% | 32px | py-2 | mb-1 | - |
| Impact Stats Card | 100% | auto | p-6 | mb-4 | 2px blue-200 rounded-xl bg-blue-50 |
| Timeline Entry | 100% | auto | p-4 | mb-3 | border-l-4 (status color) rounded-lg bg-gray-50 |
| Bulk Action Dropdown | 200px | auto | - | - | 2px gray-300 rounded-lg |

---

## 2. Acceptance Criteria

### 2.1. Publish Validation

- [ ] **VAL-01:** "Publish" button opens validation modal
- [ ] **VAL-02:** Validation checks run: title, description, category, difficulty, thumbnail, structure, content
- [ ] **VAL-03:** All checks display with ✓ (pass), ❌ (fail), or ⚠️ (warning)
- [ ] **VAL-04:** Required checks must pass (green ✓) before publishing
- [ ] **VAL-05:** Warning checks (⚠️) allow publishing but show improvement suggestions
- [ ] **VAL-06:** Error summary shows: "❌ Cannot publish: X errors must be fixed"
- [ ] **VAL-07:** "Fix Issues" button closes modal, highlights first error in course editor
- [ ] **VAL-08:** Successful validation shows: "✅ All required checks passed! Course is ready to publish."

### 2.2. Publishing Workflow

- [ ] **PUB-01:** "Publish Course" button changes status: draft → published
- [ ] **PUB-02:** Published course displays green "Published" badge
- [ ] **PUB-03:** Published course appears in coach assignment interface
- [ ] **PUB-04:** Published course visible to students in course catalog
- [ ] **PUB-05:** "Send notification to coaches" checkbox triggers email/in-app notification
- [ ] **PUB-06:** Publish timestamp recorded: `publishedAt: Date`
- [ ] **PUB-07:** Admin who published recorded: `publishedBy: ObjectId`

### 2.3. Unpublishing

- [ ] **UNPUB-01:** "Unpublish" option in context menu changes status: published → draft
- [ ] **UNPUB-02:** Confirmation modal shows impact: "X students currently enrolled will lose access"
- [ ] **UNPUB-03:** Unpublished course hidden from students and coaches
- [ ] **UNPUB-04:** Admin can still edit unpublished course
- [ ] **UNPUB-05:** Student progress data retained (not deleted)

### 2.4. Archiving

- [ ] **ARCH-01:** "Archive" button opens confirmation modal with impact analysis
- [ ] **ARCH-02:** Impact analysis shows: enrolled student count, coaches using course
- [ ] **ARCH-03:** Optional "Reason for Archiving" textarea saves to audit trail
- [ ] **ARCH-04:** "Notify coaches" checkbox triggers notifications
- [ ] **ARCH-05:** Archived course hidden from students and coaches
- [ ] **ARCH-06:** Archived course visible only in admin "Archived Courses" tab
- [ ] **ARCH-07:** Archived course displays red "Archived" badge
- [ ] **ARCH-08:** Archive timestamp recorded: `archivedAt: Date`
- [ ] **ARCH-09:** Students with in-progress work can complete (optional: configurable)

### 2.5. Restoration

- [ ] **REST-01:** "Restore" button in archived view opens restoration modal
- [ ] **REST-02:** Admin selects: Restore to Published OR Restore to Draft
- [ ] **REST-03:** Restore to Published: course immediately visible to coaches/students
- [ ] **REST-04:** Restore to Draft: course visible only to admin, requires re-validation
- [ ] **REST-05:** Previous student enrollments remain intact after restoration
- [ ] **REST-06:** Restoration logged in audit trail

### 2.6. Bulk Operations

- [ ] **BULK-01:** Checkboxes enable selecting multiple courses
- [ ] **BULK-02:** "Bulk Actions" dropdown appears when ≥1 course selected
- [ ] **BULK-03:** "Publish Selected" runs validation on all, publishes valid courses, shows errors for invalid
- [ ] **BULK-04:** "Archive Selected" opens confirmation showing total impact (all selected courses)
- [ ] **BULK-05:** "Delete Selected" requires additional confirmation: "⚠️ Permanent deletion cannot be undone"
- [ ] **BULK-06:** Progress indicator shows: "Publishing 3 of 5 courses... (60%)"

### 2.7. Audit Trail

- [ ] **AUDIT-01:** "View History" button opens timeline modal
- [ ] **AUDIT-02:** Timeline displays all status changes chronologically (newest first)
- [ ] **AUDIT-03:** Each entry shows: date/time, status change, admin who performed action, optional notes
- [ ] **AUDIT-04:** Timeline entries color-coded: green (published), yellow (unpublished), red (archived), blue (created)
- [ ] **AUDIT-05:** "Export History" button downloads CSV or PDF report

### 2.8. Performance & Accessibility

- [ ] **PERF-01:** Validation checks complete within 3 seconds (for courses up to 200 items)
- [ ] **PERF-02:** Publish action completes within 2 seconds
- [ ] **PERF-03:** Archive action completes within 2 seconds
- [ ] **ACC-01:** Keyboard navigation: Tab through buttons, Enter to confirm, Esc to cancel
- [ ] **ACC-02:** Screen reader announces validation results and status changes

---

## 3. Task Breakdown (Abbreviated)

### Phase 1: Validation System (1.5 hours)
**Task 1:** Create `PublishValidationModal.jsx` - Run checks, display results

### Phase 2: Status Change Workflows (2 hours)
**Task 2:** Implement publish workflow (with notification option)
**Task 3:** Implement unpublish workflow (with confirmation)
**Task 4:** Implement archive workflow (with impact analysis)

### Phase 3: Restoration & Audit Trail (1 hour)
**Task 5:** Build restore modal with Published/Draft selection
**Task 6:** Create `CourseAuditTrail.jsx` - Timeline display

### Phase 4: Bulk Operations (1 hour)
**Task 7:** Implement checkbox selection and bulk action dropdown
**Task 8:** Build bulk publish/archive handlers with progress indicator

### Phase 5: Testing (0.5 hours)
**Task 9:** Test full lifecycle: Draft → Published → Unpublished → Archived → Restored
**Task 10:** Test bulk operations with 10+ courses

---

## 4. API Endpoints (Abbreviated)

**PUT `/api/v2/lms/admin/courses/:courseId/validate`** - Run validation checks
**PUT `/api/v2/lms/admin/courses/:courseId/publish`** - Publish course
**PUT `/api/v2/lms/admin/courses/:courseId/unpublish`** - Unpublish course
**PUT `/api/v2/lms/admin/courses/:courseId/archive`** - Archive course
**PUT `/api/v2/lms/admin/courses/:courseId/restore`** - Restore archived course
**GET `/api/v2/lms/admin/courses/:courseId/audit-trail`** - Get history
**POST `/api/v2/lms/admin/courses/bulk-publish`** - Bulk publish
**POST `/api/v2/lms/admin/courses/bulk-archive`** - Bulk archive

---

## 5. File Paths (Abbreviated)

```
frontend/src/components/admin/
├── PublishValidationModal.jsx
├── ArchiveConfirmationModal.jsx
├── RestoreCourseModal.jsx
├── CourseAuditTrail.jsx
└── BulkActionsDropdown.jsx

backend/controllers/
└── coursePublishingController.js

backend/models/
└── CourseAuditLog.js  (NEW collection)
```

---

## 6. Definition of Done

- [ ] Publish validation prevents incomplete courses from going live
- [ ] Archive workflow shows impact analysis
- [ ] Restore functionality works for Published and Draft targets
- [ ] Audit trail tracks all status changes
- [ ] Bulk operations handle multiple courses efficiently
- [ ] Unit tests: 80%+ coverage
- [ ] E2E tests: Full lifecycle tested (Draft → Published → Archived → Restored)
- [ ] Code peer-reviewed
- [ ] Merged to `develop`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:12:42
- **Status:** Draft - Ready for Development

---

**Epic 02 Complete!** All 5 stories created with comprehensive visual diagrams.

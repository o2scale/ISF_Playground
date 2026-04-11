# Epic 03 - Story 05: Coach Course Content Browser (Read-Only)

**Story ID:** SPRINT2-EPIC03-STORY05
**Epic:** Epic 03 - LMS Coach Functionality
**Sprint:** Sprint 2
**Story Name:** Coach Course Content Browser (Read-Only)
**Estimated Effort:** 1.5-2 hours (~95 minutes focused work)
**Priority:** Medium (P2) — fills a reported UX gap; no external dependency blocks it
**Dependencies:**
- Sprint 1.1 RBAC (coach authentication, Balagruha scope)
- Epic 02 Story 01 (Course Creation Structure Builder — provides the admin components this story reuses)
- Epic 02 Story 02 (Content Management Module — provides `ContentItemCard` with built-in media preview)
- Epic 03 Story 01 (Course Assignment Interface — provides the `CourseAssignment` collection used for scoping)
- Backend: MongoDB Course + CourseAssignment collections

**Last Updated:** 2026-04-11
**Status:** Done — 2026-04-11 — commits bbee201b, a5ee2c62, b1b6d1df
**Origin:** QA bug report — "Coach / Empty Course Folders — The Courses section appears incomplete as no content is visible in the folders" (Round 2 triage, 2026-04-11)

---

## 1. Story Description & User Story

### 1.1. User Story

**As a** Coach
**I want to** browse the full content of courses currently assigned to my Balagruhas (modules, chapters, videos, PDFs, audio, images, quizzes) in read-only mode
**So that** I can preview what students will see before assigning, help students who are stuck on specific content, and use lesson material as context during grading

### 1.2. Story Context

This story closes a real product gap surfaced during Round 2 QA triage. Today:

- **Admins** have a fully-featured course browser at `/admin/courses` with drilldown into module → chapter → content item hierarchy, plus a built-in embedded preview modal for video/audio/image/PDF content
- **Students** see assigned courses in their dashboard with full content access
- **Coaches** have `/coach/assignments` (list of assignment *records* with student counts and progress stats) and `/coach/grading` (submission queue) — but **no way to see the actual course content their students are learning**

When a coach needs to:
1. **Preview before assigning** — "What's actually in Computer Applications? Is it age-appropriate for my 5th graders?"
2. **Support a stuck student** — "The student says they can't finish Module 2, Chapter 3. What's in that chapter?"
3. **Ground grading context** — "This art submission is for 'Tree Anatomy Lesson 4'. What were the lesson instructions?"

…they currently cannot. They can see metadata ("25 students assigned, 3 started") but not content. The QA tester reported this as "Empty Course Folders" on the coach nav — they clicked the "Courses" nav item (which actually points to `/coach/grading`) and saw an empty grading queue, interpreting the mislabeling + empty state as broken folders.

### 1.3. Key Features

- **Balagruha-Scoped Course List:** Coach sees only courses currently actively assigned to one or more of their assigned Balagruhas (via `CourseAssignment` join), not all published courses
- **Admin Component Reuse:** Reuses `CourseListView`, `CourseStructureBuilder`, `ModuleCard`, `ChapterCard`, `ContentItemCard` with a new `readOnly` prop
- **Read-Only Gating:** Add/Edit/Delete/Publish/Archive/Duplicate/Reorder actions hidden in read-only mode; navigation and preview paths kept active
- **Content Preview:** Reuses the existing embedded preview modal in `ContentItemCard` for video (HTML5 player), audio (HTML5 player), image (responsive), and PDF (iframe)
- **Nav Split:** Coach nav "Courses" is currently mislabeled and points to `/coach/grading`. Split into two entries: new "Courses" → `/coach/courses` (this story), and rename existing to "Grading" → `/coach/grading`
- **No Quiz Content View (v1):** Quiz content items display metadata only; clicking Preview is a no-op with a toast. Quiz editor is admin-only (a future story can add a student-mode quiz preview)
- **RBAC:** New `LMS Management: Read` action on coach role with `scope: 'balagruh'`, enforced server-side

---

## 1.5. Visual Layout Diagrams

### Coach Course List - Main View (`/coach/courses`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Hi Coach Priya                                                 [Logout]     │ ← Top Banner
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ Dashboard | ... | Courses | Grading | Assignments | ...                    │ ← Nav (new Courses link)
│                                                                             │
│ Courses in Your Balagruhas                                                  │ ← H1
│ Read-only view of courses currently assigned to your Balagruhas            │ ← subtitle
│                                                                             │
│ ┌─────────────────────┐ ┌─────────────────────┐                            │
│ │ [Category ▼]        │ │ 🔍 Search courses..│                            │
│ └─────────────────────┘ └─────────────────────┘                            │
│                                                                             │
│ 4 courses assigned to your Balagruhas                                       │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ┌─────────────────────────────┐  Advanced Computer Apps      Published │ │ ← Course Card
│ │ │         [thumbnail]         │                                         │ │   (from CourseListView
│ │ │                             │  Category: Computer Apps              │ │    with readOnly=true)
│ │ │                             │  Difficulty: Beginner                  │ │
│ │ │                             │  4 Modules • 12 Chapters • 38 Items    │ │
│ │ └─────────────────────────────┘                                        │ │
│ │                                                                        │ │
│ │ Assigned to: Ramakrishna Ashram (24 students, 18 started)              │ │ ← NEW assignment info line
│ │                                                                        │ │
│ │                                                 [📂 View Content →]    │ │ ← Read-only CTA
│ │                                                                        │ │   (no context menu ⋮)
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ┌─────────────────────────────┐  Tree Anatomy                Published │ │
│ │ │         [thumbnail]         │                                         │ │
│ │ │                             │  Category: Life Skills                 │ │
│ │ │                             │  Difficulty: Beginner                  │ │
│ │ │                             │  2 Modules • 6 Chapters • 14 Items     │ │
│ │ └─────────────────────────────┘                                        │ │
│ │                                                                        │ │
│ │ Assigned to: Yeshaswani (18 students, 12 started)                      │ │
│ │                                                                        │ │
│ │                                                 [📂 View Content →]    │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│                               [... more course cards ...]                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Coach Course Detail - Read-Only Structure View (`/coach/courses/:courseId`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ← Back to Courses                                                           │
│                                                                             │
│ Advanced Computer Apps                                           Published  │ ← Course Header
│ Learn essential computer skills with hands-on exercises...                  │   (purple theme,
│ Category: Computer Apps • Difficulty: Beginner •                           │    reused from admin)
│ 4 Modules • 12 Chapters • 38 Items                                          │
│                                                                             │
│ Assigned to: Ramakrishna Ashram (24 students) • 18 started • 12 completed   │ ← NEW stats line
│                                                                             │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│    (no "+ Add Module" button — readOnly gating)                             │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ▼ Module 1: Introduction to MS Word                                    │ │ ← ModuleCard (readOnly)
│ │   3 chapters • 9 content items                                         │ │   — no ⋮ menu
│ │ ┌────────────────────────────────────────────────────────────────────┐ │ │   — no drag handle
│ │ │ ▼ Chapter 1: What is MS Word?                                      │ │ │
│ │ │   3 content items                                                   │ │ │ ← ChapterCard (readOnly)
│ │ │ ┌──────────────────────────────────────────────────────────────┐  │ │ │
│ │ │ │ 🎬  Intro Video                    [👁 Preview]              │  │ │ │ ← ContentItemCard
│ │ │ │     video • 3:42                                              │  │ │ │   (readOnly — no
│ │ │ │                                                                │  │ │ │    Edit/Delete,
│ │ │ │ 📄  Reading: What is MS Word.pdf   [👁 Preview]              │  │ │ │    Preview kept)
│ │ │ │     pdf • 2 pages                                             │  │ │ │
│ │ │ │                                                                │  │ │ │
│ │ │ │ ❓  Quiz: Module 1 Check            [disabled — admin only]   │  │ │ │
│ │ │ │     quiz • 5 questions                                        │  │ │ │
│ │ │ └──────────────────────────────────────────────────────────────┘  │ │ │
│ │ │   (no "+ Add Content Item")                                        │ │ │
│ │ └────────────────────────────────────────────────────────────────────┘ │ │
│ │   (no "+ Add Chapter")                                                  │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ▶ Module 2: MS Excel Basics (collapsed)                                │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Content Preview Modal (reused from admin — already exists in `ContentItemCard.jsx`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Intro Video                                                        [✕]      │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────┐      │
│   │                                                                 │      │
│   │                                                                 │      │
│   │                         ▶ Play Video                           │      │
│   │                      (HTML5 <video> with                        │      │
│   │                       native controls)                          │      │
│   │                                                                 │      │
│   │   ──────────────────────●─────────────────── 1:23 / 3:42       │      │
│   │   [⏸] [🔊] [⚙]                                         [⛶]    │      │
│   │                                                                 │      │
│   └─────────────────────────────────────────────────────────────────┘      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

Note: video/audio/image/PDF preview is already built — see `frontend/src/components/admin/ContentItemCard.jsx:270-320`. No new preview component needed.

---

## 2. Acceptance Criteria

### 2.1. Navigation & Access

- [ ] **NAV-01:** Coach nav "Courses" item now points to `/coach/courses` (not `/coach/grading`)
- [ ] **NAV-02:** New nav entry "Grading" added pointing to `/coach/grading` (the existing Syllabus Tracker page)
- [ ] **NAV-03:** Nav split preserves all existing coach nav items in correct order
- [ ] **NAV-04:** Admin does not see "Courses" or "Grading" in coach-nav position (admin's "Courses" still points to `/admin/courses`)
- [ ] **NAV-05:** `/coach/courses` route guarded by `ProtectedRoute requiredRoles={['coach', 'admin']}` — admin access allowed for support/QA

### 2.2. Coach Course List (`/coach/courses`)

- [ ] **LIST-01:** Page loads without redirect to `/login` or `/access-denied` for authenticated coach
- [ ] **LIST-02:** H1 reads "Courses in Your Balagruhas"
- [ ] **LIST-03:** Page fetches courses from `GET /api/v2/lms/coach/:coachId/balagruha-courses`
- [ ] **LIST-04:** Only courses with at least one *active* `CourseAssignment` to one of the coach's `balagruhaIds` are returned
- [ ] **LIST-05:** Courses deduplicated by `courseId` (one card per course, even if assigned to multiple Balagruhas)
- [ ] **LIST-06:** Course cards render using `<CourseListView courses readOnly />` (reused admin component)
- [ ] **LIST-07:** Course cards show: thumbnail, title, status badge, category, difficulty, module/chapter/item counts
- [ ] **LIST-08:** Each card has an "Assigned to: {balagruha names} ({student count} students, {started count} started)" line under the metadata — NEW for coach view
- [ ] **LIST-09:** "View Content" primary CTA replaces the context menu (⋮) in read-only mode
- [ ] **LIST-10:** No "Create New Course", "Duplicate", "Publish", "Archive", "Delete", "Edit Metadata" buttons/menu items visible
- [ ] **LIST-11:** Search bar filters cards client-side by title/description/category
- [ ] **LIST-12:** Category filter dropdown filters by `course.category` (Computer Apps, Art, Life Skills, Spoken English)
- [ ] **LIST-13:** Empty state: "No courses assigned to your Balagruhas yet. Use [Assignments](/coach/assignments) to assign one."

### 2.3. Coach Course Detail (`/coach/courses/:courseId`)

- [ ] **DETAIL-01:** Page loads only when the course has at least one active `CourseAssignment` to one of the coach's balagruhas — else redirect to `/coach/courses` with toast "Course not available"
- [ ] **DETAIL-02:** Page fetches course structure from `GET /api/v2/lms/admin/courses/:courseId` (endpoint opened to `LMS Management: Read`, scope-filtered server-side for coaches)
- [ ] **DETAIL-03:** Uses `<CourseStructureBuilder readOnly />` (reused admin component)
- [ ] **DETAIL-04:** Header shows course title, description, status badge, metadata line, and NEW "Assigned to: {balagruhas} • {started} started • {completed} completed" line
- [ ] **DETAIL-05:** No "+ Add Module", "+ Add Chapter", "+ Add Content Item" buttons
- [ ] **DETAIL-06:** No drag handles on Module/Chapter/Content rows (drag reorder disabled)
- [ ] **DETAIL-07:** No "Publish Course", "Manage Quizzes", "Refresh" (Refresh may remain as it's read-only) header buttons
- [ ] **DETAIL-08:** No ⋮ context menus on Module/Chapter/Content cards
- [ ] **DETAIL-09:** Module/Chapter cards show expand/collapse toggles (working, not gated)
- [ ] **DETAIL-10:** Content item cards show the type icon, title, duration/size metadata
- [ ] **DETAIL-11:** Preview button on video/audio/image/PDF content items opens the existing embedded preview modal
- [ ] **DETAIL-12:** Preview button on quiz content items is disabled; clicking shows toast: "Quiz preview not yet available for coaches"
- [ ] **DETAIL-13:** Auto-save hook disabled via `enabled: !!course && !readOnly` — no background PUT calls
- [ ] **DETAIL-14:** "Back to Courses" navigates to `/coach/courses` (not `/admin/courses`)
- [ ] **DETAIL-15:** Empty state: "This course has no content yet" (rare — published courses should have content)

### 2.4. RBAC & Scoping

- [ ] **RBAC-01:** Coach role updated in MongoDB with `LMS Management` permission `{ actions: ['Read'], scope: 'balagruh' }`
- [ ] **RBAC-02:** Data fix via one-shot Node script (like prior B4/B5 fixes), committed to `stable`
- [ ] **RBAC-03:** Coach without any active course assignments sees an empty list (not 403)
- [ ] **RBAC-04:** Coach attempting to access `/coach/courses/:courseId` for a course NOT assigned to their balagruhas gets redirected to `/coach/courses` with toast
- [ ] **RBAC-05:** Coach attempting to POST/PUT/DELETE admin course endpoints still gets 403 (write endpoints remain `Manage`-gated)
- [ ] **RBAC-06:** Admin role continues to work identically on `/admin/courses` — no regression

### 2.5. Component Read-Only Prop

- [ ] **RO-01:** `CourseListView` accepts `readOnly` prop (default `false`, preserving admin behavior)
- [ ] **RO-02:** `CourseStructureBuilder` accepts `readOnly` prop (default `false`)
- [ ] **RO-03:** `ModuleCard` accepts and passes through `readOnly` to `ChapterCard`
- [ ] **RO-04:** `ChapterCard` accepts and passes through `readOnly` to `ContentItemCard`
- [ ] **RO-05:** `ContentItemCard` accepts `readOnly` — hides Edit, Delete, Duplicate menu items, keeps Preview
- [ ] **RO-06:** `ContextMenu` (shared) accepts `readOnly` — no mutating items rendered
- [ ] **RO-07:** `useAutoSave` in `CourseStructureBuilder` gated: `enabled: !!course && !readOnly`
- [ ] **RO-08:** `DndContext` wrapping modules rendered conditionally — plain div when `readOnly`
- [ ] **RO-09:** `useSortable` hook in cards is always called (React hooks rule) but drag handle UI + `attributes`/`listeners` not applied when `readOnly`
- [ ] **RO-10:** When `contentItem.quizRef` is null (deleted or never-existed quiz reference), the card renders with title "Quiz (unavailable)" and no navigation target, in both admin and coach views. No crash from accessing `contentItem.quizRef._id` on a null populate result.

### 2.6. Performance & Accessibility

- [ ] **PERF-01:** `/coach/courses` list loads within 1.5 seconds for up to 20 assigned courses
- [ ] **PERF-02:** `/coach/courses/:courseId` detail loads within 2 seconds for up to 50 content items
- [ ] **PERF-03:** Video preview loads and plays within 3 seconds (depends on S3/CDN)
- [ ] **PERF-04:** No unnecessary re-fetches when toggling module/chapter expansion
- [ ] **ACC-01:** Keyboard navigation: Tab through cards, Enter to open, Esc to close preview modal
- [ ] **ACC-02:** Screen reader announces course card contents and "View Content" action
- [ ] **ACC-03:** Preview modal has `role="dialog"` and focus trap
- [ ] **ACC-04:** Content type icons have aria-labels (video, audio, image, pdf, quiz)

---

## 3. Task Breakdown

### Phase 1: Backend Data & Endpoint (20 min)

**Task 1.1: Update coach role permissions (5 min)**
- Write one-shot Node script `backend/fix-coach-lms-read.js`
- Adds `{ module: 'LMS Management', actions: ['Read'], scope: 'balagruh' }` to coach role document
- Uses `markModified('permissions')` and `save()` pattern (same as prior B4 coach scope fix)
- Run script, verify via admin tool, delete script
- Do NOT commit the script (data fix only)

**Task 1.2: New endpoint `GET /api/v2/lms/coach/:coachId/balagruha-courses` (10 min)**
- File: `backend/controllers/lms/coach/coachAssignmentController.js` — add new exported function
- Route: `backend/routes/v2/lms/coach/assignments.js` — add `router.get('/:coachId/balagruha-courses', authenticate, authorize('LMS Management', 'Read'), coachAssignmentController.getBalagruhaCourses)`
- Logic:
  - Get coach's balagruhaIds from `User.findById(coachId).select('balagruhaIds')`
  - Query `CourseAssignment.find({ $or: [{ 'assignedTo.balagruhaId': { $in: balagruhaIds } }, { 'assignedTo.balagruhaIds': { $in: balagruhaIds } }], status: 'active' }).distinct('courseId')`
  - Query `Course.find({ _id: { $in: courseIds } }).populate('createdBy', 'name').lean()` with full hierarchy populate (`modules.chapters.contentItems.quizRef`)
  - For each course, attach `assignmentInfo: { balagruhaNames, studentCount, startedCount, completedCount }` from aggregated `CourseAssignment` + `StudentProgress`
  - Return `{ success: true, count, data: coursesWithAssignmentInfo }`
- Add RBAC guard: if `req.user.role === 'admin'`, allow any; if `coach`, verify `req.user._id === coachId`

**Task 1.3: Relax auth on 2 existing admin GET endpoints (5 min)**
- File: `backend/routes/v2/lms/admin/courses.js`
  - Line 57-62: `GET /` → change `authorize('LMS Management', 'Manage')` to `authorize('LMS Management', 'Read')`
  - Line 81-86: `GET /:id` → same change
- Add a controller-level scope check in `getCourseById`: if `req.user.role === 'coach'`, verify the course is actively assigned to one of their balagruhas (same join as Task 1.2). If not, return 403.
- Leave all 23 other admin course routes (POST/PUT/DELETE/audit-log/modules/chapters/content/reorder/publish) untouched — still `Manage`-gated

### Phase 2: Component Read-Only Prop Drilling (40 min)

**Task 2.1: `CourseListView.jsx` — add `readOnly` prop (10 min)**
- Add `readOnly = false` to props destructure
- Hide context menu (`⋮` button) when `readOnly`
- Hide all modal state for Edit/Publish/Archive/Unpublish/Restore/Bulk — only render when `!readOnly`
- Add new "View Content" primary CTA that navigates to `/coach/courses/:courseId` when `readOnly`, or `/admin/courses/:courseId/structure` when not
- File: `frontend/src/components/admin/CourseListView.jsx`

**Task 2.2: `CourseStructureBuilder.jsx` — add `readOnly` prop (10 min)**
- Add `readOnly = false` to props (will be passed from new `CoachCourseDetailPage`)
- Gate `useAutoSave` hook: `enabled: !!course && !readOnly`
- Gate `hasPermission('LMS Management', 'Manage')` check → use `'Read'` when `readOnly`
- Wrap Publish, Add Module, Manage Quizzes buttons in `{!readOnly && (...)}`
- Replace `DndContext` wrapper with plain `<div>` when `readOnly`
- "Back" button goes to `/coach/courses` when `readOnly`, else `/admin/courses`
- Pass `readOnly` down to each `<ModuleCard>`
- File: `frontend/src/pages/admin/CourseStructureBuilder.jsx`

**Task 2.3: `ModuleCard.jsx` — add `readOnly` prop (5 min)**
- Accept and forward `readOnly` to `ChapterCard`
- Gate context menu (⋮, Edit, Delete) on `!readOnly`
- Gate Add Chapter button on `!readOnly`
- `useSortable` hook stays (React rules) but `attributes`/`listeners` and drag handle UI not rendered when `readOnly`
- Gate AddChapterModal mount on `!readOnly`
- File: `frontend/src/components/admin/ModuleCard.jsx`

**Task 2.4: `ChapterCard.jsx` — add `readOnly` prop (5 min)**
- Same pattern as ModuleCard
- Forward `readOnly` to `ContentItemCard`
- File: `frontend/src/components/admin/ChapterCard.jsx`

**Task 2.5: `ContentItemCard.jsx` — add `readOnly` prop (10 min)**
- Accept `readOnly`
- In context menu: hide Edit, Delete, Duplicate items
- Keep Preview item (or make the whole card clickable → opens preview) when `readOnly`
- For quiz content items: Preview item shows toast "Quiz preview not yet available for coaches" and stays disabled (no navigation to `/admin/quizzes/:quizId/edit`)
- Drag handle hidden when `readOnly`
- AddContentItemModal / EditContentItemModal not mounted when `readOnly`
- File: `frontend/src/components/admin/ContentItemCard.jsx`

### Phase 3: Coach Pages (15 min)

**Task 3.1: Create `CoachCoursesPage.jsx` (10 min)**
- Route: `/coach/courses`
- Fetches `GET /api/v2/lms/coach/:coachId/balagruha-courses`
- Renders H1, filters (category + search), count text
- Uses `<CourseListView courses={courses} readOnly={true} onRefresh={fetchCourses} />`
- Loading and empty states
- File: `frontend/src/pages/coach/CoachCoursesPage.jsx` (new)

**Task 3.2: Create `CoachCourseDetailPage.jsx` (5 min)**
- Route: `/coach/courses/:courseId`
- Renders `<CourseStructureBuilder readOnly={true} />` — the component fetches its own data via `useParams`
- Thin wrapper — most of the page is the reused builder
- File: `frontend/src/pages/coach/CoachCourseDetailPage.jsx` (new)

### Phase 4: Routing & Nav (5 min)

**Task 4.1: `App.js` — add new routes (3 min)**
- Import `CoachCoursesPage` and `CoachCourseDetailPage`
- Add route `/coach/courses` → `CoachCoursesPage` with `ProtectedRoute requiredRoles={['coach', 'admin']}`
- Add route `/coach/courses/:courseId` → `CoachCourseDetailPage` with same guard

**Task 4.2: `Layout.js:141` — split nav entry (2 min)**
- Replace `{ id: 16, name: "Courses", link: "/coach/grading", roles: ["coach"] }` with two entries:
  - `{ id: 16, name: "Courses", link: "/coach/courses", roles: ["coach"] }`
  - `{ id: 16.5, name: "Grading", link: "/coach/grading", roles: ["coach"] }` (or reuse an unused id)

### Phase 5: Verification (15 min)

**Task 5.1: Live browser test as coach (10 min)**
- Login as `coach@gmail.com`
- Navigate to `/coach/courses` via new nav item
- Verify only balagruha-assigned courses appear
- Click View Content on a course with real content (e.g., Computer Applications)
- Verify module/chapter/content tree renders read-only
- Click Preview on a video/audio/image/PDF content item
- Verify preview modal opens and plays/displays
- Verify NO Edit, Delete, Add, Publish buttons visible anywhere
- Try navigating directly to `/coach/courses/:courseId` for a NON-assigned course — verify redirect + toast

**Task 5.2: Live admin regression test (3 min)**
- Login as admin
- Navigate to `/admin/courses`
- Verify ALL admin functionality still present: Create Course, Duplicate, Publish, Archive, Edit, Delete
- Open a course in structure builder
- Verify Add Module, drag reorder, Edit, Delete all still work

**Task 5.3: Backend regression test (2 min)**
- POST/PUT/DELETE admin course endpoints from Postman/curl as coach → confirm 403
- GET admin course endpoints as coach → confirm 200 with scope-filtered results
- GET admin course endpoints as admin → confirm 200 with all courses

---

## 4. API Specifications

### 4.1. Get Balagruha Courses for Coach (NEW)

**Endpoint:** `GET /api/v2/lms/coach/:coachId/balagruha-courses`

**Description:** Returns courses currently assigned to any of the coach's balagruhas, with assignment context.

**Authorization:** `LMS Management: Read` (coach or admin). Coach can only query their own `coachId`.

**Query Parameters:**
- `category` (optional): Filter by course category (`Computer Apps`, `Art`, `Life Skills`, `Spoken English`)
- `search` (optional): Case-insensitive match on title/description

**Response (200 OK):**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "course123",
      "title": "Advanced Computer Apps",
      "description": "Learn essential computer skills...",
      "category": "Computer Apps",
      "difficultyLevel": "Beginner",
      "status": "published",
      "thumbnail": "https://cdn.example.com/thumbs/course123.jpg",
      "icon": "📚",
      "moduleCount": 4,
      "chapterCount": 12,
      "contentItemCount": 38,
      "assignmentInfo": {
        "balagruhaNames": ["Ramakrishna Ashram"],
        "studentCount": 24,
        "startedCount": 18,
        "completedCount": 12,
        "activeAssignments": 1
      }
    }
  ]
}
```

**Error Responses:**
- `403 Forbidden` — Coach trying to query another coach's `coachId`
  ```json
  { "success": false, "message": "Unauthorized: coach can only query their own ID" }
  ```
- `404 Not Found` — Coach user doesn't exist
  ```json
  { "success": false, "message": "Coach not found" }
  ```
- `500 Internal Server Error` — Database query failure
  ```json
  { "success": false, "message": "Failed to fetch balagruha courses" }
  ```

### 4.2. Existing Endpoints Opened to Read Scope

**Endpoint:** `GET /api/v2/lms/admin/courses`
- **Before:** `authorize('LMS Management', 'Manage')`
- **After:** `authorize('LMS Management', 'Read')`
- **Controller change:** When `req.user.role === 'coach'`, filter results to courses with active assignments to coach's balagruhas

**Endpoint:** `GET /api/v2/lms/admin/courses/:id`
- **Before:** `authorize('LMS Management', 'Manage')`
- **After:** `authorize('LMS Management', 'Read')`
- **Controller change:** When `req.user.role === 'coach'`, verify the requested course has an active assignment to one of the coach's balagruhas; 403 if not

All other routes in `backend/routes/v2/lms/admin/courses.js` remain unchanged (still `Manage`-gated).

---

## 5. File Paths

### New Files

```
frontend/src/pages/coach/
├── CoachCoursesPage.jsx              # List of balagruha-assigned courses
└── CoachCourseDetailPage.jsx         # Read-only structure drilldown wrapper
```

### Modified Files

```
frontend/src/components/admin/
├── CourseListView.jsx                # + readOnly prop, hide mutating UI
├── ContextMenu.jsx                   # + readOnly prop (already partially supports this)
├── ModuleCard.jsx                    # + readOnly prop drilling
├── ChapterCard.jsx                   # + readOnly prop drilling
└── ContentItemCard.jsx               # + readOnly prop, disable quiz preview

frontend/src/pages/admin/
└── CourseStructureBuilder.jsx        # + readOnly prop, gate auto-save + back nav

frontend/src/
├── App.js                            # + 2 new routes under /coach/courses
└── components/Layout.js               # + nav split: Courses → /coach/courses, Grading → /coach/grading

backend/controllers/lms/coach/
└── coachAssignmentController.js      # + getBalagruhaCourses function

backend/controllers/lms/admin/
└── courseController.js               # + coach scope filtering in getAllCourses and getCourseById

backend/routes/v2/lms/coach/
└── assignments.js                    # + new route for balagruha-courses

backend/routes/v2/lms/admin/
└── courses.js                        # + relax auth on 2 GET routes (Manage → Read)
```

### Not Committed (Data Fix)

```
backend/fix-coach-lms-read.js         # One-shot script to add LMS Management:Read to coach role
```

---

## 6. Technical Notes

### 6.1. Audit Findings from 2026-04-11 Triage

This story was scoped based on a full component audit. Key findings:

- **`ContentItemCard.jsx:270-320` already has a built-in media preview modal** for video/audio/image/PDF. This is the biggest win — no new media player component is needed. The coach's "view course content" experience reuses the exact same preview that admin uses during course authoring.
- **`useSortable` from @dnd-kit** must be called unconditionally (React hooks rule). The `readOnly` gating skips the drag *handle* UI and `attributes`/`listeners` application, not the hook itself.
- **`useAutoSave` auto-save hook** must be gated via `enabled: !!course && !readOnly` to prevent background metadata PUT calls.
- **`CourseAssignment` schema** supports both singular (`assignedTo.balagruhaId`) and plural (`assignedTo.balagruhaIds`) depending on assignment type (students vs entire balagruha). The new endpoint must `$or` query both.

### 6.2. Why Not Extend Story 04

Story 04 (Coach Reporting Dashboard) is scoped as a **stats/reports** feature — drill-down from a course bar chart to see "completion rate, avg grade, struggling students". It is explicitly not about content preview (no mention of modules, chapters, videos, or content items anywhere in Story 04's 1051 lines). Story 05 is the natural complement:

| Concern | Story 04 | Story 05 (this) |
|---------|----------|----------------|
| Coach question | "How are my students performing?" | "What are my students learning?" |
| Data source | `StudentProgress`, `Grade`, `Transaction` | `Course`, `CourseAssignment`, `ContentItem` |
| View | Charts, tables, numbers | Module/chapter tree, media preview |
| Export | CSV/PDF of stats | N/A (read-only content viewer) |

Both stories should ship. They complement each other.

### 6.3. Out of Scope (v1)

- **Quiz content preview** — coach cannot take or preview quizzes. Clicking Preview on a quiz content item shows a toast. A future story can add a student-mode quiz renderer for coaches.
- **Student progress per content item** — the coach sees course-level and chapter-level aggregates but not which specific content items each student has viewed. That belongs in Story 04's individual student report.
- **Course edit** — explicitly excluded. Admin-only by design.
- **Assigning from this page** — coach uses `/coach/assignments` for that workflow. This story is strictly for browsing.
- **Coach content-only search** — search in Story 05 is client-side on course titles, not on chapter/content item titles. A future enhancement could add server-side content search.

### 6.4. Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| `readOnly` gating breaks admin flow | All gates default to `readOnly=false`; live-tested admin flow in Phase 5 Task 5.2 |
| `useSortable` hook called conditionally | Hook always called; only the output (drag handle UI) gated |
| Quiz preview navigation confuses coaches | Toast message explicitly tells them quiz preview is not yet available |
| `useAutoSave` fires in read-only mode | `enabled: !!course && !readOnly` gates it |
| Coach accesses non-assigned course directly via URL | Controller-level scope check in `getCourseById`, frontend redirect + toast |
| Backend regression on existing admin endpoints | All 23 write endpoints unchanged; only 2 read endpoints relaxed; scope filter only applies when `role === 'coach'` |

---

## 7. Definition of Done

- [ ] New `/coach/courses` page displays courses assigned to coach's balagruhas with card view
- [ ] Each course card shows title, thumbnail, category, difficulty, module/chapter/content counts, and assignment info
- [ ] "View Content" button navigates to `/coach/courses/:courseId` read-only structure view
- [ ] Read-only structure view shows module → chapter → content item tree with no mutating UI
- [ ] Preview button on video/audio/image/PDF content items opens embedded preview modal and plays/displays content
- [ ] Preview button on quiz content items is disabled with explanatory toast
- [ ] Coach nav split into "Courses" (→ `/coach/courses`) and "Grading" (→ `/coach/grading`)
- [ ] Coach role has new `LMS Management: Read` permission with `scope: 'balagruh'`
- [ ] Coach cannot access courses NOT assigned to their balagruhas (frontend redirect + backend 403)
- [ ] All admin course functionality (`/admin/courses`) continues to work without regression
- [ ] All admin write endpoints (POST/PUT/DELETE) still return 403 for coach role
- [ ] `readOnly` prop documented on `CourseListView`, `CourseStructureBuilder`, `ModuleCard`, `ChapterCard`, `ContentItemCard`
- [ ] Live verification as coach covering: list load, content drilldown, all 4 media type previews, quiz disabled state, access denial on non-assigned course
- [ ] Live verification as admin covering: course CRUD, module/chapter/content CRUD, drag reorder, publish flow
- [ ] Backend regression test via curl: admin GET/POST/PUT/DELETE all work; coach GET works with scope filter; coach POST/PUT/DELETE return 403
- [ ] Unit tests: 80%+ coverage for `getBalagruhaCourses` controller — covering balagruha scope filter, course deduplication, empty state, and assignment info aggregation
- [ ] E2E test: `frontend/tests/e2e/coach-course-browser.spec.js` covers login → nav click → list load → course drilldown → media preview (video, audio, image, PDF) → quiz disabled state → back navigation
- [ ] Code peer-reviewed
- [ ] Merged to `stable`

---

**Dev Agent Record:**
- **Created:** 2026-04-11 (auto-generated from QA bug triage + component audit)
- **Status:** In Progress — Opus subagent dispatched 2026-04-11 after BMAD validation (24/28 passed, 4 partial items remediated)
- **Origin Bug:** "Coach / Empty Course Folders — The Courses section appears incomplete as no content is visible in the folders"
- **Audit Reference:** See conversation at `/home/dev/.claude/projects/-data-home-dev-Desktop-dev-ISF-Playground/0592a313-79cf-40bc-9fce-b6c33802bff4.jsonl` (Round 2 bug triage session, 2026-04-11)

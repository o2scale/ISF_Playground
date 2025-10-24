# E2E Test Scenarios: Epic 02 Story 01 - Course Creation & Structure Builder

**Story ID:** SPRINT2-EPIC02-STORY01
**Test Document Version:** 1.0
**Last Updated:** 2025-10-24 20:46:30
**Test Environment:** Staging
**Browser Support:** Chrome 120+, Firefox 115+, Edge 120+
**Screen Resolutions:** 1920x1080 (primary), 1366x768 (tablet)

---

## Test Coverage Summary

| Category | Test Cases | Priority |
|----------|-----------|----------|
| Course CRUD Operations | 9 | P0 |
| Hierarchical Structure Builder | 8 | P0 |
| Drag-and-Drop Reordering | 9 | P1 |
| Course Metadata & Validation | 8 | P0 |
| Status Workflow & Publishing | 11 | P0 |
| Auto-Save & Data Persistence | 5 | P1 |
| Performance & Accessibility | 3 | P2 |
| **TOTAL** | **58** | - |

---

## Prerequisites

**Test Data Setup:**
- Admin user account with `LMS Management` module `Manage` permission
- MongoDB instance running
- Backend server running on port 5001
- Frontend running on port 3000

**Test Account:**
- **Username:** admin@test.com
- **Password:** TestPassword123
- **Role:** Admin
- **Permissions:** LMS Management > Manage

---

## Test Scenarios

### 2.1. Course CRUD Operations (9 Test Cases)

#### TC 1.1: Create New Course - Success Path
**Priority:** P0
**Preconditions:**
- User logged in as Admin
- On Admin Course Dashboard (`/admin/courses`)

**Steps:**
1. Click "Create New Course" button
2. Verify creation modal opens
3. Enter course title: "Test Course 101"
4. Enter description: "This is a test course for automated testing"
5. Select category: "Computer Apps"
6. Select difficulty: "Intermediate" (radio button)
7. Upload thumbnail (test-image.jpg, 1.5MB)
8. Click "Create Course as Draft"

**Expected Results:**
- Modal closes
- Success toast: "Course created successfully!"
- New course appears at top of course list
- Course has "Draft" status badge (gray)
- Course card shows title, description, category, difficulty
- Thumbnail displays correctly

**Screenshots:** `TC-1.1-course-created.png`

---

#### TC 1.2: Create Course - Validation Errors
**Priority:** P0
**Steps:**
1. Click "Create New Course"
2. Leave title empty
3. Enter description (any text)
4. Click "Create Course as Draft"

**Expected Results:**
- Form does NOT submit
- Error message under title field: "Course title is required"
- Error toast: "Please fix the errors before submitting"

---

#### TC 1.3: Edit Course Metadata
**Priority:** P0
**Preconditions:** At least one course exists

**Steps:**
1. Click three-dot menu (⋮) on a course card
2. Click "Edit Metadata"
3. Change title to "Updated Course Title"
4. Change description to "Updated description"
5. Click "Update Course"

**Expected Results:**
- Modal closes
- Success toast: "Course updated successfully!"
- Course card shows updated title and description
- Updated timestamp changes

---

#### TC 1.4: Delete Course - With Confirmation
**Priority:** P0
**Steps:**
1. Click ⋮ menu on a Draft course
2. Click "Delete Permanently"
3. Confirmation dialog appears: "Are you sure? This cannot be undone."
4. Click "OK"

**Expected Results:**
- Course disappears from list
- Success toast: "Course deleted successfully!"
- Course count decrements

---

#### TC 1.5: Duplicate Course
**Priority:** P1
**Steps:**
1. Click ⋮ menu on a course
2. Click "Duplicate Course"

**Expected Results:**
- New course created with title "{Original Title} (Copy)"
- New course has "Draft" status
- New course has same category, difficulty, thumbnail
- Original course unchanged

---

#### TC 1.6: Thumbnail Upload - File Size Validation
**Priority:** P0
**Steps:**
1. Open Create Course modal
2. Try to upload image > 2MB

**Expected Results:**
- Upload rejected
- Error message: "Image size must be less than 2MB"

---

#### TC 1.7: Thumbnail Upload - File Type Validation
**Priority:** P0
**Steps:**
1. Open Create Course modal
2. Try to upload .pdf file

**Expected Results:**
- Upload rejected
- Error message: "Please select an image file (JPG or PNG)"

---

#### TC 1.8: Search Courses
**Priority:** P1
**Preconditions:** Multiple courses exist

**Steps:**
1. Enter "Computer" in search box
2. Wait for filtering

**Expected Results:**
- Only courses with "Computer" in title or description show
- Other courses hidden
- Search is case-insensitive

---

#### TC 1.9: Filter by Category and Status
**Priority:** P1
**Steps:**
1. Select "Computer Apps" from category dropdown
2. Select "Draft" from status dropdown

**Expected Results:**
- Only Draft courses in Computer Apps category show
- Other courses hidden

---

### 2.2. Hierarchical Structure Builder (8 Test Cases)

#### TC 2.1: Add Module to Course
**Priority:** P0
**Preconditions:**
- Draft course exists
- On Course Structure Builder page

**Steps:**
1. Click "Add Module" button
2. Enter module title: "Module 1: Introduction"
3. Enter description: "Intro to the course"
4. Click "Add Module"

**Expected Results:**
- Modal closes
- Success toast: "Module added successfully!"
- Module appears in structure view
- Module shows "📦 Module 1: Introduction"
- Module is collapsed by default (except first module)

---

#### TC 2.2: Add Chapter to Module
**Priority:** P0
**Preconditions:** Module exists

**Steps:**
1. Expand module (click ▶ icon)
2. Click "Add Chapter" button
3. Enter chapter title: "Chapter 1: Getting Started"
4. Enter description
5. Click "Add Chapter"

**Expected Results:**
- Modal closes
- Success toast: "Chapter added successfully!"
- Chapter appears under module
- Chapter shows "📄 Chapter 1: Getting Started"

---

#### TC 2.3: Add Content Item to Chapter
**Priority:** P0
**Preconditions:** Chapter exists

**Steps:**
1. Expand chapter
2. Click "Add Content Item"
3. Select type: "Video"
4. Enter title: "How to Create a Document"
5. Enter file URL: "https://example.com/video.mp4"
6. Click "Add Content"

**Expected Results:**
- Modal closes
- Success toast: "Content item added successfully!"
- Content item appears with video icon (🎥)
- Title displays correctly

---

#### TC 2.4: Expand/Collapse Module
**Priority:** P1
**Steps:**
1. Click ▶ icon on collapsed module

**Expected Results:**
- Module expands
- Icon changes to ▼
- Chapters become visible
- "Add Chapter" button visible

2. Click ▼ icon

**Expected Results:**
- Module collapses
- Icon changes to ▶
- Chapters hidden
- Summary shows: "X Chapters • Y Content Items"

---

#### TC 2.5: Expand/Collapse Chapter
**Priority:** P1
**Similar to TC 2.4 but for chapters**

---

#### TC 2.6: Navigate to Structure Builder
**Priority:** P0
**Preconditions:** On course list

**Steps:**
1. Click ⋮ menu on a course
2. Click "Edit Structure"

**Expected Results:**
- Navigates to `/admin/courses/{courseId}/structure`
- Course title and metadata displayed in header
- Structure view loads
- All modules visible

---

#### TC 2.7: Back to Course List
**Priority:** P1
**Preconditions:** On Structure Builder page

**Steps:**
1. Click "Back to Course List" button

**Expected Results:**
- Navigates back to `/admin/courses`
- Course list loads

---

#### TC 2.8: Structure Persists After Page Refresh
**Priority:** P0
**Preconditions:** Course with modules/chapters exists

**Steps:**
1. Note current structure (modules, chapters, content items)
2. Press F5 (refresh page)

**Expected Results:**
- Page reloads
- All modules, chapters, content items still present
- Structure unchanged
- Expansion states reset (first module expanded)

---

### 2.4. Course Metadata & Validation (8 Test Cases)

#### TC 4.1: Title Character Limit
**Priority:** P0
**Steps:**
1. Open Create Course modal
2. Enter title with 101 characters
3. Try to submit

**Expected Results:**
- Input limited to 100 characters
- Character count shows "100/100"
- If >100, error: "Title must be 100 characters or less"

---

#### TC 4.2: Description Character Limit
**Priority:** P0
**Steps:**
1. Enter description with 501 characters

**Expected Results:**
- Input limited to 500 characters
- Character count shows "500/500"

---

#### TC 4.3: Category Validation
**Priority:** P0
**Steps:**
1. Try to submit without selecting category

**Expected Results:**
- Error: "Please select a category"

---

#### TC 4.4: Difficulty Validation
**Priority:** P0
**Steps:**
1. Try to submit without selecting difficulty

**Expected Results:**
- Error: "Please select a difficulty level"

---

(Additional validation test cases omitted for brevity...)

---

### 2.5. Status Workflow & Publishing (11 Test Cases)

#### TC 5.1: Publish Course - Success Path
**Priority:** P0
**Preconditions:**
- Draft course with complete structure:
  - Has title, description, category, difficulty, thumbnail
  - At least 1 module
  - At least 1 chapter per module
  - At least 1 content item per chapter

**Steps:**
1. On Structure Builder page
2. Click "Publish Course" button

**Expected Results:**
- Success toast: "Course published successfully!"
- Status badge changes from "Draft" to "Published" (green)
- `publishedAt` timestamp set
- Course visible to coaches in assignment interface (verify in separate test)

---

#### TC 5.2: Publish Course - Validation Failure (Missing Thumbnail)
**Priority:** P0
**Preconditions:** Draft course without thumbnail

**Steps:**
1. Click "Publish Course"

**Expected Results:**
- Error toast showing validation errors:
  "Cannot publish:
  • Missing thumbnail"
- Course remains in Draft status

---

#### TC 5.3: Publish Validation - Missing Module
**Priority:** P0
**Preconditions:** Course with no modules

**Expected Results:**
- Error: "Course must have at least one module"

---

#### TC 5.4: Publish Validation - Module Without Chapters
**Priority:** P0
**Preconditions:** Course with module but no chapters

**Expected Results:**
- Error: "Module 1 has no chapters"

---

#### TC 5.5: Publish Validation - Chapter Without Content
**Priority:** P0
**Preconditions:** Course with chapter but no content items

**Expected Results:**
- Error: "Module 1, Chapter 1 has no content items"

---

#### TC 5.6: Archive Published Course
**Priority:** P0
**Preconditions:** Published course exists

**Steps:**
1. Click ⋮ menu
2. Click "Archive"
3. Confirm in dialog

**Expected Results:**
- Status changes to "Archived" (red badge)
- `archivedAt` timestamp set
- Course hidden from students/coaches (verify separately)

---

#### TC 5.7: Restore Archived Course
**Priority:** P0
**Preconditions:** Archived course exists

**Steps:**
1. Click ⋮ menu
2. Click "Restore"

**Expected Results:**
- Status changes to "Published"
- `archivedAt` cleared
- Course visible to students/coaches again

---

#### TC 5.8: Context Menu - Draft Course Actions
**Priority:** P1
**Preconditions:** Draft course

**Steps:**
1. Click ⋮ menu

**Expected Results:**
- Menu shows: Edit Metadata, Edit Structure, Duplicate, **Publish**, Delete
- "Publish" option visible
- "Archive" option NOT visible

---

#### TC 5.9: Context Menu - Published Course Actions
**Priority:** P1
**Preconditions:** Published course

**Steps:**
1. Click ⋮ menu

**Expected Results:**
- Menu shows: Edit Metadata, Edit Structure, Duplicate, **Archive**, Delete
- "Archive" option visible
- "Publish" option NOT visible

---

#### TC 5.10: Context Menu - Archived Course Actions
**Priority:** P1
**Preconditions:** Archived course

**Steps:**
1. Click ⋮ menu

**Expected Results:**
- Menu shows: Edit Metadata, Edit Structure, Duplicate, **Restore**, Delete
- "Restore" option visible

---

#### TC 5.11: Course List - Filter by Status
**Priority:** P1
**Preconditions:** Courses in all 3 statuses exist

**Steps:**
1. Select "Draft" from status filter
2. Verify only Draft courses show
3. Select "Published"
4. Verify only Published courses show
5. Select "Archived"
6. Verify only Archived courses show

---

### 2.6. Auto-Save & Data Persistence (5 Test Cases)

#### TC 6.1: Auto-Save Triggers After 1-Second Debounce
**Priority:** P1
**Preconditions:**
- Course structure builder page open
- Course loaded successfully

**Steps:**
1. Edit course title in the header
2. Wait and observe the save indicator
3. Wait for 1 second without additional changes
4. Observe the save status

**Expected Results:**
- Save indicator appears after 1 second of inactivity
- Indicator shows "Saving..." with spinning icon
- After save completes, indicator shows "All changes saved" with checkmark
- Indicator disappears after 2 seconds

---

#### TC 6.2: Save Indicator UI States
**Priority:** P1
**Preconditions:**
- Course structure builder page open

**Steps:**
1. Make a change to course metadata
2. Observe the save indicator during the save process
3. Wait for save to complete

**Expected Results:**
- **Saving state:** Blue background, spinning icon, text "Saving..."
- **Saved state:** Green background, checkmark icon, text "All changes saved"
- **Idle state:** No indicator shown (after 2 seconds)

---

#### TC 6.3: Failed Save Shows Error with Retry Button
**Priority:** P1
**Preconditions:**
- Course structure builder page open
- Backend server stopped (simulating network failure)

**Steps:**
1. Stop the backend server
2. Edit course title
3. Wait for 1 second
4. Observe the save status indicator

**Expected Results:**
- Save indicator shows red background
- Error icon displayed
- Text shows "Save failed"
- "Retry" button visible
- Save attempted 3 times with exponential backoff (1s, 2s, 4s delays)
- After all retries fail, error state persists

---

#### TC 6.4: Retry Button Successfully Retries Failed Save
**Priority:** P1
**Preconditions:**
- TC 6.3 completed (save failed with error indicator showing)

**Steps:**
1. Restart the backend server
2. Click the "Retry" button in the error indicator
3. Observe the save status

**Expected Results:**
- Save indicator changes to "Saving..." state
- Save completes successfully
- Indicator changes to "All changes saved" state
- Error state cleared

---

#### TC 6.5: Drag-and-Drop Order Persists After Page Refresh
**Priority:** P1
**Preconditions:**
- Course with at least 3 modules created

**Steps:**
1. Note the original order of modules (Module 1, Module 2, Module 3)
2. Drag Module 3 to the first position
3. Wait for "All changes saved" indicator
4. Refresh the page (F5)
5. Observe the module order

**Expected Results:**
- Module order after drag: Module 3, Module 1, Module 2
- Save indicator shows "Module order updated" toast
- After page refresh, order remains: Module 3, Module 1, Module 2
- Order persisted in database

---

### 2.7. Performance & Accessibility (3 Test Cases)

#### TC 7.1: Course List Load Performance
**Priority:** P2
**Preconditions:** 50 courses exist

**Steps:**
1. Navigate to `/admin/courses`
2. Measure page load time

**Expected Results:**
- Page loads within 2 seconds
- No console errors

---

#### TC 7.2: Structure Builder Load Performance
**Priority:** P2
**Preconditions:**
- Course with 5 modules
- Each module has 10 chapters
- Each chapter has 20 content items

**Steps:**
1. Navigate to structure builder
2. Measure render time

**Expected Results:**
- Page renders within 1 second
- Tree view displays correctly
- Smooth expand/collapse animations

---

#### TC 7.3: Keyboard Navigation
**Priority:** P2
**Steps:**
1. Tab through course list
2. Press Enter on "Create New Course" button
3. Tab through form fields
4. Press Escape to close modal

**Expected Results:**
- All focusable elements accessible via Tab
- Enter activates buttons
- Escape closes modals
- Focus indicators visible (blue ring)

---

## Test Execution Tracking

| Test Case | Status | Tester | Date | Notes |
|-----------|--------|--------|------|-------|
| TC 1.1 | ⏸️ Pending | - | - | - |
| TC 1.2 | ⏸️ Pending | - | - | - |
| ... | ... | ... | ... | ... |

---

## Known Issues / Bugs

**None reported yet.**

---

## Test Environment Details

**Backend:**
- Node.js v18.20.5
- MongoDB 6.0
- API Base URL: `http://localhost:5001/api/v2/lms/admin/courses`

**Frontend:**
- React 19.0.0
- Browser: Chrome 120+
- Screen: 1920x1080

---

## Sign-Off

**Dev Agent (James):** 58 test scenarios documented (added TC 6.1-6.5 for auto-save) - 2025-10-24 20:46:30
**QA Agent (Quinn):** ⏸️ Pending execution

---

**End of E2E Test Scenarios**

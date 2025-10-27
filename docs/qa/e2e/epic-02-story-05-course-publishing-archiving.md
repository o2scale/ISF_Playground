# Epic 02 Story 05: E2E Test Scenarios
## Course Publishing & Archiving Workflow

**Story:** SPRINT2-EPIC02-STORY05
**Feature:** Course Publishing & Archiving Workflow
**Test Environment:** Development
**Created:** 2025-10-27 12:53:57
**Status:** Ready for QA Testing

---

## Test Scenario 1: Publish Validation - All Checks Pass

**Priority:** P0 (Critical)
**Acceptance Criteria:** VAL-01 to VAL-08

### Test Steps:

1. **Setup:**
   - Login as Admin user with "LMS Management" permission
   - Navigate to Course Management dashboard
   - Create a test course with complete data:
     - Title: "E2E Test Course - Publish Validation"
     - Description: "Complete test course with all required fields"
     - Category: "Computer Apps"
     - Difficulty: "Beginner"
     - Thumbnail: Upload 1280x720 image
     - Structure: Add 1 module, 1 chapter, 1 content item
   - Ensure course status is "Draft"

2. **Execute:**
   - Click the three-dot menu (⋮) on the test course
   - Click "Publish" option
   - **Expected:** PublishValidationModal opens

3. **Verify Validation Checks:**
   - **Expected:** Modal title shows "Publish Course: E2E Test Course - Publish Validation"
   - **Expected:** Loading indicator appears: "Running validation checks..."
   - **Expected:** All validation checks display with icons:
     - ✓ Course Title (pass)
     - ✓ Course Description (pass)
     - ✓ Category (pass)
     - ✓ Difficulty (pass)
     - ✓ Thumbnail (pass)
     - ✓ Structure (pass - shows "1 Modules • 1 Chapters • 1 Items")

4. **Verify Success Message:**
   - **Expected:** Green success banner displays:
     - "✅ All required checks passed! Course is ready to publish."
   - **Expected:** Publishing benefits list shows 4 bullet points
   - **Expected:** "Send notification to coaches" checkbox visible (unchecked)
   - **Expected:** "Publish Course" button enabled (purple background)
   - **Expected:** "Cancel" button visible

5. **Publish the Course:**
   - Check the "Send notification to coaches" checkbox
   - Click "Publish Course" button
   - **Expected:** Modal closes
   - **Expected:** Toast notification: "Course published successfully!"
   - **Expected:** Course list refreshes

6. **Verify Published State:**
   - **Expected:** Course card shows green "Published" badge
   - **Expected:** Context menu no longer shows "Publish" option
   - **Expected:** Context menu shows "Unpublish" and "Archive" options

**Pass Criteria:**
- ✓ Validation modal opens correctly
- ✓ All validation checks pass with green checkmarks
- ✓ Success message displays correctly
- ✓ Course publishes successfully
- ✓ Status badge updates to "Published"

---

## Test Scenario 2: Publish Validation - Validation Fails

**Priority:** P0 (Critical)
**Acceptance Criteria:** VAL-06, VAL-07

### Test Steps:

1. **Setup:**
   - Login as Admin
   - Create a test course with INCOMPLETE data:
     - Title: "Incomplete Test Course"
     - Description: (leave empty)
     - Category: "Art"
     - Difficulty: "Beginner"
     - Thumbnail: (do not upload)
     - Structure: (do not add any modules)

2. **Execute:**
   - Click three-dot menu on incomplete course
   - Click "Publish"
   - **Expected:** PublishValidationModal opens

3. **Verify Failed Validation:**
   - **Expected:** Validation checks show failures:
     - ✓ Course Title (pass)
     - ❌ Course Description (fail - "Missing")
     - ✓ Category (pass)
     - ✓ Difficulty (pass)
     - ❌ Thumbnail (fail - "Missing")
     - ❌ Structure (fail - "No modules found")

4. **Verify Error Summary:**
   - **Expected:** Red error banner displays:
     - "❌ Cannot publish: 3 errors must be fixed"
   - **Expected:** "Required Actions" section lists all errors:
     1. "Add course description"
     2. "Upload course thumbnail"
     3. "Add at least 1 module with 1 chapter and 1 content item"
   - **Expected:** "Publish Course" button is NOT visible
   - **Expected:** "Fix Issues" button visible instead

5. **Close Modal:**
   - Click "Fix Issues" button
   - **Expected:** Modal closes
   - **Expected:** Course remains in "Draft" status

**Pass Criteria:**
- ✓ Failed validation checks display with ❌ icons
- ✓ Error summary shows correct count
- ✓ Required actions list all errors
- ✓ Publish button not available when validation fails
- ✓ Course remains unpublished

---

## Test Scenario 3: Unpublish Workflow

**Priority:** P1 (High)
**Acceptance Criteria:** UNPUB-01 to UNPUB-05

### Test Steps:

1. **Setup:**
   - Have a published course from Scenario 1
   - Course status: "Published" (green badge)

2. **Execute Unpublish:**
   - Click three-dot menu on published course
   - **Expected:** Context menu shows "Unpublish" option (yellow icon)
   - Click "Unpublish"
   - **Expected:** UnpublishConfirmationModal opens

3. **Verify Modal Content:**
   - **Expected:** Modal title: "Unpublish Course"
   - **Expected:** Course title shown in subtitle
   - **Expected:** Yellow warning banner:
     - "Warning: This will return the course to draft status"
   - **Expected:** "What happens when you unpublish" section shows 7 bullet points
   - **Expected:** "Reason for Unpublishing (Optional)" textarea visible
   - **Expected:** "Notify coaches" checkbox visible (checked by default)

4. **Unpublish with Reason:**
   - Enter reason: "Major content updates needed"
   - Keep "Notify coaches" checked
   - Click "Unpublish Course" button
   - **Expected:** Button text changes to "Unpublishing..."
   - **Expected:** Modal closes after completion
   - **Expected:** Toast: "Course unpublished successfully!"

5. **Verify Unpublished State:**
   - **Expected:** Course card shows gray "Draft" badge
   - **Expected:** Context menu shows "Publish" option again
   - **Expected:** Context menu no longer shows "Unpublish" or "Archive"
   - **Expected:** Course visible only to admins (not in coach/student interfaces)

**Pass Criteria:**
- ✓ Unpublish modal opens correctly
- ✓ All warnings and explanations display
- ✓ Course unpublishes successfully
- ✓ Status changes from Published to Draft
- ✓ Context menu options update correctly

---

## Test Scenario 4: Archive Workflow with Impact Analysis

**Priority:** P1 (High)
**Acceptance Criteria:** ARCH-01 to ARCH-09

### Test Steps:

1. **Setup:**
   - Have a published course
   - Course status: "Published"

2. **Execute Archive:**
   - Click three-dot menu on published course
   - Click "Archive" option (orange icon)
   - **Expected:** ArchiveConfirmationModal opens

3. **Verify Impact Analysis:**
   - **Expected:** Modal title: "Archive Course" (red background)
   - **Expected:** Yellow warning banner displays
   - **Expected:** Impact analysis section shows:
     - "Students Currently Enrolled: 0 students"
     - "No enrollments yet" message displayed
     - OR if students exist: Shows breakdown by completion percentage

4. **Verify "What Happens" Section:**
   - **Expected:** 6 bullet points with green checkmarks explaining archiving:
     - Course hidden from new enrollments
     - Coaches cannot assign to new students
     - Existing progress retained
     - Students can still complete work
     - Visible only in Archived tab
     - Can be restored later

5. **Archive with Reason:**
   - Enter reason: "Outdated content - replaced by newer version"
   - Keep "Notify coaches" checked
   - Click "Archive Course" button
   - **Expected:** Button shows "Archiving..."
   - **Expected:** Toast: "Course archived successfully!"
   - **Expected:** Modal closes

6. **Verify Archived State:**
   - **Expected:** Course card shows red "Archived" badge
   - **Expected:** Context menu shows "Restore" option
   - **Expected:** Context menu no longer shows "Publish", "Unpublish", or "Archive"

7. **Test Status Filter:**
   - Click status filter dropdown in header
   - Select "Archived"
   - **Expected:** Only archived courses display
   - **Expected:** Previously archived course is visible

**Pass Criteria:**
- ✓ Archive modal opens with impact analysis
- ✓ Warning and explanations display correctly
- ✓ Reason and notification options work
- ✓ Course archives successfully
- ✓ Status badge updates to "Archived"
- ✓ Archived courses filterable

---

## Test Scenario 5: Restore Course Workflow

**Priority:** P1 (High)
**Acceptance Criteria:** REST-01 to REST-06

### Test Steps:

1. **Setup:**
   - Have an archived course from Scenario 4
   - Course status: "Archived" (red badge)

2. **Execute Restore:**
   - Click three-dot menu on archived course
   - Click "Restore" option (blue icon)
   - **Expected:** RestoreCourseModal opens

3. **Verify Modal Content:**
   - **Expected:** Modal title: "Restore Archived Course" (blue background)
   - **Expected:** Archive information section shows:
     - Archived Date: (actual date)
     - Archived By: "Admin" or actual admin name
     - Reason: "Outdated content - replaced by newer version"

4. **Verify Restoration Options:**
   - **Expected:** Two radio button options visible:
     - ○ "Restore to Published" (with green checkmark icon)
     - ○ "Restore to Draft" (with yellow warning icon)
   - **Expected:** "Restore to Published" selected by default
   - **Expected:** Each option has 4 bullet points explaining what happens

5. **Restore to Published:**
   - Keep "Restore to Published" selected
   - Click "Restore Course" button
   - **Expected:** Button shows "Restoring..."
   - **Expected:** Toast: "Course restored to published status successfully!"
   - **Expected:** Modal closes

6. **Verify Restored State:**
   - **Expected:** Course card shows green "Published" badge
   - **Expected:** Context menu shows "Unpublish" and "Archive" options
   - **Expected:** Course no longer in "Archived" filter

7. **Test Restore to Draft:**
   - Archive the course again
   - Open Restore modal
   - Select "Restore to Draft" radio button
   - Click "Restore Course"
   - **Expected:** Course restores with gray "Draft" badge
   - **Expected:** Context menu shows "Publish" option

**Pass Criteria:**
- ✓ Restore modal opens correctly
- ✓ Archive information displays
- ✓ Both restoration options work correctly
- ✓ Restore to Published updates status to Published
- ✓ Restore to Draft updates status to Draft
- ✓ Context menu options update appropriately

---

## Test Scenario 6: Bulk Operations - Bulk Publish

**Priority:** P1 (High)
**Acceptance Criteria:** BULK-01 to BULK-06

### Test Steps:

1. **Setup:**
   - Login as Admin
   - Ensure you have at least 3 draft courses
   - All courses should have complete data (will pass validation)

2. **Select Multiple Courses:**
   - **Expected:** Each course card has a checkbox on the left
   - **Expected:** "Select all" checkbox visible at top
   - Click checkbox on 3 draft courses
   - **Expected:** Selected courses highlight with purple border and background
   - **Expected:** Checkboxes show checked state

3. **Verify Bulk Actions Bar:**
   - **Expected:** Floating action bar appears at bottom center of screen
   - **Expected:** Shows "3 courses selected"
   - **Expected:** Shows status breakdown: "3 Draft"
   - **Expected:** "Publish (3)" button visible (green background)
   - **Expected:** "Delete (3)" button visible (red background)
   - **Expected:** X button to clear selection

4. **Execute Bulk Publish:**
   - Click "Publish (3)" button
   - **Expected:** BulkOperationModal opens
   - **Expected:** Modal title: "Bulk Publish Courses"
   - **Expected:** Confirmation section lists 3 courses with titles
   - Click "Publish All" button

5. **Verify Progress:**
   - **Expected:** Progress bar appears showing completion percentage
   - **Expected:** Text shows "Publishing courses..."
   - **Expected:** Counter shows "1 / 3", "2 / 3", "3 / 3"
   - **Expected:** Spinning loader visible

6. **Verify Results:**
   - **Expected:** "Operation Complete" heading appears
   - **Expected:** Summary shows "3 succeeded, 0 failed"
   - **Expected:** Green success section lists all 3 courses
   - **Expected:** Toast: "All 3 courses published successfully!"
   - Click "Done" button

7. **Verify Updated State:**
   - **Expected:** All 3 courses now show green "Published" badges
   - **Expected:** Bulk actions bar disappears
   - **Expected:** Checkboxes unchecked

**Pass Criteria:**
- ✓ Checkbox selection works correctly
- ✓ Bulk actions bar appears with correct counts
- ✓ Bulk publish modal opens
- ✓ Progress indicator shows real-time updates
- ✓ Success summary displays correctly
- ✓ All selected courses publish successfully
- ✓ Status badges update

---

## Test Scenario 7: Bulk Operations - Bulk Archive

**Priority:** P1 (High)
**Acceptance Criteria:** BULK-04

### Test Steps:

1. **Setup:**
   - Have at least 3 published courses from Scenario 6

2. **Select Published Courses:**
   - Click checkboxes on 3 published courses
   - **Expected:** "3 courses selected" shown
   - **Expected:** Status breakdown: "3 Published"
   - **Expected:** "Archive (3)" button visible (orange background)

3. **Execute Bulk Archive:**
   - Click "Archive (3)" button
   - **Expected:** BulkOperationModal opens with "Bulk Archive Courses" title
   - **Expected:** Warning message about archiving appears
   - **Expected:** Lists 3 courses to be archived
   - Click "Archive All" button

4. **Verify Progress and Results:**
   - **Expected:** Progress bar shows 0% → 33% → 67% → 100%
   - **Expected:** "Archiving courses..." message displays
   - **Expected:** Summary: "3 succeeded, 0 failed"
   - **Expected:** Toast: "All 3 courses archived successfully!"

5. **Verify Updated State:**
   - **Expected:** All 3 courses show red "Archived" badges
   - **Expected:** Courses no longer in "Published" filter
   - **Expected:** Courses visible in "Archived" filter

**Pass Criteria:**
- ✓ Bulk archive works for published courses
- ✓ Progress tracking accurate
- ✓ All courses archive successfully
- ✓ Status badges update to Archived

---

## Test Scenario 8: Bulk Operations - Bulk Delete

**Priority:** P2 (Medium)
**Acceptance Criteria:** BULK-05

### Test Steps:

1. **Setup:**
   - Have at least 2 courses (any status)

2. **Select Courses for Deletion:**
   - Click checkboxes on 2 courses
   - **Expected:** "Delete (2)" button visible (red background)

3. **Execute Bulk Delete:**
   - Click "Delete (2)" button
   - **Expected:** BulkOperationModal opens
   - **Expected:** Red warning banner:
     - "⚠️ Warning: This action cannot be undone!"
   - **Expected:** Lists 2 courses to be deleted

4. **Confirm Deletion:**
   - Click "Delete All" button
   - **Expected:** Progress bar and deletion process runs
   - **Expected:** Summary: "2 succeeded, 0 failed"
   - **Expected:** Toast notification appears

5. **Verify Deletion:**
   - **Expected:** Both courses removed from course list
   - **Expected:** Course count decreases by 2

**Pass Criteria:**
- ✓ Bulk delete shows warning message
- ✓ Confirmation required before deletion
- ✓ Progress tracking works
- ✓ Courses permanently deleted
- ✓ Course list updates

---

## Test Scenario 9: Bulk Operations - Mixed Status Selection

**Priority:** P2 (Medium)
**Acceptance Criteria:** BULK-03

### Test Steps:

1. **Setup:**
   - Have 2 draft courses and 2 published courses

2. **Select Mixed Status:**
   - Select 2 draft + 2 published courses (4 total)
   - **Expected:** "4 courses selected"
   - **Expected:** Status breakdown: "2 Draft, 2 Published"
   - **Expected:** "Publish (2)" button only (for draft courses)
   - **Expected:** "Archive (2)" button only (for published courses)
   - **Expected:** "Delete (4)" button (for all)

3. **Test Publish Button:**
   - Click "Publish (2)"
   - **Expected:** Modal shows ONLY 2 draft courses
   - **Expected:** Published courses not included
   - Cancel modal

4. **Test Archive Button:**
   - Click "Archive (2)"
   - **Expected:** Modal shows ONLY 2 published courses
   - **Expected:** Draft courses not included
   - Cancel modal

5. **Test Delete Button:**
   - Click "Delete (4)"
   - **Expected:** Modal shows all 4 selected courses
   - Cancel modal

**Pass Criteria:**
- ✓ Status breakdown shows mixed selection correctly
- ✓ Publish button filters to draft courses only
- ✓ Archive button filters to published courses only
- ✓ Delete button includes all selected courses

---

## Test Scenario 10: Select All Functionality

**Priority:** P2 (Medium)
**Acceptance Criteria:** BULK-01

### Test Steps:

1. **Setup:**
   - Have at least 5 courses in the list

2. **Test Select All:**
   - Click "Select all X courses" checkbox at top
   - **Expected:** All course checkboxes become checked
   - **Expected:** All courses highlight with purple border
   - **Expected:** Bulk actions bar shows "X courses selected"

3. **Test Deselect All:**
   - Click the same checkbox again
   - **Expected:** All checkboxes uncheck
   - **Expected:** Purple highlighting removed
   - **Expected:** Bulk actions bar disappears

4. **Test Partial Selection:**
   - Manually select 3 out of 5 courses
   - **Expected:** "Select all" checkbox shows partial state (indeterminate)
   - **Expected:** Text shows "(3 selected)"
   - Click "Select all" checkbox
   - **Expected:** All 5 courses now selected

**Pass Criteria:**
- ✓ Select all checkbox works correctly
- ✓ Deselect all works correctly
- ✓ Partial selection state displays
- ✓ UI updates reflect selection state

---

## Test Scenario 11: Status Filter Integration

**Priority:** P1 (High)
**Acceptance Criteria:** Status badges and filtering

### Test Steps:

1. **Setup:**
   - Have courses in all three statuses:
     - 2 Draft courses
     - 3 Published courses
     - 1 Archived course

2. **Test "All Statuses" Filter:**
   - Status filter dropdown: Select "All Statuses"
   - **Expected:** All 6 courses visible
   - **Expected:** Each shows correct colored badge

3. **Test "Draft" Filter:**
   - Status filter dropdown: Select "Draft"
   - **Expected:** Only 2 draft courses visible
   - **Expected:** Published and archived courses hidden

4. **Test "Published" Filter:**
   - Status filter dropdown: Select "Published"
   - **Expected:** Only 3 published courses visible
   - **Expected:** Draft and archived courses hidden

5. **Test "Archived" Filter:**
   - Status filter dropdown: Select "Archived"
   - **Expected:** Only 1 archived course visible
   - **Expected:** Draft and published courses hidden

**Pass Criteria:**
- ✓ All filter options work correctly
- ✓ Correct courses display for each filter
- ✓ Status badges show correct colors
- ✓ Filter persists during navigation

---

## Test Scenario 12: Context Menu Options by Status

**Priority:** P1 (High)
**Acceptance Criteria:** Context menu integration

### Test Steps:

1. **Test Draft Course Menu:**
   - Click three-dot menu on draft course
   - **Expected:** Menu shows:
     - ✓ Edit Metadata
     - ✓ Edit Structure
     - ✓ Duplicate Course
     - ✓ Publish (green)
     - ✓ Delete Permanently (red)
   - **Expected:** Menu does NOT show:
     - ✗ Unpublish
     - ✗ Archive
     - ✗ Restore

2. **Test Published Course Menu:**
   - Click three-dot menu on published course
   - **Expected:** Menu shows:
     - ✓ Edit Metadata
     - ✓ Edit Structure
     - ✓ Duplicate Course
     - ✓ Unpublish (yellow)
     - ✓ Archive (orange)
     - ✓ Delete Permanently (red)
   - **Expected:** Menu does NOT show:
     - ✗ Publish
     - ✗ Restore

3. **Test Archived Course Menu:**
   - Click three-dot menu on archived course
   - **Expected:** Menu shows:
     - ✓ Edit Metadata
     - ✓ Edit Structure
     - ✓ Duplicate Course
     - ✓ Restore (blue)
     - ✓ Delete Permanently (red)
   - **Expected:** Menu does NOT show:
     - ✗ Publish
     - ✗ Unpublish
     - ✗ Archive

**Pass Criteria:**
- ✓ Draft courses show Publish option only
- ✓ Published courses show Unpublish and Archive
- ✓ Archived courses show Restore option only
- ✓ Context menu icons color-coded correctly

---

## Test Scenario 13: Validation with Warnings (Non-blocking)

**Priority:** P2 (Medium)
**Acceptance Criteria:** VAL-05

### Test Steps:

1. **Setup:**
   - Create a course with all required fields
   - Add structure: 1 module, 1 chapter, 1 content item
   - Do NOT add descriptions to content items (optional field)

2. **Execute Publish:**
   - Click "Publish" on the course
   - **Expected:** PublishValidationModal opens

3. **Verify Warning Checks:**
   - **Expected:** Validation shows:
     - ✓ All required checks pass (green)
     - ⚠️ Content descriptions missing (yellow warning)
   - **Expected:** Warning message:
     - "⚠️ Optional: 1 content item missing description"

4. **Verify Publish Allowed:**
   - **Expected:** Success banner still shows:
     - "✅ All required checks passed! Course is ready to publish."
   - **Expected:** "Publish Course" button enabled
   - **Expected:** Warning suggestions show under "Optional Improvements"

5. **Publish with Warnings:**
   - Click "Publish Course" button
   - **Expected:** Course publishes successfully despite warnings
   - **Expected:** Toast: "Course published successfully!"
   - **Expected:** Status changes to "Published"

**Pass Criteria:**
- ✓ Warning checks display with ⚠️ icon
- ✓ Warnings don't block publishing
- ✓ Success message shows despite warnings
- ✓ Course publishes successfully
- ✓ Suggestions shown for improvement

---

## Test Scenario 14: Cancel Actions

**Priority:** P2 (Medium)
**Acceptance Criteria:** All modals

### Test Steps:

1. **Test Cancel Publish Validation:**
   - Open Publish modal
   - Click "Cancel" button
   - **Expected:** Modal closes
   - **Expected:** Course remains in original status

2. **Test Cancel Archive:**
   - Open Archive modal
   - Enter a reason
   - Click "Cancel"
   - **Expected:** Modal closes
   - **Expected:** Entered data discarded
   - **Expected:** Course remains published

3. **Test Cancel Restore:**
   - Open Restore modal
   - Select "Restore to Draft" option
   - Click "Cancel"
   - **Expected:** Modal closes
   - **Expected:** Course remains archived

4. **Test Cancel Bulk Operation:**
   - Select 3 courses
   - Open Bulk Publish modal
   - Click "Cancel"
   - **Expected:** Modal closes
   - **Expected:** Courses remain selected
   - **Expected:** No courses published

5. **Test X Button Close:**
   - Open any modal
   - Click X button in top-right corner
   - **Expected:** Modal closes
   - **Expected:** No changes saved

6. **Test Click Outside (Backdrop):**
   - Open any modal
   - Click on dark backdrop area
   - **Expected:** Modal remains open (backdrop clicks disabled for safety)

**Pass Criteria:**
- ✓ Cancel button closes modal without changes
- ✓ X button closes modal
- ✓ No accidental data changes
- ✓ Backdrop clicks don't close modals

---

## Test Scenario 15: Keyboard Navigation & Accessibility

**Priority:** P2 (Medium)
**Acceptance Criteria:** ACC-01, ACC-02

### Test Steps:

1. **Test Modal Keyboard Navigation:**
   - Open Publish Validation modal
   - Press Tab key repeatedly
   - **Expected:** Focus moves through:
     1. "Send notification" checkbox
     2. "Cancel" button
     3. "Publish Course" button
     4. Back to checkbox (loop)

2. **Test Enter Key:**
   - Open modal
   - Focus on "Publish Course" button (using Tab)
   - Press Enter key
   - **Expected:** Publish action executes

3. **Test Escape Key:**
   - Open any modal
   - Press Escape key
   - **Expected:** Modal closes (same as Cancel)

4. **Test Checkbox Keyboard:**
   - Tab to "Send notification" checkbox
   - Press Space bar
   - **Expected:** Checkbox toggles state

5. **Test Bulk Selection Keyboard:**
   - Tab to first course checkbox
   - Press Space bar
   - **Expected:** Course selects
   - Press Space bar again
   - **Expected:** Course deselects

**Pass Criteria:**
- ✓ Tab navigation works correctly
- ✓ Enter key confirms actions
- ✓ Escape key cancels/closes
- ✓ Space bar toggles checkboxes
- ✓ Focus visible with purple outline

---

## Test Scenario 16: Error Handling

**Priority:** P1 (High)
**Acceptance Criteria:** Error handling

### Test Steps:

1. **Test Network Error - Validation:**
   - Disconnect internet or stop backend server
   - Try to publish a course
   - **Expected:** Toast error: "Failed to validate course"
   - **Expected:** Modal shows loading state or error message
   - **Expected:** User can close modal and retry

2. **Test Network Error - Publishing:**
   - Open publish modal (validation succeeds)
   - Stop backend before clicking "Publish Course"
   - Click "Publish Course"
   - **Expected:** Toast error: "Failed to publish course"
   - **Expected:** Course remains in Draft status
   - **Expected:** User can retry

3. **Test Bulk Operation Partial Failure:**
   - Select 3 draft courses
   - Make 1 course fail validation (remove required field manually in DB)
   - Execute Bulk Publish
   - **Expected:** Progress shows: "2 succeeded, 1 failed"
   - **Expected:** Red failure section shows failed course with error
   - **Expected:** Green success section shows 2 successful courses
   - **Expected:** Toast: "2 courses published, 1 failed"

4. **Test Invalid Course ID:**
   - Manually trigger archive API with invalid ID
   - **Expected:** 404 error response
   - **Expected:** Toast: "Course not found"

**Pass Criteria:**
- ✓ Network errors handled gracefully
- ✓ Error messages displayed to user
- ✓ Partial failures handled in bulk operations
- ✓ User can retry failed operations
- ✓ Invalid data handled without crash

---

## Test Scenario 17: Concurrent Operations

**Priority:** P2 (Medium)
**Acceptance Criteria:** Data consistency

### Test Steps:

1. **Test Concurrent Status Change:**
   - Open two browser tabs as Admin
   - In Tab 1: Start publishing a course (don't confirm yet)
   - In Tab 2: Archive the same course
   - **Expected:** Tab 2 operation succeeds first
   - Switch to Tab 1
   - Try to complete publish
   - **Expected:** Error or warning about status mismatch

2. **Test Concurrent Bulk Operations:**
   - Open two tabs
   - Select same 3 courses in both tabs
   - Tab 1: Start bulk publish
   - Tab 2: Start bulk archive simultaneously
   - **Expected:** Whichever completes first wins
   - **Expected:** Second operation shows error for already-processed courses
   - **Expected:** No data corruption

**Pass Criteria:**
- ✓ Concurrent operations don't corrupt data
- ✓ Status conflicts handled appropriately
- ✓ User notified of conflicts
- ✓ Course list refreshes after operations

---

## Test Scenario 18: Performance Testing

**Priority:** P2 (Medium)
**Acceptance Criteria:** PERF-01, PERF-02, PERF-03

### Test Steps:

1. **Test Validation Performance:**
   - Create a course with:
     - 10 modules
     - 50 chapters
     - 200 content items
   - Click "Publish"
   - Measure time for validation to complete
   - **Expected:** Validation completes within 3 seconds
   - **Expected:** All 200 items validated correctly

2. **Test Publish Performance:**
   - Click "Publish Course" on validated course
   - Measure time until success toast appears
   - **Expected:** Publish completes within 2 seconds
   - **Expected:** Status updates immediately

3. **Test Archive Performance:**
   - Click "Archive" on published course
   - Measure time until success toast
   - **Expected:** Archive completes within 2 seconds

4. **Test Bulk Operation Performance:**
   - Select 10 courses
   - Execute bulk publish
   - Measure total time
   - **Expected:** Each course processes in ~2 seconds
   - **Expected:** Total time ~20 seconds for 10 courses
   - **Expected:** Progress updates smoothly

5. **Test Large Course List:**
   - Create 50+ courses
   - Navigate to Course Management
   - **Expected:** Page loads within 3 seconds
   - **Expected:** Scrolling is smooth
   - **Expected:** Bulk selection works efficiently

**Pass Criteria:**
- ✓ Validation completes within 3s
- ✓ Publish completes within 2s
- ✓ Archive completes within 2s
- ✓ Bulk operations process efficiently
- ✓ UI remains responsive during operations

---

## Test Scenario 19: Status Badge Visual Verification

**Priority:** P3 (Low)
**Acceptance Criteria:** Visual design

### Test Steps:

1. **Verify Draft Badge:**
   - **Expected:** Background: gray (#E5E7EB)
   - **Expected:** Text: dark gray (#374151)
   - **Expected:** Text: "Draft"
   - **Expected:** Shape: rounded-full pill shape
   - **Expected:** Padding: px-3 py-1

2. **Verify Published Badge:**
   - **Expected:** Background: light green (#D1FAE5)
   - **Expected:** Text: dark green (#065F46)
   - **Expected:** Text: "Published"
   - **Expected:** Position: Next to course title

3. **Verify Archived Badge:**
   - **Expected:** Background: light red (#FEE2E2)
   - **Expected:** Text: dark red (#991B1B)
   - **Expected:** Text: "Archived"

4. **Verify Badge Responsiveness:**
   - Resize browser window to mobile size
   - **Expected:** Badges remain visible
   - **Expected:** Text doesn't truncate
   - **Expected:** Badges don't overlap title

**Pass Criteria:**
- ✓ All badge colors match design
- ✓ Badge text clear and readable
- ✓ Badges positioned correctly
- ✓ Responsive on all screen sizes

---

## Test Summary

**Total Scenarios:** 19
**Priority Breakdown:**
- P0 (Critical): 2 scenarios
- P1 (High): 7 scenarios
- P2 (Medium): 9 scenarios
- P3 (Low): 1 scenario

**Coverage:**
- ✓ Publish Validation (3 scenarios)
- ✓ Publishing Workflow (2 scenarios)
- ✓ Unpublishing (1 scenario)
- ✓ Archiving (2 scenarios)
- ✓ Restoration (1 scenario)
- ✓ Bulk Operations (5 scenarios)
- ✓ UI/UX (3 scenarios)
- ✓ Performance (1 scenario)
- ✓ Error Handling (1 scenario)

**Estimated Testing Time:** 4-6 hours for complete test suite

---

## QA Sign-off

**Tested By:** _________________
**Date:** _________________
**Environment:** Development
**Build Version:** _________________

**Results:**
- [ ] All P0 tests passed
- [ ] All P1 tests passed
- [ ] P2 tests passed: ___/9
- [ ] P3 tests passed: ___/1

**Issues Found:** _________________

**Status:** [ ] Approved [ ] Approved with minor issues [ ] Rejected

**Notes:** _________________

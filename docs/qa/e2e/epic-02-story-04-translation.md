# E2E Test Scenarios: Epic 02 Story 04 - Translation Module

**Story ID:** SPRINT2-EPIC02-STORY04
**Story Name:** Translation Module (English → Telugu)
**Created:** 2025-10-27 00:10:00
**Test Coverage:** 44 Acceptance Criteria (18 implemented, 26 not implemented)
**Test Type:** Manual E2E Testing using Playwright MCP Tools

**Implementation Status:**
- ✅ **IMPLEMENTED:** SEL (Course Selection), EDIT (Basic Editor), SAVE (Auto-save), NAV (Basic Navigation)
- ❌ **NOT IMPLEMENTED:** QUEUE (Translation Queue), QUIZ (Quiz Translation), PUB (Publish Workflow), Rich Text, Full Performance & Accessibility

---

## Test Scenario 1: Course Selection & Progress Display

**Covers:** SEL-01, SEL-02, SEL-03, SEL-04, SEL-05

### TC-1.1: Navigate to Translation Dashboard
**Prerequisites:** Logged in as admin with "LMS Management > Manage" permission

**Steps:**
1. Navigate to `/admin/translations`
2. Verify page loads successfully
3. Verify header displays: "Translation Management"
4. Verify subtitle displays: "English → తెలుగు (Telugu)"

**Expected Results:**
- ✅ Translation Dashboard page loads
- Header "Translation Management" visible
- Telugu text "తెలుగు" renders correctly

**MCP Tool Commands:**
```javascript
browser_navigate("http://localhost:3000/admin/translations")
browser_snapshot()  // Verify page structure
browser_take_screenshot("tc-1-1-dashboard-loaded.png")
```

### TC-1.2: Published Courses Load in Dropdown
**Steps:**
1. Locate course selection dropdown
2. Verify placeholder text: "-- Choose a published course --"
3. Verify dropdown contains published courses
4. Count number of course options

**Expected Results:**
- ✅ SEL-01: Dropdown shows only published courses
- Dropdown has at least 1 published course option
- Draft/archived courses not visible

**MCP Tool Commands:**
```javascript
browser_snapshot()  // Get dropdown ref
browser_click(element="course dropdown", ref="eXX")  // Open dropdown
browser_take_screenshot("tc-1-2-course-dropdown.png")
```

### TC-1.3: Select Course and Load Progress
**Steps:**
1. Select first published course from dropdown
2. Wait for progress card to appear (bg-blue-50 background)
3. Verify "Translation Progress" heading visible
4. Verify progress bar displays

**Expected Results:**
- ✅ SEL-02: Selecting course loads translation progress card
- Blue progress card (bg-blue-50) appears
- "Translation Progress" heading visible
- Progress bar rendered

**MCP Tool Commands:**
```javascript
browser_select_option(element="course dropdown", ref="eXX", values=["<first-course-id>"])
browser_wait_for(text="Translation Progress")
browser_snapshot()
browser_take_screenshot("tc-1-3-progress-loaded.png")
```

### TC-1.4: Progress Bar Shows Percentage
**Steps:**
1. Locate progress bar
2. Verify percentage text displays (e.g., "45 / 120 items - 37%" or similar)
3. Verify purple progress bar fills based on percentage
4. Verify bar width matches percentage (e.g., 37% wide for 37% complete)

**Expected Results:**
- ✅ SEL-03: Progress bar shows % translated
- Text format: "X / Y items (Z%)"
- Progress bar width corresponds to percentage
- Purple color (bg-purple-600)

**MCP Tool Commands:**
```javascript
browser_snapshot()  // Check for progress text and bar
browser_take_screenshot("tc-1-4-progress-percentage.png")
```

### TC-1.5: Progress Breakdown by Content Type
**Steps:**
1. Locate "Progress Breakdown" section
2. Verify checkmarks (✓) or progress indicators (⏳) for each type
3. Verify breakdown includes:
   - Course Title & Description
   - Module Titles
   - Chapter Titles
   - Content Items

**Expected Results:**
- ✅ SEL-04: Progress breakdown shows counts for all content types
- Each type shows: "Type: X / Y translated"
- Completion markers: ✓ (green) for complete, ⏳ (yellow) for in progress
- All 4 content types listed

**MCP Tool Commands:**
```javascript
browser_snapshot()  // Verify breakdown section
browser_take_screenshot("tc-1-5-progress-breakdown.png")
```

### TC-1.6: Start Translating Button Navigation
**Steps:**
1. Locate "Start Translating" button (purple, full width)
2. Click button
3. Verify navigation to editor page
4. Verify URL changes to `/admin/translations/:courseId/editor`
5. Verify "Translation Editor" heading appears

**Expected Results:**
- ✅ SEL-05: "Start Translating" button opens translation editor
- Button click navigates to editor
- URL format: `/admin/translations/:courseId/editor`
- Editor page loads successfully

**MCP Tool Commands:**
```javascript
browser_click(element="Start Translating button", ref="eXX")
browser_wait_for(text="Translation Editor")
browser_snapshot()
browser_take_screenshot("tc-1-6-editor-opened.png")
```

---

## Test Scenario 2: Side-by-Side Translation Editor

**Covers:** EDIT-01, EDIT-02, EDIT-03, EDIT-04

### TC-2.1: English Column (Read-only)
**Prerequisites:** Translation editor open

**Steps:**
1. Locate English column (left side)
2. Verify heading: "ENGLISH (Original)"
3. Verify lock icon (🔒) displays
4. Verify gray background (bg-gray-50)
5. Try to edit English title input
6. Verify input has `readonly` attribute

**Expected Results:**
- ✅ EDIT-01: English column displays content in read-only mode
- Heading "ENGLISH (Original)" with lock icon
- Gray background (bg-gray-50)
- English title input is disabled/readonly
- English description textarea is disabled/readonly

**MCP Tool Commands:**
```javascript
browser_snapshot()  // Get editor structure
browser_take_screenshot("tc-2-1-english-column.png")
// Verify readonly attribute on inputs
```

### TC-2.2: Telugu Column (Editable)
**Steps:**
1. Locate Telugu column (right side)
2. Verify heading: "తెలుగు (Translation)"
3. Verify edit icon (✏️) displays
4. Verify white background (bg-white)
5. Click Telugu title input
6. Verify input is editable (no readonly attribute)
7. Type test text in Telugu title

**Expected Results:**
- ✅ EDIT-02: Telugu column displays editable inputs
- Heading "తెలుగు (Translation)" with edit icon
- White background
- Telugu title input is editable
- Telugu description textarea is editable
- Placeholders: "Enter Telugu translation..."

**MCP Tool Commands:**
```javascript
browser_click(element="Telugu title input", ref="eXX")
browser_type(element="Telugu title input", ref="eXX", text="టెస్ట్ అనువాదం", slowly=false)
browser_snapshot()
browser_take_screenshot("tc-2-2-telugu-column.png")
```

### TC-2.3: Title Character Limit (120 chars)
**Steps:**
1. Locate Telugu title input
2. Verify maxlength attribute = 120
3. Verify character counter displays: "X / 120 characters"
4. Type 10 characters
5. Verify counter updates to: "10 / 120 characters"
6. Attempt to type 130 characters
7. Verify input stops accepting characters at 120

**Expected Results:**
- ✅ EDIT-03: Title fields limited to 120 characters (adjusted from story's 100 chars)
- maxlength attribute = "120"
- Character counter visible and updates in real-time
- Input prevents typing beyond 120 characters

**MCP Tool Commands:**
```javascript
browser_snapshot()  // Check maxlength attribute
browser_type(element="Telugu title input", ref="eXX", text="టెస్ట్ అనువాదం", slowly=false)
browser_snapshot()  // Verify counter updated
browser_take_screenshot("tc-2-3-title-char-limit.png")
```

### TC-2.4: Description Character Limit (1000 chars)
**Steps:**
1. Locate Telugu description textarea
2. Verify maxlength attribute = 1000
3. Verify character counter displays: "X / 1000 characters"
4. Type 50 characters
5. Verify counter updates to: "50 / 1000 characters"
6. Attempt to type 1010 characters
7. Verify textarea stops accepting characters at 1000

**Expected Results:**
- ✅ EDIT-04: Description textareas support up to 1000 characters
- maxlength attribute = "1000"
- Character counter visible and updates in real-time
- Textarea prevents typing beyond 1000 characters
- rows="6" for textarea height

**MCP Tool Commands:**
```javascript
browser_snapshot()  // Check maxlength attribute
browser_type(element="Telugu description textarea", ref="eXX", text="ఇది పూర్తిగా అనువదించబడిన వివరణ", slowly=false)
browser_snapshot()  // Verify counter updated
browser_take_screenshot("tc-2-4-description-char-limit.png")
```

---

## Test Scenario 3: Auto-Save & Save Status Indicators

**Covers:** SAVE-01, SAVE-02, SAVE-03

### TC-3.1: Auto-Save Debounce (1 second delay)
**Prerequisites:** Translation editor open with item loaded

**Steps:**
1. Note current save status (should show "💾 Saved")
2. Click Telugu title input
3. Type text: "టెస్ట్ అనువాదం"
4. Verify save status changes to "✏️ Editing..."
5. Wait exactly 1 second (1000ms) without typing
6. Verify save status changes to "⏳ Saving..."
7. Wait for API call to complete
8. Verify save status changes to "💾 Saved"
9. Verify no additional typing triggers save immediately

**Expected Results:**
- ✅ SAVE-01: Auto-save triggers 1 second after last keystroke (debounced)
- Debounce delay = 1000ms
- No save triggered while typing continuously
- Save triggers 1 second after last keystroke
- API PUT request sent after debounce

**MCP Tool Commands:**
```javascript
browser_snapshot()  // Initial state (Saved)
browser_type(element="Telugu title input", ref="eXX", text="టెస్ట్ అనువాదం", slowly=false)
browser_wait_for(text="✏️ Editing")  // Immediate status change
browser_wait_for(time=1.5)  // Wait for debounce + save
browser_wait_for(text="💾 Saved")  // Final status
browser_take_screenshot("tc-3-1-auto-save-complete.png")
```

### TC-3.2: Save Status Indicator Transitions
**Steps:**
1. Start with saved state (💾 Saved)
2. Type in Telugu title
3. Observe status transition: "💾 Saved" → "✏️ Editing..." → "⏳ Saving..." → "💾 Saved"
4. Verify each status displays correct icon and text
5. Verify status colors:
   - Saved: green (text-green-600)
   - Editing: blue (text-blue-600)
   - Saving: orange (text-orange-600)

**Expected Results:**
- ✅ SAVE-02: Save indicator shows: Editing → Saving → Saved (with icons)
- All 4 states visible: Saved, Editing, Saving, Error (if applicable)
- Icons match states: 💾, ✏️, ⏳, ❌
- Color coding clear and distinct

**MCP Tool Commands:**
```javascript
browser_snapshot()  // Capture initial "Saved" state
browser_type(element="Telugu title input", ref="eXX", text="న", slowly=true)
browser_snapshot()  // "Editing" state
browser_wait_for(time=1.5)
browser_snapshot()  // "Saving" or "Saved" state
browser_take_screenshot("tc-3-2-save-status-transitions.png")
```

### TC-3.3: Save Error Handling (Manual Test - Network Simulation)
**Steps:**
1. Type in Telugu title
2. Simulate network failure (intercept API call)
3. Wait for save attempt (1 second debounce)
4. Verify save status shows "❌ Save failed"
5. Verify error is red (text-red-600)

**Expected Results:**
- ✅ SAVE-03: Failed saves show error message
- Error status displays: "❌ Save failed"
- Color: red (text-red-600)
- NOTE: Retry button not yet implemented (story AC SAVE-04 not implemented)

**MCP Tool Commands:**
```javascript
// This test requires network interception - manual verification needed
browser_snapshot()
browser_take_screenshot("tc-3-3-save-error-state.png")
```

---

## Test Scenario 4: Navigation Between Items

**Covers:** NAV-01, NAV-02, NAV-03, NAV-04, NAV-05

### TC-4.1: Item Counter and Breadcrumb
**Prerequisites:** Translation editor open

**Steps:**
1. Locate item indicator (top of page, gray background)
2. Verify format: "Item X of Y"
3. Verify breadcrumb shows item location
4. Verify breadcrumb format: "Module > Chapter > Content: Title" (or similar)

**Expected Results:**
- Item counter displays current position
- Breadcrumb shows hierarchical path to current item
- Both update when navigating between items

**MCP Tool Commands:**
```javascript
browser_snapshot()  // Get breadcrumb and counter
browser_take_screenshot("tc-4-1-item-counter-breadcrumb.png")
```

### TC-4.2: Previous Button Navigation
**Steps:**
1. Verify current item number (e.g., "Item 2 of 10")
2. Click "← Previous" button
3. Wait for item to change
4. Verify item number decreased by 1 (e.g., "Item 1 of 10")
5. Verify English and Telugu fields update to new item
6. Navigate to Item 1
7. Verify "Previous" button is disabled

**Expected Results:**
- ✅ NAV-01: "Previous" button navigates to previous item
- Button disabled on first item (Item 1)
- Button enabled on all other items
- Fields update to show previous item's data

**MCP Tool Commands:**
```javascript
browser_snapshot()  // Note current item number
browser_click(element="Previous button", ref="eXX")
browser_wait_for(time=0.5)  // Wait for navigation
browser_snapshot()  // Verify item number changed
browser_take_screenshot("tc-4-2-previous-navigation.png")
```

### TC-4.3: Next Button Navigation (Save & Next)
**Steps:**
1. Verify current item number (e.g., "Item 1 of 10")
2. Click "Save & Next →" button
3. Wait for save and navigation
4. Verify item number increased by 1 (e.g., "Item 2 of 10")
5. Verify English and Telugu fields update to new item
6. Navigate to last item (Item 10 of 10)
7. Verify "Save & Next" button is disabled

**Expected Results:**
- ✅ NAV-03: "Save & Next" button saves and advances to next item
- Auto-save triggered before navigation
- Button disabled on last item
- Button enabled on all other items
- Fields update to show next item's data

**MCP Tool Commands:**
```javascript
browser_snapshot()  // Note current item number
browser_click(element="Save & Next button", ref="eXX")
browser_wait_for(time=0.5)  // Wait for save + navigation
browser_snapshot()  // Verify item number changed
browser_take_screenshot("tc-4-3-next-navigation.png")
```

### TC-4.4: Skip Button Navigation
**Steps:**
1. Verify current item number
2. Click "Skip (move to next)" button (yellow)
3. Wait for navigation
4. Verify moved to next UNTRANSLATED item (may skip translated items)
5. If all items translated, verify wraps to first item

**Expected Results:**
- ✅ NAV-02: "Skip" button saves current progress and moves to next untranslated item
- Skips translated items
- Wraps to beginning if at end
- Button always enabled

**MCP Tool Commands:**
```javascript
browser_snapshot()  // Note current item
browser_click(element="Skip button", ref="eXX")
browser_wait_for(time=0.5)
browser_snapshot()  // Verify moved to untranslated item
browser_take_screenshot("tc-4-4-skip-navigation.png")
```

### TC-4.5: Mark as Translated Checkbox
**Steps:**
1. Fill in Telugu title: "పూర్తి అనువాదం"
2. Fill in Telugu description: "ఇది పూర్తిగా అనువదించబడిన వివరణ"
3. Wait for auto-save (1 second)
4. Verify save status: "💾 Saved"
5. Check "Mark as Translated" checkbox
6. Verify checkbox triggers save
7. Verify auto-navigates to next untranslated item
8. Verify item number changed

**Expected Results:**
- ✅ NAV-04: "Mark as Translated" checkbox updates progress, saves, and advances
- Checkbox label: "☑ Mark as Translated (saves and moves to next untranslated item)"
- Checking box triggers save
- Auto-advances to next untranslated item
- Item status changes to "translated" in backend

**MCP Tool Commands:**
```javascript
browser_type(element="Telugu title", ref="eXX", text="పూర్తి అనువాదం")
browser_type(element="Telugu description", ref="eXX", text="ఇది పూర్తిగా అనువదించబడిన వివరణ")
browser_wait_for(time=1.5)  // Auto-save
browser_click(element="Mark as Translated checkbox", ref="eXX")
browser_wait_for(time=1)  // Save + navigation
browser_snapshot()  // Verify moved to next item
browser_take_screenshot("tc-4-5-mark-translated.png")
```

### TC-4.6: Progress Bar Updates After Translation
**Steps:**
1. Note current progress percentage (e.g., "37%")
2. Mark an item as translated (follow TC-4.5)
3. Return to dashboard: Click "← Back to Dashboard"
4. Re-select same course
5. Verify progress percentage increased (e.g., "38%")

**Expected Results:**
- ✅ NAV-05: Progress bar updates immediately after marking complete
- Progress percentage increases by 1 item
- Progress bar width increases
- Breakdown counters update

**MCP Tool Commands:**
```javascript
// Note: Requires completing TC-4.5 first
browser_click(element="Back to Dashboard", ref="eXX")
browser_wait_for(text="Translation Management")
browser_select_option(element="course dropdown", ref="eXX", values=["<course-id>"])
browser_wait_for(text="Translation Progress")
browser_snapshot()  // Verify updated progress
browser_take_screenshot("tc-4-6-progress-updated.png")
```

---

## Test Scenario 5: Error States & Empty States

**Covers:** Error Handling, Loading States

### TC-5.1: No Published Courses (Empty State)
**Steps:**
1. Simulate empty course list (no published courses)
2. Navigate to `/admin/translations`
3. Verify dropdown shows only placeholder option
4. Verify "No Course Selected" message displays
5. Verify icon 🌐 or empty state graphic

**Expected Results:**
- Dropdown contains only: "-- Choose a published course --"
- Empty state message: "No Course Selected"
- Helpful text: "Select a published course from the dropdown above to view translation progress and start translating."
- No progress card visible

**MCP Tool Commands:**
```javascript
// Requires backend setup with no published courses
browser_navigate("http://localhost:3000/admin/translations")
browser_snapshot()
browser_take_screenshot("tc-5-1-empty-state-no-courses.png")
```

### TC-5.2: Network Failure on Dashboard (Course List)
**Steps:**
1. Intercept and abort API call: `/api/v2/lms/admin/courses`
2. Navigate to dashboard
3. Verify error message displays
4. Verify error background: red (bg-red-50)
5. Verify error text: "⚠️ Failed to load courses"

**Expected Results:**
- Error card displays with red background
- Error icon ⚠️ visible
- Error message clear and user-friendly
- Retry option or page reload suggested

**MCP Tool Commands:**
```javascript
// Requires network interception - manual test
browser_navigate("http://localhost:3000/admin/translations")
browser_wait_for(text="Failed to load")
browser_snapshot()
browser_take_screenshot("tc-5-2-network-failure-dashboard.png")
```

### TC-5.3: Network Failure on Editor (Translatable Items)
**Steps:**
1. Intercept and abort API call: `/api/v2/lms/admin/translations/courses/:courseId/items`
2. Navigate to editor: `/admin/translations/:courseId/editor`
3. Verify error message displays
4. Verify "Back to Dashboard" button visible

**Expected Results:**
- Error card displays with red background
- Error message: "⚠️ Failed to load translatable items"
- "Back to Dashboard" button functional
- Clicking button returns to dashboard

**MCP Tool Commands:**
```javascript
// Requires network interception - manual test
browser_navigate("http://localhost:3000/admin/translations/<course-id>/editor")
browser_wait_for(text="Failed to load")
browser_click(element="Back to Dashboard", ref="eXX")
browser_snapshot()
browser_take_screenshot("tc-5-3-network-failure-editor.png")
```

### TC-5.4: Loading Spinner (Dashboard)
**Steps:**
1. Navigate to dashboard
2. Observe loading state while courses fetch
3. Verify spinner animation (animate-spin class)
4. Verify spinner size: h-16 w-16
5. Verify spinner color: border-purple-600

**Expected Results:**
- Loading spinner displays briefly during data fetch
- Spinner centered on page
- Animation smooth (60 FPS)
- Disappears when data loads

**MCP Tool Commands:**
```javascript
browser_navigate("http://localhost:3000/admin/translations")
// Loading state may be too fast to capture - manual verification
browser_snapshot()
browser_take_screenshot("tc-5-4-loading-spinner.png")
```

### TC-5.5: Loading Spinner (Editor)
**Steps:**
1. Navigate to editor
2. Observe loading state while items fetch
3. Verify spinner animation
4. Verify spinner replaces content during load

**Expected Results:**
- Loading spinner displays during translatable items fetch
- Spinner centered in editor area
- Editor content hidden during load
- Content appears after load complete

**MCP Tool Commands:**
```javascript
browser_navigate("http://localhost:3000/admin/translations/<course-id>/editor")
// Loading state may be too fast - manual verification
browser_snapshot()
browser_take_screenshot("tc-5-5-editor-loading.png")
```

---

## Test Scenario 6: Responsive Design & Telugu Unicode

**Covers:** Accessibility, Telugu Text Rendering

### TC-6.1: Telugu Unicode Rendering
**Steps:**
1. Type Telugu text in title: "టెస్ట్ అనువాదం"
2. Type Telugu text in description: "ఇది పూర్తిగా అనువదించబడిన వివరణ"
3. Verify text renders correctly (no squares/boxes)
4. Verify font is clear and readable
5. Verify no layout breaks with Telugu characters

**Expected Results:**
- Telugu characters render correctly
- Font supports Telugu Unicode (Noto Sans Telugu or fallback)
- No character display issues (boxes, missing glyphs)
- Text wraps correctly in inputs

**MCP Tool Commands:**
```javascript
browser_type(element="Telugu title", ref="eXX", text="టెస్ట్ అనువాదం")
browser_type(element="Telugu description", ref="eXX", text="ఇది పూర్తిగా అనువదించబడిన వివరణ")
browser_snapshot()
browser_take_screenshot("tc-6-1-telugu-unicode-rendering.png")
```

### TC-6.2: Responsive Layout (Desktop 1920x1080)
**Steps:**
1. Resize browser to 1920x1080
2. Verify 2-column grid displays side-by-side
3. Verify English column width ≈ 50%
4. Verify Telugu column width ≈ 50%
5. Verify no horizontal scroll

**Expected Results:**
- Columns display side-by-side (grid-cols-2)
- Equal width distribution
- Content readable without scrolling horizontally
- UI looks clean and professional

**MCP Tool Commands:**
```javascript
browser_resize(1920, 1080)
browser_navigate("http://localhost:3000/admin/translations/<course-id>/editor")
browser_snapshot()
browser_take_screenshot("tc-6-2-desktop-layout.png")
```

### TC-6.3: Responsive Layout (Tablet 1366x768)
**Steps:**
1. Resize browser to 1366x768
2. Verify 2-column layout still functional
3. Verify text inputs resize appropriately
4. Verify all buttons visible

**Expected Results:**
- Columns still side-by-side (may be slightly narrower)
- Text readable without zoom
- Buttons accessible
- No UI overflow

**MCP Tool Commands:**
```javascript
browser_resize(1366, 768)
browser_snapshot()
browser_take_screenshot("tc-6-3-tablet-layout.png")
```

---

## NOT IMPLEMENTED Test Scenarios (Future Implementation)

### ❌ Test Scenario 7: Translation Queue (NOT IMPLEMENTED)
**Covers:** QUEUE-01, QUEUE-02, QUEUE-03, QUEUE-04, QUEUE-05
**Reason:** Translation Queue component not yet built. Manual item-by-item navigation only.

### ❌ Test Scenario 8: Quiz Translation (NOT IMPLEMENTED)
**Covers:** QUIZ-01, QUIZ-02, QUIZ-03, QUIZ-04, QUIZ-05
**Reason:** Quiz-specific translation interface not built. Only basic title/description translation.

### ❌ Test Scenario 9: Publish Workflow (NOT IMPLEMENTED)
**Covers:** PUB-01, PUB-02, PUB-03, PUB-04, PUB-05, PUB-06, PUB-07
**Reason:** Publish translations modal and workflow not implemented. No language toggle for students.

### ❌ Test Scenario 10: Rich Text Formatting (NOT IMPLEMENTED)
**Covers:** EDIT-05
**Reason:** Rich text editor (bold, italic, lists) not integrated. Plain text only.

### ❌ Test Scenario 11: Performance & Accessibility (NOT IMPLEMENTED)
**Covers:** PERF-01, PERF-02, PERF-03, ACC-01, ACC-02, ACC-03
**Reason:** Performance benchmarks and accessibility features not fully implemented.

---

## Test Execution Summary (To Be Filled by QA)

**Total Test Cases:** 22 (TC-1.1 through TC-6.3)
**Executed:** TBD
**Passed:** TBD
**Failed:** TBD
**Blocked:** TBD

**Screenshot Location:** `.playwright-mcp/sprint-2/epic-02-story-04/`

**Reviewed By:** TBD (QA Agent - Test Architect)
**Review Date:** TBD
**Gate Status:** PENDING

---

## Notes for QA Agent

1. **Implementation Status:** Only core dashboard and editor implemented. Queue, Quiz translation, and Publish workflows NOT implemented.

2. **Critical ACs to Test:** SEL-01 to SEL-05, EDIT-01 to EDIT-04, SAVE-01 to SAVE-03, NAV-01 to NAV-05

3. **Not Implemented (26 ACs):** EDIT-05, SAVE-04, SAVE-05, NAV-06, QUIZ-01 to QUIZ-05, QUEUE-01 to QUEUE-05, PUB-01 to PUB-07, PERF-01 to PERF-03, ACC-01 to ACC-03

4. **Test Data Requirements:**
   - At least 1 published course with modules/chapters/content items
   - Admin user with "LMS Management" → "Manage" permission
   - Test credentials: admin@test.com / admin123 (or as configured)

5. **Playwright MCP Tools Usage:**
   - Use `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`
   - Capture screenshots for all test cases as evidence
   - Check console for errors: `browser_console_messages(onlyErrors=true)`

6. **Expected Test Coverage:** ~40% (18 of 44 ACs implemented)

---

**File Version:** 1.0
**Created:** 2025-10-27 00:10:00
**Last Updated:** 2025-10-27 00:10:00

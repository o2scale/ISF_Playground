# Sprint 2 QA Handoff - START HERE

**Created:** 2025-10-24 18:29:42
**Sprint:** Sprint 2 - LMS & Enhanced User Roles
**Total Stories:** 32 stories across 5 epics
**Your Mission:** Test Sprint 2 stories using Playwright MCP tools, verify quality gates

---

## 🚀 Quick Start (3 Steps)

### Step 1: Load Essential Context (Auto-loaded by BMAD)
Your BMAD agent will automatically load:
- `.ai/qa-onboarding-guide.md` - General QA workflow
- `.ai/workflow-quick-reference.md` - BMAD workflow rules
- `.ai/playwright-mcp-tools-reference.md` - 26 MCP tools reference
- `.bmad-core/agents/qa.md` - Your agent instructions

### Step 2: Read Sprint 2 Context (REQUIRED - Read Now)
```
📖 MUST READ (in order):
1. .ai/sprint-2/sprint-2-overview.md (10 min)
   → Understand Sprint 2 architecture and testing scope

2. .ai/sprint-2/epic-summaries.md (5 min)
   → Quick overview of all 5 epics

3. .ai/sprint-2/design-system-reference.md (10 min)
   → UI patterns to verify during testing
```

### Step 3: Find Stories Ready for QA
```bash
# Check which stories are ready for review
grep -l "READY FOR QA" docs/stories/sprint2/*.md

# Example output:
# docs/stories/sprint2/epic-02-story-01-course-creation-structure-builder.md
```

---

## 📋 Your Workflow for EACH Story

```
1. Find story marked "✅ READY FOR QA"
   → Search: grep -l "READY FOR QA" docs/stories/sprint2/*.md
   → Read story file completely

2. Verify prerequisites
   → E2E test scenarios exist: docs/qa/e2e/epic-XX-story-YY-{name}.md
   → Quality gate YAML exists: docs/qa/gates/sprint-2-epic-XX.story-YY-{slug}.yml
   → Servers running: frontend:3000, backend:5001

3. Execute E2E tests using Playwright MCP tools
   → browser_navigate, browser_snapshot, browser_click, etc.
   → Execute ALL test scenarios from E2E doc
   → Capture screenshots as evidence
   → Check console for errors

4. Evaluate against quality gate criteria
   → Read quality gate YAML file
   → Verify all critical ACs pass
   → Check test coverage meets requirement (typically 80%)
   → Verify pass/fail criteria

5. Make gate decision
   → PASS: All tests pass, no critical issues
   → CONCERNS: Tests pass but non-critical issues found
   → FAIL: Any test fails or critical issue found

6. Document QA Results in story file
   → Create "QA Results" section
   → Test execution summary
   → Gate decision with reasoning

7. Update quality gate YAML file
   → Change gate status from PENDING to PASS/CONCERNS/FAIL
   → Add reviewer name and timestamp
   → Include quality score

8. Update story status
   → PASS → Set status to "✅ DONE"
   → FAIL/CONCERNS → Return to Dev with feedback
```

---

## 🎯 Sprint 2 Specific Testing Guidelines

### Architecture to Understand

**3-Tier Course Hierarchy:**
```
Course → Module → Chapter → Content Items
```

**When testing course features:**
- Verify hierarchy is maintained correctly
- Check parent-child relationships in database
- Ensure deletion cascades appropriately
- Test navigation through hierarchy

### Role-Based UI Testing

**Student UI (Child-Friendly):**
```
✅ Verify:
- Patrick Hand font used for all text
- Large buttons (px-8 py-4 minimum)
- Bright gradients and colors
- Emojis used liberally
- Animations on hover/click
- Large course cards (280px+)

❌ Fail if:
- Professional/boring styling
- Small fonts (<16px)
- No emojis or animations
- Standard button sizes
```

**Admin/Coach UI (Professional):**
```
✅ Verify:
- Clean, professional styling
- Data tables for lists
- Charts for analytics (Recharts)
- Standard button sizes
- Minimal emojis

❌ Fail if:
- Child-friendly fonts/colors
- Over-use of emojis
- Unprofessional appearance
```

### Key Features to Test

**Real-Time Features (WebSocket):**
```javascript
// 1. Open browser and login
browser_navigate("http://localhost:3000")
// ... login steps ...

// 2. Trigger notification in backend (via API call or separate window)
// 3. Verify notification appears without refresh
browser_snapshot()  // Should show notification badge updated
```

**Media Upload (S3 + CDN):**
```javascript
// 1. Navigate to upload form
browser_navigate("http://localhost:3000/admin/courses/create")

// 2. Upload file
browser_file_upload(paths=["./test-image.jpg"])

// 3. Verify:
// - Upload progress shown
// - CDN URL displayed after upload
// - Image displays correctly
```

**ISF Coin System:**
```javascript
// 1. Complete quiz or task
// 2. Verify coin animation plays
browser_take_screenshot("coin-animation.png")

// 3. Verify wallet updates
browser_snapshot()  // Check coin count increased

// 4. Verify transaction recorded
browser_navigate("http://localhost:3000/wallet/history")
browser_snapshot()  // Check transaction in history
```

---

## 🆕 Quality Gate YAML Verification (NEW!)

### What to Check

Dev agent should have created: `docs/qa/gates/sprint-2-epic-XX.story-YY-{slug}.yml`

**Verify YAML Contains:**
```yaml
schema: 1
story: 'sprint-2-epic-XX.story-YY'
story_title: 'Story Title'
gate: PENDING  # You'll change this
status_reason: 'Awaiting QA review'  # You'll update this

quality_criteria:
  test_coverage_required: 80  # Must be >=80
  critical_acs: [1, 2, 3]     # Must have critical ACs listed
  e2e_scenarios_path: 'docs/qa/e2e/...'  # Must exist

acceptance_criteria_map:
  - ac_number: 1
    description: '...'
    test_cases: ['TC 1.1', 'TC 1.2']
    priority: 'P0'  # P0/P1/P2/P3
  # ... all ACs mapped

pass_criteria:
  - 'Clear pass conditions'

fail_criteria:
  - 'Clear fail conditions'
```

**If YAML missing or incomplete:**
```
→ Gate = FAIL (automatic)
→ Return to Dev with message: "Quality gate YAML missing or incomplete"
→ Do not proceed with testing
```

---

## 🔧 Playwright MCP Tools Quick Reference

### Navigation & Page Inspection
```javascript
browser_navigate("http://localhost:3000")
browser_snapshot()                      // Get page structure with refs
browser_take_screenshot("file.png")     // Capture evidence
browser_console_messages()              // Check for errors
browser_console_messages(onlyErrors=true)  // Only errors
```

### Interaction
```javascript
browser_click(element="button", ref="e45")
browser_type(element="input", ref="e12", text="value", slowly=false, submit=false)
browser_fill_form(fields=[...])         // Fill multiple fields at once
browser_select_option(element="dropdown", ref="e23", values=["option"])
browser_hover(element="menu", ref="e34")
browser_press_key(key="Enter")
browser_drag(startElement="item", startRef="e12", endElement="dropzone", endRef="e45")
```

### Waiting
```javascript
browser_wait_for(text="Success")        // Wait for text to appear
browser_wait_for(textGone="Loading")    // Wait for text to disappear
browser_wait_for(time=3)                // Wait 3 seconds
```

### Responsive Testing
```javascript
browser_resize(375, 667)                // Mobile (iPhone)
browser_resize(768, 1024)               // Tablet (iPad)
browser_resize(1920, 1080)              // Desktop
```

### Advanced
```javascript
browser_evaluate(function="() => document.title")  // Run JS
browser_handle_dialog(accept=true, promptText="...")
browser_file_upload(paths=["./file1.jpg", "./file2.png"])
browser_network_requests()              // See all network activity
```

---

## 📝 Test Execution Example

**Story:** Epic 02 Story 01 - Course Creation

### 1. Read Test Scenarios
```bash
cat docs/qa/e2e/epic-02-story-01-course-creation.md

# Example test case:
## AC1: Admin can create new course

### TC 1.1: Create course with valid data
**Preconditions:**
- User logged in as admin
- Backend running on :5001

**Steps:**
1. Navigate to Course Builder
2. Click "Create New Course"
3. Fill in course name: "Computer Apps"
4. Fill in description: "Learn MS Office"
5. Select category: "Technical"
6. Click "Create Course"
7. Verify success message
8. Verify course appears in list

**Expected Results:**
- Success toast appears
- Course card displays in grid
- Course name, description correct
- No console errors
```

### 2. Execute Using MCP Tools
```javascript
// TC 1.1 Execution

// Navigate to admin panel
browser_navigate("http://localhost:3000")
browser_snapshot()  // Get page structure

// Login as admin
browser_click(element="Login", ref="e23")
browser_type(element="email", ref="e12", text="admin@test.com")
browser_type(element="password", ref="e13", text="admin123")
browser_click(element="Submit", ref="e14")
browser_wait_for(text="Admin Panel")

// Navigate to Course Builder
browser_click(element="Courses", ref="e45")
browser_wait_for(text="Course Management")

// Create new course
browser_click(element="Create New Course", ref="e67")
browser_wait_for(text="Course Builder")

// Fill form
browser_type(element="Course Name", ref="e89", text="Computer Apps")
browser_type(element="Description", ref="e90", text="Learn MS Office")
browser_select_option(element="Category", ref="e91", values=["Technical"])

// Submit
browser_click(element="Create Course", ref="e92")
browser_wait_for(text="Success")

// Verify
browser_snapshot()  // Should show success toast and course in list
browser_console_messages(onlyErrors=true)  // Should be empty
browser_take_screenshot("tc-1-1-course-created.png")

// Result: ✅ PASS - All expected results verified
```

### 3. Document Result
```markdown
### TC 1.1: Create course with valid data
**Status:** ✅ PASS
**Duration:** 15 seconds
**Evidence:**
- Screenshot: tc-1-1-course-created.png
- Console: No errors
**Notes:**
- Success toast appeared
- Course displayed in grid with correct name/description
- All expected results verified
```

---

## 📊 Gate Decision Framework

### 1. E2E Test Results (HIGHEST PRIORITY)
```
ANY test case fails → FAIL (automatic)
Test scenarios missing → FAIL (automatic)
Quality gate YAML missing → FAIL (automatic)
```

### 2. Critical Issues
```
Security vulnerability → FAIL
Data loss risk → FAIL
Broken core functionality → FAIL
Missing critical ACs (from gate YAML) → FAIL
```

### 3. Non-Critical Issues
```
Medium bugs → CONCERNS
Performance issues (non-critical) → CONCERNS
Minor UI issues → CONCERNS
Missing nice-to-have features → CONCERNS
```

### 4. All Pass
```
All tests pass + No critical issues → PASS
Quality score 85+ → PASS
All critical ACs pass (from gate YAML) → PASS
```

---

## 📄 QA Results Template

Add to story file under `## QA Results` section:

```markdown
## QA Results

### Review Date: 2025-10-24 18:30:00
### Reviewed By: Quinn (Test Architect)

### E2E Test Execution (Playwright MCP)

**Test Scenarios:** `docs/qa/e2e/epic-02-story-01-course-creation.md`

**Execution Summary:**
- Total Test Cases: 52
- Passed: ✅ 52
- Failed: ❌ 0
- Duration: 8 minutes 30 seconds

**Test Results by AC:**
| AC# | Test Case | Status | Evidence |
|-----|-----------|--------|----------|
| AC1 | TC 1.1: Create course valid data | ✅ PASS | tc-1-1-course-created.png |
| AC1 | TC 1.2: Course name validation | ✅ PASS | tc-1-2-validation.png |
| AC2 | TC 2.1: Add module to course | ✅ PASS | tc-2-1-module-added.png |
| ... | ... | ... | ... |

**Responsive Tests:**
- Mobile (375px): ✅ PASS
- Tablet (768px): ✅ PASS
- Desktop (1920px): ✅ PASS

**Console Errors:** None ✅

**Screenshots:** `.playwright-mcp/sprint-2/epic-02-story-01/`

---

### Quality Gate Evaluation

**Gate YAML:** `docs/qa/gates/sprint-2-epic-02.story-01-course-creation.yml`

**Critical ACs Status:**
- AC1 (Create course): ✅ PASS
- AC2 (Add modules): ✅ PASS
- AC3 (Add chapters): ✅ PASS
- AC5 (Course validation): ✅ PASS
- AC8 (Hierarchy integrity): ✅ PASS

**Test Coverage:** 95% (Required: 80%) ✅

**Pass Criteria Met:**
- ✅ All critical ACs pass
- ✅ Test coverage >= 80%
- ✅ No P0 or P1 bugs
- ✅ All E2E scenarios executed successfully
- ✅ No console errors
- ✅ Responsive design verified

**Fail Criteria:** None triggered ✅

---

### Code Quality Assessment

**Architecture:** Clean separation of concerns. Course/Module/Chapter models well-structured.

**Security:** ✅ PASS - Proper authentication/authorization checks
**Performance:** ✅ PASS - MongoDB queries optimized with indexes
**Reliability:** ✅ PASS - Error handling present, validation comprehensive
**Maintainability:** ✅ PASS - Code well-organized, follows patterns

---

### Gate Decision

**Gate Status:** ✅ PASS
**Quality Score:** 95/100
**Status Reason:** All 52 test cases pass, all critical ACs verified, code quality excellent, no issues found

---

### Updated Quality Gate YAML

```yaml
gate: PASS  # Updated from PENDING
status_reason: 'All test cases pass, all critical ACs verified, excellent quality'
reviewer: 'Quinn (Test Architect)'
updated: '2025-10-24T18:45:00Z'
quality_score: 95

evidence:
  e2e_tests:
    total: 52
    passed: 52
    failed: 0
    duration: '8 minutes 30 seconds'
```

---

### Recommended Status
✅ **DONE** - Story complete and ready for production
```

---

## 🚨 Common Testing Scenarios

### Scenario 1: All Tests Pass (PASS)
```
1. Execute all test cases → All pass ✅
2. Check quality gate criteria → All met ✅
3. Code review → No critical issues ✅
4. Gate = PASS, Quality Score 90-100
5. Update QA Results section
6. Update gate YAML (PENDING → PASS)
7. Set story status to "✅ DONE"
```

### Scenario 2: Test Case Fails (FAIL)
```
1. Execute test cases → TC 3.2 fails ❌
2. Capture failure screenshot
3. Document failure details
4. Gate = FAIL (automatic, don't continue)
5. Update QA Results with failure
6. Update gate YAML (PENDING → FAIL)
7. Return to Dev with specific failure details
8. HALT - Don't proceed with code review
```

### Scenario 3: Quality Gate YAML Missing (FAIL)
```
1. Check for gate YAML file → Not found ❌
2. Gate = FAIL (automatic)
3. Document: "Quality gate YAML file missing"
4. Return to Dev: "Please create docs/qa/gates/sprint-2-epic-XX.story-YY-{slug}.yml"
5. HALT - Can't proceed without gate criteria
```

### Scenario 4: Security Issue Found (FAIL)
```
1. Execute tests → All pass ✅
2. Code review → Critical security issue found ❌
3. Gate = FAIL (security overrides passing tests)
4. Document issue in Security Review section
5. Update gate YAML (PENDING → FAIL)
6. Return to Dev immediately with details
```

### Scenario 5: Non-Critical Issues (CONCERNS)
```
1. Execute tests → All pass ✅
2. Code review → Minor performance issue found ⚠️
3. All critical ACs pass ✅
4. Gate = CONCERNS (can proceed with caution)
5. Document issues in QA Results
6. Update gate YAML (PENDING → CONCERNS)
7. Recommend team review before proceeding
```

---

## ⚠️ Critical Rules

### Testing Execution
```
✅ Execute E2E tests FIRST (before code review)
✅ ANY test failure = automatic FAIL gate
✅ Use Playwright MCP tools programmatically
✅ Capture screenshots for all test cases
✅ Check console messages for errors
❌ Don't skip test execution
❌ Don't run npx playwright test commands
❌ Don't modify story ACs or Dev Agent Record
```

### Gate Decisions
```
✅ Be decisive: PASS / CONCERNS / FAIL
✅ Include clear reasoning
✅ Balance quality with pragmatism
✅ Verify quality gate YAML criteria
❌ Don't block arbitrarily
❌ Don't pass with failing tests
❌ Don't skip gate YAML verification
```

### Story File Updates
```
✅ ONLY update "QA Results" section
✅ Document test execution comprehensively
✅ Include screenshots and evidence
❌ DO NOT modify: Story, ACs, Tasks, Dev Notes, Dev Agent Record
❌ DO NOT change story status if tests fail
```

---

## 🔍 Child-Friendly UI Verification Checklist

When testing student-facing features:

```
□ Patrick Hand font used consistently
□ Buttons are large (px-8 py-4 minimum)
□ Colors are bright and cheerful (gradients)
□ Emojis used in headings and buttons
□ Animations on hover/click
□ Course cards are large (280px+ width)
□ Text is large (text-lg or bigger)
□ Borders are thick (border-4 for emphasis)
□ Shadows are strong (shadow-lg, shadow-xl)
□ Error messages are friendly (not technical)
□ Loading states are fun (animated spinners with emojis)
□ Success messages use celebration emojis (🎉, ⭐, 🚀)
```

**Fail student UI if:**
- Professional/boring styling
- Small fonts (<16px)
- No animations
- Technical error messages
- Standard button sizes
- Missing emojis

---

## 📖 File Locations Reference

```
docs/stories/sprint2/
└── epic-XX-story-YY-{name}.md         # Story file (read this)

docs/qa/e2e/
└── epic-XX-story-YY-{name}.md         # Test scenarios (execute these)

docs/qa/gates/
└── sprint-2-epic-XX.story-YY-{slug}.yml  # Quality gate (verify & update)

.playwright-mcp/sprint-2/
└── epic-XX-story-YY/                  # Screenshots saved here
    ├── tc-1-1-screenshot.png
    ├── tc-1-2-screenshot.png
    └── ...

.ai/sprint-2/
├── sprint-2-overview.md               # Sprint 2 architecture
├── design-system-reference.md         # UI patterns to verify
└── epic-summaries.md                  # Epic quick reference
```

---

## ✅ Pre-Flight Checklist

Before starting your first review:

```
□ Read .ai/sprint-2/sprint-2-overview.md (10 min)
□ Read .ai/sprint-2/design-system-reference.md (10 min)
□ Understand child-friendly UI vs professional UI difference
□ Playwright MCP installed: claude mcp add playwright npx '@playwright/mcp@latest'
□ Servers running (backend:5001, frontend:3000)
□ Know how to read quality gate YAML files
□ Ready to execute E2E tests using MCP tools
```

---

## 🎯 Success Criteria

You're successful when:
1. All E2E test scenarios executed using MCP tools
2. Quality gate criteria verified
3. Gate decision made: PASS / CONCERNS / FAIL
4. QA Results section comprehensive and clear
5. Quality gate YAML updated with decision
6. Screenshots captured as evidence
7. Console errors checked and documented
8. Responsive behavior verified (mobile, tablet, desktop)

---

**Now activate your QA agent and wait for stories marked "READY FOR QA"!**

```bash
claude --agent qa
# Say: "I'm ready to review Sprint 2 stories as they become ready"
```

**Good luck! 🎯**

---

**Version:** 1.0
**Created:** 2025-10-24 18:29:42
**For:** Sprint 2 QA Onboarding

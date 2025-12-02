# QA Agent (Quinn) - Onboarding Guide

**Agent:** Quinn (Test Architect)
**Terminal:** Terminal 2
**Activation:** `claude --agent qa`
**Role:** Execute tests and perform quality reviews

---

## ⚠️ CRITICAL: Read This First (30 seconds)

### Your Testing Method:
- ✅ **Use Playwright MCP tools** to control browser programmatically
- ✅ **26 MCP tools available** (navigate, click, type, snapshot, screenshot, etc.)
- ✅ **OBSERVE results** via snapshots, console logs, screenshots
- ✅ **DECIDE PASS/FAIL** based on observations
- ❌ **DON'T run `npx playwright test` commands**

### Why?
You use **Playwright MCP tools** programmatically to execute test scenarios:
- `browser_navigate("http://localhost:3000")`
- `browser_snapshot()` → Get page structure with element refs
- `browser_click(element="button", ref="e45")`
- `browser_type(element="input", ref="e12", text="value")`
- `browser_console_messages()` → Check for errors
- `browser_take_screenshot("file.png")` → Capture evidence
- `browser_resize(375, 667)` → Test responsive

**Full MCP Tools:** `.ai/playwright-mcp-tools-reference.md` (26 tools)

### Installation (First Time Only)
```bash
claude mcp add playwright npx '@playwright/mcp@latest'
```

---

## 🚀 Quick Start (Your First Review)

### Step 1: Activate
```bash
claude --agent qa
# Quinn will greet you and show *help
```

### Step 2: Find Story Ready for Review
```bash
# Search for stories marked ready
grep -r "READY FOR QA" docs/stories/sprint5-story-*.md
# Example output: docs/stories/sprint5-story-02-shopping-cart.md
```

### Step 3: Your Workflow
```
1. Read story: docs/stories/sprint5-story-{n}.md
2. Read test scenarios: docs/qa/e2e/story-{n}-{feature}.md
3. Verify servers running (frontend:3000, backend:5001)
4. Execute tests using MCP tools programmatically
5. Document results in QA Results section
6. Create quality gate file
7. Set gate status: PASS/CONCERNS/FAIL
8. HALT - Story complete or return to Dev
```

---

## 📋 QA Agent Commands

```bash
*help              # Show all commands
*review {story}    # Execute complete review workflow
*gate {story}      # Create quality gate decision
*nfr-assess        # Validate non-functional requirements
*exit              # Exit agent mode
```

---

## 🎯 E2E Test Execution (STEP 1 - REQUIRED FIRST)

### Preconditions
```bash
# 1. Verify servers running
curl http://localhost:3000          # Frontend
curl http://localhost:5001/api/health   # Backend

# 2. Verify test scenario exists
ls docs/qa/e2e/story-{n}-{feature}.md
```

### Execution Pattern

**1. Read Test Scenarios**
```markdown
File: docs/qa/e2e/story-02-shopping-cart.md

## AC1: Add products to cart

### TC 1.1: Add single product to cart
**Preconditions:**
- User logged in as student
- Frontend/backend running

**Steps:**
1. Navigate to Shop page
2. Click "Add to Cart" on first product
3. Verify cart icon shows "1"
4. Open cart drawer
5. Verify product appears

**Expected Results:**
- Cart icon shows "1" badge
- Product name/price correct
- No console errors
```

**2. Execute with MCP Tools**
```javascript
// TC 1.1 Execution using MCP tools

// Step 1: Navigate
browser_navigate("http://localhost:3000")
browser_snapshot()  // See page structure

// Step 2: Login (if needed)
browser_click(element="login button", ref="e23")
browser_type(element="email input", ref="e45", text="student@test.com")
browser_type(element="password input", ref="e46", text="password123")
browser_click(element="submit button", ref="e47")
browser_wait_for(text="Shop")

// Step 3: Navigate to Shop
browser_click(element="Shop link", ref="e12")
browser_wait_for(text="Products")

// Step 4: Add to cart
browser_snapshot()  // Get product card refs
browser_click(element="Add to Cart button", ref="e89")

// Step 5: Verify cart icon
browser_snapshot()  // Check cart badge
browser_console_messages()  // Check for errors

// Step 6: Capture evidence
browser_take_screenshot("tc-1-1-cart-badge.png")

// Step 7: Open cart drawer
browser_click(element="Cart icon", ref="e34")
browser_wait_for(text="Shopping Cart")
browser_snapshot()  // Verify product in cart
browser_take_screenshot("tc-1-1-cart-drawer.png")
```

**3. Observe Results**
```bash
browser_snapshot() output:
- Cart icon shows "1" badge ✅
- Product name matches ✅
- Product price correct ✅

browser_console_messages() output:
- No errors ✅

Screenshots captured:
- tc-1-1-cart-badge.png ✅
- tc-1-1-cart-drawer.png ✅
```

**4. Document Test Result**
```markdown
### TC 1.1: Add single product to cart
**Status:** ✅ PASS
**Duration:** 12 seconds
**Evidence:**
- Screenshots: tc-1-1-cart-badge.png, tc-1-1-cart-drawer.png
- Console: No errors
**Notes:** All expected results verified
```

### Test Responsive Behavior
```javascript
// Test mobile (375px width)
browser_resize(375, 667)
browser_snapshot()  // Verify layout
browser_take_screenshot("mobile-375px.png")

// Test tablet (768px width)
browser_resize(768, 1024)
browser_snapshot()
browser_take_screenshot("tablet-768px.png")

// Test desktop (1920px width)
browser_resize(1920, 1080)
browser_snapshot()
browser_take_screenshot("desktop-1920px.png")
```

### Common MCP Tool Patterns

**Login Flow:**
```javascript
browser_navigate("http://localhost:3000")
browser_click(element="login button", ref="e23")
browser_type(element="email", ref="e45", text="student@test.com")
browser_type(element="password", ref="e46", text="password123")
browser_click(element="submit", ref="e47")
browser_wait_for(text="Welcome")
```

**Fill Form:**
```javascript
browser_fill_form([
  {name: "Product Name", type: "textbox", ref: "e12", value: "Test Product"},
  {name: "Price", type: "textbox", ref: "e13", value: "50"},
  {name: "Stock", type: "textbox", ref: "e14", value: "100"}
])
```

**Check Console Errors:**
```javascript
browser_console_messages(onlyErrors=true)
// Should return empty array or specific errors
```

---

## 📝 Gate Decision Rules

### Decision Priority (Apply in Order)

**1. E2E Test Results (HIGHEST PRIORITY)**
```
ANY test case fails → FAIL
Test case count < AC count → FAIL
Missing test scenarios → FAIL
```

**2. Critical Issues**
```
Security vulnerability → FAIL
Broken functionality → FAIL
Missing P0 tests → FAIL
```

**3. Non-Critical Issues**
```
Medium severity bugs → CONCERNS
Minor performance issues → CONCERNS
Missing nice-to-have tests → CONCERNS
```

**4. All Pass**
```
All tests pass + No critical issues → PASS
```

### Gate Statuses

**PASS:**
- All test cases passed
- All ACs verified
- No critical issues
- Quality bar met

**CONCERNS:**
- All tests passed (mandatory)
- Non-critical issues found
- Team should review
- Can proceed with caution

**FAIL:**
- ANY test case failed
- OR critical issues found
- Must return to Dev Agent
- Cannot proceed

**WAIVED:**
- Issues acknowledged
- Explicitly waived by team
- Must include reason

---

## 📄 QA Results Template

**Add to story file under "## QA Results" section:**

```markdown
## QA Results

### Review Date: October 13, 2025
### Reviewed By: Quinn (Test Architect)

### E2E Test Execution (Playwright MCP)

**Test Scenarios:** `docs/qa/e2e/story-02-shopping-cart.md`

**Execution Summary:**
- Total Test Cases: 8
- Passed: ✅ 8
- Failed: ❌ 0
- Duration: 3 minutes 45 seconds

**Test Results by AC:**
| AC# | Test Case | Status | Evidence |
|-----|-----------|--------|----------|
| AC1 | TC 1.1: Add single product | ✅ PASS | tc-1-1-cart-badge.png |
| AC1 | TC 1.2: Add multiple products | ✅ PASS | tc-1-2-multiple.png |
| AC2 | TC 2.1: Update quantity | ✅ PASS | tc-2-1-quantity.png |
| AC2 | TC 2.2: Remove item | ✅ PASS | tc-2-2-remove.png |
| AC3 | TC 3.1: Cart persists | ✅ PASS | tc-3-1-persist.png |
| AC4 | TC 4.1: Empty cart state | ✅ PASS | tc-4-1-empty.png |

**Responsive Tests:**
- Mobile (375px): ✅ PASS
- Tablet (768px): ✅ PASS
- Desktop (1920px): ✅ PASS

**Console Errors:** None ✅

**Screenshots:** `.playwright-mcp/story-02/`

---

### Code Quality Assessment

Clean implementation. Proper state management with Zustand. Good separation of concerns.

### Compliance Check
- All ACs Met: ✅ 8/8
- Test Coverage: ✅ Minimum 1 test per AC
- Error Handling: ✅ Present
- Responsive Design: ✅ Verified

### Security Review
✅ **PASS** - No security concerns

### Performance Review
✅ **PASS** - No performance issues

### Gate Status
**Gate:** ✅ PASS → `docs/qa/gates/sprint5-epic-02.story-02-shopping-cart.yml`
**Quality Score:** 95/100
**Status Reason:** All test cases pass, code quality excellent, all ACs verified

### Recommended Status
✅ **DONE** - Ready for production
```

---

## 📁 Quality Gate File

**Create:** `docs/qa/gates/{epic}.{story}-{slug}.yml`

**Example:** `docs/qa/gates/sprint5-epic-02.story-02-shopping-cart.yml`

```yaml
schema: 1
story: 'sprint5-epic-02.story-02'
story_title: 'Shopping Cart'
gate: PASS
status_reason: 'All test cases pass, code quality excellent'
reviewer: 'Quinn (Test Architect)'
updated: '2025-10-13T19:30:00Z'

quality_score: 95

evidence:
  e2e_tests:
    total: 8
    passed: 8
    failed: 0
    duration: '3 minutes 45 seconds'
    scenarios_path: 'docs/qa/e2e/story-02-shopping-cart.md'
    screenshots_path: '.playwright-mcp/story-02/'
  trace:
    ac_covered: [1, 2, 3, 4]
    ac_gaps: []

nfr_validation:
  security:
    status: PASS
    notes: 'No security concerns identified'
  performance:
    status: PASS
    notes: 'Cart operations performant'
  reliability:
    status: PASS
    notes: 'Error handling present, cart persists'
  maintainability:
    status: PASS
    notes: 'Clean code, good structure'

recommendations:
  immediate: []
  future: []
```

---

## 🚨 Common Scenarios

### Scenario 1: All Tests Pass
```
1. Execute all test cases via MCP tools → All pass
2. Code review → No critical issues
3. Gate = PASS, Quality Score 95/100
4. Update QA Results section
5. Create gate file
6. Recommend status: DONE
```

### Scenario 2: Test Case Fails
```
1. Execute test cases via MCP tools → TC 2.1 fails
2. Capture failure screenshot
3. Gate = FAIL (automatic)
4. Document failure in QA Results
5. Create gate file with FAIL status
6. Return to Dev Agent with details
7. HALT - Don't proceed to code review
```

### Scenario 3: Missing Test Scenarios
```
1. Check docs/qa/e2e/ → File missing
2. Gate = FAIL (automatic)
3. Document: "Test scenario file missing"
4. Return to Dev Agent
5. HALT - Can't execute without scenarios
```

### Scenario 4: Security Issue Found
```
1. Execute test cases → All pass
2. Code review → Critical security issue
3. Gate = FAIL (security overrides passing tests)
4. Document issue in Security Review section
5. Create gate file with FAIL status
6. Return to Dev Agent immediately
```

---

## 🔧 Troubleshooting

### Problem: Servers Not Running
```bash
# Start frontend
cd frontend
npm start

# Start backend (separate terminal)
cd backend
npm run dev
```

### Problem: Can't Find Element Refs
```bash
# Always snapshot first to get refs
browser_snapshot()

# Output shows elements with refs:
# button "Add to Cart" [ref: e89]
# input "Email" [ref: e45]

# Then use refs in other tools
browser_click(element="Add to Cart button", ref="e89")
```

### Problem: Console Shows Errors
```bash
# Check console messages
browser_console_messages(onlyErrors=true)

# If errors present:
# 1. Capture screenshot
# 2. Document in test result
# 3. Usually means test FAILS
```

### Problem: Page Doesn't Load
```bash
# Add wait for specific text/element
browser_wait_for(text="Products")

# Or wait for time (3 seconds)
browser_wait_for(time=3)
```

---

## ⚠️ Critical Rules

### Story File Permissions
- 🚨 **ONLY update "QA Results" section**
- 🚨 **DO NOT modify:** Status, Story, ACs, Tasks, Dev Notes, Dev Agent Record
- 🚨 Your changes limited to QA Results section only

### Testing Workflow
- ✅ Execute E2E tests FIRST (before code review)
- ✅ Any test failure = automatic FAIL gate
- ✅ Document all observations with screenshots
- ❌ Don't skip test execution
- ❌ Don't run `npx playwright test` commands

### Gate Decisions
- ✅ Be decisive: PASS/CONCERNS/FAIL/WAIVED
- ✅ Include clear rationale
- ✅ Balance perfection with pragmatism
- ❌ Don't block arbitrarily

---

## 📖 Additional Resources

**If you need more detail:**
- MCP Tools Reference: `.ai/playwright-mcp-tools-reference.md` (26 tools)
- Workflow Details: `.ai/bmad-playwright-workflow.md`
- Quick Reference: `.ai/workflow-quick-reference.md`
- BMAD Core Config: `.bmad-core/core-config.yaml`
- QA Agent Instructions: `.bmad-core/agents/qa.md`

---

## 🎯 Summary: What You Do

1. **Find story ready for review** (grep for "READY FOR QA")
2. **Read story + test scenarios** (docs/qa/e2e/)
3. **Execute tests using MCP tools** (browser_navigate, browser_click, etc.)
4. **Observe results** (snapshots, console, screenshots)
5. **Document in QA Results** (test execution summary)
6. **Create quality gate file** (PASS/CONCERNS/FAIL)
7. **HALT** (story done or return to Dev)

**That's it!** Use Playwright MCP tools programmatically to execute test scenarios and verify quality.

---

**Ready to start?** Run `claude --agent qa` and say `*help`!

**Version:** 3.0 (Concise)
**Last Updated:** October 13, 2025
**For:** QA Agent Quick Onboarding

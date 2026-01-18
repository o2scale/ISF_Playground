<<<<<<< HEAD
# BMAD Workflow - Quick Reference

**Version:** 2.0 | **Updated:** Oct 13, 2025 | **Full Guide:** `.ai/bmad-playwright-workflow.md`

---

## The Essentials

**Primary Testing:** Playwright MCP (programmatic browser control + manual observation)
**NOT Used:** Automated .spec.js tests, Jest unit/integration tests
**Agents:** Dev Agent (Terminal 1) + QA Agent (Terminal 2)
**Approach:** One story at a time, sequential with quality gates

---

## Dev Agent Checklist

```
□ Find next TODO story in docs/stories/
□ Read story file completely (all ACs)
□ Implement feature (backend + frontend)
□ Write E2E test SCENARIOS: docs/qa/e2e/story-{n}-{feature}.md
  → ONE TEST CASE PER AC (minimum 2-4 per AC)
  → Format: TC 1.1, TC 1.2, TC 1.3 (test case numbering)
  → Markdown documentation, NOT test code
□ Update Dev Agent Record in story file
□ Set status: ✅ READY FOR QA
□ HALT - wait for QA
```

---

## QA Agent Checklist

```
□ Find story with "READY FOR QA" status
□ Read story file + E2E test scenarios from docs/qa/e2e/
□ Verify servers: curl http://localhost:3000 && curl http://localhost:5001/api/health
□ Use Playwright MCP tools to execute test scenarios:
  • browser_navigate("http://localhost:3000")
  • browser_snapshot() → see page structure
  • browser_click, browser_type → interact with UI
  • browser_console_messages() → check for errors
  • browser_take_screenshot() → capture evidence
  • browser_resize() → test responsive behavior
□ ANY test case failed? → ❌ FAIL gate, return to Dev
□ All test cases passed? → Continue ✓
□ Code review: architecture, security, performance
□ Create QA Results section in story file
□ Create gate YAML: docs/qa/gates/{story}.yml
□ Gate decision: PASS / CONCERNS / FAIL
□ Update story status accordingly
□ If FAIL/CONCERNS → Return to Dev with feedback
□ If PASS → Story DONE, wait for next story
```

---

## Quick Commands

### Dev Agent
```bash
# Find your assignment
cd docs/stories/ && grep "TODO\|IN PROGRESS" sprint5-story-*.md

# Create E2E test scenarios (markdown documentation)
# File: docs/qa/e2e/story-{n}-{feature}.md
# Format: TC 1.1: Navigate to page, TC 1.2: Click button, etc.

# Check servers
curl http://localhost:3000              # Frontend
curl http://localhost:5001/api/health   # Backend
```

### QA Agent MCP Tools (Quick Reference)
```
# Navigation
browser_navigate("http://localhost:3000")

# Page Inspection
browser_snapshot()                      # Get page structure with element refs
browser_console_messages()              # Check for JavaScript errors
browser_take_screenshot("file.png")     # Capture evidence

# Interaction
browser_click(element="button", ref="e45")
browser_type(element="input", ref="e12", text="value")
browser_fill_form(fields=[...])         # Fill multiple fields
browser_select_option(element="dropdown", ref="e23", values=["option"])

# Waiting & Timing
browser_wait_for(text="Success")        # Wait for text to appear
browser_wait_for(textGone="Loading")    # Wait for text to disappear

# Responsive Testing
browser_resize(375, 667)                # Mobile (iPhone)
browser_resize(768, 1024)               # Tablet (iPad)
browser_resize(1920, 1080)              # Desktop

# Advanced
browser_hover(element="menu", ref="e34")
browser_evaluate(function="() => document.title")
browser_handle_dialog(accept=true)

# Full Reference: .ai/playwright-mcp-tools-reference.md
```

---

## File Locations

```
docs/stories/sprint5-story-{n}.md                → Story requirements
docs/qa/e2e/story-{n}-{feature}.md               → E2E test scenarios (markdown)
docs/qa/gates/{epic}.story-{n}-{slug}.yml        → Quality gate file
.playwright-mcp/                                  → Screenshots saved here
```

---

## Gate Decision Tree

```
1. E2E Tests (PRIMARY - Manual execution via MCP)
   ├─ ANY test case failed? → ❌ FAIL
   ├─ Count < AC count? → ❌ FAIL
   ├─ Console errors? → ❌ FAIL
   └─ All passed? → Continue

2. Critical Issues
   ├─ Security vuln? → ❌ FAIL
   ├─ Data loss risk? → ❌ FAIL
   └─ None? → Continue

3. Non-Critical Issues
   ├─ Medium bugs? → ⚠️ CONCERNS
   ├─ Performance issues? → ⚠️ CONCERNS
   └─ None? → Continue

4. Final
   └─ All criteria met? → ✅ PASS
```

---

## Gate Statuses

| Status | Meaning | Next Step |
|--------|---------|-----------|
| ✅ **PASS** | All ACs met, tests pass, no blocking issues | Story → DONE |
| ⚠️ **CONCERNS** | Works but has non-critical issues | Team reviews, decides |
| ❌ **FAIL** | Critical issues or test failures | Return to Dev Agent |
| 🔓 **WAIVED** | Issues waived by team decision | Requires approver |

---

## Common Testing Workflows with MCP Tools

### Login Flow
```
1. browser_navigate("http://localhost:3000")
2. browser_snapshot() → find login button ref
3. browser_click(element="Login", ref="e45")
4. browser_type(element="username", ref="e12", text="test_student")
5. browser_type(element="password", ref="e13", text="password123")
6. browser_click(element="Submit", ref="e23")
7. browser_wait_for(text="Welcome")
8. browser_console_messages() → verify no errors
9. browser_take_screenshot("login-success.png")
```

### Verify UI Element Exists
```
1. browser_navigate("http://localhost:3000/shop")
2. browser_snapshot() → look for "Product grid" in output
3. browser_take_screenshot("shop-page.png")
4. Result: PASS if element found, FAIL if not
```

### Test Responsive Behavior
```
1. browser_resize(1920, 1080) → Desktop
2. browser_take_screenshot("desktop.png")
3. browser_snapshot() → verify 4-column grid

4. browser_resize(768, 1024) → Tablet
5. browser_take_screenshot("tablet.png")
6. browser_snapshot() → verify 2-column grid

7. browser_resize(375, 667) → Mobile
8. browser_take_screenshot("mobile.png")
9. browser_snapshot() → verify 1-column grid
```

### Test Form Submission
```
1. browser_fill_form(fields=[
     {name: "name", ref: "e12", type: "textbox", value: "John Doe"},
     {name: "email", ref: "e13", type: "textbox", value: "john@example.com"},
     {name: "agree", ref: "e14", type: "checkbox", value: "true"}
   ])
2. browser_click(element="Submit", ref="e45")
3. browser_wait_for(text="Success")
4. browser_console_messages() → check for errors
5. browser_take_screenshot("form-submitted.png")
```

---

## Common Issues & Fixes

**Problem:** Can't find element reference in snapshot
```
# Solution: Run browser_snapshot() again after page loads
browser_wait_for(text="Page loaded")
browser_snapshot()
# Look for element ref in output (e.g., ref="e45")
```

**Problem:** Click doesn't work
```
# Solution: Wait for element to load first
browser_wait_for(text="Button label")
browser_snapshot() → get updated refs
browser_click(element="button", ref="e45")
```

**Problem:** Page not fully loaded
```
# Solution: Wait before taking screenshot
browser_wait_for(textGone="Loading...")
browser_take_screenshot("page.png")
```

**Problem:** Console errors not showing
```
# Solution: Check console immediately after action
browser_click(element="Submit", ref="e45")
browser_console_messages() → check right away
# Note: Console clears on navigation
```

**Problem:** QA can't find story ready for review
```bash
# Dev Agent must update story status explicitly
# Edit docs/stories/sprint5-story-{n}.md
# Change status to: ✅ READY FOR QA
```

---

## Key Rules

### Dev Agent
- ✅ ONE story at a time (no parallel work)
- ✅ Write test SCENARIOS (markdown), NOT test code
- ✅ ONE test case per AC (minimum)
- ✅ HALT after setting "READY FOR QA"
- ❌ Don't modify Sprint 1 code
- ❌ Don't write .spec.js files

### QA Agent
- ✅ E2E tests FIRST (mandatory)
- ✅ Use Playwright MCP tools programmatically
- ✅ ANY E2E test case failure → automatic FAIL
- ✅ Check console messages for JavaScript errors
- ✅ Capture screenshots as evidence
- ✅ Update ONLY "QA Results" section
- ❌ Don't modify story ACs, Dev Agent Record, or Status (except QA status)

---

## Workflow Flow

```
📋 TODO → 🔄 IN PROGRESS → ✅ READY FOR QA
         ↓ (Dev Agent)         ↓ (QA Agent)
                          [E2E Tests via MCP]
                               ↓
                    ❌ FAIL ← → ✅ PASS
                       ↓            ↓
                  Back to Dev   ✅ DONE
```

---

## Success for Stories 1-10! 🎉

Your custom BMAD workflow has successfully completed 10 stories using:
- Playwright MCP for programmatic browser control
- Manual observation and verification by QA Agent
- Quality gates with YAML files
- Two-agent collaboration

**Keep it up for Stories 11-12!**

---

## Documentation Links

**Full Workflow:** `.ai/bmad-playwright-workflow.md`
**MCP Tools Reference:** `.ai/playwright-mcp-tools-reference.md`
**Dev Onboarding:** `.ai/developer-onboarding-guide.md`
**QA Onboarding:** `.ai/qa-onboarding-guide.md`
**BMAD Core Dev Agent:** `.bmad-core/agents/dev.md`
**BMAD Core QA Agent:** `.bmad-core/agents/qa.md`
=======
# BMAD Workflow - Quick Reference

**Version:** 2.1 | **Updated:** Oct 24, 2025 | **Full Guide:** `.ai/bmad-playwright-workflow.md`
**Sprint 2 Update:** Dev agents now create both E2E test scenarios AND quality gate YAML files

---

## The Essentials

**Primary Testing:** Playwright MCP (programmatic browser control + manual observation)
**NOT Used:** Automated .spec.js tests, Jest unit/integration tests
**Agents:** Dev Agent (Terminal 1) + QA Agent (Terminal 2)
**Approach:** One story at a time, sequential with quality gates

---

## Dev Agent Checklist

```
□ Find next TODO story in docs/stories/
□ Read story file completely (all ACs)
□ Implement feature (backend + frontend)
□ Write E2E test SCENARIOS: docs/qa/e2e/story-{n}-{feature}.md
  → ONE TEST CASE PER AC (minimum 2-4 per AC)
  → Format: TC 1.1, TC 1.2, TC 1.3 (test case numbering)
  → Markdown documentation, NOT test code
□ Create quality gate YAML: docs/qa/gates/{epic}.story-{n}-{slug}.yml
  → Define pass/fail criteria for the story
  → Include test coverage requirements (>80%)
  → Specify critical acceptance criteria
  → Reference E2E test scenarios
□ Update Dev Agent Record in story file
□ Set status: ✅ READY FOR QA
□ HALT - wait for QA
```

---

## QA Agent Checklist

```
□ Find story with "READY FOR QA" status
□ Read story file + E2E test scenarios from docs/qa/e2e/
□ Verify quality gate YAML exists: docs/qa/gates/{epic}.story-{n}-{slug}.yml
□ Verify servers: curl http://localhost:3000 && curl http://localhost:5001/api/health
□ Use Playwright MCP tools to execute test scenarios:
  • browser_navigate("http://localhost:3000")
  • browser_snapshot() → see page structure
  • browser_click, browser_type → interact with UI
  • browser_console_messages() → check for errors
  • browser_take_screenshot() → capture evidence
  • browser_resize() → test responsive behavior
□ ANY test case failed? → ❌ FAIL gate, return to Dev
□ All test cases passed? → Continue ✓
□ Code review: architecture, security, performance
□ Create QA Results section in story file
□ Gate decision (based on gate YAML criteria): PASS / CONCERNS / FAIL
□ Update story status accordingly
□ If FAIL/CONCERNS → Return to Dev with feedback
□ If PASS → Story DONE, wait for next story
```

---

## Quick Commands

### Dev Agent
```bash
# Find your assignment
cd docs/stories/ && grep "TODO\|IN PROGRESS" sprint5-story-*.md

# Create E2E test scenarios (markdown documentation)
# File: docs/qa/e2e/story-{n}-{feature}.md
# Format: TC 1.1: Navigate to page, TC 1.2: Click button, etc.

# Check servers
curl http://localhost:3000              # Frontend
curl http://localhost:5001/api/health   # Backend
```

### QA Agent MCP Tools (Quick Reference)
```
# Navigation
browser_navigate("http://localhost:3000")

# Page Inspection
browser_snapshot()                      # Get page structure with element refs
browser_console_messages()              # Check for JavaScript errors
browser_take_screenshot("file.png")     # Capture evidence

# Interaction
browser_click(element="button", ref="e45")
browser_type(element="input", ref="e12", text="value")
browser_fill_form(fields=[...])         # Fill multiple fields
browser_select_option(element="dropdown", ref="e23", values=["option"])

# Waiting & Timing
browser_wait_for(text="Success")        # Wait for text to appear
browser_wait_for(textGone="Loading")    # Wait for text to disappear

# Responsive Testing
browser_resize(375, 667)                # Mobile (iPhone)
browser_resize(768, 1024)               # Tablet (iPad)
browser_resize(1920, 1080)              # Desktop

# Advanced
browser_hover(element="menu", ref="e34")
browser_evaluate(function="() => document.title")
browser_handle_dialog(accept=true)

# Full Reference: .ai/playwright-mcp-tools-reference.md
```

---

## File Locations

```
docs/stories/sprint5-story-{n}.md                → Story requirements
docs/qa/e2e/story-{n}-{feature}.md               → E2E test scenarios (markdown)
docs/qa/gates/{epic}.story-{n}-{slug}.yml        → Quality gate file
.playwright-mcp/                                  → Screenshots saved here
```

---

## Gate Decision Tree

```
1. E2E Tests (PRIMARY - Manual execution via MCP)
   ├─ ANY test case failed? → ❌ FAIL
   ├─ Count < AC count? → ❌ FAIL
   ├─ Console errors? → ❌ FAIL
   └─ All passed? → Continue

2. Critical Issues
   ├─ Security vuln? → ❌ FAIL
   ├─ Data loss risk? → ❌ FAIL
   └─ None? → Continue

3. Non-Critical Issues
   ├─ Medium bugs? → ⚠️ CONCERNS
   ├─ Performance issues? → ⚠️ CONCERNS
   └─ None? → Continue

4. Final
   └─ All criteria met? → ✅ PASS
```

---

## Gate Statuses

| Status | Meaning | Next Step |
|--------|---------|-----------|
| ✅ **PASS** | All ACs met, tests pass, no blocking issues | Story → DONE |
| ⚠️ **CONCERNS** | Works but has non-critical issues | Team reviews, decides |
| ❌ **FAIL** | Critical issues or test failures | Return to Dev Agent |
| 🔓 **WAIVED** | Issues waived by team decision | Requires approver |

---

## Common Testing Workflows with MCP Tools

### Login Flow
```
1. browser_navigate("http://localhost:3000")
2. browser_snapshot() → find login button ref
3. browser_click(element="Login", ref="e45")
4. browser_type(element="username", ref="e12", text="test_student")
5. browser_type(element="password", ref="e13", text="password123")
6. browser_click(element="Submit", ref="e23")
7. browser_wait_for(text="Welcome")
8. browser_console_messages() → verify no errors
9. browser_take_screenshot("login-success.png")
```

### Verify UI Element Exists
```
1. browser_navigate("http://localhost:3000/shop")
2. browser_snapshot() → look for "Product grid" in output
3. browser_take_screenshot("shop-page.png")
4. Result: PASS if element found, FAIL if not
```

### Test Responsive Behavior
```
1. browser_resize(1920, 1080) → Desktop
2. browser_take_screenshot("desktop.png")
3. browser_snapshot() → verify 4-column grid

4. browser_resize(768, 1024) → Tablet
5. browser_take_screenshot("tablet.png")
6. browser_snapshot() → verify 2-column grid

7. browser_resize(375, 667) → Mobile
8. browser_take_screenshot("mobile.png")
9. browser_snapshot() → verify 1-column grid
```

### Test Form Submission
```
1. browser_fill_form(fields=[
     {name: "name", ref: "e12", type: "textbox", value: "John Doe"},
     {name: "email", ref: "e13", type: "textbox", value: "john@example.com"},
     {name: "agree", ref: "e14", type: "checkbox", value: "true"}
   ])
2. browser_click(element="Submit", ref="e45")
3. browser_wait_for(text="Success")
4. browser_console_messages() → check for errors
5. browser_take_screenshot("form-submitted.png")
```

---

## Common Issues & Fixes

**Problem:** Can't find element reference in snapshot
```
# Solution: Run browser_snapshot() again after page loads
browser_wait_for(text="Page loaded")
browser_snapshot()
# Look for element ref in output (e.g., ref="e45")
```

**Problem:** Click doesn't work
```
# Solution: Wait for element to load first
browser_wait_for(text="Button label")
browser_snapshot() → get updated refs
browser_click(element="button", ref="e45")
```

**Problem:** Page not fully loaded
```
# Solution: Wait before taking screenshot
browser_wait_for(textGone="Loading...")
browser_take_screenshot("page.png")
```

**Problem:** Console errors not showing
```
# Solution: Check console immediately after action
browser_click(element="Submit", ref="e45")
browser_console_messages() → check right away
# Note: Console clears on navigation
```

**Problem:** QA can't find story ready for review
```bash
# Dev Agent must update story status explicitly
# Edit docs/stories/sprint5-story-{n}.md
# Change status to: ✅ READY FOR QA
```

---

## Key Rules

### Dev Agent
- ✅ ONE story at a time (no parallel work)
- ✅ Write test SCENARIOS (markdown), NOT test code
- ✅ ONE test case per AC (minimum)
- ✅ Create quality gate YAML file with test coverage requirements (>80%)
- ✅ HALT after setting "READY FOR QA"
- ❌ Don't modify Sprint 1 code
- ❌ Don't write .spec.js files

### QA Agent
- ✅ E2E tests FIRST (mandatory)
- ✅ Use Playwright MCP tools programmatically
- ✅ ANY E2E test case failure → automatic FAIL
- ✅ Check console messages for JavaScript errors
- ✅ Capture screenshots as evidence
- ✅ Update ONLY "QA Results" section
- ❌ Don't modify story ACs, Dev Agent Record, or Status (except QA status)

---

## Workflow Flow

```
📋 TODO → 🔄 IN PROGRESS → ✅ READY FOR QA
         ↓ (Dev Agent)         ↓ (QA Agent)
                          [E2E Tests via MCP]
                               ↓
                    ❌ FAIL ← → ✅ PASS
                       ↓            ↓
                  Back to Dev   ✅ DONE
```

---

## Success for Stories 1-10! 🎉

Your custom BMAD workflow has successfully completed 10 stories using:
- Playwright MCP for programmatic browser control
- Manual observation and verification by QA Agent
- Quality gates with YAML files
- Two-agent collaboration

**Keep it up for Stories 11-12!**

---

## Documentation Links

**Full Workflow:** `.ai/bmad-playwright-workflow.md`
**MCP Tools Reference:** `.ai/playwright-mcp-tools-reference.md`
**Dev Onboarding:** `.ai/developer-onboarding-guide.md`
**QA Onboarding:** `.ai/qa-onboarding-guide.md`
**BMAD Core Dev Agent:** `.bmad-core/agents/dev.md`
**BMAD Core QA Agent:** `.bmad-core/agents/qa.md`
>>>>>>> feature/sprint-2

# BMAD Workflow Documentation - REVISED OPTIONS

**Date:** October 13, 2025
**Status:** Post Playwright MCP Testing - ACCURATE Understanding
**Purpose:** Present updated workflow options based on actual Playwright MCP capabilities

---

## 🎯 What Changed?

### **Before (Assumption):**
- ❌ Thought QA Agent manually opens browser and clicks around
- ❌ Thought there were `.spec.js` automated test files
- ❌ Mixed understanding of "manual" vs "programmatic" testing

### **After (Reality - Tested Live):**
- ✅ **Playwright MCP provides PROGRAMMATIC browser control**
- ✅ **QA Agent uses MCP TOOLS** (browser_navigate, browser_click, browser_snapshot, etc.)
- ✅ **QA Agent OBSERVES results** via snapshots, screenshots, console logs
- ✅ **Hybrid approach:** Automated navigation + Manual verification

---

## 📋 Current Documentation Issues

| Document | Issue | Impact |
|----------|-------|--------|
| `.ai/bmad-playwright-workflow.md` | References `.spec.js` files and `npx playwright test` | ❌ Implies automated tests |
| `.ai/workflow-quick-reference.md` | Shows `npx playwright test` commands | ❌ Wrong workflow |
| `.ai/developer-onboarding-guide.md` | Minimal Playwright MCP details | ⚠️ Lacks MCP tool list |
| `.ai/qa-onboarding-guide.md` | Vague "navigate browser" instructions | ⚠️ Needs specific MCP tool names |
| `.bmad-core/agents/dev.md` | ✅ CORRECT - test scenarios only | ✅ No changes needed |
| `.bmad-core/agents/qa.md` | ⚠️ Generic workflow, no MCP tool names | ⚠️ Could be more specific |

---

## ✅ OPTION A: Minimal Updates (Fast - 15 min)

**What:** Fix only the critical inaccuracies in existing documents

**Changes:**
1. `.ai/bmad-playwright-workflow.md`
   - Remove all `.spec.js` references
   - Remove `npx playwright test` commands
   - Add section: "Playwright MCP Tools Reference"
   - Update QA workflow to use MCP tool names

2. `.ai/workflow-quick-reference.md`
   - Replace command section with MCP tool examples
   - Add: "QA Agent MCP Tool Quick Reference"

3. `.bmad-core/agents/qa.md`
   - Add specific MCP tool names to review command

**Pros:**
- ✅ Fast to implement
- ✅ Preserves most existing content
- ✅ Fixes critical inaccuracies

**Cons:**
- ⚠️ Still verbose
- ⚠️ Doesn't add comprehensive MCP tool documentation

---

## ✅ OPTION B: Comprehensive Rewrite (Thorough - 45 min)

**What:** Completely rewrite workflow documents based on actual MCP testing

**Changes:**
1. **NEW:** `.ai/playwright-mcp-tools-reference.md`
   - Complete list of all 15 MCP tools
   - Usage examples for each tool
   - Common patterns (login, navigate, fill form, verify)

2. `.ai/bmad-playwright-workflow.md` - MAJOR REWRITE
   - Remove ALL `.spec.js` references
   - Add "How QA Agent Uses Playwright MCP Tools" section with examples
   - Update Dev Agent workflow (test scenarios, NOT code)
   - Update QA Agent workflow (MCP tool usage step-by-step)

3. `.ai/workflow-quick-reference.md` - MAJOR REWRITE
   - Replace with MCP-focused cheat sheet
   - Dev: Test scenario checklist
   - QA: MCP tool command examples

4. `.ai/developer-onboarding-guide.md`
   - Add "Playwright MCP Tools Available to QA" section
   - Show Dev Agent what QA can do programmatically

5. `.ai/qa-onboarding-guide.md` - MAJOR REWRITE
   - Add comprehensive MCP tool reference
   - Step-by-step MCP workflow examples
   - Common testing patterns with MCP tools

6. `.bmad-core/agents/qa.md`
   - Add detailed MCP tool usage in review command
   - Include tool-by-tool workflow

**Pros:**
- ✅ 100% accurate to reality
- ✅ Comprehensive MCP tool documentation
- ✅ Clear examples for both agents
- ✅ Future-proof

**Cons:**
- ⏱️ Takes more time
- 📝 More extensive changes

---

## ✅ OPTION C: Hybrid Approach (Balanced - 30 min)

**What:** Fix critical documents + Create new MCP reference guide

**Changes:**
1. **NEW:** `.ai/playwright-mcp-quick-guide.md` (1-2 pages)
   - Top 10 MCP tools QA will use most
   - Quick examples for each
   - Common testing workflow with MCP tools

2. `.ai/bmad-playwright-workflow.md` - MODERATE UPDATE
   - Remove `.spec.js` references
   - Add "See `.ai/playwright-mcp-quick-guide.md` for MCP tools"
   - Update QA workflow section with MCP tool overview

3. `.ai/workflow-quick-reference.md` - MODERATE UPDATE
   - Replace "Run Playwright tests" with "Use MCP tools"
   - Add link to MCP quick guide

4. `.bmad-core/agents/qa.md` - MINOR UPDATE
   - Add MCP tool names in review command
   - Reference MCP quick guide

**Pros:**
- ✅ Balanced effort/accuracy ratio
- ✅ Creates reusable MCP reference
- ✅ Fixes critical inaccuracies
- ✅ Minimal disruption to existing docs

**Cons:**
- ⚠️ Some existing docs still verbose
- ⚠️ Not as comprehensive as Option B

---

## ✅ OPTION D: Minimal + Future Enhancement (Strategic - 20 min now, more later)

**What:** Fix only blocking issues now, plan comprehensive update later

**Changes Now:**
1. `.ai/bmad-playwright-workflow.md`
   - Add WARNING at top: "Note: This doc references .spec.js files - see revised MCP workflow in progress"
   - Add section: "Playwright MCP - How It Actually Works"

2. `.ai/workflow-quick-reference.md`
   - Add note: "MCP tool reference coming soon"

3. **NEW:** `.ai/playwright-mcp-capabilities-report.md` (ALREADY EXISTS!)
   - Link to this from other docs

**Changes Later** (when time allows):
- Full rewrite per Option B

**Pros:**
- ✅ Very fast to implement
- ✅ Acknowledges current inaccuracies
- ✅ Provides path forward
- ✅ Links to accurate MCP testing results

**Cons:**
- ⚠️ Temporary solution
- ⚠️ Requires follow-up work

---

## 🎯 RECOMMENDED: Option C (Hybrid Approach)

**Why:**
1. ✅ **Creates definitive MCP tool reference** (`.ai/playwright-mcp-quick-guide.md`)
2. ✅ **Fixes critical workflow inaccuracies** (removes `.spec.js` references)
3. ✅ **Balances effort with accuracy** (30 min vs 45 min)
4. ✅ **Reusable reference** for future agents

**What You Get:**
- ✅ New Playwright MCP Quick Guide (comprehensive tool reference)
- ✅ Updated core workflow document (accurate MCP workflow)
- ✅ Updated quick reference (MCP commands, not npx commands)
- ✅ Updated BMAD core QA agent (specific MCP tools)

---

## 📝 Detailed Plan for Option C

### **File 1:** `.ai/playwright-mcp-quick-guide.md` (NEW - 1-2 pages)

**Contents:**
```markdown
# Playwright MCP Quick Guide

## What is Playwright MCP?
- Programmatic browser control via MCP tools
- Hybrid approach: Automated navigation + Manual observation

## Top 10 MCP Tools for QA Agents

### 1. browser_navigate(url)
Navigate to any URL
Example: browser_navigate("http://localhost:3000")

### 2. browser_snapshot()
Get page structure (accessibility tree)
Shows all elements with refs for interaction

### 3. browser_click(element, ref)
Click buttons, links, etc.
Example: browser_click(element="Login button", ref="e45")

### 4. browser_type(element, ref, text)
Type into input fields
Example: browser_type(element="username", ref="e12", text="test_student")

### 5. browser_take_screenshot(filename)
Capture visual evidence
Example: browser_take_screenshot("tc-1-1-result.png")

### 6. browser_console_messages()
Check for JavaScript errors
Returns all console logs and errors

### 7. browser_fill_form(fields)
Fill multiple form fields at once
Example: browser_fill_form([{name: "username", value: "test"}, ...])

### 8. browser_wait_for(text)
Wait for elements/text to appear
Example: browser_wait_for(text="Welcome")

### 9. browser_resize(width, height)
Test responsive behavior
Example: browser_resize(375, 667) # Mobile

### 10. browser_evaluate(function)
Run custom JavaScript
Example: browser_evaluate("document.querySelector('.price').textContent")

## Common Testing Workflows

### Login Flow:
1. browser_navigate("http://localhost:3000")
2. browser_click(element="Login link", ref="...")
3. browser_type(element="username", ref="...", text="test_student")
4. browser_type(element="password", ref="...", text="password123")
5. browser_click(element="Submit", ref="...")
6. browser_wait_for(text="Welcome")
7. browser_console_messages() → verify no errors

### Verify UI Element:
1. browser_snapshot() → get page structure
2. Check snapshot for expected element
3. browser_take_screenshot("evidence.png")

### Test Responsive:
1. browser_resize(375, 667) # Mobile
2. browser_take_screenshot("mobile.png")
3. browser_resize(1920, 1080) # Desktop
4. browser_take_screenshot("desktop.png")
```

### **File 2:** `.ai/bmad-playwright-workflow.md` - UPDATES

**Sections to Change:**

**Line 38-43 (Dev Agent Responsibilities):**
```markdown
BEFORE:
├─ Writes E2E test scenarios (docs/qa/e2e/{story-id}.md)
├─ Writes Playwright test code (frontend/tests/e2e/{story-id}.spec.js)  ← REMOVE THIS

AFTER:
├─ Writes E2E test scenarios (docs/qa/e2e/{story-id}.md)
├─ Test scenarios guide QA Agent's use of Playwright MCP tools
```

**Line 48-54 (QA Agent Workflow):**
```markdown
BEFORE:
├─ STEP 1: Execute E2E Tests via Playwright MCP (REQUIRED FIRST)
│   ├─ Uses Playwright MCP to launch browser
│   ├─ Navigates to http://localhost:3000 (frontend)
│   ├─ Manually executes test scenarios from docs/qa/e2e/
│   ├─ Observes console errors/warnings via browser DevTools
│   ├─ Takes screenshots for evidence

AFTER:
├─ STEP 1: Execute E2E Tests via Playwright MCP (REQUIRED FIRST)
│   ├─ Uses MCP tools to control browser programmatically
│   ├─ browser_navigate("http://localhost:3000")
│   ├─ Follows test scenarios from docs/qa/e2e/ using MCP tools
│   ├─ browser_console_messages() to check for errors
│   ├─ browser_take_screenshot() for evidence
│   ├─ Observes page state via browser_snapshot()
│   └─ See `.ai/playwright-mcp-quick-guide.md` for all MCP tools
```

**Remove Entire Section (Lines 152-160):**
```markdown
DELETE:
3. **Run Playwright Tests:**
   ```bash
   npx playwright test tests/e2e/{story-id}.spec.js --reporter=html
   ```
```

**Add New Section:**
```markdown
### How QA Agent Uses Playwright MCP Tools

**Step-by-Step Workflow:**

1. **Navigate:** browser_navigate("http://localhost:3000")
2. **Get Page Structure:** browser_snapshot() → see all elements
3. **Interact:** browser_click, browser_type based on test scenarios
4. **Verify:** Check snapshot, console, screenshots
5. **Document:** PASS/FAIL with evidence

**See:** `.ai/playwright-mcp-quick-guide.md` for complete MCP tool reference
```

### **File 3:** `.ai/workflow-quick-reference.md` - UPDATES

**Replace "Quick Commands" Section:**

```markdown
BEFORE:
### Dev Agent
```bash
# Run Playwright tests
cd frontend
npx playwright test tests/e2e/sprint5-story-{n}.spec.js --reporter=html
```

AFTER:
### Dev Agent
```bash
# Dev Agent creates test SCENARIOS (markdown), NOT test code
# File: docs/qa/e2e/story-{n}-{feature}.md
# Format: TC 1.1, TC 1.2 (test cases per AC)
```

### QA Agent MCP Tools (Quick Reference)
```
Navigate:     browser_navigate("http://localhost:3000")
See Page:     browser_snapshot()
Click:        browser_click(element="button", ref="e45")
Type:         browser_type(element="input", ref="e12", text="value")
Screenshot:   browser_take_screenshot("file.png")
Console:      browser_console_messages()
Wait:         browser_wait_for(text="Success")
Resize:       browser_resize(375, 667)

See full list: .ai/playwright-mcp-quick-guide.md
```
```

### **File 4:** `.bmad-core/agents/qa.md` - UPDATE

**Line 70-102 (review command):**

```yaml
BEFORE:
  • Open browser and navigate to http://localhost:3000
  • Manually execute each test case from the scenario document

AFTER:
  • Use Playwright MCP tools to control browser programmatically:
      * browser_navigate("http://localhost:3000")
      * browser_snapshot() → see page structure
      * browser_click, browser_type, browser_fill_form → interact
      * browser_console_messages() → check for JS errors
      * browser_take_screenshot(filename) → capture evidence
      * browser_resize(width, height) → test responsive
  • Follow test scenarios from docs/qa/e2e/{story-id}.md
  • Observe results via snapshots, screenshots, console logs
  • Reference: .ai/playwright-mcp-quick-guide.md for all tools
```

---

## ✅ What I'll Deliver with Option C

1. ✅ **NEW:** Playwright MCP Quick Guide (1-2 pages, comprehensive tool reference)
2. ✅ **UPDATED:** BMAD Playwright Workflow (removes .spec.js, adds MCP workflow)
3. ✅ **UPDATED:** Workflow Quick Reference (MCP commands, not npx)
4. ✅ **UPDATED:** BMAD Core QA agent (specific MCP tool names)
5. ✅ **SUMMARY:** What changed and why

**Time Estimate:** 30 minutes

---

## 🎯 Your Decision

**Which option do you want me to execute?**

- **A:** Minimal Updates (15 min)
- **B:** Comprehensive Rewrite (45 min)
- **C:** Hybrid Approach (30 min) ← **RECOMMENDED**
- **D:** Minimal + Future Enhancement (20 min now)

**Or:** Tell me specific changes you want differently!

---

**Ready to execute when you give the word!** 🚀

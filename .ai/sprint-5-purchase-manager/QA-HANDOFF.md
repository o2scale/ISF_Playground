# Sprint 5 Purchase Manager QA Handoff - START HERE

**Created:** 2025-10-29 16:44:54
**Sprint:** Sprint 5 - Purchase Manager Workflow (Epic 05)
**Total Stories:** 3 stories (17, 18, 19)
**Your Mission:** Test Sprint 5 Purchase Manager stories using Playwright MCP tools, verify quality gates

---

## 🚀 Quick Start (3 Steps)

### Step 1: Load Essential Context (Auto-loaded by BMAD)
Your BMAD agent will automatically load:
- `.ai/qa-onboarding-guide.md` - General QA workflow
- `.ai/workflow-quick-reference.md` - BMAD workflow rules
- `.ai/playwright-mcp-tools-reference.md` - 26 MCP tools reference
- `.bmad-core/agents/qa.md` - Your agent instructions

### Step 2: Read Sprint 5 Context (REQUIRED - Read Now)
```
📖 MUST READ (in order):
1. .ai/sprint-5-purchase-manager/sprint-5-overview.md (10 min)
   → Understand Purchase Manager workflow and testing scope

2. docs/epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md (5 min)
   → Epic overview, user roles, workflow diagrams
```

### Step 3: Find Stories Ready for QA
```bash
# Check which stories are ready for review
grep -l "READY FOR QA" docs/stories/sprint5/sprint5-story-*.md

# Example output:
# docs/stories/sprint5/sprint5-story-17-purchase-request-creation.md
```

---

## 📋 Your Workflow for EACH Story

```
1. Find story marked "✅ READY FOR QA"
   → Search: grep -l "READY FOR QA" docs/stories/sprint5/sprint5-story-*.md
   → Read story file completely

2. Verify prerequisites
   → E2E test scenarios exist: docs/qa/e2e/sprint5-story-XX-{name}.md
   → Quality gate YAML exists: docs/qa/gates/sprint-5-story-XX-{slug}.yml
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
   → Add timestamp

7. Update quality gate YAML file
   → Change gate status from PENDING to PASS/CONCERNS/FAIL
   → Add reviewer name and timestamp
   → Include quality score

8. Update story status
   → PASS → Set status to "✅ DONE"
   → FAIL/CONCERNS → Return to Dev with feedback
```

---

## 🎯 Sprint 5 Purchase Manager Testing Guidelines

### Architecture to Understand

**Request-Approval-Update Workflow:**
```
Purchase Manager creates request (Story 17)
    ↓
Admin approves/rejects (Story 18)
    ↓
Purchase Manager updates stock (Story 19)
    ↓
Full audit trail via InventoryTransaction
```

**When testing workflow features:**
- Verify status transitions (pending_approval → approved → completed)
- Check role-based permissions (Purchase Manager vs Admin)
- Ensure audit trail is complete
- Test frontend filtering by user.balagruhaIds
- Verify idempotency (no duplicate stock updates)
- Test self-approval prevention

### Role-Based Access Testing

**Purchase Manager Role:**
```
✅ Verify:
- Can create purchase requests
- Can see only own requests
- Can see only requests from assigned balagruhas (frontend filtered)
- Can update stock after approval
- Cannot approve own requests
- Cannot see other Purchase Managers' requests

❌ Fail if:
- Can see requests from unassigned balagruhas
- Can see other users' requests
- Can approve own requests
- Can update stock before approval
```

**Admin Role:**
```
✅ Verify:
- Can see all purchase requests (all balagruhas, all users)
- Can approve any request
- Can reject any request
- Cannot create purchase requests
- Cannot update stock

❌ Fail if:
- Cannot see all requests
- Can create purchase requests
- Can update stock
- Can approve own requests (if Admin creates request)
```

### Key Features to Test

**Frontend Filtering (Story 17):**
```javascript
// 1. Login as Purchase Manager with specific balagruhaIds
browser_navigate("http://localhost:3000")
// ... login steps ...

// 2. Navigate to Shop Inventory view
browser_click(element="Shop Inventory", ref="dropdown")

// 3. Verify only own requests from assigned balagruhas visible
browser_snapshot()  // Should show filtered requests only

// 4. Verify cannot see other users' requests
// Create request as different user via API
// Verify it doesn't appear in UI
```

**Approval Workflow (Story 18):**
```javascript
// 1. Login as Admin
browser_navigate("http://localhost:3000")
// ... admin login steps ...

// 2. Navigate to purchase requests
browser_click(element="Shop Inventory", ref="dropdown")

// 3. Approve request
browser_click(element="Approve", ref="request_123")
browser_type(element="Admin Notes", ref="notes", text="Approved for purchase")
browser_click(element="Confirm Approve", ref="confirm")

// 4. Verify status updated
browser_wait_for(text="Approved")
browser_snapshot()  // Should show status = approved
```

**Stock Update & Audit Trail (Story 19):**
```javascript
// 1. Login as Purchase Manager
// 2. Navigate to approved request
// 3. Click "Update Stock" button
browser_click(element="Update Stock", ref="request_456")

// 4. Fill purchase details
browser_fill_form(fields=[
  { name: "Supplier Name", type: "textbox", ref: "supplier", value: "ABC Suppliers" },
  { name: "Invoice Number", type: "textbox", ref: "invoice", value: "INV-12345" },
  { name: "Purchase Date", type: "textbox", ref: "date", value: "2025-10-29" },
  { name: "Actual Cost", type: "textbox", ref: "cost", value: "5000" }
])

// 5. Submit
browser_click(element="Update Stock", ref="submit")

// 6. Verify:
// - Request status = completed
// - Stock updated in inventory
// - InventoryTransaction created
// - Audit trail complete
browser_wait_for(text="Stock updated successfully")
browser_navigate("http://localhost:3000/inventory")
browser_snapshot()  // Check stock increased
```

**Idempotency Check (Story 19):**
```javascript
// 1. Complete a purchase request (update stock)
// 2. Try to update stock again
browser_click(element="Update Stock", ref="same_request")

// 3. Verify error message
browser_wait_for(text="already been completed")
browser_take_screenshot("idempotency-check-failed.png")

// Result: ✅ PASS - Duplicate update prevented
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
browser_type(element="input", ref="e12", text="value")
browser_fill_form(fields=[...])         // Fill multiple fields at once
browser_select_option(element="dropdown", ref="e23", values=["option"])
browser_hover(element="menu", ref="e34")
browser_press_key(key="Enter")
browser_wait_for(text="Success")        // Wait for text to appear
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
Self-approval possible → FAIL
Duplicate stock updates possible → FAIL
Frontend filtering bypassed → FAIL
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

### Review Date: 2025-10-29 17:00:00
### Reviewed By: Quinn (Test Architect)

### E2E Test Execution (Playwright MCP)

**Test Scenarios:** `docs/qa/e2e/sprint5-story-17-purchase-request-creation.md`

**Execution Summary:**
- Total Test Cases: 8
- Passed: ✅ 8
- Failed: ❌ 0
- Duration: 6 minutes 15 seconds

**Test Results by AC:**
| AC# | Test Case | Status | Evidence |
|-----|-----------|--------|----------|
| AC1 | TC 1.1: Create purchase request | ✅ PASS | tc-1-1-create-request.png |
| AC1 | TC 1.2: Request validation | ✅ PASS | tc-1-2-validation.png |
| AC2 | TC 2.1: View own requests | ✅ PASS | tc-2-1-view-requests.png |
| ... | ... | ... | ... |

**Role-Based Access Tests:**
- Purchase Manager frontend filtering: ✅ PASS
- Admin can see all requests: ✅ PASS
- Cannot see other users' requests: ✅ PASS

**Console Errors:** None ✅

**Screenshots:** `.playwright-mcp/sprint-5/story-17/`

---

### Quality Gate Evaluation

**Gate YAML:** `docs/qa/gates/sprint-5-story-17-purchase-request-creation.yml`

**Critical ACs Status:**
- AC1 (Create request): ✅ PASS
- AC2 (View requests): ✅ PASS
- AC3 (Frontend filtering): ✅ PASS
- AC4 (Cancel request): ✅ PASS
- AC5 (Balagruha access): ✅ PASS

**Test Coverage:** 92% (Required: 80%) ✅

**Pass Criteria Met:**
- ✅ All critical ACs pass
- ✅ Test coverage >= 80%
- ✅ No P0 or P1 bugs
- ✅ All E2E scenarios executed successfully
- ✅ No console errors
- ✅ Role-based access verified

**Fail Criteria:** None triggered ✅

---

### Code Quality Assessment

**Architecture:** Clean separation of concerns. PurchaseRequest model well-structured. Frontend filtering implemented correctly.

**Security:** ✅ PASS - Backend validation on writes, frontend filtering works correctly
**Performance:** ✅ PASS - MongoDB queries optimized
**Reliability:** ✅ PASS - Error handling present, validation comprehensive
**Maintainability:** ✅ PASS - Code well-organized, follows patterns

---

### Gate Decision

**Gate Status:** ✅ PASS
**Quality Score:** 92/100
**Status Reason:** All 8 test cases pass, all critical ACs verified, role-based access working correctly, no issues found

---

### Updated Quality Gate YAML

```yaml
gate: PASS  # Updated from PENDING
status_reason: 'All test cases pass, all critical ACs verified, excellent quality'
reviewer: 'Quinn (Test Architect)'
updated: '2025-10-29T17:15:00Z'
quality_score: 92

evidence:
  e2e_tests:
    total: 8
    passed: 8
    failed: 0
    duration: '6 minutes 15 seconds'
```

---

### Recommended Status
✅ **DONE** - Story complete and ready for production

**Last Updated:** 2025-10-29 17:15:00 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** QA Agent (Quinn)
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

### Scenario 2: Frontend Filtering Bypassed (FAIL)
```
1. Test as Purchase Manager → Can see other users' requests ❌
2. Capture failure screenshot
3. Gate = FAIL (automatic - critical security issue)
4. Document: "Frontend filtering bypassed, can see unauthorized requests"
5. Update gate YAML (PENDING → FAIL)
6. Return to Dev with specific failure details
7. HALT - Don't proceed
```

### Scenario 3: Self-Approval Possible (FAIL)
```
1. Create request as Purchase Manager who is also Admin
2. Try to approve own request → Success ❌
3. Gate = FAIL (automatic - critical business rule violation)
4. Document: "Self-approval not prevented"
5. Update gate YAML (PENDING → FAIL)
6. Return to Dev
```

### Scenario 4: Idempotency Check Missing (FAIL)
```
1. Update stock for approved request → Success ✅
2. Try to update stock again → Success ❌ (should fail)
3. Gate = FAIL (automatic - data integrity issue)
4. Document: "Duplicate stock updates possible, idempotency check missing"
5. Update gate YAML (PENDING → FAIL)
6. Return to Dev
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
✅ Test role-based access thoroughly
✅ Verify frontend filtering works correctly
❌ Don't skip test execution
❌ Don't run npx playwright test commands
❌ Don't modify story ACs or Dev Agent Record
```

### Gate Decisions
```
✅ Be decisive: PASS / CONCERNS / FAIL
✅ Include clear reasoning
✅ Security and data integrity issues = automatic FAIL
✅ Verify quality gate YAML criteria
❌ Don't block arbitrarily
❌ Don't pass with failing tests
❌ Don't skip gate YAML verification
❌ Don't pass if role-based access broken
```

### Story File Updates
```
✅ ONLY update "QA Results" section
✅ Document test execution comprehensively
✅ Include screenshots and evidence
✅ Add timestamp using: date '+%Y-%m-%d %H:%M:%S'
❌ DO NOT modify: Story, ACs, Tasks, Dev Notes, Dev Agent Record
❌ DO NOT change story status if tests fail
```

---

## 🔍 Role-Based Access Verification Checklist

When testing Purchase Manager features:

```
□ Purchase Manager can create purchase requests
□ Purchase Manager can see only own requests
□ Purchase Manager can see only requests from assigned balagruhas
□ Purchase Manager cannot see other users' requests
□ Purchase Manager can cancel own pending requests
□ Purchase Manager can update stock after approval
□ Purchase Manager cannot approve own requests
□ Admin can see all purchase requests (all balagruhas, all users)
□ Admin can approve/reject any request
□ Admin cannot create purchase requests
□ Admin cannot update stock
□ Self-approval is prevented for all users
□ Idempotency check prevents duplicate stock updates
□ Frontend filtering cannot be bypassed via API
```

**Fail if ANY of these checks fail!**

---

## 📖 File Locations Reference

```
docs/stories/sprint5/
├── sprint5-story-17-purchase-request-creation.md
├── sprint5-story-18-admin-approval-workflow.md
└── sprint5-story-19-stock-update-audit-trail.md

docs/qa/e2e/
├── sprint5-story-17-purchase-request-creation.md
├── sprint5-story-18-admin-approval-workflow.md
└── sprint5-story-19-stock-update-audit-trail.md

docs/qa/gates/
├── sprint-5-story-17-purchase-request-creation.yml
├── sprint-5-story-18-admin-approval-workflow.yml
└── sprint-5-story-19-stock-update-audit-trail.yml

.playwright-mcp/sprint-5/
├── story-17/                  # Screenshots saved here
│   ├── tc-1-1-screenshot.png
│   └── ...
├── story-18/
└── story-19/

.ai/sprint-5-purchase-manager/
├── sprint-5-overview.md       # Architecture overview
└── QA-HANDOFF.md              # This file
```

---

## ✅ Pre-Flight Checklist

Before starting your first review:

```
□ Read sprint-5-overview.md (10 min)
□ Understand Request-Approval-Update workflow
□ Understand role-based access (Purchase Manager vs Admin)
□ Understand frontend filtering approach
□ Playwright MCP installed
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
8. Role-based access verified thoroughly
9. Frontend filtering tested and working
10. Idempotency checks verified
11. Self-approval prevention verified

---

**Now activate your QA agent and wait for stories marked "READY FOR QA"!**

```bash
# Transform to QA Agent
/transform qa

# Or if using CLI:
claude --agent qa
```

**Good luck! 🎯**

---

**Version:** 1.0
**Created:** 2025-10-29 16:44:54
**For:** Sprint 5 Purchase Manager QA Onboarding

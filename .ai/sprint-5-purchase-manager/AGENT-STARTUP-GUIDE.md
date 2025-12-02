# Sprint 5 Purchase Manager Agent Startup Guide

**Created:** 2025-10-29 16:44:54
**Purpose:** Exact files to load when starting Dev or QA agents for Sprint 5 Purchase Manager Workflow

---

## 🚀 For DEV Agent (Starting Sprint 5 Purchase Manager Development)

### Auto-Loaded by BMAD (Don't worry about these)
```
.ai/developer-onboarding-guide.md
.ai/workflow-quick-reference.md
.bmad-core/agents/dev.md
```

### YOU MUST LOAD (Copy-paste these file paths):

#### 1. Sprint 5 Purchase Manager Handoff (START HERE)
```
.ai/sprint-5-purchase-manager/DEV-HANDOFF.md
```

#### 2. Sprint 5 Context (MUST READ - in order)
```
.ai/sprint-5-purchase-manager/sprint-5-overview.md
.ai/sprint-5-purchase-manager/technical-patterns.md
```

#### 3. Epic Document (REQUIRED)
```
docs/epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md
```

#### 4. Your First Story (RECOMMENDED START)
```
docs/stories/sprint5/sprint5-story-17-purchase-request-creation.md
```

### Total Reading Time: ~35 minutes
- DEV-HANDOFF.md: 10 min
- sprint-5-overview.md: 10 min
- technical-patterns.md: 10 min
- Epic 05 document: 5 min
- First story: Read when ready to start

---

## 🎯 For QA Agent (Reviewing Sprint 5 Stories)

### Auto-Loaded by BMAD (Don't worry about these)
```
.ai/qa-onboarding-guide.md
.ai/workflow-quick-reference.md
.ai/playwright-mcp-tools-reference.md
.bmad-core/agents/qa.md
```

### YOU MUST LOAD (Copy-paste these file paths):

#### 1. Sprint 5 Purchase Manager Handoff (START HERE)
```
.ai/sprint-5-purchase-manager/QA-HANDOFF.md
```

#### 2. Sprint 5 Context (MUST READ - in order)
```
.ai/sprint-5-purchase-manager/sprint-5-overview.md
```

#### 3. Epic Document (REQUIRED)
```
docs/epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md
```

#### 4. Story Ready for Review (Find dynamically)
```bash
# Run this command to find stories ready for QA:
grep -l "READY FOR QA" docs/stories/sprint5/sprint5-story-*.md

# Example output:
# docs/stories/sprint5/sprint5-story-17-purchase-request-creation.md
```

### Total Reading Time: ~20 minutes
- QA-HANDOFF.md: 10 min
- sprint-5-overview.md: 10 min

---

## 📋 DEV Agent: Copy-Paste Startup Checklist

When you activate Dev agent, tell it:

```
I'm starting Sprint 5 Purchase Manager Workflow development. Please load these files in order:

1. .ai/sprint-5-purchase-manager/DEV-HANDOFF.md
2. .ai/sprint-5-purchase-manager/sprint-5-overview.md
3. .ai/sprint-5-purchase-manager/technical-patterns.md
4. docs/epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md
5. docs/stories/sprint5/sprint5-story-17-purchase-request-creation.md

After loading, I want to start implementing Story 17: Purchase Request Creation & Management.
```

---

## 📋 QA Agent: Copy-Paste Startup Checklist

When you activate QA agent, tell it:

```
I'm starting Sprint 5 Purchase Manager QA reviews. Please load these files in order:

1. .ai/sprint-5-purchase-manager/QA-HANDOFF.md
2. .ai/sprint-5-purchase-manager/sprint-5-overview.md
3. docs/epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md

Then search for stories ready for review:
grep -l "READY FOR QA" docs/stories/sprint5/sprint5-story-*.md

Load the first story found and its E2E test scenarios, then begin review.
```

---

## 🎯 Quick Context Summary

### What is Sprint 5 Purchase Manager Workflow?
- **Purpose:** Enable Purchase Managers to request inventory replenishment with Admin approval
- **Stories:** 3 stories in Epic 05
- **Duration:** 3.5 days estimated (1.5 + 1 + 1)
- **Architecture:** Request-Approval-Update workflow with audit trail

### Key Technologies
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React, TailwindCSS, Dropdown-based UI
- **RBAC:** OLD RBAC system (develop branch) with frontend filtering
- **Audit Trail:** InventoryTransaction model integration

### Story Order (Dev Agent)
**SEQUENTIAL ORDER:**
1. Story 17: Purchase Request Creation (Purchase Manager) - 1.5 days
2. Story 18: Admin Approval Workflow (Admin) - 1 day
3. Story 19: Stock Update & Audit Trail (Purchase Manager) - 1 day

**Dependencies:**
- Story 18 depends on Story 17 (needs PurchaseRequest model)
- Story 19 depends on Story 18 (needs approval workflow)

### Testing Requirements (Both Agents)
- **Dev Creates:** E2E test scenarios (markdown) + Quality gate YAML
- **QA Executes:** E2E tests using Playwright MCP tools
- **Gate Criteria:** 80%+ test coverage, all critical ACs pass
- **No Automated Tests:** Only manual MCP tool execution

---

## 📁 File Structure Overview

```
.ai/sprint-5-purchase-manager/
├── README.md                          # Sprint 5 context index
├── AGENT-STARTUP-GUIDE.md             # This file
├── DEV-HANDOFF.md                     # Dev agent startup guide
├── QA-HANDOFF.md                      # QA agent startup guide
├── sprint-5-overview.md               # Sprint 5 architecture
└── technical-patterns.md              # Code patterns

docs/
├── epics/sprint5/
│   └── sprint5-epic-05-purchase-manager-workflow.md  # Epic document
│
├── stories/sprint5/
│   ├── sprint5-story-17-purchase-request-creation.md
│   ├── sprint5-story-18-admin-approval-workflow.md
│   └── sprint5-story-19-stock-update-audit-trail.md
│
└── qa/
    ├── e2e/
    │   └── sprint5-story-*.md         # E2E test scenarios (Dev creates)
    └── gates/
        └── sprint-5-story-*.yml       # Quality gates (Dev creates, QA updates)
```

---

## ⚡ Super Quick Start (If You're in a Hurry)

### Dev Agent (Minimum Required Reading)
```
1. Read: .ai/sprint-5-purchase-manager/DEV-HANDOFF.md (10 min)
2. Skim: .ai/sprint-5-purchase-manager/sprint-5-overview.md (5 min)
3. Read: docs/stories/sprint5/sprint5-story-17-purchase-request-creation.md (15 min)
4. START CODING with reference to technical-patterns.md as needed
```

### QA Agent (Minimum Required Reading)
```
1. Read: .ai/sprint-5-purchase-manager/QA-HANDOFF.md (10 min)
2. Skim: .ai/sprint-5-purchase-manager/sprint-5-overview.md (5 min)
3. Find story: grep -l "READY FOR QA" docs/stories/sprint5/sprint5-story-*.md
4. Read story + E2E scenarios
5. START TESTING using Playwright MCP tools
```

---

## 🆘 Common Questions

### Q: What if I don't have time to read everything?
**A (Dev):** Minimum read DEV-HANDOFF.md and your assigned story. Reference other docs as needed.
**A (QA):** Minimum read QA-HANDOFF.md and the story you're testing.

### Q: Where do I start development?
**A:** Story 17 (Purchase Request Creation). This is the foundation. Stories 18 and 19 depend on this.

### Q: What if a story isn't ready for QA yet?
**A:** Wait for Dev to mark it "✅ READY FOR QA". Search periodically: `grep -l "READY FOR QA" docs/stories/sprint5/sprint5-story-*.md`

### Q: Do I write automated test code?
**A (Dev):** No, write test SCENARIOS (markdown). QA executes manually with MCP tools.
**A (QA):** No, use Playwright MCP tools interactively. No .spec.js files.

### Q: What's the RBAC approach?
**A:** MVP approach using OLD RBAC (develop branch). Frontend filtering by user.balagruhaIds with light backend validation on writes. Designed for easy upgrade when NEW RBAC merges.

### Q: How long does each story take?
**A (Dev):** Story 17: 1.5 days, Story 18: 1 day, Story 19: 1 day
**A (QA):** 2-3 hours per story for full E2E test execution

---

## ✅ Final Checklist Before Starting

### Dev Agent
```
□ Read DEV-HANDOFF.md
□ Read sprint-5-overview.md
□ Read Epic 05 document (understand workflow)
□ Read technical-patterns.md (understand atomic transactions)
□ Understand OLD RBAC with frontend filtering approach
□ Know to create both E2E scenarios AND quality gate YAML
□ Ready to start with Story 17
```

### QA Agent
```
□ Read QA-HANDOFF.md
□ Read sprint-5-overview.md
□ Playwright MCP installed
□ Servers running (frontend:3000, backend:5001)
□ Know how to verify quality gate YAML
□ Know to test role-based access (Purchase Manager vs Admin)
□ Ready to review stories marked "READY FOR QA"
```

---

## 🎯 Success Metrics

### Dev Agent Success
- Story implements all ACs
- E2E scenarios written (1+ per AC)
- Quality gate YAML created
- Frontend filtering implemented correctly
- Backend validation on writes present
- Atomic transactions used for stock updates
- Status set to "READY FOR QA"

### QA Agent Success
- All E2E tests executed using MCP tools
- Quality gate criteria verified
- Gate decision made (PASS/CONCERNS/FAIL)
- QA Results comprehensive
- Quality gate YAML updated
- Screenshots captured as evidence
- Role-based access verified (Purchase Manager vs Admin)

---

**Ready to start? Load the files above and begin!**

**Dev:** Start with Story 17
**QA:** Wait for "READY FOR QA" stories

---

**Version:** 1.0
**Created:** 2025-10-29 16:44:54
**For:** Sprint 5 Purchase Manager Agent Onboarding

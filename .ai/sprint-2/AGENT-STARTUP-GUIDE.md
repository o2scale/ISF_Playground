# Sprint 2 Agent Startup Guide

**Created:** 2025-10-24 18:29:42
**Purpose:** Exact files to load when starting Dev or QA agents for Sprint 2

---

## 🚀 For DEV Agent (Starting Sprint 2 Development)

### Auto-Loaded by BMAD (Don't worry about these)
```
.ai/developer-onboarding-guide.md
.ai/workflow-quick-reference.md
.bmad-core/agents/dev.md
```

### YOU MUST LOAD (Copy-paste these file paths):

#### 1. Sprint 2 Handoff (START HERE)
```
.ai/sprint-2/DEV-HANDOFF.md
```

#### 2. Sprint 2 Context (MUST READ - in order)
```
.ai/sprint-2/sprint-2-overview.md
.ai/sprint-2/epic-summaries.md
.ai/sprint-2/design-system-reference.md
.ai/sprint-2/technical-patterns.md
```

#### 3. Your First Story (RECOMMENDED START)
```
docs/stories/sprint2/epic-02-story-01-course-creation-structure-builder.md
```

### Total Reading Time: ~50 minutes
- DEV-HANDOFF.md: 10 min
- sprint-2-overview.md: 15 min
- epic-summaries.md: 10 min
- design-system-reference.md: 10 min
- technical-patterns.md: 15 min
- First story: Read when ready to start

---

## 🎯 For QA Agent (Reviewing Sprint 2 Stories)

### Auto-Loaded by BMAD (Don't worry about these)
```
.ai/qa-onboarding-guide.md
.ai/workflow-quick-reference.md
.ai/playwright-mcp-tools-reference.md
.bmad-core/agents/qa.md
```

### YOU MUST LOAD (Copy-paste these file paths):

#### 1. Sprint 2 Handoff (START HERE)
```
.ai/sprint-2/QA-HANDOFF.md
```

#### 2. Sprint 2 Context (MUST READ - in order)
```
.ai/sprint-2/sprint-2-overview.md
.ai/sprint-2/epic-summaries.md
.ai/sprint-2/design-system-reference.md
```

#### 3. Story Ready for Review (Find dynamically)
```bash
# Run this command to find stories ready for QA:
grep -l "READY FOR QA" docs/stories/sprint2/*.md

# Example output:
# docs/stories/sprint2/epic-02-story-01-course-creation-structure-builder.md
```

### Total Reading Time: ~25 minutes
- QA-HANDOFF.md: 10 min
- sprint-2-overview.md: 10 min
- epic-summaries.md: 5 min
- design-system-reference.md: Optional (reference during testing)

---

## 📋 DEV Agent: Copy-Paste Startup Checklist

When you activate Dev agent, tell it:

```
I'm starting Sprint 2 development. Please load these files in order:

1. .ai/sprint-2/DEV-HANDOFF.md
2. .ai/sprint-2/sprint-2-overview.md
3. .ai/sprint-2/epic-summaries.md
4. .ai/sprint-2/design-system-reference.md
5. .ai/sprint-2/technical-patterns.md
6. docs/stories/sprint2/epic-02-story-01-course-creation-structure-builder.md

After loading, I want to start implementing Epic 02 Story 01: Course Creation & Structure Builder.
```

---

## 📋 QA Agent: Copy-Paste Startup Checklist

When you activate QA agent, tell it:

```
I'm starting Sprint 2 QA reviews. Please load these files in order:

1. .ai/sprint-2/QA-HANDOFF.md
2. .ai/sprint-2/sprint-2-overview.md
3. .ai/sprint-2/epic-summaries.md

Then search for stories ready for review:
grep -l "READY FOR QA" docs/stories/sprint2/*.md

Load the first story found and its E2E test scenarios, then begin review.
```

---

## 🎯 Quick Context Summary

### What is Sprint 2?
- **Purpose:** Build complete LMS (Learning Management System) with enhanced user roles
- **Stories:** 32 stories across 5 epics
- **Duration:** 8-10 weeks estimated
- **Architecture:** 3-tier course hierarchy (Course → Module → Chapter → Content)

### Key Technologies
- **Backend:** Node.js, Express, MongoDB, WebSocket
- **Frontend:** React 19, TailwindCSS, Recharts
- **Media:** AWS S3 + CloudFront CDN
- **External:** Twilio WhatsApp API, Artweaver (Electron IPC)

### Story Order (Dev Agent)
**START WITH:**
1. Epic 02 Story 01: Course Creation (Foundation)
2. Epic 02 Story 02: Content Management
3. Epic 02 Story 03: Quiz System

**THEN DO:**
- Epic 01 Stories (Student features)
- Epic 03 Stories (Coach features)
- Epic 04 Stories (Amma features)
- Epic 05 Stories (System features)

### Testing Requirements (Both Agents)
- **Dev Creates:** E2E test scenarios (markdown) + Quality gate YAML
- **QA Executes:** E2E tests using Playwright MCP tools
- **Gate Criteria:** 80%+ test coverage, all critical ACs pass
- **No Automated Tests:** Only manual MCP tool execution

---

## 📁 File Structure Overview

```
.ai/sprint-2/
├── README.md                          # Sprint 2 context index
├── AGENT-STARTUP-GUIDE.md             # This file
├── DEV-HANDOFF.md                     # Dev agent startup guide
├── QA-HANDOFF.md                      # QA agent startup guide
├── sprint-2-overview.md               # Sprint 2 architecture (4,500 lines)
├── epic-summaries.md                  # All 5 epics summarized (800 lines)
├── design-system-reference.md         # UI patterns quick ref (600 lines)
└── technical-patterns.md              # Code patterns (1,000 lines)

docs/
├── epics/sprint2/
│   ├── MPSD-sprint2.md                # Master planning doc
│   ├── design-system-sprint2.md       # Full design system
│   └── epic-*.md                      # 5 epic documents
│
├── stories/sprint2/
│   └── epic-*.md                      # 32 story documents
│
└── qa/
    ├── e2e/
    │   └── epic-*.md                  # E2E test scenarios (Dev creates)
    └── gates/
        └── sprint-2-epic-*.yml        # Quality gates (Dev creates, QA updates)
```

---

## ⚡ Super Quick Start (If You're in a Hurry)

### Dev Agent (Minimum Required Reading)
```
1. Read: .ai/sprint-2/DEV-HANDOFF.md (10 min)
2. Skim: .ai/sprint-2/design-system-reference.md (5 min - focus on examples)
3. Read: docs/stories/sprint2/epic-02-story-01-*.md (15 min)
4. START CODING with reference to technical-patterns.md as needed
```

### QA Agent (Minimum Required Reading)
```
1. Read: .ai/sprint-2/QA-HANDOFF.md (10 min)
2. Skim: .ai/sprint-2/design-system-reference.md (5 min - focus on UI checklist)
3. Find story: grep -l "READY FOR QA" docs/stories/sprint2/*.md
4. Read story + E2E scenarios
5. START TESTING using Playwright MCP tools
```

---

## 🆘 Common Questions

### Q: What if I don't have time to read everything?
**A (Dev):** Minimum read DEV-HANDOFF.md and your assigned story. Reference other docs as needed.
**A (QA):** Minimum read QA-HANDOFF.md and the story you're testing. Reference design-system as needed.

### Q: Where do I start development?
**A:** Epic 02 Story 01 (Course Creation). This is the foundation. All other stories depend on this.

### Q: What if a story isn't ready for QA yet?
**A:** Wait for Dev to mark it "✅ READY FOR QA". Search periodically: `grep -l "READY FOR QA" docs/stories/sprint2/*.md`

### Q: Do I write automated test code?
**A (Dev):** No, write test SCENARIOS (markdown). QA executes manually with MCP tools.
**A (QA):** No, use Playwright MCP tools interactively. No .spec.js files.

### Q: What's new in Sprint 2 workflow?
**A:** Dev now creates quality gate YAML files (in addition to E2E scenarios). QA verifies and updates them.

### Q: How long does each story take?
**A (Dev):** 8-20 hours per story (varies by complexity)
**A (QA):** 2-4 hours per story for full E2E test execution

---

## ✅ Final Checklist Before Starting

### Dev Agent
```
□ Read DEV-HANDOFF.md
□ Read sprint-2-overview.md
□ Read epic-summaries.md (know the big picture)
□ Read design-system-reference.md (child-friendly vs professional UI)
□ Read technical-patterns.md (copy-paste ready code)
□ Understand 3-tier course hierarchy
□ Know to create both E2E scenarios AND quality gate YAML
□ Ready to start with Epic 02 Story 01
```

### QA Agent
```
□ Read QA-HANDOFF.md
□ Read sprint-2-overview.md
□ Read design-system-reference.md (UI verification checklist)
□ Playwright MCP installed
□ Servers running (frontend:3000, backend:5001)
□ Know how to verify quality gate YAML
□ Know child-friendly UI patterns to verify
□ Ready to review stories marked "READY FOR QA"
```

---

## 🎯 Success Metrics

### Dev Agent Success
- Story implements all ACs
- E2E scenarios written (1+ per AC)
- Quality gate YAML created
- Design system followed
- Code follows technical patterns
- Status set to "READY FOR QA"

### QA Agent Success
- All E2E tests executed using MCP tools
- Quality gate criteria verified
- Gate decision made (PASS/CONCERNS/FAIL)
- QA Results comprehensive
- Quality gate YAML updated
- Screenshots captured as evidence

---

**Ready to start? Load the files above and begin!**

**Dev:** Start with Epic 02 Story 01
**QA:** Wait for "READY FOR QA" stories

---

**Version:** 1.0
**Created:** 2025-10-24 18:29:42
**For:** Sprint 2 Agent Onboarding

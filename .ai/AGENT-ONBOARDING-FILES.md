# Agent Onboarding Files - Quick Reference

**Date:** October 13, 2025
**Purpose:** Specify exactly which files Dev and QA agents should read on activation
**Status:** ✅ COMPLETE - All files updated to Version 3.0 (Concise)

---

## 🔧 Dev Agent (Terminal 1)

### Activation Command
```bash
claude --agent dev
```

### Files Read Automatically
**On Activation (Automatic):**
1. `.bmad-core/agents/dev.md` - Core agent instructions (auto-loaded)
2. `.bmad-core/core-config.yaml` - Project configuration (auto-loaded)

### Quick Onboarding File (Read This)
**Primary Onboarding:**
- **`.ai/developer-onboarding-guide.md`** (Version 3.0 - Concise)
  - **Size:** 312 lines (down from 2314 lines)
  - **Read Time:** 3-5 minutes
  - **Contents:**
    - Critical rules at top (30-second read)
    - Quick start workflow
    - Test scenario template with examples
    - Common mistakes table
    - Definition of done checklist
    - Command reference

### Additional Resources (Reference Only)
**Read these when you need more detail:**
- `.ai/playwright-mcp-tools-reference.md` - Complete MCP tools reference (26 tools)
- `.ai/bmad-playwright-workflow.md` - Detailed workflow
- `.ai/workflow-quick-reference.md` - Command cheat sheet

---

## 🧪 QA Agent (Terminal 2)

### Activation Command
```bash
claude --agent qa
```

### Files Read Automatically
**On Activation (Automatic):**
1. `.bmad-core/agents/qa.md` - Core agent instructions (auto-loaded)
2. `.bmad-core/core-config.yaml` - Project configuration (auto-loaded)

### Quick Onboarding File (Read This)
**Primary Onboarding:**
- **`.ai/qa-onboarding-guide.md`** (Version 3.0 - Concise)
  - **Size:** 545 lines (down from 1048 lines)
  - **Read Time:** 5-7 minutes
  - **Contents:**
    - Critical MCP testing method at top (30-second read)
    - Quick start workflow
    - E2E test execution examples with MCP tools
    - Gate decision rules
    - QA results template
    - Common scenarios
    - Troubleshooting

### Additional Resources (Reference Only)
**Read these when you need more detail:**
- `.ai/playwright-mcp-tools-reference.md` - Complete MCP tools reference (26 tools)
- `.ai/bmad-playwright-workflow.md` - Detailed workflow
- `.ai/workflow-quick-reference.md` - Command cheat sheet

---

## 📋 Installation (First Time Only)

### Playwright MCP Installation
**Both agents need this enabled:**
```bash
claude mcp add playwright npx '@playwright/mcp@latest'
```

**What this does:**
- Enables all 26 Playwright MCP tools
- Opens visible Chrome browser window (not headless)
- Allows manual authentication (cookies persist)
- Configuration persists for current directory

---

## 📁 Complete File List

### Core Configuration Files (Auto-loaded)
```
.bmad-core/
├── agents/
│   ├── dev.md          # Dev agent core instructions
│   └── qa.md           # QA agent core instructions
└── core-config.yaml    # Project configuration
```

### Primary Onboarding (Read First)
```
.ai/
├── developer-onboarding-guide.md   # Dev quick start (v3.0)
└── qa-onboarding-guide.md          # QA quick start (v3.0)
```

### Reference Documentation (As Needed)
```
.ai/
├── playwright-mcp-tools-reference.md   # All 26 MCP tools (v2.0)
├── bmad-playwright-workflow.md         # Detailed workflow (v2.0)
└── workflow-quick-reference.md         # Command cheat sheet (v2.0)
```

---

## ✅ What's Updated (Version 3.0)

### Changes in This Update (October 13, 2025)

**1. Developer Onboarding Guide (v3.0)**
- Reduced from 2314 → 312 lines (87% reduction)
- Added critical rules at top (30-second read)
- Added test scenario template with example
- Added common mistakes table
- Focused on practical quick-start information

**2. QA Onboarding Guide (v3.0)**
- Reduced from 1048 → 545 lines (48% reduction)
- Added critical MCP testing method at top (30-second read)
- Added step-by-step MCP tool execution examples
- Added complete test case execution pattern
- Focused on practical quick-start information

**3. Playwright MCP Tools Reference (v2.0)**
- Updated tool count from 19 → 26 tools
- Added installation instructions
- Added 8 new tools (navigate_forward, tab management, pdf_save, etc.)
- Added alphabetical tool list
- Added authentication tips

**4. BMAD Core Agent Files**
- Fixed QA agent tool count (19 → 26 tools)
- Verified dev agent instructions (already correct)

---

## 🎯 Quick Start Summary

### Dev Agent Workflow
```
1. Activate: claude --agent dev
2. Read: .ai/developer-onboarding-guide.md (3-5 min)
3. Your job:
   - Implement features (backend + frontend)
   - Write test SCENARIOS (markdown, NOT code)
   - Format: TC 1.1, TC 1.2 (test cases per AC)
   - Update Dev Agent Record section
   - Set status: "Ready for QA"
   - HALT (wait for QA)
```

### QA Agent Workflow
```
1. Activate: claude --agent qa
2. Read: .ai/qa-onboarding-guide.md (5-7 min)
3. Your job:
   - Find story: grep "READY FOR QA" docs/stories/
   - Read test scenarios: docs/qa/e2e/story-{n}-{feature}.md
   - Execute tests using MCP tools programmatically
   - Document results in QA Results section
   - Create quality gate file (PASS/CONCERNS/FAIL)
   - HALT (story done or return to Dev)
```

---

## 📊 Documentation Statistics

### File Sizes (Before vs After)

| File | Before | After | Reduction |
|------|--------|-------|-----------|
| developer-onboarding-guide.md | 2314 lines | 312 lines | 87% |
| qa-onboarding-guide.md | 1048 lines | 545 lines | 48% |
| playwright-mcp-tools-reference.md | 735 lines (v1.0) | 735 lines (v2.0) | Tool count updated |

**Total Onboarding Reading:**
- **Before:** 3362 lines (dev + qa guides)
- **After:** 857 lines (dev + qa guides)
- **Reduction:** 75% fewer lines to read

**Read Time:**
- **Dev Agent:** 3-5 minutes (down from 20-30 minutes)
- **QA Agent:** 5-7 minutes (down from 15-20 minutes)

---

## 🔗 Links to Files

### Primary Onboarding (Start Here)
1. **Dev Agent:** [`.ai/developer-onboarding-guide.md`](.ai/developer-onboarding-guide.md)
2. **QA Agent:** [`.ai/qa-onboarding-guide.md`](.ai/qa-onboarding-guide.md)

### Reference Documentation (As Needed)
3. **MCP Tools:** [`.ai/playwright-mcp-tools-reference.md`](.ai/playwright-mcp-tools-reference.md)
4. **Workflow:** [`.ai/bmad-playwright-workflow.md`](.ai/bmad-playwright-workflow.md)
5. **Quick Reference:** [`.ai/workflow-quick-reference.md`](.ai/workflow-quick-reference.md)

### Core Configuration (Auto-loaded)
6. **Dev Agent Config:** [`.bmad-core/agents/dev.md`](.bmad-core/agents/dev.md)
7. **QA Agent Config:** [`.bmad-core/agents/qa.md`](.bmad-core/agents/qa.md)
8. **Project Config:** [`.bmad-core/core-config.yaml`](.bmad-core/core-config.yaml)

---

## ✅ Validation Checklist

- [x] **Dev onboarding guide updated** (v3.0 - concise)
- [x] **QA onboarding guide updated** (v3.0 - concise)
- [x] **MCP tools reference updated** (v2.0 - 26 tools)
- [x] **Dev agent core config verified** (already correct)
- [x] **QA agent core config fixed** (19→26 tools)
- [x] **All references to .spec.js removed** from workflow docs
- [x] **All references to npx playwright test removed** from workflow docs
- [x] **MCP tool names explicitly mentioned** throughout
- [x] **Installation instructions added** (claude mcp add playwright)
- [x] **Consistent messaging** across all files

---

## 🚀 Ready to Start

**Dev Agent (Terminal 1):**
```bash
claude --agent dev
# Read: .ai/developer-onboarding-guide.md
# Start implementing stories
```

**QA Agent (Terminal 2):**
```bash
claude --agent qa
# Read: .ai/qa-onboarding-guide.md
# Start reviewing stories
```

**Both agents have everything they need to onboard quickly and start working!**

---

**Prepared By:** BMad Orchestrator
**Date:** October 13, 2025
**Status:** ✅ COMPLETE
**Version:** 3.0 (Concise Onboarding)

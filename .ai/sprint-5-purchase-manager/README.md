# Sprint 5 Purchase Manager Workflow - Context Documentation

**Last Updated:** 2025-10-29 16:44:54
**Sprint:** Sprint 5 Enhancement - Epic 05
**Status:** Documentation Complete (3 stories ready for development)

---

## Overview

This directory contains comprehensive context documentation for **Sprint 5 Purchase Manager Workflow** (Epic 05) of the ISF Playground project. This enhancement enables Purchase Managers to request inventory replenishment with Admin approval, creating a formal workflow with full audit trails.

## Sprint 5 Purchase Manager Structure

**Total Stories:** 3 across 1 Epic
**Estimated Duration:** 3.5 days (1.5 + 1 + 1)

### Epic 05: Purchase Manager Workflow (3 stories)
Purchase Manager workflow for shop inventory replenishment with request-approval-update pattern and full audit trails.

---

## Context Files in This Directory

### 1. `AGENT-STARTUP-GUIDE.md` ⭐ START HERE
Quick reference guide for Dev and QA agents.
- Exact files to load for onboarding
- Copy-paste checklists for agent activation
- Total reading time estimates
- Common questions and answers

### 2. `DEV-HANDOFF.md`
Comprehensive developer onboarding guide.
- Complete workflow for each story
- Technical requirements and patterns
- Story dependencies (17 → 18 → 19)
- Pre-flight checklist

### 3. `QA-HANDOFF.md`
Comprehensive QA onboarding guide.
- E2E test execution workflow
- Role-based access testing guidelines
- Quality gate evaluation criteria
- Pre-flight checklist

### 4. `sprint-5-overview.md`
Architecture and workflow overview.
- Business context and problem statement
- Request-Approval-Update workflow diagrams
- User roles and permissions
- Database models and API endpoints
- RBAC strategy (MVP approach)

### 5. `technical-patterns.md`
Copy-paste ready code patterns.
- MongoDB model patterns
- Controller patterns (atomic transactions)
- Frontend patterns (dropdown UI, filtering)
- Validation and error handling

---

## How to Use This Documentation

### For Development Agents

**Quick Start (30 minutes):**
1. Start with `AGENT-STARTUP-GUIDE.md` for quick overview
2. Read `DEV-HANDOFF.md` for complete onboarding
3. Read `sprint-5-overview.md` for architecture understanding
4. Read `technical-patterns.md` for implementation patterns
5. Read Epic 05 document: `docs/epics/sprint5/sprint5-epic-05-purchase-manager-workflow.md`
6. Start with Story 17: `docs/stories/sprint5/sprint5-story-17-purchase-request-creation.md`

**Development Order:**
- Story 17: Purchase Request Creation (1.5 days) - Foundation
- Story 18: Admin Approval Workflow (1 day) - Depends on 17
- Story 19: Stock Update & Audit Trail (1 day) - Depends on 18

### For QA Agents

**Quick Start (20 minutes):**
1. Start with `AGENT-STARTUP-GUIDE.md` for quick overview
2. Read `QA-HANDOFF.md` for complete onboarding
3. Read `sprint-5-overview.md` for workflow understanding
4. Wait for stories marked "✅ READY FOR QA"
5. Execute E2E tests using Playwright MCP tools

**Testing Focus:**
- Role-based access (Purchase Manager vs Admin)
- Frontend filtering by balagruhaIds
- Self-approval prevention
- Idempotency checks (no duplicate stock updates)
- Atomic transaction integrity

### For Orchestrator Agents

**Quick Start:**
1. Use this README for sprint progress tracking
2. Reference `sprint-5-overview.md` for dependency management
3. Coordinate work across stories (sequential order required)
4. Monitor quality gates and test coverage

---

## Sprint 5 Purchase Manager Workflow Summary

### Business Problem

- **Current State:** Only Admins can adjust shop inventory
- **Bottleneck:** Admins handle all inventory purchases
- **Missing:** Formal request-approval workflow
- **Missing:** Audit trails for purchases

### Solution

**Request-Approval-Update Workflow:**
```
Purchase Manager creates request (low stock)
    ↓
Admin approves/rejects
    ↓
Purchase Manager updates stock (after approval)
    ↓
Full audit trail via InventoryTransaction
```

### Key Technical Decisions

1. **Dropdown UI** (not tabs) in existing `/purchase` page
2. **Frontend filtering** (MVP) by user.balagruhaIds with light backend validation
3. **Atomic transactions** for stock updates (all-or-nothing)
4. **Idempotency checks** to prevent duplicate stock updates
5. **Self-approval prevention** via backend validation

---

## Dependencies

### Technical Dependencies

- ✅ Existing ShopItem model (Sprint 5 Story 05)
- ✅ Existing InventoryTransaction model (Sprint 5 Story 06)
- ✅ Existing inventory controllers
- ✅ Existing `/purchase` page UI (Machine Repairs)
- ✅ OLD RBAC system (develop branch)

### Story Dependencies

- **Story 17:** No dependencies (foundation)
- **Story 18:** Depends on Story 17 (needs PurchaseRequest model and UI)
- **Story 19:** Depends on Story 18 (needs approval workflow)

---

## Key Metrics

**Total Stories:** 3
**Total Acceptance Criteria:** 19 across all stories (7 + 6 + 6)
**Estimated Development Time:** 3.5 days (1.5 + 1 + 1)
**React Components:** 10+ new/refactored components
**API Endpoints:** 6 new endpoints
**MongoDB Schemas:** 1 new schema, 1 modified schema

---

## Story Documentation Locations

All story documents are located in:
```
docs/stories/sprint5/
├── sprint5-story-17-purchase-request-creation.md (1.5 days)
├── sprint5-story-18-admin-approval-workflow.md (1 day)
└── sprint5-story-19-stock-update-audit-trail.md (1 day)
```

---

## Epic Documentation Location

Epic document is located in:
```
docs/epics/sprint5/
└── sprint5-epic-05-purchase-manager-workflow.md
```

---

## File Structure Overview

```
.ai/sprint-5-purchase-manager/
├── README.md                          # This file
├── AGENT-STARTUP-GUIDE.md             # Quick start guide
├── DEV-HANDOFF.md                     # Dev agent onboarding
├── QA-HANDOFF.md                      # QA agent onboarding
├── sprint-5-overview.md               # Architecture overview
└── technical-patterns.md              # Code patterns

docs/
├── epics/sprint5/
│   └── sprint5-epic-05-purchase-manager-workflow.md
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

backend/
├── models/
│   ├── PurchaseRequest.js             # NEW (Story 17)
│   └── inventoryTransaction.js        # MODIFIED (add enum values)
├── controllers/shop/admin/
│   └── purchaseRequestController.js   # NEW (Story 17-19)
├── middleware/
│   └── purchaseRequestValidation.js   # NEW (Story 17)
└── routes/v2/shop/admin/
    └── purchaseRequests.js            # NEW (Story 17)

frontend/src/components/purchaseManagement/
├── PurchaseManagement.jsx             # REFACTORED (Story 17)
├── views/
│   ├── MachineRepairsView.jsx         # NEW (extracted, Story 17)
│   └── ShopInventoryView.jsx          # NEW (Story 17)
├── modals/
│   ├── CreatePurchaseRequestModal.jsx # NEW (Story 17)
│   ├── ApproveRequestModal.jsx        # NEW (Story 18)
│   ├── RejectRequestModal.jsx         # NEW (Story 18)
│   └── UpdateStockModal.jsx           # NEW (Story 19)
└── components/
    ├── SharedFilters.jsx              # NEW (Story 17)
    ├── PurchaseRequestCard.jsx        # NEW (Story 17)
    └── StatusBadge.jsx                # NEW (Story 17)
```

---

## Workflow for Developers

When implementing a Sprint 5 Purchase Manager story:

1. **Read Context Files**
   - AGENT-STARTUP-GUIDE.md
   - DEV-HANDOFF.md
   - sprint-5-overview.md
   - technical-patterns.md

2. **Read Story Document**
   - User story and acceptance criteria
   - Technical implementation details
   - Backend and frontend requirements
   - Task breakdown

3. **Implement**
   - Follow RBAC approach (frontend filtering)
   - Use atomic transactions for stock updates
   - Prevent self-approval
   - Add idempotency checks
   - Create tests as you develop

4. **Create E2E Tests**
   - Write comprehensive E2E test scenarios (markdown)
   - Create quality gate YAML file
   - Ensure test coverage >80%

5. **QA Handoff**
   - Mark story as "✅ READY FOR QA"
   - Provide QA with test instructions
   - Share any edge cases or known issues

---

## Workflow for QA

When testing a Sprint 5 Purchase Manager story:

1. **Read Context Files**
   - AGENT-STARTUP-GUIDE.md
   - QA-HANDOFF.md
   - sprint-5-overview.md

2. **Verify Prerequisites**
   - E2E test scenarios exist
   - Quality gate YAML exists
   - Servers running

3. **Execute E2E Tests**
   - Use Playwright MCP tools
   - Execute ALL test scenarios
   - Capture screenshots
   - Check console for errors

4. **Evaluate Quality Gate**
   - Verify all critical ACs pass
   - Check test coverage meets requirement
   - Test role-based access thoroughly

5. **Make Gate Decision**
   - PASS / CONCERNS / FAIL
   - Update QA Results section
   - Update quality gate YAML

---

## Contact and Support

For questions about Sprint 5 Purchase Manager context documentation:
- Check this README first
- Review `sprint-5-overview.md` for architecture questions
- Consult `technical-patterns.md` for implementation questions
- Review story documents for specific acceptance criteria

---

## Next Steps

After Sprint 5 Purchase Manager story implementation, developers must create:
1. Comprehensive E2E test suite covering all acceptance criteria
2. Quality gate YAML file defining pass/fail criteria
3. Update story documentation with Dev Agent Record and timestamp

---

## Success Criteria

### For Development
- All 3 stories implemented (17, 18, 19)
- Frontend filtering works correctly
- Backend validation prevents unauthorized access
- Atomic transactions ensure data integrity
- Self-approval prevented
- Idempotency checks prevent duplicate updates
- E2E test scenarios written
- Quality gate YAMLs created

### For QA
- All E2E tests executed successfully
- Role-based access verified (Purchase Manager vs Admin)
- Frontend filtering cannot be bypassed
- Self-approval prevention working
- Idempotency checks working
- Quality gates updated with decisions

### For Production
- Purchase Managers can create requests in <2 minutes
- Admins can approve/reject in <1 minute
- Stock updates complete in <3 minutes
- Full audit trail visible for all requests
- Zero duplicate stock updates
- Zero permission bypass vulnerabilities

---

## RBAC Strategy Note

**Important:** This implementation uses the **OLD RBAC system** (develop branch) with **frontend filtering** and **light backend validation**.

**Why?**
- Develop branch doesn't have scope-based filtering yet
- NEW RBAC (with scope field) is in feature/sprint-2 branch (not merged)
- MVP approach: Frontend filtering by user.balagruhaIds
- Easy upgrade path when NEW RBAC merges

**Future Upgrade:**
When NEW RBAC merges to develop, upgrade to backend scope-based filtering by:
1. Removing frontend filtering logic
2. Adding scope: 'balagruh' to Purchase Management permissions
3. Using middleware for automatic query filtering

---

**Last Updated:** 2025-10-29 16:44:54 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Updated By:** Orchestrator (BMad)

---

**End of README**

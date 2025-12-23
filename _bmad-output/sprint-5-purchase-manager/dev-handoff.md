# 🚀 Developer Handoff: Sprint 5 (Purchase Manager)

## Context
We are implementing the **Purchase Manager Workflow Enhancement** for ISF Playground. This sprint focuses on the **Backend Foundation** and **Core Workflow**.

## 📂 Key Artifacts (Read These First!)
1.  **PRD:** `_bmad-output/sprint-5-purchase-manager/prd-purchase-manager-workflow.md` (Workflow logic, 4-step status, Strict Admin rules).
2.  **Architecture:** `_bmad-output/architecture.md` (Extension pattern, `Vendor` schema, State Machine).
3.  **Epics:** `_bmad-output/sprint-5-purchase-manager/epics.md` (Detailed Acceptance Criteria).
4.  **Sprint Plan:** `_bmad-output/sprint-5-purchase-manager/sprint-plan.md` (Execution order).

## 🎯 Immediate Task: Story 1.1 - Vendor Data Model
**Goal:** Create the `Vendor` collection and CRUD API to support the new "Strict Introduction" policy.

**Requirements:**
*   **Model:** `backend/models/vendor.js` (Name, Phone, Address, Active Status).
*   **Controller:** `backend/controllers/vendorController.js` (CRUD).
*   **Routes:** `backend/routes/v2/vendor.js` (Protected by Admin middleware).
*   **Validation:** Ensure strict RBAC (only Admins can hit these endpoints).

**Note:** Do not create the UI yet. Focus on the API foundation.

## ⚠️ Critical Rules (Project Context)
*   **No Free Text:** Vendors must be relational entities, not strings.
*   **Strict RBAC:** Use `req.user.role === 'admin'` checks.
*   **Atomic Transactions:** Use MongoDB sessions if modifying sensitive data (though less critical for simple Vendor CRUD).

**Good luck! 🚀**

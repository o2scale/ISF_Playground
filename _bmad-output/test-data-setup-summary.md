# Test Data Setup - Quick Summary

**Status:** Ready to Begin  
**Estimated Time:** 20-30 minutes  
**Purpose:** Create test data for Sprint 5 Stories (2.6, 3.5, 3.6, 3.8, 3.9, 3.10)

---

## What You Need to Do

Follow this simple process to create all required test data:

### 🎯 Quick Overview

1. **Create 5 PENDING requests** (as Coach and Medical users)
2. **Create 3 REPAIR requests** (as Admin) ⭐ Critical for Story 2.6
3. **Process to ORDERED** (as Purchase Manager)
4. **Test Repair Technician feature** (Story 2.6) ⭐
5. **Create DELIVERED states** (as PM and Coach)

---

## 📚 Documents Created for You

### 1. Detailed Step-by-Step Guide
**File:** `_bmad-output/test-data-setup-manual-guide.md`
- Complete instructions for each phase
- Exact values to enter (product names, quantities, priorities)
- Expected behaviors and verification steps
- Troubleshooting tips

### 2. Progress Checklist
**File:** `_bmad-output/test-data-setup-checklist.md`
- Checkbox tracking for each step
- Time estimates per phase
- Issue tracker
- Final verification checklist

### 3. Credentials Reference
```
Admin: tony.loui.thomas@gmail.com / 5322148
Medical: medin@gmail.com / password123
Coach: coach@gmail.com / password123
Purchase Manager: purchase@gmail.com / password123
```

---

## ⭐ Critical: Story 2.6 Testing

**The main goal is to test the Repair Technician feature:**

When you mark a **Repairs** category request as **DELIVERED_STORE**:
- ✅ Should see prompt for "Repair Technician Name"
- ✅ Enter a name (e.g., "John Smith")
- ✅ Name should be saved and visible after refresh

When you mark a **non-repair** request as **DELIVERED_STORE**:
- ✅ Should NOT see technician prompt

This validates **TC-2.6.1, TC-2.6.2, TC-2.6.3** from the test case document.

---

## 🚀 Getting Started

### Option 1: Follow the Detailed Guide
Open `_bmad-output/test-data-setup-manual-guide.md` and follow Phase 1 through Phase 7.

### Option 2: Use the Checklist
Open `_bmad-output/test-data-setup-checklist.md` and check off items as you complete them.

### Option 3: Quick Reference
Use this summary and reference the other documents as needed.

---

## 📊 Expected Results

After completing setup, you will have:

- **5 PENDING requests** (ISF Shop category)
  - 3 for "Paracetamol 500mg" (tests bunched view - Story 3.5)
  - 1 HIGH priority (tests priority display - Story 3.5)
  - From Coach and Medical users (tests filter - Story 3.8)

- **3 REPAIR requests** (Repairs category)
  - Tests Story 2.6 repair technician feature ⭐

- **3 ORDERED requests** (mixed categories)
  - Tests Status Tabs - Story 3.6

- **2 DELIVERED_STORE requests**
  - At least 1 with repair technician name

- **2 DELIVERED_BALAGRUHA requests**
  - Tests full delivery workflow

---

## 🎯 Next Steps After Setup

Once test data is created:

1. **Run P0 Critical Tests** (45-50 minutes)
   - Document: `docs/qa/E2E-SPRINT5-PM-CORRECTIONS-TESTCASES.md`
   - Focus on 8 P0 tests (ship blockers)
   - TC-2.6.1, TC-2.6.3, TC-2.6.8 for repair technician

2. **Take Screenshots**
   - Repair technician prompt
   - Saved technician name
   - Badge counts (Story 3.9)
   - Bunched view (Story 3.5)

3. **Document Results**
   - Use test case checkboxes
   - Log any defects found
   - Note any deviations from expected behavior

---

## ❓ Need Help?

- **Can't find navigation?** Check the guide's troubleshooting section
- **Repairs category missing?** May need to seed categories in database
- **Technician prompt not showing?** Check Story 2.6 implementation status
- **Other issues?** Document in the checklist's "Issues Encountered" section

---

**Created by:** TEA Agent (Murat)  
**Date:** January 6, 2026  
**Related Documents:**
- Test Cases: `docs/qa/E2E-SPRINT5-PM-CORRECTIONS-TESTCASES.md`
- Test Review: `_bmad-output/test-review-E2E-SPRINT5-PM-CORRECTIONS.md`
- Enhancement Summary: `_bmad-output/test-enhancement-summary.md`

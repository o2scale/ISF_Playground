# Test Data Setup - Progress Tracker

**Date Started:** January 6, 2026  
**Target Completion:** Before running P0 tests  
**Estimated Time:** 20-30 minutes  

---

## Setup Progress

### Phase 1: PENDING Requests (Coach) ⏱️ 5-7 min

- [ ] Login as Coach (`coach@gmail.com` / `password123`)
- [ ] Create Request #1: Paracetamol 500mg (Qty: 10, Priority: Medium)
- [ ] Create Request #2: Paracetamol 500mg (Qty: 5, Priority: High) ⭐
- [ ] Logout
- [ ] **Status:** ⬜ Not Started / 🔄 In Progress / ✅ Complete

---

### Phase 2: PENDING Requests (Medical) ⏱️ 5-7 min

- [ ] Login as Medical In Charge (`medin@gmail.com` / `password123`)
- [ ] Create Request #3: Bandages (Qty: 20, Priority: Medium)
- [ ] Create Request #4: Paracetamol 500mg (Qty: 15, Priority: Medium)
- [ ] Logout
- [ ] **Status:** ⬜ Not Started / 🔄 In Progress / ✅ Complete

---

### Phase 3: PENDING Requests (Admin) ⏱️ 2-3 min

- [ ] Login as Admin (`tony.loui.thomas@gmail.com` / `5322148`)
- [ ] Create Request #5: Notebooks (Qty: 50, Priority: Low)
- [ ] **Status:** ⬜ Not Started / 🔄 In Progress / ✅ Complete

---

### Phase 4: REPAIR Requests ⭐ CRITICAL ⏱️ 5 min

- [ ] Still logged in as Admin
- [ ] Create REPAIR #1: Broken Chair Repair (Qty: 1, Priority: High, Category: Repairs)
- [ ] Create REPAIR #2: Desk Repair (Qty: 1, Priority: Medium, Category: Repairs)
- [ ] Create REPAIR #3: Window Frame Repair (Qty: 1, Priority: Low, Category: Repairs)
- [ ] Logout
- [ ] **Status:** ⬜ Not Started / 🔄 In Progress / ✅ Complete

---

### Phase 5: Process to ORDERED (Purchase Manager) ⏱️ 10-15 min

- [ ] Login as Purchase Manager (`purchase@gmail.com` / `password123`)
- [ ] Navigate to Purchase Management Dashboard
- [ ] Mark "Broken Chair Repair" → ORDERED
- [ ] Mark "Desk Repair" → ORDERED
- [ ] Mark "Window Frame Repair" → ORDERED
- [ ] Mark 1 ISF Shop request → ORDERED (e.g., Notebooks)
- [ ] Create/Mark 1 Medicines request → ORDERED
- [ ] **Status:** ⬜ Not Started / 🔄 In Progress / ✅ Complete

---

### Phase 6: Test Story 2.6 - Repair Technician ⭐ CRITICAL ⏱️ 5 min

- [ ] Still logged in as Purchase Manager
- [ ] Mark "Broken Chair Repair" → DELIVERED_STORE
- [ ] ✅ VERIFY: Technician prompt appears (TC-2.6.1)
- [ ] Enter technician name: "John Smith"
- [ ] Submit and refresh page
- [ ] ✅ VERIFY: "John Smith" is displayed (TC-2.6.3)
- [ ] **Screenshot taken:** [ ] Yes / [ ] No
- [ ] Mark 1 non-repair (ISF Shop) → DELIVERED_STORE
- [ ] ✅ VERIFY: NO technician prompt (TC-2.6.2)
- [ ] Mark 1 more request → DELIVERED_STORE
- [ ] **Status:** ⬜ Not Started / 🔄 In Progress / ✅ Complete

---

### Phase 7: DELIVERED_BALAGRUHA (Coach) ⏱️ 3-5 min

- [ ] Logout and login as Coach
- [ ] Navigate to Coach Deliveries
- [ ] Mark 2 DELIVERED_STORE requests → DELIVERED_BALAGRUHA
- [ ] Complete delivery process
- [ ] **Status:** ⬜ Not Started / 🔄 In Progress / ✅ Complete

---

## Final Verification

### Data Inventory Check

**PENDING Requests (5 total):**
- [ ] "Paracetamol 500mg" - Coach (Qty: 10, Medium priority)
- [ ] "Paracetamol 500mg" - Coach (Qty: 5, HIGH priority) ⭐
- [ ] "Bandages" - Medical (Qty: 20, Medium priority)
- [ ] "Paracetamol 500mg" - Medical (Qty: 15, Medium priority)
- [ ] "Notebooks" - Admin (Qty: 50, Low priority)

**ORDERED Requests (3 total):**
- [ ] 1 with category "Repairs" (any repair item)
- [ ] 1 with category "Medicines"
- [ ] 1 with category "ISF Shop"

**DELIVERED_STORE Requests (2 total):**
- [ ] At least 1 repair item with technician name "John Smith"
- [ ] At least 1 other item

**DELIVERED_BALAGRUHA Requests (2 total):**
- [ ] 2 fully completed deliveries

---

## Story 2.6 Test Evidence

- [ ] Screenshot: Technician prompt appears for Repairs
- [ ] Screenshot: Technician name saved and displayed
- [ ] Screenshot: No technician prompt for non-repairs
- [ ] DevTools Network tab: API validation captured

---

## Issues Encountered

**Issue #1:**
- Problem: 
- Solution: 
- Status: 

**Issue #2:**
- Problem: 
- Solution: 
- Status: 

---

## Overall Status

- **Started at:** __________
- **Completed at:** __________
- **Total Time:** __________
- **Ready for P0 Testing:** [ ] Yes / [ ] No

---

**Next Action:** Run P0 Critical Tests (8 tests, 45-50 minutes)  
**Test Document:** `docs/qa/E2E-SPRINT5-PM-CORRECTIONS-TESTCASES.md`  

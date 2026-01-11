# Test Data Setup Guide - Sprint 5 Stories
## Manual Browser-Based Setup

**Date:** January 6, 2026  
**Purpose:** Create test data for Stories 2.6, 3.5, 3.6, 3.8, 3.9, 3.10  
**Time Required:** ~20-30 minutes  

---

## Credentials Reference

```
Admin:
  Email: tony.loui.thomas@gmail.com
  Password: 5322148

Medical In Charge:
  Email: medin@gmail.com
  Password: password123

Coach:
  Email: coach@gmail.com
  Password: password123

Purchase Manager:
  Email: purchase@gmail.com
  Password: password123
```

---

## Test Data Requirements

From `docs/qa/E2E-SPRINT5-PM-CORRECTIONS-TESTCASES.md`:

### Required Purchase Requests:

1. **5 PENDING requests** (ISF Shop category)
   - At least 2 from Coach user
   - At least 2 from Medical In Charge user
   - At least 1 with HIGH priority
   - Include same product across multiple requests (e.g., "Paracetamol 500mg")

2. **3 ORDERED requests** (mixed categories)
   - 1 with category "Repairs" ⭐ **CRITICAL for Story 2.6**
   - 1 with category "Medicines"
   - 1 with category "ISF Shop"

3. **2 DELIVERED_STORE requests**
   - Ready for Coach to mark as delivered to Balagruha

4. **2 DELIVERED_BALAGRUHA requests**
   - Already fully delivered

---

## Setup Procedure

### Phase 1: Create PENDING Requests (Coach)

**Time:** 5-7 minutes

1. **Login as Coach**
   - Navigate to: http://localhost:3000
   - Click "User Login"
   - Email: `coach@gmail.com`
   - Password: `password123`

2. **Create Request #1** (for bunched view testing)
   - Navigate to Purchase Requests / Create Request
   - Category: `ISF Shop`
   - Product: `Paracetamol 500mg`
   - Quantity: `10`
   - Priority: `Medium`
   - Notes: `Test data for Story 3.5 - Bunched View`
   - Click Submit

3. **Create Request #2** (HIGH priority, same product)
   - Category: `ISF Shop`
   - Product: `Paracetamol 500mg`
   - Quantity: `5`
   - Priority: `High` ⭐
   - Notes: `Test data - HIGH priority bunched view`
   - Click Submit

4. **Logout**

---

### Phase 2: Create PENDING Requests (Medical In Charge)

**Time:** 5-7 minutes

1. **Login as Medical In Charge**
   - Email: `medin@gmail.com`
   - Password: `password123`

2. **Create Request #3**
   - Category: `ISF Shop`
   - Product: `Bandages`
   - Quantity: `20`
   - Priority: `Medium`
   - Notes: `Test data for Story 3.8 - Filter test`
   - Click Submit

3. **Create Request #4** (bunched with coach's requests)
   - Category: `ISF Shop`
   - Product: `Paracetamol 500mg` (same as coach's)
   - Quantity: `15`
   - Priority: `Medium`
   - Notes: `Test data - Same product different user`
   - Click Submit

4. **Logout**

---

### Phase 3: Create Additional PENDING Request (Admin)

**Time:** 2-3 minutes

1. **Login as Admin**
   - Email: `tony.loui.thomas@gmail.com`
   - Password: `5322148`

2. **Create Request #5**
   - Category: `ISF Shop`
   - Product: `Notebooks`
   - Quantity: `50`
   - Priority: `Low`
   - Notes: `Test data - General testing`
   - Click Submit

3. **Stay logged in for next phase**

---

### Phase 4: Create REPAIR Requests ⭐ CRITICAL

**Time:** 5 minutes  
**Purpose:** Story 2.6 - Repair Technician & Delivery Tracking

1. **Still logged in as Admin** (or re-login if needed)

2. **Create REPAIR Request #1**
   - Category: `Repairs` ⭐
   - Product: `Broken Chair Repair`
   - Quantity: `1`
   - Priority: `High`
   - Notes: `Test data for Story 2.6 - Repair technician test`
   - Click Submit

3. **Create REPAIR Request #2**
   - Category: `Repairs` ⭐
   - Product: `Desk Repair`
   - Quantity: `1`
   - Priority: `Medium`
   - Notes: `Test data for Story 2.6`
   - Click Submit

4. **Create REPAIR Request #3**
   - Category: `Repairs` ⭐
   - Product: `Window Frame Repair`
   - Quantity: `1`
   - Priority: `Low`
   - Notes: `Test data for Story 2.6`
   - Click Submit

5. **Logout**

---

### Phase 5: Process Requests (Purchase Manager)

**Time:** 10-15 minutes  
**Purpose:** Create ORDERED and DELIVERED_STORE states

1. **Login as Purchase Manager**
   - Email: `purchase@gmail.com`
   - Password: `password123`

2. **Navigate to Purchase Management Dashboard**
   - You should see all the requests created above

3. **Mark REPAIR requests as ORDERED**
   - Find "Broken Chair Repair" request
   - Change status to: `ORDERED`
   - Repeat for "Desk Repair" and "Window Frame Repair"

4. **Mark 1 non-repair request as ORDERED**
   - Select 1 ISF Shop request (e.g., "Notebooks")
   - Change status to: `ORDERED`

5. **Create MEDICINES request and mark as ORDERED**
   - If you can create requests as PM, create 1 Medicines request
   - Otherwise, use Admin to create it, then mark as ORDERED

---

### Phase 6: Test Story 2.6 - Repair Technician ⭐ CRITICAL

**Time:** 5 minutes  
**Purpose:** Validate repair technician prompt feature

1. **Still logged in as Purchase Manager**

2. **Mark REPAIR request as DELIVERED_STORE**
   - Find "Broken Chair Repair" (currently ORDERED)
   - Change status to: `DELIVERED_STORE`
   - **🔍 OBSERVE:** Should see prompt for "Repair Technician Name" ✅
   - Enter: `John Smith`
   - Click Submit

3. **Verify technician name saved** (TC-2.6.3)
   - Refresh page
   - Find the same request
   - Check if "John Smith" is displayed
   - **Screenshot this for test evidence**

4. **Test non-repair item (TC-2.6.2)**
   - Find a non-repair request (e.g., "Notebooks")
   - Change status to: `DELIVERED_STORE`
   - **🔍 OBSERVE:** Should NOT see repair technician prompt ✅

5. **Mark 1 more request as DELIVERED_STORE**
   - Select any ORDERED request
   - Change to: `DELIVERED_STORE`

---

### Phase 7: Create DELIVERED_BALAGRUHA (Coach)

**Time:** 3-5 minutes

1. **Logout and Login as Coach**
   - Email: `coach@gmail.com`
   - Password: `password123`

2. **Navigate to Deliveries / Coach Deliveries**

3. **Mark 2 requests as DELIVERED_BALAGRUHA**
   - Find requests in DELIVERED_STORE status
   - Mark as delivered to Balagruha
   - Complete delivery process

---

## Verification Checklist

After setup, verify you have:

- [ ] **5 PENDING requests** (ISF Shop)
  - [ ] At least 3 for "Paracetamol 500mg" (bunched view test)
  - [ ] At least 1 HIGH priority
  - [ ] 2 from Coach, 2 from Medical

- [ ] **3 REPAIR requests created** (Story 2.6)
  - [ ] All marked as ORDERED
  - [ ] At least 1 marked as DELIVERED_STORE with technician name

- [ ] **3 ORDERED requests** (mixed categories)
  - [ ] 1 Repairs (if not yet DELIVERED_STORE)
  - [ ] 1 Medicines
  - [ ] 1 ISF Shop

- [ ] **2 DELIVERED_STORE requests**

- [ ] **2 DELIVERED_BALAGRUHA requests**

---

## Story 2.6 Test Cases - Quick Reference

### TC-2.6.1: Repair Technician Prompt ✅
**Expected:** When marking Repairs as DELIVERED_STORE, see prompt for technician name

### TC-2.6.2: Non-Repair No Prompt ✅
**Expected:** Non-repair items don't show technician prompt

### TC-2.6.3: Technician Name Saved ✅
**Expected:** Technician name persists after refresh

### TC-2.6.8: Backend API Validation ✅
**Expected:** API returns 400 if technician name missing (check DevTools Network tab)

---

## Troubleshooting

### Issue: Can't find "Create Request" button
**Solution:** Check user role permissions. Admin/Coach/Medical should be able to create requests.

### Issue: "Repairs" category not in dropdown
**Solution:** Check backend database - categories should be pre-seeded. May need to add via admin panel.

### Issue: Can't change request status
**Solution:** Only Purchase Manager can change status to ORDERED/DELIVERED_STORE.

### Issue: Technician prompt not appearing
**Solution:** 
1. Check browser console for errors
2. Verify category is exactly "Repairs"
3. Check Story 2.6 implementation status
4. Test with DevTools Network tab open

---

## Next Steps After Setup

Once test data is created:

1. **Run P0 Critical Tests** (45-50 min)
   - Execute 8 P0 tests from test case document
   - Focus on Story 2.6 repair technician tests

2. **Take Screenshots**
   - Document technician prompt appearing
   - Show saved technician name
   - Capture API validation errors (DevTools)

3. **Log Defects**
   - Use defect template from test case document
   - Include priority context (P0/P1/P2/P3)

---

**Created by:** TEA Agent (Murat - Master Test Architect)  
**Document:** test-data-setup-manual-guide.md  
**Related:** docs/qa/E2E-SPRINT5-PM-CORRECTIONS-TESTCASES.md  

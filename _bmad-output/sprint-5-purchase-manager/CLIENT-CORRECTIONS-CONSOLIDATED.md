# Sprint 5 Purchase Manager - Client Corrections Consolidated

**Document Created:** January 5, 2026  
**Based On:** 
- `c1`, `c2`, `c3` correction files
- `Playground Purchase Manager Feedback for Tony 2nd _260102_123416.pdf`
- Additional WhatsApp comments from client

---

## 🔴 CRITICAL ISSUES FROM LATEST FEEDBACK (Jan 2, 2026)

### PDF Feedback Summary

| # | Issue | Priority | Status |
|---|-------|----------|--------|
| 1 | **Whole Dashboard is pending** - Major UI rework needed | 🔴 CRITICAL | ❌ NOT DONE |
| 2 | **Missing 5 Title Bar Items** - Only 3 of 8 categories added (ISF Shop, Repairs, ?). Missing: Medicines, Consumables, Infra, Others | 🔴 CRITICAL | ❌ NOT DONE |
| 3 | **Missing 8 Status Tabs** - Need: Purchase Request, Ongoing Orders, Reached ISF Store, Delivered, Present Stock, Supplier List, Present Stock, Most Consumed | 🔴 HIGH | ❌ PARTIAL |
| 4 | **Missing 4 Filters** - Need: Priority, Balagruha, Coach, Duration | 🟡 MEDIUM | ❓ PARTIAL |
| 5 | **Remove "Tasks" from Purchase Officer View** | 🟡 MEDIUM | ❌ NOT DONE |
| 6 | **Remove Old Dashboard Elements** - Remove: Active repairs, Pending orders, Completed this week, Total expenditure | 🟡 MEDIUM | ❌ NOT DONE |
| 7 | **Request ID too long** - Reduce from 25 digits to 5 digits | 🟢 LOW | ❌ NOT DONE |
| 8 | **Add Repair Technician Name** - For repair items, capture technician name | 🟡 MEDIUM | ❌ NOT DONE |
| 9 | **Add "Delivered to Balagruha by Coach"** - Capture which coach delivered | 🟡 MEDIUM | ❌ NOT DONE |

### WhatsApp Comments (Jan 2, 2026)

| # | Comment | Priority |
|---|---------|----------|
| 1 | "Repair and Shop come within the title of Purchase" - Categories need better organization | 🟡 MEDIUM |
| 2 | "Date of request should come AFTER item number, not at the end" - Column reordering needed | 🟡 MEDIUM |

---

## 📋 COMPLETE CORRECTIONS LIST (All Feedback Combined)

### Category A: Dashboard Structure

| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| A1 | **7 Title Bar Category Tabs** (not just 3): ISF Shop, Medicines, Consumables, Repairs, Infra, Others, ALL | PDF | ❌ |
| A2 | **8 Status/View Tabs**: Purchase Request, Ongoing Orders, Reached ISF Store, Delivered, Present Stock, Supplier List, Present Stock, Most Consumed | PDF | ❌ |
| A3 | **4 Filter Dropdowns**: Priority, Balagruha, Coach, Duration | PDF | ❓ Partial |
| A4 | Remove "Tasks" label from Purchase Officer View | PDF | ❌ |
| A5 | Remove old dashboard stats (Active repairs, Pending orders, etc.) | PDF | ❌ |
| A6 | PM Dashboard should show pending work at a glance | c3 | ❓ Partial |
| A7 | Badge in taskbar showing number of pending tasks | c3 | ❌ |

### Category B: Request List Display

| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| B1 | **Shorten Request ID** from 25 chars to 5 chars | PDF | ❌ |
| B2 | **Date of Request** column should be AFTER Item Number, not at end | WhatsApp | ❌ |
| B3 | **Bunched/Grouped View** - Same items across requests grouped together with totals | c3 | ❌ |
| B4 | Show Priority badge (High/Medium/Low) | c3 | ✅ Done |
| B5 | Sort by Priority first by default | c3 | ❓ Unknown |

### Category C: Repair-Specific Fields

| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| C1 | Add **Repair Technician Name** field | PDF | ❌ |
| C2 | Add **"Delivered to Balagruha by _____ Coach"** tracking | PDF | ❌ |

### Category D: 6 Purchase Categories

| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| D1 | 6 Categories: ISF Shop, Medicines, Repairs, Consumables, Infra, Others | c3 | ✅ Done |
| D2 | Separate requests per category (can't mix categories) | c3 | ✅ Done |
| D3 | Category-filtered item dropdown | c3 | ❓ Partial |

### Category E: 4-Step Workflow

| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| E1 | Step 1: Purchase Request (by Coach/Staff) | c1 | ✅ Done |
| E2 | Step 2: Order Placed (by PM) | c1 | ✅ Done |
| E3 | Step 3: Delivered to Store (by PM) | c1 | ✅ Done |
| E4 | Step 4: Delivered to Balagruha (by Coach) | c1 | ✅ Done |
| E5 | **In-Stock Shortcut**: If item in stock, skip steps 2&3 | c2 | ✅ Done |

### Category F: Role-Based Access

| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| F1 | Purchase request by: Coach, Medical, Sports, Music, Admin, PM (NOT children/Balagruha-in-charge) | c2 | ✅ Done |
| F2 | Vendor CRUD: Admin only | c1 | ✅ Done |
| F3 | New Item creation: Admin only | c1, c3 | ✅ Done |
| F4 | Coaches see: Their requests + Available stock + Child digital orders | c2 | ❓ Partial |

### Category G: Pricing & Vendors

| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| G1 | **Max Price** in Rupees (procurement limit) | c2 | ✅ Done |
| G2 | **Selling Price** in Coins (ISF shop price) | c2 | ✅ Done |
| G3 | 3 Vendors per item (ranked) | c1 | ✅ Done |

### Category H: PM Scorecard & Performance

| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| H1 | PM Scorecard tracking completed tasks | c2 | ✅ Done (basic) |
| H2 | Stock Reconciliation (PM can edit physical vs digital stock) | c2 | ✅ Done |

---

## 🎯 PRIORITY ACTION ITEMS

### 🔴 P0 - Must Fix Immediately

1. **Add Missing Category Tabs** (A1)
   - Currently: ISF Shop, Repairs only
   - Need: Medicines, Consumables, Infra, Others

2. **Add Missing Status Tabs** (A2)
   - Currently: 4 tabs
   - Need: 8 tabs including Present Stock, Supplier List, Most Consumed

3. **Shorten Request ID** (B1)
   - Currently: 25 char MongoDB ObjectId
   - Need: 5 digit human-readable ID (e.g., PR-00001)

4. **Reorder Columns** (B2)
   - Move "Date of Request" to be right after "Item Number"

### 🟡 P1 - High Priority

5. **Implement Bunched View** (B3)
   - Group same items across requests
   - Show total quantities

6. **Add Missing Filters** (A3)
   - Priority filter
   - Duration filter (if missing)

7. **Remove Old Dashboard Elements** (A5, A4)
   - Remove Task label
   - Remove Active repairs stat card
   - Remove Pending orders stat card

### 🟢 P2 - Medium Priority

8. **Repair Technician Name** (C1)
9. **Delivered by Coach tracking** (C2)
10. **PM Navigation Badge** (A7)

---

## 📊 Current vs Required Dashboard Comparison

### CURRENT STATE
```
┌─────────────────────────────────────────────────────────────────────┐
│ Purchase Manager > ISF Shop                                        │
├─────────────────────────────────────────────────────────────────────┤
│ [All Categories] [ISF Shop] [Medicines?] [Consumables?] [...]      │
├─────────────────────────────────────────────────────────────────────┤
│ [Purchase Requests] [On Going Order] [Reached Store] [Delivered]   │
├─────────────────────────────────────────────────────────────────────┤
│ Status: [All ▼]  Balagruha: [All ▼]  Category: [All ▼]            │
├─────────────────────────────────────────────────────────────────────┤
│ Request ID (25 chars) | Products | Reason | Status | Date          │
└─────────────────────────────────────────────────────────────────────┘
```

### REQUIRED STATE (Per Client Feedback)
```
┌─────────────────────────────────────────────────────────────────────┐
│ Purchase Manager Dashboard                        [Pending: 12] 🔔 │
├─────────────────────────────────────────────────────────────────────┤
│ CATEGORY TABS (7):                                                  │
│ [ALL] [ISF Shop] [Medicines] [Consumables] [Repairs] [Infra] [Others]│
├─────────────────────────────────────────────────────────────────────┤
│ STATUS TABS (8):                                                    │
│ [Purchase Requests] [Ongoing Orders] [Reached ISF Store] [Delivered]│
│ [Present Stock] [Supplier List] [Most Consumed] [?]                 │
├─────────────────────────────────────────────────────────────────────┤
│ FILTERS (4):                                                        │
│ Priority: [All ▼]  Balagruha: [All ▼]  Coach: [All ▼]  Duration: [All ▼]│
├─────────────────────────────────────────────────────────────────────┤
│ VIEW TOGGLE: [List View] [Bunched View]                             │
├─────────────────────────────────────────────────────────────────────┤
│ ID    | Date    | Item          | Qty | Priority | Balagruha | Coach│
│ PR-001| 05/01/26| Paracetamol   | 50  | 🔴 High  | Shanti    | Ramesh│
│ PR-002| 04/01/26| Socks         | 25  | 🟡 Med   | Prem      | Anita │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Files That Need Changes

### Backend

| File | Changes Needed |
|------|----------------|
| `backend/models/purchaseRequest.js` | Add `shortId` field (5 digit), add `repairTechnicianName`, add `deliveredByCoachId` |
| `backend/controllers/purchaseRequestController.js` | Generate short IDs, add bunched view endpoint |
| `backend/routes/v2/shop.js` | Add routes for bunched view, supplier list, most consumed |

### Frontend

| File | Changes Needed |
|------|----------------|
| `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` | Add all 7 category tabs, add all 8 status tabs, reorder columns, add bunched view toggle |
| `frontend/src/components/purchaseManagement/PurchaseManagement.css` | Style new tabs and badges |
| Navigation component | Add pending task badge count |

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] A1: Add 7 category tabs
- [ ] A2: Add 8 status tabs  
- [ ] A3: Add 4 filter dropdowns
- [ ] A4: Remove "Tasks" label
- [ ] A5: Remove old dashboard stats
- [ ] A7: Add pending badge to navigation
- [ ] B1: Generate 5-digit short Request IDs
- [ ] B2: Reorder columns (Date after Item Number)
- [ ] B3: Implement Bunched View
- [ ] C1: Add Repair Technician Name field
- [ ] C2: Add Delivered by Coach tracking

---

**Document End**

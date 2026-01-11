# Story 3.10: Column Reorder & UI Cleanup

**Epic:** Epic 3: Operational Dashboards & Analytics  
**Story:** 3.10  
**Priority:** 🟢 P2 - Medium  
**Effort:** 0.5 day  
**Role:** Purchase Manager  

## User Story

As a Purchase Manager,  
I want the table columns in a logical order and old dashboard elements removed,  
So that the interface is clean and information is easy to scan.

## Client Requirements

### From WhatsApp (Jan 2, 2026)
> "In the detailed item list, we want the date of request after item number and not at the end."

### From PDF Feedback (Jan 2, 2026)
> "Please remove the Tasks from Purchase Officer View"
> "You have not removed old dashboard elements like Active repairs, Pending orders, Completed this week, Total expenditure"

---

## Acceptance Criteria

### AC1: Column Reorder
**Given** I am viewing the purchase requests table  
**When** I look at the columns  
**Then** they appear in this order:
1. Request ID (short)
2. **Date of Request** ← Moved from end
3. Item/Products
4. Quantity
5. Priority
6. Balagruha
7. Coach/Requester
8. Status
9. Actions

### AC2: Remove "Tasks" Label
**Given** I am on the Purchase Officer view  
**When** I view the page header  
**Then** I do NOT see "Tasks" anywhere  
**And** it says "Purchase Requests" or similar  

### AC3: Remove Old Dashboard Stats
**Given** I am on the PM dashboard  
**When** I view the page  
**Then** I do NOT see these stat cards:
- Active repairs
- Pending orders
- Completed this week
- Total expenditure

### AC4: Clean Header
**Given** I am on the PM dashboard  
**When** I view the page header  
**Then** I see a clean title like "Purchase Manager Dashboard"  
**And** NOT "ISF Shop" or confusing labels  

---

## Technical Design

### Column Order Change
```jsx
// ShopInventoryView.jsx - Update table columns

// BEFORE:
<thead>
  <tr>
    <th>Request ID</th>
    <th>Products</th>
    <th>Reason</th>
    <th>Status</th>
    <th>Date</th>  // At the end
  </tr>
</thead>

// AFTER:
<thead>
  <tr>
    <th>ID</th>
    <th>Date</th>       // Moved to position 2
    <th>Products</th>
    <th>Qty</th>
    <th>Priority</th>
    <th>Balagruha</th>
    <th>Requester</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>
```

### Remove Old Dashboard Elements
Search for and remove:
- Any stat cards showing "Active repairs", "Pending orders", etc.
- "Tasks" text/labels
- Old dashboard widgets

---

## Tasks/Subtasks

- [ ] **Task 1: Reorder table columns**
  - [ ] Move Date column to position 2 (after ID)
  - [ ] Ensure both header and body rows match
  - [ ] Update any column-related logic

- [ ] **Task 2: Remove "Tasks" label**
  - [ ] Search codebase for "Tasks" text in PM views
  - [ ] Replace with "Purchase Requests" or remove
  - [ ] Update page titles

- [ ] **Task 3: Remove old dashboard stats**
  - [ ] Find stat card components
  - [ ] Remove/hide: Active repairs, Pending orders, Completed this week, Total expenditure
  - [ ] Keep only relevant stats (PM Scorecard)

- [ ] **Task 4: Update page header**
  - [ ] Change header from "ISF Shop" to "Purchase Manager Dashboard"
  - [ ] Ensure breadcrumb is correct

---

## Files to Check/Update

| File | What to Look For |
|------|------------------|
| `ShopInventoryView.jsx` | Table columns, stat cards |
| `PurchaseManagement.jsx` | Page header, "Tasks" label |
| `PurchaseManagement.css` | Any task-related styles |
| Navigation/Sidebar | Menu item labels |

---

## Definition of Done

- [ ] Date column is in position 2
- [ ] "Tasks" label removed
- [ ] Old stat cards removed
- [ ] Page header says "Purchase Manager Dashboard"
- [ ] No visual regressions

## Status

**Status:** `completed`

**Completed:** Jan 5, 2026

### Implementation Notes:
- Changed header from "🛒 Shop Inventory Purchase Requests" to "📋 Purchase Requests"
- Reordered columns: Request ID → Date → Products → Qty → Priority → Balagruha → Requester → Status → Actions
- Removed redundant columns (Total Cost, Reason, Category, Deadline) from main table - info available in View modal
- Moved Balagruha from ID cell to its own column
- Renamed PM scorecard from "Completed Tasks" to "Delivered to Store"
- Reduced table from 12 columns to 9 (8 for non-admin)

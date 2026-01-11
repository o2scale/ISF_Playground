# Sprint 5: Purchase Manager Enhancements - Walkthrough Guide

**Version:** 1.0  
**Date:** January 7, 2026  
**Audience:** Client / Product Owner  
**Scope:** Stories 3.1 to 3.10 (Purchase Manager & Operational Dashboards)

---

## 1. Overview
This document outlines the changes delivered in Sprint 5, focusing on the new Purchase Manager (PM) Dashboard, Inventory Analytics, and Coach improvements. Follow the steps below to verify the functionality of each feature.

---

## 2. Purchase Manager Dashboard (Stories 3.1, 3.4, 3.10)

**Goal:** A clean, tab-driven interface for managing purchase requests efficiently.

### ✅ Verification Steps:
1.  **Login** as a Purchase Manager (e.g., `manage@isf.com`).
2.  **Navigate** to the **Purchase Requests** page (via Sidebar).
3.  **Check the Header:**
    *   Verify the title is **"Purchase Manager Dashboard"** (or "Purchase Requests").
    *   Confirm there are **NO** old widgets like "Active Repairs" or "Total Expenditure".
    *   Confirm the word "Tasks" is removed from the view.
4.  **Verify Column Order:**
    *   Check the main table columns.
    *   Order should be: **ID (`PR-XXXXX`)** → **Date** → **Products** → **Quantity** → ...
    *   *Note: Date is now the second column.*
5.  **Verify Tabs:**
    *   **Category Tabs:** Click items like **Medicines**, **Consumables**, **Repairs**. Confirm the list filters to show only those categories.
    *   **Status Tabs:** Click **Purchase Requests** (Pending) → **On Going Order** → **Reached ISF Store** → **Delivered**. Confirm the list updates to show the correct status.

---

## 3. Bunched View & Order All (Story 3.5)

**Goal:** Group requests for the same item to streamline ordering.

### ✅ Verification Steps:
1.  Go to the **Purchase Requests** (Status: *Pending*) tab.
2.  **Toggle View Mode:**
    *   Find the **"List / Bunched"** toggle (top right of table).
    *   Switch to **"Bunched"**.
3.  **Verify Grouping:**
    *   Confirm that requests for the same product (e.g., "A4 Paper") are grouped into a single row.
    *   The row should show **"Total Quantity: X"** (Sum of all requests).
4.  **Order All:**
    *   Click the **"Order All"** button on a grouped item row.
    *   Confirm that *all* individual requests in that group are moved to the **On Going Order** status.

---

## 4. Inventory Analytics (Story 3.6)

**Goal:** Real-time visibility into stock levels, supplier activity, and consumption.

### ✅ Verification Steps:
1.  Look for the **Analytics/Inventory Tabs** (usually to the right of status tabs).
2.  **Check "Present Stock":**
    *   Click the tab. Verify you see a list of items with badges:
        *   🟢 **In Stock**
        *   🟡 **Low Stock**
        *   🔴 **Out of Stock**
3.  **Check "Supplier List":**
    *   Click the tab. Verify you see a list of Vendors.
    *   Check the **"Products Supplied"** count for each vendor.
4.  **Check "Most Consumed":**
    *   Click the tab. Verify a ranked list of products based on consumption history.
    *   Try changing the time filter (e.g., "This Month").

---

## 5. Short Request IDs (Story 3.7)

**Goal:** Human-readable IDs (e.g., `PR-00123`) instead of long technical codes.

### ✅ Verification Steps:
1.  **View List:** Look at the **ID** column in any request table.
    *   Confirm IDs look like **`PR-XXXXX`** (e.g., `PR-00045`).
2.  **Search:**
    *   Type a 5-digit number (e.g., `00045`) into the search bar.
    *   Confirm the correct request is filtered.

---

## 6. Coach Features (Stories 3.2, 3.8)

**Goal:** Improved visibility for Coaches and easier filtering for PMs.

### ✅ Verification Steps:
1.  **Coach Dashboard (Story 3.2):**
    *   Login as a **Coach**.
    *   Navigate to **My Requests**.
    *   Verify you see *only* requests made by you.
    *   Check for the **"Digital Orders"** section/tab to see digital items status.
2.  **PM Coach Filter (Story 3.8):**
    *   Login as **Purchase Manager**.
    *   On the dashboard, find the **"Coach/Requester"** filter.
    *   Select a specific Coach.
    *   Confirm the list shows only requests from that Coach.

---

## 7. Navigation Badge (Story 3.9)

**Goal:** Alert PMs to pending work.

### ✅ Verification Steps:
1.  Login as **Purchase Manager**.
2.  Look at the **Sidebar** navigation.
3.  Check the **"Purchase Requests"** link.
4.  **Verify Badge:**
    *   If there are pending requests, you should see a **Red Badge** with the count (e.g., `(5)`).
    *   If there are High Priority requests, look for a visual indicator (e.g., `!`).

---

## 8. Admin Master Inventory Report (Story 3.3)

**Goal:** Admin-only view of total asset deployment.

### ✅ Verification Steps:
1.  Login as **Admin**.
2.  Navigate to **Inventory** (or specific Report link).
3.  **Verify Report:**
    *   Check for a table showing **"In Store"** vs **"Deployed"** columns.
    *   "In Store" = Current Stock.
    *   "Deployed" = Total quantity sent out to Balagruhas.
4.  **Verify Access Control:**
    *   Try to access this page as a *Coach*. You should be denied access.

---

## Summary of Stories Covered

| Story | Feature | Status |
| :--- | :--- | :--- |
| **3.1** | PM Dashboard Structure | ✅ Ready |
| **3.2** | Coach Dashboard | ✅ Ready |
| **3.3** | Admin Master Inventory | ✅ Ready |
| **3.4** | Tabs & Buckets | ✅ Ready |
| **3.5** | Bunched View | ✅ Ready |
| **3.6** | Analytics Tabs | ✅ Ready |
| **3.7** | Short IDs | ✅ Ready |
| **3.8** | Coach Filter | ✅ Ready |
| **3.9** | Navigation Badge | ✅ Ready |
| **3.10** | Column Cleanup | ✅ Ready |

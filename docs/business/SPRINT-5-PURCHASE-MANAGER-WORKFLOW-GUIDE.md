# Purchase Manager Workflow - Complete Business Guide
## Sprint 5: Stories 17, 18, 19

**Document Purpose:** Video Demo Script & Client Reference Guide
**Prepared For:** Tony (Business Head) & Client
**Last Updated:** 2025-10-30 16:01:25
**System Version:** Sprint 5 Release

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [What Problem Does This Solve?](#what-problem-does-this-solve)
3. [User Roles & Permissions](#user-roles--permissions)
4. [Complete Workflow Overview](#complete-workflow-overview)
5. [Story 17: Creating Purchase Requests](#story-17-creating-purchase-requests)
6. [Story 18: Admin Approval Process](#story-18-admin-approval-process)
7. [Story 19: Stock Updates & Completion](#story-19-stock-updates--completion)
8. [All Possible Scenarios](#all-possible-scenarios)
9. [Video Demo Script for Tony](#video-demo-script-for-tony)
10. [Client Quick Start Guide](#client-quick-start-guide)
11. [Troubleshooting & FAQs](#troubleshooting--faqs)

---

## Executive Summary

This system automates the **purchase request and inventory management workflow** for ISKON West Bengal's shop operations. It replaces manual processes with a digital system that:

- ✅ Allows Purchase Managers to create requests when stock runs low
- ✅ Provides Admins with oversight and approval controls
- ✅ Automatically updates inventory when purchases arrive
- ✅ Creates a complete audit trail for accountability
- ✅ Prevents errors like duplicate orders or unauthorized purchases

**Key Benefit:** From request to stock update in 3 simple steps with full transparency and control.

---

## What Problem Does This Solve?

### Before This System (Manual Process):

**Problems:**
1. ❌ Purchase Managers had to manually track low stock items
2. ❌ Paper-based or email approval requests were slow and hard to track
3. ❌ No visibility into pending requests or approval status
4. ❌ Manual stock updates led to errors (wrong quantities, duplicate entries)
5. ❌ No audit trail - difficult to know who approved what and when
6. ❌ Risk of unauthorized purchases without proper oversight

### After This System (Automated Process):

**Solutions:**
1. ✅ System shows which products need restocking automatically
2. ✅ Digital requests with status tracking (Pending → Approved → Completed)
3. ✅ Real-time visibility for both Purchase Managers and Admins
4. ✅ Automated stock updates with validation - no manual errors
5. ✅ Complete audit trail - every action is recorded with timestamp and user
6. ✅ Built-in approval workflow prevents unauthorized purchases

---

## User Roles & Permissions

### 👤 Purchase Manager (Example: Ravi)

**Email:** purchase@gmail.com
**Password:** password123

**What They Can Do:**
- ✅ View products that are running low on stock
- ✅ Create purchase requests for multiple products at once
- ✅ Add justification and estimated costs
- ✅ Attach supporting documents (invoices, quotes, etc.)
- ✅ View their own purchase requests
- ✅ Cancel pending requests (before approval)
- ✅ Update stock quantities when purchased items arrive
- ✅ View completion history

**What They CANNOT Do:**
- ❌ Approve their own requests
- ❌ View or manage other Purchase Managers' requests
- ❌ Delete requests after submission
- ❌ Update stock before Admin approval

---

### 👨‍💼 Admin (Example: Admin User)

**Email:** admin@gmail.com
**Password:** password123

**What They Can Do:**
- ✅ View ALL purchase requests from all Purchase Managers
- ✅ Approve purchase requests
- ✅ Reject purchase requests with reason
- ✅ View statistics (total pending, approved, rejected)
- ✅ Add comments during approval/rejection
- ✅ View complete audit trail

**What They CANNOT Do:**
- ❌ Create purchase requests themselves
- ❌ Update stock directly (only Purchase Managers can update)
- ❌ Approve their own requests (if they somehow create one)

**Security Rule:** A Purchase Manager who creates a request CANNOT approve it - prevents self-approval fraud.

---

## Complete Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    PURCHASE REQUEST LIFECYCLE                    │
└─────────────────────────────────────────────────────────────────┘

Step 1: CREATE REQUEST (Story 17)
┌─────────────────────┐
│ Purchase Manager    │ → Notices stock is low
│ (Ravi)              │ → Creates purchase request
└─────────────────────┘ → Adds products, quantities, justification
         │
         ▼
    [PENDING] ⏳


Step 2: ADMIN REVIEW (Story 18)
┌─────────────────────┐
│ Admin               │ → Reviews request details
│                     │ → Checks justification & costs
└─────────────────────┘ → Makes decision
         │
         ▼
    APPROVE ✅  or  REJECT ❌
         │              │
         ▼              ▼
   [APPROVED]      [REJECTED]
                   (End - Cannot proceed)


Step 3: STOCK UPDATE (Story 19)
┌─────────────────────┐
│ Purchase Manager    │ → Orders from supplier
│ (Ravi)              │ → Receives delivery
└─────────────────────┘ → Updates system with actual quantities
         │
         ▼
   [COMPLETED] ✅
   (Stock updated automatically)
```

---

## Story 17: Creating Purchase Requests

### Business Goal
Allow Purchase Managers to request inventory purchases for multiple products at once, with proper justification and cost estimates.

---

### Feature Highlights

#### 🎯 Multi-Product Requests
- Purchase Managers can add **multiple products** in a single request
- Example: Instead of creating 3 separate requests for Books, Pens, and Notebooks, create one request with all 3 items

#### 📎 File Attachments
- Attach up to **5 files** per request
- Useful for: supplier quotations, price comparisons, invoices
- Supported formats: PDF, images, documents

#### 💰 Cost Tracking
- Enter estimated costs for budget planning
- System calculates total automatically
- Helps Admin make informed decisions

---

### Step-by-Step: How to Create a Purchase Request

#### **STEP 1: Login as Purchase Manager**

1. Go to the login page
2. Click **"Admin Login"** (not Student Login)
3. Enter credentials:
   - Email: `purchase@gmail.com`
   - Password: `password123`
4. Click **"Login"**

**What You'll See:** Dashboard with sidebar menu

---

#### **STEP 2: Navigate to Purchase Requests**

1. Look at the left sidebar
2. Find **"Shop Inventory"** section
3. Click on **"Purchase Requests"**

**What You'll See:** A table showing all your purchase requests

**Table Columns:**
- Request ID (e.g., PR-001)
- Created Date
- Products (count)
- Status (Pending ⏳ / Approved ✅ / Rejected ❌ / Completed ✅)
- Estimated Total Cost
- Actions (👁️ View, 📦 Update Stock buttons)

---

#### **STEP 3: Check Low-Stock Products**

Before creating a request, see which products need restocking:

1. Look for products with **"Low Stock"** indicator
2. Note which items need ordering
3. Check current stock levels

**System Intelligence:** The system automatically flags products below their threshold (e.g., if threshold is 10 and stock is 5, it shows as low stock)

---

#### **STEP 4: Create New Request**

1. Click the **"+ Create New Request"** button (top-right corner)
2. A modal window opens: **"Create Purchase Request"**

**Modal Has 3 Sections:**
1. **Product Selection** (top)
2. **Request Details** (middle)
3. **Actions** (bottom)

---

#### **STEP 5: Add Products**

**Product Selection Section:**

1. Click the **"Select Product"** dropdown
2. **Only low-stock products** appear in the list
3. Choose a product (e.g., "Notebook - Ruled")
4. Enter **Quantity Needed** (e.g., 50)
5. Enter **Estimated Unit Cost** (e.g., 25.00)
6. System automatically calculates **Estimated Total** (50 × 25 = ₹1,250.00)

**To Add Multiple Products:**
1. Click **"+ Add Another Product"** button
2. Repeat the process for each product
3. The **Grand Total** updates automatically at the bottom

**To Remove a Product:**
- Click the **"Remove"** button (🗑️ icon) next to the product

---

#### **STEP 6: Fill Request Details**

**Justification (Required):**
- Explain why you need these items
- Example: *"Book sales increased by 40% this month. Current stock will run out in 3 days. Need to restock urgently to meet customer demand."*

**Priority (Optional):**
- Select: High / Medium / Low
- Default: Medium

**Expected Delivery Date (Optional):**
- Pick a date when you expect items to arrive
- Helps Admin understand urgency

**Additional Notes (Optional):**
- Any extra information
- Example: *"Preferred supplier: ABC Books Pvt Ltd"*

---

#### **STEP 7: Attach Supporting Documents**

1. Click **"Choose Files"** button
2. Select files from your computer (up to 5 files)
3. Supported formats: PDF, JPG, PNG, DOC, DOCX
4. File size limit: 10MB per file

**Best Practice:** Attach supplier quotations or price comparisons to help Admin make faster decisions.

---

#### **STEP 8: Review and Submit**

1. Review all entered information
2. Check the **Grand Total**
3. Click **"Submit Request"** button

**What Happens Next:**
- ✅ Success message appears: *"Purchase request created successfully"*
- 📧 Admin receives notification (optional email)
- 📊 Request appears in your list with status **"Pending ⏳"**
- 🔍 Admin can now review your request

---

### Scenarios for Story 17

#### ✅ **Happy Path: Successful Request Creation**

**Scenario:** Ravi needs to restock Notebooks and Pens

1. Login as purchase@gmail.com
2. Navigate to Purchase Requests
3. Click "Create New Request"
4. Add Product 1: Notebook - Ruled, Qty: 50, Unit Cost: ₹25.00
5. Add Product 2: Pen - Blue, Qty: 100, Unit Cost: ₹5.00
6. Justification: "Both items below 10 units. Need restock for next week's sales."
7. Priority: High
8. Attach: supplier-quote.pdf
9. Submit

**Result:** ✅ Request PR-005 created with status "Pending"

---

#### ❌ **Error Case: Missing Required Fields**

**Scenario:** User forgets to add justification

1. Add products
2. Leave justification empty
3. Click Submit

**Result:** ❌ Error message: *"Justification is required"*
**Action:** Fill justification and resubmit

---

#### ❌ **Error Case: No Products Added**

**Scenario:** User clicks Submit without adding any products

**Result:** ❌ Error message: *"Please add at least one product"*
**Action:** Add products and resubmit

---

#### ⚠️ **Edge Case: Only High-Stock Products Available**

**Scenario:** All products are well-stocked (none are low)

**What Happens:**
- The product dropdown shows *"No low-stock products available"*
- Cannot create a request (as there's nothing that needs ordering)

**Business Logic:** Prevents unnecessary purchase requests when inventory is sufficient.

---

#### ✅ **Success Case: View Own Requests**

**Scenario:** Ravi wants to check status of his requests

1. Login as purchase@gmail.com
2. Navigate to Purchase Requests
3. See table with all requests:
   - PR-005: Pending ⏳ (just created)
   - PR-003: Approved ✅ (waiting for stock update)
   - PR-002: Rejected ❌ (Admin didn't approve)
   - PR-001: Completed ✅ (finished)

**Actions Available:**
- 👁️ **View** button: See full details of any request
- 📦 **Update Stock** button: Only visible for Approved requests (Story 19)
- ❌ **Cancel** button: Only visible for Pending requests

---

#### ✅ **Success Case: Cancel Pending Request**

**Scenario:** Ravi accidentally created wrong request and wants to cancel

1. Find the Pending request in the table
2. Click **"Cancel"** button
3. Confirm cancellation in dialog

**Result:** ✅ Request status changes to "Cancelled"
**Note:** Cannot cancel Approved/Rejected/Completed requests

---

## Story 18: Admin Approval Process

### Business Goal
Provide Admins with oversight and control over purchase requests, ensuring budget compliance and preventing unauthorized purchases.

---

### Feature Highlights

#### 🔍 Centralized Review
- Admins see **ALL** purchase requests from all Purchase Managers
- Dashboard shows statistics: Total Pending, Approved, Rejected
- Filter by status, date, Purchase Manager

#### ✅ Approval Controls
- Approve requests to allow Purchase Manager to proceed
- Reject requests with mandatory reason
- Add comments for transparency

#### 🔒 Security Features
- **Self-approval prevention**: A Purchase Manager cannot approve their own request
- Complete audit trail: Who approved/rejected what and when
- Email notifications (optional)

---

### Step-by-Step: How to Review & Approve Requests

#### **STEP 1: Login as Admin**

1. Go to the login page
2. Click **"Admin Login"**
3. Enter credentials:
   - Email: `admin@gmail.com`
   - Password: `password123`
4. Click **"Login"**

**What You'll See:** Admin dashboard with sidebar menu

---

#### **STEP 2: Navigate to Purchase Requests**

1. Look at the left sidebar
2. Find **"Shop Inventory"** section
3. Click on **"Purchase Requests"**

**Admin View vs Purchase Manager View:**
- **Admin sees:** ALL requests from ALL Purchase Managers
- **Purchase Manager sees:** Only their own requests

---

#### **STEP 3: Review Dashboard Statistics**

**At the top of the page, you'll see:**

```
┌─────────────────┬─────────────────┬─────────────────┐
│ 📊 Total        │ ⏳ Pending      │ ✅ Approved     │
│    Requests: 12 │    Requests: 3  │    Requests: 6  │
└─────────────────┴─────────────────┴─────────────────┘
┌─────────────────┬─────────────────┬─────────────────┐
│ ❌ Rejected     │ ✅ Completed    │ 💰 Total Value  │
│    Requests: 1  │    Requests: 2  │    ₹45,000      │
└─────────────────┴─────────────────┴─────────────────┘
```

**Use This To:**
- Get a quick overview of pending work
- Track approval/rejection rates
- Monitor total spending

---

#### **STEP 4: View Request Details**

1. Find a **Pending** request in the table (look for ⏳ icon)
2. Click the **👁️ View** button

**A modal opens showing:**

**Section 1: Request Information**
- Request ID (e.g., PR-005)
- Created By (e.g., Purchase Manager - purchase@gmail.com)
- Created Date
- Status
- Priority (High/Medium/Low)

**Section 2: Products Requested**
- Table showing all products:
  - Product Name & SKU
  - Current Stock (live data)
  - Requested Quantity
  - Estimated Unit Cost
  - Estimated Total Cost
- **Grand Total** at the bottom

**Section 3: Request Details**
- Justification (why Purchase Manager needs this)
- Expected Delivery Date
- Additional Notes
- Attachments (clickable to download)

**Section 4: Admin Actions**
- ✅ **Approve** button (green)
- ❌ **Reject** button (red)
- Comment field (optional)

---

#### **STEP 5A: Approve Request**

**When to Approve:**
- Justification is valid and reasonable
- Budget is available
- Quantities are appropriate
- Costs seem fair

**How to Approve:**

1. Review all details carefully
2. (Optional) Add a comment
   - Example: *"Approved. Budget allocated from Q4 inventory fund."*
3. Click **"✅ Approve"** button
4. Confirm in the dialog box

**What Happens:**
- ✅ Success message: *"Purchase request approved successfully"*
- 📧 Purchase Manager receives notification
- 🔄 Request status changes to **"Approved ✅"**
- 📦 Purchase Manager can now proceed with ordering and stock update
- 📝 Audit log records: Who approved, when, and any comments

---

#### **STEP 5B: Reject Request**

**When to Reject:**
- Justification is weak or unclear
- Budget constraints
- Items not needed
- Quantities too high
- Costs too expensive

**How to Reject:**

1. Review the request
2. **Add rejection reason** (REQUIRED)
   - Example: *"Budget exhausted for this quarter. Request again in January 2026."*
   - Example: *"Quantities too high. Current stock sufficient for next 2 months."*
3. Click **"❌ Reject"** button
4. Confirm in the dialog box

**What Happens:**
- ✅ Success message: *"Purchase request rejected"*
- 📧 Purchase Manager receives notification with reason
- 🔄 Request status changes to **"Rejected ❌"**
- ❌ Purchase Manager CANNOT proceed with ordering
- 📝 Audit log records: Who rejected, when, and reason

**Important:** Rejection reason is visible to Purchase Manager so they understand why and can improve future requests.

---

### Scenarios for Story 18

#### ✅ **Happy Path: Approve Valid Request**

**Scenario:** Admin reviews PR-005 (Notebooks + Pens from Ravi)

1. Login as admin@gmail.com
2. Navigate to Purchase Requests
3. See PR-005 in Pending status
4. Click 👁️ View
5. Review:
   - Justification: "Both items below 10 units. Need restock for next week's sales."
   - Products: Notebook (50 units, ₹25), Pen (100 units, ₹5)
   - Total: ₹1,750
   - Attachment: supplier-quote.pdf ✅
6. Add comment: "Approved. Reasonable quantities and good pricing."
7. Click Approve
8. Confirm

**Result:** ✅ PR-005 status changes to "Approved". Ravi can now order and update stock.

---

#### ✅ **Happy Path: Reject Invalid Request**

**Scenario:** Admin reviews PR-006 (Excessive quantity request)

1. Login as admin@gmail.com
2. View PR-006
3. Review:
   - Products: Notebooks (500 units) - seems too high
   - Current stock: 8 units
   - Justification: "Need restock"
4. Decision: Quantity is excessive for a small shop
5. Add rejection reason: "Requested quantity (500) is too high. Current sales rate is 20 units/month. Please revise to 60 units (3 months supply)."
6. Click Reject
7. Confirm

**Result:** ❌ PR-006 status changes to "Rejected". Ravi receives feedback and can create a revised request.

---

#### 🔒 **Security Case: Self-Approval Prevention**

**Scenario:** A Purchase Manager tries to approve their own request

**Setup:**
- User has BOTH "Purchase Manager" and "Admin" roles
- They created PR-007 themselves
- They login and try to approve it

**What Happens:**
1. User views PR-007 (their own request)
2. Click Approve button
3. **System blocks the action**
4. Error message: *"You cannot approve your own purchase request. Another admin must review this."*

**Result:** ❌ Request remains "Pending". Another Admin must approve it.

**Business Logic:** Prevents fraud and ensures proper oversight.

---

#### ⚠️ **Edge Case: No Pending Requests**

**Scenario:** Admin logs in but all requests are already processed

**What They See:**
- Dashboard shows: "0 Pending Requests"
- Table shows only Approved/Rejected/Completed requests
- Message: *"No pending requests at this time"*

**Action:** Nothing to do. Check back later or wait for notifications.

---

#### ✅ **Success Case: Filter by Status**

**Scenario:** Admin wants to see only Rejected requests to analyze patterns

1. Navigate to Purchase Requests
2. Use **Status Filter** dropdown
3. Select "Rejected"
4. Table shows only rejected requests

**Use Case:** Analyze why requests are being rejected to train Purchase Managers.

---

#### ✅ **Success Case: View Approval History**

**Scenario:** Admin wants to see who approved a completed request

1. Find a Completed request (PR-001)
2. Click 👁️ View
3. Scroll to **"Approval Details"** section
4. See:
   - Approved By: Admin (admin@gmail.com)
   - Approved Date: 25-10-2025 14:30
   - Admin Comment: "Approved. Budget allocated from Q4 inventory fund."

**Use Case:** Audit trail for accountability and compliance.

---

## Story 19: Stock Updates & Completion

### Business Goal
Allow Purchase Managers to update inventory when purchased items arrive, with automatic stock calculations and complete audit trail.

---

### Feature Highlights

#### 📦 Automated Stock Updates
- Update stock for multiple products in one action
- System automatically calculates new stock levels
- Atomic transaction: All products update together or none update (no partial failures)

#### 📋 Purchase Details Capture
- Record actual supplier name
- Record invoice number for accounting
- Record purchase date for tracking
- Record actual costs paid (may differ from estimates)

#### 🔍 Audit Trail
- Every stock update creates an **Inventory Transaction** record
- Transaction includes: Who, What, When, How Much
- Complete history available for audits

#### 🔒 Idempotency Protection
- Cannot update stock twice for the same request
- System prevents duplicate entries
- Button disappears after completion

---

### Step-by-Step: How to Complete Purchase & Update Stock

#### **STEP 1: Purchase from Supplier (Outside System)**

**This happens in real life, not in the system:**

1. Ravi receives Admin approval for PR-005
2. Ravi contacts supplier (ABC Books Pvt Ltd)
3. Ravi orders: 50 Notebooks, 100 Pens
4. Supplier delivers the items
5. Ravi receives: Invoice #INV-2025-123, Date: 30-10-2025
6. Actual costs might differ from estimates

**Now it's time to update the system...**

---

#### **STEP 2: Navigate to Purchase Requests**

1. Login as purchase@gmail.com
2. Navigate to **"Purchase Requests"**
3. Look for **Approved** requests (✅ status)
4. Find PR-005 in the table

**You'll See:**
- Status: ✅ Approved
- Two buttons: 👁️ View | 📦 **Update Stock**

---

#### **STEP 3: Click "Update Stock" Button**

Click the **📦 Update Stock** button next to PR-005

**A modal opens: "Update Stock - PR-005"**

**The modal has 3 sections:**

---

#### **SECTION 1: Purchase Details (Top)**

Fill in the real-world purchase information:

**Supplier Name (Optional but recommended):**
- Enter: "ABC Books Pvt Ltd"
- Why: For record-keeping and future reference

**Invoice Number (Optional but recommended):**
- Enter: "INV-2025-123"
- Why: For accounting and audit purposes

**Purchase Date (Required):**
- Select: 30-10-2025
- Why: Track when purchase was made

---

#### **SECTION 2: Stock Update Table (Middle)**

This section shows all products in the request with **auto-filled default values**.

**Table Columns:**

| Product | Requested Qty | Received Qty | Unit Cost | Total Cost |
|---------|---------------|--------------|-----------|------------|
| Notebook - Ruled | 50 | **50** 🟢 | **₹25.00** 🟢 | ₹1,250.00 |
| Pen - Blue | 100 | **100** 🟢 | **₹5.00** 🟢 | ₹500.00 |
| **TOTALS** | | **150 units** | | **₹1,750.00** |

**Green fields (🟢) are editable** if actual values differ:

---

#### **Scenario A: Perfect Delivery (Default Values)**

If you received exactly what was requested at estimated costs:
- **Do nothing** - defaults are already correct
- Skip to Section 3 (Actions)

---

#### **Scenario B: Partial Delivery**

**Example:** Supplier only delivered 45 Notebooks (not 50)

**Action:**
1. Click on **"Received Qty"** field for Notebook
2. Change from 50 to **45**
3. System recalculates Total Cost: 45 × ₹25 = ₹1,125

**Why This Matters:**
- Stock will increase by 45 (not 50)
- Cost tracking will be accurate
- You can explain the discrepancy in notes

---

#### **Scenario C: Price Changed**

**Example:** Supplier charged ₹27 per Notebook (not ₹25)

**Action:**
1. Click on **"Unit Cost"** field for Notebook
2. Change from ₹25.00 to **₹27.00**
3. System recalculates Total Cost: 50 × ₹27 = ₹1,350

**Why This Matters:**
- Actual spending is recorded correctly
- Budget tracking is accurate
- Admin can see cost variations

---

#### **Scenario D: Both Quantity and Price Changed**

**Example:**
- Received 45 Notebooks (not 50)
- Paid ₹27 each (not ₹25)

**Action:**
1. Change Received Qty: 45
2. Change Unit Cost: ₹27.00
3. System recalculates: 45 × ₹27 = ₹1,215

---

#### **SECTION 3: Actions (Bottom)**

**Grand Total Display:**
- Shows sum of all products: **₹1,750.00** (updates as you edit)

**Buttons:**
- **"Complete Purchase Request"** (blue button)
- **"Cancel"** (gray button)

---

#### **STEP 4: Review and Complete**

1. **Double-check all information:**
   - Purchase details (supplier, invoice, date)
   - All product quantities received
   - All costs
   - Grand total

2. **Click "Complete Purchase Request"**

3. **Confirm in dialog box**

---

#### **STEP 5: What Happens Next (Automatic)**

The system performs these actions **automatically**:

**✅ Stock Update:**
- Notebook stock: 8 units → **53 units** (+45)
- Pen stock: 3 units → **103 units** (+100)
- Low stock warning removed (if stock is now above threshold)

**✅ Inventory Transactions Created:**
- Transaction #1 (Notebook):
  ```
  Type: Purchase Request
  Product: Notebook - Ruled
  Quantity: +45
  Previous Stock: 8
  New Stock: 53
  Performed By: Purchase Manager (Ravi)
  Date: 30-10-2025 16:15
  Reason: Purchase request PR-005 completed
  Notes: Supplier: ABC Books Pvt Ltd, Invoice: INV-2025-123
  ```

- Transaction #2 (Pen):
  ```
  Type: Purchase Request
  Product: Pen - Blue
  Quantity: +100
  Previous Stock: 3
  New Stock: 103
  Performed By: Purchase Manager (Ravi)
  Date: 30-10-2025 16:15
  Reason: Purchase request PR-005 completed
  Notes: Supplier: ABC Books Pvt Ltd, Invoice: INV-2025-123
  ```

**✅ Purchase Request Updated:**
- Status: Approved ✅ → **Completed ✅**
- Completed By: Purchase Manager (Ravi)
- Completed Date: 30-10-2025 16:15
- Actual Total Cost: ₹1,750.00
- Supplier: ABC Books Pvt Ltd
- Invoice: INV-2025-123
- Purchase Date: 30-10-2025

**✅ UI Changes:**
- Success message: *"Purchase request completed successfully. 2 product(s) updated."*
- Modal closes automatically
- Table refreshes
- PR-005 status shows **"Completed ✅"**
- 📦 **Update Stock button disappears** (can't update twice)
- Only 👁️ View button remains

---

#### **STEP 6: View Completion Details**

To see the complete record:

1. Click **👁️ View** on PR-005
2. Modal opens showing all sections

**New Sections Appear:**

**Section: Purchase & Stock Update Details**
- Supplier Name: ABC Books Pvt Ltd
- Invoice Number: INV-2025-123
- Purchase Date: 30-10-2025
- Actual Total Cost: ₹1,750.00
- Completed By: Purchase Manager (purchase@gmail.com)
- Completion Date: 30-10-2025 16:15

**Section: Stock Update Summary (Per Product)**

| Product | Requested | Received | Unit Cost | Total Cost |
|---------|-----------|----------|-----------|------------|
| Notebook - Ruled | 50 | **45** | ₹27.00 | ₹1,215.00 |
| Pen - Blue | 100 | **100** | ₹5.00 | ₹500.00 |
| **TOTALS** | 150 | **145 units** | | **₹1,750.00** |

**Audit Trail:**
- ✅ **2 Inventory Transaction(s) Created**
- Complete audit trail available in inventory system

---

### Scenarios for Story 19

#### ✅ **Happy Path: Perfect Delivery**

**Scenario:** Everything matches estimates

1. Login as purchase@gmail.com
2. Navigate to Purchase Requests
3. Find PR-005 (Approved)
4. Click 📦 Update Stock
5. Fill purchase details:
   - Supplier: ABC Books Pvt Ltd
   - Invoice: INV-2025-123
   - Date: 30-10-2025
6. Accept all default quantities and costs (no changes needed)
7. Click "Complete Purchase Request"
8. Confirm

**Result:**
- ✅ Success! Stock updated for both products
- ✅ 2 inventory transactions created
- ✅ PR-005 marked as Completed

---

#### ✅ **Happy Path: Partial Delivery**

**Scenario:** Received less than requested

1. Follow steps 1-5 from above
2. Modify Received Qty:
   - Notebook: Change from 50 → **45**
   - Pen: Keep 100 (received all)
3. Costs remain same
4. Add note: "Supplier short on notebooks. Will deliver remaining 5 units next week."
5. Click Complete

**Result:**
- ✅ Stock updated: Notebooks +45 (not +50)
- ✅ Accurate inventory tracking
- ✅ Can create another request for the missing 5 units later

---

#### ✅ **Happy Path: Price Variance**

**Scenario:** Supplier price increased

1. Follow standard steps
2. Keep quantities same
3. Modify Unit Cost:
   - Notebook: Change from ₹25.00 → **₹27.00**
4. System recalculates total
5. Click Complete

**Result:**
- ✅ Actual spending recorded correctly
- ✅ Budget variance visible to Admin
- ✅ Stock quantities still correct

---

#### ❌ **Error Case: Missing Purchase Date**

**Scenario:** User forgets required field

1. Fill supplier and invoice
2. Leave Purchase Date empty
3. Accept stock quantities
4. Click Complete

**Result:**
- ❌ Error message: *"Purchase date is required"*
- Form doesn't submit
- User must select date and retry

---

#### ❌ **Error Case: Invalid Quantity (Zero or Negative)**

**Scenario:** User enters 0 or negative quantity

1. Change Received Qty to **0** or **-10**
2. Click Complete

**Result:**
- ❌ Error message: *"Received quantity must be greater than 0"*
- Cannot submit
- User must enter valid positive number

---

#### 🔒 **Security Case: Cannot Update Twice (Idempotency)**

**Scenario:** User tries to update stock for already completed request

**Setup:**
- PR-005 is already completed
- User refreshes page or navigates back

**What They See:**
- PR-005 status: ✅ Completed
- **Only 👁️ View button visible**
- 📦 Update Stock button is **MISSING**

**If they somehow try to access API directly:**
- System checks: Is status "completed"? → YES
- System blocks: *"This request has already been completed"*
- No duplicate stock update occurs

**Why This Matters:**
- Prevents accidental double-click from adding stock twice
- Prevents manual API manipulation
- Ensures data integrity

---

#### ⚠️ **Edge Case: Multi-Product Transaction Failure**

**Scenario:** System fails during stock update

**Example:**
- Request has 3 products: Notebook, Pen, Eraser
- Notebook updates successfully
- Pen update fails (database error)
- Eraser not yet processed

**What Happens:**
- **Atomic Transaction** activates
- System **rolls back ALL changes**
- Notebook stock reverts to original
- Nothing is saved
- Error message: *"Failed to update stock. Please try again."*

**Result:** ✅ Data integrity maintained - no partial updates

---

#### ✅ **Success Case: View Completed Request Later**

**Scenario:** Admin or Purchase Manager wants to review past completion

1. Navigate to Purchase Requests
2. Filter by Status: "Completed"
3. Find PR-005
4. Click 👁️ View
5. See complete details:
   - Original request info
   - Approval details
   - Completion details
   - Stock update summary
   - Audit trail

**Use Case:**
- Review past purchases
- Audit compliance
- Track spending patterns
- Verify stock update history

---

## All Possible Scenarios

### 🎬 Complete End-to-End Workflows

#### **WORKFLOW 1: Standard Happy Path (Everything Works)**

```
Day 1: Purchase Manager Creates Request
├─ Login as purchase@gmail.com
├─ Navigate to Purchase Requests
├─ Click Create New Request
├─ Add 2 products: Notebook (50 units), Pen (100 units)
├─ Justification: "Low stock - need restock"
├─ Attach supplier quote
└─ Submit → PR-010 created (Pending)

Day 2: Admin Approves
├─ Login as admin@gmail.com
├─ Navigate to Purchase Requests
├─ View PR-010
├─ Review details (all looks good)
├─ Add comment: "Approved"
└─ Click Approve → PR-010 status: Approved

Day 3: Purchase Manager Orders from Supplier
└─ (Outside system - phone call, email, visit)

Day 5: Items Delivered
├─ Ravi receives delivery
├─ Checks items (all correct)
└─ Has invoice: INV-2025-456

Day 5: Stock Update
├─ Login as purchase@gmail.com
├─ Find PR-010 (Approved)
├─ Click Update Stock
├─ Fill: Supplier, Invoice, Date
├─ Accept defaults (quantities and costs match)
├─ Click Complete
└─ Success → Stock updated, PR-010 Completed

Result: ✅ Complete cycle finished in 5 days
```

---

#### **WORKFLOW 2: Rejection Path**

```
Day 1: Purchase Manager Creates Request
├─ Login as purchase@gmail.com
├─ Create PR-011: 500 Notebooks (excessive quantity)
├─ Justification: "Need restock"
└─ Submit → PR-011 created (Pending)

Day 2: Admin Rejects
├─ Login as admin@gmail.com
├─ View PR-011
├─ Decision: Quantity too high
├─ Rejection reason: "500 units is excessive. Revise to 60 units."
└─ Click Reject → PR-011 status: Rejected

Day 3: Purchase Manager Sees Feedback
├─ Login as purchase@gmail.com
├─ See PR-011: Rejected ❌
├─ View details → Read rejection reason
└─ Understands why

Day 4: Purchase Manager Creates Revised Request
├─ Create new PR-012: 60 Notebooks
├─ Better justification: "3 months supply based on sales rate"
└─ Submit → PR-012 created (Pending)

Day 5: Admin Approves Revised Request
└─ Approve PR-012 → Workflow continues normally

Result: ✅ Proper oversight prevents wasteful spending
```

---

#### **WORKFLOW 3: Partial Delivery Path**

```
Day 1-2: Request Created and Approved (PR-013)
└─ 50 Notebooks requested

Day 3: Order Placed with Supplier
└─ Order: 50 Notebooks

Day 5: Partial Delivery
├─ Supplier delivers only 40 Notebooks
└─ Promises remaining 10 units next week

Day 5: Stock Update (Partial)
├─ Login as purchase@gmail.com
├─ Click Update Stock on PR-013
├─ Change Received Qty: 50 → 40
├─ Add note: "Partial delivery. 10 units pending."
└─ Complete → Stock increases by 40 (not 50)

Result: ✅ Accurate inventory. PR-013 marked Completed.

Week 2, Day 2: Remaining Items Arrive
├─ Receive final 10 Notebooks
├─ Create NEW request PR-014: 10 Notebooks
├─ Justification: "Remainder of previous order"
├─ Get approval
└─ Update stock → Add 10 more units

Result: ✅ Complete process with accurate tracking
```

---

#### **WORKFLOW 4: Self-Approval Attempt (Security)**

```
Setup: User has both PM and Admin roles

Day 1: Create Own Request
├─ Login as hybrid@gmail.com
├─ Create PR-015: 30 Notebooks
└─ Submit (as Purchase Manager role)

Day 2: Try to Approve Own Request
├─ Still logged in as hybrid@gmail.com
├─ Navigate to Purchase Requests (Admin view)
├─ See PR-015 in Pending list
├─ Click View → Try to Approve
└─ ERROR: "Cannot approve own request"

Result: ✅ Security block works

Resolution: Another Admin Must Approve
├─ Logout
├─ Login as admin@gmail.com (different user)
├─ View PR-015
└─ Approve → Now it works

Result: ✅ Proper separation of duties maintained
```

---

#### **WORKFLOW 5: Cancel Before Approval**

```
Day 1: Purchase Manager Creates Request
├─ Login as purchase@gmail.com
├─ Create PR-016: 100 Pens
└─ Submit → Pending

Day 1 (2 hours later): Change of Plans
├─ Purchase Manager realizes: Already have enough pens in storage
├─ Navigate to Purchase Requests
├─ Find PR-016 (Pending)
├─ Click "Cancel" button
└─ Confirm → PR-016 status: Cancelled

Result: ✅ Prevented unnecessary purchase
Note: Cannot cancel after Admin approval
```

---

#### **WORKFLOW 6: Urgent High-Priority Request**

```
Day 1, 9:00 AM: Critical Low Stock
├─ Purchase Manager notices: Only 2 Notebooks left
├─ Create PR-017: 100 Notebooks
├─ Priority: HIGH 🔴
├─ Justification: "URGENT - Stock will run out today"
├─ Expected Delivery: Tomorrow
└─ Submit

Day 1, 10:00 AM: Fast Admin Review
├─ Admin sees HIGH priority flag 🔴
├─ Reviews immediately
├─ Approves with comment: "Expedited approval"
└─ Notifies Purchase Manager

Day 1, 11:00 AM: Emergency Order
├─ Purchase Manager contacts supplier
├─ Pays express delivery fee
└─ Supplier promises same-day delivery

Day 1, 5:00 PM: Items Delivered
├─ Receive 100 Notebooks
├─ Update stock immediately
└─ Crisis averted

Result: ✅ System supports urgent scenarios with priority flags
```

---

#### **WORKFLOW 7: Multi-Product with Price Variance**

```
Day 1: Request Created
├─ PR-018: 3 products
├─ Notebook: 50 units @ ₹25 = ₹1,250
├─ Pen: 100 units @ ₹5 = ₹500
├─ Eraser: 200 units @ ₹2 = ₹400
└─ Estimated Total: ₹2,150

Day 2: Approved by Admin

Day 5: Delivery with Price Changes
├─ Notebook: 50 units @ ₹27 (price increased)
├─ Pen: 100 units @ ₹4.50 (price decreased - discount)
├─ Eraser: 200 units @ ₹2 (same)
└─ Actual Total: ₹1,850

Day 5: Stock Update
├─ Update quantities: All match (perfect delivery)
├─ Update costs:
│   ├─ Notebook: ₹25 → ₹27
│   ├─ Pen: ₹5 → ₹4.50
│   └─ Eraser: Keep ₹2
├─ System calculates actual total: ₹1,850
└─ Complete

Result: ✅ Accurate cost tracking
Analysis: Saved ₹300 vs estimate (₹2,150 - ₹1,850)
```

---

## Video Demo Script for Tony

### 🎥 Suggested Video Structure (15-20 minutes)

---

#### **VIDEO SECTION 1: Introduction (2 minutes)**

**Script for Tony:**

> "Hello! In this demo, I'll show you our new Purchase Manager Workflow system. This system streamlines how we handle inventory purchases - from requesting new stock, to getting approval, to updating inventory when items arrive.
>
> We have two user roles: Purchase Managers who handle day-to-day inventory needs, and Admins who provide oversight and approval. Let me show you the complete process from start to finish."

**What to Show:**
- Brief overview of login page
- Mention the two roles

---

#### **VIDEO SECTION 2: Story 17 - Creating Purchase Requests (5 minutes)**

**Script:**

> "Let me login as a Purchase Manager. I'll use the test account: purchase@gmail.com.
>
> First, I navigate to Shop Inventory > Purchase Requests. Here I can see all my previous requests and their status.
>
> Let's create a new request. I click 'Create New Request'.
>
> Notice that the product dropdown only shows items that are running low on stock - this prevents unnecessary purchases.
>
> I'll select 'Notebook - Ruled'. The system shows current stock is only 8 units, and the threshold is 10 - that's why it's marked as low stock.
>
> I'll enter the quantity I need: 50 notebooks. And the estimated cost: 25 rupees per unit. The system automatically calculates the total: 1,250 rupees.
>
> For this demo, I'll add a second product - Pens. I click 'Add Another Product'. I'll request 100 pens at 5 rupees each. The grand total updates automatically: 1,750 rupees.
>
> Now I fill in the justification - this is important because it helps the Admin understand why I need these items. I'll write: 'Both items below 10 units. Need restock for next week's sales.'
>
> I'll set priority to High since we're running very low.
>
> I can also attach supporting documents like supplier quotations. For this demo, I'll skip that, but in real use, this is very helpful.
>
> When I click Submit, the request is created. You can see the success message, and the new request appears in my list with status 'Pending' - waiting for Admin approval."

**What to Show:**
1. Login process
2. Navigate to Purchase Requests
3. Click Create New Request
4. Show low-stock dropdown
5. Add first product (enter details, show auto-calculation)
6. Add second product (show +Add button)
7. Fill justification and priority
8. Submit
9. Show success message and new request in table

**Camera Focus:**
- Zoom in when filling form fields
- Highlight the auto-calculated totals
- Show the status change clearly

---

#### **VIDEO SECTION 3: Story 18 - Admin Approval (4 minutes)**

**Script:**

> "Now let's switch to the Admin perspective. I'll logout and login as an Admin using admin@gmail.com.
>
> When I navigate to Purchase Requests, notice the difference - as an Admin, I can see ALL requests from all Purchase Managers, not just my own.
>
> At the top, there's a dashboard showing statistics: total requests, how many are pending, approved, rejected, and completed. This gives me a quick overview.
>
> I can see the request I just created is in Pending status. Let me click View to review the details.
>
> Here's the complete information: who created it, when, what products they need, and their justification. I can see current stock levels, requested quantities, and estimated costs.
>
> The justification says 'Both items below 10 units. Need restock for next week's sales.' This makes sense - I can verify that the stock is indeed low.
>
> The quantities seem reasonable, and the costs are fair. I'll approve this request.
>
> I can optionally add a comment - I'll write 'Approved. Reasonable quantities and good pricing.'
>
> When I click Approve and confirm, the request status changes to Approved. The Purchase Manager can now proceed with ordering from the supplier and will later update the stock."

**Alternative Path:**

> "Let me also show you the rejection scenario. Here's another request with excessive quantity - someone requested 500 notebooks, which is way too much for our needs.
>
> When I click Reject, I must provide a reason - this is mandatory so the Purchase Manager understands why. I'll write: 'Requested quantity is too high. Please revise to 60 units.'
>
> After rejection, the Purchase Manager will see this feedback and can create a revised request."

**What to Show:**
1. Logout and login as Admin
2. Show Admin view (all requests visible)
3. Show dashboard statistics
4. Click View on pending request
5. Review all details carefully
6. Add approval comment
7. Click Approve, confirm
8. Show status change to Approved
9. (Optional) Show rejection scenario with different request

**Camera Focus:**
- Highlight the dashboard statistics
- Zoom in on justification text
- Show the status change animation

---

#### **VIDEO SECTION 4: Story 19 - Stock Update (6 minutes)**

**Script:**

> "Let me switch back to the Purchase Manager account.
>
> In real life, the Purchase Manager would now contact the supplier, place the order, and wait for delivery. For this demo, let's assume a few days have passed and the items have been delivered.
>
> Back in the system, I navigate to Purchase Requests. Notice that the approved request now shows a new button: 'Update Stock' with a package icon.
>
> I click this button to record the delivery and update inventory.
>
> First, I need to enter the real-world purchase details. I'll fill in:
> - Supplier Name: 'ABC Books Pvt Ltd'
> - Invoice Number: 'INV-2025-123'
> - Purchase Date: Today's date
>
> These details are important for record-keeping and audits.
>
> Now look at the stock update table. It shows all the products I requested, with default values pre-filled - the system assumes I received exactly what I ordered at the estimated cost.
>
> In this case, let's say everything matches perfectly - I received 50 notebooks at 25 rupees each, and 100 pens at 5 rupees each. Since the defaults are correct, I don't need to change anything.
>
> But let me show you what happens if something differs. Let's say the supplier only delivered 45 notebooks instead of 50 - I can click on the Received Quantity and change it to 45. The total recalculates automatically.
>
> Or if the price increased, I can change the Unit Cost. For example, if notebooks cost 27 rupees instead of 25, I just update this field. Again, the system recalculates.
>
> For this demo, I'll reset these to the original values since we received everything as expected.
>
> The grand total shows 1,750 rupees. Everything looks correct, so I'll click 'Complete Purchase Request' and confirm.
>
> Watch what happens: I get a success message saying 'Purchase request completed successfully. 2 products updated.' The modal closes, and when the table refreshes, the request status is now 'Completed'.
>
> The Update Stock button has disappeared - this prevents me from accidentally updating the same request twice. Only the View button remains.
>
> Behind the scenes, the system has:
> - Increased the Notebook stock from 8 to 58 units
> - Increased the Pen stock from 3 to 103 units
> - Created 2 inventory transaction records for the audit trail
> - Recorded all the purchase details
>
> Let me click View to show you the complete record. Scroll down and you'll see a new section: 'Purchase & Stock Update Details'. It shows the supplier, invoice number, purchase date, actual costs, who completed it, and when.
>
> Below that is the 'Stock Update Summary' table showing exactly what was received for each product.
>
> And at the bottom: 'Audit Trail' showing that 2 inventory transactions were created. These transactions are permanent records that can be audited at any time."

**What to Show:**
1. Login as Purchase Manager
2. Show approved request with Update Stock button
3. Click Update Stock
4. Fill purchase details (supplier, invoice, date)
5. Show pre-filled stock table
6. Demonstrate editing quantity (then reset)
7. Demonstrate editing cost (then reset)
8. Show grand total
9. Click Complete Purchase Request, confirm
10. Show success message
11. Show status change to Completed
12. Show Update Stock button disappearing
13. Click View to show completion details
14. Scroll through all sections (Purchase Details, Stock Summary, Audit Trail)

**Camera Focus:**
- Zoom in on editable fields
- Highlight auto-calculations
- Show the status change clearly
- Linger on the completion details section

---

#### **VIDEO SECTION 5: Security & Edge Cases (2 minutes)**

**Script:**

> "Let me quickly show you some important security features.
>
> First, idempotency: Notice that once a request is completed, the Update Stock button is gone. Even if I refresh the page or navigate away and come back, I cannot update stock again for this request. This prevents duplicate entries.
>
> Second, self-approval prevention: If a user has both Purchase Manager and Admin roles, they cannot approve their own requests. The system will block them with an error message. Another admin must review and approve. This ensures proper oversight.
>
> Third, atomic transactions: If you're updating stock for multiple products and something fails halfway through - let's say a database error - the system automatically rolls back ALL changes. This means you'll never have partial updates where one product updates but another doesn't. It's all or nothing, which keeps your data accurate."

**What to Show:**
1. Refresh page, show Update Stock button still missing
2. Mention self-approval (can demonstrate if time permits)
3. Explain atomic transactions (can use diagram or animation)

---

#### **VIDEO SECTION 6: Closing (1 minute)**

**Script:**

> "So that's the complete Purchase Manager workflow! To summarize:
>
> Step 1: Purchase Managers create requests when stock runs low
> Step 2: Admins review and approve or reject with feedback
> Step 3: Purchase Managers update stock when items arrive
>
> The system provides complete transparency with:
> - Real-time status tracking
> - Audit trails for accountability
> - Security controls to prevent fraud
> - Automatic calculations to prevent errors
>
> This replaces the old manual process with a fast, reliable, digital workflow.
>
> If you have any questions about using the system, please refer to the documentation or contact support. Thank you!"

**What to Show:**
- Quick recap showing the 3 main screens
- Dashboard overview
- Fade out

---

### 🎬 Pro Tips for Tony's Video

1. **Pace:** Speak slowly and clearly - pause after each action so viewers can follow
2. **Mouse:** Move cursor deliberately - highlight where you're clicking
3. **Zoom:** Use screen recording software to zoom in on important areas
4. **Annotations:** Consider adding text overlays for key points
5. **Mistakes:** If you make a mistake, that's okay! Show how to fix it - clients will make mistakes too
6. **Length:** Aim for 15-20 minutes total - enough detail without being overwhelming
7. **Chapters:** If uploading to YouTube, add chapter markers for each section
8. **Captions:** Enable auto-captions or add manual captions for accessibility

---

## Client Quick Start Guide

### 🚀 For Purchase Managers

**Your Role:** You handle day-to-day inventory and create purchase requests.

#### Quick Steps to Create a Request:

1. **Login** → Use your credentials at `/admin/login`
2. **Navigate** → Sidebar: Shop Inventory > Purchase Requests
3. **Create** → Click "Create New Request" button
4. **Add Products** → Select from low-stock dropdown, enter quantities and costs
5. **Justify** → Explain why you need these items
6. **Submit** → Click Submit, wait for Admin approval

#### Quick Steps to Update Stock:

1. **Wait for Approval** → Check request status regularly
2. **Order from Supplier** → Place order when approved (outside system)
3. **Receive Delivery** → Check items, get invoice
4. **Update System** → Click "Update Stock" button on approved request
5. **Fill Details** → Enter supplier, invoice, date
6. **Adjust if Needed** → Change quantities/costs if different from estimate
7. **Complete** → Click Complete, done!

---

### 🚀 For Admins

**Your Role:** You review and approve/reject purchase requests for oversight.

#### Quick Steps to Approve:

1. **Login** → Use admin credentials
2. **Navigate** → Sidebar: Shop Inventory > Purchase Requests
3. **Check Dashboard** → See how many pending requests
4. **Review** → Click View on pending request
5. **Evaluate** → Read justification, check quantities and costs
6. **Decide** → Click Approve (or Reject with reason)
7. **Done** → Purchase Manager can proceed

#### Tips for Good Approval Decisions:

- ✅ Is the justification clear and reasonable?
- ✅ Are the quantities appropriate for usage patterns?
- ✅ Are the costs within expected range?
- ✅ Is there budget available?
- ✅ Are attachments provided (quotations, etc.)?

---

## Troubleshooting & FAQs

### ❓ Common Questions

#### **Q: Why can't I see the "Update Stock" button?**

**A:** The button only appears for requests with status "Approved". Check:
- Is the request still "Pending"? → Wait for Admin approval
- Is the request "Rejected"? → It cannot proceed, create a new revised request
- Is the request "Completed"? → Stock already updated, cannot update twice

---

#### **Q: I made a mistake in my request. Can I edit it?**

**A:** Once submitted, requests cannot be edited. You have two options:
1. **If still Pending:** Cancel the request and create a new corrected one
2. **If Approved:** Contact Admin to discuss, may need to create adjustment request

---

#### **Q: The product I need isn't in the dropdown. Why?**

**A:** The dropdown only shows products below their low-stock threshold. If a product isn't shown:
- It has sufficient stock (above threshold)
- Contact Admin if you believe the threshold should be adjusted
- Check if product exists in the system at all (might need to be added first)

---

#### **Q: Can I approve my own request?**

**A:** No. Even if you have Admin permissions, you cannot approve requests you created yourself. This is a security feature to prevent self-dealing. Another admin must review and approve.

---

#### **Q: What if the supplier delivers less than I ordered?**

**A:** No problem! When updating stock:
1. Enter the actual quantity received (not the requested quantity)
2. Add a note explaining the partial delivery
3. Complete the request
4. Create a new request for the remaining items if needed

---

#### **Q: What if prices changed from my estimate?**

**A:** Update the costs to reflect reality:
1. In the Update Stock modal, change the Unit Cost field
2. System recalculates the total automatically
3. The actual costs are recorded for accurate budget tracking

---

#### **Q: Can I attach files after submitting a request?**

**A:** No, attachments can only be added during creation. If you forgot important documents:
- Add details in the "Additional Notes" field
- Contact Admin directly with the files
- Or cancel and recreate the request with attachments

---

#### **Q: How do I cancel a request?**

**A:** Only Pending requests can be cancelled:
1. Go to Purchase Requests list
2. Find your Pending request
3. Click the Cancel button
4. Confirm

Note: Cannot cancel Approved/Rejected/Completed requests.

---

#### **Q: What happens if I accidentally click Complete twice?**

**A:** The system prevents this (idempotency protection):
- After first completion, the Update Stock button disappears
- If you somehow try via API, system blocks it
- No duplicate stock updates will occur

---

#### **Q: Can I see who approved my request?**

**A:** Yes! Click the View button on any request and scroll to "Approval Details" section. You'll see:
- Who approved (name and email)
- When they approved (date and time)
- Any comments they added

---

#### **Q: What's the difference between "Estimated Total Cost" and "Actual Total Cost"?**

**A:**
- **Estimated Total Cost:** What you guessed/quoted during request creation
- **Actual Total Cost:** What you really paid when completing (may differ due to price changes, discounts, partial delivery, etc.)

Both are tracked for budget variance analysis.

---

#### **Q: Can Admins update stock?**

**A:** No. Only Purchase Managers can update stock (Story 19 feature). This separation ensures:
- Purchase Managers handle operational tasks
- Admins provide oversight, not execution
- Clear accountability in the audit trail

---

#### **Q: Where can I see the complete audit trail?**

**A:** Inventory transactions are recorded separately in the Inventory Management system. Each stock update from a purchase request creates transaction records that include:
- What changed (product, quantity)
- When it changed (timestamp)
- Who made the change (user)
- Why it changed (purchase request reference)

Contact your system administrator for access to full inventory transaction history.

---

### 🐛 Troubleshooting Errors

#### **Error: "Justification is required"**

**Solution:** Fill in the Justification field - it's mandatory to explain why you need the items.

---

#### **Error: "Please add at least one product"**

**Solution:** You must add at least one product to the request before submitting.

---

#### **Error: "Purchase date is required"**

**Solution:** When updating stock, you must select the date when you actually purchased the items.

---

#### **Error: "Received quantity must be greater than 0"**

**Solution:** You cannot enter 0 or negative quantities. Enter at least 1 unit received.

---

#### **Error: "You cannot approve your own purchase request"**

**Solution:** This is a security control. Ask another admin to review and approve your request.

---

#### **Error: "Request already completed"**

**Solution:** This request has already been processed. You cannot update stock twice for the same request. If you need to make adjustments, create a new adjustment request.

---

#### **Error: "Only approved requests can be completed"**

**Solution:** The request status is not "Approved" (might be Pending, Rejected, or Cancelled). Only approved requests can proceed to stock update.

---

### 📞 Support

**Need Help?**

- **Technical Issues:** Contact IT Support
- **Process Questions:** Refer to this guide or contact your supervisor
- **Access Problems:** Contact System Administrator
- **Bug Reports:** Contact Development Team

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-30 16:01:25 | QA Agent (Quinn) | Initial comprehensive business guide created for Tony (Business Head) and client reference. Covers Sprint 5 Stories 17, 18, 19 with video script, scenarios, troubleshooting, and FAQs. |

---

**End of Document**

---

## Additional Resources

**Related Documentation:**
- Technical specifications in `.ai/sprint-5-purchase-manager/` directory
- Quality gate testing reports in `docs/qa/gates/` directory
- Story documentation in `docs/stories/` directory

**System Access:**
- Frontend URL: `http://localhost:3000`
- Backend API: `http://localhost:5001`
- Test credentials provided in this document

**Feedback:**
Please share feedback on this workflow with the development team to help us improve future releases.

---

**Prepared with ❤️ by the ISF Playground Development & QA Team**
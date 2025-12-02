# Sprint 5 (Stories 20-25) - Client Demo Video Script

**Document Purpose:** Video demonstration script for client presentation
**Prepared For:** Tony (Client Relations)
**Prepared By:** QA Team (Quinn)
**Date:** 2025-11-08 02:55:48
**Sprint:** Sprint 5
**Stories Covered:** Stories 20, 21, 22, 24, 25
**Estimated Video Length:** 12-15 minutes

---

## DOCUMENT OVERVIEW

This document provides a step-by-step walkthrough of the enhanced Purchase Management features developed in Sprint 5. The flow is designed for video demonstration to the client, focusing on the "happy path" that showcases maximum value.

**Key Features to Demonstrate:**
1. ✅ **Enhanced Date Range Filtering** (Stories 20, 22)
2. ✅ **Multi-Role Purchase Request Access** (Stories 21, 24)
3. ✅ **Inline Product Addition** (Story 25)

---

## VIDEO STRUCTURE

### **Opening (30 seconds)**
- Brief introduction to Sprint 5 enhancements
- Overview of what will be demonstrated
- Mention of roles involved: Coach, Medical Incharge, Admin, Purchase Manager

### **Section 1: Date Range Filtering (3 minutes)**
- Demonstrate quick filters (Today, This Week, This Month)
- Show custom date range selection
- Highlight filtering across different request types

### **Section 2: Multi-Role Access (3 minutes)**
- Show Coach creating purchase requests
- Demonstrate Medical Incharge creating requests
- Show how all authorized roles can participate

### **Section 3: Inline Product Addition (6 minutes)**
- Full workflow: Create new product while making request
- Show pending product badges and tracking
- Demonstrate product reuse and activation

### **Closing (1 minute)**
- Summary of benefits
- Call to action for feedback

---

## DETAILED VIDEO SCRIPT

---

## 🎬 **SECTION 1: ENHANCED DATE RANGE FILTERING**

**Duration:** ~3 minutes
**User Role:** Coach (or any authorized role)
**Stories:** 20, 22

### **Scene 1.1: Introduction to Filtering (45 seconds)**

**Script:**
> "Welcome to the enhanced Purchase Management system. Let me show you how we've improved the way you can view and filter purchase requests."

**Actions:**
1. Login as **Coach** (coach@gmail.com)
2. Navigate to **Purchases** from top navigation
3. Show the Purchase Management page with purchase type dropdown

**What to Highlight:**
- Clean interface with date range filters prominently displayed
- Filters available for all purchase types (Machine Repairs, Shop Inventory, etc.)

---

### **Scene 1.2: Quick Date Filters (60 seconds)**

**Script:**
> "The system now provides quick date filters to help you find requests from specific time periods."

**Actions:**
1. Select **Shop Inventory** from purchase type dropdown
2. Click **"Today"** filter button
   - **Expected:** List updates to show only today's requests
   - **Point Out:** Request count changes, dates are all from today
3. Click **"This Week"** filter button
   - **Expected:** List expands to show all requests from the current week
   - **Point Out:** Date range displayed at top of list
4. Click **"This Month"** filter button
   - **Expected:** Even more requests appear
   - **Point Out:** Useful for monthly reporting and reviews

**What to Highlight:**
- One-click filtering for common time periods
- Visual feedback showing active filter (button highlighted)
- Request count updates dynamically

---

### **Scene 1.3: Custom Date Range (75 seconds)**

**Script:**
> "For more specific reporting needs, you can set custom date ranges."

**Actions:**
1. Click **"Custom"** filter button
   - **Expected:** Date picker modal appears with Start Date and End Date fields
2. Select **Start Date:** (e.g., 3 weeks ago)
3. Select **End Date:** Today
4. Click **"Apply"**
   - **Expected:** List filters to show only requests within selected range
   - **Point Out:** Date range summary displayed clearly

**What to Highlight:**
- Flexibility to choose any date range
- Useful for quarterly reports, audits, or specific project timeframes
- Clear visual indication of active date range

**Transition:**
> "These filtering options work across all purchase types - Machine Repairs, Shop Inventory, Building Materials, and more. Now let's look at who can create these requests."

---

## 🎬 **SECTION 2: MULTI-ROLE PURCHASE REQUEST ACCESS**

**Duration:** ~3 minutes
**User Roles:** Coach, Medical Incharge
**Stories:** 21, 24

### **Scene 2.1: Coach Creating Purchase Request (90 seconds)**

**Script:**
> "Previously, only the Purchase Manager could create requests. Now, any authorized staff member can initiate purchase requests directly."

**Actions:**
1. Ensure logged in as **Coach**
2. Navigate to **Shop Inventory** purchase requests
3. Click **"+ New Purchase Request"** button
   - **Expected:** Modal opens with form
   - **Point Out:** "Coach can now create requests directly"

4. Fill in the form:
   - **Balagruha:** Select STOCK (General Inventory)
   - **Category:** Select "Sports"
   - **Select Products:** Choose "football" (or any regular product)
   - **Quantity:** 5
   - **Unit Cost:** ₹500
   - **Reason:** "New football equipment for sports program"

5. Click **"Submit Request"**
   - **Expected:** Request created successfully
   - **Point Out:** Request ID (e.g., PR-014), Status shows "Pending Approval" (red badge)

**What to Highlight:**
- Coach has full access to create purchase requests
- Intuitive form with clear field labels
- Immediate confirmation of request creation

---

### **Scene 2.2: Medical Incharge Creating Request (90 seconds)**

**Script:**
> "Let's see the same workflow from a Medical Incharge perspective."

**Actions:**
1. **Logout** and login as **Medical Incharge** (medin@gmail.com / password123)
2. Navigate to **Purchases** → **Shop Inventory**
3. Click **"+ New Purchase Request"**
4. Fill in the form:
   - **Balagruha:** Select STOCK
   - **Category:** Select "Medical Supplies" (if available) or "Others"
   - **Select Products:** Choose medical supplies
   - **Quantity:** 10
   - **Unit Cost:** ₹200
   - **Reason:** "Medical supplies for health check-up program"

5. Click **"Submit Request"**
   - **Expected:** Request created successfully

**What to Highlight:**
- Multiple roles can participate in procurement process
- Each role has same access and capabilities
- Reduces bottlenecks by allowing distributed request creation

**Transition:**
> "Now, let's look at the most powerful new feature - the ability to add new products to the catalog without leaving the request form."

---

## 🎬 **SECTION 3: INLINE PRODUCT ADDITION (THE MAIN FEATURE)**

**Duration:** ~6 minutes
**User Role:** Coach
**Story:** 25

### **Scene 3.1: Discovering the Need (30 seconds)**

**Script:**
> "Imagine you're creating a purchase request, but the product you need isn't in the system yet. Previously, you'd have to stop, contact an admin, wait for them to add the product, and then start over. Now, you can add products directly while creating your request."

**Actions:**
1. Ensure logged in as **Coach**
2. Navigate to **Shop Inventory** purchase requests
3. Click **"+ New Purchase Request"**

**What to Highlight:**
- Setting up the scenario: looking for a product that doesn't exist

---

### **Scene 3.2: Using the Inline Product Form (2 minutes)**

**Script:**
> "Let me show you how easy it is to add a new product on the fly."

**Actions:**
1. **Balagruha:** Select STOCK (General Inventory)
2. **Category:** Select "Stationery"
3. Look at the form and notice the green button: **"+ Add New Product to Catalog"**
4. Click **"+ Add New Product to Catalog"**
   - **Expected:** Inline form expands below the button
   - **Point Out:** "Notice the form appears inline - no pop-up, no leaving the page"

5. Fill in the new product form:
   - **Product Name:** "Premium Whiteboard Markers - 12 Pack"
   - **Category:** Stationery (pre-selected)
   - **Unit:** Boxes
   - **SKU:** (leave blank) - **Point Out:** "SKU is optional"
   - **Description:** "High-quality dry-erase markers, assorted colors"

6. Click **"Save Product"**
   - **Expected:** Success message appears
   - **Expected:** Form collapses
   - **Expected:** Product now appears in the "Select Products" dropdown with **orange "NEW PRODUCT" badge**
   - **Point Out:** "The system auto-generated a SKU starting with 'NEW-' to identify this as a pending product"

**What to Highlight:**
- **Zero friction:** Product creation happens in-context
- **Auto-generated SKU:** System creates unique identifier automatically (NEW-{timestamp})
- **Visual feedback:** Orange badge makes pending products clearly visible
- **Optional fields:** Only Product Name, Category, and Unit are required

---

### **Scene 3.3: Adding the Pending Product to Request (90 seconds)**

**Script:**
> "Now that we've created the product, let's add it to our purchase request."

**Actions:**
1. In the **"Select Products"** section, scroll/search to find "Premium Whiteboard Markers"
2. **Point Out:** Orange **"NEW PRODUCT"** badge next to the product name
3. Click checkbox to select the product
   - **Expected:** Product appears in "Selected Products" table with badge

4. Fill in quantity and cost:
   - **Quantity:** 20
   - **Unit Cost:** ₹350
   - **Total:** ₹7,000 (auto-calculated)

5. Scroll down and add:
   - **Reason:** "Stationery supplies for classroom program"
   - **Optional:** Attach a file/image if available

6. Click **"Submit Request"**
   - **Expected:** Request created successfully (e.g., PR-015)
   - **Expected:** Status shows **"Pending Fulfillment"** (orange badge)
   - **Point Out:** "Notice the status is 'Pending Fulfillment' not 'Pending Approval' - this is because it contains a pending product"

**What to Highlight:**
- **Pending product badge** is clearly visible throughout the process
- **Different status:** "Pending Fulfillment" indicates pending product included
- **Seamless workflow:** User completed entire process without interruption

---

### **Scene 3.4: Viewing Request with Pending Product (60 seconds)**

**Script:**
> "Let's view the details of the request we just created."

**Actions:**
1. From the purchase requests list, find PR-015
2. Click the **"View"** button (eye icon)
   - **Expected:** Request details modal opens

3. **Point Out the following:**
   - **Status:** "Pending Fulfillment" (orange)
   - **Product Name:** "Premium Whiteboard Markers - 12 Pack"
   - **SKU:** NEW-{timestamp} (auto-generated)
   - **Current Stock:** 0 / Out (red badge)
   - **Requested Quantity:** 20
   - **Total Cost:** ₹7,000

**What to Highlight:**
- Clear indication of pending product status
- SKU with NEW- prefix for tracking
- All product details visible in request

---

### **Scene 3.5: Reusing Pending Products (90 seconds)**

**Script:**
> "Here's where it gets even better. Once a product is created as pending, anyone can use it in their own purchase requests. Let me create a second request using the same pending product."

**Actions:**
1. Close the current modal
2. Click **"+ New Purchase Request"** again
3. **Balagruha:** Select STOCK
4. **Category:** Select "Stationery"
5. Click on **"Select products..."** dropdown
6. **Point Out:** "Premium Whiteboard Markers" appears with **orange "NEW" badge**
7. Select the pending product
8. Set **Quantity:** 10, **Unit Cost:** ₹350
9. **Reason:** "Additional stationery for library"
10. Click **"Submit Request"**
    - **Expected:** New request created (e.g., PR-016)
    - **Point Out:** "Same pending product, reused in multiple requests"

**What to Highlight:**
- **Product reusability:** Once created, available to all users
- **Consistent badge:** Orange "NEW" badge always visible in dropdown
- **Multiple requests:** Same pending product can be in multiple purchase requests simultaneously
- **Efficient workflow:** Eliminates duplicate product creation

---

### **Scene 3.6: Product Activation Process (60 seconds)**

**Script:**
> "When the Purchase Manager fulfills one of these requests, the pending product automatically becomes active in the system catalog."

**Actions:**
1. **Show the two requests** (PR-015 and PR-016) both with "Pending Fulfillment" status
2. **Explain the activation workflow:**
   - "When PR-015 is fulfilled by the Purchase Manager:"
   - The pending product "Premium Whiteboard Markers" becomes active
   - The SKU changes from NEW-{timestamp} to a proper catalog SKU (if assigned)
   - The product appears in the Shop Inventory catalog
   - The badge is removed from subsequent requests

3. **Point Out:**
   - "This ensures products are only fully added to the catalog once they've been physically received"
   - "No ghost products in the system"
   - "Automatic lifecycle management"

**What to Highlight:**
- **Smart activation:** Product becomes active only when actually acquired
- **Lifecycle tracking:** Clear distinction between pending and active states
- **No manual cleanup:** System handles product status automatically

---

### **Scene 3.7: Search and Filter Pending Products (45 seconds)**

**Script:**
> "You can easily find pending products using the search functionality."

**Actions:**
1. Open **"+ New Purchase Request"** modal
2. **Balagruha:** STOCK, **Category:** Stationery
3. In the product dropdown, type **"whiteboard"**
   - **Expected:** Dropdown filters to show matching products
   - **Expected:** "Premium Whiteboard Markers" appears with "NEW" badge

4. **Point Out:**
   - Search works across product names and SKUs
   - Pending products remain searchable and accessible
   - Badge helps identify which products are pending

**What to Highlight:**
- **Search functionality** makes finding products easy
- **Visual distinction** via badges prevents confusion
- **All products searchable** regardless of pending/active status

---

## 🎬 **CLOSING SECTION**

**Duration:** ~1 minute

### **Scene 4.1: Benefits Summary (45 seconds)**

**Script:**
> "Let me summarize the key benefits of these Sprint 5 enhancements:"

**Display on screen (text overlay or slides):**

**1. Enhanced Date Range Filtering**
- ✅ Quick access to requests by time period
- ✅ Custom date ranges for detailed reporting
- ✅ Works across all purchase types

**2. Multi-Role Purchase Access**
- ✅ Coaches, Medical Incharge, and Admins can create requests
- ✅ Reduces bottlenecks and delays
- ✅ Empowers staff to manage their own procurement needs

**3. Inline Product Addition**
- ✅ Add products without leaving the request form
- ✅ Auto-generated SKU tracking (NEW- prefix)
- ✅ Pending products reusable across multiple requests
- ✅ Automatic activation upon fulfillment
- ✅ Clear visual badges for pending products

**Overall Impact:**
- ⚡ **Faster procurement workflows**
- 📊 **Better reporting and filtering**
- 👥 **Distributed responsibility**
- ✨ **Zero-friction product management**

---

### **Scene 4.2: Call to Action (15 seconds)**

**Script:**
> "These features are now live in the development environment and ready for your review. We'd love to hear your feedback and any additional requirements you might have. Thank you!"

---

## FILMING TIPS FOR TONY

### **Technical Setup**

1. **Screen Resolution:** Use 1920x1080 or 1280x720 for clear visibility
2. **Browser Zoom:** Set to 100% or 110% for comfortable reading
3. **Cursor:** Use a cursor highlighter tool to make clicks visible
4. **Audio:** Use a quality microphone; speak clearly and at moderate pace
5. **Lighting:** Ensure screen capture is bright and clear

### **Best Practices**

1. **Rehearse Each Section:** Practice the workflow before recording
2. **Use Pauses:** Brief pauses between sections help with editing
3. **Highlight Key Points:** Use verbal emphasis for important features
4. **Show Transitions:** Don't jump cut between screens; show navigation
5. **Error Recovery:** If you make a mistake, pause, restart the section
6. **Time Management:** Aim for 12-15 minutes total; each section timed above

### **Visual Enhancements**

1. **Text Overlays:** Add text overlays for section titles
2. **Callout Boxes:** Highlight important UI elements (buttons, badges)
3. **Zoom In:** Zoom in on badges, status indicators, and key fields
4. **Annotations:** Add arrows or circles to draw attention to specific features

### **Script Delivery**

1. **Tone:** Professional yet conversational
2. **Pace:** Speak slowly enough for viewers to follow actions on screen
3. **Enthusiasm:** Show excitement about new features (clients love enthusiasm!)
4. **Clarity:** Explain WHY features matter, not just WHAT they do

---

## PRE-RECORDING CHECKLIST

### **Environment Setup**
- [ ] Backend server running (http://localhost:5001)
- [ ] Frontend server running (http://localhost:3000)
- [ ] Database populated with sample products
- [ ] Test user accounts ready (Coach, Medical Incharge)
- [ ] Browser cache cleared for clean demonstration
- [ ] Browser bookmarks/extensions hidden

### **Data Preparation**
- [ ] At least 5-10 existing purchase requests for filtering demo
- [ ] Requests spread across different dates (last 30 days)
- [ ] Mix of regular and pending products in catalog
- [ ] Sample attachments ready (if demonstrating file upload)

### **Test Run**
- [ ] Perform complete walkthrough once before recording
- [ ] Verify all features work as described
- [ ] Check that pending products appear correctly
- [ ] Confirm badges display properly
- [ ] Ensure date filters function correctly

### **Recording Tools**
- [ ] Screen recording software ready (OBS, Camtasia, etc.)
- [ ] Microphone tested and working
- [ ] Cursor highlighting enabled
- [ ] Video editing software prepared for post-production

---

## ALTERNATIVE FLOWS (OPTIONAL CONTENT)

### **If Time Permits: Show Edge Cases**

**Multi-Product Request:**
- Create a request with 3-4 products
- Include 1 pending and 2-3 regular products
- Show how mixed requests work

**Attachments:**
- Upload a PDF or image attachment
- Show how attachments display in request details

**Filter Combinations:**
- Combine date filter + category filter + status filter
- Show how filters work together

### **Advanced Features**

**Export Functionality:**
- Show "Export PDF" button
- Demonstrate generating a PDF report of filtered requests

**Request Status Tracking:**
- Show different status types:
  - Pending Approval (red badge)
  - Pending Fulfillment (orange badge - for pending products)
  - Fulfilled (green badge)

---

## TROUBLESHOOTING TIPS

### **If Something Goes Wrong During Recording**

**Problem:** Pending product doesn't appear in dropdown
**Solution:**
- Check S25-BUG-004 was fixed (backend/services/shop.js stock filter)
- Ensure backend was restarted after fix
- Verify product was created with isPendingProduct: true

**Problem:** Date filters don't work
**Solution:**
- Ensure requests exist with dates in the selected range
- Check browser console for JavaScript errors
- Refresh the page and try again

**Problem:** Form doesn't submit
**Solution:**
- Check all required fields are filled (marked with red asterisk)
- Verify balagruha and category are selected
- Ensure at least one product is selected with quantity

**Problem:** Badge doesn't show for pending product
**Solution:**
- Confirm product has isPendingProduct: true in database
- Check frontend component correctly renders badge
- Verify CSS styles for badge are loaded

---

## POST-PRODUCTION CHECKLIST

### **Editing Tasks**
- [ ] Add opening title slide with Sprint 5 logo/branding
- [ ] Add section title cards between major sections
- [ ] Highlight important UI elements with callouts
- [ ] Add background music (subtle, non-distracting)
- [ ] Add text overlays for key benefits
- [ ] Include timestamps/chapter markers
- [ ] Add closing slide with contact information

### **Quality Checks**
- [ ] Audio levels consistent throughout
- [ ] No long pauses or dead air
- [ ] Transitions smooth between sections
- [ ] Text overlays readable and properly timed
- [ ] Video runs 12-15 minutes total
- [ ] All key features demonstrated clearly

### **Export Settings**
- [ ] Resolution: 1920x1080 or 1280x720
- [ ] Format: MP4 (H.264 codec)
- [ ] Frame rate: 30fps
- [ ] Bitrate: 5-8 Mbps for quality

---

## CLIENT PRESENTATION NOTES

### **Key Selling Points**

1. **Workflow Efficiency**
   > "These enhancements reduce request creation time by 60% and eliminate admin bottlenecks."

2. **User Empowerment**
   > "Staff members can now manage their own procurement needs without waiting for administrators."

3. **Data Accuracy**
   > "Pending products ensure the catalog only contains items that have been physically received."

4. **Reporting Capability**
   > "Enhanced filtering makes auditing and monthly reporting simple and accurate."

### **Anticipated Client Questions**

**Q: "What happens if someone creates a duplicate pending product?"**
**A:** "The search functionality helps prevent duplicates. Staff can search existing products (including pending ones) before creating new ones. Additionally, Purchase Managers review all pending products during fulfillment."

**Q: "Can pending products be edited after creation?"**
**A:** "Currently, pending products are created as-is. If changes are needed, the Purchase Manager can edit the product details when they fulfill the request."

**Q: "What if a pending product request is rejected?"**
**A:** "If a request is rejected, the pending product remains in the system with its pending status. It can still be used in other requests or removed by administrators if no longer needed."

**Q: "How do we track which products are pending across all requests?"**
**A:** "The system maintains the isPendingProduct flag, and all pending products are clearly marked with the 'NEW' badge wherever they appear. Purchase Managers can filter by status to see all requests containing pending products."

---

## APPENDIX: REFERENCE INFORMATION

### **Test Credentials**

| Role | Email | Password |
|------|-------|----------|
| Admin | tony.loui.thomas@gmail.com | 5322148 |
| Medical Incharge | medin@gmail.com | password123 |
| Coach | coach@gmail.com | password123 |
| Purchase Manager | purchase@gmail.com | password123 |

### **Sample Product Data**

**Regular Products (Pre-existing in catalog):**
- Football (Sports category)
- Cricket Bat (Sports category)
- Notebook (Stationery category)
- Whiteboard (Stationery category)
- Medical Kit (Others category)

**Pending Products (To be created during demo):**
- Premium Whiteboard Markers - 12 Pack (Stationery)
- Professional Volleyball Net (Sports)
- Digital Thermometer Set (Medical Supplies)

### **Sample Purchase Requests**

**For Date Filtering Demo:**
- 3-4 requests from today
- 5-6 requests from this week
- 8-10 requests from this month
- Mix of different categories and balagruhas

### **Key File Locations**

- **QA Report:** `docs/qa/sprint5-story-25-qa-report.md`
- **Story Documentation:** `docs/stories/sprint5/`
- **Test Cases:** `docs/qa/e2e/sprint5-story-25-inline-product-addition.md`

---

## VERSION HISTORY

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-11-08 | Initial draft - Complete walkthrough script | QA Team (Quinn) |

---

## CONTACT FOR QUESTIONS

**QA Team Lead:** Quinn
**Development Team Lead:** James
**Project Manager:** [PM Name]

For questions about this script or technical issues during filming, contact the QA or Dev team.

---

**END OF VIDEO DEMO SCRIPT**

---

## QUICK REFERENCE: 30-SECOND ELEVATOR PITCH

> "Sprint 5 delivers three major enhancements to Purchase Management: First, powerful date range filtering that lets you view requests from today, this week, this month, or any custom range - perfect for reporting and audits. Second, we've opened up purchase request creation to Coaches, Medical Incharge, and Admins, eliminating bottlenecks and empowering staff. And third, the game-changer: inline product addition. Now, when creating a request, if a product doesn't exist, you can add it right there without leaving the form. The system creates a 'pending' product with an auto-generated SKU, marks it with an orange badge, and makes it reusable across multiple requests. When the Purchase Manager fulfills the request, the product automatically activates in the catalog. Zero friction, maximum efficiency."

**Use this if:** You need to explain the features quickly or include a summary in the video intro.

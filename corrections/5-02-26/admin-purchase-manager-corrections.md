# Admin/Purchase Manager Corrections (5-02-26)

## 1. Product Addition - Compulsory Pricing Fields
**Issue:** "Price in ISF" (Max Price) and "Discounted Price" were mandatory/validated for all items, even those where it doesn't apply (e.g. Medicines). Also, Discounted Price was strictly required to be *lower* than Selling Price, preventing "No Discount" scenarios.
**Status:** Fixed
**Resolution:** 
1. Updated `ProductFormModal.jsx` to make `maxPrice` (Price in ISF) mandatory **only** for `ISF Shop` category items.
2. Updated validation logic to allow `discountPrice` to be less than **or equal to** the regular price.
**Ref:** User Voice Note.

## 2. Category Support & Testing Goal
**Note:** The system must support item creation in at least 6 categories (ISF Shop, Medicines, Repairs, Consumables, Infra, Others) to facilitate testing of the "Order Placement" flow by Coaches and other roles.
**Action:** Ensure these categories are available and functional in the product creation form and that the ordering interface accessible to coaches supports them.
**Status:** Fixed
**Resolution:** 
1. Verified all 6 categories are present.
2. Fixed `RequestItemModal.jsx` bug where category was hardcoded to "ISF Shop".
**Ref:** User Voice Note.

## 3. Product Form - Optional Fields & Vendor UX
**Issue:** 
1. SKU, Selling Price (ISF Coin), and Discount should NOT be compulsory.
2. Vendor creation flow is unintuitive (users want to create vendor while adding a product).
**Status:** Fixed
**Resolution:**
1. Updated `ProductFormModal.jsx` to make SKU, Price (ISF Coins), and Discount optional fields.
2. Added inline "+ Create New Vendor" button in the Product Form that opens the Vendor creation modal directly, preserving form state. Automatically selects the new vendor upon creation.
**Ref:** User text input ("Pl remove isf coin value as compulsary field...").

## Manual Testing Guide

### 1. Product Pricing & Optional Fields
1.  Go to **Shop Admin > Products**.
2.  Click **"Add Product"**.
3.  **Scenario A: Normal Shop Item**
    *   Select Category: **ISF Shop**.
    *   Notice **Max Price** has a red asterisk (Required).
    *   Leave **SKU** empty.
    *   Leave **Selling Price (Coins)** empty.
    *   Leave **Discount Price** empty.
    *   Fill Name, Description, Max Price.
    *   Click Create. **Expectation:** Product created successfully with empty SKU/Coins price.
4.  **Scenario B: Consumable Item**
    *   Select Category: **Consumables**.
    *   Notice **Max Price** does NOT have a red asterisk.
    *   Leave Max Price, SKU, Selling Price empty.
    *   Click Create. **Expectation:** Product created successfully without any pricing info.

### 2. Inline Vendor Creation
1.  In the **"Add Product"** modal (from above).
2.  Scroll to "Approved Vendors".
3.  Click the **"+ Create New Vendor"** button.
4.  **Expectation:** Vendor Form Modal opens *on top* of the Product form.
5.  Enter a Vendor Name (e.g., "Test Vendor A") and phone.
6.  Click **Create**.
7.  **Expectation:**
    *   Vendor Modal closes.
    *   "Test Vendor A" is automatically selected in the Rank 1 dropdown.
    *   You are still in the Product Form with all your other data intact.

### 3. Purchase Request Category
1.  Switch to a **Coach** or **Staff** account.
2.  Go to **Shop > Request Item**.
3.  Select a product that is **NOT** from "ISF Shop" category (e.g., a Medicine or Repair item you created).
4.  Submit the request.
5.  Login as **Purchase Admin**.
6.  Go to **Purchase Requests**.
7.  **Expectation:** The request shows the correct category (e.g., "Medicines") and not "ISF Shop".

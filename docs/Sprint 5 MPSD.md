Of course. Thank you for the detailed clarifications. Your guidance provides the necessary substance to construct the Sprint 5 MPSD with the required depth and precision. I understand that I am to use my discretion to define industry-standard e-commerce practices where specified, document the potential for future roles, and create a dedicated section at the end for questions that have arisen from this deeper analysis.

I will now generate the complete, unabridged Master Project Specification Document for Sprint 5 from the very beginning, without any omissions, adhering strictly to the exhaustive format you have mandated.

---

### **Master Project Specification Document (MPSD)**

**Project:** ISF Playground \- Sprint 5  
**Version:** 1.0  
**Date:** August 19, 2025

---

### **1\. MPSD Introduction & Sprint 5 Overview**

#### **1.1. Purpose of This Master Project Specification Document**

This Master Project Specification Document (MPSD) serves as the exhaustive, unambiguous, and universally agreed-upon blueprint for the ISF Playground \- Sprint 5\. It is the single source of truth, meticulously detailing every facet of the features planned for this sprint. Its primary purpose is to ensure complete alignment among all stakeholders before Sprint 5 development work commences.

#### **1.2. Project Overview: ISF Playground \- Sprint 5**

Sprint 5 is the final development sprint of the ISF Playground project, focused on closing the loop of the platform's virtual economy. This sprint introduces the "ISF Shop," a rewards-based e-commerce module where students can redeem the ISF Coins they have earned through their learning activities. This involves creating a student-facing storefront, a comprehensive backend for product and inventory management for Admins, and detailed reporting on the virtual currency's distribution and usage. The sprint also includes final integrations and system-wide refinements, such as security audits and performance optimization, to prepare the platform for its final production release.

#### **1.3. Sprint 5 Goals & Objectives**

1. **Launch a Functional Virtual Economy:** Implement the end-to-end ISF Shop module, allowing students to spend their earned ISF Coins on physical or digital rewards.  
2. **Empower Admins with E-Commerce Tools:** Provide Administrators with robust interfaces to manage shop products, control inventory levels, and track the flow of the virtual currency.  
3. **Provide Insightful Economic Reports:** Develop a "Coin Distribution Reports" module to give Admins a clear view of student engagement, coin circulation, and reward redemption patterns.  
4. **Finalize System Integrations:** Complete any remaining integrations with specified open-source applications.  
5. **Prepare for Production Release:** Conduct final security audits, performance optimization, and complete all necessary technical documentation to ensure a stable, secure, and maintainable platform.

---

### **2\. Target Users/Personas for Sprint 5 Features**

* **Student:** The primary user of the ISF Shop. Browses products, manages a shopping cart, and redeems ISF Coins to make purchases. Views their order history.  
* **Administrator (Admin):** The manager of the ISF Shop. Responsible for all CRUD operations on products, managing stock levels via the Inventory Management Module, and viewing all coin distribution and shop-related reports.  
  * *(Note: While the Admin role will handle these duties for this sprint, the system will be architected to potentially allow these permissions to be delegated to a future role like "Purchase Manager" or "Shop Manager".)*  
* 

---

### **3\. High-Level Sprint 5 Scope**

#### **3.1. What's In Scope for Sprint 5**

* **ISF Shop Module (Student Experience):**  
  * Access to the shop via a main menu button.  
  * Product catalog view with grid layout, filtering, and sorting.  
  * Detailed product view page.  
  * A multi-item shopping cart system.  
  * A secure checkout process using ISF Coins.  
  * A "My Purchases" section for students to view their order history and digital receipts.  
*   
* **ISF Shop & Inventory Management (Admin Experience):**  
  * An interface for Admins to perform full CRUD operations on shop products (Create, Read, Update, Delete).  
  * An Inventory Management dashboard to view and update stock levels for all products.  
  * Automatic stock decrementation upon student purchase.  
*   
* **Coin Distribution Reports:**  
  * A new section within the Admin's main "Reports" dashboard.  
  * Metrics on coin earning vs. spending, leaderboards, and top-redeemed products.  
  * A detailed transaction history view for any student.  
*   
* **Final Integrations & Refinements:**  
  * Integration of specified Open Source applications (pending clarification).  
  * Execution of system-wide security audits and performance optimization.  
  * Completion of all technical documentation.  
* 

#### **3.2. What's Out of Scope for Sprint 5**

* **Physical Item Fulfillment & Logistics:** This sprint covers the digital purchase and order generation only. The physical process of fulfilling and delivering items to students is outside the application's scope.  
* **Payment Gateways:** The shop uses the internal ISF Coin virtual currency exclusively. No real-money transactions are involved.  
* **Supplier/Vendor Management:** There will be no functionality to manage suppliers or purchase orders for shop inventory.

---

### **4\. Global Elements & Standards**

All global elements, standards, and conventions (Branding, Accessibility, Responsive Design, UI Components) established in the Sprint 2 MPSD remain in effect. The following standards are specific to the new features in Sprint 5\.

* **E-Commerce UI Standards:** The ISF Shop will adhere to modern, user-friendly e-commerce design patterns. This includes a clear visual hierarchy, intuitive navigation, high-quality product imagery, and a streamlined, multi-step checkout process to minimize friction for the student users.

---

### **Detailed Feature & Module Breakdown**

#### **8\. ISF Shop Module (Student Experience)**

* **Feature ID:** S5-SHOP-STU-001  
* **Feature Name:** ISF Shop \- Student Storefront & Purchasing  
* **User Story 1:** "As a Student, I want to be able to access the ISF Shop from my main homepage so I can browse the rewards I can get with my coins."  
  * **AC1.1:** A button labeled "ISF Shop" is present on the student's main menu/homepage.  
  * **AC1.2:** Clicking this button navigates the student to the main shop landing page.  
*   
* **User Story 2:** "As a Student, when I'm in the shop, I want to easily see all the available items, with pictures and prices, and be able to filter or sort them to find what I want."  
  * **AC2.1:** The shop landing page displays products in a clear grid layout, with each product shown as a card.  
  * **AC2.2:** Each product card displays the product image, name, and its cost in ISF Coins.  
  * **AC2.3:** Filtering options are available (e.g., by category: "Toys," "Stationery").  
  * **AC2.4:** Sorting options are available (e.g., "Price: Low to High," "Price: High to Low").  
*   
* **User Story 3:** "As a Student, I want to add multiple items to a shopping cart before I decide to buy, so I can plan my purchases."  
  * **AC3.1:** Each product card has an "Add to Cart" button.  
  * **AC3.2:** A persistent shopping cart icon in the header shows the number of items currently in the cart.  
  * **AC3.3:** Clicking the cart icon navigates to a "My Cart" view where students can review items, adjust quantities, or remove items.  
*   
* **User Story 4:** "As a Student, during checkout, I want to see a clear summary of my purchase and my coin balance before I confirm, so I know exactly what I'm spending."  
  * **AC4.1:** The checkout process clearly displays the total cost of the cart.  
  * **AC4.2:** The UI shows the student's current coin balance, the transaction cost, and the remaining balance after the purchase.  
  * **AC4.3:** A "Confirm Purchase" button is present to finalize the transaction. Clicking it deducts the coins from the student's wallet.  
*   
* **User Story 5:** "As a Student, after I buy something, I want to get a confirmation and be able to see a history of all my purchases."  
  * **AC5.1:** After a successful purchase, a confirmation screen/modal is displayed.  
  * **AC5.2:** An in-app notification is generated for the purchase.  
  * **AC5.3:** A "My Purchases" section is available within the Shop, listing all past orders with details (items, cost, date).  
*   
* **A. Shop Main Page:**  
  * **Element 1: Filter & Sort Panel:** A sidebar or top bar with dropdowns for "Filter by Category" and "Sort By."  
  * **Element 2: Product Grid:** A responsive grid displaying multiple "Product Card" components.  
  * **Element 3: Product Card:**  
    * **Content:** Product Image, Product Name, Cost in ISF Coins (e.g., "50 ✨").  
    * **Interaction:** Clicking the card navigates to the Product Detail Page.  
    * **Action Button:** "Add to Cart." This button will be disabled and display "Out of Stock" if the inventory is zero.  
  *   
  * **Element 4: Shopping Cart Icon:** Persistently visible in the header, with a badge showing the item count.  
*   
* **B. Product Detail Page:**  
  * **Layout:** Larger product image on the left, details on the right.  
  * **Content:** Product Name, Image Gallery (if multiple images), long description, Cost in ISF Coins.  
  * **Action Button:** "Add to Cart."  
*   
* **C. My Cart Page:**  
  * **Layout:** A table listing all items in the cart.  
  * **Columns:** Item, Price, Quantity (with \+/- controls), Total.  
  * **Summary:** Displays the total cost of all items in the cart.  
  * **Action Buttons:** "Continue Shopping," "Proceed to Checkout."  
*   
* **D. Checkout Page:**  
  * **Layout:** A final confirmation summary.  
  * **Content:** List of items, Total Cost, "Your Current Balance: \[X\] Coins," "Cost of this order: \[Y\] Coins," "Your Balance After Purchase: \[Z\] Coins."  
  * **Action Button:** "Confirm Purchase."  
*   
* **E. My Purchases Page:**  
  * **Layout:** A list of past orders, newest first.  
  * **Order Item:** Displays Order ID, Date of Purchase, Total Cost, and a list of items in that order.  
*   
* **Happy Path: Student Purchases an Item**  
  1. **User Action:** Clicks "ISF Shop" from the main menu. Clicks "Add to Cart" on an item.  
  2. **UI Changes:** The item is added. The cart icon badge increments.  
  3. **User Action:** Clicks the cart icon, then clicks "Proceed to Checkout."  
  4. **UI Changes:** Navigates to the Checkout page, which displays the final cost and balance summary.  
  5. **User Action:** Clicks "Confirm Purchase."  
  6. **System Response (Backend):** Validates that the student has enough coins. Creates an order record. Decrements the inventory for the purchased item. Deducts the coins from the student's wallet.  
  7. **UI Changes:** A success confirmation is shown. The user is redirected to their "My Purchases" page. An in-app notification is sent.  
*   
* GET /api/shop/products?category={cat}\&sortBy={price\_asc} – Get list of available products with filters.  
* GET /api/shop/products/{productId} – Get details for a single product.  
* POST /api/shop/cart – Add an item to the user's cart.  
* GET /api/shop/cart – View the user's current cart.  
* POST /api/shop/checkout – Finalize the purchase.  
* GET /api/shop/purchases – Get the student's order history.

---

#### **9\. ISF Shop Module (Admin Management)**

* **Feature ID:** S5-SHOP-ADM-001  
* **Feature Name:** ISF Shop \- Product Management  
* **User Story 1 (Admin):** "As an Admin, I need an interface where I can add new products to the ISF Shop, including their name, description, picture, and price in ISF Coins."  
  * **AC1.1:** A "Manage Shop" section is available in the Admin dashboard.  
  * **AC1.2:** This section has a "+ Add New Product" button that opens a product creation form.  
  * **AC1.3:** The form includes fields for Product Name, Description, Category, Image Upload, and Cost in ISF Coins.  
  * **AC1.4:** The Admin can save the new product, making it visible in the student storefront.  
*   
* **User Story 2 (Admin):** "As an Admin, I need to be able to edit the details of existing products or remove them from the shop if they are no longer available."  
  * **AC2.1:** The "Manage Shop" page displays a list of all existing products.  
  * **AC2.2:** Each product in the list has "Edit" and "Delete" actions.  
  * **AC2.3:** "Edit" opens the product form with the existing data pre-filled.  
  * **AC2.4:** "Delete" removes the product from the shop (with a confirmation prompt).  
*   
* **A. Manage Shop Landing Page (Admin):**  
  * **Layout:** A table displaying all shop products.  
  * **Columns:** Product Image (thumbnail), Product Name, Category, Cost (Coins), Current Stock.  
  * **Actions per row:** "Edit," "Delete."  
  * **Header Action:** "+ Add New Product" button.  
*   
* **B. Add/Edit Product Form:**  
  * **Fields:**  
    * Product Name (Text Input, Required).  
    * Product Description (Text Area).  
    * Product Category (Dropdown/Text Input).  
    * Product Image (File Upload, supports JPG/PNG).  
    * Cost in ISF Coins (Number Input, Required).  
    * Initial Stock Quantity (Number Input, Required \- for new products, linked to Inventory).  
  *   
  * **Action Buttons:** "Save Product," "Cancel."  
* 

---

#### **10\. Inventory Management Module (Admin)**

* **Feature ID:** S5-INV-ADM-001  
* **Feature Name:** Inventory Management  
* **User Story 1 (System):** "As a System, every time a student successfully purchases an item, I must automatically decrease the stock quantity for that item in the inventory."  
  * **AC1.1:** A successful transaction via the POST /api/shop/checkout endpoint triggers an inventory update.  
  * **AC1.2:** The stockQuantity for the purchased product is decremented by the quantity purchased.  
*   
* **User Story 2 (Admin):** "As an Admin, I need a dashboard to view the current stock levels of all shop items and a way to manually update these quantities when we receive new stock."  
  * **AC2.1:** An "Inventory" tab or section is available in the "Manage Shop" area.  
  * **AC2.2:** This view displays a list of all products with their current stockQuantity.  
  * **AC2.3:** Each item has an "Update Stock" action. This opens a modal where the Admin can set a new total quantity for the item.  
*   
* **User Story 3 (System):** "As a System, when an item's stock reaches zero, I must prevent any further purchases of that item."  
  * **AC3.1:** The "Add to Cart" button for an item with stockQuantity of 0 is disabled in the student storefront.  
  * **AC3.2:** The item displays a clear "Out of Stock" label.  
  * **AC3.3:** The backend validation for the checkout process will fail if a student attempts to purchase an out-of-stock item.  
*   
* **A. Inventory Dashboard (Admin):**  
  * **Layout:** A table.  
  * **Columns:** Product Name, SKU (optional), Current Stock.  
  * **Action per row:** "Update Stock" button.  
*   
* **B. Update Stock Modal:**  
  * **Content:** Displays "Product Name: \[Name\]".  
  * **Field:** "Set New Stock Quantity:" (Number Input).  
  * **Action Buttons:** "Save Quantity," "Cancel."  
* 

---

#### **11\. Coin Distribution Reports (Admin)**

* **Feature ID:** S5-REP-ADM-001  
* **Feature Name:** Coin Distribution Reports  
* **User Story 1 (Admin):** "As an Admin, I want to see a high-level report on the overall coin economy, showing how many coins are being earned versus how many are being spent, so I can gauge the platform's engagement."  
  * **AC1.1:** A new "Coin Economy" tab is available in the main "Reports" dashboard.  
  * **AC1.2:** This dashboard displays key metrics like: Total Coins Earned (All Time), Total Coins Spent (All Time), and current Unspent Coins in circulation.  
*   
* **User Story 2 (Admin):** "As an Admin, I want to see which shop items are most popular and which students are the top earners and spenders, so I can understand user behavior."  
  * **AC2.1:** The report includes a list or chart of the "Top 10 Most Redeemed Items."  
  * **AC2.2:** The report includes a "Student Leaderboard" for both top coin earners and top coin spenders.  
*   
* **User Story 3 (Admin):** "As an Admin, I need to be able to look up the complete transaction history for any specific student, showing every time they earned and spent coins, so I can resolve any discrepancies."  
  * **AC3.1:** The report includes a searchable table of all students.  
  * **AC3.2:** Selecting a student displays a detailed transaction log for that student, showing the date, description (e.g., "Completed 'Art Task 1'", "Purchased 'Toy Car'"), and the coin amount (+/-).  
*   
* **A. Coin Economy Report Dashboard:**  
  * **Element 1: KPI Cards:** Large display cards for "Total Earned," "Total Spent," "Total in Circulation."  
  * **Element 2: Charts:** A bar chart for "Most Purchased Items" and a pie chart for "Top Spending Categories."  
  * **Element 3: Leaderboard Tables:** Simple tables for "Top Earners" and "Top Spenders."  
  * **Element 4: Student Transaction History:** A searchable student list that, upon selection, populates a detailed transaction log table.  
* 

---

#### **12\. Open Source App Integration (Placeholder)**

* **Feature ID:** S5-INT-OSS-001  
* **Feature Name:** Final Open Source App Integration

This feature is a placeholder to cover the final integration of specified open-source tools as per the project roadmap. The exact scope, user stories, and acceptance criteria are pending clarification from the client. The implementation details will be defined once the specific applications and their integration goals are identified. This will be formally addressed in the "Questions for Client Clarification" section.

---

#### **13\. Non-Functional Requirements for Sprint 5**

* **Security Audits:** A comprehensive security audit will be conducted on the entire platform, with a special focus on the new ISF Shop module. This includes checks for vulnerabilities in the transaction handling process, access control for the admin panels, and protection of student data. This may involve engaging a third-party security firm to perform penetration testing.  
* **Performance Optimization:** The development team will conduct a full performance review of the application on the target hardware. This includes profiling database queries, optimizing frontend rendering times, and ensuring that the addition of the ISF Shop does not negatively impact the overall responsiveness of the platform.  
* **Documentation:** Comprehensive technical documentation will be finalized for all features developed across all five sprints. This includes API documentation (e.g., using Swagger/OpenAPI), a guide to the backend architecture, and comments in the codebase. User-facing documentation and training materials will also be prepared.

---

#### **14\. Questions for Client Clarification**

This section lists items that have emerged during the detailed specification process which require client input to finalize.

1. **Regarding the Wishlist Feature for the ISF Shop:**  
   * **Proposal:** We propose adding a "Wishlist" feature, allowing students to save items they want to buy later. This can be a strong driver for engagement, encouraging them to earn more coins to reach their goals.  
   * **Question:** The viability of a wishlist often depends on the stability of the product catalog. If shop items change very frequently or have limited, one-time stock, a wishlist could lead to student disappointment when an item becomes permanently unavailable. **Could you provide insight into the expected lifecycle and availability of the items that will be in the ISF Shop?** This will help us recommend the best implementation approach for a wishlist, or if it should be deferred.  
2. **Regarding Final Open Source App Integration:**  
   * **Context:** The Sprint 5 plan includes a deliverable for "Open Source App Integration." To properly scope and build this feature, we need more specific details.  
   * **Question:** **Could you please specify which open-source applications are intended for this final integration?** For each application, could you describe its purpose and the desired user experience (e.g., "Students should be able to launch \[App Name\] to perform \[specific task\]").

---

#### **15\. Sprint 5 Scope Summary & Sign-off**

This MPSD represents the complete plan for Sprint 5\. All stakeholders confirm their understanding and agreement with the scope, features, and requirements detailed within this document.

* **Client (ISF Representative):**  
  * Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  * Signature: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  * Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
*   
* **Project Manager:**  
  * Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  * Signature: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  * Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
*   
* **Lead Developer:**  
  * Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  * Signature: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  * Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
* 


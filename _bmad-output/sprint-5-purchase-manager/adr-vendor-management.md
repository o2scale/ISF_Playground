# Architecture Decision Record: Vendor Management & Shop Item Extension

## Context
The Purchase Manager Workflow Enhancement requires strict control over item creation and vendor management.
*   **Admins** define items and approve 3 vendors per item with a max price.
*   **Vendors** are currently an implicit concept (text fields in the screenshot?) or need to be an explicit entity.
*   **ShopItems** need to store this new metadata.

## Options
### Option A: Embedded Vendor Data
Store vendor details (Name, Phone) directly in the `ShopItem` document as an array of objects.
*   *Pros:* Simple, fast reads, matches the "3 slots" UI paradigm.
*   *Cons:* Data duplication (same vendor for multiple items), hard to update vendor phone number globally, no central vendor management.

### Option B: Relational Vendor Model (Ref)
Create a new `Vendor` collection and reference `ObjectId`s in `ShopItem`.
*   *Pros:* Single source of truth for vendor details, central management, scalable.
*   *Cons:* Requires new CRUD endpoints for Vendors, slight complexity in "New Item" UI (need to search/create vendors).

### Option C: Hybrid (Snapshot)
`Vendor` collection exists, but `ShopItem` stores a snapshot of the vendor details at the time of assignment.
*   *Pros:* Historical accuracy.
*   *Cons:* Complexity of synchronization.

## Discussion (Architect & Dev)
**Architect:** "Option B is the only scalable choice. If a vendor changes their phone number, we shouldn't have to update 50 ShopItems. The UI shows 'Supplier Name' and 'Phone No' - this implies we should be able to pick from existing or create new. We need a `Vendor` model."

**Dev:** "Agreed. But the UI in the screenshot looks like simple text inputs. If we go with Option B, the 'New Item' form needs a 'Select or Create Vendor' component, not just text fields. Is the client expecting free-text input?"

**Architect:** "The requirement says 'Vendor CRUD is only by admin'. This implies a central list. The 'New Item' UI might look like text fields, but for data integrity, it *must* write to/read from a central Vendor table. Let's strictly define `Vendor` as a separate entity."

## Decision
**Adopt Option B (Relational Vendor Model).**
1.  **New Model:** `Vendor` { name, phone, address, ... }
2.  **ShopItem Schema:** Add `approvedVendors: [{ vendor: Ref<Vendor>, rank: Number }]` (or similar).
3.  **UI Implication:** The "Suppliers name" input in the Admin form will be an Autocomplete/Dropdown fetching from `vendors` collection, with a "Create New" option.

## Trade-offs
*   **Complexity:** Higher initial dev effort (Vendor CRUD).
*   **Integrity:** Much higher. Prevents spelling errors in vendor names.
*   **UX:** Slightly more complex interaction than plain text fields, but better long-term.

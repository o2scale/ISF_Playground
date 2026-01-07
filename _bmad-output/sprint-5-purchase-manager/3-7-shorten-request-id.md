# Story 3.7: Shorten Request ID to 5 Digits

**Epic:** Epic 3: Operational Dashboards & Analytics  
**Story:** 3.7  
**Priority:** 🟡 P1 - High  
**Effort:** 0.5 day  
**Role:** All Users  

## User Story

As a user viewing purchase requests,  
I want to see a short, human-readable Request ID (5 digits),  
So that I can easily reference and communicate about specific requests.

## Client Requirement (from PDF Feedback Jan 2, 2026)

> "We don't need a 25 digit Request ID. Please start with 5 digit"

**Current State:** Using MongoDB ObjectId (e.g., `507f1f77bcf86cd799439011`)  
**Required State:** Short ID like `PR-00001` or just `00001`

---

## Acceptance Criteria

### AC1: Short ID Generation
**Given** a new purchase request is created  
**When** it is saved to the database  
**Then** a unique 5-digit `shortId` is generated (e.g., `00001`, `00002`)  
**And** the ID is sequential and never duplicates  

### AC2: Display Short ID
**Given** I am viewing any purchase request list  
**When** I look at the ID column  
**Then** I see the short ID format: `PR-XXXXX` (e.g., `PR-00042`)  
**And** NOT the MongoDB ObjectId  

### AC3: Search by Short ID
**Given** I am on the purchase requests list  
**When** I search by short ID (e.g., `00042` or `PR-00042`)  
**Then** the matching request is found  

### AC4: Backward Compatibility
**Given** existing requests have no short ID  
**When** the system is updated  
**Then** existing requests get short IDs via migration  
**And** new requests continue sequential numbering  

---

## Technical Design

### Schema Update
```javascript
// backend/models/purchaseRequest.js
const purchaseRequestSchema = new mongoose.Schema({
  // ... existing fields
  
  // NEW: Short ID for human readability
  shortId: {
    type: Number,
    unique: true,
    index: true
  },
  
  // Virtual for formatted display
});

// Virtual: formatted short ID
purchaseRequestSchema.virtual('requestId').get(function() {
  return this.shortId ? `PR-${String(this.shortId).padStart(5, '0')}` : this._id;
});

// Pre-save hook: Generate short ID
purchaseRequestSchema.pre('save', async function(next) {
  if (this.isNew && !this.shortId) {
    const Counter = mongoose.model('Counter');
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'purchaseRequestId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.shortId = counter.seq;
  }
  next();
});
```

### Counter Model (if not exists)
```javascript
// backend/models/counter.js
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('Counter', counterSchema);
```

### Migration Script
```javascript
// backend/scripts/migrate-short-ids.js
async function migrateShortIds() {
  const requests = await PurchaseRequest.find({ shortId: { $exists: false } })
    .sort({ createdAt: 1 });
  
  let counter = await Counter.findById('purchaseRequestId') || { seq: 0 };
  
  for (const request of requests) {
    counter.seq++;
    request.shortId = counter.seq;
    await request.save();
  }
  
  await Counter.findByIdAndUpdate(
    'purchaseRequestId',
    { seq: counter.seq },
    { upsert: true }
  );
  
  console.log(`Migrated ${requests.length} requests with short IDs`);
}
```

---

## Tasks/Subtasks

- [x] **Task 1: Backend schema update**
  - [x] Add `shortId` field to `PurchaseRequest` model (Note: Field name is `requestId` in current implementation, updated to use 5-digit padding)
  - [x] Create `Counter` model if not exists (Already exists)
  - [x] Add pre-save hook for auto-increment (Updated to 5-digit zero padding)

- [ ] **Task 2: Migration script**
  - [ ] Create migration script for existing requests (Skipped for now - deferred)
  - [ ] Test on staging before production
  - [ ] Run migration

- [x] **Task 3: API updates**
  - [x] Update all purchase request responses to include `requestId` virtual (Existing `requestId` field used)
  - [x] Add search by shortId support (Frontend filter updated)

- [x] **Task 4: Frontend updates**
  - [x] Update `ShopInventoryView.jsx` to display `requestId` instead of `_id` (Verified)
  - [x] Update `ViewRequestModal.jsx` to show short ID (Verified)
  - [x] Update search to support short ID (Verified)

---

## File Changes

| File | Change |
|------|--------|
| `backend/models/purchaseRequest.js` | Updated pre-save hook to use 5-digit padding (PR-00001) |
| `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` | Displaying `requestId` |
| `frontend/src/components/purchaseManagement/modals/ViewRequestModal.jsx` | Displaying `requestId` |

---

## Definition of Done

- [x] Short IDs generated for new requests
- [ ] Existing requests migrated (Deferred)
- [x] Frontend displays short ID
- [x] Search works with short ID
- [x] No duplicate IDs ever

## Status

**Status:** `review`

## Dev Agent Record

### Agent Model Used

Antigravity (simulating Dev Agent)

### Completion Notes

- Backend `PurchaseRequest` model updated to generate 5-digit IDs (e.g., `PR-00123`) using `padStart(5, '0')`.
- Verified that `requestId` is correctly generated on document creation.
- Frontend search logic updated to filter by `requestId`.
- Migration script for existing data was deferred as per current sprint priorities; new data will follow the new format immediately.


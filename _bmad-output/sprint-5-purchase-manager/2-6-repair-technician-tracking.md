# Story 2.6: Repair Technician & Delivered By Coach Tracking

**Epic:** Epic 2: Purchase Request Workflow Engine  
**Story:** 2.6  
**Priority:** 🟡 P1 - High  
**Effort:** 0.5 day  
**Role:** Purchase Manager, Coach  

## User Story

As an organization,  
We want to track the Repair Technician name for repair items AND which Coach delivered items to Balagruha,  
So that we have accountability and can reference this information if anything goes wrong.

## Client Requirement (from PDF Feedback Jan 2, 2026)

> "I think We should mention Name of Repair technician & delivered to balgruah by ______ Coach so that we can refer to it if anything goes wrong in the future wrt repair"

---

## Acceptance Criteria

### AC1: Repair Technician Field (For Repair Category)
**Given** a purchase request is in the "Repairs" category  
**When** the PM marks it as "Delivered to Store"  
**Then** the PM must enter the **Repair Technician Name**  
**And** this is stored with the request  

### AC2: Delivered By Coach Field
**Given** a purchase request is ready for final delivery  
**When** a Coach marks it as "Delivered to Balagruha"  
**Then** the system automatically captures **which Coach** made the delivery  
**And** the Coach's name is stored in `deliveredByCoachId`  

### AC3: Display Tracking Info
**Given** I am viewing a completed purchase request  
**When** I look at the request details  
**Then** I can see:
- For Repairs: Repair Technician Name
- Delivered By: Coach Name + Date

### AC4: Audit Trail
**Given** tracking information is captured  
**When** I view the status history  
**Then** I can see who made each status change (already exists via statusHistory)  
**And** the repair technician name is visible for repair items  

---

## Technical Design

### Schema Update
```javascript
// backend/models/purchaseRequest.js

// Add to schema:
{
  // ... existing fields
  
  // NEW: Repair-specific tracking
  repairTechnicianName: {
    type: String,
    required: false,  // Only required for 'Repairs' category at delivery
    trim: true
  },
  
  // NEW: Delivery tracking
  deliveredByCoachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false  // Set when status changes to delivered_balagruha
  },
  
  deliveredToBalagruhaAt: {
    type: Date,
    required: false
  }
}
```

### Controller Update
```javascript
// purchaseRequestController.js - updateStatus

// When status changes to delivered_store for Repairs category:
if (status === 'delivered_store' && request.category === 'Repairs') {
  if (!req.body.repairTechnicianName) {
    return res.status(400).json({
      success: false,
      message: 'Repair Technician Name is required for repair items'
    });
  }
  request.repairTechnicianName = req.body.repairTechnicianName.trim();
}

// When status changes to delivered_balagruha:
if (status === 'delivered_balagruha') {
  request.deliveredByCoachId = userId;
  request.deliveredToBalagruhaAt = new Date();
}
```

### Frontend: Repair Technician Input
```jsx
// When PM clicks "Mark Delivered to Store" for Repairs category:
{request.category === 'Repairs' && (
  <div className="form-group">
    <label>Repair Technician Name *</label>
    <input
      type="text"
      value={repairTechnicianName}
      onChange={(e) => setRepairTechnicianName(e.target.value)}
      placeholder="Enter technician name"
      required
    />
  </div>
)}
```

### Frontend: Display Tracking
```jsx
// ViewRequestModal.jsx - Add tracking info section
{request.status === 'delivered_balagruha' && (
  <div className="tracking-info">
    <h4>Delivery Tracking</h4>
    {request.repairTechnicianName && (
      <p><strong>Repair Technician:</strong> {request.repairTechnicianName}</p>
    )}
    <p>
      <strong>Delivered to Balagruha by:</strong> {request.deliveredByCoachId?.name || 'Unknown'}
    </p>
    <p>
      <strong>Delivered At:</strong> {formatDateTime(request.deliveredToBalagruhaAt)}
    </p>
  </div>
)}
```

---

## Tasks/Subtasks

- [ ] **Task 1: Backend schema update**
  - [ ] Add `repairTechnicianName` field to PurchaseRequest model
  - [ ] Add `deliveredByCoachId` field to PurchaseRequest model
  - [ ] Add `deliveredToBalagruhaAt` field to PurchaseRequest model

- [ ] **Task 2: Backend controller update**
  - [ ] Require `repairTechnicianName` for Repairs category at delivered_store
  - [ ] Auto-capture `deliveredByCoachId` at delivered_balagruha
  - [ ] Auto-capture `deliveredToBalagruhaAt` timestamp

- [ ] **Task 3: Frontend - Technician input**
  - [ ] Add input field in status update modal for Repairs
  - [ ] Validate technician name is provided
  - [ ] Send technician name in API request

- [ ] **Task 4: Frontend - Display tracking**
  - [ ] Show repair technician in ViewRequestModal
  - [ ] Show delivered by coach in ViewRequestModal
  - [ ] Add to PDF export if applicable

---

## File Changes

| File | Change |
|------|--------|
| `backend/models/purchaseRequest.js` | Add new fields |
| `backend/controllers/purchaseRequestController.js` | Update status transition logic |
| `frontend/src/components/purchaseManagement/modals/ViewRequestModal.jsx` | Display tracking info |
| `frontend/src/components/purchaseManagement/views/ShopInventoryView.jsx` | Technician input on status change |

---

## Definition of Done

- [ ] Repair Technician Name captured for Repairs
- [ ] Delivered By Coach auto-captured
- [ ] Both displayed in request details
- [ ] Validation works correctly
- [ ] Existing requests unaffected

## Status

**Status:** `pending`

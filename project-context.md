---
project_name: 'ISF_Playground'
user_name: 'Dev'
date: '2025-03-06'
sections_completed:
  - technology_stack
  - language_rules
  - framework_rules
  - testing_rules
  - quality_rules
  - workflow_rules
  - anti_patterns
  - orm_patterns
status: 'complete'
rule_count: 45
optimized_for_llm: true
---

# ISF Playground - Project Context

**Generated:** March 6, 2026  
**Project Type:** MERN Stack + Electron Desktop Application  
**Status:** Active Development
**Reconciled:** March 15, 2026
**Sprints Executed:** 1, 1.1, 2, 5, 5-PM, 6, S2-CQ
**Sprints NOT Executed:** 3 (Mobile App), 4 (Emergency/SOS)

---

## 1. Project Overview

ISF Playground is a comprehensive platform for managing a children's education and welfare organization. The platform serves multiple user roles with distinct functionalities:

- **Students**: Access learning courses, earn ISF Coins, shop for rewards
- **Coaches**: Manage student learning, grade submissions, track progress
- **Admins**: System administration, inventory management, user management
- **Purchase Managers**: Procurement workflow, vendor management, inventory reconciliation
- **Amma**: Student support, query management, voice communication
- **Medical/Sports/Music Staff**: Specialized departmental functions

### Technology Stack

**Backend:**
- Node.js 20+ with Express.js 4.21.2
- MongoDB 6.8.0 with Mongoose 8.10.2
- JWT Authentication (jsonwebtoken 9.0.2) + bcryptjs 3.0.2
- Testing: Jest 30.0.5 with mongodb-memory-server 10.2.0
- Validation: express-validator 7.2.1
- Security: helmet 8.0.0, express-rate-limit 7.4.1, cors 2.8.5
- File Uploads: AWS SDK 3.772.0 (S3)
- Face Recognition: @vladmandic/human 3.3.6, TensorFlow.js 4.22.0
- Logging: @logtail/pino 0.5.2

**Frontend:**
- React 19.0.0 with React Router 7.2.0
- State: Zustand 5.0.8
- UI: Radix UI primitives (complete component set)
- Styling: Tailwind CSS 3.4.17
- Forms: React Hook Form
- Icons: FontAwesome 6.7.2, Lucide React
- Testing: React Testing Library 16.2.0
- HTTP: Axios 1.7.9 with axios-retry 4.5.0
- Drag & Drop: @dnd-kit 6.3.1

**Desktop:**
- Electron 34.2.0

---

## 2. Critical Implementation Rules

### Language-Specific Rules (JavaScript/Node.js)

**Module System:**
- Backend: CommonJS (`require`/`module.exports`)
- Frontend: ES6 modules (`import`/`export`)
- NEVER mix module systems in the same file

**Async Patterns:**
- ALWAYS use `async/await` (never raw Promises with `.then()`)
- Wrap async operations in try-catch blocks
- Use `mongoose.Transactions` for multi-document operations affecting stock/coins

**Error Handling:**
- Backend controllers MUST use standard response format:
  ```javascript
  { success: false, message: 'Error description', error: error.message }
  ```
- NEVER throw raw errors in controllers - always return structured response
- Use express-validator for request validation (validationResult + format errors)

**Import Organization (Frontend):**
```javascript
// 1. React imports
import React from 'react';
// 2. External library imports  
import { useNavigate } from 'react-router-dom';
// 3. Internal imports
import { api } from '../api';
// 4. Styles
import './styles.css';
```

### ORM Patterns (Mongoose)

**Model Definition Pattern:**
```javascript
const schema = new mongoose.Schema({...}, { timestamps: true });
// ALWAYS use this pattern to prevent recompilation errors:
const Model = mongoose.models.ModelName || mongoose.model('ModelName', schema);
module.exports = Model;
```

**Schema Configuration:**
- ALWAYS add `timestamps: true` for createdAt/updatedAt
- ALWAYS add `toJSON: { virtuals: true }` and `toObject: { virtuals: true }`
- Use `index: true` on frequently queried fields
- Use text indexes for search: `name: 'text'`

**Indexes:**
```javascript
schema.index({ category: 1, isActive: 1 });  // Compound
schema.index({ name: 'text', description: 'text' });  // Text search
schema.index({ createdAt: -1 });  // Sorting
```

**Virtuals (Computed Fields):**
```javascript
schema.virtual('inStock').get(function () {
  return this.stock > 0;
});
```

**Hooks:**
```javascript
schema.pre('save', async function (next) {
  // Auto-generate fields, validate, etc.
  next();
});
```

**Methods:**
```javascript
// Instance method
schema.methods.methodName = function() { ... };

// Static method
schema.statics.findByCategory = function(category) { ... };
```

**Field Validation:**
```javascript
{
  type: String,
  required: [true, 'Custom error message'],
  trim: true,
  lowercase: true,
  match: [/regex/, 'Error message'],
  enum: {
    values: ['option1', 'option2'],
    message: '{VALUE} is not valid'
  },
  min: [0, 'Cannot be negative'],
  validate: {
    validator: Number.isInteger,
    message: 'Must be whole number'
  }
}
```

**Referencing Other Models:**
```javascript
fieldName: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'ModelName',
  required: true,
  index: true
}
```

### Framework-Specific Rules

**React Patterns:**
- Use functional components with hooks (no class components)
- Custom hooks in `src/hooks/` folder (use-toast.js, etc.)
- ALWAYS use `useCallback` for event handlers passed to child components
- Use Zustand for global state (do NOT use Context API for global state)
- Components in `src/components/` by domain (admin/, shop/, coach/)
- Pages in `src/pages/` as default exports

**React Hook Form Pattern:**
```javascript
const { register, handleSubmit, formState: { errors } } = useForm();
// register with validation rules
{...register("fieldName", { required: "Message" })}
```

**API Client Pattern (Axios):**
- Centralized in `src/api.js`
- Pre-configured baseURL and interceptors
- Use `api.get()`, `api.post()` - don't create new axios instances
- Handle errors with toast notifications

**Express Routes Pattern:**
```javascript
const express = require('express');
const router = express.Router();
const controller = require('../controllers/...');
const { authenticate } = require('../middleware/auth');
const checkPermission = require('../middleware/checkPermission');

router.get('/', authenticate, checkPermission('Resource', 'Read'), controller.method);
module.exports = router;
```

**Middleware Order (Critical):**
1. Security (helmet, cors, rate-limit)
2. Body parsers (express.json())
3. Authentication (authenticate)
4. Permission checks (checkPermission)
5. Validation
6. Route handlers

**RBAC Pattern:**
- ALWAYS use `checkPermission('Resource', 'Action')` middleware
- Actions: 'Create', 'Read', 'Update', 'Delete', 'Manage'
- Resource ownership checks in controllers (verify balagruhaId matches)

### Testing Rules

**Backend Testing:**
- Test files: `<feature>.test.js` or `<feature>_story<X>_<Y>.test.js`
- Location: `backend/tests/` or `backend/tests/wtf/unit/`
- Run single file: `npx jest tests/vendor.test.js`
- Run by pattern: `npx jest --testNamePattern="should create vendor"`
- Use `mongodb-memory-server` for isolated DB tests
- ALWAYS clear mocks in beforeEach: `jest.clearAllMocks()`

**Test Structure:**
```javascript
describe('Feature (Story X.Y)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should do something', async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

**Mocking Pattern:**
```javascript
jest.mock('../../api', () => ({
  apiMethod: jest.fn(),
}));
```

**Frontend Testing:**
- Located in `frontend/src/__tests__/`
- Use React Testing Library + Jest
- Mock API calls before rendering

**Coverage Requirements:**
- Backend: 70% minimum (branches, functions, lines, statements)
- Frontend: Run tests for all new features

### Code Quality & Style Rules

**Linting/Formatting:**
- NO ESLint/Prettier config - follow existing code patterns manually
- Use existing patterns in neighboring files as reference
- Consistency over personal preference

**Naming Conventions:**
- Backend files: camelCase.js (e.g., `purchaseRequestController.js`)
- Frontend components: PascalCase.jsx (e.g., `VendorManagement.jsx`)
- Models: PascalCase singular (e.g., `PurchaseRequest.js`)
- Functions: camelCase (e.g., `createRateLimiter`)
- Constants: UPPER_SNAKE_CASE
- Private methods: Prefix with `_` (e.g., `_internalHelper`)

**File Organization:**
- Backend: `controllers/`, `routes/v2/`, `models/`, `middleware/`
- Frontend: `components/<domain>/`, `pages/`, `hooks/`, `api.js`
- Tests: Mirror source structure or in `__tests__/` folders

**Documentation:**
- JSDoc for function documentation
- Inline comments for complex logic only
- NO unnecessary comments explaining obvious code

**Environment Variables (Backend .env):**
```
MONGODB_URI=mongodb://localhost:27017/isf_playground
JWT_SECRET=your_secret_key
PORT=5001
```

**Frontend Config (`src/config.js`):**
- Non-sensitive configuration only
- NEVER put secrets in frontend code

### Development Workflow Rules

**Commands:**
```bash
# Backend
npm start          # Production
npm run dev        # Development with nodemon
npm test           # Run all tests
npm run test:unit  # Unit tests only

# Frontend
npm start          # Development server (port 3000)
```

**API Versioning:**
- New endpoints: `/api/v2/...`
- Maintain backward compatibility with v1 where possible

**File Modification Rules:**
- ALWAYS read file before editing
- Use Edit tool for modifications (never Write without reading first)
- Prefer editing over creating new files
- Follow existing code style in neighboring files

### Critical Don't-Miss Rules (Anti-Patterns)

**NEVER DO:**

1. **Skip Transactions for Stock/Coin Operations**
   ```javascript
   // WRONG - No transaction
   await ShopItem.updateOne({ _id: id }, { $inc: { stock: -1 } });
   await Coin.create({ ... });
   
   // CORRECT - Use transaction
   const session = await mongoose.startSession();
   session.startTransaction();
   try {
     await ShopItem.updateOne({ _id: id }, { $inc: { stock: -1 } }).session(session);
     await Coin.create([{ ... }], { session });
     await session.commitTransaction();
   } finally {
     session.endSession();
   }
   ```

2. **Mix Module Systems**
   - Backend: NEVER use ES6 `import`/`export`
   - Frontend: NEVER use CommonJS `require`/`module.exports`

3. **Skip Permission Checks**
   - ALWAYS use `authenticate` middleware
   - ALWAYS use `checkPermission` for protected routes
   - Verify resource ownership in controllers (balagruhaId match)

4. **Use Magic Strings**
   - WRONG: `if (status === 'pending')`
   - CORRECT: Use constants/enums for statuses, roles, categories

5. **Commit .env Files**
   - NEVER commit `.env` files
   - Use `.env.example` for documentation

6. **Skip Validation**
   - ALWAYS validate request bodies with express-validator
   - ALWAYS validate file uploads (type, size)

7. **Use Raw Promises**
   - WRONG: `Model.find().then(result => ...)`
   - CORRECT: `const result = await Model.find()`

**Security Gotchas:**
- NEVER log sensitive data (passwords, tokens)
- ALWAYS sanitize user input before DB queries
- Use parameterized queries (Mongoose does this automatically)
- Validate ObjectId format: `mongoose.Types.ObjectId.isValid(id)`

**Performance Gotchas:**
- ALWAYS add DB indexes for frequently queried fields
- Use pagination for large lists (default: 20 items)
- Don't fetch entire documents when you only need specific fields
- Use `.lean()` for read-only queries to improve performance

---

## 3. Implementation Status by Sprint

### Sprint 1: Foundation ✅ COMPLETE
**Status:** Production Ready (backend full, some frontend gaps)

- Authentication & RBAC system (scope-based: own/balagruh/all)
- User management (9 roles: admin, coach, student, balagruha-incharge, purchase-manager, medical-incharge, sports-coach, music-coach, amma)
- Balagruha (Children's Home) management — full CRUD with UI
- Task management — full lifecycle with attachments/comments (149KB component)
- Machine registration & allocation — backend complete, NO frontend UI
- Facial recognition login — AES-256-GCM encrypted embeddings
- MAC address validation — code exists but DISABLED for development

**Known gaps:**
- Machine Management has no frontend pages
- RBAC scope filtering not uniformly applied across all controllers
- FR routes have TODO comments for RBAC permission checks

### Sprint 1.1: RBAC & FR Rebuild ✅ COMPLETE
- RBAC refactor with getScopeFilter() middleware
- Facial Recognition rebuild with encrypted storage and audit trail
- RBACContext + usePermission hook on frontend

### Sprint 2: LMS & Communication 🟡 MOSTLY COMPLETE (64% full, 24% partial)
**Status:** Core LMS fully functional. Amma role and WhatsApp NOT built.

#### Epic 1: Student Experience — 5/6 IMPLEMENTED
- ✅ Student homepage & course navigation (with offline caching)
- ✅ Computer Apps course interaction (hierarchy, quizzes)
- ⚠️ Art course — routes exist, Artweaver Electron IPC STUBBED (not connected)
- ✅ Spoken English — webcam recording, video submission
- ✅ Life Skills — WhatsApp-style voice recording, 60s limit, MCQ quizzes
- ✅ ISF Coin wallet — auto-awards, transaction history, real-time balance

#### Epic 2: Admin Course Management — 5/5 IMPLEMENTED
- ✅ Course creation & structure builder (Modules → Chapters → Content Items)
- ✅ Content management module (S3 upload, 500MB limit, metadata)
- ✅ Quiz & assessment builder (question bank, reorder, publish)
- ✅ Translation module (English → Telugu, item-by-item editor, progress tracking)
- ✅ Course publishing & archiving (Draft → Published → Archived with validation)

#### Epic 3: Coach Functionality — 3/4 IMPLEMENTED
- ✅ Course assignment interface (assign to students/Balagruhas)
- ✅ Grading interface (Art/Audio/Video submissions, flag/skip, rubrics)
- ⚠️ Manual coin award — implicit via grading auto-awards, no explicit manual API
- ✅ Coach reporting dashboard (overview stats, leaderboard)

#### Epic 4: Amma Role Enhancement — 0/4 IMPLEMENTED
- ⚠️ Amma role EXISTS in system but has no dedicated features
- ❌ Query management — NOT BUILT
- ❌ SLA task management & auto-reassignment — NOT BUILT
- ❌ Amma dashboard — NOT BUILT

#### Epic 5: System-Wide Features — 2/6 IMPLEMENTED
- ✅ In-app notification center (personal/common/system, badge, read tracking)
- ⚠️ Voice infrastructure — upload/recording works, no live calling
- ✅ Admin broadcast ("Mann ki Baat") — implemented as WTF pin category
- ❌ WhatsApp integration — NOT BUILT
- ⚠️ PM error handling — generic handlers only, no PM-specific logging
- ⚠️ Course reporting — basic metrics, not comprehensive

### Sprint 3-4: Mobile App & Emergency ❌ NOT EXECUTED
**Status:** MPSDs exist in docs/ but development was never started
- Sprint 3: Mobile app, FR attendance, mobile media, push notifications (FCM)
- Sprint 4: SOS emergency alerts, internal messaging, WhatsApp notifications, health tracking

### Sprint 5: E-Commerce & Shop ✅ COMPLETE (92%)
**Status:** Production Ready — 24/26 stories implemented
**Quality Score:** 97.25/100

### Sprint 5-PM: Purchase Manager Workflow ✅ COMPLETE
**Status:** All 20 stories implemented (reconciled 2026-03-15, sprint-status.yaml updated)

### Sprint 6: Bug Fixes & Medical Enhancements ✅ COMPLETE
**Status:** All 5 stories delivered — coach view, medical check-ins, hospital dropdown, post-production fixes

### S2-CQ: Code Quality & Security ✅ MOSTLY COMPLETE
**Status:** Security cleanup 100%, ORM standardization 100%, controller optimization 60%

#### Epic 1: Inventory Governance & Vendor Management

**Story 1.1: Vendor Data Model** ✅ DONE
- Vendor model with name, phone, address, active status
- Full CRUD API (Admin only)
- Phone validation for Indian numbers
- Product count aggregation
- Tests passing

**Story 1.2: ShopItem Schema Refactor** ✅ DONE
- `approvedVendors` array (up to 3 vendors per item)
- `maxPrice` field (rupees)
- `sellingPrice` field (coins)
- `purchaseCategory` field (6 categories)
- Fuzzy name matching to prevent duplicates
- Tests passing

**Story 1.3: Admin New Item UI** ✅ DONE
- Form with vendor dropdowns
- Price cap fields
- Image upload support
- Category selection
- Responsive design

#### Epic 2: Purchase Request Workflow Engine

**Story 2.1: Purchase Request Schema & State Machine** ✅ DONE
- 4-step lifecycle: pending → ordered → delivered_store → delivered_balagruha
- Role-based transition enforcement
- Status history tracking
- Multi-product support in single request
- Threshold analysis for automatic approval routing
- Tests passing

**Story 2.2: Staff Purchase Request UI** ✅ DONE
- Category-first selection (6 categories)
- Item dropdown filtered by category
- Priority level selection (High/Medium/Low)
- Deadline date picker
- File attachment support (up to 5 files)
- Multi-product request creation

**Story 2.3: Purchase Manager Fulfillment Actions** ✅ DONE
- "Mark Ordered" action
- "Mark Received at Store" action
- Stock update integration
- Inventory transaction logging
- Role-based action permissions

**Story 2.4: Request Priority & Deadline** ✅ DONE
- Priority field with colored badges
- Deadline field with date validation
- Dashboard sorting by priority
- Tests passing

**Story 2.5: Six Purchase Categories** ✅ DONE
- Categories: ISF Shop, Medicines, Repairs, Consumables, Infra, Others
- Category-based item filtering
- Separate requests per category enforced
- Category badges on dashboard
- Tests passing

**Story 2.6: Repair Technician Tracking** ✅ DONE
- Repair technician name field (required for Repairs category)
- Coach delivery tracking (auto-captured)
- Delivered to Balagruha timestamp

#### Epic 3: Operational Dashboards & Analytics

**Story 3.1: PM Operational Dashboard** ✅ DONE
- List view of all active requests
- Sorting by priority
- Status filtering
- Scorecard widget

**Story 3.2: Coach Dashboard** ✅ DONE
- "My Requests" view
- Digital Orders view (student purchases)
- Status filtering
- Date range filtering

**Story 3.3: Admin Master Inventory Report** ✅ DONE
- In Store vs Deployed stock view
- Low stock alerts
- Product categorization
- Export functionality

**Story 3.4: PM Category Tabs & Status Buckets** ✅ DONE
- Category tabs (6 categories)
- Status bucket tabs (Purchase Requests, On Going Order, Reached ISF Store, Delivered)
- Combined filtering

**Story 3.5: PM Bunched/Grouped View** ✅ DONE
- Toggle between List View and Bunched View
- Item aggregation across requests
- Total quantity display
- Expandable request details
- "Order All" functionality

**Story 3.6: Additional Status Tabs** ✅ DONE
- Present Stock tab
- Supplier List tab
- Most Consumed tab

**Story 3.7: Shorten Request ID** ✅ DONE
- 5-digit shortId format: PR-00001
- Auto-generated on creation
- Displayed throughout UI

**Story 3.8: Coach Filter** ✅ DONE
- Coach dropdown filter on PM dashboard
- Lists all coaches with requests

**Story 3.9: PM Navigation Badge** ✅ DONE
- Pending task count in sidebar
- Red/orange badge indicator
- Real-time updates

**Story 3.10: Column Reorder & UI Cleanup** ✅ DONE
- Date of Request in position 2
- Old stat cards removed
- Clean table layout

#### Epic 4: Inventory Control & Audit

**Story 4.1: Stock Reconciliation Tool** ✅ DONE
- Manual stock adjustment interface
- Reason code selection
- Inventory transaction logging
- Audit trail
- Tests passing

---

## 3. Data Models

### Core Models

**User**
- Authentication: email, passwordHash, role
- Profile: name, phone, avatar
- RBAC: role, permissions array
- Balagruha assignment: balagruhaIds[]

**Student**
- Personal info: name, age, DOB, photo
- Balagruha assignment
- Coin balance
- Progress tracking

**Balagruha**
- Location info: name, address, contact
- Assigned coaches
- Student count

### Sprint 5 Models

**Vendor** (`backend/models/vendor.js`)
```javascript
{
  name: String (required),
  phone: String (required, validated),
  address: String (required),
  active: Boolean (default: true),
  timestamps: true
}
```

**ShopItem** (`backend/models/shopItem.js`)
```javascript
{
  // Basic fields
  sku: String (unique),
  name: String (required),
  description: String,
  category: String (enum: SHOP_CATEGORIES),
  purchaseCategory: String (enum: 6 categories),
  
  // Pricing
  price: Number (coins),
  discountPrice: Number,
  maxPrice: Number (rupees),
  sellingPrice: Number (coins),
  
  // Inventory
  stock: Number,
  lowStockThreshold: Number (default: 10),
  
  // Sprint 5 additions
  approvedVendors: [{ vendorId, rank }], // Up to 3
  isPendingProduct: Boolean,
  createdInRequest: ObjectId,
  
  // Media
  images: [{ url, isPrimary, uploadedAt }],
  
  // Status
  isActive: Boolean,
  timestamps: true
}
```

**PurchaseRequest** (`backend/models/purchaseRequest.js`)
```javascript
{
  requestId: String (auto-generated, PR-XXXXX format),
  balagruhaId: Mixed (ObjectId or 'STOCK'),
  category: String (6 categories),
  priority: String (low/medium/high),
  deadline: Date,
  
  // Multi-product items
  items: [{
    productId: ObjectId,
    productName: String,
    productSKU: String,
    requestedQuantity: Number,
    currentStock: Number,
    estimatedUnitCost: Number,
    estimatedTotalCost: Number,
    receivedQuantity: Number,
    actualUnitCost: Number
  }],
  
  // Status workflow
  status: String (pending/ordered/delivered_store/delivered_balagruha/etc),
  statusHistory: [{ status, changedBy, changedAt, notes }],
  
  // Metadata
  requestedBy: ObjectId (User),
  reason: String,
  justification: String,
  attachments: [{ filename, fileUrl, uploadedAt }],
  
  // Approval/Rejection
  reviewedBy: ObjectId,
  reviewedAt: Date,
  reviewNotes: String,
  
  // Purchase details
  supplierName: String,
  invoiceNumber: String,
  purchaseDate: Date,
  
  // Story 2.6 tracking
  repairTechnicianName: String,
  deliveredByCoachId: ObjectId,
  deliveredToBalagruhaAt: Date,
  
  // Threshold analysis
  thresholdAnalysis: {
    maxItemCost: Number,
    totalOrderCost: Number,
    requiresApproval: Boolean
  },
  
  timestamps: true
}
```

**InventoryTransaction** (`backend/models/inventoryTransaction.js`)
```javascript
{
  productId: ObjectId (ref: ShopItem),
  transactionType: String (purchase/sale/adjustment/return/correction/purchase_request),
  quantity: Number (can be negative),
  previousStock: Number,
  newStock: Number,
  reference: { type, id },
  reason: String,
  notes: String,
  performedBy: ObjectId (User),
  timestamps: true
}
```

---

## 4. API Structure

### Sprint 5 Endpoints

**Vendor Management** (`/api/v2/vendors`)
- `POST /` - Create vendor (Admin only)
- `GET /` - List vendors with pagination, search, filters
- `GET /:id` - Get single vendor
- `PUT /:id` - Update vendor (Admin only)

**Purchase Requests** (`/api/v2/shop/admin/purchase-requests`)
- `GET /products/low-stock` - Get low stock products
- `POST /` - Create purchase request (multi-role)
- `GET /my` - Get own requests
- `GET /` - Get all requests (Admin/PM)
- `GET /pending-count` - Get pending count for badge
- `GET /stats` - Get statistics
- `GET /:id` - Get single request
- `PUT /:id` - Update request
- `DELETE /:id` - Delete request
- `PUT /:id/cancel` - Cancel request
- `POST /:id/approve` - Approve request (PM)
- `POST /:id/reject` - Reject request (PM)
- `POST /:id/complete` - Complete with stock update (PM)
- `PATCH /:id/status` - Update status (state machine)
- `POST /:id/assign-stock` - Assign from stock shortcut

**Inventory Management** (`/api/v2/shop/admin/inventory`)
- Stock reconciliation endpoints
- Transaction history
- Stock adjustment with audit trail

### Existing Endpoints (Sprint 1 & 2)

**Authentication** (`/api/auth`)
- Login/logout
- Facial recognition
- PIN-based student login
- Password reset

**User Management** (`/api/users`)
- CRUD operations
- Role assignment
- Balagruha assignment

**Shop** (`/api/shop/*`)
- Product catalog
- Cart management
- Order processing
- Coin transactions

**LMS** (`/api/lms/*`, `/api/courses/*`)
- Course management
- Content delivery
- Quiz system
- Progress tracking

---

## 5. Frontend Structure

### Key Pages

**Admin Pages**
- `InventoryManagement.jsx` - Admin inventory dashboard
- `MasterInventoryReport.jsx` - Stock report with low stock alerts
- `ProductManagement.jsx` - Product CRUD
- `VendorManagement.jsx` - Vendor CRUD
- `TransactionReports.jsx` - Analytics and reporting

**Purchase Manager Pages**
- `PMLowStock.jsx` - Low stock alerts
- `ShopAnalytics.jsx` - Dashboard analytics

**Coach Pages**
- `CoachRequestsDashboard.jsx` - My requests + Digital Orders
- `CoachDeliveries.jsx` - Delivery management

**Student Pages**
- Product catalog
- Shopping cart
- Order history
- Course access

### Component Organization

```
frontend/src/
├── components/
│   ├── admin/
│   │   └── inventory/
│   │       └── NewItemForm.jsx
│   ├── purchaseManagement/
│   │   ├── views/
│   │   └── modals/
│   ├── shop/
│   ├── coach/
│   └── student/
├── pages/
│   ├── VendorManagement.jsx
│   ├── InventoryManagement.jsx
│   ├── MasterInventoryReport.jsx
│   ├── CoachRequestsDashboard.jsx
│   └── CoachDeliveries.jsx
├── api.js
└── store/
```

---

## 6. Key Features Implemented

### Purchase Workflow (Complete)
1. Staff creates request with category → item → quantity → priority → deadline
2. PM sees request in dashboard with color-coded priority
3. PM marks as "Ordered" with optional notes
4. PM marks as "Delivered to Store" with repair technician name (if applicable)
5. Coach marks as "Delivered to Balagruha"
6. Stock updated automatically at each step
7. Full audit trail maintained

### Inventory Management (Complete)
- Manual stock adjustment with reason codes
- Automatic stock updates from purchase requests
- Low stock threshold alerts
- Master inventory report with deployed vs in-store
- Inventory transaction logging

### Vendor Management (Complete)
- Vendor CRUD (Admin only)
- Up to 3 approved vendors per product
- Product count per vendor
- Search and filter capabilities

### Dashboard Features (Complete)
- Category and status tabs
- List view vs Bunched view toggle
- Coach filtering
- Pending badge count
- Date range filtering
- Priority sorting

---

## 7. Testing Status

### Backend Tests

**Passing:**
- `vendor.test.js` - Vendor model validation
- `vendorController.test.js` - Vendor CRUD operations
- `purchaseRequest_story2_1.test.js` - Purchase request state machine
- `shopProduct_story2_5.test.js` - Category filtering
- `adminProductController_story1_2.test.js` - ShopItem with vendors
- `inventoryMasterReportRoutes.test.js` - Inventory reporting
- `stockReconciliationRoutes.test.js` - Stock adjustments
- `security-rbac.test.js` - Role-based access control

**Test Coverage:**
- Models: Full coverage
- Controllers: High coverage for Sprint 5 features
- Routes: Integration tests for key endpoints

### Frontend Tests
- Located in `frontend/src/__tests__/`
- Component tests for key UI components

---

## 8. What Remains (Reconciled 2026-03-15)

### Unbuilt Features from Executed Sprints

**Sprint 2 — Amma Role (Epic 4):**
- [ ] Amma query management system
- [ ] SLA-based task management & auto-reassignment
- [ ] Amma dashboard UI

**Sprint 2 — System Features:**
- [ ] WhatsApp API integration for notifications
- [ ] Live voice calling (infrastructure exists for upload only)
- [ ] Comprehensive course reporting/analytics

**Sprint 1 — Machine Management:**
- [ ] Frontend UI for machine CRUD operations
- [ ] Re-enable MAC address validation for production

**Sprint 2 — Partial Items:**
- [ ] Artweaver Electron IPC integration (stubbed)
- [ ] Explicit manual coin award API for coaches

### Unexecuted Sprints (3-4)

**Sprint 3 (Mobile App) — NOT STARTED:**
- [ ] Mobile app for Coaches/Admins/BICs
- [ ] FR-based attendance via photo upload
- [ ] Mobile media management
- [ ] Push notifications (FCM)

**Sprint 4 (Emergency) — NOT STARTED:**
- [ ] SOS emergency alert system (Desktop → Mobile)
- [ ] Internal messaging system
- [ ] WhatsApp-based notifications
- [ ] Student health tracking with SOS correlation

### Technical Improvements Needed

**Test Coverage (Updated 2026-03-15):**
- [x] Backend controller tests: purchaseRequestController (46 tests), userController (25 tests), inventoryController (19 tests)
- [x] Playwright E2E setup with login (5 tests) + purchase lifecycle (4 tests)
- [ ] Backend overall: target 70% (continue adding tests via BMAD dev-story cycle)
- [ ] Frontend overall: target 50%

**Code Quality (Updated 2026-03-15):**
- [x] Split frontend/src/api.js → 17 feature modules (184 exports preserved)
- [x] Added ErrorBoundary component
- [ ] Controller optimization story 1.3 completion (API response standardization)
- [ ] Consolidate dual drag-and-drop libraries (@dnd-kit + @hello-pangea/dnd)
- [ ] Consolidate dual icon libraries (FontAwesome + Lucide)

**Documentation (Updated 2026-03-15):**
- [x] Update architecture doc with current route paths
- [x] Create frontend specification document (UX Design Specification)
- [ ] Create unified product brief

---

## 9. Test Maintenance Rules

### MANDATORY: Test Discipline for All Agents

These rules apply to ALL code changes, whether via BMAD dev-story, quick-dev, or any other workflow:

1. **Before modifying any controller, service, or route:** Check if a corresponding test file exists in `backend/tests/`. If it does, read it to understand what's tested.

2. **After modifying code:** Run the corresponding test file. If tests fail due to YOUR changes (not pre-existing failures), update the tests to match the new behavior before committing.

3. **When adding new endpoints or features:** Write tests as part of the same commit. Do NOT defer test writing to a separate task.

4. **When removing or renaming functions/endpoints:** Delete or update the corresponding test cases. Do NOT leave tests for code that no longer exists.

5. **Test commands:**
   - Run specific test: `cd backend && npx jest tests/<file>.test.js --verbose`
   - Run all tests: `cd backend && npx jest --verbose`
   - Run with coverage: `cd backend && npx jest --coverage`
   - Run E2E: `cd frontend && npx playwright test`

6. **Pre-existing test failures:** 14 legacy test suites have pre-existing failures (before 2026-03-15 changes). These are NOT caused by recent work. When fixing these, treat each as its own task.

7. **Frontend changes:** When modifying React components that have test files in `frontend/src/__tests__/`, run those tests. When modifying API layer files in `frontend/src/api/`, verify imports still work.

### Test File Locations
- Backend unit/integration: `backend/tests/`
- Backend controller tests: `backend/tests/controllers/`
- Backend route tests: `backend/tests/routes/`
- Backend WTF tests: `backend/tests/wtf/unit/`
- Frontend component tests: `frontend/src/__tests__/`
- Frontend E2E: `frontend/e2e/`

---

## 10. Technical Debt & Notes

### Known Issues
1. Machine management has backend but no frontend UI
2. Amma role exists in system but has zero dedicated features
3. MAC address validation disabled in auth.js middleware
4. FR routes have TODO comments for RBAC permission checks
5. RBAC scope filtering not uniformly applied across all controllers
6. 14 pre-existing test suites failing (legacy, not caused by recent changes)

### Code Quality
- ESLint/Prettier not configured (follow existing patterns)
- No TypeScript (JavaScript throughout)
- Consistent naming conventions followed
- RBAC enforced at API level

### Performance Considerations
- MongoDB indexes on frequently queried fields
- Pagination for large lists (20 items default)
- Image optimization for uploads
- Virtuals for computed fields

### Security
- JWT authentication on all protected routes
- Role-based middleware (`checkPermission`)
- Resource ownership checks in controllers
- File upload validation and sanitization

---

## 10. Development Guidelines

### Adding New Features
1. Follow existing folder structure
2. Use existing middleware for auth/RBAC
3. Add tests for new functionality
4. Update this context document
5. Follow naming conventions:
   - Backend: camelCase (e.g., `purchaseRequestController.js`)
   - Frontend: PascalCase for components (e.g., `VendorManagement.jsx`)

### Database Changes
1. Update models with new fields
2. Add indexes for performance
3. Consider migration scripts for existing data
4. Update validation rules

### API Changes
1. Version new endpoints as `/api/v2/...`
2. Use standard response format: `{ success, data, message }`
3. Add appropriate middleware (auth, validation)
4. Document in code comments

---

## 11. Quick Reference

### Running the Application
```bash
# Backend
cd backend
npm start          # Production
npm run dev        # Development with nodemon

# Frontend
cd frontend
npm start          # Development server (port 3000)

# Tests
npm test           # Backend tests
npm test -- --verbose  # Verbose output
```

### Key Files to Know
- `backend/server.js` - Main server entry
- `backend/models/` - All Mongoose models
- `backend/controllers/` - Business logic
- `backend/routes/v2/` - API routes
- `frontend/src/api.js` - API client
- `frontend/src/AppRoutes.js` - Route definitions

### Environment Variables
Required in `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/isf_playground
JWT_SECRET=your_secret_key
PORT=5001
```

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

---

**Document maintained by:** Development Team  
**Last updated:** March 15, 2026
**Last reconciled:** March 15, 2026 (full sprint cross-reference against codebase)
**Reference:** See _bmad-output/sprint-reconciliation-report.md for detailed findings

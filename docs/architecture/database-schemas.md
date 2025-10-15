# Database Schemas Reference

## Overview
MongoDB collections with Mongoose schemas. Focus on Sprint 5 integration points.

## Core User Schema

### User Model (`backend/models/user.js`)
**Primary model for all users including students**

```javascript
{
  _id: ObjectId (auto)
  name: String (required, trimmed)
  email: String (unique, sparse, optional, lowercase, validated)
  userId: Number (unique, sparse, optional) // Custom ID for student login
  password: String (hashed via bcrypt, optional)
  role: Enum (required) // See roles below
  status: Enum ["active", "inactive"] (default: "active")
  lastLogin: Date

  // Security
  passwordResetToken: String
  passwordResetExpires: Date
  loginAttempts: Number (default: 0)
  lockUntil: Date

  // Student-specific
  age: Number (required if role=student)
  gender: Enum ["male", "female", "other"] (required if role=student)
  balagruhaIds: [ObjectId] (ref: Balagruha)
  parentalStatus: Enum ["has both", "has one", "has none", "has guardian", ""]
  guardianName1/2: String
  guardianContact1/2: String

  // References
  performanceReports: [ObjectId] (ref: Report)
  attendanceRecords: [ObjectId] (ref: Attendance)
  medicalRecords: [ObjectId] (ref: MedicalRecord)
  assignedMachines: [ObjectId] (ref: Machine)

  // Facial recognition
  facialData: {
    faceDescriptor: Array (128-dimensional Float32Array)
    createdAt: Date
  }

  timestamps: true
}
```

**Roles:**
```
"admin", "coach", "balagruha-incharge", "student",
"purchase-manager", "medical-incharge", "sports-coach",
"music-coach", "amma"
```

**Sprint 5 Extension Points:**
```javascript
// CAN SAFELY ADD:
shopPreferences: {
  favoriteCategories: [String],
  savedAddresses: [Address],
  notificationPreferences: Object
}

// Or keep cart server-side in separate Cart collection
```

## Coin Wallet Schema

### Coin Model (`backend/models/coin.js`)
See dedicated `coin-wallet-system.md` for full documentation.

**Key Fields for Shop:**
```javascript
{
  userId: ObjectId (ref: User)
  balance: Number (min: 0)
  transactions: [{
    type: "spent" | "earned" | "bonus" | "penalty" | ...
    amount: Number
    description: String
    source: "shop" | "wtf" | "attendance" | ...
    metadata: {
      orderId: ObjectId  // For shop transactions
      items: [ObjectId]
      purchaseDate: Date
    }
  }]
}
```

## Notification Schema

### Notification Model (`backend/models/notification.js`)
See dedicated `notification-system.md` for full documentation.

**Key Fields for Shop:**
```javascript
{
  category: "ISF_SHOP_UPDATE" | "COINS_AWARDED" | ...
  metadata: {
    relatedEntityId: ObjectId (order ID)
    actionUrl: "/shop/orders/:id"
    coinAmount: Number
  }
}
```

## WTF Module Schemas

### WTF Pin Model (`backend/models/wtfPin.js`)
**Wall of Fame content**

```javascript
{
  _id: ObjectId
  title: String (required)
  description: String
  author: ObjectId (ref: User, required) // Student who created
  contentType: Enum ["video", "audio", "image", "article", "text"]

  // Media URLs (S3)
  videoUrl: String
  audioUrl: String
  imageUrl: String
  thumbnailUrl: String
  articleContent: String
  textContent: String

  // Categorization
  category: String // Math, Science, Sports, etc.
  level: Number // Difficulty level
  course: ObjectId (ref: Course)

  // Visibility
  status: Enum ["draft", "pending", "approved", "rejected", "archived"]
  isPinned: Boolean (default: false)
  pinnedAt: Date
  pinnedBy: ObjectId (ref: User) // Coach/Admin who pinned

  // Engagement
  likes: Number (default: 0)
  views: Number (default: 0)

  // Expiration
  expiresAt: Date

  timestamps: true
}
```

**Indexes:** `{ author: 1, status: 1, isPinned: 1, createdAt: -1 }`

### WTF Submission Model (`backend/models/wtfSubmission.js`)
```javascript
{
  pinId: ObjectId (ref: wtf_pin, required)
  studentId: ObjectId (ref: User, required)
  submissionType: Enum ["video", "audio", "image", "text", "article"]
  contentUrl: String
  thumbnailUrl: String
  textContent: String

  status: Enum ["pending", "approved", "rejected"]
  reviewedBy: ObjectId (ref: User)
  reviewedAt: Date
  reviewComments: String

  coinsAwarded: Number (default: 0)
  coinTransactionId: ObjectId

  metadata: { duration, fileSize, mimeType }
  timestamps: true
}
```

### WTF Student Interaction Model (`backend/models/wtfStudentInteraction.js`)
```javascript
{
  pinId: ObjectId (ref: wtf_pin, required)
  studentId: ObjectId (ref: User, required)
  interactionType: Enum ["like", "view", "share", "bookmark"]

  // Like-specific
  isLiked: Boolean

  // View-specific
  viewCount: Number
  lastViewedAt: Date
  totalViewDuration: Number

  metadata: { deviceInfo, sessionId }
  timestamps: true
}
```

## Supporting Schemas

### Balagruha Model (`backend/models/balagruha.js`)
**Children's home locations**

```javascript
{
  name: String (required)
  location: String
  address: String
  capacity: Number
  currentOccupancy: Number
  inchargeId: ObjectId (ref: User)
  facilities: [String]
  status: Enum ["active", "inactive"]
  timestamps: true
}
```

### Machine Model (`backend/models/machine.js`)
**Computer tracking for student login validation**

```javascript
{
  name: String (required)
  macAddress: String (unique, required)
  status: Enum ["active", "inactive", "maintainence"]
  AssignedBalagruha: ObjectId (ref: Balagruha)
  assignedUsers: [ObjectId] (ref: User)
  location: String
  specifications: {
    processor, ram, storage, os
  }
  timestamps: true
}
```

### Role Model (`backend/models/role.js`)
**RBAC permissions**

```javascript
{
  roleName: String (required, unique)
  description: String
  permissions: [{
    module: String // "users", "tasks", "machines", "shop"
    actions: [String] // ["create", "read", "update", "delete"]
  }]
  isSystemRole: Boolean (default: false)
  timestamps: true
}
```

## Sprint 5 New Schemas

### ShopItem Model (TO CREATE)
```javascript
{
  name: String (required)
  description: String
  category: Enum ["clothing", "books", "stationery", "sports", "technology", "other"]
  price: Number (required, min: 0) // In coins

  // Media
  images: [String] // S3 URLs
  thumbnailUrl: String

  // Inventory
  stockQuantity: Number (default: 0)
  isAvailable: Boolean (default: true)

  // Restrictions
  availableFor: [String] // ["student", "coach", "all"]
  minCoinBalance: Number // Minimum balance required
  maxQuantityPerUser: Number

  // Metadata
  tags: [String]
  sku: String (unique)
  weight: Number
  dimensions: { length, width, height }

  // Visibility
  isFeatured: Boolean (default: false)
  isNewArrival: Boolean (default: false)

  // Audit
  createdBy: ObjectId (ref: User)
  updatedBy: ObjectId (ref: User)

  timestamps: true
}
```

### Order Model (TO CREATE)
```javascript
{
  orderNumber: String (unique, auto-generated)
  userId: ObjectId (ref: User, required)

  items: [{
    shopItemId: ObjectId (ref: ShopItem)
    name: String // Snapshot at time of purchase
    price: Number
    quantity: Number
    subtotal: Number
  }]

  // Pricing
  totalCost: Number (required)
  paidWithCoins: Number (required)

  // Status
  status: Enum [
    "confirmed",    // Order placed
    "processing",   // Being prepared
    "ready",        // Ready for pickup
    "completed",    // Delivered
    "cancelled"     // Cancelled
  ]
  statusHistory: [{
    status: String
    timestamp: Date
    updatedBy: ObjectId (ref: User)
    notes: String
  }]

  // Delivery
  deliveryMethod: Enum ["pickup", "balagruha_delivery"]
  deliveryAddress: {
    balagruhaId: ObjectId
    additionalNotes: String
  }

  // References
  coinTransactionId: ObjectId // Link to Coin transaction
  notificationIds: [ObjectId] // Link to notifications sent

  // Notes
  customerNotes: String
  adminNotes: String

  timestamps: true
}
```

### Cart Model (OPTIONAL - Can use localStorage instead)
```javascript
{
  userId: ObjectId (ref: User, required, unique)
  items: [{
    shopItemId: ObjectId (ref: ShopItem)
    quantity: Number (min: 1)
    addedAt: Date
  }]

  lastUpdated: Date
  expiresAt: Date // Auto-cleanup old carts
}
```

## Schema Relationships

### User → Coin → Order Flow
```
User (userId)
  ↓
Coin (userId)
  ↓ (spendCoins creates transaction)
Transaction (in Coin.transactions array)
  ↓ (metadata.orderId)
Order (_id)
  ↓ (coinTransactionId points back)
```

### WTF → Coin → Notification Flow
```
WTFPin (created by student)
  ↓ (when approved/pinned)
Coin (awardWtfCoins called)
  ↓
Transaction (type: "wtf_pin_creation")
  ↓
Notification (category: "WTF_PIN_ADDED" + "COINS_AWARDED")
  ↓ (WebSocket)
User sees notification in UI
```

## Index Strategy

### Critical Indexes
```javascript
// User
{ email: 1 }, { userId: 1 }, { role: 1, status: 1 }

// Coin
{ userId: 1 }, { "transactions.createdAt": -1 }

// Notification
{ userId: 1, isRead: 1, createdAt: -1 }

// WTFPin
{ author: 1, status: 1, isPinned: 1 }

// Sprint 5: Add
// ShopItem
{ category: 1, isAvailable: 1, price: 1 }

// Order
{ userId: 1, status: 1, createdAt: -1 }, { orderNumber: 1 }
```

## Data Validation

### Mongoose Validators (Current)
- Email: Regex pattern validation
- Enums: Strict enum validation
- Required fields: Schema-level required
- Min/Max: Number range validation

### Missing Validators (Technical Debt)
- No input sanitization
- No XSS prevention
- Weak password complexity
- No phone number format validation

## Migration Strategy for Sprint 5

### Backward Compatible Changes
```javascript
// User model - ADD optional fields
shopPreferences: {
  type: Object,
  default: {}
}

// Coin model - ADD "shop" to source enum
source: {
  type: String,
  enum: [...existing, "shop"]
}
```

### New Collections (No Migration Needed)
- `shop_items` - New collection
- `orders` - New collection
- `carts` - Optional new collection

## Summary

**Sprint 5 Schema Strategy:**
1. **Extend existing:** User (optional), Coin (add "shop" source)
2. **Create new:** ShopItem, Order, Cart (optional)
3. **Reuse:** Notification, Role (add "shop" module permissions)
4. **Link via:** ObjectId references + transaction metadata

**No breaking changes to Sprint 1 schemas required.**

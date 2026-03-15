# ISF Playground - Database Architecture

**Generated:** March 16, 2026
**Story:** 4.1 - Complete Model Schema Mapping
**Total Models:** 45
**Database:** MongoDB 6.8.0 with Mongoose 8.10.2

---

## Table of Contents

### Core Platform (17 models)
1. [User](#user-backendmodelsuserjs)
2. [Student](#student-backendmodelsstudentjs)
3. [Role](#role-backendmodelsrolejs)
4. [Balagruha](#balagruha-backendmodelsbalagruhajs)
5. [Attendance](#attendance-backendmodelsattendancejs)
6. [ActivityLog](#activitylog-backendmodelsactivitylogjs)
7. [Notification](#notification-backendmodelsnotificationjs)
8. [UserNotificationView](#usernotificationview-backendmodelsusernotificationviewjs)
9. [Schedules](#schedules-backendmodelsschedulesjs)
10. [Task](#task-backendmodelstaskjs)
11. [SportsTasks](#sportstasks-backendmodelssportstasksjs)
12. [TrainingSession](#trainingsession-backendmodelstrainingsessionjs)
13. [Machine](#machine-backendmodelsmachinejs)
14. [MachineAssignment](#machineassignment-backendmodelsmachineassignmentjs)
15. [MachineActiveLog](#machineactivelog-backendmodelsmachineactivelogjs)
16. [OfflineReqQueue](#offlinereqqueue-backendmodelsofflinereqqueuejs)
17. [StudentMoodTracker](#studentmoodtracker-backendmodelsstudentmoodtrackerjs)

### Shop/Procurement (8 models)
18. [Vendor](#vendor-backendmodelsvendorjs)
19. [ShopItem](#shopitem-backendmodelsshopitemjs)
20. [PurchaseRequest](#purchaserequest-backendmodelspurchaserequestjs)
21. [PurchaseOrders](#purchaseorders-backendmodelspurchaseordersjs)
22. [RepairRequests](#repairrequests-backendmodelsrepairrequestsjs)
23. [InventoryTransaction](#inventorytransaction-backendmodelsinventorytransactionjs)
24. [Cart](#cart-backendmodelscartjs)
25. [Order](#order-backendmodelsorderjs)

### LMS (8 models)
26. [Course](#course-backendmodelscoursejs)
27. [ContentLibrary](#contentlibrary-backendmodelscontentlibraryjs)
28. [Quiz](#quiz-backendmodelsquizjs)
29. [QuestionBank](#questionbank-backendmodelsquestionbankjs)
30. [Assignment](#assignment-backendmodelsassignmentjs)
31. [CourseAssignment](#courseassignment-backendmodelscourseassignmentjs)
32. [StudentProgress](#studentprogress-backendmodelsstudentprogressjs)
33. [Submission](#submission-backendmodelssubmissionjs)

### WTF/Gamification (5 models)
34. [WtfPin](#wtfpin-backendmodelswtfpinjs)
35. [WtfSettings](#wtfsettings-backendmodelswtfsettingsjs)
36. [WtfStudentInteraction](#wtfstudentinteraction-backendmodelswtfstudentinteractionjs)
37. [WtfSubmission](#wtfsubmission-backendmodelswtfsubmissionjs)
38. [Coin](#coin-backendmodelscoinjs)

### Facial Recognition (3 models)
39. [FaceEmbedding](#faceembedding-backendmodelsfaceembeddingjs)
40. [FRSession](#frsession-backendmodelsfrsessionjs)
41. [EmotionTracking](#emotiontracking-backendmodelsemotiontrackingjs)

### Medical/Health (4 models)
42. [Medical](#medical-backendmodelsmedicaljs)
43. [MedicalCheckIns](#medicalcheckins-backendmodelsmedicalcheckinsjs)
44. [Doctor](#doctor-backendmodelsdoctorjs)
45. [Hospital](#hospital-backendmodelshospitaljs)

---

## Core Platform

---

### User (`backend/models/user.js`)

**Collection:** users
**Timestamps:** yes
**toJSON/toObject virtuals:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| name | String | yes ("Name is required") | -- | -- | trim |
| email | String | no | -- | -- | unique, sparse, trim, lowercase, regex validated |
| userId | Number | no | -- | -- | unique, sparse |
| password | String | no | -- | -- | hashed via pre-save hook |
| role | String | yes ("Role is required") | -- | -- | enum: admin, coach, balagruha-incharge, student, purchase-manager, medical-incharge, sports-coach, music-coach, amma |
| status | String | no | "active" | -- | enum: active, inactive |
| lastLogin | Date | no | -- | -- | -- |
| passwordResetToken | String | no | -- | -- | -- |
| passwordResetExpires | Date | no | -- | -- | -- |
| loginAttempts | Number | no | 0 | -- | -- |
| lockUntil | Date | no | -- | -- | -- |
| age | Number | conditional | -- | -- | required if role === "student" |
| gender | String | conditional | -- | -- | enum: male, female, other; required if role === "student" |
| balagruhaIds | [ObjectId] | no | -- | Balagruha | array of refs |
| parentalStatus | String | no | "" | -- | enum: "has both", "has one", "has none", "has guardian", "" |
| guardianName1 | String | no | -- | -- | -- |
| guardianName2 | String | no | -- | -- | -- |
| guardianContact1 | String | no | -- | -- | -- |
| guardianContact2 | String | no | -- | -- | -- |
| performanceReports | [ObjectId] | no | -- | Report | array of refs |
| attendanceRecords | [ObjectId] | no | -- | Attendance | array of refs |
| medicalRecords | [ObjectId] | no | -- | MedicalRecord | array of refs |
| assignedMachines | [ObjectId] | no | -- | Machine | array of refs |
| facialDataUrl | String | no | -- | -- | S3 URL or local path for photo display |

**Indexes:** `{ balagruhaIds: 1 }`, `email` (unique, sparse), `userId` (unique, sparse)
**Virtuals:** none explicitly defined (virtuals enabled via schema options)
**Hooks:** pre-save -- hashes password via bcrypt if modified
**Instance Methods:**
- `comparePassword(candidatePassword)` -- bcrypt compare
- `isLocked()` -- checks lockUntil > now
- `incrementLoginAttempts()` -- increments attempts, locks after 10
- `resetLoginAttempts()` -- resets attempts and removes lock
- `canCreatePurchaseRequest()` -- checks allowed roles
- `hasBalagruhaAccess(balagruhaId)` -- checks balagruhaIds array
- `getAllBalagruhaIds()` -- returns balagruhaIds array
- `getBalagruhaIdsAsStrings()` -- returns stringified array

---

### Student (`backend/models/student.js`)

**Collection:** students
**Timestamps:** yes
**toJSON/toObject virtuals:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| name | String | yes | -- | -- | -- |
| age | Number | yes | -- | -- | -- |
| gender | String | yes | -- | -- | enum: Male, Female, Other |
| balagruhaId | ObjectId | no | -- | Balagruha | single ref |
| parentalStatus | String | no | -- | -- | enum: Has Both, Has One, Has None, Has Guardian |
| guardianContact | String | no | -- | -- | -- |
| performanceReports | [ObjectId] | no | -- | Report | array of refs |
| attendanceRecords | [ObjectId] | no | -- | Attendance | array of refs |
| medicalRecords | [ObjectId] | no | -- | MedicalRecord | array of refs |

**Indexes:** none explicitly defined
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### Role (`backend/models/role.js`)

**Collection:** roles
**Timestamps:** yes
**toJSON/toObject virtuals:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| roleName | String | yes | -- | -- | unique |
| permissions | Array | no | -- | -- | subdocument array (see below) |
| permissions[].module | String | yes | -- | -- | module name (e.g., "User Management", "shop") |
| permissions[].actions | [String] | no | -- | -- | enum: Create, Read, Update, Delete, Manage |
| permissions[].scope | String | no | "own" | -- | enum: own, balagruh, all |

**Indexes:** `roleName` (unique)
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### Balagruha (`backend/models/balagruha.js`)

**Collection:** balagruhas
**Timestamps:** yes
**toJSON/toObject virtuals:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| name | String | yes | -- | -- | trim, unique |
| location | String | yes | -- | -- | trim |
| assignedMachines | [ObjectId] | no | -- | Machine | array of refs |

**Indexes:** `name` (unique)
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### Attendance (`backend/models/attendance.js`)

**Collection:** attendances
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| balagruhaId | ObjectId | no | -- | Balagruha | -- |
| studentId | ObjectId | no | -- | User | -- |
| date | Date | no | Date.now | -- | -- |
| dateString | String | no | -- | -- | -- |
| status | String | yes | "absent" | -- | enum: present, absent |
| notes | String | no | -- | -- | -- |
| isManualOverride | Boolean | no | false | -- | index: true; FR rebuild support |
| frSessionId | ObjectId | no | null | FRSession | links to FR session if attempted |
| overrideReason | String | no | null | -- | enum: fr_failed, fr_unavailable, technical_issue, user_preference, emergency, other |
| markedBy | ObjectId | no | null | User | who manually marked attendance |

**Indexes:** `{ isManualOverride: 1 }` (field-level)
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### ActivityLog (`backend/models/activitylog.js`)

**Collection:** activitylogs
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| userId | ObjectId | no | -- | User | -- |
| action | String | yes | -- | -- | -- |
| timestamp | Date | no | Date.now | -- | -- |
| ipAddress | String | no | -- | -- | -- |
| details | String | no | -- | -- | -- |

**Indexes:** none
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### Notification (`backend/models/notification.js`)

**Collection:** notifications
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| userId | ObjectId | conditional | -- | User | required when isPersonal !== false |
| title | String | yes | -- | -- | trim |
| message | String | yes | -- | -- | trim |
| type | String | no | "PERSONAL" | -- | enum: PERSONAL, COMMON, ACHIEVEMENT, COACH_MESSAGE, SYSTEM_UPDATE |
| category | String | no | "GENERAL" | -- | enum: WTF_PIN_ADDED, COINS_AWARDED, ACHIEVEMENT_UNLOCKED, COACH_MESSAGE, ISF_SHOP_UPDATE, SYSTEM_ANNOUNCEMENT, TASK_ASSIGNED, ATTENDANCE_REMINDER, WORKSHOP_ANNOUNCEMENT, COMMUNITY_UPDATE, NEW_CONTENT, GENERAL |
| isRead | Boolean | no | false | -- | -- |
| isPersonal | Boolean | no | true | -- | -- |
| priority | String | no | "MEDIUM" | -- | enum: LOW, MEDIUM, HIGH, URGENT |
| metadata.pinId | ObjectId | no | -- | wtf_pin | -- |
| metadata.contentType | String | no | -- | -- | -- |
| metadata.pinnedBy | ObjectId | no | -- | User | -- |
| metadata.coinAmount | Number | no | -- | -- | -- |
| metadata.coinSource | String | no | -- | -- | -- |
| metadata.achievementId | String | no | -- | -- | -- |
| metadata.achievementName | String | no | -- | -- | -- |
| metadata.taskId | ObjectId | no | -- | task | -- |
| metadata.coachId | ObjectId | no | -- | User | -- |
| metadata.relatedEntityId | ObjectId | no | -- | -- | -- |
| metadata.relatedEntityType | String | no | -- | -- | -- |
| metadata.actionUrl | String | no | -- | -- | URL for click navigation |
| expiresAt | Date | no | null | -- | null = never expires |
| targetAudience | [String] | no | null | -- | roles or user IDs |
| isSystemWide | Boolean | no | false | -- | -- |
| isGlobal | Boolean | no | false | -- | -- |
| lastViewedAt | Date | no | null | -- | -- |
| createdAt | Date | no | Date.now | -- | explicit + timestamps |
| updatedAt | Date | no | Date.now | -- | explicit + timestamps |

**Indexes:**
- `{ userId: 1, isRead: 1, createdAt: -1 }`
- `{ type: 1, category: 1, createdAt: -1 }`
- `{ isGlobal: 1, createdAt: -1 }`
- `{ expiresAt: 1 }` (TTL index, expireAfterSeconds: 0)

**Virtuals:** none
**Hooks:** none
**Instance Methods:**
- `markAsRead()` -- sets isRead=true
- `markAsUnread()` -- sets isRead=false

**Static Methods:**
- `createPersonal(userId, title, message, category, metadata)`
- `createCommon(title, message, category, targetAudience, metadata)`
- `createSystemWide(title, message, category, metadata)`
- `getUserNotifications(userId, limit, skip)`
- `getUserNotificationsSmart(userId, limit, skip)`
- `getUnreadCount(userId)`
- `getSmartUnreadCount(userId)`
- `markAllAsRead(userId)`
- `cleanupExpired()`

---

### UserNotificationView (`backend/models/userNotificationView.js`)

**Collection:** usernotificationviews
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| userId | ObjectId | yes | -- | User | unique (one per user) |
| lastViewedAt | Date | no | Date.now | -- | -- |
| seenCommonNotifications | Array | no | -- | -- | subdocument array |
| seenCommonNotifications[].notificationId | ObjectId | no | -- | Notification | -- |
| seenCommonNotifications[].seenAt | Date | no | Date.now | -- | -- |
| lastCleanupAt | Date | no | Date.now | -- | -- |

**Indexes:** `{ userId: 1 }`, `{ lastViewedAt: -1 }`
**Virtuals:** none
**Hooks:** none
**Static Methods:**
- `getOrCreateUserView(userId)`
- `updateLastViewed(userId, timestamp)`
- `markCommonNotificationAsSeen(userId, notificationId)`
- `cleanupOldSeenNotifications()`

---

### Schedules (`backend/models/schedules.js`)

**Collection:** schedules (model name: "schedules")
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| balagruhaId | ObjectId | yes | -- | Balagruha | -- |
| assignedTo | ObjectId | yes | -- | User | -- |
| startTime | Date | yes | -- | -- | -- |
| endTime | Date | yes | -- | -- | -- |
| date | Date | yes | -- | -- | -- |
| title | String | no | -- | -- | -- |
| description | String | no | -- | -- | -- |
| timeSlot | String | no | -- | -- | -- |
| dateString | String | no | -- | -- | -- |
| status | String | no | "pending" | -- | enum: pending, inprogress, completed, cancelled |
| createdBy | ObjectId | yes | -- | User | -- |

**Indexes:** compound unique `{ balagruhaId: 1, assignedTo: 1, startTime: 1, endTime: 1, date: 1 }`
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### Task (`backend/models/task.js`)

**Collection:** tasks
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| title | String | yes | -- | -- | -- |
| description | String | yes | -- | -- | -- |
| drillOrExerciseType | String | no | "" | -- | for sports-based tasks |
| duration | String | no | "" | -- | for sports-based tasks |
| assignedUser | ObjectId | yes | -- | User | -- |
| createdBy | ObjectId | yes | -- | User | creator (Admin or Coach) |
| deadline | Date | yes | -- | -- | -- |
| priority | String | no | "medium" | -- | enum: low, medium, high |
| status | String | no | "pending" | -- | enum: pending, in progress, completed |
| labels | [String] | no | -- | -- | categorization tags |
| type | String | no | "general" | -- | enum: sports, fitness, nutrition, general, music, purchase, repair, medical |
| comments | Array | no | -- | -- | subdocument (see below) |
| comments[].user | ObjectId | no | -- | User | -- |
| comments[].comment | String | no | -- | -- | -- |
| comments[].attachments | Array | no | -- | -- | fileName, fileUrl, fileType, uploadedBy (ref User), uploadedAt |
| comments[].createdAt | Date | no | Date.now | -- | -- |
| attachments | Array | no | -- | -- | fileName, fileUrl, fileType, uploadedBy (ref User), uploadedAt |
| performanceMetrics.time | String | no | "" | -- | -- |
| performanceMetrics.score | String | no | "" | -- | -- |
| performanceMetrics.repetitions | String | no | "" | -- | -- |
| machineDetails | String | no | "" | -- | for purchase orders |
| vendorDetails | String | no | "" | -- | for purchase orders |
| costEstimate | Number | no | 0 | -- | for purchase orders |
| requiredParts | String | no | "" | -- | for purchase orders |
| repairDetails | String | no | -- | -- | for repairs |
| balagruhaId | ObjectId | no | -- | Balagruha | for medical tasks |
| students | [ObjectId] | no | -- | User | for medical tasks |

**Indexes:** none explicitly defined
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### SportsTasks (`backend/models/sportsTasks.js`)

**Collection:** sports_tasks (model name: "sports_tasks")
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| title | String | yes | -- | -- | -- |
| description | String | yes | -- | -- | -- |
| drillOrExerciseType | String | no | "" | -- | -- |
| duration | String | no | "" | -- | -- |
| assignedUser | ObjectId | yes | -- | User | -- |
| createdBy | ObjectId | yes | -- | User | -- |
| deadline | Date | yes | -- | -- | -- |
| priority | String | no | "medium" | -- | enum: low, medium, high |
| status | String | no | "pending" | -- | enum: pending, in progress, completed |
| comments | Array | no | -- | -- | subdoc: user (ref User), comment, attachments[], createdAt |
| attachments | Array | no | -- | -- | fileName, fileUrl, fileType, uploadedBy (ref User), uploadedAt |
| performanceMetrics.time | String | no | "" | -- | -- |
| performanceMetrics.score | String | no | "" | -- | -- |
| performanceMetrics.repetitions | String | no | "" | -- | -- |

**Indexes:** none
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### TrainingSession (`backend/models/trainingSession.js`)

**Collection:** training_sessions (model name: "training_sessions")
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| title | String | yes | -- | -- | -- |
| description | String | yes | -- | -- | -- |
| date | Date | yes | -- | -- | -- |
| location | String | no | "" | -- | -- |
| labels | [String] | no | -- | -- | -- |
| type | String | no | "general" | -- | enum: sports, fitness, nutrition, general, music |
| drillsAndExercises | String | no | "" | -- | -- |
| notificationPreferences | [String] | no | "" | -- | -- |
| status | String | no | "active" | -- | enum: active, cancelled |
| createdBy | ObjectId | yes | -- | User | -- |
| balagruhaId | ObjectId | yes | -- | Balagruha | -- |
| assignedStudents | [ObjectId] | no | -- | User | array of student IDs |

**Indexes:** none
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### Machine (`backend/models/machine.js`)

**Collection:** machines
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| machineId | String | yes | -- | -- | unique |
| macAddress | String | yes | -- | -- | unique |
| serialNumber | String | yes | -- | -- | unique |
| assignedBalagruha | ObjectId | no | null | Balagruha | -- |
| status | String | no | "active" | -- | enum: active, inactive, maintenance |
| lastLogin | Date | no | null | -- | -- |

**Indexes:** `machineId` (unique), `macAddress` (unique), `serialNumber` (unique)
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### MachineAssignment (`backend/models/machineAssignment.js`)

**Collection:** machineassignmenthistories
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| HistoryID | ObjectId | no | auto | -- | auto-generated |
| MachineID | ObjectId | yes | -- | Machine | -- |
| PreviousBalagruhaID | ObjectId | no | null | Balagruha | -- |
| NewBalagruhaID | ObjectId | yes | -- | Balagruha | -- |
| AssignedBy | ObjectId | yes | -- | Admin | -- |
| AssignmentDate | Date | no | Date.now | -- | -- |

**Indexes:** none
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### MachineActiveLog (`backend/models/machineactivelog.js`)

**Collection:** machineactivitystamps
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| LogID | ObjectId | no | auto | -- | auto-generated |
| MachineID | ObjectId | yes | -- | Machine | -- |
| UserID | ObjectId | yes | -- | User | -- |
| LoginTimestamp | Date | no | Date.now | -- | -- |
| LogoutTimestamp | Date | no | null | -- | -- |
| SessionDuration | Number | no | 0 | -- | seconds; auto-calculated |
| CreatedAt | Date | no | Date.now | -- | explicit + timestamps |

**Indexes:** none
**Virtuals:** none
**Hooks:** pre-save -- calculates SessionDuration from (LogoutTimestamp - LoginTimestamp) / 1000
**Methods:** none

---

### OfflineReqQueue (`backend/models/offlineReqQueue.js`)

**Collection:** offline_request_queues (model name: "offline_request_queue")
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| operation | String | yes | -- | -- | -- |
| apiPath | String | yes | -- | -- | -- |
| method | String | no | "POST" | -- | -- |
| payload | Mixed | yes | -- | -- | -- |
| attachmentString | String | no | "" | -- | -- |
| attachments | Array | no | -- | -- | [{filePath, fieldName}] |
| status | String | no | "pending" | -- | -- |
| error | String | no | "" | -- | -- |
| token | String | no | "" | -- | -- |
| generatedId | String | no | "" | -- | -- |
| createdAt | Date | no | Date.now | -- | explicit + timestamps |
| updatedAt | Date | no | Date.now | -- | explicit + timestamps |

**Indexes:** none
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### StudentMoodTracker (`backend/models/studentMoodTracker.js`)

**Collection:** student_mood_trackers (model name: "student_mood_tracker")
**Timestamps:** no (no timestamps option)

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| userId | ObjectId | yes | -- | User | -- |
| mood | String | yes | -- | -- | enum: happy, excited, neutral, sad, very_sad |
| dateString | String | no | -- | -- | auto-set in pre-save from date |
| date | Date | no | Date.now | -- | -- |
| notes | String | no | -- | -- | maxlength: 500 |

**Indexes:** none
**Virtuals:** none
**Hooks:** pre-save -- creates dateString as YYYY-MM-DD from date
**Methods:** none

---

## Shop/Procurement

---

### Vendor (`backend/models/vendor.js`)

**Collection:** vendors
**Timestamps:** yes
**toJSON/toObject virtuals:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| name | String | yes ("Vendor name is required") | -- | -- | trim |
| phone | String | yes ("Phone number is required") | -- | -- | trim; custom validator for Indian phone numbers |
| address | String | yes ("Address is required") | -- | -- | trim |
| active | Boolean | no | true | -- | index: true |

**Indexes:** `{ name: 1 }`, `{ active: 1 }` (field-level)
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### ShopItem (`backend/models/shopItem.js`)

**Collection:** shopitems
**Timestamps:** yes
**toJSON/toObject virtuals:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| sku | String | no | null | -- | unique, trim, uppercase, index |
| name | String | yes | -- | -- | trim, maxlength: 100 |
| description | String | yes | -- | -- | maxlength: 500 |
| category | String | yes | -- | -- | enum: SHOP_CATEGORIES (imported), index |
| purchaseCategory | String | no | "ISF Shop" | -- | enum: ISF Shop, Medicines, Repairs, Consumables, Infra, Others; index |
| price | Number | yes | -- | -- | min: 0, validate: integer |
| discountPrice | Number | no | null | -- | min: 0, validate: integer or null |
| stock | Number | yes | 0 | -- | min: 0, validate: integer |
| lowStockThreshold | Number | no | 10 | -- | min: 0 |
| imageUrl | String | no | null | -- | DEPRECATED, use images array |
| images | Array | no | -- | -- | [{url (required), isPrimary (default false), uploadedAt}] |
| isActive | Boolean | no | true | -- | index |
| availableFor | [String] | no | ["student"] | -- | enum: student, coach, all |
| tags | [String] | no | [] | -- | -- |
| balagruhaId | ObjectId | no | -- | Balagruha | index; optional scoping |
| metadata | Map of String | no | {} | -- | -- |
| isPendingProduct | Boolean | no | false | -- | index |
| createdBy | ObjectId | no | -- | User | -- |
| createdInRequest | ObjectId | no | null | PurchaseRequest | -- |
| unit | String | no | -- | -- | enum: pieces, packets, boxes, kg, liters, meters, units, grams, ml, sets, pairs, dozen |
| approvedVendors | Array | no | -- | -- | [{vendorId (ref Vendor, required), rank (default 1)}] |
| maxPrice | Number | no | -- | -- | min: 0; price cap in rupees |
| sellingPrice | Number | no | -- | -- | min: 0; selling price in coins |

**Indexes:**
- `{ category: 1, isActive: 1 }`
- `{ price: 1 }`
- `{ stock: 1 }`
- `{ name: 'text', description: 'text' }` (text search)
- `{ createdAt: -1 }`
- `{ isPendingProduct: 1, isActive: 1 }`
- Field-level: sku, category, purchaseCategory, isActive, balagruhaId, isPendingProduct

**Virtuals:**
- `inStock` -- returns stock > 0
- `lowStock` -- returns stock > 0 && stock <= lowStockThreshold
- `currentPrice` -- returns discountPrice if set, else price
- `primaryImageUrl` -- returns primary image URL or first image or legacy imageUrl

**Hooks:** pre-save -- validates discountPrice < price
**Instance Methods:**
- `isAvailableFor(userRole)` -- checks availableFor includes role

**Static Methods:**
- `findByCategory(category, options)` -- finds active in-stock items by category
- `search(searchTerm, options)` -- text search with relevance scoring

---

### PurchaseRequest (`backend/models/purchaseRequest.js`)

**Collection:** purchaserequests
**Timestamps:** yes
**toJSON/toObject virtuals:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| requestId | String | no | auto-generated | -- | unique; format PR-XXXXX |
| balagruhaId | Mixed | yes | -- | -- | ObjectId or String "STOCK"; custom validator; index |
| category | String | yes | -- | -- | enum: SHOP_CATEGORIES; trim; index |
| deadline | Date | no | -- | -- | index |
| priority | String | no | "medium" | -- | enum: low, medium, high; index |
| items | Array | no | -- | -- | subdocument array (see below) |
| items[].productId | ObjectId | yes | -- | ShopItem | -- |
| items[].productName | String | yes | -- | -- | -- |
| items[].productSKU | String | yes | -- | -- | -- |
| items[].requestedQuantity | Number | yes | -- | -- | min: 1 |
| items[].currentStock | Number | yes | -- | -- | -- |
| items[].lowStockThreshold | Number | yes | -- | -- | -- |
| items[].estimatedUnitCost | Number | no | 0 | -- | min: 0 |
| items[].estimatedTotalCost | Number | no | 0 | -- | -- |
| items[].receivedQuantity | Number | no | -- | -- | min: 0 |
| items[].actualUnitCost | Number | no | -- | -- | min: 0 |
| items[].actualTotalCost | Number | no | -- | -- | min: 0 |
| attachments | Array | no | -- | -- | [{filename (required), fileUrl (required), uploadedAt}] |
| totalEstimatedCost | Number | no | 0 | -- | auto-calculated |
| reason | String | no | -- | -- | maxlength: 200, trim |
| justification | String | no | -- | -- | maxlength: 500, trim |
| requestedBy | ObjectId | yes | -- | User | index |
| status | String | no | "pending" | -- | enum: pending, ordered, delivered_store, delivered_balagruha, pending_approval, approved, completed, cancelled, rejected, on_hold; index |
| statusHistory | Array | no | -- | -- | [{status (required, enum), changedBy (ref User, required), changedAt, notes}] |
| thresholdAnalysis.maxItemCost | Number | no | -- | -- | -- |
| thresholdAnalysis.totalOrderCost | Number | no | -- | -- | -- |
| thresholdAnalysis.itemThreshold | Number | no | 1000 | -- | Rs 1,000 |
| thresholdAnalysis.orderThreshold | Number | no | 25000 | -- | Rs 25,000 |
| thresholdAnalysis.requiresApproval | Boolean | no | true | -- | -- |
| reviewedBy | ObjectId | no | -- | User | -- |
| reviewedAt | Date | no | -- | -- | -- |
| reviewNotes | String | no | -- | -- | maxlength: 500 |
| supplierName | String | no | -- | -- | trim |
| invoiceNumber | String | no | -- | -- | trim |
| purchaseDate | Date | no | -- | -- | -- |
| actualTotalCost | Number | no | -- | -- | min: 0 |
| completedBy | ObjectId | no | -- | User | -- |
| completedAt | Date | no | -- | -- | -- |
| inventoryTransactionIds | [ObjectId] | no | -- | InventoryTransaction | -- |
| allocatedToBalagruhas | Array | no | -- | -- | [{balagruhaId (ref, required), quantity (required, min 1), allocatedAt, allocatedBy (ref User, required), notes (maxlength 200)}] |
| repairTechnicianName | String | no | -- | -- | trim, maxlength: 100 |
| deliveredByCoachId | ObjectId | no | -- | User | -- |
| deliveredToBalagruhaAt | Date | no | -- | -- | -- |

**Indexes:**
- `{ requestedBy: 1, status: 1 }`
- `{ balagruhaId: 1, status: 1 }`
- `{ createdAt: -1 }`
- Field-level: balagruhaId, category, deadline, priority, requestedBy, status

**Virtuals:**
- `requestAge` -- hours since creation
- `totalItems` -- items array length
- `totalQuantity` -- sum of requestedQuantity

**Hooks:** pre-save -- auto-generates requestId (PR-XXXXX) for new docs; calculates totalEstimatedCost from items
**Methods:** none

---

### PurchaseOrders (`backend/models/purchaseOrders.js`)

**Collection:** purchase_orders (model name: "purchase_orders")
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| balagruhaId | ObjectId | yes | -- | Balagruha | -- |
| machineDetails | String | yes | "" | -- | -- |
| vendorDetails | String | yes | "" | -- | -- |
| costEstimate | Number | no | 0 | -- | -- |
| requiredParts | String | no | "" | -- | -- |
| status | String | no | "pending" | -- | enum: pending, in-progress, completed |
| attachments | Array | no | -- | -- | [{fileName, fileUrl, fileType, uploadedBy (ref User), uploadedAt}] |
| createdBy | ObjectId | no | -- | User | -- |

**Indexes:** none
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### RepairRequests (`backend/models/repairRequests.js`)

**Collection:** repair_requests (model name: "repair_requests")
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| balagruhaId | ObjectId | yes | -- | Balagruha | -- |
| issueName | String | yes | "" | -- | -- |
| description | String | no | "" | -- | -- |
| dateReported | Date | no | -- | -- | -- |
| urgency | String | no | "low" | -- | enum: low, medium, high |
| status | String | no | "pending" | -- | enum: pending, in-progress, completed |
| estimatedCost | Number | no | -- | -- | -- |
| attachments | Array | no | -- | -- | [{fileName, fileUrl, fileType, uploadedBy (ref User), uploadedAt}] |
| repairDetails | String | no | -- | -- | -- |
| createdBy | ObjectId | no | -- | User | -- |

**Indexes:** none
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### InventoryTransaction (`backend/models/inventoryTransaction.js`)

**Collection:** inventorytransactions
**Timestamps:** yes
**toJSON/toObject virtuals:** yes (set explicitly)

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| productId | ObjectId | yes | -- | ShopItem | index |
| transactionType | String | yes | -- | -- | enum: purchase, sale, adjustment, return, correction, purchase_request |
| quantity | Number | yes | -- | -- | positive or negative |
| previousStock | Number | yes | -- | -- | -- |
| newStock | Number | yes | -- | -- | -- |
| reference.type | String | no | "manual" | -- | enum: order, purchase, manual, bulk_import, purchase_request |
| reference.id | ObjectId | no | -- | -- | -- |
| reason | String | yes | -- | -- | maxlength: 100 |
| notes | String | no | -- | -- | maxlength: 500 |
| performedBy | ObjectId | yes | -- | User | -- |

**Indexes:**
- `{ productId: 1, createdAt: -1 }`
- `{ performedBy: 1 }`
- `{ transactionType: 1 }`
- Field-level: productId

**Virtuals:** `quantityFormatted` -- returns "+N" or "-N" formatted string
**Hooks:** none
**Methods:** none

---

### Cart (`backend/models/cart.js`)

**Collection:** carts
**Timestamps:** yes
**toJSON/toObject virtuals:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| userId | ObjectId | yes | -- | User | unique, index |
| items | [cartItemSchema] | no | [] | -- | subdocument (see below) |
| items[].shopItemId | ObjectId | yes | -- | ShopItem | -- |
| items[].quantity | Number | yes | -- | -- | min: 1, max: 99, validate: integer |
| items[].addedAt | Date | no | Date.now | -- | _id: false on subdoc |
| lastUpdated | Date | no | Date.now | -- | -- |

**Indexes:** `{ userId: 1 }`
**Virtuals:**
- `itemCount` -- sum of all item quantities
- `totalCost` -- computed from populated shopItem prices

**Hooks:** pre-save -- updates lastUpdated timestamp
**Instance Methods:**
- `addItem(shopItemId, quantity)` -- adds or increments item
- `updateQuantity(shopItemId, quantity)` -- updates item quantity
- `removeItem(shopItemId)` -- removes item from cart
- `clearCart()` -- removes all items
- `validateStock()` -- checks stock availability for all items

**Static Methods:**
- `getOrCreate(userId)` -- finds or creates cart
- `getPopulated(userId)` -- returns cart with populated shop items

---

### Order (`backend/models/order.js`)

**Collection:** orders
**Timestamps:** yes
**toJSON/toObject virtuals:** yes (set explicitly)

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| orderNumber | String | yes | -- | -- | unique, index, match: /^ORD-\d{8}-\d{5}$/ |
| userId | ObjectId | yes | -- | User | index |
| items | [orderItemSchema] | yes | -- | -- | validate: must have at least 1 item |
| items[].shopItemId | ObjectId | yes | -- | ShopItem | _id: false on subdoc |
| items[].name | String | yes | -- | -- | -- |
| items[].sku | String | no | -- | -- | -- |
| items[].price | Number | yes | -- | -- | min: 0 |
| items[].quantity | Number | yes | -- | -- | min: 1, max: 99 |
| items[].subtotal | Number | yes | -- | -- | min: 0 |
| subtotal | Number | yes | -- | -- | min: 0 |
| discount | Number | no | 0 | -- | min: 0 |
| totalAmount | Number | yes | -- | -- | min: 0 |
| status | String | no | "pending" | -- | enum: pending, completed, cancelled, refunded; index |
| placedAt | Date | no | Date.now | -- | index |
| completedAt | Date | no | null | -- | -- |
| cancelledAt | Date | no | null | -- | -- |
| cancelledBy | ObjectId | no | -- | User | -- |
| cancellationReason | String | no | "" | -- | -- |
| refundedAt | Date | no | null | -- | -- |
| coinTransactionId | ObjectId | no | -- | Coin | -- |
| notes | String | no | "" | -- | -- |
| deliveryStatus | String | no | "pending_confirmation" | -- | enum: pending_confirmation, pending_delivery, delivered, cancelled; index |
| confirmedForDeliveryAt | Date | no | null | -- | -- |
| deliveredAt | Date | no | null | -- | -- |
| deliveredBy | ObjectId | no | -- | User | coach who delivered |
| deliveryNotes | String | no | "" | -- | maxLength: 500 |

**Indexes:**
- `{ userId: 1, createdAt: -1 }`
- `{ status: 1, placedAt: -1 }`
- `{ orderNumber: 1 }`
- `{ deliveryStatus: 1, placedAt: -1 }`

**Virtuals:**
- `itemCount` -- sum of item quantities
- `isCancelable` -- true if completed, pending_confirmation, and within 5 minutes

**Hooks:** none
**Instance Methods:**
- `cancel(cancelledBy, reason)` -- cancels order if within 5-min window
- `refund()` -- marks order as refunded

**Static Methods:**
- `getUserOrders(userId, page, limit, status)` -- paginated user orders
- `getByOrderNumber(orderNumber)` -- populated order lookup
- `checkAndConfirmOrders(orderIds)` -- confirms orders past 5-min window, notifies coaches

---

## LMS

---

### Course (`backend/models/course.js`)

**Collection:** courses
**Timestamps:** yes

Course uses deeply nested subdocument schemas:
- **FileSchema**: fileName, fileType, fileUrl
- **QuizSchema**: question, options, correctAnswer (legacy)
- **ContentItemSchema**: type (enum: video/pdf/audio/image/text/link/quiz/task), title, description, order, fileUrl, metadata (duration/fileSize/pages/width/height/language), quizData (questions, timeLimit, passingScore), quizRef (ref Quiz), textContent, externalUrl, taskData (instructions, submissionType, maxFileSize), translations.telugu
- **ChapterSchema**: title, description, order, videoTitle, videoUrl, uploadLink (legacy), files [FileSchema], quizzes [QuizSchema] (legacy), contentItems [ContentItemSchema], translations.telugu
- **ModuleSchema**: title, description, order, chapters [ChapterSchema], translations.telugu

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| title | String | yes | -- | -- | maxlength: 100 |
| description | String | no | -- | -- | maxlength: 500 |
| category | String | no | -- | -- | enum: Computer Apps, Art, Spoken English, Life Skills |
| duration | String | no | -- | -- | -- |
| difficultyLevel | String | no | -- | -- | enum: Beginner, Intermediate, Advanced |
| icon | String | no | "book emoji" | -- | -- |
| thumbnail | String | no | -- | -- | -- |
| enableCoinReward | Boolean | no | false | -- | -- |
| coinsOnCompletion | Number | no | 0 | -- | -- |
| modules | [ModuleSchema] | no | -- | -- | deeply nested subdocs |
| status | String | no | "draft" | -- | enum: draft, published, archived |
| assignedBalagruha | [ObjectId] | no | -- | Balagruha | -- |
| createdBy | ObjectId | no | -- | User | -- |
| publishedAt | Date | no | -- | -- | -- |
| archivedAt | Date | no | -- | -- | -- |
| translations.hindi | Object | no | -- | -- | title, description |
| translations.telugu | Object | no | -- | -- | title, description |
| languages | [String] | no | ["en"] | -- | enum: en, hi, te |

**Indexes:**
- `{ status: 1, createdAt: -1 }`
- `{ category: 1 }`
- `{ createdBy: 1 }`
- `{ "modules.order": 1 }`
- `{ "modules.chapters.order": 1 }`

**Virtuals:**
- `moduleCount` -- modules array length
- `chapterCount` -- total chapters across all modules
- `contentItemCount` -- total content items across all modules/chapters

**Hooks:** none
**Instance Methods:**
- `publish()` -- sets status=published, publishedAt=now
- `archive()` -- sets status=archived, archivedAt=now
- `restore(restoreToStatus)` -- restores from archived

**Static Methods:**
- `findActive()` -- finds published courses
- `findDrafts()` -- finds draft courses
- `findArchived()` -- finds archived courses

---

### ContentLibrary (`backend/models/ContentLibrary.js`)

**Collection:** contentlibraries
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| fileName | String | yes | -- | -- | trim |
| fileType | String | yes | -- | -- | enum: video, pdf, audio, image |
| fileUrl | String | yes | -- | -- | CDN URL |
| s3Key | String | yes | -- | -- | S3 object key |
| fileSize | Number | yes | -- | -- | bytes |
| mimeType | String | yes | -- | -- | e.g., video/mp4 |
| metadata.duration | Number | no | -- | -- | seconds |
| metadata.dimensions | Object | no | -- | -- | width, height |
| metadata.pages | Number | no | -- | -- | for PDFs |
| metadata.bitrate | String | no | -- | -- | audio bitrate |
| metadata.thumbnailUrl | String | no | -- | -- | -- |
| metadata.thumbnailKey | String | no | -- | -- | -- |
| tags | [String] | no | -- | -- | trim |
| description | String | no | -- | -- | trim |
| uploadedBy | ObjectId | yes | -- | User | -- |
| usedInCourses | Array | no | -- | -- | [{courseId (ref Course), courseTitle, moduleId, chapterId, contentItemId}] |
| uploadStatus | String | no | "pending" | -- | enum: pending, uploading, complete, failed |
| uploadedAt | Date | no | Date.now | -- | -- |
| lastAccessedAt | Date | no | -- | -- | -- |

**Indexes:**
- `{ fileType: 1, uploadedAt: -1 }`
- `{ fileName: 'text', tags: 'text', description: 'text' }` (text search)
- `{ uploadedBy: 1 }`
- `{ 'usedInCourses.courseId': 1 }`

**Virtuals:**
- `fileSizeFormatted` -- returns human-readable file size
- `durationFormatted` -- returns HH:MM:SS or MM:SS

**Hooks:** pre-save -- updates lastAccessedAt when uploadStatus changes to "complete"
**Instance Methods:**
- `addCourseUsage(courseData)` -- adds course reference
- `removeCourseUsage(courseId)` -- removes course reference

**Static Methods:**
- `findByType(fileType, options)` -- finds by file type with pagination
- `searchFiles(searchText, options)` -- text search with relevance scoring

---

### Quiz (`backend/models/Quiz.js`)

**Collection:** quizzes
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| title | String | yes | -- | -- | trim, minlength: 3, maxlength: 200 |
| description | String | no | -- | -- | trim, maxlength: 1000 |
| course | ObjectId | no | -- | Course | index |
| module | ObjectId | no | -- | Module | -- |
| chapter | ObjectId | no | -- | Chapter | index |
| questions | Array | no | -- | -- | embedded subdoc (see below) |
| questions[].type | String | yes | -- | -- | enum: mcq_single, mcq_multiple, true_false, fill_blank |
| questions[].questionText | String | yes | -- | -- | trim |
| questions[].points | Number | yes | 5 | -- | min: 1, max: 100 |
| questions[].explanation | String | no | -- | -- | trim |
| questions[].options | [{text, isCorrect}] | no | -- | -- | for MCQ types |
| questions[].correctAnswer | Boolean | no | -- | -- | for true_false |
| questions[].acceptedAnswers | [String] | no | -- | -- | for fill_blank; trim |
| questions[].caseInsensitive | Boolean | no | true | -- | -- |
| questions[].ignoreExtraSpaces | Boolean | no | true | -- | -- |
| questions[].partialCredit | Boolean | no | false | -- | for mcq_multiple |
| questions[].questionBankId | ObjectId | no | -- | QuestionBank | -- |
| questions[].order | Number | yes | -- | -- | -- |
| questions[].translations.telugu | Object | no | -- | -- | questionText, explanation, options |
| settings.timeLimit | Number | no | -- | -- | minutes; min: 0, max: 180 |
| settings.noTimeLimit | Boolean | no | false | -- | -- |
| settings.passingScore | Number | yes | 70 | -- | percentage; min: 0, max: 100 |
| settings.randomizeQuestions | Boolean | no | false | -- | -- |
| settings.randomizeOptions | Boolean | no | false | -- | -- |
| settings.showQuestionsOneAtTime | Boolean | no | false | -- | -- |
| settings.showResults | String | no | "immediate" | -- | enum: immediate, after_all_complete, manual |
| settings.showScore | Boolean | no | true | -- | -- |
| settings.showCorrectness | Boolean | no | true | -- | -- |
| settings.showAnswers | Boolean | no | true | -- | -- |
| settings.showExplanations | Boolean | no | true | -- | -- |
| settings.maxAttempts | Number | no | -- | -- | min: 1, max: 10 |
| settings.unlimitedAttempts | Boolean | no | false | -- | -- |
| settings.waitBetweenAttempts | Number | no | 0 | -- | minutes; min: 0, max: 1440 |
| status | String | no | "draft" | -- | enum: draft, published, archived; index |
| publishedAt | Date | no | -- | -- | -- |
| createdBy | ObjectId | yes | -- | User | index |
| lastEditedBy | ObjectId | no | -- | User | -- |
| tags | [String] | no | -- | -- | -- |
| usageCount | Number | no | 0 | -- | -- |
| translations.telugu | Object | no | -- | -- | title, description |
| languages | [String] | no | ["en"] | -- | enum: en, hi, te |

**Indexes:**
- `{ title: 'text', description: 'text' }`
- `{ status: 1, createdAt: -1 }`
- `{ course: 1, chapter: 1 }`

**Virtuals:**
- `totalPoints` -- sum of question points
- `questionCount` -- questions array length

**Hooks:** pre-save -- validates published quizzes have questions; validates MCQ option counts; validates true_false has correctAnswer; validates fill_blank has blanks and acceptedAnswers
**Instance Methods:**
- `publish()` -- sets status=published
- `unpublish()` -- sets status=draft
- `duplicate(userId)` -- creates independent copy

**Static Methods:**
- `findPublished(filter)` -- finds published quizzes with course/chapter populated
- `findByChapter(chapterId)` -- finds published quizzes for chapter

---

### QuestionBank (`backend/models/QuestionBank.js`)

**Collection:** questionbanks
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| type | String | yes | -- | -- | enum: mcq_single, mcq_multiple, true_false, fill_blank; index |
| questionText | String | yes | -- | -- | trim |
| points | Number | yes | 5 | -- | min: 1, max: 100 |
| explanation | String | no | -- | -- | trim |
| options | [{text, isCorrect}] | no | -- | -- | for MCQ |
| correctAnswer | Boolean | no | -- | -- | for true_false |
| acceptedAnswers | [String] | no | -- | -- | for fill_blank; trim |
| caseInsensitive | Boolean | no | true | -- | -- |
| ignoreExtraSpaces | Boolean | no | true | -- | -- |
| partialCredit | Boolean | no | false | -- | -- |
| tags | [String] | no | -- | -- | trim, lowercase |
| category | String | no | -- | -- | trim |
| difficulty | String | no | "medium" | -- | enum: easy, medium, hard |
| usageCount | Number | no | 0 | -- | index |
| usedInQuizzes | Array | no | -- | -- | [{quizId (ref Quiz), quizTitle, addedAt}] |
| createdBy | ObjectId | yes | -- | User | index |
| lastEditedBy | ObjectId | no | -- | User | -- |
| isActive | Boolean | no | true | -- | -- |

**Indexes:**
- `{ questionText: 'text', tags: 'text' }`
- `{ type: 1, difficulty: 1 }`
- `{ tags: 1 }`
- `{ createdBy: 1, createdAt: -1 }`

**Virtuals:** none
**Hooks:** none
**Instance Methods:**
- `addUsage(quizId, quizTitle)` -- tracks quiz usage
- `removeUsage(quizId)` -- removes quiz usage
- `toQuizQuestion(order)` -- converts to quiz question format

**Static Methods:**
- `searchQuestions(searchTerm, filters)` -- search with type/tag/difficulty/category filters
- `getMostUsed(limit)` -- top questions by usage
- `findByTag(tag)` -- finds active questions by tag

---

### Assignment (`backend/models/Assignment.js`)

**Collection:** assignments
**Timestamps:** yes
**toJSON/toObject virtuals:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| courseId | ObjectId | yes | -- | Course | -- |
| assignedBy | ObjectId | yes | -- | User | Coach ID |
| targetType | String | yes | -- | -- | enum: balagruha, student |
| targetIds | [ObjectId] | yes | -- | -- | Balagruha IDs or Student User IDs |
| dueDate | Date | no | -- | -- | -- |
| status | String | no | "active" | -- | enum: active, archived |
| notificationSettings.email | Boolean | no | false | -- | -- |
| notificationSettings.inApp | Boolean | no | true | -- | -- |

**Indexes:** none
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### CourseAssignment (`backend/models/CourseAssignment.js`)

**Collection:** courseassignments
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| courseId | ObjectId | yes | -- | Course | index |
| assignedBy | ObjectId | yes | -- | User | index |
| assignedTo.type | String | yes | -- | -- | enum: balagruha, students |
| assignedTo.balagruhaIds | [ObjectId] | no | -- | Balagruha | multiple Balagruhas |
| assignedTo.balagruhaId | ObjectId | no | -- | Balagruha | legacy single ref |
| assignedTo.studentIds | [ObjectId] | no | -- | User | -- |
| dueDate | Date | no | null | -- | -- |
| notifications.inApp | Boolean | no | true | -- | -- |
| notifications.email | Boolean | no | true | -- | -- |
| notifications.sent | Boolean | no | false | -- | -- |
| notifications.sentAt | Date | no | -- | -- | -- |
| notifications.recipientCount | Number | no | 0 | -- | -- |
| assignedAt | Date | yes | Date.now | -- | -- |
| status | String | no | "active" | -- | enum: active, completed, expired, cancelled |
| progress.totalStudents | Number | no | 0 | -- | -- |
| progress.studentsStarted | Number | no | 0 | -- | -- |
| progress.studentsCompleted | Number | no | 0 | -- | -- |
| progress.averageCompletionPercentage | Number | no | 0 | -- | -- |

**Indexes:**
- `{ assignedBy: 1, createdAt: -1 }`
- `{ courseId: 1 }`
- `{ "assignedTo.balagruhaId": 1 }`
- `{ "assignedTo.studentIds": 1 }`
- `{ status: 1 }`
- `{ dueDate: 1 }`

**Virtuals:**
- `isOverdue` -- dueDate passed and status is active
- `daysRemaining` -- days until/past dueDate
- `completionRate` -- (completed / total) * 100
- `startRate` -- (started / total) * 100

**Instance Methods:**
- `markCompleted()`
- `markExpired()`
- `cancel()`
- `updateProgress(progressData)`

**Static Methods:**
- `findByCoach(coachId)` -- active assignments by coach
- `findByStudent(studentId)` -- active assignments for student
- `findOverdue()` -- overdue active assignments
- `findByBalagruha(balagruhaId)` -- active assignments for Balagruha
- `getCoachStats(coachId)` -- total/active/completed/overdue/students stats

---

### StudentProgress (`backend/models/StudentProgress.js`)

**Collection:** studentprogresses
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| student | ObjectId | yes | -- | User | -- |
| course | ObjectId | yes | -- | Course | -- |
| status | String | no | "not_started" | -- | enum: not_started, in_progress, completed |
| completionPercentage | Number | no | 0 | -- | -- |
| completedModules | [ObjectId] | no | -- | Module | tracked IDs |
| completedChapters | [ObjectId] | no | -- | -- | -- |
| completedItems | Array | no | -- | -- | [{itemId, itemType (enum: video/pdf/audio/image/text/link/quiz/task), completedAt, score, metadata (Mixed)}] |
| lastAccessedAt | Date | no | Date.now | -- | -- |
| startedAt | Date | no | -- | -- | -- |
| completedAt | Date | no | -- | -- | -- |

**Indexes:** compound unique `{ student: 1, course: 1 }`
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### Submission (`backend/models/Submission.js`)

**Collection:** submissions
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| studentId | ObjectId | yes | -- | User | index |
| courseId | ObjectId | yes | -- | Course | index |
| taskId | String | yes | -- | -- | -- |
| taskTitle | String | yes | -- | -- | -- |
| submissionType | String | yes | -- | -- | enum: art, video, audio, quiz; index |
| fileUrl | String | yes | -- | -- | -- |
| thumbnailUrl | String | no | null | -- | -- |
| metadata.duration | Number | no | null | -- | seconds |
| metadata.fileSize | Number | no | null | -- | bytes |
| metadata.dimensions | Object | no | -- | -- | width, height |
| metadata.mimeType | String | no | null | -- | -- |
| submittedAt | Date | no | Date.now | -- | index |
| timeSpent | Number | no | 0 | -- | minutes |
| status | String | no | "pending" | -- | enum: pending, graded, flagged, skipped; index |
| grade.quality | String | no | null | -- | enum: excellent, good, needs_improvement |
| grade.coinsAwarded | Number | no | null | -- | min: 0, max: 100 |
| grade.feedback | String | no | null | -- | maxlength: 500 |
| grade.evaluationCriteria | Object | no | -- | -- | 9 boolean criteria fields |
| grade.gradedBy | ObjectId | no | null | User | -- |
| grade.gradedAt | Date | no | null | -- | -- |
| draft.quality | String | no | null | -- | enum: same as grade |
| draft.coinsAwarded | Number | no | null | -- | -- |
| draft.feedback | String | no | null | -- | -- |
| draft.savedAt | Date | no | null | -- | -- |
| flagged.reason | String | no | null | -- | -- |
| flagged.flaggedBy | ObjectId | no | null | User | -- |
| flagged.flaggedAt | Date | no | null | -- | -- |
| offlineSubmission | Boolean | no | false | -- | -- |
| syncedAt | Date | no | null | -- | -- |
| skippedAt | Date | no | null | -- | -- |

**Indexes:**
- `{ studentId: 1, courseId: 1 }`
- `{ studentId: 1, status: 1 }`
- `{ courseId: 1, status: 1 }`
- `{ submissionType: 1, status: 1 }`
- `{ "grade.gradedBy": 1 }`
- `{ submittedAt: -1 }`

**Virtuals:** none
**Hooks:** none
**Instance Methods:**
- `markAsGraded(gradeData)` -- grades and clears draft
- `saveDraft(draftData)` -- saves draft grade
- `flagSubmission(reason, flaggedBy)` -- flags submission
- `markAsSkipped()` -- marks skipped

**Static Methods:**
- `findByCoach(coachId, filters)` -- finds submissions for coach's students with filtering
- `getCoachStats(coachId)` -- pending/graded/flagged/thisWeek counts

---

## WTF/Gamification

---

### WtfPin (`backend/models/wtfPin.js`)

**Collection:** wtf_pins (model name: "wtf_pin")
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| title | String | yes | -- | -- | trim |
| caption | String | no | -- | -- | trim, maxlength: 500 |
| content | String | yes | -- | -- | trim |
| type | String | yes | -- | -- | enum: image, video, audio, text, link |
| mediaUrl | String | conditional | -- | -- | required for image/video/audio types; trim |
| thumbnailUrl | String | no | -- | -- | trim |
| duration | Number | no | -- | -- | seconds; min: 0 |
| author | ObjectId | yes | -- | User | -- |
| status | String | no | "active" | -- | enum: active, unpinned, archived, expired, draft |
| isOfficial | Boolean | no | false | -- | ISF Official Post |
| officialCategory | String | conditional | null | -- | enum: mann-ki-baat, op-ed, isf-updates, null; required when isOfficial |
| language | String | no | "english" | -- | enum: hindi, english, both |
| tags | [String] | no | -- | -- | trim |
| expiresAt | Date | no | +7 days | -- | default: 7 days from creation |
| engagementMetrics.likes | Number | no | 0 | -- | min: 0 |
| engagementMetrics.loves | Number | no | 0 | -- | min: 0 |
| engagementMetrics.seen | Number | no | 0 | -- | min: 0 |
| engagementMetrics.shares | Number | no | 0 | -- | min: 0 |
| position | Number | no | null | -- | index; for admin drag-and-drop ordering |
| linkUrl | String | conditional | -- | -- | required for type=link; match: http(s)://; trim |
| linkTitle | String | no | -- | -- | trim |
| linkDescription | String | no | -- | -- | trim |
| linkThumbnail | String | no | -- | -- | trim |

**Indexes:** (via schema options)
- `{ status: 1, createdAt: -1 }`
- `{ author: 1, createdAt: -1 }`
- `{ type: 1, status: 1 }`
- `{ expiresAt: 1 }`
- `{ isOfficial: 1, status: 1 }`
- `{ position: 1, status: 1 }`

**Virtuals:**
- `engagementRate` -- (likes / seen) * 100
- `daysUntilExpiration` -- days until expiresAt
- `isExpired` -- expiresAt < now

**Hooks:** pre-save -- validates text content length (max 5000); validates media URL for media types
**Instance Methods:**
- `isActive()` -- checks status=active and not expired
- `updateEngagementMetrics(metrics)` -- updates with clamping to zero

**Static Methods:**
- `getActivePins(limit, skip)` -- active non-expired pins
- `getExpiredPins()` -- expired active pins
- `findActivePins()` -- alias for getActivePins
- `findExpiredPins()` -- alias for getExpiredPins

---

### WtfSettings (`backend/models/wtfSettings.js`)

**Collection:** wtfsettings
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| backgroundType | String | no | "color" | -- | enum: color, image |
| backgroundColor | String | no | "#f8fafc" | -- | custom validator: hex color |
| backgroundImage | String | no | null | -- | S3 URL |
| fontColor | String | no | "#0f172a" | -- | custom validator: hex color |
| fontFamily | String | no | null | -- | trim |
| fontUrl | String | no | null | -- | S3 URL for font file |
| wtfCoinReward | Number | no | 25 | -- | min: 0 |
| isActive | Boolean | no | true | -- | -- |
| createdBy | ObjectId | yes | -- | User | -- |
| updatedBy | ObjectId | yes | -- | User | -- |

**Indexes:** `{ isActive: 1 }` (unique, partial filter: isActive=true) -- ensures only one active setting
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### WtfStudentInteraction (`backend/models/wtfStudentInteraction.js`)

**Collection:** wtf_student_interactions (model name: "wtf_student_interaction")
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| studentId | ObjectId | yes | -- | User | -- |
| pinId | ObjectId | yes | -- | wtf_pin | -- |
| type | String | yes | -- | -- | enum: like, seen, love |
| likeType | String | conditional | -- | -- | enum: thumbs_up, green_heart; required when type=like |
| viewDuration | Number | conditional | -- | -- | seconds; min: 0; required when type=seen |
| sessionId | String | no | -- | -- | trim |
| source | String | no | "web" | -- | enum: web, mobile, tablet |
| metadata.userAgent | String | no | -- | -- | -- |
| metadata.ipAddress | String | no | -- | -- | -- |
| metadata.timestamp | Date | no | Date.now | -- | -- |

**Indexes:**
- `{ studentId: 1, pinId: 1, type: 1, likeType: 1 }` (unique, partial: type=like)
- `{ studentId: 1, pinId: 1, type: 1 }` (unique, partial: type in [seen, love])
- Schema-level: `{ studentId: 1, pinId: 1, type: 1 }`, `{ pinId: 1, type: 1 }`, `{ studentId: 1, createdAt: -1 }`, `{ type: 1, createdAt: -1 }`

**Virtuals:** none
**Hooks:** pre-save -- validates likeType for likes; validates viewDuration for seen; strips likeType from love
**Instance Methods:**
- `getSummary()` -- returns interaction summary

**Static Methods:**
- `getPinInteractionCounts(pinId)` -- aggregation by type
- `getStudentPinInteractions(studentId, pinId)` -- student's interactions on a pin
- `hasStudentInteracted(studentId, pinId, type, likeType)` -- checks existence
- `getStudentInteractionHistory(studentId, limit)` -- recent history
- `getRecentInteractions(days)` -- analytics
- `findByStudent(studentId)`
- `findByPin(pinId)`
- `getInteractionCounts(pinId)` -- alias

---

### WtfSubmission (`backend/models/wtfSubmission.js`)

**Collection:** wtf_submissions (model name: "wtf_submission")
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| studentId | ObjectId | yes | -- | User | -- |
| type | String | yes | -- | -- | enum: voice, article |
| title | String | yes | -- | -- | trim |
| content | String | conditional | -- | -- | required for article; trim; maxlength: 10000 |
| audioUrl | String | conditional | -- | -- | required for voice; trim |
| audioDuration | Number | conditional | -- | -- | seconds; min: 0; required for voice (unless coach suggestion) |
| audioTranscription | String | no | -- | -- | trim |
| language | String | conditional | "english" | -- | enum: hindi, english, both; required for article |
| status | String | no | "pending" | -- | enum: pending, reviewed, considered, approved, rejected, archived |
| reviewedBy | ObjectId | no | -- | User | -- |
| reviewedAt | Date | no | -- | -- | -- |
| reviewNotes | String | no | -- | -- | trim; maxlength: 1000 |
| approvedPinId | ObjectId | no | -- | wtf_pin | link to created pin |
| tags | [String] | no | -- | -- | trim |
| isDraft | Boolean | no | false | -- | -- |
| metadata.wordCount | Number | no | -- | -- | auto-set for articles |
| metadata.characterCount | Number | no | -- | -- | auto-set for articles |
| metadata.fileSize | Number | no | -- | -- | bytes for voice |
| metadata.recordingQuality | String | no | -- | -- | -- |
| metadata.userAgent | String | no | -- | -- | -- |
| metadata.ipAddress | String | no | -- | -- | -- |
| metadata.isCoachSuggestion | Boolean | no | -- | -- | -- |
| metadata.originalType | String | no | -- | -- | -- |
| metadata.studentName | String | no | -- | -- | -- |
| metadata.balagruha | String | no | -- | -- | -- |
| metadata.suggestedBy | String | no | -- | -- | -- |
| metadata.coachId | ObjectId | no | -- | -- | -- |
| metadata.suggestedDate | Date | no | -- | -- | -- |
| metadata.reason | String | no | -- | -- | -- |
| metadata.level | String | no | -- | -- | -- |
| metadata.category | String | no | -- | -- | -- |

**Indexes:** (via schema options)
- `{ studentId: 1, createdAt: -1 }`
- `{ status: 1, createdAt: -1 }`
- `{ type: 1, status: 1 }`
- `{ reviewedBy: 1, reviewedAt: -1 }`
- `{ approvedPinId: 1 }`

**Virtuals:** none
**Hooks:**
- pre-save #1 -- validates article content; validates voice audioUrl and duration (max 60s); auto-sets wordCount/characterCount for articles
- pre-save #2 -- sets reviewedAt when status changes to approved/rejected

**Instance Methods:**
- `getSummary()` -- returns submission summary
- `isReviewable()` -- status=pending and not draft
- `isPending()` -- status=pending
- `approve(reviewerId, notes)` -- approves submission
- `reject(reviewerId, notes)` -- rejects submission

**Static Methods:**
- `getPendingSubmissions(limit, skip)` -- non-draft pending submissions
- `getStudentSubmissions(studentId, limit)` -- student's submissions
- `getSubmissionsByType(type, status, limit)` -- by type with optional status
- `getSubmissionStats()` -- aggregation by status
- `getRecentSubmissions(days)` -- recent for analytics
- `findPendingSubmissions()` -- alias
- `findByStudent(studentId)` -- alias

---

### Coin (`backend/models/coin.js`)

**Collection:** coins
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| userId | ObjectId | yes | -- | User | -- |
| balance | Number | no | 0 | -- | min: 0 |
| transactions | Array | no | -- | -- | embedded subdoc (see below) |
| transactions[].type | String | yes | -- | -- | enum: earned, spent, bonus, penalty, wtf_pin_creation, wtf_submission_approval, wtf_interaction |
| transactions[].amount | Number | yes | -- | -- | -- |
| transactions[].description | String | yes | -- | -- | -- |
| transactions[].source | String | yes | -- | -- | enum: wtf, attendance, task, medical, sports, music, general, shop |
| transactions[].wtfPinId | ObjectId | no | -- | wtf_pin | -- |
| transactions[].wtfSubmissionId | ObjectId | no | -- | wtf_submission | -- |
| transactions[].wtfInteractionId | ObjectId | no | -- | wtf_student_interaction | -- |
| transactions[].metadata | Mixed | no | {} | -- | flexible metadata |
| transactions[].createdAt | Date | no | Date.now | -- | -- |
| weeklyStats.coinsEarned | Number | no | 0 | -- | -- |
| weeklyStats.coinsSpent | Number | no | 0 | -- | -- |
| weeklyStats.lastResetDate | Date | no | Date.now | -- | -- |
| monthlyStats.coinsEarned | Number | no | 0 | -- | -- |
| monthlyStats.coinsSpent | Number | no | 0 | -- | -- |
| monthlyStats.lastResetDate | Date | no | Date.now | -- | -- |
| wtfStats.pinsCreated | Number | no | 0 | -- | -- |
| wtfStats.submissionsApproved | Number | no | 0 | -- | -- |
| wtfStats.interactionsMade | Number | no | 0 | -- | -- |
| wtfStats.totalWtfCoinsEarned | Number | no | 0 | -- | -- |

**Indexes:** (via schema options)
- `{ userId: 1 }`
- `{ "transactions.createdAt": -1 }`
- `{ "transactions.type": 1 }`
- `{ "transactions.source": 1 }`

**Virtuals:** none
**Hooks:** pre-save -- validates balance >= 0
**Instance Methods:**
- `addCoins(amount, type, description, source, metadata)` -- adds coins + transaction
- `spendCoins(amount, type, description, source, metadata)` -- spends coins + transaction
- `updateStats(amount, transactionType)` -- updates weekly/monthly stats
- `updateWtfStats(type, amount)` -- updates WTF-specific stats
- `getTransactionHistory(limit, skip)` -- returns sorted transactions
- `getWtfTransactionHistory(limit)` -- WTF-only transactions

**Static Methods:**
- `findOrCreateForUser(userId)` -- finds or creates coin record
- `getUserBalance(userId)` -- returns balance
- `awardWtfCoins(userId, amount, type, description, metadata)` -- awards WTF coins
- `getTopEarners(limit, period)` -- leaderboard aggregation

---

## Facial Recognition

---

### FaceEmbedding (`backend/models/FaceEmbedding.js`)

**Collection:** faceembeddings
**Timestamps:** no (manual createdAt/updatedAt fields)

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| studentId | ObjectId | yes | -- | Student | unique, index |
| embedding | String | yes | -- | -- | AES-256-GCM encrypted; select: false (hidden by default) |
| metadata.confidence | Number | yes | -- | -- | min: 0, max: 1 |
| metadata.quality.detection | Number | no | -- | -- | min: 0, max: 1 |
| metadata.quality.landmarks | Number | no | -- | -- | min: 0, max: 1 |
| metadata.quality.image | Number | no | -- | -- | min: 0, max: 1 |
| metadata.livenessScore | Number | no | -- | -- | min: 0, max: 1 |
| metadata.boundingBox | Object | no | -- | -- | x, y, width, height |
| metadata.imageDimensions | Object | no | -- | -- | width, height |
| registeredBy | ObjectId | yes | -- | User | -- |
| registrationMethod | String | no | "admin_upload" | -- | enum: admin_upload, self_registration, bulk_import, migration |
| isActive | Boolean | no | true | -- | index |
| createdAt | Date | no | Date.now | -- | index |
| updatedAt | Date | no | Date.now | -- | -- |
| lastUsedAt | Date | no | -- | -- | index |
| usageCount | Number | no | 0 | -- | -- |

**Indexes:**
- `{ studentId: 1, isActive: 1 }`
- `{ createdAt: -1 }`
- `{ lastUsedAt: -1 }`
- `studentId` (unique)

**Virtuals:** none
**Hooks:** pre-save -- updates updatedAt
**Instance Methods:**
- `setEmbedding(embeddingArray)` -- encrypts and stores 128-d descriptor
- `getEmbedding()` -- decrypts and returns 128-d descriptor
- `recordUsage()` -- updates lastUsedAt and usageCount
- `toJSON()` -- overridden to strip embedding from output

**Static Methods:**
- `getActiveEmbedding(studentId)` -- finds active embedding with `+embedding` select
- `getAllActiveEmbeddings()` -- for cache warming, decrypts all
- `replaceEmbedding(studentId, embeddingArray, metadata, registeredBy)` -- deactivates old, creates new

---

### FRSession (`backend/models/FRSession.js`)

**Collection:** frsessions
**Timestamps:** no (manual timestamp field)

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| sessionType | String | yes | -- | -- | enum: registration, login, attendance, verification, test; index |
| studentId | ObjectId | no | -- | Student | index; may be null for failed recognition |
| initiatedBy | ObjectId | no | -- | User | admin who initiated |
| success | Boolean | yes | -- | -- | index |
| failureReason | String | no | -- | -- | enum: no_face_detected, multiple_faces_detected, poor_image_quality, low_confidence, liveness_failed, no_matching_embedding, student_not_found, server_error, timeout, other |
| failureDetails | String | no | -- | -- | -- |
| recognition.matchedStudentId | ObjectId | no | -- | Student | -- |
| recognition.confidence | Number | no | -- | -- | min: 0, max: 1 |
| recognition.threshold | Number | no | -- | -- | min: 0, max: 1 |
| recognition.thresholdMet | Boolean | no | -- | -- | -- |
| recognition.topMatches | Array | no | -- | -- | [{studentId, confidence}] |
| recognition.comparisonsCount | Number | no | -- | -- | -- |
| recognition.recognitionTimeMs | Number | no | -- | -- | -- |
| faceDetection.facesDetected | Number | no | 0 | -- | -- |
| faceDetection.detectionConfidence | Number | no | -- | -- | min: 0, max: 1 |
| faceDetection.boundingBox | Object | no | -- | -- | x, y, width, height |
| faceDetection.detectionTimeMs | Number | no | -- | -- | -- |
| imageQuality.overall | Number | no | -- | -- | min: 0, max: 1 |
| imageQuality.lighting | Number | no | -- | -- | min: 0, max: 1 |
| imageQuality.sharpness | Number | no | -- | -- | min: 0, max: 1 |
| imageQuality.width | Number | no | -- | -- | -- |
| imageQuality.height | Number | no | -- | -- | -- |
| imageQuality.sizeBytes | Number | no | -- | -- | -- |
| liveness.score | Number | no | -- | -- | min: 0, max: 1 |
| liveness.threshold | Number | no | -- | -- | min: 0, max: 1 |
| liveness.passed | Boolean | no | -- | -- | -- |
| liveness.livenessTimeMs | Number | no | -- | -- | -- |
| performance.totalTimeMs | Number | no | -- | -- | index |
| performance.backend | String | no | -- | -- | tensorflow, wasm, webgl |
| performance.gpuUsed | Boolean | no | -- | -- | -- |
| performance.cacheHit | Boolean | no | -- | -- | -- |
| client.ipAddress | String | no | -- | -- | -- |
| client.userAgent | String | no | -- | -- | -- |
| client.deviceType | String | no | -- | -- | enum: desktop, mobile, tablet, unknown |
| client.browser | String | no | -- | -- | -- |
| client.platform | String | no | -- | -- | -- |
| balagruhaId | ObjectId | no | -- | Balagruha | for attendance sessions |
| metadata | Map of Mixed | no | -- | -- | additional context |
| timestamp | Date | no | Date.now | -- | index |

**Indexes:**
- `{ sessionType: 1, success: 1, timestamp: -1 }`
- `{ studentId: 1, timestamp: -1 }`
- `{ timestamp: -1, sessionType: 1 }`
- `{ success: 1, failureReason: 1 }`

**Virtuals:** none
**Hooks:** none
**Static Methods:**
- `createRegistrationSession(data)`
- `createLoginSession(data)`
- `createAttendanceSession(data)`
- `getSuccessRate(sessionType, startDate, endDate)` -- success/failure counts
- `getFailureReasons(sessionType, startDate, endDate)` -- breakdown by reason
- `getAveragePerformance(sessionType, startDate, endDate)` -- timing/confidence averages
- `getStudentSessions(studentId, limit)` -- recent sessions

---

### EmotionTracking (`backend/models/EmotionTracking.js`)

**Collection:** emotion_tracking (explicit collection name)
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| studentId | ObjectId | yes | -- | User | index |
| emotion | String | yes | -- | -- | enum: happy, sad, angry |
| timestamp | Date | yes | Date.now | -- | index |
| synced | Boolean | no | true | -- | false if synced from offline queue |
| context.page | String | no | -- | -- | -- |
| context.courseType | String | no | -- | -- | -- |
| context.taskId | ObjectId | no | -- | -- | -- |

**Indexes:**
- `{ studentId: 1, timestamp: -1 }`
- `{ emotion: 1, timestamp: -1 }`

**Virtuals:** none
**Hooks:** none
**Methods:** none

---

## Medical/Health

---

### Medical (`backend/models/medical.js`)

**Collection:** medicalrecords (model name: "MedicalRecord")
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| studentId | ObjectId | no | -- | User | -- |
| healthCheckupDate | Date | no | -- | -- | -- |
| nextActionDate | Date | no | -- | -- | -- |
| vaccinations | [String] | no | -- | -- | -- |
| medicalHistory | Array | no | -- | -- | complex subdocument (see below) |
| medicalHistory[].name | String | no | -- | -- | medical problem name |
| medicalHistory[].attachmentURL | String | no | -- | -- | -- |
| medicalHistory[].contentType | String | no | -- | -- | -- |
| medicalHistory[].description | String | no | -- | -- | -- |
| medicalHistory[].date | Date | no | -- | -- | -- |
| medicalHistory[].caseId | String | no | -- | -- | -- |
| medicalHistory[].doctorsName | String | no | -- | -- | -- |
| medicalHistory[].hospitalName | String | no | -- | -- | -- |
| medicalHistory[].currentStatus | Object | no | -- | -- | status, notes, date, statusHistory[] |
| medicalHistory[].prescriptions | Array | no | -- | -- | [{url, name, date}] |
| medicalHistory[].otherAttachments | Array | no | -- | -- | [{url, name, date}] |
| notes | String | no | -- | -- | -- |
| createdBy | ObjectId | no | -- | User | -- |

**Indexes:** none
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### MedicalCheckIns (`backend/models/medicalCheckIns.js`)

**Collection:** medical_check_ins (model name: "medical_check_ins")
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| studentId | ObjectId | yes | -- | User | -- |
| temperature | Number | no | -- | -- | optional per Sprint6-Story-3 |
| date | Date | yes | -- | -- | -- |
| healthStatus | String | no | "normal" | -- | enum: normal, important, critical |
| notes | String | no | -- | -- | -- |
| attachments | Array | no | -- | -- | [{fileName, fileUrl, fileType, fileSize, uploadedBy (ref User), uploadedAt}] |
| symptoms | [String] | no | [] | -- | enum: cough_cold, fever, stomach_ache, headache, injury, other, "" |
| customSymptom | String | no | "" | -- | -- |
| doctorVisits | Array | no | -- | -- | multiple visits (Sprint6-Story-3-AC5) |
| doctorVisits[].doctorName | String | no | "" | -- | -- |
| doctorVisits[].hospitalName | String | no | "" | -- | -- |
| doctorVisits[].visitDate | Date | no | -- | -- | -- |
| doctorVisits[].prescriptionFiles | Array | no | -- | -- | file subdocs |
| doctorVisits[].testDetails | String | no | "" | -- | -- |
| doctorVisits[].testResultFiles | Array | no | -- | -- | file subdocs |
| doctorVisits[].conclusion | String | no | "" | -- | -- |
| doctorVisits[].createdAt | Date | no | Date.now | -- | -- |
| doctorVisit | Object | no | -- | -- | DEPRECATED: single visit for backward compat |
| followUps | Array | no | -- | -- | multiple follow-ups (Sprint6-Story-3-AC6/AC7) |
| followUps[].followUpDate | Date | no | -- | -- | -- |
| followUps[].hospital | String | no | "" | -- | -- |
| followUps[].doctor | String | no | "" | -- | -- |
| followUps[].assignedCoaches | [ObjectId] | no | -- | User | -- |
| followUps[].status | String | no | "" | -- | enum: active, inactive, completed, "" |
| followUps[].descriptionFiles | Array | no | -- | -- | file subdocs |
| followUps[].testResultFiles | Array | no | -- | -- | file subdocs |
| followUps[].notes | String | no | "" | -- | -- |
| followUps[].createdAt | Date | no | Date.now | -- | -- |
| followUp | Object | no | -- | -- | DEPRECATED: single follow-up for backward compat |
| createdBy | ObjectId | yes | -- | User | -- |

**Indexes:** none
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### Doctor (`backend/models/doctor.js`)

**Collection:** doctors
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| name | String | yes ("Doctor name is required") | -- | -- | trim |
| specialty | String | no | -- | -- | trim |
| hospital | String | no | -- | -- | trim |
| contactNumber | String | no | -- | -- | trim |
| createdBy | ObjectId | no | -- | User | -- |

**Indexes:** `{ name: 1 }`
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

### Hospital (`backend/models/hospital.js`)

**Collection:** hospitals
**Timestamps:** yes

| Field | Type | Required | Default | Ref | Notes |
|-------|------|----------|---------|-----|-------|
| name | String | yes ("Hospital name is required") | -- | -- | trim |
| address | String | no | -- | -- | trim |
| city | String | no | -- | -- | trim |
| contactNumber | String | no | -- | -- | trim |
| createdBy | ObjectId | no | -- | User | -- |

**Indexes:** `{ name: 1 }`
**Virtuals:** none
**Hooks:** none
**Methods:** none

---

## Cross-Reference Summary

### Model Count by Domain

| Domain | Count | Models |
|--------|-------|--------|
| Core Platform | 17 | User, Student, Role, Balagruha, Attendance, ActivityLog, Notification, UserNotificationView, Schedules, Task, SportsTasks, TrainingSession, Machine, MachineAssignment, MachineActiveLog, OfflineReqQueue, StudentMoodTracker |
| Shop/Procurement | 8 | Vendor, ShopItem, PurchaseRequest, PurchaseOrders, RepairRequests, InventoryTransaction, Cart, Order |
| LMS | 8 | Course, ContentLibrary, Quiz, QuestionBank, Assignment, CourseAssignment, StudentProgress, Submission |
| WTF/Gamification | 5 | WtfPin, WtfSettings, WtfStudentInteraction, WtfSubmission, Coin |
| Facial Recognition | 3 | FaceEmbedding, FRSession, EmotionTracking |
| Medical/Health | 4 | Medical, MedicalCheckIns, Doctor, Hospital |
| **Total** | **45** | |

### Model-to-Collection Name Mapping

Some models use non-standard collection names (lowercase pluralized differs from model name):

| Model Name | Collection Name | File |
|------------|----------------|------|
| schedules | schedules | schedules.js |
| sports_tasks | sports_tasks | sportsTasks.js |
| training_sessions | training_sessions | trainingSession.js |
| MachineAssignmentHistory | machineassignmenthistories | machineAssignment.js |
| MachineActivityStamp | machineactivitystamps | machineactivelog.js |
| offline_request_queue | offline_request_queues | offlineReqQueue.js |
| student_mood_tracker | student_mood_trackers | studentMoodTracker.js |
| purchase_orders | purchase_orders | purchaseOrders.js |
| repair_requests | repair_requests | repairRequests.js |
| wtf_pin | wtf_pins | wtfPin.js |
| wtf_student_interaction | wtf_student_interactions | wtfStudentInteraction.js |
| wtf_submission | wtf_submissions | wtfSubmission.js |
| MedicalRecord | medicalrecords | medical.js |
| medical_check_ins | medical_check_ins | medicalCheckIns.js |
| EmotionTracking | emotion_tracking | EmotionTracking.js (explicit collection name) |

### Key ObjectId Reference Map

| From Model | Field | References |
|-----------|-------|------------|
| User | balagruhaIds | Balagruha |
| User | assignedMachines | Machine |
| Student | balagruhaId | Balagruha |
| Attendance | studentId | User |
| Attendance | balagruhaId | Balagruha |
| Attendance | frSessionId | FRSession |
| Notification | userId | User |
| Schedules | balagruhaId, assignedTo, createdBy | Balagruha, User, User |
| Task | assignedUser, createdBy, balagruhaId | User, User, Balagruha |
| Machine | assignedBalagruha | Balagruha |
| MachineAssignment | MachineID, PreviousBalagruhaID, NewBalagruhaID | Machine, Balagruha, Balagruha |
| MachineActiveLog | MachineID, UserID | Machine, User |
| ShopItem | balagruhaId, createdBy, createdInRequest, approvedVendors[].vendorId | Balagruha, User, PurchaseRequest, Vendor |
| PurchaseRequest | requestedBy, reviewedBy, completedBy, deliveredByCoachId, inventoryTransactionIds | User, User, User, User, InventoryTransaction |
| InventoryTransaction | productId, performedBy | ShopItem, User |
| Cart | userId, items[].shopItemId | User, ShopItem |
| Order | userId, cancelledBy, deliveredBy, coinTransactionId | User, User, User, Coin |
| Course | assignedBalagruha, createdBy | Balagruha, User |
| ContentLibrary | uploadedBy, usedInCourses[].courseId | User, Course |
| Quiz | course, createdBy, lastEditedBy, questions[].questionBankId | Course, User, User, QuestionBank |
| Assignment | courseId, assignedBy | Course, User |
| CourseAssignment | courseId, assignedBy, assignedTo.balagruhaIds, assignedTo.studentIds | Course, User, Balagruha, User |
| StudentProgress | student, course | User, Course |
| Submission | studentId, courseId, grade.gradedBy, flagged.flaggedBy | User, Course, User, User |
| WtfPin | author | User |
| WtfStudentInteraction | studentId, pinId | User, wtf_pin |
| WtfSubmission | studentId, reviewedBy, approvedPinId | User, User, wtf_pin |
| Coin | userId, transactions[].wtfPinId/wtfSubmissionId/wtfInteractionId | User, wtf_pin/wtf_submission/wtf_student_interaction |
| FaceEmbedding | studentId, registeredBy | Student, User |
| FRSession | studentId, initiatedBy, balagruhaId | Student, User, Balagruha |
| EmotionTracking | studentId | User |
| Medical | studentId, createdBy | User, User |
| MedicalCheckIns | studentId, createdBy, followUps[].assignedCoaches | User, User, User |
| Doctor | createdBy | User |
| Hospital | createdBy | User |

---

**Accuracy Verification:** All 45 model files in `backend/models/` were read directly and documented against actual source code. Field names, types, required flags, defaults, enums, refs, indexes, virtuals, hooks, and methods verified against source files on March 16, 2026.

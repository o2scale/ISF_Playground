# Source Tree Architecture

## Project Root Structure

```
D:\Dev\ISF_Playground\
├── backend/                    # Node.js/Express backend
├── frontend/                   # React 19 frontend
├── build/                      # Compiled React app (for Electron)
├── resources/                  # Electron embedded resources
│   ├── mongodb/bin/           # Embedded MongoDB binaries
│   └── nodejs/                # Embedded Node.js runtime
├── docs/                       # Project documentation
│   └── architecture/          # Architecture documentation
├── .bmad-core/                # BMAD framework files
├── .bmad-infrastructure-devops/ # Infrastructure configuration
├── main.js                    # Electron main process
├── preload.js                 # Electron preload script
└── package.json               # Root package.json (Electron)
```

## Backend Structure (`backend/`)

### Core Files
```
backend/
├── server.js                  # Main entry point, Express app setup
├── package.json               # Backend dependencies
├── .env                       # Environment variables (not in repo)
└── swagger.js                 # Swagger API documentation config
```

### Models (`backend/models/`)
Data models using Mongoose ODM:

```
models/
├── user.js                    # User/Student unified model ⭐
├── student.js                 # Deprecated student model
├── coin.js                    # Coin wallet system ⭐
├── notification.js            # Notifications ⭐
├── userNotificationView.js    # Notification view tracking
├── balagruha.js              # Balagruha (children's home)
├── machine.js                # Computer/device tracking
├── machineAssignment.js      # Machine assignments
├── machineactivelog.js       # Machine usage logs
├── role.js                   # RBAC roles
├── task.js                   # Task management
├── attendance.js             # Attendance records
├── medical.js                # Medical records
├── medicalCheckIns.js        # Medical check-ins
├── wtfPin.js                 # WTF wall pins ⭐
├── wtfSubmission.js          # WTF student submissions
├── wtfStudentInteraction.js  # WTF interactions (likes, views)
├── wtfSettings.js            # WTF module settings
├── sportsTasks.js            # Sports activities
├── trainingSession.js        # Training sessions
├── purchaseOrders.js         # Purchase orders
├── repairRequests.js         # Repair requests
├── course.js                 # Course management
├── schedules.js              # Scheduling
├── offlineReqQueue.js        # Offline request queue
├── studentMoodTracker.js     # Mood tracking
└── activitylog.js            # Activity logs
```

**Key Models for Sprint 5:**
- ⭐ `user.js` - Will extend with shop-related fields
- ⭐ `coin.js` - Core currency system for shop
- ⭐ `notification.js` - Shop notifications
- ⭐ `wtfPin.js` - Coin earning through WTF

### Controllers (`backend/controllers/`)
Request handlers and business logic:

```
controllers/
├── userController.js          # User CRUD, facial login ⭐
├── coinController.js          # Coin operations ⭐
├── notificationController.js  # Notification management
├── balagruha.js              # Balagruha operations
├── machineController.js       # Machine management
├── roleController.js          # Role management
├── taskController.js          # Task operations
├── wtfController.js          # WTF module ⭐
├── wtfSettingsController.js  # WTF settings
├── wtfWebSocketController.js # WTF WebSocket handlers
├── sports.js                 # Sports activities
├── music.js                  # Music activities
├── purchaseAndRepair.js      # Purchase/repair management
├── schedulerController.js    # Scheduling
├── medicalCheckInsController.js    # Medical check-ins
├── medicalRecordController.js      # Medical records
├── courseController.js       # Course management
├── scheduleController.js     # Schedule operations
├── studentMoodTrackerController.js # Mood tracking
└── offlineRequestQueue.js    # Offline queue management
```

**Code Quality Note:** Controllers have excessive logic, poor error handling, and `console.log` usage. Sprint 5 should follow a better pattern.

### Services (`backend/services/`)
Business logic layer:

```
services/
├── user.js                    # User service ⭐
├── student.js                 # Student operations (facial recognition)
├── coin.js                    # Coin business logic ⭐
├── notification.js            # Notification service
├── balagruha.js              # Balagruha operations
├── attendenance.js           # Attendance logic
├── database.js               # Database utilities
├── task.js                   # Task operations
├── wtf.js                    # WTF module logic ⭐
├── wtfSettings.js            # WTF settings
├── wtfWebSocket.js           # WebSocket service ⭐
├── wtfPerformance.js         # WTF performance monitoring
├── sportsTask.js             # Sports activities
├── musicTask.js              # Music activities
├── trainingSession.js        # Training sessions
├── scheduler.js              # Cron jobs, pin expiration
├── course.js                 # Course logic
├── schedule.js               # Scheduling logic
├── medicalCheckIns.js        # Medical check-ins
├── medicalRecords.js         # Medical records
├── studentMoodTracker.js     # Mood tracking
├── videoThumbnail.js         # Video processing
├── offlineRequestQueue.js    # Offline queue
└── offlineRequestToServer.js # Offline sync
```

**Sprint 5 Integration:** Create `backend/services/shop.js` for shop logic.

### Routes (`backend/routes/`)
API endpoint definitions:

#### v1 Routes (`backend/routes/v1/`)
```
v1/
├── user.js                    # /api/v1/users
├── balagruha.js              # /api/v1/balagruha
├── machines.js               # /api/v1/machines
├── coin.js                   # /api/v1/coin ⭐
├── wtf.js                    # /api/v1/wtf ⭐
├── wtfSettings.js            # /api/v1/wtf-settings
├── websocket.js              # /api/v1/websocket
├── sports.js                 # /api/v1/sports
├── music.js                  # /api/v1/music
├── trainingSession.js        # /api/v1/training-session
├── purchaseAndRepair.js      # /api/v1/purchase-repair
└── scheduler.js              # /api/v1/scheduler
```

#### Non-versioned Routes
```
routes/
├── auth.js                   # /api/auth (login, register) ⭐
├── userRoutes.js             # /api/users (deprecated)
├── roleRoutes.js             # /api/roles
├── taskRoutes.js             # /api/tasks
├── notificationRoutes.js     # /api/notifications ⭐
├── courseRoutes.js           # /api/v1/courses
├── scheduleRoutes.js         # /api/schedules
├── medicalCheckInsRoutes.js  # /api/medical-check-ins
├── medicalRecordsRoutes.js   # /api/medical-records
├── studentMoodTrackerRoutes.js # /api/v1/mood-tracker
└── offlineRequestQueue.js    # /api/offline-requests
```

**Sprint 5 Strategy:** Create `backend/routes/v2/shop.js` for new shop endpoints.

### Middleware (`backend/middleware/`)
```
middleware/
├── auth.js                   # JWT authentication & RBAC ⭐
└── upload.js                 # Multer file upload config, AWS S3
```

### Data Access Layer (`backend/data-access/`)
```
data-access/
├── machines.js               # Machine queries
└── medicalRecords.js         # Medical record queries
```

### Configuration (`backend/config/`)
```
config/
└── pino-config.js           # Logging configuration
```

### Constants (`backend/constants/`)
```
constants/
├── users.js                 # UserTypes enum
└── general.js               # HTTP_STATUS_CODE constants
```

### Other Directories
```
backend/
├── weights/                 # Face-API.js model weights
├── db/dump/                # MongoDB initial data dump
├── scripts/                # Setup scripts
│   ├── setupDefaultRoles.js
│   ├── debugRoles.js
│   └── forceSetupRoles.js
└── tests/                  # Unit tests (WTF module)
    └── wtf/
        ├── unit/
        ├── integration/
        └── performance/
```

## Frontend Structure (`frontend/`)

### Root Files
```
frontend/
├── package.json            # Frontend dependencies (React 19)
├── public/                 # Static assets
│   ├── index.html
│   ├── manifest.json
│   └── models/            # Face-API.js models (duplicate)
└── src/                   # Source code
```

### Components (`frontend/src/components/`)

#### Dashboard Components
```
dashboard/
├── admin.js               # Admin dashboard ⚠️ 1440 lines, 15+ useState
├── coach.js               # Coach dashboard
├── student.js             # Student dashboard
├── balagruha.js           # Balagruha dashboard
├── medicalIncharge.js     # Medical incharge dashboard
├── MusicCoach.js          # Music coach dashboard
├── Sportscoach.js         # Sports coach dashboard
├── purchaseDashboard.js   # Purchase manager dashboard
├── dashboard.js           # Dashboard router
├── WeeklyCalendar.js      # Calendar component
└── CheckInModal.js        # Check-in modal
```

**Code Quality Issues:**
- `admin.js`: 1440 lines, 37 state variables, API calls in component
- No state management library
- Duplicate logic across dashboards

#### Feature Components
```
components/
├── faceidlogin/
│   ├── FaceIdLogin.js     # Facial recognition login
│   └── models/            # Face-API.js models
├── login/
│   ├── logincard.js       # Email/password login
│   └── StudentLogin.js    # Student ID login
├── pinlogin/
│   └── UserIdLogin.js     # PIN-based login
├── usermanagement/
│   ├── usermanagement.js  # User CRUD
│   ├── UserForm.js        # User form
│   ├── FaceCapture.js     # Face capture for registration
│   ├── form.js           # Deprecated form
│   └── modal.js          # User modal
├── wtf/                   # Wall of Fame ⭐
│   ├── WtfDashboard.js
│   ├── WallOfFame.js
│   ├── WTFManagement.js
│   ├── StudentSubmission.js
│   ├── CreateNewPinModal.js
│   ├── PinEditModal.js
│   ├── ReviewModal.js
│   ├── DraftsModal.js
│   ├── CoachSuggestionReviewModal.js
│   ├── CoursesSection.js
│   ├── CategoryButtons.js
│   ├── LevelIndicators.js
│   ├── BackgroundSettings.js
│   └── modals/
│       ├── AudioPlayer.js
│       ├── VideoPlayer.js
│       ├── TextReader.js
│       ├── ArticleEditor.js
│       └── ImageViewer.js
├── machineManagement/
│   └── machineManagement.js
├── balagruhaManagement/
│   └── balagruhamanagement.js
├── TaskManagement/
│   └── taskmanagement.js
├── courseManagement/
│   ├── CourseManagement.js
│   └── CourseNavbar.js
├── purchaseManagement/
│   └── PurchaseManagement.js
├── repairManagement/
│   └── RepairManagement.js
├── Attendance/
│   └── attendance.js
├── RBAC/
│   └── RBACManagement.js
├── sidebar/
│   └── sidebar.js
├── header/
│   └── header.js
├── cards/
│   └── cards.js
├── hooks/
│   └── usePermission.js
├── Navigation.js
├── Layout.js
├── RoleBasedNavigation.js
├── ProtectedRoute.js
├── PermissionGuard.js
└── AccessDenied.js
```

**Sprint 5 Location:** Add `components/shop/` directory for shop UI.

### API Client (`frontend/src/`)
```
src/
├── api.js                 # API client functions ⚠️ No centralized axios instance
└── App.js                 # Main app component with routing
```

**Issues:**
- No axios interceptors for auth
- API functions scattered across components
- No request/response error handling

### Styles
```
src/
└── components/
    └── */*.css           # Component-specific CSS files
```

**Note:** Uses inline styles + CSS files, no CSS-in-JS, no Tailwind CSS.

## Electron Structure

### Main Process
```
/
├── main.js               # Main Electron process ⭐
│   - Manages MongoDB embedded instance
│   - Manages Node.js embedded instance
│   - Creates browser window
│   - Handles IPC (MAC address API)
│
├── preload.js           # Preload script
│   - Exposes electron APIs to renderer
│
└── package.json         # Electron configuration
    - Defines build configuration
    - Extra resources for packaging
```

### Embedded Resources
```
resources/
├── mongodb/bin/
│   ├── mongod          # MongoDB server binary
│   └── mongorestore    # MongoDB restore utility
└── nodejs/
    └── node.exe        # Node.js runtime
```

### Build Output (`dist/`)
Created by `electron-builder`:
```
dist/
├── PlaygroundApp.exe   # Windows installer
├── mac/                # macOS build
└── linux/              # Linux build
```

## Deployment Architecture

### Electron Packaging Flow
```
1. React build → frontend/build/
2. Copy build/ to root/build/
3. Electron builder packages:
   - build/ (React app)
   - backend/ (Node.js backend)
   - main.js (Electron main)
   - resources/ (MongoDB, Node.js)
```

### Embedded MongoDB
- Binary: Packaged in `resources/mongodb/bin/`
- Data directory: `<user-data>/mongodb/data/`
- Initial dump: Restored from `backend/db/dump/isfplayground/`

### Embedded Node.js
- Binary: Packaged in `resources/nodejs/`
- Runs backend/server.js on app startup

## Sprint 5 Directory Structure

### New Directories to Create
```
backend/
├── models/
│   └── shopItem.js       # Shop item model
│   └── order.js          # Order model
│   └── cart.js           # Cart model (optional)
│
├── controllers/
│   └── shopController.js # Shop controller
│
├── services/
│   └── shop.js          # Shop business logic
│
├── routes/
│   └── v2/
│       └── shop.js      # Shop routes
│
└── middleware/
    └── shopValidation.js # Shop input validation

frontend/
└── src/
    └── components/
        └── shop/
            ├── ShopDashboard.js
            ├── ProductGrid.js
            ├── ProductCard.js
            ├── ProductDetail.js
            ├── Cart.js
            ├── Checkout.js
            ├── OrderHistory.js
            ├── OrderDetail.js
            └── CoinBalance.js
```

## Key File Relationships

### Authentication Flow
```
frontend/login/logincard.js
  → POST /api/auth/login
    → backend/routes/auth.js
      → User.findOne()
      → User.comparePassword()
      → jwt.sign()
        → Returns token
          → Frontend stores in localStorage
```

### WTF + Coin Flow
```
frontend/wtf/CreateNewPinModal.js
  → POST /api/v1/wtf/pins
    → backend/routes/v1/wtf.js
      → wtfController.createPin()
        → wtfService.createPin()
          → WTFPin.create()
          → Coin.awardWtfCoins() ⭐
            → coinRecord.addCoins()
              → Notification.createPersonal() ⭐
```

### Sprint 5 Shop Flow (Planned)
```
frontend/shop/Checkout.js
  → POST /api/v2/shop/purchase
    → backend/routes/v2/shop.js
      → shopController.processPurchase()
        → shopService.completePurchase()
          → Coin.findOrCreateForUser()
            → coinRecord.spendCoins() ⭐
            → Order.create()
            → Notification.createPersonal() ⭐
              → WebSocket broadcast
```

## File Count Summary
```
Backend:
  - Models: 27 files
  - Controllers: 20 files
  - Services: 24 files
  - Routes: 22 files (v1 + non-versioned)

Frontend:
  - Components: ~56 files (excluding WTF modals)
  - WTF Components: 20 files
  - Total: ~76 files

Total Lines of Code: ~50,000+ (estimated)
```

## Navigation Patterns

### Backend Route Mounting (server.js)
```javascript
app.use("/api/v1/users", userV1Routes);
app.use("/api/v1/coin", coinRoutes);
app.use("/api/v1/wtf", wtfRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);

// Sprint 5: Add
app.use("/api/v2/shop", shopRoutes);
```

### Frontend Routing (App.js)
```javascript
<Routes>
  <Route path="/login" element={<LoginCard />} />
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
  <Route path="/wtf" element={<ProtectedRoute><WTFManagement /></ProtectedRoute>} />

  {/* Sprint 5: Add */}
  <Route path="/shop" element={<ProtectedRoute><ShopDashboard /></ProtectedRoute>} />
</Routes>
```

## Key Observations for Sprint 5

### 1. Backend is Well-Structured
- Clear separation of concerns (routes → controllers → services → models)
- Service layer exists for business logic
- Coin system ready for extension

### 2. Frontend Needs Improvement
- No state management (Redux, Zustand)
- API calls in components
- Massive component files (admin.js: 1440 lines)
- No reusable hooks

### 3. Extension Strategy
- **Backend:** Add v2 routes, new models, shop service
- **Frontend:** Create isolated shop/ directory, consider state management
- **DO NOT REFACTOR:** Sprint 1 code remains untouched

### 4. Safe Integration Points
- Coin wallet system: Use existing `spendCoins()` method
- Notifications: Use existing notification service
- Authentication: Use existing middleware
- WebSocket: Use existing WTF WebSocket service

## Summary

The project has a **clear architectural foundation** for Sprint 5:
- ✅ Well-organized backend with service layer
- ✅ Coin and notification systems ready
- ✅ Authentication infrastructure solid
- ⚠️ Frontend lacks state management
- ⚠️ Large component files with technical debt
- ⚠️ API client needs centralization

**Sprint 5 Approach:** Build shop as isolated module, follow backend patterns, improve frontend structure for shop only.

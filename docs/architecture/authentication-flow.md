# Authentication & Authorization Architecture

## Overview
ISF Playground implements a multi-modal authentication system with role-based access control (RBAC), supporting traditional login, student ID login, and facial recognition.

## Authentication Methods

### 1. Traditional Email/Password Login
**Route:** `POST /api/auth/login`
**Location:** `backend/routes/auth.js`

#### Flow
```
1. Client sends { email, password }
2. Server finds user by email
3. Validates account status (not locked, active)
4. Compares password using bcrypt
5. Validates machine MAC address (for students)
6. Updates lastLogin timestamp
7. Generates JWT token
8. Returns { token, user: { id, name, email, role, status } }
```

#### Implementation
```javascript
// Password hashing (pre-save hook in User model)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (this.password && this.password !== "") {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Password comparison
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

#### Account Lockout Mechanism
```javascript
// User model methods
userSchema.methods.isLocked = function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

userSchema.methods.incrementLoginAttempts = async function () {
  // If lock expired, reset
  if (this.lockUntil && this.lockUntil < Date.now()) {
    await this.updateOne({
      loginAttempts: 1,
      $unset: { lockUntil: 1 }
    });
  } else {
    const updates = { $inc: { loginAttempts: 1 } };

    // Lock after 5 failed attempts
    if (this.loginAttempts + 1 >= 5) {
      updates.$set = { lockUntil: Date.now() + 1800000 }; // 30 minutes
    }

    await this.updateOne(updates);
  }
};
```

### 2. Student ID Login (No Password)
**Route:** `POST /api/auth/student/login`
**Location:** `backend/routes/auth.js`

#### Flow
```
1. Client sends { userId } (can be ObjectId, custom userId, or email)
2. Server tries multiple lookup strategies:
   a. MongoDB ObjectId (_id field)
   b. Custom numeric userId field
   c. Email field
3. Validates user.role === "student"
4. Updates lastLogin
5. Generates JWT token
6. Returns token and user data
```

#### Implementation
```javascript
router.post("/student/login", async (req, res) => {
  const { userId } = req.body;

  // Try ObjectId lookup
  if (mongoose.Types.ObjectId.isValid(userId)) {
    user = await User.findById(userId);
  }

  // Try numeric userId
  if (!user) {
    const numericUserId = parseInt(userId);
    if (!isNaN(numericUserId)) {
      user = await User.findOne({ userId: numericUserId });
    }
  }

  // Try email lookup
  if (!user) {
    user = await User.findOne({ email: userId });
  }

  // Validate student role
  if (!user || user.role !== UserTypes.STUDENT) {
    return res.status(400).json({ success: false, message: "Invalid credentials" });
  }

  // Generate token and return
});
```

### 3. Facial Recognition Login
**Route:** `POST /api/auth/student/facial/login`
**Location:** `backend/routes/auth.js` → `backend/controllers/userController.js:facialLogin`

#### Technology Stack
- **Library:** Face-API.js (on both frontend and backend)
- **Models Used:**
  - SSD MobileNet v1 (face detection)
  - Face Landmark 68 (facial landmarks)
  - Face Recognition (face descriptors)

#### Model Loading (Backend)
```javascript
// backend/server.js
async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights");
  await faceapi.nets.faceLandmark68Net.loadFromDisk("./weights");
  await faceapi.nets.faceRecognitionNet.loadFromDisk("./weights");
}
loadModels();
```

#### Facial Data Storage
```javascript
// User model
{
  facialData: {
    faceDescriptor: Array,  // 128-dimensional face descriptor
    createdAt: { type: Date, default: Date.now }
  }
}
```

#### Flow
```
1. Client captures facial images (up to 5)
2. Client sends images + macAddress
3. Server extracts face descriptors from images
4. Server compares against all stored face descriptors
5. Finds best match using Euclidean distance
6. Validates match threshold (< 0.6 for acceptance)
7. Validates machine assignment (optional)
8. Generates JWT token
9. Returns token and user data
```

#### Implementation Details
```javascript
// backend/services/student.js:faceLogin
async faceLogin(data) {
  const { facialData, macAddress } = data;

  // 1. Load images and extract descriptors
  const inputDescriptors = [];
  for (const image of facialData) {
    const img = await canvas.loadImage(image.path);
    const detection = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      inputDescriptors.push(detection.descriptor);
    }
  }

  // 2. Get all students with facial data
  const students = await User.find({
    role: UserTypes.STUDENT,
    "facialData.faceDescriptor": { $exists: true }
  });

  // 3. Find best match
  let bestMatch = null;
  let bestDistance = Infinity;

  for (const student of students) {
    const storedDescriptor = new Float32Array(student.facialData.faceDescriptor);

    for (const inputDescriptor of inputDescriptors) {
      const distance = faceapi.euclideanDistance(inputDescriptor, storedDescriptor);

      if (distance < bestDistance) {
        bestDistance = distance;
        bestMatch = student;
      }
    }
  }

  // 4. Validate threshold
  if (bestDistance < 0.6) {
    // Generate JWT token
    const token = jwt.sign({ id: bestMatch._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    return { success: true, token, user: bestMatch };
  }

  return { success: false, message: "Face not recognized" };
}
```

## JWT Token Generation

### Token Structure
```javascript
const token = jwt.sign(
  { id: user._id },           // Payload
  process.env.JWT_SECRET,     // Secret key
  { expiresIn: "1d" }         // Expiration
);
```

### Token Validation Middleware
**Location:** `backend/middleware/auth.js`

```javascript
exports.authenticate = async (req, res, next) => {
  try {
    // 1. Extract token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    // 2. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user
    const user = await User.findById(decoded.id).select("-password");

    // 4. Validate user status
    if (!user || user.status === "inactive") {
      return res.status(401).json({
        success: false,
        message: "User not found or inactive"
      });
    }

    // 5. Validate machine MAC address (currently disabled)
    const macAddress = req.header("MAC-Address");
    const machine = await Machine.findOne({
      macAddress: macAddress,
      status: "active"
    });

    // 6. Attach user and machine to request
    req.user = user;
    req.machine = machine;

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid token or MAC Address"
    });
  }
};
```

## Role-Based Access Control (RBAC)

### User Roles
```javascript
// Defined in User model
role: {
  type: String,
  enum: [
    "admin",
    "coach",
    "balagruha-incharge",
    "student",
    "purchase-manager",
    "medical-incharge",
    "sports-coach",
    "music-coach",
    "amma"
  ],
  required: true
}
```

### Authorization Middleware
**Location:** `backend/middleware/auth.js`

```javascript
exports.authorize = (module, action) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role;

      // BYPASS in development mode
      if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "local") {
        console.log(`🚀 DEV MODE: Bypassing role check for ${module}:${action}`);
        return next();
      }

      // Find role document
      const role = await Role.findOne({ roleName: userRole });

      if (!role) {
        return res.status(403).json({
          success: false,
          message: `Role ${userRole} not found`
        });
      }

      // Check permissions
      const hasPermission = role.permissions.some((permission) => {
        return permission.module === module && permission.actions.includes(action);
      });

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: `Role ${userRole} is not authorized to perform ${action} on ${module}`
        });
      }

      next();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  };
};
```

### Role Model Structure
**Location:** `backend/models/role.js`

```javascript
{
  roleName: String,
  permissions: [
    {
      module: String,        // e.g., "users", "tasks", "machines"
      actions: [String]      // e.g., ["create", "read", "update", "delete"]
    }
  ]
}
```

### Usage Example
```javascript
// Protect route with authentication and authorization
router.post("/users",
  authenticate,                           // Validate JWT token
  authorize("users", "create"),          // Check RBAC permission
  userController.createUser
);
```

## Machine Validation (Electron-specific)

### MAC Address Tracking
```javascript
// main.js (Electron)
ipcMain.handle("get-mac-address", async () => {
  const os = require("os");
  const nets = os.networkInterfaces();

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (!net.internal && net.mac !== "00:00:00:00:00:00") {
        return net.mac;
      }
    }
  }

  return "MAC not found";
});
```

### Machine Model
**Location:** `backend/models/machine.js`

```javascript
{
  name: String,
  macAddress: String (unique),
  status: Enum ["active", "inactive", "maintainence"],
  AssignedBalagruha: ObjectId (ref: Balagruha),
  assignedUsers: [ObjectId] (ref: User)
}
```

### Student-Machine Validation (Currently Commented Out)
```javascript
// In auth.js login route
if (user.role === UserTypes.STUDENT) {
  let macAddress = req.headers["mac-address"];

  if (user.assignedMachines && user.assignedMachines.length > 0) {
    let machines = await fetchMachinesByIds(user.assignedMachines);
    let machineMacAddressList = machines.data.map(item => item.macAddress);

    if (!machineMacAddressList.includes(macAddress)) {
      // Machine not assigned - currently allows login
      // return res.status(400).json({ message: "Machine not assigned" });
    }
  }
}
```

## Sprint 5 Integration: Shop Authentication

### 1. Token Management in Shop
```javascript
// Frontend: Store token on login
localStorage.setItem('authToken', token);

// Frontend: Include in all shop API requests
const response = await fetch('/api/v1/shop/products', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    'MAC-Address': await window.electronAPI.getMacAddress()
  }
});
```

### 2. Shop-Specific Authorization
```javascript
// backend/routes/v1/shop.js (to be created)
const { authenticate } = require('../../middleware/auth');

router.get('/products',
  authenticate,  // All shop routes require authentication
  shopController.getProducts
);

router.post('/purchase',
  authenticate,
  shopController.processPurchase
);
```

### 3. User Role Context in Shop
```javascript
// Different shop experiences by role
router.get('/available-items',
  authenticate,
  (req, res) => {
    const userRole = req.user.role;

    // Students see different items than coaches
    const items = await ShopItem.find({
      availableFor: { $in: [userRole, 'all'] }
    });

    res.json({ items });
  }
);
```

## Security Considerations

### Current Issues
1. **Weak Password Policy:** No minimum length or complexity requirements in model validation
2. **Plain Text Passwords in CreateUser:** `userController.js:createUser` doesn't hash password (relies on pre-save hook)
3. **JWT Secret:** Must be set in environment, currently commented validation check
4. **Machine Validation Disabled:** MAC address checks are commented out
5. **No Rate Limiting:** On authentication endpoints
6. **Console.log Usage:** Sensitive data logged in middleware

### Technical Debt
```javascript
// backend/controllers/userController.js:createUser (line 71-86)
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password,  // ❌ ISSUE: No explicit validation, relies on pre-save hook
      role,
    });

    await newUser.save();
    res.status(201).json(newUser);  // ❌ ISSUE: Returns password hash
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
```

### Recommendations for Sprint 5
1. **Add Input Validation:** Use express-validator for all auth endpoints
2. **Add Rate Limiting:** Prevent brute force attacks
   ```javascript
   const rateLimit = require("express-rate-limit");

   const authLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 5, // 5 requests per window
     message: "Too many login attempts"
   });

   router.post("/login", authLimiter, ...);
   ```
3. **Enable Machine Validation:** For production deployments
4. **Implement Refresh Tokens:** For better security
5. **Add Audit Logging:** Track all authentication attempts

## Frontend Integration

### React Context Pattern
**Location:** Frontend uses localStorage, no centralized auth context (TECHNICAL DEBT)

```javascript
// Current pattern in components
const handleLogin = async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });

  const { token, user } = await response.json();

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  // Redirect
  navigate('/dashboard');
};
```

### Protected Routes
**Location:** `frontend/src/components/ProtectedRoute.js`

```javascript
function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <AccessDenied />;
  }

  return children;
}
```

## Testing Scenarios for Sprint 5

### Authentication Tests
1. Valid login with email/password
2. Invalid credentials
3. Locked account (5 failed attempts)
4. Inactive user account
5. Student login with userId
6. Student login with facial recognition
7. Token expiration handling
8. Concurrent sessions

### Authorization Tests
1. Student accessing shop (should succeed)
2. Student accessing admin panel (should fail)
3. Coach accessing shop (should succeed)
4. Expired token usage
5. Role-based item availability

## Summary

Authentication system is **functional but needs hardening** for Sprint 5:
- ✅ Multi-modal authentication (email/password, student ID, facial)
- ✅ JWT token generation
- ✅ RBAC middleware
- ✅ Account lockout mechanism
- ⚠️ Machine validation disabled
- ⚠️ No input validation
- ⚠️ No rate limiting
- ⚠️ Frontend lacks centralized auth state management

**Sprint 5 Strategy:** Use existing authentication as-is, add shop-specific authorization checks, implement rate limiting for shop endpoints.

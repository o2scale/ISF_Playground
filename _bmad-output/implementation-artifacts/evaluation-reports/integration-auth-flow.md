# Auth Flow End-to-End Trace Report

**Story:** 9.3 -- Auth Flow End-to-End Trace
**Date:** 2026-03-17
**Status:** Complete (Discovery only -- no code changes)

---

## Table of Contents

1. [Flow 1: Email/Password Login (Admin/Coach)](#flow-1-emailpassword-login)
2. [Flow 2: Facial Recognition Login (Student)](#flow-2-facial-recognition-login)
3. [Flow 3: Student UserID Login](#flow-3-student-userid-login)
4. [Cross-Flow Consistency Analysis](#cross-flow-consistency-analysis)
5. [401 Handling and Token Lifecycle](#401-handling-and-token-lifecycle)
6. [Gaps and Findings](#gaps-and-findings)
7. [Recommendations](#recommendations)

---

## Flow 1: Email/Password Login

### Text Diagram

```
LoginCard (/admin/login)
  |
  v
PinLogin.jsx (form: email + password)
  |  handleSubmit() -> login()
  |  payload: { email, password }
  v
pinLogin() [frontend/src/api/auth.js]
  |  POST /api/auth/login  (via `api` axios instance)
  |  Content-Type: application/json
  v
routes/auth.js
  |  router.post("/login", authLimiter, authController.login)
  |  middleware chain: [authLimiter (5 req / 15 min)]
  v
authController.login() [backend/controllers/authController.js]
  |  1. Find user by email
  |  2. Check isLocked()
  |  3. Check status !== "inactive"
  |  4. comparePassword()
  |  5. Reset login attempts
  |  6. Student MAC check (commented out / disabled)
  |  7. Update lastLogin
  |  8. jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" })
  v
Response: 200 OK
  {
    success: true,
    message: "Login successful",
    data: {
      token: "<JWT>",
      user: {
        id: user._id,        // MongoDB ObjectId
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        balagruhaIds: user.balagruhaIds || []
      }
    }
  }
  |
  v
PinLogin.jsx (response handling)
  |  Destructures: resData.data -> { token, user }
  |  Normalizes: user.id = user.id || user._id
  |  Passes balagruhaIds from response
  |  Calls authLogin(userData)
  v
AuthContext.login(userData)
  |  State: setToken, setUser, setIsAuthenticated
  |  localStorage:
  |    "token"        -> token
  |    "name"         -> user.name
  |    "role"         -> user.role
  |    "userId"       -> user.id  (conditional: only if truthy)
  |    "balagruhaIds" -> JSON.stringify(user.balagruhaIds) (conditional)
  |  axios: api.defaults.headers.common["Authorization"] = "Bearer <token>"
  v
Navigate to /dashboard
```

### Error Handling (Flow 1)

| Error | HTTP Status | Backend Response | Frontend Display |
|-------|-------------|-----------------|------------------|
| User not found | 400 | `{ success: false, message: "Invalid credentials" }` | Shown via toast + inline error |
| Account locked | 423 | `{ success: false, message: "Account is locked..." }` | Shown via toast + inline error |
| Account inactive | 401 | `{ success: false, message: "Account is inactive..." }` | Shown via toast + inline error |
| Wrong password | 400 | `{ success: false, message: "Invalid credentials" }` | Shown via toast + inline error |
| Rate limited | 429 | `{ success: false, message: "Too many attempts..." }` | Shown via toast + inline error |
| Server error | 500 | `{ success: false, message: "Error in login" }` | Generic message via toast |
| No server response | N/A | N/A | "No response from server. Please try again later." |

---

## Flow 2: Facial Recognition Login

### IMPORTANT: Two Separate FR Systems Exist

There are **two separate facial recognition backends** in this codebase:

1. **Legacy route** (`/api/auth/student/facial/login`) -- This is what the frontend currently calls. It goes through `userController.facialLogin` -> `Student.faceLogin()`, which is a **503 stub** returning "Facial recognition system is being rebuilt."

2. **V2 route** (`/api/v2/fr/recognize`) -- This is the new @vladmandic/human-based system in `frController.js`. It recognizes faces and returns student data but does **NOT** create a JWT token. The frontend does **NOT** call this endpoint for login.

### Text Diagram (Current Active Flow -- Legacy, Non-Functional)

```
StudentLogin (/login)  OR  LoginCard (/admin/login)
  |  (both toggle between FaceIdLogin and PIN)
  v
FaceIdLogin.js [frontend/src/components/faceidlogin/FaceIdLogin.js]
  |  Webcam capture -> canvas -> JPEG blob
  |  Creates FormData with "facialData" key
  v
faceIdlogin() [frontend/src/api/auth.js]
  |  POST /api/auth/student/facial/login
  |  via `apiWithoutContentType` (no Content-Type header -- multipart)
  v
routes/auth.js
  |  router.post("/student/facial/login",
  |    upload.fields([{ name: "facialData", maxCount: 5 }]),
  |    facialLogin  // from userController
  |  )
  |  middleware: [multer upload] -- NO rate limiter!
  v
userController.facialLogin() [backend/controllers/userController.js]
  |  Calls Student.faceLogin(req.body)
  v
Student.faceLogin() [backend/services/student.js]
  |  STUB: returns { success: false, code: 503,
  |    message: "Facial recognition system is being rebuilt..." }
  v
Response: 400 (always fails)
```

### Text Diagram (V2 FR -- Backend Only, Not Wired to Frontend Login)

```
POST /api/v2/fr/recognize
  |  middleware: [multer upload.single('photo')] -- NO auth, NO rate limiter
  v
frController.recognizeFace()
  |  Accepts: multipart file OR base64 body
  |  Calls frService.recognizeFace(imageBuffer, threshold)
  |  Looks up User with role='student' by result.studentId
  v
Response: 200 OK
  {
    success: true,
    message: "Face recognized successfully",
    data: {
      studentId: "<ObjectId>",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        phoneNumber: student.phoneNumber,
        balagruhaIds: student.balagruhaIds
      },
      confidence: <float>,
      threshold: <float>,
      quality: <object>,
      topMatches: [...]
    }
  }
  // NOTE: NO JWT token in this response!
```

### Frontend Expectation (FaceIdLogin.js)

The FaceIdLogin component expects the API response to contain:

```javascript
const { token, user, confidence } = apiRes.data;
```

This means the frontend expects `data.token`, `data.user`, and optionally `data.confidence`. The legacy endpoint (when it worked) presumably returned this shape. The V2 `/recognize` endpoint does **NOT** return a `token` field -- it only returns student identity data.

### Error Handling (Flow 2)

The FaceIdLogin component handles errors with user-friendly messages:
- "liveness" keyword -> "Liveness check failed..."
- "no face" keyword -> "No face detected..."
- "not found" / "not recognized" -> "Face not recognized..."
- Generic fallback: "Face recognition failed"

---

## Flow 3: Student UserID Login

### Text Diagram

```
StudentLogin (/login)
  |
  v
UserIdLogin.js [frontend/src/components/pinlogin/UserIdLogin.js]
  |  form: userId only (no password)
  |  payload: { userId }
  v
studentPinLogin() [frontend/src/api/auth.js]
  |  POST /api/auth/student/login  (via `api` axios instance)
  |  Content-Type: application/json
  |  NOTE: returns full axios `response`, not `response.data`!
  v
routes/auth.js
  |  router.post("/student/login", authLimiter, authController.studentLogin)
  |  middleware chain: [authLimiter (5 req / 15 min)]
  v
authController.studentLogin() [backend/controllers/authController.js]
  |  1. Validate userId is present
  |  2. Lookup chain:
  |     a. If valid 24-char ObjectId -> User.findById(userId)
  |     b. Try User.findOne({ userId: parseInt(userId) })  (numeric)
  |     c. Try User.findOne({ userId: userId })  (string)
  |     d. Try User.findOne({ email: userId })  (email fallback)
  |  3. Verify user.role === "student"
  |  4. Update lastLogin
  |  5. jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" })
  v
Response: 200 OK
  {
    success: true,
    message: "Login successful",
    data: {
      token: "<JWT>",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
        // NOTE: NO balagruhaIds field!
      }
    }
  }
  |
  v
UserIdLogin.js (response handling)
  |  Destructures: response.data.data -> { token, user }
  |  (Note: extra .data because studentPinLogin returns full axios response)
  |  Checks user.status === 'inactive' -> blocks login
  |  Normalizes: user.id = user.id || user._id
  |  Does NOT include balagruhaIds in userData!
  |  Calls authLogin(userData)
  v
AuthContext.login(userData)
  |  (same as Flow 1)
  v
Navigate based on role:
  - student -> /student/dashboard
  - other  -> /dashboard
```

### Error Handling (Flow 3)

| Error | HTTP Status | Backend Response | Frontend Display |
|-------|-------------|-----------------|------------------|
| Missing userId | 400 | `{ success: false, message: "userId is required" }` | Shown via toast + inline error |
| User not found | 400 | `{ success: false, message: "Invalid credentials" }` | Shown via toast + inline error |
| Non-student role | 400 | `{ success: false, message: "Invalid credentials" }` | Shown via toast + inline error |
| Inactive account | N/A | Backend does NOT check status | Frontend checks `user.status === 'inactive'` client-side |
| Server error | 500 | `{ success: false, message: "Error in login" }` | Generic message via toast |

---

## Cross-Flow Consistency Analysis

### JWT Payload (All Flows)

All three backend login endpoints use the same JWT payload:

```javascript
jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
```

The JWT payload contains **only** `{ id }` -- it does NOT include `role`, `balagruhaIds`, or any other fields. The `authenticate` middleware decodes this and fetches the full user from the database.

### Response Shape Comparison

| Field | Flow 1 (email/pwd) | Flow 2 (FR legacy) | Flow 3 (userId) |
|-------|--------------------|--------------------|-----------------|
| `data.token` | Yes | N/A (503 stub) | Yes |
| `data.user.id` | Yes (`user._id`) | N/A | Yes (`user._id`) |
| `data.user.name` | Yes | N/A | Yes |
| `data.user.email` | Yes | N/A | Yes |
| `data.user.role` | Yes | N/A | Yes |
| `data.user.status` | Yes | N/A | Yes |
| `data.user.balagruhaIds` | **Yes** (`user.balagruhaIds \|\| []`) | N/A | **NO** |

### Frontend Storage Comparison

| localStorage Key | Flow 1 (PinLogin) | Flow 2 (FaceIdLogin) | Flow 3 (UserIdLogin) |
|-----------------|-------------------|---------------------|---------------------|
| `token` | Yes | Yes (if it worked) | Yes |
| `name` | Yes | Yes | Yes |
| `role` | Yes | Yes | Yes |
| `userId` | Yes | Yes | Yes |
| `balagruhaIds` | **Yes** | **No** (not in userData) | **No** (not in response) |

### User Object Shape in AuthContext

| Field | Flow 1 | Flow 2 | Flow 3 |
|-------|--------|--------|--------|
| `user.id` | Set | Set | Set |
| `user.name` | Set | Set | Set |
| `user.email` | Set | Set | Set |
| `user.role` | Set | Set | Set |
| `user.status` | Set | Set | Set |
| `user.balagruhaIds` | **Set** | **Not set** | **Not set** |

---

## 401 Handling and Token Lifecycle

### Token Storage

- JWT stored in `localStorage` under key `"token"`
- Token expiry: 1 day (server-side)
- No token refresh mechanism exists -- expired tokens trigger a 401

### Request Interceptor

Both `api` and `apiWithoutContentType` instances have request interceptors that read the token from `localStorage` on every request:

```javascript
config.headers.Authorization = `Bearer ${token}`;
```

Additionally, `AuthContext.login()` sets `api.defaults.headers.common["Authorization"]`, creating redundancy (interceptor always overrides from localStorage anyway).

### Response Interceptor (401 Handling)

Both `api` and `apiWithoutContentType` have 401 response interceptors:

```javascript
if (error.response && error.response.status === 401) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");    // <-- BUG: "user" key is never set!
  window.location.href = "/login";
}
```

**Note:** The interceptor removes `"user"` from localStorage, but `AuthContext.login()` never sets a `"user"` key. It stores individual fields (`name`, `role`, `userId`, `balagruhaIds`). This means the 401 handler does NOT fully clean up localStorage -- it leaves `name`, `role`, `userId`, and `balagruhaIds` behind.

### Backend 401 Responses

The `authenticate` middleware returns 401 in these cases:
- Missing token: `{ message: "Authentication required" }`
- User not found / inactive: `{ message: "User not found or inactive" }`
- Token expired: `{ message: "Token expired. Please login again.", code: "TOKEN_EXPIRED" }`
- Invalid token: `{ message: "Invalid token. Please login again.", code: "INVALID_TOKEN" }`

### Axios Instance Coverage

Only two axios instances exist in the frontend (`api` and `apiWithoutContentType`), both in `frontend/src/api/client.js`. Both have 401 interceptors. No other axios instances were found. All API modules import from `./client` via the barrel export at `api/index.js`.

---

## Gaps and Findings

### CRITICAL

1. **FR Login is Completely Broken (Flow 2)**
   - The legacy `Student.faceLogin()` is a 503 stub
   - The v2 `frController.recognizeFace()` does NOT create a JWT
   - The frontend `FaceIdLogin` component calls the legacy route, not v2
   - **Impact:** Face ID login is non-functional for all students
   - **Fix needed:** Either wire FaceIdLogin to call v2 `/recognize` then a separate login endpoint, or add JWT creation to the v2 recognize response

2. **`balagruhaIds` Missing from Student Login Response (Flow 3)**
   - `authController.studentLogin()` does NOT include `balagruhaIds` in the response
   - `authController.login()` DOES include it
   - **Impact:** Students logging in via userId will have empty `balagruhaIds` in AuthContext, which may break Balagruha-scoped features
   - **File:** `backend/controllers/authController.js` line 241

3. **`balagruhaIds` Not Forwarded in FaceIdLogin (Flow 2)**
   - Even if FR worked, `FaceIdLogin.js` does NOT include `balagruhaIds` in the `userData` object passed to `authLogin()`
   - **File:** `frontend/src/components/faceidlogin/FaceIdLogin.js` ~line 279

### HIGH

4. **401 Interceptor Incomplete localStorage Cleanup**
   - The 401 interceptor removes `"token"` and `"user"`, but `"user"` is never set
   - It does NOT remove `"name"`, `"role"`, `"userId"`, `"balagruhaIds"` -- these persist after forced logout
   - This creates a stale state scenario: on next page load, `initializeAuth()` checks for `storedToken && storedUser.name && storedUser.role`, and since `name`/`role` persist, a race condition could occur if a new token is partially written
   - **File:** `frontend/src/api/client.js` lines 47-48

5. **No Rate Limiting on Legacy FR Route**
   - `POST /api/auth/student/facial/login` does NOT use `authLimiter`
   - `POST /api/v2/fr/recognize` also has no rate limiting
   - Email/password and student login both use the rate limiter
   - **File:** `backend/routes/auth.js` lines 100-108

6. **`studentPinLogin` Returns Different Shape Than `pinLogin`**
   - `pinLogin()` returns `response.data` (unwrapped)
   - `studentPinLogin()` returns `response` (full axios response)
   - This forces different destructuring patterns in the consuming components
   - **Files:** `frontend/src/api/auth.js` lines 21-29 vs 32-40

### MEDIUM

7. **No Inactive Account Check in `studentLogin` Backend**
   - `authController.login()` checks `user.status === "inactive"` and returns 401
   - `authController.studentLogin()` does NOT check status at all
   - The `UserIdLogin` frontend component does a client-side check, but this is bypassable
   - **File:** `backend/controllers/authController.js` (studentLogin function)

8. **No Login Attempt Tracking for Student Login**
   - `authController.login()` tracks and limits failed login attempts (lockout mechanism)
   - `authController.studentLogin()` has no brute-force protection beyond rate limiting
   - Combined with the flexible lookup chain (ObjectId, numeric userId, string userId, email), this widens the attack surface

9. **JWT Payload Is Minimal**
   - The JWT contains only `{ id }` -- role and permissions are not embedded
   - This means every authenticated request requires a database lookup in the `authenticate` middleware
   - This is a design choice (not necessarily a bug), but has performance implications

10. **`initializeAuth` Rebuilds User Object Differently**
    - On page reload, `initializeAuth()` rebuilds the user from localStorage with keys: `name`, `role`, `id` (from "userId"), `balagruhaIds`
    - The login flow stores the user with additional fields: `email`, `status`
    - These extra fields are lost on page reload and are not available in `AuthContext.user` after refresh
    - **File:** `frontend/src/contexts/AuthContext.js` lines 17-25

---

## Recommendations

### Priority 1 (Critical -- Fix Before Next Sprint)

1. **Wire FR login end-to-end:** Create a new backend endpoint or modify `/api/v2/fr/recognize` to return a JWT upon successful recognition. Update `FaceIdLogin.js` to call the correct endpoint.

2. **Add `balagruhaIds` to `studentLogin` response:** Add `balagruhaIds: user.balagruhaIds || []` to the response in `authController.studentLogin()`.

3. **Fix 401 interceptor cleanup:** Replace `localStorage.removeItem("user")` with removal of all auth keys (`token`, `name`, `role`, `userId`, `balagruhaIds`), matching what `AuthContext.logout()` does.

### Priority 2 (High -- Fix Soon)

4. **Normalize API return shapes:** Make `studentPinLogin()` return `response.data` like `pinLogin()` does, or update all API functions to return the full response consistently.

5. **Add rate limiting to FR endpoints:** Apply `authLimiter` (or a dedicated FR limiter) to both `/api/auth/student/facial/login` and `/api/v2/fr/recognize`.

6. **Add server-side inactive check to `studentLogin`:** Add `if (user.status === 'inactive')` check to `authController.studentLogin()`.

### Priority 3 (Medium -- Backlog)

7. **Ensure `balagruhaIds` forwarded in all frontend flows:** Update `FaceIdLogin.js` to include `balagruhaIds` in the userData passed to `authLogin()`.

8. **Align `initializeAuth` with login data:** Store the full user object in localStorage (as JSON under a single "user" key) to avoid field loss on reload, or add `email` and `status` to the individual localStorage items.

9. **Consider embedding role in JWT:** Adding `role` to the JWT payload would allow the `authenticate` middleware to skip the database lookup for basic role checks (with a separate full-user fetch only when needed).

---

## Key Files Referenced

| File | Role |
|------|------|
| `frontend/src/components/login/logincard.js` | Admin login page (toggles PinLogin / FaceIdLogin) |
| `frontend/src/components/login/StudentLogin.js` | Student login page (toggles UserIdLogin / FaceIdLogin) |
| `frontend/src/components/pinlogin/PinLogin.jsx` | Email/password login form |
| `frontend/src/components/pinlogin/UserIdLogin.js` | Student userId-only login form |
| `frontend/src/components/faceidlogin/FaceIdLogin.js` | Facial recognition login with webcam |
| `frontend/src/api/auth.js` | API functions: `pinLogin`, `studentPinLogin`, `faceIdlogin` |
| `frontend/src/api/client.js` | Axios instances, request/response interceptors |
| `frontend/src/api/index.js` | Barrel export |
| `frontend/src/contexts/AuthContext.js` | Auth state management, login/logout, localStorage |
| `frontend/src/contexts/RBACContext.js` | Permission fetching (depends on `user.id` from AuthContext) |
| `frontend/src/config.js` | API base URL, timeouts |
| `backend/routes/auth.js` | Auth route definitions |
| `backend/controllers/authController.js` | `login`, `studentLogin`, `register` controllers |
| `backend/controllers/userController.js` | Legacy `facialLogin` controller |
| `backend/controllers/frController.js` | V2 `recognizeFace` controller |
| `backend/services/student.js` | `Student.faceLogin()` stub |
| `backend/routes/v2/facialRecognition.js` | V2 FR routes |
| `backend/middleware/auth.js` | `authenticate` and `authorize` middleware |

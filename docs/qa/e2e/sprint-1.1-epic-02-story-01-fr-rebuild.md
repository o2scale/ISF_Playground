# Sprint1.1-Story-01: Facial Recognition System Rebuild - E2E Test Scenarios

**Story**: Facial Recognition System Rebuild with @vladmandic/human
**Story ID**: Sprint1.1-Epic-02-Story-01
**Epic**: Epic 02 - Facial Recognition System Rebuild
**Sprint**: 1.1 - Foundation Fixes
**Test Date**: 2025-10-23
**Tester**: QA Team
**Environment**: Local Development (http://localhost:3000)

---

## Test Environment Setup

### Prerequisites
1. Backend server running on port 5001 with FR service initialized
2. Frontend server running on port 3000
3. MongoDB connected with test data
4. Redis running (optional, gracefully degrades)
5. Node.js v18.20.5 LTS (required for Human library)
6. Test users with appropriate permissions:
   - **Admin user**: Full User Management permissions
   - **In-Charge user**: User Management Read + Create permissions
   - **Coach user**: User Management Read permissions
   - **Student users**: At least 10 test students

### Test Data Requirements
- **Students**: Minimum 20 students without face registration
- **Test Photos**: 30+ test photos (various conditions):
  - Good lighting (bright, natural light)
  - Poor lighting (dim, backlit, shadows)
  - Various angles (straight, 15°, 30° rotation)
  - Various distances (close-up, medium, far)
  - Various expressions (neutral, smile, serious)
  - Spoofing attempts (printed photos, phone screen photos)
- **Registered Students**: 10 students with face already registered
- **Multiple Balagruhas**: At least 3 balagruhas for scope testing

### Test Device/Browser Matrix
- Chrome (latest)
- Firefox (latest)
- Safari (latest) - macOS/iOS only
- Edge (latest)
- Mobile browsers (Chrome, Safari on iOS/Android)

---

## Test Execution Summary

**Total Test Cases**: 78
- **Acceptance Criteria Tests**: 52 tests
- **Cross-Cutting Tests**: 14 tests
- **API Tests**: 6 tests
- **Security Tests**: 6 tests

**Priority Breakdown**:
- P0 (Critical): 35 tests
- P1 (High): 28 tests
- P2 (Medium): 15 tests

---

## AC1: Old FR System Completely Removed

### Test Case 1.1: Verify Old Dependencies Removed
**Priority**: P0 (Critical)
**Objective**: Confirm face-api.js and old models are removed

**Steps**:
1. Check `backend/package.json` for face-api.js
2. Check `backend/node_modules` directory
3. Check `backend/models/` directory for old FR files
4. Check `backend/public/models/` for old model files

**Expected Results**:
- ✅ No face-api.js in package.json
- ✅ No face-api.js in node_modules
- ✅ No old FR service files (faceRecognitionService.js, etc.)
- ✅ No old model files (.bin, .json from face-api.js)

**Test Data**: N/A (code inspection)

**Pass Criteria**: All old dependencies removed

---

### Test Case 1.2: Verify Old Routes Removed
**Priority**: P1 (High)
**Objective**: Confirm old FR routes no longer exist

**Steps**:
1. Attempt to access old FR endpoints:
   - POST `/api/auth/face-register` (old endpoint)
   - POST `/api/auth/face-login` (old endpoint)
2. Check `backend/routes/` for old FR route files

**Expected Results**:
- ✅ Old endpoints return 404 Not Found
- ✅ No old FR route files in codebase

**Test Data**: N/A

**Pass Criteria**: Old routes no longer accessible

---

## AC2: @vladmandic/human Successfully Installed

### Test Case 2.1: Verify Human Library Initialization
**Priority**: P0 (Critical)
**Objective**: Confirm Human library loads successfully on server startup

**Steps**:
1. Restart backend server
2. Check console logs for Human initialization messages
3. Verify no TensorFlow.js errors

**Expected Results**:
- ✅ Log: "Human library initialized"
- ✅ Log: "Face detection: enabled"
- ✅ Log: "Face recognition: enabled"
- ✅ Log: "Liveness detection: enabled"
- ✅ Log: "FR Service initialized"
- ✅ No TensorFlow.js errors
- ✅ Server starts within 15 seconds (warmup time)

**Test Data**: N/A

**Pass Criteria**: Human loads without errors in <15 seconds

---

### Test Case 2.2: Verify FR Models Loaded
**Priority**: P0 (Critical)
**Objective**: Confirm all required FR models are loaded

**Steps**:
1. Start server
2. Check `backend/node_modules/@vladmandic/human/models/` directory
3. Verify model files exist and are bundled

**Expected Results**:
- ✅ Face detection model present
- ✅ Face recognition model present
- ✅ Face mesh model present (468 landmarks)
- ✅ Total model size ~28 MB

**Test Data**: N/A

**Pass Criteria**: All models present and loaded

---

## AC3: Face Registration Accuracy ≥95%

### Test Case 3.1: Register Face - Happy Path
**Priority**: P0 (Critical)
**Objective**: Successfully register a student's face with optimal conditions

**Steps**:
1. Login as Admin user
2. Navigate to User Management → Students
3. Click on a student without face registration
4. Click "Register Face" or upload facial photo
5. Capture/upload photo with good lighting, centered face, neutral expression
6. Submit registration

**Expected Results**:
- ✅ Success message: "Face registered successfully"
- ✅ Confidence score ≥0.9 displayed
- ✅ Liveness score ≥0.6 displayed
- ✅ Quality indicators shown (good/excellent)
- ✅ Registration completes in <5 seconds
- ✅ Student's face status updates to "Registered"

**Test Data**:
- Student ID: Test Student 1
- Photo: High quality, well-lit, centered face

**Pass Criteria**: Registration succeeds with high confidence

---

### Test Case 3.2: Register Face - Multiple Photos
**Priority**: P1 (High)
**Objective**: Test registration accuracy across various photo conditions

**Steps**:
1. Login as Admin
2. Register faces for 20 different students using various photos:
   - 10 photos: Optimal lighting, centered, neutral
   - 5 photos: Acceptable lighting, slightly off-center
   - 5 photos: Dim lighting, angled 15°

**Expected Results**:
- ✅ ≥19 of 20 registrations succeed (95% success rate)
- ✅ Average confidence score ≥0.85
- ✅ Average registration time <5 seconds
- ✅ All successful registrations have liveness score ≥0.6

**Test Data**:
- 20 students
- 20 varied test photos

**Pass Criteria**: ≥95% success rate, avg confidence ≥0.85

---

### Test Case 3.3: Register Face - No Face Detected
**Priority**: P0 (Critical)
**Objective**: Verify graceful failure when no face is detected

**Steps**:
1. Login as Admin
2. Attempt to register face with photo of:
   - Landscape/object (no person)
   - Blurry face
   - Face too small (<10% of frame)

**Expected Results**:
- ✅ Error message: "No face detected in the image"
- ✅ Registration rejected
- ✅ Helpful guidance: "Please ensure face is visible and centered"
- ✅ Student status remains "Not Registered"
- ✅ No database record created

**Test Data**:
- Photo 1: Landscape (no face)
- Photo 2: Blurry face
- Photo 3: Very small face

**Pass Criteria**: Clear error, no registration created

---

### Test Case 3.4: Register Face - Multiple Faces Detected
**Priority**: P1 (High)
**Objective**: Verify handling of multiple faces in photo

**Steps**:
1. Login as Admin
2. Upload photo with 2-3 people visible
3. Attempt registration

**Expected Results**:
- ✅ Error message: "Multiple faces detected. Please capture only one person."
- ✅ Registration rejected
- ✅ No database record created

**Test Data**:
- Photo with 3 people

**Pass Criteria**: Multiple faces rejected with clear message

---

### Test Case 3.5: Register Face - Liveness Check Fails (Printed Photo)
**Priority**: P0 (Critical)
**Objective**: Verify liveness detection prevents spoofing with printed photo

**Steps**:
1. Login as Admin
2. Take a photo of a printed student photo (photo-of-photo)
3. Attempt to register

**Expected Results**:
- ✅ Error message: "Liveness check failed. Please use a live photo, not a screenshot or printed photo."
- ✅ Liveness score <0.6 displayed
- ✅ Registration rejected
- ✅ FRSession logged with failureReason: "liveness_failed"

**Test Data**:
- Printed photo of Test Student 1

**Pass Criteria**: Liveness detection prevents spoofing

---

### Test Case 3.6: Register Face - Liveness Check Fails (Phone Screen)
**Priority**: P0 (Critical)
**Objective**: Verify liveness detection prevents spoofing with phone screen

**Steps**:
1. Login as Admin
2. Display student photo on phone screen
3. Take photo of phone screen
4. Attempt to register

**Expected Results**:
- ✅ Error message: "Liveness check failed"
- ✅ Liveness score <0.6 displayed
- ✅ Registration rejected
- ✅ FRSession logs low mesh quality, poor depth analysis

**Test Data**:
- Photo of phone screen showing Test Student 1

**Pass Criteria**: Screen spoofing detected and prevented

---

### Test Case 3.7: Register Face - Poor Quality Image
**Priority**: P1 (High)
**Objective**: Verify quality validation rejects poor images

**Steps**:
1. Login as Admin
2. Attempt to register with:
   - Very low resolution image (<200x200px)
   - Extremely dark/backlit image
   - Motion-blurred image

**Expected Results**:
- ✅ Error message: "Image quality too low. Please capture a clearer photo."
- ✅ Quality score <0.5 displayed
- ✅ Registration rejected
- ✅ Specific guidance on improving quality

**Test Data**:
- Low res, dark, blurry photos

**Pass Criteria**: Poor quality images rejected

---

### Test Case 3.8: Register Face - Replace Existing Registration
**Priority**: P1 (High)
**Objective**: Verify updating existing face registration

**Steps**:
1. Login as Admin
2. Find student with face already registered
3. Click "Re-register Face" or upload new photo
4. Confirm replacement
5. Submit new registration

**Expected Results**:
- ✅ Warning: "Student already has face registered. Replace?"
- ✅ Confirmation modal displayed
- ✅ Old embedding marked inactive
- ✅ New embedding stored as active
- ✅ FRSession logs replacement event
- ✅ Success message: "Face re-registered successfully"

**Test Data**:
- Student with existing face registration
- New photo of same student

**Pass Criteria**: Old registration replaced, audit trail maintained

---

### Test Case 3.9: Register Face - Image Size Validation
**Priority**: P2 (Medium)
**Objective**: Verify image size limits are enforced

**Steps**:
1. Login as Admin
2. Attempt to upload very large image (>10MB)
3. Observe validation

**Expected Results**:
- ✅ Error message: "Image too large (max 10MB)"
- ✅ Registration rejected before upload
- ✅ Client-side validation triggers

**Test Data**:
- 15MB image file

**Pass Criteria**: Large images rejected

---

## AC4: Face Recognition Accuracy ≥95%

### Test Case 4.1: Face Recognition Login - Happy Path
**Priority**: P0 (Critical)
**Objective**: Successfully login using face recognition

**Steps**:
1. Navigate to login page
2. Click "Login with Face Recognition"
3. Allow camera access
4. Position face in frame (real-time detection shows green box)
5. Wait for quality score ≥60%
6. Click "Capture & Login"

**Expected Results**:
- ✅ Real-time face detection shows bounding box
- ✅ Lighting indicator shows "good" (green)
- ✅ Quality score ≥60% enables capture button
- ✅ Success animation displayed
- ✅ Message: "Face recognized successfully"
- ✅ Confidence score ≥0.5 displayed
- ✅ User logged in and redirected to dashboard
- ✅ Recognition completes in <3 seconds

**Test Data**:
- Registered Student 1 (with good lighting)

**Pass Criteria**: Login succeeds with high confidence

---

### Test Case 4.2: Face Recognition - Batch Testing (20 Students)
**Priority**: P0 (Critical)
**Objective**: Verify ≥95% recognition accuracy across multiple users

**Steps**:
1. Test face recognition login for 20 registered students
2. Each student attempts login 3 times (total 60 attempts)
3. Use varied lighting conditions:
   - 30 attempts: Optimal lighting
   - 20 attempts: Acceptable lighting
   - 10 attempts: Dim lighting
4. Record success/failure rate

**Expected Results**:
- ✅ ≥57 of 60 attempts succeed (≥95% success rate)
- ✅ Average confidence score ≥0.6
- ✅ Average recognition time <2 seconds
- ✅ False positive rate <1% (no wrong person matched)

**Test Data**:
- 20 registered students
- 60 total login attempts
- Varied lighting conditions

**Pass Criteria**: ≥95% recognition accuracy

---

### Test Case 4.3: Face Recognition - Not Registered User
**Priority**: P0 (Critical)
**Objective**: Verify unregistered users cannot login via FR

**Steps**:
1. Navigate to face recognition login
2. Capture photo of student without face registration
3. Attempt login

**Expected Results**:
- ✅ Error message: "Face not recognized. Please ensure you are registered or try again with better lighting."
- ✅ Login rejected
- ✅ FRSession logged with failureReason: "no_match_found"
- ✅ No unauthorized access granted
- ✅ Fallback option: "Login with Username and PIN" visible

**Test Data**:
- Unregistered Test Student

**Pass Criteria**: Unregistered users cannot login

---

### Test Case 4.4: Face Recognition - Wrong Person (False Positive Test)
**Priority**: P0 (Critical)
**Objective**: Verify system doesn't match wrong person

**Steps**:
1. Register Student A's face
2. Attempt FR login using Student B's face
3. Verify rejection

**Expected Results**:
- ✅ Error message: "Face not recognized"
- ✅ Login rejected
- ✅ Student B does NOT get logged in as Student A
- ✅ Confidence score <0.5 (below threshold)
- ✅ FRSession logs no match found

**Test Data**:
- Student A: Registered
- Student B: Different person, attempting login

**Pass Criteria**: No false positives (wrong person matched)

---

### Test Case 4.5: Face Recognition - Liveness Fails During Login
**Priority**: P0 (Critical)
**Objective**: Verify liveness check prevents spoofed login

**Steps**:
1. Navigate to FR login page
2. Use printed photo of registered student
3. Attempt login

**Expected Results**:
- ✅ Error message: "Liveness check failed. Please use a live camera, not a photo or screen."
- ✅ Login rejected
- ✅ Liveness score <0.6
- ✅ FRSession logged with failureReason: "liveness_failed"

**Test Data**:
- Printed photo of Registered Student 1

**Pass Criteria**: Spoofing attempt blocked by liveness

---

### Test Case 4.6: Face Recognition - Poor Lighting
**Priority**: P1 (High)
**Objective**: Verify handling of poor lighting conditions

**Steps**:
1. Navigate to FR login page
2. Position in very dim lighting (lighting indicator shows "red")
3. Attempt to capture

**Expected Results**:
- ✅ Lighting indicator shows "poor" (red)
- ✅ Quality score <60%
- ✅ Capture button disabled
- ✅ Guidance message: "Improve lighting"
- ✅ If capture forced, recognition may fail with quality error

**Test Data**:
- Registered student in dim room

**Pass Criteria**: UI prevents poor quality capture

---

### Test Case 4.7: Face Recognition - No Face Detected
**Priority**: P1 (High)
**Objective**: Verify error handling when no face visible

**Steps**:
1. Navigate to FR login page
2. Point camera away from face
3. Attempt to capture

**Expected Results**:
- ✅ Face detection indicator: "No face detected"
- ✅ No bounding box displayed
- ✅ Capture button disabled
- ✅ Guidance: "Position your face in the frame"

**Test Data**: N/A

**Pass Criteria**: Clear feedback, capture disabled

---

### Test Case 4.8: Face Recognition - Similarity Threshold Testing
**Priority**: P1 (High)
**Objective**: Verify configurable similarity threshold works

**Steps**:
1. Set FR_SIMILARITY_THRESHOLD=0.5 (default)
2. Test recognition with marginal match (confidence ~0.51)
3. Set FR_SIMILARITY_THRESHOLD=0.7 (stricter)
4. Test same photo again

**Expected Results**:
- ✅ With threshold=0.5: Login succeeds (0.51 > 0.5)
- ✅ With threshold=0.7: Login fails (0.51 < 0.7)
- ✅ Error message mentions threshold: "Confidence below required threshold"

**Test Data**:
- Photo with marginal similarity (~0.51)

**Pass Criteria**: Threshold is respected

---

## AC5: Liveness Detection Prevents Spoofing

### Test Case 5.1: Liveness - Multi-Factor Scoring
**Priority**: P0 (Critical)
**Objective**: Verify liveness uses 5-factor weighted algorithm

**Steps**:
1. Register a live person's face
2. Check FRSession logs for liveness breakdown
3. Verify all 5 factors recorded:
   - Human library liveness (40%)
   - 3D mesh quality (25%)
   - Detection confidence (20%)
   - Image quality (15%)
   - Face size check (10%)

**Expected Results**:
- ✅ FRSession contains `liveness.details.checks` object
- ✅ All 5 checks present with individual scores
- ✅ Overall score = weighted sum of factors
- ✅ Each check has `passed` boolean

**Test Data**:
- Live person registration

**Pass Criteria**: 5-factor algorithm implemented

---

### Test Case 5.2: Liveness - Printed Photo Rejection
**Priority**: P0 (Critical)
**Objective**: Verify printed photos fail liveness

**Steps**:
1. Print high-quality photo of student on paper
2. Attempt to register/login using printed photo
3. Check liveness scores

**Expected Results**:
- ✅ Liveness check fails (score <0.6)
- ✅ Specific failures:
  - Low Human library liveness (<0.4)
  - Poor 3D mesh quality (<0.7)
  - Degraded image quality
- ✅ Warning: "Poor 3D face mesh quality - possible 2D image"
- ✅ Registration/login rejected

**Test Data**:
- High-quality printed photo

**Pass Criteria**: Printed photo rejected every time

---

### Test Case 5.3: Liveness - Phone Screen Rejection
**Priority**: P0 (Critical)
**Objective**: Verify phone screen photos fail liveness

**Steps**:
1. Display student photo on phone/tablet screen
2. Capture photo of screen
3. Attempt to register/login

**Expected Results**:
- ✅ Liveness check fails (score <0.6)
- ✅ Specific failures:
  - Poor depth analysis
  - Screen glare/moiré patterns detected
  - Low mesh quality
- ✅ Registration/login rejected

**Test Data**:
- Photo displayed on phone screen

**Pass Criteria**: Screen spoofing detected

---

### Test Case 5.4: Liveness - Real Person Success
**Priority**: P0 (Critical)
**Objective**: Verify real person passes liveness

**Steps**:
1. Use live camera to capture real person
2. Register/login with good lighting
3. Check liveness scores

**Expected Results**:
- ✅ Liveness check passes (score ≥0.6)
- ✅ Specific successes:
  - High Human library liveness (≥0.6)
  - Good 3D mesh quality (≥400 landmarks)
  - High detection confidence (≥0.9)
  - Good image quality
- ✅ Recommendation: "Face appears to be a live person"
- ✅ Registration/login succeeds

**Test Data**:
- Live person with good lighting

**Pass Criteria**: Real person always passes

---

### Test Case 5.5: Liveness - Configurable Threshold
**Priority**: P2 (Medium)
**Objective**: Verify FR_LIVENESS_THRESHOLD env var works

**Steps**:
1. Set FR_LIVENESS_THRESHOLD=0.6 (default)
2. Test photo with liveness score ~0.62
3. Set FR_LIVENESS_THRESHOLD=0.8 (stricter)
4. Test same photo again

**Expected Results**:
- ✅ With threshold=0.6: Liveness passes (0.62 > 0.6)
- ✅ With threshold=0.8: Liveness fails (0.62 < 0.8)
- ✅ Error message reflects threshold

**Test Data**:
- Photo with liveness score ~0.62

**Pass Criteria**: Threshold configurable

---

## AC6: Manual Override Always Available

### Test Case 6.1: Manual Attendance - FR Unavailable
**Priority**: P0 (Critical)
**Objective**: Verify manual attendance works when FR is down

**Steps**:
1. Simulate FR service failure (stop Human library)
2. Login as Coach/In-Charge
3. Navigate to Attendance page
4. Observe "Manual Override" button is ALWAYS visible
5. Click "Manual Override"
6. Select student manually
7. Select reason: "FR unavailable"
8. Submit attendance

**Expected Results**:
- ✅ Manual override button visible regardless of FR status
- ✅ Modal displays for manual student selection
- ✅ Reason dropdown includes: fr_failed, fr_unavailable, technical_issue, etc.
- ✅ Attendance marked successfully
- ✅ Database: isManualOverride=true, overrideReason set
- ✅ Audit trail: markedBy field populated

**Test Data**:
- FR service disabled
- Test student

**Pass Criteria**: Attendance works without FR

---

### Test Case 6.2: Manual Attendance - FR Failed for Student
**Priority**: P0 (Critical)
**Objective**: Verify manual override after FR recognition fails

**Steps**:
1. Login as Coach
2. Attempt FR-based attendance for student
3. FR recognition fails (e.g., lighting too poor)
4. Click "Manual Override" button
5. Select same student manually
6. Select reason: "fr_failed"
7. Add note: "Poor lighting conditions"
8. Submit

**Expected Results**:
- ✅ Manual override option immediately available after FR failure
- ✅ Pre-selected student matches FR attempt (if known)
- ✅ Reason "fr_failed" selected
- ✅ Optional notes field available
- ✅ Attendance marked with isManualOverride=true
- ✅ FRSession linked via frSessionId (if FR was attempted)

**Test Data**:
- FR recognition attempt fails
- Manual override for same student

**Pass Criteria**: Manual override saves attendance after FR fails

---

### Test Case 6.3: Manual Attendance - User Preference
**Priority**: P1 (High)
**Objective**: Verify manual marking by user choice

**Steps**:
1. Login as In-Charge
2. Navigate to Attendance
3. Click "Manual Override" (without attempting FR first)
4. Select student
5. Select reason: "user_preference"
6. Submit

**Expected Results**:
- ✅ Manual override works without FR attempt
- ✅ Reason "user_preference" available
- ✅ Attendance marked successfully
- ✅ No frSessionId linked (FR not attempted)

**Test Data**:
- Any student

**Pass Criteria**: Manual override is independent workflow

---

### Test Case 6.4: Manual Attendance - Audit Trail
**Priority**: P1 (High)
**Objective**: Verify manual overrides are fully audited

**Steps**:
1. Mark attendance manually for 3 students
2. Query attendance records from database
3. Verify audit fields

**Expected Results**:
- ✅ isManualOverride=true
- ✅ overrideReason populated
- ✅ markedBy contains user ID who marked
- ✅ Timestamp accurate
- ✅ Optional frSessionId if FR was attempted
- ✅ Optional notes field populated

**Test Data**:
- 3 manual attendance records

**Pass Criteria**: Complete audit trail maintained

---

### Test Case 6.5: Manual Attendance - Permissions
**Priority**: P1 (High)
**Objective**: Verify only authorized roles can manually mark attendance

**Steps**:
1. Login as Student (no permissions)
2. Attempt to access manual attendance endpoint directly
3. Login as Coach (has permissions)
4. Attempt manual attendance

**Expected Results**:
- ✅ Student: 403 Forbidden (no User Management:Create permission)
- ✅ Coach: Manual attendance succeeds
- ✅ Authorization middleware enforces permissions

**Test Data**:
- Student user, Coach user

**Pass Criteria**: Permissions enforced

---

## AC7: Performance Targets Met

### Test Case 7.1: Registration Performance - Single Face
**Priority**: P0 (Critical)
**Objective**: Verify registration completes in <5 seconds

**Steps**:
1. Register face for student with good quality photo
2. Measure time from upload to success message
3. Repeat 10 times
4. Calculate average

**Expected Results**:
- ✅ Each registration completes in <5 seconds
- ✅ Average time <3 seconds
- ✅ No registration exceeds 5 seconds

**Test Data**:
- 10 students, good quality photos

**Pass Criteria**: Average <3s, max <5s

---

### Test Case 7.2: Recognition Performance - Single Face
**Priority**: P0 (Critical)
**Objective**: Verify recognition completes in <3 seconds

**Steps**:
1. Perform face recognition login for registered student
2. Measure time from capture to login redirect
3. Repeat 20 times
4. Calculate average

**Expected Results**:
- ✅ Each recognition completes in <3 seconds
- ✅ Average time <2 seconds
- ✅ No recognition exceeds 3 seconds

**Test Data**:
- 20 recognition attempts

**Pass Criteria**: Average <2s, max <3s

---

### Test Case 7.3: Performance - 30-Student Class Photo
**Priority**: P1 (High)
**Objective**: Verify batch processing meets <10 second target

**Steps**:
1. Prepare class photo with 30 visible faces
2. Submit for batch recognition (future feature)
3. Measure total processing time
4. Verify all faces detected

**Expected Results**:
- ✅ Total processing time <10 seconds
- ✅ ≥28 of 30 faces detected (≥93%)
- ✅ Each face processed in <0.3 seconds avg

**Test Data**:
- Class photo with 30 students

**Pass Criteria**: <10s total, ≥93% detection

**Note**: Batch processing is prep for future features

---

### Test Case 7.4: Performance - Concurrent Users
**Priority**: P1 (High)
**Objective**: Verify system handles concurrent FR requests

**Steps**:
1. Simulate 5 concurrent face recognition logins
2. Measure individual response times
3. Verify no failures due to concurrency

**Expected Results**:
- ✅ All 5 requests complete successfully
- ✅ Average response time <4 seconds
- ✅ No requests timeout
- ✅ No race conditions or data corruption

**Test Data**:
- 5 registered students logging in simultaneously

**Pass Criteria**: All succeed, avg <4s

---

### Test Case 7.5: Performance - Redis Cache Hit Rate
**Priority**: P1 (High)
**Objective**: Verify cache hit rate >95%

**Steps**:
1. Register 10 students
2. Perform 100 recognition attempts (10 attempts per student)
3. Check Redis logs for cache hits/misses
4. Calculate hit rate

**Expected Results**:
- ✅ Cache hit rate ≥95% (≥95 of 100 hits)
- ✅ First recognition per student: cache miss (loads from DB)
- ✅ Subsequent recognitions: cache hit (loads from Redis)
- ✅ Recognition with cache hit <1 second

**Test Data**:
- 10 registered students
- 100 recognition attempts

**Pass Criteria**: ≥95% cache hit rate

---

### Test Case 7.6: Performance - GPU Acceleration (if available)
**Priority**: P2 (Medium)
**Objective**: Verify GPU provides 3-5x speedup

**Steps**:
1. Measure registration time with GPU enabled (TensorFlow.js)
2. Disable GPU, measure registration time with CPU only
3. Calculate speedup ratio

**Expected Results**:
- ✅ GPU time: ~0.5-1 second per registration
- ✅ CPU time: ~2-3 seconds per registration
- ✅ Speedup: 3-5x faster with GPU

**Test Data**:
- Same photos tested on GPU and CPU

**Pass Criteria**: GPU is 3-5x faster (if available)

**Note**: GPU availability depends on hardware

---

## AC8: UI Provides Real-Time Feedback

### Test Case 8.1: Real-Time Face Detection Preview
**Priority**: P0 (Critical)
**Objective**: Verify real-time detection shows bounding box

**Steps**:
1. Navigate to face recognition login page
2. Allow camera access
3. Position face in camera view
4. Observe real-time detection overlay

**Expected Results**:
- ✅ Green bounding box appears around detected face
- ✅ Bounding box updates in real-time (30-60fps)
- ✅ Corner markers visible on bounding box
- ✅ "Face Detected" indicator appears (top-right)
- ✅ Detection works at various distances and angles

**Test Data**: Live camera feed

**Pass Criteria**: Real-time detection visible and responsive

---

### Test Case 8.2: Alignment Guide Overlay
**Priority**: P1 (High)
**Objective**: Verify oval guide helps user positioning

**Steps**:
1. Open FR login page
2. Observe camera preview
3. Look for alignment guide

**Expected Results**:
- ✅ Dashed oval overlay visible in center of preview
- ✅ Oval size appropriate (~50% width, ~65% height)
- ✅ Oval is semi-transparent (doesn't block face)
- ✅ Helps user center face

**Test Data**: Live camera feed

**Pass Criteria**: Alignment guide visible and helpful

---

### Test Case 8.3: Lighting Quality Indicator
**Priority**: P0 (Critical)
**Objective**: Verify lighting indicator provides accurate feedback

**Steps**:
1. Open FR login page
2. Test in various lighting:
   - Bright room (face well-lit from front)
   - Dim room (low light)
   - Backlit (window behind user)
3. Observe lighting indicator

**Expected Results**:
- ✅ Bright room: Green indicator "Lighting: good"
- ✅ Dim room: Red indicator "Lighting: poor"
- ✅ Acceptable lighting: Yellow indicator "Lighting: acceptable"
- ✅ Indicator updates in real-time as lighting changes
- ✅ Pulsing dot animation visible

**Test Data**:
- Various lighting conditions

**Pass Criteria**: Accurate lighting feedback

---

### Test Case 8.4: Distance Guidance
**Priority**: P1 (High)
**Objective**: Verify distance guidance based on face size

**Steps**:
1. Open FR login page
2. Position face at various distances:
   - Very close (face fills >30% of frame)
   - Very far (face <8% of frame)
   - Optimal (face 8-30% of frame)
3. Observe guidance messages

**Expected Results**:
- ✅ Too close: "Move back" message (blue badge)
- ✅ Too far: "Move closer" message (blue badge)
- ✅ Optimal: "Perfect distance" message
- ✅ Messages update in real-time

**Test Data**:
- Live camera at various distances

**Pass Criteria**: Accurate distance guidance

---

### Test Case 8.5: Capture Quality Score
**Priority**: P0 (Critical)
**Objective**: Verify quality score displays before capture

**Steps**:
1. Open FR login page
2. Position face with various quality levels
3. Observe quality score (bottom of preview)

**Expected Results**:
- ✅ Quality score 0-100% displayed
- ✅ Good conditions: Score 80-100% (green)
- ✅ Acceptable: Score 60-79% (yellow)
- ✅ Poor: Score <60% (red)
- ✅ Capture button enabled only when score ≥60%
- ✅ Score updates in real-time

**Test Data**:
- Various quality conditions

**Pass Criteria**: Quality score accurate, capture gated at 60%

---

### Test Case 8.6: Success Animation
**Priority**: P1 (High)
**Objective**: Verify success animation after recognition

**Steps**:
1. Successfully complete face recognition login
2. Observe success animation

**Expected Results**:
- ✅ Full-screen green overlay appears
- ✅ Large checkmark icon with scale-in animation
- ✅ Text: "Face Recognized!"
- ✅ Confidence score displayed (e.g., "Confidence: 89%")
- ✅ Animation lasts 1.5 seconds
- ✅ Then redirects to dashboard

**Test Data**:
- Successful FR login

**Pass Criteria**: Smooth success animation

---

### Test Case 8.7: Help Modal
**Priority**: P1 (High)
**Objective**: Verify help modal provides useful guidance

**Steps**:
1. Open FR login page
2. Click "Need Help?" button
3. Review help modal content

**Expected Results**:
- ✅ Modal opens with helpful content
- ✅ Sections: Tips for Best Results, Quality Indicators, Troubleshooting
- ✅ Examples of good vs bad photos
- ✅ Color-coded explanations (green/yellow/red)
- ✅ Troubleshooting guide for common issues
- ✅ "X" close button works
- ✅ Click outside modal to close

**Test Data**: N/A

**Pass Criteria**: Help modal comprehensive and accessible

---

### Test Case 8.8: Error Messages - User-Friendly
**Priority**: P0 (Critical)
**Objective**: Verify error messages are clear and actionable

**Steps**:
1. Trigger various error conditions:
   - No face detected
   - Liveness failed
   - Not recognized
   - Poor quality
2. Read error messages

**Expected Results**:
- ✅ No face: "No face detected. Please position your face in the frame."
- ✅ Liveness failed: "Liveness check failed. Please use a live camera, not a photo or screen."
- ✅ Not recognized: "Face not recognized. Please ensure you're registered or improve lighting."
- ✅ Poor quality: "Image quality too low (45%). Please improve lighting and positioning."
- ✅ Messages include specific guidance, not just generic errors

**Test Data**:
- Various error scenarios

**Pass Criteria**: All errors have clear, actionable messages

---

## Cross-Cutting Concerns

### Test Case CC-1: Responsive Design - Desktop
**Priority**: P1 (High)
**Objective**: Verify FR UI works on desktop browsers

**Steps**:
1. Test FR login on desktop Chrome, Firefox, Safari, Edge
2. Verify UI elements display correctly
3. Test at resolutions: 1920x1080, 1440x900, 1366x768

**Expected Results**:
- ✅ Camera preview displays correctly on all browsers
- ✅ All UI elements visible and functional
- ✅ Real-time detection works smoothly
- ✅ No layout issues at any resolution

**Test Data**:
- Multiple browsers and resolutions

**Pass Criteria**: Works on all major browsers

---

### Test Case CC-2: Responsive Design - Mobile
**Priority**: P0 (Critical)
**Objective**: Verify FR UI works on mobile devices

**Steps**:
1. Test FR login on iOS (Safari) and Android (Chrome)
2. Verify UI adapts to small screens
3. Test front camera access

**Expected Results**:
- ✅ UI scales appropriately for mobile
- ✅ All indicators visible without scrolling
- ✅ Front camera opens by default
- ✅ Capture button large enough for touch
- ✅ Real-time detection works smoothly

**Test Data**:
- iOS and Android devices

**Pass Criteria**: Fully functional on mobile

---

### Test Case CC-3: Browser Permissions
**Priority**: P0 (Critical)
**Objective**: Verify camera permission handling

**Steps**:
1. Navigate to FR login (first time, no camera permission)
2. Observe permission prompt
3. Deny permission
4. Grant permission

**Expected Results**:
- ✅ Browser prompts for camera permission
- ✅ If denied: Clear error "Camera permission required. Please grant access."
- ✅ Instructions to enable in browser settings
- ✅ If granted: Camera starts successfully

**Test Data**: N/A

**Pass Criteria**: Permission flow handled gracefully

---

### Test Case CC-4: Network Latency - Slow Connection
**Priority**: P1 (High)
**Objective**: Verify FR works on slow networks (3G/4G)

**Steps**:
1. Simulate 3G network (1.6 Mbps down, 750 Kbps up)
2. Attempt face registration and recognition
3. Measure upload time and response time

**Expected Results**:
- ✅ Image upload completes (may take longer)
- ✅ Loading indicator displayed during upload
- ✅ Recognition completes within 5-10 seconds on 3G
- ✅ No timeouts or failures
- ✅ User feedback: "Uploading..." / "Recognizing..."

**Test Data**:
- Simulated 3G connection

**Pass Criteria**: Works on slow networks

---

### Test Case CC-5: Concurrent Requests - Race Conditions
**Priority**: P1 (High)
**Objective**: Verify no race conditions with concurrent FR operations

**Steps**:
1. Open 3 browser tabs
2. Login as admin in all tabs
3. Simultaneously register different students in all tabs

**Expected Results**:
- ✅ All 3 registrations complete successfully
- ✅ No database conflicts
- ✅ No embedding corruption
- ✅ Each student gets correct embedding

**Test Data**:
- 3 concurrent registrations

**Pass Criteria**: No race conditions

---

### Test Case CC-6: Session Timeout During FR
**Priority**: P2 (Medium)
**Objective**: Verify handling of expired JWT during FR operation

**Steps**:
1. Login as user
2. Wait for JWT to expire (or manually expire token)
3. Attempt face recognition login

**Expected Results**:
- ✅ FR operation fails gracefully
- ✅ Error: "Session expired. Please login again."
- ✅ User redirected to login page
- ✅ No server crash or unhandled error

**Test Data**:
- Expired JWT token

**Pass Criteria**: Session expiry handled gracefully

---

### Test Case CC-7: Database Connection Loss
**Priority**: P2 (Medium)
**Objective**: Verify graceful handling of DB connection loss

**Steps**:
1. Stop MongoDB server while backend is running
2. Attempt face registration or recognition

**Expected Results**:
- ✅ Error message: "Database connection error. Please try again."
- ✅ No server crash
- ✅ Operation fails safely
- ✅ When DB reconnects, operations resume

**Test Data**: N/A

**Pass Criteria**: DB loss handled gracefully

---

### Test Case CC-8: Redis Cache Unavailable
**Priority**: P2 (Medium)
**Objective**: Verify graceful degradation when Redis is down

**Steps**:
1. Stop Redis server
2. Restart backend (should detect Redis unavailable)
3. Perform face recognition operations

**Expected Results**:
- ✅ Backend starts successfully (logs "Redis cache not available")
- ✅ System operates in DB-only mode
- ✅ Face recognition still works (slower, no cache)
- ✅ No crashes or errors
- ✅ Performance degrades but functionality maintained

**Test Data**: N/A

**Pass Criteria**: Works without Redis (graceful degradation)

---

### Test Case CC-9: Browser Compatibility - WebRTC Support
**Priority**: P1 (High)
**Objective**: Verify camera access works across browsers

**Steps**:
1. Test FR login on Chrome, Firefox, Safari, Edge
2. Verify getUserMedia() API works

**Expected Results**:
- ✅ Chrome: Camera access works ✅
- ✅ Firefox: Camera access works ✅
- ✅ Safari: Camera access works (may require HTTPS) ✅
- ✅ Edge: Camera access works ✅

**Test Data**:
- Multiple browsers

**Pass Criteria**: WebRTC supported in all tested browsers

---

### Test Case CC-10: Logging and Audit Trail
**Priority**: P1 (High)
**Objective**: Verify all FR operations are logged

**Steps**:
1. Perform various FR operations:
   - Registration (success and failure)
   - Recognition (success and failure)
   - Manual override
2. Query FRSession collection
3. Check backend logs

**Expected Results**:
- ✅ All operations logged to FRSession collection
- ✅ Logs include: sessionType, success, failureReason, timestamps, performance metrics
- ✅ Liveness data logged with detailed breakdown
- ✅ Backend logs contain FR events (no sensitive data)

**Test Data**:
- Various FR operations

**Pass Criteria**: Complete audit trail

---

## API Tests

### Test Case API-1: POST /api/v2/fr/register (Multipart)
**Priority**: P0 (Critical)
**Objective**: Verify face registration API with multipart upload

**Steps**:
1. Send POST request to `/api/v2/fr/register`
2. Headers: `Authorization: Bearer <token>`
3. Body: multipart/form-data with `studentId` and `photo` file

**Expected Results**:
- ✅ 200 OK on success
- ✅ Response: `{ success: true, message: "Face registered successfully", data: { studentId, confidence, quality, livenessScore } }`
- ✅ 400 Bad Request on validation errors
- ✅ 401 Unauthorized without token
- ✅ 404 Not Found if student doesn't exist

**Test Data**:
- Valid JWT token
- Valid student ID
- Photo file

**Pass Criteria**: API returns expected responses

---

### Test Case API-2: POST /api/v2/fr/register (Base64)
**Priority**: P0 (Critical)
**Objective**: Verify face registration API with base64 JSON (mobile apps)

**Steps**:
1. Send POST request to `/api/v2/fr/register`
2. Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`
3. Body: `{ studentId: "...", photo: "data:image/jpeg;base64,..." }`

**Expected Results**:
- ✅ 200 OK on success (same as multipart)
- ✅ Handles both data URI and plain base64
- ✅ Validates base64 image size (<10MB)
- ✅ 400 Bad Request if invalid base64

**Test Data**:
- Valid JWT token
- Valid student ID
- Base64-encoded image

**Pass Criteria**: Base64 format works identically to multipart

---

### Test Case API-3: POST /api/v2/fr/recognize (Multipart)
**Priority**: P0 (Critical)
**Objective**: Verify face recognition API with multipart upload

**Steps**:
1. Send POST request to `/api/v2/fr/recognize`
2. Headers: `Authorization: Bearer <token>`
3. Body: multipart/form-data with `photo` file, optional `threshold`

**Expected Results**:
- ✅ 200 OK on success
- ✅ Response: `{ success: true, message: "Face recognized successfully", data: { studentId, student: {...}, confidence, quality } }`
- ✅ 400 Bad Request if no face or not recognized
- ✅ 401 Unauthorized without token

**Test Data**:
- Valid JWT token
- Registered student photo

**Pass Criteria**: Recognition API works

---

### Test Case API-4: POST /api/v2/fr/recognize (Base64)
**Priority**: P0 (Critical)
**Objective**: Verify face recognition API with base64 JSON (mobile apps)

**Steps**:
1. Send POST request to `/api/v2/fr/recognize`
2. Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`
3. Body: `{ photo: "data:image/jpeg;base64,...", threshold: 0.5 }`

**Expected Results**:
- ✅ 200 OK on success (same as multipart)
- ✅ Handles both data URI and plain base64
- ✅ Threshold parameter respected
- ✅ 400 Bad Request if invalid base64

**Test Data**:
- Valid JWT token
- Base64-encoded registered student photo

**Pass Criteria**: Base64 format works for recognition

---

### Test Case API-5: GET /api/v2/fr/status/:studentId
**Priority**: P1 (High)
**Objective**: Verify FR status check API

**Steps**:
1. Send GET request to `/api/v2/fr/status/<studentId>`
2. Headers: `Authorization: Bearer <token>`

**Expected Results**:
- ✅ 200 OK
- ✅ Response: `{ success: true, data: { isRegistered: true/false, registeredDate: "...", registeredBy: "..." } }`
- ✅ 401 Unauthorized without token
- ✅ 404 Not Found if student doesn't exist

**Test Data**:
- Registered student ID
- Unregistered student ID

**Pass Criteria**: Status API returns correct registration state

---

### Test Case API-6: DELETE /api/v2/fr/register/:studentId
**Priority**: P1 (High)
**Objective**: Verify face deletion API

**Steps**:
1. Register a student's face
2. Send DELETE request to `/api/v2/fr/register/<studentId>`
3. Headers: `Authorization: Bearer <token>`
4. Verify embedding marked inactive

**Expected Results**:
- ✅ 200 OK on success
- ✅ Response: `{ success: true, message: "Face registration deleted successfully" }`
- ✅ Embedding marked inactive (not hard deleted)
- ✅ FRSession logged
- ✅ 401 Unauthorized without token
- ✅ 404 Not Found if no registration exists

**Test Data**:
- Registered student ID

**Pass Criteria**: Deletion marks inactive, maintains audit trail

---

## Security Tests

### Test Case SEC-1: Authentication Required
**Priority**: P0 (Critical)
**Objective**: Verify all FR endpoints require authentication

**Steps**:
1. Send requests to all FR endpoints WITHOUT Authorization header:
   - POST /api/v2/fr/register
   - POST /api/v2/fr/recognize
   - GET /api/v2/fr/status/:id
   - DELETE /api/v2/fr/register/:id
   - GET /api/v2/fr/stats

**Expected Results**:
- ✅ All endpoints return 401 Unauthorized
- ✅ Error message: "Authentication required"
- ✅ No operations performed

**Test Data**: N/A

**Pass Criteria**: No unauthenticated access

---

### Test Case SEC-2: Authorization - Role-Based Access
**Priority**: P0 (Critical)
**Objective**: Verify permissions enforced on FR endpoints

**Steps**:
1. Login as Student (no User Management permissions)
2. Attempt to register another student's face
3. Login as Coach (has User Management Read)
4. Attempt to register face
5. Login as Admin (has User Management Create)
6. Attempt to register face

**Expected Results**:
- ✅ Student: 403 Forbidden (no permissions)
- ✅ Coach (Read only): 403 Forbidden (no Create permission)
- ✅ Admin: 200 OK (has Create permission)

**Test Data**:
- Users with various permission levels

**Pass Criteria**: Permissions enforced correctly

**Note**: RBAC middleware currently commented out (Epic 01 Story 01 in progress), will enable after RBAC complete

---

### Test Case SEC-3: Embedding Encryption at Rest
**Priority**: P0 (Critical)
**Objective**: Verify face embeddings are encrypted in database

**Steps**:
1. Register a student's face
2. Query MongoDB FaceEmbedding collection directly
3. Inspect `embedding.encrypted` field
4. Verify it's encrypted (base64 gibberish, not readable)

**Expected Results**:
- ✅ `embedding.encrypted` field contains encrypted data (not plain array)
- ✅ `embedding.algorithm` = "AES-256-GCM"
- ✅ `embedding.iv` and `embedding.tag` present
- ✅ Cannot reverse embedding without decryption key
- ✅ Encryption key stored securely (env var, not in DB)

**Test Data**:
- Registered student

**Pass Criteria**: Embeddings encrypted at rest (AES-256-GCM)

---

### Test Case SEC-4: No Face Data in Logs
**Priority**: P0 (Critical)
**Objective**: Verify no sensitive face data appears in logs

**Steps**:
1. Register and recognize faces
2. Check backend logs (console output, log files)
3. Search for embedding data, image buffers

**Expected Results**:
- ✅ Logs contain event types (registration, recognition)
- ✅ Logs contain timestamps, success/failure
- ✅ Logs DO NOT contain:
  - Face embedding arrays
  - Image buffers
  - Raw photo data
  - Decrypted embeddings

**Test Data**: N/A

**Pass Criteria**: No sensitive data in logs

---

### Test Case SEC-5: CORS Configuration
**Priority**: P1 (High)
**Objective**: Verify CORS allows frontend and mobile, blocks unauthorized origins

**Steps**:
1. Send request from allowed origin (http://localhost:3000)
2. Send request from unauthorized origin (http://evil.com)
3. Check CORS headers in response

**Expected Results**:
- ✅ Allowed origin: Request succeeds, CORS headers present
- ✅ Unauthorized origin: CORS error, request blocked
- ✅ Development mode: All origins allowed (for testing)
- ✅ Production mode: Whitelist enforced

**Test Data**:
- Various origins

**Pass Criteria**: CORS correctly configured

---

### Test Case SEC-6: SQL/NoSQL Injection Protection
**Priority**: P1 (High)
**Objective**: Verify FR inputs sanitized against injection attacks

**Steps**:
1. Attempt registration with malicious studentId:
   - `{ "$gt": "" }` (NoSQL injection)
   - `'; DROP TABLE students; --` (SQL-like attempt)
2. Attempt base64 injection with script tags
3. Verify inputs sanitized

**Expected Results**:
- ✅ Malicious inputs rejected or sanitized
- ✅ No database manipulation
- ✅ Error: "Invalid student ID format" or similar
- ✅ No XSS vulnerabilities

**Test Data**:
- Malicious input strings

**Pass Criteria**: Injection attacks prevented

---

## Test Data Requirements Summary

### Registered Students (Minimum 10)
1. Student 1: Good quality photo, optimal lighting
2. Student 2: Acceptable quality, slight off-center
3. Student 3: Dim lighting (boundary case)
4. Student 4-10: Varied conditions

### Unregistered Students (Minimum 10)
- For negative testing (not registered, should fail recognition)

### Test Photos (Minimum 30)
- 10 high quality (optimal conditions)
- 10 acceptable quality (slight variations)
- 5 poor quality (dim, blurry, small face)
- 5 spoofing attempts (printed, phone screen)

### Users with Roles
- 1 Admin (full permissions)
- 1 In-Charge (User Management Read + Create)
- 1 Coach (User Management Read)
- 3 Students (no permissions)

---

## Test Execution Order

### Phase 1: Smoke Tests (15 minutes)
- AC2 tests (Human library initialization)
- AC1 tests (old system removed)
- API-1 through API-6 (API functionality)

### Phase 2: Core Functionality (2 hours)
- AC3 tests (Face registration)
- AC4 tests (Face recognition)
- AC5 tests (Liveness detection)
- AC8 tests (UI feedback)

### Phase 3: Critical Path (1 hour)
- AC6 tests (Manual override)
- AC7 tests (Performance)
- Security tests (SEC-1 through SEC-6)

### Phase 4: Cross-Cutting (1 hour)
- Responsive design tests
- Browser compatibility
- Network latency
- Error handling

### Total Estimated Test Time: 4-5 hours

---

## Pass Criteria Summary

### Overall Story Pass Criteria
- ✅ ≥95% of P0 tests pass (33 of 35 tests)
- ✅ ≥90% of P1 tests pass (25 of 28 tests)
- ✅ ≥80% of P2 tests pass (12 of 15 tests)
- ✅ All acceptance criteria validated
- ✅ No P0 or P1 bugs found
- ✅ Performance targets met
- ✅ Security validated

### Critical Requirements (Must Pass)
- Face registration accuracy ≥95%
- Face recognition accuracy ≥95%
- Liveness detection prevents spoofing (100% of tests)
- Manual override always available
- All APIs functional with proper auth
- Embeddings encrypted at rest

---

## Bug Reporting

### Bug Severity Levels
- **P0 Critical**: Blocks core functionality, security vulnerability
- **P1 High**: Major feature broken, workaround exists
- **P2 Medium**: Minor issue, doesn't block usage
- **P3 Low**: Cosmetic, enhancement

### Bug Template
```
**Title**: [Component] Brief description
**Severity**: P0/P1/P2/P3
**Test Case**: TC X.Y
**Steps to Reproduce**:
1. Step 1
2. Step 2

**Expected**: What should happen
**Actual**: What actually happened
**Environment**: Browser, OS, Node version
**Screenshots**: Attach if applicable
**Logs**: Relevant error logs
```

---

**Test Plan Version**: 1.0
**Created**: 2025-10-23
**Last Updated**: 2025-10-23
**Approved By**: Dev Agent (James)

# E2E Test Scenarios - Epic 02 Story 02: Content Management Module

**Story:** Sprint 2 Epic 02 Story 02
**Feature:** Content Library with File Upload to S3
**Created:** 2025-10-26 12:35:25 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Author:** Dev Agent (James)
**QA Execution:** Playwright MCP Tools

---

## Test Environment Setup

### Preconditions
- ✅ Backend server running on `http://localhost:5001`
- ✅ Frontend server running on `http://localhost:3000`
- ✅ MongoDB connection active
- ✅ AWS S3 bucket `balagruha-lms-content` configured
- ✅ Admin user logged in with "LMS Management" > "Manage" permission

### Test Data
- **Admin User:** Email: `admin@test.com`, Password: `admin123`
- **Test Files:**
  - Video: `test-video.mp4` (10MB, video/mp4)
  - PDF: `test-document.pdf` (2MB, application/pdf)
  - Audio: `test-audio.mp3` (5MB, audio/mpeg)
  - Image: `test-image.jpg` (500KB, image/jpeg)
  - Invalid: `test-file.txt` (1KB, text/plain)
  - Large Video: `large-video.mp4` (600MB, video/mp4) - exceeds 500MB limit

### Navigation
```
Admin Dashboard → Content Library
URL: http://localhost:3000/admin/content-library
```

---

## AC Group 1: File Upload (UPLOAD-01 to UPLOAD-05)

### TC 1.1: Single File Upload - Video
**AC:** UPLOAD-01 - Multi-file upload support
**Priority:** P0
**Type:** Functional

**Preconditions:**
- Admin logged in
- Navigate to Content Library page

**Test Steps:**
1. Click "Upload Files" button
2. FileUploadModal opens
3. Click "Browse Files" button
4. Select `test-video.mp4` (10MB)
5. Verify file appears in "Selected Files" list
6. Click "Upload (1)" button
7. Wait for upload completion
8. Verify upload queue shows progress
9. Verify file appears in content library grid

**Expected Results:**
- ✅ Modal opens with drag-drop zone
- ✅ File validation passes (video/mp4, 10MB < 500MB)
- ✅ Selected file shows: name, size, type icon (🎥)
- ✅ Upload progress shows: 0% → 100%
- ✅ Success toast: "Successfully uploaded 1 file(s)"
- ✅ File appears in grid with correct metadata
- ✅ Stats card updates: Total Files +1, Videos +1
- ✅ No console errors

**MCP Tools:**
```javascript
browser_navigate("http://localhost:3000/admin/content-library")
browser_click(element="Upload Files button", ref="...")
browser_click(element="Browse Files button", ref="...")
// (Manual file selection required)
browser_click(element="Upload button", ref="...")
browser_wait_for(text="Successfully uploaded")
browser_snapshot()
browser_take_screenshot("tc-1-1-video-upload.png")
browser_console_messages(onlyErrors=true)
```

---

### TC 1.2: Multi-File Upload - Mixed Types
**AC:** UPLOAD-01 - Multi-file upload support
**Priority:** P0
**Type:** Functional

**Preconditions:**
- Admin logged in
- Content Library page loaded

**Test Steps:**
1. Click "Upload Files" button
2. Select multiple files:
   - `test-video.mp4` (10MB)
   - `test-document.pdf` (2MB)
   - `test-audio.mp3` (5MB)
   - `test-image.jpg` (500KB)
3. Verify all 4 files appear in selected list
4. Click "Upload (4)" button
5. Monitor upload progress for all files
6. Wait for completion

**Expected Results:**
- ✅ All 4 files validated successfully
- ✅ Upload queue shows all 4 files with individual progress
- ✅ Success toast: "Successfully uploaded 4 file(s)"
- ✅ Content library shows all 4 files
- ✅ Stats update: Total +4, Videos +1, PDFs +1, Audio +1
- ✅ No console errors

**MCP Tools:**
```javascript
browser_click(element="Upload Files button", ref="...")
// (Manual multi-file selection)
browser_snapshot()  // Verify selected files list
browser_click(element="Upload (4) button", ref="...")
browser_wait_for(text="Successfully uploaded 4 file(s)")
browser_snapshot()
browser_take_screenshot("tc-1-2-multi-upload.png")
```

---

### TC 1.3: Drag-and-Drop File Upload
**AC:** UPLOAD-02 - Drag-and-drop interface
**Priority:** P0
**Type:** Functional

**Preconditions:**
- Admin logged in
- FileUploadModal open

**Test Steps:**
1. Open "Upload Files" modal
2. Drag `test-document.pdf` over drop zone
3. Verify drop zone highlights (blue border)
4. Drop file onto zone
5. Verify file appears in selected list
6. Upload file

**Expected Results:**
- ✅ Drop zone shows blue border on dragover
- ✅ Drop zone accepts file drop
- ✅ File added to selected list
- ✅ Upload succeeds

**Note:** Playwright drag-and-drop has automation limitations - may require manual QA verification

---

### TC 1.4: File Type Validation - Invalid Type
**AC:** UPLOAD-03 - File type validation
**Priority:** P0
**Type:** Negative

**Test Steps:**
1. Open "Upload Files" modal
2. Attempt to select `test-file.txt` (text/plain)
3. Observe validation error

**Expected Results:**
- ✅ Error toast: "File type not supported. Allowed types: video, pdf, audio, image"
- ✅ File NOT added to selected list
- ✅ Modal remains open
- ✅ User can retry with valid file

**MCP Tools:**
```javascript
browser_click(element="Browse Files button", ref="...")
// (Select invalid file)
browser_wait_for(text="File type not supported")
browser_snapshot()
browser_take_screenshot("tc-1-4-invalid-type.png")
```

---

### TC 1.5: File Size Validation - Video Exceeds Limit
**AC:** UPLOAD-04 - File size validation per type
**Priority:** P0
**Type:** Negative

**Test Steps:**
1. Open "Upload Files" modal
2. Attempt to select `large-video.mp4` (600MB)
3. Observe validation error

**Expected Results:**
- ✅ Error toast: "File too large. Maximum size for Video is 500 MB"
- ✅ File NOT added to selected list
- ✅ Upload does not proceed

**MCP Tools:**
```javascript
browser_click(element="Browse Files button", ref="...")
// (Select 600MB video)
browser_wait_for(text="File too large")
browser_take_screenshot("tc-1-5-size-validation.png")
```

---

### TC 1.6: Upload Progress Tracking
**AC:** UPLOAD-05 - Progress tracking with retry logic
**Priority:** P1
**Type:** Functional

**Test Steps:**
1. Upload a 50MB video file
2. Monitor UploadQueue component during upload
3. Observe progress percentage updates
4. Verify completion status

**Expected Results:**
- ✅ Progress bar shows: 0% → 10% → 50% → 100%
- ✅ Status changes: preparing → uploading → completed
- ✅ Success indicator shows on completion
- ✅ File appears in library after completion

**MCP Tools:**
```javascript
browser_snapshot()  // Check UploadQueue component
browser_wait_for(time=2)
browser_snapshot()  // Check progress update
browser_wait_for(text="Successfully uploaded")
browser_take_screenshot("tc-1-6-progress.png")
```

---

### TC 1.7: Upload Retry on Failure
**AC:** UPLOAD-05 - Progress tracking with retry logic
**Priority:** P1
**Type:** Error Handling

**Note:** This test requires simulating network failure or backend error. May need manual testing or backend mock.

**Test Steps:**
1. Simulate network failure during upload
2. Verify retry logic triggers (3 retries with exponential backoff)
3. Verify error status if all retries fail
4. Verify "Retry" button appears
5. Click "Retry" button
6. Verify upload succeeds on retry

**Expected Results:**
- ✅ Automatic retry attempts: 1s → 2s → 4s delays
- ✅ Error status shown after max retries
- ✅ Error toast: "Failed to upload {filename}: {error}"
- ✅ Retry button clickable
- ✅ Manual retry succeeds

---

## AC Group 2: Content Library Display (LIBRARY-01 to LIBRARY-05)

### TC 2.1: Grid vs List View Toggle
**AC:** LIBRARY-01 - Grid/List view toggle
**Priority:** P1
**Type:** Functional

**Preconditions:**
- Content library has 10+ files uploaded

**Test Steps:**
1. Navigate to Content Library page
2. Verify default view is Grid
3. Click List view button
4. Verify view changes to list layout
5. Click Grid view button
6. Verify view changes back to grid layout

**Expected Results:**
- ✅ Grid view: 4 columns on desktop, cards with thumbnails
- ✅ List view: Single column, compact rows
- ✅ Toggle buttons highlight active view
- ✅ Both views show same files

**MCP Tools:**
```javascript
browser_navigate("http://localhost:3000/admin/content-library")
browser_snapshot()  // Verify grid layout
browser_take_screenshot("tc-2-1-grid-view.png")
browser_click(element="List view button", ref="...")
browser_snapshot()  // Verify list layout
browser_take_screenshot("tc-2-1-list-view.png")
```

---

### TC 2.2: Filter by File Type - Videos Only
**AC:** LIBRARY-02 - Filter by file type
**Priority:** P0
**Type:** Functional

**Preconditions:**
- Library has mixed file types (video, pdf, audio, image)

**Test Steps:**
1. Click "🎥 Videos" filter button
2. Verify only video files displayed
3. Verify stats card shows video count
4. Click "All Files" filter
5. Verify all files displayed again

**Expected Results:**
- ✅ Videos filter button highlighted (bg-blue-500)
- ✅ Only video files shown in grid
- ✅ URL parameter: `?fileType=video`
- ✅ Stats card shows correct video count
- ✅ Reset to "All Files" shows all types

**MCP Tools:**
```javascript
browser_click(element="Videos filter button", ref="...")
browser_wait_for(time=1)
browser_snapshot()  // Verify filtered results
browser_take_screenshot("tc-2-2-filter-videos.png")
browser_click(element="All Files filter button", ref="...")
browser_snapshot()
```

---

### TC 2.3: Search Files by Name
**AC:** LIBRARY-03 - Search by filename, description, tags
**Priority:** P0
**Type:** Functional

**Test Steps:**
1. Type "test-video" in search bar
2. Wait 500ms (debounce)
3. Verify only files matching "test-video" displayed
4. Clear search
5. Verify all files displayed

**Expected Results:**
- ✅ Search filters files by filename (case-insensitive)
- ✅ Results update after debounce
- ✅ URL parameter: `?search=test-video`
- ✅ Clear search shows all files

**MCP Tools:**
```javascript
browser_type(element="Search input", ref="...", text="test-video")
browser_wait_for(time=1)
browser_snapshot()
browser_take_screenshot("tc-2-3-search.png")
```

---

### TC 2.4: Sort Files - Newest First
**AC:** LIBRARY-04 - Sort by multiple criteria
**Priority:** P1
**Type:** Functional

**Test Steps:**
1. Select "Newest First" from sort dropdown
2. Verify files sorted by uploadedAt DESC
3. Select "Oldest First"
4. Verify files sorted by uploadedAt ASC
5. Select "Largest First"
6. Verify files sorted by fileSize DESC

**Expected Results:**
- ✅ Newest First: Latest uploads at top
- ✅ Oldest First: Earliest uploads at top
- ✅ Largest First: Biggest files at top
- ✅ URL parameter updates: `?sort=newest`

**MCP Tools:**
```javascript
browser_click(element="Sort dropdown", ref="...")
browser_click(element="Newest First option", ref="...")
browser_snapshot()
browser_take_screenshot("tc-2-4-sort-newest.png")
```

---

### TC 2.5: Statistics Dashboard Display
**AC:** LIBRARY-05 - Statistics dashboard
**Priority:** P1
**Type:** Functional

**Test Steps:**
1. Navigate to Content Library
2. Verify stats cards display:
   - Total Files count
   - Videos count
   - PDFs count
   - Audio count
   - Total Size (formatted)
3. Upload a new file
4. Verify stats update

**Expected Results:**
- ✅ All 5 stats cards visible
- ✅ Counts accurate
- ✅ Total size formatted (MB/GB)
- ✅ Stats update after new upload

**MCP Tools:**
```javascript
browser_snapshot()  // Check stats cards
browser_take_screenshot("tc-2-5-stats.png")
```

---

## AC Group 3: File Management (MANAGE-01 to MANAGE-04)

### TC 3.1: View File Details
**AC:** MANAGE-01 - View file details
**Priority:** P1
**Type:** Functional

**Test Steps:**
1. Click on a file card in the library
2. Verify file details displayed:
   - File name
   - File type (UPPERCASE)
   - File size (formatted)
   - Upload date
3. Verify CDN URL accessible

**Expected Results:**
- ✅ File name displayed correctly
- ✅ Type: "VIDEO" / "PDF" / "AUDIO" / "IMAGE"
- ✅ Size formatted: "10.5 MB"
- ✅ Date formatted: "Oct 26, 2025"

**MCP Tools:**
```javascript
browser_click(element="File card", ref="...")
browser_snapshot()
browser_take_screenshot("tc-3-1-file-details.png")
```

---

### TC 3.2: Update File Metadata - Description
**AC:** MANAGE-02 - Update metadata (description, tags)
**Priority:** P1
**Type:** Functional

**Note:** This test depends on edit modal implementation. If not yet implemented, mark as PENDING.

**Test Steps:**
1. Click "Edit" button on file card
2. Edit modal opens
3. Update description: "Introduction to Python programming"
4. Click "Save" button
5. Verify description updated in file card

**Expected Results:**
- ✅ Edit modal opens with current metadata
- ✅ Description field editable
- ✅ Save button triggers PUT /api/v2/lms/admin/content/library/:id
- ✅ Success toast: "File metadata updated successfully"
- ✅ File card shows updated description

---

### TC 3.3: Delete File - Confirmation
**AC:** MANAGE-03 - Delete files (S3 + MongoDB)
**Priority:** P0
**Type:** Functional

**Test Steps:**
1. Click "×" button on file card
2. Verify confirmation dialog appears
3. Click "Cancel"
4. Verify file NOT deleted
5. Click "×" button again
6. Click "OK" in confirmation
7. Verify file deleted from grid
8. Verify stats updated

**Expected Results:**
- ✅ Confirmation: "Are you sure you want to delete this file? This action cannot be undone."
- ✅ Cancel preserves file
- ✅ OK deletes file
- ✅ DELETE /api/v2/lms/admin/content/library/:id called
- ✅ S3 file deleted (s3Service.deleteLMSContent)
- ✅ MongoDB entry deleted
- ✅ Success toast: "File deleted successfully"
- ✅ File removed from grid
- ✅ Stats updated

**MCP Tools:**
```javascript
browser_click(element="Delete button", ref="...")
browser_wait_for(text="Are you sure")
browser_take_screenshot("tc-3-3-delete-confirm.png")
browser_click(element="Cancel button", ref="...")
browser_snapshot()  // Verify file still present
browser_click(element="Delete button", ref="...")
// (Click OK in browser confirm dialog)
browser_wait_for(text="File deleted successfully")
browser_snapshot()
browser_take_screenshot("tc-3-3-deleted.png")
```

---

### TC 3.4: Delete File - In Use Prevention
**AC:** MANAGE-04 - Track course usage
**Priority:** P1
**Type:** Negative

**Preconditions:**
- File is used in a course (usedInCourses.length > 0)

**Test Steps:**
1. Attempt to delete file that's used in a course
2. Observe error message

**Expected Results:**
- ✅ Error response: 400 Bad Request
- ✅ Error message: "Cannot delete file: it is used in one or more courses"
- ✅ Response includes usedInCourses array
- ✅ File NOT deleted
- ✅ Error toast displayed

**MCP Tools:**
```javascript
browser_click(element="Delete button", ref="...")
browser_wait_for(text="Cannot delete file")
browser_take_screenshot("tc-3-4-in-use-error.png")
```

---

## AC Group 4: S3 Integration (S3-01 to S3-04)

### TC 4.1: Backend Proxy Upload Flow
**AC:** S3-01 - Backend proxy upload pattern
**Priority:** P0
**Type:** Integration

**Test Steps:**
1. Upload `test-video.mp4`
2. Monitor network requests:
   - POST /api/v2/lms/admin/content/upload (FormData)
3. Verify response includes:
   - `success: true`
   - `files[0].fileUrl` (CDN URL)
   - `files[0].s3Key`
4. Verify file accessible at CDN URL

**Expected Results:**
- ✅ Frontend sends FormData with file
- ✅ Backend receives file via Multer (uploads/ directory)
- ✅ Backend uploads to S3 via s3Service.uploadLMSContent()
- ✅ S3 key format: `lms/content/video/test-video_1729936847000_abc123.mp4`
- ✅ CDN URL format: `https://balagruha-lms-content.s3.ap-south-1.amazonaws.com/{s3Key}`
- ✅ ContentLibrary entry created in MongoDB
- ✅ Temp file cleaned up from uploads/
- ✅ Response status: 201 Created

**MCP Tools:**
```javascript
browser_network_requests()  // Capture upload request
browser_take_screenshot("tc-4-1-upload-flow.png")
```

---

### TC 4.2: CDN URL Accessibility
**AC:** S3-02 - CDN URL generation
**Priority:** P1
**Type:** Integration

**Test Steps:**
1. Upload a file
2. Extract CDN URL from response
3. Navigate to CDN URL in new tab
4. Verify file accessible

**Expected Results:**
- ✅ CDN URL format: `https://balagruha-lms-content.s3.ap-south-1.amazonaws.com/lms/content/{type}/{filename}`
- ✅ File accessible via CDN URL
- ✅ Correct Content-Type header
- ✅ No CORS errors

---

### TC 4.3: S3 File Structure Organization
**AC:** S3-03 - Organized file structure in S3
**Priority:** P2
**Type:** Functional

**Test Steps:**
1. Upload files of different types:
   - Video: test-video.mp4
   - PDF: test-document.pdf
   - Audio: test-audio.mp3
   - Image: test-image.jpg
2. Verify S3 keys follow structure:
   - `lms/content/video/{filename}_{timestamp}_{random}.mp4`
   - `lms/content/pdf/{filename}_{timestamp}_{random}.pdf`
   - `lms/content/audio/{filename}_{timestamp}_{random}.mp3`
   - `lms/content/image/{filename}_{timestamp}_{random}.jpg`

**Expected Results:**
- ✅ Files organized by type in S3 folders
- ✅ Filenames include timestamp for uniqueness
- ✅ Random string prevents collisions
- ✅ Original extension preserved

---

### TC 4.4: Temp File Cleanup
**AC:** S3-04 - Cleanup of temp files
**Priority:** P1
**Type:** Functional

**Test Steps:**
1. Upload a file
2. Check `uploads/` directory before upload
3. Verify temp file created during upload
4. Wait for upload completion
5. Verify temp file deleted after S3 upload

**Expected Results:**
- ✅ Temp file created in uploads/ with unique name
- ✅ Temp file uploaded to S3
- ✅ Temp file deleted after successful S3 upload (line 109-111 in contentController.js)
- ✅ Temp file deleted even on upload failure (cleanup in catch block)
- ✅ Cleanup cron job removes orphaned files older than 24 hours

**Note:** File system verification requires backend access or logs.

---

## AC Group 5: Performance & Responsive Design (PERF-01 to PERF-03)

### TC 5.1: MongoDB Indexes Performance
**AC:** PERF-01 - MongoDB indexes
**Priority:** P2
**Type:** Performance

**Test Steps:**
1. Query ContentLibrary with 100+ documents
2. Filter by fileType
3. Search by fileName/description
4. Verify query performance

**Expected Results:**
- ✅ Indexes exist:
   - `{ fileType: 1, uploadedAt: -1 }`
   - `{ fileName: 'text', tags: 'text', description: 'text' }`
   - `{ uploadedBy: 1 }`
   - `{ 'usedInCourses.courseId': 1 }`
- ✅ Query response time < 500ms

**Note:** Requires backend logs or MongoDB profiling.

---

### TC 5.2: Pagination Support
**AC:** PERF-02 - Pagination support
**Priority:** P1
**Type:** Functional

**Test Steps:**
1. Upload 50+ files
2. Verify initial load shows 20 files (default limit)
3. Scroll to bottom
4. Verify "Load More" button or infinite scroll
5. Click "Load More"
6. Verify next 20 files loaded

**Expected Results:**
- ✅ Initial query: `?limit=20&offset=0`
- ✅ Next query: `?limit=20&offset=20`
- ✅ `hasMore` field in response
- ✅ Total count displayed

**Note:** Frontend may not have pagination UI yet. Check ContentLibrary.jsx line 54-60.

---

### TC 5.3: Responsive Design - Mobile (375px)
**AC:** PERF-03 - Efficient queries with aggregation
**Priority:** P1
**Type:** Responsive

**Test Steps:**
1. Resize browser to 375px width (iPhone SE)
2. Navigate to Content Library
3. Verify layout adapts:
   - Stats cards stack vertically
   - Filters stack vertically
   - Grid becomes 1 column
4. Test upload modal
5. Verify mobile-friendly

**Expected Results:**
- ✅ Stats cards: 1 column on mobile
- ✅ Filter buttons: Horizontal scroll or wrap
- ✅ Grid: 1 column on mobile (`grid-cols-1`)
- ✅ Upload modal: Full screen on mobile
- ✅ Touch targets: Min 44px height
- ✅ No horizontal scroll

**MCP Tools:**
```javascript
browser_resize(375, 667)  // iPhone SE
browser_navigate("http://localhost:3000/admin/content-library")
browser_snapshot()
browser_take_screenshot("tc-5-3-mobile-375.png")
```

---

### TC 5.4: Responsive Design - Tablet (768px)
**AC:** PERF-03 - Efficient queries with aggregation
**Priority:** P1
**Type:** Responsive

**Test Steps:**
1. Resize browser to 768px width (iPad)
2. Verify layout:
   - Stats cards: 2-3 columns
   - Grid: 2-3 columns
3. Test all features

**Expected Results:**
- ✅ Stats cards: 2-3 columns (`md:grid-cols-5`)
- ✅ Grid: 2 columns (`md:grid-cols-2`)
- ✅ All features functional

**MCP Tools:**
```javascript
browser_resize(768, 1024)  // iPad
browser_snapshot()
browser_take_screenshot("tc-5-4-tablet-768.png")
```

---

### TC 5.5: Responsive Design - Desktop (1920px)
**AC:** PERF-03 - Efficient queries with aggregation
**Priority:** P1
**Type:** Responsive

**Test Steps:**
1. Resize browser to 1920px width
2. Verify layout:
   - Stats cards: 5 columns
   - Grid: 4 columns
3. Test all features

**Expected Results:**
- ✅ Stats cards: 5 columns
- ✅ Grid: 4 columns (`xl:grid-cols-4`)
- ✅ Optimal spacing and layout

**MCP Tools:**
```javascript
browser_resize(1920, 1080)  // Full HD
browser_snapshot()
browser_take_screenshot("tc-5-5-desktop-1920.png")
```

---

## Summary

### Total Test Cases: 25

**By Priority:**
- P0 (Critical): 12 test cases
- P1 (High): 11 test cases
- P2 (Medium): 2 test cases

**By AC Group:**
- Upload (AC UPLOAD-01 to UPLOAD-05): 7 test cases
- Library Display (AC LIBRARY-01 to LIBRARY-05): 5 test cases
- File Management (AC MANAGE-01 to MANAGE-04): 4 test cases
- S3 Integration (AC S3-01 to S3-04): 4 test cases
- Performance & Responsive (AC PERF-01 to PERF-03): 5 test cases

**Execution Order (Recommended):**
1. TC 4.1 - Backend proxy upload (validates core integration)
2. TC 1.1, 1.2 - Single and multi-file upload
3. TC 1.4, 1.5 - Validation (negative tests)
4. TC 2.1, 2.2, 2.3, 2.4 - Library filtering/sorting
5. TC 3.3 - Delete functionality
6. TC 5.3, 5.4, 5.5 - Responsive design
7. Remaining tests

**Manual QA Required:**
- TC 1.3 - Drag-and-drop (Playwright automation limitations)
- TC 1.7 - Retry on failure (requires network simulation)
- TC 4.4 - Temp file cleanup (requires backend access)
- TC 5.1 - MongoDB indexes (requires profiling)

---

**Test Scenarios Ready for QA Execution**
**Status:** ✅ COMPLETE
**Last Updated:** 2025-10-26 12:35:25 (via `date '+%Y-%m-%d %H:%M:%S'`)

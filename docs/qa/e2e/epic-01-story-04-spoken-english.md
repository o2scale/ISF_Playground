# E2E Test Scenarios - Epic 01 Story 04: Spoken English Video Recording

**Story ID:** SPRINT2-E01-S04
**Test Environment:** Desktop (1366x768), Chrome/Edge with webcam
**Prerequisites:** Student logged in, navigated to `/student/spoken-english` or `/student/spoken-english/task1`, physical webcam connected
**Total Test Cases:** 58

---

## 1. Audio Instructions Player (TC 1.1 - 1.4)

### TC 1.1: Audio Player Display
**Priority:** P0
**Steps:**
1. Navigate to Spoken English page (`/student/spoken-english/task1`)
2. Wait for page to fully load
3. Verify audio instructions section is visible

**Expected Result:**
- Audio instructions section displays with blue-50 background
- Border: 1px blue-200, rounded-lg, padding p-4
- Section heading: "🎧 Audio Instructions"
- Play button visible with blue-600 background, white text
- Button text: "▶️ Play Audio Instructions"

**Acceptance Criteria:** AC-01

---

### TC 1.2: Play Audio Instructions
**Priority:** P0
**Steps:**
1. Complete TC 1.1
2. Click "▶️ Play Audio Instructions" button
3. Observe button state change
4. Wait for audio to play

**Expected Result:**
- Button text changes to "⏸️ Pause Audio"
- Audio starts playing (if audioUrl provided by backend)
- Progress bar starts animating
- Button remains interactive (can pause)
- If audioUrl is null: Message displays "Audio instructions not available for this task."

**Acceptance Criteria:** AC-02

---

### TC 1.3: Audio Progress Bar Display
**Priority:** P0
**Steps:**
1. Start playing audio (TC 1.2)
2. Observe progress bar elements
3. Wait for 5 seconds
4. Verify time updates

**Expected Result:**
- Progress bar displays current time (e.g., 00:05)
- Progress bar displays total duration (e.g., 01:00)
- Format: "MM:SS / MM:SS" (00:05 / 01:00)
- Blue fill bar (bg-blue-600) animates smoothly
- Fill width percentage = (currentTime / duration) * 100
- Time updates every second
- Gray background bar (bg-gray-300, rounded-full, h-2)

**Acceptance Criteria:** AC-03

---

### TC 1.4: Instructions Text Display
**Priority:** P0
**Steps:**
1. Navigate to Spoken English page
2. Scroll to audio instructions section
3. Look below audio player controls

**Expected Result:**
- Instructions text displays below audio player
- Border-top separator: border-t border-blue-200
- Margin-top: mt-3, padding-top: pt-3
- Text styling: text-sm, gray-700, leading-relaxed
- Content matches instructionsText from backend
- Example text: "Listen carefully to the poem. Practice once or twice before recording..."

**Acceptance Criteria:** AC-04

---

## 2. Webcam Access & Preview (TC 2.1 - 2.5)

### TC 2.1: Webcam Access Requested on Page Load
**Priority:** P0
**Steps:**
1. Clear browser permissions for localhost
2. Navigate to `/student/spoken-english/task1`
3. Observe browser permission prompt

**Expected Result:**
- Browser displays webcam/microphone permission prompt automatically
- Prompt requests both video and audio access
- Page waits for user response before proceeding
- useEffect triggers getUserMedia on mount

**Acceptance Criteria:** AC-05

---

### TC 2.2: Live Webcam Feed Display
**Priority:** P0
**Steps:**
1. Navigate to Spoken English page
2. Click "Allow" on webcam permission prompt
3. Wait for webcam to activate (1-2 seconds)
4. Observe video preview area

**Expected Result:**
- Live webcam feed displays in video area
- Video aspect ratio is 16:9
- Ideal resolution: 1280x720 (may fallback to browser default)
- Video border: 2px blue-300, rounded-lg
- Video auto-plays (user sees themselves live)
- Video is muted (muted={!recordedBlob})
- Video element has playsInline attribute
- Section heading: "📷 Webcam Preview"
- Yellow info banner below video: "⚠️ Make sure you're in a well-lit area..."

**Acceptance Criteria:** AC-06

---

### TC 2.3: Webcam Access Denied - Error Handling
**Priority:** P0
**Steps:**
1. Navigate to Spoken English page
2. Click "Deny" or "Block" on webcam permission prompt
3. Observe error state in video area

**Expected Result:**
- Error message displays in video preview area
- Background: gray-900 bg-opacity-80
- Large camera icon: 📹 (text-6xl)
- Main message: "Webcam not detected" (text-xl, font-semibold, white)
- Subtitle: "Please connect a webcam to continue" (text-sm, gray-300)
- "Retry Connection" button visible (blue-600, hover:blue-700)
- Retry button triggers page reload: window.location.reload()
- Recording controls are disabled

**Acceptance Criteria:** AC-07

---

### TC 2.4: Webcam Not Detected - Warning
**Priority:** P0
**Steps:**
1. Physically disconnect webcam (or use browser DevTools to simulate no devices)
2. Navigate to Spoken English page
3. Observe warning state

**Expected Result:**
- Same error state as TC 2.3
- Camera icon 📹 displays prominently
- Warning message: "Webcam not detected"
- Instructions: "Please connect a webcam to continue"
- "Retry Connection" button available
- No live feed attempts to display

**Acceptance Criteria:** AC-08

---

### TC 2.5: Webcam Preview Styling
**Priority:** P1
**Steps:**
1. After webcam activates successfully
2. Inspect video preview container

**Expected Result:**
- Container: relative w-full aspect-video
- Border: border-2 (blue-300 initially, red-500 when recording)
- Rounded corners: rounded-lg
- Overflow: overflow-hidden
- Background: bg-black (when no video)
- Video element: w-full h-full object-cover

**Acceptance Criteria:** AC-06

---

## 3. Video Recording (TC 3.1 - 3.7)

### TC 3.1: Start Video Recording
**Priority:** P0
**Steps:**
1. Navigate to page with webcam active
2. Verify "● Record" button is enabled (red-600 background)
3. Click "● Record" button
4. Observe state changes

**Expected Result:**
- Recording starts immediately
- recordingState changes from 'initial' to 'recording'
- "Record" button becomes disabled (opacity-50, cursor-not-allowed)
- "Stop" button becomes enabled (gray-600, pulsing animation)
- Play, Redo, Submit buttons remain disabled
- MediaRecorder starts with mimeType 'video/webm;codecs=vp9' (or fallback to 'video/webm')
- recordedChunksRef array is cleared

**Acceptance Criteria:** AC-09

---

### TC 3.2: Recording Indicator Display
**Priority:** P0
**Steps:**
1. Start recording (TC 3.1)
2. Observe video preview area overlay
3. Look at top-left corner of video

**Expected Result:**
- Recording indicator appears in top-left (absolute top-4 left-4)
- Red dot: 🔴 or white circle with bg-white, rounded-full, animate-pulse
- Text: "REC" (font-bold, white)
- Timer displays next to "REC": "00:00" initially
- Background: bg-red-600 with opacity
- Padding: px-3 py-2, rounded-md
- Indicator has animate-pulse class (pulsing animation)

**Acceptance Criteria:** AC-10

---

### TC 3.3: Recording Timer Updates
**Priority:** P0
**Steps:**
1. Start recording
2. Observe timer in recording indicator
3. Wait for 15 seconds
4. Count timer increments

**Expected Result:**
- Timer starts at 00:00 when recording begins
- Timer increments every second: 00:01, 00:02, 00:03...
- Format is MM:SS (e.g., 00:15 after 15 seconds)
- After 60 seconds, format shows 01:00, 01:01...
- Timer is accurate (matches actual elapsed time)
- setInterval runs with 1000ms frequency
- Timer displays in recording indicator: "🔴 REC 00:15"

**Acceptance Criteria:** AC-11

---

### TC 3.4: Red Border During Recording
**Priority:** P0
**Steps:**
1. Note video area border before recording (blue-300)
2. Start recording
3. Observe border change
4. Stop recording
5. Observe border return to original

**Expected Result:**
- Initial border: border-2 border-blue-300
- During recording: border-2 border-red-500
- After stop: border-2 border-blue-300
- Border width remains consistent (2px)
- Transition is smooth

**Acceptance Criteria:** AC-12

---

### TC 3.5: Stop Video Recording
**Priority:** P0
**Steps:**
1. Start recording and wait ~10 seconds
2. Click "■ Stop" button
3. Observe state changes

**Expected Result:**
- Recording stops immediately
- mediaRecorder.stop() called
- "Stop" button becomes disabled (opacity-50)
- "Record" button remains disabled (has recording now)
- "Play" button becomes enabled (blue-600)
- "Redo" button becomes enabled (orange-600)
- "Submit" button becomes enabled (green-600)
- Recording indicator disappears
- Border returns to blue-300
- recordingState changes to 'recorded'
- Timer stops incrementing
- setInterval is cleared

**Acceptance Criteria:** AC-13

---

### TC 3.6: Recorded Video Display
**Priority:** P0
**Steps:**
1. Complete recording (TC 3.5)
2. Observe video preview area
3. Check video source

**Expected Result:**
- Live webcam feed is replaced by recorded video
- Video element srcObject is set to null
- Video element src is set to Blob URL (blob:http://localhost:3000/...)
- Blob created with type: 'video/webm'
- Video shows first frame (thumbnail)
- Video controls are visible (controls={true})
- Video is NOT auto-playing
- Section heading changes to "📹 Recorded Video"
- Green success banner displays: "✓ Recording complete! You can preview your video using the controls above, or re-record if needed. Duration: MM:SS"

**Acceptance Criteria:** AC-14

---

### TC 3.7: Multiple Recording Attempts
**Priority:** P1
**Steps:**
1. Record first video
2. Click "Re-record" (confirm modal)
3. Record second video
4. Verify second video replaces first

**Expected Result:**
- First recording is deleted when re-record confirmed
- Second recording creates new Blob
- Only second video is accessible for playback/submission
- No memory leaks from first Blob (URL.revokeObjectURL called)

**Acceptance Criteria:** AC-21

---

## 4. Video Playback (TC 4.1 - 4.4)

### TC 4.1: Play Recorded Video
**Priority:** P0
**Steps:**
1. Complete recording and stop (has recorded video)
2. Click "▶️ Play" button on controls
3. Observe video playback

**Expected Result:**
- Recorded video starts playing from beginning
- Video element has controls={true} (HTML5 native controls visible)
- Audio is unmuted (muted={false} when recorded video)
- Video plays smoothly without stuttering
- User can hear themselves in the recording
- Play button functionality provided by HTML5 controls (not custom button)

**Acceptance Criteria:** AC-15

---

### TC 4.2: Video Player Controls Work
**Priority:** P0
**Steps:**
1. Start playing recorded video
2. Test each HTML5 video control:
   - Pause button (click while playing)
   - Play button (click while paused)
   - Seek bar (drag to different timestamp)
   - Volume control (adjust slider)
   - Mute button (toggle mute)
   - Fullscreen button (if available)

**Expected Result:**
- Pause button pauses playback
- Play button resumes playback
- Seek bar allows jumping to different timestamps
- Volume control adjusts audio level (0-100%)
- Mute button silences audio
- Fullscreen button works (browser-dependent)
- All controls are responsive and functional
- Progress bar updates during playback

**Acceptance Criteria:** AC-16

---

### TC 4.3: Playback Progress Bar
**Priority:** P0
**Steps:**
1. Play recorded video
2. Observe HTML5 native progress bar
3. Monitor current time / total duration

**Expected Result:**
- HTML5 video controls show progress bar automatically
- Current playback position visible
- Time display shows current time / total duration (browser-dependent)
- Progress bar fill percentage updates smoothly
- User can see how much of video has played

**Acceptance Criteria:** AC-17

---

### TC 4.4: Video End Behavior
**Priority:** P1
**Steps:**
1. Play recorded video
2. Wait for video to reach the end
3. Observe behavior

**Expected Result:**
- Video stops at the end (loop attribute not set)
- Playback position resets to beginning
- Play button allows replaying video
- No errors occur at video end
- Video element does not loop automatically

**Acceptance Criteria:** AC-18

---

## 5. Re-record Functionality (TC 5.1 - 5.4)

### TC 5.1: Open Re-record Confirmation Modal
**Priority:** P0
**Steps:**
1. Complete recording and stop (has recorded video)
2. Click "↻ Re-record" button on controls
3. Observe modal display

**Expected Result:**
- Modal overlay displays (fixed inset-0)
- Overlay background: bg-black bg-opacity-50
- Modal is centered: flex items-center justify-center
- Modal z-index: z-50
- Modal card: bg-white rounded-lg shadow-xl max-w-md w-full
- Modal appears above all other content

**Acceptance Criteria:** AC-19

---

### TC 5.2: Re-record Confirmation Message
**Priority:** P0
**Steps:**
1. Open re-record modal (TC 5.1)
2. Read modal content
3. Verify all elements

**Expected Result:**
- Modal header: bg-orange-600 text-white px-6 py-4 rounded-t-lg
- Header title: "Confirm Re-record" (text-xl font-bold)
- Warning icon: ⚠️ (text-4xl)
- Main message: "Are you sure you want to re-record?" (text-lg font-semibold text-gray-900)
- Explanation: "This will delete your current recording and you'll need to record again from the beginning." (text-gray-600)
- Two buttons visible: "Cancel" (gray-200) and "Yes, Re-record" (orange-600)
- Modal content padding: p-6

**Acceptance Criteria:** AC-20

---

### TC 5.3: Confirm Re-record - Clear Recording
**Priority:** P0
**Steps:**
1. Open re-record modal
2. Click "Yes, Re-record" button (orange-600)
3. Observe state changes

**Expected Result:**
- Modal closes immediately
- recordedBlob is set to null (setRecordedBlob(null))
- recordingDuration resets to 0
- recordingState changes to 'initial'
- Live webcam feed returns to video area
- Video src is cleared
- Video srcObject is set back to mediaStream
- "Record" button becomes enabled (red-600)
- "Stop", "Play", "Redo", "Submit" buttons become disabled
- recordedChunksRef.current is cleared ([])
- Video border returns to blue-300
- Blob URL is revoked (URL.revokeObjectURL)

**Acceptance Criteria:** AC-21

---

### TC 5.4: Cancel Re-record - Keep Recording
**Priority:** P0
**Steps:**
1. Open re-record modal
2. Click "Cancel" button (gray-200)
3. Observe state

**Expected Result:**
- Modal closes immediately
- Recorded video remains intact (Blob not cleared)
- Video preview still shows recorded video
- Play, Redo, Submit buttons remain enabled
- No state changes occur
- recordingState remains 'recorded'
- User can still play, submit, or try redo again

**Acceptance Criteria:** AC-22

---

## 6. Video Submission (TC 6.1 - 6.6)

### TC 6.1: Submit Button Enabled Only After Recording
**Priority:** P0
**Steps:**
1. Navigate to page (no recording yet)
2. Verify Submit button is disabled
3. Complete a recording
4. Verify Submit button is enabled

**Expected Result:**
- Initially: Submit button disabled (opacity-50, cursor-not-allowed)
- Disabled condition: !hasRecording || recordingState === 'uploading'
- After recording: Submit button enabled (full opacity, cursor-pointer)
- Button color: bg-green-600 when enabled
- Button text: "✓ Submit Video"
- Hover state: hover:bg-green-700
- Button size: px-8 py-4 (larger than other buttons)

**Acceptance Criteria:** AC-23

---

### TC 6.2: Upload Video to Backend
**Priority:** P0
**Steps:**
1. Complete recording
2. Click "✓ Submit Video" button
3. Observe upload process
4. Check Network tab for API call

**Expected Result:**
- Button text changes to "⏳ Uploading..."
- Button becomes disabled during upload
- recordingState changes to 'uploading'
- All other buttons disabled during upload
- API call: POST `/api/v2/lms/student/:studentId/courses/spoken-english/submissions`
- Request body includes:
  - taskId: "task1"
  - duration: recording length in seconds
  - fileSize: Blob size in bytes
- Status: 200 OK
- Response includes:
  - success: true
  - submissionId: "sub123"
  - fileUrl: mock S3 URL
  - message: "Video submitted successfully!"

**Acceptance Criteria:** AC-24

---

### TC 6.3: Upload Progress Display (Deferred)
**Priority:** P1
**Steps:**
1. Start video submission
2. Monitor button text

**Expected Result:**
- Button text shows: "⏳ Uploading..."
- Percentage not currently displayed (AC-25 deferred)
- Future enhancement: "Uploading... 67%"
- User sees indication that upload is in progress

**Acceptance Criteria:** AC-25 (deferred)

---

### TC 6.4: Submission Record Saved to Database
**Priority:** P0
**Steps:**
1. Complete video submission
2. Wait for server response
3. Verify backend saves submission

**Expected Result:**
- Backend saves submission record (mock implementation)
- Submission includes:
  - submissionId: unique ID
  - studentId: from URL params
  - taskId: "task1"
  - courseId: "spoken-english"
  - fileUrl: mock S3 URL
  - duration: recording length in seconds
  - fileSize: Blob size in bytes
  - status: "pending" (awaiting coach grading)
  - submittedAt: timestamp
- Response message: "Video submitted successfully!"

**Acceptance Criteria:** AC-26

---

### TC 6.5: Success Toast Display
**Priority:** P0
**Steps:**
1. Complete video submission successfully
2. Wait for API response
3. Observe toast notification

**Expected Result:**
- Toast notification displays in top-right corner
- Toast library: react-hot-toast
- Toast message: "Video submitted! Coach will grade it soon."
- Toast style: success (green background)
- Toast icon: ✓ or checkmark
- Toast auto-dismisses after 3-5 seconds
- Position: top-right (via Toaster component)

**Acceptance Criteria:** AC-27

---

### TC 6.6: Auto-redirect After Submission (Deferred)
**Priority:** P1
**Steps:**
1. Complete video submission
2. Wait for success toast
3. Wait for 3 seconds
4. Observe navigation

**Expected Result:**
- Note: Auto-redirect not yet implemented (AC-28 deferred)
- Success toast displays correctly
- Page remains on current route
- Future enhancement: Redirect to next task or course homepage after 3 seconds

**Acceptance Criteria:** AC-28 (deferred)

---

## 7. Recording Controls (TC 7.1 - 7.6)

### TC 7.1: All 5 Control Buttons Display
**Priority:** P0
**Steps:**
1. Navigate to page with webcam active
2. Verify all 5 control buttons are visible

**Expected Result:**
- 5 buttons displayed horizontally with gap-3 spacing
- Flex layout: flex items-center justify-center gap-3 flex-wrap
- Button order (left to right):
  1. ● Record (Red)
  2. ■ Stop (Gray)
  3. ▶️ Play (Blue)
  4. ↻ Re-record (Orange)
  5. ✓ Submit Video (Green)
- All buttons: px-6 py-3, rounded-lg, font-bold (Submit: px-8 py-4)

**Acceptance Criteria:** Implementation detail

---

### TC 7.2: Record Button States
**Priority:** P0
**Steps:**
1. Initial state: No recording
2. Start recording
3. After recording exists

**Expected Result:**
- **State 1 (Initial):**
  - Enabled: bg-red-600 text-white hover:bg-red-700 cursor-pointer
  - Disabled conditions: !isWebcamReady || recordingState === 'recording' || hasRecording
- **State 2 (Recording):**
  - Disabled: bg-gray-300 text-gray-500 cursor-not-allowed opacity-50
- **State 3 (Has Recording):**
  - Disabled: bg-gray-300 text-gray-500 cursor-not-allowed opacity-50

**Acceptance Criteria:** AC-09

---

### TC 7.3: Stop Button States
**Priority:** P0
**Steps:**
1. Initial state: Not recording
2. During recording

**Expected Result:**
- **State 1 (Not Recording):**
  - Disabled: bg-gray-300 text-gray-500 cursor-not-allowed opacity-50
  - Disabled condition: recordingState !== 'recording'
- **State 2 (Recording):**
  - Enabled: bg-gray-600 text-white hover:bg-gray-700 cursor-pointer animate-pulse
  - Pulsing animation to draw attention

**Acceptance Criteria:** AC-13

---

### TC 7.4: Play, Redo, Submit Button States
**Priority:** P0
**Steps:**
1. Initial state: No recording
2. After recording exists

**Expected Result:**
- **Initial State (No Recording):**
  - All disabled: bg-gray-300 text-gray-500 cursor-not-allowed opacity-50
  - Disabled condition: !hasRecording
- **After Recording:**
  - Play: bg-blue-600 text-white hover:bg-blue-700
  - Redo: bg-orange-600 text-white hover:bg-orange-700
  - Submit: bg-green-600 text-white hover:bg-green-700 shadow-lg
  - All enabled and clickable

**Acceptance Criteria:** AC-15, AC-19, AC-23

---

### TC 7.5: Button Enable/Disable Logic
**Priority:** P0
**Steps:**
1. Test button states through complete workflow:
   - Initial → Record → Recording → Stop → Recorded → Submit → Uploading

**Expected Result:**
- **Initial:** Record (enabled), others (disabled)
- **Recording:** Stop (enabled, pulsing), others (disabled)
- **Recorded:** Play, Redo, Submit (enabled), Record/Stop (disabled)
- **Uploading:** All disabled
- Logic is consistent and prevents invalid actions

**Acceptance Criteria:** All control ACs

---

### TC 7.6: Button Responsive Behavior
**Priority:** P1
**Steps:**
1. Resize browser to mobile width (< 768px)
2. Verify buttons adapt

**Expected Result:**
- Buttons wrap to multiple rows if needed (flex-wrap)
- Touch-friendly sizes maintained
- Spacing remains consistent
- All buttons remain accessible

**Acceptance Criteria:** Responsive design (implementation detail)

---

## 8. API Endpoints (TC 8.1 - 8.4)

### TC 8.1: GET Specific Task Details
**Priority:** P0
**Steps:**
1. Open Network tab
2. Navigate to `/student/spoken-english/task1`
3. Verify API call

**Expected Result:**
- Request: GET `/api/v2/lms/student/:studentId/courses/spoken-english/task1`
- Status: 200 OK
- Response includes:
  - task.id: "task1"
  - task.title: "Recite 'Twinkle Twinkle Little Star'"
  - task.instructionsAudioUrl: null or URL
  - task.instructionsText: string
  - task.maxDuration: 120 (seconds)
  - task.poemText: full poem text
  - task.requirements: array of strings
  - task.rubric: object with criteria (pronunciation, fluency, etc.)

**Acceptance Criteria:** Backend API implementation

---

### TC 8.2: GET All Tasks
**Priority:** P1
**Steps:**
1. Open Network tab
2. Navigate to `/student/spoken-english` (no taskId)
3. Verify API call

**Expected Result:**
- Request: GET `/api/v2/lms/student/:studentId/courses/spoken-english`
- Status: 200 OK
- Response includes:
  - tasks: array of task objects
  - Each task has: id, title, difficulty, estimatedTime
  - Mock data: 3 tasks returned

**Acceptance Criteria:** Backend API implementation

---

### TC 8.3: POST Submit Video Recording
**Priority:** P0
**Steps:**
1. Complete recording
2. Click Submit
3. Verify API call in Network tab

**Expected Result:**
- Request: POST `/api/v2/lms/student/:studentId/courses/spoken-english/submissions`
- Request body (JSON):
  - taskId: "task1"
  - duration: number (seconds)
  - fileSize: number (bytes)
- Status: 200 OK
- Response includes:
  - success: true
  - submissionId: "sub123"
  - fileUrl: "https://isf-lms-videos.s3.amazonaws.com/..." (mock URL)
  - message: "Video submitted successfully!"

**Acceptance Criteria:** Backend API implementation

---

### TC 8.4: GET Submission History
**Priority:** P1
**Steps:**
1. Open Network tab
2. Trigger submission history fetch (if implemented in UI)

**Expected Result:**
- Request: GET `/api/v2/lms/student/:studentId/courses/spoken-english/submissions/history`
- Status: 200 OK
- Response includes:
  - submissions: array of submission objects
  - Each submission: id, taskId, fileUrl, duration, status, grade, feedback, submittedAt

**Acceptance Criteria:** Backend API implementation

---

## 9. Error Handling (TC 9.1 - 9.5)

### TC 9.1: Webcam Permission Denied
**Priority:** P0
**Steps:**
1. Clear browser permissions
2. Navigate to page
3. Click "Block" on permission prompt

**Expected Result:**
- Error caught in catch block of getUserMedia
- Error state displays in video preview
- Message: "Webcam not detected" or "Camera access denied"
- Retry button available
- Recording controls disabled
- No console errors (error logged, not thrown)

**Acceptance Criteria:** AC-07

---

### TC 9.2: MediaRecorder Not Supported
**Priority:** P1
**Steps:**
1. Use browser that doesn't support MediaRecorder (or mock)
2. Attempt to start recording

**Expected Result:**
- Error toast displays: "Your browser doesn't support video recording."
- Recommendation: "Please use Chrome, Edge, or Firefox"
- Recording controls disabled
- Graceful degradation

**Acceptance Criteria:** Error handling

---

### TC 9.3: Recording Fails Mid-Recording
**Priority:** P1
**Steps:**
1. Start recording
2. Disconnect webcam mid-recording
3. Observe error handling

**Expected Result:**
- Recording stops automatically
- Error toast: "Recording failed. Please try again."
- State resets to initial
- User can retry recording
- No application crash

**Acceptance Criteria:** Error handling

---

### TC 9.4: Network Error During Submission
**Priority:** P1
**Steps:**
1. Complete recording
2. Enable DevTools offline mode
3. Click Submit

**Expected Result:**
- Network request fails
- Error caught in catch block
- Error toast: "Submission failed. Please check your connection."
- recordingState resets to 'recorded'
- Submit button re-enabled
- User can retry submission

**Acceptance Criteria:** Error handling

---

### TC 9.5: API Server Error (500)
**Priority:** P1
**Steps:**
1. Mock backend to return 500 error
2. Attempt submission

**Expected Result:**
- Error toast: "Server error. Please try again later."
- Submit button re-enabled
- Recorded video preserved
- User can retry

**Acceptance Criteria:** Error handling

---

## 10. Responsive Design (TC 10.1 - 10.3)

### TC 10.1: Desktop Layout (1366x768)
**Priority:** P0
**Steps:**
1. Set browser to 1366x768
2. Navigate through Spoken English page

**Expected Result:**
- All content fits without horizontal scrolling
- Video preview displays at 16:9 ratio (max width 1280px)
- All 5 control buttons display side-by-side
- Audio player fits width
- Spacing: p-6, gap-3 between elements
- Max-width container centers content
- Text is readable (appropriate font sizes)

**Acceptance Criteria:** Desktop layout requirement

---

### TC 10.2: Tablet Layout (768px - 1023px)
**Priority:** P1
**Steps:**
1. Resize browser to 768px width
2. Test all features

**Expected Result:**
- Video preview scales to fit width (maintains 16:9)
- Control buttons may wrap to 2 rows
- Audio player scales appropriately
- Touch-friendly button sizes
- No horizontal scrolling
- All features remain functional

**Acceptance Criteria:** Responsive design (deferred per story)

---

### TC 10.3: Mobile Layout (< 768px)
**Priority:** P1
**Steps:**
1. Resize to 375px width (mobile)
2. Test complete workflow

**Expected Result:**
- Video preview full width (maintains 16:9)
- Control buttons stack vertically (full width)
- Button padding reduces: px-4 py-2
- Audio player full width
- Touch-friendly tap targets (min 44px)
- Vertical scrolling works smoothly
- Text sizes appropriate for mobile

**Acceptance Criteria:** Responsive design (deferred per story)

---

## 11. Browser Compatibility (TC 11.1 - 11.3)

### TC 11.1: Chrome Browser Support
**Priority:** P0
**Steps:**
1. Test all features in Google Chrome (latest version)
2. Verify WebRTC, MediaRecorder, video playback

**Expected Result:**
- All features work as expected
- WebRTC: getUserMedia works
- MediaRecorder: VP9 codec supported
- Video playback: Blob URLs work
- No console errors
- Performance is smooth

**Acceptance Criteria:** Browser compatibility

---

### TC 11.2: Edge Browser Support
**Priority:** P0
**Steps:**
1. Test all features in Microsoft Edge (latest version)
2. Verify WebRTC, MediaRecorder, video playback

**Expected Result:**
- All features work as expected
- WebRTC: getUserMedia works
- MediaRecorder: VP9 or H.264 codec
- Video playback works correctly
- No console errors
- Performance is smooth

**Acceptance Criteria:** Browser compatibility

---

### TC 11.3: Firefox Browser Support
**Priority:** P1
**Steps:**
1. Test all features in Mozilla Firefox (latest version)
2. Verify WebRTC, MediaRecorder, video playback

**Expected Result:**
- WebRTC works (getUserMedia)
- MediaRecorder may use VP8 instead of VP9
- Video playback works with different codec
- Some styling differences acceptable
- Minimal console warnings
- Core features functional

**Acceptance Criteria:** Browser compatibility

---

## 12. Performance (TC 12.1 - 12.3)

### TC 12.1: Page Load Time
**Priority:** P1
**Steps:**
1. Clear cache
2. Navigate to `/student/spoken-english/task1`
3. Measure load time with DevTools Performance tab

**Expected Result:**
- Page loads in < 3 seconds
- API call completes in < 1 second
- Webcam activates in 1-2 seconds
- Smooth transition to ready state
- No blocking render

**Acceptance Criteria:** Performance requirement

---

### TC 12.2: Video Recording Performance
**Priority:** P1
**Steps:**
1. Record 2-minute video at high quality
2. Monitor memory usage
3. Stop recording and create Blob

**Expected Result:**
- Recording captures smoothly without dropped frames
- Memory usage is reasonable (< 500 MB for 2-min video)
- Blob creation is fast (< 1 second)
- No browser lag or freezing
- Timer updates smoothly every second

**Acceptance Criteria:** Performance requirement

---

### TC 12.3: Large Video File Handling
**Priority:** P1
**Steps:**
1. Record long video (> 2 minutes at high quality)
2. Stop recording (large Blob > 10 MB)
3. Play video
4. Submit video

**Expected Result:**
- Large Blob created successfully
- Playback starts without long delay
- Upload progress shows (when implemented)
- No browser memory issues or crashes
- Blob URL revoked properly to free memory

**Acceptance Criteria:** Performance requirement

---

## 13. Accessibility (TC 13.1 - 13.3)

### TC 13.1: Keyboard Navigation
**Priority:** P1
**Steps:**
1. Use Tab key to navigate through page
2. Press Enter/Space to activate buttons

**Expected Result:**
- All buttons are keyboard accessible
- Tab order is logical (top to bottom)
- Focus indicators visible (outline or border)
- Enter/Space activates buttons
- Can navigate audio player controls
- Can play/pause video with keyboard

**Acceptance Criteria:** Accessibility requirement

---

### TC 13.2: Screen Reader Support
**Priority:** P1
**Steps:**
1. Enable screen reader (NVDA/JAWS)
2. Navigate through Spoken English page

**Expected Result:**
- Button labels announced clearly ("Record button", "Stop button")
- Video state changes announced ("Recording...", "Recording complete")
- Recording timer announced periodically
- Error messages announced
- Form elements have proper labels

**Acceptance Criteria:** Accessibility requirement

---

### TC 13.3: Color Contrast & Visual Accessibility
**Priority:** P1
**Steps:**
1. Use accessibility checker (axe, WAVE)
2. Verify color contrast ratios

**Expected Result:**
- Text has sufficient contrast (WCAG AA minimum)
- Button colors meet contrast requirements
- Recording indicator is visible (red on video)
- Focus states are clear
- No reliance on color alone for information

**Acceptance Criteria:** Accessibility requirement

---

## 14. Cleanup & Memory Management (TC 14.1 - 14.2)

### TC 14.1: Webcam Released on Unmount
**Priority:** P0
**Steps:**
1. Navigate to Spoken English page
2. Allow webcam access (webcam LED lights up)
3. Navigate away from page or close tab
4. Observe webcam LED turns off

**Expected Result:**
- Webcam stream stopped (getTracks().forEach(track => track.stop()))
- Webcam LED turns off (camera no longer in use)
- useEffect cleanup function runs on unmount
- No memory leaks
- mediaStreamRef is cleared

**Acceptance Criteria:** Implementation detail

---

### TC 14.2: Timer Cleared on Unmount
**Priority:** P0
**Steps:**
1. Start recording
2. Navigate away before stopping
3. Verify no memory leaks

**Expected Result:**
- setInterval is cleared (clearInterval called)
- recordingTimerRef is cleaned up
- useEffect cleanup runs
- No ongoing timers after unmount
- No console warnings

**Acceptance Criteria:** Implementation detail

---

## 15. Known Limitations & Deferred Features

### Deferred Features
- **AC-25:** Upload progress percentage (shows "Uploading..." text only)
- **AC-28:** Auto-redirect after submission (not implemented)
- **AC-29:** Offline submission queueing (not implemented)
- **AC-30:** Offline indicator display (not implemented)

**Current Implementation:**
- Mock S3 upload (placeholder URLs returned)
- Audio instructions URL may be null (shows "not available" message)
- Success toast displays, but no auto-redirect
- No offline mode support

### Technical Limitations
- **HTTPS Requirement:** WebRTC requires HTTPS in production (localhost HTTP works for testing)
- **Browser Codec Differences:** VP9 in Chrome/Edge, VP8 in Firefox
- **Webcam Hardware Required:** Virtual webcams may have compatibility issues
- **Large File Size:** Videos > 50 MB may require chunked upload (not implemented)

---

## Test Summary

**Total Test Cases:** 58
**Priority Breakdown:**
- P0 (Critical): 46 test cases
- P1 (High): 12 test cases

**Coverage:**
- Audio Instructions: 4 tests
- Webcam Access & Preview: 5 tests
- Video Recording: 7 tests
- Video Playback: 4 tests
- Re-record Functionality: 4 tests
- Video Submission: 6 tests
- Recording Controls: 6 tests
- API Endpoints: 4 tests
- Error Handling: 5 tests
- Responsive Design: 3 tests
- Browser Compatibility: 3 tests
- Performance: 3 tests
- Accessibility: 3 tests
- Cleanup & Memory: 2 tests

**Expected Pass Rate for MVP:** 90%+ (P0 tests)
**Deferred Features:** Upload progress %, auto-redirect, offline mode
**Critical Requirements:** Physical webcam, HTTPS for production, modern browser with WebRTC support

---

**Last Updated:** 2025-10-28 (Generated by Dev Agent)
**Test Environment:** Desktop Chrome/Edge with webcam, 1366x768
**Node Version:** v22.14.0
**React Version:** Latest
**Physical Webcam Required:** Yes (WebRTC testing)

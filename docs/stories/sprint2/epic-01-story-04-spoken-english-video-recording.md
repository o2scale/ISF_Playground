# Epic 01 - Story 04: Spoken English Video Recording

**Story ID:** SPRINT2-E01-S04
**Epic:** Epic 01 - LMS Student Experience
**Story:** Spoken English Video Recording
**Priority:** Critical (P0)
**Estimated Effort:** 8-10 hours
**Assigned To:** [Dev Team]
**Status:** Ready for Development
**Created:** 2025-10-24 14:43:43
**Last Updated:** 2025-10-24 14:43:43

---

## 1. Story Description

Create the Spoken English course interface with webcam-based video recording for poetry recitation and speech activities. Students can:
- Play audio instructions for the task
- Record video performance using webcam
- Preview recorded video before submission
- Re-record if not satisfied
- Submit video for coach grading

### User Story
**As a** Student
**I want** to record video performances of poetry and speeches
**So that** I can practice spoken English and get graded by my coach

---

## 1.5. Visual Layout Diagrams

### 1.5.1. Full Spoken English Page Layout (Desktop 1366x768)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Title Bar (persistent from Story 01)                                                │
│ Toolbar (persistent from Story 01)                                                  │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  SPOKEN ENGLISH COURSE                                                              │
│                                                                                       │
│  Task: Recite "Twinkle Twinkle Little Star"                                         │
│  (text-2xl, font-bold, blue-900)                                                    │
│                                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │ [▶️ Play Audio Instructions]  [Audio Progress: ▓▓▓▓░░ 00:30 / 01:00]        │   │
│  │ "Listen carefully to the poem, then recite it in front of the camera..."     │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  Instructions:                                                                        │
│  1. Listen to the audio instructions carefully                                       │
│  2. Practice once or twice before recording                                          │
│  3. Click "Record" and recite the poem clearly                                       │
│  4. Watch your recording and re-record if needed                                     │
│  5. Submit your best performance for grading                                         │
│                                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                               │   │
│  │                                                                               │   │
│  │                    [WEBCAM PREVIEW / RECORDED VIDEO]                          │   │
│  │                    16:9 Aspect Ratio (1280x720)                               │   │
│  │                    Border: 2px blue-300                                       │   │
│  │                                                                               │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  Recording Controls:                                                                 │
│  ┌────────────┬───────────┬────────────┬──────────────┬────────────────────┐        │
│  │ [● Record] │ [■ Stop]  │ [▶️ Play]  │ [↻ Redo]    │ [✓ Submit Video]   │        │
│  │  Red-600   │  Gray-600 │  Blue-600  │  Orange-600  │  Green-600         │        │
│  │  (px-6)    │  (px-6)   │  (px-6)    │  (px-6)      │  (px-8 py-4)       │        │
│  └────────────┴───────────┴────────────┴──────────────┴────────────────────┘        │
│                                                                                       │
│  Status: Ready to record | Recording... 00:15 | Playing... | Ready to submit        │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
                Desktop View (1366x768) - Max Width 1024px Container
```

---

### 1.5.2. Recording States Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  RECORDING STATES & TRANSITIONS                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  State 1: INITIAL (Webcam Preview)                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                               │   │
│  │            [Live Webcam Feed]                                                 │   │
│  │            Student sees themselves                                            │   │
│  │            Resolution: 1280x720                                               │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│  Controls: [● Record] (enabled)  [■ Stop] (disabled)  [▶️ Play] (disabled)          │
│            [↻ Redo] (disabled)   [✓ Submit] (disabled)                              │
│  Status: "Ready to record"                                                           │
│                       ↓ (Click "Record")                                             │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│  State 2: RECORDING                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                               │   │
│  │            [Live Webcam Feed with RED border]                                 │   │
│  │            🔴 REC  00:15  ← Recording indicator                               │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│  Controls: [● Record] (disabled)  [■ Stop] (enabled, pulsing red)                   │
│            [▶️ Play] (disabled)    [↻ Redo] (disabled)   [✓ Submit] (disabled)      │
│  Status: "Recording... 00:15" (timer updates every second)                           │
│                       ↓ (Click "Stop")                                               │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│  State 3: RECORDED (Preview)                                                         │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                               │   │
│  │            [Recorded Video - First Frame]                                     │   │
│  │            ▶️ Click to play                                                   │   │
│  │            Duration: 00:45                                                    │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│  Controls: [● Record] (disabled)  [■ Stop] (disabled)  [▶️ Play] (enabled)          │
│            [↻ Redo] (enabled)     [✓ Submit] (enabled)                              │
│  Status: "Recording complete. Preview or submit your video."                         │
│                       ↓ (Click "Play")                                               │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│  State 4: PLAYING                                                                    │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                               │   │
│  │            [Playing Recorded Video]                                           │   │
│  │            Progress: ▓▓▓▓▓░░░ 00:15 / 00:45                                  │   │
│  │            [Pause] [Seek Bar] [Volume]                                        │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│  Controls: [● Record] (disabled)  [■ Stop] (disabled)  [▶️ Play] (playing)          │
│            [↻ Redo] (enabled)     [✓ Submit] (enabled)                              │
│  Status: "Playing... 00:15 / 00:45"                                                  │
│                       ↓ (Click "Redo")                                               │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│  State 5: RESET (Back to State 1)                                                   │
│  Confirmation modal: "Are you sure? This will delete your current recording."        │
│  [Cancel]  [Yes, Re-record]                                                          │
│                       ↓ (Click "Submit")                                             │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│  State 6: SUBMITTING                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │            [Uploading... 67%]                                                 │   │
│  │            Progress bar with percentage                                       │   │
│  │            "Please wait..."                                                   │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│  Controls: All disabled                                                              │
│  Status: "Uploading video... 67%"                                                    │
│                       ↓ (Upload complete)                                            │
│  ─────────────────────────────────────────────────────────────────────────────────  │
│  State 7: SUCCESS                                                                    │
│  Toast notification: "Video submitted! Coach will grade it soon."                    │
│  Auto-redirect to next task or course homepage after 3 seconds                       │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 1.5.3. Audio Instructions Player

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  AUDIO INSTRUCTIONS SECTION                                                         │
│  Background: blue-50, Border: 1px blue-200, Rounded: rounded-lg, Padding: p-4      │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  ┌────────────────────────────────────────────────────────────────────────────┐     │
│  │  [▶️] Play Audio Instructions                                              │     │
│  │  └─ Button: blue-600 background, white text, px-4 py-2, rounded-md        │     │
│  └────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                       │
│  Audio Progress Bar:                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────────┐     │
│  │  ▓▓▓▓▓▓░░░░░░░░░░░░  00:30 / 01:00                                         │     │
│  │  (Blue fill, gray background, 8px height, rounded-full)                    │     │
│  └────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                       │
│  Instructions Text (displayed while playing or after):                               │
│  "Listen carefully to the poem. Practice once or twice before recording.             │
│   Speak clearly and look at the camera. You can re-record as many times as needed."  │
│   (text-sm, gray-700, line-height 1.6)                                              │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
        Height: Auto (min 120px)
        Margin-bottom: mb-6
```

---

### 1.5.4. Video Player / Webcam Preview

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  VIDEO/WEBCAM DISPLAY AREA                                                          │
│  Aspect Ratio: 16:9 (1280x720 default)                                             │
│  Border: 2px solid blue-300                                                         │
│  Background: black (when no video/webcam)                                           │
│  Rounded: rounded-lg                                                                │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  ┌────────────────────────────────────────────────────────────────────────────┐     │
│  │                                                                             │     │
│  │                                                                             │     │
│  │                  [LIVE WEBCAM FEED or RECORDED VIDEO]                      │     │
│  │                                                                             │     │
│  │  Recording Indicator (when recording):                                     │     │
│  │  🔴 REC  00:15  ← Top-left corner, red text, pulsing animation            │     │
│  │                                                                             │     │
│  │                                                                             │     │
│  └────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                       │
│  Empty State (no webcam access):                                                     │
│  ┌────────────────────────────────────────────────────────────────────────────┐     │
│  │                          📹                                                 │     │
│  │                  Webcam not detected                                        │     │
│  │            Please connect a webcam to continue                              │     │
│  │                  [Retry Connection]                                         │     │
│  └────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
        Width: 100% (max 1280px)
        Height: Auto (maintains 16:9 ratio)
        Margin: my-6
```

---

### 1.5.5. Recording Controls Bar

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  RECORDING CONTROLS                                                                 │
│  Flex layout: flex items-center gap-4 justify-center                               │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────────┐ │
│  │ ● Record   │  │ ■ Stop     │  │ ▶️ Play    │  │ ↻ Re-record│  │ ✓ Submit     │ │
│  │            │  │            │  │            │  │            │  │              │ │
│  │ Red-600 BG │  │ Gray-600   │  │ Blue-600   │  │ Orange-600 │  │ Green-600    │ │
│  │ White text │  │ White text │  │ White text │  │ White text │  │ White text   │ │
│  │ px-6 py-3  │  │ px-6 py-3  │  │ px-6 py-3  │  │ px-6 py-3  │  │ px-8 py-4    │ │
│  │ rounded-lg │  │ rounded-lg │  │ rounded-lg │  │ rounded-lg │  │ rounded-lg   │ │
│  │ font-bold  │  │ font-bold  │  │ font-bold  │  │ font-bold  │  │ font-bold    │ │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘  └──────────────┘ │
│   Enabled       Disabled        Disabled        Disabled         Disabled          │
│   (State 1)     (State 1)       (State 1)       (State 1)        (State 1)         │
│                                                                                       │
│  Button States:                                                                      │
│  - Enabled: Full opacity, cursor-pointer, hover effect (darker shade)               │
│  - Disabled: opacity-50, cursor-not-allowed, no hover effect                        │
│  - Active (recording): Pulsing animation on Stop button                             │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
        Height: 64px
        Margin-top: mt-6
```

---

### 1.5.6. Status Message & Timer

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  STATUS MESSAGE                                                                     │
│  Text-center, text-base, font-medium                                               │
│  Color changes based on state:                                                      │
│  - Ready: gray-600                                                                  │
│  - Recording: red-600                                                               │
│  - Playing: blue-600                                                                │
│  - Success: green-600                                                               │
│  - Error: red-600                                                                   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  State 1: "Ready to record. Click the red button when you're ready."                │
│  State 2: "Recording... 00:15" (timer updates every second)                          │
│  State 3: "Recording complete. Preview or submit your video."                        │
│  State 4: "Playing... 00:15 / 00:45"                                                 │
│  State 5: "Uploading video... 67%"                                                   │
│  State 6: "Video submitted successfully!"                                            │
│  Error:   "❌ Webcam access denied. Please allow camera permissions."                │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
        Height: 32px
        Margin-top: mt-4
```

---

### 1.5.7. Responsive Layout Variations

#### **Desktop (1366x768):**
- Full layout with 16:9 video preview
- All control buttons visible side-by-side
- Status message below controls

#### **Tablet (768px - 1023px):**
- Video preview scales to fit width
- Control buttons stack in 2 rows: Record/Stop/Play on first row, Redo/Submit on second row
- Status message below controls

#### **Mobile (< 768px):**
- Video preview full width
- Control buttons stack vertically with full-width buttons
- Smaller button padding (px-4 py-2)

---

### 1.5.8. Component Spacing & Measurements Summary

| Element | Width | Height | Padding | Margin | Border |
|---------|-------|--------|---------|--------|--------|
| Audio Player | 100% (max 896px) | Auto (min 120px) | p-4 | mb-6 | 1px blue-200 |
| Video/Webcam Area | 100% (max 1280px) | Auto (16:9) | - | my-6 | 2px blue-300 |
| Record Button | Auto (px-6) | 48px | px-6 py-3 | mr-2 | - |
| Stop Button | Auto (px-6) | 48px | px-6 py-3 | mr-2 | - |
| Play Button | Auto (px-6) | 48px | px-6 py-3 | mr-2 | - |
| Redo Button | Auto (px-6) | 48px | px-6 py-3 | mr-2 | - |
| Submit Button | Auto (px-8) | 56px | px-8 py-4 | - | - |
| Status Message | 100% | 32px | - | mt-4 | - |

---

## 2. Acceptance Criteria

### 2.1. Audio Instructions
- [ ] **AC-01:** Audio player displays with play button
- [ ] **AC-02:** Clicking play button plays audio instructions
- [ ] **AC-03:** Progress bar displays audio progress (00:30 / 01:00)
- [ ] **AC-04:** Instructions text displays below audio player

### 2.2. Webcam Access & Preview
- [ ] **AC-05:** Webcam access requested on page load
- [ ] **AC-06:** Live webcam feed displays in video area (16:9 ratio)
- [ ] **AC-07:** Webcam access denied displays error message with retry button
- [ ] **AC-08:** Webcam not detected displays warning message

### 2.3. Video Recording
- [ ] **AC-09:** Clicking "Record" button starts recording
- [ ] **AC-10:** Recording indicator displays (🔴 REC with timer)
- [ ] **AC-11:** Timer updates every second (00:01, 00:02, ...)
- [ ] **AC-12:** Red border appears around video area during recording
- [ ] **AC-13:** Clicking "Stop" button stops recording
- [ ] **AC-14:** Recorded video replaces webcam feed

### 2.4. Video Playback
- [ ] **AC-15:** Clicking "Play" button plays recorded video
- [ ] **AC-16:** Video player controls work (play, pause, seek, volume)
- [ ] **AC-17:** Progress bar displays playback progress
- [ ] **AC-18:** Video loops or stops at end (user preference)

### 2.5. Re-record Functionality
- [ ] **AC-19:** Clicking "Redo" button shows confirmation modal
- [ ] **AC-20:** Modal displays: "Are you sure? This will delete your current recording."
- [ ] **AC-21:** Confirming redo clears recorded video and returns to webcam preview
- [ ] **AC-22:** Canceling redo keeps current recording

### 2.6. Video Submission
- [ ] **AC-23:** "Submit" button enabled only after recording exists
- [ ] **AC-24:** Clicking "Submit" uploads video to S3
- [ ] **AC-25:** Upload progress displays (Uploading... 67%)
- [ ] **AC-26:** Submission record saved to database
- [ ] **AC-27:** Success toast displays: "Video submitted!"
- [ ] **AC-28:** Auto-redirect to next task or course homepage after 3 seconds

### 2.7. Offline Mode
- [ ] **AC-29:** Offline submissions queue for sync when online
- [ ] **AC-30:** Offline indicator displays when no internet connection

---

## 3. Task Breakdown (18 tasks)

### Phase 1: Webcam Access & Preview (Tasks 1-4)

**Task 1: Request Webcam Access**
- Use WebRTC API: `navigator.mediaDevices.getUserMedia({ video: true, audio: true })`
- Display permission prompt on page load
- Handle success: Display webcam feed
- Handle denial: Display error message with retry button
- **Estimated Time:** 30 minutes

**Task 2: Display Live Webcam Feed**
- File: `frontend/src/components/student/spoken-english/WebcamPreview.js`
- Use HTML5 `<video>` element with `srcObject = mediaStream`
- Set video resolution: 1280x720 (16:9 ratio)
- Apply border: 2px blue-300, rounded-lg
- **Estimated Time:** 30 minutes

**Task 3: Handle Webcam Errors**
- No webcam detected: "Webcam not detected. Please connect a webcam."
- Permission denied: "Camera access denied. Please allow camera permissions."
- Display retry button
- **Estimated Time:** 20 minutes

**Task 4: Create RecordingControls Component**
- File: `frontend/src/components/student/spoken-english/RecordingControls.js`
- Create 5 buttons: Record, Stop, Play, Redo, Submit
- Implement button enable/disable logic based on recording state
- **Estimated Time:** 30 minutes

---

### Phase 2: Audio Instructions Player (Tasks 5-6)

**Task 5: Implement Audio Player**
- Use HTML5 `<audio>` element
- Play button with audio controls
- Progress bar with current time / total duration
- **Estimated Time:** 30 minutes

**Task 6: Display Instructions Text**
- Instructions text displays below audio player
- Text from API or static content
- **Estimated Time:** 15 minutes

---

### Phase 3: Video Recording (Tasks 7-10)

**Task 7: Implement Record Functionality**
- Use MediaRecorder API: `new MediaRecorder(mediaStream, { mimeType: 'video/webm' })`
- Clicking "Record" button starts recording
- Display recording indicator: 🔴 REC with timer
- Red border around video area
- **Estimated Time:** 45 minutes

**Task 8: Implement Recording Timer**
- Use `setInterval` to update timer every second
- Display format: 00:15 (minutes:seconds)
- Timer starts at 00:00 when recording begins
- **Estimated Time:** 20 minutes

**Task 9: Implement Stop Functionality**
- Clicking "Stop" button stops recording
- Save recorded video as Blob
- Display first frame of recorded video
- Enable Play and Redo buttons
- **Estimated Time:** 30 minutes

**Task 10: Handle Recording Errors**
- MediaRecorder not supported: "Your browser doesn't support video recording."
- Recording fails: "Recording failed. Please try again."
- Display error message with retry button
- **Estimated Time:** 20 minutes

---

### Phase 4: Video Playback (Tasks 11-12)

**Task 11: Implement Playback Functionality**
- Clicking "Play" button plays recorded video
- Use HTML5 video element with controls
- Progress bar with current time / total duration
- Play, pause, seek, volume controls
- **Estimated Time:** 30 minutes

**Task 12: Implement Playback Progress Display**
- Display: "Playing... 00:15 / 00:45"
- Progress bar updates during playback
- Video stops or loops at end (user preference)
- **Estimated Time:** 20 minutes

---

### Phase 5: Re-record Functionality (Tasks 13-14)

**Task 13: Implement Redo Button with Confirmation Modal**
- Clicking "Redo" button opens modal
- Modal: "Are you sure? This will delete your current recording."
- Cancel button closes modal
- Confirm button clears recorded video and returns to webcam preview
- **Estimated Time:** 30 minutes

**Task 14: Reset Recording State**
- Clear recorded video Blob
- Reset timer to 00:00
- Return to State 1 (webcam preview)
- Disable Play, Redo, Submit buttons
- Enable Record button
- **Estimated Time:** 20 minutes

---

### Phase 6: Video Submission (Tasks 15-17)

**Task 15: Implement Submit Button**
- "Submit" button enabled only after recording exists
- Clicking button uploads video to S3
- Display loading state: "Uploading... 67%"
- Progress bar with percentage
- **Estimated Time:** 45 minutes

**Task 16: Upload Video to S3**
- Convert Blob to File
- Use multipart upload for large files
- Track upload progress
- Return S3 URL on success
- **Estimated Time:** 45 minutes

**Task 17: Save Submission Record & Display Success**
- API endpoint: `POST /api/v2/lms/student/:studentId/submissions`
- Request body: `{ type: "video", fileUrl: "s3://...", taskId, duration, fileSize }`
- Display success toast: "Video submitted! Coach will grade it soon."
- Auto-redirect to next task or course homepage after 3 seconds
- **Estimated Time:** 30 minutes

---

### Phase 7: Testing & Polish (Task 18)

**Task 18: End-to-End Testing**
- Test webcam access (allow, deny, no webcam)
- Test audio instructions playback
- Test video recording (record, stop, timer)
- Test video playback (play, pause, seek)
- Test redo functionality (confirmation modal)
- Test submission flow (upload, success)
- Test offline mode (queue submissions)
- Test responsive layout (desktop, tablet, mobile)
- Fix any visual bugs or layout issues
- **Estimated Time:** 1.5 hours

---

## 4. API Endpoints

**GET `/api/v2/lms/student/:studentId/courses/spoken-english/:taskId`**
- **Response:**
```json
{
  "task": {
    "id": "task1",
    "title": "Recite 'Twinkle Twinkle Little Star'",
    "instructionsAudioUrl": "https://s3.amazonaws.com/...",
    "instructionsText": "Listen carefully and recite...",
    "maxDuration": 120
  }
}
```

**POST `/api/v2/lms/student/:studentId/submissions`**
- **Request:** Multipart form-data
  - `file`: Video file (Blob)
  - `type`: "video"
  - `taskId`: string
  - `duration`: number (seconds)
  - `fileSize`: number (bytes)
- **Response:**
```json
{
  "success": true,
  "submissionId": "sub123",
  "fileUrl": "https://s3.amazonaws.com/...",
  "message": "Video submitted successfully!"
}
```

---

## 5. Definition of Done

- [ ] All 18 tasks completed
- [ ] All 30 acceptance criteria met
- [ ] Webcam access works
- [ ] Video recording works
- [ ] Video playback works
- [ ] Submission flow tested
- [ ] Responsive design tested
- [ ] Code reviewed and merged

---

**Status:** Ready for Development
**Last Updated:** 2025-10-24 14:43:43

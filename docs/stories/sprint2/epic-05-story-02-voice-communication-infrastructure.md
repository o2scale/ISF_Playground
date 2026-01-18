# Epic 05 - Story 02: Voice Communication Infrastructure (All Roles)

**Story ID:** SPRINT2-EPIC05-STORY02
**Epic:** Epic 05 - System-Wide Features
**Sprint:** Sprint 2
**Story Name:** Voice Communication Infrastructure (All Roles)
**Estimated Effort:** 8-10 hours (1.5 development days)
**Priority:** High (P1)
**Dependencies:**
- Backend: AWS S3 for voice note storage
- Frontend: MediaRecorder API (browser support)
- All roles: Student, Coach, Admin, Amma, PM

**Last Updated:** 2025-10-24 15:55:53
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As a** User (any role)
**I want** to record and send voice notes in a WhatsApp-style interface
**So that** I can communicate quickly and expressively without typing

### 1.2. Story Context

Voice communication is critical for ISF:
- **Students:** Respond to Life Skills questions, communicate with Amma
- **Coaches:** Provide feedback on assignments
- **Ammas:** Respond to student queries with empathy
- **Admins:** Broadcast "Mann ki Baat" messages

Voice note features:
- **Press-and-hold recording:** Familiar WhatsApp UX
- **Waveform visualization:** Real-time visual feedback during recording
- **Preview before sending:** Play back to review
- **Max duration:** 120 seconds (2 minutes)
- **S3 storage:** Secure cloud storage with CDN delivery
- **Playback controls:** Progress bar, play/pause, speed control (1x, 1.5x, 2x)

### 1.3. Key Features

- **Voice Recorder Component:** Reusable across all roles
- **Recording States:** Idle, Recording, Recorded, Sending, Success, Error
- **Waveform Visualization:** Canvas-based real-time waveform
- **Audio Preview:** Play back recorded voice note
- **S3 Upload:** Direct upload to S3 with signed URLs
- **Audio Player Component:** Reusable player for playback

---

## 1.5. Visual Layout Diagrams

### Voice Recorder - All States

```
State 1: IDLE (Ready to record)
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│                     [🎤 Press & Hold to Record]                            │ ← Large button
│                     Max duration: 120 seconds                              │   bg-gray-100
│                                                                            │   hover:bg-gray-200
└────────────────────────────────────────────────────────────────────────────┘

State 2: RECORDING (Mic active, waveform animating)
┌────────────────────────────────────────────────────────────────────────────┐
│ 🔴 Recording... 0:08 / 2:00                                         [❌]   │ ← Red indicator
│ ▓▓▓░▓▓▓▓░░▓▓▓▓▓░▓▓░▓▓▓▓░░▓▓▓▓▓▓░▓▓░▓▓▓░░▓▓▓▓░▓▓▓▓░░▓▓░▓▓▓▓         │ ← Waveform (canvas)
│ Release to send • Swipe ← to cancel                                        │   bg-red-100
└────────────────────────────────────────────────────────────────────────────┘

State 3: RECORDED (Preview, not yet sent)
┌────────────────────────────────────────────────────────────────────────────┐
│ [▶️] Your Voice Note (0:08)                               [🗑️ Delete]     │ ← Audio player
│ ──────●─────────────────────────────────────────────────────────────────   │   with progress
│ 0:00 / 0:08                                              [1x ▼]            │
│                                                                            │
│ [Re-record]                                              [Send Voice Note] │ ← Action buttons
└────────────────────────────────────────────────────────────────────────────┘

State 4: SENDING (Upload progress)
┌────────────────────────────────────────────────────────────────────────────┐
│ Sending voice note...                                                      │
│ ████████████████████████──────────── 75%                                  │ ← Progress bar
│ Uploading to server (12 KB / 16 KB)                                        │   green fill
└────────────────────────────────────────────────────────────────────────────┘

State 5: SUCCESS (Sent confirmation)
┌────────────────────────────────────────────────────────────────────────────┐
│ ✅ Voice note sent successfully!                                           │ ← Success message
│ Recipient will be notified.                                                │   bg-green-50
│                                                                            │   auto-dismiss: 3s
└────────────────────────────────────────────────────────────────────────────┘

State 6: ERROR (Upload failed)
┌────────────────────────────────────────────────────────────────────────────┐
│ ❌ Failed to send voice note.                                              │ ← Error message
│ Network error. Please check your connection and try again.                 │   bg-red-50
│ [Retry]                                                            [Cancel]│
└────────────────────────────────────────────────────────────────────────────┘
```

### Waveform Visualization - Canvas Rendering

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Waveform Visualization (Real-Time During Recording)                       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                            │
│ Frequency-based waveform (canvas element):                                 │
│                                                                            │
│   ▓▓▓  ░░░  ▓▓▓▓▓  ░░  ▓▓  ▓▓▓▓  ░░  ▓▓▓▓▓▓  ▓▓  ▓▓▓  ░░  ▓▓▓▓  ▓▓▓▓     │ ← Bars animated
│   ███  ░░░  █████  ░░  ██  ████  ░░  ██████  ██  ███  ░░  ████  ████     │   based on audio
│   ███  ░░░  █████  ░░  ██  ████  ░░  ██████  ██  ███  ░░  ████  ████     │   input volume
│   ▓▓▓  ░░░  ▓▓▓▓▓  ░░  ▓▓  ▓▓▓▓  ░░  ▓▓▓▓▓▓  ▓▓  ▓▓▓  ░░  ▓▓▓▓  ▓▓▓▓     │
│                                                                            │
│ Canvas: 600px × 80px                                                       │
│ Bars: 40 bars, each 14px wide, 1px gap                                     │
│ Height: Dynamic based on frequency amplitude (0-80px)                      │
│ Update frequency: 60 FPS (requestAnimationFrame)                           │
└────────────────────────────────────────────────────────────────────────────┘
```

### Audio Player - Playback Controls

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Voice Note Player (Reusable Component)                                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ [▶️]  Coach Priya's Voice Note (1:45)                     [⋮ More]     │ │ ← Player header
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ ──────────●────────────────────────────────────────────────────────   │ │ ← Progress bar
│ │ 0:45 / 1:45                                                            │ │   (draggable)
│ │                                                                        │ │
│ │ [⏮️ -10s]  [▶️ Play]  [⏭️ +10s]                           [1.5x ▼]     │ │ ← Controls
│ │                                                                        │ │   Speed: 1x, 1.5x, 2x
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│ More Options (⋮ dropdown):                                                 │
│ ┌────────────────────────────┐                                            │
│ │ Download Audio             │                                            │
│ │ Report Problem             │                                            │
│ │ Delete Voice Note          │                                            │
│ └────────────────────────────┘                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Mobile-Specific: Swipe to Cancel

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Mobile Recording (Touch Interface)                                         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                            │
│ User holds finger on mic button:                                           │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ 🔴 Recording... 0:08                                                    │ │
│ │ ▓▓▓░▓▓▓▓░░▓▓▓▓▓░▓▓░▓▓▓▓░░▓▓▓▓▓▓░▓▓░▓▓▓░░▓▓▓▓░▓▓▓▓░░▓▓░▓▓▓▓           │ │
│ │                                                                        │ │
│ │              ← Swipe left to cancel                                    │ │ ← Swipe indicator
│ │              Release to send                                            │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│ User swipes left (drag X position < -100px):                               │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ❌ Recording cancelled                                                  │ │ ← Cancel confirmation
│ └────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

### Component Measurements Summary

| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| **Voice Recorder (Idle)** | 100% | 64px | px-6 py-4 | mb-3 | rounded-lg bg-gray-100 | text-lg |
| **Voice Recorder (Recording)** | 100% | 100px | px-6 py-4 | mb-3 | rounded-lg bg-red-100 | text-lg |
| **Waveform Canvas** | 600px | 80px | - | my-3 | - | - |
| **Audio Player** | 100% | 120px | p-4 | mb-3 | rounded-lg border gray-200 | - |
| **Progress Bar** | 100% | 6px | - | my-3 | rounded-full bg-gray-200 | - |
| **Progress Fill** | % | 6px | - | - | rounded-full bg-blue-500 | - |
| **Control Button** | 48px | 48px | p-3 | mx-2 | rounded-full hover:bg-gray-100 | - |
| **Speed Dropdown** | 80px | 36px | px-3 py-2 | - | rounded border gray-300 | text-sm |

---

## 2. Acceptance Criteria

### 2.1. Voice Recording

- [ ] **REC-01:** Press-and-hold button initiates recording (uses MediaRecorder API)
- [ ] **REC-02:** Recording starts within 300ms of press
- [ ] **REC-03:** Red recording indicator displays: "🔴 Recording... 0:08 / 2:00"
- [ ] **REC-04:** Timer counts up from 0:00 to current recording duration
- [ ] **REC-05:** Waveform visualization animates in real-time based on audio input
- [ ] **REC-06:** Releasing button stops recording, shows preview
- [ ] **REC-07:** Swipe left (mobile) or Escape key (desktop) cancels recording
- [ ] **REC-08:** Maximum duration 120 seconds enforced (auto-stop at 2:00)
- [ ] **REC-09:** Recording indicator shows "Release to send • Swipe ← to cancel"

### 2.2. Waveform Visualization

- [ ] **WAVE-01:** Waveform renders using HTML5 Canvas
- [ ] **WAVE-02:** 40 bars displayed, each 14px wide, 1px gap
- [ ] **WAVE-03:** Bar height dynamic based on frequency amplitude (0-80px)
- [ ] **WAVE-04:** Waveform updates at 60 FPS (requestAnimationFrame)
- [ ] **WAVE-05:** Waveform color matches recording state: red (#EF4444) during recording
- [ ] **WAVE-06:** Waveform smoothly animated (no jittery movement)

### 2.3. Audio Preview

- [ ] **PREV-01:** After recording stops, preview player displays
- [ ] **PREV-02:** Preview shows: play button, duration, progress bar, delete button
- [ ] **PREV-03:** Play button plays recorded audio
- [ ] **PREV-04:** Progress bar updates during playback
- [ ] **PREV-05:** Progress bar draggable to seek to specific time
- [ ] **PREV-06:** "Delete" button deletes recording, returns to idle state
- [ ] **PREV-07:** "Re-record" button deletes recording, starts new recording
- [ ] **PREV-08:** "Send Voice Note" button uploads audio to S3

### 2.4. S3 Upload

- [ ] **S3-01:** Clicking "Send Voice Note" triggers S3 upload
- [ ] **S3-02:** Get signed URL from backend: POST `/api/v2/voice-notes/get-upload-url`
- [ ] **S3-03:** Upload audio blob directly to S3 using signed URL (not through backend)
- [ ] **S3-04:** Upload progress bar displays: "████████████ 75%"
- [ ] **S3-05:** Upload completes within 5 seconds for 120-second recording (~200 KB)
- [ ] **S3-06:** On success: Create voice note record in database with S3 CDN URL
- [ ] **S3-07:** Success message: "✅ Voice note sent successfully!"
- [ ] **S3-08:** On error: Error message with retry button

### 2.5. Audio Playback

- [ ] **PLAY-01:** Audio player component displays for received voice notes
- [ ] **PLAY-02:** Player shows: sender name, duration, play/pause button, progress bar
- [ ] **PLAY-03:** Play button plays audio from S3 CDN URL
- [ ] **PLAY-04:** Pause button pauses playback
- [ ] **PLAY-05:** Progress bar updates during playback
- [ ] **PLAY-06:** Progress bar draggable to seek
- [ ] **PLAY-07:** Skip buttons: -10s backward, +10s forward
- [ ] **PLAY-08:** Speed control dropdown: 1x, 1.5x, 2x playback speed
- [ ] **PLAY-09:** More options (⋮): Download Audio, Report Problem, Delete Voice Note

### 2.6. Error Handling

- [ ] **ERR-01:** Microphone permission denied: "Microphone access denied. Please allow microphone access in browser settings."
- [ ] **ERR-02:** Microphone not found: "No microphone detected. Please connect a microphone."
- [ ] **ERR-03:** Recording fails mid-recording: "Recording error. Please try again."
- [ ] **ERR-04:** Upload fails (network error): "Failed to send voice note. Check your connection and try again." + [Retry] button
- [ ] **ERR-05:** Upload fails (S3 error): "Server error. Please try again later."

### 2.7. Cross-Browser & Device Support

- [ ] **COMPAT-01:** Works in Chrome, Firefox, Edge, Safari (desktop)
- [ ] **COMPAT-02:** Works on iOS Safari (mobile)
- [ ] **COMPAT-03:** Works on Android Chrome (mobile)
- [ ] **COMPAT-04:** MediaRecorder API polyfill for unsupported browsers
- [ ] **COMPAT-05:** Fallback message for browsers without MediaRecorder: "Voice recording not supported in this browser. Please use Chrome, Firefox, or Safari."

### 2.8. Performance & Accessibility

- [ ] **PERF-01:** Recording starts within 300ms of press
- [ ] **PERF-02:** Waveform renders at 60 FPS (no lag)
- [ ] **PERF-03:** Preview playback starts within 500ms
- [ ] **PERF-04:** S3 upload completes within 5 seconds for 120s recording
- [ ] **ACC-01:** Keyboard navigation: Tab to record button, Space to toggle recording
- [ ] **ACC-02:** Screen reader announces: "Recording voice note", "Playback started", "Playback paused"
- [ ] **ACC-03:** Touch interface: press-and-hold, swipe to cancel

---

## 3. Task Breakdown

### Phase 1: Voice Recorder Component (3 hours)

**Task 1.1: Create VoiceRecorder.jsx component (1 hour)**
- Component structure: recording button, waveform canvas, preview player
- State management: `recordingState` (idle, recording, recorded, sending, success, error), `audioBlob`, `duration`
- Press-and-hold logic:
  ```javascript
  onMouseDown / onTouchStart: startRecording()
  onMouseUp / onTouchEnd: stopRecording()
  ```
- MediaRecorder API setup:
  ```javascript
  navigator.mediaDevices.getUserMedia({ audio: true })
  const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
  ```
- File: `frontend/src/components/common/VoiceRecorder.jsx`

**Task 1.2: Implement waveform visualization (1 hour)**
- Canvas element: 600px × 80px
- AudioContext API for frequency analysis:
  ```javascript
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  ```
- Animation loop: `requestAnimationFrame` to update waveform
- Draw 40 bars based on frequency amplitude
- File: `frontend/src/components/common/WaveformVisualizer.jsx`

**Task 1.3: Implement recording logic & timer (1 hour)**
- Start recording: `mediaRecorder.start()`
- Timer: `setInterval` to increment duration every 100ms
- Max duration: Stop recording at 120 seconds
- Stop recording: `mediaRecorder.stop()`, store audio blob
- Swipe to cancel (mobile): Track touch X position, cancel if `deltaX < -100px`
- File: `frontend/src/components/common/VoiceRecorder.jsx`

### Phase 2: Audio Preview & Playback (2 hours)

**Task 2.1: Create AudioPlayer.jsx component (1 hour)**
- Component: `AudioPlayer.jsx`
- Props: `audioUrl`, `senderName`, `duration`, `onDelete?`
- HTML5 Audio element with custom controls:
  ```javascript
  const audioRef = useRef(new Audio(audioUrl));
  ```
- Play/pause toggle
- Progress bar: update on `timeupdate` event, draggable seek
- Skip buttons: -10s, +10s (`audioRef.current.currentTime += 10`)
- Speed control: 1x, 1.5x, 2x (`audioRef.current.playbackRate = 1.5`)
- File: `frontend/src/components/common/AudioPlayer.jsx`

**Task 2.2: Implement preview player (30 min)**
- Preview player shows after recording stops
- Display: duration, play button, progress bar
- Delete button: clears blob, returns to idle state
- Re-record button: clears blob, starts new recording
- "Send Voice Note" button: triggers S3 upload
- File: `frontend/src/components/common/VoiceRecorder.jsx`

**Task 2.3: Add more options menu (30 min)**
- Dropdown menu (⋮): Download Audio, Report Problem, Delete Voice Note
- Download: Create blob URL, trigger download
- Report Problem: Open modal with form
- Delete: Confirm modal, then delete from S3 + database
- File: `frontend/src/components/common/AudioPlayer.jsx`

### Phase 3: S3 Upload Logic (1.5 hours)

**Task 3.1: Implement get-upload-url endpoint (30 min)**
- POST `/api/v2/voice-notes/get-upload-url`
- Generate unique filename: `voice-${userId}-${timestamp}.webm`
- Generate S3 signed URL (PUT object, expires in 5 minutes)
- Return: `{ uploadUrl: 'https://s3...', cdnUrl: 'https://cdn...' }`
- File: `backend/controllers/voiceNoteController.js`

**Task 3.2: Implement client-side S3 upload (45 min)**
- Fetch signed URL from backend
- Upload blob directly to S3 using `fetch` PUT request:
  ```javascript
  await fetch(uploadUrl, {
    method: 'PUT',
    body: audioBlob,
    headers: { 'Content-Type': 'audio/webm' }
  });
  ```
- Upload progress tracking (using `XMLHttpRequest` for progress events)
- Display progress bar: "████████ 75%"
- File: `frontend/src/components/common/VoiceRecorder.jsx`

**Task 3.3: Create voice note database record (15 min)**
- After S3 upload success, POST `/api/v2/voice-notes`
- Request body: `{ cdnUrl, duration, senderId, recipientId, contextType, contextId }`
- Create VoiceNote document in MongoDB
- Return: `{ voiceNoteId, cdnUrl }`
- File: `backend/controllers/voiceNoteController.js`

### Phase 4: Error Handling & Permissions (1 hour)

**Task 4.1: Implement microphone permission handling (30 min)**
- Request permission: `navigator.mediaDevices.getUserMedia({ audio: true })`
- Handle permission denied: Show error message with browser settings link
- Handle no microphone: Show error message
- Handle permission granted: Start recording
- File: `frontend/src/components/common/VoiceRecorder.jsx`

**Task 4.2: Implement upload error handling (30 min)**
- Network error: Show error message + [Retry] button
- S3 error: Show error message
- Retry logic: Re-fetch signed URL, retry upload (max 3 retries)
- File: `frontend/src/components/common/VoiceRecorder.jsx`

### Phase 5: Cross-Browser Compatibility (45 min)

**Task 5.1: Add MediaRecorder polyfill (20 min)**
- Install polyfill: `npm install audio-recorder-polyfill`
- Import and use polyfill for Safari iOS (no native MediaRecorder)
- File: `frontend/src/components/common/VoiceRecorder.jsx`

**Task 5.2: Test across browsers & devices (25 min)**
- Test Chrome, Firefox, Edge, Safari (desktop)
- Test iOS Safari, Android Chrome (mobile)
- Verify waveform, playback, upload work correctly
- File: Manual testing

### Phase 6: Integration & Testing (45 min)

**Task 6.1: Integrate VoiceRecorder across app (30 min)**
- Amma query response: Add VoiceRecorder component
- Coach feedback: Add VoiceRecorder component
- Student Life Skills: Add VoiceRecorder component
- Admin broadcast: Add VoiceRecorder component
- File: Update relevant components

**Task 6.2: Create reusable examples (15 min)**
- Example usage documentation in README
- Code snippets for common use cases
- File: `docs/voice-communication-usage.md`

---

## 4. API Endpoints

### 4.1. Get S3 Upload URL

**Endpoint:** `POST /api/v2/voice-notes/get-upload-url`

**Request Body:**
```json
{
  "userId": "user123",
  "contextType": "query_response",
  "contextId": "query456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "uploadUrl": "https://s3.amazonaws.com/isf-voice-notes/voice-user123-1729787400.webm?signature=...",
    "cdnUrl": "https://cdn.isf.com/voice-notes/voice-user123-1729787400.webm",
    "expiresIn": 300
  }
}
```

---

### 4.2. Create Voice Note Record

**Endpoint:** `POST /api/v2/voice-notes`

**Request Body:**
```json
{
  "cdnUrl": "https://cdn.isf.com/voice-notes/voice-user123-1729787400.webm",
  "duration": 8.5,
  "senderId": "user123",
  "recipientId": "user456",
  "contextType": "query_response",
  "contextId": "query789"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "voiceNoteId": "voice123",
    "cdnUrl": "https://cdn.isf.com/voice-notes/voice-user123-1729787400.webm",
    "duration": 8.5,
    "createdAt": "2025-10-24T15:55:53Z"
  }
}
```

---

## 5. MongoDB Schema

### 5.1. VoiceNotes Collection

```javascript
const VoiceNoteSchema = new mongoose.Schema({
  cdnUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    // Duration in seconds (e.g., 8.5)
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  contextType: {
    type: String,
    enum: ['query_response', 'coach_feedback', 'life_skills_response', 'broadcast', 'other']
  },
  contextId: {
    type: mongoose.Schema.Types.ObjectId,
    // Reference to Query, Submission, Broadcast, etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('VoiceNote', VoiceNoteSchema);
```

---

## 6. File Paths

```
frontend/src/components/common/
├── VoiceRecorder.jsx                # Main voice recorder component
├── WaveformVisualizer.jsx           # Waveform visualization (canvas)
└── AudioPlayer.jsx                  # Audio playback component

backend/controllers/
└── voiceNoteController.js           # Voice note API endpoints

backend/models/
└── VoiceNote.js                     # VoiceNote schema

backend/routes/v2/
└── voiceNotes.js                    # Voice note routes

docs/
└── voice-communication-usage.md     # Usage documentation
```

---

## 7. Definition of Done

- [ ] VoiceRecorder component functional with press-and-hold interface
- [ ] Waveform visualization animates in real-time
- [ ] Recording stops at 120 seconds max duration
- [ ] Audio preview player works (play, pause, seek, delete, re-record)
- [ ] S3 upload with progress bar functional
- [ ] AudioPlayer component plays voice notes with controls (play, pause, skip, speed)
- [ ] Microphone permission handling works
- [ ] Upload error handling with retry functional
- [ ] Cross-browser compatible (Chrome, Firefox, Edge, Safari)
- [ ] Works on iOS Safari and Android Chrome
- [ ] Integrated across all roles (Amma, Coach, Student, Admin)
- [ ] Code peer-reviewed
- [ ] Merged to `develop`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:55:53
- **Status:** Draft - Ready for Development

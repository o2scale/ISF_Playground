# E2E Test Scenarios - Epic 01 Story 05: Life Skills Voice Responses

**Story ID:** SPRINT2-EPIC01-STORY05
**Story Title:** Life Skills Voice Responses
**Test Type:** End-to-End (E2E) Functional Testing
**Created:** 2025-10-28
**Last Updated:** 2025-10-28
**Total Test Cases:** 68
**Total Acceptance Criteria:** 41

---

## Test Environment

**Prerequisites:**
- Student account authenticated (userId from localStorage)
- Backend server running on `http://localhost:5001`
- Frontend server running on `http://localhost:3000`
- Browser: Chrome/Edge (latest) with microphone access
- Resolution: 1366x768 (desktop), 768px (tablet), 375px (mobile)

**Test Data:**
- Student ID: Retrieved from `localStorage.getItem('userId')`
- Course ID: `life-skills-course`
- Voice Task IDs: `voice_task_1`, `voice_task_2`, `voice_task_3`
- Quiz ID: `life-skills-quiz-1`
- Mock audio URLs: S3 bucket (audioUrl may be null - fallback to text display)

---

## Section 1: Voice Recording - Audio Question Playback

### TC 1.1: Audio Question Autoplays on Task Load
**Priority:** P0 (Critical)
**AC Mapping:** VR-01
**Steps:**
1. Navigate to `/student/life-skills/voice/voice_task_1`
2. Observe page load behavior

**Expected Result:**
- Page loads with audio question card visible
- If `audioUrl` exists: Audio autoplays immediately (HTML5 audio with `autoplay` attribute)
- If `audioUrl` is null: Question text displays with "Audio not available" message
- Submit button is disabled initially

**Evidence Required:** Screenshot showing audio player with autoplay indicator

---

### TC 1.2: Submit Button Disabled Until Audio Playback Completes
**Priority:** P0 (Critical)
**AC Mapping:** VR-02
**Steps:**
1. Load voice task page
2. While audio is playing, attempt to click Submit button
3. Wait for audio to finish (`audio.onended` event)
4. Check Submit button state

**Expected Result:**
- Submit button is disabled (gray, not clickable) while audio plays
- Tooltip shows "Please listen to the full question first!" on hover during audio
- After audio ends, Submit button remains disabled (requires recording first)
- No error occurs when clicking disabled button

**Evidence Required:** Screenshot showing disabled Submit button during audio playback

---

### TC 1.3: Audio Player Controls Work Correctly
**Priority:** P1 (High)
**AC Mapping:** VR-02
**Steps:**
1. Load voice task page with audio
2. Click Play/Pause button manually
3. Adjust volume slider
4. Seek to different time position

**Expected Result:**
- Play button toggles to Pause when clicked
- Volume slider adjusts audio level (0-100%)
- Progress bar shows current time / total duration (e.g., "00:08 / 00:15")
- Seeking works correctly (audio jumps to selected position)

**Evidence Required:** Screenshot showing audio controls in use

---

## Section 2: Voice Recording - Press-and-Hold Recording

### TC 2.1: Record Button Displays Correct Idle State
**Priority:** P0 (Critical)
**AC Mapping:** VR-03
**Steps:**
1. Load voice task page
2. Observe record button appearance

**Expected Result:**
- Button displays "🎤 Hold to Record" text
- Green border (3px solid, border-green-500)
- Light green background (bg-green-100)
- Button size: 120x120px (desktop), 80x80px (mobile)
- Instruction text below: "Great! Let me hear your thoughts on this question. Hold the button below to record your answer."

**Evidence Required:** Screenshot of idle state record button

---

### TC 2.2: Pressing and Holding Button Starts Recording (Desktop - Mouse)
**Priority:** P0 (Critical)
**AC Mapping:** VR-04
**Steps:**
1. Position mouse over record button
2. Press and hold left mouse button (`onMouseDown` event)
3. Keep mouse button pressed for 5 seconds
4. Observe visual changes

**Expected Result:**
- Button immediately changes to red border (4px solid, border-red-500, pulsing animation)
- Background changes to light red (bg-red-100)
- Text changes to "🔴 Recording..."
- Status message updates to "Recording... Release when done!"
- Microphone permission prompt appears (if first time)
- Recording starts within 500ms of button press

**Evidence Required:** Screenshot showing recording state (red border, "Recording..." text)

---

### TC 2.3: Pressing and Holding Button Starts Recording (Mobile - Touch)
**Priority:** P0 (Critical)
**AC Mapping:** VR-04
**Steps:**
1. On mobile device, tap and hold record button (`onTouchStart` event)
2. Keep finger pressed for 5 seconds
3. Observe visual changes

**Expected Result:**
- Same behavior as TC 2.2
- Touch feedback works correctly (no delay, no accidental double-taps)
- Button remains in recording state while finger is pressed
- Recording continues even if finger slides slightly off button (tolerance: 20px)

**Evidence Required:** Mobile screenshot showing recording state

---

### TC 2.4: Waveform Visualization Displays Real-Time Audio Levels
**Priority:** P0 (Critical)
**AC Mapping:** VR-05
**Steps:**
1. Start recording (press and hold button)
2. Speak into microphone at varying volumes (quiet → loud → quiet)
3. Observe waveform visualization

**Expected Result:**
- Waveform appears below record button when recording starts
- Canvas element displays animated bars (▁▃▅▇█▇▅▃▁ pattern)
- Bar heights change in real-time based on audio input levels
- Waveform updates at 30 FPS minimum (smooth animation, no lag)
- Colors: Red bars during recording (matching button state)

**Evidence Required:** Screenshot showing waveform with varied bar heights during recording

---

### TC 2.5: Timer Shows Elapsed Time During Recording
**Priority:** P0 (Critical)
**AC Mapping:** VR-06
**Steps:**
1. Start recording
2. Observe timer display for 10 seconds
3. Note timer format and updates

**Expected Result:**
- Timer displays "00:00 / 60:00" format (MM:SS / MM:SS)
- Elapsed time increments every second (00:01, 00:02, 00:03, etc.)
- Total duration shows max limit (60:00)
- Timer is visible and readable (font size 16px minimum)

**Evidence Required:** Screenshot showing timer at ~10 seconds ("00:10 / 60:00")

---

### TC 2.6: Recording Auto-Stops at 60-Second Limit
**Priority:** P0 (Critical)
**AC Mapping:** VR-07
**Steps:**
1. Start recording and hold button continuously
2. Wait for 60 seconds (or use automated test to simulate)
3. Observe behavior at 60-second mark

**Expected Result:**
- Recording automatically stops at exactly 60 seconds
- Visual feedback: Border changes from red to blue (recorded state)
- Audio feedback: Optional beep or sound (if implemented)
- Toast notification: "Recording stopped at 60 seconds. Great work!"
- User can release button (recording has already stopped)
- Timer shows "00:60 / 00:60" or "01:00 / 01:00"

**Evidence Required:** Screenshot showing toast notification + recorded state after auto-stop

---

### TC 2.7: Releasing Button Stops Recording and Transitions to Recorded State
**Priority:** P0 (Critical)
**AC Mapping:** VR-08
**Steps:**
1. Start recording
2. Record for 10-15 seconds
3. Release mouse button / lift finger (`onMouseUp` / `onTouchEnd`)
4. Observe state transition

**Expected Result:**
- Recording stops immediately upon button release
- Button changes to blue border (3px solid, border-blue-500)
- Background changes to light blue (bg-blue-100)
- Text changes to "✅ Hold to Record" (checkmark indicates recorded)
- Status message: "Great! Your answer has been recorded. Listen to it before submitting."
- Waveform becomes static (no longer animating)
- Timer shows final duration (e.g., "00:12 / 00:12")

**Evidence Required:** Screenshot of recorded state (blue border, static waveform)

---

### TC 2.8: Microphone Permission Denied Shows Error
**Priority:** P0 (Critical)
**AC Mapping:** VR-04, Error Handling
**Steps:**
1. In browser settings, block microphone access for the site
2. Load voice task page
3. Attempt to start recording

**Expected Result:**
- Browser microphone permission prompt does NOT appear (already denied)
- Error message displays: "We need microphone access to record your answer. Please allow microphone permissions in your browser settings."
- Record button becomes disabled (gray border, bg-gray-100)
- Retry/Settings button appears to guide user to fix permissions
- No recording starts

**Evidence Required:** Screenshot showing microphone denied error message

---

## Section 3: Voice Recording - Playback & Re-Record

### TC 3.1: Play Button Plays Recorded Audio
**Priority:** P0 (Critical)
**AC Mapping:** VR-09
**Steps:**
1. Record a voice note (10-15 seconds)
2. After recording completes, click Play button
3. Observe playback behavior

**Expected Result:**
- Play button is enabled in recorded state
- Clicking Play starts audio playback
- Button border changes to yellow (3px solid, border-yellow-500) during playback
- Background changes to light yellow (bg-yellow-100)
- Status message: "Playing your recording..."
- Waveform shows progress animation (blue fill moves left to right)
- Play button changes to Pause button (⏸️ icon)

**Evidence Required:** Screenshot showing playback state (yellow border, progress animation)

---

### TC 3.2: Waveform Progress Animation During Playback
**Priority:** P1 (High)
**AC Mapping:** VR-09
**Steps:**
1. Record a voice note
2. Click Play
3. Observe waveform during playback

**Expected Result:**
- Waveform displays static bars representing recorded audio
- Blue fill overlays waveform from left to right as audio plays
- Progress indicator moves in sync with audio (timeupdate event)
- Timer shows current time / total time (e.g., "00:05 / 00:12")
- Animation is smooth (no jumps or lag)

**Evidence Required:** Screenshot showing waveform mid-playback with partial blue fill

---

### TC 3.3: Pause Button Stops Playback
**Priority:** P0 (Critical)
**AC Mapping:** VR-10
**Steps:**
1. Start playing recorded audio
2. Click Pause button mid-playback
3. Observe behavior

**Expected Result:**
- Audio playback pauses at current position
- Button changes from Pause (⏸️) back to Play (▶️)
- Border returns to blue (recorded state)
- Status message returns to "Great! Your answer has been recorded."
- Timer shows paused position (e.g., "00:08 / 00:12")
- Clicking Play again resumes from paused position

**Evidence Required:** Screenshot showing paused state with partial progress

---

### TC 3.4: Re-Record Button Clears Recording and Resets to Idle
**Priority:** P0 (Critical)
**AC Mapping:** VR-11
**Steps:**
1. Record a voice note
2. Click Re-Record button (🔄 icon)
3. Observe state reset

**Expected Result:**
- Confirmation modal appears: "Are you sure? This will delete your current recording."
- Two buttons: "Cancel" (gray) and "Yes, Re-Record" (orange)
- If "Yes, Re-Record" clicked:
  - Recording blob is cleared from state
  - Button returns to green idle state ("🎤 Hold to Record")
  - Waveform disappears
  - Timer resets to "00:00 / 60:00"
  - Play/Submit buttons become disabled
  - Status message: "Great! Let me hear your thoughts on this question."
- If "Cancel" clicked: Modal closes, recording remains intact

**Evidence Required:** Screenshot showing re-record confirmation modal

---

### TC 3.5: Playback Ends and Returns to Recorded State
**Priority:** P1 (High)
**AC Mapping:** VR-09, VR-10
**Steps:**
1. Record a voice note
2. Click Play and let audio play to the end
3. Observe behavior when audio ends

**Expected Result:**
- Audio plays completely to the end
- When audio ends (`audio.onended` event):
  - Border returns to blue (recorded state)
  - Play button reappears (replaces Pause)
  - Timer resets to start (e.g., "00:00 / 00:12")
  - Status message: "Great! Your answer has been recorded."
- Clicking Play again replays from beginning

**Evidence Required:** Screenshot showing state after playback ends

---

## Section 4: Voice Recording - File Upload & Submission

### TC 4.1: Submit Button Enabled Only After Recording Exists
**Priority:** P0 (Critical)
**AC Mapping:** VR-12
**Steps:**
1. Load voice task page (idle state)
2. Check Submit button state
3. Record a voice note
4. Check Submit button state again

**Expected Result:**
- Initial state: Submit button disabled (gray, bg-gray-300, cursor-not-allowed)
- Tooltip on hover: "Record your answer first!"
- After recording: Submit button enabled (green, bg-green-600, cursor-pointer)
- Button text: "✅ Submit Answer"

**Evidence Required:** Two screenshots - Submit disabled (idle) and Submit enabled (after recording)

---

### TC 4.2: Clicking Submit Uploads Voice File with Progress Bar
**Priority:** P0 (Critical)
**AC Mapping:** VR-12
**Steps:**
1. Record a voice note (~10 seconds)
2. Click Submit button
3. Observe upload process

**Expected Result:**
- Submit button changes to "Submitting..." with spinner icon
- All buttons become disabled during upload (gray, not clickable)
- Progress bar appears showing upload progress (0-100%)
- Progress updates incrementally (e.g., 15%, 35%, 67%, 100%)
- Status message: "Submitting your answer... Please wait."
- Record button border turns gray (bg-gray-100)
- POST request sent to `/api/v2/lms/student/:studentId/courses/life-skills/voice-submissions`
- FormData includes: file (audio/webm blob), taskId, duration, fileSize, recordedAt timestamp

**Evidence Required:** Screenshot showing progress bar at ~65%

---

### TC 4.3: Success Toast Notification After Upload
**Priority:** P0 (Critical)
**AC Mapping:** VR-13
**Steps:**
1. Complete voice note recording and submission
2. Wait for server response (200 OK)
3. Observe success feedback

**Expected Result:**
- Success toast notification appears (green background, white text)
- Message: "Great work! +20 coins earned!"
- Coin icon (💰) appears in toast
- Toast auto-dismisses after 5 seconds
- Upload progress bar disappears

**Evidence Required:** Screenshot showing success toast notification

---

### TC 4.4: Coin Balance Updates in Title Bar
**Priority:** P0 (Critical)
**AC Mapping:** VR-14
**Steps:**
1. Note current coin balance in Title Bar before submission (e.g., 1,250)
2. Submit voice recording
3. Wait for success response
4. Observe Title Bar coin balance

**Expected Result:**
- Coin balance increments by 20 coins within 2 seconds
- Old balance: 1,250 → New balance: 1,270
- Coin animation (optional): Coin icon flies from submission area to Title Bar
- Number animates/increments smoothly (not instant jump)
- Update happens via API response or WebSocket/context update

**Evidence Required:** Two screenshots - before (1,250) and after (1,270) submission

---

### TC 4.5: Auto-Navigate After Successful Submission
**Priority:** P1 (High)
**AC Mapping:** VR-13
**Steps:**
1. Submit voice recording successfully
2. Wait 3-5 seconds after success toast
3. Observe navigation

**Expected Result:**
- After success toast (3-second delay), page automatically redirects
- Redirect destination: `/student/dashboard` or next voice task
- Navigation is smooth (no flash or error)
- If multiple tasks exist, navigates to next task automatically

**Evidence Required:** Screenshot showing navigation to dashboard after submission

---

## Section 5: MCQ Quiz - Question Display & Audio Enforcement

### TC 5.1: Quiz Displays Progress Indicator
**Priority:** P0 (Critical)
**AC Mapping:** MCQ-01
**Steps:**
1. Navigate to `/student/life-skills/quiz/life-skills-quiz-1`
2. Observe quiz header

**Expected Result:**
- Progress text displays "Question 1 of 10"
- Progress bar shows 10% filled (1/10 questions)
- Progress bar: Full width, height 32px, green fill (bg-green-500)
- Each question updates progress (Question 2 = 20%, Question 3 = 30%, etc.)

**Evidence Required:** Screenshot showing "Question 1 of 10" with 10% progress bar

---

### TC 5.2: Audio Question Autoplays on Question Load
**Priority:** P0 (Critical)
**AC Mapping:** MCQ-02
**Steps:**
1. Load quiz page (Question 1)
2. Observe audio behavior

**Expected Result:**
- Audio question autoplays immediately if `audioUrl` exists
- Audio player displays with question text (e.g., "When should you wash your hands?")
- If audioUrl is null: Text question displays with "Audio not available" message
- Play/Pause button available for manual control

**Evidence Required:** Screenshot showing audio playing (autoplay indicator)

---

### TC 5.3: Submit Button Disabled Until Audio Completes
**Priority:** P0 (Critical)
**AC Mapping:** MCQ-03
**Steps:**
1. Load quiz question with audio
2. While audio is playing, attempt to click "Submit Answer"
3. Wait for audio to finish
4. Check button state

**Expected Result:**
- Initial state: Submit button disabled (gray, bg-gray-300)
- Tooltip: "Listen to the full question first!"
- Audio plays to completion (`audio.onended` event fires)
- After audio ends AND option selected: Submit button becomes enabled (green)
- If no option selected: Submit remains disabled even after audio

**Evidence Required:** Screenshot showing disabled Submit during audio playback

---

### TC 5.4: Radio Buttons Selectable During Audio Playback
**Priority:** P0 (Critical)
**AC Mapping:** MCQ-04
**Steps:**
1. Load quiz question
2. While audio is still playing, click on radio option A
3. Click on radio option B
4. Observe selection behavior

**Expected Result:**
- Radio buttons are NOT disabled during audio (fully interactive)
- Clicking option A selects it (filled radio circle)
- Clicking option B deselects A and selects B (only one selected at a time)
- Selection is visual feedback (blue border around selected option)
- Submit button remains disabled until audio finishes (even if option selected)

**Evidence Required:** Screenshot showing selected radio option while audio is still playing

---

### TC 5.5: Exactly One Radio Option Selected Per Question
**Priority:** P0 (Critical)
**AC Mapping:** MCQ-05
**Steps:**
1. Load quiz question
2. Click option A (should select)
3. Click option B (should deselect A and select B)
4. Click option B again (should remain selected)
5. Attempt to select multiple options via keyboard (Space key)

**Expected Result:**
- Only one radio option can be selected at a time (standard HTML radio behavior)
- Clicking a new option deselects previous selection
- Clicking same option twice does NOT deselect it (radio remains selected)
- Keyboard navigation (Tab + Space) follows same single-selection rule
- Visual feedback: Selected option has blue border (border-blue-500, 2px)

**Evidence Required:** Screenshot showing single radio option selected (blue border)

---

### TC 5.6: Submit Button Disabled If No Option Selected
**Priority:** P0 (Critical)
**AC Mapping:** MCQ-06
**Steps:**
1. Load quiz question
2. Wait for audio to finish
3. Do NOT select any radio option
4. Attempt to click Submit button

**Expected Result:**
- Submit button remains disabled (gray) if no option selected
- Tooltip: "Please select an answer!"
- Clicking Submit does nothing (no submission, no navigation)
- After selecting an option, Submit becomes enabled immediately

**Evidence Required:** Screenshot showing Submit disabled after audio ends (no option selected)

---

## Section 6: MCQ Quiz - Submission & Navigation

### TC 6.1: Submitting Answer Saves Locally Without Feedback
**Priority:** P0 (Critical)
**AC Mapping:** MCQ-07
**Steps:**
1. Select option B on Question 1
2. Click "Submit Answer"
3. Observe visual feedback

**Expected Result:**
- Answer saves to local component state (array of answers)
- NO green checkmark or red X shown (delayed feedback)
- NO toast notification like "Correct!" or "Wrong"
- Radio option does NOT change color (remains blue border)
- Page immediately transitions to next question (loading Question 2)

**Evidence Required:** Screenshot showing no correctness feedback after submit

---

### TC 6.2: Next Question Loads Automatically After Submission
**Priority:** P0 (Critical)
**AC Mapping:** MCQ-08
**Steps:**
1. On Question 1, select an option and click Submit
2. Observe page behavior

**Expected Result:**
- Question 2 loads automatically (no manual navigation needed)
- Progress updates to "Question 2 of 10" with 20% progress bar
- Audio for Question 2 autoplays
- Radio buttons reset (no option selected)
- Submit button disabled again (waiting for audio + selection)

**Evidence Required:** Screenshot showing Question 2 loaded after submitting Question 1

---

### TC 6.3: Previous Button Disabled on First Question
**Priority:** P1 (High)
**AC Mapping:** MCQ-08
**Steps:**
1. Load Question 1
2. Check Previous button state

**Expected Result:**
- Previous button is disabled (gray, cursor-not-allowed)
- Button text: "← Previous" (grayed out)
- Clicking button does nothing

**Evidence Required:** Screenshot showing disabled Previous button on Q1

---

### TC 6.4: Previous Button Navigates to Prior Question
**Priority:** P1 (High)
**AC Mapping:** MCQ-08
**Steps:**
1. Complete Question 1, navigate to Question 2
2. On Question 2, click Previous button

**Expected Result:**
- Returns to Question 1
- Previous answer (selected option) is pre-filled
- Submit button is enabled (can change answer and re-submit)
- Progress bar returns to 10%

**Evidence Required:** Screenshot showing Question 1 with previously selected answer

---

### TC 6.5: Last Question Shows "Finish Quiz" Button
**Priority:** P0 (Critical)
**AC Mapping:** MCQ-09
**Steps:**
1. Complete Questions 1-9
2. Navigate to Question 10
3. Select an option and observe Submit button

**Expected Result:**
- Submit button text changes to "Finish Quiz" instead of "Submit Answer"
- Button color: Green (bg-green-600)
- After clicking "Finish Quiz", quiz grading process begins (spinner/loading)
- No automatic navigation to Question 11 (quiz ends)

**Evidence Required:** Screenshot showing "Finish Quiz" button on Question 10

---

### TC 6.6: Results Page Displays Only After All Questions Answered
**Priority:** P0 (Critical)
**AC Mapping:** MCQ-10
**Steps:**
1. Answer Questions 1-9 (skip Question 5)
2. Click Next repeatedly
3. Attempt to finish quiz

**Expected Result:**
- If any question unanswered, "Finish Quiz" button remains disabled OR
- Modal/toast appears: "Please answer all questions before finishing!"
- Cannot view results until all 10 questions have selected answers
- Navigating back to unanswered question highlights it (e.g., red border or warning)

**Evidence Required:** Screenshot showing error message when attempting to finish incomplete quiz

---

## Section 7: MCQ Quiz - Results & Grading

### TC 7.1: Results Page Shows Overall Score
**Priority:** P0 (Critical)
**AC Mapping:** QR-01
**Steps:**
1. Complete all 10 quiz questions
2. Click "Finish Quiz"
3. Wait for grading (1-2 seconds)
4. Observe results page

**Expected Result:**
- Results page displays large score circle (180px diameter)
- Score percentage shown prominently (e.g., "85%" in 48px font)
- Score text color: Green if ≥80%, Yellow if 50-79%, Red if <50%
- Message below score: "Great job!" or "Good effort!" or "Keep practicing!"
- Border around circle: 4px solid, color matches score tier

**Evidence Required:** Screenshot showing score circle with "85%" and "Great job!" message

---

### TC 7.2: Per-Question Breakdown Displays Correct/Incorrect
**Priority:** P0 (Critical)
**AC Mapping:** QR-02
**Steps:**
1. View results page
2. Scroll down to "Results Breakdown" section
3. Observe per-question details

**Expected Result:**
- 10 rows displayed (one per question)
- Each row shows:
  - Question number (e.g., "Question 1")
  - Checkmark (✅) if correct, X (❌) if incorrect
  - Coins earned: "+12 coins" if correct, "0 coins" if incorrect
  - Optionally: Correct answer shown if user got it wrong
- Example row: "✅ Question 2: Correct (+12 coins)"
- Example wrong row: "❌ Question 3: Incorrect (0 coins) - Correct answer was C"

**Evidence Required:** Screenshot showing breakdown with mix of ✅ and ❌

---

### TC 7.3: Total Coins Earned Displayed
**Priority:** P0 (Critical)
**AC Mapping:** QR-03
**Steps:**
1. View results page
2. Locate total coins earned section

**Expected Result:**
- Total coins displayed prominently below score circle
- Format: "+120 coins 💰" (large font, green color)
- Calculation: (8 correct × 12 coins) + 24 bonus = 120 total
- Breakdown shown:
  - "Correct Answers: 8/10 (80%)"
  - "Coins from Correct Answers: +96 coins"
  - "Bonus Coins (80%+ score): +24 coins"
  - "Total Coins Earned: +120 coins"

**Evidence Required:** Screenshot showing total coins with breakdown

---

### TC 7.4: Bonus Coins Awarded for 80%+ Score
**Priority:** P0 (Critical)
**AC Mapping:** QR-04
**Steps:**
1. Complete quiz with exactly 8/10 correct (80%)
2. View results page
3. Check bonus coins section

**Expected Result:**
- If score ≥ 80%: "+24 bonus coins" shown with star icon ⭐
- If score < 80%: No bonus coins section displayed
- Bonus calculation: Fixed +24 coins for exceeding threshold
- Total includes bonus (e.g., 96 + 24 = 120)

**Evidence Required:** Screenshot showing "+24 bonus coins (for 80%+ score)"

---

### TC 7.5: Coin Animation Flies to Title Bar
**Priority:** P1 (High)
**AC Mapping:** QR-05
**Steps:**
1. View results page
2. Observe coin animation on page load

**Expected Result:**
- Coin icon (💰) animates from results page center to Title Bar coin balance
- Animation duration: 1-2 seconds
- Animation path: Curved arc (Bezier curve) from bottom-center to top-right
- Optional: Sound effect plays during animation
- After animation completes, Title Bar coin balance updates

**Evidence Required:** Video/GIF showing coin flying animation (or screenshot if animation is too fast)

---

### TC 7.6: Title Bar Coin Balance Updates with Quiz Coins
**Priority:** P0 (Critical)
**AC Mapping:** QR-05
**Steps:**
1. Note coin balance before quiz (e.g., 1,250 coins)
2. Complete quiz earning 120 coins
3. View results page
4. Check Title Bar coin balance

**Expected Result:**
- Before quiz: 1,250 coins
- After quiz: 1,370 coins (+120)
- Update happens within 2 seconds of viewing results
- Number animates/increments smoothly (if implemented)

**Evidence Required:** Two screenshots showing coin balance before (1,250) and after (1,370)

---

### TC 7.7: Time Taken Displayed in Results
**Priority:** P1 (High)
**AC Mapping:** QR-06
**Steps:**
1. Complete quiz (track start time to end time)
2. View results page
3. Check time taken display

**Expected Result:**
- Time taken shown in results breakdown
- Format: "Time Taken: 6 minutes 30 seconds"
- Accurate calculation from Question 1 start to Question 10 finish
- If time < 1 minute: "Time Taken: 45 seconds"
- If time > 60 minutes: "Time Taken: 1 hour 5 minutes"

**Evidence Required:** Screenshot showing "Time Taken: 6 minutes 30 seconds"

---

### TC 7.8: Retry Quiz Button Resets and Returns to Question 1
**Priority:** P0 (Critical)
**AC Mapping:** QR-07
**Steps:**
1. View results page
2. Click "🔄 Retry Quiz" button
3. Observe behavior

**Expected Result:**
- Modal appears: "Are you sure? Your current score will be replaced."
- Two buttons: "Cancel" and "Yes, Retry"
- If "Yes, Retry" clicked:
  - All answers cleared (state reset)
  - Navigates to Question 1
  - Progress bar resets to 10%
  - Audio autoplays on Q1
- If "Cancel" clicked: Modal closes, stays on results page

**Evidence Required:** Screenshot showing retry confirmation modal

---

### TC 7.9: Back to Dashboard Button Navigates to Homepage
**Priority:** P0 (Critical)
**AC Mapping:** QR-08
**Steps:**
1. View results page
2. Click "🏠 Back to Dashboard" button

**Expected Result:**
- Navigates to `/student/dashboard`
- No confirmation modal (direct navigation)
- Quiz state is saved (results can be viewed later from dashboard)

**Evidence Required:** Screenshot showing student dashboard after clicking button

---

## Section 8: API Endpoint Testing

### TC 8.1: GET /api/v2/lms/student/:studentId/courses/life-skills/tasks
**Priority:** P0 (Critical)
**Steps:**
1. Execute curl command:
```bash
curl http://localhost:5001/api/v2/lms/student/{studentId}/courses/life-skills/tasks
```

**Expected Result:**
- Status Code: 200 OK
- Response includes array of voice tasks and quiz tasks
- Voice task structure:
  ```json
  {
    "id": "voice_task_1",
    "type": "voice",
    "title": "Hygiene Importance",
    "audioUrl": "https://...",
    "question": "Why is washing hands before eating important?",
    "maxRecordingDuration": 60,
    "coinsForSubmission": 20
  }
  ```

**Evidence Required:** Curl response showing tasks array

---

### TC 8.2: GET /api/v2/lms/student/:studentId/courses/life-skills/voice/:taskId
**Priority:** P0 (Critical)
**Steps:**
1. Execute curl:
```bash
curl http://localhost:5001/api/v2/lms/student/{studentId}/courses/life-skills/voice/voice_task_1
```

**Expected Result:**
- Status Code: 200 OK
- Response includes single voice task details
- Fields: id, type, title, audioUrl, question, duration, maxRecordingDuration, coinsForSubmission, instructions, category, difficulty

**Evidence Required:** Curl response showing voice task details

---

### TC 8.3: POST /api/v2/lms/student/:studentId/courses/life-skills/voice-submissions
**Priority:** P0 (Critical)
**Steps:**
1. Create test file: `test-audio.webm` (mock audio blob)
2. Execute curl:
```bash
curl -X POST http://localhost:5001/api/v2/lms/student/{studentId}/courses/life-skills/voice-submissions \
  -F "file=@test-audio.webm" \
  -F "taskId=voice_task_1" \
  -F "duration=15" \
  -F "fileSize=245678"
```

**Expected Result:**
- Status Code: 201 Created
- Response includes:
  ```json
  {
    "success": true,
    "submissionId": "sub123",
    "fileUrl": "https://s3.../voice_recording.webm",
    "coinsEarned": 20,
    "message": "Great work! Your answer has been submitted."
  }
  ```

**Evidence Required:** Curl response showing successful voice submission

---

### TC 8.4: GET /api/v2/lms/student/:studentId/courses/life-skills/quiz/:quizId
**Priority:** P0 (Critical)
**Steps:**
1. Execute curl:
```bash
curl http://localhost:5001/api/v2/lms/student/{studentId}/courses/life-skills/quiz/life-skills-quiz-1
```

**Expected Result:**
- Status Code: 200 OK
- Response includes quiz metadata + 10 questions
- Question structure:
  ```json
  {
    "id": "mcq_q1",
    "question": "When should you wash your hands?",
    "audioUrl": "https://...",
    "options": [
      {"id": "A", "text": "Only before breakfast"},
      {"id": "B", "text": "Before every meal and after using the bathroom"},
      {"id": "C", "text": "Only when they look dirty"},
      {"id": "D", "text": "Once a day is enough"}
    ]
  }
  ```
- **IMPORTANT:** `correctAnswer` field should NOT be included (prevents cheating)

**Evidence Required:** Curl response showing quiz questions WITHOUT correct answers

---

### TC 8.5: POST /api/v2/lms/student/:studentId/courses/life-skills/quiz-submissions
**Priority:** P0 (Critical)
**Steps:**
1. Execute curl with quiz answers:
```bash
curl -X POST http://localhost:5001/api/v2/lms/student/{studentId}/courses/life-skills/quiz-submissions \
  -H "Content-Type: application/json" \
  -d '{
    "quizId": "life-skills-quiz-1",
    "answers": [
      {"questionId": "mcq_q1", "selectedOption": "B"},
      {"questionId": "mcq_q2", "selectedOption": "B"},
      {"questionId": "mcq_q3", "selectedOption": "A"}
    ]
  }'
```

**Expected Result:**
- Status Code: 200 OK
- Response includes grading results:
  ```json
  {
    "success": true,
    "score": 85,
    "correctAnswers": 8,
    "totalQuestions": 10,
    "coinsEarned": 120,
    "bonusCoins": 24,
    "breakdown": [
      {"questionId": "mcq_q1", "correct": true, "coinsEarned": 12},
      {"questionId": "mcq_q2", "correct": false, "coinsEarned": 0}
    ]
  }
  ```

**Evidence Required:** Curl response showing auto-graded quiz results

---

### TC 8.6: GET /api/v2/lms/student/:studentId/courses/life-skills/submissions/history
**Priority:** P1 (High)
**Steps:**
1. Execute curl:
```bash
curl http://localhost:5001/api/v2/lms/student/{studentId}/courses/life-skills/submissions/history
```

**Expected Result:**
- Status Code: 200 OK
- Response includes array of past submissions (voice + quiz)
- Fields: submissionId, taskId, type (voice/quiz), score, coinsEarned, submittedAt, status

**Evidence Required:** Curl response showing submission history

---

## Section 9: Error Handling & Edge Cases

### TC 9.1: Microphone Not Detected
**Priority:** P0 (Critical)
**Steps:**
1. Physically disconnect/disable microphone
2. Load voice task page
3. Attempt to start recording

**Expected Result:**
- Error message: "Microphone not detected. Please connect a microphone and try again."
- Record button disabled (gray)
- Troubleshooting link/button provided

**Evidence Required:** Screenshot showing microphone not detected error

---

### TC 9.2: Recording Shorter Than 1 Second
**Priority:** P1 (High)
**Steps:**
1. Press and immediately release record button (< 1 second)
2. Observe behavior

**Expected Result:**
- Error toast: "Recording too short. Please hold the button for at least 2 seconds."
- Recording is NOT saved (state remains idle)
- User can try again immediately

**Evidence Required:** Screenshot showing "Recording too short" error

---

### TC 9.3: File Upload Failure (Network Error)
**Priority:** P0 (Critical)
**Steps:**
1. Record a voice note
2. Disconnect internet/block API request
3. Click Submit
4. Observe error handling

**Expected Result:**
- Upload fails after timeout (10 seconds)
- Error toast: "Upload failed. Retrying... (Attempt 1/3)"
- Automatic retry with exponential backoff (1s, 3s, 9s delays)
- After 3 failed attempts: "Upload failed. Your answer has been saved offline and will be submitted when you're back online."
- Offline badge appears in notification bell

**Evidence Required:** Screenshot showing retry toast notification

---

### TC 9.4: Quiz Submission Failure
**Priority:** P0 (Critical)
**Steps:**
1. Complete quiz answers
2. Block API request to quiz submission endpoint
3. Click "Finish Quiz"

**Expected Result:**
- Error toast: "Unable to submit quiz. Please check your internet connection."
- Retry button appears
- Answers saved locally (not lost)
- Clicking retry re-submits

**Evidence Required:** Screenshot showing quiz submission error

---

### TC 9.5: Audio Question Fails to Load
**Priority:** P1 (High)
**Steps:**
1. Load voice/quiz page with invalid audioUrl
2. Observe audio player behavior

**Expected Result:**
- Audio player shows error state: "Audio not available"
- Question text still displays
- Submit button enabled after 3 seconds (skip audio enforcement if audio fails)
- Error logged to console (for debugging)

**Evidence Required:** Screenshot showing "Audio not available" message

---

## Section 10: Child-Friendly UX

### TC 10.1: Encouraging Language Throughout
**Priority:** P1 (High)
**AC Mapping:** UX-01
**Steps:**
1. Navigate through voice recording and quiz pages
2. Read all instruction text, status messages, and feedback

**Expected Result:**
- Positive, encouraging language used:
  - "Great! Let me hear your thoughts!"
  - "Excellent! You're doing amazing!"
  - "Great work! +20 coins earned!"
  - "Keep up the good work!"
- No negative language (e.g., "Wrong!", "Failed", "Incorrect" → use "Not quite" or "Let's try again")

**Evidence Required:** Screenshots showing encouraging language in multiple states

---

### TC 10.2: Patrick Hand Font Applied
**Priority:** P1 (High)
**AC Mapping:** UX-02
**Steps:**
1. Load voice/quiz pages
2. Inspect text elements (headings, buttons, instructions)

**Expected Result:**
- All text uses Patrick Hand font (child-friendly handwritten style)
- Font loaded via Google Fonts or locally
- Fallback font: Comic Sans MS, cursive
- Font size: 16px minimum for body text, 24px for headings

**Evidence Required:** Screenshot showing Patrick Hand font in use

---

### TC 10.3: Large Touch Targets
**Priority:** P1 (High)
**AC Mapping:** UX-03
**Steps:**
1. Measure record button size (desktop and mobile)
2. Measure radio option height
3. Test click/tap accuracy

**Expected Result:**
- Record button: 120x120px (desktop), 80x80px (mobile)
- Radio options: 72px height each
- Submit button: 240px width, 56px height
- All targets meet WCAG AA guideline (44x44px minimum)

**Evidence Required:** Screenshot with measurements overlaid

---

### TC 10.4: Color-Coded States Clear and Distinct
**Priority:** P0 (Critical)
**AC Mapping:** UX-04
**Steps:**
1. Progress through all recording states:
   - Idle (green)
   - Recording (red)
   - Recorded (blue)
   - Playing (yellow)
   - Submitting (gray)
2. Verify color contrast and accessibility

**Expected Result:**
- Each state has distinct color and border:
  - Green: border-green-500, bg-green-100
  - Red: border-red-500, bg-red-100 (pulsing animation)
  - Blue: border-blue-500, bg-blue-100
  - Yellow: border-yellow-500, bg-yellow-100
  - Gray: border-gray-400, bg-gray-100
- Colors pass WCAG AA contrast ratio (4.5:1 for text)

**Evidence Required:** Five screenshots showing each color state

---

### TC 10.5: Error Messages Child-Friendly
**Priority:** P1 (High)
**AC Mapping:** UX-05
**Steps:**
1. Trigger various errors:
   - Microphone permission denied
   - Upload failure
   - Recording too short
2. Read error messages

**Expected Result:**
- Child-friendly error messages:
  - NOT: "Error 403: Microphone access forbidden"
  - YES: "Oops! We need permission to use your microphone. Ask an adult to help you allow microphone access."
  - NOT: "Network timeout after 10000ms"
  - YES: "Hmm, the internet seems slow. Let's try again in a moment!"

**Evidence Required:** Screenshots showing friendly error messages

---

### TC 10.6: Success Animations with Coin Flying Effect
**Priority:** P2 (Medium)
**AC Mapping:** UX-06
**Steps:**
1. Submit voice recording successfully
2. Complete quiz successfully
3. Observe coin animations

**Expected Result:**
- Coin icon (💰) flies from success message to Title Bar
- Animation: 1-2 second duration, curved path
- Optional: Sound effect (coin jingle) plays
- Lottie animation or CSS keyframes used

**Evidence Required:** Video/GIF showing coin animation

---

## Section 11: Performance Testing

### TC 11.1: Voice Recording Interface Loads Within 2 Seconds
**Priority:** P0 (Critical)
**AC Mapping:** PERF-01
**Steps:**
1. Clear browser cache
2. Navigate to `/student/life-skills/voice/voice_task_1`
3. Measure page load time (DevTools Performance tab)

**Expected Result:**
- Page fully loaded (DOM + scripts + audio player) within 2 seconds
- Time to Interactive (TTI) < 2000ms
- Largest Contentful Paint (LCP) < 1500ms

**Evidence Required:** DevTools Performance screenshot showing load time

---

### TC 11.2: Audio Playback Starts Within 1 Second
**Priority:** P0 (Critical)
**AC Mapping:** PERF-02
**Steps:**
1. Load page with audio question
2. Measure time from page load to audio playback start

**Expected Result:**
- Audio autoplays within 1 second of page load
- No buffering delay (audio preloaded if possible)
- Audio ready state: HAVE_ENOUGH_DATA

**Evidence Required:** DevTools Network tab showing audio load time < 1000ms

---

### TC 11.3: Waveform Visualization Renders at 30 FPS Minimum
**Priority:** P0 (Critical)
**AC Mapping:** PERF-03
**Steps:**
1. Start recording voice note
2. Record for 30 seconds (speaking continuously)
3. Monitor frame rate (DevTools Performance → Rendering FPS meter)

**Expected Result:**
- Waveform animation maintains 30 FPS minimum (preferably 60 FPS)
- No dropped frames or lag
- Canvas animation uses requestAnimationFrame
- CPU usage < 50% during recording

**Evidence Required:** DevTools Performance screenshot showing FPS ≥ 30

---

### TC 11.4: Voice File Upload Completes Within 10 Seconds
**Priority:** P0 (Critical)
**AC Mapping:** PERF-04
**Steps:**
1. Record 60-second voice note (max duration)
2. Click Submit
3. Measure upload time (from Submit click to success toast)

**Expected Result:**
- 60-second recording ≈ 2-3 MB file size
- Upload completes within 10 seconds on typical connection (5 Mbps upload)
- Progress bar updates smoothly (no jumps from 0% to 100%)

**Evidence Required:** DevTools Network tab showing upload time < 10s

---

## Section 12: Accessibility Testing

### TC 12.1: Keyboard Navigation Supported
**Priority:** P0 (Critical)
**AC Mapping:** ACC-01
**Steps:**
1. Load quiz page
2. Use only keyboard (no mouse):
   - Tab: Navigate to next element
   - Shift+Tab: Navigate to previous element
   - Space: Toggle radio selection
   - Enter: Submit answer

**Expected Result:**
- All interactive elements reachable via Tab (record button, radio options, Submit button, navigation)
- Focus indicator visible (blue outline, 2px)
- Tab order logical (top to bottom, left to right)
- Space key toggles radio options
- Enter key submits answer

**Evidence Required:** Screenshot showing focus outline on Submit button

---

### TC 12.2: ARIA Labels for Screen Readers
**Priority:** P0 (Critical)
**AC Mapping:** ACC-02
**Steps:**
1. Enable screen reader (NVDA, JAWS, or VoiceOver)
2. Navigate through voice recording page
3. Listen to announcements

**Expected Result:**
- Record button: "Recording button, currently idle state. Hold to record your answer."
- During recording: "Recording in progress, 12 seconds elapsed."
- Radio options: "Option A: Only before breakfast. Radio button, not selected."
- Submit button: "Submit answer button, disabled. Record your answer first."

**Evidence Required:** Screenshot showing ARIA attributes in DOM inspector

---

## Section 13: Responsive Design Testing

### TC 13.1: Desktop Layout (1366x768)
**Priority:** P0 (Critical)
**Steps:**
1. Set viewport to 1366x768
2. Load voice recording page
3. Check layout

**Expected Result:**
- Record button: 120x120px
- Radio options: 72px height
- All elements visible without scrolling (except long content)
- Two-column layout for quiz options (if space allows)

**Evidence Required:** Screenshot at 1366x768 resolution

---

### TC 13.2: Tablet Layout (768px)
**Priority:** P1 (High)
**Steps:**
1. Set viewport to 768px width
2. Load pages
3. Check layout

**Expected Result:**
- Record button: 100x100px
- Radio options: Single column, 64px height
- Waveform: Full width, 48px height
- Title Bar and Toolbar stack vertically if needed

**Evidence Required:** Screenshot at 768px width

---

### TC 13.3: Mobile Layout (375px)
**Priority:** P1 (High)
**Steps:**
1. Set viewport to 375px width (mobile)
2. Load pages
3. Check layout and touch interactions

**Expected Result:**
- Record button: 80x80px
- Radio options: Single column, 56px height
- Submit button: Full width (minus padding)
- Navigation buttons stack vertically

**Evidence Required:** Screenshot at 375px width

---

## Section 14: Browser Compatibility Testing

### TC 14.1: Chrome (Latest)
**Priority:** P0 (Critical)
**Steps:**
1. Test all features in Chrome
2. Check MediaRecorder API support
3. Verify waveform rendering

**Expected Result:**
- All features work correctly
- MediaRecorder API fully supported
- Web Audio API works
- No console errors

**Evidence Required:** Chrome screenshot with version number

---

### TC 14.2: Edge (Chromium)
**Priority:** P1 (High)
**Steps:**
1. Test in Microsoft Edge
2. Verify voice recording and quiz

**Expected Result:**
- Same behavior as Chrome (Chromium-based)
- All features functional

**Evidence Required:** Edge screenshot

---

### TC 14.3: Firefox (Latest)
**Priority:** P1 (High)
**Steps:**
1. Test in Firefox
2. Check audio codec support (WebM/Opus)

**Expected Result:**
- MediaRecorder may use different codec (check MIME type)
- Waveform visualization works
- Minor visual differences acceptable

**Evidence Required:** Firefox screenshot

---

## Test Summary

**Total Test Cases:** 68
**Critical (P0):** 46
**High (P1):** 18
**Medium (P2):** 4

**Automated Tests:** ~22 (UI elements, API endpoints, error states)
**Manual Tests Required:** ~46 (microphone recording, audio playback, user interactions)

**Coverage:**
- Voice Recording Interface: 14 test cases
- MCQ Quiz Flow: 15 test cases
- Results & Grading: 9 test cases
- API Endpoints: 6 test cases
- Error Handling: 5 test cases
- UX & Accessibility: 8 test cases
- Performance: 4 test cases
- Responsive Design: 3 test cases
- Browser Compatibility: 3 test cases

**Known Limitations:**
- Audio URLs may be null in mock data (audioUrl field)
- Offline sync features deferred (OFF-01 to OFF-07)
- Physical microphone required for voice recording tests
- Waveform FPS testing requires manual DevTools monitoring

---

**Last Updated:** 2025-10-28
**Created By:** QA Agent (Quinn)
**Status:** Ready for Testing

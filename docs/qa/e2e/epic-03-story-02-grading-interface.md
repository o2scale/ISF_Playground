# E2E Test Scenarios: Epic 03 Story 02 - Syllabus Tracker & Grading Interface

**Story ID:** SPRINT2-EPIC03-STORY02
**Test Document Version:** 1.0
**Last Updated:** 2025-10-29 10:47:22
**Test Environment:** Staging
**Browser Support:** Chrome 120+, Firefox 115+, Edge 120+
**Screen Resolutions:** 1920x1080 (primary), 1366x768 (tablet)

---

## Test Coverage Summary

| Category | Test Cases | Priority |
|----------|-----------|----------|
| Submission Queue & Filtering | 8 | P0 |
| Search Functionality | 3 | P1 |
| Art Submission Grading | 12 | P0 |
| Video Submission Grading | 10 | P0 |
| Audio Submission Grading | 8 | P0 |
| Grading Panel & Validation | 11 | P0 |
| Navigation Controls | 7 | P1 |
| Bulk Grading | 8 | P1 |
| Auto-Save & Error Handling | 6 | P2 |
| Performance & Accessibility | 3 | P2 |
| **TOTAL** | **76** | - |

---

## Prerequisites

**Test Data Setup:**
- Coach user account with assigned Balagruha
- At least 10 student submissions (Art, Video, Audio) in "pending" status
- MongoDB instance running
- Backend server running on port 5001
- Frontend running on port 3000
- Test media files: art-test.jpg (1.5MB), video-test.mp4 (12MB), audio-test.mp3 (450KB)

**Test Account:**
- **Username:** coach@test.com
- **Password:** TestPassword123
- **Role:** Coach
- **Balagruha:** Ramakrishna Ashram (Mumbai)
- **Assigned Students:** 10-20 students

**Database State:**
```javascript
// Required test data in MongoDB:
{
  submissions: [
    { type: 'art', status: 'pending', studentId: ..., courseType: 'art' },
    { type: 'video', status: 'pending', studentId: ..., courseType: 'spoken_english' },
    { type: 'audio', status: 'pending', studentId: ..., courseType: 'life_skills' },
    // ... more submissions
  ]
}
```

---

## Test Scenarios

### 1. Submission Queue & Filtering (8 Test Cases)

#### TC 1.1: Dashboard Load - Initial State
**Priority:** P0
**Preconditions:**
- User logged in as Coach
- Coach has 18 pending submissions, 142 graded, 3 flagged, 24 this week

**Steps:**
1. Navigate to `/coach/grading`
2. Wait for dashboard to load

**Expected Results:**
- Quick stats cards display correct counts:
  - 📝 Pending: 18
  - ✅ Graded: 142
  - ⚠️ Flagged: 3
  - ⏱️ This Week: 24
- Submission queue shows all 18 pending submissions
- Filter panel shows: Course Type: "All", Status: "Pending", Sort: "Oldest First"
- Page loads within 2 seconds
- No console errors

**Screenshots:** `TC-1.1-dashboard-loaded.png`

---

#### TC 1.2: Filter by Course Type - Art
**Priority:** P0
**Steps:**
1. On Grading Dashboard
2. Click "Course Type" dropdown
3. Select "Art"

**Expected Results:**
- Only Art submissions displayed
- Cards have orange left border (border-l-4 border-orange-500)
- Submission count updates: "X submissions found"
- Quick stats remain unchanged (they show ALL submissions, not filtered)

---

#### TC 1.3: Filter by Course Type - Video (Spoken English)
**Priority:** P0
**Steps:**
1. Click "Course Type" dropdown
2. Select "Spoken English (Video)"

**Expected Results:**
- Only Video submissions displayed
- Cards have blue left border (border-l-4 border-blue-500)
- Video thumbnail/icon visible on cards
- Duration displayed: "Duration: X:XX"

---

#### TC 1.4: Filter by Status - Graded
**Priority:** P0
**Steps:**
1. Click "Status" dropdown
2. Select "Graded"

**Expected Results:**
- Only graded submissions displayed
- "View Grade" button shown instead of "Preview & Grade"
- Graded date/time displayed
- Coach name shown (who graded it)
- Coin amount awarded displayed

---

#### TC 1.5: Filter by Status - Flagged
**Priority:** P1
**Steps:**
1. Click "Status" dropdown
2. Select "Flagged"

**Expected Results:**
- Only flagged submissions displayed
- 🚩 Flag icon visible
- Flag reason displayed
- "Review & Grade" button available

---

#### TC 1.6: Sort by Newest First
**Priority:** P1
**Steps:**
1. Click "Sort By" dropdown
2. Select "Newest First"

**Expected Results:**
- Submissions reorder
- Most recent submission appears first
- Submission dates descending order

---

#### TC 1.7: Sort by Oldest First
**Priority:** P0
**Steps:**
1. Click "Sort By" dropdown
2. Select "Oldest First"

**Expected Results:**
- Submissions reorder
- Oldest submission appears first
- Submission dates ascending order

---

#### TC 1.8: Filter Combination - Art + Pending + Oldest First
**Priority:** P0
**Steps:**
1. Set Course Type: "Art"
2. Set Status: "Pending"
3. Set Sort: "Oldest First"

**Expected Results:**
- Only pending art submissions displayed
- Sorted by submission date (oldest first)
- All filters applied simultaneously
- Submission count reflects filtered results

---

### 2. Search Functionality (3 Test Cases)

#### TC 2.1: Search by Student Name - Exact Match
**Priority:** P1
**Preconditions:** Submission queue visible with multiple students

**Steps:**
1. Type "Ravi Kumar" in search input
2. Observe real-time filtering

**Expected Results:**
- Only submissions from "Ravi Kumar" displayed
- Filtering happens instantly (no delay)
- Search is case-insensitive
- Submission count updates

---

#### TC 2.2: Search by Student Name - Partial Match
**Priority:** P1
**Steps:**
1. Clear search
2. Type "Ravi" in search input

**Expected Results:**
- All submissions with "Ravi" in student name displayed
- Case-insensitive matching
- Real-time filtering as you type

---

#### TC 2.3: Search by Course Title
**Priority:** P1
**Steps:**
1. Clear search
2. Type "Art Workshop" in search input

**Expected Results:**
- All submissions from "Art Workshop" course displayed
- Search works across courseTitle and taskTitle fields
- Combined with active filters (if any)

---

### 3. Art Submission Grading (12 Test Cases)

#### TC 3.1: Open Art Grading Interface
**Priority:** P0
**Preconditions:** At least one art submission visible in queue

**Steps:**
1. Click "Preview & Grade" button on an art submission card
2. Wait for grading interface to load

**Expected Results:**
- Fullscreen grading interface opens
- Header shows: "Grading: {Task Title} - {Student Name}"
- 2-column layout: 60% preview (left), 40% grading panel (right)
- Image preview displays artwork
- Grading panel shows student info, course details, submission metadata
- Interface loads within 1 second
- Close button (✕) visible in header

**Screenshots:** `TC-3.1-art-grading-interface.png`

---

#### TC 3.2: Image Zoom In/Out
**Priority:** P1
**Steps:**
1. In art grading interface
2. Click "Zoom In" button 3 times
3. Click "Zoom Out" button 2 times
4. Click "Reset Zoom" button

**Expected Results:**
- Each "Zoom In" increases zoom by 25% (100% → 125% → 150% → 175%)
- Zoom percentage displayed: "125%", "150%", etc.
- "Zoom In" button disabled at 200% (max zoom)
- Each "Zoom Out" decreases zoom by 25%
- "Zoom Out" button disabled at 50% (min zoom)
- "Reset Zoom" returns to 100%
- Smooth CSS transitions during zoom

---

#### TC 3.3: Image Rotation Control
**Priority:** P2
**Steps:**
1. In art grading interface
2. Click "Rotate" button (🔄) once
3. Click "Rotate" button again
4. Click "Rotate" button twice more

**Expected Results:**
- First click: Image rotates 90° clockwise
- Second click: Image rotates to 180° (upside down)
- Third click: Image rotates to 270° (90° counter-clockwise)
- Fourth click: Image returns to 0° (original orientation)
- Rotation wraps at 360° back to 0°
- Smooth CSS transition during rotation
- Zoom level preserved during rotation

---

#### TC 3.4: Download Original Image
**Priority:** P1
**Steps:**
1. In art grading interface
2. Click "Download Original" button

**Expected Results:**
- Browser download prompt appears
- File name: original filename or "{student}-{task}.png"
- File downloads successfully
- Full resolution image (not preview/thumbnail)
- No UI changes (stays in grading interface)

---

#### TC 3.5: Quality Rating Selection - Excellent
**Priority:** P0
**Steps:**
1. In art grading interface
2. Click "Excellent" radio button

**Expected Results:**
- "Excellent" button selected (green background, border-2 border-green-500)
- Coin slider auto-adjusts to 85 coins (80-100 range)
- Number input shows "85"
- Other quality buttons deselected

---

#### TC 3.6: Quality Rating Selection - Good
**Priority:** P0
**Steps:**
1. Click "Good" radio button

**Expected Results:**
- "Good" button selected (yellow background, border-2 border-yellow-500)
- Coin slider auto-adjusts to 65 coins (50-79 range)
- Number input shows "65"
- Other quality buttons deselected

---

#### TC 3.7: Quality Rating Selection - Needs Improvement
**Priority:** P0
**Steps:**
1. Click "Needs Improvement" radio button

**Expected Results:**
- "Needs Improvement" button selected (red background, border-2 border-red-500)
- Coin slider auto-adjusts to 25 coins (0-49 range)
- Number input shows "25"
- Other quality buttons deselected

---

#### TC 3.8: Coin Slider Adjustment
**Priority:** P0
**Steps:**
1. Select "Excellent" quality rating
2. Drag coin slider to 95
3. Observe number input and slider position

**Expected Results:**
- Slider handle moves smoothly
- Number input updates in real-time: "95"
- Slider position reflects coin amount (95% of slider width)
- Slider color updates based on range (green for 80-100)

---

#### TC 3.9: Coin Number Input - Valid Value
**Priority:** P0
**Steps:**
1. Click number input field
2. Clear existing value
3. Type "75"
4. Press Tab or click outside

**Expected Results:**
- Number input accepts value
- Slider position updates to 75%
- Value persists
- Quality rating remains selected (Good auto-selected for 50-79 range)

---

#### TC 3.10: Coin Number Input - Invalid Values
**Priority:** P0
**Steps:**
1. Try to enter "abc" (letters)
2. Try to enter "150" (> 100)
3. Try to enter "-10" (negative)
4. Try to enter "50.5" (decimal)

**Expected Results:**
- Letters rejected (cannot type)
- Value > 100 clamped to 100
- Negative value clamped to 0
- Decimal rounded to 50
- Error message/validation feedback shown

---

#### TC 3.11: Feedback Textarea - Character Counter
**Priority:** P0
**Steps:**
1. Click feedback textarea
2. Type 50 characters
3. Type 450 more characters (total 500)
4. Try to type more

**Expected Results:**
- Character counter displays: "50 / 500", "500 / 500"
- Counter updates in real-time as you type
- Cannot exceed 500 characters
- Counter turns red when at limit
- Textarea scrolls if content exceeds visible area

---

#### TC 3.12: Submit Grade - Art Submission Success
**Priority:** P0
**Preconditions:** Quality rating selected, coin amount set

**Steps:**
1. Select "Excellent" quality rating
2. Set coin amount to 90
3. Enter feedback: "Great work on the colors and composition!"
4. Click "Submit Grade" button
5. Wait for response

**Expected Results:**
- Loading indicator appears briefly
- Success toast: "✅ Grade submitted! {Student Name} earned 90 ISF Coins!"
- Auto-navigate to next submission (or close if last)
- Submission status changes to "graded" in database
- Student coin balance increases by 90
- Student notification created

**API Call:**
```
POST /api/v2/lms/coach/grading/submissions/{submissionId}/grade
Body: {
  qualityRating: 'excellent',
  coinsAwarded: 90,
  feedback: 'Great work on the colors and composition!',
  coachId: {coachId}
}
Response: 200 OK
```

---

### 4. Video Submission Grading (10 Test Cases)

#### TC 4.1: Open Video Grading Interface
**Priority:** P0
**Steps:**
1. Click "Preview & Grade" on a video submission card

**Expected Results:**
- Fullscreen grading interface opens
- Header shows video submission title and student name
- HTML5 video player displayed (left 60%)
- Grading panel (right 40%)
- Video controls visible: Play, Pause, Volume, Progress bar, Fullscreen
- Video duration displayed: "0:00 / 2:34"
- File size displayed: "12.3 MB"

**Screenshots:** `TC-4.1-video-grading-interface.png`

---

#### TC 4.2: Video Playback Controls - Play/Pause
**Priority:** P0
**Steps:**
1. In video grading interface
2. Click Play button (▶️)
3. Wait 5 seconds
4. Click Pause button (⏸️)

**Expected Results:**
- Video starts playing
- Progress bar updates in real-time
- Current time updates: "0:05 / 2:34"
- Play button changes to Pause button
- Video pauses at current position
- Pause button changes back to Play button

---

#### TC 4.3: Video Rewind/Forward Buttons
**Priority:** P1
**Steps:**
1. Play video to 0:30
2. Click "⏪ -5s" button (Rewind)
3. Observe video position
4. Click "⏩ +5s" button (Forward) twice

**Expected Results:**
- Rewind button jumps video backward 5 seconds to 0:25
- Video playback continues (doesn't pause)
- Forward button jumps video forward 5 seconds to 0:30, then 0:35
- Current time display updates immediately
- Cannot rewind before 0:00 (clamped to start)
- Cannot forward beyond video duration (clamped to end)

---

#### TC 4.4: Video Playback Speed Controls
**Priority:** P2
**Steps:**
1. Video playing at 1x speed
2. Click "0.5x" speed button
3. Wait 10 seconds (observe slower playback)
4. Click "1.5x" speed button
5. Click "2x" speed button
6. Click "1x" speed button (return to normal)

**Expected Results:**
- Speed buttons displayed: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
- Default: 1x speed (highlighted in blue bg-blue-600)
- Clicking 0.5x: video plays at half speed (slower), button highlighted
- Clicking 1.5x: video plays at 1.5x speed (faster), button highlighted
- Clicking 2x: video plays at double speed, button highlighted
- Only one speed button highlighted at a time
- Speed changes apply immediately without pausing video
- Audio pitch adjusts with speed (if browser supports)

---

#### TC 4.5: Video Progress Bar Seeking
**Priority:** P1
**Steps:**
1. Click at 50% position on video progress bar
2. Click at 10% position
3. Click at 90% position

**Expected Results:**
- Video jumps to 50% of duration (1:17 for 2:34 video)
- Current time updates immediately
- Video continues playing (or stays paused if paused)
- Progress bar handle moves to clicked position
- Video seeks to 10% (0:15)
- Video seeks to 90% (2:19)

---

#### TC 4.6: Video Volume Control
**Priority:** P1
**Steps:**
1. Click volume icon
2. Drag volume slider to 50%
3. Drag volume slider to 0% (mute)
4. Click volume icon (unmute)

**Expected Results:**
- Volume slider appears
- Volume adjusts to 50% (audio quieter)
- Volume at 0%: video muted, mute icon (🔇) shown
- Clicking mute icon unmutes and restores previous volume
- Volume setting persists across video playback

---

#### TC 4.7: Video Fullscreen Mode
**Priority:** P2
**Steps:**
1. Click fullscreen button on video player
2. Wait 5 seconds
3. Press ESC key to exit fullscreen

**Expected Results:**
- Video enters fullscreen mode (fills entire screen)
- Grading panel NOT visible in fullscreen (video only)
- Video controls still accessible in fullscreen
- ESC key or fullscreen button exits fullscreen
- Grading panel reappears after exiting fullscreen
- Video playback continues during transitions

---

#### TC 4.8: Video Metadata Display
**Priority:** P0
**Steps:**
1. In video grading interface
2. Observe right panel metadata section

**Expected Results:**
- Student name displayed
- Class and Balagruha displayed
- Course title and task title displayed
- Submission date/time displayed: "Oct 24, 2025 at 9:15 AM"
- Video duration displayed: "2 minutes 34 seconds"
- File size displayed: "12.3 MB"
- Attempt number (if multiple submissions): "1st submission"

---

#### TC 4.9: Video Download Button
**Priority:** P1
**Steps:**
1. In video grading interface
2. Click "Download" button (not implemented in current version)

**Expected Results:**
- Browser download prompt (if implemented)
- OR button disabled with tooltip "Feature coming soon"
- Original MP4 file downloads
- Video continues playing during download

---

#### TC 4.10: Submit Grade - Video Submission
**Priority:** P0
**Steps:**
1. Select "Good" quality rating
2. Set coin amount to 70
3. Enter feedback: "Good pronunciation and expression. Try to memorize next time!"
4. Click "Submit Grade"

**Expected Results:**
- Success toast: "✅ Grade submitted! {Student Name} earned 70 ISF Coins!"
- Auto-navigate to next submission
- Submission status: pending → graded
- Student coin balance +70
- Student notification sent

---

### 5. Audio Submission Grading (8 Test Cases)

#### TC 5.1: Open Audio Grading Interface
**Priority:** P0
**Steps:**
1. Click "Preview & Grade" on an audio submission card

**Expected Results:**
- Fullscreen grading interface opens
- Header shows audio submission title
- HTML5 audio player displayed with waveform icon (🎙️)
- Audio controls: Play, Pause, Volume, Progress bar
- Duration displayed: "0:00 / 0:34"
- File size displayed: "450 KB"
- Grading panel visible (right 40%)

**Screenshots:** `TC-5.1-audio-grading-interface.png`

---

#### TC 5.2: Audio Playback Controls
**Priority:** P0
**Steps:**
1. In audio grading interface
2. Click Play button
3. Wait for audio to play
4. Click Pause button

**Expected Results:**
- Audio starts playing
- Progress bar updates
- Current time updates: "0:15 / 0:34"
- Play button → Pause button
- Audio pauses at current position

---

#### TC 5.3: Audio Progress Bar Seeking
**Priority:** P1
**Steps:**
1. Click at 25% position on audio progress bar
2. Observe audio position

**Expected Results:**
- Audio jumps to 25% of duration (0:08)
- Current time updates immediately
- Audio continues playing (or stays paused)

---

#### TC 5.4: Audio Volume Control
**Priority:** P1
**Steps:**
1. Adjust volume slider to 75%
2. Adjust volume slider to 0% (mute)

**Expected Results:**
- Volume adjusts to 75%
- Audio muted at 0%, mute icon shown
- Volume setting persists

---

#### TC 5.5: Audio File Info Display
**Priority:** P0
**Steps:**
1. In audio grading interface
2. Observe metadata section

**Expected Results:**
- Duration displayed: "34 seconds"
- File size: "450 KB (MP3)"
- Submission date/time
- Student info (name, class, Balagruha)
- Course and task titles

---

#### TC 5.6: Audio Download (Not Implemented)
**Priority:** P2
**Steps:**
1. Look for download button

**Expected Results:**
- Download button not visible (not implemented in current version)
- OR button disabled with "Coming soon" tooltip

---

#### TC 5.7: Audio Waveform Visualization (Not Implemented)
**Priority:** P2
**Steps:**
1. In audio grading interface
2. Look for waveform visualization

**Expected Results:**
- Waveform NOT displayed (not implemented in current version)
- Simple audio player shown instead
- Future enhancement noted in known limitations

---

#### TC 5.8: Submit Grade - Audio Submission
**Priority:** P0
**Steps:**
1. Select "Good" quality rating
2. Set coin amount to 65
3. Enter feedback: "Clear answer! Try to add more details next time."
4. Click "Submit Grade"

**Expected Results:**
- Success toast: "✅ Grade submitted! {Student Name} earned 65 ISF Coins!"
- Auto-navigate to next submission
- Submission status: graded
- Student coin balance +65

---

### 6. Grading Panel & Validation (11 Test Cases)

#### TC 6.1: Submit Grade - Missing Quality Rating
**Priority:** P0
**Steps:**
1. In any grading interface
2. Do NOT select quality rating
3. Set coin amount to 80
4. Click "Submit Grade"

**Expected Results:**
- Form does NOT submit
- Validation error: "Please select a quality rating"
- Error toast: "Please fix the errors before submitting"
- Submit button remains enabled (can retry)
- Quality rating section highlighted in red

---

#### TC 6.2: Submit Grade - Missing Coin Amount
**Priority:** P0
**Steps:**
1. Select "Excellent" quality rating
2. Clear coin number input (empty)
3. Click "Submit Grade"

**Expected Results:**
- Form does NOT submit
- Validation error: "Coin amount is required"
- OR default to 0 coins (depending on implementation)
- Error toast shown

---

#### TC 6.3: Submit Grade - Feedback Optional
**Priority:** P0
**Steps:**
1. Select "Good" quality rating
2. Set coin amount to 60
3. Leave feedback textarea empty
4. Click "Submit Grade"

**Expected Results:**
- Form submits successfully
- No validation error (feedback is optional)
- Success toast shown
- Submission graded with empty feedback

---

#### TC 6.4: Submit Grade - Network Error Handling
**Priority:** P1
**Preconditions:** Simulate network failure (disconnect backend or use browser DevTools)

**Steps:**
1. Select quality rating and coin amount
2. Disconnect network or backend
3. Click "Submit Grade"
4. Wait for response

**Expected Results:**
- Loading indicator appears
- Error toast: "Failed to submit grade. Please check your connection."
- OR retry logic triggers (if implemented)
- Form data preserved (not lost)
- User can retry submission

---

#### TC 6.5: Submit Grade - 500 Server Error
**Priority:** P1
**Preconditions:** Backend returns 500 error

**Steps:**
1. Submit grade
2. Backend returns 500 error

**Expected Results:**
- Error toast: "Failed to submit grade. Please try again later."
- Form data preserved
- User can retry

---

#### TC 6.6: Submit Grade - 400 Validation Error
**Priority:** P1
**Preconditions:** Backend returns 400 error (e.g., invalid coin amount)

**Steps:**
1. Submit grade with invalid data
2. Backend returns 400 error

**Expected Results:**
- Error toast: "Invalid grade data: {error message}"
- Form data preserved
- User can correct and retry

---

#### TC 6.7: Coin Slider - Range Validation
**Priority:** P0
**Steps:**
1. Drag slider to minimum (0)
2. Drag slider to maximum (100)
3. Try to drag beyond limits

**Expected Results:**
- Slider clamped to 0 (cannot go below)
- Slider clamped to 100 (cannot go above)
- Number input shows 0 and 100 respectively
- Visual feedback at limits

---

#### TC 6.8: Coin Number Input - Min/Max Validation
**Priority:** P0
**Steps:**
1. Enter "-5" in number input
2. Press Tab
3. Enter "150" in number input
4. Press Tab

**Expected Results:**
- -5 clamped to 0
- 150 clamped to 100
- Validation message shown
- Slider position updates to clamped value

---

#### TC 6.9: Quality Rating - Auto-Adjust Coin Slider
**Priority:** P0
**Steps:**
1. Set coin slider to 30 manually
2. Select "Excellent" quality rating

**Expected Results:**
- Coin slider auto-adjusts to 85 (Excellent default)
- Number input shows 85
- Previous value (30) overridden
- Slider animates to new position

---

#### TC 6.10: Quality Rating - Manual Override After Auto-Adjust
**Priority:** P1
**Steps:**
1. Select "Good" quality rating (auto-adjusts to 65)
2. Manually adjust slider to 50
3. Submit grade

**Expected Results:**
- Manual adjustment (50) preserved
- Quality rating remains "Good"
- Grade submits with 50 coins (not 65)
- No validation error (coach discretion allowed)

---

#### TC 6.11: Feedback Character Limit Enforcement
**Priority:** P0
**Steps:**
1. Paste 600 characters into feedback textarea

**Expected Results:**
- Only first 500 characters accepted
- Remaining 100 characters truncated
- Character counter: "500 / 500" (red)
- Cannot type more characters

---

### 7. Navigation Controls (7 Test Cases)

#### TC 7.1: Previous Button - Navigate to Previous Submission
**Priority:** P1
**Preconditions:** Currently viewing submission 5 of 18

**Steps:**
1. In grading interface (submission 5)
2. Click "← Previous" button
3. Observe submission change

**Expected Results:**
- Grading interface updates to show submission 4
- Header updates: "Grading: {Submission 4 Title} - {Student Name}"
- Media player loads new submission content
- Grading panel resets (no saved values from previous submission)
- Footer shows: "Submission 4 of 18"
- Previous button enabled (not at first submission)

---

#### TC 7.2: Previous Button - Disabled at First Submission
**Priority:** P1
**Preconditions:** Currently viewing submission 1 of 18

**Steps:**
1. In grading interface (submission 1)
2. Observe "Previous" button state

**Expected Results:**
- Previous button disabled (grayed out, cursor: not-allowed)
- Button has "opacity-50" class
- Clicking button does nothing
- Tooltip: "No previous submission" (if implemented)

---

#### TC 7.3: Next Button - Navigate to Next Submission
**Priority:** P1
**Preconditions:** Currently viewing submission 5 of 18

**Steps:**
1. In grading interface (submission 5)
2. Click "Next →" button
3. Observe submission change

**Expected Results:**
- Grading interface updates to show submission 6
- Header updates
- Media player loads new submission
- Grading panel resets
- Footer shows: "Submission 6 of 18"
- Next button enabled (not at last submission)

---

#### TC 7.4: Next Button - Disabled at Last Submission
**Priority:** P1
**Preconditions:** Currently viewing submission 18 of 18

**Steps:**
1. In grading interface (submission 18)
2. Observe "Next" button state

**Expected Results:**
- Next button disabled (grayed out, opacity-50)
- Clicking button does nothing
- Tooltip: "No more submissions" (if implemented)

---

#### TC 7.5: Skip Button - Mark Submission for Later
**Priority:** P1
**Steps:**
1. In grading interface (any submission)
2. Click "⏭️ Skip" button
3. Observe behavior

**Expected Results:**
- API call: PUT /api/v2/lms/coach/grading/submissions/{id}/skip
- Success toast: "Submission skipped"
- Auto-navigate to next submission
- Skipped submission status: pending (with skipped flag)
- Skipped submission moves to end of queue (or marked internally)

---

#### TC 7.6: Flag Button - Flag Submission for Admin Review
**Priority:** P1
**Steps:**
1. In grading interface
2. Click "🚩 Flag" button
3. Observe prompt dialog
4. Enter reason: "Inappropriate content detected"
5. Click "OK"

**Expected Results:**
- Browser prompt appears: "Enter reason for flagging this submission:"
- Reason input field displayed
- API call: PUT /api/v2/lms/coach/grading/submissions/{id}/flag
- Body: { reason: "Inappropriate content detected" }
- Success toast: "Submission flagged for admin review"
- Auto-navigate to next submission
- Flagged submission status: flagged
- Flagged submission appears in "Flagged" filter

---

#### TC 7.7: Auto-Navigate After Successful Grading
**Priority:** P1
**Steps:**
1. In grading interface (submission 5 of 18)
2. Select quality rating, set coins, enter feedback
3. Click "Submit Grade"
4. Observe behavior after success

**Expected Results:**
- Success toast appears
- After 1-2 seconds, auto-navigate to submission 6
- Grading interface updates to next submission
- Footer shows: "Submission 6 of 18"
- If last submission (18 of 18): close grading interface, return to dashboard

---

### 8. Bulk Grading (8 Test Cases) - NOT IMPLEMENTED

#### TC 8.1: Select All Checkbox
**Priority:** P1
**Implementation Status:** ⏳ Not Implemented

**Steps:**
1. On Grading Dashboard
2. Click "Select All" checkbox (not present in current UI)

**Expected Results:**
- All visible submissions selected
- Checkboxes on all cards checked
- "Bulk Grade Selected" button enabled
- Counter shows: "18 submissions selected"

---

#### TC 8.2: Individual Checkbox Selection
**Priority:** P1
**Implementation Status:** ⏳ Not Implemented

**Steps:**
1. Click checkbox on 3 submission cards

**Expected Results:**
- Selected cards highlighted
- Checkboxes checked
- "Bulk Grade Selected" button enabled
- Counter shows: "3 submissions selected"

---

#### TC 8.3: Bulk Grade Modal - Open
**Priority:** P1
**Implementation Status:** ⏳ Not Implemented

**Steps:**
1. Select 5 submissions
2. Click "Bulk Grade Selected" button

**Expected Results:**
- Bulk grade modal opens
- Modal lists all 5 selected submissions (student name + task title)
- Quality rating options displayed
- Coin slider displayed
- Feedback textarea displayed
- Warning message: "This will apply the same grade to all 5 submissions"

---

#### TC 8.4: Bulk Grade - Apply Same Grade to All
**Priority:** P1
**Implementation Status:** ⏳ Not Implemented

**Steps:**
1. In bulk grade modal
2. Select "Good" quality rating
3. Set coin amount to 70
4. Enter feedback: "Good effort on all submissions!"
5. Click "Apply Bulk Grade" button

**Expected Results:**
- Loading indicator shown
- API call: POST /api/v2/lms/coach/grading/submissions/bulk-grade
- Body: { submissionIds: [...], qualityRating: 'good', coinsAwarded: 70, feedback: '...' }
- Success toast: "5 submissions graded successfully! Students notified."
- All 5 submissions status: graded
- All 5 students receive coin awards and notifications
- Modal closes
- Grading dashboard updates

---

#### TC 8.5: Bulk Grade - Cancel
**Priority:** P1
**Implementation Status:** ⏳ Not Implemented

**Steps:**
1. Open bulk grade modal
2. Click "Cancel" button

**Expected Results:**
- Modal closes
- No grades submitted
- Submission selections preserved (checkboxes still checked)

---

#### TC 8.6: Bulk Grade - Validation Errors
**Priority:** P1
**Implementation Status:** ⏳ Not Implemented

**Steps:**
1. In bulk grade modal
2. Do NOT select quality rating
3. Click "Apply Bulk Grade"

**Expected Results:**
- Form does NOT submit
- Validation error: "Please select a quality rating"
- Modal remains open

---

#### TC 8.7: Bulk Grade - Partial Success Handling
**Priority:** P2
**Implementation Status:** ⏳ Not Implemented

**Preconditions:** Backend configured to fail 2 out of 5 submissions

**Steps:**
1. Attempt to bulk grade 5 submissions
2. Backend fails 2 submissions (e.g., already graded)

**Expected Results:**
- Partial success toast: "3 of 5 submissions graded. 2 failed."
- Failed submissions remain in queue
- Success submissions marked as graded
- Error details displayed in toast or modal

---

#### TC 8.8: Bulk Grade - Network Error Handling
**Priority:** P1
**Implementation Status:** ⏳ Not Implemented

**Steps:**
1. Disconnect network
2. Attempt to bulk grade

**Expected Results:**
- Error toast: "Failed to grade submissions. Please check your connection."
- Modal remains open
- Form data preserved
- User can retry

---

### 9. Auto-Save & Error Handling (6 Test Cases) - NOT IMPLEMENTED

#### TC 9.1: Auto-Save Draft - Every 10 Seconds
**Priority:** P2
**Implementation Status:** ⏳ Not Implemented

**Steps:**
1. In grading interface
2. Select quality rating and set coin amount
3. Wait 10 seconds
4. Observe auto-save indicator

**Expected Results:**
- Draft saved automatically every 10 seconds
- Indicator shows: "Last saved: 2 seconds ago"
- API call: PUT /api/v2/lms/coach/grading/submissions/{id}/draft
- Body: { qualityRating: 'excellent', coinsAwarded: 85, feedback: '...' }
- No toast notification (silent save)

---

#### TC 9.2: Draft Recovery - Resume Grading
**Priority:** P2
**Implementation Status:** ⏳ Not Implemented

**Steps:**
1. Start grading a submission (select quality, set coins)
2. Wait for auto-save
3. Close grading interface
4. Reopen same submission

**Expected Results:**
- Draft data restored
- Quality rating pre-selected
- Coin amount pre-filled
- Feedback pre-filled
- Indicator: "Draft from {timestamp}"

---

#### TC 9.3: Draft Cleared After Successful Submit
**Priority:** P2
**Implementation Status:** ⏳ Not Implemented

**Steps:**
1. Grade submission with auto-saved draft
2. Submit grade successfully
3. Reopen same submission (now graded)

**Expected Results:**
- Draft data cleared from database
- No draft indicator shown
- View-only grading panel (can see submitted grade)

---

#### TC 9.4: Retry Logic - Failed Submission (1st Attempt)
**Priority:** P1
**Implementation Status:** ⏳ Not Implemented

**Preconditions:** Backend configured to fail first attempt

**Steps:**
1. Submit grade
2. Backend fails (500 error)
3. Observe retry behavior

**Expected Results:**
- Error toast: "Grade submission failed. Retrying... (Attempt 2 of 3)"
- Automatic retry after 1 second
- Loading indicator persists
- User cannot interact with form during retry

---

#### TC 9.5: Retry Logic - Failed After 3 Attempts
**Priority:** P1
**Implementation Status:** ⏳ Not Implemented

**Preconditions:** Backend fails all 3 attempts

**Steps:**
1. Submit grade
2. All 3 attempts fail

**Expected Results:**
- Error toast: "Unable to submit grade. Please check your connection and try again."
- Loading indicator stops
- Form re-enabled
- User can manually retry
- Draft data preserved

---

#### TC 9.6: Retry Logic - Success on 2nd Attempt
**Priority:** P1
**Implementation Status:** ⏳ Not Implemented

**Preconditions:** Backend fails 1st attempt, succeeds on 2nd

**Steps:**
1. Submit grade
2. 1st attempt fails
3. 2nd attempt succeeds

**Expected Results:**
- 1st attempt: Error toast "Retrying... (Attempt 2 of 3)"
- 2nd attempt: Success toast "✅ Grade submitted!"
- Auto-navigate to next submission
- No indication of retry to user (seamless recovery)

---

### 10. Performance & Accessibility (3 Test Cases)

#### TC 10.1: Submission Queue Load Performance
**Priority:** P1
**Preconditions:** 200 submissions in database

**Steps:**
1. Navigate to Grading Dashboard
2. Measure page load time using DevTools Performance tab
3. Observe rendering

**Expected Results:**
- Initial load (empty state → submissions visible) < 2 seconds
- No layout shift (CLS < 0.1)
- Smooth scrolling
- No UI freezing during load
- API response time < 1 second
- Total blocking time < 300ms

**Performance Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.0s
- Time to Interactive (TTI): < 2.5s

---

#### TC 10.2: Grading Interface Open Performance
**Priority:** P1
**Steps:**
1. Click "Preview & Grade" button
2. Measure time from click to fully loaded grading interface

**Expected Results:**
- Interface opens within 1 second
- Image/video/audio loads within 2 seconds (depending on file size)
- No flickering or layout shift
- Smooth transition animation

---

#### TC 10.3: Console Errors Check
**Priority:** P0
**Steps:**
1. Open browser DevTools Console
2. Navigate through entire grading workflow:
   - Load dashboard
   - Apply filters
   - Search submissions
   - Open art/video/audio grading interfaces
   - Submit grades
   - Navigate between submissions
3. Observe console for errors

**Expected Results:**
- No console errors (red messages)
- No unhandled promise rejections
- ESLint warnings acceptable (not errors)
- No 404 errors for assets
- No CORS errors
- No authentication errors

---

## Appendix A: Test Data Setup Script

```javascript
// MongoDB test data insertion script
// Run this in MongoDB shell or via backend seed script

db.submissions.insertMany([
  // Art submission
  {
    _id: ObjectId(),
    studentId: ObjectId('student1_id'),
    studentName: 'Ravi Kumar',
    studentClass: '5th',
    courseId: ObjectId('art_course_id'),
    courseTitle: 'Art Workshop Basics',
    courseCategory: 'art',
    taskTitle: 'Draw a Tree',
    submissionType: 'art',
    fileUrl: 'http://localhost:5001/uploads/submissions/art-test.jpg',
    metadata: {
      fileSize: 2400000, // 2.4 MB
      dimensions: { width: 1280, height: 720 },
      mimeType: 'image/jpeg'
    },
    timeSpent: 45,
    submittedAt: new Date('2025-10-24T10:30:00Z'),
    status: 'pending',
    balagauhaId: ObjectId('balagruha1_id')
  },

  // Video submission
  {
    _id: ObjectId(),
    studentId: ObjectId('student2_id'),
    studentName: 'Priya Sharma',
    studentClass: '6th',
    courseId: ObjectId('spoken_english_course_id'),
    courseTitle: 'Spoken English',
    courseCategory: 'spoken_english',
    taskTitle: 'Recite Poem: The Road Not Taken',
    submissionType: 'video',
    fileUrl: 'http://localhost:5001/uploads/submissions/video-test.mp4',
    metadata: {
      fileSize: 12900000, // 12.9 MB
      duration: 154, // 2:34
      mimeType: 'video/mp4'
    },
    submittedAt: new Date('2025-10-24T09:15:00Z'),
    status: 'pending',
    balagauhaId: ObjectId('balagruha1_id')
  },

  // Audio submission
  {
    _id: ObjectId(),
    studentId: ObjectId('student3_id'),
    studentName: 'Suresh Patel',
    studentClass: '5th',
    courseId: ObjectId('life_skills_course_id'),
    courseTitle: 'Life Skills',
    courseCategory: 'life_skills',
    taskTitle: 'Question 7: Why is washing hands important?',
    submissionType: 'audio',
    fileUrl: 'http://localhost:5001/uploads/submissions/audio-test.mp3',
    metadata: {
      fileSize: 460000, // 460 KB
      duration: 34,
      mimeType: 'audio/mpeg'
    },
    submittedAt: new Date('2025-10-24T08:45:00Z'),
    status: 'pending',
    balagauhaId: ObjectId('balagruha1_id')
  }
  // ... add 15 more submissions for complete test coverage
]);
```

---

## Appendix B: Known Limitations & Future Enhancements

**Not Implemented in Current Version (2025-10-29):**
1. ⏳ Bulk grading feature (TC 8.1 - 8.8)
2. ⏳ Auto-save draft functionality (TC 9.1 - 9.3)
3. ⏳ Retry logic for failed submissions (TC 9.4 - 9.6)
4. ⏳ Task instructions display
5. ⏳ Evaluation criteria checkboxes
6. ⏳ Audio waveform visualization
7. ⏳ Transcript display for audio submissions
8. ⏳ Coach notes section
9. ⏳ Video download button (placeholder)
10. ⏳ Audio download button (placeholder)

**Implemented & Ready for Testing:**
1. ✅ Submission queue with filters (course type, status, sort)
2. ✅ Search functionality (student name, course title)
3. ✅ Art grading interface with image rotation
4. ✅ Video grading interface with playback speed controls (0.5x-2x)
5. ✅ Video rewind/forward buttons (±5 seconds)
6. ✅ Audio grading interface with HTML5 player
7. ✅ Navigation controls (Previous/Next/Skip/Flag)
8. ✅ Quality rating system with auto-adjust coin slider
9. ✅ Coin award validation (0-100 range)
10. ✅ Feedback textarea with character counter (0-500)
11. ✅ Auto-navigate to next submission after grading
12. ✅ Real-time coin balance updates
13. ✅ Student notifications

---

## Appendix C: Test Execution Checklist

- [ ] Verify test environment setup (staging server, test data)
- [ ] Create test user accounts (coach with assigned Balagruha)
- [ ] Seed test data (10+ submissions: art, video, audio)
- [ ] Clear browser cache and cookies before testing
- [ ] Test in Chrome 120+ (primary browser)
- [ ] Test in Firefox 115+ (secondary browser)
- [ ] Test in Edge 120+ (tertiary browser)
- [ ] Test at 1920x1080 resolution (primary)
- [ ] Test at 1366x768 resolution (tablet)
- [ ] Document all bugs in bug tracking system
- [ ] Take screenshots for all P0 test cases
- [ ] Record video for complex workflows (grading flow)
- [ ] Measure performance metrics using DevTools
- [ ] Check console for errors throughout testing
- [ ] Verify RBAC: Coach can only see their Balagruha submissions
- [ ] Verify real-time updates: Student dashboard shows graded submissions
- [ ] Verify coin balance: Student wallet increases after grading
- [ ] Verify notifications: Student receives grade notification
- [ ] Test edge cases: Network failures, invalid data, boundary values
- [ ] Retest all critical bugs after fixes
- [ ] Sign off on test completion

---

**Last Updated:** 2025-10-29 10:47:22
**Document Version:** 1.0
**Author:** Dev Agent (James) / QA Agent (Quinn)
**Status:** Ready for QA Execution

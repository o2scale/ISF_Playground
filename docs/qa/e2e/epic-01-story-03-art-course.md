# E2E Test Scenarios - Epic 01 Story 03: Art Course + Artweaver Integration

**Story ID:** SPRINT2-E01-S03
**Test Environment:** Desktop (1366x768), Chrome/Edge
**Prerequisites:** Student logged in, navigated to `/student/art`
**Total Test Cases:** 63

---

## 1. Mode Selection & Navigation (TC 1.1 - 1.5)

### TC 1.1: Mode Pills Display
**Priority:** P0
**Steps:**
1. Navigate to Art Course page (`/student/art`)
2. Verify page header displays "ART COURSE"
3. Verify 4 mode pills are visible

**Expected Result:**
- Mode pills display: Workshops 🎨, Free Sketch ✏️, Art Stories 📖, Competition 🏆
- Pills arranged horizontally with gap-2 spacing
- Active mode (Workshops by default) has pink-600 background, white text
- Inactive modes have white background, pink-300 border

**Acceptance Criteria:** AC-01, AC-03, AC-04

---

### TC 1.2: Switch Between Modes
**Priority:** P0
**Steps:**
1. Click "Free Sketch" mode pill
2. Verify content changes to Free Sketch mode
3. Click "Art Stories" mode pill
4. Verify content changes to Art Stories mode
5. Click "Competition" mode pill
6. Verify content changes to Competition mode
7. Click "Workshops" mode pill
8. Verify content changes back to Workshops mode

**Expected Result:**
- Clicking each pill switches to respective mode
- Active pill styling updates (pink background, white text)
- Mode content area updates with correct components
- URL remains `/student/art` (no route change)

**Acceptance Criteria:** AC-02

---

### TC 1.3: Mode Persistence in LocalStorage
**Priority:** P1
**Steps:**
1. Switch to "Competition" mode
2. Refresh the page
3. Verify Competition mode is still active

**Expected Result:**
- Last selected mode is restored from localStorage
- Mode pills reflect correct active state
- Mode content displays correctly

**Acceptance Criteria:** Implementation detail (not in story ACs)

---

### TC 1.4: Electron IPC Info Message
**Priority:** P1
**Steps:**
1. Scroll to bottom of page
2. Verify Electron IPC info message is displayed

**Expected Result:**
- Blue info box visible with ℹ️ icon
- Message states: "Artweaver Integration (Coming Soon)"
- Explains placeholder functionality for UI testing

**Acceptance Criteria:** Implementation detail

---

### TC 1.5: Page Layout and Styling
**Priority:** P0
**Steps:**
1. Verify page uses pink theme (#EC4899)
2. Verify max-width container (max-w-6xl)
3. Verify padding and spacing

**Expected Result:**
- Pink theme applied to active mode pills, buttons, borders
- Content centered with proper margins
- Responsive padding (p-6)

**Acceptance Criteria:** AC-03

---

## 2. Workshops Mode (TC 2.1 - 2.8)

### TC 2.1: Workshop List Display
**Priority:** P0
**Steps:**
1. Ensure Workshops mode is active
2. Verify workshop selector dropdown is visible
3. Verify 3 workshops are available

**Expected Result:**
- Dropdown shows: "Drawing Faces", "Landscape Painting", "Animal Sketching"
- First workshop auto-selected by default
- Dropdown shows instructor and level in parentheses

**Acceptance Criteria:** AC-14

---

### TC 2.2: Workshop Details Display
**Priority:** P0
**Steps:**
1. Select "Drawing Faces" workshop
2. Verify workshop header displays

**Expected Result:**
- Title: "Drawing Faces"
- Instructor: Coach Priya
- Duration: 45 mins
- Level: Beginner
- Header has pink-50 background

**Acceptance Criteria:** AC-14

---

### TC 2.3: Video Player Functionality
**Priority:** P0
**Steps:**
1. Verify video player is displayed
2. Verify video thumbnail/iframe loads
3. Click play button
4. Test video controls (pause, volume, fullscreen, seek)

**Expected Result:**
- Video player displays with 16:9 aspect ratio
- YouTube embedded video loads correctly
- All standard video controls work
- Video plays smoothly without errors

**Acceptance Criteria:** AC-14, AC-15

---

### TC 2.4: Instructions Display
**Priority:** P0
**Steps:**
1. Scroll to instructions section
2. Verify instructions text is readable

**Expected Result:**
- Instructions section displays with gray-50 background
- Multi-line instructions with proper line breaks
- Instructions include: watch video, open Artweaver, follow steps
- Text is readable (gray-700 color)

**Acceptance Criteria:** AC-16

---

### TC 2.5: Launch Artweaver Button
**Priority:** P0
**Steps:**
1. Click "🎨 Launch Artweaver" button
2. Verify toast notification appears

**Expected Result:**
- Button is purple-600, font-bold, px-8 py-4
- Toast message: "🎨 Opening Artweaver... (Placeholder - requires Electron)"
- Button hover state works (purple-700)

**Acceptance Criteria:** AC-05 (placeholder implementation)

---

### TC 2.6: Canvas Preview After Launch
**Priority:** P0
**Steps:**
1. Click "Launch Artweaver" button
2. Wait 3 seconds
3. Verify canvas preview updates

**Expected Result:**
- Connection status shows 🟡 Connecting (initially)
- After 3 seconds, status changes to 🟢 Connected
- Toast message: "✓ Canvas connected! Start drawing."
- Canvas preview shows placeholder content
- Canvas border: 2px pink-300

**Acceptance Criteria:** AC-09, AC-10, AC-11

---

### TC 2.7: Submit Button Enabled After Canvas
**Priority:** P0
**Steps:**
1. Launch Artweaver and wait for canvas connection
2. Verify "Submit Artwork for Grading" button appears
3. Click submit button
4. Verify submission modal opens

**Expected Result:**
- Submit button appears after canvas has content
- Button is blue-600, font-semibold
- Modal opens with "Submit Artwork" title
- Modal shows submission details

**Acceptance Criteria:** AC-17

---

### TC 2.8: Switch Workshops
**Priority:** P1
**Steps:**
1. Select "Landscape Painting" workshop
2. Verify video and instructions update
3. Select "Animal Sketching" workshop
4. Verify content updates again

**Expected Result:**
- Each workshop shows different video URL
- Instructions text updates to match workshop
- Canvas preview persists (doesn't reset)

**Acceptance Criteria:** AC-14

---

## 3. Free Sketch Mode (TC 3.1 - 3.7)

### TC 3.1: Free Sketch Header Display
**Priority:** P0
**Steps:**
1. Click "Free Sketch" mode pill
2. Verify header and description

**Expected Result:**
- Header: "Free Sketch"
- Description: "Create anything you like! Let your imagination run wild..."
- Pink-50 background

**Acceptance Criteria:** AC-18

---

### TC 3.2: Canvas Size Selector
**Priority:** P0
**Steps:**
1. Verify canvas size dropdown is visible
2. Click dropdown to view options

**Expected Result:**
- Dropdown shows 4 options:
  - 1024 x 768 (4:3 Standard) - default
  - 1920 x 1080 (16:9 HD)
  - 1200 x 1200 (Square)
  - Custom (disabled)
- Dropdown is styled with border-gray-300, rounded-lg

**Acceptance Criteria:** AC-18, AC-19

---

### TC 3.3: Launch Artweaver in Free Sketch
**Priority:** P0
**Steps:**
1. Click "Launch Artweaver" button
2. Verify canvas preview activates

**Expected Result:**
- Same launch behavior as Workshops mode
- Canvas preview shows with selected canvas size
- Connection status indicator works

**Acceptance Criteria:** AC-05, AC-09

---

### TC 3.4: Save to Gallery Button
**Priority:** P0
**Steps:**
1. Launch Artweaver and wait for canvas connection
2. Verify "Save to My Gallery" button appears
3. Click "Save to My Gallery" button

**Expected Result:**
- Save button appears (gray-600 background)
- Toast message: "💾 Artwork saved to your gallery!"
- Button is positioned before Submit button

**Acceptance Criteria:** AC-19, AC-20

---

### TC 3.5: Gallery Display
**Priority:** P0
**Steps:**
1. Scroll down to "My Gallery" section
2. Verify gallery grid displays

**Expected Result:**
- Gallery section shows "My Gallery" heading
- Grid layout: 2-4 columns (responsive)
- 3 existing artworks displayed as thumbnails
- Each artwork shows: image, title, date
- Submitted artworks show "✓ Submitted" badge
- Graded artworks show grade badge (e.g., "Grade: A")
- "+ New Sketch" placeholder card at end

**Acceptance Criteria:** AC-20

---

### TC 3.6: Gallery Artwork Cards
**Priority:** P1
**Steps:**
1. Hover over artwork cards
2. Click artwork card

**Expected Result:**
- Cards have hover:shadow-lg effect
- Border-gray-300, rounded-lg
- Aspect ratio maintained (aspect-video)
- Clicking card could open full view (not implemented)

**Acceptance Criteria:** AC-20

---

### TC 3.7: Optional Submission in Free Sketch
**Priority:** P0
**Steps:**
1. Launch Artweaver and wait for canvas
2. Click "Submit for Grading" button
3. Verify modal indicates optional submission

**Expected Result:**
- Submit button visible alongside Save button
- Modal explains submission is optional
- Submission works same as Workshops mode

**Acceptance Criteria:** AC-21

---

## 4. Art Stories Mode (TC 4.1 - 4.7)

### TC 4.1: Story List Display
**Priority:** P0
**Steps:**
1. Click "Art Stories" mode pill
2. Verify story selector dropdown

**Expected Result:**
- Dropdown shows 3 stories:
  - The Magical Forest (Easy)
  - The Brave Little Boat (Medium)
  - The Star Painter (Hard)
- First story auto-selected
- Difficulty level shown in parentheses

**Acceptance Criteria:** AC-22, AC-23

---

### TC 4.2: Story Header Display
**Priority:** P0
**Steps:**
1. Verify story header displays correctly

**Expected Result:**
- Story title: "The Magical Forest"
- Difficulty: Easy
- Estimated Time: 30 mins
- Pink-50 background header

**Acceptance Criteria:** AC-23

---

### TC 4.3: Audio Player Display
**Priority:** P0
**Steps:**
1. Look for audio player section
2. Verify audio controls

**Expected Result:**
- Section heading: "🎧 Listen to the Story"
- HTML5 audio player with controls
- Note: audioUrl is null in mock data, so placeholder message may show
- Player has gray-50 background

**Acceptance Criteria:** AC-22

---

### TC 4.4: Story Text Display
**Priority:** P0
**Steps:**
1. Scroll to story text section
2. Read story content

**Expected Result:**
- Section heading: "📖 Story"
- Story text displays with proper line breaks (whitespace-pre-line)
- Text color: gray-700
- Multi-paragraph story about magical forest
- Gray-50 background, rounded-lg

**Acceptance Criteria:** AC-23

---

### TC 4.5: Drawing Prompt Display
**Priority:** P0
**Steps:**
1. Scroll to drawing prompt section
2. Verify prompt content

**Expected Result:**
- Blue-50 background with blue-500 left border
- Section heading: "🎨 Drawing Prompt"
- Prompt lists specific elements to draw (glowing trees, butterflies, etc.)
- Encourages imagination

**Acceptance Criteria:** AC-24

---

### TC 4.6: Launch Artweaver for Story
**Priority:** P0
**Steps:**
1. Click "Launch Artweaver" button
2. Verify canvas preview activates

**Expected Result:**
- Same launch behavior as other modes
- Canvas preview displays
- Connection status works

**Acceptance Criteria:** AC-05, AC-09

---

### TC 4.7: Story Submission Required
**Priority:** P0
**Steps:**
1. Launch Artweaver, wait for canvas
2. Click "Submit Artwork for Grading"
3. Verify modal indicates required submission

**Expected Result:**
- Submit button appears (not optional like Free Sketch)
- Modal shows mode type: "Art Story"
- Submission includes storyId in metadata

**Acceptance Criteria:** AC-25

---

## 5. Competition Mode (TC 5.1 - 5.10)

### TC 5.1: Competition Header Display
**Priority:** P0
**Steps:**
1. Click "Competition" mode pill
2. Verify competition header displays

**Expected Result:**
- Gradient background: pink-500 to purple-600
- Theme: "Animals in Nature"
- Description explains theme requirements
- White text on gradient background

**Acceptance Criteria:** AC-26

---

### TC 5.2: Countdown Timer Display
**Priority:** P0
**Steps:**
1. Verify countdown timer in top-right of header
2. Wait 1 second, verify timer updates

**Expected Result:**
- Timer displays format: "Xd Xh Xm Xs"
- Timer updates every second
- Background: white with opacity-20
- Large bold font for time remaining
- Label: "Time Remaining"

**Acceptance Criteria:** AC-27

---

### TC 5.3: Prize Structure Display
**Priority:** P0
**Steps:**
1. Verify prize badges below competition description

**Expected Result:**
- 3 prize badges displayed horizontally
- 🥇 1st Place: 500 Coins (yellow-400 background)
- 🥈 2nd Place: 300 Coins (gray-300 background)
- 🥉 3rd Place: 200 Coins (orange-300 background)
- Each shows medal emoji, place, and coin amount

**Acceptance Criteria:** AC-26

---

### TC 5.4: Competition Rules Display
**Priority:** P0
**Steps:**
1. Scroll to rules section
2. Verify all rules are listed

**Expected Result:**
- Section heading: "📋 Rules"
- 5 rules displayed as bullet list:
  - Must feature at least one animal
  - Must show natural environment
  - Original artwork only - no tracing
  - Must be created using Artweaver
  - One submission per student
- Gray-50 background, pink bullets

**Acceptance Criteria:** AC-26

---

### TC 5.5: Judging Criteria Display
**Priority:** P0
**Steps:**
1. Verify judging criteria section

**Expected Result:**
- Section heading: "⚖️ Judging Criteria"
- 4 criteria shown as blue pills:
  - Creativity
  - Technical Skill
  - Theme Adherence
  - Originality
- Judges listed: Coach Priya, Coach Amit, Coach Neha
- Blue-50 background

**Acceptance Criteria:** AC-26

---

### TC 5.6: Leaderboard Table Display
**Priority:** P0
**Steps:**
1. Scroll to leaderboard section
2. Verify table structure

**Expected Result:**
- Section heading: "🏆 Leaderboard"
- Total submissions shown: "23 entries"
- Table columns: Rank, Artist, Artwork, Votes
- White background, gray borders
- Header row: gray-50 background

**Acceptance Criteria:** AC-28

---

### TC 5.7: Leaderboard Top 5 Entries
**Priority:** P0
**Steps:**
1. Verify top 5 entries in leaderboard
2. Check medal emojis

**Expected Result:**
- 5 rows displayed
- Rank 1: 🥇 Ravi Kumar - 45 votes
- Rank 2: 🥈 Priya Singh - 42 votes
- Rank 3: 🥉 Amit Patel - 38 votes
- Ranks 4-5: No medal
- Each row shows: rank, name, artwork thumbnail (16x12), title, vote count
- Vote count has pink background badge with ❤️ icon

**Acceptance Criteria:** AC-28

---

### TC 5.8: Leaderboard Artwork Thumbnails
**Priority:** P1
**Steps:**
1. Verify artwork thumbnails in table
2. Check thumbnail sizing

**Expected Result:**
- Thumbnails: 64px wide, 48px tall (w-16 h-12)
- Border: gray-200, rounded
- Object-fit: cover
- Placeholder images load correctly

**Acceptance Criteria:** AC-28

---

### TC 5.9: Competition Canvas and Submission
**Priority:** P0
**Steps:**
1. Click "Launch Artweaver" button
2. Wait for canvas connection
3. Click "Submit Artwork for Grading"
4. Verify modal indicates competition entry

**Expected Result:**
- Canvas preview works same as other modes
- Submit button appears after canvas connection
- Modal shows mode: "Competition"
- Modal includes note: "Entry will be visible on leaderboard"
- Submission includes competitionId in metadata

**Acceptance Criteria:** AC-30

---

### TC 5.10: View All Entries Link
**Priority:** P1
**Steps:**
1. Look for "View All Entries" link or button near leaderboard

**Expected Result:**
- Note: Link not implemented in current version
- Leaderboard shows top 5 only
- Full gallery view deferred

**Acceptance Criteria:** AC-29 (not implemented)

---

## 6. Canvas Preview & Artweaver Integration (TC 6.1 - 6.8)

### TC 6.1: Canvas Preview Empty State
**Priority:** P0
**Steps:**
1. Navigate to any mode
2. Verify canvas preview before launching Artweaver

**Expected Result:**
- Large canvas area with border-2 pink-300
- Aspect ratio: 4/3, min-height: 400px
- Gray gradient background
- Centered content: 🎨 icon, text "Launch Artweaver to start drawing"
- Subtext: "Your artwork will appear here in real-time"

**Acceptance Criteria:** AC-12

---

### TC 6.2: Launch Artweaver Toast
**Priority:** P0
**Steps:**
1. Click "Launch Artweaver" button
2. Verify immediate feedback

**Expected Result:**
- Toast notification appears immediately
- Message: "🎨 Opening Artweaver... (Placeholder - requires Electron)"
- Toast has success styling (green)
- Toast auto-dismisses after 3 seconds

**Acceptance Criteria:** AC-05 (placeholder)

---

### TC 6.3: Connection Status Indicator
**Priority:** P0
**Steps:**
1. After launching, verify status indicator above canvas
2. Wait 3 seconds

**Expected Result:**
- Initially: 🟡 yellow dot + "Connecting to Artweaver..."
- After 3 seconds: 🟢 green dot + "Connected - Drawing in progress"
- Dot has animate-pulse effect
- Text is small (text-sm), gray-700 color

**Acceptance Criteria:** AC-11

---

### TC 6.4: Canvas Preview Connecting State
**Priority:** P0
**Steps:**
1. While connecting (first 3 seconds), verify canvas content

**Expected Result:**
- Spinning loader (border-b-2 pink-600, animate-spin)
- Text: "Connecting to Artweaver..."
- Subtext: "Start drawing in Artweaver to see it here"
- Centered layout

**Acceptance Criteria:** AC-10

---

### TC 6.5: Canvas Preview Connected State
**Priority:** P0
**Steps:**
1. After 3 seconds, verify canvas shows content

**Expected Result:**
- Placeholder content displays:
  - 🖼️ icon
  - Text: "Your artwork appears here"
  - Subtext: "(Real-time canvas mirroring requires Electron IPC)"
  - Info badges: Canvas Size (1024x768), Updated (Just now)
- White background
- Status indicators with colored dots

**Acceptance Criteria:** AC-09, AC-10

---

### TC 6.6: Last Update Timestamp
**Priority:** P1
**Steps:**
1. After canvas connects, verify timestamp below canvas

**Expected Result:**
- Text: "Updates every 2 seconds • Last updated: Just now"
- Text-xs, gray-500 color
- Displays polling interval information

**Acceptance Criteria:** AC-10

---

### TC 6.7: Graphics Pad Warning Message
**Priority:** P1
**Steps:**
1. Scroll to graphics pad info message below action buttons

**Expected Result:**
- Yellow-50 background, yellow-200 border
- ⚠️ icon
- Heading: "Graphics Pad Detection"
- Message explains USB detection requires Electron
- Notes mouse can still be used

**Acceptance Criteria:** AC-06, AC-08

---

### TC 6.8: Canvas Responsive Scaling
**Priority:** P1
**Steps:**
1. Resize browser window to smaller width
2. Verify canvas scales proportionally

**Expected Result:**
- Canvas maintains 4:3 aspect ratio
- Canvas scales down on smaller screens
- No horizontal scrolling
- Min-height maintained at 400px

**Acceptance Criteria:** AC-13

---

## 7. Submission Flow (TC 7.1 - 7.6)

### TC 7.1: Submit Button Before Canvas
**Priority:** P0
**Steps:**
1. Navigate to any mode
2. Verify submit button is NOT visible before launching Artweaver

**Expected Result:**
- No submit button visible
- Only "Launch Artweaver" button shows
- Message: "Launch Artweaver to start drawing"

**Acceptance Criteria:** AC-17

---

### TC 7.2: Submit Button After Canvas Connection
**Priority:** P0
**Steps:**
1. Launch Artweaver, wait for canvas connection
2. Verify submit button appears

**Expected Result:**
- "✓ Submit Artwork for Grading" button appears
- Button styling: blue-600, px-6 py-3, font-semibold, rounded-lg
- Hover state: blue-700
- Button positioned below canvas preview

**Acceptance Criteria:** AC-17, AC-31

---

### TC 7.3: Submission Modal Open
**Priority:** P0
**Steps:**
1. Click "Submit Artwork for Grading" button
2. Verify modal opens

**Expected Result:**
- Modal overlay: black 50% opacity, z-50
- Modal card: white, rounded-lg, shadow-xl
- Modal header: pink-600 background, white text
- Header title: "Submit Artwork"
- Header subtitle: "Submit your artwork for coach review"

**Acceptance Criteria:** AC-31

---

### TC 7.4: Submission Modal Content
**Priority:** P0
**Steps:**
1. Open submission modal
2. Verify all content sections

**Expected Result:**
- Title input field (optional): "Artwork Title (Optional)"
- Submission details section:
  - Type: [Workshop/Free Sketch/Art Story/Competition]
  - Coach will review your artwork
  - You'll receive feedback and a grade
  - (Competition) Entry will be visible on leaderboard
- Canvas preview placeholder (200px height, 4:3 ratio)
- Warning message: "⚠️ Make sure you've saved your work in Artweaver before submitting!"

**Acceptance Criteria:** AC-32

---

### TC 7.5: Submit with Title
**Priority:** P0
**Steps:**
1. Open submission modal
2. Enter title: "My Beautiful Artwork"
3. Click "✓ Confirm Submission"

**Expected Result:**
- Toast message: "[Mode] artwork submitted successfully!"
- Modal closes
- Page refreshes data (onRefresh called)
- Title included in submission metadata

**Acceptance Criteria:** AC-33, AC-34

---

### TC 7.6: Cancel Submission
**Priority:** P0
**Steps:**
1. Open submission modal
2. Click "Cancel" button

**Expected Result:**
- Modal closes immediately
- No submission occurs
- Canvas preview remains active
- Submit button still visible

**Acceptance Criteria:** AC-31

---

## 8. API Endpoints (TC 8.1 - 8.3)

### TC 8.1: GET Art Course Data
**Priority:** P0
**Steps:**
1. Open Network tab
2. Navigate to Art Course page
3. Verify API call

**Expected Result:**
- Request: GET `/api/v2/lms/student/student123/courses/art`
- Status: 200 OK
- Response includes:
  - success: true
  - modes array with 4 objects (workshops, art_stories, competition, free_sketch)
  - Each mode has correct data structure
- Workshops: 3 workshops with video URLs
- Art Stories: 3 stories with text and prompts
- Competition: leaderboard, prize, rules
- Free Sketch: gallery with 3 artworks

**Acceptance Criteria:** Backend API implementation

---

### TC 8.2: POST Submit Artwork
**Priority:** P0
**Steps:**
1. Launch Artweaver, wait for canvas
2. Open submission modal
3. Submit artwork
4. Verify API call in Network tab

**Expected Result:**
- Request: POST `/api/v2/lms/student/student123/courses/art/submissions`
- Request body includes:
  - type: "art"
  - mode: [workshop/free_sketch/art_story/competition]
  - metadata: { workshopId/storyId/competitionId, title }
- Status: 200 OK
- Response includes:
  - success: true
  - submissionId
  - fileUrl (mock S3 URL)
  - message: "Artwork submitted successfully! Your coach will review it soon."

**Acceptance Criteria:** Backend API implementation

---

### TC 8.3: POST Save to Gallery
**Priority:** P0
**Steps:**
1. In Free Sketch mode, click "Save to My Gallery"
2. Verify API call

**Expected Result:**
- Request: POST `/api/v2/lms/student/student123/courses/art/gallery`
- Request body includes:
  - title, canvasSize, sessionDuration
- Status: 200 OK
- Response includes:
  - success: true
  - artwork object with id, artworkUrl, createdAt

**Acceptance Criteria:** Backend API implementation

---

## 9. Error Handling (TC 9.1 - 9.4)

### TC 9.1: API Fetch Failure
**Priority:** P1
**Steps:**
1. Simulate network failure (DevTools offline mode)
2. Refresh Art Course page

**Expected Result:**
- Loading spinner shows initially
- Toast error: "Failed to load Art Course data"
- Console error logged
- Page doesn't crash

**Acceptance Criteria:** Error handling

---

### TC 9.2: Empty Data Handling
**Priority:** P1
**Steps:**
1. Mock API to return empty workshops array
2. Refresh Workshops mode

**Expected Result:**
- Message displays: "No workshops available"
- Page doesn't crash
- Mode pills still work

**Acceptance Criteria:** Error handling

---

### TC 9.3: Submit Before Canvas Content
**Priority:** P1
**Steps:**
1. Try to call submit before launching Artweaver
2. Verify validation

**Expected Result:**
- Submit button not visible before canvas connection
- If somehow triggered, toast error: "Please create some artwork before submitting"

**Acceptance Criteria:** AC-17

---

### TC 9.4: Save Before Canvas Content
**Priority:** P1
**Steps:**
1. In Free Sketch mode, try to save before launching Artweaver
2. Verify validation

**Expected Result:**
- Save button not visible before canvas connection
- If somehow triggered, toast error: "Nothing to save yet"

**Acceptance Criteria:** AC-19

---

## 10. Responsive Design (TC 10.1 - 10.3)

### TC 10.1: Desktop Layout (1366x768)
**Priority:** P0
**Steps:**
1. Set browser to 1366x768
2. Navigate through all modes

**Expected Result:**
- All content fits without horizontal scrolling
- Mode pills displayed horizontally
- Canvas preview fills space appropriately
- Gallery grid shows 4 columns
- Leaderboard table fits without truncation
- Max-width container (max-w-6xl) centers content

**Acceptance Criteria:** Desktop layout requirement

---

### TC 10.2: Tablet Layout (768px - 1023px)
**Priority:** P1
**Steps:**
1. Resize to 768px width
2. Test all modes

**Expected Result:**
- Mode pills may wrap to 2 rows
- Canvas preview scales down
- Gallery grid shows 3 columns
- Leaderboard table still readable
- No horizontal scrolling

**Acceptance Criteria:** Responsive design (deferred per story)

---

### TC 10.3: Mobile Layout (< 768px)
**Priority:** P1
**Steps:**
1. Resize to 375px width (mobile)
2. Test navigation

**Expected Result:**
- Mode pills stack vertically or wrap
- Canvas preview scales to mobile width
- Gallery grid shows 2 columns
- Leaderboard may require horizontal scroll or card layout
- Touch-friendly button sizes

**Acceptance Criteria:** Responsive design (deferred per story)

---

## 11. Performance (TC 11.1 - 11.3)

### TC 11.1: Initial Page Load Time
**Priority:** P1
**Steps:**
1. Clear cache
2. Navigate to `/student/art`
3. Measure load time with DevTools

**Expected Result:**
- Page loads in < 3 seconds
- API call completes in < 1 second
- Loading spinner shows during fetch
- Smooth transition to content

**Acceptance Criteria:** Performance requirement

---

### TC 11.2: Mode Switching Performance
**Priority:** P1
**Steps:**
1. Rapidly switch between all 4 modes
2. Verify no lag or freezing

**Expected Result:**
- Mode switching is instant (< 100ms)
- No visual lag
- React state updates smoothly
- No console errors

**Acceptance Criteria:** Performance requirement

---

### TC 11.3: Video/Audio Player Loading
**Priority:** P1
**Steps:**
1. Switch to Workshops mode
2. Wait for video to load
3. Switch to Art Stories mode
4. Check audio player

**Expected Result:**
- Video iframe loads asynchronously
- Page remains responsive during video load
- Audio player loads without blocking UI
- Placeholder shows during load

**Acceptance Criteria:** Performance requirement

---

## 12. Accessibility (TC 12.1 - 12.3)

### TC 12.1: Keyboard Navigation
**Priority:** P1
**Steps:**
1. Use Tab key to navigate through mode pills
2. Press Enter to select mode
3. Navigate to buttons with Tab

**Expected Result:**
- All interactive elements are keyboard accessible
- Tab order is logical (top to bottom, left to right)
- Focus indicators visible
- Enter/Space activates buttons

**Acceptance Criteria:** Accessibility requirement

---

### TC 12.2: ARIA Attributes
**Priority:** P1
**Steps:**
1. Inspect mode pills in DevTools
2. Check for ARIA attributes

**Expected Result:**
- Mode pills have aria-label: "Switch to [Mode] mode"
- Mode pills have aria-selected: true/false
- Submit button has descriptive aria-label
- Modal has proper focus trap

**Acceptance Criteria:** Accessibility requirement

---

### TC 12.3: Screen Reader Compatibility
**Priority:** P1
**Steps:**
1. Enable screen reader (NVDA/JAWS)
2. Navigate through Art Course page

**Expected Result:**
- Page structure announced correctly
- Mode pills announced with current selection state
- Canvas preview state changes announced
- Modal content readable by screen reader

**Acceptance Criteria:** Accessibility requirement

---

## 13. Known Limitations & Deferred Features

### Electron IPC Features (Deferred)
- **AC-05:** Real Artweaver launch via Electron IPC
- **AC-06:** USB graphics pad detection
- **AC-08:** Artweaver launch error handling with retry
- **AC-09-10:** Real-time canvas screenshot polling (2-second interval)
- **AC-33-34:** Actual screenshot capture and S3 upload

**Current Implementation:**
- Placeholder toast notifications
- Mock canvas preview after 3-second delay
- Info messages explaining Electron requirement

### Progress Tracking (Deferred)
- Workshop completion tracking
- Story completion tracking
- Gallery sync with backend database
- Real artwork file uploads

**Current Implementation:**
- Mock submission responses
- Static mock data for progress indicators

### Advanced Features (Deferred)
- **AC-29:** View all competition entries gallery
- **AC-35:** Custom canvas size input
- Canvas size selection affecting Artweaver window size
- Real-time vote counting in competition leaderboard
- Audio narration for Art Stories (audioUrl null in mock data)

---

## Test Summary

**Total Test Cases:** 63
**Priority Breakdown:**
- P0 (Critical): 48 test cases
- P1 (High): 15 test cases

**Coverage:**
- Mode Selection: 5 tests
- Workshops Mode: 8 tests
- Free Sketch Mode: 7 tests
- Art Stories Mode: 7 tests
- Competition Mode: 10 tests
- Canvas Preview: 8 tests
- Submission Flow: 6 tests
- API Endpoints: 3 tests
- Error Handling: 4 tests
- Responsive Design: 3 tests
- Performance: 3 tests
- Accessibility: 3 tests

**Expected Pass Rate for MVP:** 90%+ (P0 tests)
**Deferred Features:** Electron IPC integration, real file uploads, progress tracking

---

**Last Updated:** 2025-10-27 (Generated by Dev Agent)
**Test Environment:** Desktop Chrome/Edge, 1366x768
**Node Version:** v22.14.0
**React Version:** Latest

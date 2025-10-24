# Epic 01 - Story 03: Art Course + Artweaver Integration

**Story ID:** SPRINT2-E01-S03
**Epic:** Epic 01 - LMS Student Experience
**Story:** Art Course + Artweaver Integration
**Priority:** Critical (P0)
**Estimated Effort:** 10-12 hours
**Assigned To:** [Dev Team]
**Status:** Ready for Development
**Created:** 2025-10-24 14:41:07
**Last Updated:** 2025-10-24 14:41:07

---

## 1. Story Description

Create the Art Course interface with four distinct modes and seamless Artweaver integration:
- **Workshops:** Guided art lessons with instructor videos
- **Free Sketch:** Open canvas for creative expression
- **Art Stories:** Drawing based on story prompts
- **Competition:** Themed art contests with leaderboard

Students use USB graphics pads with Artweaver (external drawing application). Real-time canvas mirroring displays artwork in ISF Playground. Completed artwork is submitted to coaches for grading.

### User Story
**As a** Student
**I want** to create digital artwork using Artweaver and my graphics pad
**So that** I can complete art lessons and get graded by my coach

---

## 1.5. Visual Layout Diagrams

### 1.5.1. Full Art Course Page Layout (Desktop 1366x768)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Title Bar (persistent from Story 01)                                                │
│ Toolbar (persistent from Story 01)                                                  │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  ART COURSE                                                                         │
│  ┌────────────┬────────────┬────────────┬────────────┐                            │
│  │ Workshops  │Free Sketch │Art Stories │Competition │  ← Mode Pills               │
│  │ (Active)   │            │            │            │     Pink theme              │
│  └────────────┴────────────┴────────────┴────────────┘                            │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  Workshop: "Drawing Faces"                                                           │
│  Instructor: Coach Priya                                                             │
│                                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │ [▶️ Play Video Tutorial]                                                      │   │ ← Video Player
│  │                                                                               │   │    (16:9 ratio)
│  │         [Video Preview: Coach demonstrating face drawing]                    │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  Instructions:                                                                        │
│  1. Watch the video tutorial                                                         │
│  2. Open Artweaver and follow along                                                  │
│  3. Draw a human face with proper proportions                                        │
│  4. Use your graphics pad for smooth lines                                           │
│                                                                                       │
│  ┌────────────────────────────────────┐                                             │
│  │ [🎨 Launch Artweaver]              │                                             │ ← Launch Button
│  │ Purple button (px-8 py-4)          │                                             │    (primary action)
│  └────────────────────────────────────┘                                             │
│                                                                                       │
│  Canvas Preview (Real-time mirroring):                                               │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                               │   │
│  │                                                                               │   │
│  │                  [Real-time canvas from Artweaver]                            │   │ ← Canvas Mirror
│  │                  Updates every 2 seconds                                      │   │    (1024x768)
│  │                                                                               │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  ┌────────────────────────────────────┐                                             │
│  │ [✓ Submit Artwork for Grading]     │                                             │ ← Submit Button
│  │ Blue button (px-8 py-4)            │                                             │    (after canvas
│  └────────────────────────────────────┘                                             │     has content)
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
                Desktop View (1366x768) - Max Width 1024px Container
```

---

### 1.5.2. Mode Pills Detailed Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐                     │
│  │  Workshops   │ Free Sketch  │ Art Stories  │ Competition  │                     │
│  │  (Active)    │              │              │              │                     │
│  │  bg-pink-600 │  bg-white    │  bg-white    │  bg-white    │                     │
│  │  text-white  │  text-gray   │  text-gray   │  text-gray   │                     │
│  │  px-6 py-3   │  px-6 py-3   │  px-6 py-3   │  px-6 py-3   │                     │
│  │  rounded-lg  │  rounded-lg  │  rounded-lg  │  rounded-lg  │                     │
│  │  border none │  border-2    │  border-2    │  border-2    │                     │
│  └──────────────┴──────────────┴──────────────┴──────────────┘                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
        Height: 48px each
        Gap: gap-2 (8px between pills)
        Hover: bg-pink-100 (inactive pills)
        Active: bg-pink-600 white text, no border
        Inactive: bg-white, border-2 pink-300, text-gray-700
```

---

### 1.5.3. Workshops Mode Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  WORKSHOPS MODE                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  Workshop Title: "Drawing Faces"                                                     │
│  Instructor: Coach Priya                                                             │
│  Duration: 45 minutes                                                                │
│  Level: Beginner                                                                     │
│                                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                               │   │
│  │             [▶️ Video Player - 16:9 Aspect Ratio]                             │   │
│  │                                                                               │   │
│  │         [Play/Pause] [Volume] [Fullscreen] [Progress: 00:12:34 / 00:45:00]  │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  Instructions:                                                                        │
│  • Watch the video tutorial (text-base, gray-700)                                   │
│  • Follow along with your own canvas                                                 │
│  • Pause and rewind as needed                                                        │
│                                                                                       │
│  [🎨 Launch Artweaver]  ← Purple button, font-bold, px-8 py-4                       │
│                                                                                       │
│  Canvas Preview:                                                                      │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │ [Real-time preview from Artweaver]                                           │   │
│  │ Updates every 2 seconds via screenshot polling                               │   │
│  │ 1024x768 resolution                                                          │   │
│  │ Border: 2px pink-300                                                         │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  [✓ Submit Artwork for Grading]  ← Blue button, disabled until canvas has content   │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 1.5.4. Free Sketch Mode Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  FREE SKETCH MODE                                                                   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  Create anything you like! Let your imagination run wild.                            │
│  No rules, no instructions - just pure creativity.                                   │
│                                                                                       │
│  Canvas Size: [1024x768 ▼]  ← Dropdown (1024x768, 1920x1080, Custom)               │
│                                                                                       │
│  [🎨 Launch Artweaver]  ← Purple button                                             │
│                                                                                       │
│  Canvas Preview:                                                                      │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                               │   │
│  │                  [Real-time preview from Artweaver]                           │   │
│  │                                                                               │   │
│  │                  Empty state: "Start drawing!"                                │   │
│  │                                                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  [💾 Save to My Gallery]  [✓ Submit for Grading (Optional)]                         │
│   Gray button            Blue button                                                │
│                                                                                       │
│  My Gallery:                                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                           │
│  │ [Image]  │  │ [Image]  │  │ [Image]  │  │ [+ New]  │                           │
│  │ 10/24    │  │ 10/23    │  │ 10/22    │  │          │                           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘                           │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 1.5.5. Art Stories Mode Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  ART STORIES MODE                                                                   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  Story: "The Magical Forest"                                                         │
│                                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │ [▶️ Listen to Story Audio]                                                    │   │
│  │                                                                               │   │
│  │ Once upon a time, in a magical forest, there lived a wise old owl            │   │
│  │ who could speak to all the animals. One day, a young rabbit came              │   │
│  │ to ask for advice...                                                          │   │
│  │                                                                               │   │
│  │ [Progress: ▓▓▓▓▓▓░░░░ 00:02:45 / 00:05:00]                                  │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  Drawing Prompt:                                                                      │
│  Draw the magical forest with the wise old owl and the young rabbit.                 │
│  Include trees, flowers, and other animals.                                          │
│                                                                                       │
│  [🎨 Launch Artweaver]                                                               │
│                                                                                       │
│  Canvas Preview:                                                                      │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │ [Real-time preview from Artweaver]                                           │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  [✓ Submit Artwork for Grading]                                                      │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 1.5.6. Competition Mode Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  COMPETITION MODE                                                                   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│  Current Competition: "Animals in Nature"                                            │
│  Theme: Draw your favorite animal in its natural habitat                             │
│  Deadline: October 30, 2025 - 11:59 PM                                              │
│  Prize: 500 coins for 1st place, 300 for 2nd, 200 for 3rd                          │
│                                                                                       │
│  ⏰ Time Remaining: 5 days, 14 hours                                                │
│                                                                                       │
│  [🎨 Launch Artweaver]                                                               │
│                                                                                       │
│  Canvas Preview:                                                                      │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │ [Real-time preview from Artweaver]                                           │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  [✓ Submit Entry]  ← Blue button, submits to competition                            │
│                                                                                       │
│  Current Leaderboard:                                                                │
│  ┌──────────────────────────────────────────────────────────────────────────────┐   │
│  │ 🥇 1. Priya Singh - 1,500 coins                                              │   │
│  │ 🥈 2. Amit Patel - 1,250 coins                                               │   │
│  │ 🥉 3. Neha Gupta - 1,100 coins                                               │   │
│  │    4. Ravi Kumar - 980 coins                                                 │   │
│  │    5. Suresh Kumar - 850 coins                                               │   │
│  └──────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                       │
│  [View All Entries (Gallery)]                                                        │
│                                                                                       │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 1.5.7. Canvas Mirror Implementation

```
┌────────────────────────────────────────────────────────────────────────────────┐
│  CANVAS PREVIEW WINDOW (Inside ISF Playground)                                 │
│  Border: 2px solid pink-300                                                    │
│  Background: gray-50 (when empty), transparent (when showing canvas)          │
│  Aspect Ratio: 4:3 (matching Artweaver default canvas)                        │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                         │   │
│  │                                                                         │   │
│  │                [Screenshot of Artweaver Canvas]                        │   │
│  │                Updated every 2 seconds                                 │   │
│  │                (via Electron IPC or screenshot polling)                │   │
│  │                                                                         │   │
│  │                                                                         │   │
│  └────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  Status: [🟢 Connected] or [🔴 Disconnected]  ← Connection indicator          │
│  Last Update: 2 seconds ago                   ← Timestamp                      │
│                                                                                 │
│  Empty State (when no canvas):                                                 │
│  ┌────────────────────────────────────────────────────────────────────────┐   │
│  │                                                                         │   │
│  │                          🎨                                             │   │
│  │                  Start drawing in Artweaver                            │   │
│  │                  Your canvas will appear here                          │   │
│  │                                                                         │   │
│  └────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
        Width: 1024px (max)
        Height: 768px (max, maintaining aspect ratio)
        Responsive: Scales down on smaller screens
```

---

### 1.5.8. Submission Flow Diagram

```
┌────────────────────────────────────────────────────────────────────────────────┐
│  ARTWORK SUBMISSION FLOW                                                        │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Step 1: Canvas has content                                                     │
│  ├─ "Submit" button enabled (blue-600)                                         │
│  │                                                                              │
│  Step 2: Click "Submit Artwork for Grading"                                     │
│  ├─ Modal opens: "Confirm Submission"                                          │
│  │   ┌──────────────────────────────────────────────────────────┐             │
│  │   │ Are you sure you want to submit this artwork?            │             │
│  │   │                                                           │             │
│  │   │ [Preview of canvas]                                      │             │
│  │   │                                                           │             │
│  │   │ [Cancel]  [Yes, Submit]                                  │             │
│  │   └──────────────────────────────────────────────────────────┘             │
│  │                                                                              │
│  Step 3: Capture final canvas screenshot                                        │
│  ├─ Loading state: "Capturing artwork..."                                      │
│  │                                                                              │
│  Step 4: Upload to S3                                                           │
│  ├─ Loading state: "Uploading... 67%"                                          │
│  │   Progress bar displays upload progress                                     │
│  │                                                                              │
│  Step 5: Save submission record to database                                     │
│  ├─ POST /api/v2/lms/student/:studentId/submissions                            │
│  │   { type: "art", fileUrl: "s3://...", mode: "workshop", ... }              │
│  │                                                                              │
│  Step 6: Success notification                                                   │
│  └─ Toast: "Artwork submitted! Coach Priya will grade it soon."                │
│     Auto-close Artweaver (optional)                                            │
│                                                                                 │
└────────────────────────────────────────────────────────────────────────────────┘
```

---

### 1.5.9. Responsive Layout Variations

#### **Desktop (1366x768):**
- Full layout with canvas preview
- Video player 16:9 ratio
- Canvas mirror 1024x768

#### **Tablet (768px - 1023px):**
- Stacked layout
- Video player full width
- Canvas mirror scaled to fit (max 768px width)
- Mode pills scroll horizontally

#### **Mobile (< 768px):**
- Single column layout
- Mode pills as vertical list
- Canvas mirror scaled to fit screen
- Submit button sticky at bottom

---

### 1.5.10. Component Spacing & Measurements Summary

| Element | Width | Height | Padding | Margin | Border |
|---------|-------|--------|---------|--------|--------|
| Mode Pills | Auto (px-6) | 48px | px-6 py-3 | gap-2 | 2px (inactive) |
| Video Player | 100% (max 896px) | Auto (16:9) | - | mb-6 | 1px gray-300 |
| Launch Button | Auto (px-8) | 56px | px-8 py-4 | my-4 | - |
| Canvas Preview | 1024px (max) | 768px (max) | - | my-6 | 2px pink-300 |
| Submit Button | Auto (px-8) | 56px | px-8 py-4 | mt-4 | - |
| Gallery Thumbnail | 200px | 150px | p-2 | mr-4 | 1px gray-200 |

---

## 2. Acceptance Criteria

### 2.1. Mode Selection
- [ ] **AC-01:** 4 mode pills display: Workshops, Free Sketch, Art Stories, Competition
- [ ] **AC-02:** Clicking mode pill switches to respective mode
- [ ] **AC-03:** Active mode pill has pink-600 background, white text
- [ ] **AC-04:** Inactive mode pills have white background, border-2 pink-300

### 2.2. Artweaver Integration
- [ ] **AC-05:** "Launch Artweaver" button opens Artweaver via Electron IPC
- [ ] **AC-06:** USB graphics pad is detected and works with Artweaver
- [ ] **AC-07:** Canvas size defaults to 1024x768 (adjustable in Free Sketch mode)
- [ ] **AC-08:** Artweaver launch failure displays error message with retry button

### 2.3. Canvas Mirroring
- [ ] **AC-09:** Canvas preview displays in ISF Playground
- [ ] **AC-10:** Canvas updates every 2 seconds via screenshot polling
- [ ] **AC-11:** Connection status indicator displays (🟢 Connected or 🔴 Disconnected)
- [ ] **AC-12:** Empty state displays "Start drawing in Artweaver" when no canvas
- [ ] **AC-13:** Canvas preview scales responsively on smaller screens

### 2.4. Workshops Mode
- [ ] **AC-14:** Video player displays workshop tutorial
- [ ] **AC-15:** Video controls work (play, pause, volume, fullscreen, seek)
- [ ] **AC-16:** Instructions display below video
- [ ] **AC-17:** Submit button enabled after canvas has content

### 2.5. Free Sketch Mode
- [ ] **AC-18:** Canvas size selector displays with dropdown options
- [ ] **AC-19:** "Save to My Gallery" button saves artwork locally
- [ ] **AC-20:** Gallery displays saved artworks with thumbnails
- [ ] **AC-21:** "Submit for Grading" is optional in Free Sketch mode

### 2.6. Art Stories Mode
- [ ] **AC-22:** Audio player plays story narration
- [ ] **AC-23:** Story text displays on screen
- [ ] **AC-24:** Drawing prompt displays after story
- [ ] **AC-25:** Submit button required after completing drawing

### 2.7. Competition Mode
- [ ] **AC-26:** Current competition details display (theme, deadline, prize)
- [ ] **AC-27:** Countdown timer displays time remaining
- [ ] **AC-28:** Leaderboard displays top 5 entries
- [ ] **AC-29:** "View All Entries" opens gallery of all submissions
- [ ] **AC-30:** Submit button submits entry to competition

### 2.8. Submission Flow
- [ ] **AC-31:** Clicking "Submit" opens confirmation modal
- [ ] **AC-32:** Modal displays canvas preview
- [ ] **AC-33:** Confirming submission captures final screenshot
- [ ] **AC-34:** Screenshot uploads to S3 with progress indicator
- [ ] **AC-35:** Submission record saved to database
- [ ] **AC-36:** Success toast displays: "Artwork submitted!"
- [ ] **AC-37:** Offline submissions queue for sync when online

---

## 3. Task Breakdown (22 tasks)

### Phase 1: Mode Structure & Navigation (Tasks 1-3)

**Task 1: Create ArtCoursePage Component with Mode Pills**
- File: `frontend/src/pages/student/ArtCoursePage.js`
- Create 4 mode pills: Workshops, Free Sketch, Art Stories, Competition
- Add click handlers to switch modes
- Highlight active mode with pink-600 background
- **Estimated Time:** 30 minutes

**Task 2: Create Mode-Specific Components**
- Files:
  - `frontend/src/components/student/art/WorkshopsMode.js`
  - `frontend/src/components/student/art/FreeSketchMode.js`
  - `frontend/src/components/student/art/ArtStoriesMode.js`
  - `frontend/src/components/student/art/CompetitionMode.js`
- Create skeleton components for each mode
- **Estimated Time:** 30 minutes

**Task 3: Implement Mode Routing & State Management**
- Use React state to track active mode
- Conditional rendering based on active mode
- Persist mode selection in localStorage (resume last mode on page load)
- **Estimated Time:** 20 minutes

---

### Phase 2: Artweaver Launch via Electron IPC (Tasks 4-7)

**Task 4: Set Up Electron IPC Handler for Artweaver Launch**
- File: `electron/main.js`
- Add IPC listener: `ipcMain.on('launch-artweaver', (event, { canvasSize }) => { ... })`
- Use `child_process.spawn()` to launch Artweaver executable
- Detect Artweaver installation path (Windows: Program Files, Mac: Applications)
- Return success/failure to renderer process
- **Estimated Time:** 45 minutes

**Task 5: Implement Artweaver Launch Button in Frontend**
- "Launch Artweaver" button (purple-600, px-8 py-4, font-bold)
- Use `ipcRenderer.send('launch-artweaver', { canvasSize: { width: 1024, height: 768 } })`
- Display loading state: "Launching Artweaver..."
- Display error message with retry button if launch fails
- **Estimated Time:** 30 minutes

**Task 6: Detect USB Graphics Pad**
- Check if USB graphics pad is connected
- Display warning message if pad not detected: "Graphics pad not found. You can still use your mouse."
- Artweaver should automatically detect graphics pad when connected
- **Estimated Time:** 30 minutes

**Task 7: Track Artweaver Session Duration**
- Start timer when Artweaver launches
- Stop timer when Artweaver closes (detect process exit)
- Save session duration to API: `POST /api/v2/lms/student/:studentId/art-session`
- **Estimated Time:** 30 minutes

---

### Phase 3: Canvas Mirroring (Tasks 8-10)

**Task 8: Implement Screenshot Polling for Canvas Preview**
- Use Electron IPC or screenshot library to capture Artweaver window
- Poll every 2 seconds: `setInterval(() => { captureArtweaverCanvas() }, 2000)`
- Send screenshot data to renderer process
- **Estimated Time:** 1 hour

**Task 9: Display Canvas Preview in ISF Playground**
- File: `frontend/src/components/student/art/CanvasPreview.js`
- Display captured screenshot in canvas preview area
- Empty state: "Start drawing in Artweaver" (gray text, centered)
- Connection status indicator: 🟢 Connected or 🔴 Disconnected
- Last update timestamp: "Updated 2 seconds ago"
- **Estimated Time:** 45 minutes

**Task 10: Handle Canvas Preview Errors**
- If screenshot capture fails, display error: "Canvas preview unavailable. Continue drawing in Artweaver."
- Retry button attempts to re-establish connection
- **Estimated Time:** 20 minutes

---

### Phase 4: Workshops Mode (Tasks 11-12)

**Task 11: Implement Video Player for Tutorials**
- Use HTML5 video player or React video library (e.g., react-player)
- Video controls: play, pause, volume, fullscreen, seek
- Video progress bar with timestamp (00:12:34 / 00:45:00)
- **Estimated Time:** 45 minutes

**Task 12: Implement Workshops Mode Layout**
- Display workshop title, instructor name, duration, level
- Instructions section below video
- Launch Artweaver button
- Canvas preview
- Submit button (enabled after canvas has content)
- **Estimated Time:** 30 minutes

---

### Phase 5: Free Sketch Mode (Tasks 13-14)

**Task 13: Implement Canvas Size Selector**
- Dropdown with options: 1024x768, 1920x1080, Custom
- Pass canvas size to Artweaver on launch
- Default: 1024x768
- **Estimated Time:** 20 minutes

**Task 14: Implement Gallery for Saved Artworks**
- "Save to My Gallery" button saves current canvas screenshot to localStorage
- Display gallery grid with thumbnails (200px × 150px)
- Clicking thumbnail opens full-size artwork in modal
- **Estimated Time:** 45 minutes

---

### Phase 6: Art Stories Mode (Tasks 15-16)

**Task 15: Implement Audio Player for Story Narration**
- Use HTML5 audio player
- Story text displayed on screen (synced with audio or full text)
- Audio controls: play, pause, seek, volume
- **Estimated Time:** 30 minutes

**Task 16: Implement Art Stories Mode Layout**
- Display story title
- Audio player
- Story text (scrollable if long)
- Drawing prompt section
- Launch Artweaver button
- Canvas preview
- Submit button
- **Estimated Time:** 30 minutes

---

### Phase 7: Competition Mode (Tasks 17-18)

**Task 17: Implement Competition Details & Countdown**
- Display current competition theme, deadline, prize
- Countdown timer: "5 days, 14 hours remaining"
- Update countdown every minute
- **Estimated Time:** 30 minutes

**Task 18: Implement Competition Leaderboard & Gallery**
- Display top 5 entries with rank, name, coins
- "View All Entries" button opens gallery modal
- Gallery displays all submissions as thumbnails
- **Estimated Time:** 45 minutes

---

### Phase 8: Submission Flow (Tasks 19-21)

**Task 19: Implement Submission Confirmation Modal**
- Modal displays: "Are you sure you want to submit?"
- Canvas preview (thumbnail of current artwork)
- Cancel button closes modal
- "Yes, Submit" button proceeds with submission
- **Estimated Time:** 30 minutes

**Task 20: Implement Canvas Capture & S3 Upload**
- Capture final screenshot of Artweaver canvas
- Upload to S3 with progress indicator: "Uploading... 67%"
- Use multipart upload for large files
- **Estimated Time:** 1 hour

**Task 21: Save Submission Record & Display Success**
- API endpoint: `POST /api/v2/lms/student/:studentId/submissions`
- Request body: `{ type: "art", fileUrl: "s3://...", mode: "workshop", metadata: { ... } }`
- Display success toast: "Artwork submitted! Coach will grade it soon."
- Auto-close Artweaver (optional, user preference)
- **Estimated Time:** 30 minutes

---

### Phase 9: Testing & Polish (Task 22)

**Task 22: End-to-End Testing**
- Test all 4 modes (Workshops, Free Sketch, Art Stories, Competition)
- Test Artweaver launch on Windows
- Test USB graphics pad detection
- Test canvas mirroring (2-second updates)
- Test submission flow (capture, upload, save)
- Test offline mode (queue submissions)
- Test responsive layout (desktop, tablet, mobile)
- Fix any visual bugs or layout issues
- **Estimated Time:** 2 hours

---

## 4. API Endpoints

### 4.1. Art Course Data

**GET `/api/v2/lms/student/:studentId/courses/art`**
- **Response:**
```json
{
  "modes": [
    {
      "mode": "workshops",
      "workshops": [
        {
          "id": "workshop1",
          "title": "Drawing Faces",
          "instructor": "Coach Priya",
          "duration": 45,
          "level": "Beginner",
          "videoUrl": "https://s3.amazonaws.com/...",
          "instructions": "Watch the video and follow along..."
        }
      ]
    },
    {
      "mode": "art_stories",
      "stories": [
        {
          "id": "story1",
          "title": "The Magical Forest",
          "audioUrl": "https://s3.amazonaws.com/...",
          "storyText": "Once upon a time...",
          "prompt": "Draw the magical forest..."
        }
      ]
    },
    {
      "mode": "competition",
      "currentCompetition": {
        "id": "comp1",
        "theme": "Animals in Nature",
        "deadline": "2025-10-30T23:59:59Z",
        "prize": { "first": 500, "second": 300, "third": 200 },
        "leaderboard": [...]
      }
    }
  ]
}
```

**POST `/api/v2/lms/student/:studentId/submissions`**
- **Request:** Multipart form-data
  - `file`: Artwork image
  - `type`: "art"
  - `mode`: "workshop" | "free_sketch" | "art_story" | "competition"
  - `metadata`: JSON { workshopId, storyId, competitionId, sessionDuration }
- **Response:**
```json
{
  "success": true,
  "submissionId": "sub123",
  "fileUrl": "https://s3.amazonaws.com/...",
  "message": "Artwork submitted successfully!"
}
```

---

## 5. File Paths

**Frontend Files:**
- `frontend/src/pages/student/ArtCoursePage.js`
- `frontend/src/components/student/art/WorkshopsMode.js`
- `frontend/src/components/student/art/FreeSketchMode.js`
- `frontend/src/components/student/art/ArtStoriesMode.js`
- `frontend/src/components/student/art/CompetitionMode.js`
- `frontend/src/components/student/art/CanvasPreview.js`
- `frontend/src/components/student/art/SubmissionModal.js`

**Backend Files:**
- `backend/routes/v2/lms/student.js` (Add art routes)
- `backend/controllers/artCourseController.js`

**Electron Files:**
- `electron/main.js` (Add Artweaver launch handler)

---

## 6. Definition of Done

- [ ] All 22 tasks completed
- [ ] All 37 acceptance criteria met
- [ ] Artweaver launches successfully on Windows
- [ ] USB graphics pad detected and works
- [ ] Canvas mirroring updates every 2 seconds
- [ ] All 4 modes functional
- [ ] Submission flow tested end-to-end
- [ ] Offline submissions queue for sync
- [ ] Responsive design tested
- [ ] Code reviewed and merged

---

**Status:** Ready for Development
**Last Updated:** 2025-10-24 14:41:07

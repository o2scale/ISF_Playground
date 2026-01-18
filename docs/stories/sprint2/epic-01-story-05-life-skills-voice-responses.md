# Epic 01 - Story 05: Life Skills Voice Responses

**Story ID:** SPRINT2-EPIC01-STORY05
**Epic:** Epic 01 - LMS Student Experience
**Sprint:** Sprint 2
**Story Name:** Life Skills Voice Responses
**Estimated Effort:** 6-8 hours (1 development day)
**Priority:** High (P1)
**Dependencies:**
- Sprint 1.1 RBAC (student authentication)
- Story 01 (Title Bar, Toolbar components)
- Backend: MongoDB Submissions collection, CoinTransactions collection

**Last Updated:** 2025-10-24 14:48:08
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As a** Student (ages 8-15)
**I want to** record voice responses to Life Skills questions and complete MCQ quizzes
**So that I can** practice speaking skills and demonstrate my understanding of life skills concepts

### 1.2. Story Context

The Life Skills course combines two interaction types:

1. **Voice Note Responses:** Students listen to audio questions about life skills (hygiene, social behavior, emotional awareness) and record voice responses (max 60 seconds). Recording interface mimics WhatsApp's familiar press-and-hold pattern with real-time waveform visualization.

2. **MCQ Quizzes:** Multiple-choice questions testing comprehension. Students must answer ALL questions before viewing results (delayed feedback prevents pattern-matching without understanding).

Both interaction types include mandatory audio playback enforcement (prevents students from skipping instructions) and offline queuing for sync when internet is unavailable.

### 1.3. Key Features

- **Audio Question Playback:** Mandatory listening before enabling submission
- **WhatsApp-Style Recording:** Press-and-hold button to record (up to 60 seconds)
- **Waveform Visualization:** Real-time audio waveform during recording
- **Playback Preview:** Listen to recorded voice note before submitting
- **MCQ Interface:** Radio buttons with progress indicator (e.g., "Question 5/10")
- **Delayed Feedback:** Quiz results shown ONLY after completing all questions
- **Offline Support:** Voice notes and quiz answers queue locally, sync when online
- **Coin Rewards:** Earn ISF Coins based on quiz accuracy or coach grading of voice responses

### 1.4. Child-Friendly UX Considerations

- **Large Touch Targets:** Record button is 120px diameter (easy to press-and-hold)
- **Visual Feedback:** Waveform animation + red border during recording
- **Encouraging Language:** "Great! Let me hear your thoughts!" (instruction text)
- **Error Prevention:** "Hold to Record" tooltip prevents accidental taps
- **Patrick Hand Font:** Child-friendly handwritten typography throughout
- **Color-Coded States:** Green (ready), Red (recording), Blue (recorded), Yellow (playing)

---

## 1.5. Visual Layout Diagrams

### Full Page Layout (Desktop 1366x768)

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│ ┌───────────────────────────────────────────────────────────────────────────────┐ │
│ │ [ISF Logo] ISF Playground      [💰 1,250] [🔔 3] [⏱️ 00:45:32]              │ │ ← Title Bar (72px)
│ └───────────────────────────────────────────────────────────────────────────────┘ │
│ ┌───────────────────────────────────────────────────────────────────────────────┐ │
│ │    [😊] [😢] [😡]  [🎤 Chat with Amma]  [📚 Homework 2]  [❓ Help]          │ │ ← Toolbar (64px)
│ └───────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────┐     │
│   │                       Life Skills 🌱                                     │     │ ← Course Title (48px)
│   │                    Question 5 of 10                                      │     │ ← Progress Indicator
│   └─────────────────────────────────────────────────────────────────────────┘     │
│                                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────┐     │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │     │
│   │  │ [🔊] "Why is washing hands before eating important?"              │  │     │ ← Audio Question Card
│   │  │                                                                   │  │     │   (120px height)
│   │  │ [▶️ Play Audio]   00:15 / 00:15  [Volume Slider ████████░░]       │  │     │
│   │  └───────────────────────────────────────────────────────────────────┘  │     │
│   │                                                                         │     │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │     │
│   │  │         VOICE RECORDING INTERFACE (WhatsApp Style)                │  │     │ ← Voice Recording Section
│   │  │                                                                   │  │     │   (300px height)
│   │  │                    ┌─────────────┐                                │  │     │
│   │  │                    │             │                                │  │     │
│   │  │                    │   🎤 Hold   │                                │  │     │ ← Record Button
│   │  │                    │  to Record  │                                │  │     │   (120x120px)
│   │  │                    │             │                                │  │     │
│   │  │                    └─────────────┘                                │  │     │
│   │  │                                                                   │  │     │
│   │  │  ┌─────────────────────────────────────────────────────────────┐  │  │     │
│   │  │  │ Waveform: ▁▃▅▇█▇▅▃▁ ▁▃▅▇█▇▅▃▁ ▁▃▅▇█▇▅▃▁ 00:23 / 60:00     │  │  │     │ ← Waveform Visualization
│   │  │  └─────────────────────────────────────────────────────────────┘  │  │     │   (60px height)
│   │  │                                                                   │  │     │
│   │  │            [▶️ Play]  [🔄 Re-Record]  [✅ Submit]                  │  │     │ ← Action Buttons
│   │  └───────────────────────────────────────────────────────────────────┘  │     │
│   └─────────────────────────────────────────────────────────────────────────┘     │
│                                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────┐     │
│   │  [← Previous]                                          [Next →]         │     │ ← Navigation Footer (64px)
│   └─────────────────────────────────────────────────────────────────────────┘     │
└───────────────────────────────────────────────────────────────────────────────────┘
```

### Voice Recording Interface - State Variations

#### State 1: IDLE (Before Recording)
```
┌───────────────────────────────────────────────────────────┐
│         VOICE RECORDING INTERFACE                         │
│                                                           │
│                  ┌─────────────┐                          │
│                  │             │                          │
│                  │   🎤 Hold   │ ← Green border (3px)     │
│                  │  to Record  │   bg-green-100           │
│                  │             │                          │
│                  └─────────────┘                          │
│                                                           │
│  Great! Let me hear your thoughts on this question.       │ ← Instruction text
│  Hold the button below to record your answer.             │
│                                                           │
│  Waveform: [Empty] 00:00 / 60:00                          │ ← Disabled waveform
│                                                           │
│  [▶️ Play] [🔄 Re-Record] [✅ Submit] ← All Disabled     │
└───────────────────────────────────────────────────────────┘
```

#### State 2: RECORDING (Button Pressed Down)
```
┌───────────────────────────────────────────────────────────┐
│         VOICE RECORDING INTERFACE                         │
│                                                           │
│                  ┌─────────────┐                          │
│                  │             │                          │
│                  │   🔴 Hold   │ ← RED border (4px pulse) │
│                  │ Recording...│   bg-red-100             │
│                  │             │                          │
│                  └─────────────┘                          │
│                                                           │
│  Recording... Release when done!                          │ ← Status text
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ ▁▃▅▇█▇▅▃▁ ▁▃▅▇█▇▅▃▁ ▁▃▅▇█▇▅▃▁ 00:12 / 60:00       │  │ ← LIVE waveform
│  └─────────────────────────────────────────────────────┘  │   (animated)
│                                                           │
│  [▶️ Play] [🔄 Re-Record] [✅ Submit] ← All Disabled     │
└───────────────────────────────────────────────────────────┘
```

#### State 3: RECORDED (After Release)
```
┌───────────────────────────────────────────────────────────┐
│         VOICE RECORDING INTERFACE                         │
│                                                           │
│                  ┌─────────────┐                          │
│                  │             │                          │
│                  │   ✅ Hold   │ ← Blue border (3px)      │
│                  │  to Record  │   bg-blue-100            │
│                  │             │                          │
│                  └─────────────┘                          │
│                                                           │
│  Great! Your answer has been recorded.                    │ ← Success message
│  Listen to it before submitting.                          │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ ▁▃▅▇█▇▅▃▁ ▁▃▅▇█▇▅▃▁ ▁▃▅▇█▇▅▃▁ 00:23 / 00:23       │  │ ← Static waveform
│  └─────────────────────────────────────────────────────┘  │   (full duration)
│                                                           │
│  [▶️ Play] ← Enabled    [🔄 Re-Record] ← Enabled          │
│                         [✅ Submit] ← Enabled              │
└───────────────────────────────────────────────────────────┘
```

#### State 4: PLAYING (Preview Playback)
```
┌───────────────────────────────────────────────────────────┐
│         VOICE RECORDING INTERFACE                         │
│                                                           │
│                  ┌─────────────┐                          │
│                  │             │                          │
│                  │   🔊 Hold   │ ← Yellow border (3px)    │
│                  │  to Record  │   bg-yellow-100          │
│                  │             │                          │
│                  └─────────────┘                          │
│                                                           │
│  Playing your recording...                                │ ← Status text
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ ▁▃▅▇█▇▅▃▁ ▁▃▅▇█▇▅▃▁ ▁▃▅▇█▇▅▃▁ 00:10 / 00:23       │  │ ← Progress bar
│  └─────────────────────────────────────────────────────┘  │   (blue fill animation)
│                                                           │
│  [⏸️ Pause] ← Enabled   [🔄 Re-Record] ← Enabled          │
│                         [✅ Submit] ← Enabled              │
└───────────────────────────────────────────────────────────┘
```

#### State 5: SUBMITTING (Upload in Progress)
```
┌───────────────────────────────────────────────────────────┐
│         VOICE RECORDING INTERFACE                         │
│                                                           │
│                  ┌─────────────┐                          │
│                  │             │                          │
│                  │   ⏳ Hold   │ ← Gray border            │
│                  │  to Record  │   bg-gray-100            │
│                  │             │   (disabled)             │
│                  └─────────────┘                          │
│                                                           │
│  Submitting your answer...                                │ ← Status text
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Upload Progress: ████████████░░░░░░░░ 65%            │  │ ← Progress bar
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  [▶️ Play] [🔄 Re-Record] [✅ Submit] ← All Disabled     │
└───────────────────────────────────────────────────────────┘
```

### MCQ Quiz Interface Layout

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│ ┌───────────────────────────────────────────────────────────────────────────────┐ │
│ │ [ISF Logo] ISF Playground      [💰 1,250] [🔔 3] [⏱️ 00:45:32]              │ │ ← Title Bar
│ └───────────────────────────────────────────────────────────────────────────────┘ │
│ ┌───────────────────────────────────────────────────────────────────────────────┐ │
│ │    [😊] [😢] [😡]  [🎤 Chat with Amma]  [📚 Homework 2]  [❓ Help]          │ │ ← Toolbar
│ └───────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────┐     │
│   │                       Life Skills Quiz 🌱                                │     │ ← Quiz Title
│   │                    Question 7 of 10                                      │     │ ← Progress (7/10)
│   │  ██████████████████████████░░░░░░░░░░ 70%                              │     │ ← Progress Bar
│   └─────────────────────────────────────────────────────────────────────────┘     │
│                                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────┐     │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │     │
│   │  │ [🔊] "What should you do when you feel angry?"                    │  │     │ ← Audio Question
│   │  │                                                                   │  │     │
│   │  │ [▶️ Play Audio]   00:08 / 00:08  [Volume ████████░░]              │  │     │
│   │  └───────────────────────────────────────────────────────────────────┘  │     │
│   │                                                                         │     │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │     │
│   │  │                                                                   │  │     │
│   │  │  ⚪ A) Yell at someone nearby                                     │  │     │ ← Option A (Radio)
│   │  │                                                                   │  │     │   (72px height)
│   │  │  ⚪ B) Take deep breaths and count to 10                          │  │     │ ← Option B
│   │  │                                                                   │  │     │
│   │  │  ⚪ C) Throw things around the room                               │  │     │ ← Option C
│   │  │                                                                   │  │     │
│   │  │  ⚪ D) Hit something or someone                                   │  │     │ ← Option D
│   │  │                                                                   │  │     │
│   │  └───────────────────────────────────────────────────────────────────┘  │     │
│   │                                                                         │     │
│   │           [✅ Submit Answer] ← Enabled after audio played               │     │ ← Submit Button
│   │                                                                         │     │   (disabled until audio done)
│   └─────────────────────────────────────────────────────────────────────────┘     │
│                                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────┐     │
│   │  [← Previous]                                          [Next →]         │     │ ← Navigation
│   └─────────────────────────────────────────────────────────────────────────┘     │
└───────────────────────────────────────────────────────────────────────────────────┘
```

### MCQ Quiz - Results Page (After All Questions Answered)

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│ ┌───────────────────────────────────────────────────────────────────────────────┐ │
│ │ [ISF Logo] ISF Playground      [💰 1,370] [🔔 4] [⏱️ 00:52:15]              │ │ ← Updated coins!
│ └───────────────────────────────────────────────────────────────────────────────┘ │
│ ┌───────────────────────────────────────────────────────────────────────────────┐ │
│ │    [😊] [😢] [😡]  [🎤 Chat with Amma]  [📚 Homework 2]  [❓ Help]          │ │
│ └───────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────┐     │
│   │                        🎉 Quiz Complete! 🎉                              │     │ ← Success Banner
│   │                                                                         │     │
│   │                    ┌──────────────────┐                                 │     │
│   │                    │                  │                                 │     │
│   │                    │    85% Score     │                                 │     │ ← Score Circle
│   │                    │                  │                                 │     │   (180px diameter)
│   │                    │   +120 Coins 💰  │                                 │     │
│   │                    └──────────────────┘                                 │     │
│   │                                                                         │     │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │     │
│   │  │                  Results Breakdown                                 │  │     │
│   │  │                                                                   │  │     │
│   │  │  ✅ Question 1: Correct   (+12 coins)                             │  │     │
│   │  │  ✅ Question 2: Correct   (+12 coins)                             │  │     │
│   │  │  ❌ Question 3: Incorrect (0 coins)                               │  │     │
│   │  │  ✅ Question 4: Correct   (+12 coins)                             │  │     │
│   │  │  ✅ Question 5: Correct   (+12 coins)                             │  │     │
│   │  │  ✅ Question 6: Correct   (+12 coins)                             │  │     │
│   │  │  ✅ Question 7: Correct   (+12 coins)                             │  │     │
│   │  │  ❌ Question 8: Incorrect (0 coins)                               │  │     │
│   │  │  ✅ Question 9: Correct   (+12 coins)                             │  │     │
│   │  │  ✅ Question 10: Correct  (+12 coins)                             │  │     │
│   │  │                                                                   │  │     │
│   │  │  Correct Answers: 8/10 (80%)                                      │  │     │
│   │  │  Time Taken: 6 minutes 30 seconds                                 │  │     │
│   │  │  Bonus Coins: +24 coins (for 80%+ score)                          │  │     │
│   │  └───────────────────────────────────────────────────────────────────┘  │     │
│   │                                                                         │     │
│   │            [🔄 Retry Quiz]      [🏠 Back to Dashboard]                  │     │ ← Action Buttons
│   └─────────────────────────────────────────────────────────────────────────┘     │
└───────────────────────────────────────────────────────────────────────────────────┘
```

### Voice Recording State Flow Diagram

```
State Flow (Voice Note Recording):

┌──────────────┐
│   INITIAL    │  - Record button: Green border, "🎤 Hold to Record"
│   (Idle)     │  - Waveform: Empty, timer shows "00:00 / 60:00"
└──────┬───────┘  - Actions: Play/Re-Record/Submit all disabled
       │
       │ (User presses button)
       ↓
┌──────────────┐
│  RECORDING   │  - Record button: RED border (pulsing), "🔴 Recording..."
│  (Active)    │  - Waveform: LIVE animation with audio levels
└──────┬───────┘  - Timer: Shows elapsed time (00:12 / 60:00)
       │          - Auto-stop at 60 seconds
       │
       │ (User releases button OR 60 sec limit)
       ↓
┌──────────────┐
│   RECORDED   │  - Record button: Blue border, "✅ Hold to Record"
│  (Complete)  │  - Waveform: Static, shows full recording
└──────┬───────┘  - Timer: Shows full duration (00:23 / 00:23)
       │          - Actions: Play/Re-Record/Submit all enabled
       │
       ├─────────────────────────────────────────┐
       │                                         │
       │ (Click Play)                            │ (Click Re-Record)
       ↓                                         ↓
┌──────────────┐                          ┌──────────────┐
│   PLAYING    │                          │   INITIAL    │
│  (Preview)   │ ←────────────────────────│ (Reset)      │
└──────┬───────┘  (Click Pause)           └──────────────┘
       │          (Audio ends)                    ↑
       ↓                                          │
┌──────────────┐                                  │
│   RECORDED   │──────────────────────────────────┘
│  (Complete)  │  (Click Re-Record)
└──────┬───────┘
       │
       │ (Click Submit)
       ↓
┌──────────────┐
│  SUBMITTING  │  - Progress bar shows upload % (0-100%)
│  (Uploading) │  - All buttons disabled during upload
└──────┬───────┘  - Shows spinner or progress animation
       │
       │ (Upload complete)
       ↓
┌──────────────┐
│   SUCCESS    │  - Toast notification: "Great work! +20 coins earned!"
│  (Submitted) │  - Coin balance updates in Title Bar
└──────────────┘  - Auto-navigate to next question OR dashboard
```

### Quiz State Flow Diagram

```
Quiz Flow (MCQ Questions):

┌──────────────────┐
│   INITIAL        │  - Audio question autoplays on load
│   (Audio Play)   │  - Submit button DISABLED until audio finishes
└────────┬─────────┘  - Radio buttons enabled (can select during audio)
         │
         │ (Audio finishes playing)
         ↓
┌──────────────────┐
│   READY          │  - Submit button ENABLED
│   (Answer)       │  - Student selects one radio option
└────────┬─────────┘  - No visual feedback on correctness yet
         │
         │ (Click "Submit Answer")
         ↓
┌──────────────────┐
│   SUBMITTED      │  - Answer saved to local state
│   (Next Q)       │  - NO correctness indicator shown
└────────┬─────────┘  - Automatically loads next question
         │            - OR shows "Finish Quiz" button if last question
         │
         │ (Repeat for all 10 questions)
         ↓
┌──────────────────┐
│   GRADING        │  - Spinner/loading screen (1-2 seconds)
│   (Processing)   │  - Backend calculates score + coins
└────────┬─────────┘  - Updates coin balance in database
         │
         │ (Grading complete)
         ↓
┌──────────────────┐
│   RESULTS        │  - Shows final score (e.g., "85% - Great job!")
│   (Complete)     │  - Displays per-question breakdown (✅/❌)
└────────┬─────────┘  - Shows total coins earned
         │            - Coin animation flies to Title Bar
         │
         ├──────────────────────────────────────┐
         │                                      │
         │ (Click "Retry Quiz")                 │ (Click "Back to Dashboard")
         ↓                                      ↓
┌──────────────────┐                    ┌──────────────────┐
│   INITIAL        │                    │   DASHBOARD      │
│   (Q1 Reset)     │                    │   (Homepage)     │
└──────────────────┘                    └──────────────────┘
```

### Responsive Layouts

#### Desktop (1366x768) - Default Layout
- Voice recording button: 120x120px
- MCQ radio buttons: 72px height per option
- Title Bar + Toolbar: Always visible (136px total)

#### Tablet (768px - 1023px)
- Voice recording button: 100x100px
- MCQ options: Single column, 64px height per option
- Waveform: Full width, reduced height (48px)

#### Mobile (<768px)
- Voice recording button: 80x80px
- MCQ options: Single column, 56px height per option
- Progress bar: Reduced to 32px height
- Navigation buttons: Stack vertically

### Component Measurements Summary

| Element | Width | Height | Padding | Margin | Border |
|---------|-------|--------|---------|--------|--------|
| Title Bar | 100% | 72px | px-6 py-3 | - | border-b gray-200 |
| Toolbar | 100% | 64px | px-4 py-2 | - | border-b gray-100 |
| Course Title | 100% | 48px | - | mb-4 | - |
| Progress Indicator | 100% | 32px | - | mb-2 | - |
| Audio Question Card | 100% | 120px | p-6 | mb-6 | 2px green-300 rounded-xl |
| Voice Recording Section | 100% | 300px | p-8 | mb-6 | 2px gray-200 rounded-xl |
| Record Button (Desktop) | 120px | 120px | - | mx-auto | 3px (state-dependent) |
| Record Button (Mobile) | 80px | 80px | - | mx-auto | 3px (state-dependent) |
| Waveform Visualization | 100% | 60px | p-4 | my-4 | 1px gray-300 rounded |
| MCQ Radio Option | 100% | 72px | px-6 py-4 | mb-3 | 2px gray-300 rounded-lg |
| Submit Button | 240px | 56px | px-8 py-3 | mx-auto | - rounded-full |
| Navigation Footer | 100% | 64px | px-6 py-3 | - | border-t gray-200 |
| Results Score Circle | 180px | 180px | p-6 | mx-auto mb-6 | 4px green-500 rounded-full |

---

## 2. Acceptance Criteria

### 2.1. Voice Recording Interface

- [ ] **VR-01:** Audio question autoplays when task loads (MediaRecorder API)
- [ ] **VR-02:** Submit button remains disabled until audio playback completes
- [ ] **VR-03:** Record button displays "🎤 Hold to Record" with green border in idle state
- [ ] **VR-04:** Pressing and holding record button changes border to red (4px pulse) and displays "🔴 Recording..."
- [ ] **VR-05:** Waveform visualization displays real-time audio levels during recording
- [ ] **VR-06:** Timer shows elapsed time during recording (00:12 / 60:00 format)
- [ ] **VR-07:** Recording auto-stops at 60-second limit with visual + audio feedback
- [ ] **VR-08:** Releasing record button stops recording and transitions to "Recorded" state (blue border)
- [ ] **VR-09:** Play button plays recorded audio with waveform progress animation (yellow border during playback)
- [ ] **VR-10:** Pause button stops playback and returns to "Recorded" state
- [ ] **VR-11:** Re-Record button clears current recording and resets to "Idle" state
- [ ] **VR-12:** Submit button uploads voice file to S3 with progress bar (0-100%)
- [ ] **VR-13:** Success toast notification shows "Great work! +20 coins earned!" after upload
- [ ] **VR-14:** Coin balance updates in Title Bar within 2 seconds of submission

### 2.2. MCQ Quiz Interface

- [ ] **MCQ-01:** Quiz displays progress indicator (e.g., "Question 7 of 10") with visual progress bar
- [ ] **MCQ-02:** Audio question autoplays on question load
- [ ] **MCQ-03:** Submit button disabled until audio playback completes
- [ ] **MCQ-04:** Radio buttons selectable during audio playback (doesn't block interaction)
- [ ] **MCQ-05:** Exactly one radio option can be selected per question
- [ ] **MCQ-06:** Submit button remains disabled if no option selected
- [ ] **MCQ-07:** Clicking "Submit Answer" saves answer locally (no correctness feedback shown)
- [ ] **MCQ-08:** Next question loads automatically after submitting current answer
- [ ] **MCQ-09:** Last question shows "Finish Quiz" button instead of "Next"
- [ ] **MCQ-10:** Results page displays ONLY after all 10 questions answered (delayed feedback)

### 2.3. Quiz Results & Grading

- [ ] **QR-01:** Results page shows overall score (e.g., "85% - Great job!")
- [ ] **QR-02:** Per-question breakdown displays ✅ (correct) or ❌ (incorrect) with coins earned
- [ ] **QR-03:** Total coins earned displayed prominently (e.g., "+120 coins")
- [ ] **QR-04:** Bonus coins awarded for 80%+ score (+24 coins for exceeding threshold)
- [ ] **QR-05:** Coin animation flies from results page to Title Bar coin balance
- [ ] **QR-06:** Time taken displayed in results (e.g., "6 minutes 30 seconds")
- [ ] **QR-07:** "Retry Quiz" button resets quiz and returns to Question 1
- [ ] **QR-08:** "Back to Dashboard" button navigates to student homepage

### 2.4. Offline Support

- [ ] **OFF-01:** Voice recordings save to local SQLite if offline (offline_submissions table)
- [ ] **OFF-02:** MCQ quiz answers save to local SQLite if offline (offline_progress table)
- [ ] **OFF-03:** Coin transactions save to local SQLite if offline (offline_coins table)
- [ ] **OFF-04:** Offline submissions queue automatically syncs when internet reconnects
- [ ] **OFF-05:** Sync status indicator shows "Syncing..." during upload
- [ ] **OFF-06:** Failed uploads retry with exponential backoff (3 attempts max)
- [ ] **OFF-07:** User can continue to next task while previous submission syncs in background

### 2.5. Child-Friendly UX

- [ ] **UX-01:** All instructions use encouraging, simple language (e.g., "Great! Let me hear your thoughts!")
- [ ] **UX-02:** Patrick Hand font applied to all text elements
- [ ] **UX-03:** Large touch targets: Record button (120px desktop, 80px mobile), Radio options (72px height)
- [ ] **UX-04:** Color-coded states clearly distinguish recording stages (green → red → blue → yellow)
- [ ] **UX-05:** Error messages are child-friendly (e.g., "Oops! Recording didn't work. Let's try again!")
- [ ] **UX-06:** Success animations include coin flying effect with sound (optional)

### 2.6. Performance & Accessibility

- [ ] **PERF-01:** Voice recording interface loads within 2 seconds
- [ ] **PERF-02:** Audio playback starts within 1 second of clicking Play button
- [ ] **PERF-03:** Waveform visualization renders at 30 FPS minimum
- [ ] **PERF-04:** Voice file upload completes within 10 seconds (for 60-second recordings)
- [ ] **ACC-01:** Keyboard navigation supported (Tab to navigate, Space to toggle radio, Enter to submit)
- [ ] **ACC-02:** ARIA labels for screen readers (e.g., "Recording button, currently idle state")

---

## 3. Task Breakdown

### Phase 1: Voice Recording Core (3-4 hours)

**Task 1:** Create `VoiceRecordingInterface.jsx` Component (60 min)
- Set up component state: `recordingState` (idle/recording/recorded/playing/submitting)
- Render record button with conditional styling based on state
- Add waveform visualization placeholder (canvas element)
- Implement timer display (00:00 / 60:00 format)
- Add Play/Re-Record/Submit action buttons

**Task 2:** Implement Press-and-Hold Recording Logic (90 min)
- Add `onMouseDown` event listener for record button (desktop)
- Add `onTouchStart` event listener for record button (mobile)
- Request microphone access via `navigator.mediaDevices.getUserMedia({ audio: true })`
- Initialize `MediaRecorder` API with `audio/webm` MIME type
- Start recording on button press, change state to "recording"
- Stop recording on button release (`onMouseUp`, `onTouchEnd`)
- Handle 60-second auto-stop with timeout
- Store recorded blob in component state

**Task 3:** Build Real-Time Waveform Visualization (90 min)
- Create `WaveformVisualizer.jsx` component using Canvas API
- Connect to `MediaRecorder` audio stream using Web Audio API
- Use `AnalyserNode` to extract audio frequency data
- Render waveform bars dynamically based on frequency values (30 FPS)
- Animate waveform during recording (live) and playback (progress-based)
- Style waveform with green (idle), red (recording), blue (recorded), yellow (playing)

**Task 4:** Implement Audio Playback & Re-Record (30 min)
- Create `<audio>` element to play recorded blob
- Add Play button handler: `audioElement.play()`, update state to "playing"
- Add Pause button handler: `audioElement.pause()`, update state to "recorded"
- Sync waveform progress with audio `timeupdate` event
- Add Re-Record button handler: clear blob, reset state to "idle"

### Phase 2: File Upload & Coin Integration (1-1.5 hours)

**Task 5:** Implement Voice File Upload to S3 (45 min)
- Create `handleVoiceSubmit()` function in component
- Convert recorded blob to File object (name: `voice_${studentId}_${taskId}_${timestamp}.webm`)
- Create FormData with file + metadata (studentId, courseId, taskId, duration, fileSize)
- POST to `/api/v2/lms/student/:studentId/submissions` endpoint
- Track upload progress with `XMLHttpRequest.upload.onprogress` event
- Show progress bar (0-100%) during upload
- Update state to "submitting" during upload, show spinner

**Task 6:** Handle Coin Reward & Success Feedback (30 min)
- On successful upload response, extract `coinsEarned` from server response
- Trigger coin animation (coin icon flies from center to Title Bar)
- Update coin balance in Title Bar via context or WebSocket
- Show success toast notification: "Great work! +20 coins earned!"
- Auto-navigate to next question or dashboard after 3-second delay

### Phase 3: MCQ Quiz Interface (2-2.5 hours)

**Task 7:** Create `MCQQuizInterface.jsx` Component (60 min)
- Render quiz progress indicator (Question X of 10) with progress bar
- Display audio question card with Play button and volume slider
- Render 4 radio options (A, B, C, D) with labels
- Add Submit Answer button (disabled until audio finishes + option selected)
- Add Previous/Next navigation footer (disabled on first/last question)

**Task 8:** Implement Audio Question Enforcement (30 min)
- Autoplay audio question on component mount using `useEffect`
- Disable Submit button until `audio.onended` event fires
- Show "Listen to the full question first!" tooltip if Submit clicked prematurely
- Track `audioPlayedAt` timestamp in state for backend validation

**Task 9:** Implement MCQ Selection & Submission (45 min)
- Add `onChange` handler for radio buttons, update `selectedOption` state
- Enable Submit button only if `selectedOption !== null` AND audio finished
- On Submit click: save answer to local state array (question ID + selected option + timestamp)
- Do NOT show correctness feedback (no green/red highlights)
- Load next question automatically (increment question index)
- Show "Finish Quiz" button on last question (index === 9)

**Task 10:** Build Quiz Results Page (45 min)
- Create `QuizResults.jsx` component
- POST quiz answers to `/api/v2/lms/student/:studentId/quiz/submit`
- Backend calculates score, coins earned, and bonus coins
- Render score circle (e.g., "85%" in large text with green border)
- Display per-question breakdown (✅/❌ with coins earned per question)
- Show total coins earned, time taken, and bonus coins
- Add Retry Quiz and Back to Dashboard buttons

### Phase 4: Offline Support & Sync (1-1.5 hours)

**Task 11:** Implement Offline Voice Recording Queue (45 min)
- Detect offline state using `navigator.onLine` check
- Save recorded voice blobs to IndexedDB (key: `voice_${taskId}_${timestamp}`)
- Insert record into SQLite `offline_submissions` table (studentId, taskId, localFilePath, synced=0)
- Show "Offline Mode: Your answer will be submitted when you're back online" message
- Add badge to Title Bar notification bell showing offline submission count

**Task 12:** Implement Offline MCQ Quiz Queue (30 min)
- Save quiz answers to SQLite `offline_progress` table (studentId, quizId, answers JSON, synced=0)
- Save coin transactions to SQLite `offline_coins` table (studentId, amount, reason, synced=0)
- Show offline indicator in quiz results page (e.g., "Results saved offline")

**Task 13:** Build Sync Service on Reconnection (30 min)
- Create `syncService.js` utility
- Listen to `window.addEventListener('online', handleSync)` event
- On reconnection: query SQLite for `synced=0` records
- Upload queued voice files to S3 (retry with exponential backoff if failed)
- POST queued quiz answers to backend
- Update SQLite `synced=1` after successful sync
- Show toast notification: "All offline work has been synced! +120 coins added."

### Phase 5: Testing & Polish (1 hour)

**Task 14:** Manual Testing Across Devices (30 min)
- Test voice recording on Windows (desktop) and Android tablet (touch)
- Test MCQ quiz flow: audio enforcement, delayed feedback, results page
- Test offline mode: record voice → go offline → submit → go online → verify sync
- Test coin animation: verify coins fly to Title Bar and balance updates

**Task 15:** Edge Case Handling & Error Messages (30 min)
- Handle microphone permission denied: show "We need microphone access to record your answer"
- Handle 60-second recording limit: show "Recording stopped at 60 seconds. Great work!"
- Handle upload failure: show "Upload failed. Retrying..." with retry button
- Handle audio playback error: show "Audio not available. Please reload."
- Validate file size before upload (max 10 MB for 60-second recording)

---

## 4. API Endpoints

### 4.1. Voice Note Submission

**POST `/api/v2/lms/student/:studentId/submissions`**

**Request (Multipart Form-Data):**
```http
POST /api/v2/lms/student/67890/submissions HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="voice_67890_task123_1729776488.webm"
Content-Type: audio/webm

[Binary audio data]
------WebKitFormBoundary
Content-Disposition: form-data; name="courseId"

course456
------WebKitFormBoundary
Content-Disposition: form-data; name="taskId"

task123
------WebKitFormBoundary
Content-Disposition: form-data; name="submissionType"

voice
------WebKitFormBoundary
Content-Disposition: form-data; name="metadata"

{"duration": 23, "fileSize": 245678, "recordedAt": "2025-10-24T14:45:00Z"}
------WebKitFormBoundary--
```

**Response (201 Created):**
```json
{
  "success": true,
  "submissionId": "sub789",
  "fileUrl": "https://s3.amazonaws.com/isf-playground/submissions/voice_67890_task123_1729776488.webm",
  "status": "pending",
  "coinsEarned": 20,
  "message": "Great work! Your answer has been submitted. Coach will review it soon."
}
```

**Error Responses:**
```json
// 413 Payload Too Large
{
  "success": false,
  "error": "File size exceeds 10 MB limit. Please record a shorter answer."
}

// 403 Forbidden (already submitted)
{
  "success": false,
  "error": "You have already submitted an answer for this task."
}
```

---

### 4.2. MCQ Quiz Submission

**POST `/api/v2/lms/student/:studentId/quiz/submit`**

**Request Body:**
```json
{
  "courseId": "course456",
  "quizId": "quiz789",
  "answers": [
    {
      "questionId": "q1",
      "selectedOption": "B",
      "audioPlayedAt": "2025-10-24T14:30:15Z",
      "answeredAt": "2025-10-24T14:30:45Z"
    },
    {
      "questionId": "q2",
      "selectedOption": "A",
      "audioPlayedAt": "2025-10-24T14:31:00Z",
      "answeredAt": "2025-10-24T14:31:30Z"
    }
    // ... 8 more questions
  ],
  "startedAt": "2025-10-24T14:30:00Z",
  "completedAt": "2025-10-24T14:36:30Z"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "quizId": "quiz789",
  "results": {
    "score": 85,
    "correctAnswers": 8,
    "totalQuestions": 10,
    "timeTaken": 390,  // seconds
    "coinsEarned": 120,
    "bonusCoins": 24,  // for 80%+ score
    "breakdown": [
      {
        "questionId": "q1",
        "correct": true,
        "coinsEarned": 12,
        "correctAnswer": "B",
        "userAnswer": "B"
      },
      {
        "questionId": "q2",
        "correct": true,
        "coinsEarned": 12,
        "correctAnswer": "A",
        "userAnswer": "A"
      },
      {
        "questionId": "q3",
        "correct": false,
        "coinsEarned": 0,
        "correctAnswer": "C",
        "userAnswer": "D"
      }
      // ... 7 more questions
    ]
  },
  "updatedCoinBalance": 1370
}
```

---

### 4.3. Offline Sync Endpoint

**POST `/api/v2/lms/student/:studentId/sync/offline`**

**Request Body:**
```json
{
  "submissions": [
    {
      "localId": "offline_sub_1",
      "submissionType": "voice",
      "taskId": "task123",
      "courseId": "course456",
      "fileUrl": "data:audio/webm;base64,GkXf...",  // Base64 encoded blob
      "metadata": {
        "duration": 23,
        "fileSize": 245678,
        "recordedAt": "2025-10-23T18:00:00Z"
      },
      "submittedAt": "2025-10-23T18:01:00Z"
    }
  ],
  "quizAnswers": [
    {
      "localId": "offline_quiz_1",
      "quizId": "quiz789",
      "courseId": "course456",
      "answers": [ /* same structure as regular quiz submission */ ],
      "completedAt": "2025-10-23T17:30:00Z"
    }
  ],
  "coinTransactions": [
    {
      "localId": "offline_coin_1",
      "transactionType": "quiz_pass",
      "amount": 120,
      "reason": "Completed Life Skills Quiz",
      "relatedTaskId": "quiz789",
      "timestamp": "2025-10-23T17:35:00Z"
    }
  ]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "syncResults": {
    "submissionsSynced": 1,
    "quizzesSynced": 1,
    "coinsSynced": 120,
    "failedSubmissions": [],
    "updatedCoinBalance": 1490
  },
  "message": "All offline work has been synced successfully! +120 coins added."
}
```

---

## 5. File Paths

### 5.1. Frontend Files (React Components)

```
frontend/src/
├── components/
│   ├── student/
│   │   ├── TitleBar.jsx                         (reused from Story 01)
│   │   ├── Toolbar.jsx                          (reused from Story 01)
│   │   ├── lifeskills/
│   │   │   ├── VoiceRecordingInterface.jsx       ← NEW (Main component)
│   │   │   ├── WaveformVisualizer.jsx            ← NEW (Canvas-based waveform)
│   │   │   ├── AudioQuestionCard.jsx             ← NEW (Audio playback UI)
│   │   │   ├── MCQQuizInterface.jsx              ← NEW (Quiz question UI)
│   │   │   ├── MCQOption.jsx                     ← NEW (Radio button option)
│   │   │   ├── QuizResults.jsx                   ← NEW (Results page)
│   │   │   └── RecordButton.jsx                  ← NEW (Press-and-hold button)
│   ├── common/
│   │   ├── CoinAnimation.jsx                     ← NEW (Lottie coin flying animation)
│   │   └── ProgressBar.jsx                       (reused from previous stories)
├── pages/
│   └── LifeSkillsCoursePage.jsx                 ← NEW (Main page component)
├── services/
│   ├── voiceRecordingService.js                 ← NEW (MediaRecorder API wrapper)
│   ├── audioPlaybackService.js                  ← NEW (Audio playback utilities)
│   └── syncService.js                           ← NEW (Offline sync logic)
├── utils/
│   ├── audioUtils.js                            ← NEW (Waveform processing)
│   └── offlineStorage.js                        ← NEW (IndexedDB + SQLite helpers)
└── hooks/
    ├── useVoiceRecording.js                     ← NEW (Recording state management)
    ├── useAudioPlayback.js                      ← NEW (Playback state management)
    └── useOfflineSync.js                        ← NEW (Sync status hook)
```

### 5.2. Backend Files (Node.js + Express)

```
backend/
├── controllers/
│   └── lifeSkillsController.js                  ← NEW (Voice + quiz submission handlers)
├── routes/
│   └── v2/
│       └── lms/
│           └── lifeskills.js                     ← NEW (Voice + quiz routes)
├── services/
│   ├── s3UploadService.js                       (reused from Story 03/04)
│   ├── coinService.js                           (reused from Story 06)
│   └── quizGradingService.js                    ← NEW (MCQ auto-grading logic)
├── models/
│   ├── Submissions.js                           (reused from Story 03/04)
│   ├── CoinTransactions.js                      (reused from Story 06)
│   └── QuizResults.js                           ← NEW (Quiz answers + scores)
└── db/
    └── sqlite/
        └── offlineSchema.sql                    (updated with offline_submissions table)
```

### 5.3. Database Schemas

**MongoDB Collection: `Submissions` (Extended for Voice Notes)**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  courseId: ObjectId,
  taskId: ObjectId,
  submissionType: "voice",  // NEW type
  fileUrl: "https://s3.amazonaws.com/isf-playground/submissions/voice_67890_task123.webm",
  metadata: {
    duration: 23,  // seconds
    fileSize: 245678,  // bytes
    recordedAt: "2025-10-24T14:45:00Z"
  },
  status: "pending",  // "pending" | "graded" | "rejected"
  grade: {
    coinsAwarded: 20,
    feedback: "Clear pronunciation! Keep up the great work!",
    gradedBy: ObjectId,  // Coach ID
    gradedAt: Date
  },
  submittedAt: Date,
  offlineSubmission: Boolean,
  syncedAt: Date
}
```

**MongoDB Collection: `QuizResults` (NEW)**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  courseId: ObjectId,
  quizId: ObjectId,
  answers: [
    {
      questionId: ObjectId,
      selectedOption: "B",
      correct: true,
      audioPlayedAt: Date,  // Validates student listened
      answeredAt: Date
    }
  ],
  score: 85,  // Percentage
  correctAnswers: 8,
  totalQuestions: 10,
  timeTaken: 390,  // seconds
  coinsEarned: 120,
  bonusCoins: 24,  // For 80%+ score
  completedAt: Date,
  offlineQuiz: Boolean,
  syncedAt: Date
}
```

**SQLite Table: `offline_submissions` (Updated)**
```sql
CREATE TABLE offline_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  studentId TEXT NOT NULL,
  courseId TEXT NOT NULL,
  taskId TEXT NOT NULL,
  submissionType TEXT NOT NULL,  -- "voice" | "art" | "video"
  localFilePath TEXT,            -- IndexedDB key or file path
  metadata TEXT,                 -- JSON string
  submittedAt TEXT,
  synced INTEGER DEFAULT 0,      -- 0: not synced, 1: synced
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. Definition of Done

### 6.1. Development Complete

- [ ] All 15 tasks from Section 3 completed and checked off
- [ ] Code committed to feature branch: `feature/sprint-2-epic-01-story-05`
- [ ] No console errors or warnings in browser DevTools
- [ ] All components follow React v19.0.0 best practices (hooks, context, functional components)

### 6.2. Functional Requirements Met

- [ ] Voice recording works: press-and-hold → waveform visualization → 60-second limit
- [ ] Audio playback works: Play → Pause → Re-Record → Submit flow
- [ ] MCQ quiz works: audio enforcement → delayed feedback → results page
- [ ] Offline mode works: queue submissions locally → sync on reconnection
- [ ] Coin rewards work: earn coins → animation → Title Bar balance update

### 6.3. Testing & Quality Assurance

- [ ] **Unit Tests:** 80%+ coverage for business logic (voice recording state, quiz grading, sync service)
- [ ] **Integration Tests:** API endpoints return correct responses (voice upload, quiz submission, sync)
- [ ] **E2E Tests:** Critical paths tested:
  - Student records voice → uploads → earns coins
  - Student completes quiz → views results → earns coins
  - Student works offline → reconnects → data syncs successfully
- [ ] **Manual Testing:**
  - Tested on Windows desktop (1366x768 resolution)
  - Tested on Android tablet (touch press-and-hold)
  - Tested microphone permission denied scenario
  - Tested 60-second recording auto-stop
  - Tested audio enforcement (Submit disabled until audio finishes)

### 6.4. Performance & Accessibility

- [ ] Voice recording interface loads within 2 seconds
- [ ] Waveform renders at 30 FPS minimum (no lag during recording)
- [ ] Voice file uploads within 10 seconds (60-second recording)
- [ ] Keyboard navigation works (Tab, Space, Enter)
- [ ] ARIA labels present for screen readers

### 6.5. Code Review & Approval

- [ ] Code peer-reviewed by senior developer
- [ ] No critical issues flagged (security, performance, logic errors)
- [ ] TailwindCSS classes follow design system (Patrick Hand font, green/red/blue/yellow states)
- [ ] Error messages are child-friendly and encouraging

### 6.6. Documentation & Handoff

- [ ] E2E test template generated in `docs/qa/e2e/sprint-2-epic-01-story-05-life-skills.md`
- [ ] Quality gate YAML created: `docs/qa/gates/sprint-2-epic-01-story-05.yml` (status: PASS)
- [ ] API documentation updated with voice + quiz endpoints
- [ ] QA team notified for formal testing

### 6.7. Deployment Ready

- [ ] Feature branch merged to `develop` branch
- [ ] No merge conflicts
- [ ] CI/CD pipeline passes (build + tests)
- [ ] Staging environment deployment successful
- [ ] Product Owner sign-off obtained

---

## 7. Notes & Assumptions

### 7.1. Technical Assumptions

- **Microphone Access:** All student PCs have working microphones (webcam built-in or USB)
- **Browser Compatibility:** Electron uses Chromium engine (supports MediaRecorder API, Web Audio API)
- **Audio Format:** WebM with Opus codec (widely supported, good compression for voice)
- **File Size Limit:** 60-second voice recording ≈ 2-3 MB (within S3 upload limits)
- **Offline Storage:** IndexedDB can store up to 50 voice recordings (≈150 MB) before requiring sync

### 7.2. Design Decisions

- **WhatsApp-Style Recording:** Familiar UX pattern for students (used in popular messaging apps)
- **60-Second Limit:** Prevents excessively long recordings, encourages concise answers
- **Delayed Feedback:** Prevents students from gaming the quiz by changing answers after seeing results
- **Mandatory Audio Playback:** Ensures students understand the question before answering

### 7.3. Open Questions

1. **Coach Grading Workflow:** How do coaches listen to voice notes and provide feedback? (Covered in Epic 03)
2. **Retry Limit:** Should students be allowed unlimited quiz retries? (Recommendation: 3 retries per quiz)
3. **Audio Transcription:** Should backend transcribe voice notes to text for keyword analysis? (Future enhancement)

---

## 8. Related Documents

- **Epic 01 Overview:** `docs/epics/sprint2/sprint-2-epic-01-lms-student-experience.md`
- **Sprint 2 MPSD:** `docs/epics/sprint-2-master-plan.md`
- **Sprint 2 Design System:** `docs/design-systems/sprint-2-lms-design-system.md`
- **Story 01 (Title Bar/Toolbar):** `docs/stories/sprint2/epic-01-story-01-student-homepage-course-navigation.md`
- **Story 06 (Coin Rewards):** `docs/stories/sprint2/epic-01-story-06-isf-coin-wallet.md`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 14:48:08 (via `date '+%Y-%m-%d %H:%M:%S'`)
- **Status:** Draft - Ready for Development
- **Next Steps:** Assign to frontend developer for voice recording implementation

---

**QA Agent Record:**
- **E2E Template:** Pending generation
- **Quality Gate:** Pending creation
- **Testing Status:** Not started

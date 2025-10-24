# Epic 01 - Story 06: ISF Coin Wallet Display & Accumulation

**Story ID:** SPRINT2-EPIC01-STORY06
**Epic:** Epic 01 - LMS Student Experience
**Sprint:** Sprint 2
**Story Name:** ISF Coin Wallet Display & Accumulation
**Estimated Effort:** 4-6 hours (0.5-1 development day)
**Priority:** High (P1)
**Dependencies:**
- Sprint 1.1 RBAC (student authentication)
- Story 01 (Title Bar component structure)
- Story 02-05 (coin-earning activities)
- Backend: MongoDB CoinTransactions collection, SQLite offline_coins table

**Last Updated:** 2025-10-24 14:48:08
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As a** Student (ages 8-15)
**I want to** see my ISF Coin balance in real-time and view my earning history
**So that I can** track my progress, feel motivated by visual rewards, and understand which activities earn the most coins

### 1.2. Story Context

ISF Coins are the primary gamification currency in ISF Playground. Students earn coins by:
- Completing tasks (Computer Apps, Art, Spoken English, Life Skills)
- Passing quizzes with high scores (bonus coins for 80%+ accuracy)
- Receiving coach grading rewards for artwork/video/voice submissions
- Achieving milestones (e.g., "First 100 coins earned!")

This story implements:
1. **Real-Time Coin Balance Display:** Always visible in Title Bar, updates within 2 seconds of earning
2. **Coin Animation:** Visual feedback when coins are earned (coin icon flies to balance with sound effect)
3. **Transaction History Modal:** Detailed log of all coin transactions (date, activity, amount earned)
4. **Offline Coin Tracking:** Coins earned offline are stored locally in SQLite and synced when internet reconnects

### 1.3. Key Features

- **Title Bar Coin Balance:** Prominent display (yellow background, coin emoji 💰, large bold font)
- **Real-Time Updates:** Uses WebSocket for instant balance updates OR polling every 5 seconds
- **Coin Animation:** Lottie animation of coin flying from center screen to Title Bar
- **Transaction History Modal:** Click balance → opens modal with full transaction log
- **Transaction Categories:** Color-coded by type (task completion, quiz bonus, coach award)
- **Offline Support:** Coins earned offline stored in SQLite, synced automatically when online
- **Visual Milestones:** Special animations for milestones (100 coins, 500 coins, 1000 coins)

### 1.4. Child-Friendly UX Considerations

- **Large Numbers:** Coin balance displayed in extra-large font (text-2xl or 32px)
- **Visual Prominence:** Yellow/gold color scheme (easily recognizable as currency)
- **Encouraging Language:** Transaction history uses positive phrasing (e.g., "Great job on Typing Game! +50 coins")
- **Celebratory Animations:** Confetti effect on milestone achievements (100/500/1000 coins)
- **Simple Math:** Running total displayed (e.g., "1,250 coins total")
- **Patrick Hand Font:** Child-friendly handwritten typography

---

## 1.5. Visual Layout Diagrams

### Title Bar Coin Balance - Detailed Layout

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ Title Bar (72px height, bg-white, border-b border-gray-200)                    │
│                                                                                 │
│  ┌────────────────────┐    ┌─────────────────┐  ┌───────────┐  ┌────────────┐ │
│  │ [ISF Logo]         │    │ 💰 1,250        │  │ 🔔 3      │  │ ⏱️ 00:45:32 │ │
│  │ ISF Playground     │    │                 │  │           │  │            │ │
│  │ (Logo + Text)      │    │ ← COIN BALANCE  │  │ Notif     │  │ Timer      │ │
│  │ 200px width        │    │ (Click to open  │  │ Bell      │  │            │ │
│  └────────────────────┘    │  history modal) │  │           │  │            │ │
│                            │ 180px width     │  │ 80px w.   │  │ 140px w.   │ │
│  Logo on left edge         │ bg-yellow-100   │  │           │  │            │ │
│                            │ border-2        │  │           │  │            │ │
│                            │ border-yellow-  │  │           │  │            │ │
│                            │ 300 rounded-    │  │           │  │            │ │
│                            │ full px-4 py-2  │  │           │  │            │ │
│                            └─────────────────┘  └───────────┘  └────────────┘ │
│                                                                                 │
│  Left aligned              Center-left          Center-right   Right aligned   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Coin Balance Component - Detailed Breakdown

```
┌─────────────────┐
│ 💰 1,250        │  ← Clickable div (cursor-pointer)
│                 │     bg-yellow-100 (light gold background)
│                 │     border-2 border-yellow-300 (gold border)
│                 │     rounded-full (fully rounded corners)
│                 │     px-4 py-2 (padding: 16px horizontal, 8px vertical)
│                 │     hover:bg-yellow-200 (darker on hover)
│                 │     transition-colors (smooth color change)
└─────────────────┘
      ↑     ↑
      │     └── Balance text (font-bold text-2xl text-gray-900)
      │         Formatted with commas (e.g., 1,250 not 1250)
      │         Font: Patrick Hand, 32px (text-2xl)
      │
      └── Coin emoji (text-3xl, 40px size)
          Yellow circle emoji 💰 or custom SVG coin icon
```

### Coin Animation Sequence (Earning Flow)

```
Frame-by-Frame Animation (1.5 seconds total):

Frame 1 (0.0s): Coin appears at center of screen
┌─────────────────────────────────────────────────────┐
│                                                     │
│                                                     │
│                       💰                            │ ← Coin spawns at center
│                    (scale: 0)                       │    (scale 0 → 1.5)
│                                                     │    (opacity 0 → 1)
│                                                     │
└─────────────────────────────────────────────────────┘

Frame 2 (0.3s): Coin scales up and spins
┌─────────────────────────────────────────────────────┐
│                                                     │
│                       💰                            │ ← Coin at 1.5x scale
│                   (scale: 1.5)                      │    Rotation: 0 → 180deg
│                   (rotate: 90°)                     │    Opacity: 1
│                                                     │
└─────────────────────────────────────────────────────┘

Frame 3 (0.8s): Coin flies toward Title Bar
┌─────────────────────────────────────────────────────┐
│                          💰 ← Moving along arc      │
│                         /                           │
│                       /                             │
│                     /                               │
│                   /                                 │
│                 💰 (faded ghost)                    │ ← Ghost trail effect
└─────────────────────────────────────────────────────┘

Frame 4 (1.2s): Coin reaches Title Bar balance
┌─────────────────────────────────────────────────────┐
│ Title Bar: [💰 1,250] ← Coin merges here           │
│                    ↑                                │
│                    💰 (scale: 1.0)                  │
│                                                     │
└─────────────────────────────────────────────────────┘

Frame 5 (1.5s): Balance updates with pulsing effect
┌─────────────────────────────────────────────────────┐
│ Title Bar: [💰 1,300] ← Balance updates             │
│                    ↑                                │
│             (pulse effect: scale 1.0 → 1.2 → 1.0)   │
│             Green "+50" text fades in/out           │
└─────────────────────────────────────────────────────┘

CSS Animation Classes:
.coin-spawn { animation: coin-spawn 0.3s ease-out; }
.coin-fly { animation: coin-fly 1.2s cubic-bezier(0.4, 0.0, 0.2, 1); }
.balance-pulse { animation: balance-pulse 0.3s ease-in-out; }

Sound Effect: "coin-chime.mp3" (plays at Frame 4)
```

### Transaction History Modal - Full Layout

```
┌───────────────────────────────────────────────────────────────────────────────┐
│ Transaction History Modal (560px width, 640px height)                         │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│  │ │  💰 Your ISF Coin History                                 [✕ Close] │ │ │ ← Header (64px)
│  │ │                                                                     │ │ │   bg-yellow-50
│  │ │  Total Earned: 1,250 coins                                          │ │ │   border-b
│  │ └─────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                         │ │
│  │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│  │ │ Filter: [All ▼] [This Week ▼]  Sort: [Newest First ▼]              │ │ │ ← Filters (48px)
│  │ └─────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                         │ │
│  │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│  │ │ ┌─────────────────────────────────────────────────────────────────┐ │ │ │
│  │ │ │ Oct 24, 2025 • 2:45 PM                            +50 💰       │ │ │ │ ← Transaction Item
│  │ │ │ Great job on Typing Game!                                      │ │ │ │   (88px height)
│  │ │ │ Computer Apps > MS Word > Level 3                              │ │ │ │   bg-green-50
│  │ │ └─────────────────────────────────────────────────────────────────┘ │ │ │   border-l-4
│  │ │                                                                     │ │ │   border-green-500
│  │ │ ┌─────────────────────────────────────────────────────────────────┐ │ │ │
│  │ │ │ Oct 24, 2025 • 2:30 PM                            +120 💰      │ │ │ │ ← Transaction Item
│  │ │ │ Excellent quiz score! (85%)                                    │ │ │ │   (Quiz bonus)
│  │ │ │ Life Skills > Quiz 7                                           │ │ │ │   bg-blue-50
│  │ │ └─────────────────────────────────────────────────────────────────┘ │ │ │   border-l-4
│  │ │                                                                     │ │ │   border-blue-500
│  │ │ ┌─────────────────────────────────────────────────────────────────┐ │ │ │
│  │ │ │ Oct 24, 2025 • 1:15 PM                            +80 💰       │ │ │ │ ← Transaction Item
│  │ │ │ Coach Priya loved your artwork!                                │ │ │ │   (Coach award)
│  │ │ │ Art Course > Free Sketch                                       │ │ │ │   bg-pink-50
│  │ │ └─────────────────────────────────────────────────────────────────┘ │ │ │   border-l-4
│  │ │                                                                     │ │ │   border-pink-500
│  │ │ ┌─────────────────────────────────────────────────────────────────┐ │ │ │
│  │ │ │ Oct 24, 2025 • 12:00 PM                           +50 💰       │ │ │ │
│  │ │ │ Completed Poetry Recitation                                    │ │ │ │
│  │ │ │ Spoken English > Poem 5                                        │ │ │ │
│  │ │ └─────────────────────────────────────────────────────────────────┘ │ │ │
│  │ │                                                                     │ │ │ ← Scrollable List
│  │ │ ┌─────────────────────────────────────────────────────────────────┐ │ │ │   (440px height)
│  │ │ │ Oct 23, 2025 • 4:30 PM                            +40 💰       │ │ │ │   overflow-y-auto
│  │ │ │ Finished Tux Typing Level 2                                    │ │ │ │
│  │ │ │ Computer Apps > Tux Typing                                     │ │ │ │
│  │ │ └─────────────────────────────────────────────────────────────────┘ │ │ │
│  │ │                                                                     │ │ │
│  │ │ ┌─────────────────────────────────────────────────────────────────┐ │ │ │
│  │ │ │ Oct 23, 2025 • 3:00 PM                            +30 💰       │ │ │ │
│  │ │ │ Good effort on Life Skills voice question                      │ │ │ │
│  │ │ │ Life Skills > Question 3                                       │ │ │ │
│  │ │ └─────────────────────────────────────────────────────────────────┘ │ │ │
│  │ │                                                                     │ │ │
│  │ │ ... (load more on scroll)                                          │ │ │
│  │ └─────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                         │ │
│  │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│  │ │ Showing 6 of 42 transactions • [Load More]                          │ │ │ ← Footer (56px)
│  │ └─────────────────────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────────┘
```

### Transaction Item - Detailed Breakdown

```
┌─────────────────────────────────────────────────────────────────────┐
│ Oct 24, 2025 • 2:45 PM                            +50 💰           │ ← Transaction Item
│ Great job on Typing Game!                                          │   (88px height)
│ Computer Apps > MS Word > Level 3                                  │
└─────────────────────────────────────────────────────────────────────┘
  ↑               ↑                                         ↑
  │               │                                         └── Coin amount
  │               │                                             (text-xl font-bold)
  │               │                                             Green for positive
  │               │                                             (text-green-600)
  │               │
  │               └── Transaction description (text-base font-medium)
  │                   Encouraging language, child-friendly
  │
  └── Timestamp (text-sm text-gray-600)
      Format: "Oct 24, 2025 • 2:45 PM"

Border-left color coding:
- Green (border-green-500): Task completion
- Blue (border-blue-500): Quiz bonus
- Pink (border-pink-500): Coach award
- Purple (border-purple-500): Milestone achievement
```

### Milestone Celebration Modal

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│                             🎉 Milestone! 🎉                                  │
│                                                                               │
│                        ┌────────────────────┐                                │
│                        │                    │                                │
│                        │   💰💰💰💰💰        │                                │
│                        │                    │                                │
│                        │  100 COINS!        │ ← Large text (text-5xl)       │
│                        │                    │   Font: Patrick Hand           │
│                        │  You're amazing!   │   Confetti animation overlayed │
│                        │                    │                                │
│                        └────────────────────┘                                │
│                                                                               │
│                    [🎊 Awesome! Let's Continue]                               │ ← Close button
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘

Milestone Thresholds:
- 100 coins: "🎉 You're amazing!"
- 500 coins: "🌟 You're a superstar!"
- 1000 coins: "🏆 You're a legend!"
- 5000 coins: "👑 You're the champion!"

Confetti animation: Lottie JSON file (confetti falling from top)
Auto-dismiss after 5 seconds OR manual close
```

### Coin Balance State Flow Diagram

```
Coin Earning & Display Flow:

┌──────────────────┐
│   TASK START     │  - Coin balance shows current total (e.g., 1,250)
│   (Initial)      │  - No animations active
└────────┬─────────┘
         │
         │ (Student completes task: quiz, typing game, artwork, etc.)
         ↓
┌──────────────────┐
│ TASK COMPLETE    │  - Backend calculates coins earned (e.g., +50)
│ (Processing)     │  - POST /api/v2/lms/student/:id/progress
└────────┬─────────┘  - Response includes coinsEarned: 50, updatedBalance: 1300
         │
         │ (Server responds with coin amount)
         ↓
┌──────────────────┐
│ ANIMATION START  │  - Coin spawns at center screen (scale 0 → 1.5)
│ (Frame 1-2)      │  - Rotation animation (0° → 180°)
└────────┬─────────┘  - Sound effect: "coin-spawn.mp3" plays
         │
         │ (0.3 seconds)
         ↓
┌──────────────────┐
│ COIN FLIGHT      │  - Coin flies along arc path toward Title Bar
│ (Frame 3)        │  - Cubic-bezier easing for smooth motion
└────────┬─────────┘  - Ghost trail effect (fading opacity)
         │
         │ (1.2 seconds)
         ↓
┌──────────────────┐
│ COIN MERGE       │  - Coin reaches Title Bar balance component
│ (Frame 4)        │  - Sound effect: "coin-chime.mp3" plays
└────────┬─────────┘  - Coin merges into balance (opacity 1 → 0)
         │
         │ (Instant)
         ↓
┌──────────────────┐
│ BALANCE UPDATE   │  - Balance text updates: 1,250 → 1,300
│ (Frame 5)        │  - Pulse effect: scale 1.0 → 1.2 → 1.0
└────────┬─────────┘  - Green "+50" text fades in above balance
         │            - Duration: 0.3 seconds
         │
         │ (Check milestone)
         ↓
    ┌────────────────────────────┐
    │ IF milestone reached?      │
    │ (e.g., 100, 500, 1000)     │
    └────┬───────────────────┬───┘
         │                   │
    YES  │                   │ NO
         ↓                   ↓
┌──────────────────┐  ┌──────────────────┐
│ MILESTONE MODAL  │  │  IDLE STATE      │
│ (Celebration)    │  │  (Ready for next │
└────────┬─────────┘  │   task)          │
         │            └──────────────────┘
         │ (Confetti animation, 5 seconds OR manual close)
         ↓
┌──────────────────┐
│  IDLE STATE      │  - Balance shows updated total
│  (Ready)         │  - User can click balance to view history
└──────────────────┘

Offline Handling:
- If offline: coins saved to SQLite offline_coins table (synced=0)
- Show "Offline" badge next to balance (yellow dot indicator)
- On reconnection: sync all offline coins, batch-update balance
- Play catch-up animation (rapid coin additions if multiple offline transactions)
```

### Responsive Layouts

#### Desktop (1366x768) - Default Layout
- Coin balance: 180px width, text-2xl (32px) coin amount
- Transaction modal: 560px width, 640px height (centered)
- Transaction items: 88px height, full details visible

#### Tablet (768px - 1023px)
- Coin balance: 140px width, text-xl (24px) coin amount
- Transaction modal: 480px width, 560px height
- Transaction items: 72px height, truncated descriptions

#### Mobile (<768px)
- Coin balance: 100px width, text-lg (18px) coin amount, emoji only (no text label)
- Transaction modal: Full screen (100vw, 100vh)
- Transaction items: 64px height, single-line descriptions

### Component Measurements Summary

| Element | Width | Height | Padding | Margin | Border |
|---------|-------|--------|---------|--------|--------|
| Coin Balance (Desktop) | 180px | 48px | px-4 py-2 | - | 2px yellow-300 rounded-full |
| Coin Balance (Mobile) | 100px | 40px | px-3 py-1 | - | 2px yellow-300 rounded-full |
| Transaction Modal | 560px | 640px | - | mx-auto | 2px gray-300 rounded-xl |
| Modal Header | 100% | 64px | px-6 py-4 | - | border-b gray-200 |
| Transaction Item | 100% | 88px | px-6 py-4 | mb-3 | border-l-4 (color-coded) |
| Filter Bar | 100% | 48px | px-4 py-2 | mb-4 | border-b gray-100 |
| Milestone Modal | 480px | 360px | p-8 | mx-auto | 4px yellow-300 rounded-xl |
| Coin Animation (Spawn) | 64px | 64px | - | - | - (absolute positioning) |

---

## 2. Acceptance Criteria

### 2.1. Real-Time Coin Balance Display

- [ ] **CB-01:** Coin balance displays in Title Bar (yellow background, coin emoji 💰, bold font)
- [ ] **CB-02:** Balance formatted with commas (e.g., "1,250" not "1250")
- [ ] **CB-03:** Balance updates within 2 seconds of earning coins (WebSocket or 5-second polling)
- [ ] **CB-04:** Balance is clickable (cursor changes to pointer on hover)
- [ ] **CB-05:** Clicking balance opens Transaction History modal
- [ ] **CB-06:** Balance persists across page navigation (stored in React Context)

### 2.2. Coin Animation

- [ ] **ANIM-01:** Coin spawns at center screen when coins earned (scale 0 → 1.5 over 0.3s)
- [ ] **ANIM-02:** Coin rotates during spawn animation (0° → 180°)
- [ ] **ANIM-03:** Sound effect plays during spawn ("coin-spawn.mp3")
- [ ] **ANIM-04:** Coin flies toward Title Bar along arc path (1.2 seconds, cubic-bezier easing)
- [ ] **ANIM-05:** Ghost trail effect follows coin (fading opacity)
- [ ] **ANIM-06:** Coin chime sound plays when reaching Title Bar ("coin-chime.mp3")
- [ ] **ANIM-07:** Balance text pulses on update (scale 1.0 → 1.2 → 1.0 over 0.3s)
- [ ] **ANIM-08:** Green "+X" text fades in/out above balance showing amount earned
- [ ] **ANIM-09:** Animation runs smoothly at 60 FPS (no lag or jitter)
- [ ] **ANIM-10:** Multiple coin animations queue if earned rapidly (e.g., quiz completion + bonus)

### 2.3. Transaction History Modal

- [ ] **TH-01:** Modal opens when coin balance is clicked
- [ ] **TH-02:** Modal displays "Your ISF Coin History" header with total coins earned
- [ ] **TH-03:** Transactions listed in reverse chronological order (newest first)
- [ ] **TH-04:** Each transaction shows: timestamp, description, amount, category breadcrumb
- [ ] **TH-05:** Transactions color-coded by type:
  - Green: Task completion
  - Blue: Quiz bonus
  - Pink: Coach award
  - Purple: Milestone achievement
- [ ] **TH-06:** Filter dropdown works: "All", "This Week", "This Month", "Last 3 Months"
- [ ] **TH-07:** Category filter works: "All", "Computer Apps", "Art", "Spoken English", "Life Skills"
- [ ] **TH-08:** Sort dropdown works: "Newest First", "Oldest First", "Highest Amount"
- [ ] **TH-09:** Transaction list scrollable (up to 100 transactions loaded)
- [ ] **TH-10:** "Load More" button loads next 20 transactions
- [ ] **TH-11:** Modal closes when "✕ Close" button clicked OR click outside modal
- [ ] **TH-12:** Modal is responsive (full screen on mobile, centered on desktop)

### 2.4. Offline Coin Tracking & Sync

- [ ] **OFF-01:** Coins earned offline saved to SQLite `offline_coins` table (synced=0)
- [ ] **OFF-02:** Offline coin transactions stored with timestamp, amount, reason, relatedTaskId
- [ ] **OFF-03:** Balance displays offline indicator (yellow dot badge) when offline coins pending sync
- [ ] **OFF-04:** On reconnection: offline coins POST to `/api/v2/lms/student/:id/coins/sync`
- [ ] **OFF-05:** Sync updates balance in database and returns updated total
- [ ] **OFF-06:** Failed sync retries with exponential backoff (3 attempts max)
- [ ] **OFF-07:** Sync status toast shown: "Syncing offline coins..." → "All coins synced! +120 coins added."
- [ ] **OFF-08:** After sync: SQLite records marked synced=1, yellow badge disappears

### 2.5. Milestone Celebrations

- [ ] **MS-01:** Milestone modal triggers at thresholds: 100, 500, 1000, 5000 coins
- [ ] **MS-02:** Modal displays congratulatory message based on milestone:
  - 100: "🎉 You're amazing!"
  - 500: "🌟 You're a superstar!"
  - 1000: "🏆 You're a legend!"
  - 5000: "👑 You're the champion!"
- [ ] **MS-03:** Confetti animation overlays modal (Lottie animation, 5 seconds)
- [ ] **MS-04:** Modal auto-dismisses after 5 seconds OR manual close button
- [ ] **MS-05:** Milestone only triggers once per threshold (stored in database: `milestonesAchieved` array)

### 2.6. Child-Friendly UX

- [ ] **UX-01:** Patrick Hand font applied to coin balance and transaction text
- [ ] **UX-02:** Large, readable coin amounts (text-2xl / 32px on desktop)
- [ ] **UX-03:** Encouraging transaction descriptions (e.g., "Great job!", "Excellent work!")
- [ ] **UX-04:** Color-coded visual hierarchy (yellow for coins, green for positive actions)
- [ ] **UX-05:** Animations are smooth, joyful, and non-distracting (60 FPS)

### 2.7. Performance & Accessibility

- [ ] **PERF-01:** Coin balance updates within 2 seconds of earning coins
- [ ] **PERF-02:** Transaction history modal loads within 1 second
- [ ] **PERF-03:** Animations run at 60 FPS minimum (no dropped frames)
- [ ] **PERF-04:** Modal can display 100+ transactions without lag (virtual scrolling)
- [ ] **ACC-01:** Coin balance has ARIA label: "Your coin balance: 1,250 coins"
- [ ] **ACC-02:** Transaction items have ARIA labels with full context
- [ ] **ACC-03:** Keyboard navigation: Tab to coin balance, Enter to open modal, Esc to close

---

## 3. Task Breakdown

### Phase 1: Coin Balance Display (1-1.5 hours)

**Task 1:** Update `TitleBar.jsx` with Coin Balance Component (30 min)
- Add coin balance div to Title Bar (already exists, enhance styling)
- Apply yellow background, gold border, rounded-full styling
- Format balance with commas using `.toLocaleString()`
- Add hover effect (bg-yellow-200 transition)
- Make clickable with `onClick` handler to open modal
- Store balance in React Context (CoinContext)

**Task 2:** Implement Real-Time Balance Updates (45 min)
- Option A (WebSocket): Connect to `ws://localhost:5001/coins/:studentId`
  - Listen to `coin_update` events
  - Update balance in CoinContext state
- Option B (Polling): `setInterval` every 5 seconds
  - GET `/api/v2/lms/student/:studentId/coins/balance`
  - Update balance if changed
- Add "last updated" timestamp to context (for debugging)
- Handle reconnection logic (if WebSocket disconnects)

**Task 3:** Create Offline Balance Indicator (15 min)
- Add yellow dot badge to coin balance when offline coins pending
- Badge displays count: "3 offline transactions"
- Tooltip on hover: "You earned coins offline. They'll sync when you're back online."
- Badge disappears after successful sync

### Phase 2: Coin Animation (1.5-2 hours)

**Task 4:** Create `CoinAnimation.jsx` Component (45 min)
- Render coin icon (emoji 💰 or SVG) in absolute-positioned div
- Implement spawn animation: scale 0 → 1.5, rotation 0° → 180°, opacity 0 → 1
- Use CSS keyframes or Framer Motion library
- Play "coin-spawn.mp3" sound effect on mount (Web Audio API)

**Task 5:** Implement Coin Flight Path (60 min)
- Calculate start position (center screen) and end position (Title Bar balance)
- Use cubic-bezier easing for smooth arc motion
- Animate coin along bezier curve path (1.2 seconds)
- Add ghost trail effect: render 3 fading copies behind coin (opacity 0.7, 0.4, 0.1)
- Play "coin-chime.mp3" when coin reaches Title Bar

**Task 6:** Implement Balance Pulse & Amount Display (30 min)
- On coin merge: pulse Title Bar balance (scale 1.0 → 1.2 → 1.0)
- Show green "+X" text above balance (fade in 0s → 0.2s, fade out 0.8s → 1.0s)
- Update balance text with new total (animate digits counting up)
- Queue multiple animations if multiple coins earned (e.g., quiz + bonus)

### Phase 3: Transaction History Modal (1-1.5 hours)

**Task 7:** Create `TransactionHistoryModal.jsx` Component (45 min)
- Render modal with header, filter bar, scrollable transaction list, footer
- Add close button (✕ icon) and click-outside-to-close handler
- Fetch transactions: GET `/api/v2/lms/student/:studentId/coins/transactions?limit=20&offset=0`
- Map transactions to `TransactionItem` components
- Style with yellow header, white background, gray borders

**Task 8:** Build `TransactionItem.jsx` Component (30 min)
- Render timestamp (format: "Oct 24, 2025 • 2:45 PM")
- Render description text (e.g., "Great job on Typing Game!")
- Render breadcrumb (e.g., "Computer Apps > MS Word > Level 3")
- Render coin amount (large, bold, green: "+50 💰")
- Apply color-coded left border based on transaction type
- Add hover effect (bg-gray-50 transition)

**Task 9:** Implement Filters & Sorting (30 min)
- Add date filter dropdown: "All", "This Week", "This Month", "Last 3 Months"
- Add category filter dropdown: "All", "Computer Apps", "Art", "Spoken English", "Life Skills"
- Add sort dropdown: "Newest First", "Oldest First", "Highest Amount"
- On filter change: re-fetch transactions with query params
- Update transaction list reactively

### Phase 4: Milestone Celebrations (45 min - 1 hour)

**Task 10:** Create `MilestoneCelebrationModal.jsx` Component (30 min)
- Render modal with large coin icons (💰💰💰💰💰)
- Display milestone amount (text-5xl: "100 COINS!")
- Display congratulatory message based on threshold
- Overlay Lottie confetti animation (JSON file)
- Auto-dismiss after 5 seconds using `setTimeout`
- Add manual close button: "🎊 Awesome! Let's Continue"

**Task 11:** Implement Milestone Trigger Logic (30 min)
- On balance update: check if new balance crosses milestone threshold
- Fetch user's `milestonesAchieved` array from backend
- If milestone not in array: trigger celebration modal
- POST milestone achievement to backend (updates `milestonesAchieved` array)
- Ensure milestone only triggers once per threshold

### Phase 5: Offline Sync (1 hour)

**Task 12:** Implement Offline Coin Storage in SQLite (30 min)
- When coin earned offline: INSERT into `offline_coins` table
  - Fields: studentId, transactionType, amount, reason, relatedTaskId, timestamp, synced=0
- Update local balance in React Context (optimistic update)
- Show offline indicator badge on coin balance

**Task 13:** Build Sync Service on Reconnection (30 min)
- Create `coinSyncService.js` utility
- Listen to `window.addEventListener('online', handleCoinSync)` event
- On reconnection: query SQLite for `synced=0` records
- POST to `/api/v2/lms/student/:studentId/coins/sync` with offline transactions array
- Backend processes transactions, updates balance, returns new total
- Update SQLite records: `UPDATE offline_coins SET synced=1 WHERE id IN (...)`
- Show toast: "All coins synced! +120 coins added."
- Update balance in React Context and remove offline badge

### Phase 6: Testing & Polish (1 hour)

**Task 14:** Manual Testing Across Devices (30 min)
- Test coin balance display: verify formatting, clickability, real-time updates
- Test coin animation: verify spawn, flight, merge, pulse effects
- Test transaction history: verify modal opens, transactions load, filters work
- Test milestone celebration: trigger 100-coin milestone, verify confetti animation
- Test offline sync: earn coins offline → go online → verify sync

**Task 15:** Edge Case Handling & Error Messages (30 min)
- Handle balance fetch failure: show "Balance unavailable" placeholder
- Handle transaction history fetch failure: show "Unable to load history. Try again."
- Handle animation errors: fallback to instant balance update if animation fails
- Handle WebSocket disconnect: switch to polling mode automatically
- Validate milestone thresholds: prevent duplicate celebrations

---

## 4. API Endpoints

### 4.1. Get Coin Balance

**GET `/api/v2/lms/student/:studentId/coins/balance`**

**Response (200 OK):**
```json
{
  "studentId": "67890",
  "coinBalance": 1250,
  "lastTransaction": {
    "id": "txn123",
    "amount": 50,
    "reason": "Completed Typing Game",
    "timestamp": "2025-10-24T14:45:00Z"
  },
  "offlineCoins": 0,  // Coins pending sync
  "milestonesAchieved": [100, 500]  // Milestones already celebrated
}
```

---

### 4.2. Get Transaction History

**GET `/api/v2/lms/student/:studentId/coins/transactions`**

**Query Parameters:**
- `limit` (optional, default: 20): Number of transactions to return
- `offset` (optional, default: 0): Pagination offset
- `dateFilter` (optional): "this_week" | "this_month" | "last_3_months"
- `categoryFilter` (optional): "computer_apps" | "art" | "spoken_english" | "life_skills"
- `sortBy` (optional): "newest_first" | "oldest_first" | "highest_amount"

**Example Request:**
```http
GET /api/v2/lms/student/67890/coins/transactions?limit=20&offset=0&dateFilter=this_week&sortBy=newest_first HTTP/1.1
```

**Response (200 OK):**
```json
{
  "studentId": "67890",
  "totalCoins": 1250,
  "totalTransactions": 42,
  "transactions": [
    {
      "id": "txn123",
      "transactionType": "task_completion",
      "amount": 50,
      "reason": "Great job on Typing Game!",
      "category": "Computer Apps",
      "breadcrumb": "Computer Apps > MS Word > Level 3",
      "taskId": "task456",
      "timestamp": "2025-10-24T14:45:00Z"
    },
    {
      "id": "txn124",
      "transactionType": "quiz_bonus",
      "amount": 120,
      "reason": "Excellent quiz score! (85%)",
      "category": "Life Skills",
      "breadcrumb": "Life Skills > Quiz 7",
      "taskId": "quiz789",
      "timestamp": "2025-10-24T14:30:00Z"
    },
    {
      "id": "txn125",
      "transactionType": "coach_award",
      "amount": 80,
      "reason": "Coach Priya loved your artwork!",
      "category": "Art",
      "breadcrumb": "Art Course > Free Sketch",
      "taskId": "art001",
      "awardedBy": {
        "coachId": "coach123",
        "coachName": "Coach Priya"
      },
      "timestamp": "2025-10-24T13:15:00Z"
    }
    // ... 17 more transactions
  ],
  "hasMore": true  // More transactions available
}
```

---

### 4.3. Sync Offline Coins

**POST `/api/v2/lms/student/:studentId/coins/sync`**

**Request Body:**
```json
{
  "offlineTransactions": [
    {
      "localId": "offline_coin_1",
      "transactionType": "task_completion",
      "amount": 50,
      "reason": "Completed Typing Game",
      "relatedTaskId": "task456",
      "timestamp": "2025-10-23T18:00:00Z"
    },
    {
      "localId": "offline_coin_2",
      "transactionType": "quiz_pass",
      "amount": 120,
      "reason": "Completed Life Skills Quiz",
      "relatedTaskId": "quiz789",
      "timestamp": "2025-10-23T17:30:00Z"
    }
  ]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "syncResults": {
    "transactionsSynced": 2,
    "coinsSynced": 170,
    "failedTransactions": [],
    "updatedCoinBalance": 1420
  },
  "message": "All offline coins have been synced successfully! +170 coins added."
}
```

---

### 4.4. Record Milestone Achievement

**POST `/api/v2/lms/student/:studentId/coins/milestone`**

**Request Body:**
```json
{
  "milestoneAmount": 1000,
  "achievedAt": "2025-10-24T15:00:00Z"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "milestone": {
    "amount": 1000,
    "message": "You're a legend!",
    "achievedAt": "2025-10-24T15:00:00Z"
  },
  "milestonesAchieved": [100, 500, 1000]  // Updated array
}
```

---

### 4.5. WebSocket Events (Optional Real-Time Updates)

**WebSocket Endpoint:** `ws://localhost:5001/coins/:studentId`

**Client → Server (Subscribe):**
```json
{
  "action": "subscribe",
  "studentId": "67890"
}
```

**Server → Client (Coin Update):**
```json
{
  "event": "coin_update",
  "data": {
    "studentId": "67890",
    "newBalance": 1300,
    "coinsEarned": 50,
    "reason": "Completed Typing Game",
    "transactionId": "txn123",
    "timestamp": "2025-10-24T14:45:00Z"
  }
}
```

**Server → Client (Milestone Achieved):**
```json
{
  "event": "milestone_achieved",
  "data": {
    "studentId": "67890",
    "milestoneAmount": 1000,
    "message": "You're a legend!",
    "timestamp": "2025-10-24T15:00:00Z"
  }
}
```

---

## 5. File Paths

### 5.1. Frontend Files (React Components)

```
frontend/src/
├── components/
│   ├── student/
│   │   ├── TitleBar.jsx                         (UPDATED - enhanced coin balance)
│   │   ├── coins/
│   │   │   ├── CoinBalance.jsx                   ← NEW (extracted from TitleBar)
│   │   │   ├── CoinAnimation.jsx                 ← NEW (spawn + flight animation)
│   │   │   ├── TransactionHistoryModal.jsx       ← NEW (transaction list modal)
│   │   │   ├── TransactionItem.jsx               ← NEW (single transaction card)
│   │   │   └── MilestoneCelebrationModal.jsx     ← NEW (milestone popup)
│   ├── common/
│   │   └── ConfettiAnimation.jsx                 ← NEW (Lottie confetti overlay)
├── contexts/
│   └── CoinContext.jsx                          ← NEW (global coin balance state)
├── services/
│   ├── coinService.js                           ← NEW (API calls for coins)
│   ├── coinSyncService.js                       ← NEW (offline sync logic)
│   └── websocketService.js                      ← NEW (WebSocket connection)
├── hooks/
│   ├── useCoinBalance.js                        ← NEW (hook for balance state)
│   ├── useCoinAnimation.js                      ← NEW (hook for animation state)
│   └── useMilestones.js                         ← NEW (hook for milestone logic)
└── assets/
    ├── sounds/
    │   ├── coin-spawn.mp3                        ← NEW (coin spawn sound)
    │   └── coin-chime.mp3                        ← NEW (coin merge sound)
    └── animations/
        └── confetti.json                         ← NEW (Lottie confetti animation)
```

### 5.2. Backend Files (Node.js + Express)

```
backend/
├── controllers/
│   └── coinController.js                        ← NEW (coin balance + transaction handlers)
├── routes/
│   └── v2/
│       └── lms/
│           └── coins.js                          ← NEW (coin-related routes)
├── services/
│   ├── coinService.js                           ← NEW (coin business logic)
│   └── milestoneService.js                      ← NEW (milestone detection logic)
├── models/
│   ├── CoinTransactions.js                      (already exists, extended)
│   └── User.js                                  (UPDATED - add milestonesAchieved field)
├── websockets/
│   └── coinSocket.js                            ← NEW (WebSocket coin updates)
└── db/
    └── sqlite/
        └── offlineSchema.sql                    (UPDATED - add offline_coins table)
```

### 5.3. Database Schemas

**MongoDB Collection: `CoinTransactions` (Already Exists - Extended)**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  transactionType: String,  // "task_completion" | "quiz_pass" | "quiz_bonus" | "coach_award" | "milestone"
  amount: Number,           // Positive (earning)
  reason: String,           // "Great job on Typing Game!"
  category: String,         // "Computer Apps" | "Art" | "Spoken English" | "Life Skills"
  breadcrumb: String,       // "Computer Apps > MS Word > Level 3"
  relatedTaskId: ObjectId,  // Reference to task, quiz, or artwork
  awardedBy: ObjectId,      // Reference to Coach (if manual award)
  timestamp: Date,
  offlineTransaction: Boolean,
  syncedAt: Date
}
```

**MongoDB Collection: `User` (Updated - Add Milestones Field)**
```javascript
{
  _id: ObjectId,
  name: String,
  role: String,
  coinBalance: Number,
  milestonesAchieved: [Number],  ← NEW: [100, 500, 1000, 5000]
  // ... other user fields
}
```

**SQLite Table: `offline_coins` (Already Exists)**
```sql
CREATE TABLE offline_coins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  studentId TEXT NOT NULL,
  transactionType TEXT NOT NULL,
  amount INTEGER NOT NULL,
  reason TEXT,
  relatedTaskId TEXT,
  timestamp TEXT,
  synced INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. Definition of Done

### 6.1. Development Complete

- [ ] All 15 tasks from Section 3 completed and checked off
- [ ] Code committed to feature branch: `feature/sprint-2-epic-01-story-06`
- [ ] No console errors or warnings in browser DevTools
- [ ] All components follow React v19.0.0 best practices

### 6.2. Functional Requirements Met

- [ ] Coin balance displays in Title Bar with real-time updates
- [ ] Coin animation plays on earning coins (spawn → flight → merge → pulse)
- [ ] Transaction history modal shows all transactions with filters/sorting
- [ ] Milestone celebrations trigger at correct thresholds (100, 500, 1000, 5000)
- [ ] Offline coins sync correctly when reconnecting to internet

### 6.3. Testing & Quality Assurance

- [ ] **Unit Tests:** 80%+ coverage for coin logic (balance updates, animation triggers, sync service)
- [ ] **Integration Tests:** API endpoints return correct responses (balance, transactions, sync)
- [ ] **E2E Tests:** Critical paths tested:
  - Student completes task → earns coins → animation plays → balance updates
  - Student clicks balance → modal opens → transactions display → filters work
  - Student earns 100 coins → milestone modal triggers → confetti plays
  - Student works offline → earns coins → reconnects → coins sync
- [ ] **Manual Testing:**
  - Tested on Windows desktop (1366x768)
  - Tested coin animation smoothness (60 FPS)
  - Tested WebSocket real-time updates
  - Tested offline sync with 5+ transactions

### 6.4. Performance & Accessibility

- [ ] Coin balance updates within 2 seconds of earning
- [ ] Transaction history modal loads within 1 second
- [ ] Animations run at 60 FPS minimum
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] ARIA labels present for screen readers

### 6.5. Code Review & Approval

- [ ] Code peer-reviewed by senior developer
- [ ] No critical issues flagged
- [ ] TailwindCSS classes follow design system
- [ ] Animations are smooth and joyful

### 6.6. Documentation & Handoff

- [ ] E2E test template generated: `docs/qa/e2e/sprint-2-epic-01-story-06-isf-coin-wallet.md`
- [ ] Quality gate YAML created: `docs/qa/gates/sprint-2-epic-01-story-06.yml` (status: PASS)
- [ ] API documentation updated
- [ ] QA team notified

### 6.7. Deployment Ready

- [ ] Feature branch merged to `develop`
- [ ] No merge conflicts
- [ ] CI/CD pipeline passes
- [ ] Staging deployment successful
- [ ] Product Owner sign-off obtained

---

## 7. Notes & Assumptions

### 7.1. Technical Assumptions

- **WebSocket vs Polling:** Use WebSocket for real-time updates if available, fallback to 5-second polling
- **Animation Library:** Use Framer Motion for coin animations (smoother than CSS keyframes)
- **Sound Effects:** Load audio files asynchronously, gracefully handle if unavailable
- **Offline Storage:** IndexedDB can store up to 100 offline coin transactions before requiring sync

### 7.2. Design Decisions

- **Yellow/Gold Color Scheme:** Universally recognized as currency, child-friendly
- **Large Coin Amounts:** Easy to read, motivating for students
- **Milestone Thresholds:** Spaced to maintain motivation (100, 500, 1000, 5000)
- **Transaction Categories:** Match course types for easy filtering

### 7.3. Open Questions

1. **Coin Exchange:** Will students be able to spend coins in a future shop/rewards system? (Future sprint)
2. **Leaderboard:** Should coin balance factor into global leaderboards? (Covered in separate story)
3. **Coin Decay:** Should coins expire after inactivity? (Recommendation: No, to maintain student motivation)

---

## 8. Related Documents

- **Epic 01 Overview:** `docs/epics/sprint2/sprint-2-epic-01-lms-student-experience.md`
- **Sprint 2 MPSD:** `docs/epics/sprint-2-master-plan.md`
- **Sprint 2 Design System:** `docs/design-systems/sprint-2-lms-design-system.md`
- **Story 01 (Title Bar):** `docs/stories/sprint2/epic-01-story-01-student-homepage-course-navigation.md`
- **Story 02-05 (Coin-Earning Activities):** All stories in Epic 01

---

**Dev Agent Record:**
- **Created:** 2025-10-24 14:48:08 (via `date '+%Y-%m-%d %H:%M:%S'`)
- **Status:** Draft - Ready for Development
- **Next Steps:** Assign to frontend developer for coin balance implementation

---

**QA Agent Record:**
- **E2E Template:** Pending generation
- **Quality Gate:** Pending creation
- **Testing Status:** Not started

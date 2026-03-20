# Seed Data Guide — Unblock Remaining 13 Fixme'd E2E Tests

**Date:** 2026-03-20
**For:** Human tester (Dev or team member)
**Time:** ~30 minutes
**Prerequisites:** Backend running on :5001, Frontend running on :3000, MongoDB Atlas connected

---

## Overview

After Epic 15 verification, 13 E2E tests remain fixme'd — all blocked on missing seed data or one missing route. This guide walks you through creating the data manually via the admin UI.

| Category | Fixme'd Tests | What's Missing |
|----------|--------------|----------------|
| Spoken English | 3 | No spoken english course in DB |
| Life Skills Voice | 1 | No voice task in DB |
| Art Workshops | 4 | No art workshop courses in DB |
| Art Competition | 2 | No competition data in DB |
| Content Library | 3 | Frontend route `/admin/content-library` returns 404 (code fix) |

---

## Step 1: Login as Admin

1. Open http://localhost:3000/admin/login
2. Email: `admin@gmail.com`
3. Password: `test123`
4. You should land on the admin dashboard

---

## Step 2: Create a Spoken English Course

The 3 fixme'd tests expect a published Spoken English course with audio content items.

### 2a. Create the course

1. Navigate to **LMS → Course Management** (sidebar)
2. Click **"Create New Course"** or **"+ New Course"**
3. Fill in:
   - **Title:** `Spoken English — Poetry & Conversation`
   - **Category:** `Spoken English`
   - **Description:** `Students practice spoken English through poetry recitation and conversation exercises`
4. Save the course

### 2b. Add a module

1. Open the course you just created
2. Click **"Add Module"**
3. Fill in:
   - **Title:** `Poetry Recitation`
   - **Description:** `Practice reading poems aloud with proper pronunciation`
   - **Order:** `1`
4. Save

### 2c. Add a chapter

1. Inside the module, click **"Add Chapter"**
2. Fill in:
   - **Title:** `Poem 1: The Road Not Taken`
   - **Description:** `Robert Frost's classic poem about choices`
   - **Order:** `1`
3. Save

### 2d. Add content items

1. Inside the chapter, add content items:

   **Item 1 — Audio instruction:**
   - **Type:** `audio`
   - **Title:** `Listen to the poem read aloud`
   - **File:** Upload any small MP3/audio file (or use a placeholder URL)

   **Item 2 — Task:**
   - **Type:** `task`
   - **Title:** `Record yourself reading the poem`
   - **Description:** `Use the recording button to record your recitation`

2. Save all content items

### 2e. Publish the course

1. Go back to the course overview
2. Change status from **Draft → Published**
3. Confirm publish

### 2f. Assign to test student

1. Navigate to **LMS → Course Assignments** (or switch to coach view)
2. Assign `Spoken English — Poetry & Conversation` to the test student (userId: 1234 / vis@gmail.com)

---

## Step 3: Create a Life Skills Voice Task

The 1 fixme'd test expects a Life Skills course with a voice recording task.

### Check if Life Skills course already exists

1. Go to **LMS → Course Management**
2. Look for a course with category `Life Skills`
3. If one exists, open it and check if it has a chapter with a **voice task** content item

### If no Life Skills course exists, create one:

1. **Create course:**
   - **Title:** `Life Skills — Expressing Feelings`
   - **Category:** `Life Skills`
   - **Description:** `Students learn to express their feelings through voice recordings`

2. **Add module:**
   - **Title:** `Emotional Expression`
   - **Order:** `1`

3. **Add chapter:**
   - **Title:** `How I Feel Today`
   - **Order:** `1`

4. **Add content item:**
   - **Type:** `voice` (or `task` with voice metadata)
   - **Title:** `Record how you feel today`
   - **Description:** `Press and hold the record button to share how you're feeling (up to 60 seconds)`

5. **Publish** the course

6. **Assign** to the test student

### If Life Skills course already exists but has no voice task:

1. Open the existing course
2. Navigate into a module → chapter
3. Add a new content item:
   - **Type:** `voice` or `task`
   - **Title:** `Record your response`
4. Make sure the course is published

---

## Step 4: Create Art Workshop Courses

The 4 fixme'd workshop tests expect Art courses with video content and workshop details.

### 4a. Create Art Workshop Course 1

1. **Create course:**
   - **Title:** `Art Workshop — Watercolor Basics`
   - **Category:** `Art`
   - **Description:** `Learn basic watercolor techniques through guided video workshops`

2. **Add module:**
   - **Title:** `Watercolor Fundamentals`
   - **Order:** `1`

3. **Add chapter:**
   - **Title:** `Workshop 1: Color Mixing`
   - **Description:** `Learn how to mix primary colors to create secondary and tertiary colors. Follow along with the video and use your Artweaver canvas to practice.`
   - **Order:** `1`

4. **Add content items:**

   **Item 1 — Video:**
   - **Type:** `video`
   - **Title:** `Color Mixing Tutorial`
   - **File:** Upload any small video file or use a placeholder URL

   **Item 2 — Instructions:**
   - **Type:** `text`
   - **Title:** `Workshop Instructions`
   - **Content:** `1. Watch the video above\n2. Open Artweaver\n3. Practice mixing colors\n4. Submit your artwork`

5. **Publish** the course

6. **Assign** to the test student

### 4b. Create Art Workshop Course 2 (optional, for variety)

1. **Title:** `Art Workshop — Sketch & Draw`
2. **Category:** `Art`
3. Add a module, chapter, and video content item (same pattern as above)
4. Publish and assign

---

## Step 5: Create Art Competition Data

The 2 fixme'd competition tests expect an active art competition with rules and a leaderboard.

### Via Admin UI (if competition management exists):

1. Look for **Art → Competitions** or **LMS → Art Competitions** in the admin sidebar
2. If the UI exists, create a new competition:
   - **Theme:** `Nature Drawing Challenge`
   - **Description:** `Draw your favorite scene from nature using any medium`
   - **Status:** `active`
   - **Deadline:** Set to a future date (e.g., 2026-04-30)
   - **Rules:**
     - `Only original artwork allowed`
     - `Submit by the deadline`
     - `Use any art medium (pencil, watercolor, digital)`
     - `Maximum canvas size: 1920x1080`
   - **Prizes:**
     - First: `100 ISF Coins`
     - Second: `50 ISF Coins`
     - Third: `25 ISF Coins`
   - **Judging Criteria:**
     - `Creativity`
     - `Technical skill`
     - `Use of color`

### Via MongoDB (if no competition UI exists):

If there's no admin UI for competitions, you'll need to insert directly into MongoDB. Connect to MongoDB Atlas and run:

```js
// Connect: mongosh "mongodb+srv://cluster1.kkubs.mongodb.net/isfplayground" --username admin
// Password: admin0987

db.artcompetitions.insertOne({
  theme: "Nature Drawing Challenge",
  description: "Draw your favorite scene from nature using any medium",
  status: "active",
  deadline: new Date("2026-04-30"),
  prize: {
    first: "100 ISF Coins",
    second: "50 ISF Coins",
    third: "25 ISF Coins"
  },
  rules: [
    "Only original artwork allowed",
    "Submit by the deadline",
    "Use any art medium (pencil, watercolor, digital)",
    "Maximum canvas size: 1920x1080"
  ],
  judging: {
    criteria: ["Creativity", "Technical skill", "Use of color"],
    judges: []
  },
  entries: [
    {
      student: db.users.findOne({ email: "vis@gmail.com" })._id,
      fileUrl: "https://placeholder.com/art1.png",
      title: "Sunset Mountains",
      votes: 5,
      submittedAt: new Date()
    }
  ],
  createdBy: db.users.findOne({ email: "admin@gmail.com" })._id,
  createdAt: new Date(),
  updatedAt: new Date()
});
```

---

## Step 6: Content Library Route Fix (Code Change Required)

The 3 content library tests fail because `/admin/content-library` returns a 404 in the frontend router. The `ContentLibrary.jsx` component exists but isn't wired to a route.

**This is NOT a seed data task — it requires a 1-line code fix:**

A developer needs to add the route in `frontend/src/App.js`:

```jsx
// Find the admin routes section and add:
<Route path="/admin/content-library" element={<ContentLibrary />} />
```

Make sure `ContentLibrary` is imported from `pages/admin/ContentLibrary`.

> **Note to Dev:** This is flagged for the developer to fix, not the human tester. Skip this step if you're only seeding data.

---

## Step 7: Verify the Seed Data

After creating all the data, verify it's accessible:

### As Student (http://localhost:3000/login, userId: 1234):

- [ ] Navigate to Courses → see "Spoken English — Poetry & Conversation" listed
- [ ] Open it → see the module, chapter, and audio content item
- [ ] Navigate to Courses → see "Life Skills — Expressing Feelings" (or existing Life Skills course)
- [ ] Open it → see a voice recording task
- [ ] Navigate to Art → Workshops → see "Art Workshop — Watercolor Basics"
- [ ] Open a workshop → see video player and instructions
- [ ] Navigate to Art → Competition → see "Nature Drawing Challenge"
- [ ] See competition rules and leaderboard

### As Admin (http://localhost:3000/admin/login, admin@gmail.com / test123):

- [ ] Navigate to LMS → Course Management → see all created courses
- [ ] All courses show status: Published
- [ ] Assignments exist for the test student

---

## Step 8: Re-run the Fixme'd Tests

After seeding, a developer should un-fixme and re-run the tests:

```bash
# Student E2E tests
cd frontend && npx playwright test student/courses-quiz.spec.js student/art-course.spec.js --project=student --reporter=list --retries=0

# Admin content library (only after code fix in Step 6)
cd frontend && npx playwright test admin/content-quiz.spec.js --project=admin --reporter=list --retries=0
```

---

## Summary Checklist

| # | Task | Type | Time | Done? |
|---|------|------|------|-------|
| 1 | Login as admin | UI | 1 min | [ ] |
| 2 | Create Spoken English course + content + publish + assign | UI | 8 min | [ ] |
| 3 | Create/verify Life Skills voice task + publish + assign | UI | 5 min | [ ] |
| 4 | Create Art Workshop courses + video content + publish + assign | UI | 8 min | [ ] |
| 5 | Create Art Competition (UI or MongoDB) | UI/DB | 5 min | [ ] |
| 6 | Content Library route fix | Code | 2 min | [ ] |
| 7 | Verify as student + admin | UI | 5 min | [ ] |
| 8 | Re-run fixme'd tests | CLI | 3 min | [ ] |

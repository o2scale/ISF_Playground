# Sprint 2 Verification Walkthrough

**Purpose:** This guide helps the Admin verify that the **Sprint 2 (LMS Admin)** implementation matches the **Master Project Specification Document (MPSD)** requirements.

**Target User:** Admin / QA
**Prerequisites:** Admin Access to LMS Dashboard.

## 1. Course Management (Verification of MPSD Section 13)

**Objective:** Verify complete course creation, structure building, and content management.

### Step 1.1: Create a Course (Metadata & Settings)
1.  Navigate to **LMS Admin > Courses**.
2.  Click **"+ Create New Course"**.
3.  **Verify Fields:**
    *   Title, Description (Rich Text).
    *   Category (Dropdown: Computer Apps, Art, etc.).
    *   Difficulty Level.
    *   **Thumbnail Upload** (Try uploading an image; verify preview).
4.  Click **"Create Draft"**.
5.  **Pass Criteria:** Course appears in the list with a "Draft" badge.

### Step 1.2: Build Course Structure (Modules & Chapters)
1.  Open the newly created course.
2.  Click **"Structure"** tab.
3.  **Actions:**
    *   Click **"+ Add Module"** → Enter title (e.g., "Module 1").
    *   Find Module 1, click **"+ Add Chapter"** → Enter title (e.g., "Chapter 1").
    *   **Drag & Drop:** Create a second module. Drag Module 2 above Module 1.
4.  **Pass Criteria:** Hierarchy is visible (Module > Chapter), reordering updates instantly.

### Step 1.3: Add Multimedia Content (Story 02 Content Management)
1.  Inside a Chapter, click **"+ Add Content"**.
2.  **Verify Types:** Check that you can select Video, PDF, Audio, Quiz.
3.  **Bulk Upload Test:**
    *   Select "Video".
    *   Upload a sample `.mp4` file.
    *   **Verify S3:** Check that the upload progress bar works and completes.
4.  **Pass Criteria:** Content item appears under the chapter. Clicking "Preview" plays the video/opens PDF.

---

## 2. Quiz System (Verification of MPSD Section 13)

**Objective:** Verify assessment creation and extensive question support.

### Step 2.1: Create a Quiz
1.  Navigate to **LMS Admin > Quizzes**.
2.  Click **"+ Create Quiz"**.
3.  **Settings:** Set a Time Limit (e.g., 15 mins) and Passing Score (e.g., 70%).

### Step 2.2: Add Questions (All Types)
1.  **MCQ (Single):** Add a question with 4 options. Mark 'B' as correct.
2.  **True/False:** Add a T/F question.
3.  **Fill-in-Blank:** Add a question "The sky is _____." (Answer: Blue).
4.  **Integration:** Go back to your **Course > Chapter 1**. Add Content > "Existing Quiz" > Select this quiz.
5.  **Pass Criteria:** Quiz is linked to the course structure.

---

## 3. Workflows & Publishing (Verification of MPSD Section 13)

**Objective:** Verify the "Gatekeeper" validation logic.

### Step 3.1: Attempt Invalid Publish
1.  Create a fresh empty course (No modules).
2.  Click **"Publish"**.
3.  **Pass Criteria:** Error Modal appears: "Cannot publish. Course must have at least one module."

### Step 3.2: Valid Publish & Archive
1.  Go to the completed course from Step 1.
2.  Click **"Publish"**.
3.  **Verify:** Status changes to **Published** (Green).
4.  Click **"Archive"**.
5.  **Verify:** Status changes to **Archived** (Red/Gray). Course is hidden from main list.
6.  Go to "Archived" tab > Click **"Restore"**.
7.  **Pass Criteria:** Course returns to "Published" or "Draft" state.

---

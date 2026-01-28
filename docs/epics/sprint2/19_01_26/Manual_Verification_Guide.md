# Manual Verification Guide: ISF Playground LMS (Epic 2 & 3)

## 📋 Pre-requisites
To perform these tests, you need the following user accounts:
1.  **Admin Account:** Roles with 'LMS Management' permissions (e.g., `admin`).
2.  **Coach Account:** Roles with 'Coach' permissions (e.g., `coach`, `sports-coach`).

---

## 🏗️ Epic 2: Admin Course Management

### Test Case 01: Create & Build Course Structure
**Path:** `Admin Dashboard > Courses > [Add Course] or [Edit]`
1.  **Create Course:** Click "Add Course", fill in Metadata (Title, Desc, Category, Level), and Save.
2.  **Add Module:** In the Structure Builder, click **"+ Add Module"**. Verify the modal appears.
3.  **Add Chapter:** Click the "+" on a Module card to add a Chapter.
4.  **Add Content:** Click "+" on a Chapter to add a Content Item (Video, PDF, or HTML).
5.  **Reorder:** Drag and drop modules to change their order. Verify the "Saving..." indicator appears at the top.
6.  **Publish:** Click **"Publish Course"**.
    - *Expected:* Should success only if at least one module/chapter/item exists.

### Test Case 02: Quiz Building
**Path:** `Admin Dashboard > Quizzes > [Create Quiz]`
1.  **Basic Info:** Set Title, Course, Module, and Chapter associations.
2.  **Add Questions:** Click "Add Question" and test:
    - **MCQ:** Add 4 options, mark one as correct.
    - **True/False:** Toggle the correct answer.
    - **Fill in Blank:** Add accepted answers.
3.  **Settings:** Set a time limit (e.g., 10 mins) and passing score (70%).
4.  **Preview:** Click "Preview" to see the student's view of the quiz.
5.  **Save:** Click "Save Draft" or "Publish".

### Test Case 03: Translation Management
**Path:** `Admin Dashboard > Translations`
1.  **Select Course:** Pick a curso to translate.
2.  **Editor:** Use the side-by-side editor to translate titles and descriptions from English to local language.
3.  **Save:** Verify changes persist.

---

## 🎓 Epic 3: Coach Functionality

### Test Case 04: Submission & Grading
**Path:** `Coach Dashboard > Grading`
1.  **Dashboard Stats:** Verify "Pending Submissions" count matches the list.
2.  **Queue Filtering:** Filter by "Course Type" (e.g., Art) or "Status" (Pending).
3.  **Grading Interface:** Click a submission to open the interface.
4.  **View Work:** Watch the student's video or view their Art upload.
5.  **Score & Feedback:** Enter a score (0-100) and provide feedback.
6.  **Award Coins:** (Wait for Story 02 verification) - Verify if "Award Coins" button is active during grading.
7.  **Submit:** Click "Submit Grade". Verify the item moves to the "Graded" tab.

### Test Case 05: Request Management
**Path:** `Coach Dashboard > Requests`
1.  **View Requests:** Verify visibility of student requests for help or material.
2.  **Status Update:** Change request status from "Pending" to "In Progress" or "Resolved".

---

## 🔍 Verification Tips
- **Console Check:** Open DevTools (F12) to watch for 403 (Permission) or 500 (Server) errors during Save actions.
- **RBAC:** If an "Admin" feature is missing for a "Coach" user, verify the `ProtectedRoute.js` logic is correctly preventing access.

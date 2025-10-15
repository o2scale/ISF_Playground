### **Master Project Specification Document (MPSD)**

**Project:** ISF Playground \- Sprint 2  
**Version:** 2.0 (Final)  
**Date:** August 19, 2025

---

### **1\. MPSD Introduction & Sprint 2 Overview**

#### **1.1. Purpose of This Master Project Specification Document**

This Master Project Specification Document (MPSD) serves as the exhaustive, unambiguous, and universally agreed-upon blueprint for the ISF Playground \- Sprint 2\. It is the single source of truth, meticulously detailing every facet of the features planned for this sprint. Its primary purpose is to ensure complete alignment among all stakeholders—including the Client, Project Manager, Design Team, and Development Team—before Sprint 2 development work commences. This MPSD will also be the definitive reference for scope management, enabling the Project Manager to clearly delineate agreed-upon features from out-of-scope requests, thereby ensuring focused and efficient development.

#### **1.2. Project Overview: ISF Playground \- Sprint 2**

Sprint 2 of the ISF Playground project builds upon the core platform established in Sprint 1\. This sprint focuses on the comprehensive integration and enhancement of a Learning Management System (LMS) for students, coaches, and administrators, and significant functional improvements to the Amma role. The entire system is envisioned as an Electron.js desktop application with a Node.js backend and MongoDB database, prioritizing offline capabilities where feasible for core student learning interactions.

#### **1.3. Sprint 2 Goals & Objectives**

The primary goals and objectives for ISF Playground \- Sprint 2 are:

1. **Deliver a Functional LMS Core:** Implement robust course management (creation, assignment, content population), student enrollment, and assessment functionalities, including flexible course assignment for individual weaker students to create personalized learning paths.  
2. **Enable Rich Student Learning Experiences:** Provide students with an interactive and engaging platform to access diverse course types (Computer Apps, Art, Spoken English, Life Skills) primarily through voice and intuitive UI, including offline access to core learning activities, strictly following the client-provided UI mockups.  
3. **Integrate ISF Coin Rewards:** Implement the system for students to earn digital ISF Coins through LMS activity completion and coach grading. The physical handover of coins and subsequent balance deduction via the Coach Android app is a designated Sprint 3 feature.  
4. **Enhance Amma Role Capabilities:** Introduce individual Amma accounts, improve query handling with better categorization and SLA management, and integrate voice note communication.  
5. **Provide Effective Tracking & Reporting:** Equip Coaches and Admins with dashboards for monitoring student performance, course effectiveness, and Amma task/query resolution.  
6. **Strengthen Backend & Database:** Update MongoDB schemas and backend APIs to robustly support all new LMS and Amma functionalities, including Role-Based Access Control (RBAC).  
   ---

   ### **2\. Target Users/Personas for Sprint 2 Features**

* **Student:** The primary consumer of the LMS content. Interacts with courses via voice and minimal UI, completes tasks, takes quizzes, records performances, earns ISF coins. Accesses via facial recognition on registered PCs.  
* **Coach:** Assigns Admin-created courses to Balagruhas or specific students. Grades subjective student work (Art, Spoken English) via the "Syllabus Tracker." Monitors student progress through LMS reports. Interacts with students, Admins, and Ammas via chat and voice notes.  
* **Administrator (Admin):** Oversees the entire system. Has exclusive rights to create, edit, populate, publish, and archive courses. Sets system-wide rules for ISF Coin rewards, manages all user accounts (including Amma registration approval), views comprehensive system-wide reports, and can send broadcast messages to all students.  
* **Amma:** Uses an enhanced dashboard built exactly to the client-provided UI. Manages student queries, resolves tasks (SLA-based), communicates via voice notes, and views child well-being insights.  
* **Playground Manager (PM):** A new role responsible for system health. All application errors, stakeholder feedback, and suggestions are automatically logged and assigned as a task to the PM for resolution and follow-up.  
  ---

  ### **3\. High-Level Sprint 2 Scope**

  #### **3.1. What's In Scope for Sprint 2**

* **LMS \- Student Experience:**  
  * Student Homepage & Main Course Category Navigation (built to client UI specifications).  
  * Student Interaction with "Computer Apps," "Art," "Spoken English," and "Life Skills" courses.  
  * Inclusion of audio buttons for multiple-choice question options.  
  * Digital accumulation of ISF Coins in the student's wallet.  
* **LMS \- Admin & Coach Functionalities:**  
  * **Course Management (Admin Only):** Create, edit, populate content, structure with modules/chapters.  
  * **Course Assignment (Admin & Coach):** Assign courses to Balagruhas and/or individual students.  
  * **Content Management Module (Admin Only):** Upload/manage diverse content types \- Video, PDF, Document, Image, Audio Clips, Text, Links.  
  * **Quiz System (Admin Only):** Create quizzes with various question types and set passing criteria.  
  * **Coach Grading (Coach Only):** Grade subjective student submissions (Art, Spoken English, open-ended answers) via the "Syllabus Tracker." This includes the ability to manually assign ISF Coins.  
  * **Course Reporting System (Admin & Coach):** Dashboards for performance tracking with PDF export.  
* **Amma & Communication Features:**  
  * Individual Amma Accounts & Self-Registration with Admin Approval.  
  * Enhanced Query Handling and Task Management with SLA-based Auto-Reassignment.  
  * **Voice Communication:** Feature for Ammas, Children, Admins, and Coaches to send voice notes.  
  * **Admin Broadcast ("Mann ki Baat"):** Feature for Admins to send text or voice note announcements to all students.  
* **System-Wide:**  
  * **In-App Notification Center:** A dual-display system with a global bell icon and contextual badges on feature buttons.  
  * **UI/UX Implementation:** All dashboards and interfaces will be built to strictly match the client-provided UI mockups, which are the definitive source of truth.  
  * **Error Handling:** All system errors trigger a task for the Playground Manager. User-facing messages are positive and child-friendly.  
  * **Automated WhatsApp Notifications:** When an Admin publishes a daily schedule, a notification will be automatically sent to the Balagruha's WhatsApp group. *(Note: This is a major feature pulled from Sprint 4 and will require third-party integration).*

  #### **3.2. What's Out of Scope for Sprint 2**

* **Continuous "Always-On" Facial Recognition:** A complex proctoring feature.  
* **System-Wide Archiving Framework:** A core feature for archiving users (Children, Coaches, Ammas) and Balgruhas. Scope is limited to **archiving courses only**.  
* **Full UI Internationalization:** Translation of the application interface (buttons, menus). Scope is limited to **translating course content only**.  
* **Life Skills "Learn then Test" Model:** A significant expansion of the Life Skills module.  
* **Task "Revision Mode" (for Half Coins):** A new feature adding a revision state to LMS tasks.  
* **AI-Powered Transcription & Translation of Voice Notes:** Requires complex AI service integration.  
  ---

  ### **4\. Target Audience for this MPSD**

* **Primary:** Project Manager (for overall understanding, client communication, scope validation, and change management).  
* **Secondary:**  
  * **Development Team (Frontend & Backend):** for precise implementation details.  
  * **QA Team:** for creating comprehensive test cases and validation scripts.  
  * **Design Team:** for final review of UI/UX consistency and adherence.  
  * **Client (ISF):** for final approval, understanding of deliverables, and as a reference.

  ---

  ### **5\. Document Conventions**

* **UI Elements:** Referred to by their visible label text in "quotation marks" or by a descriptive name (e.g., "Enroll Button," "Course Title Input Field"). Specific IDs for development will be suggested (e.g., btn-create-course).  
* **User Roles:** Capitalized (e.g., Student, Coach, Admin, Amma).  
* **Placeholders:** Dynamic data in messages or UI elements will be shown in \[square\_brackets\] (e.g., \[CourseName\], \[StudentName\]).  
* **API Endpoints:** Represented as METHOD /path/to/endpoint.  
  ---

  ### **6\. References to Source Documents**

This MPSD synthesizes and expands upon information contained in all previously shared client documents, including but not limited to:

* All related UIs of made by client and the flow which describes the same (Treated as the definitive source of truth for UI).  
* 'ISF Sprint 2 \- Overview and Scope'  
* 'Playground Platform \- 5 Sprint Plan \- 16 February'  
* 'Client Documentation \- ISF Playground LMS System'  
* All detailed LMS feature breakdown documents ('Create New Course', 'Coaches Course Creation', etc.)  
  ---

  ### **7\. Global Elements & Standards (Sprint 2 Context)**

  #### **7.1. Branding Guidelines**

* **Logos:** The official ISF Playground logo will be used.  
* **Color Palettes:** Sprint 2 features will adhere to the established palettes. **Primary \- Green, Secondary \- Blue & Accent \- Gray**.  
* **Typography:** All text will use the established font families, sizes, and weights as defined in the forthcoming 'ISF Brand Document'.

  #### **7.2. Responsive Design**

* **Primary Target:** The Electron.js desktop application UI must be designed to function clearly and be usable on the target hardware resolution of **1366x768**.  
* **Performance Benchmark:** The application must run smoothly and seamlessly on the specified refurbished machine hardware: **Core i3, 4th Gen, 8GB DDR3 RAM, 256 GB SSD, 17/18.5 Inch Monitor.** These specifications are added to the Non-Functional Requirements as the official performance benchmark.  
* **Layout:** Content should reflow gracefully if the Electron application window is resized within reasonable desktop limits, avoiding horizontal scrolling.

  #### **7.3. Accessibility Standards**

* **Target:** New UI elements developed in Sprint 2 will aim to meet key principles of WCAG 2.1 Level AA.  
* **What this means:** "WCAG 2.1 Level AA is a globally recognized set of guidelines to make web content and applications easier for people with disabilities to use. For our project, this means we will focus on foundational principles like:  
  * Ensuring our colors have enough contrast for people with low vision to read text clearly.  
  * Making sure all buttons and links can be used with just a keyboard, not requiring a mouse.  
  * Adding descriptions to important images that can be read aloud by screen reader software for visually impaired users.  
    By aiming for this standard, we make the app more usable for everyone."  
* **Key Considerations for Sprint 2:** Keyboard Navigation, Clear Focus Indicators, Sufficient Color Contrast, Alternative Text for meaningful images, and clearly associated Form Labels.

  #### **7.4. Global Navigation Structure (Based on Client UI)**

* **Student Homepage:** A mandatory two-level header structure.  
  * **Title Bar (Top, Persistent):** Contains the student's name, profile picture, a session timer, their ISF Coin balance, the global notification bell icon, and window controls.  
  * **Toolbar (Below Title Bar, Persistent):** Contains a vertical arrangement of:  
    1. A row of five clickable emotion emoji icons.  
    2. A "Voice Chat" button with a badge for pending voice notes.  
    3. A "Homework" button.  
  * **Main Content Area:** Displays course categories or content.  
* **Coach Dashboard:**  
  * The UI will be schedule-centric, strictly following the client mockups.  
  * A top header row will prominently display a count of the total number of Balagruhas assigned to the logged-in Coach.  
  * Primary navigation will be through dashboard elements like the **"Syllabus Tracker"** and **"Slow Learners"** view.  
  * Includes a **"Repair & Purchases"** button in the top row and a persistent **"Chat"** icon on the left side for communication with Students and Admins.  
* **Admin Dashboard:**  
  * Will mirror the Coach dashboard for shared features (Chat, Repair & Purchase, dual-display notifications).  
  * Includes a **"Broadcast Message"** function to send announcements to all students.  
* **Amma Dashboard:**  
  * The conceptual sidebar menu is discarded. The layout, navigation, and functionality will be implemented to precisely match the client-provided UI mockups, which are the definitive source of truth.

  #### **7.5. Standardized UI Components**

The following UI components will be used consistently across Sprint 2 features.

* **Buttons:**  
  * **Minimum Size:** 100x100 pixels, expanding to fit content.  
  * **States:** Default, Hover (subtle visual change), Active/Pressed (appears inset), Disabled (greyed out, non-interactive), Loading (shows spinner).  
* **Forms & Input Fields:**  
  * **Types:** Text Input, Text Area, Number Input, Dropdown, Multi-Select, Checkbox, Radio Buttons, Date Picker, File Upload.  
  * **Behaviors:** Will include Placeholder Text, clear Focus States, and inline Validation Messages with an Error State (e.g., red border).  
* **Modals & Pop-ups:**  
  * **Purpose:** For confirmations, focused forms, or critical information.  
  * **Structure:** Header (Title), Body (Content), Footer (Action Buttons). Will overlay the main content.  
* **Toast Notifications & Banners:**  
  * **Purpose:** Provide brief, non-intrusive feedback.  
  * **Types:** Success (Green), Error (Red), Warning (Yellow), Info (Blue).  
  * **Behavior:** Auto-dismiss after 3-5 seconds and/or be manually dismissible.  
* **Loading States & Spinners:**  
  * Displayed when the system is processing a request that takes noticeable time (e.g., fetching data, submitting a form).  
* **Empty States:**  
  * Displayed when a list or table has no data to show, often including a user-friendly message and a call to action.

  ---

  ### **Detailed Feature & Module Breakdown**

  #### **8\. LMS \- Student Homepage & Course Navigation**

* **Feature ID:** S2-LMS-STU-001  
* **Feature Name:** Student Homepage & Main Course Category Selection  
* **User Story 1:** "As a Student, after logging in, I want to see a clear and simple homepage so I can easily understand my status and learning options."  
  * **AC1.1:** Upon successful facial recognition, the student is directed to the LMS homepage.  
  * **AC1.2:** The homepage UI strictly matches the agreed-upon design, featuring the persistent Title Bar and Toolbar.  
  * **AC1.3:** The system checks for an incomplete task from a previous session and, if found, navigates the student directly to that task to resume their work.  
* **User Story 2:** "As a Student, I want to click on a course category button to view the activities within that category without the whole page reloading."  
  * **AC2.1:** Each main course category button is clearly visible and clickable.  
  * **AC2.2:** Clicking a category button dynamically replaces the content in the Main Content Palette (SPA behavior). The Title Bar and Toolbar remain visible and persistent.  
  * **AC2.3:** If a student is in an active task and clicks a different category, a confirmation modal appears to prevent accidental switching.  
* **High-Fidelity Mockup Reference:** Client-provided UI mockups are the definitive source.  
* **Element-by-Element Annotation:**  
  * **Element: Title Bar (Top, Persistent)**  
    * **Purpose:** Provides at-a-glance identity and status.  
    * **Components:** Student Name, Profile Picture, Session Timer, ISF Coin Balance display, Notification Bell icon, Window Controls.  
    * **Content Source:** Student's profile data, session data, and coin balance from the local Memory Layer (SQLite).  
  * **Element: Toolbar (Below Title Bar, Persistent)**  
    * **Purpose:** Provides primary non-course interaction points.  
    * **Components:** A vertical stack of (1) five Emotion Emoji buttons (100x100px with 10px gap), (2) a "Voice Chat" button (with notification badge), and (3) a "Homework" button.  
  * **Element: Main Content Palette**  
    * **Purpose:** Dynamic area for course categories and content.  
    * **Sub-Element: Course Category Button**  
      * **Visuals:** Minimum 100x100px, expands for text. Contains an icon and the category name text within the button.  
      * **States:**  
        * **Default:** Standard appearance.  
        * **Hover:** Subtle visual change (e.g., background brightens).  
        * **Active/Pressed:** Visual change indicating a click.  
        * **Disabled:** Greyed out and unclickable if the category has no active courses.  
      * **Content Source:** Dynamically populated from Admin-created course categories.  
      * **Interaction:** On click, triggers a content update in the Main Content Palette.  
* **Happy Path: Student Resumes an Incomplete Task**  
  1. **User Action:** Student successfully logs in via facial recognition.  
  2. **System Response:** System checks the Memory Layer for an 'in-progress' task. An incomplete task is found.  
  3. **UI Changes:** Application bypasses the homepage and navigates directly to the specific incomplete task interface (e.g., the Art course canvas or a specific quiz question).  
* **Happy Path: Student Switches Courses Mid-Task**  
  1. **User Action:** While in an active Art task, the student clicks the "Computer apps" category button in the persistent header.  
  2. **System Response:** System detects an active task session.  
  3. **UI Changes:** A confirmation modal appears with the message: "Are you sure you want to switch? Your current place will be saved." and buttons: "Yes, switch," "No, stay."  
  4. **User Action:** Clicks "Yes, switch."  
  5. **System Response:** Saves the current state of the Art task and navigates to the Computer apps section.  
  6. **UI Changes:** The Main Content Palette updates to show the Computer apps view.  
* **Edge Case: No Course Categories Created by Admin**  
  1. **System Response:** The main content area would be empty.  
  2. **UI Changes:** An "Empty State" message is displayed prominently: **"New Courses are on their way. Come back later\!"**  
* **System Error Handling:**  
  * **Error:** Failed to load course category data from the backend.  
  * **UI Changes:** A positive, child-friendly error message appears: **"Oops\! The magic internet wires seem to be tangled. Please try again in a moment\!"**  
  * **System Behavior:** Logs the error and automatically creates a task assigned to the **Playground Manager (PM)** for investigation.  
* **Logical Endpoint (On Homepage Load):** GET /api/lms/student/course-categories  
* **Expected Response (Success):**  
      {

  "categories": \[

    { "id": "cat\_art", "name": "Art", "iconUrl": "/icons/art.png", "hasContent": true },

    { "id": "cat\_future", "name": "Future Skills", "iconUrl": "/icons/future.png", "hasContent": false }

  \]

}

 

**Expected Response (Error):** { "error": "Failed to load categories" }

**Student Role:** Can see and click all active, populated course category buttons.

#### **9\. LMS \- Computer Apps Courses (Student Interaction)**

* **Feature ID:** S2-LMS-STU-002  
* **Feature Name:** Computer Apps Course Interaction (Student View)  
* **User Story 1:** "As a Student, after clicking on the 'Computer apps' category, I want to see a list of available apps, and when I select one, I want to see the levels for it so I can choose where to start."  
  * **AC1.1:** Upon clicking the "Computer apps" category, the UI transitions to a three-pane layout: a left column for the application list, a top row for levels, and a main palette for tasks.  
  * **AC1.2:** The main palette initially displays a blinking prompt: **“Please select an app”**. No application or level is selected by default.  
  * **AC1.3:** Clicking an application in the left column populates the top row with its available levels.  
* **User Story 2:** "As a Student, after selecting a level, I want to see all the tasks for that level, with clear visual indicators showing which tasks are finished, which one is in progress, and which ones are next."  
  * **AC2.1:** Clicking a level updates the main palette to display tasks for that level.  
  * **AC2.2:** The currently 'in-progress' level or task has a subtle "jiggle" or pulse animation to draw attention.  
  * **AC2.3:** Each task has a color-coded progress line below it: a full green line for finished, a half-green line for in-progress, and a red line for untouched tasks.  
* **User Story 3:** "As a Student, for each completed task, I want to see my performance, including how I rank compared to other students, so I can understand how well I'm doing."  
  * **AC3.1:** Each completed task displays a performance bar below it.  
  * **AC3.2:** This bar shows Time Taken, ISF Coins Earned, and a Rank.  
  * **AC3.3:** The Rank is displayed in the format: **"Your Rank: \[X\] out of \[Y\] students"**.  
* **User Story 4:** "As a Student, I want to be able to click on an 'Ongoing' or 'Next' task to directly launch it and start playing."  
  * **AC4.1:** Unfinished tasks are clearly interactive.  
  * **AC4.2:** Clicking an unfinished task launches the external web link/application associated with it.  
* **High-Fidelity Mockup Reference:** Client-provided UI mockups are the definitive source.  
* **Element-by-Element Annotation:**  
  * **Element 1: Left Column \- Application List**  
    * **Purpose:** Displays available computer applications.  
    * **Visual States:**  
      * **List Item (Default):** Clear text label of the app name.  
      * **List Item (Selected/Active):** Background color is distinct, and text may be bolded.  
    * **Interaction:** Clicking a list item populates the "Level Selection Row".  
  * **Element 2: Top Row \- Level Selection**  
    * **Purpose:** Displays available levels for the selected application.  
    * **Visual States:**  
      * **Level Button (Default):** Clear text label (e.g., "Level 1").  
      * **Level Button (Selected/Active):** Visually distinct to show it's the active level.  
      * **Level Button (In-Progress):** Has a subtle "jiggle" or pulse animation.  
    *   
    * **Interaction:** Clicking a level button updates the "Task Palette".  
  *   
  * **Element 3: Main Content Area \- Task Palette**  
    * **Purpose:** Displays tasks for the selected level.  
    * **Layout:** A grid or list of task items.  
    * **Sub-Element: Task Item**  
      * **Content:** Task Name/Icon.  
      * **Interaction (for unfinished tasks):** Clickable, launches the external web link.  
    *   
  *   
  * **Element 4: Task Progress Line (Below each Task Item)**  
    * **Purpose:** Shows the status of a task visually.  
    * **Visuals:** A thin horizontal line.  
    * **States:**  
      * **Finished:** Full green line.  
      * **In-Progress:** Half green, half grey line.  
      * **Not Started:** Red line.  
    *   
  *   
  * **Element 5: Task Performance Bar (Below each Completed Task Item)**  
    * **Purpose:** Shows performance metrics for a completed task.  
    * **Content:** Time Taken, ISF Coins Earned, and Rank ("Your Rank: \[X\] out of \[Y\] students").  
    * **Content Source:** Student's performance data from the local Memory Layer and a backend rank aggregation.  
  *   
*   
* **Happy Path: Student Navigates and Launches an Unfinished Task**  
  1. **User Action:** Clicks "Computer apps" category.  
  2. **UI Changes:** Left column displays apps. Main palette shows a blinking prompt.  
  3. **User Action:** Clicks an application (e.g., "Dance mat typing").  
  4. **UI Changes:** "Dance mat typing" is highlighted. The Level Selection Row updates to show its levels.  
  5. **User Action:** Clicks "Level 1".  
  6. **UI Changes:** "Level 1" is highlighted. The Task Palette updates to show tasks, each with its color-coded progress line. The in-progress task is jiggling.  
  7. **User Action:** Clicks on an "Ongoing" or "Next" Task.  
  8. **System Response:** System retrieves the web link for the task and launches it within a sandboxed view inside the Electron application.  
*   
* **Edge Case: Invalid Web Link for a Task**  
  1. **User Action:** Clicks a task with a broken link configured by the Admin.  
  2. **System Response:** Attempt to launch fails.  
  3. **UI Changes:** A child-friendly error toast appears: **"Oops\! This game seems to be hiding. Please let your Coach know\!"** The student remains in the ISF application. The error is logged for the Playground Manager.  
*   
* **Data Displayed:** List of apps, levels per app, tasks per level, task status, task performance metrics (time, coins, rank).  
* **Source:**  
  * **App/Level/Task Structure & Links:** Admin-configured content stored in MongoDB.  
  * **Task Status & Performance Data:** Student-specific progress data from the local Memory Layer (SQLite).  
*   
* **Logical Endpoint (On Level Select):** GET /api/lms/student/computer-apps/{appId}/levels/{levelId}/tasks  
  * **Request includes:** studentId (implicitly from session).

**Response:** List of tasks for that level, including their web links, and for the current student, their status and performance data.  
 code JSON  
downloadcontent\_copyexpand\_less  
    {  
  "levelName": "Level 1",  
  "tasks": \[  
    {  
      "id": "task\_dmt\_l1\_01", "name": "Home Row Basics", "status": "completed",  
      "webLink": "http://example.com/dancemat/level1/lesson1",  
      "timeTaken": "00:10:23", "coinsEarned": 10, "rank": "5 out of 82"  
    },  
    {  
      "id": "task\_dmt\_l1\_02", "name": "Adding E and I", "status": "ongoing",  
      "webLink": "http://example.com/dancemat/level1/lesson2",  
      "timeTaken": null, "coinsEarned": 0, "rank": null  
    }  
  \]  
}

*    
*   
* **Student Role:** Can view and interact with all Computer Apps, levels, and tasks assigned to them. Students only see their own progress and rank.

---

#### **10\. LMS \- Art Courses (Student Interaction)**

* **Feature ID:** S2-LMS-STU-003  
* **Feature Name:** Art Course Interaction & Artweaver Integration (Student View)  
* **User Story 1:** "As a Student, after clicking the 'Art' category, I want to see different types of art activities, like structured workshops or free drawing, so I can choose how I want to be creative."  
  * **AC1.1:** The Art section displays clear options for the four supported modes: 'Workshops', 'Free Sketch', 'Art Stories', and 'Competition'.  
  * **AC1.2:** The list of available activities within each mode is populated from Admin-configured content.  
*   
* **User Story 2:** "As a Student, when I select an art task, I want to see the instructions and a canvas that shows my drawing in real-time, so I can reference the goal and see my work."  
  * **AC2.1:** Selecting an art task opens a split-view layout with an "Instruction Palette" on the left and a "Drawing Canvas" on the right.  
  * **AC2.2:** The system launches the locally installed Artweaver application and interfaces with the USB-connected graphics pad.  
  * **AC2.3:** Input from the graphics pad into Artweaver is reflected on the ISF application's Drawing Canvas in near real-time.  
*   
* **User Story 3:** "As a Student, upon finishing my drawing, I want to click a button in the ISF Playground to submit my work for my Coach to grade."  
  * **AC3.1:** A "Mark as Complete" button is available within the ISF Playground task view.  
  * **AC3.2:** Clicking this button captures the final state of the drawing (e.g., saves a high-resolution screenshot) and associates it with the task.  
  * **AC3.3:** The task's status changes to "Submitted for Grading," and a notification is queued for the Coach.  
*   
* **Element 1: Art Mode Selection Screen**  
  * **Purpose:** Allows the student to choose the type of art activity.  
  * **Components:** Large, clickable cards for "Workshops," "Free Sketch," "Art Stories," and "Competition."  
*   
* **Element 2: Main Art View \- Instruction Palette (Left)**  
  * **Purpose:** Displays the drawing prompt (image or text).  
*   
* **Element 3: Main Art View \- Drawing Canvas (Right)**  
  * **Purpose:** Displays the student's drawing from Artweaver.  
  * **Technical Note:** The integration mechanism is a key technical investigation task.  
*   
* **Element 4: "Mark as Complete" Button**  
  * **Purpose:** Submits the completed artwork.  
  * **Visual States:** Enabled (when task is active), Loading (spinner on click), Disabled (after submission).  
*   
* **Happy Path: Student Submits a Workshop Task**  
  1. **User Action:** Clicks "Art" \-\> "Workshops" \-\> Selects a task.  
  2. **System Response:** Launches the main art view and Artweaver.  
  3. **UI Changes:** Instruction Palette shows the prompt. Drawing Canvas is blank.  
  4. **User Action:** Draws in Artweaver using the graphics pad.  
  5. **System Response:** The drawing appears on the Drawing Canvas in near real-time.  
  6. **User Action:** Clicks "Mark as Complete."  
  7. **System Response (Backend):** Captures the drawing, saves the file, updates task status to "Submitted for Grading," and queues a notification for the Coach.  
  8. **UI Changes:** A success toast appears: **"Your drawing has been submitted for grading\!"**  
*   
* **Edge Case: Graphics Pad Not Detected**  
  1. **System Response:** The system cannot detect the required input device.  
  2. **UI Changes:** An error toast/message appears: **"Graphics pad not detected. Please check the connection and tell your Coach."** The drawing functionality is disabled.  
*   
* **Success Toast:** "Drawing submitted\! Your Coach will grade it soon."  
* **Error Toast (Artweaver Issue):** "Could not start the drawing tool. Please tell your Coach."  
* **In-App Notification (to Student, post-grading):** "Your artwork for '\[Art Task Name\]' has been graded\! You received \[Grade\] and \[Number\] ISF Coins\! ✨"  
* **Logical Endpoint (On "Mark as Complete"):** POST /api/lms/student/art-tasks/{taskId}/submit  
  * **Request Payload:** { "studentId": "...", "taskId": "...", "drawingFileReference": "s3/path/to/synced/file.png" }  
  * **Expected Response (Success):** { "submissionId": "...", "status": "submitted\_for\_grading" }  
* 

---

#### **11\. LMS \- Spoken English Courses (Student Interaction)**

* **Feature ID:** S2-LMS-STU-004  
* **Feature Name:** Spoken English Course Interaction (Student View)  
* **User Story 1:** "As a Student, I want a simple interface to record a video of myself performing a poem, so I can submit it for review."  
  * **AC1.1:** A "Record Performance" button opens a video recording interface displaying the PC's camera feed.  
  * **AC1.2:** The interface provides clear "Start Recording" and "Stop Recording" controls.  
*   
* **User Story 2:** "As a Student, after I record, I want to watch it back and decide if I want to re-record it or submit it, so I feel confident."  
  * **AC2.1:** After stopping a recording, the UI provides options to "Play My Video," "Re-record," and "Submit Video."  
  * **AC2.2:** "Submit Video" saves the video file and marks the task as "Submitted for Grading."  
*   
* **Element: Video Recording Modal/View**  
  * **Purpose:** A focused environment for video capture and review.  
  * **Components:**  
    * **Camera Feed Display:** A large area showing the live webcam feed.  
    * **Control Buttons:** "Start Recording," "Stop Recording," "Play My Video," "Re-record," "Submit Video."  
  *   
  * **Recording Indicator:** A visual cue (e.g., a blinking red dot, a timer) is active during recording.  
*   
* **Happy Path: Student Records and Submits a Performance**  
  1. **User Action:** Clicks "Record Performance."  
  2. **UI Changes:** The Video Recording Modal opens.  
  3. **User Action:** Clicks "Start Recording." Performs the poem. Clicks "Stop Recording."  
  4. **UI Changes:** The "Play," "Re-record," and "Submit" buttons appear.  
  5. **User Action:** Clicks "Submit Video."  
  6. **System Response (Backend):** The video file is saved and queued for syncing. The task status is updated to "Submitted for Grading." A notification is queued for the Coach.  
  7. **UI Changes:** The modal closes. A success toast appears: **"Your performance has been submitted for grading\!"**  
* 

---

#### **12\. LMS \- Life Skills Courses (Student Interaction)**

* **Feature ID:** S2-LMS-STU-005  
* **Feature Name:** Life Skills Course Interaction (Student Question/Response View)  
* **User Story 1:** "As a Student, I want to see a list of Life Skills topics and know which ones I've finished, which I'm working on, and which are new."  
  * **AC1.1:** The topic selection list includes visual indicators for each topic's status: 'Completed', 'Ongoing', and 'New/Not Started'.  
*   
* **User Story 2:** "As a Student, when recording an audio answer, I want it to be easy, like sending a voice note on WhatsApp."  
  * **AC2.1:** A single "Record" button uses a press and hold to record, release to stop mechanic.  
  * **AC2.2:** The recording is limited to a maximum of 1 minute.  
  * **AC2.3:** A "Submit" button becomes enabled only after the student has listened to their recorded answer.  
*   
* **User Story 3:** "As a Student, I want to complete the whole quiz before I get my score, and if I don't pass, I want to be told to try again."  
  * **AC3.1:** No feedback is provided after individual questions.  
  * **AC3.2:** The final result is displayed only after the entire set of questions is submitted.  
  * **AC3.3:** If the student fails, they are shown a message like, "Please review the lesson again to improve your score," and must re-take the entire quiz.  
*   
* **Element: Life Skills Topic List Item**  
  * **Components:** Topic Title and a Status Icon (e.g., green checkmark for 'Completed').  
*   
* **Element: Audio Reply Interface**  
  * **Components:** "Record Button" (press/hold), "Listen Button," and a "Submit Button" (enabled after listening).  
*   
* **Element: Quiz Results Screen**  
  * **Content (On Failure):** Displays the score and the prompt: **"Please review the lesson again to improve your score\!"** with a "Return to Lesson" button.  
  * **Content (On Success):** Displays the score, a congratulatory message, ISF Coins earned, and a "Continue" button.  
*   
* **Element: Multiple Choice Question Option**  
  * **Components:** Next to each text-based choice, there will be an audio player button (speaker icon) that, when clicked, reads the choice aloud.  
*   
* **No Microphone:** If a microphone is unavailable or access is denied, the "Record Audio Reply" option for a question will be disabled. A message will instruct the student to inform their Coach. Admins should configure alternative response methods for such questions.

---

#### **13\. LMS \- ISF Coin Wallet (Student Accumulation)**

* **Feature ID:** S2-LMS-STU-006  
* **Feature Name:** ISF Coin Wallet \- Accumulation from LMS Activities  
* **Element: ISF Coin Balance Display**  
  * **ID Suggestion:** display-student-coin-balance  
  * **Purpose:** To show the student their current total digital ISF Coins.  
  * **Position:** Exclusively located in the main, persistent **Title Bar** on the student homepage.  
  * **Visuals:** A clear text value next to a coin icon (e.g., "150 ✨").  
  * **Content Source:** Dynamically fetched from the student's record in the local Memory Layer (SQLite).  
  * **Interaction:** Non-interactive display for Sprint 2\. The value updates in near real-time.  
*   
* **Flow: Coach Grades a Submission and Awards Coins**  
  1. **User Action (Student):** Submits an Art drawing.  
  2. **User Action (Coach):** Accesses the submission via the "Syllabus Tracker," grades it, and manually assigns a discretionary number of ISF Coins.  
  3. **System Response (Backend):**  
     * Updates the student's task record.  
     * Adds the awarded coins to the student's totalCoinBalance in the local Memory Layer.  
     * Logs the transaction.  
     * Triggers a notification for the student.  
  4.   
  5. **UI Changes (Student View \- Asynchronous):**  
     * An In-App Notification appears: "Your Art submission for 'Draw a House' has been graded\! You earned 15 ISF Coins\! 🎉"  
     * The **ISF Coin Balance Display** in the Title Bar updates to the new total.  
  6.   
*   
* **Data Stored (Memory Layer \- SQLite, per student):**  
  * totalCoinBalance (Integer)  
  * coinTransactionHistory (Array of objects: { transactionId, timestamp, sourceActivityId, coinsChange, description })  
*   
* **Future-Proofing:** The backend will be designed to support both positive (earning) and negative (physical handover in Sprint 3\) transactions.

Of course. I will continue generating the complete, unabridged Master Project Specification Document, maintaining the established structure and level of detail for the Admin, Coach, and System-Wide features.

---

### **Detailed Feature & Module Breakdown (Continued)**

#### **14\. LMS \- Course Management (Admin/Coach: Creation, Structure, Assignment)**

* **Feature ID:** S2-LMS-AC-001 (AC for Admin/Coach)  
* **Feature Name:** LMS Course Management & Builder  
* **User Story 1 (Admin):** "As an Admin, I want a dedicated 'Course Management' section where I can create new courses from scratch, defining their structure with modules and chapters, so I can build the complete learning curriculum."  
  * **AC1.1:** An Admin can access a "Course Management" section from their main navigation.  
  * **AC1.2:** This section displays a list of all existing courses with options for filtering, sorting, and searching.  
  * **AC1.3:** A "+ Create New Course" button is available, which opens a comprehensive course builder interface.  
  * **AC1.4:** Within the builder, an Admin can define all course-level metadata (Title, Description, Category, etc.) and add a hierarchical structure of Modules and Chapters.  
  * **AC1.5:** The Admin can save a course as a "Draft" to work on later or "Publish" it to make it available for assignment.  
*   
* **User Story 2 (Admin & Coach):** "As an Admin or Coach, I want to assign a published course to my Balagruhas, and I need the flexibility to assign it to specific weaker students if needed, so I can create personalized learning paths."  
  * **AC2.1:** An "Assign" action is available for published courses.  
  * **AC2.2:** The assignment interface allows the user to select one or more of their assigned Balagruhas.  
  * **AC2.3:** Upon selecting Balagruhas, the user can choose to assign to "All Students" or select specific, individual students from a list.  
  * **AC2.4:** The 'Due Date' field in the assignment interface is optional, not mandatory.  
*   
* **User Story 3 (Admin):** "As an Admin, I want to be able to Edit, Track, and Archive existing courses to manage their lifecycle."  
  * **AC3.1:** "Edit" opens the course builder with the course data pre-filled.  
  * **AC3.2:** "Track" navigates to the Course Reporting System for that course.  
  * **AC3.3:** "Archive" changes the course status to "archived," hiding it from active views but retaining its data.  
*   
* **User Story 4 (Coach):** "As a Coach, I want to view the courses available to me, assign them, and track my students' progress, but I should not be able to create or edit the course content itself."  
  * **AC4.1:** A Coach can view a list of published courses that an Admin has made available.  
  * **AC4.2:** The only actions available to a Coach on a course are "Assign" and "Track." The "Create," "Edit," and "Archive" functions are not visible or are disabled.  
*   
* **A. Course Management Landing Page UI**  
  * **Element 1: Page Header and Controls**  
    * **Search Input:** Placeholder "Search by course title...".  
    * **Filter Dropdowns:** "Filter by Balagruha," "Filter by Status" (All, Draft, Published, Archived).  
    * **Create New Course Button:** Label "+ Create New Course". **Visible and enabled for Admin role ONLY.**  
  *   
  * **Element 2: Course Card Components**  
    * **Content:** Displays Course Thumbnail, Title, Description, Metadata (e.g., "4 Modules, 12 Chapters"), Status Label ("Draft," "Published," "Archived"), and Assigned Balagruhas.  
    * **Action Buttons (Role-Dependent):**  
      * **For Admin:** "Edit," "Assign," "Track," "Archive."  
      * **For Coach:** "Assign," "Track."  
    *   
  *   
*   
* **B. Create/Edit Course Builder UI (Admin Only)**  
  * **Layout:** A single, scrollable page.  
  * **Section 1: Course Information Form**  
    * **Fields:** Course Title (Required), Course Description (Required), Course Category (Dropdown, Required), Estimated Duration (Required), Difficulty Level (Dropdown, Required), Course Thumbnail Upload, ISF Coin Reward Toggle, Coins on Completion (Number input).  
  *   
  * **Section 2: Module & Chapter Builder**  
    * **Interaction:** An "+ Add New Module" button adds a new module section. Within each module, an "+ Add Chapter" button adds a new chapter section. Both can be reordered via drag-and-drop.  
  *   
  * **Section 3: Assignment Section**  
    * **Fields:** Multi-select dropdown for Balagruhas, a student selection control (toggle between "All Students" and a multi-select list of individual students), optional Start Date picker, and optional Due Date picker.  
  *   
  * **Section 4: Save & Publish Section**  
    * **Buttons:** "Save as Draft," "Publish Course," "Cancel."  
  *   
*   
* **Flow: Creating and Publishing a New Course**  
  1. **User Action (Admin):** Navigates to "Course Management" and clicks "+ Create New Course."  
  2. **User Action:** Fills in all Course Information, adds Modules and Chapters, and populates them with content (using the Content Management feature).  
  3. **User Action:** In the Assignment Section, selects target Balagruha(s).  
  4. **User Action:** Clicks "Publish Course."  
  5. **System Response (Backend):** Validates all required fields. Creates the new Course document in MongoDB with status "published."  
  6. **UI Changes:** Navigates back to the landing page. A success toast "Course '\[CourseName\]' published successfully\!" appears. The new course is visible in the list.  
*   
* **Business Rule Validation (on Publish):** A course must contain at least one module, and each module must contain at least one chapter to be published.  
* **Error Handling:** If publishing fails due to missing fields, error messages appear inline next to the invalid fields, and a summary toast states, "Please correct the errors before publishing."  
* POST /api/courses – Create new course (Admin only).  
* GET /api/courses – List courses (returns all for Admin, filtered for Coach).  
* PUT /api/courses/{id} – Update existing course (Admin only).  
* PATCH /api/courses/{id}/status – Update status (e.g., to archive) (Admin only).  
* POST /api/courses/{id}/assign – Assign a course to Balagruhas/students (Admin & Coach).  
* **Admin Role:** Full CRUD (Create, Read, Update, Delete) on all courses. Can assign to any Balagruha.  
* **Coach Role:** Read-only access to available courses. Can only use the "Assign" (to their own Balagruhas) and "Track" functions.

---

#### **15\. LMS \- Content Management Module (Admin Only)**

* **Feature ID:** S2-LMS-AC-002  
* **Feature Name:** LMS Content Management \- Chapter Content Population  
* **User Story 1 (Admin):** "As an Admin, within a chapter of a course I am creating, I want to add various types of learning content like Videos, PDFs, Audio Clips, and Text, so I can provide rich learning materials."  
  * **AC1.1:** Within the Chapter editing interface, an "Add Content Item" button is present.  
  * **AC1.2:** The Admin can select a content type: Text/Notes, Video (Upload), PDF/Document, Image, Audio File, External Link, or Quiz.  
  * **AC1.3:** The file uploader is explicitly configured to accept standard formats: Video (.mp4, .mov), Documents (.pdf, .doc, .ppt), Images (.jpg, .png), Audio (.mp3, .wav).  
  * **AC1.4:** The Admin can add multiple content items to a single chapter and reorder them.  
*   
* **User Story 2 (Admin):** "As an Admin, for each content item, I want to assign a specific ISF Coin reward that a student earns upon completion, so I can incentivize engagement."  
  * **AC2.1:** Each content item has a toggle to "Reward ISF Coins."  
  * **AC2.2:** If enabled, a numeric input for the "Coin Value" and a dropdown for the "Completion Condition" appear.  
  * **AC2.3:** Example Completion Conditions include: "Video Fully Watched" or "Student Clicks 'Mark as Completed'".  
*   
* **Element: Add/Edit Content Item Form/Modal**  
  * **Purpose:** The interface for adding/editing a piece of content within a chapter.  
  * **Components:**  
    * **Content Type Dropdown:** The first selection (Video, PDF, etc.).  
    * **Conditional Content Input Area:** Dynamically changes to show a file uploader, URL input field, or rich text editor based on the selected type.  
    * **ISF Coin Reward Configuration:**  
      * A checkbox: "✅ Reward ISF Coins for this item."  
      * A number input for "Coins for Completion."  
      * A dropdown for "Award Coins When:" (Completion Condition).  
    *   
  *   
*   
* The POST /api/courses and PUT /api/courses/{id} endpoints will accept the modules\[\].chapters\[\].contentItems\[\] array in their request payload.  
* A dedicated file upload endpoint (e.g., POST /api/content-assets/upload) will handle S3 uploads and return a URL to be stored in the content item data.  
* **Admin Role:** Can add, edit, and delete content items and configure their ISF Coin rewards in any course.  
* **Coach Role:** Does not have access to this functionality.

---

#### **16\. LMS \- Quiz System (Admin Creation & Student Attempt)**

* **Feature ID:** S2-LMS-QUIZ-001  
* **Feature Name:** LMS Quiz System  
* **User Story 1 (Admin):** "As an Admin, I want to create quizzes with various question types and define rules like passing score and attempt limits, so I can assess student understanding."  
  * **AC1.1:** An interface exists to "Create New Test."  
  * **AC1.2:** Supported question types include: Multiple Choice, True/False, Fill-in-the-Blanks, and Short Answer (for manual grading).  
  * **AC1.3:** The 'Passing Score' input field defaults to **100%**.  
  * **AC1.4:** The 'Maximum Number of Attempts' option defaults to **"Unlimited"**.  
  * **AC1.5:** The Admin can override these defaults for any specific quiz.  
*   
* **User Story 2 (Student):** "As a Student, when I attempt a quiz, I want to receive my result after submitting. If I don't pass, I want to be encouraged to try again."  
  * **AC2.1:** A results screen displays the Total Score and Pass/Fail Status.  
  * **AC2.2:** For a failed attempt, the status text is a supportive prompt: **"Please take a retest to improve your score\!"**  
  * **AC2.3:** If retakes are allowed, an option to "Retake Quiz" is presented.  
*   
* **A. Admin \- Quiz Creation Interface:**  
  * **Element 1: Quiz Rules Section**  
    * **Passing Score (%):** Number Input, default value 100\.  
    * **Max Attempts:** Dropdown or Number Input, default value "Unlimited".  
  *   
*   
* **B. Student \- Quiz Results Screen:**  
  * **Element 1: Status Display**  
    * **On Pass:** Text "Passed\!" (Color-coded green).  
    * **On Fail:** Text "Please take a retest to improve your score\!" (Color-coded yellow/orange).  
  *   
*   
* **Admin Role:** Full CRUD on all quizzes. Can define all rules and questions.  
* **Coach Role:** Can view quiz results for their students via the reporting system but cannot create or edit quizzes.  
* **Student Role:** Can attempt quizzes assigned to them.

---

#### **17\. LMS \- Coach Grading of Student Submissions**

* **Feature ID:** S2-LMS-COACH-002  
* **Feature Name:** Coach Grading of Student Submissions  
* **User Story 1 (Coach):** "As a Coach, I want a clear and central place to see all the assignments from my students that are pending a grade, so I can manage my work efficiently."  
  * **AC1.1:** The primary entry point for a Coach to see and grade all pending assignments is the **"Syllabus Tracker"** section on their dashboard.  
  * **AC1.2:** A numeric badge appears on the specific Balgruha button on the Coach's homepage to indicate the number of submissions pending a grade within that Balgruha.  
*   
* **User Story 2 (Coach):** "As a Coach, when grading a subjective task like Art or a Spoken English video, I want the flexibility to award ISF coins based on the student's effort, not just a fixed rule."  
  * **AC2.1:** The grading interface for subjective tasks (Art, Spoken English, Short Answers) displays the student's submitted work (image/video).  
  * **AC2.2:** The interface provides fields for the Coach to assign a Grade and provide optional Feedback.  
  * **AC2.3:** A number input field is present, allowing the Coach to **manually assign ISF Coins** for that specific submission, giving them the flexibility to reward effort.  
*   
* **A. Coach Dashboard:**  
  * **Element: Balgruha Button**  
    * **Badge:** A small, red circular badge with a number appears on the top-right corner of the button when there are pending submissions for that Balgruha.  
  *   
*   
* **B. Syllabus Tracker \-\> Grading Interface:**  
  * **Element: ISF Coins Awarded Input**  
    * **Purpose:** Allows the Coach to manually award coins for subjective tasks.  
    * **Type:** Number Input.  
    * **Note:** This field is **not** present for auto-graded quizzes.  
  *   
*   
* **Coach Role:** Can view and grade submissions only for students in Balagruhas to which they are assigned. Can manually award coins for subjective tasks.  
* **Admin Role:** Can view all submissions and grades.

Of course. I will continue generating the complete, unabridged Master Project Specification Document, maintaining the established structure and level of detail for the final features.

---

#### **18\. LMS \- Translation Module**

* **Feature ID:** S2-LMS-SYS-002 (SYS for System-wide feature)  
* **Feature Name:** LMS Translation Module for Course Content  
* **User Story 1 (Admin):** "As an Admin, when creating course content like titles, descriptions, or quiz questions, I want the ability to provide translations for this text in multiple languages, so that students can view the course in their preferred language."  
  * **AC1.1:** In the Course and Content Management interfaces, each text-based field has an option to "Manage Translations."  
  * **AC1.2:** The Admin can select a target language from a predefined list (e.g., English, Hindi, Marathi).  
  * **AC1.3:** An input field is provided to enter the translated text for the selected language.  
  * **AC1.4:** The system supports storing multiple language versions for each translatable piece of content.  
*   
* **User Story 2 (Student):** "As a Student, I want to be able to select my preferred language so I can learn more effectively."  
  * **AC2.1:** A language selection option is available in the Student's profile settings.  
  * **AC2.2:** When a student selects a preferred language, the LMS displays all course content (titles, descriptions, etc.) in that language if a translation exists.  
  * **AC2.3:** If a translation is unavailable for a specific content piece in the student's preferred language, the system gracefully defaults to the primary language of the course (e.g., English) without showing an error.  
*   
* **User Story 3 (System):** "As a System, I want to store translations efficiently and serve the correct language version to students based on their preferences."  
  * **AC3.1:** The database schema for courses and content is designed to accommodate multilingual text fields (e.g., using nested objects with language codes as keys).  
  * **AC3.2:** APIs fetching course content can accept a language parameter to return the appropriate version.  
*   
* **A. Admin \- Content Translation Interface (within Course Builder):**  
  * **Element 1: "Manage Translations" Button/Link**  
    * **Position:** Adjacent to each translatable text field (e.g., Course Title, Chapter Description). Could be a globe icon.  
    * **Interaction:** Clicking this opens a modal for managing translations.  
  *   
  * **Element 2: Translation Management Modal**  
    * **Layout:** Displays the original language text (read-only) at the top. Below, it lists existing translations and provides an option to add a new one.  
    * **Components:**  
      * **"Add New Translation" Dropdown:** To select a new target language.  
      * **Translated Text Input:** For each added language, a text area is provided to enter the translation.  
      * **Action Buttons:** "Save Translations" and "Cancel."  
    *   
  *   
*   
* **B. Student \- Language Preference Selector:**  
  * **Element 1: Access Point**  
    * **Location:** In the Student Profile settings page, a section labeled "Language Preferences."  
  *   
  * **Element 2: Language Dropdown**  
    * **Label:** "My Preferred Language."  
    * **Options:** Lists all system-supported languages.  
    * **Interaction:** Selecting a language saves this preference to the student's profile.  
  *   
*   
* **Flow (Admin): Adding a Translation for a Course Title**  
  1. **User Action (Admin):** In the Course Builder, clicks the "Manage Translations" icon next to the "Course Title" field.  
  2. **UI Changes:** The Translation Management Modal opens.  
  3. **User Action:** Selects "Hindi" from the "Add New Translation" dropdown.  
  4. **UI Changes:** A new section for "Hindi" appears with a blank text input.  
  5. **User Action:** Types the Hindi translation for the course title and clicks "Save Translations."  
  6. **System Response (Backend):** Saves the provided translation for the course title in the Course document in MongoDB (e.g., title: { "en": "Original Title", "hi": "अनुवादित शीर्षक" }).  
  7. **UI Changes:** Modal closes. A success toast "Translations saved" appears.  
*   
* **Missing Translation:** This is a critical requirement. If a student's preferred language translation is not available for a specific piece of content, the system **MUST** gracefully fall back to displaying the content in the course's primary language (e.g., English). No errors should be shown to the student.  
* **Admin Role:** Can add, edit, and delete translations for all course content.  
* **Coach Role:** Does not have access to this functionality.  
* **Student Role:** Can select their preferred language.

---

#### **19\. LMS \- Course Reporting System (Coach & Admin Perspective)**

* **Feature ID:** S2-LMS-COACH-003  
* **Feature Name:** LMS Course Reporting System  
* **User Story 1 (Coach):** "As a Coach, I want to access a 'Course Reports' section to get an overview and detailed insights into how students in my Balagruhas are progressing through courses."  
  * **AC1.1:** A "Reports" link is available in the main Coach navigation.  
  * **AC1.2:** The dashboard allows me to select a specific course and filter the data by one or more of my assigned Balagruhas.  
  * **AC1.3:** The data displayed is strictly scoped to the students within my assigned Balagruhas.  
*   
* **User Story 2 (Admin):** "As an Admin, I want to see the same reports as a Coach, but with data aggregated across ALL Balagruhas, so I can get a complete system-wide view of performance."  
  * **AC2.1:** The Admin sees the exact same dashboard layout and metrics as the Coach.  
  * **AC2.2:** By default, the data is aggregated across all Balagruhas in the system.  
  * **AC2.3:** The Admin retains the ability to filter down to specific Balagruhas to investigate further.  
*   
* **User Story 3 (Coach & Admin):** "As a user of the reporting system, I want to be able to export the current report view as a PDF, so I can easily share it on WhatsApp or for offline review."  
  * **AC3.1:** A "Download Report" button is available on the reporting dashboard.  
  * **AC3.2:** The primary export option generates a clean, well-formatted PDF optimized for sharing.  
  * **AC3.3:** A CSV export is available as a secondary option for data analysis.  
  * **AC3.4:** The export reflects all currently applied filters (course, Balagruha, etc.).  
*   
* **A. Course Analytics Dashboard:**  
  * **Element 1: Filter Panel**  
    * **Select Course:** Dropdown. Required.  
    * **Select Balagruha(s):** Multi-select Dropdown. For Admins, this lists all Balagruhas; for Coaches, it lists only their assigned Balagruhas.  
  *   
  * **Element 2: High-Level Summary Cards**  
    * **Content:** Cards for "Total Enrolled Students," "Avg. Completion Rate," "Avg. Quiz Score," "Total ISF Coins Earned," etc.  
  *   
  * **Element 3: Detailed Tables**  
    * **Content:** Tables for Student-Level Progress, Module & Chapter Breakdown, and Quiz Performance.  
    * **Interaction:** Clicking on a student, module, or quiz in a table allows for drilling down into more detailed views.  
  *   
  * **Element 4: Export & Download Options**  
    * **Button:** "Download Report."  
    * **Behavior:** Clicking opens a small modal with options: "Export Full Report (PDF)" and "Export Student Progress (CSV)."  
  *   
*   
* **Flow (Coach): Views and Exports a Report**  
  1. **User Action (Coach):** Navigates to "Reports."  
  2. **User Action:** Selects a "Course" (e.g., "Fun with Shapes") and a "Balgruha" from the filters.  
  3. **System Response:** Fetches and aggregates all relevant progress data for that specific course and Balgruha.  
  4. **UI Changes:** All summary cards and detailed tables populate with the filtered data.  
  5. **User Action:** Clicks the "Download Report" button and selects "Export Full Report (PDF)."  
  6. **System Response:** The backend generates a PDF file based on the current data view.  
  7. **UI Changes:** The file download is initiated. A success toast "Report downloaded successfully" appears.  
*   
* **Logical Endpoint (for dashboard data):** GET /api/reports/course-summary  
  * **Request Parameters:** courseId, balagruhaIds (optional), studentIds (optional). The backend will automatically apply Coach's Balagruha scope if the user is a Coach.  
  * **Response:** Aggregated JSON data for all dashboard components.  
*   
* **Logical Endpoint (for export):** GET /api/reports/export  
  * **Request Parameters:** format=pdf, reportType=full\_summary, plus all filter parameters.  
  * **Response:** A file download.  
*   
* **Coach Role:** Can view reports only for courses and students within their assigned Balagruhas.  
* **Admin Role:** Can view reports for ALL courses, Balagruhas, and students. Data is aggregated system-wide by default.

---

#### **20\. System-Wide Feature: In-App Notification Center**

* **Feature ID:** S2-SYS-NC-001  
* **Feature Name:** In-App Notification Center  
* **User Story 1 (All Roles):** "As a User, I want to see a clear indicator when I have new notifications, both globally and on specific features, so I don't miss important updates."  
  * **AC2.1:** A main "Notification Bell Icon" in the header displays a badge with the total count of all unread notifications.  
  * **AC2.2:** In addition, contextual numeric badges appear directly on specific feature buttons (e.g., "Chat," "Syllabus Tracker") when a new notification is related to that feature.  
*   
* **User Story 2 (All Roles):** "As a User, when I click on the Notification Bell Icon, I want a panel to open displaying my recent notifications so I can quickly see what's new."  
  * **AC2.1:** Clicking the bell icon opens a dropdown panel listing recent notifications, newest first.  
  * **AC2.2:** Unread notifications are visually distinct from read notifications (e.g., different background color, bold text).  
  * **AC2.3:** The panel includes a "Mark all as read" button.  
*   
* **User Story 3 (All Roles):** "As a User, I want to click on a notification to be taken to the relevant part of the application, so I can take action."  
  * **AC3.1:** Actionable notifications are clickable.  
  * **AC3.2:** Clicking a notification navigates the user to the relevant page (e.g., a "New Course Assigned" notification takes a Student to that course).  
  * **AC3.3:** Clicking a notification automatically marks it as "read," and the badge counts are updated accordingly.  
*   
* **Element 1: Notification Bell Icon (in Header)**  
  * **Badge:** A small, red circular badge with the total count of unread notifications.  
  * **Interaction:** Toggles the visibility of the Notification Panel.  
*   
* **Element 2: Contextual Badges (on Feature Buttons)**  
  * **Location:** Top-right corner of specific buttons like "Chat," "Syllabus Tracker," "Pending Tasks."  
  * **Content:** A number indicating notifications relevant to that feature.  
*   
* **Element 3: Notification Panel/Dropdown**  
  * **Layout:** A dropdown panel with a header, a scrollable list of notifications, and an empty state message ("You have no new notifications.").  
  * **Header:** Contains the title "Notifications" and a "Mark all as read" button.  
*   
* **Element 4: Individual Notification Item**  
  * **Content:** An icon (optional, relevant to type), the message text, and a relative timestamp ("5m ago").  
  * **Visual States:** Unread (e.g., light blue background, bold text) vs. Read (standard background, normal text).  
*   
* **Logical Endpoint (for panel):** GET /api/user/notifications?limit=20  
* **Logical Endpoint (to mark read):** POST /api/user/notifications/{notificationId}/mark-read

---

#### **21\. System-Wide Feature: Voice Communication**

* **Feature ID:** S2-SYS-VC-001  
* **Feature Name:** Voice Communication & Admin Broadcast  
* **User Story 1 (All Roles):** "As a User (Student, Coach, Admin, Amma), I want to be able to send and receive voice notes to communicate easily without typing."  
  * **AC1.1:** A chat or communication interface is available to all roles.  
  * **AC1.2:** This interface includes a microphone icon that uses a press and hold to record, release to send mechanic.  
  * **AC1.3:** Users receive a notification (contextual badge on the "Chat" or "Voice Chat" button) when a new voice note arrives.  
*   
* **User Story 2 (Admin):** "As an Admin, I want a special feature to record a single voice note and broadcast it to all students at once, like a 'Mann ki Baat'."  
  * **AC2.1:** A "Broadcast Message" feature is available in the Admin dashboard.  
  * **AC2.2:** The Admin can record a voice note and send it as a broadcast.  
  * **AC2.3:** This broadcast appears as a special notification or featured item for all students.  
*   
* **All Roles:** Can send and receive voice notes in one-to-one or group chats they are part of.  
* **Admin Role:** Is the only role that can use the one-to-many "Broadcast" functionality.

Of course. I will continue generating the complete, unabridged Master Project Specification Document, maintaining the established structure and level of detail for the final features related to the Amma role and the newly added system-wide features.

---

#### **22\. Amma Role Enhancements: Individual Accounts & Self-Registration**

* **Feature ID:** S2-AMMA-001  
* **Feature Name:** Amma Individual Accounts & Self-Registration Workflow  
* **User Story 1 (New Amma):** "As a prospective Amma, I want to be able to register for an account myself through the application, so I can initiate the process of joining the platform."  
  * **AC1.1:** A "Register as Amma" option is available on the application's login or landing screen.  
  * **AC1.2:** This option leads to a registration form requiring necessary details (e.g., Name, Contact Information, affiliated Balagruha).  
  * **AC1.3:** Upon submitting the form, my application is sent to an Administrator for approval, and I receive a confirmation that my application is under review.  
*   
* **User Story 2 (Admin):** "As an Admin, I want to be notified of new Amma registration requests and have an interface to review, approve, or reject them, so I can control access to the platform."  
  * **AC2.1:** A notification is generated for the Admin when a new Amma registration is submitted.  
  * **AC2.2:** A "User Management" or "Amma Approvals" section in the Admin dashboard lists all pending registration requests.  
  * **AC2.3:** For each request, the Admin can view the applicant's details.  
  * **AC2.4:** The Admin has clear "Approve" and "Reject" buttons. Approving the request creates the Amma account and notifies the applicant. Rejecting it removes the request and notifies the applicant.  
*   
* **User Story 3 (Amma):** "As an approved Amma, I want to be able to log in with my own individual credentials, so I can access a dashboard that is specific to my tasks and responsibilities."  
  * **AC3.1:** Once approved, the Amma receives credentials or instructions to set up a password.  
  * **AC3.2:** The Amma can log in to the application, and the system recognizes them by their role.  
  * **AC3.3:** Upon login, the Amma is directed to their specific Amma Dashboard, which is built to precisely match the client-provided UI mockups.  
*   
* **A. Amma Registration Form:**  
  * **Fields:** Full Name (Text Input, Required), Mobile Number (Text Input, Required), Email Address (Text Input, Optional), Select Balagruha(s) (Multi-select Dropdown), Password/Confirm Password (Password Input, Required).  
  * **Button:** "Submit Application."  
*   
* **B. Admin \- Amma Approval Interface:**  
  * **Layout:** A table listing pending applications.  
  * **Columns:** Applicant Name, Mobile Number, Balagruha(s), Submission Date.  
  * **Row Actions:** "View Details," "Approve," "Reject."  
  * **Confirmation Modals:** Approving or rejecting an application triggers a confirmation modal to prevent accidental clicks.  
* 

---

#### **23\. Amma Role Enhancements: Enhanced Query & Task Management**

* **Feature ID:** S2-AMMA-002  
* **Feature Name:** Amma Enhanced Query Handling & SLA-Based Task Management  
* **User Story 1 (Amma):** "As an Amma, when I view a student's query, I want the ability to reclassify it, assign it to another Balagruha's Amma if it's not for me, and add multiple tags so I can categorize it correctly for better tracking."  
  * **AC1.1:** The Amma query management interface allows an Amma to change the primary category of a query.  
  * **AC1.2:** The interface provides an option to reassign a query to a different Balagruha.  
  * **AC1.3:** A multi-tagging system allows the Amma to add or remove multiple relevant tags to a query.  
*   
* **User Story 2 (System):** "As a System, I want to enforce Service Level Agreements (SLAs) on tasks assigned to Ammas. If a task is not resolved within the set time, I want to automatically reassign it to another Amma or escalate it, so that student needs are addressed promptly."  
  * **AC2.1:** Admins can define a target resolution time (SLA) for different types of tasks (e.g., 24 hours).  
  * **AC2.2:** The system tracks the time since a task was assigned to an Amma.  
  * **AC2.3:** If the SLA is breached, the system automatically reassigns the task to another designated Amma or escalates it to an Admin/Coach.  
  * **AC2.4:** A notification is sent to the new assignee and the original Amma.  
*   
* **User Story 3 (Admin):** "As an Admin, I need an emergency override capability to manually reassign any Amma's task to someone else, regardless of the SLA, in case of urgent situations."  
  * **AC3.1:** The Admin dashboard provides a view of all active Amma tasks.  
  * **AC3.2:** For any task, the Admin has an "Emergency Reassign" button.  
  * **AC3.3:** This allows the Admin to immediately assign the task to any other Amma or user role.  
*   
* **A. Amma Dashboard (as per client UI):**  
  * The UI will be implemented to precisely match the client-provided mockups, which serve as the definitive source of truth for the Amma dashboard's layout, navigation, and functionality. This includes the specific views for pending queries, active tasks, and student insights.  
*   
* **B. Query/Task Detail View (Amma):**  
  * **Components:**  
    * **Reclassify Dropdown:** To change the primary category.  
    * **Reassign Dropdown:** Lists other Balagruhas for reassignment.  
    * **Multi-Tag Input:** An input field that allows adding and removing tags.  
    * **SLA Timer:** A visual indicator showing the time remaining before the SLA is breached (e.g., "Time Left: 12h 30m").  
  *   
* 

---

#### **24\. System-Wide Feature: Automated WhatsApp Notifications**

* **Feature ID:** S2-SYS-WAPP-001  
* **Feature Name:** Automated WhatsApp Schedule Notifications  
* **User Story 1 (Admin):** "As an Admin, when I publish the daily schedule in the Playground application, I want the system to automatically send a notification with that schedule to the designated WhatsApp group for each relevant Balagruha, so that communication is instant and requires no manual steps from my side."  
  * **AC1.1:** The action of an Admin publishing a daily schedule triggers a backend workflow.  
  * **AC1.2:** The system identifies all Balagruhas included in that day's schedule.  
  * **AC1.3:** For each Balagruha, the system retrieves the designated WhatsApp group number from a secure data store.  
  * **AC1.4:** The system formats a message containing the key details of the schedule.  
  * **AC1.5:** The system successfully sends this formatted message to the correct WhatsApp group via an integrated WhatsApp Business API.  
*   
* **User Story 2 (System):** "As a System, I need to be configured with the necessary credentials and infrastructure to connect to a WhatsApp Business API provider, so I can send messages programmatically."  
  * **AC2.1:** The system's backend architecture includes a module for integrating with a third-party WhatsApp Business API provider.  
  * **AC2.2:** There is a secure configuration mechanism to store API keys, endpoint URLs, and other credentials.  
  * **AC2.3:** A management interface exists (for Admins) to securely store and update the designated WhatsApp group numbers for each Balagruha.  
*   
* **Third-Party Integration:** This feature is critically dependent on the selection and integration of a WhatsApp Business API provider (e.g., Twilio, 360dialog). This involves setup, potential approval processes from Meta, and recurring costs.  
* **Data Stored:** A new field will be added to the Balagruha data model to store the target WhatsApp group number (e.g., whatsAppGroupNumber). This must be stored securely.  
* **Backend Workflow:**  
  1. **Trigger:** onDailySchedulePublish event.  
  2. **Action:**  
     * Fetch schedule details.  
     * Fetch all affected Balgruha documents.  
     * For each Balgruha with a valid whatsAppGroupNumber:  
       * Construct the message payload.  
       * Make an API call to the WhatsApp provider's endpoint.  
     *   
  3.   
  4. **Logging:** All sent messages (successes and failures) must be logged for auditing and troubleshooting.  
*   
* **Admin Role:** Can manage the WhatsApp group numbers associated with each Balagruha. The publishing of the schedule by an Admin is the trigger for the automated notification.  
* **Other Roles:** Do not have control over this automated process.

---

#### **25\. System-Wide Feature: Error Handling & Playground Manager (PM) Role**

* **Feature ID:** S2-SYS-PM-001  
* **Feature Name:** System-Wide Error Logging and PM Task Assignment  
* **User Story 1 (System):** "As a System, whenever an unexpected error occurs anywhere in the application (frontend or backend), I want to automatically capture the detailed technical information and create a new task assigned to the Playground Manager (PM), so that all errors are centrally tracked and managed without manual reporting."  
  * **AC1.1:** A global error handler is implemented across the application (Electron frontend and Node.js backend).  
  * **AC1.2:** When an error is caught, the handler captures technical details (e.g., error message, stack trace, user context, timestamp).  
  * **AC1.3:** The system automatically creates a new task in a dedicated "System Tasks" queue.  
  * **AC1.4:** This newly created task is automatically assigned to the user with the Playground Manager (PM) role.  
*   
* **User Story 2 (System):** "As a System, when displaying an error message to a student, I want to use positive, child-friendly language to avoid causing distress, while still providing a clear indication that something went wrong."  
  * **AC2.1:** All user-facing error messages are abstracted from technical error codes.  
  * **AC2.2:** A predefined library of positive, encouraging, and child-friendly messages is used.  
  * **Examples:**  
    * **Network Error:** "Oops\! The magic internet wires seem to be tangled. Please try again in a moment\!"  
    * **Content Loading Error:** "Hmm, this activity seems to be sleeping. We'll wake it up\! Please tell your Coach."  
    * **Submission Error:** "Whoa\! The submission machine hiccupped. Let's try sending that again\!"  
  *   
*   
* **User Story 3 (Playground Manager):** "As a Playground Manager, I want to have a dedicated dashboard or view where I can see all the system-generated error tasks assigned to me, so I can investigate, prioritize, and manage their resolution."  
  * **AC3.1:** A user account with the "Playground Manager" role can be created.  
  * **AC3.2:** When the PM logs in, they have access to a dashboard that lists all tasks assigned to them.  
  * **AC3.3:** This view allows the PM to see the technical details of each error, track the status of the task (e.g., New, In Progress, Resolved), and add comments.  
*   
* **Playground Manager (PM) Role:** A new, distinct role with the primary permission to view and manage the system-generated task queue.  
* **System:** Has the permission to create tasks and assign them to the PM.  
* **Other Roles:** Do not have access to the PM's task dashboard.

Of course. Here is the continuation and conclusion of the complete, unabridged Master Project Specification Document, maintaining the established structure and level of detail.

---

### **Detailed Feature & Module Breakdown (Conclusion)**

#### **26\. Non-Functional Requirements**

This section outlines system-wide requirements that are not tied to a specific feature but are crucial for the overall success, usability, and security of the application.

* **Target Hardware Benchmark:** The application **MUST** be optimized to run smoothly, seamlessly, and without noticeable lag on the specified target hardware: **Core i3, 4th Gen PCs with 8GB DDR3 RAM, a 256GB SSD, and a 1366x768 resolution monitor.** All performance testing and optimization efforts will be benchmarked against this hardware configuration.  
* **Application Load Time:** Initial application startup time should be optimized to be as short as possible, aiming for under 10 seconds on target hardware.  
* **UI Responsiveness:** All UI interactions (button clicks, navigation, opening modals) must register and provide feedback to the user in under 200 milliseconds. Data-heavy operations that may take longer must display a loading state indicator.  
* **Memory Usage:** The application should be profiled to ensure it does not have memory leaks and maintains a reasonable memory footprint during extended use, to avoid degrading performance on the target hardware.  
* **Role-Based Access Control (RBAC):** Access to all features, data, and actions **MUST** be strictly controlled based on the user's role (Student, Coach, Admin, Amma, Playground Manager). Users must not be able to access any API endpoint or view any UI component for which they are not authorized. This will be enforced on both the backend (API level) and the frontend (UI level).  
* **Assessment Security \- Facial Recognition Check:** To ensure user identity during assessments, facial recognition **MUST** be active at the start of all quizzes and tests across all LMS course types (Computer Apps, Art, Life Skills, etc.). The system must perform a facial recognition check to verify the student's identity before allowing the assessment to begin.  
  * **Note:** The expanded requirement for *continuous* "always-on" facial recognition is explicitly **out of scope for Sprint 2**.  
*   
* **Data Storage:** All sensitive user data must be stored securely. Passwords must be hashed using a strong, modern algorithm (e.g., bcrypt).  
* **API Security:** All API endpoints must be protected against common web vulnerabilities (e.g., SQL injection, Cross-Site Scripting).  
* **Database Queries:** All database queries, especially for the reporting system, must be designed and optimized to be efficient. Indexes must be appropriately used on MongoDB collections to ensure that performance does not degrade significantly as the number of students, courses, and progress records grows.  
* **Stateless Backend:** The Node.js backend should be designed to be stateless where possible, allowing for easier scaling in future cloud-based deployments.  
* **Transactional Integrity:** Operations that involve multiple data updates (e.g., awarding ISF coins, updating task status, and unlocking the next module) should be handled in a way that ensures data integrity. If one part of the operation fails, the entire transaction should be rolled back to prevent inconsistent states.  
* **Offline-First for Students:** Core student learning interactions and progress tracking **MUST** function in an offline environment. Student progress data (e.g., task completion, quiz attempts, time spent) must be saved to the local Memory Layer (SQLite database) immediately.  
* **Data Synchronization:** The system must have a robust mechanism to synchronize the local offline data with the central MongoDB database whenever an internet connection becomes available. This synchronization must handle potential conflicts gracefully.

---

### **27\. Sprint 2 Scope Summary & Sign-off**

This Master Project Specification Document (MPSD Version 2.0) represents the complete and agreed-upon scope of work for the ISF Playground \- Sprint 2\. All stakeholders acknowledge that this document is the single source of truth for all development, design, and testing activities within this sprint.

#### **27.1. In-Scope Feature Summary:**

* **Core LMS for Students:** A fully functional student-facing LMS with interaction models for Computer Apps, Art, Spoken English, and Life Skills courses. Includes the digital accumulation of ISF Coins.  
* **Admin & Coach Functionalities:** Role-delineated course management (Admin-only creation/editing), course assignment (Admin/Coach), content management (Admin-only), quiz creation (Admin-only), and a coach-centric grading system via the "Syllabus Tracker" with manual coin awarding.  
* **Amma Role Enhancements:** Individual Amma accounts with an Admin approval workflow, enhanced query and task management with SLA enforcement, and voice note communication.  
* **System-Wide Features:** A dual-display In-App Notification Center, a comprehensive Course Reporting System with PDF export, Voice Communication for all roles, Admin Broadcast capabilities, and automated WhatsApp notifications for daily schedules.  
* **New PM Role & Error Handling:** The introduction of the Playground Manager role and a system-wide framework for capturing all errors and assigning them as tasks to the PM, coupled with child-friendly user-facing error messages.  
* **UI Implementation:** All user interfaces for all roles will be implemented to **strictly match the client-provided UI mockups**.

#### **27.2. Explicitly Out-of-Scope for Sprint 2:**

* Continuous "Always-On" Facial Recognition  
* Full UI Internationalization (beyond translating content)  
* Life Skills "Learn then Test" Model  
* Task "Revision Mode"  
* AI-Powered Transcription & Translation of Voice Notes

#### **27.3. Stakeholder Approval:**

By signing below, each stakeholder confirms that they have reviewed this MPSD in its entirety, understand the scope of work, and agree that it represents the complete plan for Sprint 2\. Any change or deviation from this document must go through a formal change request process.

* **Client (ISF Representative):**  
  * Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  * Signature: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  * Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
*   
* **Project Manager:**  
  * Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  * Signature: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  * Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
*   
* **Lead Developer:**  
  * Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  * Signature: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
  * Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
* 


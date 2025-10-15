# **Detailed Feature Specification Document**

# **WTF (Wall for Thrust towards Fame) \- ISF Playground**

**Version: 1.1**  
**Date: July 1, 2025**  
**Prepared by:** Anjai Jacob, AI Senior Technical Writer, Business Analyst, and UX Strategist

## **Table of Contents**

**I. WTF Feature Introduction & Goals**  
A. Purpose of the WTF (Wall for Thrust towards Fame)  
B. Key Objectives for WTF MVP  
C. Target Users for WTF

**II. WTF Global UI/UX & Placement**  
A. Placement  
B. Visibility  
C. Overall Look & Feel  
D. Capacity & Display of Pins

**III. Student User Experience & Flows within WTF**  
A. Viewing Pinned Content  
B. Liking Content & Viewing Counts  
C. Suggesting Topics & Sharing Stories via Voice Note  
D. Writing & Submitting an Article  
E. Viewing "Op Ed" / ISF Updates / "Mann ki Baat" Podcast

**IV. Admin & Coach User Experience & Flows for WTF Curation**  
A. Accessing WTF Curation Tools (Admin)  
B. Curation Workflow: Coach Suggests, Admin Pins  
C. Pinning Other Content by Admin  
D. Managing Pinned Content & Automated Lifecycle  
E. Reviewing Student Submissions (Voice Notes & Articles)

**V. Content Types & Display on WTF Pins**  
A. Photo / Drawing  
B. Video  
C. Audio / Talk (Podcast, Voice Notes)  
D. Text (Op Ed, Announcements, Stories)

**VI. ISF Coin Assignment for WTF Content**  
A. Admin Configuration for Coin Rewards  
B. Automated Awarding Logic  
C. Student Notification for Earned Coins

**VII. Detailed WTF Reporting & Analytics for Admins**  
A. User Stories & Goals  
B. UI Specifications: Analytics Dashboard  
C. Data Requirements & Aggregations  
D. Export Functionality

**VIII. Data Model & Repository (WTF)**  
A. Core MongoDB Collections  
B. Media & File Storage Strategy  
C. "Google Photos" Style Repository (MVP Approach)

**IX. Notifications (Related to WTF)**  
A. Student-Facing Notifications  
B. Admin-Facing Notifications  
C. Coach-Facing Notifications

**X. Non-Functional Requirements (NFRs) for WTF**

**XI. Out of Scope for WTF MVP**

**XII. Technical Considerations (WTF)**

**Appendix A: Estimated Screens & Reports**

---

## **I. WTF Feature Introduction & Goals**

### **A. Purpose of the WTF (Wall for Thrust towards Fame)**

The "WTF (Wall for Thrust towards Fame)" is envisioned as a dynamic, aspirational, and engaging community space within the ISF Playground desktop application. Its primary purpose is to make children look forward to using the application beyond compulsory learning or ISF Coin rewards. It will serve as a platform for showcasing student achievements, sharing ISF news and insights, fostering a sense of belonging to a wider community across all Balgruhas, and providing a safe avenue for student expression and recognition.

### **B. Key Objectives for WTF MVP**

1. **Increase Student Engagement:** Make the ISF Playground app a more exciting and anticipated daily experience.  
2. **Foster a Sense of Community:** Allow children to see and appreciate work/ideas from peers across all 20 Balgruhas.  
3. **Provide a Safe Platform for Showcasing & Recognition:** Enable students to have their approved work (art, performances, ideas) shared and receive positive affirmation (likes).  
4. **Deliver ISF Updates & Inspirational Content:** Share "Op Ed" style news, updates, and potentially "Mann ki Baat" like audio content from ISF.  
5. **Encourage Student Voice:** Allow students to suggest topics, share anecdotes, and submit short stories via voice note and text submission mechanisms.  
6. **Motivate Excellence:** Serve as an additional motivator (beyond ISF Coins) for students to produce quality work and participate.

### **C. Target Users for WTF**

* **Primary:** Students (consuming content, liking, suggesting topics, writing articles).  
* **Secondary:**  
  * Administrators (Admins) (curating and pinning all content, reviewing submissions, managing the WTF).  
  * Coaches (suggesting student work from LMS as suitable for WTF pinning by Admin).

---

## **II. WTF Global UI/UX & Placement**

### **A. Placement**

The WTF will appear as the **default content view on the student's home screen "palette"** (the main content area) immediately after successful login (e.g., post-facial recognition).

### **B. Visibility**

* The WTF is visible as soon as the student home screen loads.  
* It will **vanish** (be replaced by module-specific UI) when the student selects a learning module (e.g., "Computer apps," "Art") from the global navigation.  
* It will **reappear** when the student navigates back to the main home screen.

### **C. Overall Look & Feel**

* The UI will employ a **"Softboard" or "Noticeboard" metaphor**.  
* Content items will be represented as **"pins"** (e.g., small cards or icons with thumbnails/titles) seemingly attached to this Softboard.  
* The overall design should be visually appealing, child-friendly, and easy to navigate.

### **D. Capacity & Display of Pins**

* The Softboard will be designed to comfortably and clearly display approximately **15-20 pins at a time** without requiring immediate scrolling.  
* For MVP: The displayed pins will be the most recently added ones, subject to automated lifecycle rules defined in Section IV.D.  
* Scrolling/Pagination (Post-MVP Consideration): If the user experience demands viewing more than the active pins, future iterations could introduce vertical scrolling or a "See More Pins" mechanism. For MVP, a fixed set of the latest pins is the focus.

---

## **III. Student User Experience & Flows within WTF**

### **A. Viewing Pinned Content**

1. **UI:** The Softboard displays a collection of individual "pins." Each pin will be a visually distinct card-like element.  
   * **Pin ID:** (Internal)  
   * **Pin Visual:** A thumbnail image (for photos, drawings, videos), a relevant icon (for audio, text, ISF updates), or a snippet of text.  
   * **Pin Title/Caption (Short):** A brief title or caption associated with the pin content.  
2. **Content Display within a Pin (Preview on Softboard):**  
   * **Photo/Drawing:** A small thumbnail of the image.  
   * **Video:** A video thumbnail with a "play" icon overlay.  
   * **Audio/Talk:** An audio icon (e.g., speaker-icon or podcast-icon) with the title of the talk/audio.  
   * **Text (Op Ed, Announcement):** A title and a short snippet of the text content.  
   * **ISF Update/Podcast:** May have a distinct "ISF Official" visual marker or border.  
3. **"Seen" State:**  
   * **UI Change:** Pins that the currently logged-in student has already viewed will appear visually distinct from unread pins. This could be achieved by reducing the opacity of the seen pin (e.g., to 60%) or applying a greyscale filter.  
   * **Determination of "Seen":** A pin is marked as "seen" for a student once they click on it and the full content viewer (photo, video, audio, text) is opened and interacted with for a minimum duration (e.g., 3 seconds) or closed.  
4. **Interaction (Opening Full Content):**  
   * Clicking anywhere on a pin (thumbnail or title area) will open the full content.  
   * **Photo/Drawing Viewer:** Opens an in-app image viewer modal displaying the full-resolution image. May include zoom capabilities if feasible for MVP. Close button.  
   * **Video Player:** Opens an in-app video player modal with standard controls (play/pause, volume, seek bar, fullscreen option). Close button.  
   * **Audio Player:** Opens an in-app audio player modal or an embedded player bar with controls (play/pause, volume, seek bar, progress display). Close button or dismiss.  
   * **Text Reader:** Opens a modal or a dedicated clean reader view displaying the full text content, formatted for readability. Scrollbar for longer texts. Close button.

### **B. Liking Content & Viewing Counts**

1. **UI (On each Pin on the Softboard):**  
   * Two distinct, clickable "like" icons will be present on or directly associated with each pin:  
     * "Thumbs Up" Icon: Standard thumb-up-icon. ID: btn-like-thumb-\[pinId\].  
     * "Green Heart" Icon: Standard heart-icon (colored green). ID: btn-like-heart-\[pinId\].  
   * A display area for aggregate counts will be present near the icons.  
2. **Interaction:**  
   * A student can click either the "Thumbs Up" or the "Green Heart" icon for any given pin. For MVP, a student can only select **one type of like per pin**. Clicking the other type will switch their like.  
   * When an icon is clicked/selected by the student, its visual state changes to show it's "liked by this student" (e.g., icon fills with color, gets a border).  
   * Clicking an already active like icon by the same student will "unlike" it, returning the icon to its default state.  
3. **Like & Seen Counts Display (To Students):**  
   * The total like count and "seen" count **will be displayed** on or near each pin, visible to all students.  
   * **UI:** A small, unobtrusive display showing, for example: 👀 150 | 👍 12 | ❤️ 5\. This provides a sense of community engagement in a safe environment without negative feedback mechanisms.  
4. **Data:**  
   * The system records which student (studentId) liked which pin (pinId) and which type of like (thumb\_up or green\_heart). It also aggregates total counts for display.

### **C. Suggesting Topics & Sharing Stories via Voice Note**

1. **Purpose:** This feature allows students to either suggest topics for discussion OR share their own short anecdotes/stories via a 1-minute voice note, which may be selected by an Admin to be pinned as audio content.  
2. **UI Access Point:** A clearly visible button or a special "Suggestion Pin" on the WTF Softboard.  
   * **Label:** "Share Your Voice\!" or "Suggest & Share"  
   * **Icon:** microphone-plus-icon  
   * **ID:** btn-wtf-share-voice  
3. **User Flow:**  
   * **User Action (Student):** Presses and **holds down** the left mouse button on the "Share Your Voice\!" button.  
   * **System Response:** Voice recording begins immediately. Microphone access may be requested from the OS if not already granted.  
   * **UI Changes:** A modal or overlay appears with a visual recording indicator (e.g., a pulsating waveform) and a timer counting up to 01:00. Text appears: "Recording... Release to stop."  
   * **User Action (Student):** Speaks their suggestion or story. **Releases** the left mouse button.  
   * **System Response:** Recording stops. The audio is temporarily stored locally for review.  
   * **UI Changes:** The recording modal now shows review controls: a "Listen" button (play-icon) and a "Submit Suggestion" button (send-icon). The "Record" button remains, now for re-recording.  
   * **User Action (Student):** Clicks the **"Listen"** button to review their recording. This step is mandatory before the "Submit Suggestion" button is enabled.  
   * **User Action (Student):**  
     * If dissatisfied after listening, they can press and hold the "Record" button on this modal again. This action will discard the previous recording and start a new one.  
     * If satisfied, they click the **"Submit Suggestion"** button.  
   * **System Response (Backend):** The audio file is saved and a record is created in the wtf\_topic\_suggestions collection for Admin review.  
   * **UI Changes:** Modal closes. A success toast appears: "Thanks for sharing\! We'll take a look."  
   * **Notification (Admin):** An in-app notification is generated for Admins: "New voice submission received from \[StudentName\]."

### **D. Writing & Submitting an Article**

1. **Purpose:** Allows students to write short stories or articles in Hindi or English for consideration to be pinned on the WTF.  
2. **UI Access Point:** A button or special pin on the WTF Softboard.  
   * **Label:** "Write a Story"  
   * **Icon:** pencil-write-icon  
   * **ID:** btn-wtf-write-story  
3. **User Flow:**  
   * **User Action (Student):** Clicks the "Write a Story" button.  
   * **System Response:** Opens a full-screen or large modal "Article Editor."  
   * **UI Changes (Article Editor):**  
     * Input Field: "Title"  
     * Language Selector: Dropdown with options "Hindi" and "English".  
     * Main Content Area: A simple rich text editor (WYSIWYG) allowing basic formatting (bold, italics, lists, paragraphs).  
     * Button: "Submit Story"  
     * Button: "Save as Draft"  
     * Button: "Cancel"  
   * **User Action (Student):** Writes their article, gives it a title, and clicks "Submit Story."  
   * **System Response (Backend):** Saves the text content and creates a submission record for Admin review.  
   * **UI Changes:** Modal closes. A success toast appears: "Your story has been submitted for review\!"  
   * **Notification (Admin):** "New article submission received from \[StudentName\]."

### **E. Viewing "Op Ed" / ISF Updates / "Mann ki Baat" Podcast**

1. **Appearance:** These items will appear as regular pinned content, curated by Admins.  
2. **UI Distinction:** Pins for official ISF content may have a slightly different visual treatment (e.g., special border, "ISF Official" badge).  
3. **Interaction:**  
   * **"Mann ki Baat" Podcast (Audio):** Opens the in-app Audio Player, which now features **adjustable playback speed controls** (e.g., 0.75x, 1x, 1.5x).  
   * **"Op Ed"/ISF Updates (Text):** Opens the Text Reader view, which now features a **Text-to-Speech (TTS) button** (speaker-icon). Clicking it reads the article text aloud using the system's offline TTS voice.  
   * **ISF Updates (Video):** Opens in the in-app Video Player.  
   * Students can "like" these official posts as well.

---

## **IV. Admin & Coach User Experience & Flows for WTF Curation**

This section details how Administrators (and potentially Coaches with specific permissions) will manage and curate the content displayed on the WTF Softboard.

### **A. Accessing WTF Curation Tools (Admin)**

1. **Access Point:** Within the main Admin Dashboard of the ISF Playground application, there will be a new section in the navigation menu.  
   * **Label:** "WTF Management"  
   * **Icon:** pinboard-icon or star-gallery-icon.  
   * **ID:** nav-admin-wtf-management.  
2. **Landing Page:** Clicking this navigates the Admin to the WTF Management dashboard, which will provide tools for pinning content, reviewing submissions, managing existing pins, and viewing analytics.

### **B. Curation Workflow: Coach Suggests, Admin Pins**

1. **Source of Content & "Suggest for WTF" Badge (Coach View):**  
   * Throughout the ISF Playground application where student-generated work is viewable by Coaches (e.g., LMS grading interfaces for Art, Spoken English), a **"Suggest for WTF"** badge/button will be available.  
   * **UI:** An icon (star-outline-icon) with a tooltip "Suggest for WTF."  
   * **ID (Example):** btn-suggest-for-wtf-\[contentId\].  
2. **User Flow (Coach Suggests):**  
   * **User Action (Coach):** While reviewing a piece of student work, clicks the "Suggest for WTF" badge.  
   * **System Response:** Opens a simple confirmation modal.  
   * **UI Changes (Modal):** Title: "Suggest this work for the WTF?". Content preview. Buttons: "Confirm Suggestion," "Cancel."  
   * **User Action (Coach):** Clicks "Confirm Suggestion."  
   * **System Response (Backend):** A record is created in a WtfSuggestions collection, linking the content, student, and suggesting coach.  
   * **UI Changes:** Modal closes. A success toast appears: "Suggestion sent to Admin for review." The badge on the student work changes to "Suggested ★".  
   * **Notification (Admin):** An in-app notification is generated for Admins: "New WTF suggestion from Coach \[CoachName\] for student \[StudentName\]'s work."  
3. **User Flow (Admin Pins a Suggestion):**  
   * **User Action (Admin):** Navigates to a "Pending WTF Suggestions" queue in the WTF Management dashboard.  
   * **UI Changes:** A list of coach-suggested works and direct student submissions is displayed.  
   * **User Action (Admin):** Clicks "Review" on a suggestion. This opens the standard "Pinning Modal," pre-filled with the content details.  
   * **User Action (Admin):** Optionally adds/edits the caption and clicks "Pin it\!".  
   * **System Response:** On confirmation, the item is pinned as per the standard pinning flow.  
   * **Notifications (Coach & Student):** Notifications are sent to both the original student ("Your work has been featured...") and the suggesting Coach ("The work you suggested for \[StudentName\] has been pinned\!").

### **C. Pinning Other Content by Admin**

1. **UI Access Point:** Within the "WTF Management" dashboard, a prominent button.  
   * **Label:** "+ Create New Pin"  
   * **ID:** btn-wtf-create-new-pin.  
2. **User Flow (Admin):**  
   * **User Action (Admin):** Clicks "+ Create New Pin."  
   * **System Response:** Opens a "Create New WTF Pin" form/modal.  
   * **UI Changes (New Pin Form):**  
     * Input Field: Pin Title/Headline. Required.  
     * Dropdown: Content Type. Options: "Text Announcement," "Image," "Video (URL/Upload)," "Audio/Podcast (URL/Upload)," "External Link." Required.  
     * Conditional Content Input Area based on Content Type (e.g., WYSIWYG for text, file uploader for image/video/audio, URL input for links).  
     * Input Field (Optional): Pin Caption (Short).  
     * Checkbox: Mark as "ISF Official Post".  
     * Buttons: "Publish Pin," "Save as Draft," "Cancel".  
   * **User Action (Admin):** Fills in the form, uploads/links content, and clicks "Publish Pin."  
   * **System Response (Backend):** Validates input, saves the new pin data to the wtf\_pins collection.  
   * **UI Changes:** Form/Modal closes. Success toast: "New pin '\[PinTitle\]' published to WTF\!"

### **D. Managing Pinned Content & Automated Lifecycle**

1. **Admin Management UI:**  
   * Within the WTF Management dashboard, a table or card-based list view displays all currently active (and potentially recently unpinned/draft) WTF pins.  
   * **Columns/Info per Pin:** Thumbnail/Icon, Pin Title/Caption, Content Type, Pinned Date, Pinned By (Admin), Original Author (if student work), Like Counts (Thumbs Up, Green Hearts \- visible to Admin only), Seen Count.  
   * **Filters:** By Content Type, Date Range, Pinned By. Search by Title/Caption.  
2. **Actions per Pin (available to Admin):**  
   * **"Unpin":** Removes the pin from student view (status changes to "UNPINNED") but keeps the record. Requires confirmation.  
   * **"Edit Pin":** Opens a modal to edit the pin's title, caption, or replace content.  
   * **"Delete Permanently":** Removes the pin record and associated content. Requires "Are you sure?" confirmation.  
3. **Automated Pin Lifecycle Management (New Rules):**  
   * **7-Day Expiration:** A scheduled backend job will run daily. Any pin where pinnedTimestamp is older than 7 days will have its status automatically changed from "ACTIVE" to "UNPINNED".  
   * **FIFO (First-In, First-Out) on Full Softboard:** When an Admin adds a new pin and the count of "ACTIVE" pins is at the limit (e.g., 20), the system will automatically find the oldest active pin (the one with the earliest pinnedTimestamp) and change its status to "UNPINNED" *before* saving the new pin as "ACTIVE". This ensures the board never exceeds its capacity and stays fresh.

### **E. Reviewing Student Submissions (Voice Notes & Articles)**

1. **UI Access Point:** A unified queue within "WTF Management" labeled "Student Submissions" with tabs for "Voice Notes" and "Articles." A badge indicates new submissions.  
2. **UI (Queue):** A list showing Student Name, Balagruha, Submission Date, and Review Status (New, Reviewed, Archived).  
3. **User Flow (Admin):**  
   * Admin clicks "Review" on a submission.  
   * For voice notes, an embedded audio player opens. For articles, the text is displayed in a clean reader view.  
   * Admin can take one of two primary actions:  
     1. **"Pin to WTF":** This opens the standard "Pinning Modal" to feature the submission.  
     2. **"Archive":** This moves the submission out of the pending queue without pinning it. The status is updated in the database.  
   * A success toast confirms the action taken.

## **V. Content Types & Display on WTF Pins**

This section defines how different types of content are represented as "pins" on the WTF Softboard and how they behave when a student interacts with them.

### **A. Photo / Drawing**

* **Source:** Student artwork submitted via the LMS Art module (Artweaver integration) or photos uploaded by an Admin.  
* **Representation on Softboard (The Pin):**  
  * **Visual:** A small, square or rectangular thumbnail preview of the image. The image will be cropped or scaled to fit the standard pin dimensions (e.g., fit: 'cover').  
  * **Overlay/Caption Area:** The pin will have a designated area (e.g., a semi-transparent overlay at the bottom) to display the Pin Title/Caption.  
  * **Like & Seen Icons/Counts:** "Thumbs Up," "Green Heart," and "Seen" icons and their aggregate counts will be present on the pin.  
* **Interaction (On Click):**  
  * **Action:** Clicking the pin opens a full-screen or large modal "Image Viewer."  
  * **Image Viewer UI:**  
    * **Main Content:** The photo or drawing displayed at a larger, high-resolution size, centered.  
    * **Background:** A semi-transparent overlay (lightbox effect) dims the background WTF Softboard.  
    * **Caption/Title:** The full Pin Title/Caption is displayed clearly below the image.  
    * **Author Credit:** "Artwork by: \[Student Name\]" is displayed if it's student work.  
    * **Controls:** A clear 'X' icon in the top-right corner to close the viewer and return to the WTF.  
  * **"Seen" State Trigger:** The pin is marked as "seen" for the student once the Image Viewer is closed.

### **B. Video**

* **Source:** Student Spoken English video performances, or videos uploaded/linked by an Admin (e.g., ISF announcements, educational content).  
* **Representation on Softboard (The Pin):**  
  * **Visual:** A thumbnail image of the video (either the first frame or an Admin-uploaded custom thumbnail). A "Play" icon (play-circle-icon) will be overlaid in the center to clearly indicate it's a video.  
  * **Overlay/Caption Area:** Similar to the Photo pin, a space for the Pin Title/Caption.  
  * **Like & Seen Icons/Counts:** Will be present on the pin.  
* **Interaction (On Click):**  
  * **Action:** Clicking the pin opens a full-screen or large modal "Video Player."  
  * **Video Player UI:**  
    * **Main Content:** An embedded video player takes up the main area of the modal.  
    * **Title & Author:** The Pin Title/Caption and "Performance by: \[Student Name\]" are displayed above or below the player.  
    * **Player Controls:** Standard video controls must be available: Play / Pause, Volume control / Mute, Seek bar (timeline) showing video progress and duration, (Optional) Fullscreen toggle.  
    * **Controls:** A clear 'X' icon to close the player.  
  * **"Seen" State Trigger:** The pin is marked as "seen" for the student once the video starts playing (e.g., passes the 3-second mark) or is closed after being opened.

### **C. Audio / Talk (Podcast, Voice Notes)**

* **Source:** "Mann ki Baat" style podcasts from ISF, Admin-posted audio messages, and selected student-submitted anecdotes/stories.  
* **Representation on Softboard (The Pin):**  
  * **Visual:** This pin will not have a content thumbnail. Instead, it will feature a prominent, large icon representing audio (e.g., podcast-icon, speaker-icon).  
  * **Title/Caption Area:** The Pin Title (e.g., "This Week's 'Mann ki Baat'") and a short description/caption are the primary visual content.  
  * **Like & Seen Icons/Counts:** Will be present on the pin.  
* **Interaction (On Click):**  
  * **Action:** Clicking the pin opens an "Audio Player" modal.  
  * **Audio Player UI:**  
    * **Main Content:** A clean audio player interface showing title, author/speaker, and a larger version of the audio icon.  
    * **Player Controls:** Play / Pause, Volume control / Mute, Seek bar (timeline), and **Adjustable playback speed controls (e.g., 0.75x, 1x, 1.5x).**  
    * **Controls:** 'X' icon to close the player.  
  * **"Seen" State Trigger:** The pin is marked as "seen" once the audio starts playing or the player is closed after being opened.

### **D. Text (Op Ed, Announcements, Stories)**

* **Source:** Announcements, articles ("Op Ed"), or stories posted by Admins. Potentially excellent written submissions from students.  
* **Representation on Softboard (The Pin):**  
  * **Visual:** A prominent icon representing text (e.g., document-text-icon).  
  * **Title/Caption Area:** The Pin Title/Headline is the main feature, possibly with the first few words of the text as a snippet.  
  * **Like & Seen Icons/Counts:** Will be present on the pin.  
* **Interaction (On Click):**  
  * **Action:** Clicking the pin opens a full-screen or large modal "Text Reader."  
  * **Text Reader UI:**  
    * **Main Content:** A clean, readable, scrollable view for the text content.  
    * **Formatting:** Must support basic text formatting (paragraphs, bold, italics, lists) as entered by the Admin in the WYSIWYG editor.  
    * **Header:** Displays the full Pin Title/Headline.  
    * **Author Credit:** "Posted by: ISF Admin" or "Story by: \[Student Name\]".  
    * **Controls:** 'X' icon to close the reader, and a **Text-to-Speech (TTS) button (speaker-icon)**. Clicking the TTS button will read the article text aloud using the system's offline TTS voice.  
  * **"Seen" State Trigger:** The pin is marked as "seen" once the Text Reader is opened and then closed.

---

## **VI. ISF Coin Assignment for WTF Content**

### **A. Admin Configuration for Coin Rewards**

* **UI Access Point:** Within the main Admin Dashboard, under a "System Settings" or "ISF Coin Rules" section.  
* **UI Element:** A simple form section labeled "WTF Reward Configuration".  
  * Input Field: "ISF Coins to award for any student content featured on WTF". ID: num-wtf-coin-award.  
  * Default Value: 25 coins.  
  * Save Button: Saves this global setting.

### **B. Automated Awarding Logic**

* **Trigger:** Executed by the back end immediately after an Admin successfully pins a piece of *student-generated* content (Art, Spoken English, Voice Note, Article).  
* **Process:**  
  1. The system identifies the studentId of the original author of the pinned content.  
  2. It retrieves the global WTF reward value from the Admin configuration.  
  3. It adds this coin value to the student's totalCoinBalance in their Memory Layer record.  
  4. It logs the transaction in the coinTransactionHistory with a description like "Featured on WTF".

### **C. Student Notification for Earned Coins**

* The system generates an in-app notification (via the Notification Center) for the student.  
* **Content/Message Template:** "Congratulations, \[StudentName\]\! Your \[WorkType\] was featured on the WTF and you've earned \[CoinValue\] ISF Coins\! 🎉"

---

## **VII. Detailed WTF Reporting & Analytics for Admins**

### **A. User Stories & Goals**

* **User Story:** "As an Admin, I want to view key engagement metrics and analytics for the WTF, so I can understand what content is popular and how the feature is being used."  
* **Goal:** To provide Admins with actionable insights into WTF content performance.

### **B. UI Specifications: Analytics Dashboard**

* **Access Point:** A tab or sub-section within "WTF Management" labeled "Analytics".  
* **Dashboard Layout:**  
  * **Summary Cards (Top Row):**  
    * "Total Active Pins"  
    * "Total Likes (Last 7 Days)"  
    * "Total Seen Events (Last 7 Days)"  
    * "New Submissions Pending Review"  
  * **Engagement Trends Chart:** A simple line or bar chart showing total likes and total seen events per day for the last 30 days.  
  * **Top Performing Pins Table:** A sortable table listing active/recent pins.  
    * Columns: Pin Title, Author Name, Content Type, Pinned Date, Total Thumbs Up, Total Green Hearts, Total Seen Count.  
    * Sorting: Sortable by any of the count columns.  
* **Filters:** Global filters for Date Range.

### **C. Data Requirements & Aggregations**

* The backend will need to run aggregation queries on the wtf\_pins and wtf\_student\_interactions collections to calculate the metrics for this dashboard. These can be cached periodically for performance.

### **D. Export Functionality**

* An "Export to CSV" button will be available for the data in the Top Performing Pins table.

## **VIII. Data Model & Repository (WTF)**

This section details the data structures and storage strategy required to implement the WTF feature. The data model is designed for MongoDB, leveraging its flexible schema capabilities. The repository approach aims to store all curated content for long-term use, separating the act of "pinning" from the underlying content storage.

### **A. Core MongoDB Collections**

**1\. wtf\_pins Collection**

* **Purpose:** Stores the metadata for every item that is currently or has previously been "pinned" to the WTF Softboard. This is the central collection for managing what appears on the wall.

**Schema:**  
Generated json  
      {

  "\_id": ObjectId(),

  "pinId": String, // Custom, human-readable unique ID, e.g., "pin\_art\_123"

  "title": String, // The main title/headline of the pin

  "caption": String, // Optional short caption displayed on the pin preview

  "contentType": String, // Enum: "IMAGE", "VIDEO", "AUDIO", "TEXT", "ARTICLE"

  "content": {

    "url": String, // URL to media file in S3 or an external link/embed URL

    "text": String, // Full text content, if contentType is "TEXT" or "ARTICLE"

    "language": String, // "en" or "hi", for ARTICLE type

    "thumbnailUrl": String // Optional: URL to a specific thumbnail image for video/audio

  },

  "status": String, // Enum: "ACTIVE", "UNPINNED", "DRAFT", "PENDING\_APPROVAL"

  "isISFOfficial": Boolean, // To apply special styling for official posts

  "tags": \[String\], // For future categorization, e.g., \["art", "balagruha\_x", "spoken\_english"\]

  "originalAuthor": {

    "userId": ObjectId, // Ref to users collection (student)

    "userName": String, // Denormalized for quick display

    "type": String // "STUDENT"

  },

  "pinnedBy": {

    "adminId": ObjectId, // Ref to users collection (admin)

    "adminName": String // Denormalized

  },

  "pinnedTimestamp": Date,

  "unpinnedTimestamp": Date, // Set when auto-unpinned or manually unpinned

  "likes": {

    "thumbsUpCount": Number, // Denormalized count

    "greenHeartCount": Number // Denormalized count

  },

  "seenCount": Number, // Denormalized count

  "createdAt": Date,

  "updatedAt": Date

}

*  **Indexes:** pinId (unique), status, pinnedTimestamp (for sorting), tags.

**2\. wtf\_student\_interactions Collection**

* **Purpose:** Tracks each student's specific interactions with each pin (likes and views). This is crucial for personalization (the "seen" state) and accurate analytics without bloating the main wtf\_pins document.

**Schema:**  
Generated json  
      {

  "\_id": ObjectId(),

  "pinId": String, // Foreign key reference to wtf\_pins.pinId

  "studentId": ObjectId, // Foreign key reference to users.\_id

  "hasSeen": Boolean,

  "seenTimestamp": Date,

  "likeType": String, // Enum: "THUMBS\_UP", "GREEN\_HEART", null

  "likeTimestamp": Date,

  "updatedAt": Date

}

*  IGNORE\_WHEN\_COPYING\_START  
   content\_copy download  
     
* **Indexes:** A compound index on { studentId: 1, pinId: 1 } (unique).

**3\. wtf\_submissions Collection**

* **Purpose:** A unified collection to store all student-submitted content (voice notes, articles) and coach-suggested content awaiting Admin review.

**Schema:**  
Generated json  
      {

  "\_id": ObjectId(),

  "submissionId": String, // Custom unique ID

  "studentId": ObjectId, // Ref to student user

  "studentName": String, // Denormalized

  "balagruhaName": String, // Denormalized

  "submissionType": String, // Enum: "VOICE\_NOTE", "ARTICLE", "COACH\_SUGGESTION"

  "content": {

    "url": String, // URL to audio/video/image file in S3

    "text": String, // Full text content for articles

    "title": String, // Title for articles

    "language": String, // "en" or "hi" for articles

    "originalContentId": String // ID of the original LMS work for coach suggestions

  },

  "suggestedByCoachId": ObjectId, // Optional, for COACH\_SUGGESTION type

  "submittedTimestamp": Date,

  "reviewStatus": String, // Enum: "NEW", "REVIEWED", "PINNED", "ARCHIVED"

  "reviewedByAdminId": ObjectId, // Optional

  "reviewedTimestamp": Date, // Optional

  "internalNotes": String // Optional notes from the reviewing admin

}

*  IGNORE\_WHEN\_COPYING\_START  
   content\_copy download  
   Use code [with caution](https://support.google.com/legal/answer/13505487). Json  
  IGNORE\_WHEN\_COPYING\_END  
* **Indexes:** reviewStatus, submittedTimestamp.

### **B. Media & File Storage Strategy (S3 / GridFS)**

* **Purpose:** To store the actual media files (images, videos, audio) associated with WTF pins and submissions. The database stores the metadata and a link to the file.  
* **Recommended Technology: Amazon S3 (Simple Storage Service)**  
  * **Rationale:** Highly scalable, durable (99.999999999%), and cost-effective for storing large amounts of media. Allows for easy content delivery via URLs and integration with other AWS services for optimization (like Lambda and MediaConvert).  
* **Alternative: MongoDB GridFS**  
  * **Rationale:** Useful if there is a strict requirement to keep files within the MongoDB ecosystem. It can simplify backup procedures as files and the database are in one system. However, it can be less performant for high-volume streaming compared to a dedicated object storage service like S3. For this project's needs, S3 is the superior choice.  
* **File Naming Convention:** A structured naming convention will be used to avoid conflicts and allow for easy organization.  
  * **Example for pinned student artwork:** wtf/content/student\_work/art/{studentId}\_{taskId}\_{timestamp}.jpg  
  * **Example for a topic suggestion voice note:** wtf/submissions/voice\_notes/{studentId}\_{submissionId}\_{timestamp}.mp3

### **C. "Google Photos" Style Repository (MVP Approach & Future Vision)**

The client's inspiration from Google Photos (categorization, resurfacing old content) is a powerful long-term vision. For the MVP, we will lay the groundwork for this without building complex surfacing algorithms.

* **MVP Implementation ("The Repository"):**  
  * **Data Persistence:** The wtf\_pins collection *is* the repository. We will **never hard-delete** a pin unless absolutely necessary (e.g., for data privacy compliance or removal of inappropriate content). Instead of deleting, Admins will "Unpin" a post, which changes its status from "ACTIVE" to "UNPINNED". This preserves the content and its engagement data for historical purposes.  
  * **The "Softboard" is a View:** The student-facing WTF Softboard is simply a *view* or a *query* on the wtf\_pins collection. For the MVP, this query will be: find({ status: "ACTIVE" }).sort({ pinnedTimestamp: \-1 }).limit(20). This shows the 20 most recent active pins. This query is simple, fast, and ensures freshness.  
  * **Tagging for the Future:** The tags array in the wtf\_pins schema is the crucial element for enabling future curation. When an Admin pins student work, the system will automatically add relevant tags (e.g., art, spoken\_english, balagruha\_x, student\_{studentId}). Admins can also add manual tags like showcase\_worthy or theme\_festivals.  
* **Future Vision (Post-MVP):**  
  * **"Memories" / Throwbacks:** A separate, automated job could run periodically (e.g., weekly) to create a special "Throwback" pin. It would query the wtf\_pins collection for highly-liked posts from exactly one year ago (pinnedTimestamp) and feature one of them.  
  * **Themed Collections:** The Admin dashboard could have a feature to create "Collections" (e.g., "Best Art of May 2025"). This would be a new document type that simply contains an array of pinId references. On the WTF, these could appear as a special "Collection Pin" that, when clicked, opens a gallery view of all the pins in that collection.  
  * **Search & Filter for Students:** A future enhancement could allow students to search or filter the WTF repository by tags (e.g., "Show me all 'art' pins," "Show me pins from my Balagruha"). This requires careful consideration of privacy and moderation.  
  * **AI-Powered Curation:** In a very advanced stage, an AI model could analyze tags, like counts, and content types to intelligently surface "pins you might like" or create automated "weekly digest" collections for each student.

By separating the **display logic (the Softboard)** from the **data persistence (the wtf\_pins repository)** and including a tags field from the start, we build a robust foundation that serves the immediate MVP needs while being perfectly positioned for these exciting "Google Photos" style features in the future.

---

## **IX. Notifications (Related to WTF)**

This section specifies all in-app notifications generated by the WTF feature, routed through the system-wide In-App Notification Center.

### **A. Student-Facing Notifications**

1. **Your Work is Featured on WTF & Coins Awarded\!**  
   * **Notification ID:** NTF-WTF-STU-001  
   * **Trigger:** An Admin pins a student's work (Art, Spoken English, Voice Note, Article) and the system successfully awards ISF Coins.  
   * **Recipient:** The specific student whose work was pinned.  
   * **Channel:** In-App Notification Center.  
   * **Content/Message Template:** "Congratulations, \[StudentName\]\! Your \[WorkType\] was featured on the WTF and you've earned \[CoinValue\] ISF Coins\! 🎉"  
     * \[WorkType\]: e.g., "artwork," "Spoken English performance," "story," "voice note."  
   * **Action (On Click):** Navigates the student directly to the WTF Softboard, potentially highlighting their newly pinned item.  
2. **Your Submission Has Been Received\!**  
   * **Trigger:** Student successfully submits a voice note or an article.  
   * **Recipient:** The student who submitted.  
   * **Channel:** In-App Notification Center.  
   * **Content/Message Template:** "Thanks for sharing\! We've received your \[SubmissionType\] and our team will review it soon."  
   * **Action (On Click):** Informational; marks as read.  
3. **New Official ISF Post on WTF\! (For Critical Announcements Only)**  
   * **Trigger:** An Admin creates a new pin and manually checks a "Notify All Students" option during creation.  
   * **Recipient:** All active students.  
   * **Channel:** In-App Notification Center.  
   * **Content/Message Template:** "New ISF Update on the WTF: '\[PinTitle\]'."  
   * **Action (On Click):** Navigates the student directly to the WTF and highlights the specific pin.

### **B. Admin-Facing Notifications**

1. **New Student Submission for WTF Review**  
   * **Trigger:** A student submits a new voice note or article.  
   * **Recipient:** All users with the "Admin" role (or a specific "WTF Curator" role).  
   * **Content/Message Template:** "New \[SubmissionType\] submission received from \[StudentName\] in \[BalgruhaName\] for WTF review."  
   * **Action (On Click):** Navigates to the "Student Submissions" queue in WTF Management.  
2. **New Coach Suggestion for WTF**  
   * **Trigger:** A Coach suggests a student's work for pinning.  
   * **Recipient:** All users with the "Admin" role.  
   * **Content/Message Template:** "New WTF suggestion from Coach \[CoachName\] for \[StudentName\]'s work, '\[TaskName\]'."  
   * **Action (On Click):** Navigates to the "Pending WTF Suggestions" queue.

### **C. Coach-Facing Notifications**

1. **Your Suggestion Was Pinned\!**  
   * **Trigger:** An Admin approves a Coach's suggestion and pins the work.  
   * **Recipient:** The Coach who originally made the suggestion.  
   * **Channel:** In-App Notification Center.  
   * **Content/Message Template:** "Success\! The work you suggested for \[StudentName\] ('\[TaskName\]') has been pinned to the WTF by an Admin."  
   * **Action (On Click):** Navigates to the WTF to see the pinned item.

---

## **X. Non-Functional Requirements (NFRs) for WTF**

This section defines the quality attributes and operational standards that the system must meet.

### **A. Performance**

* **P-NFR-01: WTF Home Screen Load Time:** Must load completely within **3 seconds** on target hardware (initial fetch) and **1.5 seconds** from local cache.  
* **P-NFR-02: Content Viewer Load Time:** Viewer modal must appear within **500ms** of a click, with content loading progressively.  
* **P-NFR-03: Like Interaction Response Time:** Visual feedback must be instant (\<200ms).  
* **P-NFR-04: Media File Size & Optimization:** All images must be automatically optimized (e.g., to WebP). Videos/audio must use appropriate streaming formats.

### **B. Scalability**

* **S-NFR-01: Content Repository Growth:** Must handle **100,000+ pins** and associated media without performance degradation in core views.  
* **S-NFR-02: Concurrent User Interaction:** Must support at least **1,000 concurrent students** interacting with the WTF without noticeable latency.  
* **S-NFR-03: Admin Curation Performance:** Admin dashboard search/filter results must return within **2 seconds**.

### **C. Security & Moderation**

* **SEC-NFR-01: Moderated Content Pipeline:** **No student-generated content shall ever appear directly on the WTF without explicit Admin approval and pinning.**  
* **SEC-NFR-02: Anonymity of Likes (to prevent targeting):** While aggregate counts are visible, the UI must **not** display *which specific students* have liked a pin to other students.  
* **SEC-NFR-03: Private Submissions:** All student submissions must be sent to a private Admin review queue and not be visible to other students until and unless they are pinned.  
* **SEC-NFR-04: Secure Media Access:** Access to media files in S3 should be controlled (e.g., via pre-signed URLs) to prevent unauthorized access.

### **D. Usability**

* **U-NFR-01: Intuitiveness:** Interactions must be highly intuitive for the target age group, requiring minimal instruction.  
* **U-NFR-02: Visual Consistency:** The look and feel must be consistent with the rest of the ISF Playground application.  
* **U-NFR-03: Feedback for Actions:** Every significant user action must provide immediate visual or auditory feedback.

### **E. Reliability & Availability**

* **R-NFR-01: Core Functionality Uptime:** Cloud-based components should strive for **99.9% availability**.  
* **R-NFR-02: Data Integrity:** System must ensure accurate recording of "like" and "seen" states and no data loss for submitted content.

## **XI. Out of Scope for WTF MVP**

To ensure a focused, high-quality, and timely delivery of the core "Wall for Thrust towards Fame" experience, the following features, functionalities, and enhancements are explicitly designated as **Out of Scope** for the Minimum Viable Product (MVP) developed in this sprint. These items have been identified as valuable future enhancements and can be prioritized for subsequent development phases.

### **A. Direct Student-to-Student Social Interactions**

* **Commenting on Pins:** Students will **not** be able to write or record comments on any pinned content. All interaction is limited to the two "like" options (Thumbs Up, Green Heart) and viewing aggregate counts to maintain a positive and safe environment.  
* **Direct Messaging or "Friends":** There will be **no** functionality for students to "friend" each other, follow each other, or send direct messages through the WTF platform.  
* **Student-to-Student Content Sharing:** Students will **not** be able to directly post or share content with other students or on the WTF. All content featuring students is curated and pinned by an Administrator.

### **B. Advanced Curation & "Google Photos" Style Features**

* **Algorithmic Content Resurfacing:** The MVP will display the most recent pins based on the automated lifecycle rules. It will **not** include algorithms to intelligently resurface old content based on user preference, "memories," or "throwbacks."  
* **Themed Collections (Admin-Created):** While the data model will support tagging for the future, the MVP will **not** include the functionality for Admins to create or for students to view curated collections like "Best Art of May" or "Festival Highlights."  
* **Student-Facing Search & Filtering:** Students will **not** have the ability to search, filter, or sort the WTF by tags, categories, or content type. The view will be a single, Admin-curated feed.

### **C. Public "Like" Counts and Leaderboards**

* **Leaderboards:** There will be **no** leaderboards for "most liked student," "most popular pin," or similar ranking systems to avoid direct competition and maintain a focus on personal achievement and community appreciation.

### **D. Advanced Topic Suggestion Features**

* **Public Visibility of Suggestions:** Student-submitted topic suggestions will be sent to a private Admin queue and will **not** be visible to other students for "reinforcement" or upvoting.  
* **Direct Feedback on Suggestions:** Beyond the initial "Suggestion received" notification, the MVP will **not** include a system for providing detailed, direct feedback to students on why their suggestion was or was not chosen. This communication can be handled outside the platform if desired.

### **E. Granular User Customization**

* **Customizing the WTF View:** Students will **not** be able to customize their WTF view, such as hiding certain content types or reordering pins. The view is curated globally by the Admin.  
* **Profile Customization Beyond Basics:** While the platform may have profile settings, specific WTF-related customizations (like a profile "motto" or personal gallery) are **not** part of this scope.

---

## **XII. Technical Considerations (WTF)**

This section details key technical aspects, potential challenges, and implementation strategies for the WTF feature, intended primarily for the development team.

### **A. Media Storage & Delivery (S3 & CloudFront)**

* **Primary Storage: Amazon S3** is the recommended storage solution for all media files (images, videos, audio) associated with WTF pins and submissions.  
  1. **Rationale:** It offers superior scalability, durability (99.999999999%), cost-effectiveness, and fine-grained access control compared to storing large binary files directly in MongoDB (e.g., via GridFS).  
* **Bucket Structure:** A dedicated S3 bucket should be created for the ISF Playground application. Within it, a structured path convention should be used:  
  1. wtf/content/images/{pinId\_or\_contentId}.webp  
  2. wtf/content/videos/{pinId\_or\_contentId}.mp4  
  3. wtf/content/audio/{pinId\_or\_contentId}.mp3  
  4. wtf/submissions/voice\_notes/{submissionId}.mp3  
  5. wtf/submissions/articles/{submissionId}.json  
* **Content Delivery Network (CDN): Amazon CloudFront** should be configured in front of the S3 bucket.  
  1. **Rationale:** A CDN will cache media files at edge locations closer to users, significantly reducing latency and improving load times for images and media playback. It also reduces data transfer costs from S3 for frequently accessed content.  
* **File Upload Process:**  
  1. The Electron/React frontend will make an API call to the Node.js backend to get a **pre-signed S3 URL** for uploading a file.  
  2. This pre-signed URL grants temporary, secure permission to upload a specific file directly from the client to the S3 bucket.  
  3. This avoids proxying large file uploads through the backend server, which is more efficient and scalable.  
  4. Once the upload is complete, the client notifies the backend with the S3 object key/URL to be saved in the relevant MongoDB document.

### **B. Image & Video Optimization**

* **Automated Image Processing:** An AWS Lambda function should be triggered on every new image upload to the S3 bucket. This function will use a library like sharp to:  
  * Resize the image to various standard sizes (e.g., thumbnail for the pin, medium for the viewer).  
  * Convert the image to a modern, efficient format like WebP.  
  * Compress the image to reduce file size.  
* **Video Transcoding:** For video uploads, a service like **AWS Elemental MediaConvert** should be used.  
  * **Rationale:** This service can automatically convert uploaded videos into adaptive bitrate streaming formats (like HLS or DASH). This ensures that videos start playing quickly and adjust their quality based on the user's network conditions, providing a smooth playback experience. The service can also generate thumbnails automatically.

### **C. Real-time Updates & Notifications**

* **WebSockets:** The existing WebSocket architecture will be leveraged for real-time updates.  
  * **"Like" Interaction:** When a student likes a pin, the action is sent to the backend. The "liked" state for the current user is managed instantly in the frontend state. The aggregate like count for all users can be updated via a WebSocket push to avoid requiring a refresh.  
  * **New Pin Notifications:** When an Admin pins new content, the backend will publish an event via WebSockets to a general "WTF-updates" channel or directly to relevant user channels. Online clients subscribed to this channel will receive the notification in real-time and can dynamically insert the new pin into the Softboard view without a full page refresh. This makes the WTF feel "live."

### **D. Database & Query Performance**

* **MongoDB Schema Design:** The schema outlined in Section VIII is designed to be performant. Denormalizing counts and basic author info on the wtf\_pins document avoids expensive lookups when fetching the list of pins. Separating student-specific interactions keeps the main collection lean.  
* **Database Indexing:** Proper indexes are critical for performance as the collections grow.  
  * A compound index on { status: 1, pinnedTimestamp: \-1 } on the wtf\_pins collection will be essential for quickly fetching the active pins for the Softboard.  
  * A compound index on { studentId: 1, pinId: 1 } on the wtf\_student\_interactions collection will allow for extremely fast lookups to determine if a student has already seen or liked a specific pin.  
* **Data Aggregation:** The backend will handle any necessary data aggregations for the Admin Analytics Dashboard. For MVP, this is minimal, but MongoDB's aggregation pipeline will be used to generate analytics without overloading the application servers.

### **E. Security Considerations (Implementation Detail)**

* **API Security:** All backend APIs related to WTF (pinning, liking, suggesting) must be protected by the existing JWT authentication and Role-Based Access Control (RBAC) middleware.  
  * An Admin must have permissions like wtf:pin:create, wtf:submission:review.  
  * A Coach must have wtf:submission:suggest.  
  * A Student must have wtf:like:create, wtf:submission:create.  
* **Content Moderation Pipeline:** The Admin-centric pinning workflow is the primary moderation tool. All content is vetted before it goes live.  
* **Input Sanitization:** All user-generated text content (captions, pin titles, text-based pins) must be sanitized on the backend before being stored and rendered to prevent Cross-Site Scripting (XSS) attacks.

### **F. Offline Considerations (for Electron App)**

* **WTF Caching:** To improve the offline/startup experience, the Electron application should cache the data and thumbnails for the last set of \~20 pins viewed by the student in its local storage (e.g., IndexedDB or a simple file-based cache).  
  * **Flow:** When the app is online, it fetches the latest pins and updates the local cache. When started offline, it first displays the cached pins, providing an immediate, though possibly not fully up-to-date, WTF experience.  
  * **Offline Interaction:** Likes made while offline can be queued locally and synced with the server once an internet connection is re-established. Submissions (voice notes, articles) will require an internet connection to upload the media file and cannot be completed offline.

---

## **Appendix A: Estimated Screens & Reports**

### **1\. Estimated Number of Screens / Major UI Views**

This estimates the number of distinct screens or significant modals that need to be designed and developed for the WTF feature.

**Total Screens/Major Views: Approximately 10 \- 12**

**Breakdown:**

* **Student-Facing Screens (6):**  
  1. **WTF Softboard (Main Home Screen):** The primary view with all the pins.  
  2. **Full-Content Viewer (Modal):** A versatile modal that adapts to show a photo, video player, audio player, or text reader.  
  3. **Voice Note Recording UI (Modal):** The "press-and-hold" interface for recording and submitting voice notes.  
  4. **Article Submission Editor (Modal/Page):** The interface for writing and submitting text articles.  
  5. Profile/Notification View: Where notifications about WTF achievements appear (shares UI with the main notification center).  
  6. Like/Seen Count Display: (This is a component on a screen, not a full screen itself).  
* **Admin/Coach-Facing Screens (4-6):**  
  1. **WTF Management Dashboard (Admin):** The main hub for Admins to manage WTF.  
  2. **"Pinning" Modal (Admin):** The pop-up used by Admins to confirm pinning, add captions, etc.  
  3. **"Create New Pin" Form (Admin):** The interface for Admins to post official content.  
  4. **"Suggestions/Submissions Queue" (Admin):** A view listing all pending student voice notes, articles, and coach suggestions for review.  
  5. **WTF Analytics & Reporting Dashboard (Admin):** The new screen for viewing engagement reports.  
  6. **"Suggest for WTF" Modal (Coach):** A simple confirmation pop-up for Coaches when they suggest content.

### **2\. Estimated Number of Reports**

For the MVP, we are focusing on providing key insights directly within the Admin dashboard rather than generating multiple distinct, exportable "reports."

**Total Reports/Dashboards: 1**

* **The WTF Analytics & Reporting Dashboard:** This single, comprehensive dashboard will provide Admins with the necessary analytics for the MVP. It will include high-level engagement metrics, a performance table of top-performing pins, and basic charts for engagement trends. It will have an "Export to CSV" functionality for the raw data in its tables, which can be considered a form of report.

---


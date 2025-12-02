# ISF Playground - Sprint 3 & 4 Combined

## Master Project Specification Document (MPSD)
### **CLIENT-FACING VERSION**

**Mobile App Development + Emergency & Communication Features**

---

**Document Version:** 3.0 (Client-Facing)
**Last Updated:** 2025-11-04 17:48:38 (via `date '+%Y-%m-%d %H:%M:%S'`)
**Project:** ISF Playground ERP System
**Sprint Duration:** 28 Days Combined (Sprint 3: Days 1-14, Sprint 4: Days 15-28)
**Document Type:** Client-Facing Specification
**Audience:** ISF Foundation Leadership, Project Stakeholders, Non-Technical Decision Makers

---

## **Executive Summary**

This document describes Sprint 3 and Sprint 4 deliverables for the ISF Playground project, including the complete mobile application, ISF Shop module, and comprehensive notification system. This is the **FINAL SPRINT** - all features will be completed.

**What You'll Get:**

**Sprint 3 - Mobile Application:**
- Mobile app for 8 staff roles (Coach, Admin, Balagruha In-charge, Amma, Medical In-charge, Sports Coach, Music Coach, Playground Manager)
- Mobile attendance tracking with facial recognition
- Media uploads and analytics on-the-go
- Push notifications for real-time alerts

**Sprint 4 - Emergency & Communication:**
- Emergency SOS system with 3-tier automatic escalation
- Internal messaging for instant staff communication
- WhatsApp Business integration (optional)
- Student health tracking with medical alerts

**Sprint 5 - ISF Shop (Integrated):**
- Virtual rewards store for students (desktop)
- Purchase Manager workflows for inventory procurement (desktop/web)
- Coach delivery management (mobile)
- Complete ISF Coin economy integration

**Notification System:**
- **75 notification categories** covering all system features
- Multi-channel delivery: Mobile push, desktop, SMS, WhatsApp (optional)
- Priority-based alerting (URGENT, HIGH, MEDIUM, LOW)

**Platform Architecture:**
- **Students**: Electron desktop app with facial recognition login
- **8 Staff Roles**: React Native mobile app distributed via direct APK
- **Purchase Manager**: Desktop/web-only via Admin portal
- **Real-time sync**: Data synchronized across all devices

---

## **Table of Contents**

### **Part 1: Sprint 3 - Mobile Application Features**
1. [Mobile App Foundation - Your Staff's New Mobile Companion](#1-mobile-app-foundation)
2. [Mobile Attendance Tracking - Take Attendance Anywhere](#2-mobile-attendance-tracking)
3. [Mobile Media Management - Upload Content On The Go](#3-mobile-media-management)
4. [Mobile Analytics & Reporting - Performance Insights](#4-mobile-analytics-reporting)
5. [Mobile Push Notifications - Stay Informed Instantly](#5-mobile-push-notifications)

### **Part 2: Sprint 4 - Emergency & Communication Features**
6. [SOS Emergency System - Instant Emergency Response](#6-sos-emergency-system)
7. [Internal Messaging Module - Staff Communication Hub](#7-internal-messaging-module)
8. [WhatsApp Business Integration - Connect With Parents](#8-whatsapp-business-integration)
9. [Student Health Tracking - Monitor Student Wellbeing](#9-student-health-tracking)
   - [Student Emotion Check-In System](#student-emotion-check-in-system)
9.5. [ISF Shop Module - Virtual Rewards Store (Sprint 5 Integration)](#95-isf-shop-module)

### **Part 3: Infrastructure (Behind The Scenes)**
10. [WebSocket Real-Time Communication](#10-websocket-real-time-communication)
11. [AWS S3 Cloud Storage](#11-aws-s3-cloud-storage)

### **Part 4: Notification System (Comprehensive)**
12. [Notification System Overview](#12-notification-system-overview)
13. [Types of Notifications](#13-types-of-notifications)
14. [Complete Notification Catalog (75 Categories)](#14-complete-notification-catalog)
15. [Notifications by User Role](#15-notifications-by-user-role)
16. [Emergency SOS Notifications (Detailed)](#16-emergency-sos-notifications)
17. [Medical Alert Notifications (Detailed)](#17-medical-alert-notifications)
18. [Task & Training Notifications](#18-task-training-notifications)
19. [Messaging Notifications](#19-messaging-notifications)
20. [Mobile App Notification Experience](#20-mobile-app-notification-experience)

### **Part 5: Decisions & Success Criteria**
21. [Key Decisions Needed](#21-key-decisions-needed)
22. [Success Criteria](#22-success-criteria)
23. [What Happens After Sprint 3-4](#23-what-happens-after-sprint-3-4)
24. [Next Steps](#24-next-steps)
25. [Document Approval](#25-document-approval)

---

## **PART 1: SPRINT 3 - MOBILE APPLICATION FEATURES**

---

## **1. Platform Foundation - Understanding the ISF Playground System**

### What This System Is
ISF Playground is built as a **hybrid multi-platform system** that combines desktop, mobile, and web interfaces to serve different user needs. Think of it as a complete ecosystem where students learn on desktop computers while staff manage operations on-the-go with mobile devices.

### Why This Hybrid Approach Matters
Different users have different needs:
- **Students** need stable, supervised desktop environments for learning and using the ISF Shop
- **Staff** need mobility to manage attendance, respond to emergencies, and communicate while moving around campus
- **Purchase Manager** needs comprehensive desktop tools for inventory management and supplier coordination

This hybrid approach gives everyone the right tool for their specific tasks.

### Platform Architecture

**For Students (Electron Desktop Application):**
- Access via desktop computers with Electron application
- Login using facial recognition (implemented, ongoing refinements)
- Interface includes:
  - Course learning (Computer Apps, Art, Spoken English, Life Skills)
  - ISF Shop for browsing and purchasing rewards
  - Task completion and progress tracking
  - Emotion check-in system (5 emoji buttons)
- **No mobile app** - students use supervised desktop environments only

**For 8 Staff Roles (React Native Mobile App):**

**Who Gets the Mobile App:**
1. **Coach** - Attendance tracking, student monitoring, delivery management, task assignments (Sprint 1 Task Management integration)
2. **Admin** - System oversight, approvals, analytics, purchase request approvals, broadcast messages
3. **Balagruha In-charge** - Balagruha-specific management, attendance oversight, student allocation
4. **Amma** - Student well-being monitoring, query management, high-level approvals
5. **Medical In-charge** - Mobile health tracking, daily check-in forms, temperature alerts, vaccination reminders, medical record uploads
6. **Sports Coach** - Sports session management, attendance tracking, performance tracking, student progress monitoring, task assignments
7. **Music Coach** - Music session management, attendance tracking, performance tracking, student progress monitoring, task assignments
8. **Playground Manager** - System error tracking, bug reporting, issue management, technical problem logging

**Mobile App Distribution:**
- **Android**: Direct APK installation (not published to Google Play Store)
- **iOS**: Internal distribution builds for select staff (not published to App Store)
- Reason: Cost savings - App Store/Play Store publishing not in project scope

**Mobile App Features (Available to All 8 Mobile Roles):**
- **Role-based dashboard** showing relevant features for each role
- **Task Management** (integrated with Sprint 1 system - all 8 roles can create, assign, track tasks)
- **Internal messaging** and real-time push notifications
- **Role-specific tools:**
  - **Coaches**: Attendance tracking, delivery management, student monitoring
  - **Medical In-charge**: Health check-in forms, temperature alerts, medical records
  - **Sports/Music Coaches**: Session management, performance tracking, attendance
  - **Balagruha In-charge**: Balagruha oversight, student allocation
  - **Playground Manager**: Bug reporting, error logging, system issues
  - **Admin**: Purchase approvals, analytics, system oversight
  - **Amma**: High-level monitoring, critical approvals
- **Real-time data sync** across all devices (mobile, desktop, web)

**For Purchase Manager (Desktop/Web Only):**
- Access via web browser at Admin portal (`/purchase` page)
- Login: purchase@gmail.com credentials
- Features:
  - Multi-product purchase request creation
  - Inventory monitoring and stock updates
  - Supplier liaison and invoice management
  - Request approval tracking
- **No mobile app** - requires desktop for optimal workflow management

**For All Staff (Desktop/Web Access):**
- All 8 mobile staff roles can also access the system via web browsers for desktop work
- Purchase Manager uses desktop/web exclusively
- Full feature parity between mobile and web for shared functionality

### Authentication & Security

**Students:**
- Facial recognition on Electron desktop app
- Implemented and continuously refined
- Supervised environment on registered computers

**Staff (Mobile):**
- Secure username and password login
- Session management with automatic timeout
- Encrypted data transmission

**Staff (Desktop/Web):**
- Standard username and password authentication
- Purchase Manager uses Admin portal credentials

**Security Features:**
- Bank-level encryption for all data transmission
- Role-based access control (RBAC) for feature permissions
- Session timeout after inactivity
- Audit trails for all critical actions

### Data Synchronization

**Real-Time Sync:**
- Changes made on mobile instantly appear on desktop/web and vice versa
- Task assignments, messages, notifications sync across all devices
- Attendance records, health data, shop orders sync in real-time

**Offline Capabilities:**
- Planned for future enhancement (not in Sprint 3-4 scope)
- Current system requires active internet connection
- Background sync and offline queuing to be added later

### What You'll Experience

**For Students:**
- Log in with face at desktop computer
- Access courses, complete tasks, browse ISF Shop
- Earn ISF Coins through learning activities
- Check in emotions via emoji buttons

**For Coaches (Mobile):**
- Open mobile app anywhere on campus
- Take attendance photos with instant facial recognition results
- Receive emergency SOS alerts immediately
- Manage task assignments and student progress
- Deliver shop orders to students

**For Medical Staff (Mobile):**
- Log student health check-ins on-the-go
- Receive instant alerts for high temperatures or concerning symptoms
- Access student medical history from anywhere
- Upload medical documents from mobile device

**For Purchase Manager (Desktop):**
- Monitor inventory levels from Admin portal
- Create multi-product purchase requests with attachments
- Track request approval status
- Update stock after supplier deliveries

**For Admins (Mobile + Desktop):**
- Monitor system health on mobile
- Approve purchase requests on desktop
- View analytics and reports on both platforms
- Send broadcast messages to all students

### Key Technical Details
- **Student Platform**: Electron desktop (Windows), Facial recognition login
- **Staff Mobile**: React Native (Android primary, iOS optional)
- **Backend**: Node.js + MongoDB with real-time WebSocket connections
- **Distribution**: Direct APK for Android, internal builds for iOS
- **Target Hardware**: Core i3 4th Gen, 8GB RAM, 256GB SSD
- **Resolution**: 1366x768 (desktop primary target)
- **Development Time**: 2 weeks (foundation + all platform setup)
- **First Available**: Week 1-2 of Sprint 3

**Note:** This hybrid architecture provides the foundation for the entire ISF Playground ecosystem, enabling seamless coordination between students, staff, and administrators.

---

## **2. Mobile Attendance Tracking - Take Attendance Anywhere on Campus**

### What This Feature Does
Staff can now take group attendance photos directly from their mobile phones instead of being tied to a desktop computer. The app uses the phone's camera to capture a group photo, then the existing facial recognition system identifies which students are present.

### Why This Matters
Coaches often conduct sessions in different locations - sports fields, outdoor areas, classrooms. Requiring them to bring students to a computer lab or carry a laptop is impractical. With mobile attendance, they can:
- Take attendance in seconds from anywhere
- Verify results immediately on their phone
- Fix any recognition errors on the spot
- Complete attendance for multiple sessions throughout the day

### How It Works

**Taking Attendance:**
1. Coach opens the Attendance section in the mobile app
2. Taps "Take Attendance Photo"
3. Chooses to either take a new photo or upload from gallery
4. The app guides them to ensure good lighting and positioning
5. Takes the photo - students look at the camera
6. Photo automatically uploads to the system
7. Facial recognition processes the image (takes 10-30 seconds)
8. Results appear showing which students were identified

**Reviewing Results:**
- Green checkmarks show students successfully identified
- Yellow warnings for students that might need verification
- Red flags for recognition failures
- Coach can manually mark present/absent for any student
- Can add notes ("Student was sick", "Left early")

**Offline Capability:**
If internet connection is poor:
- Photos are saved on the phone
- A queue shows pending uploads
- Everything syncs automatically when connection returns
- No attendance data is lost

### What You'll Experience

**Example Scenario:**
Coach Rajesh takes his students for outdoor sports. After the session:
1. He opens the ISF app on his phone
2. Taps "Take Attendance"
3. Gathers students for a quick group photo
4. Snaps the photo - takes 5 seconds
5. While students disperse, he reviews the results on his phone
6. Sees 18 of 20 students were recognized automatically
7. Manually marks the 2 students the system missed
8. Confirms and submits - attendance complete in under 2 minutes

### Key Details
- **Photo requirements**: Good lighting, students facing camera, clear view of faces
- **Processing time**: 10-30 seconds depending on group size
- **Maximum group size**: Up to 50 students per photo
- **Photo quality check**: App warns if photo is too dark, blurry, or distant
- **Offline support**: Photos queue and upload automatically when online
- **History access**: View past attendance records with date filtering
- **Manual override**: Coaches can always correct any recognition errors
- **Task Management Integration**: Repeated absences trigger follow-up tasks (Sprint 1 integration)
  - 3+ consecutive absences: Auto-create task "Follow up on student [Name] absence"
  - Assigned to: Balagruha In-charge + assigned Coach
  - Deadline: Within 24 hours
  - Task includes attendance history and suggested actions
  - Mobile task notifications sent (see Notification #16-22)
- **Development time**: 3 days
- **First available**: Week 2 of Sprint 3

---

## **3. Mobile Media Management - Upload Course Content On The Go**

### What This Feature Does
Coaches and content creators can upload videos, documents, and images for courses directly from their mobile phones. No need to transfer files to a computer first - everything goes straight from phone to the cloud storage.

### Why This Matters
Often, coaches record training videos, capture important moments, or take photos of student work on their phones. Previously, they had to:
- Email files to themselves
- Transfer via USB to a computer
- Upload through the desktop interface

Now they can upload instantly while the content is fresh, tag it properly, and make it available to students right away.

### How It Works

**Uploading Content:**
1. Coach opens the Media section in the app
2. Taps "Upload Content"
3. Selects files from phone:
   - Videos from camera roll
   - Documents from phone storage
   - Photos just taken or from gallery
4. Chooses which course and module to add it to
5. Adds a title and description
6. Sets visibility (published immediately or draft for review)
7. Uploads begin with progress bars showing
8. Uploads continue even if they close the app
9. Notification appears when upload completes

**Multiple Files at Once:**
Can select and upload multiple files simultaneously:
- All files upload in parallel
- See progress for each individual file
- Continue using the app while uploads happen in background

**Preview Before Publishing:**
- Video player preview for video files
- Document viewer for PDFs
- Image gallery for photos
- Can edit title, description, and metadata before finalizing

### What You'll Experience

**Example Scenario 1 - Training Video:**
Coach Priya just filmed a yoga demonstration on her phone:
1. Opens ISF app immediately after filming
2. Goes to Media Upload
3. Selects the video (120MB, 8 minutes long)
4. Associates it with "Yoga Basics - Module 2"
5. Adds title: "Sun Salutation Sequence"
6. Starts upload - takes 2-3 minutes
7. Closes app and continues other work
8. Gets notification "Upload complete" 3 minutes later
9. Students can now view the video in their course

**Example Scenario 2 - Multiple Documents:**
Admin Kumar has 5 policy documents to upload:
1. Selects all 5 PDFs at once
2. Associates with "Staff Guidelines" course
3. Starts batch upload
4. All 5 upload simultaneously
5. Complete in under a minute

### Key Details
- **File size limits**:
  - Videos: up to 500MB per file (about 30 minutes of HD video)
  - Documents (PDFs): up to 50MB per file
  - Images: up to 25MB per file
- **Background uploads**: Files continue uploading even if app is closed
- **Progress tracking**: See upload percentage for each file
- **Supported formats**:
  - Videos: MP4, MOV
  - Documents: PDF, DOC, DOCX
  - Images: JPG, PNG
- **Auto-optimization**: Videos are automatically compressed for streaming
- **Upload speed**: Depends on internet connection (WiFi recommended for large files)
- **Notification**: Alert when upload completes or fails
- **Draft mode**: Upload files privately to review before publishing to students
- **Development time**: 1 day
- **First available**: Week 2 of Sprint 3

---

## **4. Mobile Analytics & Reporting - Performance Insights In Your Pocket**

### What This Feature Does
Staff can view important performance metrics, attendance statistics, course completion rates, and student progress reports directly on their mobile phones with visual charts and graphs.

### Why This Matters
Administrators and coaches need to monitor performance trends, identify students who need support, and make data-driven decisions. Rather than waiting until they're at a desktop, they can:
- Check attendance trends during morning reviews
- Review student progress between sessions
- Identify top performers for recognition
- Spot students falling behind and intervene quickly
- Share reports with other staff members

### How It Works

**Dashboard Overview:**
When opening the Analytics section, staff see:
- Quick statistics cards (attendance rates, course completion, active students)
- Visual charts showing trends over time
- Top performer leaderboards
- Alerts for concerning patterns

**Filtering Data:**
- Select date ranges (today, this week, this month, custom dates)
- Filter by Balagruh
- Filter by specific courses or modules
- View individual student details
- Compare performance across different time periods

**Report Types:**

**Attendance Reports:**
- Daily attendance percentages with color-coded charts
- Trend lines showing improvements or declines
- Individual student attendance history
- Comparison across different Balagruhs

**Course Progress Reports:**
- Completion percentages for each course
- Average time to complete modules
- Quiz scores and assessment results
- Students who haven't started assigned courses

**Coin Distribution Analytics:**
- Total coins earned by Balagruh
- Top coin earners (gamification leaderboard)
- Coin spending patterns in the shop
- Reward effectiveness tracking

**Exporting Reports:**
- Generate PDF reports for printing or emailing
- Export data to spreadsheet format (CSV)
- Share directly via email from the app
- Save reports to phone for offline viewing

### What You'll Experience

**Example Scenario 1 - Morning Review:**
Admin Lakshmi starts her day by checking the mobile dashboard:
1. Opens Analytics section at 8 AM
2. Sees yesterday's attendance: 94% (up from 92% last week)
3. Reviews the attendance chart showing improving trend
4. Notices Balagruh C had lower attendance (88%)
5. Drills down to see which students were absent
6. Sends a message to Balagruh C in-charge to follow up
7. All done in under 3 minutes

**Example Scenario 2 - Progress Meeting:**
Coach Ramesh is in a meeting discussing student performance:
1. Opens his phone to pull up real-time data
2. Shows course completion chart for his Balagruh
3. Filters to last 30 days
4. Identifies 3 students struggling with completion
5. Exports PDF report to share with team
6. Email sent directly from the app

### Key Details
- **Real-time data**: Dashboard updates automatically with latest information
- **Chart types**: Line charts (trends), bar charts (comparisons), pie charts (distributions)
- **Date ranges**: Today, yesterday, last 7 days, last 30 days, custom date selection
- **Export formats**: PDF (formatted reports) and CSV (spreadsheet data)
- **Performance**: Charts load in under 2 seconds on good connection
- **Offline access**: Previously loaded reports cached for offline viewing
- **Visual indicators**: Green (good), yellow (needs attention), red (concerning)
- **Development time**: 1 day
- **First available**: Week 3 of Sprint 3

---

## **5. Mobile Push Notifications - Stay Informed Instantly**

### What This Feature Does
Staff receive instant notifications on their phones for important events, messages, tasks, and emergencies - even when the app is closed. Different types of notifications have different alert levels based on urgency.

### Why This Matters
Critical situations require immediate attention. When a student triggers an SOS emergency, coaches must be notified instantly. Similarly, important messages, task assignments, and time-sensitive alerts shouldn't wait until someone opens the app. Push notifications ensure:
- Emergency alerts are seen immediately
- Important messages aren't missed
- Staff can respond quickly to time-sensitive situations
- Everyone stays informed without constantly checking the app

### How It Works

**Notification Priority Levels:**

**URGENT (Critical Emergencies):**
- Full-screen alerts that can't be ignored
- Loud emergency sound that overrides silent mode
- Strong vibration pattern
- Examples: SOS emergencies, critical medical alerts
- Behavior: Phone lights up, makes noise even during "Do Not Disturb"

**HIGH (Important Actions):**
- Banner notification with sound
- Standard vibration
- Shows on lock screen
- Examples: Task assignments, session reminders, direct messages, medical warnings
- Behavior: Alert sound, visible immediately, stays until viewed

**MEDIUM (Standard Updates):**
- Badge and sound
- Optional vibration
- Examples: Coins awarded, achievements unlocked, order deliveries, task completions
- Behavior: Notification sound, shows in notification center

**LOW (Information Only):**
- Badge only, no sound
- No vibration
- Examples: Attendance marked, community updates, general information
- Behavior: Silent, shows count on app icon

**Tapping Notifications:**
When you tap a notification, the app opens directly to the relevant screen:
- SOS alert → Emergency response screen
- Message → Opens that conversation
- Task assignment → Opens task details
- Coins awarded → Opens wallet
- Medical alert → Opens health record

**Customizing Notifications:**
Staff can control notification preferences:
- Turn notifications on/off for specific types
- Set "quiet hours" (no notifications during sleep hours)
- Choose which conversations get notifications
- For group chats, option to only get notified when mentioned
- Adjust sound and vibration settings
- Emergency alerts always come through (can't be silenced)

### What You'll Experience

**Example Scenario 1 - SOS Emergency:**
Coach Vijay is in a meeting when a student triggers an SOS:
1. His phone suddenly vibrates strongly (three times)
2. Full-screen alert appears with emergency siren sound
3. Message: "SOS ALERT - Student Arun - Medical Emergency - Computer Lab"
4. He taps "On My Way"
5. App opens to show location and student details
6. Other staff see he's responding
7. Total time from trigger to response: under 10 seconds

**Example Scenario 2 - Task Assignment:**
Admin Meera is assigned a new task:
1. Phone shows banner notification with ding sound
2. "New task assigned: Review purchase requests"
3. She's busy, swipes it away to read later
4. Red badge shows "1" on app icon as reminder
5. Later, taps app icon and sees task list
6. Completes task and badge disappears

**Example Scenario 3 - Message Thread:**
Coach Sarah is in a group chat:
1. Gets notification for first message with sound
2. Five more messages come in quick succession
3. Phone groups them: "6 new messages in Coaches Group"
4. She's in a session, doesn't check immediately
5. After session, opens app to read all messages at once
6. Quiet hours prevent notifications during her sleep (11 PM - 7 AM)

### Key Details
- **Notification types**: 57 different categories mapped to 4 priority levels
- **Emergency alerts**: Override Do Not Disturb and silent mode
- **Delivery speed**: Under 5 seconds for 99.9% of notifications
- **Battery impact**: Optimized for minimal battery drain
- **Offline handling**: Notifications queue and deliver when connection returns
- **Quiet hours**: User-configurable times when low/medium priority notifications are silenced
- **Group notifications**: Smart grouping of multiple messages from same source
- **Sound files**: Custom sounds for different notification types
- **Works on**: iOS and Android with different sound/vibration patterns
- **Reliability**: Multiple fallback methods ensure critical notifications always arrive
- **Development time**: 1 day
- **First available**: Week 2 of Sprint 3

---

## **PART 2: SPRINT 4 - EMERGENCY & COMMUNICATION FEATURES**

---

## **6. SOS Emergency System - Instant Emergency Response**

### What This Feature Does
Students can trigger an emergency alert from their desktop with a single button click. The alert immediately notifies relevant staff members on their mobile phones with the highest priority, escalating automatically if no response is received. Staff can coordinate their response in real-time.

### Why This Matters
Student safety is the highest priority. In medical emergencies, safety incidents, or mental health crises, every second counts. This system ensures:
- Students can call for help instantly without leaving their workstation
- The right people are notified immediately
- Alerts automatically escalate if ignored
- Multiple staff members can coordinate response
- Complete record of all emergency responses for safety compliance
- Parents can be notified when appropriate

### How It Works

**Student Side (Desktop):**
1. Student sees a prominent red "SOS" button always visible on their screen
2. In an emergency, they click the button
3. Quick form appears asking for emergency type:
   - Medical (critical health issue)
   - Safety (physical danger)
   - Mental Health (emotional crisis)
   - Other (any emergency)
4. Optional: Add brief description and location
5. Clicks "Send Alert" - emergency notification sent
6. Confirmation message: "Help is on the way"
7. Student can see when someone acknowledges and who's coming

**Staff Side (Mobile) - Three-Tier Escalation:**

**Tier 1: Immediate Response (0-2 minutes)**
**Who gets notified:**
- All coaches in the student's Balagruh
- The Balagruh in-charge

**What happens:**
- Full-screen alert on all their phones
- Emergency siren sound (very loud, can't be silenced)
- Strong vibration pattern (three bursts)
- Message: "SOS ALERT - [Student Name] - Medical Emergency - Computer Lab"
- Alert stays on screen until acknowledged

**Staff responses:**
- "Acknowledged" - I see the alert, someone else can respond
- "On My Way" - I'm going to help
- "I'm There" - I've arrived at the location

**If anyone responds within 2 minutes:** Problem handled at Tier 1, no escalation

**If NO ONE responds within 2 minutes:** Automatic escalation to Tier 2

---

**Tier 2: Administrative Escalation (2-5 minutes)**
**Trigger:** No acknowledgment from Tier 1 coaches after 2 minutes

**Who gets notified:**
- All administrators
- All coordinators
- Senior leadership

**What happens:**
- Same urgent alert on their phones
- Message: "SOS ESCALATED - No Tier 1 Response - Student [Name] - 2 minutes ago"
- SMS text messages sent to their registered phone numbers
- WhatsApp messages (if enabled)
- Shows which Tier 1 staff were notified but didn't respond

**If anyone responds within 3 more minutes (5 total):** Handled at Tier 2, no further escalation

**If NO response by 5 minutes total:** Automatic escalation to Tier 3

---

**Tier 3: All-Staff Broadcast (5+ minutes)**
**Trigger:** No acknowledgment from Tier 1 or Tier 2 after 5 minutes total

**Who gets notified:**
- EVERY staff member in the entire system
- Broadcast to all phones, all desktops
- SMS to everyone with a phone number

**What happens:**
- Critical emergency alert on all devices
- Message: "CRITICAL - SOS Emergency Unacknowledged - 5+ minutes - ALL STAFF RESPOND"
- Desktop computers show full-screen blocking modal (can't work until acknowledged)
- Mobile phones show lock-screen alert
- Cannot be dismissed until someone takes action

---

**Response Coordination:**
Once someone responds "On My Way":
- All staff can see who's responding
- Real-time status updates
- Multiple people can respond if needed
- Communication via messaging system
- When responder arrives and marks "I'm There", all staff are updated

**Resolution:**
When emergency is resolved:
- Staff member marks SOS as "Resolved"
- Adds resolution notes (what happened, what action was taken)
- Notification sent to all who were alerted: "SOS Resolved by [Staff Name]"
- Complete incident record saved with timestamps

### What You'll Experience

**Example Scenario - Medical Emergency:**

**8:30 AM** - Student Arun feels severe chest pain in computer lab
1. Clicks red SOS button, selects "Medical - Critical"
2. Types: "Chest pain, can't breathe well"
3. Clicks Send Alert

**8:30:05 AM** - Tier 1 Alert
- Phones of Coach Rajesh, Coach Priya, and In-Charge Suresh all light up
- Emergency siren sounds on all three phones
- Message: "SOS EMERGENCY - Arun Kumar - Medical Critical - Computer Lab"

**8:30:15 AM** - Response
- Coach Rajesh taps "On My Way"
- All phones update: "Coach Rajesh responding"
- Coach Priya sees this, taps "Acknowledged" (knows someone is going)
- In-Charge Suresh also sees Rajesh is responding

**8:31:30 AM** - Arrival
- Coach Rajesh arrives at computer lab
- Taps "I'm There"
- Assesses Arun's condition
- Uses internal messaging to request medical kit from office

**8:35:00 AM** - Resolution
- Arun is feeling better, was a panic attack
- Coach Rajesh marks SOS as "Resolved"
- Adds notes: "Panic attack. Breathing exercises helped. Student calm now. Will monitor."
- All staff who received alert get notification: "SOS Resolved by Coach Rajesh"

**Total response time:** 1 minute 30 seconds from alert to help arriving

**If This Scenario Had No Response:**
- At 8:32:05 (2 min), administrators would get escalation alert + SMS
- At 8:35:05 (5 min), all staff would get critical broadcast alert
- System ensures someone WILL respond

### Key Details
- **Tier 1 window**: 0-2 minutes (Balagruh staff)
- **Tier 2 window**: 2-5 minutes (Admins + SMS)
- **Tier 3 window**: 5+ minutes (All staff broadcast)
- **Delivery guarantee**: 99.9% success rate, under 5 seconds
- **Emergency alert**: Cannot be silenced by Do Not Disturb mode
- **SMS integration**: Automatic text messages for Tier 2+
- **Audit logging**: Complete record of every alert, response, and resolution
- **Parent notification**: Optional WhatsApp messages to parents for medical emergencies
- **Desktop integration**: Students trigger from desktop, staff respond on mobile
- **Response tracking**: Real-time coordination showing who's responding
- **Historical records**: All SOS incidents logged with timestamps for compliance
- **Task Management Integration**: SOS alerts automatically create follow-up tasks for assigned staff (Sprint 1 integration)
  - Task created: "Follow up on SOS incident - [Student Name]"
  - Assigned to: Staff member who resolved the SOS
  - Deadline: Next day, to ensure student is monitored after incident
  - Task notifications sent via mobile (see Notification #16-22)
- **Development time**: 4 days
- **First available**: Week 3 of Sprint 4

---

## **7. Internal Messaging Module - Staff Communication Hub**

### What This Feature Does
Staff members can send instant messages to each other, create group conversations for teams and Balagruhs, share files and images, and see when messages are read - all in real-time from their mobile phones or desktop computers.

### Why This Matters
Effective communication is essential for coordinating activities, sharing information, and making quick decisions. Rather than relying on personal WhatsApp, phone calls, or face-to-face meetings, staff can:
- Send quick questions and get instant answers
- Share photos and documents within the system
- Create group conversations for Balagruh teams
- Keep all work communication in one secure place
- See when messages are delivered and read
- Access message history anytime

### How It Works

**Starting Conversations:**

**1-on-1 Direct Messages:**
1. Tap the Messages icon in bottom navigation
2. Tap "New Message" button
3. Search for staff member by name or role
4. Type message and send
5. Real-time delivery (appears instantly if they're online)
6. If they're offline, message waits and delivers when they come online

**Group Conversations:**
1. Tap "New Group"
2. Give the group a name (e.g., "Balagruh A Coaches")
3. Select members to add
4. Start chatting - everyone in the group receives messages
5. Can add or remove members later
6. Group messages show sender's name before each message

**Sending Messages:**
- Type text messages (any length)
- Add images (up to 25MB each)
- Attach documents (PDFs, Word files up to 25MB)
- Send videos (up to 100MB)
- Multiple attachments per message (up to 100MB total)

**Message Status Indicators:**
- Single checkmark: Message sent to server
- Double checkmark: Message delivered to recipient's device
- Double checkmark turns blue: Recipient has read the message
- "Typing..." indicator shows when someone is composing a reply

**Searching Messages:**
- Search within any conversation
- Find specific text, dates, or sender
- Jump directly to search results
- Useful for finding that document someone shared weeks ago

**Notifications:**
- Direct messages: High-priority notification with sound
- Group messages: Medium-priority, customizable
- When mentioned (@yourname): High-priority notification
- Can mute specific conversations if they're too chatty
- Can set quiet hours (no notifications during sleep)

### What You'll Experience

**Example Scenario 1 - Quick Coordination:**
Coach Priya needs to change session timing:
1. Opens Messages app
2. Taps group "Balagruh B Team"
3. Types: "Moving today's yoga session from 4 PM to 5 PM due to equipment delivery"
4. Sends message
5. Within seconds:
   - Coach Arjun sees it (he's online): Double checkmark immediately
   - Coach Lakshmi gets phone notification (she's in another building)
   - In-Charge Ravi gets notification (his app is closed)
6. Arjun replies: "Noted, will inform students"
7. Entire coordination done in under 1 minute

**Example Scenario 2 - Sharing Documents:**
Admin Kumar needs to share a new policy document:
1. Opens Messages, goes to "All Staff" group
2. Taps attachment icon
3. Selects PDF from phone storage (2.5 MB policy document)
4. Adds message: "Updated safety guidelines for review. Please acknowledge once read."
5. Sends - document uploads and delivers to all 25 staff members
6. Over the next hour, double blue checkmarks appear as staff read it
7. Kumar can see who has and hasn't read it yet

**Example Scenario 3 - Image Sharing:**
Coach Meera captures a great moment during sports:
1. Takes photo on phone camera
2. Opens Messages, goes to "Sports Team" group
3. Taps camera icon, selects the just-taken photo
4. Adds caption: "Today's winning team!"
5. Sends - photo appears in group immediately
6. Other coaches react and reply with congratulations

**Example Scenario 4 - Finding Old Information:**
Coach Suresh needs to find training schedule from 2 weeks ago:
1. Opens conversation with Admin Kumar
2. Taps search icon
3. Types "training schedule"
4. See all messages containing those words
5. Taps result from 14 days ago
6. Jumps to that message with attached schedule
7. Downloads document again

### Key Details
- **Message types**: Text, images, videos, documents
- **File size limits**:
  - Images: 25MB each
  - Videos: 100MB each
  - Documents: 25MB each
  - Total per message: 100MB
- **Real-time delivery**: Under 1 second when both users online
- **Offline handling**: Messages queue and send when connection returns
- **Message storage**: Unlimited history (all messages saved)
- **Read receipts**: See when messages are delivered and read
- **Typing indicators**: See when someone is typing a reply
- **Group size**: Up to 50 members per group
- **Search**: Full text search across all conversations
- **Notification control**: Customize per conversation
- **@Mentions**: Type @ to mention someone in group (they get high-priority notification)
- **Works everywhere**: Same conversations on mobile and desktop
- **Security**: All messages encrypted during transmission
- **Development time**: 2 days
- **First available**: Week 3-4 of Sprint 4

---

## **8. WhatsApp Business Integration - Connect With Parents and Guardians**

### What This Feature Does
The system can automatically send WhatsApp messages to parents and guardians for important events like emergencies, daily attendance summaries, and other critical updates. This uses official WhatsApp Business channels, not personal WhatsApp accounts.

### Why This Matters
Parents want to stay informed about their children's wellbeing and activities. WhatsApp is widely used and familiar to most parents. By integrating WhatsApp:
- Parents receive critical emergency notifications immediately
- Daily attendance updates let parents know their child attended
- No need for parents to install a new app or create accounts
- Parents can opt-in or opt-out easily
- Professional communication channel with audit trail
- Complies with WhatsApp Business API policies

### How It Works

**Setup Process:**
1. Organization registers for WhatsApp Business API account (through Twilio or 360Dialog)
2. Gets official verified business number
3. Creates approved message templates for different scenarios
4. Parents' phone numbers linked to student records in ISF system
5. Parents automatically opted-in (with ability to opt-out anytime)

**Message Templates:**

WhatsApp Business requires pre-approved templates for automated messages. Common templates:

**SOS Emergency Alert:**
```
[ISF Playground] ALERT: [Student Name] triggered an emergency alert.
Category: [Medical/Safety/Mental Health].
Our staff has been notified and is responding.
We will update you shortly.
For immediate concerns, call: [Phone Number]
```

**Daily Attendance Confirmation:**
```
[ISF Playground] Attendance Update
[Student Name] was marked PRESENT today at [Time].
Have a great day!
```

**Daily Absence Alert:**
```
[ISF Playground] Attendance Alert
[Student Name] was marked ABSENT today.
If this is unexpected, please contact us at [Phone Number].
```

**Health Incident Notification:**
```
[ISF Playground] Health Update
[Student Name] visited the health center today for [Reason].
Status: [Action Taken].
No immediate concern. Student is doing fine.
```

**Parent Responses:**
Parents can reply to messages:
- "STOP" - Opts out of future messages
- "START" - Opts back in
- Question messages are logged and staff can see them in system

**Delivery Tracking:**
The system tracks:
- Message sent successfully
- Message delivered to parent's phone
- Message read by parent (if read receipts enabled)
- Failed deliveries (invalid number, blocked, etc.)
- All tracked in delivery log

**Opt-Out Management:**
Parents can opt-out:
- Reply "STOP" to any WhatsApp message
- Status updated in ISF system automatically
- No more automated messages sent
- Can opt back in by replying "START"
- Emergency messages always sent regardless (safety override)

### What You'll Experience

**Example Scenario 1 - Emergency Notification:**
Student Arun triggers SOS for medical emergency:
1. Staff respond and assess situation (chest pain)
2. System automatically identifies Arun's parent/guardian contact
3. WhatsApp message sent instantly:
   ```
   [ISF Playground] ALERT: Arun Kumar triggered a medical emergency alert.
   Our staff is with him now. He appears to have chest pain.
   We are monitoring the situation. Will update you within 15 minutes.
   For immediate concerns, call: 080-1234-5678
   ```
4. Parent's phone receives message immediately
5. Delivery status tracked: Sent → Delivered → Read
6. 15 minutes later, follow-up message sent with resolution

**Example Scenario 2 - Daily Attendance:**
Every evening at 6 PM, attendance summaries sent:
1. System processes all attendance records from the day
2. For each student marked present, parent receives:
   ```
   [ISF Playground] Attendance Update
   Priya Sharma was marked PRESENT today at 9:15 AM.
   Have a great evening!
   ```
3. Parents receive confirmation their child attended
4. Creates daily touchpoint with parents
5. If absent, different message alerts parents

**Example Scenario 3 - Parent Opts Out:**
Parent finds messages too frequent:
1. Parent replies "STOP" to any WhatsApp message
2. System receives reply automatically
3. Database updates parent's preference to opted-out
4. No more daily attendance messages sent
5. Emergency messages still sent (safety override)
6. Later, parent replies "START" to opt back in

### Key Details
- **Provider options**: Twilio or 360Dialog (official WhatsApp Business partners)
- **Message types**: Emergency alerts, attendance summaries, health updates
- **Template approval**: All message templates must be pre-approved by WhatsApp
- **Delivery time**: Under 10 seconds typically
- **Rate limits**: Must comply with WhatsApp Business API limits (varies by tier)
- **Opt-out**: Parents can stop messages anytime (reply "STOP")
- **Emergency override**: Critical safety messages always sent
- **Delivery tracking**: Full audit trail (sent, delivered, read, failed)
- **Retry logic**: 3 automatic retry attempts for failed messages
- **Cost**: Per-message charges (check with provider)
- **Languages**: Templates can be created in multiple languages
- **Character limits**: Messages typically under 1024 characters
- **Links**: Can include clickable links (must be pre-approved)
- **Images**: Can send images if template includes media
- **Development time**: 1 day
- **First available**: Week 4 of Sprint 4

---

## **9. Student Health Tracking - Monitor Student Wellbeing**

### What This Feature Does
Staff can record and track student health metrics (weight, height, temperature, blood pressure), log symptoms and incidents, upload medical documents, and view health trends over time. The system alerts staff when metrics indicate potential health concerns.

### Why This Matters
Student health and safety is paramount. Having a centralized health tracking system:
- Creates comprehensive health history for each student
- Helps identify health trends and growth patterns
- Alerts staff immediately to abnormal values (high fever, etc.)
- Links health incidents to SOS emergencies for complete context
- Provides documentation for medical professionals when needed
- Enables early intervention for health issues
- Tracks vaccination status and medical checkup schedules

### How It Works

**Recording Health Metrics:**

**Basic Vitals (Mobile or Desktop):**
1. Staff opens Health Tracking section
2. Selects student from list
3. Taps "New Health Check-In"
4. Enters measurements:
   - Weight (kg)
   - Height (cm)
   - Temperature (°C)
   - Blood Pressure (systolic/diastolic)
   - Heart Rate (beats per minute)
5. Selects any symptoms from checklist
6. Adds notes
7. Saves - automatically timestamped

**Symptom Checklist:**
Common symptoms to select:
- Fever
- Cough
- Headache
- Stomach pain
- Nausea
- Dizziness
- Fatigue
- Skin rash
- Breathing difficulty
- Custom text entry for others

**Incident Recording:**
For injuries or illness episodes:
1. Taps "Log Incident"
2. Describes what happened
3. Takes photos if relevant (injuries, rashes, etc.)
4. Records action taken (first aid, medication given, sent to hospital)
5. Notes follow-up required
6. Saves with timestamp
7. Can link to SOS alert if emergency was triggered

**Uploading Medical Documents:**
1. Taps "Upload Document"
2. Selects file type (Medical report, Prescription, Lab results, X-ray/scan)
3. Chooses file from phone or takes photo of physical document
4. Adds description
5. Uploads (up to 10MB per document)
6. Document stored securely in student's health record

**Viewing Health History:**
- Timeline view of all health check-ins
- Filter by date range
- Filter by metric type
- View trends with charts and graphs
- Compare current values to past measurements
- Export health report as PDF

**Automatic Alerts:**

The system monitors entries and generates alerts for concerning values:

**Temperature Alerts:**
- 37.5°C - 39°C: Yellow warning notification
- Above 39°C: Red critical alert with sound
- Alert sent to student's assigned coaches and medical staff

**Weight Change Alerts:**
- Weight gain/loss >5% in 30 days: Yellow warning
- Weight gain/loss >10% in 30 days: Red alert
- Suggests growth issue or health concern

**Blood Pressure Alerts:**
- Outside normal range for age: Yellow warning
- Significantly abnormal: Red alert
- Recommendations to check with medical professional

**Heart Rate Alerts:**
- Too high or too low for rest state: Warning
- Critical values: Alert with recommendation for immediate check

**SOS Correlation:**
When a student triggers an SOS:
- Any recent health check-ins automatically linked
- Staff responding can see health history immediately
- Helps inform emergency response
- Creates complete incident record

### What You'll Experience

**Example Scenario 1 - Regular Health Check:**
Coach Meera conducts weekly health screening:
1. Opens Health Tracking on her phone
2. Selects student "Arun Kumar"
3. Taps "New Health Check-In"
4. Takes measurements:
   - Weight: 52 kg (up from 51 kg last week - good)
   - Height: 168 cm (same as last month)
   - Temperature: 36.8°C (normal)
5. No symptoms selected
6. Saves - takes 1 minute per student
7. Repeats for all 20 students in her Balagruh

**Example Scenario 2 - High Fever Alert:**
Student Priya comes to health center feeling unwell:
1. Medical staff opens Health Tracking
2. Selects Priya, taps "New Health Check-In"
3. Takes temperature: 38.9°C
4. System immediately shows yellow warning: "Temperature elevated"
5. Selects symptoms: Fever, Headache, Fatigue
6. Adds notes: "Gave paracetamol 500mg, advised rest"
7. Saves check-in
8. Yellow notification sent to Priya's coaches
9. Staff monitors - if temperature goes higher, will escalate

**Example Scenario 3 - Incident with Photo:**
Student Ravi falls during sports and injures knee:
1. Coach Suresh logs incident immediately
2. Taps "Log Incident"
3. Describes: "Fell during football, scraped knee"
4. Takes photo of injury with phone camera
5. Records action: "Cleaned wound, applied antiseptic, bandage"
6. Marks follow-up required: "Check tomorrow"
7. Parents automatically notified (if WhatsApp enabled)
8. Complete incident record saved with timestamp and photo

**Example Scenario 4 - Health Trends Analysis:**
Admin reviews health trends monthly:
1. Opens Health Tracking dashboard
2. Views aggregate statistics for all students
3. Sees charts showing:
   - Average weight gain (positive trend)
   - Average height increase (normal growth)
   - Number of fever incidents (tracking seasonal illness)
4. Identifies 2 students with concerning weight loss
5. Flags for follow-up with their coaches
6. Exports PDF report for monthly review meeting

**Example Scenario 5 - SOS with Health Context:**
Student Arun triggers SOS for chest pain:
1. Coaches receive SOS alert on phones
2. Coach Rajesh taps alert, sees Arun's info
3. System automatically shows recent health check-ins:
   - Yesterday: Temperature 38.5°C (elevated)
   - Last week: Symptoms "Fatigue, Headache"
4. Rajesh sees pattern, suspects illness not cardiac
5. Brings medical kit instead of emergency defibrillator
6. Health history helps inform appropriate response

### Key Details
- **Metrics tracked**: Weight, height, temperature, blood pressure, heart rate
- **Symptoms**: Pre-defined checklist + custom text entry
- **Photo uploads**: Capture injuries, rashes, or physical documents
- **Document storage**: Up to 10MB per file (PDFs, images)
- **Alert thresholds**:
  - Temperature >37.5°C: Warning
  - Temperature >39°C: Critical alert
  - Weight change >5% in 30 days: Warning
  - Blood pressure outside age-normal range: Warning
- **Chart visualization**: Line charts for trends, scatter plots for measurements
- **Date filtering**: View specific time periods
- **Export format**: PDF health reports for external medical professionals
- **SOS linking**: Automatic correlation when emergencies occur
- **Privacy**: Only medical staff and assigned coaches can view health data
- **Retention**: All health data retained indefinitely for medical history
- **Task Management Integration**: Critical medical alerts auto-create monitoring tasks (Sprint 1 integration)
  - Temperature ≥39°C triggers task: "Monitor student [Name] - High fever follow-up"
  - Assigned to: Medical In-charge + Balagruha In-charge
  - Deadline: Check again in 4 hours
  - Task includes link to health check-in record
  - Mobile task notifications sent (see Notification #16-22)
- **Development time**: 2 days
- **First available**: Week 4 of Sprint 4

### Student Emotion Check-In System

#### What This Feature Does
Students can check in their emotional state at any time using a simple 5-emoji interface on their desktop. This early-warning system helps staff identify students who may need emotional support before situations escalate.

#### Why This Matters
Student well-being extends beyond physical health. Emotional check-ins provide:
- **Early intervention**: Identify students in distress before problems worsen
- **Privacy**: Simple, non-confrontational way for students to express feelings
- **Pattern detection**: Track emotional trends over time
- **Support coordination**: Alert appropriate staff to provide timely help
- **Student empowerment**: Gives students a voice and control over seeking help

#### The 5 Emotion Emojis

**Students see these options:**
1. 😊 **Happy** - Feeling good, positive mood
2. 😢 **Sad** - Feeling down, upset, or disappointed
3. 😠 **Angry** - Feeling frustrated, irritated, or mad
4. 😟 **Worried** - Feeling anxious, stressed, or concerned
5. 😐 **Neutral** - Feeling okay, nothing special, just normal

Students simply click the emoji that matches how they're feeling. The process takes 3 seconds.

#### When Students Can Check In
- **At login**: Optional prompt when logging into desktop
- **Anytime during session**: Emotion button always visible in sidebar
- **No pressure**: Students can skip or dismiss the prompt
- **Multiple times per day**: Can update emotion if it changes

#### What Happens Based on Selection

**For Happy 😊 or Neutral 😐:**
- Student sees confirmation: "Thanks for checking in! Keep up the good spirit!"
- Emotion recorded in student's profile
- No alerts sent to staff
- Logs used for positive trend tracking only

**For Sad 😢, Angry 😠, or Worried 😟:**
- **Student sees**: "Thanks for letting us know. A coach will check in with you soon."
- **Immediate notifications sent to:**
  - Student's assigned **Coach** (mobile push notification - HIGH priority)
  - **Balagruha In-charge** (mobile push notification - HIGH priority)
  - **Admin** (mobile push notification - HIGH priority)
  - **Amma** (mobile push notification for multiple concerning check-ins)

**Notification Example for Staff:**
```
🚨 Student Emotion Alert
Student Ravi logged "Sad 😢" emotion
Time: 10:45 AM | Location: Computer Lab

[VIEW STUDENT PROFILE] [SEND MESSAGE] [MARK AS FOLLOWED UP]
```

Staff can:
- View student's emotion history
- Send a message to the student
- Go find the student for in-person check-in
- Mark when they've followed up

#### Privacy and Transparency

**Privacy Protections:**
- Only staff can view emotion logs - students cannot see others' emotions
- Student identity is shown only to their assigned staff
- Emotion history is confidential and not shared publicly
- No negative consequences for expressing negative emotions

**Student Transparency:**
- Students are informed that selecting Sad/Angry/Worried will notify their coach
- Message clearly states: "A coach will check in with you"
- Students understand this is for their support, not punishment
- Students can see their own emotion history in their profile

#### Escalation Logic

**Single Concerning Check-In:**
- Notification to Coach, Balagruha In-charge, Admin

**Multiple Concerning Check-Ins (3+ negative emotions in 7 days):**
- Additional notification to **Amma** (senior leadership)
- Flags for counseling discussion
- Pattern highlighted in weekly well-being reports

**Extreme Urgency (Student selects Angry 😠 multiple times in one day):**
- Escalated notifications
- Automatic task created for Coach to follow up within 2 hours
- Requires resolution notes from staff

#### Staff Response Workflow

**When Staff Receives Notification:**
1. **Acknowledge** - Tap button to confirm they saw the alert
2. **Assess** - Review student's recent emotion history and any incidents
3. **Respond** - Choose appropriate action:
   - Send supportive message via internal messaging
   - Go find student for in-person conversation
   - Coordinate with Balagruha In-charge for support
   - Refer to counseling if needed
4. **Document** - Mark alert as "Followed Up" and add notes about what was done
5. **Monitor** - Track if student's emotions improve over next few days

**Example Scenario:**
Coach Meera receives notification at 11:00 AM:
- Student Priya logged "Worried 😟" emotion
- Meera checks Priya's profile: Yesterday also logged "Worried"
- Meera sends message: "Hi Priya, noticed you're feeling worried. Want to talk after lunch?"
- Priya responds: "Yes, I'm stressed about tomorrow's test"
- Meera: "Let's review together at 2 PM. You'll do great!"
- Meera marks notification as followed up, adds note: "Test anxiety - provided study support"
- Next day, Priya logs "Happy 😊" - intervention successful!

#### Integration with Other Systems

**Links to Health Tracking:**
- If student has recent health check-ins showing fever/illness, emotion alert includes this context
- Staff can see physical health alongside emotional state

**Links to SOS System:**
- If student triggers SOS, their recent emotion check-ins automatically shown to responders
- Helps staff understand if emergency is related to ongoing emotional distress

**Links to Task Management:**
- Staff can create follow-up tasks: "Check in with Ravi tomorrow about anxiety"
- Tasks ensure emotional support isn't forgotten in busy schedules

**Appears in Reports:**
- Weekly well-being reports show emotion trends across all students
- Admins can identify if multiple students are stressed (exam season, etc.)
- Helps plan interventions at Balagruha or system level

#### Key Details
- **Available to**: All students on desktop application
- **Notification recipients**: Coach, Balagruha In-charge, Admin (for Sad/Angry/Worried)
- **Notification priority**: HIGH (urgent attention needed)
- **Notification categories**: #69 (Sad), #70 (Angry), #71 (Worried) - see Section 14
- **Response time target**: Staff acknowledge within 30 minutes, follow up within 2 hours
- **Privacy**: Strict confidentiality - only student's assigned staff can view
- **Frequency**: Students can check in unlimited times per day
- **Data retention**: Emotion logs kept for 90 days for trend analysis
- **Reporting**: Weekly emotion summary reports for Admins and Amma
- **Development time**: 1 day
- **First available**: Week 3 of Sprint 4

---

## **9.5. Integration with ISF Shop Module (Completed in Sprint 5)**

> **✅ IMPLEMENTATION STATUS: COMPLETED IN SPRINT 5**
> The ISF Shop Module is fully implemented and deployed. This section documents how Sprint 3-4 features integrate with the existing Shop system.

### System Overview

The ISF Shop is a virtual rewards store where students spend ISF Coins earned through learning activities (Sprint 2 LMS). The complete system includes three user workflows:
- **Students** browse and purchase items on desktop
- **Coaches** deliver physical items via mobile app
- **Purchase Managers** procure inventory via desktop/web portal

**For detailed Shop Module documentation, see Sprint 2-5 Combined MPSD.**

---

### Sprint 3-4 Integration Points

The following Sprint 3-4 features integrate with the existing ISF Shop Module:

#### **1. Mobile App Integration (Sprint 3)**

**Coach Delivery Management:**
- Coaches receive shop order delivery tasks on their mobile app
- Mobile delivery dashboard shows pending orders
- Simple "Mark as Delivered" workflow with notes
- Push notifications when new orders ready for delivery

**Access:** Available to all 8 staff roles with mobile app access, primary use by Coaches.

---

#### **2. Notification System Integration (Sprint 4)**

**18 New Shop-Related Notification Categories:**

The Sprint 4 notification system includes 18 shop/purchase notification categories to support the complete Shop workflow:

**For Students (Desktop Notifications):**
- #58: `shop_order_approved` - Order approved and being prepared (MEDIUM priority)
- #59: `shop_order_rejected` - Order rejected due to insufficient stock (HIGH priority)
- #60: `order_ready_for_delivery` - Order ready, will be delivered soon (MEDIUM priority)
- #61: `wishlist_item_restocked` - Wishlist item now available (MEDIUM priority)
- #62: `insufficient_coins_for_purchase` - Not enough coins for purchase attempt (MEDIUM priority)
- #7: `shop_order_delivered` - Your order has been delivered (MEDIUM priority)

**For Coaches (Mobile Push Notifications):**
- #63: `new_order_pending_delivery` - New shop order assigned for delivery (HIGH priority)
- #64: `multiple_orders_ready_batch` - 3+ orders pending (batch notification) (HIGH priority)
- #65: `delivery_completed_successfully` - Confirmation after marking delivery (LOW priority)

**For Purchase Manager (Desktop/Email Notifications):**
- #40: `low_stock_alert` - Stock below threshold (HIGH priority)
- #41: `out_of_stock_alert` - Product completely out of stock (URGENT priority)
- #36: `purchase_request_approved` - Request approved by admin (HIGH priority)
- #37: `purchase_request_rejected` - Request rejected with reason (HIGH priority)

**For Admin (Desktop/Mobile Notifications):**
- #35: `purchase_request_submitted` - New purchase request needs review (MEDIUM priority)
- #66: `stock_updated_successfully` - Inventory updated after delivery (MEDIUM priority)
- #67: `purchase_request_cancelled` - Request cancelled (MEDIUM priority)

---

#### **3. Task Management Integration (Sprint 1)**

The Shop Module automatically creates tasks using the Sprint 1 Task Management system:

**Shop Order Delivery Tasks:**
```
When student completes checkout:
→ Auto-create task: "Deliver shop order [ORDER_ID] to [STUDENT_NAME]"
→ Assigned to: Student's assigned Coach
→ Deadline: 24-48 hours
→ Priority: MEDIUM
→ Mobile notification sent to Coach (#73: Task assigned mobile)
```

**Low Stock Monitoring Tasks:**
```
When product stock falls below threshold:
→ Auto-create task: "Replenish low stock - [PRODUCT_NAME]"
→ Assigned to: Purchase Manager
→ Deadline: 7 days
→ Priority: HIGH
```

All shop-related tasks are accessible via the mobile app task list for the 8 roles with mobile access.

---

### Key System Features (Already Implemented)

**Student Shopping (Desktop):**
- Browse products with filters, search, sorting
- Shopping cart with ISF Coin balance validation
- Atomic checkout (coins + inventory updated together)
- Order history and wishlist

**Coach Delivery (Mobile):**
- Mobile delivery dashboard with pending/completed tabs
- Push notifications for new orders
- Quick delivery confirmation workflow

**Purchase Manager Procurement (Desktop/Web):**
- Multi-product purchase request creation
- File attachments (invoices, quotes - max 5 files)
- Admin approval workflow with self-approval prevention
- Atomic stock updates using MongoDB transactions

**Admin Management:**
- Product CRUD operations
- Purchase request approvals
- Inventory analytics and reports
- Stock threshold configuration



This section completes the documentation of Sprint 3-4 integration points with the ISF Shop Module (already completed in Sprint 5).

**For complete Shop Module implementation details**, including detailed workflows, database schemas, API specifications, and Purchase Manager Stories 17-18-19, please refer to **Sprint 2-5 Combined MPSD** documentation.

---

## **PART 3: INFRASTRUCTURE (BEHIND THE SCENES)**

---

## **10. WebSocket Real-Time Communication - The Instant Connection Layer**

### What This Feature Does
This is the invisible technical foundation that makes messages, notifications, and SOS alerts appear instantly on everyone's screens without anyone having to refresh or click anything. It's a persistent, always-open communication channel between the mobile apps/desktops and the server.

### Why This Matters
Imagine if staff had to click "check for messages" every few seconds to see new messages. Or if emergency alerts took minutes to appear because the app only checked occasionally. Real-time communication means:
- Messages appear instantly (under 1 second)
- SOS alerts reach staff in under 5 seconds
- Typing indicators show immediately
- Online/offline status updates automatically
- No delays, no waiting, no manual refreshing
- Works like modern chat apps (WhatsApp, Teams, Slack)

### How It Works

**The Always-Connected Channel:**
Think of WebSocket like a phone call that stays connected:
- Traditional web: Like sending letters back and forth (slow)
- WebSocket: Like having an open phone line (instant)

When staff opens the mobile app or desktop:
1. App connects to server and says "I'm here, keep this line open"
2. Connection stays active as long as app is open
3. Server can instantly push messages down this line
4. App can instantly send messages up this line
5. If connection drops (weak signal), app automatically reconnects

**Rooms and Channels:**
The system organizes communications into rooms:

**Personal Room:**
- Each staff member has their own room
- Only they receive messages sent to their room
- Used for direct messages and personal notifications

**Balagruh Rooms:**
- Each Balagruh has a room
- All coaches and in-charges in that Balagruh are members
- Used for Balagruh-specific alerts (like SOS from students in that Balagruh)

**Group Conversation Rooms:**
- Each group chat has a room
- Only group members receive messages
- Used for team communication

**Role Rooms:**
- All Admins in one room
- All Coaches in another room
- Used for role-based broadcasts

**Presence Tracking:**
System tracks who's online:
- When staff opens app: Status changes to "online"
- When app closes or connection drops: Status changes to "offline"
- Heartbeat check every 30 seconds (app says "I'm still here")
- If no heartbeat for 60 seconds: Marked as disconnected
- Shows green dot next to online staff in messaging

**Offline Message Queuing:**
When staff is offline:
1. Messages sent to them are saved in database
2. Marked as "pending delivery"
3. When they come back online and reconnect
4. All queued messages delivered automatically
5. Nothing gets lost

**Automatic Reconnection:**
If connection drops (poor signal, phone switched networks):
1. App detects disconnection within 5 seconds
2. Automatically attempts to reconnect
3. Tries immediately, then waits 2 seconds, then 4 seconds, then 8 seconds (exponential backoff)
4. When reconnected, synchronizes any missed messages
5. User doesn't need to do anything

### What You'll Experience

**Staff won't see this feature directly - it works invisibly behind the scenes. But they'll experience its benefits:**

**Example 1 - Instant Messaging:**
- Coach A types message and hits send
- Coach B (in another building) sees message appear instantly on their screen
- Under 1 second from send to display
- Feels like real-time conversation

**Example 2 - SOS Emergency:**
- Student clicks SOS button on desktop
- Within 2-5 seconds, every Tier 1 coach's phone lights up simultaneously
- All receive alert at same time
- No delays or waiting

**Example 3 - Typing Indicators:**
- Coach A starts typing in conversation
- Coach B immediately sees "Coach A is typing..." below conversation
- When Coach A stops typing, indicator disappears
- Creates natural conversation flow

**Example 4 - Poor Connection Recovery:**
- Coach on mobile app walks into area with weak signal
- Connection drops
- App shows "Reconnecting..." at top
- When signal improves, app reconnects automatically
- Any messages sent while disconnected appear immediately
- No data lost

**Example 5 - Offline to Online:**
- Coach's phone battery dies during the day
- 5 messages sent to her while phone is off
- She charges phone and opens app
- All 5 messages appear as soon as app connects
- Catches up on everything she missed

### Key Details
- **Connection type**: WebSocket (bidirectional, persistent)
- **Fallback**: If WebSocket fails, uses polling (checks every 3 seconds)
- **Authentication**: Secure connection with login token
- **Encryption**: All data encrypted during transmission
- **Latency**: Under 1 second for message delivery when online
- **SOS priority**: Guaranteed delivery under 5 seconds
- **Heartbeat**: Checks connection health every 30 seconds
- **Auto-reconnect**: Exponential backoff (2s, 4s, 8s, 16s up to 30s)
- **Message queue**: Unlimited storage for offline messages
- **Presence tracking**: Real-time online/offline status
- **Rooms**: Personal, Balagruh, conversation, and role-based channels
- **Scalability**: Supports thousands of concurrent connections
- **Battery optimization**: Efficient protocol, minimal battery drain
- **Works on**: Mobile apps (iOS, Android) and desktop web browsers
- **Development time**: 5 days
- **First available**: Week 1 of Sprint 3 (foundation for all other features)

---

## **11. AWS S3 Cloud Storage - Secure Media and Document Storage**

### What This Feature Does
All photos, videos, documents, and files uploaded in the system are stored securely in cloud storage (Amazon S3). The system handles automatic compression, thumbnail generation, organization into folders, and fast delivery through content delivery networks.

### Why This Matters
With hundreds of students and staff uploading attendance photos, course videos, health documents, and message attachments daily:
- Local server storage would fill up quickly
- File delivery would be slow from a single server
- No automatic backups or redundancy
- Difficult to scale as usage grows

Cloud storage provides:
- Virtually unlimited storage capacity
- Automatic backups and data redundancy
- Fast file delivery from edge locations worldwide
- Automatic image optimization to save bandwidth
- Organized folder structure for easy management
- Secure access control (only authorized users can access)

### How It Works

**When Staff Uploads a File:**

**From Mobile App:**
1. Staff selects file to upload (photo, video, document)
2. App requests a secure upload link from server
3. Server generates a special temporary link (valid for 5 minutes)
4. File uploads directly from phone to cloud storage (doesn't go through ISF server)
5. Progress bar shows upload percentage
6. When complete, app tells server "upload finished"
7. Server creates database record linking file to student/course/message

**Automatic Image Processing:**
When images are uploaded:
1. Original image uploaded to cloud
2. System automatically creates optimized version:
   - Resizes if larger than 1920x1080 pixels
   - Compresses to reduce file size (85% quality)
   - Converts to efficient format
3. Creates thumbnails (small preview images):
   - 400x400 pixels for galleries
   - 200x200 pixels for list views
4. All versions stored in organized folders

**Folder Organization:**
Files are automatically organized by type:
```
/attendance-photos/
  2025/
    01/
      day-01/
        photo-timestamp.jpg
        photo-timestamp-thumbnail.jpg

/course-content/
  course-id/
    module-id/
      video-timestamp.mp4
      document-timestamp.pdf

/health-documents/
  student-id/
    medical-reports/
      report-timestamp.pdf
    prescriptions/
      prescription-timestamp.jpg

/messaging-attachments/
  conversation-id/
    image-timestamp.jpg
    document-timestamp.pdf
```

**Fast Delivery with CDN:**
- Files distributed to edge locations worldwide
- When staff views a photo, it loads from nearest location
- Much faster than loading from single central server
- Reduces load time from seconds to milliseconds

**Secure Access:**
- Files are private by default
- Requires authentication to access
- Special secure URLs generated for each view request
- URLs expire after use (can't be shared or reused)
- Only authorized staff can access student files

**Backup and Retention:**
- All files automatically backed up
- Multiple copies stored in different locations
- 30-day version history (can recover deleted files)
- Automatic disaster recovery

### What You'll Experience

**Staff Experience (Mostly Invisible):**

**Example 1 - Uploading Attendance Photo:**
1. Coach takes attendance photo on phone
2. Taps upload
3. Progress bar shows: "Uploading... 23%"
4. Completes in 5-10 seconds
5. Photo appears in attendance record immediately
6. Behind the scenes: Original + optimized + thumbnail all stored in cloud

**Example 2 - Uploading Large Training Video:**
1. Coach selects 200MB yoga training video
2. Starts upload
3. Progress shows: "Uploading... 150MB of 200MB"
4. Upload continues even if coach closes app
5. Notification appears: "Upload complete" after 3-4 minutes
6. Video ready for students to stream
7. Behind the scenes: Video stored, optimized for streaming, thumbnails generated

**Example 3 - Viewing Health Document:**
1. Staff opens student health record
2. Sees list of uploaded documents
3. Taps "Medical Report - Jan 15"
4. Document loads instantly (under 1 second)
5. Can zoom, scroll through pages
6. Behind the scenes: Secure URL generated, file served from nearest edge location

**Example 4 - Message Attachment:**
1. Coach A sends photo in group message
2. 10 group members receive message
3. Each person taps to view photo
4. Photo loads instantly for everyone
5. No delays even with multiple simultaneous viewers
6. Behind the scenes: CDN serves copies to all 10 people from edge locations

**Admin Experience:**

**Storage Dashboard:**
- View total storage used
- See breakdown by category (attendance, courses, health, messaging)
- Monitor upload trends over time
- Identify large files consuming space
- Set up alerts for storage thresholds

**Cost Management:**
- Monitor storage costs
- Set usage limits if needed
- Automatic cleanup of old files based on retention policies

### Key Details
- **Storage provider**: Amazon S3 (industry-standard cloud storage)
- **Capacity**: Virtually unlimited (scales automatically)
- **Upload method**: Direct upload from mobile/desktop to cloud (fast)
- **Security**: Private storage with authenticated access only
- **Encryption**: Files encrypted at rest and in transit
- **Backup**: Automatic with 99.999999999% durability guarantee
- **CDN**: CloudFront for fast global delivery
- **Image optimization**: Automatic compression and resizing
- **Thumbnail generation**: Automatic for all images
- **Folder structure**: Organized by type, date, and entity
- **Access control**: Role-based permissions
- **Retention policy**: 30-day version history
- **File size limits**:
  - Images: 25MB
  - Videos: 500MB
  - Documents: 50MB
- **Supported formats**:
  - Images: JPG, PNG, HEIC
  - Videos: MP4, MOV
  - Documents: PDF, DOC, DOCX, XLS, XLSX
- **Secure URLs**: Temporary access links that expire
- **Upload speed**: Depends on internet connection (WiFi recommended for large files)
- **Development time**: 5 days (setup and integration)
- **First available**: Week 1 of Sprint 3 (foundation for media features)

---

## **PART 4: NOTIFICATION SYSTEM (COMPREHENSIVE)**

---

## **12. Notification System Overview**

### **What is the Notification System?**

The notification system is how ISF Playground keeps everyone informed about important events and activities. When something happens that you need to know about, you'll receive a notification on your device.

**How You'll Receive Notifications:**
- **Mobile App:** Notifications appear on your phone screen
- **Notification Bell:** See unread notifications in the app with a badge count
- **SMS:** For critical emergencies (SOS alerts)
- **WhatsApp:** (Optional - pending your decision) For select critical alerts

**Why This Matters:**
- Never miss important events (tasks assigned, emergency alerts, messages)
- Respond quickly to emergencies
- Stay informed about student activities and progress
- Communicate efficiently with other staff

---

## **13. Types of Notifications**

There are three types of notifications in the system:

### **13.1. Personal Notifications**

**What They Are:** Notifications sent just to you

**Examples:**
- "New task assigned to you: Complete Art Project Submission"
- "Your shop order has been delivered"
- "Student Ravi's temperature is 103°F - Immediate attention required"

**Who Receives:** Single specific user

---

### **13.2. Common Notifications**

**What They Are:** Notifications sent to a group of people (like all students, or all coaches in one Balagruha)

**Examples:**
- "New shop items available!" (sent to all students)
- "Student Priya triggered SOS alert" (sent to all coaches in Balagruha A)
- "New course published: Advanced Mathematics" (sent to all coaches)

**Who Receives:** All users in a specific role or group

---

### **13.3. System-Wide Notifications**

**What They Are:** Important announcements sent to everyone

**Examples:**
- "System maintenance tonight from 11 PM to 2 AM"
- "Happy Diwali! ISF Playground will be closed tomorrow"
- "New feature launched: Mobile app now available"

**Who Receives:** All users in the system

---

## **14. Complete Notification Catalog**

Below is the complete list of all **75 notification categories** in the ISF Playground system. Each notification serves a specific purpose and is sent to specific people at the right time.

### **Priority Levels Explained:**

| Priority | What It Means | Example |
|----------|---------------|---------|
| **URGENT** | Life-threatening or critical emergency. Loud alarm, cannot be ignored. | Student triggered SOS, Critical medical alert |
| **HIGH** | Important and time-sensitive. Needs attention soon. | Task assigned, Training session starting soon |
| **MEDIUM** | Standard notification. Good to know but not urgent. | Coins earned, Shop order delivered |
| **LOW** | Informational only. No immediate action needed. | Attendance marked, General announcements |

---

### **Complete Notification List (75 Categories)**

| # | Notification Name | Description | Who Receives It | When It Triggers | Priority | Access Method |
|---|-------------------|-------------|-----------------|------------------|----------|---------------|
| **EXISTING NOTIFICATIONS (Sprint 1 & 5 - Already Working)** |
| 1 | Student work featured on Wall of Fame | Your creative work was selected for the WTF board! | Student | When admin pins student's work to WTF | MEDIUM | Desktop |
| 2 | ISF Coins awarded | You earned ISF coins for completing a task or achievement | Student | When coins are credited to wallet | MEDIUM | Desktop |
| 3 | Achievement unlocked | You unlocked a new badge or milestone | Student | When student reaches achievement criteria | HIGH | Desktop |
| 4 | Coach message | Direct message from your coach | Student | When coach sends personal message | HIGH | Desktop |
| 5 | Shop update | New products available or shop announcement | Students, Coaches, Purchase Manager | New products added or shop changes | MEDIUM | Desktop / Mobile |
| 6 | System announcement | Important system-wide message | All users | Admin sends important announcement | HIGH | Desktop / Mobile |
| 7 | Shop order delivered | Your shop order has been delivered | Student | Coach marks order as delivered | MEDIUM | Desktop |
| **MEDICAL NOTIFICATIONS (Sprint 4 - High Priority)** |
| 8 | Critical medical alert | Student has very high temperature (≥102°F) - Immediate attention! | Medical In-charge, Balagruha In-charge, Admin, Amma | Student temperature ≥102°F during check-in | URGENT | Mobile App |
| 9 | Medical warning alert | Student has elevated temperature (100-102°F) - Monitor closely | Medical In-charge, Balagruha In-charge | Student temperature 100-102°F | HIGH | Mobile App |
| 10 | Daily medical check-in reminder | Reminder to complete daily health check-ins | Medical In-charge | Daily at 6 PM if check-ins not completed | MEDIUM | Mobile App |
| 11 | Medical check-in completed | Daily health check-in recorded for students | Balagruha In-charge | After medical check-ins completed | LOW | Mobile App |
| 12 | Medical record updated | Medical history or prescription added for student | Medical In-charge, Balagruha In-charge | New medical record entry added | MEDIUM | Mobile App |
| 13 | Vaccination due | Student vaccination due soon or today | Medical In-charge, Student | 7 days before, 3 days before, or TODAY | HIGH | Mobile / Desktop |
| 14 | Prescription added | New prescription uploaded to student's medical file | Medical In-charge | Doctor adds new prescription | MEDIUM | Mobile App |
| 15 | Medical case status changed | Medical case status updated (active/resolved) | Medical In-charge, Balagruha In-charge | Medical case status changes | MEDIUM | Mobile App |
| **TASK MANAGEMENT NOTIFICATIONS (Sprint 4)** |
| 16 | Task assigned | New task assigned to you | Student, Staff (assignee) | When task is created and assigned | HIGH | Desktop / Mobile |
| 17 | Task deadline approaching | Task due soon - don't forget! | Task assignee | 24 hours before deadline, then 1 hour before | HIGH | Desktop / Mobile |
| 18 | Task overdue | Task is past its deadline | Task assignee, Task creator | When deadline passes | HIGH | Desktop / Mobile |
| 19 | Task completed | Task has been marked as completed | Task creator (Coach, Admin) | When assignee completes task | MEDIUM | Desktop / Mobile |
| 20 | Comment added to task | New comment on your task | Task participants | When someone comments on task | MEDIUM | Desktop / Mobile |
| 21 | Task status changed | Task status updated | Task assignee, Task creator | When task status changes | MEDIUM | Desktop / Mobile |
| 22 | Task details updated | Task information has been modified | Task assignee | When task creator updates details | LOW | Desktop / Mobile |
| **TRAINING SESSION NOTIFICATIONS (Sprint 4)** |
| 23 | Training session assigned | You've been assigned to a training session | Student | When coach assigns student to session | MEDIUM | Desktop |
| 24 | Session starting soon | Training session reminder | Student, Coach | 1 hour before session, then 30 minutes before | HIGH | Desktop / Mobile |
| 25 | Session cancelled | Training session has been cancelled or rescheduled | Student | When coach cancels session | HIGH | Desktop / Mobile |
| 26 | Session attendance marked | Attendance recorded for training session | Coach | After session attendance is taken | LOW | Mobile App |
| **COURSE & LEARNING NOTIFICATIONS (Sprint 4)** |
| 27 | New course assigned | New course assigned to you | Student | When coach assigns course to student | MEDIUM | Desktop |
| 28 | Student enrolled in course | Student has enrolled in your course | Coach, Admin | When student enrolls | LOW | Mobile / Desktop |
| 29 | Course completed | You completed a course - coins awarded! | Student, Coach | When student completes all modules | HIGH | Desktop / Mobile |
| 30 | New module unlocked | New course content available | Student | When student progresses to next module | MEDIUM | Desktop |
| 31 | Quiz results available | Your quiz has been graded | Student | When coach grades quiz | MEDIUM | Desktop |
| **ATTENDANCE NOTIFICATIONS (Sprint 4)** |
| 32 | Attendance marked | Your attendance has been recorded | Student, Balagruha In-charge | When attendance is taken | LOW | Desktop / Mobile |
| 33 | Student absent | Student marked absent today | Balagruha In-charge, Admin | When student marked absent | HIGH | Mobile App |
| 34 | Daily attendance summary | Summary of today's attendance | Balagruha In-charge, Admin | End of each day | LOW | Mobile App |
| **PURCHASE & INVENTORY NOTIFICATIONS (Sprint 4)** |
| 35 | Purchase request submitted | New purchase request needs review | Admin, Amma (for approval) | When purchase request created | MEDIUM | Desktop / Mobile |
| 36 | Purchase request approved | Your purchase request has been approved | Purchase Manager (requester) | When request approved | HIGH | Desktop / Email |
| 37 | Purchase request rejected | Your purchase request was not approved | Purchase Manager (requester) | When request rejected | HIGH | Desktop / Email |
| 38 | Purchase order assigned | Purchase order assigned to you | Purchase Manager | When purchase order created | MEDIUM | Desktop / Email |
| 39 | Purchase order completed | Purchase order has been fulfilled | Purchase Manager, Admin | When order completed | MEDIUM | Desktop / Mobile |
| 40 | Low stock alert | Product stock is running low | Purchase Manager, Admin | Stock below low threshold (e.g., 10 units) | HIGH | Desktop / Email |
| 41 | Out of stock alert | Product is completely out of stock | Purchase Manager, Admin | Stock reaches zero | URGENT | Desktop / Email |
| **REPAIR & MAINTENANCE NOTIFICATIONS (Sprint 4)** |
| 42 | Repair request submitted | New repair request created | Admin, Balagruha In-charge | When repair request submitted | MEDIUM | Desktop / Mobile |
| 43 | Repair in progress | Repair work has started | Requester | When repair status updated to in-progress | MEDIUM | Desktop / Mobile |
| 44 | Repair completed | Repair work has been completed | Requester, Admin | When repair marked as completed | MEDIUM | Desktop / Mobile |
| **SHOP & COINS NOTIFICATIONS (Sprint 4)** |
| 45 | Shop order placed | Order confirmation | Student | When student completes shop purchase | MEDIUM | Desktop |
| 46 | Product back in stock | Item you wanted is available again | Student | When out-of-stock product restocked | MEDIUM | Desktop |
| 47 | Coins deducted | Coins spent on purchase | Student | When coins used for shopping | LOW | Desktop |
| **WALL OF FAME ENHANCEMENTS (Sprint 4)** |
| 48 | WTF submission approved | Your submission was approved for WTF | Student | When admin approves submission | MEDIUM | Desktop |
| 49 | WTF interaction | Someone liked your WTF content | Student | When another user engages with post | LOW | Desktop |
| **EMERGENCY SOS NOTIFICATIONS (Sprint 4 - Critical)** |
| 50 | SOS emergency triggered | Student triggered emergency alert! | Coach, Balagruha In-charge, Admin (escalates) | When student presses SOS button | URGENT | Mobile App |
| 51 | SOS escalated | SOS alert escalated to higher tier - no response yet | Admin, Amma, All staff (depending on tier) | 2 minutes (Tier 2) or 5 minutes (Tier 3) after trigger | URGENT | Mobile App |
| 52 | SOS resolved | Emergency has been resolved | All who received original SOS | When staff marks SOS as resolved | MEDIUM | Mobile App |
| **MESSAGING NOTIFICATIONS (Sprint 4)** |
| 53 | New direct message | New message from another staff member | Message recipient | When message sent in 1-on-1 conversation | HIGH | Mobile App |
| 54 | New group message | New message in group conversation | Group members | When message sent in group chat | MEDIUM | Mobile App |
| 55 | You were mentioned | Someone mentioned you in a message | Mentioned user | When @username used in message | HIGH | Mobile App |
| **OTHER NOTIFICATIONS** |
| 56 | Community update | General community news or updates | All users | When community announcement posted | LOW | Desktop / Mobile |
| 57 | General notification | Miscellaneous notifications | Varies | Various system events | LOW | Desktop / Mobile |
| **NEW SHOP/PURCHASE NOTIFICATIONS (Sprint 5 - Detailed Workflows)** |
| 58 | Shop order approved | Your shop order has been approved and is being prepared | Student | When admin/coach approves student order | MEDIUM | Desktop |
| 59 | Shop order rejected | Your shop order was rejected - insufficient stock or other reason | Student, Coach | When order cannot be fulfilled | HIGH | Desktop / Mobile |
| 60 | Order ready for delivery | Your shop order is ready - will be delivered soon! | Student | When coach prepares items for delivery | MEDIUM | Desktop |
| 61 | Wishlist item restocked | Item on your wishlist is now available! | Student | When wishlist item restocked | MEDIUM | Desktop |
| 62 | Insufficient coins for purchase | You don't have enough ISF Coins for this item | Student | When student attempts purchase without sufficient balance | MEDIUM | Desktop |
| 63 | New order pending delivery | New shop order assigned for delivery to student | Coach | When student order approved and ready | HIGH | Mobile App |
| 64 | Multiple orders ready (batch) | Multiple shop orders pending delivery - batch notification | Coach | When 3+ orders pending for same coach | HIGH | Mobile App |
| 65 | Delivery completed successfully | Shop order delivered successfully - confirmation | Coach | After coach marks delivery as completed | LOW | Mobile App |
| 66 | Stock updated successfully | Inventory stock levels updated after purchase request delivery | Admin | After Purchase Manager updates stock quantities | MEDIUM | Desktop / Mobile |
| 67 | Purchase request cancelled | Purchase request has been cancelled | Admin | When Purchase Manager or Admin cancels request | MEDIUM | Desktop / Mobile |
| **EMOTION CHECK-IN NOTIFICATIONS (Sprint 4 - Student Well-being)** |
| 68 | Happy emotion logged | You logged a Happy emotion - keep up the positive spirit! | Student | When student selects Happy emoji | LOW | Desktop |
| 69 | Sad emotion logged | Student logged Sad emotion - needs attention | Student, Coach, Admin | When student selects Sad emoji | HIGH | Desktop / Mobile |
| 70 | Angry emotion logged | Student logged Angry emotion - needs attention | Student, Coach, Admin | When student selects Angry emoji | HIGH | Desktop / Mobile |
| 71 | Worried emotion logged | Student logged Worried emotion - needs attention | Student, Coach, Admin | When student selects Worried emoji | HIGH | Desktop / Mobile |
| 72 | Neutral emotion logged | You logged a Neutral emotion | Student | When student selects Neutral emoji | LOW | Desktop |
| **TASK MANAGEMENT MOBILE NOTIFICATIONS (Sprint 4 - Mobile Context)** |
| 73 | Task assigned (Mobile push) | New task assigned - mobile notification | Staff (8 roles with mobile app) | When task assigned to staff member | HIGH | Mobile App |
| 74 | Task deadline approaching (Mobile push) | Task due soon - mobile reminder | Staff (8 roles with mobile app) | 24h before, then 1h before deadline | HIGH | Mobile App |
| 75 | Task overdue (Mobile push) | Task is overdue - urgent mobile alert | Staff (8 roles with mobile app) | When task deadline passes | HIGH | Mobile App |

---

## **15. Notifications by User Role**

Each user role receives specific notifications relevant to their responsibilities. Here's what each role will see:

### **4.1. STUDENT Notifications**

**High Priority Notifications Students Receive:**
- Task assigned to you
- Task deadline approaching (24h, 1h before)
- Task overdue
- Training session starting soon (1h, 30min before)
- Training session cancelled
- Vaccination due
- Your work featured on WTF board
- Coins awarded
- Achievement unlocked

**Medium Priority Notifications:**
- New course assigned
- Course module unlocked
- Shop order delivered
- Shop order placed confirmation
- Attendance marked

**Low Priority Notifications:**
- Product back in stock
- Coins deducted
- WTF submission approved
- Someone liked your WTF content

**What Students Won't Receive:**
- Purchase manager notifications
- Admin-level alerts
- Other students' personal notifications

---

### **4.2. COACH Notifications**

**High Priority Notifications Coaches Receive:**
- **SOS emergency alert** (student in their Balagruha triggered SOS)
- Shop order delivery assignment (student ordered something - you need to deliver it)
- Session starting soon (your training session)
- Task overdue (tasks you assigned)

**Medium Priority Notifications:**
- Task completed (students finished tasks you assigned)
- Student enrolled in course (course you created)
- Session attendance marked

**Low Priority Notifications:**
- General system announcements

---

### **4.3. BALAGRUHA IN-CHARGE Notifications**

**High Priority Notifications:**
- **SOS emergency alert** (student in their Balagruha)
- **Critical medical alert** (student temperature ≥102°F)
- **Medical warning alert** (student temperature 100-102°F)
- Student absent (attendance issue)

**Medium Priority Notifications:**
- Medical check-in reminder (daily at 6 PM)
- Daily attendance summary
- Task assigned (tasks for their Balagruha)
- Repair request submitted (for their Balagruha)

**Low Priority Notifications:**
- Attendance marked
- Medical check-in completed

---

### **4.4. MEDICAL IN-CHARGE Notifications**

**High Priority Notifications:**
- **Critical medical alert** (≥102°F) - for ALL balagruhas
- **Medical warning alert** (100-102°F)
- Vaccination due (7 days, 3 days, TODAY)

**Medium Priority Notifications:**
- Medical check-in reminder (daily)
- Medical record updated
- Medical task assigned
- Prescription added

**Low Priority Notifications:**
- Medical check-in completed (daily summary)

---

### **4.5. PURCHASE MANAGER Notifications**

**High Priority Notifications:**
- **Out of stock alert** (product completely out of stock)
- **Low stock alert** (stock below 10 units)
- Purchase request approved
- Purchase request rejected

**Medium Priority Notifications:**
- Purchase order assigned to you
- Purchase request submitted (pending approval)

**Low Priority Notifications:**
- Purchase order completed

---

### **4.6. ADMIN Notifications**

**High Priority Notifications:**
- **SOS escalated** (Tier 2 - no response after 2 minutes)
- **Critical medical alert** (≥102°F)
- **Out of stock alert**
- Student absent (patterns of 3+ consecutive days)

**Medium Priority Notifications:**
- Purchase request submitted (high-value items)
- Low stock alert
- Repair request submitted
- Daily attendance summary

**Low Priority Notifications:**
- System announcements
- General notifications

---

### **4.7. SPORTS COACH / MUSIC COACH Notifications**

**High Priority Notifications:**
- Session starting soon (your sessions)
- Task overdue (tasks you assigned)

**Medium Priority Notifications:**
- Task completed (students finished your tasks)
- Session attendance marked

---

### **4.8. AMMA (Senior Leadership) Notifications**

**High Priority Notifications:**
- **SOS escalated to Tier 2+** (serious emergency, no staff response)
- Purchase request submitted (high-value items requiring senior approval, e.g., >₹10,000)

**Medium Priority Notifications:**
- Critical medical alert summary (weekly)
- Attendance summary (weekly)

**Low Priority Notifications:**
- System announcements

---

## **16. Emergency SOS Notifications (Detailed)**

### **What is the SOS System?**

The SOS system allows students to trigger emergency alerts when they need immediate help. When a student presses the SOS button on their desktop, staff are notified instantly on their mobile phones.

**SOS Categories:**
- Medical Emergency (high fever, injury, feeling very sick)
- Safety Emergency (accident, unsafe situation)
- Mental Health (emotional crisis, feeling upset)
- Other Emergency

---

### **How SOS Escalation Works**

The system automatically escalates alerts if staff don't respond quickly enough:

#### **Tier 1: First 0-2 Minutes**

**Who Gets Notified:**
- All Coaches in the student's Balagruha
- Balagruha In-charge for that Balagruha

**What the Notification Looks Like:**
```
🚨 SOS ALERT - IMMEDIATE RESPONSE REQUIRED
Student Ravi triggered SOS - Category: Medical Emergency
Location: Computer Lab

[ACKNOWLEDGE]  [ON MY WAY]
```

**How It's Delivered:**
- Loud emergency siren sound (cannot be silenced, even on Do Not Disturb mode)
- Phone vibrates multiple times (strong pattern)
- Full-screen alert appears (stays on screen until acknowledged)
- SMS sent to phone

**What Staff Should Do:**
1. Tap "ACKNOWLEDGE" to let everyone know you saw it
2. Tap "ON MY WAY" if you're going to help
3. Tap "ARRIVED" when you reach the student

**If NO ONE responds within 2 minutes** → Automatically escalates to Tier 2

---

#### **Tier 2: 2-5 Minutes (Auto-Escalation)**

**Why This Happens:** No one from Tier 1 responded within 2 minutes

**Who Gets Notified:**
- All Admins
- All Coordinators
- Amma (senior leadership)

**What the Notification Says:**
```
⚠️ SOS ESCALATED - NO TIER 1 RESPONSE
Student Ravi SOS (2 minutes ago) - Category: Medical Emergency
Tier 1 staff did not respond - IMMEDIATE RESPONSE REQUIRED

[ACKNOWLEDGE]  [ON MY WAY]
```

**How It's Delivered:**
- Same as Tier 1 (loud alarm, vibration, full-screen)
- SMS sent to all Tier 2 recipients
- WhatsApp message (if WhatsApp integration is approved)

**If NO ONE responds within 3 additional minutes (5 minutes total)** → Escalates to Tier 3

---

#### **Tier 3: 5+ Minutes (Critical Escalation)**

**Why This Happens:** No one responded after 5 minutes - CRITICAL SITUATION

**Who Gets Notified:**
- **ALL STAFF** (broadcast to everyone in the system)

**What the Notification Says:**
```
🔴 CRITICAL - SOS EMERGENCY UNACKNOWLEDGED
Student Ravi SOS (5+ minutes ago) - ALL STAFF RESPOND IMMEDIATELY

[ACKNOWLEDGE]  [ON MY WAY]
```

**How It's Delivered:**
- Same loud alarm and full-screen alert
- SMS to ALL staff with phone numbers
- WhatsApp broadcast (if enabled)
- Desktop alert (if staff have desktop app open)

---

#### **When SOS is Resolved**

**What Happens:** The staff member who helped the student marks the SOS as "Resolved"

**Who Gets Notified:**
- All staff who received the original SOS alert (Tier 1, 2, or 3)

**What the Notification Says:**
```
✅ SOS Resolved
Student Ravi's emergency resolved by Coach Rajesh
Resolution: Student received medical attention, fever checked, doing fine now
Response time: 8 minutes
```

**Purpose:**
- Lets everyone know the emergency is handled
- Prevents duplicate responses
- Provides closure on the incident

---

### **SOS Response Guarantee**

**Performance Targets:**
- SOS notifications delivered to phones within **5 seconds**
- Tier 2 escalation triggers automatically at exactly **2 minutes**
- Tier 3 escalation triggers automatically at exactly **5 minutes**
- 99.9% delivery reliability (at least one staff member will receive the alert)

---

## **17. Medical Alert Notifications (Detailed)**

Medical alert notifications ensure staff are immediately aware when students need health attention.

### **6.1. Critical Medical Alert (≥102°F / 39°C)**

**When It Triggers:**
- Medical In-charge records student temperature of 102°F or higher during daily check-in

**Who Receives It:**
- Medical In-charge (for all balagruhas)
- Balagruha In-charge (for the student's balagruha)
- Admin
- Amma

**What It Looks Like:**
```
🚨 CRITICAL HEALTH ALERT
Student Priya has temperature 103°F
Immediate attention required!

Tap to view check-in details
```

**Delivery:**
- **Priority:** URGENT (highest level)
- **Sound:** Medical alert alarm
- **Vibration:** Multiple bursts
- **Display:** Full-screen alert
- **SMS:** Yes (to Medical In-charge and Balagruha In-charge)

**What To Do:**
- Medical In-charge should attend to student immediately
- Balagruha In-charge should assist and monitor
- Document actions taken in the medical record

---

### **6.2. Medical Warning Alert (100-102°F / 37.8-39°C)**

**When It Triggers:**
- Student temperature is between 100°F and 102°F

**Who Receives It:**
- Medical In-charge
- Balagruha In-charge

**What It Looks Like:**
```
⚠️ Health Alert - Monitor Closely
Student Amit has elevated temperature 101°F
Please monitor and check again in 2 hours

Tap to view check-in details
```

**Delivery:**
- **Priority:** HIGH
- **Sound:** Standard notification sound
- **Display:** Banner notification
- **SMS:** No (app notification only)

**What To Do:**
- Monitor student closely
- Check temperature again in 2 hours
- Escalate to critical if temperature rises

---

### **6.3. Vaccination Due Reminder**

**When It Triggers:**
- 7 days before vaccination due date
- 3 days before vaccination due date
- On the day vaccination is due

**Who Receives It:**
- Medical In-charge
- Student (on the day it's due)

**What It Looks Like:**
```
💉 Vaccination Due Reminder
Student Sneha's Tetanus vaccination due in 3 days
Due date: November 7, 2025

Tap to view medical records
```

**Delivery:**
- **Priority:** HIGH
- **Sound:** Standard notification
- **Display:** Banner
- **Frequency:** 7 days before, 3 days before, on due date

---

### **6.4. Daily Medical Check-in Reminder**

**When It Triggers:**
- Daily at 6:00 PM if check-ins haven't been completed

**Who Receives It:**
- Medical In-charge

**What It Looks Like:**
```
📋 Daily Check-in Reminder
5 students in Balagruha A have not had check-ins today
Please complete before end of day

Tap to start check-ins
```

**Delivery:**
- **Priority:** MEDIUM
- **Sound:** Standard notification
- **Time:** 6:00 PM daily

---

## **18. Task & Training Notifications**

### **7.1. Task Assignment Notification**

**When It Triggers:**
- A task is created and assigned to a user (student or staff)

**Who Receives It:**
- The person the task is assigned to

**What It Looks Like:**
```
📝 New Task Assigned
Sports: Complete Football Practice Report
Due: Tomorrow, 5:00 PM
Assigned by: Coach Rajesh

Tap to view task details
```

**Delivery:**
- **Priority:** HIGH
- **Sound:** Task notification sound
- **Display:** Banner notification

---

### **7.2. Task Deadline Approaching**

**When It Triggers:**
- 24 hours before task deadline
- 1 hour before task deadline

**Who Receives It:**
- Task assignee

**What It Looks Like:**
```
⏰ Task Deadline Approaching
"Complete Football Practice Report" is due in 1 hour
Don't forget!

Tap to complete task
```

**Delivery:**
- **Priority:** HIGH
- **Sound:** Reminder sound
- **Frequency:** 24h before, then 1h before

---

### **7.3. Task Overdue Notification**

**When It Triggers:**
- When task deadline passes and task is not completed
- Sent daily until task is completed

**Who Receives It:**
- Task assignee
- Task creator (coach who assigned it)

**What It Looks Like:**
```
❗ Task Overdue
"Complete Football Practice Report" was due yesterday
Please complete as soon as possible

Tap to complete task
```

**Delivery:**
- **Priority:** HIGH
- **Sound:** Alert sound
- **Frequency:** Daily until completed

---

### **7.4. Training Session Reminder**

**When It Triggers:**
- 1 hour before session starts
- 30 minutes before session starts

**Who Receives It:**
- Students assigned to the session
- Coach conducting the session

**What It Looks Like:**
```
🏃 Training Session Soon
Music Class with Coach Priya starts in 30 minutes
Location: Music Room

Tap for details
```

**Delivery:**
- **Priority:** HIGH
- **Sound:** Reminder sound
- **Frequency:** 1h before, then 30min before

---

### **7.5. Course Completion Notification**

**When It Triggers:**
- Student completes all modules in a course

**Who Receives It:**
- Student who completed the course
- Coach who assigned the course

**What It Looks Like:**
```
🎓 Course Completed!
Congratulations! You completed "Advanced Mathematics"
You earned 100 ISF Coins

Tap to view certificate
```

**Delivery:**
- **Priority:** HIGH (celebration!)
- **Sound:** Achievement sound
- **Display:** Banner with celebration animation

---

## **19. Messaging Notifications**

### **8.1. New Direct Message**

**When It Triggers:**
- Someone sends you a 1-on-1 message

**Who Receives It:**
- The message recipient

**What It Looks Like:**
```
💬 New message from Coach Rajesh
Hey, can you help with the football equipment inventory today?

Tap to reply
```

**Delivery:**
- **Priority:** HIGH
- **Sound:** Message tone
- **Display:** Banner with sender's profile picture
- **Group on Android:** Multiple messages from same person group together

**Special Features:**
- Shows first 100 characters of message
- Can reply directly from notification (Android)
- Shows sender's profile picture

---

### **8.2. Group Message Notification**

**When It Triggers:**
- New message in a group conversation you're part of

**Who Receives It:**
- All group members (unless they muted the conversation)

**What It Looks Like:**
```
💬 New message in Balagruha A Coaches
Coach Priya: Meeting at 4 PM in the staff room

Tap to view conversation
```

**Delivery:**
- **Priority:** MEDIUM (lower than direct messages)
- **Sound:** Only if you haven't muted the group
- **Display:** Banner notification

**Special Handling:**
- If you're @mentioned in a group message → Priority becomes HIGH
- You can mute specific group conversations in settings

---

### **8.3. You Were Mentioned (@mention)**

**When It Triggers:**
- Someone uses @YourName in a group message

**Who Receives It:**
- The mentioned user

**What It Looks Like:**
```
💬 You were mentioned in Balagruha A Coaches
Coach Rajesh mentioned you: @Priya can you handle the medical checkup today?

Tap to view and reply
```

**Delivery:**
- **Priority:** HIGH (higher than normal group messages)
- **Sound:** Notification sound (even if group is muted)
- **Display:** Banner notification

---

### **8.4. Read Receipts**

**What They Are:**
- Small indicators showing when your message was read

**How They Appear:**
- ✓ Single checkmark = Message sent
- ✓✓ Double checkmark = Message read by recipient

**Notifications:**
- You don't receive a notification when someone reads your message
- The checkmarks update automatically in the conversation

---

### **8.5. Typing Indicators**

**What They Are:**
- Shows when someone is typing a message to you

**How They Appear:**
- At the bottom of the conversation: "Coach Rajesh is typing..."
- Animated dots showing they're actively typing

**Notifications:**
- No notification sound or alert
- Just a visual indicator in the conversation screen

---

## **20. Mobile App Notification Experience**

### **What Notifications Look Like on Your Phone**

Depending on the notification's priority, you'll experience different sounds, vibrations, and display styles:

---

### **20.1. URGENT Priority Notifications**

**Used For:**
- SOS emergency alerts
- Critical medical alerts (≥102°F)
- Out of stock (critical inventory)

**What You'll Experience:**
- **Sound:** Loud emergency siren (cannot be silenced by Do Not Disturb)
- **Vibration:** Strong pattern - multiple long bursts
- **Display:** Full-screen alert that stays until you acknowledge it
- **Lock Screen:** Shows even when phone is locked
- **Icon Color:** Red

**Example on Phone:**
```
┌─────────────────────────────┐
│ 🚨 SOS EMERGENCY ALERT      │
│                             │
│ Student Ravi - Medical      │
│ Emergency                   │
│ Location: Computer Lab      │
│                             │
│ [ACKNOWLEDGE] [ON MY WAY]   │
└─────────────────────────────┘
```

---

### **20.2. HIGH Priority Notifications**

**Used For:**
- Task assigned
- Task deadline approaching
- Session reminders
- Medical warning alerts
- Direct messages
- Low stock alerts

**What You'll Experience:**
- **Sound:** Standard notification sound
- **Vibration:** Standard vibration (one burst)
- **Display:** Banner at top of screen
- **Lock Screen:** Shows on lock screen
- **Icon Color:** Blue (ISF brand color)

**Example on Phone:**
```
┌─────────────────────────────┐
│ 📝 ISF Playground           │
│ New Task Assigned           │
│ Complete Art Project        │
│ Due: Tomorrow, 5:00 PM      │
└─────────────────────────────┘
```

---

### **20.3. MEDIUM Priority Notifications**

**Used For:**
- Coins awarded
- Shop orders
- Course assigned
- Task completed
- WTF featured
- Group messages

**What You'll Experience:**
- **Sound:** Standard notification sound (optional)
- **Vibration:** Light vibration (optional)
- **Display:** Badge on app icon showing count
- **Lock Screen:** May or may not show (depends on phone settings)
- **Icon Color:** Brand color

**Example on Phone:**
```
App Icon with Badge: [ISF] (5)
Notification: "You earned 50 ISF Coins!"
```

---

### **20.4. LOW Priority Notifications**

**Used For:**
- Attendance marked
- General announcements
- Coins deducted
- WTF interactions (likes)

**What You'll Experience:**
- **Sound:** Silent (no sound)
- **Vibration:** None
- **Display:** Badge on app icon only
- **Lock Screen:** Does not appear
- **Icon Color:** Gray

**Example on Phone:**
```
App Icon with Badge: [ISF] (12)
(Silent - no popup or sound)
```

---

### **20.5. Tapping on Notifications**

**What Happens When You Tap:**
- The ISF Playground app opens
- You're taken directly to the relevant screen

**Examples:**
- Tap task notification → Opens task details screen
- Tap medical alert → Opens medical check-in details
- Tap message → Opens conversation
- Tap SOS alert → Opens emergency response screen
- Tap shop order → Opens order details

**This is called "Deep Linking"** - saves you time navigating through the app.

---

### **20.6. Managing Notifications**

**In the App:**
- Tap the notification bell icon to see all notifications
- Badge shows unread count (e.g., "5" means 5 unread notifications)
- Swipe down to mark individual notifications as read
- Tap "Mark all as read" to clear all unread notifications
- Tap any notification to go to that feature

**On Your Phone:**
- **iPhone:** Settings → Notifications → ISF Playground → Customize sounds and display
- **Android:** Settings → Apps → ISF Playground → Notifications → Customize channels

**You Can Control:**
- Which notification types make sound
- Which show on lock screen
- Quiet hours (no notifications during sleep hours, except URGENT)
- Group conversation muting

**What You Cannot Disable:**
- SOS emergency alerts (always enabled for safety)
- Critical medical alerts (always enabled for student safety)

---

## **21. Key Decisions Needed**

Before we proceed with Sprint 3-4, we need your input on these critical decisions:

---

### **Decision #1: WhatsApp Integration**

**The Question:** Should we integrate WhatsApp notifications, or focus entirely on mobile app push notifications?

**Option A: PROCEED with WhatsApp** ✅
- **Pros:**
  - Reach staff even if they don't have the ISF app open
  - Some staff may prefer WhatsApp (already familiar)
  - Can send critical alerts via multiple channels
- **Cons:**
  - WhatsApp Business API costs money (per message sent)
  - Need to get WhatsApp Business approval (takes time)
  - Risk of notification fatigue (too many messages)
- **What We'd Do:**
  - Limit to maximum 10 critical notification types only
  - Maximum 5 WhatsApp messages per user per day
  - Only for: SOS alerts, critical medical alerts, task deadlines, session reminders
- **Requirements:**
  - You must have (or apply for) WhatsApp Business API account
  - Estimated cost: ₹0.25-1.00 per message

**Option B: DEFER WhatsApp to post-launch** ⏸️
- **Pros:**
  - Focus Sprint 4 resources on mobile app notifications (higher priority)
  - Save costs during initial launch
  - Can add WhatsApp later based on user feedback
  - Mobile app push notifications already cover most needs
- **Cons:**
  - Staff without mobile app open won't receive certain alerts via WhatsApp
- **What We'd Do:**
  - Build complete mobile push notification system
  - Add WhatsApp in a future sprint if needed

**Our Recommendation:** DEFER WhatsApp to post-launch. Focus on mobile app excellence in Sprint 3-4.

**Your Decision:** [ ] Proceed with WhatsApp  [ ] Defer WhatsApp

---

### **Decision #2: Medical Alert Temperature Thresholds**

**The Question:** Confirm the temperature thresholds for medical alerts

**Proposed Thresholds:**
- **Warning Alert:** 100°F (37.8°C) to 102°F (39°C) → Notify Medical In-charge and Balagruha In-charge
- **Critical Alert:** 102°F (39°C) and above → Notify Medical In-charge, Balagruha In-charge, Admin, Amma + SMS

**Questions:**
1. Are these thresholds medically appropriate for your students' age group?
2. Should critical alerts also be sent via SMS to Medical In-charge's phone?
3. Should Medical In-charge receive alerts for ALL balagruhas, or only assigned ones?

**Our Recommendation:**
- Thresholds: 100°F warning, 102°F critical (medically appropriate)
- SMS for critical alerts: YES (ensures Medical In-charge sees it)
- Coverage: Medical In-charge sees alerts for ALL balagruhas (centralized health monitoring)

**Your Decision:** [ ] Approve thresholds  [ ] Modify (specify new thresholds: _______)

---

### **Decision #3: SOS Escalation Timing**

**The Question:** Confirm the automatic escalation timing for SOS alerts

**Proposed Timing:**
- **Tier 1 (0-2 minutes):** Balagruha coaches + In-charge
- **Tier 2 (2-5 minutes):** Escalates to Admins + Coordinators + Amma if no response
- **Tier 3 (5+ minutes):** Escalates to ALL STAFF if still no response

**Questions:**
1. Is 2 minutes enough time for Tier 1 to respond before escalating?
2. Should medical emergencies escalate faster than other types (e.g., 1 min → 3 min)?

**Our Recommendation:**
- Standard timing: 2 min → 5 min (gives Tier 1 reasonable time to respond)
- Medical emergencies: Same timing (2 min → 5 min) because all SOS alerts are urgent

**Your Decision:** [ ] Approve timing  [ ] Modify (specify new timing: _______)

---

### **Decision #4: Task & Training Session Reminder Timing**

**The Question:** Confirm when students receive deadline and session reminders

**Proposed Timing:**
- **Task Deadline Reminders:** 24 hours before, then 1 hour before
- **Session Reminders:** 1 hour before, then 30 minutes before
- **Overdue Task Reminders:** Daily until completed

**Questions:**
1. Is 24 hours advance notice sufficient for task deadlines?
2. Should session reminders also be sent 1 day before?

**Our Recommendation:**
- Task reminders: 24h + 1h (gives students time to prepare)
- Session reminders: 1h + 30min (enough notice to attend)
- Overdue: Daily (keeps tasks top-of-mind without being annoying)

**Your Decision:** [ ] Approve timing  [ ] Modify (specify preferences: _______)

---

### **Decision #5: Notification Retention**

**The Question:** How long should notifications be kept in the system?

**Proposed Retention:**
- Notifications automatically deleted after **90 days** (3 months)
- Users can manually delete individual notifications anytime

**Why This Matters:**
- Keeps the database clean and performant
- Old notifications aren't useful after a while
- Important information (like tasks, medical records) is still stored separately

**Our Recommendation:** 90-day retention (3 months is enough history)

**Your Decision:** [ ] 90 days  [ ] Different timeframe: _____

---

### **Decision #6: Parent/Guardian Notifications**

**The Question:** Should parent/guardian notifications be included in Sprint 3-4?

**Current Situation:**
- Parents/guardians do NOT have user accounts in the system
- Parent contact information is stored (phone numbers) but they can't log in
- To send parent notifications, we'd need to use SMS or WhatsApp

**Option A: Include in Sprint 3-4**
- Parents receive SMS for:
  - Critical medical alerts (≥102°F)
  - Consecutive absences (3+ days)
  - Major achievements
- **Impact:** Adds development time, requires SMS setup for parents

**Option B: DEFER to Future Sprint**
- Focus Sprint 3-4 on staff-to-staff and staff-to-student notifications
- Add parent notifications after system is stable
- **Impact:** Faster Sprint 3-4 completion

**Our Recommendation:** DEFER to future sprint. Focus on staff communication first.

**Your Decision:** [ ] Include in Sprint 3-4  [ ] Defer to future

---

### **Decision #7: Purchase Request Approval Threshold**

**The Question:** At what amount should purchase requests require Amma's approval (with notification)?

**Proposed Threshold:**
- Purchase requests **above ₹10,000** require Amma approval
- Amma receives high-priority notification for approval

**Questions:**
1. Is ₹10,000 the right threshold for senior leadership approval?
2. Should there be different thresholds for different types of purchases?

**Our Recommendation:** ₹10,000 threshold (balances oversight with efficiency)

**Your Decision:** [ ] ₹10,000  [ ] Different amount: _____

---

## **22. Success Criteria**

### **How We'll Know Sprint 3-4 is Successful**

These are the measurable criteria that must be met before Sprint 3-4 is considered complete:

---

### **11.1. Notification Delivery Performance**

**Critical Alerts:**
- ✅ Medical critical alerts (≥102°F) delivered to phones within **5 seconds**
- ✅ SOS Tier 1 notifications delivered within **5 seconds** to all recipients
- ✅ SOS automatically escalates to Tier 2 at exactly **2 minutes** if no response
- ✅ SOS automatically escalates to Tier 3 at exactly **5 minutes** if no response
- ✅ At least **99.9% delivery success** (virtually guaranteed delivery)

**Standard Notifications:**
- ✅ Task deadline reminders sent at correct timing (24h before, 1h before)
- ✅ Training session reminders sent at correct timing (1h before, 30min before)
- ✅ Mobile push notifications delivered within **10 seconds**
- ✅ Notification bell badge updates in real-time (within 1 second)

---

### **11.2. Notification Coverage**

**Complete Implementation:**
- ✅ All **75 notification categories** implemented and tested
- ✅ All **10 user roles** receive appropriate notifications for their workflows (Students + 8 mobile staff + Purchase Manager)
- ✅ Medical In-charge receives critical health alerts for all balagruhas
- ✅ Balagruha In-charge receives alerts only for their assigned balagruha
- ✅ Purchase Manager receives low stock and out-of-stock alerts
- ✅ Admins receive escalated SOS and critical inventory alerts

**No Missing Notifications:**
- ✅ Every important event in the system triggers the correct notification
- ✅ Every user role receives notifications they need to do their job

---

### **11.3. Notification Quality**

**Accuracy:**
- ✅ No duplicate notifications (same alert sent twice)
- ✅ No irrelevant notifications (users only get notifications for their role)
- ✅ Notification content is clear, grammatically correct, and actionable
- ✅ All notification counts are accurate (badge shows correct unread count)

**Functionality:**
- ✅ Tapping notification opens the correct screen in the app
- ✅ "Mark as read" works correctly for individual notifications
- ✅ "Mark all as read" clears all unread notifications
- ✅ Users can delete individual notifications
- ✅ Notification history loads quickly (within 1 second)

---

### **11.4. Mobile App Experience**

**Notification Display:**
- ✅ URGENT notifications use emergency sound and full-screen alert
- ✅ HIGH notifications use standard sound and banner display
- ✅ MEDIUM notifications use sound and badge only
- ✅ LOW notifications are silent with badge only

**User Control:**
- ✅ Users can customize notification sounds in phone settings
- ✅ Users can set quiet hours (except URGENT priorities)
- ✅ Users can mute individual group conversations
- ✅ SOS and critical medical alerts cannot be disabled (safety requirement)

---

### **11.5. SOS Emergency System**

**SOS Performance:**
- ✅ SOS alert delivery within **5 seconds** to all Tier 1 recipients
- ✅ Escalation to Tier 2 triggers automatically at 2-minute mark
- ✅ Escalation to Tier 3 triggers automatically at 5-minute mark
- ✅ All SOS events logged with complete audit trail (who responded, when, resolution)
- ✅ 100% of SOS alerts are resolved and closed

**SOS Reliability:**
- ✅ If mobile app is closed, notification still delivered via push
- ✅ If push notification fails, SMS is sent as backup
- ✅ At least one staff member receives every SOS alert (99.9% guarantee)

---

### **11.6. Medical Alert System**

**Medical Notifications:**
- ✅ Critical temperature alerts trigger within **5 seconds** of check-in submission
- ✅ Warning temperature alerts sent to correct staff (Medical In-charge + Balagruha In-charge)
- ✅ Vaccination reminders sent at 7 days, 3 days, and on due date
- ✅ Daily check-in reminders sent at 6:00 PM if check-ins incomplete

**Medical Accuracy:**
- ✅ No false positives (alerts only when thresholds are actually met)
- ✅ Temperature thresholds correctly calculated (100°F warning, 102°F critical)
- ✅ Vaccination due dates accurately calculated

---

### **11.7. Messaging System**

**Message Notifications:**
- ✅ Direct message notifications delivered within **2 seconds** when app is open
- ✅ Push notifications for messages sent when app is closed
- ✅ Group message notifications respect user mute settings
- ✅ @mentions always notify even if group is muted

**Read Receipts & Typing:**
- ✅ Read receipts update instantly (double checkmark when read)
- ✅ Typing indicators show within 1 second of user typing
- ✅ Typing indicators clear when user stops typing (after 3 seconds)

---

### **11.8. Overall System Quality**

**User Acceptance:**
- ✅ User testing passed with all 10 user roles (Students + 8 mobile staff + Purchase Manager)
- ✅ User satisfaction score **> 8/10** on post-launch survey
- ✅ No major usability complaints requiring immediate fixes
- ✅ Staff training materials completed and approved

**Technical Quality:**
- ✅ Zero P0 (critical) bugs
- ✅ Zero P1 (high priority) bugs
- ✅ Less than 5 P2 (medium priority) bugs
- ✅ Mobile app crash rate **< 0.1%**

**Performance:**
- ✅ Notification center loads in less than **1 second**
- ✅ App cold start time less than **3 seconds**
- ✅ Notification badge updates instantly (no delay)

---

### **11.9. Optional: WhatsApp Integration (if approved)**

**If WhatsApp is approved:**
- ✅ WhatsApp notifications delivered within **60 seconds**
- ✅ Maximum 5 WhatsApp messages per user per day enforced
- ✅ Users can opt-in/opt-out of WhatsApp notifications
- ✅ WhatsApp delivery confirmation tracked and logged

**If WhatsApp is deferred:**
- This section is not applicable for Sprint 3-4

---

## **23. What Happens After Sprint 3-4**

### **Post-Launch Support**

**Weeks 29-33: Stabilization Period**
- Fix any bugs discovered after launch
- Performance optimization based on real usage
- Fine-tune notification timings if needed

**Weeks 34-38: Enhancement Period**
- Add features based on user feedback
- Optimize notification content based on staff input
- Consider implementing deferred features (WhatsApp, parent notifications)

---

### **Future Enhancements (Post Sprint 3-4)**

These features are documented but will be implemented later:

**Parent/Guardian Notifications** (if approved)
- Medical alerts sent to parents via SMS
- Attendance issue notifications
- Achievement celebration notifications

**WhatsApp Integration** (if deferred)
- Integration for critical alerts
- Opt-in based on user preference

**Advanced Notification Features**
- Notification scheduling (send at specific times)
- Notification analytics (which notifications are most effective)
- Custom notification sounds per category
- Multi-language support (Hindi, Marathi)

---

### **Ongoing Monitoring**

**Performance Monitoring:**
- Track notification delivery times daily
- Monitor SOS response times
- Alert if any delivery failures occur

**User Feedback:**
- Collect feedback on notification usefulness
- Identify notifications that are too frequent or not useful
- Adjust priorities and timing based on real-world usage

---

## **24. Next Steps**

### **For ISF Foundation to Complete:**

1. **Answer all questions in Section 10** (Key Decisions Needed)
2. **Review and approve this specification**
3. **Sign off on success criteria** (Section 11)
4. **Confirm user roles and access** for testing
5. **Provide test devices** for mobile app testing (iOS and Android)

### **For Development Team:**

1. **Upon approval:** Begin Sprint 3-4 development (28 days)
2. **Week 1-2:** Mobile app foundation and push notifications
3. **Week 3-4:** SOS system, medical alerts, messaging, all notification types
4. **Week 4:** Testing, bug fixes, user training
5. **Week 5:** Deployment and go-live

---

## **24. Contact & Support**

### **Questions or Clarifications?**

If you have questions about anything in this document, please contact:

**Project Manager:** [Your PM Name]
**Technical Lead:** [Your Tech Lead Name]
**Email:** [Contact Email]
**Phone:** [Contact Phone]

**Response Time:** We'll respond to questions within 24 hours on business days.

---

## **25. Document Approval**

### **Approval Signatures**

**ISF Foundation Representative:**
Name: _______________________________
Title: _______________________________
Signature: ___________________________
Date: ________________________________

**Project Manager:**
Name: _______________________________
Signature: ___________________________
Date: ________________________________

---

## **Appendix: Glossary of Terms**

**Badge:** The small number on the app icon showing unread notification count

**Balagruha:** Residential house/facility for students within ISF Foundation

**Deep Linking:** When tapping a notification opens the specific relevant screen in the app

**Escalation:** Automatic process of notifying more people if initial recipients don't respond

**FCM (Firebase Cloud Messaging):** The technology that delivers push notifications to phones

**Notification Bell:** The bell icon in the app where you see all notifications

**Push Notification:** A notification that appears on your phone even when the app is closed

**Priority:** How urgent a notification is (URGENT, HIGH, MEDIUM, LOW)

**SMS:** Text message sent to phone number

**SOS:** Emergency alert system for students needing immediate help

**Tier 1/2/3:** Levels of escalation for SOS alerts (who gets notified at each stage)

**Unread Count:** Number of notifications you haven't read yet

**WhatsApp Business API:** Official WhatsApp system for businesses to send automated messages

---

**END OF CLIENT-FACING DOCUMENT**

**Total Pages:** ~40
**Word Count:** ~10,000
**Last Updated:** 2025-11-04 16:00:31
**Document Status:** READY FOR CLIENT REVIEW

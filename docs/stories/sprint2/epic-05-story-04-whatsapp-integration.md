# Epic 05 Story 04: WhatsApp Integration for Schedule Notifications

**Last Updated:** 2025-10-24 16:35:37 (via `date '+%Y-%m-%d %H:%M:%S'`)

---

## Story Overview

**As an** Admin
**I want to** automatically send weekly schedules to Balagruha WhatsApp groups
**So that** coaches and students receive timely updates about their weekly activities without manual intervention

---

## Business Context

WhatsApp is the primary communication channel for ISF Playground community outside the app. Weekly schedules need to be shared with each Balagruha's WhatsApp group to keep coaches and students informed about upcoming classes, activities, and assignments.

Currently, admins manually copy schedules and send them to WhatsApp groups, which is:
1. Time-consuming and repetitive
2. Prone to human error (forgetting groups, incorrect formatting)
3. Not scalable as number of Balagruhas grows
4. Inconsistent timing across groups

This feature automates the entire process:
- **Reliability**: Guaranteed delivery every Monday at 8:00 AM IST
- **Consistency**: Same format and timing for all Balagruhas
- **Traceability**: Track delivery status and failures
- **Security**: Encrypted storage of WhatsApp group contact details
- **Retry Mechanism**: Automatic retries for failed deliveries

---

## Dependencies

### Sprint 1.1 Dependencies:
- **RBAC System**: Admin role permissions for WhatsApp configuration

### Sprint 2 Dependencies:
- **Epic 02 Story 01**: Course structure data (for schedule generation)
- **Epic 03 Story 01**: Course assignments to Balagruhas (determines which courses in schedule)
- **Epic 05 Story 01**: In-App Notification Center (admin notifications for failed sends)

### External Dependencies:
- **WhatsApp Business API** or **Twilio WhatsApp API** for sending messages
- **MongoDB** for secure storage of group numbers and delivery logs
- **Cron job scheduler** (node-cron) for weekly automation

---

## User Roles Involved

- **Admin**: Configures WhatsApp group numbers, views delivery status, manually triggers sends
- **Coach**: Receives weekly schedule in Balagruha WhatsApp group
- **Student**: Receives weekly schedule in Balagruha WhatsApp group
- **System**: Generates schedules, sends to WhatsApp, retries failures, logs delivery status

---

## 1. Feature Requirements

### 1.1 Core Functionality

**WhatsApp Group Configuration:**
- Admin can add WhatsApp group phone number for each Balagruha
- Phone numbers stored encrypted in database
- Validation: Must be valid international format (+91 XXXXXXXXXX)
- Edit and delete group numbers
- Mark group as active/inactive (skip inactive groups in auto-send)
- Test send functionality before saving

**Schedule Generation:**
- System generates weekly schedule from Monday to Sunday
- Includes assigned courses for that Balagruha
- Shows course name, day, time (if applicable)
- Lists any upcoming deadlines or assignments
- Formatted as readable text message (not image)

**Automated Weekly Send:**
- Cron job runs every Monday at 8:00 AM IST
- Fetches all active Balagruhas with configured WhatsApp numbers
- Generates personalized schedule for each Balagruha
- Sends via WhatsApp API with error handling
- Logs delivery status (success, failed, pending retry)

**Retry Mechanism:**
- Failed sends added to retry queue
- Automatic retry attempts: 3 retries with exponential backoff (5 min, 15 min, 60 min)
- After max retries, mark as "Failed" and notify admin
- Admin can manually retry failed sends

**Delivery Tracking:**
- Dashboard showing all scheduled sends (past and upcoming)
- Delivery status per Balagruha: Success (✅), Failed (❌), Pending (⏳), Retrying (🔄)
- Detailed delivery log with timestamps
- Filter by date, status, Balagruha
- Export delivery report as CSV

**Manual Send:**
- Admin can trigger immediate send for specific Balagruha
- Select date range for schedule (default: upcoming week)
- Preview message before sending
- Send to all or selected Balagruhas

### 1.2 UI/UX Requirements

**WhatsApp Configuration Page:**
- Clean admin interface at 1366x768 resolution
- Table showing all Balagruhas with WhatsApp status
- Add/Edit modal for entering group numbers
- Test button sends sample message
- Active/Inactive toggle per group

**Schedule Preview:**
- Modal showing exactly how message will appear on WhatsApp
- Formatted with emojis and line breaks for readability
- Character count (WhatsApp messages max 4096 chars)
- Preview updates in real-time as schedule changes

**Delivery Dashboard:**
- Card-based layout showing today's delivery status
- Timeline view of past sends
- Drill-down to individual Balagruha delivery details
- Quick actions: Retry, Resend, View Message

### 1.3 Technical Requirements

**Frontend:**
- React v19.0.0 functional components
- TailwindCSS utility classes for styling
- Real-time status updates via WebSocket or polling
- Form validation for phone numbers (international format)

**Backend:**
- Node.js controller for WhatsApp operations
- Integration with Twilio WhatsApp API or WhatsApp Business API
- Encryption for stored phone numbers (AES-256)
- MongoDB collections: WhatsAppGroups, WhatsAppDeliveryLogs
- Cron job using node-cron (runs every Monday 8:00 AM)
- Retry queue using Bull.js or Agenda.js

**Security:**
- Encrypt WhatsApp group numbers at rest
- Environment variables for API keys (never in codebase)
- RBAC: Only admins can configure WhatsApp settings
- Rate limiting to prevent API abuse
- Audit log for all configuration changes

**Performance:**
- Batch send with 2-second delay between messages (avoid rate limits)
- Queue system for retry logic
- Optimize schedule generation queries
- Cache course assignment data

---

## 1.5 Visual Layout Diagrams

### Diagram 1: WhatsApp Configuration Page - Main View (1366x768)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ISF Playground Admin - WhatsApp Configuration                        [🔔 3] [Admin] [Logout]   │ 72px Title Bar
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│  [Dashboard] [Courses] [Students] [Reports] [Broadcasts] [WHATSAPP] [Settings]                  │ 64px Toolbar
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  WhatsApp Schedule Integration                                                           │   │
│  │                                                    [View Delivery History] [+ Add Group] │   │ 80px Header
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│  │ 📱 Total Groups  │  │ ✅ Active        │  │ ⏳ Next Send     │  │ 📊 Success Rate  │       │
│  │                  │  │                  │  │                  │  │                  │       │
│  │       15         │  │       14         │  │  Mon 8:00 AM     │  │      94.3%       │       │ 120px Stats
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘       │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  Balagruha Groups                                                      🔍 Search...      │   │ 60px Header
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │ Balagruha Name         WhatsApp Number    Status    Last Sent         Actions            │   │ 50px
│  ├─────────────────────────────────────────────────────────────────────────────────────────┤   │ Table Header
│  │ Balagruha Vijayawada  +91 98765 43210   ✅ Active  Oct 21, 8:00 AM  [Test] [Edit] [...│   │ 60px Row
│  │ Balagruha Guntur      +91 98765 43211   ✅ Active  Oct 21, 8:01 AM  [Test] [Edit] [...│   │ 60px Row
│  │ Balagruha Hyderabad   +91 98765 43212   ✅ Active  Oct 21, 8:02 AM  [Test] [Edit] [...│   │ 60px Row
│  │ Balagruha Tirupati    Not Configured    ⚠️  None   —                 [Add] [...]        │   │ 60px Row
│  │ Balagruha Visakha...  +91 98765 43214   ⏸️  Pause  Oct 14, 8:00 AM  [Test] [Edit] [...│   │ 60px Row
│  │ Balagruha Kakinada    +91 98765 43215   ✅ Active  Oct 21, 8:05 AM  [Test] [Edit] [...│   │ 60px Row
│  │ Balagruha Nellore     +91 98765 43216   ✅ Active  Oct 21, 8:06 AM  [Test] [Edit] [...│   │ 60px Row
│  │ Balagruha Rajah...    +91 98765 43217   ✅ Active  Oct 21, 8:07 AM  [Test] [Edit] [...│   │ 60px Row
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  [1] [2] [3] ... [Next →]                                                                        │ 40px Pagination
│                                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                                                         Total: 768px
```

**Component Measurements:**
| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| Title Bar | 100% | 72px | px-6 py-4 | - | border-b gray-200 | text-xl font-bold |
| Toolbar | 100% | 64px | px-6 py-3 | - | border-b gray-200 | text-base |
| Page Header | 100% | 80px | p-6 | mx-6 mt-6 | rounded-lg bg-white | text-2xl font-bold |
| Stats Card | 25% (min 280px) | 120px | p-6 | mx-2 my-4 | border gray-200 rounded-lg | text-3xl font-bold |
| Table Header | calc(100%-48px) | 60px | px-6 py-3 | mx-6 my-4 | border gray-200 rounded-t-lg bg-gray-50 | text-sm font-semibold |
| Table Row | 100% | 60px | px-6 py-4 | - | border-b gray-100 | text-base |
| Add Button | auto | 44px | px-6 py-2 | ml-2 | rounded-md bg-blue-600 text-white | text-base font-semibold |
| Action Button | auto | 36px | px-3 py-1 | mx-1 | rounded border gray-300 | text-sm |

---

### Diagram 2: Add/Edit WhatsApp Group Modal (600x500 overlay)

```
┌───────────────────────────────────────────────────────────────────┐
│  Configure WhatsApp Group                            [✕ Close]    │ 60px Header
├───────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Balagruha                                                         │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ Balagruha Vijayawada                                       │   │ 40px
│  └───────────────────────────────────────────────────────────┘   │ (Read-only)
│                                                                     │
│  WhatsApp Group Number *                                           │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ +91 98765 43210                                            │   │ 40px Input
│  └───────────────────────────────────────────────────────────┘   │
│  Format: +[country code] [phone number]                           │ 24px Help Text
│  Example: +91 9876543210                                           │
│                                                                     │
│  Group Name (Optional)                                             │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ Vijayawada - Weekly Updates                               │   │ 40px Input
│  └───────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Status                                                             │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ [Active ⚫]  [Paused ⚪]                                   │   │ 40px Radio
│  └───────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ ℹ️  Test Message                                            │ │
│  │                                                               │ │
│  │ Before saving, send a test message to verify the number     │ │ 80px
│  │ is correct and the bot has access to the group.             │ │ Info Box
│  │                                                               │ │
│  │                              [Send Test Message]             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ ⚠️  Important Notes:                                        │ │
│  │ • Add the ISF Bot to your WhatsApp group first              │ │
│  │ • Bot must be group admin to send messages                  │ │ 100px
│  │ • Phone number is encrypted and stored securely             │ │ Warning Box
│  │ • Only ISF Admins can view/edit this configuration          │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                     │
│                                  [Cancel]  [Save Configuration]    │ 60px Footer
└───────────────────────────────────────────────────────────────────┘
                                                       Total: 500px
```

**Component Measurements:**
| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| Modal Container | 600px | 500px | - | - | rounded-xl shadow-2xl bg-white | - |
| Header | 100% | 60px | px-6 py-4 | - | border-b gray-200 | text-xl font-bold |
| Input Label | 100% | 24px | - | mb-2 | - | text-sm font-medium |
| Text Input | 100% | 40px | px-4 py-2 | mb-4 | border gray-300 rounded-lg | text-base |
| Help Text | 100% | 20px | - | mb-1 | - | text-xs text-gray-500 |
| Info Box | 100% | 80px | p-4 | my-4 | border-l-4 border-blue-500 bg-blue-50 rounded | text-sm |
| Warning Box | 100% | 100px | p-4 | my-4 | border-l-4 border-yellow-500 bg-yellow-50 rounded | text-sm |
| Footer Buttons | auto | 44px | px-6 py-2 | mx-2 | rounded-md | text-base font-semibold |

---

### Diagram 3: Schedule Preview Modal (700x600 overlay)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Preview WhatsApp Message                                [✕ Close] │ 60px Header
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Sending to: Balagruha Vijayawada                                    │ 30px Info
│  Phone: +91 98765 43210                                              │ 30px Info
│                                                                       │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  Message Preview                          1,247 / 4,096 chars  │ │ 40px
│  └───────────────────────────────────────────────────────────────┘ │ Preview Header
│                                                                       │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                                 │ │
│  │  📅 *Weekly Schedule - Oct 21-27, 2025*                       │ │
│  │  _Balagruha Vijayawada_                                        │ │
│  │                                                                 │ │
│  │  Dear Students and Coaches! 🙏                                 │ │
│  │                                                                 │ │
│  │  Here's your schedule for the upcoming week:                   │ │
│  │                                                                 │ │
│  │  *Monday, Oct 21*                                              │ │
│  │  📚 Computer Apps - Module 3: Advanced Excel                   │ │
│  │  🎨 Art Course - Chapter 2: Watercolor Techniques              │ │
│  │                                                                 │ │
│  │  *Tuesday, Oct 22*                                             │ │
│  │  🗣️ Spoken English - Conversation Practice                    │ │
│  │  💡 Life Skills - Time Management                             │ │
│  │                                                                 │ │
│  │  *Wednesday, Oct 23*                                           │ │ 380px
│  │  📚 Computer Apps - Quiz: Excel Functions                      │ │ Message
│  │  🎨 Art Course - Project Submission Deadline                   │ │ Preview
│  │                                                                 │ │ (Scrollable)
│  │  *Thursday, Oct 24*                                            │ │
│  │  🗣️ Spoken English - Pronunciation Workshop                   │ │
│  │  💡 Life Skills - Communication Skills                        │ │
│  │                                                                 │ │
│  │  *Friday, Oct 25*                                              │ │
│  │  📚 Computer Apps - Final Project Work                         │ │
│  │  🎨 Art Course - Live Session with Coach                       │ │
│  │                                                                 │ │
│  │  📌 *Important Reminders:*                                     │ │
│  │  • Complete all pending assignments by Wednesday               │ │
│  │  • Earn ISF Coins by finishing modules on time! 💰            │ │
│  │  • Need help? Contact your coach anytime                       │ │
│  │                                                                 │ │
│  │  Keep up the great work! 🌟                                    │ │
│  │  - ISF Playground Team                                         │ │
│  │                                                                 │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  [Edit Template]                        [Cancel]  [Send Now →]       │ 60px Footer
└─────────────────────────────────────────────────────────────────────┘
                                                           Total: 600px
```

**Component Measurements:**
| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| Modal Container | 700px | 600px | - | - | rounded-xl shadow-2xl bg-white | - |
| Header | 100% | 60px | px-6 py-4 | - | border-b gray-200 | text-xl font-bold |
| Info Line | 100% | 30px | px-6 py-1 | - | - | text-sm text-gray-600 |
| Preview Box | calc(100%-48px) | 380px | p-6 | mx-6 my-4 | border gray-300 rounded-lg bg-gray-50 font-mono | text-sm |
| Character Count | auto | 20px | px-2 | - | - | text-xs text-gray-500 |
| Footer Buttons | auto | 44px | px-6 py-2 | mx-2 | rounded-md | text-base font-semibold |

---

### Diagram 4: Delivery History Dashboard (1366x768)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ISF Playground Admin - WhatsApp Delivery History                     [🔔 3] [Admin] [Logout]   │ 72px Title Bar
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│  [Dashboard] [Courses] [Students] [Reports] [Broadcasts] [WHATSAPP] [Settings]                  │ 64px Toolbar
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                   │
│  [← Back to Configuration]                                                                       │ 50px Back Nav
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  WhatsApp Delivery History                                     [Export CSV] [Send Now]  │   │ 80px Header
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  [All] [Success] [Failed] [Pending]               📅 Oct 1 - Oct 31   🔍 Search...      │   │ 60px Filters
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  📅 Monday, October 21, 2025 - 8:00 AM                              14/15 Sent ✅       │   │
│  │                                                                                           │   │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────┐   │   │
│  │  │ ✅ Balagruha Vijayawada    +91 98765 43210   Sent     8:00:12 AM  [View] [Resend││   │ 50px
│  │  │ ✅ Balagruha Guntur        +91 98765 43211   Sent     8:00:14 AM  [View] [Resend││   │ 50px
│  │  │ ✅ Balagruha Hyderabad     +91 98765 43212   Sent     8:00:16 AM  [View] [Resend││   │ 50px
│  │  │ ❌ Balagruha Tirupati      Not Configured    Skipped  —            [Configure]   ││   │ 50px
│  │  │ ✅ Balagruha Visakha...    +91 98765 43214   Sent     8:00:20 AM  [View] [Resend││   │ 50px
│  │  │ ✅ Balagruha Kakinada      +91 98765 43215   Sent     8:00:22 AM  [View] [Resend││   │ 50px
│  │  │ ...                                                                                ││   │
│  │  └─────────────────────────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │ 380px
│                                                                                                   │ Delivery Block
│  ┌─────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │  📅 Monday, October 14, 2025 - 8:00 AM                              15/15 Sent ✅       │   │
│  │                                                                                           │   │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────┐   │   │
│  │  │ ✅ Balagruha Vijayawada    +91 98765 43210   Sent     8:00:08 AM  [View] [Resend││   │ 50px
│  │  │ ✅ Balagruha Guntur        +91 98765 43211   Sent     8:00:10 AM  [View] [Resend││   │ 50px
│  │  │ ✅ Balagruha Hyderabad     +91 98765 43212   Sent     8:00:12 AM  [View] [Resend││   │ 50px
│  │  │ ...                                                                                ││   │
│  │  └─────────────────────────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                                                         Total: 768px
```

---

### Diagram 5: Test Send Result Modal (500x300 overlay)

```
┌─────────────────────────────────────────────────────┐
│  Test Send Result                     [✕ Close]    │ 60px Header
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────────────────────────────────┐   │
│  │                                               │   │
│  │              ✅ Test Successful!             │   │
│  │                                               │   │
│  │  Message sent to: +91 98765 43210            │   │ 150px
│  │  Sent at: 10:45:23 AM                        │   │ Success
│  │                                               │   │ Message
│  │  Check your WhatsApp group for the           │   │
│  │  test message.                                │   │
│  │                                               │   │
│  └─────────────────────────────────────────────┘   │
│                                                       │
│                                [Close]               │ 60px Footer
└─────────────────────────────────────────────────────┘
                                         Total: 300px
```

**Error State:**
```
┌─────────────────────────────────────────────────────┐
│  Test Send Result                     [✕ Close]    │ 60px Header
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────────────────────────────────┐   │
│  │                                               │   │
│  │              ❌ Send Failed                  │   │
│  │                                               │   │
│  │  Error: Invalid phone number format          │   │ 150px
│  │                                               │   │ Error
│  │  Please check:                                │   │ Message
│  │  • Number includes country code (+91)        │   │
│  │  • Bot is added to the WhatsApp group        │   │
│  │  • Bot has admin permissions in group        │   │
│  │                                               │   │
│  └─────────────────────────────────────────────┘   │
│                                                       │
│                        [Try Again]  [Close]          │ 60px Footer
└─────────────────────────────────────────────────────┘
                                         Total: 300px
```

---

### Diagram 6: Weekly Schedule Cron Job Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│  Automated Weekly WhatsApp Send Flow                                 │
└─────────────────────────────────────────────────────────────────────┘

                    ⏰ Monday 8:00 AM IST
                            │
                            ▼
            ┌───────────────────────────────┐
            │  Cron Job Triggered           │
            │  (scheduledWhatsAppCron.js)   │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │  Fetch All Active Balagruhas  │
            │  with WhatsApp Numbers        │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │  For Each Balagruha:          │
            │  Generate Weekly Schedule     │
            │  (Course Assignments +         │
            │   Deadlines + Reminders)      │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │  Format Message Text          │
            │  (Emojis, Markdown, Unicode)  │
            └───────────────┬───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │  Send via WhatsApp API        │
            │  (Twilio or WhatsApp Business)│
            └───────────────┬───────────────┘
                            │
                 ┌──────────┴──────────┐
                 │                     │
        Success ✅                Failure ❌
                 │                     │
                 ▼                     ▼
    ┌───────────────────┐  ┌──────────────────────┐
    │  Log Success       │  │  Add to Retry Queue  │
    │  Update DB         │  │  Status: Pending     │
    └───────────────────┘  └──────────┬───────────┘
                                       │
                            ⏱️ Wait 5 minutes
                                       │
                                       ▼
                        ┌──────────────────────────┐
                        │  Retry Attempt 1         │
                        └──────────┬───────────────┘
                                   │
                        ┌──────────┴──────────┐
                        │                     │
               Success ✅            Failure ❌
                        │                     │
                        ▼                     ▼
            ┌──────────────┐      ⏱️ Wait 15 minutes
            │  Log Success  │                │
            └──────────────┘                ▼
                                ┌──────────────────────┐
                                │  Retry Attempt 2      │
                                └──────────┬───────────┘
                                           │
                                ┌──────────┴──────────┐
                                │                     │
                       Success ✅            Failure ❌
                                │                     │
                                ▼                     ▼
                    ┌──────────────┐      ⏱️ Wait 60 minutes
                    │  Log Success  │                │
                    └──────────────┘                ▼
                                        ┌──────────────────────┐
                                        │  Retry Attempt 3      │
                                        │  (Final Attempt)      │
                                        └──────────┬───────────┘
                                                   │
                                        ┌──────────┴──────────┐
                                        │                     │
                               Success ✅            Failure ❌
                                        │                     │
                                        ▼                     ▼
                            ┌──────────────┐      ┌───────────────────┐
                            │  Log Success  │      │  Mark as Failed   │
                            └──────────────┘      │  Notify Admin     │
                                                   │  (via Notification│
                                                   │   Center)         │
                                                   └───────────────────┘
```

---

## 2. Acceptance Criteria

### AC 2.1: WhatsApp Group Configuration

**AC-001:** Admin can access WhatsApp Configuration page from admin navigation menu
**AC-002:** Table displays all Balagruhas with columns: Name, WhatsApp Number, Status, Last Sent, Actions
**AC-003:** Balagruhas without configured numbers show "Not Configured" with [Add] button
**AC-004:** Clicking [+ Add Group] button opens configuration modal
**AC-005:** Configuration modal pre-fills Balagruha name (read-only dropdown)
**AC-006:** Phone number input field validates international format (+XX XXXXXXXXXX)
**AC-007:** Error message displays if format invalid: "Please use format: +[country code] [number]"
**AC-008:** Optional Group Name field allows custom alias (max 50 chars)
**AC-009:** Status toggle: Active (messages sent) / Paused (messages not sent)
**AC-010:** "Send Test Message" button triggers test send to entered number

### AC 2.2: Test Send Functionality

**AC-011:** Test send button disabled until valid phone number entered
**AC-012:** Test message sent: "🧪 Test Message from ISF Playground\n\nIf you received this, your WhatsApp group is configured correctly!\n\nWeekly schedules will be sent every Monday at 8:00 AM IST."
**AC-013:** Success modal displays: "✅ Test Successful! Message sent to: [number]"
**AC-014:** Error modal displays specific error: Invalid format, Bot not in group, No permissions, API error
**AC-015:** Success state enables "Save Configuration" button
**AC-016:** Test send records attempt in audit log with timestamp and result

### AC 2.3: Data Storage and Security

**AC-017:** Phone numbers encrypted with AES-256 before storing in database
**AC-018:** Encryption key stored in environment variable (not in codebase)
**AC-019:** Only admins with "whatsapp_config" permission can view/edit numbers
**AC-020:** Phone numbers displayed as "+91 XXXXX 43210" (last 5 digits visible) in list view
**AC-021:** Full number visible only in edit modal
**AC-022:** Configuration changes logged in audit trail with admin ID, timestamp, action
**AC-023:** Deleted configurations soft-deleted (isDeleted flag) for audit trail

### AC 2.4: Automated Weekly Send

**AC-024:** Cron job runs every Monday at 8:00 AM IST (configured: `0 8 * * 1`)
**AC-025:** Fetches all Balagruhas where status = "Active" and whatsAppNumber exists
**AC-026:** For each Balagruha, generates schedule from course assignments
**AC-027:** Schedule includes: Course names, Modules/Chapters, Deadlines, Special notes
**AC-028:** Message formatted with emojis, bold text (*bold*), italic text (_italic_)
**AC-029:** Message header: "📅 *Weekly Schedule - [Date Range]* \n_[Balagruha Name]_"
**AC-030:** Message footer: "Keep up the great work! 🌟\n- ISF Playground Team"
**AC-031:** Character count checked before send (max 4096 chars for WhatsApp)
**AC-032:** If exceeds limit, truncate with "...and more. Check ISF App for full schedule."
**AC-033:** 2-second delay between sends to avoid rate limits
**AC-034:** Each send logged in WhatsAppDeliveryLogs collection

### AC 2.5: Schedule Generation Logic

**AC-035:** Query course assignments for Balagruha from CourseAssignments collection
**AC-036:** Include courses where assignedTo includes Balagruha ID
**AC-037:** Sort by weekday (Monday first) and then by course name
**AC-038:** Group activities by day of week (Monday, Tuesday, ... Sunday)
**AC-039:** Include course type emoji: 📚 (Computer Apps), 🎨 (Art), 🗣️ (Spoken English), 💡 (Life Skills)
**AC-040:** Include upcoming deadlines within next 7 days
**AC-041:** Include reminders for incomplete assignments
**AC-042:** Include ISF Coin earning opportunities
**AC-043:** If no activities for a day, display: "[Day] - Free study time"
**AC-044:** If Balagruha has no assigned courses, send generic message: "No scheduled activities this week. Stay tuned for updates!"

### AC 2.6: Retry Mechanism

**AC-045:** Failed sends automatically added to retry queue
**AC-046:** Retry attempt 1: After 5 minutes
**AC-047:** Retry attempt 2: After 15 minutes (from first attempt)
**AC-048:** Retry attempt 3: After 60 minutes (from first attempt)
**AC-049:** Each retry logs new delivery attempt in database
**AC-050:** After 3 failed attempts, status changes to "Failed"
**AC-051:** Admin notification created when send marked as "Failed"
**AC-052:** Notification message: "WhatsApp send failed for [Balagruha Name] after 3 attempts. Click to view details."
**AC-053:** Retry queue processes every 1 minute via separate cron job

### AC 2.7: Manual Send

**AC-054:** Admin can click [Send Now] button on configuration page
**AC-055:** Modal opens: "Send WhatsApp Schedule"
**AC-056:** Dropdown to select Balagruhas: All, Specific (multi-select)
**AC-057:** Date range picker for schedule period (default: upcoming week)
**AC-058:** Preview button generates and displays formatted message
**AC-059:** Preview shows character count and truncation warning if needed
**AC-060:** Confirm button triggers immediate send
**AC-061:** Progress indicator shows "Sending to [X] of [Y] groups..."
**AC-062:** Success message displays: "Sent successfully to [X] groups"
**AC-063:** Failed sends listed with error reasons
**AC-064:** Manual sends logged with "Manual" trigger type and admin ID

### AC 2.8: Delivery History Dashboard

**AC-065:** Delivery History page accessible from WhatsApp Configuration page
**AC-066:** Grouped by send date/time (most recent first)
**AC-067:** Each group shows: Date, Time, Success count, Total count, Status summary
**AC-068:** Expandable to show individual Balagruha delivery details
**AC-069:** Individual rows show: Balagruha Name, Phone Number (masked), Status, Timestamp, Actions
**AC-070:** Status icons: ✅ Sent, ❌ Failed, ⏳ Pending, 🔄 Retrying, ⏸️ Skipped
**AC-071:** Filter tabs: All, Success, Failed, Pending
**AC-072:** Date range picker filters by send date
**AC-073:** Search box filters by Balagruha name
**AC-074:** [View] button opens modal showing full message text that was sent
**AC-075:** [Resend] button triggers manual re-send to that specific group
**AC-076:** [Export CSV] downloads delivery report with columns: Date, Balagruha, Number, Status, Error (if any)

### AC 2.9: Error Handling

**AC-077:** Invalid phone number format error: "Please use format: +[country code] [number]. Example: +91 9876543210"
**AC-078:** WhatsApp API unavailable error: "WhatsApp service temporarily unavailable. Your message will be sent automatically when service resumes."
**AC-079:** Bot not in group error: "Bot is not a member of this WhatsApp group. Please add the ISF Bot first."
**AC-080:** Bot lacks permissions error: "Bot must be a group admin to send messages. Please promote ISF Bot to admin."
**AC-081:** Rate limit exceeded error: "Too many messages sent. Please wait and try again."
**AC-082:** Empty schedule error: "No courses assigned to this Balagruha. Please assign courses first."
**AC-083:** Network error: "Connection failed. Message queued for retry."
**AC-084:** All errors logged with full stack trace for debugging

### AC 2.10: Performance and Optimization

**AC-085:** Cron job completes 15 Balagruhas in < 2 minutes (2 sec per group + processing time)
**AC-086:** Database queries use indexes on balagruhaId, createdAt, status
**AC-087:** Schedule generation cached for 1 hour (same schedule re-used for retry attempts)
**AC-088:** Phone numbers decrypted only when needed (not loaded in bulk queries)
**AC-089:** Retry queue processes max 50 pending retries per cron run
**AC-090:** Delivery logs auto-archive after 90 days to separate collection

### AC 2.11: Accessibility and Usability

**AC-091:** All form inputs have clear labels
**AC-092:** Error messages displayed in-line below relevant fields
**AC-093:** Success/error modals have clear icons (✅ / ❌)
**AC-094:** Phone number input shows format example below field
**AC-095:** Test button has loading spinner during API call
**AC-096:** Configuration modal scrollable if content exceeds viewport
**AC-097:** Keyboard accessible: Tab navigation, Enter to submit, Escape to close modals
**AC-098:** Screen readers announce modal opening, errors, and success states

---

## 3. Technical Implementation Details

### 3.1 Frontend Components

#### WhatsAppConfigPage.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { PlusIcon, SearchIcon } from '@heroicons/react/outline';
import WhatsAppGroupModal from './WhatsAppGroupModal';
import { fetchWhatsAppGroups } from '../../services/whatsappService';

const WhatsAppConfigPage = () => {
  const [balagruhas, setBalagruhas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalGroups: 0,
    activeGroups: 0,
    nextSend: '',
    successRate: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBalagruha, setSelectedBalagruha] = useState(null);

  useEffect(() => {
    loadWhatsAppGroups();
    loadStats();
  }, []);

  const loadWhatsAppGroups = async () => {
    const data = await fetchWhatsAppGroups({ search: searchQuery });
    setBalagruhas(data);
  };

  const loadStats = async () => {
    // Fetch stats from API
  };

  const handleEdit = (balagruha) => {
    setSelectedBalagruha(balagruha);
    setIsModalOpen(true);
  };

  const handleAdd = (balagruha) => {
    setSelectedBalagruha({ ...balagruha, whatsAppNumber: '', status: 'active' });
    setIsModalOpen(true);
  };

  const maskPhoneNumber = (phone) => {
    if (!phone) return 'Not Configured';
    return phone.replace(/(\+\d{2})\s\d{5}(\d{5})/, '$1 XXXXX $2');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Title Bar */}
      <div className="h-[72px] bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">ISF Playground Admin - WhatsApp Configuration</h1>
      </div>

      {/* Toolbar */}
      <div className="h-[64px] bg-white border-b border-gray-200 px-6 py-3">
        {/* Navigation tabs */}
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">WhatsApp Schedule Integration</h2>
          <div className="flex gap-2">
            <button className="px-6 py-2 border border-gray-300 rounded-md font-semibold hover:bg-gray-50">
              View Delivery History
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              Add Group
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">📱 Total Groups</div>
            <div className="text-3xl font-bold">{stats.totalGroups}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">✅ Active</div>
            <div className="text-3xl font-bold">{stats.activeGroups}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">⏳ Next Send</div>
            <div className="text-lg font-bold">{stats.nextSend}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">📊 Success Rate</div>
            <div className="text-3xl font-bold">{stats.successRate}%</div>
          </div>
        </div>

        {/* Search and Table */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-6 py-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Balagruha Groups</h3>
            <div className="relative">
              <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Balagruha Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">WhatsApp Number</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Sent</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {balagruhas.map(bg => (
                  <tr key={bg._id} className="border-b border-gray-100">
                    <td className="px-6 py-4">{bg.name}</td>
                    <td className="px-6 py-4 font-mono text-sm">{maskPhoneNumber(bg.whatsAppNumber)}</td>
                    <td className="px-6 py-4">
                      {bg.status === 'active' ? (
                        <span className="text-green-600 font-semibold">✅ Active</span>
                      ) : bg.status === 'paused' ? (
                        <span className="text-yellow-600 font-semibold">⏸️ Paused</span>
                      ) : (
                        <span className="text-gray-500 font-semibold">⚠️ None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {bg.lastSent ? new Date(bg.lastSent).toLocaleString('en-IN') : '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {bg.whatsAppNumber ? (
                        <>
                          <button className="px-3 py-1 border border-gray-300 rounded text-sm mx-1">Test</button>
                          <button
                            onClick={() => handleEdit(bg)}
                            className="px-3 py-1 border border-gray-300 rounded text-sm mx-1"
                          >
                            Edit
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleAdd(bg)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm mx-1"
                        >
                          Add
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <WhatsAppGroupModal
          balagruha={selectedBalagruha}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBalagruha(null);
          }}
          onSuccess={() => {
            setIsModalOpen(false);
            setSelectedBalagruha(null);
            loadWhatsAppGroups();
          }}
        />
      )}
    </div>
  );
};

export default WhatsAppConfigPage;
```

**File Path:** `frontend/src/components/admin/whatsapp/WhatsAppConfigPage.jsx`

---

#### WhatsAppGroupModal.jsx
```jsx
import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { saveWhatsAppGroup, testWhatsAppSend } from '../../services/whatsappService';

const WhatsAppGroupModal = ({ balagruha, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    balagruhaId: balagruha._id,
    whatsAppNumber: balagruha.whatsAppNumber || '',
    groupName: balagruha.groupName || '',
    status: balagruha.status || 'active'
  });
  const [errors, setErrors] = useState({});
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+\d{1,3}\s?\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, whatsAppNumber: value });

    if (value && !validatePhoneNumber(value)) {
      setErrors({ ...errors, phone: 'Please use format: +[country code] [number]. Example: +91 9876543210' });
    } else {
      const { phone, ...rest } = errors;
      setErrors(rest);
    }
  };

  const handleTestSend = async () => {
    if (!validatePhoneNumber(formData.whatsAppNumber)) {
      setErrors({ ...errors, phone: 'Invalid phone number format' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const result = await testWhatsAppSend({
        phoneNumber: formData.whatsAppNumber,
        balagruhaName: balagruha.name
      });

      setTestResult({
        success: true,
        message: `Test message sent successfully to ${formData.whatsAppNumber}`,
        timestamp: new Date().toLocaleTimeString('en-IN')
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: error.message || 'Failed to send test message',
        details: error.details
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = async () => {
    if (!validatePhoneNumber(formData.whatsAppNumber)) {
      setErrors({ phone: 'Please enter a valid phone number' });
      return;
    }

    setIsSaving(true);
    try {
      await saveWhatsAppGroup(formData);
      onSuccess();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="h-[60px] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Configure WhatsApp Group</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Balagruha Name (Read-only) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Balagruha</label>
            <input
              type="text"
              value={balagruha.name}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          {/* WhatsApp Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Group Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.whatsAppNumber}
              onChange={handlePhoneChange}
              placeholder="+91 9876543210"
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone ? (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            ) : (
              <p className="text-xs text-gray-500 mt-1">
                Format: +[country code] [phone number]<br/>
                Example: +91 9876543210
              </p>
            )}
          </div>

          {/* Group Name (Optional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Name (Optional)
            </label>
            <input
              type="text"
              value={formData.groupName}
              onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
              placeholder="Vijayawada - Weekly Updates"
              maxLength={50}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.status === 'active'}
                  onChange={() => setFormData({ ...formData, status: 'active' })}
                  className="w-4 h-4"
                />
                <span>Active</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formData.status === 'paused'}
                  onChange={() => setFormData({ ...formData, status: 'paused' })}
                  className="w-4 h-4"
                />
                <span>Paused</span>
              </label>
            </div>
          </div>

          {/* Test Message Section */}
          <div className="border-l-4 border-blue-500 bg-blue-50 rounded p-4 mb-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-blue-900">ℹ️ Test Message</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Before saving, send a test message to verify the number is correct and the bot has access to the group.
                </p>
              </div>
            </div>
            <button
              onClick={handleTestSend}
              disabled={isTesting || !formData.whatsAppNumber || !!errors.phone}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isTesting ? 'Sending...' : 'Send Test Message'}
            </button>
          </div>

          {/* Test Result */}
          {testResult && (
            <div className={`border-l-4 rounded p-4 mb-4 ${
              testResult.success
                ? 'border-green-500 bg-green-50'
                : 'border-red-500 bg-red-50'
            }`}>
              <h4 className={`font-semibold ${testResult.success ? 'text-green-900' : 'text-red-900'}`}>
                {testResult.success ? '✅ Test Successful!' : '❌ Send Failed'}
              </h4>
              <p className={`text-sm mt-1 ${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
                {testResult.message}
              </p>
              {testResult.timestamp && (
                <p className="text-xs text-gray-600 mt-1">Sent at: {testResult.timestamp}</p>
              )}
              {testResult.details && (
                <ul className="text-sm text-red-800 mt-2 list-disc list-inside">
                  {testResult.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Warning */}
          <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded p-4">
            <h4 className="font-semibold text-yellow-900">⚠️ Important Notes:</h4>
            <ul className="text-sm text-yellow-800 mt-2 space-y-1">
              <li>• Add the ISF Bot to your WhatsApp group first</li>
              <li>• Bot must be group admin to send messages</li>
              <li>• Phone number is encrypted and stored securely</li>
              <li>• Only ISF Admins can view/edit this configuration</li>
            </ul>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {errors.submit}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !!errors.phone || !formData.whatsAppNumber}
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppGroupModal;
```

**File Path:** `frontend/src/components/admin/whatsapp/WhatsAppGroupModal.jsx`

---

#### SchedulePreviewModal.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { generateSchedulePreview } from '../../services/whatsappService';

const SchedulePreviewModal = ({ balagruha, dateRange, onClose, onSend }) => {
  const [scheduleText, setScheduleText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreview();
  }, []);

  const loadPreview = async () => {
    setLoading(true);
    try {
      const preview = await generateSchedulePreview({
        balagruhaId: balagruha._id,
        startDate: dateRange.start,
        endDate: dateRange.end
      });
      setScheduleText(preview.message);
      setCharCount(preview.message.length);
    } catch (error) {
      console.error('Preview generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[700px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="h-[60px] px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Preview WhatsApp Message</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-sm text-gray-600 mb-2">Sending to: {balagruha.name}</div>
          <div className="text-sm text-gray-600 mb-4">Phone: {balagruha.whatsAppNumber}</div>

          <div className="border border-gray-300 rounded-lg bg-gray-100 p-2 mb-2 flex justify-between items-center">
            <span className="text-sm font-semibold">Message Preview</span>
            <span className={`text-xs ${charCount > 4000 ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
              {charCount} / 4,096 chars
            </span>
          </div>

          {loading ? (
            <div className="h-[380px] flex items-center justify-center">
              <div className="text-gray-500">Generating preview...</div>
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg bg-gray-50 p-6 h-[380px] overflow-y-auto font-mono text-sm whitespace-pre-wrap">
              {scheduleText}
            </div>
          )}

          {charCount > 4096 && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
              ⚠️ Message exceeds WhatsApp limit. It will be truncated with "...and more. Check ISF App for full schedule."
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button className="px-6 py-2 border border-gray-300 rounded-md font-semibold hover:bg-gray-50">
            Edit Template
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onSend(scheduleText)}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
            >
              Send Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePreviewModal;
```

**File Path:** `frontend/src/components/admin/whatsapp/SchedulePreviewModal.jsx`

---

### 3.2 Backend Implementation

#### whatsappController.js
```javascript
const WhatsAppGroup = require('../models/WhatsAppGroup');
const WhatsAppDeliveryLog = require('../models/WhatsAppDeliveryLog');
const Balagruha = require('../models/Balagruha');
const CourseAssignment = require('../models/CourseAssignment');
const Course = require('../models/Course');
const { encryptData, decryptData } = require('../utils/encryption');
const { sendWhatsAppMessage } = require('../services/twilioService');
const { generateWeeklySchedule } = require('../services/scheduleGenerator');

// Save WhatsApp group configuration
exports.saveWhatsAppGroup = async (req, res) => {
  try {
    const { balagruhaId, whatsAppNumber, groupName, status } = req.body;
    const adminId = req.user._id;

    // Validate phone number format
    const phoneRegex = /^\+\d{1,3}\s?\d{10}$/;
    if (!phoneRegex.test(whatsAppNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format. Use: +[country code] [number]'
      });
    }

    // Encrypt phone number
    const encryptedNumber = encryptData(whatsAppNumber);

    // Check if configuration exists
    let whatsappGroup = await WhatsAppGroup.findOne({ balagruhaId });

    if (whatsappGroup) {
      // Update existing
      whatsappGroup.whatsAppNumber = encryptedNumber;
      whatsappGroup.groupName = groupName;
      whatsappGroup.status = status;
      whatsappGroup.lastModifiedBy = adminId;
      await whatsappGroup.save();
    } else {
      // Create new
      whatsappGroup = new WhatsAppGroup({
        balagruhaId,
        whatsAppNumber: encryptedNumber,
        groupName,
        status,
        createdBy: adminId,
        lastModifiedBy: adminId
      });
      await whatsappGroup.save();
    }

    res.json({
      success: true,
      message: 'WhatsApp group configured successfully',
      group: {
        ...whatsappGroup.toObject(),
        whatsAppNumber: whatsAppNumber // Return unencrypted for display
      }
    });
  } catch (error) {
    console.error('Save WhatsApp group error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all WhatsApp groups
exports.fetchWhatsAppGroups = async (req, res) => {
  try {
    const { search } = req.query;

    const balagruhas = await Balagruha.find({ isActive: true });
    const whatsappGroups = await WhatsAppGroup.find({ isDeleted: false });

    // Map Balagruhas with WhatsApp config
    const results = balagruhas.map(bg => {
      const whatsappConfig = whatsappGroups.find(wg => wg.balagruhaId.toString() === bg._id.toString());

      return {
        _id: bg._id,
        name: bg.name,
        whatsAppNumber: whatsappConfig
          ? decryptData(whatsappConfig.whatsAppNumber)
          : null,
        groupName: whatsappConfig?.groupName,
        status: whatsappConfig?.status || 'none',
        lastSent: whatsappConfig?.lastSentAt,
        configId: whatsappConfig?._id
      };
    });

    // Filter by search
    const filtered = search
      ? results.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
      : results;

    res.json({
      success: true,
      balagruhas: filtered
    });
  } catch (error) {
    console.error('Fetch WhatsApp groups error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Test send WhatsApp message
exports.testWhatsAppSend = async (req, res) => {
  try {
    const { phoneNumber, balagruhaName } = req.body;

    const testMessage = `🧪 Test Message from ISF Playground\n\nIf you received this, your WhatsApp group is configured correctly!\n\nWeekly schedules will be sent every Monday at 8:00 AM IST.\n\n- ISF Playground Team`;

    const result = await sendWhatsAppMessage(phoneNumber, testMessage);

    if (result.success) {
      res.json({
        success: true,
        message: 'Test message sent successfully',
        timestamp: new Date()
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.error,
        details: result.details
      });
    }
  } catch (error) {
    console.error('Test send error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send test message',
      details: [error.message]
    });
  }
};

// Generate schedule preview
exports.generateSchedulePreview = async (req, res) => {
  try {
    const { balagruhaId, startDate, endDate } = req.body;

    const balagruha = await Balagruha.findById(balagruhaId);
    if (!balagruha) {
      return res.status(404).json({ success: false, message: 'Balagruha not found' });
    }

    const scheduleMessage = await generateWeeklySchedule(balagruhaId, startDate, endDate);

    res.json({
      success: true,
      message: scheduleMessage,
      charCount: scheduleMessage.length
    });
  } catch (error) {
    console.error('Generate preview error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Send schedule now (manual trigger)
exports.sendScheduleNow = async (req, res) => {
  try {
    const { balagruhaIds, startDate, endDate } = req.body;
    const adminId = req.user._id;

    const results = [];

    for (const balagruhaId of balagruhaIds) {
      const whatsappGroup = await WhatsAppGroup.findOne({ balagruhaId, status: 'active' });

      if (!whatsappGroup) {
        results.push({ balagruhaId, success: false, error: 'Not configured or inactive' });
        continue;
      }

      const phoneNumber = decryptData(whatsappGroup.whatsAppNumber);
      const scheduleMessage = await generateWeeklySchedule(balagruhaId, startDate, endDate);

      const sendResult = await sendWhatsAppMessage(phoneNumber, scheduleMessage);

      // Log delivery
      await WhatsAppDeliveryLog.create({
        balagruhaId,
        whatsAppGroupId: whatsappGroup._id,
        message: scheduleMessage,
        status: sendResult.success ? 'sent' : 'failed',
        sentAt: sendResult.success ? new Date() : null,
        errorMessage: sendResult.success ? null : sendResult.error,
        triggerType: 'manual',
        triggeredBy: adminId
      });

      if (sendResult.success) {
        whatsappGroup.lastSentAt = new Date();
        await whatsappGroup.save();
      }

      results.push({
        balagruhaId,
        success: sendResult.success,
        error: sendResult.error
      });

      // Delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const successCount = results.filter(r => r.success).length;

    res.json({
      success: true,
      message: `Sent to ${successCount} of ${results.length} groups`,
      results
    });
  } catch (error) {
    console.error('Send schedule now error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch delivery history
exports.fetchDeliveryHistory = async (req, res) => {
  try {
    const { status, startDate, endDate, balagruhaId } = req.query;

    let query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (startDate && endDate) {
      query.sentAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (balagruhaId) {
      query.balagruhaId = balagruhaId;
    }

    const logs = await WhatsAppDeliveryLog.find(query)
      .sort({ createdAt: -1 })
      .limit(100)
      .populate('balagruhaId', 'name')
      .populate('whatsAppGroupId', 'whatsAppNumber');

    // Group by date
    const grouped = logs.reduce((acc, log) => {
      const date = log.sentAt ? log.sentAt.toISOString().split('T')[0] : 'pending';
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        ...log.toObject(),
        balagruhaName: log.balagruhaId.name,
        phoneNumber: log.whatsAppGroupId
          ? decryptData(log.whatsAppGroupId.whatsAppNumber)
          : 'Not configured'
      });
      return acc;
    }, {});

    res.json({
      success: true,
      deliveries: grouped
    });
  } catch (error) {
    console.error('Fetch delivery history error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = exports;
```

**File Path:** `backend/controllers/whatsappController.js`

---

#### scheduleGenerator.js (Service)
```javascript
const CourseAssignment = require('../models/CourseAssignment');
const Course = require('../models/Course');
const Balagruha = require('../models/Balagruha');

const courseEmojis = {
  'Computer Apps': '📚',
  'Art': '🎨',
  'Spoken English': '🗣️',
  'Life Skills': '💡'
};

const generateWeeklySchedule = async (balagruhaId, startDate, endDate) => {
  const balagruha = await Balagruha.findById(balagruhaId);
  const start = startDate ? new Date(startDate) : getNextMonday();
  const end = endDate ? new Date(endDate) : new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);

  // Fetch course assignments
  const assignments = await CourseAssignment.find({
    assignedTo: { $in: [balagruhaId] },
    isActive: true
  }).populate('courseId');

  if (assignments.length === 0) {
    return `📅 *Weekly Schedule - ${formatDate(start)} to ${formatDate(end)}*\n_${balagruha.name}_\n\nDear Students and Coaches! 🙏\n\nNo scheduled activities this week. Stay tuned for updates!\n\n- ISF Playground Team`;
  }

  // Build schedule message
  let message = `📅 *Weekly Schedule - ${formatDate(start)} to ${formatDate(end)}*\n`;
  message += `_${balagruha.name}_\n\n`;
  message += `Dear Students and Coaches! 🙏\n\n`;
  message += `Here's your schedule for the upcoming week:\n\n`;

  // Group by day
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    const dayName = days[currentDay.getDay() === 0 ? 6 : currentDay.getDay() - 1];

    message += `*${dayName}, ${formatDate(currentDay)}*\n`;

    const dayAssignments = assignments.filter(a => {
      // Simple logic: distribute courses across the week
      return true; // In production, check actual schedule data
    });

    if (dayAssignments.length > 0) {
      dayAssignments.forEach(assignment => {
        const course = assignment.courseId;
        const emoji = courseEmojis[course.category] || '📖';
        message += `${emoji} ${course.title} - ${assignment.currentModule || 'Continue Learning'}\n`;
      });
    } else {
      message += `Free study time\n`;
    }

    message += `\n`;
  }

  // Add reminders
  message += `📌 *Important Reminders:*\n`;
  message += `• Complete all pending assignments by Wednesday\n`;
  message += `• Earn ISF Coins by finishing modules on time! 💰\n`;
  message += `• Need help? Contact your coach anytime\n\n`;

  message += `Keep up the great work! 🌟\n`;
  message += `- ISF Playground Team`;

  // Truncate if too long
  if (message.length > 4096) {
    message = message.substring(0, 4000) + '\n\n...and more. Check ISF App for full schedule.';
  }

  return message;
};

const getNextMonday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  const nextMonday = new Date(today.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000);
  nextMonday.setHours(0, 0, 0, 0);
  return nextMonday;
};

const formatDate = (date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

module.exports = { generateWeeklySchedule };
```

**File Path:** `backend/services/scheduleGenerator.js`

---

#### twilioService.js (WhatsApp API Integration)
```javascript
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsAppMessage = async (phoneNumber, message) => {
  try {
    const result = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phoneNumber}`,
      body: message
    });

    return {
      success: true,
      messageId: result.sid,
      status: result.status
    };
  } catch (error) {
    console.error('Twilio send error:', error);

    let errorDetails = [];
    if (error.code === 21211) {
      errorDetails.push('Invalid phone number format');
    } else if (error.code === 21408) {
      errorDetails.push('Bot is not a member of this WhatsApp group');
      errorDetails.push('Please add the ISF Bot to the group first');
    } else if (error.code === 21610) {
      errorDetails.push('Bot does not have permission to send messages');
      errorDetails.push('Please promote ISF Bot to group admin');
    } else if (error.code === 29429) {
      errorDetails.push('Rate limit exceeded - too many messages sent');
    } else {
      errorDetails.push(error.message);
    }

    return {
      success: false,
      error: error.message,
      details: errorDetails
    };
  }
};

module.exports = { sendWhatsAppMessage };
```

**File Path:** `backend/services/twilioService.js`

---

#### scheduledWhatsAppCron.js (Cron Job)
```javascript
const cron = require('node-cron');
const WhatsAppGroup = require('../models/WhatsAppGroup');
const WhatsAppDeliveryLog = require('../models/WhatsAppDeliveryLog');
const Balagruha = require('../models/Balagruha');
const { decryptData } = require('../utils/encryption');
const { sendWhatsAppMessage } = require('../services/twilioService');
const { generateWeeklySchedule } = require('../services/scheduleGenerator');

// Run every Monday at 8:00 AM IST
// Cron format: minute hour day month weekday
const scheduledWhatsAppJob = cron.schedule('0 8 * * 1', async () => {
  try {
    console.log('Starting weekly WhatsApp schedule send...');

    const activeGroups = await WhatsAppGroup.find({
      status: 'active',
      isDeleted: false
    }).populate('balagruhaId');

    console.log(`Found ${activeGroups.length} active WhatsApp groups`);

    for (const group of activeGroups) {
      try {
        const balagruha = group.balagruhaId;
        if (!balagruha) {
          console.log(`Balagruha not found for group ${group._id}`);
          continue;
        }

        console.log(`Processing: ${balagruha.name}`);

        // Generate schedule
        const scheduleMessage = await generateWeeklySchedule(balagruha._id);

        // Decrypt phone number
        const phoneNumber = decryptData(group.whatsAppNumber);

        // Send message
        const result = await sendWhatsAppMessage(phoneNumber, scheduleMessage);

        // Log delivery
        const deliveryLog = await WhatsAppDeliveryLog.create({
          balagruhaId: balagruha._id,
          whatsAppGroupId: group._id,
          message: scheduleMessage,
          status: result.success ? 'sent' : 'failed',
          sentAt: result.success ? new Date() : null,
          errorMessage: result.success ? null : result.error,
          triggerType: 'automated',
          retryCount: 0
        });

        if (result.success) {
          group.lastSentAt = new Date();
          await group.save();
          console.log(`✅ Sent to ${balagruha.name}`);
        } else {
          console.log(`❌ Failed to send to ${balagruha.name}: ${result.error}`);
          // Add to retry queue
          await addToRetryQueue(deliveryLog._id);
        }

        // Delay 2 seconds between sends
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        console.error(`Error processing group ${group._id}:`, error);
      }
    }

    console.log('Weekly WhatsApp send completed');

  } catch (error) {
    console.error('Scheduled WhatsApp job error:', error);
  }
}, {
  timezone: 'Asia/Kolkata'
});

// Retry failed sends
const retryFailedSendsJob = cron.schedule('*/1 * * * *', async () => {
  try {
    const now = new Date();

    // Find failed deliveries ready for retry
    const failedLogs = await WhatsAppDeliveryLog.find({
      status: 'failed',
      retryCount: { $lt: 3 },
      $or: [
        { nextRetryAt: { $lte: now } },
        { nextRetryAt: null }
      ]
    }).populate('balagruhaId whatsAppGroupId').limit(50);

    for (const log of failedLogs) {
      try {
        if (!log.whatsAppGroupId) continue;

        const phoneNumber = decryptData(log.whatsAppGroupId.whatsAppNumber);
        const result = await sendWhatsAppMessage(phoneNumber, log.message);

        log.retryCount += 1;
        log.lastRetryAt = new Date();

        if (result.success) {
          log.status = 'sent';
          log.sentAt = new Date();
          console.log(`✅ Retry successful for ${log.balagruhaId.name}`);
        } else {
          if (log.retryCount >= 3) {
            log.status = 'failed';
            console.log(`❌ Max retries reached for ${log.balagruhaId.name}`);
            // TODO: Notify admin via notification center
          } else {
            // Schedule next retry with exponential backoff
            const delays = [5, 15, 60]; // minutes
            const delayMinutes = delays[log.retryCount - 1];
            log.nextRetryAt = new Date(now.getTime() + delayMinutes * 60 * 1000);
          }
        }

        await log.save();

      } catch (error) {
        console.error(`Error retrying delivery ${log._id}:`, error);
      }
    }

  } catch (error) {
    console.error('Retry failed sends job error:', error);
  }
});

const addToRetryQueue = async (deliveryLogId) => {
  const log = await WhatsAppDeliveryLog.findById(deliveryLogId);
  if (log) {
    log.nextRetryAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await log.save();
  }
};

module.exports = { scheduledWhatsAppJob, retryFailedSendsJob };
```

**File Path:** `backend/cron/scheduledWhatsAppCron.js`

---

### 3.3 MongoDB Schemas

#### WhatsAppGroup Schema
```javascript
const mongoose = require('mongoose');

const WhatsAppGroupSchema = new mongoose.Schema({
  balagruhaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Balagruha',
    required: true,
    unique: true
  },
  whatsAppNumber: {
    type: String, // Encrypted
    required: true
  },
  groupName: {
    type: String,
    maxlength: 50
  },
  status: {
    type: String,
    enum: ['active', 'paused'],
    default: 'active'
  },
  lastSentAt: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
WhatsAppGroupSchema.index({ balagruhaId: 1 });
WhatsAppGroupSchema.index({ status: 1, isDeleted: 1 });

module.exports = mongoose.model('WhatsAppGroup', WhatsAppGroupSchema);
```

**File Path:** `backend/models/WhatsAppGroup.js`

---

#### WhatsAppDeliveryLog Schema
```javascript
const mongoose = require('mongoose');

const WhatsAppDeliveryLogSchema = new mongoose.Schema({
  balagruhaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Balagruha',
    required: true
  },
  whatsAppGroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WhatsAppGroup',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['sent', 'failed', 'pending'],
    default: 'pending'
  },
  sentAt: {
    type: Date
  },
  errorMessage: {
    type: String
  },
  triggerType: {
    type: String,
    enum: ['automated', 'manual', 'test'],
    required: true
  },
  triggeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  retryCount: {
    type: Number,
    default: 0
  },
  nextRetryAt: {
    type: Date
  },
  lastRetryAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
WhatsAppDeliveryLogSchema.index({ balagruhaId: 1, createdAt: -1 });
WhatsAppDeliveryLogSchema.index({ status: 1, nextRetryAt: 1 });
WhatsAppDeliveryLogSchema.index({ sentAt: -1 });

module.exports = mongoose.model('WhatsAppDeliveryLog', WhatsAppDeliveryLogSchema);
```

**File Path:** `backend/models/WhatsAppDeliveryLog.js`

---

### 3.4 API Endpoints

#### POST /api/v2/whatsapp/configure
Save WhatsApp group configuration.

**Request:**
```json
{
  "balagruhaId": "670bg001",
  "whatsAppNumber": "+91 9876543210",
  "groupName": "Vijayawada - Weekly Updates",
  "status": "active"
}
```

**Response:**
```json
{
  "success": true,
  "message": "WhatsApp group configured successfully",
  "group": {
    "_id": "673whatsapp123",
    "balagruhaId": "670bg001",
    "whatsAppNumber": "+91 9876543210",
    "groupName": "Vijayawada - Weekly Updates",
    "status": "active",
    "createdAt": "2025-10-24T16:00:00.000Z"
  }
}
```

---

#### GET /api/v2/whatsapp/groups
Fetch all WhatsApp group configurations.

**Query Parameters:**
- `search`: Filter by Balagruha name

**Response:**
```json
{
  "success": true,
  "balagruhas": [
    {
      "_id": "670bg001",
      "name": "Balagruha Vijayawada",
      "whatsAppNumber": "+91 9876543210",
      "groupName": "Vijayawada - Weekly Updates",
      "status": "active",
      "lastSent": "2025-10-21T08:00:12.000Z"
    }
  ]
}
```

---

#### POST /api/v2/whatsapp/test-send
Send test message to WhatsApp group.

**Request:**
```json
{
  "phoneNumber": "+91 9876543210",
  "balagruhaName": "Balagruha Vijayawada"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Test message sent successfully",
  "timestamp": "2025-10-24T10:45:23.000Z"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Bot is not a member of this WhatsApp group",
  "details": [
    "Bot is not a member of this WhatsApp group",
    "Please add the ISF Bot to the group first"
  ]
}
```

---

#### POST /api/v2/whatsapp/preview
Generate schedule preview.

**Request:**
```json
{
  "balagruhaId": "670bg001",
  "startDate": "2025-10-21",
  "endDate": "2025-10-27"
}
```

**Response:**
```json
{
  "success": true,
  "message": "📅 *Weekly Schedule - Oct 21-27, 2025*\n_Balagruha Vijayawada_\n\nDear Students and Coaches! 🙏\n\n...",
  "charCount": 1247
}
```

---

#### POST /api/v2/whatsapp/send-now
Manually trigger schedule send.

**Request:**
```json
{
  "balagruhaIds": ["670bg001", "670bg002"],
  "startDate": "2025-10-21",
  "endDate": "2025-10-27"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Sent to 2 of 2 groups",
  "results": [
    {
      "balagruhaId": "670bg001",
      "success": true
    },
    {
      "balagruhaId": "670bg002",
      "success": true
    }
  ]
}
```

---

#### GET /api/v2/whatsapp/delivery-history
Fetch delivery history.

**Query Parameters:**
- `status`: all | sent | failed | pending
- `startDate`: ISO date string
- `endDate`: ISO date string
- `balagruhaId`: Filter by Balagruha

**Response:**
```json
{
  "success": true,
  "deliveries": {
    "2025-10-21": [
      {
        "_id": "673log001",
        "balagruhaName": "Balagruha Vijayawada",
        "phoneNumber": "+91 9876543210",
        "status": "sent",
        "sentAt": "2025-10-21T08:00:12.000Z",
        "triggerType": "automated"
      }
    ]
  }
}
```

---

### 3.5 Encryption Utility

```javascript
// utils/encryption.js
const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 bytes
const IV_LENGTH = 16;

const encryptData = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decryptData = (text) => {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

module.exports = { encryptData, decryptData };
```

**File Path:** `backend/utils/encryption.js`

---

## 4. Task Breakdown

### Phase 1: Backend Foundation (5-6 hours)

**Task 4.1.1:** Create WhatsAppGroup and WhatsAppDeliveryLog MongoDB schemas
- Define WhatsAppGroup schema (balagruhaId, whatsAppNumber encrypted, groupName, status)
- Define WhatsAppDeliveryLog schema (balagruhaId, message, status, triggerType, retryCount)
- Add indexes for performance
- **Estimated Time:** 45 minutes

**Task 4.1.2:** Implement encryption utility
- Create encryptData and decryptData functions using AES-256-CBC
- Generate and store ENCRYPTION_KEY in environment variables
- Test encryption/decryption with sample phone numbers
- **Estimated Time:** 30 minutes

**Task 4.1.3:** Integrate Twilio WhatsApp API
- Install Twilio SDK
- Create twilioService.js with sendWhatsAppMessage function
- Handle Twilio error codes (21211, 21408, 21610, 29429)
- Test with Twilio sandbox
- **Estimated Time:** 1.5 hours

**Task 4.1.4:** Create schedule generator service
- Implement generateWeeklySchedule function
- Fetch course assignments for Balagruha
- Format message with emojis and markdown
- Handle empty schedules
- Implement truncation for 4096 char limit
- **Estimated Time:** 2 hours

**Task 4.1.5:** Implement whatsappController endpoints
- saveWhatsAppGroup: Validate phone, encrypt, save to DB
- fetchWhatsAppGroups: Fetch with decryption
- testWhatsAppSend: Send test message
- generateSchedulePreview: Preview schedule
- sendScheduleNow: Manual trigger
- fetchDeliveryHistory: Fetch logs with grouping
- **Estimated Time:** 2 hours

---

### Phase 2: Automated Cron Jobs (2-3 hours)

**Task 4.2.1:** Create scheduled WhatsApp send cron job
- Set up cron schedule: Every Monday 8:00 AM IST
- Fetch active WhatsApp groups
- Generate schedule for each Balagruha
- Send with 2-second delay between sends
- Log all deliveries
- **Estimated Time:** 1.5 hours

**Task 4.2.2:** Implement retry mechanism cron job
- Create retry job running every minute
- Find failed deliveries ready for retry
- Implement exponential backoff (5 min, 15 min, 60 min)
- Update retry count and status
- Notify admin after 3 failed attempts
- **Estimated Time:** 1.5 hours

---

### Phase 3: Frontend Configuration UI (3-4 hours)

**Task 4.3.1:** Create WhatsAppConfigPage component
- Build main layout with stats cards
- Display Balagruha table with WhatsApp status
- Implement search functionality
- Mask phone numbers in list view
- Add action buttons (Test, Edit, Add)
- **Estimated Time:** 1.5 hours

**Task 4.3.2:** Create WhatsAppGroupModal component
- Build configuration form with validation
- Implement phone number format validation
- Create test send functionality
- Display test result (success/error) with specific messages
- Handle save with encryption
- **Estimated Time:** 2 hours

**Task 4.3.3:** Create SchedulePreviewModal component
- Generate and display formatted schedule preview
- Show character count with warning if > 4096
- Implement send functionality
- Handle loading state
- **Estimated Time:** 1 hour

---

### Phase 4: Delivery History Dashboard (2-3 hours)

**Task 4.4.1:** Create DeliveryHistoryPage component
- Build grouped timeline view by date
- Display individual delivery status
- Implement filter tabs (All, Success, Failed, Pending)
- Add date range picker
- Show expandable details per send
- **Estimated Time:** 2 hours

**Task 4.4.2:** Implement resend and export functionality
- Add resend button for failed deliveries
- Generate CSV export of delivery logs
- Add view message modal
- **Estimated Time:** 1 hour

---

### Phase 5: Testing and Polish (2-3 hours)

**Task 4.5.1:** End-to-end testing
- Test WhatsApp group configuration flow
- Test phone number validation
- Test send functionality with real WhatsApp group
- Verify encryption/decryption
- Test cron job manually (change time temporarily)
- Verify retry mechanism
- **Estimated Time:** 1.5 hours

**Task 4.5.2:** Error handling and edge cases
- Test invalid phone formats
- Test bot not in group error
- Test rate limit handling
- Test empty schedule scenario
- Test character limit truncation
- **Estimated Time:** 1 hour

**Task 4.5.3:** Documentation and deployment
- Document Twilio setup process
- Add environment variable documentation
- Write deployment checklist (cron job setup)
- Add troubleshooting guide
- **Estimated Time:** 30 minutes

---

## 5. Definition of Done

### 5.1 Functional Completeness
- [ ] Admin can configure WhatsApp group number for each Balagruha
- [ ] Phone numbers validated for international format (+XX XXXXXXXXXX)
- [ ] Test send functionality works with success/error feedback
- [ ] Configuration saved with encrypted phone number
- [ ] Status toggle (Active/Paused) controls whether messages sent
- [ ] Automated cron job runs every Monday 8:00 AM IST
- [ ] Weekly schedule generated from course assignments
- [ ] Schedule message formatted with emojis and markdown
- [ ] Messages sent via Twilio WhatsApp API with 2-second delays
- [ ] Delivery status logged in database
- [ ] Failed sends automatically retry (3 attempts with exponential backoff)
- [ ] Admin notified after max retries exceeded
- [ ] Manual send functionality works for selected Balagruhas
- [ ] Schedule preview shows exact message with character count
- [ ] Delivery history dashboard displays grouped timeline
- [ ] Export delivery history as CSV

### 5.2 Technical Requirements
- [ ] MongoDB schemas: WhatsAppGroup, WhatsAppDeliveryLog created
- [ ] Phone numbers encrypted with AES-256-CBC
- [ ] Encryption key stored in environment variable
- [ ] Twilio WhatsApp API integrated
- [ ] All Twilio error codes handled with user-friendly messages
- [ ] Schedule generator service creates formatted messages
- [ ] Character limit (4096) enforced with truncation
- [ ] Cron jobs set up: Weekly send + Retry mechanism
- [ ] All API endpoints implemented (6 endpoints)
- [ ] Database indexes optimize queries
- [ ] React components follow functional patterns with hooks

### 5.3 UI/UX Requirements
- [ ] WhatsApp Config page matches design (1366x768)
- [ ] Stats cards show: Total Groups, Active, Next Send, Success Rate
- [ ] Phone numbers masked in list view (+91 XXXXX 43210)
- [ ] Full numbers visible only in edit modal
- [ ] Configuration modal 600x500 with all fields
- [ ] Test send button disabled until valid number entered
- [ ] Test result modal shows success (✅) or error (❌) with details
- [ ] Schedule preview modal 700x600 with scrollable message
- [ ] Character count warning displayed if > 4000 characters
- [ ] Delivery history grouped by date with status icons
- [ ] Status icons: ✅ Sent, ❌ Failed, ⏳ Pending, 🔄 Retrying

### 5.4 Security
- [ ] Phone numbers encrypted before storing in database
- [ ] Decryption only when needed (not in bulk queries)
- [ ] Encryption key never exposed in codebase
- [ ] RBAC: Only admins with whatsapp_config permission can access
- [ ] Audit log tracks all configuration changes
- [ ] Soft delete for configurations (isDeleted flag)
- [ ] Twilio credentials stored in environment variables
- [ ] Rate limiting prevents API abuse

### 5.5 Performance
- [ ] Cron job completes 15 groups in < 2 minutes
- [ ] 2-second delay between sends prevents rate limits
- [ ] Schedule generation cached for retry attempts
- [ ] Database queries use indexes (balagruhaId, status, createdAt)
- [ ] Retry queue processes max 50 pending per run
- [ ] Delivery logs auto-archive after 90 days

### 5.6 Error Handling
- [ ] Invalid phone format error displayed inline
- [ ] Bot not in group error with actionable steps
- [ ] Bot lacks permissions error explains admin promotion
- [ ] Rate limit exceeded error queues for retry
- [ ] Network errors auto-retry without admin intervention
- [ ] Empty schedule sends generic message instead of failing
- [ ] All errors logged with full stack trace

### 5.7 Accessibility
- [ ] All form inputs have clear labels
- [ ] Error messages displayed inline below fields
- [ ] Phone number input shows format example
- [ ] Test button has loading spinner
- [ ] Keyboard accessible (Tab, Enter, Escape)
- [ ] Screen readers announce modals and errors

### 5.8 Testing
- [ ] All API endpoints tested with Postman
- [ ] Phone number validation tested (valid/invalid formats)
- [ ] Encryption/decryption tested with various inputs
- [ ] Twilio API tested with sandbox and real numbers
- [ ] Cron jobs tested manually by changing schedule
- [ ] Retry mechanism tested with simulated failures
- [ ] Message truncation tested with long schedules
- [ ] Frontend tested in Chrome, Firefox, Safari

### 5.9 Documentation
- [ ] API documentation includes all 6 endpoints
- [ ] MongoDB schemas documented
- [ ] Twilio setup guide written
- [ ] Environment variables documented (.env.example)
- [ ] Deployment checklist includes cron job setup
- [ ] Troubleshooting guide for common errors
- [ ] Code comments explain encryption, retry logic

---

## 6. File Paths Summary

### Frontend Files:
- `frontend/src/components/admin/whatsapp/WhatsAppConfigPage.jsx`
- `frontend/src/components/admin/whatsapp/WhatsAppGroupModal.jsx`
- `frontend/src/components/admin/whatsapp/SchedulePreviewModal.jsx`
- `frontend/src/components/admin/whatsapp/DeliveryHistoryPage.jsx`
- `frontend/src/services/whatsappService.js`

### Backend Files:
- `backend/models/WhatsAppGroup.js`
- `backend/models/WhatsAppDeliveryLog.js`
- `backend/controllers/whatsappController.js`
- `backend/services/twilioService.js`
- `backend/services/scheduleGenerator.js`
- `backend/routes/v2/whatsapp.js`
- `backend/cron/scheduledWhatsAppCron.js`
- `backend/utils/encryption.js`

---

## 7. Notes for Developers

### External Dependencies:
1. **Twilio Account**: Sign up at twilio.com and get Account SID, Auth Token
2. **WhatsApp Business API**: Enable WhatsApp in Twilio console
3. **Twilio Sandbox**: Use for development/testing before production approval

### Environment Variables Required:
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=+14155238886
ENCRYPTION_KEY=32_byte_random_string_here
```

### Twilio WhatsApp Setup:
1. Create Twilio account and verify phone
2. Navigate to Messaging → Try it out → WhatsApp
3. Add test numbers to sandbox by sending "join [code]" to Twilio number
4. For production, apply for WhatsApp Business API access

### Schedule Generation Logic:
- Fetches CourseAssignments for Balagruha
- Distributes activities across week days
- Includes course emojis: 📚 Computer, 🎨 Art, 🗣️ English, 💡 Life Skills
- Truncates at 4096 chars (WhatsApp limit)

### Retry Mechanism:
- Attempt 1: After 5 minutes
- Attempt 2: After 15 minutes (from first attempt)
- Attempt 3: After 60 minutes (from first attempt)
- After 3 failures: Notify admin via Notification Center

### Testing Tips:
1. Use Twilio sandbox for dev testing (no production approval needed)
2. Change cron schedule to `*/2 * * * *` (every 2 minutes) during development
3. Test encryption with: `node -e "const {encryptData} = require('./utils/encryption'); console.log(encryptData('+91 9876543210'));"`

### Security Best Practices:
1. Never commit .env file to repository
2. Rotate ENCRYPTION_KEY periodically
3. Use different Twilio accounts for dev/staging/production
4. Monitor Twilio usage dashboard for unexpected activity

---

**Story Complete. Ready for Development.**


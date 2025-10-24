# Epic 04 - Story 01: Individual Amma Accounts & Self-Registration Workflow

**Story ID:** SPRINT2-EPIC04-STORY01
**Epic:** Epic 04 - Amma Role Enhancement
**Sprint:** Sprint 2
**Story Name:** Individual Amma Accounts & Self-Registration Workflow
**Estimated Effort:** 5-6 hours (0.75 development day)
**Priority:** High (P1)
**Dependencies:**
- Sprint 1.1 RBAC (authentication system, role management)
- Backend: MongoDB Users collection (extended for Amma role)
- Backend: MongoDB RegistrationRequests collection

**Last Updated:** 2025-10-24 15:37:38
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As an** Amma
**I want to** self-register for an individual account with admin approval
**So that** I can manage student queries independently with secure authentication

### 1.2. Story Context

Previously, Ammas shared a single account. This creates:
- Accountability issues (can't track who responded)
- Security risks (shared credentials)
- Limited RBAC enforcement (all Ammas see all queries)

Individual accounts enable:
- **Accountability:** Each response tracked to specific Amma
- **RBAC Enforcement:** Amma sees only queries from assigned Balagruha
- **Security:** Individual credentials, password reset capability
- **Performance Tracking:** SLA compliance per Amma

Self-registration workflow:
1. Amma fills registration form (name, email, phone, preferred Balagruha)
2. Admin receives approval request notification
3. Admin reviews and approves/rejects with reason
4. Approved Amma receives email with login credentials
5. Amma logs in with individual account

### 1.3. Key Features

- **Self-Registration Form:** Name, email, phone, preferred Balagruha assignment
- **Admin Approval Dashboard:** View pending requests, approve/reject with reason
- **Email Notifications:** Request submitted (Amma), approval needed (Admin), approved/rejected (Amma)
- **RBAC Enforcement:** Amma role permissions scoped to assigned Balagruha
- **Pending State:** Amma sees "Approval Pending" message if not yet approved

---

## 1.5. Visual Layout Diagrams

### Amma Self-Registration Form

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ISF Playground - Amma Registration                                         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│                         [ISF Logo]                                          │
│                                                                             │
│                     Register as an Amma                                     │
│                                                                             │
│ Join the ISF family as an Amma to support students' well-being and         │
│ academic growth. Complete the registration below and an admin will review  │
│ your request.                                                               │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Personal Information                                                   │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ Full Name *                                                            │ │
│ │ ┌──────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Priya Sharma                                                     │ │ │ ← Text input
│ │ └──────────────────────────────────────────────────────────────────┘ │ │   (required)
│ │                                                                        │ │
│ │ Email Address *                                                        │ │
│ │ ┌──────────────────────────────────────────────────────────────────┐ │ │
│ │ │ priya.sharma@isf.org                                             │ │ │ ← Email input
│ │ └──────────────────────────────────────────────────────────────────┘ │ │   (required, validated)
│ │ This email will be used for login and notifications                   │ │
│ │                                                                        │ │
│ │ Phone Number *                                                         │ │
│ │ ┌──────────────────────────────────────────────────────────────────┐ │ │
│ │ │ +91 98765 43210                                                  │ │ │ ← Phone input
│ │ └──────────────────────────────────────────────────────────────────┘ │ │   (required, 10 digits)
│ │                                                                        │ │
│ │ Preferred Balagruha Assignment *                                       │ │
│ │ ┌──────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Ramakrishna Ashram                                           ▼  │ │ │ ← Dropdown
│ │ └──────────────────────────────────────────────────────────────────┘ │ │   (all Balagruhas)
│ │ Note: Admin may assign you to a different Balagruha based on need     │ │
│ │                                                                        │ │
│ │ Why do you want to be an Amma? (Optional)                             │ │
│ │ ┌──────────────────────────────────────────────────────────────────┐ │ │
│ │ │ I want to support students' well-being and help them navigate   │ │ │ ← Textarea
│ │ │ challenges. My background in counseling will be helpful.        │ │ │   (optional, max 500)
│ │ │                                                                  │ │ │
│ │ └──────────────────────────────────────────────────────────────────┘ │ │
│ │ 85 / 500 characters                                                   │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Terms & Conditions                                                     │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │                                                                        │ │
│ │ ☑ I agree to ISF's Code of Conduct and Privacy Policy                 │ │ ← Checkbox (required)
│ │ ☑ I will maintain confidentiality of student queries                  │ │ ← Checkbox (required)
│ │ ☑ I will respond to queries within SLA deadlines                      │ │ ← Checkbox (required)
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ [Cancel]                                         [Submit Registration]     │ ← Button disabled until
└─────────────────────────────────────────────────────────────────────────────┘   all required fields valid
```

### Registration Success - Pending Approval

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Registration Submitted Successfully!                                        │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│                              ✅                                              │
│                                                                             │
│ Your Amma registration request has been submitted successfully!            │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ What happens next?                                                     │ │
│ │                                                                        │ │
│ │ 1. Admin will review your registration request                        │ │
│ │ 2. You'll receive an email once your request is approved or rejected  │ │
│ │ 3. If approved, you'll receive login credentials via email            │ │
│ │ 4. Use the credentials to log in and start helping students!          │ │
│ │                                                                        │ │
│ │ Estimated Review Time: 1-2 business days                              │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Request Details:                                                            │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Name: Priya Sharma                                                     │ │
│ │ Email: priya.sharma@isf.org                                            │ │
│ │ Phone: +91 98765 43210                                                 │ │
│ │ Preferred Balagruha: Ramakrishna Ashram                                │ │
│ │ Submitted At: October 24, 2025 at 3:37 PM                             │ │
│ │ Request ID: REQ-2025-0042                                              │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ A confirmation email has been sent to priya.sharma@isf.org                 │
│                                                                             │
│ [Close]                                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Admin Approval Dashboard - Pending Requests View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Amma Registration Requests                          [🔔 3 Pending]         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ [Pending ▼] [All Balagruhas ▼] [🔍 Search by name or email...]           │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Priya Sharma                                               [⋮ Actions] │ │ ← Request card
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │   (pending state)
│ │                                                                        │ │   bg-yellow-50
│ │ Request ID: REQ-2025-0042                                              │ │
│ │ Email: priya.sharma@isf.org                                            │ │
│ │ Phone: +91 98765 43210                                                 │ │
│ │ Preferred Balagruha: Ramakrishna Ashram                                │ │
│ │                                                                        │ │
│ │ Motivation:                                                            │ │
│ │ "I want to support students' well-being and help them navigate        │ │
│ │ challenges. My background in counseling will be helpful."              │ │
│ │                                                                        │ │
│ │ Submitted: October 24, 2025 at 3:37 PM (2 hours ago)                  │ │
│ │ Status: ⏳ Pending Admin Approval                                      │ │
│ │                                                                        │ │
│ │ [Reject]                                                    [Approve]  │ │ ← Action buttons
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Lakshmi Reddy                                              [⋮ Actions] │ │ ← Request card 2
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │   (pending)
│ │ Request ID: REQ-2025-0041 • Email: lakshmi.reddy@isf.org              │ │   bg-yellow-50
│ │ Preferred Balagruha: Vivekananda Center                                │ │
│ │ Submitted: October 23, 2025 at 10:15 AM (1 day ago)                   │ │
│ │ Status: ⏳ Pending Admin Approval                                      │ │
│ │ [Reject]                                                    [Approve]  │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Meera Das                                                  [⋮ Actions] │ │ ← Request card 3
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │   (pending)
│ │ Request ID: REQ-2025-0040 • Email: meera.das@isf.org                  │ │   bg-yellow-50
│ │ Preferred Balagruha: Sri Aurobindo Ashram                              │ │
│ │ Submitted: October 22, 2025 at 4:45 PM (2 days ago)                   │ │
│ │ Status: ⏳ Pending Admin Approval                                      │ │
│ │ [Reject]                                                    [Approve]  │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Admin Approval Modal

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Approve Amma Registration                                   [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ You are approving the Amma registration request for:                       │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Name: Priya Sharma                                                     │ │
│ │ Email: priya.sharma@isf.org                                            │ │
│ │ Phone: +91 98765 43210                                                 │ │
│ │ Preferred Balagruha: Ramakrishna Ashram                                │ │
│ │ Request ID: REQ-2025-0042                                              │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Assign to Balagruha *                                                       │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Ramakrishna Ashram                                              ▼  │   │ ← Dropdown
│ └─────────────────────────────────────────────────────────────────────┘   │   (all Balagruhas)
│ You can assign a different Balagruha if needed                             │
│                                                                             │
│ Welcome Message (Optional)                                                  │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Welcome to ISF, Priya! We're excited to have you as an Amma.       │   │ ← Textarea
│ │ You've been assigned to Ramakrishna Ashram. Please check your      │   │   (optional, max 500)
│ │ email for login credentials.                                        │   │
│ │                                                                     │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│ 158 / 500 characters                                                       │
│                                                                             │
│ ☑ Send email notification with login credentials                           │
│ ☑ Generate temporary password (Amma will be prompted to change on first login)
│                                                                             │
│ [Cancel]                                              [Approve & Notify]    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Admin Rejection Modal

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Reject Amma Registration                                    [✕ Close]       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ You are rejecting the Amma registration request for:                       │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Name: Priya Sharma                                                     │ │
│ │ Email: priya.sharma@isf.org                                            │ │
│ │ Request ID: REQ-2025-0042                                              │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Reason for Rejection *                                                      │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ Incomplete Background Verification                              ▼  │   │ ← Dropdown
│ └─────────────────────────────────────────────────────────────────────┘   │   (predefined reasons)
│                                                                             │
│ Options:                                                                    │
│ - Incomplete Background Verification                                        │
│ - Insufficient Experience                                                   │
│ - No Current Openings                                                       │
│ - Other (please specify below)                                              │
│                                                                             │
│ Additional Details (Optional)                                               │
│ ┌─────────────────────────────────────────────────────────────────────┐   │
│ │ We need to verify your background check before approving your      │   │ ← Textarea
│ │ registration. Please reapply after providing the required          │   │   (optional, max 500)
│ │ documents.                                                          │   │
│ │                                                                     │   │
│ └─────────────────────────────────────────────────────────────────────┘   │
│ 125 / 500 characters                                                       │
│                                                                             │
│ ☑ Send email notification with rejection reason                            │
│                                                                             │
│ [Cancel]                                              [Reject & Notify]     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Amma Login Screen - Pending Approval State

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ISF Playground - Amma Login                                                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│                         [ISF Logo]                                          │
│                                                                             │
│                     Welcome, Amma                                           │
│                                                                             │
│ Email                                                                       │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ priya.sharma@isf.org                                                   │ │ ← Email input
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Password                                                                    │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ••••••••                                                               │ │ ← Password input
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ [Login]                                                                     │
│                                                                             │
│ ⏳ Your registration is pending admin approval. You'll be able to log in   │ ← Alert (yellow bg)
│    once your request is approved. Check your email for updates.            │
│                                                                             │
│ Don't have an account? [Register as Amma]                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Measurements Summary

| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| **Registration Form Container** | 700px | auto | px-8 py-6 | mx-auto | rounded-lg shadow-lg | - |
| **Form Section** | 100% | auto | p-6 | mb-6 | border gray-200 rounded-lg | - |
| **Text Input** | 100% | 48px | px-4 py-3 | mb-4 | border gray-300 rounded-lg | text-base |
| **Textarea** | 100% | 120px | px-4 py-3 | mb-2 | border gray-300 rounded-lg | text-base |
| **Dropdown** | 100% | 48px | px-4 py-3 | mb-4 | border gray-300 rounded-lg | text-base |
| **Checkbox** | 20px | 20px | - | mr-3 | border gray-400 rounded | - |
| **Submit Button** | 220px | 48px | px-6 py-3 | - | rounded-lg | text-base font-semibold |
| **Success Modal** | 600px | auto | px-8 py-6 | - | rounded-lg shadow-xl | - |
| **Request Card** | 100% | auto (min 180px) | p-6 | mb-4 | border gray-200 rounded-lg | - |
| **Pending Request Card** | 100% | auto (min 180px) | p-6 | mb-4 | border-l-4 yellow-500 bg-yellow-50 | - |
| **Approval Modal** | 650px | auto | px-6 py-4 | - | rounded-lg shadow-xl | - |
| **Alert (Pending Login)** | 100% | auto | px-4 py-3 | mt-4 | bg-yellow-50 border-l-4 yellow-500 | text-sm |

---

## 2. Acceptance Criteria

### 2.1. Self-Registration Form

- [ ] **REG-01:** Registration form accessible at `/amma/register` (public route)
- [ ] **REG-02:** Form fields: Full Name, Email, Phone, Preferred Balagruha, Motivation (optional), 3 checkboxes (Code of Conduct, Confidentiality, SLA)
- [ ] **REG-03:** Email validation: must be valid email format
- [ ] **REG-04:** Phone validation: 10 digits, numeric only
- [ ] **REG-05:** Balagruha dropdown shows all Balagruhas from database
- [ ] **REG-06:** Motivation textarea optional, max 500 characters
- [ ] **REG-07:** All 3 checkboxes required (form cannot be submitted until all checked)
- [ ] **REG-08:** "Submit Registration" button disabled until all required fields valid
- [ ] **REG-09:** Clicking "Submit" creates RegistrationRequest document in MongoDB
- [ ] **REG-10:** Success modal displays request details (name, email, request ID, timestamp)
- [ ] **REG-11:** Confirmation email sent to Amma: "Your registration has been submitted. You'll hear from us within 1-2 business days."

### 2.2. Admin Approval Dashboard

- [ ] **ADMIN-01:** Admin dashboard shows pending requests at `/admin/amma-requests`
- [ ] **ADMIN-02:** Request cards display: name, email, phone, preferred Balagruha, motivation, submitted timestamp, request ID
- [ ] **ADMIN-03:** Filter dropdown: Pending, Approved, Rejected, All
- [ ] **ADMIN-04:** Balagruha filter dropdown: All Balagruhas + individual Balagruha options
- [ ] **ADMIN-05:** Search input filters by name or email (real-time, case-insensitive)
- [ ] **ADMIN-06:** Pending requests have yellow background (bg-yellow-50) and yellow left border
- [ ] **ADMIN-07:** Context menu (⋮ Actions): Approve, Reject, View Details
- [ ] **ADMIN-08:** "Approve" button opens Approval Modal
- [ ] **ADMIN-09:** "Reject" button opens Rejection Modal
- [ ] **ADMIN-10:** Admin receives email notification when new request submitted

### 2.3. Approval Workflow

- [ ] **APPROVE-01:** Approval modal shows Amma details (name, email, phone, preferred Balagruha, request ID)
- [ ] **APPROVE-02:** Balagruha assignment dropdown defaults to preferred Balagruha, can be changed
- [ ] **APPROVE-03:** Welcome message textarea optional (max 500 chars)
- [ ] **APPROVE-04:** Checkbox: "Send email notification with login credentials" (default checked)
- [ ] **APPROVE-05:** Checkbox: "Generate temporary password" (default checked)
- [ ] **APPROVE-06:** Clicking "Approve & Notify" creates User document with role="amma"
- [ ] **APPROVE-07:** User document includes: name, email, phone, assignedBalagruha, role="amma", status="active", temporaryPassword (hashed)
- [ ] **APPROVE-08:** RegistrationRequest status updates to "approved", approvedBy (adminId), approvedAt (timestamp)
- [ ] **APPROVE-09:** Email sent to Amma: "Your Amma registration has been approved! Login credentials: email: {...}, temporary password: {...}. You'll be prompted to change your password on first login."
- [ ] **APPROVE-10:** Admin dashboard updates (request moves to "Approved" filter)

### 2.4. Rejection Workflow

- [ ] **REJECT-01:** Rejection modal shows Amma details (name, email, request ID)
- [ ] **REJECT-02:** Reason dropdown required: Incomplete Background Verification, Insufficient Experience, No Current Openings, Other
- [ ] **REJECT-03:** Additional details textarea optional (max 500 chars)
- [ ] **REJECT-04:** Checkbox: "Send email notification with rejection reason" (default checked)
- [ ] **REJECT-05:** Clicking "Reject & Notify" updates RegistrationRequest status to "rejected", rejectedBy (adminId), rejectedAt (timestamp), rejectionReason
- [ ] **REJECT-06:** Email sent to Amma: "Thank you for your interest in becoming an Amma. Unfortunately, we cannot approve your registration at this time. Reason: {...}. Additional details: {...}. You may reapply in the future."
- [ ] **REJECT-07:** Admin dashboard updates (request moves to "Rejected" filter)

### 2.5. Amma Login & RBAC

- [ ] **LOGIN-01:** Amma can log in at `/amma/login` with email and temporary password
- [ ] **LOGIN-02:** First login prompts password change modal (new password, confirm password)
- [ ] **LOGIN-03:** Password requirements: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
- [ ] **LOGIN-04:** After password change, Amma redirected to Amma dashboard `/amma/dashboard`
- [ ] **LOGIN-05:** If registration pending approval, login shows alert: "Your registration is pending admin approval. You'll be able to log in once approved."
- [ ] **LOGIN-06:** If registration rejected, login shows alert: "Your registration was rejected. Reason: {...}. Please contact admin for more information."
- [ ] **LOGIN-07:** RBAC enforced: Amma can only access queries from assigned Balagruha (backend checks `user.assignedBalagruha` matches `query.studentBalagruha`)

### 2.6. Email Notifications

- [ ] **EMAIL-01:** Registration submitted: Sent to Amma
- [ ] **EMAIL-02:** Approval needed: Sent to Admin
- [ ] **EMAIL-03:** Approved: Sent to Amma with login credentials
- [ ] **EMAIL-04:** Rejected: Sent to Amma with reason
- [ ] **EMAIL-05:** All emails use ISF email template with logo and signature

### 2.7. Performance & Accessibility

- [ ] **PERF-01:** Registration form loads within 500ms
- [ ] **PERF-02:** Form submission completes within 1 second
- [ ] **PERF-03:** Admin dashboard loads within 1 second (up to 50 pending requests)
- [ ] **PERF-04:** Approval/rejection completes within 1 second
- [ ] **ACC-01:** Keyboard navigation: Tab through fields, Enter to submit
- [ ] **ACC-02:** Screen reader announces: field labels, validation errors, success messages
- [ ] **ACC-03:** Form validation errors display below each field (red text, aria-invalid)

---

## 3. Task Breakdown

### Phase 1: Self-Registration Form UI (1.5 hours)

**Task 1.1: Create `AmmaRegistrationForm.jsx` component (45 min)**
- Component structure: header, personal information section, terms section, submit button
- Form fields: Full Name (text), Email (email), Phone (tel), Preferred Balagruha (dropdown), Motivation (textarea)
- Three checkboxes: Code of Conduct, Confidentiality, SLA
- State management: `formData`, `validationErrors`, `isSubmitting`
- Validation logic:
  - Name: required, min 3 chars
  - Email: required, valid email format (regex)
  - Phone: required, 10 digits, numeric only
  - Balagruha: required, selected from dropdown
  - All checkboxes: required (all must be checked)
- Character count for motivation textarea (0/500)
- "Submit Registration" button disabled until all valid
- File: `frontend/src/components/amma/AmmaRegistrationForm.jsx`

**Task 1.2: Fetch Balagruhas for dropdown (15 min)**
- Fetch from GET `/api/v2/balagruhas` (returns all Balagruhas)
- Populate dropdown with Balagruha names
- Handle loading state, error state
- File: `frontend/src/components/amma/AmmaRegistrationForm.jsx`

**Task 1.3: Implement form submission logic (30 min)**
- POST `/api/v2/amma/register` with form data
- Request body: `{ name, email, phone, preferredBalagruha, motivation }`
- On success: Show success modal with request details
- On error: Display error toast (e.g., "Email already registered")
- File: `frontend/src/components/amma/AmmaRegistrationForm.jsx`

### Phase 2: Admin Approval Dashboard UI (1.5 hours)

**Task 2.1: Create `AmmaRequestsDashboard.jsx` component (45 min)**
- Component structure: header with filters, request cards list
- Filter dropdowns: Status (Pending, Approved, Rejected, All), Balagruha (All + individual)
- Search input with real-time filter logic
- Fetch requests from GET `/api/v2/admin/amma-requests?status=pending`
- Request card layout: name, email, phone, preferred Balagruha, motivation, submitted timestamp, request ID, status indicator
- Pending cards: bg-yellow-50, border-l-4 yellow-500
- Approved cards: bg-green-50, border-l-4 green-500
- Rejected cards: bg-red-50, border-l-4 red-500
- File: `frontend/src/components/admin/AmmaRequestsDashboard.jsx`

**Task 2.2: Build request card with action buttons (30 min)**
- Request card component: `AmmaRequestCard.jsx`
- Display all request details
- Action buttons: "Approve" (green), "Reject" (red)
- Context menu (⋮ Actions): Approve, Reject, View Details
- Click "Approve" opens Approval Modal
- Click "Reject" opens Rejection Modal
- File: `frontend/src/components/admin/AmmaRequestCard.jsx`

**Task 2.3: Implement filter and search logic (15 min)**
- Filter by status: Update API call `?status={selected}`
- Filter by Balagruha: Client-side filter on fetched data
- Search: Client-side filter by name or email (case-insensitive)
- File: `frontend/src/components/admin/AmmaRequestsDashboard.jsx`

### Phase 3: Approval & Rejection Modals (1 hour)

**Task 3.1: Create `AmmaApprovalModal.jsx` component (30 min)**
- Modal layout: Amma details section, Balagruha assignment dropdown, welcome message textarea, checkboxes
- Balagruha dropdown defaults to `request.preferredBalagruha`, can be changed
- Welcome message textarea optional (max 500 chars, character count)
- Checkboxes: Send email, Generate temporary password (both default checked)
- "Approve & Notify" button triggers approval API call
- File: `frontend/src/components/admin/AmmaApprovalModal.jsx`

**Task 3.2: Create `AmmaRejectionModal.jsx` component (30 min)**
- Modal layout: Amma details section, reason dropdown, additional details textarea, checkbox
- Reason dropdown required: Incomplete Background Verification, Insufficient Experience, No Current Openings, Other
- Additional details textarea optional (max 500 chars, character count)
- Checkbox: Send email notification (default checked)
- "Reject & Notify" button triggers rejection API call
- File: `frontend/src/components/admin/AmmaRejectionModal.jsx`

### Phase 4: Backend API Endpoints (1.5 hours)

**Task 4.1: Implement registration API endpoint (30 min)**
- POST `/api/v2/amma/register`
- Request body validation: name (required, min 3 chars), email (required, valid email, unique), phone (required, 10 digits), preferredBalagruha (required, valid ObjectId), motivation (optional, max 500)
- Create RegistrationRequest document:
  ```javascript
  {
    name, email, phone, preferredBalagruha, motivation,
    status: "pending", submittedAt: new Date(), requestId: generateRequestId()
  }
  ```
- Send confirmation email to Amma
- Send notification email to Admin
- Return: `{ success: true, requestId, message: "Registration submitted successfully" }`
- File: `backend/controllers/ammaRegistrationController.js`

**Task 4.2: Implement admin fetch requests API (20 min)**
- GET `/api/v2/admin/amma-requests?status=pending`
- Query params: `status?` (pending, approved, rejected, all)
- Fetch RegistrationRequest documents filtered by status
- Sort by `submittedAt DESC` (most recent first)
- Return: `{ success: true, requests: [...] }`
- File: `backend/controllers/ammaRegistrationController.js`

**Task 4.3: Implement approval API endpoint (30 min)**
- PUT `/api/v2/admin/amma-requests/:requestId/approve`
- Request body: `{ assignedBalagruha, welcomeMessage?, sendEmail, generateTempPassword }`
- Create User document with role="amma":
  ```javascript
  {
    name: request.name, email: request.email, phone: request.phone,
    role: "amma", assignedBalagruha,
    status: "active", temporaryPassword: generateTempPassword ? hash(tempPwd) : null,
    passwordChangeRequired: true
  }
  ```
- Update RegistrationRequest: `{ status: "approved", approvedBy: req.user._id, approvedAt: new Date() }`
- Send approval email with login credentials (if sendEmail=true)
- Return: `{ success: true, message: "Amma approved successfully" }`
- File: `backend/controllers/ammaRegistrationController.js`

**Task 4.4: Implement rejection API endpoint (10 min)**
- PUT `/api/v2/admin/amma-requests/:requestId/reject`
- Request body: `{ reason, details?, sendEmail }`
- Update RegistrationRequest: `{ status: "rejected", rejectedBy: req.user._id, rejectedAt: new Date(), rejectionReason: reason, rejectionDetails: details }`
- Send rejection email (if sendEmail=true)
- Return: `{ success: true, message: "Amma registration rejected" }`
- File: `backend/controllers/ammaRegistrationController.js`

### Phase 5: Amma Login & Password Change (45 min)

**Task 5.1: Create `AmmaLogin.jsx` component (20 min)**
- Login form: email, password, submit button
- POST `/api/v2/auth/login` with `{ email, password, role: "amma" }`
- On success: Store JWT token, redirect to `/amma/dashboard`
- If registration pending: Display alert "Your registration is pending admin approval"
- If registration rejected: Display alert "Your registration was rejected. Reason: {...}"
- File: `frontend/src/components/amma/AmmaLogin.jsx`

**Task 5.2: Implement first-login password change modal (25 min)**
- On first login (if `user.passwordChangeRequired=true`), show password change modal
- Modal fields: New password, Confirm password
- Password validation: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
- PUT `/api/v2/auth/change-password` with `{ newPassword }`
- On success: Update `user.passwordChangeRequired=false`, close modal, redirect to dashboard
- File: `frontend/src/components/amma/PasswordChangeModal.jsx`

### Phase 6: Email Notifications (30 min)

**Task 6.1: Create email templates (15 min)**
- Template 1: Registration Submitted (to Amma)
  - Subject: "Amma Registration Submitted - ISF Playground"
  - Body: "Dear {name}, your registration has been submitted. Request ID: {requestId}. You'll hear from us within 1-2 business days."
- Template 2: Approval Needed (to Admin)
  - Subject: "New Amma Registration Request - {name}"
  - Body: "A new Amma registration request has been submitted. Name: {name}, Email: {email}. Review at: {dashboardLink}"
- Template 3: Approved (to Amma)
  - Subject: "Amma Registration Approved - ISF Playground"
  - Body: "Dear {name}, your Amma registration has been approved! Login credentials: Email: {email}, Temporary Password: {tempPassword}. You'll be prompted to change your password on first login. Welcome message: {welcomeMessage}"
- Template 4: Rejected (to Amma)
  - Subject: "Amma Registration Status - ISF Playground"
  - Body: "Dear {name}, we cannot approve your registration at this time. Reason: {reason}. Details: {details}. You may reapply in the future."
- File: `backend/templates/emails/ammaRegistration/*.html`

**Task 6.2: Implement email sending service (15 min)**
- Use existing `emailService.js` (from Sprint 1.1)
- Send emails via SendGrid or Nodemailer
- File: `backend/services/emailService.js` (updated)

### Phase 7: Testing & Polish (30 min)

**Task 7.1: Unit tests for registration API (15 min)**
- Test registration endpoint: valid data creates RegistrationRequest
- Test validation: invalid email, duplicate email, missing required fields
- Test approval endpoint: creates User document, updates request status
- Test rejection endpoint: updates request status, sends email
- Mock email service
- File: `backend/tests/controllers/ammaRegistrationController.test.js`

**Task 7.2: E2E test for registration workflow (15 min)**
- Test: Amma fills registration form, submits, sees success modal
- Test: Admin logs in, sees pending request, approves
- Test: Amma receives approval email, logs in with temp password
- Test: Amma changes password on first login, redirected to dashboard
- File: `frontend/tests/e2e/amma-registration.spec.js`

---

## 4. API Endpoints

### 4.1. Amma Registration

**Endpoint:** `POST /api/v2/amma/register`

**Description:** Creates a new Amma registration request.

**Request Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya.sharma@isf.org",
  "phone": "+919876543210",
  "preferredBalagruha": "balagruha456",
  "motivation": "I want to support students' well-being and help them navigate challenges. My background in counseling will be helpful."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "requestId": "REQ-2025-0042",
    "message": "Registration submitted successfully. You'll receive an email once your request is reviewed."
  }
}
```

**Error Responses:**
```json
// 400 Bad Request - Validation Error
{
  "success": false,
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email format" },
    { "field": "phone", "message": "Phone number must be 10 digits" }
  ]
}

// 409 Conflict - Email already registered
{
  "success": false,
  "error": "Email already registered",
  "message": "An account with this email already exists"
}
```

---

### 4.2. Fetch Amma Requests (Admin)

**Endpoint:** `GET /api/v2/admin/amma-requests`

**Description:** Fetches all Amma registration requests with optional status filter.

**Request Headers:**
```json
{
  "Authorization": "Bearer <admin_jwt_token>"
}
```

**Query Parameters:**
- `status` (optional): "pending", "approved", "rejected", "all" (default "pending")
- `page` (optional, default 1): Page number
- `limit` (optional, default 20): Requests per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "requests": [
      {
        "requestId": "REQ-2025-0042",
        "name": "Priya Sharma",
        "email": "priya.sharma@isf.org",
        "phone": "+919876543210",
        "preferredBalagruha": {
          "id": "balagruha456",
          "name": "Ramakrishna Ashram"
        },
        "motivation": "I want to support students' well-being...",
        "status": "pending",
        "submittedAt": "2025-10-24T15:37:38.123Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalRequests": 3
    }
  }
}
```

---

### 4.3. Approve Amma Request (Admin)

**Endpoint:** `PUT /api/v2/admin/amma-requests/:requestId/approve`

**Description:** Approves an Amma registration request and creates user account.

**Request Headers:**
```json
{
  "Authorization": "Bearer <admin_jwt_token>",
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "assignedBalagruha": "balagruha456",
  "welcomeMessage": "Welcome to ISF, Priya! We're excited to have you as an Amma.",
  "sendEmail": true,
  "generateTempPassword": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Amma approved successfully",
    "userId": "user789",
    "temporaryPassword": "TempPwd123!",
    "emailSent": true
  }
}
```

**Error Responses:**
```json
// 404 Not Found - Request not found
{
  "success": false,
  "error": "Request not found",
  "message": "No registration request found with ID REQ-2025-0042"
}

// 400 Bad Request - Request already processed
{
  "success": false,
  "error": "Request already processed",
  "message": "This registration request has already been approved/rejected"
}
```

---

### 4.4. Reject Amma Request (Admin)

**Endpoint:** `PUT /api/v2/admin/amma-requests/:requestId/reject`

**Description:** Rejects an Amma registration request with reason.

**Request Headers:**
```json
{
  "Authorization": "Bearer <admin_jwt_token>",
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "reason": "Incomplete Background Verification",
  "details": "We need to verify your background check before approving your registration. Please reapply after providing the required documents.",
  "sendEmail": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "message": "Amma registration rejected",
    "emailSent": true
  }
}
```

---

## 5. MongoDB Schemas

### 5.1. RegistrationRequest Collection

```javascript
const RegistrationRequestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true,
    // Format: "REQ-YYYY-NNNN" (e.g., "REQ-2025-0042")
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email`
    }
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\+?\d{10,15}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number`
    }
  },
  preferredBalagruha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Balagruha',
    required: true
  },
  motivation: {
    type: String,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    index: true
  },
  submittedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Admin who approved/rejected
  },
  processedAt: {
    type: Date
  },
  // Approval fields
  assignedBalagruha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Balagruha'
  },
  welcomeMessage: {
    type: String,
    maxlength: 500
  },
  // Rejection fields
  rejectionReason: {
    type: String,
    enum: [
      'Incomplete Background Verification',
      'Insufficient Experience',
      'No Current Openings',
      'Other'
    ]
  },
  rejectionDetails: {
    type: String,
    maxlength: 500
  }
});

module.exports = mongoose.model('RegistrationRequest', RegistrationRequestSchema);
```

### 5.2. User Schema (Extended for Amma)

```javascript
const UserSchema = new mongoose.Schema({
  // ... existing fields (name, email, role, etc.)

  // Amma-specific fields
  assignedBalagruha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Balagruha',
    required: function() {
      return this.role === 'amma';
    },
    index: true
  },
  temporaryPassword: {
    type: String,
    // Hashed temporary password generated on approval
  },
  passwordChangeRequired: {
    type: Boolean,
    default: false
  }
});
```

---

## 6. File Paths

```
frontend/src/components/amma/
├── AmmaRegistrationForm.jsx         # Self-registration form
├── AmmaLogin.jsx                    # Amma login screen
└── PasswordChangeModal.jsx          # First-login password change

frontend/src/components/admin/
├── AmmaRequestsDashboard.jsx        # Admin dashboard for pending requests
├── AmmaRequestCard.jsx              # Individual request card
├── AmmaApprovalModal.jsx            # Approval modal
└── AmmaRejectionModal.jsx           # Rejection modal

backend/controllers/
└── ammaRegistrationController.js    # Registration, approval, rejection APIs

backend/models/
├── RegistrationRequest.js           # RegistrationRequest schema
└── User.js                          # User schema (extended for Amma)

backend/templates/emails/ammaRegistration/
├── registrationSubmitted.html       # Email template (to Amma)
├── approvalNeeded.html              # Email template (to Admin)
├── approved.html                    # Email template (to Amma)
└── rejected.html                    # Email template (to Amma)

backend/routes/v2/
├── amma.js                          # Amma routes
└── admin.js                         # Admin routes (updated)

backend/tests/controllers/
└── ammaRegistrationController.test.js

frontend/tests/e2e/
└── amma-registration.spec.js
```

---

## 7. Definition of Done

- [ ] Amma can access self-registration form at `/amma/register`
- [ ] Form validates all required fields (name, email, phone, Balagruha, checkboxes)
- [ ] Submitting form creates RegistrationRequest document with status "pending"
- [ ] Confirmation email sent to Amma with request ID
- [ ] Notification email sent to Admin
- [ ] Admin dashboard displays pending requests with filters (status, Balagruha, search)
- [ ] Admin can approve request: assigns Balagruha, generates temp password, sends email
- [ ] Approval creates User document with role="amma", status="active"
- [ ] Admin can reject request: saves reason, sends email
- [ ] Approved Amma receives email with login credentials
- [ ] Amma can log in with email and temporary password
- [ ] First login prompts password change modal (validates password strength)
- [ ] After password change, Amma redirected to `/amma/dashboard`
- [ ] Pending registration shows alert on login: "Your registration is pending admin approval"
- [ ] RBAC enforced: Amma can only access queries from assigned Balagruha
- [ ] Unit tests: 80%+ coverage for registration, approval, rejection logic
- [ ] E2E tests: Full workflow tested (register → approve → login → password change)
- [ ] Code peer-reviewed
- [ ] Merged to `develop`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:37:38
- **Status:** Draft - Ready for Development

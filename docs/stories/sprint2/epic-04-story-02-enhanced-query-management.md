# Epic 04 - Story 02: Enhanced Query Management (Reclassify, Reassign, Multi-tag)

**Story ID:** SPRINT2-EPIC04-STORY02
**Epic:** Epic 04 - Amma Role Enhancement
**Sprint:** Sprint 2
**Story Name:** Enhanced Query Management (Reclassify, Reassign, Multi-tag)
**Estimated Effort:** 6-8 hours (1 development day)
**Priority:** High (P1)
**Dependencies:**
- Epic 04 Story 01 (Individual Amma accounts)
- Backend: MongoDB Queries collection (enhanced schema)
- Sprint 1.1 Chat with Amma (existing query system)

**Last Updated:** 2025-10-24 15:41:02
**Status:** Draft - Ready for Development

---

## 1. Story Description & User Story

### 1.1. User Story

**As an** Amma
**I want to** reclassify queries, add multiple tags, reassign to another Amma, and escalate to Coach
**So that** I can manage queries more effectively and ensure students get the right support

### 1.2. Story Context

Current query system limitations:
- Fixed category (set by student or system)
- No tagging for granular tracking (e.g., "Anxiety" + "Home" tags)
- No reassignment capability (if Amma lacks expertise)
- No escalation workflow (for serious issues requiring Coach intervention)

Enhanced query management enables:
- **Reclassification:** Amma can change category if student miscategorized (e.g., "Technical Issue" → "Emotional Support")
- **Multi-tagging:** Add multiple tags for granular tracking (e.g., ["Anxiety", "Home", "Family"])
- **Reassignment:** Transfer query to another Amma with better expertise
- **Escalation:** Escalate to Coach for serious issues (e.g., bullying, mental health crisis)
- **Query History:** Full audit trail of all actions (created, reclassified, reassigned, responded, resolved, escalated)

### 1.3. Key Features

- **Reclassify Category:** Dropdown with 4 categories (Emotional Support, Academic Help, Technical Issue, Other)
- **Multi-Tag Input:** Add/remove tags (predefined + custom tags)
- **Reassign to Another Amma:** Dropdown of available Ammas (same Balagruha or all)
- **Escalate to Coach:** Button with confirmation modal, creates Coach task
- **Query History Log:** Timeline of all actions with timestamps, Amma name, action type, details

---

## 1.5. Visual Layout Diagrams

### Query Detail View - with Action Panel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Query #Q-2025-0054 - Ravi Kumar (Class: 5th)               [← Back to List]│
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ┌────────────────────────────────────┐ ┌──────────────────────────────┐   │
│ │ Query Details                      │ │ Actions & Management         │   │ ← 2-column layout
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │   (60% - 40%)
│ │                                    │ │                              │   │
│ │ Category: Emotional Support        │ │ Reclassify Category          │   │
│ │ Tags: Anxiety, Home                │ │ ┌────────────────────────┐   │   │
│ │ Priority: High                     │ │ │ Emotional Support  ▼   │   │   │ ← Category dropdown
│ │ Status: Open                       │ │ └────────────────────────┘   │   │   (4 options)
│ │ SLA: 45 minutes remaining          │ │ [Update Category]            │   │
│ │                                    │ │                              │   │
│ │ Student Message (Voice):           │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│ │ ┌────────────────────────────────┐ │ │ Tags                         │   │
│ │ │ [▶] Voice Note (0:45)          │ │ │ ┌────────────────────────┐   │   │
│ │ │ Sent: Oct 24, 2025 2:30 PM    │ │ │ │ ⊕ Add tag...           │   │   │ ← Tag input
│ │ └────────────────────────────────┘ │ │ └────────────────────────┘   │   │   (autocomplete)
│ │                                    │ │                              │   │
│ │ Transcript (Auto-generated):       │ │ Selected Tags:               │   │
│ │ "I'm feeling very anxious about   │ │ ┌────────────────────────┐   │   │
│ │ the situation at home. My parents │ │ │ Anxiety         [×]    │   │   │ ← Tag chips
│ │ are fighting a lot and I can't    │ │ │ Home            [×]    │   │   │   (removable)
│ │ focus on my studies."              │ │ │ Family          [×]    │   │   │
│ │                                    │ │ └────────────────────────┘   │   │
│ │ Your Response (Voice/Text):        │ │                              │   │
│ │ ┌────────────────────────────────┐ │ │ Suggested Tags:              │   │
│ │ │ [🎤 Record Voice Note]         │ │ │ [+ Stress] [+ Studies]       │   │ ← Suggested tags
│ │ │ or                             │ │ │ [+ Parents] [+ Focus]        │   │   (clickable)
│ │ │ [Type Text Response...]        │ │ │                              │   │
│ │ └────────────────────────────────┘ │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│ │                                    │ │ Reassign Query               │   │
│ │ [Send Response]                    │ │ ┌────────────────────────┐   │   │
│ │                                    │ │ │ Amma Lakshmi       ▼   │   │   │ ← Amma dropdown
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │ └────────────────────────┘   │   │
│ │ Query Metadata                     │ │ Reason (optional):           │   │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │ ┌────────────────────────┐   │   │
│ │ Created: Oct 24, 2025 2:30 PM     │ │ │ Better expertise       │   │   │
│ │ Assigned to: Amma Priya            │ │ └────────────────────────┘   │   │
│ │ Student: Ravi Kumar (STU001)       │ │ [Reassign to Amma]           │   │
│ │ Balagruha: Ramakrishna Ashram      │ │                              │   │
│ │ Query ID: Q-2025-0054              │ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │
│ └────────────────────────────────────┘ │ Escalate                     │   │
│                                        │ [⚠️ Escalate to Coach]       │   │ ← Escalate button
│                                        │                              │   │   (red, requires
│                                        │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━ │   │   confirmation)
│                                        │ Mark as Resolved             │   │
│                                        │ [✅ Resolve Query]           │   │
│                                        └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Reclassify Category Dropdown - Expanded

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Reclassify Category                                                         │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Emotional Support                                                  ▲   │ │ ← Dropdown expanded
│ └────────────────────────────────────────────────────────────────────────┘ │   (currently selected)
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ 🔵 Emotional Support                                                   │ │ ← Option 1 (selected)
│ │    SLA: 1 hour • For anxiety, stress, personal issues                 │ │   bg-blue-50
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ⚪ Academic Help                                                        │ │ ← Option 2
│ │    SLA: 4 hours • For homework, concepts, study help                  │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ⚪ Technical Issue                                                      │ │ ← Option 3
│ │    SLA: 2 hours • For app bugs, login problems, device issues         │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ⚪ Other                                                                │ │ ← Option 4
│ │    SLA: 24 hours • For general questions, feedback, suggestions       │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ⚠️ Note: Changing category will reset the SLA timer based on new category  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Multi-Tag Input - Autocomplete

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Tags                                                                        │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ⊕ Add tag...  stress                                                   │ │ ← Input with text
│ └────────────────────────────────────────────────────────────────────────┘ │   (autocomplete)
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Suggested Tags (matching "stress"):                                    │ │ ← Autocomplete dropdown
│ │                                                                        │ │
│ │ 🔍 Stress (24 queries)                                                 │ │ ← Predefined tag
│ │ 🔍 Stressed (12 queries)                                               │ │   (with usage count)
│ │ 🔍 Academic Stress (8 queries)                                         │ │
│ │                                                                        │ │
│ │ ───────────────────────────────────────────────────────────────────   │ │
│ │ ➕ Create new tag "stress"                                             │ │ ← Create custom tag
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Selected Tags:                                                              │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Anxiety     [×]   Home        [×]   Family      [×]   Stress    [×]    │ │ ← Tag chips
│ └────────────────────────────────────────────────────────────────────────┘ │   (removable with ×)
│                                                                             │
│ Suggested Tags (based on category & message):                              │
│ [+ Parents] [+ Studies] [+ Focus] [+ Mental Health]                        │ ← Quick-add suggested
└─────────────────────────────────────────────────────────────────────────────┘   tags (clickable)
```

### Reassign to Another Amma - Dropdown

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Reassign Query                                                              │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Select Amma                                                        ▼   │ │ ← Dropdown
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Available Ammas (Ramakrishna Ashram)                                   │ │ ← Same Balagruha
│ │                                                                        │ │
│ │ ⚪ Amma Lakshmi                                                         │ │ ← Option 1
│ │    12 open queries • SLA: 95% • Expertise: Emotional Support           │ │   (with stats)
│ │                                                                        │ │
│ │ ⚪ Amma Meera                                                           │ │ ← Option 2
│ │    8 open queries • SLA: 88% • Expertise: Academic Help                │ │
│ │                                                                        │ │
│ │ ───────────────────────────────────────────────────────────────────   │ │
│ │ Other Balagruhas                                                       │ │ ← Other Balagruhas
│ │                                                                        │ │   (expandable)
│ │ ⚪ Amma Deepa (Vivekananda Center)                                     │ │ ← Option 3
│ │    15 open queries • SLA: 92%                                          │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Reason for Reassignment (Optional):                                         │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Amma Lakshmi has better expertise in emotional support issues.        │ │ ← Textarea
│ └────────────────────────────────────────────────────────────────────────┘ │
│ 68 / 300 characters                                                         │
│                                                                             │
│ ☑ Notify the new Amma via email and in-app notification                    │ ← Checkbox (default)
│ ☑ Add reassignment note to query history                                   │
│                                                                             │
│ [Cancel]                                              [Reassign to Amma]    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Escalate to Coach - Confirmation Modal

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Escalate Query to Coach                                         [✕ Close]   │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ⚠️ You are escalating this query to a Coach for intervention.              │
│                                                                             │
│ Query Details:                                                              │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Student: Ravi Kumar (STU001, Class: 5th)                               │ │
│ │ Balagruha: Ramakrishna Ashram                                          │ │
│ │ Category: Emotional Support                                            │ │
│ │ Tags: Anxiety, Home, Family, Stress                                    │ │
│ │ Query ID: Q-2025-0054                                                  │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Escalation Reason *                                                         │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Potential Mental Health Crisis                                     ▼   │ │ ← Dropdown (required)
│ └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ Options:                                                                    │
│ - Potential Mental Health Crisis                                            │
│ - Bullying or Safety Concern                                                │
│ - Academic Intervention Needed                                              │
│ - Requires Parent/Guardian Contact                                          │
│ - Beyond Amma Expertise                                                     │
│ - Other (please specify below)                                              │
│                                                                             │
│ Additional Details *                                                        │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Student mentioned feeling very anxious about home situation. Parents   │ │ ← Textarea (required)
│ │ fighting frequently, affecting studies. Recommend immediate Coach      │ │   min 20 chars
│ │ intervention to assess mental health and consider counseling.          │ │
│ │                                                                        │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│ 158 / 500 characters                                                        │
│                                                                             │
│ Assign to Coach                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ Auto-assign to Balagruha Coach                                     ▼   │ │ ← Dropdown
│ └────────────────────────────────────────────────────────────────────────┘ │   (default: auto)
│                                                                             │
│ Priority                                                                    │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ 🔴 Urgent                                                          ▼   │ │ ← Dropdown
│ └────────────────────────────────────────────────────────────────────────┘ │   (Urgent/High/Normal)
│                                                                             │
│ ☑ Notify Coach via email and in-app notification                           │
│ ☑ Mark query as "Escalated" (will remain in your view but assigned to Coach)│
│                                                                             │
│ [Cancel]                                              [Escalate to Coach]   │ ← Button (red)
└─────────────────────────────────────────────────────────────────────────────┘
```

### Query History Log - Timeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Query History                                                               │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                             │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ ●  Escalated to Coach                                                  │ │ ← Timeline entry 5
│ │ │  Oct 24, 2025 at 3:45 PM                                            │ │   (most recent)
│ │ │  By: Amma Priya                                                     │ │   Red dot
│ │ │  Reason: Potential Mental Health Crisis                             │ │
│ │ │  Assigned to: Coach Rajesh                                          │ │
│ │ │  Priority: Urgent                                                   │ │
│ │ │                                                                     │ │
│ │ ●  Tags Updated                                                        │ │ ← Timeline entry 4
│ │ │  Oct 24, 2025 at 3:40 PM                                            │ │   Blue dot
│ │ │  By: Amma Priya                                                     │ │
│ │ │  Added: Stress, Family                                              │ │
│ │ │  Removed: None                                                      │ │
│ │ │                                                                     │ │
│ │ ●  Category Reclassified                                               │ │ ← Timeline entry 3
│ │ │  Oct 24, 2025 at 3:38 PM                                            │ │   Orange dot
│ │ │  By: Amma Priya                                                     │ │
│ │ │  From: Academic Help → Emotional Support                            │ │
│ │ │  SLA Adjusted: 4 hours → 1 hour                                     │ │
│ │ │                                                                     │ │
│ │ ●  Response Sent                                                       │ │ ← Timeline entry 2
│ │ │  Oct 24, 2025 at 2:35 PM                                            │ │   Green dot
│ │ │  By: Amma Priya                                                     │ │
│ │ │  Type: Voice Note (1:15 duration)                                   │ │
│ │ │  [▶ Play Voice Note]                                                │ │
│ │ │                                                                     │ │
│ │ ●  Query Created                                                       │ │ ← Timeline entry 1
│ │ │  Oct 24, 2025 at 2:30 PM                                            │ │   Gray dot
│ │ │  Student: Ravi Kumar (STU001)                                       │ │
│ │ │  Category: Academic Help (initial)                                  │ │
│ │ │  Assigned to: Amma Priya                                            │ │
│ └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Measurements Summary

| Component | Width | Height | Padding | Margin | Border | Font |
|-----------|-------|--------|---------|--------|--------|------|
| **2-Column Layout** | 60% / 40% | auto | - | - | - | - |
| **Query Details Panel** | 60% | auto | p-6 | mr-4 | border gray-200 rounded-lg | - |
| **Actions Panel** | 40% | auto | p-6 | - | border gray-200 rounded-lg | - |
| **Category Dropdown** | 100% | 48px | px-4 py-3 | mb-4 | border gray-300 rounded-lg | text-base |
| **Category Option** | 100% | 72px | px-4 py-3 | mb-2 | border gray-200 rounded-lg | - |
| **Tag Input** | 100% | 48px | px-4 py-3 | mb-2 | border gray-300 rounded-lg | text-base |
| **Tag Chip** | auto | 32px | px-3 py-1 | mr-2 mb-2 | rounded-full bg-blue-100 | text-sm |
| **Suggested Tag Button** | auto | 32px | px-3 py-1 | mr-2 mb-2 | border-2 blue-300 rounded-full | text-sm |
| **Reassign Dropdown** | 100% | 48px | px-4 py-3 | mb-2 | border gray-300 rounded-lg | text-base |
| **Amma Option** | 100% | 80px | px-4 py-3 | mb-2 | border gray-200 rounded-lg | - |
| **Escalate Button** | 100% | 48px | px-4 py-3 | mt-4 | bg-red-600 text-white rounded-lg | text-base font-semibold |
| **Escalation Modal** | 700px | auto | px-6 py-4 | - | rounded-lg shadow-xl | - |
| **Timeline Entry** | 100% | auto (min 100px) | px-4 py-3 | mb-4 | border-l-4 gray-300 | - |
| **Timeline Dot** | 12px | 12px | - | mr-3 | rounded-full bg-{color} | - |

---

## 2. Acceptance Criteria

### 2.1. Reclassify Category

- [ ] **RECLASS-01:** Reclassify category dropdown shows 4 options: Emotional Support, Academic Help, Technical Issue, Other
- [ ] **RECLASS-02:** Each option displays category name, SLA duration, description
- [ ] **RECLASS-03:** Selected category highlights with blue background (bg-blue-50)
- [ ] **RECLASS-04:** "Update Category" button triggers PUT `/api/v2/amma/queries/:queryId/reclassify`
- [ ] **RECLASS-05:** Reclassification updates query category in database
- [ ] **RECLASS-06:** SLA timer resets based on new category (Emotional: 1hr, Academic: 4hr, Technical: 2hr, Other: 24hr)
- [ ] **RECLASS-07:** Query history log records: "Category Reclassified from {old} → {new} by {ammaName}"
- [ ] **RECLASS-08:** Warning message displays: "Changing category will reset the SLA timer"

### 2.2. Multi-Tag Input

- [ ] **TAG-01:** Tag input field has autocomplete dropdown showing matching predefined tags
- [ ] **TAG-02:** Autocomplete shows tag name and usage count (e.g., "Anxiety (24 queries)")
- [ ] **TAG-03:** If no matching predefined tags, show "➕ Create new tag '{text}'"
- [ ] **TAG-04:** Clicking predefined tag or "Create new tag" adds tag to Selected Tags list
- [ ] **TAG-05:** Selected tags display as chips with remove button ([×])
- [ ] **TAG-06:** Clicking [×] removes tag from selected list
- [ ] **TAG-07:** Suggested tags (based on category & message) display below input as clickable buttons
- [ ] **TAG-08:** Clicking suggested tag adds it to Selected Tags
- [ ] **TAG-09:** Tags save automatically on add/remove (PUT `/api/v2/amma/queries/:queryId/tags`)
- [ ] **TAG-10:** Query history log records: "Tags Updated: Added [{tags}], Removed [{tags}] by {ammaName}"
- [ ] **TAG-11:** Maximum 10 tags per query

### 2.3. Reassign to Another Amma

- [ ] **REASSIGN-01:** Reassign dropdown shows available Ammas grouped by Balagruha
- [ ] **REASSIGN-02:** Same Balagruha Ammas listed first, other Balagruhas below (collapsible)
- [ ] **REASSIGN-03:** Each Amma option shows: name, open query count, SLA compliance %, expertise area
- [ ] **REASSIGN-04:** Reason textarea optional (max 300 chars)
- [ ] **REASSIGN-05:** Checkbox "Notify new Amma" default checked
- [ ] **REASSIGN-06:** Checkbox "Add reassignment note to query history" default checked
- [ ] **REASSIGN-07:** "Reassign to Amma" button triggers PUT `/api/v2/amma/queries/:queryId/reassign`
- [ ] **REASSIGN-08:** Reassignment updates `query.assignedTo` to new Amma ID
- [ ] **REASSIGN-09:** New Amma receives in-app + email notification: "Query Q-2025-0054 reassigned to you by Amma Priya. Reason: {...}"
- [ ] **REASSIGN-10:** Query history log records: "Reassigned from {oldAmma} to {newAmma} by {currentAmma}. Reason: {...}"
- [ ] **REASSIGN-11:** Query removed from current Amma's dashboard, appears in new Amma's dashboard

### 2.4. Escalate to Coach

- [ ] **ESC-01:** "⚠️ Escalate to Coach" button red color, requires confirmation modal
- [ ] **ESC-02:** Escalation modal shows query details (student, Balagruha, category, tags, query ID)
- [ ] **ESC-03:** Escalation reason dropdown required: Potential Mental Health Crisis, Bullying/Safety, Academic Intervention, Parent Contact, Beyond Expertise, Other
- [ ] **ESC-04:** Additional details textarea required (min 20 chars, max 500 chars)
- [ ] **ESC-05:** Assign to Coach dropdown: Auto-assign (Balagruha coach) or select specific coach
- [ ] **ESC-06:** Priority dropdown: Urgent, High, Normal (default Urgent)
- [ ] **ESC-07:** Checkbox "Notify Coach" default checked
- [ ] **ESC-08:** Checkbox "Mark query as Escalated" default checked
- [ ] **ESC-09:** "Escalate to Coach" button triggers PUT `/api/v2/amma/queries/:queryId/escalate`
- [ ] **ESC-10:** Escalation updates `query.status` to "escalated", `query.escalatedTo` to Coach ID
- [ ] **ESC-11:** Coach receives in-app + email notification: "Query Q-2025-0054 escalated by Amma Priya. Reason: {...}. Priority: Urgent"
- [ ] **ESC-12:** Query history log records: "Escalated to Coach {coachName} by {ammaName}. Reason: {...}. Priority: {...}"
- [ ] **ESC-13:** Query remains visible in Amma dashboard with "Escalated" status badge

### 2.5. Query History Log

- [ ] **HIST-01:** Query history displays timeline of all actions (created, reclassified, tags updated, reassigned, responded, resolved, escalated)
- [ ] **HIST-02:** Each timeline entry shows: action type, timestamp, performed by (Amma name), details
- [ ] **HIST-03:** Timeline dots color-coded: Gray (created), Orange (reclassified), Blue (tags), Green (responded), Purple (reassigned), Red (escalated)
- [ ] **HIST-04:** Timeline sorted by timestamp descending (most recent first)
- [ ] **HIST-05:** Action details expand on click to show full information
- [ ] **HIST-06:** If action includes voice note response, show [▶ Play Voice Note] button

### 2.6. Validation & Error Handling

- [ ] **VAL-01:** Reclassify to same category: Show warning "Category is already '{category}'"
- [ ] **VAL-02:** Reassign to current Amma: Show error "Cannot reassign to yourself"
- [ ] **VAL-03:** Escalate without reason: Disable "Escalate to Coach" button
- [ ] **VAL-04:** Escalate without details (< 20 chars): Show error "Additional details must be at least 20 characters"
- [ ] **VAL-05:** Network error on reclassify/reassign/escalate: Show error toast "Failed to update query. Please try again."

### 2.7. Performance & Accessibility

- [ ] **PERF-01:** Query detail view loads within 1 second
- [ ] **PERF-02:** Autocomplete dropdown appears within 300ms of typing
- [ ] **PERF-03:** Reassign/escalate completes within 1 second
- [ ] **PERF-04:** Query history log renders within 500ms (up to 50 entries)
- [ ] **ACC-01:** Keyboard navigation: Tab through dropdowns, Enter to select, Escape to close
- [ ] **ACC-02:** Screen reader announces: action confirmations, validation errors, success messages
- [ ] **ACC-03:** Timeline entries accessible via arrow keys

---

## 3. Task Breakdown

### Phase 1: Reclassify Category UI & Logic (1 hour)

**Task 1.1: Create reclassify category dropdown (30 min)**
- Component: `ReclassifyCategory.jsx`
- Dropdown with 4 category options (Emotional Support, Academic Help, Technical Issue, Other)
- Each option shows: category name, SLA duration, description
- Selected category highlighted (bg-blue-50)
- "Update Category" button
- File: `frontend/src/components/amma/ReclassifyCategory.jsx`

**Task 1.2: Implement reclassify API call (30 min)**
- PUT `/api/v2/amma/queries/:queryId/reclassify`
- Request body: `{ category, currentAmmaId }`
- Backend updates `query.category`, recalculates `query.sla.deadline`
- Add entry to `query.history`: `{ action: "reclassified", details: "from {old} to {new}" }`
- Return updated query object
- File: `backend/controllers/ammaQueryController.js`

### Phase 2: Multi-Tag Input UI & Logic (1.5 hours)

**Task 2.1: Create multi-tag input component (45 min)**
- Component: `MultiTagInput.jsx`
- Input field with autocomplete dropdown
- Fetch predefined tags from GET `/api/v2/amma/tags/autocomplete?q={query}`
- Autocomplete shows: tag name, usage count
- "Create new tag" option if no matches
- Selected tags display as chips with remove button
- Suggested tags (based on category & message) display as clickable buttons
- File: `frontend/src/components/amma/MultiTagInput.jsx`

**Task 2.2: Implement tag save logic (30 min)**
- PUT `/api/v2/amma/queries/:queryId/tags`
- Request body: `{ tags: ["Anxiety", "Home", "Family"], action: "add"/"remove" }`
- Backend updates `query.tags` array
- Add entry to `query.history`: `{ action: "tags_updated", details: "Added: [...], Removed: [...]" }`
- Return updated query object
- File: `backend/controllers/ammaQueryController.js`

**Task 2.3: Build tag autocomplete API (15 min)**
- GET `/api/v2/amma/tags/autocomplete?q={query}`
- Query predefined tags collection, filter by name (case-insensitive, starts with query)
- Return: `{ tags: [{ name: "Anxiety", usageCount: 24 }] }`
- File: `backend/controllers/ammaTagController.js`

### Phase 3: Reassign to Another Amma UI & Logic (1.5 hours)

**Task 3.1: Create reassign dropdown component (45 min)**
- Component: `ReassignAmma.jsx`
- Dropdown grouped by Balagruha (same Balagruha first, others collapsible)
- Each Amma option shows: name, open query count, SLA compliance %, expertise
- Fetch Ammas from GET `/api/v2/amma/list?balagruhaId={id}`
- Reason textarea (optional, max 300 chars)
- Checkboxes: Notify new Amma, Add note to history
- "Reassign to Amma" button
- File: `frontend/src/components/amma/ReassignAmma.jsx`

**Task 3.2: Implement reassign API call (45 min)**
- PUT `/api/v2/amma/queries/:queryId/reassign`
- Request body: `{ newAmmaId, reason, notifyAmma }`
- Backend updates `query.assignedTo` to new Amma ID
- Add entry to `query.history`: `{ action: "reassigned", details: "from {oldAmma} to {newAmma}. Reason: {...}" }`
- Send notification to new Amma (if notifyAmma=true)
- Return updated query object
- File: `backend/controllers/ammaQueryController.js`

### Phase 4: Escalate to Coach UI & Logic (1.5 hours)

**Task 4.1: Create escalation modal component (45 min)**
- Component: `EscalateToCoachModal.jsx`
- Modal shows query details (student, Balagruha, category, tags, query ID)
- Escalation reason dropdown (6 options)
- Additional details textarea (required, min 20 chars)
- Assign to Coach dropdown (auto or select specific)
- Priority dropdown (Urgent/High/Normal)
- Checkboxes: Notify Coach, Mark as Escalated
- "Escalate to Coach" button (red, disabled until valid)
- File: `frontend/src/components/amma/EscalateToCoachModal.jsx`

**Task 4.2: Implement escalate API call (45 min)**
- PUT `/api/v2/amma/queries/:queryId/escalate`
- Request body: `{ reason, details, coachId, priority, notifyCoach }`
- Backend updates `query.status` to "escalated", `query.escalatedTo` to Coach ID
- Add entry to `query.history`: `{ action: "escalated", details: "Reason: {...}. Priority: {...}" }`
- Send notification to Coach (if notifyCoach=true)
- Return updated query object
- File: `backend/controllers/ammaQueryController.js`

### Phase 5: Query History Log UI (45 min)

**Task 5.1: Create query history timeline component (30 min)**
- Component: `QueryHistoryTimeline.jsx`
- Timeline layout with dots color-coded by action type
- Entry shows: action type, timestamp, performed by, details
- Expandable entries for full details
- Voice note responses show [▶ Play Voice Note] button
- Sort by timestamp descending
- File: `frontend/src/components/amma/QueryHistoryTimeline.jsx`

**Task 5.2: Fetch query history from API (15 min)**
- GET `/api/v2/amma/queries/:queryId/history`
- Return: `{ history: [{ action, performedBy, details, timestamp }] }`
- File: `backend/controllers/ammaQueryController.js`

### Phase 6: Testing & Polish (45 min)

**Task 6.1: Unit tests for query management APIs (30 min)**
- Test reclassify: updates category, resets SLA, adds history entry
- Test tags: adds/removes tags, adds history entry
- Test reassign: updates assignedTo, sends notification, adds history entry
- Test escalate: updates status, escalatedTo, sends notification, adds history entry
- Mock query, Amma, Coach data
- File: `backend/tests/controllers/ammaQueryController.test.js`

**Task 6.2: E2E test for query management workflow (15 min)**
- Test: Amma opens query, reclassifies category, sees SLA timer reset
- Test: Amma adds tags, sees tags in selected list
- Test: Amma reassigns query, new Amma receives notification
- Test: Amma escalates query, Coach receives notification
- Verify query history log records all actions
- File: `frontend/tests/e2e/amma-query-management.spec.js`

---

## 4. API Endpoints

### 4.1. Reclassify Query

**Endpoint:** `PUT /api/v2/amma/queries/:queryId/reclassify`

**Request Body:**
```json
{
  "category": "Emotional Support",
  "currentAmmaId": "amma123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "query": {
      "queryId": "Q-2025-0054",
      "category": "Emotional Support",
      "sla": {
        "deadline": "2025-10-24T16:30:00Z",
        "minutesRemaining": 55
      }
    },
    "message": "Category reclassified successfully. SLA timer reset."
  }
}
```

---

### 4.2. Update Query Tags

**Endpoint:** `PUT /api/v2/amma/queries/:queryId/tags`

**Request Body:**
```json
{
  "tags": ["Anxiety", "Home", "Family", "Stress"],
  "action": "add"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "query": {
      "queryId": "Q-2025-0054",
      "tags": ["Anxiety", "Home", "Family", "Stress"]
    }
  }
}
```

---

### 4.3. Reassign Query

**Endpoint:** `PUT /api/v2/amma/queries/:queryId/reassign`

**Request Body:**
```json
{
  "newAmmaId": "amma456",
  "reason": "Amma Lakshmi has better expertise in emotional support issues.",
  "notifyAmma": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "query": {
      "queryId": "Q-2025-0054",
      "assignedTo": "amma456"
    },
    "message": "Query reassigned successfully. Amma Lakshmi has been notified."
  }
}
```

---

### 4.4. Escalate Query to Coach

**Endpoint:** `PUT /api/v2/amma/queries/:queryId/escalate`

**Request Body:**
```json
{
  "reason": "Potential Mental Health Crisis",
  "details": "Student mentioned feeling very anxious about home situation. Parents fighting frequently, affecting studies. Recommend immediate Coach intervention to assess mental health and consider counseling.",
  "coachId": "auto",
  "priority": "urgent",
  "notifyCoach": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "query": {
      "queryId": "Q-2025-0054",
      "status": "escalated",
      "escalatedTo": "coach789"
    },
    "message": "Query escalated successfully. Coach Rajesh has been notified."
  }
}
```

---

## 5. MongoDB Schema Updates

### 5.1. Queries Collection (Enhanced)

```javascript
const QuerySchema = new mongoose.Schema({
  // ... existing fields

  category: {
    type: String,
    enum: ['Emotional Support', 'Academic Help', 'Technical Issue', 'Other'],
    required: true,
    index: true
  },
  tags: [{
    type: String,
    index: true
  }],
  history: [
    {
      action: {
        type: String,
        enum: ['created', 'reclassified', 'tags_updated', 'reassigned', 'responded', 'resolved', 'escalated']
      },
      performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Amma or Coach
      },
      details: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  escalatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Coach ID
  }
});
```

---

## 6. File Paths

```
frontend/src/components/amma/
├── ReclassifyCategory.jsx           # Reclassify category dropdown
├── MultiTagInput.jsx                # Multi-tag input with autocomplete
├── ReassignAmma.jsx                 # Reassign to another Amma dropdown
├── EscalateToCoachModal.jsx         # Escalate to Coach modal
├── QueryHistoryTimeline.jsx         # Query history log timeline
└── QueryDetailView.jsx              # Query detail view (updated)

backend/controllers/
├── ammaQueryController.js           # Reclassify, tags, reassign, escalate APIs
└── ammaTagController.js             # Tag autocomplete API

backend/models/
└── Query.js                         # Query schema (updated)

backend/routes/v2/
└── amma.js                          # Amma routes (updated)

backend/tests/controllers/
└── ammaQueryController.test.js      # Unit tests

frontend/tests/e2e/
└── amma-query-management.spec.js    # E2E tests
```

---

## 7. Definition of Done

- [ ] Reclassify category dropdown functional with 4 options
- [ ] Reclassifying updates category and resets SLA timer
- [ ] Multi-tag input with autocomplete shows predefined tags
- [ ] Tags save automatically on add/remove
- [ ] Suggested tags (based on category) display below input
- [ ] Reassign dropdown shows available Ammas grouped by Balagruha
- [ ] Reassigning transfers query to new Amma and sends notification
- [ ] Escalate to Coach modal opens with confirmation
- [ ] Escalation creates Coach task and sends notification
- [ ] Query history log displays all actions in timeline format
- [ ] History entries color-coded by action type
- [ ] All actions (reclassify, tags, reassign, escalate) logged in query history
- [ ] Unit tests: 80%+ coverage for query management logic
- [ ] E2E tests: Full workflow tested (reclassify → tags → reassign → escalate)
- [ ] Code peer-reviewed
- [ ] Merged to `develop`

---

**Dev Agent Record:**
- **Created:** 2025-10-24 15:41:02
- **Status:** Draft - Ready for Development

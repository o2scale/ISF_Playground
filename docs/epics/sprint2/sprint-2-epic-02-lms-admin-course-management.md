# Sprint 2 - Epic 02: LMS Admin Course Management

**Epic ID:** SPRINT2-EPIC-02
**Epic Name:** LMS Admin Course Management
**Sprint:** Sprint 2
**Version:** 1.0
**Date:** October 24, 2025
**Last Updated:** 2025-10-24 13:49:47
**Status:** Draft - Ready for Story Breakdown
**Estimated Effort:** 35-45 hours (4-6 development days)
**Priority:** Critical (P0)
**Dependencies:** Sprint 1.1 (RBAC)

---

## 1. Epic Overview

### 1.1. Epic Purpose

This epic delivers the complete Admin-only course creation and management system. Admins have exclusive rights to create, edit, populate, publish, translate, and archive courses. The system enables:

- Hierarchical course structure (Module → Chapter → Content Item)
- Rich content upload (videos, PDFs, audio, images, text, links)
- Quiz and assessment builder
- Multi-language translation (English → Telugu)
- Publishing workflow (Draft → Published → Archived)

### 1.2. User Personas

**Primary:** Administrator
- Creates and manages all courses
- Uploads multimedia content
- Builds quizzes and assessments
- Translates content to Telugu
- Publishes or archives courses

**Secondary:** Student (Consumer of created courses)
**Secondary:** Coach (Assigns published courses to students)

### 1.3. Epic Goals

1. **Enable Course Authoring:** Intuitive course builder with drag-and-drop reordering
2. **Support Rich Media:** Upload videos, PDFs, audio, images to AWS S3
3. **Facilitate Assessment:** Quiz builder with multiple question types
4. **Enable Localization:** Translation module for Telugu content
5. **Lifecycle Management:** Draft → Published → Archived workflow

---

## 2. Story Breakdown

### **Story 01: Course Creation & Structure Builder**
**Estimated Effort:** 10-12 hours

**Description:**
Hierarchical course builder with Module → Chapter → Content Item structure. Drag-and-drop reordering at all levels. Course metadata (title, description, category, difficulty, thumbnail).

**Key Features:**
- Create/Edit/Delete courses
- Hierarchical tree view with expand/collapse
- Drag-and-drop reordering (react-beautiful-dnd)
- Course metadata form: title, description, category dropdown, difficulty radio buttons, thumbnail upload
- Save as Draft or Publish workflow
- Archive course (soft delete)

**Acceptance Criteria:**
- [ ] Create new course with metadata
- [ ] Add/Edit/Delete modules, chapters, content items
- [ ] Drag-and-drop reordering works at all levels
- [ ] Save as Draft saves to MongoDB
- [ ] Publish makes course visible to coaches
- [ ] Archive hides course from students but retains data

---

### **Story 02: Content Management Module**
**Estimated Effort:** 10-12 hours

**Description:**
Bulk upload interface for videos, PDFs, audio, images. Drag-and-drop or file browser upload. Multi-file upload queue with progress indicators. Automatic AWS S3 integration with CDN URL generation.

**Key Features:**
- Drag-and-drop file upload
- Multi-file upload queue
- File type filters (Video, Image, PDF, Audio)
- Upload progress indicators (%, MB uploaded)
- Pause, Resume, Cancel uploads
- AWS S3 upload with signed URLs
- Content library for selecting uploaded files

**Acceptance Criteria:**
- [ ] Drag-and-drop file upload works
- [ ] Multi-file upload queue displays all files
- [ ] Progress indicators update in real-time
- [ ] Pause and Resume work correctly
- [ ] Files upload to S3 successfully
- [ ] S3 CDN URLs saved to MongoDB
- [ ] Content library displays all uploaded files

---

### **Story 03: Quiz System & Assessment Builder**
**Estimated Effort:** 8-10 hours

**Description:**
Quiz builder with multiple question types (MCQ, True/False, Fill-in-the-blank). Question bank management. Quiz settings (time limit, passing score, random order).

**Key Features:**
- Create/Edit/Delete quizzes
- Question types: MCQ (single/multiple correct), True/False, Fill-in-the-blank
- Question bank for reusable questions
- Quiz settings: title, description, time limit, passing score, random question order
- Preview quiz before publishing
- Associate quiz with course chapter

**Acceptance Criteria:**
- [ ] Create quiz with metadata
- [ ] Add questions of all supported types
- [ ] Question bank saves reusable questions
- [ ] Quiz settings save correctly
- [ ] Preview shows quiz as students will see it
- [ ] Quiz associates with correct course chapter
- [ ] Students can take quiz and see results

---

### **Story 04: Translation Module**
**Estimated Effort:** 6-8 hours

**Description:**
Add Telugu translations for course content. Side-by-side English and Telugu fields. Translation progress tracking. Publish translations workflow.

**Key Features:**
- Select course for translation
- Side-by-side English (read-only) and Telugu (editable) fields
- Translation progress indicator (% translated)
- Mark as Translated or Skip workflow
- Save Progress vs. Publish Translations
- Support for video titles, descriptions, quiz questions, instructions

**Acceptance Criteria:**
- [ ] Select course opens translation interface
- [ ] English content displays read-only
- [ ] Telugu fields are editable
- [ ] Mark as Translated updates progress
- [ ] Skip moves to next item
- [ ] Save Progress saves without publishing
- [ ] Publish Translations makes Telugu content live
- [ ] Students see translated content

---

### **Story 05: Course Publishing & Archiving Workflow**
**Estimated Effort:** 4-6 hours

**Description:**
Publishing workflow with validation checks. Archive courses while retaining data. Course status management (Draft, Published, Archived).

**Key Features:**
- Publish button with validation checks (all required fields filled)
- Draft courses visible only to admin
- Published courses visible to coaches for assignment
- Archive button (soft delete, retains data)
- Archived courses hidden from students but visible in admin panel with "Archived" badge
- Restore archived course workflow

**Acceptance Criteria:**
- [ ] Publish button validates required fields
- [ ] Validation errors display clearly
- [ ] Published courses appear in coach assignment interface
- [ ] Archive button soft-deletes course
- [ ] Archived courses hidden from students
- [ ] Admin can view archived courses
- [ ] Restore button unarchives course

---

## 3. Epic-Wide UI Guidelines

### 3.1. Design System References

All admin screens follow the **Sprint 2 LMS Design System** (`docs/design-systems/sprint-2-lms-design-system.md`).

**Key Design Patterns:**
- **Admin Purple Theme (Section 9.1):** Distinct purple color scheme for admin panels
- **Course Builder Tree (Section 9.2):** Hierarchical drag-and-drop interface
- **Drag-and-Drop Upload (Section 9.3):** Multi-file upload with progress indicators
- **Translation Interface (Section 9.4):** Side-by-side English/Telugu fields
- **Admin Reports (Section 9.5):** Data visualization and export options

### 3.2. Color Palette (Admin-Specific)

```css
/* Admin Purple Theme */
--admin-purple: #9333EA;        /* Primary admin color */
--admin-purple-light: #E9D5FF;  /* Admin panel backgrounds */
--admin-purple-dark: #7E22CE;   /* Hover states */

/* Status Colors */
--draft-gray: #6B7280;          /* Draft status */
--published-green: #16A34A;     /* Published status */
--archived-red: #DC2626;        /* Archived status */
```

### 3.3. Admin Panel Header

```jsx
<header className="bg-purple-600 text-white px-6 py-4 border-b border-purple-700">
  <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold">Course Management</h1>
    <div className="flex items-center gap-4">
      <button className="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800">
        + Create New Course
      </button>
      <span>Admin: {adminName}</span>
    </div>
  </div>
</header>
```

### 3.4. Course Status Badge

```jsx
{/* Draft */}
<span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-full">
  Draft
</span>

{/* Published */}
<span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
  Published
</span>

{/* Archived */}
<span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
  Archived
</span>
```

---

## 4. Technical Architecture

### 4.1. Database Schemas (Epic-Specific)

**Courses Collection:**
```javascript
{
  _id: ObjectId,
  title: String,                  // "Advanced Computer Apps"
  description: String,            // Course overview
  category: String,               // "Computer Apps", "Art", "Spoken English", "Life Skills"
  difficulty: String,             // "Beginner", "Intermediate", "Advanced"
  thumbnail: String,              // S3 URL
  language: String,               // "English" (default)
  translations: {
    telugu: {
      title: String,
      description: String
    }
  },
  structure: [                    // Array of modules
    {
      moduleId: ObjectId,
      moduleTitle: String,
      order: Number,
      chapters: [                 // Array of chapters
        {
          chapterId: ObjectId,
          chapterTitle: String,
          order: Number,
          contentItems: [         // Array of content items
            {
              contentItemId: ObjectId,
              type: String,       // "video", "pdf", "audio", "image", "text", "link", "quiz", "task"
              title: String,
              fileUrl: String,    // S3 URL (if applicable)
              content: String,    // Text content (if type is "text")
              order: Number,
              metadata: {
                duration: Number, // For videos/audio (seconds)
                fileSize: Number, // Bytes
                pages: Number     // For PDFs
              },
              translations: {
                telugu: {
                  title: String,
                  content: String
                }
              }
            }
          ]
        }
      ]
    }
  ],
  status: String,                 // "draft", "published", "archived"
  createdBy: ObjectId,            // Reference to Admin user
  publishedAt: Date,
  archivedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**Quizzes Collection:**
```javascript
{
  _id: ObjectId,
  title: String,                  // "File Management Basics"
  description: String,
  courseId: ObjectId,             // Reference to Courses
  chapterId: ObjectId,            // Reference to chapter within course
  questions: [
    {
      questionId: ObjectId,
      type: String,               // "mcq_single", "mcq_multiple", "true_false", "fill_blank"
      questionText: String,
      options: [                  // For MCQ
        {
          optionId: String,       // "A", "B", "C", "D"
          text: String,
          isCorrect: Boolean
        }
      ],
      correctAnswer: String,      // For True/False, Fill-in-the-blank
      points: Number,             // Points for this question
      order: Number,
      translations: {
        telugu: {
          questionText: String,
          options: [...]
        }
      }
    }
  ],
  settings: {
    timeLimit: Number,            // Minutes (0 = no limit)
    passingScore: Number,         // Percentage (0-100)
    randomizeQuestions: Boolean,
    randomizeOptions: Boolean,
    showResults: String           // "immediate", "after_submission", "never"
  },
  status: String,                 // "draft", "published"
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

**ContentLibrary Collection:**
```javascript
{
  _id: ObjectId,
  fileName: String,               // "intro_video.mp4"
  fileType: String,               // "video", "pdf", "audio", "image"
  fileUrl: String,                // S3 URL
  fileSize: Number,               // Bytes
  uploadedBy: ObjectId,           // Reference to Admin user
  metadata: {
    duration: Number,             // For video/audio (seconds)
    dimensions: {                 // For images/videos
      width: Number,
      height: Number
    },
    mimeType: String              // "video/mp4", "application/pdf", etc.
  },
  tags: [String],                 // ["intro", "computer-apps", "beginner"]
  usedInCourses: [ObjectId],      // References to Courses using this file
  uploadedAt: Date,
  createdAt: Date
}
```

---

## 5. API Endpoints (Epic-Specific)

**Base URL:** `/api/v2/lms/admin`

### 5.1. Course Management APIs

**POST `/api/v2/lms/admin/courses`**
- **Purpose:** Create new course
- **Request Body:**
```json
{
  "title": "Advanced Computer Apps",
  "description": "Learn MS Office suite",
  "category": "Computer Apps",
  "difficulty": "Intermediate",
  "thumbnail": "https://s3.amazonaws.com/..."
}
```
- **Response:** `{ "success": true, "courseId": "course123" }`

**PUT `/api/v2/lms/admin/courses/:courseId`**
- **Purpose:** Update course metadata or structure
- **Request Body:** Same as POST
- **Response:** `{ "success": true, "message": "Course updated" }`

**PUT `/api/v2/lms/admin/courses/:courseId/publish`**
- **Purpose:** Publish course (changes status from draft to published)
- **Response:** `{ "success": true, "publishedAt": "2025-10-24T14:00:00Z" }`

**PUT `/api/v2/lms/admin/courses/:courseId/archive`**
- **Purpose:** Archive course (soft delete)
- **Response:** `{ "success": true, "archivedAt": "2025-10-24T14:00:00Z" }`

**DELETE `/api/v2/lms/admin/courses/:courseId`**
- **Purpose:** Permanently delete course (hard delete, use with caution)
- **Response:** `{ "success": true, "message": "Course deleted permanently" }`

### 5.2. Content Upload APIs

**POST `/api/v2/lms/admin/content/upload`**
- **Purpose:** Upload media file to S3
- **Request:** Multipart form-data
  - `file`: Media file
  - `fileType`: "video" | "pdf" | "audio" | "image"
  - `tags`: Array of tags (optional)
- **Response:**
```json
{
  "success": true,
  "fileUrl": "https://s3.amazonaws.com/isf-playground/content/video123.mp4",
  "contentLibraryId": "lib456",
  "metadata": {
    "fileName": "intro_video.mp4",
    "fileSize": 15728640,
    "duration": 180
  }
}
```

**GET `/api/v2/lms/admin/content/library`**
- **Purpose:** Fetch all uploaded content
- **Query Params:** `?fileType=video&tags=intro`
- **Response:**
```json
{
  "files": [
    {
      "id": "lib456",
      "fileName": "intro_video.mp4",
      "fileType": "video",
      "fileUrl": "https://s3.amazonaws.com/...",
      "fileSize": 15728640,
      "uploadedAt": "2025-10-24T10:00:00Z"
    }
  ]
}
```

### 5.3. Quiz APIs

**POST `/api/v2/lms/admin/quizzes`**
- **Purpose:** Create new quiz
- **Request Body:**
```json
{
  "title": "File Management Basics",
  "description": "Test your knowledge",
  "courseId": "course123",
  "chapterId": "chapter456",
  "questions": [...],
  "settings": { "timeLimit": 10, "passingScore": 70 }
}
```
- **Response:** `{ "success": true, "quizId": "quiz789" }`

**PUT `/api/v2/lms/admin/quizzes/:quizId`**
- **Purpose:** Update quiz
- **Response:** `{ "success": true }`

---

## 6. Dependencies

### 6.1. Internal Dependencies
- **Sprint 1.1 RBAC:** Admin authentication and authorization
- **Epic 01 (Student Experience):** Consumes created courses
- **Epic 03 (Coach Functionality):** Assigns published courses

### 6.2. External Dependencies
- **AWS S3:** Media file storage
- **MongoDB Atlas:** Course and content storage

---

## 7. Success Criteria

### 7.1. Functional Success Metrics
- [ ] Admin can create course with 3-level hierarchy (Module → Chapter → Content Item)
- [ ] Drag-and-drop reordering works at all levels
- [ ] Files upload to S3 successfully (video, PDF, audio, image)
- [ ] Quiz builder supports all question types
- [ ] Translation module supports English → Telugu
- [ ] Published courses visible to coaches
- [ ] Archived courses hidden from students

### 7.2. Technical Success Metrics
- [ ] Course creation < 2 seconds
- [ ] File upload < 10 seconds for 50MB file
- [ ] S3 upload success rate > 99%
- [ ] Course structure supports up to 10 modules, 20 chapters per module, 50 content items per chapter

---

## 8. Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| S3 upload failures | Medium | High | Retry queue with exponential backoff; local storage until successful |
| Large file uploads (>100MB) | Medium | Medium | Chunked uploads with progress indicators; compression recommendations |
| Translation accuracy | Low | Medium | Manual review by Telugu-speaking QA; provide context for translators |

---

## 9. Related Documents

- **Sprint 2 MPSD:** `docs/epics/sprint-2-master-plan.md`
- **Sprint 2 Design System:** `docs/design-systems/sprint-2-lms-design-system.md`

---

## 10. Approval & Sign-Off

**Epic Owner:** Dev Team Lead
**Reviewed By:** Product Owner, QA Lead
**Status:** Draft - Awaiting Story Breakdown

---

**Next Steps:**
1. Create 5 story files from this epic
2. Generate E2E test templates
3. Create quality gate YAML files
4. Assign stories to developers

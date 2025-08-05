# WTF (Wall of Fame) Backend Tasks

## 📊 Progress Summary
- **Total Backend Tasks**: ~30 tasks
- **Completed**: 3 tasks (Database Models)
- **In Progress**: 0 tasks
- **Remaining**: ~27 tasks
- **Completion**: 10% ✅

## Overview
This document outlines all backend tasks required for the WTF feature implementation, taking into account the existing backend infrastructure.

## ✅ What's Already Implemented (Can Omit)

### Authentication & Authorization
- [x] **JWT-based authentication** - `middleware/auth.js` (2.7KB, 111 lines)
- [x] **Role-based access control** - `middleware/checkPermission.js` (1.1KB, 44 lines)
- [x] **Authentication routes** - `routes/auth.js` (11KB, 398 lines)

### File Management & AWS Integration
- [x] **AWS S3 integration** - `services/aws/s3.js` (2.3KB, 80 lines)
- [x] **File upload middleware** - `middleware/upload.js` (1.2KB, 45 lines)
- [x] **Pre-signed URL generation** - Already implemented in S3 service

### Security & Performance
- [x] **JWT validation** - Already implemented in auth middleware
- [x] **Role-based access control** - Already implemented
- [x] **Secure file upload endpoints** - Already implemented
- [x] **CDN caching** - AWS S3 integration provides this
- [x] **Database query optimization** - MongoDB with Mongoose already optimized

### API Documentation
- [x] **Swagger/OpenAPI documentation** - Available at `/api-docs`
- [x] **API endpoint testing** - Swagger UI provides testing interface

## 📋 Required Backend Tasks

### Phase 1: Core Infrastructure & Foundation

#### 1. Database Models (3 new files) ✅ COMPLETED
- [x] **Create `models/wtfPin.js`** ✅
  - [x] Define pin schema with fields: title, content, type, author, status, createdAt, expiresAt
  - [x] Add validation for pin types (image, video, audio, text, link)
  - [x] Add indexes for performance (status, createdAt, author)
  - [x] Add virtual fields for engagement metrics
  - [x] Add lifecycle management (7-day expiration, FIFO)
  - [x] Add engagement tracking (likes, seen, shares)
  - [x] Add multi-language support (Hindi, English, both)
  - [x] Add official content flag (ISF Official Post)

- [x] **Create `models/wtfStudentInteraction.js`** ✅
  - [x] Define interaction schema with fields: studentId, pinId, type (like/seen), createdAt
  - [x] Add compound indexes for performance (studentId + pinId, pinId + type)
  - [x] Add validation for interaction types
  - [x] Add like variants (thumbs_up, green_heart)
  - [x] Add view duration tracking for seen events
  - [x] Add session and device tracking
  - [x] Add unique constraints to prevent duplicates

- [x] **Create `models/wtfSubmission.js`** ✅
  - [x] Define submission schema with fields: studentId, type (voice/article), content, status, createdAt
  - [x] Add indexes for performance (status, studentId, createdAt)
  - [x] Add validation for submission types and content
  - [x] Add review workflow (pending → approved/rejected → archived)
  - [x] Add voice note features (audio URL, duration, transcription)
  - [x] Add article features (content, language, word count)
  - [x] Add draft functionality
  - [x] Add review system with notes and timestamps

#### 2. Data Access Layer (3 new files)
- [ ] **Create `data-access/wtfPin.js`**
  - [ ] Implement CRUD operations for pins
  - [ ] Add methods for fetching active pins with pagination
  - [ ] Add methods for pin lifecycle management (expiration, FIFO)
  - [ ] Add methods for engagement analytics

- [ ] **Create `data-access/wtfStudentInteraction.js`**
  - [ ] Implement interaction tracking (like/unlike, seen)
  - [ ] Add methods for interaction analytics
  - [ ] Add methods for bulk interaction operations

- [ ] **Create `data-access/wtfSubmission.js`**
  - [ ] Implement CRUD operations for submissions
  - [ ] Add methods for submission review workflow
  - [ ] Add methods for submission analytics

#### 3. Business Logic Layer (1 new file)
- [ ] **Create `services/wtf.js`**
  - [ ] Implement pin management business logic
  - [ ] Implement interaction processing logic
  - [ ] Implement submission review workflow
  - [ ] Implement coin awarding logic
  - [ ] Implement lifecycle management (expiration, FIFO)

#### 4. Controllers (1 new file)
- [ ] **Create `controllers/wtfController.js`**
  - [ ] Implement pin management endpoints
  - [ ] Implement interaction endpoints
  - [ ] Implement submission endpoints
  - [ ] Add proper error handling and validation
  - [ ] Add request/response logging

#### 5. Routes (1 new file)
- [ ] **Create `routes/v1/wtf.js`**
  - [ ] Define all WTF API endpoints
  - [ ] Add middleware for authentication and permissions
  - [ ] Add input validation
  - [ ] Add Swagger documentation

#### 6. Extend Existing Systems
- [ ] **Extend Role System**
  - [ ] Add WTF permissions to `constants/users.js`
  - [ ] Add permissions: `wtf:pin:create`, `wtf:submission:review`, `wtf:submission:suggest`, `wtf:like:create`, `wtf:submission:create`
  - [ ] Update role controller to handle WTF permissions

- [ ] **Extend Auth Middleware**
  - [ ] Add WTF permission checks to `middleware/checkPermission.js`
  - [ ] Add WTF-specific authorization logic

- [ ] **Extend AWS S3 Service**
  - [ ] Add WTF-specific file handling methods to `services/aws/s3.js`
  - [ ] Add methods for WTF media upload and retrieval
  - [ ] Add thumbnail generation for WTF content

### Phase 6: ISF Coin Integration

#### 7. Coin Integration
- [ ] **Extend Coin System**
  - [ ] Add coin awarding logic to WTF pin creation
  - [ ] Extend existing coin transaction logging
  - [ ] Add WTF-specific coin configuration
  - [ ] Add error handling for coin transactions

### Phase 7: Automated Lifecycle Management

#### 8. Scheduled Jobs
- [ ] **Create Pin Lifecycle Management**
  - [ ] Implement pin expiration job (7-day rule)
  - [ ] Implement FIFO management job (20 active pins limit)
  - [ ] Add job scheduling using node-cron or similar
  - [ ] Add logging for automated actions

#### 9. Extend Logging
- [ ] **Add WTF Logging**
  - [ ] Extend existing pino logger for WTF events
  - [ ] Add WTF-specific log levels and formats
  - [ ] Add lifecycle event logging

### Phase 8: Security & Performance

#### 10. Security Enhancements
- [ ] **Input Sanitization**
  - [ ] Add content sanitization for WTF submissions
  - [ ] Implement XSS prevention for WTF content
  - [ ] Add content validation for WTF submissions

- [ ] **Access Control**
  - [ ] Add rate limiting for WTF endpoints
  - [ ] Add WTF-specific security headers
  - [ ] Add content size limits for WTF uploads

#### 11. Performance Optimization
- [ ] **Image & Video Processing**
  - [ ] Add AWS Lambda integration for image processing
  - [ ] Implement WebP conversion for WTF images
  - [ ] Add video thumbnail generation
  - [ ] Add video transcoding support

- [ ] **Caching Strategy**
  - [ ] Add Redis caching for frequently accessed WTF data
  - [ ] Implement cache invalidation for WTF content
  - [ ] Add browser caching headers for WTF media

### Phase 5: Real-time Features

#### 12. WebSocket Integration
- [ ] **Real-time Updates**
  - [ ] Add WebSocket server for WTF real-time features
  - [ ] Implement like interaction real-time updates
  - [ ] Add new pin notifications
  - [ ] Add connection state management

### Phase 10: Testing

#### 13. Testing Implementation
- [ ] **Unit Tests**
  - [ ] Test WTF models and validation
  - [ ] Test WTF data access methods
  - [ ] Test WTF service business logic
  - [ ] Test WTF controller endpoints

- [ ] **Integration Tests**
  - [ ] Test complete WTF user flows
  - [ ] Test WTF admin workflows
  - [ ] Test WTF submission and review process
  - [ ] Test WTF real-time features

- [ ] **Performance Tests**
  - [ ] Test WTF API response times
  - [ ] Test WTF media loading performance
  - [ ] Test WTF database query performance

## 🎯 API Endpoints to Implement

### WTF Pins Management
- [ ] `GET /api/v1/wtf/pins` - Fetch active pins for student view
- [ ] `POST /api/v1/wtf/pins` - Create new pin (Admin only)
- [ ] `PUT /api/v1/wtf/pins/:pinId` - Update pin (Admin only)
- [ ] `DELETE /api/v1/wtf/pins/:pinId` - Delete pin (Admin only)
- [ ] `PATCH /api/v1/wtf/pins/:pinId/status` - Change pin status

### Student Interactions
- [ ] `POST /api/v1/wtf/pins/:pinId/like` - Like/unlike pin
- [ ] `POST /api/v1/wtf/pins/:pinId/seen` - Mark pin as seen
- [ ] `GET /api/v1/wtf/pins/:pinId/interactions` - Get interaction counts

### Submissions
- [ ] `POST /api/v1/wtf/submissions/voice` - Submit voice note
- [ ] `POST /api/v1/wtf/submissions/article` - Submit article
- [ ] `GET /api/v1/wtf/submissions` - Get submissions (Admin only)
- [ ] `PUT /api/v1/wtf/submissions/:submissionId/review` - Review submission

## 📊 Database Collections to Create

### New Collections ✅ COMPLETED
- [x] `wtf_pins` - Store pin content and metadata ✅
- [x] `wtf_student_interactions` - Track student interactions (likes, seen) ✅
- [x] `wtf_submissions` - Store student submissions (voice notes, articles) ✅

### Indexes to Create ✅ COMPLETED
- [x] `wtf_pins`: `{ status: 1, createdAt: -1 }` - For active pins query ✅
- [x] `wtf_pins`: `{ author: 1, createdAt: -1 }` - For author's pins ✅
- [x] `wtf_pins`: `{ type: 1, status: 1 }` - For type-based queries ✅
- [x] `wtf_pins`: `{ expiresAt: 1 }` - For expiration queries ✅
- [x] `wtf_pins`: `{ isOfficial: 1, status: 1 }` - For official posts ✅
- [x] `wtf_student_interactions`: `{ studentId: 1, pinId: 1, type: 1 }` - For unique interactions ✅
- [x] `wtf_student_interactions`: `{ pinId: 1, type: 1 }` - For interaction counts ✅
- [x] `wtf_student_interactions`: `{ studentId: 1, createdAt: -1 }` - For student's interaction history ✅
- [x] `wtf_submissions`: `{ status: 1, createdAt: -1 }` - For pending reviews ✅
- [x] `wtf_submissions`: `{ type: 1, status: 1 }` - For type-based queries ✅
- [x] `wtf_submissions`: `{ studentId: 1, createdAt: -1 }` - For student's submissions ✅

## 🔧 Integration Points

### Existing Systems to Extend
- [ ] **User System** - Extend existing user model for WTF interactions
- [ ] **Role System** - Add WTF permissions to existing roles
- [ ] **Coin System** - Extend existing coin system for WTF rewards
- [ ] **File Upload** - Extend existing S3 service for WTF media
- [ ] **Logging** - Extend existing pino logger for WTF events

## 📈 Priority Order

### High Priority (MVP)
1. Database models and data access layer
2. Core API endpoints (pins, interactions, submissions)
3. Basic business logic and controllers
4. Route setup and authentication integration

### Medium Priority
1. Coin integration
2. Lifecycle management (expiration, FIFO)
3. Security enhancements
4. Performance optimization

### Low Priority
1. Real-time WebSocket features
2. Advanced testing
3. Advanced image/video processing

## 📝 Notes

- Follow existing backend patterns and conventions
- Use existing middleware and utilities where possible
- Extend rather than replace existing functionality
- Maintain consistency with current API structure
- Use existing error handling and logging patterns
- Follow existing security practices

---

**Total Backend Tasks: ~50 tasks**
**Tasks We Can Omit: ~20 tasks (already implemented)**
**Actual Tasks to Implement: ~30 tasks**

*Last Updated: [Current Date]*
*Status: Planning Phase* 
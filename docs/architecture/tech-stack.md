# Technology Stack

## Overview
ISF Playground is a full-stack Electron desktop application with embedded MongoDB, built for offline-first operation at Indian School of Fitness children's homes.

## Core Technologies

### Frontend
- **React:** 19.0.0 (latest)
- **React Router:** 7.2.0 for client-side routing
- **React Hot Toast:** 2.5.2 for notifications
- **Axios:** 1.7.9 for HTTP requests
- **Face-API.js:** 0.22.2 for facial recognition

### UI Component Library
- **Radix UI:** Comprehensive unstyled component library
  - @radix-ui/react-dialog
  - @radix-ui/react-dropdown-menu
  - @radix-ui/react-select
  - @radix-ui/react-toast
  - @radix-ui/react-tabs
  - +30 more Radix components

### Styling
- **CSS Modules:** Component-specific CSS files
- **Lucide React:** Icon library (0.462.0)
- **FontAwesome:** 6.7.2 for additional icons
- **Class Variance Authority:** 0.7.1 for variant styling
- **Tailwind Merge:** 2.6.0 (but NOT using Tailwind CSS)

### Backend
- **Node.js Runtime:** Embedded in Electron
- **Express:** 4.21.2 web framework
- **Mongoose:** 8.10.2 ODM for MongoDB
- **MongoDB:** 6.8.0 embedded database

### Authentication & Security
- **JWT:** jsonwebtoken 9.0.2
- **Bcrypt:** bcryptjs 3.0.2 for password hashing
- **Helmet:** 8.0.0 security headers
- **CORS:** 2.8.5 cross-origin resource sharing
- **Rate Limiting:** express-rate-limit 7.4.1
- **Validation:** express-validator 7.2.1

### AI/ML
- **Face-API.js:** 0.22.2 (frontend + backend)
- **TensorFlow.js:** @tensorflow/tfjs-node 4.22.0
- **Canvas:** 3.1.0 for image processing
- **Sharp:** 0.34.3 for image optimization

### File Upload & Storage
- **Multer:** 1.4.5-lts.1 for multipart/form-data
- **AWS SDK S3:** @aws-sdk/client-s3 3.772.0
- **FFmpeg:** @ffmpeg-installer/ffmpeg 1.1.0, @ffmpeg/ffmpeg 0.12.15
- **Fluent-FFmpeg:** 2.1.3 for video processing

### Real-time Communication
- **WebSocket:** ws 8.18.3
- Implementation: Custom WebSocket service in `backend/services/wtfWebSocket.js`

### Scheduling & Background Jobs
- **Node-Cron:** 4.2.1 for scheduled tasks
- Use case: WTF pin expiration, weekly stats reset

### Logging
- **Pino:** 9.6.0 high-performance logger
- **@logtail/pino:** 0.5.2 for log aggregation
- **Morgan:** 1.10.0 HTTP request logger

### API Documentation
- **Swagger:** swagger-jsdoc 6.2.8, swagger-ui-express 5.0.1
- Available at: `http://localhost:5001/api-docs`

### Testing
- **Jest:** 30.0.5 for unit/integration tests
- **Supertest:** 7.1.4 for API testing
- **MongoDB Memory Server:** 10.2.0 for test database

### Electron Desktop
- **Electron:** 34.2.0
- **Electron Builder:** 24.13.3 for packaging
- **MAC Address:** macaddress 0.5.3 for device identification

### Utilities
- **Date Manipulation:** date-fns 4.1.0, dayjs 1.11.13
- **Retry Logic:** axios-retry 4.5.0
- **Drag & Drop:** @hello-pangea/dnd 18.0.1
- **PDF Generation:** jspdf 3.0.1, jspdf-autotable 5.0.2
- **CSV Export:** react-csv 2.2.2
- **Charts:** recharts 2.15.1

## Development Stack

### Build Tools
- **Frontend:** React Scripts 5.0.1 (Create React App)
- **Backend:** No build step, direct Node.js execution
- **Bundler:** Webpack (via React Scripts)
- **Process Manager:** Concurrently 9.1.2 for dev mode

### Environment Management
- **dotenv:** 16.4.7 for environment variables

## Database

### MongoDB Configuration
```javascript
// Embedded MongoDB
Version: Latest (bundled in resources/mongodb/bin/)
Data Path: <userData>/mongodb/data/
Initial Dump: backend/db/dump/isfplayground/

// Connection
Local: mongodb://localhost:27017/isfplayground
Remote: Configured via MONGO_URI environment variable
```

### Collections (27 total)
```
users, balagruhas, machines, tasks, roles, courses, schedules,
attendance, medical_records, medical_check_ins, coin,
notifications, user_notification_views,
wtf_pins, wtf_submissions, wtf_student_interactions, wtf_settings,
sports_tasks, training_sessions, student_mood_trackers,
purchase_orders, repair_requests, offline_request_queues
```

## Cloud Services

### AWS S3
```javascript
Purpose: File storage (images, videos, documents, facial data)
Client: @aws-sdk/client-s3
Configuration: Environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET_NAME)
```

### File Types Stored
- Student facial recognition data
- WTF submissions (images, videos, audio, documents)
- Medical record attachments
- User profile pictures
- Machine assignment documents

## Deployment Architecture

### Electron Packaging
```javascript
// package.json build configuration
{
  "appId": "com.vishnu.playground",
  "productName": "PlaygroundApp",
  "files": ["build/**/*", "backend/**/*", "main.js", "preload.js"],
  "extraResources": [
    { "from": "resources/nodejs", "to": "nodejs" },
    { "from": "resources/mongodb/bin", "to": "resources/mongodb/bin" },
    { "from": "backend/db/dump", "to": "backend/db/dump" }
  ]
}
```

### Supported Platforms
- **Windows:** NSIS installer
- **macOS:** DMG installer
- **Linux:** (configured, not actively tested)

### Runtime Environment
```
Electron Main Process
  ├── Embedded MongoDB (port 27017)
  ├── Embedded Node.js Backend (port 5001)
  └── React Frontend (loaded from build/index.html)
```

## API Architecture

### RESTful API Structure
```
Base URL: http://localhost:5001/api

Versioned Routes:
  /api/v1/users
  /api/v1/coin
  /api/v1/wtf
  /api/v1/machines
  /api/v1/sports
  /api/v1/music

Non-versioned Routes:
  /api/auth
  /api/notifications
  /api/tasks
  /api/roles
```

### Middleware Stack
```javascript
1. CORS
2. Body Parser (JSON, URL-encoded)
3. Morgan (HTTP logging)
4. Helmet (Security headers)
5. Rate Limiting (on auth routes)
6. Custom Middleware:
   - JWT Authentication (authenticate)
   - RBAC Authorization (authorize)
   - File Upload (multer + S3)
   - Request Logging (Pino)
```

## Authentication Flow

### JWT Token
```javascript
Algorithm: HS256 (default)
Secret: process.env.JWT_SECRET
Expiration: 1 day
Payload: { id: user._id }
```

### Password Hashing
```javascript
Algorithm: Bcrypt
Salt Rounds: 10
Implementation: Pre-save hook in User model
```

### Facial Recognition
```javascript
Models:
  - SSD MobileNet v1 (face detection)
  - Face Landmark 68 (facial landmarks)
  - Face Recognition (128-d descriptors)

Threshold: 0.6 (Euclidean distance)
Storage: Float32Array in MongoDB
```

## Real-time Features

### WebSocket Implementation
```javascript
Library: ws 8.18.3
Port: Same as Express server (5001)
Connection: ws://localhost:5001?token=<jwt>

Message Types:
  - connection_established
  - authentication_success/error
  - subscribe/unsubscribe (rooms)
  - ping/pong (heartbeat)
  - notification
  - pin_created/liked/seen
  - submission_created/reviewed
```

### Rooms
```javascript
- wtf_general (all WTF updates)
- wtf_pin_<pinId> (pin-specific updates)
- notifications (notification updates)
```

## Performance Considerations

### Frontend
- React 19 with automatic batching
- Component-level code splitting (not implemented)
- Image optimization with Sharp
- Lazy loading (not fully implemented)

### Backend
- Mongoose connection pooling
- Database indexing on frequently queried fields
- Pino high-performance logging
- File upload streaming (not buffering)

### Database
- Indexes on userId, createdAt, status fields
- TTL indexes for notification expiration
- Aggregate queries for leaderboards

## Security Stack

### Implemented
- JWT token-based authentication
- Bcrypt password hashing
- Helmet security headers
- CORS configuration
- Rate limiting on auth endpoints
- Express validator for input validation

### Missing (Technical Debt)
- No HTTPS in Electron
- No input sanitization
- No SQL injection prevention (using Mongoose helps)
- No XSS protection (CSP headers)
- Weak password policy
- No refresh tokens

## Development vs Production

### Environment Variables
```bash
# Development
NODE_ENV=development  # Bypasses RBAC checks
MONGO_URI=mongodb://localhost:27017/isfplayground
JWT_SECRET=development_secret

# Production (Electron)
NODE_ENV=production
MONGO_URI=mongodb://localhost:27017/isfplayground  # Embedded
JWT_SECRET=<secure_secret>
AWS_ACCESS_KEY_ID=<aws_key>
AWS_SECRET_ACCESS_KEY=<aws_secret>
```

### Mode Detection
```javascript
// Electron
const isDev = !app.isPackaged;

// Backend
const isLocal = process.env.NODE_ENV === "local";
const isDev = process.env.NODE_ENV === "development";
```

## Sprint 5 Technology Additions

### Shop-Specific Stack
```javascript
// Backend (Recommendations)
- Stripe/Razorpay: Payment gateway (if needed)
- Nodemailer: Order confirmation emails (future)
- QR Code: qrcode library for order tracking
- Image Thumbnails: Already have Sharp

// Frontend (Recommendations)
- React Context/Zustand: State management for cart
- React Query: Data fetching and caching
- Form Validation: Already have React Hook Form via Radix
- Image Gallery: react-image-gallery
```

### No Additional Dependencies Required
- Coin wallet: ✅ Already implemented
- Notifications: ✅ WebSocket infrastructure exists
- Authentication: ✅ JWT system ready
- File upload: ✅ Multer + S3 configured

## Version Compatibility

### Node.js
- **Required:** Node.js 16+ (for top-level await)
- **Tested:** Node.js 18.x
- **Embedded:** Bundled in resources/nodejs/

### MongoDB
- **Required:** MongoDB 4.4+
- **Tested:** MongoDB 5.x
- **Embedded:** Bundled in resources/mongodb/bin/

### Electron
- **Current:** 34.2.0 (Chromium 122)
- **Node Integration:** Disabled (using preload script)
- **Context Isolation:** Enabled

## Build Scripts

### Frontend
```bash
npm run start       # Development server (port 3000)
npm run build       # Production build
npm run test        # Jest tests
npm run eject       # Eject from Create React App
```

### Backend
```bash
npm run start       # Production mode
npm run dev         # Nodemon development mode
npm run test        # Jest tests
npm run test:watch  # Jest watch mode
npm run test:coverage  # Coverage report
```

### Electron (Root)
```bash
npm run start       # Start Electron
npm run build-react # Build React → copy to build/
npm run package     # Package Electron app
```

## Known Dependencies Issues

### Technical Debt
1. **Multiple Date Libraries:** date-fns AND dayjs (pick one)
2. **React 19 Compatibility:** Some Radix UI components may have warnings
3. **Outdated CRA:** React Scripts 5.0.1 (should migrate to Vite)
4. **Face-API.js:** Old library, consider modern alternatives
5. **Canvas Native Module:** Build complexity on different platforms

### Security Vulnerabilities
- Run `npm audit` regularly
- Face-API.js has unpatched dependencies
- Multer has known prototype pollution issues (use latest)

## Summary

**Strong Foundation:**
- ✅ Modern React 19
- ✅ Robust backend (Express + Mongoose)
- ✅ Embedded database (MongoDB)
- ✅ Real-time (WebSocket)
- ✅ File storage (AWS S3)
- ✅ Authentication (JWT + Facial)

**Technical Debt:**
- ⚠️ No frontend state management
- ⚠️ Multiple date libraries
- ⚠️ Create React App (outdated)
- ⚠️ No TypeScript
- ⚠️ Security gaps

**Sprint 5 Readiness:**
- ✅ No new major dependencies needed
- ✅ Coin wallet system ready
- ✅ Notification infrastructure ready
- ✅ Authentication ready
- ⚠️ Consider Zustand/Context for cart state

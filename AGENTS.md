# AGENTS.md - Developer Guide for ISF Playground

**Last Updated:** January 6, 2026  
**Project:** ISF Playground - MERN Stack Application (MongoDB, Express, React, Node.js)  
**Architecture:** Monorepo with separate `backend/` and `frontend/` directories

---

## 📦 Project Structure

```
ISF_Playground/
├── backend/          # Node.js/Express API server
├── frontend/         # React application
├── docs/             # Documentation
├── _bmad-output/     # Test artifacts and planning docs
└── scripts/          # Utility scripts
```

---

## 🚀 Build, Run & Test Commands

### Backend Commands

```bash
# Navigate to backend
cd backend

# Development
npm run dev                    # Start with nodemon (auto-reload)
npm start                      # Start production server

# Testing
npm test                       # Run all tests with Jest
npm run test:watch             # Watch mode
npm run test:coverage          # Generate coverage report
npm run test:unit              # Run only unit tests (tests/wtf/unit)
npm run test:integration       # Run only integration tests
npm run test:performance       # Run performance tests

# Run single test file
npx jest tests/vendor.test.js
npx jest tests/purchaseRequest_story2_1.test.js

# Run tests matching pattern
npx jest --testNamePattern="should create vendor"
npx jest shopItem                # All tests with "shopItem" in filename

# Database setup
npm run setup:roles            # Setup default roles
npm run force:roles            # Force reset roles
```

### Frontend Commands

```bash
# Navigate to frontend
cd frontend

# Development
npm start                      # Start dev server (http://localhost:3000)
npm run build                  # Production build

# Testing
npm test                       # Run tests in watch mode
npm test -- --coverage         # Run with coverage
npm test -- --verbose          # Verbose output

# Run single test file
npm test -- CoachRequestsDashboard.test.js
npm test -- --testPathPattern="MasterInventoryReport"
```

### Root Commands

```bash
# Build frontend for Electron
npm run build-react            # Build React app and copy to /build

# Electron app
npm start                      # Start Electron desktop app
npm run package                # Package for distribution
```

---

## 🎨 Code Style Guidelines

### General Principles

- **No ESLint/Prettier config** - Follow existing code patterns
- **Modularity** - Keep files focused and single-purpose
- **Consistency** - Match existing patterns in the codebase
- **Comments** - Use JSDoc for functions, inline for complex logic

### Backend (Node.js/Express)

#### File Organization

```javascript
// 1. External imports (npm packages)
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// 2. Internal imports (project files)
const userRoutes = require("./routes/userRoutes");
const { errorLogger } = require("../config/pino-config");
const { HTTP_STATUS_CODE } = require("../constants/general");

// 3. Configuration
const router = express.Router();

// 4. Middleware/business logic
// 5. Exports
module.exports = { functionName };
```

#### Naming Conventions

- **Files**: camelCase.js (e.g., `userRoutes.js`, `wtfSecurity.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `HTTP_STATUS_CODE`)
- **Functions**: camelCase (e.g., `createRateLimiter`, `validateRequest`)
- **Classes/Models**: PascalCase (e.g., `User`, `PurchaseRequest`)
- **Private functions**: Prefix with `_` (e.g., `_internalHelper`)

#### Arrow Functions

```javascript
// Preferred for callbacks and functional code
const createRateLimiter = (windowMs, max, message) => {
  return (req, res, next) => {
    next();
  };
};

// Traditional function for methods
function processRequest(data) {
  // ...
}
```

#### Error Handling

```javascript
// Use try-catch for async operations
try {
  const result = await someAsyncOperation();
  res.status(200).json({ success: true, data: result });
} catch (error) {
  errorLogger.error({ error }, "Operation failed");
  res.status(500).json({ success: false, message: error.message });
}

// Validation middleware pattern
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array()
    });
  }
  next();
};
```

### Frontend (React)

#### File Organization

```javascript
// 1. React imports
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// 2. External library imports
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// 3. Internal imports (components, API, utils)
import Dashboard from "./pages/Dashboard";
import { getCoachDeliveries } from "../../api";

// 4. Styles (if separate)
import './styles.css';
```

#### Naming Conventions

- **Components**: PascalCase (e.g., `CoachRequestsDashboard.jsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useRBAC`, `useAuth`)
- **Utilities**: camelCase (e.g., `formatDate`, `calculateTotal`)
- **Constants**: UPPER_SNAKE_CASE or PascalCase for config objects

#### Component Structure

```javascript
// Functional components (preferred)
const ComponentName = () => {
  // 1. Hooks (useState, useEffect, custom hooks)
  const [state, setState] = useState(initialValue);
  
  // 2. Event handlers
  const handleClick = () => {
    // logic
  };
  
  // 3. Render logic
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

#### Testing Patterns

```javascript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock API calls
jest.mock('../../api', () => ({
  getCoachDeliveries: jest.fn(),
}));

describe('ComponentName (Story X.Y)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    render(<ComponentName />);
    
    await waitFor(() => {
      expect(screen.getByText('Expected Text')).toBeInTheDocument();
    });
  });
});
```

---

## 🧪 Testing Standards

### Coverage Requirements

- **Backend**: 70% minimum (branches, functions, lines, statements)
- **Frontend**: Run tests for all new features
- **Integration tests**: For critical workflows

### Test File Naming

- Backend: `<feature>.test.js` or `<feature>_story<X>_<Y>.test.js`
- Frontend: `<ComponentName>.test.js` in `__tests__/` folders

### Running Specific Tests

```bash
# Backend - single file
npx jest tests/vendor.test.js --verbose

# Frontend - component test
npm test -- CoachRequestsDashboard.test.js --verbose

# Run tests for a story
npx jest story2_1
npm test -- story
```

---

## 📝 Story Implementation Workflow

### From .cursor/rules/bmad/dev.mdc

1. **Read story file** - All info is in the story, don't load PRDs/architecture unless directed
2. **Check folder structure** - Don't create new directories if they exist
3. **Implement tasks sequentially**:
   - Read task → Implement → Write tests → Execute validations
   - Only mark checkbox `[x]` if ALL tests pass
4. **Update story sections** (ONLY these):
   - Task/Subtask checkboxes
   - Dev Agent Record
   - Debug Log
   - Completion Notes
   - File List (track all new/modified/deleted files)
   - Change Log
5. **Ready for review** when:
   - All tasks marked `[x]`
   - All validations pass
   - File List complete
   - Story status: 'Ready for Review'

### HALT for:

- Unapproved dependencies needed
- Ambiguous requirements
- 3 failures attempting same fix
- Missing configuration
- Failing regression tests

---

## 🛠️ Key Technologies

### Backend

- **Runtime**: Node.js v20+
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Testing**: Jest, Supertest
- **Validation**: express-validator
- **Logging**: Pino
- **Security**: Helmet, CORS, bcryptjs, JWT

### Frontend

- **Framework**: React 19
- **Router**: React Router v7
- **State**: Zustand
- **UI**: Radix UI, Tailwind CSS, Lucide icons
- **Forms**: React Hook Form
- **Testing**: React Testing Library, Jest
- **HTTP**: Axios

---

## 🔐 Environment Variables

**Backend** requires `.env`:
```
MONGODB_URI=mongodb://localhost:27017/isf_playground
JWT_SECRET=your_secret_key
AWS_BUCKET_NAME=your_bucket (for S3 uploads)
```

**Frontend** uses proxy to backend in development (port 3000 → 5001)

---

## 🐛 Debugging Tips

1. **Backend logs**: Check Pino logger output, use `errorLogger.error()`
2. **Frontend**: React DevTools, check console errors
3. **Database**: Use MongoDB Compass or `mongosh`
4. **Tests failing**: Run with `--verbose` flag, check mock implementations
5. **CORS issues**: Verify CORS config in `backend/server.js`

---

## 📚 Documentation References

- **Test artifacts**: `_bmad-output/test-*.md`
- **Stories**: `_bmad-output/sprint-5-purchase-manager/`
- **API docs**: Swagger available when backend running
- **Test cases**: `docs/qa/E2E-SPRINT5-PM-CORRECTIONS-TESTCASES.md`

---

## ⚠️ Critical Rules from BMAD System

- **DO NOT** load PRD/architecture docs unless explicitly directed
- **ONLY** update authorized story sections (listed above)
- **ALWAYS** run full test suite before marking story complete
- **NEVER** skip test writing - tests are mandatory
- **File List must be complete** before setting "Ready for Review"

---

**For questions or issues, refer to:**
- `.cursor/rules/bmad/dev.mdc` - Full developer agent rules
- `_bmad-output/` - Test documentation and artifacts
- Existing test files for patterns

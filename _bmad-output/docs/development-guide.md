# Development Guide

## Prerequisites
*   **Node.js:** v18+ (Required for Electron/React)
*   **MongoDB:** Local instance or Atlas URI
*   **Python:** (Optional, for some backend scripts)

## Installation

1.  **Install Root Dependencies:**
    ```bash
    npm install
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    ```

3.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

## Environment Setup
Create `.env` files in `backend/` and root if needed.

**Backend `.env` Example:**
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/isf_playground
JWT_SECRET=your_secret
```

## Running the Application

### 1. Start Backend
```bash
cd backend
npm start
# Runs on http://localhost:5001
```

### 2. Start Frontend (Web Mode)
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

### 3. Start Desktop App (Electron)
In the root directory:
```bash
npm start
# Launches Electron window wrapping the React app
```

## Build & Deploy

*   **Build React:** `npm run build-react`
*   **Package Electron:** `npm run package` (Uses electron-builder)

## Testing

*   **Frontend Tests:**
    ```bash
    cd frontend
    npm test
    npx playwright test
    ```

*   **Backend Tests:**
    ```bash
    cd backend
    npm test
    ```

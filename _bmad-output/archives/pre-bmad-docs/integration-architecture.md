# Integration Architecture

## System Overview
The ISF Playground system consists of three primary parts interacting to deliver the application:

1.  **Desktop Shell (Electron):** The host environment.
2.  **Frontend (React):** The user interface.
3.  **Backend (Node/Express):** The data and logic server.

## Communication Channels

### 1. Frontend ↔ Backend (REST API)
*   **Protocol:** HTTP/1.1 (REST)
*   **Format:** JSON
*   **Auth:** Bearer Token (JWT) in Headers.
*   **Primary Data Flow:** Frontend requests data (GET) or submits actions (POST/PUT) to the Backend API.
*   **Base URL:** `http://localhost:5001/api` (Dev) / Production URL

### 2. Desktop ↔ Frontend (IPC)
*   **Mechanism:** Electron IPC (Inter-Process Communication).
*   **Flow:**
    *   **Frontend:** Sends messages via `window.electron.ipcRenderer`.
    *   **Desktop (Main):** Listens via `ipcMain.handle` or `ipcMain.on`.
*   **Use Cases:**
    *   Hardware access (WTF Pins, Cameras).
    *   System dialogs (File save/open).
    *   App lifecycle (Quit, Minimize).

### 3. Backend ↔ Database
*   **Protocol:** MongoDB Wire Protocol.
*   **Driver:** Mongoose ODM.
*   **Connection:** Persistent connection pool.

### 4. Backend ↔ External Services
*   **AWS S3:** Image/File storage (User photos, Medical attachments).
*   **WTF WebSocket:** Real-time communication for specific hardware interactions.

## Data Flow Diagrams

### User Login Flow
1.  **Frontend:** User enters credentials -> POST `/api/auth/login`.
2.  **Backend:** Validates against MongoDB -> Returns JWT + User Profile.
3.  **Frontend:** Stores JWT in LocalStorage/Context -> Updates UI State.

### Shop Purchase Flow
1.  **Frontend:** User clicks "Buy" -> Updates Cart Store (Zustand).
2.  **Frontend:** User clicks "Checkout" -> POST `/api/v2/shop/orders`.
3.  **Backend:**
    *   Verifies Coin Balance.
    *   Deducts Coins.
    *   Updates Inventory.
    *   Creates Order Record.
    *   Returns Success/Failure.
4.  **Frontend:** Updates Coin Balance display -> Shows Success Message.

# Project Documentation Index

## Project Overview
*   **Type:** Multi-Part Hybrid Application (Electron + React + Node)
*   **Primary Language:** JavaScript
*   **Architecture:** MVC (Backend) / Component-Based (Frontend)

## Quick Reference

### 🖥️ Desktop (Root)
*   **Tech:** Electron 34
*   **Entry Point:** `main.js`

### 🌐 Frontend (React)
*   **Tech:** React 19, Zustand, Tailwind
*   **Root:** `frontend/src`

### ⚙️ Backend (Node)
*   **Tech:** Express, MongoDB
*   **Root:** `backend/`

## Generated Documentation

### High-Level
*   [Project Overview](./project-overview.md)
*   [Integration Architecture](./integration-architecture.md)
*   [Source Tree Analysis](./source-tree-analysis.md)
*   [Development Guide](./development-guide.md)

### Backend
*   [Architecture - Backend](./architecture-backend.md)
*   [API Contracts](./api-contracts-backend.md)
*   [Data Models](./data-models-backend.md)

### Frontend
*   [Architecture - Frontend](./architecture-frontend.md)
*   [Component Inventory](./component-inventory-frontend.md)

## Existing Documentation
*   [Backend Documentation](../backend/BACKEND_DOCUMENTATION.md)
*   [Project Readme](../README.md)

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    cd frontend && npm install
    cd ../backend && npm install
    ```

2.  **Start Development:**
    *   Backend: `cd backend && npm start`
    *   Frontend: `cd frontend && npm start`
    *   Desktop: `npm start`

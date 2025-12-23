# Source Tree Analysis

## Project Structure
The project is a Monorepo containing a Desktop Shell (Electron), a React Frontend, and a Node.js Backend.

```
ISF_Playground/
├── main.js                  # Electron Main Process entry point
├── package.json             # Root dependencies (Electron)
├── frontend/                # React Frontend Application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Domain-specific components
│   │   │   ├── shop/        # E-commerce features
│   │   │   ├── wtf/         # WTF system features
│   │   │   └── ...
│   │   ├── ui/              # Reusable UI primitives (Button, etc.)
│   │   ├── pages/           # Page views
│   │   ├── store/           # Global state (Zustand)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── contexts/        # React Contexts
│   │   └── App.js           # Root component
├── backend/                 # Node.js Backend Application
│   ├── server.js            # Express server entry point
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── models/              # Mongoose data models
│   ├── routes/              # API route definitions
│   ├── services/            # Business logic layer
│   └── middleware/          # Express middleware (Auth, Uploads)
├── docs/                    # Project documentation
└── _bmad-output/            # BMad generated artifacts
```

## Critical Directories

### Frontend (`frontend/src`)
*   **`components/`**: The core of the UI, organized by feature (Domain-Driven Design).
*   **`store/`**: Centralized state management using Zustand.
*   **`ui/`**: Low-level design system components.

### Backend (`backend/`)
*   **`routes/`**: API definitions, mapped typically 1:1 with controllers.
*   **`controllers/`**: Handles HTTP request/response logic.
*   **`services/`**: Encapsulates complex business logic, keeping controllers thin.
*   **`models/`**: Defines database schema and validation.

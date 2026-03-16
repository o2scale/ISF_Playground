# Architecture - Node Backend

## Executive Summary
The backend is a RESTful API built with Node.js and Express, using MongoDB for persistence. It follows a Layered Architecture (Controller-Service-Model) to separate concerns.

## Technology Stack
*   **Runtime:** Node.js
*   **Framework:** Express 4.x
*   **Database:** MongoDB (Mongoose ORM)
*   **Authentication:** JWT (JSON Web Tokens)
*   **Validation:** express-validator
*   **Documentation:** Swagger/OpenAPI

## Architectural Pattern
**MVC with Service Layer:**
1.  **Routes:** Define endpoints and middleware chains.
2.  **Controllers:** Handle HTTP parsing, validation, and response formatting.
3.  **Services:** Contain business logic, database interactions, and external API calls.
4.  **Models:** Define data structure and schema validation.

## Key Subsystems

### 1. User & Role Management
*   **RBAC:** Role-Based Access Control via `auth` middleware.
*   **Models:** `User`, `Role`.
*   **Features:** Registration, Login, Profile management, Role assignment.

### 2. Shop & Coin Economy (Sprint 5)
*   **Purpose:** Internal e-commerce system for students to spend earned coins.
*   **Models:** `ShopItem`, `Cart`, `Order`, `PurchaseRequest`, `Coin`.
*   **Services:** `shop.js`, `cart.js`, `order.js`, `coin.js`.
*   **Flow:** Student earns coins -> Adds items to Cart -> Places Order -> Admin fulfills.

### 3. Medical System (Sprint 6)
*   **Purpose:** Track student health and doctor visits.
*   **Models:** `MedicalRecord`, `MedicalCheckIn`, `Doctor`, `Hospital`.
*   **Services:** `medicalRecords.js`, `doctor.js`.

### 4. WTF System
*   **Purpose:** Hardware integration and student tracking.
*   **Models:** `WTFPin`, `WTFSettings`.
*   **Integration:** WebSockets (`wtfWebSocket.js`) for real-time updates.

## Data Architecture
*   **Database:** MongoDB (NoSQL).
*   **Schema:** Defined in Mongoose models.
*   **Relationships:** Referenced via `ObjectId` (e.g., `studentId` in `MedicalRecord`).

## Scalability & Performance
*   **Rate Limiting:** `express-rate-limit` used on auth routes.
*   **Media:** Images optimized using `sharp` before S3 upload.
*   **Async:** Heavy tasks (reports) should be offloaded to queues (future improvement).

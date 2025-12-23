# Data Models - Node Backend

## User Model (`User`)

Central entity for all users (Students, Coaches, Admins).

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | User's full name (required). |
| `email` | String | Unique email address (sparse index). |
| `userId` | Number | Unique numeric ID (sparse index). |
| `role` | String | Enum: `admin`, `coach`, `student`, `purchase-manager`, `medical-incharge`, etc. |
| `status` | String | `active` or `inactive`. |
| `facialData` | Object | Face descriptor and creation date for facial recognition. |
| `medicalRecords` | ObjectId[] | References to `MedicalRecord`. |
| `balagruhaIds` | ObjectId[] | References to `Balagruha`. |

## Shop Item Model (`ShopItem`)

Represents products in the internal shop/coin economy.

| Field | Type | Description |
| :--- | :--- | :--- |
| `sku` | String | Unique Stock Keeping Unit. |
| `name` | String | Product name. |
| `price` | Number | Price in coins (must be integer). |
| `stock` | Number | Current inventory level. |
| `images` | Array | Array of image objects `{ url, isPrimary }`. |
| `isPendingProduct` | Boolean | Sprint 5: Flag for products requested but not yet approved. |
| `availableFor` | String[] | Roles allowed to purchase (`student`, `coach`, `all`). |

## Medical Record Model (`MedicalRecord`)

Stores health data for students.

| Field | Type | Description |
| :--- | :--- | :--- |
| `studentId` | ObjectId | Reference to `User` (student). |
| `medicalHistory` | Array | Embedded objects for history items (diagnosis, attachments, status). |
| `vaccinations` | String[] | List of vaccinations. |
| `nextActionDate` | Date | Follow-up date. |

## Other Key Models

*   **Coin:** Manages virtual currency transactions.
*   **Order:** Tracks shop purchases.
*   **PurchaseRequest:** Handles procurement workflow (Sprint 5).
*   **Task:** Tracks student tasks and activities.

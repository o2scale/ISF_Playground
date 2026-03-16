# Component Inventory - React Frontend

## UI Primitives (`src/ui`)
Basic building blocks, likely based on Shadcn/Radix.

*   `Button`: Standard button component.
*   `Badge`: Status/label badge.

## Feature Components (`src/components`)
Organized by feature domain.

### 🛍️ Shop System (`src/components/shop`)
*   **Product Catalog:** Displays products with filters.
*   **Cart:** Shopping cart management.
*   **Checkout:** Order placement flow.
*   **Order History:** Student order viewing.
*   **Admin/Inventory:** Admin tools for stock management.

### 🏥 Medical System
*   **Medical Check-in:** Daily health tracking forms.
*   **Medical Records:** History view for doctors.

### 🤖 WTF System (`src/components/wtf`)
*   **Pin Login:** Student authentication via PIN.
*   **Status:** System health display.

### 👥 User Management (`src/components/usermanagement`)
*   **Profile:** User details and settings.
*   **Login:** Auth forms.

## Layout & Navigation
*   `Layout.js`: Main application wrapper.
*   `Sidebar`: Main navigation menu.
*   `Header`: Top bar with user info.
*   `ProtectedRoute.js`: Auth guard.
*   `RoleBasedNavigation.js`: Dynamic menu based on user role.

## State Management
*   **Zustand (`src/store/shopStore.js`):** Manages Shop state (Cart, Products, Filters).
*   **Context API (`src/contexts`):** Likely used for Auth and Theme state.

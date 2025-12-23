# API Contracts - Node Backend

## Base URL
`http://localhost:5001/api`

## Authentication
Most endpoints require a JWT token in the Authorization header:
`Authorization: Bearer <token>`

## 🛍️ Shop & Coin Economy (Sprint 5)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **GET** | `/v2/shop/products` | List available products | Public/Student |
| **GET** | `/v2/shop/products/:id` | Get product details | Public/Student |
| **POST** | `/v2/shop/cart` | Add item to cart | Student |
| **GET** | `/v2/shop/cart` | Get current cart | Student |
| **POST** | `/v2/shop/orders` | Checkout/Place order | Student |
| **GET** | `/v2/shop/orders` | Get order history | Student |
| **POST** | `/v1/coin/balance` | Get wallet balance | Student |

### Admin Shop Management
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **POST** | `/v2/shop/admin/products` | Create new product | Admin |
| **PUT** | `/v2/shop/admin/products/:id` | Update product | Admin |
| **PATCH** | `/v2/shop/admin/inventory/:id` | Update stock | Admin |
| **GET** | `/v2/shop/admin/analytics` | Get sales analytics | Admin |
| **GET** | `/v2/shop/admin/reports` | Transaction reports | Admin |

### Purchase Requests
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **POST** | `/v2/shop/admin/purchase-requests` | Create purchase request | Coach/Medical |
| **GET** | `/v2/shop/admin/purchase-requests` | List requests | Admin |
| **PATCH** | `/v2/shop/admin/purchase-requests/:id/status` | Approve/Reject | Admin |

## 🏥 Medical System (Sprint 6)

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **GET** | `/medical-records/:studentId` | Get student medical history | Medical |
| **POST** | `/medical-check-ins` | Create daily check-in | Medical |
| **GET** | `/doctors` | List doctors | Medical |
| **GET** | `/hospitals` | List hospitals | Medical |

## 👤 User & Auth

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **POST** | `/auth/login` | User login | Public |
| **POST** | `/auth/register` | User registration | Admin |
| **GET** | `/users/profile` | Get current user profile | User |
| **GET** | `/users` | List users | Admin |

## 🏫 Education & Tasks

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **GET** | `/tasks` | List assigned tasks | Student |
| **POST** | `/tasks/:id/submit` | Submit task | Student |
| **GET** | `/v1/courses` | List courses | Student |

## 🤖 WTF System & Hardware

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **GET** | `/v1/wtf/status` | Get WTF system status | Admin |
| **POST** | `/v1/wtf/pin` | Generate WTF pin | Student |

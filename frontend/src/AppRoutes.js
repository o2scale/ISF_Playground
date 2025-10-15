// src/AppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";
import TaskManagement from "./pages/TaskManagement";
import MachineManagement from "./pages/MachineManagement";
import Login from "./pages/Login";
import AccessDenied from "./pages/AccessDenied";

// Shop Components
import ShopHome from "./components/shop/ShopHome";
import Cart from "./components/shop/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";
import OrderReceipt from "./pages/OrderReceipt";
import TransactionHistory from "./pages/TransactionHistory";
import CoachDeliveries from "./pages/CoachDeliveries";
import ProductManagement from "./pages/ProductManagement";
import InventoryManagement from "./pages/InventoryManagement";
import LowStockReport from "./pages/LowStockReport";
import OutOfStockReport from "./pages/OutOfStockReport";
import ShopAnalytics from "./pages/ShopAnalytics";
import TransactionReports from "./pages/TransactionReports";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/access-denied" element={<AccessDenied />} />

      {/* Dashboard - accessible to any authenticated user */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* User Management */}
      <Route
        element={<ProtectedRoute module="User Management" action="Read" />}
      >
        <Route path="/users" element={<UserManagement />} />
      </Route>

      {/* Role Management */}
      <Route
        element={<ProtectedRoute module="Role Management" action="Read" />}
      >
        <Route path="/rbac" element={<RoleManagement />} />
      </Route>

      {/* Task Management */}
      <Route
        element={<ProtectedRoute module="Task Management" action="Read" />}
      >
        <Route path="/tasks" element={<TaskManagement />} />
      </Route>

      {/* Machine Management */}
      <Route
        element={<ProtectedRoute module="Machine Management" action="Read" />}
      >
        <Route path="/machines" element={<MachineManagement />} />
      </Route>

      {/* ==================== SHOP ROUTES ==================== */}

      {/* Shop Home - All authenticated users */}
      <Route element={<ProtectedRoute />}>
        <Route path="/shop" element={<ShopHome />} />
      </Route>

      {/* Student Shopping Cart & Checkout */}
      <Route element={<ProtectedRoute />}>
        <Route path="/shop/cart" element={<Cart />} />
        <Route path="/shop/checkout" element={<Checkout />} />
        <Route path="/shop/orders" element={<OrderHistory />} />
        <Route path="/shop/orders/:orderId" element={<OrderDetail />} />
        <Route path="/shop/orders/:orderId/receipt" element={<OrderReceipt />} />
      </Route>

      {/* Transaction History - All Users */}
      <Route element={<ProtectedRoute />}>
        <Route path="/shop/transactions" element={<TransactionHistory />} />
      </Route>

      {/* Coach Delivery Management */}
      <Route element={<ProtectedRoute />}>
        <Route path="/coach/deliveries" element={<CoachDeliveries />} />
      </Route>

      {/* Admin: Shop Management Routes */}
      <Route element={<ProtectedRoute module="Shop Management" action="Manage" />}>
        <Route path="/shop/admin/products" element={<ProductManagement />} />
        <Route path="/shop/admin/inventory" element={<InventoryManagement />} />
        <Route path="/shop/admin/stock/low" element={<LowStockReport />} />
        <Route path="/shop/admin/stock/out" element={<OutOfStockReport />} />
        <Route path="/shop/admin/analytics" element={<ShopAnalytics />} />
        <Route path="/shop/admin/reports/transactions" element={<TransactionReports />} />
      </Route>

      {/* Default route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;

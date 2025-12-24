// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import TaskManagement from "./components/TaskManagement/taskmanagement";
import AccessDenied from "./components/AccessDenied";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { RBACProvider } from "./contexts/RBACContext";
import { CoinBalanceProvider } from "./contexts/CoinBalanceContext";
import LoginCard from "./components/login/logincard";
import StudentLogin from "./components/login/StudentLogin";
import UserManagement from "./components/usermanagement/usermanagement";
import RBACManagement from "./components/RBAC/RBACManagement";
import MachineManagement from "./components/machineManagement/machineManagement";
import Dashboard from "./components/dashboard/dashboard";
import CourseManagement from "./components/courseManagement/CourseManagement";
import RepairManagement from "./components/repairManagement/RepairManagement";
import PurchaseManagement from "./components/purchaseManagement/PurchaseManagement";
import BalagruhaDashboard from "./components/dashboard/balagruha";
import AttendanceComponent from "./components/Attendance/attendance";
import BalagruhaManagement from "./components/balagruhaManagement/balagruhamanagement";
import WtfDashboard from "./components/wtf/WtfDashboard";
import ShopHome from "./components/shop/ShopHome";
import Cart from "./components/shop/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";
import OrderReceipt from "./pages/OrderReceipt";
import ProductManagement from "./pages/ProductManagement";
import InventoryManagement from "./pages/InventoryManagement";
import LowStockReport from "./pages/LowStockReport";
import OutOfStockReport from "./pages/OutOfStockReport";
import MasterInventoryReport from "./pages/MasterInventoryReport";
import TransactionHistory from "./pages/TransactionHistory";
import ShopAnalytics from "./pages/ShopAnalytics";
import TransactionReports from "./pages/TransactionReports";
import CoachDeliveries from "./pages/CoachDeliveries";
import CoachRequestsDashboard from "./pages/CoachRequestsDashboard";
import StudentProfile from "./pages/StudentProfile";

const CoachOrAdminRoute = ({ children }) => {
  const { user } = useAuth();
  const userRole = typeof user?.role === "string" ? user.role : user?.role?.roleName;
  const roleLower = userRole?.toLowerCase();

  if (roleLower !== "coach" && roleLower !== "admin") {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <RBACProvider>
            <CoinBalanceProvider>
              <Toaster position="top-right" />
              <Cart />
              <Routes>
              {/* Public route for login */}
              <Route path="/login" element={<StudentLogin />} />
              <Route path="/admin/login" element={<LoginCard />} />

              {/* Routes inside the layout */}
              <Route element={<Layout />}>
                {/* Redirect root to dashboard */}
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />

                {/* Dashboard - accessible to all authenticated users */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Protected routes with specific permissions */}
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute module="User Management" action="Read">
                      <UserManagement />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/rbac"
                  element={
                    <ProtectedRoute module="Role Management" action="Read">
                      <RBACManagement />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/task"
                  element={
                    <ProtectedRoute module="Task Management" action="Read">
                      <TaskManagement />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/machines"
                  element={
                    <ProtectedRoute module="Machine Management" action="Read">
                      <MachineManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/balagruha"
                  element={
                    // <ProtectedRoute module="Machine Management" action="Read">
                    // <BalagruhaDashboard />
                    <BalagruhaManagement />
                    // </ProtectedRoute>
                  }
                />
                <Route
                  path="/attendance"
                  element={
                    // <ProtectedRoute module="Machine Management" action="Read">
                    <AttendanceComponent />
                    // </ProtectedRoute>
                  }
                />

                {/* Course, Repair, and Purchase Management Routes */}
                <Route path="/course" element={<CourseManagement />} />
                <Route path="/repair" element={<RepairManagement />} />
                {/* Sprint5-Story-24 + S24-BUG-005: Purchase Management accessible to all roles except students */}
                <Route
                  path="/purchase"
                  element={
                    <ProtectedRoute>
                      <PurchaseManagement />
                    </ProtectedRoute>
                  }
                />

                {/* WTF (Wall of Fame) Route */}
                <Route
                  path="/wtf"
                  element={
                    <ProtectedRoute>
                      <WtfDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Shop Routes */}
                <Route
                  path="/shop"
                  element={
                    <ProtectedRoute>
                      <ShopHome />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shop/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shop/orders"
                  element={
                    <ProtectedRoute>
                      <OrderHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shop/orders/:orderNumber"
                  element={
                    <ProtectedRoute>
                      <OrderDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shop/orders/:orderNumber/receipt"
                  element={
                    <ProtectedRoute>
                      <OrderReceipt />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/coins/history"
                  element={
                    <ProtectedRoute>
                      <TransactionHistory />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Shop Routes */}
                <Route
                  path="/shop/admin/products"
                  element={
                    <ProtectedRoute module="Shop Management" action="Manage">
                      <ProductManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shop/admin/inventory"
                  element={
                    <ProtectedRoute module="Shop Management" action="Manage">
                      <InventoryManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shop/admin/inventory/low-stock"
                  element={
                    <ProtectedRoute module="Shop Management" action="Manage">
                      <LowStockReport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shop/admin/inventory/out-of-stock"
                  element={
                    <ProtectedRoute module="Shop Management" action="Manage">
                      <OutOfStockReport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shop/admin/inventory/master-report"
                  element={
                    <ProtectedRoute module="Shop Management" action="Manage">
                      <MasterInventoryReport />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shop/admin/analytics"
                  element={
                    <ProtectedRoute module="Shop Management" action="Manage">
                      <ShopAnalytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shop/admin/reports"
                  element={
                    <ProtectedRoute module="Shop Management" action="Manage">
                      <TransactionReports />
                    </ProtectedRoute>
                  }
                />

                {/* Coach Delivery Routes - Sprint5-Story-13 */}
                <Route
                  path="/coach/deliveries"
                  element={
                    <ProtectedRoute>
                      <CoachDeliveries />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/coach/requests"
                  element={
                    <ProtectedRoute>
                      <CoachOrAdminRoute>
                        <CoachRequestsDashboard />
                      </CoachOrAdminRoute>
                    </ProtectedRoute>
                  }
                />

                {/* Student Profile Routes - Sprint5-Story-16 */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <StudentProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/students/:userId"
                  element={
                    <ProtectedRoute>
                      <StudentProfile />
                    </ProtectedRoute>
                  }
                />

                {/* Error pages */}
                <Route path="/access-denied" element={<AccessDenied />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              </Routes>
            </CoinBalanceProvider>
          </RBACProvider>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;

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
import { AuthProvider } from "./contexts/AuthContext";
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
import TransactionHistory from "./pages/TransactionHistory";
import ShopAnalytics from "./pages/ShopAnalytics";
import TransactionReports from "./pages/TransactionReports";
import CoachDeliveries from "./pages/CoachDeliveries";
import StudentProfile from "./pages/StudentProfile";
import AdminCourseDashboard from "./pages/admin/AdminCourseDashboard";
import CourseStructureBuilder from "./pages/admin/CourseStructureBuilder";
import ContentLibrary from "./pages/admin/ContentLibrary";
import QuizDashboard from "./pages/admin/QuizDashboard";
import QuizBuilder from "./pages/admin/QuizBuilder";
import TranslationDashboard from "./pages/admin/TranslationDashboard";
import TranslationEditor from "./pages/admin/TranslationEditor";
import TranslationQueue from "./pages/admin/TranslationQueue";
import StudentDashboardPage from "./pages/student/StudentDashboardPage";
import ComputerAppsPage from "./pages/student/ComputerAppsPage";
import ArtCoursePage from "./pages/student/ArtCoursePage";
import SpokenEnglishPage from "./pages/student/SpokenEnglishPage";

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

              {/* Student LMS Routes - Epic 01 (Outside admin layout, uses StudentLayout) */}
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute>
                    <StudentDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/computer-apps"
                element={
                  <ProtectedRoute>
                    <ComputerAppsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/art"
                element={
                  <ProtectedRoute>
                    <ArtCoursePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/spoken-english"
                element={
                  <ProtectedRoute>
                    <SpokenEnglishPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/spoken-english/:taskId"
                element={
                  <ProtectedRoute>
                    <SpokenEnglishPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/life-skills"
                element={
                  <ProtectedRoute>
                    {/* Placeholder - Epic 01 Story 05 */}
                    <div className="flex items-center justify-center min-h-screen">
                      <h1 className="text-2xl">Life Skills - Coming Soon</h1>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/homework"
                element={
                  <ProtectedRoute>
                    {/* Placeholder - Epic 05 */}
                    <div className="flex items-center justify-center min-h-screen">
                      <h1 className="text-2xl">Homework - Coming Soon</h1>
                    </div>
                  </ProtectedRoute>
                }
              />

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
                <Route path="/course" element={<CourseManagement />} />
                <Route path="/repair" element={<RepairManagement />} />
                <Route path="/purchase" element={<PurchaseManagement />} />

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

                {/* LMS Admin Routes - Sprint 2 Epic 02 */}
                <Route
                  path="/admin/courses"
                  element={
                    <ProtectedRoute module="LMS Management" action="Manage">
                      <AdminCourseDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/courses/:courseId/structure"
                  element={
                    <ProtectedRoute module="LMS Management" action="Manage">
                      <CourseStructureBuilder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/content"
                  element={
                    <ProtectedRoute module="LMS Management" action="Manage">
                      <ContentLibrary />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/quizzes"
                  element={
                    <ProtectedRoute module="LMS Management" action="Manage">
                      <QuizDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/quizzes/create"
                  element={
                    <ProtectedRoute module="LMS Management" action="Manage">
                      <QuizBuilder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/quizzes/:quizId/edit"
                  element={
                    <ProtectedRoute module="LMS Management" action="Manage">
                      <QuizBuilder />
                    </ProtectedRoute>
                  }
                />

                {/* Translation Management - Sprint 2 Epic 02 Story 04 */}
                <Route
                  path="/admin/translations"
                  element={
                    <ProtectedRoute module="LMS Management" action="Manage">
                      <TranslationDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/translations/:courseId/queue"
                  element={
                    <ProtectedRoute module="LMS Management" action="Manage">
                      <TranslationQueue />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/translations/:courseId/editor"
                  element={
                    <ProtectedRoute module="LMS Management" action="Manage">
                      <TranslationEditor />
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

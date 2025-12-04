// src/components/Layout.js
import React, { useEffect, useState, createContext, useContext } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import "./Layout.css";
import { useAuth } from "../contexts/AuthContext";
import { useRBAC } from "../contexts/RBACContext";
import { usePermission } from "./hooks/usePermission";
import { useCoinBalance } from "../contexts/CoinBalanceContext";
import CartIcon from "./shop/CartIcon";
import FloatingDeliveriesButton from "./shop/FloatingDeliveriesButton";
import {
  getUserNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  updateNotificationLastViewed,
} from "../api";

// Create Sidebar Context
const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    return { isSidebarCollapsed: false, toggleSidebar: () => {} };
  }
  return context;
};

const Layout = () => {
  const { user, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const { isLoading: rbacLoading } = useRBAC();
  const { canRead } = usePermission();
  const { balance: coinBalance } = useCoinBalance(); // Sprint5-Story-08: Use context for coin balance
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const [visibleMenus, setVisibleMenus] = useState([]);
  const [role, setRole] = useState("");
  const [notifications, setNotifications] = useState(0);
  const [showChatWindow, setShowChatWindow] = useState(null); // null, "coach", or "admin"
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);
  // Trigger a brief shake animation on the WTF menu item in child view
  const [shouldShakeWtf, setShouldShakeWtf] = useState(false);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

  // Check if current route is WTF
  const isWTFRoute = location.pathname === "/wtf";

  const topMenus = [
    {
      id: 1,
      name: "Dashboard",
      link: "/dashboard",
      roles: [
        "admin",
        "coach",
        "balagruha-incharge",
        "student",
        "purchase-manager",
        "medical-incharge",
        "sports-coach",
        "music-coach",
        "amma",
      ],
    },
    { id: 2, name: "Users", link: "/users", roles: ["admin", "coach"] },
    {
      id: 3,
      name: "Machines",
      link: "/machines",
      roles: [
        "admin",
        "coach",
        "balagruha-incharge",
        "purchase-manager",
        "medical-incharge",
        "sports-coach",
        "music-coach",
        "amma",
      ],
    },
    { id: 4, name: "Tasks", link: "/task", roles: ["admin", "coach", "purchase-manager", "student"] },
    {
      id: 5,
      name: "Attendance",
      link: "/attendance",
      roles: ["admin", "coach"],
    },
    { id: 6, name: "Balagruhas", link: "/balagruha", roles: ["admin"] },
    { id: 7, name: "Access", link: "/rbac", roles: ["admin"] },
    {
      id: 8,
      name: "Repairs",
      link: "/repair",
      roles: ["admin", "purchase-manager"],
    },
    {
      id: 9,
      name: "Purchases",
      link: "/purchase",
      // Sprint5-Story-24 + S24-BUG-005: All roles except students can access Purchase Management
      roles: ["admin", "purchase-manager", "coach", "medical-incharge", "balagruha-incharge", "sports-coach", "music-coach", "amma"],
    },
    {
      id: 10,
      name: "Shop",
      link: "/shop",
      roles: ["student", "admin", "coach", "purchase-manager", "medical-incharge", "balagruha-incharge", "sports-coach", "music-coach", "amma"],
    },
    {
      id: 11,
      name: "WTF",
      link: "/wtf",
      roles: [
        "admin",
        "coach",
        "balagruha-incharge",
        "student",
        "medical-incharge",
        "sports-coach",
        "music-coach",
        "amma",
      ],
    },
  ];

  const sportCoachMenu = [
    { id: 1, name: "Dashboard", activeTab: "dashboard" },
    { id: 2, name: "Students", activeTab: "students" },
    { id: 3, name: "Training", activeTab: "training" },
    { id: 4, name: "Sports Tasks", activeTab: "tasks" },
    { id: 5, name: "Performance", activeTab: "performance" },
    { id: 6, name: "Reports", activeTab: "reports" },
  ];

  console.log(sportCoachMenu);

  const handleNotificationClick = async () => {
    const newShowState = !showNotifications;
    setShowNotifications(newShowState);

    // If opening notifications, update last viewed time
    if (newShowState && localStorage.getItem("role") === "student") {
      try {
        await updateNotificationLastViewed();
        // Refresh the unread count to show only new notifications
        await fetchUnreadCount();
      } catch (error) {
        console.error("Error updating notification last viewed time:", error);
      }
    }
  };

  // Fetch notifications for the user
  const fetchNotifications = async () => {
    if (localStorage.getItem("role") === "student") {
      try {
        setIsLoadingNotifications(true);
        const result = await getUserNotifications(20, 0);
        if (result.success) {
          setNotificationsList(result.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoadingNotifications(false);
      }
    }
  };

  // Fetch unread notification count
  const fetchUnreadCount = async () => {
    if (localStorage.getItem("role") === "student") {
      try {
        const result = await getUnreadNotificationCount();
        if (result.success) {
          setNotifications(result.data.count);
        }
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    }
  };

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      // Refresh notifications and unread count
      await fetchNotifications();
      await fetchUnreadCount();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Handle closing notifications panel and mark all as read
  const handleCloseNotifications = async () => {
    if (localStorage.getItem("role") === "student") {
      try {
        // Mark all notifications as read
        await markAllNotificationsAsRead();
        // Refresh the unread count
        await fetchUnreadCount();
      } catch (error) {
        console.error("Error marking all notifications as read:", error);
      }
    }
    // Close the panel
    setShowNotifications(false);
  };

  // Format time for display
  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    return notificationTime.toLocaleDateString();
  };

  const NotificationsPanel = () => {
    return (
      <div className="notifications-panel">
        <div className="notifications-header">
          <h3>Notifications</h3>
          <button onClick={handleCloseNotifications}>✖</button>
        </div>
        <div className="notifications-list">
          {isLoadingNotifications ? (
            <div className="notification-item">
              <div className="notification-message">
                Loading notifications...
              </div>
            </div>
          ) : notificationsList.length === 0 ? (
            <div className="notification-item">
              <div className="notification-message">No notifications</div>
            </div>
          ) : (
            notificationsList.map((notification) => (
              <div
                key={notification._id}
                className={`notification-item ${
                  !notification.isRead ? "unread" : ""
                }`}
                onClick={() => handleMarkAsRead(notification._id)}
                style={{ cursor: "pointer" }}
              >
                <div className="notification-title">{notification.title}</div>
                <div className="notification-message">
                  {notification.message}
                </div>
                <div className="notification-time">
                  {formatTime(notification.createdAt)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // Check if we're on the dashboard
  const isDashboard =
    location.pathname === "/dashboard" || location.pathname === "/";

  useEffect(() => {
    // Example: Get role from localStorage or API
    const userRole = localStorage.getItem("role") || "guest";
    setRole(userRole);

    // Filter menus based on user role
    const filteredMenus = topMenus.filter((menu) =>
      menu.roles.includes(userRole)
    );

    setVisibleMenus(filteredMenus);

    // Fetch notifications for student (coin balance now handled by CoinBalanceContext)
    if (userRole === "student") {
      fetchNotifications();
      fetchUnreadCount();
    }
  }, []);

  // Removed duplicate declaration of sportCoachMenu

  // If either auth or RBAC is loading, show loading screen
  if (authLoading || rbacLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading application...</p>
      </div>
    );
  }

  // If not authenticated, just render the outlet (which should be login)
  if (!isAuthenticated) {
    return <Outlet />;
  }

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Handle back button click
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Custom menus for roles with custom dashboards
  const customRoleMenus = {
    "medical-incharge": [
      { id: 1, name: "Dashboard", link: "/dashboard" },
      { id: 2, name: "Students", link: "/dashboard", state: { activeTab: "students" } },
      { id: 3, name: "Check Ins", link: "/dashboard", state: { activeTab: "checkins" } },
      { id: 4, name: "Tasks", link: "/task" },
      { id: 5, name: "Machines", link: "/machines" },
      { id: 6, name: "Purchases", link: "/purchase" },
      { id: 7, name: "Shop", link: "/shop" },
    ],
    "sports-coach": [
      { id: 1, name: "Dashboard", link: "/dashboard" },
      { id: 2, name: "Students", link: "/dashboard", state: { activeTab: "students" } },
      { id: 3, name: "Training", link: "/dashboard", state: { activeTab: "training" } },
      { id: 4, name: "Sports Tasks", link: "/dashboard", state: { activeTab: "tasks" } },
      { id: 5, name: "Performance", link: "/dashboard", state: { activeTab: "performance" } },
      { id: 6, name: "Reports", link: "/dashboard", state: { activeTab: "reports" } },
      { id: 7, name: "Tasks", link: "/task" },
      { id: 8, name: "Machines", link: "/machines" },
      { id: 9, name: "Purchases", link: "/purchase" },
      { id: 10, name: "Shop", link: "/shop" },
    ],
    "music-coach": [
      { id: 1, name: "Dashboard", link: "/dashboard" },
      { id: 2, name: "Students", link: "/dashboard", state: { activeTab: "students" } },
      { id: 3, name: "Training", link: "/dashboard", state: { activeTab: "training" } },
      { id: 4, name: "Music Tasks", link: "/dashboard", state: { activeTab: "tasks" } },
      { id: 5, name: "Performance", link: "/dashboard", state: { activeTab: "performance" } },
      { id: 6, name: "Reports", link: "/dashboard", state: { activeTab: "reports" } },
      { id: 7, name: "Tasks", link: "/task" },
      { id: 8, name: "Machines", link: "/machines" },
      { id: 9, name: "Purchases", link: "/purchase" },
      { id: 10, name: "Shop", link: "/shop" },
    ],
    "amma": [
      { id: 1, name: "Dashboard", link: "/dashboard" },
      { id: 2, name: "Students", link: "/dashboard", state: { activeTab: "students" } },
      { id: 3, name: "Tasks", link: "/task" },
      { id: 4, name: "Machines", link: "/machines" },
      { id: 5, name: "Purchases", link: "/purchase" },
      { id: 6, name: "Shop", link: "/shop" },
    ],
  };

  const currentRole = localStorage.getItem("role");
  const isOnDashboard = location.pathname === "/dashboard";
  const hasCustomDashboard = Object.keys(customRoleMenus).includes(currentRole);

  // Determine which menu to show
  const menuToShow = hasCustomDashboard
    ? customRoleMenus[currentRole]
    : visibleMenus;

  // Show Layout menu for all authenticated roles except custom dashboard roles on /dashboard
  const shouldShowLayoutMenu =
    currentRole === "admin" ||
    currentRole === "coach" ||
    currentRole === "student" ||
    currentRole === "purchase-manager" ||
    currentRole === "balagruha-incharge" ||
    (hasCustomDashboard && !isOnDashboard);

  return (
    <div className="app-layout">
      {shouldShowLayoutMenu && (
        <div className="header">
          {/* Hamburger Menu Icon - CLIENT REQUEST: Hidden since WTF sidebar removed from functionality */}
          {/* Client wants ability to restore this later, so commenting out instead of deleting */}
          {/*
          {isWTFRoute && (
            <div
              className="hamburger-row"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "5px",
              }}
            >
              <button
                className="hamburger-menu"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                title={
                  isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                }
              >
                ☰
              </button>
            </div>
          )}
          */}

          <div className="user-info" style={{ flexDirection: "row" }}>
            <h2>Hi {localStorage?.getItem("name")}</h2>
            {/* <div className="avatar">
                            {localStorage?.getItem('name').charAt(0)}
                        </div> */}
          </div>

          {/* Top Menu */}
          <div className="top-menu scrollable-menu">
            {menuToShow.map((menu) => {
              const isActive = location.pathname === menu.link;
              const isWtf = menu.name === "WTF";
              const wtfHighlight =
                isWtf && (isWTFRoute || shouldShakeWtf) && role === "student";
              const classes = [
                "menu-item",
                isActive ? "active" : "",
                wtfHighlight ? "wtf-highlight" : "",
                isWtf && shouldShakeWtf ? "shake" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  key={menu.id}
                  className={classes}
                  onClick={() => {
                    if (isWtf && role === "student") {
                      // Briefly trigger shake on click
                      setShouldShakeWtf(true);
                      setTimeout(() => setShouldShakeWtf(false), 700);
                    }
                    // Navigate with state if provided (for dashboard tabs)
                    if (menu.state) {
                      navigate(menu.link, { state: menu.state });
                    } else {
                      navigate(menu.link);
                    }
                  }}
                >
                  {menu.name}
                </div>
              );
            })}
          </div>

          {localStorage.getItem("role") === "student" && (
            <>
              <div
                className="coins"
                onClick={() => navigate('/coins/history')}
                style={{ cursor: 'pointer' }}
                title="View transaction history"
              >
                <span className="coins-label">
                  ISF COINS
                  <br />
                  EARNED
                </span>
                <div
                  className="coins-circle"
                  data-digits={coinBalance ? coinBalance.toString().length : 0}
                >
                  {coinBalance ?? "--"}
                </div>
              </div>
              <div className="notifications-container">
                <CartIcon />
                <div
                  className="notification-bell"
                  onClick={handleNotificationClick}
                >
                  🔔
                  {notifications > 0 && (
                    <span className="notification-badge">{notifications}</span>
                  )}
                </div>
                {showNotifications && <NotificationsPanel />}
              </div>
            </>
          )}

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      <div className="app-container">
        <main className="main-content">
          <SidebarContext.Provider
            value={{
              isSidebarCollapsed,
              toggleSidebar: () => setIsSidebarCollapsed(!isSidebarCollapsed),
            }}
          >
            <Outlet />
          </SidebarContext.Provider>
        </main>
      </div>

      {/* Floating Deliveries Button for Coaches - Sprint5-Story-13 */}
      <FloatingDeliveriesButton />
    </div>
  );
};

export default Layout;

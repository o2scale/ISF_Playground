import React, { useState, useEffect, useRef } from "react";
import "./usermanagement.css";
import {
  addUsers,
  deleteUsers,
  fetchUsers,
  coachBasedUsers,
  getBalagruha,
  updateUsers,
  getMachines,
  getBalagruhaById,
  getBalagruhaListByAssignedID,
  getBalagruhaListbyUserID,
  getUserById,
} from "../../api";
import { usePermission } from "../../hooks/usePermission";
import { useAuth } from "../../contexts/AuthContext";
import UserForm from "./UserForm";

const UserManagement = () => {
  const [view, setView] = useState("list"); // 'dashboard', 'list', 'add', 'edit', 'activity'
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterBalagruha, setFilterBalagruha] = useState("all");
  const [balagruhas, setBalagruhas] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    status: "active",
    age: "",
    gender: "",
    balagruhaIds: [],
    parentalStatus: "",
    guardianContact: "",
    assignedMachines: [],
    facialData: null,
  });
  const [balagruhaOptions, setBalagruhaOptions] = useState([
    { value: "67b63186d2486ca7b43fe418", label: "Balagruha 1" },
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [facialDataFile, setFacialDataFile] = useState(null);
  const [facialDataPreview, setFacialDataPreview] = useState(null);
  const facialDataRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});
  const { user } = useAuth();
  const { canCreate, canRead, canUpdate, canDelete } = usePermission();
  const canCreateUser = canCreate("User Management");
  const canReadUser = canRead("User Management");
  const canUpdateUser = canUpdate("User Management");
  const canDeleteUser = canDelete("User Management");

  const storedRoleRaw = localStorage.getItem("role") || "";
  const storedRole = storedRoleRaw.toLowerCase();
  const coachOnlyRoles = new Set(["coach", "sports-coach", "music-coach"]);
  const coachRoleSet = new Set([...coachOnlyRoles, "medical-incharge"]);
  const isCoachLike = coachRoleSet.has(storedRole);
  const shouldHideOtherCoaches = coachOnlyRoles.has(storedRole);
  const currentUserId = localStorage.getItem("userId");

  const normalizeBalagruhaId = (value) => {
    if (!value) return null;
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      const candidate = value._id || value.id || value;
      return candidate ? candidate.toString() : null;
    }
    return String(value);
  };

  useEffect(() => {
    getBalagruhaList();
    getUsers();
    getBalagruhaByUserId();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        !event.target.closest(".dropdown-checkbox-container")
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Load file previews when editing a user
  useEffect(() => {
    if (view === "edit" && selectedUser) {
      // Set form data from selected user
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        password: "",
        role: selectedUser.role,
        status: selectedUser.status,
        age: selectedUser.age || "",
        gender: selectedUser.gender || "",
        balagruhaId: selectedUser.balagruhaId || "",
        parentalStatus: selectedUser.parentalStatus || "",
        guardianContact: selectedUser.guardianContact || "",
      });

      // Set file previews if they exist
      if (selectedUser.facialDataUrl) {
        setFacialDataPreview(selectedUser.facialDataUrl);
      } else {
        setFacialDataPreview(null);
      }
    }
  }, [view, selectedUser]);

  const getUsers = async () => {
    try {
      if (isCoachLike) {
        // Backend endpoint already enforces role and assigned balagruhas
        const response = await coachBasedUsers();
        setUsers(response);
        return;
      }

      const response = await fetchUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getBalagruhaByUserId = async () => {
    try {
      const id = localStorage.getItem("userId");
      const response = await getBalagruhaById(id);

      setBalagruhas(response?.data?.balagruhas || []);
    } catch (error) {
      console.error("Error fetching balagruha list:", error);
    }
  };

  const getBalagruhaList = async () => {
    try {
      const role = (localStorage.getItem("role") || "").toLowerCase();
      const isCoachLike = [
        "coach",
        "sports-coach",
        "music-coach",
        "medical-incharge",
      ].includes(role);

      if (isCoachLike) {
        const userId = localStorage.getItem("userId");
        const userResp = await getBalagruhaListbyUserID(userId);
        let options = userResp?.data?.balagruhas || [];

        if (!Array.isArray(options) || options.length === 0) {
          const assignedResp = await getBalagruhaListByAssignedID(userId);
          options = assignedResp?.data?.balagruhas || [];
        }


        setBalagruhaOptions(options);
        return;
      }

      const response = await getBalagruha();

      setBalagruhaOptions(response?.data?.balagruhas);
    } catch (error) {
      console.error("Error fetching balagruha list:", error);
    }
  };

  const handleEditUserClick = async (userRecord) => {
    if (!userRecord) return;

    let resolvedUser = userRecord;
    try {
      if (userRecord?._id) {
        const detailedUser = await getUserById(userRecord._id);
        if (detailedUser && detailedUser._id) {
          resolvedUser = { ...userRecord, ...detailedUser };
        }
      }
    } catch (error) {
      console.error("Error fetching user details for edit:", error);
    }

    const previewSource =
      resolvedUser?.facialDataUrl ||
      resolvedUser?.facialData?.url ||
      resolvedUser?.facialData?.location ||
      resolvedUser?.facialData?.photoUrl ||
      null;

    setSelectedUser(resolvedUser);
    setFacialDataPreview(previewSource);
    setFacialDataFile(null);
    setFormErrors({});
    setView("edit");
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors({
        ...formErrors,
        [fileType]: "File size exceeds 5MB limit",
      });
      return;
    }

    // Clear any previous errors
    if (formErrors[fileType]) {
      setFormErrors({
        ...formErrors,
        [fileType]: null,
      });
    }

    if (fileType === "facialData") {
      // Check if it's an image
      if (!file.type.startsWith("image/")) {
        setFormErrors({
          ...formErrors,
          facialData: "Only image files are allowed",
        });
        return;
      }

      setFacialDataFile(file);

      // Create a preview URL for the image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFacialDataPreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Filter and sort users - add debugging
  const filteredUsers = users
    .filter((user) => {
      const role = localStorage.getItem("role");

      // Debug logging for filter values
      if (filterBalagruha !== "all") {


      }

      // Filter by search term
      if (
        searchTerm &&
        !user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filter by role
      if (filterRole !== "all" && user.role !== filterRole) {
        return false;
      }

      // Filter by status
      if (filterStatus !== "all" && user.status !== filterStatus) {
        return false;
      }

      // Coach-specific Balagruha filter
      if (
        (role === "coach" && filterBalagruha !== "all") ||
        (role === "medical-incharge" && filterBalagruha !== "all") ||
        (role === "sports-coach" && filterBalagruha !== "all") ||
        (role === "music-coach" && filterBalagruha !== "all") ||
        (role === "admin" && filterBalagruha !== "all")
      ) {
        const userBalagruhaIds = (user.balagruhaIds || [])
          .map((bg) => normalizeBalagruhaId(bg))
          .filter(Boolean);

        const normalizedFilter = normalizeBalagruhaId(filterBalagruha);
        const isMatch = userBalagruhaIds.includes(normalizedFilter);
        if (filterBalagruha !== "all") {

        }
        return isMatch;
      }

      return true;
    })
    .sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case "name":
          valueA = a?.name?.toLowerCase();
          valueB = b?.name?.toLowerCase();
          break;
        case "email":
          valueA = a?.email?.toLowerCase();
          valueB = b?.email?.toLowerCase();
          break;
        case "role":
          valueA = a?.role?.toLowerCase();
          valueB = b?.role?.toLowerCase();
          break;
        case "status":
          valueA = a?.status?.toLowerCase();
          valueB = b?.status?.toLowerCase();
          break;
        case "lastLogin":
          valueA = a?.lastLogin ? new Date(a.lastLogin) : new Date(0);
          valueB = b?.lastLogin ? new Date(b.lastLogin) : new Date(0);
          break;
        default:
          valueA = a?.name.toLowerCase();
          valueB = b?.name.toLowerCase();
      }

      return sortOrder === "asc"
        ? valueA > valueB
          ? 1
          : -1
        : valueA < valueB
        ? 1
        : -1;
    })
    .filter((user) => {
      if (!shouldHideOtherCoaches) {
        return true;
      }
      const userRoleLower = (user?.role || "").toLowerCase();
      if (coachOnlyRoles.has(userRoleLower)) {
        const id = user?._id ? user._id.toString() : "";
        if (!currentUserId) {
          return true;
        }
        return id === currentUserId;
      }
      return true;
    });

  // Debug filter changes
  useEffect(() => {



  }, [
    filterBalagruha,
    filterRole,
    filterStatus,
    searchTerm,
    users.length,
    filteredUsers.length,
  ]);

  // Get unique roles for filter dropdown
  const uniqueRoles = [...new Set(users.map((user) => user.role))];

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Never";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get role emoji
  const getRoleEmoji = (role) => {
    switch (role) {
      case "admin":
        return "👑";
      case "coach":
        return "🏆";
      case "incharge":
        return "🏠";
      case "student":
        return "👨‍🎓";
      case "purchase":
        return "🛒";
      case "medical":
        return "⚕️";
      default:
        return "👤";
    }
  };

  // Get role color
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "#8e44ad";
      case "coach":
        return "#2980b9";
      case "incharge":
        return "#16a085";
      case "student":
        return "#f39c12";
      case "purchase":
        return "#c0392b";
      case "medical":
        return "#27ae60";
      default:
        return "#7f8c8d";
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    return status === "active" ? "#27ae60" : "#e74c3c";
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    } else if (
      view === "add" &&
      users.some((user) => user.email === formData.email)
    ) {
      errors.email = "Email already exists";
    }

    if (view === "add" && !formData.password.trim()) {
      errors.password = "Password is required";
    } else if (view === "add" && formData.password.length < 3) {
      errors.password = "Password must be at least 4 characters";
    }

    if (!formData.role) {
      errors.role = "Role is required";
    }

    if (formData.role === "student") {
      if (!formData.age) {
        errors.age = "Age is required";
      }
      if (!formData.gender) {
        errors.gender = "Gender is required";
      }
      if (!formData.parentalStatus) {
        errors.parentalStatus = "Parental status is required";
      }
      if (!formData.guardianContact) {
        errors.guardianContact = "Guardian contact is required";
      }
      if (!formData.balagruhaId) {
        errors.balagruhaId = "Please select a Balagruha";
      }

      if (view === "add") {
        if (!facialDataFile && !facialDataPreview) {
          errors.facialData = "Facial photo is required";
        }
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Create FormData object to handle file uploads
      const formDataToSend = new FormData();

      // Add all the form fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("status", formData.status);

      if (view === "add") {
        formDataToSend.append("password", formData.password);
      }

      if (formData.role === "student") {
        formDataToSend.append("age", formData.age);
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("balagruhaId", formData.balagruhaId);
        formDataToSend.append("parentalStatus", formData.parentalStatus);
        formDataToSend.append("guardianContact", formData.guardianContact);

        // Add files if they exist
        if (facialDataFile) {
          formDataToSend.append("facialData", facialDataFile);

        }
      }


      for (let pair of formDataToSend.entries()) {

      }

      let response;

      if (view === "add") {
        response = await addUsers(formDataToSend, formData?.role);

        setConfirmationMessage("User added successfully!");
      } else if (view === "edit" && selectedUser) {
        response = await updateUsers(selectedUser._id, formDataToSend);

        setConfirmationMessage("User updated successfully!");
      }

      setShowConfirmation(true);
      getUsers();
      setView("list");

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "student",
        status: "active",
        age: "",
        gender: "",
        balagruhaIds: "",
        parentalStatus: "",
        guardianContact: "",
      });
      setFacialDataFile(null);
      setFacialDataPreview(null);

      setTimeout(() => {
        setShowConfirmation(false);
      }, 2000);
    } catch (error) {
      console.error("Error processing user:", error);
      setConfirmationMessage("Failed to process user. Please try again.");
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 2000);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        const response = await deleteUsers(selectedUser._id);


        const updatedUsers = users.filter(
          (user) => user._id !== selectedUser._id
        );
        setUsers(updatedUsers);
        setShowDeleteModal(false);
        setConfirmationMessage("User deleted successfully!");
        setShowConfirmation(true);

        // Return to user list after a delay
        setTimeout(() => {
          setView("list");
          setShowConfirmation(false);
        }, 2000);

        getUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        setConfirmationMessage("Failed to delete user. Please try again.");
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
        }, 2000);
      }
    }
  };

  // Generate random password
  const generateRandomPassword = () => {
    const chars = "123456789";
    let password = "";
    for (let i = 0; i < 7; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setFormData({
      ...formData,
      password,
    });
  };

  // Calculate dashboard metrics
  const calculateMetrics = () => {
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === "active").length;
    const inactiveUsers = users.filter(
      (user) => user.status === "inactive"
    ).length;

    // Users by role
    const usersByRole = {};
    uniqueRoles.forEach((role) => {
      usersByRole[role] = users.filter((user) => user.role === role).length;
    });

    // New users in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsers = users.filter(
      (user) => new Date(user.updatedAt) > thirtyDaysAgo
    ).length;

    // Recent logins in the last 24 hours
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const recentLogins = users.filter(
      (user) => user.lastLogin && new Date(user.lastLogin) > oneDayAgo
    ).length;

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      usersByRole,
      newUsers,
      recentLogins,
    };
  };

  // Get recent activity for dashboard
  const getRecentActivity = () => {
    // Flatten all login events from all users
    const allEvents = users.flatMap((user) =>
      user.loginEvents
        ? user.loginEvents.map((event) => ({
            ...event,
            userName: user.name,
            userRole: user.role,
            userId: user.id,
          }))
        : []
    );

    // Sort by timestamp (newest first)
    allEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Return the 10 most recent events
    return allEvents.slice(0, 10);
  };

  const handleCheckboxChange = (optionId) => {
    const updatedIds = formData.balagruhaIds.includes(optionId)
      ? formData.balagruhaIds.filter((id) => id !== optionId)
      : [...formData.balagruhaIds, optionId];

    setFormData({
      ...formData,
      balagruhaIds: updatedIds,
    });
  };

  const handleSuccess = (response) => {
    // Handle successful submission

    getUsers();
    setSelectedUser(null);
    setFilterRole("all");
    setFilterStatus("all");
    setView("list");
    // Show success message, refresh user list, etc.
  };

  return (
    <div className="user-management">
      {view === "dashboard" && (
        <div className="dashboard">
          <div className="metrics-cards">
            <div className="metric-card total">
              <h3>Total Users</h3>
              <div className="metric-value">
                {calculateMetrics().totalUsers}
              </div>
              <div className="metric-icon">👥</div>
            </div>

            <div className="metric-card active">
              <h3>Active Users</h3>
              <div className="metric-value">
                {calculateMetrics().activeUsers}
              </div>
              <div className="metric-icon">✅</div>
            </div>

            <div className="metric-card inactive">
              <h3>Inactive Users</h3>
              <div className="metric-value">
                {calculateMetrics().inactiveUsers}
              </div>
              <div className="metric-icon">❌</div>
            </div>

            <div className="metric-card new">
              <h3>New Users (30 days)</h3>
              <div className="metric-value">{calculateMetrics().newUsers}</div>
              <div className="metric-icon">🆕</div>
            </div>
          </div>

          <div className="dashboard-sections">
            <div className="dashboard-section">
              <h3>Users by Role</h3>
              <div className="role-distribution">
                {uniqueRoles.map((role) => (
                  <div key={role} className="role-stat">
                    <div
                      className="role-icon"
                      style={{ backgroundColor: getRoleColor(role) }}
                    >
                      {getRoleEmoji(role)}
                    </div>
                    <div className="role-details">
                      <div className="role-name">
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </div>
                      <div className="role-count">
                        {calculateMetrics().usersByRole[role]} users
                      </div>
                    </div>
                    <div className="role-percentage">
                      {Math.round(
                        (calculateMetrics().usersByRole[role] /
                          calculateMetrics().totalUsers) *
                          100
                      )}
                      %
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-section">
              <h3>Recent User Activity</h3>
              <div className="activity-list">
                {getRecentActivity().map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {activity.action === "Login"
                        ? "🔑"
                        : activity.action === "Logout"
                        ? "👋"
                        : activity.action === "Password Change"
                        ? "🔒"
                        : "✏️"}
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">
                        <strong>{activity.userName}</strong> - {activity.action}
                      </div>
                      <div className="activity-meta">
                        {formatDate(activity.timestamp)}
                      </div>
                      <div className="activity-info">{activity.details}</div>
                    </div>
                  </div>
                ))}

                {getRecentActivity().length === 0 && (
                  <div className="no-activity">
                    <div className="no-data-icon">📝</div>
                    <div className="no-data-message">
                      No recent activity recorded
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {view === "list" && (
        <div className="user-list-view">

          {localStorage.getItem("role") === "admin" && (
            <div className="metrics-cards">
              <div className="metric-card total">
                <h3>Total Users</h3>
                <div className="metric-value">
                  {calculateMetrics().totalUsers}
                </div>
                <div className="metric-icon">👥</div>
              </div>

              <div className="metric-card active">
                <h3>Active Users</h3>
                <div className="metric-value">
                  {calculateMetrics().activeUsers}
                </div>
                <div className="metric-icon">✅</div>
              </div>

              <div className="metric-card inactive">
                <h3>Inactive Users</h3>
                <div className="metric-value">
                  {calculateMetrics().inactiveUsers}
                </div>
                <div className="metric-icon">❌</div>
              </div>

              <div className="metric-card new">
                <h3>New Users (30 days)</h3>
                <div className="metric-value">
                  {calculateMetrics().newUsers}
                </div>
                <div className="metric-icon">🆕</div>
              </div>
            </div>
          )}

          <div className="list-controls">
            <div className="search-box  search-box-input">
              <div>
                <p className="search-icon">🔍</p>
              </div>
              <div>
                <input
                  type="text"
                  id="user-search"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  aria-label="Search users by name or email"
                />
              </div>
            </div>

            {/* {localStorage?.getItem("role") !== "sports-coach" && ( */}
            <div className="filters">
              {canCreateUser && (
                <button
                  className={`tab ${view === "add" ? "active" : ""}`}
                  onClick={() => {
                    setView("add");
                    setSelectedUser(null);
                    setFormData({
                      name: "",
                      email: "",
                      password: "",
                      role: "student",
                      status: "active",
                      age: "",
                      gender: "",
                      balagruhaIds: [],
                      parentalStatus: "",
                      guardianContact: "",
                    });
                    setFacialDataFile(null);
                    setFacialDataPreview(null);
                    setFormErrors({});
                  }}
                >
                  ➕ Add User
                </button>
              )}
              {/* {localStorage.getItem("role") === "coach" || localStorage.getItem("role") === "medical-incharge" || localStorage.getItem("role") === "sports-coach" || localStorage.getItem("role") === "music-coach" ? (
                  <select
                    value={filterBalagruha}
                    onChange={(e) => setFilterBalagruha(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Balagruhas</option>
                    {balagruhas.map((bg, index) => (
                      <option key={index} value={bg._id}>
                        {bg.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Roles</option>
                    {uniqueRoles.map((role, index) => (
                      <option key={index} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                )} */}

              <div style={{ display: "flex", gap: "10px" }}>
                {localStorage.getItem("role") === "admin" ? (
                  <>
                    <select
                      value={filterBalagruha}
                      onChange={(e) => setFilterBalagruha(e.target.value)}
                      className="filter-select"
                      aria-label="Filter by balagruha"
                    >
                      <option value="all">All Balagruhas</option>
                      {balagruhaOptions.map((bg, index) => (
                        <option key={index} value={bg._id}>
                          {bg.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="filter-select"
                      aria-label="Filter by role"
                    >
                      <option value="all">All Roles</option>
                      {uniqueRoles.map((role, index) => (
                        <option key={index} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                  </>
                ) : [
                    "coach",
                    "medical-incharge",
                    "sports-coach",
                    "music-coach",
                  ].includes(localStorage.getItem("role")) ? (
                  <select
                    value={filterBalagruha}
                    onChange={(e) => setFilterBalagruha(e.target.value)}
                    className="filter-select"
                    aria-label="Filter by balagruha"
                  >
                    <option value="all">All Balagruhas</option>
                    {balagruhaOptions.map((bg, index) => (
                      <option key={index} value={bg._id}>
                        {bg.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="filter-select"
                    aria-label="Filter by role"
                  >
                    <option value="all">All Roles</option>
                    {uniqueRoles.map((role, index) => (
                      <option key={index} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                )}

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                  aria-label="Filter by status"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            {/* )} */}
          </div>
          <div className="list-meta">
            Showing {filteredUsers.length} of {users.length} users
          </div>

          <div className="user-table-container">
            <div className="table-scroll-wrapper">
              <table className="user-table">
                <thead>
                  <tr>
                    <th
                      onClick={() => {
                        if (sortBy === "name") {
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        } else {
                          setSortBy("name");
                          setSortOrder("asc");
                        }
                      }}
                    >
                      Name{" "}
                      {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      onClick={() => {
                        if (sortBy === "email") {
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        } else {
                          setSortBy("email");
                          setSortOrder("asc");
                        }
                      }}
                    >
                      Email{" "}
                      {sortBy === "email" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      onClick={() => {
                        if (sortBy === "role") {
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        } else {
                          setSortBy("role");
                          setSortOrder("asc");
                        }
                      }}
                    >
                      Role{" "}
                      {sortBy === "role" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    {/* {localStorage.getItem("role") !== "sports-coach" && ( */}
                    <th
                      onClick={() => {
                        if (sortBy === "status") {
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        } else {
                          setSortBy("status");
                          setSortOrder("asc");
                        }
                      }}
                    >
                      Status{" "}
                      {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    {/* )} */}
                    {/* {localStorage.getItem("role") !== "sports-coach" && ( */}
                    <th
                      onClick={() => {
                        if (sortBy === "lastLogin") {
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        } else {
                          setSortBy("lastLogin");
                          setSortOrder("desc");
                        }
                      }}
                    >
                      Last Login{" "}
                      {sortBy === "lastLogin" &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                    </th>
                    {/* )} */}
                    {(canUpdateUser || canDeleteUser) && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className={
                        user.status === "inactive" ? "inactive-row" : ""
                      }
                    >
                      <td>
                        <div className="user-name-cell">
                          <div
                            className="user-avatar"
                            style={{ backgroundColor: getRoleColor(user.role) }}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <div
                          className="role-badge"
                          style={{ backgroundColor: getRoleColor(user.role) }}
                        >
                          <span className="role-emoji">
                            {getRoleEmoji(user.role)}
                          </span>
                          <span className="role-text">
                            {user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)}
                          </span>
                        </div>
                      </td>
                      {/* {localStorage.getItem("role") !== "sports-coach" && ( */}
                      <td>
                        <div
                          className="user-status-indicator"
                          style={{
                            backgroundColor: getStatusColor(user.status),
                          }}
                        >
                          {user.status === "active" ? "Active" : "Inactive"}
                        </div>
                      </td>
                      {/* )} */}
                      {/* {localStorage.getItem("role") !== "sports-coach" && ( */}
                      <td>{formatDate(user.lastLogin)}</td>
                      {/* )} */}
                      {(canUpdateUser || canDeleteUser) && (
                        <td>
                          <div className="action-buttons">
                            {canUpdateUser && (
                              <button
                                className="action-button edit"
                                onClick={() => handleEditUserClick(user)}
                                title="Edit User"
                              >
                                ✏️
                              </button>
                            )}

                            {canDeleteUser && (
                              <button
                                className="action-button delete"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowDeleteModal(true);
                                }}
                                title="Delete User"
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="no-users">
                <div className="no-data-icon">🔍</div>
                <div className="no-data-message">
                  No users match your search criteria
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {(view === "add" || view === "edit") && (
        // <div className="user-form-container">
        //     <div className="form-header">
        //         <h2>{view === 'add' ? 'Add New User' : 'Edit User'}</h2>
        //         {view === 'edit' && selectedUser && (
        //             <div className="user-summary">
        //                 <div className="user-avatar large" style={{ backgroundColor: getRoleColor(selectedUser.role) }}>
        //                     {selectedUser.name.charAt(0).toUpperCase()}
        //                 </div>
        //                 <div className="user-info">
        //                     <div className="user-id">ID: {selectedUser._id}</div>
        //                     <div className="user-created">Last Updated At: {formatDate(selectedUser.updatedAt)}</div>
        //                 </div>
        //             </div>
        //         )}
        //     </div>

        //     <form className="user-form" onSubmit={handleSubmit} encType="multipart/form-data">
        //         <div className="form-group">
        //             <label htmlFor="name" className="form-label">Name</label>
        //             <input
        //                 type="text"
        //                 id="name"
        //                 name="name"
        //                 value={formData.name}
        //                 onChange={handleInputChange}
        //                 className={`form-input ${formErrors.name ? 'error' : ''}`}
        //                 placeholder="Enter full name"
        //             />
        //             {formErrors.name && <div className="error-message">{formErrors.name}</div>}
        //         </div>

        //         <div className="form-group">
        //             <label htmlFor="email" className="form-label">Email</label>
        //             <input
        //                 type="email"
        //                 id="email"
        //                 name="email"
        //                 value={formData.email}
        //                 onChange={handleInputChange}
        //                 className={`form-input ${formErrors.email ? 'error' : ''}`}
        //                 placeholder="Enter email address"
        //             />
        //             {formErrors.email && <div className="error-message">{formErrors.email}</div>}
        //         </div>

        //         {view === 'add' && (
        //             <div className="form-group">
        //                 <label htmlFor="password" className="form-label">
        //                     Password
        //                     <button
        //                         type="button"
        //                         className="generate-password-button"
        //                         onClick={generateRandomPassword}
        //                     >
        //                         Generate Random
        //                     </button>
        //                 </label>
        //                 <input
        //                     type="text"
        //                     id="password"
        //                     name="password"
        //                     value={formData.password}
        //                     onChange={handleInputChange}
        //                     className={`form-input ${formErrors.password ? 'error' : ''}`}
        //                     placeholder="Enter password or generate random"
        //                 />
        //                 {formErrors.password && <div className="error-message">{formErrors.password}</div>}
        //             </div>
        //         )}

        //         <div className="form-group">
        //             <label htmlFor="role" className="form-label">Role</label>
        //             <select
        //                 id="role"
        //                 name="role"
        //                 value={formData.role}
        //                 onChange={handleInputChange}
        //                 className={`form-select ${formErrors.role ? 'error' : ''}`}
        //             >
        //                 <option value="admin">Admin</option>
        //                 <option value="coach">Coach</option>
        //                 <option value="balagruha-incharge">Balagruha In-Charge</option>
        //                 <option value="student">Student</option>
        //                 <option value="purchase-manager">Purchase Manager</option>
        //                 <option value="medical-incharge">Medical Manager</option>
        //                 <option value="sports-coach">Sports Coach</option>
        //                 <option value="music-coach">Music Coach</option>
        //                 <option value="amma">Amma</option>

        //             </select>
        //             {formErrors.role && <div className="error-message">{formErrors.role}</div>}
        //         </div>

        //         <div className="form-group">
        //             <label htmlFor="status" className="form-label">Status</label>
        //             <div className="status-toggle">
        //                 <label className={`status-option ${formData.status === 'active' ? 'active' : ''}`}>
        //                     <input
        //                         type="radio"
        //                         name="status"
        //                         value="active"
        //                         checked={formData.status === 'active'}
        //                         onChange={handleInputChange}
        //                     />
        //                     <span className="status-icon">✅</span>
        //                     <span className="status-text">Active</span>
        //                 </label>
        //                 <label className={`status-option ${formData.status === 'inactive' ? 'inactive' : ''}`}>
        //                     <input
        //                         type="radio"
        //                         name="status"
        //                         value="inactive"
        //                         checked={formData.status === 'inactive'}
        //                         onChange={handleInputChange}
        //                     />
        //                     <span className="status-icon">❌</span>
        //                     <span className="status-text">Inactive</span>
        //                 </label>
        //             </div>
        //         </div>

        //         <div className="form-group">
        //             <label htmlFor="balagruhaId" className="form-label">Balagruha</label>
        //             <div className="dropdown-checkbox-container">
        //                 <div
        //                     className={`dropdown-checkbox-header ${formErrors.balagruhaIds ? 'error' : ''}`}
        //                     onClick={() => setDropdownOpen(!dropdownOpen)}
        //                 >
        //                     <span>
        //                         {formData.balagruhaIds.length > 0
        //                             ? balagruhaOptions.filter(option => formData.balagruhaIds.includes(option._id)).map(o => o.name).join(", ")
        //                             : 'Select Balagruha'}
        //                     </span>
        //                     <span className="dropdown-arrow">{dropdownOpen ? '▲' : '▼'}</span>
        //                 </div>

        //                 {dropdownOpen && (
        //                     <div className="dropdown-checkbox-options">
        //                         {balagruhaOptions.map(option => (
        //                             <div key={option._id} className="dropdown-option">
        //                                 <input
        //                                     type="checkbox"
        //                                     checked={formData.balagruhaIds.includes(option._id)}
        //                                     onChange={() => handleCheckboxChange(option._id)}
        //                                     className='user-balagruha-checkbox'
        //                                 />
        //                                 <span className="option-label">{option.name}</span>
        //                             </div>
        //                         ))}
        //                     </div>
        //                 )}
        //             </div>
        //             {formErrors.balagruhaIds && <div className="error-message">{formErrors.balagruhaIds}</div>}
        //         </div>

        //         {formData.role === 'student' && (
        //             <>
        //                 {formData.role === 'student' && (
        //                     <div className="student-section">
        //                         <h3>Student Information</h3>

        //                         <div className="form-group">
        //                             <label htmlFor="age">Age</label>
        //                             <input
        //                                 type="number"
        //                                 id="age"
        //                                 name="age"
        //                                 value={formData.age}
        //                                 onChange={handleInputChange}
        //                                 className={formErrors.age ? 'error' : ''}
        //                                 placeholder="Enter age"
        //                                 min="1"
        //                                 max="100"
        //                             />
        //                             {formErrors.age && <div className="error-message">{formErrors.age}</div>}
        //                         </div>

        //                         <div className="form-group">
        //                             <label htmlFor="gender">Gender</label>
        //                             <select
        //                                 id="gender"
        //                                 name="gender"
        //                                 value={formData.gender}
        //                                 onChange={handleInputChange}
        //                                 className={formErrors.gender ? 'error' : ''}
        //                             >
        //                                 <option value="">Select Gender</option>
        //                                 <option value="male">Male</option>
        //                                 <option value="female">Female</option>
        //                                 <option value="other">Other</option>
        //                             </select>
        //                             {formErrors.gender && <div className="error-message">{formErrors.gender}</div>}
        //                         </div>

        //                         <div className="form-group">
        //                             <label htmlFor="parentalStatus">Parental Status</label>
        //                             <select
        //                                 id="parentalStatus"
        //                                 name="parentalStatus"
        //                                 value={formData.parentalStatus}
        //                                 onChange={handleInputChange}
        //                                 className={formErrors.parentalStatus ? 'error' : ''}
        //                             >
        //                                 <option value="">Select Parental Status</option>
        //                                 <option value="has both">Has Both Parents</option>
        //                                 <option value="has one">Has One Parent</option>
        //                                 <option value="has guardian">Has Guardian</option>
        //                                 <option value="has none">Has None</option>
        //                             </select>
        //                             {formErrors.parentalStatus && <div className="error-message">{formErrors.parentalStatus}</div>}
        //                         </div>

        //                         <div className="form-group">
        //                             <label htmlFor="guardianContact">Guardian Contact</label>
        //                             <input
        //                                 type="tel"
        //                                 id="guardianContact"
        //                                 name="guardianContact"
        //                                 value={formData.guardianContact}
        //                                 onChange={handleInputChange}
        //                                 className={formErrors.guardianContact ? 'error' : ''}
        //                                 placeholder="Enter guardian contact number"
        //                                 pattern="[0-9]{10}"
        //                             />
        //                             {formErrors.guardianContact && <div className="error-message">{formErrors.guardianContact}</div>}
        //                         </div>

        //                         <div className="form-group">
        //                             <label htmlFor="facialData">Facial Photo</label>
        //                             <div className="file-upload-container">
        //                                 <input
        //                                     type="file"
        //                                     id="facialData"
        //                                     name="facialData"
        //                                     accept="image/*"
        //                                     onChange={(e) => handleFileChange(e, 'facialData')}
        //                                     className={formErrors.facialData ? 'error' : ''}
        //                                     ref={facialDataRef}
        //                                     style={{ display: 'none' }}
        //                                 />
        //                                 <div className="file-upload-button-container">
        //                                     <button
        //                                         type="button"
        //                                         className="file-upload-button"
        //                                         onClick={() => facialDataRef.current.click()}
        //                                     >
        //                                         {formData.facialData ? 'Change Photo' : 'Upload Photo'}
        //                                     </button>
        //                                     {formData.facialData && (
        //                                         <span className="file-name">{formData.facialData.name}</span>
        //                                     )}
        //                                 </div>
        //                                 {facialDataPreview && (
        //                                     <div className="file-preview">
        //                                         <div className="image-preview">
        //                                             <img
        //                                                 src={facialDataPreview}
        //                                                 alt="Facial data preview"
        //                                                 className="facial-image-preview"
        //                                             />
        //                                         </div>
        //                                     </div>
        //                                 )}
        //                             </div>
        //                             {formErrors.facialData && <div className="error-message">{formErrors.facialData}</div>}
        //                         </div>

        //                         {/* Medical History Section */}
        //                         <div className="medical-history-section">
        //                             <div className="section-header">
        //                                 <h3>Medical History</h3>
        //                                 <button
        //                                     type="button"
        //                                     className="add-history-button"
        //                                     onClick={handleAddMedicalHistory}
        //                                 >
        //                                     Add Medical Record
        //                                 </button>
        //                             </div>

        //                             {formData?.medicalHistory && formData?.medicalHistory?.map((history, index) => (
        //                                 renderMedicalHistoryForm(history, index)
        //                             ))}
        //                         </div>
        //                     </div>
        //                 )}

        //             </>
        //         )}

        //         <div className="form-actions">
        //             <button type="submit" className="submit-button">
        //                 {view === 'add' ? 'Add User' : 'Save Changes'}
        //             </button>
        //             <button
        //                 type="button"
        //                 className="cancel-button"
        //                 onClick={() => setView('list')}
        //             >
        //                 Cancel
        //             </button>
        //         </div>
        //     </form>
        // </div>
        <>
          <UserForm
            mode={view}
            user={selectedUser}
            onSuccess={handleSuccess}
            onCancel={() => setView("list")}
          />
        </>
      )}

      {view === "activity" && selectedUser && (
        <div className="activity-view">
          <div className="activity-header">
            <div className="user-profile">
              <div
                className="user-avatar large"
                style={{ backgroundColor: getRoleColor(selectedUser.role) }}
              >
                {selectedUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <h2>{selectedUser.name}</h2>
                <div className="user-meta">
                  <div className="user-email">{selectedUser.email}</div>
                  <div
                    className="role-badge"
                    style={{ backgroundColor: getRoleColor(selectedUser.role) }}
                  >
                    <span className="role-emoji">
                      {getRoleEmoji(selectedUser.role)}
                    </span>
                    <span className="role-text">
                      {selectedUser.role.charAt(0).toUpperCase() +
                        selectedUser.role.slice(1)}
                    </span>
                  </div>
                  <div
                    className="status-indicator"
                    style={{
                      backgroundColor: getStatusColor(selectedUser.status),
                    }}
                  >
                    {selectedUser.status === "active" ? "Active" : "Inactive"}
                  </div>
                </div>
                <div className="user-info-row">
                  <div className="info-item">
                    <span className="info-label">User ID:</span>
                    <span className="info-value">{selectedUser._id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Created:</span>
                    <span className="info-value">
                      {formatDate(selectedUser.createdAt)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Login:</span>
                    <span className="info-value">
                      {formatDate(selectedUser.lastLogin)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Balagruha:</span>
                    <span className="info-value">{selectedUser.balagruha}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="activity-actions">
              <button className="back-button" onClick={() => setView("list")}>
                ← Back to List
              </button>
              <button
                className="edit-button"
                onClick={() => {
                  setFormData({
                    name: selectedUser.name,
                    email: selectedUser.email,
                    password: "",
                    role: selectedUser.role,
                    status: selectedUser.status,
                    age: selectedUser.age || "",
                    gender: selectedUser.gender || "",
                    balagruhaId: selectedUser.balagruhaId || "",
                    parentalStatus: selectedUser.parentalStatus || "",
                    guardianContact: selectedUser.guardianContact || "",
                  });
                  setFormErrors({});
                  setView("edit");
                }}
              >
                ✏️ Edit User
              </button>
            </div>
          </div>

          <div className="activity-content">
            <h3>Activity Log</h3>

            {selectedUser.loginEvents && selectedUser.loginEvents.length > 0 ? (
              <div className="activity-timeline">
                {selectedUser.loginEvents.map((event, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-icon">
                      {event.action === "Login"
                        ? "🔑"
                        : event.action === "Logout"
                        ? "👋"
                        : event.action === "Password Change"
                        ? "🔒"
                        : "✏️"}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-time">
                        {formatDate(event.timestamp)}
                      </div>
                      <div className="timeline-title">{event.action}</div>
                      <div className="timeline-details">{event.details}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-activity">
                <div className="no-data-icon">📝</div>
                <div className="no-data-message">
                  No activity recorded for this user
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation message */}
      {showConfirmation && (
        <div className="confirmation-message">
          <div className="confirmation-icon">✅</div>
          <div className="confirmation-text">{confirmationMessage}</div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-icon">⚠️</div>
              <h3 className="modal-title">Confirm Deletion</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete the user{" "}
                <strong>{selectedUser.name}</strong>?
              </p>
              <p>This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button
                className="delete-confirm-button"
                onClick={handleDeleteUser}
              >
                Yes, Delete User
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

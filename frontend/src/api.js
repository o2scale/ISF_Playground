import axios from "axios";
const macAddress = localStorage.getItem("macAddress");

export const api = axios.create({
  baseURL: "https://playground.initiativesewafoundation.com/server",
  headers: {
    "Content-Type": "application/json",
    "MAC-Address": `${macAddress}`,
    mode: "no-cors",
  },
});

export const apiWithoutContentType = axios.create({
  baseURL: "https://playground.initiativesewafoundation.com/server",
  headers: {
    "MAC-Address": `${macAddress}`,
    mode: "no-cors",
  },
});

export const headers = {
  "Content-Type": "multipart/form-data",
};
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

apiWithoutContentType.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiWithoutContentType.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export const fetchRolesandPermissions = async () => {
  const response = await api.get("/api/roles");
  return response.data;
};

export const faceIdlogin = async (data) => {
  const response = await apiWithoutContentType.post(
    `/api/auth/student/facial/login`,
    data
  );
  return response.data;
};

export const updateRolePermissions = async (id, data) => {
  const response = await api.put(`/api/roles/${id}`, data);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await api.get("/api/users");
  return response.data;
};

export const coachBasedUsers = async () => {
  const response = await api.get("/api/v1/users/assigned/users");
  return response.data;
};

export const addUsers = async (data, type) => {
  const response = await apiWithoutContentType.post("/api/v1/users", data);
  return response.data;
};

export const updateUsers = async (id, data) => {
  const response = await apiWithoutContentType.put(`/api/v1/users/${id}`, data);
  return response.data;
};

export const deleteUsers = async (id) => {
  const response = await api.delete(`/api/users/${id}`);
  return response.data;
};

export const createTask = async (data) => {
  const response = await api.post(`/api/tasks`, data, { headers });
  return response.data;
};

export const addComment = async (id, data) => {
  const response = await api.post(`/api/tasks/comment/${id}`, data, {
    headers,
  });
  return response.data;
};

export const updateTaskAttachments = async (id, data) => {
  const response = await api.put(`/api/tasks/attachments/${id}`, data, {
    headers,
  });
  return response.data;
};

export const deleteAttachemnets = async (taskId, attachmentId) => {
  const response = await api.delete(
    `/api/tasks/attachments/${taskId}/${attachmentId}`,
    { headers }
  );
  return response.data;
};

export const getTasks = async (data) => {
  const response = await api.post(`/api/tasks/all/list`, data);
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await api.put(`/api/tasks/status/${id}`, data);
  return response.data;
};

export const getBalagruha = async () => {
  const response = await api.get(`/api/v1/balagruha/`);
  return response.data;
};

export const addMachines = async (data) => {
  const response = await api.post("/api/v1/machines", data);
  return response.data;
};

export const toggleMachineStatus = async (id) => {
  const response = await api.put(`/api/v1/machines/${id}/status`);
  return response.data;
};

export const assignMachineToAnotherBalagruha = async (id, data) => {
  const response = await api.put(`/api/v1/machines/${id}/assign`, data);
  return response.data;
};

export const getMachines = async () => {
  const response = await api.get(`/api/v1/machines`, { headers });
  return response.data;
};

export const addBalagruha = async (data) => {
  const response = await api.post(`/api/v1/balagruha/`, data);
  return response.data;
};

export const updateBalagruha = async (id, data) => {
  const response = await api.put(`/api/v1/balagruha/${id}`, data);
  return response.data;
};

export const getBalagruhaById = async (id) => {
  const response = await api.get(`/api/v1/balagruha/user/${id}`);
  return response.data;
};

export const deleteBalagruha = async (id) => {
  const response = await api.delete(`/api/v1/balagruha/${id}`);
  return response.data;
};

export const deleteMachineById = async (id) => {
  const response = await api.delete(`/api/v1/machines/${id}`);
  return response.data;
};

export const getStudentListforAttendance = async (id, date) => {
  const response = await api.get(
    `/api/v1/users/students/attendance/${id}?date=${date}`
  );
  return response.data;
};

export const postmarkAttendance = async (data) => {
  const response = await api.post(`/api/v1/users/students/attendance`, data);
  return response.data;
};

export const getTaskBytaskId = async (id) => {
  const response = await api.get(`/api/tasks/${id}`);
  return response.data;
};

export const deleteCommentinTask = async (id, commentId) => {
  const response = await api.delete(`/api/tasks/comment/${id}/${commentId}`);
  return response.data;
};

export const getSportsOverview = async (balagruhaId, date) => {
  try {
    const response = await api.get(`/api/v1/sports/overview/${balagruhaId}`, {
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sports overview:", error);
    throw error;
  }
};

// Create a new sports task
export const createSportsTask = async (data) => {
  try {
    const response = await api.post(`/api/v1/sports/task`, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating sports task:", error);
    throw error;
  }
};

// Update an existing sports task
export const updateSportsTask = async (taskId, data) => {
  try {
    const response = await api.put(`/api/v1/sports/task/${taskId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating sports task:", error);
    throw error;
  }
};

// Add or update attachments for a sports task
export const addOrUpdateSportsTaskAttachments = async (taskId, data) => {
  try {
    const response = await api.post(
      `/api/v1/sports/task/attachments/${taskId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding/updating attachments:", error);
    throw error;
  }
};

// Add or update comments on a sports task
export const addOrUpdateSportsTaskComments = async (taskId, data) => {
  try {
    const response = await api.post(
      `/api/v1/sports/tasks/comment/${taskId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding/updating comments:", error);
    throw error;
  }
};

// Get sports task list by Balagruha (with filters)
export const getSportsTaskListByBalagruha = async (filters) => {
  try {
    const response = await api.post(`/api/v1/sports/tasks/list`, filters);
    return response.data;
  } catch (error) {
    console.error("Error fetching sports task list by Balagruha:", error);
    throw error;
  }
};

// Get sports task list by students (with filters)
export const getSportsTaskListByStudents = async (filters) => {
  try {
    const response = await api.post(`/api/v1/sports/students/all`, filters);
    return response.data;
  } catch (error) {
    console.error("Error fetching sports task list by students:", error);
    throw error;
  }
};

export const createMusicTask = async (data) => {
  try {
    const response = await api.post(`/api/v1/music/task`, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating sports task:", error);
    throw error;
  }
};

// Update an existing sports task
export const updateMusicTask = async (taskId, data) => {
  try {
    const response = await api.put(`/api/v1/music/task/${taskId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating sports task:", error);
    throw error;
  }
};

// Add or update attachments for a sports task
export const addOrUpdateMusicTaskAttachments = async (taskId, data) => {
  try {
    const response = await api.post(
      `/api/v1/music/task/attachments/${taskId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding/updating attachments:", error);
    throw error;
  }
};

// Add or update comments on a sports task
export const addOrUpdateMusicTaskComments = async (taskId, data) => {
  try {
    const response = await api.post(
      `/api/v1/music/tasks/comment/${taskId}`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding/updating comments:", error);
    throw error;
  }
};

export const createTraining = async (data) => {
  try {
    const response = await api.post(`api/v1/training-session`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding/updating training:", error);
    throw error;
  }
};

export const getTraining = async (id, type) => {
  try {
    const response = await api.get(
      `/api/v1/sports/training-sessions?balagruhaIds=${id}&type=${type}`
    );
    return response.data;
  } catch (error) {
    console.error("Error geeting tarining:", error);
    throw error;
  }
};

export const updateTraining = async (id, data) => {
  try {
    const response = await api.put(`/api/v1/training-session/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding/updating training:", error);
    throw error;
  }
};

export const deleteTrainign = async (id) => {
  try {
    const response = await api.delete(`/api/v1/sports/training-session/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error adding/updating training:", error);
    throw error;
  }
};

export const getUnAssigned = async () => {
  try {
    const response = await api.get(`/api/v1/machines/unassigned`);
    return response.data;
  } catch (error) {
    console.error("Error adding/updating training:", error);
    throw error;
  }
};

export const createRepair = async (data) => {
  try {
    const response = await api.post(
      `/api/v1/purchase-repair/repair-requests`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log("eror in creating reqierst", error);
    throw error;
  }
};

export const getAllRepairs = async () => {
  try {
    const response = await api.get(`/api/v1/purchase-repair/repair-requests`);
    return response.data;
  } catch (error) {
    console.error("Error adding/updating training:", error);
    throw error;
  }
};

export const deleteRepair = async (id) => {
  try {
    const response = await api.delete(
      `/api/v1/purchase-repair/repair-requests/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding/updating training:", error);
    throw error;
  }
};

export const updateRepairRequest = async (id, data) => {
  try {
    const response = await api.put(
      `/api/v1/purchase-repair/repair-requests/${id}`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding/updating training:", error);
    throw error;
  }
};

export const getPurchaseOverView = async () => {
  try {
    const response = await api.get(`/api/v1/purchase-repair/overview`);
    return response.data;
  } catch (error) {
    console.error("Error adding/updating training:", error);
    throw error;
  }
};

export const createPurchase = async (data) => {
  try {
    const response = await api.post(
      `/api/v1/purchase-repair/purchase-orders`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log("eror in creating reqierst", error);
    throw error;
  }
};

export const getAllPurchases = async () => {
  try {
    const response = await api.get(`/api/v1/purchase-repair/purchase-orders`);
    return response.data;
  } catch (error) {
    console.error("Error adding/updating training:", error);
    throw error;
  }
};

export const deletePurchase = async (id) => {
  try {
    const response = await api.delete(
      `/api/v1/purchase-repair/purchase-orders/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding/updating training:", error);
    throw error;
  }
};

export const updatePurchaseOrder = async (id, data) => {
  try {
    const response = await api.put(
      `/api/v1/purchase-repair/purchase-orders/${id}`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding/updating training:", error);
    throw error;
  }
};

export const getBalagruhaListbyUserID = async (id) => {
  try {
    const response = await api.get(`/api/v1/balagruha/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error balagruha list by user id", error);
    throw error;
  }
};

export const getAnyUserBasedonRoleandBalagruha = async (role, balagruhaId) => {
  try {
    const response = await api.get(`/api/v1/users/role/${role}?${balagruhaId}`);
    return response.data;
  } catch (error) {
    console.error("Error balagruha list by user id", error);
    throw error;
  }
};

// ==================== WTF API FUNCTIONS ====================

// Pin Management APIs
export const createWtfPin = async (data) => {
  try {
    const response = await api.post(`/api/v1/wtf/pins`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating WTF pin:", error);
    throw error;
  }
};

export const getActiveWtfPins = async (params = {}) => {
  try {
    const response = await api.get(`/api/v1/wtf/pins/active`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching active WTF pins:", error);
    throw error;
  }
};

export const getWtfPinById = async (pinId) => {
  try {
    const response = await api.get(`/api/v1/wtf/pins/${pinId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching WTF pin by ID:", error);
    throw error;
  }
};

export const updateWtfPin = async (pinId, data) => {
  try {
    const response = await api.put(`/api/v1/wtf/pins/${pinId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating WTF pin:", error);
    throw error;
  }
};

export const deleteWtfPin = async (pinId) => {
  try {
    const response = await api.delete(`/api/v1/wtf/pins/${pinId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting WTF pin:", error);
    throw error;
  }
};

export const changeWtfPinStatus = async (pinId, status) => {
  try {
    const response = await api.patch(`/api/v1/wtf/pins/${pinId}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing WTF pin status:", error);
    throw error;
  }
};

// Interaction APIs
export const likeWtfPin = async (pinId) => {
  try {
    const response = await api.post(`/api/v1/wtf/pins/${pinId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking WTF pin:", error);
    throw error;
  }
};

export const markWtfPinAsSeen = async (pinId) => {
  try {
    const response = await api.post(`/api/v1/wtf/pins/${pinId}/seen`);
    return response.data;
  } catch (error) {
    console.error("Error marking WTF pin as seen:", error);
    throw error;
  }
};

export const getWtfPinInteractions = async (pinId) => {
  try {
    const response = await api.get(`/api/v1/wtf/pins/${pinId}/interactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching WTF pin interactions:", error);
    throw error;
  }
};

// Submission APIs
export const submitVoiceNote = async (data) => {
  try {
    const response = await apiWithoutContentType.post(
      `/api/v1/wtf/submissions/voice`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting voice note:", error);
    throw error;
  }
};

export const submitArticle = async (data) => {
  try {
    const response = await api.post(`/api/v1/wtf/submissions/article`, data);
    return response.data;
  } catch (error) {
    console.error("Error submitting article:", error);
    throw error;
  }
};

export const getSubmissionsForReview = async (params = {}) => {
  try {
    const response = await api.get(`/api/v1/wtf/submissions/review`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching submissions for review:", error);
    throw error;
  }
};

export const reviewSubmission = async (submissionId, data) => {
  try {
    const response = await api.post(
      `/api/v1/wtf/submissions/${submissionId}/review`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error reviewing submission:", error);
    throw error;
  }
};

// Analytics APIs
export const getWtfAnalytics = async () => {
  try {
    const response = await api.get(`/api/v1/wtf/analytics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching WTF analytics:", error);
    throw error;
  }
};

export const getWtfInteractionAnalytics = async (params = {}) => {
  try {
    const response = await api.get(`/api/v1/wtf/analytics/interactions`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching WTF interaction analytics:", error);
    throw error;
  }
};

export const getWtfSubmissionAnalytics = async (params = {}) => {
  try {
    const response = await api.get(`/api/v1/wtf/analytics/submissions`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching WTF submission analytics:", error);
    throw error;
  }
};

// Student Management APIs
export const getStudentSubmissions = async (studentId, params = {}) => {
  try {
    const response = await api.get(
      `/api/v1/wtf/students/${studentId}/submissions`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching student submissions:", error);
    throw error;
  }
};

export const getStudentInteractionHistory = async (studentId, params = {}) => {
  try {
    const response = await api.get(
      `/api/v1/wtf/students/${studentId}/interactions`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching student interaction history:", error);
    throw error;
  }
};

// Admin Management APIs
export const getPinsByAuthor = async (authorId, params = {}) => {
  try {
    const response = await api.get(
      `/api/v1/wtf/admin/pins/author/${authorId}`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pins by author:", error);
    throw error;
  }
};

export const getSubmissionStats = async (params = {}) => {
  try {
    const response = await api.get(`/api/v1/wtf/admin/submissions/stats`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching submission stats:", error);
    throw error;
  }
};

// WebSocket APIs
export const getWebSocketStatus = async () => {
  try {
    const response = await api.get(`/api/v1/websocket/status`);
    return response.data;
  } catch (error) {
    console.error("Error fetching WebSocket status:", error);
    throw error;
  }
};

// WTF Transaction History
export const getWtfTransactionHistory = async (params = {}) => {
  try {
    const response = await api.get(`/api/v1/coins/wtf/transactions`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching WTF transaction history:", error);
    throw error;
  }
};

// Admin Control Counts
export const getWtfAdminCounts = async () => {
  try {
    const response = await api.get(`/api/v1/wtf/admin/counts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching WTF admin counts:", error);
    throw error;
  }
};

// Get submission statistics
export const getWtfSubmissionStats = async () => {
  try {
    const response = await api.get(`/api/v1/wtf/admin/submissions/stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching WTF submission stats:", error);
    throw error;
  }
};

// Get pending submissions count
export const getPendingSubmissionsCount = async () => {
  try {
    const response = await api.get(`/api/v1/wtf/submissions/review`, {
      params: { page: 1, limit: 1 },
    });
    return response.data?.pagination?.total || 0;
  } catch (error) {
    console.error("Error fetching pending submissions count:", error);
    throw error;
  }
};

// WTF Dashboard Metrics
export const getWtfDashboardMetrics = async () => {
  try {
    // Use existing analytics endpoint
    const response = await api.get(`/api/v1/wtf/analytics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching WTF dashboard metrics:", error);
    throw error;
  }
};

// Get active pins count
export const getActivePinsCount = async () => {
  try {
    // Use existing active pins endpoint with pagination
    const response = await api.get(`/api/v1/wtf/pins`, {
      params: { page: 1, limit: 1 },
    });
    return response.data?.pagination?.total || 0;
  } catch (error) {
    console.error("Error fetching active pins count:", error);
    throw error;
  }
};

// Get total engagement (views) - use existing analytics
export const getWtfTotalEngagement = async () => {
  try {
    const response = await api.get(`/api/v1/wtf/analytics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching WTF total engagement:", error);
    throw error;
  }
};

// Get coach suggestions count - use submission stats
export const getCoachSuggestionsCount = async () => {
  try {
    const response = await api.get(`/api/v1/wtf/submissions/stats`);
    return response.data?.data?.pendingCount || 0;
  } catch (error) {
    console.error("Error fetching coach suggestions count:", error);
    throw error;
  }
};

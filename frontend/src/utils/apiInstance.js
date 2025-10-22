import axios from "axios";

export const ReqSource = {
  ELECTRON: "electron",
  WEB: "web",
};

const checkOnlineStatus = async () => {
  if (window.macAPI?.getOnlineStatus) {
    try {
      return await window.macAPI.getOnlineStatus();
    } catch {
      return true;
    }
  }
  return true;
};

export const getApiInstance = () => {
  const instance = axios.create();
  instance.interceptors.request.use(async (config) => {
    const isOnline = await checkOnlineStatus();
    config.baseURL = isOnline
      ? "https://playground.initiativesewafoundation.com/server"
      : "http://localhost:5001";
    const macAddress = localStorage.getItem("macAddress");
    if (macAddress) config.headers["MAC-Address"] = macAddress;
    if (!config.headers["Content-Type"])
      config.headers["Content-Type"] = "application/json";
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    const isElectron = navigator.userAgent.toLowerCase().includes("electron");
    config.headers["ReqSource"] = isElectron
      ? ReqSource.ELECTRON
      : ReqSource.WEB;
    return config;
  });
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        // Clear all authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Show user-friendly message
        const errorCode = error.response?.data?.code;
        const errorMessage = error.response?.data?.message || "Session expired. Please login again.";

        // Alert user before redirect
        if (errorCode === "TOKEN_EXPIRED" || errorCode === "INVALID_TOKEN") {
          alert(errorMessage);
        }

        // Redirect to login
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export const getApiWithoutContentTypeInstance = () => {
  const instance = axios.create();
  instance.interceptors.request.use(async (config) => {
    const isOnline = await checkOnlineStatus();
    config.baseURL = isOnline
      ? "https://playground.initiativesewafoundation.com/server"
      : "http://localhost:5001";
    const macAddress = localStorage.getItem("macAddress");
    if (macAddress) config.headers["MAC-Address"] = macAddress;
    config.headers["Content-Type"] = "multipart/form-data";
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    const isElectron = navigator.userAgent.toLowerCase().includes("electron");
    config.headers["ReqSource"] = isElectron
      ? ReqSource.ELECTRON
      : ReqSource.WEB;
    return config;
  });
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        // Clear all authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Show user-friendly message
        const errorCode = error.response?.data?.code;
        const errorMessage = error.response?.data?.message || "Session expired. Please login again.";

        // Alert user before redirect
        if (errorCode === "TOKEN_EXPIRED" || errorCode === "INVALID_TOKEN") {
          alert(errorMessage);
        }

        // Redirect to login
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

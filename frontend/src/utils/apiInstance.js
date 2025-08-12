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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

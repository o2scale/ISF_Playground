import axios from "axios";
import config from "../config";

// Re-export axios utilities for consumers that need them without importing axios directly
export const isCancel = axios.isCancel;

const macAddress = localStorage.getItem("macAddress");

export const api = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "MAC-Address": `${macAddress}`,
    mode: "no-cors",
  },
  timeout: config.API_TIMEOUT,
});

export const apiWithoutContentType = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    "MAC-Address": `${macAddress}`,
    mode: "no-cors",
  },
  timeout: config.API_TIMEOUT,
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

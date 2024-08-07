import axios from "axios";
import Cookies from "js-cookie";

const csrfToken = Cookies.get("csrftoken");

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    "X-CSRFToken": csrfToken,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const refreshAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(error);
      }

      try {
        const response = await refreshAxiosInstance.post("/token/refresh/", {
          refresh: refreshToken,
        });

        if (response.status === 200) {
          const { access_token } = response.data;
          localStorage.setItem("access_token", access_token);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${access_token}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
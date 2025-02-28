import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies (e.g., session-based auth) are sent automatically
});

// Interceptors for handling responses and errors (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized access (e.g., redirect to login)
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Handle logout or redirect logic here if needed
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);


// ✅ Track refresh state
let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

// ✅ Function to refresh the token
const refreshToken = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      await axiosInstance.post("/refresh");
      refreshSubscribers.forEach((callback) => callback()); // Retry failed requests
    } catch (error) {
      console.error("Refresh token failed:", error);
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
      refreshSubscribers = [];
    }
  }
};

// ✅ Interceptor to retry failed requests
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshToken(); // Wait for token refresh
        return axiosInstance(originalRequest); // Retry failed request
      } catch (refreshError) {
        console.error("Token refresh failed. Logging out...");
        window.location.href = "/auth/login"; // Redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

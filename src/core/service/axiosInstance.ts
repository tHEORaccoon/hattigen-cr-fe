import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL_LOCAL;

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

export default axiosInstance;

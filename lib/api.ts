import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // IMPORTANT: cookies are sent/received
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // optional global 401 handler (redirect or UI update)
    if (err.response?.status === 401) {
      // e.g., window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default api;

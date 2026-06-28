import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // send/receive the httpOnly auth cookie
});

// Attach the bearer token automatically (fallback for setups without cookies),
// so individual calls no longer need to hand-build Authorization headers.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On auth failure, clear stale session so the UI reflects logged-out state.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      const onAuthPage = ["/login", "/register"].includes(
        window.location.pathname,
      );
      if (!onAuthPage && localStorage.getItem("token")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    return Promise.reject(error);
  },
);

export default api;

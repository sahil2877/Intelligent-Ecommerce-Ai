import axios from "axios";

// Prefer the build-time env var. If it's missing, fall back by hostname so a
// forgotten VITE_API_URL on the deploy doesn't silently point at localhost.
const isLocalhost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const baseURL =
  import.meta.env.VITE_API_URL ||
  (isLocalhost
    ? "http://localhost:5000/api"
    : "https://intelligent-ecommerce-ai.onrender.com/api");

const api = axios.create({
  baseURL,
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

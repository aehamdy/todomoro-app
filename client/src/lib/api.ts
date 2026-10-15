import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // It tells the browser to include cookies in cross-origin requests and accept eligible cookies from responses
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

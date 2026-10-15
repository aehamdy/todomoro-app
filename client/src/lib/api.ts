import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true, // It tells the browser to include cookies in cross-origin requests and accept eligible cookies from responses
  headers: {
    "Content-Type": "application/json",
  },
});

const csrfApi = axios.create({
  baseURL,
  withCredentials: true,
});

let csrfToken: string | null = null;

async function getCsrfToken(): Promise<string> {
  if (!csrfToken) {
    const response = await csrfApi.get<{ csrfToken: string }>("/csrf");
    csrfToken = response.data.csrfToken;
  }

  return csrfToken;
}

api.interceptors.request.use(async (config) => {
  const method = config.method?.toLowerCase();
  const isStateChangingRequest = ["post", "put", "patch", "delete"].includes(
    method ?? "",
  );

  if (isStateChangingRequest) {
    config.headers.set("X-CSRF-Token", await getCsrfToken());
  }

  return config;
});

export function clearCsrfToken(): void {
  csrfToken = null;
}

export default api;

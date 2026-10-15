import api, { clearCsrfToken } from "../../lib/api";
import type {
  CurrentUserResponse,
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
} from "./auth.types";

export async function registerUser(
  data: RegisterData,
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/register", data);

  return response.data;
}

export async function loginUser(data: LoginData): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);

  return response.data;
}

export async function logoutUser(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } finally {
    clearCsrfToken();
  }
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const response = await api.get<CurrentUserResponse>("/auth/me");
  return response.data;
}

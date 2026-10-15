import api from "../../lib/api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface RegisterResponse {
  status: "success";
  data: {
    user: AuthUser;
  };
}

export async function registerUser(
  data: RegisterData,
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/register", data);

  return response.data;
}

import type { AuthUser } from "../features/auth/auth.types";

export type SettingsTab = "account" | "appearance" | "about";

export interface AuthResponse {
  status: string;
  data: {
    user: AuthUser;
  };
}

export type AuthQueryData = {
  data?: {
    user?: {
      name: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export interface UpdateAccountInput {
  name?: string;
  email?: string;
  currentPassword?: string;
}

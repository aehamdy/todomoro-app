export type ThemePreference =
  | "light"
  | "dark"
  | "ocean"
  | "midnight"
  | "ivory"
  | "lavender"
  | "system"
  | "sunset"
  | "emerald-dark"
  | "carbon"
  | "olive-amber"
  | "citrus-grove"
  | "desert-oasis";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: "success";
  data: {
    user: AuthUser;
  };
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
  createdAt: string;
}

export interface CsrfResponse {
  status: "success";
  csrfToken: string;
}

export interface LoginResponse {
  status: "success";
  data: {
    user: AuthUser;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CurrentUserResponse {
  status: "success";
  data: {
    user: AuthUser;
  };
}

export type UpdateAccountData = {
  name?: string;
  email?: string;
  currentPassword?: string;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};

export type UserPreferences = {
  theme: ThemePreference;
  taskCompletionSoundEnabled: boolean;
};

export type UpdatePreferencesResponse = {
  status: "success";
  data: {
    preferences: UserPreferences;
  };
};

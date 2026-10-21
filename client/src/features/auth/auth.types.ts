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

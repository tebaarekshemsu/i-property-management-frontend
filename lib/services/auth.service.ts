import { jwtDecode } from "jwt-decode";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type DecodedToken = {
  role: "user" | "admin" | "super-admin";
  exp?: number;
  iat?: number;
  [key: string]: unknown;
};

export interface SignupData {
  phone_no: string;
  name: string;
  password: string;
  invitation_code?: string;
  invited_by?: number;
}

export const authService = {
  async login(username: string, password: string) {
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const data = await res.json();

    if (!res.ok || !data.access_token) {
      throw new Error(data.detail || "Authentication failed");
    }

    return data.access_token;
  },

  async signup(signupData: SignupData) {
    const res = await fetch(`${API_BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    const data = await res.json();

    if (!res.ok || data.status !== "ok") {
      throw new Error(data.msg || "Signup failed");
    }

    return data;
  },

  decodeToken(token: string): DecodedToken {
    return jwtDecode<DecodedToken>(token);
  },
}; 
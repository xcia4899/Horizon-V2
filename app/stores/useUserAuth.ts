// /stores/auth.ts
import { defineStore } from "pinia";

export type UserRecord = {
  id: number;
  email: string;
  password: string;
  token: string;
  role?: "user" | "admin";
};

export interface LoginForm {
  email: string;
  password: string;
}
export interface RegisterForm {
  lastName: string;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthday?: string;
}
const USERS_KEY = "users";
const SESSION_USER_KEY = "currentUserId";
const SESSION_TOKEN_KEY = "msToken";

function loadUsers(): UserRecord[] {
  if (!import.meta.client) return [];
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as UserRecord[];
  } catch {
    return [];
  }
}

function saveUsers(users: UserRecord[]) {
  if (!import.meta.client) return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const useAuthStore = defineStore("auth", () => {
  const userId = ref<string | null>(null);
  const token = ref<string | null>(null);

  const initFromStorage = () => {
    if (!import.meta.client) return;
    userId.value = localStorage.getItem(SESSION_USER_KEY);
    token.value = localStorage.getItem(SESSION_TOKEN_KEY);
  };

  const login = async (form:LoginForm) => {
    if (!import.meta.client) throw new Error("client only");

    const email = String(form.email).trim().toLowerCase();
    const password = String(form.password);

    const users = loadUsers();
    if (!users.length) throw new Error("目前沒有任何註冊帳號");

    const user = users.find((u) => u.email.trim().toLowerCase() === email);
    if (!user || user.password !== password) throw new Error("帳號或密碼錯誤");

    const newToken = "token-" + (crypto.randomUUID?.() ?? String(Date.now()));
    user.token = newToken;
    saveUsers(users);

    localStorage.setItem(SESSION_USER_KEY, String(user.id));
    localStorage.setItem(SESSION_TOKEN_KEY, newToken);

    userId.value = String(user.id);
    token.value = newToken;

    return { userId: userId.value, token: token.value, role: user.role };
  };

  const logout = () => {
    if (!import.meta.client) return;
    localStorage.removeItem(SESSION_USER_KEY);
    localStorage.removeItem(SESSION_TOKEN_KEY);
    userId.value = null;
    token.value = null;
  };

  const register = async (form:RegisterForm) => {
    if (!import.meta.client) throw new Error("client only");

    // const lastName =
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    const users = loadUsers();
    if (users.some((u) => u.email.trim().toLowerCase() === email)) {
      throw new Error("此帳號已註冊");
    }

    const newUser: UserRecord = {
      id: Date.now(),
      email,
      password,
      token: "",
      role: "user",
    };

    users.push(newUser);
    saveUsers(users);

    return newUser;
  };

  return { userId, token, initFromStorage, login, logout, register };
});
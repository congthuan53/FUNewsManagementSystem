import { createContext, useContext, useState } from "react";
import { userService } from "../services";

const AuthContext = createContext(null);
const STORAGE_KEY = "fn_current_user";

function readStoredUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(readStoredUser);
  const [loginError, setLoginError] = useState("");

  function login(username, password) {
    if (!username.trim() || !password.trim()) {
      setLoginError("Username and password are required.");
      return false;
    }

    const user = userService
      .getAll()
      .find((u) => u.username === username && u.password === password);

    if (!user || user.status === 0) {
      setLoginError("Invalid username or password.");
      return false;
    }

    const { password: _pw, ...safeUser } = user;
    setCurrentUser(safeUser);
    setLoginError("");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    return true;
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loginError,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

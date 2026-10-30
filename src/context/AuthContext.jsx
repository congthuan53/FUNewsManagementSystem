// Author: Tran Cong Thuan | Date: 30/10/2026 | Assignment: Assignment 1
//
// Context này lưu thông tin "ai đang đăng nhập" (currentUser) và cho mọi
// trang con trong app dùng chung mà không cần truyền props qua nhiều cấp.
// Đây là mock authentication: không có token/JWT thật, chỉ so sánh
// username/password với danh sách user trong localStorage (xem userApi.js).

import { createContext, useContext, useState } from "react";
import { getUsers } from "../api/userApi";

const AuthContext = createContext(null);
const STORAGE_KEY = "fn_current_user";

// Đọc user đã đăng nhập từ lần trước (nếu có) để không bị mất login khi F5.
function readStoredUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }
  return JSON.parse(raw);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(readStoredUser());
  const [loginError, setLoginError] = useState("");

  function login(username, password) {
    // Bước 1: validate rỗng trước, chưa cần kiểm tra danh sách user.
    if (!username.trim() || !password.trim()) {
      setLoginError("Username and password are required.");
      return false;
    }

    // Bước 2: tìm trong danh sách user xem có ai username/password khớp không.
    const allUsers = getUsers();
    const matchedUser = allUsers.find(
      (user) => user.username === username && user.password === password
    );

    // Bước 3: không tìm thấy, hoặc tài khoản đang bị khóa (status = 0) -> báo lỗi.
    if (!matchedUser || matchedUser.status === 0) {
      setLoginError("Invalid username or password.");
      return false;
    }

    // Bước 4: đăng nhập thành công. Chỉ lưu lại thông tin cần hiển thị,
    // KHÔNG lưu password vào state/localStorage của phiên đăng nhập.
    const loggedInUser = {
      id: matchedUser.id,
      username: matchedUser.username,
      fullName: matchedUser.fullName,
      role: matchedUser.role,
      status: matchedUser.status,
    };

    setCurrentUser(loggedInUser);
    setLoginError("");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
    return true;
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const value = {
    currentUser,
    isAuthenticated: currentUser !== null,
    loginError,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook ngắn gọn để các component khác lấy thông tin đăng nhập ra dùng,
// ví dụ: const { currentUser, logout } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}

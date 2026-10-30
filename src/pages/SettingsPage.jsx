// Author: Tran Cong Thuan | Date: 30/10/2026 | Assignment: Assignment 1
//
// Trang Settings: cho phép user đang đăng nhập đổi tên hiển thị (fullName)
// của chính mình. Đây là 1 ví dụ Update đơn giản, chỉ có 1 field.

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUser } from "../api/userApi";

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    updateUser(currentUser.id, { fullName: fullName.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h2 className="page-title">Settings</h2>
      <form className="settings-form" onSubmit={handleSave}>
        <label htmlFor="settings-username">Username</label>
        <input id="settings-username" type="text" value={currentUser.username} disabled />

        <label htmlFor="settings-fullname">Full name</label>
        <input
          id="settings-fullname"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label htmlFor="settings-role">Role</label>
        <input
          id="settings-role"
          type="text"
          value={currentUser.role === 1 ? "Admin" : "Staff"}
          disabled
        />

        {saved && <div className="form-success">Profile updated.</div>}

        <button type="submit" className="btn btn-primary">
          Save changes
        </button>
      </form>
    </div>
  );
}

// Author: Tran Cong Thuan | Date: 30/10/2026 | Assignment: Assignment 1
//
// Popup form Create/Update cho User. Có thêm 2 việc riêng so với
// Category/News: (1) kiểm tra username không được trùng với user khác,
// (2) khi Update mà để trống ô password thì giữ nguyên password cũ.

import { useState } from "react";
import Modal from "../../components/Modal";

const emptyForm = { username: "", password: "", fullName: "", role: 2, status: 1 };

export default function UserFormDialog({ mode, initialData, existingUsers, onClose, onSubmit }) {
  const [form, setForm] = useState(initialData ? { ...initialData } : emptyForm);
  const [error, setError] = useState("");

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.username.trim() || !form.fullName.trim()) {
      setError("Username and full name are required.");
      return;
    }
    if (mode === "create" && !form.password.trim()) {
      setError("Password is required for a new account.");
      return;
    }

    // Kiểm tra trùng username: lấy id của user đang sửa (nếu đang Update)
    // để loại chính nó ra khi so sánh, tránh báo trùng với chính nó.
    let editingUserId = null;
    if (initialData) {
      editingUserId = initialData.id;
    }

    const isDuplicate = existingUsers.some(
      (user) => user.username === form.username.trim() && user.id !== editingUserId
    );
    if (isDuplicate) {
      setError("This username already exists.");
      return;
    }

    // Password: nếu người dùng có nhập thì lấy giá trị mới;
    // nếu để trống khi Update thì giữ nguyên password cũ.
    let passwordToSave = form.password.trim();
    if (!passwordToSave && initialData) {
      passwordToSave = initialData.password;
    }

    onSubmit({
      username: form.username.trim(),
      password: passwordToSave,
      fullName: form.fullName.trim(),
      role: Number(form.role),
      status: Number(form.status),
    });
  }

  return (
    <Modal title={mode === "create" ? "Add User" : "Edit User"} onClose={onClose} width="480px">
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-username">Username</label>
        <input
          id="user-username"
          type="text"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />

        <label htmlFor="user-fullname">Full name</label>
        <input
          id="user-fullname"
          type="text"
          value={form.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />

        <label htmlFor="user-password">
          Password {mode === "update" && <span className="hint">(leave blank to keep current)</span>}
        </label>
        <input
          id="user-password"
          type="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <label htmlFor="user-role">Role</label>
        <select id="user-role" value={form.role} onChange={(e) => handleChange("role", e.target.value)}>
          <option value={1}>Admin</option>
          <option value={2}>Staff</option>
        </select>

        <label htmlFor="user-status">Status</label>
        <select
          id="user-status"
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>

        {error && <div className="form-error">{error}</div>}

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {mode === "create" ? "Create" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

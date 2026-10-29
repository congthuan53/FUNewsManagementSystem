// Author: Tran Cong Thuan | Date: 29/10/2026 | Assignment: Assignment 1

import { useState } from "react";
import Modal from "../../components/Modal";

const emptyForm = { name: "", status: 1 };

export default function CategoryFormDialog({ mode, initialData, onClose, onSubmit }) {
  const [form, setForm] = useState(initialData ? { ...initialData } : emptyForm);
  const [error, setError] = useState("");

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Category name is required.");
      return;
    }
    onSubmit({ name: form.name.trim(), status: Number(form.status) });
  }

  return (
    <Modal
      title={mode === "create" ? "Add Category" : "Edit Category"}
      onClose={onClose}
      width="480px"
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="cat-name">Name</label>
        <input
          id="cat-name"
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <label htmlFor="cat-status">Status</label>
        <select
          id="cat-status"
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

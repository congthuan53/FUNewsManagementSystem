import { useState } from "react";
import Modal from "../../components/Modal";

function emptyForm(categories) {
  return {
    title: "",
    content: "",
    categoryId: categories[0]?.id ?? "",
    status: 1,
    tags: "",
  };
}

export default function NewsFormDialog({ mode, initialData, categories, currentUser, onClose, onSubmit }) {
  const [form, setForm] = useState(initialData ? { ...initialData } : emptyForm(categories));
  const [error, setError] = useState("");

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!form.categoryId) {
      setError("Please select a category.");
      return;
    }

    onSubmit({
      title: form.title.trim(),
      content: form.content.trim(),
      categoryId: Number(form.categoryId),
      status: Number(form.status),
      tags: form.tags.trim(),
      createdBy: initialData?.createdBy || currentUser?.username || "Admin",
    });
  }

  return (
    <Modal title={mode === "create" ? "Add News" : "Edit News"} onClose={onClose} width="560px">
      <form onSubmit={handleSubmit}>
        <label htmlFor="news-title">Title</label>
        <input
          id="news-title"
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <label htmlFor="news-content">Content</label>
        <textarea
          id="news-content"
          rows={4}
          value={form.content}
          onChange={(e) => handleChange("content", e.target.value)}
        />

        <label htmlFor="news-category">Category</label>
        <select
          id="news-category"
          value={form.categoryId}
          onChange={(e) => handleChange("categoryId", e.target.value)}
        >
          {categories.length === 0 && <option value="">No category available</option>}
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label htmlFor="news-tags">Tags</label>
        <input
          id="news-tags"
          type="text"
          placeholder="comma, separated, tags"
          value={form.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
        />

        <label htmlFor="news-status">Status</label>
        <select
          id="news-status"
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

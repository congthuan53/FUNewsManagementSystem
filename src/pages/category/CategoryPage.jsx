import { useEffect, useState } from "react";
import { categoryService } from "../../services";
import SearchBar from "../../components/SearchBar";
import StatusBadge from "../../components/StatusBadge";
import ConfirmDialog from "../../components/ConfirmDialog";
import CategoryFormDialog from "./CategoryFormDialog";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [dialogMode, setDialogMode] = useState(null); // 'create' | 'update' | null
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    setCategories(categoryService.getAll());
  }, []);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  function openCreate() {
    setSelected(null);
    setDialogMode("create");
  }

  function openEdit(category) {
    setSelected(category);
    setDialogMode("update");
  }

  function closeDialog() {
    setDialogMode(null);
    setSelected(null);
  }

  function handleSubmit(data) {
    if (dialogMode === "create") {
      const { items } = categoryService.create(data);
      setCategories(items);
    } else if (dialogMode === "update" && selected) {
      const items = categoryService.update(selected.id, data);
      setCategories(items);
    }
    closeDialog();
  }

  function handleDeleteConfirm() {
    const items = categoryService.remove(deleting.id);
    setCategories(items);
    setDeleting(null);
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Category Management</h2>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Add Category
        </button>
      </div>

      <SearchBar value={keyword} onChange={setKeyword} placeholder="Search by name..." />

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={4} className="empty-state">
                No categories found.
              </td>
            </tr>
          ) : (
            filtered.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <StatusBadge status={category.status} />
                </td>
                <td className="actions-cell">
                  <button type="button" className="btn btn-small" onClick={() => openEdit(category)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-small btn-danger"
                    onClick={() => setDeleting(category)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {dialogMode && (
        <CategoryFormDialog
          mode={dialogMode}
          initialData={selected}
          onClose={closeDialog}
          onSubmit={handleSubmit}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete Category"
          message={`Are you sure you want to delete "${deleting.name}"?`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { newsService, categoryService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import SearchBar from "../../components/SearchBar";
import StatusBadge from "../../components/StatusBadge";
import ConfirmDialog from "../../components/ConfirmDialog";
import NewsFormDialog from "./NewsFormDialog";

export default function NewsPage() {
  const { currentUser } = useAuth();
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [dialogMode, setDialogMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    setNews(newsService.getAll());
    setCategories(categoryService.getAll());
  }, []);

  function categoryName(categoryId) {
    return categories.find((c) => c.id === categoryId)?.name || "Unknown";
  }

  const filtered = news.filter((n) =>
    n.title.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  function openCreate() {
    setSelected(null);
    setDialogMode("create");
  }

  function openEdit(article) {
    setSelected(article);
    setDialogMode("update");
  }

  function closeDialog() {
    setDialogMode(null);
    setSelected(null);
  }

  function handleSubmit(data) {
    if (dialogMode === "create") {
      const { items } = newsService.create(data);
      setNews(items);
    } else if (dialogMode === "update" && selected) {
      const items = newsService.update(selected.id, data);
      setNews(items);
    }
    closeDialog();
  }

  function handleDeleteConfirm() {
    const items = newsService.remove(deleting.id);
    setNews(items);
    setDeleting(null);
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">News Management</h2>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Add News
        </button>
      </div>

      <SearchBar value={keyword} onChange={setKeyword} placeholder="Search by title..." />

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-state">
                No news found.
              </td>
            </tr>
          ) : (
            filtered.map((article) => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td>{categoryName(article.categoryId)}</td>
                <td>{article.createdBy}</td>
                <td>
                  <StatusBadge status={article.status} />
                </td>
                <td className="actions-cell">
                  <button type="button" className="btn btn-small" onClick={() => openEdit(article)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-small btn-danger"
                    onClick={() => setDeleting(article)}
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
        <NewsFormDialog
          mode={dialogMode}
          initialData={selected}
          categories={categories}
          currentUser={currentUser}
          onClose={closeDialog}
          onSubmit={handleSubmit}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete News"
          message={`Are you sure you want to delete "${deleting.title}"?`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}

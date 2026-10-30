// Author: Tran Cong Thuan | Date: 30/10/2026 | Assignment: Assignment 1
//
// Trang quản lý Category: hiển thị danh sách, tìm kiếm theo tên,
// thêm/sửa qua popup dialog, xóa có xác nhận.

import { useEffect, useState } from "react";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../../api/categoryApi";
import SearchBar from "../../components/SearchBar";
import StatusBadge from "../../components/StatusBadge";
import ConfirmDialog from "../../components/ConfirmDialog";
import CategoryFormDialog from "./CategoryFormDialog";

export default function CategoryPage() {
  // Danh sách category đang hiển thị trên bảng.
  const [categories, setCategories] = useState([]);

  // Từ khóa đang nhập trong ô Search.
  const [keyword, setKeyword] = useState("");

  // dialogMode quyết định popup nào đang mở: "create", "update" hoặc null (đóng).
  const [dialogMode, setDialogMode] = useState(null);

  // Category đang được chọn để sửa (dùng khi dialogMode = "update").
  const [selected, setSelected] = useState(null);

  // Category đang được chọn để xóa (khác null thì hiện popup xác nhận xóa).
  const [deleting, setDeleting] = useState(null);

  // Khi trang vừa mở ra lần đầu -> load dữ liệu category từ localStorage.
  useEffect(() => {
    const data = getCategories();
    setCategories(data);
  }, []);

  // Danh sách sau khi lọc theo từ khóa tìm kiếm.
  // Lưu ý: "categories" (dữ liệu gốc) không bị thay đổi, chỉ lọc ra để hiển thị.
  const filtered = categories.filter((category) =>
    category.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  // Bấm nút "+ Add Category" -> mở popup ở chế độ tạo mới.
  function openCreate() {
    setSelected(null);
    setDialogMode("create");
  }

  // Bấm nút "Edit" trên 1 dòng -> mở popup ở chế độ sửa, có sẵn dữ liệu cũ.
  function openEdit(category) {
    setSelected(category);
    setDialogMode("update");
  }

  // Đóng popup create/update.
  function closeDialog() {
    setDialogMode(null);
    setSelected(null);
  }

  // Khi bấm "Create" hoặc "Save" trong popup, dialog sẽ gọi hàm này
  // kèm theo dữ liệu form đã nhập.
  function handleSubmit(formData) {
    if (dialogMode === "create") {
      const updatedList = addCategory(formData);
      setCategories(updatedList);
    } else if (dialogMode === "update") {
      const updatedList = updateCategory(selected.id, formData);
      setCategories(updatedList);
    }
    closeDialog();
  }

  // Bấm "Delete" trong popup xác nhận -> xóa thật.
  function handleDeleteConfirm() {
    const updatedList = deleteCategory(deleting.id);
    setCategories(updatedList);
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

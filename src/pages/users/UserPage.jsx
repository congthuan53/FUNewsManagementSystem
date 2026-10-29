import { useEffect, useState } from "react";
import { userService } from "../../services";
import SearchBar from "../../components/SearchBar";
import StatusBadge from "../../components/StatusBadge";
import ConfirmDialog from "../../components/ConfirmDialog";
import UserFormDialog from "./UserFormDialog";

const roleLabel = { 1: "Admin", 2: "Staff" };

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [dialogMode, setDialogMode] = useState(null);
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    setUsers(userService.getAll());
  }, []);

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  function openCreate() {
    setSelected(null);
    setDialogMode("create");
  }

  function openEdit(user) {
    setSelected(user);
    setDialogMode("update");
  }

  function closeDialog() {
    setDialogMode(null);
    setSelected(null);
  }

  function handleSubmit(data) {
    if (dialogMode === "create") {
      const { items } = userService.create(data);
      setUsers(items);
    } else if (dialogMode === "update" && selected) {
      const items = userService.update(selected.id, data);
      setUsers(items);
    }
    closeDialog();
  }

  function handleDeleteConfirm() {
    const items = userService.remove(deleting.id);
    setUsers(items);
    setDeleting(null);
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">User Management</h2>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Add User
        </button>
      </div>

      <SearchBar value={keyword} onChange={setKeyword} placeholder="Search by username..." />

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-state">
                No users found.
              </td>
            </tr>
          ) : (
            filtered.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{roleLabel[user.role] || user.role}</td>
                <td>
                  <StatusBadge status={user.status} />
                </td>
                <td className="actions-cell">
                  <button type="button" className="btn btn-small" onClick={() => openEdit(user)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-small btn-danger"
                    onClick={() => setDeleting(user)}
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
        <UserFormDialog
          mode={dialogMode}
          initialData={selected}
          existingUsers={users}
          onClose={closeDialog}
          onSubmit={handleSubmit}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete User"
          message={`Are you sure you want to delete "${deleting.username}"?`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}

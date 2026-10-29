// Author: Tran Cong Thuan | Date: 29/10/2026 | Assignment: Assignment 1

export default function StatusBadge({ status }) {
  const isActive = Number(status) === 1;
  return (
    <span className={`badge ${isActive ? "badge-active" : "badge-inactive"}`}>
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

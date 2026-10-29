export default function StatusBadge({ status }) {
  const isActive = Number(status) === 1;
  return (
    <span className={`badge ${isActive ? "badge-active" : "badge-inactive"}`}>
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

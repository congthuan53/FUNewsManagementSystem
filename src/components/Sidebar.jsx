import { NavLink } from "react-router-dom";

const menuItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/categories", label: "Category" },
  { to: "/admin/news", label: "News" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/settings", label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? "menu-link active" : "menu-link")}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

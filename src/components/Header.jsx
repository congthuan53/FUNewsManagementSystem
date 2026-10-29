import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="app-header">
      <div className="app-header-brand">
        <img src={logo} alt="FU News logo" className="app-logo" />
        <span>FU News Management System</span>
      </div>
      <div className="app-header-user">
        <span className="current-user">
          {currentUser?.fullName || currentUser?.username}
        </span>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

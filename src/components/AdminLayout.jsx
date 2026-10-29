// Author: Tran Cong Thuan | Date: 29/10/2026 | Assignment: Assignment 1

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Header />
      <div className="admin-body">
        <Sidebar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

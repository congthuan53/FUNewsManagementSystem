// Author: Tran Cong Thuan | Date: 29/10/2026 | Assignment: Assignment 1

import { useEffect, useState } from "react";
import { categoryService, newsService, userService } from "../services";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    categories: 0,
    activeCategories: 0,
    news: 0,
    activeNews: 0,
    users: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    const categories = categoryService.getAll();
    const news = newsService.getAll();
    const users = userService.getAll();

    setStats({
      categories: categories.length,
      activeCategories: categories.filter((c) => c.status === 1).length,
      news: news.length,
      activeNews: news.filter((n) => n.status === 1).length,
      users: users.length,
      activeUsers: users.filter((u) => u.status === 1).length,
    });
  }, []);

  const cards = [
    { label: "Categories", total: stats.categories, active: stats.activeCategories },
    { label: "News articles", total: stats.news, active: stats.activeNews },
    { label: "User accounts", total: stats.users, active: stats.activeUsers },
  ];

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      <div className="dashboard-grid">
        {cards.map((card) => (
          <div key={card.label} className="dashboard-card">
            <h3>{card.label}</h3>
            <p className="dashboard-total">{card.total}</p>
            <p className="dashboard-sub">{card.active} active</p>
          </div>
        ))}
      </div>
    </div>
  );
}

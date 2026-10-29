// Author: Tran Cong Thuan | Date: 29/10/2026 | Assignment: Assignment 1

// Lớp lưu trữ mỏng trên localStorage. Mỗi entity (category/news/user) có 1 key riêng.
// Nếu localStorage chưa có dữ liệu (lần chạy đầu tiên) thì hydrate từ seed data.

export function loadCollection(key, seed) {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(seed));
    return [...seed];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("not an array");
    return parsed;
  } catch {
    // Dữ liệu trong localStorage bị hỏng -> reset lại từ seed
    localStorage.setItem(key, JSON.stringify(seed));
    return [...seed];
  }
}

export function saveCollection(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

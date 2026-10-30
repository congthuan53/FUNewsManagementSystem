// Author: Tran Cong Thuan | Date: 30/10/2026 | Assignment: Assignment 1

// Dữ liệu mock ban đầu. Chỉ được dùng để nạp vào localStorage lần đầu tiên,
// sau đó mọi CRUD sẽ thao tác trên localStorage (xem src/api/*).

export const seedCategories = [
  { id: 1, name: "Education", status: 1 },
  { id: 2, name: "Sports", status: 1 },
  { id: 3, name: "Technology", status: 1 },
  { id: 4, name: "Events", status: 0 },
];

export const seedNews = [
  {
    id: 1,
    title: "FPT University opens new semester",
    content: "FPT University officially started the new semester with over 2000 new students.",
    categoryId: 1,
    createdBy: "Admin",
    status: 1,
    tags: "university, semester",
  },
  {
    id: 2,
    title: "Campus football tournament kicks off",
    content: "The annual inter-class football tournament has started this week.",
    categoryId: 2,
    createdBy: "Admin",
    status: 1,
    tags: "sports, football",
  },
  {
    id: 3,
    title: "AI workshop for students",
    content: "A hands-on workshop about applying AI in software projects.",
    categoryId: 3,
    createdBy: "Admin",
    status: 0,
    tags: "ai, workshop",
  },
];

export const seedUsers = [
  { id: 1, username: "Admin", password: "Admin", fullName: "System Admin", role: 1, status: 1 },
  { id: 2, username: "staff01", password: "staff123", fullName: "Nguyen Van Staff", role: 2, status: 1 },
  { id: 3, username: "staff02", password: "staff123", fullName: "Tran Thi Bien Tap", role: 2, status: 0 },
];

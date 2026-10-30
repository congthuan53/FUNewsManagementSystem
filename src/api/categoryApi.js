// Author: Tran Cong Thuan | Date: 30/10/2026 | Assignment: Assignment 1
//
// File này quản lý dữ liệu Category (thể loại tin tức).
// Đề bài không bắt buộc backend thật, nên ở đây dùng localStorage của trình
// duyệt để giả lập 1 "database" đơn giản. Mỗi hàm bên dưới làm đúng 1 việc,
// giống hệt các thao tác CRUD: Get - Add - Update - Delete.

import { seedCategories } from "../data/seedData";

const STORAGE_KEY = "fn_categories";

// Đọc toàn bộ danh sách category.
// Nếu đây là lần chạy đầu tiên (localStorage chưa có gì) thì lấy dữ liệu mẫu
// trong seedData.js rồi lưu vào localStorage luôn, để lần sau đọc lại vẫn còn.
export function getCategories() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedCategories));
    return seedCategories;
  }

  return JSON.parse(raw);
}

// Ghi đè toàn bộ danh sách category xuống localStorage.
// Hàm này không export ra ngoài, chỉ 3 hàm add/update/delete bên dưới gọi tới.
function saveCategories(categoryList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categoryList));
}

// Thêm 1 category mới vào danh sách.
// id mới = id lớn nhất hiện có + 1 (để không bị trùng id với category cũ).
export function addCategory(newCategoryData) {
  const categoryList = getCategories();

  let maxId = 0;
  for (const category of categoryList) {
    if (category.id > maxId) {
      maxId = category.id;
    }
  }

  const newCategory = { ...newCategoryData, id: maxId + 1 };
  const updatedList = [...categoryList, newCategory];

  saveCategories(updatedList);
  return updatedList;
}

// Cập nhật 1 category theo id.
// Dùng map() để tạo mảng MỚI: category nào trùng id thì thay dữ liệu mới,
// category nào không trùng thì giữ nguyên. Không sửa trực tiếp lên mảng cũ.
export function updateCategory(categoryId, newData) {
  const categoryList = getCategories();

  const updatedList = categoryList.map((category) => {
    if (category.id === categoryId) {
      return { ...category, ...newData };
    }
    return category;
  });

  saveCategories(updatedList);
  return updatedList;
}

// Xóa 1 category theo id.
// Dùng filter() để tạo mảng MỚI chỉ gồm những category có id khác id cần xóa.
export function deleteCategory(categoryId) {
  const categoryList = getCategories();
  const updatedList = categoryList.filter((category) => category.id !== categoryId);

  saveCategories(updatedList);
  return updatedList;
}

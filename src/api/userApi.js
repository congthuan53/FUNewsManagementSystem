// Author: Tran Cong Thuan | Date: 30/10/2026 | Assignment: Assignment 1
//
// File này quản lý dữ liệu User/Account. Cùng cách làm với categoryApi.js
// và newsApi.js: lưu trong localStorage, 4 hàm get/add/update/delete.
// role: 1 = Admin, 2 = Staff. status: 1 = active, 0 = inactive.

import { seedUsers } from "../data/seedData";

const STORAGE_KEY = "fn_users";

export function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedUsers));
    return seedUsers;
  }

  return JSON.parse(raw);
}

function saveUsers(userList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userList));
}

export function addUser(newUserData) {
  const userList = getUsers();

  let maxId = 0;
  for (const user of userList) {
    if (user.id > maxId) {
      maxId = user.id;
    }
  }

  const newUser = { ...newUserData, id: maxId + 1 };
  const updatedList = [...userList, newUser];

  saveUsers(updatedList);
  return updatedList;
}

export function updateUser(userId, newData) {
  const userList = getUsers();

  const updatedList = userList.map((user) => {
    if (user.id === userId) {
      return { ...user, ...newData };
    }
    return user;
  });

  saveUsers(updatedList);
  return updatedList;
}

export function deleteUser(userId) {
  const userList = getUsers();
  const updatedList = userList.filter((user) => user.id !== userId);

  saveUsers(updatedList);
  return updatedList;
}

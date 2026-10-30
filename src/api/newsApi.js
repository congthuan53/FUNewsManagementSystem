// Author: Tran Cong Thuan | Date: 30/10/2026 | Assignment: Assignment 1
//
// File này quản lý dữ liệu News (tin tức). Cùng cách làm với categoryApi.js:
// lưu trong localStorage, 4 hàm get/add/update/delete rõ ràng, không giấu
// logic ở lớp trung gian nào khác. Mỗi News có 1 field "categoryId" trỏ tới
// id của 1 Category, đó là mối quan hệ (relation) giữa News và Category.

import { seedNews } from "../data/seedData";

const STORAGE_KEY = "fn_news";

export function getNews() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedNews));
    return seedNews;
  }

  return JSON.parse(raw);
}

function saveNews(newsList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newsList));
}

export function addNews(newArticleData) {
  const newsList = getNews();

  let maxId = 0;
  for (const article of newsList) {
    if (article.id > maxId) {
      maxId = article.id;
    }
  }

  const newArticle = { ...newArticleData, id: maxId + 1 };
  const updatedList = [...newsList, newArticle];

  saveNews(updatedList);
  return updatedList;
}

export function updateNews(newsId, newData) {
  const newsList = getNews();

  const updatedList = newsList.map((article) => {
    if (article.id === newsId) {
      return { ...article, ...newData };
    }
    return article;
  });

  saveNews(updatedList);
  return updatedList;
}

export function deleteNews(newsId) {
  const newsList = getNews();
  const updatedList = newsList.filter((article) => article.id !== newsId);

  saveNews(updatedList);
  return updatedList;
}

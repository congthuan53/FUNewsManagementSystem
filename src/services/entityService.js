// Author: Tran Cong Thuan | Date: 29/10/2026 | Assignment: Assignment 1

import { loadCollection, saveCollection } from "./storage";

// Tạo 1 service CRUD đơn giản cho 1 entity, lưu trên localStorage.
// Mọi thao tác đều trả về mảng MỚI (immutable), không mutate trực tiếp mảng cũ.
export function createEntityService(storageKey, seed) {
  function getAll() {
    return loadCollection(storageKey, seed);
  }

  function nextId(items) {
    return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }

  function create(data) {
    const items = getAll();
    const newItem = { ...data, id: nextId(items) };
    const updated = [...items, newItem];
    saveCollection(storageKey, updated);
    return { items: updated, item: newItem };
  }

  function update(id, data) {
    const items = getAll();
    const updated = items.map((item) =>
      item.id === id ? { ...item, ...data, id } : item
    );
    saveCollection(storageKey, updated);
    return updated;
  }

  function remove(id) {
    const items = getAll();
    const updated = items.filter((item) => item.id !== id);
    saveCollection(storageKey, updated);
    return updated;
  }

  return { getAll, create, update, remove };
}

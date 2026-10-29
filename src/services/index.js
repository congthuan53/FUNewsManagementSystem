// Author: Tran Cong Thuan | Date: 29/10/2026 | Assignment: Assignment 1

import { createEntityService } from "./entityService";
import { seedCategories, seedNews, seedUsers } from "../data/seedData";

export const categoryService = createEntityService("fn_categories", seedCategories);
export const newsService = createEntityService("fn_news", seedNews);
export const userService = createEntityService("fn_users", seedUsers);

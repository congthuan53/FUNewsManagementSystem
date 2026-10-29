# ThuanTC_SE1910 — FU News Management System (Assignment 01)

Admin frontend for **FUNewsManagementSystem**, built with **ReactJS + Vite**.
This is Assignment 01 of SBA301 — "Working with ReactJS application". Only the
ReactJS frontend is implemented; there is no real backend/database, as allowed
by the assignment (mock data persisted in `localStorage`).

## Getting started
Link github: https://github.com/congthuan53/FUNewsManagementSystem

## Tech stack

- React 19 + Vite
- React Router (client-side navigation, protected admin routes)
- Plain CSS (no UI framework) — see `src/index.css`
- Mock data layer on top of `localStorage` (see `src/services`)

## Getting started

```bash
cd ThuanTC_SE1910
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Test account

| Username | Password | Role  |
|----------|----------|-------|
| Admin    | Admin    | Admin |

Two extra staff accounts are seeded for reference (`staff01` / `staff123`,
`staff02` / `staff123`, the latter inactive) but only Admin is required by
the assignment.

## Features implemented

- **Login** with mock authentication (`Admin` / `Admin`), empty/invalid
  credential validation, and protected admin routes (redirect to `/login`
  when not authenticated).
- **Header + Admin layout** with an AI-assisted logo (`src/assets/logo.svg`)
  and the signed-in user's name + logout button.
- **Sidebar menu**: Dashboard, Category, News, Users, Settings — built with
  React Router (`NavLink`), highlighting the active page.
- **Dashboard**: simple counters (total/active) for categories, news and
  users.
- **Category management**: CRUD + search by name, create/update via popup
  dialog, delete with confirmation dialog.
- **News management**: CRUD + search by title, linked to a `Category` via
  `categoryId`, tags field, create/update via popup dialog, delete with
  confirmation dialog.
- **User management**: CRUD + search by username, role (`Admin` = 1,
  `Staff` = 2), unique-username validation, create/update via popup dialog,
  delete with confirmation.
- **Settings**: lets the signed-in user update their own full name.
- All list/search/CRUD screens show an empty/no-result state and never
  mutate state arrays directly (immutable create/update/delete).
- Mock data is persisted in `localStorage` so it survives a page reload;
  first run seeds default data automatically (see `src/data/seedData.js`).

## Data model (mock)

- **Category**: `id, name, status` (`status`: 1 = active, 0 = inactive)
- **News**: `id, title, content, categoryId, createdBy, status, tags`
- **User/Account**: `id, username, password, fullName, role, status`
  (`role`: 1 = Admin, 2 = Staff)

## Project structure

```
src/
  assets/        logo.svg
  components/    Header, Sidebar, AdminLayout, Modal, ConfirmDialog, ...
  context/       AuthContext (mock login/logout, currentUser)
  data/          seedData.js (initial mock data)
  services/      localStorage-backed CRUD services per entity
  pages/
    LoginPage.jsx
    DashboardPage.jsx
    SettingsPage.jsx
    category/    CategoryPage.jsx, CategoryFormDialog.jsx
    news/        NewsPage.jsx, NewsFormDialog.jsx
    users/       UserPage.jsx, UserFormDialog.jsx
```

## Known limitations

- No real backend/database/JWT — this matches the assignment's scope
  (Spring Boot/database are explicitly not required for Assignment 01).
- No role-based UI restriction yet (Staff currently sees the same menu as
  Admin) — left as a Transfer/Modification exercise per the assignment
  guide.
- No pagination/sorting on the management tables.

## AI usage

An AI assistant was used during development for scaffolding support: setting
up the initial project/folder structure, drafting the CRUD/service layer and
some UI components, and suggesting the logo in `src/assets/logo.svg`. Every
suggestion was reviewed, adjusted and tested manually (login flow,
create/update/delete, search, auth guard) before being kept — nothing was
committed without understanding and verifying it first.

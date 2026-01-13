# 🛒 Onur A.S. E-Commerce Store

A modern, high-performance e-commerce frontend built with **React**, **Redux Toolkit**, and **Vite**. This project features a full testing suite using **Vitest** and **React Testing Library**, covering everything from state management to UI interactions.

---

## 🚀 Key Features

* **Global State Management:** Centralized store using Redux Toolkit for products, cart, and app-wide UI states.
* **Dynamic Product Catalog:** Real-time search filtering and category-based navigation.
* **Advanced Cart Logic:** Persistent cart drawer with quantity adjustments and automatic total calculations.
* **Theme Switching:** Integrated Light and Dark mode toggle.
* **Responsive Routing:** Clean URL structures using `react-router-dom`.
* **Robust Testing:** 100% logic coverage for slices and comprehensive component-level integration tests.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React (Vite)** | Frontend Framework |
| **Redux Toolkit** | State Management |
| **Vitest** | Unit & Integration Testing |
| **React Testing Library** | Component Testing |
| **Material UI** | UI Components (Drawer, Badge) |
| **React Icons** | Visual Iconography |

---

## 📂 Project Structure

```text
src/
├── components/         # Reusable UI (Header, Product, Loading, etc.)
├── config/             # Router and App configurations
├── css/                # Component-specific stylesheets
├── pages/              # Main view containers (Home)
├── redux/              # Store setup and feature slices
│   └── slices/         # Logic for Cart, Products, and App states
└── tests/              # Full Vitest suite
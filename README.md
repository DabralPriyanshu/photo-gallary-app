<img width="1920" height="1080" alt="Screenshot (42)" src="https://github.com/user-attachments/assets/eef01e32-fe74-47bb-8ee6-81d0fc54131a" />
# 📸 Photo Gallery Web App

A high-performance, responsive React application built as a part of the Frontend Intern Pre-Screening Assignment for **Celebrare**. The app fetches images from the Picsum API, allows real-time filtering by author, and manages a persistent "Favorites" list.


## ✨ Features
- **Custom Data Fetching:** Implemented a custom hook `useFetchPhotos` for clean API logic.
- **Responsive Grid:** Fully responsive layout (Desktop: 4 cols, Tablet: 2 cols, Mobile: 1 col) using Tailwind CSS.
- **Real-time Search:** Optimized search filter that updates as you type without API recalls.
- **Favorites Management:** Powered by `useReducer` for robust state handling.
- **Data Persistence:** Favorites are saved in `localStorage` and persist after page refresh.
- **Performance Optimized:** Utilized `useMemo` and `useCallback` to prevent unnecessary re-renders.

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS
- **State Management:** `useReducer` & `useState`
- **Performance:** `useMemo`, `useCallback`, `Lazy Loading`
- **API:** [Picsum Photos API](https://picsum.photos/)


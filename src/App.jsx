import React, { useReducer, useState, useCallback, useMemo } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos";

const initialState = JSON.parse(localStorage.getItem("favorites")) || [];

function favoritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE": {
      const isExist = state.find((id) => id === action.payload);
      const newState = isExist
        ? state.filter((id) => id !== action.payload)
        : [...state, action.payload];
      localStorage.setItem("favorites", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}
function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [favorites, dispatch] = useReducer(favoritesReducer, initialState);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [photos, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Photo Gallery
        </h1>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by author name..."
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium animate-pulse">
              Fetching photos...
            </p>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 bg-red-10 p-4 rounded-md border border-red-200">
            Error: {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={`${photo.download_url.split("/id/")[0]}/id/${photo.id}/400/300`}
                alt={photo.author}
                className="w-full h-48 object-cover bg-gray-200"
                loading="lazy"
              />
              <div className="p-4 flex justify-between items-center">
                <p className="font-medium text-gray-700 truncate mr-2">
                  {photo.author}
                </p>

                <button
                  onClick={() =>
                    dispatch({ type: "TOGGLE_FAVORITE", payload: photo.id })
                  }
                  className="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={favorites.includes(photo.id) ? "red" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke={
                      favorites.includes(photo.id) ? "red" : "currentColor"
                    }
                    className="w-6 h-6 transition-colors duration-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && filteredPhotos.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No photos found for "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import FavoritesContext from "./contexts/favoritesContext";

import "./App.css";

function App() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const router = useRoutes(routes);
  const { pathname } = useLocation();

  useEffect(() => {
    getFavoriteMovies();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  function getFavoriteMovies () {
    const localStorageData = JSON.parse(
      localStorage.getItem("favorite-movies")
    );

    if (localStorageData) {
      setFavoriteMovies(localStorageData);
    } else {
      setFavoriteMovies([]);
    }
  };

  function updateFavoriteMovies (allFavoriteMovies) {
    localStorage.setItem("favorite-movies", JSON.stringify(allFavoriteMovies));
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoriteMovies,
        getFavoriteMovies,
        updateFavoriteMovies,
      }}
    >
      {router}
    </FavoritesContext.Provider>
  );
}

export default App;

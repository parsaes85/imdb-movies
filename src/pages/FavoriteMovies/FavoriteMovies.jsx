import React, { useState, useContext } from "react";

import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import FavoritesContext from "../../contexts/favoritesContext";
import MovieBox from "../../components/MovieBox/MovieBox";
import Alert from "../../components/Alert/Alert";

export default function FavoriteMovies() {
  const [isSidebarShow, setIsSidebarShow] = useState(false);

  const { favoriteMovies, getFavoriteMovies, updateFavoriteMovies } =
    useContext(FavoritesContext);

  const removeFromFavorites = (movieID) => {
    const mainMovie = favoriteMovies.find((movie) => movie.id === movieID);
    const newFavoriteMovies = favoriteMovies.filter(
      (movie) => movie.id !== mainMovie.id
    );

    updateFavoriteMovies(newFavoriteMovies);
    getFavoriteMovies();
  };

  return (
    <>
      <Topbar
        isSidebarShow={isSidebarShow}
        setIsSidebarShow={setIsSidebarShow}
        isShowSidebarBtn={true}
        isShowSearchInput={false}
        isShowBackBtn={true}
        hasBackgroundColor={true}
      />
      <Sidebar
        isSidebarShow={isSidebarShow}
        setIsSidebarShow={setIsSidebarShow}
      />

      <main className="px-5 mt-24">
        <h1 className="genre-title text-mainTextColor text-2xl md:text-4xl my-4 md:my-7">
          Favorites
        </h1>
        {favoriteMovies.length ? (
          <div className="genre-movie-container container mx-auto">
            {favoriteMovies.map((movie) => (
              <MovieBox key={movie.id} {...movie} isInIndexPage={false}>
                <span
                  class="absolute top-0 right-0 bg-red-700 text-gray-300 p-[5px] text-xs md:text-sm rounded-tr-lg z-50 hover:bg-red-800"
                  onClick={() => removeFromFavorites(movie.id)}
                >
                  <i class="bx bxs-trash-alt"></i>
                </span>
              </MovieBox>
            ))}
          </div>
        ) : (
          <Alert />
        )}
      </main>
    </>
  );
}

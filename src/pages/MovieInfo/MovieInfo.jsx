import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FavoritesContext from "../../contexts/favoritesContext";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Loader from "../../components/Loader/Loader";
import RefreshMessage from "../../components/RefreshMessage/RefreshMessage";

export default function MovieInfo() {
  const [isSidebarShow, setIsSidebarShow] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});
  const [isShowLoader, setIsShowLoader] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const { movieID } = useParams();

  const {favoriteMovies, getFavoriteMovies, updateFavoriteMovies} = useContext(FavoritesContext);

  useEffect(() => {
    fetch(`https://moviesapi.ir/api/v1/movies/${movieID}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieInfo(data);
        setIsShowLoader(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    const isFavorites = favoriteMovies.some(
      (movie) => movie.id === movieInfo.id
    );
    setIsInFavorites(isFavorites);
  });

  const addToFavorites = () => {
    updateFavoriteMovies([
      ...favoriteMovies,
      movieInfo,
    ]);
    getFavoriteMovies();
  };

  const removeFromFavorites = () => {
    const mainMovie = favoriteMovies.find((movie => movie.id === movieInfo.id))
    const newFavoriteMovies = favoriteMovies.filter(movie => movie.id !== mainMovie.id)
    
    updateFavoriteMovies(newFavoriteMovies)
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
        hasBackgroundColor={false}
      />
      <Sidebar
        isSidebarShow={isSidebarShow}
        setIsSidebarShow={setIsSidebarShow}
      />

      {isError ? (
        <Loader isShowLoader={isShowLoader} isFixedToTop={true}>
          <RefreshMessage />
        </Loader>
      ) : (
        <Loader isShowLoader={isShowLoader} isFixedToTop={true} />
      )}

      <div
        id="movie-info-header"
        className="h-52 w-full md:h-80 absolute top-0 -z-40"
      >
        <img
          className="h-full w-full brightness-[0.3]"
          src={movieInfo.poster}
          alt=""
        />
      </div>

      <section className="mx-3 mt-20 md:mt-36">
        <div className="container mx-auto flex">
          <img
            className="movie-img w-32 md:w-44 rounded-md"
            src={movieInfo.poster}
            alt=""
          />

          <div className="ml-3 text-mainTextColor space-y-2 mt-3">
            <h1 className="movie-title text-2xl md:text-4xl">
              {movieInfo.title}
            </h1>
            <p className="movie-country text-xs md:text-base">
              Country Of Origin: {movieInfo.country}
            </p>

            <div className="movie-genres space-x-2">
              {movieInfo.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="text-xs bg-movieBg p-1 px-2 rounded-md opacity-90 md:text-lg "
                >
                  {genre}
                </span>
              ))}
            </div>

            <div
              id="favorite-btn"
              className="cursor-pointer inline-block"
              onClick={() => {
                isInFavorites ? removeFromFavorites() : addToFavorites();
              }}
            >
              <i
                className={`bx mt-3 text-yellow-500 bg-movieBg p-3 rounded ${
                  isInFavorites ? "bxs-star" : "bx-star"
                } `}
              ></i>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-3 my-16">
        <div className="details container mx-auto text-mainTextColor text-lg space-y-5">
          <div>
            name: <span className="ml-2">{movieInfo.title}</span>
          </div>
          <div>
            IMDB Rating: <span className="ml-2">{movieInfo.imdb_rating}</span>
          </div>
          <div>
            Genres: <span className="ml-2">{movieInfo.genres}</span>
          </div>
          <div>
            Released: <span className="ml-2">{movieInfo.released}</span>
          </div>
          <div>
            Time: <span className="ml-2">{movieInfo.runtime}</span>
          </div>
          <div>
            Awards: <span className="ml-2">{movieInfo.awards}</span>
          </div>
          <div>
            Director: <span className="ml-2">{movieInfo.director}</span>
          </div>
          <div>
            Actors: <span className="ml-2">{movieInfo.actors}</span>
          </div>
          <div>
            Storyline: <span className="ml-2">{movieInfo.plot}</span>
          </div>
        </div>
      </section>

      <section className="mx-3 mb-8">
        <div className="movie-images container mx-auto flex flex-wrap justify-center gap-3">
          {movieInfo.images?.map((img, index) => (
            <img className="w-96" src={img} key={index} alt=""></img>
          ))}
        </div>
      </section>
    </>
  );
}

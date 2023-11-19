import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isShowSearchedMoviesContainer, setIsShowSearchedMoviesContainer] =
    useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const [isMovieFound, setIsMovieFound] = useState(true);
  const [hasMoviesLength, setHasMoviesLength] = useState(false);

  useEffect(() => {
    const handleScroll = (event) => {
      setIsShowSearchedMoviesContainer(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const searchHandler = () => {
    if (value) {
      setIsShowSearchedMoviesContainer(true);
      setIsSearching(true);
      fetch(`https://moviesapi.ir/api/v1/movies?q=${value}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchedMovies(data.data);
          setIsSearching(false);

          if (data.data.length) {
            setIsMovieFound(true);
            setHasMoviesLength(true);
          } else {
            setIsMovieFound(false);
          }
        });
    } else {
      setSearchedMovies([]);
      setHasMoviesLength(false);
    }
  };

  return (
    <div className="w-3/4 mx-auto md:w-2/4 relative">
      <input
        className="search-input w-full h-10 block mx-auto rounded-md text-mainTextColor bg-[#585759a1] placeholder:text-mainTextColor placeholder:text-left pl-3 md:placeholder:text-center outline-none focus:outline-[#585759]"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => event.keyCode === 13 && searchHandler()}
      />
      <i
        className="bx bx-search bx-sm text-mainTextColor absolute right-4 top-2.5 cursor-pointer"
        onClick={searchHandler}
      ></i>

      {isShowSearchedMoviesContainer ? (
        <div className="search-movies-container w-full absolute top-11 z-50 overflow-y-auto rounded-lg text-mainTextColor max-h-80">
          {hasMoviesLength ? (
            isSearching ? (
              <p>searching...</p>
            ) : isMovieFound ? (
              searchedMovies.map((movie) => (
                <Link
                  to={`/movie-info/${movie.id}`}
                  className="flex w-full rounded-lg bg-[#0e0e0f] border-b border-b-movieBg cursor-pointer hover:bg-[#222225]"
                >
                  <img
                    className="w-16 h-22 rounded-lg"
                    src={movie.poster}
                    alt=""
                  />
                  <div className="space-y-1 ml-2 w-[70%]">
                    <h1 className="text-sm md:text-lg">{movie.title}</h1>
                    <h1 className="text-xs md:text-sm text-secondTextColor">
                      {movie.year}
                    </h1>
                    <h1 className="text-xs md:text-sm text-secondTextColor">
                      {movie.country}
                    </h1>
                  </div>
                </Link>
              ))
            ) : (
              <p>Nothing found</p>
            )
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

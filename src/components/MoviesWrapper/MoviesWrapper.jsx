import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MovieBox from "../MovieBox/MovieBox";

import "./MoviesWrapper.css";

export default function MoviesWrapper({
  genreID,
  genreTitle,
  setIsShowLoader,
  setIsError,
}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://moviesapi.ir/api/v1/genres/${genreID}/movies?page=1`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.data);
        if (setIsShowLoader) {
          setIsShowLoader(false);
        }
      })
      .catch((err) => {
        if (setIsError) {
          setIsError(true);
        }
      });
  }, []);

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between">
        <h1 className="text-mainTextColor text-2xl md:text-4xl">
          {genreTitle}
        </h1>

        <Link
          to={`/movies/${genreID}`}
          className="text-mainTextColor bg-movieBg text-xs md:text-base rounded-md py-2 px-3 hover:bg-zinc-800"
        >
          See All
          <i className="bx bx-right-arrow-alt"></i>
        </Link>
      </div>

      <div className="movie-container">
        {movies.map((movie) => (
          <MovieBox key={movie.id} {...movie} isInIndexPage={true} />
        ))}
      </div>
    </section>
  );
}

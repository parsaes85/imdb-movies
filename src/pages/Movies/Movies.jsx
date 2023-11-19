import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./Movies.css";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import MovieBox from "../../components/MovieBox/MovieBox";
import Loader from "../../components/Loader/Loader";
import RefreshMessage from "../../components/RefreshMessage/RefreshMessage";

export default function Movies() {
  const [isSidebarShow, setIsSidebarShow] = useState(false);
  const [genreMovies, setGenreMovies] = useState([]);
  const [isShowLoader, setIsShowLoader] = useState(true);
  const [isError, setIsError] = useState(false);
  const [moviesPage, setMoviesPage] = useState(2);
  const [isShowNextPageLoader, setIsShowNextPageLoader] = useState(true);
  const [genreTitle, setGenreTitle] = useState("");

  const { genreID } = useParams();

  useEffect(() => {
    fetch("https://moviesapi.ir/api/v1/genres")
      .then((res) => res.json())
      .then((data) => {
        const mainGenre = data.find((genre) => {
          return genre.id == genreID;
        });
        setGenreTitle(mainGenre.name);
      });

    fetch(`https://moviesapi.ir/api/v1/genres/${genreID}/movies?page=1`)
      .then((res) => res.json())
      .then((data) => {
        setGenreMovies(data.data);
        setIsShowLoader(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  const fetchMoreData = async () => {
    setIsShowNextPageLoader(true);
    fetch(
      `https://moviesapi.ir/api/v1/genres/${genreID}/movies?page=${moviesPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setGenreMovies((prevMovies) => [...prevMovies, ...data.data]);
        setMoviesPage((prevPage) => ++prevPage);
        setIsShowNextPageLoader(false);
      });
  };

  return (
    <>
      <Topbar
        isSidebarShow={isSidebarShow}
        setIsSidebarShow={setIsSidebarShow}
        isShowSidebarBtn={true}
        isShowSearchInput={true}
        isShowBackBtn={false}
        hasBackgroundColor={true}
      />
      <Sidebar
        isSidebarShow={isSidebarShow}
        setIsSidebarShow={setIsSidebarShow}
      />

      {isError ? (
        <Loader isShowLoader={isShowLoader} isFixedToTop={false}>
          <RefreshMessage />
        </Loader>
      ) : (
        <Loader isShowLoader={isShowLoader} isFixedToTop={false} />
      )}

      <main className="px-5 mt-24">
        <h1 className="genre-title text-mainTextColor text-2xl md:text-4xl my-4 md:my-7">
          {genreTitle}
        </h1>

        <div className="container mx-auto">
          <InfiniteScroll
            className="genre-movie-container"
            dataLength={genreMovies.length}
            next={fetchMoreData}
            hasMore={true}
          >
            {genreMovies.map((movie) => (
              <MovieBox key={movie.id} {...movie} isInIndexPage={false}/>
            ))}
          </InfiniteScroll>

          {isShowNextPageLoader && (
            <div className="next-movies-page-loader flex justify-center py-2">
              <i className="bx bx-loader-alt bx-spin bx-lg text-mainTextColor"></i>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

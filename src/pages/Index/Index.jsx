import React, { useState, useEffect } from "react";

import Topar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import MoviesWrapper from "../../components/MoviesWrapper/MoviesWrapper";
import Loader from "../../components/Loader/Loader";
import RefreshMessage from "../../components/RefreshMessage/RefreshMessage";

export default function Index() {
  const [isSidebarShow, setIsSidebarShow] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const handleScroll = event => {
        setIsSidebarShow(false)
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Topar
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
        <Loader isShowLoader={isShowLoader} isFixedToTop={false}/>
      )}

      <main className="px-5 pt-24">
        <div className="container mx-auto">
          <MoviesWrapper genreID={3} genreTitle="Action" />
          <MoviesWrapper genreID={2} genreTitle="Drama" />
          <MoviesWrapper genreID={5} genreTitle="History" />
          <MoviesWrapper genreID={9} genreTitle="Comdey" />
          <MoviesWrapper genreID={17} genreTitle="Horror" />
          <MoviesWrapper genreID={13} genreTitle="Family" />
          <MoviesWrapper genreID={14} genreTitle="War" />
          <MoviesWrapper
            genreID={15}
            genreTitle="Animation"
            setIsShowLoader={setIsShowLoader}
            setIsError={setIsError}
          />
        </div>
      </main>
    </>
  );
}

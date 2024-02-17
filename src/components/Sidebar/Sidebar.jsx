import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ isSidebarShow, setIsSidebarShow }) {
  useEffect(() => {
    const hideSidebar = (e) => {
      if (e.target.id === "navbar-parent") {
        setIsSidebarShow(false);
      }
    };

    document.addEventListener("click", hideSidebar);

    return () => {
      document.removeEventListener("click", hideSidebar);
    };
  }, []);

  return (
    <div id="navbar-parent" className={`fixed w-full top-0 h-[100vh] transition-all ${isSidebarShow ? "z-50 right-0 opacity-100" : "-right-32 opacity-0 -z-50"}`}>
      <div
        id="navbar"
        className={`bg-[#2122248a] h-full ml-auto w-56 py-20 backdrop-blur-3xl`}
      >
        <div className="absolute top-3 right-5">
          <div
            id="hide-navbar-btn"
            className="toggle active z-50"
            onClick={() => setIsSidebarShow(false)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-mainTextColor">
          <i className="bx bxs-user"></i>
          <h1 id="user-name" className="text-mainTextColor">
            Guest
          </h1>
        </div>

        <ul className="px-6 my-6 space-y-3">
          <li className="text-secondTextColor text-lg">
            <Link to="/" className="block">
              <i className="bx bxs-home"></i>
              Home
            </Link>
          </li>

          <li className="text-secondTextColor text-lg">
            <Link to="/favorite-movies" className="block">
              <i className="bx bxs-star"></i>
              Favorites
            </Link>
          </li>
        </ul>

        <div className="flex items-center justify-center absolute bottom-16 left-1/2 -translate-x-1/2">
          <Link
            to="/"
            className="bg-green-700 px-6 py-2 text-gray-200 font-medium rounded-xl"
          >
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
}

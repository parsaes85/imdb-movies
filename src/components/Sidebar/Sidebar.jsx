import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ isSidebarShow, setIsSidebarShow }) {
  return (
    <div
      id="navbar"
      className={`transition-all bg-[#2122248a] h-full fixed top-0 z-40 w-56 py-20 backdrop-blur-3xl ${
        isSidebarShow ? "right-0" : "-right-96"
      }`}
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
  );
}

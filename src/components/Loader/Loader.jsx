import React from "react";
import "./Loader.css";

export default function Loader({ isShowLoader, children, isFixedToTop }) {
  return (
    <div
      className={`loader ${isFixedToTop && "top-0"} fixed h-full w-full bg-mainBg text-mainTextColor z-10 ${
        isShowLoader ? "flex" : "hide"
      } justify-center items-center`}
    >
      {children ? children : <i className="bx bx-loader-alt bx-spin bx-lg"></i>}
    </div>
  );
}
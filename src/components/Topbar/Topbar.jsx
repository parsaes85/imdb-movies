import React from "react";
import "./Topbar.css";

import GoBackBtn from "../GoBackBtn/GoBackBtn";
import SearchInput from "../SearchInput/SearchInput";

export default function Topbar({
  isSidebarShow,
  setIsSidebarShow,
  isShowSidebarBtn,
  isShowSearchInput,
  isShowBackBtn,
  hasBackgroundColor
}) {
  return (
    <div className={`px-5 h-20 flex ${hasBackgroundColor && 'bg-[#151618]'} fixed top-0 w-full z-30`}>
      <div className="container mx-auto flex flex-row-reverse items-center">
        {isShowSidebarBtn && (
          <div className="toggle z-50" onClick={() => setIsSidebarShow(true)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        {isShowSearchInput && (
          <SearchInput />
        )}

        {isShowBackBtn && (
          <GoBackBtn />
        )}
      </div>
    </div>
  );
}

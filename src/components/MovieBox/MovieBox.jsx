import React from "react";
import { Link } from "react-router-dom";

export default function MovieBox(props) {
  return (
    <div className={`${props.isInIndexPage ? "movie" : "w-20 md:w-52"} relative hover:scale-95 transition cursor-pointer`}>
      <Link to={`/movie-info/${props.id}`}>
        <img
          src={props.poster}
          className={`skeleton rounded-lg ${props.isInIndexPage ? "h-48 md:h-80" : "w-20 md:w-52"} `}
          alt=""
        />
      </Link>

        <div className="py-3">
          <h1 className="text-mainTextColor text-xs md:text-xl mb-2 whitespace-nowrap text-ellipsis overflow-hidden">
            {props.title}
          </h1>

          <div className="flex text-secondTextColor text-[10px] md:text-base">
            <span>{props.country}</span>
            <span className="mx-1">|</span>
            <span>{props.year}</span>
          </div>
        </div>

        <span className="absolute top-0 left-0 bg-movieBg text-mainTextColor p-[6px] text-xs md:text-sm rounded-tl-lg">
          {props.imdb_rating}
        </span>
        {props.children}
    </div>
  );
}

import React, { FC } from "react";
import NcImage from "../../components/NcImage/NcImage";
import Badge from "../../components/Badge/Badge";
import Button from "../Button/Button";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

const CardCategory4 = ({
  className = "",
  label,
  count,
  index,
  categoryimage,
}) => {
  
  const search = useLocation();
  const queryParams = queryString.parse(search);
  const newQueryParams =  {
    ...queryParams,
    customCateogry : label
  };
  const categories = "Follow";
  const getColorClass = () => {
    return "bg-blue-500";
  };

  return (
    <>
      <Link
        to={{
          pathname: "/discover/discover_content",
          // state: { topic: label },
          search: queryString.stringify(newQueryParams)
        }}
        // to={`/discover/discover_content?category=${label}`}
        className={`nc-CardCategory4 flex flex-col ${className}`}
        // className={`nc-CardAuthorBox2 flex flex-col overflow-hidden [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
        data-nc-id="CardCategory4"
      >
        {/* {/ <div className="relative flex-shrink-0 "> /} */}
        <div
          className={`flex-shrink-0 relative w-full aspect-w-7 aspect-h-5 h-0 rounded-3xl overflow-hidden group`}
        >
          <NcImage
            src={categoryimage}
            className="object-cover w-full h-full rounded-2xl"
            // containerClassName="flex aspect-w-7 aspect-h-5 sm:aspect-h-6 w-full h-0"
          />
          <div>
            {/* {/ <button className= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> /}
            {/ <Badge name={categories} href="/" className="absolute top-0 left-0" /> /}
            {/ </button> /}
            {/ {index && ( /} */}
          </div>
          <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
          {/* <span
          className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
        ></span> */}
        </div>
        {/* <Button>
          <Badge name={categories} className="absolute top-3 left-1" />
        </Button> */}
        <div className="flex items-center mt-5">
          <div className={`w-10 h-10 ${getColorClass()} rounded-full`}></div>
          <div className="ml-3 truncate">
            <h2
              className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </h2>
            <span
              className={`block mt-1 text-sm text-neutral-6000 dark:text-neutral-400`}
            >
              {count} Articles
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CardCategory4;

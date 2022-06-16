import React from "react";
import Avatar from "../Avatar/Avatar";
// import { PostDataType } from "data/types";
import { Link } from "react-router-dom";

// export interface PostMeta2Props {
//   className?: string;
//   meta: Pick<PostDataType, "date" | "author" | "categories" | "readingTime">;
//   hiddenCategories?: boolean;
//   size?: "large" | "normal";
//   avatarRounded?: string;
// }

const PostMeta2 = ({
  className = "leading-none",
  meta,
  size = "normal",
  avatarRounded,
}) => {
  const {
    authors,
    image_url,
    date_download,
    title,
    maintext,
    category,
    readtime,
  } = meta.fields || meta;
  console.log(authors[0]);
  return (
    <div 
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
      data-nc-id="PostMeta2"
    >
      <Link to="" className="flex items-center space-x-2">
        <Avatar
          radius={avatarRounded}
          sizeClass={
            size === "normal"
              ? "h-6 w-6 text-sm"
              : "h-10 w-10 sm:h-11 sm:w-11 text-xl"
          }
          imgUrl={image_url}
          //userName={authors}
        />
      </Link>
      <div  className="ml-3">
        <div className="flex items-center">
          <Link
            to=""
            className="block font-semibold"
            style={{ color: "white" }}
          >
            {authors[0]}
          </Link>
        </div>
        <div className="text-xs mt-[6px]">
          <span className="text-neutral-700 dark:text-neutral-300">
            {date_download.split("T")[0]}
          </span>
          <span className="mx-2 font-semibold">·</span>
          <span className="text-neutral-700 dark:text-neutral-300">
            {readtime} min read
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostMeta2;

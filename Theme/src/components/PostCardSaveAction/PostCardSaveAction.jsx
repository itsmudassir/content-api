import React from "react";

const PostCardSaveAction = ({
  className = "",
  hidenReadingTime = false,
  readingTime,
}) => {

  // getting postData from Card11

  return (
    <div
      className={`nc-PostCardSaveAction flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 ${className}`}
      data-nc-id="PostCardSaveAction"
    >
      {!hidenReadingTime && !!readingTime && (
        <span>{readingTime} min read</span>
      )}
    </div>
  );
};

export default PostCardSaveAction;

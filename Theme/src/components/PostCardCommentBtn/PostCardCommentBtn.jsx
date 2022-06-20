import React from "react";
import millify from "millify";

const PostCardCommentBtn = ({
  className = "flex h-8 text-xs",
  facebook_shares,
  topic_facebook,
}) => {
  //getting facebook_shares from  postCardlikeandComment

  return (
    <button
      className={`nc-PostCardLikeAction relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors ${className}`}
      title="Facebook_shares"
      data-nc-id="PostCardLikeAction"
    >
      <i
        className="lab la-facebook-f mr-2 w-1 text-base text-blue-700"
      ></i>

      <span className="ml-1 text-neutral-900 dark:text-neutral-200">
        {facebook_shares? millify(facebook_shares): null}
      </span>
    </button>
  );
};

export default PostCardCommentBtn;

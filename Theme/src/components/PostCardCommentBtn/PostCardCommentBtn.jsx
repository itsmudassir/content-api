import React from "react";

const PostCardCommentBtn = ({
  className = "flex px-3 h-8 text-xs",
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
        className="lab la-facebook-f mr-1 w-1 text-base"
        style={{ padding: "10px" }}
      ></i>

      <span className="ml-1 text-neutral-900 dark:text-neutral-200">
        {!facebook_shares ? topic_facebook : ""}
      </span>
    </button>
  );
};

export default PostCardCommentBtn;

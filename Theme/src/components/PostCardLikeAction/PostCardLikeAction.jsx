import React from "react";
import millify from "millify";

const PostCardLikeAction = ({
  className = "h-8 text-xs",
  twitter_shares,
  topic_twitter,
}) => {
  // getting twitter_shares from postcartlikecontainer

  return (
    <button
      className={`nc-PostCardLikeAction relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors ${className}`}
      title="Twitter_shares"
      data-nc-id="PostCardLikeAction"
    >
      <i
        className="lab la-twitter mr-2 w-2 text-base text-blue-600"
      ></i>

      <span className={`ml-1`}>
        {twitter_shares ? millify(twitter_shares) : null}
      </span>
    </button>
  );
};

export default PostCardLikeAction;

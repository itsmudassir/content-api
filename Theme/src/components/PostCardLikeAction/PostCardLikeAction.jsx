import React from "react";
import convertNumbThousand from "../../utils/convertNumbThousand";

const PostCardLikeAction = ({
  className = "px-3 h-8 text-xs",
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
        className="lab la-twitter mr-1 w-1 text-base"
        style={{ padding: "10px" }}
      ></i>

      <span className={`ml-1`}>
        {convertNumbThousand(!twitter_shares ? topic_twitter : "")}
      </span>
    </button>
  );
};

export default PostCardLikeAction;

import React from "react";
import dateFormat from "dateformat";
import { useState, useEffect } from "react";
import AvatarEmoji from "../Avatar/AvatarEmoji";
import { faMeh, faSmile, faAngry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostCardMeta = ({
  className = "leading-none",
  meta,
  hiddenAvatar = false,
  size = "normal",
}) => {
  var { category, date_download, sentiment } = meta;

  const res = dateFormat(date_download, "mmm d, yyyy");

  var [emoji, setEmoji] = useState(sentiment);
  function EmojiSetelment() {
    if (emoji == "POS") {
      setEmoji(<FontAwesomeIcon icon={faSmile} className="text-green-400" />);
    } else if (emoji == "NEU" || emoji == "unknown") {
      setEmoji(<FontAwesomeIcon icon={faMeh} className="text-slate-400" />);
    } else if (emoji == "NEG") {
      setEmoji(<FontAwesomeIcon icon={faAngry} style={{ color: "#b80518" }} />);
    }
  }

  useEffect(() => {
    EmojiSetelment();
  }, []);

  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-base"
      } ${className}`}
      data-nc-id="PostCardMeta"
    >
      <div className="relative flex items-center space-x-2 ">
        <button
          title={
            sentiment == "POS"
              ? "Positve"
              : sentiment == "NEG"
              ? "Negative"
              : sentiment == "NEU"
              ? "Neutral"
              : sentiment == "unknown"
              ? "Neutral": null
          }
          data-nc-id="PostCardLikeAction"
        >
          {!hiddenAvatar && (
            <AvatarEmoji
              radius="rounded-full"
              data={emoji}
              userName={category}
            />
          )}
        </button>

        <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          Sentiment
        </span>
      </div>
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          · {res}
        </span>
      </>
    </div>
  );
};

export default PostCardMeta;

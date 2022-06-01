import React, { useState } from "react";
import PostCardSaveAction from "../../components/PostCardSaveAction/PostCardSaveAction";
import PostCardLikeAndComment from "../../components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "../../components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "../../components/PostFeaturedMedia/PostFeaturedMedia";
import { useHistory } from "react-router-dom";

const Card12 = ({
  className = "h-full",
  hiddenAuthor = false,
  cardItems,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const history = useHistory();
  console.log(cardItems);

  const {
    date,
    title,
    _id,
    url,
  } = cardItems;

  // Giving a static value to herf

  const pushData = () => {
    history.push(`/mainpostpage/${_id}`, cardItems);
  };

  //useState hook from the theme
  const [isHover, setIsHover] = useState(false);

  //returning of fuction starts here
  return (
    <div
      className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div className="absolute inset-0" onClick={pushData}>
          <PostFeaturedMedia isHover={isHover} post={cardItems} />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        {!hiddenAuthor ? (
          <PostCardMeta meta={cardItems} />
        ) : (
          <span className="text-xs text-neutral-500">{date}</span>
        )}

        <h2
          title={title}
          className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 "
        >
          <a href={url} target="_blank">
            {title}
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </a>
        </h2>
        <div className="flex items-end justify-between mt-auto">
          <PostCardLikeAndComment className="relative" postData={cardItems} />

          <PostCardSaveAction className="relative" postData={cardItems} />
        </div>
      </div>
    </div>
  );
};

export default Card12;

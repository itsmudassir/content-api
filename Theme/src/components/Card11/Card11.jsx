import React, { useState } from "react";
import PostCardSaveAction from "../../components/PostCardSaveAction/PostCardSaveAction";
import PostCardLikeAndComment from "../../components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "../../components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "../../components/PostFeaturedMedia/PostFeaturedMedia";
import { useHistory } from "react-router-dom";
import { addpost } from "../../app/posts/posts";
import { useDispatch } from "react-redux";

const Card11 = ({
  className = "h-full",
  cardvalue,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const dispatch = useDispatch();
  const { id } = cardvalue;
  const history = useHistory();
  const cardvalues = cardvalue.fields;

  //useState hook from the theme
  const [isHover, setIsHover] = useState(false);

  const pushData = () => {
    history.push(`/mainpostpage/${id}`, cardvalue);
  };

  // handler
  const setPostToRedux = (e) => {
    try {
      e.preventDefault();
      dispatch(addpost({ ...cardvalue.fields, id, isLiked: true }));
    } catch (err) {
      console.log(err);
    }
  };

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
          <PostFeaturedMedia post={cardvalue.fields} isHover={isHover} />
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
        {!hiddenAuthor ? (
          <PostCardMeta meta={cardvalue.fields} />
        ) : (
          <span className="text-xs text-neutral-500">
            {cardvalues?.date_download}
          </span>
        )}

        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          <span
            style={{ cursor: "pointer" }}
            className="line-clamp-2"
            title={cardvalues?.title}
          >
            <a href={cardvalues?.url} target="_blank">
              {cardvalues?.title}
            </a>{" "}
          </span>
        </h2>
        <div className="flex items-end justify-center mt-auto">
            <PostCardLikeAndComment
              className="relative"
              setPostToRedux={setPostToRedux}
              postData={cardvalue}
            />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card11);

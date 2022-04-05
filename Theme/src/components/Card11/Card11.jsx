import React, { useState } from "react";
import PostCardSaveAction from "../../components/PostCardSaveAction/PostCardSaveAction";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import PostCardLikeAndComment from "../../components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "../../components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "../../components/PostFeaturedMedia/PostFeaturedMedia";
import { useHistory } from "react-router-dom";
// import { useAppDispatch } from "../../app/hooks";
import { addpost } from "../../app/posts/posts";
import { useDispatch } from "react-redux";
import { add } from "date-fns";
// import cogoToast from "cogo-toast";

const Card11 = ({
  className = "h-full",
  cardvalue,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const dispatch = useDispatch();

  var { path } = useRouteMatch();

  const { id } = cardvalue;
  const history = useHistory();

  const { title, date_download, url } = cardvalue.fields;

  const externalUrl = () => {
    history.push((window.location.href = url));
  };

  const href = `/discover/discover_content/mainpostpage/${id}`;

  //getting id from Page search

  //useState hook from the theme
  const [isHover, setIsHover] = useState(false);

  const pushData = () => {
    history.push(`${path}/mainpostpage/${id}`, cardvalue);

    console.log("data tranfered");
  };

  // handler
  const setPostToRedux = (e) => {
    try {
      e.preventDefault();
      dispatch(addpost({...cardvalue.fields, id, isLiked: true  }));
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

      <div className="p-4 flex flex-col flex-grow space-y-3">
        {!hiddenAuthor ? (
          <PostCardMeta meta={cardvalue.fields} />
        ) : (
          <span className="text-xs text-neutral-500">{date_download}</span>
        )}

        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          <span
            onClick={() => externalUrl()}
            style={{ cursor: "pointer" }}
            className="line-clamp-2"
            title={title}
          >
            {title} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </span>
        </h2>
        <div className="flex items-end justify-between mt-auto">
          <div className="flex items-end justify-between mt-auto">
            <PostCardLikeAndComment
              className="relative"
              setPostToRedux={setPostToRedux}
              postData={cardvalue}
            />

            <PostCardSaveAction
              className="relative"
              postData={cardvalue.fields}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card11;

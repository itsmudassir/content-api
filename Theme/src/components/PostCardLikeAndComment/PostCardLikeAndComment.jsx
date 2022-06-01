import React from "react";
import PostCardCommentBtn from "../../components/PostCardCommentBtn/PostCardCommentBtn";
import PostCardLikeContainer from "../../containers/PostCardLikeContainer/PostCardLikeContainer";
import PostCardAddtoFavouritesFolderBtn from "../PostCardAddtoFavouritesFolderBtn/PostCardAddtoFavouritesFolderBtn";

const PostCardLikeAndComment = ({
  className = "",
  itemClass = "px-3 h-8 text-xs",
  hiddenCommentOnMobile = true,
  postData,
  setPostToRedux,
  onClickLike = () => {},
}) => {
  //getting postData from the Card11 component
  const { twitter_shares, facebook_shares, facebook, twitter } =
    postData.fields || postData;

  // setting href statically

  const href = "/";
  return (
    <div
      // space-x-2
      className={`nc-PostCardLikeAndComment flex justify-center items-center   ${className}`}
      data-nc-id="PostCardLikeAndComment"
    >
      <PostCardLikeContainer
        className={itemClass}
        twitter_shares={twitter_shares}
        topic_twitter={twitter}
        onClickLike={onClickLike}
        // postId={id}
      />

      <PostCardCommentBtn
        href={href}
        facebook_shares={facebook_shares}
        topic_facebook={facebook}
        className={`${
          hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
        }  ${itemClass}`}
      />

      <PostCardAddtoFavouritesFolderBtn
        postData={postData}
        setPostToRedux={setPostToRedux}
      />
    </div>
  );
};

export default PostCardLikeAndComment;

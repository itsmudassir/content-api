import React from "react";
import PostCardCommentBtn from "../../components/PostCardCommentBtn/PostCardCommentBtn";
import PostCardLikeContainer from "../../containers/PostCardLikeContainer/PostCardLikeContainer";
import PostCardAddtoFavouritesFolderBtn from "../PostCardAddtoFavouritesFolderBtn/PostCardAddtoFavouritesFolderBtn";

const PostCardLikeAndComment = ({
  className = "",
  itemClass = "",
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
      className={`nc-PostCardLikeAndComment w-full px-2 flex justify-between items-center   ${className}`}
      data-nc-id="PostCardLikeAndComment"
    >
     
        <PostCardLikeContainer
          className={itemClass}
          twitter_shares={twitter_shares}
          topic_twitter={twitter}
          onClickLike={onClickLike}
          // postId={id}
          />
      

      <div className="">
      <PostCardCommentBtn
        href={href}
        facebook_shares={facebook_shares}
        topic_facebook={facebook}
        />
        </div>

      <PostCardAddtoFavouritesFolderBtn
        postData={postData}
        setPostToRedux={setPostToRedux}
      />
    </div>
  );
};

export default PostCardLikeAndComment;

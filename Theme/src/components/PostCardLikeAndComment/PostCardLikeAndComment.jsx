import React, { FC } from "react";
import PostCardCommentBtn from "../../components/PostCardCommentBtn/PostCardCommentBtn";
import PostCardLikeContainer from "../../containers/PostCardLikeContainer/PostCardLikeContainer";
// import { PostDataType } from "data/types";

// export interface PostCardLikeAndCommentProps {
//   className?: string;
//   itemClass?: string;
//   postData: Pick<PostDataType, "like" | "id" | "href" | "commentCount">;
//   hiddenCommentOnMobile?: boolean;
//   onClickLike?: (id: PostDataType["id"]) => void;
// }

const PostCardLikeAndComment = ({
  className = "",
  itemClass = "px-3 h-8 text-xs",
  hiddenCommentOnMobile = true,
  postData,
  onClickLike = () => {},
}) => {
  const href = "/"
  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`}
      data-nc-id="PostCardLikeAndComment"
    >
      <PostCardLikeContainer
        className={itemClass}
        like={postData.twitter_shares}
        onClickLike={onClickLike}
        // postId={postData.id}
      />
      <PostCardCommentBtn
        href={href}
        commentCount={postData.facebook_shares}
        className={`${
          hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
        }  ${itemClass}`}
      />
    </div>
  );
};

export default PostCardLikeAndComment;

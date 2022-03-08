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

  //getting postData from the Card11 component

  var {category ,twitter_shares ,facebook_shares , date , facebook , image_url  , date_publish, title ,source_domain ,twitter ,language} =  postData

  // setting href statically

  const href = "/"

  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`}
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
    </div>
  );
};

export default PostCardLikeAndComment;

import React, { FC } from "react";
import PostCardCommentBtn from "../../components/PostCardCommentBtn/PostCardCommentBtn";
import PostCardLikeContainer from "../../containers/PostCardLikeContainer/PostCardLikeContainer";
import PostCardAddtoFavouritesFolderBtn from "../PostCardAddtoFavouritesFolderBtn/PostCardAddtoFavouritesFolderBtn"
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
  setPostToRedux,
  onClickLike = () => {},
}) => {

  //getting postData from the Card11 component
  const {category, twitter_shares ,facebook_shares , date , facebook , image_url  , date_publish, title ,source_domain ,twitter ,language} =  postData.fields || postData;

  // setting href statically

  const href = "/"
 const isLiked =  false
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

      <PostCardAddtoFavouritesFolderBtn postData={postData} setPostToRedux={setPostToRedux}/>

      
    </div>
  );
};

export default PostCardLikeAndComment;

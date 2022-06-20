import React, { useState } from "react";
import { HeartIcon as HeartSolid } from "@heroicons/react/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/outline";
import AddToFavouritesFolderModal from "../AddToFavouritesFolderModal/AddToFavouritesFolderModal";
import { useDeletePostByElasticIdMutation } from "../../app/Api/contentApi";
import cogoToast from "cogo-toast";
import confirmAlert from "../../app/confirmAlert";

const PostCardAddtoFavouritesFolderBtn = ({ setPostToRedux, postData }) => {
  const [showModal, setshowModal] = useState(false);

  // RTK query
  const [deletePost, deletePostObj] = useDeletePostByElasticIdMutation();

  // handlers
  const closeModal = () => setshowModal(false);
  const showModalOnClick = () => setshowModal(true);

  const heartClickhandler = (e) => {
    showModalOnClick();
    setPostToRedux(e);
  };
  const deletePostHandler = async () => {
    try {
      confirmAlert("Are you sure you want to dislike this post?", async () => {
        const res = await deletePost(postData?.id || postData?.post_id);
        if (res.data) cogoToast.success("Removed From favourites");
        if (res.error) cogoToast.error(res.error.data.errorMsg);
      });
    } catch (err) {
      console.log("ERROR OCCOURED WHILE REMOVING POST", err);
      console.log("ERROR OCCOURED WHILE REMOVING POST", deletePostObj.error);
      cogoToast.error(deletePost?.error?.data?.errorMsg);
    }
  };

  return (
    <>
      <button
        className="flex justify-center items-center w-6 hover:bg-rose-200 hover:text-rose-600 rounded-full"
        title={
          postData?.isLiked ? "Remove from favourites" : "Add to favourites"
        }
      >
        {postData?.isLiked ? (
          <HeartSolid
            onClick={() => deletePostHandler()}
            className="w-5 h-5 text-red-600"
          />
        ) : (
          <HeartOutline
            onClick={(e) => heartClickhandler(e)}
            className="w-5 h-5"
          />
        )}
      </button>

      {showModal ? (
        <AddToFavouritesFolderModal
          show={showModal}
          onCloseModalReportItem={closeModal}
        />
      ) : null}
    </>
  );
};

export default PostCardAddtoFavouritesFolderBtn;

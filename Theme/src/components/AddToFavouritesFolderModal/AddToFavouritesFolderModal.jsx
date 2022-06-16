import React, { useEffect, useRef, useState } from "react";
import NcModal from "../NcModal/NcModal";
import ButtonPrimary from "../Button/ButtonPrimary";
import ButtonSecondary from "../Button/ButtonSecondary";
import {
  useCreateFolderMutation,
  useGetAllFoldersQuery,
  useAddPostToFavouritesFolderMutation,
} from "../../app/Api/contentApi";
import Input from "../Input/Input";
import ScrollableSelectBox from "../ScrollableSelectBox/ScrollableSelectBox";
import { useSelector } from "react-redux";
import cogoToast from "cogo-toast";

const AddToFavouritesFolderModal = ({ show, onCloseModalReportItem }) => {
  // local/global states
  const textareaRef = useRef(null);
  const [folderName, setFolderName] = useState();
  const [folderId, setFolderId] = useState();
  const [showAddFolder, setShowAddFolder] = useState(false);
  const selectedPost = useSelector((state) => state.posts.post);

  // RTK query
  const [createFolder, createFolderObj] = useCreateFolderMutation();
  const getAllFolders = useGetAllFoldersQuery();
  const [addPostToFavFolder, addPostToFavFolderObj] =
    useAddPostToFavouritesFolderMutation();

  // handlers
  const handelCreateFolder = async (e) => {
    e.preventDefault();
    try {
      const res = await createFolder({ folderName: folderName });
      if (res.data) cogoToast.success(res.data.successMsg);
      if (res.error)
        cogoToast.error(res.error.data.errorMsg || res.error.data.msg);
    } catch (err) {
      console.log("ERROR OCCOURED WHILE CREATING FOLDER", createFolderObj);
      cogoToast.error(createFolderObj?.error?.data?.errorMsg);
    }
    setShowAddFolder(false);
  };

  const handelShowAddFolder = (e) => {
    e.preventDefault();
    setShowAddFolder(true);
  };

  const handelAddPostToFavFolder = async (e) => {
    e.preventDefault();
    try {
      if (folderId !== undefined && selectedPost !== null) {
        const res = await addPostToFavFolder({ folderId, selectedPost });
        if (res.data) cogoToast.success(res.data.successMsg);
        if (res.error) cogoToast.error(res.error.data.errorMsg);
      }
    } catch (err) {
      console.log("ERROR WHILE SENDING DATA", err);
      cogoToast.error(addPostToFavFolderObj?.error?.data?.errorMsg);
    }
  };

  // useEffects
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element = textareaRef.current;
        if (element) {
          element.focus();
        }
      }, 400);
    }
  }, [show]);

  const renderContent = () => {
    return (
      <form action="#">
        {getAllFolders?.data?.InformationMsg ? (
          <p className="text-sm sm:text-lg ml-6 mb-10 mt-5 text-slate-400">
            {getAllFolders.data.InformationMsg}
          </p>
        ) : (
          <>
            <ScrollableSelectBox
              foldersList={getAllFolders?.data}
              setFolderId={setFolderId}
            />
            <ButtonPrimary
              className="!mt-3"
              onClick={(e) => handelAddPostToFavFolder(e)}
            >
              Add To Folder
            </ButtonPrimary>
            <br />
          </>
        )}

        {/* =========== DIVIDER ==================== */}
        <div class="relative flex py-5 items-center mt-2">
          <div class="flex-grow border-t border-slate-300"></div>
          <span class="flex-shrink mx-4 text-slate-400">OR</span>
          <div class="flex-grow border-t border-slate-300"></div>
        </div>

        {/* {!showAddFolder ? (
          <ButtonPrimary
            onClick={(e) => handelShowAddFolder(e)}
            className="bg-green-300 hover:bg-green-400 rounded-sm h-11 mt-3"
          >
            Create New Folder
          </ButtonPrimary>
        ) : (
          <> */}
        <div>
          <h6 className="text-sm text-neutral-700">Create folder</h6>
          <Input
            type="text"
            placeholder="Enter Folder Name"
            className="mt-1 rounded-md border-slate-300"
            required={true}
            id="report-message"
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>
        <div className="mt-3 space-x-6">
          <ButtonPrimary onClick={(e) => handelCreateFolder(e)} type="submit">
            Create
          </ButtonPrimary>
          {/* <ButtonSecondary type="button" onClick={onCloseModalReportItem}>
                Cancel
              </ButtonSecondary> */}
        </div>
        {/* </>
        )} */}
      </form>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      className="h-140 w-80 my-5 overflow-visible text-left align-middle transition-all transform bg-white border border-black border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300"
      isOpenProp={show}
      onCloseModal={onCloseModalReportItem}
      contentExtraClass="h-[30rem] w-[80%] sm:w-96"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="Add To Favourites"
    />
  );
};

export default AddToFavouritesFolderModal;

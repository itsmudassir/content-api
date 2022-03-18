import React, { useEffect, useRef, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import NcModal from "../NcModal/NcModal";
import Textarea from "../Textarea/Textarea";
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
  console.log(getAllFolders , "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  const [addPostToFavFolder, addPostToFavFolderObj] =
    useAddPostToFavouritesFolderMutation();

  // handlers
  const handleClickSubmitForm = (e) => {
    setShowAddFolder(false);
    // e.preventDefault();
    // createFolder({ folderName: folderName });
    // history.push("/topics");
  };

  const handelShowAddFolder = (e) => {
    e.preventDefault();
    setShowAddFolder(true);
  };

  const handelAddPostToFavFolder = (e) => {
    e.preventDefault();
    try {
      if (folderId !== undefined && selectedPost !== null) {
        addPostToFavFolder({ folderId, selectedPost });
      }
      if (addPostToFavFolderObj.error) {
        console.log("ERROR WHILE SENDING DATA", addPostToFavFolderObj.error);
      }
    } catch (err) {
      console.log("ERROR WHILE SENDING DATA", err);
      console.log("ERROR WHILE SENDING DATA", addPostToFavFolderObj.error);
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

  // useEffect(() => {
  //   // RTK query code to add post to favouritesFolder
  //   if (folderId !== undefined && selectedPost !== null) {
  //     addPostToFavFolder({ folderId, selectedPost });
  //     console.log("POST ADDED xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  //   }
  //   console.log("ERROR WHILE SENDING DATA", addPostToFavFolderObj.error);
  // }, [folderId]);

  console.log(folderId);
  console.log(selectedPost);

  const renderContent = () => {
    return (
      <form action="#">
        <ScrollableSelectBox
          foldersList={getAllFolders?.data}
          setFolderId={setFolderId}
        />
        <ButtonPrimary
          className="mt-3 mb-2 bg-green-400"
          onClick={(e) => handelAddPostToFavFolder(e)}
        >
          Add To Folder
        </ButtonPrimary>
        <br />

        {!showAddFolder ? (
          <ButtonPrimary
            onClick={(e) => handelShowAddFolder(e)}
            className="bg-green-300 hover:bg-green-400 rounded-sm h-11 mt-3"
          >
            Create New Folder
          </ButtonPrimary>
        ) : (
          <>
            <div className="mt-4">
              <h6 className="text-md text-neutral-700">Folder Name</h6>

              <Input
                type="text"
                placeholder="Enter Folder Name"
                className="mt-1 rounded-md border-slate-400"
                required={true}
                id="report-message"
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
            <div className="mt-4 space-x-6">
              <ButtonPrimary
                onClick={(e) => handleClickSubmitForm(e)}
                type="submit"
              >
                Create
              </ButtonPrimary>
              <ButtonSecondary type="button" onClick={onCloseModalReportItem}>
                Cancel
              </ButtonSecondary>
            </div>
          </>
        )}
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

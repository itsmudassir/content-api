import React, { useEffect, useRef, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import NcModal from "../NcModal/NcModal";
import Textarea from "../Textarea/Textarea";
import ButtonPrimary from "../Button/ButtonPrimary";
import ButtonSecondary from "../Button/ButtonSecondary";
import { RadioGroup } from "@headlessui/react";
import twFocusClass from "../../utils/twFocusClass";
import { useCreateFolderMutation } from "../../app/Api/contentApi";
// import ArchiveFilterListBox from "../ArchiveFilterListBox/ArchiveFilterListBox";
import Input from "../Input/Input";

const CreateFolderModal = ({ id, show, onCloseModalReportItem }) => {
  const textareaRef = useRef(null);
  const history = useHistory();
  const [folderName, setFolderName] = useState();
  const [createFolder, createFolderObj] = useCreateFolderMutation();

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

  const handleClickSubmitForm = (e) => {
    // e.preventDefault();
    createFolder({ folderName: folderName });
    history.push("/topics");
  };
  const renderContent = () => {
    return (
      <form action="#">
        {/* TEXAREA MESSAGER */}

        <div className="mt-1">
          {/* <ArchiveFilterListBox /> */}

          <h6 className="text-xs text-neutral-700 dark:text-neutral-200">
            Folder Name
          </h6>
          {/* <span className="text-sm text-neutral-6000 dark:text-neutral-400">
            Please provide any additional information or context that will help
            us understand and handle the situation.
          </span> */}
          {/* <Textarea
            placeholder="enter folder name"
            className="mt-3"
            ref={textareaRef}
            required={true}
            rows={4}
            id="report-message"
            onChange={(e) => setFolderName(e.target.value)}
          /> */}
          <Input
            type="text"
            placeholder="Enter Folder Name"
            className="mt-1"
            required={true}
            id="report-message"
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>
        <div className="mt-3 space-x-6">
          <ButtonPrimary
            // className="w-10 h-10 bg-primary-000"
            onClick={(e) => handleClickSubmitForm(e)}
            type="submit"
          >
            Create
          </ButtonPrimary>
          <ButtonSecondary
            // className="w-10 h-10"
            type="button"
            onClick={onCloseModalReportItem}
          >
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      // className="h-140 w-80 my-5 overflow-hidden text-left align-middle transition-all transform bg-white border border-black border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300"
      isOpenProp={show}
      onCloseModal={onCloseModalReportItem}
      contentExtraClass="max-w-screen-sm h-140 w-80"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="Create Folder"
    />
  );
};

export default CreateFolderModal;

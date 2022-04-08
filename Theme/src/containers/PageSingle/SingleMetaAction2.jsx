import React from "react";
import { SOCIALS_DATA } from "../../components/SocialsShare/SocialsShare";
import NcDropDown from "../../components/NcDropDown/NcDropDown";
import ShareBtnDropDown from "../../components/ShareBtnDropDown/ShareBtnDropDown";

const SingleMetaAction2 = ({ className = "", meta }) => {
  // console.log(meta)
  return (
    <div  className={`nc-SingleMetaAction2 ${className}`}>
      <div className="flex flex-row space-x-2.5 items-center">
        <div className="px-1">
          <div className="border-l border-neutral-200 dark:border-neutral-700 h-6" />
        </div>

        <ShareBtnDropDown cardData={meta} />

        {/* <NcDropDown
          className="flex-shrink-0 flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full"
          renderTrigger={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          )}
          onClick={() => {}}
          data={SOCIALS_DATA}
        /> */}
      </div>
    </div>
  );
};

export default SingleMetaAction2;

import React from "react";
import ShareBtnDropDown from "../../components/ShareBtnDropDown/ShareBtnDropDown";
import { PaperClipIcon } from "@heroicons/react/outline"


const SingleMetaAction2 = ({ className = "", meta }) => {
  const url = meta?.fields?.url || meta?.url;
  return (
    <div className={`nc-SingleMetaAction2 ${className}`}>
      <div className="flex flex-row space-x-2.5 items-center">
        <div className="px-1">
          <div className="border-l border-neutral-200 dark:border-neutral-700 h-6" />
        </div>
        <a title="Visit Source" href={url} target="_blank">
        <PaperClipIcon  className="w-9 h-9 p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full text-white"/>
        </a>
        <div title="Share on social media">
          <ShareBtnDropDown cardData={meta} />
        </div>
        
      </div>
    </div>
  );
};

export default SingleMetaAction2;

import React from "react";
import ShareBtnDropDown from "../../components/ShareBtnDropDown/ShareBtnDropDown";

const SingleMetaAction2 = ({ className = "", meta }) => {
  return (
    <div className={`nc-SingleMetaAction2 ${className}`}>
      <div className="flex flex-row space-x-2.5 items-center">
        <div className="px-1">
          <div className="border-l border-neutral-200 dark:border-neutral-700 h-6" />
        </div>

        <ShareBtnDropDown cardData={meta} />
      </div>
    </div>
  );
};

export default SingleMetaAction2;

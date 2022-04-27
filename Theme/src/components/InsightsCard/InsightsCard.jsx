import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

const InsightsCard = ({ title, values, hasIcons }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-start border-slate-300 w-[100%] md:w-[30%] py-2 px-3 md:py-5 md:px-3 md:mx-1 my-1 border rounded-xl">
        <p className="mb:0 sm:mb-3 text-sm font-semibold text-slate-500">
          {title}
        </p>
        {!hasIcons ? (
          <>
            <p className="text:md sm:text-lg font-semibold">{parseFloat(values).toFixed(2)}</p>
          </>
        ) : (
          <>
            <div className="flex justify-start items-center">
              {/* facebook icon */}
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-blue-600 text-lg sm:text-xl"
              />
              &nbsp;
              <p className="text:md sm:text-lg font-semibold">&nbsp;{parseFloat(values?.facebook).toFixed(2)}&nbsp;&nbsp;&nbsp;|</p>
              &nbsp;
              &nbsp;
              {/* twitter icon */}
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-blue-600 text-lg sm:text-xl"
              />
              &nbsp;
              <p className="text:md sm:text-lg font-semibold">&nbsp;{parseFloat(values?.twitter).toFixed(2)}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InsightsCard;

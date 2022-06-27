import React, { FC } from "react";
import NcImage from "../NcImage/NcImage";
import rightImgDemo from "../../images/BecomeAnAuthorImg.png";
import ButtonPrimary from "../Button/ButtonPrimary";
import { SearchIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";

const SectionBecomeAnAuthor = ({ className = "", rightImg = rightImgDemo }) => {
  const history = useHistory();

  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
        <span className="flex items-center space-x-3 mb-10">
          <SearchIcon
            className="w-10 h-10 text-white p-2 bg-black rounded-full"
            style={{ transform: "scaleX(-1)" }}
          />
          <p> Discover Trending Content</p>
        </span>
        <h2 className="font-semibold text-3xl sm:text-4xl mt-3">
          Find and share the best content on social media
        </h2>
        <span className="block mt-8 text-neutral-500 dark:text-neutral-400">
          Become an industry leader by searching for high-quality content from
          the Web, Twitter, and YouTube and sharing it on your social channels.
          Moreover, search for influencers who matter and analyze their KPIs.
        </span>
        <ButtonPrimary
          onClick={() => history.push(`register`)}
          className="mt-8"
        >
          Start your free trial
        </ButtonPrimary>
        <div className="flex items-center space-x-3 mt-12 ml-2">
          <p className="font-bold text-sm">Integrated with</p>
          <i className="lab la-facebook-f text-lg text-white bg-blue-500 p-2 rounded-full" />
          <i className="lab la-twitter text-lg text-white bg-blue-400 p-2 rounded-full" />
          <i className="lab la-linkedin-in text-lg text-white bg-blue-600 p-2 rounded-full" />
        </div>
      </div>

      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;

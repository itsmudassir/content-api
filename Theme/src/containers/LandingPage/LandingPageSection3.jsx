import React, { FC } from "react";
import NcImage from "../../components/NcImage/NcImage";
import section3Image from "../../images/section3-Image.png";
import { SearchIcon } from "@heroicons/react/outline";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import three60Image from "../../images/360.JPG";
import search from "../../images/search.JPG";
import filter from "../../images/filter.JPG";
import insights from "../../images/insights.JPG";

const LandingPageSection3 = ({ className = "", rightImg = section3Image }) => {
  return (
    <>
      <div
        className={`px-5 nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-start  ${className}`}
        data-nc-id="SectionBecomeAnAuthor"
      >
        <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
          <span className="flex items-center space-x-3 mb-10">
            <SearchIcon
              className="w-10 h-10 text-white p-2 bg-black rounded-full"
              style={{ transform: "scaleX(-1)" }}
            />
            <p>Search</p>
          </span>
          <h2 className="font-semibold text-3xl sm:text-4xl mt-3">
            Search, curate, and share top content in your Industry
          </h2>
          <span className="block mt-8 text-neutral-500 dark:text-neutral-400">
            Search content by keywords to get results that people have liked and
            shared. Understand what’s working with topic insights revealing true
            statistics.
          </span>
        </div>

        <div className="flex-grow">
          <NcImage src={rightImg} />
        </div>
      </div>

      {/* cards div */}
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-7 mt-12 w-full">
        <SimpleCard
          title="360 Degree Search"
          desc="Search for articles from the web, videos on YouTube, and what's trending on Twitter from one single platform"
          image={three60Image}
          className="md:h-96 lg:h-56"
        />
        <SimpleCard
          title="Broaden Your Search Horizon"
          desc="Search for articles from the web, videos on YouTube, and trending on Twitter from one platform."
          image={search}
          className="md:h-96 lg:h-56"
        />
        <SimpleCard
          title="Powerful Filters"
          desc="Filter search results by engagement across socials, time periods, regions, and language to get targeted content."
          image={filter}
          className="md:h-96 lg:h-56"
        />
        <SimpleCard
          title="Content Insights"
          desc="Get a wide array of analytics about how a particular topic is performing and stay informed about what to publish"
          image={insights}
          className="md:h-96 lg:h-56"
        />
      </div>
    </>
  );
};

export default LandingPageSection3;

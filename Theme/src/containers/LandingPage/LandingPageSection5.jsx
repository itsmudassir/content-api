import React from "react";
import NcImage from "../../components/NcImage/NcImage";
import section5Image from "../../images/section5-Image.png";
import { SearchIcon } from "@heroicons/react/outline";
import SimpleCard from "../../components/SimpleCard/SimpleCard";
import topicOverview from "../../images/topicOverview.JPG";
import topDomains from "../../images/topDomains.JPG";
import topAuthors from "../../images/topAuthors.JPG";
import contentKPIs from "../../images/contentKPIs.JPG";

const LandingPageSection5 = ({ className = "", rightImg = section5Image }) => {
  return (
    <>
      <div
        className={`px-5 nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-start ${className}`}
        data-nc-id="SectionBecomeAnAuthor"
      >
        <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
          <span className="flex items-center space-x-3 mb-10">
            <SearchIcon
              className="w-10 h-10 text-white p-2 bg-black rounded-full"
              style={{ transform: "scaleX(-1)" }}
            />
            <p>Content Insights</p>
          </span>
          <h2 className="font-semibold text-3xl sm:text-4xl mt-3">
            Get the complete picture of a topic’s performance w.r.t its total
            engagement
          </h2>
          <span className="block mt-8 text-neutral-500 dark:text-neutral-400">
            Create your personal library of top content sources and access
            relevant articles as they get published. Discover, read, and share
            the best content
          </span>
        </div>

        <div className="flex-grow">
          <NcImage src={rightImg} />
        </div>
      </div>

      {/* cards div */}
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-7 mt-12 w-full">
        <SimpleCard
          title="Topic Overview"
          desc="Get the complete picture of a topic’s performance w.r.t its total engagement."
          image={topicOverview}
          className="md:h-96 lg:h-56"
        />
        <SimpleCard
          title="Top Domains"
          desc="See top domains that regularly publish great content on a particular topic and add them."
          image={topDomains}
          className="md:h-96 lg:h-56"
        />
        <SimpleCard
          title="Top Authors"
          desc="Identify the best authors who produce the best content in your niche."
          image={topAuthors}
          className="md:h-96 lg:h-56"
        />
        <SimpleCard
          title="Content KPIs"
          desc="Assess metrics such as word count, reading levels, popular publishing days to fine tune your content strategy."
          image={contentKPIs}
          className="md:h-96 lg:h-56"
        />
      </div>
    </>
  );
};

export default LandingPageSection5;

import React, { useState } from "react";
import Heading from "../Heading/Heading";
import CardCategory4 from "../CardCategory4/CardCategory4";
import { CategoryImage } from "../../data/CategoryImages";
import "./SectionSliderNewCategories.css";
import LoadingVideo from "../LoadingVideo/LoadingVideo";
import { useGetAllFollowedTopicsQuery } from "../../app/Api/contentApi";

const renderCard = (entry, index, searchkitOutput) => {
  let categoryimage = CategoryImage(entry.label);
  return (
    <>
      <CardCategory4
        label={entry.label}
        count={entry.count}
        index={index}
        categoryimage={categoryimage}
        searchkitOutput={searchkitOutput}
        isFollowing={entry.isFollowing}
      />
    </>
  );
};

const categoriesFilter = [
  "game",
  "computers",
  "crime",
  "money",
  "war",
  "conspiracy",
  "shopping",
  "travel",
  "marriage",
  "weight loss",
  "humour",
  "movies",
  "drugs",
  "doctors",
  "photography",
  "food",
  "books",
  "comics",
  "space",
  "recipe",
  "security",
];
const SectionSliderNewCategories = ({
  heading,
  subHeading,
  searchkitOutput,
}) => {
  // states
  const [showAll, setShowAll] = useState(false);
  const rtkData = useGetAllFollowedTopicsQuery();
  let newData = [];
  let followedTopics = {};

  rtkData.data?.forEach((item) => {
    followedTopics[item.topic] = item.topic;
  });

  searchkitOutput.data?.results?.facets.forEach((item) => {
    if (item.identifier == "category") {
      return item?.entries?.forEach((entry) => {
        if (followedTopics[entry.label] == undefined) {
          newData.push({ ...entry, isFollowing: false });
        } else {
          newData.push({ ...entry, isFollowing: true });
        }
      });
    }
  });

  if (searchkitOutput.error) {
    console.log("ERROR FETCHING CATEGORIES:" + searchkitOutput.error);
  }

  return (
    <>
      <Heading desc={subHeading} hasNextPrev>
        {heading}
      </Heading>

      {!searchkitOutput.loading ? (
        <>
          {!showAll ? (
            // selected categories list
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
                {newData?.map((entry, index) => {
                  if (categoriesFilter.includes(entry.label))
                    return (
                      <div key={index}>
                        {renderCard(entry, index, searchkitOutput)}
                      </div>
                    );
                })}
              </div>
              <div className="mt-10 mb-10 flex justify-center items-center">
                <button
                  className="rounded-full px-3 py-2 border-2 font-normal bg-slate-200 hover:bg-slate-300"
                  onClick={() => setShowAll(!showAll)}
                >
                  Show me more
                </button>
              </div>
            </>
          ) : (
            // All categories list
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
                {newData?.map((entry, index) => {
                  return (
                    <div key={index}>
                      {renderCard(entry, index, searchkitOutput)}
                    </div>
                  );
                })}
              </div>
              <div className="mt-10 mb-10 flex justify-center items-center">
                <button
                  className="rounded-full px-3 py-2 border-2 font-normal bg-slate-200 hover:bg-slate-300"
                  onClick={() => setShowAll(!showAll)}
                >
                  Show less
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <LoadingVideo />
        </div>
      )}
    </>
  );
};

export default SectionSliderNewCategories;

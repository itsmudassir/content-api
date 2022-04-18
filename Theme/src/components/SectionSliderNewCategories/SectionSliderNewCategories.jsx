import React, { FC, useEffect } from "react";
import Heading from "../Heading/Heading";
import { useSearchkitVariables, useSearchkit } from "@searchkit/client";
import { withSearchkit, withSearchkitRouting } from "@searchkit/client";
import CardCategory4 from "../CardCategory4/CardCategory4";
import { CategoryImage } from "../../data/CategoryImages";
import "./Removedot.css";
import LoadingVideo from "../LoadingVideo/LoadingVideo";



const renderCard = (entry, index,searchkitOutput) => {
  let categoryimage = CategoryImage(entry.label);
  return (
    <>
      <CardCategory4
        label={entry.label}
        count={entry.count}
        index={index}
        categoryimage={categoryimage}
        searchkitOutput={searchkitOutput}
      />
    </>
  );
};
const SectionSliderNewCategories = ({
  heading,
  subHeading,
  className = "",
  itemClassName = "",
  categories,
  itemPerRow = 5,
  categoryCardType = "card3",
  searchkitOutput
}) => {
  

  if (searchkitOutput.error) {
    console.log("Error " + searchkitOutput.error);
  }
  // if (searchkitOutput.loading) {
  //   <LoadingVideo />;
  // }

  return (
    <>
      <Heading desc={subHeading} hasNextPrev>
        {heading}
      </Heading>

      {!searchkitOutput.loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
          {searchkitOutput.data.results.facets.map((items) => {
            if (items.identifier == "category") {
              return items.entries.map((entry, index) => {
                // if(entry.title== "war" ||entry.title== "computers" ||entry.title== "islam")
                return (
                  <ul className="rem">
                    <li key={index}>{renderCard(entry, index, searchkitOutput)}</li>
                  </ul>
                );
              });
            }
          })}
        </div>
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

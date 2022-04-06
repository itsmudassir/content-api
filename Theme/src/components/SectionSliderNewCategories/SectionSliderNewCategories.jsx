import React, { FC, useEffect } from "react";
import Heading from "../Heading/Heading";
import { gql, useQuery } from "@apollo/client";
import { useSearchkitVariables, useSearchkit } from "@searchkit/client";
import { withSearchkit, withSearchkitRouting } from "@searchkit/client";
import CardCategory4 from "../CardCategory4/CardCategory4";
import { CategoryImage } from "../../data/CategoryImages";
import "./Removedot.css";
import LoadingVideo from "../LoadingVideo/LoadingVideo";

const query = gql`
  query resultSet(
    $query: String
    $filters: [SKFiltersSet]
    $page: SKPageInput
  ) {
    results(query: $query, filters: $filters) {
      hits(page: $page) {
        __typename
      }
      facets {
        identifier
        type
        label
        display
        entries {
          label
          count
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;
const renderCard = (entry, index) => {
  let categoryimage = CategoryImage(entry.label);
  return (
    <>
      <CardCategory4
        label={entry.label}
        count={entry.count}
        index={index}
        categoryimage={categoryimage}
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
}) => {
  const variables = useSearchkitVariables();
  const { data, error, loading } = useQuery(query, { variables });

  if (error) {
    console.log("Error " + error);
  }
  if (loading) {
    <LoadingVideo />;
  }

  return (
    <>
      <Heading desc={subHeading} hasNextPrev>
        {heading}
      </Heading>

      {!loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
          {data.results.facets.map((items) => {
            if (items.identifier == "category") {
              return items.entries.map((entry, index) => {
                return (
                  <ul className="rem">
                    <li key={index}>{renderCard(entry, index)}</li>
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

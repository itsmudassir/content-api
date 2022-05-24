
import Card3Small from "../Card3Small/Card3Small";
import WidgetHeading1 from "../WidgetHeading1/WidgetHeading1";
import { PostDataType } from "../../data/types";
import React, { useEffect, useState } from "react";
import { useSearchkitVariables, useSearchkit } from "@searchkit/client";
import cogoToast from "cogo-toast";
import { gql, useQuery } from "@apollo/client";


const query = gql`
  query resultSet(
    $query: String
    $filters: [SKFiltersSet]
    $page: SKPageInput
    $sortBy: String
  ) {
    results(query: $query, filters: $filters) {
      summary {
        total
        appliedFilters {
          id
          identifier
          display
          label
          ... on DateRangeSelectedFilter {
            dateMin
            dateMax
            __typename
          }

          ... on ValueSelectedFilter {
            value
            __typename
          }
          __typename
        }
        sortOptions {
          id
          label
          __typename
        }
        query
        __typename
      }
      hits(page: $page, sortBy: $sortBy) {
        page {
          total
          totalPages
          pageNumber
          from
          size
          __typename
        }
        sortedBy

        items {
          ... on ResultHit {
            id
            fields {
              article_length
              category
              authors
              date_download
              language
              facebook_shares
              sentiment
              url
              readtime
              image_url
              twitter_shares
              maintext
              source_domain
              title
              __typename
            }
            __typename
          }
          __typename
        }
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

const WidgetPosts= ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  posts=null,
  customTopic

}) => {

   // SEARCH-KIT
   const api = useSearchkit();
   const variables = useSearchkitVariables();

   var { data, error, loading } = useQuery(query, { variables });
 
   if (error) {
     cogoToast.error("This is a error message", {
       position: "top-left",
     });
   }
 
   useEffect(() => {
    api.setSearchState(customTopic);
    api.search();

  }, [customTopic]);

  console.log(customTopic, "in widgetposts")
  return (
    <>
{customTopic ?(
    <div
      className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetPosts"
    >
      <WidgetHeading1
        title="🎯 Popular Posts"
        // viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {data? (data.results?.hits.items?.slice(0, 7).map((post) => {
          return(
            <Card3Small
            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            key={post.id}
            post={post.fields}
          />
          )
        })) : "There occured an error"}
      </div>
    </div>):(null)}

{posts ?(
    <div
      className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetPosts"
    >
      <WidgetHeading1
        title="🎯 Popular Posts"
        // viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {posts? (posts.results?.hits.items?.slice(0, 7).map((post) => {
          return(
            <Card3Small
            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            key={post.id}
            post={post.fields}
          />
          )
        })) : "There occured an error"}
      </div>
    </div>):(null)}
    </>
  );
};

export default WidgetPosts;
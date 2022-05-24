import Card3Small from "../Card3Small/Card3Small";
import WidgetHeading1 from "../WidgetHeading1/WidgetHeading1";
import { PostDataType } from "../../data/types";
import React, { FC, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useSearchkitVariables, useSearchkit } from "@searchkit/client";




const WidgetPosts = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  posts,
  customTopic,
}) => {
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
  // SEARCH-KIT
  const api = useSearchkit();
  const variables = useSearchkitVariables();
  if (variables?.page.size) {
    variables.page.size = 20;
  }

  var { data, error, loading } = useQuery(query, { variables });

  const customState1 = {
    query: "",
    sortBy: "relevance",

    filters: [
      {
        identifier: "CustomFilter",
        value: customTopic,
      },
    ],
    page: {
      size: 8,
      from: 0,
    },
  };
  useEffect(() => {
    api.setSearchState(customState1);
    api.search();
  }, []);
  
  //console.log(posts.results?.hits.items[0].fields, "in widgetposts")
  
  if (!customTopic){
    return <div>Loading...</div>
  }
  
  if (!data){
    return <div>Loading...</div>
  }
  
  if(loading){
    return <div>Loading...</div>
  }



  return (
    <div
      className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetPosts"
    >
      <WidgetHeading1
        title="🎯 Popular Posts"
        // viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {data
          ? data.results?.hits.items?.slice(0, 7).map((post) => {
              return (
                <Card3Small
                  className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  key={post.id}
                  post={post.fields}
                />
              );
            })
          : <div>Error loading data.</div>}
      </div>
    </div>
  );
};

export default WidgetPosts;

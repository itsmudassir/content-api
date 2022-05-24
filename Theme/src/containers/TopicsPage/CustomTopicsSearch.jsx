import React, { useEffect, useState } from "react";
import LoadingVideo from "../../components/LoadingVideo/LoadingVideo";
import ArchiveFilterListBox from "../../components/ArchiveFilterListBox/ArchiveFilterListBox";
import LanguagesFilterBox from "../../components/LanguagesFilterBox/LanguagesFilterBox";
import { Helmet } from "react-helmet";
import Card11 from "../../components/Card11/Card11";
import { useLocation } from "react-router-dom";
import SearchBoxMain from "../../components/SearchBoxMain/SearchBoxMain";
import DateRangeDropDown from "../../components/DateRangeCalender/DateRangeDropDown";
import CustomPagination from "../../components/Pagination/CustomPagination.jsx";
import RelevanceListBox from "../../components/RelevanceListBox/RelevanceListBox";
import {
  useGetAllFavouritePostsbyUserQuery,
  useIsFollowingTopicMutation,
  useCreateFollowedTopicMutation,
  useDeleteFollowedTopicMutation,
} from "../../app/Api/contentApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
import cogoToast from "cogo-toast";
import { useSearchkitVariables, useSearchkit } from "@searchkit/client";
import { gql, useQuery } from "@apollo/client";


const gqlQuery = gql`
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
              readtime
              sentiment
              url
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



const CustomTopicsSearch = ({ className = "", customTopic }) => {
  // states


  //   SearchKit data
  const api = useSearchkit();
  const variables = useSearchkitVariables();
  const { data, loading, error } = useQuery(gqlQuery, { variables });
   console.log(data)
  useEffect(() => {
    api.setSearchState(customTopic);
    api.search();

  }, [customTopic]);

  return (
    <>
    here
    </>
  );
};

// export default withSearchkit(withSearchkitRouting(PageSearch));
export default CustomTopicsSearch;

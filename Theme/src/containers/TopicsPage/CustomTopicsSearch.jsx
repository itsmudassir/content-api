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



const CustomTopicsSearch = ({ className = "", topicData }) => {
  console.log(topicData);
  // states

  // RTK-Query
  const RtkData = useGetAllFavouritePostsbyUserQuery();

  // Global variable
  let newData;

  // search params || URL params
  const { search } = useLocation();
  var { customCateogry, customQuery } = queryString.parse(search);

  //   SearchKit data
  const api = useSearchkit();
  const variables = useSearchkitVariables();
  const { data, loading, error } = useQuery(gqlQuery, { variables });

//    // USE-EFFECTS
//    useEffect(() => {
//     let filterObj = [{ bodyORtitle: bodyORtitle }];
//     if (any_keywords_list.length !== 0) {
//       filterObj.push({
//         any_keywords_list: any_keywords_list,
//       });
//     }
//     if (must_also_keywords_list.length !== 0) {
//       filterObj.push({
//         must_also_keywords_list: must_also_keywords_list,
//       });
//     }
//     if (must_not_contains_keywords_list.length !== 0) {
//       filterObj.push({
//         must_not_contains_keywords_list: must_not_contains_keywords_list,
//       });
//     }
//     if (exclude_domains_list.length !== 0) {
//       filterObj.push({
//         exclude_domains_list: exclude_domains_list,
//       });
//     }
//     if (limit_domains_results_list.length !== 0) {
//       filterObj.push({
//         limit_domains_results_list: limit_domains_results_list,
//       });
//     }
//     if (startDate !== null) {
//       filterObj.push({
//         startDate: startDate,
//       });
//     }
//     if (endDate !== null) {
//       filterObj.push({
//         endDate: endDate,
//       });
//     }
//     if (language !== null) {
//       filterObj.push({
//         language: language,
//       });
//     }
//     if (engagement !== null) {
//       filterObj.push({
//         engagement: engagement,
//       });
//     }

//     console.log("CUSTOM TOPIC ", filterObj);
//     let jsonob = JSON.stringify(filterObj);

//     const customState = {
//       query: "",
//       sortBy: engagement,

//       filters: [
//         {
//           identifier: "CustomFilter",
//           value: jsonob 
  
//         },
//       ],
//       page: {
//         size: 8,
//         from: 0,
//       },
//     };

//     api.setSearchState(customState);
//     api.search();
//   }, [
//     engagement,
//     language,
//     endDate,
//     startDate,
//     bodyORtitle,
//     exclude_domains_list,
//     any_keywords_list,
//     must_also_keywords_list,
//     must_not_contains_keywords_list,
//     limit_domains_results_list,
//   ]);
  

  if (data) {
    var sortOptions = data?.results.summary.sortOptions;
    // const langaugeList = data?.results.facets[5].entries;
    var langaugeList = data?.results.facets.filter(
      (item) => item.identifier == "language"
    )[0].entries;
  }


  if (data) {
    console.log(data);

    var allFavoriteFolder = {};
    RtkData?.data?.filter((item) => {
      if (item.post_id !== undefined) {
        return (allFavoriteFolder[item.post_id] = item.post_id);
      }
    });

    newData = data?.results?.hits?.items?.map((item) => {
      try {
        if (allFavoriteFolder[item.id] === undefined) {
          // return allFavoriteFolder[""];
          return { ...item, isLiked: false };
        } else {
          // console.log(item.id)
          return { ...item, isLiked: true };
        }
      } catch (error) {
        // return allFavoriteFolder[""];
      }
    });
    // console.log(newData);
  }

  if (error) {
    console.log("An error Occured" + error);
  }

  // if (loading) {
  //   return <div className="flex justify-center items-center mt-4">
  //     <LoadingVideo />
  //   </div>;
  // }

  return (
    <>
      <div className={`nc-PageSearch ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>Nc || Search Page Template</title>
        </Helmet>
        {/* <SearchBoxMain pageType="searchpage" category={customCateogry}/> */}
      </div>

      <hr className="mx-4 sm:mx-8 my-10 py-4" />

      <div className="container space-y-16 lg:space-y-28">
        <main>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex justify-start items-center space-x-2.5">
              {/* ============ Language filter dropdown Button =============== */}
              {!loading ? <LanguagesFilterBox lists={langaugeList} /> : null}

              {/* ============ Date Range =============== */}
              <DateRangeDropDown facet={data?.results?.facets} />
            </div>

            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-between items-center">
              {/* ========== follow button div ============  */}

              {/*======= relevence dropdown button ============*/}
              <RelevanceListBox lists={sortOptions} />
            </div>
          </div>

          {!loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">
              {newData ? (
                newData?.map((value, index) => {
                  return <Card11 key={index} cardvalue={value} />;
                })
              ) : (
                <h1>No Content Found</h1>
              )}
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

          <div
            className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            {/* <CustomPagination data={data?.results} /> */}
          </div>
        </main>
      </div>
    </>
  );
};

// export default withSearchkit(withSearchkitRouting(PageSearch));
export default CustomTopicsSearch;

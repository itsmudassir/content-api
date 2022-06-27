import React, { useEffect } from "react";
import LoadingVideo from "../../components/LoadingVideo/LoadingVideo";
import LanguagesFilterBox from "../../components/LanguagesFilterBox/LanguagesFilterBox";
import { Helmet } from "react-helmet";
import Card11 from "../../components/Card11/Card11";
import DateRangeDropDown from "../../components/DateRangeCalender/DateRangeDropDown";
import RelevanceListBox from "../../components/RelevanceListBox/RelevanceListBox";
import { useGetAllFavouritePostsbyUserQuery } from "../../app/Api/contentApi";
import { useSearchkitVariables, useSearchkit } from "@searchkit/client";
import { gql, useQuery } from "@apollo/client";
import dates from "../../data/globalVariables/globalDates";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import CustomPagination from "../../components/Pagination/CustomPagination.jsx";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import Heading from "../../components/Heading/Heading";

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

const TrendingNewsSearch = ({ className = "", category }) => {
  // local states
  let newData;
  console.log("FollowedTopicsSearch");
  // RTK-Query
  const RtkData = useGetAllFavouritePostsbyUserQuery();

  //   SearchKit data
  const api = useSearchkit();
  const variables = useSearchkitVariables();
  const { data, loading, error } = useQuery(gqlQuery, { variables });
  console.log(data);

  const { search } = useLocation();
  var { language, sortBy, startDate, endDate, page } =
    queryString.parse(search);

  useEffect(() => {
    const customState = {
      query: "",
      sortBy: "",
      filters: [
        {
          identifier: "date_download",
          dateMin: startDate ? startDate : dates.startDate,
          dateMax: endDate ? endDate : dates.endDate,
        },
      ],
      page: {
        size: 20,
        from: 0,
      },
    };

    if (category) {
      customState.filters.push({
        identifier: "category",
        value: category,
      });
    }
    if (sortBy) {
      customState.sortBy = sortBy;
    }

    if (language) {
      customState.filters.push({
        identifier: "language",
        value: language,
      });
    }

    if (page) {
      const sum = page * 20 - 20;
      customState.page.from = sum;
    }

    api.setSearchState(customState);
    api.search();
  }, [category, language, sortBy, startDate, endDate, page]);

  if (data) {
    var sortOptions = data?.results.summary.sortOptions;
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
          return { ...item, isLiked: false };
        } else {
          return { ...item, isLiked: true };
        }
      } catch (error) {}
    });
  }

  return (
    <>
      <div className={`nc-PageSearch ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>Contentgizmo</title>
        </Helmet>
      </div>

      <ScrollToTopButton />

      <hr className="mx-4 sm:mx-8 my-10 py-4" />

      <div className="container space-y-16 lg:space-y-28">
        <main>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 font-semibold">Trending News</p>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex justify-start items-center space-x-2.5">
              {/* ============ Language filter dropdown Button =============== */}
              {!loading ? <LanguagesFilterBox lists={langaugeList} /> : null}

              {/* ============ Date Range =============== */}
              <DateRangeDropDown />

              {/*======= relevence dropdown button ============*/}
              <RelevanceListBox lists={sortOptions} />
            </div>
          </div>

          {!loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">
              {newData?.length !== 0 ? (
                newData?.map((value, index) => {
                  return <Card11 key={index} cardvalue={value} />;
                })
              ) : (
                <p className="text-center text-slate-600">
                  Sorry, No articles available for this search.
                </p>
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
            <CustomPagination data={data?.results} />
          </div>
        </main>
      </div>
    </>
  );
};

export default TrendingNewsSearch;

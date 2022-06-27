import React, { useEffect } from "react";
import LoadingVideo from "../../components/LoadingVideo/LoadingVideo";
import LanguagesFilterBox from "../../components/CustomTopicLanguageSelect/CustomTopicLanguageSelect";
import { Helmet } from "react-helmet";
import Card11 from "../../components/Card11/Card11";
import DateRangeDropDown from "../../components/CustomTopicDateRange/DateRangeDropDown";
import RelevanceListBox from "../../components/CustomTopicSortSelect/CustomTopicSortSelect";
import { useGetAllFavouritePostsbyUserQuery } from "../../app/Api/contentApi";
import { useSearchkitVariables, useSearchkit } from "@searchkit/client";
import { gql, useQuery } from "@apollo/client";
import CustomPagination from "../../components/Pagination/CustomPagination.jsx";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import { useMemo } from "react";

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

const hardCodeLanguagesList = [
  {
    label: "English",
    count: 25190,
  },
  {
    label: "Greek",
    count: 515,
  },
  {
    label: "Spanish",
    count: 492,
  },
  {
    label: "German",
    count: 229,
  },
  {
    label: "Italian",
    count: 168,
  },
  {
    label: "French",
    count: 138,
  },
  {
    label: "Dutch",
    count: 129,
  },
  {
    label: "Russian",
    count: 60,
  },
  {
    label: "Romanian",
    count: 32,
  },
  {
    label: "Arabic",
    count: 30,
  },
  {
    label: "Japanese",
    count: 27,
  },
  {
    label: "Telugu",
    count: 13,
  },
  {
    label: "Portuguese",
    count: 8,
  },
  {
    label: "Turkish",
    count: 7,
  },
];

const CustomTopicsSearch = ({
  className = "",
  customTopic,
  setlanguage,
  setEngagement,
  setStartDate,
  setEndDate,
}) => {
  // states
  let newData;

  // RTK-Query
  const RtkData = useGetAllFavouritePostsbyUserQuery();

  //   SearchKit data
  const api = useSearchkit();
  const variables = useSearchkitVariables();
  const { data, loading, error } = useQuery(gqlQuery, { variables });
  console.log(data, "CustomTopicsSearch");

  useEffect(() => {
    api.setSearchState(customTopic);
    api.search();
  }, [customTopic]);

  // if (data) {
    var sortOptions = useMemo(() => data?.results.summary.sortOptions, [data]);
    var langaugeList = useMemo(
      () =>
        data?.results.facets.filter((item) => item.identifier == "language")[0]
          .entries,
      [data]
    );
  // }

  if (data) {
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
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex justify-start items-center space-x-2.5">
              {/* ============ Language filter dropdown Button =============== */}
              {!loading ? (
                <LanguagesFilterBox
                  setlanguage={setlanguage}
                  // lists={hardCodeLanguagesList}
                  lists={langaugeList}
                />
              ) : null}

              {/* ============ Date Range =============== */}
              <DateRangeDropDown
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />

              {/*======= relevence dropdown button ============*/}
              <RelevanceListBox
                setEngagement={setEngagement}
                lists={sortOptions}
              />
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

export default React.memo(CustomTopicsSearch);

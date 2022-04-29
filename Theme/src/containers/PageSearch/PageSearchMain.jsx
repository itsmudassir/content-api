import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import SearchBoxMain from "../../components/SearchBoxMain/SearchBoxMain";
import { Tab } from "@headlessui/react";
import PageSearch from "./PageSearch";
import { gql, useQuery } from "@apollo/client";
import { useSearchkitVariables, useSearchkit } from "@searchkit/client";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import PageInsights from "../PageInsights/PageInsights";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

const PageSearchMain = ({ className = "" }) => {
  const api = useSearchkit();
  const variables = useSearchkitVariables();
  // if (variables?.page.size) {
  //   variables.page.size = 20;
  // }
  const { search, location } = useLocation();
  var { customCateogry, customQuery } = queryString.parse(search);
  const { data, loading, error } = useQuery(gqlQuery, { variables });

  useEffect(() => {
    if (customQuery && !customCateogry) {
      console.log("ONLY QUERY", customQuery);

      const customState = {
        query: customQuery,
        sortBy: "",
        filters: [
          {
            identifier: "date_download",
            dateMin: "2022-01-16",
            dateMax: "2022-09-18",
          },
        ],
        page: {
          size: 20,
          from: 0,
        },
      };

      api.setSearchState(customState);
      api.search();
    }

    if (customCateogry && !customQuery) {
      console.log("ONLY CATEGORY");
      api.toggleFilter({
        identifier: "category",
        value: customCateogry,
      });
      api.toggleFilter({
        identifier: "date_download",
        dateMin: "2022-01-16",
        dateMax: "2022-09-18",
      });

      api.setPage({ size: 20, from: 0 });
      api.search();
    }
  }, [customCateogry, customQuery]);

  useEffect(() => {
    if (!customCateogry && !customQuery) {
      const customState = {
        query: "",
        sortBy: "",
        filters: [
          {
            identifier: "date_download",
            dateMin: "2022-01-16",
            dateMax: "2022-09-18",
          },
        ],
        page: {
          size: 20,
          from: 0,
        },
      };

      api.setSearchState(customState);
      api.search();
    }
  }, []);
  return (
    <>
      <div className={`nc-PageSearch ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>Nc || Search Page Template</title>
        </Helmet>
        <SearchBoxMain pageType="searchpage" category={customCateogry} />
      </div>

      {/* XXXXXXXXXXXXXXXXX>> TABS <<XXXXXXXXXXXXXXXXXXXX*/}

      <div className=" w-full px-2 py-5 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex justify-center items-center p-1 space-x-1  rounded-xl">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-40 py-2.5 text-sm leading-5 font-medium  rounded-xl",
                  "",
                  selected
                    ? "bg-slate-700 text-white"
                    : "text-black bg-gray-200 hover:text-black"
                )
              }
            >
              Content Feed
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-40 py-2.5 text-sm leading-5 font-medium  rounded-xl",
                  "",
                  selected
                    ? "bg-slate-700 text-white"
                    : "text-black bg-gray-200 hover:text-black"
                )
              }
            >
              Insights
            </Tab>
          </Tab.List>

          <div className="flex justify-center ">
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <PageSearch data={data} loading={loading} error={error} />
              </Tab.Panel>

              <Tab.Panel >
                  <PageInsights searchKitData={data}/>
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>

      {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
    </>
  );
};

// export default withSearchkit(withSearchkitRouting(PageSearchMain));
export default PageSearchMain;

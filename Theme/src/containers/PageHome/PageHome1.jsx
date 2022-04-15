import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import SectionSliderNewCategories from "../../components/SectionSliderNewCategories/SectionSliderNewCategories";
import SearchBoxMain from "../../components/SearchBoxMain/SearchBoxMain";
import PageSearch from "../../containers/PageSearch/PageSearch";
import { Tab } from "@headlessui/react";
import { useRouteMatch, Route, useHistory, Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useSearchkitVariables, useSearchkit } from "@searchkit/client";
import LoadingVideo from "../../components/LoadingVideo/LoadingVideo";
import PageCategory from "../PageCategory/PageCategory"
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

const PageHome1 = () => {
  //state
  const [searchQuery, setSearchQuery] = useState();

  // hooks
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const api = useSearchkit();
  const variables = useSearchkitVariables();

  const { data, loading, error } = useQuery(gqlQuery, { variables });

  useEffect(() => history.push(`${url}/discover_search`), []);

  useEffect(() => {
    // last 3 months date searchkit filter
    api.toggleFilter({
      identifier: "date_download",
      dateMin: "2022-02-17",
      dateMax: "2022-03-18",
    });
    // api.setSortBy("relevance");
    api.setPage({ size: 20, from: 0 });
    api.search();
    console.log(searchQuery, "XXXXXXXXXXXXXX");
  }, [searchQuery]);

  console.log(data, loading, error);

  // range: () => ({
  //     startDate: moment().endOf("day").toDate(),
  //     endDate: moment().subtract(3,'months').endOf("day").toDate()
  //   })
  // use moment js library to get today Date and 3 months date
  // the format should look like year-month-day
  //  take date fromat help from search kit react small project
  //-----------------
  return (
    <div className="nc-PageHome relative">
      <Helmet>
        <title>Home || Blog Magazine React Template</title>
      </Helmet>
      {/* {/ Call the  Auto Complete Search Box /} */}

      {!loading ? (
        <SearchBoxMain  setSearchQuery={setSearchQuery} />
      ) : (
        null
      )}
      {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}

      <div className=" w-full px-2 py-5 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex justify-center items-center p-1 space-x-1  rounded-xl">
            <Link to={`${url}/discover_search`}>
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
                // onClick={()=> history.push(`${url}/discover_search`)}
                // onClick={() => console.log("XXXXXXXXXX")}
              >
                Content Feed
              </Tab>
            </Link>

            <Link to={`${url}/discover_insights`}>
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
            </Link>

            <Link to={`${url}/discover_category`}>
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
                Topics
              </Tab>
            </Link>
          </Tab.List>

          <div className="flex justify-center">
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <Route exact path={`${path}/discover_search`}>
                  <PageSearch data={data} loading={loading} error={error} />
                </Route>
              </Tab.Panel>

              <Tab.Panel>
                <Route exact path={`${path}/discover_insights`}>
                  <h1>Tab 2</h1>
                </Route>
              </Tab.Panel>

              <Tab.Panel>
                <Route exact path={`${path}/discover_category`}>
                <PageCategory/>
                </Route>
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>

      {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
    </div>
  );
};

export default PageHome1;

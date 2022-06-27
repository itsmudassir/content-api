import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import SectionSliderNewCategories from "../../components/SectionSliderNewCategories/SectionSliderNewCategories";
import SBox from "../../components/SBox/SBox";
import { useSearchkitVariables, useSearchkit } from "@searchkit/client";
import { gql, useQuery } from "@apollo/client";
import PageSearchMain from "../../containers/PageSearch/PageSearchMain";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import dates from "../../data/globalVariables/globalDates";

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
  //listen for URL query-paramater
  const api = useSearchkit();
  const variables = useSearchkitVariables();
  const { search } = useLocation();
  // const prefetchFollowedTopics = usePrefetch("getAllFollowedTopics");
  // const prefetchCustomTopics = usePrefetch("getAllCustomTopics");
  // const prefetchFavFolders = usePrefetch("getAllFolders");
  console.log("SSSSSSSSSSSSSSSSSS");
  var {
    customCategory,
    customQuery,
    language,
    sortBy,
    startDate,
    endDate,
    page,
  } = queryString.parse(search);
  const searchkitOutput = useQuery(query, { variables });

  useEffect(() => {
    if (api.canResetSearch()) {
      api.setQuery("");
      // api.search();
    }
  }, []);

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
    console.log(searchkitOutput.data);
    if (customCategory) {
      customState.filters.push({
        identifier: "category",
        value: customCategory,
      });
    }
    if (sortBy) {
      customState.sortBy = sortBy;
    }
    if (customQuery) {
      customState.query = customQuery;
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
  }, [customCategory, customQuery, language, sortBy, startDate, endDate, page]);

  return (
    <div className="nc-PageHome relative ">
      <Helmet>
        <title>Contentgizmo</title>
      </Helmet>
      <SBox category={customCategory} />
      {/* {/ Call the  Auto Complete Search Box /} */}
      {customCategory == null &&
      customCategory == undefined &&
      customQuery == null &&
      customQuery == undefined ? (
        <div className="relative overflow-hidden pt-6">
          <div className="container relative">
            {/* {/ Category Cards /} */}
            <SectionSliderNewCategories
              searchkitOutput={searchkitOutput}
              className="py-16 lg:py-28"
              heading="Top Trending Topics"
              subHeading=""
              categoryCardType="card4"
            />
          </div>
        </div>
      ) : (
        <PageSearchMain searchKitData={searchkitOutput} />
      )}
    </div>
  );
};

export default PageHome1;

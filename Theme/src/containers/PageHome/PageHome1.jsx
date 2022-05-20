import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import SectionSliderNewCategories from "../../components/SectionSliderNewCategories/SectionSliderNewCategories";
import SearchBoxMain from "../../components/SearchBoxMain/SearchBoxMain";
import SBox from "../../components/SBox/SBox"
import { useSearchkitVariables, useSearchkit,  } from "@searchkit/client";
import { gql, useQuery } from "@apollo/client";

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


const PageHome1 = () => {
  const api = useSearchkit();
  const variables = useSearchkitVariables();
  const searchkitOutput = useQuery(query, { variables });

  useEffect(()=>{
    if(api.canResetSearch()){
      api.setQuery('')
      api.search()
    }
    // isLoading={loading}
    // onClick={() => {
    // }}
    // api.removeFiltersByIdentifier("category");
    // api.setQuery(null);
    // api.search();
  },[]);

  // const { data, error, loading } = useGetAllFavouritePostsbyUserQuery();
  // console.log(data);
  return (
    <div className="nc-PageHome relative ">
      <Helmet>
        <title>Home || Blog Magazine React Template</title>
      </Helmet>
      {/* {/ Call the  Auto Complete Search Box /} */}
      <SearchBoxMain pageType="categorypage" />
      <SBox pageType="categorypage"/>
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
    </div>
  );
};

export default PageHome1;

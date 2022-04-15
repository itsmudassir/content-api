import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import SectionSliderNewCategories from "../../components/SectionSliderNewCategories/SectionSliderNewCategories";
import SearchBoxMain from "../../components/SearchBoxMain/SearchBoxMain";
import { useGetAllFavouritePostsbyUserQuery } from "../../app/Api/contentApi";
import { useSearchkitVariables, useSearchkit,  } from "@searchkit/client";

const PageCategory = () => {
  const api = useSearchkit();

  useEffect(()=>{
    // if(api.canResetSearch()){
    //   api.setQuery('')
    //   api.search()
    // }
    // isLoading={loading}
    // onClick={() => {
    // }}
    api.removeFiltersByIdentifier("category");
    // api.setQuery(null);
    api.search();
  },[]);

  // const { data, error, loading } = useGetAllFavouritePostsbyUserQuery();
  // console.log(data);
  return (
    <div className="nc-PageHome relative ">
      <Helmet>
        <title>Home || Blog Magazine React Template</title>
      </Helmet>
      {/* {/ Call the  Auto Complete Search Box /} */}
      {/* <SearchBoxMain pageType="categorypage" /> */}
      
      <div className="relative overflow-hidden pt-6">
        <div className="container relative">
          {/* {/ Category Cards /} */}
          <SectionSliderNewCategories
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

export default PageCategory;
import React from "react";
import { Helmet } from "react-helmet";
import SectionSliderNewCategories from "../../components/SectionSliderNewCategories/SectionSliderNewCategories";
import SearchBoxMain from "../../components/SearchBoxMain/SearchBoxMain";
import { useGetAllFavouritePostsbyUserQuery } from "../../app/Api/contentApi";

const PageHome = () => {
  const { data, error, loading } = useGetAllFavouritePostsbyUserQuery();
  console.log(data);
  return (
    <div className="nc-PageHome relative ">
      <Helmet>
        <title>Home || Blog Magazine React Template</title>
      </Helmet>
      {/* {/ Call the  Auto Complete Search Box /} */}
      <SearchBoxMain />
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

export default PageHome;

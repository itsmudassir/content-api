import React from "react";
import { useGetAllFavouritePostsQuery } from "../../app/Api/contentApi";
import Card12 from "../../components/Card11/Card12";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

const FavouritePosts = ({ folderID }) => {
  const favouritePosts = useGetAllFavouritePostsQuery(folderID);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-9 sm:px-10 md:px-8 lg:px-4  md:gap-8 mt-8 lg:mt-10">
        <ScrollToTopButton />
        {favouritePosts?.data?.length !== 0 ? (
          favouritePosts?.data?.map((value, index) => {
            return <Card12 key={index} cardItems={value} />;
          })
        ) : (
          <p className="text-right text-slate-600">
            No articles available in this folder.
          </p>
        )}
      </div>
    </>
  );
};

export default FavouritePosts;

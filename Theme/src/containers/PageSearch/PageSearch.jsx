import React, { useEffect, useState } from "react";
import LoadingVideo from "../../components/LoadingVideo/LoadingVideo";
import ArchiveFilterListBox from "../../components/ArchiveFilterListBox/ArchiveFilterListBox";
import LanguagesFilterBox from "../../components/LanguagesFilterBox/LanguagesFilterBox";
import { Helmet } from "react-helmet";
import { gql, useQuery } from "@apollo/client";
import { useSearchkitVariables, useSearchkit } from "@searchkit/client";
import {
  withSearchkit,
  withSearchkitRouting,
  useSearchkitQueryValue,
} from "@searchkit/client";
import Card11 from "../../components/Card11/Card11";
import { useLocation } from "react-router-dom";
import SearchBoxMain from "../../components/SearchBoxMain/SearchBoxMain";
import DateRangeDropDown from "../../components/DateRangeCalender/DateRangeDropDown";
import CustomPagination from "../../components/Pagination/CustomPagination.jsx";
import RelevanceListBox from "../../components/RelevanceListBox/RelevanceListBox";
import { useGetAllFavouritePostsbyUserQuery } from "../../app/Api/contentApi";
import Select from "react-select";

export const PageSearchProps = {
  className: String,
};

const PageSearch = ({ className = "", data, loading, error }) => {
  const RtkData = useGetAllFavouritePostsbyUserQuery();
  let newData;
  const api = useSearchkit();

  if (data) {
    var sortOptions = data?.results.summary.sortOptions;
    // const langaugeList = data?.results.facets[5].entries;
    var langaugeList = data?.results.facets.filter(
      (item) => item.identifier == "language"
    )[0].entries;
    // console.log(langaugeList);
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
let val;
  return (
    <>
      <div className={`nc-PageSearch ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>Nc || Search Page Template</title>
        </Helmet>
        {/* <SearchBoxMain pageType="searchpage" category={customCateogry}/> */}
      </div>



      <div className="container py-10 lg:py-28 space-y-16 lg:space-y-28">
        <main>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5">
              {!loading ? <LanguagesFilterBox lists={langaugeList} /> : null}

              <DateRangeDropDown facet={data?.results?.facets} />
            </div>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
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
export default PageSearch;

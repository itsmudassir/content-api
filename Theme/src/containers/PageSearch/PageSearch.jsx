import React, { useEffect, useState } from "react";
import LoadingVideo from "../../components/LoadingVideo/LoadingVideo";
import ArchiveFilterListBox from "../../components/ArchiveFilterListBox/ArchiveFilterListBox";
import LanguagesFilterBox from "../../components/LanguagesFilterBox/LanguagesFilterBox";
import { Helmet } from "react-helmet";
import Card11 from "../../components/Card11/Card11";
import { useLocation } from "react-router-dom";
import SearchBoxMain from "../../components/SearchBoxMain/SearchBoxMain";
import DateRangeDropDown from "../../components/DateRangeCalender/DateRangeDropDown";
import CustomPagination from "../../components/Pagination/CustomPagination.jsx";
import RelevanceListBox from "../../components/RelevanceListBox/RelevanceListBox";
import {
  useGetAllFavouritePostsbyUserQuery,
  useIsFollowingTopicMutation,
  useCreateFollowedTopicMutation,
  useDeleteFollowedTopicMutation,
} from "../../app/Api/contentApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
import cogoToast from "cogo-toast";

const PageSearch = ({ className = "", data, loading, error }) => {
  // states
  const [isFollowing, setIsFollowing] = useState(false);

  // RTK-Query
  const [isFollingTopic, isFollingTopic_obj] = useIsFollowingTopicMutation();
  const RtkData = useGetAllFavouritePostsbyUserQuery();
  const [createFollowedTopic, createFollowedTopic_Obj] =
    useCreateFollowedTopicMutation();
  const [deleteFollowedTopic, deleteFollowedTopic_Obj] =
    useDeleteFollowedTopicMutation();

  // Global variable
  let newData;

  // search params || URL params
  const { search } = useLocation();
  var { customCateogry, customQuery } = queryString.parse(search);

  // handlers
  const followTopicHandler = async () => {
    try {
      const res = await createFollowedTopic({ topicName: customCateogry });
      if (res.data) {
        cogoToast.success(res.data?.successMsg);
        setIsFollowing(true);
      }
      if (res.error) {
        cogoToast.error(res.error?.data?.errorMsg);
        setIsFollowing(false);
      }
      console.log(res);
    } catch (err) {
      console.log("Error occoured while creating topic", err);
      console.log(
        "Error occoured while creating topic",
        createFollowedTopic_Obj
      );
    }
  };

  const unFollowTopicHandler = async () => {
    try {
      const res = await deleteFollowedTopic({ topicName: customCateogry });
      setIsFollowing(false);
      if (res.data) {
        cogoToast.success(res.data?.successMsg);
      }
      if (res.error) {
        cogoToast.success(res.error?.data?.errorMsg);
      }
      console.log(res);
    } catch (err) {
      console.log("Error occoured while creating topic", err);
      console.log(
        "Error occoured while creating topic",
        deleteFollowedTopic_Obj
      );
    }
  };

  
  if (data) {
    var sortOptions = data?.results.summary.sortOptions;
    // const langaugeList = data?.results.facets[5].entries;
    var langaugeList = data?.results.facets.filter(
      (item) => item.identifier == "language"
    )[0].entries;
  }

  
  // useEffects
  useEffect(async () => {
    try {
      const res = await isFollingTopic({ topicName: customCateogry });
      setIsFollowing(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("ERROR OCCOURED WHILE FETCHING SINGLE TOPIC NAME", err);
      console.log(isFollingTopic_obj.error);
    }
  }, []);

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

  return (
    <>
      <div className={`nc-PageSearch ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>Nc || Search Page Template</title>
        </Helmet>
        {/* <SearchBoxMain pageType="searchpage" category={customCateogry}/> */}
      </div>

      <hr className="mx-4 sm:mx-8 my-10 py-4" />

      <div className="container space-y-16 lg:space-y-28">
        <main>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex justify-start items-center space-x-2.5">
              {/* ============ Language filter dropdown Button =============== */}
              {!loading ? <LanguagesFilterBox lists={langaugeList} /> : null}

              {/* ============ Date Range =============== */}
              <DateRangeDropDown facet={data?.results?.facets} />

              {/* ========== follow button div ============  */}
              <div className="hidden sm:block">
                {isFollowing ? (
                  <button
                    onClick={() => unFollowTopicHandler()}
                    className="flex justify-center items-center text-xs sm:text-sm py-1 px-6 rounded text-green-700 font-semibold bg-green-200 hover:bg-green-300"
                  >
                    <FontAwesomeIcon
                      className="mr-1 text-green-700"
                      icon={faCheck}
                    />
                    FOLLOWING
                  </button>
                ) : (
                  <button
                    onClick={() => followTopicHandler()}
                    className="flex justify-center items-center text-xs sm:text-sm py-1 px-6 rounded text-green-700 font-semibold bg-green-200 hover:bg-green-300"
                  >
                    FOLLOW
                  </button>
                )}
              </div>
            </div>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-between items-center">
              {/* ========== follow button div ============  */}
              <div className="sm:hidden">
                {isFollowing ? (
                  <button
                    onClick={() => unFollowTopicHandler()}
                    className="flex justify-center items-center text-xs sm:text-sm py-2 px-6 rounded text-green-700 font-semibold bg-green-200 hover:bg-green-300"
                  >
                    <FontAwesomeIcon
                      className="mr-1 text-green-700"
                      icon={faCheck}
                    />
                    FOLLOWING
                  </button>
                ) : (
                  <button
                    onClick={() => followTopicHandler()}
                    className="flex justify-center items-center text-xs sm:text-sm py-2 px-6 rounded text-green-700 font-semibold bg-green-200 hover:bg-green-300"
                  >
                    FOLLOW
                  </button>
                )}
              </div>

              {/*======= relevence dropdown button ============*/}
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

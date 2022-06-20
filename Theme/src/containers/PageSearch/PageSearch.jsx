import React, { useEffect, useState } from "react";
import LoadingVideo from "../../components/LoadingVideo/LoadingVideo";
import LanguagesFilterBox from "../../components/LanguagesFilterBox/LanguagesFilterBox";
import { Helmet } from "react-helmet";
import Card11 from "../../components/Card11/Card11";
import { useLocation } from "react-router-dom";
import DateRangeDropDown from "../../components/DateRangeCalender/DateRangeDropDown";
import RelevanceListBox from "../../components/RelevanceListBox/RelevanceListBox";
import {
  useGetAllFavouritePostsbyUserQuery,
  useIsFollowingTopicMutation,
  useCreateFollowedTopicMutation,
  useDeleteFollowedTopicMutation,
} from "../../app/Api/contentApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
import cogoToast from "cogo-toast";
import CustomPagination from "../../components/Pagination/CustomPagination.jsx";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

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
  var { customCategory } = queryString.parse(search);

  // handlers
  const followTopicHandler = async () => {
    try {
      const res = await createFollowedTopic({ topicName: customCategory });
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
      const res = await deleteFollowedTopic({ topicName: customCategory });
      setIsFollowing(false);
      if (res.data) {
        cogoToast.success(res.data?.successMsg);
      }
      if (res.error) {
        cogoToast.error(res.error?.data?.errorMsg);
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
    var langaugeList = data?.results.facets.filter(
      (item) => item.identifier == "language"
    )[0].entries;
  }

  // useEffects
  useEffect(async () => {
    try {
      const res = await isFollingTopic({ topicName: customCategory });
      setIsFollowing(res.data);
    } catch (err) {
      console.log("ERROR OCCOURED WHILE FETCHING SINGLE TOPIC NAME", err);
      console.log(isFollingTopic_obj.error);
    }
  }, []);

  if (data) {
    console.log(RtkData?.data);

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
      } catch (error) {
        console.log(error);
      }
    });
  }

  if (error) {
    console.log("An error Occured" + error);
  }

  return (
    <>
      <div className={`nc-PageSearch ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>Contentgizmo</title>
        </Helmet>
      </div>

      {/* =============== Scroll to top button ================ */}
      <ScrollToTopButton />

      <hr className="mx-4 sm:mx-8 my-10 py-4" />

      <div className="container space-y-16 lg:space-y-28">
        <main>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex justify-start items-center space-x-2.5">
              {/* ============ Language filter dropdown Button =============== */}
              {!loading ? <LanguagesFilterBox lists={langaugeList} /> : null}

              {/* ============ Date Range =============== */}
              <DateRangeDropDown facet={data?.results?.facets} />

              {/* ========== follow button div large screens ============  */}
              {customCategory ? (
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
              ) : (
                <div className="hidden sm:block">
                  <div className="py-2 px-6 rounded " />
                </div>
              )}
            </div>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-between items-center">
              {/* ========== follow button div small screens ============  */}
              {customCategory ? (
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
              ) : (
                <div className="sm:hidden">
                  <div className="py-2 px-6 rounded " />
                </div>
              )}

              {/*======= relevence dropdown button ============*/}
              <RelevanceListBox lists={sortOptions} />
            </div>
          </div>

          {/*======= Article Cards ============*/}
          {!loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">
              {newData?.length !== 0 ? (
                newData?.map((value, index) => {
                  return <Card11 key={index} cardvalue={value} />;
                })
              ) : (
                <h1>Sorry, No articles available for this search.</h1>
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

export default PageSearch;

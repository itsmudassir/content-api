import LayoutPage from "../../components/LayoutPage/LayoutPage";
import React, { useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { NavLink, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import TopicSubmitPost from "./TopicSubmitPost";
import EditCustomTopicForm from "./EditCustomTopicForm";
import CreateFolderModal from "../../components/CreateFolderModal/createFolderModal";
import {
  useGetAllFoldersQuery,
  useGetAllCustomTopicsQuery,
  useDeleteCustomTopicMutation,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
  useGetAllFollowedTopicsQuery,
  useDeleteFollowedTopicMutation,
} from "../../app/Api/contentApi";
import ButtonCircle from "../../components/Button/ButtonCircle";
import Input from "../../components/Input/Input";
import {
  faTrashCan,
  faPen,
  faArrowTrendUp,
  faStar,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cogoToast from "cogo-toast";
import ReactLoading from "react-loading";
import CustomTopicPosts from "./CustomTopicPosts";
import "./topicpage.css";
import FavouritePosts from "../../containers/FavouritePostsContainer/FavouritePosts";
import FollowedTopicsMain from "../../containers/FollowedTopics/FollowedTopicsMain";
import SidebarMobile from "../../components/SidebarMobile/SidebarMobile";
import "react-alert-confirm/dist/index.css";
import confirmAlert from "../../app/confirmAlert.js";
import TrendingNewsMain from "../../containers/TrendingNews/TrendingNewsMain"

const TopicsPage = ({ className = "" }) => {
  const history = useHistory();
  const [folderID, setFolderID] = useState();
  const [customTopicId, setCustomTopicId] = useState(null);
  const [showModal, setshowModal] = useState(false);

  // Routing
  let { path, url } = useRouteMatch();

  const screenHeight = window.innerHeight - window.innerHeight * (15 / 100);

  // RTK-Query
  const getAllFolders = useGetAllFoldersQuery();
  //For CustomTopic
  const getAllCustomTopics = useGetAllCustomTopicsQuery();
  const getAllFollowedTopics = useGetAllFollowedTopicsQuery();
  const [deleteFollowedTopic, deleteFollowedTopic_Obj] =
    useDeleteFollowedTopicMutation();
  var [deletePost, deletePost_Obj] = useDeleteCustomTopicMutation();

  // handlers
  const closeModal = () => setshowModal(false);
  const showModalOnClick = () => setshowModal(true);

  var [deleteFolder, deleteFolder_Obj] = useDeleteFolderMutation();
  var [updateFolder, updateFolder_Obj] = useUpdateFolderMutation();

  const [folderNameState, setFolderNameState] = useState("");
  const [toggleFolderNameHide, setToggleFolderNameHide] = useState(false);
  const [toggleFolderNameHideId, setToggleFolderNameHideId] = useState("");

  const RemoveClick = (e) => {
    e.preventDefault();
    setToggleFolderNameHide(false);
    setToggleFolderNameHideId("");
  };

  const SaveClick = async (e) => {
    try {
      e.preventDefault();
      if (toggleFolderNameHideId !== "" && folderNameState !== "") {
        const res = await updateFolder({
          id: toggleFolderNameHideId,
          folderName: folderNameState,
        });
        if (res.data) cogoToast.success(res.data.successMsg);
        if (res.error)
          cogoToast.error(res.error.data.errorMsg || res.error.data.msg);
      }
      setToggleFolderNameHide(false);
      setToggleFolderNameHideId("");
    } catch (err) {
      console.log("ERROR OCCOURED WHILE UPDATING FOLDER NAME", err);
      console.log(
        "ERROR OCCOURED WHILE UPDATING FOLDER NAME",
        updateFolder_Obj
      );
    }
  };

  const unFollowTopicHandler = async (topic) => {
    try {
      confirmAlert(
        `Are you sure you want to unfollow topic ${topic}?`,
        async () => {
          const res = await deleteFollowedTopic({ topicName: topic });
          if (res.data) {
            cogoToast.success(res.data?.successMsg);
          }
          if (res.error) {
            cogoToast.error(res.error?.data?.errorMsg);
          }
        }
      );
    } catch (err) {
      console.log("Error occoured while creating topic", err);
      console.log(
        "Error occoured while creating topic",
        deleteFollowedTopic_Obj
      );
    }
  };

  const deleteCustomTopic = async (id, topic) => {
    try {
      confirmAlert(
        `Are you sure you want to delete Topic ${topic}?`,
        async () => {
          const res = await deletePost({ id: id });
          if (res.data) {
            cogoToast.success(res.data?.successMsg);
          }
          if (res.error) {
            cogoToast.error(res.error?.data?.errorMsg);
          }
        }
      );
    } catch (err) {
      console.log("Error occoured while creating topic", err);
      console.log(
        "Error occoured while deleting custom topic",
        deletePost_Obj.error
      );
    }
  };

  const deleteFavFolder = async (id, folderName) => {
    try {
      confirmAlert(
        `Are you sure you want to delete Folder ${folderName}? Deleting folder will also delete the liked posts.`,
        async () => {
          const res = await deleteFolder({ id: id });
          if (res.data) {
            cogoToast.success(res.data?.successMsg);
          }
          if (res.error) {
            cogoToast.error(res.error?.data?.errorMsg);
          }
        }
      );
    } catch (err) {
      console.log("Error occoured while deteting Folder", err);
      console.log(
        "Error occoured while deleting deteting Folder",
        deleteFolder_Obj.error
      );
    }
  };
  console.log("TOPIC PAGE");
  return (
    <div className={`nc-PageDashboard ${className}`} data-nc-id="PageDashboard">
      <Helmet>
        <title>Contentgizmo</title>
      </Helmet>

      <LayoutPage
        subHeading="View your dashboard, manage your Posts, Subscription, edit password and profile"
        headingEmoji="⚙"
        heading="Dash board"
      >
        {/* =========== md, sm and xs screens SIDEBAR ============== */}
        <div className="block lg:hidden">
          <SidebarMobile setFolderID={setFolderID} />
        </div>

        <div className="flex flex-col space-y-8 xl:space-y-0 lg:flex-row">
          {/* =========== lg and xl screens SIDEBAR ============== */}
          <div
            style={{ height: screenHeight + "px" }}
            className="flex-shrink-0 w-48 overflow-y-scroll sticky top-0 hidden lg:block scrollbar-w-1 scrollbar-thumb-slate-300 scrollbar-track-slate-0"
          >
            {/* =========== TRENDING NEWS ==================== */}
            <div
              className="flex justify-start items-center w-full hover:cursor-pointer "
              onClick={() => history.push(`/topics`)}
            >
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                className="text-xs text-slate-400 mr-2"
              />
              <p
                onClick={() => history.push(`/topics`)}
                className="flex py-2.5 mr-2 font-medium text-[#666666] hover:text-slate-400"
              >
                Trending News
              </p>
            </div>

            {/* =========== DIVIDER ==================== */}
            <div className="w-full my-3">
              <hr className="border w-32" />
            </div>

            {/* ============ FOLLOWED TOPICS ================== */}
            <ul className=" flex justify-center items-start ml-0 flex-col text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              <li className="flex justify-start items-center w-44">
              <FontAwesomeIcon
                icon={faFileLines}
                className="text-xs text-slate-400 mr-2"
              />
                <p className="flex py-2.5 mr-2 font-medium rounded-lg text-[#666666]">
                  Followed Topics
                </p>
              </li>
              {!getAllFollowedTopics.data ? (
                <li className="flex sm:justify-start lg:justify-center items-center">
                  <ReactLoading
                    type="bubbles"
                    color="#9c4be7"
                    className="w-32"
                  />
                </li>
              ) : getAllFollowedTopics.data?.InformationMsg ? (
                <li className="flex justify-start items-center">
                  <p className="text-sm ml-6 text-slate-400">
                    {getAllFollowedTopics.data.InformationMsg}
                  </p>
                </li>
              ) : (
                getAllFollowedTopics?.data?.map(({ topic, _id }, index) => {
                  return (
                    <li key={index} className="w-full">
                      <div>
                        <NavLink
                          className="customTopicsNavLink"
                          activeClassName="bg-indigo-50 text-[#000000] dark:bg-neutral-800 dark:text-neutral-900"
                          to={`${url}/followed-topics/${topic}`}
                        >
                          <p title={topic} className="w-32 truncate ...">
                            {topic}
                          </p>

                          <span className="topicsSpan">
                            <div>
                              <button
                                title="Unfollow Topic"
                                className="ml-5"
                                onClick={(e) => {
                                  e.preventDefault();
                                  unFollowTopicHandler(topic);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  // style={{ color: "gray", fontSize: "12px" }}
                                  className="hover:text-rose-600 hover:text-lg text-slate-400"
                                />
                              </button>
                            </div>
                          </span>
                        </NavLink>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
            <br />

            {/* ============ CUSTOM TOPICS ================== */}

            <ul className=" flex justify-center items-start ml-0 flex-col text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              <li className="flex justify-between items-center w-44">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faFileLines}
                    className="text-xs text-slate-400 mr-2"
                  />
                  <p className="flex py-2.5 mr-2 font-medium rounded-lg text-[#666666]">
                    Custom Topics
                  </p>
                </div>
                <button
                  onClick={() => history.push(`${url}/submit-post`)}
                  // className="flex flex-row justify-center items-end rounded p-1 h-6 font-bold text-[25px] bg-gray-300 text-[#8c8c8c] hover:text-indigo-600"
                >
                  ➕
                </button>
              </li>
              {!getAllCustomTopics.data ? (
                <li className="flex sm:justify-start lg:justify-center items-center">
                  <ReactLoading
                    type="bubbles"
                    color="#9c4be7"
                    className="w-32"
                  />
                </li>
              ) : getAllCustomTopics.data?.InformationMsg ? (
                <li className="flex justify-start items-center">
                  <p className="text-sm ml-6 text-slate-400">
                    {getAllCustomTopics.data.InformationMsg}
                  </p>
                </li>
              ) : (
                getAllCustomTopics?.data?.map(({ name, _id }, index) => {
                  return (
                    <li key={index} className="w-full">
                      <div>
                        <NavLink
                          className="customTopicsNavLink"
                          activeClassName="bg-indigo-50 text-[#000000] dark:bg-neutral-800 dark:text-neutral-900"
                          to={`${url}/custom-topic-posts/${_id}`}
                          onClick={() => {
                            setCustomTopicId(_id);
                          }}
                        >
                          <p title={name} className="w-[110px] truncate ...">
                            {name}
                          </p>
                          <span className="topicsSpan">
                            <div>
                              <button
                                title="Edit Topic"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCustomTopicId(_id);
                                  history.push(`${url}/custom_topics/${_id}`);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faPen}
                                  // style={{ color: "gray", fontSize: "12px" }}
                                  className="hover:text-green-600 hover:text-lg text-slate-400"
                                />
                              </button>

                              <button
                                title="Delete Topic"
                                className="ml-5"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteCustomTopic(_id, name);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  // style={{ color: "gray", fontSize: "12px" }}
                                  className="hover:text-rose-600 hover:text-lg text-slate-400"
                                />
                              </button>
                            </div>
                          </span>
                        </NavLink>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
            <br />

            {/* FAVOURITES FOLDER */}
            {/* ============ FAVOURITES FOLDER ================== */}
            <ul className=" flex justify-center items-start ml-0 flex-col text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              <li className="flex justify-between items-center w-44">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-xs text-slate-400 mr-2"
                  />
                  <p className="flex py-2.5 mr-2 font-medium rounded-lg text-[#666666]">
                    Favourites
                  </p>
                </div>
                <button
                  onClick={showModalOnClick}
                  // className="flex flex-row justify-center items-end rounded p-1 h-6 font-bold text-[25px] bg-gray-300 text-[#8c8c8c] hover:text-indigo-600 "
                >
                  ➕
                </button>
              </li>

              {!getAllFolders?.data ? (
                <li className="flex sm:justify-start lg:justify-center items-center">
                  <ReactLoading
                    type="bubbles"
                    color="#9c4be7"
                    className="w-32"
                  />
                </li>
              ) : getAllFolders.data?.InformationMsg ? (
                <li className="flex justify-start items-center">
                  <p className="text-sm ml-6 text-slate-400">
                    {getAllFolders.data.InformationMsg}
                  </p>
                </li>
              ) : (
                getAllFolders?.data?.map(({ folderName, _id }, index) => {
                  return (
                    <React.Fragment key={index}>
                      {toggleFolderNameHide &&
                      toggleFolderNameHideId === _id ? (
                        <form className="mt-0  relative max-w-[80%]" key={_id}>
                          <Input
                            rounded="rounded-md"
                            aria-required
                            value={folderNameState}
                            onChange={(e) => setFolderNameState(e.target.value)}
                            placeholder="folder Name"
                            type="text"
                          />

                          <ButtonCircle
                            onClick={RemoveClick}
                            type="submit"
                            className="absolute transform top-1/2 -translate-y-1/2 right-1"
                          >
                            <i className="la la-remove text-red-700"></i>
                          </ButtonCircle>
                          <ButtonCircle
                            onClick={SaveClick}
                            type="submit"
                            className="absolute transform top-1/2 -translate-y-1/2 right-7"
                          >
                            <i className="las la-check text-green-700"></i>
                          </ButtonCircle>
                        </form>
                      ) : (
                        <li key={index} className="w-full">
                          <NavLink
                            className="favouriteSFolderNavLink"
                            activeClassName="bg-indigo-50 text-[#000000] dark:bg-neutral-800 dark:text-neutral-900"
                            // to={`/topics/${_id}`}
                            to={`${url}/favourite-posts/${_id}`}
                            onClick={() => {
                              setFolderID(_id);
                            }}
                          >
                            <p
                              title={folderName}
                              className="w-[110px] truncate ..."
                            >
                              {folderName}
                            </p>
                            <span className="folderSpan">
                              <button
                                title="Change folder name"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFolderNameState(folderName);
                                  setToggleFolderNameHide(true);
                                  setToggleFolderNameHideId(_id);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faPen}
                                  className="hover:text-green-600 hover:text-lg text-slate-400"
                                />
                              </button>

                              <button
                                title="Delete folder"
                                className="ml-5"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteFavFolder(_id, folderName);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  className="hover:text-rose-600 hover:text-lg text-slate-400"
                                />
                              </button>
                            </span>
                          </NavLink>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </li>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </ul>
          </div>

          {/* ============ PAGES CONTAINERS =================  */}
          <div className="border border-neutral-100 dark:border-neutral-800 md:hidden"></div>
          <div className="flex-grow">
            <CreateFolderModal
              show={showModal}
              onCloseModalReportItem={closeModal}
            />

            <Switch>
              {/* Custom topic posts Route  */}
              <Route
                path={`${path}/custom-topic-posts/:id`}
                render={() => {
                  return (
                    <>
                      <CustomTopicPosts />
                    </>
                  );
                }}
              />

              {/* Followed topics Route */}
              <Route
                path={`${path}/followed-topics/:category`}
                render={() => {
                  return (
                    <>
                      <FollowedTopicsMain />
                    </>
                  );
                }}
              />

              {/* Edit Custom topic Route  */}
              <Route
                path={`${path}/custom_topics/:id`}
                render={() => {
                  return (
                    <>
                      <EditCustomTopicForm />
                    </>
                  );
                }}
              />

              {/* Create Custom Topic Route  */}
              <Route
                exact
                path={`${path}/submit-post`}
                component={TopicSubmitPost}
              />

              {/* Favourites Folder Posts Route  */}
              <Route
                path={`${path}/favourite-posts/:id`}
                render={() => {
                  return (
                    <>
                      {folderID ? <FavouritePosts folderID={folderID} /> : null}
                    </>
                  );
                }}
              />

              {/* Trending News Main Route  */}
              <Route
                path={`/topics`}
                render={() => {
                  return (
                    <>
                      <TrendingNewsMain />
                    </>
                  );
                }}
              />

              <Redirect to={"/topics"} />
            </Switch>
          </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default TopicsPage;

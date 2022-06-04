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
  useGetAllFavouritePostsQuery,
  useGetAllCustomTopicsQuery,
  useDeleteCustomTopicMutation,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
  useGetAllFollowedTopicsQuery,
  useDeleteFollowedTopicMutation,
} from "../../app/Api/contentApi";
import ButtonCircle from "../../components/Button/ButtonCircle";
import Input from "../../components/Input/Input";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cogoToast from "cogo-toast";
import Card12 from "../../components/Card11/Card12";
import ReactLoading from "react-loading";
import CustomTopicPosts from "./CustomTopicPosts";
import "./topicpage.css";

const TopicsPage = ({ className = "" }) => {
  const history = useHistory();
  const [folderID, setFolderID] = useState();
  const [customTopicId, setCustomTopicId] = useState(null);
  const [showModal, setshowModal] = useState(false);

  // Routing
  let { path, url } = useRouteMatch();

  // refrences

  // RTK-Query
  const getAllFolders = useGetAllFoldersQuery();
  const favouritePosts = useGetAllFavouritePostsQuery(folderID? folderID: undefined);
  //For CustomTopic
  const getAllCustomTopics = useGetAllCustomTopicsQuery();
  const getAllFollowedTopics = useGetAllFollowedTopicsQuery();
  const [deleteFollowedTopic, deleteFollowedTopic_Obj] =
    useDeleteFollowedTopicMutation();

  var [deletePost] = useDeleteCustomTopicMutation();

  // handlers
  const closeModal = () => setshowModal(false);
  const showModalOnClick = () => setshowModal(true);

  var [deleteFolder] = useDeleteFolderMutation();
  var [updateFolder] = useUpdateFolderMutation();

  const [folderNameState, setFolderNameState] = useState("");
  const [toggleFolderNameHide, setToggleFolderNameHide] = useState(false);
  const [toggleFolderNameHideId, setToggleFolderNameHideId] = useState("");

  const RemoveClick = (e) => {
    e.preventDefault();

    setToggleFolderNameHide(false);
    setToggleFolderNameHideId("");
  };

  const SaveClick = async (e) => {
    e.preventDefault();
    if (toggleFolderNameHideId !== "" && folderNameState !== "") {
      const res = await updateFolder({
        id: toggleFolderNameHideId,
        folderName: folderNameState,
      });
      if (res.data) cogoToast.success(res.data.successMsg);
      if (res.error) cogoToast.error(res.error.data.errorMsg);
    }
    setToggleFolderNameHide(false);
    setToggleFolderNameHideId("");
  };
  const unFollowTopicHandler = async (topic) => {
    try {
      if (window.confirm(`are you sure you want to unfollow ${topic}?`)) {
        const res = await deleteFollowedTopic({ topicName: topic });
        if (res.data) {
          cogoToast.success(res.data?.successMsg);
        }
        if (res.error) {
          cogoToast.error(res.error?.data?.errorMsg);
        }
      }
    } catch (err) {
      console.log("Error occoured while creating topic", err);
      console.log(
        "Error occoured while creating topic",
        deleteFollowedTopic_Obj
      );
    }
  };

  return (
    <div className={`nc-PageDashboard ${className}`} data-nc-id="PageDashboard">
      <Helmet>
        <title>Curated Topics</title>
      </Helmet>

      <LayoutPage
        subHeading="View your dashboard, manage your Posts, Subscription, edit password and profile"
        headingEmoji="⚙"
        heading="Dash board"
      >
        <div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
          {/* {/ SIDEBAR  /} */}

          <div className="flex-shrink-0 max-w-xl xl:w-70 xl:pr-8">
            {/* ============ FOLLOWED TOPICS ================== */}
            <ul className=" flex justify-center items-start ml-4 flex-col text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              <li className="flex justify-between items-center">
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
                          to={`${url}/followed-topics/${_id}`}
                          onClick={() => {
                            setCustomTopicId(_id);
                          }}
                        >
                          {topic}
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
                                  style={{ color: "gray", fontSize: "12px" }}
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

            {/* ============ CUSTOM TOPICS ================== */}

            <ul className=" flex justify-center items-start ml-4 flex-col text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              <li className="flex justify-between items-center">
                <p className="flex py-2.5 mr-2 font-medium rounded-lg text-[#666666]">
                  CUSTOM TOPICS
                </p>
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
                          {name}
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
                                  style={{ color: "gray", fontSize: "12px" }}
                                />
                              </button>

                              <button
                                title="Delete Topic"
                                className="ml-5"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deletePost({ id: _id });
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  style={{ color: "gray", fontSize: "12px" }}
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

            {/* FAVOURITES FOLDER */}
            {/* ============ FAVOURITES FOLDER ================== */}
            <ul className=" flex justify-center items-start ml-4 flex-col text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              <li className="flex justify-between items-center">
                <p className="flex py-2.5 mr-2 font-medium rounded-lg text-[#666666]">
                  FAVOURITES
                </p>
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
                            {folderName}

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
                                  style={{
                                    color: "gray",
                                    fontSize: "12px",
                                  }}
                                />
                              </button>

                              <button
                                title="Delete folder"
                                className="ml-5"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteFolder({ id: _id });
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  style={{
                                    color: "gray",
                                    fontSize: "12px",
                                  }}
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
                    <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8 mt-8 lg:mt-10">
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

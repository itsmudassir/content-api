import React, {
  useState,
  Fragment,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useRouteMatch } from "react-router";
import { NavLink, useHistory } from "react-router-dom";
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
  faXmark,
  faArrowTrendUp,
  faStar,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import cogoToast from "cogo-toast";
import ReactLoading from "react-loading";
// import "./topicpage.css";
import "../../containers/TopicsPage/topicpage.css";
import CreateFolderModal from "../../components/CreateFolderModal/createFolderModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmAlert from "../../app/confirmAlert.js";

const SidebarMobile = ({ setFolderID }) => {
  const [isVisable, setIsVisable] = useState(false);

  const history = useHistory();
  const [customTopicId, setCustomTopicId] = useState(null);
  const [showModal, setshowModal] = useState(false);

  // Routing
  let { path, url } = useRouteMatch();

  // RTK-Query
  const getAllFolders = useGetAllFoldersQuery();
  //For CustomTopic
  const getAllCustomTopics = useGetAllCustomTopicsQuery();
  const getAllFollowedTopics = useGetAllFollowedTopicsQuery();
  const [deleteFollowedTopic, deleteFollowedTopic_Obj] =
    useDeleteFollowedTopicMutation();

  var [deletePost, deletePost_Obj] = useDeleteCustomTopicMutation();

  // handlers
  const closeModal = useCallback(() => setshowModal(false), [showModal]);
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

  useEffect(() => {
    setIsVisable(false);
  }, [window.location.pathname]);

  const handleOpenMenu = useCallback(() => setIsVisable(true), [isVisable]);
  const handleCloseMenu = useCallback(() => setIsVisable(false), [isVisable]);

  const height = window.innerHeight;

  const renderContent = () => {
    return (
      <Transition appear show={isVisable} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={handleCloseMenu}
        >
          <div className="fixed left-0 top-0 bottom-0 w-full md:w-auto z-max outline-none focus:outline-none">
            <React.Fragment>
              <Transition.Child
                as={Fragment}
                enter="transition duration-100 transform"
                enterFrom="opacity-0 -translate-x-14"
                enterTo="opacity-100 translate-x-0"
                leave="transition duration-150 transform"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-14"
              >
                <div className="z-10 relative">
                  {/* <NavMobile onClickClose={handleCloseMenu} /> */}

                  {/* ============= SIDEBAR ======================= */}
                  <div
                    style={{ height: height + "px" }}
                    // className="flex-shrink-0 w-64 pl-5 pr-2 overflow-y-scroll sticky top-0 bg-white scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-200 scrollbar-track-[30px]"
                    className="flex-shrink-0 w-64 pl-5 pr-2 overflow-y-scroll sticky top-0 bg-white scrollbar-w-2 scrollbar-thumb-slate-300 scrollbar-track-slate-200"
                  >
                    <div className="w-full flex justify-end py-1">
                      <FontAwesomeIcon
                        icon={faXmark}
                        onClick={handleCloseMenu}
                        className="px-4 py-3 rounded-full active:bg-slate-200 hover:bg-slate-200"
                      />
                    </div>

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
                        getAllFollowedTopics?.data?.map(
                          ({ topic, _id }, index) => {
                            return (
                              <li key={index} className="w-full">
                                <div>
                                  <NavLink
                                    className="customTopicsNavLink"
                                    activeClassName="bg-indigo-50 text-[#000000] dark:bg-neutral-800 dark:text-neutral-900"
                                    to={`${url}/followed-topics/${topic}`}
                                  >
                                    <p
                                      title={topic}
                                      className="w-32 truncate ..."
                                    >
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
                          }
                        )
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
                        getAllCustomTopics?.data?.map(
                          ({ name, _id }, index) => {
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
                                    <p
                                      title={name}
                                      className="w-[110px] truncate ..."
                                    >
                                      {name}
                                    </p>
                                    <span className="topicsSpan">
                                      <div>
                                        <button
                                          title="Edit Topic"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setCustomTopicId(_id);
                                            history.push(
                                              `${url}/custom_topics/${_id}`
                                            );
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
                          }
                        )
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
                        getAllFolders?.data?.map(
                          ({ folderName, _id }, index) => {
                            return (
                              <React.Fragment key={index}>
                                {toggleFolderNameHide &&
                                toggleFolderNameHideId === _id ? (
                                  <form
                                    className="mt-0  relative max-w-[80%]"
                                    key={_id}
                                  >
                                    <Input
                                      rounded="rounded-md"
                                      aria-required
                                      value={folderNameState}
                                      onChange={(e) =>
                                        setFolderNameState(e.target.value)
                                      }
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
                          }
                        )
                      )}
                    </ul>
                  </div>

                  {/* ============= SIDEBAR ======================= */}
                </div>
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter=" duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave=" duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50" />
              </Transition.Child>
            </React.Fragment>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <>
      <button
        onClick={handleOpenMenu}
        className="p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <CreateFolderModal show={showModal} onCloseModalReportItem={closeModal} />
      {renderContent()}
    </>
  );
};

export default React.memo(SidebarMobile);

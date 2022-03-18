import LayoutPage from "../../components/LayoutPage/LayoutPage";
import React, { useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { NavLink, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import TopicSubmitPost from "./TopicSubmitPost";
import CreateFolderModal from "../../components/CreateFolderModal/createFolderModal";
import {
  useGetAllFoldersQuery,
  useGetAllFavouritePostsQuery,
  useGetAllCustomTopicsQuery
} from "../../app/Api/contentApi";

import Card12 from "../../components/Card11/Card12"

const TopicsPage = ({ className = "" }) => {
  const history = useHistory();
  const [folderID, setFolderID] = useState();
  const [showModal, setshowModal] = useState(false);

  let { path, url } = useRouteMatch();
  const getAllFolders = useGetAllFoldersQuery();
  const getAllFavouritePosts = useGetAllFavouritePostsQuery(folderID);
  const cardData = useGetAllFavouritePostsQuery(folderID);
  const getAllCustomTopics = useGetAllCustomTopicsQuery()
  console.log(getAllCustomTopics , "Getting all data of Custom Topic xxxxxxxxxxxxxxxxxxxxxxxx")
  // handlers
  const closeModal = () => setshowModal(false);
  const showModalOnClick = () => setshowModal(true);



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


          {/* {/ SIDEBAR /} */}
          <div className="flex-shrink-0 max-w-xl xl:w-70 xl:pr-8">
            {/* {/ CUSTOM TOPICS /} */}
            <ul className="text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              <li className="flex flex-row justify-start items-center">
                <p className="flex px-6 py-2.5 font-medium rounded-lg text-[#666666]">
                  CUSTOM TOPICS
                </p>
                <button
                  onClick={() => history.push(`${url}/submit-post`)}
                  className="flex flex-row justify-center items-end rounded p-1 h-6 font-bold text-[25px] bg-gray-300 text-[#8c8c8c] hover:text-indigo-600"
                >
                  +
                </button>
              </li>
            </ul>


            <ul className="text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
              <li className="flex flex-row justify-start items-center">
                <p className="flex px-6 py-2.5 font-medium rounded-lg text-[#666666]">
                  FAVOURITES
                </p>
                <button
                  onClick={showModalOnClick}
                  className="flex flex-row justify-center items-end rounded p-1 h-6 font-bold text-[25px] bg-gray-300 text-[#8c8c8c] hover:text-indigo-600 "
                >
                  +
                </button>
              </li>

              {getAllFolders.data?.map(({ folderName, _id }, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      className="flex px-6 py-2.5 font-medium text-[#8c8c8c] hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                      activeClassName="bg-indigo-50 text-[#000000] dark:bg-neutral-800 dark:text-neutral-900"
                      // to={`/topics/${_id}`}
                      to={`${url}/favourite-posts/${_id}`}
                      onClick={() => setFolderID(_id)}
                    >

                      {folderName}
                    </NavLink>
                  </li>
                );
              })}

            
            </ul>
          </div>

          <div className="border border-neutral-100 dark:border-neutral-800 md:hidden"></div>
          <div className="flex-grow">
            <CreateFolderModal
              show={showModal}
              onCloseModalReportItem={closeModal}
            />

            <Switch>

              <Route
                path={`${path}/favourite-posts/:id`}
                render={() => {
                  return   <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8 mt-8 lg:mt-10">
              {cardData?.data?.map((value, index) => {
                console.log(value);
                return (
                  <>
                    <Card12 key={index} cardItems={value} />
                  </>
                );
              })}
            </div>;
                }}
              />


              <Route
                exact
                path={`${path}/submit-post`}
                component={TopicSubmitPost}
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
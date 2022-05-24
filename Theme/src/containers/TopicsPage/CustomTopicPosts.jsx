import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Tab } from "@headlessui/react";
// import PageSearch from "./PageSearch";
import CustomTopicsSearch from "./CustomTopicsSearch";
import { gql, useQuery } from "@apollo/client";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import CustomTopicInsights from "./CustomTopicInsights";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CustomTopicPosts = ({ className = "",topicData }) => {

  return (
    <>
      <div className={`nc-PageSearch ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>Nc || Search Page Template</title>
        </Helmet>
      </div>

      {/* XXXXXXXXXXXXXXXXX>> TABS <<XXXXXXXXXXXXXXXXXXXX*/}

      <div className=" w-full px-2 py-5 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex justify-center items-center p-1 space-x-1  rounded-xl">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-40 py-2.5 text-sm leading-5 font-medium  rounded-xl",
                  "",
                  selected
                    ? "bg-slate-700 text-white"
                    : "text-black bg-gray-200 hover:text-black"
                )
              }
            >
              Content Feed
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-40 py-2.5 text-sm leading-5 font-medium  rounded-xl",
                  "",
                  selected
                    ? "bg-slate-700 text-white"
                    : "text-black bg-gray-200 hover:text-black"
                )
              }
            >
              Insights
            </Tab>
          </Tab.List>

          <div className="flex justify-center">
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <CustomTopicsSearch topicData={topicData}/>
              </Tab.Panel>

              <Tab.Panel>
                  <CustomTopicInsights/>
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>

      {/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
    </>
  );
};

// export default withSearchkit(withSearchkitRouting(PageSearchMain));
export default CustomTopicPosts;

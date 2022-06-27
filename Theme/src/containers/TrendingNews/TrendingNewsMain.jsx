import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Tab } from "@headlessui/react";
import TrendingNewsSearch from "./TrendingNewsSearch";
import TrendingNewsInsights from "./TrendingNewsInsights";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TrendingNewsMain = ({ className = "" }) => {
  const category = "computers" 

  return (
    <>
      <div className={`nc-PageSearch ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>Contentgizmo</title>
        </Helmet>
      </div>

      {/* XXXXXXXXXXXXXXXXX>> TABS <<XXXXXXXXXXXXXXXXXXXX*/}

      <div className="w-full px-2 py-5 sm:px-0">
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

          <Tab.Panels className="mt-2">
            <Tab.Panel>
              {category ? <TrendingNewsSearch category={category} /> : null}
            </Tab.Panel>

            <Tab.Panel>
              {category ? <TrendingNewsInsights category={category} /> : null}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default TrendingNewsMain;

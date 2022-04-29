import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import DateRangeDropDown from "../../components/DateRangeCalender/DateRangeDropDown";
import PageGraphs from "../../containers/PageGraphs/PageGraphs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PageInsights = ({ searchKitData }) => {
  return (
    <>
      <hr className="mx-4 sm:mx-8 py-4" />

      {/* date range */}
      <div className="flex justify-start items-center mb-5 mx-10">
        <DateRangeDropDown facet={searchKitData?.results?.facets} />
      </div>

      <div className="w-screen">
        <Tab.Group>
            <Tab.List className="flex justify-start items-center px-8">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-28 py-2.5 text-sm leading-5 font-sm border-b-2 border-slate-200",
                    "",
                    selected
                      ? "text-blue-400 font-semibold border-blue-400"
                      : "text-black hover:text-blue-600"
                  )
                }
              >
                Overview
              </Tab>

              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-28 py-2.5 text-sm leading-5 font-sm border-b-2 border-slate-200",
                    "",
                    selected
                      ? "text-blue-400 font-semibold border-blue-400"
                      : "text-black hover:text-blue-600"
                  )
                }
              >
                Top Domins
              </Tab>

              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-28 py-2.5 text-sm leading-5 font-sm border-b-2 border-slate-200",
                    "",
                    selected
                      ? "text-blue-400 font-semibold border-blue-400"
                      : "text-black hover:text-blue-600"
                  )
                }
              >
                Top Authors
              </Tab>
            </Tab.List>

          <div className="flex justify-center">
            <Tab.Panels className="">
              <Tab.Panel>
                <PageGraphs searchKitData={searchKitData} />
              </Tab.Panel>

              <Tab.Panel>Domins Tab</Tab.Panel>

              <Tab.Panel>top authors</Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </>
  );
};

export default PageInsights;

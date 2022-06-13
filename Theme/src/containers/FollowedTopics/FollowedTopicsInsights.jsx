import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import PageGraphs from "../../containers/PageGraphs/PageGraphs";
import PageTopDomains from "../../containers/PageTopDomains/PageTopDomains";
import PageTopAuthors from "../../containers/pageTopAuthors/pageTopAuthors";
import { useGetInsightsMutation } from "../../app/Api/contentApi";
import queryString from "query-string";
import dates from "../../data/globalVariables/globalDates"


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FollowedTopicsInsights = ({ searchKitData,category}) => {
  const [insights, setInsights] = useState();

  // RTK Query
  const [getInsights, getInsightsObj] = useGetInsightsMutation();

  // URL search params
  const { startDate, endDate} = queryString.parse(
    window.location.search
  );

  useEffect(async () => {
    try {
      const res = await getInsights({
        startDate: startDate? startDate: dates.startDate,
        endDate: endDate? endDate: dates.endDate,
        // customQuery: customQuery,
        category: category,
      });
      setInsights(res?.data?.aggregations.range.buckets[0]);

    } catch (err) {
      console.log("ERROR OCCOURED WHILE FETCHING INSIGHTS", err);
      console.log(getInsightsObj?.error);
    }
  }, [startDate, endDate, category]);

  return (
    <>
      <hr className="mx-4 sm:mx-8 my-10 py-4" />

      {/* <DateRangeDropDown/> */}

      <div className="">
        <Tab.Group>
          <Tab.List className="flex justify-center md:justify-start items-center px-10">
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

          <div className="flex-1">
            <Tab.Panels>
              <Tab.Panel>
                <PageGraphs data={insights} />
              </Tab.Panel>

              <Tab.Panel>
                {insights ? <PageTopDomains insights={insights} /> : null}
              </Tab.Panel>

              <Tab.Panel>
                {insights ? <PageTopAuthors insights={insights} /> : null}
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </>
  );
};

export default FollowedTopicsInsights;

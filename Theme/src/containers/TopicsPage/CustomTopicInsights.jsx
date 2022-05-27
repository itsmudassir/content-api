import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import PageGraphs from "../PageGraphs/PageGraphs";
import PageTopDomains from "../PageTopDomains/PageTopDomains";
import PageTopAuthors from "../pageTopAuthors/pageTopAuthors";
import { useGetCustomTopicInsightsMutation } from "../../app/Api/contentApi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CustomTopicInsights = ({ searchKitData, customTopic }) => {
  const [insights, setInsights] = useState();
  console.log(customTopic.data);
  // RTK Query
  const [getInsights, getInsightsObj] = useGetCustomTopicInsightsMutation();

  useEffect(async () => {
    try {
      const res = await getInsights({
        startDate: customTopic?.data?.filters?.startdate
          ? customTopic?.data?.filters?.startdate.split("T")[0]
          : "2022-03-01",
        endDate: customTopic?.data?.filters?.startdate
          ? customTopic?.data?.filters?.enddate.split("T")[0]
          : "2022-03-30",
        exclude_domains_list: customTopic?.data?.selection?.exclude_domains,
        any_keywords_list: customTopic?.data?.selection?.any_keywords,
        must_also_keywords_list:
          customTopic?.data?.selection?.must_also_keywords,
        must_not_contains_keywords_list:
          customTopic?.data?.selection?.must_not_contains_keywords,
        limit_domains_results_list:
          customTopic?.data?.selection?.limit_domains_results,

      });
      setInsights(res?.data?.aggregations.range.buckets[0]);

      console.log(res?.data?.aggregations.range.buckets[0]);
    } catch (err) {
      console.log("ERROR OCCOURED WHILE FETCHING INSIGHTS", err);
      console.log(getInsightsObj?.error);
    }
  }, []);

  return (
    <>
      <hr className="mx-1 sm:mx-8 my-10 py-4" />

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
                <PageGraphs data={insights} searchKitData={searchKitData} />
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

export default CustomTopicInsights;

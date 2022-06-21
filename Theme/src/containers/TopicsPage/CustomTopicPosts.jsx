import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Tab } from "@headlessui/react";
import CustomTopicsSearch from "./CustomTopicsSearch";
import CustomTopicInsights from "./CustomTopicInsights";
import { useParams } from "react-router-dom";
import { useGetSingleCustomTopicQuery } from "../../app/Api/contentApi";
import queryString from "query-string"
import { useCallback } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CustomTopicPosts = ({ className = "" }) => {
  var topicId = useParams();
  topicId = topicId.id;
  const singleCustomTopic = useGetSingleCustomTopicQuery(topicId);
  console.log(singleCustomTopic);

  if (singleCustomTopic.data) {
    console.log(" customTopic  ", singleCustomTopic);
  }
  if (singleCustomTopic.isFetching) {
    console.log("fetching");
  }
  if (singleCustomTopic.isError) {
    console.log("error");
  }

  // selection

  const [any_keywords_list, setAny_keywords_list] = useState([]); // any_keywords_list

  const [must_also_keywords_list, setMust_also_keywords_list] = useState([]); // must_also_keywords_list

  const [must_not_contains_keywords_list, setMust_not_contains_keywords_list] =
    useState([]); // must_not_contains_keywords_list

  const [exclude_domains_list, setExclude_domains_list] = useState([]); // exclude_domains
  const [limit_domains_results_list, setLimit_domains_results_list] = useState(
    []
  ); // limit_domains_results

  // // filters
  const [bodyORtitle, setBodyORtitle] = useState("title");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [language, setlanguage] = useState(null);
  const [engagement, setEngagement] = useState(null);
  const [customState, setCustomState] = useState(null);
  const {page} = queryString.parse(window.location.search)

  useEffect(() => {
    setAny_keywords_list(singleCustomTopic?.data?.selection?.any_keywords);
    setMust_also_keywords_list(
      singleCustomTopic?.data?.selection?.must_also_keywords
    );
    setMust_not_contains_keywords_list(
      singleCustomTopic?.data?.selection?.must_not_contains_keywords
    );
    setExclude_domains_list(
      singleCustomTopic?.data?.selection?.exclude_domains
    );
    setLimit_domains_results_list(
      singleCustomTopic?.data?.selection?.limit_domains_results
    );
    setStartDate(singleCustomTopic?.data?.filters?.startdate);
    setEndDate(singleCustomTopic?.data?.filters?.enddate);
    setlanguage(singleCustomTopic?.data?.filters?.language);
    setEngagement(singleCustomTopic?.data?.filters?.engagement);
    setBodyORtitle(singleCustomTopic?.data?.filters?.type);
  }, [singleCustomTopic.data]);

  useEffect(() => {
    let filterObj = [];
    if (singleCustomTopic?.data?.filters?.type !== null) {
      filterObj.push({
        bodyORtitle: singleCustomTopic?.data?.filters?.type,
      });
    }

    if (singleCustomTopic?.data?.selection?.any_keywords?.length !== 0) {
      filterObj.push({
        any_keywords_list: singleCustomTopic?.data?.selection?.any_keywords,
      });
    }
    if (singleCustomTopic?.data?.selection?.must_also_keywords?.length !== 0) {
      filterObj.push({
        must_also_keywords_list:
          singleCustomTopic?.data?.selection?.must_also_keywords,
      });
    }
    if (
      singleCustomTopic?.data?.selection?.must_not_contains_keywords?.length !==
      0
    ) {
      filterObj.push({
        must_not_contains_keywords_list:
          singleCustomTopic?.data?.selection?.must_not_contains_keywords,
      });
    }
    if (singleCustomTopic?.data?.selection?.exclude_domains?.length !== 0) {
      filterObj.push({
        exclude_domains_list:
          singleCustomTopic?.data?.selection?.exclude_domains,
      });
    }
    if (
      singleCustomTopic?.data?.selection?.limit_domains_results?.length !== 0
    ) {
      filterObj.push({
        limit_domains_results_list:
          singleCustomTopic?.data?.selection?.limit_domains_results,
      });
    }
    if (singleCustomTopic?.data?.filters?.startdate !== null) {
      filterObj.push({
        startDate: singleCustomTopic?.data?.filters?.startdate,
      });
    }
    if (singleCustomTopic?.data?.filters?.enddate !== null) {
      filterObj.push({
        endDate: singleCustomTopic?.data?.filters?.enddate,
      });
    }
    if (singleCustomTopic?.data?.filters?.language !== null) {
      filterObj.push({
        language: singleCustomTopic?.data?.filters?.language,
      });
    }
    if (singleCustomTopic?.data?.filters?.engagement !== null) {
      filterObj.push({
        engagement: singleCustomTopic?.data?.filters?.engagement,
      });
    }

    console.log("EDIT CUSTOM TOPIC ", filterObj);
    let jsonob = JSON.stringify(filterObj);
    const customState1 = {
      query: "",
      sortBy: engagement,

      filters: [
        {
          identifier: "CustomFilter",
          value: jsonob,
        },
      ],
      page: {
        size: 20,
        from: 0,
      },
    };

    setCustomState(customState1);
    console.log("------------customState", customState);
  }, [singleCustomTopic.data]);

  useEffect(() => {
    if (customState) {
      let filterObj = [];
      if (bodyORtitle !== null) {
        filterObj.push({
          bodyORtitle: bodyORtitle,
        });
      }
      if (any_keywords_list?.length !== 0) {
        filterObj.push({
          any_keywords_list: any_keywords_list,
        });
      }
      if (must_also_keywords_list?.length !== 0) {
        filterObj.push({
          must_also_keywords_list: must_also_keywords_list,
        });
      }
      if (must_not_contains_keywords_list?.length !== 0) {
        filterObj.push({
          must_not_contains_keywords_list: must_not_contains_keywords_list,
        });
      }
      if (exclude_domains_list?.length !== 0) {
        filterObj.push({
          exclude_domains_list: exclude_domains_list,
        });
      }
      if (limit_domains_results_list?.length !== 0) {
        filterObj.push({
          limit_domains_results_list: limit_domains_results_list,
        });
      }
      if (startDate !== null) {
        filterObj.push({
          startDate: startDate,
        });
      }
      if (endDate !== null) {
        filterObj.push({
          endDate: endDate,
        });
      }
      if (language !== null) {
        filterObj.push({
          language: language,
        });
      }
      if (engagement !== null) {
        filterObj.push({
          engagement: engagement,
        });
      }

      console.log("CUSTOM TOPIC ", filterObj);
      let jsonob = JSON.stringify(filterObj);
      const customState1 = {
        query: "",
        sortBy: engagement,

        filters: [
          {
            identifier: "CustomFilter",
            value: jsonob,
          },
        ],
        page: {
          size: 20,
          from: 0,
        },
      };
      if (page) {
        const sum = page * 20 - 20;
        customState1.page.from = sum;
      }
      setCustomState(customState1);
      console.log("------------customState", customState);
    }
  }, [
    engagement,
    language,
    endDate,
    startDate,
    bodyORtitle,
    exclude_domains_list,
    any_keywords_list,
    must_also_keywords_list,
    must_not_contains_keywords_list,
    limit_domains_results_list,
    page,
  ]);

  const getLanguage =  useCallback((val)=> setlanguage(val), [language]);
  const getEngagement =  useCallback((val)=> setEngagement(val), [engagement]);
  const getStartDate =  useCallback((val)=> setStartDate(val), [startDate]);
  const getEnddate =  useCallback((val)=> setEndDate(val), [endDate]);

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
              {customState ? (
                <CustomTopicsSearch
                  setStartDate={getStartDate}
                  setEndDate={getEnddate}
                  setEngagement={getEngagement}
                  setlanguage={getLanguage}
                  customTopic={customState}
                />
              ) : null}
            </Tab.Panel>

            <Tab.Panel>
              {!singleCustomTopic.isFetching &&
              !singleCustomTopic.isLoading &&
              singleCustomTopic.isSuccess ? (
                <CustomTopicInsights customTopic={singleCustomTopic} />
              ) : null}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

    </>
  );
};

export default React.memo(CustomTopicPosts);

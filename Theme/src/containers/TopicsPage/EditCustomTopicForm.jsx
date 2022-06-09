import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import Label from "../../components/Label/Label";
import WidgetPosts from "../../components/WidgetPosts/WidgetPosts";
import Chip from "../../components/chip/chip";
import ExcludeDomainInputField from "../../components/ExcludeDomainInputField/ExcludeDomainInputField";
import LimitResultInputField from "../../components/LimitResultInputField/LimitResultInputField";
import LimitDomainsInputField from "../../components/LimitDomainsInputField/LimitDomainsInputField";
import { useParams } from "react-router-dom";
import { useUpdateCustomTopicMutation } from "../../app/Api/contentApi";
import CustomTopicLanguageSelect from "../../components/CustomTopicLanguageSelect/CustomTopicLanguageSelect";
import CustomTopicSortSelect from "../../components/CustomTopicSortSelect/CustomTopicSortSelect";
import DateRangeDropDown from "../../components/CustomTopicDateRange/DateRangeDropDown";
import cogoToast from "cogo-toast";
import { useGetSingleCustomTopicQuery } from "../../app/Api/contentApi";

const LanguagesList = [
  {
    label: "English",
    count: 25190,
  },
  {
    label: "Greek",
    count: 515,
  },
  {
    label: "Spanish",
    count: 492,
  },
  {
    label: "German",
    count: 229,
  },
  {
    label: "Italian",
    count: 168,
  },
  {
    label: "French",
    count: 138,
  },
  {
    label: "Dutch",
    count: 129,
  },
  {
    label: "Russian",
    count: 60,
  },
  {
    label: "Romanian",
    count: 32,
  },
  {
    label: "Arabic",
    count: 30,
  },
  {
    label: "Japanese",
    count: 27,
  },
  {
    label: "Telugu",
    count: 13,
  },
  {
    label: "Portuguese",
    count: 8,
  },
  {
    label: "Turkish",
    count: 7,
  },
];

const sortingList = [
  {
    id: "relevance",
    label: "Relevance",
  },
  {
    id: "facebook_shares",
    label: "Facebook Shares",
  },
  {
    id: "twitter_shares",
    label: "Twitter Shares",
  },
  {
    id: "date_download",
    label: "Date Download",
  },
  {
    id: "total_engagement",
    label: "Total Engagement",
  },
];

const EditCustomTopicForm = () => {
  var topicId = useParams();
  topicId = topicId.id;
  console.log(topicId);
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

  const [topicName, setTopicName] = useState(""); // topic name

  // selection

  const [any_keywords_list, setAny_keywords_list] = useState([]); // any_keywords_list
  const [any_keywords_value, setAny_keywords_value] = useState(""); // any_keywords_value

  const [must_also_keywords_list, setMust_also_keywords_list] = useState([]); // must_also_keywords_list
  const [must_also_keywords_value, setMust_also_keywords_value] = useState(""); // must_also_keywords_value

  const [must_not_contains_keywords_list, setMust_not_contains_keywords_list] =
    useState([]); // must_not_contains_keywords_list
  const [
    must_not_contains_keywords_value,
    setMust_not_contains_keywords_value,
  ] = useState(""); // must_not_contains_keywords_value

  const [exclude_domains_list, setExclude_domains_list] = useState([]); // exclude_domains
  const [limit_domains_results_list, setLimit_domains_results_list] = useState(
    []
  ); // limit_domains_results

  // // filters
  const [bodyORtitle, setBodyORtitle] = useState("titles");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [language, setlanguage] = useState(null);
  const [engagement, setEngagement] = useState(null);
  const [customState, setCustomState] = useState(null);

  // RTK-Query
  const [updateCustomTopic, updateCustomTopic_Obj] =
    useUpdateCustomTopicMutation();

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
    setTopicName(singleCustomTopic?.data?.name);
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
        size: 8,
        from: 0,
      },
    };
    setCustomState(customState1);
  }, [singleCustomTopic.data]);

  useEffect(() => {
    if (customState) {
      console.log("Runs");
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
          size: 8,
          from: 0,
        },
      };

      setCustomState(customState1);
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
  ]);

  // event handlers
  // any_keywords
  const any_keywords_addItem = (e) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();
      let value = any_keywords_value.trim();
      if (value) {
        setAny_keywords_list(any_keywords_list.concat(value));
        setAny_keywords_value("");
      }
    }
  };
  const any_keywords_deleteItem = (item) => {
    setAny_keywords_list(any_keywords_list.filter((i) => i !== item));
  };

  // must_also_keywords
  const must_also_keywords_addItem = (e) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();
      let value = must_also_keywords_value.trim();
      if (value) {
        setMust_also_keywords_list(must_also_keywords_list.concat(value));
        setMust_also_keywords_value("");
      }
    }
  };
  const must_also_keywords_deleteItem = (item) => {
    setMust_also_keywords_list(
      must_also_keywords_list.filter((i) => i !== item)
    );
  };

  // must_not_contains_keywords
  const must_not_contains_keywords_addItem = (e) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();
      let value = must_not_contains_keywords_value.trim();
      if (value) {
        setMust_not_contains_keywords_list(
          must_not_contains_keywords_list.concat(value)
        );
        setMust_not_contains_keywords_value("");
      }
    }
  };
  const must_not_contains_keywords_deleteItem = (item) => {
    setMust_not_contains_keywords_list(
      must_not_contains_keywords_list.filter((i) => i !== item)
    );
  };

  // exclude_domains_list
  const exclude_domains_list_addItem = (value) => {
    if (value) {
      setExclude_domains_list(exclude_domains_list.concat(value));
    }
  };
  const exclude_domains_list_deleteItem = (item) => {
    setExclude_domains_list(exclude_domains_list.filter((i) => i !== item));
  };

  // limit_domains_results_list
  const limit_domains_results_list_addItem = (value) => {
    if (value) {
      setLimit_domains_results_list(limit_domains_results_list.concat(value));
    }
  };
  const limit_domains_results_list_deleteItem = (item) => {
    setLimit_domains_results_list(
      limit_domains_results_list.filter((i) => i !== item)
    );
  };

  const custom_topic = {
    name: topicName,
    any_keywords: any_keywords_list,
    must_also_keywords: must_also_keywords_list,
    must_not_contains_keywords: must_not_contains_keywords_list,
    exclude_domains: exclude_domains_list,
    limit_domains_results: limit_domains_results_list,
    type: bodyORtitle,
    enddate: endDate,
    startdate: startDate,
    language: language,
    engagement: engagement,
  };
  const updateTopic = async (customTopic) => {
    console.log(customTopic);
    try {
      const res = await updateCustomTopic({
        customTopic,
        id: topicId,
      });
      if (res.data) cogoToast.success(res.data.successMsg);
      if (res.error) cogoToast.error(res.error.data.errorMsg);
    } catch (err) {
      console.log("ERROR OCCOURED WHILE CREATING CUSTOM TOPIC IN DB", err);
      console.log(
        "ERROR OCCOURED WHILE CREATING CUSTOM TOPIC IN DB",
        updateCustomTopic_Obj.error
      );
    }
  };

  return (
    <>
      {singleCustomTopic.data ? (
        <div className="flex lg:flex-row flex-col gap-6 rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
          {/* {/ div container /} */}
          <div className="basis-2/3  grid md:grid-cols-2 gap-6">
            <label className="block md:col-span-2">
              <Label className="font-bold text-lg">Topic Name</Label>
              <Input
                type="text"
                className="mt-1 rounded border-slate-300"
                placeholder="give a name to your such as, 'Digital Marketing'"
                // defaultValue={props?.topicData?.name}
                // value={topicName}
                defaultValue={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
            </label>

            <label className="block md:col-span-2">
              <Label className="font-bold text-lg">Build Your Query</Label>
              <p className="mt-1 text-sm text-neutral-500 ">let's start by</p>

              <p className="mt-5 text-base text-neutral-500 font-medium">
                Each result must contain at least <b>ONE</b> one of these
                keywords
              </p>
              <Input
                className="mt-1 rounded border-slate-300"
                placeholder="Enter your main keywords or phrases, e.g Social Media, Big Data..."
                onChange={(e) => setAny_keywords_value(e.target.value)}
                onKeyDown={(e) => any_keywords_addItem(e)}
                // value={any_keywords_value}
                defaultValue={any_keywords_value}
              />

              {/* {/ CHIPS /} */}
              <div className="flex flex-wrap mt-1.5">
                {any_keywords_list?.map((item, index) => {
                  return (
                    <div className="ml-1 mt-1" key={index}>
                      <Chip value={item} _delete={any_keywords_deleteItem} />
                    </div>
                  );
                })}
              </div>
            </label>

            <label className="block md:col-span-2 mt-5">
              <Label className="font-bold text-lg">Refine Your Query</Label>
              <br />
              <p className="mt-2 text-base text-neutral-500 font-medium">
                Each result <b>MUST ALSO</b> contain <b>ONE</b> one of these
                keywords
              </p>
              <Input
                className="mt-1 rounded border-slate-300"
                placeholder="Enter keywords or phrases, e.g tips, trends..."
                onChange={(e) => setMust_also_keywords_value(e.target.value)}
                onKeyDown={(e) => must_also_keywords_addItem(e)}
                // value={must_also_keywords_value}
                defaultValue={must_also_keywords_value}
              />

              {/* {/ CHIPS /} */}

              <div className="flex flex-wrap mt-1.5">
                {must_also_keywords_list?.map((val, index) => {
                  return (
                    <div className="ml-1 mt-1" key={index}>
                      <Chip
                        value={val}
                        _delete={must_also_keywords_deleteItem}
                      />
                    </div>
                  );
                })}
              </div>
            </label>

            <label className="block md:col-span-2 mt-4">
              <p className="mt-2 text-base text-neutral-500 font-medium">
                Each result must <b>NOT</b> contain any one of these keywords
              </p>
              <Input
                className="mt-1 rounded border-slate-300"
                placeholder="Enter keywords that you think are giving irrelevant, eg. job, course..."
                onChange={(e) =>
                  setMust_not_contains_keywords_value(e.target.value)
                }
                onKeyDown={(e) => must_not_contains_keywords_addItem(e)}
                // value={must_not_contains_keywords_value}
                defaultValue={must_not_contains_keywords_value}
              />
              {/* {/ CHIPS /} */}
              <div className="flex flex-wrap mt-1.5">
                {must_not_contains_keywords_list?.map((val, index) => {
                  return (
                    <div className="ml-1 mt-1" key={index}>
                      <Chip
                        value={val}
                        _delete={must_not_contains_keywords_deleteItem}
                      />
                    </div>
                  );
                })}
              </div>
            </label>

            {/* {/ EXCLUDE DOMAINS /} */}
            <label className="block md:col-span-2 mt-4">
              <p className="mt-2 text-base text-neutral-500 font-medium">
                <b>EXCLUDE</b> results from these domains
              </p>

              <ExcludeDomainInputField
                getSelectedvalve={exclude_domains_list_addItem}
              />
              {/* {/ CHIPS /} */}
              <div className="flex flex-wrap mt-1.5">
                {exclude_domains_list?.map((val, index) => {
                  return (
                    <div className="ml-1 mt-1" key={index}>
                      <Chip
                        value={val}
                        _delete={exclude_domains_list_deleteItem}
                      />
                    </div>
                  );
                })}
              </div>
            </label>

            {/* {/ LIMIT DOMAINS /} */}
            <label className="block md:col-span-2 mt-4">
              <p className="mt-2 text-base text-neutral-500 font-medium">
                <b>LIMIT</b> results to these domais only
              </p>

              <LimitDomainsInputField
                getSelectedvalve={limit_domains_results_list_addItem}
              />
              {/* {/ CHIPS /} */}
              <div className="flex flex-wrap mt-1.5">
                {limit_domains_results_list?.map((val, index) => {
                  return (
                    <div className="ml-1 mt-1" key={index}>
                      <Chip
                        value={val}
                        _delete={limit_domains_results_list_deleteItem}
                      />
                    </div>
                  );
                })}
              </div>
            </label>

            <label className="block md:col-span-2 mt-5">
              <Label className="font-bold text-lg">Set Default Filters</Label>
            </label>

            {/* Set Default Filters */}
            {/* ============== Date Range DropDown ================= */}
            <div className="grid grid-cols-12 md:col-span-2 gap-2">
              <label className="mt-1 col-span-6 sm:col-span-4 md:col-span-3">
                <DateRangeDropDown
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
              </label>

              {/* ============== Language SelectBox ================= */}
              <label className="mt-1 col-span-6 sm:col-span-4 md:col-span-3">
                <span className="mt-1 bg-gray-100">
                  <CustomTopicLanguageSelect
                    setlanguage={setlanguage}
                    lists={LanguagesList}
                  />
                </span>
              </label>

              {/* ============== Sorting SelectBox ================= */}
              <label className="col-span-6 sm:col-span-4 md:col-span-3">
                <CustomTopicSortSelect
                  setEngagement={setEngagement}
                  lists={sortingList}
                />
              </label>
            </div>

            <label className="block md:col-span-2 mt-5">
              <Label className="font-bold text-lg">Matching Criteria</Label>
              <div className="mt-3">
                <input
                  type="radio"
                  id="titles"
                  // value={bodyORtitle}
                  checked={bodyORtitle == "titles"}
                  onChange={() => setBodyORtitle("titles")}
                  className="w-3.5 h-3.5"
                />
                <label className="text-sm ml-4 font-normal" htmlFor="titles">
                  Match query in titles only
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="radio"
                  id="body"
                  // value={bodyORtitle}
                  checked={bodyORtitle == "body"}
                  onChange={() => setBodyORtitle("body")}
                  className="w-3.5 h-3.5"
                />
                <label className="text-sm ml-4 font-normal" htmlFor="body">
                  Match query in titles and body content
                </label>
              </div>
            </label>

            <ButtonPrimary
              onClick={(e) => {
                e.preventDefault();
                updateTopic(custom_topic);
              }}
              className="md:col-span-2"
            >
              Update
            </ButtonPrimary>
          </div>

          {/* {/ CONTENT FEED CONTAINER /} */}

          <div className="basis-1/3	">
            {customState ? <WidgetPosts customTopic={customState} /> : null}
          </div>
        </div>
      ) : (
        "loading"
      )}{" "}
    </>
  );
};

export default EditCustomTopicForm;

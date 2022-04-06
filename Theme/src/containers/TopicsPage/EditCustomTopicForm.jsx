import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import Select from "../../components/Select/Select";
import Textarea from "../../components/Textarea/Textarea";
import Label from "../../components/Label/Label";
import WidgetPosts from "../../components/WidgetPosts/WidgetPosts";
import { DEMO_POSTS } from "../../data/posts";
import Chip from "../../components/chip/chip";
import { set } from "date-fns";
import ExcludeResultInputField from "../../components/ExcludeResultInputField/ExcludeResultInputField";
import LimitResultInputField from "../../components/LimitResultInputField/LimitResultInputField";
import { useParams, useHistory } from "react-router-dom";
import {
  useUpdateCustomTopicMutation,
  useGetAllCustomTopicsQuery,
} from "../../app/Api/contentApi";

const widgetPostsDemo = DEMO_POSTS.filter((_, i) => i > 2 && i < 7);

const EditCustomTopicForm = (values) => {
  const history = useHistory();
  const [updateCustomTopic, { isError, isLoading }] =
    useUpdateCustomTopicMutation();

  // states

  const [loadedFlag, setLoadedFlag] = useState(false);
  const [topicName, setTopicName] = useState(""); // topic name

  // selection
  const [domainORtopic, setDomainORtopic] = useState("topics"); // match_type

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

  // filters
  const [bodyORtitle, setBodyORtitle] = useState("titles");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [language, setlanguage] = useState(null);
  const [engagement, setEngagement] = useState(null);

  // if (values) {
  //   setLoadedFlag(true);
  //   console.log("In if", values);
  // }

  useEffect(() => {
    console.log("Insidde useeffect");
    setAny_keywords_list(values?.topicData?.selection?.any_keywords);
    setMust_also_keywords_list(
      values?.topicData?.selection?.must_also_keywords
    );
    setMust_not_contains_keywords_list(
      values?.topicData?.selection?.must_not_contains_keywords
    );
    setExclude_domains_list(values?.topicData?.selection?.exclude_domains);
    setLimit_domains_results_list(
      values?.topicData?.selection?.limit_domains_results
    );
    setStartDate(values?.topicData?.filters?.startdate);
    setEndDate(values?.topicData?.filters?.enddate);
    setTopicName(values?.topicData?.name);
    setlanguage(values?.topicData?.filters?.language);
    setEngagement(values?.topicData?.filters?.engagement);
  }, []);

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
  console.log(any_keywords_list);
  return (
    <>
      {values ? (
        <div className="flex lg:flex-row flex-col gap-6 rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
          {/* {/ form container /} */}
          <form className="basis-2/3  grid md:grid-cols-2 gap-6">
            <label className="block md:col-span-2">
              <Label className="font-bold text-lg">Topic Name</Label>
              <Input
                type="text"
                className="mt-1 rounded border-slate-300"
                placeholder="give a name to your such as, 'Digital Marketing'"
                // defaultValue={values?.topicData?.name}
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
            </label>

            <label className="block md:col-span-2">
              <Label className="font-bold text-lg">Build Your Query</Label>
              <p className="mt-1 text-sm text-neutral-500 ">let's start by</p>

              <div className="mt-2">
                <input
                  type="radio"
                  id="topics"
                  // value="topics"
                  value={domainORtopic}
                  checked={domainORtopic == "topics"}
                  onClick={() => setDomainORtopic("topics")}
                  className="w-3.5 h-3.5"
                />
                <label className="text-sm ml-4 font-normal" htmlFor="topics">
                  Adding topics and keywords
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="radio"
                  id="domians"
                  // value="domians"
                  value={domainORtopic}
                  checked={domainORtopic == "domians"}
                  onClick={() => setDomainORtopic("domians")}
                  className="w-3.5 h-3.5"
                />
                <label className="text-sm ml-4 font-normal" htmlFor="domians">
                  Adding domins as sources
                </label>
              </div>

              <p className="mt-5 text-base text-neutral-500 font-medium">
                Each result must contain at least <b>ONE</b> one of these
                keywords
              </p>
              <Input
                className="mt-1 rounded border-slate-300"
                placeholder="Enter your main keywords or phrases, e.g Social Media, Big Data..."
                onChange={(e) => setAny_keywords_value(e.target.value)}
                onKeyDown={(e) => any_keywords_addItem(e)}
                value={any_keywords_value}
              />

              {/* {/ CHIPS /} */}
              <div className="flex flex-wrap mt-1.5">
                {any_keywords_list.map((item, index) => {
                  return (
                    <>
                      <div className="ml-1 mt-1" key={index}>
                        <Chip value={item} _delete={any_keywords_deleteItem} />
                      </div>
                    </>
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
                value={must_also_keywords_value}
              />

              {/* {/ CHIPS /} */}

              <div className="flex flex-wrap mt-1.5">
                {must_also_keywords_list.map((val, index) => {
                  return (
                    <>
                      <div className="ml-1 mt-1" key={index}>
                        <Chip
                          value={val}
                          _delete={must_also_keywords_deleteItem}
                        />
                      </div>
                    </>
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
                value={must_not_contains_keywords_value}
              />
              {/* {/ CHIPS /} */}
              <div className="flex flex-wrap mt-1.5">
                {must_not_contains_keywords_list.map((val, index) => {
                  return (
                    <>
                      <div className="ml-1 mt-1" key={index}>
                        <Chip
                          value={val}
                          _delete={must_not_contains_keywords_deleteItem}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </label>

            {/* {/ EXCLUDE DOMAINS /} */}
            <label className="block md:col-span-2 mt-4">
              <p className="mt-2 text-base text-neutral-500 font-medium">
                <b>EXCLUDE</b> results from these domains
              </p>

              <ExcludeResultInputField
                getSelectedvalve={exclude_domains_list_addItem}
              />
              {/* {/ CHIPS /} */}
              <div className="flex flex-wrap mt-1.5">
                {exclude_domains_list?.map((val, index) => {
                  return (
                    <>
                      <div className="ml-1 mt-1" key={index}>
                        <Chip
                          value={val}
                          _delete={exclude_domains_list_deleteItem}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </label>

            {/* {/ LIMIT DOMAINS /} */}
            <label className="block md:col-span-2 mt-4">
              <p className="mt-2 text-base text-neutral-500 font-medium">
                <b>LIMIT</b> results to these domais only
              </p>

              <LimitResultInputField
                getSelectedvalve={limit_domains_results_list_addItem}
              />
              {/* {/ CHIPS /} */}
              <div className="flex flex-wrap mt-1.5">
                {limit_domains_results_list?.map((val, index) => {
                  return (
                    <>
                      <div className="ml-1 mt-1" key={index}>
                        <Chip
                          value={val}
                          _delete={limit_domains_results_list_deleteItem}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </label>

            <label className="block md:col-span-2 mt-5">
              <Label className="font-bold text-lg">Set Default Filters</Label>
            </label>

            <div className="grid grid-cols-12 md:col-span-2 gap-2">
              <label className="col-span-6 sm:col-span-4 md:col-span-3">
                {/* {/ <Label>Set start date</Label> /} */}

                <Select
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 rounded bg-gray-100 border-slate-300"
                >
                  <option value={null}>Start Date</option>
                  <option value="2021-11-02">2021-11-02</option>
                  <option value="2021-11-02">2021-11-03</option>
                  <option value="2021-11-02">2021-11-04</option>
                </Select>
              </label>

              <label className="col-span-6 sm:col-span-4 md:col-span-3">
                {/* {/ <Label>Set end date</Label> /} */}

                <Select
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 rounded bg-gray-100 border-slate-300"
                >
                  <option value={null}>End Date</option>
                  <option value="2021-11-03">2021-11-08</option>
                  <option value="2021-11-03">2021-11-09</option>
                  <option value="2021-11-03">2021-11-10</option>
                  <option value="2021-11-03">2021-11-11</option>
                </Select>
              </label>

              <label className="col-span-6 sm:col-span-4 md:col-span-3">
                <Select
                  onChange={(e) => setlanguage(e.target.value)}
                  className="mt-1 rounded bg-gray-100 border-slate-300"
                >
                  <option value="-1">Select language</option>
                  <option value="English">English</option>
                  <option value="German">German</option>
                  <option value="French">French</option>
                </Select>
              </label>

              <label className="col-span-6 sm:col-span-4 md:col-span-3">
                {/* {/ <Label>Select Engagement</Label> /} */}

                <Select
                  onChange={(e) => setEngagement(e.target.value)}
                  className="mt-1 rounded bg-gray-100 border-slate-300"
                >
                  <option value="-1">Select engagement</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Facebook">Facebook</option>
                </Select>
              </label>
            </div>

            <label className="block md:col-span-2 mt-5">
              <Label className="font-bold text-lg">Matching Criteria</Label>
              <div className="mt-3">
                <input
                  type="radio"
                  id="titles"
                  value={bodyORtitle}
                  checked={bodyORtitle == "titles"}
                  onClick={() => setBodyORtitle("titles")}
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
                  value={bodyORtitle}
                  checked={bodyORtitle == "body"}
                  onClick={() => setBodyORtitle("body")}
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
                const custom_topic = {
                  _id: values?.topicData?._id,
                  userId: "123abc...",
                  name: topicName,
                  any_keywords: any_keywords_list,
                  match_type: domainORtopic,
                  must_also_keywords: must_also_keywords_list,
                  must_not_contains_keywords: must_not_contains_keywords_list,
                  exclude_domains: exclude_domains_list,
                  limit_domains_results: limit_domains_results_list,
                  enddate: endDate,
                  startdate: startDate,
                  language: language,
                };
                updateCustomTopic(custom_topic);
                // history.push("/topics");
                console.log("in update btn", custom_topic);
              }}
              className="md:col-span-2"
            >
              Update
            </ButtonPrimary>
          </form>

          {/* {/ CONTENT FEED CONTAINER /} */}

          {/* <div className="basis-1/3	">
        <WidgetPosts posts={widgetPostsDemo} />
      </div> */}
        </div>
      ) : (
        "loading"
      )}
    </>
  );
};

export default EditCustomTopicForm;

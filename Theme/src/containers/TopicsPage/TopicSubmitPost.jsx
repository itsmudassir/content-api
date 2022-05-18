import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import Select from "../../components/Select/Select";
import Label from "../../components/Label/Label";
import WidgetPosts from "../../components/WidgetPosts/WidgetPosts";
import { DEMO_POSTS } from "../../data/posts";
import Chip from "../../components/chip/chip";
import ExcludeResultInputField from "../../components/ExcludeResultInputField/ExcludeResultInputField";
import LimitResultInputField from "../../components/LimitResultInputField/LimitResultInputField";
import { useCreateTopicMutation } from "../../app/Api/contentApi";
import cogoToast from "cogo-toast";
import { gql, useQuery } from "@apollo/client";
import { useSearchkitVariables } from "@searchkit/client";
import LoadingVideo from "../../components/LoadingVideo/LoadingVideo";
import DateRangeDropDown from "../../components/DateRangeCalender/DateRangeDropDown";
import ArchiveFilterListBox from "../../components/ArchiveFilterListBox/ArchiveFilterListBox";
import { useSearchkit } from '@searchkit/client'

const query = gql`
  query resultSet(
    $query: String
    $filters: [SKFiltersSet]
    $page: SKPageInput
    $sortBy: String
  ) {
    results(query: $query, filters: $filters) {
      summary {
        total
        appliedFilters {
          id
          identifier
          display
          label
          ... on DateRangeSelectedFilter {
            dateMin
            dateMax
            __typename
          }

          ... on ValueSelectedFilter {
            value
            __typename
          }
          __typename
        }
        sortOptions {
          id
          label
          __typename
        }
        query
        __typename
      }
      hits(page: $page, sortBy: $sortBy) {
        page {
          total
          totalPages
          pageNumber
          from
          size
          __typename
        }
        sortedBy

        items {
          ... on ResultHit {
            id
            fields {
              article_length
              category
              authors
              date_download
              language
              facebook_shares
              sentiment
              url
              readtime
              image_url
              twitter_shares
              maintext
              source_domain
              title
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      facets {
        identifier
        type
        label
        display
        entries {
          label
          count
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

const FILTERS = [
  { label: "Relevance", id: "relevance" },
  { label: "Facebook Shares", id: "facebook_shares" },
  { label: "Twitter Shares", id: "twitter_shares" },
  { label: "Date Download", id: "date_download" },
];

const TopicSubmitPost = () => {
  /////////////////////////////////graphql code starts ////////////////////////////////////////////
  const api = useSearchkit();
  const variables = useSearchkitVariables();
  if (variables?.page.size) {
    variables.page.size = 20;
  }
  console.log(variables?.page.size);

  var { data, error, loading } = useQuery(query, { variables });

  if (error) {
    cogoToast.error("This is a error message", {
      position: "top-left",
    });
  }

  if (loading) {
    <div style={{ display: "flex", alignItems: "center" }}>
      {" "}
      <LoadingVideo />
    </div>;
  }

  // states
  const [topicName, setTopicName] = useState(null); // topic name

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
  const [createTopic, { isError, isLoading }] = useCreateTopicMutation();

  // const custom_topic = {
  //   userId: "123abc...",
  //   name: topicName,
  //   filters: {
  //     type: bodyORtitle,
  //     startdate: startDate,
  //     enddate: endDate,
  //     language: language,
  //     engagement: engagement,
  //   },
  //   selection: {
  //     match_type: domainORtopic,
  //     // any_keywords: any_keywords,
  //     // must_also_keywords: must_also_keywords,
  //     // must_not_contains_keywords: must_not_contains_keywords,
  //     // exclude_domains: exclude_domains,
  //     // limit_domains_results: limit_domains_results,
  //   },
  // };
  const custom_topic = {
    _id: "1211",
    userId: "asdasfsa468sa46sag",
    name: topicName,
    any_keywords: any_keywords_list,
    match_type: domainORtopic,
    must_also_keywords: must_also_keywords_list,
    must_not_contains_keywords: must_not_contains_keywords_list,
    exclude_domains: exclude_domains_list, // ["exclude_domains_list.com"],
    limit_domains_results: limit_domains_results_list, //["www.limit_domains_results_list"],
    enddate: endDate,
    startdate: startDate,
    language: language,
  };
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

  useEffect(() => {
    let filterObj = [{ "criteria": domainORtopic, "bodyORtitle": bodyORtitle }];
    if (any_keywords_list.length !== 0) {
      filterObj.push({
        "any_keywords_list" : any_keywords_list
      });
    }
    if (must_also_keywords_list.length !== 0) {
      filterObj.push({
        "must_also_keywords_list" : must_also_keywords_list
      });
    }
    if (must_not_contains_keywords_list.length !== 0) {
      filterObj.push({
        "must_not_contains_keywords_list" : must_not_contains_keywords_list
      });
    }
    if (exclude_domains_list.length !== 0) {
      filterObj.push({
        "exclude_domains_list" : exclude_domains_list
      });
    }
    if (limit_domains_results_list.length !== 0) {
      filterObj.push({
        "limit_domains_results_list" : limit_domains_results_list
      });
    }
    if (startDate !== null) {
      filterObj.push({
        "startDate" : startDate
      });
    }
    if (endDate !== null) {
      filterObj.push({
        "endDate" : endDate
      });
    }
    if (language !== null) {
      filterObj.push({
        "language" : language
      });
    }
    if (engagement !== null) {
      filterObj.push({
        "engagement" : engagement
      });
    }
    console.log("CUSTOM TOPIC ",filterObj);
    let jsonob= JSON.stringify(filterObj)
    api.toggleFilter({ identifier: "CustomFilter",  value: jsonob})
    api.setPage({ size: 20, from: 0 })
    api.search()
  }, [engagement,language,endDate,startDate,bodyORtitle,exclude_domains_list,any_keywords_list, must_also_keywords_list,must_not_contains_keywords_list]);


  console.log("SEARCHKIT DATA",data);
  return (
    <div className="flex lg:flex-row flex-col gap-6 rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      {/* {/ form container /} */}
      <form className="basis-2/3  grid md:grid-cols-2 gap-6">
        <label className="block md:col-span-2">
          <Label className="font-bold text-lg">Topic Name</Label>
          <Input
            type="text"
            className="mt-1 rounded border-slate-300"
            placeholder="give a name to your such as, 'Digital Marketing'"
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
            Each result must contain at least <b>ONE</b> one of these keywords
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
                    <Chip value={val} _delete={must_also_keywords_deleteItem} />
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

        {/* Set Default Filters */}

        <div className="grid grid-cols-12 md:col-span-2 gap-2">
          <label className="mt-1 col-span-6 sm:col-span-4 md:col-span-3">
            <DateRangeDropDown facet={data?.results?.facets} />
          </label>

          <label className="mt-1 col-span-6 sm:col-span-4 md:col-span-3">
            <span className="mt-1 bg-gray-100">
              <ArchiveFilterListBox lists={FILTERS} />
            </span>
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

            // createTopic(custom_topic);
            // console.log("Custom Topic", filterObj);
          }}
          className="md:col-span-2"
        >
          Save
        </ButtonPrimary>
      </form>

      {/* {/ CONTENT FEED CONTAINER /} */}

      <div className="basis-1/3	">
        <WidgetPosts posts={data} />
      </div>
    </div>
  );
};

export default TopicSubmitPost;

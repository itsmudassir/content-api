import React, { useState } from "react";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import Select from "../../components/Select/Select";
import Label from "../../components/Label/Label";
import WidgetPosts from "../../components/WidgetPosts/WidgetPosts";
import { DEMO_POSTS } from "../../data/posts";
import Chip from "../../components/chip/chip";
import { set } from "date-fns";
// import InputAutoComplete from "../../components/InputAutoComplete/InputAutoComplete";
import { gql, useQuery } from "@apollo/client";
import { useSearchkitVariables, useSearchkit } from '@searchkit/client'
import {
  withSearchkit, withSearchkitRouting, useSearchkitQueryValue
} from '@searchkit/client'
import LoadingVideo from "../../components/LoadingVideo/LoadingVideo";
import DateRangeDropDown from "../../components/DateRangeCalender/DateRangeDropDown";
import ArchiveFilterListBox from "../../components/ArchiveFilterListBox/ArchiveFilterListBox";
// const widgetPostsDemo = DEMO_POSTS.filter((_, i) => i > 2 && i < 7);



const query = gql`
query resultSet($query: String, $filters: [SKFiltersSet], $page: SKPageInput, $sortBy: String) {
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
`

const FILTERS = [
  { label: "Relevance", id: "relevance" },
  { label: "Facebook Shares", id: "facebook_shares" },
  { label: "Twitter Shares", id: "twitter_shares" },
  { label: "Date Download", id: "date_download" },
];

const TopicSubmitPost = () => {
  /////////////////////////////////graphql code starts ////////////////////////////////////////////

  
  const variables = useSearchkitVariables();
  if (variables?.page.size) {
    variables.page.size = 20
  }
  console.log(variables?.page.size)


  const { data, error, loading } = useQuery(query, { variables });

  if (error) {
    console.log("An error Occured" + error);
  }

  if (loading) {
   <div style={{display : "flex", alignItems : "center"}}> <LoadingVideo /></div> ;
  }
  console.log(data , "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  /////////////////////////////////graphql code ends ////////////////////////////////////////////

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

  const [exclude_domains, setExclude_domains] = useState(null); // exclude_domains
  const [limit_domains_results, setLimit_domains_results] = useState(null); // limit_domains_results

  // filters
  const [bodyORtitle, setBodyORtitle] = useState("titles");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [language, setlanguage] = useState(null);
  const [engagement, setEngagement] = useState(null);

  const custom_topic = {
    userId: "123abc...",
    name: topicName,
    filters: {
      type: bodyORtitle,
      startdate: startDate,
      enddate: endDate,
      language: language,
      engagement: engagement,
    },
    selection: {
      match_type: domainORtopic,
      exclude_domains: exclude_domains,
      limit_domains_results: limit_domains_results,
    },
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

        <label className="block md:col-span-2 mt-4">
          <p className="mt-2 text-base text-neutral-500 font-medium">
            <b>EXCLUDE</b> results from these domains
          </p>

          <Input
            className="mt-1 rounded border-slate-300"
            placeholder="Enter domains that you think are giving irrelevant, e.g job, course..."
            onChange={(e) => setExclude_domains(e.target.value)}
          />
        </label>

        <label className="block md:col-span-2 mt-4">
          <p className="mt-2 text-base text-neutral-500 font-medium">
            <b>LIMIT</b> results to these domais only
          </p>

          <Input
            className="mt-1 rounded border-slate-300"
            placeholder="Enter domains to see results from only these sites... e.g cnn.com, bbc.com"
            onChange={(e) => setLimit_domains_results(e.target.value)}
          />
        </label>

        <label className="block md:col-span-2 mt-5">
          <Label className="font-bold text-lg">Set Default Filters</Label>
        </label>

        <div className="grid grid-cols-12 md:col-span-2 gap-2">
          <label className="mt-1 col-span-6 sm:col-span-4 md:col-span-3">
         
           
               <DateRangeDropDown facet={data?.results?.facets}/>
              
           
          </label>

          <label className="mt-1 col-span-6 sm:col-span-4 md:col-span-3" >
         
           <span className="mt-1 bg-gray-100"  >
               <ArchiveFilterListBox lists={FILTERS} />
            </span>
              
           
          </label>

          {/* <label className="col-span-6 sm:col-span-4 md:col-span-3">
            

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
          </label> */}
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
            console.log(custom_topic);
          }}
          className="md:col-span-2"
        >
          Save
        </ButtonPrimary>
      </form>


      <div className="basis-1/3	">
        <WidgetPosts posts={data} />
      </div>
    </div>
  );
};

export default TopicSubmitPost;

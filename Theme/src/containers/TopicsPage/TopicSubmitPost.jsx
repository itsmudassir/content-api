import React, { useState } from "react";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import Select from "../../components/Select/Select";
import Textarea from "../../components/Textarea/Textarea";
import Label from "../../components/Label/Label";
import WidgetPosts from "../../components/WidgetPosts/WidgetPosts";
import { DEMO_POSTS } from "../../data/posts";
import Chip from "../../components/chip/chip";

const widgetPostsDemo = DEMO_POSTS.filter((_, i) => i > 2 && i < 7);

const TopicSubmitPost = () => {
  const [topicName, setTopicName] = useState(null); // topic name

  // selection
  const [domainORtopic, setDomainORtopic] = useState("topics"); // match_type
  const [any_keywords, setAny_keywords] = useState({
    items: [],
    value: "",
  }); // any_keywords
  const [must_also_keywords, setMust_also_keywords] = useState(null); // must_also_keywords
  const [must_not_contains_keywords, setMust_not_contains_keywords] =
    useState(null); // must_not_contains_keywords
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
      any_keywords: any_keywords,
      must_also_keywords: must_also_keywords,
      must_not_contains_keywords: must_not_contains_keywords,
      exclude_domains: exclude_domains,
      limit_domains_results: limit_domains_results,
    },
  };

  const arr = [
    "saad",
    "Numair",
    "Shaikh Muhammad saad",
    "Muhammad Saad",
    "saad",
    "Shaikh Muhammad saad",
    "Muhammad Saad",
    "saad",
    "Muhammad Saad",
    "Shaikh Muhammad saad",
    "Muhammad Saad",
  ];

  const any_keywords_OnChange = (e) => {
    e.preventDefault();
    setAny_keywords({ value: e.target.value });
  };

  const any_keywords_KeyDown = (e) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();
      let value = any_keywords.value.trim();
      if (value) {
        setAny_keywords((prevState) => {
          if (prevState.items == undefined) {
            return { items: [value], value: "" };
          } else {
            return {
              items: [...prevState.items, value],
              value: "",
            };
          }
        });
      }
    }
  };
  console.log(any_keywords);
  return (
    <div className="flex lg:flex-row flex-col gap-6 rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      {/* form container */}
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
            onChange={(e) => any_keywords_OnChange(e)}
            onKeyDown={(e) => any_keywords_KeyDown(e)}
            defaultvalue={any_keywords.items}
          />

          {/* CHIPS */}
          <div className="flex flex-wrap mt-1.5">
            {any_keywords.items?.map((val, index) => {
              return (
                <>
                  <div className="ml-1 mt-1" key={index}>
                    <Chip value={val} />
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
            onChange={(e) => setMust_also_keywords(e.target.value)}
          />
        </label>

        <label className="block md:col-span-2 mt-4">
          <p className="mt-2 text-base text-neutral-500 font-medium">
            Each result must <b>NOT</b> contain any one of these keywords
          </p>
          <Input
            className="mt-1 rounded border-slate-300"
            placeholder="Enter keywords that you think are giving irrelevant, eg. job, course..."
            onChange={(e) => setMust_not_contains_keywords(e.target.value)}
          />
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
          <label className="col-span-6 sm:col-span-4 md:col-span-3">
            {/* <Label>Set start date</Label> */}

            <Select
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 rounded bg-gray-100 border-slate-300"
            >
              <option value={null}>Start Date</option>
              <option value="2021-11-02">2021-11-02</option>
              <option value="2021-11-02">2021-11-02</option>
              <option value="2021-11-02">2021-11-02</option>
            </Select>
          </label>

          <label className="col-span-6 sm:col-span-4 md:col-span-3">
            {/* <Label>Set end date</Label> */}

            <Select
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 rounded bg-gray-100 border-slate-300"
            >
              <option value={null}>End Date</option>
              <option value="2021-11-03">2021-11-03</option>
              <option value="2021-11-03">2021-11-03</option>
              <option value="2021-11-03">2021-11-03</option>
            </Select>
          </label>

          <label className="col-span-6 sm:col-span-4 md:col-span-3">
            {/* <Label>Select Language</Label> */}

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
            {/* <Label>Select Engagement</Label> */}

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
            console.log(custom_topic);
          }}
          className="md:col-span-2"
        >
          Save
        </ButtonPrimary>
      </form>

      {/* CONTENT FEED CONTAINER */}
      <div className="basis-1/3	">
        <WidgetPosts posts={widgetPostsDemo} />
      </div>
    </div>
  );
};

export default TopicSubmitPost;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import InsightsCard from "../../components/InsightsCard/InsightsCard";
import AvgEngagementByNetwork from "../../components/Graphs/AvgEngagementByNetwork";
import TotalEngagementByNetwork from "../../components/Graphs/TotalEngagementByNetwork";
import ArticlePerDateChart from "../../components/Graphs/ArticlePerDateChart";
import PopularWordCount from "../../components/Graphs/PopularWordCount";
import PopularReadingLevels from "../../components/Graphs/PopularReadingLevels";
import PopularDays from "../../components/Graphs/PopularDays";
import TopDomainsDonut from "../../components/Graphs/TopDomainsDonut";
import DateRangeDropDown from "../../components/DateRangeCalender/DateRangeDropDown";
import { useGetInsightsMutation } from "../../app/Api/contentApi";

const PageInsights = ({ searchKitData }) => {
  // states
  const [articlesAnalyzed, setArticlesAnalyzed] = useState();
  const [totalEngagements, setTotalEngagements] = useState();
  const [avgEngagements, setAvgEngagements] = useState();
  const [avgEngagementByChannel, setAvgEngagementByChannel] = useState();
  const [article_per_date, setArticle_per_date] = useState();
  const [avgEngagementByNetwork, setAvgEngagementByNetwork] = useState();
  const [totalEngagementByNetwork, setTotalEngagementByNetwork] = useState();
  const [popular_word_count, setPopular_word_count] = useState();
  const [popularReadingLevels, setPopularReadingLevels] = useState();
  const [popularDays, setPopularDays] = useState();
  const [top_domians, setTop_domians] = useState();

  // RTK Query
  const [getInsights, getInsightsObj] = useGetInsightsMutation();

  // Search params parsing
  const { search, location } = useLocation();
  const { customCateogry, customQuery } = queryString.parse(search);

  useEffect(async () => {
    try {
      const res = await getInsights({
        startDate: "2022-03-01",
        endDate: "2022-03-11",
      });
      var data = res?.data?.aggregations.range.buckets[0];
      setArticlesAnalyzed(data?.doc_count);
      setTotalEngagements(data?.total_engagement.value);
      setAvgEngagements(data?.avg_engagement.value);
      setAvgEngagementByChannel({
        facebook: data?.avg_facebook_shares.value,
        twitter: data?.avg_twitter_shares.value,
      });
      setArticle_per_date(data?.article_per_date);
      setAvgEngagementByNetwork({
        facebook: data?.avg_facebook_shares.value,
        twitter: data?.avg_twitter_shares.value,
      });
      setTotalEngagementByNetwork({
        facebook: data?.sum_facebook_shares.value,
        twitter: data?.sum_twitter_shares.value,
      });
      setPopular_word_count(data?.popular_word_count);
      setPopularReadingLevels(data["Popular Reading Levels"]);
      setPopularDays(data["Popular Days"]);
      setTop_domians(data.top_domians_by_most_articles_published);

      console.log(data ? data : "loading...");
    } catch (err) {
      console.log("ERROR OCCOURED WHILE FETCHING INSIGHTS", err);
    }
  }, []);

  if (!articlesAnalyzed) return "Loading...";
  return (
    <>
      <div className="py-16 w-screen">
        <hr className="mx-4 sm:mx-8 py-4" />

        {/* date range */}
        <div className="flex justify-start items-center mx-10">
          <DateRangeDropDown facet={searchKitData?.results?.facets} />
        </div>

        {/* card container */}
        <div className="py-5 px-3 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl bg-slate-200 rounded-xl">
          <div className="flex justify-start mb-4">
            <p className=" font-semibold">Summary</p>
          </div>
          <div className="flex flex-col justify-center items-start md:flex-row md:items-center md:justify-center">
            {/* <div className="flex flex-row justify-center items-center my-4 space-x-4"> */}
            <InsightsCard title="Articles Analyzed" values={articlesAnalyzed} />
            <InsightsCard title="Total Engagements" values={totalEngagements} />
            <InsightsCard title="Avg. Engagements" values={avgEngagements} />
            <InsightsCard
              title="Avg. Engagement By Channel"
              values={avgEngagementByChannel}
              hasIcons={true}
            />
          </div>
        </div>

        {/* ArticlePerDateChart  */}   
          <div className="py-5 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-200">
            <ArticlePerDateChart data={article_per_date} />
          </div>
   
        {/* EngagementByNetwork Charts Grid */}
        <div className="grid grid-cols-1 gap-x-2.5 lg:gap-x-5 md:grid-cols-2 mx-4 sm:mx-8">
          <div className="px-0 sm:px-2 py-5 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-200">
            <AvgEngagementByNetwork data={avgEngagementByNetwork} />
          </div>
          <div className="px-0 sm:px-2 py-5 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-200">
            <TotalEngagementByNetwork data={totalEngagementByNetwork} />
          </div>
        </div>

        {/* Popular Word Count chart */}
        <div className="py-5 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-200">
          <PopularWordCount data={popular_word_count} />
        </div>

        {/* Popular Reading Levels chart */}
        <div className="py-5 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-200">
          <PopularReadingLevels data={popularReadingLevels} />
        </div>

        {/* Popular Days chart */}
        <div className="py-5 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-200">
          <PopularDays data={popularDays} />
        </div>

        {/* Donut Graph  */}
        {
          top_domians?
        <div className="pr-2 py-5 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-200">
          {/* <TopDomainsDonut  data={top_domians}/> */}
        </div>
        : "loading.."
        }

      </div>
    </>
  );
};

export default PageInsights;

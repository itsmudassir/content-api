import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import InsightsCard from "../../components/InsightsCard/InsightsCard";
import Graph1 from "../../components/Graphs/Graph1";
import ArticlePerDateChart from "../../components/Graphs/ArticlePerDateChart";
import DonutGraph from "../../components/Graphs/DonutGraph";
import OtherGraphs1 from "../../components/Graphs/OtherGraphs1";
import DateRangeDropDown from "../../components/DateRangeCalender/DateRangeDropDown";
import { useGetInsightsMutation } from "../../app/Api/contentApi";

const PageInsights = ({ searchKitData }) => {
  // states
  const [articlesAnalyzed, setArticlesAnalyzed] = useState();
  const [totalEngagements, setTotalEngagements] = useState();
  const [avgEngagements, setAvgEngagements] = useState();
  const [avgEngagementByChannel, setAvgEngagementByChannel] = useState();
  const [article_per_date, setArticle_per_date] = useState();

  // RTK Query
  const [getInsights, getInsightsObj] = useGetInsightsMutation();

  // Search params parsing
  const { search, location } = useLocation();
  const { customCateogry, customQuery } = queryString.parse(search);

  useEffect(async () => {
    try {
      const res = await getInsights({
        startDate: "2022-03-01",
        endDate: "2022-03-10",
      });
      let data = res.data.aggregations.range.buckets[0];
      setArticlesAnalyzed(data.doc_count);
      setTotalEngagements(data.total_engagement.value);
      setAvgEngagements(data.avg_engagement.value);
      setAvgEngagementByChannel({
        facebook: data.avg_facebook_shares.value,
        twitter: data.avg_twitter_shares.value,
      });
      setArticle_per_date(data.article_per_date);

      console.log(data);
    } catch (err) {
      console.log("ERROR OCCOURED WHILE FETCHING INSIGHTS", err);
    }
  }, []);

  return (
    <>
      <div className="py-16 w-screen">
        <hr className="mx-4 sm:mx-8 py-4" />

        {/* date range */}
        <div className="flex justify-start items-center mx-10">
          <DateRangeDropDown facet={searchKitData?.results?.facets} />
        </div>

        {/* card container */}
        <div className="py-5 px-3 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl bg-slate-100 rounded-xl">
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
        <div className="py-5 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
          <ArticlePerDateChart data={article_per_date} />
        </div>

        {/* Graph1  */}
        <div className="px-0 sm:px-2 py-5 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
          <Graph1 />
        </div>

        {/* Donut Graph  */}
        <div className="pr-2 py-5 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
          <DonutGraph />
        </div>

        {/* Other Graphs  */}
        <div className="px-0 sm:px-2 py-5 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
          <OtherGraphs1 />
        </div>
      </div>
    </>
  );
};

export default PageInsights;

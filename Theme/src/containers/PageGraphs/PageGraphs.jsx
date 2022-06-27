import React, { useEffect, useState } from "react";
import InsightsCard from "../../components/InsightsCard/InsightsCard";
import AvgEngagementByNetwork from "../../components/Graphs/AvgEngagementByNetwork";
import TotalEngagementByNetwork from "../../components/Graphs/TotalEngagementByNetwork";
import ArticlePerDateChart from "../../components/Graphs/ArticlePerDateChart";
import PopularWordCount from "../../components/Graphs/PopularWordCount";
import PopularReadingLevels from "../../components/Graphs/PopularReadingLevels";
import PopularDays from "../../components/Graphs/PopularDays";
import TopDomainsDonut from "../../components/Graphs/TopDomainsDonut";
import TopKeyWords from "../../components/Graphs/TopKeyWords";
import LoadingVideo from "../../components/LoadingVideo/LoadingVideo";


const PageGraphs = ({ data }) => {
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
  const [top_keywords, setTop_keywords] = useState();

  // Search params parsing

  useEffect(async () => {
    try {
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
      setPopularReadingLevels(data? data["Popular Reading Levels"]: null);
      setPopularDays(data? data["Popular Days"]: null);
      setTop_domians(data?.top_domians_by_most_articles_published);
      setTop_keywords(data?.top_keywords);
    } catch (err) {
      console.log("ERROR OCCOURED WHILE ASSIGNING INSIGHTS TO STATE", err);
    }
  }, [data]);

  if (articlesAnalyzed == 0){
    return <p className="text-slate-600 text-start ml-10 mt-16">Sorry, No insights available for this search</p>
  }
  if (!articlesAnalyzed) return <div className="text-center mt-16"> <LoadingVideo /></div>;


  return (
    <>
      <div className="w-full">
        {/* card container */}
        <div className="py-5 px-3 mx-1 sm:mx-8 my-4 sm:my-5 shadow-xl bg-slate-100 rounded-xl">
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
        <div className="py-5 mx-1 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
          <ArticlePerDateChart data={article_per_date} />
        </div>

        {/* EngagementByNetwork Charts Grid */}
        <div className="grid grid-cols-1 gap-x-2.5 lg:gap-x-5 md:grid-cols-2 mx-1 sm:mx-8">
          <div className="px-0 sm:px-2 py-5 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
            <AvgEngagementByNetwork data={avgEngagementByNetwork} />
          </div>
          <div className="px-0 sm:px-2 py-5 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
            <TotalEngagementByNetwork data={totalEngagementByNetwork} />
          </div>
        </div>

        {/* Popular-word-count and top-Keywords Charts Grid */}
        <div className="grid grid-cols-1 gap-x-2.5 lg:gap-x-5 lg:grid-cols-2 mx-1 sm:mx-8">
          <div className="px-0 sm:px-4 py-5 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
            {/* Top Key Words chart */}
            <TopKeyWords data={top_keywords} />
          </div>
          <div className="px-0 sm:px-2 py-5 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
            {/* Popular Word Count chart */}
            <PopularWordCount data={popular_word_count} />
          </div>
        </div>


        {/* Popular Reading Levels chart */}
        <div className="py-5 mx-1 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
          <PopularReadingLevels data={popularReadingLevels} />
        </div>

        {/* Popular Days chart */}
        <div className="py-5 mx-1 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
          <PopularDays data={popularDays} />
        </div>

        {/* Donut Graph  */}
        {top_domians ? (
          <div className="pr-2 py-5 mx-1 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
            <TopDomainsDonut  data={top_domians}/>
          </div>
        ) : (
          "loading.."
        )}
      </div>
    </>
  );
};

export default React.memo(PageGraphs);

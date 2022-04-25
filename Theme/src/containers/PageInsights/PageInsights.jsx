import React, { useEffect } from "react";
import InsightsCard from "../../components/InsightsCard/InsightsCard";
import Graph1 from "../../components/Graphs/Graph1";
import Graph2 from "../../components/Graphs/Graph2";
import DonutGraph from "../../components/Graphs/DonutGraph";
import OtherGraphs1 from "../../components/Graphs/OtherGraphs1";

const PageInsights = () => {
  return (
    <>
      <div className="py-16 w-screen">
       
        <hr className="mx-4 sm:mx-8 py-4" />

        {/* card container */}
        <div className="py-5 px-3 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl bg-slate-100 rounded-xl">
          <div className="flex justify-start mb-4">
            <p className=" font-semibold">Summary</p>
          </div>
          <div className="flex flex-col justify-center items-start sm:flex-row sm:items-center sm:justify-center">
            {/* <div className="flex flex-row justify-center items-center my-4 space-x-4"> */}
            <InsightsCard title="Articles Analyzed" values="23.7K" />
            <InsightsCard title="Total Engagements" values="1.2M" />
            <InsightsCard title="Avg. Engagements" values="86" />
            <InsightsCard title="Articles Analyzed" values="23.7K" />
          </div>
        </div>

        {/* Graph2  */}
        <div className="py-5 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
          <Graph2 />
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

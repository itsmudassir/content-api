import React, { useEffect } from "react";
import InsightsCard from "../../components/InsightsCard/InsightsCard";

const PageInsights = ({ className = "" }) => {
  return (
    <>
    <div className="py-20">

      <div className="py-5 px-3 bg-slate-100 w-full rounded-xl">
        <div className="flex justify-start">
          <p className=" font-semibold">Summary</p>
        </div>
        <div className="flex justify-center items-center my-4">
          <InsightsCard title="Articles Analyzed" values="23.7K"/>
          <InsightsCard title="Total Engagements" values="1.2M"/>
          <InsightsCard title="Avg. Engagements" values="86"/>
          <InsightsCard title="Articles Analyzed" values="23.7K"/>
        </div>
      </div>

    </div>
    </>
  );
};

export default PageInsights;

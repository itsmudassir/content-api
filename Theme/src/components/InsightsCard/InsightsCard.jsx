import React from "react";

const InsightsCard = ({ title, values }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-start border-slate-300 w-[100%] sm:w-[30%] py-2 px-3 sm:py-5 sm:px-3 sm:mx-1 my-1 border rounded-xl">
        <p className="mb:0 sm:mb-3 text-sm font-semibold text-slate-500">{title}</p>
        <p className="text:md sm:text-lg font-semibold">{values}</p>
      </div>
    </>
  );
};

export default InsightsCard;

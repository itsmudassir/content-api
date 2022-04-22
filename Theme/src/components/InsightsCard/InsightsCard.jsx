import React from "react";


const InsightsCard = ({title, values}) => {
 
  return (
    <>
    <div className="flex flex-col justify-center items-start mr-4 border-slate-300 w-[335px] py-5 px-3 border-2 w-full rounded-xl">
    <p className="mb-3 text-sm font-semibold text-slate-500">{title}</p>
    <p className="text-lg font-semibold" >{values}</p>
    </div>
    </>
  );
};

export default InsightsCard;

import React from "react";
import Chart from "react-apexcharts";

const TopDomainsDonut = ({data}) => {
  
  return (
    <div className="donut">
      <p className="pl-4 mb-8 font-semibold">Top Domains on all networks based on Published Articles</p>
      <Chart
        options={
          {
            labels:data?.buckets.map((item) => item.key) ,
            responsive: [
              {
                breakpoint: 700,
                options: {
                  chart: {
                    width: "90%",
                  },
                },
              },
              {
                breakpoint: 550,
                options: {
                  chart: {
                    width: "100%",
                  },
                },
              },
            ]
          }
        }
        series={data?.buckets.map((item) => item.doc_count)}
        type="donut"
        width="80%"
        height={"300"}
        
      />
    </div>
  );
};
export default TopDomainsDonut;


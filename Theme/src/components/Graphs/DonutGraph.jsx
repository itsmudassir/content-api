import React from "react";
import Chart from "react-apexcharts";

const DonutGraph = () => {
  const state = {
    options: {},
    series: [10, 15, 1, 5, 6, 3, 8, 4, 9, 13, 14],
    labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
  };

  return (
    <div className="donut">
      <p className="pl-4 mb-8 font-semibold">Top Domains on all networks based on Published Articles</p>
      <Chart
        options={
          {
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
                breakpoint: 500,
                options: {
                  chart: {
                    width: "95%",
                  },
                },
              },
            ]
          }
        }
        series={state.series}
        type="donut"
        width="80%"
        height={"300"}
        
      />
    </div>
  );
};
export default DonutGraph;

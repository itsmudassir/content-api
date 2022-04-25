import React from "react";
import Chart from "react-apexcharts";

const Graph2 = () => {
  return (
    <div>
      <>
        <h4 className="pl-4 font-semibold">Articles Published Over Time and Engagement</h4>
        <Chart
          type="bar"
          height={400}
          width={"100%"}
          series={[
            {
              name: "X",
              type: "bar",
              data: [
                21.1, 23, 33.1, 34, 44.1, 44.9, 56.5, 58.5, 21.1, 23, 33.1, 34,
                44.1, 44.9, 56.5, 50.5, 56.5, 50.5, 21.1, 23, 33.1, 34, 21.1,
                23, 33.1, 34, 44.1, 44.9, 56.5, 50.5, 21.1, 44.9, 56.5, 50.5,
                21.1, 23, 44.9, 56.5, 58.5, 21.1, 23, 33.1, 34, 21.1, 23, 33.1,
                34, 44.1, 44.9, 44.1,
              ],
            },
            {
              name: "Z",
              type: "line",
              data: [
                1.1, 1.2, 1.5, 1.5, 2.5, 2.6, 1.9, 3.2, 1.4, 2, 2.5, 1.5, 2.5,
                2.8, 3.0, 3.0, 1.4, 2, 2.5, 1.5, 0.5, 0.8, 1.4, 2, 2.5, 1.5,
                2.5, 2.8, 1.4, 2, 2.5, 1.5, 2.5, 2.8, 1.4, 2, 1.5, 2.5, 2.8,
                1.4, 0.5, 0.8, 1.4, 2, 2.5, 1.4, 2, 1.5, 2.5, 1.8,
              ],
            },
          ]}
          options={{
            chart: {
              stacked: false,
            },
            dataLabels: {
              enabled: false,
            },
            tooltip: {
              followCursor: true,
            },
            colors: ["#4169E1", "#808080"],
            stroke: {
              width: [4, 4, 4],
            },
            plotOptions: {
              bar: {
                columnWidth: "30%",
                borderRadius: 2,
              },
            },
            xaxis: {
              categories: [
                "25Jan",
                "1Feb",
                "3Feb",
                "15Feb",
                "22Feb",
                "1Mar",
                "8Mar",
                "15Mar",
                "22Mar",
              ],
            },
            yaxis: [
              {
                seriesName: "Column A",
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                },
                title: {
                  text: "Average Number Of Engagements",
                },
              },
              {
                seriesName: "Column A",
                show: false,
              },
              {
                opposite: true,
                seriesName: "Line C",
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                },
                title: {
                  text: "Number Of Articles Published",
                },
              },
            ],
            tooltip: {
              shared: false,
              intersect: true,
              x: {
                show: false,
              },
            },
            legend: {
              horizontalAlign: "left",
              offsetX: 40,
            },
            // responsive:[
            //     {
            //         breakpoint: 1000,
            //         options:{
            //             plotOptions: {
            //                 bar: {
            //                   columnWidth: "30%",
            //                 //   borderRadius: 2,
            //                 },
            //               }
            //         }
            //     }
            // ]
          }}
        ></Chart>
      </>
    </div>
  );
};

export default Graph2;

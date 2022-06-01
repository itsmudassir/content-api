import React from "react";
import Chart from "react-apexcharts";
import millify from "millify";

const ArticlePerDateChart = ({ data }) => {
  return (
    <div>
      <>
        <h4 className="pl-4 font-semibold">
          Articles Published Over Time and Engagement
        </h4>
        <Chart
          type="bar"
          height={400}
          width={"100%"}
          series={[
            {
              name: "Total Articles Count",
              type: "bar",
              data: data?.buckets.map((item) => item.doc_count),
            },
            {
              name: "Total engagement per day",
              type: "line",
              data: data?.buckets.map(
                (item) => item.total_engagement_per_day.value
              ),
            },
          ]}
          options={{
            chart: {
              stacked: false,
            },
            dataLabels: {
              enabled: false,
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
              categories: data?.buckets.map(
                (item) => item.key_as_string.split("T")[0]
              ),
            },
            yaxis: [
              {
                labels: {
                  formatter: function (value) {
                    return millify(value, { precision: 2 });
                  },
                },
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
                labels: {
                  formatter: function (value) {
                    return millify(value, { precision: 2 });
                  },
                },
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
              custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return `
                   <div style="text-align:center; margin:10px;">
                    <p style="font-weight: 600">Number of Articles Published<p/>
                    <p>${series[seriesIndex][dataPointIndex]} on ${w.globals.labels[dataPointIndex]}<p/>
                    <div/>
                  `;
              },
              shared: false,
              intersect: true,
              x: {
                show: false,
              },
              fixed: {
                enabled: false,
                position: "center",
                offsetX: 0,
                offsetY: 0,
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

export default ArticlePerDateChart;

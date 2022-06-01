import React from "react";
import Chart from "react-apexcharts";
import millify from "millify";

const PopularWordCount = ({ data }) => {
  
  return (
    <div>
      <>
        <h4 className="pl-4 font-semibold">Popular Word Count</h4>
        <Chart
          type="bar"
          height={400}
          width={"100%"}
          series={[
            {
              name: "Total word count",
              type: "bar",
              data: data?.buckets.map((item) => item.doc_count),
            },
            {
              name: "Avg. engagment per word count",
              type: "bar",
              data: data?.buckets.map((item) => item["avg engagment per word count"].value),
            },
          ]}
          options={{
            chart: {
              stacked: false,
            },
            // colors: ["green", "blue"],
            dataLabels: {
              enabled: false,
            },
            tooltip: {
              followCursor: true,
            },
            colors: ["#33cc33", "#0d47cd"],
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
              categories: data?.buckets.map((item) => item.key),
            },
            yaxis: [
              {
                labels: {
                  formatter: (value) => millify(value, { precision: 2 }),
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
                seriesName: "Column A",
                show: false,
              },
              {
                labels: {
                  formatter: (value) => millify(value, { precision: 2 }),
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
              custom: [
                function ({ series, seriesIndex, dataPointIndex, w }) {
                  return `
                   <div style="text-align:center; margin:10px;">
                    <p style="font-weight: 600">${w.globals.labels[dataPointIndex]} Word count<p/>
                    <p>${millify(series[seriesIndex][dataPointIndex])} Articles<p/>
                    <div/>
                  `;
                },
                function ({ series, seriesIndex, dataPointIndex, w }) {
                  return `
                  <div style="text-align:center; margin:10px;">
                  <p style="font-weight: 600">${w.globals.labels[dataPointIndex]} Total Engagement<p/>
                  <p>${millify(series[seriesIndex][dataPointIndex])} Articles<p/>
                  <div/>
                  `;
                },
              ],
              shared: false,
              intersect: true,
              x: {
                show: false,
              },
              y: {
                function(value) {
  
                  return value + " Saad"
                }
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

export default PopularWordCount;

import React from "react";
import Chart from "react-apexcharts";
import millify from "millify";

const PopularReadingLevels = ({ data }) => {
  return (
    <div>
      <>
        <h4 className="pl-4 font-semibold">Popular Reading Levels</h4>
        <Chart
          type="bar"
          height={400}
          width={"100%"}
          series={[
            {
              name: "Number of Articles",
              type: "bar",
              data: data?.buckets.map((item) => item.doc_count),
            },
            {
              name: "Engagement Per Article",
              type: "bar",
              data: data?.buckets.map(
                (item) => item["avg engagment per Reading level"].value
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
            tooltip: {
              followCursor: true,
            },
            colors: ["#4169E1", "#66C7F4"],
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
                <div style="text-align:start; margin:10px;">
                <p style="font-weight: 600">Number Of Articles<p/>
                <div style="display: flex">
                <p>${millify(
                  series[seriesIndex][dataPointIndex]
                )} with <p/> &nbsp;
                <p style="font-weight: 600">${
                  w.globals.labels[dataPointIndex]
                }<p/> &nbsp;
                <p>Reading Level<p/>
                <div/>
                <div/>
                  `;
                },
                function ({ series, seriesIndex, dataPointIndex, w }) {
                  return `
                   <div style="text-align:start; margin:10px;">
                    <p style="font-weight: 600">Engagement Per Article<p/>
                    <div style="display: flex">
                    <p>${millify(
                      series[seriesIndex][dataPointIndex]
                    )} with <p/> &nbsp;
                    <p style="font-weight: 600">${
                      w.globals.labels[dataPointIndex]
                    }<p/> &nbsp;
                    <p>Reading Level<p/>
                    <div/>
                    <div/>
                  `;
                },
              ],
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

export default PopularReadingLevels;

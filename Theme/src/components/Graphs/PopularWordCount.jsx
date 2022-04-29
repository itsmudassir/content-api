import React , {useEffect, useState} from "react";
import Chart from "react-apexcharts";

const PopularWordCount = ({data}) => {
    const key = data?.buckets.map(item=> item.key)
    const doc_count = data?.buckets.map(item=> item.doc_count);
    const avg_engagment_per_word_count = data?.buckets.map(item=>parseFloat(parseFloat(item["avg engagment per word count"].value).toFixed(1)));

    return (
    <div>
      <>
        <h4 className="pl-4 font-semibold">Popular Word Count</h4>
        <Chart
          height={400}
          width={"100%"}
          series={[
            {
              name: "X",
              type: "bar",
              data: doc_count,
            },
            {
              name: "Z",
              type: "bar",
              data: avg_engagment_per_word_count,
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
              categories: key,
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

export default PopularWordCount;

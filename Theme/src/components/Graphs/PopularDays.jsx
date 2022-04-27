import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const PopularDays = ({ data }) => {
  // states
  const [key, setKey] = useState();
  const [doc_count, setDoc_count] = useState();
  const [avg_engagment_per_day, setAvg_engagment_per_day] =
    useState();

  useEffect(() => {
    setKey(data?.buckets.map((item) => item.key));
    setDoc_count(data?.buckets.map((item) => item.doc_count));
    setAvg_engagment_per_day(
      data?.buckets.map((item) =>
        parseFloat(
          parseFloat(item["avg engagment per day"].value).toFixed(1)
        )
      )
    ); 
  }, [data]);

  return (
    <div>
      <>
        <h4 className="pl-4 font-semibold">Popular Days</h4>
        <Chart
          height={400}
          width={"100%"}
          series={[
            {
              name: "Articles Per Day",
              type: "bar",
              data: doc_count,
            },
            {
              name: "Average Interactions Per Day",
              type: "bar",
              data: avg_engagment_per_day,
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

export default PopularDays;

import React , {useEffect, useState} from "react";
import Chart from "react-apexcharts";

const ArticlePerDateChart = ({data}) => {
// states
const [date , setDate]= useState();
const [barValues , setBarValues]= useState();
const [lineValues , setLineValues]= useState();

useEffect(()=>{
  setDate(data?.buckets.map(item=>item.key_as_string.split("T")[0]));
  setBarValues(data?.buckets.map(item=> item.doc_count));
  setLineValues(data?.buckets.map(item=> parseFloat(parseFloat(item.total_engagement_per_day.value).toFixed(1))))
},[data])

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
              data: barValues,
            },
            {
              name: "Z",
              type: "line",
              data: lineValues,
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
              categories: date,
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

export default ArticlePerDateChart;

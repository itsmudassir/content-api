import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import millify from "millify";

const AvgEngagementByNetwork = ({data}) => {
  const [facebook, setFacebook] = useState();
  const [twitter, setTwitter] = useState();
  
  useEffect(()=>{
    // setTwitter(parseFloat(parseFloat(data?.twitter).toFixed(1)))
    setTwitter(millify(data?.twitter, {precision:2}))
    // setFacebook(parseFloat(parseFloat(data?.facebook).toFixed(1)))
    setFacebook(millify(data?.facebook, {precision:2}))
  },[data])
  
  // const twitter =  parseFloat(parseFloat(data?.twitter).toFixed(1))
  // const facebook = parseFloat(parseFloat(data?.facebook).toFixed(1))
  return (
    <div>
      <>
        <h4 className="pl-4 font-semibold">Average Engagement by Network</h4>
        <Chart
          type="bar"
          width={"100%"}
          height={400}
          series={[
            {
              data: [facebook, twitter],
            },
          ]}
          options={{
            chart: {
              height: 350,
              type: "bar",
              events: {
                click: function (chart, w, e) {},
              },
            },
            colors: ["#4169E1", "#FF0000", "#66C7F4"],
            plotOptions: {
              bar: {
                columnWidth: "15%",
                borderRadius: 15,
                distributed: true,
              },
              
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              categories: ["Facebook", "Twitter"],
              labels: {
                style: {
                  colors: ["#000000"],
                  fontSize: "12px",
                },
              },
            },
            yaxis: {

              title: {
                text: "Number Of Engagements",
              },
            },
            tooltip:{
              custom: function({series, seriesIndex, dataPointIndex, w}) {
                return (
                  `
                   <div style="text-align:center; margin:10px;">
                    <p style="font-weight: 600">Average Engagement<p/>
                    <p>${series[seriesIndex][dataPointIndex]} on ${w.globals.labels[dataPointIndex]}<p/>
                    <div/>
                  `
                );
              },
            }
            // responsive: [
            //   {
            //     breakpoint: 1000,
            //     options: {
            //       chart: {
            //         width: "70%",
            //       },
            //     },
            //   },
            //   {
            //     breakpoint: 700,
            //     options: {
            //       chart: {
            //         width: "80%",
            //       },
            //     },
            //   },
            //   {
            //     breakpoint: 600,
            //     options: {
            //       chart: {
            //         width: "100%",
            //       },
            //     },
            //   },
            //   {
            //     breakpoint: 500,
            //     options: {
            //       chart: {
            //         width: "100%",
            //       },
            //     },
            //   },
            // ],
          }}
        ></Chart>
      </>
    </div>
  );
};

export default AvgEngagementByNetwork;

import React from "react";
import Chart from "react-apexcharts";
import millify from "millify";

const AvgEngagementByNetwork = ({ data }) => {
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
              data: [data?.twitter, data?.facebook],
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
              labels: {
                formatter: (value) => millify(value, { precision: 2 }),
              },
              title: {
                text: "Number Of Engagements",
              },
            },
            tooltip: {
              custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                return `
                   <div style="text-align:center; margin:10px;">
                    <p style="font-weight: 600">Average Engagement<p/>
                    <p>${millify(series[seriesIndex][dataPointIndex], {
                      precision: 2,
                    })} on ${w.globals.labels[dataPointIndex]}<p/>
                    <div/>
                  `;
              },
            },
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

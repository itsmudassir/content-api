import React from "react";
import Chart from "react-apexcharts";

const Graph1 = () => {
  return (
    <div>
      <>
        <h4 className="pl-4 font-semibold">Average Engagement by Network</h4>
        <Chart
          type="bar"
          width={"60%"}
          height={400}
          series={[
            {
              data: [235, 10, 20],
            },
          ]}
          options={{
            chart: {
              height: 350,
              type: "bar",
              background:  "rgb(241 245 249)",
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
              categories: ["Facebook", "Reddit", "Pinterest"],
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
            responsive: [
              {
                breakpoint: 1000,
                options: {
                  chart: {
                    width: "70%",
                  },
                },
              },
              {
                breakpoint: 700,
                options: {
                  chart: {
                    width: "80%",
                  },
                },
              },
              {
                breakpoint: 600,
                options: {
                  chart: {
                    width: "100%",
                  },
                },
              },
              {
                breakpoint: 500,
                options: {
                  chart: {
                    width: "100%",
                  },
                },
              },
            ],
          }}
        ></Chart>
      </>
    </div>
  );
};

export default Graph1;

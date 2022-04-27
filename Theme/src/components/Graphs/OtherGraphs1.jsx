import Chart from "react-apexcharts";

const OtherGraphs1 = () => {
  return (
    <>
      <Chart
        type="bar"
        width={"60%"}
        height={400}
        series={[
          {
            name: "Net Profit",
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
          },
          {
            name: "Revenue",
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
          },
        ]}
        options={{
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              endingShape: "rounded",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories: [
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
            ],
          },
          yaxis: {
            title: {
              text: "$ (thousands)",
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val + " thousands";
              },
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
        // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        // chart 2
      ></Chart>
      <Chart
        type="bar"
        width={"60%"}
        height={400}
        series={[
          {
            name: "Net Profit",
            data: [0, 0, 0, 0, 44, 0, 0, 0, 0],
          },
          {
            name: "Revenue",
            data: [0, 0, 0, 0, 56, 0, 0, 0, 0],
          },
        ]}
        options={{
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              columnWidth: "100%",
              distributed: false,
            },
            bar: {
              columnWidth: '100%',
              distributed : false,
              endingShape : "rounded"
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories: [
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
            ],
          },
          yaxis: {
            title: {
              text: "$ (thousands)",
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val + " thousands";
              },
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
  );
};

export default OtherGraphs1;

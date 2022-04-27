import React,{useState, useEffect} from "react";
import Chart from "react-apexcharts";

const TotalEngagementByNetwork = ({data}) => {

  const [facebook, setFacebook] = useState();
  const [twitter, setTwitter] = useState();
  
  useEffect(()=>{
    setTwitter(parseFloat(parseFloat(data?.twitter).toFixed(1)))
    setFacebook(parseFloat(parseFloat(data?.facebook).toFixed(1)))
  },[data])
  
  // const twitter =  data?.twitter;
  // const facebook = data?.facebook;

  return (
    <div>
      <>
        <h4 className="pl-4 font-semibold">Total Engagement by Network</h4>
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
                click: function () {},
              },
            },
            colors: ["#4169E1", "#FF0000"],
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

export default TotalEngagementByNetwork;

import React,{useState, useEffect} from "react";
import Chart from "react-apexcharts";

const TopDomainsDonut = ({data}) => {
  // states
  const [key, setKey] = useState();
  const [doc_count, setDoc_count] = useState();
  const [avg_engagment, setAvg_engagment] =
    useState();

  useEffect(() => {
    setKey(data?.buckets.map((item) => item.key));
   setDoc_count(data?.buckets.map((item) => item.doc_count));
     setAvg_engagment(
      data?.buckets.map((item) =>
        parseFloat(
          parseFloat(item["avg engagment"].value).toFixed(1)
        )
      )
    ); 
  }, [data]);


  const state2 = {
    options: {},
    series: doc_count,
    // labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
  };
console.log(doc_count)
  return (
    <div className="donut">
      <p className="pl-4 mb-8 font-semibold">Top Domains on all networks based on Published Articles</p>
      <Chart
        options={
          {
            
            responsive: [
              {
                breakpoint: 700,
                options: {
                  chart: {
                    width: "90%",
                  },
                },
              },
              {
                breakpoint: 500,
                options: {
                  chart: {
                    width: "95%",
                  },
                },
              },
            ]
          }
        }
        series={state2.series}
        type="donut"
        width="80%"
        height={"300"}
        
      />
    </div>
  );
};
export default TopDomainsDonut;

import React, { useState } from "react";
import moment from "moment";
import {
  DateRangePicker,
  defaultStaticRanges,
  createStaticRanges
} from "react-date-range";
import "../../../node_modules/react-date-range/dist/styles.css"; 
import "../../../node_modules/react-date-range/dist/theme/default.css" 
import { useSearchkit } from '@searchkit/client'

function DatePicker({facet}) {

  const api = useSearchkit()

 

  const [ranges, setRanges] = useState([
    {
      startDate: null,
      endDate: null,
      key: "rollup"
    }
  ]);

  const staticRanges = createStaticRanges([
    // ...defaultStaticRanges,
    {
      label: "This Year",
      range: () => ({
        startDate: moment().startOf("year").toDate(),
        endDate: moment().endOf("day").toDate()
      })
    },
    {
      label: "Last Year",
      range: () => ({
        startDate: moment().subtract(1, "years").startOf("year").toDate(),
        endDate: moment().subtract(1, "years").endOf("year").toDate()
      })
    },
    {
      label: "Last 3 Months",
      range: () => ({
        startDate: moment().endOf("day").toDate(),
        endDate: moment().subtract(3,'months').endOf("day").toDate()
      })
    }
  ]);


  const Filter = (ranges)=>{

    setRanges(ranges)
    var startDate = moment(ranges.startDate).format("YYYY-MM-DD");
    var endDate = moment(ranges.endDate).format("YYYY-MM-DD");
    console.log(startDate, endDate);

    console.log(ranges)

    {
      facet.map((value)=>{



    if (value.identifier=="date_download"){



       api.toggleFilter({ identifier: value.identifier,   dateMin: startDate, dateMax: endDate })
        api.setPage({ size: 20, from: 0 })

        api.search()
   }

  })
    }

   

  

  //   if (facet.identifier=="date_download"){
  //     console.log( "ON line 63")
  //      api.toggleFilter({ identifier: facet.identifier,   dateMin: startDate, dateMax: endDate })
  //       api.setPage({ size: 20, from: 0 })

  //       api.search()
  //  }

 

  }
 


  return (
    <>
      <h1></h1>
    <DateRangePicker
      startDatePlaceholder="Start Date"
      endDatePlaceholder="End Date"
      ranges={ranges}
      // onChange={(ranges) => { 
      //   setRanges([ranges.rollup])
      //   var startDate = moment(ranges.rollup.startDate).format("YYYY-MM-DD");
      //   var endDate = moment(ranges.rollup.endDate).format("YYYY-MM-DD");

      //   console.log(facet , "in line 61")

      //   if (facet.identifier=="date_download"){
      //     console.log( "ON line 63")
      //      api.toggleFilter({ identifier: facet.identifier,   dateMin: startDate, dateMax: endDate })
      //       api.setPage({ size: 20, from: 0 })

      //       api.search()
      //  }}}
       onChange={()=>Filter(ranges)}
      staticRanges={staticRanges}
      // staticRanges={[]}
      inputRanges={[]}


    />
    </>

  );
}

export default DatePicker;

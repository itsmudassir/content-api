import React, { useState } from "react";
import moment from "moment";
import {
  DateRangePicker,
  defaultStaticRanges,
  createStaticRanges,
} from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSearchkit } from "@searchkit/client";

// import {  useEffect } from "react";

// import { useLocation } from "react-router-dom";

// import queryString from "query-string";



function DatePicker() {


  const queryParams = new URLSearchParams(window.location.search)
  const sort = queryParams.get("sort")
  // const { search, location } = useLocation();
  // var { sort } = queryString.parse(search);
  console.log(sort)
  const api = useSearchkit();
  const [currentSort, setCurrentSort] = useState(sort||"relevance");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  // useEffect(() => {


  //   alert(currentSort)
  //   setCurrentSort(sort)

   
  //   }, [sort]);






  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const [ranges, setRanges] = useState([
    {
      startDate: null,
      endDate: null,
      key: "rollup",
    },
  ]);

  const staticRanges = createStaticRanges([
    ...defaultStaticRanges,
    {
      label: "This Year",
      range: () => ({
        startDate: moment().startOf("year").toDate(),
        endDate: moment().endOf("day").toDate(),
      }),
    },
    {
      label: "Last Year",
      range: () => ({
        startDate: moment().subtract(1, "years").startOf("year").toDate(),
        endDate: moment().subtract(1, "years").endOf("year").toDate(),
      }),
    },
  ]);
  // console.log(ranges);

  function handleSelect(range) {


    setStartDate(range.selection.startDate);
    setEndDate(range.selection.endDate);
    var startDatec = moment(range.selection.startDate).format("YYYY-MM-DD");
    var endDatec = moment(range.selection.endDate).format("YYYY-MM-DD");
    // console.log(startDate, endDate,"---------------->");
    console.log(startDatec, endDatec, "---------------->");
    if (api.getFiltersByIdentifier("date_download")) {
      console.log("if date is set%%%%%%%%%%%%%%%");
      const customState = {
        query: api.getQuery() || "",
        sortBy: currentSort||"",
        filters: [
          {
            identifier: "date_download",
            dateMin: startDatec,
            dateMax: endDatec,
          },
        ],
        page: {
          size: 20,
          from: 0,
        },
      };
      var allfilter = api.getFilters();
      for (let i = 0; i < allfilter.length; i++) {
        var filter = allfilter[i];

        if (filter.identifier !== "date_download") {
          customState.filters.push(filter);
        }
      }
      api.setSearchState(customState);
      api.search();
    } else {
      api.toggleFilter({
        identifier: "date_download",
        dateMin: startDatec,
        dateMax: endDatec,
      });
      api.setPage({ size: 20, from: 0 });
      api.search();
    }

    //  api.toggleFilter({ identifier: "date_download",   dateMin:startDatec  , dateMax:endDatec })
    //   api.setPage({ size: 20, from: 0 })
    //   api.search()
    //
    // }
  }
  return (
    <DateRangePicker
      startDatePlaceholder="Start Date"
      endDatePlaceholder="End Date"
      ranges={[selectionRange]}
      onChange={handleSelect}
      staticRanges={staticRanges}
      inputRanges={[]}
    />
  );
}

export default DatePicker;

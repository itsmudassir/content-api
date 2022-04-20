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

function DatePicker() {
  const api = useSearchkit();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
        sortBy: "",
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

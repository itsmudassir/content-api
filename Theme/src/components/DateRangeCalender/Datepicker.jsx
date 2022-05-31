import React, { useState } from "react";
import moment from "moment";
import {
  DateRangePicker,
  defaultStaticRanges,
  createStaticRanges,
  DateRange,
  DefinedRange,
} from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSearchkit } from "@searchkit/client";
import "./DateRangeCalender.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { addDays } from "date-fns";
import dates from "../../data/globalVariables/globalDates";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

// import {  useEffect } from "react";

// import { useLocation } from "react-router-dom";

// import queryString from "query-string";

function DatePicker({ toggleDisplay }) {
  const queryParams = new URLSearchParams(window.location.search);
  const sort = queryParams.get("sort");
  // const { search, location } = useLocation();
  // var { sort } = queryString.parse(search);
  const api = useSearchkit();
  const history = useHistory();
  const [currentSort, setCurrentSort] = useState(sort || "relevance");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const currentQueryParams = queryString.parse(window.location.search);
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
    console.log(startDatec, endDatec, "---------------->");
    
    const newQueryParams = {
      ...currentQueryParams,
      startDate: startDatec,
      endDate: endDatec,
    };
    history.push({
      pathname: "/discover/discover_search",
      search: queryString.stringify(newQueryParams),
    });

    toggleDisplay(false);
  }
  return (
    <>
      {/* <DateRangePicker
        startDatePlaceholder="Start Date"
        endDatePlaceholder="End Date"
        ranges={[selectionRange]}
        onChange={handleSelect}
        staticRanges={staticRanges}
        inputRanges={[]}
      /> */}

      <div className="flex flex-col sm:flex-row ">
        <div className="flex flex-row justify-between">
          <DefinedRange
            startDatePlaceholder="Start Date"
            endDatePlaceholder="End Date"
            ranges={[selectionRange]}
            onChange={handleSelect}
            staticRanges={staticRanges}
            inputRanges={[]}
          />
          <FontAwesomeIcon
            onClick={() => toggleDisplay(false)}
            icon={faCircleXmark}
            className="cancelButton"
          />
        </div>
        <DateRange
          minDate={addDays(new Date(dates.minDate), 0)} // mindate: "2022-03-01"
          maxDate={addDays(new Date(dates.minDate), +30)}
          startDatePlaceholder="Start Date"
          endDatePlaceholder="End Date"
          ranges={[selectionRange]}
          onChange={handleSelect}
          staticRanges={staticRanges}
          inputRanges={[]}
        />
      </div>
    </>
  );
}

export default DatePicker;

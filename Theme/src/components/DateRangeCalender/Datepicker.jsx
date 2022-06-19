import React, { useState } from "react";
import moment from "moment";
import {
  defaultStaticRanges,
  createStaticRanges,
  DateRange,
  DefinedRange,
} from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./DateRangeCalender.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { addDays } from "date-fns";
import dates from "../../data/globalVariables/globalDates";
import queryString from "query-string";
import { useHistory } from "react-router-dom";


function DatePicker({ toggleDisplay }) {
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date(dates.startDate));
  const [endDate, setEndDate] = useState(new Date(dates.endDate));
  const currentQueryParams = queryString.parse(window.location.search);


  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };


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

  function handleSelect(range) {
    setStartDate(range.selection.startDate);
    setEndDate(range.selection.endDate);
    var startDatec = moment(range.selection.startDate).format("YYYY-MM-DD");
    var endDatec = moment(range.selection.endDate).format("YYYY-MM-DD");
    console.log(startDatec, endDatec, "---------------->");
    delete currentQueryParams.page;
    const newQueryParams = {
      ...currentQueryParams,
      startDate: startDatec,
      endDate: endDatec,
    };
    history.push({
      // pathname: "/discover/discover_search",
      search: queryString.stringify(newQueryParams),
    });

    toggleDisplay(false);
  }
  return (
    <>
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

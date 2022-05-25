import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  defaultStaticRanges,
  createStaticRanges,
  DateRange,
} from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./DateRangeCalender.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function DatePicker({ setStartDate, setEndDate, toggleDisplay }) {
  const [startDate1, setStartDate1] = useState(null);
  const [endDate1, setEndDate1] = useState(null);

  const selectionRange = {
    startDate: startDate1,
    endDate: endDate1,
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

  function handleSelect(range) {
    setStartDate1(range.selection.startDate);
    setEndDate1(range.selection.endDate);
    toggleDisplay(false);
  }

  useEffect(() => {
    if (startDate1 && endDate1) {
      setStartDate(() => moment(startDate1).format("YYYY-MM-DD"));
      setEndDate(() => moment(endDate1).format("YYYY-MM-DD"));
    }
  }, [startDate1, endDate1]);

  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <FontAwesomeIcon
          onClick={() => toggleDisplay(false)}
          icon={faCircleXmark}
          className="cancelButton"
        />
        <br />
        <DateRange
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

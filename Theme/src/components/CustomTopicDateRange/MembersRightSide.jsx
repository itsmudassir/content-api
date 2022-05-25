import React, { useState } from "react";
import CalenderFilter from "./Calender-filter";
import DatePicker from "./Datepicker";
import "./DateRangeCalender.css";

function MembersRightSide({ setStartDate, setEndDate }) {
  const [calenderClick, setcalenderClick] = useState(false);
  function calenderOnClick(e) {
    setcalenderClick(!calenderClick);
  }

  return (
    <div className="">
      <CalenderFilter calenderOnClick={calenderOnClick} />
      {calenderClick && (
        <div className="Datepicker">
          <DatePicker
            toggleDisplay={setcalenderClick}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </div>
      )}
    </div>
  );
}

export default MembersRightSide;

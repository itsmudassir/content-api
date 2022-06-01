import React from "react";
import "./DateRangeCalender.css";
import MembersRightSide from "./MembersRightSide";

const DateRangeDropDown = ({ className = "", facet }) => {
  return (
    <div className="relative">
      <MembersRightSide facet={facet} />
    </div>
  );
};

export default DateRangeDropDown;

import React from "react";
import { Listbox } from "@headlessui/react";
import "./DateRangeCalender.css";
import MembersRightSide from "./MembersRightSide";

const DateRangeDropDown = ({
  className = "",
  setStartDate,
  setEndDate,
}) => {
  return (
    <div className="relative">
      <MembersRightSide setEndDate={setEndDate} setStartDate={setStartDate}  />
    </div>
  );
};

export default DateRangeDropDown;

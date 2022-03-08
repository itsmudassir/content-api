import React from "react";

function CalenderFilter(props) {
  return (
    <div className=" w-10 h-10">
      <button
        type="button"
        className="calender-filter"
        onClick={props.calenderOnClick}
      >
        <span className="calender-btn-text">
          To-From  📆
        </span>
      </button>
    </div>
  );
}

export default CalenderFilter;

import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function HomeHeroDatePicker() {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="City, airport, address or hotel"
        className="search-input"
      />
      <div className="date-time">
        <input type="date" className="date-picker" />
        <input type="time" className="time-picker" />
      </div>
      <div className="date-time">
        <input type="date" className="date-picker" />
        <input type="time" className="time-picker" />
      </div>
      <button className="search-btn">
        <SearchIcon />
      </button>
    </div>
  );
}

export default HomeHeroDatePicker;

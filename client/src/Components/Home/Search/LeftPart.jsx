import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { NavLink } from "react-router-dom";

function LeftPart({ compact = false, user }) {
  const [startDateTime, setStartDateTime] = useState(true);
  const [endDateTime, setEndDateTime] = useState(true);
  const [location, setLocation] = useState(10);

  const handleChange = (event) => setLocation(event.target.value);

  return (
    <div
      className={`containerStyle flex flex-wrap gap-2 md:gap-0 w-full flex-column align-items-center${
        compact ? "compact-style" : ""
      } justify-center`}
      style={{ padding: "1rem 0" }}
    >
      <div className="flex flex-wrap items-center justify-evenly gap-4 w-full p-2 bg-white border rounded-lg shadow-sm">
        <div className="sectionStyle flex items-center gap-2">
          <span className="sectionLabel">Modify search</span>
          <Select
            sx={{ width: "100%", maxWidth: compact ? "10rem" : "12rem" }}
            value={location}
            onChange={handleChange}
          >
            <MenuItem value={10}>Kolkata</MenuItem>
            <MenuItem value={20}>Mumbai</MenuItem>
            <MenuItem value={30}>Delhi</MenuItem>
            <MenuItem value={40}>Hyderabad</MenuItem>
            <MenuItem value={50}>Bangalore</MenuItem>
          </Select>
        </div>
        <div className="sectionStyle flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="sectionLabel">Start Time</div>
            <div className="flex gap-1">
              <button
                className={`pick-date-time ${
                  startDateTime ? "pick-date-time-active" : ""
                }`}
                onClick={() => setStartDateTime(true)}
              >
                Change Time
              </button>
              <button
                className={`pick-date-time ${
                  !startDateTime ? "pick-date-time-active" : ""
                }`}
                onClick={() => setStartDateTime(false)}
              >
                Change Date
              </button>
            </div>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[startDateTime ? "TimePicker" : "DatePicker"]}
            >
              {startDateTime ? (
                <TimePicker label="Pick Time" />
              ) : (
                <DatePicker label="Pick Date" />
              )}
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="sectionStyle flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="sectionLabel">End Time</div>
            <div className="flex gap-1">
              <button
                className={`pick-date-time ${
                  endDateTime ? "pick-date-time-active" : ""
                }`}
                onClick={() => setEndDateTime(true)}
              >
                Change Time
              </button>
              <button
                className={`pick-date-time ${
                  !endDateTime ? "pick-date-time-active" : ""
                }`}
                onClick={() => setEndDateTime(false)}
              >
                Change Date
              </button>
            </div>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[endDateTime ? "TimePicker" : "DatePicker"]}
            >
              {endDateTime ? (
                <TimePicker label="Pick Time" />
              ) : (
                <DatePicker label="Pick Date" />
              )}
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div>
          <NavLink to={`/search-results`} className="buttonStyle">
            Modify Search
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LeftPart;

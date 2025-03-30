import React, {useState} from 'react';
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { NavLink } from "react-router-dom";


function LeftPart({ compact = false }) {
  const [startDateTime, setStartDateTime] = useState(true);
  const [endDateTime, setEndDateTime] = useState(true);
  const [location, setLocation] = useState(10);

  const handleChange = (event) => setLocation(event.target.value);

  return (
    <div className={`containerStyle flex flex-wrap gap-4 md:gap-0 ${compact ? "compact-style" : ""}`} style={{ padding: "1rem 3rem" }}>
      <div className="w-full md:w-auto sectionStyle">
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

      <div className="w-full md:w-auto sectionStyle">
        <div className="flex items-center gap-2">
          <div className="sectionLabel">Start Time</div>
          <div>
            <button className={`pick-date-time ${startDateTime ? "pick-date-time-active" : ""}`} onClick={() => setStartDateTime(true)}>
              Change Time
            </button>
            <button className={`pick-date-time ${!startDateTime ? "pick-date-time-active" : ""}`} onClick={() => setStartDateTime(false)}>
              Change Date
            </button>
          </div>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={[startDateTime ? "TimePicker" : "DatePicker"]}>
            {startDateTime ? <TimePicker label="Pick Time" /> : <DatePicker label="Pick Date" />}
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div className="w-full md:w-auto sectionStyle">
        <div className="flex items-center gap-2">
          <div className="sectionLabel">End Time</div>
          <div>
            <button className={`pick-date-time ${endDateTime ? "pick-date-time-active" : ""}`} onClick={() => setEndDateTime(true)}>
              Change Time
            </button>
            <button className={`pick-date-time ${!endDateTime ? "pick-date-time-active" : ""}`} onClick={() => setEndDateTime(false)}>
              Change Date
            </button>
          </div>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={[endDateTime ? "TimePicker" : "DatePicker"]}>
            {endDateTime ? <TimePicker label="Pick Time" /> : <DatePicker label="Pick Date" />}
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div className="w-full md:w-auto">
        <NavLink to={`/search-results`} className="buttonStyle">
          Modify Search
        </NavLink>
      </div>
    </div>
  );
}

export default LeftPart;
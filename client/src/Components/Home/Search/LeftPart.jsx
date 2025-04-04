import React, { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { NavLink, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function LeftPart({ compact = false, user }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [startDateTime, setStartDateTime] = useState(true);
  const [endDateTime, setEndDateTime] = useState(true);
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  useEffect(() => {
    const cityParam = searchParams.get("city") || "";
    const startDateParam = searchParams.get("startDate") || null;
    const startTimeParam = searchParams.get("startTime") || null;
    const endDateParam = searchParams.get("endDate") || null;
    const endTimeParam = searchParams.get("endTime") || null;
    setCity(cityParam);
    setStartDate(startDateParam);
    setStartTime(startTimeParam);
    setEndDate(endDateParam);
    setEndTime(endTimeParam);
  }, [searchParams]);
  const generateTimeOptions = () => {
    const times = [];
    let hour = 0;
    let minute = 0;
    for (let i = 0; i < 48; i++) {
      const timeString = `${String(hour).padStart(2, "0")}:${String(
        minute
      ).padStart(2, "0")}`;
      times.push(timeString);
      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }
    return times;
  };
  const clearFilter = () => {
    setStartDate(null);
    setStartTime(null);
    setEndDate(null);
    setEndTime(null);
    navigate(`/home?city=${city}`);
  };
  return (
    <div
      className={`containerStyle flex flex-wrap gap-2 md:gap-0 w-full flex-column align-items-center${
        compact ? "compact-style" : ""
      } justify-center`}
      style={{ padding: "1rem 0" }}
    >
      <div className="flex flex-wrap items-center justify-evenly gap-4 w-full p-2 bg-white border rounded-lg shadow-sm">
        <div
          className="sectionStyle flex items-center gap-2"
          style={{ marginTop: "40px" }}
        >
          <TextField
            label="City, airport, address or hotel"
            fullWidth
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
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
                <Box sx={{ minWidth: 230 }}>
                <FormControl fullWidth>
                  <InputLabel id="startTime-label">Select Start Time</InputLabel>
                  <Select
                    labelId="startTime-label"
                    id="startTime"
                    value={startTime || ""}
                    label="Select Start Time"
                    onChange={(e) => setStartTime(e.target.value)} 

                  >
                    {generateTimeOptions().map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              ) : (
                <DatePicker
                  label="Start Date"
                  value={startDate ? dayjs(startDate) : null}
                  onChange={(newValue) =>
                    setStartDate(
                      newValue ? newValue.format("YYYY-MM-DD") : null
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      sx={{ backgroundColor: "white", borderRadius: "4px" }}
                    />
                  )}
                />
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
                <Box sx={{ minWidth: 230 }}>
                <FormControl fullWidth>
                  <InputLabel id="startTime-label">Select End Time</InputLabel>
                  <Select
                    labelId="startTime-label"
                    id="startTime"
                    value={endTime || ""}
                    label="Select Start Time"
                    onChange={(e) => setEndTime(e.target.value)}

                  >
                    {generateTimeOptions().map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              ) : (
                <DatePicker
                  label="End Date"
                  value={endDate ? dayjs(endDate) : null}
                  onChange={(newValue) =>
                    setEndDate(newValue ? newValue.format("YYYY-MM-DD") : null)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      sx={{ backgroundColor: "white", borderRadius: "4px" }}
                    />
                  )}
                />
              )}
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="flex flex-col align-items-center">
          <NavLink
            to={`/home?city=${city}&startDate=${startDate || ""}&startTime=${
              startTime || ""
            }&endDate=${endDate || ""}&endTime=${endTime || ""}`}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Modify Search
          </NavLink>
          <p
            className="px-2"
            style={{
              margin: "1rem 0 0 0",
              fontSize: "12px",
              cursor: "pointer",
              color: "orange",
              fontWeight: "600",
            }}
            onClick={clearFilter}
          >
            clear date and time
          </p>
        </div>
      </div>
    </div>
  );
}
export default LeftPart;

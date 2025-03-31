import React, { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import StylishButton from "./StylishButton";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function HomeHeroDatePicker() {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(null); // This will hold the start date as a string in YYYY-MM-DD format
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null); // This will hold the end date as a string in YYYY-MM-DD format
  const [endTime, setEndTime] = useState(null);

  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (city) params.append("city", city);
    if (startDate) params.append("startDate", startDate); // Send startDate as string in YYYY-MM-DD
    if (startTime) params.append("startTime", startTime); // Send startTime as string HH:mm
    if (endDate) params.append("endDate", endDate); // Send endDate as string in YYYY-MM-DD
    if (endTime) params.append("endTime", endTime); // Send endTime as string HH:mm

    navigate(`/home?${params.toString()}`);
  };

  const generateTimeOptions = () => {
    const times = [];
    let hour = 0;
    let minute = 0;
    for (let i = 0; i < 48; i++) {
      const timeString = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      times.push(timeString);
      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }
    return times;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="search-container flex md:flex-row items-center justify-center p-6 bg-transparent rounded-xl shadow-lg gap-4">
        <div className="w-full md:mb-0">
          <TextField
            label="City, airport, address or hotel"
            fullWidth
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="w-full md:mb-0 flex gap-2">
          <DatePicker
            label="Start Date"
            value={startDate ? dayjs(startDate) : null} // Convert stored string to Dayjs for display
            onChange={(newValue) => setStartDate(newValue ? newValue.format("YYYY-MM-DD") : null)} // Store as string in YYYY-MM-DD format
            renderInput={(params) => (
              <TextField {...params} fullWidth sx={{ backgroundColor: "white", borderRadius: "4px" }} />
            )}
          />
          <div className="my-2">
            <label htmlFor="startTime" className="block text-sm font-semibold text-gray-700 mb-2">
              Select Start Time:
            </label>
            <select
              id="startTime"
              value={startTime || ""}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all"
            >
              <option value="">Select Start Time</option>
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full md:mb-0 flex gap-2">
          <DatePicker
            label="End Date"
            value={endDate ? dayjs(endDate) : null} // Convert stored string to Dayjs for display
            onChange={(newValue) => setEndDate(newValue ? newValue.format("YYYY-MM-DD") : null)} // Store as string in YYYY-MM-DD format
            renderInput={(params) => (
              <TextField {...params} fullWidth sx={{ backgroundColor: "white", borderRadius: "4px" }} />
            )}
          />
          <div className="my-2">
            <label htmlFor="endTime" className="block text-sm font-semibold text-gray-700 mb-2">
              Select End Time:
            </label>
            <select
              id="endTime"
              value={endTime || ""}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all"
            >
              <option value="">Select End Time</option>
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <StylishButton handleSearch={handleSearch} />
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default HomeHeroDatePicker;
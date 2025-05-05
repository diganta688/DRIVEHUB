import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import StylishButton from "./StylishButton";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";

function HomeHeroDatePicker({ availableCities }) {
  const [city, setCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const navigate = useNavigate();
  const handleSearch = () => {
    if (!city || !startDate || !startTime || !endDate || !endTime) {
      toast.warn("Please fill in all fields.");
      return;
    }
    const params = new URLSearchParams();
    params.append("city", city);
    params.append("startDate", startDate);
    params.append("startTime", startTime);
    params.append("endDate", endDate);
    params.append("endTime", endTime);

    navigate(`/home?${params.toString()}`);
  };
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
  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    if (value.trim() === "") {
      setFilteredCities([]);
      setShowDropdown(false);
      return;
    }

    const matches = availableCities.filter((c) =>
      c.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCities(matches);
    setShowDropdown(true);
  };

  const handleCitySelect = (cityName) => {
    setCity(cityName);
    setFilteredCities([]);
    setShowDropdown(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="search-container grid gap-6 p-8 bg-white/80 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-200 md:grid-cols-3 transition-all duration-300">

        <div className="relative w-full">
          <TextField
          
            label="City, airport, address or hotel"
            fullWidth
            variant="outlined"
            value={city}
            onChange={handleCityChange}
            required
          />
          {showDropdown && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-xl mt-1 max-h-40 overflow-y-auto w-full shadow-xl transition-all duration-200">
            {filteredCities.length > 0 ? (
              filteredCities.map((cityItem) => (
                <li
                  key={cityItem}
                  className="px-4 py-2 hover:bg-blue-100 text-gray-800 cursor-pointer transition-colors"
                  onClick={() => handleCitySelect(cityItem)}
                >
                  {cityItem}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 italic">
                No cities found. You can access Home from top menu after login.
              </li>
            )}
          </ul>
          
          )}
        </div>

        <div className="w-full col-span-3 md:col-span-1 flex flex-col md:flex-row gap-4">
          <DatePicker
            label="Start Date"
            value={startDate ? dayjs(startDate) : null}
            onChange={(newValue) =>
              setStartDate(newValue ? newValue.format("YYYY-MM-DD") : null)
            }
            renderInput={(params) => (
              <TextField
                required
                {...params}
                fullWidth
                variant="outlined"
                sx={{ backgroundColor: "white", borderRadius: "8px" }}
              />
            )}
          />
          <FormControl fullWidth>
            <InputLabel id="startTime-label">Select Start Time</InputLabel>
            <Select
              labelId="startTime-label"
              id="startTime"
              value={startTime || ""}
              label="Select Start Time"
              onChange={(e) => setStartTime(e.target.value)}
              required
            >
              {generateTimeOptions().map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="w-full col-span-3 md:col-span-1 flex flex-col md:flex-row gap-4">
          <DatePicker
            label="End Date"
            required
            value={endDate ? dayjs(endDate) : null}
            onChange={(newValue) =>
              setEndDate(newValue ? newValue.format("YYYY-MM-DD") : null)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                required
                sx={{ backgroundColor: "white", borderRadius: "8px" }}
              />
            )}
          />
          <FormControl fullWidth>
            <InputLabel id="endTime-label">Select End Time</InputLabel>
            <Select
              labelId="endTime-label"
              id="endTime"
              value={endTime || ""}
              label="Select End Time"
              required
              onChange={(e) => setEndTime(e.target.value)}
            >
              {generateTimeOptions().map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="w-full md:w-auto col-span-3 md:col-span-1 flex justify-center md:justify-end">
          <StylishButton handleSearch={handleSearch} />
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default HomeHeroDatePicker;

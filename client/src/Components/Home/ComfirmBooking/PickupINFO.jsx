import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useLocation } from "react-router-dom";

function PickupINFO({ carInfo, homeDelivery, distanceHome, setCarInfo }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const availableStart = carInfo.StartDate ? dayjs(carInfo.StartDate) : null;
  const availableEnd = carInfo.EndDate ? dayjs(carInfo.EndDate) : null;
  const selectedStart = carInfo.userStartDate
    ? dayjs(carInfo.userStartDate)
    : null;

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

  const handleStartDateChange = (newValue) => {
    if (newValue) {
      setCarInfo((prevCarInfo) => ({
        ...prevCarInfo,
        userStartDate: newValue.format("YYYY-MM-DD"),
      }));
    }
  };

  const handleEndDateChange = (newValue) => {
    if (newValue) {
      setCarInfo((prevCarInfo) => ({
        ...prevCarInfo,
        userEndDate: newValue.format("YYYY-MM-DD"),
      }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="px-6 py-4 border-b">
        <div className="space-y-4">
          <div>
            <h3 className="flex items-center gap-2 text-gray-600 font-medium mb-2">
              <MapPin className="h-5 w-5" /> Pickup Location
            </h3>
            {homeDelivery ? (
              <p className="text-gray-800">{`Home Delivery (${distanceHome} km)`}</p>
            ) : carInfo && carInfo.availableLocations ? (
              <p className="text-gray-800 px-3">
                {carInfo.availableLocations} (from store)
              </p>
            ) : (
              <p style={{ color: "red" }} className="px-3">
                fetching issue
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="flex items-center gap-2 text-gray-600 font-medium mb-2">
                <Calendar className="h-5 w-5" /> Pickup
              </h3>
              <DatePicker
                label="Start Date"
                value={
                  carInfo.userStartDate ? dayjs(carInfo.userStartDate) : null
                }
                onChange={handleStartDateChange}
                shouldDisableDate={(date) =>
                  (availableStart && date.isBefore(availableStart, "day")) ||
                  (availableEnd && date.isAfter(availableEnd, "day"))
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
              <div className="mt-2" style={{ height: "4rem" }}>
                <Select
                  labelId="start-time-label"
                  id="start-time"
                  value={carInfo.userStartTime || ""}
                  onChange={(e) => {
                    setCarInfo((prevCarInfo) => ({
                      ...prevCarInfo,
                      userStartTime: e.target.value,
                    }));
                  }}
                  required
                  fullWidth
                >
                  {generateTimeOptions().map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-gray-600 font-medium mb-2">
                <Calendar className="h-5 w-5" /> Return
              </h3>
              <DatePicker
                label="End Date"
                value={carInfo.userEndDate ? dayjs(carInfo.userEndDate) : null}
                onChange={handleEndDateChange}
                shouldDisableDate={(date) =>
                  (selectedStart && date.isBefore(selectedStart, "day")) ||
                  (availableEnd && date.isAfter(availableEnd, "day"))
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
              <div className="mt-2" style={{ height: "4rem" }}>
                <Select
                  labelId="end-time-label"
                  id="end-time"
                  value={carInfo.userEndTime || ""}
                  onChange={(e) => {
                    setCarInfo((prevCarInfo) => ({
                      ...prevCarInfo,
                      userEndTime: e.target.value,
                    }));
                  }}
                  required
                  fullWidth
                >
                  {generateTimeOptions().map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
        <h3 className="flex items-center gap-2 text-gray-600 font-medium my-2">
          Availablity
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-gray-600 py-2 text-base justify-center">
          <div className="text-center sm:text-right">
            <div className="font-semibold text-black truncate text-lg">
              {searchParams.get("startDate") || "Start Date"}
            </div>
            <div className="text-base">
              {searchParams.get("startTime") || "Start Time"}
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <span className="w-14 sm:w-20 h-px bg-gray-400"></span>
            <span className="text-base text-gray-500 truncate">
              {searchParams.get("duration") || "Duration"}
            </span>
            <span className="w-14 sm:w-20 h-px bg-gray-400"></span>
          </div>

          <div className="text-center sm:text-left">
            <div className="font-semibold text-black truncate text-lg">
              {searchParams.get("endDate") || "End Date"}
            </div>
            <div className="text-base">
              {searchParams.get("endTime") || "End Time"}
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default PickupINFO;

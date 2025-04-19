import React, { useContext } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { HostCarEditContext } from "../../../Context/context";

const ScheduleForm = () => {
  const { hostCarInfo, setHostCarInfo } = useContext(HostCarEditContext);

  const handleFieldChange = (field, value) => {
    setHostCarInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="p-5 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Availability & Service</h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Availability Period</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label="Start Date"
              value={
                hostCarInfo.startDate ? dayjs(hostCarInfo.startDate) : null
              }
              onChange={(newValue) =>
                handleFieldChange("startDate", newValue.format("YYYY-MM-DD"))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: "white", borderRadius: "8px" }}
                />
              )}
            />
            <FormControl fullWidth required>
              <InputLabel id="startTime-label">Start Time</InputLabel>
              <Select
                labelId="startTime-label"
                id="startTime"
                value={hostCarInfo.startTime || ""}
                label="Start Time"
                onChange={(e) => handleFieldChange("startTime", e.target.value)}
              >
                {generateTimeOptions().map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DatePicker
              label="End Date"
              value={hostCarInfo.endDate ? dayjs(hostCarInfo.endDate) : null}
              onChange={(newValue) =>
                handleFieldChange("endDate", newValue.format("YYYY-MM-DD"))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: "white", borderRadius: "8px" }}
                />
              )}
            />
            <FormControl fullWidth required>
              <InputLabel id="endTime-label">End Time</InputLabel>
              <Select
                labelId="endTime-label"
                id="endTime"
                value={hostCarInfo.endTime || ""}
                label="End Time"
                onChange={(e) => handleFieldChange("endTime", e.target.value)}
              >
                {generateTimeOptions().map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-medium mb-2">Service Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label="Last Service Date"
              maxDate={dayjs().subtract(1, "day")}
              value={
                hostCarInfo.lastService ? dayjs(hostCarInfo.lastService) : null
              }
              onChange={(newValue) =>
                handleFieldChange("lastService", newValue.format("YYYY-MM-DD"))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: "white", borderRadius: "8px" }}
                />
              )}
            />

            <DatePicker
              label="Upcoming Service Date"
              minDate={dayjs().add(7, "day")}
              value={
                hostCarInfo.upcomingService
                  ? dayjs(hostCarInfo.upcomingService)
                  : null
              }
              onChange={(newValue) =>
                handleFieldChange(
                  "upcomingService",
                  newValue.format("YYYY-MM-DD")
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ backgroundColor: "white", borderRadius: "8px" }}
                />
              )}
            />
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default ScheduleForm;

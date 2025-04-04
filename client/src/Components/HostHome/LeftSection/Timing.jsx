import React, { useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { HostMainContext } from "../../../Context/context";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import dayjs from "dayjs";

function Timing() {
  const { formData, setFormData, inputError, setInputError } =
    useContext(HostMainContext);
  const handleDateChange = (name, value) => {
    const errors = { ...inputError };
    const tomorrow = dayjs().add(1, "day").startOf("day");
    if (name === "startDate") {
      if (!value || dayjs(value).isBefore(tomorrow)) {
        errors.startDate = "Start Date must be tomorrow or later.";
      } else {
        errors.startDate = "";
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value ? dayjs(value).format("YYYY-MM-DD") : null,
      }));
    } else if (name === "startTime") {
      setFormData((prev) => ({
        ...prev,
        [name]: value || null,
      }));
    } else if (name === "endDate") {
      const minEndDate = dayjs(formData.startDate).add(2, "day").startOf("day");
      if (!value || !formData.startDate || dayjs(value).isBefore(minEndDate)) {
        errors.endDate = `End Date must be at least ${minEndDate.format(
          "MMMM D, YYYY"
        )} or later.`;
      } else {
        errors.endDate = "";
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value ? dayjs(value).format("YYYY-MM-DD") : null,
      }));
    } else if (name === "endTime") {
      setFormData((prev) => ({
        ...prev,
        [name]: value || null,
      }));
    }
    setInputError(errors);
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
        <p
          className="block text-xs font-semibold text-gray-700 mb-1"
          style={{ fontSize: "12px", fontWeight: "700", marginTop: "20px" }}
        >
          End Date & Time
        </p>
      <div className="flex flex-col md:flex-row gap-4 my-3">
        <div className="w-full md:w-1/2">
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Pick Start Date"
              value={formData.startDate ? dayjs(formData.startDate) : null}
              onChange={(newValue) => handleDateChange("startDate", newValue)}
              fullWidth
              required
            />
          </DemoContainer>
          {inputError.startDate && (
            <p className="text-red-500 text-sm mt-1">{inputError.startDate}</p>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <FormControl fullWidth>
            <InputLabel id="startTime-label">Select Start Time</InputLabel>
            <Select
              labelId="startTime-label"
              id="startTime"
              value={formData.startTime || ""}
              label="Select Start Time"
              onChange={(e) => handleDateChange("startTime", e.target.value)}
            >
              {generateTimeOptions().map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {inputError.startTime && (
            <p className="text-red-500 text-sm mt-1">{inputError.startTime}</p>
          )}
        </div>
      </div>

      <div>
        <p
          className="block text-xs font-semibold text-gray-700 mb-1"
          style={{ fontSize: "12px", fontWeight: "700" }}
        >
          End Date & Time
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Pick End Date"
                value={formData.endDate ? dayjs(formData.endDate) : null}
                onChange={(newValue) => handleDateChange("endDate", newValue)}
                fullWidth
                required
              />
            </DemoContainer>
            {inputError.endDate && (
              <p className="text-red-500 text-sm mt-1">{inputError.endDate}</p>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <FormControl fullWidth>
              <InputLabel id="endTime-label">Select End Time</InputLabel>
              <Select
                labelId="endTime-label"
                id="endTime"
                value={formData.endTime || ""}
                label="Select End Time"
                onChange={(e) => handleDateChange("endTime", e.target.value)}
              >
                {generateTimeOptions().map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {inputError.endTime && (
              <p className="text-red-500 text-sm mt-1">{inputError.endTime}</p>
            )}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
export default Timing;

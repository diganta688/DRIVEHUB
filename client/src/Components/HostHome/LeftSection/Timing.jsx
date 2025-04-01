import React, { useState, useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { HostMainContext } from "../../../Context/context";
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
      <div className="my-3">
        <p
          className="block text-xs font-semibold text-gray-700 mb-1"
          style={{ fontSize: "12px", fontWeight: "700" }}
        >
          Start Date & Time
        </p>
        <div className="flex flex-col gap-2">
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
            <p className="text-red-500 text-sm">{inputError.startDate}</p>
          )}

          <div className="my-2">
            <label
              htmlFor="startTime"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Select Start Time:
            </label>
            <select
              id="startTime"
              value={formData.startTime || ""}
              onChange={(e) => handleDateChange("startTime", e.target.value)}
              required
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
          {inputError.startTime && (
            <p className="text-red-500 text-sm">{inputError.startTime}</p>
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
        <div className="flex flex-col gap-2">
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
            <p className="text-red-500 text-sm">{inputError.endDate}</p>
          )}

          <div className="my-2">
            <label
              htmlFor="endTime"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Select End Time:
            </label>
            <select
              required
              id="endTime"
              value={formData.endTime || ""}
              onChange={(e) => handleDateChange("endTime", e.target.value)}
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
          {inputError.endTime && (
            <p className="text-red-500 text-sm">{inputError.endTime}</p>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
}
export default Timing;

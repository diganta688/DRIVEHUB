import React, { useState, useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { HostMainContext } from "../../../Context/context";
import dayjs from 'dayjs';

function Timing() {
  const { formData, setFormData, inputError, setInputError } = useContext(HostMainContext);

  const handleDateChange = (name, value) => {
    const errors = { ...inputError };
    const tomorrow = dayjs().add(1, 'day').startOf('day');
  
    if (name === "startDate") {
      if (!value || dayjs(value).isBefore(tomorrow)) {
        errors.startDate = "Start Date must be tomorrow or later.";
      } else {
        errors.startDate = "";
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        endDate: null, // Resetting endDate if startDate is changed
        endTime: null, // Resetting endTime if startDate is changed
      }));
    }
  
    else if (name === "startTime") {
      if (formData.startDate && dayjs(formData.startDate).isSame(tomorrow)) {
        if (!value || dayjs().isAfter(dayjs(formData.startDate).hour(value.hour()).minute(value.minute()))) {
          errors.startTime = "Start Time must be later than the current time.";
        } else {
          errors.startTime = "";
        }
      } else {
        errors.startTime = "";
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  
    else if (name === "endDate") {
      const minEndDate = dayjs(formData.startDate).add(2, 'day').startOf('day'); // Minimum end date must be 2 days after start date
  
      if (!value || !formData.startDate || dayjs(value).isBefore(minEndDate)) {
        errors.endDate = `End Date must be at least ${minEndDate.format('MMMM D, YYYY')} or later.`;
      } else {
        errors.endDate = "";
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        endTime: null, // Resetting endTime if endDate is changed
      }));
    }
  
    else if (name === "endTime") {
      if (!formData.endDate) {
        errors.endTime = "Please select a valid End Date first.";
      } else if (!value) {
        errors.endTime = "End Time is required.";
      } else {
        errors.endTime = "";
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  
    setInputError(errors);
  };
  
  
  


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="my-3">
      <p className="block text-xs font-semibold text-gray-700 mb-1" style={{fontSize:"12px", fontWeight: "700"}}>Start Date & Time</p>
      <div className="flex flex-col gap-2">
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Pick Start Date"
            value={formData.startDate}
            onChange={(newValue) => handleDateChange("startDate", newValue)}
            fullWidth
          />
        </DemoContainer>
        {inputError.startDate && <p className="text-red-500 text-sm">{inputError.startDate}</p>}

        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            label="Pick Start Time"
            value={formData.startTime}
            onChange={(newValue) => handleDateChange("startTime", newValue)}
            fullWidth 
          />
        </DemoContainer>
        {inputError.startTime && <p className="text-red-500 text-sm">{inputError.startTime}</p>}
      </div>
    </div>

    <div>
      <p className="block text-xs font-semibold text-gray-700 mb-1" style={{fontSize:"12px", fontWeight: "700"}}>End Date & Time</p>
      <div className="flex flex-col gap-2">
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Pick End Date"
            value={formData.endDate}
            onChange={(newValue) => handleDateChange("endDate", newValue)}
            fullWidth
          />
        </DemoContainer>
        {inputError.endDate && <p className="text-red-500 text-sm">{inputError.endDate}</p>}

        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            label="Pick End Time"
            value={formData.endTime}
            onChange={(newValue) => handleDateChange("endTime", newValue)}
            fullWidth
          />
        </DemoContainer>
        {inputError.endTime && <p className="text-red-500 text-sm">{inputError.endTime}</p>}
      </div>
    </div>
</LocalizationProvider>

  );
}

export default Timing;

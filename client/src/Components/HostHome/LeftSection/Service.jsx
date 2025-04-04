import React, { useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { HostMainContext } from "../../../Context/context";
import dayjs from "dayjs";

function Service() {
  const { formData, setFormData, inputError, setInputError } = useContext(HostMainContext);

  const handleDateChange = (name, value) => {
    const errors = { ...inputError };
    const tomorrow = dayjs().add(1, "day").startOf("day");

    if (name === "lastService") {
      if (!value) {
        errors.lastService = "Please select a valid Last Service date.";
      } else {
        errors.lastService = "";
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value ? dayjs(value).format("YYYY-MM-DD") : null,
      }));
    } 
    else if (name === "upcomingService") {
      if (!value || dayjs(value).isBefore(tomorrow)) {
        errors.upcomingService = "Upcoming Service must be tomorrow or later.";
      } else {
        errors.upcomingService = "";
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value ? dayjs(value).format("YYYY-MM-DD") : null,
      }));
    }

    setInputError(errors);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <p className="block text-xs font-semibold text-gray-700 mb-1 mt-4">Last Service</p>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Select Last Service Date"
            value={formData.lastService ? dayjs(formData.lastService) : null}
            onChange={(newValue) => handleDateChange("lastService", newValue)}
            fullWidth
            required
          />
        </DemoContainer>
        {inputError.lastService && (
          <p className="text-red-500 text-sm mt-1">{inputError.lastService}</p>
        )}
      </div>

      <div>
        <p className="block text-xs font-semibold text-gray-700 mb-1 mt-4">Upcoming Service</p>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Select Upcoming Service Date"
            value={formData.upcomingService ? dayjs(formData.upcomingService) : null}
            onChange={(newValue) => handleDateChange("upcomingService", newValue)}
            fullWidth
            required
          />
        </DemoContainer>
        {inputError.upcomingService && (
          <p className="text-red-500 text-sm mt-1">{inputError.upcomingService}</p>
        )}
      </div>
    </LocalizationProvider>
  );
}

export default Service;

import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const UserLicence = ({ input, setInput }) => {
  const [previewURL, setPreviewURL] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setInput((prev) => ({ ...prev, licenseImage: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (newValue) => {
    const formattedDate = newValue ? newValue.format("YYYY-MM-DD") : "";
    setInput((prev) => ({ ...prev, licenseExpiryDate: formattedDate }));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      p={3}
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        width: "100%",
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <Typography variant="h6">Upload Licence & Expiry Date</Typography>

      <Button variant="contained" component="label">
        Upload Licence Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>

      {previewURL && (
        <img
          src={previewURL}
          alt="Preview"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />
      )}

<LocalizationProvider dateAdapter={AdapterDayjs}>
  <Box width="100%">
    <DatePicker
      label="Licence Expiry Date"
      value={input.licenseExpiryDate ? dayjs(input.licenseExpiryDate) : null}
      onChange={handleDateChange}
      minDate={dayjs().add(7, "day")}  // Ensure this is correctly initialized
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
    <Typography
      variant="body2"
      color="error"
      mt={1}
      sx={{ fontStyle: "italic", fontSize: "0.75rem" }}
    >
      * Licence expiry must be at least 7 days from today
    </Typography>
  </Box>
</LocalizationProvider>


    </Box>
  );
};

export default UserLicence;

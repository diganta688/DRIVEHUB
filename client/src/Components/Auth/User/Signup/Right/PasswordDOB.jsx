import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordDOB({
  input,
  setInput,
  ageError,
  passValidationError,
  setPassValidationError,
  error,
  setError,
  setAgeError,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dobChange = (newValue) => {
    setInput({ ...input, dob: newValue });

    if (newValue) {
      const birthDate = dayjs(newValue);
      const today = dayjs();
      const age = today.diff(birthDate, "year");
      if (age < 18) {
        setAgeError("You must be at least 18 years old!");
      } else {
        setAgeError("");
      }
    }
  };
  const passCheck = (e) => {
    if (e.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(e)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(e)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/\d/.test(e)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(e)) {
      return "Password must contain at least one special character";
    }
    return "";
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Enter Your Date of Birth"
            sx={{ width: "100%" }}
            value={input.dob}
            onChange={dobChange}
            slotProps={{
              textField: {
                error: !!ageError,
                helperText: ageError || "",
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <TextField
        style={{ marginTop: "8px" }}
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        fullWidth
        className="mb-2"
        value={input.password}
        onChange={(e) => {
          setInput({ ...input, password: e.target.value });
          setPassValidationError(passCheck(e.target.value));
        }}
        error={!!passValidationError}
        helperText={passValidationError}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Confirm Password"
        variant="outlined"
        type={showConfirmPassword ? "text" : "password"}
        fullWidth
        className="mb-2"
        value={input.confirmPassword}
        onChange={(e) => {
          setInput({ ...input, confirmPassword: e.target.value });
          setError(e.target.value !== input.password);
        }}
        error={error}
        helperText={error ? "Passwords don't match" : ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}

export default PasswordDOB;

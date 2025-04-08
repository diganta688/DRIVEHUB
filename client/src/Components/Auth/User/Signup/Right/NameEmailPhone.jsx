import React from "react";
import { TextField } from "@mui/material";
function NameEmailPhone({
  input,
  setInput,
  phoneError,
  setPhoneError,
  emailError,
  setEmailError,
}) {
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const handlechange = (e) => {
    const value = e;
    if (!validateEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };
  return (
    <>
      <TextField
        label="Full Name"
        variant="outlined"
        required
        fullWidth
        className="mb-2"
        value={input.name}
        onChange={(e) => setInput({ ...input, name: e.target.value })}
      />
      <TextField
        label="Email address"
        variant="outlined"
        required
        fullWidth
        className="mb-2"
        value={input.email}
        error={!!emailError}
        helperText={emailError}
        onChange={(e) => {
          setInput({ ...input, email: e.target.value });
          handlechange(e.target.value);
        }}
      />

      <TextField
        label="Phone Number"
        variant="outlined"
        type="number"
        required
        fullWidth
        error={!!phoneError}
        helperText={phoneError}
        value={input.phone}
        onChange={(e) => {
          if (e.target.value.length <= 10) {
            setInput({ ...input, phone: e.target.value });
          }
          if (e.target.value.length < 10 || e.target.value.length > 10) {
            setPhoneError("Phone Number must be in 10 digits");
          } else {
            setPhoneError("");
          }
        }}
      />
    </>
  );
}

export default NameEmailPhone;

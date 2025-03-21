import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";


function ForgotpasswordHost({ open, setOpen }) {
  const [input, setInput] = React.useState({
    email: "",
    otp: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [passValidationError, setPassValidationError] = React.useState(false);
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [otpLoading, setOtpLoading] = React.useState(false);
  const [emailBoxDisplay, setEmailBoxDisplay] = React.useState(false);
  const [otpBoxDisplay, setOtpBoxDisplay] = React.useState(true);
  const [passBoxDisplay, setPassBoxDisplay] = React.useState(true);
  const onetimepass = React.useRef(0);
  const verifyEmail = async () => {
    setEmailLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/host/email/forgot/validator`,
        { email: input.email },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setEmailBoxDisplay(true);
        setEmailLoading(false);
        toast.success(res.data.message);
        onetimepass.current = res.data.otp;
        setOtpBoxDisplay(false);
      }
    } catch (error) {
      setEmailLoading(false);
      console.error("Error in OtpSend:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  const verifyotp = () => {
    setOtpLoading(true);
    if (parseInt(input.otp) === onetimepass.current) {
      toast.success("Verified");
      setPassBoxDisplay(false);
      setOtpBoxDisplay(true);
    } else {
      toast.error("Wrong OTP");
    }

    setOtpLoading(false);
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
  const updatepass = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/host/reset-password`,
        { email: input.email, password: input.password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success(res.data.message || "Password reset successfully!", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage, {
        autoClose: 3000,
      });
    }
  };
  return (
    <>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                disabled={emailBoxDisplay}
                id="outlined-basic"
                label="Enter your registered Email id"
                variant="outlined"
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
              <p
                className="m-0 px-5 my-2"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  color: "#0000ffa8",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
                onClick={verifyEmail}
              >
                {emailLoading ? "Loading..." : "Verify Email"}
              </p>
              <TextField
                value={input.otp}
                id="outlined-basic"
                label="Enter the OTP"
                variant="outlined"
                onChange={(e) => setInput({ ...input, otp: e.target.value })}
                disabled={otpBoxDisplay}
              />
              <p
                className="m-0 px-5 my-2"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  color: "#0000ffa8",
                  fontWeight: "700",
                  fontSize: "13px",
                  cursor: "pointer"
                }}
                onClick={verifyotp}
              >
                {otpLoading ? "Loading..." : "Verify OTP"}
              </p>
              <TextField
                id="password"
                label="New Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                disabled={passBoxDisplay}
                required
                value={input.password}
                error={!!passValidationError}
                helperText={passValidationError}
                onChange={(e) => {
                  setInput({ ...input, password: e.target.value });
                  setPassValidationError(passCheck(e.target.value));
                }}
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
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                updatepass();
              }}
              autoFocus
              variant="contained"
              disabled={passValidationError}
              sx={{
                backgroundColor: "blue",
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                transition: "0.3s",
              }}
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default ForgotpasswordHost;

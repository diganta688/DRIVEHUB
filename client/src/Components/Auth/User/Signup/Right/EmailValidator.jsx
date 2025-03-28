import * as React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";

function EmailValidator({ open, setOpen, formdata, onetimepass }) {
  const [otp, setOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const verifyotp = () => {
    if (parseInt(otp) === onetimepass.current) {
      toast.success("Verified");
      signupProcess();
    } else {
      toast.error("Wrong OTP");
    }
  };

  const signupProcess = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        formdata,
        { withCredentials: true }
      );
      
      if (res.data.success) {
        toast.success(res.data.message, {
          onClose: () => {
            window.location.href = res.data.redirectTo;
          },
        });
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "12px",
          padding: "20px",
          background: "#f9f9f9",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
          pb: 1,
        }}
      >
        Verify Your Email
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Enter the six-digit OTP sent to your email.
        </Typography>

        <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
          <TextField
            label="Enter The OTP"
            variant="outlined"
            type="text"
            required
            fullWidth
            value={otp}
            onChange={handleOtpChange}
            inputProps={{
              maxLength: 6, // Restricts input to 6 digits
              pattern: "[0-9]*", // Allows only numeric input
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
        </motion.div>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => {
              if (otp.length === 6) {
                verifyotp();
              }
            }}
            variant="contained"
            sx={{
              backgroundColor: loading ? "#ccc" : "#1976D2",
              color: "#fff",
              px: 4,
              py: 1,
              textTransform: "none",
              fontSize: "16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: !loading && "#1565C0",
              },
            }}
            disabled={otp.length !== 6 || loading}
          >
            {loading ? <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} /> : "Verify"}
          </Button>
        </motion.div>
      </DialogActions>
    </Dialog>
  );
}

export default EmailValidator;

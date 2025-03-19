import React, { useState, useEffect } from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import UserSignupLeft from "../Left/UserSignupLeft";

const UserSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    dob: null,
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
        input, { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setLoading(false);
        window.location.href = (res.data.redirectTo);  
        
      }
    } catch (error) {
      setLoading(false);
      console.error("Signup failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const moveTologin = () => {
    navigate("/log-in");
  };

  return (
    <div className="relative h-screen w-full">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50 blur-lg"
        src="media\signupp.mp4"
      ></video>

      <div className="relative z-10 flex h-screen w-full">
        <div className="m-auto w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <UserSignupLeft/>
            <div className="flex flex-col justify-center bg-white p-8 md:w-1/2 p-5">
              <div
                className={`transition-all duration-1000 ${
                  animate
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
                  Sign Up
                </h1>
                <p className="mb-8 text-center text-gray-600">
                  Create an account to get started
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    required
                    fullWidth
                    className="mb-2"
                    value={input.name}
                    onChange={(e) =>
                      setInput({ ...input, name: e.target.value })
                    }
                  />
                  <TextField
                    label="Email address"
                    variant="outlined"
                    required
                    fullWidth
                    className="mb-2"
                    value={input.email}
                    onChange={(e) =>
                      setInput({ ...input, email: e.target.value })
                    }
                  />
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    type="number"
                    required
                    fullWidth
                    value={input.phone}
                    onChange={(e) => {
                      if (e.target.value.length <= 10) {
                        setInput({ ...input, phone: e.target.value });
                      }
                    }}
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Enter Your Date of Birth"
                        sx={{ width: "100%" }}
                        value={input.dob}
                        onChange={(newValue) =>
                          setInput({ ...input, dob: newValue })
                        }
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
                    onChange={(e) =>
                      setInput({ ...input, password: e.target.value })
                    }
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
                    onChange={(e) =>
                      setInput({ ...input, confirmPassword: e.target.value })
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center rounded-lg bg-blue-600 py-3 text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={loading}
                    style={{ borderRadius: "10px", marginBottom: "1rem" }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress
                          size={20}
                          color="inherit"
                          className="mr-2"
                        />
                        <span style={{ marginLeft: "5px" }}>Signing up...</span>
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <span
                    onClick={moveTologin}
                    className="font-medium text-blue-600 hover:text-blue-800"
                    style={{ cursor: "pointer" }}
                  >
                    Sign in →
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;

import React, { useState, useEffect } from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({email: "", password: ""});
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        input,{ withCredentials: true }
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

  const moveToSignin = () => {
    navigate("/sign-up");
  };

  return (
    <div className="relative h-screen w-full">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50 blur-lg"
        src="media\loginn.mp4"
      ></video>

      <div className="relative z-10 flex h-screen w-full">
        <div className="m-auto w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <div
              className="relative p-8 text-center text-white md:w-1/2 p-3"
            >
              <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="media\loginn.mp4"
              ></video>
              <div
                className={`relative z-10 flex h-full flex-col items-center justify-center transition-all duration-1000 ${
                  animate
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="mb-4 text-4xl font-bold">Welcome Back!</h2>
                <p className="mb-8">
                  Log in to access your personalized dashboard and continue your
                  journey with us.
                </p>
                <div
                  className="flex space-x-4"
                  style={{ width: "40%", justifyContent: "space-between" }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30">
                    <FaGithub className="text-white" />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30">
                    <FaTwitter className="text-white" />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30">
                    <FaLinkedin className="text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col justify-center bg-white p-8 md:w-1/2 p-5 "
            >
              <div
                className={`transition-all duration-1000 ${
                  animate
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: "200ms",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
                  Sign In
                </h1>
                <p className="mb-8 text-center text-gray-600">
                  Sign in to continue to your account
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="relative mb-2">
                    <TextField
                      id="outlined-basic"
                      label="Email address"
                      variant="outlined"
                      required
                      fullWidth
                      value={input.email}
                      onChange={(e) => setInput({...input, email: e.target.value})}
                    />
                  </div>

                  <div className="relative mb-2">
                    <TextField
                      id="password"
                      label="Password"
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      required
                      value={input.password}
                      onChange={(e) => setInput({...input, password: e.target.value})}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 text-sm text-gray-600 mx-2"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center rounded-lg bg-blue-600 py-3 text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={loading}
                    style={{ borderRadius: "10px", marginBottom: "1rem"}}
                  >
                    {loading ? (
                      <>
                        <CircularProgress
                          size={20}
                          color="inherit"
                          className="mr-2"
                        />
                        <span style={{ marginLeft: "5px" }}>Signing in...</span>
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </form>

                <div className="my-6 flex items-center justify-center" style={{marginBottom: "1rem"}}>
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-sm text-gray-500">
                    or continue with
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button className="flex items-center justify-center rounded-lg border border-gray-300 p-2 transition-all hover:bg-gray-50">
                    <FcGoogle className="h-5 w-5" />
                  </button>
                  <button className="flex items-center justify-center rounded-lg border border-gray-300 p-2 transition-all hover:bg-gray-50">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                        fill="#1877F2"
                      />
                    </svg>
                  </button>
                  <button className="flex items-center justify-center rounded-lg border border-gray-300 p-2 transition-all hover:bg-gray-50">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                        fill="#000000"
                      />
                    </svg>
                  </button>
                </div>

                <p className="mt-8 text-center text-sm text-gray-600" style={{marginTop: "1rem"}}>
                  Don't have an account?{" "}
                  <span
                    className="font-medium text-blue-600 hover:text-blue-800"
                    style={{ cursor: "pointer" }}
                    onClick={moveToSignin}
                  >
                    Sign up →
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

export default Login;

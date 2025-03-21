import React, { useState } from "react";
import { LogIn, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import ForgotpasswordHost from "./ForgotpasswordHost";

function HostLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e) => {
    setIsSubmit(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/host/login`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsSubmit(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      setIsSubmit(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-500 to-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-4">
          <div className="bg-gray-50 px-8 py-6 text-center">
            <Link
              to="/"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "0.5rem",
              }}
            >
              <CancelIcon />
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome Back, Host!
            </h2>
            <p className="text-gray-600 mt-2">Manage your car rental service</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="••••••••"
                  required
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
            </div>
            <p
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "0 1rem",
                cursor: "pointer",
                color: "blue",
                fontSize: "14px",
              }}
              onClick={()=>setOpen(true)}
            >
              Forgot Password?
            </p>
            {isSubmit ? (
              <button
                type="submit"
                disabled
                style={{ borderRadius: "10px" }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                style={{ borderRadius: "10px" }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span style={{ marginLeft: "0.5rem" }}>Sign In</span>
              </button>
            )}

            <div className="text-center mt-4">
              <Link to="/host/signup" style={{ color: "blue" }}>
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
      {open && <ForgotpasswordHost open={open} setOpen={setOpen}/>}
    </>
  );
}

export default HostLogin;

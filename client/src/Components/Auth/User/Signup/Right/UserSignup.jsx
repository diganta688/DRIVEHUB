import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UserSignupLeft from "../Left/UserSignupLeft";
import NameEmailPhone from "./NameEmailPhone";
import PasswordDOB from "./PasswordDOB";
import EmailValidator from "./EmailValidator";

const UserSignup = () => {
  const [animate, setAnimate] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    dob: null,
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [passValidationError, setPassValidationError] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const onetimepass = useRef(0);
  const [phoneError, setPhoneError] = useState("")
  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);
    OtpSend();
  };
  const OtpSend = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/email/validator`,
        { email: input.email },
        { withCredentials: true }
      );
  
      if (res.status === 200) {
        toast.success(res.data.message);
        onetimepass.current = res.data.otp;
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  const moveTologin = () => {
    navigate("/log-in");
  };

  return (
    <>
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
            <UserSignupLeft />
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
                  <NameEmailPhone input={input} setInput={setInput} phoneError={phoneError} setPhoneError={setPhoneError} emailError={emailError} setEmailError={setEmailError}/>

                  <PasswordDOB
                    input={input}
                    setInput={setInput}
                    ageError={ageError}
                    passValidationError={passValidationError}
                    setPassValidationError={setPassValidationError}
                    error={error}
                    setAgeError={setAgeError}
                    setError={setError}
                  />

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center rounded-lg bg-blue-600 py-3 text-white transition-all hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={
                      !!ageError || passValidationError || error ||phoneError || emailError
                    }
                    style={{ borderRadius: "10px", marginBottom: "1rem" }}
                  >
                    
                      Sign Up
                    
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
    {open && <EmailValidator open={open} setOpen={setOpen} formdata={input}/>}
    </>
  );
};

export default UserSignup;

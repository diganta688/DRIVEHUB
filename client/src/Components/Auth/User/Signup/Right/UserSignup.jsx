import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UserSignupLeft from "../Left/UserSignupLeft";
import NameEmailPhone from "./NameEmailPhone";
import PasswordDOB from "./PasswordDOB";
import EmailValidator from "./EmailValidator";
import Location from "./Location";
import Buttons from "./Buttons";
import UserLicence from "./UserLicence";

const UserSignup = () => {
  const [animate, setAnimate] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    dob: null,
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    lng: 0,
    lat: 0,
      licenseImage: null,
      licenseExpiryDate: "",
  });
  
  
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [passValidationError, setPassValidationError] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const onetimepass = useRef(0);
  const [phoneError, setPhoneError] = useState("");
  const [userSignupDisplayContent, setUserSignupDisplayContent] = useState(1);
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
        `${import.meta.env.VITE_BACKEND_URL}/validate/user/email`,
        { email: input.email, phone: input.phone },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        onetimepass.current = res.data.otp;
      }
    } catch (error) {
      console.error("Error in OtpSend:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
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
                  {userSignupDisplayContent === 1 ? (
                    <>
                      <NameEmailPhone
                        input={input}
                        setInput={setInput}
                        phoneError={phoneError}
                        setPhoneError={setPhoneError}
                        emailError={emailError}
                        setEmailError={setEmailError}
                      />

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
                    </>
                  ) : userSignupDisplayContent === 2 ? (
                    <Location input={input} setInput={setInput} />
                  ) : (
                    <UserLicence input={input} setInput={setInput} />
                  )}

                  <Buttons
                    input={input}
                    setUserSignupDisplayContent={setUserSignupDisplayContent}
                    userSignupDisplayContent={userSignupDisplayContent}
                    handleSubmit={handleSubmit}
                    ageError={ageError}
                    passValidationError={passValidationError}
                    error={error}
                    phoneError={phoneError}
                    emailError={emailError}
                  />

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
      {open && (
        <EmailValidator
          open={open}
          setOpen={setOpen}
          formdata={input}
          onetimepass={onetimepass}
        />
      )}
    </>
  );
};

export default UserSignup;

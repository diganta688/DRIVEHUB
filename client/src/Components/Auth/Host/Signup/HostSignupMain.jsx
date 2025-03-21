import React, { useState } from "react";
import { Link } from "react-router-dom";
import Location from "./Location";
import axios from "axios";
import { toast } from "react-toastify";
import PersonalInfo from "./PersonalInfo";
import BusinessInfo from "./BusinessInfo";
import EmainPass from "./EmainPass";
import SubmitBtn from "./SubmitBtn";
import { SignupContext } from "../../../../Context/context";
function HostSignupMain() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    serviceArea: "",
    businessName: "",
    experience: "",
    description: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [passValidationError, setPassValidationError] = useState(false);

  const handleSubmit = async (e) => {
    setIsSubmit(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/host/signup`,
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

  return (
    <SignupContext.Provider value={{ formData, handleInputChange }}>
      <div className="min-h-screen bg-gradient-to-br from-500 to-600 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-4">
          <div className="bg-gray-50 px-8 py-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Become a Host</h2>
            <p className="text-gray-600 mt-2">Start your car rental journey</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Personal Information
              </h3>
              <PersonalInfo />
              <Location setFormData={setFormData} />
            </div>
            <BusinessInfo setFormData={setFormData} />
            <EmainPass
              setFormData={setFormData}
              setPassValidationError={setPassValidationError}
              passValidationError={passValidationError}
              error={error}
              setError={setError}
            />
            <SubmitBtn
              passValidationError={passValidationError}
              error={error}
              isSubmit={isSubmit}
            />
            <div className="text-center mt-4 ">
              <Link to="/host/login" style={{ color: "blue" }}>
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </SignupContext.Provider>
  );
}

export default HostSignupMain;

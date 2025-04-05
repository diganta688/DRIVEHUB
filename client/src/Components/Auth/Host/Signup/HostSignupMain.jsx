import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Location from "./Location";
import axios from "axios";
import { toast } from "react-toastify";
import PersonalInfo from "./PersonalInfo";
import BusinessInfo from "./BusinessInfo";
import EmainPass from "./EmainPass";
import SubmitBtn from "./SubmitBtn";
import { SignupContext } from "../../../../Context/context";
import CancelIcon from '@mui/icons-material/Cancel';
import EmailValidatorHost from "./EmailValidatorHost";

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
    lng: 0,
    lat:0
  });
    const onetimepass = useRef(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [passValidationError, setPassValidationError] = useState(false);  
  const [EmailValidator, setEmailValidator] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    OtpSend();
    setOpen(true);
  };
  const OtpSend = async () => {    
    try {
        const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/validate/host/email`,
            { email: formData.email, phone: formData.phone },
            { withCredentials: true }
        );
        if (res.status === 200) {
            toast.success(res.data.message);
            onetimepass.current = res.data.otp;
        }
    } catch (error) {
        console.error("Error in OtpSend:", error);
        const errorMessage = error.response?.data?.message || error.response?.data?.error || "Something went wrong. Please try again.";
        toast.error(errorMessage);
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
          <Link to="/" style={{display: "flex", justifyContent: "flex-end", padding: "0.5rem"}} ><CancelIcon/></Link>
            <h2 className="text-2xl font-bold text-gray-800">Become a Host</h2>
            <p className="text-gray-600 mt-2">Start your car rental journey</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Personal Information
              </h3>
              <PersonalInfo setPhoneError={setPhoneError} phoneError={phoneError}/>
              <Location setFormData={setFormData} />
            </div>
            <BusinessInfo setFormData={setFormData} />
            <EmainPass
              setFormData={setFormData}
              setPassValidationError={setPassValidationError}
              passValidationError={passValidationError}
              error={error}
              setError={setError}
              EmailValidator={EmailValidator}
              setEmailValidator={setEmailValidator}
            />
            <SubmitBtn
              passValidationError={passValidationError}
              error={error}
              isSubmit={isSubmit}
              EmailValidator={EmailValidator}
              phoneError={phoneError}
            />
            <div className="text-center mt-4 ">
              <Link to="/host/login" style={{ color: "blue" }}>
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
      {open && <EmailValidatorHost open={open} setOpen={setOpen} formData={formData} setIsSubmit={setIsSubmit} onetimepass={onetimepass}/>}
    </SignupContext.Provider>
  );
}

export default HostSignupMain;

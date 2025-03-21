import React , {useState, useContext} from "react";
import {
    Mail,
    Lock,
  } from "lucide-react";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
  import { SignupContext } from "../../../../Context/context";


function EmainPass({ error, setError, setPassValidationError, passValidationError, EmailValidator, setEmailValidator }) {
      const { formData, handleInputChange } = useContext(SignupContext);
    
    const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      };
      const handlechange = (e) => {
        const value = e;
     if (!validateEmail(value)) {
          setEmailValidator("Invalid email format");
        } else {
          setEmailValidator("");
        }
      }
      const passCheck = (e)=>{
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
      }
      const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
      };
    
      const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
      };
      
  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e)=>{
              handleInputChange(e);
              handlechange(e.target.value);
            }}
            className={`pl-10 pr-10 w-full px-5 py-2 border rounded-lg transition focus:ring-2 ${
              EmailValidator
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="your@email.com"
            required
          />
        </div>
        {EmailValidator &&<p className="text-red-500 text-sm m-0">{EmailValidator}</p>}
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
            onChange={(e) => {
              handleInputChange(e);
              setPassValidationError(passCheck(e.target.value));
            }}
            className={`pl-10 pr-10 w-full px-5 py-2 border rounded-lg transition focus:ring-2 ${
              passValidationError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
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
        {passValidationError && (
          <p className="text-red-500 text-sm">{passValidationError}</p>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => {
              handleInputChange(e);
              setError(e.target.value !== formData.password);
            }}
            className={`pl-10 pr-10 w-full px-5 py-2 border rounded-lg transition focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="••••••••"
            required
          />

          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm pl-2">
            Password & Confirm Password don't match
          </p>
        )}
      </div>
    </>
  );
}

export default EmainPass;

import React, {useContext} from "react";
import {
  User,
  Phone,
} from "lucide-react";
import { SignupContext } from "../../../../Context/context";

function PersonalInfo() {
      const { formData, handleInputChange } = useContext(SignupContext);
    
  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="pl-12 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="John Doe"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="629XX32X52"
            required
          />
        </div>
      </div>
    </>
  );
}

export default PersonalInfo;

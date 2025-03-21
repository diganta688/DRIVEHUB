import React, { useContext } from "react";
import { Briefcase } from "lucide-react";

import { SignupContext } from "../../../../Context/context";

function BusinessInfo() {
  const { formData, handleInputChange } = useContext(SignupContext);

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mt-3">
        Business Information
      </h3>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Business Name
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Your Car Rental Business"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Years of Experience
        </label>
        <div className="relative">
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="0"
            min="0"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Business Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          rows={4}
          placeholder="Tell us about your car rental business..."
          required
        />
      </div>
    </div>
  );
}

export default BusinessInfo;

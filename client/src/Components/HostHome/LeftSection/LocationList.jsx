import React, { useState, useContext } from "react";
import { MapPin, Building, Globe } from "lucide-react";
import { HostMainContext } from "../../../Context/context";

function LocationList({ disabled }) {
  const { formData } = useContext(HostMainContext);
  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            disabled={disabled}
            type="text"
            name="address"
            value={formData.address}
            className={`pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
              disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
            }`}
            placeholder="123 Main St"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              disabled={disabled}
              type="text"
              name="city"
              value={formData.city}
              className={`pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
              }`}
              placeholder="KOLKATA"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            disabled={disabled}
            type="text"
            name="state"
            value={formData.state}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
            placeholder="KOL"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            disabled={disabled}
            type="text"
            name="zipCode"
            value={formData.zipCode}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
            placeholder="700004"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              disabled={disabled}
              type="text"
              name="country"
              value={formData.country}
              className={`pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
              placeholder="India"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationList;

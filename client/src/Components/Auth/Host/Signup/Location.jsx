import React, { useState, useContext  } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { MapPin, Building, Globe, Navigation } from "lucide-react";
import { SignupContext } from "../../../../Context/context";


function Location({ setFormData }) {
  const { formData, handleInputChange } = useContext(SignupContext);
  const accessToken = import.meta.env.VITE_MAP_TOKEN;
  const [suggestions, setSuggestions] = useState([]);
  const findlocation = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${accessToken}&autocomplete=true&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  const handleSelect = (place) => {
    const placeName = place.place_name;
    const context = place.context || [];
    let city = "";
    let state = "";
    let zipCode = "";
    let country = "";

    context.forEach((item) => {
      if (item.id.includes("place")) {
        city = item.text;
      } else if (item.id.includes("region")) {
        state = item.text;
      } else if (item.id.includes("postcode")) {
        zipCode = item.text;
      } else if (item.id.includes("country")) {
        country = item.text;
      }
    });

    setFormData((prev) => ({
      ...prev,
      address: placeName,
      city,
      state,
      zipCode,
      country,
    }));

    setSuggestions([]);
  };
  return (
    <div className="space-y-4 pt-4">
      <h4 className="text-md font-medium text-gray-700 border-b">
        Location Details
      </h4>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => {
              handleInputChange(e);
              findlocation(e.target.value);
            }}
            className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="123 Main St"
            required
          />
          {formData.address.length > 0 && (
            <HighlightOffIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  address: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "",
                }));
                setSuggestions([]);
              }}
            />
          )}

          {suggestions.length > 0 && (
            <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-56 overflow-y-auto px-0">
              {suggestions.map((place) => (
                <li
                  key={place.id}
                  className="flex items-center px-4 py-3 cursor-pointer group transition duration-200 hover:text-blue-500"
                  onClick={() => handleSelect(place)}
                >
                  <LocationOnIcon className="text-gray-500 group-hover:text-blue-500 mr-2" />
                  {place.place_name}
                </li>
              ))}
            </ul>
          )}
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
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="India"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Service Area Radius
        </label>
        <div className="relative">
          <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="serviceArea"
            value={formData.serviceArea}
            onChange={handleInputChange}
            className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="e.g., Within 50 miles of city center"
          />
        </div>
      </div>
    </div>
  );
}

export default Location;

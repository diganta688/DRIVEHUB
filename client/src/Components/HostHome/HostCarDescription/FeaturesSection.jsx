import React, { useContext } from "react";
import { HostCarEditContext } from "../../../Context/context";

const allFeatures = {
  airbags: "Airbags",
  abs: "ABS",
  parkingSensors: "Parking Sensors",
  blindSpotMonitoring: "Blind Spot Monitoring",
  Bluetooth: "Bluetooth",
  GPS: "GPS",
  sunRoof: "Sun Roof",
  crouseControl: "Cruise Control",
};

const FeaturesSection = () => {
  const { hostCarInfo, setHostCarInfo } = useContext(HostCarEditContext);

  const handleToggle = (featureKey) => {
    console.log(featureKey);
    
    setHostCarInfo((prevInfo) => ({
      ...prevInfo,
      features: {
        ...prevInfo.features,
        [featureKey]: !prevInfo.features?.[featureKey],
      },
    }));
  };

  return (
    <div className="p-5 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Features</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(allFeatures).map(([key, label]) => (
          <label
            key={key}
            className="p-3 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
            style={{display: "flex", alignItems: "center"}}
          >
            <input
              type="checkbox"
              checked={hostCarInfo.features?.[key] || false}
              onChange={() => handleToggle(key)}
              className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-400 transition-all duration-200 mx-3"
            />
            <span className="text-gray-800 font-medium">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;

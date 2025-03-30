import React, { useState } from "react";
import "./Filter.css"

const Filter = () => {
  const [selectedSeats, setSelectedSeats] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedBodyType, setSelectedBodyType] = useState([]);

  const toggleBodyType = (type) => {
    setSelectedBodyType((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type] 
    );
  };

  const buttonStyle = (isSelected) =>
    `rounded cursor-pointer text-xs transition-all duration-200 px-2 py-1
     ${isSelected ? "border border-blue-500 bg-blue-100 text-blue-700" : "border border-gray-300 bg-gray-100 text-gray-700"}`;

  return (
    <div className="p-2 space-y-4 text-sm">
      <div>
        <h4 className="text-gray-600 font-medium mb-1">Seats</h4>
        <div className="flex gap-2 flex-wrap">
          {["5 seats", "7 seats"].map((seat) => (
            <button
              key={seat}
              className={buttonStyle(selectedSeats === seat)}
              onClick={() =>
                setSelectedSeats(selectedSeats === seat ? "" : seat)
              }
            >
              {seat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-gray-600 font-medium mb-1">Transmission</h4>
        <div className="flex gap-2 flex-wrap">
          {["Automatic", "Manual"].map((transmission) => (
            <button
              key={transmission}
              className={buttonStyle(selectedTransmission === transmission)}
              onClick={() =>
                setSelectedTransmission(selectedTransmission === transmission ? "" : transmission)
              }
            >
              {transmission}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-gray-600 font-medium mb-1">Body type</h4>
        <div className="flex gap-2 flex-wrap">
          {["Hatchback", "Sedan", "SUV", "MUV"].map((bodyType) => (
            <button
              key={bodyType}
              className={buttonStyle(selectedBodyType.includes(bodyType))}
              onClick={() => toggleBodyType(bodyType)}
            >
              {bodyType}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;

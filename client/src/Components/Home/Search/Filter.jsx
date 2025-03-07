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
    `rounded-lg cursor-pointer transition-all duration-200 
     ${isSelected ? "border-2 border-blue-500 bg-blue-100 text-blue-700" : "border border-gray-300 bg-gray-100 text-gray-700"}`;

  return (
    <div className="p-2 space-y-6">
      <div style={{marginBottom: "1rem"}}>
        <h4 className="text-gray-600 font-medium mb-2">Seats</h4>
        <div className="flex gap-2">
          {["5 seats", "7 seats"].map((seat) => (
            <button
              key={seat}
              className={`button ${buttonStyle(selectedSeats === seat)}`}
              onClick={() =>
                setSelectedSeats(selectedSeats === seat ? "" : seat)
              }
            >
              {seat}
            </button>
          ))}
        </div>
      </div>
      <div style={{marginBottom: "1rem"}}>
        <h4 className="text-gray-600 font-medium mb-2">Transmission</h4>
        <div className="flex gap-2">
          {["Automatic", "Manual"].map((transmission) => (
            <button
              key={transmission}
              className={`button ${buttonStyle(selectedTransmission === transmission)}`}
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
        <h4 className="text-gray-600 font-medium mb-2">Body type</h4>
        <div className="flex gap-2 flex-wrap">
          {["Hatchback", "Sedan", "SUV", "MUV"].map((bodyType) => (
            <button
              key={bodyType}
              className={`button ${buttonStyle(selectedBodyType.includes(bodyType))}`}
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

import React, { useContext } from "react";
import { UserHomeContext } from "../../../Context/context";
import "./Filter.css";

const Filter = () => {
  const { selectedFilters, setSelectedFilters } = useContext(UserHomeContext);

  const buttonStyle = (isSelected) =>
    `rounded cursor-pointer text-xs transition-all duration-200 px-1 py-0.5
     ${isSelected ? "border border-blue-500 bg-blue-100 text-blue-700" : "border border-gray-300 bg-gray-100 text-gray-700"}`;

  const toggleFilter = (category, value) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[category].includes(value);
      return {
        ...prev,
        [category]: isSelected
          ? prev[category].filter((item) => item !== value)
          : [...prev[category], value],
      };
    });
  };

  return (
    <div className="p-1 space-y-2 text-xs">
      {renderFilterSection("Seats", "seats", ["2", "4", "5", "6", "7", "8"])}
      {renderFilterSection("Transmission", "transmission", ["Automatic", "Manual"])}
      {renderFilterSection("Segment", "segment", ["Hatchback", "Sedan", "SUV", "MPV", "Crossover"])}
      {renderFilterSection("Brand", "make", ["Maruti", "Hyundai", "Tata", "Mahindra", "Kia"])}
      {renderFilterSection("Fuel Type", "fuelType", ["Diesel", "Petrol", "Electric", "CNG"])}
    </div>
  );

  function renderFilterSection(title, category, options) {
    return (
      <div className="mb-2">
        <h4 className="text-gray-600 mb-1" style={{ fontSize: "13px", fontWeight: "700" }}>{title}</h4>
        <div className="flex gap-1 flex-wrap">
          {options.map((item) => (
            <button
              key={item}
              className={buttonStyle(selectedFilters[category].includes(item))}
              onClick={() => toggleFilter(category, item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }
};

export default Filter;

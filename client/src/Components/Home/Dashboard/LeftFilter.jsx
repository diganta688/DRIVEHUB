import React, { useState } from 'react';

function LeftFilter() {
  const [selectedFilters, setSelectedFilters] = useState({
    segment: [],
    brand: [],
    fuelType: [],
    transmissionType: [],
    seatingCapacity: [],
  });

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
  const isSelected = (category, value) => selectedFilters[category].includes(value);
  const filterButtonClass = (category, value) =>
    isSelected(category, value)
      ? "border-orange-500 bg-orange-100 text-gray-800" 
      : "border-black-300 text-gray-700";

  return (
    <div className="w-full md:w-72 p-4 border-r border-black-300 space-y-6 filter-left">
      <div className="flex justify-between items-center border-b pb-3 flex-wrap mb-4">
        <h5 className="text-xl font-semibold text-gray-800 ">Filters</h5>
        <button
          className="text-red-500 text-sm hover:underline"
          onClick={() =>
            setSelectedFilters({
              segment: [],
              brand: [],
              fuelType: [],
              transmissionType: [],
              seatingCapacity: [],
            })
          }
        >
          Clear all
        </button>
      </div>

      {renderFilterSection('Segment', 'segment', ["Hatchback", "Sedan", "SUV", "MUV"])}
      {renderFilterSection('Brand', 'brand', ["Maruti", "Hyundai", "Toyota", "Mahindra", "Kia", "Ford"])}
      {renderFilterSection('Fuel Type', 'fuelType', ["Diesel", "Petrol"])}
      {renderFilterSection('Transmission Type', 'transmissionType', ["Automatic", "Manual"])}
      {renderFilterSection('Seating Capacity', 'seatingCapacity', ["5 seats", "7 seats"])}

    </div>
  );

  function renderFilterSection(title, category, options) {
    return (
      <div className="space-y-2 mb-5">
        <h5 className="font-medium text-gray-800">{title}</h5>
        <div className="flex flex-wrap gap-2">
          {options.map((item) => (
            <button
            
              key={item}
              onClick={() => toggleFilter(category, item)}
              className={`flex items-center gap-2 px-3 py-1 border rounded-lg ${filterButtonClass(category, item)}`}
            >
              {isSelected(category, item) && (
                <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-orange-500">
                  <i className="fa-solid fa-check text-black text-xs"></i>
                </span>
              )}
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default LeftFilter;

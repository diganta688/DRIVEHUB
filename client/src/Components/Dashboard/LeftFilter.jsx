import React from "react";
import { motion } from "framer-motion";
import { UserHomeContext } from "../../Context/context";
import { useContext } from "react";

function LeftFilter() {
  const { selectedFilters, setSelectedFilters } = useContext(UserHomeContext);
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

  const isSelected = (category, value) =>
    selectedFilters[category].includes(value);

  const filterButtonClass = (category, value) =>
    isSelected(category, value)
      ? "border border-blue-500 bg-blue-100 text-blue-700"
      : "border border-gray-300 text-gray-700";

  return (
    <div className="w-full md:w-64 p-3 border-r border-gray-300 space-y-4 filter-left pb-5">
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-3">
        <h5 className="text-lg font-semibold text-gray-800">Filters</h5>
        <button
          className="text-red-500 text-xs"
          onClick={() =>
            setSelectedFilters({
              make: [],
              fuelType: [],
              transmission: [],
              seats: [],
            })
          }
        >
          Clear all
        </button>
      </div>

      {renderFilterSection("Make", "make", [
        "Maruti",
        "Hyundai",
        "Tata",
        "Mahindra",
        "Kia",
      ])}
      {renderFilterSection("Fuel Type", "fuelType", [
        "Diesel",
        "Petrol",
        "Electric",
        "CNG",
      ])}
      {renderFilterSection("Transmission", "transmission", [
        "Automatic",
        "Manual",
      ])}
      {renderFilterSection("Seats", "seats", ["2", "4", "5", "6", "7", "8"])}
    </div>
  );

  function renderFilterSection(title, category, options) {
    return (
      <motion.div
        className="space-y-1 mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h5 className="" style={{ fontWeight: "700", fontSize: "17px" }}>
          {title}
        </h5>
        <div className="flex flex-wrap gap-1 mt-1">
          {options.map((item) => (
            <motion.button
              key={item}
              onClick={() => toggleFilter(category, item)}
              className={`px-2 py-1 rounded text-xs transition-all duration-300 ${filterButtonClass(
                category,
                item
              )}`}
              whileTap={{ scale: 0.95 }}
              style={{ width: "90px", objectFit: "contain" }}
            >
              <p className="m-0" style={{ fontSize: "14px" }}>
                {item}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }
}

export default LeftFilter;

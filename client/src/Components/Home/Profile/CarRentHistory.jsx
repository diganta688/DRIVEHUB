import React, { useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import { Calendar, MapPin } from "lucide-react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { motion, AnimatePresence } from "framer-motion";

function CarRentHistory({ userProfileInfo }) {
  const rentHistory = userProfileInfo?.RentHistory || [];
  const [expandedIndex, setExpandedIndex] = useState(null);

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const handleToggle = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <>
      {rentHistory.length > 0 ? (
        <div >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 px-3">
            Recent Rentals
          </h2>
          <div className="space-y-4 mx-4">
            {rentHistory.map((car, index) => {
              const isExpanded = expandedIndex === index;
              const duration = calculateDuration(
                car.userStartDate,
                car.userEndDate
              );

              return (
                <div
                key={car._id || index}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm transition-all overflow-hidden mb-3"
                >
                  <div
                    className="flex items-center p-4 cursor-pointer"
                    onClick={() => handleToggle(index)}
                  >
                    <img
                      src={car.MainImage}
                      alt={car.make}
                      className="w-28 h-20 object-cover rounded"
                    />
                    <div className="ml-4 w-full">
                      <h5 className="font-semibold text-gray-800 mx-3">
                        {car.make.toUpperCase()} {car.model.toUpperCase()}{" "}
                        <span className="text-gray-500">({car.year})</span>
                      </h5>

                      <div className="flex justify-between mt-2 text-sm text-gray-500 mx-3">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {new Date(car.userStartDate).toLocaleDateString("en-IN")}
                        </div>
                        <div className="flex items-center">
                          <AccessTimeIcon
                            sx={{ fontSize: 16 }}
                            className="mr-1"
                          />
                          {duration} days
                        </div>
                        <div className="flex items-center">
                          <CurrencyRupeeIcon
                            sx={{ fontSize: 16 }}
                            className="mr-1"
                          />
                          {car.price}/day
                        </div>
                        <div>
                          <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                              car.available === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : car.available === "booked"
                                ? "bg-green-100 text-green-700"
                                : car.available === "canceled"
                                ? "bg-gray-100 text-gray-700"
                                : ""
                            }`}
                          >
                            {car.available}
                          </span>
                        </div>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="bg-gray-50 p-4 border-t border-gray-200 text-sm">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">
                                Car Details
                              </h4>
                              <ul className="space-y-1 text-gray-600">
                                <li className="flex justify-between">
                                  <span>Make & Model:</span>
                                  <span>
                                    {car.make} {car.model}
                                  </span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Year:</span>
                                  <span>{car.year}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Color:</span>
                                  <span>{car.color}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Extra Charges:</span>
                                  <span>
                                    <CurrencyRupeeIcon
                                      sx={{ fontSize: 13 }}
                                      className="mr-1"
                                    />
                                    {car.ExtraCharges}/day
                                  </span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Transmission:</span>
                                  <span>{car.transmission}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Fule Type:</span>
                                  <span>{car.fuelType}</span>
                                </li>
                                <li className="flex justify-between">
                                <span>Last Service:</span>
                                <span>{new Date(car.lastService).toLocaleDateString("en-IN")}</span>

                                </li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2">
                                Booking Details
                              </h4>
                              <ul className="space-y-1 text-gray-600">
                                <li className="flex justify-between">
                                  <span>Pickup:</span>
                                  <span>{car.userStartDate}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Return:</span>
                                  <span>{car.userEndDate}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Duration:</span>
                                  <span>{duration} days</span>
                                </li>

                                <li className="flex justify-between">
                                  <span>Payment Method:</span>
                                  <span>online</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Segment:</span>
                                  <span>{car.segment}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Mileage:</span>
                                  <span>
                                    {car.mileage}
                                    {car.fuelType === "Electric"
                                      ? "/hr charge"
                                      : "/l"}
                                  </span>
                                </li>
                                <li className="flex justify-between">
                                <span>Upcomming Service:</span>
                                <span>{new Date(car.upcomingService).toLocaleDateString("en-IN")}</span>

                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-4 border-t text-gray-500">
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              <span className="mx-2">{car.address}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-4 mx-4 mt-4 flex justify-center">
          <div className="flex items-center text-gray-600">
            <HistoryIcon sx={{ marginRight: "0.5rem" }} />
            You haven't rented any car yet.
          </div>
        </div>
      )}
    </>
  );
}

export default CarRentHistory;

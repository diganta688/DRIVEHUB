import React, { useEffect, useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import { Calendar, MapPin } from "lucide-react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

function CarRentHistory({ userProfileInfo,setUserProfileInfo }) {
  const rentHistory = userProfileInfo?.RentHistory || [];
  const [expandedIndex, setExpandedIndex] = useState(null);
  const[bookingCancelLoader, setBookingCancelLoader] = useState(false);
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const handleToggle = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const cancelCheck = async (carId) => {
    setBookingCancelLoader(true);
    try {
      const responce = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/check-status/${
          userProfileInfo._id
        }/${carId}`,
        { withCredentials: true }
      );
      if (responce.status === 200) {
        if (
          responce.data.rentStatus === "booked" ||
          responce.data.rentStatus === "canceled"
        ) {
          toast.warn(
            `You cannot cancel this booking right now. host was already ${responce.data.rentStatus} your car`
          );
          setBookingCancelLoader(false);
        }
        else{
          cancelCar(carId);
        }
      } else {
        setBookingCancelLoader(false);
        console.error(responce.data.message);
        toast.error(responce.data.message);
      }
    } catch (error) {
      setBookingCancelLoader(false);
      console.error(error);
      toast.error("An error occurred while checking the booking status.");
    }
  };
  
  const cancelCar = async (carId) => {
    setBookingCancelLoader(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/cancel/booking-cancel/${userProfileInfo._id}/${carId}`,
        { withCredentials: true }
      )
      if (response.status === 200) {
        setBookingCancelLoader(false);
        toast.success("Booking canceled successfully!");
        setUserProfileInfo((prev) => ({
          ...prev,
          RentHistory: prev.RentHistory.map((entry) =>
            entry.carId === carId ? { ...entry, bookingStatus: "canceled" } : entry
          ),
        }));
      }
    } catch (error) {
      setBookingCancelLoader(false);
      console.error(error);
      toast.error("An error occurred while canceling the booking.");
    }
  };
  
  return (
    <>
      {rentHistory.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 px-3">
            Recent Rentals
          </h2>
          <div
            className="space-y-4 mx-4"
            style={{ maxHeight: "30rem", overflowY: "auto" }}
          >
            {rentHistory.map((car, index) => {
              const isExpanded = expandedIndex === index;
              const duration = calculateDuration(
                car.userStartDate,
                car.userEndDate
              );
              const status = car.bookingStatus;

              return (
                <div
                  key={car._id || index}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm transition-all overflow-hidden mb-3"
                >
                  <div
                    className="flex flex-col sm:flex-row sm:items-center p-4 gap-4 cursor-pointer"
                    onClick={() => handleToggle(index)}
                  >
                    <img
                      src={car.snapshot.MainImage}
                      alt={car.snapshot.make}
                      className="w-full sm:w-28 h-28 object-cover rounded"
                    />
                    <div className="w-full">
                      <h5 className="font-semibold text-gray-800">
                        {car.snapshot.make} {car.snapshot.model}{" "}
                        <span className="text-gray-500">
                          ({car.snapshot.year})
                        </span>
                      </h5>
                      <div className="flex flex-col sm:flex-row sm:justify-between mt-2 text-sm text-gray-500 gap-2">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {formatDate(car.userStartDate)}
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
                          {car.snapshot.price}/day
                        </div>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full text-center w-fit ${
                            status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : status === "booked"
                              ? "bg-green-100 text-green-700"
                              : status === "canceled"
                              ? "bg-gray-100 text-gray-700"
                              : status === "completed"
                              ? "bg-green-100 text-green-700"
                              : ""
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                    </div>
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
                                    {car.snapshot.make} {car.snapshot.model}
                                  </span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Year:</span>
                                  <span>{car.snapshot.year}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Color:</span>
                                  <span>{car.snapshot.color}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Extra Charges:</span>
                                  <span>
                                    <CurrencyRupeeIcon
                                      sx={{ fontSize: 13 }}
                                      className="mr-1"
                                    />
                                    {car.snapshot.ExtraCharges}/day
                                  </span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Transmission:</span>
                                  <span>{car.snapshot.transmission}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Fuel Type:</span>
                                  <span>{car.snapshot.fuelType}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Last Service:</span>
                                  <span>
                                    {formatDate(car.snapshot.lastService)}
                                  </span>
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
                                  <span>{formatDate(car.userStartDate)}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Return:</span>
                                  <span>{formatDate(car.userEndDate)}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Duration:</span>
                                  <span>{duration} days</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Payment Method:</span>
                                  <span>Online</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Segment:</span>
                                  <span>{car.snapshot.segment}</span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Mileage:</span>
                                  <span>
                                    {car.snapshot.mileage}
                                    {car.snapshot.fuelType === "Electric"
                                      ? " km/hr charge"
                                      : " km/l"}
                                  </span>
                                </li>
                                <li className="flex justify-between">
                                  <span>Upcoming Service:</span>
                                  <span>
                                    {formatDate(car.snapshot.upcomingService)}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 pt-4 border-t text-gray-500 gap-2">
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              <span>{car.snapshot.address}</span>
                            </div>
                            {(status === "pending") && (
                              <button
                              disabled={bookingCancelLoader}
                                type="button"
                                className="px-4 py-1 text-red-500 hover:bg-red-50 rounded-md text-sm w-fit"
                                style={{ borderRadius: "10px" }}
                                onClick={() => cancelCheck(car.carId)}
                              >
                                {bookingCancelLoader? "loading..." : "cancel"}
                              </button>
                            )}
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

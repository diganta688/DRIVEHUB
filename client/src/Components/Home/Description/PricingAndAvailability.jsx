import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TimeSection from "./TimeSection";

function PricingAndAvailability({ carDetails }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const handlePrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? carDetails.files.length - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setCurrentImage((prev) =>
      prev === carDetails.files.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl p-4 mb-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Pricing & Availability
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {[
              { label: "Base Fare", value: `₹${carDetails.basePrice}` },
              {
                label: "Doorstep Delivery",
                value: `₹${carDetails.doorstepDelivery}`,
              },
              { label: "Insurance", value: carDetails.insurance },
              {
                label: "Security Deposit",
                value: `₹${carDetails.securityDeposit}`,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold text-blue-600">
                ₹
                {carDetails.basePrice +
                  carDetails.doorstepDelivery +
                  carDetails.securityDeposit}
              </span>
            </div>
          </div>
          {carDetails.files.length > 0 ? (
            <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden group">
              <img
                style={{ cursor: "zoom-in" }}
                key={currentImage}
                src={carDetails.files[currentImage]?.img}
                alt={`car-img-${currentImage}`}
                onClick={() => setShowModal(true)}
                className="w-full h-full object-cover rounded-lg transition-all duration-500 ease-in-out scale-100 group-hover:scale-105"
              />
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/30 backdrop-blur-md hover:bg-white/50 text-gray-800 hover:text-black border border-white/40 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-105"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={handleNext}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/30 backdrop-blur-md hover:bg-white/50 text-gray-800 hover:text-black border border-white/40 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-105"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <TimeSection carDetails={carDetails} />
          )}
        </div>
      </div>
      {carDetails.files.length > 0 && <TimeSection carDetails={carDetails} />}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white/80 p-3 rounded-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={carDetails.files[currentImage]?.img}
              alt={`zoomed-img-${currentImage}`}
              className="max-w-[90vw] max-h-[80vh] rounded-lg object-contain transition-all duration-300"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PricingAndAvailability;

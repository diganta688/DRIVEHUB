import React from "react";
import { Calendar, MapPin, Clock } from "lucide-react";

function PricingAndAvailability({ carDetails }) {
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
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-medium m-0">Available Locations</p>
                <p className="text-gray-600">
                  {carDetails.availableLocations}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-medium m-0">Usage Limits</p>
                <p className="text-gray-600 m-0">Limit: {carDetails.kmLimit}</p>
                <p className="text-gray-600">
                  Extra charges: {carDetails.extraKmCharge}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PricingAndAvailability;

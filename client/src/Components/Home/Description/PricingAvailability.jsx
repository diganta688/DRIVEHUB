import React from "react";
import { Calendar, MapPin, Clock } from "lucide-react";

const PricingAvailability = ({ carDetails }) => {
  return (
    <div className="bg-white rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-blue-500" />
        Pricing & Availability
      </h2>
      <div className="space-y-2">
        {[{ label: "Base Fare", value: `₹${carDetails.basePrice}` },
          { label: "Doorstep Delivery", value: `₹${carDetails.doorstepDelivery}` },
          { label: "Insurance", value: carDetails.insurance },
          { label: "Security Deposit", value: `₹${carDetails.securityDeposit}` },
        ].map((item, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="pt-4">
        <p className="text-lg font-semibold">Total: ₹{carDetails.basePrice + carDetails.doorstepDelivery + carDetails.securityDeposit}</p>
      </div>
    </div>
  );
};

export default PricingAvailability;

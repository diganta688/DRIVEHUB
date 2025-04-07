import React from 'react';
import { Car } from "lucide-react";

function ConfirmTop({carInfo}) {
    return ( <>
      <div className="px-6 py-6 border-b">
        <div className="flex items-center gap-4 mb-4">
          <Car className="h-6 w-6 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            {carInfo?.name}
          </h2>
        </div>
        <img
          src={carInfo?.image}
          alt="Car image"
          className="w-full h-48 object-cover rounded-lg"
        />
      </div></> );
}

export default ConfirmTop;
import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

function PickupINFO({ carInfo, homeDelivery, distanceHome }) {
  return (
    <>
      <div className="px-6 py-4 border-b">
        <div className="space-y-4">
          <div>
            <h3 className="flex items-center gap-2 text-gray-600 font-medium mb-2">
              <MapPin className="h-5 w-5" /> Pickup Location
            </h3>
            {homeDelivery ? (
              <p className="text-gray-800">{`Home Delivery (${distanceHome} km)`}</p>
            ) : carInfo && carInfo.availableLocations ? (
              <p className="text-gray-800 px-3">
                {carInfo.availableLocations} (from store)
              </p>
            ) : (
              <p style={{ color: "red" }} className="px-3">
                fetching issue
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="flex items-center gap-2 text-gray-600 font-medium mb-2">
                <Calendar className="h-5 w-5" /> Pickup
              </h3>
              <p className="text-gray-800">
                {carInfo?.StartDate || "fetching issue"}
              </p>
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4" />{" "}
                {carInfo?.StartTime || "fetching issue"}
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-gray-600 font-medium mb-2">
                <Calendar className="h-5 w-5" /> Return
              </h3>
              <p className="text-gray-800">
                {carInfo?.EndDate || "fetching issue"}
              </p>
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4" />{" "}
                {carInfo?.EndTime || "fetching issue"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PickupINFO;

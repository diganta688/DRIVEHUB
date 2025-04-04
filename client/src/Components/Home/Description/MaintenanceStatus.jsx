import React from 'react';
import {
    Car,
    Calendar,
    Info,
    MapPin,
    Fuel,
    Settings,
    ArrowRight,
    Clock,
    Users,
    Gauge,
    Battery,
    Shield,
    Star,
    Wrench,
  } from "lucide-react";
function MaintenanceStatus({carDetails}) {
    return ( <><div className="bg-white rounded-xl p-4 mb-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-blue-500" />
          Maintenance Status
        </h2>
        <div className="space-y-3">
          {Object.entries(carDetails.maintenanceStatus).map(
            ([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <span className="text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="font-medium">{value}</span>
              </div>
            )
          )}
        </div>
      </div></> );
}

export default MaintenanceStatus;
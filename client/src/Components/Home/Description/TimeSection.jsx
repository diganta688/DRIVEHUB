import React from 'react';
import { Calendar, MapPin, Clock } from "lucide-react";


function TimeSection({carDetails}) {
    return ( <div className="bg-white rounded-xl p-4 mb-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <div>
              <p className="font-medium m-0">Available Location</p>
              <p className="text-gray-600">{carDetails.availableLocations}</p>
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
          <div className="flex flex-col gap-2 align-items-center w-full md:w-auto justify-center">
            <div
              className="flex flex-wrap items-center justify-between gap-1 bg-white shadow-sm border rounded-lg w-full overflow-hidden p-3"
              style={{ maxHeight: "120px" }}
            >
              <div className="flex flex-col flex-row sm:items-center gap-1 text-gray-600 w-full justify-center py-1 text-xs">
                <div className="text-center sm:text-right">
                  <div className="font-medium text-black truncate">
                    {carDetails.StartDate || "Start Date"}
                  </div>
                  <div>{carDetails.StartTime || "Start Time"}</div>
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <span className="w-10 sm:w-14 h-px bg-gray-400"></span>
                  <span className="text-xs text-gray-500 truncate">
                    Duration
                  </span>
                  <span className="w-10 sm:w-14 h-px bg-gray-400"></span>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-medium text-black truncate">
                    {carDetails.EndDate || "End Date"}
                  </div>
                  <div>{carDetails.EndTime || "End Time"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> );
}

export default TimeSection;
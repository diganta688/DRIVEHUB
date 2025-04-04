import React from "react";
import { Settings } from "lucide-react";

function TechnicalSpecifications({ carDetails }) {
  return (
    <>
      <div className="bg-white rounded-xl p-4 mb-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-500" />
          Technical Specifications
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(carDetails.specifications).map(([key, value]) => (
            <div key={key} className="group">
              <p className="text-gray-500 capitalize m-0">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </p>
              <p className="font-medium group-hover:text-blue-600 transition-colors">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TechnicalSpecifications;

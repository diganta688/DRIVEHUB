import React from "react";
import { ArrowRight, Check, X } from "lucide-react";

function KeyFeatures({ carDetails }) {
  return (
    <>
      <div className="bg-white rounded-xl p-4 mb-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Check className="h-5 w-5 text-blue-500" />
          Safety Features
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {carDetails.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 group">
              {feature.value ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
              <span className="text-gray-600">{feature.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default KeyFeatures;

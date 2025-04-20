import React from "react";
import { Info, ArrowRight } from "lucide-react";

function ImportantInformation() {
  return (
    <>
      <div className="bg-white rounded-xl p-4 mb-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          Important Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Original driving license mandatory",
            "Fuel charges not included",
            "Tolls & parking to be paid by you",
            "Pre-inspection required",
            "Cancellation charges may apply",
            "Extended rental subject to availability",
          ].map((note, index) => (
            <div key={index} className="flex items-center gap-2 group">
              <ArrowRight className="h-4 w-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
              <span className="text-gray-600 text-sm">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ImportantInformation;

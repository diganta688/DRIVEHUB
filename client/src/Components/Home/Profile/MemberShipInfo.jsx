import React from 'react';
import { Pencil, Shield } from "lucide-react";


function MemberShipInfo({}) {
    return ( <><div>
        <div className="flex items-center justify-between mb-4 px-3">
          <h2 className="text-xl font-semibold text-gray-800">
            Membership Status
          </h2>
          <button
            className="ml-2 mx-3 p-2 bg-gray-200 rounded-full border-2 border-white shadow-md hover:shadow-lg transition"
            style={{ borderRadius: "50%" }}
          >
            <Pencil className="w-5 h-5 text-orange-500" />
          </button>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 mx-4">
          <div className="flex items-center mb-4">
            <Shield className="w-5 h-5 text-blue-600 mr-3" />
            <span className="text-gray-800 font-medium">
              Premium Membership
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Current Plan</p>
              <p className="text-gray-800 font-medium">Premium</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Valid Until</p>
              <p className="text-gray-800 font-medium">
                December 31, 2024
              </p>
            </div>
          </div>
        </div>
      </div></> );
}

export default MemberShipInfo;
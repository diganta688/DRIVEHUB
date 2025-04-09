import React from "react";
import { User, Mail, Phone, MapPin, Calendar, Pencil } from "lucide-react";

function PersonalInformation({userProfileInfo}) {
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-4 px-3">
          <h2 className="text-xl font-semibold text-gray-800">
            Personal Information
          </h2>
          <button
            className="ml-2 mx-3 p-2 bg-gray-200 rounded-full border-2 border-white shadow-md hover:shadow-lg transition"
            style={{ borderRadius: "50%" }}
          >
            <Pencil className="w-5 h-5 text-orange-500" />
          </button>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 space-y-4 mx-4">
          {[
            {
              icon: <User className="w-5 h-5 text-blue-600 mr-3" />,
              label: "Full Name",
              value: userProfileInfo?.name,
            },
            {
              icon: <Mail className="w-5 h-5 text-blue-600 mr-3" />,
              label: "Email",
              value: userProfileInfo?.email,
            },
            {
              icon: <Phone className="w-5 h-5 text-blue-600 mr-3" />,
              label: "Phone",
              value: `+91 ${userProfileInfo?.phone}`,
            },
            {
              icon: <MapPin className="w-5 h-5 text-blue-600 mr-3" />,
              label: "Address",
              value: userProfileInfo?.address,
            },
            {
              icon: <Calendar className="w-5 h-5 text-blue-600 mr-3" />,
              label: "Driver's License Expiry",
              value: userProfileInfo?.licenseExpiryDate,
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start">
              {item.icon}
              <div className="mb-3">
                <p className="text-sm text-gray-500 m-0 mx-3">{item.label}</p>
                <p className="text-gray-800 m-0 mx-3">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PersonalInformation;

import React, { useState } from "react";
import {
  FaClipboardList,
  FaMapMarkerAlt,
  FaCogs,
  FaStar,
  FaShieldAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const Sidebar = ({setOpenInCarEdit}) => {
  const [active, setActive] = useState("Basic Info");

  const items = [
    { name: "Basic Info", icon: <FaClipboardList />, to: "BasicInfoForm" },
    { name: "Specifications", icon: <FaCogs />, to: "Specifications" },
    { name: "Features", icon: <FaStar />, to: "Features" },
    { name: "Documents", icon: <FaShieldAlt />, to: "Documents" },
    { name: "Schedule", icon: <FaCalendarAlt />, to: "Schedule" },
  ];

  return (
    <div
      className=" p-4 bg-white shadow rounded"

    >
      <div className="mb-4">
        <p className="text-sm text-gray-600">Overall Progress</p>
        <div className="h-2 bg-gray-200 rounded-full mt-1">
          <div className="h-2 bg-blue-600 rounded-full w-full"></div>
        </div>
        <span className="text-sm text-blue-600 font-medium">100%</span>
      </div>

      {items.map((item) => (
        <div
          key={item.name}
          onClick={() => {
            setActive(item.name);
            setOpenInCarEdit(item.to);
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          }}
          className={`flex items-center justify-between p-2 rounded cursor-pointer ${
            active === item.name ? "bg-blue-100" : "hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </div>
          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <span>100%</span>
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

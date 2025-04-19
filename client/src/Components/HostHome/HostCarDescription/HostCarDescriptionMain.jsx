import React, { use, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import BasicInfoForm from "./BasicInfoForm";
import RatingsReviews from "./RatingsReviews";
import DocumentsForm from "./DocumentsForm";
import FeaturesSection from "./FeaturesSection";
import ScheduleForm from "./ScheduleForm";
import SpecificationsForm from "./SpecificationsForm";
import { useLocation } from "react-router-dom";
import { HostCarEditContext } from "../../../Context/context";
import { checkHost } from "../../../utils/checkHost";

function HostCarDescriptionMain() {
  const location = useLocation();
  const { car } = location.state || {};
  const [openInCarEdit, setOpenInCarEdit] = useState("BasicInfoForm");
  const [isSaving, setIsSaving] = useState(false);
  const [hostCarInfo, setHostCarInfo] = useState(car);
  const [hostForEditCar, setHostForEditCar] = useState(null);
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };
  useEffect(()=>{
    checkHost(setHostForEditCar);
  },[]);

  return (
    <HostCarEditContext.Provider value={{ car, hostCarInfo, setHostCarInfo }}>
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        <div className="w-full lg:w-1/4">
          <div className="sticky top-4">
            <Sidebar setOpenInCarEdit={setOpenInCarEdit} />
          </div>
        </div>
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Edit Car Details
            </h1>
            <div className="flex space-x-4">
              <button
                type="button"
                style={{ borderRadius: "8px", marginRight: "2rem" }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  window.history.back();
                }}
              >
                Back to home page
              </button>
              <button
                type="button"
                style={{ borderRadius: "8px" }}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center ${
                  isSaving ? "opacity-75 cursor-not-allowed" : ""
                }`}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
          <div>
            {openInCarEdit === "BasicInfoForm" && <BasicInfoForm />}
            {openInCarEdit === "Specifications" && <SpecificationsForm />}
            {openInCarEdit === "Features" && <FeaturesSection />}
            {openInCarEdit === "Documents" && <DocumentsForm />}
            {openInCarEdit === "Schedule" && <ScheduleForm />}
          </div>
          <div>
            <RatingsReviews />
          </div>
        </div>
      </div>
    </HostCarEditContext.Provider>
  );
}

export default HostCarDescriptionMain;

import React from "react";
import { Pencil } from "lucide-react";

function PictureSection({ userProfileInfo }) {
  return (
    <>
      <div className="relative">
        <img
          src={`https://ui-avatars.com/api/?name=${userProfileInfo?.name}`}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
        />
        <button
          className="absolute bottom-2 right-0 p-2 bg-gray-200 rounded-full border-2 border-white shadow-md hover:shadow-lg transition"
          style={{ borderRadius: "50%" }}
        >
          <Pencil className="w-4 h-4 text-orange-500" />
        </button>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-6 sm:text-left mx-3">
        <div className="flex items-center justify-center sm:justify-start">
          <h1 className="text-2xl font-semibold text-gray-800">
            {userProfileInfo?.name}
          </h1>
          <button
            className="ml-2 mx-3 p-2 bg-gray-200 rounded-full border-2 border-white shadow-md hover:shadow-lg transition"
            style={{ borderRadius: "50%" }}
          >
            <Pencil className="w-4 h-4 text-orange-500" />
          </button>
        </div>
        {userProfileInfo?.Premium ? (
          <>
            <p className="text-gray-500 text-sm">Premium Member since 2022</p>
          </>
        ) : (
          <>
            <button
              style={{
                marginLeft: "0.5rem",
                borderRadius: "7px",
                padding: "0.3rem 1rem",
                color: "black",
                background: "gold",
                fontWeight: "bold",
                cursor: "pointer",
                WebkitBorderStroke: "0.5px black",
              }}
            >
              Get Premium
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default PictureSection;

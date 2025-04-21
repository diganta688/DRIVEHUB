import React, { useContext } from "react";
import { Star } from "lucide-react";
import UserLocation from "./UserLocation";
import { carDetailsContext } from "../../../Context/context";
import { useNavigate } from "react-router-dom";

function CarImageCard({
  bookButtonRef,
  setFullScreenMapOpen,
  FullScreenMapOpen,
}) {
  const navigate = useNavigate();
  const { carDetails } = useContext(carDetailsContext);
  return (
    <>
      <div className="col-span-12 lg:col-span-4" style={{ padding: "2rem 0" }}>
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="aspect-[4/3] relative group">
            <img
              src={carDetails.image}
              alt={carDetails.name}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
              <h1 className="text-2xl font-bold text-white">
                {carDetails.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white">{carDetails.rating}</span>
                <span className="text-white/70">
                  ({carDetails.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            {Object.entries(carDetails.specifications)
              .slice(0, 4)
              .map(([key, value]) => (
                <div key={key} className="text-sm ">
                  <p className="text-gray-500 capitalize m-0">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="w-full">
          {carDetails.available !== "active" && (
            <p className="m-0 text-sm text-red-500">
              * You can't book this car right now it is not available.
            </p>
          )}

          <button
            disabled={carDetails.available !== "active"}
            onClick={() => {
              if (carDetails.doorstepDelivery === 500) {
                setFullScreenMapOpen((p) => !p);
              } else {
                navigate(
                  `/confirm-booking/${carDetails.id}?startDate=${carDetails.StartDate}&startTime=${carDetails.StartTime}&endDate=${carDetails.EndDate}&endTime=${carDetails.EndTime}`,
                  {
                    state: {
                      display: true,
                      carDetails: carDetails,
                      homeDelivery: false,
                    },
                  }
                );
              }
            }}
            ref={bookButtonRef}
            className={`border w-full mt-2 py-3  ${
              carDetails.available !== "active"
                ? "bg-orange-200 cursor-not-allowed"
                : "bg-orange-500 coursor-pointer"
            }`}
            style={{ borderRadius: "10px", fontWeight: "700", color: "white" }}
          >
            Book Now
          </button>
        </div>
      </div>
      <UserLocation
        FullScreenMapOpen={FullScreenMapOpen}
        setFullScreenMapOpen={setFullScreenMapOpen}
        carDetails={carDetails}
      />
    </>
  );
}

export default CarImageCard;

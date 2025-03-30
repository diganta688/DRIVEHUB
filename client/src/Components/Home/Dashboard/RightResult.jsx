import React from "react";
import { FaGasPump, FaCogs, FaChair } from "react-icons/fa";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
    const navigate = useNavigate();
    return (
    <div className="bg-white border rounded-lg shadow-sm p-4 md:p-5 flex flex-col md:flex-col md:items-center md:justify-between gap-4 ">
      <div className="w-full md:w-40 flex justify-center md:justify-end">
        <img
          src={car.MainImage}
          alt={car.name}
          className="w-32 md:w-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h6 className="text-gray-500">{car.make}</h6>
        <h6 className="font-bold ">{car.model}</h6>
        <div className="flex gap-2 text-gray-500 text-sm items-center">
          <FaGasPump />
          <span>{car.fuelType}</span>
          <FaCogs />
          <span>{car.transmission}</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1023/1023409.png"
            alt=""
            style={{ width: "14px" }}
          />
          <span>{car.seats} Seater</span>
        </div>
        <p className="font-bold text-lg mt-2">₹{car.price}/day</p>
        <p className="text-red-500 text-sm">
          Unlimited kms | Prices exclude fuel cost
        </p>
      </div>

      <div className="w-full md:w-auto flex justify-end md:justify-end">
        <button
        onClick={() => navigate("/car-description")}
          className="flex items-center justify-center gap-2 text-black font-medium py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300 shadow-md"
          style={{
            background: "radial-gradient(at left top, #F9D755, #D36A34)",
          }}
        >
          Book
          <span
            className="text-xl"
            style={{ position: "relative", bottom: "2px" }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </span>
        </button>
      </div>
    </div>
  );
};

const RightResult = ({ cars }) => {
  return (
    <div className="p-4 right-result" style={{ margin: "0 auto" }}>
      {cars.length > 0 ? 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car, index) => (
          <div key={index} className="w-full md:w-auto">
            <CarCard car={car} />
          </div>
        ))}
      </div> : <h3 className="text-xl font-semibold mb-4">
        no car available
      </h3>}
    </div>
  );
};

export default RightResult;

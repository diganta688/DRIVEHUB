import React from "react";
import {
  UserCircle,
  CalendarCheck,
  CarFront,
  Gauge,
  MapPin,
  IndianRupee,
  Fuel,
} from "lucide-react";

const HostProfileMain = () => {
  // Sample data
const carsListed = [
  {
    name: "Hyundai i20",
    brand: "Hyundai",
    city: "Kolkata",
    pricePerDay: 1200,
    fuelType: "Petrol",
    image: "https://source.unsplash.com/featured/?hyundai,car",
    status: "Active",
    listedOn: "2024-03-01",
  },
  {
    name: "Maruti Swift",
    brand: "Maruti",
    city: "Kolkata",
    pricePerDay: 1000,
    fuelType: "Petrol",
    image: "https://source.unsplash.com/featured/?swift,car",
    status: "Rented",
    listedOn: "2024-02-10",
  },
];

  const host = {
    name: "Diganta Chakraborty",
    email: "diganta@echotune.com",
    profileImage: "https://i.pravatar.cc/150?img=6",
    joinDate: "2024-01-15",
    totalCars: 4,
    totalEarnings: 87000,
    location: "Kolkata, India",
    rating: 4.8,
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-6 mb-8">
        <img
          src={host.profileImage}
          alt="Host"
          className="w-20 h-20 rounded-full object-cover shadow"
        />
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <UserCircle className="text-blue-600 w-6 h-6" />
            {host.name}
          </h2>
          <p className="text-gray-600">{host.email}</p>
          <p className="text-gray-600 flex items-center gap-1">
            <CalendarCheck className="w-4 h-4" />
            Host since: {host.joinDate}
          </p>
        </div>
      </div>

      {/* Host Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 border rounded-xl p-4 flex items-center gap-4">
          <CarFront className="text-blue-500 w-6 h-6" />
          <div>
            <p className="text-gray-500 text-sm">Total Cars Listed</p>
            <p className="text-lg font-semibold">{host.totalCars}</p>
          </div>
        </div>

        <div className="bg-gray-50 border rounded-xl p-4 flex items-center gap-4">
          <IndianRupee className="text-green-600 w-6 h-6" />
          <div>
            <p className="text-gray-500 text-sm">Total Earnings</p>
            <p className="text-lg font-semibold">₹{host.totalEarnings.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-gray-50 border rounded-xl p-4 flex items-center gap-4">
          <MapPin className="text-red-500 w-6 h-6" />
          <div>
            <p className="text-gray-500 text-sm">Location</p>
            <p className="text-lg font-semibold">{host.location}</p>
          </div>
        </div>

        <div className="bg-gray-50 border rounded-xl p-4 flex items-center gap-4">
          <Gauge className="text-yellow-500 w-6 h-6" />
          <div>
            <p className="text-gray-500 text-sm">Host Rating</p>
            <p className="text-lg font-semibold">{host.rating} ★</p>
          </div>
        </div>
        
      </div>
      {/* Cars Listed Section */}
<div className="mt-10">
  <h3 className="text-xl font-semibold mb-4">Cars Listed for Rent</h3>
  <div className="space-y-4">
    {carsListed.map((car, index) => (
      <div
        key={index}
        className="bg-white border rounded-xl shadow-sm p-4 flex items-center gap-4"
      >
        <img
          src={car.image}
          alt={car.name}
          className="w-24 h-16 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h4 className="text-lg font-bold">{car.name}</h4>
          <p className="text-sm text-gray-500">{car.brand} • {car.fuelType} • {car.city}</p>
          <p className="text-sm text-gray-500">Listed on: {car.listedOn}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-green-600">₹{car.pricePerDay}/day</p>
          <p
            className={`text-sm font-medium ${
              car.status === "Active"
                ? "text-blue-600"
                : "text-yellow-600"
            }`}
          >
            {car.status}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default HostProfileMain;

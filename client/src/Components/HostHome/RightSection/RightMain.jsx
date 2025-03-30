import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Car, DollarSign, Fuel, Users, Gauge, Loader } from 'lucide-react';

function RightMain({ rightLoad, name }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const carLoad = async () => {
    if (!name || !name._id) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/host/cars/get/${name._id}`,
        {},
        { withCredentials: true }
      );
      setCars(response.data.cars || []);
    } catch (error) {
      console.error("Error found", error);
    }
    setLoading(false);
  }
  useEffect(() => {
    if (name && name._id) {
      carLoad();
    }
  }, [rightLoad, name]);

  return (
    <div className="lg:w-1/2 animate-slide-in" style={{ animationDelay: '0.2s' }}>
      <div className="bg-transparent rounded-lg shadow-md transition-all duration-300 hover:shadow-lg p-3">
        <div className="flex items-center space-x-2 mb-6">
          <Car className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold m-0 mx-2">Your Listed Cars</h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader className="animate-spin h-8 w-8 text-orange-600" />
            <span className="ml-3 text-orange-600 mx-2">Loading cars...</span>
          </div>
        ) : (
          <div className="space-y-6" style={{cursor: "pointer"}}>
            {cars.length === 0 ? (
              <p className="text-center text-gray-500">No cars listed yet</p>
            ) : (
              cars.map((car, index) => (
                <div 
                  key={car.id || index}
                  className="bg-gray-50 rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-100 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-2/3">
                      <img
                        src={car.MainImage}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-38 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-lg font-semibold">{car.make} {car.model} {car.year}</h3>
                      <p className="text-gray-600 mt-1">{car.description}</p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <span>${car.price}/day</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{car.seats} seats</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Fuel className="h-4 w-4 text-gray-500" />
                          <span>{car.fuelType}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Gauge className="h-4 w-4 text-gray-500" />
                          <span>{car.mileage} km</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RightMain;

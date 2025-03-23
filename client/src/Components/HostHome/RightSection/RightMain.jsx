import React from "react";
import { Car, DollarSign, Fuel, Users, Gauge } from 'lucide-react';

function RightMain({cars}) {
  return (
    <>
      <div className="lg:w-1/2 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center space-x-2 mb-6">
                <Car className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold  m-0 mx-2">Your Listed Cars</h2>
              </div>

              <div className="space-y-6">
                {cars.length === 0 ? (
                  <p className="text-center text-gray-500">No cars listed yet</p>
                ) : (
                  cars.map((car, index) => (
                    <div 
                      key={car.id} 
                      className="bg-gray-50 rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-100 animate-slide-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/3">
                          <img
                            src={car.imageUrl}
                            alt={`${car.make} ${car.model}`}
                            className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <h3 className="text-lg font-semibold">{car.make} {car.model} {car.year}</h3>
                          <p className="text-gray-600 mt-1">{car.description}</p>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="flex items-center space-x-2 transition-all duration-200 hover:text-blue-600">
                              <DollarSign className="h-4 w-4 text-gray-500" />
                              <span>${car.price}/day</span>
                            </div>
                            <div className="flex items-center space-x-2 transition-all duration-200 hover:text-blue-600">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>{car.seats} seats</span>
                            </div>
                            <div className="flex items-center space-x-2 transition-all duration-200 hover:text-blue-600">
                              <Fuel className="h-4 w-4 text-gray-500" />
                              <span>{car.fuelType}</span>
                            </div>
                            <div className="flex items-center space-x-2 transition-all duration-200 hover:text-blue-600">
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
            </div>
          </div>
    </>
  );
}

export default RightMain;

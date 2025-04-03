import React from 'react';
import { Users, Fuel, Gauge, Calendar, Star, CarFront, RotateCcw  } from 'lucide-react';
import { Link } from 'react-router-dom';

function CarCard({car}) {
  return (
      <>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-sm w-full">
      <div className="relative h-48">
        <img 
          src={car.MainImage}
          alt="Tesla Model 3"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-full">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">4.9</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{car.make}{car.model}</h2>
          <div className="flex items-center gap-1">
            <CarFront className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-gray-600">{car.year}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">{car.mileage} mi range</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">Available Now</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-3xl font-bold text-orange-600">${car.price}</span>
            <span className="text-gray-600">/day</span>
          </div>
          <Link to={`/car-description/${car._id}`}>
          <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
            Rent Now
          </button></Link>
        </div>
      </div>
    </div>
</>
  );
}

const RightResult = ({ cars, loading, errorMessage, warningMSG }) => {
  return (
    <div className="p-4" style={{ width: "100%", height: "73vh", overflowY: "auto" }}>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin text-orange-600">
            <RotateCcw size={48} />
          </div>
        </div>
      ) : (
        <>
          {errorMessage && (
            <p className="text-l font-semibold mb-4 text-center text-red-600">
              {errorMessage}
            </p>
          )}
          {warningMSG && (
            <p className="text-l font-semibold mb-4 text-center text-yellow-600">
              {warningMSG}
            </p>
          )}
          {cars.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4">
              {cars.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
          ) : (
            <p className="text-xl font-semibold mb-4 text-center text-red-600">
              No car available
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default RightResult;
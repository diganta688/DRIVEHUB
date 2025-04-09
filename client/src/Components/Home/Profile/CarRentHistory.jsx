import React from 'react';

function CarRentHistory() {
    return ( <><div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 px-3">
          Recent Rentals
        </h2>
        <div className="space-y-4 mx-4">
          {[
            {
              car: "Tesla Model 3",
              date: "Mar 1 - Mar 5, 2024",
              status: "Completed",
              image:
                "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=200&h=120&fit=crop",
            },
            {
              car: "BMW X5",
              date: "Feb 15 - Feb 18, 2024",
              status: "Completed",
              image:
                "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&h=120&fit=crop",
            },
          ].map((rental, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center shadow-sm mb-4"
            >
              <img
                src={rental.image}
                alt={rental.car}
                className="w-24 h-16 object-cover rounded"
              />
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">
                  {rental.car}
                </h3>
                <p className="text-sm text-gray-500">{rental.date}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  {rental.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div></> );
}

export default CarRentHistory;
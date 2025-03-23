import React, { useEffect, useState } from 'react';
import { Car, PlusCircle, DollarSign, Fuel, Users, Gauge } from 'lucide-react';
import axios from 'axios';
import HomeHeroNav from '../../LandingPage/HomeHeroNav';

function App() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: 2024,
    price: 0,
    location: '',
    fuelType: '',
    transmission: '',
    seats: 4,
    mileage: 0,
    imageUrl: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      ...formData,
      id: Date.now().toString()
    };
    setCars([...cars, newCar]);
    setFormData({
      make: '',
      model: '',
      year: 2024,
      price: 0,
      location: '',
      fuelType: '',
      transmission: '',
      seats: 4,
      mileage: 0,
      imageUrl: '',
      description: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    check();
  }, []);
  const check = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/host/home`,
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        window.location.href = `${
          import.meta.env.VITE_FRONTEND_URL
        }/host/login`;
      }
    }
}

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeHeroNav
        display={true}
        mainclass="nav-main-list"
        navItemMain="nav-item-main-list"
        navItemUser="nav-items-user-list"
        Home="homee"
        img="\media\Images\logo.png"
        imgClass="nav-logo-list"
        is={true}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <PlusCircle className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold">List Your Car</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Make</label>
                    <input
                      type="text"
                      name="make"
                      value={formData.make}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Model</label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Daily Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Seats</label>
                    <input
                      type="number"
                      name="seats"
                      value={formData.seats}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Transmission</label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Transmission</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mileage (km)</label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Car Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  List Car
                </button>
              </form>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Car className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Your Listed Cars</h2>
              </div>

              <div className="space-y-6">
                {cars.length === 0 ? (
                  <p className="text-center text-gray-500">No cars listed yet</p>
                ) : (
                  cars.map(car => (
                    <div key={car.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/3">
                          <img
                            src={car.imageUrl}
                            alt={`${car.make} ${car.model}`}
                            className="w-full h-48 object-cover rounded-lg"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
import React from "react";
import {
  Car,
  Calendar,
  Info,
  MapPin,
  Fuel,
  Settings,
  ArrowRight,
  Clock,
  Users,
  Gauge,
  Battery,
  Shield,
  Star,
  Wrench,
} from "lucide-react";
import HomeHeroNav from "../../LandingPage/HomeHeroNav";
import "./CarDescription.css";

const carDetails = {
  id: "CAR-2024-001",
  name: "Tesla Model S Plaid",
  image:
    "https://images.unsplash.com/photo-1669739432571-aee1f057c41f?auto=format&fit=crop&q=80&w=1000",
  rating: 4.9,
  reviews: 128,
  basePrice: 2047,
  doorstepDelivery: 500,
  securityDeposit: 2000,
  insurance: "Included",
  kmLimit: "264 kms",
  extraKmCharge: "₹5/km",
  specifications: {
    seating: "5 Seater",
    transmission: "Automatic",
    fuelType: "Electric",
    range: "396 miles",
    acceleration: "0-60 mph in 1.99s",
    topSpeed: "200 mph",
    peakPower: "1,020 hp",
    chargingTime: "15-45 minutes",
  },
  features: [
    "Autopilot",
    "Premium Audio",
    "Wireless Charging",
    "Glass Roof",
    "Premium Connectivity",
    "Smart Air Suspension",
  ],
  availableLocations: ["Mumbai", "Delhi", "Bangalore"],
  maintenanceStatus: {
    lastService: "2024-02-15",
    nextService: "2024-05-15",
    batteryHealth: "98%",
    tiresCondition: "Excellent",
  },
};

function CarDescription() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
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
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div
            className="col-span-12 lg:col-span-4"
            style={{ padding: "2rem 0" }}
          >
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
                    <div key={key} className="text-sm">
                      <p className="text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div
            className="col-span-12 lg:col-span-8 space-y-6 custom-scrollbar"
            style={{ height: "92vh", overflowY: "auto", padding: "2rem 0" }}
          >
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Pricing & Availability
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {[
                    { label: "Base Fare", value: `₹${carDetails.basePrice}` },
                    {
                      label: "Doorstep Delivery",
                      value: `₹${carDetails.doorstepDelivery}`,
                    },
                    { label: "Insurance", value: carDetails.insurance },
                    {
                      label: "Security Deposit",
                      value: `₹${carDetails.securityDeposit}`,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-blue-600">
                      ₹
                      {carDetails.basePrice +
                        carDetails.doorstepDelivery +
                        carDetails.securityDeposit}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Available Locations</p>
                      <p className="text-gray-600">
                        {carDetails.availableLocations.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Usage Limits</p>
                      <p className="text-gray-600">
                        Limit: {carDetails.kmLimit}
                      </p>
                      <p className="text-gray-600">
                        Extra charges: {carDetails.extraKmCharge}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                Technical Specifications
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(carDetails.specifications).map(
                  ([key, value]) => (
                    <div key={key} className="group">
                      <p className="text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="font-medium group-hover:text-blue-600 transition-colors">
                        {value}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-500" />
                  Key Features
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {carDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 group">
                      <ArrowRight className="h-4 w-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-blue-500" />
                  Maintenance Status
                </h2>
                <div className="space-y-3">
                  {Object.entries(carDetails.maintenanceStatus).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                      >
                        <span className="text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Important Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Original driving license mandatory",
                  "Fuel charges not included",
                  "Tolls & parking to be paid by you",
                  "Pre-inspection required",
                  "Cancellation charges may apply",
                  "Extended rental subject to availability",
                ].map((note, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <ArrowRight className="h-4 w-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                    <span className="text-gray-600 text-sm">{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CarDescription;

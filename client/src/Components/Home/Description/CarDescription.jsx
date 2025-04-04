import React from "react";
import HomeHeroNav from "../../LandingPage/HomeHeroNav";
import "./CarDescription.css";
import PricingAndAvailability from "./PricingAndAvailability";
import TechnicalSpecifications from "./TechnicalSpecifications";
import KeyFeatures from "./KeyFeatures";
import MaintenanceStatus from "./MaintenanceStatus";
import ImportantInformation from "./ImportantInformation";
import CarImageCard from "./CarImageCard";

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
          <CarImageCard carDetails={carDetails} />
          <div
            className="col-span-12 lg:col-span-8 space-y-6 custom-scrollbar"
            style={{ padding: "2rem 0" }}
          >
            <PricingAndAvailability carDetails={carDetails} />
            <TechnicalSpecifications carDetails={carDetails} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <KeyFeatures carDetails={carDetails} />
              <MaintenanceStatus carDetails={carDetails} />
            </div>
            <ImportantInformation carDetails={carDetails} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default CarDescription;

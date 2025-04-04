import React, { useEffect, useState } from "react";
import HomeHeroNav from "../../LandingPage/HomeHeroNav";
import "./CarDescription.css";
import PricingAndAvailability from "./PricingAndAvailability";
import TechnicalSpecifications from "./TechnicalSpecifications";
import KeyFeatures from "./KeyFeatures";
import MaintenanceStatus from "./MaintenanceStatus";
import ImportantInformation from "./ImportantInformation";
import CarImageCard from "./CarImageCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


function CarDescription({ previousURL }) {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);

  const fetchCarDetails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/car/getCarDetails/${id}`);
      const data = res.data;
      console.log(data);
  
      const newCarDetails = {
        id: data._id,
        availableLocations: data.city,
        name: `${data.make} ${data.model}`,
        image: data.MainImage,
        doorstepDelivery: 500,
        insurance: "Included",
        securityDeposit: 2000,
        basePrice: data.price,
        kmLimit: `${data.UsageLimits} kms`,
        extraKmCharge: `${data.ExtraCharges}/km`,
        specifications: {
          seating: `${data.seats} Seater`,
          transmission: data.transmission,
          fuelType: data.fuelType,
          range: `${data.mileage} km`,
          acceleration: `0-60 mph in ${data.Acceleration} s`,
          topSpeed: data.TopSpeed + " km/h",
          peakPower: `${data.PeakPower} hp`,
        },
        features: [],
        maintenanceStatus: {
          lastService: data.lastService,
          nextService: data.upcomingService,
        },
      };
  
      const features = data.features || {};
      console.log(features);
      const featureList = [];
  
      Object.keys(features).forEach((key) => {
        featureList.push({
          name: key,
          value: features[key],
        }); 
      });
  
      newCarDetails.features = featureList;
      setCarDetails(newCarDetails);
      console.log(newCarDetails);
  
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  
  

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  if (!carDetails) return <div>Loading...</div>;

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
      <main className="max-w-7xl mx-auto px-4 py-8 mt-2">
        <Link to={previousURL || "/home"}>
          <ArrowBackIosNewIcon />
        </Link>
        <div className="grid grid-cols-12 gap-6">
          <CarImageCard carDetails={carDetails} />
          <div className="col-span-12 lg:col-span-8 space-y-6 custom-scrollbar" style={{ padding: "2rem 0" }}>
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

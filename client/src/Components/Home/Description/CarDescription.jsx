import React, { useEffect, useState } from "react";
import "./CarDescription.css";
import PricingAndAvailability from "./PricingAndAvailability";
import TechnicalSpecifications from "./TechnicalSpecifications";
import KeyFeatures from "./KeyFeatures";
import MaintenanceStatus from "./MaintenanceStatus";
import ImportantInformation from "./ImportantInformation";
import CarImageCard from "./CarImageCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "../../LoadingScreen";
import { useInView } from "react-intersection-observer";
import HostNav from "../../HostHome/HostNav";
import { useLocation } from "react-router-dom";
import { carDetailsContext } from "../../../Context/context";
import { checkUser } from "../../../utils/checkHost";

function CarDescription() {
  const location = useLocation();
  const navigate = useNavigate();
  const [FullScreenMapOpen, setFullScreenMapOpen] = useState(false);
  const { ref: bookButtonRef, inView } = useInView({
    threshold: 0,
  });
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    checkUser(setUser);
  }, []);
  const fetchCarDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/car/getCarDetails/${id}`,{
          withCredentials: true,
        }
      );
      const data = res.data;
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
        StartTime: data.startTime,
        EndTime: data.endTime,
        StartDate: data.startDate,
        EndDate: data.endDate,
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
        files: [],
        hostLat: data.host.lat,
        hostLng: data.host.lng,
        hostCity: data.host.city,
        hostServiceArea: data.host.serviceArea,
      };
      const features = data.features || {};
      const files = data.files || {};
      const featureList = [];
      const fileList = [];
      Object.keys(features).forEach((key) => {
        featureList.push({
          name: key,
          value: features[key],
        });
      });
      newCarDetails.features = featureList;
      Object.keys(files).forEach((key) => {
        fileList.push({
          id: key,
          img: files[key],
        });
      });
      newCarDetails.files = fileList;
      setCarDetails(newCarDetails);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const [searchParams, setSearchParams] = useState(null);
  useEffect(() => {
    fetchCarDetails();
    setSearchParams(location.state?.fromSearch);
  }, [id]);

  const navigateToHome = () => {
    navigate(searchParams ? `/home${searchParams}` : "/home");
  };
  if (!user) return null;
  if (!carDetails) return <LoadingScreen />;
  return (
    <carDetailsContext.Provider
      value={{
        carDetails,
        setCarDetails,
      }}
    >
      <div className="min-h-screen bg-[#f8fafc]">
        <HostNav who="user" info={user._id}/>
        <main
          className="max-w-7xl mx-auto px-4 py-8 mt-2"
          style={{ paddingBottom: "5rem" }}
        >
          <ArrowBackIosNewIcon onClick={navigateToHome} />

          <div className="grid grid-cols-12 gap-6">
            <CarImageCard
              bookButtonRef={bookButtonRef}
              FullScreenMapOpen={FullScreenMapOpen}
              setFullScreenMapOpen={setFullScreenMapOpen}
            />
            <div
              className="col-span-12 lg:col-span-8 space-y-6 custom-scrollbar"
              style={{ padding: "2rem 0" }}
            >
              <PricingAndAvailability />
              <TechnicalSpecifications carDetails={carDetails} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <KeyFeatures carDetails={carDetails} />
                <MaintenanceStatus carDetails={carDetails} />
              </div>
              <ImportantInformation carDetails={carDetails} />
            </div>
          </div>
        </main>
        {!inView && (
          <div className="fixed bottom-0 left-0 w-full z-50 px-4 pb-4 bg-white shadow-md">
            <button
              className="w-full px-8 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg"
              onClick={() => {
                bookButtonRef?.current?.scrollIntoView({ behavior: "smooth" });
                if (carDetails.doorstepDelivery === 500) {
                  setFullScreenMapOpen((p) => !p);
                } else {
                  navigate(
                    `/confirm-booking/${carDetails.id}?startDate=${carDetails.StartDate}&startTime=${carDetails.StartTime}&endDate=${carDetails.EndDate}&endTime=${carDetails.EndTime}`,
                    {
                      state: {
                        display: true,
                        carDetails: carDetails,
                        homeDelivery: false,
                      },
                    }
                  );
                }
              }}
              style={{ borderRadius: "10px", fontWeight: "700" }}
            >
              Book Now
            </button>
          </div>
        )}
      </div>
    </carDetailsContext.Provider>
  );
}

export default CarDescription;

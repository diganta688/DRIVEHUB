import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftMain from "./LeftSection/LeftMain";
import RightMain from "./RightSection/RightMain";
import { HostMainContext } from "../../Context/context";
import HostInfo from "./HostInfo";
import HostNav from "./HostNav";
import { toast } from "react-toastify";
import { checkHost } from '../../utils/checkHost';
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [optionalImagePreviews, setOptionalImagePreviews] = useState([]);
  const [rightLoad, setRightLoad] = useState(false);
  const [name, setName] = useState(null);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: 2025,
    price: 10,
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    fuelType: "",
    transmission: "",
    segment: "",
    seats: 4,
    mileage: 3,
    MainImage: "",
    description: "",
    files: [],
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    rcBook: "",
    insuranceDocument: "",
    pollutionCertificate: "",
    UsageLimits: 0,
    ExtraCharges: 0,
    Acceleration: 1,
    TopSpeed: 100,
    PeakPower: 1,
    color: "",
    upcomingService: null,
    lastService: null,
    features: {
      airbags: false,
      abs: false,
      Bluetooth: false,
      GPS: false,
      sunRoof: false,
      crouseControl: false,
      parkingSensors: false,
      blindSpotMonitoring: false,
    },
    tiresCondition: "",
  });
  const [inputError, setInputError] = useState({
    make: false,
    model: false,
    mileage: false,
    year: false,
    price: false,
    seats: false,
    fuelType: false,
    transmission: false,
    MainImage: false,
    description: false,
    startDate: false,
    startTime: false,
    endDate: false,
    endTime: false,
    rcBook: false,
    insuranceDocument: false,
    pollutionCertificate: false,
    UsageLimits: false,
    ExtraCharges: false,
    segment: false,
    Acceleration: false,
    TopSpeed: false,
    PeakPower: false,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const errors = { ...inputError };
    const currentYear = new Date().getFullYear();
    if (name === "price") {
      errors.price = value < 100 ? "Price cannot be less than 10" : "";
    } else if (name === "year") {
      errors.year =
        value > currentYear
          ? `Year cannot be greater than ${currentYear}`
          : value < 1886
          ? "Year cannot be less than 1886"
          : "";
    } else if (name === "seats") {
      const allowedSeats = [2, 4, 5, 6, 7, 8, 9, 10];
      errors.seats = allowedSeats.includes(Number(value))
        ? ""
        : "Seats must be one of the following: 2, 4, 5, 6, 7, 8, 9, 10";
    } else if (name === "mileage") {
      errors.mileage = value < 1 ? "Mileage cannot be less than 1" : "";
    } else if (name === "make") {
      errors.make = value.trim() === "" ? "make is required" : "";
    } else if (name === "model") {
      errors.model = value.trim() === "" ? "Model is required" : "";
    } else if (name === "fuelType") {
      errors.fuelType = value.trim() === "" ? "Fuel type is required" : "";
    } else if (name === "transmission") {
      errors.transmission =
        value.trim() === "" ? "Transmission is required" : "";
    } else if (name === "MainImage") {
      errors.MainImage = value.trim() === "" ? "Image URL is required" : "";
    } else if (name === "description") {
      errors.description = value.trim() === "" ? "Description is required" : "";
    } else if (name === "UsageLimits") {
      errors.UsageLimits = value.trim() === "" ? "UsageLimits is required" : "";
    } else if (name === "ExtraCharges") {
      errors.ExtraCharges =
        value.trim() === "" ? "ExtraCharges is required" : "";
    } else if (name === "segment") {
      errors.segment = value.trim() === "" ? "Segment is required" : "";
    } else if (name === "Acceleration") {
      errors.Acceleration =
        value <= 0 ? "value should be greater than 0sec" : "";
    } else if (name === "TopSpeed") {
      errors.TopSpeed =
        value < 100 ? "value should be greater than 100km/h" : "";
    } else if (name === "PeakPower") {
      errors.PeakPower = value < 100 ? "value should be greater than 100" : "";
    } else if (name === "color") {
      errors.color = value.trim() === "" ? "color is required" : "";
    }
    setInputError(errors);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
   checkHost(setName, setFormData, navigate);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "MainImage" && key !== "files") {
        data.append(key, formData[key]);
      }
    });
    Object.keys(formData.features).forEach((featureKey) => {
      const value = formData.features[featureKey];
      data.append(`features[${featureKey}]`, value ? "true" : "false");
    });
    
    if (formData.MainImage && formData.MainImage instanceof File) {
      data.append("MainImage", formData.MainImage);
    }
    if (formData.files && formData.files.length > 0) {
      formData.files.forEach((file) => {
        if (file instanceof File) data.append("files", file);
      });
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/host/cars/upload/${name._id}`,
        data,
        {
          withCredentials: true,
        }
      );
      toast.success("Car uploaded successfully!");
      setOptionalImagePreviews([]);
      setMainImagePreview(null);
      setIsLoading(false);
      setRightLoad((prev) => !prev);
      setFormData({
        make: "",
        model: "",
        year: 2025,
        price: 10,
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        fuelType: "",
        transmission: "",
        seats: 4,
        mileage: 3,
        MainImage: "",
        description: "",
        files: [],
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        rcBook: "",
        insuranceDocument: "",
        pollutionCertificate: "",
        UsageLimits: 0,
        ExtraCharges: 0,
        Acceleration: 1,
        TopSpeed: 100,
        PeakPower: 1,
        segment: "",
        color: "",
        upcomingService: null,
        lastService: null,
        features: {
          airbags: false,
          abs: false,
          Bluetooth: false,
          GPS: false,
          sunRoof: false,
          crouseControl: false,
          parkingSensors: false,
          blindSpotMonitoring: false,
        },
        tiresCondition: "",
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.error || "Failed to upload car");
    }
  };

  
  if(!name) return null;
  
  return (
    <HostMainContext.Provider
      value={{
        formData,
        handleInputChange,
        setFormData,
        inputError,
        setInputError,
        optionalImagePreviews,
        setOptionalImagePreviews,
        setMainImagePreview,
        mainImagePreview,
      }}
    >
      <div className="h-screen bg-gray-50 moving-gradient ">
        <HostNav who="host" info ={name._id}/>
        <div
          className="p-5"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <HostInfo
            text={`Hello, ${name?.name}\nWelcome back!`}
            className="text-5xl font-serif font-extrabold text-gray-700"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>
        <div
          className="container mx-auto px-4 py-8"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <LeftMain
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              name={name}
            />
            <RightMain rightLoad={rightLoad} name={name} />
          </div>
        </div>
      </div>
    </HostMainContext.Provider>
  );
}

export default App;

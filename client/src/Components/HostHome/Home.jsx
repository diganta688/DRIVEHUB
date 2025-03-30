import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftMain from "./LeftSection/LeftMain";
import RightMain from "./RightSection/RightMain";
import { HostMainContext } from "../../Context/context";
import HostInfo from "./HostInfo";
import HostNav from "./HostNav";
import { toast } from "react-toastify";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewDisplay, setIsPreviewDisplay] = useState(true);
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
    seats: 4,
    mileage: 3,
    MainImage: "",
    description: "",
    files: [],
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
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const errors = { ...inputError };
    const currentYear = new Date().getFullYear();
    if (name === "price") {
      errors.price = value < 10 ? "Price cannot be less than 10" : "";
    } else if (name === "year") {
      errors.year =
        value > currentYear ? `Year cannot be greater than ${currentYear}` : "";
    } else if (name === "seats") {
      errors.seats =
        value > 7
          ? "Seats cannot be more than 7"
          : value < 1
          ? "Seats cannot be less than 1"
          : "";
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
    }
    setInputError(errors);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
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
      const host = response.data.host;
      setName(host);
      setFormData((prev) => ({
        ...prev,
        address: host.address,
        city: host.city,
        state: host.state,
        zipCode: host.zipCode,
        country: host.country,
      }));
    } catch (error) {
      if (error.response?.status === 401) {
        window.location.href = `${
          import.meta.env.VITE_FRONTEND_URL
        }/host/login`;
      }
    }
  };
  useEffect(() => {
    check();
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
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Car uploaded successfully!");
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
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.error || "Failed to upload car");
    }
  };
  return (
    <HostMainContext.Provider
      value={{
        formData,
        handleInputChange,
        setFormData,
        inputError,
      }}
    >
      <div className="min-h-screen bg-gray-50 pb-3 moving-gradient">
        <HostNav />
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
              isPreviewDisplay={isPreviewDisplay}
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

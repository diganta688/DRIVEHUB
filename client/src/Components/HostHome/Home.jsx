import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftMain from "./LeftSection/LeftMain";
import RightMain from "./RightSection/RightMain";
import { HostMainContext } from "../../Context/context";
import HostInfo from "./HostInfo";
import HostNav from "./HostNav";
import { toast } from "react-toastify";
import "./Home.css"; 

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewDisplay , setIsPreviewDisplay] = useState(true);
  const [cars, setCars] = useState([]);
  const [name, setName] = useState(null);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: 2024,
    price: 0,
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    fuelType: "",
    transmission: "",
    seats: 4,
    mileage: 0,
    imageUrl: "",
    description: "",
    files: [], // Add this line to store files
});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
Object.keys(formData).forEach(key => {
  if (key === "files") {
    formData.files.forEach(file => data.append("files", file));
  } else {
    data.append(key, formData[key]);
  }
});

try {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/host/cars/upload`, 
    data, 
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );
  toast.success("Car uploaded successfully!");
  setIsLoading(false);
  setFormData({
    make: "",
        model: "",
        year: 2024,
        price: 0,
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        fuelType: "",
        transmission: "",
        seats: 4,
        mileage: 0,
        imageUrl: "",
        description: "",
        files: [],
      });
      setIsPreviewDisplay(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to upload car", error);
      toast.error("Failed to upload car.");
    }
  };


  return (
    <HostMainContext.Provider value={{ formData, handleInputChange, setFormData }}>
      <div className="min-h-screen bg-gray-50 pb-3 moving-gradient" >
        <HostNav/>
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

        <div className="container mx-auto px-4 py-8" style={{backgroundColor:"rgba(255, 255, 255, 0.8)"}}>
          <div className="flex flex-col lg:flex-row gap-8">
            <LeftMain handleSubmit={handleSubmit} isLoading={isLoading} isPreviewDisplay={isPreviewDisplay}/>
            <RightMain cars={cars} />
          </div>
        </div>
      </div>
    </HostMainContext.Provider>
  );
}

export default App;

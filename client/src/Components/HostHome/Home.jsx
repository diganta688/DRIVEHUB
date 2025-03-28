import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftMain from "./LeftSection/LeftMain";
import RightMain from "./RightSection/RightMain";
import { HostMainContext } from "../../Context/context";
import HostInfo from "./HostInfo";
import HostNav from "./HostNav";

function App() {
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
  });

  const handleSubmit = (e) => {
    // e.preventDefault();
    // const newCar = {
    //   ...formData,
    //   id: Date.now().toString(),
    // };
    // setCars([...cars, newCar]);
    // setFormData({
    //   make: "",
    //   model: "",
    //   year: 2024,
    //   price: 0,
    //   address: "",
    //   city: "",
    //   state: "",
    //   zipCode: "",
    //   country: "",      fuelType: "",
    //   transmission: "",
    //   seats: 4,
    //   mileage: 0,
    //   imageUrl: "",
    //   description: "",
    // });
    
  };

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

  return (
    <HostMainContext.Provider value={{ formData, handleInputChange, setFormData }}>
      <div className="min-h-screen bg-gray-50">
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

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <LeftMain handleSubmit={handleSubmit} />
            <RightMain cars={cars} />
          </div>
        </div>
      </div>
    </HostMainContext.Provider>
  );
}

export default App;

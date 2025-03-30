import React, { useEffect, useState } from "react";
import HomeSearch from "./Search/HomeSearch";
import HomeTop from "./HomeTop";
import Dashboard from "./Dashboard/Dashboard";
import axios from "axios";

function Homee() {
    const [cars, setCars] = useState([]);
  useEffect(() => {
    check();
  }, []);
  const fetchCars = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/car/getAllCars`);
      if (res.status === 200) {
        setCars(res.data);
      } else {
        console.error("Failed to fetch cars. Status:", res.status);
      }
    } catch (error) {
      console.error("Error fetching cars:", error.message);
    }
  };
  const check = async () => {
    fetchCars();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/home`,
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
        }/log-in`;
      }
    }
  }
  return (
    <div className="">
      <HomeTop />
      <HomeSearch />
      <Dashboard cars={cars} setCars={setCars}/>
    </div>
  );
}

export default Homee;

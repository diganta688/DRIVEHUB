import React, { useEffect, useState } from "react";
import HomeSearch from "./Search/HomeSearch";
import Dashboard from "./Dashboard/Dashboard";
import axios from "axios";
import { UserHomeContext } from "../../Context/context";
import HomeHeroNav from "../LandingPage/HomeHeroNav";

function Homee() {
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    segment: [],
    make: [],
    fuelType: [],
    transmission: [],
    seats: [],
  });
  useEffect(() => {
    check();
  }, []);
  const fetchCars = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/car/getAllCars`
      );
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
      setUser(response.data.user);
    } catch (error) {
      if (error.response?.status === 401) {
        window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/log-in`;
      }
    }
  };
  return (
    <UserHomeContext.Provider
      value={{
        user,
        setUser,
        cars,
        setCars,
        selectedFilters,
        setSelectedFilters,
      }}
    >
      <div className="">
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
        <HomeSearch />
        <Dashboard />
      </div>
    </UserHomeContext.Provider>
  );
}

export default Homee;

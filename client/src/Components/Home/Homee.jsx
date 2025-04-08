import React, { useEffect, useState } from "react";
import HomeSearch from "./Search/HomeSearch";
import Dashboard from "./Dashboard/Dashboard";
import axios from "axios";
import { UserHomeContext } from "../../Context/context";
import HomeHeroNav from "../LandingPage/HomeHeroNav";
import BlurText from "./BlueText";
import HostNav from "../HostHome/HostNav";

function Homee() {
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    segment: [],
    make: [],
    fuelType: [],
    transmission: [],
    seats: [],
  });

  useEffect(() => {
    const check = async () => {
      await fetchCars();
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/home`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/log-in`;
        } else {
          console.error("Error fetching user:", error.message);
        }
      }
    };

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

  if (!user) return null;

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
      <div>
        <HostNav who="user" info = {user}/>
        <div className="flex justify-center pt-3">
          {user?.name && (
            <BlurText
              text={`Hey ${user.name}! welcome back`}
              animateBy="words"
              delay={150}
              className="text-2xl mb-8"
            />
          )}
        </div>
        <HomeSearch />
        <Dashboard />
      </div>
    </UserHomeContext.Provider>
  );
}

export default Homee;

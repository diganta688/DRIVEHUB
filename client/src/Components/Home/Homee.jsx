import React, { useEffect, useState } from "react";
import HomeSearch from "./Search/HomeSearch";
import Dashboard from "./Dashboard/Dashboard";
import axios from "axios";
import { UserHomeContext } from "../../Context/context";
import BlurText from "./BlueText";
import HostNav from "../HostHome/HostNav";
import { checkUser } from "../../utils/checkHost";

function Homee() {
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    segment: [],
    make: [],
    fuelType: [],
    transmission: [],
    seats: [],
  });
  const check = async () => {
    setLoading(true);
    await fetchCars();
    await checkUser(setUser);
    setLoading(false);
  };
  

  const fetchCars = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/car/getAllCars`,{
          withCredentials: true,
        }
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
  useEffect(() => {
    check();
  }, []);
  
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

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
        <HostNav who="user" info = {user._id}/>
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

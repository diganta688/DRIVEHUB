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
  const [selectedFilters, setSelectedFilters] = useState({
    segment: [],
    make: [],
    fuelType: [],
    transmission: [],
    seats: [],
  });
  const check = async ()=>{
    await fetchCars();
    checkUser(setUser);
  }

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
  useEffect(() => {
    check();
  }, []);
  
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

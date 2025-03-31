import React, { useEffect, useState } from "react";
import LeftFilter from "./LeftFilter";
import RightResult from "./RightResult";
import { useSearchParams } from "react-router-dom";
import { UserHomeContext } from "../../../Context/context";
import { useContext } from "react";

function Dashboard() {
  const { cars, selectedFilters } = useContext(UserHomeContext);
  const [searchParams] = useSearchParams();
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filterCars = () => {
      let filtered = cars;
      const city = searchParams.get("city");
      const startDate = searchParams.get("startDate");
      const startTime = searchParams.get("startTime");
      const endDate = searchParams.get("endDate");
      const endTime = searchParams.get("endTime");
    
      console.log("city", city);
      console.log("startDate", startDate);
      console.log("startTime", startTime);
      console.log("endDate", endDate);
      console.log("endTime", endTime);
    
      if (city) {
        filtered = filtered.filter(
          (car) => car.city.toLowerCase() === city.toLowerCase()
        );
    
        if (startDate && endDate && startTime && endTime) {
          filtered = filtered.filter((car) => {
            const userStart = new Date(`${startDate}T${startTime}:00`);
            const userEnd = new Date(`${endDate}T${endTime}:00`);
    
            const carStart = new Date(`${car.startDate}T${car.startTime}:00`);
            const carEnd = new Date(`${car.endDate}T${car.endTime}:00`);
    
            const isDateTimeRangeValid =
              userStart >= carStart && userEnd <= carEnd;
    
            console.log("isDateTimeRangeValid", isDateTimeRangeValid);
            
            return isDateTimeRangeValid;
          });
        }
      }
    
      // Apply other filters
      Object.keys(selectedFilters).forEach((key) => {
        if (selectedFilters[key].length > 0) {
          if (key === "seats") {
            filtered = filtered.filter((car) =>
              selectedFilters[key].includes(String(car[key]))
            );
          } else {
            filtered = filtered.filter((car) =>
              selectedFilters[key].some(
                (filterValue) =>
                  car[key].toLowerCase() === filterValue.toLowerCase()
              )
            );
          }
        }
      });
    
      setFilteredCars(filtered);
    };
    
    setLoading(true);
    filterCars();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedFilters, cars, searchParams]);

  return (
    <div className="flex flex-row pt-5" style={{ maxWidth: "2000px", margin: "0 auto" }}>
      <LeftFilter />
      <RightResult cars={filteredCars} loading={loading} />
    </div>
  );
}

export default Dashboard;

import React, { useEffect, useState, useContext } from "react";
import LeftFilter from "./LeftFilter";
import RightResult from "./RightResult";
import { useSearchParams, useNavigate } from "react-router-dom";
import { UserHomeContext } from "../../../Context/context";

function Dashboard() {
  const { cars, selectedFilters } = useContext(UserHomeContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMSG, setWarningMSG] = useState("");

  useEffect(() => {
    const filterCars = () => {
      let filtered = cars;
      const city = searchParams.get("city");
      const startDate = searchParams.get("startDate");
      const startTime = searchParams.get("startTime");
      const endDate = searchParams.get("endDate");
      const endTime = searchParams.get("endTime");
      if (!city) {
        setFilteredCars([]);
        setErrorMessage("City is required to filter cars.");
        setLoading(false);
        return;
      }
      setErrorMessage("");
      filtered = filtered.filter(
        (car) => car.city.toLowerCase() === city.toLowerCase()
      );
      if (startDate && endDate && startTime && endTime) {
        const userStart = new Date(`${startDate}T${startTime}:00`);
        const userEnd = new Date(`${endDate}T${endTime}:00`);
        const validCars = filtered.filter((car) => {
          const carStart = new Date(`${car.startDate}T${car.startTime}:00`);
          const carEnd = new Date(`${car.endDate}T${car.endTime}:00`);
          return userStart >= carStart && userEnd <= carEnd;
        });
        if (validCars.length === 0) {
          setWarningMSG(
            "These are the cars are available in the city, but the time range doesn't match."
          );
        } else {
          setWarningMSG("");
          filtered = validCars;
        }
      } else {
        setWarningMSG("");
      }
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
  }, [selectedFilters, cars, searchParams, navigate]);

  return (
    <div
      className="flex flex-row pt-5"
      style={{ maxWidth: "2000px", margin: "0 auto" }}
    >
      <LeftFilter />
      <RightResult
        cars={filteredCars}
        loading={loading}
        errorMessage={errorMessage}
        warningMSG={warningMSG}
      />
    </div>
  );
}

export default Dashboard;

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
      let filtered = [...cars];

      const city = searchParams.get("city");
      const startDate = searchParams.get("startDate");
      const startTime = searchParams.get("startTime");
      const endDate = searchParams.get("endDate");
      const endTime = searchParams.get("endTime");
      const dateTimeFields = [startDate, startTime, endDate, endTime];
      const isAnyFieldProvided = dateTimeFields.some(Boolean);
      const isAllFieldsProvided = dateTimeFields.every(Boolean);
      if (isAnyFieldProvided && !isAllFieldsProvided) {
        setFilteredCars([]);
        setErrorMessage(
          "All date and time fields are required if one is provided."
        );
        setWarningMSG("");
        setLoading(false);
        return;
      }
      setErrorMessage("");
      if (city) {
        filtered = filtered.filter(
          (car) => car.city.toLowerCase() === city.toLowerCase()
        );
      }
      if (isAllFieldsProvided) {
        const userStart = new Date(`${startDate}T${startTime}:00`);
        const userEnd = new Date(`${endDate}T${endTime}:00`);

        const validCars = filtered.filter((car) => {
          const carStart = new Date(`${car.startDate}T${car.startTime}:00`);
          const carEnd = new Date(`${car.endDate}T${car.endTime}:00`);
          return userStart >= carStart && userEnd <= carEnd;
        });

        if (validCars.length === 0 && city) {
          setWarningMSG(
            "These are the cars available in the city, but the time range doesn't match."
          );
        } else {
          setWarningMSG("");
          filtered = validCars;
        }
      } else {
        setWarningMSG("");
      }
      Object.entries(selectedFilters).forEach(([key, filterValues]) => {
        if (Array.isArray(filterValues) && filterValues.length > 0) {
          filtered = filtered.filter((car) => {
            const carValue = car[key];

            if (carValue === undefined || carValue === null) return false;

            if (key === "seats") {
              return filterValues.includes(String(carValue));
            }

            return filterValues.some(
              (filterValue) =>
                String(carValue).toLowerCase() ===
                String(filterValue).toLowerCase()
            );
          });
        }
      });

      setFilteredCars(filtered);
      setLoading(false);
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

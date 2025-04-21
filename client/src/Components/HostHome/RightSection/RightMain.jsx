import React, { useState, useEffect } from "react";
import axios from "axios";
import { Car, DollarSign, Fuel, Users, Gauge, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import NotificationDialog from "./NotificationDialog";
import { toast } from "react-toastify";

function RightMain({ rightLoad, name }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [carActivationLoader, setCarActivationLoader] = useState(false);
  const [carActivationLoadingMap, setCarActivationLoadingMap] = useState({});
  const carLoad = async () => {
    if (!name || !name._id) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/host/cars/get/${name._id}`,
        {},
        { withCredentials: true }
      );
      setCars(response.data.cars || []);
    } catch (error) {
      console.error("Error found", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (name && name._id) {
      carLoad();
    }
  }, [rightLoad, name]);

  const availableChange = async (bol, e, carId) => {
    setCarActivationLoadingMap((prev) => ({ ...prev, [carId]: true }));
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/host/cars/activeStatus/${carId}`,
        { status: bol },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setCars((prevCars) =>
          prevCars.map((c) =>
            c._id === carId
              ? {
                  ...c,
                  available: response.data.car.available,
                  availableSituation: response.data.car.availableSituation,
                }
              : c
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Updation failed");
    } finally {
      setCarActivationLoadingMap((prev) => ({ ...prev, [carId]: false }));
    }
  };

  return (
    <div
      className="lg:w-1/2 animate-slide-in"
      style={{ animationDelay: "0.2s", height: "62vh", overflowY: "auto" }}
    >
      <div className="bg-transparent rounded-lg shadow-md transition-all duration-300 hover:shadow-lg p-3">
        <div className="flex justify-end">
          {name.notifications.length > 0 ? (
            <Badge color="secondary" variant="dot">
              <NotificationsIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setNotificationDialogOpen((p) => !p)}
              />
            </Badge>
          ) : (
            <Badge color="secondary" badgeContent={0} showZero>
              <NotificationsIcon sx={{ cursor: "pointer" }} />
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2 mb-6">
          <Car className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold m-0 mx-2">Your Listed Cars</h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader className="animate-spin h-8 w-8 text-orange-600" />
            <span className="ml-3 text-orange-600 mx-2">Loading cars...</span>
          </div>
        ) : (
          <div className="space-y-6" style={{ cursor: "pointer" }}>
            {cars.length === 0 ? (
              <p className="text-center text-gray-500">No cars listed yet</p>
            ) : (
              cars.map((car, index) => (
                <div
                key={car._id}
                  className="bg-gray-50 rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-100 animate-slide-in mb-3"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-2/3">
                      <img
                        src={car.MainImage}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-38 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                        style={{ height: "200px" }}
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-lg font-semibold">
                        {car.make} {car.model} {car.year}{" "}
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            car.availableSituation === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : car.availableSituation === "booked"
                              ? "bg-green-100 text-green-700"
                              : car.availableSituation === "canceled"
                              ? "bg-gray-100 text-gray-700"
                              : car.availableSituation === "conpleted"
                              ? "bg-green-100 text-green-700"
                              : car.availableSituation === "active"
                              ? "bg-green-100 text-green-700"
                              : car.availableSituation === "diactive"
                              ? "bg-gray-100 text-gray-700"
                              : ""
                          }`}
                        >
                          {car.availableSituation}
                        </span>
                      </h3>
                      <p
                        className="text-gray-600 mt-1"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxHeight: "2rem",
                        }}
                      >
                        {car.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <span>${car.price}/day</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{car.seats} seats</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Fuel className="h-4 w-4 text-gray-500" />
                          <span>{car.fuelType}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Gauge className="h-4 w-4 text-gray-500" />
                          <span>{car.mileage} km</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex"
                    style={{
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <div className="">
                      <Link
                        to={`/host/car-description/${car._id}`}
                        state={{ car }}
                      >
                        <p className="m-0 text-blue-500">{`go to car description >`}</p>
                      </Link>
                    </div>
                    <div className="flex" style={{ alignItems: "flex-end" }}>
                      {car.availableSituation === "diactive" ? (
                        <button
                         disabled={carActivationLoadingMap[car._id]}
                          className="border-2 border-green-500 text-green-500 py-2 px-4 rounded-lg"
                          onClick={(e) => availableChange(true, e, car._id)}
                          style={{ borderRadius: "10px" }}
                        >
                          {carActivationLoadingMap[car._id] ? "Loading..." : "Activate"}

                        </button>
                      ) : car.availableSituation === "active" ? (
                        <button
                         disabled={carActivationLoadingMap[car._id]}
                          className="border-2 border-red-500 text-red-500 py-2 px-4 rounded-lg"
                          style={{ borderRadius: "10px" }}
                          onClick={(e) => availableChange(false, e, car._id)}
                        >
                           {carActivationLoadingMap[car._id] ? "Loading..." : "Deactivate"}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {notificationDialogOpen && (
        <NotificationDialog
          notificationDialogOpen={notificationDialogOpen}
          setNotificationDialogOpen={setNotificationDialogOpen}
          host={name}
          cars={cars}
          setCars={setCars}
        />
      )}
    </div>
  );
}

export default RightMain;

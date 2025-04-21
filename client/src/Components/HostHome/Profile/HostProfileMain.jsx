import React, { useEffect, useState } from "react";
import {
  UserCircle,
  CalendarCheck,
  CarFront,
  Gauge,
  MapPin,
  Check,
  IndianRupee,
} from "lucide-react";
import { checkHost } from "../../../utils/checkHost";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import LoadingScreen from "../../LoadingScreen";
import HistoryIcon from "@mui/icons-material/History";
import { Pencil } from "lucide-react";
import { Dialog, Button } from "@mui/material";
import { handlePhotoUpload, handleSubmit } from "../../../utils/submitOperation";
import { useNavigate } from "react-router-dom";


const HostProfileMain = () => {
  const [hostData, setHostData] = useState(null);
  const [hostDataCopy, setHostDataCopy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [open, setOpen] = useState(false);
  const [profilePhotoLoader, setProfilePhotoLoader] = useState(false);
  const [nameEmailChange, setNameEmailChange] = useState(false);
  const [nameSubmitLoader, setNameSubmitLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkHost(
      (data) => {
        setHostData(data || {});
        setHostDataCopy(data);
        setLoading(false);
      },
      "",      
      navigate
    );
  }, []);
  

  const host = {
    name: hostData?.name || "undefined",
    email: hostData?.email || "undefined",
    profileImage: hostData?.profilePhoto || "https://i.pravatar.cc/150?img=6",
    joinDate: hostData?.createdAt
      ? new Date(hostData?.createdAt).toLocaleDateString()
      : "undefined",
    totalCars: hostData?.cars?.length || 0,
    totalEarnings: hostData?.Earnings || 0,
    location: `${hostData?.city || "undefined"}, ${
      hostData?.country || "undefined"
    }`,
    rating: 4.8,
  };

  const carsListed = hostData?.cars.map((car) => ({
    name: `${car.make} ${car.model}`,
    brand: car.make,
    city: car.city,
    pricePerDay: car.price,
    fuelType: car.fuelType,
    image: car.MainImage,
    status: car.availableSituation,
    listedOn: new Date(car.createdAt).toLocaleDateString("en-GB"),
  }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewURL(reader.result);
    if (file) reader.readAsDataURL(file);
  };
  const nameEmailValueChange = (e)=>{
    setHostDataCopy((prev)=>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    })
  } 

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg text-gray-600">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 mb-4">
        <div className="relative">
          <img
            src={host.profileImage}
            alt="Host"
            className="w-32 h-32 rounded-full object-cover shadow-lg"
          />
          <button
            onClick={() => setOpen(true)}
            className="absolute bottom-3 right-2 p-2 bg-gray-200 rounded-full border-2 border-white shadow-md hover:shadow-lg transition"
            style={{
              borderRadius: "50%",
              transform: "translate(25%, 25%)",
            }}
          >
            <Pencil className="w-4 h-4 text-orange-500" />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
            <Tooltip title="Go Back">
              <button
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-black transition"
              >
                <NavigateBeforeIcon fontSize="large" />
              </button>
            </Tooltip>
            <UserCircle className="w-8 h-8 text-blue-600" />
            {nameEmailChange ? (
              <>
                <input type="text" name="name" value={hostDataCopy?.name} style={{border: "2px solid black", borderRadius: "10px", width: "100%"}}onChange={(e)=>nameEmailValueChange(e)} />
              </>
            ) : (
              hostData?.name
            )}
            {nameEmailChange? <button
              onClick={() => handleSubmit( setNameSubmitLoader, setHostData, hostDataCopy, setNameEmailChange, "host", hostData?._id)}
              className="relative bottom-2 p-2 bg-gray-200 rounded-full border-2 border-white shadow-md hover:shadow-lg transition"
              style={{
                borderRadius: "50%",
                transform: "translate(25%, 25%)",
              }}
            >
              <Check className="w-5 h-5" />
            </button> : <button
              onClick={() => setNameEmailChange(true)}
              className="relative bottom-2 p-2 bg-gray-200 rounded-full border-2 border-white shadow-md hover:shadow-lg transition"
              style={{
                borderRadius: "50%",
                transform: "translate(25%, 25%)",
              }}
            >
              <Pencil className="w-4 h-4 text-orange-500" />
            </button>}
          </h2>
            <p className="text-lg text-gray-700">{host.email}</p>

          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <CalendarCheck className="w-4 h-4 text-gray-500" />
            Host since: {host.joinDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {[
          {
            icon: <CarFront className="text-blue-500 w-6 h-6" />,
            label: "Total Cars Listed",
            value: host.totalCars,
          },
          {
            icon: <IndianRupee className="text-green-600 w-6 h-6" />,
            label: "Total Earnings",
            value: `₹${host.totalEarnings.toLocaleString()}`,
          },
          {
            icon: <MapPin className="text-red-500 w-6 h-6" />,
            label: "Location",
            value: host.location,
          },
          {
            icon: <Gauge className="text-yellow-500 w-6 h-6" />,
            label: "Host Rating",
            value: `${host.rating} ★`,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-gray-50 border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition"
            whileHover={{ scale: 1.05 }}
          >
            {item.icon}
            <div>
              <p className="text-sm text-gray-600">{item.label}</p>
              <p className="text-lg font-semibold text-gray-800">
                {item.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Cars Listed for Rent
        </h3>
        <div className="space-y-6">
          {carsListed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-600">
              <HistoryIcon sx={{ fontSize: 48, marginBottom: "0.5rem" }} />
              <p className="text-lg font-medium">No cars listed</p>
            </div>
          ) : (
            <div className="grid ">
              {carsListed.map((car, index) => (
                <motion.div
                  key={index}
                  className="bg-white border rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center sm:items-start hover:shadow-md transition mb-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full sm:w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-lg font-bold text-gray-800">
                      {car.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {car.brand} • {car.fuelType} • {car.city}
                    </p>
                    <p className="text-sm text-gray-500">
                      Listed on: {car.listedOn}
                    </p>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="font-semibold text-green-600">
                      ₹{car.pricePerDay}/day
                    </p>
                    <p
                      className={`text-sm font-medium mt-2 ${
                        car.status === "active"
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {car.status}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="p-5 space-y-4">
          <h3 className="text-xl font-semibold">Update Profile Photo</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {previewURL && (
            <div className="flex justify-center mt-4">
              <img
                src={previewURL}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full border"
              />
            </div>
          )}
          <div className="flex justify-end gap-4 mt-4">
            <Button
              onClick={() => {
                setOpen(false);
                setSelectedFile(null);
                setPreviewURL("");
              }}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handlePhotoUpload(
                  selectedFile,
                  hostData._id,
                  setProfilePhotoLoader,
                  setHostData,
                  setOpen,
                  setPreviewURL,
                  "host"
                );
              }}
              color="primary"
              disabled={profilePhotoLoader}
            >
              {profilePhotoLoader ? "Loading..." : "Update"}
            </Button>
          </div>
        </div>
      </Dialog>
    </motion.div>
  );
};

export default HostProfileMain;

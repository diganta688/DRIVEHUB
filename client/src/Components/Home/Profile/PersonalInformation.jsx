import React, { useContext, useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Pencil,
  Check,
} from "lucide-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { UserProfileContext } from "../../../Context/context";
import { toast } from "react-toastify";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { handleProfileInfoUpload } from "../../../utils/submitOperation";

function PersonalInformation({
  profileInfoOpen,
  setProfileInfoOpen,
  setEmailValidOpen,
  emailValidOpen,
}) {
  const accessToken = import.meta.env.VITE_MAP_TOKEN;
  const onetimepass = useRef(0);

  const {
    userProfileInfo,
    setUserProfileInfo,
    userProfileAllInfo,
    setUserProfileAllInfo,
  } = useContext(UserProfileContext);
  const defaultCoordinates = { lat: 22.5726, lng: 88.3639 };
  const [coordinates, setCoordinates] = useState(defaultCoordinates);
  const [suggestions, setSuggestions] = useState([]);
  const mapContainerRef = useRef(null);
  const [otp, setOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const findlocation = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${accessToken}&autocomplete=true&limit=5`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setOtp(value);
    }
  };
  const handleInputChange = (field, value) => {
    setUserProfileAllInfo({ ...userProfileAllInfo, [field]: value });
  };

  const handleSaveAll = async () => {
    const updatedFields = {
      name: userProfileAllInfo.name,
      email: userProfileAllInfo.email,
      phone: userProfileAllInfo.phone,
      licenseExpiryDate: userProfileAllInfo.licenseExpiryDate,
      address: userProfileAllInfo.address,
      city: userProfileAllInfo.city,
      state: userProfileAllInfo.state,
      zipCode: userProfileAllInfo.zipCode,
      country: userProfileAllInfo.country,
      lat: coordinates.lat,
      lng: coordinates.lng,
    };

    const emailChanged = userProfileInfo.email !== userProfileAllInfo.email;

    try {
      setIsSaving(true);
      if (emailChanged) {
        setEmailValidOpen(true);
        await OtpSend();
      } else {
        await updateProcess(updatedFields);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Something went wrong while saving.");
    } finally {
      setIsSaving(false);
    }
  };
  const OtpSend = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/validate/user/email`,
        { email: userProfileAllInfo.email, phone: userProfileAllInfo.phone },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        onetimepass.current = res.data.otp;
      }
    } catch (error) {
      console.error("Error in OtpSend:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };
  const verifyotp = async () => {
    setLoading(true);
    if (parseInt(otp) === onetimepass.current) {
      toast.success("Verified");
      setIsSaving(true);
      await updateProcess({
        ...userProfileAllInfo,
        lat: coordinates.lat,
        lng: coordinates.lng,
      });
      setIsSaving(false);
      setEmailValidOpen(false);
      setOtp("");
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Wrong OTP");
    }
  };

  const updateProcess = async (updatedFields) => {
    try {
      const res = await handleProfileInfoUpload(
        updatedFields,
        "user",
        userProfileInfo._id
      );
      if (res && res.success) {
        setUserProfileInfo((prev) => ({
          ...prev,
          ...updatedFields,
        }));
        setProfileInfoOpen(false);
      } else {
        toast.error(res?.message || "Failed to update profile info.");
      }
    } catch (error) {
      console.error("Failed to update info:", error);
      toast.error("Something went wrong.");
    }
  };

  const select = (field, value) => {
    setUserProfileAllInfo((p) => ({
      ...p,
      [field]: value,
    }));
  };
  const handlePlaceSelect = (place) => {
    console.log(place.geometry.coordinates);
    setCoordinates((p) => ({
      ...p,
      lat: place.geometry.coordinates[1],
      lng: place.geometry.coordinates[0],
    }));
    select("address", place.place_name);
    const context = place.context || [];
    const getField = (type) =>
      context.find((c) => c.id.includes(type))?.text || "";
    select("city", getField("place"));
    select("state", getField("region"));
    select("country", getField("country"));
    select("zipCode", getField("postcode"));
    setSuggestions([]);
  };
  useEffect(() => {
    if (
      !profileInfoOpen ||
      !mapContainerRef.current ||
      !coordinates?.lat ||
      !coordinates?.lng
    )
      return;
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [coordinates.lng, coordinates.lat],
      zoom: 15,
    });
    const marker = new mapboxgl.Marker()
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(map);
    let holdTimeout;
    let isDragging = false;
    const onMouseDown = (e) => {
      isDragging = false;
      const onMouseMove = () => {
        isDragging = true;
      };
      const onTouchMove = () => {
        isDragging = true;
      };
      const onEnd = async (e) => {
        if (isDragging) return;
        const { lng, lat } = e.lngLat || e.touches[0].lngLat;
        marker.setLngLat([lng, lat]);
        setCoordinates({ lng, lat });
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          const place = data.features[0];
          if (place) {
            const placeName = place.place_name;
            const context = place.context || [];
            let city = "",
              state = "",
              zipCode = "",
              country = "";
            context.forEach((item) => {
              if (item.id.includes("place")) city = item.text;
              else if (item.id.includes("region")) state = item.text;
              else if (item.id.includes("postcode")) zipCode = item.text;
              else if (item.id.includes("country")) country = item.text;
            });
            setUserProfileAllInfo((prev) => ({
              ...prev,
              address: placeName,
              city,
              state,
              zipCode,
              country,
              lat,
              lng,
            }));
          }
        } catch (err) {
          console.error("Reverse geocoding failed", err);
        }
      };
      map.on("mousemove", onMouseMove);
      map.on("touchmove", onTouchMove);
      holdTimeout = setTimeout(() => {
        if (isDragging) return;
        onEnd(e);
      }, 1000);
      map.once("mouseup", () => {
        clearTimeout(holdTimeout);
        map.off("mousemove", onMouseMove);
      });
      map.once("touchend", () => {
        clearTimeout(holdTimeout);
        map.off("touchmove", onTouchMove);
      });
    };
    map.on("mousedown", onMouseDown);
    map.on("touchstart", onMouseDown);
    return () => {
      map.remove();
    };
  }, [coordinates, accessToken, profileInfoOpen]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Personal Information
        </h2>
        {profileInfoOpen ? (
          <button
            disabled={isSaving}
            className={`ml-2 mx-3 p-2 ${
              isSaving
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:shadow-lg"
            } text-white rounded-full border-2 border-white shadow-md transition`}
            onClick={handleSaveAll}
            style={{ borderRadius: "50%" }}
          >
            {isSaving ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              <Check className="w-5 h-5" />
            )}
          </button>
        ) : (
          <button
            className="ml-2 mx-3 p-2 bg-gray-200 rounded-full border-2 border-white shadow-md hover:shadow-lg transition"
            onClick={() => setProfileInfoOpen(true)}
            style={{ borderRadius: "50%" }}
          >
            <Pencil className="w-5 h-5 text-orange-500" />
          </button>
        )}
      </div>

      <div className="bg-gray-50 rounded-xl p-4 space-y-4 mx-4">
        {[
          {
            icon: <User className="w-5 h-5 text-blue-600 mr-3" />,
            label: "Full Name",
            field: "name",
            value: userProfileAllInfo?.name,
          },
          {
            icon: <Mail className="w-5 h-5 text-blue-600 mr-3" />,
            label: "Email",
            field: "email",
            value: userProfileAllInfo?.email,
          },
          {
            icon: <Phone className="w-5 h-5 text-blue-600 mr-3" />,
            label: "Phone",
            field: "phone",
            value: userProfileAllInfo?.phone,
          },
          {
            icon: <Calendar className="w-5 h-5 text-blue-600 mr-3" />,
            label: "Driver's License Expiry",
            field: "licenseExpiryDate",
            value: userProfileAllInfo?.licenseExpiryDate,
          },
        ].map((item, idx) => (
          <div key={idx} className="flex items-start">
            {item.icon}
            <div className="mb-3 w-full">
              <p className="text-sm text-gray-500 m-0 mx-3">{item.label}</p>
              {profileInfoOpen ? (
                <input
                  disabled={isSaving}
                  type="text"
                  value={item.value || ""}
                  onChange={(e) =>
                    handleInputChange(item.field, e.target.value)
                  }
                  className="mx-3 mt-1 border border-gray-300 px-2 py-1 rounded-md w-full"
                />
              ) : (
                <p className="text-gray-800 m-0 mx-3">
                  {item.field === "phone" ? `+91 ${item.value}` : item.value}
                </p>
              )}
            </div>
          </div>
        ))}
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-2" />
          <div className="mb-3 w-full relative">
            <p className="text-sm text-gray-500 m-0 mx-3">Address</p>
            {profileInfoOpen ? (
              <div className="mx-3 mt-1 relative">
                <input
                  disabled={isSaving}
                  type="text"
                  value={userProfileAllInfo?.address || ""}
                  onChange={(e) => {
                    handleInputChange("address", e.target.value);
                    findlocation(e.target.value);
                  }}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full pr-10"
                />
                {suggestions.length > 0 && (
                  <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-56 overflow-y-auto">
                    {suggestions.map((place) => (
                      <li
                        key={place.id}
                        className="flex items-center px-4 py-3 cursor-pointer group transition duration-200 hover:text-blue-500"
                        onClick={() => handlePlaceSelect(place)}
                      >
                        <LocationOnIcon className="text-gray-500 group-hover:text-blue-500 mr-2" />
                        {place.place_name}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                  {profileInfoOpen && (
                    <>
                      <input
                        disabled={isSaving}
                        type="text"
                        placeholder="City"
                        value={userProfileAllInfo?.city || ""}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        className="border border-gray-300 px-3 py-2 rounded-md text-gray-800"
                      />
                      <input
                        disabled={isSaving}
                        type="text"
                        placeholder="State"
                        value={userProfileAllInfo?.state || ""}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        className="border border-gray-300 px-3 py-2 rounded-md text-gray-800"
                      />
                      <input
                        disabled={isSaving}
                        type="text"
                        placeholder="Country"
                        value={userProfileAllInfo?.country || ""}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        className="border border-gray-300 px-3 py-2 rounded-md text-gray-800"
                      />
                      <input
                        disabled={isSaving}
                        type="text"
                        placeholder="Zip Code"
                        value={userProfileAllInfo?.zipCode || ""}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        className="border border-gray-300 px-3 py-2 rounded-md text-gray-800"
                      />
                    </>
                  )}
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-800 m-0 mx-3 mt-1">
                  {userProfileInfo?.address || "-"}
                </p>
              </>
            )}
            {profileInfoOpen && (
              <div className="mt-4 mx-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Map Preview
                </h4>
                <div
                  ref={mapContainerRef}
                  style={{ width: "100%", height: "400px" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={emailValidOpen}
        onClose={() => setEmailValidOpen(false)}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            padding: "20px",
            background: "#f9f9f9",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
            pb: 1,
          }}
        >
          Verify Your Email
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Enter the six-digit OTP sent to your email.
          </Typography>

          <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
            <TextField
              label="Enter The OTP"
              variant="outlined"
              type="text"
              required
              fullWidth
              value={otp}
              onChange={handleOtpChange}
              inputProps={{
                maxLength: 6,
                pattern: "[0-9]*",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </motion.div>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => {
                if (otp.length === 6) {
                  verifyotp();
                }
              }}
              variant="contained"
              sx={{
                backgroundColor: loading ? "#ccc" : "#1976D2",
                color: "#fff",
                px: 4,
                py: 1,
                textTransform: "none",
                fontSize: "16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  backgroundColor: !loading && "#1565C0",
                },
              }}
              disabled={otp.length !== 6 || loading}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
              ) : (
                "Verify"
              )}
            </Button>
          </motion.div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PersonalInformation;

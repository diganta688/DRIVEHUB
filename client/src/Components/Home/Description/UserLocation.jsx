import React, { useState, useRef, useEffect, use } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  CircularProgress,
} from "@mui/material";
import { MapPin, Building, Globe } from "lucide-react";
import CloseIcon from "@mui/icons-material/Close";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mbxDirections from "@mapbox/mapbox-sdk/services/directions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UserLocation({ FullScreenMapOpen, setFullScreenMapOpen, carDetails }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const defaultCoordinates = {
    lat: carDetails.hostLat,
    lng: carDetails.hostLng,
  };
  const accessToken = import.meta.env.VITE_MAP_TOKEN;
  const directionsClient = mbxDirections({ accessToken });
  const [coordinates, setCoordinates] = useState(defaultCoordinates);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [serviceAreaError, setServiceAreaError] = useState("");
  const[distanceKM, setDistanceKM] = useState(0);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const routeLayerId = "route-line";

  useEffect(() => {
    if (
      !FullScreenMapOpen ||
      !carDetails?.hostServiceArea ||
      !carDetails?.hostCity ||
      !defaultCoordinates?.lat ||
      !defaultCoordinates?.lng
    )
      return;

    const initializeMap = () => {
      if (mapRef.current || !mapContainerRef.current) return;
      mapboxgl.accessToken = accessToken;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [coordinates.lng, coordinates.lat],
        zoom: 15,
        doubleClickZoom: false,
      });

      mapRef.current.on("load", () => {
        setMapLoaded(true);
      });

      const distanceDiv = document.createElement("div");
      distanceDiv.className = "mapboxgl-ctrl custom-distance-box";
      distanceDiv.style.cssText = `
      background: white;
      padding: 6px 10px;
      border-radius: 6px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      font-size: 14px;
      font-weight: 500;
    `;

      const distanceControl = {
        onAdd: () => distanceDiv,
        onRemove: () => distanceDiv.parentNode.removeChild(distanceDiv),
      };

      mapRef.current.addControl(distanceControl, "top-left");

      markerRef.current = new mapboxgl.Marker()
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(mapRef.current);

      mapRef.current.on("dblclick", (e) => {
        const { lng, lat } = e.lngLat;
        markerRef.current.setLngLat([lng, lat]);
        setCoordinates({ lng, lat });
        reverseGeocode(lng, lat);
        const dist = calculateDistance(
          lat,
          lng,
          defaultCoordinates.lat,
          defaultCoordinates.lng
        );
        setDistanceKM(dist)
        distanceDiv.innerText = `Distance from ${carDetails.hostCity}: ${dist} km`;
        if (dist > Number(carDetails.hostServiceArea)) {
          setServiceAreaError(
            `We're not there yet — you must be within ${carDetails.hostServiceArea} km of the service area.`
          );
        } else {
          setServiceAreaError("");
        }
        drawRoute(defaultCoordinates, { lat, lng });
      });
      mapRef.current._distanceDiv = distanceDiv;
    };

    setTimeout(() => initializeMap(), 100);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      setMapLoaded(false);
    };
  }, [FullScreenMapOpen]);
  useEffect(() => {
    if (
      !mapLoaded ||
      !carDetails?.hostServiceArea ||
      !carDetails?.hostCity ||
      !defaultCoordinates?.lat ||
      !defaultCoordinates?.lng
    )
      return;

    const dist = calculateDistance(
      coordinates.lat,
      coordinates.lng,
      defaultCoordinates.lat,
      defaultCoordinates.lng
    );
    if (dist > Number(carDetails.hostServiceArea)) {
      setServiceAreaError(
        `We're not there yet — you must be within ${carDetails.hostServiceArea} km of the service area.`
      );
    } else {
      setServiceAreaError("");
    }
    if (mapRef.current?._distanceDiv) {
      mapRef.current._distanceDiv.innerText = `Distance from ${carDetails.hostCity}: ${dist} km`;
      setDistanceKM(dist);
    }
  }, [mapLoaded, coordinates, defaultCoordinates, carDetails]);
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const drawRoute = async (from, to) => {
    const map = mapRef.current;
    if (!map) return;

    try {
      const response = await directionsClient
        .getDirections({
          profile: "driving",
          geometries: "geojson",
          waypoints: [
            { coordinates: [from.lng, from.lat] },
            { coordinates: [to.lng, to.lat] },
          ],
        })
        .send();

      const route = response.body.routes[0].geometry;

      if (map.getLayer(routeLayerId)) map.removeLayer(routeLayerId);
      if (map.getSource(routeLayerId)) map.removeSource(routeLayerId);

      map.addSource(routeLayerId, {
        type: "geojson",
        data: { type: "Feature", geometry: route },
      });

      map.addLayer({
        id: routeLayerId,
        type: "line",
        source: routeLayerId,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3b82f6",
          "line-width": 5,
        },
      });
    } catch (error) {
      console.error("Error fetching route:", error);
      toast.error(error);
    }
  };

  const reverseGeocode = async (lng, lat) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const place = data.features[0];
      if (place) {
        updateAddressFromFeature(place);
      }
    } catch (err) {
      console.error("Reverse geocoding failed", err);
      toast.error(err);
    }
  };

  const handleClose = () => {
    setFullScreenMapOpen(false);
    setServiceAreaError("");
    setAddress((p) => ({
      ...p,
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    }));
  };

  const handleStreetChange = async (e) => {
    const value = e.target.value;
    setAddress({ ...address, street: value });

    if (!value) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        value
      )}.json?autocomplete=true&access_token=${accessToken}`
    );
    const data = await res.json();
    setSuggestions(data.features || []);
  };

  const handleSuggestionSelect = (place) => {
    setSuggestions([]);
    const [lng, lat] = place.center;
    setCoordinates({ lng, lat });
    markerRef.current.setLngLat([lng, lat]);

    drawRoute(defaultCoordinates, { lat, lng });
    updateAddressFromFeature(place);
  };
  const updateAddressFromFeature = (place) => {
    const context = place.context || [];
    const info = {
      street: place.text || "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    };

    context.forEach((item) => {
      if (item.id.includes("place")) info.city = item.text;
      else if (item.id.includes("region")) info.state = item.text;
      else if (item.id.includes("postcode")) info.zipCode = item.text;
      else if (item.id.includes("country")) info.country = item.text;
    });

    setAddress(info);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={FullScreenMapOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Enter your exect location
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="flex flex-col items-center justify-center p-4">
          {serviceAreaError.length > 0 && (
            <p className="" style={{ color: "red", fontWeight: "600" }}>
              {serviceAreaError}
            </p>
          )}
          <div className="relative w-full max-w-2xl h-[400px] rounded-lg overflow-hidden shadow-md border border-gray-200">
            {!mapLoaded && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
                <CircularProgress />
              </div>
            )}
            <div ref={mapContainerRef} className="w-full h-full" />
          </div>

          <div className="w-full max-w-2xl mb-4 space-y-4 mt-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="address"
                value={address.street}
                onChange={handleStreetChange}
                className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="123 Main St"
                required
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-auto w-full">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionSelect(item)}
                    >
                      {item.place_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <Building className="absolute left-3 bottom-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Kolkata"
                  required
                  onChange={(e) => {
                    setAddress((p) => ({
                      ...p,
                      city: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  className="w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="West Bengal"
                  required
                  onChange={(e) => {
                    setAddress((p) => ({
                      ...p,
                      state: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="number"
                  name="zipCode"
                  value={address.zipCode}
                  className="w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="700001"
                  required
                  onChange={(e) => {
                    setAddress((p) => ({
                      ...p,
                      zipCode: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <Globe className="absolute left-3 bottom-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="India"
                  required
                  onChange={(e) => {
                    setAddress((p) => ({
                      ...p,
                      country: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="w-full max-w-2xl mb-4 space-y-4 mt-4">
              <button
                className={`w-full mt-2 py-3 font-bold text-white ${
                  serviceAreaError
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
                onClick={() => {
                  const { street, city, state, zipCode, country } = address;
                  if (street && city && state && zipCode && country) {
                    setIsAlertOpen(true);
                  } else {
                    toast.error("All fields are required");
                  }
                }}
                disabled={!!serviceAreaError}
                style={{
                  borderRadius: "10px",
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      {isAlertOpen && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: "100000" }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Booking</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsAlertOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to proceed with the booking?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsAlertOpen(false)}
                  >
                    Cancel
                  </button>
                  <Link
                    to={`/confirm-booking/${carDetails.id}?startDate=${carDetails.StartDate}&startTime=${carDetails.StartTime}&endDate=${carDetails.EndDate}&endTime=${carDetails.EndTime}`}
                    state={{ display: true, carDetails: carDetails, homeDelivery: true, Distance: distanceKM }}
                    className="btn btn-primary"
                  >
                    Confirm & Continue
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}

export default UserLocation;

import React, { useState, useContext, useRef, useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { MapPin, Building, Globe, Navigation } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Location({ setInput, input }) {
  const defaultCoordinates = { lat: 22.5726, lng: 88.3639 };
  const [coordinates, setCoordinates] = useState(defaultCoordinates);
  const mapContainerRef = useRef(null);
  const accessToken = import.meta.env.VITE_MAP_TOKEN;
  const [suggestions, setSuggestions] = useState([]);
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
  const handleSelect = (place) => {
    const placeName = place.place_name;
    const [lng, lat] = place.center;
    setCoordinates({ lat, lng });
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
    setInput((prev) => ({
      ...prev,
      address: placeName,
      city,
      state,
      zipCode,
      country,
      lat,
      lng,
    }));

    setSuggestions([]);
  };
  useEffect(() => {
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
  
    const handleReverseGeocode = async (lng, lat) => {
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
  
          let city = "", state = "", zipCode = "", country = "";
          context.forEach((item) => {
            if (item.id.includes("place")) city = item.text;
            else if (item.id.includes("region")) state = item.text;
            else if (item.id.includes("postcode")) zipCode = item.text;
            else if (item.id.includes("country")) country = item.text;
          });
  
          setInput((prev) => ({
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
  
    const onMouseDown = (e) => {
      isDragging = false;
      const onMouseMove = () => {
        isDragging = true;
      };
      map.on("mousemove", onMouseMove);
  
      holdTimeout = setTimeout(() => {
        if (isDragging) return;
        const { lng, lat } = e.lngLat;
        handleReverseGeocode(lng, lat);
      }, 1000);
  
      map.once("mouseup", () => {
        clearTimeout(holdTimeout);
        map.off("mousemove", onMouseMove);
      });
    };
  
    const onTouchStart = (e) => {
      isDragging = false;
      const onTouchMove = () => {
        isDragging = true;
      };
      map.on("touchmove", onTouchMove);
  
      const touch = e.point;
      const { lng, lat } = map.unproject([touch.x, touch.y]);
  
      holdTimeout = setTimeout(() => {
        if (isDragging) return;
        handleReverseGeocode(lng, lat);
      }, 1000);
  
      map.once("touchend", () => {
        clearTimeout(holdTimeout);
        map.off("touchmove", onTouchMove);
      });
    };
  
    map.on("mousedown", onMouseDown);
    map.on("touchstart", onTouchStart);
  
    return () => {
      map.off("mousedown", onMouseDown);
      map.off("touchstart", onTouchStart);
      map.remove();
    };
  }, [coordinates]);
  
  useEffect(() => {
    const loadInitialCoordinates = async () => {
      if (input.address) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input.address}.json?access_token=${accessToken}&limit=1`;
        try {
          const res = await fetch(url);
          const data = await res.json();
          const [lng, lat] = data.features[0].center;
          setCoordinates({ lat, lng });
        } catch (err) {
          console.error("Error fetching initial address coordinates:", err);
        }
      }
    };

    loadInitialCoordinates();
  }, []);

  return (
    <div className="space-y-4 pt-4">
      <h4 className="text-md font-medium text-gray-700 border-b">
        Location Details
      </h4>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="address"
            value={input.address}
            onChange={(e) => {
              const { name, value } = e.target;
              setInput((prev) => ({
                ...prev,
                [name]: value,
              }));
              findlocation(value);
            }}
            className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="123 Main St"
            required
          />

          {input.address.length > 0 && (
            <HighlightOffIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => {
                setInput((prev) => ({
                  ...prev,
                  address: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "",
                }));
                setSuggestions([]);
              }}
            />
          )}

          {suggestions.length > 0 && (
            <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-56 overflow-y-auto px-0">
              {suggestions.map((place) => (
                <li
                  key={place.id}
                  className="flex items-center px-4 py-3 cursor-pointer group transition duration-200 hover:text-blue-500"
                  onClick={() => handleSelect(place)}
                >
                  <LocationOnIcon className="text-gray-500 group-hover:text-blue-500 mr-2" />
                  {place.place_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="city"
              value={input.city}
              onChange={(e) => {
                const { name, value } = e.target;
                setInput((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }}
              className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="KOLKATA"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            name="state"
            value={input.state}
            onChange={(e) => {
              const { name, value } = e.target;
              setInput((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="KOL"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            type="text"
            name="zipCode"
            value={input.zipCode}
            onChange={(e) => {
              const { name, value } = e.target;
              setInput((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="700004"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="country"
              value={input.country}
              onChange={(e) => {
                const { name, value } = e.target;
                setInput((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }}
              className="pl-10 w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="India"
              required
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Map Preview</h4>
        <div
          ref={mapContainerRef}
          className="w-full h-64 rounded-lg border border-gray-300 shadow cursor-pointer"
        />
        <p className="mx-3">click &  hold for 2 sec in the map to pin</p>
      </div>
    </div>
  );
}

export default Location;

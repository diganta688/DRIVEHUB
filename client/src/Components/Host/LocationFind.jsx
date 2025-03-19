import { useState } from "react";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const LocationFind = ({ open, setOpen, setCount }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const accessToken = import.meta.env.VITE_MAP_TOKEN;

  const getLocations = async (input) => {
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

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    getLocations(value);
  };

  const handleSelect = (placeName) => {
    setQuery(placeName);
    setSuggestions([]);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setCount(0);
        setQuery("");
      }}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "12px",
          transition: "all 0.3s ease-in-out",
          height: suggestions.length > 0 ? "450px" : "250px",
        },
      }}
    >
      <DialogTitle
        sx={{ fontWeight: "700", fontSize: "22px", textAlign: "center", pb: 1 }}
      >
        Find Your Location
      </DialogTitle>
      <DialogContent>
        <div className="space-y-4">
          <p className="text-gray-600 text-center">
            Where is your car located? Start typing below:
          </p>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Type a location..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            {query.length > 0 && (
              <HighlightOffIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => setQuery("")}
              />
            )}
            {suggestions.length > 0 && (
              <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-56 overflow-y-auto">
                {suggestions.map((place) => (
                  <li
                    key={place.id}
                    className="flex items-center px-4 py-3 cursor-pointer group transition duration-200 hover:text-blue-500"
                    onClick={() => handleSelect(place.place_name)}
                  >
                    <LocationOnIcon className="text-gray-500 group-hover:text-blue-500 mr-2" />
                    {place.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={() => {
            setOpen(false);
            setCount(0);
            setQuery("");
          }}
          variant="outlined"
          sx={{ borderRadius: "8px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            setQuery("");
            setCount(0);
          }}
          variant="contained"
          sx={{
            backgroundColor: "#007AFF",
            color: "white",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#005EC4" },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LocationFind;

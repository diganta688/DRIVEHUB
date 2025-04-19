import React, { useContext } from "react";
import { Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { HostCarEditContext } from "../../../Context/context";

const SpecificationsForm = () => {
  const { hostCarInfo, setHostCarInfo } = useContext(HostCarEditContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHostCarInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="p-5 bg-white rounded shadow">
      <Typography variant="h5" gutterBottom>
        Specifications
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="fuel-type-label">Fuel Type *</InputLabel>
            <Select
              labelId="fuel-type-label"
              id="fuelType"
              name="fuelType"
              value={hostCarInfo.fuelType}
              label="Fuel Type"
              onChange={handleChange}
            >
              <MenuItem value="Petrol">Petrol</MenuItem>
              <MenuItem value="Diesel">Diesel</MenuItem>
              <MenuItem value="Electric">Electric</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
              <MenuItem value="CNG">CNG</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="transmission-label">Transmission *</InputLabel>
            <Select
              labelId="transmission-label"
              id="transmission"
              name="transmission"
              value={hostCarInfo.transmission}
              label="Transmission"
              onChange={handleChange}
            >
              <MenuItem value="Automatic">Automatic</MenuItem>
              <MenuItem value="Manual">Manual</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="segment-label">Segment *</InputLabel>
            <Select
              labelId="segment-label"
              id="segment"
              name="segment"
              value={hostCarInfo.segment}
              label="Segment"
              onChange={handleChange}
            >
              <MenuItem value="Hatchback">Hatchback</MenuItem>
              <MenuItem value="Sedan">Sedan</MenuItem>
              <MenuItem value="SUV">SUV</MenuItem>
              <MenuItem value="Crossover">Crossover</MenuItem>
              <MenuItem value="Convertible">Convertible</MenuItem>
              <MenuItem value="Coupe">Coupe</MenuItem>
              <MenuItem value="Pickup Truck">Pickup Truck</MenuItem>
              <MenuItem value="Minivan">Minivan</MenuItem>
              <MenuItem value="Microcar">Microcar</MenuItem>
              <MenuItem value="Roadster">Roadster</MenuItem>
              <MenuItem value="Luxury Car">Luxury Car</MenuItem>
              <MenuItem value="Sportscar">Sportscar</MenuItem>
              <MenuItem value="MPV (Multi-Purpose Vehicle)">MPV (Multi-Purpose Vehicle)</MenuItem>
              <MenuItem value="Estate/Wagon">Estate/Wagon</MenuItem>
              <MenuItem value="Compact">Compact</MenuItem>
              <MenuItem value="Subcompact">Subcompact</MenuItem>
              <MenuItem value="Full-size">Full-size</MenuItem>
              <MenuItem value="Off-Road">Off-Road</MenuItem>
              <MenuItem value="Van">Van</MenuItem>
              <MenuItem value="Electric">Electric</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
              <MenuItem value="CNG">CNG</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Seats *"
            type="number"
            name="seats"
            value={hostCarInfo.seats}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="tiresCondition-label">Tires Condition *</InputLabel>
            <Select
              labelId="tiresCondition-label"
              id="tiresCondition"
              name="tiresCondition"
              value={hostCarInfo.tiresCondition}
              label="Tires Condition"
              onChange={handleChange}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Average">Average</MenuItem>
              <MenuItem value="Worn">Worn</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Usage Limits (km) *"
            type="number"
            name="usageLimit"
            value={hostCarInfo.usageLimit}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Extra Charges ($) *"
            type="number"
            name="extraCharges"
            value={hostCarInfo.extraCharges}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Performance
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Acceleration (0–100 km/h) *"
            type="text"
            name="acceleration"
            value={hostCarInfo.acceleration}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Top Speed (km/h) *"
            type="number"
            name="topSpeed"
            value={hostCarInfo.topSpeed}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Peak Power (HP) *"
            type="number"
            name="peakPower"
            value={hostCarInfo.peakPower}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default SpecificationsForm;

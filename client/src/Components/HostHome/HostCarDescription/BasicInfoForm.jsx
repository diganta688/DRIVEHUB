import React, { useContext } from "react";
import { HostCarEditContext } from "../../../Context/context";
import TextField from "@mui/material/TextField";

const BasicInfoForm = () => {
  const { hostCarInfo, setHostCarInfo } = useContext(HostCarEditContext);

  const handleChange = (e) => {
    setHostCarInfo({ ...hostCarInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-5 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Make"
          name="make"
          value={hostCarInfo.make}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Model"
          name="model"
          value={hostCarInfo.model}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Year"
          name="year"
          value={hostCarInfo.year}
          onChange={handleChange}
          variant="outlined"
          type="number"
          fullWidth
          required
        />
        <TextField
          label="Price ($)"
          name="price"
          value={hostCarInfo.price}
          onChange={handleChange}
          variant="outlined"
          type="number"
          fullWidth
          required
        />
        <TextField
          label="Color"
          name="color"
          value={hostCarInfo.color}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Mileage (km)"
          name="mileage"
          value={hostCarInfo.mileage}
          onChange={handleChange}
          variant="outlined"
          type="number"
          fullWidth
          required
        />
      </div>

      <div className="mt-4">
        <TextField
          label="Description"
          name="description"
          value={hostCarInfo.description}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={6}
          required
        />
      </div>

      <div className="mt-4">
        <TextField
          label="Main Image URL"
          name="MainImage"
          value={hostCarInfo.MainImage}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          disabled
        />
        {hostCarInfo.MainImage && (
          <img
            src={hostCarInfo.MainImage}
            alt="Car Preview"
            className="mt-3 rounded shadow max-h-60 object-cover mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default BasicInfoForm;

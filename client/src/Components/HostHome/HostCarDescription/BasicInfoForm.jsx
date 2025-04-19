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
          label="Make *"
          variant="outlined"
          name="make"
          value={hostCarInfo.make}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Model *"
          variant="outlined"
          name="model"
          value={hostCarInfo.model}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Year *"
          variant="outlined"
          name="year"
          value={hostCarInfo.year}
          onChange={handleChange}
          type="number"
          fullWidth
        />
        <TextField
          label="Price ($) *"
          variant="outlined"
          name="price"
          value={hostCarInfo.price}
          onChange={handleChange}
          type="number"
          fullWidth
        />
        <TextField
          label="Color *"
          variant="outlined"
          name="color"
          value={hostCarInfo.color}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Mileage (km) *"
          variant="outlined"
          name="mileage"
          value={hostCarInfo.mileage}
          onChange={handleChange}
          type="number"
          fullWidth
        />
      </div>

      <div className="mt-4">
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={hostCarInfo.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />
      </div>

      <div className="mt-4">
        <TextField
          label="Main Image URL *"
          variant="outlined"
          name="MainImage"
          value={hostCarInfo.MainImage}
          onChange={handleChange}
          fullWidth
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

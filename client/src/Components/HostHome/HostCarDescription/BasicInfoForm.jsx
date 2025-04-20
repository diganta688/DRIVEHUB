import React, { useContext } from "react";
import { HostCarEditContext } from "../../../Context/context";
import TextField from "@mui/material/TextField";
import { MuiColorInput } from "mui-color-input";

const BasicInfoForm = () => {
  const {
    hostCarInfo,
    setHostCarInfo,
    handleInputChange,
    hostCarEditInputError,
  } = useContext(HostCarEditContext);

  return (
    <div className="p-5 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <>
          <TextField
            label="Make"
            name="make"
            value={hostCarInfo.make}
            onChange={(e) => handleInputChange(e)}
            variant="outlined"
            fullWidth
            required
            error={!!hostCarEditInputError?.make}
            helperText={hostCarEditInputError?.make || " "}
          />
        </>
        <>
          <TextField
            label="Model"
            name="model"
            value={hostCarInfo.model}
            onChange={(e) => handleInputChange(e)}
            variant="outlined"
            fullWidth
            required
            error={!!hostCarEditInputError?.model}
            helperText={hostCarEditInputError?.model|| " "}
          />
        </>
        <div>
          <TextField
            label="Year"
            name="year"
            value={hostCarInfo.year}
            onChange={(e) => handleInputChange(e)}
            variant="outlined"
            type="number"
            fullWidth
            required
            error={!!hostCarEditInputError?.year}
            helperText={hostCarEditInputError?.year|| " "}
          />
        </div>
        <>
          <TextField
            label="Price ($)"
            name="price"
            value={hostCarInfo.price}
            onChange={(e) => handleInputChange(e)}
            variant="outlined"
            type="number"
            fullWidth
            required
            error={!!hostCarEditInputError?.price}
            helperText={hostCarEditInputError?.price|| " "}
            />
        </>

        <MuiColorInput
          label="Primary color"
          id="colorInput"
          format="hex"
          value={hostCarInfo.color}
          onChange={(newColor) =>
            setHostCarInfo({ ...hostCarInfo, color: newColor })
          }
          
          helperText={hostCarEditInputError?.color|| " "}
        />
        <TextField
          label="Mileage (km)"
          name="mileage"
          value={hostCarInfo.mileage}
          onChange={(e) => handleInputChange(e)}
          variant="outlined"
          type="number"
          fullWidth
          required
          error={!!hostCarEditInputError?.mileage}
          helperText={hostCarEditInputError?.mileage|| " "}
        />
      </div>

      <div className="mt-4">
        <TextField
          label="Description"
          name="description"
          value={hostCarInfo.description}
          onChange={(e) => handleInputChange(e)}
          variant="outlined"
          fullWidth
          multiline
          rows={6}
          required
          error={!!hostCarEditInputError?.description}
          helperText={hostCarEditInputError?.description|| " "}
        />
      </div>

      <div className="mt-4">
        <TextField
          label="Main Image URL"
          name="MainImage"
          value={hostCarInfo.MainImage}
          onChange={(e) => handleInputChange(e)}
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

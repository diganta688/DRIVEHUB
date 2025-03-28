import React, { useState, useContext  } from "react";
import LocationList from "./LocationList";
import { PlusCircle, Trash2 } from "lucide-react";
import { HostMainContext } from "../../../Context/context";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import SelectField from "./SelectField";

function LeftMain({ handleSubmit }) {
  const { formData, handleInputChange } = useContext(HostMainContext);
  const [filePreviews, setFilePreviews] = useState([]);
    
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newPreviews = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then((previews) => {
      setFilePreviews(previews);
    });
  };

  const removeFile = (index) => {
    setFilePreviews(filePreviews.filter((_, i) => i !== index));
  };

  return (
    <div className="lg:w-1/2 animate-slide-in">
      <div className="bg-gradient-to-br p-3 rounded-xl transition-all duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <PlusCircle className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-extrabold text-gray-800 m-0 mx-2">
            List Your Car
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Make" name="make" value={formData.make} onChange={handleInputChange} />
            <InputField label="Model" name="model" value={formData.model} onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField label="Year" name="year" type="number" value={formData.year} onChange={handleInputChange} />
            <InputField label="Daily Price ($)" name="price" type="number" value={formData.price} onChange={handleInputChange} />
            <InputField label="Seats" name="seats" type="number" value={formData.seats} onChange={handleInputChange} />
          </div>
          <LocationList/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField label="Fuel Type" name="fuelType" value={formData.fuelType} onChange={handleInputChange} options={["Petrol", "Diesel", "Electric", "Hybrid"]} />
            <SelectField label="Transmission" name="transmission" value={formData.transmission} onChange={handleInputChange} options={["Automatic", "Manual"]} />
          </div>
          <InputField label="Mileage (km)" name="mileage" type="number" value={formData.mileage} onChange={handleInputChange} />

          <InputField label="Car Image URL (Primary)" name="imageUrl" type="url" value={formData.imageUrl} onChange={handleInputChange} />
          <div>
          <label className="text-sm font-semibold text-gray-700">Car Images (Optional)</label>
            <input type="file" accept="image/*" multiple onChange={handleFileChange} className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2" />
            <div className="grid grid-cols-4 gap-3 mt-3">
              {filePreviews.map((preview, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img src={preview} alt="Car Preview" className="w-full h-full object-cover rounded-lg shadow-md" />
                  <button onClick={() => removeFile(index)} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <TextAreaField label="Description" name="description" value={formData.description} onChange={handleInputChange} />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-101 active:scale-95 shadow-md" style={{ marginTop: "1rem", borderRadius: "10px" }}>
            List Car
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeftMain;
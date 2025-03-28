import React, { useState, useContext } from "react";
import LocationList from "./LocationList";
import { PlusCircle, Trash2 } from "lucide-react";
import { HostMainContext } from "../../../Context/context";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import SelectField from "./SelectField";
import "./loader.css";

function LeftMain({ handleSubmit, isLoading, isPreviewDisplay }) {
  const { formData, handleInputChange, setFormData } =
    useContext(HostMainContext);
  const [filePreviews, setFilePreviews] = useState([]);
  const [fileError, setFileError] = useState("");
  const maxFiles = 5;

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (
      selectedFiles.length + (formData.files ? formData.files.length : 0) >
      maxFiles
    ) {
      setFileError("Maximum 5 files allowed");
      return;
    }

    setFileError("");

    const newPreviews = selectedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ file, preview: e.target.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then((results) => {
      const newFiles = results.map((result) => result.file);
      const newFilePreviews = results.map((result) => result.preview);

      setFormData((prevFormData) => ({
        ...prevFormData,
        files: prevFormData.files
          ? [...prevFormData.files, ...newFiles]
          : newFiles,
      }));

      setFilePreviews((prevPreviews) => [...prevPreviews, ...newFilePreviews]);
    });
  };

  const removeFile = (index) => {
    setFormData((prevFormData) => {
      const updatedFiles = prevFormData.files.filter((_, i) => i !== index);
      return { ...prevFormData, files: updatedFiles };
    });

    setFilePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
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
            <InputField
              label="Make"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
            />
            <InputField
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleInputChange}
            />
            <InputField
              label="Daily Price ($)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
            />
            <InputField
              label="Seats"
              name="seats"
              type="number"
              value={formData.seats}
              onChange={handleInputChange}
            />
          </div>
          <LocationList />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Fuel Type"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              options={["Petrol", "Diesel", "Electric", "Hybrid"]}
            />
            <SelectField
              label="Transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleInputChange}
              options={["Automatic", "Manual"]}
            />
          </div>
          <InputField
            label="Mileage (km)"
            name="mileage"
            type="number"
            value={formData.mileage}
            onChange={handleInputChange}
          />

          <InputField
            label="Car Image URL (Primary)"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Car Images (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full rounded-lg px-4 py-2"
              style={fileError ? { border: " 2px solid #ff00009e" } : {}}
            />

            {fileError && (
              <p className="text-red-500 text-sm mt-1">{fileError}</p>
            )}
            {isPreviewDisplay && (
              <div className="grid grid-cols-4 gap-3 mt-3">
                {filePreviews.map((preview, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={preview}
                      alt="Car Preview"
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          {isLoading ? (
            <button
              disabled={true}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform shadow-md flex items-center justify-center opacity-50 cursor-not-allowed"
              style={{ marginTop: "1rem", borderRadius: "10px" }}
            >
              Loading...
            </button>
          ) : (
            <button
              disabled={false}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-101 active:scale-95 shadow-md flex items-center justify-center"
              style={{ marginTop: "1rem", borderRadius: "10px" }}
            >
              List Car
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default LeftMain;

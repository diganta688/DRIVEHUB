import React, { useContext } from "react";
import { PlusCircle } from "lucide-react";
import { HostMainContext } from "../../../Context/context";

function LeftMain({ handleSubmit }) {
  const { formData, handleInputChange } = useContext(HostMainContext);

  return (
    <div className="lg:w-1/2 animate-slide-in">
      <div className="bg-gradient-to-br p-3 rounded-xl  transition-all duration-300 ">
        <div className="flex items-center space-x-3 mb-6">
          <PlusCircle className="h-6 w-6 text-blue-600 " />
          <h2 className="text-2xl font-extrabold text-gray-800 m-0 mx-2">List Your Car</h2>
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
          <InputField label="Location" name="location" value={formData.location} onChange={handleInputChange} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField label="Fuel Type" name="fuelType" value={formData.fuelType} onChange={handleInputChange} options={["Petrol", "Diesel", "Electric", "Hybrid"]} />
            <SelectField label="Transmission" name="transmission" value={formData.transmission} onChange={handleInputChange} options={["Automatic", "Manual"]} />
          </div>
          <InputField label="Mileage (km)" name="mileage" type="number" value={formData.mileage} onChange={handleInputChange} />
          <InputField label="Car Image URL" name="imageUrl" type="url" value={formData.imageUrl} onChange={handleInputChange} />
          <TextAreaField label="Description" name="description" value={formData.description} onChange={handleInputChange} />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-101 active:scale-95 shadow-md"
          style={{marginTop: "1rem", borderRadius: "10px"}}
          >
            List Car
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeftMain;

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
      required
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
      required
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

/* ✅ Styled TextArea Component */
const TextAreaField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-200"
      required
    />
  </div>
);

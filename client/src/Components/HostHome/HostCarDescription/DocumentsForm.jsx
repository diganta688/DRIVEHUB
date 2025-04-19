import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { HostCarEditContext } from "../../../Context/context";

const DocumentsForm = () => {
  const { hostCarInfo, setHostCarInfo } = useContext(HostCarEditContext);
  const handleDocChange = (e) => {
    const { name, value } = e.target;
    setHostCarInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-5 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Documents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <TextField
            id="rcBook"
            label="RC Book *"
            variant="outlined"
            name="rcBook"
            value={hostCarInfo.rcBook}
            onChange={handleDocChange}
            fullWidth
            disabled
          />
          <img
            src={hostCarInfo.rcBook}
            alt="RC Book"
            className="mt-2 h-20 rounded border"
          />
        </div>
        <div>
          <TextField
            id="insurance"
            label="Insurance Document *"
            variant="outlined"
            name="insuranceDocument"
            value={hostCarInfo.insuranceDocument}
            onChange={handleDocChange}
            fullWidth
            disabled
          />
          <img
            src={hostCarInfo.insuranceDocument}
            alt="Insurance Document"
            className="mt-2 h-20 rounded border"
          />
        </div>
        <div className="md:col-span-2">
          <TextField
            id="pollution"
            label="Pollution Certificate *"
            variant="outlined"
            name="pollutionCertificate"
            value={hostCarInfo.pollutionCertificate}
            onChange={handleDocChange}
            fullWidth
            disabled
          />
          <img
            src={hostCarInfo.pollutionCertificate}
            alt="Pollution Certificate"
            className="mt-2 h-20 rounded border"
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Additional Car Images
        </label>
        {hostCarInfo.files.length <1 ? "no Additional image upload":<div className="flex gap-4 flex-wrap">
          {hostCarInfo.files.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Additional ${index + 1}`}
              className="w-32 h-24 object-cover rounded border"
            />
          ))}
        </div>}
        
      </div>
    </div>
  );
};

export default DocumentsForm;

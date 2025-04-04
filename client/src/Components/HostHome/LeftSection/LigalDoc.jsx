import React, { useState, useContext } from "react";
import { HostMainContext } from "../../../Context/context";
import axios from "axios";
import { toast } from "react-toastify";

function LegalDoc() {
  const { formData, setFormData, inputError, setInputError } =
    useContext(HostMainContext);
  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileSizeInKB = file.size / 1024;
    if (fileSizeInKB < 50 || fileSizeInKB > 150) {
      const errors = { ...inputError };
      errors[
        name
      ] = `File size must be between 50KB and 150KB. Current size: ${Math.round(
        fileSizeInKB
      )}KB`;
      setInputError(errors);
      return;
    }
    const errors = { ...inputError };
    errors[name] = "";
    setInputError(errors);
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
    toast.success("File added successfully!");
  };

  return (
    <>
      <p className="text-lg font-semibold my-4 ">
        Upload Required Documents..(make sure everything is correct before
        uploading)
      </p>
      <div className="flex flex-col gap-4">
        <div>
          <label
            className="block text-xs font-semibold text-gray-700 mb-1"
            style={{ fontSize: "12px", fontWeight: "700" }}
          >
            Vehicle Registration Certificate (RC Book):
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => handleFileChange(e, "rcBook")}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          {inputError.rcBook && (
            <p className="text-red-500 text-sm m-0">{inputError.rcBook}</p>
          )}
        </div>
        <div>
          <label
            className="block text-xs font-semibold text-gray-700 mb-1"
            style={{ fontSize: "12px", fontWeight: "700" }}
          >
            Insurance Policy Document:
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => handleFileChange(e, "insuranceDocument")}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          {inputError.insuranceDocument && (
            <p className="text-red-500 text-sm m-0">
              {inputError.insuranceDocument}
            </p>
          )}
        </div>
        <div>
          <label
            className="block text-xs font-semibold text-gray-700 mb-1"
            style={{ fontSize: "12px", fontWeight: "700" }}
          >
            Pollution Under Control (PUC) Certificate:
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => handleFileChange(e, "pollutionCertificate")}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          {inputError.pollutionCertificate && (
            <p className="text-red-500 text-sm m-0">
              {inputError.pollutionCertificate}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default LegalDoc;

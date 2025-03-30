import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const FileUploadField = ({
  handleMainImageChange,
  handleOptionalImagesChange,
  mainImagePreview,
  optionalImagePreviews,
  fileError,
}) => {
  return (
    <div>
      <div className="mb-3">
        <label className="text-sm font-semibold text-gray-700">
          Car Main Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleMainImageChange}
          className="mt-1 block w-full rounded-lg px-4 py-2 border"
          style={fileError ? { border: "2px solid #ff00009e" } : {}}
        />
        {mainImagePreview && (
          <div className="mt-3">
            <img
              src={mainImagePreview}
              alt="Main Car Preview"
              className="w-full h-full object-cover rounded-lg shadow-md"
              style={{ width: "30%" }}
            />
          </div>
        )}
      </div>
      <div>
        <label
          className="text-sm font-semibold text-gray-700 custum-file-upload"
          htmlFor="file"
        >
          Car Images (Optional)
          <div className="icon">
            <i
              className="fas fa-file-upload"
              style={{ color: "black", fontSize: "1.5rem" }}
            ></i>
          </div>
          <div className="text">
            <span>Click to upload image</span>
          </div>
          <input
            type="file"
            id="file"
            accept="image/*"
            multiple
            onChange={handleOptionalImagesChange}
            className="mt-1 block w-full rounded-lg px-4 py-2"
            style={fileError ? { border: "2px solid #ff00009e" } : {}}
          />
        </label>
        {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
        {optionalImagePreviews.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-3">
            {optionalImagePreviews.map((preview, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={preview}
                  alt={`Car Preview ${index}`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default FileUploadField;

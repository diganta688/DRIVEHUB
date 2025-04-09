import React, { useContext, useState } from "react";
import { Pencil } from "lucide-react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { UserProfileContext } from "../../../Context/context";
import TextField from "@mui/material/TextField";

function PictureSection({
  handlePhotoUpload,
  setPreviewURL,
  setSelectedFile,
  previewURL,
}) {
  const {
    nameEdit,
    setNameEdit,
    profilePhotoEdit,
    setProfilePhotoEdit,
    userProfileAllInfo,
    setUserProfileAllInfo,
    userProfileInfo,
    handleSubmit,
    submitLoader,
    profilePhotoLoader,
  } = useContext(UserProfileContext);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };
  return (
    <>
      <div className="relative">
        <img
          src={
            userProfileInfo && userProfileInfo.profilePhoto
              ? userProfileInfo.profilePhoto
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userProfileInfo?.name || "User"
                )}`
          }
          alt={`Profile photo of ${userProfileInfo?.name || "User"}`}
          className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
        />

        <button
          className="absolute bottom-2 right-0 p-2 bg-gray-200 rounded-full border-2 border-white shadow-md hover:shadow-lg transition"
          style={{ borderRadius: "50%" }}
          onClick={() => setProfilePhotoEdit(true)}
        >
          <Pencil className="w-4 h-4 text-orange-500" />
        </button>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-6 sm:text-left mx-3">
        {!nameEdit ? (
          <div className="flex items-center justify-center sm:justify-start">
            <h1 className="text-2xl font-semibold text-gray-800">
              {userProfileInfo?.name}
            </h1>
            <button
              className="ml-2 mx-3 p-2 bg-gray-200 rounded-full border-2 border-white shadow-md hover:shadow-lg transition"
              style={{ borderRadius: "50%" }}
              onClick={() => setNameEdit(true)}
            >
              <Pencil className="w-4 h-4 text-orange-500" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <TextField
              id="outlined-name"
              label="Enter New Name"
              variant="outlined"
              size="small"
              value={userProfileAllInfo.name}
              onChange={(e) =>
                setUserProfileAllInfo((p) => ({
                  ...p,
                  name: e.target.value,
                }))
              }
            />

            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button
                variant="contained"
                color="success"
                disabled={submitLoader}
                onClick={handleSubmit}
                style={{
                  textTransform: "none",
                  borderRadius: "8px",
                  minWidth: "100px",
                }}
              >
                {submitLoader ? (
                  <span className="flex items-center gap-2">
                    <span className="loader-small" />
                    Saving...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>

              <Button
                variant="outlined"
                color="error"
                disabled={submitLoader}
                onClick={() => {
                  setNameEdit(false);
                  setUserProfileAllInfo((p) => ({
                    ...p,
                    name: userProfileInfo?.name,
                  }));
                }}
                style={{ textTransform: "none", borderRadius: "8px" }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        {userProfileInfo?.Premium ? (
          <>
            <p className="text-gray-500 text-sm">Premium Member since 2022</p>
          </>
        ) : (
          <>
            <button
              style={{
                marginLeft: "0.5rem",
                borderRadius: "7px",
                padding: "0.3rem 1rem",
                color: "black",
                background: "gold",
                fontWeight: "bold",
                cursor: "pointer",
                WebkitBorderStroke: "0.5px black",
              }}
            >
              Get Premium
            </button>
          </>
        )}
      </div>
      <Dialog
        open={profilePhotoEdit}
        onClose={() => {
          setProfilePhotoEdit(false);
          setPreviewURL("");
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          style={{ padding: "2rem", minWidth: "300px", textAlign: "center" }}
        >
          <h2
            style={{
              marginBottom: "1rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Upload your New Profile Photo
          </h2>

          <Button
            disabled={profilePhotoLoader}
            variant="contained"
            component="label"
            style={{
              marginBottom: "1rem",
              backgroundColor: "#1976d2",
              color: "white",
              textTransform: "none",
              fontWeight: "500",
              borderRadius: "8px",
              padding: "0.5rem 1.2rem",
            }}
          >
            Choose File
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          {previewURL && (
            <div
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={previewURL}
                alt="Preview"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          )}

          <div
            style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            <Button
              variant="outlined"
              disabled={profilePhotoLoader}
              onClick={() => {
                setProfilePhotoEdit(false);
                setPreviewURL("");
              }}
              style={{
                background: "gray",
                borderRadius: "8px",
                color: "white",
                minWidth: "100px",
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              disabled={profilePhotoLoader}
              onClick={handlePhotoUpload}
              style={{
                backgroundColor: "orange",
                color: "white",
                textTransform: "none",
                borderRadius: "8px",
                minWidth: "100px",
              }}
              autoFocus
            >
              {profilePhotoLoader ? (
                <span className="flex items-center gap-2">
                  <span className="loader-small" />
                  Uploading...
                </span>
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default PictureSection;

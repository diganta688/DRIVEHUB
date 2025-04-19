import axios from "axios";
import { toast } from "react-toastify";

export const handleSubmit = async (
  setNameSubmitLoader,
  setUserProfileInfo,
  userProfileAllInfo,
  setNameEdit,
  who = "",
  id
) => {
  try {
    setNameSubmitLoader(true);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/${who}/updateinfo/${id}`,
      { name: userProfileAllInfo.name },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      toast.success("Name updated successfully");
      setUserProfileInfo((prev) => ({
        ...prev,
        name: userProfileAllInfo.name,
      }));
    } else {
      toast.error("Failed to update user information");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong while updating info");
  } finally {
    setNameSubmitLoader(false);
    setNameEdit(false);
  }
};

export const handlePhotoUpload = async (
  selectedFile,
  id,
  setProfilePhotoLoader,
  setUserProfileInfo,
  setProfilePhotoEdit,
  setPreviewURL,
  who
) => {
  if (!selectedFile) {
    toast.error("Please select a photo first.");
    return;
  }
  setProfilePhotoLoader(true);

  try {
    const formData = new FormData();
    formData.append("file", selectedFile);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/${who}/updatephoto/${id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      toast.success("Profile photo updated successfully!");
      setUserProfileInfo((prev) => ({
        ...prev,
        profilePhoto: response.data.photoUrl,
      }));
    } else {
      toast.error("Failed to update profile photo");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong while uploading");
  } finally {
    setProfilePhotoLoader(false);
    setProfilePhotoEdit(false);
    setPreviewURL("");
  }
};

export const handleProfileInfoUpload = async (locationData, who = "", id) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/${who}/update-location/${id}`,
      locationData
    );
    const result = response.data;
    if (!result.success) {
      toast.error(result.message || "Failed to update location.");
    }
    return result;
  } catch (error) {
    console.error("Error updating location:", error);
    const errorMessage =
      error?.response?.data?.message ||
      "An error occurred while updating location.";
    toast.error(errorMessage);
    throw error;
  }
};

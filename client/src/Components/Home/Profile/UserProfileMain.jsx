import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PictureSection from "./PictureSection";
import PersonalInformation from "./PersonalInformation";
import MemberShipInfo from "./MemberShipInfo";
import CarRentHistory from "./CarRentHistory";
import HistoryIcon from "@mui/icons-material/History";
import { UserProfileContext } from "../../../Context/context";

function UserProfileMain() {
  const { id } = useParams();
  const [userProfileAllInfo, setUserProfileAllInfo] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [profilePhotoEdit, setProfilePhotoEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [profilePhotoLoader, setProfilePhotoLoader] = useState(false);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/getUserInfo/${id}`
        );
        if (response.status === 200) {
          setUserProfileInfo(response.data.user);
          setUserProfileAllInfo(response.data.user);
        } else {
          toast.error("Failed to fetch user info");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    };
    if (id) getUserInfo();
  }, [id]);

  const handleSubmit = async () => {
    try {
      setSubmitLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/updateinfo/${id}`,
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
      setSubmitLoader(false);
      setNameEdit(false);
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a photo first.");
      return;
    }
    setProfilePhotoLoader(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/updatephoto/${id}`,
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

  return (
    <UserProfileContext.Provider
      value={{
        userProfileInfo,
        setUserProfileInfo,
        nameEdit,
        setNameEdit,
        profilePhotoEdit,
        setProfilePhotoEdit,
        userProfileAllInfo,
        setUserProfileAllInfo,
        handleSubmit,
        submitLoader,
        setSubmitLoader,
        profilePhotoLoader,
        setProfilePhotoLoader,
      }}
    >
      <div className="min-h-screen bg-gray-100">
        <div className="bg-blue-600 h-48"></div>
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28"
          style={{ position: "relative", bottom: "8rem" }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden pb-5">
            <div className="p-6 sm:p-8 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row items-center p-4">
                <PictureSection
                  handlePhotoUpload={handlePhotoUpload}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  setPreviewURL={setPreviewURL}
                  previewURL={previewURL}
                />
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-8">
              <PersonalInformation userProfileInfo={userProfileInfo} />
              <MemberShipInfo />
              {userProfileInfo?.RentHistory > 0 ? (
                <CarRentHistory />
              ) : (
                <>
                  <div
                    className="bg-gray-50 rounded-xl p-4 mx-4 mt-4 flex"
                    style={{ justifyContent: "center" }}
                  >
                    <div className="">
                      <HistoryIcon sx={{ marginRight: "0.5rem" }} />
                      you doesn't rent any car till now
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </UserProfileContext.Provider>
  );
}

export default UserProfileMain;

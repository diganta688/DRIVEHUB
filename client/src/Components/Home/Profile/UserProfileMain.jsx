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
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

function UserProfileMain() {
  const { id } = useParams();
  const [userProfileAllInfo, setUserProfileAllInfo] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [profilePhotoEdit, setProfilePhotoEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [nameSubmitLoader, setNameSubmitLoader] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [profilePhotoLoader, setProfilePhotoLoader] = useState(false);
  const [profileInfoOpen, setProfileInfoOpen] = useState(false);
  const [emailValidOpen, setEmailValidOpen] = useState(false);
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
      }}
    >
      <div className="min-h-screen bg-gray-100">
        <div className="bg-blue-600 h-48"></div>
        <div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28"
          style={{ position: "relative", bottom: "8rem" }}
        >
          <button
            onClick={() => window.history.back()}
            className="absolute top-2 left-7 text-gray-600 hover:text-gray-900 transition"
          >
            <NavigateBeforeIcon fontSize="large" />
          </button>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden pb-5">
            <div className="p-6 sm:p-8 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row items-center p-4">
                <PictureSection
                  setSelectedFile={setSelectedFile}
                  setPreviewURL={setPreviewURL}
                  previewURL={previewURL}
                  profilePhotoLoader={profilePhotoLoader}
                  nameSubmitLoader={nameSubmitLoader}
                  setNameSubmitLoader={setNameSubmitLoader}
                  setProfilePhotoLoader={setProfilePhotoLoader}
                  selectedFile={selectedFile}
                />
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-8">
              <PersonalInformation
                profileInfoOpen={profileInfoOpen}
                setProfileInfoOpen={setProfileInfoOpen}
                setEmailValidOpen={setEmailValidOpen}
                emailValidOpen={emailValidOpen}
              />
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

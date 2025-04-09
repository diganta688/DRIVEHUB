import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getGravatarUrl } from "../../../Context/context";
import PictureSection from "./PictureSection";
import PersonalInformation from "./PersonalInformation";
import MemberShipInfo from "./MemberShipInfo";
import CarRentHistory from "./CarRentHistory";
import HistoryIcon from "@mui/icons-material/History";

function UserProfileMain() {
  const { id } = useParams();
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/getUserInfo/${id}`
        );
        if (response.status === 200) {
          setUserProfileInfo(response.data.user);
          const avatarUrl = getGravatarUrl(response.data.user.email);
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
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 h-48"></div>
      <div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28"
        style={{ position: "relative", bottom: "8rem" }}
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden pb-5">
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-center p-4">
              <PictureSection userProfileInfo={userProfileInfo} />
            </div>
          </div>
          <div className="p-6 sm:p-8 space-y-8">
            <PersonalInformation userProfileInfo={userProfileInfo} />
            <MemberShipInfo />
            {userProfileInfo?.RentHistory > 0 ? (
              <CarRentHistory />
            ) : (
              <>
                <div className="bg-gray-50 rounded-xl p-4 mx-4 mt-4 flex" style={{justifyContent: "center"}}>
                  <div className="">
                  <HistoryIcon sx={{marginRight: "0.5rem"}}/>
                  you doesn't rent any car till now
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileMain;

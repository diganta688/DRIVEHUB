import React from "react";
import HomeHero from "./Components/LandingPage/HomeHero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLoginRight from "./Components/Auth/User/Login/right/UserLoginRight";
import UserSignupRight from "./Components/Auth/User/Signup/Right/UserSignup";
import Work from "./Components/HowWork/Work";
import Homee from "./Components/Home/Homee";
import CarDescription from "./Components/Home/Description/CarDescription";
import { ToastContainer, Slide } from "react-toastify";
import ListYourCar from "./Components/Host/ListYourCar";
import HostLogin from "./Components/Auth/Host/HostLogin";
import HostSignupMain from "./Components/Auth/Host/Signup/HostSignupMain";
import Home from "./Components/HostHome/Home";
import LeftPart from "./Components/Home/Search/LeftPart";
import "react-toastify/dist/ReactToastify.css";
import ComfirmBookingMain from "./Components/Home/ComfirmBooking/ComfirmBookingMain";
import UserProfileMain from "./Components/Home/Profile/UserProfileMain";
import HostProfileMain from "./Components/HostHome/Profile/HostProfileMain";

function App() {
  return (
    <>
      <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
          />
          <Routes>
            <Route path="/" element={<HomeHero />} />
            <Route path="/log-in" element={<UserLoginRight />} />
            <Route path="/sign-up" element={<UserSignupRight />} />
            <Route path="/how-it-work" element={<Work />} />
            <Route path="/home" element={<Homee />} />
            <Route path="/user/:id/profile" element={<UserProfileMain />} />
            <Route path="/host/:id/profile" element={<HostProfileMain />} />
            <Route path="/modify-search" element={<LeftPart />} />
            <Route path="/car-description/:id" element={<CarDescription />} />
            <Route
              path="/confirm-booking/:id"
              element={<ComfirmBookingMain />}
            />
            <Route path="/host" element={<ListYourCar />} />
            <Route path="/host/login" element={<HostLogin />} />
            <Route path="/host/signup" element={<HostSignupMain />} />
            <Route path="/host/home" element={<Home />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

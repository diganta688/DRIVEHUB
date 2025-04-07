import React, { useRef, useEffect } from "react";
import HomeHero from "./Components/LandingPage/HomeHero";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import UserLoginRight from "./Components/Auth/User/Login/right/UserLoginRight";
import UserSignupRight from "./Components/Auth/User/Signup/Right/UserSignup";
import Work from "./Components/HowWork/Work";
import Homee from "./Components/Home/Homee";
import CarDescription from "./Components/Home/Description/CarDescription";
import { ToastContainer, Slide } from "react-toastify";
import ListYourCar from "./Components/Host/ListYourCar";
import HostLogin from "./Components/Auth/Host/HostLogin";
import HostSignupMain from "./Components/Auth/Host/Signup/HostSignupMain";
import Home from "./Components/HostHome/Home"
import LeftPart from "./Components/Home/Search/LeftPart";
import 'react-toastify/dist/ReactToastify.css';
import ComfirmBookingMain from "./Components/Home/ComfirmBooking/ComfirmBookingMain";

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}
function MainApp() {
  const location = useLocation();
  const previousURL = useRef(null);
  useEffect(() => {
    previousURL.current = location.pathname + location.search;     
  }, [location]);
  return (
    <>
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
        <Route path="/modify-search" element={<LeftPart />} />
        <Route path="/car-description/:id" element={<CarDescription previousURL={previousURL.current} />} />
        <Route path="/host" element={<ListYourCar />} />
        <Route path="/host/login" element={<HostLogin />} />
        <Route path="/host/signup" element={<HostSignupMain />} />
        <Route path="/host/home" element={<Home />} />
        <Route path="/confirm-booking/:id" element={<ComfirmBookingMain />} />
      </Routes>
    </>
  );
}

export default App;

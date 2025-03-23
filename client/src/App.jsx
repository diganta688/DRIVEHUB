import HomeHero from "./Components/LandingPage/HomeHero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLoginRight from "./Components/Auth/User/Login/right/UserLoginRight";
import UserSignupRight from "./Components/Auth/User/Signup/Right/UserSignup";
import Work from "./Components/HowWork/Work";
import Homee from "./Components/Home/Homee";
import ModifySearch from "./Components/Home/Search/ModifySearch";
import CarDescription from "./Components/Home/Description/CarDescription";
import { ToastContainer, Slide } from "react-toastify";
import ListYourCar from "./Components/Host/ListYourCar";
import HostLogin from "./Components/Auth/Host/HostLogin";
import HostSignupMain from "./Components/Auth/Host/Signup/HostSignupMain";
import Home from "./Components/HostHome/LeftSection/Home"

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeHero />} />
          <Route path="/log-in" element={<UserLoginRight />} />
          <Route path="/sign-up" element={<UserSignupRight />} />
          <Route path="/how-it-work" element={<Work />} />
          <Route path="/home" element={<Homee />} />
          <Route path="/modify-search" element={<ModifySearch />} />
          <Route path="/car-description" element={<CarDescription />} />
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

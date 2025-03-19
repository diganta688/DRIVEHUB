import HomeHero from "./Components/LandingPage/HomeHero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLoginRight from "./Components/Auth/User/Login/right/UserLoginRight"
import UserSignupRight from "./Components/Auth/User/Signup/Right/UserSignup"
import Work from "./Components/HowWork/Work";
import Homee from "./Components/Home/Homee";
import ModifySearch from "./Components/Home/Search/ModifySearch";
import CarDescription from "./Components/Home/Description/CarDescription";
import { ToastContainer, Flip } from "react-toastify";
import ListYourCar from "./Components/Host/ListYourCar";
import HostLogin from "./Components/Auth/Host/HostLogin";
import HostSignup from "./Components/Auth/Host/HostSignup";


function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={5}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
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
          <Route path="/host/signup" element={<HostSignup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import HomeHero from "./Components/LandingPage/HomeHero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import Work from "./Components/HowWork/Work";
import Homee from "./Components/Home/Homee";
import ModifySearch from "./Components/Home/Search/ModifySearch";
import CarDescription from "./Components/Home/Description/CarDescription";
import { ToastContainer, Flip } from "react-toastify";
import ListYourCar from "./Host/ListYourCar";


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
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/how-it-work" element={<Work />} />
          <Route path="/home" element={<Homee />} />
          <Route path="/modify-search" element={<ModifySearch />} />
          <Route path="/car-description" element={<CarDescription />} />
          <Route path="/host/login" element={<ListYourCar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

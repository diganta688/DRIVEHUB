import React from "react";
import { useEffect, useState } from "react";
import HomeHeroDatePicker from "./HomeHeroDatePicker";
import HomeHeroNav from "./HomeHeroNav";
import Tagline from "./Tagline";
import ImageGalaryText from "./ImageGalaryText";
import WhyUs from "./WhyUs";
import Questions from "./Questions";
import BookCarImage from "./BookCarImage";
import Footer from "./Footer";
import CircularGallery from "./CircularGallery";
import Hyperspeed from "./Hyperspeed";
import { hyperspeedPresets } from "./presets";
import RollingGallery from "./RollingGallery";
import axios from "axios";

function HomeHero() {
  const [isMouse, setIsMouse] = useState(false);
  const [display, setDisplay] = useState(true);
  const [city, setCity] = useState([]);
  useEffect(() => {
    const hasMouse = window.matchMedia("(pointer: fine)").matches;
    setIsMouse(hasMouse);
  });
  const cities = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/get-cities`,
        { withcredentials: true }
      );
      if (response) {        
        setCity(response.data.cities);
      } else {
        console.error("Error fetching cities:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  useEffect(() => {
    cities();
  }, []);

  return (
    <div className="main-home-hero">
      <div className="HomeHeroVideo">
        <HomeHeroNav
          display={display}
          mainclass="nav-main"
          navItemMain="nav-item-main"
          navItemUser="nav-items-user"
          Home="home"
          img="\media\Images\logo.png"
          imgClass="nav-logo"
          is={false}
        />
        {isMouse && <p className="chakra-text css-1gyytsn">Click Me</p>}
        <div
          className="background-video"
          style={{
            width: "100%",
            backgroundColor: "black",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Hyperspeed effectOptions={hyperspeedPresets.four} />
        </div>
        <HomeHeroDatePicker availableCities={city}/>
        <Tagline />
        <div className="image-galary-main px-3">
          <div className="image-galary">
            <RollingGallery autoplay={true} pauseOnHover={true} />
          </div>
          <div
            className="image-text"
            style={{ width: "38%", display: "flex", alignItems: "center" }}
          >
            <ImageGalaryText
              q="Our Top Selling Cars"
              ans="Our top-selling cars combine performance, style, and reliability, making them the perfect choice for drivers of all kinds. With sleek designs, advanced technology, and fuel-efficient engines, these models offer the best value for your money. Whether you're looking for a compact city car, a powerful SUV, or a luxurious sedan, our bestsellers deliver comfort, safety, and an unbeatable driving experience. Explore our top models today and find the perfect ride for your needs!"
            />
          </div>
        </div>
        <div className="image-galary-main img-width p-3">
          <div
            className="image-text"
            style={{ width: "38%", display: "flex", alignItems: "center" }}
          >
            <ImageGalaryText
              q="Top Cities We Serve"
              ans="Experience seamless travel with our hassle-free rentals, whether you're exploring the vibrant energy of the capital, cruising through the city of dreams, or navigating the bustling IT hub. Enjoy smooth journeys along scenic coastal routes, stress-free rides in a city rich with heritage, and the perfect getaway for your weekend adventures. Wherever your destination, we ensure a comfortable and effortless ride every time."
            />
          </div>
          <div className="image-galary">
            <CircularGallery />
          </div>
        </div>
        <div className="image-galary-main img-display p-3">
          <div className="image-galary">
            <CircularGallery />
          </div>
          <div
            className="image-text"
            style={{
              width: "38%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImageGalaryText
              q="Top Cities We Serve"
              ans="Experience seamless travel with our hassle-free rentals, whether you're exploring the vibrant energy of the capital, cruising through the city of dreams, or navigating the bustling IT hub. Enjoy smooth journeys along scenic coastal routes, stress-free rides in a city rich with heritage, and the perfect getaway for your weekend adventures. Wherever your destination, we ensure a comfortable and effortless ride every time."
            />
          </div>
        </div>
        <BookCarImage />
        <WhyUs />
        <Questions />
        <Footer />
      </div>
    </div>
  );
}

export default HomeHero;

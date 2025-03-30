import React from "react";
import { useRef, useEffect, useState } from "react";
import HomeHeroDatePicker from "./HomeHeroDatePicker";
import HomeHeroNav from "./HomeHeroNav";
import Tagline from "./Tagline";
import ImageGalary from "./ImageGalary";
import ImageGalaryText from "./ImageGalaryText";
import WhyUs from "./WhyUs";
import Questions from "./Questions";
import BookCarImage from "./BookCarImage";
import Footer from "./Footer";
import CircularGallery from "./CircularGallery";
import axios from "axios";

function HomeHero() {
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    check();
  }, []);
  const check = async () => {
    await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/auth/home`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status !== 200) {
          setDisplay(false);
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setDisplay(false);
        }
      });
  };
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
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
        <video
          className="background-video"
          ref={videoRef}
          src="/media/hommee.mp4"
          autoPlay
          muted
          loop
        />
        <HomeHeroDatePicker />
        <Tagline />
        <div className="image-galary-main">
          <div className="image-galary">
            <ImageGalary />
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
        <div className="image-galary-main img-width">
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
        <div className="image-galary-main img-display">
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

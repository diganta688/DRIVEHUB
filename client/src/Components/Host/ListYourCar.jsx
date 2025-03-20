import React, { useState, useEffect } from "react";
import HomeHeroNav from "../LandingPage/HomeHeroNav";
import HostInfo from "./HostInfo";
import Footer from "../LandingPage/Footer";
import LocationFind from "./LocationFind";
import { useNavigate } from "react-router";

function ListYourCar() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  let navigate = useNavigate();

const click = ()=>{
  navigate("/host/login")
}

  return (
    <>
      <HomeHeroNav
        display={true}
        mainclass="nav-main-list"
        navItemMain="nav-item-main-list"
        navItemUser="nav-items-user-list"
        Home="homee"
        img="media/Images/logo.png"
        imgClass="nav-logo-list"
        is={true}
      />
      <div className="host-main">
        <div className="host-top">
          <div className="inner-host-top">
            <h6>Find your drive</h6>
            <h1 className="inner-host-h1">Start a car-sharing business on DriveHUB</h1>
            <button className="get-started-btn btn btn-primary" onClick={click}>
              Get started
            </button>
          </div>
        </div>
        <div className="host-img">
          <img
            src="https://resources.turo.com/f/81934/1000x667/68efbdaf74/us_list-your-car.jpg/m/"
            alt="Car Listing"
          />
        </div>
        <div className="host-text px-4">
          <p>Take control of your financial future while cultivating your entrepreneurial fire with DriveHUB.</p>
          <p>
            DriveHUB gives budding entrepreneurs the tools they need to build a small, successful portfolio of cars to
            share on the marketplace.
          </p>
          <p>List your first car now to get started!</p>
          <button className="get-started-btn btn btn-primary" style={{ width: "100%" }} onClick={click}>
            Get started
          </button>
        </div>
        <HostInfo />
        <div className="host-end px-4">
          <h1 className="inner-host-h1">Start building your business plan</h1>
          <p>List your first car to get started today and take control of your financial future.</p>
          <button className="get-started-btn btn btn-primary" style={{ width: "100%" }} onClick={click}>
            Get started
          </button>
        </div>
      </div>
      <Footer />
      <LocationFind open={open} setOpen={setOpen} setCount={setCount}/>
    </>
  );
}

export default ListYourCar;

import React from "react";
import HomeHeroNav from "../Components/LandingPage/HomeHeroNav";
import HostInfo from "./HostInfo";
import Footer from "../Components/LandingPage/Footer"

function ListYourCar() {
  return (
    <>
      <HomeHeroNav
        display={true}
        mainclass="nav-main-list"
        navItemMain="nav-item-main-list"
        navItemUser="nav-items-user-list"
        Home="homee"
        img="\media\Images\logo.png"
        imgClass="nav-logo-list"
        is={true}
      />
      <div className="host-main">
        <div className="host-top">
          <div className="inner-host-top">
            <div className="">
              <h6>Find your drive</h6>
            </div>
            <div className="">
              <h1 className="inner-host-h1">
                Start a car sharing business on DriveHUB
              </h1>
            </div>
            <div className="">
              <button className="get-started-btn btn btn-primary">
                Get started
              </button>
            </div>
          </div>
        </div>
        <div className="host-img">
          <img
            src="https://resources.turo.com/f/81934/1000x667/68efbdaf74/us_list-your-car.jpg/m/"
            alt=""
          />
        </div>
        <div className="host-text">
          <div>
            <p>
              Take control of your financial future while cultivating your
              entrepreneurial fire with DriveHUB, the world’s largest car
              sharing marketplace.
            </p>
          </div>
          <div>
            <p>
              DriveHUB gives budding entrepreneurs the tools and resources they
              need to build a small, successful portfolio of cars to share on
              the marketplace, and the opportunity to add thousands to their
              annual income.
            </p>
          </div>
          <div>
            <p>
              List your first car now to get started, then build your business
              plan and scale how you want!
            </p>
          </div>
          <div className="button-container">
            <button className="get-started-btn btn btn-primary" style={{width: "100%"}}>
              Get started
            </button>
          </div>
        </div>
        <HostInfo />
        <div className="host-end">
          <div className="">
            <h1 className="inner-host-h1">Start building your business plan</h1>
          </div>
          <div className="">
            <p>
              List your first car to get started today and build your plan to
              take control of your financial future tomorrow.
            </p>
          </div>
          <div className="button-container">
            <button className="get-started-btn btn btn-primary" style={{width:"100%"}}>
              Get started
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default ListYourCar;

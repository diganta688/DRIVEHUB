import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomeHeroNav from "../LandingPage/HomeHeroNav";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};
const steps = [
  {
    title: "1. Visit DriveHUB - Explore Car Booking Options",
    description:
      "Users land on the DriveHUB homepage where they can browse available cars, filter by location, car type, and rental price, and view real-time availability.",
    image: "media/Images/landingpage.png",
  },
  {
    title: "2. Create an Account or Log In",
    description:
      "New users can easily sign up using their email, phone number, or social media. Returning users can log in directly to access saved preferences and past bookings.",
    image: "media/Images/login.png",
  },
  {
    title: "3. Search for Cars Based on Preferences",
    description:
      "Users can enter their pickup location, date, time, and vehicle type preferences. Advanced filters allow sorting by brand, model, price, seating capacity, and fuel type.",
    image:
      "https://go.trader.ca/wp-content/uploads/2022/02/Trader_Purchase-Behaviour-Behaviour-Study_Infographic1-EN.png",
  },
  {
    title: "4. View Detailed Car Profiles",
    description:
      "Each car listing includes photos, features (GPS, AC, automatic), pricing, user ratings, and reviews. Users can compare multiple cars side by side before selecting.",
    image:
      "https://img.freepik.com/free-vector/car-auto-service-infographics-design-elements_98292-3917.jpg?t=st=1740673619~exp=1740677219~hmac=77e6ee0eb445bfefd9869a967094b14db0849549604b0b24026008eb614325c7&w=740",
  },
  {
    title: "5. Book the Car",
    description:
      "Once a user finds the perfect car, they can proceed to booking. Users choose rental duration, add optional services like insurance or driver, and confirm the total cost.",
    image:
      "https://selectedfirms.co/public/assets/images/blog_cover_image/567735463_1689147486.webp",
  },
  {
    title: "6. Secure Payment",
    description:
      "DriveHUB offers secure payment options including UPI, credit/debit cards, wallets, and net banking. Instant confirmation is sent via SMS and email after payment.",
    image:
      "https://static.vecteezy.com/system/resources/previews/029/899/733/non_2x/secure-payment-credit-card-icon-with-shield-secure-transaction-stock-illustration-vector.jpg",
  },
  {
    title: "7. Pickup or Delivery",
    description:
      "Users can either pick up the car from the designated location or opt for doorstep delivery. Real-time tracking and contact information are provided for smooth coordination.",
    image:
      "https://www.shutterstock.com/image-vector/lined-isometric-car-rental-cleaning-260nw-2568488809.jpg",
  },
  {
    title: "8. Enjoy the Ride",
    description:
      "DriveHUB vehicles are inspected before every trip to ensure cleanliness and safety. Users can contact 24/7 support if any issues arise during the rental period.",
    image:
      "https://www.trendingus.com/wp-content/uploads/2017/11/Image-1-1024x594.jpg.webp",
  },
  {
    title: "9. Return & Review",
    description:
      "After returning the car, users can rate their experience and leave a review for the car owner and DriveHUB service. Feedback helps maintain high-quality service.",
    image:
      "https://cdn.pixabay.com/photo/2016/11/15/07/58/return-1825515_1280.jpg",
  },
  {
    title: "10. Loyalty Rewards & Offers",
    description:
      "Returning users can earn loyalty points, unlock discounts, and access exclusive offers for future bookings. DriveHUB values loyal customers with perks and benefits.",
    image:
      "https://cm-cdn.creditmantri.com/community/article/need-to-know-about-credit-card-reward-offers.jpg",
  },
];

const HowItWorks = () => {
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
      <div className="min-h-screen " style={{ padding: "5rem 1rem 0 1rem" }}>
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          className="text-center py-16"
        >
          {/* <img src="media\Images\logo.png" alt="" style={{width: "20%"}}/> */}
          <h1 className="text-5xl font-bold mb-6">
            How DriveHUB Car Booking Works
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            From your first visit to booking a car and leaving feedback,
            DriveHUB provides a seamless experience. Follow this step-by-step
            guide to understand the process.
          </p>
        </motion.header>
        <motion.div
          className="space-y-20 max-w-6xl mx-auto px-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`flex flex-col md:flex-row items-center gap-6 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="md:w-1/2 text-center md:text-left">
                <motion.h2
                  className="text-3xl font-bold mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  {step.title}
                </motion.h2>
                <p className="text-lg leading-relaxed">{step.description}</p>
              </div>
              <motion.div className="md:w-1/2" whileHover={{ scale: 1.05 }}>
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-xl shadow-xl"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.5 },
          }}
          className="text-center py-16 mt-20 bg-white text-gray-900 mt-5 pb-5"
        >
          <h2 className="text-4xl font-bold">
            Book Your Perfect Car Today with DriveHUB
          </h2>
          <p className="text-lg mt-4">
            Start your journey with DriveHUB - Safe, reliable, and flexible car
            rentals for all your needs.
          </p>
          <Link to="/log-in">
            <button
              className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
              style={{ borderRadius: "15px", padding: "0 1.5rem" }}
            >
              Find Your Car Now
            </button>
          </Link>
        </motion.footer>
      </div>
    </>
  );
};

export default HowItWorks;

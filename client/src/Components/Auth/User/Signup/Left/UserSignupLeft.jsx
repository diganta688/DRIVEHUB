import React, { useState, useEffect } from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

function UserSignupLeft() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  return (
    <div className="relative  via-teal-400 to-fuchsia-400 p-8 text-center text-white md:w-1/2">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        src="media/signupp.mp4"
      ></video>
      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center transition-all duration-1000 ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Link to="/"><HomeIcon className="absolute top-5 left-5 text-white text-3xl cursor-pointer" /></Link>
        <h2 className="mb-4 text-4xl font-bold">Join Us!</h2>
        <p className="mb-8 text-lg">Create an account to enjoy all our features.</p>
        <div className="flex space-x-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30 cursor-pointer">
            <FaGithub className="text-white text-xl" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30 cursor-pointer">
            <FaTwitter className="text-white text-xl" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30 cursor-pointer">
            <FaLinkedin className="text-white text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignupLeft;

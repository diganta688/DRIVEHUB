import React, {useState} from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";


function UserLoginLeft() {
    const [animate, setAnimate] = useState(false);
  return (
    <div className="relative p-8 text-center text-white md:w-1/2 p-3">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="media\loginn.mp4"
      ></video>
      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center transition-all duration-1000 ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="mb-4 text-4xl font-bold">Welcome Back!</h2>
        <p className="mb-8">
          Log in to access your personalized dashboard and continue your journey
          with us.
        </p>
        <div
          className="flex space-x-4"
          style={{ width: "40%", justifyContent: "space-between" }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30">
            <FaGithub className="text-white" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30">
            <FaTwitter className="text-white" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-all hover:bg-white/30">
            <FaLinkedin className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLoginLeft;

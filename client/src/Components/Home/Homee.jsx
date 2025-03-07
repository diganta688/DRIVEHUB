import React, { useEffect, useState } from "react";
import HomeSearch from "./Search/HomeSearch";
import HomeTop from "./HomeTop";
import Dashboard from "./Dashboard/Dashboard";
import axios from "axios";

function Homee() {
  useEffect(() => {
    check();
  }, []);
  const check = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/home`,
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        window.location.href = `${
          import.meta.env.VITE_FRONTEND_URL
        }/log-in`;
      }
    }
  }
  return (
    <div className="">
      <HomeTop />
      <HomeSearch />
      <Dashboard />
    </div>
  );
}

export default Homee;

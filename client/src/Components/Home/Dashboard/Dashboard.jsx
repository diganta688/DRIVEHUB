import React, { useState } from "react";
import LeftFilter from "./LeftFilter";
import RightResult from "./RightResult";

function Dashboard() {
  const [cars, setCars] = useState([{
    brand: "Hyundai",
    name: "Grand i10 (P)",
    fuel: "Petrol",
    transmission: "Manual",
    seater: 5,
    price: "7,056",
    image: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_3.jpg"
  },
  {
    brand: "Maruti",
    name: "Swift (P)",
    fuel: "Petrol",
    transmission: "Manual",
    seater: 5,
    price: "7,621",
    image: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_3.jpg"
  },
  {
    brand: "Maruti",
    name: "Swift Dzire (P)",
    fuel: "Petrol",
    transmission: "Manual",
    seater: 5,
    price: "8,891",
    image: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_3.jpg"
  },
  {
    brand: "Maruti",
    name: "Swift Dzire (P)",
    fuel: "Petrol",
    transmission: "Manual",
    seater: 5,
    price: "8,891",
    image: "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_3.jpg"
  },]) 
  return (
    <div className="flex flex-row py-5 " style={{maxWidth: "1500px", margin: "0 auto"}}>
      <LeftFilter />
      <RightResult cars={cars}/>
    </div>
  );
}

export default Dashboard;

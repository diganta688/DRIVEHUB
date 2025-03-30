import React, { useEffect, useState } from "react";
import LeftFilter from "./LeftFilter";
import RightResult from "./RightResult";
import { useSearchParams } from "react-router-dom";

function Dashboard({cars, setCars}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredCars, setFilteredCars] = useState([]);
  useEffect(() => {
    const city = searchParams.get("city");

    if (city) {
      const filtered = cars.filter(car => car.city.toLowerCase() === city.toLowerCase());
      setFilteredCars(filtered);
    } else {
      setFilteredCars([]); // Display "No car available" when no filter is applied
    }
  }, [searchParams, cars]);

  return (
    <div className="flex flex-row pt-5 " style={{ maxWidth: "2000px", margin: "0 auto" }}>
      <LeftFilter setSearchParams={setSearchParams} />
      <RightResult cars={filteredCars} />
    </div>
  );
}

export default Dashboard;



// import React, { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';

// const Dashboard = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [name, setName] = useState(searchParams.get("name") || "");
//   const [age, setAge] = useState(searchParams.get("age") || "");

//   const handleChange = (key, value) => {
//     // Update state
//     if (key === "name") setName(value);
//     if (key === "age") setAge(value);

//     // Update URL query instantly
//     const params = new URLSearchParams(searchParams);
//     if (value) {
//       params.set(key, value);
//     } else {
//       params.delete(key); // Remove param if value is empty
//     }
//     setSearchParams(params);
//   };

//   return (
//     <div>
//       <h1>Query Parameter Demo</h1>
//       <div>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => handleChange("name", e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Age:
//           <input
//             type="text"
//             value={age}
//             onChange={(e) => handleChange("age", e.target.value)}
//           />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default Dashboard ;

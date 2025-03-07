import React, { useState, useEffect } from "react";
import LeftPart from "./LeftPart";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Link } from "react-router-dom";
import Filter from "./Filter";

function HomeSearch({
  location = "Goa",
  startDate = "7 Mar",
  startTime = "10:00 pm, Sat",
  endDate = "14 Mar",
  endTime = "12:00 pm, Fri",
  duration = "6 days, 14 hrs",
  onOpenFilters,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="responsive-container px-3">
      
      {!isMobile ? (
        <div className="flex justify-between px-5">
          <LeftPart />
        </div>
      ) : (
       <> <div className="flex flex-wrap items-center justify-between gap-4 p-1 bg-white shadow-sm border rounded-lg" style={{width: "100%"}}>
       <div className="flex items-center gap-6 flex-wrap" style={{width: "100%"}}>
         <div
           className=""
           style={{
             width: "100%",
             display: "flex",
             justifyContent: "space-between",
             padding: "0 1rem",
           }}
         >
           <div className="text-lg font-semibold">{location}</div>
           <div className="">
             <Link to="/modify-search" style={{ color: "orange" }}>
               Modify Search
             </Link>
           </div>
         </div>
         <div className="flex items-center gap-2 text-gray-600" style={{margin: "0 auto"}}>
           <div className="text-right">
             <div className="text-lg font-medium text-black">{startDate}</div>
             <div className="text-sm">{startTime}</div>
           </div>
           <div className="flex items-center gap-1">
             <span className="w-16 h-px bg-gray-400"></span>
             <span className="text-sm text-gray-500">{duration}</span>
             <span className="w-16 h-px bg-gray-400"></span>
           </div>
           <div className="text-left">
             <div className="text-lg font-medium text-black">{endDate}</div>
             <div className="text-sm">{endTime}</div>
           </div>
         </div>
       </div>
     </div>
       <div className="flex flex-col gap-4 mt-3">
         <button
           className="filter-button border-2 border-black rounded-lg p-2 w-24 ml-12 flex items-center gap-1"
           onClick={() => setShowFilter(!showFilter)}
           style={{ borderRadius: "10px" }}
         >
           {showFilter ? (
             <>
               <FilterAltOffIcon /> Filter
             </>
           ) : (
             <>
               <FilterAltIcon /> Filter
             </>
           )}
         </button>
         {showFilter && (
           <div className="">
             <div className="filter-button  p-2 ml-12 flex items-center gap-1">
              <Filter/>
             </div>
           </div>
         )}
       </div></>
      )}
    </div>
  );
}

export default HomeSearch;

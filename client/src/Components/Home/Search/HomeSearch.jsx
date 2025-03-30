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
        <>
          {" "}
          <div className="flex flex-wrap items-center justify-between gap-4 p-1 bg-white shadow-sm border rounded-lg w-full">
            <div className="flex items-center justify-between w-full px-4 py-2">
              <div className="text-lg font-semibold">{location}</div>
              <div>
                <Link
                  to="/modify-search"
                  className="text-orange-500"
                  style={{ color: "#FF6A00" }}
                >
                  Modify Search
                </Link>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 w-full justify-center py-2">
              <div className="text-center sm:text-right">
                <div className="text-lg font-medium text-black">
                  {startDate}
                </div>
                <div className="text-sm">{startTime}</div>
              </div>
              <div className="flex items-center gap-1 justify-center">
                <span className="w-12 sm:w-16 h-px bg-gray-400"></span>
                <span className="text-sm text-gray-500">{duration}</span>
                <span className="w-12 sm:w-16 h-px bg-gray-400"></span>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-lg font-medium text-black">{endDate}</div>
                <div className="text-sm">{endTime}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-3 px-4">
            <button
              className="border-2 border-black rounded-lg p-2 w-28 flex items-center gap-1 justify-center transition-all duration-300 hover:bg-black hover:text-white"
              onClick={() => setShowFilter(!showFilter)}
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
              <div className="mt-2">
                <div className="p-2 flex items-center gap-1 bg-white shadow-sm border rounded-lg">
                  <Filter />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default HomeSearch;

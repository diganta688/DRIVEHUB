import React, { useState, useEffect } from "react";
import LeftPart from "./LeftPart";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import BlurText from "../BlueText";
import { useContext } from "react";
import { UserHomeContext } from "../../../Context/context";

function HomeSearch({
  location = "Goa",
  startDate = "7 Mar",
  startTime = "10:00 pm, Sat",
  endDate = "14 Mar",
  endTime = "12:00 pm, Fri",
  duration = "6 days, 14 hrs",
  onOpenFilters,
}) {
  const { user } = useContext(UserHomeContext);
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
      <div className="flex justify-center pt-3">
        {user && user.name && (
          <BlurText
            text={`Hey ${user.name}! welcome back`}
            animateBy="words"
            delay={150}
            className="text-2xl mb-8"
          />
        )}
      </div>
      {!isMobile ? (
        <div className="flex justify-between px-5">
          <LeftPart user={user} />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 align-items-center w-full md:w-auto justify-center">
            <div
              className="flex flex-wrap items-center justify-between gap-1 p-1 bg-white shadow-sm border rounded-lg w-full overflow-hidden"
              style={{ maxHeight: "120px" }}
            >
              <div className="flex items-center justify-between w-full px-2 py-1">
                <div className="text-sm font-semibold truncate">{location}</div>
                <div>
                  <Link
                    to="/modify-search"
                    className="text-orange-500 text-xs"
                    style={{ color: "#FF6A00" }}
                  >
                    Modify Search
                  </Link>
                </div>
              </div>
              <div className="flex flex-col flex-row sm:items-center gap-1 text-gray-600 w-full justify-center py-1 text-xs">
                <div className="text-center sm:text-right">
                  <div className="font-medium text-black truncate">
                    {startDate}
                  </div>
                  <div>{startTime}</div>
                </div>
                <div className="flex items-center gap-1 justify-center">
                  <span className="w-10 sm:w-14 h-px bg-gray-400"></span>
                  <span className="text-xs text-gray-500 truncate">
                    {duration}
                  </span>
                  <span className="w-10 sm:w-14 h-px bg-gray-400"></span>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-medium text-black truncate">
                    {endDate}
                  </div>
                  <div>{endTime}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-3 px-4">
            <button
              className="border-2 border-black rounded-lg flex items-center justify-center transition-all duration-300 p-1"
              onClick={() => setShowFilter(!showFilter)}
              style={{
                height: "32px",
                width: "36px",
                padding: "0",
                borderRadius: "8px",
              }}
            >
              <img
                src="\media\Images\filter.png"
                alt="Filter Icon"
                className="h-full w-full object-contain"
              />
            </button>

            {showFilter && (
              <div className="">
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

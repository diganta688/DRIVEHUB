import React, { useState, useEffect, useRef } from "react";
import { Menu, User, LogOut } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function HostNav({who, info}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const logout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/${who}/logout`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Logout Done", {
          onClose: () => {
            if (who === "user") {
              navigate("/log-in");
            } else if (who === "host") {
              navigate("/host/login");
            }
          },
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout error");
    }
  };
  

  return (
    <nav
      className=" shadow-md p-3 flex justify-between items-center"
      style={{ backgroundColor: "rgba(0, 0, 0)" }}
    >
      <div className="flex items-center">
        <Link to={who=== "user" ? "/" : "/host"}>
          <img
            src="\media\Images\logo.png"
            alt="Logo"
            className="h-7 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />{" "}
        </Link>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          className="flex items-center gap-2 px-2 py-1 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ borderRadius: "10px" }}
        >
          <Menu className="h-6 w-6 text-gray-700" style={{ color: "white" }} />
          <User className="h-6 w-6 text-gray-700" style={{ color: "white" }} />
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 animate-fade-in border"
            style={{ zIndex: "1000" }}
          >
            <Link
              to={`/${who}/${info}/profile`}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <User className="h-5 w-5 mr-2" />{" "}
              <span className="mx-3">Profile</span>
            </Link>
            <button
              className="flex items-center px-4 py-3 text-red-600 hover:bg-gray-100 w-full"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-2" />{" "}
              <span className="mx-3">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default HostNav;

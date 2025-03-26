import React, { useState, useEffect, useRef } from "react";
import { Menu, User, LogOut } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";


function HostNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
          `${import.meta.env.VITE_BACKEND_URL}/auth/host/logout`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          toast.success("Logout Done", {
            onClose: () => {
              window.location.reload();
            },
          });
        }
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Logout error");
      }
    };

  return (
    <nav className="bg-white shadow-md p-3 flex justify-between items-center">
      <div className="flex items-center">
        <img src="\media\Images\logo.png" alt="Logo" className="h-7 w-auto" /> 
      </div>

      <div className="relative" ref={menuRef}>
        <button
          className="flex items-center gap-2 px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{borderRadius: "10px"}}
        >
          <Menu className="h-6 w-6 text-gray-700" />
          <User className="h-6 w-6 text-gray-700" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 animate-fade-in border" style={{zIndex: "1000"}}>
            <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100">
              <User className="h-5 w-5 mr-2" /> <span className="mx-3">Profile</span>
            </a>
            <button className="flex items-center px-4 py-3 text-red-600 hover:bg-gray-100 w-full" onClick={logout}>
              <LogOut className="h-5 w-5 mr-2" /> <span className="mx-3">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default HostNav;

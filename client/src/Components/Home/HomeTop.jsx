import React from 'react';
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";


function HomeTop() {
    return ( <div className="flex justify-between items-center px-5 py-3">
      <div className="w-1/5 md:w-1/6 sm:w-1/3 xs:w-1/2" style={{ minWidth: "150px" }}>
        <img
          src="media/Images/logo.png"
          alt="Logo"
          className="w-full"
        />
      </div>
    
      <div className="flex items-center">
        <div
          className="p-2 flex items-center"
          style={{
            cursor: "pointer",
            background: "rgba(230, 230, 230, 0.3)",
            borderRadius: "20px",
          }}
        >
          <MenuIcon className="mr-2" />
          <PersonIcon />
        </div>
      </div>
    </div>
     );
}

export default HomeTop;
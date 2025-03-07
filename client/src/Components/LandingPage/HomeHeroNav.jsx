import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import RestoreIcon from "@mui/icons-material/Restore";
import { Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

function HomeHeroNav({ display }) {
  const scrollToAbout = () => {
    handleCloseUserMenu();
    window.scrollTo({
      top: 3100,
      behavior: "smooth",
    });
  };
  const scrollToContact = () => {
    handleCloseUserMenu();
    window.scrollTo({
      top: 4400,
      behavior: "smooth",
    });
  };
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, { withCredentials: true });
      if (res.status === 200) {
        window.location.reload();
      }
      toast.success("Logout Done");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout error");
    }
  };
  
  return (
    <div className="nav-main">
      <div className="nav-logo">
        <img src="media/Images/logo.png" alt="Logo" />
      </div>
      <div className="nav-item-main">
        <div className="nav-items home">Home</div>
        <div className="nav-items about" onClick={scrollToAbout}>
          About
        </div>
        <div className="nav-items contact" onClick={scrollToContact}>
          Contact us
        </div>
        <div
          className="nav-items-user"
          onClick={handleOpenUserMenu}
          style={{ cursor: "pointer" }}
        >
          <MenuIcon style={{ marginRight: "0.6rem" }} />
          <PersonIcon />
        </div>
      </div>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {!display && (
          <>
            <Link to="/log-in" style={{}}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography>Log in</Typography>
              </MenuItem>
            </Link>
            <Link to="/sign-up">
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography>Sign up</Typography>
              </MenuItem>
            </Link>
          </>
        )}
        {display && (
          <Link to="/home">
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography>Dashboard</Typography>
            </MenuItem>
          </Link>
        )}
        <div
          className="divider"
          style={{ borderBottom: "1px solid #00000021" }}
        ></div>
        <MenuItem onClick={scrollToAbout} className="about-in-dropdown">
          <DirectionsCarOutlinedIcon style={{ marginRight: "1rem" }} />
          <Typography>About</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <DirectionsCarOutlinedIcon style={{ marginRight: "1rem" }} />
          <Typography>Become a host</Typography>
        </MenuItem>
        <Link to="/how-it-work">
          <MenuItem onClick={handleCloseUserMenu}>
            <AccountTreeRoundedIcon style={{ marginRight: "1rem" }} />
            <Typography>
              <b>How DriveHUB works</b>
            </Typography>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <RestoreIcon style={{ marginRight: "1rem" }} />
          <Typography>My Bookings</Typography>
        </MenuItem>
        <MenuItem onClick={scrollToContact}>
          <SupportAgentIcon style={{ marginRight: "1rem" }} />
          <Typography>Contact support</Typography>
        </MenuItem>
        {display && (
          <MenuItem onClick={handleLogout}>
          <LogoutRoundedIcon style={{ marginRight: "1rem" }} />
          <Typography>Logout</Typography>
        </MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default HomeHeroNav;

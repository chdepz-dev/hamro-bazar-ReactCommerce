import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/logo.png";
import navProfile from "../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={navlogo} alt="" className="nav-log0" />
        <h1>
          Hamro Bazar <span>ADMIN PANEL</span>
        </h1>
      </div>
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  );
};

export default Navbar;

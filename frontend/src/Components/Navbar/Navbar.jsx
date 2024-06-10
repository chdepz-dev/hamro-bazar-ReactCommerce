import React, { useState, useContext } from "react";
import "./Navbar.css";
import logo from "../Assests/logo.png";
import cart_icon from "../Assests/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Contexts/ShopContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState("shop");

  const { getTotalCartItems } = useContext(ShopContext);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleMenuItemClick = (menuName) => {
    setMenu(menuName);
    setOpen(false); // Close the menu
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Hamro Bazar</h1>
        </Link>
      </div>

      <ul className={`nav-menu ${open ? "open" : ""}`}>
        <li onClick={() => handleMenuItemClick("shop")}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            shop
          </Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => handleMenuItemClick("mens")}>
          <Link to="/mens" style={{ textDecoration: "none", color: "black" }}>
            mens
          </Link>
          {menu === "mens" && <hr />}
        </li>
        <li onClick={() => handleMenuItemClick("womens")}>
          <Link to="/womens" style={{ textDecoration: "none", color: "black" }}>
            Womens
          </Link>
          {menu === "womens" && <hr />}
        </li>
        <li onClick={() => handleMenuItemClick("kids")}>
          <Link to="/kids" style={{ textDecoration: "none", color: "black" }}>
            Kids
          </Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link to="/login">
          {localStorage.getItem("auth-token") ? (
            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}>
              Logout
            </button>
          ) : (
            <button>Login</button>
          )}
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="cart icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>

      <div className="mobile-menu-toggler" onClick={toggleMenu}>
        <div className={`hamburger ${open ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

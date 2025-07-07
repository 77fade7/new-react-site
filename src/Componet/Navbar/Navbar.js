import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">cryptotech202</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">PlatformAbout</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
         
      </ul>
    </nav>
  );
};

export default Navbar;
 import React, { useState } from "react";  // أضفت useState فقط
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);  // حالة للتحكم بالعرض
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate(0); // إعادة تحميل الصفحة لإظهار شاشة تسجيل الدخول
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">cryptotech202</div>

      {/* أضفت هنا شرط لتبديل className لعرض القائمة في الجوال */}
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
         <li>
          <Link to="/Apps" onClick={() => setMenuOpen(false)}>digital currencies</Link>
        </li>
         <li>
          <Link to="/Aps" onClick={() => setMenuOpen(false)}>Donations</Link>
        </li>
        <li>
          <Link to="/Depositandwithdrawal" onClick={() => setMenuOpen(false)}>Depositandwithdrawal</Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>PlatformAbout</Link>
        </li>
        <li>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        </li>
        <li>
         
        </li>
        <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="logout-btn"
          >
            Logout
          </button>
      </ul>
      

      {/* زر الهامبرغر */}
      <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
 import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// استدعاء الصفحات
import Home from "./Componet/Home/Home";
import About from "./Componet/About/About";
import Contact from "./Componet/Contact/Contact";
import Services from "./Componet/Services/Services";
import ServicesDeta from "./Componet/ServicesDeta/ServicesDeta";
import Verify from "./Componet/Verify/Verify";
import Apps from "./Componet/Apps/Apps";
import Aps from "./Componet/Aps/Aps";
import Depositandwithdrawal from "./Componet/Deposit.and.withdrawal/Depositandwithdrawal";
// استدعاء المكونات
import Navbar from "./Componet/Navbar/Navbar";
import Footer from "./Componet/Footer/Footer";
import Auth from "./Componet/Auth/Auth";

// استدعاء CSS رئيسي
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("loggedIn", isLoggedIn);
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Auth onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/Apps" element={<Apps />} />
             <Route path="/Depositandwithdrawal" element={<Depositandwithdrawal />} />
             <Route path="/Aps" element={<Aps />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServicesDeta />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
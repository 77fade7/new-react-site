 // PlatformAbout.js
import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="platform-about">
      <section className="about-header">
        <h1>Why Choose Our Investment Platform?</h1>
        <p>
          Our platform was created with one clear mission: to provide a safe, reliable, and
          innovative space for everyone to grow their wealth through cryptocurrency, traditional
          investment, and real estate. We believe in building trust and strong relationships with our
          clients, ensuring their funds are always secure and managed with the highest standards of
          transparency and honesty. Our commitment to our clients is the foundation of everything we
          do. We understand the risks of the financial market, and we strive to protect your assets
          while maximizing your profits through expert analysis and cutting-edge technology.
        </p>
        <p>
          Our dedicated team of financial experts, traders, and analysts continuously monitors the
          market to help you make informed decisions. We created this platform because we saw a gap
          in honest, secure investment solutions, and we wanted to fill it with a trustworthy
          environment that empowers investors of all backgrounds to achieve their financial goals.
          Your success is our success, and that is why we put our clients first, every single day.
        </p>
      </section>

      <section className="skills-section">
        <h2>Our Expertise</h2>
        <div className="skill">
          <label>Trading</label>
          <div className="progress">
            <div className="progress-bar" style={{ width: "90%" }}>90%</div>
          </div>
        </div>
        <div className="skill">
          <label>Investment</label>
          <div className="progress">
            <div className="progress-bar" style={{ width: "85%" }}>85%</div>
          </div>
        </div>
        <div className="skill">
          <label>Real Estate</label>
          <div className="progress">
            <div className="progress-bar" style={{ width: "80%" }}>80%</div>
          </div>
        </div>
        <div className="skill">
          <label>Market Analysis</label>
          <div className="progress">
            <div className="progress-bar" style={{ width: "95%" }}>95%</div>
          </div>
        </div>
      </section>

       
    </div>
  );
};

export default Contact;
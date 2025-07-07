 // Services.js
import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";

const services = [
  {
    id: 1,
    name: "Crypto Trading",
    desc: "Secure and profitable cryptocurrency trading experience.",
    image: "./Al.imag/img.9.jpg",
  },
  {
    id: 2,
    name: "Asset Management",
    desc: "Professional management of your assets with high efficiency.",
    image: "./Al.imag/img.6.jpg",
  },
  {
    id: 3,
    name: "Digital & Gold Investment",
    desc: "Safe investment in Bitcoin and Gold with stable daily income.",
    image: "./Al.imag/img.4.jpg",
  },
];

const Services = () => {
  return (
    <section className="services-section">
      <h2 className="section-title">Our Services</h2>
      <p className="services-desc">
        We are a trusted investment platform offering secure digital trading services with cutting-edge technology and expert support.
      </p>
      <div className="services-list">
        {services.map((s) => (
          <div className="service-card" key={s.id}>
            <img src={s.image} alt={s.name} className="service-image" />
            <div className="service-content">
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <Link to={`/services/${s.id}`} className="service-btn">
                View Service
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
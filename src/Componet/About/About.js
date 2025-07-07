 import React from "react";
import "./About.css";

const About = () => {
  const reviews = [
    {
      name: "Alice Johnson",
      text: "This platform completely changed my trading experience. Highly recommended!",
      rating: 5,
      img: "./Al.imag/Ellipse 1.png",
    },
    {
      name: "Mark Lee",
      text: "Very secure and reliable. I trust them with my investments.",
      rating: 4,
      img: "./Al.imag/Ellipse 2.png",
    },
    {
      name: "Sofia Kim",
      text: "Great customer support and easy to use dashboard.",
      rating: 5,
      img: "./Al.imag/Ellipse 3.png",
    },
    {
      name: "John Smith",
      text: "My funds are safe and profits are steady. Love it!",
      rating: 4,
      img: "./Al.imag/Ellipse 4.png",
    },
    {
      name: "Liam Brown",
      text: "Top-notch features with strong security measures.",
      rating: 5,
      img: "./Al.imag/Ellipse 5.png",
    },
  ];

  const licenses = [
    {
      title: "Financial Brokerage License",
      number: "10015523/2024",
      issuer: "Securities Commission Authority"
    },
    {
      title: "AML/CTF Compliance Certification",
      number: "AML-2024-55001144",
      issuer: "International Financial Standards Board"
    },
    {
      title: "GDPR Compliance",
      number: "EU-GDPR-55226443",
      issuer: "European Data Protection Board"
    },
    {
      title: "Commercial Registration",
      number: "22799633-INV",
      issuer: "Ministry of Commerce"
    },
    {
      title: "Digital Services License",
      number: "DIG-2024-10018822",
      issuer: "National Communications and IT Authority"
    }
  ];

  return (
    <div className="about-container">
      <section className="about-intro">
        <h1>About Our Platform</h1>
        <p>
          Welcome to our trusted crypto investment platform. We are dedicated to providing a
          secure, transparent, and innovative trading experience for everyone. Our team of experts
          works passionately to ensure your investments grow with confidence and safety, using the
          latest technologies and reliable processes in the world of cryptocurrency.
        </p>
      </section>

      <section className="reviews-section">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <img src={review.img} alt={review.name} />
            <h3>{review.name}</h3>
            <p className="review-text">{review.text}</p>
            <div className="rating">
              {"⭐".repeat(review.rating)}
            </div>
          </div>
        ))}
      </section>

      <section className="licenses-section">
        <h2>Regulatory Licenses & Certifications</h2>
        <p className="licenses-intro">
          Our platform operates under the supervision of regulatory authorities and holds all the following approved licenses:
        </p>
        
        <div className="licenses-grid">
          {licenses.map((license, index) => (
            <div className="license-card" key={index}>
              <div className="license-icon">📜</div>
              <div className="license-details">
                <h3>{license.title}</h3>
                <p className="license-number">No. {license.number}</p>
                <p className="license-issuer">Issued by: {license.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
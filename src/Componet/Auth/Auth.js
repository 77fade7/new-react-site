 import React, { useState } from 'react';
import './Auth.css';
import ReactFlagsSelect from "react-flags-select"; // Install: npm install react-flags-select

const Auth = ({ onLogin }) => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // New additions
  const [isSignup, setIsSignup] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("YE"); // Yemen as default

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    setInput("");
    setPassword("");
    setPhone("");
  };

  const platformsData = [
    { id: 'okx', name: 'OKX', logo: 'Al.imag/al.4.jpg', praise: 'Cryptotech202 is an advanced platform that combines security and flexibility, with a strong focus on meeting user expectations in the digital market. The platform offers a wide range of digital currencies and features competitive fees that encourage efficient trading. Cryptotech202 s commitment to innovation and development makes it a dynamic platform that delivers high-quality services and an excellent user experience. Users find it the ideal partner to support their investment goals and help them achieve sustainable profits....' },
    { id: 'binance', name: 'Binance', logo: 'Al.imag/al.3.jpg', praise: 'Cryptotech202 prides itself on providing a secure and reliable trading environment, making it an ideal choice for anyone seeking a seamless and unique experience in the world of digital currencies. The platform features modern technologies that ensure fast transactions and accurate order execution, in addition to continuous technical support that contributes to building user confidence and enhancing their satisfaction. Cryptotech202 offers real opportunities for growth and development in a volatile market, with an easy-to-use and simple user interface that suits everyone, from beginners to professionals.' },
    { id: 'coinbase', name: 'Coinbase', logo: 'Al.imag/al.1.jpg', praise: 'Cryptotech202 offers comprehensive solutions for cryptocurrency traders, with a sophisticated, user-friendly interface that ensures a convenient and secure experience. The platform combines speed and reliability in executing trades and offers a huge range of cryptocurrencies to suit various tastes and strategies. Cryptotech202 s commitment to customer support and continuous improvement of its services makes it a leading platform worthy of trust and reliance. It s the ideal place for anyone who wants to enter the world of trading with confidence and success....' },
    { id: 'bybit', name: 'Bybit', logo: 'Al.imag/al.2.jpg', praise: 'Cryptotech202 is fully committed to providing innovative services that meet the needs of investors at all levels. The platform relies on the latest technologies to secure user data and protect their funds, while providing powerful analytical tools that help traders make informed decisions. Ongoing support and regular updates make Cryptotech202 a reliable and secure environment for daily trading. The user experience here is not just about trading, but rather a journey of continuous learning and development....' }
  ];

  const handlePlatformClick = (platform) => {
    setIsAnimating(true);
    setModalData(platform);
    setShowModal(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // ✅ تعديل هنا لتفعيل التسجيل الصحيح وتخزين البيانات
  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(input)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.trim().length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("userData"));

    if (isSignup) {
      if (phone.trim().length < 7) {
        alert("Please enter a valid phone number.");
        return;
      }

      if (savedUser && savedUser.email === input) {
        alert("This email is already registered. Please log in.");
        return;
      }

      const newUser = { email: input, password, phone };
      localStorage.setItem("userData", JSON.stringify(newUser));
      localStorage.setItem("loggedIn", "true");

      if (typeof onLogin === "function") {
        onLogin();
      }

    } else {
      if (!savedUser) {
        alert("No account found. Please sign up first.");
        return;
      }

      if (savedUser.email === input && savedUser.password === password) {
        localStorage.setItem("loggedIn", "true");

        if (typeof onLogin === "function") {
          onLogin();
        }
      } else {
        alert("Incorrect email or password.");
      }
    }
  };

  const handleExtendedLogin = () => {
    handleLogin();
  };

  return (
    <div className="signup-form">

      <div className="form-toggle">
        <button onClick={toggleAuthMode} className="toggle-btn">
          {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
        </button>
      </div>

      <div className="form-group">
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
      </div>

      {isSignup && (
        <div className="form-group phone-field">
          <ReactFlagsSelect
            selected={selectedCountry}
            onSelect={(code) => setSelectedCountry(code)}
            countries={["YE", "SA", "AE", "US", "GB"]}
            placeholder="Select country"
            className="country-select"
          />
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      )}

      <div className="form-group">
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className="signup-btn" onClick={handleExtendedLogin}>
        {isSignup ? "Sign Up" : "Log In"}
      </button>

      <div className="stats">
        <div className="stat-item">
          <div className="stat-number">30+</div>
          <div className="stat-text">Supported Countries</div>
           
        </div>
        <div className="stat-item">
          <div className="stat-number">40+</div>
          <div className="stat-text">Cryptocurrencies</div>
         
        </div>
        <div className="stat-item">
          <div className="stat-number">10M+</div>
          <div className="stat-text">International user</div>
          <div className="stat-subtext">Lowest Fees in the Market 50$</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">60M$+</div>
          <div className="stat-text">24-hour trading volume</div>
          <div className="stat-subtext">99.9% Uptime Guarantee</div>
        </div>
      </div>

      <div className="recommended">
        <h2>Recommended by Leading Platforms</h2>
        <div className="platforms">
          {platformsData.map(platform => (
            <div
              key={platform.id}
              className="platform-card"
              onClick={() => handlePlatformClick(platform)}
            >
              <div className="platform-logo">
                <img src={platform.logo} alt={platform.name} />
              </div>
              <div className="platform-name">{platform.name}</div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className={`modal-content ${isAnimating ? 'animate' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <div className="modal-logo">
              <img src={modalData.logo} alt={modalData.name} />
            </div>
            <h2 className="modal-platform-name">Thank You {modalData.name}</h2>
            <div className="praise-message">
              <p>{modalData.praise}</p>
              <div className="praise-footer">
                <span>Our Platform Team</span>
                <div className="heart-icon">❤</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
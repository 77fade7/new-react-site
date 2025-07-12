 import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onLogin }) => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const platformsData = [
    {
      id: 'okx',
      name: 'OKX',
      logo: './Al.imag/al.4.jpg',
      praise: 'We extend our deepest gratitude to OKX for their trust and endorsement...'
    },
    {
      id: 'binance',
      name: 'Binance',
      logo: './Al.imag/al.2.jpg',
      praise: 'Our heartfelt thanks to Binance for recommending our platform...'
    },
    {
      id: 'coinbase',
      name: 'Coinbase',
      logo: './Al.imag/al.5.jpg',
      praise: 'We sincerely appreciate Coinbase for their support and recommendation...'
    },
    {
      id: 'bybit',
      name: 'Bybit',
      logo: './Al.imag/al.3.jpg',
      praise: 'We are profoundly grateful to Bybit for their confidence in our platform...'
    }
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

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input)) {
      alert("يرجى إدخال بريد إلكتروني صحيح.");
    } else if (password.trim().length < 6) {
      alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
    } else {
      localStorage.setItem("loggedIn", "true");
      if (typeof onLogin === "function") {
        onLogin();
      } else {
        console.error("onLogin غير موجود أو ليس دالة.");
      }
    }
  };

  return (
    <div className="trading-platform-container">
      <div className="header">
        <h1>Electronic Response / Phone Number</h1>
      </div>

      <div className="signup-form">
        <div className="form-group">
          <input 
            type="text" 
            id="email-phone" 
            placeholder="Enter your email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required 
          />
        </div>

        {/* 🟢 حقل كلمة المرور بنفس تنسيق الإيميل */}
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

        <button className="signup-btn" onClick={handleLogin}>
          Register Now
        </button>
      </div>

      <div className="stats">
        <div className="stat-item">
          <div className="stat-number">200+</div>
          <div className="stat-text">Supported Countries</div>
          <div className="stat-subtext">400 Million Global Investors</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">900+</div>
          <div className="stat-text">Cryptocurrencies</div>
          <div className="stat-subtext">$2.74B 24h Trading Volume</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">100+</div>
          <div className="stat-text">Trading Pairs</div>
          <div className="stat-subtext">Lowest Fees in the Market</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">500+</div>
          <div className="stat-text">Instant Services</div>
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
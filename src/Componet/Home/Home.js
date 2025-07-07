 import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  // sample fake leaders
  const fakeLeaders = [
    { name: "John D.", pair: "BTC/USDT", percent: 52.34 },
    { name: "CryptoBoss", pair: "ETH/USDT", percent: 48.91 },
    { name: "Satoshi99", pair: "DOGE/USDT", percent: 46.15 },
    { name: "TraderX", pair: "ADA/USDT", percent: 44.10 },
    { name: "InvestQueen", pair: "BNB/USDT", percent: 41.62 },
    { name: "ElonMoon", pair: "SOL/USDT", percent: 39.80 },
    { name: "AI_Wizard", pair: "XRP/USDT", percent: 37.95 },
    { name: "HODLKing", pair: "DOT/USDT", percent: 35.78 },
    { name: "CryptoCat", pair: "SHIB/USDT", percent: 34.11 },
    { name: "BullRunner", pair: "MATIC/USDT", percent: 32.50 },
    { name: "BitStar", pair: "TRX/USDT", percent: 30.05 },
    { name: "DigiNinja", pair: "LTC/USDT", percent: 28.79 },
    { name: "AlphaWolf", pair: "AVAX/USDT", percent: 26.98 },
    { name: "MoonLight", pair: "UNI/USDT", percent: 25.43 },
    { name: "GreenBull", pair: "NEAR/USDT", percent: 24.32 },
    { name: "ChainKnight", pair: "FTM/USDT", percent: 23.88 },
    { name: "BlockHero", pair: "ETC/USDT", percent: 22.56 },
    { name: "SmartTiger", pair: "OP/USDT", percent: 21.70 },
    { name: "RedFalcon", pair: "ARB/USDT", percent: 20.80 },
    { name: "Maxflow", pair: "FLOW/USDT", percent: 19.45 },
  ];

  const [counter, setCounter] = useState(
    parseInt(localStorage.getItem("startCounter")) || 0
  );

  const [topLeaders, setTopLeaders] = useState(fakeLeaders.slice(0, 3));
  const [tableData, setTableData] = useState(fakeLeaders.slice(3, 9));

  useEffect(() => {
    // shuffle leaders every 20s
    const interval = setInterval(() => {
      const shuffled = [...fakeLeaders].sort(() => 0.5 - Math.random());
      setTopLeaders(shuffled.slice(0, 3));
      setTableData(shuffled.slice(3, 9));
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const handleInvestClick = () => {
    const newCount = counter + 1;
    setCounter(newCount);
    localStorage.setItem("startCounter", newCount);
  };

  return (
    <div className="home-container">
      {/* HERO */}
      <section className="hero-section">
        <div className="left">
          <h1>Welcome to the Investment Platform</h1>
          <p>Invest securely with expert traders</p>

          {/* added verify identity button */}
          <div className="verify-section">
            <p>
              To enjoy the best features, please verify your identity now.
            </p>
            <Link to="/verify">
              <button className="verify-button">Verify Identity</button>
            </Link>
          </div>

            
        </div>

        <div className="right">
          <img
            src="./Al.imag/img.8.jpg"
            alt="crypto"
            className="animated-image"
          />
        </div>
      </section>

      {/* TOP CARDS */}
      <section className="cards-section">
        <h2>Top Leaders</h2>
        <div className="cards-grid">
          {topLeaders.map((leader, index) => (
            <div
              key={index}
              className={`card ${
                index === 0 ? "first" : index === 1 ? "second" : "third"
              }`}
            >
              <h3>{leader.name}</h3>
              <p>{leader.pair}</p>
              <strong>{leader.percent}%</strong>
            </div>
          ))}
        </div>
      </section>

      {/* USERS TABLE */}
      <section className="users-table-section">
        <h2>Other Active Traders</h2>
        <div className="users-table">
          <div className="table-header">
            <span>User</span>
            <span>Pair</span>
            <span>Uptime</span>
            <span>24h Return</span>
          </div>
          {tableData.map((user, index) => (
            <div className="table-row" key={index}>
              <span>{user.name}</span>
              <span>{user.pair}</span>
              <span>
                {Math.floor(Math.random() * 999)}D{" "}
                {Math.floor(Math.random() * 23)}H{" "}
                {Math.floor(Math.random() * 59)}M
              </span>
              <span className="green">{user.percent}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
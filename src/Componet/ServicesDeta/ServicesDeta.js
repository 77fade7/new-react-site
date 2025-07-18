 import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./ServicesDeta.css";

const ONE_DAY_SECONDS = 5000 * 60 * 60;

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const services = [
  {
    id: 1,
    name: "Trading Platform",
    desc: "A unique investment opportunity to achieve a stable and continuous daily income.",
    requirements: ["Verified ID", "Digital Wallet"],
    investmentDetails: {
      description:
        "Technical and analytical support from an expert team, with a smart system to track profits live.",
      levels: [
        { name: "Beginner Level", subscription: 50, dailyPercent: 1.5, dailyIncome: 1.6 },
        { name: "Premium Level", subscription: 150, dailyPercent: 2.5, dailyIncome: 5.00 },
        { name: "Advanced Level", subscription: 300, dailyPercent: 3.5, dailyIncome: 10.00 },
        { name: "Professional Level", subscription: 500, dailyPercent: 4.5, dailyIncome: 16.67 },
        { name: "Elite Level", subscription: 700, dailyPercent: 6.0, dailyIncome: 23.33 },
      ],
      steps: [
        "Choose the level that suits your budget.",
        "Transfer the subscription amount to our digital wallet.",
        "Send the deposit link and image.",
        "Track your profits daily through the platform.",
      ],
      invite: "Join now and start your investment journey with confidence.",
      contact: "Contact us via our official channel.",
      depositAddresses: {
        TRC20: "TKc35dVucMAhkjimUVsqFfk7qWbXLV4GEE",
        ERC20: "0x22841c6678d8734c5c6fe5f009b6b41c27a30e36",
        BEP20: "0x22841c6678d8734c5c6fe5f009b6b41c27a30e36",
      },
    },
  },
  {
    id: 2,
    name: "Real Estate Investment",
    desc: "A safe and real investment opportunity in real estate that generates daily fixed income.",
    requirements: ["Verified ID", "Digital Wallet"],
    investmentDetails: {
      description:
        "We are pleased to offer a safe and real investment opportunity in real estate, with steady long-term income in a booming market.",
      levels: [
        { name: "Beginner Level", subscription: 200, dailyPercent: 1.0, dailyIncome: 6.6 },
        { name: "Premium Level", subscription: 400, dailyPercent: 1.5, dailyIncome: 13.3 },
        { name: "Advanced Level", subscription: 600, dailyPercent: 2.0, dailyIncome: 20.00 },
        { name: "Professional Level", subscription: 800, dailyPercent: 2.5, dailyIncome: 26.6},
        { name: "Elite Level", subscription: 1000, dailyPercent: 3.0, dailyIncome: 33.3 },
      ],
      steps: [
        "Choose the appropriate level based on your financial goals.",
        "Transfer the subscription amount to our wallet address: ♕ Ensure the correct network and address from the official platform before sending.",
        "Send the wallet address + deposit image via our official platform channel.",
        "Track your profits and daily reports via your control panel.",
      ],
      invite:
        "Invest in real estate now and start your journey toward financial stability with sustainable returns under expert supervision.",
      contact: "For support, contact us via our official platform channel.",
      depositAddresses: {
        TRC20: "TKc35dVucMAhkjimUVsqFfk7qWbXLV4GEE",
        ERC20: "0x22841c6678d8734c5c6fe5f009b6b41c27a30e36",
        BEP20: "0x22841c6678d8734c5c6fe5f009b6b41c27a30e36",
      },
    },
  },
  {
    id: 3,
    name: "Crypto and Gold Investment",
    desc: "A secure and distinguished opportunity combining crypto profits and the stability of gold.",
    requirements: ["Verified ID", "Digital Wallet"],
    investmentDetails: {
      description:
        "We are pleased to offer a secure and distinguished investment opportunity combining the profit power of cryptocurrencies (especially Bitcoin) with the stability of gold as a trusted asset, to ensure a steady daily income and diversified portfolio.",
      levels: [
        { name: "Beginner Level", subscription: 90, dailyPercent: 1.5, dailyIncome: 3.00 },
        { name: "Premium Level", subscription: 250, dailyPercent: 2.0, dailyIncome: 8.33 },
        { name: "Advanced Level", subscription: 400, dailyPercent: 2.5, dailyIncome: 13.33 },
        { name: "Professional Level", subscription: 600, dailyPercent: 3.0, dailyIncome: 20.00 },
        { name: "Elite Level", subscription: 800, dailyPercent: 3.5, dailyIncome: 26.67 },
      ],
      steps: [
        "Choose the appropriate level based on your financial goals.",
        "Transfer the subscription amount to our wallet address: ♕ Make sure you choose the correct network and verify the address from the official platform before sending.",
        "Send the wallet address + deposit image via our official platform channel.",
        "Track your daily profits and income reports via your personal account on the platform.",
      ],
      invite:
        "Invest in (Bitcoin BTC) + (Gold ETH) together, and achieve the perfect balance between safety and consistent profits.",
      contact: "For support, contact us via our official platform channel.",
      depositAddresses: {
        TRC20: "TKc35dVucMAhkjimUVsqFfk7qWbXLV4GEE",
        ERC20: "0x22841c6678d8734c5c6fe5f009b6b41c27a30e36",
        BEP20: "0x22841c6678d8734c5c6fe5f009b6b41c27a30e36",
      },
    },
  },
];

const ServiceDeta = () => {
  const { id } = useParams();
  const service = services.find((s) => s.id.toString() === id);
  const [depositInputs, setDepositInputs] = useState({ amount: "", link: "", image: null });
  const [showFormIndex, setShowFormIndex] = useState(null);
  const intervalsRef = useRef([]);

  const [miners, setMiners] = useState(() => {
    if (!service || !service.investmentDetails) return [];
    const saved = JSON.parse(localStorage.getItem(`minersState-${service.id}`) || "[]");
    return service.investmentDetails.levels.map((_, i) => {
      const levelState = saved[i] || {};
      const startedAt = levelState.startedAt || null;
      let elapsed = 0;
      if (startedAt) {
        const now = Math.floor(Date.now() / 1000);
        elapsed = Math.min(now - startedAt, ONE_DAY_SECONDS);
      }
      return {
        confirmed: levelState.confirmed || false,
        startedAt,
        running: levelState.confirmed && true,
        elapsed,
      };
    });
  });

  useEffect(() => {
    const save = miners.map((m) => ({
      confirmed: m.confirmed,
      startedAt: m.startedAt,
    }));
    localStorage.setItem(`minersState-${service?.id}`, JSON.stringify(save));
  }, [miners, service?.id]);

  useEffect(() => {
    intervalsRef.current.forEach((intv) => clearInterval(intv));
    miners.forEach((miner, index) => {
      if (miner.running) {
        intervalsRef.current[index] = setInterval(() => {
          setMiners((prev) => {
            const copy = [...prev];
            const now = Math.floor(Date.now() / 1000);
            const elapsed = now - (copy[index].startedAt || now);
            copy[index].elapsed = Math.min(elapsed, ONE_DAY_SECONDS);
            return copy;
          });
        }, 1000);
      }
    });
    return () => {
      intervalsRef.current.forEach((intv) => clearInterval(intv));
    };
  }, [miners]);

  const handleStartClick = (index) => {
    if (!miners[index].confirmed) {
      setShowFormIndex(index);
    }
  };

  const confirmDeposit = (index) => {
    if (!depositInputs.amount || !depositInputs.link || !depositInputs.image) {
      alert("يرجى تعبئة جميع الحقول المطلوبة (المبلغ، رابط الإيداع، وصورة الإيداع).");
      return;
    }

    const startedAt = Math.floor(Date.now() / 1000);
    setMiners((prev) => {
      const copy = [...prev];
      copy[index] = { confirmed: true, startedAt, running: true, elapsed: 0 };
      return copy;
    });
    setShowFormIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setDepositInputs((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  if (!service) return <h2 style={{ color: "white" }}>Service not found.</h2>;

  if (!service.investmentDetails) {
    return (
      <div>
        <h2>{service.name}</h2>
        <p>{service.desc}</p>
        <h4>Requirements:</h4>
        <ul>
          {service.requirements.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    );
  }

  const { investmentDetails } = service;

  return (
    <div className="service-detail">
      <h2>{service.name}</h2>
      <p className="description">{investmentDetails.description}</p>

      <h3>Levels of {service.name}</h3>
      <div className="levels-container">
        {investmentDetails.levels.map((level, i) => {
          const m = miners[i];
          const elapsed = Math.min(m.elapsed, ONE_DAY_SECONDS);
          const earned = ((elapsed / ONE_DAY_SECONDS) * level.dailyIncome).toFixed(4);

          return (
            <div key={i} className="level-item">
              <h4>{level.name}</h4>
              <p><b>Subscription:</b> ${level.subscription}</p>
              <p><b>Daily Percentage:</b> {level.dailyPercent}%</p>
              <p><b>Daily income:</b> ${level.dailyIncome}</p>
              <p><b>Mining Status:</b> {m.running ? "Running" : m.confirmed ? "Stopped" : "Not Started"}</p>
              <p><b>Elapsed Time:</b> {formatTime(elapsed)} </p>

              {!m.confirmed && (
                <button onClick={() => handleStartClick(i)}>Start Mining</button>
              )}
              {m.confirmed && <button disabled>Activated</button>}

              {showFormIndex === i && (
                <div className="deposit-form">
                  <h4>Confirm Deposit</h4>
                  <label>
                    Subscription Amount:
                    <input name="amount" type="number" onChange={handleInputChange} />
                  </label>
                  <label>
                    Deposit Link:
                    <input name="link" type="text" onChange={handleInputChange} />
                  </label>
                  <label>
                    Deposit Image:
                    <input name="image" type="file" onChange={handleInputChange} />
                  </label>
                  <button onClick={() => confirmDeposit(i)}>Confirm Deposit & Start Mining</button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <h3>Investment Steps</h3>
      <ol className="investment-steps">
        {investmentDetails.steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <h3>💳 USDT Deposit Addresses</h3>
      <div className="usdt-addresses">
        <div className="usdt-address">
          <span><b>TRC20:</b> {investmentDetails.depositAddresses.TRC20}</span>
          <button onClick={() => navigator.clipboard.writeText(investmentDetails.depositAddresses.TRC20)}>Copy</button>
        </div>
        <div className="usdt-address">
          <span><b>ERC20:</b> {investmentDetails.depositAddresses.ERC20}</span>
          <button onClick={() => navigator.clipboard.writeText(investmentDetails.depositAddresses.ERC20)}>Copy</button>
        </div>
        <div className="usdt-address">
          <span><b>BEP20:</b> {investmentDetails.depositAddresses.BEP20}</span>
          <button onClick={() => navigator.clipboard.writeText(investmentDetails.depositAddresses.BEP20)}>Copy</button>
        </div>
      </div>

      <p className="invite">{investmentDetails.invite}</p>
      <p className="contact">{investmentDetails.contact}</p>
    </div>
  );
};

export default ServiceDeta;
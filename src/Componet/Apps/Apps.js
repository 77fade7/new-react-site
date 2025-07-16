import React, { useEffect, useState, useRef } from "react";
import "./Apps.css";

export default function Apps() {
  const [allCoins, setAllCoins] = useState([]);
  const [prevPrices, setPrevPrices] = useState({});
  const [currentTab, setCurrentTab] = useState("trending");
  const [showingCount, setShowingCount] = useState(20);
  const [coinsPerTab, setCoinsPerTab] = useState({
    favorites: [],
    trending: [],
    new: [],
    lowPrice: [],
    highPrice: [],
    volume24h: [],
    marketCap: [],
  });

  const [page, setPage] = useState("home");

  const coinsListRef = useRef(null);
  const scrollUpRef = useRef(null);
  const scrollDownRef = useRef(null);

  const formatPrice = (price) => {
    if (price >= 100) {
      return price.toFixed(2);
    } else if (price >= 1) {
      return price.toFixed(4);
    } else {
      return price.toFixed(6);
    }
  };

  const saveCoinsToStorage = (coins) => {
    localStorage.setItem("savedCoins", JSON.stringify(coins));
  };

  const loadCoinsFromStorage = () => {
    const data = localStorage.getItem("savedCoins");
    if (data) {
      const coins = JSON.parse(data);
      setAllCoins(coins);
      const prices = {};
      coins.forEach((c) => {
        prices[c.id] = c.current_price;
      });
      setPrevPrices(prices);
      return true;
    }
    return false;
  };

  const loadTopCoins = async () => {
    if (loadCoinsFromStorage()) {
      // already loaded
    } else {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false"
      );
      const data = await res.json();
      setAllCoins(data);
      saveCoinsToStorage(data);
    }
  };

 const updatePricesLoop = async () => {
  // تحديث وهمي للأسعار كل نصف ثانية
  setAllCoins((prev) =>
    prev.map((coin) => {
      const changePercent = (Math.random() - 0.5) * 0.002;
      return {
        ...coin,
        current_price: Math.max(
          0.00001,
          coin.current_price * (1 + changePercent)
        ),
      };
    })
  );

  // عداد عشان نعرف كل كم ثانية نجلب الأسعار الحقيقية
  if (!updatePricesLoop.counter) updatePricesLoop.counter = 0;
  updatePricesLoop.counter++;

  // كل 15 دورة (يعني كل 7.5 ثانية لو المدة نص ثانية، أو كل 15 ثانية لو المدة ثانية)
  if (updatePricesLoop.counter % 15 === 0) {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=70&page=1&sparkline=false"
      );
      const data = await res.json();

      setAllCoins((prevCoins) =>
        prevCoins.map((coin) => {
          const realCoin = data.find((c) => c.id === coin.id);
          if (realCoin) {
            return {
              ...coin,
              current_price: realCoin.current_price,
              market_cap: realCoin.market_cap,
              total_volume: realCoin.total_volume,
              genesis_date: realCoin.genesis_date || coin.genesis_date,
            };
          }
          return coin;
        })
      );

      saveCoinsToStorage(data);
      console.log("✅ تم تحديث الأسعار الحقيقية من CoinGecko");
    } catch (e) {
      console.warn("⚠ فشل تحديث الأسعار الحقيقية", e);
    }
  }
};

  useEffect(() => {
    loadTopCoins();
    const interval = setInterval(updatePricesLoop, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (page === "coins") {
      fetchAndShowCoins();
    }
  }, [page]);

  const displayTopCoins = () => {
    return allCoins.slice(0, 6).map((coin) => {
      const priceClass =
        prevPrices[coin.id] === undefined
          ? "stable"
          : coin.current_price > prevPrices[coin.id]
          ? "up"
          : coin.current_price < prevPrices[coin.id]
          ? "down"
          : "stable";

      return (
        <div
          key={coin.id}
          className="card"
          onClick={() => loadCoinDetails(coin.id)}
        >
          <span className="coin-left">
            <img
              src={coin.image}
              alt={coin.symbol}
              className="coin-img"
            />
            <span>{coin.symbol.toUpperCase()}</span>
          </span>
          <span className={`price ${priceClass}`}>
            {formatPrice(coin.current_price)} $
          </span>
        </div>
      );
    });
  };

  const fetchAndShowCoins = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=70&page=1&sparkline=false"
    );
    const data = await res.json();

    const tabs = {
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      trending: data.slice(0, 20),
      new: data.filter((c) => {
        if (!c.genesis_date) return false;
        const d = new Date(c.genesis_date);
        const daysOld = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
        return daysOld <= 90;
      }).slice(0, 20),
      lowPrice: data.filter((c) => c.current_price < 1).slice(0, 20),
      highPrice: data.filter((c) => c.current_price >= 1000).slice(0, 20),
      volume24h: data
        .slice()
        .sort((a, b) => b.total_volume - a.total_volume)
        .slice(0, 20),
      marketCap: data
        .slice()
        .sort((a, b) => b.market_cap - a.market_cap)
        .slice(0, 20),
    };

    setAllCoins(data);
    setCoinsPerTab(tabs);
  };

  const loadCoinDetails = (coinId) => {
    const coin = allCoins.find((c) => c.id === coinId);
    if (!coin) {
      alert(" Non-existent currency ");
      return;
    }
    alert(
      `  Currency details:\n\n${coin.name} (${coin.symbol.toUpperCase()})\  Current price: ${formatPrice(
        coin.current_price
      )} $\   Market value: ${coin.market_cap.toLocaleString()}`
    );
  };

 const getCoinsForTab = (tab) => {
  if (tab === "favorites") {
    const favoritesIds = JSON.parse(localStorage.getItem("favorites")) || [];
    return allCoins.filter(c => favoritesIds.includes(c.id));
  }
  if (tab === "trending") {
    return allCoins.slice(0, 20);
  }
  if (tab === "new") {
    return allCoins.filter((c) => {
      if (!c.genesis_date) return false;
      const d = new Date(c.genesis_date);
      const daysOld = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
      return daysOld <= 90;
    }).slice(0, 20);
  }
  if (tab === "lowPrice") {
    return allCoins.filter((c) => c.current_price < 1).slice(0, 20);
  }
  if (tab === "highPrice") {
    return allCoins.filter((c) => c.current_price >= 1000).slice(0, 20);
  }
  if (tab === "volume24h") {
    return allCoins
      .slice()
      .sort((a, b) => b.total_volume - a.total_volume)
      .slice(0, 20);
  }
  if (tab === "marketCap") {
    return allCoins
      .slice()
      .sort((a, b) => b.market_cap - a.market_cap)
      .slice(0, 20);
  }
  return [];
};

const updateCoinsList = () => {
  const coins = getCoinsForTab(currentTab);
  const coinsToShow = coins.slice(0, showingCount);

  return coinsToShow.map((coin) => {
    const priceClass =
      prevPrices[coin.id] === undefined
        ? "stable"
        : coin.current_price > prevPrices[coin.id]
        ? "up"
        : coin.current_price < prevPrices[coin.id]
        ? "down"
        : "stable";

    return (
      <li
        key={coin.id}
        className="coin-item"
        onClick={() => loadCoinDetails(coin.id)}
      >
        <div className="coin-left">
          <img
            src={coin.image}
            alt={coin.symbol}
            className="coin-img"
          />
          <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
          <span className="coin-name">{coin.name}</span>
        </div>
        <span className={`price ${priceClass}`}>
          {formatPrice(coin.current_price)} $
        </span>
      </li>
    );
  });
};

  const renderHomePage = () => (
    <div className="main" id="homeContent">
      <h2 style={{ color: "gold" }}>Popular currencies</h2>
      <div>{displayTopCoins()}</div>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button onClick={() => setPage("coins")}>Show more</button>
      </div>
    </div>
  );

  const renderCoinsPage = () => (
    <div className="main">
      <button
        onClick={() => setPage("home")}
        style={{ marginBottom: "15px", background: "#222", color: "gold" }}
      >
        ⬅ Back
      </button>
      <div className="tabs-container">
        {Object.keys(coinsPerTab).map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${
              currentTab === tab ? "active" : ""
            }`}
            onClick={() => {
              setCurrentTab(tab);
              setShowingCount(20);
            }}
          >
            {tab === "favorites"
              ? "Favorite"
              : tab === "trending"
              ? "Popular"
              : tab === "new"
              ? "New"
              : tab === "lowPrice"
              ? "Iow Price"
              : tab === "highPrice"
              ? "High Price"
              : tab === "volume24h"
              ? "24 Hour Size"
              : "Market value"}
          </button>
        ))}
      </div>
      <ul id="coinsList" ref={coinsListRef} style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {updateCoinsList()}
      </ul>
      <button
        style={{ margin: "10px auto", display: "block" }}
        onClick={() => setShowingCount((prev) => prev + 20)}
      >
         Show more  
      </button>
    </div>
  );

  return (
    <div>
      {page === "home" ? renderHomePage() : renderCoinsPage()}

      <div id="scrollUp" ref={scrollUpRef} className="scroll-arrow" title="التمرير للأعلى">
        ▲
      </div>
      <div id="scrollDown" ref={scrollDownRef} className="scroll-arrow" title="التمرير للأسفل">
        ▼
      </div>
    </div>
  );
}
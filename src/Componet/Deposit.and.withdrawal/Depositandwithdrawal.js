import React, { useEffect, useState } from 'react';
import './Depositandwithdrawal.css';

const totalContracts = 2000;
const networks = ["TRC20", "BEP20", "ERC20"];

function getRandomTransactionType() {
  return Math.random() < 0.5 ? "deposit" : "withdraw";
}

function generateRandomAddress(network) {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  if (network === "TRC20") {
    let address = 'T';
    for (let i = 0; i < 33; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return address;
  } else {
    let address = '0x';
    for (let i = 0; i < 40; i++) {
      address += Math.floor(Math.random() * 16).toString(16);
    }
    return address;
  }
}

function generateProfitAmount() {
  const amount = Math.floor(Math.random() * 33) + 1;
  return amount + " $";
}

function getRandomNetwork() {
  return networks[Math.floor(Math.random() * networks.length)];
}

function Depositandwithdrawal() {
  const [contracts, setContracts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const initialContracts = [];
    for (let i = 0; i < totalContracts; i++) {
      const network = getRandomNetwork();
      const type = getRandomTransactionType();
      initialContracts.push({
        address: generateRandomAddress(network),
        profit: generateProfitAmount(),
        network,
        type
      });
    }
    setContracts(initialContracts);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 10) % totalContracts);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const displayedContracts = contracts.slice(index, index + 10);

  return (
    <div className="App">
       

      <div id="contractsPage" className="main">
        <h2>
           
          <span className="small-text">Daily deposit and withdrawal statistics</span>
        </h2>
        <div id="contractsList">
          {displayedContracts.map((contract, i) => (
            <div className="contract-entry" key={i}>
              <div className="contract-address">{contract.address}</div>
              <div className={`contract-profit ${contract.type}`}>
                {contract.profit}
              </div>
              <div className="contract-network">{contract.network}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Depositandwithdrawal;
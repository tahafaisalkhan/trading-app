import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/browse.css";
import tradeImage1 from "../css/tradeImage1.jpg";

interface Trade {
  _id: string;
  name: string;
  title: string;
  description: string;
  conditions: string[];
}

const BrowseTrades: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/trades")
      .then((res) => res.json())
      .then((data) => setTrades(data))
      .catch((err) => console.error("Fetching trades failed:", err));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTrades = trades.filter((trade) =>
    trade.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <section className="search-section">
        <input
          type="text"
          id="searchBar"
          placeholder="Search trades..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </section>
      <section className="trades-list">
        {filteredTrades.map((trade) => (
          <div className="trade-item" key={trade._id}>
            <img src={tradeImage1} alt="Trade" className="trade-image3" />
            <div className="trade-info">
              <h3 className="trade-title">{trade.title}</h3>
              <p className="trade-description">{trade.description}</p>
              <div className="trade-conditions">
                Conditions:{" "}
                {trade.conditions.map((condition, index) => (
                  <span key={index} className="condition-badge">
                    {condition}
                  </span>
                ))}
              </div>
              <p className="profile-name">Posted by: {trade.name}</p>
            </div>
            <Link to={`/trades/${trade._id}`} className="send-offer-btn">
              Send Offer
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BrowseTrades;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/profile.css";
import userImage from "../css/userImage.jpg";
import tradeImage from "../css/tradeImage.jpg";
import axios from "axios";

const UserProfile = () => {
  const { username } = useParams();
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/trades/user/${username}`
        );
        setTrades(response.data);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    };

    if (username) {
      fetchTrades();
    }
  }, [username]);

  return (
    <div>
      <section className="profile-content">
        <div className="top-section">
          <div className="user-info">
            <img
              src={userImage}
              alt={username ? `Profile of ${username}` : "Default profile"}
              className="user-image"
            />
            <div>
              <h1>{username ? username : "Guest"}</h1>
              <p className="user-username">
                {username ? `@${username}` : "@guest"}
              </p>
              <Link to="/browse">
                <button className="create-offer-btn">Back</button>
              </Link>{" "}
            </div>
          </div>
        </div>

        <h2>Their Trades</h2>
        <div>
          {trades.map((trade) => (
            <div className="trade-item" key={trade._id}>
              <img src={tradeImage} alt="Trade" className="trade-image1" />
              <div className="trade-info">
                <h3 className="trade-title">{trade.title}</h3>
                <p className="trade-description">{trade.description}</p>
                <div className="trade-conditions">
                  {trade.conditions.map((condition, index) => (
                    <span key={index} className="condition-badge">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserProfile;

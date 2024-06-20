import React from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/profile.css";
import axios from "axios";
import { useState, useEffect } from "react";
import userImage from "../css/userImage.jpg";
import tradeImage from "../css/tradeImage.jpg";
import offerImage from "../css/offerImage.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trades, setTrades] = useState([]);
  const [cashOwned, setCashOwned] = useState(0);
  const [noOfItemsOwned, setNoOfItemsOwned] = useState(0);
  const [sentOffers, setSentOffers] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/trades/user/${user.name}`
        );
        setTrades(response.data);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8000/api/users/profile/${user.name}`
        );
        setCashOwned(userResponse.data.cashOwned);
        setNoOfItemsOwned(userResponse.data.noOfItemsOwned);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchOffers = async () => {
      try {
        const offersResponse = await axios.get(
          `http://localhost:8000/api/offers/user/${user.name}`
        );
        setSentOffers(offersResponse.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    if (user) {
      fetchOffers();
      fetchTrades();
      fetchUserData();
    }
  }, [user]);

  const handleTradeClick = (tradeId) => {
    navigate(`/trades/${tradeId}`);
  };

  const OfferTile = ({ offer }) => {
    return (
      <div className="offer-tile">
        <div className="offer-image-container">
          <img src={offerImage} alt="Offer detail" className="offer-image" />
        </div>
        <div className="offer-info">
          <h3 className="offer-title">Offer for Trade ID {offer.trade}</h3>
          <p className="offer-description">Title: {offer.commodity}</p>
          <p className="offer-description">Description: {offer.cashOffer}</p>
          <p className="offer-description">Cash offered: ${offer.cashOffer}</p>
          <p className="offer-description">Items offered: {offer.quantity}</p>
        </div>
        <div
              className="offer-status"
              style={{
                color: offer.status === 'Rejected' ? 'red' :
                      offer.status === 'Accepted' ? 'green' :
                      offer.status === 'Pending' ? 'blue' : 'inherit',
                fontWeight: 'bold'
              }}
            >
          {offer.status}
        </div>      
</div>
    );
  };

  return (
    <div>
      <section className="profile-content">
        <div className="top-section">
          <div className="user-info">
            <img
              src={userImage}
              alt={user ? `Profile of ${user.name}` : "Default profile"}
              className="user-image"
            />
            <div>
              <h1>{user ? user.name : "Guest"}</h1>{" "}
              <p className="user-username">
                {user ? `@${user.name}` : "@guest"}
              </p>
              <Link to="/change-password">
                <button className="update-password-btn">Update Password</button>
              </Link>{" "}
              <Link to="/create-trade">
                <button className="create-offer-btn">Create Trade Offer</button>
              </Link>{" "}
            </div>
          </div>
          <div className="cash-counter">
            <p>Cash: ${cashOwned}</p>
          </div>
        </div>

        <h2>My Trades</h2>
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
              {trade.status === "completed" ? (
                <strong style={{ color: "green" }}>Completed</strong>
              ) : (
                <div
                  className="trade-action"
                  onClick={() => handleTradeClick(trade._id)}
                >
                  <p className="see-trade-status-btn">See Trade Status →</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2>Offers Sent</h2>
        <div className="offers-sent-container">
          {sentOffers.map((offer) => (
            <OfferTile key={offer._id} offer={offer} />
          ))}
        </div>

        <h2>Inventory of Items</h2>
        <div className="inventory-tile">
          <h3 className="inventory-title">Item Title</h3>
          <p className="inventory-description">
            This is a brief description of the inventory item, providing
            essential details that the user should know.
          </p>
          <p className="inventory-quantity">
            Quantity: <span>{noOfItemsOwned}</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Profile;

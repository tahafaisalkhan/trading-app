import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../css/trade.css";
import tradeImage from "../css/tradeImage.jpg";
import userImage from "../css/userImage.jpg";
import axios from "axios";
//import "../css/profile.css";
import io from "socket.io-client";

const TradeDetail = () => {
  const { user } = useAuth();
  const { tradeId } = useParams();
  const navigate = useNavigate();
  const [trade, setTrade] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");
  const socket = io("http://localhost:8000");
  const [hasOffered, setHasOffered] = useState(false);
  const [userOffer, setUserOffer] = useState(null);

  useEffect(() => {
    socket.emit("joinTradeRoom", tradeId);

    socket.on("offerReceived", (newOffer) => {
      setOffers((prevOffers) => [...prevOffers, newOffer]);
    });

    socket.on("updateOfferStatus", ({ offerId, status }) => {
      setOffers((prevOffers) =>
        prevOffers.map((offer) => {
          if (offer._id === offerId) {
            return { ...offer, status };
          }
          return offer;
        })
      );
    });

    socket.on("tradeEnded", () => {
      alert("Trade has ended!");
      navigate("/home");
    });

    return () => {
      socket.emit("leaveTradeRoom", tradeId);
      socket.off("offerReceived");
      socket.off("offerRemoved");
      socket.off("updateOfferStatus");
      socket.off("tradeEnded");
    };
  }, [tradeId, navigate]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/trades/${tradeId}?userId=${user.name}`)
      .then((response) => response.json())
      .then((data) => {
        setTrade(data.trade);
        setIsOwner(data.isOwner);
        setOffers(data.offers || []);
        setHasOffered(data.hasOffered);
        setUserOffer(data.userOffer);
        if (data.isOwner) {
          import("../css/mytrade.css");
        }
      })
      .catch((err) => {
        console.error("Error fetching trade:", err);
        setError("Failed to load trade.");
      });
  }, [tradeId, user.name]);

  const handleOfferTrade = () => {
    navigate(`/offers/${tradeId}`);
  };
  const handleAcceptOffer = async (offerId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/offers/${offerId}/accept`
      );
      if (response.status === 200) {
        socket.emit("offerAccepted", tradeId, offerId);
        alert("Offer accepted successfully!");
      } else {
        alert("Failed to accept the offer.");
      }
    } catch (error) {
      console.error("Error accepting offer:", error);
      alert("There was a problem accepting the offer.");
    }
  };

  const handleRejectOffer = async (offerId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/offers/${offerId}/reject`
      );
      if (response.status === 200) {
        //socket.emit('offerRejected', tradeId, offerId);
        alert("Offer rejected successfully!");
      } else {
        alert("Failed to reject the offer.");
      }
    } catch (error) {
      console.error("Error rejecting offer:", error);
      alert("There was a problem rejecting the offer.");
    }
  };

  if (!trade) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="trade-detail-container">
      <Link to="/browse" className="back-link">
        ← Browse
      </Link>
      <h1 className="trade-title">{trade.title}</h1>
      <img src={tradeImage} alt="Trade" className="trade-image" />
      <p className="trade-details">{trade.description}</p>
      <h3>Accepting Conditions:</h3>
      <ul className="accepting-conditions">
        {trade.conditions.map((condition, index) => (
          <li key={index}>{condition}</li>
        ))}
      </ul>
      {isOwner && (
        <div className="offers-sent-container">
          <h3>Offers</h3>
          {offers.map((offer) => (
            <div key={offer._id} className="offer-tile">
              <div className="offer-image-container">
                <img
                  src={userImage}
                  alt="User Avatar"
                  className="offer-image"
                />
              </div>
              <div className="offer-info">
                <h3 className="offer-title">{offer.commodity}</h3>
                <h4> @{offer.name} </h4>
                <p>Description: {offer.description}</p>
                <p>Quantity: {offer.quantity}</p>
                <p>Cash: {offer.cashOffer}</p>
                <p style={{ color: offer.status === 'Rejected' ? 'red' : 'blue', fontWeight: offer.status === 'Rejected' ? 'bold' : 'bold' }}>
                  Status: {offer.status}
                </p>
              </div>
              {offer.status !== "Rejected" && (
                <div className="offer-actions">
                <button
                  className="accept-btn"
                  style={{ color: 'green', fontWeight: 'bold' }}
                  onClick={() => handleAcceptOffer(offer._id)}
                >
                  Accept
                </button>
                <button
                  className="reject-btn"
                  style={{ color: 'red', fontWeight: 'bold' }}
                  onClick={() => handleRejectOffer(offer._id)}
                >
                  Reject
                </button>
                </div>
              )}
            </div>
          ))}
        </div>

      )}
      {!isOwner && hasOffered && (
        <div className="offers-section">
          <h3>Offers</h3>
          {offers.map((offer) => (
            <div key={offer._id} className="offer-tile">
              <div className="offer-image-container">
                <img
                  src={userImage}
                  alt="User Avatar"
                  className="offer-image"
                />
              </div>
              <div className="offer-info">
                <h3 className="offer-title">{offer.commodity}</h3>
                <h4> @{offer.name} </h4>
                <p>Description: {offer.description}</p>
                <p>Quantity: {offer.quantity}</p>
                <p>Cash: ${offer.cashOffer}</p>
                <p style={{ color: offer.status === 'Rejected' ? 'red' : 'blue', fontWeight: offer.status === 'Rejected' ? 'bold' : 'bold' }}>
                  Status: {offer.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {!isOwner && !hasOffered && (
        <button className="offer-trade-btn" onClick={handleOfferTrade}>
          Offer Trade
        </button>
      )}
      {!isOwner && (
        <Link to={`/user-profile/${trade.name}`} className="profile-link">
          Visit Poster's Profile
        </Link>
      )}
    </div>
  );
};

export default TradeDetail;

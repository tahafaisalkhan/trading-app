import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";

const CreateOffer = () => {
  const { tradeId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    commodity: "",
    quantity: "",
    description: "",
    cash: "",
    conditions: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/offers`, {
        ...formData,
        trade: tradeId,
        name: user.name,
      });

      if (response.status === 200) {
        alert("Offer created successfully!");
        navigate(`/trades/${tradeId}`);
      } else {
        alert("Failed to create offer. Please check your inputs.");
      }
    } catch (error) {
      console.error("Error creating offer:", error);
      alert("Cash or Item limit exceeded!");
    }
  };

  return (
    <div
      style={{
        background: "#FFF",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
        marginTop: "50px",
      }}
    >
      <a
        href="#"
        className="back-link"
        onClick={() => navigate(`/trades/${tradeId}`)}
      >
        ← Back
      </a>
      <form onSubmit={handleSubmit}>
        <h1 style={{ margin: "10px 0" }}>Create Your Offer</h1>
        <div>
          <label style={{ margin: "10px 0", display: "block" }}>Title:</label>
          <input
            style={{
              width: "95%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            type="text"
            name="commodity"
            required
            value={formData.commodity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={{ margin: "10px 0", display: "block" }}>
            Quantity:
          </label>
          <input
            style={{
              width: "95%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            type="number"
            name="quantity"
            min="1"
            required
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={{ margin: "10px 0", display: "block" }}>
            Description:
          </label>
          <textarea
            style={{
              width: "95%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
            name="description"
            rows="4"
            required
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label style={{ margin: "10px 0", display: "block" }}>
            Cash Offer ($):
          </label>
          <input
            style={{
              width: "95%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            type="number"
            name="cash"
            min="1"
            required
            value={formData.cash}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={{ margin: "10px 0", display: "block" }}>
            Conditions:
          </label>
          <textarea
            style={{
              width: "95%",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
            name="conditions"
            rows="5"
            placeholder="Enter all conditions here..."
            value={formData.conditions}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          style={{
            width: "100%",
            padding: "10px",
            margin: "20px 0",
            borderRadius: "4px",
            border: "none",
            color: "white",
            backgroundColor: "#007bff",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          type="submit"
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default CreateOffer;

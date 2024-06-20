import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const CreateTrade = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user.name,
    title: "",
    description: "",
    conditions: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const conditionsArray = formData.conditions
      .split(",")
      .map((item) => item.trim());
    try {
      await axios.post("http://localhost:8000/trades", {
        ...formData,
        conditions: conditionsArray,
      });
      setSuccess("Trade created successfully!");
      setError("");
      navigate("/profile");
    } catch (err) {
      setError("Failed to create trade. Please try again.");
      setSuccess("");
    }
  };

  const styles = {
    container: {
      background: "#FFF",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      padding: "20px",
      maxWidth: "500px",
      margin: "auto",
      marginTop: "50px",
    },
    input: {
      width: "95%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    textarea: {
      width: "95%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
      resize: "vertical",
    },
    label: {
      margin: "10px 0",
      display: "block",
    },
    button: {
      width: "100%",
      padding: "10px",
      margin: "20px 0",
      borderRadius: "4px",
      border: "none",
      color: "white",
      backgroundColor: "#007bff",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    alert: {
      padding: "10px",
      borderRadius: "4px",
      margin: "10px 0",
      color: "white",
    },
    successAlert: {
      backgroundColor: "green",
    },
    errorAlert: {
      backgroundColor: "red",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Create Trade</h2>
        {error && (
          <div style={{ ...styles.alert, ...styles.errorAlert }}>{error}</div>
        )}
        {success && (
          <div style={{ ...styles.alert, ...styles.successAlert }}>
            {success}
          </div>
        )}
        <label style={styles.label} htmlFor="title">
          Title
        </label>
        <input
          style={styles.input}
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={onChange}
          required
        />

        <label style={styles.label} htmlFor="description">
          Description
        </label>
        <textarea
          style={styles.textarea}
          id="description"
          name="description"
          placeholder="Enter description"
          rows="4"
          value={formData.description}
          onChange={onChange}
          required
        />

        <label style={styles.label} htmlFor="conditions">
          Conditions (comma-separated)
        </label>
        <input
          style={styles.input}
          type="text"
          id="conditions"
          name="conditions"
          placeholder="Enter conditions"
          value={formData.conditions}
          onChange={onChange}
          required
        />

        <button style={styles.button} type="submit">
          Create Trade
        </button>
      </form>
    </div>
  );
};

export default CreateTrade;

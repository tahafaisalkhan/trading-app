import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../AuthContext.js";

const ChangePassword = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { oldPassword, newPassword, confirmNewPassword } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        name: user.name,
        oldPassword,
        newPassword,
      });
      const res = await axios.post(
        "http://localhost:8000/change-password",
        body,
        config
      );
      setSuccess(res.data.message);
    } catch (err) {
      setError(err.response.data.message || "Failed to change password");
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        className="login-form"
        onSubmit={onSubmit}
        style={{
          padding: "20px",
          width: "300px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2>Change Password</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <div className="form-group">
          <label htmlFor="oldPassword">Current Password</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            placeholder="Enter current password"
            value={oldPassword}
            onChange={onChange}
            required
            style={{ width: "90%", padding: "8px", margin: "8px 0" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={onChange}
            required
            style={{ width: "90%", padding: "8px", margin: "8px 0" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={onChange}
            required
            style={{ width: "90%", padding: "8px", margin: "8px 0" }}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#007BFF",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

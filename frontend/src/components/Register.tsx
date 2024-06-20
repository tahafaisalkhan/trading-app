import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .post("http://localhost:8000/register", { name, password })
      .then((result) => {
        if (result.data === "Already registered") {
          alert("Name already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          alert("Registered successfully! Please Login to proceed.");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred during registration.");
      });
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
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          width: "300px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2>Signup</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "90%", padding: "8px", margin: "8px 0" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "90%", padding: "8px", margin: "8px 0" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Sign Up
          </button>
        </div>
        <div className="form-group signup-link">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#007BFF" }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

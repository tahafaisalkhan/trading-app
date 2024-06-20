import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext.js";

const Login: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/login", { name, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          console.log("Login Success");
          login({ name });
          alert("Login successful!");
          navigate("/home");
        } else {
          alert("Incorrect password! Please try again.");
        }
      })
      .catch((err) => console.log(err));
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
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your name"
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
            Login
          </button>
        </div>
        <div className="form-group signup-link">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#007BFF" }}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/navbar.css";
import { useAuth } from "../AuthContext.js";

const MainNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    fetch("/users/logout", { method: "GET" }) 
      .then(() => {
        logout();
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <nav>
      <div className="left-menu">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/browse">Browse</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <div className="right-menu">
        <ul>
          <li>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "white",
                padding: "14px 16px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNavbar;

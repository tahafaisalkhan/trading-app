import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./AuthContext";
import { useEffect } from "react";

import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Browse from "./components/Browse.tsx";
import MainNavbar from "./components/Navbar.tsx";
import CreateTrade from "./components/CreateTrade.tsx";
import Profile from "./components/Profile.tsx";
import ChangePassword from "./components/ChangePassword.tsx";
import TradeDetail from "./components/TradeDetail.tsx";
import UserProfile from "./components/UserProfile.tsx";
import CreateOffer from "./components/CreateOffer.tsx";

import { useAuth } from "./AuthContext.js";

const AppWrapper: React.FC = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const noNavbarPaths: string[] = ["/", "/register", "/login"];
  const showNavbar = !noNavbarPaths.includes(location.pathname);
  const navigate = useNavigate();

  // const { isAuth } = useAuth();

  // useEffect(() => {
  //   if (!isAuth()) {
  //     navigate('/login');
  //   }
  // }, [isAuth, navigate]);

  return (
    <>
      {showNavbar && <MainNavbar />}
      <div style={{ marginTop: showNavbar ? "0" : "-3.5rem" }}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/create-trade" element={<CreateTrade />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/trades/:tradeId" element={<TradeDetail />} />
          <Route path="/user-profile/:username" element={<UserProfile />} />
          <Route path="/offers/:tradeId" element={<CreateOffer />} />
        </Routes>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);

export default AppWrapper;

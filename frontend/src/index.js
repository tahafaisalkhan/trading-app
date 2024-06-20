// index.js or index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWrapper from './App.tsx';  // Import AppWrapper instead of App
import { AuthProvider } from './AuthContext';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter/>
    <AuthProvider>
      <AppWrapper /> 
      </AuthProvider>
    <BrowserRouter/>
  </React.StrictMode>
);

reportWebVitals();

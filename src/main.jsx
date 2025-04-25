// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext'; // Correct import path
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> {/* Ensure App is wrapped */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos
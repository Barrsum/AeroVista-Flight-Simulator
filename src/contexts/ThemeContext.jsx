// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';

// Create the context object
export const ThemeContext = createContext(null);

// Create the provider component
export const ThemeProvider = ({ children }) => {
  // State to hold the current theme ('light' or 'dark')
  const [theme, setTheme] = useState(() => {
    // 1. Check localStorage first
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    // 2. Check system preference (optional but good practice)
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   return 'dark';
    // }
    // 3. Default to dark theme
    return 'dark';
  });

  // Effect to apply the theme class to the HTML element and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement; // Get the <html> element
    root.classList.remove('light', 'dark'); // Remove previous theme class
    root.classList.add(theme); // Add the current theme class

    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // Run this effect whenever the theme state changes

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Memoize the context value to prevent unnecessary re-renders of consumers
  // Only create a new value object if 'theme' or 'toggleTheme' changes (toggleTheme is stable)
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Optional: Custom hook for easier consumption
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos
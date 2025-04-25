// src/components/Header.jsx
import React, { useContext } from 'react';
import { ThemeContext, useTheme } from '../contexts/ThemeContext'; // Assuming useTheme hook exists, or use useContext directly
import { FaSun, FaMoon } from 'react-icons/fa';

const PROJECT_TITLE = "AeroVista Simulator"; // Ensure consistency

function Header() {
  // If you created the useTheme hook:
  // const { theme, toggleTheme } = useTheme();
  // Otherwise, use useContext directly:
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    // Increased z-index to z-30, adjusted flex layout for centering
    <header className="absolute top-0 left-0 right-0 z-30 p-4 text-white justify-between items-center">
       {/* Optional subtle background gradient - can be added back if desired */}
       <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent -z-10 pointer-events-none"></div>

      {/* Left Section: Title and Credit */}
      <div className="flex-1 min-w-0"> {/* Allow shrinking, prevent overflow */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight truncate"> {/* Added truncate */}
          {PROJECT_TITLE}
        </h1>
        <p className="text-xs sm:text-sm text-gray-300">Created by - Ram Bapat</p>
      </div>

      {/* Center Section: Theme Toggle Button */}
      <div className="flex justify-center items-center px-2 "> {/* Added padding */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-700/60 hover:bg-gray-600/80 text-yellow-400 dark:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors"
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
        </button>
      </div>

      {/* Right Section: Placeholder for balance */}
      {/* This empty div with flex-1 balances the left side for true centering */}
      <div className="flex-1">
          {/* This div intentionally left blank */}
      </div>

    </header>
  );
}

// Using React.memo can prevent unnecessary re-renders if props don't change
export default React.memo(Header);

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos
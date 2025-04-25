// src/App.jsx
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Experience from './scenes/Experience';
import { Joystick } from 'react-joystick-component';
import HowToPlayModal from './components/HowToPlayModal';
// Added FaArrowUp, FaArrowDown for new buttons
import { FaPause, FaQuestionCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Define Game States
const GAME_STATE = {
  START_SCREEN: 'start_screen',
  PLAYING: 'playing',
  PAUSED: 'paused',
};

function App() {
  const [gameState, setGameState] = useState(GAME_STATE.START_SCREEN);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [joystickData, setJoystickData] = useState({
    left: { x: 0, y: 0, active: false },
    right: { x: 0, y: 0, active: false }
  });
  // --- NEW: State for touch altitude buttons ---
  const [touchAltitudeUpPressed, setTouchAltitudeUpPressed] = useState(false);
  const [touchAltitudeDownPressed, setTouchAltitudeDownPressed] = useState(false);

  // --- Game State Handlers ---
  const handleStart = () => setGameState(GAME_STATE.PLAYING);
  const handlePause = () => setGameState(GAME_STATE.PAUSED);
  const handleResume = () => setGameState(GAME_STATE.PLAYING);
  const handleRestart = () => {
    setGameState(GAME_STATE.PLAYING); // Consider adding true reset logic later
  };
  const handleMainMenu = () => setGameState(GAME_STATE.START_SCREEN);

  // --- Modal Handlers ---
  const openHowToPlay = () => setShowHowToPlay(true);
  const closeHowToPlay = () => setShowHowToPlay(false);

  // --- Joystick Handlers ---
   const handleLeftJoystick = useCallback((data) => {
    setJoystickData(prev => ({ ...prev, left: { x: data.x || 0, y: data.y || 0, active: true } }));
  }, []);
  const handleRightJoystick = useCallback((data) => {
    setJoystickData(prev => ({ ...prev, right: { x: data.x || 0, y: data.y || 0, active: true } }));
  }, []);
  const handleJoystickStop = useCallback((stick) => {
    if (stick === 'left') {
      setJoystickData(prev => ({ ...prev, left: { x: 0, y: 0, active: false } }));
    } else if (stick === 'right') {
      setJoystickData(prev => ({ ...prev, right: { x: 0, y: 0, active: false } }));
    }
  }, []);

  // --- NEW: Handlers for touch altitude buttons ---
  const handleAltitudeUpPress = useCallback(() => setTouchAltitudeUpPressed(true), []);
  const handleAltitudeUpRelease = useCallback(() => setTouchAltitudeUpPressed(false), []);
  const handleAltitudeDownPress = useCallback(() => setTouchAltitudeDownPressed(true), []);
  const handleAltitudeDownRelease = useCallback(() => setTouchAltitudeDownPressed(false), []);


  return (
    <div className="App w-full h-full relative bg-gradient-to-b from-blue-800 to-blue-950 dark:from-gray-900 dark:to-black overflow-hidden">
      <Header />

      {/* --- Start Screen --- */}
      {gameState === GAME_STATE.START_SCREEN && (
         <div className="absolute inset-0 flex flex-col justify-center items-center z-20 bg-black/30 backdrop-blur-sm space-y-6 p-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg text-center">
                AeroVista Simulator
            </h2>
            <p className="text-lg text-gray-200 mb-8">Experience the skies!</p>
            <button
                onClick={handleStart}
                className="px-10 py-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-xl font-semibold rounded-lg shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out"
            >
                Start Flying
            </button>
            <button
                onClick={openHowToPlay}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white text-lg font-medium rounded-lg shadow-md transition-colors duration-200"
            >
                How to Play
            </button>
         </div>
      )}

      {/* --- Experience (3D Scene Wrapper) --- */}
      {(gameState === GAME_STATE.PLAYING || gameState === GAME_STATE.PAUSED) && (
         <div className={`absolute inset-0 z-0 transition-filter duration-300 ${gameState === GAME_STATE.PAUSED ? 'filter blur-md pointer-events-none' : 'filter-none'}`}>
            {/* Pass down the new altitude button states */}
            <Experience
              key={gameState === GAME_STATE.PLAYING ? 'playing' : 'paused'} // Use key to help reset state if needed on restart
              gameState={gameState}
              joystickData={joystickData}
              touchAltitudeUp={touchAltitudeUpPressed}
              touchAltitudeDown={touchAltitudeDownPressed}
             />
         </div>
      )}

      {/* --- In-Game UI (Pause and Controls Buttons) --- */}
      {gameState === GAME_STATE.PLAYING && (
        <div className="absolute top-5 right-5 z-10 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 mt-20">
             {/* Controls Button */}
             <button
                 onClick={openHowToPlay}
                 className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
                 title="Show Controls"
                 aria-label="Show Controls"
             >
                 <FaQuestionCircle size={18} />
             </button>
             {/* Pause Button */}
             <button
                 onClick={handlePause}
                 className="p-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full shadow-lg flex items-center justify-center transition-colors"
                 title="Pause Game"
                 aria-label="Pause Game"
             >
                 <FaPause size={18} />
             </button>
        </div>
      )}

      {/* --- Pause Menu --- */}
      {gameState === GAME_STATE.PAUSED && (
         <div className="absolute inset-0 flex flex-col justify-center items-center z-30 bg-black/60 backdrop-blur-md p-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white">Paused</h2>
            <div className="space-y-4 w-full max-w-xs sm:max-w-sm">
               <button onClick={handleResume} className="block w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg rounded-lg shadow-md transition-colors">Resume</button>
               <button onClick={handleRestart} className="block w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded-lg shadow-md transition-colors">Restart</button>
               <button
                 onClick={openHowToPlay}
                 className="block w-full px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white text-lg rounded-lg shadow-md transition-colors"
               >
                 How to Play
               </button>
               <button onClick={handleMainMenu} className="block w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-lg rounded-lg shadow-md transition-colors">Main Menu</button>
            </div>
         </div>
       )}

      {/* --- Joysticks Overlay --- */}
      {gameState === GAME_STATE.PLAYING && (
        <>
          <div className="absolute bottom-24 sm:bottom-28 left-5 sm:left-10 z-10 block md:hidden">
            <Joystick
              size={100}
              baseColor="rgba(128, 128, 128, 0.6)"
              stickColor="rgba(80, 80, 80, 0.85)"
              move={handleLeftJoystick}
              stop={() => handleJoystickStop('left')}
              throttle={50}
            />
          </div>
          <div className="absolute bottom-24 sm:bottom-28 right-5 sm:right-10 z-10 block md:hidden">
            <Joystick
              size={100}
              baseColor="rgba(128, 128, 128, 0.6)"
              stickColor="rgba(80, 80, 80, 0.85)"
              move={handleRightJoystick}
              stop={() => handleJoystickStop('right')}
              throttle={50}
            />
          </div>
        </>
      )}

      {/* --- NEW: Altitude Buttons Overlay --- */}
      {gameState === GAME_STATE.PLAYING && (
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 flex flex-col space-y-4 md:hidden">
          {/* Altitude Up Button */}
          <button
            className="p-4 bg-green-500/70 hover:bg-green-600/90 active:bg-green-700/90 text-white rounded-full shadow-lg transition-colors"
            title="Increase Altitude"
            aria-label="Increase Altitude"
            onMouseDown={handleAltitudeUpPress}
            onMouseUp={handleAltitudeUpRelease}
            onMouseLeave={handleAltitudeUpRelease} // Release if mouse leaves button while pressed
            onTouchStart={handleAltitudeUpPress}
            onTouchEnd={handleAltitudeUpRelease}
          >
            <FaArrowUp size={20} />
          </button>

          {/* Altitude Down Button */}
          <button
            className="p-4 bg-red-500/70 hover:bg-red-600/90 active:bg-red-700/90 text-white rounded-full shadow-lg transition-colors"
            title="Decrease Altitude"
            aria-label="Decrease Altitude"
            onMouseDown={handleAltitudeDownPress}
            onMouseUp={handleAltitudeDownRelease}
            onMouseLeave={handleAltitudeDownRelease}
            onTouchStart={handleAltitudeDownPress}
            onTouchEnd={handleAltitudeDownRelease}
          >
            <FaArrowDown size={20} />
          </button>
        </div>
      )}

       {/* --- How to Play Modal --- */}
       {showHowToPlay && <HowToPlayModal onClose={closeHowToPlay} />}

      <Footer />
    </div>
  );
}

export default App;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos
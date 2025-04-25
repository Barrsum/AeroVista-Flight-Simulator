// src/components/HowToPlayModal.jsx
import React from 'react';
// CORRECTED import - added FaInfoCircle back
import { FaTimes, FaKeyboard, FaMobileAlt, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaInfoCircle } from 'react-icons/fa';
import { LuJoystick } from 'react-icons/lu'; // Joystick icon

function HowToPlayModal({ onClose }) {
  return (
    // Overlay with blur and smooth transition
    <div className="fixed inset-0 z-30 bg-black/75 backdrop-blur-md flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out">
      {/* Modal Content with gradient background */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-300 dark:border-gray-700">
        {/* Header Section */}
        <div className="flex justify-between items-center p-4 sm:p-5 bg-gray-200 dark:bg-gray-700/50 border-b border-gray-300 dark:border-gray-600">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400 flex items-center">
            {/* This line now works because FaInfoCircle is imported */}
            <FaInfoCircle className="mr-2" /> How to Fly
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors rounded-full p-1 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Close instructions"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content Area with Padding and Scroll (if needed) */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Keyboard Controls Section */}
            <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-100 border-b pb-2 border-gray-300 dark:border-gray-600">
                <FaKeyboard className="mr-2 text-blue-600 dark:text-blue-500" /> Keyboard
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between"><span>Pitch Down / Up:</span> <span className="font-mono font-semibold bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">[W] / [S]</span></li>
                <li className="flex items-center justify-between"><span>Yaw Left / Right:</span> <span className="font-mono font-semibold bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">[A] / [D]</span></li>
                <li className="flex items-center justify-between"><span>Roll Left / Right:</span> <span className="font-mono font-semibold bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">[<FaArrowLeft className="inline -mt-1"/>] / [<FaArrowRight className="inline -mt-1"/>]</span></li>
                <li className="flex items-center justify-between"><span>Throttle +/-:</span> <span className="font-mono font-semibold bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">[<FaArrowUp className="inline -mt-1"/>] / [<FaArrowDown className="inline -mt-1"/>]</span></li>
                <li className="flex items-center justify-between">
                  <span>Altitude +/-:</span>
                  <div>
                    <span className="font-mono font-semibold bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">Space</span> / <span className="font-mono font-semibold bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">Shift</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Touch Controls Section */}
            <div className="bg-white/50 dark:bg-black/20 p-4 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm">
               <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-100 border-b pb-2 border-gray-300 dark:border-gray-600">
                 <FaMobileAlt className="mr-2 text-green-600 dark:text-green-500" /> Touch <span className="text-xs ml-1">(Joysticks)</span>
               </h3>
               <ul className="space-y-2">
                 <li className="flex items-start"><LuJoystick className="mr-2 mt-1 text-lg text-gray-500 dark:text-gray-400"/> <div><span className="font-semibold">Left Stick (Vertical):</span> Pitch Up / Down</div></li>
                 <li className="flex items-start"><LuJoystick className="mr-2 mt-1 text-lg text-gray-500 dark:text-gray-400"/> <div><span className="font-semibold">Left Stick (Horizontal):</span> Roll Left / Right</div></li>
                 <li className="flex items-start"><LuJoystick className="mr-2 mt-1 text-lg text-gray-500 dark:text-gray-400"/> <div><span className="font-semibold">Right Stick (Vertical):</span> Throttle +/-</div></li>
                 <li className="flex items-start"><LuJoystick className="mr-2 mt-1 text-lg text-gray-500 dark:text-gray-400"/> <div><span className="font-semibold">Right Stick (Horizontal):</span> Yaw Left / Right</div></li>
                 <li className="flex items-start"><FaKeyboard className="mr-2 mt-1 text-lg text-gray-500 dark:text-gray-400"/> <div><span className="font-semibold">Altitude:</span> Use Keyboard</div></li>
               </ul>
             </div>

          </div>
        </div>

        {/* Footer Section */}
        <div className="p-4 bg-gray-200 dark:bg-gray-700/50 border-t border-gray-300 dark:border-gray-600">
           <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
           >
             Got it! Let's Fly!
           </button>
        </div>
      </div>
    </div>
  );
}

export default HowToPlayModal;

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos
// src/components/Footer.jsx
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const LINKEDIN_URL = "https://www.linkedin.com/in/ram-bapat-barrsum-diamos";
const GITHUB_REPO_URL = "https://github.com/Barrsum/AeroVista-Flight-Simulator.git";
const PROJECT_TITLE = "AeroVista Simulator";

function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-30 p-3 bg-gradient-to-t from-black/50 to-transparent text-white flex flex-col sm:flex-row justify-between items-center text-xs">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent -z-10 pointer-events-none"></div>
        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                title="LinkedIn Profile"
                className="hover:text-blue-400 transition-colors"
            >
                <FaLinkedin size={20} />
            </a>
            <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                title="View Source on GitHub"
                className="hover:text-gray-400 transition-colors"
            >
                <FaGithub size={20} />
            </a>
            <p className="hidden md:inline">{PROJECT_TITLE} - Created By Ram Bapat</p>
        </div>

        <div className="text-center sm:text-right">
            <p>Connect via LinkedIn / View Source on GitHub</p>
            <p className="md:hidden">{PROJECT_TITLE}</p>
            <p className="md:hidden">Created By Ram Bapat</p>
        </div>
    </footer>
  );
}

export default React.memo(Footer);

// Created by Ram Bapat, www.linkedin.com/in/ram-bapat-barrsum-diamos
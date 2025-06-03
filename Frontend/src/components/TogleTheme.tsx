import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function ToggleTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme ? savedTheme === 'dark' : prefersDark;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <button
      onClick={toggleTheme}
      className="w-[30px] h-[30px] bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 hover:cursor-pointer transition-colors duration-200"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? (
        <FontAwesomeIcon icon={faSun} className="w-6 h-6 text-yellow-500" />
      ) : (
        <FontAwesomeIcon icon={faMoon} className="w-6 h-6 text-gray-500" />
      )}
    </button>
  );
}

export default ToggleTheme;

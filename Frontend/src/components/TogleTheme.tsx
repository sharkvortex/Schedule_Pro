import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function ToggleTheme() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    setIsDarkMode(isDark);
    document.documentElement.classList.add(isDark ? 'dark' : 'light');
    document.documentElement.classList.remove(isDark ? 'light' : 'dark');
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    const newTheme = newMode ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);

    document.documentElement.classList.add(newTheme);
    document.documentElement.classList.remove(newMode ? 'light' : 'dark');
  };

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

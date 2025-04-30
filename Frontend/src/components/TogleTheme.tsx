import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // นำเข้า FontAwesomeIcon
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'; // นำเข้าไอคอนที่ต้องการจาก Font Awesome

function ToggleTheme() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
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

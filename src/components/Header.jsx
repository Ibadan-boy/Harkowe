// src/components/Header.jsx
import imgHeader from '../assets/file-text.svg';
import TitleHeader from './TitleHeader';
import { SunMoon } from 'lucide-react';
import { useDarkMode } from './ThemeChanger';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, setTitle }) {
  const { toggleTheme } = useDarkMode();
  const navigate = useNavigate();

  function handleNav(){
    navigate('/home')
  }

  return (
    <header className="flex flex-col sm:flex-row py-4 px-6 sticky top-0 z-50 font-calm bg-white transition-colors duration-300">
      
      {/* Mobile Layout */}
      <div onClick={handleNav} className="flex flex-col sm:hidden space-y-3 w-full">
        <div className="flex items-center justify-center gap-4">
          <img
            src={imgHeader}
            alt="Harkowe company logo"
            className="w-9 h-9"
          />
          <h1 className="text-2xl font-bold font-writing text-green-800 dark:text-green-300">
            <span className="text-green-800 dark:text-green-300">Har</span>
            <span className="text-gray-600 dark:text-gray-300">kowe</span>
          </h1>
        </div>

        {/* Title header centered */}
        <div className="flex justify-center">
          <TitleHeader title={title} setTitle={setTitle} />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex w-full relative items-center">
        <div className="max-w-6xl flex items-center gap-4">
          <img
            src={imgHeader}
            alt="Harkowe company logo"
            className="w-9 h-9"
            onClick={handleNav}
          />
          <h1 onClick={handleNav} className="text-2xl sm:text-3xl font-bold font-writing text-green-800 dark:text-green-300">
            <span className="text-green-800 dark:text-green-600">Har</span>
            <span className="text-gray-600 dark:text-gray-300">kowe</span>
          </h1>
        </div>

        <div className="flex items-baseline absolute left-1/2 transform -translate-x-1/2">
          <TitleHeader title={title} setTitle={setTitle} />
        </div>

        <div className="absolute right-0">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-green-800 transition-colors duration-300"
          >
            <SunMoon className="cursor-pointer transition-transform duration-300 hover:rotate-180" />
          </button>
        </div>
      </div>
    </header>
  );
}

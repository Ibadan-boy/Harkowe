// src/context/ThemeContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const ThemeToggle = createContext();

export const ThemeChanger = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        console.log('Loaded theme from localStorage:', savedTheme);
        return savedTheme === 'dark';
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('System prefers dark:', prefersDark);
      return prefersDark;
    }
    return false; // Default to light for SSR
  });

  useEffect(() => {
    console.log('Dark theme state:', darkTheme);
    if (darkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      console.log('Applied dark class');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      console.log('Removed dark class');
    }
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prev) => {
      console.log('Toggling theme from', prev, 'to', !prev);
      return !prev;
    });
  };

  return (
    <ThemeToggle.Provider value={{ darkTheme, setDarkTheme, toggleTheme }}>
      {children}
    </ThemeToggle.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(ThemeToggle);
  if (!context) {
    throw new Error('useDarkMode must be used within a ThemeChanger provider');
  }
  return context;
};
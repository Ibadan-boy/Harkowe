// src/context/ThemeContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const ThemeToggle = createContext(); // Create a context object for theme toggling

export const ThemeChanger = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark;
    }
    return false; // Default to light for SSR
  });

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prev) => {
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
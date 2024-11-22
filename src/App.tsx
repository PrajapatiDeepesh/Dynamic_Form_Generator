import React, { useState, useEffect } from 'react';
import Home from './pages/Home';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dynamic Form Generator</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md shadow hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <main className="p-4">
        <Home />
      </main>
    </div>
  );
};

export default App;

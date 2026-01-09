import React, { useState, useEffect } from 'react';
import SystemGate from './SystemGate';
import DesignSystemLab from './DesignSystemLab';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [showLab, setShowLab] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load saved dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('design-system-dark-mode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('design-system-dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Handle initialization from SystemGate
  const handleInitialize = () => {
    setIsLoading(true);
    // Simulate loading time for lazy loading
    setTimeout(() => {
      setShowLab(true);
      setIsLoading(false);
    }, 1500);
  };

  // Handle going back to the gate
  const handleBackToGate = () => {
    setShowLab(false);
  };

  return (
    <div style={{ 
      fontFamily: 'Inter, system-ui, sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      <AnimatePresence mode="wait">
        {!showLab ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SystemGate 
              onInitialize={handleInitialize}
              isDarkMode={darkMode}
              setIsDarkMode={setDarkMode}
            />
          </motion.div>
        ) : (
          <motion.div
            key="lab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DesignSystemLab />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay for transitions */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: darkMode ? '#000000' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '60px',
              height: '60px',
              border: `4px solid ${darkMode ? '#333333' : '#e0e0e0'}`,
              borderTop: `4px solid ${darkMode ? '#FFD700' : '#000000'}`,
              borderRadius: '50%'
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default App;
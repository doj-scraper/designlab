import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Settings, Info, Moon, Sun } from 'lucide-react';

interface SystemGateProps {
  onInitialize: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

const SystemGate: React.FC<SystemGateProps> = ({ 
  onInitialize, 
  isDarkMode, 
  setIsDarkMode 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  // Handle initialization with loading state
  const handleInitialize = () => {
    setIsLoading(true);
    // Simulate loading time for lazy loading effect
    setTimeout(() => {
      onInitialize();
    }, 1500);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleInitialize();
      }
      if (event.key === 'Escape') {
        setShowAbout(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Background pattern based on theme
  const backgroundPattern = isDarkMode 
    ? 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)'
    : 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: isDarkMode ? '#2a2a2a' : '#f7f7f7',
        backgroundImage: backgroundPattern,
        backgroundSize: '20px 20px',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header Controls */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}
      >
        <button
          onClick={() => setShowAbout(!showAbout)}
          style={{
            background: 'transparent',
            border: `1px solid ${isDarkMode ? '#ffffff' : '#000000'}`,
            color: isDarkMode ? '#ffffff' : '#000000',
            padding: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '0px'
          }}
          aria-label="About this tool"
        >
          <Info size={16} />
        </button>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            background: 'transparent',
            border: `1px solid ${isDarkMode ? '#ffffff' : '#000000'}`,
            color: isDarkMode ? '#ffffff' : '#000000',
            padding: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '0px'
          }}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%'
        }}
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.3, 
            duration: 0.6, 
            type: 'spring',
            stiffness: 200 
          }}
          style={{
            width: '120px',
            height: '120px',
            backgroundColor: isDarkMode ? '#000000' : '#FFD700',
            border: `4px solid ${isDarkMode ? '#FFD700' : '#000000'}`,
            margin: '0 auto 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDarkMode ? '#FFD700' : '#000000'
          }}
        >
          <Settings size={48} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            margin: '0 0 1rem 0',
            color: isDarkMode ? '#ffffff' : '#000000',
            letterSpacing: '-0.02em'
          }}
        >
          Design System Lab
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            fontSize: '1.25rem',
            margin: '0 0 3rem 0',
            color: isDarkMode ? '#cccccc' : '#666666',
            lineHeight: 1.6
          }}
        >
          Professional-grade design generator and testing suite.
          Create, test, and export design systems with precision.
        </motion.p>

        {/* Initialize Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          onClick={handleInitialize}
          disabled={isLoading}
          style={{
            backgroundColor: isDarkMode ? '#FFD700' : '#000000',
            color: isDarkMode ? '#000000' : '#ffffff',
            border: 'none',
            padding: '1rem 3rem',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
          }}
          aria-label="Initialize Design System Lab"
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%'
                }} />
              </motion.div>
              Initializing...
            </>
          ) : (
            <>
              <Play size={20} />
              Enter Lab
            </>
          )}
        </motion.button>

        {/* Keyboard hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          style={{
            fontSize: '0.875rem',
            color: isDarkMode ? '#888888' : '#999999',
            marginTop: '2rem'
          }}
        >
          Press Enter to continue
        </motion.p>
      </motion.div>

      {/* About Panel */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
              padding: '2rem',
              maxWidth: '500px',
              width: '90%',
              textAlign: 'left'
            }}
          >
            <h3 style={{ margin: '0 0 1rem 0', color: isDarkMode ? '#ffffff' : '#000000' }}>
              About Design System Lab
            </h3>
            <p style={{ 
              margin: '0 0 1rem 0', 
              color: isDarkMode ? '#cccccc' : '#666666',
              lineHeight: 1.6
            }}>
              A comprehensive design system playground featuring multiple themes, 
              color palettes, typography controls, and accessibility tools. 
              Built with React, TypeScript, and Framer Motion.
            </p>
            <p style={{ 
              margin: 0, 
              color: isDarkMode ? '#888888' : '#999999',
              fontSize: '0.875rem'
            }}>
              Version 2.0 • January 2026
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: isDarkMode ? '#000000' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: 'center'
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '60px',
                  height: '60px',
                  border: `4px solid ${isDarkMode ? '#333333' : '#e0e0e0'}`,
                  borderTop: `4px solid ${isDarkMode ? '#FFD700' : '#000000'}`,
                  borderRadius: '50%',
                  margin: '0 auto 1rem'
                }}
              />
              <p style={{
                color: isDarkMode ? '#ffffff' : '#000000',
                fontSize: '1.125rem',
                fontWeight: 'bold'
              }}>
                Loading Design System Lab...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SystemGate;
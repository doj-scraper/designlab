import React from 'react';
import DesignSystemLab from './DesignSystemLab';
import SystemGate from './SystemGate';

/*
EXAMPLE USAGE GUIDE
===================

This file demonstrates how to use the Design System Lab components
in your own applications.

*/

// Example 1: Using the full DesignSystemLab component
export const FullLabExample: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <DesignSystemLab />
    </div>
  );
};

// Example 2: Using the SystemGate as an entry point
export const GatedLabExample: React.FC = () => {
  const [showLab, setShowLab] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {!showLab ? (
        <SystemGate 
          onInitialize={() => setShowLab(true)}
          isDarkMode={darkMode}
          setIsDarkMode={setDarkMode}
        />
      ) : (
        <DesignSystemLab />
      )}
    </div>
  );
};

// Example 3: Custom integration with your app
export const CustomIntegrationExample: React.FC = () => {
  const [config, setConfig] = React.useState({
    theme: 'flat-modern',
    palette: 'default',
    font: 'inter',
    darkMode: false
  });

  // Generate CSS variables from config
  const generateCSS = () => {
    return `
      :root {
        --theme: ${config.theme};
        --palette: ${config.palette};
        --font: ${config.font};
        --dark-mode: ${config.darkMode};
      }
    `;
  };

  return (
    <div>
      <style>{generateCSS()}</style>
      
      <div className="your-app">
        <h1>Your Application</h1>
        <p>Current theme: {config.theme}</p>
        <p>Current palette: {config.palette}</p>
        
        {/* You can embed the DesignSystemLab as a configuration panel */}
        <details>
          <summary>Open Design System Lab</summary>
          <DesignSystemLab />
        </details>
      </div>
    </div>
  );
};

// Example 4: Using exported design tokens
export const ExportExample: React.FC = () => {
  // This would typically come from the export modal
  const designTokens = {
    colors: {
      primary: '#3b82f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    radii: {
      default: '8px'
    },
    shadows: {
      default: '0 2px 8px rgba(0,0,0,0.08)',
      large: '0 12px 32px rgba(0,0,0,0.12)'
    }
  };

  return (
    <div>
      <h2>Exported Design Tokens</h2>
      <pre>{JSON.stringify(designTokens, null, 2)}</pre>
      
      <div style={{
        padding: '2rem',
        backgroundColor: designTokens.colors.primary,
        borderRadius: designTokens.radii.default,
        boxShadow: designTokens.shadows.default,
        color: 'white'
      }}>
        <h3>Component using exported tokens</h3>
        <p>This component uses the exported design tokens directly.</p>
      </div>
    </div>
  );
};

// Example 5: Theme-specific component rendering
export const ThemeAwareExample: React.FC<{ theme: string }> = ({ theme }) => {
  // Render different components based on active theme
  const renderThemeSpecificContent = () => {
    switch (theme) {
      case 'cyberpunk':
        return (
          <div style={{
            background: '#0a0a0a',
            color: '#00ff9d',
            padding: '2rem',
            border: '2px solid #00ff9d',
            boxShadow: '0 0 20px #00ff9d'
          }}>
            <h3>Cyberpunk Mode Active</h3>
            <p>Neon glow effects and terminal styling applied.</p>
          </div>
        );
        
      case 'retro-vintage':
        return (
          <div style={{
            background: '#f7f7f2',
            color: '#2d3142',
            padding: '2rem',
            border: '2px solid #c9ada7',
            fontFamily: 'Courier New, monospace'
          }}>
            <h3>Retro Vintage Mode Active</h3>
            <p>Cassette tape aesthetics and vintage colors applied.</p>
          </div>
        );
        
      case 'art-deco':
        return (
          <div style={{
            background: '#ffffff',
            color: '#003049',
            padding: '2rem',
            border: '4px solid #003049',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '-8px',
              right: '-8px',
              bottom: '-8px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
              zIndex: -1
            }} />
            <h3>Art Deco Mode Active</h3>
            <p>Geometric patterns and gold accents applied.</p>
          </div>
        );
        
      default:
        return (
          <div style={{
            background: '#f8fafc',
            color: '#0f172a',
            padding: '2rem',
            border: '1px solid #e2e8f0',
            borderRadius: '8px'
          }}>
            <h3>Standard Mode Active</h3>
            <p>Clean, modern styling applied.</p>
          </div>
        );
    }
  };

  return (
    <div>
      <h2>Theme-Aware Component</h2>
      {renderThemeSpecificContent()}
    </div>
  );
};

// Example 6: Accessibility integration
export const AccessibilityExample: React.FC = () => {
  const [highContrast, setHighContrast] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setHighContrast(mediaQuery.matches);
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
  }, []);

  return (
    <div style={{
      backgroundColor: highContrast ? '#000000' : '#ffffff',
      color: highContrast ? '#ffffff' : '#000000',
      padding: '2rem',
      transition: reducedMotion ? 'none' : 'all 0.3s ease'
    }}>
      <h1>Accessibility-Aware Component</h1>
      <p>
        High contrast: {highContrast ? 'Enabled' : 'Disabled'}<br />
        Reduced motion: {reducedMotion ? 'Enabled' : 'Disabled'}
      </p>
      
      <button
        style={{
          backgroundColor: highContrast ? '#ffffff' : '#000000',
          color: highContrast ? '#000000' : '#ffffff',
          border: highContrast ? '2px solid #ffffff' : '2px solid #000000',
          padding: '1rem',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
        onClick={() => alert('Button clicked!')}
      >
        Accessible Button
      </button>
    </div>
  );
};

// Example 7: URL-based configuration sharing
export const ShareableConfigExample: React.FC = () => {
  const shareConfig = (config: any) => {
    const base64 = btoa(JSON.stringify(config));
    const url = `${window.location.origin}${window.location.pathname}?config=${base64}`;
    
    navigator.clipboard.writeText(url).then(() => {
      alert('Configuration URL copied to clipboard!');
    });
  };

  const loadConfigFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const config = params.get('config');
    
    if (config) {
      try {
        const decoded = JSON.parse(atob(config));
        console.log('Loaded config:', decoded);
        return decoded;
      } catch (error) {
        console.error('Failed to load config from URL:', error);
      }
    }
    
    return null;
  };

  React.useEffect(() => {
    const config = loadConfigFromUrl();
    if (config) {
      // Apply the loaded configuration
      console.log('Applying config:', config);
    }
  }, []);

  return (
    <div>
      <h2>Shareable Configuration</h2>
      <button
        onClick={() => shareConfig({
          theme: 'cyberpunk',
          palette: 'cyberpunk',
          font: 'jetbrains-mono',
          darkMode: true
        })}
        style={{
          backgroundColor: '#000000',
          color: '#00ff9d',
          border: '2px solid #00ff9d',
          padding: '1rem',
          cursor: 'pointer',
          fontFamily: 'JetBrains Mono, monospace'
        }}
      >
        Share Cyberpunk Config
      </button>
    </div>
  );
};

export default {
  FullLabExample,
  GatedLabExample,
  CustomIntegrationExample,
  ExportExample,
  ThemeAwareExample,
  AccessibilityExample,
  ShareableConfigExample
};
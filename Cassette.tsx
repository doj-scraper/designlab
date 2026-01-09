import React from 'react';
import { Play, Pause, Square, Rewind, FastForward } from 'lucide-react';
import { ThemeName, PaletteName } from './types';

interface CassetteProps {
  theme: ThemeName;
  palette: PaletteName;
}

const Cassette: React.FC<CassetteProps> = ({ theme, palette }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      border: '2px solid var(--border)',
      borderRadius: '8px',
      padding: '1.5rem',
      maxWidth: '400px',
      margin: '0 auto',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.4)',
      fontFamily: 'Courier New, monospace',
      position: 'relative'
    }}>
      {/* Cassette Label */}
      <div style={{
        backgroundColor: 'var(--surface-alt)',
        border: '2px solid var(--border)',
        padding: '0.75rem',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          margin: '0 0 0.25rem 0', 
          fontSize: '1rem',
          color: 'var(--text)',
          fontWeight: 'bold'
        }}>
          RETRO MIXTAPE
        </h3>
        <p style={{ 
          margin: '0', 
          fontSize: '0.75rem',
          color: 'var(--text-secondary)'
        }}>
          Design System Lab Vol. 1
        </p>
      </div>

      {/* Cassette Window */}
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '2px solid var(--border)',
        borderRadius: '4px',
        padding: '1rem',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Left Spool */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid #666',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#333',
          position: 'relative'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#666'
          }} />
          {isPlaying && (
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTop: '2px solid var(--primary)',
              animation: 'spin 1s linear infinite'
            }} />
          )}
        </div>

        {/* Tape */}
        <div style={{
          flex: 1,
          height: '8px',
          backgroundColor: '#8B4513',
          margin: '0 1rem',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: isPlaying ? `${(currentTime % 100)}%` : '10%',
            width: '4px',
            height: '100%',
            backgroundColor: '#666',
            transition: isPlaying ? 'none' : 'left 0.3s ease'
          }} />
        </div>

        {/* Right Spool */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid #666',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#333',
          position: 'relative'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#666'
          }} />
          {isPlaying && (
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTop: '2px solid var(--primary)',
              animation: 'spin 1s linear infinite reverse'
            }} />
          )}
        </div>
      </div>

      {/* Time Display */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1rem',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: 'var(--text)'
      }}>
        {formatTime(currentTime)}
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <button style={controlButtonStyle}>
          <Rewind size={16} />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            ...controlButtonStyle,
            backgroundColor: 'var(--primary)',
            color: 'white'
          }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button style={controlButtonStyle}>
          <Square size={16} />
        </button>
        <button style={controlButtonStyle}>
          <FastForward size={16} />
        </button>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const controlButtonStyle = {
  backgroundColor: 'transparent',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '0.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px'
};

export default Cassette;
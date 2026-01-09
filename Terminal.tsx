import React from 'react';
import { Monitor, Power, TerminalSquare } from 'lucide-react';
import { ThemeName, PaletteName } from './types';

interface TerminalProps {
  theme: ThemeName;
  palette: PaletteName;
}

const Terminal: React.FC<TerminalProps> = ({ theme, palette }) => {
  const [isPoweredOn, setIsPoweredOn] = React.useState(true);
  const [terminalText, setTerminalText] = React.useState([
    '> Design System Lab v2.0',
    '> Initializing cyberpunk theme...',
    '> Loading neon palette...',
    '> System ready.',
    '> _'
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTerminalText(prev => {
        const newText = [...prev];
        const lastLine = newText[newText.length - 1];
        if (lastLine === '> _') {
          newText[newText.length - 1] = '> SYSTEM CHECK...';
        } else if (lastLine === '> SYSTEM CHECK...') {
          newText[newText.length - 1] = '> All systems operational.';
          newText.push('> _');
        } else if (lastLine === '> All systems operational.') {
          newText[newText.length - 1] = '> Awaiting user input...';
          newText.push('> _');
        }
        return newText;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      border: '2px solid var(--primary)',
      borderRadius: '0px',
      padding: '1rem',
      fontFamily: 'JetBrains Mono, monospace',
      boxShadow: '0 0 20px var(--primary), inset 0 0 10px rgba(0, 255, 157, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Scanline effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 157, 0.1) 2px, rgba(0, 255, 157, 0.1) 4px)',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Terminal Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid var(--primary)',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TerminalSquare size={16} style={{ color: 'var(--primary)' }} />
          <span style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 'bold' }}>
            CYBERPUNK_TERMINAL
          </span>
        </div>
        <button
          onClick={() => setIsPoweredOn(!isPoweredOn)}
          style={{
            background: 'transparent',
            border: '1px solid var(--primary)',
            color: 'var(--primary)',
            padding: '0.25rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Power size={12} />
        </button>
      </div>

      {/* Terminal Screen */}
      <div style={{
        backgroundColor: '#000000',
        color: '#00ff9d',
        padding: '1rem',
        minHeight: '200px',
        fontSize: '0.875rem',
        lineHeight: '1.4',
        position: 'relative',
        zIndex: 2,
        border: '1px solid var(--primary)'
      }}>
        {isPoweredOn ? (
          <div>
            {terminalText.map((line, index) => (
              <div key={index} style={{ marginBottom: '0.25rem' }}>
                {line}
              </div>
            ))}
            <div style={{
              display: 'inline-block',
              width: '8px',
              height: '16px',
              backgroundColor: '#00ff9d',
              animation: 'blink 1s infinite',
              marginLeft: '4px'
            }} />
          </div>
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '200px',
            color: '#666666'
          }}>
            <Monitor size={48} />
            <span style={{ marginLeft: '1rem' }}>SYSTEM OFFLINE</span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Terminal;
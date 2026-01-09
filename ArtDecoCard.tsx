import React from 'react';
import { Crown, Gem, Star } from 'lucide-react';
import { ThemeName, PaletteName } from './types';

interface ArtDecoCardProps {
  theme: ThemeName;
  palette: PaletteName;
}

const ArtDecoCard: React.FC<ArtDecoCardProps> = ({ theme, palette }) => {
  return (
    <div style={{
      backgroundColor: 'var(--surface)',
      border: '4px solid var(--primary)',
      position: 'relative',
      padding: '2rem',
      maxWidth: '350px',
      margin: '0 auto'
    }}>
      {/* Gold Border Effect */}
      <div style={{
        position: 'absolute',
        top: '-8px',
        left: '-8px',
        right: '-8px',
        bottom: '-8px',
        background: 'var(--gold-gradient, linear-gradient(135deg, #D4AF37 0%, #FFD700 100%))',
        zIndex: -1,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 10% 0%, 10% 10%, 0% 10%)'
      }} />

      {/* Header with Geometric Pattern */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid var(--gold-accent, #D4AF37)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Crown size={24} style={{ color: 'var(--gold-accent, #D4AF37)' }} />
          <h3 style={{
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 'bold',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--primary)'
          }}>
            Art Deco
          </h3>
          <Crown size={24} style={{ color: 'var(--gold-accent, #D4AF37)' }} />
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        color: 'var(--gold-accent, #D4AF37)'
      }}>
        <Gem size={16} />
      </div>
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        color: 'var(--gold-accent, #D4AF37)'
      }}>
        <Gem size={16} />
      </div>
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '1rem',
        color: 'var(--gold-accent, #D4AF37)'
      }}>
        <Star size={16} />
      </div>
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        color: 'var(--gold-accent, #D4AF37)'
      }}>
        <Star size={16} />
      </div>

      {/* Content */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          margin: '0 0 1rem 0',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          color: 'var(--text)'
        }}>
          Experience the luxury and geometric elegance of the Art Deco movement with bold lines and golden accents.
        </p>

        {/* Geometric Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          margin: '1rem 0'
        }}>
          <div style={{
            width: '20px',
            height: '2px',
            backgroundColor: 'var(--gold-accent, #D4AF37)'
          }} />
          <div style={{
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--gold-accent, #D4AF37)',
            transform: 'rotate(45deg)'
          }} />
          <div style={{
            width: '20px',
            height: '2px',
            backgroundColor: 'var(--gold-accent, #D4AF37)'
          }} />
        </div>

        {/* Action Button */}
        <button style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--gold-accent, var(--primary)) 100%)',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          fontWeight: 'bold',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          fontSize: '0.875rem'
        }}>
          Explore
        </button>
      </div>
    </div>
  );
};

export default ArtDecoCard;
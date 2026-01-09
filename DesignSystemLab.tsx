import React, { useState, useEffect, useCallback, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Smartphone,
  Palette,
  Type,
  Sun,
  Moon,
  GripVertical,
  ChevronRight,
  ChevronLeft,
  LayoutTemplate,
  Home,
  BarChart2,
  Layers,
  MessageSquare,
  User,
  LogOut,
  Search,
  Bell,
  Settings,
  ZoomIn,
  ZoomOut,
  Download,
  Copy,
  Check,
  AlertTriangle,
  Info,
  Code,
  FileText,
  Wind,
  Palette as PaletteIcon,
  Type as TypeIcon
} from 'lucide-react';

// Import TypeScript types
import {
  ThemeName,
  PaletteName,
  FontName,
  ViewMode,
  AnimationSpeed,
  SpacingScale,
  ThemeConfig,
  PaletteConfig,
  TypographyConfig,
  DesignSystemState,
  BarData,
  DockPosition,
  DragInfo,
  HistoryEntry,
  ExportFormat,
  ContrastCheck,
  PresetConfig
} from './types';

// Import components
import SafeComponentWrapper from './SafeComponentWrapper';
import Terminal from './Terminal';
import Cassette from './Cassette';
import ArtDecoCard from './ArtDecoCard';

/* ======================== CONSTANTS & CONFIGURATION ======================== */

const FONT_MAP: Record<FontName, string> = {
  inter: '"Inter", system-ui, sans-serif',
  roboto: '"Roboto", sans-serif',
  poppins: '"Poppins", sans-serif',
  georgia: '"Georgia", serif',
  courier: '"Courier Prime", monospace',
  'space-mono': '"Space Mono", monospace',
  'jetbrains-mono': '"JetBrains Mono", monospace',
  'space-grotesk': '"Space Grotesk", sans-serif'
};

const ANIMATION_SPEEDS: Record<AnimationSpeed, string> = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  none: '0ms'
};

const SPACING_SCALES: Record<SpacingScale, { unit: number; scale: number }> = {
  compact: { unit: 2, scale: 1.25 },
  default: { unit: 4, scale: 1.5 },
  relaxed: { unit: 8, scale: 2 }
};

const PRESETS: Record<string, PresetConfig> = {
  'material-ocean': {
    theme: 'material',
    palette: 'ocean',
    font: 'roboto',
    darkMode: false,
    baseFontSize: 16,
    typeScale: 1.25
  },
  'dark-cyberpunk': {
    theme: 'cyberpunk',
    palette: 'cyberpunk',
    font: 'jetbrains-mono',
    darkMode: true,
    baseFontSize: 16,
    typeScale: 1.25
  },
  'retro-vintage': {
    theme: 'retro-vintage',
    palette: 'retro',
    font: 'courier',
    darkMode: false,
    baseFontSize: 16,
    typeScale: 1.25
  },
  'minimalist-clean': {
    theme: 'minimalist',
    palette: 'default',
    font: 'inter',
    darkMode: false,
    baseFontSize: 16,
    typeScale: 1.2
  }
};

/* ======================== UTILITY FUNCTIONS ======================== */

// Contrast ratio calculator
const getContrastRatio = (hex1: string, hex2: string): number => {
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    const sRGB = [r, g, b].map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };
  
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Check contrast accessibility
const checkContrast = (hex1: string, hex2: string): ContrastCheck => {
  const ratio = getContrastRatio(hex1, hex2);
  return {
    ratio,
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
    fail: ratio < 4.5
  };
};

// Color shade generator
const generateShades = (hex: string): Record<string, string> => {
  const shades: Record<string, string> = {};
  const base = parseInt(hex.slice(1), 16);
  const r = (base >> 16) & 0xff;
  const g = (base >> 8) & 0xff;
  const b = (base >> 0) & 0xff;
  
  for (let i = 1; i <= 9; i++) {
    const factor = i / 10;
    const newR = Math.round(r + (255 - r) * (1 - factor));
    const newG = Math.round(g + (255 - g) * (1 - factor));
    const newB = Math.round(b + (255 - b) * (1 - factor));
    shades[`--primary-${i}00`] = `#${((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, '0')}`;
  }
  
  return shades;
};

/* ======================== MAIN COMPONENT ======================== */

const DesignSystemLab: React.FC = () => {
  /* -------- Core State -------- */
  const [theme, setTheme] = useState<ThemeName>('flat-modern');
  const [palette, setPalette] = useState<PaletteName>('default');
  const [font, setFont] = useState<FontName>('inter');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  
  /* -------- Typography & Layout State -------- */
  const [baseFontSize, setBaseFontSize] = useState<number>(16);
  const [typeScale, setTypeScale] = useState<number>(1.25);
  const [spacingUnit, setSpacingUnit] = useState<number>(4);
  const [spacingScale, setSpacingScale] = useState<SpacingScale>('default');
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>('normal');
  
  /* -------- Navigation State -------- */
  const [isNavExpanded, setIsNavExpanded] = useState<boolean>(true);
  const [activeNav, setActiveNav] = useState<string>('Dashboard');

  /* -------- Dock State -------- */
  const [dockExpanded, setDockExpanded] = useState<boolean>(true);
  const [dockPosition, setDockPosition] = useState<DockPosition>({ x: 0, y: 0 });

  /* -------- Modal States -------- */
  const [showThemeSelector, setShowThemeSelector] = useState<boolean>(false);
  const [showPaletteSelector, setShowPaletteSelector] = useState<boolean>(false);
  const [showFontSelector, setShowFontSelector] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showContrastChecker, setShowContrastChecker] = useState<boolean>(false);
  const [showSandbox, setShowSandbox] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  /* -------- Zoom State -------- */
  const [zoom, setZoom] = useState<number>(1);

  /* -------- History State -------- */
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  /* -------- Export State -------- */
  const [exportFormat, setExportFormat] = useState<ExportFormat>('css');
  const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);

  /* -------- Error State -------- */
  const [hasError, setHasError] = useState<boolean>(false);

  /* ======================== THEME DEFINITIONS ======================== */

  const defaultThemes: Record<ThemeName, ThemeConfig> = {
    'flat-modern': {
      '--radius': '8px',
      '--shadow': '0 2px 8px rgba(0,0,0,0.08)',
      '--shadow-lg': '0 12px 32px rgba(0,0,0,0.12)',
      '--border-width': '1px',
      '--button-transform': 'scale(0.98)',
    },
    'neo-brutalist': {
      '--radius': '0px',
      '--shadow': '4px 4px 0 rgba(0,0,0,1)',
      '--shadow-lg': '8px 8px 0 rgba(0,0,0,1)',
      '--border-width': '3px',
      '--button-transform': 'translate(2px, 2px)',
    },
    'skeuomorphic': {
      '--radius': '12px',
      '--shadow': 'inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.1)',
      '--shadow-lg': 'inset 0 1px 0 rgba(255,255,255,0.6), 0 12px 24px rgba(0,0,0,0.15)',
      '--border-width': '1px',
      '--button-transform': 'scale(0.97)',
    },
    'neumorphic': {
      '--radius': '20px',
      '--shadow': '9px 9px 18px rgba(163,177,198,0.4), -9px -9px 18px rgba(255,255,255,0.8)',
      '--shadow-lg': '18px 18px 36px rgba(163,177,198,0.4), -18px -18px 36px rgba(255,255,255,0.8)',
      '--border-width': '0px',
      '--button-transform': 'scale(0.98)',
    },
    'glassmorphism': {
      '--radius': '16px',
      '--shadow': '0 8px 32px rgba(0,0,0,0.1)',
      '--shadow-lg': '0 16px 48px rgba(0,0,0,0.15)',
      '--border-width': '1px',
      '--button-transform': 'scale(0.97)',
    },
    'material': {
      '--radius': '4px',
      '--shadow': '0 2px 4px rgba(0,0,0,0.14), 0 3px 4px rgba(0,0,0,0.12)',
      '--shadow-lg': '0 8px 10px rgba(0,0,0,0.14), 0 3px 14px rgba(0,0,0,0.12)',
      '--border-width': '0px',
      '--button-transform': 'scale(1)',
    },
    'retro-vintage': {
      '--radius': '12px',
      '--shadow': '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.4)',
      '--shadow-lg': '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 4px 0 rgba(255, 255, 255, 0.3)',
      '--border-width': '2px',
      '--button-transform': 'scale(0.95) rotate(-1deg)',
      '--texture': 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'none\'/%3E%3Cpath d=\'M20 20h60v60H20z\' stroke=\'rgba(0,0,0,0.1)\' stroke-width=\'2\' fill=\'none\'/%3E%3C/svg%3E")'
    },
    'cyberpunk': {
      '--radius': '0px',
      '--shadow': '0 0 15px var(--neon-glow, #00ff9d), 0 0 30px var(--neon-glow, #00ff9d), inset 0 0 10px rgba(0, 255, 157, 0.2)',
      '--shadow-lg': '0 0 30px var(--neon-glow, #ff00ff), 0 0 60px var(--neon-glow, #ff00ff), inset 0 0 20px rgba(255, 0, 255, 0.3)',
      '--border-width': '2px',
      '--button-transform': 'translate(3px, 3px)',
      '--scanline': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 157, 0.1) 2px, rgba(0, 255, 157, 0.1) 4px)',
      '--grid-bg': 'linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px)'
    },
    'claymorphism': {
      '--radius': '30px',
      '--shadow': '8px 8px 16px rgba(174,174,192,0.4), -8px -8px 16px rgba(255,255,255,0.8)',
      '--shadow-lg': '12px 12px 24px rgba(174,174,192,0.4), -12px -12px 24px rgba(255,255,255,0.8)',
      '--border-width': '0px',
      '--button-transform': 'scale(0.98)',
    },
    'organic-modern': {
      '--radius': '24px',
      '--shadow': '8px 8px 24px rgba(0, 0, 0, 0.08), -8px -8px 24px rgba(255, 255, 255, 0.8)',
      '--shadow-lg': '16px 16px 48px rgba(0, 0, 0, 0.1), -16px -16px 48px rgba(255, 255, 255, 0.9)',
      '--border-width': '0px',
      '--button-transform': 'scale(0.96)',
      '--organic-wave': 'url("data:image/svg+xml,%3Csvg viewBox=\"0 0 100 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0,10 c20,-15 40,15 60,-5 c20,-15 40,15 60,-5 v10 h-120 z\" fill=\"rgba(0,0,0,0.02)\"/%3E%3C/svg%3E")',
      '--flow-gradient': 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 70%)'
    },
    'minimalist': {
      '--radius': '2px',
      '--shadow': '0 1px 3px rgba(0, 0, 0, 0.05)',
      '--shadow-lg': '0 2px 6px rgba(0, 0, 0, 0.05)',
      '--border-width': '1px',
      '--button-transform': 'none',
      '--minimal-grid': 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,0,0,0.02) 8px, rgba(0,0,0,0.02) 16px)'
    },
    'art-deco': {
      '--radius': '0px',
      '--shadow': '8px 8px 0px rgba(0, 0, 0, 0.2), 16px 16px 0px rgba(0, 0, 0, 0.1)',
      '--shadow-lg': '16px 16px 0px rgba(0, 0, 0, 0.25), 32px 32px 0px rgba(0, 0, 0, 0.15)',
      '--border-width': '4px',
      '--button-transform': 'translate(4px, 4px) rotate(1deg)',
      '--geometric-pattern': 'url("data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"rgba(0,0,0,0.05)\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 40L40 0H20L0 20z\"/%3E%3Cpath d=\"M40 40V20L20 40z\"/%3E%3C/g%3E%3C/svg%3E")',
      '--gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 25%, #F5F5DC 50%, #FFD700 75%, #D4AF37 100%)'
    }
  };

  const lightPalettes: Record<PaletteName, PaletteConfig> = {
    default: {
      '--primary': '#3b82f6',
      '--success': '#10b981',
      '--warning': '#f59e0b',
      '--error': '#ef4444',
      '--info': '#06b6d4',
      '--surface': '#ffffff',
      '--surface-alt': '#f8fafc',
      '--text': '#0f172a',
      '--text-secondary': '#64748b',
      '--border': '#e2e8f0',
    },
    ocean: {
      '--primary': '#0891b2',
      '--success': '#06b6d4',
      '--warning': '#fbbf24',
      '--error': '#dc2626',
      '--info': '#3b82f6',
      '--surface': '#f0f9ff',
      '--surface-alt': '#e0f2fe',
      '--text': '#0c4a6e',
      '--text-secondary': '#0369a1',
      '--border': '#bae6fd',
    },
    sunset: {
      '--primary': '#f97316',
      '--success': '#84cc16',
      '--warning': '#fbbf24',
      '--error': '#dc2626',
      '--info': '#8b5cf6',
      '--surface': '#fff7ed',
      '--surface-alt': '#ffedd5',
      '--text': '#7c2d12',
      '--text-secondary': '#c2410c',
      '--border': '#fed7aa',
    },
    forest: {
      '--primary': '#059669',
      '--success': '#10b981',
      '--warning': '#f59e0b',
      '--error': '#dc2626',
      '--info': '#0891b2',
      '--surface': '#f0fdf4',
      '--surface-alt': '#dcfce7',
      '--text': '#14532d',
      '--text-secondary': '#166534',
      '--border': '#bbf7d0',
    },
    purple: {
      '--primary': '#7c3aed',
      '--success': '#10b981',
      '--warning': '#f59e0b',
      '--error': '#ef4444',
      '--info': '#3b82f6',
      '--surface': '#faf5ff',
      '--surface-alt': '#f3e8ff',
      '--text': '#581c87',
      '--text-secondary': '#7e22ce',
      '--border': '#e9d5ff',
    },
    corporate: {
      '--primary': '#1e3a8a',
      '--success': '#15803d',
      '--warning': '#b45309',
      '--error': '#b91c1c',
      '--info': '#1d4ed8',
      '--surface': '#ffffff',
      '--surface-alt': '#f1f5f9',
      '--text': '#172554',
      '--text-secondary': '#475569',
      '--border': '#cbd5e1',
    },
    cyberpunk: {
      '--primary': '#00ff9d',
      '--success': '#00ffff',
      '--warning': '#ff00ff',
      '--error': '#ff003c',
      '--info': '#9d00ff',
      '--surface': '#0a0a0a',
      '--surface-alt': '#141414',
      '--text': '#ffffff',
      '--text-secondary': '#b0b0b0',
      '--border': '#333333',
      '--neon-glow': '#00ff9d'
    },
    pastel: {
      '--primary': '#a3d9b1',
      '--success': '#a3d9b1',
      '--warning': '#ffd6a5',
      '--error': '#ffadad',
      '--info': '#caffbf',
      '--surface': '#f9f7f7',
      '--surface-alt': '#f0ebeb',
      '--text': '#3f3f3f',
      '--text-secondary': '#7d7d7d',
      '--border': '#d9d9d9',
    },
    'art-deco': {
      '--primary': '#003049',
      '--success': '#669bbc',
      '--warning': '#f77f00',
      '--error': '#d62828',
      '--info': '#780000',
      '--surface': '#ffffff',
      '--surface-alt': '#fdf0d5',
      '--text': '#2d3142',
      '--text-secondary': '#4a4e69',
      '--border': '#003049',
      '--gold-accent': '#D4AF37'
    },
    retro: {
      '--primary': '#ff6b6b',
      '--success': '#06d6a0',
      '--warning': '#ffd166',
      '--error': '#ef476f',
      '--info': '#118ab2',
      '--surface': '#f7f7f2',
      '--surface-alt': '#e9ecef',
      '--text': '#2d3142',
      '--text-secondary': '#4a4e69',
      '--border': '#c9ada7',
      '--vintage-accent': '#d4a373'
    }
  };

  const darkPalettes: Record<PaletteName, PaletteConfig> = {
    default: {
      '--primary': '#60a5fa',
      '--success': '#34d399',
      '--warning': '#fbbf24',
      '--error': '#f87171',
      '--info': '#22d3ee',
      '--surface': '#1e293b',
      '--surface-alt': '#0f172a',
      '--text': '#f1f5f9',
      '--text-secondary': '#94a3b8',
      '--border': '#334155',
    },
    ocean: {
      '--primary': '#22d3ee',
      '--success': '#4ade80',
      '--warning': '#fbbf24',
      '--error': '#f87171',
      '--info': '#60a5fa',
      '--surface': '#0c2d3a',
      '--surface-alt': '#051e2a',
      '--text': '#e0f2fe',
      '--text-secondary': '#38bdf8',
      '--border': '#164e63',
    },
    sunset: {
      '--primary': '#fb923c',
      '--success': '#bef264',
      '--warning': '#fbbf24',
      '--error': '#f87171',
      '--info': '#c084fc',
      '--surface': '#3f2817',
      '--surface-alt': '#1f1409',
      '--text': '#fef3c7',
      '--text-secondary': '#fdba74',
      '--border': '#92400e',
    },
    forest: {
      '--primary': '#34d399',
      '--success': '#34d399',
      '--warning': '#fbbf24',
      '--error': '#f87171',
      '--info': '#22d3ee',
      '--surface': '#064e3b',
      '--surface-alt': '#022c22',
      '--text': '#ecfdf5',
      '--text-secondary': '#6ee7b7',
      '--border': '#065f46',
    },
    purple: {
      '--primary': '#a78bfa',
      '--success': '#34d399',
      '--warning': '#fbbf24',
      '--error': '#f87171',
      '--info': '#60a5fa',
      '--surface': '#2e1065',
      '--surface-alt': '#1e1b4b',
      '--text': '#f3e8ff',
      '--text-secondary': '#d8b4fe',
      '--border': '#5b21b6',
    },
    corporate: {
      '--primary': '#60a5fa',
      '--success': '#4ade80',
      '--warning': '#fbbf24',
      '--error': '#f87171',
      '--info': '#38bdf8',
      '--surface': '#172554',
      '--surface-alt': '#0f172a',
      '--text': '#eff6ff',
      '--text-secondary': '#93c5fd',
      '--border': '#1e3a8a',
    },
    cyberpunk: {
      '--primary': '#00ff9d',
      '--success': '#00ffff',
      '--warning': '#ff00ff',
      '--error': '#ff003c',
      '--info': '#9d00ff',
      '--surface': '#000000',
      '--surface-alt': '#0a0a0a',
      '--text': '#ffffff',
      '--text-secondary': '#cccccc',
      '--border': '#00ff9d',
      '--neon-glow': '#00ff9d'
    },
    pastel: {
      '--primary': '#a3d9b1',
      '--success': '#a3d9b1',
      '--warning': '#ffd6a5',
      '--error': '#ffadad',
      '--info': '#caffbf',
      '--surface': '#2d2d2d',
      '--surface-alt': '#3f3f3f',
      '--text': '#f9f7f7',
      '--text-secondary': '#d0d0d0',
      '--border': '#555555',
    },
    'art-deco': {
      '--primary': '#669bbc',
      '--success': '#94d2bd',
      '--warning': '#f77f00',
      '--error': '#e63946',
      '--info': '#a8dadc',
      '--surface': '#0d1b2a',
      '--surface-alt': '#1b263b',
      '--text': '#e0e1dd',
      '--text-secondary': '#778da9',
      '--border': '#415a77',
      '--gold-accent': '#D4AF37'
    },
    retro: {
      '--primary': '#ff8fa3',
      '--success': '#56cfe1',
      '--warning': '#ffd166',
      '--error': '#ff6b6b',
      '--info': '#118ab2',
      '--surface': '#2d3142',
      '--surface-alt': '#4a4e69',
      '--text': '#f7f7f2',
      '--text-secondary': '#c9ada7',
      '--border': '#8d99ae',
      '--vintage-accent': '#d4a373'
    }
  };

  /* ======================== EFFECTS ======================== */

  // Apply styles to document
  const applyStyles = useCallback((vars: Record<string, string>): void => {
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => {
      if (v) root.style.setProperty(k, v);
    });
  }, []);

  // Main style effect
  useEffect(() => {
    try {
      // Reset error state
      setHasError(false);
      
      // Apply theme styles
      const activeTheme = defaultThemes[theme];
      const activePalette = darkMode ? darkPalettes[palette] : lightPalettes[palette];
      
      applyStyles(activeTheme);
      applyStyles(activePalette);
      applyStyles({ '--font-sans': FONT_MAP[font] });
      
      // Apply typography
      const h1Size = baseFontSize * Math.pow(typeScale, 3);
      const h2Size = baseFontSize * Math.pow(typeScale, 2);
      const h3Size = baseFontSize * typeScale;
      
      applyStyles({
        '--h1-size': `${h1Size}px`,
        '--h2-size': `${h2Size}px`,
        '--h3-size': `${h3Size}px`,
        '--body-size': `${baseFontSize}px`,
        '--spacing-1': `${spacingUnit}px`,
        '--spacing-2': `${spacingUnit * 2}px`,
        '--spacing-3': `${spacingUnit * 3}px`,
        '--spacing-4': `${spacingUnit * 4}px`,
        '--spacing-5': `${spacingUnit * 6}px`,
        '--spacing-6': `${spacingUnit * 8}px`,
        '--transition-speed': ANIMATION_SPEEDS[animationSpeed]
      });

      // Add to history
      const newEntry: HistoryEntry = {
        timestamp: new Date().toISOString(),
        theme,
        palette,
        font,
        darkMode,
        baseFontSize,
        typeScale
      };
      
      setHistory(prev => {
        const updated = [newEntry, ...prev.slice(0, 9)];
        setHistoryIndex(0);
        return updated;
      });
      
    } catch (error) {
      console.error('Error applying styles:', error);
      setHasError(true);
    }
  }, [theme, palette, font, darkMode, baseFontSize, typeScale, spacingUnit, animationSpeed, applyStyles]);

  // Initialize dock position
  useEffect(() => {
    setDockPosition({
      x: window.innerWidth - 100,
      y: window.innerHeight / 2 - 150
    });
  }, []);

  // Handle URL config loading
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const config = params.get('config');
    if (config) {
      try {
        const decoded = JSON.parse(atob(config));
        if (decoded.theme) setTheme(decoded.theme);
        if (decoded.palette) setPalette(decoded.palette);
        if (decoded.font) setFont(decoded.font);
        if (decoded.darkMode !== undefined) setDarkMode(decoded.darkMode);
        if (decoded.baseFontSize) setBaseFontSize(decoded.baseFontSize);
        if (decoded.typeScale) setTypeScale(decoded.typeScale);
      } catch (error) {
        console.error('Error loading config from URL:', error);
      }
    }
  }, []);

  /* ======================== HANDLERS ======================== */

  const handleDragEnd = (_: unknown, info: DragInfo): void => {
    setDockPosition(p => ({ x: p.x + info.offset.x, y: p.y + info.offset.y }));
  };

  const generateShareUrl = () => {
    const config = { theme, palette, font, darkMode, baseFontSize, typeScale };
    const base64 = btoa(JSON.stringify(config));
    const url = `${window.location.origin}${window.location.pathname}?config=${base64}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    });
  };

  const generateExportCode = () => {
    const activeTheme = defaultThemes[theme];
    const activePalette = darkMode ? darkPalettes[palette] : lightPalettes[palette];
    
    switch (exportFormat) {
      case 'css':
        const cssVars = { ...activeTheme, ...activePalette };
        return `:root {\n${Object.entries(cssVars).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`;
      
      case 'tailwind':
        return `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${activePalette['--primary']}',
        success: '${activePalette['--success']}',
        warning: '${activePalette['--warning']}',
        error: '${activePalette['--error']}',
        info: '${activePalette['--info']}',
      },
      borderRadius: {
        DEFAULT: '${activeTheme['--radius']}',
      },
      boxShadow: {
        DEFAULT: '${activeTheme['--shadow']}',
        lg: '${activeTheme['--shadow-lg']}',
      }
    }
  }
};`;
      
      case 'figma':
        return JSON.stringify({
          name: `${theme}-${palette}`,
          colors: {
            primary: activePalette['--primary'],
            success: activePalette['--success'],
            warning: activePalette['--warning'],
            error: activePalette['--error'],
            info: activePalette['--info'],
            surface: activePalette['--surface'],
            'surface-alt': activePalette['--surface-alt'],
            text: activePalette['--text'],
            'text-secondary': activePalette['--text-secondary'],
            border: activePalette['--border']
          },
          radii: {
            DEFAULT: activeTheme['--radius']
          }
        }, null, 2);
      
      default:
        return '';
    }
  };

  const copyExportCode = () => {
    navigator.clipboard.writeText(generateExportCode()).then(() => {
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    });
  };

  const applyPreset = (presetName: string) => {
    const preset = PRESETS[presetName];
    if (preset) {
      setTheme(preset.theme);
      setPalette(preset.palette);
      setFont(preset.font);
      setDarkMode(preset.darkMode);
      if (preset.baseFontSize) setBaseFontSize(preset.baseFontSize);
      if (preset.typeScale) setTypeScale(preset.typeScale);
    }
  };

  /* ======================== RENDER ======================== */

  const styles = `
    :root {
      --h1-size: 3rem;
      --h2-size: 2rem;
      --h3-size: 1.5rem;
      --body-size: 1rem;
      --sidebar-width-expanded: 260px;
      --sidebar-width-collapsed: 72px;
    }

    .design-system-lab {
      min-height: 100vh;
      background-color: var(--surface-alt);
      color: var(--text);
      transition: background-color var(--transition-speed) ease, color var(--transition-speed) ease;
      font-family: var(--font-sans);
      overflow-x: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }

    .preview-window {
      background: var(--surface);
      width: 100%;
      max-width: 1400px;
      height: 90vh;
      border-radius: var(--radius);
      box-shadow: var(--shadow-lg);
      border: var(--border-width) solid var(--border);
      display: flex;
      overflow: hidden; 
      position: relative;
      transition: all var(--transition-speed) ease;
    }

    .preview-window.mobile {
      max-width: 420px;
      height: 85vh;
      border: 8px solid var(--text);
      border-radius: 32px;
    }

    .sidebar {
      background: var(--surface);
      border-right: var(--border-width) solid var(--border);
      display: flex;
      flex-direction: column;
      transition: width var(--transition-speed) cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 10;
      overflow: hidden;
      white-space: nowrap;
    }

    .sidebar-header {
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 1.25rem;
      border-bottom: var(--border-width) solid var(--border);
    }

    .sidebar-logo {
      width: 32px;
      height: 32px;
      background: var(--primary);
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .sidebar-title {
      font-weight: 700;
      font-size: 1.1rem;
      margin-left: 1rem;
      opacity: 1;
      transition: opacity var(--transition-speed);
    }

    .nav-items {
      flex: 1;
      padding: 1.5rem 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      border-radius: var(--radius);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-speed);
      text-decoration: none;
      border: var(--border-width) solid transparent;
      user-select: none;
    }

    .nav-item:hover {
      background: var(--surface-alt);
      color: var(--primary);
    }

    .nav-item.active {
      background: var(--surface-alt);
      color: var(--primary);
      border-color: var(--border);
      font-weight: 600;
    }

    .nav-icon { flex-shrink: 0; }
    .nav-label { margin-left: 1rem; }

    .user-profile {
      padding: 1rem;
      border-top: var(--border-width) solid var(--border);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--surface-alt);
      border: var(--border-width) solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .nav-toggle {
      position: absolute;
      right: -12px;
      top: 24px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: var(--surface);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-secondary);
      box-shadow: var(--shadow);
      z-index: 50;
    }

    .nav-toggle:hover { color: var(--primary); }

    .main-content {
      flex: 1;
      overflow-y: auto;
      background: var(--surface-alt);
      position: relative; 
    }

    header.top-bar {
      background: var(--surface);
      padding: 1rem 2rem;
      border-bottom: var(--border-width) solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 5;
    }

    .search-bar {
      display: flex;
      align-items: center;
      background: var(--surface-alt);
      padding: 0.5rem 1rem;
      border-radius: var(--radius);
      border: var(--border-width) solid var(--border);
      width: 300px;
      color: var(--text-secondary);
    }

    .content-wrapper {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .welcome-hero {
      background: var(--primary);
      color: white;
      padding: 2.5rem;
      border-radius: var(--radius);
      margin-bottom: 2rem;
      box-shadow: var(--shadow-lg);
      position: relative;
      overflow: hidden;
    }

    .component-box {
      background: var(--surface);
      padding: 1.5rem;
      border-radius: var(--radius);
      border: var(--border-width) solid var(--border);
      box-shadow: var(--shadow);
    }

    .btn-icon {
      background: transparent;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 6px;
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
    }

    .btn-icon:hover {
      background: var(--surface-alt);
      color: var(--primary);
    }

    .dock-menu {
      position: absolute;
      bottom: 110%;
      right: 0;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 0.5rem;
      min-width: 200px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      z-index: 9999;
      color: var(--text);
    }

    .option-item {
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      border-radius: 6px;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .option-item:hover { background: var(--surface-alt); }
    .option-item.active { background: var(--primary); color: white; }

    .dock-overlay { position: fixed; inset: 0; z-index: 9998; }
    
    .zoom-controls {
      position: absolute;
      right: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      z-index: 900;
      background: var(--surface);
      padding: 1rem 0.5rem;
      border-radius: 99px;
      border: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-items: center;
      box-shadow: var(--shadow);
      opacity: 0.9;
    }

    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    }

    .modal-content {
      background: var(--surface);
      border: var(--border-width) solid var(--border);
      border-radius: var(--radius);
      padding: 2rem;
      max-width: 600px;
      width: 90vw;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: var(--shadow-lg);
    }

    .export-tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.5rem;
    }

    .export-tab {
      padding: 0.5rem 1rem;
      cursor: pointer;
      border-radius: var(--radius);
      font-size: 0.875rem;
    }

    .export-tab.active {
      background: var(--primary);
      color: white;
    }

    .export-code {
      background: var(--surface-alt);
      padding: 1rem;
      border-radius: var(--radius);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.875rem;
      line-height: 1.5;
      max-height: 400px;
      overflow-y: auto;
      border: 1px solid var(--border);
      white-space: pre-wrap;
    }

    .contrast-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .contrast-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
    }

    .contrast-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
      margin-top: 0.5rem;
    }

    .contrast-badge.pass {
      background: var(--success);
      color: white;
    }

    .contrast-badge.fail {
      background: var(--error);
      color: white;
    }

    .sandbox-section {
      margin-top: 2rem;
      padding: 2rem;
      border: 2px dashed var(--border);
      border-radius: var(--radius);
    }

    .stress-test-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    /* Theme-specific styles */
    ${theme === 'retro-vintage' ? `
      body { background: var(--surface) var(--texture); background-size: 100px 100px; }
      .btn { font-family: 'Courier New', monospace; letter-spacing: 1px; }
    ` : ''}

    ${theme === 'cyberpunk' ? `
      body { background: var(--scanline), var(--grid-bg), var(--surface); }
      .btn { text-shadow: 0 0 5px currentColor; border: 2px solid var(--primary); background: transparent; }
      .btn:hover { background: var(--primary); color: var(--surface); box-shadow: 0 0 20px var(--primary); }
    ` : ''}

    ${theme === 'minimalist' ? `
      body { background: var(--surface) var(--minimal-grid); background-size: 100% 100%; }
    ` : ''}

    ${theme === 'art-deco' ? `
      body { background: var(--geometric-pattern), var(--surface); background-size: 40px 40px, 100% 100%; }
    ` : ''}
  `;

  /* ======================== RENDER ======================== */

  return (
    <SafeComponentWrapper>
      <style>{styles}</style>
      
      {/* Error Display */}
      {hasError && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          background: '#dc2626',
          color: 'white',
          padding: '1rem',
          borderRadius: '8px',
          zIndex: 10001,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertTriangle size={20} />
          <span>Configuration error detected. Check console for details.</span>
        </div>
      )}

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Export Configuration</h3>
                <button
                  onClick={() => setShowExportModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)'
                  }}
                >
                  ×
                </button>
              </div>

              <div className="export-tabs">
                {(['css', 'tailwind', 'figma'] as ExportFormat[]).map(format => (
                  <div
                    key={format}
                    className={`export-tab ${exportFormat === format ? 'active' : ''}`}
                    onClick={() => setExportFormat(format)}
                  >
                    {format === 'css' && <Code size={16} style={{ marginRight: '0.5rem' }} />}
                    {format === 'tailwind' && <Wind size={16} style={{ marginRight: '0.5rem' }} />}
                    {format === 'figma' && <PaletteIcon size={16} style={{ marginRight: '0.5rem' }} />}
                    {format.toUpperCase()}
                  </div>
                ))}
              </div>

              <div className="export-code">
                {generateExportCode()}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  onClick={copyExportCode}
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {copiedToClipboard ? <Check size={16} /> : <Copy size={16} />}
                  {copiedToClipboard ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contrast Checker Modal */}
      <AnimatePresence>
        {showContrastChecker && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContrastChecker(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Accessibility Contrast Check</h3>
                <button
                  onClick={() => setShowContrastChecker(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)'
                  }}
                >
                  ×
                </button>
              </div>

              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Contrast ratios against white/black text (WCAG AA: 4.5:1, AAA: 7:1)
              </p>

              <div className="contrast-grid">
                {Object.entries(darkMode ? darkPalettes[palette] : lightPalettes[palette])
                  .filter(([key]) => key.startsWith('--') && !key.includes('surface') && !key.includes('text'))
                  .map(([key, value]) => {
                    const contrast = checkContrast(value, darkMode ? '#ffffff' : '#000000');
                    return (
                      <div key={key} className="contrast-item">
                        <div style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: value,
                          border: '1px solid var(--border)',
                          marginBottom: '0.5rem'
                        }} />
                        <div style={{ fontSize: '0.75rem', textAlign: 'center' }}>
                          <div>{key.replace('--', '')}</div>
                          <div className={`contrast-badge ${contrast.aa ? 'pass' : 'fail'}`}>
                            {contrast.ratio.toFixed(2)}:1 {contrast.aa ? 'AA' : 'FAIL'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHistory(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Recent Configurations</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {history.slice(0, 10).map((entry, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '1rem',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      marginBottom: '0.5rem',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setTheme(entry.theme);
                      setPalette(entry.palette);
                      setFont(entry.font);
                      setDarkMode(entry.darkMode);
                      setBaseFontSize(entry.baseFontSize);
                      setTypeScale(entry.typeScale);
                      setShowHistory(false);
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>{entry.theme}</strong> + <strong>{entry.palette}</strong>
                      </div>
                      <small style={{ color: 'var(--text-secondary)' }}>
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </small>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      {entry.font} • {entry.baseFontSize}px • {entry.typeScale}x
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Dock Menu */}
      <motion.div
        drag
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        style={{ position: 'fixed', zIndex: 10000 }}
      >
        <motion.div
          style={{
            background: '#1a1a1a',
            border: '2px solid #404040',
            borderRadius: '16px',
            padding: '0.5rem 0.75rem',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
            color: '#e5e5e5'
          } as CSSProperties}
        >
          <div className="drag-handle" style={{ cursor: 'grab', padding: '0 4px', display: 'flex' }}>
            <GripVertical size={16} color="#737373" />
          </div>

          {dockExpanded && (
            <>
              <div style={{ width: 1, height: 24, background: '#404040' }} />
              
              {/* Theme Selector */}
              <div style={{ position: 'relative' }}>
                <button 
                  className="btn-icon" 
                  style={{border:'none', background: 'transparent', color: '#e5e5e5'}}
                  onClick={() => { 
                    setShowThemeSelector(!showThemeSelector); 
                    setShowPaletteSelector(false); 
                    setShowFontSelector(false); 
                  }}
                  aria-label="Select Theme"
                >
                  <LayoutTemplate size={18} />
                </button>
                {showThemeSelector && (
                  <div className="dock-menu" role="menu">
                    <h3 style={{fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '0.5rem 0.75rem', margin: 0, textTransform: 'uppercase'}}>Theme</h3>
                    {Object.keys(defaultThemes).map(t => (
                      <div 
                        key={t} 
                        className={`option-item ${theme === t ? 'active' : ''}`} 
                        onClick={() => { 
                          setTheme(t as ThemeName); 
                          setShowThemeSelector(false); 
                        }}
                        role="menuitem"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Palette Selector */}
              <div style={{ position: 'relative' }}>
                <button 
                   className="btn-icon" 
                   style={{border:'none', background: 'transparent', color: '#e5e5e5'}}
                  onClick={() => { 
                    setShowPaletteSelector(!showPaletteSelector); 
                    setShowThemeSelector(false); 
                    setShowFontSelector(false); 
                  }}
                  aria-label="Select Color Palette"
                >
                  <Palette size={18} />
                </button>
                {showPaletteSelector && (
                  <div className="dock-menu" role="menu">
                    <h3 style={{fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '0.5rem 0.75rem', margin: 0, textTransform: 'uppercase'}}>Palette</h3>
                    {Object.keys(lightPalettes).map(p => (
                      <div 
                        key={p} 
                        className={`option-item ${palette === p ? 'active' : ''}`} 
                        onClick={() => { 
                          setPalette(p as PaletteName); 
                          setShowPaletteSelector(false); 
                        }}
                        role="menuitem"
                      >
                        {p}
                        <div style={{ 
                          width: 12, 
                          height: 12, 
                          borderRadius: '50%', 
                          background: lightPalettes[p as PaletteName]['--primary'] 
                        }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Font Selector */}
              <div style={{ position: 'relative' }}>
                <button 
                   className="btn-icon" 
                   style={{border:'none', background: 'transparent', color: '#e5e5e5'}}
                  onClick={() => { 
                    setShowFontSelector(!showFontSelector); 
                    setShowThemeSelector(false); 
                    setShowPaletteSelector(false); 
                  }}
                  aria-label="Select Font"
                >
                  <Type size={18} />
                </button>
                {showFontSelector && (
                  <div className="dock-menu" role="menu">
                     <h3 style={{fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '0.5rem 0.75rem', margin: 0, textTransform: 'uppercase'}}>Font</h3>
                    {Object.keys(FONT_MAP).map(f => (
                      <div 
                        key={f} 
                        className={`option-item ${font === f ? 'active' : ''}`} 
                        onClick={() => { 
                          setFont(f as FontName); 
                          setShowFontSelector(false); 
                        }}
                        role="menuitem"
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ width: 1, height: 24, background: '#404040' }} />

              {/* Dark Mode Toggle */}
              <button 
                className="btn-icon" 
                style={{border:'none', background: 'transparent', color: '#e5e5e5'}}
                onClick={() => setDarkMode(v => !v)}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              {/* View Mode Toggle */}
              <button 
                className="btn-icon" 
                style={{border:'none', background: 'transparent', color: '#e5e5e5'}}
                onClick={() => setViewMode(v => v === 'desktop' ? 'mobile' : 'desktop')}
                aria-label={viewMode === 'desktop' ? "Switch to mobile view" : "Switch to desktop view"}
              >
                {viewMode === 'desktop' ? <Smartphone size={18} /> : <Monitor size={18} />}
              </button>

              {/* Export Button */}
              <button 
                className="btn-icon" 
                style={{border:'none', background: 'transparent', color: '#e5e5e5'}}
                onClick={() => setShowExportModal(true)}
                aria-label="Export configuration"
              >
                <Download size={18} />
              </button>

              {/* Contrast Checker */}
              <button 
                className="btn-icon" 
                style={{border:'none', background: 'transparent', color: '#e5e5e5'}}
                onClick={() => setShowContrastChecker(true)}
                aria-label="Check color contrast accessibility"
              >
                <Info size={18} />
              </button>

              {/* History Button */}
              <button 
                className="btn-icon" 
                style={{border:'none', background: 'transparent', color: '#e5e5e5'}}
                onClick={() => setShowHistory(true)}
                aria-label="View configuration history"
              >
                <FileText size={18} />
              </button>
            </>
          )}

          <button 
            className="btn-icon" 
            style={{border:'none', background: 'transparent', color: '#e5e5e5'}}
            onClick={() => setDockExpanded(v => !v)}
            aria-label={dockExpanded ? "Collapse dock" : "Expand dock"}
          >
            {dockExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </motion.div>
      </motion.div>

      {/* Overlay for modals */}
      {(showThemeSelector || showPaletteSelector || showFontSelector) && (
        <div className="dock-overlay" onClick={() => { 
          setShowThemeSelector(false); 
          setShowPaletteSelector(false); 
          setShowFontSelector(false); 
        }} />
      )}

      {/* Main Preview Window */}
      <div className={`preview-window ${viewMode}`}>
        <motion.aside 
          className="sidebar"
          initial={false}
          animate={{ width: isNavExpanded ? 260 : 72 }}
          transition={{ duration: 0.3 }}
        >
          <div className="sidebar-header" style={{ position: 'relative' }}>
            <div className="sidebar-logo"><Layers size={20} /></div>
            <motion.div 
              className="sidebar-title"
              animate={{ opacity: isNavExpanded ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Design Lab
            </motion.div>
            
            <button 
              className="nav-toggle"
              onClick={() => setIsNavExpanded(!isNavExpanded)}
              aria-label={isNavExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isNavExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </button>
          </div>

          <nav className="nav-items" role="navigation">
            <div 
              className={`nav-item ${activeNav === 'Dashboard' ? 'active' : ''}`} 
              onClick={() => setActiveNav('Dashboard')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveNav('Dashboard')}
              aria-label="Dashboard"
            >
              <Home size={20} className="nav-icon" />
              {isNavExpanded && <span className="nav-label">Dashboard</span>}
            </div>
            <div 
              className={`nav-item ${activeNav === 'Analytics' ? 'active' : ''}`} 
              onClick={() => setActiveNav('Analytics')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveNav('Analytics')}
              aria-label="Analytics"
            >
              <BarChart2 size={20} className="nav-icon" />
              {isNavExpanded && <span className="nav-label">Analytics</span>}
            </div>
            <div 
              className={`nav-item ${activeNav === 'Messages' ? 'active' : ''}`} 
              onClick={() => setActiveNav('Messages')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveNav('Messages')}
              aria-label="Messages"
            >
              <MessageSquare size={20} className="nav-icon" />
              {isNavExpanded && <span className="nav-label">Messages</span>}
            </div>
            <div 
              className={`nav-item ${activeNav === 'Customers' ? 'active' : ''}`} 
              onClick={() => setActiveNav('Customers')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveNav('Customers')}
              aria-label="Customers"
            >
              <User size={20} className="nav-icon" />
              {isNavExpanded && <span className="nav-label">Customers</span>}
            </div>
            <div style={{ flex: 1 }} />
            <div className="nav-item" role="button" tabIndex={0} aria-label="Logout">
              <LogOut size={20} className="nav-icon" />
              {isNavExpanded && <span className="nav-label">Logout</span>}
            </div>
          </nav>

          <div className="user-profile">
            <div className="avatar">JD</div>
            {isNavExpanded && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>John Doe</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Admin</div>
              </div>
            )}
          </div>
        </motion.aside>

        <main className="main-content">
          <header className="top-bar">
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{activeNav}</h2>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="search-bar" role="search">
                <Search size={16} style={{ marginRight: '0.5rem' }} />
                <span style={{ fontSize: '0.9rem' }}>Search...</span>
              </div>
              <button className="btn-icon" aria-label="Notifications">
                <Bell size={18} />
              </button>
            </div>
          </header>

          <div 
            className="content-wrapper"
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              width: `${100 / zoom}%`,
              transition: 'transform var(--transition-speed) ease, width var(--transition-speed) ease'
            } as CSSProperties}
          >
            
            <div className="welcome-hero">
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', position: 'relative', zIndex: 2 }}>Welcome back, John!</h1>
              <p style={{ opacity: 0.9, position: 'relative', zIndex: 2 }}>Here is what's happening with your projects today.</p>
            </div>

            <div className="dashboard-grid">
              <div style={{ gridColumn: 'span 2' }}>
                <DemoBarGraph />
              </div>

              <div className="component-box">
                <h4 style={{ marginBottom: '1.5rem' }}>Quick Action</h4>
                <form onSubmit={e => e.preventDefault()}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                      Task Title
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Update styles"
                      style={{
                        width: '100%', 
                        padding: '0.75rem', 
                        border: 'var(--border-width) solid var(--border)', 
                        borderRadius: 'var(--radius)', 
                        background: 'var(--surface-alt)',
                        color: 'var(--text)'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                      Priority
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span className="btn-icon" style={{ flex: 1, justifyContent: 'center', background: 'var(--surface-alt)' }}>Low</span>
                      <span className="btn-icon" style={{ flex: 1, justifyContent: 'center', border: '1px solid var(--primary)', color: 'var(--primary)' }}>High</span>
                    </div>
                  </div>
                  <button style={{
                    width: '100%', 
                    marginTop: '0.5rem',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>
                    Create Task
                  </button>
                </form>
              </div>
            </div>

            {/* Theme-Specific Showcases */}
            <div className="dashboard-grid">
              {theme === 'cyberpunk' && (
                <div className="component-box" style={{ gridColumn: 'span 2' }}>
                  <h4 style={{ marginBottom: '1rem' }}>Cyberpunk Terminal</h4>
                  <Terminal theme={theme} palette={palette} />
                </div>
              )}
              
              {theme === 'retro-vintage' && (
                <div className="component-box" style={{ gridColumn: 'span 2' }}>
                  <h4 style={{ marginBottom: '1rem' }}>Retro Cassette Player</h4>
                  <Cassette theme={theme} palette={palette} />
                </div>
              )}
              
              {theme === 'art-deco' && (
                <div className="component-box" style={{ gridColumn: 'span 2' }}>
                  <h4 style={{ marginBottom: '1rem' }}>Art Deco Card</h4>
                  <ArtDecoCard theme={theme} palette={palette} />
                </div>
              )}
            </div>

            <div className="dashboard-grid">
              <div className="component-box">
                <h4 style={{ marginBottom: '1rem' }}>Active Typography</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: 'var(--h2-size)', fontWeight: 700, display: 'block', lineHeight: 1.1 }}>Head 2</span>
                    <small style={{ color: 'var(--text-secondary)' }}>--h2-size</small>
                  </div>
                  <div>
                    <span style={{ fontSize: 'var(--h3-size)', fontWeight: 600, display: 'block' }}>Head 3</span>
                    <small style={{ color: 'var(--text-secondary)' }}>--h3-size</small>
                  </div>
                  <div>
                    <span style={{ fontSize: 'var(--body-size)', display: 'block' }}>Body Text</span>
                    <small style={{ color: 'var(--text-secondary)' }}>--body-size</small>
                  </div>
                </div>
              </div>

              <div className="component-box">
                <h4 style={{ marginBottom: '1rem' }}>Active Palette</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <div style={{ 
                    background: 'var(--primary)', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius)', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>Primary</div>
                  <div style={{ 
                    background: 'var(--success)', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius)', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>Success</div>
                  <div style={{ 
                    background: 'var(--warning)', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius)', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>Warning</div>
                  <div style={{ 
                    background: 'var(--error)', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius)', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>Error</div>
                </div>
              </div>
            </div>

            {/* Presets Section */}
            <div className="component-box" style={{ marginTop: '2rem' }}>
              <h4 style={{ marginBottom: '1rem' }}>Quick Presets</h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {Object.entries(PRESETS).map(([name, preset]) => (
                  <button
                    key={name}
                    onClick={() => applyPreset(name)}
                    style={{
                      background: 'var(--surface-alt)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius)',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    {name.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Controls */}
            <div className="component-box" style={{ marginTop: '2rem' }}>
              <h4 style={{ marginBottom: '1rem' }}>Typography Controls</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                    Base Font Size: {baseFontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={baseFontSize}
                    onChange={(e) => setBaseFontSize(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                    aria-label="Base font size"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                    Type Scale: {typeScale}x
                  </label>
                  <input
                    type="range"
                    min="1.1"
                    max="1.6"
                    step="0.05"
                    value={typeScale}
                    onChange={(e) => setTypeScale(parseFloat(e.target.value))}
                    style={{ width: '100%' }}
                    aria-label="Typography scale"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                    Animation Speed: {animationSpeed}
                  </label>
                  <select
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(e.target.value as AnimationSpeed)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      background: 'var(--surface-alt)',
                      color: 'var(--text)'
                    }}
                    aria-label="Animation speed"
                  >
                    <option value="fast">Fast</option>
                    <option value="normal">Normal</option>
                    <option value="slow">Slow</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Component Sandbox Toggle */}
            <div className="component-box" style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0 }}>Component Stress Test</h4>
                <button
                  onClick={() => setShowSandbox(!showSandbox)}
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer'
                  }}
                >
                  {showSandbox ? 'Hide' : 'Show'} Sandbox
                </button>
              </div>
              
              {showSandbox && (
                <div className="sandbox-section">
                  <h5 style={{ marginTop: 0 }}>Stress Test Components</h5>
                  <div className="stress-test-grid">
                    <div className="component-box">
                      <h6>Long Button Text</h6>
                      <button style={{
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius)',
                        width: '100%',
                        fontSize: '0.875rem'
                      }}>
                        This is a button with extremely long text that should wrap properly
                      </button>
                    </div>
                    
                    <div className="component-box">
                      <h6>Error State Input</h6>
                      <input
                        type="text"
                        placeholder="Error state example"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '2px solid var(--error)',
                          borderRadius: 'var(--radius)',
                          background: 'var(--surface-alt)',
                          color: 'var(--text)'
                        }}
                      />
                      <small style={{ color: 'var(--error)', fontSize: '0.75rem' }}>
                        This field has an error
                      </small>
                    </div>
                    
                    <div className="component-box">
                      <h6>Empty Card</h6>
                      <div style={{
                        minHeight: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        fontStyle: 'italic'
                      }}>
                        This card has no content
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        
        {/* Zoom Controls */}
        <div className="zoom-controls">
          <button 
            className="btn-icon" 
            style={{border: 'none', padding: 0}} 
            onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
          <input 
            type="range" 
            min="0.2" 
            max="1.5" 
            step="0.1" 
            value={zoom} 
            className="vertical-slider"
            onChange={(e) => setZoom(parseFloat(e.target.value))} 
            aria-label="Zoom level"
          />
          <button 
            className="btn-icon" 
            style={{border: 'none', padding: 0}} 
            onClick={() => setZoom(Math.max(0.2, zoom - 0.1))}
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          <span style={{fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)'}}>
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>
    </SafeComponentWrapper>
  );
};

/* ======================== SUB-COMPONENTS ======================== */

const DemoBarGraph: React.FC = () => {
  const data: BarData[] = [
    { label: 'Jan', value: 65, color: 'var(--primary)' },
    { label: 'Feb', value: 45, color: 'var(--primary)' },
    { label: 'Mar', value: 78, color: 'var(--success)' },
    { label: 'Apr', value: 52, color: 'var(--primary)' },
    { label: 'May', value: 90, color: 'var(--warning)' },
    { label: 'Jun', value: 35, color: 'var(--error)' },
  ];

  return (
    <div className="component-box">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: 0 }}>Revenue Overview</h4>
          <small style={{ color: 'var(--text-secondary)' }}>Monthly performance metrics</small>
        </div>
        <button className="btn-icon" aria-label="Settings">
          <Settings size={16} />
        </button>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        position: 'relative',
        paddingTop: '2rem'
      }}>
        {data.map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            height: '100%',
            justifyContent: 'flex-end',
            width: '100%',
            zIndex: 2
          }}>
            <div style={{
              width: '30%',
              height: '80%',
              display: 'flex',
              alignItems: 'flex-end',
              position: 'relative'
            }}>
              <motion.div 
                style={{
                  width: '100%',
                  borderBottom: 'none',
                  cursor: 'pointer',
                  backgroundColor: item.color,
                  borderRadius: 'var(--radius) var(--radius) 0 0'
                }}
                initial={{ height: 0 }}
                animate={{ height: `${item.value}%` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%) translateY(0)',
                  background: 'var(--text)',
                  color: 'var(--surface)',
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  borderRadius: '4px',
                  opacity: 0,
                  pointerEvents: 'none',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  marginBottom: '4px',
                  fontWeight: 600,
                  boxShadow: 'var(--shadow)'
                }}
                className="bar-tooltip"
              >
                ${item.value}k
              </div>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{item.label}</span>
          </div>
        ))}
        
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none'
        }}>
          {[0, 25, 50, 75, 100].map(percent => (
            <div 
              key={percent}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '1px',
                background: 'var(--border)',
                borderTop: '1px dashed var(--border)',
                opacity: 0.5,
                bottom: `${percent}%`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignSystemLab;
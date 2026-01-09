/* ======================== TYPE DEFINITIONS ======================== */

// Theme Names
export type ThemeName = 
  | 'flat-modern' 
  | 'neo-brutalist' 
  | 'skeuomorphic' 
  | 'neumorphic' 
  | 'glassmorphism' 
  | 'material'
  | 'retro-vintage'
  | 'cyberpunk'
  | 'organic-modern'
  | 'minimalist'
  | 'art-deco'
  | 'claymorphism';

// Palette Names  
export type PaletteName = 
  | 'default' 
  | 'ocean' 
  | 'sunset' 
  | 'forest' 
  | 'purple' 
  | 'corporate'
  | 'cyberpunk'
  | 'pastel'
  | 'art-deco'
  | 'retro';

// Font Names
export type FontName = 
  | 'inter' 
  | 'roboto' 
  | 'poppins' 
  | 'georgia' 
  | 'courier' 
  | 'space-mono'
  | 'jetbrains-mono'
  | 'space-grotesk';

// View Modes
export type ViewMode = 'desktop' | 'mobile' | 'tablet';

// Animation Speeds
export type AnimationSpeed = 'fast' | 'normal' | 'slow' | 'none';

// Spacing Scale
export type SpacingScale = 'compact' | 'default' | 'relaxed';

/* ======================== INTERFACES ======================== */

// Theme Configuration
export interface ThemeConfig {
  '--radius': string;
  '--shadow': string;
  '--shadow-lg': string;
  '--border-width': string;
  '--button-transform': string;
  '--texture'?: string;
  '--gradient'?: string;
  '--scanline'?: string;
  '--grid-bg'?: string;
  '--organic-wave'?: string;
  '--flow-gradient'?: string;
  '--minimal-grid'?: string;
  '--geometric-pattern'?: string;
  '--gold-gradient'?: string;
  '--neon-glow'?: string;
  '--vintage-accent'?: string;
  '--nature-accent'?: string;
  '--gold-accent'?: string;
}

// Palette Configuration
export interface PaletteConfig {
  '--primary': string;
  '--success': string;
  '--warning': string;
  '--error': string;
  '--info': string;
  '--surface': string;
  '--surface-alt': string;
  '--text': string;
  '--text-secondary': string;
  '--border': string;
  '--neon-glow'?: string;
  '--vintage-accent'?: string;
  '--nature-accent'?: string;
  '--gold-accent'?: string;
}

// Typography Configuration
export interface TypographyConfig {
  '--font-sans': string;
  '--h1-size': string;
  '--h2-size': string;
  '--h3-size': string;
  '--body-size': string;
  '--spacing-1': string;
  '--spacing-2': string;
  '--spacing-3': string;
  '--spacing-4': string;
  '--spacing-5': string;
  '--spacing-6': string;
  '--transition-speed': string;
}

// Design System State
export interface DesignSystemState {
  theme: ThemeName;
  palette: PaletteName;
  font: FontName;
  darkMode: boolean;
  viewMode: ViewMode;
  baseFontSize: number;
  typeScale: number;
  spacingUnit: number;
  animationSpeed: AnimationSpeed;
  spacingScale: SpacingScale;
}

// Bar Data for Charts
export interface BarData {
  label: string;
  value: number;
  color: string;
}

// Dock Position
export interface DockPosition {
  x: number;
  y: number;
}

// Drag Info for Framer Motion
export interface DragInfo {
  offset: {
    x: number;
    y: number;
  };
}

// History Entry
export interface HistoryEntry {
  timestamp: string;
  theme: ThemeName;
  palette: PaletteName;
  font: FontName;
  darkMode: boolean;
  baseFontSize: number;
  typeScale: number;
}

// Export Format Types
export type ExportFormat = 'css' | 'scss' | 'tailwind' | 'figma' | 'style-dictionary';

// Contrast Check Result
export interface ContrastCheck {
  ratio: number;
  aa: boolean;
  aaa: boolean;
  fail: boolean;
}

// Preset Configuration
export interface PresetConfig {
  theme: ThemeName;
  palette: PaletteName;
  font: FontName;
  darkMode: boolean;
  baseFontSize?: number;
  typeScale?: number;
}

// Component Props
export interface SystemGateProps {
  onInitialize: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export interface SafeComponentWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Theme-Specific Component Props
export interface TerminalProps {
  theme: ThemeName;
  palette: PaletteName;
}

export interface CassetteProps {
  theme: ThemeName;
  palette: PaletteName;
}

export interface ArtDecoCardProps {
  theme: ThemeName;
  palette: PaletteName;
}
# Design System Lab v2.0

A comprehensive design system playground featuring multiple themes, color palettes, typography controls, and accessibility tools. Built with React, TypeScript, and Framer Motion.

## Features

### Core Functionality
- **Multiple Design Themes**: Flat Modern, Neo-Brutalist, Skeuomorphic, Neumorphic, Glassmorphism, Material, Retro Vintage, Cyberpunk, Organic Modern, Minimalist, Art Deco, and Claymorphism
- **Color Palettes**: 10+ curated palettes including Cyberpunk, Pastel, Art Deco, and Retro
- **Typography Controls**: Base font size, type scale, and spacing unit adjustments
- **Live Preview**: Real-time preview of design changes with desktop/mobile views
- **Export System**: Export configurations as CSS, Tailwind, or Figma tokens

### Accessibility Features
- **Contrast Checker**: WCAG AA/AAA compliance checking
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and roles
- **Reduced Motion**: Respects prefers-reduced-motion settings
- **High Contrast**: Supports high contrast mode

### Professional Tools
- **Shareable URLs**: Share exact design configurations via URL
- **History System**: Track and revert to previous configurations
- **Preset Combinations**: Quick access to curated theme+palette combinations
- **Component Sandbox**: Stress test components with edge cases
- **Error Boundaries**: Graceful error handling

## Installation

```bash
npm install
```

## Usage

### Development
```bash
npm start
# or
npm run dev
```

### Production Build
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

## Project Structure

```
src/
├── components/
│   ├── ArtDecoCard.tsx       # Art Deco themed showcase
│   ├── Cassette.tsx          # Retro cassette player showcase
│   ├── DesignSystemLab.tsx   # Main application component
│   ├── SafeComponentWrapper.tsx # Error boundary wrapper
│   ├── SystemGate.tsx        # Landing page/entry gate
│   └── Terminal.tsx          # Cyberpunk terminal showcase
├── types.ts                  # TypeScript type definitions
├── App.tsx                   # Root app component
├── index.tsx                 # Entry point
├── index.css                 # Global styles
└── index.html                # HTML template
```

## Themes

### Available Themes
1. **Flat Modern** - Clean, contemporary design
2. **Neo-Brutalist** - Bold, high-contrast aesthetic
3. **Skeuomorphic** - Realistic, dimensional design
4. **Neumorphic** - Soft, inset/outset shadows
5. **Glassmorphism** - Translucent, blurred backgrounds
6. **Material** - Google's Material Design
7. **Retro Vintage** - 70s/80s inspired textures
8. **Cyberpunk** - Neon glow and scanlines
9. **Organic Modern** - Natural, flowing shapes
10. **Minimalist** - Ultra-clean, grid-based
11. **Art Deco** - Geometric luxury
12. **Claymorphism** - Soft, 3D appearance

### Color Palettes
- Default, Ocean, Sunset, Forest, Purple, Corporate
- Cyberpunk (Neon), Pastel (Soft), Art Deco (Gold/Navy), Retro (Cream/Orange/Teal)

## Typography

### Available Fonts
- Inter (UI/Default)
- Roboto
- Poppins
- Georgia (Serif)
- Courier Prime (Monospace)
- Space Mono (Monospace)
- JetBrains Mono (Monospace)
- Space Grotesk (Headers)

### Typography Controls
- **Base Font Size**: 12px - 24px
- **Type Scale**: 1.1x - 1.6x
- **Spacing Unit**: 2px - 8px
- **Animation Speed**: Fast, Normal, Slow, None

## Accessibility

### WCAG Compliance
- All color combinations tested for 4.5:1 contrast ratio (AA)
- AAA compliance available for critical text (7:1)
- Focus indicators for all interactive elements
- Semantic HTML structure
- ARIA labels and roles

### Keyboard Navigation
- Tab navigation through all interactive elements
- Enter/Space to activate buttons
- Arrow keys for sliders and selectors
- Escape to close modals

### Screen Reader Support
- Proper heading hierarchy
- ARIA labels for all controls
- Live regions for dynamic content
- Role definitions for custom components

## Export Formats

### CSS Variables
```css
:root {
  --primary: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  /* ... */
}
```

### Tailwind Config
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        success: '#10b981',
        /* ... */
      }
    }
  }
}
```

### Figma Tokens
JSON format compatible with Figma's design tokens plugin.

## Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lazy loading of heavy components
- Optimized animations with hardware acceleration
- Debounced rapid theme changes
- Efficient CSS custom properties

## Development

### Code Style
- TypeScript for type safety
- Functional React components with hooks
- CSS-in-JS with style objects
- Semantic HTML structure
- Comprehensive error boundaries

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide React](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- TypeScript for type safety
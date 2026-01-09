# Design System Lab v2.0 - Feature Guide

## Quick Start

### Basic Usage
1. **Start the application**: `npm start`
2. **Enter the lab**: Click "Enter Lab" or press Enter
3. **Explore themes**: Use the floating dock to switch themes
4. **Export designs**: Click the download icon to export configurations

## Theme Guide

### Available Themes

#### 1. Flat Modern
- **Characteristics**: Clean, contemporary design
- **Best for**: General web applications, SaaS products
- **Key features**: Subtle shadows, moderate border radius

#### 2. Neo-Brutalist
- **Characteristics**: Bold, high-contrast, no rounded edges
- **Best for**: Editorial websites, bold statements
- **Key features**: Sharp shadows, strong typography

#### 3. Skeuomorphic
- **Characteristics**: Realistic, dimensional design
- **Best for**: Creative portfolios, artistic projects
- **Key features**: Inset shadows, realistic textures

#### 4. Neumorphic
- **Characteristics**: Soft, inset/outset shadows
- **Best for**: Modern interfaces, clean aesthetics
- **Key features**: Soft shadows, subtle depth

#### 5. Glassmorphism
- **Characteristics**: Translucent, blurred backgrounds
- **Best for**: Modern dashboards, overlays
- **Key features**: Backdrop blur, transparency

#### 6. Material
- **Characteristics**: Google's Material Design
- **Best for**: Android apps, material-inspired interfaces
- **Key features**: Elevation shadows, motion

#### 7. Retro Vintage
- **Characteristics**: 70s/80s inspired textures
- **Best for**: Nostalgic projects, creative sites
- **Key features**: Cassette player showcase, texture patterns

#### 8. Cyberpunk
- **Characteristics**: Neon glow and scanlines
- **Best for**: Gaming, tech interfaces, futuristic themes
- **Key features**: Terminal showcase, neon effects

#### 9. Organic Modern
- **Characteristics**: Natural, flowing shapes
- **Best for**: Wellness apps, nature-themed sites
- **Key features**: Curved elements, soft gradients

#### 10. Minimalist
- **Characteristics**: Ultra-clean, grid-based
- **Best for**: Portfolio sites, clean interfaces
- **Key features**: Minimal shadows, grid patterns

#### 11. Art Deco
- **Characteristics**: Geometric luxury
- **Best for**: Premium brands, luxury products
- **Key features**: Gold accents, geometric patterns

#### 12. Claymorphism
- **Characteristics**: Soft 3D appearance
- **Best for**: Playful interfaces, modern apps
- **Key features**: Soft shadows, rounded forms

## Color Palette Guide

### Standard Palettes
- **Default**: Blue primary, standard web colors
- **Ocean**: Cyan-based, water-inspired
- **Sunset**: Orange and warm tones
- **Forest**: Green, nature-inspired
- **Purple**: Violet and indigo tones
- **Corporate**: Professional, muted colors

### Special Palettes
- **Cyberpunk**: Neon greens and magentas
- **Pastel**: Soft, muted tones
- **Art Deco**: Gold and navy combinations
- **Retro**: Cream, orange, and teal vintage colors

## Typography Controls

### Base Font Size
- **Range**: 12px - 24px
- **Default**: 16px
- **Usage**: Controls the base size for all text elements

### Type Scale
- **Range**: 1.1x - 1.6x
- **Default**: 1.25x (Major Third)
- **Usage**: Mathematical scaling for heading hierarchy
- **Formula**: 
  - H3 = Base × Scale
  - H2 = Base × Scale²
  - H1 = Base × Scale³

### Spacing Unit
- **Range**: 2px - 8px
- **Default**: 4px
- **Usage**: Foundation for consistent spacing system
- **Scale**: 1x, 2x, 3x, 4x, 6x, 8x multipliers

### Animation Speed
- **Fast**: 150ms
- **Normal**: 300ms (default)
- **Slow**: 500ms
- **None**: 0ms (instant)

## Accessibility Features

### Contrast Checker
- **WCAG AA**: 4.5:1 minimum ratio
- **WCAG AAA**: 7:1 minimum ratio
- **Real-time validation** of color combinations
- **Visual indicators** for pass/fail status

### Keyboard Navigation
- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow keys**: Navigate sliders and selectors
- **Escape**: Close modals and overlays

### Screen Reader Support
- **ARIA labels** on all controls
- **Role definitions** for custom components
- **Live regions** for dynamic content
- **Semantic HTML** structure

### System Preferences
- **Reduced Motion**: Disables animations
- **High Contrast**: Enhances color contrast
- **Dark Mode**: System preference detection

## Export Formats

### CSS Variables
Standard CSS custom properties format:
```css
:root {
  --primary: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  /* ... */
}
```

### Tailwind Config
JavaScript configuration object:
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
JSON format for design tool integration:
```json
{
  "name": "flat-modern-default",
  "colors": {
    "primary": "#3b82f6",
    "success": "#10b981"
  }
}
```

## Advanced Features

### Shareable URLs
- **Base64 encoding** of configuration
- **URL parameters** for easy sharing
- **Cross-platform** compatibility
- **Bookmark-friendly** format

### History System
- **Last 10 configurations** stored
- **Timestamp tracking** for each change
- **One-click restore** to previous states
- **Persistent storage** across sessions

### Preset Combinations
- **Material Ocean**: Material theme + Ocean palette
- **Dark Cyberpunk**: Cyberpunk theme + Cyberpunk palette
- **Retro Vintage**: Retro theme + Retro palette
- **Minimalist Clean**: Minimalist theme + Default palette

### Zoom Controls
- **Range**: 20% - 150%
- **Smooth scaling** with transform-origin
- **Pixel-perfect** preview at any zoom level
- **Keyboard shortcuts** for quick zooming

## Component Showcases

### Terminal (Cyberpunk Theme)
- **Animated text** with typewriter effect
- **Power on/off** functionality
- **Scanline overlay** for authentic feel
- **Interactive elements** with hover states

### Cassette Player (Retro Theme)
- **Play/pause controls** with state management
- **Animated spools** when playing
- **Time display** with formatting
- **Vintage styling** with period-appropriate colors

### Art Deco Card
- **Gold border effects** with CSS gradients
- **Geometric patterns** as background
- **Luxury typography** with proper spacing
- **Decorative elements** (gems, stars, crowns)

## Keyboard Shortcuts

### Navigation
- **Tab**: Move between interactive elements
- **Shift+Tab**: Move backwards
- **Enter**: Activate selected element
- **Space**: Toggle checkboxes and buttons

### Modals
- **Escape**: Close current modal
- **Tab**: Navigate within modal
- **Enter**: Confirm action

### Special
- **Enter** (on SystemGate): Enter the lab
- **Arrow keys**: Navigate sliders
- **Home/End**: Jump to slider extremes

## Mobile Optimization

### Touch Interactions
- **Tap**: Activate buttons and links
- **Swipe**: Navigate carousels
- **Pinch/Zoom**: Supported on preview area
- **Touch targets**: Minimum 44px for accessibility

### Responsive Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Performance
- **Hardware acceleration** for animations
- **Debounced updates** for rapid changes
- **Lazy loading** of heavy components
- **Optimized images** and assets

## Troubleshooting

### Common Issues

#### Theme not applying correctly
- **Check CSS custom properties** support
- **Verify no conflicts** with existing styles
- **Clear browser cache** and reload

#### Contrast checker showing failures
- **Review color combinations** for WCAG compliance
- **Consider dark/light mode** differences
- **Check text size** (smaller text requires higher contrast)

#### Export not working
- **Verify clipboard permissions** in browser
- **Check for popup blockers** (modals may be blocked)
- **Try different export format** to isolate issue

#### Performance issues
- **Disable unnecessary animations** if needed
- **Reduce zoom level** for better performance
- **Close other browser tabs** to free up memory

### Browser Compatibility

#### Supported Browsers
- **Chrome/Edge**: Version 88+
- **Firefox**: Version 87+
- **Safari**: Version 14+
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 88+

#### Known Limitations
- **CSS custom properties** not supported in IE11
- **Backdrop-filter** may have performance issues on older devices
- **Advanced animations** may be disabled in reduced motion mode

## Best Practices

### For Designers
1. **Start with presets** to quickly explore options
2. **Use contrast checker** to ensure accessibility
3. **Test on multiple devices** for responsive design
4. **Export configurations** for team collaboration
5. **Document theme choices** for future reference

### For Developers
1. **Use TypeScript interfaces** for type safety
2. **Implement error boundaries** for robustness
3. **Test keyboard navigation** thoroughly
4. **Follow semantic HTML** structure
5. **Consider performance** implications of animations

### For Teams
1. **Share URLs** for consistent theming
2. **Use version control** for configuration files
3. **Document custom themes** and modifications
4. **Test across browsers** for compatibility
5. **Maintain accessibility standards**

## Future Enhancements

### Planned Features
- **Component library** expansion
- **Design tool plugins** (Figma, Sketch)
- **Real-time collaboration**
- **Advanced animations**
- **Performance monitoring**

### Community Contributions
- **Custom theme submissions**
- **Accessibility improvements**
- **Performance optimizations**
- **Documentation enhancements**
- **Testing coverage expansion**

---

For more detailed information, see:
- [README.md](README.md) - Project overview and setup
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Technical implementation details
- [ExampleUsage.tsx](ExampleUsage.tsx) - Code examples and integration patterns
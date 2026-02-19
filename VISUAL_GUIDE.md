# YesDeal Visual Guide

## Color Reference

### Primary Palette
```
Deep Indigo (Primary Brand)
Color: #1e3a5f
RGB: 30, 58, 95
Usage: Headers, navigation, trust elements
```

```
Emerald Green (Action/Conversion)
Color: #10b981
RGB: 16, 185, 129
Usage: CTA buttons, highlights, badges
```

```
Clean Off-White (Background)
Color: #F8FAFC
RGB: 248, 250, 252
Usage: Main page background, breathing room
```

### Neutral Palette
```
Deep Navy (Foreground Text)
Color: #1a1a2e
RGB: 26, 26, 46
Usage: Primary text, headlines
```

```
Medium Gray (Secondary Text)
Color: #64748b
RGB: 100, 116, 139
Usage: Descriptions, metadata, secondary info
```

```
Light Gray (Muted)
Color: #f1f5f9
RGB: 241, 245, 249
Usage: Secondary backgrounds, hover states
```

```
White (Cards)
Color: #ffffff
RGB: 255, 255, 255
Usage: Product cards, content containers
```

## Component Showcase

### Hero Section
- **Height**: 90vh (90% viewport height)
- **Background**: Gradient from #1e3a5f to primary/80
- **Text**: Large bold headlines with accent color highlights
- **CTAs**: Emerald primary button + white border secondary
- **Animation**: Fade-in-up on page load

### Navigation Bar
- **Position**: Sticky top, z-50
- **Background**: Backdrop blur with 95% opacity
- **Logo**: "YesDeal" in indigo with emerald dot
- **Cart Badge**: Emerald background, white text, scale animation
- **Active Links**: Indigo color with smooth transitions

### Product Cards
**Standard Card (Default)**
- **Aspect Ratio**: 3:4 (portrait)
- **Border Radius**: 2xl (24px)
- **Hover Effects**:
  - Image zoom: 1.1x scale
  - Shadow: Elevated from sm to 2xl
  - Card scale: 1.05x
- **Quick-View Button**: Emerald background, white text
- **Category Label**: Accent color, uppercase, bold

**Featured Card (Large)**
- **Aspect Ratio**: 4:5 (taller for featured)
- **Overlay**: Black gradient (0-80% opacity)
- **Text Reveal**: Slides up on hover
- **Bottom Content**: Product name, price, "Shop Now" link

### Buttons

**Primary CTA Button**
- **Background**: Emerald (#10b981)
- **Text Color**: White
- **Padding**: Large (px-8 py-4)
- **Border Radius**: Full (rounded-full)
- **Hover Effect**: 
  - Scale: 1.05x
  - Opacity: 0.9
  - Shadow: Elevated
- **Active State**: Scale 0.95x

**Secondary Button**
- **Background**: Indigo (#1e3a5f)
- **Text Color**: White
- **Same padding and effects as primary**

**Outline Button**
- **Border**: 2px emerald
- **Background**: Transparent
- **Text**: Emerald
- **Hover**: Light emerald background (10% opacity)

### Footer
- **Background**: Deep indigo (#1e3a5f)
- **Text**: White with opacity variations
- **Links**: Hover to emerald color
- **Newsletter Input**: Transparent background with white border
- **Newsletter Button**: Emerald background

## Typography Scale

```
H1 (Hero Title): 3.5rem - 4.5rem
H2 (Section Title): 2.25rem - 3rem
H3 (Subsection): 1.5rem - 1.875rem
Body (Default): 1rem (16px)
Small (Secondary): 0.875rem (14px)
Tiny (Labels): 0.75rem (12px)
```

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

## Spacing Reference

```
xs: 2px   (border widths)
sm: 4px   (small gaps)
md: 8px   (default spacing)
lg: 16px  (card padding)
xl: 24px  (section margins)
2xl: 32px (large spacing)
3xl: 48px (section gaps)
```

## Animation Timeline

### Page Load
1. Hero title: Fade-in-up (600ms) at 0.2s delay
2. Hero CTA: Fade-in-up (600ms) at 0.4s delay
3. Product cards: Staggered fade-in (i * 0.05s offset)

### Hover States
- Product card image: 700ms scale transition
- Button hover: 300ms scale and shadow transition
- Link hover: 300ms color transition

### Interactive
- Toast notification: 400ms slide-down entrance
- Add to cart: 300ms pulse/scale feedback
- Cart badge: 300ms scale animation
- Dropdown: 200ms slide-down

## Responsive Breakpoints

```
Mobile:  320px - 640px   (1 column grid)
Tablet:  641px - 1024px  (2 column grid)
Desktop: 1025px+         (3-4 column grid)
```

## Conversion Optimization Elements

### Trust Signals
- Icons with emerald circular backgrounds
- Hover: Background color brightens
- Copy: Benefit-focused messaging

### Call-to-Action Hierarchy
1. **Primary CTA**: Emerald button, large size, above fold
2. **Secondary CTA**: White border button, similar prominence
3. **Tertiary CTA**: Text link in emerald

### Product Focus
- Clean off-white background makes products pop
- Large image display (3:4 ratio)
- Price prominent and bold
- Quick-view always accessible

### User Feedback
- Toast notifications for all actions
- Button loading state with spinner
- Cart badge animation on add
- Hover states on all interactive elements

## Accessibility Features

### Color Contrast
- Text on light background: #1a1a2e (WCAG AAA)
- Text on dark background: #ffffff (WCAG AAA)
- Emerald on white: 5.2:1 ratio (WCAG AAA)

### Focus States
- All interactive elements: 2px primary color ring
- Visible focus indicators on keyboard navigation
- Skip to main content link (hidden but accessible)

### Semantic Markup
- `<main>`: Primary content area
- `<nav>`: Navigation sections
- `<footer>`: Footer content
- `<article>`: Product cards
- Heading hierarchy: h1 → h2 → h3

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 12+, Chrome Android)

## Performance Metrics

- Animation FPS: 60fps target
- Page load: <3s target
- Image optimization: WebP with fallbacks
- CSS file size: Optimized with Tailwind purging
- No JavaScript for animations (CSS-based)

## Dark Mode Considerations

While currently light-only, prepare for dark mode with:
- CSS variables for all colors
- Background: #0f1419
- Foreground: #f5f7fb
- Primary: #2d5a91 (lighter indigo)
- Accent: #10b981 (keep emerald)

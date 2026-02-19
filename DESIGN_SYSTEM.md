# YesDeal Design System

## Overview
Premium e-commerce design system focused on maximizing user engagement, conversion, and creating a luxury shopping experience.

## Color Palette

### Primary Colors
- **Primary Brand**: `#1e3a5f` (Deep Indigo/Midnight Blue)
  - Used for headers, navigation, and trust-building elements
  - Conveys professionalism and reliability

- **Accent/Action**: `#10b981` (Emerald Green)
  - Used for "Add to Cart", "Buy Now", and conversion CTAs
  - High-contrast, eye-catching color that drives action
  - Applied to badges, highlights, and interactive elements

### Neutrals
- **Background**: `#F8FAFC` (Clean Off-White)
  - Main page background
  - Makes product images pop
  - Minimalist, modern aesthetic

- **Foreground**: `#1a1a2e` (Deep Navy)
  - Primary text color
  - High contrast with background

- **Muted**: `#f1f5f9` (Light Gray)
  - Secondary backgrounds, cards
  - Subtle contrast elements

- **Muted Foreground**: `#64748b` (Medium Gray)
  - Secondary text, descriptions
  - Supporting information

- **Card**: `#ffffff` (White)
  - Product cards, content containers
  - Clean, premium feel

- **Border**: `#e2e8f0` (Light Border)
  - Subtle dividers, card borders
  - Maintains visual hierarchy

## Typography

- **Font Family**: Inter (modern, highly readable sans-serif)
- **Font Scale**:
  - H1: 3.5rem - 4.5rem (hero titles)
  - H2: 2.25rem - 3rem (section titles)
  - H3: 1.5rem - 1.875rem (subsections)
  - Body: 1rem (primary content)
  - Small: 0.875rem (secondary info)
  - Tiny: 0.75rem (labels, badges)

- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

## Animations

### Entrance Animations
- **Fade In Up** (600ms): Used for hero content and section reveals
- **Slide Down** (400ms): Navbar interactions, dropdowns
- **Scale In** (300ms): Interactive elements, badges

### Hover Effects
- **Product Cards**: Image scale 1.1x, shadow elevation, subtle overlay
- **Buttons**: Scale 1.05x on hover, shadow enhancement
- **Links**: Color transition to accent color

### Micro-interactions
- **Add to Cart**: Pulse animation with toast notification (3s slide from top-right)
- **Cart Badge**: Scale animation for visibility
- **Transitions**: All interactions use smooth 300ms-500ms duration

## Component Styling

### Buttons
- **Primary Action**: Emerald background with hover scale effect
- **Secondary**: Deep indigo background
- **Outline**: Transparent with accent border

Variants:
- Small: `px-4 py-2 text-sm`
- Medium: `px-6 py-3 text-base`
- Large: `px-8 py-4 text-lg`

### Product Cards
- **Featured Cards**: Large image with overlay gradient, text appears on hover
- **Standard Cards**: Rounded corners (2xl), hover elevation, quick-view button
- **Image Aspect**: 3:4 ratio (portrait mode)

### Cards & Containers
- **Border Radius**: 1.5rem (24px) for primary containers
- **Shadow**: Subtle by default, elevated on hover
- **Background**: White cards on off-white background

### Navigation
- **Sticky Header**: Backdrop blur effect, semi-transparent background
- **Logo**: Brand color with accent dot
- **Active States**: Accent color highlight
- **Icons**: 20-22px size, hover color transition

### Footer
- **Background**: Deep indigo (primary color)
- **Text**: White with opacity variations for hierarchy
- **Links**: Hover to accent color
- **Newsletter**: Transparent inputs with white text

## Spacing System
Uses Tailwind CSS spacing scale (4px base unit):
- xs: 2px
- sm: 4px
- md: 8px
- lg: 16px
- xl: 24px
- 2xl: 32px
- 3xl: 48px

## Border Radius
- Small: 0.5rem (8px) - inputs, small components
- Medium: 1rem (16px) - cards, buttons
- Large: 1.5rem (24px) - primary containers
- Full: 9999px - pills, rounded buttons

## Conversion Optimization

### CTA Buttons
- **Color**: Emerald green (#10b981) for instant recognition
- **Size**: Large, prominent placement (lg variant)
- **Hover**: Subtle scale and shadow enhancement
- **Position**: Above the fold, sticky on mobile

### Trust Signals
- **Icons**: SVG with accent color backgrounds
- **Hover**: Background color enhancement
- **Text**: Clear, benefit-focused copy

### Product Display
- **Image**: High quality, 3:4 aspect ratio
- **Hover**: Zoom effect (1.1x scale)
- **Call-to-action**: "Quick View" or "Shop Now" appears on hover
- **Price**: Bold, prominent typography

## Responsive Design

### Breakpoints
- Mobile: 320px-640px (1 column product grid)
- Tablet: 641px-1024px (2 columns)
- Desktop: 1025px+ (3-4 columns)

### Mobile Specific
- Sticky bottom navigation for cart access
- Full-width product images
- Simplified navigation menu
- Enlarged touch targets (44px minimum)

## Accessibility
- Minimum contrast ratio: 4.5:1 for text
- Focus states: ring-2 with primary color
- Semantic HTML: `<main>`, `<nav>`, `<footer>`
- ARIA labels for interactive elements
- Alt text for all product images

## Dark Mode (Future)
When implementing dark mode, follow this adapted palette:
- Background: #0f1419 (deep black)
- Foreground: #f5f7fb (light off-white)
- Primary: #2d5a91 (lighter indigo for contrast)
- Accent: #10b981 (keep emerald)

# Component Usage Guide

## ProductCard Component

### Basic Usage
```tsx
import ProductCard from '@/components/ProductCard';

const product = {
  id: '1',
  name: 'Premium Leather Jacket',
  price: 299.99,
  category: 'Clothing',
  images: ['https://...jpg']
};

// Default card (for product grid)
<ProductCard product={product} delay={0} />

// Featured card (for hero section)
<ProductCard product={product} variant="featured" />
```

### Props
- `product`: Product object with id, name, price, category, images
- `variant`: 'default' (grid card) or 'featured' (large hero card)
- `delay`: Animation delay in seconds for staggered entrance

### Styling Classes
- Card: `rounded-2xl shadow-lg hover:shadow-2xl`
- Image: `aspect-[3/4]` with `group-hover:scale-110`
- Quick-view button: `bg-accent text-accent-foreground`
- Category label: `text-accent uppercase font-semibold`

## PremiumButton Component

### Basic Usage
```tsx
import PremiumButton from '@/components/PremiumButton';

// Primary action button
<PremiumButton variant="primary" size="lg">
  Explore Collection
</PremiumButton>

// With loading state
<PremiumButton 
  variant="primary" 
  isLoading={isLoading}
  onClick={handleClick}
>
  Add to Cart
</PremiumButton>

// Secondary button
<PremiumButton variant="secondary" size="md">
  Learn More
</PremiumButton>

// Outline style
<PremiumButton variant="outline" size="sm">
  View Details
</PremiumButton>
```

### Props
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean (shows spinner)
- `disabled`: boolean
- `className`: Additional Tailwind classes
- All standard button HTML attributes

### Styling
- Primary: `bg-accent hover:scale-105`
- Secondary: `bg-primary hover:scale-105`
- Outline: `border-2 border-accent hover:bg-accent/10`

## Toast Component

### Basic Usage
```tsx
import Toast from '@/components/Toast';
import { useState } from 'react';

export default function Example() {
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <button onClick={() => setShowToast(true)}>
        Show Notification
      </button>

      {showToast && (
        <Toast
          message="Item added to cart successfully!"
          type="success"
          duration={3000}
          onClose={() => setShowToast(false)}
          action={{
            label: "View Cart",
            onClick: () => router.push('/cart')
          }}
        />
      )}
    </>
  );
}
```

### Props
- `message`: string - Toast content text
- `type`: 'success' | 'error' | 'info' (default: 'success')
- `duration`: number in milliseconds (default: 4000)
- `onClose`: callback function when toast closes
- `action`: optional object with `label` and `onClick` properties

### Styling
- Success: Green background with checkmark icon
- Error: Red background with alert icon
- Info: Blue background with info icon
- Position: Fixed top-right
- Auto-dismiss or manual close with X button

## AddToCart Component

### Basic Usage
```tsx
import AddToCart from '@/components/add-to-cart';

const product = {
  id: '1',
  name: 'Premium Watch',
  price: 199.99,
  images: ['https://...jpg']
};

// Default styling
<AddToCart product={product} />

// Custom styling
<AddToCart 
  product={product}
  className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold"
/>
```

### Props
- `product`: Object with id, name, price, images
- `className`: Optional custom Tailwind classes

### Features
- Shows "Adding..." during add operation
- Displays Toast on successful add
- Toast includes "View Cart" action button
- Disabled state during operation
- Shopping bag icon

## Usage in Homepage

### Hero Section Example
```tsx
<section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-primary/80">
  <FadeIn className="text-center">
    <h1 className="text-7xl font-bold text-white">
      Premium Quality <span className="text-accent">Meets</span> Excellence
    </h1>
    <div className="flex gap-4 justify-center mt-8">
      <PremiumButton variant="primary" size="lg">
        Explore Collection
      </PremiumButton>
      <PremiumButton variant="outline" size="lg">
        Learn More
      </PremiumButton>
    </div>
  </FadeIn>
</section>
```

### Product Grid Example
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {products.map((product, i) => (
    <FadeIn key={product.id} delay={i * 0.05}>
      <ProductCard product={product} delay={i * 0.05} />
    </FadeIn>
  ))}
</div>
```

### Featured Section Example
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {featuredProducts.map((product, i) => (
    <FadeIn key={product.id} delay={i * 0.1}>
      <ProductCard 
        product={product} 
        variant="featured"
        delay={i * 0.1}
      />
    </FadeIn>
  ))}
</div>
```

## Styling Integration

### Color Classes
```tsx
// Text colors
className="text-accent"      // Emerald
className="text-primary"     // Indigo
className="text-foreground"  // Deep navy

// Background colors
className="bg-accent"        // Emerald
className="bg-primary"       // Indigo
className="bg-background"    // Off-white
className="bg-muted"         // Light gray

// Border colors
className="border-accent"    // Emerald
className="border-primary"   // Indigo
className="border-border"    // Light border
```

### Shadow and Hover Effects
```tsx
// Shadows
className="shadow-lg"        // Default shadow
className="hover:shadow-2xl" // Elevated on hover

// Transformations
className="group-hover:scale-110" // Image zoom
className="hover:scale-105"       // Button hover
className="active:scale-95"       // Button press

// Transitions
className="transition-all duration-300"    // Smooth transition
className="transition duration-700"        // Longer transition
```

### Border Radius
```tsx
className="rounded-2xl"  // 24px (primary containers)
className="rounded-xl"   // 16px (cards)
className="rounded-lg"   // 12px (inputs)
className="rounded-full" // 9999px (pill buttons)
```

## Animation Classes

### Fade-In Animations
```tsx
import FadeIn from "@/components/ui/fade-in";

// Fade in on load
<FadeIn className="...">
  Content
</FadeIn>

// With delay
<FadeIn delay={0.2} className="...">
  Content
</FadeIn>

// With direction
<FadeIn direction="up" className="...">
  Content
</FadeIn>
```

### Custom Keyframe Animations
```tsx
// In globals.css - predefined animations:
// animate-fade-in-up
// animate-slide-down
// animate-scale-in

// Usage
className="animate-fade-in-up"
className="animate-slide-down"
className="animate-scale-in"

// Or inline style for delay
style={{
  animation: `fadeInUp 0.6s ease-out ${delay}s backwards`,
}}
```

## Best Practices

### 1. Product Cards
- Always use ProductCard component for consistency
- Use 'featured' variant for hero sections only
- Provide proper image sizes for performance
- Use staggered delays for visual interest

### 2. Buttons
- Use PremiumButton for all primary CTAs
- Primary variant for main conversions
- Secondary for alternatives
- Outline for less prominent actions

### 3. Notifications
- Use Toast for user feedback (add to cart, errors, etc.)
- Success type for positive actions
- Error type for issues
- Keep messages concise (<60 characters)

### 4. Responsive Design
- Mobile-first approach
- Test with sm:, md:, lg: prefixes
- Ensure touch targets are 44px minimum
- Use proper image aspect ratios

### 5. Accessibility
- All interactive elements must be keyboard accessible
- Use semantic HTML (main, nav, footer)
- Include alt text for images
- Maintain color contrast ratios
- Use aria-labels where needed

### 6. Performance
- Lazy load images where possible
- Use Next.js Image component
- Minimize animation duration (<500ms)
- Avoid expensive CSS operations
- Use CSS transitions, not animations for interactions

## Troubleshooting

### Toast Not Showing
- Check if state is properly set to true
- Verify Toast is rendered conditionally
- Ensure onClose callback is provided

### Button Not Responding
- Check if disabled state is false
- Verify onClick handler is defined
- Ensure className doesn't conflict

### Cards Not Showing Hover Effects
- Verify group and group-hover classes are present
- Check if parent container has overflow-hidden
- Ensure transition duration is sufficient

### Animation Not Playing
- Check if FadeIn component is imported
- Verify animation classes are in globals.css
- Check if animation duration > 0
- Ensure transform property isn't overridden

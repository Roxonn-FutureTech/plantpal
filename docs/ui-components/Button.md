# Button Component

The Button component is a versatile and reusable UI element that follows our design system guidelines. It supports multiple variants, sizes, and states while maintaining accessibility standards.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | The content to be displayed inside the button |
| variant | 'primary' \| 'secondary' \| 'outline' | 'primary' | The variant style of the button |
| onClick | () => void | - | Optional click handler |
| disabled | boolean | false | Whether the button is disabled |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The size of the button |
| className | string | '' | Additional CSS classes |

## Usage Examples

```tsx
import Button from '@/components/Button';

// Primary Button (Default)
<Button onClick={() => console.log('Clicked!')}>
  Click me
</Button>

// Secondary Button
<Button 
  variant="secondary" 
  size="large"
  onClick={() => alert('Secondary action')}
>
  Secondary Action
</Button>

// Outline Button (Disabled)
<Button 
  variant="outline" 
  disabled
>
  Disabled Button
</Button>

// Small Primary Button with Custom Class
<Button 
  size="small"
  className="my-4"
>
  Small Button
</Button>
```

## Style Guide

The Button component uses Tailwind CSS for styling and follows these design principles:

### Colors
- Primary: Green-based theme (matches PlantPal's nature-focused brand)
- Secondary: Gray-scale for less prominent actions
- Outline: Bordered version for tertiary actions

### Variants

1. **Primary** (Default)
   - High emphasis
   - Used for main actions
   - Filled background with white text
   - Example: "Save Changes", "Submit", "Next"

2. **Secondary**
   - Medium emphasis
   - Used for secondary actions
   - Light background with dark text
   - Example: "Cancel", "Back", "See More"

3. **Outline**
   - Low emphasis
   - Used for tertiary actions
   - Bordered with no fill
   - Example: "Learn More", "Skip"

### Sizes

1. **Small** (`small`)
   - Compact size: 24px height
   - Used in tight spaces or dense UIs
   - Font size: 14px (sm)

2. **Medium** (`medium`) - Default
   - Standard size: 32px height
   - Used for most button instances
   - Font size: 16px (base)

3. **Large** (`large`)
   - Prominent size: 40px height
   - Used for main call-to-action buttons
   - Font size: 18px (lg)

## Theming

The Button component uses these Tailwind CSS classes which can be customized in your `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0fdf4',
          // ... other shades
          600: '#16a34a',
          700: '#15803d',
        },
        gray: {
          200: '#e5e7eb',
          300: '#d1d5db',
          800: '#1f2937',
        }
      }
    }
  }
}
```

## Accessibility

The Button component follows WCAG 2.1 guidelines:

### Keyboard Navigation
- Fully focusable with keyboard (Tab key)
- Activatable with Enter or Space key
- Visual focus indicator with ring outline

### Screen Readers
- Uses semantic `<button>` element
- Includes `aria-disabled` attribute
- Maintains proper focus management

### Color Contrast
- All color combinations meet WCAG AA standards
- Focus states are clearly visible
- Disabled states are visually distinct

## Testing Guide

Here's how to test the Button component:

```tsx
import { render, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  // Render Test
  it('renders children correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  // Click Handler Test
  it('handles click events', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button onClick={handleClick}>Click me</Button>
    );
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  // Disabled State Test
  it('respects disabled state', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  // Style Tests
  it('applies variant styles correctly', () => {
    const { container } = render(
      <Button variant="primary">Primary Button</Button>
    );
    expect(container.firstChild).toHaveClass('bg-green-600');
  });

  it('applies size styles correctly', () => {
    const { container } = render(
      <Button size="large">Large Button</Button>
    );
    expect(container.firstChild).toHaveClass('px-6 py-3 text-lg');
  });
});
``` 
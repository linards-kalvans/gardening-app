# Design System Overview
## Northern European Gardening App

### Design System Foundation

This design system is built specifically for the Northern European Gardening App, focusing on mobile-first design, accessibility, and the unique aesthetic of Northern European gardening culture.

### Core Design Tokens

#### Color Palette
```css
/* Primary Colors - Forest Theme */
--color-forest-green: #2D5016;      /* Primary brand color */
--color-sage-green: #9CAF88;        /* Secondary green */
--color-mint-green: #A8D5BA;        /* Accent green */

/* Neutral Colors */
--color-warm-beige: #F5E6D3;        /* Background neutral */
--color-white: #FFFFFF;              /* Pure white */
--color-gray-100: #F8F9FA;          /* Light gray */
--color-gray-500: #ADB5BD;          /* Medium gray */
--color-gray-900: #212529;           /* Dark gray */

/* Semantic Colors */
--color-success: #9CAF88;           /* Success states */
--color-warning: #F4D03F;           /* Warning states */
--color-error: #B7410E;             /* Error states */
--color-info: #87CEEB;               /* Info states */
```

#### Typography System
```css
/* Font Families */
--font-primary: 'Inter', sans-serif;           /* Headings */
--font-secondary: 'Source Sans Pro', sans-serif; /* Body text */

/* Font Sizes */
--text-xs: 12px;     /* Small labels */
--text-sm: 14px;     /* Secondary text */
--text-base: 16px;   /* Body text */
--text-lg: 18px;     /* Large body text */
--text-xl: 20px;     /* Small headings */
--text-2xl: 24px;    /* Medium headings */
--text-3xl: 32px;    /* Large headings */
--text-4xl: 40px;    /* Extra large headings */

/* Line Heights */
--leading-tight: 1.2;    /* Headings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.6;  /* Long-form content */
```

#### Spacing Scale
```css
/* Spacing Scale (4px base unit) */
--space-1: 4px;   /* Micro spacing */
--space-2: 8px;   /* Small spacing */
--space-3: 12px;  /* Medium spacing */
--space-4: 16px;  /* Base spacing */
--space-5: 20px;  /* Large spacing */
--space-6: 24px;  /* Extra large spacing */
--space-8: 32px;  /* Section spacing */
--space-12: 48px; /* Large section spacing */
--space-16: 64px; /* Page spacing */
```

#### Border Radius
```css
/* Border Radius */
--radius-sm: 4px;   /* Small elements */
--radius-md: 8px;   /* Buttons, inputs */
--radius-lg: 12px;  /* Cards, containers */
--radius-xl: 16px;  /* Large containers */
--radius-full: 9999px; /* Pills, avatars */
```

#### Shadows
```css
/* Box Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Component Categories

#### Base Components
- **Buttons**: Primary, Secondary, OAuth, Icon
- **Inputs**: Text, Email, Password, Search
- **Cards**: Basic, Plant, Garden, Reminder
- **Navigation**: Header, Footer, Sidebar, Mobile Menu
- **Feedback**: Loading, Error, Success, Empty States

#### Authentication Components
- **OAuth Buttons**: Google, Facebook
- **Login Form**: Email/Password inputs
- **Loading States**: Authentication progress
- **Error Messages**: Validation and system errors
- **Success States**: Welcome and redirect states

#### Dashboard Components
- **User Profile**: Avatar, name, settings
- **Navigation Menu**: Main navigation items
- **Quick Actions**: Primary user actions
- **Status Cards**: Garden status, reminders
- **Logout Button**: Secure logout option

### Responsive Design

#### Mobile-First Approach
```css
/* Mobile (320px - 768px) */
@media (min-width: 320px) {
  /* Small phones */
}

@media (min-width: 375px) {
  /* Large phones */
}

@media (min-width: 414px) {
  /* Extra large phones */
}

/* Tablet (768px - 1024px) */
@media (min-width: 768px) {
  /* Small tablets */
}

@media (min-width: 1024px) {
  /* Large tablets */
}

/* Desktop (1024px+) */
@media (min-width: 1280px) {
  /* Small desktop */
}

@media (min-width: 1536px) {
  /* Large desktop */
}
```

### Accessibility Standards

#### Color Contrast
- **Normal Text**: 4.5:1 contrast ratio minimum
- **Large Text**: 3:1 contrast ratio minimum
- **UI Components**: 3:1 contrast ratio minimum
- **Focus Indicators**: 2:1 contrast ratio minimum

#### Touch Targets
- **Minimum Size**: 44px x 44px
- **Recommended Size**: 48px x 48px
- **Spacing**: 8px minimum between targets
- **Thumb Zone**: Primary actions in bottom 1/3 of screen

#### Typography Accessibility
- **Font Size**: Minimum 16px for body text
- **Line Height**: 1.5x font size for readability
- **Letter Spacing**: 0.1em for small text
- **Word Spacing**: 0.16em for optimal reading

### Design Principles

1. **Mobile-First**: Design for smartphone users first
2. **Simplicity**: Easy for beginners to use
3. **Clarity**: Clear visual hierarchy and navigation
4. **Accessibility**: Usable by all skill levels
5. **Nature-Inspired**: Aesthetic that reflects gardening
6. **Northern European**: Appropriate for target region

### Component Naming Convention

#### Naming Structure
```
[Component Type]/[Variant]/[State]/[Size]

Examples:
- Button/Primary/Default/Medium
- Button/Secondary/Hover/Large
- Input/Text/Error/Small
- Card/Plant/Default/Medium
```

#### File Naming
```
[Component Name] - [Variant] - [State]

Examples:
- Button Primary Default
- Button Secondary Hover
- Input Text Error
- Card Plant Default
```

### Testing Requirements

#### Component Testing
- **Visual Regression**: Automated screenshot comparison
- **Accessibility**: WCAG 2.1 AA compliance testing
- **Responsive**: Multi-device layout testing
- **Interaction**: User flow testing

#### Authentication Testing
- **OAuth Flow**: Complete authentication journey
- **Error Handling**: All error states tested
- **Loading States**: Progress indication testing
- **Success States**: Transition testing

### Documentation Standards

#### Component Documentation
- **Purpose**: What the component does
- **Usage**: When and how to use it
- **Props**: All available properties
- **Examples**: Code examples and variations
- **Accessibility**: Screen reader and keyboard support

#### Design Documentation
- **Design Decisions**: Why specific choices were made
- **User Research**: Insights that informed design
- **Accessibility**: Compliance and testing results
- **Responsive**: Breakpoint behavior and testing

---

*This design system provides a comprehensive foundation for creating consistent, accessible, and beautiful user interfaces for the Northern European Gardening App.*

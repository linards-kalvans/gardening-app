# Figma Workspace Setup
## Design System Foundation for Gardening App

### Workspace Structure

#### Main Files
1. **Design System Master** - Core design system components
2. **Authentication Flow** - Login and OAuth designs
3. **Dashboard Design** - User dashboard and navigation
4. **Component Library** - Reusable UI components
5. **Research & Inspiration** - Mood boards and reference materials

### Design System Organization

#### Pages Structure
```
📁 Design System Master
├── 🎨 Colors & Typography
├── 📱 Mobile Components
├── 💻 Desktop Components
├── 🎯 OAuth Components
├── 📊 Dashboard Components
└── 📋 Documentation

📁 Authentication Flow
├── 🔐 Login Page
├── 🔄 OAuth Buttons
├── ⏳ Loading States
├── ❌ Error States
├── ✅ Success States
└── 📱 Responsive Layouts

📁 Dashboard Design
├── 🏠 Dashboard Layout
├── 👤 User Profile
├── 🚪 Logout Flow
├── 📱 Mobile Navigation
└── 💻 Desktop Navigation
```

### Component Library Structure

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

### Design Tokens

#### Color Tokens
```css
/* Primary Colors */
--color-forest-green: #2D5016;
--color-sage-green: #9CAF88;
--color-mint-green: #A8D5BA;
--color-warm-beige: #F5E6D3;

/* Neutral Colors */
--color-white: #FFFFFF;
--color-gray-100: #F8F9FA;
--color-gray-200: #E9ECEF;
--color-gray-300: #DEE2E6;
--color-gray-400: #CED4DA;
--color-gray-500: #ADB5BD;
--color-gray-600: #6C757D;
--color-gray-700: #495057;
--color-gray-800: #343A40;
--color-gray-900: #212529;

/* Semantic Colors */
--color-success: #9CAF88;
--color-warning: #F4D03F;
--color-error: #B7410E;
--color-info: #87CEEB;
```

#### Typography Tokens
```css
/* Font Families */
--font-primary: 'Inter', sans-serif;
--font-secondary: 'Source Sans Pro', sans-serif;

/* Font Sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 32px;
--text-4xl: 40px;

/* Line Heights */
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.6;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

#### Spacing Tokens
```css
/* Spacing Scale */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

#### Border Radius Tokens
```css
/* Border Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

#### Shadow Tokens
```css
/* Box Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Responsive Breakpoints

#### Mobile First Approach
```css
/* Mobile */
@media (min-width: 320px) { /* Small phones */ }
@media (min-width: 375px) { /* Large phones */ }
@media (min-width: 414px) { /* Extra large phones */ }

/* Tablet */
@media (min-width: 768px) { /* Small tablets */ }
@media (min-width: 1024px) { /* Large tablets */ }

/* Desktop */
@media (min-width: 1280px) { /* Small desktop */ }
@media (min-width: 1536px) { /* Large desktop */ }
```

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

### Accessibility Guidelines

#### Color Contrast Requirements
- **Normal Text**: 4.5:1 contrast ratio
- **Large Text**: 3:1 contrast ratio
- **UI Components**: 3:1 contrast ratio
- **Focus Indicators**: 2:1 contrast ratio

#### Touch Target Requirements
- **Minimum Size**: 44px x 44px
- **Recommended Size**: 48px x 48px
- **Spacing**: 8px minimum between targets
- **Thumb Zone**: Primary actions in bottom 1/3

#### Typography Accessibility
- **Font Size**: Minimum 16px for body text
- **Line Height**: 1.5x font size
- **Letter Spacing**: 0.1em for small text
- **Word Spacing**: 0.16em for optimal reading

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

*This workspace setup provides a solid foundation for creating a comprehensive design system that supports the gardening app's authentication flow while maintaining consistency and accessibility standards.*

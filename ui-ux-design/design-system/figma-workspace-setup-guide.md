# Figma Workspace Setup Guide
## Northern European Gardening App Design System

### Workspace Structure

#### Main Project File
**Project Name**: "Northern European Gardening App - Design System"
**Organization**: 
- **Team**: Gardening App Design Team
- **Access**: Team members with edit access
- **Version Control**: Auto-save enabled

#### File Organization
```
📁 Northern European Gardening App
├── 🎨 Design System Master
├── 🔐 Authentication Flow
├── 🏠 Dashboard Design
├── 🌱 Plant Components
├── 📱 Mobile Components
├── 💻 Desktop Components
└── 📋 Documentation
```

### Design System Master File

#### Pages Structure
```
📁 Design System Master
├── 🎨 Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Shadows
│   └── Icons
├── 📱 Components
│   ├── Buttons
│   ├── Inputs
│   ├── Cards
│   ├── Navigation
│   └── Feedback
├── 🔐 Authentication
│   ├── Login Page
│   ├── OAuth Buttons
│   ├── Loading States
│   └── Error States
├── 🏠 Dashboard
│   ├── Layout
│   ├── Navigation
│   ├── User Profile
│   └── Quick Actions
└── 📋 Documentation
    ├── Usage Guidelines
    ├── Accessibility
    └── Implementation
```

### Color System Setup

#### Primary Colors
```css
/* Forest Green Palette */
--color-forest-green: #2D5016;      /* Primary brand */
--color-sage-green: #9CAF88;         /* Secondary */
--color-mint-green: #A8D5BA;        /* Accent */

/* Neutral Palette */
--color-warm-beige: #F5E6D3;        /* Background */
--color-white: #FFFFFF;              /* Pure white */
--color-gray-100: #F8F9FA;          /* Light gray */
--color-gray-500: #ADB5BD;           /* Medium gray */
--color-gray-900: #212529;           /* Dark gray */
```

#### Semantic Colors
```css
/* Status Colors */
--color-success: #9CAF88;            /* Success states */
--color-warning: #F4D03F;           /* Warning states */
--color-error: #B7410E;             /* Error states */
--color-info: #87CEEB;               /* Info states */
```

#### OAuth Colors
```css
/* OAuth Brand Colors */
--color-google: #EA4335;             /* Google red */
--color-facebook: #1877F2;           /* Facebook blue */
```

### Typography System Setup

#### Font Families
```css
/* Primary Fonts */
--font-primary: 'Inter', sans-serif;           /* Headings */
--font-secondary: 'Source Sans Pro', sans-serif; /* Body text */
```

#### Text Styles
```css
/* Heading Styles */
--text-h1: 32px, Inter Bold, 1.2 line height
--text-h2: 24px, Inter Bold, 1.3 line height
--text-h3: 20px, Inter Medium, 1.4 line height

/* Body Styles */
--text-body: 16px, Source Sans Pro Regular, 1.5 line height
--text-small: 14px, Source Sans Pro Regular, 1.4 line height
--text-caption: 12px, Source Sans Pro Regular, 1.3 line height
```

### Component Library Setup

#### Button Components
**Component Structure**:
```
Button/
├── Primary/
│   ├── Default
│   ├── Hover
│   ├── Active
│   ├── Disabled
│   └── Focus
├── Secondary/
│   ├── Default
│   ├── Hover
│   ├── Active
│   ├── Disabled
│   └── Focus
├── OAuth/
│   ├── Google
│   ├── Facebook
│   └── Loading
└── Icon/
    ├── Default
    ├── Hover
    └── Active
```

#### Input Components
**Component Structure**:
```
Input/
├── Text/
│   ├── Default
│   ├── Focus
│   ├── Error
│   ├── Success
│   └── Disabled
├── Search/
│   ├── Default
│   ├── Focus
│   └── Active
└── Password/
    ├── Default
    ├── Focus
    ├── Error
    └── Show/Hide
```

#### Card Components
**Component Structure**:
```
Card/
├── Basic/
│   ├── Default
│   ├── Hover
│   └── Active
├── Plant/
│   ├── Default
│   ├── Hover
│   ├── Selected
│   └── Focus
├── Garden/
│   ├── Default
│   ├── Hover
│   └── Active
└── Reminder/
    ├── Default
    ├── Hover
    ├── Completed
    └── Overdue
```

### Responsive Design Setup

#### Breakpoint System
```css
/* Mobile First Breakpoints */
--mobile-sm: 320px;     /* Small phones */
--mobile-md: 375px;     /* Large phones */
--mobile-lg: 414px;     /* Extra large phones */
--tablet-sm: 768px;      /* Small tablets */
--tablet-lg: 1024px;     /* Large tablets */
--desktop-sm: 1280px;    /* Small desktop */
--desktop-lg: 1536px;    /* Large desktop */
```

#### Grid System
```css
/* Mobile Grid */
--mobile-columns: 4;
--mobile-gutter: 16px;
--mobile-margin: 16px;

/* Tablet Grid */
--tablet-columns: 8;
--tablet-gutter: 24px;
--tablet-margin: 24px;

/* Desktop Grid */
--desktop-columns: 12;
--desktop-gutter: 32px;
--desktop-margin: 32px;
```

### Component Specifications

#### Button Specifications
**Dimensions**:
- **Height**: 48px (mobile), 44px (desktop)
- **Width**: Full width (mobile), auto (desktop)
- **Border Radius**: 8px
- **Padding**: 12px 24px

**Typography**:
- **Font**: Inter Medium, 16px
- **Line Height**: 1.5
- **Letter Spacing**: 0.1em

**States**:
- **Default**: Primary color background
- **Hover**: 10% darker background
- **Active**: 20% darker background
- **Disabled**: Gray background, disabled cursor
- **Focus**: 2px outline in sage green

#### Input Specifications
**Dimensions**:
- **Height**: 48px
- **Border Radius**: 8px
- **Padding**: 12px 16px

**Typography**:
- **Font**: Source Sans Pro Regular, 16px
- **Line Height**: 1.5
- **Placeholder**: Gray text (#ADB5BD)

**States**:
- **Default**: White background, gray border
- **Focus**: Forest green border, sage green outline
- **Error**: Rust red border, error message
- **Success**: Sage green border
- **Disabled**: Gray background, disabled cursor

#### Card Specifications
**Dimensions**:
- **Border Radius**: 12px
- **Padding**: 24px
- **Shadow**: Subtle shadow (0 2px 4px rgba(0,0,0,0.1))

**States**:
- **Default**: White background, subtle shadow
- **Hover**: Elevated shadow
- **Active**: Pressed state with slight inset
- **Focus**: 2px outline in sage green

### Accessibility Setup

#### Color Contrast
**Requirements**:
- **Normal Text**: 4.5:1 contrast ratio minimum
- **Large Text**: 3:1 contrast ratio minimum
- **UI Components**: 3:1 contrast ratio minimum
- **Focus Indicators**: 2:1 contrast ratio minimum

#### Touch Targets
**Requirements**:
- **Minimum Size**: 44px x 44px
- **Recommended Size**: 48px x 48px
- **Spacing**: 8px minimum between targets
- **Thumb Zone**: Primary actions in bottom 1/3

#### Focus Management
**Requirements**:
- **Focus Outline**: 2px solid sage green (#9CAF88)
- **Focus Order**: Logical tab order
- **Skip Links**: Available for keyboard navigation
- **Focus Trapping**: Modal and overlay focus management

### Component Testing Setup

#### Visual Regression Testing
**Requirements**:
- **Screenshot Comparison**: Automated visual testing
- **Multi-Device Testing**: Mobile, tablet, desktop
- **State Testing**: All component states
- **Responsive Testing**: All breakpoints

#### Accessibility Testing
**Requirements**:
- **WCAG Compliance**: 2.1 AA standards
- **Screen Reader**: VoiceOver, NVDA, JAWS
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: Automated contrast checking

#### Interaction Testing
**Requirements**:
- **User Flows**: Complete authentication journey
- **Error Handling**: All error states
- **Loading States**: Progress indication
- **Success States**: Transition testing

### Documentation Standards

#### Component Documentation
**Requirements**:
- **Purpose**: What the component does
- **Usage**: When and how to use it
- **Props**: All available properties
- **Examples**: Code examples and variations
- **Accessibility**: Screen reader and keyboard support

#### Design Documentation
**Requirements**:
- **Design Decisions**: Why specific choices were made
- **User Research**: Insights that informed design
- **Accessibility**: Compliance and testing results
- **Responsive**: Breakpoint behavior and testing

### Collaboration Setup

#### Team Access
**Permissions**:
- **Designers**: Edit access to all files
- **Developers**: View access to design files
- **Stakeholders**: View access to final designs
- **Reviewers**: Comment access to specific files

#### Version Control
**Process**:
- **Auto-save**: Enabled for all files
- **Version History**: Track all changes
- **Comments**: Inline feedback and suggestions
- **Approvals**: Design approval workflow

#### Handoff Process
**Developer Handoff**:
- **Specifications**: Detailed component specs
- **Assets**: Exported images and icons
- **Code Snippets**: CSS and HTML examples
- **Testing Requirements**: Accessibility and responsive testing

---

*This Figma workspace setup provides a comprehensive foundation for creating and maintaining a consistent design system for the Northern European Gardening App.*

# 🚀 Wesuap - Professional Network & Skill Exchange Platform

## Overview
A React Native mobile application built with Expo that connects professionals for skill exchange and collaboration. Users can discover matches based on their skills and interests, view detailed profiles, browse creative assets, and send collaboration offers.

## 📱 Tech Stack
- **Framework:** React Native (0.81.5) with Expo (~54.0.32)
- **Navigation:** Expo Router (v6.0.22) - File-based routing
- **Language:** TypeScript (v5.9.2)
- **UI/UX:** Custom components with React Native Gesture Handler & Reanimated
- **State Management:** React Hooks (useState, useEffect, useRef)
- **Haptics:** Expo Haptics for tactile feedback
- **Styling:** React Native StyleSheet API

## ✨ Key Features

### 🎯 Core Functionality

#### 1. **Animated Loading & Matching Experience**
- Full-screen orange loading animation with spinner
- "We found your match!" celebration with:
  - Animated checkmark with spring physics
  - Confetti particle burst (12 particles with randomized trajectories)
  - Haptic feedback for enhanced UX
- Smooth swipe-left transition revealing search results underneath
- Prevents navigation loops using sessionStorage flags

#### 2. **Profile Matching System**
- **Search Page:** Displays matched profile with comprehensive information
- **Profile Cards:** News-feed style layout featuring:
  - Circular avatar (60x60) positioned left
  - Display name, location, and bio
  - Skill tags with color-coded categories
  - Social media links (Instagram, website)
  - "Send Offer" call-to-action button
  
#### 3. **Skill Tag System**
- 30+ predefined skill categories with distinct, accessible colors
- Categories include:
  - Creative: Art & Design, Photography, Video Editing, Music Production
  - Technical: Programming, Web Development, Data Analysis, AI/ML
  - Business: Marketing, Finance, Real Estate, Legal Services
  - Professional: Consulting, Career Coaching, Language Teaching
  - And many more...
- Ensures WCAG-compliant color contrast for readability

#### 4. **Asset Portfolio Display**
- **Asset Cards:** Showcase user's work and offerings
  - Title and description
  - Multiple skill tags per asset
  - Portfolio URL links
  - Optional preview images (200x200)
  - Social media integration
- Grid layout for browsing multiple assets per profile

#### 5. **Offer Submission System**
- Modal form with slide-up animation
- Form fields:
  - Offer title (required)
  - Detailed description (required, multiline)
  - Skills to exchange (dropdown/picker)
  - Custom message (optional)
- Real-time validation with error states
- Animated success state:
  - Loading spinner during submission
  - Green checkmark confirmation
  - Auto-dismiss after 2 seconds
- Semi-transparent overlay backdrop

#### 6. **Bottom Navigation**
- 5-tab navigation system:
  - 🏠 **Home** - Main feed
  - 🔍 **Search** - Find matches
  - 💬 **Messages** - Chat
  - 💼 **Wallet** - Assets/portfolio
  - 👤 **Profile** - User settings
- Active state highlighting with orange accent
- Icons from Ionicons library

### 📄 Pages & Routes

| Route | Purpose | Features |
|-------|---------|----------|
| `/` | Entry point | Redirects to loading page |
| `/loading` | Match discovery | Animated loader, confetti, search preview |
| `/search` | Match results | Profile card, asset grid, send offer |
| `/matched` | Confirmed match | Single match celebration view |
| `/messages` | Chat | Messaging interface (placeholder) |
| `/profile` | User profile | Personal info & settings (placeholder) |
| `/wallet` | Portfolio | Asset management (placeholder) |
| `/welcome` | Onboarding | First-time user flow (placeholder) |

## 🎨 Design Highlights

### Color Palette
- **Primary:** `#FF6A00` (Orange) - CTAs, active states, brand color
- **Background:** `#FAFAFA` (Light gray) - Page backgrounds
- **Cards:** `#FFFFFF` - Card surfaces with subtle shadows
- **Text:** 
  - Primary: `#1A1A1A` (Near black)
  - Secondary: `#666666` (Medium gray)
  - Tertiary: `#999999` (Light gray)

### Typography
- **Headers:** Bold weights (700-800) at 20-24px
- **Body:** Regular/Semibold (400-600) at 14-16px
- **Labels:** Smaller text at 12px for metadata

### Animation Details
- **Confetti:** Cubic easing for natural motion
- **Checkmark:** Spring physics (friction: 6, tension: 120)
- **Page Transitions:** 600ms duration with cubic easing
- **Scale Effects:** Subtle 0.98-1.0 range for depth

## 🏗️ Architecture

### Component Structure
```
components/
├── ProfileCard.tsx       # User profile display with social links
├── AssetCard.tsx         # Portfolio item showcase
├── AssetTag.tsx          # Color-coded skill badges (30+ categories)
├── BottomNav.tsx         # 5-tab navigation component
└── OfferForm.tsx         # Modal form for collaboration requests

app/
├── _layout.tsx           # Root layout with router
├── index.tsx             # Entry point
├── loading.tsx           # Animated match discovery + embedded search preview
├── search.tsx            # Match results with profile & assets
├── matched.tsx           # Single match celebration
└── [other pages].tsx     # Messages, Profile, Wallet, Welcome

data/
└── seed.ts               # Mock data for profiles and assets
```

### Data Models

#### Profile Type
```typescript
interface Profile {
  id: string;
  displayName: string;
  location: string;
  bio: string;
  avatarUrl: string;
  skills: AssetTag[];
  socials?: {
    instagram?: string;
    website?: string;
  };
  assets?: Asset[];
}
```

#### Asset Type
```typescript
interface Asset {
  id: string;
  title: string;
  description: string;
  tags: string[];
  portfolioUrl?: string;
  imageUrl?: string;
  socials?: {
    instagram?: string;
  };
}
```

## 🔧 Technical Implementation

### Animation System
- **React Native Animated API** for smooth, performant animations
- **useNativeDriver: true** for all transforms (60fps animations)
- **Animated.Value** for continuous value interpolation
- **Animated.parallel()** and **Animated.sequence()** for choreographed effects

### Navigation Flow
1. App launches → `/` redirects to `/loading`
2. Loading animation plays → Embedded search content rendered underneath
3. Orange overlay slides left → Reveals search page (avoids black screen)
4. Sets sessionStorage flag → Navigates to `/search`
5. Search page checks flag → Shows content or redirects back to loading

### State Management Strategy
- **Local state (useState)** for UI controls and form inputs
- **useRef** for animation values and navigation guards
- **useEffect** for lifecycle events and navigation logic
- **sessionStorage** for cross-route communication (web-compatible)

### Error Handling
- Component mounting checks to prevent premature navigation
- Deferred router calls with setTimeout to ensure layout readiness
- Conditional rendering based on state (null returns while loading)
- Form validation with error messaging

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app)

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run ios     # iOS Simulator
npm run android # Android Emulator
npm run web     # Web browser
```

### Development Commands
```bash
npm run lint          # Run ESLint
npm run reset-project # Reset to blank project
```

## 📸 User Flow

1. **Launch** → Animated orange loading screen
2. **Match Found** → "We found your match!" with confetti 🎉
3. **Reveal** → Screen swipes left to show match profile
4. **Explore** → View profile details and asset portfolio
5. **Connect** → Tap "Send Offer" to open collaboration form
6. **Submit** → Fill form, see success animation, start collaboration

## 🎯 Future Enhancements

### Potential Features
- [ ] Real-time chat messaging system
- [ ] Firebase/Supabase backend integration
- [ ] User authentication (email, social login)
- [ ] Profile editing capabilities
- [ ] Asset upload and management
- [ ] Advanced matching algorithm
- [ ] Push notifications for new matches
- [ ] In-app offer tracking and management
- [ ] Rating/review system for collaborations
- [ ] Search filters (skills, location, availability)

### Technical Improvements
- [ ] Redux or Zustand for global state
- [ ] React Query for data fetching/caching
- [ ] Unit tests with Jest
- [ ] E2E tests with Detox
- [ ] Performance monitoring (Sentry)
- [ ] Accessibility audit and improvements
- [ ] Dark mode support
- [ ] Internationalization (i18n)

## 📝 Code Quality

- **TypeScript** for type safety and better DX
- **ESLint** with Expo config for code consistency
- **Component composition** for reusability
- **Props interfaces** for clear component APIs
- **Descriptive naming** for variables and functions
- **Comments** for complex logic and animation sequences

## 🤝 Contributing

This project follows standard React Native and Expo best practices:
- Use functional components with hooks
- Prefer TypeScript interfaces over types
- Keep components small and focused
- Extract reusable logic into custom hooks
- Style with StyleSheet.create() for performance
- Use proper key props in lists
- Handle loading and error states

## 📄 License

Private project for TTP Winter Immersion - Wesuap FE Take-home

---

**Built with ❤️ using React Native & Expo**

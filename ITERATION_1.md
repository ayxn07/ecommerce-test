# Fashion E-commerce Mobile App - Iteration 1

## Overview
A React Native fashion e-commerce mobile app built with Expo, featuring a clean Apple-inspired design with a leaf-green and white color scheme.

## Tech Stack
- **Framework**: Expo React Native
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: React Navigation (Native Stack + Bottom Tabs)
- **State Management**: Redux Toolkit
- **Animations**: React Native Reanimated
- **Language**: TypeScript

## Features Implemented (Iteration 1)

### ✅ Architecture
- Clean, modular `/src` structure with feature-based folders
- TypeScript-first approach
- Redux Toolkit for state management (auth, cart, wishlist)
- Mock data system for development

### ✅ UI Components
- **PrimaryButton**: Customizable button with variants (primary, secondary, outline)
- **TextInputField**: Reusable input with label and error states
- **Card**: Container component with consistent styling
- **SectionHeader**: Section titles with optional action buttons
- **ProductTile**: Product display card with image, price, rating, and discount badge
- **LoadingState**: Consistent loading indicator
- **EmptyState**: User-friendly empty state with icon and message
- **ErrorState**: Error handling with retry functionality

### ✅ Screens

#### Authentication Flow
- **Splash Screen**: Animated splash with app logo (React Native Reanimated)
- **Login Screen**: Email/password login with validation
- **Register Screen**: User registration with form validation

#### Main App Flow
- **Home Screen**: Featured products, categories, hero section
- **Categories Screen**: Browse all product categories
- **Search Screen**: Product search with real-time filtering
- **Wishlist Screen**: Saved products with empty state
- **Cart Screen**: Shopping cart with quantity controls and checkout
- **Profile Screen**: User profile with menu items and logout

#### Product Screens
- **Product List Screen**: Category-filtered product listing
- **Product Details Screen**: Detailed product view with color/size selection, add to cart, wishlist toggle

### ✅ Navigation
- **AuthStack**: Login → Register flow
- **MainTabs**: Bottom tab navigation (Home, Categories, Search, Wishlist, Cart, Profile)
- **RootStack**: Conditional rendering based on authentication state
- Smooth transitions and animations

### ✅ Theme
- Primary colors: Green-600 (#16a34a) and Green-700 (#15803d)
- Background: White (#FFFFFF)
- Consistent spacing, typography, and shadows
- All screens include loading, empty, and error states

## Project Structure
```
/src
  /components       # Reusable UI components
  /screens         # All app screens
  /navigation      # Navigation configuration
  /store           # Redux slices and store configuration
  /constants       # Theme and mock data
  /features        # Feature modules (future use)
  /services        # API services (future use)
  /utils           # Utility functions (future use)
  /types           # TypeScript types (future use)
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI

### Installation
```bash
npm install
```

### Running the App
```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### Development Commands
```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## State Management

### Redux Slices
1. **Auth Slice**: User authentication state
   - `login()`: Authenticate user
   - `logout()`: Sign out user

2. **Cart Slice**: Shopping cart management
   - `addToCart()`: Add product to cart
   - `removeFromCart()`: Remove product
   - `updateQuantity()`: Update product quantity
   - `clearCart()`: Empty cart

3. **Wishlist Slice**: Saved products
   - `addToWishlist()`: Save product
   - `removeFromWishlist()`: Remove saved product
   - `clearWishlist()`: Clear all saved products

## Design Principles
- **Apple-inspired**: Clean, minimal, and intuitive UI
- **Performance-focused**: Optimized animations and minimal dependencies
- **Modular**: Easy to extend and maintain
- **Type-safe**: Full TypeScript coverage
- **Consistent**: Unified theme and component library

## Mock Data
Currently using mock data in `/src/constants/mockData.ts`:
- 6 product categories
- 6 sample products with variations
- Mock user data
- Mock authentication state

## Next Steps (Iteration 2+)
- [ ] API integration
- [ ] Product filtering and sorting
- [ ] Checkout flow
- [ ] Order history
- [ ] User settings
- [ ] Payment integration
- [ ] Push notifications
- [ ] Social login
- [ ] Product reviews
- [ ] Search history

## Bundle Size
- Source code: ~172KB (highly optimized)
- Target final bundle: ~60MB
- Dependencies: Carefully selected for minimal footprint

## Notes
- All screens include proper loading, empty, and error states
- Navigation flows work end-to-end
- TypeScript compilation passes without errors
- Linting passes without errors
- App structure is modular and scalable

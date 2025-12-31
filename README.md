# E-commerce App with FakeStoreAPI Integration

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) that integrates with [FakeStoreAPI](https://fakestoreapi.com) for a complete e-commerce experience.

## Features

- 🛍️ Product browsing with categories
- 🔐 User authentication (login)
- 🛒 Shopping cart functionality
- ❤️ Wishlist management
- 🔍 Product search
- 📱 Responsive design with NativeWind (Tailwind CSS)
- 🎨 Premium UI/UX with green accent theme

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Install Playwright browsers for E2E tests

   ```bash
   npx playwright install chromium
   ```

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
- Web browser (press `w`)

You can start developing by editing the files inside the **src** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## API Integration Modes

The app supports two API modes for flexible testing and development:

### Live Mode (Default)

Connects to the real FakeStoreAPI:

```bash
# Start app in live mode (default)
npm run web
```

### Fixture Mode (Deterministic Testing)

Uses local JSON fixtures for deterministic E2E testing:

```bash
# Start app in fixture mode
EXPO_PUBLIC_E2E_API_MODE=fixture npm run web
```

## Test Credentials

For testing the login functionality, use these credentials from FakeStoreAPI:

- **Username**: `johnd`
- **Password**: `m38rmF$`

Other test users:
- `mor_2314` / `83r5^_`
- `kevinryan` / `kev02937@`

## Running E2E Tests

The project uses Playwright for end-to-end testing:

```bash
# Run all E2E tests (uses fixture mode by default)
npm run e2e

# Run specific iteration tests
npx playwright test e2e/iteration-7.spec.ts

# Run tests in live mode (requires network access to fakestoreapi.com)
EXPO_PUBLIC_E2E_API_MODE=live npm run e2e

# View test report
npx playwright show-report artifacts/iteration-7/playwright-report
```

### E2E Test Artifacts

Screenshots are saved to `artifacts/iteration-7/`:
- `01-home.png` - Home screen with products
- `02-categories.png` - Categories listing
- `03-productlist.png` - Product list by category
- `04-pdp.png` - Product details page
- `05-added.png` - Product added to cart
- `06-cart.png` - Shopping cart
- `07-login.png` - Login screen
- `08-cart-synced.png` - Cart after authentication
- `09-live-home.png` - Live API smoke test (if network available)

## API Endpoints Used

The app integrates with these FakeStoreAPI endpoints:

- `GET /products` - List all products
- `GET /products/:id` - Get single product
- `GET /products/categories` - List categories
- `GET /products/category/:category` - Products by category
- `POST /auth/login` - User authentication
- `GET /users` - List users
- `GET /carts/user/:userId` - User's carts
- `POST /carts` - Create cart
- `PUT /carts/:id` - Update cart

## Project Structure

```
├── src/
│   ├── api/              # API layer
│   │   ├── httpClient.ts # HTTP client with retry logic
│   │   ├── endpoints.ts  # API endpoint constants
│   │   ├── types.ts      # TypeScript DTOs
│   │   ├── mappers.ts    # DTO to domain model mappers
│   │   ├── fixtureLoader.ts # Fixture mode support
│   │   └── services/     # Service layer
│   ├── screens/          # App screens
│   ├── components/       # Reusable components
│   ├── store/            # Redux store and slices
│   ├── utils/            # Utility functions
│   └── constants/        # Constants and types
├── fixtures/             # JSON fixtures for testing
├── e2e/                  # Playwright E2E tests
└── artifacts/            # Test screenshots and reports
```

## Network Requirements for CI/CD

### Option 1: Allowlist FakeStoreAPI (Recommended for Live Tests)

If your CI environment has firewall restrictions, allowlist:
- `fakestoreapi.com` (port 443)

### Option 2: Use Fixture Mode (Default for CI)

The E2E tests run in fixture mode by default, which doesn't require network access. Fixtures are committed to the repository in the `fixtures/` directory.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [FakeStoreAPI Documentation](https://fakestoreapi.com/docs): API reference for the backend

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

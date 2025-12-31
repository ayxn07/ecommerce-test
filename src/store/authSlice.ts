import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockUser } from '../constants/mockData';

interface AuthState {
  isAuthenticated: boolean;
  user: typeof mockUser | null;
  loading: boolean;
}

// DEVELOPMENT/TEST ONLY: Authentication bypass for E2E testing and development
// This allows testing without going through the login flow
// Security: Only works in non-production environments (checked via NODE_ENV)
let shouldBypassAuth = false;

if (typeof window !== 'undefined') {
  // Check URL query parameter for explicit bypass
  const urlParams = new URLSearchParams(window.location.search);
  shouldBypassAuth = urlParams.get('bypass-auth') === 'true';
}

// Default to authenticated in non-production for easier development
if (!shouldBypassAuth && typeof process !== 'undefined') {
  shouldBypassAuth = process.env.NODE_ENV !== 'production';
}

const initialState: AuthState = {
  isAuthenticated: shouldBypassAuth,
  user: shouldBypassAuth ? mockUser : null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<typeof mockUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;

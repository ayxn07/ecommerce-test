import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockUser } from '../constants/mockData';

interface AuthState {
  isAuthenticated: boolean;
  user: typeof mockUser | null;
  loading: boolean;
}

// For E2E testing and development, check if we should bypass auth
// Check query params first (for web), then environment
let shouldBypassAuth = false;

if (typeof window !== 'undefined') {
  // Check URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  shouldBypassAuth = urlParams.get('bypass-auth') === 'true';
}

// For development/test, default to authenticated if not in production
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

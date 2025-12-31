import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockUser } from '../constants/mockData';

interface AuthState {
  isAuthenticated: boolean;
  user: typeof mockUser | null;
  loading: boolean;
}

// For E2E testing, check if we should bypass auth
const shouldBypassAuth = typeof window !== 'undefined' && 
  (window.location.search.includes('bypass-auth=true') || process.env.NODE_ENV === 'test');

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

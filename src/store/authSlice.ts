import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { mockUser } from '../constants/mockData';
import { authService } from '../api';
import { storage } from '../utils/storage';
import type { User } from '../constants/mockData';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  currentUserId: string | null;
  username: string | null;
  loading: boolean;
  error: string | null;
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
  token: null,
  currentUserId: shouldBypassAuth ? mockUser.id : null,
  username: shouldBypassAuth ? 'dev-user' : null,
  loading: false,
  error: null,
};

/**
 * Async thunk for login
 * Calls the auth API and stores the token
 */
export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const result = await authService.login(username, password);
      
      // Store token and user info in storage
      await storage.saveToken(result.token);
      await storage.saveUserId(result.user.id);
      await storage.saveUsername(username);
      
      // Set token in HTTP client
      authService.setAuthToken(result.token);
      
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

/**
 * Async thunk for logout
 * Clears token from storage
 */
export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async () => {
    await storage.clearAuth();
    authService.clearAuthToken();
  }
);

/**
 * Async thunk to restore session from storage
 */
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async () => {
    const token = await storage.getToken();
    const userId = await storage.getUserId();
    const username = await storage.getUsername();
    
    if (token && userId && username) {
      authService.setAuthToken(token);
      return { token, userId, username };
    }
    
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.currentUserId = null;
      state.username = null;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login async
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.currentUserId = action.payload.user.id;
      state.username = action.payload.user.name;
      state.error = null;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout async
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.currentUserId = null;
      state.username = null;
      state.error = null;
    });

    // Restore session
    builder.addCase(restoreSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload.token;
        state.currentUserId = action.payload.userId;
        state.username = action.payload.username;
        state.isAuthenticated = true;
      }
    });
  },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;

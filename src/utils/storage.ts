/**
 * Storage Utility
 * Wrapper for AsyncStorage with type-safe keys
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@ecommerce/auth_token',
  USER_ID: '@ecommerce/user_id',
  USERNAME: '@ecommerce/username',
} as const;

export const storage = {
  /**
   * Save auth token
   */
  async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  /**
   * Get auth token
   */
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  /**
   * Remove auth token
   */
  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  /**
   * Save user ID
   */
  async saveUserId(userId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, userId);
    } catch (error) {
      console.error('Error saving user ID:', error);
    }
  },

  /**
   * Get user ID
   */
  async getUserId(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  },

  /**
   * Remove user ID
   */
  async removeUserId(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_ID);
    } catch (error) {
      console.error('Error removing user ID:', error);
    }
  },

  /**
   * Save username
   */
  async saveUsername(username: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USERNAME, username);
    } catch (error) {
      console.error('Error saving username:', error);
    }
  },

  /**
   * Get username
   */
  async getUsername(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.USERNAME);
    } catch (error) {
      console.error('Error getting username:', error);
      return null;
    }
  },

  /**
   * Remove username
   */
  async removeUsername(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USERNAME);
    } catch (error) {
      console.error('Error removing username:', error);
    }
  },

  /**
   * Clear all auth data
   */
  async clearAuth(): Promise<void> {
    try {
      await Promise.all([
        this.removeToken(),
        this.removeUserId(),
        this.removeUsername(),
      ]);
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  },
};

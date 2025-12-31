/**
 * Auth Service
 * Handles authentication API calls
 */

import { httpClient } from '../httpClient';
import { ENDPOINTS } from '../endpoints';
import { LoginRequestDTO, AuthResponseDTO, UserDTO } from '../types';
import { mapUserDTOToUser } from '../mappers';
import { User } from '../../constants/mockData';
import { isFixtureMode, loginFixture, getUsersFixture } from '../fixtureLoader';

export class AuthService {
  /**
   * Login with username and password
   * Returns token and user info
   * 
   * Note: FakeStoreAPI returns a token but doesn't include userId in it.
   * We need to fetch the user separately by matching the username.
   */
  async login(username: string, password: string): Promise<{ token: string; user: User }> {
    if (isFixtureMode()) {
      const authResponse = loginFixture(username, password);
      const users = getUsersFixture();
      const userDto = users.find(u => u.username === username);
      
      if (!userDto) {
        throw new Error('User not found after authentication');
      }
      
      const user = mapUserDTOToUser(userDto);
      
      return {
        token: authResponse.token,
        user,
      };
    }

    // Step 1: Get auth token
    const authResponse = await httpClient.post<AuthResponseDTO>(ENDPOINTS.LOGIN, {
      username,
      password,
    } as LoginRequestDTO);

    // Step 2: Fetch all users and find matching username
    // Note: In production, this would be handled server-side, but FakeStoreAPI
    // doesn't provide a "get current user" endpoint based on token
    const users = await httpClient.get<UserDTO[]>(ENDPOINTS.USERS);
    const userDto = users.find(u => u.username === username);

    if (!userDto) {
      throw new Error('User not found after authentication');
    }

    const user = mapUserDTOToUser(userDto);

    return {
      token: authResponse.token,
      user,
    };
  }

  /**
   * Set auth token in HTTP client
   */
  setAuthToken(token: string) {
    httpClient.setAuthToken(token);
  }

  /**
   * Clear auth token from HTTP client
   */
  clearAuthToken() {
    httpClient.clearAuthToken();
  }
}

export const authService = new AuthService();

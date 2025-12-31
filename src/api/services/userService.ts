/**
 * User Service
 * Handles user API operations
 */

import { httpClient } from '../httpClient';
import { ENDPOINTS } from '../endpoints';
import { UserDTO } from '../types';
import { mapUserDTOToUser } from '../mappers';
import { User } from '../../constants/mockData';

export class UserService {
  /**
   * Get all users
   */
  async getUsers(): Promise<User[]> {
    const dtos = await httpClient.get<UserDTO[]>(ENDPOINTS.USERS);
    return dtos.map(mapUserDTOToUser);
  }

  /**
   * Get user by ID
   */
  async getUserById(id: number | string): Promise<User> {
    const dto = await httpClient.get<UserDTO>(ENDPOINTS.USER_BY_ID(id));
    return mapUserDTOToUser(dto);
  }

  /**
   * Create new user
   */
  async createUser(userData: Partial<UserDTO>): Promise<UserDTO> {
    return httpClient.post<UserDTO>(ENDPOINTS.USERS, userData);
  }

  /**
   * Update user (PUT)
   */
  async updateUser(userId: number | string, userData: Partial<UserDTO>): Promise<UserDTO> {
    return httpClient.put<UserDTO>(ENDPOINTS.USER_BY_ID(userId), userData);
  }

  /**
   * Update user (PATCH - partial update)
   */
  async patchUser(userId: number | string, userData: Partial<UserDTO>): Promise<UserDTO> {
    return httpClient.patch<UserDTO>(ENDPOINTS.USER_BY_ID(userId), userData);
  }

  /**
   * Delete user
   */
  async deleteUser(userId: number | string): Promise<UserDTO> {
    return httpClient.delete<UserDTO>(ENDPOINTS.USER_BY_ID(userId));
  }
}

export const userService = new UserService();

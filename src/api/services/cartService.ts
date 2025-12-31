/**
 * Cart Service
 * Handles all cart API operations
 */

import { httpClient } from '../httpClient';
import { ENDPOINTS } from '../endpoints';
import { CartDTO, CartItemDTO } from '../types';
import { normalizeCartDTO } from '../mappers';
import { isFixtureMode, getCartsFixture, getCartByIdFixture, getUserCartsFixture } from '../fixtureLoader';

export interface CreateCartPayload {
  userId: number;
  date: string;
  products: CartItemDTO[];
}

export interface UpdateCartPayload {
  userId: number;
  date: string;
  products: CartItemDTO[];
}

export class CartService {
  /**
   * Get all carts
   */
  async getCarts(params?: { startdate?: string; enddate?: string }): Promise<CartDTO[]> {
    if (isFixtureMode()) {
      return getCartsFixture();
    }
    return httpClient.get<CartDTO[]>(ENDPOINTS.CARTS, params);
  }

  /**
   * Get cart by ID
   */
  async getCartById(id: number | string): Promise<CartDTO> {
    if (isFixtureMode()) {
      const cart = getCartByIdFixture(id);
      if (!cart) throw new Error('Cart not found');
      return cart;
    }
    return httpClient.get<CartDTO>(ENDPOINTS.CART_BY_ID(id));
  }

  /**
   * Get carts for a specific user
   */
  async getUserCarts(userId: number | string): Promise<CartDTO[]> {
    if (isFixtureMode()) {
      return getUserCartsFixture(userId);
    }
    return httpClient.get<CartDTO[]>(ENDPOINTS.USER_CARTS(userId));
  }

  /**
   * Create a new cart
   */
  async createCart(payload: CreateCartPayload): Promise<CartDTO> {
    if (isFixtureMode()) {
      // In fixture mode, simulate cart creation
      return {
        id: Date.now(),
        ...payload,
      };
    }
    return httpClient.post<CartDTO>(ENDPOINTS.CARTS, payload);
  }

  /**
   * Update existing cart (PUT)
   */
  async updateCart(cartId: number | string, payload: UpdateCartPayload): Promise<CartDTO> {
    if (isFixtureMode()) {
      // In fixture mode, simulate cart update
      return {
        id: Number(cartId),
        ...payload,
      };
    }
    return httpClient.put<CartDTO>(ENDPOINTS.CART_BY_ID(cartId), payload);
  }

  /**
   * Update existing cart (PATCH - partial update)
   */
  async patchCart(cartId: number | string, payload: Partial<UpdateCartPayload>): Promise<CartDTO> {
    if (isFixtureMode()) {
      // In fixture mode, simulate cart patch
      const existing = getCartByIdFixture(cartId) || { id: Number(cartId), userId: 1, date: new Date().toISOString(), products: [] };
      return {
        ...existing,
        ...payload,
        id: Number(cartId),
      };
    }
    return httpClient.patch<CartDTO>(ENDPOINTS.CART_BY_ID(cartId), payload);
  }

  /**
   * Delete cart
   */
  async deleteCart(cartId: number | string): Promise<CartDTO> {
    if (isFixtureMode()) {
      const cart = getCartByIdFixture(cartId);
      if (!cart) throw new Error('Cart not found');
      return cart;
    }
    return httpClient.delete<CartDTO>(ENDPOINTS.CART_BY_ID(cartId));
  }

  /**
   * Get or create active cart for user
   * Returns the most recent cart, or creates a new one if none exists
   */
  async getOrCreateUserCart(userId: number): Promise<CartDTO> {
    const carts = await this.getUserCarts(userId);
    
    if (carts && carts.length > 0) {
      // Sort by date descending and return most recent
      const sortedCarts = carts.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return sortedCarts[0];
    }

    // No cart exists, create one
    return this.createCart({
      userId,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      products: [],
    });
  }
}

export const cartService = new CartService();

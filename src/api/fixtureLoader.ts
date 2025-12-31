/**
 * Fixture Loader
 * Loads fixture data for deterministic testing
 */

import productsFixture from '../../fixtures/products.json';
import categoriesFixture from '../../fixtures/categories.json';
import usersFixture from '../../fixtures/users.json';
import cartsFixture from '../../fixtures/carts.json';
import { ProductDTO, CategoryDTO, UserDTO, CartDTO } from './types';

/**
 * Check if we're in fixture mode
 * Set via E2E_API_MODE=fixture or EXPO_PUBLIC_E2E_API_MODE=fixture
 */
export const isFixtureMode = (): boolean => {
  if (typeof process !== 'undefined') {
    return (
      process.env.E2E_API_MODE === 'fixture' ||
      process.env.EXPO_PUBLIC_E2E_API_MODE === 'fixture'
    );
  }
  return false;
};

/**
 * Fixture data store
 */
export const fixtures = {
  products: productsFixture as ProductDTO[],
  categories: categoriesFixture as CategoryDTO[],
  users: usersFixture as UserDTO[],
  carts: cartsFixture as CartDTO[],
};

/**
 * Get products from fixture
 */
export const getProductsFixture = (params?: { limit?: number; sort?: 'asc' | 'desc' }): ProductDTO[] => {
  let products = [...fixtures.products];
  
  if (params?.sort) {
    products.sort((a, b) => {
      return params.sort === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }
  
  if (params?.limit) {
    products = products.slice(0, params.limit);
  }
  
  return products;
};

/**
 * Get single product by ID from fixture
 */
export const getProductByIdFixture = (id: number | string): ProductDTO | undefined => {
  return fixtures.products.find(p => p.id === Number(id));
};

/**
 * Get categories from fixture
 */
export const getCategoriesFixture = (): CategoryDTO[] => {
  return [...fixtures.categories];
};

/**
 * Get products by category from fixture
 */
export const getProductsByCategoryFixture = (category: string, params?: { limit?: number; sort?: 'asc' | 'desc' }): ProductDTO[] => {
  let products = fixtures.products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  
  if (params?.sort) {
    products.sort((a, b) => {
      return params.sort === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }
  
  if (params?.limit) {
    products = products.slice(0, params.limit);
  }
  
  return products;
};

/**
 * Get users from fixture
 */
export const getUsersFixture = (): UserDTO[] => {
  return [...fixtures.users];
};

/**
 * Get user by ID from fixture
 */
export const getUserByIdFixture = (id: number | string): UserDTO | undefined => {
  return fixtures.users.find(u => u.id === Number(id));
};

/**
 * Get carts from fixture
 */
export const getCartsFixture = (): CartDTO[] => {
  return [...fixtures.carts];
};

/**
 * Get cart by ID from fixture
 */
export const getCartByIdFixture = (id: number | string): CartDTO | undefined => {
  return fixtures.carts.find(c => c.id === Number(id));
};

/**
 * Get user carts from fixture
 */
export const getUserCartsFixture = (userId: number | string): CartDTO[] => {
  return fixtures.carts.filter(c => c.userId === Number(userId));
};

/**
 * Simulate login - returns mock token
 */
export const loginFixture = (username: string, password: string): { token: string } => {
  const user = fixtures.users.find(u => u.username === username);
  if (!user) {
    throw new Error('User not found');
  }
  // In fixture mode, we don't validate password, just return a mock token
  return { token: 'fixture_token_' + Date.now() };
};

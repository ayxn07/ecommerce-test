/**
 * API Endpoint Constants
 * Centralized endpoint paths for FakeStoreAPI
 */

export const ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: number | string) => `/products/${id}`,
  CATEGORIES: '/products/categories',
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  
  // Carts
  CARTS: '/carts',
  CART_BY_ID: (id: number | string) => `/carts/${id}`,
  USER_CARTS: (userId: number | string) => `/carts/user/${userId}`,
  
  // Users
  USERS: '/users',
  USER_BY_ID: (id: number | string) => `/users/${id}`,
  
  // Auth
  LOGIN: '/auth/login',
} as const;

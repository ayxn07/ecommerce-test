/**
 * API Data Transfer Objects (DTOs)
 * Type definitions matching FakeStoreAPI response structure
 */

// Product DTOs
export interface ProductDTO {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Cart DTOs
export interface CartItemDTO {
  productId: number;
  quantity: number;
}

export interface CartDTO {
  id: number;
  userId: number;
  date: string;
  products: CartItemDTO[];
}

// User DTOs
export interface UserAddressDTO {
  geolocation: {
    lat: string;
    long: string;
  };
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface UserNameDTO {
  firstname: string;
  lastname: string;
}

export interface UserDTO {
  id: number;
  email: string;
  username: string;
  password: string;
  name: UserNameDTO;
  address: UserAddressDTO;
  phone: string;
}

// Auth DTOs
export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
}

// Category DTO (simple string array from API)
export type CategoryDTO = string;

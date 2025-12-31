export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const mockCategories: Category[] = [
  { id: '1', name: 'Men', image: 'https://via.placeholder.com/150', productCount: 120 },
  { id: '2', name: 'Women', image: 'https://via.placeholder.com/150', productCount: 180 },
  { id: '3', name: 'Kids', image: 'https://via.placeholder.com/150', productCount: 90 },
  { id: '4', name: 'Accessories', image: 'https://via.placeholder.com/150', productCount: 65 },
  { id: '5', name: 'Shoes', image: 'https://via.placeholder.com/150', productCount: 110 },
  { id: '6', name: 'Sports', image: 'https://via.placeholder.com/150', productCount: 85 },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White Shirt',
    description: 'A timeless white shirt perfect for any occasion. Made from premium cotton blend.',
    price: 49.99,
    originalPrice: 79.99,
    image: 'https://via.placeholder.com/300',
    category: 'Men',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    colors: ['white', 'blue', 'black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '2',
    name: 'Summer Floral Dress',
    description: 'Light and breezy floral dress perfect for summer days.',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://via.placeholder.com/300',
    category: 'Women',
    rating: 4.8,
    reviews: 256,
    inStock: true,
    colors: ['floral-pink', 'floral-blue', 'floral-yellow'],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: '3',
    name: 'Denim Jacket',
    description: 'Classic denim jacket with a modern fit. Perfect for layering.',
    price: 129.99,
    image: 'https://via.placeholder.com/300',
    category: 'Men',
    rating: 4.6,
    reviews: 89,
    inStock: true,
    colors: ['blue', 'black'],
    sizes: ['M', 'L', 'XL', 'XXL'],
  },
  {
    id: '4',
    name: 'Running Sneakers',
    description: 'High-performance running sneakers with advanced cushioning.',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://via.placeholder.com/300',
    category: 'Shoes',
    rating: 4.9,
    reviews: 432,
    inStock: true,
    colors: ['white', 'black', 'gray'],
    sizes: ['7', '8', '9', '10', '11', '12'],
  },
  {
    id: '5',
    name: 'Leather Backpack',
    description: 'Premium leather backpack with laptop compartment.',
    price: 199.99,
    image: 'https://via.placeholder.com/300',
    category: 'Accessories',
    rating: 4.7,
    reviews: 167,
    inStock: false,
    colors: ['brown', 'black'],
    sizes: [],
  },
  {
    id: '6',
    name: 'Kids T-Shirt Set',
    description: 'Set of 3 colorful t-shirts for kids. 100% organic cotton.',
    price: 34.99,
    originalPrice: 49.99,
    image: 'https://via.placeholder.com/300',
    category: 'Kids',
    rating: 4.4,
    reviews: 92,
    inStock: true,
    colors: ['red', 'blue', 'green'],
    sizes: ['2T', '3T', '4T', '5T'],
  },
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://via.placeholder.com/100',
};

// Mock authentication state
export let isAuthenticated = false;

export const setMockAuth = (value: boolean) => {
  isAuthenticated = value;
};

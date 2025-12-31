/**
 * API Mappers
 * Transform DTOs to app domain models
 */

import { ProductDTO, CartDTO, UserDTO, CategoryDTO } from './types';
import { Product, Category, User } from '../constants/mockData';

/**
 * Generate deterministic sizes based on product ID
 * This ensures consistent size options for each product across sessions
 */
const generateSizesForProduct = (productId: number, category: string): string[] => {
  const categoryLower = category.toLowerCase();
  
  // No sizes for certain categories
  if (
    categoryLower.includes('electronics') ||
    categoryLower.includes('jewelery')
  ) {
    return [];
  }

  // Clothing/Apparel sizes
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  // Use product ID to deterministically select available sizes (at least 3)
  const seed = productId;
  const numSizes = 3 + (seed % 3); // 3-5 sizes
  const startIndex = seed % (sizes.length - numSizes + 1);
  
  return sizes.slice(startIndex, startIndex + numSizes);
};

/**
 * Generate deterministic colors based on product ID
 */
const generateColorsForProduct = (productId: number): string[] => {
  const allColors = ['black', 'white', 'navy', 'gray', 'beige', 'brown', 'red', 'blue', 'green'];
  
  // Use product ID to select 2-4 colors
  const seed = productId;
  const numColors = 2 + (seed % 3); // 2-4 colors
  const startIndex = seed % (allColors.length - numColors + 1);
  
  return allColors.slice(startIndex, startIndex + numColors);
};

/**
 * Map ProductDTO to Product domain model
 */
export const mapProductDTOToProduct = (dto: ProductDTO): Product => {
  // Calculate discount based on rating count (higher engagement = more likely to be discounted)
  const hasDiscount = dto.rating.count > 200;
  const discountPercent = hasDiscount ? Math.min(35, Math.floor((dto.rating.count - 200) / 10)) : 0;
  const originalPrice = hasDiscount ? dto.price / (1 - discountPercent / 100) : undefined;

  return {
    id: String(dto.id),
    name: dto.title,
    description: dto.description,
    price: dto.price,
    originalPrice,
    image: dto.image,
    images: [dto.image], // API only provides one image
    category: dto.category,
    rating: dto.rating.rate,
    reviews: dto.rating.count,
    inStock: true, // API doesn't provide stock status, default to true
    discount: discountPercent > 0 ? discountPercent : undefined,
    colors: generateColorsForProduct(dto.id),
    sizes: generateSizesForProduct(dto.id, dto.category),
  };
};

/**
 * Map CategoryDTO (string) to Category domain model
 */
export const mapCategoryDTOToCategory = (dto: CategoryDTO, index: number, productCounts: Map<string, number>): Category => {
  return {
    id: String(index + 1),
    name: dto.charAt(0).toUpperCase() + dto.slice(1), // Capitalize first letter
    image: '', // No image from API, will use placeholder
    productCount: productCounts.get(dto) || 0,
  };
};

/**
 * Map UserDTO to User domain model
 */
export const mapUserDTOToUser = (dto: UserDTO): User => {
  return {
    id: String(dto.id),
    name: `${dto.name.firstname} ${dto.name.lastname}`,
    email: dto.email,
    avatar: undefined, // API doesn't provide avatar
  };
};

/**
 * Map multiple ProductDTOs to Products
 */
export const mapProducts = (dtos: ProductDTO[]): Product[] => {
  return dtos.map(mapProductDTOToProduct);
};

/**
 * Map multiple CategoryDTOs to Categories with product counts
 */
export const mapCategories = (dtos: CategoryDTO[], products: ProductDTO[]): Category[] => {
  // Count products per category
  const productCounts = new Map<string, number>();
  products.forEach(product => {
    productCounts.set(product.category, (productCounts.get(product.category) || 0) + 1);
  });

  return dtos.map((dto, index) => mapCategoryDTOToCategory(dto, index, productCounts));
};

/**
 * Normalize cart data from API
 * Note: FakeStore API cart format may need expansion for our use case
 */
export const normalizeCartDTO = (dto: CartDTO) => {
  return {
    id: dto.id,
    userId: dto.userId,
    date: new Date(dto.date),
    products: dto.products,
  };
};

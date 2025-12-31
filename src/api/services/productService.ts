/**
 * Product Service
 * Handles all product and category API calls
 */

import { httpClient } from '../httpClient';
import { ENDPOINTS } from '../endpoints';
import { ProductDTO, CategoryDTO } from '../types';
import { mapProducts, mapProductDTOToProduct, mapCategories } from '../mappers';
import { Product, Category } from '../../constants/mockData';
import {
  isFixtureMode,
  getProductsFixture,
  getProductByIdFixture,
  getCategoriesFixture,
  getProductsByCategoryFixture,
  fixtures,
} from '../fixtureLoader';

export interface GetProductsParams {
  limit?: number;
  sort?: 'asc' | 'desc';
}

export class ProductService {
  /**
   * Get all products
   */
  async getProducts(params?: GetProductsParams): Promise<Product[]> {
    if (isFixtureMode()) {
      const dtos = getProductsFixture(params);
      return mapProducts(dtos);
    }
    const dtos = await httpClient.get<ProductDTO[]>(ENDPOINTS.PRODUCTS, params);
    return mapProducts(dtos);
  }

  /**
   * Get single product by ID
   */
  async getProductById(id: number | string): Promise<Product> {
    if (isFixtureMode()) {
      const dto = getProductByIdFixture(id);
      if (!dto) throw new Error('Product not found');
      return mapProductDTOToProduct(dto);
    }
    const dto = await httpClient.get<ProductDTO>(ENDPOINTS.PRODUCT_BY_ID(id));
    return mapProductDTOToProduct(dto);
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    if (isFixtureMode()) {
      const categoryDtos = getCategoriesFixture();
      const productDtos = fixtures.products;
      return mapCategories(categoryDtos, productDtos);
    }
    const categoryDtos = await httpClient.get<CategoryDTO[]>(ENDPOINTS.CATEGORIES);
    
    // Fetch all products to get accurate counts per category
    const productDtos = await httpClient.get<ProductDTO[]>(ENDPOINTS.PRODUCTS);
    
    return mapCategories(categoryDtos, productDtos);
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(category: string, params?: GetProductsParams): Promise<Product[]> {
    if (isFixtureMode()) {
      const dtos = getProductsByCategoryFixture(category, params);
      return mapProducts(dtos);
    }
    const dtos = await httpClient.get<ProductDTO[]>(
      ENDPOINTS.PRODUCTS_BY_CATEGORY(category.toLowerCase()),
      params
    );
    return mapProducts(dtos);
  }
}

export const productService = new ProductService();

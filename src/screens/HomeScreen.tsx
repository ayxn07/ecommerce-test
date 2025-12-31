import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { productService } from '../api';
import { Product } from '../constants/mockData';
import {
  SectionHeader,
  ErrorState,
  AppHeader,
  SearchPill,
  HeroCarousel,
  CategoryChip,
  ProductRail,
  ProductGridPreview,
  SkeletonBlock,
} from '../components';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(false);

      // Fetch products and categories from API
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts(),
        productService.getCategories(),
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white">
        <AppHeader />
        <ScrollView className="flex-1">
          <View className="px-6 mt-4">
            <SkeletonBlock height="h-40" className="mb-4" />
            <SkeletonBlock height="h-10" width="w-full" className="mb-4" />
            <View className="flex-row">
              <SkeletonBlock height="h-8" width="w-20" className="mr-2" />
              <SkeletonBlock height="h-8" width="w-24" className="mr-2" />
              <SkeletonBlock height="h-8" width="w-20" />
            </View>
            <SkeletonBlock height="h-48" className="mt-4 mb-4" />
            <SkeletonBlock height="h-48" className="mb-4" />
          </View>
        </ScrollView>
      </View>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load products"
        message="Something went wrong while loading the products."
        onRetry={loadData}
      />
    );
  }

  // Derive product sections from API data:
  // - Trending: products with high review count (>300)
  // - New Arrivals: take products 6-10 (simulating newest items)
  // - Best Deals: products with highest discount (calculated from rating count)
  const trendingProducts = products
    .filter(p => p.reviews > 300)
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 6);
  
  const newArrivals = products.slice(6, 10);
  
  const bestDeals = products
    .filter(p => p.discount && p.discount > 20)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 6);

  return (
    <View className="flex-1 bg-white" testID="home-screen">
      <AppHeader
        onSearchPress={() => navigation.navigate('Search')}
        onWishlistPress={() => navigation.navigate('Wishlist')}
        onCartPress={() => navigation.navigate('Cart')}
      />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Search Pill CTA */}
        <SearchPill onPress={() => navigation.navigate('Search')} />

        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Category Chips */}
        <View className="mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-6"
          >
            {categories.slice(0, 7).map((category) => (
              <CategoryChip
                key={category.id}
                category={category.name}
                isActive={false}
                onPress={() => navigation.navigate('ProductList', { category: category.name })}
              />
            ))}
          </ScrollView>
        </View>

        {/* Trending Now Section */}
        {trendingProducts.length > 0 && (
          <View className="mb-6">
            <View className="px-6">
              <SectionHeader
                title="Trending Now"
                actionText="See All"
                onActionPress={() => navigation.navigate('ProductList', { category: 'All' })}
              />
            </View>
            <ProductRail
              products={trendingProducts}
              onProductPress={(productId) =>
                navigation.navigate('ProductDetails', { productId })
              }
            />
          </View>
        )}

        {/* New Arrivals Section */}
        {newArrivals.length > 0 && (
          <View className="px-6 mb-6">
            <SectionHeader
              title="New Arrivals"
              actionText="View All"
              onActionPress={() => navigation.navigate('ProductList', { category: 'All' })}
            />
            <ProductGridPreview
              products={newArrivals}
              onProductPress={(productId) =>
                navigation.navigate('ProductDetails', { productId })
              }
            />
          </View>
        )}

        {/* Best Deals Section */}
        {bestDeals.length > 0 && (
          <View className="mb-6">
            <View className="px-6">
              <SectionHeader
                title="Best Deals"
                actionText="See All"
                onActionPress={() => navigation.navigate('ProductList', { category: 'All' })}
              />
            </View>
            <ProductRail
              products={bestDeals}
              onProductPress={(productId) =>
                navigation.navigate('ProductDetails', { productId })
              }
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

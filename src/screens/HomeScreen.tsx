import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { mockProducts, mockCategories } from '../constants/mockData';
import {
  SectionHeader,
  LoadingState,
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

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
        onRetry={() => {
          setError(false);
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        }}
      />
    );
  }

  // Product sections for display
  const trendingProducts = mockProducts.slice(0, 6);
  const newArrivals = mockProducts.slice(6, 10);
  const bestDeals = mockProducts.filter(p => p.discount && p.discount > 25).slice(0, 6);

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
            {mockCategories.slice(0, 7).map((category) => (
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

        {/* New Arrivals Section */}
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

        {/* Best Deals Section */}
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
      </ScrollView>
    </View>
  );
};

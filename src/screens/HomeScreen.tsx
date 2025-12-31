import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { mockProducts, mockCategories } from '../constants/mockData';
import {
  ProductTile,
  SectionHeader,
  Card,
  LoadingState,
  ErrorState,
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
    return <LoadingState message="Loading products..." />;
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

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Hero Section */}
      <View className="bg-primary-600 px-6 pt-16 pb-8 rounded-b-3xl">
        <Text className="text-white text-3xl font-bold mb-2">
          Discover Fashion
        </Text>
        <Text className="text-white/90 text-base">
          Find your perfect style today
        </Text>
      </View>

      {/* Categories */}
      <View className="px-6 mt-6">
        <SectionHeader
          title="Categories"
          actionText="View All"
          onActionPress={() => navigation.navigate('Categories')}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-2">
          {mockCategories.map((category) => (
            <Card key={category.id} className="mx-2 w-28">
              <View className="items-center">
                <View className="w-16 h-16 bg-primary-100 rounded-full items-center justify-center mb-2">
                  <Text className="text-2xl">👔</Text>
                </View>
                <Text className="text-gray-900 font-semibold text-sm text-center">
                  {category.name}
                </Text>
                <Text className="text-gray-500 text-xs">
                  {category.productCount} items
                </Text>
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View className="px-6 mt-6 mb-6">
        <SectionHeader
          title="Featured"
          actionText="See All"
          onActionPress={() => navigation.navigate('ProductList', { category: 'All' })}
        />
        <FlatList
          data={mockProducts.slice(0, 4)}
          renderItem={({ item }) => (
            <ProductTile
              product={item}
              onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
            />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

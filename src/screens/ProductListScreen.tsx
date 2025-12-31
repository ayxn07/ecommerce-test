import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { mockProducts } from '../constants/mockData';
import { ProductTileV2, LoadingState, EmptyState, FilterSortBar } from '../components';

interface ProductListScreenProps {
  navigation: any;
  route: {
    params: {
      category: string;
    };
  };
}

export const ProductListScreen: React.FC<ProductListScreenProps> = ({
  navigation,
  route,
}) => {
  const { category } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set the header title
    navigation.setOptions({
      title: category,
    });
    setTimeout(() => setLoading(false), 800);
  }, [category, navigation]);

  const filteredProducts =
    category === 'All'
      ? mockProducts
      : mockProducts.filter((p) => p.category === category);

  if (loading) {
    return <LoadingState message="Loading products..." />;
  }

  if (filteredProducts.length === 0) {
    return (
      <EmptyState
        icon="📦"
        title="No products found"
        message={`No products in ${category} category`}
      />
    );
  }

  return (
    <View className="flex-1 bg-gray-50" testID="productlist-screen">
      {/* Sticky Filter Sort Bar */}
      <FilterSortBar
        onFilterPress={() => {
          // TODO: Implement filter functionality in future iteration
        }}
        onSortPress={() => {
          // TODO: Implement sort functionality in future iteration
        }}
        onSizePress={() => {
          // TODO: Implement size filter functionality in future iteration
        }}
      />

      {/* 2-Column Product Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View className="w-1/2 p-2">
            <ProductTileV2
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetails', { productId: item.id })
              }
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        testID="productlist-grid"
        ListFooterComponent={
          <View className="py-6 items-center">
            <TouchableOpacity 
              className="bg-white px-6 py-3 rounded-full border border-gray-300"
              testID="load-more-button"
              onPress={() => {
                // TODO: Implement load more pagination in future iteration
              }}
            >
              <Text className="text-gray-700 font-semibold">Load More</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

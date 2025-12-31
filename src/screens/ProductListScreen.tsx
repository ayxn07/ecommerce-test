import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { mockProducts } from '../constants/mockData';
import { ProductTile, LoadingState, EmptyState } from '../components';

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
    setTimeout(() => setLoading(false), 800);
  }, []);

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
    <View className="flex-1 bg-white">
      <View className="px-6 pt-16 pb-4">
        <Text className="text-3xl font-bold text-gray-900" testID="productlist-title">{category}</Text>
        <Text className="text-gray-600 mt-2">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </Text>
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View className="px-6 mb-4">
            <ProductTile
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetails', { productId: item.id })
              }
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        testID="productlist-grid"
      />
    </View>
  );
};

import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { mockProducts } from '../constants/mockData';
import {
  ProductTile,
  TextInputField,
  LoadingState,
  EmptyState,
} from '../components';

interface SearchScreenProps {
  navigation: any;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredProducts = searchQuery
    ? mockProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-16 pb-4">
        <Text className="text-3xl font-bold text-gray-900 mb-4">Search</Text>
        <TextInputField
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
          autoCapitalize="none"
        />
      </View>

      {loading ? (
        <LoadingState message="Searching..." />
      ) : searchQuery && filteredProducts.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No results found"
          message={`No products found for "${searchQuery}"`}
        />
      ) : searchQuery ? (
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
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-6xl mb-4">🔍</Text>
          <Text className="text-xl font-bold text-gray-900 mb-2">
            Start Searching
          </Text>
          <Text className="text-gray-600 text-center">
            Search for your favorite products
          </Text>
        </View>
      )}
    </View>
  );
};

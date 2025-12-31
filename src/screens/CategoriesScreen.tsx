import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { mockCategories } from '../constants/mockData';
import { Card, LoadingState } from '../components';

interface CategoriesScreenProps {
  navigation: any;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return <LoadingState message="Loading categories..." />;
  }

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-16 pb-6">
        <Text className="text-3xl font-bold text-gray-900">Categories</Text>
        <Text className="text-gray-600 mt-2">Browse by category</Text>
      </View>
      <FlatList
        data={mockCategories}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductList', { category: item.name })}
            className="px-6 mb-4"
          >
            <Card className="flex-row items-center p-4">
              <View className="w-16 h-16 bg-primary-100 rounded-full items-center justify-center mr-4">
                <Text className="text-3xl">👔</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-lg">{item.name}</Text>
                <Text className="text-gray-600 text-sm">
                  {item.productCount} products
                </Text>
              </View>
              <Text className="text-primary-600 text-2xl">→</Text>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

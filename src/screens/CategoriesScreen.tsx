import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { productService } from '../api';
import { Category } from '../constants/mockData';
import { LoadingState, ErrorState, CategoryCard } from '../components';

interface CategoriesScreenProps {
  navigation: any;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await productService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading categories..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load categories"
        message="Something went wrong while loading categories."
        onRetry={loadCategories}
      />
    );
  }

  return (
    <View className="flex-1 bg-white" testID="categories-screen">
      <View className="px-6 pt-16 pb-6">
        <Text className="text-3xl font-bold text-gray-900">Categories</Text>
        <Text className="text-gray-600 mt-2">Browse by category</Text>
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="px-6 flex-row flex-wrap -mx-2" testID="categories-grid">
          {categories.map((category) => (
            <View key={category.id} className="w-1/2 px-2">
              <CategoryCard
                id={category.id}
                name={category.name}
                image={category.image}
                productCount={category.productCount}
                onPress={() => navigation.navigate('ProductList', { category: category.name })}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

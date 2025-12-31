import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  productCount: number;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  image,
  productCount,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl overflow-hidden shadow-sm mb-4"
      activeOpacity={0.7}
      testID={`category-card-${id}`}
    >
      <View className="relative">
        <Image
          source={{ uri: image }}
          className="w-full h-32"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/20" />
        <View className="absolute bottom-3 left-3 right-3">
          <Text className="text-white font-bold text-lg mb-1">{name}</Text>
          <Text className="text-white/90 text-sm">{productCount} items</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

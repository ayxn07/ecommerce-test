import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '../constants/mockData';

interface ProductTileProps {
  product: Product;
  onPress: () => void;
}

export const ProductTile: React.FC<ProductTileProps> = ({ product, onPress }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-lg overflow-hidden shadow-sm mb-4"
      activeOpacity={0.7}
    >
      <View className="relative">
        <Image
          source={{ uri: product.image }}
          className="w-full h-48"
          resizeMode="cover"
        />
        {discount > 0 && (
          <View className="absolute top-2 right-2 bg-primary-600 px-2 py-1 rounded">
            <Text className="text-white text-xs font-bold">-{discount}%</Text>
          </View>
        )}
        {!product.inStock && (
          <View className="absolute inset-0 bg-black/40 items-center justify-center">
            <Text className="text-white font-bold">Out of Stock</Text>
          </View>
        )}
      </View>
      <View className="p-3">
        <Text className="text-gray-900 font-semibold text-base mb-1" numberOfLines={2}>
          {product.name}
        </Text>
        <View className="flex-row items-center mb-2">
          <Text className="text-yellow-500 mr-1">★</Text>
          <Text className="text-gray-600 text-sm">
            {product.rating} ({product.reviews})
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-gray-900 font-bold text-lg">${product.price}</Text>
          {product.originalPrice && (
            <Text className="text-gray-400 text-sm line-through ml-2">
              ${product.originalPrice}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

import React from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { Product } from '../constants/mockData';

interface ProductRailProps {
  products: Product[];
  onProductPress: (productId: string) => void;
}

export const ProductRail: React.FC<ProductRailProps> = ({ products, onProductPress }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="-mx-6 px-6"
      testID="product-rail"
    >
      {products.map((product) => {
        const discount = product.discount || (product.originalPrice
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          : 0);

        return (
          <TouchableOpacity
            key={product.id}
            onPress={() => onProductPress(product.id)}
            className="mr-4 w-40"
            activeOpacity={0.7}
            testID={`product-tile-${product.id}`}
          >
            <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <View className="relative">
                <Image
                  source={{ uri: product.image }}
                  className="w-full h-40"
                  resizeMode="cover"
                />
                {discount > 0 && (
                  <View className="absolute top-2 right-2 bg-primary-600 px-2 py-1 rounded-lg">
                    <Text className="text-white text-xs font-bold">-{discount}%</Text>
                  </View>
                )}
              </View>
              <View className="p-3">
                <Text className="text-gray-900 font-semibold text-sm mb-1" numberOfLines={2}>
                  {product.name}
                </Text>
                {product.brand && (
                  <Text className="text-gray-500 text-xs mb-1">{product.brand}</Text>
                )}
                <View className="flex-row items-center mb-2">
                  <Text className="text-yellow-500 text-xs mr-1">★</Text>
                  <Text className="text-gray-600 text-xs">{product.rating}</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-900 font-bold text-base">${product.price}</Text>
                  {product.originalPrice && (
                    <Text className="text-gray-400 text-xs line-through ml-2">
                      ${product.originalPrice}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

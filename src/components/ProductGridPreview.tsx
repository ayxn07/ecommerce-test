import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Product } from '../constants/mockData';

interface ProductGridPreviewProps {
  products: Product[];
  onProductPress: (productId: string) => void;
}

export const ProductGridPreview: React.FC<ProductGridPreviewProps> = ({
  products,
  onProductPress,
}) => {
  return (
    <View className="flex-row flex-wrap -mx-2" testID="product-grid-preview">
      {products.map((product) => {
        const discount = product.discount || (product.originalPrice
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          : 0);

        return (
          <View key={product.id} className="w-1/2 px-2 mb-4">
            <TouchableOpacity
              onPress={() => onProductPress(product.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
              activeOpacity={0.7}
              testID={`product-tile-${product.id}`}
            >
              <View className="relative">
                <Image
                  source={{ uri: product.image }}
                  className="w-full h-48"
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
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

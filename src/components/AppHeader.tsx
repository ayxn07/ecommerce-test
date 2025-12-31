import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface AppHeaderProps {
  onSearchPress?: () => void;
  onWishlistPress?: () => void;
  onCartPress?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onSearchPress,
  onWishlistPress,
  onCartPress,
}) => {
  return (
    <View className="bg-white px-6 pt-12 pb-4 flex-row justify-between items-center border-b border-gray-100">
      <Text className="text-2xl font-bold text-primary-600">Fashion Store</Text>
      <View className="flex-row items-center gap-4">
        <TouchableOpacity onPress={onSearchPress} testID="header-search-btn">
          <Text className="text-2xl">🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onWishlistPress} testID="header-wishlist-btn">
          <Text className="text-2xl">❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCartPress} testID="header-cart-btn">
          <Text className="text-2xl">🛒</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

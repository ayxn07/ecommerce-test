import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ProductTile, EmptyState } from '../components';

interface WishlistScreenProps {
  navigation: any;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({ navigation }) => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <EmptyState
        icon="❤️"
        title="Wishlist is empty"
        message="Add products to your wishlist to see them here"
      />
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pt-16 pb-4">
        <Text className="text-3xl font-bold text-gray-900">Wishlist</Text>
        <Text className="text-gray-600 mt-2">
          {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}
        </Text>
      </View>
      <FlatList
        data={wishlistItems}
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
      />
    </View>
  );
};

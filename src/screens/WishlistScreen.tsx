import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ProductTileV2, EmptyState, PrimaryButton } from '../components';

interface WishlistScreenProps {
  navigation: any;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({ navigation }) => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <View className="flex-1 bg-white" testID="wishlist-empty-state">
        <View className="px-6 pt-16 pb-4">
          <Text className="text-3xl font-bold text-gray-900">Wishlist</Text>
        </View>
        <View className="flex-1 items-center justify-center px-6">
          <EmptyState
            icon="❤️"
            title="Wishlist is empty"
            message="Add products to your wishlist to see them here"
          />
          <View className="mt-6 w-full">
            <PrimaryButton
              title="Browse Products"
              onPress={() => navigation.navigate('Home')}
              testID="browse-products-button"
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50" testID="wishlist-screen">
      <View className="px-6 pt-16 pb-4 bg-white">
        <Text className="text-3xl font-bold text-gray-900">Wishlist</Text>
        <Text className="text-gray-600 mt-2">
          {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}
        </Text>
      </View>
      <FlatList
        data={wishlistItems}
        renderItem={({ item }) => (
          <View className="w-1/2 p-2">
            <ProductTileV2
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetails', { productId: item.id })
              }
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        testID="wishlist-grid"
      />
    </View>
  );
};

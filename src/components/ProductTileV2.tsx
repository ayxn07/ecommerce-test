import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, GestureResponderEvent } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Product } from '../constants/mockData';
import { RootState } from '../store';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';

interface ProductTileV2Props {
  product: Product;
  onPress: () => void;
}

export const ProductTileV2: React.FC<ProductTileV2Props> = ({ product, onPress }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWishlistToggle = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-lg overflow-hidden shadow-sm mb-4"
      activeOpacity={0.7}
      testID={`product-tile-${product.id}`}
    >
      <View className="relative">
        {/* Product Image - Square aspect ratio */}
        <Image
          source={{ uri: product.image }}
          className="w-full aspect-square"
          resizeMode="cover"
        />
        
        {/* Wishlist Heart - Top Right */}
        <Pressable
          onPress={handleWishlistToggle}
          className="absolute top-2 right-2 w-9 h-9 bg-white/90 rounded-full items-center justify-center shadow-md"
          testID={`wishlist-heart-${product.id}`}
        >
          <Text className="text-xl">{isInWishlist ? '❤️' : '🤍'}</Text>
        </Pressable>

        {/* Badges - Top Left */}
        <View className="absolute top-2 left-2">
          {discount > 0 && (
            <View className="bg-primary-600 px-2 py-1 rounded mb-1">
              <Text className="text-white text-xs font-bold">-{discount}%</Text>
            </View>
          )}
          {/* Show NEW badge for products with high discount (temporary logic until 'isNew' field is added) */}
          {product.discount && product.discount >= 30 && (
            <View className="bg-red-600 px-2 py-1 rounded">
              <Text className="text-white text-xs font-bold">NEW</Text>
            </View>
          )}
        </View>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <View className="absolute inset-0 bg-black/40 items-center justify-center">
            <Text className="text-white font-bold">Out of Stock</Text>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View className="p-3">
        {/* Brand - Muted */}
        {product.brand && (
          <Text className="text-gray-500 text-xs font-medium mb-1" numberOfLines={1}>
            {product.brand}
          </Text>
        )}

        {/* Product Name - 2 lines */}
        <Text className="text-gray-900 font-semibold text-sm mb-2" numberOfLines={2}>
          {product.name}
        </Text>

        {/* Price with discount formatting */}
        <View className="flex-row items-center mb-2">
          <Text className="text-gray-900 font-bold text-base">${product.price}</Text>
          {product.originalPrice && (
            <Text className="text-gray-400 text-sm line-through ml-2">
              ${product.originalPrice}
            </Text>
          )}
        </View>

        {/* Rating Row */}
        <View className="flex-row items-center">
          <Text className="text-yellow-500 mr-1">★</Text>
          <Text className="text-gray-600 text-xs font-medium">
            {product.rating}
          </Text>
          <Text className="text-gray-400 text-xs ml-1">
            ({product.reviews})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

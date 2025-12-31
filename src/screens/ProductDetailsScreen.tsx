import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { mockProducts } from '../constants/mockData';
import { addToCart } from '../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';
import { RootState } from '../store';
import { PrimaryButton, LoadingState, Card, Toast, useToast } from '../components';

interface ProductDetailsScreenProps {
  navigation: any;
  route: {
    params: {
      productId: string;
    };
  };
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const { productId } = route.params;
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const { toast, showToast, hideToast } = useToast();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const product = mockProducts.find((p) => p.id === productId);
  const isInWishlist = wishlistItems.some((item) => item.id === productId);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);

  if (loading) {
    return <LoadingState message="Loading product..." />;
  }

  if (!product) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-xl text-gray-600">Product not found</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        selectedColor,
        selectedSize,
      })
    );
    showToast('Added to cart!', 'success');
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
      <ScrollView>
        {/* Product Image */}
        <Animated.View entering={FadeInDown.duration(500)}>
          <Image
            source={{ uri: product.image }}
            className="w-full h-96"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={handleToggleWishlist}
            className="absolute top-12 right-6 w-12 h-12 bg-white rounded-full items-center justify-center"
          >
            <Text className="text-2xl">{isInWishlist ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Product Info */}
        <View className="px-6 py-6">
          <Animated.View entering={FadeInDown.duration(600).delay(100)}>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </Text>
            <View className="flex-row items-center mb-4">
              <Text className="text-yellow-500 text-lg mr-2">★</Text>
              <Text className="text-gray-600 text-base">
                {product.rating} ({product.reviews} reviews)
              </Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(200)}>
            <View className="flex-row items-center mb-6">
              <Text className="text-3xl font-bold text-gray-900">
                ${product.price}
              </Text>
              {product.originalPrice && (
                <Text className="text-xl text-gray-400 line-through ml-3">
                  ${product.originalPrice}
                </Text>
              )}
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(600).delay(300)}>
            <Text className="text-gray-700 text-base leading-6 mb-6">
              {product.description}
            </Text>
          </Animated.View>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <Animated.View entering={FadeInDown.duration(600).delay(400)}>
              <Text className="text-gray-900 font-semibold text-lg mb-3">
                Colors
              </Text>
              <View className="flex-row flex-wrap mb-6">
                {product.colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    className={`mr-3 mb-3 px-4 py-2 rounded-lg border-2 ${
                      selectedColor === color
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <Text
                      className={`font-semibold ${
                        selectedColor === color ? 'text-primary-600' : 'text-gray-700'
                      }`}
                    >
                      {color}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <Animated.View entering={FadeInDown.duration(600).delay(500)}>
              <Text className="text-gray-900 font-semibold text-lg mb-3">
                Sizes
              </Text>
              <View className="flex-row flex-wrap mb-6">
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => setSelectedSize(size)}
                    className={`mr-3 mb-3 px-4 py-2 rounded-lg border-2 ${
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <Text
                      className={`font-semibold ${
                        selectedSize === size ? 'text-primary-600' : 'text-gray-700'
                      }`}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          )}

          {/* Stock Status */}
          <Animated.View entering={FadeInDown.duration(600).delay(600)}>
            <Card className={`mb-6 ${product.inStock ? 'bg-green-50' : 'bg-red-50'}`}>
              <Text
                className={`font-semibold ${
                  product.inStock ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </Text>
            </Card>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <Animated.View
        entering={FadeInDown.duration(600).delay(700)}
        className="px-6 py-4 bg-white border-t border-gray-200"
      >
        <PrimaryButton
          title="Add to Cart"
          onPress={handleAddToCart}
          disabled={!product.inStock}
        />
      </Animated.View>
    </View>
  );
};

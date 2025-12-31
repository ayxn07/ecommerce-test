import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { productService } from '../api';
import { Product } from '../constants/mockData';
import { addToCart } from '../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';
import { RootState } from '../store';
import { 
  PrimaryButton, 
  LoadingState, 
  Card, 
  Toast, 
  useToast,
  QuantityStepper,
  Accordion,
  ImageCarousel,
} from '../components';

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
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const { toast, showToast, hideToast } = useToast();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = product ? wishlistItems.some((item) => item.id === productId) : false;

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getProductById(productId);
      setProduct(data);
      
      // Set default size if available
      if (data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
    } catch (err) {
      console.error('Error loading product:', err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

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
        quantity,
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

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  // Mock reviews data
  const mockReviews = [
    {
      id: '1',
      author: 'Sarah M.',
      rating: 5,
      comment: 'Absolutely love this! The quality is amazing and fits perfectly.',
      date: '2 days ago',
    },
    {
      id: '2',
      author: 'John D.',
      rating: 4,
      comment: 'Great product! Fast shipping and exactly as described.',
      date: '5 days ago',
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
      <ScrollView className="flex-1" testID="product-details-scroll">
        {/* Image Carousel */}
        <ImageCarousel
          images={images}
          onBackPress={() => navigation.goBack()}
          onWishlistPress={handleToggleWishlist}
          isInWishlist={isInWishlist}
        />

        {/* Product Info */}
        <View className="px-6 py-6">
          {/* Brand & Title */}
          <Animated.View entering={FadeInDown.duration(500)}>
            {product.brand && (
              <Text className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">
                {product.brand}
              </Text>
            )}
            <Text className="text-2xl font-bold text-gray-900 mb-3">
              {product.name}
            </Text>
            
            {/* Rating & Reviews */}
            <View className="flex-row items-center mb-4">
              <View className="flex-row items-center mr-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= Math.floor(product.rating) ? 'star' : 'star-outline'}
                    size={16}
                    color="#facc15"
                  />
                ))}
              </View>
              <Text className="text-gray-600 text-sm">
                {product.rating} ({product.reviews} reviews)
              </Text>
            </View>
          </Animated.View>

          {/* Price */}
          <Animated.View entering={FadeInDown.duration(500).delay(100)}>
            <View className="flex-row items-center mb-6">
              <Text className="text-3xl font-bold text-gray-900">
                ${product.price}
              </Text>
              {product.originalPrice && (
                <>
                  <Text className="text-xl text-gray-400 line-through ml-3">
                    ${product.originalPrice}
                  </Text>
                  <View className="ml-3 bg-red-100 px-2 py-1 rounded">
                    <Text className="text-red-600 text-xs font-bold">
                      -{product.discount}%
                    </Text>
                  </View>
                </>
              )}
            </View>
          </Animated.View>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <Animated.View entering={FadeInDown.duration(500).delay(200)}>
              <Text className="text-gray-900 font-semibold text-base mb-3">
                Select Size
              </Text>
              <View className="flex-row flex-wrap mb-6" testID="size-selector">
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => setSelectedSize(size)}
                    className={`mr-3 mb-3 px-5 py-3 rounded-lg border-2 ${
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    testID={`size-option-${size}`}
                  >
                    <Text
                      className={`font-semibold text-base ${
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

          {/* Quantity */}
          <Animated.View entering={FadeInDown.duration(500).delay(300)}>
            <Text className="text-gray-900 font-semibold text-base mb-3">
              Quantity
            </Text>
            <QuantityStepper
              value={quantity}
              onIncrease={() => setQuantity(quantity + 1)}
              onDecrease={() => setQuantity(quantity - 1)}
              min={1}
              max={10}
            />
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInDown.duration(500).delay(400)} className="mt-6">
            <Text className="text-gray-900 font-semibold text-base mb-3">
              Product Details
            </Text>
            <Text className="text-gray-700 text-sm leading-6 mb-6">
              {product.description}
            </Text>
          </Animated.View>

          {/* Accordion - Delivery & Returns */}
          <Animated.View entering={FadeInDown.duration(500).delay(500)}>
            <Accordion title="Delivery & Returns">
              <View className="py-2">
                <View className="flex-row items-start mb-3">
                  <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                  <Text className="text-gray-700 text-sm ml-2 flex-1">
                    Free delivery on orders over $50
                  </Text>
                </View>
                <View className="flex-row items-start mb-3">
                  <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                  <Text className="text-gray-700 text-sm ml-2 flex-1">
                    Standard delivery: 3-5 business days
                  </Text>
                </View>
                <View className="flex-row items-start mb-3">
                  <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                  <Text className="text-gray-700 text-sm ml-2 flex-1">
                    Express delivery: 1-2 business days
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                  <Text className="text-gray-700 text-sm ml-2 flex-1">
                    Free returns within 30 days
                  </Text>
                </View>
              </View>
            </Accordion>
          </Animated.View>

          {/* Reviews Preview */}
          <Animated.View entering={FadeInDown.duration(500).delay(600)} className="mt-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-gray-900 font-semibold text-base">
                Customer Reviews
              </Text>
              <TouchableOpacity>
                <Text className="text-primary-600 font-semibold text-sm">
                  View all {product.reviews}
                </Text>
              </TouchableOpacity>
            </View>
            
            {mockReviews.map((review) => (
              <Card key={review.id} className="mb-3 p-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-gray-900 font-semibold text-sm">
                    {review.author}
                  </Text>
                  <View className="flex-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons
                        key={star}
                        name={star <= review.rating ? 'star' : 'star-outline'}
                        size={14}
                        color="#facc15"
                      />
                    ))}
                  </View>
                </View>
                <Text className="text-gray-700 text-sm mb-2">
                  {review.comment}
                </Text>
                <Text className="text-gray-500 text-xs">
                  {review.date}
                </Text>
              </Card>
            ))}
          </Animated.View>

          {/* Spacer for sticky button */}
          <View className="h-24" />
        </View>
      </ScrollView>

      {/* Sticky Bottom CTA */}
      <Animated.View
        entering={FadeInDown.duration(500).delay(700)}
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-gray-500 text-xs mb-1">Total Price</Text>
            <Text className="text-gray-900 font-bold text-2xl">
              ${(product.price * quantity).toFixed(2)}
            </Text>
          </View>
          {selectedSize && (
            <View className="bg-gray-100 px-3 py-2 rounded-lg">
              <Text className="text-gray-600 text-xs">Size: {selectedSize}</Text>
              <Text className="text-gray-600 text-xs">Qty: {quantity}</Text>
            </View>
          )}
        </View>
        <PrimaryButton
          title="Add to Cart"
          onPress={handleAddToCart}
          disabled={!product.inStock || !selectedSize}
          testID="add-to-cart-button"
        />
      </Animated.View>
    </View>
  );
};

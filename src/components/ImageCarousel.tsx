import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ImageCarouselProps {
  images: string[];
  onBackPress?: () => void;
  onWishlistPress?: () => void;
  isInWishlist?: boolean;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  onBackPress,
  onWishlistPress,
  isInWishlist = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH
    );
    setActiveIndex(slideIndex);
  };

  return (
    <View className="relative">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width: SCREEN_WIDTH, height: 400 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Overlay buttons */}
      <View className="absolute top-12 left-0 right-0 flex-row justify-between px-4">
        {onBackPress && (
          <TouchableOpacity
            onPress={onBackPress}
            className="w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-lg"
            testID="carousel-back-button"
          >
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>
        )}
        <View className="flex-1" />
        {onWishlistPress && (
          <TouchableOpacity
            onPress={onWishlistPress}
            className="w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-lg"
            testID="carousel-wishlist-button"
          >
            <Ionicons
              name={isInWishlist ? 'heart' : 'heart-outline'}
              size={22}
              color={isInWishlist ? '#ef4444' : '#000'}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Indicators */}
      {images.length > 1 && (
        <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center">
          {images.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full mx-1 ${
                index === activeIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
};

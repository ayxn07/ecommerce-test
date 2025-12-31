import React, { useState } from 'react';
import { View, ScrollView, Dimensions, Image } from 'react-native';

interface BannerItem {
  id: string;
  image: string;
}

interface HeroCarouselProps {
  banners?: BannerItem[];
}

const defaultBanners: BannerItem[] = [
  { id: '1', image: 'https://via.placeholder.com/800x300/16a34a/ffffff?text=Summer+Sale' },
  { id: '2', image: 'https://via.placeholder.com/800x300/22c55e/ffffff?text=New+Arrivals' },
  { id: '3', image: 'https://via.placeholder.com/800x300/86efac/000000?text=Best+Deals' },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ banners = defaultBanners }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (screenWidth - 48));
    setActiveIndex(index);
  };

  return (
    <View className="mb-4" testID="hero-carousel">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="px-6"
      >
        {banners.map((banner) => (
          <View
            key={banner.id}
            style={{ width: screenWidth - 48, marginRight: 12 }}
            className="rounded-3xl overflow-hidden shadow-sm"
          >
            <Image
              source={{ uri: banner.image }}
              className="w-full h-40"
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
      <View className="flex-row justify-center mt-3">
        {banners.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === activeIndex ? 'bg-primary-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

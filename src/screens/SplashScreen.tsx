import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 800 });

    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Animated.View style={animatedStyle} className="items-center">
        <View className="w-32 h-32 bg-primary-600 rounded-full items-center justify-center mb-6">
          <Text className="text-white text-5xl font-bold">🛍️</Text>
        </View>
        <Text className="text-3xl font-bold text-gray-900 mb-2">Fashion Store</Text>
        <Text className="text-gray-600 text-base">Your Style, Our Passion</Text>
      </Animated.View>
    </View>
  );
};

import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#16a34a" />
      <Text className="text-gray-600 mt-4">{message}</Text>
    </View>
  );
};

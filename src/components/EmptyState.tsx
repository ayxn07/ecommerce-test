import React from 'react';
import { View, Text } from 'react-native';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nothing here',
  message = 'No items to display',
  icon = '📦',
}) => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-6xl mb-4">{icon}</Text>
      <Text className="text-xl font-bold text-gray-900 mb-2">{title}</Text>
      <Text className="text-gray-600 text-center">{message}</Text>
    </View>
  );
};

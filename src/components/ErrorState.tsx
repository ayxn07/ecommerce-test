import React from 'react';
import { View, Text } from 'react-native';
import { PrimaryButton } from './PrimaryButton';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An error occurred. Please try again.',
  onRetry,
}) => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-6xl mb-4">⚠️</Text>
      <Text className="text-xl font-bold text-gray-900 mb-2">{title}</Text>
      <Text className="text-gray-600 text-center mb-6">{message}</Text>
      {onRetry && (
        <PrimaryButton title="Try Again" onPress={onRetry} className="px-8" />
      )}
    </View>
  );
};

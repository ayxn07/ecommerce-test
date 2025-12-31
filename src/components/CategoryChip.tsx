import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CategoryChipProps {
  category: string;
  isActive?: boolean;
  onPress: () => void;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  isActive = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 rounded-full mr-2 ${
        isActive ? 'bg-primary-600' : 'bg-gray-100'
      }`}
      activeOpacity={0.7}
    >
      <Text
        className={`font-semibold ${
          isActive ? 'text-white' : 'text-gray-700'
        }`}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
};

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface FilterSortBarProps {
  onFilterPress?: () => void;
  onSortPress?: () => void;
  onSizePress?: () => void;
}

export const FilterSortBar: React.FC<FilterSortBarProps> = ({
  onFilterPress,
  onSortPress,
  onSizePress,
}) => {
  return (
    <View className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center space-x-2">
      {/* Filter Button */}
      <TouchableOpacity
        onPress={onFilterPress}
        className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full mr-2"
        testID="filter-button"
      >
        <Text className="text-sm font-medium text-gray-700 mr-1">🔽</Text>
        <Text className="text-sm font-medium text-gray-700">Filter</Text>
      </TouchableOpacity>

      {/* Sort Button */}
      <TouchableOpacity
        onPress={onSortPress}
        className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full mr-2"
        testID="sort-button"
      >
        <Text className="text-sm font-medium text-gray-700 mr-1">⇅</Text>
        <Text className="text-sm font-medium text-gray-700">Sort</Text>
      </TouchableOpacity>

      {/* Size Pill */}
      <TouchableOpacity
        onPress={onSizePress}
        className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full"
        testID="size-button"
      >
        <Text className="text-sm font-medium text-gray-700">Size</Text>
      </TouchableOpacity>
    </View>
  );
};

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SearchPillProps {
  onPress: () => void;
}

export const SearchPill: React.FC<SearchPillProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gray-100 mx-6 mt-4 mb-4 px-4 py-3 rounded-full flex-row items-center"
      testID="search-pill"
      activeOpacity={0.7}
    >
      <Text className="text-xl mr-2">🔍</Text>
      <Text className="text-gray-500 flex-1">Search products...</Text>
    </TouchableOpacity>
  );
};

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText,
  onActionPress,
}) => {
  return (
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-2xl font-bold text-gray-900">{title}</Text>
      {actionText && onActionPress && (
        <TouchableOpacity onPress={onActionPress}>
          <Text className="text-primary-600 font-semibold">{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

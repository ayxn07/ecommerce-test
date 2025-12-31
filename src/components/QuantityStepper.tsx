import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QuantityStepperProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}) => {
  return (
    <View className="flex-row items-center bg-gray-50 rounded-lg p-1">
      <TouchableOpacity
        onPress={onDecrease}
        disabled={value <= min}
        className={`w-10 h-10 rounded-lg items-center justify-center ${
          value <= min ? 'bg-gray-200' : 'bg-white'
        }`}
        testID="quantity-decrease"
      >
        <Ionicons
          name="remove"
          size={20}
          color={value <= min ? '#d1d5db' : '#374151'}
        />
      </TouchableOpacity>
      <Text className="text-gray-900 font-semibold text-lg mx-6 min-w-[32px] text-center" testID="quantity-value">
        {value}
      </Text>
      <TouchableOpacity
        onPress={onIncrease}
        disabled={value >= max}
        className={`w-10 h-10 rounded-lg items-center justify-center ${
          value >= max ? 'bg-gray-200' : 'bg-primary-600'
        }`}
        testID="quantity-increase"
      >
        <Ionicons
          name="add"
          size={20}
          color={value >= max ? '#d1d5db' : '#ffffff'}
        />
      </TouchableOpacity>
    </View>
  );
};

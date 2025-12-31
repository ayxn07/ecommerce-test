import React from 'react';
import {
  TextInput,
  View,
  Text,
  TextInputProps,
} from 'react-native';

interface TextInputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  error,
  containerClassName,
  className,
  ...props
}) => {
  return (
    <View className={containerClassName}>
      {label && (
        <Text className="text-gray-700 font-medium mb-2">{label}</Text>
      )}
      <TextInput
        className={`border border-gray-300 rounded-lg px-4 py-3 text-base ${
          error ? 'border-red-500' : ''
        } ${className || ''}`}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};

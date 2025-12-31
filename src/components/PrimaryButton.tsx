import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  disabled,
  className,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-200';
      case 'outline':
        return 'bg-white border-2 border-primary-600';
      default:
        return 'bg-primary-600';
    }
  };

  const getTextClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'text-gray-800';
      case 'outline':
        return 'text-primary-600';
      default:
        return 'text-white';
    }
  };

  return (
    <TouchableOpacity
      className={`py-4 px-6 rounded-lg items-center justify-center ${getVariantClasses()} ${
        disabled ? 'opacity-50' : ''
      } ${className || ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#16a34a'} />
      ) : (
        <Text className={`font-semibold text-base ${getTextClasses()}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

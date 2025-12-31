import React from 'react';
import { View } from 'react-native';

interface SkeletonBlockProps {
  width?: string;
  height?: string;
  className?: string;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  width = 'w-full',
  height = 'h-20',
  className = '',
}) => {
  return (
    <View
      className={`bg-gray-200 rounded-lg ${width} ${height} ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
};

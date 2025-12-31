import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
import { Card } from '../components';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const menuItems = [
    { id: '1', title: 'Orders', icon: '📦', action: () => {} },
    { id: '2', title: 'Addresses', icon: '📍', action: () => {} },
    { id: '3', title: 'Payment Methods', icon: '💳', action: () => {} },
    { id: '4', title: 'Settings', icon: '⚙️', action: () => {} },
    { id: '5', title: 'Help & Support', icon: '❓', action: () => {} },
    { id: '6', title: 'About', icon: 'ℹ️', action: () => {} },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-primary-600 px-6 pt-16 pb-8 rounded-b-3xl">
        <View className="items-center">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4">
            <Text className="text-4xl">👤</Text>
          </View>
          <Text className="text-white text-2xl font-bold">{user?.name}</Text>
          <Text className="text-white/90 text-base">{user?.email}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View className="px-6 mt-6">
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} onPress={item.action} className="mb-3">
            <Card className="flex-row items-center p-4">
              <Text className="text-2xl mr-4">{item.icon}</Text>
              <Text className="flex-1 text-gray-900 font-semibold text-base">
                {item.title}
              </Text>
              <Text className="text-primary-600 text-xl">→</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View className="px-6 my-6">
        <TouchableOpacity
          onPress={() => dispatch(logout())}
          className="bg-red-500 py-4 px-6 rounded-lg items-center"
        >
          <Text className="text-white font-semibold text-base">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
